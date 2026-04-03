# 시재 관리 + 발주 관리 통합 기획서

> **작성일:** 2026-04-03
> **상태:** 기획 완료, 구현 대기
> **의존성:** 기존 재고/재료/공급업체 시스템 (구현 완료) 위에 확장

---

## 1. 현재 구현 상태

### 구현 완료 (활용 가능)

| 영역 | 모델 | 라우트 | 프론트 | 비고 |
|------|:---:|:---:|:---:|------|
| 재료 (Ingredient) | ✅ | ✅ | ✅ | 멀티테넌트, 원가, PAR 레벨, track_stock |
| 재료 카테고리 | ✅ | ✅ | ✅ | 분류/정렬 |
| 재료 원가 | ✅ | ✅ | ✅ | 브랜드 원가 + 레스토랑별 오버라이드 (IngredientCost, RestaurantIngredientCost) |
| 재고 배치 (InventoryBatch) | ✅ | ✅ | ◐ | purchase_order_id FK 준비됨, 입고 UI 없음 |
| 재고 트랜잭션 | ✅ | ✅ | ◐ | type ENUM에 'purchase' 이미 포함 |
| 재고 알림 (StockAlert) | ✅ | ✅ | ✅ | low_stock/out_of_stock 자동 |
| 재고 실사 (StockTake) | ✅ | ✅ | ✅ | 실사 + 과부족 분석 UI |
| 공급업체 (Supplier) | ✅ | ✅ | ✅ | CRUD + 카테고리 + 결제조건 + 브랜드 연결 |
| 일반 재고 (GeneralStock) | ✅ | ✅ | ✅ | 비식자재 별도 관리 |
| 결제 수단 | ✅ | ✅ | ✅ | Cash/Card/E-Wallet/BankTransfer/StaffMeal/Online |
| Cash Rounding | ✅ | ✅ | ✅ | 현금 반올림 설정 |

### 미구현 (신규 개발 필요)

| 영역 | 비고 |
|------|------|
| 시재 관리 (Petty Cash) | 테이블/필드 없음 |
| Cash Drawer 제어 | ESC/POS 킥 명령 미구현 |
| 발주서 (Purchase Order) | InventoryBatch에 FK만 준비 |
| 입고 처리 UI | 배치 모델은 있으나 워크플로 없음 |
| 공급업체-재료 가격 매핑 | supplier_ingredients 테이블 없음 |
| 원가 변동 이력 | 현재 최신 원가만 저장 |
| 청구서/월정산 (SOA) | 테이블 없음 |
| 브랜드 재고 상세 UI | 요약만 있음 |

---

## 2. 운영 시나리오

| 시나리오 | 현금결제 | 시재 | 필요 기능 |
|---------|:---:|:---:|----------|
| A. 카드 전용 매장 | ❌ | ❌ | 현금 관련 UI 전부 숨김 |
| B. 카드 전용 + 시재 운영 | ❌ | ✅ | 시재 등록/마감, Pay In/Out (현금환불 포함) |
| C. 현금+카드 매장 | ✅ | ✅ | 전체 기능 (현금매출 자동 집계 포함) |

---

## 3. 설정 (Settings > Operations)

| 설정 | 기본값 | 영향 |
|------|:---:|------|
| 시재 관리 | OFF | POS 시재 등록/마감, Pay In/Out, 시재 관리 페이지, Cash Drawer |
| 발주 관리 | OFF | 공급업체 가격 매핑, 발주서, 입고, 청구서, SOA |

독립 설정. 시재만 ON / 발주만 ON / 둘 다 ON 모두 가능.
둘 다 ON이면 발주 현금결제 → 시재 자동 연동.

---

## 4. 전체 흐름도

```
[시재 관리]                              [발주 관리]
시재 등록 → Pay In/Out → 마감 정산       공급업체 선택 → 발주서 생성 → 승인
    │                                         │
    │         ┌───────────────────────────────┘
    │         │
    │         ▼
    │    입고 처리 ──→ InventoryBatch 생성 (기존 모델 활용)
    │         │    ──→ InventoryTransaction type='purchase' (기존 모델 활용)
    │         │    ──→ Ingredient.current_stock 증가
    │         │    ──→ ingredient_cost_history 원가 이력 저장
    │         │
    │         ├── 결제: 외상 → 청구서(Purchase Invoice) → 월정산(SOA)
    │         └── 결제: 현금 → 시재 Pay Out 자동 연동
    │                          │
    └──────────────────────────┘

[주문 시]
POS 주문 완료 → Recipe → Ingredient → InventoryTransaction type='order_deduct'
                                    → current_stock 감소
                                    → StockAlert 자동 체크
```

---

## 5. 시나리오별 흐름

### 시나리오 1: 시장에서 현금으로 재료 구매
```
Pay Out (시재) → 금액 + 사유 + 영수증 사진
└── 발주 ON이면: 간이 발주서 자동 생성 → 입고 처리 → 재고 증가
```

### 시나리오 2: 공급업체 정기 발주 (외상)
```
발주서 생성 → 승인 → 배송 → 입고 처리 → 재고 증가
                                     └── 청구서 발행 → 월정산 (SOA)
```

### 시나리오 3: 공급업체 발주 (현금 결제)
```
발주서 생성 → 입고 처리 → 재고 증가
                     └── 결제 "현금" → 시재 Pay Out 자동 기록
```

### 시나리오 4: 현금 환불
```
POS 환불 → 현금 환불 선택 → 시재 Pay Out 자동 기록 (type: refund)
```

### 시나리오 5: 경비 지출 (발주 아닌 건)
```
POS > Pay Out → 금액 + 사유 → 시재 차감
```

---

## 6. 화면 구성

### 6.1 POS Terminal (시재 ON일 때)

| 시점 | UI |
|------|-----|
| 영업 시작 | 열린 세션 없으면 시재 등록 모달 자동 팝업 (금액 입력) |
| 영업 중 | 하단 버튼: 시재 현황(잔액), Pay In, Pay Out, Cash Drawer 열기 |
| 현금 환불 시 | "현금 환불" 선택 → cash_transactions 자동 기록 |
| 영업 종료 | 마감 정산 모달: 예상잔액 vs 실제 현금 → 과부족 |

### 6.2 시재 관리 페이지 (사이드바 Operations 하위)

| 섹션 | 내용 |
|------|------|
| 현재 세션 카드 | 시재액, Pay In/Out 합계, 현금환불 합계, 예상잔액 |
| 입출금 내역 테이블 | 전체 기록 (type별 필터, 기간/처리자 검색) |
| 세션 이력 테이블 | 과거 세션 (날짜, 시재액, 마감액, 과부족) → 클릭 시 상세 |

### 6.3 발주 관리 페이지들 (사이드바 Operations 하위)

| 페이지 | 내용 |
|--------|------|
| 공급업체 관리 | 기존 SuppliersPage 확장 — 재료-가격 매핑 추가 |
| 발주서 목록 | 상태별 탭 (draft/submitted/confirmed/received), 기간 필터 |
| 발주서 생성 | 공급업체 → 재료 선택 → 수량/단가 → StockAlert 기반 추천 수량 |
| 발주 상세 | 상태 변경, 품목별 입고수량, 결제방식(외상/현금) |
| 입고 처리 | 입고수량 → InventoryBatch 생성 → current_stock 증가 → 원가 이력 |
| 청구서 관리 | 입고 → 청구서 자동/수동 발행 → 결제 확인 |
| 월정산 (SOA) | 기간별 청구서 묶음 → 잔액 관리 |

### 6.4 Reports 보완

| 리포트 | 추가 내용 |
|--------|----------|
| Daily Settlement | 시재 섹션: 시재액 → Pay In/Out → 환불 → 예상잔액 → 실제 → 과부족 |
| Cash Report (신규 탭) | 기간별 현금 흐름, 캐셔별 과부족, Pay Out 사유별 분류 |
| Purchase Report (신규 탭) | 공급업체별 발주액, 재료별 원가 추이, 발주 빈도 |
| Cost Analysis (신규 탭) | 원가 변동 차트, 메뉴별 마진 변화, 이전 vs 현재 비교 |

### 6.5 Dashboard 보완

| 역할 | 추가 |
|------|------|
| Restaurant Admin | 시재 과부족 알림, 미입고 발주 건수, 재고 부족 알림 |
| Brand General | 소속 레스토랑별 발주 현황 집계, 원가 변동 알림 |
| Owner | 소속 레스토랑별 시재 과부족, 발주 현황 |

---

## 7. 조건부 표시 규칙

| 기능 | 시재 OFF + 발주 OFF | 시재 ON | 발주 ON | 둘 다 ON |
|------|:---:|:---:|:---:|:---:|
| POS 시재 등록/마감 | 숨김 | ✅ | 숨김 | ✅ |
| POS Pay In/Out | 숨김 | ✅ | 숨김 | ✅ |
| Cash Drawer 열기 | 숨김 | ✅ | 숨김 | ✅ |
| 시재 관리 페이지 | 숨김 | ✅ | 숨김 | ✅ |
| 공급업체 재료-가격 매핑 | 숨김 | 숨김 | ✅ | ✅ |
| 발주서 페이지 | 숨김 | 숨김 | ✅ | ✅ |
| 입고/청구/SOA | 숨김 | 숨김 | ✅ | ✅ |
| 발주 현금결제 → 시재 연동 | - | - | 기록만 | 자동 연동 |
| Reports 시재 섹션 | 숨김 | ✅ | 숨김 | ✅ |
| Reports 발주/원가 섹션 | 숨김 | 숨김 | ✅ | ✅ |
| Dashboard 시재 알림 | 숨김 | ✅ | 숨김 | ✅ |
| Dashboard 발주 알림 | 숨김 | 숨김 | ✅ | ✅ |

---

## 8. DB 테이블 설계

### 8.1 시재 관리 (신규)

```sql
CREATE TABLE cash_sessions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  opened_by INT NOT NULL,
  opening_amount DECIMAL(15, 2) NOT NULL DEFAULT 0,
  closing_amount DECIMAL(15, 2),
  expected_amount DECIMAL(15, 2),
  variance DECIMAL(15, 2),
  status ENUM('open', 'closed') DEFAULT 'open',
  opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  closed_at TIMESTAMP NULL,
  closed_by INT,
  notes TEXT,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (opened_by) REFERENCES users(id),
  FOREIGN KEY (closed_by) REFERENCES users(id)
);

CREATE TABLE cash_transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  session_id INT NOT NULL,
  restaurant_id INT NOT NULL,
  type ENUM('pay_in', 'pay_out', 'refund', 'purchase') NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  reason VARCHAR(255),
  receipt_image TEXT,
  reference_type VARCHAR(50),     -- 'order', 'purchase_order', 'manual'
  reference_id INT,               -- order_id 또는 purchase_order_id
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES cash_sessions(id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 8.2 발주 관리 (신규)

```sql
CREATE TABLE supplier_ingredients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  supplier_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  unit_price DECIMAL(10, 2),
  min_order_quantity DECIMAL(10, 2) DEFAULT 1,
  lead_days INT DEFAULT 1,
  is_preferred BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY (supplier_id, ingredient_id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

CREATE TABLE purchase_orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  supplier_id INT NOT NULL,
  order_number VARCHAR(50) UNIQUE,  -- PO-{YYMMDD}{NNN}
  status ENUM('draft', 'submitted', 'confirmed', 'shipped', 'partial_received', 'received', 'cancelled') DEFAULT 'draft',
  payment_method ENUM('credit', 'cash') DEFAULT 'credit',
  order_date DATE,
  expected_date DATE,
  received_date DATE,
  total_amount DECIMAL(15, 2) DEFAULT 0,
  currency VARCHAR(10) DEFAULT 'MYR',
  notes TEXT,
  created_by INT,
  approved_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
  FOREIGN KEY (created_by) REFERENCES users(id),
  FOREIGN KEY (approved_by) REFERENCES users(id)
);

CREATE TABLE purchase_order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  purchase_order_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(50),
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(15, 2) NOT NULL,
  received_quantity DECIMAL(10, 2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id) ON DELETE CASCADE,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

CREATE TABLE purchase_invoices (
  id INT PRIMARY KEY AUTO_INCREMENT,
  purchase_order_id INT,
  supplier_id INT NOT NULL,
  restaurant_id INT NOT NULL,
  invoice_number VARCHAR(50),     -- PI-{YYMMDD}{NNN}
  status ENUM('issued', 'payment_submitted', 'confirmed', 'paid', 'overdue', 'cancelled') DEFAULT 'issued',
  total_amount DECIMAL(15, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'MYR',
  issue_date DATE,
  due_date DATE,
  paid_date DATE,
  payment_method VARCHAR(50),
  payment_reference VARCHAR(100),
  payment_receipt TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

CREATE TABLE purchase_invoice_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  purchase_invoice_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(50),
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(15, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (purchase_invoice_id) REFERENCES purchase_invoices(id) ON DELETE CASCADE,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

CREATE TABLE statements_of_account (
  id INT PRIMARY KEY AUTO_INCREMENT,
  supplier_id INT NOT NULL,
  restaurant_id INT NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  opening_balance DECIMAL(15, 2) DEFAULT 0,
  total_invoices DECIMAL(15, 2) DEFAULT 0,
  total_payments DECIMAL(15, 2) DEFAULT 0,
  closing_balance DECIMAL(15, 2) DEFAULT 0,
  status ENUM('draft', 'issued', 'partial_paid', 'paid', 'overdue') DEFAULT 'draft',
  currency VARCHAR(10) DEFAULT 'MYR',
  due_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY (supplier_id, restaurant_id, period_start, period_end),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

CREATE TABLE ingredient_cost_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ingredient_id INT NOT NULL,
  restaurant_id INT,
  old_cost DECIMAL(10, 2),
  new_cost DECIMAL(10, 2),
  change_reason VARCHAR(255),      -- 'purchase_order', 'manual', 'supplier_update'
  purchase_order_id INT,
  changed_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (changed_by) REFERENCES users(id)
);
```

### 8.3 기존 테이블 활용 (수정 없음)

| 테이블 | 활용 |
|--------|------|
| InventoryBatch | purchase_order_id FK 이미 존재 → 입고 시 연결 |
| InventoryTransaction | type='purchase' 이미 ENUM에 포함 → 입고 트랜잭션 |
| Supplier | 완전 구현 → 발주 시 공급업체 선택 |
| StockAlert | low_stock 알림 → 자동 발주 추천 수량에 활용 |
| Ingredient | current_stock, min_stock, PAR 레벨 필드 활용 |

---

## 9. 회계 범위

POS는 입출금 기록 + 증빙(영수증 사진) 관리까지. 회계 전표는 매장이 별도 처리.

| 거래 | POS 기록 | 매장/세무사 회계 |
|------|----------|---------------|
| 시재 등록 | opening_amount | 은행 출금 → 소액현금 |
| Pay Out (경비) | 금액 + 사유 + 영수증 | 소액현금 → 비용 |
| Pay Out (발주 현금) | 금액 + 발주서 연결 | 소액현금 → 재료비 |
| 현금 환불 | 금액 + 주문 연결 | 소액현금 → 매출 차감 |
| 마감 과부족 | variance | 잡손실/잡이익 |
| 발주 외상 | 청구서 금액 | 매입채무 |
| SOA 정산 | 결제 기록 | 매입채무 감소 |

---

## 10. 구현 순서

### Phase A: 시재 관리

| 순서 | 작업 | 규모 | 기존 활용 |
|------|------|------|----------|
| A-1 | Settings 시재 토글 + cash_sessions, cash_transactions 테이블 | 소 | Restaurant 모델 |
| A-2 | Cash Drawer 열기 (ESC/POS 킥 명령) | 소 | billPrint.js |
| A-3 | POS 시재 등록/마감 모달 | 중 | cash_sessions |
| A-4 | POS Pay In/Out 모달 | 소 | cash_transactions |
| A-5 | POS 현금 환불 → 시재 자동 연동 | 소 | Order + cash_transactions |
| A-6 | 시재 관리 페이지 (사이드바) | 중 | 세션 이력 + 입출금 내역 |
| A-7 | Daily Settlement 시재 섹션 | 소 | Reports 보완 |

### Phase B: 발주 관리 기반

| 순서 | 작업 | 규모 | 기존 활용 |
|------|------|------|----------|
| B-1 | Settings 발주 토글 + 발주 DB 테이블 생성 | 소 | - |
| B-2 | 공급업체 재료-가격 매핑 (supplier_ingredients) | 중 | 기존 Supplier + Ingredient |
| B-3 | 발주서 CRUD + 번호 자동생성 (PO-YYMMDDNNN) | 대 | purchase_orders |
| B-4 | 발주서 상태 관리 (draft→submitted→confirmed→shipped→received) | 중 | - |
| B-5 | 입고 처리 → InventoryBatch + InventoryTransaction + current_stock | 중 | 기존 모델 활용 |
| B-6 | 원가 이력 저장 (ingredient_cost_history) | 중 | 입고 단가 변경 시 |

### Phase C: 발주 결제 + 정산

| 순서 | 작업 | 규모 | 기존 활용 |
|------|------|------|----------|
| C-1 | 청구서 자동/수동 발행 (purchase_invoices) | 대 | 입고 완료 트리거 |
| C-2 | 발주 현금결제 → 시재 Pay Out 연동 | 소 | Phase A + B |
| C-3 | 월정산 SOA (statements_of_account) | 대 | 매월 1일 자동 생성 |
| C-4 | SOA 부분 결제 / 연체 처리 | 중 | - |

### Phase D: 리포트 + 대시보드

| 순서 | 작업 | 규모 | 기존 활용 |
|------|------|------|----------|
| D-1 | Cash Report 탭 (기간별 현금 흐름, 캐셔별 과부족) | 중 | Reports 페이지 |
| D-2 | Purchase Report 탭 (공급업체별 발주액, 발주 빈도) | 중 | Reports 페이지 |
| D-3 | Cost Analysis 탭 (원가 변동 차트, 마진 분석) | 중 | Reports 페이지 |
| D-4 | Dashboard 보완 (RA/Brand/Owner 시재+발주 알림) | 중 | Dashboard |

---

## 11. 연관 기존 문서

| 문서 | 관련 |
|------|------|
| DEVELOPMENT_PLAN.md Phase 5 | 재고 관리 (구현 완료) |
| DEVELOPMENT_PLAN.md Phase 6 | 발주 관리 (미구현, 이 문서로 대체) |
| DEVELOPMENT_PLAN.md Phase 7 | AI 재고 예측 (향후) |
| INVENTORY_MANAGEMENT_SYSTEM.md | 재고 시스템 설계 |
| RECIPE_MANAGEMENT_SYSTEM.md | 레시피 → 재료 → 재고 차감 흐름 |
| KITCHEN_STATION_SYSTEM.md | 주방 시스템 |
