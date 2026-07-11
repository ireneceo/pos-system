/**
 * 임대료 청구 실증 — demo 계약에 임대 조건 입력 → 발행 → 멱등 → 현황 조회 → IDOR → 정리.
 */
require('dotenv').config({ quiet: true });
const jwt = require('jsonwebtoken');
const http = require('http');
const { User, Contract, Invoice, InvoiceItem, Restaurant, Foodcourt } = require('./models');
const rentBilling = require('./services/rentBilling');

const call = (m, p, { token, body } = {}) => new Promise((res, rej) => {
  const d = body ? JSON.stringify(body) : null;
  const h = { 'Content-Type': 'application/json' };
  if (token) h.Authorization = 'Bearer ' + token;
  if (d) h['Content-Length'] = Buffer.byteLength(d);
  const r = http.request({ hostname: 'localhost', port: 3001, path: p, method: m, headers: h }, (x) => {
    let s = ''; x.on('data', c => (s += c));
    x.on('end', () => { let j = {}; try { j = JSON.parse(s); } catch {} res({ code: x.statusCode, json: j }); });
  });
  r.on('error', rej); if (d) r.write(d); r.end();
});

let pass = 0, fail = 0;
const ck = (n, ok, d = '') => { ok ? pass++ : fail++; console.log((ok ? '  ✓ ' : '  ✗ ') + n + (d ? ' — ' + d : '')); };

(async () => {
  const admin = await User.findOne({ where: { role: 'System Admin' } });
  const fc = await User.findOne({ where: { role: 'Foodcourt General', foodcourt_id: { [require('sequelize').Op.ne]: null } } });
  const adminTok = jwt.sign({ userId: admin.id }, process.env.JWT_SECRET, { expiresIn: '10m' });
  const fcTok = jwt.sign({ userId: fc.id }, process.env.JWT_SECRET, { expiresIn: '10m' });

  // 테스트 계약: 그 푸드코트 소속 매장 하나를 임차인으로
  const tenant = await Restaurant.findOne({ where: { foodcourt_id: fc.foodcourt_id } });
  const contract = await Contract.create({
    entity_type: 'foodcourt', entity_id: fc.foodcourt_id,
    restaurant_id: tenant.id, stage: 'active', currency: 'MYR',
    applicant_company_name: '__RENT_TEST__',
    financial_terms: { base_rent: 3000, maintenance_fee: 200, billing_day: 1, grace_days: 5 },
    end_date: new Date(Date.now() + 365 * 86400000),
  });
  const month = rentBilling.currentMonth();
  console.log(`[준비] 계약 #${contract.id} (푸드코트 ${fc.foodcourt_id} → 매장 ${tenant.name}) · 임대료 3000 + 관리비 200 · ${month}`);

  try {
    // 1) 발행
    const g1 = await call('POST', '/api/rent/generate', { token: adminTok, body: { month, contractId: contract.id } });
    ck('임대료 청구서 발행 200', g1.code === 200 && g1.json.data?.generated === 1, JSON.stringify(g1.json.data));

    const inv = await Invoice.findOne({ where: { contract_id: contract.id, invoice_category: 'rent' } });
    ck('인보이스 생성 + 금액 = 기본임대료 + 관리비', !!inv && Number(inv.total_amount) === 3200, `total=${inv?.total_amount}`);
    ck('발행자=임대사업자(푸드코트) · 수취자=임차 매장', inv?.issuer_type === 'foodcourt' && Number(inv?.issuer_id) === fc.foodcourt_id && inv?.payer_type === 'restaurant' && Number(inv?.payer_id) === tenant.id,
      `${inv?.issuer_type}#${inv?.issuer_id} → ${inv?.payer_type}#${inv?.payer_id}`);
    const items = await InvoiceItem.count({ where: { invoice_id: inv.id } });
    ck('명세 항목 2건(기본임대료·관리비)', items === 2, `${items}건`);
    ck('납기일 = 청구일 + 유예일 (5일)', new Date(inv.due_date).getUTCDate() === 6, String(inv.due_date).slice(0, 10));

    // 2) 멱등 — 다시 발행해도 1장
    const g2 = await call('POST', '/api/rent/generate', { token: adminTok, body: { month, contractId: contract.id } });
    const cnt = await Invoice.count({ where: { contract_id: contract.id, invoice_category: 'rent' } });
    ck('재발행해도 중복 0 (한 달 정확히 1장)', g2.json.data?.generated === 0 && g2.json.data?.skipped === 1 && cnt === 1, `skipped=${g2.json.data?.skipped} 총 ${cnt}장`);

    // 3) 현황 조회 (운영자 스코프)
    const t = await call('GET', '/api/rent/tenants', { token: fcTok });
    const row = (t.json.data || []).find(r => r.contractId === contract.id);
    ck('운영자 임대 현황에 노출', t.code === 200 && !!row, `${(t.json.data || []).length}건`);
    // 납기일이 이미 지났으면 overdue 가 정상(연체 판정). 아직이면 pending.
    const dueGone = row?.dueDate && new Date(row.dueDate).getTime() < Date.now();
    ck('현황 값 = 실데이터(임대료·상태·청구서)', row?.totalMonthly === 3200 && row?.status === (dueGone ? 'overdue' : 'pending') && row?.lastInvoice?.amount === 3200,
      `월 ${row?.totalMonthly} · 상태 ${row?.status} · 청구서 ${row?.lastInvoice?.number}`);

    const sum = await call('GET', '/api/rent/summary', { token: fcTok });
    ck('요약 통계 반영', sum.code === 200 && sum.json.data?.totalTenants >= 1 && sum.json.data?.monthlyRentTotal >= 3200,
      `임차인 ${sum.json.data?.totalTenants} · 월임대료 합 ${sum.json.data?.monthlyRentTotal}`);

    // 4) IDOR — 다른 운영자(브랜드 총괄)는 이 계약을 못 본다
    const bg = await User.findOne({ where: { role: 'Brand General' } });
    const bgTok = jwt.sign({ userId: bg.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const other = await call('GET', '/api/rent/tenants', { token: bgTok });
    const leaked = (other.json.data || []).some(r => r.contractId === contract.id);
    ck('IDOR: 다른 운영자에게 노출 0', !leaked);

    // 5) 권한 — 임차 매장 관리자는 발행 불가
    const ra = await User.findOne({ where: { role: 'Restaurant Admin' } });
    const raTok = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const forbidden = await call('POST', '/api/rent/generate', { token: raTok, body: { month } });
    ck('임차인은 청구서 발행 불가 (403)', forbidden.code === 403, `HTTP ${forbidden.code}`);

    // 6) 계약 종료 → 청구 중단
    await contract.update({ stage: 'terminated' });
    const nextMonth = month === '2026-12' ? '2027-01' : `${month.slice(0, 4)}-${String(Number(month.slice(5)) + 1).padStart(2, '0')}`;
    const g3 = await call('POST', '/api/rent/generate', { token: adminTok, body: { month: nextMonth, contractId: contract.id } });
    ck('계약 종료 시 청구 중단', g3.json.data?.generated === 0, `generated=${g3.json.data?.generated}`);

    // 7) 검증 — 청구일 29~31 거부
    let rejected = false;
    try { await contract.update({ financial_terms: { base_rent: 100, billing_day: 31 } }); }
    catch (e) { rejected = /billing_day/.test(e.message); }
    ck('청구일 29~31 거부 (월말 사고 방지)', rejected);
  } finally {
    const invs = await Invoice.findAll({ where: { contract_id: contract.id }, attributes: ['id'], raw: true });
    if (invs.length) await InvoiceItem.destroy({ where: { invoice_id: invs.map(i => i.id) } });
    await Invoice.destroy({ where: { contract_id: contract.id }, force: true });
    await Contract.destroy({ where: { id: contract.id }, force: true });
    const left = await Contract.count({ where: { applicant_company_name: '__RENT_TEST__' } });
    console.log(`[정리] 테스트 계약 잔여 ${left}건`);
  }

  console.log(`\n결과: ${pass} 통과 / ${fail} 실패 → ${fail === 0 ? 'PASS' : 'FAIL'}`);
  process.exit(fail === 0 ? 0 : 1);
})().catch(e => { console.error('ERROR', e.message); process.exit(1); });
