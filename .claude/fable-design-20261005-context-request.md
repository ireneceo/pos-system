# Fable 설계 2026-10-05 — 선택 화면 「역할 추가 요청」 (멀티 로그인 v1.3, Staff 포함)

작성: Fable(리더). 코드 변경 0 — 설계만. 근거 = HEAD 760c8c886 dev 코드 읽기 + dev DB 실측(아래 부록).
상위 문서: `docs/MULTI_CONTEXT_LOGIN_DESIGN.md`(§3·§4.3·§5.2·§5.4·§5.5·§6·§8-3·Q3).
선행: v1(10-04, `.claude/fable-design-20261004-context-request-v1-recovered.md`) 을 **기준으로 다시 쓴다**. v2(사업 추가)는 폐기 확정.
보존 코드: `.claude/next-context-request-grantContext.patch` (`git apply --check` 통과 — §5.1 의 출발점).

Irene 원문(10-04, 순서):
- 「이미 멀티 로그인 중에 추가신청 할 수 있어야 하는데 왜 없어? /pos/select-context … 맨 아래 … 리스트 아래에.」
- 「그러네. 추가할 때 역할을 추가하는 거지 구독을 추가하는게 아니네. 스탭으로 추가되는 것도 하는 거잖아. 내가 헷갈렸어」
- 「멀티로그인에 내 역할별도 다 로그인되게 하는 거잖아. 그치?」
- 「fable이 설계한대로 저장만 하고 다음에 구현하자」 → 10-05 「다음 업무 진행해.」

---

## 0. 결론 (한 줄씩)

1. **「추가 신청」 = 기존 매장·브랜드에 대한 역할을 요청 → 그 역할을 줄 수 있는 사람이 승인 → 선택 화면 카드.** 새 사업·구독 생성 아님(v2 폐기). 셀프 부여 아님 — 설계 §8-3 봉인(「user_contexts 행·소유행을 만드는 코드는 `grantContext` 하나」)은 그대로고, 승인이 그 하나를 부른다.
2. **요청 가능한 역할 4종 = 부여 가능한 조합 집합 하나**: (매장 × 직원 Staff) **신설** · (매장 × 매장 관리자 RA) · (매장 × 매장 오너) · (브랜드 × 브랜드 관리자 BM). 푸드코트·공급업체·BG 소유자 모자는 여전히 제외(§5.2 그대로).
3. **Staff 모자가 v1 에서 빠졌던 이유 = permissions 자리가 없어서**(§4.3 표). 이번에 **`user_contexts.permissions`(JSON NULL) 칸 1개를 더해** 모자별 작업·메뉴 권한을 싣는다. 투영은 그 값을 `req.user.permissions` 로 낸다. Staff 판정은 전부 `restaurant_id` 스칼라 + `permissions` 두 값만 읽으므로(auth.js:263·393·476 RA 와 같은 분기, `hasPosAccess` 등) RA 모자와 **같은 일치 경로** 위다 — 새 판정처 없음.
4. **승인 주체는 역할에 따라 둘**: Staff 요청 = **그 매장의 RA**(+SA). RA·오너·BM 요청 = **SA 만**(v1 그대로). 근거: RA 는 지금도 자기 매장 Staff 를 만들고 permissions 를 정한다(users.js:302-345 — RA 는 Staff 만 만들 수 있고 RA 는 못 만든다). 승인 권한을 생성 권한과 **같은 선**에 둔다 — 권한 확대 0.
5. **Staff 승인 때 승인자가 권한을 고른다**(요청자가 아니라). 기본 체크 0개(2026-06-03 「베이직 다 포함」 폐기 규칙과 동일), **1개 이상 필수**(0개 모자 = 들어가서 아무것도 못 보는 죽은 카드).
6. **요청은 별도 표 `user_context_requests`**(v1 그대로). `user_contexts` 에 status 를 넣지 않는다 — 그 표는 「행 있음 = 부여됨」을 목록·검증·전환·소켓·인스펙션이 읽는다.
7. **입구 = 선택 화면 리스트 맨 아래**(Irene 지정) + **사이드바 스위처·대시보드 퀵액션을 SA 외 상시 표시**(모자 0개인 사람이 선택 화면에 갈 길이 지금 없다 — 🔒 MainLayout 무접촉, 조건은 부품 두 개 안에 있다).
8. **처리 자리**: SA = Staff Management 상단 패널 + 대시보드 알림 1줄 + 메일. RA = 자기 매장 Staff 화면(`/restaurant/:rid/staff`) 상단 같은 패널 + 메일. 패널은 **한 컴포넌트**(scope 만 다름).
9. 이번 건은 단독 배포. 빌드 1회 · `verify-all --full` 1회 · Fable 게이트 1회(끝에).

### Irene 확인이 필요한 결정 (각각 Fable 권고 첨부) — §12 에 모아 둠

---

## 1. 범위

### 들어가는 것
요청 표·모델·마이그 2개(표 신설 + permissions 칸) · 요청/취소/검색 API(사용자) · 목록/대기수/승인/거절 API(SA·RA 공용, 보이는 범위는 함수 하나) · `grantContext` 추출(패치 적용) + Staff 조합·permissions 인자 · Staff 모자 목록/검증/전환/투영 · 알림 카테고리 2개 + 메일 · 선택 화면 하단 요청 UI · 스위처/퀵액션 상시 표시 · 권한 피커 공용화 · 요청 패널(SA·RA) · SA 대시보드 알림 · 테스트·health-check·인스펙션 · 문서.

### 들어가지 않는 것
셀프 부여 · 자동 승인 규칙 · 브랜드 소유자(BG)가 BM 요청을 승인하는 입구(후속 — Q3 그대로) · 푸드코트/공급업체/BG 소유자 모자 · 사업·구독 생성(v2) · `UserContextsSection`(SA 직접 부여 UI)에 Staff 옵션 추가(API 는 받되 UI 는 후속 — §5.1) · SA `StaffManagementPage` 의 자체 권한 목록 정리(기존 중복, 별건) · 🔒 인쇄 보호파일 8개(MainLayout 포함)·KDS 무접촉 · 운영 DB 쓰기 0 · v1 §7(오너 모자 409 운영 로그 읽기)은 10-04 건으로 종결 — 제외.

---

## 2. 흐름

```
[사용자]  선택 화면 리스트 맨 아래 「+ 역할 추가 요청」
   → 모달: 역할(매장 직원 / 매장 관리자 / 매장 오너 / 브랜드 관리자) · 대상 검색(2자 이상, 10건) · 메시지(선택)
   → POST /api/context-requests → pending 1행
        Staff  → 그 매장 RA 들에게 메일(context_request_received)
        그 외  → SA 들에게 메일(context_request_received)
   → 선택 화면에 「승인 대기 중」 행(취소 가능)

[승인자]  SA: 대시보드 알림 「역할 요청 N건」 → Staff Management 상단 패널 (모든 요청)
          RA: 메일 → /restaurant/:rid/staff 상단 패널 (자기 매장 Staff 요청만)
   → 승인: POST /:id/approve {permissions?}  (Staff 면 권한 피커에서 1개 이상 고른 뒤)
          → userContexts.grantContext(= SA 직접 부여와 같은 함수) → approved · 요청자 메일(context_request_result)
   → 거절: POST /:id/reject {note?} → rejected · 요청자 메일

[사용자]  승인 → 선택 화면 재진입 때 카드(요청 행 사라짐) → 전환 → Staff 면 그 매장 대시보드(permissions 대로 메뉴·POS)
          거절 → 「거절됨 · 사유」 행, ✕ 로 지움
```

---

## 3. 권한

| 행위 | 누가 | 서버 규칙 |
|---|---|---|
| 내 요청 보기/보내기/취소 · 대상 검색 | 로그인 사용자, **System Admin 제외**. 보내기는 **`is_demo` 제외(403 `Demo accounts cannot request`)** — 공개 로그인 계정이라 스팸 경로. `is_test` 는 허용(내부 계정, dev 검증에 필요) | `authenticateToken` + 핸들러 안 role 검사. 자기 행만(`user_id = req.user.id`) |
| 대상 검색 | 같은 사용자 | 이름 LIKE · `q` 2자 미만 `[]` · LIMIT 10 · 응답 `{id,name}` 만(매장·브랜드 이름은 이미 공개 정보) |
| 목록·대기수·승인·거절 | **SA: 전부.** **RA: 자기 매장(`req.user.restaurant_id`) 의 (restaurant × Staff) 요청만.** 그 외 역할 403 | 보이는 범위는 **함수 하나 `visibleRequestScope(reqUser)`** 가 WHERE 조각을 돌려주고, 목록·대기수·승인·거절이 전부 그것으로 행을 찾는다(없으면 404 — 존재 여부를 흘리지 않음). 승인은 **`grantContext` 만** 쓴다 |
| Staff 승인의 권한 선택 | 승인자 | body `permissions: string[]` — 허용 키 = 프론트 피커의 WORK_ACCESS ∪ MENU_GROUPS 키 집합(서버 상수 `STAFF_PERMISSION_KEYS`, 아래 §5.1). 집합 밖 키 400 · Staff 인데 0개 400 · Staff 아닌데 보내면 무시 |

- **요청 가능 조합 = 부여 가능 조합**, 한 집합 `GRANTABLE_COMBINATIONS` (패치의 것에 1행 추가):
  `{kind:'store_staff', entity_type:'restaurant', role:'Staff', approver:'restaurant_admin'}` · 나머지 3개는 `approver:'system_admin'`. 요청 라우트·승인 가드·부여 함수·UI 옵션이 **이 하나**를 본다.
- RA 승인자는 **투영된 RA 모자 세션**이어도 된다(모자 = 그 역할의 전체 권한 — 설계 원칙 그대로).
- 요청 시점 400 사유(이미 가진 자격) — `alreadyHoldsContext` 한 함수(패치 것 확장):
  네이티브 스칼라가 그 매장(RA·Staff 공통 `User already belongs to this restaurant`) · 브랜드 소유자/소속 · 소유행 실존 · **같은 매장에 매장 모자(RA 든 Staff 든)가 이미 있으면 400 `User already has access to this restaurant`** — RA↔Staff 두 장을 같은 매장에 겹쳐 두지 않는다(승급은 SA 가 회수 후 부여). 네이티브 오너의 오너 요청 400(기존 메시지). 같은 대상 pending 중복 409 · pending 5건 초과 400.
- **staff_limit(§12 D3)**: Staff·RA 모자 **승인** 시 그 매장 좌석 수 = `users(restaurant_id, role∈{Staff,RA})` + `user_contexts(restaurant, role∈{Staff,RA})` 를 세어 `restaurant.staff_limit` 이상이면 403(기존 생성 메시지 `Staff limit reached…` 그대로). 세는 SQL 은 `services/userContexts.countRestaurantSeats(rid)` 하나로 두고 **`routes/users.js` 생성 경로(470-490)도 그 함수를 쓴다**([[feedback_check_and_fix_same_sql]] — 두 곳이 다르게 세면 한도가 샌다). SA 직접 부여(`POST /users/:id/contexts`)는 종전대로 한도 검사 없음(SA 재량).
- `entity_id` 는 `normalizeEntityId`(`^\d+$`).

---

## 4. 데이터

### 4.1 새 표 `user_context_requests` (`models/UserContextRequest.js`) — v1 그대로
| 칸 | 형 | 비고 |
|---|---|---|
| id | INT PK AI | |
| user_id | INT NOT NULL → users | 요청자 |
| entity_type | ENUM('restaurant','brand') | 오너 요청도 entity 는 매장 |
| entity_id | INT NOT NULL | 폴리모픽 — FK 없음 |
| role | ENUM(users.role 11값 동형) | |
| message | VARCHAR(500) NULL | `sanitizeString` |
| status | ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending' | |
| decided_by / decided_at | INT NULL → users / DATETIME NULL | |
| decision_note | VARCHAR(300) NULL | |
| created_at / updated_at | | `underscored` |
| index | (user_id, status) · (status, created_at) · (entity_type, entity_id, status) — RA 범위 조회용 | 중복 pending 은 앱 레벨(UNIQUE 로 하면 두 번째 거절이 막힘) |

- 마이그 `scripts/migrate-user-context-requests.js` = `migrate-user-contexts.js` 패턴(`model.sync()`, INSERT 0, 멱등) → `migrations.registry.json` `deploy`.
- `models/index.js` association(`user` · `decidedBy`) + export. 승인 행은 남긴다(감사).

### 4.2 `user_contexts` 에 칸 1개 — `permissions JSON NULL`
- 모델 `UserContext` 에 `permissions: { type: DataTypes.JSON, allowNull: true }` 추가.
- 마이그 `scripts/migrate-user-contexts-permissions.js`: `information_schema.COLUMNS` 에 없을 때만 `ALTER TABLE user_contexts ADD COLUMN permissions JSON NULL AFTER granted_by`(MySQL 8 은 ADD COLUMN IF NOT EXISTS 없음 — 존재 검사로 멱등) → registry `deploy`. 기존 행(운영 RA·BM 모자)은 NULL = 종전 동작(`[]`/BM 키) — **바이트 동일**.
- 의미: **Staff 모자에만 값이 있다**(1개 이상). RA·오너·BM 행은 NULL. 인스펙션 UC-007 이 감시(§5.4).
- 이것은 「같은 개념에 새 목록」이 아니다 — `users.permissions` 는 계정 단위, 모자 권한은 (사람 × 매장) 단위라 모자 행에만 놓일 수 있다.

### 4.3 그 외 표 무변경
`restaurant_managers`·`users` 쓰기 경로 늘지 않음.

---

## 5. 서버

### 5.1 `services/userContexts.js` — 패치 적용 + Staff
1. **패치 그대로 적용**(`git apply .claude/next-context-request-grantContext.patch`) → `routes/users.js POST /:id/contexts` 가 얇아지고 `grantContext`·`GRANTABLE_COMBINATIONS`·`isGrantableCombination`·`isOwnerGrantCombination`·`loadGrantEntity`·`alreadyHoldsContext`·`nativeHoldConflict` 가 생긴다. 이 시점에 `tests/user-contexts-switch.test.js` 38/38 재확인(10-04 기록 재현).
2. 추가·확장:
   - `STAFF_HAT = { entity_type:'restaurant', role:'Staff' }` · `isStaffHat()`.
   - `STAFF_PERMISSION_KEYS` = `['access_pos','access_payment','access_void','access_serving','access_kitchen','menu_management','inventory','marketing','reports','support','settings']` (프론트 `StaffPage` WORK_ACCESS ∪ MENU_GROUPS 실측값) · `normalizeStaffPermissions(arr)` → 집합 밖 키 있으면 `{error}`, 중복 제거, 비면 `{error}`.
   - `GRANTABLE_COMBINATIONS` 에 `store_staff` 행(+ 각 행에 `approver`). `isGrantableCombination` 에 Staff 포함. `GRANTABLE_MESSAGE` 문자열 갱신(기존 테스트가 문자열 비교하면 그 테스트도 같이 갱신 — 메시지 바뀌는 곳은 **이 한 줄만**).
   - `grantContext({ …, permissions })`: Staff 면 `normalizeStaffPermissions` 통과값을 INSERT 에 싣는다(`permissions = :p` JSON 문자열; `ON DUPLICATE KEY UPDATE permissions = VALUES(permissions), updated_at = NOW()`). RA 모자 INSERT 는 종전 SQL 그대로(permissions 칸 안 건드림 → NULL).
   - `nativeHoldConflict`: Staff 는 RA 분기와 같은 조건(자기 매장 400). `alreadyHoldsContext`: 매장 모자는 role 무관 `entity_type='restaurant' AND entity_id=:e` 실존이면 400(§3).
   - `countRestaurantSeats(rid)` (§3).
   - `listContexts`: 매장 모자 쿼리 `uc.role = :role` → `uc.role IN ('Restaurant Admin','Staff')`, `uc.permissions` 도 SELECT(카드엔 안 쓰고 관리 화면 표시용). 카드 모양은 같다(글리프 ▦, role 라벨 'Staff').
   - `validateGrantedContext`·`getGrantedContextForSwitch`: 허용 조합에 Staff 추가(같은 SQL, `GRANT_JOIN_TABLE.restaurant`). **`getGrantedContextForSwitch` 응답에 `permissions`(파싱된 배열 또는 null)** 추가. 소켓은 boolean 그대로 — 변경 0.
   - 새 `resolveGrantedContext(userId, ctx)` → `{ok, permissions}` 한 쿼리; `validateGrantedContext` 는 `(await resolveGrantedContext()).ok` 로 재구성(SQL 1개 유지). 투영이 이걸 쓴다.
3. `UserContextsSection`(SA 직접 부여 UI)은 **무변경**(옵션 3개). API 는 Staff 를 받으므로 SA 가 직접 Staff 모자를 주려면 요청 패널을 쓴다 — UI 옵션 추가는 후속.

### 5.2 투영 — `middleware/auth.js projectContext` · `routes/auth.js /switch-context`
- `permissions`: `ctx.t === 'brand' ? BM 키 : (ctx.r === 'Staff' ? (row.permissions ?? []) : [])`. 그 외 필드는 종전 식 그대로(Staff 는 `restaurant_id = ctx.id`, 나머지 null). RA·오너·BM 모자의 투영값은 **바이트 동일**(38건이 증거).
- `/switch-context` 응답 `user.permissions` 도 같은 식 — 프론트 `switchUser` 가 그대로 받는다(AuthContext:912). `/me` 는 투영 req.user 를 내므로 자동. 크로스탭 팔로우(AuthContext:881)도 `fresh.permissions` 를 이미 읽는다.
- 프론트 `getDashboardPath('Staff', rid)` = `/restaurant/:rid/dashboard`(실측) — 기존 함수, 변경 0.

### 5.3 새 라우트 `routes/context-requests.js` → `server.js` `app.use('/api/context-requests', …)`
**`router.use(auth)` 금지 — 라우트마다 명시. 리터럴 경로를 `/:id` 보다 먼저.** 응답 표준 `{success, data|message}`.

| 메서드·경로 | 가드 | 동작 |
|---|---|---|
| `GET /mine` | auth, 비SA | 내 pending·rejected. 행: `{id, entity_type, entity_id, role, label(JOIN 이름 · 없으면 null), message, status, decision_note, created_at, decided_at}` |
| `GET /targets?type=restaurant\|brand&q=` | auth, 비SA | §3. `type` 두 값 외 400 |
| `POST /` | auth, 비SA, 비demo | `{entity_type, entity_id, role, message?}` → 조합 검사(`isGrantableCombination`) → 엔티티 실존(`loadGrantEntity`, 404) → `alreadyHoldsContext` 400 → pending 중복 409 → 5건 초과 400 → INSERT → 메일(§5.5, approver 별 수신자) → 201 |
| `DELETE /:id` | auth | 자기 행 + status ∈ {pending, rejected} 만. 그 외 404 |
| `GET /` | auth, SA 또는 RA | `?status=pending`(기본) · `visibleRequestScope(req.user)` · 요청자(id, full_name, email, role) · 엔티티 이름 · created_at DESC. 그 외 역할 403 |
| `GET /pending-count` | auth, SA 또는 RA | `{count}` — 같은 scope |
| `POST /:id/approve` | auth, SA 또는 RA | scope 안의 행이 아니면 404 · pending 아니면 409 · 요청자 비활성 400 · Staff 면 `permissions` 검증(§3) · 매장 모자(RA·Staff)면 `countRestaurantSeats` ≥ `staff_limit` → 403 · `grantContext({ target: 요청자, …, permissions, grantedBy: req.user.id })` → **ok 아니면 그 status·message 그대로 응답하고 행은 pending 유지** → ok 면 approved·decided_by/at → `logActivity`(부여 문구 + ` (approved request #id)`) → 요청자 메일 |
| `POST /:id/reject` | auth, SA 또는 RA | `{note?}`(≤300, sanitize) → rejected → `logActivity` → 요청자 메일 |

### 5.4 인스펙션 `scripts/inspection/suites/user-contexts.js`
- UC-002 허용 조합에 `(restaurant × Staff)` 추가.
- UC-005 「approved 요청에 결정자 있음」 · UC-006 「요청 조합은 부여 가능 집합 안」(4조합) — 표 없으면 스킵(UC-000 방식).
- **UC-007 「Staff 모자는 권한 1개 이상, 다른 모자는 NULL」**: `role='Staff' AND (permissions IS NULL OR JSON_LENGTH(permissions)=0)` = 0 **그리고** `role<>'Staff' AND permissions IS NOT NULL` = 0.
- UC-008 「RA↔Staff 같은 매장 겹침 0」: `GROUP BY user_id, entity_id HAVING COUNT(*)>1 WHERE entity_type='restaurant'` = 0.

### 5.5 알림 (`routes/notification-settings.js NOTIFICATION_CATEGORIES` + 메일)
| key | roles | 섹션 | 언제·수신자 |
|---|---|---|---|
| `context_request_received` | ['System Admin','Restaurant Admin'] | Inquiries & Tickets | 요청 생성. approver=`system_admin` → `getSystemAdminIds()`. approver=`restaurant_admin` → 그 매장 RA (`users WHERE restaurant_id=:rid AND role='Restaurant Admin' AND is_active=1` — `notificationService.getRestaurantAdminIds(rid)` 신설, 기존 `getRestaurantAdminAndOwnerIds` 는 오너를 포함해 부적합). SA 에게는 Staff 요청 메일을 보내지 않는다(패널·대기수로 본다) |
| `context_request_result` | ['all'] | Inquiries & Tickets | 승인/거절 → `sendNotification(요청자, …)` |
- 본문 = `locales/{en,ko,zh,ms}/email.json` 키 + 수신자 `preferred_language` 팩토리(`poNotifications.js` 패턴). `emailLayout(body)` + `attachments: getLogoAttachment()` · URL env 규칙. 버튼: SA → `/pos/admin/staff`, RA → `/restaurant/{rid}/staff`, 요청자 → `/pos/select-context`.
- 메일 실패는 요청/승인 성공을 막지 않는다.

### 5.6 health-check (`scripts/health-check.js` 컨텍스트 블록 옆)
- 익명 → `POST /context-requests` 401 · `GET /context-requests` 401 · `POST /context-requests/1/approve` 401.
- 데모 RA(23) → `POST /context-requests` **403**(demo) · `GET /context-requests/targets?type=restaurant&q=K` 200 배열 · `GET /context-requests/pending-count` 200(RA 범위).
- 데모 BG(22) → `GET /context-requests` 403(SA·RA 외).
- SA → `GET /context-requests/pending-count` 200 `{count}` 숫자.

---

## 6. 화면

### 6.1 선택 화면 `pages/ContextSelect/ContextSelectPage.tsx` (리스트 **맨 아래**)
1. **내 요청 행들**(`GET /mine`): 카드와 같은 높이(68px)·눌리지 않음. 글리프 = ▦ 매장(Staff·RA) / ◯ 오너 / ◐ 브랜드. 제목 = 대상 이름(없으면 「삭제된 매장/브랜드」). 아래줄 = 역할 · `승인 대기 중 · {날짜}` 또는 `거절됨{ · 사유}`. 오른쪽 `IconButton`(32×32, ✕) → pending 은 ConfirmModal 「요청을 취소할까요?」, rejected 는 바로 지움. 날짜 = `formatDate` + `getStoreInfo().timeZone` 폴백(없으면 날짜 생략 — 타임존 없는 `toLocaleDateString` 금지).
2. **「+ 역할 추가 요청」 카드**: 기존 `Card`(공용 Button 확장) 재확장 — 점선 테두리·가운데 정렬. `user.role === 'System Admin'` 또는 `user.isDemo` 면 렌더 안 함(서버도 403).
3. `FooterHint` 교체: 「요청은 매장 관리자(직원) 또는 시스템 관리자가 검토합니다. 승인되면 여기 카드로 나타납니다.」
- 요청 모달 `pages/ContextSelect/ContextRequestModal.tsx`(공용 `Modal` small):
  - 역할: `SelectComponents` — 매장 직원 / 매장 관리자 / 매장 오너(네이티브 오너면 숨김) / 브랜드 관리자. 역할이 entity_type 을 정한다(ENUM 미노출). 매장 직원 아래 한 줄 도움말 「권한은 그 매장 관리자가 승인할 때 정합니다.」
  - 대상: 검색(「이름 2자 이상」) → 300ms 디바운스 → `GET /targets` → 최대 10행(공용 Button secondary, 44px) → 선택 칩 + 「바꾸기」.
  - 메시지(선택 ≤500, 글자수).
  - 푸터 [취소] [요청 보내기](primary, 대상 없으면 disabled, 공용 async 가드).
  - 실패: 서버 message 그대로(**직접 fetch** — `fetchAPI` 는 본문을 버린다). 성공: 닫기 → `/mine` 재조회 → 본문색 한 줄 「요청을 보냈습니다.」
- 1440·390 폭 확인. 터치 44px.

### 6.2 입구 상시화 (🔒 MainLayout 무접촉 — 부품 두 개의 조건만)
- `components/Layout/HeaderContextSwitcher.tsx:159` `if (!contexts || contexts.length < 2) return null;` → `if (!user || user.role === 'System Admin') return null;` (contexts 비어도 그린다 — 라벨은 기본 카드 라벨 → 프로필 이름 폴백).
- `components/ContextSwitchQuickAction.tsx:33` 같은 규칙(`user` 를 `useAuth()` 에서 받는다).
- 결과: SA 아닌 모든 로그인 사용자의 사이드바 하단에 `◐ {내 이름} ▾` 가 **새로 보인다**(§12 D4). PosLayout(POS/KDS/FloorPlan)엔 원래 없다 — 현장 화면 변화 0. `check-print-guard.js` 변경 0.

### 6.3 권한 피커 공용화 — `components/Staff/StaffPermissionPicker.tsx`(새)
- `pages/Staff/StaffPage.tsx` 의 `MENU_GROUPS`·`WORK_ACCESS`·`renderPermissionCheckboxes`·`PermissionGrid`/`PermissionLabel`/`AlwaysOnBadge` 를 **그대로 옮겨** `<StaffPermissionPicker value onChange />` 로 만들고, `StaffPage` 는 그것을 import 해 **렌더 결과 동일**(기존 영어 하드코딩 문구도 그대로 — 번역은 별건). export 로 `STAFF_PERMISSION_KEYS` 도 내보내 서버 상수와 같은 값인지 테스트가 대조한다(§8-⑩).
- SA `StaffManagementPage` 의 자체 목록(labelKey 형)은 **무접촉**(기존 중복 — 별건으로 기록).

### 6.4 요청 패널 — `components/ContextRequests/ContextRequestsPanel.tsx`(새, 한 컴포넌트)
- props `scope: 'admin' | 'restaurant'`. 서버가 범위를 정하므로 프론트는 같은 `GET /context-requests` 를 부르고 결과만 그린다.
- 삽입: SA `pages/Admin/StaffManagementPage.tsx` 제목 아래 1줄 · RA `pages/Staff/StaffPage.tsx` 헤더 아래 1줄(`user.role` 이 RA 또는 SA 일 때만 마운트 — 이 페이지는 BG/FG/매니저도 연다). pending 0건이면 아무것도 그리지 않음.
- 행: `요청자 이름 (이메일 · 현재 역할)` · 글리프+대상 이름 · `Tag(역할)` · 메시지(한 줄 clamp) · 요청일 · [승인](primary small) [거절](danger small `#EF4444`).
- **Staff 요청의 [승인]** → 행 아래로 `StaffPermissionPicker` 펼침 + [권한 확정 후 승인](1개 이상일 때 활성) [접기]. 그 외 역할은 즉시 승인.
- 승인 실패(400/403/404/409) → 행 아래 서버 message 빨간 글(행은 남음 → 거절로 닫는다). 거절 = 공용 Modal(small) 사유 textarea(≤300) + [취소][거절].
- 처리 뒤 목록 재조회 + 대기수 갱신. 공용 컴포넌트만.

### 6.5 SA 대시보드 `pages/Admin/AdminDashboard.tsx`
`supportTicketsPending` Alert 패턴(1313-) 그대로: `pending-count > 0` → `Alert type="info"` 「역할 요청 {count}건 대기 — 클릭해서 보기」 → `/pos/admin/staff`. 문구 키는 `auth.json context.requests.*`.
RA 대시보드 알림은 두지 않는다(메일 + Staff 화면 패널로 충분 — 늘릴 땐 별건).

### 6.6 i18n `public/locales/{en,ko,zh,ms}/auth.json` `context.request.*`·`context.requests.*`
v1 표를 쓰되 아래만 다르다:
| 키 | en | ko |
|---|---|---|
| request.add | Request another role | 역할 추가 요청 |
| request.title | Request a role | 역할 요청 |
| request.type | Which role? | 어떤 역할이 필요한가요? |
| request.typeStoreStaff | Store staff | 매장 직원 |
| request.typeStoreStaffHint | The store admin sets your permissions when approving. | 권한은 그 매장 관리자가 승인할 때 정합니다. |
| request.typeStoreAdmin / typeStoreOwner / typeBrandManager | Store admin / Store owner / Brand manager | 매장 관리자 / 매장 오너 / 브랜드 관리자 |
| select.grantHint(교체) | Requests are reviewed by the store admin (staff) or a system administrator. Approved roles appear here as a card. | 요청은 매장 관리자(직원) 또는 시스템 관리자가 검토합니다. 승인되면 여기 카드로 나타납니다. |
| requests.title | Role requests | 역할 요청 |
| requests.pendingAlert | {{count}} role request(s) waiting — click to review | 역할 요청 {{count}}건 대기 — 클릭해서 보기 |
| requests.pickPermissions | Choose permissions, then approve | 권한을 고른 뒤 승인 |
| requests.approveWithPermissions | Approve with these permissions | 이 권한으로 승인 |
| requests.needOnePermission | Pick at least one permission. | 권한을 1개 이상 고르세요. |
그 외(request.target/searchPlaceholder/noResults/change/message/submit/sent/pending/rejected/cancel/cancelConfirm/dismiss/failed/deletedTarget · requests.approve/reject/rejectTitle/rejectNote/requestedOn/failed)는 v1 표 그대로. zh·ms 는 팀원이 같은 뜻으로. `npm run i18n:verify`.

---

## 7. 소켓·POS 현장
- 소켓 핸드셰이크는 `validateGrantedContext` boolean 그대로(Staff 조합 추가만) — 변경 0, 테스트로만.
- POS 진입 가드·기기 고정·PIN 전환 경로 무변경. **알려진 사실**: Staff 모자 보유자는 그 매장 PIN 캐셔 목록(`routes/staff.js` = `users.restaurant_id` 기준)에 **안 나온다** — 자기 세션으로 들어와 쓰는 사람이다. 문서 §8 에 한 줄.

---

## 8. 테스트 — `tests/context-requests.test.js` 신설
고정물(dev): 기존 테스트처럼 **demo 매장에만 쓴다**(rid 18 「Test Debug Restaurant」 staff_limit 5·좌석 1 / rid 39 「Gangnam Noodle House」 좌석 0 / 브랜드 17 K-Dine·10 K-Taste 둘 다 owner 22). 요청자는 demo 면 403 이라 **임시 `is_test=1` 사용자 2명을 beforeAll 에 INSERT**(u1 = RA of rid 39 → 요청자 · u2 = RA of rid 18 → RA 승인자) 하고 토큰은 기존 테스트와 같은 방식(jwt 직접 서명 또는 `_helpers.login`). SA 토큰 = 기존 방식. afterAll: 요청 행·user_contexts 행·소유행·임시 사용자 전량 삭제, staff_limit 원복.

① u1 `POST /` (brand 17 × BM) → 201 · `/mine` 1건 · SA `GET /` 에 보임 · `pending-count` 1.
② 같은 요청 → 409. (brand × Brand General) → 400. `entity_id:'1.16e2'` → 400. 없는 매장 → 404. 6번째 pending → 400.
③ u1 자기 매장 39 × RA → 400(이미 소속). BG 22(is_demo) `POST /` → 403. BG 22 는 brand 10 소유자 — `alreadyHoldsContext` 단위 호출로 400 확인(라우트는 demo 라 403 이므로 함수 레벨).
④ SA approve(①) → 200 · `user_contexts` 행(permissions NULL) · u1 `GET /auth/contexts` 에 ◐ K-Dine · status approved · `/mine` 에서 사라짐.
⑤ 다시 approve → 409. SA reject(다른 pending, note) → `/mine` 에 decision_note · u1 `DELETE /:id` → 200 · 다시 → 404. 다른 사용자 행 DELETE → 404.
⑥ **Staff 흐름**: u1 `POST /` (restaurant 18 × Staff) → 201 · **그 매장 RA u2 `GET /` 에 보임, SA 에도 보임** · u2 `GET /pending-count` 1 · **다른 매장 RA(u1 자신, rid 39) `GET /` 엔 0건** · u2 approve `permissions: []` → 400 · `permissions:['access_pos','bogus']` → 400 · `permissions:['access_pos','menu_management']` → 200 · 행 `permissions` 저장 · u1 `/auth/contexts` 에 ▦ Test Debug Restaurant · role 'Staff' · **switch-context → 응답 `user.permissions` = 그 두 키 · 토큰으로 `/auth/me` → role 'Staff', restaurant_id 18, permissions 그 두 키** · 그 매장 라우트(`GET /api/restaurants/18`) 200 · 다른 매장(39) 403 · `hasPosAccess` 계열 라우트 1개(팀원 선택, access_pos 로 열리는 것) 200.
⑦ u2(RA) 가 **RA 요청·BM 요청을 approve → 404**(scope 밖) · RA 아닌 역할(BG) `GET /` → 403 · 익명 401 · SA `POST /`(요청) → 403.
⑧ u1 이 rid 18 에 **RA 요청** → 400 `User already has access to this restaurant`(Staff 모자 보유). SA 가 Staff 행 회수(`DELETE /users/:id/contexts/:cid`) → 그 뒤 RA 요청 201.
⑨ **staff_limit**: `UPDATE restaurants SET staff_limit=1 WHERE id=18`(좌석 1) → ⑧ 의 RA 요청 approve → 403 `Staff limit reached` · 원복 → 200. 기존 생성 경로 `POST /users`(Staff, rid 18) 도 같은 수를 센다(모자 1 + 사용자 1 = 2 ≥ limit 2 → 403) 1건.
⑩ 오너: u1 → (restaurant 39? 아니다 — 자기 매장) → (restaurant 18 × Restaurant Owner) SA approve → 소유행 · ◯ 카드. 네이티브 오너(dev `owner@purplehere.com` is_test, id 154)로 오너 요청 → 400.
⑪ **상수 동형**: 서버 `STAFF_PERMISSION_KEYS` 와 프론트 `StaffPermissionPicker` export 키 집합이 같다(파일을 읽어 비교 — 프론트 jest 는 게이트 밖이라 백엔드 테스트에서 소스 파싱).
⑫ 기존 `user-contexts-switch.test.js` 38건 그대로 통과(패치 + Staff 확장의 무회귀) — 메시지 문자열이 바뀐 곳은 `GRANTABLE_MESSAGE` 한 줄만이어야 한다.
- 고장주입(assert 필수, 결과 보고): **FI-14** approve 에서 `grantContext` 호출 제거(status 만 바꿈) → ④·⑥ 실패 확인 후 원복. **FI-15** approve 의 scope 검사 제거 → ⑦ 의 RA 404 테스트 실패 확인 후 원복. **FI-16** `projectContext` 의 Staff permissions 줄을 `[]` 로 → ⑥ `/me` permissions 단언 실패 확인 후 원복. **FI-17** 인스펙션 UC-007: Staff 행의 permissions 를 SQL 로 NULL 로 바꿔 실패 확인 → 원복.

---

## 9. 검증 순서 (빌드 1회 · sweep 1회)
1. 패치 적용 → `npx jest tests/user-contexts-switch.test.js`(38/38) → §4·§5 백엔드 확정 → `node scripts/migrate-user-context-requests.js && node scripts/migrate-user-contexts-permissions.js`(dev) → `pm2 restart dev-backend` → `npx jest tests/context-requests.test.js tests/user-contexts-switch.test.js` → `node scripts/health-check.js` → 인스펙션 UC-002/005/006/007/008 → FI-14~17.
2. §6 프론트 전부 확정(피커 추출 포함) → `npm run i18n:verify` → **SW 는 마지막**(HEAD 5.83 → 5.84) → `npm run build:dev` 1회 → `node scripts/verify-all.js --full` 1회(print-guard 0 변경 · design-guard · mount sweep).
3. 실브라우저(dev, 임시 is_test 계정 — demo 는 403): ⒜ u1 로그인 → 사이드바 하단 `◐ 이름 ▾`(모자 0개인데도) → 선택 화면 → 맨 아래 「+ 역할 추가 요청」 → 매장 직원 · 「Test」 검색 → Test Debug Restaurant → 보내기 → 「승인 대기 중」 행 → ✕ 취소 → 다시 요청. ⒝ u2(rid 18 RA) 로그인 → `/restaurant/18/staff` 상단 패널 1건 → 승인 → 피커 펼침 → access_pos + menu_management → 승인 → 패널 사라짐. ⒞ u1 선택 화면 재진입 → ▦ 카드(Staff) → 전환 → `/restaurant/18/dashboard` · 사이드바에 Products 만 추가로 보임 · POS Terminal 진입 가능 · 스위처 제목 = 매장명 → 본래 정체 복귀. ⒟ SA 로그인 → 대시보드 알림 → Staff Management 패널 → 다른 요청 거절(사유) → u1 화면 「거절됨 · 사유」 → ✕. ⒠ SA 선택 화면·사이드바에 입구 **없음**. ⒡ RA StaffPage 기존 Add/Edit 모달의 권한 체크박스가 전과 같은 모양. 1440·390, console.error 0. **끝나면 전량 삭제.**
4. `node scripts/check-sensitive-diff.js` → Fable 게이트 1회(사실만: diff 파일 목록 · 테스트 수 · FI 결과 · sweep 결과 · 확인 불가 항목).

---

## 10. 배포·롤백
- 마이그 2개 = CREATE TABLE + ADD COLUMN NULL(INSERT 0) · 레지스트리 deploy · expand-only(ENUM 은 새 표에만). 롤백 = 이전 번들+백엔드 복원 — 표·칸은 남아도 무해(옛 코드는 읽지 않는다).
- 운영 쓰기 0. 배포 뒤 Irene 확인 1회: help@ 선택 화면 맨 아래 입구 + 사이드바 하단 스위처가 보이는지(요청은 보내지 않아도 됨).

## 11. 문서 (새 파일 0)
- `docs/MULTI_CONTEXT_LOGIN_DESIGN.md`: §3 끝 **§3.7 요청 표 + `user_contexts.permissions`** · §4.3 표 permissions 행에 「Staff 모자 = 행의 permissions(v1.3)」 · §5 끝 **§5.6 Staff 모자(v1.3)** · §6 끝 **§6.4 역할 추가 요청(v1.3) — 승인 주체 2종** · §6.2 「스위처·퀵액션은 SA 외 상시 표시」 · §8 에 「Staff 모자는 PIN 목록에 없다」 · Q3 끝 「v1.3: 셀프 **요청** 허용 · 셀프 부여 금지 유지 · Staff 승인은 그 매장 RA · 쓰기 경로는 `grantContext` 하나」.
- `.claude/next-context-request.md` 는 구현 완료 뒤 삭제(기록은 이 문서와 상위 문서로 이전). 메모리·session-state·DEVELOPMENT_PLAN 은 **게이트 통과 뒤**.

---

## 12. Irene 확인 필요 결정 — 각 Fable 권고

| # | 결정 | Fable 권고 | 이유 | 되돌리기 |
|---|---|---|---|---|
| **D1** | Staff 요청 승인 주체 | **그 매장 RA(+SA). RA·오너·BM 요청은 SA 만** | RA 는 지금도 자기 매장 Staff 를 만들고 권한을 정한다. 승인 권한 = 생성 권한과 같은 선 → 권한 확대 0. SA 만으로 두면 「누가 우리 직원인가」를 모르는 사람이 결정한다 | 쉬움 — scope 함수 한 곳 |
| **D2** | Staff 모자 권한을 누가 정하나 | **승인자(RA)가 승인 순간 고른다. 기본 0개, 1개 이상 필수** | 권한은 주는 쪽 소관(요청자가 고르면 셀프 권한 선택). 0개 모자는 죽은 카드 | 쉬움 |
| **D3** | 모자가 요금제 직원 한도(staff_limit)에 포함되나 | **포함 — Staff·RA 모자 승인 때 좌석을 센다(사용자 + 모자). SA 직접 부여는 종전대로 예외** | 모자 = 그 매장에서 일하는 사람 1명. 안 세면 한도가 모자로 새는 돈 경로. 세는 SQL 은 생성 경로와 한 함수 | 중간 — 생성 경로가 같은 함수를 쓰게 바뀜(한도 판정이 조금 엄격해짐: 기존 SA 부여 RA 모자도 이제 좌석으로 셈) |
| **D4** | 사이드바 하단 `◐ 이름 ▾`·대시보드 퀵액션을 **SA 외 전 사용자**에게 상시 표시 | **표시** | 모자 0개인 사람이 선택 화면(=입구)에 갈 길이 지금 없다. PosLayout 엔 없어 현장 변화 0 | 쉬움 — 조건 두 줄 |
| D5 | demo 계정은 요청 불가(403), is_test 는 허용 | 확정(기술) | 공개 로그인 = 스팸 경로. 내부 테스트 계정은 검증에 필요 | — |

D1~D4 는 Irene 컨펌 뒤 착수. D5 는 기술 결정(통보).

## 하지 말 것 (재확인)
`user_contexts` 에 status 칸 · 승인 라우트에서 직접 INSERT · 요청자가 permissions 를 고르는 UI · `router.use(authenticateToken)` · `/:id` 보다 뒤의 리터럴 경로 · 🔒 MainLayout/인쇄 8파일/KDS 접촉 · 운영 쓰기 · 프론트 빌드 2회 · 구현 중 세부를 Fable 에 되묻기(결정해 결과에 붙인다, 앵커 불일치만 중단·보고).

---

## 부록 — 실측 근거 (2026-10-05 dev)
- `user_contexts` 운영 스키마(dev 동일): permissions 칸 없음 · 행 0 · UNIQUE(user_id, entity_type, entity_id, role).
- 투영: `middleware/auth.js:26-62 projectContext` — permissions 는 `ctx.t==='brand' ? BM키 : []`. `routes/auth.js:640-730 switch-context` 동형.
- Staff 서버 판정: `auth.js:263·393·476` RA 와 같은 `restaurant_id` 분기 · `hasPosAccess/…` 는 `permissions` 의 `access_*` 키. `requireRole(... 'Staff')` 0곳(실측).
- Staff 프론트: `MainLayout.tsx:1548 hasMenuPermission`(🔒 — 읽기만) · `AuthContext.tsx:552·633·881·912` 가 Staff 의 permissions 를 API 값으로 받음 · `utils/dashboardPath.ts:36` Staff → `/restaurant/:rid/dashboard`.
- 권한 키: `pages/Staff/StaffPage.tsx:38-55` MENU_GROUPS 6 + WORK_ACCESS 5 = 11키 · 피커 `renderPermissionCheckboxes`(:636-690, 지역 함수). SA `StaffManagementPage.tsx:256-` 는 별도 목록(기존 중복).
- RA 의 Staff 생성 권한: `routes/users.js:302-345`(RA 는 Staff 만, 자기 매장 강제) · 한도: `:470-490`(users 만 셈).
- 알림: `utils/notificationService.js` — `sendNotification(userId, category, mail)`·`sendNotificationBatch(ids, …)`·`getSystemAdminIds()`·`getRestaurantAdminAndOwnerIds(rid)`(오너 포함) · 메일 4언어 = `locales/*/email.json` + `poNotifications.js` 의 `preferred_language` 팩토리.
- 고정물: rid 18(demo, staff_limit 5, 좌석 1) · 38(demo, 좌석 2, RA=23 demo) · 39(demo, 좌석 0) · 브랜드 10·17 owner 22 · 네이티브 오너 is_test `owner@purplehere.com`(154).
- 스위처 조건: `HeaderContextSwitcher.tsx:159` · `ContextSwitchQuickAction.tsx:33` 둘 다 `contexts.length < 2 → null`.
- SW: HEAD `5.83-owner-po-on-behalf-20261005`.
