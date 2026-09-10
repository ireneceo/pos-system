/**
 * 읽기 전용 (2026-09-10) — Fable 요청 실측 b, d.
 * ⛔ SELECT 만. 쓰기 없음.
 */
require('../models');
const { sequelize } = require('../config/database');
const q = (s, r) => sequelize.query(s, { type: sequelize.QueryTypes.SELECT, replacements: r });

(async () => {
  const db = (await q('SELECT DATABASE() db'))[0].db;
  console.log(`\n=== DB: ${db} ===`);

  // ---------- b. BG 브랜드 범위 두 규칙 비교 ----------
  console.log('\n### b. Brand General 브랜드 범위 — 두 규칙 비교');
  const bgs = await q(`
    SELECT u.id, u.username, u.email, u.role, u.brand_id, u.is_active, u.is_test
      FROM users u
     WHERE u.role IN ('Brand General','Brand Manager')
     ORDER BY u.role, u.id`);
  console.log(`대상 계정 ${bgs.length}명\n`);

  for (const u of bgs) {
    const owned = (await q('SELECT id FROM brands WHERE owner_id = :uid', { uid: u.id })).map(r => r.id);
    // 소유 ∪ 배정  (managerBrandScope / brandScope)
    const setA = new Set(owned);
    if (u.brand_id) {
      const ex = await q('SELECT id FROM brands WHERE id = :b', { b: u.brand_id });
      if (ex.length) setA.add(ex[0].id);
    }
    // 소유 ∪ 소속 ∪ 형제  (sellerScope)
    const setB = new Set(owned);
    if (u.brand_id) {
      setB.add(parseInt(u.brand_id, 10));
      const home = await q('SELECT id, owner_id FROM brands WHERE id = :b', { b: u.brand_id });
      if (home.length && home[0].owner_id) {
        (await q('SELECT id FROM brands WHERE owner_id = :o', { o: home[0].owner_id }))
          .forEach(r => setB.add(r.id));
      }
    }
    const a = [...setA].sort((x, y) => x - y);
    const b = [...setB].sort((x, y) => x - y);
    const diff = b.filter(x => !setA.has(x));
    const flag = diff.length ? '  🔴 불일치' : '';
    console.log(`  #${String(u.id).padStart(3)} ${String(u.role).padEnd(14)} ${String(u.email || u.username).padEnd(34)} brand_id=${String(u.brand_id ?? '-').padEnd(4)} 소유=${owned.length} active=${u.is_active} is_test=${u.is_test}`);
    console.log(`        소유∪배정(주문·리포트) = [${a.join(',')}]   소유∪소속∪형제(발주) = [${b.join(',')}]${flag}${diff.length ? '  차이=[' + diff.join(',') + ']' : ''}`);
  }

  // 소속만 있고 소유 0 인 BG
  const onlyAssigned = [];
  for (const u of bgs) {
    const owned = (await q('SELECT id FROM brands WHERE owner_id = :uid', { uid: u.id })).map(r => r.id);
    if (owned.length === 0 && u.brand_id) onlyAssigned.push(u);
  }
  console.log(`\n  → 소속만 있고 소유 0 인 계정: ${onlyAssigned.length}명 ${onlyAssigned.map(u => '#' + u.id + ' ' + (u.email || u.username) + '(' + u.role + ')').join(', ') || '(없음)'}`);

  // 브랜드 소유 구조
  console.log('\n  브랜드 소유 구조:');
  const brands = await q(`SELECT b.id, b.name, b.owner_id, u.email owner_email
                            FROM brands b LEFT JOIN users u ON u.id = b.owner_id ORDER BY b.id`);
  for (const b of brands) console.log(`    브랜드 ${String(b.id).padStart(3)} ${String(b.name).padEnd(28)} owner=${b.owner_id} (${b.owner_email || '-'})`);

  // ---------- d. 발주 청구서 16장 날짜 ----------
  console.log('\n\n### d. 발주 청구서 — id · issued_at · due_date · PO received_at');
  const rows = await q(`
    SELECT i.id inv_id, i.invoice_number, i.invoice_category, i.status,
           i.issued_at, i.due_date, i.total_amount, i.currency,
           po.id po_id, po.po_number, po.seller_type, po.seller_entity_id,
           po.received_at, po.submitted_at, po.created_at po_created,
           CASE WHEN sc.id IS NULL THEN '브랜드/FC'
                WHEN sc.is_system_registered = 1 THEN '가입공급업체'
                ELSE '외부공급업체' END seller_kind,
           sc.name seller_name,
           DATEDIFF(i.due_date, i.issued_at) due_gap,
           DATEDIFF(DATE(i.issued_at), DATE(po.received_at)) issued_vs_received
      FROM invoices i
      JOIN purchase_orders po ON po.trade_invoice_id = i.id
      LEFT JOIN supplier_companies sc ON sc.id = po.seller_entity_id AND po.seller_type = 'supplier'
     WHERE i.invoice_category = 'trade'
     ORDER BY i.id`);
  console.log(`총 ${rows.length}장\n`);
  for (const r of rows) {
    console.log(`  inv#${String(r.inv_id).padStart(4)} ${String(r.invoice_number).padEnd(26)} ${r.seller_kind.padEnd(12)} ${String(r.status).padEnd(16)} ${String(r.total_amount).padStart(9)} ${r.currency}`);
    console.log(`        issued=${r.issued_at ? new Date(r.issued_at).toISOString().slice(0,10) : 'NULL'}  due=${r.due_date ? new Date(r.due_date).toISOString().slice(0,10) : 'NULL'}  gap=${r.due_gap}d  |  PO#${r.po_id} ${r.po_number} received=${r.received_at ? new Date(r.received_at).toISOString().slice(0,10) : 'NULL'}  submitted=${r.submitted_at ? new Date(r.submitted_at).toISOString().slice(0,10) : 'NULL'}  issued-received=${r.issued_vs_received}d  판매자=${r.seller_name || r.seller_type + ':' + r.seller_entity_id}`);
  }

  // 마이그 조건식 후보 검증
  console.log('\n  마이그 조건식 후보 (trade · 외부공급업체 · pending_payment · due = issued+15d):');
  const target = rows.filter(r => r.seller_kind === '외부공급업체' && r.status === 'pending_payment' && r.due_gap === 15);
  console.log(`    → 해당 ${target.length}장 : ${target.map(r => r.inv_id).join(', ')}`);
  const nonTarget = rows.filter(r => !(r.seller_kind === '외부공급업체' && r.status === 'pending_payment' && r.due_gap === 15));
  console.log(`    → 비대상 ${nonTarget.length}장 : ${nonTarget.map(r => `#${r.inv_id}(${r.seller_kind}/${r.status}/gap${r.due_gap})`).join(', ')}`);

  // 크레딧노트 현황
  const cn = await q(`SELECT id, invoice_number, status, invoice_category, total_amount, issued_at, due_date
                        FROM invoices WHERE invoice_category = 'credit_note' ORDER BY id`);
  console.log(`\n  크레딧노트(invoice_category='credit_note'): ${cn.length}건`);
  for (const c of cn) console.log(`    #${c.id} ${c.invoice_number} status=${c.status} ${c.total_amount} issued=${c.issued_at ? new Date(c.issued_at).toISOString().slice(0,10) : '-'} due=${c.due_date ? new Date(c.due_date).toISOString().slice(0,10) : '-'}`);

  // due_date NULL 가능 여부
  const col = await q(`SELECT COLUMN_NAME, IS_NULLABLE, COLUMN_TYPE FROM information_schema.COLUMNS
                        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME='invoices' AND COLUMN_NAME IN ('due_date','issued_at')`);
  console.log('\n  invoices 컬럼:');
  for (const c of col) console.log(`    ${c.COLUMN_NAME} ${c.COLUMN_TYPE} NULL허용=${c.IS_NULLABLE}`);

  await sequelize.close();
})().catch(e => { console.error('ERROR', e.message); process.exit(1); });
