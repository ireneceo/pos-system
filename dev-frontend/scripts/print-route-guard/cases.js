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
 */
'use strict';

// station config; `name` mirrors `address` so RawBT (routes by sp.name) and qztray
// (routes by sp.address) both resolve to the same physical printer.
const st = (method, address, copies) => ({ method, name: address || '', address: address || '', copies: copies || 1, autoPrint: true });

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

const CASES = [];
const K = (label, native, s9, s22, expect) => CASES.push({ group: 'KITCHEN 2-station', label, native,
  settings: { kitchenPrinter: { enabled: true, autoPrint: true, method: 'qztray', address: '' },
    kitchenStationPrinters: { '9': { stationName: 'KQ1', ...s9 }, '22': { stationName: 'BAR', ...s22 } }, workstations: [] },
  fn: 'printKitchenTicketViaRawBT', order: KORDER, expect });
K('2 USB named (native) → 2 distinct printers', true,  st('qztray', 'KITCHEN 1'), st('qztray', 'BAR'), ['printHtml:KITCHEN 1', 'printHtml:BAR']);
K('2 USB named (web QZ) → 2 distinct printers', false, st('qztray', 'KITCHEN 1'), st('qztray', 'BAR'), ['qzPixel:KITCHEN 1', 'qzPixel:BAR']);
K('name + LAN-IP mix (native)', true,  st('qztray', 'KITCHEN 1'), st('qztray', '192.168.1.50:9100'), ['printHtml:KITCHEN 1', 'printRaw:lan 192.168.1.50']);
K('name + LAN-IP mix (web)',   false, st('qztray', 'KITCHEN 1'), st('qztray', '192.168.1.50:9100'), ['qzPixel:KITCHEN 1', 'qzRaw:192.168.1.50']);
K('both browser / OS-default (native)', true, st('browser', ''), st('browser', ''), ['printHtml:', 'printHtml:']);
K('both RawBT tablet (web)', false, st('rawbt', 'KITCHEN 1'), st('rawbt', 'BAR'), ['rawbt:KITCHEN 1', 'rawbt:BAR']);
K('copies=2 on KQ1 (native)', true, st('qztray', 'KITCHEN 1', 2), st('qztray', 'BAR', 1), ['printHtml:KITCHEN 1', 'printHtml:KITCHEN 1', 'printHtml:BAR']);

const S = (label, native, method, address, expect) => CASES.push({ group: 'KITCHEN single', label, native,
  settings: { kitchenPrinter: { enabled: true, autoPrint: true, method, address: address || '' }, kitchenStationPrinters: {}, workstations: [] },
  fn: 'printKitchenTicketViaRawBT', order: KORDER, expect });
S('single qztray name (native)', true,  'qztray', 'KITCHEN 1', ['printHtml:KITCHEN 1']);
S('single qztray name (web)',   false, 'qztray', 'KITCHEN 1', ['qzPixel:KITCHEN 1']);
S('single browser OS-default (native)', true, 'browser', '', ['printHtml:']);
S('single browser dialog (web)', false, 'browser', '', ['browser']);
S('single LAN-IP (native)', true,  'qztray', '192.168.1.77:9100', ['printRaw:lan 192.168.1.77']);
S('single LAN-IP (web)',   false, 'qztray', '192.168.1.77:9100', ['qzRaw:192.168.1.77']);

const B = (label, native, method, address, expect) => CASES.push({ group: 'BILL', label, native,
  settings: { billPrinter: { enabled: true, autoPrint: true, method, name: address || '', address: address || '' },
    kitchenPrinter: { enabled: false, autoPrint: false, method: 'qztray', address: '' }, kitchenStationPrinters: {},
    workstations: [{ id: 'w1', name: 'Main POS', billPrinter: { enabled: true, autoPrint: true, method, name: address || '', address: address || '' } }] },
  fn: 'printBillViaRawBT', order: BORDER, expect });
B('bill qztray name + drawer (native)', true,  'qztray', 'POS-80C', ['printHtml:POS-80C', 'openDrawer:POS-80C']);
B('bill qztray name + drawer (web)',   false, 'qztray', 'POS-80C', ['qzPixel:POS-80C', 'qzRaw(drawer):POS-80C']);
B('bill OS-default = browser method (native)', true, 'browser', '', ['printHtml:']);
B('bill qztray+EMPTY correctly refuses (guard, no phantom)', true, 'qztray', '', []); // if(!address) return false
B('bill LAN-IP (native)', true, 'qztray', '192.168.1.90:9100', ['printRaw:lan 192.168.1.90']);
B('bill browser dialog (web)', false, 'browser', '', ['browser']);
B('bill RawBT (web)', false, 'rawbt', 'POS-80C', ['rawbt:POS-80C']);

// Routing overrides
CASES.push({ group: 'ROUTING override', label: 'emergency mode → kitchen routes to BILL printer', native: true,
  settings: { emergencyMode: true, billPrinter: { enabled: true, autoPrint: true, method: 'qztray', name: 'POS-80C', address: 'POS-80C' },
    kitchenPrinter: { enabled: true, autoPrint: true, method: 'qztray', address: 'KITCHEN 1' },
    kitchenStationPrinters: { '9': { stationName: 'KQ1', ...st('qztray', 'KITCHEN 1') } },
    workstations: [{ id: 'w1', name: 'Main POS', billPrinter: { enabled: true, autoPrint: true, method: 'qztray', name: 'POS-80C', address: 'POS-80C' } }] },
  fn: 'printKitchenTicketViaRawBT', order: KORDER, expect: ['printHtml:POS-80C'] });

module.exports = { CASES };
