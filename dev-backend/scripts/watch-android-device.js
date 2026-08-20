#!/usr/bin/env node
/**
 * watch-android-device.js — 안드로이드 실기기 검증 실시간 관측 (읽기 전용)
 * ==========================================================================
 * 매장에서 Irene 이 태블릿을 만지는 동안, 서버 쪽에서 무슨 일이 일어나는지 실시간으로 본다.
 * 지금까지 실기기 검증이 0회였던 이유는 하드웨어였고, 그래서 아래 두 가지가 미실증으로 남아 있다:
 *   - M3 ①~⑦ (종이 품질·BT SPP·드로어 물리 킥 …) → 사람 눈으로만 판정 가능
 *   - V4 블로커 #2: "claim 은 되는데 0바이트 + printed_at 0 + trace 0" (에뮬레이터에서 미해결 모순)
 *
 * 이 스크립트가 대신 봐 주는 것 (전부 SELECT / 로그 tail — 쓰기 0):
 *   ① print_device_status 에 platform='android-app' 행이 올라오는가 (지금까지 전 기간 0행)
 *   ② [print-trace] CLIENT ... 가 찍히는가 = 폴러가 billPrint 의 네이티브 발송 지점까지 도달했는가
 *      (billPrint 의 텔레메트리는 __NATIVE_PRINT 가 있을 때만 자동 발사 — 켤 플래그 없음, 코드 수정 불필요)
 *   ③ 주문의 claim / printed_at 전이 — 유실 판정은 needs_print 가 아니라 printed_at 으로 한다
 *      (print-claim 이 인쇄 "시작" 시점에 needs_print=0 을 만들기 때문. 함정 #2)
 *
 * 사용: node scripts/watch-android-device.js --rid=10 [--prod] [--since=10]
 *   --prod  운영서버(SSH)에서 조회. 생략하면 dev.
 *   --since 최근 N분 (기본 15)
 */
const { execFileSync } = require('child_process');

const arg = (k, d) => {
  const m = process.argv.find((a) => a.startsWith(`--${k}=`));
  return m ? m.split('=')[1] : d;
};
const RID = parseInt(arg('rid', '10'), 10);
const SINCE_MIN = parseInt(arg('since', '15'), 10);
const PROD = process.argv.includes('--prod');
const PROD_SSH = 'irene@87.106.78.146';

if (!/^\d+$/.test(String(RID))) { console.error('rid 는 정수만'); process.exit(1); }

const REMOTE_JS = `
const db = require('/var/www/${PROD ? 'production' : 'dev'}-backend/models');
const seq = db.sequelize || db.Order.sequelize;
(async () => {
  const q = async (s) => (await seq.query(s))[0];
  const since = "DATE_SUB(NOW(), INTERVAL ${SINCE_MIN} MINUTE)";

  const dev = await q(\`SELECT device_id, platform, app_version, printer_mode, is_auto_print, label, last_report_at
                       FROM print_device_status WHERE restaurant_id=${RID} ORDER BY last_report_at DESC LIMIT 8\`);
  console.log('── 기기 리포트 (rid=${RID}) ──');
  if (!dev.length) console.log('  (행 없음)');
  dev.forEach(d => console.log(\`  \${d.platform.padEnd(12)} \${String(d.app_version||'-').padEnd(8)} mode=\${d.printer_mode} auto=\${d.is_auto_print} "\${d.label}" \${d.last_report_at}\`));
  const nat = dev.filter(d => d.platform === 'android-app');
  console.log(\`  → android-app 행: \${nat.length}건 \${nat.length ? '✅ 앱이 실제로 켜졌다' : '❌ 아직 앱에서 보고 없음'}\`);

  const ord = await q(\`SELECT id, order_number, status, payment_status, needs_print, print_claimed_at, updatedAt
                       FROM orders WHERE restaurant_id=${RID} AND is_deleted=0 AND updatedAt >= \${since}
                       ORDER BY id DESC LIMIT 8\`);
  console.log('\\n── 최근 \${SINCE_MIN}분 주문 (claim/인쇄 전이) ──'.replace('\${SINCE_MIN}', ${SINCE_MIN}));
  if (!ord.length) console.log('  (없음)');
  for (const o of ord) {
    // 유실 판정은 printed_at 으로 — needs_print 는 claim 시점에 0이 되므로 "인쇄 중"과 구분 불가
    const [items] = await seq.query(\`SELECT order_items FROM orders WHERE id=\${o.id}\`);
    let oi = items[0] && items[0].order_items;
    if (typeof oi === 'string') { try { oi = JSON.parse(oi); } catch { oi = []; } }
    const arr = Array.isArray(oi) ? oi : [];
    const printed = arr.filter(i => i && i.printed_at).length;
    console.log(\`  #\${o.order_number} \${o.status}/\${o.payment_status} needs_print=\${o.needs_print} claim=\${o.print_claimed_at ? 'SET' : 'NULL'} printed_at=\${printed}/\${arr.length}\`);
  }
  process.exit(0);
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
`;

function run() {
  console.log(`\n${'='.repeat(78)}\n${new Date().toISOString()}  target=${PROD ? '운영' : 'dev'} rid=${RID}\n${'='.repeat(78)}`);
  try {
    if (PROD) {
      execFileSync('ssh', [PROD_SSH, `cat > /tmp/_watch_android.js <<'JSEOF'\n${REMOTE_JS}\nJSEOF\ncd /var/www/production-backend && node /tmp/_watch_android.js`], { stdio: 'inherit' });
      console.log('\n── [print-trace] CLIENT (운영 로그) ──');
      console.log('  = 폴러가 billPrint 의 네이티브 발송 지점까지 도달했다는 유일한 증거');
      execFileSync('ssh', [PROD_SSH, `grep '\\[print-trace\\] CLIENT' /var/www/logs/production/out.log | tail -15 || echo '  (아직 0건)'`], { stdio: 'inherit' });
    } else {
      require('fs').writeFileSync('/tmp/_watch_android.js', REMOTE_JS);
      execFileSync('node', ['/tmp/_watch_android.js'], { stdio: 'inherit' });
    }
  } catch (e) {
    console.error('조회 실패:', e.message);
  }
}
run();
