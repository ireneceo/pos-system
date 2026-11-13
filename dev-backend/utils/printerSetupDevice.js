/**
 * 프린터 설정 기기 — «매장 프린터 설정은 한 벌, 바꾸는 곳은 한 기기» (2026-11-10)
 *
 * 설계: .claude/fable-design-20261110-printer-settings-device-scope.md (Fable)
 * Irene «레스토랑 프린터 설정을 한 디바이스에서 다른 곳에서 안하게. 하려면 확인을 하고 바꾸게»
 *
 * - 매장 printer_settings 안 꼬리표 `setupDevice` = 그 매장의 «프린터 설정 기기».
 *   이 꼬리표는 전용 길(POST /api/store/printer-setup-device)로만 써진다. 설정 저장에 실려 온 값은 무시.
 * - 인쇄 경로(🔒 billPrint 등)는 이 칸을 읽지 않는다.
 * - 판정은 이 파일 하나 — routes/store.js PUT /settings 와 routes/restaurants-crud.js PUT /:id 가 같이 쓴다.
 * - `confirm` 은 화면의 실수 방지 표시일 뿐, 권한 경계가 아니다(권한은 역할 판정).
 */

const EDITOR_ROLES = new Set(['Restaurant Admin', 'System Admin']);
const DEVICE_KINDS = new Set(['android-app', 'windows-app', 'pc-browser', 'android-browser', 'ipad-browser']);

function canEditPrinterSettings(role) {
  return EDITOR_ROLES.has(role);
}

function parsePs(raw) {
  if (!raw) return {};
  if (typeof raw === 'object') return raw;
  try { return JSON.parse(raw) || {}; } catch { return {}; }
}

/** 요청 본문의 printer_device 를 다듬는다. 쓸 수 없는 값이면 null. */
function normalizeDevice(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const id = typeof raw.id === 'string' ? raw.id.trim().slice(0, 80) : '';
  if (!id || id === 'dev-ephemeral') return null;
  const kind = DEVICE_KINDS.has(raw.kind) ? raw.kind : 'pc-browser';
  const name = typeof raw.name === 'string' ? raw.name.trim().slice(0, 40) : '';
  return { id, kind, name, confirm: raw.confirm === true };
}

/**
 * 이 저장이 프린터 설정을 얼마나 쓸 수 있는가.
 * @returns {{ mode: 'full'|'emergency', reason: string, otherDevice?: object }}
 */
function resolvePrinterWrite({ role, device, existingPs }) {
  if (!canEditPrinterSettings(role)) return { mode: 'emergency', reason: 'role' };
  const ex = parsePs(existingPs);
  const tag = ex.setupDevice && typeof ex.setupDevice === 'object' && ex.setupDevice.id ? ex.setupDevice : null;
  if (!tag) return { mode: 'full', reason: 'no_setup_device' };
  const dev = normalizeDevice(device);
  if (!device) return { mode: 'full', reason: 'no_device_info' }; // 옛 번들 — §3-3 알고 두는 한계
  if (dev && dev.id === tag.id) return { mode: 'full', reason: 'setup_device' };
  if (device && device.confirm === true) return { mode: 'full', reason: 'other_device_confirmed', otherDevice: dev || { kind: 'pc-browser', name: '' } };
  return { mode: 'emergency', reason: 'other_device' };
}

/** 비상 모드 두 칸만 반영하고 나머지는 기존 값 그대로. (store.js 의 직원 분기를 그대로 옮김) */
function mergeEmergencyOnly(existingRaw, incomingRaw) {
  const existingPs = { ...parsePs(existingRaw) };
  const incomingPs = parsePs(incomingRaw);
  let changed = false;
  if (typeof incomingPs.emergencyMode === 'boolean' && incomingPs.emergencyMode !== existingPs.emergencyMode) {
    existingPs.emergencyMode = incomingPs.emergencyMode;
    existingPs.emergencyEnabledAt = incomingPs.emergencyMode
      ? (incomingPs.emergencyEnabledAt || new Date().toISOString())
      : null;
    changed = true;
  }
  return { value: existingPs, changed };
}

/** 저장 직전 — setupDevice 는 DB 값으로(없으면 지움). 설정 저장이 꼬리표를 바꾸거나 지우지 못하게. */
function keepSetupDevice(valueToSave, existingRaw) {
  if (!valueToSave || typeof valueToSave !== 'object') return valueToSave;
  const ex = parsePs(existingRaw);
  const out = { ...valueToSave };
  if (ex.setupDevice) out.setupDevice = ex.setupDevice;
  else delete out.setupDevice;
  return out;
}

/** 꼬리표를 뺀 프린터 설정 — «실제로 달라졌나» 비교용 */
function withoutTags(ps) {
  const o = { ...parsePs(ps) };
  delete o.setupDevice;
  return o;
}

function stableStringify(v) {
  if (v === null || typeof v !== 'object') return JSON.stringify(v);
  if (Array.isArray(v)) return '[' + v.map(stableStringify).join(',') + ']';
  return '{' + Object.keys(v).sort().map(k => JSON.stringify(k) + ':' + stableStringify(v[k])).join(',') + '}';
}

/** 비상 모드 두 칸을 뺀 프린터 설정 — 직원도 바꿀 수 있는 칸이라 «막힌 변경» 비교에서 뺀다 */
function withoutEmergency(ps) {
  const o = { ...parsePs(ps) };
  delete o.emergencyMode;
  delete o.emergencyEnabledAt;
  return o;
}

/**
 * «권한 없는 사람이 프린터 설정을 바꾸려다 막힘» 한 줄 — print_events (인쇄 지킴이 규칙 settings_blocked).
 * applyPrinterWrite 결과의 blockedChange 가 true 일 때 두 저장 라우트가 부른다. fire-and-forget · 실패는 삼킴.
 */
function recordBlockedPrinterChange(user, restaurantId) {
  try {
    const rid = parseInt(restaurantId, 10);
    if (!rid) return;
    const { PrintEvent } = require('../models');
    Promise.resolve().then(() => PrintEvent.create({
      restaurant_id: rid, outcome: 'skipped', reason_code: 'settings_write_blocked',
      reason_detail: `uid=${(user && (user.id ?? user.userId)) ?? '-'} role=${(user && user.role) || '-'}`,
    })).catch((e) => console.warn('[printer-scope] blocked record failed:', e && e.message));
  } catch (_) { /* 기록 실패는 저장에 닿지 않는다 */ }
}

function printerSettingsDiffer(a, b) {
  return stableStringify(withoutTags(a)) !== stableStringify(withoutTags(b));
}

/** 설정 기기가 아닌 곳에서 확인하고 바꾼 마지막 기록 — setupDevice.otherEdit (설계 §2-2) */
function makeOtherEdit(otherDevice, user) {
  return {
    kind: (otherDevice && otherDevice.kind) || 'pc-browser',
    name: (otherDevice && otherDevice.name) || '',
    at: new Date().toISOString(),
    byName: (user && (user.full_name || user.name || user.username || user.email)) || '',
  };
}

/**
 * 공용 적용 — 두 라우트가 이 순서 그대로 쓴다.
 * @returns {{ action: 'save'|'skip', value?: object, skipped?: string, reason: string }}
 */
function applyPrinterWrite({ user, body, existingRaw, guard, restaurantId }) {
  const decision = resolvePrinterWrite({ role: user && user.role, device: body.printer_device, existingPs: existingRaw });
  if (decision.mode === 'emergency') {
    const { value, changed } = mergeEmergencyOnly(existingRaw, body.printer_settings);
    const skipped = decision.reason === 'other_device' ? 'other_device' : undefined;
    // 인쇄 지킴이(2026-11-13 §2-2): 역할 때문에 막혔고, 비상 모드 말고 실제로 다른 값을 보냈을 때만 «막힌 변경»
    const blockedChange = decision.reason === 'role' && printerSettingsDiffer(withoutEmergency(body.printer_settings), withoutEmergency(existingRaw));
    if (!changed) return { action: 'skip', skipped, blockedChange, reason: decision.reason };
    return { action: 'save', value: keepSetupDevice(value, existingRaw), skipped, blockedChange, reason: decision.reason + '+emergency' };
  }
  if (decision.reason === 'no_device_info') {
    console.warn(`[printer-scope] no device info — restaurant ${restaurantId} role=${user && user.role} (old bundle?)`);
  }
  const r = guard(body.printer_settings, existingRaw, restaurantId);
  if (r.action === 'reject') return { action: 'skip', reason: 'guard:' + r.reason };
  let value = keepSetupDevice(r.value, existingRaw);
  if (decision.reason === 'other_device_confirmed' && value.setupDevice && printerSettingsDiffer(value, existingRaw)) {
    value = { ...value, setupDevice: { ...value.setupDevice, otherEdit: makeOtherEdit(decision.otherDevice, user) } };
  }
  return { action: 'save', value, reason: decision.reason };
}

/** 없는 스테이션 칸만 기본값으로 더한다. 있는 칸은 건드리지 않음. */
function seedMissingStations(existingRaw, stations) {
  const ps = { ...parsePs(existingRaw) };
  const cur = { ...(ps.kitchenStationPrinters && typeof ps.kitchenStationPrinters === 'object' ? ps.kitchenStationPrinters : {}) };
  let added = 0;
  (stations || []).forEach((s) => {
    if (!s || s.id == null) return;
    if (cur[s.id]) return;
    cur[s.id] = { name: '', autoPrint: true, address: '', method: 'qztray', stationName: s.name || '' };
    added += 1;
  });
  if (added > 0) ps.kitchenStationPrinters = cur;
  return { value: ps, added };
}

/** 이 기기를 설정 기기로 */
function makeSetupDevice(device, user) {
  return {
    id: device.id,
    kind: device.kind,
    name: device.name,
    at: new Date().toISOString(),
    byId: user ? user.id : null,
    byName: (user && (user.full_name || user.name || user.username || user.email)) || '',
  };
}

module.exports = {
  canEditPrinterSettings,
  normalizeDevice,
  resolvePrinterWrite,
  mergeEmergencyOnly,
  keepSetupDevice,
  printerSettingsDiffer,
  applyPrinterWrite,
  recordBlockedPrinterChange,
  seedMissingStations,
  makeSetupDevice,
  parsePs,
};
