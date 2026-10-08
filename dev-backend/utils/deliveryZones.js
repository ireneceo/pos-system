/**
 * 판매자 배송 지역 (2026-10-07 Fable 판정 `.claude/fable-verdict-20261007-seller-delivery-zones.md`)
 *
 * 판매자(브랜드·푸드코트·가입 공급업체)가 «배송 지역» 줄을 적는다: [{id, name, fee, states[], description?}].
 * 발주의 구매자 주소 주(州)로 시스템이 지역을 자동으로 고른다 — 구매자가 고르지 않는다(제일 싼 지역 선택 방지).
 * 지역에 안 맞거나 주를 모르면 판매자의 기본 배송비(delivery_fee)를 쓴다 — 주문을 막지 않는다.
 * 무료배송 기준은 판매자당 하나(min_order_amount). 계산은 여전히 purchaseOrderTotals.computeDeliveryFee 한 곳이고,
 * 여기는 «유효 배송비»를 정해 주는 전처리만 한다.
 *
 * 전부 순수 함수 — DB 를 읽지 않는다.
 *
 * 우편번호 앞 두 자리 → 주 표: 위키백과 «Postal codes in Malaysia»(Pos Malaysia 범위 정리) 2026-10-07 대조.
 *   KL 50000–60000 · Putrajaya 62300–62988 · Labuan 87000–87033 · Selangor 40000–48300·63000–68100 ·
 *   Terengganu 20000–24300 · Sarawak 93000–98859 · Sabah 88000–91309 · Kedah 05000–09810 · Kelantan 15000–18500 ·
 *   Negeri Sembilan 70000–73509 · Penang 10000–14400 · Johor 79000–86900 · Melaka 75000–78309 · Perlis 01000–02999 ·
 *   Perak 30000–36810 · Pahang 25000–28800·39000–39200·49000·69000.
 *   (경계 일부 — 예: 14xxx 일부 Kedah — 는 두 자리로 못 가른다. 주 칸이 있으면 주 칸이 우선이다.)
 */

// 정본 16개 — 저장·매칭·화면이 전부 이 name 문자열을 쓴다.
const MY_STATES = [
  'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Penang', 'Perak',
  'Perlis', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu', 'Kuala Lumpur', 'Labuan', 'Putrajaya',
].map(name => ({ code: name, name }));

const MAX_ZONES = 20;

/** 비교용 키: 대소문자·공백·마침표·쉼표·하이픈 무시 */
function placeKey(s) {
  return String(s || '').toLowerCase().replace(/[.\s,\-_/()]+/g, '');
}

const CANONICAL_BY_KEY = new Map(MY_STATES.map(s => [placeKey(s.name), s.name]));

// 별칭 → 정본. `WP`·`Wilayah Persekutuan` 단독은 모호(KL/푸트라자야/라부안)라 여기 없다 → 우편번호로 넘긴다.
const ALIASES = {
  'wpkualalumpur': 'Kuala Lumpur',
  'wilayahpersekutuankualalumpur': 'Kuala Lumpur',
  'federalterritoryofkualalumpur': 'Kuala Lumpur',
  'federalterritorykualalumpur': 'Kuala Lumpur',
  'kl': 'Kuala Lumpur',
  'pulaupinang': 'Penang',
  'pinang': 'Penang',
  'malacca': 'Melaka',
  'nsembilan': 'Negeri Sembilan',
  'ns': 'Negeri Sembilan',
  'wpputrajaya': 'Putrajaya',
  'wilayahpersekutuanputrajaya': 'Putrajaya',
  'federalterritoryofputrajaya': 'Putrajaya',
  'wplabuan': 'Labuan',
  'wilayahpersekutuanlabuan': 'Labuan',
  'federalterritoryoflabuan': 'Labuan',
};

function stateFromPostal(postal) {
  const digits = String(postal || '').replace(/\D/g, '');
  if (digits.length !== 5) return null;
  const p = parseInt(digits.slice(0, 2), 10);
  if (p >= 1 && p <= 2) return 'Perlis';
  if (p >= 5 && p <= 9) return 'Kedah';
  if (p >= 10 && p <= 14) return 'Penang';
  if (p >= 15 && p <= 18) return 'Kelantan';
  if (p >= 20 && p <= 24) return 'Terengganu';
  if ((p >= 25 && p <= 28) || p === 39 || p === 49 || p === 69) return 'Pahang';
  if (p >= 30 && p <= 36) return 'Perak';
  if ((p >= 40 && p <= 48) || (p >= 63 && p <= 68)) return 'Selangor';
  if (p >= 50 && p <= 60) return 'Kuala Lumpur';
  if (p === 62) return 'Putrajaya';
  if (p >= 70 && p <= 73) return 'Negeri Sembilan';
  if (p >= 75 && p <= 78) return 'Melaka';
  if (p >= 79 && p <= 86) return 'Johor';
  if (p === 87) return 'Labuan';
  if (p >= 88 && p <= 91) return 'Sabah';
  if (p >= 93 && p <= 98) return 'Sarawak';
  return null;
}

const isMY = (country) => !country || String(country).trim().toUpperCase() === 'MY' || placeKey(country) === 'malaysia';

/**
 * 구매자 주소 → 정본 주 이름.
 * @returns {{state: string|null, matched_by: 'state'|'postal_code'|null}}
 */
function normalizeState(raw, { postal_code = null, country = null } = {}) {
  const key = placeKey(raw);
  if (!isMY(country)) {
    // 말레이시아 밖: 별칭·우편번호 없이 글자 그대로(공백·대소문자 무시) 비교한다.
    return key ? { state: String(raw).trim(), matched_by: 'state' } : { state: null, matched_by: null };
  }
  if (key) {
    const canon = CANONICAL_BY_KEY.get(key) || ALIASES[key] || null;
    if (canon) return { state: canon, matched_by: 'state' };
  }
  const fromPostal = stateFromPostal(postal_code);
  if (fromPostal) return { state: fromPostal, matched_by: 'postal_code' };
  return { state: null, matched_by: null };
}

function sanitize(s) {
  try {
    const { sanitizeString } = require('../middleware/validation');
    if (typeof sanitizeString === 'function') return sanitizeString(String(s));
  } catch (_) { /* 순수 테스트 환경 */ }
  return String(s).replace(/[<>]/g, '');
}

function zoneError(code, message) {
  return { zones: null, error: { code, message } };
}

/**
 * 저장 라우트 3곳(브랜드·푸드코트·가입 공급업체)이 같은 규칙으로 쓴다.
 * @returns {{zones: Array|null, error: {code,message}|null}}  null/[] → zones null(지역 없음)
 */
function normalizeZonesForSave(input) {
  if (input === null || input === undefined || input === '') return { zones: null, error: null };
  if (!Array.isArray(input)) return zoneError('ZONES_NOT_ARRAY', 'delivery_zones must be an array');
  if (input.length === 0) return { zones: null, error: null };
  if (input.length > MAX_ZONES) return zoneError('ZONES_TOO_MANY', `At most ${MAX_ZONES} delivery zones`);

  const owner = new Map(); // state → zone name
  const out = [];
  const ts = Date.now();
  for (let i = 0; i < input.length; i++) {
    const z = input[i] || {};
    const name = sanitize(String(z.name || '').trim()).slice(0, 60).trim();
    if (!name) return zoneError('ZONE_NAME_REQUIRED', `Zone ${i + 1}: name is required`);
    if (z.fee === null || z.fee === undefined || z.fee === '') return zoneError('ZONE_FEE_REQUIRED', `Zone «${name}»: delivery fee is required`);
    const feeNum = Number(z.fee);
    if (!Number.isFinite(feeNum) || feeNum < 0) return zoneError('ZONE_FEE_INVALID', `Zone «${name}»: delivery fee must be 0 or more`);
    const fee = Math.round(feeNum * 100) / 100;
    if (!Array.isArray(z.states) || z.states.length === 0) return zoneError('ZONE_STATES_REQUIRED', `Zone «${name}»: choose at least one state`);
    const states = [];
    for (const s of z.states) {
      const canon = CANONICAL_BY_KEY.get(placeKey(s));
      if (!canon) return zoneError('ZONE_STATE_UNKNOWN', `Zone «${name}»: unknown state «${s}»`);
      if (states.includes(canon)) continue;
      if (owner.has(canon)) {
        return zoneError('ZONE_STATE_DUPLICATE', `${canon} is already in zone «${owner.get(canon)}»`);
      }
      owner.set(canon, name);
      states.push(canon);
    }
    const id = (typeof z.id === 'string' && /^[A-Za-z0-9_-]{1,40}$/.test(z.id)) ? z.id : `zone-${ts}-${i}`;
    const zone = { id, name, fee, states };
    const desc = z.description ? sanitize(String(z.description).trim()).slice(0, 200).trim() : '';
    if (desc) zone.description = desc;
    out.push(zone);
  }
  return { zones: out, error: null };
}

/**
 * 판매자 지역 목록 + 구매자 위치 → 고른 지역.
 * @param {Array|null} zones 판매자 delivery_zones
 * @param {{state, postal_code, country}|null} buyerLocation 구매자 주소 (null = 구매자를 모름)
 * @returns {{zone: {id,name,fee}|null, reason: 'no_zones'|'buyer_location_unknown'|'no_match'|null, buyer_state: string|null, matched_by: string|null}}
 */
function resolveDeliveryZone(zones, buyerLocation) {
  const list = Array.isArray(zones) ? zones.filter(z => z && Array.isArray(z.states)) : [];
  if (list.length === 0) return { zone: null, reason: 'no_zones', buyer_state: null, matched_by: null };
  const loc = buyerLocation || {};
  const { state, matched_by } = normalizeState(loc.state, { postal_code: loc.postal_code, country: loc.country });
  if (!state) return { zone: null, reason: 'buyer_location_unknown', buyer_state: null, matched_by: null };
  const key = placeKey(state);
  const hit = list.find(z => z.states.some(s => placeKey(s) === key));
  if (!hit) return { zone: null, reason: 'no_match', buyer_state: state, matched_by };
  const fee = Number(hit.fee);
  return {
    zone: { id: hit.id, name: hit.name, fee: Number.isFinite(fee) ? Math.round(fee * 100) / 100 : null },
    reason: null,
    buyer_state: state,
    matched_by,
  };
}

/** 저장값 → 지역 배열 또는 null. JSON 칸이 문자열로 오는 드라이버에도 견딘다. */
function readZones(v) {
  let z = v;
  if (typeof z === 'string') { try { z = JSON.parse(z); } catch (_) { return null; } }
  return Array.isArray(z) && z.length ? z : null;
}

/** 판매자 행 + 지역 판정 → computeDeliveryFee 에 넘길 유효 terms */
function effectiveDeliveryTerms(row, resolved) {
  if (resolved && resolved.zone && resolved.zone.fee !== null) {
    return { ...row, delivery_fee: resolved.zone.fee };
  }
  return row;
}

module.exports = {
  MY_STATES,
  MAX_ZONES,
  normalizeState,
  stateFromPostal,
  normalizeZonesForSave,
  resolveDeliveryZone,
  effectiveDeliveryTerms,
  readZones,
};
