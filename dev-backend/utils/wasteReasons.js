/**
 * 폐기·조정 사유 코드 — 장부 inventory_transactions.reason_code 의 어휘 (단일 소스).
 * DB ENUM 이 아니다: 어휘가 늘어도 마이그 없이 여기만 고친다(2026-10-08 Fable 판정 Ⅱ-2-C).
 * 실사 차이 사유(stock_take_items.variance_reason ENUM)와는 별개 — 그건 그대로 둔다.
 */
const WASTE_REASONS = Object.freeze(['spoiled', 'expired', 'overcooked', 'breakage', 'prep_loss', 'other']);

// 장부를 사람이 직접 맞출 때(인라인 수정·장부 정합 보정)의 사유 — 폐기 사유와 섞지 않는다
const ADJUST_REASONS = Object.freeze(['inline_edit', 'ledger_reconcile', 'correction']);

const isWasteReason = (code) => WASTE_REASONS.includes(code);

module.exports = { WASTE_REASONS, ADJUST_REASONS, isWasteReason };
