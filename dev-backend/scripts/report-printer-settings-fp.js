// 읽기 전용 — 매장별 printer_settings 지문(SHA2) + 모양 집계. 쓰기 0. (2026-11-08 Fable 설계 b §4 S8 · 판정 §9-4)
// 쓰는 곳: 배포 전 1회 → 배포 뒤 1회 → diff 로 sha 가 바뀐 줄만 본다(그 매장의 updatedAt 이 배포 뒤 관리자 저장 시각이면 정상).
//   개발: cd /var/www/dev-backend && node scripts/report-printer-settings-fp.js
//   운영: cd /var/www/production-backend && timeout 60 node scripts/report-printer-settings-fp.js > /tmp/ps-fp-$(date +%F-%H%M).txt
// 집계: m3_keep = 고른 주방 방식이 옛 printerMode 와 달라 이번 수정(M3)으로 «유지되는» 매장 · pos2_noAuto = POS 자리 ≥2 인데
//       자동인쇄 켠 자리 0(아무도 주방 안 찍음) · rcpt_missing_autoOn = receiptSettings 없음 ∧ 결제 후 자동인쇄 ON(저장 1회 뒤 1장→2장).
// GROUP_CONCAT 안 씀(1024바이트 잘림).
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env'), quiet: true });
const { sequelize } = require('../config/database');
(async () => {
  const [rows] = await sequelize.query("SELECT id, name, is_demo, updatedAt, SHA2(printer_settings,256) sha, printer_settings ps FROM restaurants WHERE printer_settings IS NOT NULL AND printer_settings<>'' ORDER BY id");
  let m3 = 0, noAuto2 = 0, rcpt = 0;
  for (const r of rows) {
    let p = {}; try { p = typeof r.ps === 'string' ? JSON.parse(r.ps) : (r.ps || {}); } catch { /* 깨진 JSON 은 빈 모양으로 */ }
    const ws = p.workstations || []; const st = Object.values(p.kitchenStationPrinters || {});
    const wsAuto = ws.some((w) => w.billPrinter && w.billPrinter.autoPrint);
    const kitM = (p.kitchenPrinter && p.kitchenPrinter.method) || '-';
    if (kitM !== '-' && kitM !== p.printerMode && st.length === 0) m3++;
    if (ws.length >= 2 && !wsAuto) noAuto2++;
    if (!p.receiptSettings && wsAuto) rcpt++;
    console.log([r.id, JSON.stringify(r.name), r.is_demo, r.updatedAt && new Date(r.updatedAt).toISOString(), r.sha,
      'mode=' + p.printerMode, 'billM=' + ((p.billPrinter && p.billPrinter.method) || '-'), 'kitM=' + kitM,
      'kitA=' + (p.kitchenPrinter && p.kitchenPrinter.address ? 'y' : '-'),
      'ws=' + ws.map((w) => ((w.billPrinter && w.billPrinter.method) || '-') + (w.billPrinter && w.billPrinter.autoPrint ? '+auto' : '')).join('|'),
      'st=' + st.length + '/' + st.filter((s) => !s.address).length + 'empty', 'fmt=' + (p.printFormat || '-'), 'rcpt=' + (p.receiptSettings ? 'y' : '-')].join('\t'));
  }
  console.log('# rows=' + rows.length + ' m3_keep=' + m3 + ' pos2_noAuto=' + noAuto2 + ' rcpt_missing_autoOn=' + rcpt);
  process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });
