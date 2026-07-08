// opIdGuard — 오프라인 5단계(§8) opId 멱등 가드 헬퍼.
//
// 사용: 재생 대상 변경 엔드포인트(add-items/payments/status/move-table/items/DELETE) 진입부에서
//   if (await alreadyProcessed(req.body.op_id)) return successResponse(...);  // 재전송 무시
//   ... 처리 ...
//   await recordProcessed(req.body.op_id, { order_id, type, restaurant_id });
//
// 안전: op_id 는 SyncEngine 재생 요청만 보낸다 → 온라인 일반 요청엔 op_id 없음 → 가드 미작동(동작 동일).
const { ProcessedOp } = require('../models');

function normalizeOpId(opId) {
  if (typeof opId !== 'string') return null;
  const v = opId.trim().slice(0, 64);
  return v || null;
}

async function alreadyProcessed(opId) {
  const id = normalizeOpId(opId);
  if (!id) return false; // op_id 없으면 가드 미적용(온라인 일반 요청)
  try {
    const row = await ProcessedOp.findByPk(id);
    return !!row;
  } catch {
    return false; // 가드 조회 실패 시 처리 진행(가용성 우선) — 최악의 경우 중복은 클라 단일락이 완화
  }
}

async function recordProcessed(opId, meta = {}) {
  const id = normalizeOpId(opId);
  if (!id) return;
  try {
    await ProcessedOp.findOrCreate({
      where: { op_id: id },
      defaults: { op_id: id, order_id: meta.order_id ?? null, type: meta.type ?? null, restaurant_id: meta.restaurant_id ?? null }
    });
  } catch { /* 비치명 — 기록 실패해도 처리 자체는 성공 */ }
}

// 기록된 처리 meta 조회(order_id 등). 재생 응답을 요청 body 가 아닌 실제 처리된 대상 기준으로
// 반환할 때 사용(§15-3-D forceMerge 하드닝 — divergent replay 방어).
async function getProcessed(opId) {
  const id = normalizeOpId(opId);
  if (!id) return null;
  try { return await ProcessedOp.findByPk(id); } catch { return null; }
}

module.exports = { alreadyProcessed, recordProcessed, getProcessed, normalizeOpId };
