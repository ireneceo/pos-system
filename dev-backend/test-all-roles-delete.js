const { sequelize } = require('./config/database');
const User = require('./models/User');
const Restaurant = require('./models/Restaurant');
const Brand = require('./models/Brand');
const Foodcourt = require('./models/Foodcourt');
const Invoice = require('./models/Invoice');
const InvoiceItem = require('./models/InvoiceItem');
const Order = require('./models/Order');
const RestaurantManager = require('./models/RestaurantManager');
const ActivityLog = require('./models/ActivityLog');
const OperationTicket = require('./models/OperationTicket');
const Comment = require('./models/Comment');
const Notice = require('./models/Notice');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const BASE = 'http://localhost:3001/api';
async function api(m, u, b, t) {
  const o = { method: m, headers: { 'Content-Type': 'application/json' } };
  if (t) o.headers['Authorization'] = 'Bearer ' + t;
  if (b) o.body = JSON.stringify(b);
  const r = await fetch(BASE + u, o);
  const d = await r.json().catch(() => ({}));
  return { s: r.status, d };
}

async function run() {
  await sequelize.authenticate();
  const admin = await User.findOne({ where: { username: 'admin' } });
  const token = jwt.sign({ id: admin.id, username: admin.username, role: admin.role }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });
  const pw = await bcrypt.hash('TestPass123!', 10);
  const ts = Date.now();
  let pass = 0, fail = 0;
  function ok(n, v) { if (v) { pass++; console.log('  ✅ ' + n); } else { fail++; console.log('  ❌ ' + n); } }

  // ============================================================
  // T1: Staff (Admin/StaffManagementPage → DELETE /api/users/:id)
  // ============================================================
  console.log('\n[T1] Staff Delete — with activity_log + order cashier refs');
  const s1 = await User.create({ username: 'ard_staff_'+ts, full_name: 'ARD Staff', email: 'ard_staff_'+ts+'@g.com', password: pw, role: 'Staff', restaurant_id: 8, pin: '3311', status: 'active' });
  // 연관 데이터 생성
  await ActivityLog.create({ user_id: s1.id, username: s1.username, action_type: 'create', entity_type: 'order', entity_id: 1, description: 'test', restaurant_id: 8 });
  await Order.update({ cashier_id: s1.id }, { where: { id: 1 } }); // 임시 — 나중에 복원
  const r1 = await api('DELETE', '/users/' + s1.id, null, token);
  ok('API success', r1.d.success);
  ok('User gone', !(await User.findByPk(s1.id)));
  const al1 = await ActivityLog.findOne({ where: { username: s1.username } });
  ok('ActivityLog preserved (user_id=null)', al1 && al1.user_id === null);
  // 복원
  await Order.update({ cashier_id: null }, { where: { id: 1 } });
  if (al1) await al1.destroy();

  // ============================================================
  // T2: Restaurant Admin (Admin/StaffManagementPage → DELETE /api/users/:id)
  // ============================================================
  console.log('\n[T2] Restaurant Admin Delete — restaurant remains');
  const rest2 = await Restaurant.create({ name: 'ARD Rest '+ts, status: 'active', plan_type: 'Starter', billing_cycle: 'monthly', currency: 'MYR' });
  const ra2 = await User.create({ username: 'ard_ra_'+ts, full_name: 'ARD RA', email: 'ard_ra_'+ts+'@g.com', password: pw, role: 'Restaurant Admin', restaurant_id: rest2.id, status: 'active' });
  await rest2.update({ admin_id: ra2.id, admin_name: ra2.full_name });
  const r2 = await api('DELETE', '/users/' + ra2.id, null, token);
  ok('API success', r2.d.success);
  const c2 = await Restaurant.findByPk(rest2.id);
  ok('Restaurant exists, admin_id=null', c2 && c2.admin_id === null);
  await api('DELETE', '/restaurants/' + rest2.id, null, token); // cleanup

  // ============================================================
  // T3: Brand General (Admin/ManagersPage → DELETE /api/users/:id)
  // ============================================================
  console.log('\n[T3] Brand General Delete — with brand, restaurants, tickets, comments, notices');
  const bg3 = await User.create({ username: 'ard_bg_'+ts, full_name: 'ARD BG', email: 'ard_bg_'+ts+'@g.com', password: pw, role: 'Brand General', company_name: 'ARD Corp', status: 'active' });
  const br3 = await Brand.create({ name: 'ARD Brand '+ts, owner_id: bg3.id });
  await RestaurantManager.create({ restaurant_id: 8, manager_id: bg3.id, is_primary: false, relationship_type: 'oversight' });
  await Comment.create({ entity_type: 'ticket', entity_id: 1, author_id: bg3.id, author_name: bg3.full_name, author_role: 'Brand General', content: 'test comment' });
  await Notice.create({ title: 'test notice', content: 'test', type: 'announcement', author_id: bg3.id, author_name: bg3.full_name, author_role: 'Brand General', target_roles: '["Brand General"]' });
  const r3 = await api('DELETE', '/users/' + bg3.id, null, token);
  ok('API success', r3.d.success);
  ok('User gone', !(await User.findByPk(bg3.id)));
  const c3b = await Brand.findByPk(br3.id);
  ok('Brand exists, owner_id=null', c3b && c3b.owner_id === null);
  const c3rm = await RestaurantManager.findOne({ where: { manager_id: bg3.id } });
  ok('RestaurantManager removed', !c3rm);
  const c3cm = await Comment.findOne({ where: { content: 'test comment', author_name: 'ARD BG' } });
  ok('Comment preserved, author_id=null', c3cm && c3cm.author_id === null);
  // cleanup
  if (c3b) await c3b.destroy();
  if (c3cm) await c3cm.destroy();
  await sequelize.query("DELETE FROM notices WHERE title='test notice' AND author_name='ARD BG'");

  // ============================================================
  // T4: Foodcourt General (Admin/ManagersPage → DELETE /api/users/:id)
  // ============================================================
  console.log('\n[T4] Foodcourt General Delete — with foodcourt, restaurant_managers');
  const fg4 = await User.create({ username: 'ard_fg_'+ts, full_name: 'ARD FG', email: 'ard_fg_'+ts+'@g.com', password: pw, role: 'Foodcourt General', company_name: 'ARD FC', status: 'active' });
  const fc4 = await Foodcourt.create({ name: 'ARD FC '+ts, owner_id: fg4.id });
  await RestaurantManager.create({ restaurant_id: 8, manager_id: fg4.id, is_primary: false, relationship_type: 'oversight' });
  const r4 = await api('DELETE', '/users/' + fg4.id, null, token);
  ok('API success', r4.d.success);
  const c4f = await Foodcourt.findByPk(fc4.id);
  ok('Foodcourt exists, owner_id=null', c4f && c4f.owner_id === null);
  ok('RestaurantManager removed', !(await RestaurantManager.findOne({ where: { manager_id: fg4.id } })));
  if (c4f) await c4f.destroy();

  // ============================================================
  // T5: Restaurant Owner (Admin/ManagersPage → DELETE /api/users/:id)
  // ============================================================
  console.log('\n[T5] Restaurant Owner Delete — with ownership links');
  const ro5 = await User.create({ username: 'ard_ro_'+ts, full_name: 'ARD Owner', email: 'ard_ro_'+ts+'@g.com', password: pw, role: 'Restaurant Owner', company_name: 'ARD Own', status: 'active' });
  await RestaurantManager.create({ restaurant_id: 8, manager_id: ro5.id, is_primary: false, relationship_type: 'ownership' });
  const r5 = await api('DELETE', '/users/' + ro5.id, null, token);
  ok('API success', r5.d.success);
  ok('Ownership link removed', !(await RestaurantManager.findOne({ where: { manager_id: ro5.id } })));

  // ============================================================
  // T6: Brand Manager (Admin/ManagersPage → DELETE /api/users/:id)
  // ============================================================
  console.log('\n[T6] Brand Manager Delete');
  const bm6 = await User.create({ username: 'ard_bm_'+ts, full_name: 'ARD BM', email: 'ard_bm_'+ts+'@g.com', password: pw, role: 'Brand Manager', company_name: 'ARD BM Corp', status: 'active' });
  const r6 = await api('DELETE', '/users/' + bm6.id, null, token);
  ok('API success', r6.d.success);

  // ============================================================
  // T7: Foodcourt Manager (Admin/ManagersPage → DELETE /api/users/:id)
  // ============================================================
  console.log('\n[T7] Foodcourt Manager Delete');
  const fm7 = await User.create({ username: 'ard_fm_'+ts, full_name: 'ARD FM', email: 'ard_fm_'+ts+'@g.com', password: pw, role: 'Foodcourt Manager', company_name: 'ARD FM Corp', status: 'active' });
  const r7 = await api('DELETE', '/users/' + fm7.id, null, token);
  ok('API success', r7.d.success);

  // ============================================================
  // T8: Restaurant Delete — full cascade (orders, invoices, invoice_items, activity_logs, kitchen_stations, import_history)
  // ============================================================
  console.log('\n[T8] Restaurant Delete — full cascade with invoices+items');
  const rest8 = await Restaurant.create({ name: 'ARD Rest8 '+ts, status: 'active', plan_type: 'Starter', billing_cycle: 'monthly', currency: 'MYR' });
  const ord8 = await Order.create({ restaurant_id: rest8.id, order_number: 'ARD-'+ts, total_amount: 50, order_type: 'dine_in', status: 'completed', payment_method: 'cash', items: '[]' });
  const inv8 = await Invoice.create({ restaurant_id: rest8.id, invoice_number: 'INV-ARD-'+ts, total_amount: 149, status: 'draft', due_date: new Date(), billing_period_start: new Date(), billing_period_end: new Date(), issuer_type: 'system_admin', issuer_id: admin.id, issued_by: admin.id, currency: 'MYR' });
  const ii8 = await InvoiceItem.create({ invoice_id: inv8.id, description: 'POS Subscription', amount: 149, item_type: 'plan_fee', quantity: 1, unit_price: 149, calculated_amount: 149, total_amount: 149 });
  await ActivityLog.create({ user_id: admin.id, username: admin.username, action_type: 'create', entity_type: 'restaurant', entity_id: rest8.id, description: 'test', restaurant_id: rest8.id });
  const r8 = await api('DELETE', '/restaurants/' + rest8.id, null, token);
  ok('API success', r8.d.success);
  ok('Restaurant gone', !(await Restaurant.findByPk(rest8.id)));
  ok('Order gone', !(await Order.findByPk(ord8.id)));
  ok('Invoice gone', !(await Invoice.findByPk(inv8.id)));
  ok('InvoiceItem gone', !(await InvoiceItem.findByPk(ii8.id)));

  // ============================================================
  // T9: Auth guard — no token
  // ============================================================
  console.log('\n[T9] Auth Guard');
  const r9a = await api('DELETE', '/users/1', null, null);
  ok('User delete blocked (401)', r9a.s === 401);
  const r9b = await api('DELETE', '/restaurants/1', null, null);
  ok('Restaurant delete blocked (401)', r9b.s === 401);

  // ============================================================
  // T10: Role guard — non-System Admin can't delete
  // ============================================================
  console.log('\n[T10] Role Guard — Brand General can\'t delete users/restaurants');
  const bgUser = await User.create({ username: 'ard_bgtest_'+ts, full_name: 'ARD BG Test', email: 'ard_bgtest_'+ts+'@g.com', password: pw, role: 'Brand General', company_name: 'Test', status: 'active' });
  const bgToken = jwt.sign({ id: bgUser.id, username: bgUser.username, role: bgUser.role }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });
  const r10a = await api('DELETE', '/users/999', null, bgToken);
  ok('User delete blocked for BG (403)', r10a.s === 403);
  const r10b = await api('DELETE', '/restaurants/999', null, bgToken);
  ok('Restaurant delete blocked for BG (403)', r10b.s === 403);
  await api('DELETE', '/users/' + bgUser.id, null, token); // cleanup

  console.log('\n========================================');
  console.log('  TOTAL: ' + pass + ' passed, ' + fail + ' failed');
  console.log('========================================');
  process.exit(fail > 0 ? 1 : 0);
}
run().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
