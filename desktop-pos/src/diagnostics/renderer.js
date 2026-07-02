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

document.getElementById('btnDiag').onclick = () => run('diagnostics()', () => window.diag.diagnostics());
document.getElementById('btnList').onclick = () => run('listPrinters()', () => window.diag.listPrinters());
document.getElementById('btnDefault').onclick = () => run('getDefaultPrinter()', () => window.diag.getDefaultPrinter());

document.getElementById('btnHtml').onclick = () => {
  const printerName = document.getElementById('htmlPrinter').value.trim();
  run('printHtml()', () => window.diag.printHtml({ html: sampleHtml(), printerName, widthMm: 80, copies: 1 }));
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
