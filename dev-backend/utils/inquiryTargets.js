/**
 * 운영 문의(Operation Inquiry) — «누구에게 보낼 수 있나» 와 «누가 받나» 를 한 곳에서.
 *
 * 2026-10-23 매장 10 «No one connected» — 대상 목록이 restaurant_managers 감독(oversight) 줄만 읽었다.
 *   ① 09-28 매장 수정 창 보호로 소유(ownership) 줄이 `managers` 에서 빠지며 오너가 대상에서 사라졌고
 *   ② 브랜드·푸드코트 주인(brands/foodcourts.owner_id)은 접근 판정(middleware/auth.js)에선 연결인데
 *      연결표 줄이 없으면 대상에도, 받은편지함에도 안 나왔다.
 * 그래서 보내는 쪽(대상 목록)과 받는 쪽(받은편지함 매장 범위)이 같은 기준을 쓰게 여기 둔다.
 */
const { Op } = require('sequelize');
const { User, Brand, Foodcourt, RestaurantManager, Restaurant } = require('../models');

const toTarget = (u, isPrimary = false) => ({
  id: u.id.toString(),
  name: u.full_name || u.username,
  email: u.email,
  role: u.role,
  company: u.company_name || '',
  phone: u.phone || '',
  isPrimary: !!isPrimary
});

/** 매장 하나의 문의 대상 = 감독·소유 연결 + 브랜드 주인 + 푸드코트 주인 (사람당 한 줄). */
async function getInquiryTargets(restaurantData) {
  const out = new Map();
  for (const m of restaurantData.managers || []) {
    if (m.role === 'Restaurant Admin' || m.role === 'Staff') continue;
    out.set(String(m.id), toTarget(m, m.RestaurantManager?.is_primary));
  }
  const attrs = ['id', 'full_name', 'username', 'email', 'role', 'company_name', 'phone', 'is_active'];
  const owners = [];
  if (restaurantData.brand_id) {
    const b = await Brand.findByPk(restaurantData.brand_id, { attributes: ['owner_id'] });
    if (b?.owner_id) owners.push({ id: b.owner_id, role: 'Brand General' });
  }
  if (restaurantData.foodcourt_id) {
    const f = await Foodcourt.findByPk(restaurantData.foodcourt_id, { attributes: ['owner_id'] });
    if (f?.owner_id) owners.push({ id: f.owner_id, role: 'Foodcourt General' });
  }
  for (const o of owners) {
    if (out.has(String(o.id))) continue;
    const u = await User.findByPk(o.id, { attributes: attrs });
    // 주인 칸에 남은 옛 계정(역할이 바뀌었거나 꺼진 계정)은 받을 수 없으니 뺀다
    if (u && u.role === o.role && u.is_active !== false) out.set(String(u.id), toTarget(u));
  }
  return [...out.values()];
}

/** 받은편지함: 이 브랜드/푸드코트 사람이 문의를 받는 매장 id 들 (연결표 줄 + 주인인 브랜드·푸드코트 매장). */
async function getInboxRestaurantIds(userId, kind) {
  const linked = await RestaurantManager.findAll({ where: { manager_id: userId }, attributes: ['restaurant_id'] });
  const ids = new Set(linked.map(r => Number(r.restaurant_id)));
  const OwnerModel = kind === 'brand' ? Brand : Foodcourt;
  const fk = kind === 'brand' ? 'brand_id' : 'foodcourt_id';
  const owned = await OwnerModel.findAll({ where: { owner_id: userId }, attributes: ['id'] });
  if (owned.length > 0) {
    const rs = await Restaurant.findAll({ where: { [fk]: { [Op.in]: owned.map(o => o.id) } }, attributes: ['id'] });
    rs.forEach(r => ids.add(Number(r.id)));
  }
  return [...ids];
}

module.exports = { getInquiryTargets, getInboxRestaurantIds };
