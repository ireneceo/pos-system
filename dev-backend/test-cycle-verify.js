require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Order = require('./models/Order');
const OrderAction = require('./models/OrderAction');
const BASE = 'http://localhost:3001/api';

async function api(method, path, body, token, expectedOk=true) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(BASE + path, {
    method, headers, body: body ? JSON.stringify(body) : undefined
  });
  const json = await res.json().catch(() => ({}));
  const passed = expectedOk ? res.ok : !res.ok;
  return { status: res.status, ok: res.ok, json, passed };
}

function pass(name) { console.log(`  ✓ ${name}`); }
function fail(name, detail) { console.log(`  ✗ ${name}`); if (detail) console.log('    ', detail); }

async function main() {
  const ra = await User.findOne({ where: { role: 'Restaurant Admin' } });
  if (!ra) { console.error('no RA'); process.exit(1); }
  const raToken = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });

  // Different restaurant for cross-access test
  const otherRa = await User.findOne({ where: { role: 'Restaurant Admin' } , order: [['id','DESC']]});
  // Same RA if only one — skip cross check
  const otherToken = otherRa ? jwt.sign({ userId: otherRa.id }, process.env.JWT_SECRET, { expiresIn: '5m' }) : null;

  console.log('\n[T1] GET /orders/:id/actions — restaurant scoped audit history');
  const list = await api('GET', '/orders?limit=10', null, raToken);
  const orders = list.json.data || list.json;
  if (!orders.length) { console.log('  ⊘ no orders to test'); process.exit(0); }

  const o = orders.find(x => ['pending','preparing','ready','served'].includes(x.status)) || orders[0];
  const origStatus = o.status;

  // status_change → audit log
  const newStatus = origStatus === 'preparing' ? 'pending' : 'preparing';
  const r1 = await api('PATCH', `/orders/${o.id}/status`, { status: newStatus }, raToken);
  r1.ok ? pass(`status change pending↔preparing (HTTP ${r1.status})`) : fail('status change', r1.json);

  // small wait for async audit insert
  await new Promise(r => setTimeout(r, 200));

  const h1 = await api('GET', `/orders/${o.id}/actions`, null, raToken);
  if (h1.ok && Array.isArray(h1.json.data) && h1.json.data.length > 0) {
    pass(`GET /actions count=${h1.json.data.length}`);
    const last = h1.json.data[h1.json.data.length - 1];
    console.log(`     last → [${last.action_type}] ${last.from_status}→${last.to_status} by ${last.performed_by_name} (${last.performed_by_role}/${last.source})`);
  } else fail('GET /actions', h1.json);

  // Restore
  await api('PATCH', `/orders/${o.id}/status`, { status: origStatus }, raToken);

  console.log('\n[T2] KDS source — req.body.source="kds" → audit source=kds');
  const r2 = await api('PATCH', `/orders/${o.id}/status`, { status: newStatus, source: 'kds', kds_staff_id: ra.id, kds_staff_name: 'Test KDS Staff' }, raToken);
  r2.ok ? pass('PATCH with kds_staff fields') : fail('PATCH kds', r2.json);
  await new Promise(r => setTimeout(r, 200));
  const h2 = await api('GET', `/orders/${o.id}/actions`, null, raToken);
  const last2 = h2.json.data[h2.json.data.length - 1];
  if (last2.source === 'kds' && last2.performed_by_name === 'Test KDS Staff') {
    pass(`audit recorded as source=kds, by="${last2.performed_by_name}"`);
  } else fail('audit identity', `source=${last2.source} name=${last2.performed_by_name}`);
  await api('PATCH', `/orders/${o.id}/status`, { status: origStatus }, raToken);

  console.log('\n[T3] Cancellation reason graceful fallback');
  // Find a cancellable order or use current
  const cancelTarget = orders.find(x => ['pending','preparing'].includes(x.status));
  if (cancelTarget) {
    const wasStatus = cancelTarget.status;
    const r3 = await api('PATCH', `/orders/${cancelTarget.id}/status`, { status: 'cancelled' }, raToken);
    if (r3.ok) {
      pass('cancel without reason — accepted (graceful)');
      await new Promise(r => setTimeout(r, 200));
      const h3 = await api('GET', `/orders/${cancelTarget.id}/actions`, null, raToken);
      const cancelAct = (h3.json.data || []).reverse().find(a => a.action_type === 'cancelled');
      if (cancelAct && cancelAct.reason) {
        pass(`audit reason set: "${cancelAct.reason}"`);
      } else fail('audit reason fallback', cancelAct);
      // Restore
      await api('PATCH', `/orders/${cancelTarget.id}/status`, { status: wasStatus }, raToken);
    } else fail('cancel', r3.json);
  } else console.log('  ⊘ no pending order to test cancellation');

  console.log('\n[T4] Restaurant access guard — other RA cannot view this order actions');
  if (otherRa && otherRa.restaurant_id !== ra.restaurant_id) {
    const r4 = await api('GET', `/orders/${o.id}/actions`, null, otherToken, false);
    r4.status === 403 ? pass(`other RA blocked (HTTP 403)`) : fail('cross-restaurant guard', `status=${r4.status}`);
  } else console.log('  ⊘ only one RA in dev, skipping cross-restaurant test');

  console.log('\n[T5] Verify OrderAction model table row count baseline');
  const totalActions = await OrderAction.count();
  pass(`order_actions total rows = ${totalActions}`);

  console.log('\nAll cycle API tests done.\n');
}
main().catch(e => { console.error(e); process.exit(1); });
