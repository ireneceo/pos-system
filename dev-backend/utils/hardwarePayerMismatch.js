/**
 * 하드웨어 견적에서 나온 청구서 중 «매장» 종류에 사람(회원) 번호가 들어간 행 — 탐지 술어 단일 소스
 * (2026-10-07 Fable 판정 [2]). 보정 마이그(migrate-hardware-invoice-payer)와 인스펙션(I-HW-001)이 같은 조건을 쓴다.
 * 옛 생성 코드는 payer_type 'restaurant' + payer_id = quote.user_id + restaurant_id NULL 로 적었다.
 *
 * 두 꼴을 잡는다 (2026-10-07 게이트 판정에서 확장 — 운영 #53 INV-260412003 변형):
 *   ① 매장 칸이 빈 것 — 옛 코드의 기본 꼴(개발 #247 이 이 꼴이었다).
 *   ② 매장 칸은 채워졌는데 payer_id 가 매장 칸과 다르고 **견적의 회원 번호와 같은** 것 — 옛 코드가 사람 번호를 적은 뒤
 *      누군가 매장 칸만 채운 꼴. «견적 회원 번호와 같다» 를 닻으로 써서, 새 코드가 적는 «매장 번호 = 매장 칸» 행은 잡히지 않는다.
 * 새 코드(payerForUser)는 'restaurant' 종류면 항상 매장 칸을 채우고 payer_id 에 매장 번호를 넣으므로 ①②에 들지 않는다.
 */
const HW_PAYER_MISMATCH_JOIN = `JOIN hardware_quotes q ON (q.invoice_id = i.id OR q.subscription_invoice_id = i.id)`;
const HW_PAYER_MISMATCH_WHERE = `i.payer_type = 'restaurant' AND i.payer_id IS NOT NULL
   AND (i.restaurant_id IS NULL OR (i.payer_id <> i.restaurant_id AND i.payer_id = q.user_id))`;
const HW_PAYER_MISMATCH_FROM_SQL = `
  FROM invoices i
  ${HW_PAYER_MISMATCH_JOIN}
 WHERE ${HW_PAYER_MISMATCH_WHERE}`;

module.exports = { HW_PAYER_MISMATCH_FROM_SQL, HW_PAYER_MISMATCH_JOIN, HW_PAYER_MISMATCH_WHERE };
