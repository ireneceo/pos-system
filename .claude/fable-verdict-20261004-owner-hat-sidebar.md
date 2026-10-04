# Fable 판정 — 오너 모자 사이드바 0건 (2026-10-04)

Irene 원문: 「그리고 내 아이디에 있는 이 오너 좌측 메뉴가 하나도 안나와. ◯ with MIN Cafe / Restaurant Owner」

## 1. 원인 확정

**오너 모자 아래에서 요금제 문(`GET /api/owner/allowed-routes`)이 사람의 플랜(`users.plan_type`)을 오너 어휘로 읽어 실패하고, 그 실패를 「플랜은 있는데 허용 화면 0개」로 응답하기 때문이다.** 멀티로그인(모자) 전환 자체는 정상 — 토큰·투영·권한 판정은 다 맞다. 깨진 곳은 모자와 무관하게 `role === 'Restaurant Owner'` ⇒ `users.plan_type 은 오너 플랜` 이라고 가정한 라우트 한 곳이다.

경로(코드 실측):
1. 전환 — `routes/auth.js:704-713` 토큰에 `role='Restaurant Owner', ctx:{t:'owner'}`. `middleware/auth.js:46-77 projectContext` 가 매 요청 소유행으로 재검증 후 `req.user.role='Restaurant Owner'`, `req.contextProjected=true`. 정상.
2. 사이드바 — `MainLayout.tsx:1898-1946 ownerCategories` 는 Settings 묶음 빼고 전부 `isRouteAllowed(...)`. `useAllowedRoutes.ts:88-95`: 응답 `plan_type` 이 **비어 있으면** 필터 생략(전부 보임), **값이 있으면** `allowed_routes` 로 필터.
3. 서버 — `routes/owner.js:978-1055`: `owner = User.findByPk(req.user.id)` → `effectivePlanType = is_demo||is_test ? 'Owner Enterprise' : owner.plan_type` → `PlanTemplate.findOne({display_name|name = effectivePlanType, plan_target:'owner'})` → **못 찾으면 `plan_type` 은 채운 채 `allowed_routes: []`** (1013-1022줄).
4. user 23 = Brand General, `plan_type='Brand Enterprise'`(plan_target 'brand'), is_demo 0, is_test 0 → 3번에서 오너 플랜 검색 실패 → `{plan_type:'Brand Enterprise', allowed_routes:[]}` → 2번이 「플랜 있음 + 허용 0」로 읽어 **메뉴 전부 숨김**. Settings 묶음(My Profile)만 `visible:true` 라 그것만 남는다.

왜 원래 오너 계정(27·36)은 멀쩡한가: `is_test=1` 이라 'Owner Enterprise' 로 바뀐다. 왜 dev 에서 안 잡혔나: **dev 에는 오너가 아닌 역할이면서 소유행을 가진 사용자가 0명**이다(실측 SQL 0행) — 모자 v1.1 검증은 플랜이 없는 계정으로만 돌았고, 「브랜드 플랜을 가진 사람이 오너 모자를 쓴다」는 조합은 운영에서 처음 밟았다.

같은 종류의 틈: 메모리 [[reference_module_gate_role_vocabulary]] 「요금제 모듈 어휘는 역할마다 다름 — 매장 어휘로 문 달면 브랜드가 통째로 튕김」. 이번은 오너 어휘 문에 브랜드 플랜 열쇠.

구조적으로: `users.plan_type` 은 **사람당 1칸**이다. 모자를 쓴 사람은 오너 구독을 따로 가질 수 없다(칸이 이미 브랜드 플랜). 그러니 「모자의 플랜은 무엇인가」는 데이터로 정해지지 않고 **결정**이 필요하다 → Fable 호출 조건 성립(A 돈·요금제 경계 / C 길이 갈림).

## 2. 결정 — 모자 아래에서는 오너 전체 등급으로 본다

**규칙: 오너 모자(`req.contextProjected && req.user.role==='Restaurant Owner'`)는 `/allowed-routes` 에서 데모·테스트와 같은 경로를 탄다 — `effectivePlanType='Owner Enterprise'`, `effectiveSubStatus='active'`.** 네이티브 오너(ctx 없음)는 바이트 동일.

근거:
- **§5.4 모자의 약속 범위 = 오너 판정 전부**(`routes/owner.js` 전부, 소유행 하나로 판정). 오너 API 는 모듈 게이트가 **없다**(`routes/owner.js` 에 `requireModule` 0건 실측 — 사이드바만 모듈로 가린다). 즉 모자는 이미 모든 오너 API 를 열고 있고, 사이드바만 닫혀 있는 것이 모순이다. §5.5 브랜드 관리자 모자 때 「표시 키를 모자의 약속 범위에 맞춘다」로 정한 것과 같은 원칙.
- **열리는 권한 0**: Owner Enterprise 모듈(dashboard·restaurants·invoices·notices·inquiry·logs·performance·reports·buyer 4개)의 API 는 전부 소유행 판정뿐이라 이 변경으로 새로 닿는 서버 경로가 없다. 표시만 바뀐다.
- 부여는 **SA 전용**(§8-3). 누가 모자를 받는지는 SA 가 정하므로 등급도 부여에 포함된 것으로 본다.
- 프론트 `needsSubscription`(`MainLayout.tsx:2401-2405`) 도 `hasActiveSubscription=true` 라 「구독하세요」 화면으로 튕기지 않는다.

기각한 길:
- **(B) 사람의 등급을 오너 등급으로 짝맞춤**(Brand Basic→Owner Basic …): 플랜 이름 접미사 매칭은 이름 바뀌면 깨지고(`PlanTemplate` 에 등급 칸 없음, `sort_order` 만), dev 실측 Owner Basic·Professional 은 `owner_*` 모듈이 **0개**(buyer 4개만)라 Basic 브랜드가 모자를 쓰면 또 빈 메뉴가 된다. 서버가 열어 둔 것을 사이드바가 다시 가리는 모순도 그대로.
- **(C) 모자면 `plan_type:null` 로 응답(프론트 fail-open)**: 메뉴는 보이지만 `hasActiveSubscription=false` → 전환 응답 `user` 에 `subscription_status` 가 없어(`routes/auth.js:720-729`) `userHasOwnPlan` 이 어떻게 남는지 불확실 → 「구독 안내 화면」 위험. 또 PlanBadge 가 사라진다. 우회이고 명시가 아니다.
- **(D) 프론트 MainLayout 에서 오너 모자 예외**: 🔒 인쇄 보호파일이고, 판정은 서버에 두는 것이 이 저장소 원칙. 서버 1곳으로 끝난다.

## 3. 변경 범위 (설계 외 변경 0)

- `dev-backend/routes/owner.js` `/allowed-routes` 한 곳: `isDemo` 옆에 `isOwnerHat = req.contextProjected === true && req.user.role === 'Restaurant Owner'` 를 두고 `effectivePlanType/effectiveSubStatus` 삼항에 `isDemo || isOwnerHat` 로 합류. 주석에 「모자는 users.plan_type 이 브랜드/푸드코트 플랜이라 오너 어휘 검색이 실패하던 틈(2026-10-04 Fable 판정)」 1줄.
  ⛔ 다른 분기·응답 모양·네이티브 경로는 건드리지 않는다. `requireModule.js`·`checkSubscriptionStatus`·프론트 무접촉.
- `dev-backend/scripts/health-check.js` auth 묶음에 1건 추가(기존 오너 모자 테스트 옆, 415-417줄 임시 유저 패턴 재사용): 임시 **Brand General** 유저(`plan_type='Brand Enterprise'`, is_demo 0·is_test 0) + 데모 매장 38 소유행 → `POST /auth/switch-context {owner}` → 모자 토큰으로 `GET /owner/allowed-routes` → `plan_type==='Owner Enterprise' && allowed_routes.includes('/pos/owner/dashboard')`. finally 에서 소유행·유저 삭제. 고장주입: 수정 되돌리면 이 1건이 실패해야 한다(반증 1회).
- `docs/MULTI_CONTEXT_LOGIN_DESIGN.md` §5.4 에 한 줄: 「요금제 문: 모자 아래 `/owner/allowed-routes` 는 Owner Enterprise 로 응답(사람의 plan_type 은 모자 어휘가 아니다, 2026-10-04)」. **단, 문서 수정은 배포 뒤**(게이트 지문에 잡힘 — [[reference_fable_gate_fingerprint_scope]]).

## 4. 검증 기준 (팀원 실행 → 결과를 내가 판정)

1. **dev 재현 먼저**: 위 임시 BG+소유행으로 수정 **전** `GET /owner/allowed-routes` 가 `{plan_type:'Brand Enterprise', allowed_routes:[]}` 임을 실호출로 찍는다(운영 증상과 동일함을 증명). 그 다음 수정.
2. 수정 후 같은 호출 → `Owner Enterprise` + routes 10개(owner_* 모듈 ui_routes) + buyer 경로.
3. 무회귀: 네이티브 오너(is_test 계정 / plan 없는 임시 오너) 응답이 수정 전과 **바이트 동일**(전후 JSON diff 0).
4. 실브라우저 1회: dev 에서 임시 BG 로 로그인 → 모자 전환 → 좌측 메뉴 Dashboard·Restaurants·Operations·Reports·Communication 노출 + `console.error` 0. 프론트 빌드 불필요(서버만 변경).
5. `health-check.js --category=auth` 전건 + 추가 1건 + 고장주입 반증 1회 + `check-print-guard.js` 0건 + `check-sensitive-diff.js` 결과 그대로 보고.
6. 운영 DB 쓰기 0. 임시 데이터는 데모 매장 38 만, finally 삭제.

## 5. 배포 묶음 — 따로 간다

- 현재 워킹트리의 단말기 Void·직원 발주 묶음은 **Fable 게이트 PASS(지문 66a273fe7516) 상태**. 이 수정을 지금 손대면(`routes/owner.js` 한 줄이라도) 지문이 바뀌어 마커가 죽고 묶음 전체를 재판정해야 한다.
- 결정: **① 지금 묶음을 먼저 `/배포` → 커밋 → ② 그 뒤 이 수정 착수 → 자체 게이트(민감 판정 시 Fable 1회) → 두 번째 배포.** 서버 1파일이라 프론트 빌드·sweep 없이 수 분이면 끝난다. 검증 끝난 묶음을 새 사안으로 다시 열지 않는다([[reference_selective_deploy_isolation]]).
- Irene 이 「한 번에 실어라」를 택하면: 팀원이 수정 → 내가 묶음 전체를 1회 재판정(프론트 번들 불변이므로 jest·e2e 증거 재사용, health-check 재실행만). Fable 호출 수는 같고 배포가 1회 준다. 다만 기본 권고는 따로.

## 6. 확인 못 한 것 (추측하지 않음)
- 운영 `plan_templates` 의 Owner Basic/Professional `included_modules` 내용(dev 는 owner_* 0개). 이번 결정에는 영향 없음(모자는 Enterprise 고정). 네이티브 오너 Basic/Pro 사이드바가 비는지는 **별건** — 팀원이 운영 읽기 전용으로 1회 확인해 보고.
- 전환 응답 `user` 에 `subscription_status` 가 없을 때 프론트 `user.subscriptionStatus` 가 유지되는지(AuthContext 1008 `??` prev) — (C) 를 기각한 근거의 일부이지 결정의 전제는 아니다.

Fable 호출 집계(이 사안): ① 원인·설계 = 이 문서. ② 게이트 1회(민감 판정 시). 구현 중 되묻기 없음 — 세부는 팀원 판단, 결과에 붙여 보고.

---
## 7. 게이트 판정 2회차 — PASS (2026-10-04, Irene 「그냥 다하고 배포할래」 → 묶음 합류)

Fable 직접 확인:
- diff 대조: `routes/owner.js` 6+/2- — §3 설계 그대로(`isOwnerHat` 1줄 + 삼항 2곳 + 주석 3줄), 설계 외 변경 0. `services/userContexts.js`·`routes/users.js`·`services/authService.js` = HEAD 동일(보류된 «추가» 기능 코드 워킹트리 0).
- 가드: print-guard 8/8 변경 없음 · check-sensitive-diff ②⑤ 접촉(모두 이전 PASS 묶음의 PaymentModal·buyerScope — 이번 추가분은 일반/안전망 분류) · health-check **전체 288/288**(Fable 재실행) · auth 14/14.
- **고장주입 반증(Fable 직접)**: `isOwnerHat=false` 로 되돌리고 pm2 재시작 → auth 1건 실패 «모자 plan=Brand Enterprise routes=0»(= 운영 증상 재현) → 원복·재시작 → 14/14. 가드가 실제로 깨진다.
- 배포 안전성: 서버만 변경, 마이그 0, 프론트 번들 불변(빌드 sw.js 16:11:03 > 최종 프론트 소스 16:09:02, `public/sw.js`≡`build/sw.js` 5.81) → 이전 PASS 의 jest·e2e·verify-all --full 24/24 증거 유효. 롤백 = 배포 스크립트 백업 복원.
- 한계(확인 불가): 운영 user 23 모자 실화면은 배포 뒤 Irene 눈 확인 1회. 운영 Owner Basic/Pro 는 owner_* 모듈 포함(팀원 읽기) → 네이티브 오너 별건 없음.
