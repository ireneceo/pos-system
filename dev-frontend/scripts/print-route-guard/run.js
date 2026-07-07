#!/usr/bin/env node
/* ─────────────────────────────────────────────────────────────────────────────
 * PRINT-ROUTE GUARD — auto-print routing regression gate (fail-closed, deploy gate)
 *
 * Runs the REAL utils/billPrint.js dispatch (bundled with a QZ-Tray spy) across every
 * print method × printer type × native/web × copies/emergency config, and asserts the
 * exact transport call that would reach the printer. Proves every auto-print route is
 * correct up to the physical paper — the one thing code can't verify.
 *
 * Sibling of scripts/inspection (backend) — this is the FRONTEND print-dispatch gate.
 *   pass  → exit 0     fail → exit 1 (blocks deploy)
 * Flags: --quiet (only summary + failures)
 *
 * Self-contained: bundles billPrint.js via webpack, serves a local origin for
 * localStorage, drives headless Chromium. No dev server / QZ Tray / printer / network.
 * ──────────────────────────────────────────────────────────────────────────── */
'use strict';
const path = require('path');
const os = require('os');
const fs = require('fs');
const http = require('http');
const webpack = require('webpack');
const { chromium } = require('playwright');
const { CASES } = require('./cases');

const QUIET = process.argv.includes('--quiet');
const ROOT = path.resolve(__dirname, '../..');            // dev-frontend
const ENTRY = path.join(ROOT, 'src/utils/billPrint.js');
const SPY = path.join(__dirname, 'qz-spy.js');
const OUT = path.join(os.tmpdir(), `print-route-guard-bp.${process.pid}.js`);

// Transport spies — installed before the bundle loads; each records the normalized
// call billPrint.js would make to a printer onto window.__LOG (single ordered sink).
const INIT = `
  window.__LOG = [];
  window.__setNative = (on) => {
    if (on) window.__NATIVE_PRINT = {
      listPrinters: async () => ['POS-80C','KITCHEN 1','KITCHEN 2','BAR'],
      printHtml:  async (o) => { window.__LOG.push('printHtml:'+((o&&o.printerName)||'')); return {ok:true}; },
      printRaw:   async (o) => { const t=o&&o.target||{}; window.__LOG.push(t.kind==='lan'?('printRaw:lan '+t.host):('printRaw:os '+(t.printerName||''))); return {ok:true}; },
      openDrawer: async (o) => { window.__LOG.push('openDrawer:'+((o&&o.printerName)||'')); return {ok:true}; },
    };
    else { try { window.__NATIVE_PRINT = undefined; } catch(e){} }
  };
  const _orig = Node.prototype.appendChild;
  Node.prototype.appendChild = function(node){
    try {
      if (node && node.tagName === 'IFRAME') {
        const src = (node.getAttribute && node.getAttribute('src')) || node.src || '';
        if (typeof src === 'string' && src.indexOf('intent:') === 0) {
          let name=''; const m=src.match(/S\\.s=([^;]+);/); if(m){ try{name=decodeURIComponent(m[1]);}catch(e){name=m[1];} }
          window.__LOG.push('rawbt:'+name);
          try { node.removeAttribute('src'); node.src='about:blank'; } catch(e){}
          return _orig.call(this, node);
        }
        window.__LOG.push('browser');
        return _orig.call(this, node);
      }
    } catch(e){}
    return _orig.call(this, node);
  };
  window.__reset = () => { window.__LOG = []; };
`;

function bundle() {
  return new Promise((resolve, reject) => {
    webpack({
      mode: 'development', entry: ENTRY,
      output: { path: path.dirname(OUT), filename: path.basename(OUT), library: 'BP', libraryTarget: 'window' },
      resolve: { alias: { 'qz-tray$': SPY } },
      target: 'web', devtool: false, performance: { hints: false },
    }, (err, stats) => {
      if (err) return reject(err);
      if (stats.hasErrors()) return reject(new Error(stats.toJson().errors.map(e => e.message || e).slice(0, 3).join('\n')));
      resolve();
    });
  });
}

function serve() {
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<!doctype html><html><head><meta charset="utf-8"></head><body>print-route-guard</body></html>');
    });
    srv.listen(0, '127.0.0.1', () => resolve(srv));
  });
}

const norm = (a) => a.slice().sort().join(' | ');

(async () => {
  if (!fs.existsSync(ENTRY)) { console.error('✗ billPrint.js not found:', ENTRY); process.exit(1); }
  await bundle();
  const srv = await serve();
  const port = srv.address().port;
  const browser = await chromium.launch({ headless: true });
  const perr = [];
  let rows = [];
  try {
    const ctx = await browser.newContext();
    await ctx.addInitScript(INIT);
    const page = await ctx.newPage();
    page.on('pageerror', e => perr.push(e.message));
    page.on('dialog', d => d.dismiss().catch(() => {}));
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded' });
    await page.addScriptTag({ path: OUT });
    const ok = await page.evaluate(() => !!(window.BP && window.BP.printKitchenTicketViaRawBT && window.BP.printBillViaRawBT));
    if (!ok) throw new Error('billPrint bundle did not expose BP dispatch fns');

    for (const c of CASES) {
      const r = await page.evaluate(async ({ settings, fn, order, native }) => {
        window.__setNative(native);
        localStorage.setItem('printerSettings', JSON.stringify(settings));
        localStorage.removeItem('kitchenStationMenuMap');
        localStorage.removeItem('activeWorkstationId');
        window.__reset();
        const o = JSON.parse(JSON.stringify(order));
        o.date = new Date(); // generators format orderData.date (a real Date, stripped by JSON)
        let ret, err = null;
        try { ret = await window.BP[fn](o, { name: 'Demo', timeZone: 'Asia/Kuala_Lumpur', currency: 'RM' }); }
        catch (e) { err = String(e && e.message || e); }
        await new Promise(res => setTimeout(res, 700)); // let fire-and-forget (unified ticket, copies) settle
        return { log: window.__LOG.slice(), ret, err };
      }, c);
      rows.push({ group: c.group, label: c.label, mode: c.native ? 'native' : 'web', expect: c.expect, got: r.log, ret: r.ret, err: r.err,
        ok: norm(r.log) === norm(c.expect) && !r.err });
    }
  } finally {
    await browser.close();
    srv.close();
    try { fs.unlinkSync(OUT); } catch (e) {}
  }

  let pass = 0, fail = 0, curGroup = '';
  for (const r of rows) {
    if (!QUIET && r.group !== curGroup) { curGroup = r.group; console.log('\n══ ' + curGroup + ' ══'); }
    const got = r.got.length ? r.got.join(' + ') : `(no print, ret=${r.ret})`;
    if (r.ok) { pass++; if (!QUIET) console.log(`✓ [${r.mode.padEnd(6)}] ${r.label.padEnd(50)} → ${got}`); }
    else {
      fail++;
      console.log(`✗ [${r.mode.padEnd(6)}] ${r.label}`);
      console.log(`      expect: ${JSON.stringify(r.expect)}`);
      console.log(`      got   : ${JSON.stringify(r.got)}${r.err ? '  ERR=' + r.err : ''}`);
    }
  }
  const clean = fail === 0 && perr.length === 0;
  console.log(`\n${clean ? '✓' : '✗'} PRINT-ROUTE GUARD ${pass}/${rows.length} routes correct  (pageerrors: ${perr.length})`);
  if (perr.length) perr.slice(0, 5).forEach(e => console.log('  pageerror: ' + String(e).slice(0, 150)));
  process.exit(clean ? 0 : 1);
})().catch(e => { console.error('✗ PRINT-ROUTE GUARD crashed:', e.message); process.exit(1); });
