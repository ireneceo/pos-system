# CSV 데이터 마이그레이션 시스템

> **작성일**: 2026-03-24
> **목적**: 기존 POS 시스템에서 데이터를 이관하기 위한 CSV 업로드 + 자동 매핑

---

## 4단계 순차 임포트

이전 단계 데이터가 다음 단계의 매칭 기준이 됨.

```
1단계: 카테고리 CSV → categories 테이블
2단계: 메뉴 CSV → products 테이블 (카테고리 이름 → category_id 매칭)
3단계: 옵션 CSV (선택) → option_groups + options (메뉴 이름 → product_id 매칭)
4단계: 주문 CSV → orders + order_items (메뉴 이름 → product_id 매칭)
```

---

## 단계별 매핑 대상

### Step 1: 카테고리
| 필수 | 선택 |
|------|------|
| name | display_order, description |

### Step 2: 메뉴
| 필수 | 선택 |
|------|------|
| name, price | category(이름→category_id), description, sku |

### Step 3: 옵션 (선택)
| 필수 | 선택 |
|------|------|
| menu_item(이름→product_id), group_name, option_name | option_price |

### Step 4: 주문
| 필수 | 선택 |
|------|------|
| date, total_amount | item_name(→product_id), quantity, unit_price, payment_method, order_type |

주문 두 가지 형식:
- **요약** (1행=1주문): date, total_amount, payment_method → 매출 집계용
- **상세** (1행=1아이템): date, item_name, quantity, unit_price → 메뉴 분석까지

---

## 자동 매핑 로직

CSV 컬럼명 → 정규화(소문자, 공백/언더스코어/하이픈 제거) → DB 필드명 매칭

```
"Product Name"  → "productname"  → name ✅
"product_name"  → "productname"  → name ✅
"PRICE"         → "price"        → price ✅
"Order Date"    → "orderdate"    → date ✅
```

동의어 사전으로 fuzzy match:
```javascript
const COLUMN_ALIASES = {
  name: ['product name', 'item name', 'menu item', 'item', 'product', 'menu'],
  price: ['unit price', 'sell price', 'selling price', 'amount', 'menu price'],
  category: ['category name', 'group', 'type', 'menu category', 'section'],
  date: ['order date', 'transaction date', 'sale date', 'datetime', 'timestamp'],
  total_amount: ['total', 'amount', 'grand total', 'net amount', 'sale amount'],
  payment_method: ['payment', 'payment type', 'pay method', 'tender'],
  item_name: ['product', 'item', 'menu item', 'product name', 'description'],
  quantity: ['qty', 'count', 'units', 'no of items'],
  ...
};
```

---

## UI 흐름

Settings > Import Data 탭

1. 단계 선택 (Categories → Menu → Options → Orders)
2. CSV 파일 업로드 (드래그앤드롭)
3. 미리보기 (처음 5행)
4. 컬럼 매핑 (자동 + 수동 드롭다운 보정)
5. 중복 처리 옵션 (Skip / Update)
6. Import 실행
7. 결과 보고 (성공/실패/스킵 건수)

---

## API

```
POST /api/import/preview         — CSV 파싱 + 자동 매핑 결과
POST /api/import/execute-categories — 카테고리 임포트
POST /api/import/execute-menu    — 메뉴 임포트 (카테고리 매칭)
POST /api/import/execute-options — 옵션 임포트 (메뉴 매칭)
POST /api/import/execute-orders  — 주문 임포트 (메뉴 매칭)
GET  /api/import/match-items     — 이름 기반 매칭 후보 조회
```

---

## 수정 파일

| 파일 | 변경 |
|------|------|
| routes/import.js | 신규 — preview + execute API |
| server.js | import 라우트 등록 |
| SettingsPage.tsx | Import Data 탭 추가 |
