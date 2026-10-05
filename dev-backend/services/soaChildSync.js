/**
 * 정산서(SOA) ↔ 묶인 청구서 상태 연동 — 단일 규칙 (2026-10-05 Fable 판정 «soa-child-status»)
 *
 * 정산서는 «여러 청구서를 한 번에 내는 묶음»이라 결제도 한 번·상태도 하나다. 묶인 청구서가 정산서와
 * 다른 상태로 보이면 결함이다. 정산서 상태를 바꾸는 길(submit-payment · confirm-payment ·
 * reject-payment · PATCH /:id/status)은 **전부 이 함수를 부른다** — 길마다 복붙하면 한 길이 빠진다
 * (실제로 PATCH status 와 reject 가 빠져 2026-10-05 운영 SOA-BRD2-R8 자식 10건이 «확인 대기» 로 남았다).
 *
 * 취소(cancelled)는 여기서 다루지 않는다 — 묶음을 «푸는» 다른 규칙이다(invoices-crud PATCH status).
 */
const { Op } = require('sequelize');

/**
 * 정산서가 `soaStatus` 가 됐을 때 묶인 청구서를 같은 상태로 맞춘다. 정산서가 아니면 아무것도 안 한다.
 * @param {object} soa - Invoice 인스턴스 또는 { id, invoice_category }
 * @param {string} soaStatus - 정산서의 새 상태
 * @param {{ transaction?: object, actorId?: number|null, at?: Date }} [opts]
 * @returns {Promise<number>} 바뀐 자식 수
 */
async function syncSoaChildren(soa, soaStatus, opts = {}) {
  if (!soa || soa.invoice_category !== 'soa') return 0;
  const Invoice = require('../models/Invoice');
  const { transaction, actorId = null } = opts;
  const at = opts.at || new Date();
  const rule = childRuleFor(soaStatus, { actorId, at });
  if (!rule) return 0;
  const [n] = await Invoice.update(rule.set, {
    where: { parent_soa_invoice_id: soa.id, status: { [Op.in]: rule.from } },
    transaction
  });
  return n;
}

/** 정산서 상태 → 자식에 적용할 { from, set }. 대상이 아니면 null. 복구 스크립트·인스펙션도 같은 규칙을 쓴다. */
function childRuleFor(soaStatus, { actorId = null, at = new Date() } = {}) {
  if (soaStatus === 'paid') {
    return {
      from: ['pending_payment', 'overdue', 'pending', 'payment_submitted', 'sent', 'rejected'],
      set: { status: 'paid', paid_at: at, confirmed_by: actorId, confirmed_at: at }
    };
  }
  if (soaStatus === 'payment_submitted') {
    return {
      from: ['pending_payment', 'overdue', 'pending'],
      set: { status: 'payment_submitted', payment_submitted_at: at }
    };
  }
  if (soaStatus === 'pending_payment') {
    // 발행자가 결제를 거절했거나 상태를 되돌렸다 — 제출됨으로 끌려갔던 자식도 함께 되돌린다
    return {
      from: ['payment_submitted'],
      set: { status: 'pending_payment', payment_submitted_at: null }
    };
  }
  return null;
}

module.exports = { syncSoaChildren, childRuleFor };

/**
 * 정산서와 상태가 갈린 자식 청구서를 찾는 조건 — 복구 스크립트와 인스펙션이 **같은 SQL** 을 쓴다
 * (검사와 수정의 WHERE 가 다르면 «수정이 덜 고친다»). 별칭: p = 정산서, c = 자식.
 */
const MISMATCH_FROM_SQL = (() => {
  const inList = (arr) => arr.map((s) => `'${s}'`).join(',');
  const clauses = ['paid', 'payment_submitted', 'pending_payment']
    .map((st) => `(p.status = '${st}' AND c.status IN (${inList(childRuleFor(st).from)}))`);
  return `FROM invoices c JOIN invoices p ON p.id = c.parent_soa_invoice_id
    WHERE p.invoice_category = 'soa' AND (${clauses.join(' OR ')})`;
})();

module.exports.MISMATCH_FROM_SQL = MISMATCH_FROM_SQL;
