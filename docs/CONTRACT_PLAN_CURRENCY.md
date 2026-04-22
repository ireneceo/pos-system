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

---

# Phase 2-C: Invoice 생성 파이프라인 완결 (2026-04-22)

**Last updated:** 2026-04-22
**Owner:** Irene
**Status:** 설계 완료 → 구현 시작

## Problem (30년차 감사 결과)

Phase 1 + 2-A + 2-B로 Contract ↔ Plan 연결 가시화는 완성됐지만, **실제 invoice가 생성되지 않음**이 확인됨.

### 증거 (live DB, 2026-04-22)
- Active contract 2건 — 둘 다 ContractPlan 연결 있음
- Plan 13개 중 **contract로부터 만들어진 3개 (#35/#37/#38)는 모두 `EntityPlanRestaurant.linked_restaurants = 0`**
- `invoice.contract_id IS NOT NULL` 인 invoice 레코드: **0건** (automatic/manual 모두)
- 전체 시스템에서 Contract-기반 invoice가 단 한 번도 자동 생성된 적 없음

### 근본 원인

`invoiceScheduler.generateEntityPlanInvoices()` 는 `EntityPlan.planRestaurants` (EntityPlanRestaurant junction) 를 `required: true` 로 include — 연결된 restaurant가 없으면 스킵.

반면 `POST /api/contracts/:id/create-plan-from-contract` (routes/contracts.js:926) 는:
- EntityPlan 생성 ✓
- EntityPlanPrice 생성 ✓ (fixed/combined type)
- ContractPlan 링크 생성 ✓
- **EntityPlanRestaurant 연결은 안 만듦** ✗

따라서 스케줄러는 항상 이 Plan들을 스킵.

### 기타 식별된 gap
- **Gap A**: 계약 편집 시 `restaurant_id`를 나중에 set해도 EntityPlanRestaurant 자동 생성 안 됨
- **Gap B**: 계약 stage → terminated/expired/renewed 시 ContractPlan.end_at은 닫히지만 EntityPlanRestaurant.is_active는 그대로 (gap A 고친 뒤 유령 청구 위험)
- **Gap C**: `subscriptionScheduler.processContractExpiryReminders()`의 auto-expire는 `Contract.update({ stage: 'expired' })` 만 함 — stage PUT endpoint를 우회해 ContractPlan.end_at을 안 닫음
- **Gap D**: 자동 생성된 invoice에 `contract_id`가 세팅 안 됨 — 추적성 손실
- **Gap E**: 스케줄러가 ContractPlan.end_at 체크 안 함 (연결된 계약이 종료돼도 EntityPlanRestaurant이 활성이면 계속 청구)
- **Gap F**: 기존 orphaned plan 3건 backfill 필요

## Goal

Contract → Plan → **실제 Invoice 자동 생성**까지 파이프라인을 닫는다. 법적 / 추적성 / 자동화 3축 모두.

## Scope

### In scope
1. `create-plan-from-contract` 트랜잭션 내에서 `contract.restaurant_id` 있으면 EntityPlanRestaurant row 동시 생성
2. Contract PUT `/contracts/:id` 에서 `restaurant_id` 신규 세팅 시 열린 ContractPlan에 대해 EntityPlanRestaurant 자동 생성
3. Contract stage → terminated/expired/renewed 시 open EntityPlanRestaurant (contract_id 경로로 식별) `is_active=false` 처리
4. `subscriptionScheduler` auto-expire 경로를 stage PUT 동일 로직으로 통일 (ContractPlan.end_at + EntityPlanRestaurant.is_active 동기 처리)
5. `invoiceScheduler.generateEntityPlanInvoices` — 생성된 invoice에 `contract_id` 기입 (ContractPlan 룩업)
6. 스케줄러가 ContractPlan.end_at 체크 — 닫힌 링크는 스킵 (추가 방어선)
7. Backfill 스크립트: 현재 orphan plan들에 대해 EntityPlanRestaurant 생성

### Out of scope (다음 phase)
- 부분월 proration (계약 중간 시작/종료 시 일할 계산) — 별도 task
- Tenant Portal (입점자가 본인 invoice 조회/납부) — 별도 대형 task
- Plan 역참조 UI (Plan detail에서 어느 Contract가 이 Plan 사용하는지) — 별도 소규모 task

## Design decisions

### Contract.restaurant_id가 null일 때 Plan 생성 허용 여부
**허용** — Plan이 템플릿처럼 먼저 만들어지고 나중에 restaurant가 붙는 워크플로우가 있음. 대신 응답에 warning 추가: `"Plan created but not billable until restaurant is attached to contract"`.

### EntityPlanRestaurant 연결 방식
- 하나의 Plan은 여러 restaurant에 연결 가능 (기존 설계)
- Contract 1건 = Plan 1건 = Restaurant 1건 (1:1:1 — contract.restaurant_id가 식별자)
- 따라서 Contract→Plan으로 만들어진 Plan은 EntityPlanRestaurant도 1row만 존재 (contract.restaurant_id 기준)
- Contract.restaurant_id가 **변경**되면? 기존 EPR의 is_active=false, 새 EPR 생성

### Stage 전환 시 EPR 처리
- terminated/expired/renewed — ContractPlan.end_at 설정 + 같은 트랜잭션 내 EPR is_active=false
- Restaurant은 다른 Plan에 연결될 수 있으므로 restaurant 자체는 건드리지 않음

### Scheduler의 이중 방어선
- 주 경로: EntityPlanRestaurant.is_active + EntityPlan.is_active
- 추가: 만약 EntityPlan이 ContractPlan과 연결돼 있는데 모든 ContractPlan.end_at 이 설정됐으면 스킵 (orphan protection)

### invoice.contract_id 기입 규칙
- EntityPlan 생성 시 ContractPlan 링크가 있는 경우, 해당 row의 contract_id를 invoice.contract_id에 저장
- Plan이 여러 contract에 연결됐다면 (이론상 가능, 현재는 1:1) `end_at IS NULL` 중 가장 최근 assigned_at

## Implementation plan

### 파일별 변경 (backend)

**routes/contracts.js**
- `POST /:id/create-plan-from-contract` (line ~1003): 트랜잭션 내에서 `contract.restaurant_id`가 있으면 `EntityPlanRestaurant.create({entity_plan_id, restaurant_id, is_active: true})` 추가
- `PUT /:id` (line ~436 이후): `restaurant_id` 변경 시 open ContractPlan 순회 — 이전 restaurant_id의 EPR `is_active=false` + 새 restaurant_id의 EPR 생성
- `PUT /:id/stage` (line ~567): 기존 ContractPlan.end_at 업데이트와 같은 블록에 EPR `is_active=false` 추가
- `POST /:id/terminate` (line ~616): 동일

**services/subscriptionScheduler.js**
- `processContractExpiryReminders()` auto-expire 블록 (line 791): ContractPlan.end_at + EPR deactivate 추가 (stage PUT과 로직 통일)

**services/invoiceScheduler.js**
- `generateEntityPlanInvoices()`: invoice 생성 직전 ContractPlan 룩업해서 contract_id 세팅
- ContractPlan.end_at IS NOT NULL인 경우 스킵 추가 방어선

**scripts/backfill-contract-plan-restaurants.js** (신규)
- 모든 `ContractPlan where end_at IS NULL` 순회
- 각 계약의 `restaurant_id`가 있으면 해당 entity_plan과 restaurant로 EPR 존재 여부 확인, 없으면 생성
- Idempotent (이미 있으면 스킵)

### 테스트 시나리오 (실동작 — 코드 리뷰 아님)

1. **End-to-end wizard + scheduler**
   - Seed: Active contract with restaurant_id, financial_terms (base_rent)
   - POST create-plan-from-contract → Plan + EPR 둘 다 생성 확인
   - 수동으로 스케줄러 실행 (billing_day 오늘 기준) → Invoice 생성 + invoice.contract_id 세팅 확인
   - Invoice GET API로 읽어 확인 (field 일치)

2. **Stage transition 종료**
   - 위 계약을 stage=terminated로 전환
   - ContractPlan.end_at, EntityPlanRestaurant.is_active 동시 업데이트 확인
   - 스케줄러 재실행 → 새 invoice 안 만들어짐 확인

3. **Auto-expire 경로**
   - Contract end_date를 어제로 세팅 + stage='active'
   - subscriptionScheduler.processContractExpiryReminders 실행
   - stage=expired + ContractPlan.end_at + EPR.is_active=false 세트로 확인

4. **Backfill**
   - Orphan plan #35/#37/#38 대상 실행
   - 실행 후 `linked_restaurants=1` (contract.restaurant_id가 있는 것만)
   - 멱등성: 재실행 시 중복 생성 X

5. **Restaurant 변경**
   - Contract restaurant_id 1 → 2로 변경 PUT
   - 이전 EPR is_active=false, 새 EPR 생성 확인

### Health-check 추가 케이스
- `/var/www/dev-backend/scripts/health-check.js` payment 카테고리에 "Contract→Plan→Invoice loop closed" 1건 추가
  - seed minimal → scheduler dry-run → invoice 1건 확인 → cleanup

## Rollout

1. 설계 문서 완료 (이 섹션) ✓
2. Backend 구현 (transactional, 각 엔드포인트)
3. Backfill 스크립트 실행 (dev) → live DB 확인
4. 스케줄러 강제 실행으로 first-ever contract invoice 발행 → 검증
5. Build + health-check 40+ pass
6. 운영 배포 시 backfill 스크립트 동일 실행 필요 (deploy 스크립트에 추가 or 별도 실행)

---

# Phase 2-D: Renewal Plan Carry-over (2026-04-23)

**Status:** 완료

## Problem

`POST /api/contracts/:id/renew` 는 새 Contract를 만들지만 Plan/EPR 연결은 하지 않았음 → 갱신된 계약은 billing 안 됨. 동시에 old contract의 ContractPlan/EPR은 열린 채로 남아 유령 청구 위험.

## Fix

- `terms_changed=false`: old ContractPlan.end_at set + new ContractPlan create (same EntityPlan). EPR 유지 (같은 plan+restaurant).
- `terms_changed=true`: old ContractPlan.end_at + EPR deactivate. 새 Contract는 'proposal' 단계 — wizard로 새 Plan 생성 플로우.
- 전체 트랜잭션 내 원자 처리.

## Verify

- Scenario A (no terms change): 8/8 check 통과 — plan carries, EPR active, invoice generated for new contract
- Scenario B (terms changed): 8/8 check 통과 — plan closed, EPR inactive, no invoice

---

# Phase 2-E: Proration (2026-04-23)

**Status:** 완료

## Design

- 고정분만 proration (percentage%는 활동 기반이라 자연 비례)
- factor = coveredDays / periodDays (inclusive 기준, setHours 0,0,0,0 정규화)
- factor=0 → 스킵 (no coverage 시 invoice 생성 안 함)
- factor<1 → invoice item description에 `[prorated NN%]` 표시
- billing-preview API도 동일 factor 적용 + 응답에 `proration_factor`/`period` 포함

## Verify

- 5 scenarios 통과: full coverage(3000), mid-start(1451.70=15/31), mid-end(1064.40=11/31), no overlap(SKIP), billing-preview factor=0.4839

---

# Phase 2-F: Plans Reverse Lookup (2026-04-23)

**Status:** 완료

## Backend

- `EntityPlan.hasMany(ContractPlan, as: 'contractLinks')` association 추가
- `GET /api/foodcourts/:id/plans` / `/plans/:planId` 응답에 `contractLinks[]` include (contract number/stage/period 포함)
- `GET /api/brands/:id/plans` / `/plans/:planId` 동일 처리
- `DELETE /plans/:planId` 가드: open ContractPlan이 있으면 400 (`Cannot delete plan attached to N open contract(s)`)

## Frontend

- FoodcourtPlansPage + BrandPlansPage:
  - Plan 카드에 "From contract" 배지 (open 링크가 있을 때만)
  - Plan 상세 모달에 "Linked Contracts (N)" 섹션 (Open/Closed 상태, 계약번호, 기간, 신청사)

## Verify

- Live API: contractLinks 필드 정상 리턴 (contract#88 → stage=active)
- DELETE 가드: status=400 "Cannot delete plan attached to 1 open contract(s)"
