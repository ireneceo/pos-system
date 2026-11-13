# [Claude Code · Fable 설계] 모자(연결) 관리자의 매장 기기 로그인 — PIN · 기기 매장 기억 · 로그인 실패 안내

- 날짜: 2026-11-13 · 작성: Fable(리더) · 구현: Opus(팀원) · 코드 미수정(설계만)
- 발단(Irene 원문): «앱에서 로그인 안된대. 아이디도 이메일도 왜 안되는 거야.» · «안드로이드앱에서 로그인 안된대» · «Kate는 kdineipc1 아이디이고 관리자인데 왜 스탭이야?» · «바꿀 수가 없어. 관리자로 로그인해도 스탭이니까 … 넌 코드문제 해결해» · «아이디 하나에 레스토랑관리자 1개만 가능해? 그럼 레스토랑 여러개인 경우 어쩌라고.» · «멀티로그인 이상한 거잖아.»

---

## 0. Irene 질문에 대한 답 (그대로 전달)

**«아이디 하나에 레스토랑 관리자 1개만 가능해?» — 아닙니다.** 아이디 하나는 «본래 매장 1곳 + 연결(모자) 매장 여러 곳» 을 가질 수 있고, kdineipc1 은 이미 그 상태입니다(본래 8번 + 연결 28번). 매장이 여러 개인 관리자를 위해 만든 구조가 그대로 있습니다.

**이상하게 보인 이유는 «멀티로그인» 자체가 아니라, 매장 기기의 PIN 이 연결 매장을 모른다는 구멍 하나입니다.** PIN 으로 들어가는 길(로그인·캐셔 전환·취소/현금/할인 승인·출퇴근 관리자 PIN)은 전부 «본래 소속이 그 매장인 계정» 만 찾습니다. 그래서 28번 기기에서 Kate 가 쓸 PIN 이 없었고, 누군가 28번에 직원 계정(69 «r28:Kate»)을 따로 만들어 PIN 을 줬고, 그 PIN 을 치는 순간 화면 주인이 직원 69 로 바뀝니다. 직원 화면(/restaurant/28/staff)에 «Kate Staff» 로만 보이는 것도 같은 이유입니다 — 그 화면은 연결된 «관리자» 는 목록에 보여 주지 않습니다(연결 «직원» 만 보여 줌).

**다른 방 제안(«kdineipc1 본래 매장을 28로 옮기고 69 비활성, 8번은 따로 붙임»)에 대한 Fable 권고: 옮기지 않는다.** 옮기면 같은 문제가 8번 매장으로 자리만 바뀝니다(이번엔 8번 기기에서 PIN 이 안 됨). 코드가 고쳐지면 옮길 필요가 없습니다. 그리고 실측상 «비활성» 만으로는 69 의 PIN 로그인이 막히지 않습니다(§5-3) — 정리할 때는 PIN 을 비우거나 계정을 지워야 합니다.

**지금 당장(코드 배포 전) Kate 가 관리자로 일하는 방법:** 기기 로그인 화면에서 PIN 패드 아래 «Use email sign-in» → kdineipc1 + 비밀번호 → 매장 고르기에서 28번. 그 뒤 POS 의 «Switch Cashier» 에 PIN 을 치면 다시 직원 69 가 되니 관리자 일을 할 때는 치지 않는다.

---

## 1. 실측으로 확인한 결함 4개 (전부 코드 읽기 · 재현은 구현 전에 개발서버에서)

| # | 결함 | 근거 | 증상 |
|---|---|---|---|
| D1 | PIN 길 5곳이 `users.restaurant_id` 만 봄 | `routes/staff.js:19`(verify-pin) · `:133`(verify-pin-permission) · `utils/voidPinGuard.js:62` · `utils/cashPinGuard.js:63` · `routes/attendance.js:120`(관리자 PIN) | 연결 관리자는 그 매장에서 PIN 로그인도, 취소·현금·할인 승인도 못 함. 매장의 관리자가 «연결» 뿐이면 그 매장엔 승인 PIN 을 가진 관리자가 0명 |
| D2 | **이메일 로그인이 기기 매장 기억을 «본래 매장» 으로 덮어씀** | `AuthContext.tsx:675-677` — 로그인 성공마다 `pos_device_restaurant = 본래 restaurantId`. 매장 고르기(전환)는 이 값을 안 바꿈(`ContextSelectPage.tsx:441` 주석) | 28번 기기에서 kdineipc1(본래 8)이 이메일 로그인 → 기기가 «8번 기기» 가 됨 → 로그아웃 뒤 PIN 패드(`StaffPinLogin` 은 기기 매장만 봄)에서 **28번 직원 PIN 이 전부 «Invalid PIN»**. «직원 아이디로 안 들어갔다» 와 맞는 유력 원인 |
| D3 | 로그인 실패 안내가 전부 «Invalid email/username or password» | `AuthContext.tsx:686-699` — 실패 본문에서 EMAIL_NOT_VERIFIED 만 가르고 나머지는 `return false` → `LoginPage.tsx:545` 고정 문구. 429(15분 20회 · 매장 공용 IP 단위 `server.js:206`)·403 비활성·500 도 같은 문구 | 한도에 걸려도 «비밀번호 틀림» 으로 보여 계속 재시도 → 계속 잠김. «아이디도 이메일도 안 된다» 와 맞는 유력 원인 |
| D4 | PIN 판정이 비활성 계정을 안 거름 | `routes/staff.js`·`voidPinGuard`·`cashPinGuard` 에 `is_active` 조건 없음(출퇴근만 있음) | 비활성 직원의 PIN 이 계속 통함 |

D2·D3 는 «왜 안 되는지» 의 **가설**이다(확정 아님). 운영 nginx 기록(401/429 가름)이 오면 대조한다. 다만 둘 다 그 자체로 결함이라 기록과 무관하게 고친다.
로그인 서버 쪽(`authService.login`)은 볼 것 없음 — 아이디·이메일 대소문자 무시, 앞뒤 공백 제거, `sqlInjectionProtection` 은 본문 해석(`server.js:252`)보다 앞(`:186`)이라 비밀번호 특수문자를 막지 않는다.

---

## 2. 정석 — PIN 은 «사람 × 매장» 값이다

권한(permissions)을 모자 행에 둔 것(v1.3)과 같은 이유로, **PIN 도 모자 행에 둔다.** 본래 PIN(users.pin_code)을 다른 매장에서 재사용하지 않는다 — PIN 은 매장 안에서만 유일해서 그 매장 직원 PIN 과 겹칠 수 있고, 겹치면 누구인지 가를 수 없다.

### 2.1 DB
- `user_contexts.pin_code VARCHAR(8) NULL` 추가(모델 + sync-database · 덧붙이기만 · 기존 행 전부 NULL). 값은 entity_type='restaurant' 행에만(브랜드·오너 모자는 NULL 유지).
- 새 표·새 목록 없음.

### 2.2 판정 한 곳 — `utils/storePin.js` (신규, 유일한 PIN 조회)
`findStorePinHolder(restaurantId, pin, { transaction })` →
`{ user, role, permissions, via: 'native' | 'hat', context: {id, entity_id, role} | null }` 또는 `null`
1. 본래 계정 먼저: `users.restaurant_id = R AND pin_code = pin AND role IN (RA, Staff)` — **지금과 같은 조건·같은 결과**(무회귀 제1 조건).
2. 없으면 모자: `user_contexts(entity_type='restaurant', entity_id=R, pin_code=pin, role IN RESTAURANT_HAT_ROLES)` JOIN users.
3. 두 경우 모두 `users.is_active = false` 면 `null`(D4).
4. permissions 는 모자면 `userContexts.hatPermissions(...)`, 본래면 users.permissions — 기존 함수 재사용.

D1 의 5곳이 전부 이 함수만 부른다(각자 `User.findOne` 금지). 역할·권한 판정(`staffHasVoidAuthority` 등)은 돌려받은 `role`·`permissions` 로 지금 식 그대로.
출퇴근 «본인 찍기»(`findStoreStaff`)는 이번 범위 밖 — 연결 계정의 출퇴근은 별개 주제(급여·근무표)라 건드리지 않는다. 출퇴근의 «관리자 PIN 으로 통과»(`attendance.js:120`)만 포함.

### 2.3 PIN 로그인 토큰 (`POST /api/staff/verify-pin`)
- `via='native'`: 지금 토큰 그대로 + 아래 `amr`.
- `via='hat'`: `/switch-context` 가 내는 것과 **같은 모양** — `role=모자 역할 · restaurant_id=R · brand_id/foodcourt_id=null · ctx:{v:1,t:'restaurant',id:R,r:역할}`. 응답 `user` 도 전환 응답과 같은 필드(`id`=그 사람 users.id, `role`, `restaurant_id=R`, `permissions`=hatPermissions). `touchContextUsage` 호출.
  → 서버는 매 요청 `projectContext` 가 모자를 다시 확인하므로(회수되면 본래로 내려감) 새 판정처가 생기지 않는다. 화면(`loginWithPin`·`switchUser`)은 응답의 role·restaurant_id 를 그대로 쓰므로 모양 변경 없음.
- **모든 PIN 토큰에 `amr:'pin'` 표시**를 싣는다(본래·모자 공통).

### 2.4 보안 경계
1. **PIN 세션은 다른 자격으로 못 넘어간다.** `/api/auth/switch-context` 는 `amr==='pin'` 이면 403 `PIN_SESSION`(본래로 복귀·다른 모자 전부). 이유: 4자리 PIN(15분 50회/IP)으로 28번에 들어온 세션이 그대로 «본래 8번 관리자»·브랜드 모자로 넘어가면 PIN 하나가 계정 전체 열쇠가 된다. 지금도 본래 PIN 세션이 자기 모자로 넘어갈 수 있는 길이 열려 있어 같이 닫는다(**동작 변경 1건 — 보고에 명시**). `authenticateToken` 은 `req.authMethod = decoded.amr || null` 한 줄만 더한다(그 밖 무변경). 화면: PIN 세션에서 매장 고르기를 누르면 «Sign in with email to switch stores» 안내.
2. **모자 PIN 을 정하는 사람:** 본인만(그 모자로 들어온 상태에서 자기 PIN) + System Admin. 다른 매장 관리자가 남의 관리자 모자 PIN 을 정하지 못한다. **PIN 세션에서는 PIN 변경 불가**(비밀번호로 들어온 세션만) — PIN 으로 PIN 을 갈아치우는 길 차단.
   - `PUT /api/auth/context-pin` `{ pin_code | null }` — authenticateToken · `req.contextProjected` 필수(모자 상태) · `req.authMethod !== 'pin'` · 대상 = 지금 토큰의 ctx 행 하나(주소·본문으로 행을 고르지 않는다 → IDOR 여지 없음) · 4자리 숫자.
3. **겹침 금지 = 쓰는 곳 3군데 모두 같은 함수.** `storePin.isPinTaken(restaurantId, pin, { exceptUserId, exceptContextId })` = 본래 계정 ∪ 모자 양쪽 조회. 호출: `routes/users.js:511`(직원 생성) · `:897`(직원 수정) · 새 `context-pin`. 겹치면 400 «PIN already used in this restaurant»(누구 것인지는 말하지 않는다).
4. 그래도 겹친 데이터가 있을 때(옛 데이터·경합): 조회는 **본래 계정 우선**으로 결정적이고, 인스펙션이 0건을 강제한다(§4-5).
5. 공개 라우트의 응답은 지금처럼 성공/«Invalid PIN» 두 가지뿐 — 본래/모자 여부로 문구가 갈리지 않는다. `pinLimiter` 그대로.
6. 좌석 수·요금제 판정 무변경(모자는 이미 좌석에 셈).

### 2.5 기기 매장 기억 (D2)
- 규칙: **기기 매장은 «이 기기가 일하는 매장» 이다. 한 번 정해진 값을 다른 매장 관리자의 로그인이 조용히 바꾸지 않는다.**
- `AuthContext.login`: 기억이 **비어 있을 때만** 본래 매장으로 채운다. 이미 다른 매장이 적혀 있으면 덮어쓰지 않는다.
- 매장 고르기(`switchContext` 성공 · 대상이 매장 모자·본래 매장): 기억이 비어 있으면 그 매장으로 채운다. 이미 다른 매장이면 지금 있는 «다른 매장 기기» 경고 흐름(ContextSelectPage)을 그대로 타고, 사용자가 넘어가기를 확정했을 때만 그 매장으로 바꾼다(지금은 넘어가도 안 바뀜 → 이후 PIN 패드가 옛 매장을 봄).
- 기기를 일부러 다른 매장으로 옮기는 길 = 위 확정 하나. 새 설정 화면 없음.
- ⚠ 2026-11-10 «Different store on this device» 차단 제거(922a95e33)는 되살리지 않는다 — 막는 게 아니라 «기억을 누가 바꾸느냐» 만 정한다.

### 2.6 로그인 실패 안내 (D3)
`AuthContext.login` 실패 분기: 429 → 서버 문구(«Too many login attempts, please try again later.»), 403 `ACCOUNT_DEACTIVATED` → 서버 문구, 401 → 지금 문구, 그 밖(5xx·네트워크) → «Login failed. Please try again.» 서버 429 본문은 `error` 가 글자(문자열)라 `error?.message` 로 읽으면 빈다 — `typeof error === 'string'` 도 읽는다. i18n 4개 언어 키.
한도 숫자(20회/15분)는 이번에 바꾸지 않는다 — nginx 기록에서 429 가 실제로 보이면 그때 따로 판단.

### 2.7 화면
- **내 PIN 정하기:** 모자(연결 매장) 상태의 관리자가 자기 PIN 을 넣는 칸 1개. 위치는 본래 관리자가 자기 PIN 을 고치는 곳과 같은 화면(구현 전 실측: `StaffPage.tsx` 의 본인 행/프로필 중 실제로 쓰는 곳 — RA 표준 컴포넌트, 새 화면 금지). 칸이 놓일 본인 행이 없으면 아래 «연결 관리자» 행의 본인 줄에 «Set PIN».
- **직원 화면에 연결 관리자 보이기:** `/api/users?include_contexts=1` 의 연결 목록을 `role='Staff'` 뿐 아니라 `'Restaurant Admin'` 모자까지(읽기 전용 행 · 역할 «Restaurant Admin» · «Linked account» 꼬리표 · PIN 있음/없음만 표시 · 수정·해제 버튼 없음, 본인 줄만 «Set PIN»). 이것이 «Kate 가 왜 Staff 로만 보여?» 의 직접 답이다.
- 연결 «직원»(Staff 모자)의 PIN 을 매장 관리자가 정해 주는 것은 **2단계**(같은 칸·같은 함수라 뒤에 붙이기 쉬움 · 이번 사고와 무관해 지금은 안 함).

---

## 3. 구현 범위 (이 밖은 손대지 않는다)

백엔드
1. `models/UserContext.js` pin_code · sync-database
2. `utils/storePin.js` 신규(`findStorePinHolder` · `isPinTaken`)
3. `routes/staff.js` verify-pin(토큰 2모양 + amr) · verify-pin-permission
4. `utils/voidPinGuard.js` · `utils/cashPinGuard.js` · `routes/attendance.js:120` — 조회만 교체
5. `middleware/auth.js` — `req.authMethod` 한 줄(두 미들웨어 모두: `:111` 근처와 `:390` 근처)
6. `routes/auth.js` — switch-context PIN 세션 차단 · `PUT /context-pin`
7. `routes/users.js` — PIN 겹침 검사 2곳을 `isPinTaken` 으로 · include_contexts 에 RA 모자(읽기 전용 필드만: PIN 값 자체는 내려보내지 않고 `has_pin`)
8. health-check `security`·`auth` 케이스 추가 · 인스펙션 1건

프론트
9. `AuthContext.tsx` — login 실패 분기(D3) · 기기 매장 기억 규칙(D2) · switchContext 성공 시 기억
10. `ContextSelectPage.tsx` — 확정 시 기억 갱신 · PIN 세션 안내
11. `StaffPage.tsx` — 연결 관리자 행 · 본인 «Set PIN»
12. locales 4개 언어

🔒 무접촉: 인쇄 보호파일 8개(POSTerminalPage·KitchenDisplayPage·MainLayout 포함 — `CashierPinModal` 은 보호파일이 아니며 **응답 모양이 같아 고칠 필요 없음**) · KDS 단계 로직 · K-DINE(매장 28) 메뉴 데이터. 작업 뒤 `check-print-guard` 변경 0건이어야 한다.
같은 디렉터리의 미커밋 «인쇄 지킴이»·«N 잠금» 과 파일이 겹치는지 먼저 확인(`routes/store.js`·`restaurants-crud.js`·`server.js`·`health-check.js` 가 그쪽 변경분) — `health-check.js` 는 겹친다. 그쪽 검증·커밋이 끝난 뒤 시작하고, 커밋은 따로.

설계와 다른 판단이 필요해지면 구현을 멈추고 Fable 에 묻는다.

---

## 4. 검증 (공용 기준 `gate` 대상 — 로그인·권한·공개 라우트. 끝난 뒤 Fable 검증 1회)

1. **무회귀:** 본래 직원·본래 관리자 PIN 로그인의 토큰 claim·응답이 `amr` 추가 말고 동일(변경 전후 실호출 대조).
2. **모자 관리자 실호출(데모 매장만):** 데모 계정에 데모 매장 RA 모자 → 비밀번호 로그인 → 전환 → `context-pin` 설정 → 로그아웃 → verify-pin → 토큰으로 그 매장 관리자 전용 API 200(예: 프린터 설정 저장이 «skipped role=Staff» 가 아니라 저장됨) · 다른 매장 API 403 · `/switch-context` 403 `PIN_SESSION`.
3. **승인 PIN:** 같은 PIN 으로 void·cash·discount(verify-pin-permission)·출퇴근 관리자 통과.
4. **경계·반증(고장주입 — pm2 restart 뒤 HTTP 로):**
   - 모자 회수 뒤 같은 PIN → 401, 이미 받은 **PIN 토큰 → 401**(본래로 폴백 금지 — 2026-11-13 gate 판정으로 정정: 폴백하면 PIN 세션이 본래 계정 전체가 된다. 비밀번호 세션의 폴백은 그대로)
   - 비활성 계정 PIN → 401(본래·모자 둘 다)
   - 겹치는 PIN 설정 3경로 전부 400
   - PIN 세션으로 `context-pin` → 403
   - 남의 매장 번호로 그 PIN → 401
   - `isPinTaken` 을 한쪽만 보게 고장내면 겹침 테스트가 실제로 실패하는지 1회, switch-context 차단을 빼면 해당 테스트가 실패하는지 1회
5. **인스펙션(배포 게이트):** 같은 매장에서 PIN 이 본래 계정 ∪ 모자에 두 번 나오는 행 0건. 운영 현재 데이터로 먼저 읽기 확인(0건이 아니면 배포 전 보고).
6. **D2 재현 → 수정 확인(실브라우저):** 기기 기억=A 매장 상태에서 본래 B 인 모자 계정으로 이메일 로그인 → 기억이 A 그대로 → 로그아웃 뒤 A 매장 직원 PIN 통과. 수정 전 코드에서 같은 순서가 실패하는 것도 1회 확인(가설 증명).
7. **D3:** 로그인 21회로 429 를 만들어 문구가 «Too many…» 인지(개발서버 · 끝나면 한도 창이 풀릴 때까지 다른 로그인 검증 순서 주의).
8. 순서: 코드 확정 → 빌드 1회 → `verify-all --full` 1회 → `check-sensitive-diff` → Fable 검증. SW 버전은 마지막.

---

## 5. 운영 데이터·운영 순서 (코드 밖 — Irene 이 운영에서 하는 일에 대한 Fable 권고)

1. kdineipc1 은 **그대로 둔다**(본래 8 + 연결 28). 28번 연결 행의 역할이 Restaurant Admin 인지는 아직 «확인 못 함» — 읽기로 한 번 확인.
2. 69 «r28:Kate» 는 **코드 배포 전까지 그대로 둔다.** 지금 지우면 Kate 가 28번 기기에서 쓸 PIN 이 아예 없어진다. 배포 뒤 Kate 가 연결 관리자 PIN 을 정하고(69 와 다른 번호거나, 69 를 먼저 정리) 나서 69 를 지운다.
3. 69 를 정리할 때는 **비활성만으로는 PIN 이 안 막힌다**(D4 · 이번 수정이 배포되기 전까지) — PIN 을 비우거나 계정을 삭제.
4. 그동안 Kate 의 관리자 작업은 §0 의 «Use email sign-in → 28번 고르기».

---

## 6. Irene 에게 물을 것

되돌리기 어려운 선택이 없어 **질문 없음.** 아래는 알림만:
- 동작 변경 1건: PIN 으로 들어온 세션은 «매장 바꾸기» 를 못 한다(비밀번호 로그인은 그대로). — Fable 판단: PIN 4자리가 계정 전체 열쇠가 되지 않게 하는 최소 장치.
- 운영 반영: 다음 배포 때(새 칸 1개 추가 · 기존 데이터 변경 없음).

## 7. 확인 못 한 것
- 앱에서 kdineipc1 이메일·아이디 로그인이 실제로 왜 실패했는지 — 운영 nginx 기록(401 vs 429) 미확인. D2·D3 는 코드상 결함이자 가설.
- 운영 28번 기기의 기기 매장 기억이 지금 몇 번인지(기기 안 값이라 서버에서 안 보임 — PIN 패드 위에 뜨는 매장 이름이 K-DINE Noodles 가 아니면 D2 확정).
- 안드로이드 앱 껍데기 고유의 문제(옛 버전·저장 초기화) 여부는 이번에 보지 않았다.
- `authenticateToken` 이 비활성 계정의 **이미 발급된 토큰**을 거르지 않는 것으로 읽힌다(middleware/auth.js 에 is_active 없음). 이번 범위 밖 — 별도 건으로 확인 필요.
