/**
 * 읽기 전용 (2026-09-08) — "매장 통계가 화면에서 0" 신고 재현.
 * 화면(BrandPerformance/OwnerPerformance)이 부르는 GET /api/orders 를 같은 인자로 호출해
 * DB 실제 건수와 대조한다. ⛔ GET 만 한다. 쓰기 없음.
 *
 * 사용: node scripts/inspect-store-stats-zero.js <restaurantId> <YYYY-MM-DD> <YYYY-MM-DD>
 */
require('../models');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../config/database');
const q = (sql, r) => sequelize.query(sql, { type: sequelize.QueryTypes.SELECT, replacements: r });

const PORT = process.env.PORT || 3002;

(async () => {
  const rid = parseInt(process.argv[2], 10) || 10;
  const from = process.argv[3] || '2026-09-01';
  const to = process.argv[4] || '2026-09-08';

  const [r] = await q('SELECT id, name, brand_id, foodcourt_id, admin_id, status FROM restaurants WHERE id = :i', { i: rid });
  console.log(`\n매장 [${r.id}] ${r.name} · brand_id=${r.brand_id} · admin_id=${r.admin_id} · ${r.status}`);

  const db = await q(
    `SELECT COUNT(*) n,
            SUM(status IN ('completed','served')) rev_n,
            ROUND(SUM(CASE WHEN status IN ('completed','served') THEN total_amount ELSE 0 END),2) revenue,
            MIN(createdAt) first_c, MAX(createdAt) last_c,
            SUM(order_date IS NULL) no_order_date,
            SUM(DATE(order_date) <> DATE(createdAt)) date_differs
       FROM orders
      WHERE restaurant_id = :i AND createdAt BETWEEN :f AND CONCAT(:t,' 23:59:59')`,
    { i: rid, f: from, t: to });
  console.log(`DB (created_at ${from}~${to}):`, JSON.stringify(db[0]));

  // 이 매장을 보는 사람들 — 브랜드 소유자 / 매장 관리자
  const viewers = await q(
    `SELECT u.id, u.email, u.role, u.brand_id, u.restaurant_id, u.foodcourt_id
       FROM users u
      WHERE u.is_active = 1
        AND (u.restaurant_id = :i
          OR (u.role IN ('Brand General','Brand Manager') AND u.brand_id = :b)
          OR u.id = :admin)
      ORDER BY FIELD(u.role,'Brand General','Brand Manager','Restaurant Owner','Restaurant Admin'), u.id
      LIMIT 6`, { i: rid, b: r.brand_id, admin: r.admin_id });

  for (const u of viewers) {
    const token = jwt.sign(
      { userId: u.id, email: u.email, role: u.role, restaurant_id: u.restaurant_id, brand_id: u.brand_id, foodcourt_id: u.foodcourt_id },
      process.env.JWT_SECRET, { expiresIn: '10m' });
    const url = `http://localhost:${PORT}/api/orders?restaurant_id=${rid}&start_date=${from}&end_date=${to}&limit=0`;
    let line;
    try {
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const body = await res.json();
      const arr = Array.isArray(body) ? body : (body.data || body.orders || []);
      const ofThis = arr.filter(o => Number(o.restaurant_id) === rid).length;
      line = `status=${res.status} 받은주문=${arr.length} 그중_이매장=${ofThis}`;
    } catch (e) { line = `호출 실패: ${e.message}`; }
    console.log(`  [${u.role}] ${u.email} (brand_id=${u.brand_id ?? '-'} restaurant_id=${u.restaurant_id ?? '-'}) → ${line}`);
  }

  // 브랜드 소유 관계 — /api/orders 의 BG 범위는 Brand.owner_id 기준이다
  if (r.brand_id) {
    const [b] = await q('SELECT id, name, owner_id FROM brands WHERE id = :b', { b: r.brand_id });
    console.log(`\n브랜드 [${b.id}] ${b.name} · owner_id=${b.owner_id}`);
    const owned = await q('SELECT id, name FROM restaurants WHERE brand_id = :b', { b: r.brand_id });
    console.log(`  이 브랜드 매장: ${owned.map(x => x.id + ':' + x.name).join(' · ')}`);
  }
  process.exit(0);
})().catch(e => { console.error('실패:', e.message); process.exit(1); });
