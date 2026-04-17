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
               fitout_responsibility, operating_hours, restoration_required }

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
