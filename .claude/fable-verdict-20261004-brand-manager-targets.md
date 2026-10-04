# Fable 판정 2026-10-04 — K-DINE(브랜드 2) 브랜드 관리자 모자 부여 대상

작성: Fable(리더). 게이트 판정서 `.claude/fable-verdict-20261004-structure-gate.md` §6-2 의 후속 — Irene 답 2건을 받아 **대상을 이메일로 확정**한다. 코드 변경 0 이라 게이트 마커 없음. 근거 = 운영 읽기 전용 SELECT 3회(쓰기 0) + dev 코드 읽기.

Irene 원문: ① 「kate, k-din은 내 관련 아니야」 ② 「fable이 구조검색이나 기능검색한 후 권고한 대로 해」

---

## 0. 결론 (실행 지시)

| 계정 | 판정 | 이유 |
|---|---|---|
| **`kate.kim.snkn@gmail.com`** (user 19 · 매장 8 Restaurant Admin · 사용자명 `kdineipc1`) | **부여** — SA Staff Management → user 19 → 유형 「브랜드」 · 「K-DINE with MIN (2)」 · Brand manager | K-DINE 메뉴를 실제로 고치는 **유일한** 사람(§1-2). D1′=A 잠금 뒤 매장 화면 편집이 400 이 되므로 갈 곳이 필요한 사람도 이 한 명 |
| `help@gitconsulting.group` (user 23 · GIT Consulting · 브랜드 1·2 소유자) | **부여 안 함(불가)** | 이미 소유자라 전부 열린다. 부여 라우트가 `User already owns this brand` 400 으로 거부한다(`routes/users.js` 브랜드 분기) |
| `kdine-brand@gitconsulting.group` (user 11 · 표시명 「Irene Kim」 · Brand General · brand_id=1) | **부여 안 함** | 운영 활동 기록 **0건**(activity_logs user_id=11 전체 0). 메뉴 편집 0. 브랜드 1(with MIN) 소속·매장 9(test_lua) oversight 뿐 — K-DINE 과 실무 연결이 없다. Irene ① 「k-din은 내 관련 아니야」 와도 일치. 휴면 계정에 모자를 씌울 이유가 없다 |
| Irene 본인 계정 | **부여 안 함** | Irene ①. 게이트 판정서 §6-2 의 「Irene 본인 계정 +」 권고는 **철회**한다. Irene 이 평소 쓰는 help@ 는 소유자라 어차피 열린다 |

**부여 = 1건, `kate.kim.snkn@gmail.com` 만.**

단, **§2 의 결함 1건을 먼저 닦아야 한다** — 지금 모자를 씌우면 Kate 가 브랜드 화면으로 전환해도 **사이드바에 Brand Menus 가 안 보인다.** 부여 자체는 해롭지 않지만 Kate 에게 「브랜드 메뉴는 여기서」 라고 말할 수 있으려면 §2 수정이 운영에 먼저 가 있어야 한다. 데이터 단계 순서 변경은 §3.

---

## 1. 운영 실측 (2026-10-04, 읽기 전용)

### 1-1 구조
- 브랜드 1 `with MIN`(owner 23, plan_type `Brand Basic`) → 매장 10 `with MIN Cafe`.
- 브랜드 2 `K-DINE with MIN`(owner 23, **brands.plan_type NULL** — 요금제 판정은 소유자 user 23 의 `plan_type='Brand Enterprise'` 로 떨어진다, `brands-core.js:1145`·`requireModule.js:35`) → 매장 8 `K-DINE IPC Branch`(plan `Enterprise Plan`, payment_model restaurant) **하나**.
- 매장 8 사용자 4명: Kate(19, RA, 이메일 있음) · Moon(28) · Wai(61) · James(62) — Staff 셋은 이메일 없음, PIN 만. **RA 는 Kate 한 명.**
- user 23 모자: `(restaurant 10 × RA)` 1행(09-24 부여, 10-03 사용) — 운영 `user_contexts` 유일한 행. 브랜드 모자 행 0.
- 브랜드 2 메뉴 104(전부 active) · lock 0 · auto 0 — 아직 잠금 전(예정대로). 매장 8 상품 111 중 100 이 브랜드 메뉴에 연결.

### 1-2 누가 K-DINE 메뉴를 고치는가 (activity_logs 60일)
| user | 행위 | 건수 | 마지막 |
|---|---|---|---|
| **19 Kate** | menu_item update | **145** | 2026-10-01 06:15 |
| 19 Kate | menu_item create / delete | 10 / 4 | 10-01 |
| 19 Kate | settings·invoice·staff | 15 | 09-29 |
| 23 help@ | invoice update | 8 | 09-29 |
| 11 kdine-brand@ | — | **0 (전 기간 0)** | — |
| 브랜드 메뉴(`brand_*`) 편집 | 누구도 | **0 (90일)** | — |

→ 09-29 판정서 §1-1 「매장 계정 user 19 가 119건」 은 그 뒤에도 이어져 **155건**이 됐다. 브랜드 쪽 편집은 아무도 안 한다. D1′=A 잠금은 **Kate 의 손만** 막는다 — 그래서 Kate 가 브랜드 화면을 열 수 있어야 하고, 다른 누구도 필요하지 않다.

### 1-3 Kate 에게 생기는 변화 (코드 실측)
- 로그인 뒤 **매번 선택 화면**(`LoginPage.tsx:492` `contexts.length >= 2` → `/pos/select-context`) — 카드 2장: 「Kate」(본래 매장) · ◐「K-DINE with MIN」. 한 번 더 누르는 것 외 매장 쪽 동작 변화 0. Staff PIN 전환 무관.
- 모자 = **교체**: 브랜드로 전환한 상태에서 매장 라우트는 403(테스트 ⑧-6). 매장 일은 헤더 스위처로 본래 정체 복귀 뒤.
- 모자 아래 열리는 것: 브랜드 메뉴·카테고리·옵션(`userCanManageBrand`) · 브랜드 레시피(`/brands/2/recipes`) · 리포트. 닫힌 것: 결제설정·브랜드 수정/삭제·스태프(소유자 판정) · BG 사용자 소유 카탈로그(알려진 한계). `brands-plans.js` 가 BM 에게 브랜드 요금제 편집을 허용하는 기존 경계는 그대로(브랜드 2 에 EntityPlan 이 있는지는 미확인 — 게이트 판정서 §7 과 같은 사실).

---

## 2. 발견한 결함 — 모자 아래 사이드바가 비어 있다 (코드 실측 · 운영 미부여라 아직 무증상)

**사실:**
- 투영 `permissions: []` — `middleware/auth.js projectContext`(:65) · `routes/auth.js /switch-context` 응답(:731) · 테스트 ③ 이 `[]` 를 단언(:149, RA 모자 기준).
- 프론트 사이드바 `MainLayout.tsx:1534 hasManagerPermission(key)`: BG 는 항상 true, **Brand Manager 는 `user.permissions.includes(key)`**. 브랜드 사이드바 섹션은 전부 이 키에 걸려 있다 — Dashboard=`dashboard`(:1649) · **Brands(Brand Menus·Brand Recipes)=`products`(:1685)** · Products=`products` · Operations=`operations|products` · Communication=`communication` · Plans=`plans_payments`.
- 네이티브 BM 은 브랜드 스태프 화면(`BrandStaffPage.tsx:28-33`)에서 이 6개 키를 골라 받는다(`dashboard` 는 alwaysOn). 모자는 SA 가 부여하며 키를 고르는 칸이 없고 `[]` 로 투영된다.
- 서버는 BM 의 이 키를 **판정에 쓰지 않는다**(grep: `req.user.permissions` 는 `access_pos/access_payment/access_void` 만, `middleware/auth.js:151-175`). 즉 순수 표시 키다.

**결과:** Kate 가 모자로 전환하면 사이드바에 Sales Orders · Franchise Map · Reports(권한 키 없는 항목)만 남고 **Dashboard 와 Brand Menus 가 없다.** `/pos/brand-menus` 를 주소로 치면 열린다(라우트 가드는 역할만, `App.tsx:1069`). 지시서 §2 🔒 「사이드바가 안 맞으면 고치지 말고 중단·보고」 가 바로 이 경우인데, 팀원 실브라우저 보고에는 이 항목이 없었다 — **실브라우저 1회로 재현부터**(아래 ①).

**수정(코드 · 최소 · 단일 소스):** 모자의 표시 키를 `userContexts.js` 상수 한 곳에 두고 투영 두 곳이 읽는다.
1. `services/userContexts.js` — `BRAND_MANAGER_HAT` 옆에
   `const BRAND_MANAGER_HAT_PERMISSIONS = ['dashboard', 'products'];` + export.
   근거: i18n hint 가 약속한 범위 「메뉴·레시피·리포트」 = Dashboard(`dashboard`) + Brands 섹션(`products`). Reports 는 키 없이 보인다. `operations`(인보이스·발주·공급업체·재고) · `communication` · `management` · `plans_payments` 는 **넣지 않는다** — 약속 밖이고, `plans_payments` 는 brands-plans 서버 허용과 겹쳐 돈 경계에 닿는다. `products` 가 같이 여는 Products 섹션(브랜드 상품·상품레시피)은 BM 아래 빈 목록으로 보인다 — 알려진 한계(게이트 판정서 §7) 그대로, 숨기지 않는다.
2. `middleware/auth.js projectContext`(:65) `permissions: []` → `permissions: ctx.t === 'brand' ? BRAND_MANAGER_HAT_PERMISSIONS : []`.
3. `routes/auth.js /switch-context`(:731) 응답 `permissions: []` → `permissions: isBrandHat ? userContexts.BRAND_MANAGER_HAT_PERMISSIONS : []`. 토큰 claim 에는 넣지 않는다(소켓은 permissions 를 안 읽는다).
4. 테스트 `tests/user-contexts-switch.test.js` ⑧-2·⑧-3 에 `permissions` 가 `['dashboard','products']` 단언 추가. ③(:149, RA 모자 `[]`)은 그대로.
5. 프론트 변경 0 — `AuthContext.tsx:552·876·954` 가 이미 응답의 permissions 를 BM 에 적용한다. `MainLayout.tsx` 🔒 무접촉.
6. `docs/MULTI_CONTEXT_LOGIN_DESIGN.md` §5.5 에 한 줄: 「모자 표시 키 = dashboard·products(상수 한 곳). 서버 판정 아님」.

**검증(팀원):** ① 수정 전 dev 실브라우저로 **재현 1회**(demo RA 23 → 브랜드 17 모자 → 사이드바에 Brand Menus 없음 — 반증 없는 수정 금지) → ② 수정 → jest 41+2 → health-check → ③ 같은 흐름에서 Dashboard·Brand Menus 보임 + 브랜드 17 메뉴 1개 수정·원복 → ④ 사이드바에 Operations/Plans **안 보임** 확인 → ⑤ `check-sensitive-diff`(auth.js = 보안 경계 → 게이트 대상) → 게이트 1회(나). 백엔드만이라 프론트 빌드 불필요 — 단 SW bump 는 없어도 된다(번들 무변경).

---

## 3. 데이터 단계 순서 — 바뀌는 것

판정서 §3-2 ①~⑧ · 게이트 판정서 §5 는 그대로. **(0) 만 둘로 갈라지고 ③ 의 전제가 하나 늘어난다.**

| 단계 | 내용 | 변경 |
|---|---|---|
| **(0-a)** | §2 사이드바 수정 → 게이트 → 운영 배포 | **신설.** ③ 잠금의 전제. |
| **(0-b)** | SA 화면에서 **`kate.kim.snkn@gmail.com` 에 (brand 2 × Brand Manager) 부여** · 운영 쓰기는 그 1행 | (0-a) 뒤. 부여 뒤 Irene 또는 팀원이 Kate 에게 **두 줄** 전달: 「로그인하면 카드 2장 — 매장 일은 Kate 카드, 메뉴 수정은 K-DINE 카드(Brand Menus). 저장하면 매장에 자동 반영」 |
| ① refresh · ② options 짝 | 그대로 | (0) 과 무관 — **(0-a) 가 늦어지면 먼저 해도 된다.** 단 그 뒤 Kate 가 매장에서 또 고치면 브랜드가 다시 낡으므로, ③ 직전에 **① refresh 를 한 번 더 돌린다**(멱등·드라이런 표 → 승인). |
| ③ 잠금 5칸 + auto + version+1 → sync 1회 | **(0-a)(0-b) 완료 + Kate 안내 완료 뒤에만.** | Kate 의 마지막 편집이 10-01 — 잠금 전까지는 매장 화면 편집이 계속 통한다(데이터 손실 없음, refresh 가 다시 올린다). |
| ④~⑧ | 그대로 | ③ 과 독립(순두부·병합·GIT 연결·원가·재검사). |

**권고 일정:** (0-a) 를 오늘 안에 코드·게이트까지 끝내고, 데이터 밤 1회에 「배포(0-a) → 부여(0-b) → ①②③④⑤⑥⑦⑧」 로 **한 밤에 닫는다**. (0-a) 가 밀리면 ①②④⑤⑥⑦ 먼저, ③ 만 다음 밤(직전 refresh 재실행).

---

## 4. Irene 에게 (컨펌 1건)
> 부여 대상은 **Kate 계정 하나**(`kate.kim.snkn@gmail.com`)입니다. 지난 보고의 「Irene 계정도」 는 철회합니다 — help@ 는 소유자라 이미 열리고, kdine-brand@ 는 활동 기록 0 인 휴면 계정입니다.
> 다만 코드에 구멍 하나를 찾았습니다: 지금 상태로 모자를 씌우면 Kate 가 브랜드 화면으로 넘어가도 **왼쪽 메뉴에 Brand Menus 가 안 뜹니다**(모자에 표시 권한 키가 비어 있음). 백엔드 3줄짜리 수정이고 제가 게이트를 봅니다. **수정 배포 → Kate 부여 → 잠금** 순서로 가겠습니다. 승인해 주시면 진행합니다.
