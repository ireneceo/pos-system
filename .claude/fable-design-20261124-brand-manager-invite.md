# 브랜드 매니저 화면에서 «기존 계정 초대» — 설계 (Fable · 2026-11-24)

[Claude Code · Fable 설계] · 개발서버 전용 · 구현은 팀원(Opus) · 끝난 뒤 Fable 게이트 1회(보안 경계 변경)

## 0. Irene 원문

> «https://purplehere.com/pos/brand/manager 여기에서 기존 아이디를 추가할 수 없어? 우리 withmin1 아이디를 멀티로 GIT consulting 매니저로 연결하고 싶은데»

## 1. 답과 결정

**지금은 안 된다(코드 확인).** `/pos/brand/manager` 의 «Add New Manager» 는 새 계정만 만든다 — 이메일이 이미 있으면 400 으로 끝난다(`routes/brands-core.js` POST `/:id/staff`). 기존 계정에 브랜드 매니저 자격(멀티 아이디)을 붙이는 길은 시스템 관리자 화면(`/pos/admin/staff`) 하나뿐이다.

**만든다.** 브랜드 주인(Brand General)이 매니저 화면에서 **기존 계정을 이메일로 초대 → 본인이 수락 → 그 브랜드의 «연결된 매니저»** 가 되게 한다. 새 구조를 짓지 않고 이미 있는 것만 잇는다:

| 이미 있는 것 | 이번에 쓰는 방식 |
|---|---|
| 초대 표 `user_context_requests`(initiator='grantor') · 수락 `POST /:id/accept` · 거절 · 취소 | 그대로 — 브랜드 × Brand Manager 행을 싣는다 (DB 변경 0) |
| 유일한 쓰기 경로 `services/userContexts.grantContext` (브랜드 매니저 가지) | 그대로 — 수락 때만 호출 |
| 매니저 목록의 «Linked account» 행 · 메뉴 권한 수정(10-26 게이트 통과) | 그대로 |
| 받은 초대 카드(`/pos/select-context`) | 브랜드 매니저 초대 문구만 추가 |

### 결정 목록

- **D1 본인 수락 필수.** 주인이 이메일만으로 남의 계정에 자격을 바로 꽂지 않는다 — 매장 직원 초대(10-16)·새 매장 관리자 초대(10-29)와 같은 규칙. 바로 부여는 시스템 관리자만(종전 그대로).
- **D2 초대할 수 있는 사람 = 그 브랜드의 주인(`brands.owner_id === 요청자`, 본 계정 역할 Brand General) + 시스템 관리자.** 브랜드 매니저(일반·연결)는 초대 못 한다. 데모 계정은 초대 못 하고 초대받지도 못한다(종전 규칙).
- **D3 브랜드마다 한 장.** 연결 매니저 자격은 브랜드 하나에 고정이라(`brand_scope_fixed`) 여러 브랜드면 초대 행도 브랜드 수만큼 생긴다. 화면에서는 **한 번에 여러 브랜드를 체크해 보내고**, 메일은 **한 통**(브랜드 이름 나열). 받는 사람은 브랜드마다 «수락» 한다. «나중에 추가된 브랜드» 는 자동으로 안 붙는다 — 화면에 한 줄 안내.
- **D4 주인은 자기 브랜드의 연결 매니저를 «떼기» 도 할 수 있다.** 붙일 수 있는데 뗄 수 없으면 주인이 시스템 관리자에게 부탁해야만 접근을 끊는다 — 권한을 줄이는 방향이고 자기 브랜드 한정이라 연다. (10-26 «부여·회수는 SA» 를 이 범위에서만 바꾼다: 부여 = 초대+수락, 회수 = 주인도.)
- **D5 그대로 두는 것:** `POST /api/users/:id/contexts`(바로 부여)는 SA 전용 · «Request a role» 로 들어온 브랜드 매니저 요청의 승인자는 SA(`visibleRequestScope` 무접촉 — 주인이 자기 초대를 «승인» 하는 길이 생기면 안 된다) · 주인(BG) 모자·공급업체 모자는 만들지 않는다(11-06 Irene 결정 A 유지).
- **D6 기존 초대 라우트(`POST /invite`, 매장 × Staff)는 고치지 않고 새 리터럴 경로를 옆에 둔다.** 게이트를 통과한 매장 초대 코드에 가지를 넣지 않는다.

## 2. 서버 설계

### 2.1 새 라우트 — `POST /api/context-requests/invite/brand-manager`

`routes/context-requests.js`, `/:id` 계열보다 **위**에 둔다. `authenticateToken` 을 라우트에 명시(`router.use` 금지).

요청: `{ email, brand_ids: number[], permissions: string[], message? }`

순서(쓰기 전에 전부 판정):
1. 역할: `System Admin` 또는 `Brand General` 아니면 403 · `req.user.is_demo` 면 403.
2. `brand_ids` — 배열 · 1~50개 · 전부 `normalizeEntityId` 통과(아니면 400) · 중복 제거.
3. 브랜드마다 `loadGrantEntity('brand', id)`. BG 는 **모든** 브랜드가 `owner_id === req.user.id` 여야 한다 — 하나라도 없거나 남의 것이면 **전체 404 «Brand not found»**(존재 여부 안 흘림 · 부분 진행 없음).
4. `permissions` → `normalizeBrandManagerPermissions`(오류면 400). 안 보내면 400 — 화면이 항상 보낸다. **행에는 정규화된 배열을 항상 저장**(NULL 금지 — 2.2 ②의 함정 때문).
5. 대상: 이메일로 조회 · 없으면 404 «No account with this email» · 자기 자신 400 · System Admin 400 · 데모 400 · 비활성 400 (매장 초대와 같은 문구).
6. 브랜드별 판정 — `alreadyHoldsContext`(주인 본인·이미 그 브랜드 소속·이미 가진 모자) · `findPendingAnyDirection`(이미 대기 중인 요청/초대) · 브랜드당 대기 초대 20개 상한(`MAX_PENDING_INVITES_PER_BRAND`). 걸린 브랜드는 **건너뛰고 사유를 싣는다**(여러 브랜드를 한 번에 보낼 때 하나 때문에 전부 막히지 않게).
7. 보낼 브랜드가 0개면 400(첫 사유 문구). 아니면 한 트랜잭션으로 행 생성: `initiator='grantor'`, `created_by=req.user.id`, `entity_type='brand'`, `role='Brand Manager'`, `permissions`=정규화 배열.
8. `logActivity`(브랜드마다 · `restaurant_id` 는 싣지 않는다) · `emitContextChanged({kind:'invited', entityType:'brand'})` 브랜드마다 · **메일 한 통**(`notifyInviteReceived` 에 `role:'Brand Manager'`, `targetName` = 브랜드 이름 «, » 나열, `permissionCount`).

응답 201: `{ success, data: { email, results: [{ brand_id, label, status: 'invited'|'skipped', id?, reason? }] }, message }` — 대상의 id·역할·소속은 싣지 않는다.

좌석(요금제 직원 한도) 검사는 **하지 않는다** — 매장 전용 개념.

### 2.2 수락 `POST /:id/accept` — 브랜드 행이 지나가게 고칠 3곳 (지금은 틀리게 동작)

① **좌석 검사는 매장 모자일 때만.** 지금은 `seatLimitBody(row.entity_id)` 를 무조건 불러, 브랜드 번호와 같은 번호의 **무관한 매장** 직원 한도로 403 이 날 수 있다 → `if (userContexts.isRestaurantHat(row.entity_type, row.role))` 로 감싼다.

② **권한 전달.** 이 파일의 `parsePermissions` 는 NULL 을 `[]` 로 바꾸는데, 브랜드 매니저 가지에서 `[]` 는 «dashboard 만» 으로 저장된다. 브랜드 매니저 행은 `userContexts.parsePermissions(row.permissions)`(NULL 유지 → 기본값) 로 넘긴다. 매장 행의 값 전달은 바이트 그대로.

③ **수락 순간 초대한 사람의 자격 재확인(브랜드 행만).** 초대 뒤 브랜드 주인이 바뀌었거나 초대한 계정이 꺼졌을 수 있다: `created_by` 가 지금도 (활성) 그 브랜드의 `owner_id` 이거나 System Admin 이어야 한다. 아니면 409 «This invitation is no longer valid» — 행은 그대로(주인/SA 가 취소).

`grantContext` 본문은 **고치지 않는다**.

### 2.3 결과 알림 `notifyInviteResult`

`getUserAddressee(inviterId, 'restaurant', entityId)` 고정 → 행의 `entity_type` 을 받는다. `utils/notificationLinks.js` 의 `staff` 대상에 `brand: '/pos/brand/manager'` 를 더한다(매장·admin 값 무접촉). 수락·거절 호출부 두 곳에 `entityType: row.entity_type` 전달.

### 2.4 보낸 초대 `GET /sent` · 취소 `DELETE /:id`

- `/sent` 에 Brand General 가지: `ucr.entity_type='brand' AND ucr.role='Brand Manager' AND ucr.entity_id IN (SELECT id FROM brands WHERE owner_id = :me)`. RA·SA 가지 무접촉.
- `findCancellableInvite` 에 «그 브랜드 주인» 가지(주인이 바뀌어도 새 주인이 취소 가능). `created_by === 나` 는 이미 통한다.
- 취소 로그 문구가 «staff invitation … restaurant #» 고정 + `restaurant_id` 에 브랜드 번호가 들어간다 → 행 종류에 맞게(브랜드면 `restaurant_id` 안 실음).

### 2.5 떼기 `DELETE /api/users/:id/contexts/:contextId` (`routes/users.js`)

판정을 `canManageContextRow(...)` → **`canEditContextPermissions(...)` 와 같은 조건**(= 종전 + «브랜드 매니저 모자 × 그 브랜드 주인 BG»)으로. 함수 이름이 뜻과 안 맞게 되므로 `canManageContextRowAsync`(또는 `canManageOrOwnsBrandHat`) 하나로 합쳐 PUT·DELETE 가 같이 쓴다 — 판정은 한 곳. 범위 밖은 종전처럼 404.
같이: 회수 로그 문구 «restaurant #…» 고정 + 브랜드 행에도 `restaurant_id` 를 싣던 것을 행 종류에 맞게.

### 2.6 «이메일 이미 있음» 신호 (`routes/brands-core.js` POST `/:id/staff`)

**이메일이 겹칠 때만** 응답에 `code: 'EMAIL_IN_USE'` 를 더한다(문구·상태 400 그대로 · 사용자명만 겹치면 안 붙임). 화면이 «이 계정을 초대하기» 로 잇는 데 쓴다. 다른 줄 무접촉.

### 2.7 메일 문구 (`utils/notificationTemplates.js` + 백엔드 `locales` 4언어)

`contextInviteReceivedEmail` 은 Staff 가 아니면 «restaurant admin» 문구(`bodyAdmin`)를 쓴다 → `role === 'Brand Manager'` 가지: `subjectBrandManager` · `bodyBrandManager` · `textFallbackBrandManager`(en·ko·zh·ms). 권한 수 줄은 브랜드 매니저에도 보인다. 역할 이름은 `CONTEXT_ROLE_KEY` 에 이미 있다.

### 2.8 건드리지 않는 것

`grantContext` · `visibleRequestScope` · `GRANTABLE_COMBINATIONS` · `POST /invite`(매장) · `attachRestaurantAdmin` · `middleware/auth.js` 투영 · DB 구조·마이그레이션 · 🔒 인쇄/KDS 보호 파일 전부.

## 3. 화면 설계

### 3.1 `/pos/brand/manager` (`BrandStaffPage.tsx` — 이미 1018줄이라 새 코드는 따로 뺀다)

- 머리줄: «Add Manager» 옆에 **«Invite existing account»**(공용 `Button` secondary) — 주인(isGeneral)에게만.
- 새 컴포넌트 `components/Brand/InviteExistingManagerModal.tsx` (공용 `Modal`·`ModalButton`·`FormInput`·`ModalWarning` — `InviteExistingStaffModal` 과 같은 뼈대):
  1. Email
  2. Brands — 내 브랜드 체크박스 + «Select all»(브랜드가 1개면 고정 표시). 안내 한 줄: «Linked managers are added per brand. Brands you add later are not included.»
  3. Menu access — 지금 수정 모달이 쓰는 권한 블록(`BRAND_MANAGER_PERMISSION_GROUPS`, dashboard 항상 켬)
  4. Message(선택 · 300자)
  5. 안내: «They'll see the invitation when they sign in and must accept it.»
  - 보내기 뒤: 결과가 섞이면(일부 건너뜀) 브랜드별 한 줄씩 보여 주고, 전부 보냈으면 닫고 목록 갱신. 실패 문구는 서버 message 그대로(직접 fetch — fetchAPI 는 실패 본문을 버린다).
- «Add New Manager» 가 `EMAIL_IN_USE` 로 막히면 경고 아래 **«This email already has an account — invite it instead»** 링크 → 초대 모달(이메일·고른 권한·브랜드 미리 채움).
- 목록: `GET /api/context-requests/sent` 로 받은 대기 초대를 **«Invited — waiting for acceptance»** 꼬리표 행으로(이메일·브랜드·권한·보낸 날 · 날짜는 매장 타임존 유틸). 행 동작은 «Cancel invitation»(`IconButton`) 하나.
- 연결 매니저 행(Linked account): «Edit»(종전) + **«Remove from this brand»**(주인만 · `ConfirmModal` — «계정은 지워지지 않고 이 브랜드 접근만 끊깁니다»). 비밀번호 초기화·삭제는 종전처럼 숨김.
- 통계 카드 «Total managers» 는 대기 초대를 세지 않는다.

### 3.2 받는 사람 `/pos/select-context` (`ContextSelectPage.tsx`)

초대 카드가 `Restaurant Admin` 아니면 전부 «Store staff» 로 읽힌다 → `role === 'Brand Manager'` 가지: 글리프 `◐` · 종류 라벨(요청 쪽에 있는 브랜드 매니저 키 재사용) · 줄 문구 `context.invite.lineBrandManager`(«{{who}} invited you · {{count}} menus») · 권한 펼침은 `ui.brandManagerPerm.*` 라벨로. 수락·거절 버튼·흐름은 그대로. 사이드바의 받은 초대 표시(`MainLayout`·`AuthContext` pending_invitations)는 역할을 가리지 않는지 **구현 때 읽어서 확인**(가린다면 같은 가지 추가 — MainLayout 은 인쇄 보호 파일이므로 `_printPollFn` 무접촉 · 고쳐야 하면 print-guard 지문이 뜨므로 **고치지 말고 Fable 에 되묻는다**).

### 3.3 번역

프론트 4언어(en→ko→zh→ms): `common:brandStaffPage.invite*`·`pendingInvite*`·`removeLinked*` · `context.invite.lineBrandManager`. `npm run i18n:verify` 통과.

## 4. 파일별 변경 목록

| 파일 | 변경 |
|---|---|
| `dev-backend/routes/context-requests.js` | 새 라우트 `POST /invite/brand-manager` · accept 3곳(좌석 가드·권한 전달·초대자 재확인) · `notifyInviteResult` 엔티티 종류 · `/sent` BG 가지 · `findCancellableInvite` 주인 가지 · 취소 로그 |
| `dev-backend/routes/users.js` | DELETE 판정에 «그 브랜드 주인» · PUT 과 판정 함수 하나로 · 회수 로그 |
| `dev-backend/routes/brands-core.js` | POST `/:id/staff` 400 에 `code:'EMAIL_IN_USE'` (이메일 겹칠 때만) |
| `dev-backend/utils/notificationLinks.js` | `staff` 대상에 `brand` 주소 |
| `dev-backend/utils/notificationTemplates.js` + `dev-backend/locales/*` 4언어 | 브랜드 매니저 초대 문구 |
| `dev-backend/tests/context-invites.test.js` | 아래 5절 사례 |
| `dev-backend/scripts/health-check.js` | security: 익명 401 · 남의 브랜드 404 · 매니저 403 |
| `dev-frontend/src/components/Brand/InviteExistingManagerModal.tsx` | 신규 |
| `dev-frontend/src/pages/Brand/BrandStaffPage.tsx` | 버튼 · 대기 초대 행 · 취소 · 떼기 · EMAIL_IN_USE 잇기 |
| `dev-frontend/src/pages/ContextSelect/ContextSelectPage.tsx` | 브랜드 매니저 초대 카드 문구 |
| `dev-frontend/public/locales/{en,ko,zh,ms}/…` | 새 키 |
| SW 버전 | 프론트 변경이 다 끝난 뒤 마지막에 1회 |

DB 구조·마이그 0 · 보호 파일 0.

## 5. 검증 기준 (게이트에서 볼 것)

시험 데이터: 데모 계정은 초대 금지라 **임시 BG(@example.com) + 임시 브랜드 2개 + 임시 대상 계정**을 만들고 끝에 지운다(실매장·실브랜드 무접촉).

실호출 사례:
1. 주인이 브랜드 2개로 초대 → 행 2 · 메일 1 · 응답에 대상 id 없음.
2. 대상이 수락 → `user_contexts` 행 생성 · 저장된 권한 = 고른 값 · 전환(switch) 뒤 그 브랜드만 보임 · 주인 목록에 linked 행.
3. 남의 브랜드가 하나 섞인 초대 → 404 · 행 0(부분 진행 없음).
4. 브랜드 매니저(일반·연결)·RA·오너가 초대 → 403. 익명 → 401.
5. 주인이 자기 초대를 `POST /:id/approve` → 403/404(승인 범위 무변).
6. 브랜드 번호와 **같은 번호의 매장이 직원 한도에 찬 상태**에서 브랜드 초대 수락 → 성공(좌석 가드).
7. 초대 뒤 브랜드 주인을 바꾸고 수락 → 409 · 모자 0.
8. 주인이 연결 매니저 떼기 → 성공 · 다른 BG 가 같은 행 DELETE → 404 · 주인이 **매장 Staff 모자·RA 모자** DELETE → 404.
9. 이미 그 브랜드 소속/주인/대기 중 → 그 브랜드만 skipped + 사유.
10. 종전 무회귀: 매장 직원 초대·수락(좌석 본검사 포함)·새 매장 관리자 초대 테스트 전부 그대로 통과.

고장주입(반증 — 방어를 빼면 테스트가 실패해야 한다): ⓐ 새 라우트의 주인 판정 제거 → 사례 3 ⓑ accept 좌석 가드 제거 → 사례 6 ⓒ 초대자 재확인 제거 → 사례 7 ⓓ DELETE 주인 판정을 «BG 면 통과» 로 → 사례 8 ⓔ 수락 권한 전달을 종전 `[]` 로 → 사례 2(권한이 dashboard 하나로 떨어짐).

기계: `check-sensitive-diff`(보안 경계 → 게이트 대상) · `check-print-guard` 변경 0 · `verify-all --full`(빌드 1회 뒤 1회) · 실브라우저로 초대 → 수락 → 목록 → 떼기 한 바퀴(역할 `brand` 화면은 데모 계정이라 초대 버튼이 403 — 화면 확인은 임시 BG 로).

## 6. Irene 에게

- 물을 것 없음. D1(본인 수락)·D4(주인이 떼기)는 이미 Irene 가 «권고대로» 한 매장 직원 초대와 같은 규칙을 브랜드에 옮긴 것이다 — **Fable 권고: 이대로 구현.**
- **withmin1 은 지금 당장도 된다:** 상황판에 올라 있는 카드(시스템 관리자 → `/pos/admin/staff` → withmin1 → Store & brand access → 브랜드마다 Brand manager 부여)는 코드 없이 운영에서 바로 된다. 이번 기능은 다음 배포 뒤부터 — 그때는 GIT consulting 주인 계정으로 매니저 화면 «Invite existing account» → withmin1 이메일 · 브랜드 전부 체크 · 메뉴 7개 → withmin1 로 로그인해 브랜드마다 «수락».
- 카드는 그대로 둔다(둘 중 먼저 되는 쪽으로 끝내면 됨 — 카드로 이미 붙였으면 초대는 «이미 가진 자격» 으로 건너뛴다).

## 7. 설계와 다른 판단이 필요해지면

즉시 멈추고 Fable 에 되묻는다 — 특히: `grantContext`·`visibleRequestScope` 를 고쳐야 할 것 같을 때 · `MainLayout.tsx` 를 고쳐야 할 때 · DB 칸이 모자랄 때 · 주인 판정을 `brands.owner_id` 말고 다른 것으로 해야 할 때.
