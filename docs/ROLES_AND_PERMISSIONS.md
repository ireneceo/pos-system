# 역할 및 권한 정의

## 역할 계층 구조

```
System Admin (최고 관리자)
├── Brand General (브랜드 총괄)
│   └── Brand Manager (브랜드 매니저)
├── Foodcourt General (푸드코트 총괄)
│   └── Foodcourt Manager (푸드코트 매니저)
└── Restaurant Admin (레스토랑 관리자)
    └── Staff (직원)
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
- 가맹점 생성 (자기 브랜드만)
- Brand Manager 초대 및 가맹점 배정
- 브랜드 표준 메뉴 관리
- 전체 가맹점 메뉴 동기화
- 브랜드별 통합 매출 조회
- 프로모션 관리

### 접근 가능 페이지
- `/brand-general/dashboard`
- `/brand-general/restaurants` (자기 브랜드 가맹점만)
- `/brand-general/menu-sync`
- `/brand-general/reports`
- `/brand-general/managers`

### 제한 사항
- 다른 브랜드 데이터 접근 불가
- 푸드코트 기능 접근 불가
- 시스템 설정 변경 불가

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
- 입점 신청 승인/거부
- 공지사항 작성 및 발송
- 임대료 인보이스 자동 발행
- 문의 티켓 관리
- 입점 업체 매출 통계 조회
- 계약 갱신/해지 관리

### 접근 가능 페이지
- `/foodcourt-general/dashboard`
- `/foodcourt-general/tenants` (입점 업체 목록)
- `/foodcourt-general/announcements`
- `/foodcourt-general/invoices`
- `/foodcourt-general/tickets`
- `/foodcourt-general/reports` (매출 통계 조회만)

### 제한 사항
- 입점 업체 메뉴/가격 수정 불가
- 입점 업체 주문 관리 불가
- 다른 푸드코트 데이터 접근 불가

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

## 6. Restaurant Admin (레스토랑 관리자)

### 권한
- ✅ **자기 레스토랑 완전 관리**: 모든 설정 및 데이터
- ✅ **메뉴 관리**: 메뉴/가격 설정 (브랜드 소속 제외)
- ✅ **주문 관리**: 모든 주문 처리
- ✅ **직원 관리**: Staff 초대 및 관리
- ✅ **리포트**: 자기 레스토랑 매출/통계

### 소유권에 따른 차이
#### A. 독립 레스토랑 (ownership_type: 'independent')
- ✅ 메뉴/가격 완전 자유
- ✅ 모든 설정 자유

#### B. 브랜드 가맹점 (ownership_type: 'franchise')
- ❌ 메뉴/가격: 브랜드 본사에서 관리
- ✅ 운영 설정: 영업시간 등만 가능
- ✅ 주문 관리: 가능

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

## 7. Staff (직원)

### 권한
- ✅ **주문 처리**: 주문 확인 및 상태 변경
- ✅ **POS 사용**: 결제 처리
- ❌ **설정 변경**: 모든 설정 변경 불가
- ❌ **리포트**: 제한적 조회만

### 주요 기능
- 주문 접수 및 처리
- POS 결제
- 재고 확인 (수정 불가)

### 접근 가능 페이지
- `/pos`
- `/orders` (조회 및 상태 변경만)
- `/menu` (조회만)

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
| **인보이스 발행** | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **티켓 답변** | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| **레스토랑 메뉴 수정** | ✅ | ✅ (가맹점) | ❌ | ❌ | ❌ | ✅ (독립만) | ❌ |
| **주문 관리** | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ |
| **매출 조회** | ✅ (전체) | ✅ (브랜드) | ✅ (배정) | ✅ (입점) | 제한적 | ✅ (자기) | 제한적 |

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

## 업데이트 이력
- 2025-11-14: 초기 문서 작성
- 2026-01-28: 재고 관리(Inventory) 역할별 구조 추가
