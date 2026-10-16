# Fable 설계 2026-10-16 — 직원(Staff 모자) 승인 즉시 반영: RA 목록 + 상대 화면 실시간

작성: Fable(리더). 코드 변경 0 — 설계만. 근거 = dev 코드 읽기(HEAD 1d50b5d38) + 팀원 실측(작업방 f320f0a8) + 자매 설계 `.claude/fable-design-20261016-link-existing-account-staff.md`(이하 «초대 설계», Irene D1·D2 답 대기 · 그 방은 지금 파일을 고치지 않음).
상위 문서: `docs/MULTI_CONTEXT_LOGIN_DESIGN.md`(v1.3 요청→승인).

Irene 원문(10-16):
> «본인이 원하는 경우 직접 레스토랑에 스탭요청이 들어와서 승인했는데 바로 스탭리스트에 안떠. 상대도 승인된거 화면에서 바로 적용 안되고 나갔다 들어오거나 이상한 제스처를 해야 된대. 자연스럽게 리스트업되고 권한 가게 해줘.»

---

## 0. 결론

1. **범위(D5 순서 바꿈 — 확정):** 이 방이 «목록 표시» 절반(초대 설계 §5.2 + §6.1-1·2)을 **먼저** 한다. Irene 의 첫 문장(«승인했는데 리스트에 안 떠»)이 바로 그것이고, D1(초대 방식)·D2(권한 수정·해제) 답과 **무관**하다. **D2 의 버튼(권한 수정·연결 해제)은 뺀다** — 표시만. 초대 설계는 Irene 답 뒤 이 건 위에 얹는다(§9 인계 메모). 동시 편집 없음(그 방은 파일을 안 고치고 있다).
2. **승인 직후 RA 목록:** 승인 버튼을 누른 RA 는 소켓 없이도 즉시 — `ContextRequestsPanel` 의 `onChanged` 를 StaffPage 가 받아 `fetchStaff()`(지금은 prop 을 안 넘겨서 안 됨). 목록 API 는 `GET /api/users?include_contexts=1`(RA 분기만 모자 행 추가, 플래그 없으면 바이트 동일).
3. **상대 화면 즉시 반영 = 기존 `/notifications` 소켓에 «변경 신호» 이벤트 2개.** 새 네임스페이스·새 소켓·폴링 없음. 신호는 **데이터를 싣지 않고 «다시 읽어라»만** 전한다(개인정보 0) — 받는 쪽이 자기 권한으로 GET 한다. 알림 설정(push_enabled·카테고리)에 **게이트되지 않는다** — 이것은 알림이 아니라 상태 동기화다.
   - `context:changed` → 당사자 룸 `user:{id}` — 승인(granted)·거절(rejected)·회수(revoked). AuthContext 가 `refreshContexts()` → 헤더 스위처·선택 화면 카드가 바로 바뀜. 토스트 1줄(«{매장} 접근이 승인되었습니다 — 전환하려면 클릭» → `/pos/select-context`).
   - `context:store-changed` → 매장 룸 `restaurant:{rid}` — 요청 생성·취소·승인·거절·회수. StaffPage·요청 패널이 다시 읽는다(다른 RA·다른 탭·SA 가 처리한 경우까지).
4. **끊겼을 때 대안:** 소켓 **재연결 시 resync 신호 1회**(첫 연결은 제외 — 마운트 조회와 중복 방지) + 선택 화면은 탭이 다시 보일 때(`visibilitychange`) 1회 재조회. 회수는 종전대로 다음 요청의 `X-Context-Fallback` 이 최종 안전망(v1.3 §4.3).
5. 🔒 MainLayout·인쇄 8파일·KDS·`services/userContexts.js` 무접촉(초대 설계 §5.5 «변경 0» 약속을 깨지 않으려고 신호 헬퍼는 **새 작은 모듈**에 둔다). 마이그 0 · 운영 쓰기 0 · 빌드 1회 · sweep 1회.

---

## 1. 출발 사실 (팀원 실측 — 재확인)

| # | 사실 | 근거 |
|---|---|---|
| F1 | 승인/거절은 메일만(`notifyResult` → `sendNotification`) — 실시간 신호 0. `sendNotification` 은 in-app 소켓을 부르지 않는다(메일 전용) | `context-requests.js:102-112·339·375` · `utils/notificationService.js:193~` |
| F2 | RA 직원 목록은 `u.restaurant_id = ?` 만 → 모자 보유자 없음. StaffPage 가 `restaurant_id` 로 다시 거름 | `users.js:42-44` · `StaffPage.tsx:289-310` |
| F3 | `ContextRequestsPanel` 에 `onChanged` prop 이 있으나 StaffPage 가 안 넘김 → 승인해도 목록 재조회 0 | `ContextRequestsPanel.tsx:148·173` · `StaffPage.tsx:597` |
| F4 | 요청자 쪽 `contexts`(AuthContext) 는 로그인·세션 복원·switchContext 때만 갱신. 선택 화면은 마운트 1회 | `AuthContext.tsx:591·641·716·968` · `ContextSelectPage.tsx:307-309` |
| F5 | `/notifications` 네임스페이스: JWT 검증 → `join` 시 **토큰의** id/restaurant_id 로 `user:{id}`·`restaurant:{rid}` 룸(페이로드 무시). 전환 토큰도 `id` = 네이티브 id, `restaurant_id` = 투영 매장 | `socketService.js:333-368` · `auth.js:753-760` |
| F6 | 프론트 소켓은 `NotificationToaster.tsx` 한 곳(App.tsx:523 전역, `user` 바뀌면 재연결). `'notification'` 이벤트만 듣고 전부 토스트로 그린다 | `NotificationToaster.tsx:106-150` |
| F7 | `emitInApp(rooms, payload)` 는 `'notification'` 이벤트 전용 — 그대로 쓰면 매장 룸의 모든 직원에게 토스트가 뜬다 | `pushService.js:91-102` |
| F8 | 프론트 부품 간 신호는 `window.dispatchEvent(new CustomEvent(...))` 관례(`context-follow`·`context-revoked` 등) | `AuthContext.tsx:888·899` · `ContextFollowGate.tsx:105-113` |
| F9 | 모자 쓰기 경로는 `grantContext`(승인 · SA `POST /users/:id/contexts`) · 회수는 SA `DELETE /users/:id/contexts/:cid` 뿐 | `context-requests.js:311` · `users.js:1352·1388` |

---

## 2. 범위

### 들어가는 것
① `GET /api/users?include_contexts=1` RA 분기 모자 행(초대 설계 §5.2 그대로) ② 신호 헬퍼 `services/contextSignals.js` + 호출 6곳 ③ 프론트: 토스터가 신호 2개를 window 이벤트로 중계(+재연결 resync) · AuthContext 가 `context-changed` 에 `refreshContexts()` · 선택 화면 재조회 + visibility 대안 · StaffPage(`include_contexts`·「연결 계정」행 표시·`onChanged`·`context-store-changed` 재조회) · 요청 패널 `context-store-changed` 재조회 ④ i18n 4언어 ⑤ 테스트(소켓 실수신) · health-check · 고장주입 ⑥ 문서 한 절.

### 들어가지 않는 것
D2 버튼(권한 수정·연결 해제 — 초대 설계 §5.3·§6.1-3) · 초대(D1) · BG/FG 목록에 모자 행 · 대시보드 직원 수에 모자 포함 · 새 소켓 네임스페이스·폴링 · 알림 카테고리 추가(메일은 종전 그대로) · `services/userContexts.js`(변경 0) · 🔒 보호파일 · 운영 쓰기.

---

## 3. 서버

### 3.1 `services/contextSignals.js` (새 · ≈40줄)
```js
// 상태 동기화 신호 — 알림이 아니다(push_enabled·카테고리 게이트 없음). 데이터는 싣지 않는다: 받는 쪽이 자기 권한으로 다시 읽는다.
// kind: 'request_created' | 'request_cancelled' | 'granted' | 'rejected' | 'revoked'
function emitContextChanged({ kind, userId, entityType, entityId, role, requestId = null, label = null })
```
- `io` 는 `pushService.emitInApp` 과 같은 방식(`require('../server').io` 를 함수 안에서 늦게) · `io` 없으면 조용히 return · 어떤 예외도 삼킨다(신호 실패가 승인을 실패시키지 않는다).
- 페이로드 `{ kind, entity_type, entity_id, role, request_id, at: ISO }` — **이름·이메일·user_id 없음.**
  - 당사자 룸 `user:{userId}` 에 `context:changed` — `kind ∈ {granted, rejected, revoked}` 일 때만 · 여기엔 `label`(매장/브랜드 이름) 포함(토스트 문구용).
  - 매장 룸 `restaurant:{entityId}` 에 `context:store-changed` — `entityType === 'restaurant'` 일 때 모든 kind. (브랜드 모자는 매장 룸이 없다 — SA 만 처리하므로 당사자 신호만.)
- 매장 룸에는 그 매장 Staff 소켓도 있다 → 페이로드에 개인정보가 없어야 하는 이유. 프론트에서 RA 화면만 이 이벤트를 쓴다.

### 3.2 호출 6곳 (각 1~2줄, 응답 직전·`logActivity` 옆)
| 파일:위치 | kind | userId / entity |
|---|---|---|
| `context-requests.js POST /`(257 직전) | `request_created` | native.id / entity_type·entityId·role · requestId=created.id |
| `… POST /:id/approve`(339 옆) | `granted` | row.user_id / row.* · label=row.label |
| `… POST /:id/reject`(375 옆) | `rejected` | row.user_id / row.* · label=row.label |
| `… DELETE /:id`(397 직전) | `request_cancelled` | 삭제 전 행을 읽어야 entity 를 안다 → `SELECT id,user_id,entity_type,entity_id,role,status FROM … WHERE id=:id AND user_id=:uid` 1쿼리 추가 뒤 DELETE(영향행 0 이면 신호 없음). pending 이던 행만 신호(rejected 지우기는 패널에 없다) |
| `users.js POST /:id/contexts`(1366 뒤 성공 시) | `granted` | target.id / body entity · label 은 `result.data` 나 entity 이름(없으면 null) |
| `users.js DELETE /:id/contexts/:contextId`(1388~ 성공 시) | `revoked` | 행의 user_id / 행의 entity_type·entity_id·role(삭제 전 읽은 행 사용 — 핸들러가 이미 행을 조회하면 그것, 아니면 1쿼리) |

### 3.3 `routes/users.js GET /` — RA 분기 모자 행 (초대 설계 §5.2 **그대로**, 재게)
- 조건: `req.user.role === 'Restaurant Admin' && req.query.include_contexts === '1'`. 그 외 호출자(BG/FG/SA · 플래그 없는 RA)는 **바이트 동일**.
- 본 쿼리 뒤 1쿼리:
  ```sql
  SELECT u.id, u.username, u.email, u.full_name, u.phone, u.role AS native_role, u.is_active,
         uc.id AS context_id, uc.permissions, uc.created_at AS linked_at
    FROM user_contexts uc JOIN users u ON u.id = uc.user_id
   WHERE uc.entity_type='restaurant' AND uc.entity_id = :rid AND uc.role = 'Staff'
  ```
- 각 행 → `{ id, username, email, full_name, phone, role:'Staff', restaurant_id: rid, restaurant_name, permissions(파싱 배열), access_kind:'context', context_id, native_role, linked_at, createdAt: linked_at, pin_code:null, department:null, is_active }`. `password` 없음. 네이티브 행엔 `access_kind` 를 **붙이지 않는다**.
- `createdAt: linked_at` 인 이유: StaffPage 가 `u.createdAt` 으로 가입일을 그린다(StaffPage.tsx:306) — 연결일이 그 자리에 들어간다(초대 설계 §6.1-2). 본 쿼리의 날짜 키 이름(`createdAt` vs `created_at`)은 Opus 가 응답 실측 후 **네이티브 행과 같은 키**로 맞춘다.
- 같은 사람이 네이티브 직원 + 모자 동시는 불가(`nativeHoldConflict`) → 중복 행 없음.

---

## 4. 프론트

### 4.1 `components/Common/NotificationToaster.tsx` — 소켓 주인은 그대로 1곳
- `sock.on('context:changed', d => { window.dispatchEvent(new CustomEvent('context-changed', { detail: d })); pushToast(...) })` — 토스트는 kind 별 1줄: `granted` «{{label}} 접근이 승인되었습니다 — 전환하려면 클릭»(url `/pos/select-context`) · `rejected` «{{label}} 요청이 거절되었습니다»(url 같음) · `revoked` «{{label}} 접근이 해제되었습니다»(url 없음). category `'context_change'`(비critical → 8초 자동 닫힘).
- `sock.on('context:store-changed', d => window.dispatchEvent(new CustomEvent('context-store-changed', { detail: d })))` — **토스트 없음**(매장 룸 전원이 받는다).
- 재연결 resync: `connectedOnceRef`. `sock.on('connect')` 에서 `join` 뒤, 이미 한 번 연결됐었다면 `window.dispatchEvent(new CustomEvent('context-changed', { detail: { kind: 'resync' } }))` + `context-store-changed` 같은 detail. 첫 연결은 제외(마운트 조회와 중복).
- 토스트는 `kind !== 'resync'` 일 때만.

### 4.2 `contexts/AuthContext.tsx`
- `useEffect`: `window.addEventListener('context-changed', () => refreshContextsRef.current?.())` — kind 무관(resync 포함) → `contexts` 갱신 → `HeaderContextSwitcher`(150·155 가 `contexts` 를 읽음)·선택 화면이 저절로 바뀐다. `revoked` 에서 **현재 쓰고 있는 모자**가 사라진 경우는 종전 `X-Context-Fallback` 경로가 다음 요청에서 처리(이 설계는 건드리지 않는다).
- 로그인·복원·switch 의 기존 갱신 지점 변경 0.

### 4.3 `pages/ContextSelect/ContextSelectPage.tsx`
- `context-changed` 리스너: `refreshContexts().then(fresh => fresh && setList(fresh))` + `loadMyRequests()`(거절 사유·pending 행 갱신).
- `visibilitychange`(document.visibilityState === 'visible') 에 같은 두 호출 1회 — 소켓이 죽어 있어도 탭을 다시 보면 맞는다. (`focus` 는 쓰지 않는다 — 모달·입력 포커스에서 연발.)
- 새로 생긴 카드 강조 없음(카드 자체가 생기는 것 + 토스트로 충분). 문구 추가 0.

### 4.4 `pages/Staff/StaffPage.tsx`
1. `fetch('/api/users?include_contexts=1')`. 필터는 그대로(모자 행 `restaurant_id: rid` 라 통과). 변환에 `accessKind: u.access_kind === 'context' ? 'context' : 'native'`, `contextId`, `nativeRole`, `linkedAt`. `Staff` 타입에 선택 칸 3개.
2. 행 표시(connected 행): 이름 옆 `DataTableStatus variant="info"` 「연결 계정」(`t('staff:staffPage.linkedAccount')`) · Staff ID·PIN 칸 «—»(title `staffPage.linkedNoPin` «본인 계정으로 로그인해 이 매장으로 전환합니다») · 가입일 자리 = `linkedAt`(`formatDate` + 매장 타임존 — 타임존 없으면 생략, 종전 규칙).
3. **행 액션 칸: 연결 계정은 비움**(Edit·Reset PW 숨김 — 남의 계정. D2 답 뒤 초대 설계 §6.1-3 이 버튼을 넣는다). 통계 Staff 수에 포함(모자 = 직원 1명 = 좌석 셈과 같다).
4. 패널: `<ContextRequestsPanel scope="restaurant" onChanged={fetchStaff} />`.
5. `context-store-changed` 리스너 → `fetchStaff()` (300ms 디바운스 — 승인 1건에 신호 2개(패널 after + 소켓)가 겹친다). RA·SA 일 때만 등록(패널과 같은 조건).
6. BG/FG/매니저가 이 화면을 열 때: 서버가 플래그를 무시하므로 모자 행 없음 → 표시 분기도 안 탄다.

### 4.5 `components/ContextRequests/ContextRequestsPanel.tsx`
- `context-store-changed` 리스너 → `load()`(300ms 디바운스). 승인·거절 로직 변경 0.

### 4.6 i18n (4언어 · `npm run i18n:verify`)
- `staff.json staffPage.linkedAccount`(Linked account/연결 계정) · `staffPage.linkedNoPin`.
- `context.*` 가 사는 네임스페이스(ContextSelectPage 의 `t('context.switchFailed')` 와 같은 파일)에 `context.live.granted` · `context.live.rejected` · `context.live.revoked`(위 4.1 문구). 토스터가 그 ns 를 읽도록 `useTranslation(<ns>)` 또는 `t('<ns>:context.live.granted')`.

---

## 5. 보안·게이트
- 신호는 기존 JWT 네임스페이스·토큰 유래 룸만 쓴다(새 인증 경계 0). 페이로드에 개인정보 0 — 매장 룸의 Staff 가 받아도 «무언가 바뀜» 뿐.
- `include_contexts` 는 RA 분기 안에서만 의미 — RA 가 자기 매장 Staff 모자 보유자를 보는 것은 승인 주체가 자기가 준 것을 보는 일(이미 승인 패널에서 이름·이메일을 봤다). 다른 매장 RA 는 `entity_id = 자기 매장` 으로 못 본다.
- 신호는 알림 설정에 안 걸린다(상태 동기화). 메일(`notifyResult`)은 종전 그대로.
- `check-sensitive-diff.js` 1회. 돈·마이그·보호파일·미들웨어 변경 없음 → 대상 아니면 보고에 «Fable 게이트 안 씀 — 자체 검증 숫자». 대상이면 게이트 1회.

---

## 6. 테스트 — `tests/context-requests.test.js` 에 블록 추가(또는 `tests/context-live.test.js` 신설, 고정물 공유)
고정물(dev · demo/is_test 만): 기존 테스트의 RA·요청자 토큰 재사용. 소켓은 `user-contexts-switch.test.js:225·352` 의 `ioClient(`http://127.0.0.1:${port}/notifications`, { transports:['websocket'], forceNew:true, reconnection:false, auth:{token} })` 패턴 + `emit('join', {})` 뒤 `once(event)` 를 2초 타임아웃 Promise 로.

| # | 시나리오 | 단언 |
|---|---|---|
| L1 | 요청자 소켓 + RA 소켓 + **다른 매장 RA 소켓** 연결 → 요청자 `POST /context-requests` | RA 소켓 `context:store-changed` kind `request_created` · request_id = 응답 id · 다른 매장 RA 소켓 2초간 **무수신** · 요청자 소켓 무수신(request_created 는 당사자에게 안 감) |
| L2 | RA `POST /:id/approve {permissions}` | 요청자 소켓 `context:changed` kind `granted` · `entity_id`·`role`·`label` 일치 · 페이로드 키에 `email`·`full_name`·`user_id` **없음** · RA 소켓 `store-changed` granted · 다른 매장 무수신 |
| L3 | 승인 뒤 RA `GET /users?include_contexts=1` | 요청자 행 존재 · `access_kind:'context'` · `context_id` · `role:'Staff'` · `permissions` 배열 · `pin_code:null` · `password` 키 없음 · `createdAt` 이 있음 |
| L4 | 같은 RA `GET /users`(플래그 없음) · 다른 매장 RA `?include_contexts=1` · BG `?include_contexts=1` | 셋 다 그 행 **없음**. BG 는 플래그 유/무 응답 JSON 동일 |
| L5 | SA `DELETE /users/:uid/contexts/:cid` | 요청자 소켓 `context:changed` kind `revoked` · RA 소켓 store-changed revoked · 다음 요청자 요청 `X-Context-Fallback`(기존 단언 재사용) |
| L6 | 새 요청 → RA `reject {note}` | 요청자 `rejected` + label · RA 소켓 store-changed rejected |
| L7 | 새 요청 → 요청자 `DELETE /context-requests/:id` | RA 소켓 `request_cancelled` · 없는 id DELETE 는 404 이고 신호 0 |
| L8 | SA `POST /users/:uid/contexts`(Staff 모자 직접 부여) | 요청자 `granted` |
| L9 | 기존 `context-requests.test.js`·`user-contexts-switch.test.js`·`socket-auth.test.js` 전건 통과(응답 shape 변경 0) |

**고장주입(assert 필수 · 결과 보고 · 원복):**
- **FI-A** approve 의 `emitContextChanged` 호출 제거 → L2 «요청자 granted 수신» 실패 확인.
- **FI-B** 헬퍼의 당사자 룸을 `user:${approverId}` 로 잘못 보내기(인자 바꿔치기) → L2 실패 + 다른 매장 무수신 단언은 통과(그래서 L1 의 «무수신» 단언이 양성 단언과 쌍으로 있어야 한다).
- **FI-C** `include_contexts === '1'` 조건 제거(항상 포함) → L4 «플래그 없음 = 행 없음» 실패 확인.
- **FI-D** 페이로드에 `email` 실어 보기 → L2 «개인정보 키 없음» 실패 확인.
- 프론트 재연결 경로는 실브라우저로(§7 ⒟) — 화면 jest 는 게이트 밖([[reference_frontend_jest_outside_gate]]).

### 6.1 health-check (`scripts/health-check.js` 컨텍스트 블록 옆)
- 데모 RA(23) `GET /users?include_contexts=1` → 200 배열 · 각 행 `password` 없음.
- 데모 BG(22) `GET /users?include_contexts=1` 와 `GET /users` → 200 · 두 응답 JSON 동일(플래그 무시).
- 익명 `/notifications` 거부는 `socket-auth.test.js` 가 이미 봄 — 추가 없음.

---

## 7. 검증 순서 (빌드 1회 · sweep 1회)
1. §3 백엔드 확정 → `pm2 restart dev-backend` → `npx jest tests/context-requests.test.js tests/user-contexts-switch.test.js tests/socket-auth.test.js`(또는 신설 파일 포함) → FI-A~D → `node scripts/health-check.js`.
2. §4 프론트 전부 확정 → `npm run i18n:verify` → **SW 마지막**(5.95 → 5.96) → `npm run build:dev` 1회 → `node scripts/verify-all.js --full` 1회(print-guard 변경 0 · design-guard · mount sweep).
3. 실브라우저(dev · is_test 계정 · 데모 38 은 좌석 5/5 라 피함 — rid 18 또는 좌석 여유 데모):
   ⒜ 창 A = 요청자 `/pos/select-context`, 창 B = RA `/restaurant/{rid}/staff`. A 가 요청 → **B 패널에 새로고침 없이** 행 등장.
   ⒝ B 승인 → **B 목록에 「연결 계정」행 즉시**(PIN —, ID —, 연결일, 액션 칸 비어 있음) · **A 에 카드 즉시 + 토스트** · A 카드 클릭 → 전환 → 대시보드 권한대로 · A 헤더 스위처에도 항목.
   ⒞ 창 C = 같은 매장 RA 두 번째 탭(또는 SA 가 회수) → B 와 C 둘 다 갱신 · 회수 시 A 토스트 + 카드 사라짐.
   ⒟ **재연결 경로(음성 증명):** A DevTools Network «Offline» → B 승인 → A **안 바뀜**(소켓 끊김) → Online → 재연결 resync 로 카드 등장(새로고침 없이). 탭 숨겼다 보이기(visibilitychange)도 1회.
   ⒠ 거절(사유) → A 의 요청 행이 rejected + 사유로 바뀜 · 토스트.
   ⒡ 1440·390 폭 · console.error 0 · BG 로 StaffPage 열면 연결 계정 행·분기 없음. **끝나면 시험 데이터 전량 삭제**(요청 행·`user_contexts` 행).
4. `node scripts/check-sensitive-diff.js` → 판정 따라 게이트/«안 씀» 한 줄. 자체 검증 숫자(테스트 건수·FI 4/4·sweep)를 보고에.

---

## 8. 배포·롤백
- 마이그 0 · 운영 쓰기 0 · 응답 shape 변경 0(플래그 opt-in · 새 소켓 이벤트는 옛 번들이 무시). 롤백 = 이전 번들+백엔드 복원, 잔여물 없음.
- 운영 반영: 다음 배포 때. 배포 뒤 Irene 확인 1회: 실매장 RA 가 요청을 승인 → 목록에 바로 뜨는지(상대 화면은 그 사람 폰에서 카드가 생기는지).

## 9. 초대 설계(다른 방) 인계 메모 — 그 방이 재개할 때 반영
- §5.2(`include_contexts`)·§6.1-1·2(목록 호출·행 표시)는 **이 건이 구현** → 그 설계에선 «완료(이 건)» 으로 표기하고 §6.1-3(권한 수정·연결 해제 버튼)·§5.3 만 남는다.
- 그 설계의 새 라우트(`/invite`·`/:id/accept`·`/:id/decline`·`PUT|DELETE /users/:id/contexts/:cid`·`DELETE /context-requests/:id` 확장)는 각각 `emitContextChanged` 1줄을 부른다(accept=granted · decline=rejected · invite=`request_created` 는 **당사자 룸에도** 보내야 선택 화면 «받은 초대» 가 즉시 뜬다 → 그때 헬퍼에 `kind:'invited'` 를 당사자 전송 kind 에 추가 — 이번엔 안 만든다).
- `services/userContexts.js` 는 이 건에서도 **변경 0** — §5.5 약속 유지.

## 10. 문서 (새 파일 0)
`docs/MULTI_CONTEXT_LOGIN_DESIGN.md` §6.4 끝에 «v1.3.1 즉시 반영 — 신호 `context:changed`(당사자)·`context:store-changed`(매장) · 데이터 없음·게이트 없음 · 재연결 resync · RA 목록 `include_contexts=1`» 한 절. 메모리·session-state·DEVELOPMENT_PLAN 은 검증 뒤.

## 하지 말 것
`services/userContexts.js` 수정 · `sendPushToUser`/`emitInApp`(`'notification'` 이벤트)로 동기화 신호 보내기(게이트·전원 토스트) · 페이로드에 이름·이메일·user_id · 새 소켓 네임스페이스·두 번째 소켓 연결·폴링(setInterval) · D2 버튼 선구현 · 🔒 MainLayout/인쇄 8파일/KDS 접촉 · `router.use(authenticateToken)` · 프론트 빌드 2회 · 구현 중 세부를 Fable 에 되묻기(결정해 결과에 붙인다 — 앵커 불일치만 중단·보고).

---

## 부록 — 실측 근거 (2026-10-16 dev · HEAD 1d50b5d38)
- `routes/context-requests.js`: 요청 214-266(응답 257) · 승인 270-346(`notifyResult` 339) · 거절 348-382(375) · 삭제 386-402(행을 읽지 않고 DELETE — 신호용 1쿼리 필요).
- `routes/users.js`: 목록 12-107(RA `u.restaurant_id = ?` 42-44 · `SELECT u.*, r.name as restaurant_name` 25 · `password` 제거 67 · 응답 107) · 모자 부여 1352(`grantContext` 1366) · 회수 1388.
- `services/socketService.js` 333-368: `/notifications` JWT · `join` 은 토큰 신원만(`user:`·`restaurant:`·`brand:`·`foodcourt:`·`supplier:`·`role:system_admin`).
- `services/pushService.js` 91-102 `emitInApp`(`'notification'` 고정 · io 늦은 require 패턴) · `sendPushToUser` 120-137(push_enabled 게이트).
- `utils/notificationService.js sendNotification` 193~: 메일 전용(소켓 호출 없음).
- 프론트: `NotificationToaster.tsx` 106-150(소켓·join·`'notification'`) · `AuthContext.tsx` 514(`contexts`) · 591(복원 refresh) · 896-902(`context-revoked`) · 933-948(`refreshContexts`) · 968(switch 뒤 refresh) · `ContextSelectPage.tsx` 265(`/mine`) · 307-309(마운트 refresh) · `StaffPage.tsx` 282-343(목록) · 597(패널, onChanged 미전달) · `ContextRequestsPanel.tsx` 148(prop)·161-173(load/after) · `HeaderContextSwitcher.tsx` 150-155(`contexts` 소비) · `ContextFollowGate.tsx` 105-113(이벤트 관례).
- 소켓 테스트 패턴: `tests/user-contexts-switch.test.js:225-229·352-354` · `tests/socket-auth.test.js`.
- SW: HEAD `5.95`.
