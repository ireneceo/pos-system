// seed-demo-fg-rich-v3.26.js
// FC44 (demo_foodcourt_general) 의 데모 데이터 보강.
//   - foodcourt company info (tax_no, phone, address)
//   - branch is_primary 설정
//   - 12 units (다양한 stage)
//   - active contracts 2 + 보조 stage contracts 4
//   - tenant restaurants 연결 (R38, R39 → FC44)
//
// idempotent: 두 번째 실행 시 기존 시드 식별자(SEED-V326-FC44)로 매칭하여 갱신만.
require('dotenv').config();
const { sequelize } = require('../db');
const SEED_MARK = 'SEED-V326-FC44';

async function q(sql, repl = {}) { const [r] = await sequelize.query(sql, { replacements: repl }); return r; }
async function exec(sql, repl = {}) { await sequelize.query(sql, { replacements: repl }); }

(async () => {
  const FC = 44, BRANCH = 38, FP = 14;

  console.log('[1] foodcourt company info');
  await exec(`UPDATE foodcourts SET
    tax_no = COALESCE(tax_no, 'TX-DEMO-FC-001'),
    phone = COALESCE(phone, '+60 3-1234 5678'),
    email = COALESCE(email, 'info@demo-hawker.example'),
    address = COALESCE(address, '3, Persiaran Lagoon'),
    city = COALESCE(city, 'Petaling Jaya'),
    state = COALESCE(state, 'Selangor'),
    postal_code = COALESCE(postal_code, '47500'),
    country = COALESCE(country, 'MY'),
    company_name = COALESCE(company_name, 'Demo Hawker Center Sdn Bhd')
    WHERE id=:fc`, { fc: FC });

  console.log('[2] branch is_primary');
  await exec(`UPDATE foodcourt_branches SET is_primary=1 WHERE id=:b`, { b: BRANCH });

  console.log('[3] units (12) — clear seeded then insert');
  await exec(`UPDATE foodcourt_units SET current_contract_id=NULL WHERE branch_id=:b AND location_description=:m`, { b: BRANCH, m: SEED_MARK });
  await exec(`DELETE FROM foodcourt_units WHERE branch_id=:b AND location_description=:m`, { b: BRANCH, m: SEED_MARK });

  // 12 units in 4x3 grid (canvas 1200x800).
  // unit.status ENUM: vacant / reserved / preparing / occupied
  // contract.stage drives the *display* state (active/contracting/proposal/setup/...)
  const grid = [
    // row 1 (y=180)
    { num:'A01', x:200, y:180, w:180, h:120, shape:'rect',   size:120, status:'occupied' },
    { num:'A02', x:420, y:180, w:180, h:120, shape:'rect',   size:100, status:'occupied' },
    { num:'A03', x:640, y:180, w:180, h:120, shape:'rect',   size:120, status:'reserved' },
    { num:'A04', x:860, y:180, w:180, h:120, shape:'rect',   size:100, status:'vacant' },
    // row 2 (y=360)
    { num:'B01', x:200, y:360, w:180, h:120, shape:'rect',   size:110, status:'reserved' },
    { num:'B02', x:420, y:360, w:180, h:120, shape:'rect',   size:110, status:'vacant' },
    { num:'B03', x:640, y:360, w:180, h:120, shape:'rect',   size:130, status:'preparing' },
    { num:'B04', x:860, y:360, w:180, h:120, shape:'rect',   size:130, status:'vacant' },
    // row 3 (y=540)
    { num:'C01', x:200, y:540, w:120, h:120, shape:'circle', size:120, status:'vacant' },
    { num:'C02', x:420, y:540, w:180, h:120, shape:'rect',   size:100, status:'vacant' },
    { num:'C03', x:640, y:540, w:180, h:120, shape:'rect',   size:110, status:'reserved' },
    { num:'C04', x:860, y:540, w:180, h:120, shape:'rect',   size:110, status:'vacant' }
  ];
  for (const g of grid) {
    await exec(`INSERT INTO foodcourt_units
      (foodcourt_id, branch_id, floor_plan_id, unit_number, size_value, size_unit, status,
       plan_x, plan_y, plan_width, plan_height, plan_shape, location_description,
       created_at, updated_at)
      VALUES (:fc, :b, :fp, :num, :sz, 'sqft', :st, :x, :y, :w, :h, :sh, :m, NOW(), NOW())`,
      { fc:FC, b:BRANCH, fp:FP, num:g.num, sz:g.size, st:g.status,
        x:g.x, y:g.y, w:g.w, h:g.h, sh:g.shape, m:SEED_MARK });
  }
  const units = await q(`SELECT id, unit_number FROM foodcourt_units WHERE branch_id=:b AND location_description=:m`, { b:BRANCH, m:SEED_MARK });
  const byNum = Object.fromEntries(units.map(u => [u.unit_number, u.id]));
  console.log(`   inserted ${units.length} units`);

  console.log('[4] tenant restaurants link to FC44');
  // R38 Seoul Garden BBQ → A01, R39 Gangnam Noodle House → A02
  await exec(`UPDATE restaurants SET foodcourt_id=:fc, branch_id=:b WHERE id IN (38, 39)`, { fc:FC, b:BRANCH });

  console.log('[5] contracts (clear seeded then insert)');
  await exec(`DELETE FROM contracts WHERE entity_type='foodcourt' AND entity_id=:fc AND notes=:m`, { fc:FC, m:SEED_MARK });

  const today = new Date();
  const ymd = (d) => d.toISOString().split('T')[0];
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate()+n); return x; };
  const startActive = ymd(addDays(today, -90));
  const endActive   = ymd(addDays(today, 275));

  const contracts = [
    { unit:'A01', stage:'active', restaurant:38, applicant:'K-Taste Group', email:'r38@example.com', phone:'+60 12-100 0001', cnum:'CTR-FC44-A01', start: startActive, end: endActive, financial:{ rentType:'fixed', monthlyAmount:3500, currency:'MYR', deposit:7000 } },
    { unit:'A02', stage:'active', restaurant:39, applicant:'K-Taste Group', email:'r39@example.com', phone:'+60 12-100 0002', cnum:'CTR-FC44-A02', start: startActive, end: endActive, financial:{ rentType:'fixed', monthlyAmount:3200, currency:'MYR', deposit:6400 } },
    { unit:'A03', stage:'contracting', restaurant:null, applicant:'Bento Express Sdn Bhd', email:'lease@bento.example', phone:'+60 12-200 0001', cnum:'CTR-FC44-A03', start: ymd(addDays(today, 14)), end: ymd(addDays(today, 379)), financial:{ rentType:'fixed', monthlyAmount:3800, currency:'MYR' } },
    { unit:'C03', stage:'contracting', restaurant:null, applicant:'Tea Garden Co.', email:'leasing@teagarden.example', phone:'+60 12-200 0002', cnum:'CTR-FC44-C03', start: ymd(addDays(today, 21)), end: ymd(addDays(today, 386)), financial:{ rentType:'percentage', percentage:8, currency:'MYR' } },
    { unit:'B01', stage:'proposal', restaurant:null, applicant:'Sushi Bar Concept', email:'hello@sushibar.example', phone:'+60 12-300 0001', cnum:'CTR-FC44-B01', start: null, end: null, financial:{ rentType:'fixed', monthlyAmount:3000, currency:'MYR' } },
    { unit:'B03', stage:'setup', restaurant:null, applicant:'Mama Curry House', email:'open@mamacurry.example', phone:'+60 12-400 0001', cnum:'CTR-FC44-B03', start: ymd(addDays(today, -7)), end: ymd(addDays(today, 358)), financial:{ rentType:'fixed', monthlyAmount:3300, currency:'MYR' } }
  ];
  for (const c of contracts) {
    const uid = byNum[c.unit];
    if (!uid) continue;
    const [res] = await sequelize.query(`INSERT INTO contracts
      (entity_type, entity_id, currency, restaurant_id, stage, applicant_company_name, applicant_email, applicant_phone,
       contract_number, contract_type, start_date, end_date, duration_months, signing_date,
       financial_terms, unit_id, notes, created_at, updated_at)
      VALUES ('foodcourt', :fc, 'MYR', :rid, :stage, :app, :em, :ph,
       :cnum, 'tenancy', :sd, :ed, 12, :sd,
       :fin, :uid, :m, NOW(), NOW())`,
      { replacements: { fc:FC, rid:c.restaurant, stage:c.stage, app:c.applicant, em:c.email, ph:c.phone,
        cnum:c.cnum, sd:c.start, ed:c.end, fin:JSON.stringify(c.financial), uid, m:SEED_MARK } });
    const cid = res.insertId || res;
    if (c.stage === 'active') {
      await exec(`UPDATE foodcourt_units SET current_contract_id=:cid WHERE id=:uid`, { cid, uid });
    }
  }
  console.log(`   inserted ${contracts.length} contracts`);

  // Final summary
  const summary = await q(`SELECT
    (SELECT COUNT(*) FROM foodcourt_branches WHERE foodcourt_id=:fc) AS branches,
    (SELECT COUNT(*) FROM foodcourt_units WHERE branch_id=:b) AS units,
    (SELECT COUNT(*) FROM foodcourt_floor_plans WHERE branch_id=:b) AS floor_plans,
    (SELECT COUNT(*) FROM restaurants WHERE foodcourt_id=:fc) AS tenants,
    (SELECT COUNT(*) FROM contracts WHERE entity_type='foodcourt' AND entity_id=:fc AND notes=:m) AS seeded_contracts,
    (SELECT COUNT(*) FROM foodcourt_units WHERE branch_id=:b AND current_contract_id IS NOT NULL) AS active_units`,
    { fc:FC, b:BRANCH, m:SEED_MARK });
  console.log('\n=== FC44 final state ===');
  console.log(summary[0]);

  await sequelize.close();
})().catch(e => { console.error('SEED FAIL', e); process.exit(1); });
