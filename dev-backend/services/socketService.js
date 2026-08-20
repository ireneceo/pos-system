const socketIO = require('socket.io');
const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');
const jwt = require('jsonwebtoken');
const { userCanAccessRestaurant } = require('../middleware/auth');

// ────────────────────────────────────────────────────────────────────────────
// Socket Auth Hardening — Phase B (docs/SOCKET_AUTH_HARDENING.md §3)
// 라이브 주문 소켓(/orders·/checkout-display·/kitchen·/display)에 JWT 인증 + room 검증.
//
// 무중단 롤아웃: SOCKET_AUTH_ENFORCE 로 강제 시점을 제어.
//   - false(기본=모니터): 토큰 없어도 끊지 않음. 토큰 채택률만 로깅(매장이 Phase A
//     번들을 받았는지 실측). 인증 신원이 있으면 join 도 검증하되, 모니터 모드에선
//     거부 대신 로깅만 → **동작 무변경(회귀 0)**.
//   - true(강제): 토큰 없음/위조 → 연결 거부. join-restaurant/seller/buyer 를 인증
//     신원으로 검증, 불일치 시 join 거부. ← 실제 구멍이 막히는 단계.
// 매장 기기가 Phase A 토큰을 충분히 보내는 게 로그로 확인되면 env 만 켜고 재시작.
// ────────────────────────────────────────────────────────────────────────────
const SOCKET_AUTH_ENFORCE = process.env.SOCKET_AUTH_ENFORCE === 'true';

// ────────────────────────────────────────────────────────────────────────────
// 모니터 계측 (2026-06-16 강화) — 강제 전환 전 "매장이 토큰을 보내는지" 실데이터 수집.
// pm2 콘솔 로그는 휘발/누락이라 판단 불가했음 → 인메모리 영속 카운터 + 조회 엔드포인트.
// throttle 로그(폭주 방지)는 유지하되, 카운터는 throttle 없이 항상 누적.
//   GET /api/socket-auth-monitor (System Admin) 로 조회 → withToken vs withoutToken 비율 + 토큰없는 매장 목록.
// 카운터가 "withoutToken≈0 + 안정적 트래픽"이면 강제 전환 안전.
// ────────────────────────────────────────────────────────────────────────────
const socketAuthStats = {
  startedAt: new Date().toISOString(),
  byNs: {},                 // ns → { withToken, withoutToken, invalidToken, crossRestaurant }
  noTokenSources: {},       // origin/ua 힌트 → count (토큰 안 보내는 클라 식별)
  total: { withToken: 0, withoutToken: 0, invalidToken: 0, crossRestaurant: 0 }
};
function bump(ns, field, hint) {
  socketAuthStats.byNs[ns] = socketAuthStats.byNs[ns] || { withToken: 0, withoutToken: 0, invalidToken: 0, crossRestaurant: 0 };
  socketAuthStats.byNs[ns][field] = (socketAuthStats.byNs[ns][field] || 0) + 1;
  socketAuthStats.total[field] = (socketAuthStats.total[field] || 0) + 1;
  if (field === 'withoutToken' && hint) {
    socketAuthStats.noTokenSources[hint] = (socketAuthStats.noTokenSources[hint] || 0) + 1;
  }
}
function getSocketAuthStats() { return socketAuthStats; }

const _authMonitor = {};
function logTokenMonitor(ns, reason) {
  const key = ns + ':' + reason;
  const now = Date.now();
  _authMonitor[key] = _authMonitor[key] || { count: 0, last: 0 };
  _authMonitor[key].count++;
  if (now - _authMonitor[key].last > 30000) {
    console.warn(`[socket-auth][monitor] ${ns} ${reason} 핸드셰이크 ${_authMonitor[key].count}건 (강제 시 거부됨 — 매장 Phase A 미도달 신호)`);
    _authMonitor[key].last = now;
    _authMonitor[key].count = 0;
  }
}

// 소켓 핸드셰이크 JWT 검증 미들웨어. 토큰 유효 → socket.data.user 부착.
// 모니터 모드: 토큰 없음/위조여도 next()(허용). 강제 모드: 거부.
function makeSocketAuth(nsName) {
  return async (socket, next) => {
    const token = (socket.handshake.auth && socket.handshake.auth.token) ||
                  socket.handshake.headers?.authorization?.replace(/^Bearer\s+/, '');
    if (token) {
      try {
        const d = jwt.verify(token, process.env.JWT_SECRET);
        socket.data.user = {
          id: d.userId || d.id, role: d.role, restaurant_id: d.restaurant_id,
          brand_id: d.brand_id, foodcourt_id: d.foodcourt_id
        };

        // 컨텍스트("모자") 토큰 한정 재검증 — docs/MULTI_CONTEXT_LOGIN_DESIGN.md §4.4.
        //
        // 핸드셰이크는 claim 만 보므로, 모자가 회수돼도 그 토큰으로 새 연결+join 이 만료(≤24h)까지
        // 가능하다. RA 스칼라 경로는 DB 를 안 봐서 회수가 반영될 지점이 없다 → 여기서 1쿼리로 막는다.
        //
        // ⚠ ctx 없는 토큰(운영 중인 전 매장 함대)은 이 분기에 들어오지 않는다 = 기존 경로 무영향.
        // 그래서 신규 경로인 ctx 소켓만은 모니터/강제 모드와 무관하게 **무조건 거부**한다.
        if (d.ctx) {
          const { validateGrantedContext } = require('./userContexts');
          let ok = false;
          try {
            ok = await validateGrantedContext(socket.data.user.id, {
              entity_type: d.ctx.t, entity_id: d.ctx.id, role: d.ctx.r
            });
          } catch (e) {
            ok = false; // 판정 실패는 닫는다(fail-closed)
          }
          if (!ok) {
            bump(nsName, 'ctxRevoked');
            return next(new Error('auth: context revoked'));
          }
          socket.data.ctx = { t: d.ctx.t, id: String(d.ctx.id), r: d.ctx.r };
        }

        bump(nsName, 'withToken');
        return next();
      } catch (err) {
        bump(nsName, 'invalidToken');
        if (SOCKET_AUTH_ENFORCE) return next(new Error('auth: invalid token'));
        logTokenMonitor(nsName, 'invalid-token');
        return next();
      }
    }
    // 토큰 없는 연결 — 어디서 왔는지 힌트 수집(강제 시 끊길 클라 식별).
    const hint = (socket.handshake.headers?.origin || socket.handshake.headers?.referer || 'unknown');
    bump(nsName, 'withoutToken', hint);
    if (SOCKET_AUTH_ENFORCE) return next(new Error('auth: token missing'));
    logTokenMonitor(nsName, 'no-token');
    return next();
  };
}

// restaurantId 정규화 — 권한판정과 룸 이름이 같은 값을 봐야 한다.
// 2026-07-25 교훈: parseInt('3.8e1')===3 인데 MySQL 은 '3.8e1'→38 로 캐스팅해
// "게이트가 검사한 매장 ≠ 실제로 쓰인 매장" 이 됐다. 소켓도 같은 규칙(^\d+$)만 허용.
// 반환: 정규화된 문자열 또는 null(거부).
function normalizeRid(v) {
  const s = String(v ?? '').trim();
  return /^\d+$/.test(s) ? String(parseInt(s, 10)) : null;
}

// join-restaurant room 검증 — 인증 신원 기준. 허용 여부 boolean 반환.
// 강제 모드: 권한 없으면 false(=join 거부). 모니터 모드: 로깅만 하고 true(=동작 무변경).
async function canJoinRestaurant(socket, restaurantId, nsName) {
  const user = socket.data.user;
  if (!user) {
    // 토큰 없는 클라(모니터 모드에서만 도달) — 기존 동작 유지(허용).
    return !SOCKET_AUTH_ENFORCE;
  }
  // 모자를 쓴 소켓은 **그 매장 룸만** 허용한다(설계 §4.4). 투영 토큰이라 아래 판정도 통과하지만,
  // "한 번에 모자 하나" 원칙상 다른 룸으로 새는 경로를 여기서 닫는다. ctx 없는 소켓은 무영향.
  if (socket.data.ctx && String(restaurantId) !== socket.data.ctx.id) {
    bump(nsName, 'ctxRoomMismatch', `user${user.id}→r${restaurantId}`);
    return false;
  }

  let ok = false;
  try { ok = await userCanAccessRestaurant(user, restaurantId); } catch { ok = false; }
  if (!ok && !SOCKET_AUTH_ENFORCE) {
    bump(nsName, 'crossRestaurant', `user${user.id}→r${restaurantId}`);
    logTokenMonitor(nsName, `cross-restaurant-join(user ${user.id}→r${restaurantId})`);
    return true; // 모니터: 거부 안 함
  }
  return ok;
}

// ────────────────────────────────────────────────────────────────────────────
// emit 방향 room 검증 (2026-07-26 신설) — join 만 막아서는 부족했다.
//
// socket.to(room) 은 **그 룸에 가입했는지와 무관하게** 아무 룸에나 쏠 수 있다.
// 즉 join-restaurant 을 검증해도, payload 의 restaurantId 를 바꿔 보내면
// 타 매장 화면에 위조 카트 표시 / 강제 초기화 / 타 매장 진행 중 판매에 회원 붙이기
// (=로열티 적립)가 그대로 가능했다. join 과 동일 기준으로 emit 도 검증한다.
//
// 모드 의미는 join 과 동일 — 모니터: 로깅만(동작 무변경) / 강제: 드랍.
// 성능: cart-update 는 카트 변경마다 오므로 소켓별로 판정 결과를 메모(매장 1~2개).
// ────────────────────────────────────────────────────────────────────────────
async function canEmitToRestaurant(socket, restaurantId, nsName) {
  const rid = normalizeRid(restaurantId);
  if (!rid) return null;
  socket.data.ridAuth = socket.data.ridAuth || new Map();
  if (socket.data.ridAuth.has(rid)) return socket.data.ridAuth.get(rid) ? rid : null;
  const ok = await canJoinRestaurant(socket, rid, nsName);
  socket.data.ridAuth.set(rid, ok);
  return ok ? rid : null;
}

function initSocketServer(server) {
  // Configure Socket.IO with CORS
  const io = socketIO(server, {
    cors: {
      origin: [
        'https://orderhere.wor-pro.com',
        'https://purplehere.com',
        'https://dev.purplehere.com',
        'https://pos.orderhere.center',
        'https://solution.orderhere.center',
        'http://localhost:3001',
        'http://localhost:3000',
        /https:\/\/.*\.github\.dev$/,
        /https:\/\/.*\.app\.github\.dev$/
      ],
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  // Socket.IO configured with CORS

  // Setup Redis adapter for PM2 cluster mode
  const isPM2Cluster = process.env.pm_id !== undefined && process.env.exec_mode === 'cluster_mode';

  if (isPM2Cluster) {
    const pubClient = createClient({
      host: 'localhost',
      port: 6379,
      retry_strategy: (options) => {
        if (options.attempt > 10) {
          console.error('[Socket.IO] Redis connection failed after 10 attempts');
          return undefined;
        }
        return Math.min(options.attempt * 100, 3000);
      }
    });
    const subClient = pubClient.duplicate();

    Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
      io.adapter(createAdapter(pubClient, subClient));
    }).catch((err) => {
      console.error('[Socket.IO] Redis adapter connection failed:', err.message);
    });
  }

  // Connection error handling
  io.engine.on('connection_error', (err) => {
    console.error('[Socket.IO] Connection error:', err.message);
  });

  // Orders namespace for Live Orders page (Restaurant LiveOrders + Sprint 5 Live Sales Orders)
  io.of('/orders').use(makeSocketAuth('/orders'));
  io.of('/orders').on('connection', (socket) => {
    socket.on('join-restaurant', async (restaurantId) => {
      const rid = await canEmitToRestaurant(socket, restaurantId, '/orders'); // 강제 모드: 권한 없으면 join 거부
      if (!rid) return;
      socket.join(`restaurant_${rid}`);
    });

    // Sprint 5: Seller side (Supplier Admin / Brand General / Foodcourt General / System Admin)
    socket.on('join-seller', (payload) => {
      if (!payload || typeof payload !== 'object') return;
      const sellerType = String(payload.seller_type || '').toLowerCase();
      const sellerId = payload.seller_id != null ? parseInt(payload.seller_id, 10) : 0;
      if (!['supplier', 'brand', 'foodcourt', 'system_admin'].includes(sellerType)) return;
      // 강제 모드: 인증 신원과 seller 신원 일치 검증 (System Admin=전체 허용)
      if (SOCKET_AUTH_ENFORCE) {
        const u = socket.data.user;
        if (!u) return;
        if (u.role !== 'System Admin') {
          const idMatch =
            (sellerType === 'brand' && parseInt(u.brand_id) === sellerId) ||
            (sellerType === 'foodcourt' && parseInt(u.foodcourt_id) === sellerId) ||
            (sellerType === 'supplier'); // supplier 신원은 토큰에 없음 — 추후 강화(현재 supplier 룸은 민감도 낮음)
          if (!idMatch) return;
        }
      }
      socket.join(`seller_${sellerType}_${sellerId || 0}`);
    });

    // Sprint 5: Buyer side updates (PO status mirror)
    socket.on('join-buyer', async (payload) => {
      if (!payload || typeof payload !== 'object') return;
      const buyerType = String(payload.buyer_type || '').toLowerCase();
      const buyerId = payload.buyer_id != null ? parseInt(payload.buyer_id, 10) : 0;
      if (!['restaurant', 'brand', 'foodcourt'].includes(buyerType)) return;
      // 강제 모드: buyer 신원 검증 (restaurant 는 접근권한, brand/foodcourt 는 소유 id 일치)
      if (SOCKET_AUTH_ENFORCE) {
        const u = socket.data.user;
        if (!u) return;
        if (u.role !== 'System Admin') {
          let ok = false;
          if (buyerType === 'restaurant') { try { ok = await userCanAccessRestaurant(u, buyerId); } catch { ok = false; } }
          else if (buyerType === 'brand') ok = parseInt(u.brand_id) === buyerId;
          else if (buyerType === 'foodcourt') ok = parseInt(u.foodcourt_id) === buyerId;
          if (!ok) return;
        }
      }
      socket.join(`buyer_${buyerType}_${buyerId}`);
    });

    socket.on('error', (error) => {
      console.error('[Socket.IO] Error in /orders:', error.message);
    });
  });

  // Kitchen / Display namespace
  // ⚠️ 2026-07-26 실측: 이 두 네임스페이스는 **클라이언트가 0건**이다(웹 번들·데스크탑앱·
  // 안드로이드앱 전수 grep, 서버측 emit 도 이 파일 안에만 존재). KDS 는 /orders 를 쓴다.
  // 그런데 핸들러가 `io.of(ns).emit()` = **네임스페이스 전체 브로드캐스트**여서, 접속만 하면
  // 아무 매장 화면에나 가짜 주문·픽업 이벤트를 뿌릴 수 있는 크로스테넌트 릴레이였다.
  // 삭제 대신 다른 네임스페이스와 같은 규칙(join-restaurant + 룸 스코프)으로 통일 —
  // 지금은 클라이언트가 없어 동작 변화 0이고, 나중에 쓰더라도 테넌트 경계가 유지된다.
  io.of('/kitchen').use(makeSocketAuth('/kitchen'));
  io.of('/kitchen').on('connection', (socket) => {
    socket.on('join-restaurant', async (restaurantId) => {
      const rid = await canEmitToRestaurant(socket, restaurantId, '/kitchen');
      if (!rid) return;
      socket.data.joinedRid = rid;
      socket.join(`restaurant_${rid}`);
    });

    socket.on('new-order', async (order) => {
      const rid = await canEmitToRestaurant(socket, order?.restaurant_id ?? socket.data.joinedRid, '/kitchen');
      if (!rid) return;
      io.of('/kitchen').to(`restaurant_${rid}`).emit('new-order', order);
    });

    socket.on('order-ready', async (order) => {
      const rid = await canEmitToRestaurant(socket, order?.restaurant_id ?? socket.data.joinedRid, '/kitchen');
      if (!rid) return;
      io.of('/display').to(`restaurant_${rid}`).emit('pickup-ready', order);
    });
  });

  // Display namespace
  io.of('/display').use(makeSocketAuth('/display'));
  io.of('/display').on('connection', (socket) => {
    socket.on('join-restaurant', async (restaurantId) => {
      const rid = await canEmitToRestaurant(socket, restaurantId, '/display');
      if (!rid) return;
      socket.data.joinedRid = rid;
      socket.join(`restaurant_${rid}`);
    });

    socket.on('order-completed', async (pickupNumber, restaurantId) => {
      const rid = await canEmitToRestaurant(socket, restaurantId ?? socket.data.joinedRid, '/display');
      if (!rid) return;
      io.of('/display').to(`restaurant_${rid}`).emit('pickup-completed', pickupNumber);
    });
  });

  // ────────────────────────────────────────────────────────────────────────
  // Notifications namespace (v3.28+) — JWT-authenticated, scoped rooms.
  // Server pushes events here in parallel with web push for in-app toasters.
  // ────────────────────────────────────────────────────────────────────────
  const jwt = require('jsonwebtoken');
  io.of('/notifications').use((socket, next) => {
    try {
      const token = (socket.handshake.auth && socket.handshake.auth.token) ||
                    socket.handshake.headers?.authorization?.replace(/^Bearer\s+/, '');
      if (!token) return next(new Error('auth: token missing'));
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.data.user = decoded;
      next();
    } catch (err) {
      next(new Error('auth: invalid'));
    }
  });
  io.of('/notifications').on('connection', (socket) => {
    socket.on('join', (payload = {}) => {
      const auth = socket.data.user || {};
      // Trust ONLY the authenticated identity. Ignore any spoofed payload fields.
      const userId = auth.id;
      if (userId) socket.join(`user:${userId}`);
      if (auth.restaurant_id) socket.join(`restaurant:${auth.restaurant_id}`);
      if (auth.brand_id) socket.join(`brand:${auth.brand_id}`);
      if (auth.foodcourt_id) socket.join(`foodcourt:${auth.foodcourt_id}`);
      if (auth.supplier_company_id) socket.join(`supplier:${auth.supplier_company_id}`);
      if (auth.role === 'System Admin') socket.join('role:system_admin');
    });
    socket.on('error', (e) => console.error('[Socket.IO] /notifications error:', e?.message));
  });

  // Checkout Display namespace — POS → 고객 결제 화면
  // In-memory cart cache per restaurant. Customer Display can reconnect (PWA
  // refresh / network blip / monitor sleep) without losing the current bill —
  // we replay the last cart-update / pos-customer-update on join-restaurant.
  //
  // 2026-05-28: TTL 자동 evict 제거. 매장 보고 — 모니터 sleep 1시간 이상
  // → 깨움 → TTL 만료된 캐시 → CD blank. 명시적 trigger (cart-clear /
  // checkout-complete) 만 evict 하도록 변경. Memory bound: Map keyed by
  // restaurantId, 매장당 1 entry. 매장 100 곳 운영해도 메모리 미미.
  // backend 재시작 시는 캐시 사라지지만 그건 의도 — 매장 직원이 다시
  // 테이블 클릭하면 됨.
  const cartCache = new Map(); // restaurantId(string) → { cart, customer, ts }

  io.of('/checkout-display').use(makeSocketAuth('/checkout-display'));
  io.of('/checkout-display').on('connection', (socket) => {
    socket.on('join-restaurant', async (restaurantId) => {
      const rid = await canEmitToRestaurant(socket, restaurantId, '/checkout-display'); // 강제 모드: 권한 없으면 거부
      if (!rid) return;
      socket.join(`restaurant_${rid}`);
      const cached = cartCache.get(rid);
      if (cached) {
        // Send a one-shot replay only to this newly-joined client.
        if (cached.cart) socket.emit('cart-update', cached.cart);
        if (cached.customer !== undefined) socket.emit('pos-customer-update', { customer: cached.customer });
      }
    });

    // POS에서 카트 업데이트 전송
    socket.on('cart-update', async (data) => {
      const rid = await canEmitToRestaurant(socket, data?.restaurantId, '/checkout-display');
      if (!rid) return; // 강제 모드: 타 매장 위조 카트 드랍
      const prev = cartCache.get(rid) || {};
      cartCache.set(rid, { ...prev, cart: data, ts: Date.now() });
      // 같은 레스토랑의 checkout-display에만 전송
      socket.to(`restaurant_${rid}`).emit('cart-update', data);
    });

    // POS에서 고객 체크인 수신 → POS로 전달
    socket.on('customer-checkin', async (data) => {
      const rid = await canEmitToRestaurant(socket, data?.restaurantId, '/checkout-display');
      if (!rid) return; // 강제 모드: 타 매장 판매에 회원 붙이기(로열티 적립) 드랍
      socket.to(`restaurant_${rid}`).emit('customer-checkin', data);
    });

    // POS에서 결제 완료 — cart 종료 + 캐시 클리어
    socket.on('checkout-complete', async (data) => {
      const rid = await canEmitToRestaurant(socket, data?.restaurantId, '/checkout-display');
      if (!rid) return;
      cartCache.delete(rid);
      socket.to(`restaurant_${rid}`).emit('checkout-complete', data);
    });

    // Floor Plan 에서 테이블 선택 해제 → Customer Display 초기 화면으로 복귀
    socket.on('cart-clear', async (data) => {
      const rid = await canEmitToRestaurant(socket, data?.restaurantId, '/checkout-display');
      if (!rid) return; // 강제 모드: 타 매장 화면 강제 초기화 드랍
      cartCache.delete(rid);
      socket.to(`restaurant_${rid}`).emit('cart-clear', data);
    });

    // POS 에서 회원 선택/해제 → Customer Display 에 회원 정보 표시
    // payload: { restaurantId, customer: { id, name, phone, loyaltyTier, points } | null }
    socket.on('pos-customer-update', async (data) => {
      const rid = await canEmitToRestaurant(socket, data?.restaurantId, '/checkout-display');
      if (!rid) return;
      const prev = cartCache.get(rid) || {};
      cartCache.set(rid, { ...prev, customer: data.customer ?? null, ts: Date.now() });
      socket.to(`restaurant_${rid}`).emit('pos-customer-update', data);
    });
  });

  return io;
}

module.exports = { initSocketServer, getSocketAuthStats };