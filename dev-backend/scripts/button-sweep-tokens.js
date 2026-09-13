#!/usr/bin/env node
/**
 * 버튼 전수검사용 역할 토큰 조달 (읽기 전용 — 계정 무변경·비밀번호 불필요).
 * verify-all.js 의 signTokenForDemoKey / signRoleToken 과 **동일한 방식**을 쓴다.
 * 출력: JSON 한 줄 { ra, bg, fg, owner, supplier, admin, bm, fcm, ra_rid, bg_brand_id }
 */
const path = require('path');
try { require('dotenv').config({ path: path.resolve(__dirname, '../.env'), quiet: true }); } catch { /* optional */ }

async function signForEmail(email) {
  const jwt = require('jsonwebtoken');
  const { User } = require('../models');
  const { sequelize } = require('../config/database');
  if (!email || !process.env.JWT_SECRET) return null;
  const user = await User.findOne({
    where: sequelize.where(sequelize.fn('LOWER', sequelize.col('email')), String(email).toLowerCase())
  });
  return user ? { token: sign(user), user } : null;
}
function sign(user) {
  const jwt = require('jsonwebtoken');
  return jwt.sign({
    userId: user.id, email: user.email, role: user.role, username: user.username,
    brand_id: user.brand_id, foodcourt_id: user.foodcourt_id, restaurant_id: user.restaurant_id,
    manager_id: user.manager_id,
  }, process.env.JWT_SECRET, { expiresIn: '6h' });
}
async function signForRole(role) {
  const { User } = require('../models');
  if (!process.env.JWT_SECRET) return null;
  const user = await User.findOne({ where: { role }, order: [['id', 'ASC']] });
  return user ? { token: sign(user), user } : null;
}

(async () => {
  const { DEMO_KEY_TO_EMAIL } = require('../services/authService');
  const out = {};
  const byKey = { ra: 'test_restaurant_admin', bg: 'test_brand_general', fg: 'demo_foodcourt_general',
                  owner: 'test_restaurant_owner', supplier: 'demo_supplier_admin' };
  for (const [label, key] of Object.entries(byKey)) {
    const r = await signForEmail(DEMO_KEY_TO_EMAIL[key]);
    if (r) {
      out[label] = r.token;
      if (label === 'ra') out.ra_rid = r.user.restaurant_id;
      if (label === 'bg') out.bg_brand_id = r.user.brand_id;
    }
  }
  // 데모 매장(dev id=38) 계정 — 클릭이 일어나는 2계층은 **이 매장만** 쓴다(CLAUDE.md e2e 규칙).
  const { User } = require('../models');
  const demoRa = await User.findOne({ where: { restaurant_id: 38, role: 'Restaurant Admin' }, order: [['id', 'ASC']] });
  if (demoRa) { out.ra_demo = sign(demoRa); out.ra_demo_rid = demoRa.restaurant_id; }
  const demoStaff = await User.findOne({ where: { restaurant_id: 38, role: 'Staff' }, order: [['id', 'ASC']] });
  if (demoStaff) { out.staff_demo = sign(demoStaff); out.staff_demo_rid = demoStaff.restaurant_id; }

  for (const [label, role] of Object.entries({ admin: 'System Admin', bm: 'Brand Manager', fcm: 'Foodcourt Manager', staff: 'Staff' })) {
    const r = await signForRole(role);
    if (r) { out[label] = r.token; if (label === 'staff') out.staff_rid = r.user.restaurant_id; }
  }
  console.log(JSON.stringify(out));
  process.exit(0);
})().catch(e => { console.error('TOKEN_ERROR', e.message); process.exit(1); });
