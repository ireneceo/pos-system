'use strict';
/**
 * 브랜드 상품 중복 판별 — 등록 가드와 유사상품 제안이 **같은 규칙**을 쓰도록 하는 단일 소스.
 * docs/BRAND_STOCK_SHARING_DESIGN.md 2026-08-20 절(P1).
 *
 * ── 왜 규칙이 둘인가 (운영 실측 근거) ──────────────────────────────────────
 * 2026-08-20 운영 데이터에서 두 규칙의 검출력을 재봤다:
 *   · 정규화 이름 완전일치(괄호 포함) → 충돌 **0쌍**  = 실제 중복 20쌍을 하나도 못 잡는다
 *   · 괄호 구간을 뺀 이름 일치         → 충돌 **20쌍** = 실제 중복과 정확히 일치
 * 실제 중복은 이렇게 생겼다(같은 물건, 괄호 안이 통째로 다름):
 *     "MW R1000 ROUND CONTAINER WITH LID 850ml (50PCS/PKT)"
 *     "MW R1000 Round Container With Lid (플라스틱 큰 그릇 R1000)"
 * 그런데 같은 규칙이 **정당한 변형도** 잡는다 — 이 데이터는 크기가 괄호 안에만 있기 때문:
 *     "Single Wall Paper Bowl Plain Kraft (갈색 종이 밥그릇(L))"  ← L/M/S 는 서로 다른 상품
 * 그래서 **막는 규칙(하드)과 물어보는 규칙(소프트)을 분리**한다. 유사도 점수·퍼지 매칭은
 * 쓰지 않는다 — 비결정적이라 "왜 걸렸는지" 설명할 수 없다.
 */
const { Op } = require('sequelize');
const { BrandProduct } = require('../models');

/** 이름 정규화 — 대소문자·공백·구두점 차이를 흡수(괄호 안은 **남긴다**). */
function normalizeName(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9가-힣]/g, '');
}

/** 변형 키 — 괄호 구간을 제거한 뒤 정규화. "같은 물건인데 설명만 다른" 경우를 묶는다. */
function variantKey(s) {
  return normalizeName(String(s || '').replace(/[(（][^)）]*[)）]/g, ' '));
}

/**
 * 느슨한 키 — 변형 키에서 **숫자까지 제거**. **제안 전용이며 차단에는 절대 쓰지 않는다.**
 *
 * 왜 차단에 쓰면 안 되나: 숫자가 곧 "진짜 변형을 가르는 정보"다. 종이볼 `850CC` 와 `780CC` 는
 * 서로 다른 상품인데 숫자를 지우면 같은 키가 된다(운영 실측).
 * 왜 제안에는 유용한가: 규격이 **괄호 밖**에 있는 중복은 변형 키로 못 잡는다
 *   "MW R1000 ... WITH LID 850ml (50PCS/PKT)"  vs  "MW R1000 ... With Lid (한글 설명)"
 * 제안 목록은 비차단·조언이라 오탐 비용이 0이고, 형제 변형이 같이 뜨는 것도 오히려 유익하다
 * ("이 변형들이 이미 있습니다 — 그중 하나 아닌가요?"). 결정론적 변환이라 퍼지 매칭 금지 원칙과 무관.
 */
function loosePlusKey(s) {
  // 괄호 제거 → **숫자+단위 토큰**(850ml, 780CC, 50PCS, 2PLY …)을 통째로 제거 → 정규화.
  // 숫자만 지우면 단위 글자가 남아 키가 갈린다(실측: '850ml' → 'ml' 잔류로 R1000 쌍 미매칭).
  const withoutParen = String(s || '').replace(/[(（][^)）]*[)）]/g, ' ');
  const withoutSpec = withoutParen.replace(
    /\b\d+(?:\.\d+)?\s*(?:ml|cc|oz|kg|g|mm|cm|l|pcs|pkt|ply|sets?|rolls?)?\b/gi,
    ' '
  );
  return normalizeName(withoutSpec);
}

/**
 * @param {{ownerUserId:number, name:string, sku?:string|null, excludeId?:number}} args
 * @returns {Promise<{exact:object|null, exactReason:string|null, similar:object[]}>}
 *   exact       : 하드 차단 대상(SKU 또는 이름 완전일치)
 *   similar     : 소프트 확인 대상(변형 키 일치) — 409 를 내되 force 로 통과 가능
 *   suggestions : **제안 전용**(느슨한 키). 차단하지 않는다 — 등록 폼이 보여주기만 한다.
 */
async function findDuplicateBrandProducts({ ownerUserId, name, sku, excludeId }) {
  const where = { owner_user_id: ownerUserId };
  if (excludeId) where.id = { [Op.ne]: excludeId };

  const rows = await BrandProduct.findAll({
    where,
    attributes: ['id', 'name', 'sku', 'unit', 'unit_price', 'is_active']
  });

  const targetName = normalizeName(name);
  const targetVariant = variantKey(name);
  const targetSku = sku ? String(sku).trim().toLowerCase() : null;

  // 1단 — SKU 우선(식별자), 그다음 이름 완전일치
  if (targetSku) {
    const skuHit = rows.find((r) => r.sku && String(r.sku).trim().toLowerCase() === targetSku);
    if (skuHit) return { exact: skuHit, exactReason: 'DUPLICATE_SKU', similar: [] };
  }
  const nameHit = rows.find((r) => normalizeName(r.name) === targetName);
  if (nameHit) return { exact: nameHit, exactReason: 'DUPLICATE_NAME', similar: [] };

  // 2단 — 변형 키 일치(사람이 결정). **차단 트리거는 여기까지.**
  const similar = targetVariant
    ? rows.filter((r) => variantKey(r.name) === targetVariant)
    : [];

  // 3단 — 제안 전용 추가 후보(느슨한 키). 차단하지 않는다. 규격이 괄호 밖에 있는 중복
  // (예: "... WITH LID 850ml (50PCS/PKT)")을 사람 눈에 올려주는 용도.
  const targetLoose = loosePlusKey(name);
  const similarIds = new Set(similar.map((r) => r.id));
  const suggestions = targetLoose
    ? rows.filter((r) => !similarIds.has(r.id) && loosePlusKey(r.name) === targetLoose)
    : [];

  return { exact: null, exactReason: null, similar, suggestions };
}

module.exports = { findDuplicateBrandProducts, normalizeName, variantKey, loosePlusKey };
