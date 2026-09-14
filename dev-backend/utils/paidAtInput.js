/**
 * 결제일 입력 해석 — 2026-09-14 (Irene: 「결제 마크페이드할 때 … 날짜도 넣게 해줘」)
 *
 * 한 곳에만 둔다. 라우트(`invoices-payment.js`)와 서비스(`purchaseOrderPayment.js`)가 같은 규칙을 쓴다
 * — 두 벌로 두면 곧 갈라진다.
 *
 * 규칙: 값이 없으면 null(=호출부가 현재시각을 쓴다) · 날짜로 못 읽으면 거부 ·
 *       미래는 거부(오타로 매출·마감이 미래로 밀리는 것을 막는다. 시차용으로 24시간 여유).
 */
const FUTURE_SLACK_MS = 24 * 60 * 60 * 1000;

function parsePaidAt(raw, now = Date.now()) {
  if (raw === undefined || raw === null || raw === '') return { ok: true, value: null };
  const d = new Date(raw);
  if (isNaN(d.getTime())) return { ok: false, code: 'INVALID_PAID_AT', message: 'paid_at is not a valid date' };
  if (d.getTime() > now + FUTURE_SLACK_MS) {
    return { ok: false, code: 'INVALID_PAID_AT', message: 'paid_at cannot be in the future' };
  }
  return { ok: true, value: d };
}

module.exports = { parsePaidAt, FUTURE_SLACK_MS };
