#!/usr/bin/env node
/**
 * 외부 공급업체 상품 목록 정렬 — 검토표 · 적용 · 되돌리기
 * 설계: docs/EXTERNAL_SUPPLIER_PRODUCTS.md §11 · 규칙: docs/TRADE_STRUCTURE.md §2-2 «판매 상품 규격 표기·어휘»
 * 해석·계획 단일 소스: utils/catalogSpecParser.js (순수 함수 · jest tests/catalog-spec-parser.test.js)
 *
 * 1) 검토표 (쓰기 없음)
 *    node scripts/catalog-alignment.js review --list scripts/data/irene-supplier-catalog-2026-09-11.txt \
 *         --scope brand:1,restaurant:10 --korean-name-sellers "New Seoul Mart" --out review.json \
 *         [--catalog-json f --links-json f --po-lines-json f]
 * 2) 적용 — 기본은 연습(쓰기 없음). --commit 일 때만 쓴다.
 *    node scripts/catalog-alignment.js apply --review review.json [--answers answers.json] --backup-out backup.json \
 *         [--actor-user-id N] [--skip-po-lines] [--commit]
 *    ① 대상 행을 잠그고 검토표 «from» 과 대조 — 하나라도 다르면 **아무것도 쓰지 않고** 중단(exit 3)
 *    ② 새 공급업체 + 자동 active 계약 커밋 · 기록
 *    ③ 상품 번호를 트랜잭션 **밖에서** codeGenerator 로 먼저 받음(한 트랜잭션 안 연속 채번은 잠금 대기 — dev 실측 건당 ~50초)
 *    ④ 재대조 후 한 트랜잭션: 상품 수정·추가 · 연결 환산 · 커밋 전 백업 파일
 *    ⑤ 원가 전파(services/costSync — 화면 수정 경로와 같은 서비스, 실패해도 저장은 살리고 기록)
 *    ⑥ 지난 발주 줄(Fable 게이트 보정 2): 고쳐진 상품에서 빈 규격을 채움 — 받은 줄은 라벨·규격만, 안 받은 줄은 환산값까지, 취소 무접촉
 * 3) 되돌리기 — 기본 연습, --commit 일 때만
 *    node scripts/catalog-alignment.js rollback --backup backup.json [--commit]
 *    · 적용 뒤 누가 또 고친 행은 건드리지 않고 보고한다
 *    · 원가는 **다시 전파하지 않는다** — 적용 때 남긴 원가 변경 기록(batch_id)을 거꾸로 쓴다(2026-09-11 원가 사고 · restoreCosts)
 *
 * ⛔ 운영 실행은 Irene 명시 지시 + Fable 게이트 통과 후에만. 운영 쓰기는 ssh·운영 백엔드 계정 경로.
 */
const fs = require('fs');
const path = require('path');
const {
  splitListText, buildReview, summarize, buildApplyPlan, sameValue, APPLY_FIELDS,
  buildPoLinePlan, assertPoLineWrite
} = require('../utils/catalogSpecParser');

function arg(name, fallback = null) {
  const i = process.argv.indexOf(`--${name}`);
  return i > 0 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[i + 1] : fallback;
}
const flag = (name) => process.argv.includes(`--${name}`);
const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

function parseScope(s) {
  const list = Array.isArray(s) ? s : String(s || '').split(',').map((x) => x.trim()).filter(Boolean).map((x) => {
    const [type, id] = x.split(':');
    return { type, id: Number(id) };
  });
  return list.filter((x) => ['brand', 'restaurant', 'foodcourt'].includes(x.type) && Number.isInteger(Number(x.id)))
    .map((x) => ({ type: x.type, id: Number(x.id) }));
}

function db() {
  require('dotenv').config({ quiet: true });
  const { sequelize } = require('../config/database');
  require('../models'); // 모델 연결(association)
  return sequelize;
}
const select = (sequelize, sql, replacements) => sequelize.query(sql, { type: sequelize.QueryTypes.SELECT, replacements });

async function loadCatalogFromDb() {
  const sequelize = db();
  const companies = await select(sequelize, `SELECT id, name, status, registered_by_entity_type, registered_by_entity_id
      FROM supplier_companies WHERE is_system_registered = 0`);
  const ids = companies.map((c) => c.id);
  const products = ids.length ? await select(sequelize, `SELECT id, supplier_company_id, name, sku, invoice_name, unit, base_quantity, package_unit,
      order_mode, unit_price, deleted_at FROM supplier_products WHERE supplier_company_id IN (:ids)`, { ids }) : [];
  const links = await select(sequelize, `SELECT isp.id, isp.seller_type, isp.seller_product_id, isp.unit_conversion, isp.is_active,
      isp.ingredient_id, isp.product_ingredient_id,
      COALESCE(i.unit, pi.unit) AS target_unit, COALESCE(i.name, pi.name) AS target_name,
      COALESCE(i.base_quantity, pi.base_quantity) AS target_base, COALESCE(i.unit_cost, pi.unit_cost) AS target_cost
    FROM ingredient_seller_products isp
    LEFT JOIN ingredients i ON i.id = isp.ingredient_id
    LEFT JOIN product_ingredients pi ON pi.id = isp.product_ingredient_id
    WHERE isp.seller_type = 'supplier'`);
  return { companies, products, links };
}

/** 범위 공급업체의 발주 줄 — 판매 상품 연결이 있는 줄만 */
async function loadPoLinesFromDb(sequelize, companyIds, transaction) {
  if (!companyIds.length) return [];
  return sequelize.query(`SELECT poi.id, poi.purchase_order_id, poi.ingredient_seller_product_id AS isp_id, po.po_number, po.status AS po_status, poi.quantity_received,
      poi.unit, poi.base_quantity, poi.base_unit, poi.unit_conversion, poi.description,
      isp.seller_product_id, isp.unit_conversion AS link_unit_conversion,
      COALESCE(i.unit, pi.unit) AS stock_unit, COALESCE(i.package_unit, pi.package_unit) AS stock_package_unit
    FROM purchase_order_items poi
    JOIN purchase_orders po ON po.id = poi.purchase_order_id AND po.deleted_at IS NULL AND po.seller_type = 'supplier'
    JOIN ingredient_seller_products isp ON isp.id = poi.ingredient_seller_product_id AND isp.seller_type = 'supplier'
    LEFT JOIN ingredients i ON i.id = poi.ingredient_id
    LEFT JOIN product_ingredients pi ON pi.id = poi.product_ingredient_id
    WHERE po.seller_entity_id IN (:ids)
    ORDER BY poi.id`, { type: sequelize.QueryTypes.SELECT, replacements: { ids: companyIds }, transaction });
}

const inScope = (scope) => (c) => scope.some((s) => s.type === c.registered_by_entity_type && s.id === Number(c.registered_by_entity_id));

function applyScope(catalog, scope) {
  if (!scope.length) throw new Error('--scope 가 필요합니다 (예: brand:1,restaurant:10) — 다른 구매자의 같은 이름 공급업체에 짝을 짓지 않기 위해');
  const companies = catalog.companies.filter(inScope(scope));
  const ids = new Set(companies.map((c) => c.id));
  return { ...catalog, companies, products: catalog.products.filter((p) => ids.has(p.supplier_company_id)) };
}

const SPEC_KEYS = ['unit', 'base_quantity', 'package_unit', 'order_mode'];
const summarizePoLines = (plan) => ({
  lines: plan.length,
  purchase_orders: new Set(plan.map((p) => p.purchase_order_id)).size,
  conversion_changes: plan.filter((p) => p.diff.unit_conversion).length,
  by_status: plan.reduce((m, p) => ({ ...m, [p.po_status]: (m[p.po_status] || 0) + 1 }), {})
});

// ─────────────────────────────────────────── review
async function review() {
  const listPath = arg('list');
  const outPath = arg('out');
  const scope = parseScope(arg('scope'));
  if (!listPath || !outPath) throw new Error('--list 와 --out 이 필요합니다');
  const rows = splitListText(fs.readFileSync(listPath, 'utf8'));
  const offline = !!arg('catalog-json');
  const raw = offline
    ? (() => { const cat = readJson(arg('catalog-json')); return { companies: cat.external_companies, products: cat.products, links: readJson(arg('links-json')) }; })()
    : await loadCatalogFromDb();
  const catalog = applyScope(raw, scope);
  // Irene 2026-09-11 「New Seoul Mart 만 영어(한글) 그대로」 — 이름에 한글을 붙이는 공급업체는 이 옵션으로만
  const koreanNameSellers = String(arg('korean-name-sellers', '')).split(',').map((x) => x.trim()).filter(Boolean);
  const items = buildReview(rows, catalog, { koreanNameSellers });
  const summary = summarize(items);
  const matched = new Set(items.filter((i) => i.match).map((i) => i.match.id));
  const existingNotInList = catalog.products.filter((p) => !p.deleted_at && !matched.has(p.id))
    .map((p) => ({ id: p.id, company_id: p.supplier_company_id, name: p.name }));

  // 지난 발주 줄 — 정리 **뒤** 상품 값·연결 환산을 흉내 내어 보여준다(실제 적용은 apply ⑥ 이 DB 에서 다시 계산)
  const companyIds = catalog.companies.map((c) => c.id);
  const poLines = arg('po-lines-json') ? readJson(arg('po-lines-json'))
    : (offline ? null : await loadPoLinesFromDb(db(), companyIds));
  let poLinePlan = null;
  if (poLines) {
    const productById = new Map(catalog.products.map((p) => [Number(p.id), Object.fromEntries(SPEC_KEYS.map((k) => [k, p[k]]))]));
    for (const it of items) {
      if (it.action === 'update' && it.next) productById.set(Number(it.match.id), { ...productById.get(Number(it.match.id)), ...Object.fromEntries(SPEC_KEYS.filter((k) => k in it.next).map((k) => [k, it.next[k]])) });
    }
    // 줄 연결 환산 흉내는 **그 줄의 연결 id 로만**(2026-09-11 Fable 재판정 — 같은 상품의 다른 연결 제안을 씌워 49 로 센 한계를 고침).
    //   update·same 행의 제안을 모은다(apply 도 둘 다 적용). 줄 자료에 isp_id 가 없으면(옛 오프라인 JSON) 흉내하지 않는다.
    const convByLink = new Map(items.filter((it) => it.action === 'update' || it.action === 'same')
      .flatMap((it) => it.link_conversions || []).map((l) => [Number(l.link_id), l.to]));
    const simulated = poLines.map((l) => (l.isp_id != null && convByLink.has(Number(l.isp_id)) && Number(l.link_unit_conversion) === 1
      ? { ...l, link_unit_conversion: convByLink.get(Number(l.isp_id)) } : l));
    poLinePlan = buildPoLinePlan(simulated, productById);
  }

  const doc = {
    generated_at: new Date().toISOString(),
    source: offline ? { catalog_json: path.basename(arg('catalog-json')), links_json: path.basename(arg('links-json')), po_lines_json: arg('po-lines-json') ? path.basename(arg('po-lines-json')) : null } : 'db',
    list: path.basename(listPath),
    scope,
    korean_name_sellers: koreanNameSellers,
    summary: { ...summary, existing_not_in_list: existingNotInList.length, po_lines: poLinePlan ? summarizePoLines(poLinePlan) : '확인 불가 — 발주 줄 자료 없음' },
    items,
    // 답(answers)으로 들어온 행도 **답의 규격으로** 연결 환산·원가를 다시 계산해야 한다(2026-09-11 Fable — 2차 반영에서 호떡 환산이 1 로 남은 원인).
    //   buildApplyPlan 은 순수 함수라 DB 를 못 본다 → 짝 후보 상품의 연결을 검토표에 함께 적어 둔다.
    links_by_product: (catalog.links || []).filter((l) => l.seller_type === 'supplier' && l.is_active !== 0 && l.is_active !== false)
      .reduce((m, l) => {
        const k = String(l.seller_product_id);
        (m[k] = m[k] || []).push({ id: l.id, unit_conversion: l.unit_conversion, target_unit: l.target_unit, target_name: l.target_name, target_base: l.target_base, target_cost: l.target_cost });
        return m;
      }, {}),
    existing_not_in_list: existingNotInList,
    po_lines: poLinePlan
  };
  fs.writeFileSync(outPath, JSON.stringify(doc, null, 1));
  console.log(JSON.stringify(doc.summary, null, 1));
  console.log('\n확인필요(check) 행:');
  for (const i of items.filter((x) => x.action === 'check')) {
    console.log(`  ${String(i.row).padStart(3)} | ${i.ko} | ${i.en} | ${i.supplier} | «${i.spec_raw}» | ${i.price_raw}  ← ${i.checks.join('; ')}`);
  }
  console.log(`\n검토표: ${outPath}`);
}

// ─────────────────────────────────────────── apply
async function apply() {
  const reviewPath = arg('review');
  const backupOut = arg('backup-out');
  if (!reviewPath || !backupOut) throw new Error('--review 와 --backup-out 이 필요합니다');
  const commit = flag('commit');
  const skipPoLines = flag('skip-po-lines');
  const actorUserId = arg('actor-user-id') != null ? Number(arg('actor-user-id')) : null;
  const reviewDoc = readJson(reviewPath);
  const answers = arg('answers') ? readJson(arg('answers')) : {};
  const plan = buildApplyPlan(reviewDoc, answers);
  const scope = parseScope(reviewDoc.scope);

  if (plan.duplicate_products.length) throw new Error(`같은 상품을 두 번 쓰는 계획: ${plan.duplicate_products.join(', ')} — 답을 고친 뒤 다시`);
  if (plan.companies.length && !Number.isInteger(actorUserId)) {
    throw new Error('새 공급업체 계약에는 --actor-user-id 가 필요합니다 (supplier_contracts.requested_by_user_id NOT NULL)');
  }
  if (!scope.length) throw new Error('검토표에 scope 가 없습니다');

  const sequelize = db();
  const { SupplierProduct, SupplierCompany, SupplierContract, IngredientSellerProduct, PurchaseOrder, PurchaseOrderItem } = require('../models');
  const { sanitizeString } = require('../middleware/validation');
  const { normalizePackageUnit } = require('../utils/poLineSpec');
  const { generateCode } = require('../utils/codeGenerator');
  const clean = (fields) => {
    const v = { ...fields };
    if ('name' in v) v.name = sanitizeString(String(v.name)).slice(0, 255);
    if ('invoice_name' in v && v.invoice_name != null) v.invoice_name = sanitizeString(String(v.invoice_name)).slice(0, 255);
    if ('unit' in v && v.unit != null) v.unit = sanitizeString(String(v.unit)).slice(0, 50);
    if ('package_unit' in v) v.package_unit = normalizePackageUnit(v.package_unit);
    return v;
  };

  const backup = {
    created_at: new Date().toISOString(), review: path.basename(reviewPath), commit, actor_user_id: actorUserId, scope,
    plan_counts: { updates: plan.updates.length, adds: plan.adds.length, companies: plan.companies.length, links: plan.links.length, skipped: plan.skipped.length },
    products_before: [], links_before: [],
    applied: { updates: [], links: [], po_lines: [] },
    created: { companies: [], contracts: [], products: [] },
    po_lines_before: [], po_line_conflicts: [],
    conflicts: [], skipped: plan.skipped, cost_sync: [],
    // 원가 변경 기록(cost_change_logs.batch_id) 묶음 번호 — 되돌리기가 원가를 **다시 전파하지 않고 이 기록을 거꾸로** 쓴다
    cost_batch_id: `catalog-align-${Date.now()}`
  };
  const save = () => fs.writeFileSync(backupOut, JSON.stringify(backup, null, 1));

  // 대상 행을 잠그고 검토표의 «from» 과 대조 — 쓰기 직전에 한 번 더 부른다
  const lockAndCompare = async (t, recordBefore) => {
    const conflicts = [];
    for (const u of plan.updates) {
      const row = await SupplierProduct.findByPk(u.product_id, { transaction: t, lock: t.LOCK.UPDATE, paranoid: false });
      if (!row || row.deleted_at) { conflicts.push({ row: u.row, product_id: u.product_id, reason: '상품 없음/삭제됨' }); continue; }
      if (recordBefore) backup.products_before.push({ id: row.id, ...Object.fromEntries(APPLY_FIELDS.map((k) => [k, row.get(k)])) });
      for (const [k, v] of Object.entries(u.expect || {})) {
        if (!sameValue(k, row.get(k), v)) conflicts.push({ row: u.row, product_id: u.product_id, field: k, expected: v, actual: row.get(k) });
      }
    }
    for (const l of plan.links) {
      const row = await IngredientSellerProduct.findByPk(l.link_id, { transaction: t, lock: t.LOCK.UPDATE });
      if (!row) { conflicts.push({ row: l.row, link_id: l.link_id, reason: '연결 없음' }); continue; }
      if (recordBefore) backup.links_before.push({ id: row.id, product_id: l.product_id, unit_conversion: row.unit_conversion });
      if (!sameValue('unit_conversion', row.unit_conversion, l.from)) conflicts.push({ row: l.row, link_id: l.link_id, field: 'unit_conversion', expected: l.from, actual: row.unit_conversion });
    }
    return conflicts;
  };

  // ① 대조 (쓰기 없음)
  const tCheck = await sequelize.transaction();
  try { backup.conflicts = await lockAndCompare(tCheck, true); } finally { await tCheck.rollback(); }
  if (backup.conflicts.length) {
    save();
    console.log(`중단 — 검토표 이후 바뀐 값 ${backup.conflicts.length}건. 아무것도 쓰지 않았습니다. 목록: ${backupOut}`);
    process.exitCode = 3;
    return;
  }
  if (!commit) {
    fs.writeFileSync(backupOut, JSON.stringify({ ...backup, dry_run: true, plan, po_lines_preview: reviewDoc.summary && reviewDoc.summary.po_lines }, null, 1));
    console.log('연습 실행 — 쓰기 없음.', JSON.stringify({ ...backup.plan_counts, po_lines_preview: reviewDoc.summary && reviewDoc.summary.po_lines }));
    return;
  }

  // ② 새 공급업체 + 자동 active 계약 (routes/supplier-directory.js POST /external-suppliers 와 같은 모양) — 먼저 커밋, 곧바로 기록
  const companyIdByKey = {};
  if (plan.companies.length) {
    const tCo = await sequelize.transaction();
    try {
      for (const c of plan.companies) {
        const sc = await SupplierCompany.create({
          name: sanitizeString(String(c.name)).slice(0, 255), status: 'active', is_system_registered: false,
          registered_by_entity_type: c.entity_type, registered_by_entity_id: c.entity_id, country: 'MY'
        }, { transaction: tCo });
        const ct = await SupplierContract.create({
          entity_type: c.entity_type, entity_id: c.entity_id, supplier_company_id: sc.id, status: 'active', requested_by_user_id: actorUserId
        }, { transaction: tCo });
        companyIdByKey[c.key] = sc.id;
        backup.created.companies.push(sc.id);
        backup.created.contracts.push(ct.id);
      }
      await tCo.commit();
    } catch (e) {
      if (!tCo.finished) await tCo.rollback();
      backup.created.companies = []; backup.created.contracts = [];
      throw e;
    }
    save();
  }

  // ③ 상품 번호 — 채번 단일 소스(utils/codeGenerator) 를 **트랜잭션 밖에서** 먼저 받는다.
  //   ⚠ dev 실측(2026-09-11): 한 트랜잭션 안에서 같은 공급업체 번호를 연달아 받으면 codeGenerator 의 씨앗 INSERT IGNORE 가
  //     그 트랜잭션이 잡은 code_sequences 행 잠금을 기다려 **건당 약 50초**(lock wait timeout) 멈췄다.
  //   중단되면 번호만 비고(지운 번호는 다시 쓰지 않는다 — codeGenerator 원칙) 상품은 생기지 않는다.
  for (const a of plan.adds) {
    const companyId = a.company_id || companyIdByKey[a.company_key];
    a.resolved_company_id = companyId;
    a.sku = await generateCode(SupplierProduct, `SP-${companyId}`, { field: 'sku', padLength: 4, whereClause: { supplier_company_id: companyId } });
  }
  backup.reserved_skus = plan.adds.map((a) => ({ row: a.row, company_id: a.resolved_company_id, sku: a.sku }));
  save();

  // ④ 본 적용 — 잠그고 다시 대조한 뒤 한 트랜잭션
  const t = await sequelize.transaction();
  try {
    const late = await lockAndCompare(t, false);
    if (late.length) {
      await t.rollback();
      backup.conflicts = late;
      save();
      console.log(`중단 — 대조 뒤 바뀐 값 ${late.length}건. 상품·연결은 쓰지 않았습니다.` +
        (backup.created.companies.length ? ` 새 공급업체 ${backup.created.companies.length}곳은 만들어졌으니 rollback 으로 지우세요.` : ''));
      process.exitCode = 3;
      return;
    }
    for (const u of plan.updates) {
      const vals = clean(u.fields);
      await SupplierProduct.update(vals, { where: { id: u.product_id }, transaction: t });
      backup.applied.updates.push({ id: u.product_id, ...vals });
    }
    for (const a of plan.adds) {
      const vals = clean(a.fields);
      const p = await SupplierProduct.create({
        supplier_company_id: a.resolved_company_id, sku: a.sku, current_stock: 0, low_stock_threshold: 0, sort_order: 0,
        min_order_quantity: 1, lead_time_days: 0, is_active: true, ...vals, unit_price: vals.unit_price != null ? vals.unit_price : 0
      }, { transaction: t });
      backup.created.products.push(p.id);
    }
    for (const l of plan.links) {
      await IngredientSellerProduct.update({ unit_conversion: l.to }, { where: { id: l.link_id }, transaction: t });
      backup.applied.links.push({ id: l.link_id, product_id: l.product_id, unit_conversion: l.to });
    }
    save(); // 커밋 전에 먼저 — 되돌리기 값을 잃지 않게
    await t.commit();
  } catch (e) {
    if (!t.finished) await t.rollback();
    backup.applied = { updates: [], links: [], po_lines: [] }; backup.created.products = [];
    save();
    throw e;
  }

  // ⑤ 원가 전파
  //   전파(costSync)는 연결의 **매핑 사본 가격**(ingredient_seller_products.unit_price — 발주서 단가가 읽는 값)을
  //   판매자 현재가로 기록 없이 맞춘다. 되돌리기가 그것까지 되돌리게 전파 **전** 값을 적어 둔다(2026-09-11 Fable 게이트 잔여).
  const priceProductIds = [...new Set(plan.updates.filter((u) => 'unit_price' in u.fields).map((u) => u.product_id))];
  backup.mapping_prices_before = priceProductIds.length
    ? await select(sequelize, `SELECT id, seller_product_id, unit_price FROM ingredient_seller_products
        WHERE seller_type = 'supplier' AND seller_product_id IN (:ids)`, { ids: priceProductIds })
    : [];
  save();
  await syncCosts(sequelize, [
    ...plan.updates.filter((u) => 'unit_price' in u.fields).map((u) => u.product_id),
    ...plan.links.map((l) => l.product_id)
  ], actorUserId, backup, '외부 공급업체 상품 목록 정렬 (Irene 2026-09-11)');
  save();

  // ⑥ 지난 발주 줄 — 고쳐진 상품·연결에서 다시 계산(DB 기준)
  if (!skipPoLines) {
    const companies = await select(sequelize, `SELECT id, registered_by_entity_type, registered_by_entity_id FROM supplier_companies WHERE is_system_registered = 0`);
    const companyIds = companies.filter(inScope(scope)).map((c) => c.id);
    const lines = await loadPoLinesFromDb(sequelize, companyIds);
    const spIds = [...new Set(lines.map((l) => Number(l.seller_product_id)))];
    const prods = spIds.length ? await select(sequelize, `SELECT id, unit, base_quantity, package_unit, order_mode FROM supplier_products WHERE id IN (:ids)`, { ids: spIds }) : [];
    const poPlan = buildPoLinePlan(lines, new Map(prods.map((p) => [Number(p.id), p])));
    const tPo = await sequelize.transaction();
    try {
      for (const p of poPlan) {
        const row = await PurchaseOrderItem.findByPk(p.line_id, { transaction: tPo, lock: tPo.LOCK.UPDATE });
        const po = row ? await PurchaseOrder.findByPk(row.purchase_order_id, { transaction: tPo, lock: tPo.LOCK.UPDATE }) : null;
        if (!row || !po) { backup.po_line_conflicts.push({ line_id: p.line_id, reason: '줄/발주 없음' }); continue; }
        const fields = Object.fromEntries(Object.entries(p.diff).map(([k, d]) => [k, d.to]));
        const changed = Object.entries(p.diff).some(([k, d]) => !sameValue(k, row.get(k), d.from));
        if (changed || po.status !== p.po_status) { backup.po_line_conflicts.push({ line_id: p.line_id, reason: '계산 뒤 바뀜 — 건드리지 않음' }); continue; }
        assertPoLineWrite(po.status, row.quantity_received, fields); // 받은 줄의 환산값은 여기서 막힌다
        backup.po_lines_before.push({ id: row.id, purchase_order_id: row.purchase_order_id, ...Object.fromEntries(Object.keys(fields).map((k) => [k, row.get(k)])) });
        await PurchaseOrderItem.update(fields, { where: { id: row.id }, transaction: tPo });
        backup.applied.po_lines.push({ id: row.id, purchase_order_id: row.purchase_order_id, po_status: po.status, ...fields });
      }
      save();
      await tPo.commit();
    } catch (e) {
      if (!tPo.finished) await tPo.rollback();
      backup.applied.po_lines = []; backup.po_lines_before = [];
      save();
      throw e;
    }
  }
  save();
  console.log('적용 완료', JSON.stringify({
    ...backup.plan_counts, created_products: backup.created.products.length,
    cost_sync_errors: backup.cost_sync.filter((c) => c.error).length,
    po_lines: backup.applied.po_lines.length, po_line_conflicts: backup.po_line_conflicts.length
  }));
  console.log(`되돌리기 값: ${backupOut}`);
}

async function syncCosts(sequelize, productIds, actorUserId, backup, note) {
  const { recomputeForSellerProduct } = require('../services/costSync');
  for (const id of [...new Set(productIds)]) {
    try {
      const out = await recomputeForSellerProduct('supplier', id, {
        sequelize,
        ctx: { source: 'seller_edit', seller_type: 'supplier', changed_by_user_id: actorUserId, note, batch_id: backup.cost_batch_id || null }
      });
      const list = Array.isArray(out) ? out : [];
      backup.cost_sync.push({
        product_id: id, targets: Array.isArray(out) ? out.length : null,
        changed: list.filter((o) => o && o.changed).map((o) => ({ name: o.name, from: o.from, to: o.to })),
        skipped: list.filter((o) => o && o.skip).map((o) => o.skip)
      });
    } catch (e) {
      backup.cost_sync.push({ product_id: id, error: e.message });
    }
  }
}

// ─────────────────────────────────────────── rollback
async function rollback() {
  const backupPath = arg('backup');
  if (!backupPath) throw new Error('--backup 이 필요합니다');
  const commit = flag('commit');
  const b = readJson(backupPath);
  if (!b.commit || b.dry_run) throw new Error('연습 실행 기록이라 되돌릴 것이 없습니다');
  b.applied = { updates: [], links: [], po_lines: [], ...(b.applied || {}) };
  b.created = { companies: [], contracts: [], products: [], ...(b.created || {}) };
  b.po_lines_before = b.po_lines_before || [];

  const sequelize = db();
  const { SupplierProduct, SupplierCompany, SupplierContract, IngredientSellerProduct, PurchaseOrderItem } = require('../models');
  const report = { restored_po_lines: [], restored_products: [], restored_links: [], restored_mapping_prices: [], restored_costs: [], removed_products: [], removed_contracts: [], removed_companies: [], conflicts: [] };
  const beforeById = new Map(b.products_before.map((r) => [r.id, r]));
  const linkBeforeById = new Map(b.links_before.map((r) => [r.id, r]));
  const poBeforeById = new Map(b.po_lines_before.map((r) => [r.id, r]));

  const t = await sequelize.transaction();
  try {
    for (const applied of b.applied.po_lines) {
      const row = await PurchaseOrderItem.findByPk(applied.id, { transaction: t, lock: t.LOCK.UPDATE });
      const keys = Object.keys(applied).filter((k) => !['id', 'purchase_order_id', 'po_status'].includes(k));
      if (!row || keys.some((k) => !sameValue(k, row.get(k), applied[k]))) { report.conflicts.push({ po_line_id: applied.id, reason: '적용 뒤 다시 바뀜 — 건드리지 않음' }); continue; }
      const before = poBeforeById.get(applied.id);
      await PurchaseOrderItem.update(Object.fromEntries(keys.map((k) => [k, before[k]])), { where: { id: applied.id }, transaction: t });
      report.restored_po_lines.push(applied.id);
    }
    for (const applied of b.applied.updates) {
      const row = await SupplierProduct.findByPk(applied.id, { transaction: t, lock: t.LOCK.UPDATE, paranoid: false });
      const changedSince = !row || Object.entries(applied).some(([k, v]) => k !== 'id' && !sameValue(k, row.get(k), v));
      if (changedSince) { report.conflicts.push({ product_id: applied.id, reason: '적용 뒤 다시 바뀜 — 건드리지 않음' }); continue; }
      const before = beforeById.get(applied.id);
      const vals = Object.fromEntries(Object.keys(applied).filter((k) => k !== 'id').map((k) => [k, before[k]]));
      await SupplierProduct.update(vals, { where: { id: applied.id }, transaction: t });
      report.restored_products.push(applied.id);
    }
    // 매핑 사본 가격 — 되돌린 상품의 연결만, 지금 사본 = 적용한 가격일 때만 전파 전 값으로(누가 또 고쳤으면 보고)
    for (const m of (b.mapping_prices_before || [])) {
      const applied = b.applied.updates.find((u) => u.id === m.seller_product_id && 'unit_price' in u);
      if (!applied || !report.restored_products.includes(applied.id)) continue;
      const row = await IngredientSellerProduct.findByPk(m.id, { transaction: t, lock: t.LOCK.UPDATE });
      if (!row || sameValue('unit_price', row.unit_price, m.unit_price)) continue;
      if (!sameValue('unit_price', row.unit_price, applied.unit_price)) { report.conflicts.push({ link_id: m.id, reason: '매핑 사본 가격이 적용 뒤 다시 바뀜 — 건드리지 않음', now: row.unit_price }); continue; }
      await IngredientSellerProduct.update({ unit_price: m.unit_price }, { where: { id: m.id }, transaction: t });
      report.restored_mapping_prices.push({ link_id: m.id, from: row.unit_price, to: m.unit_price });
    }
    for (const applied of b.applied.links) {
      const row = await IngredientSellerProduct.findByPk(applied.id, { transaction: t, lock: t.LOCK.UPDATE });
      if (!row || !sameValue('unit_conversion', row.unit_conversion, applied.unit_conversion)) { report.conflicts.push({ link_id: applied.id, reason: '적용 뒤 다시 바뀜 — 건드리지 않음' }); continue; }
      await IngredientSellerProduct.update({ unit_conversion: linkBeforeById.get(applied.id).unit_conversion }, { where: { id: applied.id }, transaction: t });
      report.restored_links.push(applied.id);
    }
    for (const id of b.created.products) {
      const used = await IngredientSellerProduct.count({ where: { seller_type: 'supplier', seller_product_id: id }, transaction: t });
      if (used) { report.conflicts.push({ product_id: id, reason: `새로 만든 상품에 연결 ${used}건이 생김 — 지우지 않음` }); continue; }
      await SupplierProduct.destroy({ where: { id }, transaction: t }); // 소프트 삭제 — 번호는 다시 쓰지 않는다(codeGenerator)
      report.removed_products.push(id);
    }
    for (const id of b.created.contracts) {
      await SupplierContract.destroy({ where: { id }, transaction: t });
      report.removed_contracts.push(id);
    }
    for (const id of b.created.companies) {
      const left = await SupplierProduct.count({ where: { supplier_company_id: id }, transaction: t });
      if (left) { report.conflicts.push({ company_id: id, reason: `상품 ${left}개가 남아 지우지 않음` }); continue; }
      await SupplierCompany.destroy({ where: { id }, transaction: t });
      report.removed_companies.push(id);
    }
    await restoreCosts(sequelize, b, report, t);
    if (!commit) {
      await t.rollback();
      console.log('연습 되돌리기 — 쓰기 없음.', JSON.stringify(Object.fromEntries(Object.entries(report).map(([k, v]) => [k, v.length]))));
      if (report.conflicts.length) console.log(JSON.stringify(report.conflicts, null, 1));
      return;
    }
    await t.commit();
  } catch (e) {
    if (!t.finished) await t.rollback();
    throw e;
  }
  const out = backupPath.replace(/\.json$/, '') + '.rollback.json';
  fs.writeFileSync(out, JSON.stringify(report, null, 1));
  console.log('되돌리기 완료', JSON.stringify(Object.fromEntries(Object.entries(report).map(([k, v]) => [k, v.length]))), out);
}

/**
 * 원가 되돌리기 — **다시 전파하지 않고** 적용 때 남긴 원가 변경 기록(cost_change_logs, batch_id)을 거꾸로 쓴다.
 * 2026-09-11 운영 원가 사고(Fable 판정 ④-e): 예전 되돌리기는 상품 값을 되돌린 뒤 원가를 다시 전파했다 —
 *   전파 식에 결함이 있으면 되돌리기가 그 결함을 한 번 더 태운다(그날 원가식이 기준양을 한 번 더 곱하고 있었다).
 * 적용 뒤 누가 원가를 또 바꾼 행은 건드리지 않고 conflicts 로 보고한다. 거울(재고아이템을 브랜드에 공유한 재료)은
 *   원가를 그대로 복사받으므로(services/stockItemMirror) 같은 값일 때만 함께 되돌린다.
 */
async function restoreCosts(sequelize, b, report, t) {
  const { logCostChange } = require('../services/costSync');
  const sel = (sql, replacements) => sequelize.query(sql, { type: sequelize.QueryTypes.SELECT, replacements, transaction: t });
  const same = (a, c) => Math.abs(Number(a) - Number(c)) < 0.0001;
  if (!b.cost_batch_id) {
    if ((b.cost_sync || []).length) report.conflicts.push({ reason: '이 기록에는 원가 묶음 번호(cost_batch_id)가 없어 원가는 되돌리지 않음 — cost_change_logs 를 사람이 확인' });
    return;
  }
  const logs = await sel(`SELECT id, subject_type, subject_id, old_value, new_value, unit FROM cost_change_logs
    WHERE batch_id = :b ORDER BY id DESC`, { b: b.cost_batch_id });
  const seen = new Set();
  for (const l of logs) {
    const key = `${l.subject_type}:${l.subject_id}`;
    if (seen.has(key)) continue;                 // 같은 행이 여러 번 바뀌었으면 마지막 기록의 old 가 아니라 **첫 기록의 old** 가 원래 값
    seen.add(key);
    const first = logs.filter((x) => `${x.subject_type}:${x.subject_id}` === key).pop();
    const table = { product_ingredient: 'product_ingredients', ingredient: 'ingredients' }[l.subject_type];
    if (!table) continue;
    const [row] = await sel(`SELECT id, unit_cost FROM ${table} WHERE id = :id FOR UPDATE`, { id: l.subject_id });
    if (!row || !same(row.unit_cost, l.new_value)) {
      report.conflicts.push({ [l.subject_type]: l.subject_id, reason: '적용 뒤 원가가 다시 바뀜 — 건드리지 않음', now: row ? row.unit_cost : null, applied: l.new_value });
      continue;
    }
    const to = Number(first.old_value) || 0;
    await sequelize.query(`UPDATE ${table} SET unit_cost = :c WHERE id = :id`, { replacements: { c: to, id: l.subject_id }, transaction: t });
    await logCostChange(sequelize, t, { subject_type: l.subject_type, subject_id: l.subject_id, old_value: Number(row.unit_cost), new_value: to,
      unit: l.unit, source: 'manual', batch_id: `${b.cost_batch_id}-rollback`, note: '외부 공급업체 상품 목록 정렬 되돌리기 — 적용 때 원가 기록을 거꾸로' });
    report.restored_costs.push({ table, id: l.subject_id, from: Number(row.unit_cost), to });
    if (l.subject_type === 'product_ingredient') {
      const mirrors = await sel(`SELECT id, unit_cost FROM ingredients WHERE source_product_ingredient_id = :id FOR UPDATE`, { id: l.subject_id });
      for (const m of mirrors) {
        if (!same(m.unit_cost, l.new_value)) continue;
        await sequelize.query('UPDATE ingredients SET unit_cost = :c WHERE id = :id', { replacements: { c: to, id: m.id }, transaction: t });
        report.restored_costs.push({ table: 'ingredients', id: m.id, from: Number(m.unit_cost), to, mirror_of: l.subject_id });
      }
    }
  }
}

const cmd = process.argv[2];
(async () => {
  if (cmd === 'review') await review();
  else if (cmd === 'apply') await apply();
  else if (cmd === 'rollback') await rollback();
  else { console.error('사용: review | apply | rollback  (파일 머리 주석 참고)'); process.exitCode = 2; }
})().then(async () => {
  try { const { sequelize } = require('../config/database'); await sequelize.close(); } catch (_) { /* 연결 안 열었음 */ }
  // ⚠ 명시 종료 — 운영(2026-09-11)에서 review·apply 가 결과를 다 쓰고도 프로세스가 남았다(모델 로딩이 연 핸들).
  //   배포 마이그와 같은 패턴(메모리 «배포 마이그 process.exit»). stdout 을 비운 뒤 끝낸다.
  process.stdout.write('', () => process.exit(process.exitCode || 0));
}).catch(async (e) => {
  console.error('ERR', e.message);
  process.exitCode = process.exitCode || 1;
  try { const { sequelize } = require('../config/database'); await sequelize.close(); } catch (_) { /* noop */ }
  process.stdout.write('', () => process.exit(process.exitCode));
});
