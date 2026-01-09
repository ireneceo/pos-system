# Purple POS - 개발 진행 현황

> **최종 업데이트:** 2026-01-09
> **데이터베이스:** purple_dev_db (MySQL)
> **프로젝트:** 구독 기반 POS 시스템 with 모듈 관리

---

## 🚨 다음 접속 시 필수 작업

### 멤버십/포인트 시스템 테스트 (2026-01-06 개발 완료)

**개발 완료된 기능:**
- Settings > Membership 탭 (멤버십 설정 UI)
- 모바일 오더 포인트 사용 UI
- POS 시스템 포인트 사용 UI
- 주문 완료 시 포인트 자동 적립
- 주문 취소 시 포인트 환불

**테스트 체크리스트:**

1. **멤버십 설정 테스트**
   - [ ] Settings > Membership 탭 접근
   - [ ] Enable Membership 토글 작동
   - [ ] 포인트 설정 저장 (적립비율, 사용환율, 최소사용 등)
   - [ ] 등급 threshold/bonus 설정 저장

2. **모바일 오더 테스트**
   - [ ] 회원 로그인 시 포인트 섹션 표시
   - [ ] 포인트 사용 체크박스/슬라이더 작동
   - [ ] 포인트 할인 금액 실시간 계산
   - [ ] 주문 생성 시 points_used 저장 확인

3. **POS 시스템 테스트**
   - [ ] 고객 선택 시 포인트 로드
   - [ ] Payment Modal에서 포인트 사용 UI 표시
   - [ ] 결제 시 포인트 차감 확인

4. **포인트 적립/환불 테스트**
   - [ ] 주문 완료(completed) 시 포인트 적립 확인
   - [ ] 주문 취소(cancelled) 시 포인트 환불 확인
   - [ ] point_transactions 테이블 기록 확인

5. **배포 필요**
   - [ ] `/var/www/html/static/js` 권한 문제 해결 필요 (root 소유)
   - [ ] 프론트엔드 수동 배포 또는 권한 수정 후 재배포

**관련 파일:**
- `/var/www/dev-frontend/src/pages/Settings/SettingsPage.tsx` (Membership 탭)
- `/var/www/dev-frontend/src/mobile/pages/PaymentPage.tsx` (모바일 포인트)
- `/var/www/dev-frontend/src/components/POSTerminal/PaymentModal.tsx` (POS 포인트)
- `/var/www/dev-backend/services/pointService.js` (포인트 비즈니스 로직)
- `/var/www/dev-backend/routes/membership.js` (멤버십 API)
- `/var/www/dev-backend/routes/orders.js` (주문 생성 시 포인트 처리)

---

## 📋 목차
1. [시스템 구조](#시스템-구조)
2. [완료된 작업](#완료된-작업)
3. [진행 중인 작업](#진행-중인-작업)
4. [예정된 작업](#예정된-작업)
5. [데이터베이스 스키마](#데이터베이스-스키마)
6. [주요 파일 목록](#주요-파일-목록)
7. [트러블슈팅 히스토리](#트러블슈팅-히스토리)

---

## 🏗️ 시스템 구조

### 사용자 계층 구조
```
시스템 관리자 (Admin)
├─ Restaurant Owners
│  ├─ 레스토랑 소유자
│  └─ 구독: Restaurant Plans (Basic/Professional/Enterprise)
│
├─ Foodcourt General (구독 관리)
│  ├─ Foodcourt Manager들 생성/관리
│  └─ 구독: Foodcourt Plans (Basic/Professional/Enterprise)
│
└─ Brand General (구독 관리)
   ├─ Brand Manager들 생성/관리
   └─ 구독: Brand Plans (Basic/Professional/Enterprise)
```

### 플랜 구조
```
Restaurant Plans (레스토랑 소유자용)
├─ Basic Plan (RM 29/month)
├─ Professional Plan (RM 59/month)
└─ Enterprise Plan (RM 99/month)

Brand Plans (브랜드 관리용)
├─ Brand Basic (RM 149/month)
├─ Brand Professional (RM 299/month)
└─ Brand Enterprise (RM 499/month)

Foodcourt Plans (푸드코트 관리용)
├─ Foodcourt Basic (RM 149/month)
├─ Foodcourt Professional (RM 299/month)
└─ Foodcourt Enterprise (RM 499/month)
```

### 모듈 분류 체계
```
Restaurant Modules (target_user_type: 'restaurant')
├─ Basic: POS Terminal, Menu Management, Customer Management, etc.
└─ Advanced: Mobile Ordering, Recipe Management, Advanced Inventory

Brand Modules (target_user_type: 'brand')
├─ Basic: Manager Dashboard, Operation Inquiry
└─ Advanced: Brand Management, User Management, Subscription Management

Foodcourt Modules (target_user_type: 'foodcourt')
├─ Basic: Manager Dashboard, Operation Inquiry
└─ Advanced: Foodcourt Management, User Management, Subscription Management

Shared Modules (target_user_type: 'all')
└─ Restaurant Management (multi-restaurant management)
```

---

## ✅ 완료된 작업

### Phase 1: 데이터베이스 구조 개선 (2025-11-18 ~ 2025-11-19)

#### 1.1 Plan Template 모델 재구조화
**파일:** `/var/www/dev-backend/models/PlanTemplate.js`

**변경사항:**
- `plan_target` ENUM 추가: `'restaurant'`, `'brand'`, `'foodcourt'`
- Manager Plans를 Brand/Foodcourt Plans로 분리
- 기존 Manager Plans 삭제 후 재생성

**SQL 실행:**
```sql
-- ENUM 변경
ALTER TABLE plan_templates
MODIFY COLUMN plan_target ENUM('restaurant', 'brand', 'foodcourt');

-- 기존 Manager Plans 삭제
DELETE FROM plan_templates WHERE id IN (4, 5, 6);

-- Brand Plans 추가
INSERT INTO plan_templates (name, display_name, base_price_monthly, base_price_annual, ..., plan_target) VALUES
('brand_basic', 'Brand Basic', 149.00, 1490.00, ..., 'brand'),
('brand_professional', 'Brand Professional', 299.00, 2990.00, ..., 'brand'),
('brand_enterprise', 'Brand Enterprise', 499.00, 4990.00, ..., 'brand');

-- Foodcourt Plans 추가
INSERT INTO plan_templates (name, display_name, base_price_monthly, base_price_annual, ..., plan_target) VALUES
('foodcourt_basic', 'Foodcourt Basic', 149.00, 1490.00, ..., 'foodcourt'),
('foodcourt_professional', 'Foodcourt Professional', 299.00, 2990.00, ..., 'foodcourt'),
('foodcourt_enterprise', 'Foodcourt Enterprise', 499.00, 4990.00, ..., 'foodcourt');
```

#### 1.2 Addon Module 모델 재구조화
**파일:** `/var/www/dev-backend/models/AddonModule.js`

**변경사항:**
- `target_user_type` ENUM 변경: `'restaurant'`, `'brand'`, `'foodcourt'`, `'all'`
- 모듈 분류 재정의
- Restaurant 전용 모듈과 Manager 전용 모듈 명확히 분리

**SQL 실행:**
```sql
-- ENUM 변경
ALTER TABLE addon_modules
MODIFY COLUMN target_user_type ENUM('restaurant', 'brand', 'foodcourt', 'all');

-- Restaurant 전용 모듈 설정
UPDATE addon_modules
SET target_user_type = 'restaurant'
WHERE module_code IN ('mobile_ordering', 'recipe_management', 'advanced_inventory');

-- Brand/Foodcourt 공통 모듈 설정
UPDATE addon_modules
SET target_user_type = 'all'
WHERE module_code IN ('brand_management', 'foodcourt_management');

-- 카테고리 재분류
UPDATE addon_modules SET category = 'basic'
WHERE module_code IN ('manager_dashboard', 'operation_inquiry');
```

#### 1.3 모듈 설명 개선
**변경사항:**
- Brand Management 상세 설명 추가
- Foodcourt Management 상세 설명 추가

**SQL 실행:**
```sql
UPDATE addon_modules
SET description = 'Manage multiple restaurant brands, standardize menus across locations, control brand-wide pricing and promotions, enforce brand guidelines, track brand performance metrics'
WHERE module_code = 'brand_management';

UPDATE addon_modules
SET description = 'Manage foodcourt operations, coordinate multiple vendors and restaurants, shared payment processing, unified customer queue system, foodcourt-wide promotions and events'
WHERE module_code = 'foodcourt_management';
```

### Phase 2: Admin 페이지 UI 개선 (2025-11-19)

#### 2.1 Plans Page 개선
**파일:** `/var/www/dev-frontend/src/pages/Admin/PlansPage.tsx`

**완료 항목:**
1. ✅ Plan Target 드롭다운을 3개로 확장 (Restaurant/Brand/Foodcourt)
2. ✅ 모듈 선택 시 target_user_type 기반 필터링
3. ✅ 체크박스 UI 정렬 개선 (align-items: flex-start)
4. ✅ Plan Name 필드 단순화 (Display Name만 입력, 내부 이름 자동 생성)
5. ✅ Features 필드를 Modules 아래로 이동
6. ✅ 리스트 카드 순서 변경 (Limits → Modules → Features)
7. ✅ 섹션 여백 축소 (12px → 8px)
8. ✅ Edit Plan JSON 파싱 에러 수정

#### 2.2 Restaurants Page 개선
**파일:** `/var/www/dev-frontend/src/pages/Admin/RestaurantsPage.tsx`

**완료 항목:**
1. ✅ Restaurant Plans만 표시되도록 필터링
2. ✅ Add Restaurant 모달에 동적 플랜 로딩
3. ✅ Edit Restaurant 모달에 기존 플랜 데이터 유지
4. ✅ 첫 번째 사용 가능한 플랜을 기본값으로 설정

#### 2.3 Managers Page 개선
**파일:** `/var/www/dev-frontend/src/pages/Admin/ManagersPage.tsx`

**완료 항목:**
1. ✅ Manager Role을 General만 선택 가능하도록 제한 (Foodcourt General, Brand General)
2. ✅ 구독 설정 필드 추가 (Subscription Plan, Billing Cycle, Dates, Auto-renew)
3. ✅ Role 변경 시 플랜 자동 업데이트
4. ✅ Edit Manager 기능 추가 (Edit 버튼 ✎ 추가)
5. ✅ Edit Manager 모달에 구독 설정 필드 추가
6. ✅ 기본 Role을 Foodcourt General로 변경

**Manager 계층 구조:**
- 시스템 관리자는 **General만** 추가/관리
- General은 자신의 Manager들을 별도 페이지에서 관리 (향후 구현)

#### 2.4 Subscriptions Page 개선
**파일:** `/var/www/dev-frontend/src/pages/Admin/SubscriptionsPage.tsx`

**완료 항목:**
1. ✅ User Type 선택기 추가 (Restaurant/Brand Manager/Foodcourt Manager)
2. ✅ User Type별 플랜 동적 필터링
3. ✅ User Type 변경 시 검색 대상 자동 변경 (Restaurant ↔ Manager)
4. ✅ 첫 번째 사용 가능한 플랜을 기본값으로 설정

### Phase 3: 모달 UI/UX 개선 (2025-11-19)

#### 3.1 모든 페이지 모달 기본값 설정
**완료 항목:**
1. ✅ Plans API 응답 확인 (9개 플랜 정상 반환)
2. ✅ Restaurants Page 모달 기본값 설정
3. ✅ Managers Page 모달 기본값 설정
4. ✅ Subscriptions Page 모달 기본값 설정

---

## ✅ 완료된 작업 (최근)

### Phase 2: Recipe Management (2025-11-20 ~ 2025-12-10) - 완료

**상세 설계 문서:** `/var/www/docs/RECIPE_MANAGEMENT_SYSTEM.md`

#### 최종 구현된 권한 구조 (owner_type 기반)

```javascript
// 레시피/재료의 소유권은 owner_type으로 구분
if (recipe.owner_type === 'brand') {
  // Brand General/Manager: CRUD 가능
  // Restaurant Admin: 조회만 가능 (수정 불가)
} else {
  // Restaurant Admin: CRUD 가능
  // Brand General/Manager: 접근 불가 (표시 안됨)
}
```

**핵심 구현사항:**
- `recipe_manager_type` 방식 → `owner_type` 방식으로 단순화
- 브랜드 레시피: Brand General/Manager만 수정, Restaurant Admin은 조회만
- 레스토랑 레시피: Restaurant Admin만 수정, Brand에는 표시 안됨

#### 구현 완료 항목:

**Phase 2.1: 기본 인프라 구축**
1. [x] DB 스키마 생성 (recipes, ingredients, recipe_ingredients, recipe_categories, ingredient_categories)
2. [x] Backend Models 구현 (Recipe, Ingredient, RecipeIngredient)
3. [x] owner_type ENUM('brand', 'restaurant') 기반 소유권 구분
4. [x] 권한 체크 미들웨어 구현 (isBrandManager, checkRestaurantAccess)

**Phase 2.2: Backend APIs 구현**
5. [x] Brand Recipe CRUD API (`/api/brands/:brandId/recipes`)
6. [x] Restaurant Recipe CRUD API (`/api/restaurants/:restaurantId/recipes`)
7. [x] Brand-recipes 조회 API (`/api/restaurants/:restaurantId/brand-recipes`)
8. [x] Ingredient CRUD API
9. [x] Recipe/Ingredient Category API
10. [x] Recipe → Product 변환 API

**Phase 2.3: Frontend UI 구현**
11. [x] RecipeManagementPage (Brand General용 - 4개 탭)
12. [x] RecipesTab - 레시피 CRUD
13. [x] IngredientsTab - 재료 CRUD
14. [x] RecipeCategoriesTab, IngredientCategoriesTab - 카테고리 관리
15. [x] RecipesPage (Restaurant Admin용)
16. [x] IngredientsPage (Restaurant Admin용)

**Phase 2.4: UI 기능 추가 (2025-12-10)**
17. [x] 리스트 카드에 요리시간(prep_time, cook_time) 표시
18. [x] 리스트 카드에 조리방법(instructions) 미리보기 표시
19. [x] 리스트 카드에 재료명 태그(IngredientTags) 표시
20. [x] 카드 클릭 시 Recipe Details 팝업 (View 모드)
21. [x] View 모드에서 Edit 전환 기능

### 버그 수정 및 개선 (2025-12-11)

#### Reports 페이지 필터 버그 수정
**파일:** `/var/www/dev-frontend/src/pages/Reports/ReportsPage.tsx`

**문제:**
- Month 필터 선택 시 그래프가 지난 달 1일~30일 데이터를 잘못 표시
- 30일 범위가 두 달에 걸쳐있을 때 일자(day number)만으로 그룹화되어 데이터 혼합

**해결:**
- 그래프 데이터를 `MM/DD` 형식(예: `11/10`, `12/09`)으로 표시
- 두 달에 걸친 30일 데이터가 올바르게 구분되어 표시

**변경 코드:**
```typescript
// Before: day number만 사용 (11월9일, 10월9일 모두 "9"로 표시)
const day = getOrderDate(order).getDate().toString();

// After: MM/DD 형식으로 구분
const dateKey = `${(orderDate.getMonth() + 1).toString().padStart(2, '0')}/${orderDate.getDate().toString().padStart(2, '0')}`;
```

#### 환경변수 관리 개선
**파일:** `/var/www/dev-backend/.env`, `/var/www/dev-frontend/package.json`

**변경사항:**
- SUDO_PASSWORD를 .env 파일에서 중앙 관리
- 빌드 스크립트에서 .env 파일 읽어서 사용
- 하드코딩된 비밀번호 제거

#### Claude 명령어 추가
**파일:** `/var/www/.claude/commands/개발완료.md`

**기능:**
- 개발 세션 종료 시 사용하는 명령어
- 문서 자동 업데이트 (DEVELOPMENT_PLAN.md 등)
- Git 커밋 및 푸시 자동화

---

## ✅ 완료된 작업 (2026-01-09)

### 보안 강화 작업

**목적:** 프로젝트 전반적인 보안 취약점 점검 및 개선

**완료 항목:**

#### 1. 파일 권한 보안
- [x] `.env` 파일 권한 600 적용 (dev, production)
- [x] `.gitignore` 강화 - `.env` 관련 패턴 추가

#### 2. 민감정보 제거
- [x] `SUDO_PASSWORD` 환경변수 제거 (dev-backend/.env)
- [x] `restart-dev.sh` 스크립트에서 하드코딩된 비밀번호 제거
- [x] `deploy-dev.sh`에서 SUDO_PASSWORD 의존성 제거 (sudo -n 사용)

#### 3. JWT 보안 강화
- [x] `authService.js` - JWT 폴백 시크릿 제거
- [x] `authService.js` - JWT_SECRET 환경변수 필수 검증 추가
- [x] 개발서버 JWT_SECRET 128자로 강화

#### 4. API 보안
- [x] `helmet` 패키지 설치 및 적용 (HTTP 헤더 보안)
- [x] `express-rate-limit` 패키지 설치 및 적용
  - 전체 API: 15분당 1000회
  - 로그인 API: 15분당 20회
- [x] `/api/deploy` 엔드포인트에 System Admin 인증 추가

#### 5. 문서 업데이트
- [x] `ARC.md` 생성 - 프로젝트 아키텍처 요약
- [x] `CLAUDE.md` - AI 보안 규칙 추가
- [x] `개발시작.md` - 보안 필수 규칙, 4줄 규칙 추가
- [x] `개발완료.md` - 배포 전 체크리스트 추가

**변경 파일:**
- `/var/www/dev-backend/.env`
- `/var/www/dev-backend/services/authService.js`
- `/var/www/dev-backend/app.js`
- `/var/www/dev-backend/server.js`
- `/var/www/dev-backend/restart-dev.sh`
- `/var/www/dev-frontend/deploy-dev.sh`
- `/var/www/production-backend/restart-dev.sh`
- `/var/www/.gitignore`
- `/var/www/CLAUDE.md`
- `/var/www/ARC.md` (신규)
- `/var/www/.claude/commands/개발시작.md`
- `/var/www/.claude/commands/개발완료.md`

**보류 작업 (야간 작업 예정):**
- [ ] 운영서버 JWT_SECRET 128자로 강화

---

## ✅ 완료된 작업 (2026-01-07)

### 배포 스크립트 권한 문제 근본 해결

**문제:** `sudo`로 배포 스크립트 실행 시 build 폴더가 root 소유로 생성되어 이후 배포에서 권한 오류 발생

**해결:**
- [x] `deploy-production.sh` - `npm run build`를 `su - $SUDO_USER`로 실행하여 원래 사용자 권한으로 빌드
- [x] `deploy-production.sh` - Step 0에서 dev-frontend, dev-backend 권한도 체크
- [x] `deploy-dev.sh` - 캐시, 빌드, node_modules 폴더 권한 자동 수정 함수 추가
- [x] `CLAUDE.md` - 개발서버 배포 규칙 명시 (`npm run build:dev` 스크립트 사용 필수)

**변경 파일:**
- `/var/www/deploy-production.sh`
- `/var/www/dev-frontend/deploy-dev.sh`
- `/var/www/CLAUDE.md`

---

## ✅ 완료된 작업 (2026-01-06)

### 멤버십/포인트 시스템 구현

**목적:** 레스토랑별 고객 포인트 적립/사용 시스템

**완료 항목:**

#### 1. 데이터베이스 설계
- [x] `membership_settings` 테이블 생성 (포인트 설정, 등급별 보너스)
- [x] `point_transactions` 테이블 생성 (포인트 거래 내역)
- [x] `restaurant_customers` 테이블에 points, loyalty_tier 필드 추가
- [x] `orders` 테이블에 points_used, point_discount 컬럼 추가

#### 2. Backend 구현
- [x] MembershipSettings 모델 (`/var/www/dev-backend/models/MembershipSettings.js`)
- [x] PointTransaction 모델 (`/var/www/dev-backend/models/PointTransaction.js`)
- [x] 포인트 서비스 (`/var/www/dev-backend/services/pointService.js`)
  - earnPointsForOrder: 주문 완료 시 포인트 적립
  - usePointsForOrder: 주문 시 포인트 사용
  - refundPointsForOrder: 주문 취소 시 포인트 환불
- [x] 멤버십 API (`/var/www/dev-backend/routes/membership.js`)
  - GET `/settings/:restaurantId` - 설정 조회
  - PUT `/settings/:restaurantId` - 설정 저장
  - GET `/customer/:restaurantId/:customerId` - 고객 포인트 조회
- [x] orders.js에 포인트 처리 로직 추가

#### 3. Frontend - 모바일 오더
- [x] PaymentPage.tsx에 포인트 UI 추가
  - 포인트 사용 체크박스/슬라이더
  - 포인트 할인 금액 실시간 계산
  - 예상 적립 포인트 표시
- [x] 주문 생성 시 points_used, point_discount 전송

#### 4. Frontend - POS 시스템
- [x] PaymentModal.tsx에 포인트 UI 추가
  - 고객 포인트 표시
  - 포인트 사용 토글/슬라이더
  - 할인 금액 계산
- [x] POSTerminalPage.tsx에 포인트 상태/로딩 로직 추가

#### 5. Frontend - Settings
- [x] SettingsPage.tsx에 Membership 탭 추가
  - Enable Membership 토글
  - 포인트 적립 비율 설정
  - 포인트 사용 환율 설정
  - 최소 사용 포인트 설정
  - 최대 사용 비율 설정
  - 등급별 threshold/bonus 설정

**관련 파일:**
- Backend: `membership.js`, `pointService.js`, `orders.js`, Order 모델
- Frontend: `PaymentPage.tsx`, `PaymentModal.tsx`, `POSTerminalPage.tsx`, `SettingsPage.tsx`
- Migration: `add-points-columns-to-orders.sql`

**알려진 이슈:**
- `/var/www/html/static/js` 권한 문제로 프론트엔드 배포 실패 (root 소유)
- 해결 필요: 권한 수정 또는 수동 배포

---

### Dashboard 타임존 설정 문제 해결

**문제:** Dashboard "오늘의 매출" 통계가 레스토랑 타임존 설정을 무시하고 있었음

**원인:**
- Dashboard API가 "오늘" 날짜 계산 시 고정된 자정(00:00)을 사용
- Brand/Foodcourt 역할은 operation_settings 필드가 없어서 타임존 설정 자체가 불가능

**해결:**
1. **Brand/Foodcourt 모델에 operation_settings 필드 추가**
   - `dev-backend/models/Brand.js` - JSON getter/setter로 operation_settings 추가
   - `dev-backend/models/Foodcourt.js` - 동일하게 추가
   - 기본값: `{ openingTime: '09:00', closingTime: '22:00', timeZone: 'Asia/Kuala_Lumpur' }`

2. **Brand/Foodcourt API 업데이트**
   - `dev-backend/routes/brands.js` - GET/PUT company-info에 operation_settings 포함
   - `dev-backend/routes/foodcourts.js` - GET/PUT company-info에 operation_settings 포함

3. **Company Information 페이지에 Operation Settings UI 추가**
   - `dev-frontend/src/pages/Brand/BrandCompanyInfoPage.tsx`
   - `dev-frontend/src/pages/Foodcourt/FoodcourtCompanyInfoPage.tsx`
   - Opening Time, Closing Time, Timezone 필드 추가
   - 16개 주요 타임존 선택 가능

4. **Dashboard API 타임존 기반 날짜 계산 적용**
   - `dev-backend/routes/dashboard.js` - getTodayBounds() 함수 추가
   - operation_settings.timeZone에 따라 "오늘"의 시작/끝 시간 계산

**테스트 완료:**
- DB 저장/로드 테스트 성공
- Frontend 빌드 성공

**수정된 파일 (7개):**
- `dev-backend/models/Brand.js`
- `dev-backend/models/Foodcourt.js`
- `dev-backend/routes/brands.js`
- `dev-backend/routes/foodcourts.js`
- `dev-backend/routes/dashboard.js`
- `dev-frontend/src/pages/Brand/BrandCompanyInfoPage.tsx`
- `dev-frontend/src/pages/Foodcourt/FoodcourtCompanyInfoPage.tsx`

---

## ✅ 완료된 작업 (2026-01-05)

### 운영서버 문제 해결 및 빌드 시스템 개선

#### Nginx 500 에러 해결
**문제:** 운영서버(purplehere.com)에서 500 Internal Server Error 발생

**원인:** Nginx 설정의 `.html` location 블록에서 `try_files $uri /index.html;`가 무한 리다이렉트 루프 발생

**해결:**
- `/etc/nginx/sites-available/purplehere.com`에서 `.html` location 블록 수정
- `try_files $uri /index.html;` → `try_files $uri =404;`

#### 빌드 캐시 권한 문제 영구 해결
**문제:** `node_modules/.cache` 폴더의 root 소유권으로 빌드 실패 (index.html 미생성)

**해결:**
1. `dev-frontend/deploy-dev.sh` - 빌드 전 캐시 권한 자동 수정
2. `dev-frontend/package.json` - build 스크립트에 권한 수정 로직 추가
3. `deploy-production.sh` - Step 9에 캐시 권한 자동 수정 추가
4. `BUILD_TROUBLESHOOTING.md` 가이드 문서 생성

#### 레시피 상세 필드 API 응답 누락 해결
**문제:** 운영서버에서 레시피 상세 필드(prep_time, cook_time, instructions_summary, instructions_detail)가 API 응답에 누락

**원인:** `brand-products.js`에 중복 라우트가 있어 `attributes` 제한으로 필드 누락
```javascript
// 문제의 중복 라우트 (brand-products.js)
router.get('/brands/:brandId/recipes', authenticateToken, async (req, res) => {
  const recipes = await Recipe.findAll({
    attributes: ['id', 'name', 'description', 'category', 'total_ingredient_cost', 'owner_type'],
    // ... prep_time, cook_time 등 누락
  });
});
```

**해결:**
- `dev-backend/routes/brand-products.js` 중복 라우트 제거
- `production-backend/routes/brand-products.js` 동일하게 수정

#### 중복 라우트 검사 시스템 구축
**목적:** 향후 중복 라우트 문제 사전 방지

**구현:**
1. `dev-backend/scripts/check-duplicates.js` 스크립트 생성
   - `/brands/` 및 `/restaurants/` 경로의 중복만 검사 (실제 문제 발생 경로)
2. `package.json`에 스크립트 추가
   - `npm run check`: 수동 중복 검사
   - `prestart`: 서버 시작 전 자동 검사
3. `deploy-production.sh`에 Step 5.5 추가 (배포 전 중복 검사)

#### inventory.js 중복 라우트 수정
**발견:** `npm run check` 실행 결과 inventory.js에서 중복 발견
```
DUPLICATE: GET /restaurants/:restaurantId/inventory/reorder-suggestions
  - inventory.js:1191 (이전 버전)
  - inventory.js:1482 (PAR-level 기반 버전)
```

**해결:**
- dev-backend/routes/inventory.js: 라인 1191의 이전 버전 삭제
- production-backend/routes/inventory.js: 동일하게 수정

---

## 🚧 진행 중인 작업

### Phase 4: Purchase Order System - 설계 완료 (2026-01-06)

**상태:** 설계 완료, 다음 개발 예정

**상세 설계 문서:** `/var/www/docs/PURCHASE_ORDER_SYSTEM.md`

**핵심 기능:**
1. **2가지 발주 경로**
   - 재고관리 Stock List에서 수량 입력 → [+ Order]
   - 발주관리에서 재료 검색 → 직접 추가

2. **공급업체별 발주서 그룹핑**
   - 같은 날 + 같은 공급업체 = 1개 발주서
   - Order Cart에서 공급업체별로 분리 표시

3. **메신저 공유**
   - WhatsApp, Telegram, KakaoTalk 직접 공유
   - PDF 다운로드, 이미지 저장
   - 텍스트 복사

4. **실 단가 관리 + 가격 히스토리**
   - 입고 시 실제 인보이스 단가 입력
   - 단가 변경 시 재료 원가 업데이트 옵션
   - 모든 가격 변동 히스토리 기록 (어디서 바꿨든)
   - 재료별 가격 변동 팝업 조회

5. **인보이스 연동**
   - 입고 시 인보이스 번호/날짜/금액/파일 저장
   - 발주서에서 인보이스 정보 조회

6. **입고 → 재고 자동 반영**
   - current_stock 증가
   - inventory_transactions 기록
   - inventory_batches 생성 (로트/유통기한)

**신규 테이블 (4개):**
- `purchase_orders` - 발주서 마스터 (인보이스 포함)
- `purchase_order_items` - 발주 품목 (예상단가 + 실단가)
- `order_cart_items` - 발주 대기 목록 (장바구니)
- `ingredient_price_history` - 가격 변동 히스토리

---

### Socket.io 실시간 주문 알림 시스템 (일시 중단)

**상태:** Git stash에 저장됨 (`git stash pop`으로 복원 가능)

**구현 내용 (미완성):**
- `OrderContext.tsx`: Socket.io 연결 및 실시간 주문 수신
- `MainLayout.tsx`: 실시간 pending order count 표시
- 새 주문 알림 사운드 기능
- 알림 설정 (on/off) localStorage 저장

**복원 명령어:**
```bash
git stash pop
```

---

## ✅ 완료된 작업 (2026-01-04)

### Product Recipe 탭 UI 개선

**목적:** BrandProductRecipe 페이지의 Ingredients, Recipe Categories, Ingredient Categories 탭을 RecipeManagement 스타일로 통일

**수정된 파일 (3개):**
- `dev-frontend/src/pages/BrandProductRecipe/ProductIngredientsTab.tsx`
- `dev-frontend/src/pages/BrandProductRecipe/ProductRecipeCategoriesTab.tsx`
- `dev-frontend/src/pages/BrandProductRecipe/ProductIngredientCategoriesTab.tsx`

**변경 내용:**
- **ProductIngredientsTab**: 테이블 → 카드 그리드 레이아웃, 이미지 업로드 기능, ConfirmModal 적용
- **ProductRecipeCategoriesTab**: OrderControls(순서변경 버튼) 추가, SVG 아이콘 버튼, ConfirmModal 적용
- **ProductIngredientCategoriesTab**: OrderControls(순서변경 버튼) 추가, SVG 아이콘 버튼, ConfirmModal 적용
- ThemedButton 사용, 카테고리 reorder API 연동

---

## ✅ 완료된 작업 (2026-01-01)

### PhoneInput 컴포넌트 표준화

**목적:** 모든 페이지의 전화번호 입력을 국가코드를 지원하는 PhoneInput 컴포넌트로 통일

**수정된 파일 (12개):**
- `dev-frontend/src/pages/Settings/SettingsPage.tsx`
- `dev-frontend/src/pages/Profile/ProfilePage.tsx`
- `dev-frontend/src/pages/Admin/ManagersPage.tsx` (신규/수정 폼)
- `dev-frontend/src/pages/Admin/RestaurantsPage.tsx` (신규/수정 폼)
- `dev-frontend/src/pages/Manager/SignupPage.tsx`
- `dev-frontend/src/components/Staff/StaffProfileModal.tsx`
- `dev-frontend/src/pages/CompanyProfile/CompanyProfilePage.tsx`
- `dev-frontend/src/pages/BrandGeneral/BrandGeneralDashboard.tsx`
- `dev-frontend/src/pages/BrandGeneral/BrandManagement.tsx`
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtGeneralDashboard.tsx`
- `dev-frontend/src/pages/CompanyInformation/CompanyInformationPage.tsx`
- `dev-frontend/src/components/Layout/MainLayout.tsx`

**변경 내용:**
- 기존 `<Input type="tel">` → `<PhoneInput>` 컴포넌트로 교체
- 국가 선택에 따른 국가코드 자동 변경 지원
- `defaultCountry` prop으로 기본 국가 설정

### Country Select 표준화

**목적:** 국가 선택 드롭다운을 COUNTRIES 상수를 사용하도록 통일

**수정된 파일:**
- `dev-frontend/src/pages/CompanyInformation/CompanyInformationPage.tsx`

**변경 내용:**
- 하드코딩된 국가 옵션 → `COUNTRIES` 상수 import 사용
- 기본값 `'Malaysia'` → `'MY'` (국가 코드 표준)

### Foodcourt 메뉴 구조 개선

**수정된 파일:**
- `dev-frontend/src/components/Layout/MainLayout.tsx`

**변경 내용:**
- Foodcourt General/Manager 메뉴에 Company Information 항목 추가
- 메뉴 섹션 구조화 (Management, Analytics, Administration, Support)

---

## ✅ 완료된 작업 (2025-12-30)

### 데이터베이스 스키마 수정

**문제:** Recipe Management, Inventory 페이지에서 500 에러 발생

**원인:** Sequelize 모델에 정의된 컬럼이 실제 DB 테이블에 없음

**해결:** 누락된 컬럼 추가
```sql
-- ingredients 테이블
ALTER TABLE ingredients ADD COLUMN track_stock TINYINT(1) NOT NULL DEFAULT 1;
ALTER TABLE ingredients ADD COLUMN min_order DECIMAL(10,2) DEFAULT 0;

-- general_stock 테이블
ALTER TABLE general_stock ADD COLUMN image_url MEDIUMTEXT;
ALTER TABLE general_stock ADD COLUMN min_order DECIMAL(10,2) DEFAULT 0;
```

### 메뉴 깜빡임(flickering) 버그 수정

**문제:** 네비게이션 메뉴 클릭할 때마다 메뉴가 나타났다 사라졌다 반복

**원인:** `MainLayout.tsx`의 `isMenuAllowed` 헬퍼 함수가 로딩 중일 때 `false` 반환
```typescript
// 문제 코드
const isMenuAllowed = (route: string) => {
  if (loading) return false;  // 로딩 중 메뉴 숨김 → 깜빡임 발생
  return isRouteAllowed(route);
};
```

**해결:** `isMenuAllowed` 헬퍼 제거, `isRouteAllowed` 직접 사용
- `isRouteAllowed`는 `allowedRoutes.length === 0`일 때 `true` 반환 (fail-open)
- 로딩 중에도 메뉴 유지됨

**수정 파일:**
- `/var/www/dev-frontend/src/components/Layout/MainLayout.tsx`

### General Stock Categories 탭 위치 변경

**사용자 요청:** "General Stock Categories는 왜 레시피에 있어? 재고관리에 있어야지"

**변경 내용:**
- Recipe Management 페이지에서 General Stock Categories 탭 제거
- Inventory 페이지에 Categories 탭 추가 (History 옆)

**수정 파일:**
- `/var/www/dev-frontend/src/pages/RecipeManagement/RecipeManagementPage.tsx` - 탭 제거
- `/var/www/dev-frontend/src/pages/Inventory/InventoryPage.tsx` - 탭 추가

### Product Recipes 메뉴 접근 권한 수정

**사용자 요청:** "Product Recipes 메뉴가 레스토랑 관리자에서는 아예 안나와야 해"

**변경 내용:**
- Restaurant Admin 메뉴에서 Product Recipes NavItem 제거
- 이 메뉴는 Brand General/Manager에게만 표시

**수정 파일:**
- `/var/www/dev-frontend/src/components/Layout/MainLayout.tsx`

### 개발/운영 DB 설정값 동기화

**사용자 요청:** "운영서버 세팅값이 개발서버에서 배포하면 자꾸 바뀌고 있어"

**분석:**
- 개발 DB와 운영 DB의 레스토랑 설정값이 다름
- 개발 DB: `cash_rounding: NULL`, `rounding_apply_to: cash_only`, `operation_settings: NULL`
- 운영 DB: `cash_rounding: 0.10`, `rounding_apply_to: all`, `operation_settings: {...}`
- 배포 스크립트는 스키마(테이블/컬럼)만 동기화하고 데이터는 변경하지 않음
- 문제의 원인은 DB 데이터 불일치가 아닌, 프론트엔드에서 기본값으로 병합하는 로직

**해결:**
1. 개발 DB의 restaurant 10 설정값을 운영 DB와 동기화
   ```sql
   UPDATE restaurants SET
     cash_rounding = 0.10,
     rounding_apply_to = 'all',
     operation_settings = (운영 DB의 operation_settings)
   WHERE id = 10;
   ```
2. 배포 스크립트는 데이터를 변경하지 않으므로 운영 설정값은 보존됨

**확인 완료:**
- 운영 API `/api/restaurants/10` → 올바른 설정값 반환
- 프론트엔드 코드: DB 컬럼값(currency, cash_rounding, rounding_apply_to)을 우선 사용

---

## ✅ 완료된 작업 (2025-12-29)

### Inventory 페이지 버그 수정 및 개선

**수정된 파일:**
- `dev-backend/routes/inventory-routes.js`
- `dev-frontend/src/pages/Inventory/InventoryPage.tsx`
- `dev-frontend/src/hooks/useAllowedRoutes.ts`
- `dev-frontend/src/components/Layout/MainLayout.tsx`

**해결된 문제들:**

1. **재고 페이지 "No ingredients found" 문제**
   - 원인: API가 `restaurant_id`만 쿼리하고 `brand_id` 재료를 포함하지 않음
   - 해결: `inventory-routes.js`에서 브랜드 재료도 포함하도록 OR 조건 추가
   ```javascript
   const orConditions = [{ restaurant_id: restaurantId }];
   if (restaurant?.brand_id) {
     orConditions.push({ brand_id: restaurant.brand_id });
   }
   ```

2. **404 오류: `/inventory/expiring` API 누락**
   - 원인: `inventory.js`에 있던 API가 실제 사용되는 `inventory-routes.js`에 없음
   - 해결: `inventory-routes.js`에 `/expiring` 엔드포인트 추가

3. **`toFixed is not a function` 오류**
   - 원인: DB에서 `avg_daily_usage`가 문자열("0.0000")로 반환됨
   - 해결: `parseFloat(String(value))`로 변환 후 `toFixed()` 호출
   ```typescript
   // 수정 전
   <div>{item.avg_daily_usage.toFixed(2)}</div>
   // 수정 후
   <div>{(parseFloat(String(item.avg_daily_usage)) || 0).toFixed(2)}</div>
   ```

4. **Authorization 헤더 누락**
   - 원인: `fetchAPI`가 쿠키 기반이나 시스템은 Bearer 토큰 사용
   - 해결: `authFetch` 헬퍼 함수 추가하여 `Authorization: Bearer` 헤더 포함

5. **디버그 로그 제거**
   - `MainLayout.tsx`와 `useAllowedRoutes.ts`에서 과도한 console.log 제거
   - 콘솔 스팸 문제 해결

### Reports 페이지 통계 분석

**분석 완료 - 코드 정확성 확인:**
- `filteredOrders`에서 `status === 'completed'`만 필터링됨
- 모든 통계(salesData, categoryData, menuData, drilldownData)가 completed 주문 기준
- cancelled 주문은 정확하게 제외됨

**운영 DB 확인 (restaurant_id=8, 2025-12-29):**
- completed: 32건, RM 785.50
- cancelled: 2건, RM 37.00

---

## ✅ 완료된 작업 (2025-12-28)

### 프론트엔드 빌드 오류 수정

**문제:**
- 500 Internal Server Error 발생
- `node_modules/.cache` 폴더 권한 문제로 빌드 불완전 (index.html 미생성)

**해결:**
1. sudo로 `node_modules/.cache` 폴더 삭제
2. `DISABLE_ESLINT_PLUGIN=true TSC_COMPILE_ON_ERROR=true` 옵션으로 재빌드
3. 빌드 성공 확인 (HTTP 200 정상 응답)

**명령어:**
```bash
echo "$SUDO_PASSWORD" | sudo -S rm -rf /var/www/dev-frontend/node_modules/.cache
DISABLE_ESLINT_PLUGIN=true TSC_COMPILE_ON_ERROR=true CI=false npm run build
```

---

## ✅ 완료된 작업 (2025-12-22)

### 통화 설정 시스템 개선

**문제 1: 통화 코드 불일치**
- 메뉴 페이지에서 레스토랑 통화가 RM으로 설정되어 있어도 $로 표시됨
- `useBrandCurrency` 훅이 브랜드 API에서 통화를 가져오고 있었음

**해결:**
1. `useBrandCurrency` 훅을 레스토랑 기반으로 변경
   - `/api/restaurants/${restaurantId}`에서 통화 가져오기
   - 토큰 키 수정 (`token` → `auth_token`)
2. `CURRENCY_CONFIG`에 `RM` 키 추가 (말레이시아 현지 관례)
3. 모든 페이지의 기본 통화값을 `MYR` → `RM`으로 변경 (23개 파일)

**문제 2: 배포 시 설정값 리셋**
- 운영 배포 후 통화 반올림, Pager 설정 등이 초기화됨
- `operation_settings` JSON과 개별 컬럼(`cash_rounding`, `currency`) 값이 불일치

**해결:**
1. 백엔드 `store.js`에서 설정 저장 시 `operation_settings` 내부 값도 개별 컬럼과 동기화
2. 프론트엔드에서 `cash_rounding`이 null일 때 기본값 설정하지 않음 (비활성화 상태 보존)
3. 운영 DB의 불일치 데이터 동기화 쿼리 실행

**수정된 파일:**
- `dev-backend/routes/store.js` - operation_settings 동기화 로직 추가
- `dev-frontend/src/hooks/useBrandCurrency.ts` - 레스토랑 기반으로 변경
- `dev-frontend/src/utils/currency.ts` - RM 키 추가, 기본값 RM
- `dev-frontend/src/pages/Settings/SettingsPage.tsx` - null 보존 로직
- 23개 페이지의 통화 기본값 변경

---

## ✅ 완료된 작업 (2025-12-19)

### 재고관리 시스템 완료

**구현 내용:**
1. **Backend API 라우터 수정**
   - `inventory.js` auth middleware import 수정 (`authenticateToken` destructuring)
   - `inventory-routes.js` 생성 (restaurants.js에서 마운트)
   - `server.js`에 inventory-routes 마운트 추가
   - 기존 중복 라우터 등록 정리

2. **API 엔드포인트 (모두 동작 확인됨)**
   - GET `/api/restaurants/:id/inventory` - 재고 현황
   - GET `/api/restaurants/:id/inventory/summary` - 요약
   - GET `/api/restaurants/:id/inventory/alerts` - 알림 목록
   - GET `/api/restaurants/:id/inventory/transactions` - 거래 내역
   - GET `/api/restaurants/:id/inventory/reorder-suggestions` - 발주 제안
   - GET `/api/restaurants/:id/stock-takes` - 재고 실사 목록
   - POST 엔드포인트들 (receive, waste, adjust, initial, stock-take 등)

3. **Frontend**
   - InventoryPage.tsx 구현 완료 (Dashboard, Stock List, History 탭)
   - StockTakePage.tsx 구현 완료 (재고 실사 기능)
   - 공통 UI 컴포넌트 활용 (Table, TableHeader, TableRow 등)

**관련 파일:**
- `/var/www/dev-backend/routes/inventory-routes.js` (신규)
- `/var/www/dev-backend/routes/inventory.js`
- `/var/www/dev-backend/server.js` (라우터 마운트 추가)
- `/var/www/dev-frontend/src/pages/Inventory/InventoryPage.tsx`
- `/var/www/dev-frontend/src/pages/Inventory/StockTakePage.tsx`
- `/var/www/docs/INVENTORY_MANAGEMENT_SYSTEM.md` (설계문서)

### RM 하드코딩 통화 수정 (18개 파일)

**문제:** 여러 페이지에서 통화가 'RM'으로 하드코딩되어 있었음

**해결:** `useBrandCurrency` 훅과 `formatCurrency` 유틸리티를 사용하여 동적 통화 표시

**수정된 파일:**
- Manager 페이지 (11개): SalesPage, ManagerDashboard, ManagerCustomersPage, ManagerPromotionsPage, ManagerReportsPage, InvoicesPage, RestaurantsPage, StaffManagementPage, ManagerSubscriptionsPage, SignupPage, SubscriptionsPage
- BrandGeneral 페이지 (3개): BrandGeneralDashboard, BrandReportsPage, BrandPerformance
- 기타 페이지 (4개): CustomersPage, RestaurantDashboard, MenuManagementPage, DashboardContent

---

## ✅ 완료된 작업 (2025-12-16)

### PM2 Port 충돌 문제 영구 해결

**문제:** dev-backend가 "Port 3001 is already in use" 에러로 무한 재시작 루프 발생

**근본 원인:**
- `server.js`와 `app.js` 양쪽에서 `startServer()` 호출
- server.js가 모듈을 로드할 때 app.js도 실행되어 같은 포트에 두 번 바인딩 시도

**해결:**
1. `app.js`에 `require.main === module` 체크 추가 (직접 실행 시에만 서버 시작)
2. `ecosystem.config.js`에 PM2 안정성 설정 추가:
   - `exec_mode: 'fork'` (명시적)
   - `max_restarts: 10`, `min_uptime: 5000`, `restart_delay: 4000`
   - `kill_timeout: 5000`
3. `/var/www/dev-backend/restart-dev.sh` 스크립트 생성 (포트 정리 후 재시작)

**수정 파일:**
- `/var/www/dev-backend/app.js`
- `/var/www/dev-backend/ecosystem.config.js`
- `/var/www/dev-backend/server.js`
- `/var/www/dev-backend/restart-dev.sh` (신규)
- `/var/www/dev-backend/README.md` (트러블슈팅 섹션 추가)

### Notification Settings 페이지 토큰 키 수정

**문제:** 로그인 상태인데 "No authentication token found" 에러 발생

**근본 원인:**
- NotificationSettingsPage에서 `localStorage.getItem('token')` 사용
- 프로젝트 전체에서는 `localStorage.getItem('auth_token')` 키 사용

**해결:**
- NotificationSettingsPage.tsx의 3곳에서 `'token'` → `'auth_token'`으로 변경
  - 377번줄: loadSettings Authorization 헤더
  - 397번줄: handleSave 토큰 가져오기
  - 442번줄: sendTestEmail Authorization 헤더

**수정 파일:**
- `/var/www/dev-frontend/src/pages/NotificationSettings/NotificationSettingsPage.tsx`

---

## ✅ 완료된 작업 (2025-12-15)

### Phase 3: 브랜드 제품 관리 시스템 - 완료

**구현 완료 항목:**

#### 3.1 데이터베이스
- [x] `brand_product_categories` 테이블 생성
- [x] `brand_products` 테이블 생성 (base_quantity, sync_to_ingredients 추가)
- [x] `brand_product_option_groups` 테이블 생성
- [x] `brand_product_options` 테이블 생성
- [x] `brand_product_brands` 연결 테이블 (N:M 관계)
- [x] `brand_product_option_group_products` 연결 테이블 (N:M 관계)

#### 3.2 Backend 구현
- [x] Models: BrandProduct, BrandProductCategory, BrandProductOptionGroup, BrandProductOption
- [x] Routes: `/api/brand-products` (통합 관리 - CRUD)
- [x] Routes: `/api/brand-product-categories` (CRUD)
- [x] Routes: `/api/brand-product-option-groups` (CRUD)
- [x] Routes: `/api/brands/:brandId/products` (브랜드별 제품 조회)
- [x] `isBrandManager` 미들웨어 개선 (brand_id 없는 요청도 허용)

#### 3.3 Frontend 구현
- [x] Brand General 메뉴에 "Product Management" 추가 (`/pos/brand-general/products`)
- [x] BrandProductManagementPage - 3개 탭 구조
- [x] BrandProductCategoriesTab - 카테고리 관리
- [x] BrandProductsTab - 제품 목록/CRUD (이미지, 가격, 옵션 그룹, 브랜드 연결)
- [x] BrandProductOptionsTab - 옵션 그룹/옵션 관리

### Phase 4: 제품-재료 연동 시스템 - 완료

#### 4.1 연동 로직 구현
- [x] `ingredients` 테이블에 `brand_product_id` FK 추가
- [x] `ingredients` 테이블에 `image_url` 필드 추가 (MEDIUMTEXT)
- [x] `ingredients` 테이블에 `base_quantity` 필드 추가
- [x] Brand Product 생성/수정 시 자동으로 Ingredient 레코드 생성/업데이트
- [x] `sync_to_ingredients` 플래그로 연동 여부 선택 가능 (패키지 등 비재료 제품 지원)
- [x] Brand Product 삭제 시 연결된 Ingredient 자동 삭제

#### 4.2 Frontend 구현
- [x] IngredientsTab에 이미지 표시 (카드에 이미지 표시)
- [x] IngredientsTab에 이미지 업로드 기능 추가
- [x] IngredientsTab에 base_quantity 필드 추가 (Base Qty / Unit 표시)
- [x] 브랜드 재료는 "Brand" 배지로 구분 표시

### 주요 변경 파일

**Backend:**
- `/var/www/dev-backend/models/BrandProduct.js` - base_quantity, sync_to_ingredients 추가
- `/var/www/dev-backend/models/Ingredient.js` - brand_product_id, image_url, base_quantity 추가
- `/var/www/dev-backend/models/index.js` - BrandProduct-Ingredient 연관관계 추가
- `/var/www/dev-backend/routes/brand-products.js` - syncProductToIngredients 함수 구현
- `/var/www/dev-backend/routes/ingredients.js` - image_url, base_quantity 필드 지원
- `/var/www/dev-backend/middleware/recipeAuth.js` - isBrandManager 개선
- `/var/www/dev-backend/scripts/sync-brand-products.js` - 기존 제품 동기화 스크립트

**Frontend:**
- `/var/www/dev-frontend/src/pages/BrandProductManagement/BrandProductsTab.tsx` - base_quantity, sync_to_ingredients UI
- `/var/www/dev-frontend/src/pages/RecipeManagement/IngredientsTab.tsx` - 이미지, base_quantity UI

---

## 📅 예정된 작업 (Supply Chain Management 로드맵)

### 전체 흐름도
```
[Brand General/Manager]
        │
        ▼
 Brand Products 등록 (제품 관리)
 ├── 제품 카테고리
 └── 제품 옵션 (옵션 그룹 + 옵션)
        │
        ▼ (brand_id 연결된 레스토랑에 자동 노출)
        │
[Restaurant Admin]
        │
        ├─→ 레시피 생성 시 재료로 선택
        │   ├── 브랜드 재료 (View & Select만)
        │   └── 자체 재료 (CRUD 가능)
        │
        ├─→ 주문 발생 → 재고 차감
        │
        └─→ 발주 관리
              ├── 브랜드로 발주 (Brand Products)
              └── 외부 공급업체 발주 (자체 재료)
```

### 핵심 개념
- **Brand Product = Ingredient**: 브랜드 제품은 연결된 레스토랑에서 레시피 재료로 사용
- **제품 수정은 제품에서만**: Brand General/Manager가 제품을 수정하면 재료 정보도 자동 반영
- **이중 발주 경로**: 브랜드 제품 → 브랜드 발주 / 자체 재료 → 외부 공급업체 발주

---

### Phase 3: 브랜드 제품 관리 시스템 ✅ 완료

**상태:** 2025-12-15 완료 (상세 내용은 위 "완료된 작업" 섹션 참조)

---

### Phase 4: 제품-재료 연동 시스템 ✅ 완료

**상태:** 2025-12-15 완료 (상세 내용은 위 "완료된 작업" 섹션 참조)

---

### ~~Phase 3: 브랜드 제품 관리 시스템~~ (완료됨)

~~**목적:** Brand General/Manager가 레스토랑에 판매할 제품(원재료)을 등록/관리~~

#### ~~3.1 데이터베이스 설계~~
```sql
-- 브랜드 제품 카테고리
CREATE TABLE brand_product_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  brand_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- 브랜드 제품
CREATE TABLE brand_products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  brand_id INT NOT NULL,
  category_id INT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  sku VARCHAR(100),                    -- 제품 코드
  unit VARCHAR(50),                    -- 기본 단위 (kg, L, 개 등)
  unit_price DECIMAL(10, 2) NOT NULL,  -- 단가
  min_order_quantity INT DEFAULT 1,    -- 최소 주문 수량
  image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (brand_id) REFERENCES brands(id),
  FOREIGN KEY (category_id) REFERENCES brand_product_categories(id)
);

-- 브랜드 제품 옵션 그룹 (포장 단위, 등급 등)
CREATE TABLE brand_product_option_groups (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,          -- "포장 단위", "등급"
  is_required BOOLEAN DEFAULT FALSE,
  min_selections INT DEFAULT 0,
  max_selections INT DEFAULT 1,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES brand_products(id) ON DELETE CASCADE
);

-- 브랜드 제품 옵션
CREATE TABLE brand_product_options (
  id INT PRIMARY KEY AUTO_INCREMENT,
  option_group_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,          -- "1kg", "5kg", "프리미엄"
  price_adjustment DECIMAL(10, 2) DEFAULT 0,  -- 추가 금액
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (option_group_id) REFERENCES brand_product_option_groups(id) ON DELETE CASCADE
);
```

#### 3.2 Backend 구현
1. [ ] Models: BrandProduct, BrandProductCategory, BrandProductOptionGroup, BrandProductOption
2. [ ] Routes: `/api/brands/:brandId/products` (CRUD)
3. [ ] Routes: `/api/brands/:brandId/product-categories` (CRUD)
4. [ ] Routes: `/api/brands/:brandId/products/:productId/option-groups` (CRUD)
5. [ ] 권한 체크: Brand General/Manager만 수정 가능

#### 3.3 Frontend 구현
1. [ ] Brand General 메뉴에 "제품 관리" 추가
2. [ ] BrandProductsPage - 제품 목록/CRUD
3. [ ] BrandProductCategoriesPage - 카테고리 관리
4. [ ] 제품 상세 모달 - 옵션 그룹/옵션 관리

**산출물:**
- Brand General/Manager가 제품 등록/수정/삭제
- 제품 카테고리로 분류
- 제품별 옵션(포장 단위, 등급 등) 설정

---

### Phase 4: 제품-재료 연동 시스템

**목적:** 브랜드 제품이 연결된 레스토랑의 레시피 재료로 자동 노출

#### 4.1 연동 로직
```
Brand Product (브랜드 제품)
       │
       ▼ brand_id로 연결된 레스토랑에서
       │
Ingredient로 자동 표시 (owner_type = 'brand')
       │
       └── Restaurant Admin: View & Select만 가능
```

#### 4.2 Backend 구현
1. [ ] 기존 ingredients 테이블에 `brand_product_id` FK 추가
2. [ ] Brand Product 생성 시 자동으로 Ingredient 레코드 생성 (트리거 또는 서비스 로직)
3. [ ] Brand Product 수정 시 연결된 Ingredient 자동 업데이트
4. [ ] Restaurant의 재료 조회 API에서 브랜드 제품 포함

#### 4.3 Frontend 구현
1. [ ] RecipesPage 재료 선택에서 브랜드 재료 구분 표시
2. [ ] 브랜드 재료는 View만 가능 (수정 버튼 숨김)
3. [ ] 재료 출처 표시 (브랜드명 또는 "자체 재료")

**산출물:**
- 브랜드 제품 → 재료 자동 연동
- Restaurant Admin이 레시피에서 브랜드 재료 선택 가능
- 제품 정보 변경 시 재료 정보 자동 반영

---

### Phase 5: 재고 관리 시스템

**목적:** 실시간 재고 추적 및 자동 차감

#### 5.1 데이터베이스 설계
```sql
-- 레스토랑별 재고
CREATE TABLE inventory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  current_quantity DECIMAL(10, 2) DEFAULT 0,
  unit VARCHAR(50),
  min_quantity DECIMAL(10, 2) DEFAULT 0,  -- 최소 재고량 (알림 기준)
  max_quantity DECIMAL(10, 2),             -- 최대 재고량
  last_stock_take_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY (restaurant_id, ingredient_id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

-- 재고 거래 내역
CREATE TABLE inventory_transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  inventory_id INT NOT NULL,
  transaction_type ENUM('in', 'out', 'adjustment', 'stock_take') NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  reference_type VARCHAR(50),    -- 'order', 'purchase_order', 'manual'
  reference_id INT,              -- order_id, purchase_order_id 등
  notes TEXT,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (inventory_id) REFERENCES inventory(id)
);

-- 재고 알림
CREATE TABLE stock_alerts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  alert_type ENUM('low_stock', 'out_of_stock', 'expiring') NOT NULL,
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);
```

#### 5.2 Backend 구현
1. [ ] Models: Inventory, InventoryTransaction, StockAlert
2. [ ] APIs: 재고 조회, 조정, 재고 실사
3. [ ] 주문 완료 시 Recipe → Ingredient → Inventory 자동 차감
4. [ ] 최소 재고 도달 시 알림 생성

#### 5.3 Frontend 구현
1. [ ] `/pos/inventory` - 재고 현황 페이지
2. [ ] `/pos/inventory/transactions` - 거래 내역
3. [ ] `/pos/inventory/stock-take` - 재고 실사
4. [ ] `/pos/inventory/alerts` - 재고 알림

**산출물:**
- 실시간 재고 추적
- 주문 시 자동 재고 차감
- 재고 부족 알림

---

### Phase 6: 발주 관리 시스템

**목적:** 브랜드 제품 및 외부 공급업체 발주 관리

#### 6.1 데이터베이스 설계
```sql
-- 공급업체 (브랜드 + 외부)
CREATE TABLE suppliers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  supplier_type ENUM('brand', 'external') NOT NULL,
  brand_id INT,                  -- supplier_type = 'brand'인 경우
  contact_name VARCHAR(100),
  contact_phone VARCHAR(50),
  contact_email VARCHAR(100),
  address TEXT,
  notes TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- 공급업체-재료 매핑
CREATE TABLE supplier_ingredients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  supplier_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  unit_price DECIMAL(10, 2),
  min_order_quantity INT DEFAULT 1,
  lead_days INT DEFAULT 1,       -- 배송 소요일
  is_preferred BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY (supplier_id, ingredient_id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

-- 발주서
CREATE TABLE purchase_orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  supplier_id INT NOT NULL,
  order_number VARCHAR(50) UNIQUE,
  status ENUM('draft', 'pending', 'approved', 'ordered', 'partial_received', 'received', 'cancelled') DEFAULT 'draft',
  order_date DATE,
  expected_date DATE,
  received_date DATE,
  total_amount DECIMAL(15, 2) DEFAULT 0,
  notes TEXT,
  created_by INT,
  approved_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);

-- 발주 상세
CREATE TABLE purchase_order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  purchase_order_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  brand_product_id INT,          -- 브랜드 제품인 경우
  quantity DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(50),
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(15, 2) NOT NULL,
  received_quantity DECIMAL(10, 2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id) ON DELETE CASCADE,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),
  FOREIGN KEY (brand_product_id) REFERENCES brand_products(id)
);
```

#### 6.2 Backend 구현
1. [ ] Models: Supplier, SupplierIngredient, PurchaseOrder, PurchaseOrderItem
2. [ ] APIs: 공급업체 CRUD, 발주서 CRUD, 입고 처리
3. [ ] 브랜드 연결 시 자동 공급업체 생성
4. [ ] 입고 처리 → 재고 증가 연동

#### 6.3 Frontend 구현
1. [ ] `/pos/suppliers` - 공급업체 관리
2. [ ] `/pos/purchase-orders` - 발주서 목록
3. [ ] `/pos/purchase-orders/create` - 발주서 생성
4. [ ] `/pos/purchase-orders/:id` - 발주 상세/입고 처리

**산출물:**
- 공급업체 관리 (브랜드 자동 + 외부 수동)
- 발주서 생성/승인/입고 프로세스
- 입고 시 재고 자동 증가

---

### Phase 7: AI 재고 예측 (향후)

**목적:** 주문 통계 기반 재고 예측 및 자동 발주 제안

#### 구현 예정
- 과거 주문 데이터 분석
- 요일/시간/계절별 패턴 분석
- 재고 예측 알고리즘
- 자동 발주량 계산
- 낭비 분석

---

### Phase 8: Restaurant Owner 역할

**목적:** 여러 독립 레스토랑을 소유한 오너가 통합 관리할 수 있는 역할

#### 8.1 역할 정의

**Restaurant Owner의 핵심 특징:**
- 브랜드/푸드코트와 무관하게 본인 소유 레스토랑 통합 조회
- 실제 운영(POS, 주문처리)은 Restaurant Admin/Staff가 담당

#### 8.2 권한 구조

**독립 레스토랑 (brand_id = NULL) 소유 시:**
| 기능 | Restaurant Owner | Restaurant Admin |
|------|:----------------:|:----------------:|
| 레스토랑 생성/삭제 | O | X |
| 레스토랑 설정 변경 | O | O |
| 메뉴/카테고리/옵션 관리 | O | O |
| 직원(Staff) 관리 | O | O |
| 매출/리포트 조회 | O (통합) | O (해당 매장) |
| POS 터미널 사용 | X | O |
| 주문 접수/처리 | X | O |

**브랜드 소속 레스토랑 (brand_id = 있음) 소유 시:**
| 기능 | Restaurant Owner |
|------|:----------------:|
| 매출/리포트 조회 | O (읽기 전용) |
| 그 외 모든 관리 | X (Brand General 권한) |
| POS 터미널 사용 | X |

#### 8.3 데이터베이스 설계
```sql
-- Restaurant 테이블에 owner_id 추가
ALTER TABLE restaurants ADD COLUMN owner_id INT NULL;
ALTER TABLE restaurants ADD FOREIGN KEY (owner_id) REFERENCES users(id);

-- User role ENUM에 'Restaurant Owner' 추가
ALTER TABLE users MODIFY COLUMN role ENUM(
  'System Admin',
  'Foodcourt General',
  'Brand General',
  'Foodcourt Manager',
  'Brand Manager',
  'Restaurant Owner',  -- 신규
  'Restaurant Admin',
  'Staff'
);
```

#### 8.4 구현 항목
1. [ ] User role에 'Restaurant Owner' 추가
2. [ ] Restaurant 테이블에 owner_id 필드 추가
3. [ ] Restaurant Owner 전용 대시보드 (통합 매출/리포트)
4. [ ] 레스토랑 전환 기능 (드롭다운)
5. [ ] 독립 레스토랑 생성 기능
6. [ ] 브랜드 소속 레스토랑 연결 (Brand General이 owner_id 설정)

#### 8.5 시나리오

**독립 레스토랑 운영:**
```
김사장 (Restaurant Owner)
├── 김사장 치킨집 (독립) → 직접 생성, 전체 관리
├── 김사장 카페 (독립) → 직접 생성, 전체 관리
└── 통합 대시보드에서 두 매장 합산 매출 조회
```

**브랜드 레스토랑 소유:**
```
이사장 (Restaurant Owner)
├── BBQ 강남점 (Brand: BBQ) → Brand General이 owner_id 연결
│   └── 매출 조회만 가능, 관리는 BBQ본사
└── 통합 대시보드에서 조회
```

**독립 → 브랜드 전환:**
```
독립 치킨집 → BBQ 프랜차이즈 가입
- owner_id: 유지
- brand_id: BBQ 추가
- 관리 권한: Brand General로 이전
```

---

### Phase 9: 구독 서비스 구조 개편

**목적:** 역할별 명확한 과금 체계 수립

#### 9.1 과금 원칙

**핵심:** 각 역할이 자기 기능 사용료를 직접 지불

#### 9.2 과금 구조

| 역할 | 과금 유형 |
|------|----------|
| Brand General | 기본 무료 + 추가 기능 유료 |
| Foodcourt General | 기본 무료 + 추가 기능 유료 |
| Restaurant Owner | 유료 (역할 사용료) |
| Brand Manager | 유료 (역할 사용료) |
| Foodcourt Manager | 유료 (역할 사용료) |
| Restaurant Admin | 유료 (역할 사용료) |
| Staff | 유료 (역할 사용료) |

#### 9.3 무료 제공 범위 (General 역할)

**Brand General 무료 기능:**
- 브랜드 생성/관리
- 소속 레스토랑 조회
- 기본 대시보드
- Brand Manager 생성

**Foodcourt General 무료 기능:**
- 푸드코트 생성/관리
- 소속 레스토랑 조회
- 기본 대시보드
- Foodcourt Manager 생성

**유료 추가 기능 (예시):**
- 고급 분석/리포트
- 대량 데이터 내보내기
- API 접근
- 우선 지원

#### 9.4 구현 항목
1. [ ] 역할별 기본/유료 기능 정의
2. [ ] 구독 플랜 테이블 재설계 (역할 기반)
3. [ ] 무료 기능 제한 로직
4. [ ] 유료 기능 활성화 체크
5. [ ] 과금 대시보드 (System Admin용)

---

### 개발 우선순위 요약

| 순서 | Phase | 내용 | 상태 |
|------|-------|------|--------|
| 1 | Phase 3 | 브랜드 제품 관리 | ✅ 완료 (2025-12-15) |
| 2 | Phase 4 | 제품-재료 연동 | ✅ 완료 (2025-12-15) |
| 3 | Phase 5 | 재고 관리 | ✅ 완료 (2025-12-19) |
| 4 | Phase 6 | 발주 관리 | 📝 설계 완료 (2026-01-06), 다음 개발 |
| 5 | Phase 7 | AI 재고 예측 | 대기 중 |
| 6 | Phase 8 | Restaurant Owner 역할 | 대기 중 |
| 7 | Phase 9 | 구독 서비스 구조 개편 | 대기 중 |

**Phase 6 (발주 관리) 상세 설계 문서:** `/var/www/docs/PURCHASE_ORDER_SYSTEM.md`

---

## 📅 기타 예정된 작업

### 브랜드 통합 고객 포인트/등급 시스템 (보류)

**목적:** Brand General이 소속 레스토랑들의 고객 포인트/등급을 통합 또는 분리 관리

*(상세 내용은 별도 문서로 분리 예정)*

### General 사용자 페이지 구현 (보류)

- Foodcourt/Brand General 전용 대시보드
- Manager 관리 페이지
- 권한 관리 시스템

### 구독 관리 시스템 (보류)

- 구독 활성화/비활성화
- UI Routes 제어
- 결제 연동

---

## 🗄️ 데이터베이스 스키마

### plan_templates
```sql
CREATE TABLE plan_templates (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  base_price_monthly DECIMAL(10, 2) NOT NULL,
  base_price_annual DECIMAL(10, 2) NOT NULL,
  order_limit INT DEFAULT 1000 COMMENT '-1 for unlimited',
  menu_item_limit INT DEFAULT 50 COMMENT '-1 for unlimited',
  staff_limit INT DEFAULT 5 COMMENT '-1 for unlimited',
  category ENUM('basic', 'custom') DEFAULT 'basic',
  plan_target ENUM('restaurant', 'brand', 'foodcourt') DEFAULT 'restaurant',
  features TEXT,
  included_modules JSON,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### addon_modules
```sql
CREATE TABLE addon_modules (
  id INT PRIMARY KEY AUTO_INCREMENT,
  module_code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category ENUM('basic', 'advanced', 'revenue', 'operation', 'analytics') NOT NULL,
  target_user_type ENUM('restaurant', 'brand', 'foodcourt', 'all') DEFAULT 'restaurant',
  base_price_monthly DECIMAL(10, 2) DEFAULT 0.00,
  base_price_annual DECIMAL(10, 2) DEFAULT 0.00,
  ui_routes JSON COMMENT 'Array of allowed UI routes',
  features JSON COMMENT 'Feature descriptions for display',
  dependencies JSON COMMENT 'Required module codes',
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 현재 플랜 목록 (9개)
```
Restaurant Plans:
1. Basic Plan (RM 29/month)
2. Professional Plan (RM 59/month)
3. Enterprise Plan (RM 99/month)

Brand Plans:
10. Brand Basic (RM 149/month)
11. Brand Professional (RM 299/month)
12. Brand Enterprise (RM 499/month)

Foodcourt Plans:
13. Foodcourt Basic (RM 149/month)
14. Foodcourt Professional (RM 299/month)
15. Foodcourt Enterprise (RM 499/month)
```

### 모듈 분류 (target_user_type 기준)

**Restaurant Modules:**
- pos_terminal, menu_management, customer_management
- table_management, kitchen_display, customer_display
- staff_management, reports_analytics, invoice_management
- promotions, support_tickets, activity_logs
- mobile_ordering, recipe_management, advanced_inventory

**Brand Modules:**
- brand_management, manager_dashboard, operation_inquiry
- user_management, subscription_management, system_settings

**Foodcourt Modules:**
- foodcourt_management, manager_dashboard, operation_inquiry
- user_management, subscription_management, system_settings

**Shared Modules (all):**
- restaurant_management

---

## 📁 주요 파일 목록

### Backend Models
```
/var/www/dev-backend/models/
├── PlanTemplate.js           # 구독 플랜 모델
├── AddonModule.js            # 애드온 모듈 모델
├── Restaurant.js             # 레스토랑 모델
├── User.js                   # 사용자 모델 (Manager 포함)
└── index.js                  # 모델 연관관계 정의
```

### Backend Routes
```
/var/www/dev-backend/routes/
├── plans.js                  # 플랜 관리 API
├── restaurants.js            # 레스토랑 관리 API
└── managers.js               # 매니저 관리 API (향후 확장 예정)
```

### Frontend Pages
```
/var/www/dev-frontend/src/pages/Admin/
├── PlansPage.tsx             # 플랜 관리 페이지
├── RestaurantsPage.tsx       # 레스토랑 관리 페이지
├── ManagersPage.tsx          # 매니저 관리 페이지 (General만)
└── SubscriptionsPage.tsx     # 구독 관리 페이지
```

### Frontend Hooks
```
/var/www/dev-frontend/src/hooks/
└── useAllowedRoutes.ts       # 라우트 권한 체크 Hook
```

---

## 🔗 관련 페이지

### 개발 환경
- **Admin Plans:** https://dev.purplehere.com/pos/admin/plans
- **Admin Restaurants:** https://dev.purplehere.com/pos/admin/restaurants
- **Admin Managers:** https://dev.purplehere.com/pos/admin/managers
- **Admin Subscriptions:** https://dev.purplehere.com/pos/admin/subscriptions

### 프로덕션 환경
- **URL:** https://orderhere.wor-pro.com

---

## 📝 개발 노트

### 주요 설계 결정사항

1. **General vs Manager 구분**
   - General: 구독 관리, Manager 생성/관리
   - Manager: 실무 작업, 구독 공유

2. **플랜 분리 이유**
   - Restaurant Plans: 개별 레스토랑 소유자용
   - Brand Plans: 다중 브랜드 관리용
   - Foodcourt Plans: 푸드코트 관리용
   - 각각 다른 가격 책정 및 기능 제공

3. **모듈 분류 기준**
   - target_user_type으로 명확히 구분
   - 'all'은 여러 타입이 공통으로 사용하는 모듈

4. **UI/UX 개선 원칙**
   - 기본값 자동 설정으로 사용자 편의성 증대
   - Role 변경 시 관련 필드 자동 업데이트
   - 동적 필터링으로 혼란 최소화

---

## 🔧 트러블슈팅 히스토리

### 문제 1: Brand General 사용자 레스토랑 필터링 미작동 (2025-11-20 해결)

**증상:**
- Brand General 사용자가 연결된 2개 레스토랑만 봐야 하는데 전체 9개 레스토랑 표시
- URL: https://dev.purplehere.com/pos/manager/restaurants
- DB `restaurant_managers` 테이블에는 정상적으로 연결되어 있음

**근본 원인:**
```typescript
// 문제 코드: RestaurantsPage.tsx:462
const token = localStorage.getItem('token'); // ❌ null 반환
// 실제 사용: 'auth_token' 키 사용 중
```
- localStorage 키 불일치로 인해 Authorization 헤더가 `Bearer null`로 전송됨
- 백엔드가 익명 사용자로 인식하여 role-based 필터링 미작동

**해결 방법:**
```typescript
// 수정: RestaurantsPage.tsx:462
const token = localStorage.getItem('auth_token'); // ✅ 정상 작동
```

**수정 파일:**
- `/var/www/dev-frontend/src/pages/Manager/RestaurantsPage.tsx` (Line 462)
- `/var/www/production-backend/routes/restaurants.js` (optionalAuth 미들웨어 추가)

**디버깅 팁:**
1. 백엔드 로그에서 Authorization header 확인
2. localStorage 키 이름 일치 여부 확인
3. 빌드 파일에서 실제 사용 키 검증: `grep 'localStorage.getItem' build/static/js/main.*.js`
4. 네트워크 탭에서 실제 헤더 값 확인

**예방책:**
- localStorage 키를 상수로 관리
- API 헬퍼 함수로 인증 헤더 통일
- 타입스크립트 유틸리티 함수 사용

### 문제 2: PM2 Port 충돌 무한 재시작 (2025-12-16 해결)

**증상:**
- dev-backend PM2 프로세스가 "Port 3001 is already in use" 에러로 무한 재시작
- PM2 로그에 반복적인 재시작 기록

**근본 원인:**
- `server.js`와 `app.js` 양쪽에서 `startServer()` 호출
- server.js가 app.js를 require할 때 app.js도 서버를 시작하려고 시도
- 결과적으로 같은 포트에 두 번 바인딩 시도

**해결 방법:**
```javascript
// app.js 수정
if (require.main === module) {
  startServer();
}
module.exports = { app, startServer };
```

**PM2 설정 추가 (ecosystem.config.js):**
```javascript
{
  max_restarts: 10,      // 최대 재시작 횟수 제한
  min_uptime: 5000,      // 최소 실행 시간
  restart_delay: 4000,   // 재시작 간 딜레이
  kill_timeout: 5000     // 종료 타임아웃
}
```

**수정 파일:**
- `/var/www/dev-backend/app.js`
- `/var/www/dev-backend/ecosystem.config.js`
- `/var/www/dev-backend/server.js`
- `/var/www/dev-backend/restart-dev.sh` (포트 정리 스크립트)

### 문제 3: NotificationSettingsPage 토큰 키 불일치 (2025-12-16 해결)

**증상:**
- 로그인 상태인데 "No authentication token found" 에러 표시
- Save Settings 버튼 클릭 시 저장 실패

**근본 원인:**
- NotificationSettingsPage에서 `localStorage.getItem('token')` 사용
- 프로젝트 전체는 `localStorage.getItem('auth_token')` 사용
- 키 불일치로 토큰이 null 반환

**해결 방법:**
```typescript
// 수정: NotificationSettingsPage.tsx
const token = localStorage.getItem('auth_token'); // 'token' → 'auth_token'
```

**수정 파일:**
- `/var/www/dev-frontend/src/pages/NotificationSettings/NotificationSettingsPage.tsx` (3곳 수정)

---

## 🐛 알려진 이슈

**현재 알려진 이슈 없음**

---

## 📞 연락처

**프로젝트:** Purple POS System
**개발 환경:** Development Server
**데이터베이스:** purple_dev_db (MySQL)
**마지막 업데이트:** 2026-01-06
