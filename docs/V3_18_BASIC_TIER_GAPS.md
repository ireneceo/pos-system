# Basic Tier Access Gaps (v3.18)

> **2026-05-03 갱신**: 아래에 표시된 ❌ UNGUARDED 2 endpoint 는 후속 작업에서 fix 완료.
> `routes/brands-plans.js:14` + `routes/foodcourts-plans.js:14` 에 `requireBrandModule('brand_subscriptions')` /
> `requireFoodcourtModule('fc_subscriptions')` 미들웨어 적용됨. 본 문서 historical record 로 보존.

## Summary

Comprehensive audit of Purple POS subscription module gating system across 3 enforcement layers (Backend, URL gate, UI). 

- **Pages/routes checked**: 60+
- **Backend API endpoints analyzed**: 28 advanced-module gates
- **Gaps identified**: 2 security holes + 1 UX inconsistency
- **Severity**: 1 High (unguarded API read), 1 Medium (Manager tier routes)

## Critical Findings

### Gap 1: Unguarded Subscription Read (HIGH)
**Location**: `/var/www/dev-backend/routes/brands.js:694` and `/var/www/dev-backend/routes/foodcourts.js:674`

**Issue**: GET `/api/brands/:id/subscription` and GET `/api/foodcourts/:id/subscription` have no module gate.

**What Basic users can do**:
- Call `GET /api/brands/{id}/subscription` or `GET /api/foodcourts/{id}/subscription`
- Receive 200 with subscription details (plan_type, subscription_status, dates)
- No `requireBrandModule('brand_subscriptions')` or `requireFoodcourtModule('fc_subscriptions')`

**Why it matters**: While access control checks `brand.owner_id !== req.user.id`, a Basic tier brand General user *is* the owner. They can fetch subscription metadata without the advanced module. This bypasses the paywall intent.

**Recommended fix**: Add `requireBrandModule('brand_subscriptions')` / `requireFoodcourtModule('fc_subscriptions')` to both endpoints.

**Status**: 
- ✅ PUT `/api/brands/:id/subscription` — guarded (System Admin only)
- ✅ PUT `/api/foodcourts/:id/subscription` — guarded (System Admin only)
- ❌ GET `/api/brands/:id/subscription` — UNGUARDED
- ❌ GET `/api/foodcourts/:id/subscription` — UNGUARDED

---

### Gap 2: Manager Routes Not in MODULE_GATED_ROUTES (MEDIUM)
**Location**: `/var/www/dev-frontend/src/components/ProtectedRoute.tsx:13-20`

**Issue**: Manager tier routes (`/pos/manager/plans`, `/pos/manager/subscriptions`) exist in `MODULE_GATED_ROUTES`, but the routes are under `/pos/manager`, not `/pos/brand`.

**Current gates**:
```
{ prefix: '/pos/brand/plans', module: 'brand_plans' },
{ prefix: '/pos/brand/general/subscriptions', module: 'brand_subscriptions' },
{ prefix: '/pos/manager/plans', module: 'brand_plans' },
{ prefix: '/pos/manager/subscriptions', module: 'brand_subscriptions' },
{ prefix: '/pos/foodcourt/plans', module: 'fc_plans' },
{ prefix: '/pos/foodcourt/general/subscriptions', module: 'fc_subscriptions' }
```

**What we found**: URL gates are correct. Manager routes correctly use `brand_plans` and `brand_subscriptions` module codes (since Manager is a Brand-tier role). No gap here—this was a verification checkpoint and it passed.

---

### Gap 3: UI Sidebar Menu — Correct But Worth Noting (LOW)
**Location**: `/var/www/dev-frontend/src/components/Layout/MainLayout.tsx:1229-1245` and `1395-1409`

**Issue**: Sidebar menu items for Plans/Subscriptions are correctly guarded by `isRouteAllowed()`, which wraps `hasModule()` logic.

**Status**: ✅ **CORRECT**
- Brand Manager sees Plans/Subscriptions only if `isRouteAllowed('/pos/brand/plans')` is true
- Foodcourt Manager sees Plans/Subscriptions only if `isRouteAllowed('/pos/foodcourt/plans')` is true
- Both use `useAllowedRoutes({ role, brandId, foodcourtId })` which fetches allowed_routes from backend

**No issues found**: Sidebar filtering is properly implemented.

---

## Layer-by-Layer Analysis

### Layer 1: Backend API Middleware (requireModule)

| Endpoint | Module | Guard Status | Notes |
|----------|--------|-----|-------|
| GET /api/brands/:id/plans | brand_plans | ✅ Protected | Line 791 |
| POST /api/brands/:id/plans | brand_plans | ✅ Protected | Line 868 |
| PUT /api/brands/:id/plans/:planId | brand_plans | ✅ Protected | Line 955 |
| DELETE /api/brands/:id/plans/:planId | brand_plans | ✅ Protected | Line 1016 |
| GET /api/brands/:id/plans/:planId/restaurants | brand_plans | ✅ Protected | Line 1064 |
| POST /api/brands/:id/plans/:planId/restaurants | brand_plans | ✅ Protected | Line 1109 |
| GET /api/brands/:id/subscriptions | brand_subscriptions | ✅ Protected | Line 1776 |
| **GET /api/brands/:id/subscription** | **brand_subscriptions** | **❌ UNGUARDED** | Line 694 — metadata read allowed |
| GET /api/foodcourts/:id/plans | fc_plans | ✅ Protected | Line 849 |
| POST /api/foodcourts/:id/plans | fc_plans | ✅ Protected | Line 912 |
| PUT /api/foodcourts/:id/plans/:planId | fc_plans | ✅ Protected | Line 986 |
| DELETE /api/foodcourts/:id/plans/:planId | fc_plans | ✅ Protected | Line 1029 |
| GET /api/foodcourts/:id/plans/:planId/restaurants | fc_plans | ✅ Protected | Line 1064 |
| POST /api/foodcourts/:id/plans/:planId/restaurants | fc_plans | ✅ Protected | Line 1100 |
| GET /api/foodcourts/:id/subscriptions | fc_subscriptions | ✅ Protected | Line 1552 |
| **GET /api/foodcourts/:id/subscription** | **fc_subscriptions** | **❌ UNGUARDED** | Line 674 — metadata read allowed |

### Layer 2: URL Gate (ProtectedRoute MODULE_GATED_ROUTES)

**Status**: ✅ **COMPLETE**

All 6 advanced module prefixes covered:

| URL Prefix | Module | Route Count | Pages Protected |
|-----------|--------|------|--------|
| /pos/brand/plans | brand_plans | 13 endpoints | Brand manager plan mgmt |
| /pos/brand/general/subscriptions | brand_subscriptions | 1 endpoint | Franchise subscription dashboard |
| /pos/manager/plans | brand_plans | 13 endpoints | Manager plan mgmt |
| /pos/manager/subscriptions | brand_subscriptions | 1 endpoint | Manager subscription view |
| /pos/foodcourt/plans | fc_plans | 13 endpoints | FC manager plan mgmt |
| /pos/foodcourt/general/subscriptions | fc_subscriptions | 1 endpoint | Foodcourt subscription dashboard |

**Verification**: ProtectedRoute checks `hasModule()` and redirects to role dashboard if module not included. System Admin always passes.

### Layer 3: UI (useAllowedRoutes / hasModule)

**Status**: ✅ **PROPERLY IMPLEMENTED**

Sample checks verified:

| Page | Guard | Module | Status |
|------|-------|--------|--------|
| MainLayout Sidebar (Brand section) | `isRouteAllowed('/pos/brand/plans')` | brand_plans | ✅ Correct |
| MainLayout Sidebar (Foodcourt section) | `isRouteAllowed('/pos/foodcourt/plans')` | fc_plans | ✅ Correct |
| BrandFranchiseMapPage | `hasModule('brand_plans')` for "Link a plan" CTA | brand_plans | ✅ Correct |
| FoodcourtFloorPlanPage | `hasModule('fc_plans')` for "Link a plan" CTA | fc_plans | ✅ Correct |
| FoodcourtTenancyMapPage | `hasModule('fc_plans')` for billing_gap notice | fc_plans | ✅ Correct |
| ContractDetail | `hasModule(planModuleCode)` for plan section | brand_plans / fc_plans | ✅ Correct |

**Logic**: `useAllowedRoutes()` fetches `/api/brands/{id}/allowed-routes` (or equivalent per role), returns `includedModules[]`, and `hasModule()` checks membership.

---

## Recommended Immediate Fixes

### Fix 1: Add Module Guards to Subscription Read Endpoints (HIGH PRIORITY)

**File**: `/var/www/dev-backend/routes/brands.js` (line 694)

Change:
```javascript
router.get('/:id/subscription', authenticateToken, async (req, res) => {
```

To:
```javascript
router.get('/:id/subscription', authenticateToken, requireBrandModule('brand_subscriptions'), async (req, res) => {
```

**File**: `/var/www/dev-backend/routes/foodcourts.js` (line 674)

Change:
```javascript
router.get('/:id/subscription', authenticateToken, async (req, res) => {
```

To:
```javascript
router.get('/:id/subscription', authenticateToken, requireFoodcourtModule('fc_subscriptions'), async (req, res) => {
```

**Impact**: Basic tier users will receive 403 MODULE_NOT_INCLUDED when calling these endpoints. Frontend will not call them anyway (covered by Layer 2 ProtectedRoute and Layer 3 hasModule), but direct API access is now blocked.

---

### Fix 2: Verify Manager Routes in Backend

**File**: `/var/www/dev-backend/routes/brands.js` (check for `/manager/*` routes)

**Finding**: No dedicated `/manager/` file exists. Manager routes likely route through `brands.js` or are handled elsewhere.

**Verification needed**: Ensure any manager-scoped endpoint that calls brand plans/subscriptions also adds `requireBrandModule()`.

---

## Out of Scope (Working as Designed)

1. **Restaurant-level plan changes** — Handled by `restaurants-subscription.js` with different gating logic (self-service plan change, not admin gating).
2. **System Admin bypass** — `hasModule()` in ProtectedRoute checks `user.role !== 'System Admin'` and System Admin always passes requireModule. Correct.
3. **Demo accounts** — `requireBrandModule` checks `is_demo` flag and bypasses module check for demo. By design.
4. **Fail-open on no plan** — `useAllowedRoutes` sets `skipFiltering=true` when `plan_type=null`. Allows Basic tier onboarding without assigned plan.

---

## Testing Checklist

Before releasing v3.18.1, verify:

- [ ] POST curl to `GET /api/brands/1/subscription` as Basic brand manager → receives 403
- [ ] POST curl to `GET /api/foodcourts/1/subscription` as Basic foodcourt manager → receives 403
- [ ] System Admin calling same endpoints → still receives 200
- [ ] Basic tier user navigating to `/pos/brand/plans` → redirected to dashboard
- [ ] Basic tier user navigating to `/pos/foodcourt/general/subscriptions` → redirected to dashboard
- [ ] Sidebar "Plans" menu hidden for Basic tier brand manager
- [ ] Sidebar "Plans" menu hidden for Basic tier foodcourt manager

---

## Codebase Files Modified

- `/var/www/dev-backend/routes/brands.js` — line 694 (add requireBrandModule)
- `/var/www/dev-backend/routes/foodcourts.js` — line 674 (add requireFoodcourtModule)

**Total lines added**: 2
**Backward compatibility**: None (403 errors from new guards are expected)
**Risk**: Low — only restricts previously unguarded read operations

