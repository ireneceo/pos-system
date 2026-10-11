/**
 * 매장 메뉴 2단 카테고리 규칙 — 한 곳 (2026-10-11 Fable 판정 · docs/MENU_CATEGORY_TWO_LEVEL.md)
 *
 * - 2단까지만: 상위(parent_id = NULL) 밑에 하위 하나 층.
 * - 카테고리는 «메뉴 칸» 아니면 «묶음 칸»(하위가 있는 카테고리) 둘 중 하나. 묶음 칸에는 메뉴를 직접 담지 않는다.
 * - 메뉴는 지금처럼 카테고리 «이름»으로 연결(products.category). 이름은 매장 안에서 겹치지 않는다(기존 규칙).
 *
 * 메뉴를 저장하는 모든 길(메뉴 관리·레시피·재료·공급업체 연결·가져오기·브랜드 동기화)과
 * 카테고리 상위 변경이 이 함수들을 같이 쓴다. 판정을 다른 곳에 다시 쓰지 말 것.
 */
const Category = require('../models/Category');
const Product = require('../models/Product');

const GROUP_CATEGORY_MESSAGE = 'This category has subcategories. Put menu items in one of its subcategories.';

/** 이 이름의 카테고리가 «묶음 칸»(하위 있음)이면 그 행, 아니면 null. 이름 비교는 DB 정렬(대소문자 무시). */
async function findGroupCategoryByName(restaurantId, name, { transaction } = {}) {
  if (!restaurantId || name == null || String(name).trim() === '') return null;
  const cat = await Category.findOne({
    where: { restaurant_id: restaurantId, name: String(name).trim() },
    attributes: ['id', 'name'],
    transaction
  });
  if (!cat) return null;
  const child = await Category.findOne({
    where: { restaurant_id: restaurantId, parent_id: cat.id },
    attributes: ['id'],
    transaction
  });
  return child ? cat : null;
}

/**
 * 메뉴를 이 카테고리 이름에 담아도 되는지. 되면 null, 안 되면 400 응답 본문.
 * (이름이 아예 없는 카테고리면 판정하지 않는다 — 기존 FK/검증이 맡는다.)
 */
async function menuCategoryError(restaurantId, name, opts = {}) {
  const group = await findGroupCategoryByName(restaurantId, name, opts);
  if (!group) return null;
  return {
    success: false,
    message: GROUP_CATEGORY_MESSAGE,
    error: { message: GROUP_CATEGORY_MESSAGE, code: 'CATEGORY_IS_GROUP', category: group.name }
  };
}

/**
 * 카테고리 `self`(새로 만들면 null)를 `parentId` 밑에 두어도 되는지.
 * 반환: { ok: true, parent, parentMenuCount } 또는 { ok: false, status, code, message, parentMenuCount? }
 * - parentMenuCount > 0 이면 «옮기기» 없이 하위를 만들 수 없다(호출하는 쪽이 moveMenus 로 결정).
 */
async function checkParent(restaurantId, self, parentId, { transaction } = {}) {
  if (parentId == null || parentId === '') return { ok: true, parent: null, parentMenuCount: 0 };
  const pid = Number(parentId);
  if (!Number.isInteger(pid) || pid <= 0) {
    return { ok: false, status: 400, code: 'VALIDATION_ERROR', message: 'Invalid parent category' };
  }
  if (self && Number(self.id) === pid) {
    return { ok: false, status: 400, code: 'VALIDATION_ERROR', message: 'A category cannot be its own parent' };
  }
  const parent = await Category.findOne({ where: { id: pid, restaurant_id: restaurantId }, transaction });
  if (!parent) {
    return { ok: false, status: 400, code: 'VALIDATION_ERROR', message: 'Parent category not found' };
  }
  if (parent.parent_id != null) {
    return { ok: false, status: 400, code: 'CATEGORY_DEPTH_LIMIT', message: 'Only two levels are allowed — the chosen parent is already a subcategory' };
  }
  if (self) {
    const myChild = await Category.findOne({ where: { restaurant_id: restaurantId, parent_id: self.id }, attributes: ['id'], transaction });
    if (myChild) {
      return { ok: false, status: 400, code: 'CATEGORY_DEPTH_LIMIT', message: 'This category has its own subcategories, so it cannot be placed under another category' };
    }
  }
  const parentMenuCount = await Product.count({ where: { restaurant_id: restaurantId, category: parent.name }, transaction });
  return { ok: true, parent, parentMenuCount };
}

/** 묶음 칸(하위 있는 카테고리) id 집합 — 화면 목록·모바일 메뉴에서 쓴다. */
function groupIdSet(categoryRows) {
  const set = new Set();
  for (const c of categoryRows) if (c.parent_id != null) set.add(Number(c.parent_id));
  return set;
}

module.exports = {
  GROUP_CATEGORY_MESSAGE,
  findGroupCategoryByName,
  menuCategoryError,
  checkParent,
  groupIdSet
};
