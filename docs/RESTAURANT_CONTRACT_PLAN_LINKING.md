# Restaurant ↔ Contract ↔ Plan Linking (2026-04-23)

**Status:** 설계 완료 → 구현 착수
**Owner:** Irene

## Problem

Brand General / Foodcourt General가 Restaurant을 만들 때 POS 구독은 자동 생성되고 있음 (정상). 하지만:
- Restaurant Edit 모달에서 **Contract**, **Franchise/Tenancy Plan** 연결 UI가 없음
- POS Plan 변경 시 **즉시 반영**돼서 주기 중간 금액이 바뀜 (불안정)
- Restaurant Admin 입장에서 자신이 Brand/Foodcourt에 내는 의무가 Profile에 안 보임

## Goal

Restaurant 생성/편집 시 POS 구독 + 프랜차이즈/테넌시 agreement를 **명확히 분리해서 관리**하고, Restaurant Admin에게 **모든 recurring obligation**을 투명하게 표시.

## Design Principles (30년차)

1. **관심사 분리** — POS 구독(플랫폼 의무) vs 프랜차이즈/테넌시(비즈니스 관계) 완전 독립
2. **자동 생성 금지** — 쉘 데이터 자동 생성 안 함, 명시 액션만
3. **변경 지연 적용** — 금액 영향 있는 변경은 다음 주기부터 (현재 invoice 보호)
4. **완전 감사** — 모든 변경 ActivityLog 저장
5. **기존 인프라 재사용** — `pending_*` 필드 + `applyPendingPlanChanges()` + `ActivityLog` 이미 존재

## Scope

### In scope
- Restaurant Edit 모달 (Manager/RestaurantsPage.tsx):
  - POS 섹션: plan 변경 시 `pending_*` 필드로 저장, "Upcoming change" 표시, [Cancel] 버튼
  - Franchise Agreement 섹션 (Brand General) / Tenancy Agreement (Foodcourt General)
- Profile > Subscription 탭 확장:
  - Franchise Royalty 카드 (brand 연결된 경우)
  - Tenancy Rent 카드 (foodcourt 연결된 경우)
  - Pending plan 표시
  - View change history 링크
- Backend:
  - `PUT /restaurants/:id` pending_* 저장 로직
  - `POST /restaurants/:id/cancel-pending-change` 신규
  - GET 응답에 contract_summary / entity_plan_summary 조인

### Out of scope
- Proration (즉시 적용 시 일할 계산) — 다음 주기 적용 정책으로 회피
- 신규 페이지 — 기존 Profile, ActivityHistoryPage 확장만
- SystemAdmin 긴급 즉시 변경 경로 — 별도 스펙

## Key Rules

### 적용 시점

| 변경 항목 | 적용 시점 |
|-----------|----------|
| `plan_type` | 다음 주기 (pending) |
| `plan_amount` | 다음 주기 (pending) |
| `billing_cycle` | 다음 주기 (pending) |
| `discount_type/value` | 다음 주기 (pending) |
| `payment_model` | 즉시 |

### pending_* 필드 사용법 (이미 존재)

- `pending_plan_type`, `pending_plan_amount`, `pending_billing_cycle` — 예약된 값
- `plan_change_date` — 적용 예정일 (다음 billing day)
- `plan_change_type` — 'upgrade' / 'downgrade' / 'billing_cycle_change'
- `invoiceScheduler.applyPendingPlanChanges()` 가 매일 2AM 실행 → plan_change_date ≤ today면 실제 필드로 이관 + ActivityLog 자동 기록

### 다음 billing day 계산

```js
// subscription_start 의 day-of-month 기준
const effDay = subscription_start.getDate();
const now = new Date();
if (now.getDate() < effDay) return new Date(now.getFullYear(), now.getMonth(), effDay);
else return new Date(now.getFullYear(), now.getMonth() + 1, effDay);
```

annual billing 이면 subscription_start + 1year - (오늘 대비).

## UI 레이아웃

### Restaurant Edit 모달 (Brand General 관점)

```
╔══════════════════════════════════════════╗
║ Edit Restaurant                        × ║
╠══════════════════════════════════════════╣
║ Restaurant Info (기존)                    ║
║                                           ║
║ POS Subscription (platform fee)           ║ <- h3 purple border
║ Issuer: 🏢 System Admin · Payer: [select] ║
║   Plan, amount, billing cycle, period    ║
║   [Upcoming: → Professional from 2026-02]║
║   [Cancel scheduled change]              ║
║                                           ║
║ Franchise Agreement (your brand billing)  ║ <- h3 teal border
║ Issuer: 🏪 Your Brand · Payer: Restaurant ║
║   Contract card [View/Change]             ║
║   Franchise Plan card [View/Change]       ║
║   또는 미연결 경고                         ║
║                                           ║
║ [View change history →]  (소형 링크)      ║
╠══════════════════════════════════════════╣
║                     [Cancel]  [Save]     ║
╚══════════════════════════════════════════╝
```

### Profile > Subscription 탭 (Restaurant Admin 관점)

```
┌─ POS Subscription ─────────────────────┐
│ 🏢 PurpleHere Platform                 │
│ Basic Plan · RM 29/mo                  │
│ Next: 2026-02-15 · RM 29                │
│ Payer: You                             │
│ 📋 Upcoming: → Professional 2026-03-15 │
│ [View invoices →]                      │
└────────────────────────────────────────┘

┌─ Franchise Royalty (when linked) ──────┐
│ 🏪 K-DINE Brand                         │
│ 5% of revenue · Monthly · 매월 27일    │
│ Last: 2026-01-27 · RM 1,234.50          │
│ Contract: CONTRACT-2024-001 [View]     │
│ [View invoices →]                      │
└────────────────────────────────────────┘

┌─ Tenancy Rent (when linked) ───────────┐
│ 🏬 ABC Foodcourt · Unit A-15            │
│ RM 3,000/month · 매월 1일              │
│ Next: 2026-02-01 · RM 3,000             │
│ [View invoices →]                      │
└────────────────────────────────────────┘

[View full change history →]
```

## 구현 Phase

1. **Phase A — Backend**: pending 저장 + GET 조인 + cancel endpoint
2. **Phase B — Frontend**: Brand General Edit 모달 확장
3. **Phase C — Frontend**: Profile > Subscription 탭 확장
4. **Phase D — Frontend**: Foodcourt General 동일 패턴 (자동)
5. **Phase E — Frontend**: ActivityHistoryPage entity filter

각 Phase 검증 (10단계) 후 다음. 배포는 Irene `/배포` 시에만.

## Verification

- Pending 시나리오: Brand General이 Basic → Pro 변경 → pending_plan_type=Professional, plan_change_date=next billing day 확인
- Cancel 시나리오: [Cancel pending] → pending_* 모두 null
- 즉시 시나리오: payment_model 변경 → 즉시 반영, 다음 invoice payer 새 값
- Apply 시나리오: plan_change_date = 어제 로 수동 세팅 → applyPendingPlanChanges 실행 → actual 필드 업데이트 + ActivityLog 기록
- Restaurant Admin 뷰: Profile > Subscription 탭에 3 카드 (POS/Franchise/Tenancy) 올바르게 표시, 연결 없는 카드는 숨김
