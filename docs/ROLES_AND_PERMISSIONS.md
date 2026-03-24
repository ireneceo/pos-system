# 역할 및 권한 정의

## 역할 계층 구조

```
System Admin (최고 관리자)
├── Brand General (브랜드 총괄)
│   └── Brand Manager (브랜드 매니저)
├── Foodcourt General (푸드코트 총괄)
│   └── Foodcourt Manager (푸드코트 매니저)
├── Restaurant Owner (레스토랑 소유자) ← NEW (재무/통계, N개 레스토랑)
└── Restaurant Admin (레스토랑 관리자)
    └── Restaurant Staff (직원)
```

---

## 1. System Admin (시스템 관리자)

### 권한
- ✅ **전체 시스템 관리**: 모든 데이터 조회/수정/삭제
- ✅ **사용자 관리**: 모든 역할의 사용자 생성/수정/삭제
- ✅ **역할 부여**: Brand General, Foodcourt General 역할 부여
- ✅ **레스토랑 관리**: 모든 레스토랑 생성/수정/삭제
- ❌ **브랜드 생성**: Brand General이 직접 생성
- ❌ **푸드코트 생성**: Foodcourt General이 직접 생성

### 주요 기능
- 사용자에게 "Brand General" 또는 "Foodcourt General" 역할 부여
- 레스토랑 생성 시 기존 브랜드/푸드코트 선택 (이미 생성된 것만)
- 전체 매출/통계 조회
- 플랜 및 구독 관리
- 모든 데이터 조회/수정 권한
- **7-Day Free Trial 부여** (System Admin만 가능)

### 접근 가능 페이지
- `/admin/*` (모든 관리자 페이지)
- `/restaurants/*` (모든 레스토랑)
- `/brands/*` (모든 브랜드)
- `/foodcourts/*` (모든 푸드코트)

---

## 2. Brand General (브랜드 총괄)

### 권한
- ✅ **브랜드 생성**: 자기가 직접 브랜드 생성 (시스템 관리자가 역할 부여 후)
- ✅ **자기 브랜드 관리**: 브랜드 정보(이름, 로고 등) 수정
- ✅ **매니저 초대**: Brand Manager 초대 및 관리
- ✅ **가맹점 관리**: 브랜드 소속 레스토랑 추가/관리
- ✅ **메뉴 관리**: 브랜드 표준 메뉴 설정 및 동기화
- ✅ **통합 리포트**: 전체 가맹점 통합 매출/통계
- ❌ **다른 브랜드**: 조회/수정 불가

### 주요 기능
- **브랜드 생성**: 로그인 후 처음으로 브랜드 정보 입력 (이름, 로고, 설명)
- 가맹점(레스토랑) **신규 생성** → 자동으로 자기 브랜드에 연결 (`brand_id` 자동 설정)
- Brand Manager 초대 및 관리 (Brand Manager는 Brand General과 동일 화면, 권한 분리 예정)
- 브랜드 표준 메뉴 관리
- 전체 가맹점 메뉴 동기화
- 브랜드별 통합 매출 조회
- 구독 플랜 생성 및 소속 레스토랑에 인보이스 발행

### 접근 가능 페이지
- `/pos/brand/general/dashboard`
- `/pos/manager/restaurants` (자기 브랜드 가맹점만)
- `/pos/brand/general/management` (브랜드 정보 관리)
- 공유 매니저 라우트 (`/pos/manager/*`)

### 제한 사항
- 다른 브랜드 데이터 접근 불가
- 푸드코트 기능 접근 불가
- 시스템 설정 변경 불가
- **기존 레스토랑을 자기 브랜드로 연결 불가** (System Admin만 가능)
- **Oversight Manager 배정 불가** (System Admin만 가능)
- **7-Day Trial 부여 불가** (System Admin만 가능)

---

## 3. Brand Manager (브랜드 매니저)

### 권한
- ✅ **배정된 가맹점 관리**: Brand General이 배정한 레스토랑만 관리
- ✅ **운영 설정**: 영업시간, 프로모션 등 운영 관련 설정만
- ❌ **메뉴/가격**: 브랜드 본사에서 관리 (수정 불가)
- ❌ **가맹점 추가**: Brand General만 가능

### 주요 기능
- 배정된 가맹점 주문 관리
- 운영 설정 (영업시간, 휴무일 등)
- 재고 관리
- 가맹점별 매출 리포트

### 접근 가능 페이지
- `/brand/dashboard`
- `/brand/assigned-restaurants` (배정된 가맹점만)
- `/brand/orders`
- `/brand/reports`

### 제한 사항
- 메뉴/가격 수정 불가 (본사 통제)
- 배정되지 않은 가맹점 접근 불가
- 다른 Brand Manager 관리 불가

---

## 4. Foodcourt General (푸드코트 총괄)

### 권한
- ✅ **푸드코트 생성**: 자기가 직접 푸드코트 생성 (시스템 관리자가 역할 부여 후)
- ✅ **자기 푸드코트 관리**: 푸드코트 정보(이름, 위치 등) 수정
- ✅ **매니저 초대**: Foodcourt Manager 초대 및 관리
- ✅ **입점 관리**: 입점 신청 승인/거부
- ✅ **공지사항**: 입점 업체에게 공지 발송
- ✅ **인보이스 발행**: 임대료/관리비 청구
- ✅ **계약 관리**: 임대 계약 관리
- ✅ **매출 조회**: 입점 업체 매출 통계 (읽기 전용)
- ❌ **레스토랑 운영**: 메뉴/가격/주문 관리 불가

### 주요 기능
- **푸드코트 생성**: 로그인 후 처음으로 푸드코트 정보 입력 (이름, 위치, 주소)
- 입점 레스토랑 **신규 생성** → 자동으로 자기 푸드코트에 연결 (`foodcourt_id` 자동 설정)
- Foodcourt Manager 초대 및 관리 (Foodcourt Manager는 동일 화면, 권한 분리 예정)
- 공지사항 작성 및 발송
- 임대료 인보이스 자동 발행
- 문의 티켓 관리
- 입점 업체 매출 통계 조회
- 구독 플랜 생성 및 입점 레스토랑에 인보이스 발행

### 접근 가능 페이지
- `/pos/foodcourt/general/dashboard`
- `/pos/manager/restaurants` (자기 푸드코트 입점 레스토랑만)
- `/pos/foodcourt/general/management` (푸드코트 정보 관리)
- 공유 매니저 라우트 (`/pos/manager/*`)

### 제한 사항
- 입점 업체 메뉴/가격 수정 불가
- 입점 업체 주문 관리 불가
- 다른 푸드코트 데이터 접근 불가
- **기존 레스토랑을 자기 푸드코트로 연결 불가** (System Admin만 가능)
- **Oversight Manager 배정 불가** (System Admin만 가능)
- **7-Day Trial 부여 불가** (System Admin만 가능)

---

## 5. Foodcourt Manager (푸드코트 매니저)

### 권한
- ✅ **공지사항**: 공지 작성 및 발송
- ✅ **티켓 관리**: 입점 업체 문의 답변
- ✅ **입점 현황 조회**: 입점 업체 목록 및 현황
- ❌ **인보이스 발행**: Foodcourt General만 가능
- ❌ **계약 관리**: Foodcourt General만 가능

### 주요 기능
- 공지사항 작성
- 입점 업체 문의 답변
- 시설 관리 지원
- 입점 현황 조회

### 접근 가능 페이지
- `/foodcourt/dashboard`
- `/foodcourt/tenants` (조회만)
- `/foodcourt/announcements`
- `/foodcourt/tickets`

### 제한 사항
- 인보이스 발행 불가
- 계약 관리 불가
- 매출 통계 조회 제한적

---

## 6. Restaurant Owner (레스토랑 소유자) - NEW

### 권한
- ✅ **소유 레스토랑 통합 대시보드**: 여러 레스토랑의 매출/주문 통합 조회
- ✅ **레스토랑별 상세 통계**: 일/주/월/년 매출, 주문유형별, 결제수단별 분석
- ✅ **레스토랑 간 비교 통계**: 매출/주문수/평균 주문가 비교
- ✅ **주문 내역 조회**: 읽기 전용 (처리 불가)
- ✅ **인보이스 조회**: 모든 issuer의 인보이스 확인
- ✅ **인보이스 결제**: payment_model='restaurant_owner'일 때 결제 제출
- ❌ **메뉴 관리**: Restaurant Admin 영역
- ❌ **주문 처리**: Restaurant Admin/Staff 영역
- ❌ **직원 관리**: Restaurant Admin 영역
- ❌ **POS 터미널**: Restaurant Admin/Staff 영역
- ❌ **레스토랑 설정 변경**: Restaurant Admin 영역

### 주요 기능
- Owner는 여러 레스토랑을 소유 (N:M via restaurant_managers.relationship_type='ownership')
- Brand/Foodcourt 소속 여부와 독립적 (동시 존재 가능)
- System Admin만 Owner 계정 생성 및 레스토랑 연결 가능
- 재무/통계 전문 역할 (현장 운영은 Restaurant Admin 담당)

### 접근 가능 페이지
- `/pos/owner/dashboard` (통합 대시보드)
- `/pos/owner/restaurants` (소유 레스토랑 목록)
- `/pos/owner/statistics` (비교 통계)
- `/pos/owner/orders` (주문 내역 - 읽기 전용)
- `/pos/owner/reports` (리포트)
- `/pos/owner/invoices` (인보이스)
- `/pos/profile` (프로필)

### 제한 사항
- 레스토랑 현장 운영 기능 전무 (메뉴, 주문처리, POS, 직원관리 없음)
- System Admin만 Owner에 레스토랑 연결/해제 가능
- Owner가 있다고 Brand/Foodcourt General의 감독 권한이 변하지 않음

---

## 7. Restaurant Admin (레스토랑 관리자)

### 권한
- ✅ **자기 레스토랑 완전 관리**: 모든 설정 및 데이터
- ✅ **메뉴 관리**: 메뉴/가격 설정 (브랜드 소속 제외)
- ✅ **주문 관리**: 모든 주문 처리
- ✅ **직원 관리**: Staff 생성/수정/삭제, PIN 설정, 메뉴 권한(permissions) 설정, Staff 승격
- ✅ **리포트**: 자기 레스토랑 매출/통계
- ✅ **코스트 오버라이드**: Brand 재료에 대한 My Cost 설정/수정/삭제 (원본 Brand Cost는 변경 불가)

### 소유권에 따른 차이
#### A. 독립 레스토랑 (ownership_type: 'independent')
- ✅ 메뉴/가격 완전 자유
- ✅ 모든 설정 자유

#### B. 브랜드 가맹점 (ownership_type: 'franchise')
- ❌ 메뉴/가격: 브랜드 본사에서 관리
- ✅ 운영 설정: 영업시간 등만 가능
- ✅ 주문 관리: 가능
- ✅ **코스트 오버라이드**: Brand 재료에 My Cost 설정 가능 (레시피/제품 원가에 자동 반영)

#### C. 푸드코트 입점 (ownership_type: 'foodcourt')
- ✅ 메뉴/가격: 자유
- ✅ 모든 설정: 자유
- 📬 추가 기능: 푸드코트 공지/인보이스/티켓

#### D. 브랜드 + 푸드코트 (ownership_type: 'both')
- ❌ 메뉴/가격: 브랜드 본사에서 관리
- ✅ 운영 설정만 가능
- 📬 추가 기능: 푸드코트 공지/인보이스/티켓

### 접근 가능 페이지
- `/restaurant/:id/dashboard`
- `/restaurant/:id/menu` (독립 레스토랑만 수정 가능)
- `/restaurant/:id/orders`
- `/restaurant/:id/settings`
- `/restaurant/:id/reports`
- `/restaurant/:id/announcements` (푸드코트 입점 시)
- `/restaurant/:id/invoices` (푸드코트 입점 시)
- `/restaurant/:id/tickets` (푸드코트 입점 시)

---

## 8. Restaurant Staff (직원)

### 생성 및 관리
- **생성 가능한 역할**: Restaurant Admin, System Admin
- **생성 위치**: Restaurant Admin → `/pos/staff`, System Admin → `/admin/staff`
- **필수 필드**: Username(Staff ID), Full Name, Email, PIN Code(4자리)
- **선택 필드**: Phone, Department, Company Name
- **비밀번호**: 자동 생성 (12자 강력 비밀번호), 생성 시 한 번만 표시
- **PIN 코드**: 4자리 숫자, 레스토랑 내 유니크 (POS 캐셔 전환용)

### 권한 체계 (Menu Visibility 방식)

Staff의 권한은 **메뉴 보이기/숨기기**로 제어됨. Restaurant Admin이 Staff 생성/수정 시 토글로 설정.

**항상 접근 가능 (Core Menus):**
- Dashboard
- POS Terminal
- Live Orders
- Kitchen Display
- Customer Display
- Mobile Order
- Profile

**선택적 접근 (6개 메뉴 그룹, 토글 방식):**

| 그룹 키 | 표시명 | 포함 메뉴 |
|---------|--------|----------|
| `menu_management` | Products | Menu / Categories / Options / Recipe |
| `inventory` | Stock Management | Suppliers / Inventory |
| `marketing` | Marketing | Customers / Coupons |
| `reports` | Analytics | Reports / Activity History |
| `support` | Support | Invoices / Inquiries |
| `settings` | Settings | Store / Company / Notifications |

**저장 방식**: `User.permissions` 필드에 JSON 배열 (`["menu_management", "reports"]`)

### PIN 기반 POS 캐셔 전환
- POS 터미널 상단 "Cashier: [이름] ▼" 클릭 → PIN 입력 모달
- 4자리 PIN 입력 시 자동 인증 (`POST /api/staff/verify-pin`)
- **전체 로그인 컨텍스트 전환**: 새 JWT 토큰 발급, AuthContext 유저 교체
- 페이지 리로드 없이 즉시 전환
- 전환 후 새 유저의 메뉴 권한이 즉시 적용됨
- Restaurant Admin도 PIN이 있으면 동일하게 전환 가능

### 주요 기능
- 주문 접수 및 처리 (POS Terminal)
- POS 결제
- 라이브 주문 모니터링
- 권한에 따라 추가 메뉴 접근 (재고, 리포트 등)

### 접근 가능 페이지
- `/pos/terminal` (POS Terminal)
- `/pos/live-orders` (Live Orders)
- `/pos/kitchen-display` (Kitchen Display)
- `/pos/customer-display` (Customer Display)
- `/pos/mobile` (Mobile Order)
- `/pos/dashboard` (Dashboard)
- `/pos/profile` (Profile)
- + 권한 설정에 따른 추가 메뉴들

### Staff 승격 (Promote)
- Restaurant Admin이 Staff를 Restaurant Admin으로 승격 가능
- 승격 시 permissions 필드 초기화 (Restaurant Admin은 모든 메뉴 접근)
- 승격된 유저의 역강은 불가 (Restaurant Admin → Staff 불가)

---

## 권한 매트릭스

| 기능 | System Admin | Brand General | Brand Manager | Foodcourt General | Foodcourt Manager | Restaurant Admin | Staff |
|------|--------------|---------------|---------------|-------------------|-------------------|------------------|-------|
| **브랜드 생성** | ❌ | ✅ (자기것) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **브랜드 수정** | ✅ (모든것) | ✅ (자기것만) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **가맹점 추가** | ✅ | ✅ (자기것만) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **메뉴 동기화** | ✅ | ✅ (자기것만) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **푸드코트 생성** | ❌ | ❌ | ❌ | ✅ (자기것) | ❌ | ❌ | ❌ |
| **입점 승인** | ✅ | ❌ | ❌ | ✅ (자기것만) | ❌ | ❌ | ❌ |
| **공지 발송** | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| **인보이스 발행** | ✅ | ✅ (소속 Restaurant) | ❌ | ✅ | ❌ | ❌ | ❌ |
| **인보이스 결제** | ❌ | ✅ (SA→Brand) | ✅ (SA→Brand) | ✅ (SA→FC) | ✅ (SA→FC) | ✅ (상위→Rest) | ❌ |
| **결제 확인/거절** | ✅ (전체) | ✅ (자기 발행) | ❌ | ✅ (자기 발행) | ❌ | ❌ | ❌ |
| **티켓 답변** | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| **레스토랑 메뉴 수정** | ✅ | ✅ (가맹점) | ❌ | ❌ | ❌ | ✅ (독립만) | ❌ |
| **주문 관리** | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ |
| **매출 조회** | ✅ (전체) | ✅ (브랜드) | ✅ (배정) | ✅ (입점) | 제한적 | ✅ (자기) | 권한 필요 |
| **7-Day Trial 부여** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Staff 생성** | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **PIN 캐셔 전환** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| **Staff 권한 설정** | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |

---

## API 권한 체크 예시

```javascript
// 미들웨어: 브랜드 관리자 권한
function canManageBrand(req, res, next) {
  const { brand_id } = req.params;
  const user = req.user;

  // System Admin은 모든 브랜드
  if (user.role === 'System Admin') return next();

  // Brand General은 자기 브랜드만
  if (user.role === 'Brand General' && user.brand_id === parseInt(brand_id)) {
    return next();
  }

  return res.status(403).json({ error: '권한 없음' });
}

// 미들웨어: 레스토랑 메뉴 수정 권한
function canEditMenu(req, res, next) {
  const { restaurant_id } = req.params;
  const user = req.user;

  // System Admin은 모든 레스토랑
  if (user.role === 'System Admin') return next();

  const restaurant = await Restaurant.findByPk(restaurant_id);

  // 브랜드 가맹점은 메뉴 수정 불가
  if (restaurant.brand_id) {
    // Brand General만 수정 가능
    if (user.role === 'Brand General' && user.brand_id === restaurant.brand_id) {
      return next();
    }
    return res.status(403).json({ error: '가맹점 메뉴는 브랜드 본사에서 관리합니다' });
  }

  // 독립 레스토랑은 Restaurant Admin만
  if (user.role === 'Restaurant Admin' && user.restaurant_id === restaurant_id) {
    return next();
  }

  return res.status(403).json({ error: '권한 없음' });
}
```

---

## 데이터 접근 제어

### 브랜드 데이터
```javascript
// Brand General: 자기 브랜드만
WHERE brand_id = user.brand_id

// Brand Manager: 배정된 레스토랑만
WHERE restaurant_id IN (assigned_restaurant_ids)
```

### 푸드코트 데이터
```javascript
// Foodcourt General/Manager: 자기 푸드코트만
WHERE foodcourt_id = user.foodcourt_id
```

### 레스토랑 데이터
```javascript
// Restaurant Admin: 자기 레스토랑만
WHERE restaurant_id = user.restaurant_id

// Brand General: 브랜드 소속 레스토랑만
WHERE brand_id = user.brand_id

// Foodcourt General: 입점 레스토랑만 (조회만)
WHERE foodcourt_id = user.foodcourt_id
```

---

## 재고 관리 (Inventory) 역할별 구조

### Brand General (브랜드 총괄) - 재고 관리

**범위:** 회사(브랜드제너럴) 단위 전체 재고 관리

| 기능 | 데이터 범위 | 설명 |
|------|------------|------|
| **Ingredients (재료)** | Product Recipe의 재료 | 브랜드와 상관없이 회사 전체 Product Recipe에 등록된 재료 |
| **General Stock (일반재고)** | 회사 전체 일반재고 | 포장재, 소모품 등 회사 전체에서 관리하는 재고 |
| **Categories (카테고리)** | 회사 전체 카테고리 | 일반재고 카테고리 (회사 단위) |
| **Suppliers (공급업체)** | 회사 전체 공급업체 | `/api/suppliers` 사용 (회사 단위) |

**주요 특징:**
- 브랜드(개별 브랜드)와 상관없이 **브랜드제너럴 회사** 단위로 재고 관리
- Product Recipe 재료 = 모든 브랜드의 제품 레시피에 사용되는 재료
- 레시피(Recipes)는 브랜드별로 관리하지만, **재고 관리는 회사 단위**

### Restaurant Admin (레스토랑 관리자) - 재고 관리

**범위:** 해당 레스토랑 단위 재고 관리

| 기능 | 데이터 범위 | 설명 |
|------|------------|------|
| **Ingredients (재료)** | 해당 레스토랑 재료 | 레스토랑에 등록된 재료 (연결된 브랜드 레시피 기반) |
| **General Stock (일반재고)** | 해당 레스토랑 일반재고 | 레스토랑 자체 일반재고 |
| **Categories (카테고리)** | 레스토랑 + 브랜드 카테고리 | 브랜드 공통 카테고리 + 레스토랑 자체 카테고리 |
| **Suppliers (공급업체)** | 해당 레스토랑 공급업체 | `/api/restaurants/:id/suppliers` 사용 |

**주요 특징:**
- **해당 레스토랑에 연결된 브랜드**의 재료/재고만 접근
- 브랜드 소속 레스토랑: 브랜드 레시피 기반 재료 사용
- 독립 레스토랑: 자체 재료/재고 관리

### API 엔드포인트 비교

| 역할 | Ingredients API | General Stock API | Categories API | Suppliers API |
|------|----------------|-------------------|----------------|---------------|
| **Brand General** | `/api/product-ingredients` | `/api/general-stock` (회사 단위) | `/api/general-stock-categories` (회사 단위) | `/api/suppliers` |
| **Restaurant Admin** | `/api/restaurants/:id/inventory` | `/api/restaurants/:id/inventory/general-stock` | `/api/restaurants/:id/general-stock-categories` | `/api/restaurants/:id/suppliers` |

### 중요: Brand vs Brand General 구분

| 용어 | 의미 | 예시 |
|------|------|------|
| **Brand General (브랜드제너럴)** | 여러 브랜드를 소유한 **회사** | "ABC 외식 그룹" |
| **Brand (브랜드)** | Brand General이 소유한 **개별 브랜드** | "스타벅스", "투썸플레이스" |

- **레시피 (Recipes):** 브랜드별로 관리 (각 브랜드마다 다른 레시피)
- **재고 관리 (Inventory):** 회사(Brand General) 단위로 통합 관리
- **공급업체 (Suppliers):** 회사(Brand General) 단위로 관리

---

## 레스토랑 관리 역할별 차이

### 페이지 구조
| 역할 | 페이지 | 비고 |
|------|--------|------|
| System Admin | `Admin/RestaurantsPage.tsx` | 기준 페이지 (모든 기능) |
| Brand General, Brand Manager, Foodcourt General, Foodcourt Manager | `Manager/RestaurantsPage.tsx` | 공유 페이지 (현재 권한 동일, 분리 예정) |

### 레스토랑 등록 시 역할별 차이

| 항목 | System Admin | Brand General, Foodcourt General (+ Manager) |
|------|:---:|:---:|
| 레스토랑 신규 생성 | ✅ | ✅ |
| Brand/Foodcourt 선택 | ✅ (드롭다운) | ❌ (자동 연결) |
| 기존 레스토랑 검색/연결 | ✅ | ❌ |
| Restaurant Admin 생성/배정 | ✅ | ✅ |
| Oversight Manager 배정 | ✅ | ❌ (자동: 자기 자신만) |
| 7-Day Free Trial | ✅ | ❌ |
| Status 직접 선택 | ❌ (Trial 체크박스) | ❌ |
| Business Registration / Tax ID | ✅ | ✅ |

### Brand/Foodcourt General 자동 연결 규칙
- Brand General이 레스토랑 생성 → `brand_id = 자기 브랜드 ID` 자동 설정
- Foodcourt General이 레스토랑 생성 → `foodcourt_id = 자기 푸드코트 ID` 자동 설정
- Brand/Foodcourt Manager도 동일 (General과 같은 화면, 권한 분리는 추후)

### Brand Manager / Foodcourt Manager 현재 상태 (2026-02-11)
- General과 **동일한 화면/권한** (사이드바, 라우트 모두 공유)
- 고객에게는 General 아이디만 제공 (Manager 아이디는 미제공)
- 권한 분리는 추후 개발 예정

---

## 업데이트 이력
- 2025-11-14: 초기 문서 작성
- 2026-01-28: 재고 관리(Inventory) 역할별 구조 추가
- 2026-02-11: 7-Day Trial 권한 명시, 레스토랑 관리 역할별 차이 추가, Brand/Foodcourt General 제한사항 보강
- 2026-02-23: Staff 섹션 대폭 보강 (PIN 캐셔 전환, Menu Visibility 권한 체계, 생성/관리/승격), 권한 매트릭스 Staff 항목 추가
- 2026-03-06: 권한 매트릭스에 인보이스 결제/결제확인 행 추가, Brand General 인보이스 발행 권한 ✅로 수정
