# 데모/테스트 계정 관리 가이드

> **최종 업데이트:** 2026-08-20
> **목적:** 데모/테스트 계정이 실제 매출 통계에 영향을 주지 않도록 관리

## 2026-05-03 업데이트 — 5 데모 역할 + demo-login endpoint + enterprise fallback

### 5 데모 계정 (DEMO_KEY_TO_EMAIL — `services/authService.js`)

| key | email | role | 표시명 |
|-----|-------|------|------|
| `demo_restaurant_admin` | demo-restaurant@purplehere.com | Restaurant Admin | Restaurant Admin |
| `demo_brand_general`    | demo-brand@purplehere.com    | Brand General    | Brand General |
| `demo_foodcourt_general`| demo-foodcourt@purplehere.com| Foodcourt General | Foodcourt General |
| `demo_multi_owner`      | demo-owner@purplehere.com    | Restaurant Owner | **Multi-Restaurant Owner** (display) |
| `demo_supplier_admin`   | demo-supplier@purplehere.com | Supplier Admin   | Supplier Admin |

순서: Restaurant → Brand → Foodcourt → Multi-Owner → Supplier (Login/Demo 카드 정합).

### demo-login endpoint — 번들 password 0건

`POST /api/auth/demo-login { key }` — 비밀번호 없이 quick login.

- 화이트리스트 매핑 (`DEMO_KEY_TO_EMAIL`) — 알 수 없는 key → 400 INVALID_DEMO_KEY
- 가드 ①(계정): 매핑된 user 의 `is_demo === true` OR `is_test === true` 만 토큰 발급. 그 외 → 403 NOT_DEMO_ACCOUNT
- 가드 ②(매장, 2026-08-20 추가 · **판정의 본체**): 그 계정이 **닿을 수 있는 매장** 중 하나라도 `is_demo` 가 아니면 → 403 NOT_DEMO_RESTAURANT
- Rate limit 30/min
- 결과: LoginPage / DemoPage 의 카드 클릭 시 password 코드가 main.js 에 0 file 노출

## 🔒 데모 계정은 항상 **미인증**이다 (2026-09-06)

데모 계정(`users.is_demo = 1`)은 **실재하는 메일함이 없다** — 인증 링크를 누를 수가 없다.
따라서 `email_verified` 는 **항상 0** 이어야 하고, 배포 마이그
`scripts/migrate-demo-accounts-unverified.js` 가 매 배포마다 이를 보증한다(멱등).
데모 시드(`seed-demo-data.js`)도 `email_verified: false` 로 고정한다.

**왜 중요한가**: 2026-09-06 이전 `demo-brand@purplehere.com` 에 `email_verified=1` 이 박혀 있어
알림 메일이 계속 나갔고, Gmail 반송("Address not found")이 관리자에게 쏟아졌다.
발송 관문 자체는 멀쩡했다 — **플래그가 거짓말한 것**이다.

⚠ **미인증이어도 로그인은 된다**(백엔드에 `EMAIL_NOT_VERIFIED` 를 던지는 코드 없음) —
데모 로그인은 영향받지 않는다. 미인증은 **알림 메일 미수신 + 화면 안내 배너**만 뜻한다.

⛔ **인증 플래그를 링크 클릭 없이 세우는 뒷문은 폐쇄됐다**(2026-09-06):
`POST /api/users` 의 `skip_verification` 옵션 · Supplier Staff 생성의 `email_verified: true // trusted`.
둘 다 이제 항상 미인증으로 만들고 인증메일을 보낸다.

---

## 2026-08-20 업데이트 — 판정 기준이 계정이 아니라 **매장**이다 (v3.76)

### 왜 바뀌었나 (운영 실측)

운영 로그인 페이지의 `test_restaurant_admin`(admin@kdine.com) 카드는 **`is_test=1`** 이라 계정 가드를 통과했는데, 그 계정은 **rid 5 The Fire Korean Restaurant** 의 Restaurant Admin 이었다 — 주문 335건·결제 107건·RM4,183 의 **실고객 매장**. 즉 계정에 "테스트" 딱지가 붙어 있어도 **닿는 매장이 실매장이면 실매장 권한이 열린다.** 같은 뿌리의 사고가 이전에도 있었다(배포 스모크가 실매장에 주문을 만들던 건 — 판정을 계정 `is_test` 로 했기 때문).

### 닿는 매장(superset) — `utils/demoReachableRestaurants.js`

`middleware/auth.js` 의 `userCanAccessRestaurant` 부여 경로를 **역할·관계유형 구분 없이 합친 집합**이다. 실판정보다 넓다 — fail-closed 가드는 과차단이 안전하고 미차단이 결함이기 때문. (좁게 잡았다가 실제 부여 테이블 `restaurant_managers` 를 빠뜨려 구멍이 남았던 전례가 있다.)

1. `users.restaurant_id`
2. `restaurants.admin_id`
3. `restaurant_managers.manager_id` (관계유형 무관 — ownership/oversight 모두)
4. `brands.owner_id` 경유 브랜드 산하 매장 / `users.brand_id` 스코프
5. `foodcourts.owner_id` 경유 푸드코트 산하 매장 / `users.foodcourt_id` 스코프
6. `user_contexts` 부여(entity_type='restaurant')

이 집합은 **로그인 가드와 health-check 영구 계약이 공유**한다. 각자 쿼리를 들면 한쪽만 고쳐져 "검사는 통과하는데 구멍은 열린" 상태가 만들어진다.

### 영구 계약 (health-check security)

> "demo-login 이 200 을 내주는 모든 키에 대해, 닿는 매장에 `is_demo=0` 이 0건"

코드가 아니라 **데이터**가 무너뜨리는 종류의 사고다(계정에 매장 부여가 새로 생기면 즉시 재발) → 1회 고장주입이 아니라 상시 검사.

### 운영 TEST 카드는 노출하지 않는다

`LoginPage.tsx` 의 TEST 카드 5장은 **dev 호스트(localhost/127.0.0.1/dev.)에서만** 렌더된다. 서버 가드는 운영에서도 이중 방어로 유지된다. 데모 카드 5장은 운영에 그대로 노출된다.

### 데모 매장 라벨 규칙

데모 브랜드/푸드코트 **산하의 쇼케이스 지점**인데 `is_demo` 가 안 붙어 있으면 데모 카드가 죽는다. 라벨 정정은 `scripts/migrate-demo-store-flags.js`(배포 마이그, 멱등)가 하며 **안전조건 3중**을 모두 만족해야 건드린다:
①부모(brand/foodcourt)가 `is_demo=1` ②주문 0건 ③`is_test=1`.
실매장을 데모로 잘못 바꾸면 그 매장이 공개 카드로 열리므로 조건을 좁게 잡았다. (2026-08-20 운영 적용: rid 19·20·21·22·27)

### 데모 계정에 실매장 부여가 남아 있으면 끊는다

가드는 "그 계정으로 못 들어가게" 할 뿐 부여 자체를 지우지 않는다. `scripts/unlink-demo-accounts-from-real-stores.js`(dry-run 기본)가 데모 계정의 실매장 관리행을 정리한다. **주문이 있는 매장의 브랜드/푸드코트 소속은 건드리지 않는다** — 데모 계정 접근을 끊자고 남의 매장 연결을 부수지 않는다.

---

### Enterprise fallback (모든 모듈 활성)

`/api/.../allowed-routes` 엔드포인트가 `is_demo=true` 인 경우 자동으로 최고 plan 사용:

| 역할 | display_name | 모듈 수 |
|------|-------------|--------|
| Restaurant | `Enterprise Plan` | 25 |
| Brand | `Brand Enterprise` | 24 |
| Foodcourt | `Foodcourt Enterprise` | 25 |
| Owner | `Owner Enterprise` | 13 |
| Supplier | `Supplier Advanced` | 13 (실제 최고 — Enterprise 없음) |

헤더 PlanBadge (`components/Layout/PlanBadge.tsx`) 가 우측 상단에 표시.

---

## 1. 핵심 원칙

### 데모 계정 = 실제 매출에서 반드시 제외
- System Admin 대시보드, 인보이스 통계, 매출 리포트에 데모/테스트 데이터가 포함되면 안 됨
- 데모 계정의 POS 기능은 100% 동일하게 동작해야 함 (데모 시연 목적)
- `is_demo` 플래그로 분리 (DB 필터링)

---

## 1-9. 실고객 표시 `is_real_customer` (2026-08-31 신설) — **배포 자동 마킹의 화이트리스트**

매 운영 배포는 `scripts/mark-demo-accounts.js` 를 돌려(`deploy-to-production.sh:582`)
**"명단에 없으면 전부 test"**(deny-by-default) 로 계정·매장·브랜드를 분류한다.
그 명단이 **스크립트 안에 하드코딩된 이름·id 목록**이던 것이 반복 사고의 뿌리였다:

- 2026-06-28 — 매장 축 누락 → `thefire` 매장이 매 배포 test 로 재마킹돼 **공지 미수신**
- 2026-08-31 — 브랜드 축 누락 → 실브랜드 운영자(`K-DINE Brand`·`thefire`)가 매 배포 `is_test=1` 로
  재마킹 → 알림 관문(`notificationService` 1-a2)에서 **조용히 누락**. 실주소(`irene@gitconsulting.group`)인데도.

### 조치 — 명단을 DB 로 옮겼다

| | |
|---|---|
| 컬럼 | `brands.is_real_customer` · `restaurants.is_real_customer` (TINYINT(1) DEFAULT 0) |
| 세우는 곳 | `scripts/migrate-real-customer-flag.js` (registry `deploy`, 멱등 시드) |
| 읽는 곳 | `scripts/mark-demo-accounts.js` — **읽기만 하고 절대 쓰지 않는다** |

🔴 **"읽기만"이 지속성의 근거다.** 1차 시도는 판정 근거를 브랜드의 `is_demo/is_test` 로 삼았는데,
같은 스크립트의 brands 절이 매 실행 그 근거를 지워서 **1회차는 유지, 2회차에 재발**했다(리허설로 적발).

### 두 축은 대칭이다 (2026-08-31 10:03 배포)

`mark-demo-accounts` 의 REAL 절이 **이미 찍힌 `is_test` 를 자동으로 푼다** — 세 축 모두:

1. `REAL_USERNAMES` 화이트리스트 (플랫폼 계정)
2. `restaurant_id IN (is_real_customer=1 매장)`
3. **`brand_id IN (is_real_customer=1 브랜드)` OR 그 브랜드의 `owner_id`** ← 2026-08-31 추가

3번이 없던 동안 브랜드 운영자는 사람이 손으로 고쳐야 했다(Irene: *"배포할 때 운영서버가 알아서 해?"*).
지금은 **새 실고객이 생기면 DB 에서 `is_real_customer=1` 만 세우면 되고, 스크립트는 고치지 않는다.**

⛔ **"test 인 것을 전부 real 로" 같은 넓은 복원은 넣지 않는다** — 진짜 시험 계정에 실메일이 나가는
역방향 사고다. 복원 범위는 위 3축으로만 한정한다.

⛔ **지정 데모/테스트 계정 10개**(`services/authService.js:804` `DEMO_KEY_TO_EMAIL`)의 표시는 건드리지 말 것 —
`is_demo` OR `is_test` 여야 demo-login 가드를 통과한다. 풀면 로그인 페이지 quick-login 이 깨진다.

---

## 2. is_demo / is_test 플래그 체계 (2026-03-18 분리)

### 이원 플래그

| 플래그 | 대상 | 배지 색상 | 구독 탭 | 매일 리셋 | 통계 제외 |
|--------|------|----------|---------|----------|----------|
| `is_demo=true` | DemoPage 전용 계정 (demo-brand, demo-restaurant) | 주황 #F59E0B | 숨김 | O | O |
| `is_test=true` | 테스트 계정 (brand_general, kdine_admin 등) | 보라 #8B5CF6 | 보임 | X | O |

### 적용 대상 테이블

| 테이블 | is_demo | is_test | 설명 |
|--------|---------|---------|------|
| `users` | BOOLEAN DEFAULT false | BOOLEAN DEFAULT false | 유저 |
| `restaurants` | BOOLEAN DEFAULT false | BOOLEAN DEFAULT false | 레스토랑 |
| `brands` | BOOLEAN DEFAULT false | BOOLEAN DEFAULT false | 브랜드 |
| `foodcourts` | BOOLEAN DEFAULT false | BOOLEAN DEFAULT false | 푸드코트 |

### 보호 규칙 (2026-04-03 확장, 2026-04-11 업데이트)

| 보호 | is_demo | is_test |
|------|:---:|:---:|
| 프로필/비밀번호 변경 차단 (demoProtection 미들웨어) | ✅ | ✅ |
| 비밀번호 리셋 API 차단 (reset-password) | ✅ | ✅ |
| 매일 리셋 (demoResetScheduler) | ✅ | ❌ |
| 관리자 공지 이메일 발송 제외 (2026-04-11) | ✅ | ✅ |

**관리자 공지 이메일 제외 상세** (`routes/notices.js`):
- broadcast 4개 target (`all`/`role`/`brand`/`foodcourt`)의 recipient 생성 시 User/Restaurant 양쪽에서 `is_demo=false, is_test=false` 필터 적용
- `select_restaurants`(명시 선택)는 관리자가 의도적으로 데모를 고를 수 있도록 필터 적용하지 않음
- Role=Restaurant Admin/Staff의 경우 소속 레스토랑이 데모면 해당 유저도 제외

### 필터링 범위

| System Admin 페이지 | is_demo=false만 | is_demo 전체 (뱃지 표시) |
|---------------------|:-:|:-:|
| Dashboard 매출/통계 | ✅ | |
| 인보이스 목록 | ✅ (토글로 전체 보기 가능) | |
| 구독 관리 | ✅ | |
| 레스토랑 관리 | | ✅ |
| 유저/매니저 관리 | | ✅ |

---

## 3. 현재 운영 계정 분류 (2026-03-11 기준)

### 실제 계정 (is_demo = false)

| 유형 | Username | 역할 | 연결 엔티티 |
|------|----------|------|------------|
| System Admin | systemadmin (ID:4) | System Admin | - |
| Brand | gitconsulting (ID:23) | Brand General | Brand: with MIN, K-DINE with MIN |
| Restaurant | kdineipc1 (ID:19) | Restaurant Admin | K-DINE IPC Branch (ID:8) |
| Restaurant | withmin1 (ID:22) | Restaurant Admin | with MIN Cafe (ID:10) |
| Restaurant | kdine_admin (ID:9) | Restaurant Admin | ⚠️ **The Fire Korean Restaurant (ID:5) — 실영업 매장** |
| Staff | Moon (ID:28) | Staff | K-DINE IPC Branch (ID:8) |
| Staff | kdine_staff (ID:10) | Staff | ⚠️ The Fire Korean Restaurant (ID:5) — 실영업 매장 |

> 🔒 **rid 5 함정 (2026-07-31 사고)** — 이 표에 "K-Dine Korean Restaurant"로 적혀 있던 **ID 5 는 개명 후
> 실제 영업 중인 고객 매장(The Fire Korean Restaurant)** 이다. 계정 `kdine_admin`(= `admin@kdine.com`,
> demo-login 키 **`test_restaurant_admin`**)에 `is_test=true` 가 붙어 있어 "테스트 계정"처럼 보이지만
> **매장은 실매장**(`restaurants.is_demo=0`).
> 실제로 배포 스모크가 이 키를 써서 **2026-06-04 ~ 07-31 사이 그 매장에 RM1 주문 165건을 만들고 취소**했고,
> 취소가 만드는 **취소 안내표가 그 매장 주방 인쇄 큐에 누적**됐다(autoPrint 를 켰다면 유령 취소표가 나왔다).
> **규칙: 데이터를 쓰는(주문 생성 등) 자동화는 계정의 `is_test` 가 아니라 매장의 `is_demo` 로 판정한다.**
> 주문을 만드는 용도는 **`demo_restaurant_admin`(→ rid 13 Seoul Garden BBQ, `is_demo=1`)** 을 쓸 것.
> 상세 = `DEPLOYMENT.md` 🔒 "스모크는 실매장을 건드리지 않는다".

### 데모/테스트 계정 (is_demo = true)

| 유형 | Username | 역할 | 연결 엔티티 | 용도 |
|------|----------|------|------------|------|
| Admin | admin (ID:1) | System Admin | - | 기존 테스트용 |
| Brand GM | brand_general (ID:6) | Brand General | - | 테스트 |
| Brand GM | demo-brand (ID:24) | Brand General | Brand: K-Taste Group (ID:4) | 로그인 페이지 데모 |
| Brand Mgr | john_manager (ID:2) | Brand Manager | - | 테스트 |
| Brand Mgr | jane_manager (ID:3) | Brand Manager | - | 테스트 |
| Brand Mgr | brand_manager1 (ID:8) | Brand Manager | - | 테스트 |
| Brand GM | K-DINE Brand (ID:11) | Brand General | - | 테스트 |
| FC GM | foodcourt_general (ID:5) | Foodcourt General | - | 테스트 |
| FC Mgr | foodcourt_manager1 (ID:7) | Foodcourt Manager | - | 테스트 |
| FC Mgr | ㅇ (ID:20) | Foodcourt Manager | - | 테스트 |
| Rest Admin | demo-restaurant (ID:25) | Restaurant Admin | Seoul Garden BBQ (ID:13) | 로그인 페이지 데모 |
| Staff | teststaff_kdine (ID:26) | Staff | K-Dine Korean Restaurant (ID:5) | 테스트 |
| Owner | owner_test (ID:27) | Restaurant Owner | Seoul BBQ House, Downtown Pizza, Sunset Cafe | 테스트 |
| Supplier | demo-supplier (ID:227) | Supplier Admin | SupplierCompany: Demo Supplier Co. (ID:20, plan=supplier_advanced) | 로그인 페이지 데모 (2026-04-27 추가) |

### 데모/테스트 레스토랑 (is_demo = true)

| ID | 이름 | 연결된 데모 유저 |
|----|------|-----------------|
| 1 | Seoul BBQ House | owner_test (ownership) |
| 2 | Downtown Pizza | owner_test (ownership) |
| 3 | Sunset Cafe | owner_test (ownership) |
| 4 | Fresh Sushi | - |
| 6 | Sunway Pyramid Foodcourt | foodcourt_general, foodcourt_manager1 |
| 7 | KFC Sunway Pyramid | brand_manager1 |
| 9 | test_lua | jane_manager, foodcourt_general, brand_general, K-DINE Brand |
| 13 | Seoul Garden BBQ | demo-brand, demo-restaurant |
| 14 | Gangnam Noodle House | demo-brand |

### 데모/테스트 브랜드 (is_demo = true)

| ID | 이름 | owner_id |
|----|------|----------|
| 4 | K-Taste Group | demo-brand (ID:24) |

---

## 4. 새 데모 계정 생성 체크리스트

**새 역할의 데모 계정을 추가할 때 아래 항목을 반드시 확인:**

### 4-1. DB 설정
- [ ] `users` 레코드 생성 시 `is_demo = true` 설정
- [ ] 연결된 `restaurants` 레코드에 `is_demo = true` 설정
- [ ] 연결된 `brands` / `foodcourts` 레코드에 `is_demo = true` 설정 (해당 시)
- [ ] `restaurant_managers` junction 레코드 생성 (oversight/ownership)

### 4-2. Seed 스크립트 업데이트
- [ ] `/var/www/dev-backend/seed-demo-data.js` 에 데모 데이터 추가
- [ ] 데모 리셋 스케줄러 반영 확인: `/var/www/dev-backend/services/demoResetScheduler.js`

### 4-3. 프론트엔드 업데이트
- [ ] 로그인 페이지 데모 계정 목록 업데이트: `/var/www/dev-frontend/src/pages/Login/LoginPage.tsx`
- [ ] DemoPage 업데이트 (해당 시): `/var/www/dev-frontend/src/pages/Landing/DemoPage.tsx`

### 4-4. 통계/인보이스 필터 확인
- [ ] Admin Dashboard API에서 `is_demo = false` 필터 적용 확인
- [ ] 인보이스 목록 API에서 `is_demo` 필터 적용 확인
- [ ] 통계/리포트 API에서 `is_demo` 필터 적용 확인
- [ ] 구독 관리 페이지에서 `is_demo` 필터 적용 확인

### 4-5. 검증
- [ ] 데모 계정으로 로그인 → 모든 POS 기능 정상 동작 확인
- [ ] System Admin으로 로그인 → 데모 데이터가 매출/통계에서 제외되는지 확인
- [ ] 인보이스 목록에서 "전체 보기" 토글 시 데모 인보이스도 표시되는지 확인

---

## 5. 역할별 데모 계정 필수 구성

### 각 역할 데모 시 필요한 엔티티

| 데모 역할 | 필수 엔티티 | 비고 |
|-----------|------------|------|
| Brand General | Brand(is_demo) + Restaurant(is_demo) 1~2개 | 인보이스 발행 시연 필요 |
| Foodcourt General | Foodcourt(is_demo) + Restaurant(is_demo) 1~2개 | 인보이스 발행 시연 필요 |
| Restaurant Admin | Restaurant(is_demo) 1개 + Menu/Order 데모 데이터 | POS 시연 필요 |
| Restaurant Owner | Restaurant(is_demo) 2~3개 (ownership) | 비교 통계 시연 필요 |
| Staff | Restaurant(is_demo) 1개 + PIN 4자리 | POS 캐셔 전환 시연 |

### 연쇄 마킹 규칙
```
데모 Brand General 생성 시:
  → User.is_demo = true
  → Brand.is_demo = true
  → 소속 Restaurant.is_demo = true (모두)
  → 해당 레스토랑의 Restaurant Admin.is_demo = true
  → 해당 레스토랑의 Staff.is_demo = true
  → restaurant_managers 레코드 생성
```

---

## 6. API 필터링 패턴 (구현 시 참고)

### Backend (Sequelize)
```javascript
// System Admin 통계/인보이스에서 데모 제외
const where = { ...filters };

// 레스토랑 기반 필터
const restaurantWhere = includeDemo ? {} : { is_demo: false };

// 인보이스 조회
const invoices = await Invoice.findAll({
  include: [{
    model: Restaurant,
    where: restaurantWhere
  }]
});
```

### Frontend (Admin 페이지)
```tsx
// 인보이스/통계 페이지에 토글 추가
const [includeDemo, setIncludeDemo] = useState(false);

// API 호출 시 쿼리 파라미터
fetch(`/api/invoices?includeDemo=${includeDemo}`)
```

---

## 7. 관련 파일

| 파일 | 역할 |
|------|------|
| `/var/www/dev-backend/seed-demo-data.js` | 데모 데이터 시드 스크립트 |
| `/var/www/dev-backend/services/demoResetScheduler.js` | 데모 데이터 자동 리셋 |
| `/var/www/dev-frontend/src/pages/Login/LoginPage.tsx` | 로그인 페이지 데모 계정 표시 |
| `/var/www/dev-frontend/src/pages/Landing/DemoPage.tsx` | 데모 체험 페이지 |
| `/var/www/docs/DEMO_ACCOUNT_GUIDE.md` | 이 문서 |
