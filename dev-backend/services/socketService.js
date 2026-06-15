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

// 모니터 모드 토큰 채택률 로깅 — namespace 별 30초 throttle (로그 폭주 방지).
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
  return (socket, next) => {
    const token = (socket.handshake.auth && socket.handshake.auth.token) ||
                  socket.handshake.headers?.authorization?.replace(/^Bearer\s+/, '');
    if (token) {
      try {
        const d = jwt.verify(token, process.env.JWT_SECRET);
        socket.data.user = {
          id: d.userId || d.id, role: d.role, restaurant_id: d.restaurant_id,
          brand_id: d.brand_id, foodcourt_id: d.foodcourt_id
        };
        return next();
      } catch (err) {
        if (SOCKET_AUTH_ENFORCE) return next(new Error('auth: invalid token'));
        logTokenMonitor(nsName, 'invalid-token');
        return next();
      }
    }
    if (SOCKET_AUTH_ENFORCE) return next(new Error('auth: token missing'));
    logTokenMonitor(nsName, 'no-token');
    return next();
  };
}

// join-restaurant room 검증 — 인증 신원 기준. 허용 여부 boolean 반환.
// 강제 모드: 권한 없으면 false(=join 거부). 모니터 모드: 로깅만 하고 true(=동작 무변경).
async function canJoinRestaurant(socket, restaurantId, nsName) {
  const user = socket.data.user;
  if (!user) {
    // 토큰 없는 클라(모니터 모드에서만 도달) — 기존 동작 유지(허용).
    return !SOCKET_AUTH_ENFORCE;
  }
  let ok = false;
  try { ok = await userCanAccessRestaurant(user, restaurantId); } catch { ok = false; }
  if (!ok && !SOCKET_AUTH_ENFORCE) {
    logTokenMonitor(nsName, `cross-restaurant-join(user ${user.id}→r${restaurantId})`);
    return true; // 모니터: 거부 안 함
  }
  return ok;
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
      if (!(await canJoinRestaurant(socket, restaurantId, '/orders'))) return; // 강제 모드: 권한 없으면 join 거부
      socket.join(`restaurant_${restaurantId}`);
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

  // Kitchen namespace
  io.of('/kitchen').use(makeSocketAuth('/kitchen'));
  io.of('/kitchen').on('connection', (socket) => {
    socket.on('new-order', (order) => {
      io.of('/kitchen').emit('new-order', order);
    });

    socket.on('order-ready', (order) => {
      io.of('/display').emit('pickup-ready', order);
    });
  });

  // Display namespace
  io.of('/display').use(makeSocketAuth('/display'));
  io.of('/display').on('connection', (socket) => {
    socket.on('order-completed', (pickupNumber) => {
      io.of('/display').emit('pickup-completed', pickupNumber);
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
      if (!(await canJoinRestaurant(socket, restaurantId, '/checkout-display'))) return; // 강제 모드: 권한 없으면 거부
      const rid = String(restaurantId);
      socket.join(`restaurant_${rid}`);
      const cached = cartCache.get(rid);
      if (cached) {
        // Send a one-shot replay only to this newly-joined client.
        if (cached.cart) socket.emit('cart-update', cached.cart);
        if (cached.customer !== undefined) socket.emit('pos-customer-update', { customer: cached.customer });
      }
    });

    // POS에서 카트 업데이트 전송
    socket.on('cart-update', (data) => {
      if (data?.restaurantId) {
        const rid = String(data.restaurantId);
        const prev = cartCache.get(rid) || {};
        cartCache.set(rid, { ...prev, cart: data, ts: Date.now() });
      }
      // 같은 레스토랑의 checkout-display에만 전송
      socket.to(`restaurant_${data.restaurantId}`).emit('cart-update', data);
    });

    // POS에서 고객 체크인 수신 → POS로 전달
    socket.on('customer-checkin', (data) => {
      socket.to(`restaurant_${data.restaurantId}`).emit('customer-checkin', data);
    });

    // POS에서 결제 완료 — cart 종료 + 캐시 클리어
    socket.on('checkout-complete', (data) => {
      if (data?.restaurantId) cartCache.delete(String(data.restaurantId));
      socket.to(`restaurant_${data.restaurantId}`).emit('checkout-complete', data);
    });

    // Floor Plan 에서 테이블 선택 해제 → Customer Display 초기 화면으로 복귀
    socket.on('cart-clear', (data) => {
      if (data?.restaurantId) cartCache.delete(String(data.restaurantId));
      socket.to(`restaurant_${data.restaurantId}`).emit('cart-clear', data);
    });

    // POS 에서 회원 선택/해제 → Customer Display 에 회원 정보 표시
    // payload: { restaurantId, customer: { id, name, phone, loyaltyTier, points } | null }
    socket.on('pos-customer-update', (data) => {
      if (data?.restaurantId) {
        const rid = String(data.restaurantId);
        const prev = cartCache.get(rid) || {};
        cartCache.set(rid, { ...prev, customer: data.customer ?? null, ts: Date.now() });
      }
      socket.to(`restaurant_${data.restaurantId}`).emit('pos-customer-update', data);
    });
  });

  return io;
}

module.exports = { initSocketServer };