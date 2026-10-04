# Fable 설계 v2 2026-10-04 — 선택 화면에서 「사업 추가」 (멀티 로그인 v1.3)

작성: Fable(리더). 코드 변경 0 — 설계만. **v1(요청→SA 승인)은 Irene 반대로 폐기** — 이 파일이 v1 을 덮어쓴다.
상위 문서: `docs/MULTI_CONTEXT_LOGIN_DESIGN.md`(§3·§5.2·§5.4·§5.5·§6·§8-3·Q3) · 오늘 판정 `.claude/fable-verdict-20261004-owner-hat-sidebar.md`.

Irene 원문(순서):
1. 「내가 오너 시스템관리자에서 선택을 했는데도 적용이 안되는 거야. 그리고 이미 멀티 로그인 중에 추가신청 할 수 있어야 하는데 왜 없어? https://purplehere.com/pos/select-context 이 페이지에 추가할 수 있어야지. 맨 아래 추가할 수 있어얒. 리스트 아래에.」
2. 「그냥 다하고 배포할래. 왜???」
3. (v1 보고 뒤) 「원래 그냥 신청해서 트라이얼 기간 들어가는데 왜 신청이 들어간다는 거야?」
4. 「랜딩페이지에서 처음 신청하는 프로세스랑 같아야 하는 거 아니야? 다만 더 심플한거고」

---

## 0. 결론

1. **「추가 신청」 = 랜딩 가입(`POST /auth/signup`)과 같은 일을, 계정 없이 사업만** 만드는 것. 종류 고르기 → 이름 → 요금제 → 끝. **승인 없음, 7일 체험 즉시**(가입과 동일 규칙: 0원 요금제는 체험 없이 바로 이용). 계정 칸(이름·이메일·아이디·비번·이메일 인증)만 빠진다 = 「더 심플」.
2. **새로 만든 사업은 이 계정의 카드가 된다.** 매장 → `user_contexts (restaurant × Restaurant Admin, granted_by = 본인)` 1행 **같은 트랜잭션 안에서**. 브랜드·푸드코트 → 행 없이 **소유 칸(`brands.owner_id` / `foodcourts.owner_id`)에서 파생**되는 카드(오너 모자 §5.4 와 같은 방식).
3. **§8-3 봉인은 유지, 한 줄 보정**: 「user_contexts 를 쓰는 코드는 SA 부여 + 사업 추가(자기가 **방금 만든** 매장 id 만 — 클라이언트는 entity_id 를 보낼 수 없다)」. 남의 사업에 대한 자격은 여전히 SA 만 준다. 인스펙션 UC-005 가 「셀프 행 = 자기가 만든 매장」을 사후 감시.
4. **종류 = 매장 · 브랜드 · 푸드코트 3종.** 오너·공급업체는 제외(§1 이유). 랜딩의 5종 중 2종이 빠지는 것은 구조 때문이고, 보고에 사실로 적는다.
5. **입구** = 선택 화면 리스트 맨 아래 「+ 사업 추가」(Irene 지정) + 모자 없는 사람도 선택 화면에 닿도록 사이드바 스위처·퀵액션을 **SA 외 상시 표시**.
6. **v1 로 이미 만든 승인 모델 코드는 제거**(§9). 추출한 `grantContext` 와 공유 판정(`GRANTABLE_COMBINATIONS` 등)은 남긴다 — SA 부여 라우트가 쓰고 38/38 통과 상태.
7. 첫 문장은 오너 모자 사이드바 건(진행 중)으로 본다. 다른 읽기 1건은 운영 로그 읽기로 사실만(§8).
8. 배포는 한 묶음 — 빌드 1회 · `verify-all --full` 1회 · Fable 게이트 1회.

---

## 1. 범위

### 종류별 결정
| 종류 | 만드는 것(가입과 동일) | 카드가 되는 방식 | 판정 |
|---|---|---|---|
| **매장** | `Restaurant` (admin_id=본인, admin_name, status trial/active, plan_type·plan_amount·billing_cycle·currency·subscription_start·snapshot·limits, payment_model 'restaurant') + 커밋 뒤 `subscriptionScheduler.startTrial` | `user_contexts` 1행 (restaurant × RA, granted_by=본인) — v1 모자 기계 그대로. 네이티브가 Restaurant Owner 면 **소유행(ownership)도 함께** 생성(오너 목록에 보여야 하므로) | **포함** |
| **브랜드** | `Brand` (owner_id=본인, status active, subscription_status trial, trial_end_date +7, plan…) + 커밋 뒤 `invoiceScheduler.createEntitySubscriptionInvoice(brand,'brand',…)` | **파생 카드** (brand × Brand General) — `brands.owner_id = 본인` 인 브랜드마다 1장. **단 네이티브 BG/BM 의 `users.brand_id` 와 같은 브랜드는 제외**(기본 카드와 중복) | **포함** |
| **푸드코트** | `Foodcourt` (owner_id=본인, …) + 인보이스 | **파생 카드** (foodcourt × Foodcourt General) — `foodcourts.owner_id = 본인`, 네이티브 FG 의 `users.foodcourt_id` 와 같으면 제외 | **포함** |
| 오너 | 가입은 **사람에게** 요금제를 붙인다(`users.plan_type/subscription_status/trial_end_date`). 기존 계정은 그 칸이 이미 쓰이고 있다(Irene help@ = Brand Enterprise) — 오늘 오너 모자 판정에서 확인한 「사람당 1칸」 | 오너 카드는 **매장을 소유하면 자동**으로 생긴다(소유행 파생, 이미 있음). 매장 추가가 오너 네이티브에게 소유행을 만드는 것으로 충분 | **제외** |
| 공급업체 | `supplier_company_id` 가 `req.user` 에 안 실리고 Supplier Admin 은 `SupplierCompany.owner_id` 역참조 `findOne` 으로 풀린다 — 두 회사를 가지면 판정이 모호. 투영 설계 별건 | — | **제외(후속)** |

### 들어가지 않는 것
요청·승인 모델 전부 · 남의 매장/브랜드에 대한 자격(SA 부여 그대로) · 계정 병합 · 오너/공급업체 추가 · 🔒 인쇄 보호파일 8개(MainLayout 포함)·KDS 접촉 · 운영 DB 쓰기.

---

## 2. 흐름

```
선택 화면 리스트 맨 아래 「+ 사업 추가」
  → /pos/select-context/add (한 화면)
     ① 종류: ▦ 매장 / ◐ 브랜드 / ≡ 푸드코트
     ② 정보: 이름(필수) · 매장이면 주소·전화·이메일(가입과 같은 자유 텍스트 칸, 선택)
     ③ 요금제: /api/public/plans 중 plan_target 일치 카드 · 월/연 · 통화 · 「7일 무료 체험 · 지금 결제 없음」(0원이면 「체험 없이 바로 이용」)
     ④ [추가하기]
  → POST /api/auth/businesses → 트랜잭션(사업 + 매장이면 user_contexts 행) → 커밋 → 체험 시작/인보이스 → SA 알림(기존 notifyAdminNewSignup)
  → 선택 화면으로 복귀, 새 카드 강조 + 「{이름} 추가됐습니다. 카드를 눌러 들어가세요.」 (자동 전환 안 함)
```

---

## 3. 권한·안전

| 항목 | 규칙 |
|---|---|
| 누가 | 로그인 사용자. **System Admin 403**(SA 는 관리 화면에서 만든다) · `is_demo`/`is_test` 계정 403 · `is_active=false` 403 |
| 입력 | `type ∈ {restaurant, brand, foodcourt}` 외 400 · `name` 필수(trim, ≤120) · `plan_id` 필수, `PlanTemplate.is_active` 이고 `plan_target === type` 아니면 400 · `billing_cycle ∈ {monthly, annual}` · `currency` = 지원 통화(가입과 같은 해석) · 문자열 `sanitizeString` |
| 남용 브레이크 | `signupLimiter` 재사용 + 같은 사용자가 24시간에 이 경로로 만든 사업 **3개 초과 → 429**(restaurants.admin_id ∪ brands.owner_id ∪ foodcourts.owner_id 의 created_at 로 셈) |
| 셀프 행 봉인 | 매장 user_contexts INSERT 는 **서비스 함수 안에서 방금 `Restaurant.create` 가 돌려준 id** 로만. 라우트는 entity_id 를 받지 않는다. 인스펙션 UC-005: `granted_by = user_id` 인 행의 매장 `admin_id` 가 `user_id` 가 아니면 위반 |
| 파생 카드 검증 | 브랜드·푸드코트 카드는 **목록·전환·매 요청·소켓이 같은 SQL**(`owner_id = uid`)을 공유(불변식 list ⊆ detail). 행이 없으니 회수 = 소유 이전 |
| 메일 | 인증·환영 메일 **없음**(계정은 이미 있다). SA 에게는 기존 `notifyAdminNewSignup` 그대로(새 사업이 생긴 사실) |

---

## 4. 데이터
- **새 표 없음. ENUM 변경 없음. 마이그 없음.** (v1 의 `user_context_requests` 는 제거 — §9)
- `user_contexts` 에 셀프 행이 생길 수 있다 — `granted_by = user_id`. UC-001(granted_by NOT NULL) 그대로 만족.

---

## 5. 서버

### 5.1 `services/authService.js` — 가입의 사업 생성을 함수로 빼서 **가입과 추가가 같은 코드**를 쓴다
- `createRestaurantEntity({ adminUser, full_name, restaurant_name, restaurant_address, restaurant_phone, restaurant_email, plan, planAmount, currency, billing_cycle }, transaction)` → `Restaurant.create` 블록(:280-301) **그대로**.
- `createBrandEntity({ ownerId|null, brand_name, plan, planAmount, currency, billing_cycle, trialEndDate }, transaction)` → :336-346 그대로(가입은 ownerId null 로 만들고 뒤에 `brand.update({owner_id})` 하는 기존 순서 유지 → 바이트 동일).
- `createFoodcourtEntity(...)` → :382-393 그대로.
- 요금제 금액 해석(`PlanPrice` 통화별, :243-253)도 `resolvePlanAmount(plan, currency, billing_cycle, transaction)` 로 빼서 공유.
- `signup()` 은 이 함수들을 호출만 한다 — **동작·응답·메일 바이트 동일**(검증 §7-⑧).
- 새 `addBusiness({ user(네이티브 DB 원행), type, name, address, phone, email, plan_id, billing_cycle, currency })`:
  1. 요금제 검증(§3) → 금액 해석 → 트랜잭션.
  2. `restaurant`: `createRestaurantEntity` → `INSERT user_contexts (user_id, 'restaurant', r.id, 'Restaurant Admin', granted_by=user.id)` → 네이티브 Restaurant Owner 면 `restaurant_managers (r.id, user.id, 'ownership')` INSERT → 커밋 → `startTrial(r.id)`.
  3. `brand`: `createBrandEntity({ownerId:user.id,…})` → 커밋 → `createEntitySubscriptionInvoice(brand,'brand',plan,currency,trialEndDate)`.
  4. `foodcourt`: 같은 모양.
  5. `notifyAdminNewSignup({ user, role: 'Restaurant'|'Brand General'|'Foodcourt General', entityName, planName, billingCycle })` — 기존 함수, 문구 변경 0.
  6. 반환 = **새 카드 1장**(`userContexts.listContexts(user)` 에서 그 엔티티를 찾아 돌려준다 — 프론트 강조용) + `{ id, name, type }`.

### 5.2 `routes/auth.js` — `POST /businesses`
`authenticateToken` → 네이티브 원행 재조회(투영본 아님, `/contexts` 와 같은 이유) → §3 거부 조건 → `signupLimiter` → `authService.addBusiness` → `successResponse(res, { context, business }, 'Business added', 201)`. 에러 매핑은 `/signup` 과 같은 분기(not available → 400 등).

### 5.3 `services/userContexts.js` — 파생 카드 2종 (§5.4 오너 모자와 같은 결)
- 상수 `BRAND_OWNER_HAT = { entity_type:'brand', role:'Brand General' }` · `FOODCOURT_OWNER_HAT = { entity_type:'foodcourt', role:'Foodcourt General' }` + `isBrandOwnerHat`/`isFoodcourtOwnerHat`.
- `listOwnedBrands(uid)` = `SELECT id, name, status FROM brands WHERE owner_id=:uid ORDER BY name` · `listOwnedFoodcourts(uid)` 동형.
- `listContexts`: 브랜드 관리자 모자 블록 뒤에 — 소유 브랜드마다 `{kind:'granted', id:null, entity_type:'brand', entity_id, role:'Brand General', label: name}`; **`user.role ∈ {Brand General, Brand Manager} && Number(user.brand_id) === id` 는 건너뛴다**. 푸드코트 동형(`Foodcourt General/Manager` + `foodcourt_id`).
- `validateGrantedContext` / `getGrantedContextForSwitch`: 오너 분기 아래에 `isBrandOwnerHat → SELECT 1 FROM brands WHERE id=:e AND owner_id=:uid` · 푸드코트 동형. switch 응답 `name/status` 는 그 표의 값.
- exports 추가. **§5.2 의 금지(「소유자 BG 모자는 투영 불가」)는 남의 브랜드에 대한 부여를 두고 한 말** — 소유 칸에서 파생되는 카드는 그 판정이 전제한 `owner_id === user.id` 를 **만족**한다. 문서 §5.6 으로 명시.

### 5.4 투영 — `middleware/auth.js projectContext` · `routes/auth.js /switch-context`
- `restaurant_id: ctx.t === 'restaurant' ? ctx.id : null` · `brand_id: ctx.t === 'brand' ? ctx.id : null` · **`foodcourt_id: ctx.t === 'foodcourt' ? ctx.id : null`**(지금은 항상 null — 한 줄) · `permissions: (ctx.t === 'brand' && ctx.r === 'Brand Manager') ? BRAND_MANAGER_HAT_PERMISSIONS : []`(BG 는 키가 필요 없다 — 지금 조건은 `ctx.t === 'brand'` 라 BG 카드에도 BM 키가 붙는다 → 조건을 역할까지로).
- switch-context 토큰 claim·응답 user 도 같은 세 줄. 기존 RA·오너·BM 모자의 값은 **바이트 동일**이어야 한다(38/38 이 증거).
- 소켓(`socketService`)은 `validateGrantedContext` 공유 — 변경 0, 테스트로만.

### 5.5 인스펙션 `scripts/inspection/suites/user-contexts.js`
- v1 의 UC-005/006(요청 표) **삭제**.
- 새 UC-005 「셀프 부여 매장 모자는 자기가 만든 매장만」: `SELECT COUNT(*) FROM user_contexts uc JOIN restaurants r ON r.id=uc.entity_id WHERE uc.granted_by = uc.user_id AND (r.admin_id IS NULL OR r.admin_id <> uc.user_id)` = 0.

### 5.6 health-check
- v1 의 context-requests 3건 **삭제**. 추가: 익명 `POST /auth/businesses` 401 · 데모 RA 토큰 → 403 · SA 토큰 → 403.

---

## 6. 화면

### 6.1 선택 화면 `pages/ContextSelect/ContextSelectPage.tsx`
- 리스트 **맨 아래** 「+ 사업 추가」 카드 — 기존 `Card`(공용 Button 확장) 를 확장해 점선 테두리·가운데 정렬. `user.role === 'System Admin'` 또는 `user.isDemo` 면 렌더 안 함. 클릭 → `/pos/select-context/add`.
- 복귀 시 `location.state.added`(contextKey) 가 있으면 그 카드 테두리 primary 강조 + 리스트 아래 한 줄 `context.add.done`. 목록은 진입 때 `refreshContexts()` 가 이미 다시 읽는다.
- `FooterHint` 문구 교체: 「다른 사람의 매장·브랜드 권한은 시스템 관리자가 부여합니다.」
- 글리프: `entity_type === 'foodcourt' ? '≡'` 추가(기하 글리프 집합 안).

### 6.2 새 페이지 `pages/ContextSelect/AddBusinessPage.tsx` — 라우트 `/pos/select-context/add` (`App.tsx` lazy + `ProtectedRoute`, 기존 `/pos/select-context` 줄 옆)
선택 화면과 같은 가족(가운데 패널, 최대 720px, 터치 44px, RA 표준 · 공용 컴포넌트만 · 로컬 styled.button 금지):
1. **종류** — 3장 카드(▦ 매장 / ◐ 브랜드 / ≡ 푸드코트), 선택 시 테두리 primary. 종류를 바꾸면 요금제 선택 초기화.
2. **정보** — 이름(필수). 매장: 주소·전화·이메일(선택, 가입과 같은 단일 텍스트 칸 — 「더 심플」 원칙상 `AddressFields` 6칸은 쓰지 않는다. 주소는 뒤에 매장 설정에서 정식으로).
3. **요금제** — `/api/public/plans` 에서 `plan_target === type` 카드(이름·월/연 가격·features 몇 줄), 월/연 토글(공용 Button 둘), 통화 `SelectComponents`(`/api/currencies/supported`, 기본 MYR). 아래 고정 문구: 0원이면 「무료 요금제 — 체험 없이 바로 이용」, 아니면 「7일 무료 체험 · 지금 결제하지 않습니다」.
4. 푸터 [취소](secondary → 선택 화면) [추가하기](primary, 이름·요금제 없으면 disabled, 공용 async 가드). 실패는 서버 message 그대로(직접 fetch — `fetchAPI` 는 본문을 버린다).
5. 성공 → `navigate('/pos/select-context', { replace:true, state:{ added: contextKey(context) } })`.

### 6.3 입구 상시화 (🔒 MainLayout 무접촉 — 부품 안 조건만)
- `components/Layout/HeaderContextSwitcher.tsx:159` `contexts.length < 2 → null` ⇒ `!user || user.role === 'System Admin' → null`. 라벨 = 현재 카드 라벨(없으면 기본 카드/프로필 이름).
- 현재 카드 판정에 BG/FG 파생 카드 추가: `user.role === 'Brand General' && granted brand && entity_id === user.brand_id` · `Foodcourt General` 동형.
- `components/ContextSwitchQuickAction.tsx:33` 같은 규칙.
- `check-print-guard.js` 변경 0 이어야 함.

### 6.4 i18n `auth.json` 4언어 `context.add.*`
| 키 | en | ko |
|---|---|---|
| add.button | Add a store, brand or food court | 사업 추가 |
| add.title | Add to your account | 내 계정에 사업 추가 |
| add.subtitle | Same as signing up — just without creating another account. | 처음 가입과 같습니다. 계정만 새로 만들지 않습니다. |
| add.type | What are you adding? | 무엇을 추가하나요? |
| add.typeRestaurant / typeBrand / typeFoodcourt | Store / Brand / Food court | 매장 / 브랜드 / 푸드코트 |
| add.name | Name | 이름 |
| add.address / phone / email | Address (optional) / Phone (optional) / Email (optional) | 주소 (선택) / 전화 (선택) / 이메일 (선택) |
| add.plan | Plan | 요금제 |
| add.monthly / annual | Monthly / Annual | 월간 / 연간 |
| add.currency | Currency | 통화 |
| add.trialNote | 7-day free trial · no payment now | 7일 무료 체험 · 지금 결제하지 않습니다 |
| add.freeNote | Free plan · starts right away, no trial | 무료 요금제 · 체험 없이 바로 이용 |
| add.submit | Add | 추가하기 |
| add.cancel | Cancel | 취소 |
| add.failed | Could not add. | 추가할 수 없습니다. |
| add.done | {{name}} was added. Tap the card to enter. | {{name}} 추가됐습니다. 카드를 눌러 들어가세요. |
| select.grantHint(교체) | Access to someone else's store or brand is granted by a system administrator. | 다른 사람의 매장·브랜드 권한은 시스템 관리자가 부여합니다. |
zh·ms 는 팀원이 같은 뜻으로. `npm run i18n:verify`.

---

## 7. 테스트 — `tests/add-business.test.js` 신설 (dev · 임시 **비데모** 사용자 3명을 만들고 afterAll 전량 삭제: users · restaurants · brands · foodcourts · user_contexts · restaurant_managers · **생성된 구독 인보이스**)
① 임시 RA(u1) `POST /auth/businesses {restaurant, 유료 plan}` → 201 · `restaurants.admin_id=u1`·status 'trial'·trial_end_date ≈ +7일·plan_type 일치 · `user_contexts` 1행(granted_by=u1) · `GET /auth/contexts` 에 ▦ 카드 · 전환 200 → `restaurant_id` = 새 매장 · 그 매장 라우트 200(예 `GET /api/restaurants/:id`) · 다른 매장 403.
② `buyer_free`(0원) → status 'active' · trial_end_date null.
③ u1 `{brand}` → `brands.owner_id=u1` · subscription_status 'trial' · ◐ 카드(role 'Brand General') · 전환 → `role='Brand General'`, `brand_id`=새 브랜드, `permissions=[]` · `GET /api/brands` 에 그 브랜드 · `GET /api/brand-menus?brand_id=새` 200 · 남의 브랜드(dev 10) 403/404 · 전환 상태에서 u1 네이티브 매장 라우트 403(교체).
④ 임시 BG(u2, `users.brand_id`=X 소유) `{brand}` Y → 카드는 **Y 하나**(X 없음) · 전환 → `brand_id=Y` · 사이드바 쪽 `/auth/me` 투영 동일.
⑤ u1 `{foodcourt}` → `foodcourts.owner_id=u1` · ≡ 카드 · 전환 → `foodcourt_id`=새, restaurant/brand null · FG 대시보드 API 1개 200(팀원이 라우트 선택) · 남의 푸드코트 403.
⑥ 거부: `type:'owner'`·`'supplier'` 400 · plan_target 불일치 400 · 비활성 plan 400 · SA 403 · 데모 RA 403 · 익명 401 · 24h 4번째 429.
⑦ 위조 ctx `{t:'brand', id:남의 브랜드, r:'Brand General'}` → `/me` 200 + `X-Context-Fallback` (401 아님) · brand-menus 403. 푸드코트 동형. 소켓: 소유 브랜드 ctx 토큰 연결 OK · 소유 이전(owner_id 변경) 뒤 거부.
⑧ **가입 무회귀**: `authService.signup` 을 Restaurant Admin·Brand General·Foodcourt General 3종으로 jest 안에서 직접 호출(이메일은 `isAutomatedTestSignup` 패턴 + MX 통과 도메인 — 기존 가입 테스트가 있으면 그것을 돌린다) → 만들어진 행의 컬럼이 리팩터 전과 같은지(status·plan_type·plan_amount·trial_end_date·owner_id/admin_id) 단언 · 끝나면 삭제.
⑨ 기존 `user-contexts-switch.test.js` 38건 그대로.
- 고장주입(assert 필수, 결과 기록): **FI-16** `validateGrantedContext` 의 브랜드 소유 조건(`owner_id=:uid`)을 임시 제거 → ⑦ 이 **실패**해야 함, 원복. **FI-17** 셀프 행을 SQL 로 남의 매장(admin_id≠user) 에 INSERT → 인스펙션 UC-005 **실패** 확인 → 행 삭제·재실행 통과. **FI-18** `projectContext` 의 `foodcourt_id` 줄을 다시 null 로 → ⑤ 가 실패해야 함, 원복.

---

## 8. 첫 문장 「선택했는데도 적용 안 됨」 — 사실 확인 1건(읽기만, 변경 아님)
- 다른 읽기: SA 화면에서 help@(23)에 K-DINE IPC(8) **오너**를 주려 했다면 매장 8 의 oversight 행 때문에 **409** `User is already assigned to this restaurant as a manager (oversight)`.
- 팀원: 운영 nginx access log 에서 오늘 `POST /api/users/23/contexts` 상태코드 1회 grep → 보고. 409 면 그 사실만 Irene 에게. 자동 승격은 브랜드 쪽이 oversight 행을 읽는 코드를 실측해야 결정 — 별건.

---

## 9. v1(승인 모델) 산출물 처리 — 팀원이 보고한 목록 기준
**삭제**: `models/UserContextRequest.js` · `routes/context-requests.js` · `scripts/migrate-user-context-requests.js` · `tests/context-requests.test.js` · `server.js` 의 `/api/context-requests` 마운트 2줄 · `models/index.js` 의 UserContextRequest require/association/export · `scripts/migrations.registry.json` 의 `migrate-user-context-requests.js` · `routes/notification-settings.js` 카테고리 2개(`context_request_received`·`context_request_result`) · `utils/notificationTemplates.js` 의 그 템플릿 · `locales/*/email.json` 의 그 키 · 인스펙션 UC-005/006(요청 표) · health-check 의 context-requests 3건. dev DB: `DROP TABLE IF EXISTS user_context_requests`(dev 만).
**유지**: `services/userContexts.js` 의 `grantContext`·`GRANTABLE_COMBINATIONS`·`isGrantableCombination`·`isOwnerGrantCombination`·`loadGrantEntity`·`alreadyHoldsContext`·`nativeHoldConflict` · 얇아진 `routes/users.js`(38/38 통과가 증거). `/mine` 의 `requestable/can_request` 같은 승인 전용 응답 칸은 라우트와 함께 사라진다.
삭제 뒤 `git status` 로 신설 파일 0 · 수정 파일이 §5 목록과 일치하는지 확인해 보고에 첨부.

---

## 10. 검증 순서 (빌드 1회 · sweep 1회)
1. §9 제거 → §5 백엔드 확정 → `pm2 restart dev-backend` → `npx jest tests/add-business.test.js tests/user-contexts-switch.test.js` → `node scripts/health-check.js` → 인스펙션(UC-005) → FI-16·17·18.
2. §6 프론트 전부 확정 → `npm run i18n:verify` → SW 는 마지막(운영 5.80, 워킹트리 5.81 하나로 충분 — 접미사 팀원 판단) → `npm run build:dev` 1회 → `node scripts/verify-all.js --full` 1회(print-guard 변경 0 · design-guard · mount sweep).
3. 실브라우저(dev, 임시 비데모 RA 계정 — 데모는 403): ⒜ 로그인 → 사이드바 하단 `◐ 이름 ▾` 보임(모자 0개) → 선택 화면 → 맨 아래 「+ 사업 추가」 → 브랜드 · 이름 · 요금제 · 월간 → 추가 → 선택 화면에 ◐ 카드 강조 + 완료 문구 → 카드 클릭 → 브랜드 대시보드 · 사이드바 Brand Menus · 스위처 제목 = 브랜드명 → 본래 정체 복귀. ⒝ 같은 계정으로 매장 추가(유료) → ▦ 카드 → 전환 → 매장 대시보드에 체험 배지/상태 → 복귀. ⒞ SA 계정 선택 화면·사이드바에 입구 **없음**. ⒟ 390 폭에서 추가 페이지 3단 세로 배치·가로 스크롤 0. console.error 0. **끝나면 만든 사업·행·인보이스 삭제.**
4. §8 운영 로그 읽기 결과 첨부.
5. `node scripts/check-sensitive-diff.js` → 묶음 전체(단말기 Void·직원 발주 + 오너 모자 + 이 기능) 게이트 요청 1회(사실만: diff 파일 목록 · 테스트 수 · FI 결과 · sweep 결과 · 확인 불가 항목).

## 11. 배포·롤백
마이그 없음 · 운영 쓰기 없음. 롤백 = 이전 번들+백엔드 복원. 배포 뒤 Irene 확인 1회: help@ 선택 화면 맨 아래 「+ 사업 추가」 보임(실제 추가는 Irene 판단 — 추가하면 운영에 체험 사업 1개가 생긴다).

## 12. 문서 (새 파일 0)
`docs/MULTI_CONTEXT_LOGIN_DESIGN.md`: §5.2 머리 배너에 「소유 칸 파생 BG/FG 카드는 §5.6」 · **§5.6 브랜드/푸드코트 소유자 카드(파생, v1.3)** · **§6.4 사업 추가(가입과 같은 흐름·승인 없음·셀프 행 봉인 보정)** · §8-3 한 줄 보정 · Q3 끝 「v1.3: 자기가 만든 사업은 자기 카드(승인 없음). 남의 사업 자격은 여전히 SA」 · §6.2 「스위처·퀵액션은 SA 외 상시 표시」. 메모리·session-state·DEVELOPMENT_PLAN 은 게이트 뒤.

## 하지 말 것
승인 흐름 부활 · 클라이언트가 보낸 entity_id 로 user_contexts INSERT · 오너/공급업체 추가 · `brandIdsForUser` 에 형제 브랜드 추가 · `router.use(auth)` · 🔒 보호파일/KDS 접촉 · 운영 쓰기 · 빌드 2회 · 구현 중 세부 되묻기(결정해서 결과에 붙인다, 앵커 불일치만 중단·보고).
