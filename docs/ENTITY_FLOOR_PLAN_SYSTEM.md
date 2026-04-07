# Brand Franchise Map & Foodcourt Floor Plan

> **Created:** 2026-04-07
> **Status:** Design Confirmed
> **Scale:** Medium-Large (new pages, minimal model changes)
> **Dependency:** Contract Management System must be implemented first

---

## 1. Overview

### 1-1. Purpose
Visual management of franchise/tenancy locations for Brand General and Foodcourt General, showing restaurant positions with contract status and performance data at a glance.

### 1-2. Two Different Approaches

| | Brand General | Foodcourt General |
|--|--------------|------------------|
| **Menu Name** | Franchise Map | Floor Plan |
| **View Type** | Area-grouped card grid + Detail Panel | Canvas layout (drag-placed units) + Detail Panel |
| **Node** | Restaurant card grouped by Area | Unit node on canvas |
| **Click** | Performance + franchise contract info | Performance + tenancy contract info |
| **Edit** | Area CRUD (add/rename/delete/reorder) | Unit position drag on canvas |
| **Stats Bar** | Status counts, total revenue, royalty | Occupancy %, total revenue, rent income |
| **Data Storage** | Brand.franchise_map (JSON) | Foodcourt.floor_plan (JSON) |

### 1-3. Key Principles
- Existing FloorPlan (Restaurant) is NOT modified — structure referenced, new components built
- No Socket.IO / real-time — page load + manual refresh
- Desktop-first (management tool, not operational)
- Mobile: list fallback for Foodcourt canvas, card view works natively for Brand
- Editor: desktop only for Foodcourt canvas

---

## 2. Foodcourt Floor Plan — Canvas Layout

### 2-1. View Mode

```
┌──────────────────────────────────────────────────────────────┐
│  Floor Plan                              [Edit] [Full Screen]│
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────┐ ┌────────────┐  │
│  │                                          │ │  Detail    │  │
│  │   ┌──────────┐          ┌──────────┐    │ │  Panel     │  │
│  │   │ Kim's    │          │ Seoul    │    │ │  (380px)   │  │
│  │   │ Cafe     │          │ BBQ      │    │ │            │  │
│  │   │ A-01     │          │ A-02     │    │ │  Kim's Cafe│  │
│  │   │ [Active] │          │ [Active] │    │ │  A-01      │  │
│  │   └──────────┘          └──────────┘    │ │  120 sqft  │  │
│  │                                          │ │            │  │
│  │   ┌──────────┐          ┌──────────┐    │ │  (content) │  │
│  │   │          │          │ New      │    │ │            │  │
│  │   │ Vacant   │          │ Place    │    │ │            │  │
│  │   │ A-03     │          │ A-04     │    │ │            │  │
│  │   │          │          │ [Setup]  │    │ │            │  │
│  │   └──────────┘          └──────────┘    │ │            │  │
│  │                                          │ │            │  │
│  │       [Entrance]    [Restroom]           │ │            │  │
│  │                                          │ │            │  │
│  └──────────────────────────────────────────┘ └────────────┘  │
│                                                               │
│  ── Stats Bar ──                                              │
│  Occupied: 4 │ Vacant: 1 │ Setup: 1 │ Occupancy: 83%        │
│  Total Rent: RM 12,500/mo │ Total Revenue: RM 185,000        │
│  Expiring Soon: 2                                             │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 2-2. Node Display

Each unit node shows:
- Restaurant name (or "Vacant")
- Unit number (A-01)
- Contract status badge

### 2-3. Status Colors (reusing existing FloorPlan palette)

| Status | Background | Border | Mapping |
|--------|-----------|--------|---------|
| Active | #EDE9FE | #7C3AED | occupied (purple) |
| Setup | #FEF9C3 | #CA8A04 | pending (yellow) |
| Expiring Soon | #FFF7ED | #F97316 | needs-attention (orange) |
| Vacant | #F3F4F6 | #D1D5DB | available (gray) |
| Terminated | #FEE2E2 | #DC2626 | cancelled (red) |

### 2-4. Detail Panel — Click Unit

**Occupied unit:**
```
┌────────────────────────┐
│  Kim's Cafe      [Active]│
│  Unit A-01 · 120 sqft   │
│                          │
│  ── Performance ──       │
│  Revenue: RM 45,200      │
│  Orders: 1,234           │
│  vs Last Month: +12%     │
│                          │
│  ── Contract ──          │
│  Period: 2026-04~2028-03 │
│  Remaining: 23 months    │
│  Renewal: Auto (3mo)     │
│                          │
│  ── Terms ──             │
│  Rent: RM 3,000/mo       │
│  CAM: RM 500/mo          │
│  Rev Share: 8%            │
│  Deposit: RM 9,000       │
│                          │
│  ── Plans (3) ──         │
│  Rent · CAM · Rev Share  │
│                          │
│  [View Contract →]       │
│  [View Restaurant →]     │
└──────────────────────────┘
```

**Vacant unit:**
```
┌────────────────────────┐
│  Unit A-03       [Vacant]│
│  100 sqft               │
│                          │
│  This unit is currently  │
│  vacant.                 │
│                          │
│  [Create Proposal →]     │
│                          │
│  ── Previous Tenant ──   │
│  Old Restaurant          │
│  2024-01 ~ 2026-03       │
│  Status: Terminated      │
└──────────────────────────┘
```

### 2-5. Editor Mode

```
[Edit] click → Editor mode

Left panel: Unplaced Units (from Unit Management)
┌────────────────┐
│ Unplaced Units │
│ A-06  120sqft  │  ← Drag to canvas
│ A-07  100sqft  │
├────────────────┤
│ Fixtures       │
│ [Entrance]     │
│ [Counter]      │
│ [Restroom]     │
│ [Label]        │
└────────────────┘

Canvas: Drag units to position, resize, rotate
Selected node: Edit label, size, rotation in properties panel
[Save] → PUT /api/foodcourts/:id/floor-plan

Units created in Unit Management (Tenancy Management > Settings)
Editor only assigns POSITION to existing units
```

### 2-6. Stats Bar

| Metric | Description |
|--------|------------|
| Status legend | Occupied: N, Vacant: N, Setup: N (color dots) |
| Occupancy | Occupied / Total units × 100% |
| Total Rent | Sum of base rent from active contracts |
| Total Revenue | Sum of restaurant revenue this month |
| Expiring Soon | Contracts expiring within 3 months |

---

## 3. Brand Franchise Map — Area Card Grid

### 3-1. Main View

```
┌──────────────────────────────────────────────────────────────┐
│  Franchise Map                                                │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ── Stats Bar ──                                              │
│  Active: 8 │ Setup: 2 │ Proposal: 1 │ Expiring: 1           │
│  Total Revenue: RM 425,000 │ Total Royalty: RM 21,250        │
│                                                               │
│  Search: [________]  Status: [All ▾]  Area: [All ▾]          │
│                                                               │
│  [+ Add Area]                                                 │
│                                                               │
│  ▼ Gangnam Area (3)                          [Edit] [Delete]  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│  │ Kim's Cafe  │ │ Park's BBQ  │ │ Lee's       │            │
│  │             │ │             │ │ Noodle      │            │
│  │ [Active]    │ │ [Active]    │ │ [Setup]     │            │
│  │ RM 52,300   │ │ RM 38,100   │ │ 5/7 tasks   │            │
│  │ Royalty 5%  │ │ Royalty 5%  │ │ Opens 06/01 │            │
│  │ ~2028-03    │ │ ~2027-12    │ │ ~2028-05    │            │
│  └─────────────┘ └─────────────┘ └─────────────┘            │
│                                                               │
│  ▼ Hongdae Area (2)                          [Edit] [Delete]  │
│  ┌─────────────┐ ┌─────────────┐                             │
│  │ Seoul BBQ   │ │ Choi's      │                             │
│  │ [Active]    │ │ [Active]    │                             │
│  │ RM 41,200   │ │ RM 29,500   │                             │
│  │ Royalty 5%  │ │ Royalty 4%  │                             │
│  │ ~2028-06    │ │ ~2027-09    │                             │
│  └─────────────┘ └─────────────┘                             │
│                                                               │
│  ▶ Itaewon Area (3)                                          │
│                                                               │
│  ── No Area ──                                                │
│  ┌─────────────┐                                              │
│  │ Jung's Ramen│  (Area 미배정 가맹점)                         │
│  │ [Proposal]  │                                              │
│  │ -           │                                              │
│  └─────────────┘                                              │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 3-2. Card Display Per Restaurant

| Status | Card shows |
|--------|-----------|
| Active | Restaurant name, revenue (this month), royalty %, contract end date |
| Setup | Restaurant name, task progress (N/M), target open date |
| Proposal | Applicant name, proposal date |
| Expiring (<3mo) | Same as Active, orange border highlight |

Card click → Detail Panel opens on right (380px), same as Foodcourt.

### 3-3. Detail Panel — Click Card

```
┌────────────────────────┐
│  Kim's Cafe      [Active]│
│  Gangnam Area           │
│                          │
│  ── Performance ──       │
│  Revenue: RM 52,300      │
│  Orders: 1,567           │
│  vs Last Month: +8%      │
│                          │
│  ── Contract ──          │
│  Period: 2026-04~2028-03 │
│  Remaining: 23 months    │
│  Renewal: Auto (3mo)     │
│                          │
│  ── Franchise Terms ──   │
│  Type: Franchise         │
│  Royalty: 5% of revenue  │
│  Marketing: 2%           │
│  Franchise Fee: RM 50K   │
│  Deposit: RM 10,000      │
│  Territory: Gangnam,     │
│    exclusive              │
│                          │
│  ── Plans (2) ──         │
│  Royalty · Marketing     │
│                          │
│  [View Contract →]       │
│  [View Restaurant →]     │
└──────────────────────────┘
```

### 3-4. Area Management

```
[+ Add Area] → inline input: Area name
[Edit] on area header → rename
[Delete] on area header → confirm modal (restaurants moved to "No Area")
Area reorder: drag area headers (optional, Phase 2)
```

Area data stored in Brand.franchise_map JSON:
```json
{
  "areas": [
    { "id": "area-1", "name": "Gangnam Area", "sort_order": 0 },
    { "id": "area-2", "name": "Hongdae Area", "sort_order": 1 }
  ]
}
```

Restaurant-to-Area assignment stored in Contract.financial_terms.territory (existing field) or separate Contract field (area_id).

### 3-5. Stats Bar

| Metric | Description |
|--------|------------|
| Status counts | Active: N, Setup: N, Proposal: N (color badges) |
| Expiring | Contracts expiring within 3 months |
| Total Revenue | Sum of all franchise restaurant revenue this month |
| Total Royalty | Sum of royalty income this month |

### 3-6. Filters

| Filter | Options |
|--------|---------|
| Search | Restaurant name |
| Status | All / Active / Setup / Proposal / Expiring / Terminated |
| Area | All / (dynamic area list) |

---

## 4. Technical Design

### 4-1. Model Changes (minimal)

**Brand.js — add 1 field:**
```javascript
franchise_map: {
  type: DataTypes.TEXT('medium'),
  allowNull: true,
  get() {
    const val = this.getDataValue('franchise_map');
    if (!val) return null;
    try { return JSON.parse(val); } catch { return null; }
  },
  set(val) {
    this.setDataValue('franchise_map', val ? JSON.stringify(val) : null);
  }
}
```

**Foodcourt.js — add 1 field:**
```javascript
floor_plan: {
  type: DataTypes.TEXT('medium'),
  allowNull: true,
  get() {
    const val = this.getDataValue('floor_plan');
    if (!val) return null;
    try { return JSON.parse(val); } catch { return null; }
  },
  set(val) {
    this.setDataValue('floor_plan', val ? JSON.stringify(val) : null);
  }
}
```

### 4-2. Data Structures

**Foodcourt floor_plan JSON:**
```typescript
interface FoodcourtFloorPlan {
  version: 1;
  canvasWidth: number;    // 1200
  canvasHeight: number;   // 800
  gridSize: number;       // 20
  showGrid: boolean;
  nodes: FoodcourtFloorNode[];
}

interface FoodcourtFloorNode {
  id: string;
  type: 'unit' | 'entrance' | 'counter' | 'restroom' | 'label';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  shape: 'round' | 'square' | 'rectangle';
  unit_id?: number;       // FK to FoodcourtUnit (for type='unit')
  label: string;          // Display label
}
```

**Brand franchise_map JSON:**
```typescript
interface BrandFranchiseMap {
  version: 1;
  areas: FranchiseArea[];
}

interface FranchiseArea {
  id: string;
  name: string;
  sort_order: number;
}
```

Restaurant-to-area mapping: via Contract model (area info in contract or dedicated field).

### 4-3. API Endpoints

**New dedicated endpoints (existing PUT /:id NOT modified):**
```
PUT  /api/foodcourts/:id/floor-plan          Save floor plan layout
GET  /api/foodcourts/:id/floor-plan-data     Floor plan + unit/contract/revenue data

PUT  /api/brands/:id/franchise-map           Save area configuration
GET  /api/brands/:id/franchise-map-data      Areas + restaurant/contract/revenue data
```

**floor-plan-data response (combined):**
```json
{
  "success": true,
  "data": {
    "floor_plan": { "version": 1, "nodes": [...] },
    "units": [
      {
        "id": 1, "unit_number": "A-01", "size_sqft": 120,
        "status": "occupied",
        "restaurant": { "id": 5, "name": "Kim's Cafe" },
        "contract": { "id": 10, "stage": "active", "end_date": "2028-03-31", ... },
        "revenue_this_month": 45200,
        "orders_this_month": 1234,
        "revenue_last_month": 40300,
        "linked_plans": [
          { "name": "Base Rent", "type": "fixed", "amount": 3000 },
          { "name": "CAM", "type": "fixed", "amount": 500 }
        ]
      }
    ],
    "stats": {
      "occupied": 4, "vacant": 1, "setup": 1,
      "occupancy_percent": 83,
      "total_rent": 12500,
      "total_revenue": 185000,
      "expiring_soon": 2
    }
  }
}
```

**franchise-map-data response:**
```json
{
  "success": true,
  "data": {
    "franchise_map": { "areas": [...] },
    "restaurants": [
      {
        "id": 5, "name": "Kim's Cafe", "area_id": "area-1",
        "contract": { "id": 10, "stage": "active", "end_date": "2028-03-31", ... },
        "revenue_this_month": 52300,
        "orders_this_month": 1567,
        "revenue_last_month": 48400,
        "linked_plans": [
          { "name": "Royalty Plan", "type": "percentage", "value": 5 }
        ]
      }
    ],
    "stats": {
      "active": 8, "setup": 2, "proposal": 1, "expiring": 1,
      "total_revenue": 425000,
      "total_royalty": 21250
    }
  }
}
```

### 4-4. Existing Code Changes

| File | Change | Detail |
|------|--------|--------|
| **Brand.js** | Add field | franchise_map (TEXT, JSON getter/setter) |
| **Foodcourt.js** | Add field | floor_plan (TEXT, JSON getter/setter) |
| **MainLayout.tsx** | Add 2 menus | Franchise Map (after Brand Management), Floor Plan (after FC Management) |
| **App.tsx** | Add 2 routes | /pos/brand/franchise-map, /pos/foodcourt/floor-plan |
| **ProtectedRoute.tsx** | Add 2 routes | brandLevelRoutes array |
| **AuthContext.tsx** | Add 2 routes | Brand General + Foodcourt General ROLE_ROUTES |

**No existing logic changes.** All additive.
**Existing Brand/Foodcourt PUT endpoints NOT modified.** New dedicated endpoints created.

### 4-5. New Files

```
Backend:
  routes/brand-franchise-map.js       (GET data + PUT save)
  routes/foodcourt-floor-plan.js      (GET data + PUT save)

Frontend:
  pages/BrandGeneral/FranchiseMapPage.tsx
  pages/FoodcourtGeneral/FoodcourtFloorPlanPage.tsx
  components/EntityFloorPlan/FoodcourtCanvas.tsx
  components/EntityFloorPlan/UnitNode.tsx
  components/EntityFloorPlan/FoodcourtEditor.tsx
  components/EntityFloorPlan/RestaurantDetailPanel.tsx    (shared)
  components/EntityFloorPlan/ContractStatsBar.tsx          (shared)
  components/EntityFloorPlan/types.ts
```

---

## 5. Existing Code Conflict Prevention — Verified

### No conflicts:
- Existing FloorPlan (Restaurant) unchanged — different route namespace, different data model
- Brand/Foodcourt PUT endpoints unchanged — new dedicated endpoints for map/plan data
- Canvas/Editor components new — existing FloorPlan components not imported or modified
- Route paths no overlap: /restaurant/:id/floor-plan vs /pos/brand/franchise-map vs /pos/foodcourt/floor-plan
- AuthContext wildcard patterns don't accidentally match — explicit routes added

### Dependency on Contract Management:
- Detail Panel shows contract info → Contract model must exist
- Status colors based on contract stage → Contract.stage field must exist
- Foodcourt nodes reference FoodcourtUnit → FoodcourtUnit model must exist
- "Create Proposal" CTA on vacant → Contract creation API must exist
- **Implementation order: Contract Management (all phases) → Floor Plan**

---

## 6. Edge Cases

| Situation | Handling |
|-----------|---------|
| Unit in Unit Management but not placed on canvas | Shows in Editor "Unplaced Units" list |
| Restaurant without contract | Shows as gray node with "No Contract" label |
| Multiple contracts for same restaurant | Shows latest active contract info |
| Foodcourt with no units yet | Empty canvas + "Add units in Tenancy Management > Unit Management" message |
| Brand with no areas | All restaurants shown under "No Area" section |
| Brand with 50+ franchises | Card grid scrollable, area collapse/expand helps, filter by area |
| Mobile: Foodcourt canvas | Falls back to list view (unit name + status + restaurant) |
| Mobile: Brand card view | Works natively (responsive card grid) |

---

## 7. Implementation Plan

### Phase 1: Core
| # | Task |
|---|------|
| 1 | Brand.franchise_map + Foodcourt.floor_plan fields + sync-database |
| 2 | brand-franchise-map.js + foodcourt-floor-plan.js routes |
| 3 | FoodcourtFloorPlanPage (canvas + unit nodes + click interaction) |
| 4 | FoodcourtCanvas + UnitNode + FoodcourtEditor components |
| 5 | FranchiseMapPage (area card grid + click interaction) |
| 6 | RestaurantDetailPanel (shared, contract+performance info) |
| 7 | Sidebar menus + App.tsx routes + ProtectedRoute + AuthContext |

### Phase 2: Stats & Polish
| # | Task |
|---|------|
| 8 | ContractStatsBar (occupancy/revenue/royalty stats) |
| 9 | Vacant unit: "Create Proposal" CTA + previous tenant history |
| 10 | Expiring Soon highlight (orange border) |
| 11 | Area CRUD for Brand (add/rename/delete) |
| 12 | Mobile fallback (list view for Foodcourt) |
| 13 | Desktop-only editor guard for Foodcourt |
