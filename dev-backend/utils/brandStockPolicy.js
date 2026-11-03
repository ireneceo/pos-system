'use strict';
/**
 * 브랜드 재고 설정 읽기 — brands.operation_settings.stock (2026-11-03 Fable 설계 .claude/fable-design-20261103-stock-foresight-phase2.md §4-2)
 *
 * 모양: { short_order_policy: 'warn'|'block', morning_alert: { enabled, hour }, include_soon_default }
 * 모르면 안전한 쪽(utils/salesAccess.js 와 같은 꼴):
 *   policy 모르면 'warn'(막지 않는다) · 아침 알림 모르면 켬 07시 · «곧 부족» 기본 포함 모르면 false.
 * DB 를 읽지 않는다 — 호출자가 operation_settings(객체 또는 JSON 문자열)를 넘긴다.
 */
const DEFAULTS = Object.freeze({
  short_order_policy: 'warn',
  morning_alert: Object.freeze({ enabled: true, hour: 7 }),
  include_soon_default: false,
});

function parse(os) {
  if (!os) return {};
  if (typeof os === 'string') { try { return JSON.parse(os) || {}; } catch { return {}; } }
  return os;
}

function stockSettingsOf(operationSettings) {
  const st = (parse(operationSettings).stock) || {};
  const ma = st.morning_alert || {};
  const hour = Number(ma.hour);
  return {
    short_order_policy: st.short_order_policy === 'block' ? 'block' : 'warn',
    morning_alert: {
      enabled: ma.enabled === false ? false : true,
      hour: Number.isInteger(hour) && hour >= 0 && hour <= 23 ? hour : DEFAULTS.morning_alert.hour,
    },
    include_soon_default: st.include_soon_default === true,
  };
}

function isBlockPolicy(operationSettings) {
  return stockSettingsOf(operationSettings).short_order_policy === 'block';
}

/** PUT 본문 검사 — 모르는 키는 버린다. 틀리면 Error(status 400). 반환 = 바꿀 칸만 */
function validateStockSettingsInput(b) {
  const err = (m) => Object.assign(new Error(m), { status: 400 });
  const next = {};
  if (!b || typeof b !== 'object') throw err('body is required');
  if (b.short_order_policy !== undefined) {
    if (!['warn', 'block'].includes(b.short_order_policy)) throw err('short_order_policy must be warn or block');
    next.short_order_policy = b.short_order_policy;
  }
  if (b.morning_alert !== undefined) {
    const ma = b.morning_alert || {};
    const out = {};
    if (ma.enabled !== undefined) {
      if (typeof ma.enabled !== 'boolean') throw err('morning_alert.enabled must be true or false');
      out.enabled = ma.enabled;
    }
    if (ma.hour !== undefined) {
      const h = Number(ma.hour);
      if (!Number.isInteger(h) || h < 0 || h > 23) throw err('morning_alert.hour must be 0–23');
      out.hour = h;
    }
    next.morning_alert = out;
  }
  if (b.include_soon_default !== undefined) {
    if (typeof b.include_soon_default !== 'boolean') throw err('include_soon_default must be true or false');
    next.include_soon_default = b.include_soon_default;
  }
  return next;
}

module.exports = { DEFAULTS, stockSettingsOf, isBlockPolicy, validateStockSettingsInput };
