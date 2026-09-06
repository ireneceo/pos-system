/**
 * Code Generator Utility — 코드 채번 단일 소스
 *
 * ## 2026-09-06: `count + 1` 을 버리고 **원자 카운터**로 바꿨다
 * Irene: "코드는 지금 채우지 말고 체계만 잡아서 앞으로 제대로 되게만 해."
 *
 * 옛 방식 `count(*) + 1` 의 결함 둘:
 *   ① **번호 재사용** — 행을 지우고 새로 만들면 이미 쓰인 번호가 다시 나온다.
 *      운영에 중복 코드 16쌍이 실재한다(메모리 reference_count_based_code_numbering).
 *   ② **경쟁** — 두 명이 동시에 등록하면 같은 count 를 읽어 같은 번호가 나온다.
 *
 * 새 방식: `code_sequences(scope_type, scope_id, prefix, last_no)` 를 MySQL 한 문장으로 올린다
 *   (`INSERT … ON DUPLICATE KEY UPDATE last_no = LAST_INSERT_ID(last_no + 1)`).
 *   같은 범위에서 두 요청이 겹쳐도 서로 다른 번호를 받는다.
 *
 * 씨앗: 그 범위에서 **처음 발급할 때** 기존 최대 번호를 읽어 넣는다(소프트삭제 포함).
 *   기존 빈 코드는 **채우지 않는다** — 지시가 "앞으로 제대로"다.
 *
 * 범위: 브랜드 소유 행은 brand_id, 매장 소유 행은 restaurant_id 별로 1부터.
 *   매장마다 PI-001 이 따로 있는 것이 맞다(남의 번호를 볼 일이 없다).
 */

/**
 * Generate a unique code for an entity
 * @param {Object} Model - Sequelize model to count existing entities
 * @param {string} prefix - Code prefix (e.g., 'RCP', 'ING', 'SUP')
 * @param {Object} options - Optional parameters
 * @param {string} options.ownerType - 'brand' or 'restaurant'
 * @param {number} options.ownerId - Owner ID (brand_id or restaurant_id)
 * @param {Object} options.whereClause - Custom where clause for counting
 * @param {number} options.padLength - Number of digits to pad (default: 3)
 * @returns {Promise<string>} Generated code
 */
/**
 * 그 범위·접두의 **기존 최대 번호**를 읽는다 — 시퀀스 씨앗용.
 * ⚠ 소프트삭제된 행도 센다(`paranoid: false`). 지운 번호를 다시 내주지 않기 위해서다.
 */
async function maxExistingNo(Model, prefix, countWhere, field, sep = '-') {
  const { Op } = require('sequelize');
  const rows = await Model.findAll({
    where: { ...countWhere, [field]: { [Op.like]: `${prefix}${sep}%` } },
    attributes: [field],
    paranoid: false,
    raw: true
  }).catch(() => []);
  let max = 0;
  for (const r of rows) {
    const m = String(r[field] || '').match(new RegExp(`^${prefix}${sep}(\\d+)$`));
    if (m) { const n = parseInt(m[1], 10); if (n > max) max = n; }
  }
  return max;
}

/**
 * 원자 카운터 — 같은 범위에서 동시에 불려도 서로 다른 번호가 나온다.
 *
 * ⚠ 2026-09-06 실측: 처음엔 `INSERT … ON DUPLICATE KEY UPDATE` 뒤에 **따로** `SELECT LAST_INSERT_ID()`
 *   를 했는데, Sequelize 는 연결 풀에서 매번 다른 연결을 줄 수 있어 남의 값을 읽었다.
 *   픽스처에서 동시 10건이 **5개**만 서로 달랐다. `LAST_INSERT_ID()` 는 **연결마다** 따로이므로
 *   INSERT/UPDATE 와 SELECT 가 **같은 연결**이어야 한다 → 트랜잭션으로 묶는다.
 *   그리고 새 행일 때 `LAST_INSERT_ID()` 는 auto_increment id 라 못 믿는다 → 씨앗 행을 먼저
 *   `INSERT IGNORE` 로 만들고, 발급은 항상 `UPDATE … LAST_INSERT_ID(last_no + 1)` 로 한다
 *   (UPDATE 가 행 잠금을 잡아 직렬화된다).
 */
async function nextSeq(scopeType, scopeId, prefix, seed, transaction) {
  const { sequelize } = require('../config/database');
  const { QueryTypes } = require('sequelize');

  // ① 씨앗 행 보장 — **발급 경로 밖**에서 한 번. 동시에 여러 요청이 같은 키를 INSERT 하면
  //    유니크 인덱스 갭 잠금 때문에 서로 물린다(실측: 동시 10건에서 Deadlock). 그래서 분리하고
  //    실패해도 무시한다(다른 요청이 이미 만들었다는 뜻).
  try {
    await sequelize.query(
      `INSERT IGNORE INTO code_sequences (scope_type, scope_id, prefix, last_no)
       VALUES (:st, :sid, :px, :seed)`,
      { replacements: { st: scopeType, sid: scopeId, px: prefix, seed } });
  } catch (e) { /* 이미 있음 또는 경쟁 — 아래 UPDATE 가 진실이다 */ }

  // ② 발급 — 존재하는 행의 UPDATE 는 **행 잠금**이라 직렬화되고 데드락이 없다.
  //    `LAST_INSERT_ID()` 는 연결마다 따로이므로 UPDATE 와 SELECT 가 같은 연결이어야 한다 → 트랜잭션.
  const bump = async (t) => {
    await sequelize.query(
      `UPDATE code_sequences SET last_no = LAST_INSERT_ID(last_no + 1)
        WHERE scope_type = :st AND scope_id = :sid AND prefix = :px`,
      { replacements: { st: scopeType, sid: scopeId, px: prefix }, transaction: t });
    const [r] = await sequelize.query('SELECT LAST_INSERT_ID() n', { type: QueryTypes.SELECT, transaction: t });
    return Number(r.n);
  };

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const n = transaction ? await bump(transaction) : await sequelize.transaction(bump);
      if (n > 0) return n;
    } catch (e) {
      if (!/Deadlock|Lock wait timeout/i.test(e.message) || attempt === 2) throw e;
      await new Promise((r) => setTimeout(r, 20 * (attempt + 1)));
    }
  }
  throw new Error(`코드 발급 실패: ${prefix} ${scopeType}:${scopeId} — 시퀀스 행을 못 올렸다`);
}

async function generateCode(Model, prefix, options = {}) {
  // `separator` — 접두와 번호 사이 글자. 기본 '-'. 인보이스 번호처럼 `INV-2026090001`
  //   (구분자 없음) 형식을 쓰는 곳이 있어 형식을 바꾸지 않고 옮기려면 이 옵션이 필요하다(2026-09-06).
  const { ownerType, ownerId, whereClause, padLength = 3, field = 'code', transaction, separator = '-' } = options;

  let countWhere = whereClause || {};
  let scopeType = 'global', scopeId = 0;

  // Build where clause based on owner type if provided
  if (ownerType && ownerId) {
    if (ownerType === 'brand') {
      countWhere = { brand_id: ownerId, owner_type: 'brand' };
      scopeType = 'brand'; scopeId = Number(ownerId);
    } else if (ownerType === 'restaurant') {
      countWhere = { restaurant_id: ownerId, owner_type: 'restaurant' };
      scopeType = 'restaurant'; scopeId = Number(ownerId);
    }
  } else if (whereClause) {
    // whereClause 만 준 호출부 — 범위 키를 그 값에서 뽑는다.
    // ⚠ 2026-09-06: `owner_user_id`(재고아이템 = BG 계정별) 와 `foodcourt_id` 를 빠뜨리면
    //   **모든 BG 가 시퀀스 하나를 나눠 쓴다.** 중복은 안 나지만(dup 체크가 owner 별), BG#2 의
    //   첫 새 재고아이템이 자기 최대 다음이 아니라 BG#1 이 올려 둔 번호 다음이 된다 — 체계가 아니다.
    if (whereClause.brand_id) { scopeType = 'brand'; scopeId = Number(whereClause.brand_id); }
    else if (whereClause.restaurant_id) { scopeType = 'restaurant'; scopeId = Number(whereClause.restaurant_id); }
    else if (whereClause.owner_user_id) { scopeType = 'user'; scopeId = Number(whereClause.owner_user_id); }
    // `owner_id` — general_stock 의 BG 계정 소유 행(restaurant_id 가 null 인 것). 2026-09-06 Fable 적발:
    //   이 분기가 없어 **전 BG 가 `global:GeneralStock / GS` 시퀀스 하나를 나눠 썼다.** 중복은 안 나도
    //   BG#2 의 다음 번호가 자기 최대 다음이 아니라 BG#1 이 올려 둔 번호 다음이 된다 — 체계가 아니다.
    //   씨앗이 첫 호출자 범위의 최대값이라, 다른 owner 가 그보다 100 넘게 큰 번호를 가지면 발급이 던진다.
    else if (whereClause.owner_id) { scopeType = 'user'; scopeId = Number(whereClause.owner_id); }
    else if (whereClause.foodcourt_id) { scopeType = 'foodcourt'; scopeId = Number(whereClause.foodcourt_id); }
  }
  const scopeKey = `${scopeType}:${Model.name || 'model'}`;

  // 이 범위·접두의 시퀀스가 처음이면 기존 최대 번호를 씨앗으로 넣는다.
  const { sequelize } = require('../config/database');
  const { QueryTypes } = require('sequelize');
  const [seq] = await sequelize.query(
    `SELECT last_no FROM code_sequences WHERE scope_type=:st AND scope_id=:sid AND prefix=:px`,
    { type: QueryTypes.SELECT, replacements: { st: scopeKey, sid: scopeId, px: prefix }, transaction });
  const seed = seq ? Number(seq.last_no) : await maxExistingNo(Model, prefix, countWhere, field, separator);

  // 발급 후 그 코드가 이미 있으면(수기 입력이 앞서 간 경우) 다음 번호로. 상한 100.
  for (let i = 0; i < 100; i += 1) {
    const n = await nextSeq(scopeKey, scopeId, prefix, seed, transaction);
    const code = `${prefix}${separator}${String(n).padStart(padLength, '0')}`;
    const dup = await Model.count({ where: { ...countWhere, [field]: code }, paranoid: false, transaction }).catch(() => 0);
    if (!dup) return code;
  }
  throw new Error(`코드 발급 실패: ${prefix} 범위 ${scopeKey}:${scopeId} 에서 100회 연속 충돌`);
}

/**
 * Generate recipe code
 */
async function generateRecipeCode(Recipe, ownerType, ownerId) {
  return generateCode(Recipe, 'RCP', { ownerType, ownerId });
}

/**
 * Generate ingredient code
 */
async function generateIngredientCode(Ingredient, ownerType, ownerId) {
  return generateCode(Ingredient, 'ING', { ownerType, ownerId });
}

/**
 * Generate supplier code
 */
async function generateSupplierCode(Supplier) {
  return generateCode(Supplier, 'SUP');
}

/**
 * Generate general stock code
 */
async function generateGeneralStockCode(GeneralStock, restaurantId) {
  return generateCode(GeneralStock, 'GS', {
    whereClause: { restaurant_id: restaurantId }
  });
}

/**
 * Generate category code
 * @param {Object} CategoryModel - Category model
 * @param {string} prefix - Prefix (e.g., 'IC' for ingredient category)
 * @param {Object} options - Options with brand_id or restaurant_id
 */
async function generateCategoryCode(CategoryModel, prefix, options = {}) {
  const { brandId, restaurantId } = options;
  const whereClause = {};

  if (brandId) {
    whereClause.brand_id = brandId;
  }
  if (restaurantId) {
    whereClause.restaurant_id = restaurantId;
  }

  return generateCode(CategoryModel, prefix, { whereClause });
}


/**
 * 사람이 직접 넣은 코드가 같은 범위에 이미 있으면 막는다.
 * ⚠ 이 컬럼들에는 **유니크 인덱스가 없다**(2026-09-06 실측: brand_products.sku ·
 *   product_ingredients.code · ingredients.code · recipes.code · product_recipes.code 전부 없음).
 *   즉 DB 가 안 막아 주므로 여기서 막지 않으면 중복이 조용히 들어간다(운영 16쌍이 그렇게 생겼다).
 *   소프트삭제된 행도 센다 — 지워진 코드를 되쓰면 복구 시 부딪힌다.
 * @returns {null|{status:number, body:object}} 충돌이면 응답 객체, 아니면 null
 */
async function codeTakenResponse(Model, code, scopeWhere = {}, field = 'code', transaction) {
  if (!code) return null;
  const dup = await Model.count({
    where: { ...scopeWhere, [field]: code },
    paranoid: false,
    transaction
  }).catch(() => 0);
  if (!dup) return null;
  return {
    status: 409,
    body: { success: false, code: 'CODE_TAKEN', message: `Code already in use: ${code}` }
  };
}

module.exports = {
  generateCode,
  nextSeq,
  codeTakenResponse,
  generateRecipeCode,
  generateIngredientCode,
  generateSupplierCode,
  generateGeneralStockCode,
  generateCategoryCode
};
