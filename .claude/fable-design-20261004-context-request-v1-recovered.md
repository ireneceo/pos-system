
# Fable 설계 2026-10-04 — 선택 화면에서 「자격 추가 요청」 (멀티 로그인 v1.3)

작성: Fable(리더). 코드 변경 0 — 설계만. 근거 = dev 코드 읽기 + 팀원이 전달한 운영 읽기 실측.
상위 문서: `docs/MULTI_CONTEXT_LOGIN_DESIGN.md`(§3·§5.4·§5.5·§6·§8-3·Q3) · 오늘 판정 `.claude/fable-verdict-20261004-owner-hat-sidebar.md`.

Irene 원문:
- 「내가 오너 시스템관리자에서 선택을 했는데도 적용이 안되는 거야. 그리고 이미 멀티 로그인 중에 추가신청 할 수 있어야 하는데 왜 없어? https://purplehere.com/pos/select-context 이 페이지에 추가할 수 있어야지. 맨 아래 추가할 수 있어얒. 리스트 아래에.」
- 「그냥 다하고 배포할래. 왜???」

---

## 0. 결론 (한 줄씩)

1. **첫 문장(「선택했는데도 적용 안 됨」)은 이미 판정·착수된 오너 모자 사이드바 건으로 본다**(`owner-hat-sidebar` 판정 · `routes/owner.js` 1곳, 팀원 진행 중). 다른 읽기 하나(§7 ⓐ)는 운영 로그 1회 읽기로 사실만 확인하고, 사실이면 **보고만** 한다 — 이 절단면에 넣지 않는다.
2. **「추가신청」 = 요청→SA 승인.** 셀프 부여가 아니다. 설계 §8-3 봉인(「user_contexts 행·소유행을 만드는 코드는 SA 전용 하나」)은 **그대로** 유지하고, 승인이 그 하나를 호출한다. Irene 의 단어가 「신청」이고, 모자 = 그 역할의 전체 권한(`requireRole` 259곳)이라 자기 손으로 넓히는 길은 열지 않는다.
3. **요청은 별도 표 `user_context_requests`.** `user_contexts` 에 status 칸을 넣지 않는다 — 그 표는 「행이 있다 = 부여됐다」를 목록·검증·전환·소켓·인스펙션 6곳이 읽는다. 필터 하나 빠지면 셀프 부여 구멍이다. 표를 나누면 잊어도 문이 안 열린다.
4. **입구는 선택 화면 리스트 맨 아래**(Irene 지정) + 입구에 닿을 길: 지금은 모자 2개 미만이면 사이드바 스위처·대시보드 퀵액션이 **아예 안 그려져** 모자 없는 사람은 선택 화면에 갈 수 없다 → **SA 아닌 모든 로그인 사용자에게 상시 표시**로 바꾼다(MainLayout 🔒 무접촉 — 로직은 부품 안에 있다).
5. **SA 처리 자리 = Staff Management 상단 패널 + SA 대시보드 알림 1줄 + 메일.** 승인 = 기존 부여 함수. 거절 = 사유 한 줄(선택).
6. 배포는 Irene 지시대로 **한 묶음**(단말기 Void·직원 발주 + 오너 모자 수정 + 이 기능) — 빌드 1회 · `verify-all --full` 1회 · Fable 게이트 1회.

---

## 1. 범위

### 들어가는 것
- 요청 표·모델·마이그(등록) · 요청/취소/검색 API(사용자) · 목록/승인/거절/대기수 API(SA) · 부여 로직 함수 추출(기존 SA 부여 라우트와 승인이 **같은 함수**) · 알림 카테고리 2개 + 메일 · 선택 화면 하단 요청 UI · 스위처/퀵액션 상시 표시 · SA 패널 · 대시보드 알림 · 테스트·health-check·인스펙션 · 문서.

### 들어가지 않는 것 (하지 말 것)
- 셀프 부여 · 「관련 매장이면 자동 승인」 같은 파생 규칙 · 브랜드 소유자(BG)가 직접 승인하는 입구(후속 별건, Q3 그대로) · 푸드코트 모자 · `oversight→ownership` 자동 승격(§7 ⓐ) · 요청 표에 대한 접근판정(5번째 판정처 금지 — 요청 표는 권한을 **전혀** 주지 않는다) · 🔒 인쇄 보호파일 8개(MainLayout 포함)·KDS 무접촉 · 운영 DB 쓰기 0.

---

## 2. 흐름

```
[사용자]  선택 화면 리스트 맨 아래 「+ 자격 추가 요청」
   → 모달: 유형(매장 관리자 / 매장 오너 / 브랜드 관리자) · 대상 검색(이름 2자 이상, 최대 10건) · 메시지(선택)
   → POST /api/context-requests  → 표에 pending 1행 · SA 에게 메일(context_request_received)
   → 선택 화면에 「대기 중」 행으로 보임(취소 가능)

[SA]      메일 / 대시보드 알림 「자격 요청 N건」 → Staff Management 상단 패널
   → 승인: POST /:id/approve → userContexts.grantContext(= 기존 SA 부여와 같은 함수) → approved · 요청자 메일
   → 거절: POST /:id/reject {note?} → rejected · 요청자 메일

[사용자]  승인 → 다음 선택 화면 진입 때 카드로 보임(요청 행은 사라짐)
          거절 → 「거절됨 · 사유」 행, ✕ 로 지움
```

---

## 3. 권한

| 행위 | 누가 | 서버 규칙 |
|---|---|---|
| 요청 보기/보내기/취소 | 로그인 사용자 **System Admin 제외** · `is_demo`/`is_test` 계정 제외(400 `Demo accounts cannot request`) | `authenticateToken` + 라우트 안 role 검사. 자기 행만(`WHERE user_id = req.user.id`) |
| 대상 검색 | 같은 사용자 | 이름 LIKE, `q` 2자 미만이면 `[]`, LIMIT 10, 응답 `{id,name}` 만. 매장·브랜드 이름은 이미 공개(모바일 주문·가맹 지도)라 노출 확대가 아니다 |
| 목록·대기수·승인·거절 | `requireRole('System Admin')` | 승인은 **`grantContext` 만** 쓴다. 다른 쓰기 경로 금지 |

- 요청 가능한 조합 = 부여 가능한 조합과 **같은 집합** 하나로 관리: (restaurant × Restaurant Admin) · (restaurant × Restaurant Owner) · (brand × Brand Manager). `services/userContexts.js` 에 `GRANTABLE_COMBINATIONS` + `isGrantableCombination(entity_type, role)` 를 두고, 기존 `isV1GrantableCombination`·`isBrandManagerHat` 와 새 `isOwnerGrantCombination`(지금 `routes/users.js` 의 인라인 `grantOwner`) 을 그 안에서 조합한다. **요청 라우트·부여 함수·UI 옵션이 이 하나를 본다.**
- 요청자가 네이티브 Restaurant Owner 면 「매장 오너」 옵션을 숨기고 서버도 400(기존 부여 함수 메시지 `Native owners claim restaurants from the owner dashboard` 그대로).
- 요청 시점 400 사유(이미 가진 자격): 네이티브 스칼라가 그 매장/브랜드 · 브랜드 소유자(`brands.owner_id`) · `user_contexts` 행 실존 · 소유행 실존. 같은 대상 pending 중복 → 409. pending 5건 초과 → 400.
- `entity_id` 는 `normalizeEntityId`(`^\d+$`) — 기존 규칙.

---

## 4. 데이터

### 4.1 새 표 `user_context_requests` (모델 `models/UserContextRequest.js`)
| 칸 | 형 | 비고 |
|---|---|---|
| id | INT PK AI | |
| user_id | INT NOT NULL → users | 요청자 |
| entity_type | ENUM('restaurant','brand') | 오너 요청도 entity 는 매장 |
| entity_id | INT NOT NULL | 폴리모픽 — FK 없음(user_contexts 와 같은 이유) |
| role | ENUM(users.role 11값 동형) | `user_contexts.role` 과 같은 목록 |
| message | VARCHAR(500) NULL | 요청자 메모, `sanitizeString` |
| status | ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending' | |
| decided_by | INT NULL → users | SA |
| decided_at | DATETIME NULL | |
| decision_note | VARCHAR(300) NULL | 거절 사유(승인에도 넣을 수 있음) |
| created_at / updated_at | | `underscored`, timestamps |
| index | (user_id, status) · (status, created_at) | 중복 pending 은 앱 레벨 검사(UNIQUE 로 표현하면 두 번째 거절이 막힌다) |

- 마이그 `scripts/migrate-user-context-requests.js` = `migrate-user-contexts.js` 와 같은 패턴(`model.sync()` 만, INSERT 0행, 멱등) → `scripts/migrations.registry.json` `deploy` 에 등록. ENUM 신설이라 expand-only 규칙과 충돌 없음(새 표).
- `models/index.js`: `UserContextRequest.belongsTo(User as 'user')`, `belongsTo(User, foreignKey 'decided_by', as 'decidedBy')`, export.
- 승인된 행은 **남긴다**(감사 — 누가 요청해 누가 승인했나). 사용자 목록에선 pending·rejected 만 보인다.

### 4.2 기존 표 무변경
`user_contexts`·`restaurant_managers` 는 쓰기 경로가 늘지 않는다 — 승인이 `grantContext` 를 부를 뿐.

---

## 5. 서버

### 5.1 `services/userContexts.js` — 부여 함수 추출 (판정처 분열 금지)
`routes/users.js POST /:id/contexts` 의 본문(조합 검사 → 브랜드 분기 → 매장 실존 → 오너 소유행 분기 → 자기 매장 400 → user_contexts upsert)을 **그대로** 옮긴다:
```js
async function grantContext({ target, entity_type, entity_id, role, grantedBy })
  // → { ok:true, data:{user_id, entity_id, role}, message, entityName, logDescription, restaurantId? }
  // → { ok:false, status: 400|404|409, message }   // 메시지·상태코드는 현재 문자열 그대로
```
- `routes/users.js` 라우트는 얇게: target 조회·비활성 400 → `grantContext` → `logActivity`(기존 문구, 반환값으로) → 응답. **응답 shape·메시지·상태코드 바이트 동일** — `tests/user-contexts-switch.test.js` 38건이 그 증거.
- `GRANTABLE_COMBINATIONS`·`isGrantableCombination`·`isOwnerGrantCombination` 추가·export.
- 「이미 가진 자격인가」 판정도 여기 한 함수 `alreadyHoldsContext(user, {entity_type, entity_id, role})` 로 두고 요청 라우트가 쓴다(부여 함수 안의 같은 400 조건과 **같은 SQL/조건**을 공유 — [[feedback_check_and_fix_same_sql]]).

### 5.2 새 라우트 파일 `routes/context-requests.js` → `server.js` 에 `app.use('/api/context-requests', …)`
**라우터 전역 `router.use(auth)` 금지 — 라우트마다 명시**([[reference_router_use_leaks_to_api_root]]). **리터럴 경로를 `/:id` 보다 먼저** 등록.

| 메서드·경로 | 가드 | 동작 |
|---|---|---|
| `GET /mine` | auth, 비SA | 내 요청 중 pending·rejected. 응답 행: `{id, entity_type, entity_id, role, label(엔티티 이름 JOIN), message, status, decision_note, created_at, decided_at}`. 엔티티가 사라진 행은 label 을 `null` 로(프론트가 「삭제된 매장」표기) |
| `GET /targets?type=restaurant|brand&q=` | auth, 비SA | §3 규칙. `type` 두 값 외 400 |
| `POST /` | auth, 비SA, 비demo | body `{entity_type, entity_id, role, message?}` → §3 검사 → INSERT pending → SA 메일(아래 5.3) → 201 `{success, data: row}` |
| `DELETE /:id` | auth | 자기 행 + status ∈ {pending, rejected} 만 삭제. 그 외 404 |
| `GET /` | SA | `?status=pending`(기본) · 요청자(id, full_name, email, role) · 엔티티 이름 · created_at DESC |
| `GET /pending-count` | SA | `{count}` — 대시보드 알림 |
| `POST /:id/approve` | SA | pending 아니면 409. `User.findByPk(user_id)` → 비활성 400 → `grantContext({... grantedBy: req.user.id})` → **ok 아니면 그 status·message 그대로 응답하고 행은 pending 유지**(SA 가 사유를 보고 거절로 닫는다) → ok 면 status approved·decided_by/at → `logActivity`(기존 부여 문구 + ` (approved request #id)`) → 요청자 메일 |
| `POST /:id/reject` | SA | body `{note?}`(≤300, sanitize) → rejected·decided_by/at·decision_note → `logActivity` → 요청자 메일 |

응답 형식 표준 `{success, data|message}`. 에러 메시지는 영어 문자열(기존 라우트 관행).

### 5.3 알림 (`routes/notification-settings.js NOTIFICATION_CATEGORIES` + 메일)
| key | roles | 섹션 | 언제 |
|---|---|---|---|
| `context_request_received` | ['System Admin'] | Inquiries & Tickets | 요청 생성 → `getSystemAdminIds()` + `sendNotificationBatch`(hardware_quote 패턴 `routes/public.js:619-`) |
| `context_request_result` | ['all'] | Inquiries & Tickets | 승인/거절 → `sendNotification(requester, …)` |
- 템플릿 `emailLayout(body)` + `attachments: getLogoAttachment()` · URL 은 env 규칙(`FRONTEND_URL || prod/dev`) · 버튼 링크: SA → `/pos/admin/staff`(Staff Management 실제 경로를 `App.tsx:656` 주변에서 확인), 요청자 → `/pos/select-context`.
- 본문 언어: 기존 백엔드 `locales/` 4언어 패턴(`poNotifications.js` 의 수신자 `preferred_language` 팩토리 방식)을 따른다. 그 패턴이 쓰기 어려우면 **영어 1종 + 보고**(hardware_quote 와 동일) — 팀원 판단, 결과에 붙인다.
- 메일 실패는 요청/승인 성공을 막지 않는다(try/catch, 로그만).

### 5.4 인스펙션 `scripts/inspection/suites/user-contexts.js` (표 없으면 스킵 — 기존 UC-000 방식)
- UC-005 「approved 요청에 결정자 있음」: `status='approved' AND (decided_by IS NULL OR decided_at IS NULL)` = 0.
- UC-006 「요청 조합은 부여 가능 집합 안」: pending/approved 중 (restaurant×RA)·(restaurant×Owner)·(brand×BM) 외 = 0.

### 5.5 health-check (`scripts/health-check.js` 컨텍스트 블록 :287- 옆)
- 익명 → `POST /context-requests` 401 · `GET /context-requests` 401 · `POST /context-requests/1/approve` 401.
- 데모 RA 토큰 → `GET /context-requests` 403 · `POST /context-requests/1/approve` 403 · `GET /context-requests/targets?type=restaurant&q=K` 200 배열.
- SA 토큰 → `GET /context-requests/pending-count` 200 `{count}` 숫자.

---

## 6. 화면

### 6.1 선택 화면 `pages/ContextSelect/ContextSelectPage.tsx` (리스트 **맨 아래**)
리스트 카드들 아래, 순서대로:
1. **내 요청 행들**(`GET /context-requests/mine`): 카드와 같은 모양·높이(68px)이되 눌리지 않음(`disabled` 톤이 아니라 테두리 점선 없이 흐린 글리프). 왼쪽 글리프 = 유형(▦ 매장 / ◯ 오너 / ◐ 브랜드), 제목 = 대상 이름(없으면 「삭제된 매장/브랜드」), 아래줄 = 역할 · `승인 대기 중 · {날짜}` 또는 `거절됨{ · 사유}`. 오른쪽 끝 `IconButton`(32×32, ✕) → pending 이면 ConfirmModal 「요청을 취소할까요?」, rejected 면 바로 지움. 날짜는 레스토랑 타임존 규칙 — 여기엔 매장 컨텍스트가 없으니 `formatDate` 유틸에 `getStoreInfo().timeZone` 폴백(없으면 생략하고 날짜 안 보여도 됨 — 타임존 없는 `toLocaleDateString` 금지).
2. **「+ 자격 추가 요청」 카드**: 기존 `Card`(= 공용 Button 확장) 를 다시 확장해 점선 테두리·가운데 정렬 글자. 로컬 `styled.button` 신규 금지(design-guard). `user.role === 'System Admin'` 또는 `user.isDemo` 면 렌더 안 함.
3. 기존 `FooterHint` 문구 교체: 「요청은 시스템 관리자가 검토합니다. 승인되면 여기 카드로 나타납니다.」(4언어).
- 요청 모달 `pages/ContextSelect/ContextRequestModal.tsx`(새 파일, 공용 `components/UI/Modal` size small):
  - 유형: `SelectComponents` — 매장 관리자 / 매장 오너(네이티브 오너면 숨김) / 브랜드 관리자. 유형이 역할·entity_type 을 정한다(사용자에게 역할 ENUM 을 노출하지 않음).
  - 대상: 검색 입력(placeholder 「매장 이름 2자 이상」) → 300ms 디바운스 → `GET /targets` → 결과 최대 10행(공용 Button secondary 행, 44px) → 선택하면 입력 아래 선택 칩 + 「바꾸기」.
  - 메시지(선택, textarea ≤500, 글자수 표시).
  - 푸터: [취소] [요청 보내기](primary, 대상 없으면 disabled, 전송 중 중복제출 가드 — 공용 Button 의 async 가드 사용).
  - 실패: 서버 message 를 그대로 보여준다(`fetchAPI` 가 본문을 버리므로 **직접 fetch** — [[reference_fetchapi_drops_error_body]]). 409/400 사유가 사용자에게 바로 보여야 한다.
  - 성공: 모달 닫기 → 요청 행 재조회 → 리스트 아래 녹색 아닌 **본문색 한 줄** 「요청을 보냈습니다.」
- 1440·390 폭 모두 확인. 터치 타깃 44px.

### 6.2 입구 상시화 (🔒 MainLayout 무접촉 — 두 부품 안의 조건만)
- `components/Layout/HeaderContextSwitcher.tsx:159` `if (!contexts || contexts.length < 2) return null;` → `if (!user || user.role === 'System Admin') return null;` (contexts 비어 있어도 그린다 — 라벨은 기본 카드 라벨 또는 프로필 이름 폴백).
- `components/ContextSwitchQuickAction.tsx:33` 같은 규칙.
- 결과: SA 아닌 모든 사용자에게 사이드바 하단에 `◐ {내 이름} ▾` 한 줄이 **새로 보인다**. 의도된 변화 — 이것이 「추가 신청」으로 가는 유일한 상시 입구다. PosLayout(POS/KDS/FloorPlan)에는 원래 없으므로 현장 화면 변화 0.
- `check-print-guard.js` 변경 0 이어야 한다(MainLayout 지문 동일).

### 6.3 SA — `components/Admin/ContextRequestsPanel.tsx`(새) + `pages/Admin/StaffManagementPage.tsx` 상단 1줄 삽입
- 페이지 제목 아래, 사용자 표 위. pending 0건이면 **아무것도 그리지 않음**.
- 행: `요청자 이름 (이메일 · 현재 역할)` · `유형 글리프 + 대상 이름` · `Tag(역할)` · 메시지(한 줄 clamp, `ClampText`) · 요청일 · [승인](primary small) [거절](danger small, `#EF4444` 공용 Button variant).
- 승인 실패(409/404/400) → 행 아래 서버 message 그대로 빨간 글(행은 남는다 → SA 가 거절로 닫는다).
- 거절 = 공용 Modal(small): 사유 textarea(선택 ≤300) + [취소][거절]. ConfirmModal 은 입력이 없어 쓰지 않는다.
- 승인/거절 뒤 목록 재조회 + 대기수 갱신. 공용 컴포넌트만(DataTable 은 행이 적고 액션 2개라 Row 패턴으로 충분 — UserContextsSection 과 같은 모양).
- `UserContextsSection`(사용자별 상세)은 **무변경**.

### 6.4 SA 대시보드 `pages/Admin/AdminDashboard.tsx` 알림 1건
`supportTicketsPending` Alert 패턴 그대로: `GET /context-requests/pending-count` > 0 이면 `Alert type="info"` 「자격 요청 {count}건 대기 — 클릭해서 보기」 → Staff Management 로 이동. 키는 `admin.json` 이 아니라 `auth.json context.requests.*`(아래) 를 쓴다 — 이 기능 문구는 한 네임스페이스에 모은다.

### 6.5 i18n `public/locales/{en,ko,zh,ms}/auth.json` `context.request.*`·`context.requests.*`
| 키 | en | ko |
|---|---|---|
| request.add | Request another store or role | 자격 추가 요청 |
| request.title | Request access | 자격 요청 |
| request.type | What do you need? | 어떤 자격이 필요한가요? |
| request.typeStoreAdmin | Store admin | 매장 관리자 |
| request.typeStoreOwner | Store owner | 매장 오너 |
| request.typeBrandManager | Brand manager | 브랜드 관리자 |
| request.target | Store or brand | 매장 또는 브랜드 |
| request.searchPlaceholder | Type at least 2 letters of the name | 이름 2자 이상 입력 |
| request.noResults | No match | 검색 결과 없음 |
| request.change | Change | 바꾸기 |
| request.message | Message to the administrator (optional) | 관리자에게 전할 말 (선택) |
| request.submit | Send request | 요청 보내기 |
| request.sent | Request sent. It will appear here as a card once approved. | 요청을 보냈습니다. 승인되면 여기 카드로 나타납니다. |
| request.pending | Awaiting approval · {{date}} | 승인 대기 중 · {{date}} |
| request.rejected | Declined | 거절됨 |
| request.cancel | Cancel request | 요청 취소 |
| request.cancelConfirm | Cancel this request? | 이 요청을 취소할까요? |
| request.dismiss | Dismiss | 지우기 |
| request.failed | Could not send the request. | 요청을 보낼 수 없습니다. |
| request.deletedTarget | Deleted store or brand | 삭제된 매장/브랜드 |
| select.grantHint(교체) | Requests are reviewed by a system administrator. Approved access appears here as a card. | 요청은 시스템 관리자가 검토합니다. 승인되면 여기 카드로 나타납니다. |
| requests.title | Access requests | 자격 요청 |
| requests.pendingAlert | {{count}} access request(s) waiting — click to review | 자격 요청 {{count}}건 대기 — 클릭해서 보기 |
| requests.approve | Approve | 승인 |
| requests.reject | Decline | 거절 |
| requests.rejectTitle | Decline request? | 요청을 거절할까요? |
| requests.rejectNote | Reason (optional, shown to the requester) | 사유 (선택, 요청자에게 보임) |
| requests.requestedOn | Requested {{date}} | {{date}} 요청 |
| requests.failed | Could not process the request. | 처리할 수 없습니다. |
zh·ms 는 팀원이 같은 뜻으로 채운다. `npm run i18n:verify` 통과.

---

## 7. 첫 문장 「선택했는데도 적용 안 됨」 — 사실 확인 1건 (코드 변경 아님)

- ⓐ **다른 읽기**: SA 화면(Staff Management → user 23 → 「매장 · 오너 · K-DINE IPC(8)」 부여)을 눌렀을 때 서버가 **409** `User is already assigned to this restaurant as a manager (oversight)` 를 돌려줬을 가능성 — user 23 은 매장 8 에 oversight 행이 있다(팀원 실측). 화면은 message 를 빨간 글로 보여주지만 「적용이 안 된다」로 읽힐 수 있다.
- **팀원 할 일(읽기만)**: 운영 nginx access log 에서 오늘 `POST /api/users/23/contexts` 의 상태코드를 1회 grep 해 보고한다. 409 가 있으면 ⓐ 가 사실.
- **Fable 입장(ⓐ 가 사실일 때)**: 이 절단면에서 고치지 않는다. oversight→ownership 자동 승격은 브랜드 쪽이 oversight 행을 읽는 코드를 실측해야 결정할 수 있다(별건 1회). 지금 user 23 의 오너 카드는 매장 10 하나로 성립하며, 매장 8 은 브랜드 소유자로 이미 전부 열린다 — 급하지 않다.

---

## 8. 테스트 (`tests/context-requests.test.js` 신설 · 고정물 = dev demo: RA 23(매장 38) · BG 22(브랜드 10·17) · SA)
① RA 23 `POST /` (brand 17 × Brand Manager) → 201 pending · `GET /mine` 1건 · SA `GET /` 에 보임 · `pending-count` 1.
② 같은 요청 다시 → 409. (brand × Brand General) → 400. `entity_id:'1.16e2'` → 400. 존재하지 않는 매장 → 404.
③ RA 23 이 자기 매장 38 × RA 요청 → 400(이미 가짐). BG 22 가 brand 10 × BM 요청 → 400(소유자).
④ SA approve → 200 · `user_contexts` 행 생성 · `GET /auth/contexts`(23) 에 ◐ K-Dine 카드 · 요청 status approved · `/mine` 에서 사라짐.
⑤ 다시 approve → 409(pending 아님). SA reject(다른 pending) → rejected · `/mine` 에 decision_note · 요청자 `DELETE /:id` → 200 · 다시 → 404.
⑥ 다른 사용자 행 `DELETE` → 404. RA 토큰 approve → 403. 익명 → 401. SA 가 `POST /`(요청) → 403.
⑦ `GET /targets?type=restaurant&q=K` 200 · `q=K`(1자) → `[]` · `type=foodcourt` → 400.
⑧ 오너 요청: RA 23 → (restaurant 39 × Restaurant Owner) 승인 → `restaurant_managers` ownership 행 · `/auth/contexts` 에 ◯ 카드. 네이티브 오너 계정으로 오너 요청 → 400.
⑨ 기존 `user-contexts-switch.test.js` 38건 **그대로 통과**(부여 함수 추출의 무회귀 증명) + 메시지 문자열 비교.
- 고장주입(assert 필수): **FI-14** `grantContext` 호출을 approve 에서 임시로 제거(단순 status 변경만) → ④ 가 **실패**하는지 1회 확인 후 원복. **FI-15** `requireRole('System Admin')` 를 approve 에서 빼면 ⑥ 403 테스트가 실패하는지 확인 후 원복. 결과를 보고에 기록.
- afterAll: 만든 요청 행·user_contexts 행·소유행 전량 삭제(기존 규칙).

---

## 9. 검증 순서 (빌드 1회 · sweep 1회)
1. 백엔드 §4·§5 확정 → `node scripts/migrate-user-context-requests.js`(dev) → `pm2 restart dev-backend` → `npx jest tests/context-requests.test.js tests/user-contexts-switch.test.js` → `node scripts/health-check.js` → 인스펙션 UC-005/006 → FI-14·15.
2. 프론트 §6 전부 확정 → `npm run i18n:verify` → **SW 버전은 마지막에**(운영은 5.80, 워킹트리 5.81 하나로 충분 — 접미사는 팀원 판단) → `npm run build:dev` 1회 → `node scripts/verify-all.js --full` 1회(print-guard 0 변경 · design-guard · mount sweep).
3. 실브라우저(dev): ⒜ demo RA 23 로그인 → 사이드바 하단 `◐ 이름 ▾` 보임(모자 0개인데도) → 선택 화면 → 리스트 아래 「+ 자격 추가 요청」 → 브랜드 관리자 · 「K-D」 검색 → K-Dine 선택 → 보내기 → 「승인 대기 중」 행 → ✕ 취소 → 다시 요청. ⒝ SA 로그인 → 대시보드 알림 1건 → Staff Management 상단 패널 → 승인 → 패널 사라짐. ⒞ RA 23 선택 화면 재진입 → ◐ K-Dine 카드 → 전환 → Brand Menus. ⒟ SA 에서 다른 요청 거절(사유 입력) → RA 23 화면에 「거절됨 · 사유」 → ✕. ⒠ SA 계정의 선택 화면·사이드바에 입구 **없음**. 1440·390, console.error 0. **끝나면 부여 행·요청 행 삭제.**
4. §7 운영 로그 1회 읽기 결과 첨부.
5. `node scripts/check-sensitive-diff.js` → 묶음 전체(단말기 Void·직원 발주 + 오너 모자 + 이 기능) 게이트 요청 1회(사실만: diff 파일 목록 · 테스트 수 · FI 결과 · sweep 결과 · 확인 불가 항목).

---

## 10. 배포·롤백
- 마이그 = 새 표 CREATE 만(INSERT 0) · 레지스트리 deploy. 롤백 = 이전 번들+백엔드 복원, 표는 남아도 무해.
- 운영 데이터 쓰기 0. 배포 뒤 Irene 이 help@ 선택 화면에서 입구가 보이는지 1회 확인(요청은 보내지 않아도 됨).

## 11. 문서 (새 파일 0)
- `docs/MULTI_CONTEXT_LOGIN_DESIGN.md`: §3 끝에 **§3.7 요청 표** · §6 끝에 **§6.4 자격 추가 요청(v1.3)** · Q3 끝에 「v1.3: 셀프 **요청**은 허용, 셀프 부여는 여전히 금지 — 쓰기 경로는 `grantContext` 하나」 · §6.2 에 「2026-10-04 스위처·퀵액션은 SA 외 상시 표시」.
- 메모리·session-state·DEVELOPMENT_PLAN 은 **게이트 통과 뒤**.

## 하지 말 것 (재확인)
- `user_contexts` 에 status/pending 칸 추가 · 승인 라우트에서 직접 INSERT · `router.use(authenticateToken)` · `/:id` 보다 뒤에 리터럴 경로 · 🔒 MainLayout/인쇄 8파일/KDS 접촉 · 운영 쓰기 · 프론트 빌드 2회 · 구현 중 세부를 Fable 에 되묻기(결정해서 결과에 붙인다, 앵커 불일치만 중단·보고).


