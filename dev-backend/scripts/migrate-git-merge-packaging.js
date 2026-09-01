/**
 * Migration (manual · 일회성): GIT 포장재 — 갈라진 재고아이템을 프로덕트로 합친다.
 *
 * 배경 (2026-09-01 운영 실측 · Fable 판정 v2):
 *   레시피 없는 프로덕트는 그 자체가 재고아이템인데, 발주 라인이 프로덕트를 가리킬 수 없어서
 *   GIT 이 사온 포장재가 **따로 만든 재고아이템(product_ingredients)** 에 쌓였다.
 *   같은 물건이 둘로 갈라져, 프로덕트는 수량 0 이고 팔려도 재고가 안 빠졌다.
 *   구조를 바꾸는 게 아니라 **갈라진 것을 합친다** — 수량과 공급처 연결을 프로덕트로 옮기고
 *   빈 재고아이템은 비활성으로 내린다(삭제하지 않는다 — 이력·발주 참조가 붙어 있다).
 *
 * 안전:
 *   - 짝은 **이름이 같은지 확인한 뒤에만** 옮긴다. id 가 어긋난 환경(dev 등)에서는 그 짝을 건너뛴다.
 *   - 멱등: 재고아이템이 이미 비활성이거나 수량 0 이면 skip. 두 번 돌려도 수량이 두 배가 되지 않는다.
 *   - 옮긴 만큼 `InventoryTransaction` 두 줄(원본 -, 대상 +)을 남긴다 — 원장에서 추적 가능.
 *   - `--dry-run` 이 기본값이 아니다. **아무 인자 없이 실행하면 dry-run** 이고, `--apply` 로만 쓴다.
 *   - process.exit 필수 ([[reference_deploy_migration_must_exit]]).
 *
 * 사용:
 *   node scripts/migrate-git-merge-packaging.js            # dry-run (아무것도 안 바꿈)
 *   node scripts/migrate-git-merge-packaging.js --apply    # 실제 적용
 */
require('dotenv').config();
const { sequelize } = require('../config/database');

const APPLY = process.argv.includes('--apply');

/** `--name=value` 형태 인자 읽기 (리허설용 — 운영 기본값은 아래 하드코딩 그대로). */
const arg = (name) => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : null;
};

// 운영 실측으로 확인한 짝 (이름 완전 일치 · 프로덕트 수량 0 이라 충돌 없음).
// name 은 **확인용**이다 — id 가 가리키는 행의 이름이 다르면 그 짝은 건너뛴다.
const PAIRS = [
  { pi: 304, bp: 181, name: '(SC-450) 450ML Round Container (국물판매용 원형 소)' },
  { pi: 305, bp: 182, name: '(SC-800) 800ML Round Container (국물판매용 원형 대)' },
  { pi: 307, bp: 185, name: 'MTP 360 (12OZ) PP Plastic Cup (플라스틱 투명컵)' },
  { pi: 308, bp: 186, name: 'MTP 12/16/22 FL5 PET Flat Lid (플라스틱 투명컵 뚜껑)' },
];

// 짝이 없어 옮길 수량이 없는 포장재 — 단위만 채운다(Irene 확정: pack).
// ⚠ id 만으로 건드리면 안 된다 — dev dry-run 에서 P#44 가 "Grilled Chicken" 이었다.
//    id 는 환경마다 다른 행을 가리킨다. 이름까지 맞아야 손댄다.
const UNIT_ONLY = [
  { bp: 44, name: 'RECLOSABLE LID 12OZ BLACK (50PCS/PKT)' },
  { bp: 187, name: 'GOODMAID DISH WASH 900ML Lime PPT | 900ml x 12btl/ctn' },
  { bp: 188, name: 'THERMAL ROLL 80MM X 60MM X 12MM (L) (10ROLLS X 10PKTS)' },
  { bp: 189, name: "KITCHEN TOWEL V/P 2PLY (70's x 6rolls x 6pkts)" },
  { bp: 190, name: 'PLASTIC PERFORATED ROLL BAG' },
];

// 이 마이그가 손대는 행은 전부 GIT 오너 소유여야 한다(id 오인 방지 2중 잠금).
// dev 리허설에서만 --owner-email / --pairs / --units 로 갈아끼운다(운영은 위 기본값).
// 안 돌려본 마이그를 운영에 처음 돌리지 않기 위한 것 — 로직은 완전히 같은 경로를 탄다.
const OWNER_EMAIL = arg('owner-email') || 'help@gitconsulting.group';
const PAIRS_ARG = arg('pairs');
const UNITS_ARG = arg('units');

const PAIRS_EFFECTIVE = PAIRS_ARG ? JSON.parse(PAIRS_ARG) : PAIRS;
const UNITS_EFFECTIVE = UNITS_ARG ? JSON.parse(UNITS_ARG) : UNIT_ONLY;

const norm = (s) => String(s || '').normalize('NFKC').replace(/\s+/g, ' ').trim().toLowerCase();

/** 입고 타깃 컬럼이 이미 배포됐는지 — 없으면 스택 대신 한 줄로 끊는다. */
async function requireTargetColumns() {
  const [rows] = await sequelize.query(
    `SELECT TABLE_NAME t, COLUMN_NAME c FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME IN ('purchase_order_items','ingredient_seller_products')
        AND COLUMN_NAME IN ('product_id','brand_product_id')`
  );
  const have = new Set(rows.map(r => `${r.t}.${r.c}`));
  const need = [
    'purchase_order_items.product_id', 'purchase_order_items.brand_product_id',
    'ingredient_seller_products.product_id', 'ingredient_seller_products.brand_product_id',
  ];
  const missing = need.filter(k => !have.has(k));
  if (missing.length) {
    console.error(`  ✗ 입고 타깃 컬럼 없음 (${missing.join(', ')}) — migrate-po-item-product-target.js 배포 후 실행`);
    process.exit(1);
  }
}

(async () => {
  console.log(`▶ GIT 포장재 합치기 (${APPLY ? 'APPLY' : 'DRY-RUN'})`);
  await requireTargetColumns();
  const t = await sequelize.transaction();
  try {
    const { BrandProduct, ProductIngredient, IngredientSellerProduct, InventoryTransaction, User } = require('../models');
    const owner = await User.findOne({ where: sequelize.where(sequelize.fn('LOWER', sequelize.col('email')), OWNER_EMAIL), transaction: t });
    if (!owner) {
      console.log(`  – 오너 계정(${OWNER_EMAIL}) 없음 — 이 환경엔 대상이 없다. 아무것도 하지 않는다.`);
      await t.rollback();
      process.exit(0);
    }
    const ownedBy = (row) => row && row.owner_user_id != null && parseInt(row.owner_user_id, 10) === parseInt(owner.id, 10);
    let moved = 0, skipped = 0;

    for (const pair of PAIRS_EFFECTIVE) {
      const pi = await ProductIngredient.findByPk(pair.pi, { transaction: t });
      const bp = await BrandProduct.findByPk(pair.bp, { transaction: t });
      if (!pi || !bp) { console.log(`  – #${pair.pi}→P#${pair.bp} 행 없음 (skip)`); skipped++; continue; }
      if (norm(pi.name) !== norm(pair.name) || norm(bp.name) !== norm(pair.name)) {
        console.log(`  – #${pair.pi}→P#${pair.bp} 이름 불일치 (skip)\n      재고="${pi.name}" / 프로덕트="${bp.name}"`);
        skipped++; continue;
      }
      if (!ownedBy(pi) || !ownedBy(bp)) {
        console.log(`  – #${pair.pi}→P#${pair.bp} 소유자 불일치 (skip)`); skipped++; continue;
      }
      if (pi.is_active === false) { console.log(`  – #${pair.pi} 이미 비활성 (skip · 멱등)`); skipped++; continue; }

      const qty = parseFloat(pi.current_stock) || 0;
      const before = parseFloat(bp.current_stock) || 0;
      const after = Math.round((before + qty) * 100) / 100;
      const links = await IngredientSellerProduct.findAll({ where: { product_ingredient_id: pi.id }, transaction: t });

      console.log(`  ${APPLY ? '✓' : '·'} #${pi.id} "${pi.name}" ${qty}${pi.unit} → P#${bp.id} (${before} → ${after}) · 공급처 링크 ${links.length}개 이동 · 재고아이템 비활성`);
      if (!APPLY) { moved++; continue; }

      if (qty > 0) {
        await InventoryTransaction.create({
          entity_type: 'brand', entity_id: null,
          // ENUM 에 'transfer' 가 없다(리허설에서 적발 — 그대로 뒀으면 운영 적용이 통째로 실패).
          // 값을 새로 넣는 건 이 마이그의 범위가 아니라 기존 'adjustment' 를 쓰고 notes 로 구분한다.
          product_ingredient_id: pi.id, transaction_type: 'adjustment',
          quantity_change: -qty, unit: pi.unit, stock_after: 0,
          notes: `[merge:P1-GIT] into brand product #${bp.id} (${bp.name}) — 갈라진 재고 합치기`,
          created_by: null,
        }, { transaction: t });
        await InventoryTransaction.create({
          entity_type: 'brand', entity_id: null,
          brand_product_id: bp.id, transaction_type: 'adjustment',
          quantity_change: qty, unit: bp.stock_unit || bp.unit || pi.unit, stock_after: after,
          notes: `[merge:P1-GIT] from stock item #${pi.id} (${pi.name}) — 갈라진 재고 합치기`,
          created_by: null,
        }, { transaction: t });
        await pi.update({ current_stock: 0 }, { transaction: t });
        await bp.update({ current_stock: after }, { transaction: t });
      }
      // 공급처 연결을 프로덕트로 이동 — 넷 중 하나 규칙 유지(product_ingredient_id 는 비운다)
      for (const l of links) {
        await l.update({ product_ingredient_id: null, brand_product_id: bp.id }, { transaction: t });
      }
      await pi.update({ is_active: false }, { transaction: t });
      moved++;
    }

    // 단위만 채우는 것들 (NULL 인 것만 — 사람이 넣은 값은 덮지 않는다)
    let unitFixed = 0;
    for (const { bp: id, name } of UNITS_EFFECTIVE) {
      const bp = await BrandProduct.findByPk(id, { transaction: t });
      if (!bp) { console.log(`  – P#${id} 없음 (skip)`); continue; }
      if (norm(bp.name) !== norm(name)) {
        console.log(`  – P#${id} 이름 불일치 (skip) — 기대="${name}" / 실제="${bp.name}"`); continue;
      }
      if (!ownedBy(bp)) { console.log(`  – P#${id} 소유자 불일치 (skip)`); continue; }
      const patch = {};
      if (!bp.unit) patch.unit = 'pack';
      if (!bp.stock_unit) patch.stock_unit = 'pack';
      if (!Object.keys(patch).length) { console.log(`  – P#${id} 단위 이미 있음 (skip)`); continue; }
      console.log(`  ${APPLY ? '✓' : '·'} P#${id} "${bp.name}" 단위 → pack ${JSON.stringify(patch)}`);
      if (APPLY) await bp.update(patch, { transaction: t });
      unitFixed++;
    }

    // ── 단위 정합 (Fable 판정 2026-09-01)
    // 레시피 없는 프로덕트는 **그 자체가 재고아이템**이고, 판매·출고 차감이 quantity 를
    // 환산 없이 그대로 뺀다(brand_products 에 환산 필드가 없다). 그래서 판매 단위(unit)와
    // 재고 단위(stock_unit)가 다르면 숫자가 틀린다 → 둘을 같게 맞춘다.
    // "기본 pack" 은 단위가 아예 없는 행에만 적용된다(P#187 bottle → bottle 이 맞다).
    let unitAligned = 0;
    const ALIGN_IDS = [...PAIRS_EFFECTIVE.map(p => p.bp), ...UNITS_EFFECTIVE.map(u => u.bp)];
    for (const id of ALIGN_IDS) {
      const bp = await BrandProduct.findByPk(id, { transaction: t });
      if (!bp || !ownedBy(bp)) continue;
      const target = bp.unit || bp.stock_unit || 'pack';
      if (bp.unit === target && bp.stock_unit === target) continue;
      console.log(`  ${APPLY ? '✓' : '·'} P#${id} 단위 정합 ${bp.unit}/${bp.stock_unit} → ${target}/${target}`);
      if (APPLY) await bp.update({ unit: target, stock_unit: target }, { transaction: t });
      unitAligned++;
    }

    if (APPLY) { await t.commit(); } else { await t.rollback(); }
    console.log(`${APPLY ? '✓ 적용' : '· dry-run(롤백)'} — 합친 짝 ${moved} / 건너뜀 ${skipped} / 단위 보정 ${unitFixed} / 단위 정합 ${unitAligned}`);
    process.exit(0);
  } catch (e) {
    try { await t.rollback(); } catch (_) {}
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();
