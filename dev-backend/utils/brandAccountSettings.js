/**
 * 판매자 결제 설정 = 계정(회사) 하나 (2026-10-07 Fable 판정 `.claude/fable-verdict-20261007-payment-settings-account.md`)
 *
 * 브랜드 «Payment Settings» 화면은 브랜드 선택이 없다 — 계정의 기본 브랜드(users.brand_id) 행에만 저장해 왔고,
 * 청구서 결제창·Stripe/PayPal·PDF 은행정보는 **발행 브랜드** 행을 읽는다. 그래서 같은 주인의 둘째 브랜드가 발행한
 * 청구서는 «Payment Not Available» 이었다.
 *
 * 불변식: owner_id 가 같은(NULL 제외) brands 행들의 ACCOUNT_LEVEL_FIELDS 값은 전부 같다.
 *   ① 런타임 — PUT payment-settings 가 형제 전부에 펼친다 · 새 브랜드는 형제 값으로 시작한다
 *   ② 배포 — scripts/migrate-brand-account-payment-settings.js 가 어긋난 형제를 기준 행 값으로 맞춘다
 *   ③ 게이트 — 인스펙션 brand-account-settings 가 어긋남 0 을 확인한다
 * ②③은 아래 findAccountDrift 하나를 같이 쓴다(탐지와 수정이 같은 조건).
 *
 * 읽는 곳(invoices-* · stripeService · paypalService …)은 바꾸지 않는다 — 어느 형제 행을 읽어도 같은 값이므로.
 * 값은 **저장된 원문 그대로** 옮긴다(getDataValue / 원 SQL). 모델 getter 는 NULL 을 기본값 객체로 바꿔 돌려주므로
 * 그걸 복사하면 «미설정» 이 «설정됨(전부 꺼짐)» 으로 바뀐다.
 */
const { QueryTypes } = require('sequelize');

// 이 화면(BrandPaymentSettingsPage)이 저장하는 칸 전부. currency · 회사정보(company_name·bank_*)는 제외.
const ACCOUNT_LEVEL_FIELDS = [
  'payment_settings',
  'invoice_settings',
  'supported_currencies',
  'min_order_amount',
  'delivery_fee',
  'delivery_policy',
];

/** 같은 주인의 다른 브랜드 id 목록 (owner NULL 이면 빈 배열) */
async function siblingBrandIds(Brand, brand, options = {}) {
  if (!brand || brand.owner_id == null) return [];
  const { Op } = require('sequelize');
  const rows = await Brand.findAll({
    where: { owner_id: brand.owner_id, id: { [Op.ne]: brand.id } },
    attributes: ['id'],
    transaction: options.transaction,
  });
  return rows.map(r => r.id);
}

function rawValues(brand) {
  const out = {};
  for (const f of ACCOUNT_LEVEL_FIELDS) {
    const v = brand.getDataValue(f);
    out[f] = v === undefined ? null : v;
  }
  return out;
}

/** 저장이 끝난 brand 의 계정 칸 값을 같은 주인의 모든 형제에 그대로 쓴다. 반환: 바뀐 형제 id */
async function fanOutAccountFields(Brand, brand, options = {}) {
  const ids = await siblingBrandIds(Brand, brand, options);
  if (!ids.length) return [];
  const values = rawValues(brand);
  const siblings = await Brand.findAll({ where: { id: ids }, transaction: options.transaction });
  for (const s of siblings) {
    for (const f of ACCOUNT_LEVEL_FIELDS) s.setDataValue(f, values[f]);
    await s.save({ transaction: options.transaction, fields: ACCOUNT_LEVEL_FIELDS });
  }
  return ids;
}

/** 새로 만든 brand 가 형제(같은 주인)의 계정 칸 값으로 시작하게 한다. 기준 = 주인의 기본 브랜드, 없으면 가장 오래된 형제 */
async function copyAccountFieldsFromSibling(Brand, brand, options = {}) {
  const ids = await siblingBrandIds(Brand, brand, options);
  if (!ids.length) return null;
  const User = require('../models/User');
  const owner = await User.findByPk(brand.owner_id, { attributes: ['id', 'brand_id'], transaction: options.transaction });
  const sourceId = owner && ids.includes(owner.brand_id) ? owner.brand_id : Math.min(...ids);
  const source = await Brand.findByPk(sourceId, { transaction: options.transaction });
  if (!source) return null;
  const values = rawValues(source);
  for (const f of ACCOUNT_LEVEL_FIELDS) brand.setDataValue(f, values[f]);
  await brand.save({ transaction: options.transaction, fields: ACCOUNT_LEVEL_FIELDS });
  return sourceId;
}

const hasValue = (r) => ACCOUNT_LEVEL_FIELDS.some(f => r[f] !== null && r[f] !== '');
const sameValue = (a, b) => (a === null || a === undefined ? null : String(a)) === (b === null || b === undefined ? null : String(b));

/**
 * 같은 주인 브랜드들의 계정 칸 어긋남을 찾는다 (마이그·인스펙션 공용).
 * @param {(sql:string, params?:any[]) => Promise<any[]>} q  원 SQL 실행기 (행 배열 반환)
 * @returns {Promise<{fixable: Array<{owner_id,source_id,source_rule,target_id,fields:string[]}>, conflicts: Array<{owner_id,brand_ids:number[]}>}>}
 *   fixable  — 기준 행이 정해져 맞출 수 있는 형제 (기준 = 주인 users.brand_id 행 · 아니면 값 있는 행이 정확히 1개일 때 그 행)
 *   conflicts — 기준을 정할 수 없고 값 있는 행이 2개 이상 서로 다름 → 건드리지 않고 보고만
 */
async function findAccountDrift(q) {
  const rows = await q(
    `SELECT b.id, b.owner_id, u.brand_id AS owner_primary, ${ACCOUNT_LEVEL_FIELDS.map(f => `b.\`${f}\``).join(', ')}
       FROM brands b
       LEFT JOIN users u ON u.id = b.owner_id
      WHERE b.owner_id IS NOT NULL
        AND b.owner_id IN (SELECT owner_id FROM brands WHERE owner_id IS NOT NULL GROUP BY owner_id HAVING COUNT(*) > 1)
      ORDER BY b.owner_id, b.id`
  );
  const byOwner = new Map();
  for (const r of rows) {
    if (!byOwner.has(r.owner_id)) byOwner.set(r.owner_id, []);
    byOwner.get(r.owner_id).push(r);
  }
  const fixable = [];
  const conflicts = [];
  for (const [ownerId, group] of byOwner) {
    let source = group.find(r => r.id === group[0].owner_primary) || null;
    let rule = 'owner_primary';
    if (!source) {
      const withValue = group.filter(hasValue);
      if (withValue.length === 1) { source = withValue[0]; rule = 'only_valued'; }
      else if (withValue.length > 1) {
        const allSame = withValue.every(r => ACCOUNT_LEVEL_FIELDS.every(f => sameValue(r[f], withValue[0][f])));
        if (allSame) { source = withValue[0]; rule = 'only_valued'; }
        else { conflicts.push({ owner_id: ownerId, brand_ids: group.map(r => r.id) }); continue; }
      } else continue; // 전부 비어 있음 = 이미 같음
    }
    for (const r of group) {
      if (r.id === source.id) continue;
      const fields = ACCOUNT_LEVEL_FIELDS.filter(f => !sameValue(r[f], source[f]));
      if (fields.length) fixable.push({ owner_id: ownerId, source_id: source.id, source_rule: rule, target_id: r.id, fields });
    }
  }
  return { fixable, conflicts };
}

/** sequelize 로 원 SQL 실행기 만들기 */
function makeQuery(sequelize, transaction) {
  return (sql, params = []) => sequelize.query(sql, { replacements: params, type: QueryTypes.SELECT, transaction });
}

module.exports = {
  ACCOUNT_LEVEL_FIELDS,
  siblingBrandIds,
  fanOutAccountFields,
  copyAccountFieldsFromSibling,
  findAccountDrift,
  makeQuery,
};
