/**
 * printWatch — 인쇄 지킴이 판정 + 발견 기록 (2026-11-13 · 설계 .claude/fable-design-20261113-print-monitoring.md §3).
 *
 * Irene «다시 프린터 사용에 문제 생기는 것에 대해 로그 심어서 파악하고 우리가 알아서 체크할 수 없어?»
 *
 * - evaluate({ now, restaurantIds? })  : DB 를 읽어 매장별 발견 목록을 돌려준다(쓰기 없음 — report --dry-run 도 이것).
 * - runWatch({ now })                  : evaluate + print_watch_findings 열기·갱신·풀기 + 오래된 기록 정리.
 *   정기 작업(printWatchScheduler · 매시 7분 · 주인 프로세스만)과 health-check 가 now 를 넣어 부른다.
 *
 * 인쇄 동작 무접촉 — 🔒 보호 파일을 읽지도 부르지도 않는다. 기존 진단(S1~S8)·fleet 판정식도 그대로.
 */
const { Op, QueryTypes } = require('sequelize');
const { findPrinterSetupGaps } = require('../utils/printerSetupGaps');

// 결함 있는 옛 앱 기준판 — 새 앱을 낼 때 같이 올린다(docs/PRINT_SELF_DIAGNOSE_DESIGN.md «인쇄 지킴이» 절).
const MIN_APP_VERSION = { 'android-app': '0.4.1' };

const H = 3600 * 1000;
const RULE_CODES = ['setup_gap', 'print_failures', 'unprinted_orders', 'multi_auto_print', 'old_app', 'settings_blocked'];

function cmpVersion(a, b) {
  const pa = String(a || '').split('.').map((x) => parseInt(x, 10) || 0);
  const pb = String(b || '').split('.').map((x) => parseInt(x, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] || 0) - (pb[i] || 0);
    if (d) return d < 0 ? -1 : 1;
  }
  return 0;
}

// 진단 S1(routes/print-diagnostics.js master_gate)과 같은 식
function kitchenAutoOn(ps) {
  const kp = (ps && ps.kitchenPrinter) || {};
  const ws = Array.isArray(ps && ps.workstations) ? ps.workstations : [];
  return !!((kp.enabled && kp.autoPrint) || ws.some((w) => w && w.kitchenPrinter && w.kitchenPrinter.enabled && w.kitchenPrinter.autoPrint));
}

/**
 * 순수 판정 — 한 매장의 재료를 받아 발견 목록. (테스트가 DB 없이 부른다)
 * input: { ps, activeStations, failures:[{reason_code,intended_printer,n}], unprinted:{count,orders[]},
 *          autoDevices:[{label,platform,app_version}], appDevices:[{label,platform,app_version}], blocked:n }
 */
function judge(input) {
  const out = [];
  const gaps = findPrinterSetupGaps(input.ps, input.ps && input.ps.printerMode, input.activeStations || null);
  if (gaps.length) {
    out.push({ code: 'setup_gap', severity: 'critical', evidence: {
      basis: 'store_settings',
      kitchens: gaps.map((g) => (g.kind === 'station' ? g.name : 'Kitchen printer')),
    } });
  }
  const fails = (input.failures || []).reduce((s, f) => s + Number(f.n || 0), 0);
  if (fails > 0) {
    out.push({ code: 'print_failures', severity: fails >= 5 ? 'critical' : 'warn', evidence: {
      count: fails,
      top: (input.failures || []).slice(0, 5).map((f) => ({ reason: f.reason_code || '-', printer: f.intended_printer || '-', n: Number(f.n) })),
    } });
  }
  if (kitchenAutoOn(input.ps) && input.unprinted && input.unprinted.count > 0) {
    out.push({ code: 'unprinted_orders', severity: 'critical', evidence: {
      count: input.unprinted.count, orders: (input.unprinted.orders || []).slice(0, 5),
    } });
  }
  if ((input.autoDevices || []).length >= 2) {
    out.push({ code: 'multi_auto_print', severity: 'warn', evidence: {
      count: input.autoDevices.length,
      devices: input.autoDevices.slice(0, 8).map((d) => `${d.label || d.platform || '?'}${d.app_version ? ' ' + d.app_version : ''}`),
    } });
  }
  const old = (input.appDevices || []).filter((d) => MIN_APP_VERSION[d.platform] && d.app_version && cmpVersion(d.app_version, MIN_APP_VERSION[d.platform]) < 0);
  if (old.length) {
    out.push({ code: 'old_app', severity: 'warn', evidence: {
      devices: old.map((d) => `${d.label || d.platform} ${d.app_version}`), min: old.map((d) => MIN_APP_VERSION[d.platform])[0],
    } });
  }
  if (Number(input.blocked || 0) >= 3) {
    out.push({ code: 'settings_blocked', severity: 'info', evidence: { count: Number(input.blocked) } });
  }
  return out;
}

async function evaluate({ now = new Date(), restaurantIds = null } = {}) {
  const { Restaurant } = require('../models');
  const { sequelize } = require('../config/database');
  const q = (sql, replacements) => sequelize.query(sql, { replacements, type: QueryTypes.SELECT });
  const t = now.getTime();
  const d48 = new Date(t - 48 * H), d24 = new Date(t - 24 * H), d7 = new Date(t - 7 * 24 * H), m10 = new Date(t - 10 * 60 * 1000);

  let rids = restaurantIds;
  if (!rids) {
    const rows = await q(
      `SELECT DISTINCT restaurant_id AS rid FROM orders WHERE createdAt >= :d48 AND restaurant_id IS NOT NULL
       UNION SELECT DISTINCT restaurant_id FROM print_device_status WHERE last_report_at >= :d48`, { d48 });
    rids = rows.map((r) => r.rid).filter(Boolean);
  }
  if (!rids.length) return [];

  const restaurants = await Restaurant.findAll({ where: { id: { [Op.in]: rids } }, attributes: ['id', 'name', 'printer_settings', 'is_demo', 'is_test'] });
  const realRows = await q('SELECT id, is_real_customer FROM restaurants WHERE id IN (:rids)', { rids }).catch(() => []);
  const real = new Map(realRows.map((r) => [r.id, !!r.is_real_customer]));

  const stations = await q('SELECT id, restaurant_id, name FROM kitchen_stations WHERE restaurant_id IN (:rids) AND is_active = 1', { rids });
  const failures = await q(
    `SELECT restaurant_id, reason_code, intended_printer, COUNT(*) n FROM print_events
     WHERE restaurant_id IN (:rids) AND outcome IN ('failed','fallback') AND created_at >= :d24
     GROUP BY restaurant_id, reason_code, intended_printer ORDER BY n DESC`, { rids, d24 });
  const blocked = await q(
    `SELECT restaurant_id, COUNT(*) n FROM print_events WHERE restaurant_id IN (:rids)
     AND reason_code = 'settings_write_blocked' AND created_at >= :d24 GROUP BY restaurant_id`, { rids, d24 });
  const unprinted = await q(
    `SELECT restaurant_id, order_number FROM orders WHERE restaurant_id IN (:rids) AND needs_print = 1
     AND (is_deleted = 0 OR is_deleted IS NULL)
     AND COALESCE(print_needed_at, createdAt) BETWEEN :d24 AND :m10 ORDER BY createdAt DESC`, { rids, d24, m10 });
  const devices = await q(
    `SELECT restaurant_id, label, platform, app_version, is_auto_print, last_report_at FROM print_device_status
     WHERE restaurant_id IN (:rids) AND last_report_at >= :d7`, { rids, d7 });

  const by = (rows) => { const m = new Map(); for (const r of rows) { if (!m.has(r.restaurant_id)) m.set(r.restaurant_id, []); m.get(r.restaurant_id).push(r); } return m; };
  const st = by(stations), fl = by(failures), un = by(unprinted), dv = by(devices);
  const bl = new Map(blocked.map((r) => [r.restaurant_id, Number(r.n)]));

  return restaurants.map((r) => {
    const devs = dv.get(r.id) || [];
    const ups = un.get(r.id) || [];
    const findings = judge({
      ps: r.printer_settings || {},
      activeStations: st.get(r.id) || [],
      failures: fl.get(r.id) || [],
      unprinted: { count: ups.length, orders: ups.map((o) => o.order_number) },
      autoDevices: devs.filter((d) => d.is_auto_print && new Date(d.last_report_at) >= d24),
      appDevices: devs.filter((d) => /-app$/.test(d.platform || '')),
      blocked: bl.get(r.id) || 0,
    });
    const demo = real.has(r.id) ? !real.get(r.id) : !!(r.is_demo || r.is_test);
    return { restaurant_id: r.id, name: r.name, demo, findings };
  });
}

async function runWatch({ now = new Date(), restaurantIds = null, cleanup = true } = {}) {
  const { PrintWatchFinding, PrintEvent } = require('../models');
  const results = await evaluate({ now, restaurantIds });
  const stats = { restaurants: results.length, opened: 0, updated: 0, resolved: 0, cleaned_events: 0, cleaned_findings: 0 };
  for (const r of results) {
    const open = await PrintWatchFinding.findAll({ where: { restaurant_id: r.restaurant_id, status: 'open' } });
    const openByCode = new Map(open.map((f) => [f.code, f]));
    for (const f of r.findings) {
      const evidence = { ...f.evidence, name: r.name, demo: r.demo };
      const ex = openByCode.get(f.code);
      if (ex) {
        await ex.update({ severity: f.severity, evidence, last_seen_at: now, seen_count: ex.seen_count + 1 });
        openByCode.delete(f.code);
        stats.updated++;
      } else {
        await PrintWatchFinding.create({ restaurant_id: r.restaurant_id, code: f.code, severity: f.severity, status: 'open', evidence, first_seen_at: now, last_seen_at: now, seen_count: 1 });
        stats.opened++;
      }
    }
    for (const left of openByCode.values()) {
      await left.update({ status: 'resolved', resolved_at: now });
      stats.resolved++;
    }
  }
  if (cleanup) {
    stats.cleaned_events = await PrintEvent.destroy({ where: { created_at: { [Op.lt]: new Date(now.getTime() - 60 * 24 * H) } }, limit: 5000 }).catch(() => 0);
    stats.cleaned_findings = await PrintWatchFinding.destroy({ where: { status: 'resolved', resolved_at: { [Op.lt]: new Date(now.getTime() - 90 * 24 * H) } }, limit: 5000 }).catch(() => 0);
  }
  return stats;
}

module.exports = { evaluate, runWatch, judge, cmpVersion, kitchenAutoOn, MIN_APP_VERSION, RULE_CODES };
