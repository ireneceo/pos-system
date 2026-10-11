/**
 * 청구서 «결제 시작 가능» 판정 — 단일 소스 (2026-10-11 Fable 판정
 * backups/fable-pending/fable-verdict-20261011-stripe-invoice-payment-design.md F1)
 *
 * 전에는 결제 라우트마다 상태 검사를 따로 적었고, 그 목록이 `pending_payment|rejected` 였다.
 * 'rejected' 는 ENUM 에 없는 죽은 값이고(반려는 pending_payment 로 되돌린다), 'overdue' 가 빠져서
 * **연체된 청구서는 카드로도 이체 제출로도 낼 수 없었다** — 정지 매장이 스스로 복구할 길이 없었다.
 * 이제 카드(create-payment-intent · create-paypal-order · checkout/start)와 이체 제출(submit-payment)이
 * 이 파일의 목록 하나를 쓴다. 화면이 버튼을 숨겨도 서버가 다시 막는다(폭: 프론트 ≤ 서버).
 */
const { Brand, Foodcourt } = require('../models');
const { checkPaymentPermission } = require('../routes/invoices-helpers');
const { isExternalIssuer } = require('./externalIssuer');
const { payViaSoa } = require('./payViaSoa');

// 결제(카드·이체 제출)를 시작해도 되는 상태
const PAYABLE_STATUSES = ['pending_payment', 'overdue'];
// 게이트웨이가 확인한 입금으로 paid 로 바꿔도 되는 출발 상태 — 게이트웨이 입금이 «이체했다는 주장»보다 세다
const GATEWAY_PAID_FROM = ['pending_payment', 'overdue', 'payment_submitted'];

/**
 * 게이트웨이 결제를 시작해도 되는가. 통과면 null, 아니면 { status, body }.
 * 순서 고정: 404 → 403 → 409(paid) → 400 상태 → 400 외부 공급업체 → 400 월결제(SOA) → 400 0원.
 * 판정 함수는 기존 것을 그대로 쓴다(검사와 수정은 같은 조건).
 */
async function gatewayPayableError(invoice, user) {
  if (!invoice) {
    return { status: 404, body: { success: false, error: { message: 'Invoice not found', code: 'NOT_FOUND' } } };
  }
  if (!(await checkPaymentPermission(user, invoice))) {
    return { status: 403, body: { success: false, error: { message: 'Permission denied', code: 'FORBIDDEN' } } };
  }
  if (invoice.status === 'paid') {
    return { status: 409, body: { success: false, error: { message: 'Invoice already paid', code: 'ALREADY_PAID' } } };
  }
  if (!PAYABLE_STATUSES.includes(invoice.status)) {
    return { status: 400, body: { success: false, error: { message: `Cannot pay invoice with status: ${invoice.status}`, code: 'BAD_STATUS' } } };
  }
  if (await isExternalIssuer(invoice.issuer_type, invoice.issuer_id)) {
    return {
      status: 400,
      body: {
        success: false,
        code: 'EXTERNAL_ISSUER_NO_GATEWAY',
        message: '외부 공급업체 청구서는 이 솔루션에서 결제할 수 없습니다. 실제로 지불한 뒤 "결제함"으로 표시하세요.'
      }
    };
  }
  if (await payViaSoa(invoice)) {
    return {
      status: 400,
      body: { success: false, code: 'pay_via_soa', message: 'This invoice is billed monthly. Pay it through the Statement of Account (SOA).' }
    };
  }
  if (!(Number(invoice.total_amount) > 0)) {
    return { status: 400, body: { success: false, error: { message: 'Invoice total must be > 0', code: 'ZERO_AMOUNT' } } };
  }
  return null;
}

/**
 * 청구서의 지불자를 Stripe Customer 라벨용 당사자로 바꾼다. 못 찾으면 null.
 * restaurant → restaurant · brand_manager → 그 사람이 주인인 브랜드 · foodcourt_manager → 같은 식
 * · restaurant_owner → 청구서에 매장이 있으면 그 매장.
 */
async function resolvePayerParty(invoice) {
  if (!invoice) return null;
  const pt = invoice.payer_type;
  if (pt === 'restaurant' || (!pt && invoice.restaurant_id)) {
    const id = Number(invoice.restaurant_id || invoice.payer_id);
    return id ? { payer_type: 'restaurant', payer_id: id } : null;
  }
  if (pt === 'brand_manager' && invoice.payer_id) {
    const b = await Brand.findOne({ where: { owner_id: invoice.payer_id }, attributes: ['id'], order: [['id', 'ASC']] });
    return b ? { payer_type: 'brand', payer_id: b.id } : null;
  }
  if (pt === 'foodcourt_manager' && invoice.payer_id) {
    const f = await Foodcourt.findOne({ where: { owner_id: invoice.payer_id }, attributes: ['id'], order: [['id', 'ASC']] });
    return f ? { payer_type: 'foodcourt', payer_id: f.id } : null;
  }
  if (pt === 'restaurant_owner' && invoice.restaurant_id) {
    return { payer_type: 'restaurant', payer_id: Number(invoice.restaurant_id) };
  }
  return null;
}

module.exports = { PAYABLE_STATUSES, GATEWAY_PAID_FROM, gatewayPayableError, resolvePayerParty };
