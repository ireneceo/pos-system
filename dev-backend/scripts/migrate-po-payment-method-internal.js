// 발주 결제수단 «internal» = 직영 정산(결제 필요 없음) (2026-11-02 Fable 설계 direct-store-billing §1-3)
//
// Irene 원문: «with MIN Cafe는 GIT CONSULTING 브랜드제너럴이 운영하는 직영점이라서 납품한 금액들을 결제할 필요가
//             없거든. 그래도 금액이나 주문리스트업, 통계는 다 되어야 해.»
//
// 브랜드·푸드코트 결제조건이 INTERNAL 인 매장의 납품은 청구서를 처음부터 «결제됨(internal)» 으로 내고
// 발주도 같은 값으로 거울한다. 사람이 고르는 결제수단이 아니다(PAYMENT_METHODS 에 없음).
//
// ⛔ ENUM 은 expand-only — 내가 담당하는 값('internal')만 보장한다. 멱등.
// Usage: node scripts/migrate-po-payment-method-internal.js

const { sequelize } = require('../config/database');
const { expandEnum } = require('./lib/enumExpand');

(async () => {
  await expandEnum(sequelize, 'purchase_orders', 'payment_method', ['internal']);
  console.log('+ purchase_orders.payment_method 에 internal 보장');
  process.exit(0);
})().catch((e) => {
  console.error('migrate-po-payment-method-internal 실패:', e.message);
  process.exit(1);
});
