/**
 * routes/print-diagnostics.js — 인쇄 자가진단 & 원격 지원 (읽기전용 진단).
 *
 * 설계: docs/PRINT_SELF_DIAGNOSE_DESIGN.md.
 * 원칙: 인쇄 보호파일(billPrint/폴러/claim/orders-crud) 무접촉. 상태 READ + 서버 추론만.
 *   복구 액션은 기존 autoprint-diagnostic API 재사용(이 파일은 진단 계산·기기 레지스트리·fleet).
 *
 * 엔드포인트:
 *   GET  /api/print-diagnostics/restaurant/:restaurantId/checks   서버 체크 S1~S9(계산만)
 *   POST /api/print-diagnostics/device-report                     기기 스냅샷 upsert
 *   GET  /api/print-diagnostics/restaurant/:restaurantId/devices  기기 목록 + 폴러 관측
 *   GET  /api/print-diagnostics/fleet                             SA/BG 매장별 요약(원격뷰)
 */
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { authenticateToken, requireRole, checkRestaurantAccess } = require('../middleware/auth');
const { Restaurant, Order, PrintEvent, PrintDeviceStatus, KitchenStation, Brand } = require('../models');
const { sinceLastPoll } = require('../utils/pollerObserver');

// 진단 결과 모델(§2-3) — 클라/서버 공통. title/cause/guide 는 i18n 키(프론트가 t() 처리).
function chk(id, status, opts = {}) {
  return {
    id, scope: 'server', domain: 'print', status,
    severity: opts.severity || 'minor',
    title: opts.title || `diag.check.${id}.title`,
    cause: opts.cause || null,
    guide: opts.guide || [],
    fix: opts.fix || null,
    evidence: opts.evidence || {}
  };
}

const STUCK_MINUTES = 60;      // S3: 이만큼 오래 걸린 미인쇄 = 막힌 티켓
const UNPRINTED_STALE_SEC = 45; // S4: 이만큼 안 나간 needs_print = "지금 안 되고 있음"(print-events status 와 동일 기준)
const POLLER_DEAD_MS = 30000;  // S2: 마지막 폴 이후 이만큼 = 담당 기기 응답 없음
const DEVICE_STALE_MS = 5 * 60 * 1000; // S8: 리포트 신선도

// ─── GET /restaurant/:restaurantId/checks — 서버 체크 실행(저장 없음) ───
router.get('/restaurant/:restaurantId/checks', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const rid = parseInt(req.params.restaurantId, 10);
    const restaurant = await Restaurant.findByPk(rid);
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });

    const ps = restaurant.printer_settings || {};
    const checks = [];

    // S1 master_gate — 자동인쇄 켜진 기기가 설정상 존재하나
    const kp = ps.kitchenPrinter || {};
    const workstations = Array.isArray(ps.workstations) ? ps.workstations : [];
    const autoOn = (kp.enabled && kp.autoPrint) ||
      workstations.some(w => w?.kitchenPrinter?.enabled && w?.kitchenPrinter?.autoPrint);
    checks.push(chk('master_gate', autoOn ? 'pass' : 'fail', {
      severity: 'critical',
      cause: autoOn ? null : 'diag.check.master_gate.off',
      guide: autoOn ? [] : ['diag.check.master_gate.guide'],
      fix: autoOn ? null : { type: 'navigate', action: 'navigate_settings', label: 'diag.fix.open_printer_settings' },
      evidence: { kitchenAutoPrint: !!(kp.enabled && kp.autoPrint), workstationAutoPrint: workstations.length }
    }));

    // S2 poller_alive — 담당 기기가 pending-print 를 최근에 쳤나(관측 물증)
    const since = sinceLastPoll(rid);
    const pollerOk = since != null && since < POLLER_DEAD_MS;
    checks.push(chk('poller_alive', pollerOk ? 'pass' : (since == null ? 'unknown' : 'fail'), {
      severity: 'critical',
      cause: pollerOk ? null : (since == null ? 'diag.check.poller_alive.never' : 'diag.check.poller_alive.silent'),
      guide: pollerOk ? [] : ['diag.check.poller_alive.guide'],
      evidence: { sinceLastPollSec: since == null ? null : Math.round(since / 1000) }
    }));

    // S3 stuck_tickets — 오래된 미인쇄/미출력 적체
    const stuckSince = new Date(Date.now() - STUCK_MINUTES * 60 * 1000);
    const stuckCount = await Order.count({
      where: {
        restaurant_id: rid,
        [Op.or]: [{ needs_print: true }, { needs_bill: true }],
        updatedAt: { [Op.lt]: stuckSince }
      }
    });
    // 자동인쇄를 꺼두고 **수동으로 인쇄하는 매장**에서는 이 표시가 적체가 아니다.
    //   `needs_print` 는 주문이 생길 때 설정과 무관하게 켜지고, 끄는 것은 폴러가 인쇄를 집어갈 때뿐이다.
    //   즉 자동인쇄가 꺼져 있으면 아무도 끄지 않아 무한히 쌓인다 — 그건 고장이 아니라 운영 방식이다.
    //   S4(unprinted_now)는 이미 `master_off` 로 사유를 구분하는데 S3 만 몰라서, 수동 운영 매장에
    //   영구 "적체" 경고가 떴다(2026-08-30 Irene 지적 · 운영 실측 2,098건 · 세 매장 전부 autoPrint=false).
    //   ⚠ 자동인쇄가 **켜진** 매장의 진짜 적체는 그대로 warn 이어야 한다 — 그래서 autoOn 일 때만 경고한다.
    const stuckIsReal = autoOn && stuckCount > 0;
    checks.push(chk('stuck_tickets', stuckIsReal ? 'warn' : 'pass', {
      severity: 'major',
      cause: stuckIsReal ? 'diag.check.stuck_tickets.found' : null,
      guide: stuckIsReal ? ['diag.check.stuck_tickets.guide'] : [],
      fix: stuckIsReal ? { type: 'api', action: 'clear_stuck_flags', label: 'diag.fix.clear_stuck' } : null,
      evidence: { count: stuckCount, olderThanMin: STUCK_MINUTES,
                  // 꺼진 매장에서 왜 pass 인지 화면·로그에서 바로 읽히게 남긴다.
                  suppressed: !autoOn && stuckCount > 0 ? 'master_off' : undefined }
    }));

    // S4 unprinted_now — 지금 안 나가고 있는 신선 미인쇄(45초+) + 사유
    //   S3(60분 적체)와 달리 "방금부터 안 됨"을 잡는다. 사유는 print-events status 와 동일 규칙:
    //   마스터 꺼짐 > 최근 print_event reason > 죽은 claim > no_device.
    const unprintedCutoff = new Date(Date.now() - UNPRINTED_STALE_SEC * 1000);
    const unprintedCount = await Order.count({
      where: { restaurant_id: rid, is_deleted: false, needs_print: true, createdAt: { [Op.lt]: unprintedCutoff } }
    });
    let unprintedReason = 'no_device';
    if (unprintedCount > 0) {
      if (!autoOn) {
        unprintedReason = 'master_off';
      } else {
        // 최근 30분 내 이 매장의 마지막 실패/사유 이벤트로 힌트
        const lastEv = await PrintEvent.findOne({
          where: {
            restaurant_id: rid,
            created_at: { [Op.gt]: new Date(Date.now() - 30 * 60 * 1000) },
            reason_code: { [Op.ne]: null }
          },
          order: [['created_at', 'DESC']],
          attributes: ['reason_code']
        });
        if (lastEv?.reason_code) unprintedReason = lastEv.reason_code;
      }
    }
    // 사유별 cause 키(없는 코드는 generic 로 폴백 — i18n 에 정의된 것만)
    const KNOWN_REASONS = new Set(['master_off', 'no_device', 'dead_claim', 'qz_error', 'backlog', 'printer_unreachable_fallback']);
    const reasonKey = KNOWN_REASONS.has(unprintedReason) ? unprintedReason : 'generic';
    checks.push(chk('unprinted_now', unprintedCount > 0 ? 'fail' : 'pass', {
      severity: 'critical',
      cause: unprintedCount > 0 ? `diag.check.unprinted_now.${reasonKey}` : null,
      guide: unprintedCount > 0 ? ['diag.check.unprinted_now.guide'] : [],
      evidence: { count: unprintedCount, sinceSec: UNPRINTED_STALE_SEC, reasonCode: unprintedReason }
    }));

    // S5 station_drift — 스테이션 있는데 프린터 미지정
    const stations = await KitchenStation.findAll({ where: { restaurant_id: rid }, attributes: ['id', 'name'] });
    const stationPrinters = ps.kitchenStationPrinters || {};
    const unassigned = stations.filter(s => {
      const sp = stationPrinters[String(s.id)];
      return !sp || !(sp.name || sp.address);
    }).map(s => s.name);
    checks.push(chk('station_drift', unassigned.length > 0 ? 'warn' : (stations.length ? 'pass' : 'na'), {
      severity: 'major',
      cause: unassigned.length > 0 ? 'diag.check.station_drift.unassigned' : null,
      guide: unassigned.length > 0 ? ['diag.check.station_drift.guide'] : [],
      fix: unassigned.length > 0 ? { type: 'api', action: 'seed_station_configs', label: 'diag.fix.seed_stations' } : null,
      evidence: { stations: stations.length, unassigned }
    }));

    // S6 printer_config_sane — method↔address↔name 정합
    const sanity = [];
    const checkPrinter = (name, p) => {
      if (!p || !p.enabled) return;
      if (p.method === 'qztray' && !p.name && !p.address) sanity.push(`${name}: qztray인데 이름/주소 없음`);
      if (p.method === 'rawbt' && !p.name) { /* rawbt 기본프린터 허용 — 경고 아님 */ }
      if (p.address && /^\d{1,3}(\.\d{1,3}){3}$/.test(p.address) === false && /^\d/.test(p.address)) {
        sanity.push(`${name}: 주소 형식 이상(${p.address})`);
      }
    };
    checkPrinter('빌', ps.billPrinter); checkPrinter('주방', kp);
    checks.push(chk('printer_config_sane', sanity.length > 0 ? 'warn' : 'pass', {
      cause: sanity.length > 0 ? 'diag.check.printer_config_sane.issues' : null,
      evidence: { issues: sanity }
    }));

    // S7 recent_failures — 최근 24h 실패/fallback 집계
    const dayAgo = new Date(Date.now() - 24 * 3600 * 1000);
    const recentFail = await PrintEvent.count({
      where: { restaurant_id: rid, outcome: { [Op.in]: ['failed', 'fallback'] }, created_at: { [Op.gte]: dayAgo } }
    });
    checks.push(chk('recent_failures', recentFail > 0 ? 'warn' : 'pass', {
      cause: recentFail > 0 ? 'diag.check.recent_failures.count' : null,
      evidence: { count: recentFail, hours: 24 }
    }));

    // S8 device_reports_fresh — 자동인쇄 담당 기기가 최근 리포트했나
    const autoDevices = await PrintDeviceStatus.findAll({
      where: { restaurant_id: rid, is_auto_print: true },
      attributes: ['device_id', 'label', 'app_version', 'last_report_at', 'platform']
    });
    const freshAuto = autoDevices.filter(d => d.last_report_at && (Date.now() - new Date(d.last_report_at).getTime()) < DEVICE_STALE_MS);
    checks.push(chk('device_reports_fresh', autoDevices.length === 0 ? 'unknown' : (freshAuto.length > 0 ? 'pass' : 'warn'), {
      severity: 'major',
      cause: autoDevices.length === 0 ? 'diag.check.device_reports_fresh.none'
        : (freshAuto.length === 0 ? 'diag.check.device_reports_fresh.stale' : null),
      evidence: {
        autoDevices: autoDevices.map(d => ({
          label: d.label, platform: d.platform, appVersion: d.app_version,
          lastReportSec: d.last_report_at ? Math.round((Date.now() - new Date(d.last_report_at).getTime()) / 1000) : null
        }))
      }
    }));

    res.json({ success: true, data: { restaurant_id: rid, checks, generatedAt: new Date().toISOString() } });
  } catch (e) {
    console.error('[print-diagnostics] checks error:', e);
    res.status(500).json({ success: false, message: 'Failed to run checks' });
  }
});

// ─── POST /device-report — 기기 스냅샷 upsert (자기 매장 스코프) ───
router.post('/device-report', authenticateToken, async (req, res) => {
  try {
    // restaurant_id 는 오직 토큰 스코프로만 확정 — body 는 절대 신뢰하지 않는다.
    // 리포터(buildDeviceReport)는 restaurant_id 를 payload 에 넣지 않고, 매장 계정에서만
    // 발사된다. 따라서 매장 스코프 없는 계정(BG/FG/SA)의 device-report 는 거부한다.
    // (body.restaurant_id 폴백은 죽은 경로이자 크로스테넌트 쓰기 오염 공격면이었음 — Fable 적발)
    const rid = req.user.restaurant_id ? Number(req.user.restaurant_id) : null;
    if (!rid) return res.status(403).json({ success: false, message: 'Device reports require a restaurant-scoped account' });
    const b = req.body || {};
    if (!b.device_id) return res.status(400).json({ success: false, message: 'device_id required' });

    await PrintDeviceStatus.upsert({
      restaurant_id: rid,
      device_id: String(b.device_id).slice(0, 64),
      workstation_id: b.workstation_id ? String(b.workstation_id).slice(0, 64) : null,
      label: b.label ? String(b.label).slice(0, 120) : null,
      platform: b.platform ? String(b.platform).slice(0, 32) : null,
      app_version: b.app_version ? String(b.app_version).slice(0, 32) : null,
      printer_mode: b.printer_mode ? String(b.printer_mode).slice(0, 16) : null,
      is_auto_print: !!b.is_auto_print,
      qz_active: typeof b.qz_active === 'boolean' ? b.qz_active : null,
      snapshot: b.snapshot || null,
      last_report_at: new Date(),
      last_diag_at: b.is_diag ? new Date() : undefined
    });
    res.json({ success: true });
  } catch (e) {
    console.error('[print-diagnostics] device-report error:', e);
    res.status(500).json({ success: false, message: 'Failed to record device report' });
  }
});

// ─── GET /restaurant/:restaurantId/devices — 기기 목록 + 폴러 관측 ───
router.get('/restaurant/:restaurantId/devices', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const rid = parseInt(req.params.restaurantId, 10);
    const devices = await PrintDeviceStatus.findAll({
      where: { restaurant_id: rid },
      order: [['last_report_at', 'DESC']]
    });
    const since = sinceLastPoll(rid);
    res.json({
      success: true,
      data: {
        pollerSinceSec: since == null ? null : Math.round(since / 1000),
        devices: devices.map(d => ({
          device_id: d.device_id, label: d.label, platform: d.platform,
          app_version: d.app_version, printer_mode: d.printer_mode, is_auto_print: d.is_auto_print,
          qz_active: d.qz_active, snapshot: d.snapshot,
          last_report_at: d.last_report_at, last_diag_at: d.last_diag_at
        }))
      }
    });
  } catch (e) {
    console.error('[print-diagnostics] devices error:', e);
    res.status(500).json({ success: false, message: 'Failed to load devices' });
  }
});

// ─── GET /fleet — SA/BG 매장별 요약 (원격뷰) ───
router.get('/fleet', authenticateToken, requireRole('System Admin', 'Brand General'), async (req, res) => {
  try {
    // 범위: SA=전 매장 / BG=소유 브랜드 매장만 (서버측 필터 — IDOR 방지)
    const where = {};
    if (req.user.role === 'Brand General') {
      const brands = await Brand.findAll({ where: { owner_id: req.user.id }, attributes: ['id'] });
      const brandIds = brands.map(b => b.id);
      if (brandIds.length === 0) return res.json({ success: true, data: [] });
      where.brand_id = { [Op.in]: brandIds };
    }
    const restaurants = await Restaurant.findAll({ where, attributes: ['id', 'name', 'brand_id'] });
    const rids = restaurants.map(r => r.id);
    if (rids.length === 0) return res.json({ success: true, data: [] });

    // 매장별: 미인쇄(막힌) 수 · 담당기기 생존 · 마지막 리포트 · 최근24h 실패
    const dayAgo = new Date(Date.now() - 24 * 3600 * 1000);
    const rows = await Promise.all(restaurants.map(async (r) => {
      const rid = r.id;
      // 2026-07-23: pending-print 의 24h 신선도 경계와 같은 기준으로 센다. 경계 밖(하루 지난) 주문은
      // 애초에 자동인쇄 대상이 아니므로 "막힌 티켓"이 아니다. 무기한 raw 카운트로 두면 자동인쇄를 안 켠
      // 매장이 영구 critical 빨강으로 굳어 severity(284행 stuck>0=critical)가 신호 기능을 잃는다.
      const stuck = await Order.count({
        where: {
          restaurant_id: rid, is_deleted: false, createdAt: { [Op.gte]: dayAgo },
          [Op.or]: [{ needs_print: true }, { needs_bill: true }]
        }
      });
      const fails = await PrintEvent.count({
        where: { restaurant_id: rid, outcome: { [Op.in]: ['failed', 'fallback'] }, created_at: { [Op.gte]: dayAgo } }
      });
      const autoDev = await PrintDeviceStatus.findOne({
        where: { restaurant_id: rid, is_auto_print: true },
        order: [['last_report_at', 'DESC']],
        attributes: ['label', 'app_version', 'last_report_at']
      });
      const since = sinceLastPoll(rid);
      const lastReportSec = autoDev?.last_report_at ? Math.round((Date.now() - new Date(autoDev.last_report_at).getTime()) / 1000) : null;
      // 심각도: 폴러 죽음 or 막힌티켓 = 빨강 / 실패 or 리포트 오래됨 = 노랑 / else 초록
      let severity = 'ok';
      if ((since != null && since > POLLER_DEAD_MS) || stuck > 0) severity = 'critical';
      else if (fails > 0 || (lastReportSec != null && lastReportSec * 1000 > DEVICE_STALE_MS)) severity = 'warn';
      else if (since == null && !autoDev) severity = 'unknown';
      return {
        restaurant_id: rid, name: r.name, brand_id: r.brand_id,
        severity, stuck, recentFails: fails,
        pollerSinceSec: since == null ? null : Math.round(since / 1000),
        autoDevice: autoDev ? { label: autoDev.label, appVersion: autoDev.app_version, lastReportSec } : null
      };
    }));
    // 심각한 것 먼저
    const rank = { critical: 0, warn: 1, unknown: 2, ok: 3 };
    rows.sort((a, b) => (rank[a.severity] ?? 9) - (rank[b.severity] ?? 9));
    res.json({ success: true, data: rows });
  } catch (e) {
    console.error('[print-diagnostics] fleet error:', e);
    res.status(500).json({ success: false, message: 'Failed to load fleet' });
  }
});

module.exports = router;
