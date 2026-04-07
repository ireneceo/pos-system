# Supply Chain System — Overview & Design Plan

> **Created:** 2026-04-07
> **Status:** Scope Confirmed, Detailed Design In Progress
> **Scale:** Extra Large (4 sequential designs)

---

## 1. System Architecture

### Seller / Buyer Relationships

| Role | Sells To | Buys From | Sales Scope |
|------|----------|-----------|:-----------:|
| **System Admin** | Restaurant, Brand, Foodcourt | - | All (unrestricted) |
| **Brand General** | Own brand restaurants | Supplier | Own brand only (auto) |
| **Foodcourt General** | Own tenant restaurants | Supplier | Own tenants only (auto) |
| **Supplier** | Contracted Restaurant, Brand, Foodcourt | - | Contracted only |
| **Restaurant** | - | SA, Brand, Foodcourt, Supplier | - |

### Required Capabilities Per Role

**As Seller:**
| Capability | SA | Brand | Foodcourt | Supplier |
|-----------|:--:|:-----:|:---------:|:--------:|
| Products | O | O (existing) | O (new) | O (new) |
| Inventory | O (new) | O (existing) | O (new) | O (new) |
| Recipes | X | O (existing) | X | X |
| Customer List | All (auto) | Own brand (auto) | Own tenants (auto) | Contract required |
| Order Management | O (new) | O (new) | O (new) | O (new) |
| Trade Invoice | O (new) | O (new) | O (new) | O (new) |
| Invoice Cycle Setting | O | O | O | O |

**As Buyer:**
| Capability | Brand | Foodcourt | Restaurant |
|-----------|:-----:|:---------:|:----------:|
| Supplier Directory | O | O | O |
| Contract Request | O (to Supplier) | O (to Supplier) | O (to Supplier) |
| Ingredient-Product Link | O | O | O |
| Purchase Order | O (new) | O (new) | O (new) |
| Receiving | O | O | O |
| Purchase Invoices | O | O | O |

### Invoice Structure

**Existing:** Subscription invoices (POS, Brand Plan, Foodcourt Plan)
**New:** Trade invoices (purchase order-based)

```
All purchase orders → Individual invoice per PO (always)

Payment terms (seller sets per customer):
  - Immediate: pay per invoice upon delivery
  - Monthly SOA: 
    - Invoices still issued per PO (individual tracking)
    - Month-end: Statement of Account sent (summary of unpaid invoices)
    - SOA page: [Pay All] or individual [Pay] buttons
    - Payment due date configurable (e.g., 15th of next month)
```

SOA is NOT a separate model — it's a filtered view of existing Invoice records + email notification.

---

## 2. Design Documents (4 Sequential)

### Design 1: Seller Product & Inventory System
**Purpose:** Each seller manages their product catalog and inventory.

**Scope:**
- Supplier Admin: Full dashboard (Products, Inventory, Company Info, Profile)
- Foodcourt General: Products + Inventory menus (no recipes)
- System Admin: Extend SystemProduct for consumable/ingredient sales
- Brand General: No changes (BrandProduct + Inventory already exists)
- Common product fields for selling (unit_price, min_order, lead_time, etc.)

**Dependency:** None

### Design 2: Supplier Contract System
**Purpose:** Buyers find suppliers and establish contracts before ordering.

**Scope:**
- Supplier Directory (buyer searches, views profiles/catalogs)
- Contract Request (buyer → supplier application)
- Contract Review & Approval (supplier reviews, approves/rejects)
- Customer Management (supplier's contracted customer list)
- Payment Terms Setting (Immediate / Monthly SOA per customer)
- SA/Brand/Foodcourt → Restaurant: auto-access (no contract needed)
- Supplier → anyone: contract required

**Dependency:** Design 1

### Design 3: Purchase Order & Receiving
**Purpose:** Buyers create POs to contracted sellers, receive goods, update inventory.

**Scope:**
- Ingredient ↔ Seller Product linking (1 ingredient : N products)
- PO creation (from ingredients, auto-split by supplier)
- PO lifecycle: Draft → Submitted → Confirmed → Shipped → Partial Received → Received
- Receiving: quantity verification, InventoryBatch creation, stock update
- PAR-level auto-suggestion for reorder quantities
- Buyers: Restaurant + Brand General + Foodcourt General
- Absorbs PO section from PETTY_CASH_AND_PURCHASE_ORDER_SYSTEM.md

**Dependency:** Design 2

### Design 4: Seller Order Management & Trade Invoice
**Purpose:** Sellers process incoming POs and issue invoices.

**Scope:**
- Order Management page per seller (LiveOrders-style)
  - Role-specific workflows and UI
  - SA: equipment + consumables, shipping tracking
  - Brand: internal distribution to franchises
  - Foodcourt: internal distribution to tenants
  - Supplier: external B2B, most complex (contract-based, credit terms)
- Trade Invoice: auto-issued per delivered PO
- Invoice.issuer_type: add 'supplier'
- InvoiceCategory: add 'trade'
- SOA: monthly summary view + [Pay All] + email notification
- Buyer side: Purchase Invoices tab/page

**Dependency:** Design 3

---

## 3. Current System State (Reference)

### Existing Models & Status

| Model | Status | Used By |
|-------|--------|---------|
| Supplier | Complete | Brand (management only) |
| SupplierBrand | Complete | N:M junction |
| SupplierCategory | Complete | Categorization |
| SystemProduct + 6 related | Complete | SA hardware/packages |
| BrandProduct + related | Complete | Brand food products |
| Ingredient | Complete | Restaurant/Brand inventory |
| IngredientCategory | Complete | Categorization |
| InventoryBatch | Complete | FIFO batch tracking |
| InventoryTransaction | Complete | Audit trail |
| StockAlert | Complete | Low stock warnings |
| GeneralStock + related | Complete | Brand non-food supplies |
| Invoice | Complete | Subscription billing |
| InvoiceCategory | Complete | Category codes |
| PurchaseOrder | NOT IMPLEMENTED | Schema design only |
| SupplierIngredient | NOT IMPLEMENTED | Schema design only |

### Existing Document Integration

| Document | Status | Integration |
|----------|--------|------------|
| INVENTORY_MANAGEMENT_SYSTEM.md | Partially implemented | Reference for Design 1 |
| PETTY_CASH_AND_PURCHASE_ORDER_SYSTEM.md | PO not implemented | PO section absorbed into Design 3 |
| RECIPE_MANAGEMENT_SYSTEM.md | Mostly implemented | No changes needed |

### Key Existing Fields for Integration

```
Invoice.issuer_type: 'system_admin' | 'brand' | 'foodcourt'  → add 'supplier'
Invoice.payer_type: 'restaurant' | 'brand_manager' | 'foodcourt_manager' | 'restaurant_owner' | 'external'
Invoice.invoice_category: STRING(50), default 'service'  → add 'trade'
InventoryBatch.purchase_order_id: FK ready (null, awaiting PO model)
InventoryTransaction.transaction_type: includes 'purchase' (ready for PO integration)
Ingredient.supplier_id: FK to Supplier (existing link)
Ingredient.min_order: minimum order from supplier (existing field)
Ingredient.lead_time_days: supplier lead time (existing field)
User role 'Supplier Admin': defined, no permissions/routes assigned
MainLayout Supplier Admin: all menu items DisabledNavItem "Coming Soon"
```
