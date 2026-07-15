'use strict';

// Diagnostics page renderer (no web-app contact). Drives window.diag (preload).

const out = document.getElementById('out');
function show(label, value) {
  out.textContent = label + '\n' + JSON.stringify(value, null, 2);
}
function run(label, fn) {
  out.textContent = label + '\n(running…)';
  Promise.resolve()
    .then(fn)
    .then((v) => show(label, v))
    .catch((e) => show(label + ' [ERROR]', String(e)));
}

// Same UTF-8 -> base64 encoding billPrint uses for raw payloads.
function toBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

// A tiny ESC/POS test slip: init, centered text, feed, partial cut.
function sampleEscPos() {
  return (
    '\x1B\x40' +            // ESC @  init
    '\x1B\x61\x01' +        // ESC a 1  center
    'Purple POS\n' +
    'RAW test OK\n' +
    new Date().toISOString() + '\n' +
    '\x0A\x0A\x0A' +        // feed
    '\x1D\x56\x01'          // GS V 1  partial cut
  );
}

function sampleHtml() {
  return (
    '<!DOCTYPE html><html><head><meta charset="UTF-8"></head>' +
    '<body style="font-family:sans-serif;width:72mm;margin:0;padding:4px;">' +
    '<div style="text-align:center;font-size:16px;font-weight:bold;">Purple POS</div>' +
    '<div style="text-align:center;">HTML pixel test</div>' +
    '<hr>' +
    '<div>한글 인쇄 테스트</div>' +
    '<div>주방 티켓 · 세트 메뉴</div>' +
    '<div>' + new Date().toLocaleString() + '</div>' +
    '<div style="margin-top:8px;">--------------------------------</div>' +
    '</body></html>'
  );
}

// Embedded logo (data URI) so the self-test exercises the same <img> raster path
// a real receipt's logo goes through — no web-app contact needed.
const LOGO = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='56'><rect x='2' y='2' width='196' height='52' fill='none' stroke='black' stroke-width='3'/><text x='100' y='38' font-size='26' fill='black' text-anchor='middle' font-family='sans-serif' font-weight='bold'>PURPLE POS</text></svg>";

function sampleBillHtml() {
  return (
    '<!DOCTYPE html><html><head><meta charset="UTF-8">' +
    '<style>@page{size:80mm auto;margin:0}body{font-family:sans-serif;width:100%;margin:0;padding:6px;box-sizing:border-box;color:#000}' +
    '.c{text-align:center}.r{display:flex;justify-content:space-between}hr{border:none;border-top:1px dashed #000;margin:6px 0}' +
    '.big{font-size:15px;font-weight:bold}</style></head><body>' +
    '<div class="c"><img src="' + LOGO + '" width="200" height="56"></div>' +
    '<div class="c big">with MIN Cafe</div>' +
    '<div class="c">RASTER 정석 테스트 — 빌 영수증</div><hr>' +
    '<div class="r"><span>Latte 라떼</span><span>RM 12.00</span></div>' +
    '<div class="r"><span>Kimchi Fried Rice 김치볶음밥</span><span>RM 18.00</span></div>' +
    '<div class="r"><span>Set Menu 세트메뉴 A</span><span>RM 25.00</span></div><hr>' +
    '<div class="r big"><span>TOTAL</span><span>RM 55.00</span></div><hr>' +
    '<div class="c">Thank you for dining with us!</div>' +
    '<div class="c">' + new Date().toLocaleString() + '</div></body></html>'
  );
}

function sampleTicketHtml() {
  return (
    '<!DOCTYPE html><html><head><meta charset="UTF-8">' +
    '<style>@page{size:80mm auto;margin:0}body{font-family:sans-serif;width:100%;margin:0;padding:6px;box-sizing:border-box;color:#000}' +
    '.c{text-align:center}.big{font-size:16px;font-weight:bold}hr{border:none;border-top:1px dashed #000;margin:6px 0}' +
    '.it{font-size:15px;margin:4px 0}</style></head><body>' +
    '<div class="c big">ORDER TICKET / 주방</div>' +
    '<div class="c">RASTER 정석 테스트 — 오더티켓</div><hr>' +
    '<div class="c">Order #260715-099 · Table 5</div><hr>' +
    '<div class="it">1 x Kimchi Fried Rice 김치볶음밥</div>' +
    '<div class="it">2 x Latte 라떼</div>' +
    '<div class="it">1 x Set Menu 세트메뉴 A</div>' +
    '<div class="it" style="padding-left:10px;color:#000">- Spicy 맵게</div><hr>' +
    '<div class="c">[ KITCHEN ]</div>' +
    '<div class="c">' + new Date().toLocaleString() + '</div></body></html>'
  );
}

document.getElementById('btnSelfTest').onclick = () => {
  const printerName = document.getElementById('selfPrinter').value.trim();
  run('자가진단: Bill + Order Ticket → ' + (printerName || '(default)'), async () => {
    const bill = await window.diag.printHtml({ html: sampleBillHtml(), printerName, widthMm: 80, copies: 1 });
    const ticket = await window.diag.printHtml({ html: sampleTicketHtml(), printerName, widthMm: 80, copies: 1 });
    return { bill, ticket, hint: '둘 다 로고·한글 디자인대로 나오면 정상. via:raster = 정석 경로.' };
  });
};

document.getElementById('btnDiag').onclick = () => run('diagnostics()', () => window.diag.diagnostics());
document.getElementById('btnList').onclick = () => run('listPrinters()', () => window.diag.listPrinters());
document.getElementById('btnDefault').onclick = () => run('getDefaultPrinter()', () => window.diag.getDefaultPrinter());

document.getElementById('btnHtml').onclick = () => {
  const printerName = document.getElementById('htmlPrinter').value.trim();
  run('printHtml()', () => window.diag.printHtml({ html: sampleHtml(), printerName, widthMm: 80, copies: 1 }));
};

// Zero-paper discriminator (with MIN blank-bill saga): runs the exact hidden-window
// render pipeline a real bill uses, saves it as a PDF and opens it on screen.
// PDF shows the ticket => rendering is fine, blame the driver/spool leg.
// PDF is blank        => the hidden window still renders empty.
document.getElementById('btnRender').onclick = () => {
  run('renderCheck()', () => window.diag.renderCheck({ html: sampleHtml() }));
};

document.getElementById('btnLan').onclick = () => {
  const host = document.getElementById('lanHost').value.trim();
  const port = parseInt(document.getElementById('lanPort').value.trim() || '9100', 10);
  run('printRaw() LAN', () => window.diag.printRaw({ data: toBase64(sampleEscPos()), target: { kind: 'lan', host, port } }));
};
document.getElementById('btnDrawerLan').onclick = () => {
  const host = document.getElementById('lanHost').value.trim();
  const port = parseInt(document.getElementById('lanPort').value.trim() || '9100', 10);
  run('openDrawer() LAN', () => window.diag.openDrawer({ kind: 'lan', host, port }));
};

document.getElementById('btnOs').onclick = () => {
  const printerName = document.getElementById('osPrinter').value.trim();
  run('printRaw() OS', () => window.diag.printRaw({ data: toBase64(sampleEscPos()), target: { kind: 'os', printerName } }));
};
document.getElementById('btnDrawerOs').onclick = () => {
  const printerName = document.getElementById('osPrinter').value.trim();
  run('openDrawer() OS', () => window.diag.openDrawer({ kind: 'os', printerName }));
};
