/**
 * 월결제(monthly_soa) 판별 — 단일 소스 (2026-09-29 Fable 판정 soa2 §5-B)
 *
 * > Irene: "월 결제 설정한 고객은 … 모든 주문리스트는 인보이스 페이가 안나오고 SOA에만 토탈 결제 시키는 거야."
 *
 * 전에는 이 판별이 `GET /purchase-invoices/soa/current` 안에만 있었고, 인보이스 화면·결제 라우트는
 * `parent_soa_invoice_id`(이미 묶였나)만 봤다. 그래서 월중(묶이기 전)에는 개별 Pay 가 떴고 실제로 낼 수 있었다.
 * 이제 목록(pay_via_soa)·결제 라우트(400)·soa/current 가 **이 함수 하나**를 쓴다.
 *
 * 조건: 거래 청구서 · 판매자가 브랜드/푸드코트/가입 공급업체 · 그 구매자에 대한 조건이 monthly_soa.
 * 외부(미가입) 공급업체는 false — 그쪽은 정산서도 게이트웨이 결제도 없다(«결제함» 체크만).
 */
const { SupplierContract, SupplierCompany, Brand, Foodcourt } = require('../models');
const Restaurant = require('../models/Restaurant');

/**
 * 이 청구서에 적용되는 월결제 조건을 돌려준다. 월결제가 아니면 null.
 * @returns {Promise<null | { seller_type: 'supplier'|'brand'|'foodcourt', payment_terms: object, contract_id?: number }>}
 */
async function monthlySoaTermsFor(inv) {
  if (!inv || inv.invoice_category !== 'trade' || !inv.issuer_id) return null;

  if (inv.issuer_type === 'supplier') {
    const sc = await SupplierCompany.findByPk(inv.issuer_id, { attributes: ['id', 'is_system_registered'] });
    if (!sc || !sc.is_system_registered) return null;
    let entityType = null;
    let entityId = null;
    if (inv.payer_type === 'restaurant') {
      entityType = 'restaurant'; entityId = inv.payer_id;
    } else if (inv.payer_type === 'brand_manager') {
      const b = await Brand.findOne({ where: { owner_id: inv.payer_id }, attributes: ['id'] });
      if (b) { entityType = 'brand'; entityId = b.id; }
    } else if (inv.payer_type === 'foodcourt_manager') {
      const f = await Foodcourt.findOne({ where: { owner_id: inv.payer_id }, attributes: ['id'] });
      if (f) { entityType = 'foodcourt'; entityId = f.id; }
    }
    if (!entityType) return null;
    const contract = await SupplierContract.findOne({
      where: { supplier_company_id: inv.issuer_id, entity_type: entityType, entity_id: entityId, status: 'active' }
    });
    if (!contract || contract.payment_terms?.invoice_cycle !== 'monthly_soa') return null;
    return { seller_type: 'supplier', payment_terms: contract.payment_terms, contract_id: contract.id };
  }

  if (inv.issuer_type === 'brand' || inv.issuer_type === 'foodcourt') {
    if (inv.payer_type !== 'restaurant') return null;
    const isBrand = inv.issuer_type === 'brand';
    const ownerField = isBrand ? 'brand_id' : 'foodcourt_id';
    const termsField = isBrand ? 'brand_billing_terms' : 'foodcourt_billing_terms';
    const restaurant = await Restaurant.findByPk(inv.payer_id, { attributes: ['id', ownerField, termsField] });
    if (!restaurant) return null;
    if (restaurant[ownerField] !== inv.issuer_id) return null; // 그 매장의 판매자가 아니면 조건이 없다
    const terms = restaurant[termsField];
    if (terms?.invoice_cycle !== 'monthly_soa') return null;
    return { seller_type: inv.issuer_type, payment_terms: terms };
  }

  return null;
}

/** 개별 결제 대신 정산서(SOA)로만 내야 하는 청구서인가. */
async function payViaSoa(inv) {
  if (!inv) return false;
  if (inv.parent_soa_invoice_id) return true;
  return !!(await monthlySoaTermsFor(inv));
}

/**
 * 게이트웨이·결제 제출 라우트 앞에 세우는 가드. 화면에서 버튼을 숨겨도 서버가 다시 막는다.
 * @returns {Promise<boolean>} true 면 이미 응답을 보냈으므로 호출부는 return 해야 한다.
 */
async function blockPayViaSoa(invoice, res) {
  if (!(await payViaSoa(invoice))) return false;
  res.status(400).json({
    success: false,
    code: 'pay_via_soa',
    message: 'This invoice is billed monthly. Pay it through the Statement of Account (SOA).'
  });
  return true;
}

module.exports = { monthlySoaTermsFor, payViaSoa, blockPayViaSoa };
