# Order-Type Pinning + Per-Order-Type Payment Methods

> Cross-refs: [EXTERNAL_QR_PARTNER_DISCOUNT.md](./EXTERNAL_QR_PARTNER_DISCOUNT.md), [TABLE_QR_SESSION_SYSTEM.md](./TABLE_QR_SESSION_SYSTEM.md), [PAYMENT_ARCHITECTURE.md](./PAYMENT_ARCHITECTURE.md)

## Why

Two pain points at the mobile-order entry:

1. **Customer friction** — A takeaway-counter QR or hotel-lobby QR currently lands users on `OrderTypePage` and they must tap their order type even though context is unambiguous. A 2-tap entry that should be 0-tap.
2. **Operator misconfiguration** — Restaurants want different payment rails per order type ("delivery must be prepaid, takeaway is counter-cash"). The codebase enforces a single hardcoded rule (`delivery ≠ payAtCounter`) and offers no operator-facing toggle.

## Out of scope

- Per-order-type **menu** filtering (some items only for delivery, etc.) — separate concern, separate cycle.
- Per-customer (logged-in) order type defaults.
- POS terminal order-type-aware payment filtering — POS staff sees all enabled methods (operator judgment); only mobile is filtered.

## Data model

### `restaurants.payment_methods` (JSON) — extend each method entry

```jsonc
{
  "payAtCounter": {
    "enabled": true,
    "label": "Pay at Counter",
    "availableIn": ["mobile"],
    "allowed_order_types": ["dine-in", "takeaway", "pickup"]  // NEW (optional)
  },
  "online": {
    "enabled": true,
    "availableIn": ["mobile"]
    // allowed_order_types missing → all order types allowed
  }
}
```

- `allowed_order_types` is **optional**. Missing or `null` → all order types allowed (back-compat).
- Naming mirrors `Coupon.applicable_order_types` (already in the codebase).
- Only consulted for the **mobile** channel. POS ignores this field.

**Backfill migration**:
- `payAtCounter.allowed_order_types = ["dine-in", "takeaway", "pickup"]` — preserves the existing hardcoded `delivery ≠ payAtCounter` rule.
- All other methods: leave `allowed_order_types` unset → no behavioural change.

### `restaurants.table_settings.externalQRs[*]` — extend each entry

```jsonc
[
  { "name": "Hotel ABC", "coupon_id": 7, "order_type": "delivery" },  // pinned
  { "name": "Office Tower B" }                                          // not pinned
]
```

- `order_type` is **optional** (singular — a partner QR is one slot).
- Missing → customer picks at `OrderTypePage` as today.

## URL contract

| Pattern | Meaning |
|---|---|
| `/mobile/{slug}` | Show `OrderTypePage` (current behaviour) |
| `/mobile/{slug}?table=T001` | Table scan — auto-pin to `dine-in`, skip to menu |
| `/mobile/{slug}?table=HotelABC&order_type=delivery` | External partner QR — pin to delivery |
| `/mobile/{slug}?order_type=takeaway` | Standalone takeaway QR (no table) |

**Rules**:
1. `?order_type=…` is highest precedence. Skips `OrderTypePage`, sets context, navigates to `/menu`.
2. `?table=…` without `?order_type=…` → auto-pin to `dine-in` (the only sensible interpretation of a per-table QR).
3. Neither → user picks.
4. Invalid `order_type` (not enabled on restaurant) → falls back to `OrderTypePage` selection.

## UI

### `OrderTypePage`

- Reads `?order_type=` and `?table=` on mount.
- If a valid order type is determined: set context + `sessionStorage.tableNumber` (when `?table=`), navigate immediately to `/menu`. No flash of the picker.
- If invalid (disabled on restaurant): toast "This QR is pinned to an unavailable order type — please choose:" and show the picker.

### `MenuPage` header — escape hatch

- Current header shows store name. Add a slim **order-type chip** below it:
  > `[icon] Takeaway · Change`
- Tap → navigates back to `OrderTypePage` (clears `?order_type` pin, keeps `?table=` if dine-in).
- Always visible (not only when pinned) so the affordance is discoverable.

### `PaymentPage` — data-driven filter

- Replace hardcoded `if (orderType === 'delivery' && key === 'payAtCounter') exclude` with:
  ```
  if (Array.isArray(method.allowed_order_types) &&
      !method.allowed_order_types.includes(orderType)) exclude
  ```
- If filter leaves only **1 method**, auto-select it (eliminate single-option choice paralysis).
- If filter leaves **0 methods**, show clear empty state: "No payment method configured for {orderType}. Please contact the restaurant." (operator misconfig surfaced loudly rather than silent.)

### `SettingsPage` — payment methods section

**Progressive disclosure** to avoid matrix explosion:
- Parent row: existing POS / Mobile toggles (unchanged).
- When **Mobile = ON**, render a sub-row beneath:
  > _Available order types when paying via mobile:_  `[Dine In] [Takeaway] [Pickup] [Delivery]`
- Chips: filled-purple when included, light-gray when excluded. AutoSave on toggle.
- Hide chips for order types the restaurant has disabled (`operation_settings.orderTypes.delivery = false` → no Delivery chip).
- Hide entire sub-row when **Mobile = OFF** (irrelevant).
- Tooltip on `i` icon: "Leave all selected to allow this method for every mobile order type."

### `SettingsPage` — QR section

Two sub-sections inside Tables tab:

**A) Table QR codes** (existing, dine-in implicit) — unchanged.

**B) Order-type QR codes** (NEW) — one card per enabled order type that *doesn't* require a table:
- Takeaway QR · Pickup QR · Delivery QR (Dine-in is covered by the table QRs above).
- Each card shows the QR + a `Copy URL` button + Download/Print actions.
- Cards for disabled order types are hidden (`operation_settings.orderTypes.X = false`).

### `SettingsPage` — External QR section

- New column: **Order Type** with a tiny select (— / Dine In / Takeaway / Pickup / Delivery).
- Disabled order types are not selectable (greyed in the dropdown).
- URL preview reflects `&order_type=…` when set.

## Backend validation

POST `/api/orders` and POST `/api/mobile-orders`:
- After resolving `restaurant.payment_methods[chosen_method]`, if `allowed_order_types` is a non-empty array and `order_type` is not in it → **400 `PAYMENT_METHOD_NOT_ALLOWED_FOR_ORDER_TYPE`**.
- Existing channel check (`availableIn` ∋ 'mobile') unchanged.
- POS path unaffected.

This closes the current trust-the-client gap (the frontend filter is the only barrier today).

## Dine-in table requirement (added 2026-05-30)

Extends the entry flow so a store can **force a table number on every mobile dine-in order**. Solves the "generic/representative QR" gap: a customer entering via `/mobile/{slug}` or `?order_type=dine-in` (no `?table=`) could place a table-less dine-in order, which then showed on the Floor Plan as a table-less "pickup N" (receiving-number) card instead of on a table.

**Setting (reused, not new)**: `restaurants.table_settings.tableNumberRequired` (bool), gated by `table_settings.enableTableNumbers`. Settings → **Tables & QR** tab, toggle "Table Number Required". The toggle already existed; this cycle wired it to enforcement. Default OFF → no change for existing stores.

**Exposure**: `GET /api/mobile/store/:slug` now returns `tableNumberRequired` (= `enableTableNumbers !== false && tableNumberRequired`) and `floorTables` (labels from `floor_plan.tables[].label || .tableNumber`).

**Table source = Floor Plan tables, not free text.** The customer selects from `floor_plan.tables` labels so the chosen value matches what `orders-crud`/`mobile-orders` use to resolve `floor_plan_table_id` — free-typing risks a label mismatch that re-introduces the table-less bug.

**Enforcement (3 layers, dine-in only — takeaway/pickup/delivery exempt):**
1. `OrderTypePage` — selecting Dine In with `tableNumberRequired` and no table (QR or sessionStorage) opens a **table-picker bottom sheet** (Floor Plan table chips + search) before `/menu`. Table QR (`?table=`) is unaffected — it already carries a table, skips the picker.
2. `PaymentPage` — table list sourced from `floor_plan.tables` (falls back to legacy `table_settings.totalTables`/`tablePrefix`; **note**: previously read `operation_settings` by mistake — fixed to `table_settings`). When required: no "Free Seating" option, pay button blocked until a table is picked.
3. Backend — POST `/api/orders` (orders-crud) and POST `/api/mobile/order` (mobile-orders): `source === 'mobile' && order_type === 'dine_in' && !table_number && tableNumberRequired` → **400 `TABLE_REQUIRED`**. POS path not gated.

**Takeaway-with-table preserved**: a takeaway order entered via a *table* QR keeps its `table_number` (shown on that table card) — unchanged intentional behaviour (`mobile-orders.js` comment). The requirement only forces a table for dine-in; it never adds/removes a table for takeaway.

**File touch list (this feature)**: `routes/mobile-public.js`, `routes/orders-crud.js` 🔒, `routes/mobile-orders.js`, `mobile/pages/OrderTypePage.tsx`, `mobile/pages/PaymentPage.tsx`, `public/locales/{en,ko,zh,ms}/common.json`. The orders-crud guard changes the print-guard fingerprint (non-print input validation; print contract 7/7 passes) → re-bless before deploy.

## Backward compatibility

| Surface | Old data | New behaviour |
|---|---|---|
| `payment_methods[*]` without `allowed_order_types` | All order types allowed | ✓ identical to today (no change) |
| `payment_methods.payAtCounter` after backfill | `["dine-in","takeaway","pickup"]` | ✓ identical to existing hardcoded rule |
| `externalQRs` without `order_type` | OrderTypePage shown | ✓ identical to today |
| URL without `?order_type=` and no `?table=` | OrderTypePage shown | ✓ identical to today |
| URL with `?table=` only | _Today: OrderTypePage with table hint._ Now: auto-dine-in | **Small behaviour change** (improvement — fewer taps) |

The `?table=` auto-dine-in change is the only customer-visible behaviour shift. Justified — a table QR has no other plausible meaning, and the MenuPage chip lets the customer escape if needed.

## i18n keys (new)

Namespace `settings`:
- `settingsPage.payment.allowedOrderTypes` — "Available order types when paying via mobile"
- `settingsPage.payment.allowedOrderTypes.help` — Tooltip
- `settingsPage.qr.orderTypeQrSection` — "Order-type QR codes"
- `settingsPage.qr.takeawayQr` / `.pickupQr` / `.deliveryQr`
- `settingsPage.externalQR.orderType` — column header

Namespace `mobile`:
- `menu.orderTypeChip.change` — "Change"
- `payment.noMethodConfigured` — empty state message

## Test scenarios

1. **Customer scans takeaway-counter QR** → 0-tap to menu. Header chip shows "Takeaway · Change". Counter payment is the only option (auto-selected).
2. **Customer scans table QR** → 0-tap to menu (dine-in pinned). Header chip shows "Dine In · Change". All mobile payments available.
3. **Customer scans hotel partner QR** (`order_type=delivery&coupon=...`) → 0-tap to menu (delivery pinned, coupon auto-applied). Payment excludes `payAtCounter` per backfilled rule.
4. **Customer pinned to takeaway but switches** to dine-in via header chip → cart cleared, order type updates, payment options re-filter.
5. **Operator misconfigures** — disables every method for delivery. Customer pinned to delivery sees the empty state with clear copy.
6. **Attacker** sends `POST /mobile-orders { order_type: 'delivery', payment_method: 'payAtCounter' }` → 400 `PAYMENT_METHOD_NOT_ALLOWED_FOR_ORDER_TYPE`.
7. **Legacy QR** without `?order_type=` → unchanged OrderTypePage selection.

## File touch list

- Backend (5 + 1 new): `models/Restaurant.js` (no schema change — JSON shape only), `routes/external-qrs.js`, `routes/restaurants.js` (mobile/store/:slug response shape), `routes/mobile-orders.js`, `routes/orders-crud.js`, new `scripts/migrate-payment-allowed-order-types.js`.
- Frontend (5 + 1 new locale): `mobile/pages/OrderTypePage.tsx`, `mobile/pages/MenuPage.tsx`, `mobile/pages/PaymentPage.tsx`, `pages/Settings/SettingsPage.tsx`, `public/locales/{en,ko,zh,ms}/settings.json` (+ mobile.json).
