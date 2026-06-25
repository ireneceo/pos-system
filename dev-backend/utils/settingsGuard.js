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
  'defaultPreparationTime', 'prepTimeTracking', 'defaultPreparationTimePerItem',
  'prepUrgentThreshold', 'taxEnabled', 'taxRate', 'serviceChargeEnabled',
  'serviceChargeRate', 'serviceChargeExcludeTakeaway', 'currency',
  'cashRounding', 'roundingApplyTo', 'pagerSystem', 'takeawayPricing',
  'deliveryPricing', 'loyaltyTiers', 'orderTypes', 'pickupSettings',
  'takeawaySettings', 'allowQuickOrder', 'breakTimes', 'mobileOrderProcessing',
  'mobileOrderAlerts', 'requirePaymentBeforeKitchen', 'checkout_display', 'orderSounds',
  // PIN 승인 게이트 — requirePinForDiscount 는 토글 UI 가 있었으나 화이트리스트 누락으로
  // 저장 시 조용히 stripped 되던 잠복 버그(2026-06-13 발견). requireVoidPin 과 함께 등록.
  'requirePinForDiscount', 'requireVoidPin', 'requireCancelReason',
  // 요일별 운영시간 + 라스트오더 게이트(JSON). 화이트리스트 누락 시 저장 round-trip 에서
  // 조용히 stripped → 5/31 The Fire 패턴 재발. businessHours 도 반드시 보존.
  'businessHours',
  // 발주 오너 승인 게이트(2026-06-21). 오너 연결 시 기본 ON. 화이트리스트 누락 시
  // 저장 round-trip 에서 조용히 stripped → 게이트 무력화. 반드시 보존.
  'requirePoOwnerApproval',
  // 개시 시재 모드(2026-06-23). { openingMode:'carryover'|'fixed', fixedAmount }.
  // 화이트리스트 누락 시 저장 round-trip 에서 조용히 stripped → 고정시재 설정 무력화. 반드시 보존.
  'cashFloat'
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

  // consolidatedOrderTicket — 전체 sub-object 보존 (kitchenPrinter 와 동일 패턴)
  if (existing.consolidatedOrderTicket && Object.keys(existing.consolidatedOrderTicket).length > 0) {
    if (!incoming.consolidatedOrderTicket || isEmptyObj(incoming.consolidatedOrderTicket)) {
      merged.consolidatedOrderTicket = existing.consolidatedOrderTicket;
      preserved.push('consolidatedOrderTicket');
    }
  }

  // workstations — 빈 배열로 박혀 와도 existing 보존
  const exWs = Array.isArray(existing.workstations) ? existing.workstations : [];
  const inWs = Array.isArray(incoming.workstations) ? incoming.workstations : null;
  if (exWs.length > 0 && (inWs === null || inWs.length === 0)) {
    merged.workstations = exWs;
    preserved.push('workstations');
  }

  // workstation 키 단위 보존 (2026-06-12) — 옛 번들/먼저 열어둔 설정 페이지가 자기 메모리의
  // stale workstations 를 통째로 echo 하면, 그 뒤에 저장된 새 키(consolidatedTicket /
  // consolidatedStations)가 last-write-wins 로 조용히 증발한다 (r24 통합티켓 범위 소실 실사고).
  // incoming workstation(id 매칭)에 키 자체가 없으면 existing 값을 보존. 의도적 해제는
  // 키가 항상 실려 오므로(consolidatedStations: []) 정상 저장된다.
  const wsAfter = Array.isArray(merged.workstations) ? merged.workstations : null;
  if (wsAfter && exWs.length > 0) {
    const exById = new Map(exWs.filter(w => w && w.id).map(w => [w.id, w]));
    let preservedWsKeys = false;
    merged.workstations = wsAfter.map(w => {
      if (!w || !w.id) return w;
      const ex = exById.get(w.id);
      if (!ex) return w;
      const out = { ...w };
      for (const key of ['consolidatedTicket', 'consolidatedStations']) {
        if (!(key in out) && (key in ex)) { out[key] = ex[key]; preservedWsKeys = true; }
      }
      return out;
    });
    if (preservedWsKeys) preserved.push('workstations(per-ws keys)');
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

  // 2026-06-25 (thefire kitchenPrinter wipe) — 미로드/기본값 저장 방어.
  // 설정 페이지가 프린터 설정을 DB 에서 다 불러오기 전에 무관한 AutoSaveField(결제 토글 등)가
  // 저장을 발동하면, 화면 초기 기본값(올-off kitchenPrinter + 빈 workstations + 빈 stations)이
  // 그대로 PUT 된다. 빈 workstations/stations 는 위에서 보존됐지만, "값은 있는데 전부 꺼진"
  // kitchenPrinter 는 비어있지 않아 통과 → 운영 주방 자동인쇄가 조용히 꺼졌다(2026-06-24 사고).
  // 신호: existing 에는 workstations/stations 가 있는데 incoming 은 둘 다 비어 있음 = 미로드 payload.
  // 이 경우 kitchenPrinter + billPrinter 도 기존값으로 보존한다. 정상 저장은 항상 workstations/
  // stations 를 실어 오므로(로드 완료 상태) 오탐 없음.
  const exHadWs = Array.isArray(existing.workstations) && existing.workstations.length > 0;
  const exHadStations = existing.kitchenStationPrinters && typeof existing.kitchenStationPrinters === 'object'
    && Object.keys(existing.kitchenStationPrinters).length > 0;
  const inWsEmpty = !Array.isArray(incoming.workstations) || incoming.workstations.length === 0;
  const inStationsEmpty = !incoming.kitchenStationPrinters || typeof incoming.kitchenStationPrinters !== 'object'
    || Object.keys(incoming.kitchenStationPrinters).length === 0;
  if ((exHadWs || exHadStations) && inWsEmpty && inStationsEmpty) {
    if (existing.kitchenPrinter && Object.keys(existing.kitchenPrinter).length > 0) {
      merged.kitchenPrinter = existing.kitchenPrinter;
      preserved.push('kitchenPrinter(unloaded-payload)');
    }
    if (existing.billPrinter && Object.keys(existing.billPrinter).length > 0) {
      merged.billPrinter = existing.billPrinter;
      preserved.push('billPrinter(unloaded-payload)');
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

// ── 결제수단 고정 카탈로그 (구조 = 모든 매장 동일, 값만 매장별) ──
// payment_settings 가 매장별 자유형 JSON 이라 (옛키 미마이그 payAtCounter→counter,
// wipe, 생성시점 기본값 차이) 구조가 어긋나던 문제 영구 차단. 읽을 때 정규화하면
// 신규 매장·미래 결제수단도 자동 일관. 값(enabled/config)은 매장 것 보존.
const PAYMENT_CATALOG = {
  cash:         { label: 'Cash', availableIn: ['pos'] },
  card:         { label: 'Card', availableIn: [], provider: '', config: { stripePublicKey: '', stripeSecretKey: '', paypalClientId: '', paypalClientSecret: '' } },
  ewallet:      { label: 'E-Wallet', availableIn: ['pos', 'mobile'], qrImage: '' },
  bankTransfer: { label: 'Bank Transfer', availableIn: [], bankName: '', accountNumber: '', accountName: '' },
  counter:      { label: 'Pay at Counter', availableIn: ['mobile'], allowed_order_types: ['dine-in', 'takeaway', 'pickup'] },
  online:       { label: 'Online Payment', availableIn: [], provider: '', config: { stripePublicKey: '', stripeSecretKey: '', paypalClientId: '', paypalClientSecret: '' } },
  staffMeal:    { label: 'Staff Meal', availableIn: ['pos'] }
};
const PAYMENT_ORDER = ['cash', 'card', 'ewallet', 'bankTransfer', 'counter', 'online', 'staffMeal'];

// 읽기 정규화: 옛 키 마이그 + 누락 결제수단 백필(disabled) + label 보장 + _order 고정.
// 값(enabled/config/qrImage 등)은 기존 매장 것 보존. 비파괴(응답용; DB 강제 변경 X).
function normalizePaymentSettings(raw) {
  let ps = parseJsonSafe(raw);
  if (!ps || typeof ps !== 'object') ps = {};
  ps = { ...ps };
  // 옛 키 마이그 (값 보존)
  if (ps.payAtCounter && !ps.counter) ps.counter = { ...ps.payAtCounter };
  delete ps.payAtCounter;
  if ((ps.qr || ps.qrPayment)) {
    const q = ps.qrPayment || ps.qr;
    if (!ps.ewallet) ps.ewallet = {};
    if (q && q.qrImage && !ps.ewallet.qrImage) ps.ewallet.qrImage = q.qrImage;
    delete ps.qr; delete ps.qrPayment;
  }
  if (ps.fpx) delete ps.fpx;
  const out = {};
  for (const k of PAYMENT_ORDER) {
    const def = { enabled: false, ...PAYMENT_CATALOG[k] };
    out[k] = { ...def, ...(ps[k] && typeof ps[k] === 'object' ? ps[k] : {}) };
    if (typeof out[k].label !== 'string' || !out[k].label) out[k].label = PAYMENT_CATALOG[k].label;
    if (!Array.isArray(out[k].availableIn)) out[k].availableIn = PAYMENT_CATALOG[k].availableIn;
  }
  out._order = PAYMENT_ORDER.slice();
  return out;
}

module.exports = {
  guardPrinterSettings,
  guardPaymentSettings,
  guardOperationSettings,
  guardShallowSettings,
  normalizePaymentSettings,
  PAYMENT_CATALOG,
  PAYMENT_ORDER,
  OPERATION_SETTINGS_ALLOWED_KEYS,
  // exposed for tests
  _internal: { parseJsonSafe, isEmptyObj }
};
