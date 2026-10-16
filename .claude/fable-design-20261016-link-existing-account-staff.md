# Fable 설계 2026-10-16 — 기존 계정을 매장 직원으로 연결 (멀티 로그인 v1.4 · 「초대」)

작성: Fable(리더). 코드 변경 0 — 설계만. 근거 = 2026-10-16 dev 코드 읽기(HEAD 1d50b5d38) + 팀원 실측(아래 «출발 사실») + dev DB 읽기(부록).
상위 문서: `docs/MULTI_CONTEXT_LOGIN_DESIGN.md`(§3.7 · §5.6 · §6.4 · §8-3 · Q3) · v1.3 설계 `.claude/fable-design-20261005-context-request.md`.

Irene 원문(10-16):
> «브랜드매니저에서 매니저로 추가를 했어. 그래서 들어와서 사용하는데 레스토랑관리자가 스탭으로 같은 아이디를 추가하고 싶거든. 그런데 검색이 안되고 넣으면 이런 에러가 나.. 어떻게 하면 좋을까? Email "minky3018@gmail.com" is already in use by a Brand Manager (system user). Please use a different email or username. 이메일을 아무곳에서 검색하게 하면 안되는 걸까? 기존 아이디를 연결할 방법은 없는 걸까?»

---

## 0. 결론 (한 줄씩)

1. **«기존 아이디를 연결»은 이미 있는 구조(모자 = `user_contexts`)로 한다.** 계정을 두 개 만들지도, `users` 행을 옮기지도 않는다. 매장 관리자(RA)가 원하는 것은 «그 사람이 내 매장에서 직원으로 일하게» 하는 것이고, 그것이 바로 v1.3 의 **매장 직원 모자(restaurant × Staff)** 다. 지금 빠진 것은 **RA 쪽에서 시작하는 길**뿐이다 — v1.3 은 «본인이 요청 → RA 승인» 한 방향만 만들었다.
2. **새 길 = 「초대」: RA 가 이메일로 초대 → 본인이 선택 화면에서 수락 → 모자.** 같은 표(`user_context_requests`)에 **방향 칸 하나**(`initiator`)를 더해 거울로 둔다. 요청이든 초대든 **끝은 `grantContext` 하나**(설계 §8-3 봉인 유지 — 새 쓰기 경로 0).
3. **«이메일을 아무 곳에서나 검색»은 만들지 않는다.** 전 플랫폼 이메일 검색 상자는 «이 이메일이 가입돼 있나»를 아무 매장 관리자나 물어볼 수 있는 조회기(계정 존재 노출)가 된다. 대신 **지금 있는 «Add Staff» 폼이 그 자리**다 — 이메일이 이미 있으면 서버가 «계정이 있음» 만 알리고(역할·매장 번호는 더 이상 말하지 않음), 화면이 바로 «이 계정을 초대할까요?» 로 잇는다. 검색은 필요 없다 — RA 는 그 사람의 이메일을 이미 안다.
4. **오류 문구 고침(보안)**: `Email "x" is already in use by a Brand Manager (system user)` / `at restaurant ID n` → 역할·매장 번호를 지운다. 다른 회사 계정의 역할·소속을 아무 RA 에게 흘리던 문구였다. 코드(`EMAIL_IN_USE` / `STAFF_ID_IN_USE`)를 함께 내려 화면이 분기한다.
5. **RA 가 연결 계정을 «볼 수 있고 · 권한을 고치고 · 연결을 끊을 수 있게»** 한다(팀원 실측 5번 — 지금은 승인해 놓고도 직원 목록에 안 보이고 SA 만 관리). 직원 목록(`GET /api/users`)에 그 매장 Staff 모자 보유자를 **같은 목록 안에** «연결 계정» 표시로 싣고, 권한 수정·해제는 기존 `/users/:id/contexts` 경로의 가드를 **자기 매장 Staff 모자 한정으로** RA 에게 연다. 새 목록·새 표 0.
6. **좌석(staff_limit)**: 초대 보낼 때 미리 검사(403, RA 가 바로 앎) + 수락 순간 본검사(같은 함수 `countRestaurantSeats`). 모자 = 직원 1명(D3 그대로).
7. 이번 건은 단독 배포. 마이그 1개(칸 3개 추가, INSERT 0). 빌드 1회 · `verify-all --full` 1회 · Fable 게이트 1회(끝에).

### Irene 확인이 필요한 결정 — §12 (권고 첨부). D1 은 방향 결정이라 컨펌 뒤 착수.

---

## 출발 사실 (팀원 실측 2026-10-16 dev — 재확인 완료)

| # | 사실 | 근거 |
|---|---|---|
| F1 | RA 가 기존 이메일로 `POST /api/users`(Staff) → 400, 문구에 기존 계정의 **역할·매장 id 노출** | `routes/users.js:432-454` (`userContext` 문자열) |
| F2 | 사용자 쪽 요청 흐름은 정상(요청 201 → RA 승인 → 권한 → 전환 200) | `routes/context-requests.js` 전부 · 팀원 실호출 3)4) |
| F3 | 승인 뒤 RA 직원 목록(`GET /api/users`)에 모자 보유자 **없음** — RA 분기는 `u.restaurant_id = ?` 만 | `routes/users.js:42-44` · `StaffPage.tsx:289-310`(restaurant_id 로 거름) |
| F4 | 모자 조회·부여·회수 3 라우트 전부 `requireRole('System Admin')` | `routes/users.js:1316·1352·1388` |
| F5 | `GET /context-requests/targets` 는 매장 **이름** 검색만 — 이메일 검색은 어디에도 없다 | `context-requests.js:136-154` |
| F6 | 데모 38 좌석 5/5 → Staff 승인 403(한도 정상 작동) | 팀원 실호출 3) |
| F7 | 다른 대기 일 «스탭 승인 즉시 반영»(상황판 qid mvb6qj12) = «승인했는데 스탭 리스트에 안 뜨고 상대 화면도 바로 안 바뀜» — **앞 절반(리스트에 안 뜸)은 F3 과 같은 결함** | `~/dev-server/board/state.json` queue |

---

## 1. 범위

### 들어가는 것
① 오류 문구·코드 정리(`POST /users`) ② 초대 API(보내기·취소·내 초대 보기·수락·거절) + 요청 표 칸 3개 ③ RA 직원 목록에 모자 보유자 포함(`include_contexts`) ④ RA 의 자기 매장 Staff 모자 권한 수정·해제(기존 `/users/:id/contexts` 가드 확장) ⑤ 화면: Add Staff 400 → 초대 잇기 · «기존 계정 초대» 모달 · 직원 목록 «연결 계정» 행(권한 수정·연결 해제) · 요청 패널에 «보낸 초대» · 선택 화면에 «받은 초대»(수락/거절) · 로그인 시 초대가 있으면 선택 화면으로 ⑥ 알림 카테고리 2개 + 메일 4언어 ⑦ 테스트·health-check·인스펙션 ⑧ 문서.

### 들어가지 않는 것
전 플랫폼 이메일 검색 상자 · 계정 병합(Q2 그대로) · RA 가 Staff 모자를 **본인 수락 없이 직접** 만드는 길(§12 D1 에서 Irene 이 B 를 고르면 §5.7 대안으로 전환) · BG/FG 목록(`GET /users` 브랜드·푸드코트 분기)에 모자 보유자 포함(후속 — 그 화면들은 직원 관리 화면이 아니다) · 모자 보유자의 PIN 캐셔 등록(v1.3 §7 그대로 — 자기 계정으로 들어오는 사람) · RA 가 모자 보유자의 프로필(이름·이메일·전화) 수정(남의 계정) · 모자 보유자 비밀번호 재설정(남의 계정) · «스탭 승인 즉시 반영» 의 **뒷절반(상대 화면 실시간 갱신)** — 그 방 일로 남긴다(§12 D5) · 🔒 인쇄 보호파일 8개 · KDS 무접촉 · 운영 쓰기 0.

---

## 2. 흐름

```
[RA]  Staff 화면 «Add Staff» 에 이메일 입력 → 저장
      → 400 EMAIL_IN_USE («이 이메일은 이미 PurpleHere 계정이 있습니다»)
      → 폼 아래 한 줄: 「이 계정을 이 매장 직원으로 초대할까요?」 [초대 보내기]
      → 초대 모달(이메일 고정 · 권한 피커 1개 이상 · 메시지 선택)   ← «기존 계정 초대» 버튼으로도 바로 열림
      → POST /api/context-requests/invite {email, permissions, message?}
           서버: 이메일 → 사용자 해석(화면엔 id·역할 안 줌) · 초대 가능 검사(§3) · 좌석 미리 검사 · pending 1행(initiator='grantor')
           → 대상자에게 메일(context_invite_received)
      → 요청 패널 «보낸 초대» 에 행(이메일 · 권한 · 보낸 날짜 · [초대 취소])

[본인] 로그인 → 받은 초대가 있으면 선택 화면으로(컨텍스트가 1개여도)
      → 리스트 맨 아래 «받은 초대» 행: ▦ 매장 이름 · 「매장 직원 · 권한 n개 · 초대한 사람」 · [수락] [거절]
      → 수락: POST /context-requests/:id/accept → 좌석 본검사 → grantContext(저장된 permissions) → approved → 카드 즉시 추가
      → 거절: POST /context-requests/:id/decline {note?} → rejected → RA 에게 메일(context_invite_result)

[RA]  직원 목록에 «연결 계정» 행(이름 · 이메일 · 권한 · 연결일) — [권한 수정] [연결 해제]
      → PUT  /api/users/:id/contexts/:cid {permissions}   (자기 매장 Staff 모자만)
      → DELETE /api/users/:id/contexts/:cid               (자기 매장 Staff 모자만)
```

요청(사용자 → RA 승인)은 종전 그대로. 두 방향이 같은 표·같은 상태·같은 쓰기 함수를 쓴다.

---

## 3. 권한·보안

| 행위 | 누가 | 서버 규칙 |
|---|---|---|
| 초대 보내기 | **RA(자기 매장)** + SA(`restaurant_id` 를 body 로 — SA 는 어차피 직접 부여 가능하므로 선택) | `authenticateToken` + 핸들러 안 role 검사. RA 는 `entity_id = req.user.restaurant_id` **강제**(body 무시 — `POST /users` 와 같은 규칙, users.js:337). 투영된 RA 모자 세션도 된다(모자 = 그 역할 전체 권한). **`is_demo` RA 403**(D5 와 같은 이유 — 공개 로그인 계정은 스팸 경로, `is_test` 허용) |
| 초대 대상 | 이메일로 해석 | 대상이 없으면 404 `No account with this email`(이 정보는 직전 400 이 이미 준 것 — 새 노출 없음). **응답에 대상의 id·역할·소속을 싣지 않는다**(201 은 `{id(요청행), email, status}` 만). 대상 제외: `System Admin`(400 `Cannot invite a system administrator` — SA 는 요청도 못 하는 역할), `is_demo`(400), `is_active=false`(400 기존 문구), 본인(400). 이미 가진 자격은 `alreadyHoldsContext` **같은 함수**(네이티브 소속·같은 매장 모자 → 400 기존 문구) |
| 중복 | | 같은 (대상, 매장, Staff) 로 pending 행이 **방향 무관** 있으면 409 — 상대가 이미 요청해 둔 상태면 `A request from this person is already waiting — approve it instead`(패널에서 승인하라는 뜻). 한 매장의 pending 초대 ≤ 20(400) |
| 좌석 | 보낼 때 + 수락할 때 | `countRestaurantSeats(rid) >= staff_limit` → 403 기존 문구 그대로. 보낼 때 막아야 RA 가 바로 알고, 수락 때 다시 세야 사이에 늘어난 직원이 새지 않는다(검사·적용 같은 함수 — [[feedback_check_and_fix_same_sql]]) |
| 초대 취소 | 보낸 사람(created_by) 또는 그 매장 RA/SA | `DELETE /context-requests/:id` 확장: `status='pending' AND initiator='grantor' AND (created_by = me OR 그 매장 RA/SA)` |
| 수락·거절 | **초대받은 본인만** | `row.user_id = req.user.id AND row.initiator='grantor' AND status='pending'` — 아니면 404(존재 여부 안 흘림) |
| 승인·거절(기존) | SA / 그 매장 RA | `visibleRequestScope` SQL 에 **`AND ucr.initiator = 'requester'`** 추가 — RA 가 자기가 보낸 초대를 자기 손으로 «승인» 하면 본인 수락 없는 셀프 부여가 되므로 막는다. 같은 이유로 수락 라우트는 `initiator='grantor'` 만 |
| 모자 보유자 보기 | RA(자기 매장) | `GET /users?include_contexts=1` — RA 분기에서만 모자 행을 붙인다(§5.2). 다른 호출자(BG/FG/SA·다른 화면)는 **바이트 동일** |
| 권한 수정·해제 | SA(종전) + **RA: 자기 매장 × Staff 모자 행만** | 한 함수 `canManageContextRow(reqUser, row)` 를 PUT·DELETE 가 같이 쓴다(§5.3). RA 모자·오너·BM 행은 RA 에게 404(존재 여부 안 흘림) |

- 존재 노출(계정 존재 조회기)의 **총량은 늘지 않는다**: «이 이메일 계정 있음» 은 가입·직원 생성에 원래 있던 성질이고, 이번에 **줄어드는 것**은 역할·매장 번호다. 초대 라우트는 그 400 뒤에만 의미가 있고, 대상 정보를 돌려주지 않는다.
- 요율: `/api` 공용 리미터(1000/15min) 안. 초대 라우트에 별도 제한은 두지 않는다(로그인 필수 + RA 한정 + 매장당 pending 20 상한).
- `entity_id`·`:id`·`:cid` 는 전부 `normalizeEntityId`(`^\d+$`).

---

## 4. 데이터

### 4.1 `user_context_requests` 칸 3개 추가 (새 표 0)
| 칸 | 형 | 의미 |
|---|---|---|
| `initiator` | ENUM('requester','grantor') NOT NULL DEFAULT 'requester' | 누가 시작했나. 기존 행은 전부 'requester'(DEFAULT 로 자동) |
| `created_by` | INT NULL → users | 시작한 사람. 요청이면 `= user_id`(새 행부터 채움 · 기존 행 NULL 허용), 초대면 RA id |
| `permissions` | JSON NULL | **초대 전용** — RA 가 보낼 때 고른 권한(1개 이상). 요청 행은 NULL(권한은 승인 때 body). 수락 때 이 값을 `grantContext` 에 그대로 넘긴다 |

- 모델 `UserContextRequest` 에 세 칸 추가. 마이그 `scripts/migrate-user-context-requests-invite.js`: `information_schema.COLUMNS` 존재 검사 후 `ALTER TABLE … ADD COLUMN`(MySQL 8 — IF NOT EXISTS 없음) 3번 · INSERT 0 · 멱등 · `process.exit` → `migrations.registry.json` `deploy`. **ENUM 은 새 칸이라 expand-only 규칙 충돌 없음**(기존 `status` ENUM 은 건드리지 않는다 — 'cancelled' 안 만듦: 취소 = 행 삭제, 종전과 같음).
- 인덱스 추가: `(entity_type, entity_id, status, initiator)` — RA «보낸 초대» 조회용. 기존 3개 유지.
- 이것은 «같은 개념에 새 목록» 이 아니라 **한 개념(«모자를 주기로 한 대기 상태»)의 양방향**이다. 초대 표를 따로 만들면 승인·좌석·중복·알림 규칙이 두 벌이 된다.

### 4.2 `user_contexts` · `users` · `restaurant_managers` 무변경
쓰기 경로 늘지 않음. 모자 행은 수락 때 `grantContext` 가 만든다.

---

## 5. 서버

### 5.1 `routes/users.js POST /`(303-454) — 문구·코드만
- 432-454 의 메시지 조립을 바꾼다: `userContext`(«by a {role} at restaurant ID {n}» / «(system user)») **삭제**. 문구:
  - 이메일 중복: `An account with this email already exists.` + `code: 'EMAIL_IN_USE'`
  - Staff ID 중복: `Staff ID "{displayId}" is already in use in this restaurant.` + `code: 'STAFF_ID_IN_USE'`(namespace `r{rid}:` 라 항상 자기 매장)
  - 둘 다: 두 문장 이어 붙임 + `code: 'EMAIL_AND_STAFF_ID_IN_USE'`
  - 응답 shape(`{success:false, error:<string>, code}`)은 유지 — StaffPage 가 `errorData.error` 를 읽는다(457줄).
- **RA 이면서 `EMAIL_IN_USE` 일 때만** `canInvite: true` 를 함께 내린다(SA·BG 가 RA 계정 만들 때는 초대 개념이 없다). 다른 줄 무접촉(좌석·MX·비밀번호 생성 그대로).

### 5.2 `routes/users.js GET /`(12-181) — RA 분기에 모자 행 (opt-in)
- `req.user.role === 'Restaurant Admin' && req.query.include_contexts === '1'` 일 때만, 본 쿼리 뒤에 1쿼리:
  ```sql
  SELECT u.id, u.username, u.email, u.full_name, u.phone, u.role AS native_role, u.is_active,
         uc.id AS context_id, uc.permissions, uc.created_at AS linked_at
    FROM user_contexts uc JOIN users u ON u.id = uc.user_id
   WHERE uc.entity_type='restaurant' AND uc.entity_id = :rid AND uc.role = 'Staff'
  ```
  → 각 행을 `{ id, username, email, full_name, phone, role:'Staff', restaurant_id: rid, permissions(파싱 배열), access_kind:'context', context_id, native_role, linked_at, pin_code:null, department:null, is_active }` 로 붙인다(`password` 없음, `restaurant_name` 매장명). 네이티브 행엔 `access_kind:'native'` 를 **붙이지 않는다**(바이트 동일 — 프론트는 `access_kind === 'context'` 만 본다).
- 같은 사람이 네이티브 직원이면서 모자를 가질 수는 없다(`nativeHoldConflict`) — 중복 행 없음.

### 5.3 `routes/users.js /:id/contexts` — RA 범위 열기 (쓰기 함수는 그대로)
- 새 함수(라우트 파일 안, 1312 부근) `canManageContextRow(reqUser, row)`: SA → true. RA → `row.entity_type==='restaurant' && String(row.entity_id)===String(reqUser.restaurant_id) && row.role==='Staff'`. 그 외 false.
- **`PUT /:id/contexts/:contextId` {permissions}** (신설 — RA 의 «권한 수정»): 행 조회(`user_id=:id AND id=:cid`) → `canManageContextRow` 아니면 404 → `normalizeStaffPermissions` → **`grantContext({target, 'restaurant', row.entity_id, 'Staff', permissions, grantedBy})`** (ON DUPLICATE 가 permissions 를 갱신 — INSERT 경로 밖의 UPDATE 를 새로 만들지 않는다; 행이 이미 있음을 위에서 확인했으므로 생성은 일어나지 않는다) → `logActivity`(`Updated Staff context permissions …`) → 200 `{permissions}`.
- **`DELETE /:id/contexts/:contextId`**(1388): `requireRole('System Admin')` 제거 → 핸들러 안에서 행 조회 뒤 `canManageContextRow` 로 판정(아니면 404). SA 동작은 바이트 동일(기존 테스트 38건이 증거). RA 가 지운 뒤 그 사람 세션은 다음 요청에 네이티브 폴백(§4.3 그대로).
- `GET /:id/contexts`·`POST /:id/contexts`·`DELETE /:id/ownerships` 는 **SA 전용 그대로**(RA 에게 «만들기» 를 열지 않는다 — D1 A 안의 핵심).

### 5.4 `routes/context-requests.js`
| 메서드·경로 | 가드 | 동작 |
|---|---|---|
| `POST /invite` | auth · RA(자기 매장) 또는 SA · 비demo | `{email, permissions, message?, restaurant_id?(SA만)}` → 이메일 trim/lower → `User.findOne({email})` 없으면 404 → 대상 제외 규칙(§3) → `normalizeStaffPermissions` → `alreadyHoldsContext(target, {restaurant, rid, Staff}, restaurant)` → 방향 무관 pending 중복 409 → 매장 pending ≤ 20 → 좌석 미리 검사 403 → INSERT(`initiator:'grantor', created_by: req.user.id, permissions`) → 메일(§5.6) → 201 `{id, email, status:'pending', label: 매장명}` |
| `GET /sent` | auth · RA/SA | 내 매장(RA: `entity_id = req.user.restaurant_id`; SA: 전부)의 pending **초대** 목록: `{id, email(대상 users.email), full_name, permissions, message, created_at, created_by}` — 이름·이메일은 RA 가 보낸 것이라 보여도 됨 |
| `GET /mine` | 기존 | 응답에 **`invitations`** 를 함께: `data: rows`(기존 배열 유지 — 호환) + `meta.invitations: [{id, entity_id, label, permissions, message, invited_by_name, created_at}]`. 기존 소비자는 `data` 만 읽는다 |
| `POST /:id/accept` | auth · 본인 | 범위(§3) → pending 아니면 409 → 본인 `is_active` → 좌석 본검사 403 → `grantContext({target: me(네이티브 행), 'restaurant', entity_id, 'Staff', permissions: row.permissions, grantedBy: row.created_by})` → approved(`decided_by = me`) → `logActivity` → RA 메일 → 200 `{id, status:'approved', grant}` |
| `POST /:id/decline` | auth · 본인 | `{note?}` → rejected(`decided_by = me`, note) → RA 메일 → 200 |
| `DELETE /:id` | 기존 확장 | 요청(종전: 자기 행 pending/rejected) **또는** 초대(`initiator='grantor' AND status='pending' AND (created_by=me OR 그 매장 RA/SA)`) |
| `GET /` · `/pending-count` · `/:id/approve` · `/:id/reject` | 기존 | `visibleRequestScope` 가 돌려주는 SQL 에 `AND ucr.initiator='requester'` 가 **항상** 붙는다(SA 포함) — 패널·대기수·승인·거절은 «받은 요청» 만 |
| `POST /`(요청) | 기존 | 중복 409 검사를 **방향 무관**으로(이미 초대받은 상태면 `You have an invitation for this role — accept it instead`) · `created_by = native.id` 채움 |

- `grantedBy` 를 초대한 RA 로 두는 이유: `granted_by` 는 «누가 이 권한을 줬는가»(UC-001). 권한을 정한 사람은 RA 다.
- 수락은 **네이티브 행**(`User.findByPk(req.user.id)`) 기준 — 요청 라우트와 같은 규칙(투영본 아님).

### 5.5 `services/userContexts.js` — 변경 0 (확인 사항만)
`grantContext`·`alreadyHoldsContext`·`countRestaurantSeats`·`normalizeStaffPermissions` 를 그대로 쓴다. 새 export 없음. (한 줄도 안 바뀌어야 정상 — 바뀌면 설계 이탈이니 중단·보고.)

### 5.6 알림 (`routes/notification-settings.js NOTIFICATION_CATEGORIES` + 메일)
| key | roles | 섹션 | 언제·수신자 |
|---|---|---|---|
| `context_invite_received` | ['all'] | Inquiries & Tickets | 초대 생성 → 대상자 1명(`sendNotification`). 본문: «{매장} 의 관리자 {이름} 이 당신을 매장 직원으로 초대했습니다 · 권한 n개» · 버튼 → `/pos/select-context` |
| `context_invite_result` | ['Restaurant Admin','System Admin'] | Inquiries & Tickets | 수락/거절 → 초대한 사람(`created_by`) 1명 · 버튼 → `/restaurant/{rid}/staff` |
- 템플릿 `utils/notificationTemplates.js` 에 2개(`contextInviteReceivedEmail`·`contextInviteResultEmail`) — 기존 `contextRequest*Email` 과 같은 팩토리 패턴 · `locales/{en,ko,zh,ms}/email.json` 키 · `emailLayout` + `getLogoAttachment()` · URL env 규칙. 실패해도 초대/수락은 성공.

### 5.7 (D1 에서 B «직접 연결» 을 고를 때의 대안 — 지금은 구현 안 함)
`POST /invite` 대신 `POST /users/:id/contexts` 를 RA 에게 (자기 매장 × Staff) 한정으로 열고, 이메일→id 해석 라우트(`POST /users/resolve-email` — 200 `{id}` 만)를 둔다. 수락 없음. 대상자에게 통지 메일 + 선택 화면에 «연결 해제(나가기)» 를 **반드시** 같이 만든다(원치 않는 카드를 본인이 뗄 길). 표 칸 추가 불필요. — 노출 면은 A 와 같고, 동의 없는 연결 + 본인 해제 UI 가 추가 범위다.

---

## 6. 화면

### 6.1 `pages/Staff/StaffPage.tsx`
1. **목록 호출** `fetch('/api/users?include_contexts=1')`. 변환에 `accessKind: u.access_kind === 'context' ? 'context' : 'native'`, `contextId`, `nativeRole`, `linkedAt` 추가. 통계: «연결 계정 n» 은 Staff 수에 포함(모자 = 직원 1명 — 좌석 셈과 같은 말).
2. **행 표시**: 이름 옆 `DataTableStatus variant="info"` 「연결 계정」(`t('staff:staffPage.linkedAccount')`) · PIN 칸 «—» · Staff ID 칸 «—»(연결 계정은 ID·PIN 이 없다는 뜻, 호버 title «본인 계정으로 로그인해 전환합니다») · 가입일 자리에 `linked_at`(`formatDate` + 매장 타임존).
3. **행 액션(연결 계정)**: [권한 수정] → 기존 Edit 모달을 **권한 피커만** 보이게(이름·이메일·전화 입력은 숨김 — 남의 계정) → 저장 = `PUT /api/users/:id/contexts/:cid` · [연결 해제] → `ConfirmModal` 「이 계정의 이 매장 접근을 끊습니다. 본인 계정은 그대로입니다.」 → `DELETE /api/users/:id/contexts/:cid`. **Reset PW 없음**(남의 비밀번호).
4. **Add Staff 400 잇기**: `errorData.code === 'EMAIL_IN_USE' && errorData.canInvite` 면 `formError` 아래에 본문색 한 줄 「이 이메일은 이미 PurpleHere 계정이 있습니다. 이 매장 직원으로 초대할까요?」 + `ThemedButton`(secondary, small) 「초대 보내기」 → Add 모달 닫고 **초대 모달**을 이메일·권한(Add 폼에서 고른 것) 채운 채 연다.
5. **헤더** «Add Staff» 옆 `Button variant="secondary"` 「기존 계정 초대」(`staffPage.inviteExisting`) → 초대 모달(빈 상태).
6. **초대 모달** `components/Staff/InviteExistingStaffModal.tsx`(새, 공용 `Modal` small): 이메일(`FormInput`, 400 에서 넘어오면 고정 표시) · `StaffPermissionPicker`(1개 이상 — 0개면 보내기 비활성) · 메시지(≤300) · 푸터 [취소][초대 보내기](공용 async 가드). 실패 = 서버 message 그대로(**직접 fetch** — `fetchAPI` 는 본문을 버린다). 성공 → 닫기 + 본문색 한 줄 「초대를 보냈습니다. 본인이 수락하면 목록에 나타납니다.」 + 패널 재조회.
   - 도움말 한 줄(모달 상단): 「초대한 계정은 자기 비밀번호로 로그인해 이 매장으로 전환합니다. Staff ID·PIN 은 쓰지 않습니다.」
7. **`BG/FG/매니저`** 가 이 화면을 열 때는 초대 버튼·연결 계정 액션을 그리지 않는다(서버도 403/404) — 패널과 같은 조건(597줄).

### 6.2 `components/ContextRequests/ContextRequestsPanel.tsx` — «보낸 초대» 묶음
- `GET /context-requests/sent` 를 같이 부르고, 받은 요청 아래에 소제목 「보낸 초대 (n)」 행: `이메일 · 이름` · ▦ 매장 · 권한 태그(피커 라벨) · 보낸 날짜 · [초대 취소](danger small → `DELETE /:id`). 받은 요청 0 · 보낸 초대 0 이면 종전처럼 아무것도 안 그린다.
- 승인 버튼 로직은 종전 그대로(서버 범위가 초대를 빼 준다).

### 6.3 `pages/ContextSelect/ContextSelectPage.tsx` — «받은 초대» 행
- `/mine` 의 `meta.invitations` 를 요청 행 **위에** 그린다(행동이 필요한 것이 먼저): ▦ 매장 이름 · 아래줄 「매장 직원 · 권한 {n}개 · {초대한 사람} 이(가) 초대함 · {날짜}」 · 오른쪽 [수락](primary small) [거절](secondary small → 공용 Modal small, 사유 ≤300 선택).
- 수락 성공 → `refreshContexts()`(AuthContext 기존 함수, 937줄) → 카드가 바로 나타남 · 초대 행 사라짐. 실패(403 좌석 등) → 행 아래 서버 message 빨간 글.
- 권한 n개 옆 「보기」 토글로 키 라벨 목록(피커 라벨 재사용, 읽기 전용) — 무엇을 받는지 알고 수락.

### 6.4 로그인 → 선택 화면 조건 (`pages/Login/LoginPage.tsx:494`)
- 로그인 응답(`authService.login` 145-172 · 빠른 로그인 931-941 · `/auth/me`)에 **`pending_invitations: <count>`** 를 추가(1쿼리 `COUNT(*) … WHERE user_id=:uid AND initiator='grantor' AND status='pending'`). AuthContext 가 보관(`pendingInvitations`).
- 조건: `contexts.length >= 2 || pendingInvitations > 0` → `/pos/select-context`. 0 이면 종전과 바이트 동일. 선택 화면 상단 안내 한 줄 「받은 초대가 있습니다」.
- 사이드바 스위처(`HeaderContextSwitcher`)·퀵액션에는 배지를 **달지 않는다**(🔒 MainLayout 무접촉 유지 — 두 부품 자체는 보호파일이 아니지만 이번엔 메일 + 로그인 유도로 충분. 늘릴 땐 별건).

### 6.5 i18n — `public/locales/{en,ko,zh,ms}` 4언어, `npm run i18n:verify`
`staff.json staffPage.*`: `linkedAccount`(Linked account/연결 계정) · `inviteExisting`(Invite existing account/기존 계정 초대) · `inviteTitle` · `inviteHint` · `inviteSend` · `inviteSent` · `emailExistsInvite`(This email already has a PurpleHere account. Invite it to join this store as staff?/이 이메일은 이미 PurpleHere 계정이 있습니다. 이 매장 직원으로 초대할까요?) · `editPermissions` · `unlink` · `unlinkConfirm` · `linkedNoPin`.
`auth.json context.invite.*`: `title`(Invitations/받은 초대) · `line`({{who}} invited you · {{count}} permission(s)) · `accept` · `decline` · `declineTitle` · `declineNote` · `accepted` · `failed` · `banner`(You have an invitation) · `sent`(Sent invitations) · `cancel`.
기존 하드코딩 영어(«Add Staff», «Edit» 등)는 **그대로** — 번역 정리는 별건.

---

## 7. 소켓·POS 현장
변경 0. 수락으로 생긴 Staff 모자는 v1.3 과 같은 모자다(전환·투영·소켓 재검증·POS 진입 가드 전부 종전 경로). PIN 캐셔 목록에는 안 나온다(v1.3 §7).

---

## 8. 테스트 — `tests/context-invites.test.js` 신설 + 기존 2개 무회귀
고정물(dev, demo 매장만): rid 18 «Test Debug Restaurant»(staff_limit 5) · rid 39 «Gangnam Noodle House». 임시 `is_test=1` 사용자 3명 beforeAll INSERT: **r18** = RA of rid 18(초대자), **bm** = Brand Manager brand 10(초대 대상 — Irene 사례 동형), **r39** = RA of rid 39(남의 매장 RA). SA 토큰 기존 방식. afterAll: 요청/초대 행·`user_contexts` 행·임시 사용자 전량 삭제·`staff_limit` 원복.

① **문구**: r18 `POST /users`(Staff, email=bm) → 400 · `code==='EMAIL_IN_USE'` · `canInvite===true` · **본문에 'Brand Manager'·'restaurant ID' 문자열 없음**(assert). SA 가 RA 계정을 같은 이메일로 → 400 `EMAIL_IN_USE` · `canInvite` 없음. Staff ID 중복 → `STAFF_ID_IN_USE` · 'at restaurant ID' 없음.
② **초대 보내기**: r18 `POST /invite {email: bm, permissions:['access_pos']}` → 201 · 응답에 `user_id`/`role` 키 **없음** · 행 `initiator='grantor'`, `created_by=r18`, `permissions` 저장 · `GET /sent` 1건 · `GET /`(받은 요청) **0건** · `pending-count` 0(초대는 안 셈).
③ **거부 사유**: 없는 이메일 404 · SA 이메일 400 · demo 계정(demo-brand@…) 400 · 본인 400 · `permissions:[]` 400 · 같은 대상 다시 409 · r39 가 body `restaurant_id:18` 로 → 자기 매장(39)로 강제됨(행의 entity_id 39 assert) · demo RA(23) → 403 · BG 역할 → 403.
④ **수락**: bm `GET /mine` → `meta.invitations` 1건(label 매장명 · permissions) · r39 `POST /:id/accept` → 404 · r18(초대자) `POST /:id/approve` → 404(scope 밖 — 셀프 승인 차단) · bm `accept` → 200 · `user_contexts` 행(Staff · permissions · `granted_by = r18`) · `/auth/contexts` 에 ▦ 카드 · `/mine` 에서 초대 사라짐 · 요청 행 approved · `decided_by = bm`.
⑤ **목록·관리**: r18 `GET /users?include_contexts=1` → bm 행 `access_kind:'context'`, `context_id`, `role:'Staff'`, `permissions` · **`GET /users`(플래그 없음) 엔 없음**(바이트 동일) · r39 `GET /users?include_contexts=1` 엔 없음 · r18 `PUT /users/bm/contexts/:cid {permissions:['access_pos','reports']}` → 200 · 행 갱신 · `PUT` with `[]` → 400 · r39 같은 PUT → 404 · r18 `DELETE /users/bm/contexts/:cid` → 200 · 다음 bm 요청 `X-Context-Fallback` · r39 DELETE → 404 · SA DELETE 는 종전 그대로 200(다른 행으로).
⑥ **거절·취소**: 새 초대 → bm `decline {note}` → rejected · `decided_by=bm` · `/sent` 에서 사라짐. 새 초대 → r18 `DELETE /:id` → 200 · bm `/mine` 0건. r39 가 r18 의 초대 DELETE → 404.
⑦ **방향 충돌**: bm 이 rid 18 에 요청(`POST /`) 해 둔 상태에서 r18 초대 → 409 문구 `approve it instead` · 반대로 초대가 있는데 bm 이 요청 → 409 `accept it instead`.
⑧ **좌석**: `UPDATE restaurants SET staff_limit=1 WHERE id=18`(좌석 r18 1명 = 가득) → 초대 → 403 `Staff limit reached` · 원복 → 201 · 수락 직전 다시 limit=1 → `accept` 403(본검사) · 원복 → 200.
⑨ **로그인 유도**: 초대 pending 상태에서 bm 로그인 응답 `pending_invitations === 1` · `/auth/me` 도 같은 값 · 수락 뒤 0.
⑩ 기존 `tests/context-requests.test.js`·`user-contexts-switch.test.js` 전건 통과(승인 라우트 scope 에 initiator 조건이 붙어도 종전 요청 흐름 무회귀 — 메시지 문자열 변경 0).
- **고장주입**(assert 필수, 결과 보고): **FI-18** `/invite` 응답에 대상 `id`·`role` 을 실어 보기 → ② 실패 확인 후 원복. **FI-19** `visibleRequestScope` 의 `initiator='requester'` 제거 → ④ 의 «초대자 approve 404» 실패(200 이 되어 셀프 부여 성립) 확인 후 원복. **FI-20** `canManageContextRow` 의 `entity_id` 비교 제거 → ⑤ r39 PUT/DELETE 404 테스트 실패 확인 후 원복. **FI-21** `POST /users` 문구에 `userContext` 되살림 → ① 실패 확인 후 원복. **FI-22** accept 의 좌석 본검사 제거 → ⑧ 수락 403 실패 확인 후 원복.

### 8.1 health-check (`scripts/health-check.js` 컨텍스트 블록 옆)
- 익명 → `POST /context-requests/invite` 401 · `POST /context-requests/1/accept` 401 · `PUT /users/1/contexts/1` 401.
- 데모 RA(23) → `POST /context-requests/invite` **403**(demo) · `GET /context-requests/sent` 200 배열 · `GET /users?include_contexts=1` 200(배열, 각 행에 `password` 없음).
- 데모 BG(22) → `GET /context-requests/sent` 403 · `PUT /users/23/contexts/1` 403/404.
- 데모 RA 가 `POST /users` 로 `demo-brand@purplehere.com` 이메일 Staff 생성 → 400 이고 **본문에 'Brand General' 문자열 없음**(노출 회귀 영구 감시).

### 8.2 인스펙션 `scripts/inspection/suites/user-contexts.js`
- **UC-009** 「초대 행(initiator='grantor')은 `created_by`·`permissions`(1개 이상) 있음 · 요청 행은 `permissions` NULL」 = 0 위반.
- **UC-010** 「승인된 초대의 결정자 = 그 행의 user_id(본인) · 승인된 요청의 결정자 ≠ user_id」 = 0 위반(셀프 부여 사후 감시).
- UC-005/006 은 초대 행도 포함해 그대로 적용(칸이 없는 환경은 UC-000 방식 스킵).

---

## 9. 검증 순서 (빌드 1회 · sweep 1회)
1. §4 마이그 작성 → `node scripts/migrate-user-context-requests-invite.js`(dev) → §5 백엔드 확정 → `pm2 restart dev-backend` → `npx jest tests/context-invites.test.js tests/context-requests.test.js tests/user-contexts-switch.test.js` → `node scripts/health-check.js` → 인스펙션 UC-005~010 → FI-18~22.
2. §6 프론트 전부 확정 → `npm run i18n:verify` → **SW 는 마지막**(HEAD 5.95 → 5.96) → `npm run build:dev` 1회 → `node scripts/verify-all.js --full` 1회(print-guard 0 변경 · design-guard · mount sweep).
3. 실브라우저(dev, 임시 `is_test` 계정 — demo RA 는 초대 403): ⒜ r18 로그인 → `/restaurant/18/staff` → Add Staff 에 bm 이메일 → 저장 → 400 한 줄 + [초대 보내기] → 모달(이메일 고정 · 권한 2개) → 보내기 → 패널 «보낸 초대 1» ⒝ bm 로그인 → (컨텍스트 1개인데도) 선택 화면 → «받은 초대» 행 → 권한 보기 → 수락 → 카드 즉시 → 전환 → `/restaurant/18/dashboard` · 사이드바 권한대로 ⒞ r18 화면 새로고침 → 목록에 bm «연결 계정» 행(PIN —, ID —) → 권한 수정 → 저장 → 태그 바뀜 → 연결 해제 → 확인 → 행 사라짐 → bm 쪽 다음 요청 폴백 배너 ⒟ «기존 계정 초대» 버튼 → 없는 이메일 → 404 문구 ⒠ 거절 흐름 1회(사유) → r18 메일 ⒡ 1440·390 폭 · console.error 0 · BG 로 StaffPage 열면 초대 버튼 없음. **끝나면 전량 삭제.** 데모 38 은 좌석 5/5 라 손대지 않는다.
4. `node scripts/check-sensitive-diff.js` → Fable 게이트 1회(사실만: diff 파일 목록 · 테스트 수 · FI 결과 · sweep 결과 · 확인 불가 항목).

---

## 10. 배포·롤백
- 마이그 1개 = ADD COLUMN ×3(DEFAULT/NULL) + 인덱스 1 · INSERT 0 · 레지스트리 deploy · 기존 행 영향 0(`initiator` DEFAULT 'requester' 로 종전 의미 그대로).
- 롤백 = 이전 번들+백엔드 복원 — 칸은 남아도 무해(옛 코드는 읽지 않음; 옛 승인 라우트는 `initiator` 를 모르므로 **롤백 중에 pending 초대가 남아 있으면 옛 패널에 요청처럼 보일 수 있다** → 롤백 시 `DELETE … WHERE initiator='grantor' AND status='pending'` 1줄을 롤백 절차에 적어 둔다).
- 운영 쓰기 0. 배포 뒤 Irene 확인 1회: 실매장 RA 로 Add Staff 에 기존 이메일 → 400 문구에 역할·매장 번호가 **안 나오는지**(초대는 보내지 않아도 됨).

## 11. 문서 (새 파일 0)
- `docs/MULTI_CONTEXT_LOGIN_DESIGN.md`: §3.7 에 «v1.4 칸 3개(initiator·created_by·permissions)» · §6.4 끝 **«v1.4 초대 — RA 가 시작, 본인이 수락»** · §8-3 에 «RA 는 자기 매장 Staff 모자의 권한 수정·회수 가능(생성은 여전히 승인/수락 경유)» · Q3 끝 «v1.4: 초대 허용 · 셀프 부여 금지 유지(초대자는 자기 초대를 승인할 수 없다)».
- `docs/STAFF_ACCESS_AND_IDENTITY_DESIGN.md` 에 «연결 계정은 ID·PIN 없음» 한 줄(§3-A 옆).
- 메모리·session-state·DEVELOPMENT_PLAN 은 **게이트 통과 뒤**.

---

## 12. Irene 확인 필요 결정 — 각 Fable 권고

| # | 결정 | 선택지 · 결과 | Fable 권고 | 되돌리기 |
|---|---|---|---|---|
| **D1** | 기존 계정을 직원으로 붙이는 **방식** | **A 초대·수락**: RA 가 초대 → 본인이 선택 화면에서 수락(로그인하면 선택 화면으로 유도 + 메일). 한 단계 더 있지만 본인 동의가 남고, 원치 않는 연결은 거절로 끝남. 요청 흐름의 거울이라 표·규칙 한 벌. **B 직접 연결**: RA 가 이메일만 넣으면 즉시 모자. 빠르지만 ① 아무 매장 관리자(누구나 가입 가능)가 남의 계정을 동의 없이 자기 매장에 붙일 수 있고 ② 그 사람이 스스로 뗄 길(«나가기»)을 새로 만들어야 하며 ③ 이메일→계정 해석 라우트가 하나 더 생긴다 | **A.** 업계(Toast·Square·Slack)가 전부 «초대 → 수락»이고, 지금 있는 요청 흐름과 정확히 대칭이라 규칙이 한 벌로 남는다. Irene 본인 사례처럼 두 역할이 같은 사람이면 수락은 선택 화면에서 버튼 1번이다 | 쉬움 — B 는 A 위에 순수 추가(§5.7) |
| **D2** | RA 가 연결 계정의 **권한을 고치고 연결을 끊을** 수 있나 | 예: 자기 매장 Staff 모자만(RA 모자·오너·BM 은 여전히 SA). 아니오: 지금처럼 SA 만 | **예.** RA 는 그 권한을 준 사람이고 자기 네이티브 직원에겐 이미 같은 일을 한다. SA 만 두면 «승인은 했는데 손볼 수 없는» 반쪽이 된다(팀원 실측 5) | 쉬움 — 가드 함수 한 곳 |
| **D3** | 좌석 셈 | 초대 보낼 때 미리 + 수락 때 본검사(둘 다 같은 함수) | 확정(기술) — D3(10-05) 그대로 | — |
| **D4** | 오류 문구에서 기존 계정의 역할·매장 번호 제거 | 제거(존재만 알림) | 확정(보안) — 남의 회사 계정 정보를 흘릴 이유가 없다 | — |
| **D5** | 대기 일 «스탭 승인 즉시 반영»(mvb6qj12)과의 경계 | 앞절반 «리스트에 안 뜸» = 이 설계 §5.2·§6.1 이 고친다. 뒷절반 «상대 화면에 바로 적용 안 됨(나갔다 들어와야)» = 그 방이 따로(수락/승인 뒤 상대 세션의 컨텍스트 목록 갱신 — 이 설계 §6.3 의 `refreshContexts()` 는 **본인이 수락한 경우**만 즉시다) | 이 건 먼저, 그 방은 이 건 배포 뒤 착수(같은 파일을 두 방이 고치지 않게) | — |

D1·D2 는 Irene 컨펌 뒤 착수. D3·D4·D5 는 기술 결정(통보).

## 하지 말 것 (재확인)
전 플랫폼 이메일 검색 라우트 · 초대 응답에 대상 id/역할 · `user_contexts` 직접 INSERT/UPDATE(권한 수정도 `grantContext`) · 초대 표 따로 만들기 · `status` ENUM 에 값 추가 · `router.use(authenticateToken)` · `/:id` 보다 뒤의 리터럴 경로(`/invite`·`/sent` 는 `/mine`·`/targets` 옆에) · RA 에게 `POST /users/:id/contexts` 열기(D1 A) · 🔒 MainLayout/인쇄 8파일/KDS 접촉 · 운영 쓰기 · 프론트 빌드 2회 · 구현 중 세부를 Fable 에 되묻기(결정해 결과에 붙인다, 앵커 불일치만 중단·보고).

---

## 부록 — 실측 근거 (2026-10-16 dev)
- `routes/users.js`: 생성 303-454(RA 는 Staff 만·자기 매장 강제 329-345 · 중복 문구 432-454 · 좌석 469-488 `countRestaurantSeats`) · 목록 12-181(RA `u.restaurant_id = ?` 42-44 · `include` 류 플래그 없음) · 수정 678(RA 는 자기 매장 Staff) · 삭제 991(RA 는 자기 매장 Staff) · 모자 3라우트 1316/1352/1388 전부 SA.
- `routes/context-requests.js`: `visibleRequestScope` 40-52(SA 전부 · RA 자기 매장 Staff) · 대상 검색 136-154(이름만) · 요청 214-266(demo 403 · `alreadyHoldsContext` · 중복 409 · 5건) · 승인 270-346(권한·좌석·`grantContext`) · 삭제 386-402(자기 행 pending/rejected).
- `services/userContexts.js`: `grantContext` 532-623(Staff = ON DUPLICATE permissions 갱신 598-603) · `alreadyHoldsContext` 467-495 · `findRestaurantHat` 498 · `countRestaurantSeats` 513-523 · `normalizeStaffPermissions` 87-98.
- `models/UserContextRequest.js`: status ENUM('pending','approved','rejected') · 인덱스 3개 · 칸: id,user_id,entity_type,entity_id,role,message,status,decided_by,decided_at,decision_note,created_at,updated_at(SHOW COLUMNS 실측 — initiator/permissions 없음).
- 프론트: `StaffPage.tsx` 목록 282-343(`/api/users` → `restaurant_id` 필터) · 생성 400 처리 455-458(`errorData.error`) · 행 액션 729-738(Edit · Staff 만 Reset PW · 삭제 버튼 없음) · 패널 마운트 597. `ContextRequestsPanel.tsx` 161-169(`?status=pending`). `ContextSelectPage.tsx` 265(`/mine`) · 392-409(pending/rejected 행). `LoginPage.tsx:494`(`contexts.length >= 2`). `AuthContext.tsx:641·716`(로그인 응답 contexts) · 937(`/auth/contexts` 재조회).
- `GET /api/users` 프론트 호출자 14파일 — RA 로 부르는 곳은 `StaffPage`·`DashboardContent`; 그래서 모자 행은 opt-in(`include_contexts=1`).
- dev DB: 매장 1(limit 10)·18(5)·38(5, 좌석 5/5)·39(5) 전부 demo. `minky3018@gmail.com` 은 dev 에선 RA(restaurant_id NULL, is_test) — 운영과 다르므로 테스트는 임시 BM 으로. 데모 RA 23 is_demo=1(초대 403 대상 → health-check 에 그대로 씀).
- 알림: `NOTIFICATION_CATEGORIES` 에 `context_request_received`·`context_request_result` 2개(notification-settings.js:19-20) — 같은 자리에 2개 추가.
- SW: HEAD `5.95`.
