# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-08-20 (**멀티 컨텍스트 로그인 P1~P4 + Fable 게이트 훅(G1)** — dev 완료, 운영 미배포)
**버전:** **v3.74** (운영 — 2026-08-20) · 데스크탑앱 0.1.10 · 안드로이드앱 0.2.0
**작업 상태:** 운영은 v3.74 그대로. 아래 신규 작업은 **dev 완료·미커밋·미배포**.

### 진행 중인 작업
- 없음 (아래 3건은 **Irene 입력 대기** — 전부 비차단)

### ⏸ Irene 입력 대기 3건 (2026-08-20)
1. **Fable 게이트 도장 권한** — ①Fable 유지 / ②민감건은 Irene만 / ③평소 Fable + **게이트 자신을 고칠 땐 Irene**(Fable 제안: "자기 승인 금지" 규칙). 하니스가 `[Self Modification]`·`[Self Approval]` 경고 2회 발생 → Opus 가 Fable 마커를 **회수**하고 게이트 코드 **동결**. 답 오기 전까지 Fable 도 `pass` 재발급 안 함.
2. **P3b 헤더 스위처** — 🔒 `MainLayout.tsx` 에 **2줄** 삽입 사인오프. 승인 시 2일. **미승인이어도 기능은 완결**(대시보드 진입점으로 상시 전환 가능).
3. **P5 운영 배포** — `/배포` 지시. 운영 마이그 1건(`migrate-user-contexts.js`, CREATE TABLE 만·백필 0행).

### ✅ 완료 (2026-08-20) — 멀티 컨텍스트 로그인 P1~P4 · dev 검증 완료

> 설계 `docs/MULTI_CONTEXT_LOGIN_DESIGN.md` (Fable 작성, 다른 Fable 세션이 적대적 독립검증 →
> 치명 5건 지적 → v2 개정). 리뷰 원문 `docs/MULTI_CONTEXT_LOGIN_REVIEW.md` 무수정 보존.
> **단계별 Fable 게이트 PASS** (P1·P2·P3a·P4·G1 각각 독립 재현 판정).

- **핵심 모델**: 네이티브 정체는 **파생**(행 없음), 부여된 모자만 `user_contexts` 행.
  운영 BG/FG 3명이 스칼라 NULL 이라 정체를 행으로 복사하면 **정작 대상자가 선택지 0개**가 됐다(검증 F1 실측).
- **투영 초크포인트 1곳**: `middleware/auth.js` `projectContext` — 접근판정 4곳 **본문 무접촉**.
  ctx 없으면 기존 경로 바이트 동일(무회귀 제1조건).
- **회수 = 폴백**: 401 금지(프론트 httpClient 가 모든 401 을 전역 로그아웃 처리) → 200 + `X-Context-Fallback` 헤더 → 네이티브 정체로 내려앉음. 잔존 권한 0 실증.
- **크로스탭 팔로우**(🔒 인쇄 안전 직결): 토큰은 브라우저 단위 공유라, 따라오지 않으면 그 탭의 POS·주방 요청이 전부 403 → **결제 실패·자동인쇄 정지가 무증상**. FI-7 이 실제 결함(이벤트만 쏘고 신원 미교체)을 잡아 PIN 경로 재사용으로 수정.
- **v1 부여 범위**: (restaurant × Restaurant Admin) 만. 브랜드/푸드코트 권한은 소유 기록으로 판정되는 코드가 주류라 "반쪽만 열림"이 된다(검증 F4).
- **검증 수치**: e2e **8/8 3회 연속** · jest 신규 **17/17** · health-check **162/162** · verify-all **15/15** · print-guard **8/8 무접촉** · mount sweep 67/67(admin·fcm·bm 은 demo 계정 부재로 **확인 불가**).
- **e2e·고장주입이 잡은 실제 결함 4건**: ①크로스탭 신원 미교체 ②권한 목록이 2초 응답캐시를 타 **회수된 모자가 픽커에 잔존**(`/auth/contexts` 캐시 제외로 수정) ③`refreshContexts` 가 실패와 빈목록 미구분 → 옛 목록 잔존 ④회수 알림이 세션당 1회만(래치 리셋).
- **거짓 통과 3건 자체 적발**: mount sweep 토큰 없어 전 역할 skip 후 `0/0 OK` 성공종료(→ exit 1 로 수정) / 빌드가 메모리 게이트로 실패했는데 옛 번들로 e2e 3회 실행 / 고장주입이 엉뚱한 경로에 걸려 조용히 통과.

### ✅ 완료 (2026-08-20) — G1: Fable 게이트 정지 훅 (Irene "설치해" 승인)
- `dev-backend/scripts/fable-gate.js` + `.claude/hooks/fable-gate.sh`(Stop, `settings.local.json` 등록).
- **지문은 내용 기반**(`git diff HEAD` + 미추적 파일 해시) — 참고자료의 `status --porcelain` 방식은
  **이미 바뀐 파일을 한 줄 더 고쳐도 값이 같아** 요구("검증 후 수정 시 무효")를 만족하지 못했다(FI-c 실증).
- 자기참조 결함(자기 상태파일이 지문 오염 → "1회만 차단"이 영원히 미성립) 수정.
- 차단 트리거 = `check-sensitive-diff` 판정(문서만 변경 → 비대상 실증, stuck-at-one 아님).
- **한계**: 설계 이탈은 못 잡는다. 잡는 건 "검증 없이 끝났다고 말하는 순간"뿐.
- `CLAUDE.md` 에 **검증 규율 4조항** 추가(코드리뷰만 PASS=실패 / 가드는 깨뜨려 확인 / 판정 기계부터 의심 / 확인 못 한 건 "확인 불가" 명시).

- **구독·청구·프로필 (설계 §8.1, Irene 질문으로 2026-08-20 추가)**: 청구서는 **사람이 아니라 사업체**(매장/브랜드/푸드코트)에 붙는다 — 모자 부여는 이미 청구 중인 사업체에 출입증 1장을 주는 것이라 **청구서 수 변화 0**. 프로필(이름·이메일·전화·언어)은 **사람당 1벌**, 투영은 역할·소속만 덮고 신원·프로필 무접촉. 설계에 "정지된 사업체 모자" 는 있었으나 **"청구서가 몇 개가 되나"는 문서에 없었다** — Fable 이 코드 실측 후 §8.1 로 명시.

### 📌 백로그 추가 (2026-08-20)
- **통합 청구 화면**(한 사람이 관여한 여러 사업체 청구서를 한 곳에서 조회·납부) — 현재 솔루션에 없는 개념. 모자 목록 위에 얹을 수 있음.
- **FCM/BM demo 계정 신설** — mount sweep 커버리지. System Admin demo 계정은 **만들지 않는다**(공개 빠른 로그인에 최고권한 노출 위험 > 커버리지 이득, Fable 결정).

### 완료된 작업 (이번 세션 — 2026-08-19)

**결제 증빙 "Confirm Payment 버튼이 눌리지가 않아" 근본 수리 (with MIN Cafe #260819-010, RM 128.02 bankTransfer)**

- **근본**: `LiveOrdersPage.handleVerifyConfirm` 첫 줄이 **존재하지 않는 함수** `setAudioEnabled(false)` 호출.
  2026-06-05 알림음 단일화(`a8272d06`)에서 `audioEnabled` 가 useState → 파생 const 로 바뀌며 setter 는
  사라졌는데 호출만 남았다 → **클릭 즉시 ReferenceError → 요청이 아예 전송되지 않음. 2.5개월 무증상.**
- **증거(추측 아님)**:
  - 운영 실측 — 실패 구간(08:45~08:51 UTC) 이 주문 PATCH **서버 도달 0건**, 같은 매장 다른 주문 PATCH 2건은 성공
    → 백엔드·DB·구독정지 전부 무관. 결제는 08:51:40 **다른 화면**(Floor Plan/POS)으로 처리됨(원장 1행·`paid_at` 정상).
  - 운영 번들 `4765.de35128d.chunk.js` 에 `setAudioEnabled` 가 **축약 안 된 free identifier** 로 존재
    (정상 지역변수는 `Ot`,`It` 로 축약) = 번들러 미해석 = 미정의 확정.
- **잘못된 단서 2개 제거(다음 세션 재조사 금지)**:
  - `[handleInvoicePaid] subscription restored for restaurant N` 로그는 **이미 active 여도 찍힌다**
    (`restoreSubscription` 이 미변경 시에도 `success:true` 반환). 정지 여부 근거로 쓰지 말 것.
  - `checkSubscriptionStatus` 는 export 만 되고 **어디에도 마운트돼 있지 않다** → 구독정지가 주문 API 를 안 막는다.
- **수정 4가지** (Live Orders + Floor Plan 테이블 패널 **대칭**):
  ① 죽은 호출 제거(결제 확인이 매장 알림음을 끌 이유 없음 — 끄면 새 주문 놓친다)
  ② `res.ok`/`success:false` 확인 → 실패면 **모달 유지 + 모달 안 사유 배너**(토스트는 모달 오버레이 뒤로 갈 수 있다)
  ③ `fetchWithTimeout`(기존 유틸 재사용, 15s) — 무한대기로 버튼이 영구 잠기는 경로 차단
  ④ 결제는 됐는데 주방 전송(`/status`)만 실패한 경우 구분 안내(티켓 미발행 방치 방지)
- **영구 안전망 신설**: `dev-backend/scripts/check-dead-handlers.js` + verify-all `dead-handlers` 등록(fail-closed).
  **고장주입 검증**(주입 시 exit 1 / 복원 시 exit 0). 첫 시도에서 주입이 **조용히 실패**해 "통과"로 보이던 것도
  잡아냄 → 주입에는 반드시 assert.
  **왜 필요한가**: 이 프로젝트는 `typescript@4.9.5` vs `i18next` TS5 `.d.ts` 로 파서가 먼저 터지고 CRA 가
  타입오류를 **warning 으로만** 낸다 → `TS2304 Cannot find name` 이 게이트 역할을 전혀 못 한다.
- **전수 스캔**: dev-frontend/src **562파일** 중 같은 결함 **다른 곳 0건**.
- **검증**: 신규 e2e `payment-verification.spec.js`(FI-1 서버500 / FI-2 무응답hang / OK 정상) **3회 연속 3/3**
  (수정 전에는 정상 경로조차 실패 = 회귀 박제 성립) · verify-all **15/15** · mount sweep(8역할+POS/manager)
  통과·크래시 0 · 🔒 인쇄 보호파일 **8/8 무접촉** · 백엔드 실패응답 shape 실호출 확인
  (404 `Order not found` / 401 `Access token required` / 200 `success:true`) · demo rid=38 전용(MARKER), 운영 데이터 무접촉.
- **변경 파일**: `LiveOrdersPage.tsx` · `PaymentVerificationModal.tsx` · `TableDetailPanel.tsx` ·
  `scripts/verify-all.js` · (신규) `scripts/check-dead-handlers.js` · (신규) `e2e/payment-verification.spec.js`
- **문서**: `DEVELOPMENT_PLAN.md`(완료 섹션) · `CHANGELOG.md`(Unreleased) · `docs/AGENT_ONBOARDING.md`
  (게이트 표에 `dead-handlers` + 흔한 함정 2줄) · 메모리 [[reference_dead_handler_type_gate_broken]]
- ⚠️ **Fable 검증 대상** (`check-sensitive-diff`: 기준 ② 돈·주문 무결성 접촉)

### ✅ Fable 검증 게이트 — 통과 (2026-08-20)

**판정 GO · 치명 결함 0.** Fable 이 실측으로 확인한 것: 절단면 준수(소스 6파일만) · 결제 PATCH 엔드포인트/body/순서
동일 · 서버측 금액·원장·상태전이 diff 0 · 🔒 인쇄 무접촉(print/kitchen/ticket/qz/station 접촉 0, print-guard 8/8) ·
**재클릭 멱등**(타임아웃인데 서버는 커밋된 경우까지 — `recordOrderPayment` 전이가드+잔액가드로 원장 중복 0,
`/status` pending→pending 은 인쇄 스탬프 없음 = 티켓 중복 경로 없음) · e2e 가 헛테스트 아님(방어 제거 시 각각 실패,
FI-2 17.7s = 15s 타임아웃 실증) · **스캐너가 사고 시점 커밋(3f6a6a0a)의 `setAudioEnabled` line 1392 를 실제로 검출**.

**지적 3건 중 2건 즉시 반영:**
- ① **스캐너 규칙4 누락 수정** — 죽은 호출 자신이 자기를 "선언됨"으로 가려 `onClick={() => setGhost(true)}` 같은
  **인라인 핸들러가 통과**하고 있었다(Fable 레플리카 실증). 규칙4를 선언 문맥 3종(`import {}` / `const {} =` /
  `({}) =>` 파라미터)으로 한정. **고장주입 확인**: 누락 2종 검출 / 정상 선언 대조군 미검출 / 562파일 오탐 0.
- ③ **TableDetailPanel 메시지 비대칭 수정** — 백엔드 400/404 는 `error` 가 **문자열**인데 TDP 에 문자열 폴백이
  없어 실제 사유("Order not found")가 `Server rejected the request (404)` 로 뭉개졌다 → LiveOrders 와 규칙 통일.
- ② **`completed → rejected` 후퇴 창은 후속 분리** — 결제가 서버에 커밋된 뒤 Reject 를 누르면 백엔드가 그대로
  받는다(원장엔 수납 기록, 주문은 미결제 = 대사 불일치). **이중계상은 없고 기존 동작**이며 이번 변경이 만든 게 아니다.
  고치려면 🔒 `orders-crud.js` 에 409 거부 필요 → **별도 승인 건** (아래 별건 ④).

**재검증(수정 후)**: e2e **3회 연속 3/3** · 정적 게이트 **10/10** · mount sweep · print-guard 8/8.
**남은 것 = Irene `/배포` 지시뿐.**

### 다음 확정 작업 (Irene 지시)

**1. 안드로이드 실기기 검증 — 태블릿 PC 확보됨 (2026-08-19). 사전점검 완료(2026-08-20)**
> 그동안 "테스트할 매장이 아예 없다"로 막혀 있던 항목. **기기가 생겨 해제됨.**
- 앱: `https://purplehere.com/desktop/` 사이드로드 APK (안드로이드앱 0.2.0)
- 검증 묶음(**기기 1대에 한 번에 몰아서** — 왕복 1회 원칙):
  - M3 7종 실기기 검증
  - **V4 폴러 자동인쇄 모순** 확인 — [[reference_android_print_gate_traps]] (스테이션이 마스터 무력화 /
    `needs_print` 로 유실판정 금지 / 에뮬레이터가 서버를 굶긴다)
  - 인쇄 두 경로 대조 — 빌=HTML+OS기본프린터 / 오더티켓=raw+이름지정 [[reference_native_print_two_paths]]
  - 태블릿 반응형(9/10인치 좌우 흔들림) [[reference_tablet_responsive_audit]]
  - `device_status` 에 실제로 올라오는지(현재 실사용 0대 [[reference_native_apps_zero_adoption]])
- ⚠️ 실기기 **종이 출력 확인은 Irene 눈**이 필요(코드/헤드리스로는 못 봄)

**사전점검 결과 (2026-08-20, 실측 — 이걸 안 하면 4번째 오진이 난다)**
- ✅ APK `https://purplehere.com/desktop/PurplePOS.apk` HTTP 200 · **정식 서명**(CN=Purple POS, O=Purple Here, C=MY)
  · 내부 `capacitor.config.json` = `https://purplehere.com/pos` **운영 오리진**(= V4-5 정적검사 통과)
- ✅ **인쇄 텔레메트리는 네이티브 앱에서 자동 발사** — `billPrint._printTrace` 가 `__NATIVE_PRINT` 있으면 무조건
  `POST /api/orders/print-debug` → 운영 로그 `[print-trace] CLIENT`. **켤 플래그도 코드 수정도 불필요** →
  V4 블로커 #2("claim 은 되는데 0바이트 + trace 0")를 🔒 보호파일 무접촉으로 실기기에서 측정 가능.
- ✅ 관측 도구 `dev-backend/scripts/watch-android-device.js` (읽기 전용: 기기리포트 / claim·`printed_at` 전이 /
  print-trace 한 화면). 유실 판정은 `needs_print` 아니라 **`printed_at`** 으로 한다(함정 #2).
- 🔴 **차단 조건 — with MIN(rid10) 주방 마스터 자동인쇄가 꺼져 있다.** 운영 실측:
  `kitchenPrinter.autoPrint=false`, `address=""` / 스테이션 Kitchen(9)·BAR(22)는 `autoPrint=true`,`address=POS-80`,qztray.
  실제 게이트는 `useAutoPrintPoller.ts:212` 의 `_kitchenAuto = kitchenPrinter.enabled && kitchenPrinter.autoPrint`
  = **마스터만 본다**(스테이션 OR 금지 = 2026-06-25 확정). 기기 리포트도 `auto=0` 으로 일치.
  → **테스트 시작 시 Irene 이 설정에서 주방 마스터 autoPrint 를 켜야 한다**(프린터 설정은 RA 만 변경 가능,
  실매장이라 내가 임의로 안 바꾼다). 안 켜면 폴러가 아예 안 찍어 "앱이 못 찍는다" 로 또 오진난다.

**2. 발견했으나 미수정 — 다음 세션에서 처리 (Irene 지시)**
- ① 🔒 `orders-crud.js:1136` 의 `actionType:'updated'` 가 OrderAction ENUM 에 없어 **PATCH /orders/:id
  감사로그가 전부 조용히 버려진다**(운영 로그 `Data truncated for column 'action_type'` 실측).
  → 보호파일 + 운영 ENUM 마이그 필요 = **Fable 게이트 대상**. 결제 주체는 `order_payments`(v3.73)에 남으므로
  돈 추적엔 구멍 없음, 그 외 PATCH 변경 이력이 비어 있는 상태.
- ② `checkSubscriptionStatus` 미마운트 = 구독정지가 API 를 안 막는다 → **비즈니스 결정 필요**
  (정말 막을 것인가 / 어디까지 막을 것인가). 지금은 정지돼도 매장이 정상 사용 가능.
- ③ **타입검사 복구** — typescript 업그레이드 또는 i18next 타입 핀. 이게 살아야 같은 클래스가 원천 차단된다
  (`check-dead-handlers.js` 는 좁은 임시 방어막).
- ④ **`completed → rejected` 후퇴 차단**(Fable 지적 #2) — 결제가 서버에 커밋된 뒤 매장이 Reject 를 누르면
  `PATCH /orders/:id` 가 그대로 받아 **원장엔 수납 기록 / 주문은 미결제** 대사 불일치 창이 생긴다.
  이중계상은 없고 기존 동작이지만, 🔒 `orders-crud.js` 에 409 거부를 넣어야 하므로 **별도 승인 + Fable 게이트**.

### 🔜 멀티 역할/매장 선택 로그인 — **설계는 Fable 담당** (Irene 지시 2026-08-20)

> Irene: "로그인하면 역할을 멀티로 선택해서 해당 관리페이지로 각각 들어가는 것"이 목표.
> **설계·문서화는 Fable 세션에서 한다.** Opus 세션은 착수 금지 — 아래는 재측정 방지용 **실측 사실만**.
> (CLAUDE.md Fable 게이트 기준 ④신규 아키텍처 + ⑤보안 경계 둘 다 해당.)

**실측 사실 (2026-08-20, dev 기준)**
1. **활성 컨텍스트가 스칼라 1개다.** `users.restaurant_id`(+`brand_id`/`foodcourt_id`) 컬럼이 곧 "지금 이 사람이
   있는 곳". 즉 구조상 **한 사람 = 한 매장**. 멀티 접근은 `restaurant_managers` 링크로만 표현됨
   (dev: oversight 22행 / ownership 6행, 복수 매장 보유 유저 3명 — 예: `K-DINE Brand`(user 11) → rid 10, 8).
   → "선택" 기능은 **활성 컨텍스트라는 개념 자체를 신설**해야 성립. 컬럼을 써서 바꾸는 방식은 신원 변조라 불가.
2. **선례가 이미 있다** — PIN 캐셔 전환(`routes/staff.js` `POST /verify-pin`)이 **새 JWT 발급으로 컨텍스트 전체를
   교체**한다(ROLES_AND_PERMISSIONS.md §PIN 기반 POS 캐셔 전환). 매장/역할 전환도 같은 패턴 재사용이 후보.
3. **⚠️ 이전 세션 발언 정정 — "권한이 토큰에 24시간 박혀서 하루 동안 안 먹힌다"는 서버에는 해당 안 된다.**
   토큰 claim 에 role/restaurant_id 가 담기는 건 맞고 만료도 24h(`JWT_EXPIRES_IN||'24h'`, authService.js 3곳)이지만,
   `authenticateToken`(middleware/auth.js)은 매 요청 **`User.findByPk` 로 DB 재조회** 후 `req.user` 를 DB 컬럼으로
   다시 만든다 → **HTTP 라우트 권한판정은 stale 하지 않다.** 낡는 것은 **프론트 캐시**(로그인 응답의 user 를
   AuthContext 가 보관, 갱신 경로는 `refreshUser()`→`/api/auth/me`). **소켓 등 비-HTTP 경로는 Fable 이 별도 확인 필요.**
4. **선행 조건(구조화) = 접근판정 4중화 통합.** "이 유저가 매장 X 에 접근 가능한가"에 답하는 곳이 4곳이고 규칙이
   서로 다름 → 선택 UI 를 먼저 얹으면 **"고른 매장에 들어가면 403"** 또는 반대로 **권한 확대** 사고가 난다.
   정석·통합 순서(뒤집기 금지)는 메모리 [[reference_restaurant_access_four_gates]] 에 확정돼 있음
   (resolver 1개 + 투영 2개 → shadow mode 1주 → 목록/scope → `userCanAccessRestaurant` 11파일(소켓 최후)
   → `checkRestaurantAccess` 103라우트 최후).
5. 관련 함정: [[reference_owner_restaurant_claim]](oversight→ownership 승격, UNIQUE 충돌) ·
   [[reference_id_normalization_bypass]] · [[project_socket_auth_hardening]] · [[reference_user_object_snake_case]].

**설계 문서 없음** — 이 주제로 `docs/` 에 파일 0건(전수 확인). Fable 이 새로 작성 대상.

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **다음 `/배포` 때 확인할 것** — v3.73 스모크 수정분이 그때 처음 실전 적용된다. "Smoke 인쇄 큐 잔재 0" 초록불 확인
- **void PIN 게이트 API 레벨 우회**(미수정) — `PATCH /orders/:id {status:'cancelled'}` 는 게이트를 안 탄다
  (`/:id/status`·`DELETE /items/:i` 는 탄다). **실사용 UI 2곳은 게이트 라우트를 쓰므로 매장 보호는 작동 중**.
  고치려면 **시스템 취소(머지 흡수) vs 사용자 취소 구분**이 선행 — 그냥 걸면 테이블 머지가 깨진다. 별도 승인 건
- **환불 대비** — `refunded` 가 ENUM 에 없어 현재 도달 불가. 환불 기능 추가 시 `computeExpected` ①에 제외 필요(Fable 지적)
- 안드로이드 `latest.json` 피드 + 인앱 업데이트 넛지(사이드로드 구버전 고착 방지)
- 마감 첫 사용 시 기대금액 실값 확인 1회(현재 교대 3건 전부 open, 마감 이력 0건)
- **Phase 2 — 게이트웨이 비밀키 응답 마스킹**: `guardPaymentSettings` nested `config` 보존 + SettingsPage
  write-only 마스크가 **같이** 가야 함(하나만 하면 저장 시 비밀키 silent wipe)
- **접근판정 4중화 통합**: resolver 1개 + 투영 2개. 순서 엄수 = shadow 1주 → 목록+게이트 →
  `userCanAccessRestaurant` 도메인별(소켓 최후) → `checkRestaurantAccess` 103라우트 최후 [[reference_restaurant_access_four_gates]]
- rid=16 모바일 이월렛 QR 업로드 후 재오픈 · IOI Mall 가동(운영 자격증명 수령 시) ·
  `formatPaymentDisplay` 이월렛 서브타입 미반영(인쇄물) · 운영시간+라스트오더 · POS 헤더 접기
- ENCRYPTION_KEY 강화(go-live 직전) · 개발서버 sudoers `visudo -c`

### 📷 AI 사진 인식 — 실사용 0건, 정확도 미검증 (2026-07-31 실측, 변화 없음)
- 진입점 ✅ 운영 번들에 "Find by photo"(Floor Plan > Items) · 라우트 ✅ · 요금제 게이트 ✅ 열림
- 학습 ✅ with MIN(rid10) **220장** · K-DINE(rid8) **76장** 임베딩 생성됨
- 🔴 `recognition_logs` **0행** = 매장에서 **한 번도 촬영된 적 없음**
- ⚠️ 방식 = **`local-color-v1`(색 비교)**. `AI_VISION_PROVIDER`·`VERTEX_PROJECT_ID` 미설정 = 진짜 AI 아님.
  비슷한 색끼리(찌개류·흰 국물)는 못 가른다

### 🙋 Irene 이 해야 할 일 (내가 못 하는 것만)

**1. 안드로이드 태블릿 실기기 테스트 (다음 세션 — 기기 확보됨)**
- 위 "다음 확정 작업 2" 묶음. 종이 출력 확인은 Irene 눈이 필요

**2. 윈도우앱 0.1.10 실프린터 종이 확인 1회 — 우선순위 높음**
- https://purplehere.com/desktop/PurplePOS-Setup.exe · 빌 1장 + 긴 주방티켓 1장
- 볼 것: 글자·한글 정상 / 우측 회색 띠(스크롤바) 없음 / 같은 줄 두 번 없음 / 중간에 안 끊김
- 서버에 프린터가 없어 논리검증까지만 됐다

**3. AI 사진 인식 정확도 확인 (5분)**
- 매장에서 Floor Plan > Items > **"Find by photo"** 로 음식 5~10개 촬영
- 기록이 `recognition_logs` 에 남으므로 **내가 top1 적중률·헷갈리는 메뉴 쌍을 숫자로 뽑아준다**
- 이 데이터가 있어야 "이대로 쓸지 / Vertex 로 전환할지"가 데이터로 결정된다

**4. 결정 대기 (급하지 않음)**
- exe 코드서명 인증서 구매 여부 — 미서명이라 설치 시 SmartScreen 경고
- Vertex 자격증명(3번 결과가 부족하면): GCP 프로젝트 ID + 서비스계정 JSON(역할 **Vertex AI User**)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```

> 전체 완료 아카이브(과거 세션 상세)는 `DEVELOPMENT_PLAN.md`. 이 파일은 진행/다음/후속의 단일 소스.
