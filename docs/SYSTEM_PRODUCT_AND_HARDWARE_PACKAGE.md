# 시스템 프로덕트 + 하드웨어 패키지 견적 시스템

> **작성일:** 2026-04-03
> **상태:** 구현 완료 (2026-04-03)

---

## 1. 목표

System Admin이 하드웨어 상품을 등록하고, 세트(패키지)로 묶어서 공개 페이지에 표시.
잠재 고객이 패키지를 선택하고 추가 장비를 구성해 견적을 확인한 후 문의를 제출.
System Admin이 견적을 관리하고, 상담 후 인보이스를 발행.

**소프트웨어 플랜 구독과 완전 분리. 기존 PlanTemplate/PlanPrice는 수정하지 않음.**

---

## 2. 기존 시스템과의 관계

```
소프트웨어 플랜 구독: PlanTemplate + PlanPrice → 자동 Trial 인보이스 → 매월 자동 갱신
하드웨어 견적:        SystemProduct (세트) → 공개 견적 UI → 견적 문의 → Admin 수동 인보이스 (1회성)

서로 독립. 건드리지 않음.
```

---

## 3. 데이터 구조

### 3-1. SystemProductCategory

| 필드 | 타입 | 설명 |
|------|------|------|
| id | INT PK | |
| name | STRING | "Devices", "Printers", "Monitors", "Mini PC", "Accessories" |
| description | TEXT | |
| emoji | STRING(10) | |
| sort_order | INT | |
| is_active | BOOLEAN | |

### 3-2. SystemProduct (개별 상품 + 세트)

개별 상품도, 세트(패키지)도 같은 테이블. 메뉴관리 Product의 is_set_menu 패턴.

| 필드 | 타입 | 설명 |
|------|------|------|
| id | INT PK | |
| category_id | FK → SystemProductCategory | |
| name | STRING | "Xiaomi Pad 7" 또는 "All Tablet - Standard Package" |
| description | TEXT | |
| sku | STRING | 자동생성 SYS-001 |
| image_url | TEXT | |
| emoji | STRING(10) | 선택적 |
| is_active | BOOLEAN | |
| sort_order | INT | |
| **세트 필드 (메뉴 패턴)** | | |
| is_set | BOOLEAN | false=개별, true=세트(패키지) |
| set_items | JSON | [{productId, name, quantity, role_label}] |
| set_display_order | INT | 세트 정렬 |
| **세트 전용 메타** | | |
| set_group | STRING nullable | 'tablet' / 'monitor' |
| set_tier | STRING nullable | 'standard' / 'hybrid' / 'premium' |
| set_use_case | STRING nullable | "소형 매장 / 빠른 도입" |
| set_setup_items | JSON nullable | ["매장 계정 세팅", "장비 연결", ...] |
| is_recommended | BOOLEAN | 추천 뱃지 |
| **배송 설정** | | |
| shipping_countries | JSON | ['MY', 'SG'] — 판매 가능 국가 |
| shipping_settings | JSON | 국가별 배송비/조건 |

**set_items 구조:**
```json
[
  {"productId": 1, "name": "Xiaomi Pad 7", "quantity": 1, "role_label": "POS"},
  {"productId": 1, "name": "Xiaomi Pad 7", "quantity": 1, "role_label": "Kitchen"},
  {"productId": 3, "name": "Redmi Pad SE 8.7", "quantity": 1, "role_label": "Customer"},
  {"productId": 5, "name": "Xprinter XP-T80B", "quantity": 1, "role_label": "Printer"}
]
```

**shipping_settings 구조:**
```json
{
  "MY": {
    "delivery_fee": 0,
    "free_delivery_threshold": null,
    "estimated_days": "3-5",
    "notes": "Peninsular Malaysia free delivery"
  },
  "SG": {
    "delivery_fee": 50,
    "free_delivery_threshold": 5000,
    "estimated_days": "5-7",
    "notes": ""
  }
}
```

### 3-3. SystemProductPrice (통화별 가격)

PlanPrice 패턴.

| 필드 | 타입 | 설명 |
|------|------|------|
| id | INT PK | |
| product_id | FK → SystemProduct | |
| currency | STRING(3) | 'MYR', 'KRW', 'SGD' |
| price | DECIMAL(12,2) | |
| is_active | BOOLEAN | |

Unique: (product_id, currency)

### 3-4. SystemProductAddon (세트-추가상품 연결)

세트 선택 시 추가 가능 상품. 연결 안 된 상품은 공개 페이지에 미표시.

| 필드 | 타입 | 설명 |
|------|------|------|
| id | INT PK | |
| set_product_id | FK (is_set=true) | 세트 상품 |
| addon_product_id | FK (is_set=false) | 추가 가능 상품 |
| addon_label | STRING | "POS 추가", "프린터" |
| max_quantity | INT | 0=무제한 |
| is_inquiry_only | BOOLEAN | "별도 문의" (키오스크) |
| sort_order | INT | |

### 3-5. HardwareQuote (견적 문의)

ContactInquiry 패턴.

| 필드 | 타입 | 설명 |
|------|------|------|
| id | INT PK | |
| quote_number | STRING | "QUO-260403001" |
| user_id | FK nullable | 로그인 시 연결 |
| restaurant_id | FK nullable | 기존 회원 |
| contact_name | STRING | |
| contact_email | STRING | |
| contact_phone | STRING | |
| company_name | STRING | |
| message | TEXT | 고객 메모 |
| country_code | STRING(2) | |
| currency | STRING(3) | |
| package_product_id | FK → SystemProduct | 선택한 세트 |
| package_snapshot | JSON | 세트 구성 스냅샷 |
| addon_items | JSON | [{product_id, name, quantity, unit_price, subtotal}] |
| package_price | DECIMAL | |
| addon_total | DECIMAL | |
| total_amount | DECIMAL | |
| status | ENUM | 'new'/'contacted'/'confirmed'/'invoiced'/'cancelled' |
| assigned_to | INT nullable | |
| admin_notes | TEXT | |
| invoice_id | FK nullable | 발행 인보이스 |
| replied_at | DATE | |
| confirmed_at | DATE | |
| invoiced_at | DATE | |

---

## 4. 통화 vs 국가 분리

- **통화 (가격 표시)**: SystemProductPrice — product_id + currency → price
- **국가 (판매/배송)**: SystemProduct.shipping_countries + shipping_settings
- IP 감지 → 국가 확인 → 해당 국가 상품만 표시 + 통화 매핑
- 기존 PricingPage ipapi.co 감지 패턴 재사용

---

## 5. 유저 흐름

### 5-1. PackagesPage (/packages, 공개)

```
① IP → 국가 감지 → 해당 국가 세트만 로드 (없으면 "준비 중" 안내)
② 그룹 선택 (set_group: tablet / monitor) — 2장 카드
③ 세트 카드 3장 (set_tier) — 구성품 + 세팅 + 가격 + RECOMMENDED 뱃지
④ 세트 선택 → 추가 장비 활성화 (SystemProductAddon)
⑤ 수량 조절 → 실시간 합계 → Sticky 견적 바
⑥ "견적 문의하기" → 모달 (이름/이메일/전화/메모)
   → HardwareQuote 저장 → 확인 이메일 → Admin 알림
```

### 5-2. Admin: Hardware Quotes (/pos/admin/hardware-quotes)

```
Stats: [전체] [신규] [상담중] [확정] [발행완료]
필터 + 검색 → 카드 목록 → 상세 모달

상세 모달:
  고객 정보 + 견적 내역(패키지+추가장비+합계) + 상태 변경 + 내부 메모
  [유저 연결] — 기존 회원 검색/연결
  [인보이스 발행] — 가격 조정/할인 가능 → Invoice + InvoiceItems 생성
    invoice_category: 'hardware' (기존 카테고리 활용)
    InvoiceItem: 'hardware_package' + 'hardware_addon'
    HardwareQuote.status → 'invoiced', invoice_id 연결
```

---

## 6. Admin 관리 UI

### System Products (/pos/admin/system-products)

BrandProductManagementPage 패턴 복제. **2탭: Products, Categories**

**Products 탭:**
- 카드 그리드 (메뉴관리 패턴)
- SET 뱃지
- 복제, 활성토글, 편집, 삭제
- 카테고리 필터 + 검색

**상품 생성/수정 모달:**
- SKU, 이름, 설명, 카테고리, 이모지, 이미지
- 통화별 가격 입력 (PlanPrice 패턴)
- 배송 설정: 판매 국가 체크박스 + 국가별 배송비/조건

**세트 생성 모달 (메뉴관리 세트 패턴):**
- 세트명, 세트 가격(통화별), 카테고리
- set_group, set_tier, set_use_case, set_setup_items, is_recommended
- 구성품: 상품 검색 → role_label + quantity
- 추가 가능 상품(addon): 상품 검색 → addon_label + max_quantity + 별도문의

**Categories 탭:** CategoryManagement 그대로

### Hardware Quotes (/pos/admin/hardware-quotes)

ContactInquiriesPage 패턴 복제 + 인보이스 발행 기능

### 사이드바

```
Products & Hardware
├─ System Products
└─ Hardware Quotes
```

---

## 7. API 설계

### 공개 (비인증)

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | /api/public/packages?country=MY | 국가별 세트+addon+가격 |
| POST | /api/public/hardware-quotes | 견적 문의 제출 |

### System Admin

**상품 (menu.js 패턴)**
- GET /api/system-products
- POST /api/system-products
- PUT /api/system-products/:id
- DELETE /api/system-products/:id
- POST /api/system-products/:id/copy
- PUT /api/system-products/:id/toggle-active

**가격 (currencies.js plans 패턴)**
- GET /api/system-products/:id/prices
- PUT /api/system-products/:id/prices

**세트 addon**
- GET /api/system-products/:id/addons
- PUT /api/system-products/:id/addons

**카테고리 (categories.js 패턴)**
- GET /api/system-product-categories
- POST /api/system-product-categories
- PUT /api/system-product-categories/:id
- PUT /api/system-product-categories/reorder
- DELETE /api/system-product-categories/:id

**견적 (ContactInquiry 패턴)**
- GET /api/hardware-quotes
- GET /api/hardware-quotes/:id
- PATCH /api/hardware-quotes/:id
- POST /api/hardware-quotes/:id/invoice
- DELETE /api/hardware-quotes/:id
- GET /api/hardware-quotes/stats

---

## 8. 이메일

- **견적 접수 확인** (고객에게): ContactInquiry 확인 메일 패턴
- **새 견적 알림** (Admin에게): ContactInquiry Admin 알림 패턴
- **인보이스 발행 알림** (고객에게): 기존 인보이스 이메일 패턴

---

## 9. BrandProduct 보강 (Phase 0, 선행 작업)

SystemProduct 복제 전에 BrandProduct를 메뉴관리 수준으로 올림.

| 추가 기능 | 필드/엔드포인트 | 패턴 원본 |
|----------|---------------|----------|
| 세트/콤보 | is_set_menu, set_items, set_display_order | Product.js |
| 이모지 | emoji | Product.js |
| 복제 | POST /:id/copy | menu.js |
| 활성 토글 | PUT /:id/toggle-active | menu.js |

---

## 10. 파일 목록

### Phase 0: BrandProduct 보강
- 수정: models/BrandProduct.js
- 수정: routes/brand-products.js
- 수정: pages/BrandProductManagement/BrandProductsTab.tsx

### Phase A: 모델 5개 + DB
- 신규: models/SystemProduct.js
- 신규: models/SystemProductCategory.js
- 신규: models/SystemProductPrice.js
- 신규: models/SystemProductAddon.js
- 신규: models/HardwareQuote.js
- 수정: models/index.js

### Phase B: 라우트
- 신규: routes/system-products.js
- 신규: routes/system-product-categories.js
- 신규: routes/hardware-quotes.js
- 수정: routes/public.js
- 수정: server.js

### Phase C: 프론트엔드
- 신규: pages/Admin/SystemProductManagementPage.tsx
- 신규: pages/Admin/HardwareQuotesPage.tsx
- 신규: pages/Landing/PackagesPage.tsx
- 수정: App.tsx
- 수정: components/Layout/MainLayout.tsx
- 수정: pages/Landing/PricingPage.tsx

---

## 11. 구현 순서

| Phase | 내용 |
|-------|------|
| **0** | BrandProduct 보강 (세트/이모지/복제/토글) |
| **A** | 모델 5개 + DB sync + association |
| **B** | system-products + system-product-categories 라우트 |
| **C** | Admin SystemProductManagementPage (2탭) |
| **D** | Public API + PackagesPage |
| **E** | hardware-quotes 라우트 + HardwareQuotesPage |
| **F** | 견적→인보이스 발행 + 이메일 |

---

## 12. 제외한 것 (불필요)

| 항목 | 제외 이유 |
|------|----------|
| SystemProductOptionGroup/Option | 하드웨어는 모델명 자체가 상품, 옵션 불필요. 발주 통합 시 추가 |
| unit/base_quantity/min_order_quantity | 견적용이라 불필요. 발주 통합 시 추가 |
| soldOut | is_active로 충분 |
| is_featured | 세트의 is_recommended로 충분 |
| PlanTemplate 수정 | 소프트웨어 구독과 완전 분리 |
| HardwarePackage 별도 테이블 | 세트 기능으로 대체 |

---

## 13. 미래 확장

- BrandProduct + SupplierProduct + SystemProduct 통합 발주 시스템
  → 동일 구조(카테고리+상품+가격)이므로 product_source 구분으로 통합 가능
- BrandProduct에도 shipping_countries/shipping_settings 동일 패턴 적용 가능
- 옵션 그룹 필요 시 동일 패턴으로 추가 가능
