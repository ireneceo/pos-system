# Multi-POS Workstation Design

> Each restaurant can have multiple physical POS counters (main POS, sub POS,
> bar POS, etc.). Each POS device should print to its own receipt printer and
> have its own auto-print policy — but the menu/orders/inventory all stay in
> the single Restaurant record they share.
>
> The "Workstation" abstraction is the physical POS installation. A
> Workstation owns its own bill-printer settings; the rest stays at the
> Restaurant level.

## Domain model

```
Restaurant 1 ──── N Workstation
  - menu, orders, staff, etc.            - id (uuid)
  - kitchenStationPrinters (shared)      - name ("Main POS")
  - printerMode (legacy)                 - billPrinter {
                                            method, address,
                                            enabled, autoPrint,
                                            name }
                                          - createdAt
```

Storage: `Restaurant.printer_settings.workstations: Workstation[]`
(stays in the same JSON column as `billPrinter` / `kitchenPrinter` /
`kitchenStationPrinters` so backups/restores stay atomic).

## Backwards compatibility (zero-downtime migration)

When a restaurant has **no** `workstations[]` (every restaurant today):

- Model getter auto-fabricates a single default workstation by copying the
  existing `printer_settings.billPrinter`.
- `workstations: [{ id: 'ws_default', name: 'Main POS', billPrinter: {...currentBillPrinter} }]`
- Existing UI screens that touch `billPrinter` keep reading the legacy field;
  but the new printing code reads from `getActiveWorkstation().billPrinter`.

When a user adds a second workstation via the new UI, both the legacy
`billPrinter` and the new `workstations[0].billPrinter` are kept in sync so a
client on an old build doesn't lose receipts.

## Device → Workstation binding

Each POS device picks **which workstation it is**. The choice lives in
`localStorage.workstation_id` (per device, never sent to server in
`printer_settings`).

- First visit on a device → `<WorkstationSelectorModal>` blocks the screen and
  forces the user to pick. (Single-workstation restaurants auto-select that
  one.)
- The current workstation is shown in the top-right of the layout, with a
  "Change workstation" option.
- Restaurant Admin can `+ Add / Rename / Delete` workstations in Settings.

## Print routing changes

| Call site | Active workstation? | Address resolution |
|---|---|---|
| `printBillViaRawBT` | YES (POS staff prints from here) | active.billPrinter.address (blank → OS default) |
| `printOrderTicketToBillPrinter` | YES | active.billPrinter.address |
| `printTableQR` (browser/qztray) | YES | active.billPrinter.address |
| `printKitchenTicketViaRawBT` / `sendToRawBTPrinter` (station prints) | NO — station printers are shop-wide LAN devices | unchanged: `kitchenStationPrinters[id].address` |
| `printCancellationTicket` | NO — alerts kitchen | unchanged |

So **only the bill-side** is workstation-scoped. Kitchen stations remain a
shared resource across the whole restaurant.

## `autoPrint` semantics

The bill-printer auto-print toggle is workstation-local. Main POS can be
"print receipt automatically on payment" while sub POS leaves the cashier to
print on demand.

## API surface

No new endpoints. Workstations live inside `printer_settings` and are saved
via the existing `PUT /api/restaurants/:id` flow.

The frontend manages the array (add / rename / delete / reorder) and persists
the entire `printer_settings` object back.

## UI

### Settings → Printer
- Replace the single **Bill Printer** card with a **Workstations** section.
- For each workstation: name (editable), bill-printer method, address, auto-
  print toggle, "Test print" button. Trash icon to delete (with confirm).
- "+ Add Workstation" at the bottom.

### Layout header
- Right-side chip: `[ Workstation: Main POS ▾ ]`
- Click → dropdown lists all workstations + "Switch workstation".
- Restaurant Admin gets an extra "Manage workstations" link → Settings.

### First-time selector modal
- Triggered when `localStorage.workstation_id` is missing or stale (the saved
  id no longer matches any workstation).
- Block the entire screen until the user picks one. Auto-pick if there's
  exactly one workstation.

## Edge cases

- **Workstation deleted while another device is bound to it** → that device's
  selector reopens on next route load.
- **All workstations deleted** → re-create the default one server-side on
  next GET (never allow zero).
- **Legacy single billPrinter still loaded by an old client** → keep mirroring
  `workstations[0].billPrinter` ↔ `printer_settings.billPrinter` on save so
  the old client keeps working until they refresh.
- **Sub POS picks "Main POS" by mistake** → easy fix from the header chip; no
  data corruption (workstation only affects bill routing).

## Roll-out

1. Model + getter (this PR) — restaurants auto-migrated, zero behaviour change.
2. `useActiveWorkstation()` hook + WorkstationContext.
3. Print functions read from active workstation.
4. Settings UI rewrite (Bill Printer card → Workstations section).
5. Layout chip + selector modal.
6. Verify multi-POS round-trip (one shop, two devices, each binds to its own
   workstation, each prints to its own printer).
