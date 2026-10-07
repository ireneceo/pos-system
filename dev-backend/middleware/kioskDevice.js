/**
 * 키오스크 기기 인증 (선택적) — Fable 판정 .claude/fable-verdict-20261007-kiosk-payment-split.md D6.
 *
 * 헤더 `X-Kiosk-Token` 이 있으면 sha256 으로 등록 기기(kiosk_devices, active)를 찾아 req.kioskDevice 에 싣는다.
 *   - 헤더 없음 → 그냥 통과(익명 손님·직원 요청 그대로).
 *   - 헤더가 있는데 등록이 없거나 해제됨 → 401 KIOSK_REVOKED (기기가 토큰을 지우고 직원 로그인 화면으로 간다).
 * 이 미들웨어는 «누구인가» 만 정한다. 무엇을 허용할지는 각 라우트가 판단한다.
 * 붙이는 곳은 server.js 의 정확한 경로(app.use) — 🔒 orders-crud 파일 밖에서 주입한다.
 */
const crypto = require('crypto');
const { KioskDevice } = require('../models');

const hashToken = (token) => crypto.createHash('sha256').update(String(token)).digest('hex');

/**
 * 매장이 «키오스크 사용» 을 켰는가 — 설정 › Kiosk 스위치(mobile_settings.kiosk_enabled, 없으면 꺼짐).
 * 등록 기기의 주문·새 기기 등록이 이 한 판정을 쓴다(Fable 판정 2026-10-07 settings-entry D4).
 * @param restaurantOrSettings Restaurant 행 또는 mobile_settings 객체
 */
function isKioskEnabled(restaurantOrSettings) {
  if (!restaurantOrSettings) return false;
  let ms = restaurantOrSettings.mobile_settings !== undefined ? restaurantOrSettings.mobile_settings : restaurantOrSettings;
  if (typeof ms === 'string') { try { ms = JSON.parse(ms); } catch { ms = null; } }
  return !!(ms && ms.kiosk_enabled === true);
}
const SEEN_THROTTLE_MS = 60000;

async function authenticateKioskDevice(req, res, next) {
  const raw = req.get('X-Kiosk-Token');
  if (!raw) return next();
  try {
    const token = String(raw).trim();
    const row = token.length >= 32 && token.length <= 128
      ? await KioskDevice.findOne({ where: { token_hash: hashToken(token), status: 'active' } })
      : null;
    if (!row) {
      return res.status(401).json({ success: false, code: 'KIOSK_REVOKED', message: 'This kiosk is no longer registered' });
    }
    req.kioskDevice = {
      id: row.id, restaurant_id: row.restaurant_id, name: row.name,
      terminal_host: row.terminal_host || null, terminal_port: row.terminal_port || null,
    };
    const seen = row.last_seen_at ? new Date(row.last_seen_at).getTime() : 0;
    if (Date.now() - seen > SEEN_THROTTLE_MS) {
      KioskDevice.update({ last_seen_at: new Date() }, { where: { id: row.id }, silent: true }).catch(() => {});
    }
    return next();
  } catch (e) {
    console.error('kioskDevice auth error:', e.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

/**
 * 주문 생성(POST /api/orders) 앞 관문 — 출처 꼬리표를 서버가 정한다.
 *   - 등록 기기가 보낸 주문 → source='kiosk' 로 고정(자기 매장 주문만).
 *   - 토큰 없이 source='kiosk' 를 보냄 → 400 KIOSK_NOT_REGISTERED (폰이 키오스크인 척 못 한다).
 */
async function stampKioskOrderSource(req, res, next) {
  if (req.method !== 'POST' || (req.path !== '/' && req.path !== '')) return next();
  const body = req.body || {};
  if (req.kioskDevice) {
    const rid = body.restaurant_id ?? body.restaurantId;
    if (rid == null || Number(rid) !== Number(req.kioskDevice.restaurant_id)) {
      return res.status(403).json({ success: false, code: 'KIOSK_WRONG_RESTAURANT', message: 'This kiosk belongs to another restaurant' });
    }
    // 매장이 키오스크 사용을 껐으면 등록 기기라도 키오스크 주문을 받지 않는다(기기 등록은 그대로 — 다시 켜면 이어진다)
    try {
      const { Restaurant } = require('../models');
      const r = await Restaurant.findByPk(req.kioskDevice.restaurant_id, { attributes: ['id', 'mobile_settings'] });
      if (!isKioskEnabled(r)) return res.status(409).json({ success: false, code: 'KIOSK_DISABLED', message: 'Kiosk ordering is turned off for this restaurant' });
    } catch (e) {
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    body.source = 'kiosk';
    // 키오스크 카드 = 카드단말기. 단말기가 설정되지 않은 매장에서 카드 주문을 받으면 손님이 낼 방법이 없다.
    if (body.payment_method === 'card') {
      try {
        const cfg = await require('../services/terminalPayments').terminalConfig(req.kioskDevice.restaurant_id, req.kioskDevice);
        if (!cfg.enabled) return res.status(409).json({ success: false, code: 'TERMINAL_DISABLED', message: 'Card terminal is not set up for this kiosk' });
      } catch (e) {
        return res.status(e.status || 500).json({ success: false, message: e.status ? e.message : 'Internal server error' });
      }
    }
    return next();
  }
  if (String(body.source || '').toLowerCase() === 'kiosk') {
    return res.status(400).json({ success: false, code: 'KIOSK_NOT_REGISTERED', message: 'Kiosk orders require a registered kiosk device' });
  }
  return next();
}

module.exports = { authenticateKioskDevice, stampKioskOrderSource, hashToken, isKioskEnabled };
