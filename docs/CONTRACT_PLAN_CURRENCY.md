# Contract ↔ Plan Integration (Phase 1)

**Last updated:** 2026-04-22
**Owner:** Irene
**Status:** In implementation

## Problem
- Contract (법적 문서) + EntityPlan (자동 청구 규칙) 두 시스템이 분리되어 있음
- 운영자가 Contract 조건을 입력한 뒤 Plan을 또 수동으로 만들어야 함 (중복 입력, 불일치 위험)
- Active 계약인데 Plan 연결 없으면 수금 누락 — 감지 장치 없음
- Contract에 명시적 통화 필드 없음 (지금은 entity.currency 암묵적 상속)

## Goal (Phase 1)
**Plan과 Contract는 독립 유지하되**, 연결 상태를 **가시화**하고 통화를 **명시**하고 누락을 **경고**.

양방향 동기화는 하지 않음 (법적 문서 안전성 + Plan 재사용성).

## Scope

### In scope
1. Contract 생성 시 통화 선택 (명시적 저장)
2. Contract Detail에 연결된 Plan + 이번 달 예상 청구액 표시
3. Active 계약 - Plan 미연결 경고 (Tenancy Map / Dashboard / Contract 리스트)
4. Contract → Plan 자동 생성 마법사 (financial_terms pre-fill, 생성 후 독립 관리)
5. ContractPlan 종료 시점(end_at) 자동 기록

### Out of scope (Phase 2)
- ~~EntityPlan.charge_type='combined' (min_guarantee 지원)~~ → **Phase 2-A 완료 (2026-04-22)**
- Plan 변경 시 Contract에 경고 배너 동기화
- 갱신 시 자동 Plan 교체 workflow
- Historical invoice 통화 변환 분석

## Phase 2-A: EntityPlan combined charge_type (completed 2026-04-22)

### Scope
- `EntityPlan.charge_type` ENUM 확장: `'fixed' | 'percentage' | 'combined'`
- 'combined' 의미: min-guarantee 패턴 — `rent = MAX(EntityPlanPrice.monthly_price, percentage_value × revenue)`
- `invoiceScheduler.calculatePlanCharges` 완전 재작성 (기존에는 EntityPlan에 없는 필드 읽어서 0원 invoice 생성하는 버그 존재)
- `create-plan-from-contract` 마법사: Contract에 base_rent + revenue_share_percent 둘 다 있으면 자동으로 'combined' 생성
- `billing-preview` API: combined 케이스 미리보기 지원
- FE LinkedPlansSection: combined 표시 ("`RM 1,800/mo min · 10% of revenue (whichever is higher)`")

### 수정된 코드
- `models/EntityPlan.js` — charge_type ENUM 확장
- `services/invoiceScheduler.js` — calculatePlanCharges 재작성 (EntityPlanPrice 조회 로직 추가)
- `routes/contracts.js` — 마법사 + 미리보기 combined 지원
- `components/Contract/LinkedPlansSection.tsx` — combined 레이블 렌더
- 마이그레이션: `scripts/migrate-entity-plan-combined.js`

### Verified (E2E)
- Contract #86 (base_rent=1800, revenue_share=10%): 마법사 실행 → combined 플랜 생성
- billing-preview: revenue=0 → amount=1800 (min-guarantee kicks in)
- invoiceScheduler: subtotal==0 skip 추가로 0원 invoice 버그 방지

## Data model changes

### `contracts`
```sql
ALTER TABLE contracts
  ADD COLUMN currency VARCHAR(3) NULL COMMENT 'ISO 4217 code. Inherits from entity default at creation; stored explicitly so historical contracts remain stable when entity default changes.'
  AFTER entity_id;
```

### `contract_plans`
```sql
ALTER TABLE contract_plans
  ADD COLUMN end_at DATETIME NULL COMMENT 'When this plan attachment ended. Set automatically on Contract.stage → expired/terminated.'
  AFTER assigned_at;
```

### Backfill (idempotent, one-shot)
```sql
UPDATE contracts c
JOIN foodcourts f ON c.entity_id = f.id
SET c.currency = COALESCE(f.currency, 'MYR')
WHERE c.entity_type = 'foodcourt' AND c.currency IS NULL;

UPDATE contracts c
JOIN brands b ON c.entity_id = b.id
SET c.currency = COALESCE(b.currency, 'MYR')
WHERE c.entity_type = 'brand' AND c.currency IS NULL;
```

## Currency selection rules

### At Contract creation
1. Read `entity.supported_currencies` (JSON array of codes).
2. If array empty / null → fall back to `[entity.currency]`.
3. If only 1 currency → auto-set + read-only UI.
4. If 2+ currencies → dropdown, default = `entity.currency`.

### Validation
- `Contract.currency` MUST be in `entity.supported_currencies` OR equal to `entity.currency`.
- Applied in `POST /api/contracts` and `PUT /api/contracts/:id` middleware.

### Downstream inheritance
- `EntityPlan.currency` = `Contract.currency` (when created via wizard).
- `Invoice.currency` = `Plan.currency` (existing behavior, unchanged).

### Currency lock
- Once `Contract.stage === 'active'` AND at least one invoice has been issued → `Contract.currency` is **read-only**.

## API changes

### Modified
- **`POST /api/contracts`** — accept `currency`, validate, default = entity.currency.
- **`PUT /api/contracts/:id`** — accept `currency` (subject to lock rule).
- **`POST /api/contracts/:id/stage`** — on transition to `expired|terminated|renewed`, set `ContractPlan.end_at = NOW()` for all open links.
- **`GET /api/contracts/:id`** — include `plans[]` with `EntityPlan` details (already done) + add `currency` in response.

### New
- **`POST /api/contracts/:id/create-plan-from-contract`**
  - Create new `EntityPlan` using `Contract.financial_terms` + `Contract.currency`.
  - Link via `ContractPlan`.
  - Body: `{ name?: string, billing_day?: number, description?: string }` (optional overrides; sensible defaults from contract).
  - Returns created plan + link.
  - Required role: System Admin / Foodcourt General / Brand General (owner of the entity).

- **`GET /api/contracts/:id/billing-preview`**
  - Simulates the next invoice for this contract using linked Plan(s) + InvoiceSettings + most recent 30-day revenue.
  - Returns `{ currency, line_items[], subtotal, tax, total }`.

- **`GET /api/foodcourts/:id/unlinked-contracts`** and **`GET /api/brands/:id/unlinked-contracts`**
  - Returns Active Contracts with no open ContractPlan link.
  - Used by Dashboard widget + Tenancy Map unit alert.

## financial_terms → EntityPlan mapping

```
financial_terms.base_rent (Foodcourt)
  → EntityPlan.charge_type = 'fixed'
  → EntityPlanPrice entry with monthly_price = base_rent

financial_terms.revenue_share_percent
  → EntityPlan.charge_type = 'percentage'
  → EntityPlan.percentage_value = revenue_share_percent
  → EntityPlan.revenue_base = 'previous_month' (default)

financial_terms.franchise_fee / royalty_value (Brand)
  → Same mapping rules, franchise_fee as initial one-time (handled by invoice system)

financial_terms.min_guarantee + revenue_share_percent (combined)
  → Phase 1: documented as Phase 2 (currently requires InvoiceSettings.rent_type='combined').
  → Phase 1 wizard surfaces warning: "Combined min_guarantee + revenue share needs manual InvoiceSettings setup."
```

### Default plan name
`{contract_number || '#' + contract.id} — {entity.name} Tenancy`
Example: `"CFH-T-2026-0001 — Central Food Hall Tenancy"`

### Default billing_day
- `contract.start_date.day` if 1–28
- `1` otherwise

## UI changes

### Contract create/edit form
- New field: **Currency** (between Entity and Financial Terms sections).
- Dropdown when `supported_currencies.length > 1`, else read-only display.
- Format: `RM — Malaysian Ringgit (MYR)`.

### Contract Detail — new sections
1. **Header** — show currency badge next to contract number.
2. **Linked Plans** (existing, expanded):
   - List of linked Plans (from `plans[]`).
   - Each Plan shows: name, charge_type, currency, amount, billing_day.
   - Per-plan actions: `View`, `Unlink`.
   - Empty state CTA: `[+ Link existing plan]  [⚡ Create from contract]`.
3. **Billing Preview** (new, Foodcourt General / Brand General / System Admin only):
   - "Next invoice (est.)": currency-formatted amount + breakdown table.
   - Last 3 invoices (read-only link list).

### Tenancy Map unit
- If Contract.stage=active AND no open ContractPlan → red corner badge + tooltip "Billing not configured".
- FoodcourtUnitNode extended with new `billingGap: boolean` flag.

### Foodcourt Dashboard — new widget
- "Billing Gaps" panel: count of active contracts without plan, click-through to filtered list.

## Role-based access

| Action | System Admin | Foodcourt General | Foodcourt Manager | Brand General | Brand Manager |
|--------|:---:|:---:|:---:|:---:|:---:|
| View currency | ✓ | ✓ | ✓ | ✓ | ✓ |
| Edit currency | ✓ | ✓ (own) | ✗ | ✓ (own) | ✗ |
| Create plan from contract | ✓ | ✓ (own) | ✗ | ✓ (own) | ✗ |
| Link/unlink plan | ✓ | ✓ (own) | ✗ | ✓ (own) | ✗ |
| View billing preview | ✓ | ✓ (own) | ✓ (own branch) | ✓ (own) | ✓ (own, redacted for financials) |
| See billing-gap alerts | ✓ | ✓ (own) | ✓ (own branch, read) | ✓ (own) | ✓ (own, read) |

## Edge cases

| Case | Handling |
|------|----------|
| Existing contract with NULL currency post-backfill | Backfill guarantees non-null; any residual → treat as entity.currency on read. |
| entity.currency changes after contract created | Contract.currency retains original (historical integrity). |
| Multi-currency entity drops a currency (removes from supported_currencies) | Existing contracts keep their stored currency. New contracts can only pick current supported set. |
| Currency lock (already-invoiced) | `PUT /api/contracts/:id` with different currency → 422 with clear message. |
| Create plan when financial_terms empty | Wizard blocks with message "Fill Base Rent / Revenue Share % before generating plan." |
| Multiple plans per contract | ContractPlan M:N already supports. Billing preview sums line items across all open plans. |
| Contract expires with open ContractPlan | On stage → expired, set end_at = NOW() for all open links. Plan itself unchanged. |

## Migration / deployment

1. Run migration: `node scripts/migrate-contract-currency-endat.js` (idempotent).
2. Run backfill (automatic inside migration).
3. `pm2 restart dev-backend`.
4. Frontend build + deploy.
5. Verify: health-check 40/40, manual Contract create with multi-currency entity.

## Verification plan (Step 3 of 10-step verification)

- Contract create with single-currency entity → currency auto-set
- Contract create with multi-currency entity → dropdown, picks non-default → saved correctly
- Contract create → Plan wizard → EntityPlan.currency matches
- Active contract without plan → appears in `unlinked-contracts` endpoint + Tenancy Map badge
- Contract stage → expired → open ContractPlan.end_at auto-set
- Billing preview API returns correct currency + sum

## Open questions (deferred to Phase 2)

- EntityPlan combined charge_type (min_guarantee) — requires Plan model extension + scheduler update
- Plan-Contract amount mismatch detection (warning badge)
- Contract renewal workflow (auto-carry or re-create ContractPlan)
- Historical currency change audit trail
