/**
 * BG scope migration — production-safe (idempotent)
 *
 * 1. Adds owner_user_id to 7 BG-level tables (if missing)
 * 2. Adds brand_id to product_recipes / product_recipe_categories (if missing)
 * 3. Backfills via various join paths
 * 4. Reports orphan rows (does NOT delete — operator must confirm)
 *
 * Run BEFORE deploying new code (old code keeps working since it ignores new columns).
 *
 * Usage:
 *   node scripts/migrate-bg-scope-prod.js          # apply
 *   node scripts/migrate-bg-scope-prod.js --check  # report only, no DDL
 */
const { sequelize } = require('../config/database');

const CHECK_ONLY = process.argv.includes('--check');

const BG_TABLES = [
  'product_ingredients',
  'product_ingredient_categories',
  'suppliers',
  'brand_products',
  'brand_product_categories',
  'brand_product_option_groups',
  'brand_product_options',
];

const BRAND_TABLES = [
  'product_recipes',
  'product_recipe_categories',
];

async function colExists(table, col) {
  const [r] = await sequelize.query(`SHOW COLUMNS FROM \`${table}\` LIKE :c`, { replacements: { c: col } });
  return r.length > 0;
}

async function tableExists(t) {
  const [r] = await sequelize.query(`SHOW TABLES LIKE :t`, { replacements: { t } });
  return r.length > 0;
}

async function addCol(table, col, def) {
  if (await colExists(table, col)) {
    console.log(`  [${table}] ${col} already exists`);
    return;
  }
  if (CHECK_ONLY) {
    console.log(`  [${table}] WOULD ADD ${col}`);
    return;
  }
  await sequelize.query(`ALTER TABLE \`${table}\` ADD COLUMN ${col} ${def}`);
  console.log(`  [${table}] + ${col}`);
}

async function backfill(label, sql) {
  if (CHECK_ONLY) {
    console.log(`  WOULD: ${label}`);
    return;
  }
  try {
    const [r] = await sequelize.query(sql);
    console.log(`  ${label}: ${r.affectedRows ?? 0} rows`);
  } catch (e) {
    console.log(`  ${label}: ERR ${e.message.slice(0, 120)}`);
  }
}

async function reportOrphans() {
  console.log('\n=== Orphan report ===');
  for (const t of BG_TABLES) {
    if (!(await colExists(t, 'owner_user_id'))) continue;
    const [r] = await sequelize.query(`SELECT COUNT(*) total, SUM(owner_user_id IS NULL) orphan FROM \`${t}\``);
    const note = (t === 'suppliers') ? ' (suppliers null may be owner_type=restaurant — check)' : '';
    console.log(`  [${t}] total=${r[0].total} orphan=${r[0].orphan}${note}`);
  }
  for (const t of BRAND_TABLES) {
    if (!(await colExists(t, 'brand_id'))) continue;
    const [r] = await sequelize.query(`SELECT COUNT(*) total, SUM(brand_id IS NULL) orphan FROM \`${t}\``);
    console.log(`  [${t}] total=${r[0].total} orphan=${r[0].orphan} (brand_id)`);
  }
}

async function main() {
  console.log(`=== BG scope migration — ${CHECK_ONLY ? 'CHECK MODE' : 'APPLY'} ===\n`);

  // ─── Step 1: ADD columns ──────────────────────────────────────────
  console.log('Step 1: ADD columns');
  const ouCol = 'INT NULL';
  for (const t of BG_TABLES) {
    await addCol(t, 'owner_user_id', ouCol);
  }
  for (const t of BRAND_TABLES) {
    await addCol(t, 'brand_id', 'INT NULL');
  }

  // Add indexes (best-effort, ignore errors)
  if (!CHECK_ONLY) {
    for (const t of BG_TABLES) {
      try { await sequelize.query(`ALTER TABLE \`${t}\` ADD INDEX idx_${t.slice(0,20)}_owner_user (owner_user_id)`); } catch {}
    }
    for (const t of BRAND_TABLES) {
      try { await sequelize.query(`ALTER TABLE \`${t}\` ADD INDEX idx_${t.slice(0,20)}_brand (brand_id)`); } catch {}
    }
  }

  // ─── Step 2: Backfill brand-scoped tables (recipes via brand_products link) ───
  console.log('\nStep 2: Backfill brand_id on recipes/recipe_categories');

  // product_recipes ← brand_products that link to a recipe
  await backfill(
    'product_recipes via brand_products → brand_product_brands',
    `UPDATE product_recipes pr
       JOIN brand_products bp ON bp.product_recipe_id = pr.id
       JOIN brand_product_brands bpb ON bpb.product_id = bp.id
        SET pr.brand_id = bpb.brand_id
      WHERE pr.brand_id IS NULL`
  );

  // product_recipe_categories ← recipes in this category
  await backfill(
    'product_recipe_categories via product_recipes',
    `UPDATE product_recipe_categories prc
       JOIN product_recipes pr ON pr.category_id = prc.id
        SET prc.brand_id = pr.brand_id
      WHERE prc.brand_id IS NULL AND pr.brand_id IS NOT NULL`
  );

  // ─── Step 3: Backfill BG-scoped tables ────────────────────────────
  console.log('\nStep 3: Backfill owner_user_id');

  // suppliers (owner_type='brand') ← brands.owner_id via existing brand_id
  await backfill(
    'suppliers (brand-type) via suppliers.brand_id → brands.owner_id',
    `UPDATE suppliers s
       JOIN brands b ON b.id = s.brand_id
        SET s.owner_user_id = b.owner_id
      WHERE s.owner_type = 'brand' AND s.owner_user_id IS NULL AND b.owner_id IS NOT NULL`
  );

  // suppliers fallback: via N:M supplier_brands (first connection)
  if (await tableExists('supplier_brands')) {
    await backfill(
      'suppliers (brand-type) via supplier_brands N:M (fallback)',
      `UPDATE suppliers s
         JOIN (SELECT supplier_id, MIN(brand_id) AS bid FROM supplier_brands GROUP BY supplier_id) sb
              ON sb.supplier_id = s.id
         JOIN brands b ON b.id = sb.bid
          SET s.owner_user_id = b.owner_id
        WHERE s.owner_type = 'brand' AND s.owner_user_id IS NULL AND b.owner_id IS NOT NULL`
    );
  }

  // brand_products ← brand_product_brands → brand.owner_id
  await backfill(
    'brand_products via brand_product_brands → brands.owner_id',
    `UPDATE brand_products bp
       JOIN (SELECT product_id, MIN(brand_id) AS bid FROM brand_product_brands GROUP BY product_id) bpb
            ON bpb.product_id = bp.id
       JOIN brands b ON b.id = bpb.bid
        SET bp.owner_user_id = b.owner_id
      WHERE bp.owner_user_id IS NULL AND b.owner_id IS NOT NULL`
  );

  // brand_product_categories ← products in category
  await backfill(
    'brand_product_categories via brand_products',
    `UPDATE brand_product_categories bpc
       JOIN (SELECT category_id, MIN(owner_user_id) AS oid FROM brand_products WHERE owner_user_id IS NOT NULL GROUP BY category_id) bp
            ON bp.category_id = bpc.id
        SET bpc.owner_user_id = bp.oid
      WHERE bpc.owner_user_id IS NULL`
  );

  // brand_product_option_groups ← option_group_products join → brand_products.owner_user_id
  if (await tableExists('brand_product_option_group_products')) {
    await backfill(
      'brand_product_option_groups via brand_product_option_group_products',
      `UPDATE brand_product_option_groups g
         JOIN brand_product_option_group_products jp ON jp.option_group_id = g.id
         JOIN brand_products bp ON bp.id = jp.product_id
          SET g.owner_user_id = bp.owner_user_id
        WHERE g.owner_user_id IS NULL AND bp.owner_user_id IS NOT NULL`
    );
  }

  // brand_product_options ← parent group
  await backfill(
    'brand_product_options via parent group',
    `UPDATE brand_product_options o
       JOIN brand_product_option_groups g ON g.id = o.option_group_id
        SET o.owner_user_id = g.owner_user_id
      WHERE o.owner_user_id IS NULL AND g.owner_user_id IS NOT NULL`
  );

  // product_ingredients ← product_recipe_ingredients → product_recipes → brands → owner
  await backfill(
    'product_ingredients via recipes → brand → owner',
    `UPDATE product_ingredients pi
       JOIN (
         SELECT pri.ingredient_id, MIN(b.owner_id) AS oid
           FROM product_recipe_ingredients pri
           JOIN product_recipes pr ON pr.id = pri.recipe_id
           JOIN brands b ON b.id = pr.brand_id
          WHERE b.owner_id IS NOT NULL
          GROUP BY pri.ingredient_id
       ) src ON src.ingredient_id = pi.id
        SET pi.owner_user_id = src.oid
      WHERE pi.owner_user_id IS NULL`
  );

  // product_ingredient_categories ← ingredients in category
  await backfill(
    'product_ingredient_categories via product_ingredients',
    `UPDATE product_ingredient_categories pic
       JOIN (SELECT category_id, MIN(owner_user_id) AS oid FROM product_ingredients WHERE owner_user_id IS NOT NULL GROUP BY category_id) pi
            ON pi.category_id = pic.id
        SET pic.owner_user_id = pi.oid
      WHERE pic.owner_user_id IS NULL`
  );

  // ─── Step 4: Report orphans ───────────────────────────────────────
  await reportOrphans();

  console.log('\nDone. Orphan rows are NOT deleted — review and decide manually.');
  process.exit(0);
}

main().catch(e => { console.error('FATAL', e); process.exit(1); });
