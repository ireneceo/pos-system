/**
 * 출퇴근 «매장 네트워크» 판정 — 검사와 등록이 이 파일의 networkKey 하나를 쓴다
 * (설계 .claude/fable-design-20261016-staff-attendance.md §1-2 · §2-8, 메모리 [[feedback_check_and_fix_same_sql]]).
 *
 * 비교 단위:
 *   - IPv4: 주소 그대로(매장 라우터가 밖으로 나가는 공인 주소 1개를 폰들이 같이 씀).
 *   - IPv6: 앞 64비트(/64). IPv6 는 같은 와이파이라도 폰마다 뒤쪽 64비트가 다르고 수시로 바뀐다(개인정보 보호 주소).
 *     매장 회선 하나 = /64 하나. 그래서 주소 그대로 비교하면 같은 와이파이인데도 매번 막힌다.
 *     (사이트가 Cloudflare 로 IPv6 도 받는다 — 2026-10-16 dig AAAA 실측.)
 */
const net = require('net');
const { normalizeIp } = require('./clientIp');

function expandV6(ip) {
  // '2001:db8::1' → 8개 16비트 묶음 배열
  let [head, tail] = ip.split('::');
  const h = head ? head.split(':') : [];
  const t = tail !== undefined ? (tail ? tail.split(':') : []) : null;
  let parts = t === null ? h : [...h, ...Array(8 - h.length - t.length).fill('0'), ...t];
  // IPv4 꼬리('::ffff:1.2.3.4' 류)는 normalizeIp 가 이미 v4 로 바꿨다 — 남은 건 순수 v6
  return parts.map(p => parseInt(p || '0', 16));
}

/** 비교 키: v4 = 주소, v6 = 'xxxx:xxxx:xxxx:xxxx::/64'. 주소가 아니면 null */
function networkKey(raw) {
  const ip = normalizeIp(raw);
  if (!ip) return null;
  if (net.isIP(ip) === 4) return ip;
  const g = expandV6(ip);
  if (g.length !== 8 || g.some(n => Number.isNaN(n))) return null;
  return g.slice(0, 4).map(n => n.toString(16)).join(':') + '::/64';
}

/**
 * 매장 회선으로 쓸 수 있는 공인 주소인가 — 루프백·사설·링크로컬은 «매장 와이파이» 가 아니다.
 * 키오스크 자동 따라가기가 서버 안 시험 호출(127.0.0.1)까지 «Kiosk» 줄로 남기던 것(2026-10-16 Fable 비차단 지적) 막기.
 */
function isPublicKey(key) {
  if (!key) return false;
  if (net.isIP(key) === 4) {
    const [a, b] = key.split('.').map(Number);
    return !(a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127));
  }
  const first = parseInt(key.split(':')[0], 16);
  // ::/64(루프백 포함) · fc00::/7(사설) · fe80::/10(링크로컬)
  return !(first === 0 || (first & 0xfe00) === 0xfc00 || (first & 0xffc0) === 0xfe80);
}

/** 매장 설정(operation_settings.attendance) 기본값 — §2-7 */
const DEFAULT_SETTINGS = Object.freeze({
  network_restriction: false,
  allow_self_clock: true,
  allow_pos_pin_clock: true,
  open_session_flag_hours: 16,
  pin_override_registers_network: true,
});

function readSettings(operationSettings) {
  let os = operationSettings;
  if (typeof os === 'string') { try { os = JSON.parse(os); } catch { os = null; } }
  const a = (os && typeof os.attendance === 'object' && os.attendance) || {};
  return { ...DEFAULT_SETTINGS, ...a };
}

/** 이 주소가 등록된(활성) 매장 네트워크인가 → 맞으면 그 행 */
async function findMatchingNetwork(restaurantId, ip, transaction) {
  const { AttendanceNetwork } = require('../models');
  const key = networkKey(ip);
  if (!key) return null;
  return AttendanceNetwork.findOne({ where: { restaurant_id: restaurantId, ip: key, is_active: true }, transaction });
}

/**
 * 주소를 매장 네트워크로 등록(있으면 다시 켬). 같은 키는 한 줄(UNIQUE restaurant_id+ip).
 * 반환: 행
 */
async function registerNetwork(restaurantId, ip, { source = 'manual', label = null, userId = null, transaction } = {}) {
  const { AttendanceNetwork } = require('../models');
  const key = networkKey(ip);
  if (!key) return null;
  const existing = await AttendanceNetwork.findOne({ where: { restaurant_id: restaurantId, ip: key }, transaction });
  if (existing) {
    const patch = { is_active: true };
    if (label && !existing.label) patch.label = label;
    await existing.update(patch, { transaction });
    return existing;
  }
  try {
    return await AttendanceNetwork.create({
      restaurant_id: restaurantId, ip: key, source, label, registered_by: userId,
    }, { transaction });
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      return AttendanceNetwork.findOne({ where: { restaurant_id: restaurantId, ip: key }, transaction });
    }
    throw e;
  }
}

/**
 * 등록 키오스크가 서버에 닿을 때 — 그 매장의 kiosk_auto 행 하나가 키오스크 주소를 따라간다(§1-2 자동 복구).
 * 같은 주소가 이미 다른 출처로 등록돼 있으면 그대로 둔다. 실패해도 키오스크 흐름에는 영향 없음(호출부 catch).
 */
async function followKioskAddress(restaurantId, ip) {
  const { AttendanceNetwork } = require('../models');
  const key = networkKey(ip);
  if (!key || !isPublicKey(key)) return;
  const same = await AttendanceNetwork.findOne({ where: { restaurant_id: restaurantId, ip: key } });
  if (same) {
    if (!same.is_active && same.source === 'kiosk_auto') await same.update({ is_active: true });
    return;
  }
  const auto = await AttendanceNetwork.findOne({ where: { restaurant_id: restaurantId, source: 'kiosk_auto' }, order: [['id', 'ASC']] });
  if (auto) await auto.update({ ip: key, is_active: true });
  else await AttendanceNetwork.create({ restaurant_id: restaurantId, ip: key, source: 'kiosk_auto', label: 'Kiosk' });
}

module.exports = { networkKey, isPublicKey, readSettings, DEFAULT_SETTINGS, findMatchingNetwork, registerNetwork, followKioskAddress };
