/**
 * clientIp(req) — 손님의 실제 공인 주소. 출퇴근 «매장 네트워크» 검사 전용(설계 .claude/fable-design-20261016-staff-attendance.md §1-2).
 *
 * 경로: 손님 → Cloudflare → nginx(같은 서버) → 이 백엔드.
 *   ① 소켓 상대가 루프백이면 nginx 가 넘긴 것 — nginx 는 X-Real-IP 를 $remote_addr 로 **덮어쓴다**(손님이 꾸밀 수 없음).
 *      X-Real-IP 가 없으면 X-Forwarded-For 의 **마지막** 칸(nginx 가 붙인 $remote_addr)을 쓴다. 앞쪽 칸은 손님이 보낸 값이라 믿지 않는다.
 *      소켓 상대가 루프백이 아니면 프록시를 거치지 않은 직접 연결 — 헤더를 전부 무시하고 소켓 주소를 쓴다.
 *   ② 그 «바로 앞 상대» 가 Cloudflare 대역이면 CF-Connecting-IP(Cloudflare 가 덮어써 넣는 손님 주소)를 쓴다.
 *      Cloudflare 대역이 아닌 상대가 보낸 CF-Connecting-IP 는 무시한다(위조 차단).
 * req.ip 를 쓰지 않는 이유: trust proxy 1 이라 Cloudflare 를 거치면 Cloudflare 쪽 주소가 나온다.
 *
 * Cloudflare 대역 출처: https://www.cloudflare.com/ips-v4 · /ips-v6 (2026-10 확인). 대역이 바뀌면 이 표만 고친다.
 */
const net = require('net');

const CF_V4 = [
  '173.245.48.0/20', '103.21.244.0/22', '103.22.200.0/22', '103.31.4.0/22', '141.101.64.0/18',
  '108.162.192.0/18', '190.93.240.0/20', '188.114.96.0/20', '197.234.240.0/22', '198.41.128.0/17',
  '162.158.0.0/15', '104.16.0.0/13', '104.24.0.0/14', '172.64.0.0/13', '131.0.72.0/22',
];
const CF_V6 = [
  '2400:cb00::/32', '2606:4700::/32', '2803:f800::/32', '2405:b500::/32', '2405:8100::/32',
  '2a06:98c0::/29', '2c0f:f248::/32',
];

const cfList = new net.BlockList();
for (const c of CF_V4) { const [a, p] = c.split('/'); cfList.addSubnet(a, Number(p), 'ipv4'); }
for (const c of CF_V6) { const [a, p] = c.split('/'); cfList.addSubnet(a, Number(p), 'ipv6'); }

/** '::ffff:1.2.3.4' → '1.2.3.4', 앞뒤 공백·대괄호 제거, 유효하지 않으면 null */
function normalizeIp(raw) {
  if (raw == null) return null;
  let s = String(raw).trim().replace(/^\[|\]$/g, '');
  if (/^::ffff:\d+\.\d+\.\d+\.\d+$/i.test(s)) s = s.slice(7);
  const v = net.isIP(s);
  if (!v) return null;
  return v === 6 ? s.toLowerCase() : s;
}

function isCloudflare(ip) {
  const v = net.isIP(ip);
  if (!v) return false;
  return cfList.check(ip, v === 6 ? 'ipv6' : 'ipv4');
}

function isLoopback(ip) {
  return ip === '127.0.0.1' || ip === '::1' || /^127\./.test(ip || '');
}

/** 바로 앞 상대(= nginx 가 본 연결 주소, 또는 직접 연결 주소) */
function peerAddress(req) {
  const sock = normalizeIp(req.socket?.remoteAddress || req.connection?.remoteAddress);
  if (!isLoopback(sock)) return sock;
  const real = normalizeIp(req.get?.('X-Real-IP'));
  if (real) return real;
  const xff = String(req.get?.('X-Forwarded-For') || '').split(',').map(s => s.trim()).filter(Boolean);
  return normalizeIp(xff[xff.length - 1]) || sock;
}

function clientIp(req) {
  const peer = peerAddress(req);
  if (peer && isCloudflare(peer)) {
    const cf = normalizeIp(req.get?.('CF-Connecting-IP'));
    if (cf) return cf;
  }
  return peer;
}

module.exports = { clientIp, normalizeIp, isCloudflare, _peerAddress: peerAddress };
