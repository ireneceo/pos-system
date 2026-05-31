/**
 * Settings anti-wipe guard — 두 라우트 (store.js, restaurants-crud.js) 공용 함수.
 *
 * 2026-05-31 The Fire 설정 소실 사고 영구 차단:
 *   - 5/31 사고 root cause: PUT /api/store/settings (store.js) 에 가드 0
 *   - restaurants-crud 의 기존 가드도 catch fall-through + 임계값 우회 빈틈 다수
 *
 * Defense in depth 원칙:
 *   1. null/undefined/{} payload — reject (existing 이 있을 때만; 신규 매장 첫 저장은 통과)
 *   2. parse error — reject (catch 후 save 금지)
 *   3. Deep merge with key whitelist — incoming 의 missing key 는 existing 보존
 *   4. Audit log — trigger 시 console.warn
 *
 * 반환값: { action, value, reason }
 *   - action='save'    : value 를 그대로 저장
 *   - action='merged'  : value (existing 의 missing key 보존된 merge 결과) 를 저장
 *   - action='reject'  : 저장 금지. 호출 측은 이 필드를 update 에서 제외
 */

const OPERATION_SETTINGS_ALLOWED_KEYS = new Set([
  'openingTime', 'closingTime', 'timeZone', 'orderNumberReset',
  'defaultPreparationTime', 'taxEnabled', 'taxRate', 'serviceChargeEnabled',
  'serviceChargeRate', 'serviceChargeExcludeTakeaway', 'currency',
  'cashRounding', 'roundingApplyTo', 'pagerSystem', 'takeawayPricing',
  'deliveryPricing', 'loyaltyTiers', 'orderTypes', 'pickupSettings',
  'takeawaySettings', 'allowQuickOrder', 'breakTimes', 'mobileOrderProcessing',
  'mobileOrderAlerts', 'requirePaymentBeforeKitchen', 'checkout_display'
]);

function parseJsonSafe(v) {
  if (v === null || v === undefined) return v;
  if (typeof v === 'object') return v;
  if (typeof v === 'string') {
    if (v.trim() === '') return undefined; // parse-error marker
    try { return JSON.parse(v); } catch { return undefined; }
  }
  return undefined;
}

function isEmptyObj(o) {
  return !o || (typeof o === 'object' && !Array.isArray(o) && Object.keys(o).length === 0);
}

function makeResult(action, value, reason) {
  return { action, value, reason };
}

function logAntiWipe(field, restaurantId, action, reason) {
  console.warn(`[anti-wipe] ${field} ${action} for restaurant ${restaurantId}: ${reason}`);
}

/** printer_settings */
function guardPrinterSettings(incomingRaw, existingRaw, restaurantId = '?') {
  const incoming = parseJsonSafe(incomingRaw);
  const existing = parseJsonSafe(existingRaw) || {};

  if (incoming === undefined) {
    logAntiWipe('printer_settings', restaurantId, 'reject', 'parse error');
    return makeResult('reject', undefined, 'parse error');
  }

  // 신규 매장 (existing 비어있음) — 첫 저장 허용 (incoming 이 null 이면 빈 객체로)
  if (isEmptyObj(existing)) {
    return makeResult('save', incoming || {}, 'first save (existing empty)');
  }

  if (incoming === null) {
    logAntiWipe('printer_settings', restaurantId, 'reject', 'null payload');
    return makeResult('reject', undefined, 'null payload');
  }

  if (isEmptyObj(incoming)) {
    logAntiWipe('printer_settings', restaurantId, 'reject', 'empty payload');
    return makeResult('reject', undefined, 'empty payload');
  }

  const merged = { ...incoming };
  const preserved = [];

  // billPrinter — address 비어 있고 existing 에 있으면 보존
  if (existing.billPrinter && existing.billPrinter.address) {
    if (!incoming.billPrinter || !incoming.billPrinter.address) {
      merged.billPrinter = existing.billPrinter;
      preserved.push('billPrinter');
    }
  }

  // kitchenPrinter — 전체 sub-object 보존
  if (existing.kitchenPrinter && Object.keys(existing.kitchenPrinter).length > 0) {
    if (!incoming.kitchenPrinter || isEmptyObj(incoming.kitchenPrinter)) {
      merged.kitchenPrinter = existing.kitchenPrinter;
      preserved.push('kitchenPrinter');
    }
  }

  // workstations — 빈 배열로 박혀 와도 existing 보존
  const exWs = Array.isArray(existing.workstations) ? existing.workstations : [];
  const inWs = Array.isArray(incoming.workstations) ? incoming.workstations : null;
  if (exWs.length > 0 && (inWs === null || inWs.length === 0)) {
    merged.workstations = exWs;
    preserved.push('workstations');
  }

  // kitchenStationPrinters — 전체 손실 / 부분 손실 모두 보존
  const exStations = (existing.kitchenStationPrinters && typeof existing.kitchenStationPrinters === 'object')
    ? existing.kitchenStationPrinters : {};
  const inStations = (incoming.kitchenStationPrinters && typeof incoming.kitchenStationPrinters === 'object')
    ? incoming.kitchenStationPrinters : null;
  const exStKeys = Object.keys(exStations);
  if (exStKeys.length > 0) {
    if (!inStations || Object.keys(inStations).length === 0) {
      merged.kitchenStationPrinters = exStations;
      preserved.push('kitchenStationPrinters(all)');
    } else if (Object.keys(inStations).length < exStKeys.length) {
      // 부분 손실 — missing station 만 existing 에서 보존
      const finalStations = { ...inStations };
      let restoredAny = false;
      for (const key of exStKeys) {
        if (!(key in finalStations) || finalStations[key] === null || finalStations[key] === undefined) {
          finalStations[key] = exStations[key];
          restoredAny = true;
        }
      }
      if (restoredAny) {
        merged.kitchenStationPrinters = finalStations;
        preserved.push('kitchenStationPrinters(partial)');
      }
    }
  }

  // receiptSettings — receiptLogo 빈 string + existing 에 값 있으면 보존
  if (existing.receiptSettings && existing.receiptSettings.receiptLogo) {
    const inRecv = incoming.receiptSettings || {};
    if (!inRecv.receiptLogo) {
      merged.receiptSettings = { ...inRecv, receiptLogo: existing.receiptSettings.receiptLogo };
      preserved.push('receiptSettings.receiptLogo');
    }
  }

  if (preserved.length > 0) {
    logAntiWipe('printer_settings', restaurantId, 'merged', `preserved ${preserved.join(', ')}`);
    return makeResult('merged', merged, `preserved ${preserved.join(', ')}`);
  }
  return makeResult('save', incoming, 'normal');
}

/** payment_settings */
function guardPaymentSettings(incomingRaw, existingRaw, restaurantId = '?') {
  const incoming = parseJsonSafe(incomingRaw);
  const existing = parseJsonSafe(existingRaw) || {};

  if (incoming === undefined) {
    logAntiWipe('payment_settings', restaurantId, 'reject', 'parse error');
    return makeResult('reject', undefined, 'parse error');
  }

  if (isEmptyObj(existing)) {
    return makeResult('save', incoming || {}, 'first save (existing empty)');
  }

  if (incoming === null) {
    logAntiWipe('payment_settings', restaurantId, 'reject', 'null payload');
    return makeResult('reject', undefined, 'null payload');
  }

  if (isEmptyObj(incoming)) {
    logAntiWipe('payment_settings', restaurantId, 'reject', 'empty payload');
    return makeResult('reject', undefined, 'empty payload');
  }

  const incomingKeys = Object.keys(incoming).filter(k => k !== '_order');
  const existingKeys = Object.keys(existing).filter(k => k !== '_order');

  // 모든 incoming method `enabled:false` 이고 existing 에 enabled true 있으면 reject
  const allDisabled = incomingKeys.length > 0 && incomingKeys.every(k => {
    const m = incoming[k];
    return m && typeof m === 'object' && m.enabled === false;
  });
  const existingHasEnabled = existingKeys.some(k => {
    const m = existing[k];
    return m && typeof m === 'object' && m.enabled === true;
  });
  if (allDisabled && existingHasEnabled) {
    logAntiWipe('payment_settings', restaurantId, 'reject', 'all incoming disabled while existing has enabled');
    return makeResult('reject', undefined, 'all incoming disabled while existing has enabled');
  }

  // 부분 손실 (existing 의 절반 미만) → reject
  if (existingKeys.length >= 2 && incomingKeys.length < existingKeys.length / 2) {
    logAntiWipe('payment_settings', restaurantId, 'reject', `incoming ${incomingKeys.length} < half of existing ${existingKeys.length}`);
    return makeResult('reject', undefined, `incoming ${incomingKeys.length} < half of existing ${existingKeys.length}`);
  }

  // Missing method 보존 — incoming 에 없는 method 는 existing 에서 가져옴
  const merged = { ...incoming };
  const preserved = [];
  for (const key of existingKeys) {
    if (!(key in merged)) {
      merged[key] = existing[key];
      preserved.push(key);
    }
  }
  // _order 도 incoming 에 없으면 existing 보존
  if (existing._order && !incoming._order) {
    merged._order = existing._order;
  }

  if (preserved.length > 0) {
    logAntiWipe('payment_settings', restaurantId, 'merged', `preserved methods: ${preserved.join(', ')}`);
    return makeResult('merged', merged, `preserved methods: ${preserved.join(', ')}`);
  }
  return makeResult('save', incoming, 'normal');
}

/** operation_settings (whitelist + merge) */
function filterByWhitelist(obj) {
  const filtered = {};
  for (const k of Object.keys(obj || {})) {
    if (OPERATION_SETTINGS_ALLOWED_KEYS.has(k)) filtered[k] = obj[k];
  }
  return filtered;
}

function guardOperationSettings(incomingRaw, existingRaw, restaurantId = '?') {
  const incoming = parseJsonSafe(incomingRaw);
  const existing = parseJsonSafe(existingRaw) || {};

  if (incoming === undefined) {
    logAntiWipe('operation_settings', restaurantId, 'reject', 'parse error');
    return makeResult('reject', undefined, 'parse error');
  }

  if (isEmptyObj(existing)) {
    if (incoming === null || isEmptyObj(incoming)) {
      return makeResult('save', {}, 'first save (existing+incoming both empty)');
    }
    return makeResult('save', filterByWhitelist(incoming), 'first save (existing empty)');
  }

  if (incoming === null) {
    logAntiWipe('operation_settings', restaurantId, 'reject', 'null payload');
    return makeResult('reject', undefined, 'null payload');
  }

  if (isEmptyObj(incoming)) {
    logAntiWipe('operation_settings', restaurantId, 'reject', 'empty payload');
    return makeResult('reject', undefined, 'empty payload');
  }

  const filtered = filterByWhitelist(incoming);
  if (isEmptyObj(filtered)) {
    logAntiWipe('operation_settings', restaurantId, 'reject', 'all keys filtered (none whitelisted)');
    return makeResult('reject', undefined, 'all keys filtered (none whitelisted)');
  }

  // Missing whitelisted key preservation
  const merged = { ...filtered };
  const preserved = [];
  for (const key of Object.keys(existing)) {
    if (OPERATION_SETTINGS_ALLOWED_KEYS.has(key) && !(key in merged)) {
      merged[key] = existing[key];
      preserved.push(key);
    }
  }

  if (preserved.length > 0) {
    logAntiWipe('operation_settings', restaurantId, 'merged', `preserved ${preserved.length} keys`);
    return makeResult('merged', merged, `preserved ${preserved.length} keys`);
  }
  return makeResult('save', filtered, 'normal');
}

/** shallow settings (table_settings / mobile_settings / reservation_settings) */
function guardShallowSettings(field, incomingRaw, existingRaw, restaurantId = '?') {
  const incoming = parseJsonSafe(incomingRaw);
  const existing = parseJsonSafe(existingRaw) || {};

  if (incoming === undefined) {
    logAntiWipe(field, restaurantId, 'reject', 'parse error');
    return makeResult('reject', undefined, 'parse error');
  }

  if (isEmptyObj(existing)) {
    return makeResult('save', incoming || {}, 'first save (existing empty)');
  }

  if (incoming === null) {
    logAntiWipe(field, restaurantId, 'reject', 'null payload');
    return makeResult('reject', undefined, 'null payload');
  }

  if (isEmptyObj(incoming)) {
    logAntiWipe(field, restaurantId, 'reject', 'empty payload');
    return makeResult('reject', undefined, 'empty payload');
  }

  // Shallow merge — existing 의 missing key 보존
  const merged = { ...existing, ...incoming };
  const missingKeys = Object.keys(existing).filter(k => !(k in incoming));

  if (missingKeys.length > 0) {
    logAntiWipe(field, restaurantId, 'merged', `preserved ${missingKeys.length} keys`);
    return makeResult('merged', merged, `preserved ${missingKeys.length} keys`);
  }
  return makeResult('save', incoming, 'normal');
}

module.exports = {
  guardPrinterSettings,
  guardPaymentSettings,
  guardOperationSettings,
  guardShallowSettings,
  OPERATION_SETTINGS_ALLOWED_KEYS,
  // exposed for tests
  _internal: { parseJsonSafe, isEmptyObj }
};
