/**
 * ranking.js — 후보 유사도 랭킹 + 확신도 정책 (Track B, §5-⑥⑦⑧).
 *
 * 순수 함수(프로바이더/DB 무관) — jest 로 계약 고정. 벡터는 전부 L2 정규화 가정(코사인 = 내적).
 * 설계: docs/AI_FOOD_RECOGNITION_DESIGN.md §5 / §B-2.
 */

const W_IMG = 0.85;   // 이미지 유사도 가중 (§5-⑦)
const W_TIME = 0.15;  // ready 경과(FIFO) prior 가중
const BAND_AUTO = 0.95, BAND_RECOMMEND = 0.90, BAND_PICK = 0.80;

/** 코사인(둘 다 L2 정규화 시 내적). 길이 다르면 0. */
function cosine(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return 0;
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  if (dot > 1) dot = 1; if (dot < -1) dot = -1;
  return dot;
}

/** 한 상품의 레퍼런스 임베딩들에 대해 max-pooling(§5-⑥) — 가장 닮은 레퍼런스 1장 점수. */
function maxPool(queryVec, refVectors) {
  let best = 0;
  for (const rv of (refVectors || [])) {
    const s = cosine(queryVec, rv);
    if (s > best) best = s;
  }
  return best;
}

/**
 * 후보 랭킹. candidates = ready 주문 품목 [{ product_id, order_id, item_index, comp_index, name, table, ageMin, options }].
 * refsByProduct = Map<product_id, number[][]> (활성 레퍼런스 임베딩들).
 * 반환: fused_score 내림차순 [{...candidate, img_score, time_score, fused_score}].
 */
function rankCandidates(queryVec, candidates, refsByProduct) {
  const ranked = (candidates || []).map((c) => {
    const refs = refsByProduct.get ? refsByProduct.get(c.product_id) : refsByProduct[c.product_id];
    const img = maxPool(queryVec, refs);
    // FIFO prior: 오래 기다린 ready 일수록 소폭 가점(0~1, 20분에 포화).
    const time = Math.max(0, Math.min(1, (Number(c.ageMin) || 0) / 20));
    const fused = W_IMG * img + W_TIME * time;
    return { ...c, img_score: round4(img), time_score: round4(time), fused_score: round4(fused) };
  });
  ranked.sort((a, b) => b.fused_score - a.fused_score);
  return ranked;
}

/**
 * 확신도 정책 (§5-⑧). maxMode 로 상한(로컬=recommend 캡, auto 금지).
 * 동일 메뉴 다중 주문(top1·top2 같은 product_id, 다른 주문)이면 무조건 'pick'(전부 보여주고 사람 선택).
 * @returns { mode, topConfidence }
 */
function decideMode(ranked, maxMode = 'recommend') {
  if (!ranked || ranked.length === 0) return { mode: 'no_candidates', topConfidence: null };
  const top = ranked[0];
  const conf = top.fused_score;

  // 동일 메뉴 여러 주문 → 사진으로 구분 불가 → 후보 전부 제시(조용히 하나 안 찍음).
  const sameMenuMultiple = ranked.filter(r => r.product_id === top.product_id).length > 1;
  if (sameMenuMultiple) return { mode: capMode('pick', maxMode), topConfidence: conf };

  let mode;
  if (conf >= BAND_AUTO) mode = 'auto';
  else if (conf >= BAND_RECOMMEND) mode = 'recommend';
  else if (conf >= BAND_PICK) mode = 'pick';
  else mode = 'reshoot';
  return { mode: capMode(mode, maxMode), topConfidence: conf };
}

// mode 우선순위(강함→약함) — cap 은 "더 약한 쪽"으로 강등.
const MODE_RANK = { auto: 4, recommend: 3, pick: 2, reshoot: 1 };
function capMode(mode, maxMode) {
  if (MODE_RANK[mode] == null || MODE_RANK[maxMode] == null) return mode;
  return MODE_RANK[mode] > MODE_RANK[maxMode] ? maxMode : mode;
}

function round4(n) { return Math.round(n * 10000) / 10000; }

module.exports = { cosine, maxPool, rankCandidates, decideMode, capMode, W_IMG, W_TIME };
