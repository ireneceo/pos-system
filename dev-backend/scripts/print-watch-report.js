/**
 * 인쇄 지킴이 보고 — 읽기 전용 (2026-11-13 · 설계 .claude/fable-design-20261113-print-monitoring.md §4-2).
 * 매일 정기 점검 방이 운영 읽기 조회 때 돌려 보고(상황판)에 넣는다 = «우리가 알아서 체크».
 *
 *   node scripts/print-watch-report.js            열린 발견 + 지난 24시간 새로 생김·풀림 (print_watch_findings 읽기)
 *   node scripts/print-watch-report.js --dry-run  표를 안 읽고 지금 판정만(printWatch.evaluate) — 기준선 실측·배포 전 확인
 *   --all  데모·시험 매장도 포함(기본은 실고객만) · --json  기계용 출력
 * 쓰기 없음. 끝에 process.exit.
 */
require('dotenv').config({ quiet: true });
const args = new Set(process.argv.slice(2));
const DRY = args.has('--dry-run');
const ALL = args.has('--all');
const JSON_OUT = args.has('--json');

const LABEL = {
  setup_gap: '프린터 안 정해진 주방',
  print_failures: '인쇄 실패 보고',
  unprinted_orders: '자동 인쇄인데 안 나간 주문',
  multi_auto_print: '자동 인쇄 기기 여러 대',
  old_app: '옛 앱 버전',
  settings_blocked: '권한 없는 프린터 설정 변경 시도',
};

function line(f, name) {
  const e = f.evidence || {};
  let what = '';
  if (f.code === 'setup_gap') what = (e.kitchens || []).join(', ');
  else if (f.code === 'print_failures') what = `${e.count}건 · ` + (e.top || []).map((t) => `${t.reason}×${t.n}@${t.printer}`).join(', ');
  else if (f.code === 'unprinted_orders') what = `${e.count}건 · ${(e.orders || []).join(', ')}`;
  else if (f.code === 'multi_auto_print') what = `${e.count}대`;
  else if (f.code === 'old_app') what = (e.devices || []).join(', ') + ` (기준 ${e.min})`;
  else if (f.code === 'settings_blocked') what = `${e.count}회`;
  return `- [${f.severity}] 매장 ${f.restaurant_id} ${name || e.name || ''} — ${LABEL[f.code] || f.code}: ${what}`;
}

(async () => {
  try {
    if (DRY) {
      const { evaluate, RULE_CODES } = require('../services/printWatch');
      const rows = (await evaluate({})).filter((r) => ALL || !r.demo);
      const byRule = Object.fromEntries(RULE_CODES.map((c) => [c, 0]));
      for (const r of rows) for (const f of r.findings) byRule[f.code]++;
      if (JSON_OUT) { console.log(JSON.stringify({ restaurants: rows.length, byRule, rows }, null, 1)); process.exit(0); }
      console.log(`인쇄 지킴이 (판정만 · ${ALL ? '전체' : '실고객'}) — 대상 매장 ${rows.length}`);
      console.log('규칙별 걸린 매장 수: ' + RULE_CODES.map((c) => `${c} ${byRule[c]}`).join(' · '));
      for (const r of rows) for (const f of r.findings) console.log(line({ ...f, restaurant_id: r.restaurant_id }, r.name));
      process.exit(0);
    }
    const { Op } = require('sequelize');
    const { PrintWatchFinding } = require('../models');
    const dayAgo = new Date(Date.now() - 24 * 3600 * 1000);
    const keep = (f) => ALL || !(f.evidence && f.evidence.demo);
    const open = (await PrintWatchFinding.findAll({ where: { status: 'open' }, order: [['severity', 'ASC'], ['first_seen_at', 'ASC']] })).map((x) => x.get({ plain: true })).filter(keep);
    const resolved = (await PrintWatchFinding.findAll({ where: { status: 'resolved', resolved_at: { [Op.gte]: dayAgo } } })).map((x) => x.get({ plain: true })).filter(keep);
    const fresh = open.filter((f) => new Date(f.first_seen_at) >= dayAgo);
    if (JSON_OUT) { console.log(JSON.stringify({ open, fresh, resolved }, null, 1)); process.exit(0); }
    console.log(`인쇄 지킴이: 새 문제 ${fresh.length} · 계속 ${open.length - fresh.length} · 풀림 ${resolved.length} (${ALL ? '전체' : '실고객'} · 지난 24시간)`);
    if (fresh.length) { console.log('## 새 문제'); fresh.forEach((f) => console.log(line(f))); }
    const cont = open.filter((f) => new Date(f.first_seen_at) < dayAgo);
    if (cont.length) { console.log('## 계속'); cont.forEach((f) => console.log(line(f) + ` (since ${new Date(f.first_seen_at).toISOString().slice(0, 16)}Z · ${f.seen_count}회)`)); }
    if (resolved.length) { console.log('## 풀림'); resolved.forEach((f) => console.log(line(f))); }
    process.exit(0);
  } catch (e) {
    console.error('print-watch-report 실패:', e.message);
    process.exit(1);
  }
})();
