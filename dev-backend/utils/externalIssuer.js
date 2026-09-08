/**
 * 외부 공급업체 발행자 판정 (2026-09-08 · docs/PURCHASE_ORDER_SYSTEM.md §5)
 *
 * > Irene: "외부공급업체는 결제했는지 안했는지도 모르잖아 … 결제했냐 안했냐는 그냥 체크만해야지
 * >         여기 솔루션에서 결제를 시키면 안되지 … 업로드된 인보이스가 진짜인거지 외부공급업체는."
 *
 * 외부 공급업체는 **우리 솔루션에 로그인도 못 하고 수금 계정도 없다.** 그런 발행자 앞으로
 * 게이트웨이 결제를 태우면 돈이 어디로도 가지 않는다. 그래서 결제는 막고 "결제함 체크"만 남긴다.
 *
 * 판정 기준은 `supplier_companies.is_system_registered = 0` 하나다.
 * (실측: `getStripeForIssuer` 에 플랫폼 폴백이 없어 지금도 키가 없으면 throw 로 끝난다.
 *  즉 돈이 새지는 않았다. 여기서 막는 이유는 **에러 대신 뜻이 분명한 400** 을 주기 위해서다.)
 */
const { SupplierCompany } = require('../models');

/** 이 발행자가 외부(솔루션 미가입) 공급업체인가. */
async function isExternalIssuer(issuerType, issuerId) {
  if (issuerType !== 'supplier' || !issuerId) return false;
  const sc = await SupplierCompany.findByPk(issuerId, { attributes: ['id', 'is_system_registered'] });
  if (!sc) return false;
  return !sc.is_system_registered;
}

/**
 * 게이트웨이 결제 라우트 앞에 세우는 가드.
 * 프론트 폭 ≤ 서버 폭 — 화면에서 버튼을 숨기더라도 서버가 다시 막는다.
 * @returns {Promise<boolean>} true 면 이미 응답을 보냈으므로 호출부는 return 해야 한다.
 */
async function blockExternalIssuerPayment(invoice, res) {
  if (!(await isExternalIssuer(invoice.issuer_type, invoice.issuer_id))) return false;
  res.status(400).json({
    success: false,
    code: 'EXTERNAL_ISSUER_NO_GATEWAY',
    message: '외부 공급업체 청구서는 이 솔루션에서 결제할 수 없습니다. 실제로 지불한 뒤 "결제함"으로 표시하세요.'
  });
  return true;
}

module.exports = { isExternalIssuer, blockExternalIssuerPayment };
