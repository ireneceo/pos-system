# Restaurant Owner 역할 추가 - 개발 기획

## Context

### 왜 필요한가
현재 시스템에서 레스토랑 소유자(실제 사업주)는 Restaurant Admin 역할로 매장 1개만 관리한다. 하지만 실제로는 한 사업주가 여러 매장을 소유하면서 **재무/통계/회계 업무**를 통합 관리해야 하는 니즈가 있다. Brand General은 프랜차이즈 본사, Foodcourt General은 입점 관리자이므로, "독립적으로 여러 레스토랑을 소유한 사업주"를 위한 역할이 비어 있다.

### 핵심 원칙
- **Owner = 소유자 (재무/통계)**, **Admin = 현장 운영자 (메뉴/주문/직원)**
- 한 레스토랑에 Owner와 Admin이 **공존** (Owner는 N개 레스토랑, Admin은 1개 레스토랑)
- Brand/Foodcourt 소속 여부와 **무관하게** 레스토랑 소유 가능
- System Admin만 Owner 계정 생성 및 레스토랑 연결

### 역할 계층 (변경 후)
```
System Admin (플랫폼 전체)
├── Brand General (브랜드 운영)
│   └── Brand Manager
├── Foodcourt General (푸드코트 운영)
│   └── Foodcourt Manager
├── Restaurant Owner ← NEW (여러 레스토랑 소유, 재무/통계)
└── Restaurant Admin (레스토랑 1개 현장 운영)
    └── Staff
```

---

## DB 설계

### 1. User.js - role ENUM 확장
```
기존: 'System Admin', 'Brand General', 'Foodcourt General', 'Brand Manager', 'Foodcourt Manager', 'Restaurant Admin', 'Staff'
추가: 'Restaurant Owner'
```

### 2. restaurant_managers 테이블 - relationship_type 컬럼 추가
기존 junction table 재사용 (Brand/Foodcourt General의 감독 관계와 동일 패턴)

```sql
ALTER TABLE restaurant_managers
ADD COLUMN relationship_type ENUM('oversight', 'ownership') DEFAULT 'oversight' AFTER is_primary;
```

- `oversight`: 기존 Brand/Foodcourt General/Manager의 감독 관계
- `ownership`: Restaurant Owner의 소유 관계

**왜 별도 테이블이 아닌 기존 테이블 확장?**
- checkRestaurantAccess 미들웨어가 이미 restaurant_managers를 조회하는 구조
- 기존 코드 변경 최소화 + N:M 관계 동일 패턴

### 3. restaurants 테이블 - payment_model ENUM 확장
```
기존: 'restaurant', 'brand_manager', 'foodcourt_manager'
추가: 'restaurant_owner'
```

### 4. invoices 테이블 - payer_type ENUM 확장
```
기존: 'restaurant', 'brand_manager', 'foodcourt_manager'
추가: 'restaurant_owner'
```

---

## 권한 설계

### Restaurant Owner가 할 수 있는 것
| 기능 | 접근 | 비고 |
|------|------|------|
| 소유 레스토랑 목록 조회 | ✅ | 통합 대시보드 |
| 레스토랑별 매출 통계 | ✅ | 일/월/연 매출, 주문 건수 |
| 레스토랑 간 비교 통계 | ✅ | 매장 간 성과 비교 |
| 인보이스 조회 | ✅ | 모든 issuer 인보이스 확인 |
| 인보이스 결제 | ✅ | payment_model='restaurant_owner'일 때 |
| 리포트/분석 | ✅ | 종합 리포트 |
| 주문 내역 조회 | ✅ | 읽기 전용 |

### Restaurant Owner가 할 수 없는 것
| 기능 | 접근 | 담당 |
|------|------|------|
| 메뉴 관리 | ❌ | Restaurant Admin |
| 주문 처리 (접수/완료) | ❌ | Restaurant Admin / Staff |
| 직원(Staff) 관리 | ❌ | Restaurant Admin |
| POS 터미널 | ❌ | Restaurant Admin / Staff |
| 레스토랑 설정 변경 | ❌ | Restaurant Admin |
| 레시피/재료 관리 | ❌ | Restaurant Admin |

### Brand/Foodcourt 소속 레스토랑의 Owner
- Owner는 Brand/Foodcourt와 **독립적** (동시 존재 가능)
- Owner가 있다고 Brand General의 감독 권한이 변하지 않음
- 인보이스: System Admin + Brand + Foodcourt 각각 발행 → Owner가 결제

---

## 백엔드 변경

### Phase 1: DB + 역할 기본

#### 1-1. User.js ENUM 확장
- `dev-backend/models/User.js`: role ENUM에 'Restaurant Owner' 추가

#### 1-2. RestaurantManager.js 컬럼 추가
- `dev-backend/models/RestaurantManager.js`: relationship_type ENUM 추가
- sync-database.js 실행으로 ALTER TABLE 자동 적용

#### 1-3. Restaurant.js payment_model 확장
- `dev-backend/models/Restaurant.js`: payment_model ENUM에 'restaurant_owner' 추가

#### 1-4. Invoice.js payer_type 확장
- `dev-backend/models/Invoice.js`: payer_type ENUM에 'restaurant_owner' 추가

#### 1-5. auth.js 미들웨어 수정
- `dev-backend/middleware/auth.js`: checkRestaurantAccess에 Restaurant Owner 분기 추가
```javascript
// Restaurant Owner: restaurant_managers에서 relationship_type='ownership'으로 연결된 레스토랑 접근
if (req.user.role === 'Restaurant Owner') {
  const ownership = await RestaurantManager.findOne({
    where: { restaurant_id: targetRestaurantId, manager_id: req.user.id, relationship_type: 'ownership' }
  });
  if (!ownership) return 403;
  return next();
}
```

#### 1-6. owner.js 신규 라우트
- `dev-backend/routes/owner.js`: Owner 전용 API
  - `GET /api/owner/restaurants` - 소유 레스토랑 목록 (restaurant_managers.relationship_type='ownership')
  - `POST /api/owner/restaurants/:restaurantId/link` - 레스토랑 연결 (System Admin만)
  - `DELETE /api/owner/restaurants/:restaurantId/unlink` - 레스토랑 연결 해제 (System Admin만)

#### 1-7. server.js 라우트 등록
- `dev-backend/server.js`: `/api/owner` 라우트 등록

#### 1-8. users.js 수정
- `dev-backend/routes/users.js`: Owner 계정 생성 지원 (System Admin → Restaurant Owner 역할 부여)

### Phase 2: 대시보드 + 통계 + 인보이스

#### 2-1. owner.js 통계 API 추가
- `GET /api/owner/dashboard` - 소유 레스토랑 통합 대시보드 (총매출, 총주문, 레스토랑별 요약)
- `GET /api/owner/restaurants/:restaurantId/stats` - 레스토랑별 상세 통계 (기존 dashboard API 재사용)
- `GET /api/owner/restaurants/:restaurantId/orders` - 주문 내역 조회 (읽기 전용)
- `GET /api/owner/statistics/compare` - 레스토랑 간 비교 통계

#### 2-2. invoices.js 수정
- `dev-backend/routes/invoices.js`:
  - GET /api/invoices: Restaurant Owner 필터 추가 (소유 레스토랑들의 인보이스)
  - GET /api/invoices/to-pay: Restaurant Owner의 결제 대상 인보이스
  - checkPaymentPermission: Restaurant Owner 분기 추가
  - POST /api/invoices/:id/submit-payment: Owner 결제 허용

#### 2-3. invoiceScheduler.js 수정
- `dev-backend/services/invoiceScheduler.js`: payment_model='restaurant_owner' 처리

#### 2-4. restaurants.js 수정
- `dev-backend/routes/restaurants.js`: GET /api/restaurants에서 Restaurant Owner 필터

#### 2-5. Admin 페이지 수정
- System Admin이 레스토랑 편집 시 Restaurant Owner 연결/해제 UI
- Admin의 RestaurantsPage / ManagersPage에 Owner 정보 표시

---

## 프론트엔드 변경

### Phase 1: 라우팅 + 인증 기본

#### F1-1. AuthContext.tsx
- UserRole에 'Restaurant Owner' 추가
- ROLE_PERMISSIONS에 Owner 권한 정의
- ROLE_ROUTES에 Owner 경로 정의

#### F1-2. App.tsx
- POS Root Redirect: Restaurant Owner → `/pos/owner/dashboard`
- Owner 전용 라우트 등록: `/pos/owner/*`

#### F1-3. MainLayout.tsx
- Restaurant Owner 전용 사이드바 메뉴:
  - Dashboard (통합 대시보드)
  - My Restaurants (소유 레스토랑 목록)
  - Statistics (비교 통계)
  - Orders (주문 내역 - 읽기 전용)
  - Reports (리포트)
  - Invoices (인보이스 결제)
  - Profile / Settings

#### F1-4. LoginPage.tsx
- 로그인 후 Owner 리다이렉트 처리

### Phase 2: 페이지 개발

#### F2-1. OwnerDashboardPage.tsx
- 통합 KPI 카드: 총 레스토랑 수, 오늘 매출, 월 매출, 미결제 인보이스
- 레스토랑별 성과 카드 (매출/주문 수 요약)
- 최근 인보이스 리스트

#### F2-2. OwnerRestaurantsPage.tsx
- 소유 레스토랑 카드 목록
- 각 카드: 레스토랑명, Admin 정보, 오늘/월 매출, 상태
- 클릭 → 레스토랑 상세 통계 drill-down

#### F2-3. OwnerStatisticsPage.tsx
- 레스토랑 간 매출 비교 차트 (Bar/Line)
- 기간 필터 (일/주/월/연)
- 레스토랑 선택 필터

#### F2-4. OwnerOrdersPage.tsx
- 레스토랑 선택 드롭다운
- 주문 내역 테이블 (읽기 전용)
- 기간/상태 필터

#### F2-5. OwnerReportsPage.tsx
- 종합 리포트 (매출 추이, 카테고리별 분석)
- 레스토랑별 또는 통합 선택

#### F2-6. OwnerInvoicesPage.tsx
- 레스토랑별 인보이스 목록
- 상태별 필터 (pending, paid, overdue)
- 결제 제출 (submit-payment) 기능
- PDF 다운로드

### Phase 2-Admin: System Admin 관리 UI

#### F2-A1. Admin RestaurantsPage 수정
- Add/Edit 모달에 Restaurant Owner 연결 섹션 추가
- Owner 선택 드롭다운 (기존 Admin 선택과 유사)

#### F2-A2. Admin ManagersPage 수정
- Restaurant Owner 역할 표시
- Owner 생성/편집 지원
- 소유 레스토랑 목록 표시

---

## Phase 분리 및 우선순위

### Phase 1: DB + 역할 기본 (백엔드 중심)
**목표**: Restaurant Owner 역할이 시스템에 존재하고, 레스토랑 연결이 가능한 상태

| # | 작업 | 파일 |
|---|------|------|
| 1-1 | User.js role ENUM 확장 | models/User.js |
| 1-2 | RestaurantManager.js relationship_type 추가 | models/RestaurantManager.js |
| 1-3 | Restaurant.js payment_model 확장 | models/Restaurant.js |
| 1-4 | Invoice.js payer_type 확장 | models/Invoice.js |
| 1-5 | auth.js Owner 권한 체크 | middleware/auth.js |
| 1-6 | owner.js 라우트 (레스토랑 연결 CRUD) | routes/owner.js (신규) |
| 1-7 | server.js 라우트 등록 | server.js |
| 1-8 | users.js Owner 계정 생성 | routes/users.js |
| 1-9 | DB sync + PM2 restart | sync-database.js |
| F1-1 | AuthContext Owner 정의 | contexts/AuthContext.tsx |
| F1-2 | App.tsx 라우팅 | App.tsx |
| F1-3 | MainLayout 사이드바 | MainLayout.tsx |
| F1-4 | LoginPage 리다이렉트 | LoginPage.tsx |

### Phase 2: 대시보드 + 통계 + 인보이스 (풀 기능)
**목표**: Owner가 실제로 사용 가능한 완전한 기능

| # | 작업 | 파일 |
|---|------|------|
| 2-1 | 통합 대시보드 API | routes/owner.js |
| 2-2 | 인보이스 권한 확장 | routes/invoices.js |
| 2-3 | 스케줄러 payer_type 처리 | services/invoiceScheduler.js |
| 2-4 | 레스토랑 필터 확장 | routes/restaurants.js |
| F2-1 | OwnerDashboardPage | pages/Owner/OwnerDashboardPage.tsx (신규) |
| F2-2 | OwnerRestaurantsPage | pages/Owner/OwnerRestaurantsPage.tsx (신규) |
| F2-3 | OwnerStatisticsPage | pages/Owner/OwnerStatisticsPage.tsx (신규) |
| F2-4 | OwnerOrdersPage | pages/Owner/OwnerOrdersPage.tsx (신규) |
| F2-5 | OwnerReportsPage | pages/Owner/OwnerReportsPage.tsx (신규) |
| F2-6 | OwnerInvoicesPage | pages/Owner/OwnerInvoicesPage.tsx (신규) |
| F2-A | Admin 페이지 Owner 연결 UI | pages/Admin/* |

### Phase 3: 향후 확장 (발주 승인 등) - 이번 개발 범위 아님
- Purchase Order 시스템 구축 시 Owner 승인 워크플로우 추가
- Owner → Admin 발주 승인/거부 기능
- 레스토랑별 발주 설정 (Owner 승인 필요 여부)

---

## 검증 방법

### 백엔드 검증
1. DB sync 후 restaurant_managers.relationship_type 컬럼 존재 확인
2. curl로 Owner 계정 생성 → 레스토랑 연결 → 통계 API 호출
3. 인보이스 결제 플로우 (submit-payment → confirm) 테스트
4. checkRestaurantAccess가 ownership 관계만 허용하는지 확인

### 프론트엔드 검증
1. Owner 로그인 → /pos/owner/dashboard 리다이렉트
2. 소유 레스토랑 목록 표시
3. 레스토랑별 통계 drill-down
4. 인보이스 조회 및 결제 제출
5. 메뉴/POS/직원 관리 메뉴가 보이지 않는지 확인
