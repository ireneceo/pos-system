require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Order = require('./models/Order');

const BASE = 'http://localhost:3001/api';

async function api(method, path, body, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(BASE + path, {
    method, headers,
    body: body ? JSON.stringify(body) : undefined
  });
  let json = {};
  try { json = await res.json(); } catch (_e) {}
  return { status: res.status, ok: res.ok, json };
}

async function main() {
  const ra = await User.findOne({ where: { role: 'Restaurant Admin' } });
  if (!ra) { console.error('no RA found'); process.exit(1); }
  const token = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
  console.log('RA:', ra.username || ra.email, 'restaurant_id=', ra.restaurant_id);

  const list = await api('GET', '/orders?limit=20', null, token);
  if (!list.ok) { console.error('GET /orders failed', list.status, list.json); process.exit(1); }
  const orders = list.json.data || list.json;
  if (!orders.length) { console.error('no orders'); process.exit(0); }

  const o = orders.find(x => ['pending','preparing','ready','served'].includes(x.status)) || orders[0];
  console.log('order id=', o.id, 'status=', o.status);
  const origStatus = o.status;

  // T1: status_change pending↔preparing
  const newStatus = origStatus === 'preparing' ? 'pending' : 'preparing';
  const c1 = await api('PATCH', `/orders/${o.id}/status`, { status: newStatus }, token);
  console.log(`T1 PATCH status→${newStatus}: ok=${c1.ok}`);

  // T2: action history
  const h1 = await api('GET', `/orders/${o.id}/actions`, null, token);
  console.log(`T2 GET /actions: ok=${h1.ok} count=${(h1.json.data || []).length}`);
  (h1.json.data || []).slice(-5).forEach(a => {
    console.log(`   [${a.action_type}] ${a.from_status || '-'}→${a.to_status || '-'} by ${a.performed_by_name} (${a.performed_by_role}/${a.source})${a.reason ? ' — ' + a.reason : ''}`);
  });

  // T3: 권한 격리 — 다른 restaurant 의 order 조회 시 403
  // (best-effort: 만약 restaurant_id 가 다른 order 가 다른 RA 라면 — 여기서는 skip if hard)

  // Restore
  await api('PATCH', `/orders/${o.id}/status`, { status: origStatus }, token);
  console.log('Restored to', origStatus);
}
main().catch(e => { console.error(e); process.exit(1); });
