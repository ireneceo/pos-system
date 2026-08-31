/**
 * orderNotificationService — 새 주문 푸시 알림 (`order_new`)
 *
 * 배경 (2026-08-31, Irene: "주문 받으면 관리하는 것 때문에"):
 *   `routes/notification-settings.js` 의 NOTIFICATION_CATEGORIES 에는 `order_new` 가
 *   `push_only: true` 로 **정의만** 돼 있고 발신 코드가 저장소에 0곳이었다.
 *   설정 화면에는 토글이 보이는데 켜도 평생 아무것도 오지 않는 **죽은 토글**이었다.
 *   푸시 기반시설(web-push · pushService · PushSubscription · routes/push)은 이미 완비돼 있었고
 *   실제로 쓰는 곳은 예약 3종(reservationNotificationService)뿐이었다.
 *
 * 🔒 왜 라우트가 아니라 모델 훅에서 부르는가 (중요):
 *   주문 생성 이벤트는 두 곳에서 난다 — `routes/orders-crud.js:997`(POS) · `routes/mobile-orders.js:527`(모바일).
 *   그런데 **orders-crud.js 는 인쇄 보호파일 8개 중 하나**다. CLAUDE.md 절대규칙:
 *   "다른 기능 작업 중 인쇄 코드를 절대 같이 건드리지 않는다. 인쇄 무관한 작업이면 열지도 말 것."
 *   그래서 인쇄 생명선을 건드리지 않고 **주문이 저장되는 한 지점**(Order afterCreate)에 붙였다.
 *   부수효과: POS·모바일뿐 아니라 앞으로 생길 생성 경로까지 자동으로 덮인다.
 *
 * 🔒 주문 생성 경로를 절대 방해하지 않는다:
 *   - 트랜잭션이 있으면 **afterCommit** 에서만 발화한다 → 롤백된 주문으로 알림이 나가지 않는다.
 *   - 훅은 await 하지 않는다(fire-and-forget) → 푸시 지연이 주문 응답을 늦추지 않는다.
 *   - 모든 오류를 삼킨다 → 알림 실패가 주문 실패로 번지지 않는다.
 *
 * 수신자·게이트는 pushService 가 담당한다:
 *   `sendPushToRestaurant` = 그 매장 `role IN ('Restaurant Admin','Staff') AND push_enabled=1`,
 *   개인 카테고리 설정(`notification_preferences.order_new === false`) 존중, `push_muted_hours` 존중.
 *   구독한 기기가 없으면 조용히 no-op(`no_subscription`) — 기기마다 브라우저 알림 허용 1회 필요.
 */

const pushService = require('./pushService');

/** 표시용 주문 라벨 — 테이블/포장 등 주문 성격이 한눈에 보이게. */
function describeOrder(order) {
  const parts = [];
  if (order.table_number) parts.push(`Table ${order.table_number}`);
  else if (order.order_type) parts.push(String(order.order_type).replace(/_/g, ' '));
  const amount = Number(order.total_amount);
  if (Number.isFinite(amount) && amount > 0) parts.push(amount.toFixed(2));
  return parts.join(' · ');
}

/**
 * 새 주문 1건을 그 매장 관리자·직원 기기에 푸시.
 * 실패해도 절대 던지지 않는다(호출부는 주문 생성 경로다).
 */
async function fireNewOrderNotification(order) {
  try {
    if (!order || !order.restaurant_id) return;
    // 소프트 삭제·취소 상태로 생성된 행(복구/이관 등)은 알리지 않는다.
    if (order.is_deleted === true || order.is_deleted === 1) return;
    if (order.status === 'cancelled') return;

    const label = describeOrder(order);
    await pushService.sendPushToRestaurant(order.restaurant_id, {
      title: 'New Order',
      body: [order.order_number ? `#${order.order_number}` : null, label].filter(Boolean).join(' · ') || 'New order received',
      category: 'order_new',
      data: { type: 'order_new', order_id: order.id, url: `/restaurant/${order.restaurant_id}/live-orders` }
    });
  } catch (e) {
    console.error('[orderNotification] new order push failed:', e && e.message);
  }
}

/**
 * Order 모델에 afterCreate 훅을 건다. server.js 부팅 시 1회 호출.
 * 멱등 — 두 번 불러도 훅이 중복 등록되지 않는다(중복 등록 = 알림 2번).
 */
let installed = false;
function installOrderHooks(Order) {
  if (installed || !Order || typeof Order.addHook !== 'function') return false;
  installed = true;

  Order.addHook('afterCreate', (order, options) => {
    // 절대 await 하지 않는다 — 주문 생성 응답을 푸시가 붙잡으면 안 된다.
    const fire = () => { fireNewOrderNotification(order); };
    try {
      // 트랜잭션 안이면 커밋된 뒤에만. 롤백되면 발화하지 않는다.
      if (options && options.transaction && typeof options.transaction.afterCommit === 'function') {
        options.transaction.afterCommit(fire);
      } else {
        fire();
      }
    } catch (e) {
      console.error('[orderNotification] hook install-time error:', e && e.message);
    }
  });
  return true;
}

module.exports = { fireNewOrderNotification, installOrderHooks, describeOrder };
