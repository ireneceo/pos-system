# Print Design Guide

> All printable documents (receipts, kitchen tickets, QR tags, cancellation
> tickets, settlement reports) share a single design system so the merchant
> brand looks consistent on every paper that comes out of the POS.

## Source of truth

**File:** `dev-frontend/src/utils/billPrint.js`

- `PRINT_STYLES` — the one and only stylesheet. To change the look of every
  printed document, change this constant. Nowhere else.
- `wrapPrintHTML(title, body)` — every `generateHTML*` function returns its
  body wrapped through this helper. Do not write standalone `<html><style>` blocks.
- `escapeHtmlForPrint(value)` — always escape user-controlled text (menu names,
  notes, addresses) before injecting into print HTML.

## Class catalog

| Class | Purpose |
|---|---|
| `.receipt` | Outer wrapper (added by `wrapPrintHTML`). All content goes inside. |
| `.store-name` | Brand name, top of bill (18px / 700) |
| `.store-trade-name` | Optional secondary brand line |
| `.store-info` / `.store-info-line` | Address, tel, reg no — small grey |
| `.banner` / `.banner-strong` | TAKEAWAY / PRE-ORDER PICKUP / DELIVERY / CANCELLED |
| `.divider` | Dashed horizontal rule (default separator) |
| `.divider-solid` | Solid horizontal rule (use for emphasis) |
| `.meta` / `.meta-row` / `.meta-label` | Order/Table/Date/Cashier metadata block |
| `.items` / `.item` / `.item-row` / `.item-name` / `.item-price` / `.item-qty` / `.item-option` | Line items |
| `.totals` / `.total-final` | Receipt subtotal/tax/total block (`.total-final` is bold final TOTAL line) |
| `.big-number` | TABLE / PICKUP / PAGER big number footer (28px / 700) |
| `.medium-number` | Order number etc. (20px / 700) |
| `.qr-container` | Centered QR image wrapper |
| `.instruction` | Short CTA under a QR (13px / 600) |
| `.footer` / `.footer-message` | Bottom thank-you message + custom QR text |
| `.time-info` | "Printed: …" / "Orders accepted until …" small print |
| `.group-label` | Kitchen ticket per-station header (bordered, 16px / 700) |
| `.printed-at` | **PRINTED AT: <POS COUNTER \| KQ1 \| KITCHEN>** banner — inverted (black bg) |
| `.station-tag` | Inline tag next to each item showing the kitchen station |
| `.page-break` | `page-break-after: always` (use for multi-page kitchen prints) |

## Adding a new printable document

1. Write a small `generateHTML<Foo>(orderData, storeInfo)` function.
2. Build the inner body using the classes above.
3. Return `wrapPrintHTML(title, body)`. Never inline a `<style>` tag.
4. To print: `printHTMLContent(generateHTMLFoo(data, store), 'Foo')`.

## ESC/POS counterpart

For receipts that need to fire on RawBT / QZ Tray to a thermal printer, also
provide a parallel `generate<Foo>Content(orderData, storeInfo)` that returns
ESC/POS commands. Keep the same section ORDER as the HTML version even though
the formatting commands differ — that's what gives both paths the same feel.

## Print routing (where does each ticket physically come out?)

UX rule: **the printout appears where the user pressed the button**.

| User action | Output printer | Function |
|---|---|---|
| Pay at POS → auto receipt | Bill printer (POS counter) | `printBillViaRawBT` |
| Pay at POS → auto kitchen ticket | Per-station kitchen printer | `printKitchenTicketViaRawBT` → `sendToRawBTPrinter` per station |
| Live Orders / Floor Plan → reprint receipt | Bill printer | `printBillViaRawBT` |
| Live Orders / Floor Plan → reprint order ticket | **Bill printer** (kitchen format, POS counter) | `printOrderTicketToBillPrinter` |
| Kitchen Display → reprint ticket | That station's printer | `printKitchenTicketViaRawBT` |
| Cancellation | Kitchen printer (alerts the station) | `printCancellationTicket` |

## Connection methods per printer

Each printer (bill, kitchen, individual kitchen station) carries its own `method`
in `Restaurant.printer_settings`:

- `browser` — `window.print()` via the OS default printer. Cheapest setup.
  Best for USB-attached receipt printers.
- `qztray` — ESC/POS over QZ Tray to a LAN IP:port OR an OS-registered printer
  name. Best for network kitchen printers; works for USB printers too.
- `rawbt` — Android intent into the RawBT app. Best for kitchen tablets with a
  Bluetooth thermal printer.

The resolver is `getPrinterMethod(scope)` in `billPrint.js`:

```js
getPrinterMethod('bill')             // billPrinter.method
getPrinterMethod('kitchen')          // kitchenPrinter.method
getPrinterMethod('station:KQ1')      // kitchenStationPrinters['KQ1'].method
```

Missing methods fall back to the legacy global `printerMode` — that's how
existing stores keep working without re-configuring after the upgrade.

## QZ Tray signing

To avoid "Allow this print?" prompts every time, the page sends RSA-signed
requests to QZ Tray. The signing flow:

- Generate the key pair: `node dev-backend/scripts/generate-qz-cert.js`
- Backend serves: `GET /api/qz-tray/certificate(/download)` + `POST /api/qz-tray/sign`
- Frontend: `setupQZSecurity()` in `billPrint.js` calls those endpoints
- Merchant installs the downloaded `override.crt` in QZ Tray's data folder
  once → prompts disappear forever.

The button to download the certificate lives in **Settings → Printer → QZ Tray**
status block, with the OS-specific install path inline.
