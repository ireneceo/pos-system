/* Print-route regression gate — the route matrix.
 *
 * Each case sets a real printer_settings config, runs the REAL billPrint.js dispatch
 * entry the auto-print poller uses (printKitchenTicketViaRawBT / printBillViaRawBT),
 * and asserts which transport(s) fire (the exact call that would hit the printer) —
 * everything up to the physical paper.
 *
 * "피드백 1건 = 불변식 1개" — when a print routing bug is found/fixed, add a case here.
 * Single source of the routing contract: CLAUDE.md 🔒 print section + memories
 * [[reference_kitchen_print_pipeline]] / [[reference_print_single_poller_architecture]].
 *
 * 2026-07-08 (Irene — with MIN blank-print fix): OS-driver printers now AUTO-SELECT
 * RAW ESC/POS text for text-safe tickets (Latin content, no logo/QR) — bulletproof on
 * cheap thermal drivers that render our HTML-pixel job as BLANK paper — and HTML pixel
 * (image) ONLY when the content needs it (CJK glyphs or a logo/QR). LAN-IP raw, RawBT,
 * and the web browser-print dialog are unchanged. So the routing contract is now:
 *   OS-name (qztray) + Latin  → native printRaw:os NAME / web qzRaw(drawer):NAME
 *   OS-name (qztray) + Korean → native printHtml:NAME    / web qzPixel:NAME
 *   browser method   + Latin  → native printRaw:os ''    / web browser dialog
 *   browser method   + Korean → native printHtml:''      / web browser dialog
 *   LAN-IP / RawBT            → unchanged (raw)
 */
'use strict';

// station config; `name` mirrors `address` so RawBT (routes by sp.name) and qztray
// (routes by sp.address) both resolve to the same physical printer.
const st = (method, address, copies) => ({ method, name: address || '', address: address || '', copies: copies || 1, autoPrint: true });

// Latin (romanized) menu — text-safe → RAW ESC/POS text on OS-driver printers.
const KORDER = {
  orderNumber: 'T1-001', order_number: 'T1-001', id: 1001, order_type: 'dine_in', tableNumber: '1',
  items: [
    { id: 1, name: 'Bibimbap', quantity: 1, price: 20, kitchen_station_id: 9,  menuItem: { name: 'Bibimbap', price: 20 } },
    { id: 2, name: 'Beer',     quantity: 2, price: 8,  kitchen_station_id: 22, menuItem: { name: 'Beer', price: 8 } },
  ], subtotal: 36, total: 36,
};
const BORDER = {
  orderNumber: 'T1-001', order_number: 'T1-001', id: 1001, order_type: 'dine_in', tableNumber: '1',
  items: [ { id: 1, quantity: 1, menuItem: { name: 'Bibimbap', price: 20 } }, { id: 2, quantity: 2, menuItem: { name: 'Beer', price: 8 } } ],
  subtotal: 36, total: 36, paymentMethod: 'cash', __drawerPulse: true,
};

// Korean menu — CJK glyphs → MUST stay HTML pixel (image) on OS-driver printers
// (raw ESC/POS garbles Korean). Proves the auto-format fallback keeps the old path.
const KORDER_KO = {
  orderNumber: 'T2-002', order_number: 'T2-002', id: 1002, order_type: 'dine_in', tableNumber: '2',
  items: [
    { id: 1, name: '비빔밥', quantity: 1, price: 20, kitchen_station_id: 9,  menuItem: { name: '비빔밥', price: 20 } },
    { id: 2, name: '맥주',   quantity: 2, price: 8,  kitchen_station_id: 22, menuItem: { name: '맥주', price: 8 } },
  ], subtotal: 36, total: 36,
};
const BORDER_KO = {
  orderNumber: 'T2-002', order_number: 'T2-002', id: 1002, order_type: 'dine_in', tableNumber: '2',
  items: [ { id: 1, quantity: 1, menuItem: { name: '비빔밥', price: 20 } }, { id: 2, quantity: 2, menuItem: { name: '맥주', price: 8 } } ],
  subtotal: 36, total: 36, paymentMethod: 'cash', __drawerPulse: true,
};

// Accented Latin + star bullet (with MIN's real products: "Café Latte Milk Bingsu",
// "★Joy Set 1"). rawText ASCII-folds these (é→e, ★→*) → pure ASCII → stays on the RAW
// path (not blank, not mojibake). Locks Fable gate D1/D2 (2026-07-08).
const KORDER_ACCENT = {
  orderNumber: 'T3-003', order_number: 'T3-003', id: 1003, order_type: 'dine_in', tableNumber: '3',
  items: [
    { id: 1, name: 'Café Latte Milk Bingsu', quantity: 1, price: 20, kitchen_station_id: 9, menuItem: { name: 'Café Latte Milk Bingsu', price: 20 }, options: ['★ Large', 'Crème'] },
  ], subtotal: 20, total: 20,
};

const CASES = [];
const K = (label, native, s9, s22, expect, order) => CASES.push({ group: 'KITCHEN 2-station', label, native,
  settings: { kitchenPrinter: { enabled: true, autoPrint: true, method: 'qztray', address: '' },
    kitchenStationPrinters: { '9': { stationName: 'KQ1', ...s9 }, '22': { stationName: 'BAR', ...s22 } }, workstations: [] },
  fn: 'printKitchenTicketViaRawBT', order: order || KORDER, expect });
// Latin (text-safe) → RAW ESC/POS on OS-driver printers
K('2 USB named (native) → 2 distinct printers', true,  st('qztray', 'KITCHEN 1'), st('qztray', 'BAR'), ['printRaw:os KITCHEN 1', 'printRaw:os BAR']);
K('2 USB named (web QZ) → 2 distinct printers', false, st('qztray', 'KITCHEN 1'), st('qztray', 'BAR'), ['qzRaw(drawer):KITCHEN 1', 'qzRaw(drawer):BAR']);
K('name + LAN-IP mix (native)', true,  st('qztray', 'KITCHEN 1'), st('qztray', '192.168.1.50:9100'), ['printRaw:os KITCHEN 1', 'printRaw:lan 192.168.1.50']);
K('name + LAN-IP mix (web)',   false, st('qztray', 'KITCHEN 1'), st('qztray', '192.168.1.50:9100'), ['qzRaw(drawer):KITCHEN 1', 'qzRaw:192.168.1.50']);
K('both browser / OS-default (native)', true, st('browser', ''), st('browser', ''), ['printRaw:os ', 'printRaw:os ']);
K('both RawBT tablet (web)', false, st('rawbt', 'KITCHEN 1'), st('rawbt', 'BAR'), ['rawbt:KITCHEN 1', 'rawbt:BAR']);
K('copies=2 on KQ1 (native)', true, st('qztray', 'KITCHEN 1', 2), st('qztray', 'BAR', 1), ['printRaw:os KITCHEN 1', 'printRaw:os KITCHEN 1', 'printRaw:os BAR']);
// Korean (CJK) → stays HTML pixel (image)
K('2 USB named KOREAN (native) → image path', true,  st('qztray', 'KITCHEN 1'), st('qztray', 'BAR'), ['printHtml:KITCHEN 1', 'printHtml:BAR'], KORDER_KO);
K('2 USB named KOREAN (web QZ) → image path', false, st('qztray', 'KITCHEN 1'), st('qztray', 'BAR'), ['qzPixel:KITCHEN 1', 'qzPixel:BAR'], KORDER_KO);

const S = (label, native, method, address, expect, order) => CASES.push({ group: 'KITCHEN single', label, native,
  settings: { kitchenPrinter: { enabled: true, autoPrint: true, method, address: address || '' }, kitchenStationPrinters: {}, workstations: [] },
  fn: 'printKitchenTicketViaRawBT', order: order || KORDER, expect });
S('single qztray name (native)', true,  'qztray', 'KITCHEN 1', ['printRaw:os KITCHEN 1']);
S('single qztray name (web)',   false, 'qztray', 'KITCHEN 1', ['qzRaw(drawer):KITCHEN 1']);
S('single browser OS-default (native)', true, 'browser', '', ['printRaw:os ']);
S('single browser dialog (web)', false, 'browser', '', ['browser']);
S('single LAN-IP (native)', true,  'qztray', '192.168.1.77:9100', ['printRaw:lan 192.168.1.77']);
S('single LAN-IP (web)',   false, 'qztray', '192.168.1.77:9100', ['qzRaw:192.168.1.77']);
S('single qztray name KOREAN (native) → image', true,  'qztray', 'KITCHEN 1', ['printHtml:KITCHEN 1'], KORDER_KO);
S('single qztray name KOREAN (web) → image',   false, 'qztray', 'KITCHEN 1', ['qzPixel:KITCHEN 1'], KORDER_KO);
// Accented Latin + star bullet (with MIN's real menu: "Café Latte", "★Joy Set") — the
// raw generators ASCII-fold (é→e, ★→*) so it stays text-safe → RAW, never blank/garbled.
S('single qztray ACCENT+star (native) → raw (folded)', true,  'qztray', 'KITCHEN 1', ['printRaw:os KITCHEN 1'], KORDER_ACCENT);
S('single qztray ACCENT+star (web) → raw (folded)',   false, 'qztray', 'KITCHEN 1', ['qzRaw(drawer):KITCHEN 1'], KORDER_ACCENT);

const B = (label, native, method, address, expect, order) => CASES.push({ group: 'BILL', label, native,
  settings: { billPrinter: { enabled: true, autoPrint: true, method, name: address || '', address: address || '' },
    kitchenPrinter: { enabled: false, autoPrint: false, method: 'qztray', address: '' }, kitchenStationPrinters: {},
    workstations: [{ id: 'w1', name: 'Main POS', billPrinter: { enabled: true, autoPrint: true, method, name: address || '', address: address || '' } }] },
  fn: 'printBillViaRawBT', order: order || BORDER, expect });
// Latin (text-safe) → RAW ESC/POS text + drawer pulse
B('bill qztray name + drawer (native)', true,  'qztray', 'POS-80C', ['printRaw:os POS-80C', 'openDrawer:POS-80C']);
B('bill qztray name + drawer (web)',   false, 'qztray', 'POS-80C', ['qzRaw(drawer):POS-80C', 'qzRaw(drawer):POS-80C']);
B('bill OS-default = browser method (native)', true, 'browser', '', ['printRaw:os ']);
B('bill qztray+EMPTY correctly refuses (guard, no phantom)', true, 'qztray', '', []); // if(!address) return false
B('bill LAN-IP (native)', true, 'qztray', '192.168.1.90:9100', ['printRaw:lan 192.168.1.90']);
B('bill browser dialog (web)', false, 'browser', '', ['browser']);
B('bill RawBT (web)', false, 'rawbt', 'POS-80C', ['rawbt:POS-80C']);
// Korean (CJK) → stays HTML pixel (image) + drawer pulse
B('bill qztray name KOREAN + drawer (native) → image', true,  'qztray', 'POS-80C', ['printHtml:POS-80C', 'openDrawer:POS-80C'], BORDER_KO);
B('bill qztray name KOREAN + drawer (web) → image',   false, 'qztray', 'POS-80C', ['qzPixel:POS-80C', 'qzRaw(drawer):POS-80C'], BORDER_KO);

// Routing overrides
CASES.push({ group: 'ROUTING override', label: 'emergency mode → kitchen routes to BILL printer (Latin=raw)', native: true,
  settings: { emergencyMode: true, billPrinter: { enabled: true, autoPrint: true, method: 'qztray', name: 'POS-80C', address: 'POS-80C' },
    kitchenPrinter: { enabled: true, autoPrint: true, method: 'qztray', address: 'KITCHEN 1' },
    kitchenStationPrinters: { '9': { stationName: 'KQ1', ...st('qztray', 'KITCHEN 1') } },
    workstations: [{ id: 'w1', name: 'Main POS', billPrinter: { enabled: true, autoPrint: true, method: 'qztray', name: 'POS-80C', address: 'POS-80C' } }] },
  fn: 'printKitchenTicketViaRawBT', order: KORDER, expect: ['printRaw:os POS-80C'] });

module.exports = { CASES };
