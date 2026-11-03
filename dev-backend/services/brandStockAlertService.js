'use strict';
/**
 * 아침 재고 알림(브랜드) — 2026-11-03 Fable 설계 .claude/fable-design-20261103-stock-foresight-phase2.md §5-4
 *
 * Irene: Q2 (a) 앱 알림+푸시만 — 조용하고 끄기 쉽다, 메일은 빼고 시작.
 *
 * 매 정각 runDue({ now }) — 브랜드마다:
 *   설정(brands.operation_settings.stock.morning_alert) 켜짐 · 브랜드 시간대로 설정 시각 이후 ·
 *   오늘(브랜드 시간대) 그 수신자에게 inventory_low 푸시 기록이 아직 없고 ·
 *   발주 전망(brandStockItemSuggestionsFor — 재고 화면 띠와 같은 답)의 품절+지금 발주 > 0 일 때만
 *   관리자 전원(getBrandManagerIds)에게 sendPushToUser(앱 안 토스트 + OS 푸시 + push_logs).
 *   알릴 게 없으면 조용(기록만). 메일 없음. 하루 1번 = push_logs 로 판정(새 표 없음).
 * 실행 기록 = SchedulerRun 'brand_stock_alert_hourly'. health-check 가 now 를 넣어 직접 부른다.
 */
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const { stockSettingsOf } = require('../utils/brandStockPolicy');
const { localParts } = require('../utils/poScheduleDates');

const CATEGORY = 'inventory_low';

/** tz 의 «오늘 00:00» 을 UTC Date 로 */
function startOfLocalDay(now, tz) {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'
  });
  const p = Object.fromEntries(fmt.formatToParts(now).map(x => [x.type, x.value]));
  const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute, +p.second);
  const offsetMs = asUtc - Math.floor(now.getTime() / 1000) * 1000;
  return new Date(Date.UTC(+p.year, +p.month - 1, +p.day) - offsetMs);
}

function namesOf(groups, status, max = 2) {
  const names = [];
  for (const g of groups || []) for (const it of g.items || []) if (it.status === status) names.push(it.ingredient && it.ingredient.name);
  const shown = names.filter(Boolean).slice(0, max);
  return shown.length ? shown.join(', ') + (names.length > max ? ` +${names.length - max}` : '') : '';
}

/**
 * @param {{ now?: Date, onlyBrandIds?: number[]|null }} opts
 */
async function runDue({ now = new Date(), onlyBrandIds = null } = {}) {
  const { SchedulerRun, PushLog } = require('../models');
  const started = Date.now();
  let runRow = null;
  try { runRow = await SchedulerRun.create({ job_name: 'brand_stock_alert_hourly', status: 'running', started_at: new Date() }); }
  catch (e) { console.error('[SchedulerRun] create failed:', e.message); }

  const results = { brands: 0, sent: 0, skipped_quiet: 0, skipped_done: 0, skipped_off: 0, skipped_early: 0, failed: 0, sample: [] };
  try {
    const where = onlyBrandIds ? 'AND id IN (:ids)' : '';
    const [brands] = await sequelize.query(
      `SELECT id, name, operation_settings FROM brands WHERE owner_id IS NOT NULL ${where} ORDER BY id`,
      { replacements: { ids: onlyBrandIds || [] } });
    const { brandStockItemSuggestionsFor } = require('../routes/purchase-orders-crud');
    const { getBrandManagerIds } = require('../utils/notificationService');
    const { sendPushToUser } = require('./pushService');

    for (const b of brands) {
      results.brands++;
      try {
        let os = {};
        try { os = (typeof b.operation_settings === 'string' ? JSON.parse(b.operation_settings) : b.operation_settings) || {}; } catch { os = {}; }
        const tz = os.timeZone || 'Asia/Kuala_Lumpur';
        const st = stockSettingsOf(os);
        if (!st.morning_alert.enabled) { results.skipped_off++; continue; }
        if (localParts(now, tz).hour < st.morning_alert.hour) { results.skipped_early++; continue; }

        const recipients = await getBrandManagerIds(b.id);
        if (!recipients.length) { results.skipped_quiet++; continue; }
        const since = startOfLocalDay(now, tz);
        const done = await PushLog.findAll({
          where: { user_id: recipients, category: CATEGORY, sent_at: { [Op.gte]: since } }, attributes: ['user_id']
        });
        const doneSet = new Set(done.map(d => Number(d.user_id)));
        const todo = recipients.filter(u => !doneSet.has(Number(u)));
        if (!todo.length) { results.skipped_done++; continue; }

        const data = await brandStockItemSuggestionsFor(b.id);
        const sm = data && data.summary;
        const out = sm ? sm.out : 0;
        const now_ = sm ? sm.order_now : 0;
        if (out + now_ <= 0) { results.skipped_quiet++; continue; }

        // 영어 고정 — 푸시 카테고리 알림이 전부 영어 고정(order_new 등 선례)
        const parts = [];
        if (out) parts.push(`${out} out`);
        if (now_) parts.push(`${now_} to order now`);
        const bodyParts = [namesOf(data.groups, 'out'), namesOf(data.groups, 'order_now')].filter(Boolean);
        const payload = {
          category: CATEGORY,
          title: `Stock outlook — ${parts.join(' · ')}`,
          body: bodyParts.join(' · ') || `${b.name}: check your stock`,
          url: '/pos/brand-inventory?tab=list&filter=fs_out',
          tag: CATEGORY,
          data: { brand_id: Number(b.id), out, order_now: now_ },
        };
        for (const uid of todo) {
          try { await sendPushToUser(uid, payload); results.sent++; }
          catch (e) { results.failed++; console.error(`[brandStockAlert] push user ${uid} failed:`, e.message); }
        }
        if (results.sample.length < 10) results.sample.push({ brand_id: Number(b.id), out, order_now: now_, users: todo.length });
      } catch (e) {
        results.failed++;
        console.error(`[brandStockAlert] brand ${b.id} error:`, e.message);
      }
    }
    if (runRow) await runRow.update({ finished_at: new Date(), duration_ms: Date.now() - started, status: results.failed ? 'partial' : 'success', results });
  } catch (error) {
    if (runRow) await runRow.update({ finished_at: new Date(), duration_ms: Date.now() - started, status: 'error', error_message: String(error?.message || error) });
    throw error;
  }
  return results;
}

module.exports = { runDue, startOfLocalDay, CATEGORY };
