# Supply Chain Sprint 7 — Operational Hardening

> **Status**: 설계 완료 (1~4단계) · 구현 진행 중 (5단계)
> **시작**: 2026-04-28
> **목적**: Sprint 1~6 흐름의 운영 사고 위험 4 영역 보강
> **Tracking**: `.claude/session-state.md` 의 Sprint 7 섹션

---

## 1. 기능 정의

| 항목 | 내용 |
|------|------|
| 기능명 | Supply Chain Sprint 7 — Operational Hardening |
| 핵심 사용자 | Buyer(Restaurant/Brand/Foodcourt) + Seller(Supplier/Brand/Foodcourt) + System Admin |
| 핵심 유스케이스 | 1) BG/FG 수령이 inventory_transactions에 정상 기록 · 2) BG/FG seller returns 시 자기 stock 환원 · 3) Receive 시 line별 splits + 차이 사유 · 4) Carrier webhook 자동 status 전이 |
| 비범위 | ETA, Partial shipment, Confirm SLA, Reject 대안 → Sprint 8 |
| 기존 시스템 연동 | 타임존 (entity operation_settings.timeZone) · 통화 (PO.currency lock) · 배송 (Carrier 마스터) · i18n (4언어) · 이메일 (entity SMTP) |

---

## 2. API Endpoints

### 기존 endpoint 확장 (4)

| METHOD | Path | 변경 |
|--------|------|------|
| POST | `/api/purchase-orders/:id/receive` | payload `items[].splits[]` 구조 + auto-returns + tracking_info.events.source |
| POST | `/api/seller-orders/:id/ship` | tracking_info.events.source='seller' |
| POST | `/api/seller-orders/:id/deliver` | shipped + in_transit 모두 진입 가능 |
| POST | `/api/seller-orders/:id/returns/:returnId/approve` | brand/foodcourt seller stock 환원 분기 + currency assertion |

### 신규 endpoint (7)

| METHOD | Path | 인증 | 비고 |
|--------|------|------|------|
| PUT | `/api/purchase-orders/:id/items/:itemId/discrepancy` | requireBuyerRole | 사후 차이 보고/변경 |
| POST | `/api/carrier-webhooks/:carrier_code` | **Public + HMAC** | 2단계 처리 (검증 동기 + 적용 비동기), rate limit 분당 10/IP |
| GET | `/api/admin/carrier-webhook-events` | System Admin | 모니터/필터 |
| POST | `/api/admin/carrier-webhook-events/:id/retry` | System Admin | 실패 event 재처리 |
| POST | `/api/admin/carrier-webhooks/:carrier_code/simulate` | System Admin | HMAC bypass 테스트 |
| PUT | `/api/carriers/:id/webhook` | System Admin | webhook 설정 (status_map 등) |
| POST | `/api/carriers/:id/webhook/regenerate-secret` | System Admin | secret 재생성, 한 번만 plain 노출 |
| GET | `/api/brands/:brandId/inventory/transactions` | requireBrandScope | entity_type='brand' 조회 |

### Webhook 처리 2단계
1. **동기 (50ms 응답)**: HMAC + timestamp tolerance + payload_hash UNIQUE → CarrierWebhookEvent.create({status:'pending_apply'}) → 200
2. **비동기 (setImmediate)**: tracking_number 매칭 → status_map 적용 → status 진보 검사 → PO 업데이트 + emit + (milestone 시) email

### 알림 throttle
- shipped, delivered, delivery_failed, returned: email + socket
- picked_up, in_transit: socket only

---

## 3. Database Schema

### ALTER 6건

#### inventory_transactions (백필 200K+ rows)
```sql
ALTER TABLE inventory_transactions
  ADD COLUMN entity_type ENUM('restaurant','brand','foodcourt') NULL AFTER restaurant_id,
  ADD COLUMN entity_id INT NULL AFTER entity_type,
  ADD COLUMN purchase_order_id INT NULL AFTER stock_take_id,
  MODIFY COLUMN restaurant_id INT NULL,
  MODIFY COLUMN transaction_type ENUM(
    'initial','purchase','order_deduct','stock_take','waste','adjustment',
    'return_in','return_out'
  ) NOT NULL,
  ADD INDEX idx_entity (entity_type, entity_id),
  ADD INDEX idx_po (purchase_order_id),
  ADD CONSTRAINT fk_inv_trans_po FOREIGN KEY (purchase_order_id)
      REFERENCES purchase_orders(id) ON DELETE SET NULL;
```

#### inventory_batches (백필 필요)
```sql
ALTER TABLE inventory_batches
  ADD COLUMN entity_type ENUM('restaurant','brand','foodcourt') NULL AFTER restaurant_id,
  ADD COLUMN entity_id INT NULL AFTER entity_type,
  MODIFY COLUMN restaurant_id INT NULL,
  ADD INDEX idx_entity (entity_type, entity_id);
```

#### purchase_orders.status
```sql
ALTER TABLE purchase_orders
  MODIFY COLUMN status ENUM(
    'draft','submitted','confirmed','shipped',
    'in_transit','delivered','partial_received','received',
    'cancelled','closed','delivery_failed'
  ) NOT NULL DEFAULT 'draft';
```

#### purchase_order_items
```sql
ALTER TABLE purchase_order_items
  ADD COLUMN discrepancy_reason ENUM('short','damaged','wrong_item','pending') NULL,
  ADD COLUMN discrepancy_note VARCHAR(500) NULL,
  ADD COLUMN discrepancy_reported_at DATETIME NULL,
  ADD COLUMN discrepancy_reported_by_user_id INT NULL,
  ADD INDEX idx_discrepancy (discrepancy_reason);
```

#### purchase_order_returns
```sql
ALTER TABLE purchase_order_returns
  ADD COLUMN auto_generated BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN source_event ENUM('manual','receive_damage','receive_wrong_item') NOT NULL DEFAULT 'manual',
  ADD INDEX idx_auto (auto_generated, status);
```

#### carriers
```sql
ALTER TABLE carriers
  ADD COLUMN webhook_secret VARCHAR(128) NULL,
  ADD COLUMN webhook_event_path VARCHAR(255) NULL,
  ADD COLUMN webhook_tracking_path VARCHAR(255) NULL,
  ADD COLUMN webhook_idempotency_path VARCHAR(255) NULL,
  ADD COLUMN webhook_status_map JSON NULL;
```

### 신규 테이블 — `carrier_webhook_events`

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | INT PK | |
| carrier_id | INT NOT NULL FK→carriers ON DELETE RESTRICT | |
| carrier_event_id | VARCHAR(255) NULL | webhook_idempotency_path 추출값 |
| payload_hash | CHAR(64) NOT NULL UNIQUE | sha256(raw_body), 주 dedup |
| signature_valid | BOOLEAN NOT NULL | HMAC 검증 결과 |
| payload | JSON NOT NULL | 파싱된 내용 |
| raw_body | MEDIUMTEXT NOT NULL | HMAC 재검증용 원문 |
| purchase_order_id | INT NULL FK→purchase_orders ON DELETE SET NULL | 매칭된 PO |
| mapped_status | VARCHAR(40) NULL | status_map 결과 |
| status | ENUM('pending_apply','applied','ignored_duplicate','ignored_regress','failed') | |
| applied_at | DATETIME NULL | |
| error | TEXT NULL | no_match/multiple_match/invalid_mapping/etc |
| retry_count | INT NOT NULL DEFAULT 0 | |
| simulated | BOOLEAN NOT NULL DEFAULT FALSE | |
| source_ip | VARCHAR(45) NULL | |
| received_at | DATETIME NOT NULL | |
| created_at, updated_at | DATETIME NOT NULL | |

**Indexes**: payload_hash UNIQUE · (carrier_id, received_at) · purchase_order_id · (status, received_at) · simulated

### Sequelize hooks
```js
InventoryTransaction.beforeCreate((row) => {
  if (row.entity_type === 'restaurant' && row.entity_id && !row.restaurant_id) row.restaurant_id = row.entity_id;
  if (!row.entity_type && row.restaurant_id) {
    row.entity_type = 'restaurant';
    row.entity_id = row.restaurant_id;
  }
});
// InventoryBatch 동일 패턴
```

### Status progress order (out-of-order 검사)
```
draft(0) → submitted(1) → confirmed(2) → shipped(3) → in_transit(4)
       → delivered(5) → partial_received(6) → received(7) → closed(8)
Branch (어디서나): cancelled, delivery_failed
```

---

## 4. UI Flow

### 페이지 / 컴포넌트

| # | 위치 | 신규/수정 |
|---|------|-----------|
| 1 | PurchaseOrderDetailPage > Receive Modal | 강화 — splits UI, segmented control, inline auto-return 안내 |
| 2 | PurchaseOrderDetailPage > Discrepancy 사후 모달 | 신규 |
| 3 | Admin CarriersPage > 편집 모달 webhook 섹션 | accordion |
| 4 | Admin CarrierWebhookEventsPage | 신규 페이지 (모니터 + retry + simulate) |
| 5 | BG Inventory > Transactions 탭 | 기존 페이지 탭 추가 |
| 6 | PurchaseOrderDetailPage status 뱃지 + timeline source | 시각 보강 |

### Status badge 색상 (UI_DESIGN_GUIDE 팔레트)
| status | 색상 |
|--------|------|
| in_transit | #EA580C (orange) — 신규 |
| delivery_failed | #DC2626 (red) — 신규 |

### Sidebar / Route
- 신규: `/pos/admin/carrier-webhooks` (lazy import + ProtectedRoute requireRole('System Admin'))

### i18n 4언어 keys
- purchaseOrders.discrepancy.* / status.inTransit / timeline.bySeller/byBuyer/viaCarrier/...
- admin.carrierWebhooks.* (title, regenerateSecret, statusMapping, simulate, retry)
- brand.inventory.transactions.tab

---

## 5. 구현 순서

```
1. scripts/sprint7-migration.js 작성 (--dry-run 지원)
2. 모델 6개 변경 + CarrierWebhookEvent 신규 + index.js association
3. Sequelize hook
4. 마이그레이션 실행 (dry-run → 적용 → 검증 SQL)
5. routes/po-returns.js — brand/foodcourt seller 분기 + currency assertion
6. routes/purchase-orders.js — receive splits + discrepancy endpoint
7. routes/carriers.js — webhook 설정 + secret regenerate
8. routes/carrier-webhooks.js — 신규 (HMAC + 2단계 처리 + simulate)
9. server.js — raw body + 라우트 등록 (express.json 위)
10. 프론트 페이지 6종
11. i18n 4언어 추가
12. 검증 (6단계)
```

---

## 6. Tests (실행 예정)

상세는 별도 섹션. 핵심:
- Migration dry-run + apply + 검증 SQL (entity_type IS NULL = 0건)
- Hook backward-compat (구 코드 / 신 코드 모두 round-trip)
- Receive splits (정상 / damaged auto-return / short / 혼합)
- Returns 양방향 환원 (supplier / brand / foodcourt)
- Webhook (HMAC happy + 실패 + idempotent + out-of-order + multiple/no match)
- UI 시각 + 모바일 + 4언어
- SPA 라우트 200 + health-check 43/43 + 신규 회귀
