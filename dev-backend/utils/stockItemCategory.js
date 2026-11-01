/**
 * 재고아이템(BG ProductIngredient) 카테고리 정하기 — 상품 창 «재고아이템도 같이 만들기» 전용.
 * 설계: docs/TRADE_STRUCTURE.md ⑫ (2026-11-01 Fable · Irene «권고대로»)
 *
 * - categoryId   : 이 주인의 활성 재고 카테고리일 때만 쓴다. 아니면 404(호출한 쪽이 롤백).
 * - categoryName : 같은 이름(앞뒤 공백·대소문자 무시)의 활성 재고 카테고리를 다시 쓰고, 없으면 만든다.
 *                  사람이 화면 칸에서 «‹이름› 로 새로 만들기» 를 고른 경우에만 온다 — 조용한 자동 생성 아님.
 * - 둘 다 오면 categoryId 가 이긴다. 둘 다 없으면 { id: null } (미분류).
 * ⛔ 상품 분류와 재고 분류 사이에 연결·동기화를 두지 않는다 — 만드는 순간 한 번뿐.
 */
const { Op, fn, col, where: sqlWhere } = require('sequelize');
const { ProductIngredientCategory } = require('../models');
const { sanitizeString } = require('../middleware/validation');

async function resolveStockItemCategory({ ownerUserId, categoryId, categoryName, transaction }) {
  if (ownerUserId == null) return { id: null };

  const cid = parseInt(categoryId, 10);
  if (categoryId != null && categoryId !== '') {
    const row = Number.isFinite(cid)
      ? await ProductIngredientCategory.findOne({
          where: { id: cid, owner_user_id: ownerUserId, is_active: true },
          attributes: ['id'], transaction
        })
      : null;
    if (!row) {
      return { error: { status: 404, body: { success: false, code: 'STOCK_CATEGORY_NOT_FOUND', message: 'Stock item category not found' } } };
    }
    return { id: row.id };
  }

  const name = sanitizeString(String(categoryName || '')).trim().slice(0, 100);
  if (!name) return { id: null };

  const existing = await ProductIngredientCategory.findOne({
    where: {
      owner_user_id: ownerUserId,
      is_active: true,
      [Op.and]: [sqlWhere(fn('LOWER', fn('TRIM', col('name'))), name.toLowerCase())]
    },
    order: [['id', 'ASC']],
    attributes: ['id'], transaction
  });
  if (existing) return { id: existing.id, reused: true };

  const maxOrder = await ProductIngredientCategory.max('display_order', {
    where: { owner_user_id: ownerUserId }, transaction
  }) || 0;
  const created = await ProductIngredientCategory.create({
    owner_user_id: ownerUserId,
    name,
    display_order: maxOrder + 1,
    is_active: true
  }, { transaction });
  return { id: created.id, created: true };
}

module.exports = { resolveStockItemCategory };
