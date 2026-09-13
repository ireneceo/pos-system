#!/usr/bin/env node
/**
 * 매장 메뉴를 브랜드 메뉴로 «역으로 올리기» (adopt) — 2026-09-13 Irene 지시
 * ---------------------------------------------------------------------------
 * 왜: K-DINE IPC(매장8)의 메뉴 105개가 브랜드 메뉴와 연결되지 않은 매장 독립 메뉴로만 있어,
 *     브랜드(K-DINE with MIN)에서 고쳐도 매장에 내려가지 않고 가맹점에 뿌릴 원본도 없었다.
 *     Irene: "K-DINE IPC 메뉴가 모두 그대로 K-DINE with MIN 브랜드로 연결되고 BG 가 관리하는 형태가 되게 해."
 *
 * 무엇을: 매장 상품 → 같은 내용의 브랜드 메뉴 생성 + 1:1 연결(push 의 역방향, 같은 필드 대응).
 *   ⛔ 매장 상품의 이름·가격·옵션·활성여부는 **바꾸지 않는다**(연결 칸만 채운다).
 *   ⛔ 잠금은 전부 false 로 만든다 — 매장이 지금 하던 대로 계속 고칠 수 있어야 한다.
 *
 * 멱등: 이미 연결된 상품은 건너뛴다. 같은 이름의 브랜드 메뉴가 있으면 재사용한다.
 * 되돌리기: --undo <스냅샷파일> — 만든 브랜드 메뉴·카테고리 삭제 + 매장 연결 칸 원복.
 *
 * 사용: node scripts/adopt-restaurant-menus-to-brand.js --brand 2 --restaurant 8 [--apply]
 */
const path = require('path');
try { require('dotenv').config({ path: path.resolve(__dirname, '../.env'), quiet: true }); } catch {}
const fs = require('fs');

const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const has = (n) => argv.includes(n);
const BRAND_ID = parseInt(arg('--brand', '2'), 10);
const RID = parseInt(arg('--restaurant', '8'), 10);
const APPLY = has('--apply');
const UNDO_FILE = arg('--undo', null);

const { sequelize } = require('../config/database');
const Product = require('../models/Product');
const BrandMenu = require('../models/BrandMenu');
const BrandMenuCategory = require('../models/BrandMenuCategory');
const BrandMenuRestaurant = require('../models/BrandMenuRestaurant');
const Category = require('../models/Category');
const OptionGroup = require('../models/OptionGroup');
const Option = require('../models/Option');
const BrandMenuOptionGroup = require('../models/BrandMenuOptionGroup');
const BrandMenuOption = require('../models/BrandMenuOption');
const BrandMenuOptionGroupLink = require('../models/BrandMenuOptionGroupLink');

const LOCKS = { name: false, price: false, category: false, image: false, options: false, sort_order: false, set_items: false };

async function undo() {
  const snap = JSON.parse(fs.readFileSync(UNDO_FILE, 'utf8'));
  console.log(`되돌리기: 스냅샷 ${UNDO_FILE}`);
  const t = await sequelize.transaction();
  try {
    for (const p of (snap.products || [])) {
      await Product.update({
        brand_menu_id: p.before.brand_menu_id, brand_menu_synced_version: p.before.brand_menu_synced_version,
        brand_menu_synced_at: p.before.brand_menu_synced_at, brand_menu_locks_snapshot: p.before.brand_menu_locks_snapshot,
        brand_menu_link_status: p.before.brand_menu_link_status,
      }, { where: { id: p.id }, transaction: t });
    }
    if (snap.created_menu_ids?.length) {
      await BrandMenuRestaurant.destroy({ where: { brand_menu_id: snap.created_menu_ids }, transaction: t });
      await BrandMenu.destroy({ where: { id: snap.created_menu_ids }, transaction: t });
    }
    if (snap.created_category_ids?.length) await BrandMenuCategory.destroy({ where: { id: snap.created_category_ids }, transaction: t });
    if (snap.created_link_ids?.length) await BrandMenuOptionGroupLink.destroy({ where: { id: snap.created_link_ids }, transaction: t });
    if (snap.created_option_ids?.length) await BrandMenuOption.destroy({ where: { id: snap.created_option_ids }, transaction: t });
    if (snap.created_group_ids?.length) await BrandMenuOptionGroup.destroy({ where: { id: snap.created_group_ids }, transaction: t });
    for (const g of (snap.local_groups || [])) {
      await OptionGroup.update({ brand_menu_option_group_id: g.before.brand_menu_option_group_id,
        brand_menu_synced_version: g.before.brand_menu_synced_version }, { where: { id: g.id }, transaction: t });
    }
    await t.commit();
    console.log(`✓ 되돌리기 완료 — 매장 상품 ${snap.products.length}건 원복 · 브랜드 메뉴 ${snap.created_menu_ids.length}건·카테고리 ${snap.created_category_ids.length}건 삭제`);
  } catch (e) { await t.rollback(); console.error('되돌리기 실패:', e.message); process.exit(1); }
  process.exit(0);
}

async function fixShared() {
  const products = await Product.findAll({ where: { restaurant_id: RID }, order: [['id', 'ASC']] });
  const byMenu = new Map();
  for (const p of products) {
    if (!p.brand_menu_id) continue;
    if (!byMenu.has(p.brand_menu_id)) byMenu.set(p.brand_menu_id, []);
    byMenu.get(p.brand_menu_id).push(p);
  }
  const shared = [...byMenu.entries()].filter(([, arr]) => arr.length > 1);
  console.log(`브랜드 메뉴를 공유 중인 묶음 ${shared.length}건 (매장 상품 ${shared.reduce((a, [, x]) => a + x.length, 0)}개)`);
  if (!APPLY) { shared.forEach(([id, arr]) => console.log('   메뉴', id, '←', arr.map(p => p.id + ':' + p.name).join(' , '))); console.log('\n(미리보기 — --apply 로 반영)'); process.exit(0); }

  const snap = { at: new Date().toISOString(), mode: 'fix-shared', brand_id: BRAND_ID, restaurant_id: RID,
                 created_category_ids: [], created_menu_ids: [], products: [] };
  const restCats = await Category.findAll({ where: { restaurant_id: RID } });
  const restCatById = new Map(restCats.map(c => [String(c.id), c]));
  const brandCats = await BrandMenuCategory.findAll({ where: { brand_id: BRAND_ID } });
  const brandCatByName = new Map(brandCats.map(c => [c.name.trim(), c]));
  const t = await sequelize.transaction();
  try {
    for (const [menuId, arr] of shared) {
      const src = await BrandMenu.findByPk(menuId, { transaction: t });
      for (const p of arr.slice(1)) {                       // 첫 상품은 기존 메뉴를 그대로 쓴다
        const catName = (restCatById.get(String(p.category))?.name || 'Uncategorized').trim();
        const bm = await BrandMenu.create({
          brand_id: BRAND_ID, category_id: brandCatByName.get(catName)?.id || src.category_id,
          name: p.name, description: p.description || null, image_url: p.image || null, emoji: p.emoji || null,
          recommended_price: p.price || 0, is_active: true,
          after_meal: p.after_meal === true, set_only: p.set_only === true,
          sort_order: p.display_order || 0, version: 1, distribution_mode: 'manual', scope_mode: 'selected',
          is_set_menu: !!p.is_set_menu, set_items: p.set_items || null, set_groups: null,
          product_recipe_id: p.product_recipe_id || null, recipe_id: p.recipe_id || null,
          lock_name: false, lock_price: false, lock_category: false, lock_image: false,
          lock_options: false, lock_sort_order: false, lock_set_items: false,
        }, { transaction: t });
        snap.created_menu_ids.push(bm.id);
        snap.products.push({ id: p.id, name: p.name, before: {
          brand_menu_id: p.brand_menu_id, brand_menu_synced_version: p.brand_menu_synced_version,
          brand_menu_synced_at: p.brand_menu_synced_at, brand_menu_locks_snapshot: p.brand_menu_locks_snapshot,
          brand_menu_link_status: p.brand_menu_link_status } });
        await Product.update({ brand_menu_id: bm.id, brand_menu_synced_version: bm.version,
          brand_menu_synced_at: new Date(), brand_menu_locks_snapshot: LOCKS, brand_menu_link_status: 'in_sync' },
          { where: { id: p.id }, transaction: t });
        await BrandMenuRestaurant.findOrCreate({ where: { brand_menu_id: bm.id, restaurant_id: RID },
          defaults: { brand_menu_id: bm.id, restaurant_id: RID }, transaction: t });
      }
    }
    await t.commit();
  } catch (e) { await t.rollback(); console.error('실패 — 반영 없음:', e.message); process.exit(1); }
  const file = `/var/www/backups/adopt-fixshared-brand${BRAND_ID}-rid${RID}-${Date.now()}.json`;
  fs.writeFileSync(file, JSON.stringify(snap, null, 1));
  console.log(`✓ 1:1 로 갈라냄 — 새 브랜드 메뉴 ${snap.created_menu_ids.length}건 · 다시 연결 ${snap.products.length}건`);
  console.log(`  되돌리기: node scripts/adopt-restaurant-menus-to-brand.js --undo ${file}`);
  process.exit(0);
}

/**
 * 옵션 올리기 — 매장 옵션그룹/옵션을 브랜드 옵션그룹/옵션으로 만들고, 각 브랜드 메뉴에 연결한다.
 * 대응은 내려보낼 때(ensureLocalOptionGroups)의 **역방향**으로 맞춘다:
 *   required → is_required · multiple → max_select(>1) · price → extra_price · displayOrder → sort_order
 * ⛔ 매장 옵션그룹/옵션의 내용은 바꾸지 않는다 — 브랜드 쪽 거울을 만들고 연결 칸(brand_menu_option_group_id)만 채운다.
 */
async function adoptOptions() {
  const products = await Product.findAll({ where: { restaurant_id: RID }, order: [['id', 'ASC']] });
  const linked = products.filter(p => p.brand_menu_id);
  const localGroups = await OptionGroup.findAll({ where: { restaurant_id: RID } });
  const localOpts = await Option.findAll({ where: { option_group_id: localGroups.map(g => g.id) } });
  const optsByGroup = new Map();
  localOpts.forEach(o => { const k = o.option_group_id; if (!optsByGroup.has(k)) optsByGroup.set(k, []); optsByGroup.get(k).push(o); });
  const brandGroups = await BrandMenuOptionGroup.findAll({ where: { brand_id: BRAND_ID } });
  const brandGroupByName = new Map(brandGroups.map(g => [g.name.trim(), g]));
  const needGroups = localGroups.filter(g => !brandGroupByName.has((g.name || '').trim()));
  const linkCount = linked.reduce((a, p) => a + ((Array.isArray(p.optionGroups) ? p.optionGroups : []).length), 0);

  console.log(`\n브랜드 ${BRAND_ID} ← 매장 ${RID} 옵션`);
  console.log(`  매장 옵션그룹 ${localGroups.length}개 · 옵션 ${localOpts.length}개`);
  console.log(`  만들 브랜드 옵션그룹 ${needGroups.length}개 ${needGroups.length ? '· ' + needGroups.map(g => g.name).join(', ') : ''}`);
  console.log(`  메뉴↔옵션그룹 연결 ${linkCount}건 (메뉴 ${linked.length}개)`);
  if (!APPLY) { console.log('\n(미리보기 — --apply 로 반영)'); process.exit(0); }

  const snap = { at: new Date().toISOString(), mode: 'options', brand_id: BRAND_ID, restaurant_id: RID,
                 created_group_ids: [], created_option_ids: [], created_link_ids: [], local_groups: [] };
  const t = await sequelize.transaction();
  try {
    const brandIdOfLocal = new Map();
    for (const g of localGroups) {
      const name = (g.name || '').trim();
      let bg = brandGroupByName.get(name);
      const opts = optsByGroup.get(g.id) || [];
      if (!bg) {
        bg = await BrandMenuOptionGroup.create({
          brand_id: BRAND_ID, name,
          min_select: g.required ? 1 : 0,
          max_select: g.multiple ? Math.max(opts.length, 2) : 1,
          is_required: !!g.required, is_active: g.isActive !== false, version: 1,
        }, { transaction: t });
        brandGroupByName.set(name, bg); snap.created_group_ids.push(bg.id);
        for (const o of opts) {
          const bo = await BrandMenuOption.create({ group_id: bg.id, name: o.name,
            extra_price: o.price || 0, sort_order: o.displayOrder || 0, is_active: o.isActive !== false }, { transaction: t });
          snap.created_option_ids.push(bo.id);
        }
      }
      brandIdOfLocal.set(g.id, bg.id);
      snap.local_groups.push({ id: g.id, before: { brand_menu_option_group_id: g.brand_menu_option_group_id, brand_menu_synced_version: g.brand_menu_synced_version } });
      await OptionGroup.update({ brand_menu_option_group_id: bg.id, brand_menu_synced_version: 1 },
        { where: { id: g.id }, transaction: t });
    }
    for (const p of linked) {
      const ids = Array.isArray(p.optionGroups) ? p.optionGroups : [];
      let i = 0;
      for (const localId of ids) {
        const bgId = brandIdOfLocal.get(Number(localId));
        if (!bgId) continue;
        const [row, made] = await BrandMenuOptionGroupLink.findOrCreate({
          where: { brand_menu_id: p.brand_menu_id, option_group_id: bgId },
          defaults: { brand_menu_id: p.brand_menu_id, option_group_id: bgId, sort_order: i },
          transaction: t });
        if (made) snap.created_link_ids.push(row.id);
        i++;
      }
    }
    await t.commit();
  } catch (e) { await t.rollback(); console.error('실패 — 반영 없음:', e.message); process.exit(1); }
  const file = `/var/www/backups/adopt-options-brand${BRAND_ID}-rid${RID}-${Date.now()}.json`;
  fs.writeFileSync(file, JSON.stringify(snap, null, 1));
  console.log(`\n✓ 옵션 반영 완료 — 브랜드 옵션그룹 ${snap.created_group_ids.length}개 · 옵션 ${snap.created_option_ids.length}개 · 메뉴 연결 ${snap.created_link_ids.length}건`);
  console.log(`  되돌리기: node scripts/adopt-restaurant-menus-to-brand.js --undo ${file}`);
  process.exit(0);
}

(async () => {
  if (UNDO_FILE) return undo();
  if (has('--options')) return adoptOptions();
  if (has('--fix-shared')) return fixShared();

  const products = await Product.findAll({ where: { restaurant_id: RID }, order: [['id', 'ASC']] });
  // products.category 는 이 매장에서 «카테고리 번호» 를 담는다(실측: 18,20,21…) → 이름으로 바꾼다.
  const restCats = await Category.findAll({ where: { restaurant_id: RID } });
  const restCatById = new Map(restCats.map(c => [String(c.id), c]));
  const catNameOf = (p) => {
    const raw = String(p.category || '').trim();
    const hit = restCatById.get(raw);
    return (hit ? hit.name : (raw && !/^\d+$/.test(raw) ? raw : 'Uncategorized')).trim();
  };
  const catMetaOf = (name) => {
    const c = restCats.find(x => (x.name || '').trim() === name);
    return { emoji: c?.emoji || null, sort_order: c?.displayOrder || 0, is_active: c ? c.isActive !== false : true };
  };
  const cats = [...new Set(products.map(catNameOf).filter(Boolean))];
  const existingCats = await BrandMenuCategory.findAll({ where: { brand_id: BRAND_ID } });
  const catByName = new Map(existingCats.map(c => [c.name.trim(), c]));
  const existingMenus = await BrandMenu.findAll({ where: { brand_id: BRAND_ID } });
  const menuByName = new Map(existingMenus.map(m => [m.name.trim(), m]));

  const toLink = products.filter(p => !p.brand_menu_id);
  const alreadyLinked = products.length - toLink.length;
  const newCats = cats.filter(c => !catByName.has(c));
  const newMenus = toLink.filter(p => !menuByName.has((p.name || '').trim()));

  console.log(`\n브랜드 ${BRAND_ID} ← 매장 ${RID}`);
  console.log(`  매장 상품 ${products.length}건 (이미 연결됨 ${alreadyLinked})`);
  console.log(`  만들 브랜드 카테고리 ${newCats.length}건 ${newCats.length ? '· ' + newCats.slice(0, 8).join(', ') : ''}`);
  console.log(`  만들 브랜드 메뉴 ${newMenus.length}건 · 기존 이름 재사용 ${toLink.length - newMenus.length}건`);
  if (!APPLY) { console.log('\n(미리보기 — 실제 반영하려면 --apply)'); process.exit(0); }

  const snap = { at: new Date().toISOString(), brand_id: BRAND_ID, restaurant_id: RID,
                 created_category_ids: [], created_menu_ids: [], products: [] };
  const t = await sequelize.transaction();
  try {
    // ① 카테고리
    for (const name of cats) {
      if (catByName.has(name)) continue;
      const meta = catMetaOf(name);
      const c = await BrandMenuCategory.create({ brand_id: BRAND_ID, name, emoji: meta.emoji,
        sort_order: meta.sort_order, is_active: meta.is_active }, { transaction: t });
      catByName.set(name, c); snap.created_category_ids.push(c.id);
    }
    // ② 메뉴 + 연결
    for (const p of toLink) {
      const name = (p.name || '').trim();
      let bm = menuByName.get(name);
      if (!bm) {
        bm = await BrandMenu.create({
          brand_id: BRAND_ID,
          category_id: catByName.get(catNameOf(p))?.id || null,
          name, description: p.description || null,
          image_url: p.image || null, emoji: p.emoji || null,
          recommended_price: p.price || 0,
          is_active: true,                       // 브랜드 쪽 템플릿은 활성 — 매장 활성여부는 건드리지 않는다
          after_meal: p.after_meal === true, set_only: p.set_only === true,
          sort_order: p.display_order || 0, version: 1,
          distribution_mode: 'manual', scope_mode: 'selected',
          is_set_menu: !!p.is_set_menu, set_items: p.set_items || null, set_groups: null,
          product_recipe_id: p.product_recipe_id || null, recipe_id: p.recipe_id || null,
          lock_name: false, lock_price: false, lock_category: false, lock_image: false,
          lock_options: false, lock_sort_order: false, lock_set_items: false,
        }, { transaction: t });
        menuByName.set(name, bm); snap.created_menu_ids.push(bm.id);
      }
      snap.products.push({ id: p.id, name, before: {
        brand_menu_id: p.brand_menu_id, brand_menu_synced_version: p.brand_menu_synced_version,
        brand_menu_synced_at: p.brand_menu_synced_at, brand_menu_locks_snapshot: p.brand_menu_locks_snapshot,
        brand_menu_link_status: p.brand_menu_link_status } });
      await Product.update({
        brand_menu_id: bm.id, brand_menu_synced_version: bm.version, brand_menu_synced_at: new Date(),
        brand_menu_locks_snapshot: LOCKS, brand_menu_link_status: 'in_sync',
      }, { where: { id: p.id }, transaction: t });
      const [, made] = await BrandMenuRestaurant.findOrCreate({
        where: { brand_menu_id: bm.id, restaurant_id: RID }, defaults: { brand_menu_id: bm.id, restaurant_id: RID }, transaction: t });
      if (made) { /* 배포 대상 기록 */ }
    }
    await t.commit();
  } catch (e) { await t.rollback(); console.error('실패 — 아무것도 반영되지 않았습니다:', e.message); process.exit(1); }

  const file = `/var/www/backups/adopt-brand${BRAND_ID}-rid${RID}-${Date.now()}.json`;
  fs.writeFileSync(file, JSON.stringify(snap, null, 1));
  console.log(`\n✓ 반영 완료 — 브랜드 메뉴 ${snap.created_menu_ids.length}건·카테고리 ${snap.created_category_ids.length}건 생성 · 매장 상품 ${snap.products.length}건 연결`);
  console.log(`  되돌리기: node scripts/adopt-restaurant-menus-to-brand.js --undo ${file}`);
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
