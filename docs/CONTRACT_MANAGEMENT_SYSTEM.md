# Franchise & Tenancy Management System

> **Created:** 2026-04-07
> **Status:** Design Confirmed
> **Scale:** Large (new system, DB changes)

---

## 1. Overview

### 1-1. Purpose
Brand General and Foodcourt General need to manage the full lifecycle of franchise/tenancy relationships with restaurants — from initial proposal through contract signing, setup, and ongoing operations including renewal management.

### 1-2. Menu Names
- **Brand General**: Franchise Management
- **Foodcourt General**: Tenancy Management

### 1-3. Key Principle
- **Purely additive** — no existing code logic changes
- Uses existing EntityPlanRestaurant for plan assignments
- Does not touch restaurant.brand_id / foodcourt_id
- Uses existing /api/upload/files for document uploads
- Not an addon module — built-in menu for all Brand/Foodcourt General users

---

## 2. Pipeline Stages (4 Stages)

| # | Stage | Label | Core Action | Next Stage Condition |
|:-:|-------|-------|-------------|:-------------------:|
| 1 | **Proposal** | Proposal | Applicant info, negotiate terms, confirm conditions | Proposed terms filled |
| 2 | **Contracting** | Contracting | Contract info (dates, number), upload documents | Contract number + dates + 1 document minimum |
| 3 | **Setup** | Setup | Task checklist, track preparation progress | All tasks completed |
| 4 | **Active** | Active | Contract summary, linked plans, invoices, renewal/termination | - |

Additional statuses: **Terminated**, **Expired**, **Renewed**

### Stage Transition Rules
- Forward only — no going back to previous stages
- Drag in pipeline view: Proposal → Contracting only
- All other transitions via "Proceed" button in detail page (with validation)
- Restaurant link: optional in Stages 1~3, **required for Active**
- Condition edits after Active: treated as Amendment (logged in History)

---

## 3. Stage Details

### Stage 1: Proposal

```
┌──────────────────────────────────────────────────────────────┐
│  Applicant Information                                        │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  Name          [                    ]                   │   │
│  │  Email         [                    ]                   │   │
│  │  Phone         [                    ]                   │   │
│  │  Business Type [                    ]                   │   │
│  │  Location      [                    ]  (Brand)          │   │
│  │  Preferred Unit[         ▾]           (Foodcourt)       │   │
│  │  Notes         [                                   ]    │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  Link Restaurant (optional)                                   │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  [Select existing restaurant ▾]  or  Not yet on POS    │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  Proposed Terms                                               │
│  ┌────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  [Brand — Franchise Terms]                              │   │
│  │  Franchise Type    [Franchise ▾]                        │   │
│  │  Contract Period   [24] months                          │   │
│  │  Franchise Fee     [         ] (one-time)               │   │
│  │  Royalty           [5] % of monthly revenue             │   │
│  │                    OR [      ] fixed monthly             │   │
│  │  Marketing Fund    [2] % of monthly revenue             │   │
│  │  Security Deposit  [         ]                          │   │
│  │  Territory         [                              ]     │   │
│  │  Renewal           [Auto ▾] alert [3] months before     │   │
│  │  Termination Notice[3] months                           │   │
│  │  Early Term. Fee   [         ]                          │   │
│  │                                                         │   │
│  │  [Foodcourt — Tenancy Terms]                            │   │
│  │  Tenancy Type      [Standard Lease ▾]                   │   │
│  │  Contract Period   [24] months                          │   │
│  │  Unit              [      ▾] (from Unit Management)     │   │
│  │  Base Rent         [         ] / month                  │   │
│  │  Revenue Share     [8] % (min guarantee: [        ])    │   │
│  │  Maintenance (CAM) [         ] / month                  │   │
│  │  Security Deposit  [3] months rent                      │   │
│  │  Fitout Cost       [Tenant ▾] responsibility            │   │
│  │  Operating Hours   [10:00 ~ 22:00]                      │   │
│  │  Renewal           [Manual ▾] alert [2] months before   │   │
│  │  Termination Notice[2] months                           │   │
│  │  Early Term. Fee   [         ]                          │   │
│  │  Restoration       [Required ▾]                         │   │
│  │                                                         │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  Notes / History                                              │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  [Add note...]                                          │   │
│  │  2026-04-07  Initial meeting. — Manager                 │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│                [Save Draft]    [Proceed to Contracting →]     │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### Stage 2: Contracting

```
┌──────────────────────────────────────────────────────────────┐
│  Contract Information                                         │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  Contract Number   [                  ]                 │   │
│  │  Start Date        [                  ]                 │   │
│  │  End Date          [                  ] (auto-calc)     │   │
│  │  Signing Date      [                  ]                 │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  Link Restaurant (optional — required before Active)          │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  [Select existing restaurant ▾]  or  [Not yet on POS]  │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  Confirmed Terms (from Proposal — still editable)             │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  (Proposal terms displayed, editable, changes logged)   │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  Documents                                                    │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  [+ Upload Document]                                    │   │
│  │  Contract_Agreement.pdf      2026-04-15  [Download][X]  │   │
│  │  Business_Registration.pdf   2026-04-10  [Download][X]  │   │
│  └────────────────────────────────────────────────────────┘   │
│  Uses existing /api/upload/files                              │
│                                                               │
│  Link to Plans (optional)                                     │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  [+ Assign Plan]                                        │   │
│  │  Royalty Plan — 5% revenue share          Active        │   │
│  │  Marketing Fund — 2% revenue share        Active        │   │
│  │  Uses existing EntityPlanRestaurant API                  │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│                               [Proceed to Setup →]            │
│  Requires: Contract Number + Start/End Date + 1 Document      │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### Stage 3: Setup

```
┌──────────────────────────────────────────────────────────────┐
│  Setup Checklist                     Target Open: 2026-06-01  │
│                                                               │
│  Progress: 5/7                               [+ Add Task]     │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  ✅  Interior design approved          2026-04-20      │   │
│  │  ✅  Construction completed            2026-05-10      │   │
│  │  ✅  Equipment installed               2026-05-15      │   │
│  │  ✅  Staff training completed          2026-05-20      │   │
│  │  ✅  Menu registered on POS            2026-05-22      │   │
│  │  ☐   Health & safety inspection                        │   │
│  │  ☐   Trial operation                                   │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  Person in Charge: [                    ]                     │
│  Notes: [                                              ]      │
│                                                               │
│  Link Restaurant (if not linked yet)                          │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  [Select existing restaurant ▾]                         │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  [Start Operations →]  (all tasks complete + restaurant linked)│
│                                                               │
└──────────────────────────────────────────────────────────────┘

Checklist template from Settings (customizable per contract)
```

### Stage 4: Active

```
┌──────────────────────────────────────────────────────────────┐
│  Restaurant Name                                   [Active]   │
│                                                               │
│  Contract Summary                                             │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  Contract: FC-2026-0042                                 │   │
│  │  Period: 2026-06-01 ~ 2028-05-31 (23 months remaining) │   │
│  │  Renewal: Auto — alert 3 months before                  │   │
│  │  Next Renewal Alert: 2028-02-28                         │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  Financial Terms                                              │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  [Brand]                                                │   │
│  │  Franchise Fee: RM 50,000 (paid)                        │   │
│  │  Royalty: 5% of revenue                                 │   │
│  │  Marketing Fund: 2% of revenue                          │   │
│  │  Security Deposit: RM 10,000                            │   │
│  │  Territory: Gangnam district, exclusive                  │   │
│  │                                                         │   │
│  │  [Foodcourt]                                            │   │
│  │  Unit: A-04 (200 sqft)                                  │   │
│  │  Base Rent: RM 3,000/month                              │   │
│  │  Revenue Share: 8% (min RM 3,000)                       │   │
│  │  Maintenance: RM 500/month                              │   │
│  │  Deposit: RM 9,000 (3 months)                           │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  Linked Plans (own plans only — POS subscription not shown)   │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  Plan                Type         Amount      Status    │   │
│  │  Royalty Plan         5% revenue  -           Active    │   │
│  │  Marketing Fund       2% revenue  -           Active    │   │
│  │  Base Rent            Fixed       RM 3,000    Active    │   │
│  │  Maintenance Fee      Fixed       RM 500      Active    │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  Documents                                                    │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  Contract_Agreement.pdf                    [Download]   │   │
│  │  Business_Registration.pdf                 [Download]   │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  History / Timeline                                           │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  2026-08-01  Started operations                         │   │
│  │  2026-07-15  Setup completed (7/7)                      │   │
│  │  2026-04-15  Contract signed                            │   │
│  │  2026-04-05  Proposal created                           │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  [Renew Contract]  [Terminate Contract]                       │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 4. Page Layouts

### 4-1. Main Page: Pipeline + List Toggle

```
┌──────────────────────────────────────────────────────────────┐
│  Franchise Management                    [+ New Proposal]     │
│                                                               │
│  [Pipeline]  [List]                                           │
│                                                               │
│  ── Pipeline View ──                                          │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐ │
│  │ Proposal(3)│ │Contract(1) │ │ Setup (2)  │ │ Active (8) │ │
│  ├────────────┤ ├────────────┤ ├────────────┤ ├────────────┤ │
│  │ Park's     │ │ New Place  │ │ Seoul BBQ  │ │ Kim's Cafe │ │
│  │ Chicken    │ │ 03/28      │ │ 5/7 done   │ │ ~2028-03   │ │
│  │ 04/05      │ │            │ │            │ │            │ │
│  │            │ │            │ │ Pasta      │ │ Park's BBQ │ │
│  │ Choi's     │ │            │ │ House      │ │ ~2028-05   │ │
│  │ Pizza      │ │            │ │ 3/7 done   │ │            │ │
│  │ 04/07      │ │            │ │            │ │ View all(8)│ │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘ │
│                                                               │
│  Pipeline: drag only Proposal → Contracting                   │
│  Active column: shows max 5 + "View all" link                 │
│  Card click → detail page                                     │
│                                                               │
│  ── List View ──                                              │
│  Search: [________]  Stage: [All ▾]  Sort: [Newest ▾]        │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ Name            Stage        Period          Restaurant│   │
│  │ Park's Chicken  Proposal     -               (unlinked)│   │
│  │ Seoul BBQ       Setup        2026-06~2028-05 Seoul BBQ │   │
│  │ Kim's Cafe      Active       2026-04~2028-03 Kim's Cafe│   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 4-2. Detail Page: Stage Progress Bar

```
┌──────────────────────────────────────────────────────────────┐
│  ← Back to list                                               │
│                                                               │
│  Park's Chicken                              Stage: Proposal  │
│                                                               │
│  ┌─ Progress ──────────────────────────────────────────────┐  │
│  │  [● Proposal]──[○ Contracting]──[○ Setup]──[○ Active]  │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                               │
│  (Current stage content here)                                 │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 4-3. Restaurants Page Enhancement

Existing Restaurants page — add Contract and Linked Plans columns:

```
┌──────────────────────────────────────────────────────────────┐
│  Restaurants                                                  │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ Restaurant    Contract     Linked Plans         Status │   │
│  │ ──────────────────────────────────────────────────     │   │
│  │ Kim's Cafe    Active       Royalty 5%            ●     │   │
│  │               ~2028-03     Marketing 2%                │   │
│  │               [View →]                                 │   │
│  │                                                         │   │
│  │ Seoul BBQ     Setup        Royalty 5%            ●     │   │
│  │               5/7 done     Marketing 2%                │   │
│  │               [View →]                                 │   │
│  │                                                         │   │
│  │ Pasta House   Active       Base Rent RM3,000     ●     │   │
│  │               ~2027-12     CAM RM500                   │   │
│  │               [View →]     Rev Share 8%                │   │
│  │                                                         │   │
│  │ New Rest.     -            -                     ●     │   │
│  │               (no contract)                            │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  Stage badge colors:                                          │
│    Proposal    = #DBEAFE / #2563EB (Info blue)                │
│    Contracting = #FEF3C7 / #D97706 (Warning yellow)           │
│    Setup       = #FEF3C7 / #D97706 (Warning yellow)           │
│    Active      = #ECFDF5 / #059669 (Success green)            │
│    Terminated  = #F3F4F6 / #6B7280 (Inactive gray)            │
│                                                               │
│  Linked Plans: own EntityPlans only (POS sub not shown)       │
│  Restaurants without contracts: Contract column shows "-"     │
│  Unlinked proposals: not shown here (shown in FM/TM only)     │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 4-4. Sidebar Menu

```
[Brand General]
  Dashboard
  ── Management ──
  Restaurants
  Franchise Management     ← NEW
  Plans & Subscriptions
  ── Operations ──
  Invoices
  Reports
  ...

[Foodcourt General]
  Dashboard
  ── Management ──
  Restaurants
  Tenancy Management       ← NEW
  Plans & Subscriptions
  ── Operations ──
  Invoices
  Reports
  ...
```

### 4-5. Foodcourt Only: Unit Management

Accessible from Tenancy Management page (tab or settings area):

```
┌──────────────────────────────────────────────────────────────┐
│  Unit Management                            [+ Add Unit]      │
│                                                               │
│  Occupancy: 12/15 (80%)                                       │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ Unit    Size       Status       Tenant       Contract  │   │
│  │ A-01    120 sqft   Occupied     Kim's Cafe   ~2028-03 │   │
│  │ A-02    150 sqft   Occupied     Seoul BBQ    ~2028-05 │   │
│  │ A-03    100 sqft   Vacant       -            -        │   │
│  │ A-04    200 sqft   Preparing    New Place    Setup    │   │
│  │ B-01    180 sqft   Occupied     Pasta House  ~2027-12 │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  Status: Vacant / Reserved / Preparing / Occupied             │
│  Linked to contract — auto-updates on stage transitions       │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 5. Renewal & Termination

### Renewal

```
[Renew Contract] on Active detail page
  → Creates new contract with existing terms copied (editable)
  → Previous contract: status → 'renewed'
  → New contract:
    - Terms unchanged → directly Active
    - Terms modified → starts at Proposal
  → Previous contract linked via renewed_from_id / renewed_to_id
```

### Termination

```
[Terminate Contract] on Active detail page
  → Termination reason (required): Natural expiry / Early termination / Breach
  → Settlement checklist:
    □ Outstanding invoices settled
    □ Security deposit returned
    □ Unit restoration confirmed (Foodcourt only)
  → Contract status → 'terminated'
  → Option: Unlink restaurant (remove brand_id/foodcourt_id) — user chooses
```

### Renewal Alerts
- Contract expiry - N months (contract.renewal_alert_months)
- Shown in Franchise/Tenancy Management page as banner
- Email notification to Brand/Foodcourt General
- Dashboard alert integration in Phase 3

---

## 6. Technical Design

### 6-1. DB Models (all new — no existing model changes)

**Contract:**
```
id (PK)
entity_type ('brand' / 'foodcourt')
entity_id (FK → brands.id or foodcourts.id)
restaurant_id (FK → restaurants.id, nullable)
stage ('proposal' / 'contracting' / 'setup' / 'active' / 'terminated' / 'renewed' / 'expired')

-- Applicant (before restaurant link) — 2026-04-17: name 분리
applicant_company_name, applicant_contact_person
applicant_email, applicant_phone
applicant_business_type, applicant_location, applicant_notes
-- (legacy applicant_name removed; PUT body still accepted as fallback)

-- Contract info
contract_number (STRING, unique within entity)
contract_type
  Brand: 'franchise' / 'license' / 'master' / 'direct'
  Foodcourt: 'standard' / 'revenue_share' / 'popup'
start_date, end_date, duration_months, signing_date

-- Financial terms (JSON — different per type)
financial_terms (JSON)
  Brand: { franchise_fee, royalty_type, royalty_value, marketing_fund_type,
           marketing_fund_value, security_deposit, territory }
  Foodcourt: { base_rent, revenue_share_percent, min_guarantee,
               maintenance_fee, security_deposit, security_deposit_months,
               fitout_responsibility, operating_hours, restoration_required,
               billing_day (1~28), grace_days (0~60) }

  ⚠ base_rent + billing_day 는 **실제 청구를 발생시킨다** (2026-07-11~).
    stage='active' + base_rent > 0 인 계약은 매월 임대료 인보이스가 자동 발행된다
    (금액 = base_rent + maintenance_fee, 납기 = billing_day + grace_days).
    billing_day 는 1~28 만 허용 — 29~31 은 그런 날이 없는 달에서 발행 누락이 난다.
    설계·구현 = docs/TENANT_RENT_BILLING.md, 발행 로직 = services/rentBilling.js
    revenue_share_percent(매출연동) 은 아직 청구에 반영되지 않는다(입력만).

-- Renewal
renewal_type ('auto' / 'manual' / 'none')
renewal_alert_months (INT, default 3)
termination_notice_months (INT)
early_termination_fee (DECIMAL 10,2)

-- Foodcourt only
unit_id (FK → foodcourt_units.id, nullable)

-- Setup
target_open_date (DATE)
person_in_charge (STRING)

-- Termination
terminated_at (DATE), termination_reason (TEXT)
terminated_by (FK → users.id)

-- Renewal linking
renewed_from_id (FK → contracts.id)
renewed_to_id (FK → contracts.id)

-- Meta
notes (TEXT)
created_by, updated_by (FK → users.id)
```

**ContractDocument:**
```
id, contract_id (FK)
file_name, file_url, file_size, file_type
document_type ('contract' / 'appendix' / 'amendment' / 'other')
uploaded_by (FK → users.id)
```

**ContractTask:**
```
id, contract_id (FK)
title, description
is_completed (BOOLEAN)
completed_by (FK → users.id), completed_at (DATE)
sort_order (INT)
```

**ContractNote:**
```
id, contract_id (FK)
content (TEXT)
created_by (FK → users.id)
```

**ContractHistory:**
```
id, contract_id (FK)
action ('created' / 'stage_changed' / 'terms_updated' / 'document_uploaded' /
        'task_completed' / 'restaurant_linked' / 'plan_assigned' / 'terminated' / 'renewed')
from_value, to_value (STRING)
details (JSON)
changed_by (FK → users.id)
```

**ContractPlan (reference only — actual assignment via EntityPlanRestaurant):**
```
id, contract_id (FK), entity_plan_id (FK → entity_plans.id)
assigned_at (DATE)
```

**FoodcourtUnit (Foodcourt only):**
```
id, foodcourt_id (FK)
unit_number (STRING), size_value (DECIMAL), size_unit ('sqft' / 'sqm')
location_description (STRING)
status ('vacant' / 'reserved' / 'preparing' / 'occupied')
current_contract_id (FK → contracts.id, nullable)
```

### 6-2. API Endpoints

```
── Contract CRUD ──
POST   /api/contracts                     Create new contract (Proposal)
GET    /api/contracts                     List contracts (filtered by user's entity)
GET    /api/contracts/:id                 Contract detail
PUT    /api/contracts/:id                 Update contract info/terms
PUT    /api/contracts/:id/stage           Transition stage (with validation)
POST   /api/contracts/:id/renew          Create renewal contract
POST   /api/contracts/:id/terminate      Terminate contract

── Documents (uses existing /api/upload/files) ──
POST   /api/contracts/:id/documents       Add document reference
GET    /api/contracts/:id/documents       List documents
DELETE /api/contracts/:id/documents/:docId Remove document

── Tasks (Setup checklist) ──
GET    /api/contracts/:id/tasks           List tasks
POST   /api/contracts/:id/tasks           Add task
PUT    /api/contracts/:id/tasks/:taskId   Complete/update task
DELETE /api/contracts/:id/tasks/:taskId   Remove task

── Notes ──
GET    /api/contracts/:id/notes           List notes
POST   /api/contracts/:id/notes           Add note

── History ──
GET    /api/contracts/:id/history         Full timeline

── Plans (reference — uses existing EntityPlanRestaurant API) ──
POST   /api/contracts/:id/plans           Record plan assignment
DELETE /api/contracts/:id/plans/:planId   Remove plan reference

── Foodcourt Units ──
GET    /api/foodcourts/:id/units          List units
POST   /api/foodcourts/:id/units          Add unit
PUT    /api/foodcourts/:id/units/:unitId  Update unit
DELETE /api/foodcourts/:id/units/:unitId  Remove unit

── Checklist Templates ──
GET    /api/contracts/templates            Get checklist templates
PUT    /api/contracts/templates            Update templates
```

### 6-3. Existing Code Changes (minimal)

| File | Change | Detail |
|------|--------|--------|
| **ProtectedRoute.tsx** | Add 2 routes | `/pos/brand/franchise`, `/pos/foodcourt/tenancy` to brandLevelRoutes |
| **MainLayout.tsx** | Add 2 menu items | "Franchise Management" for Brand, "Tenancy Management" for Foodcourt |
| **Restaurants page** | Add 2 columns | Contract stage badge + Linked Plans display |
| **App.tsx** | Add routes | `/pos/brand/franchise`, `/pos/foodcourt/tenancy` |
| **AuthContext.tsx** | Add routes to ROLE_ROUTES | Brand General + Foodcourt General route arrays |
| **models/index.js** | Add associations | New model relationships |
| **server.js** | Register routes | `/api/contracts`, `/api/foodcourt-units` |

No changes to: Restaurant model, Brand model, Foodcourt model, EntityPlan, EntityPlanRestaurant, Invoice, auth, subscription logic.

### 6-4. New Files

```
Backend:
  models/Contract.js
  models/ContractDocument.js
  models/ContractTask.js
  models/ContractNote.js
  models/ContractHistory.js
  models/ContractPlan.js
  models/FoodcourtUnit.js
  routes/contracts.js
  routes/foodcourt-units.js

Frontend:
  pages/BrandGeneral/FranchiseManagementPage.tsx
  pages/FoodcourtGeneral/TenancyManagementPage.tsx
  components/Contract/ContractPipeline.tsx
  components/Contract/ContractDetail.tsx
  components/Contract/ContractStageBar.tsx
  components/Contract/ChecklistSection.tsx
  components/Contract/DocumentSection.tsx
  components/Contract/NoteSection.tsx
```

### 6-5. Security

| Item | Implementation |
|------|---------------|
| Auth | All APIs require authenticateToken |
| Access | Brand General sees only own brand contracts, Foodcourt sees own |
| Validation | Stage transitions validate required fields |
| File upload | Uses existing upload security (file type/size limits) |
| History | All changes automatically logged — no manual bypass |

---

## 7. Existing Code Conflict Prevention — Verified

### Conflict 1: Plan assignment duplication
- **Risk:** Plans page and Contract detail both assign plans to restaurants
- **Resolution:** Both use same EntityPlanRestaurant API. ContractPlan is reference-only record. No data duplication.

### Conflict 2: restaurant.brand_id / foodcourt_id
- **Risk:** Contract might need to set/unset these fields
- **Resolution:** Contract does NOT touch these fields. Contract.restaurant_id is a separate reference. Termination offers unlink as optional manual action only.

### Conflict 3: File upload path
- **Risk:** New upload folder structure needed
- **Resolution:** Uses existing /api/upload/files as-is. Stores returned URL in ContractDocument.

### Conflict 4: addon_modules gating
- **Risk:** Menu might not show without module registration
- **Resolution:** Added as built-in menu (not addon). Direct sidebar entry without isRouteAllowed check for this specific menu.

### Conflict 5: Dashboard alerts
- **Resolution:** Phase 3 only. Phase 1-2 do not modify existing dashboard pages.

### No conflicts: ProtectedRoute (additive), AuthContext (additive), MainLayout sidebar (independent role blocks), App.tsx routes (additive), models/index.js (additive associations only)

---

## 8. Edge Cases

| Situation | Handling |
|-----------|----------|
| Restaurant linked to contract but also independently assigned to plans | Both valid — contract tracks which plans were assigned "because of" the contract |
| Contract terminated but restaurant still has brand_id | brand_id stays unless user explicitly unlinks — existing invoices/plans unaffected |
| Multiple active contracts for same restaurant | Allowed (e.g., franchise agreement + separate marketing agreement) |
| Renewal with changed terms | Creates new contract at Proposal stage, old contract marked 'renewed' |
| Renewal with same terms | Creates new contract directly at Active stage |
| Contract for restaurant not yet on POS | Restaurant link = null until POS signup, Active requires link |
| Foodcourt unit assigned to terminated contract | Unit status → 'vacant' on termination |
| Checklist template changed after contract created | Existing contract keeps its tasks, template changes apply to new contracts only |

---

## 9. Implementation Plan

### Phase 1: Core
1. DB models 7 + associations + sync-database
2. routes/contracts.js (CRUD + stage transition + validation)
3. routes/foodcourt-units.js
4. FranchiseManagementPage (Pipeline + List + Detail with 4 stages)
5. TenancyManagementPage (same structure, tenancy-specific fields)
6. ContractPipeline, ContractDetail, ContractStageBar components
7. Sidebar menu additions
8. App.tsx + ProtectedRoute + AuthContext route additions

### Phase 2: Features
9. Document upload/download (ContractDocument + existing upload API)
10. Setup checklist (ContractTask CRUD)
11. Notes section (ContractNote)
12. History timeline (ContractHistory — auto-logged)
13. Plan linking (ContractPlan reference + EntityPlanRestaurant API)
14. Restaurants page enhancement (contract badge + linked plans columns)
15. FoodcourtUnit management UI

### Phase 3: Operations
16. Renewal process (copy contract, link old/new)
17. Termination process (settlement checklist, optional restaurant unlink)
18. Renewal alert system (email + page banner)
19. Dashboard alert integration (expiring contracts, pending proposals)
20. Checklist template settings

---

# Contract Management Enhancement (2026-04-17 설계 / 2026-04-18 구현 완료)

> **Design Status:** 1~4단계 완료, Irene 승인
> **Implementation Status:** **Phase 1 / 1.5 / 2 / 3 전체 구현 완료 (2026-04-18)** — 운영 배포 대기
> **실무 계약서 기반 보완 작업** — K-DINE 가맹계약 + Tropicana 입점계약 참조

## 구현 결과 요약 (2026-04-18)

- **DB:** contracts 15 컬럼 + contract_tasks 2 컬럼 ADD (dev 적용)
- **백엔드:** Contract.js validate 훅 4종, Brand/Foodcourt afterUpdate sync 훅, contractSupportServices 카탈로그 (Brand/Foodcourt 각 12개), GET /contracts/support-services/template, Setup stage 자동 task 생성
- **프론트:** 신규 컴포넌트 8개 (BankInfoField, RepresentativeField, SyncMasterToggle, RentScheduleEditor, PercentageRentField, ConditionListEditor, SupportServicesChecklist, LegalTermsEditor), ContractDetail 4탭 구조 + 12 섹션 재구성 + HeaderActions 상단 미러링 + 필수 필드 disabled
- **검증:** 빌드 exit 0, health-check 40/40, API round-trip 모든 Phase 통과

## 1. 기능 정의 (Stage 1)

| 항목 | 내용 |
|------|------|
| 목적 | 실무 계약서 수준의 재무/운영 조건을 폼에 완전 반영. 추후 PDF 계약서 자동 생성 기반 마련 |
| 사용자 | Brand General (가맹본부), Foodcourt General (푸드코트 운영사) |
| 분리 전략 | **옵션 A**: 단일 Contract 모델 + entityType 분기 UI (코드 공유 극대화) |
| Phase 분할 | **3단계 순차**: Phase 1 당사자 정보 → Phase 2 재무 조건 → Phase 3 조항 구조화 |
| 비범위 | PDF 출력, 전자서명, 가맹점/입점자 로그인 포털 (모두 미래 Phase) |

### 설계 결정 (Irene 확정)
- 기존 24건 계약: 신규 필드 **NULL로 두고** 사용자가 편집
- 대표자 저장 구조: **JSON 배열** (현재는 1명만, 확장 가능성 열어둠)
- 계좌정보 저장: **JSON** (`{ bank, account, holder, swift?, currency? }`)

## 2. API 설계 (Stage 2)

### 기존 엔드포인트 재활용 — body/response 확장만

**`PUT /api/contracts/:id`** — whitelist 필드 확장:

```
Phase 1 (당사자/발행자 정보):
- applicant_business_registration, applicant_website, applicant_bank_info (JSON), applicant_representatives (JSON 배열)
- issuer_company_name, issuer_business_registration, issuer_website, issuer_bank_info, issuer_representatives

Phase 2 (재무 조건) — financial_terms JSON 키 확장:
- Tenancy: unit_size_sqft, rent_schedule[], percentage_rent{rate, compare_against, higher_applies}, fit_out_period_days, handover_date, commencement_date
- Franchise: franchise_fee_original, franchise_fee_discount_reason, system_setup_fee, system_monthly_fee, initial_supply_package_included, royalty_payment{due_day, grace_days, late_interest_pct}, training_additional_cost_note

Phase 3 (계약 조항) — 신규 컬럼:
- special_conditions (JSON 배열): [{title, content}]
- renewal_policy (JSON): {type, notice_months, rent_policy, terms_changeable, renewal_period_years}
- exclusivity_terms (JSON, Brand만): {is_exclusive, territory_detail, sales_target, revocation_conditions[]}
- support_services (JSON 배열): [{code, title, included, notes}]
```

### 신규 엔드포인트 (1개)

**`GET /api/contracts/support-services/template?entity_type=brand|foodcourt`**
- 용도: 신규 계약 작성 시 12개 기본 지원업무 체크리스트 프리필
- 역할: Brand General / Foodcourt General / System Admin
- 응답: `{ success: true, data: [{code, title, description?}] }`

### 보안/응답 포맷
- 모든 엔드포인트: `authenticateToken + checkContractAccess` (entity_id 자동 격리)
- 응답 포맷: `{ success, data }` / `{ success: false, message }` 표준 유지

## 3. DB 스키마 (Stage 3)

### `contracts` 테이블 ALTER

**Phase 1 (당사자 + 발행자 정보):**
```sql
ALTER TABLE contracts
  ADD COLUMN applicant_business_registration VARCHAR(100) NULL AFTER applicant_contact_person,
  ADD COLUMN applicant_website VARCHAR(300) NULL AFTER applicant_business_registration,
  ADD COLUMN applicant_bank_info JSON NULL AFTER applicant_website,
  ADD COLUMN applicant_representatives JSON NULL AFTER applicant_bank_info,
  ADD COLUMN issuer_company_name VARCHAR(200) NULL,
  ADD COLUMN issuer_business_registration VARCHAR(100) NULL,
  ADD COLUMN issuer_website VARCHAR(300) NULL,
  ADD COLUMN issuer_bank_info JSON NULL,
  ADD COLUMN issuer_representatives JSON NULL;
```

**Phase 2**: ALTER 없음 (`financial_terms` JSON 키 확장)
- 모델 `beforeValidate` 훅으로 기본값 채우기
- unit_size_sqft는 `FoodcourtUnit` 테이블에도 있지만, Contract 시점 스냅샷으로 중복 저장 (unit 정보 변경 시에도 계약 보호)

**Phase 3 (계약 조항):**
```sql
ALTER TABLE contracts
  ADD COLUMN special_conditions JSON NULL,
  ADD COLUMN renewal_policy JSON NULL,
  ADD COLUMN exclusivity_terms JSON NULL,
  ADD COLUMN support_services JSON NULL;
```

### 모델 (`models/Contract.js`) 추가 필드

```js
applicant_business_registration: { type: DataTypes.STRING(100), allowNull: true },
applicant_website: { type: DataTypes.STRING(300), allowNull: true },
applicant_bank_info: { type: DataTypes.JSON, allowNull: true },
applicant_representatives: { type: DataTypes.JSON, allowNull: true, defaultValue: [] },
issuer_company_name: { type: DataTypes.STRING(200), allowNull: true },
issuer_business_registration: { type: DataTypes.STRING(100), allowNull: true },
issuer_website: { type: DataTypes.STRING(300), allowNull: true },
issuer_bank_info: { type: DataTypes.JSON, allowNull: true },
issuer_representatives: { type: DataTypes.JSON, allowNull: true, defaultValue: [] },
special_conditions: { type: DataTypes.JSON, allowNull: true, defaultValue: [] },
renewal_policy: { type: DataTypes.JSON, allowNull: true },
exclusivity_terms: { type: DataTypes.JSON, allowNull: true },
support_services: { type: DataTypes.JSON, allowNull: true, defaultValue: [] }
```

### 기존 24건 마이그레이션
- 신규 필드 전부 **NULL / 빈 배열 기본값** 유지
- 사용자가 필요 시 편집으로 보완

### 신규 테이블 없음
- `support_services`는 Contract 내 JSON 배열 (별도 테이블 불필요)
- 기존 `contract_tasks`는 Setup Stage 일반 태스크용으로 유지

## 4. UI 흐름 (Stage 4)

### 섹션 순서 (위→아래)

1. Header + Stage Bar (기존)
2. **Applicant Information** (Phase 1 확장)
3. **Issuer Information** (Phase 1 신규, Brand/Foodcourt 정보 자동 프리필)
4. Link Restaurant (기존)
5. Contract Information (기존 — Number/Type/Period/SigningDate/Duration/Remarks 6필드)
6. **Franchise Terms / Tenancy Terms** (Phase 2 확장)
7. **Special Conditions** (Phase 3 신규)
8. **Renewal Policy** (Phase 3 신규)
9. **Exclusivity** (Phase 3 신규, Brand만)
10. **Support Services Checklist** (Phase 3 신규, 12개 지원업무)
11. Documents (기존)
12. Setup Checklist (기존 tasks, Support services와 별개)
13. Notes & Comments (기존)

### Phase 1: Applicant / Issuer 섹션 레이아웃

**Applicant Information (확장):**
| 컬럼 1 | 컬럼 2 |
|--------|--------|
| Company Name | Business Registration |
| Contact Person | Position |
| Email | Phone |
| Website | Business Type |
| Address (span 2) | |
| Bank Info (Bank / Account / Holder) (span 2) | |
| Representative (Name / ID Number) (span 2) | |

**Issuer Information (신규):** 동일 구조
- 초기 로딩 시 Brand/Foodcourt 엔티티 데이터로 자동 프리필 배너
- 사용자 편집 가능 (계약 시점 스냅샷)

### Phase 2: 재무 섹션 레이아웃

**Tenancy Terms (푸드코트):**
- **Unit**: Unit Number (read-only) | Unit Size (sqft)
- **Rent Schedule**: 연도별 동적 테이블 (+Row 버튼) — Year / Base Rent / Service Charge psf / Cleaning
- **Percentage Rent**: Rate [%] + compare_against (Gross/Base) + ☑ Higher applies
- **Key Dates**: Handover Date | Commencement Date | Fit-Out Period [days]
- **Others**: Security Deposit | Min Guarantee | Operating Hours

**Franchise Terms (브랜드):**
- **Initial Fees**: Franchise Fee | Original Price | Discount Reason + Security Deposit
- **System**: Setup Fee | Monthly Fee + ☑ Supply Package Included + Note
- **Royalty**: Rate % | Due Day | Grace Days | Late Interest % annual
- **Marketing & Training**: Marketing Fund % | Training Additional Note
- **Territory**: Text field

### Phase 3: 조항 섹션 레이아웃

- **Special Conditions**: 동적 리스트 (+Add) — Title / Content (textarea) / Delete icon
- **Renewal Policy**: Type (select) | Notice Period | Rent Policy (select) | ☑ Terms Changeable | Initial/Renewal Term (years)
- **Exclusivity (Brand)**: ☑ Exclusive + Territory Detail + Sales Target + Revocation Conditions 리스트
- **Support Services**: 12개 프리필 체크리스트 — ☑ Included / Title / Notes

### 신규 공통 컴포넌트

| 컴포넌트 | 용도 |
|----------|------|
| `BankInfoField` | Bank/Account/Holder 한 세트 입력 (JSON 저장) |
| `RepresentativeField` | Name/ID Number/Position 한 세트 입력 |
| `RentScheduleEditor` | 연도별 임대료 동적 테이블 |
| `ConditionListEditor` | Special Conditions 동적 리스트 (title + content) |
| `SupportServicesChecklist` | 12개 체크리스트 컴포넌트 |

### UI 원칙
- UI_DESIGN_GUIDE.md 준수 (alert/성공메시지 금지, 이모지 금지)
- AutoSaveField로 모든 필드 자동 저장
- entityType === 'brand' / 'foodcourt' 분기 렌더
- 기존 DateField/DateRangeField/CurrencyInput/PercentInput 재사용

## 5. 보완 사항 (30년차 검증 반영)

### Critical (반드시 반영)

**C1. Issuer 정보 동기화 전략**
- Contract 생성 시: Brand/Foodcourt 마스터에서 자동 프리필
- Contract 편집 폼 상단에 토글: **☑ Keep in sync with Brand/Foodcourt master** (기본 on)
  - on: Brand 정보 수정 시 이 Contract의 issuer_* 자동 업데이트
  - off: Contract 독립 스냅샷 (법적 보호용)
- 기존 계약: 기본 off (이미 저장된 데이터 보호)
- 구현: `Contract.issuer_sync_with_master: BOOLEAN DEFAULT true`

**C2. financial_terms JSON 스키마 검증**
- `Contract.js`에 `validate` 훅 추가:
  ```js
  validate: {
    financialTermsSchema() {
      const ft = this.financial_terms || {};
      if (ft.rent_schedule && !Array.isArray(ft.rent_schedule)) throw new Error('rent_schedule must be array');
      if (ft.percentage_rent) {
        const pr = ft.percentage_rent;
        if (pr.rate != null && (pr.rate < 0 || pr.rate > 100)) throw new Error('percentage_rent.rate out of range');
      }
      // ... 각 키별 검증
    }
  }
  ```
- API 레벨 validator (`express-validator`)도 병행 (400 응답 빠르게)

**C3. Support Services ↔ Contract Tasks 연동**
- 설계 확장:
  - `support_services[i].included: true` 항목은 **Setup Stage 진입 시** `contract_tasks`에 자동 생성
  - 생성된 task의 `source_type: 'support_service'`, `source_code: <service code>` 필드로 역추적
  - 이렇게 하면 "계약에 포함된 지원업무"와 "실제 진행 상태"가 분리되어 관리됨
- 기존 `contract_tasks` 모델에 `source_type`, `source_code` 컬럼 추가 필요

**C4. 법적 조항 섹션 추가 (`legal_terms`)**
- 신규 JSON 컬럼:
  ```sql
  ALTER TABLE contracts ADD COLUMN legal_terms JSON NULL;
  ```
- 구조:
  ```json
  {
    "governing_law": "Malaysia",
    "dispute_resolution": "arbitration",  // arbitration | court | mediation
    "arbitration_venue": "KLRCA, Kuala Lumpur",
    "arbitration_language": "English",
    "contract_language": "English",  // 번역본 있어도 영어 원본 우선
    "notice_delivery_methods": ["registered_mail", "email"],
    "notice_email_response_hours": 24
  }
  ```
- UI 섹션 "Legal Terms" 신규 (Contract 탭 하단)

**C5. Percentage Rent 범위 명시**
- 이번 Phase에서는 **정보 저장만**. 인보이스 자동 반영은 **Phase 4 (별도 세션, 비범위)**
- 설계 문서 "비범위"에 추가: "Percentage Rent의 월별 자동 청구 반영"

**C6. 탭 인터페이스 도입 (UI 필수)**

섹션 순서 재구성 — **4개 탭**:

```
┌─────────────────────────────────────┐
│ Header + Stage Bar                  │
├─────────────────────────────────────┤
│ [Parties] [Contract] [Setup] [Docs] │
├─────────────────────────────────────┤
│ (선택 탭 내용)                       │
└─────────────────────────────────────┘
```

| 탭 | 포함 섹션 |
|----|-----------|
| **Parties** | Applicant Information, Issuer Information, Link Restaurant |
| **Contract** | Contract Information (6필드), Financial Terms, Special Conditions, Renewal Policy, Exclusivity (Brand만), Legal Terms |
| **Setup** | Support Services Checklist, Setup Tasks (기존) |
| **Documents** | Documents, Notes & Comments, History |

각 탭 진입 시 스크롤 리셋. 탭 상태 URL 쿼리 sync (`?tab=contract`).

### Important (반영 권장)

**I1. `rent_schedule[].year`는 상대 연도** (계약 시작일 기준 1, 2, 3...)
- 절대 연도 아님. 계약 연장 시에도 year는 reset되지 않고 누적 (3년 계약 후 갱신 시 Year 4, 5, 6)
- 유틸 함수 `getCurrentContractYear(startDate, today)` 추가 필요

**I2. Support Services 카테고리 그룹핑**
- 12개 항목을 4개 그룹으로:
  - **Initial Setup** (5): brand_rights, market_research, operation_manual, opening_support, supply_package
  - **Operations** (3): kitchen_setup, order_ordering_system, custom_order_process
  - **Training** (2): recipe_training, intensive_training
  - **Design** (2): brand_design, pos_setup

**I3. Rent Schedule 모바일 카드 변환**
- 데스크톱: 테이블 (Year | Base Rent | Service Charge | Cleaning)
- 모바일 (@media ≤ 768px): 연도별 카드 (각 카드에 라벨+값 세로 배치)

**I4. Read-only 모드 개선**
- `isEditable === false`일 때:
  - Input 대신 definition list (dl/dt/dd) 렌더
  - 값 없는 필드는 "—" 표시
  - 편집 아이콘 숨김

**I5. 빈 상태 디자인**
- Special Conditions 빈 배열 → "No special conditions" + `+ Add First Condition` CTA 버튼
- Representatives 빈 배열 → "No representatives" + `+ Add Representative` CTA 버튼

### Nice-to-have (확장 시)

- **N1. Percentage Rent 프리셋**: 4개 프리셋 버튼 ("Base only / Percentage only / Higher of two / Lower of two")
- **N2. 12개 service code 표준 리스트**: 영문 code + i18n 키 매핑 테이블 (`docs/CONTRACT_SUPPORT_SERVICES.md` 별도 문서)
- **N3. Termination Terms**: Phase 4로 미룸. deposit_forfeiture_conditions, return_items[], settlement_terms 등
- **N4. i18n 키 사전 정의**: 신규 필드 20+ 개 한국어/중국어/말레이 번역 키 목록 (구현 전 locales/*.json 업데이트)

## 6. 업데이트된 DB 스키마 요약

### Phase 1 ALTER (Critical C1 반영)
```sql
ALTER TABLE contracts
  ADD COLUMN applicant_business_registration VARCHAR(100) NULL,
  ADD COLUMN applicant_website VARCHAR(300) NULL,
  ADD COLUMN applicant_bank_info JSON NULL,
  ADD COLUMN applicant_representatives JSON NULL,
  ADD COLUMN issuer_company_name VARCHAR(200) NULL,
  ADD COLUMN issuer_business_registration VARCHAR(100) NULL,
  ADD COLUMN issuer_website VARCHAR(300) NULL,
  ADD COLUMN issuer_bank_info JSON NULL,
  ADD COLUMN issuer_representatives JSON NULL,
  ADD COLUMN issuer_sync_with_master BOOLEAN DEFAULT true;
```

### Phase 3 ALTER (Critical C4 반영)
```sql
ALTER TABLE contracts
  ADD COLUMN special_conditions JSON NULL,
  ADD COLUMN renewal_policy JSON NULL,
  ADD COLUMN exclusivity_terms JSON NULL,
  ADD COLUMN support_services JSON NULL,
  ADD COLUMN legal_terms JSON NULL;

ALTER TABLE contract_tasks
  ADD COLUMN source_type ENUM('manual', 'support_service', 'setup_template') DEFAULT 'manual',
  ADD COLUMN source_code VARCHAR(50) NULL;
```

## 7. 구현 계획 (Stage 5 — 다음 세션)

**Phase 1 (당사자 + Issuer + sync 토글 + Parties 탭)**
- DB ALTER 실행
- `Contract.js` 모델 확장 + validate 훅 기초
- `contracts.js` whitelist 확장 + prefill 로직 (create 시 Brand/Foodcourt 정보 자동 채움)
- `ContractDetail.tsx` 탭 인터페이스 도입 + Parties 탭 구현
- 신규 컴포넌트: `BankInfoField`, `RepresentativeField`, `SyncMasterToggle`

**Phase 2 (재무 확장 + Contract 탭 정비)**
- `financial_terms` validate 훅 완성
- Contract 탭 내 Financial Terms 재구성
- 신규 컴포넌트: `RentScheduleEditor`, `PercentageRentField`

**Phase 3 (조항 + Setup 탭)**
- Phase 3 ALTER 실행 (special_conditions, renewal_policy, exclusivity_terms, support_services, legal_terms + contract_tasks source_type/code)
- Support Services ↔ contract_tasks 연동 로직 (Setup stage 진입 훅)
- Contract 탭에 Special Conditions / Renewal / Exclusivity / Legal Terms 섹션 추가
- Setup 탭 구성
- 신규 컴포넌트: `ConditionListEditor`, `SupportServicesChecklist`, `LegalTermsEditor`

## 8. 테스트 시나리오 (Stage 6 — 구현 후 작성)

각 Phase별 최소:
- Write→Read 왕복 (모든 신규 필드 + JSON 구조)
- 기존 24건 계약의 NULL/defaultValue 처리 확인
- Brand/Foodcourt entityType별 UI 렌더 분기
- issuer_sync_with_master 토글 동작 (on/off 모두)
- Support Services → contract_tasks 자동 생성 검증
- financial_terms validate 훅 (잘못된 값 400 응답)
- 권한: cross-tenant 접근 차단 (`checkContractAccess`)
- 탭 라우팅: URL ?tab=xxx 쿼리 sync

## 9. 비범위 (명확히 제외)

- **PDF 계약서 자동 생성** (Phase 4 별도 세션)
- **Percentage Rent 월별 인보이스 자동 반영** (Phase 4)
- **전자서명 / 외부 eSign 연동**
- **가맹점/입점자 로그인 포털**
- **Termination Terms 상세 조항** (Phase 4)
- **12개 Support Services code 표준 목록 완성** (구현 시 `docs/CONTRACT_SUPPORT_SERVICES.md` 별도 정리)
