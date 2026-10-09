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
 *
 * --refresh (2026-10-04 · Fable 판정 2026-09-29 §3-2 ①② · Irene 「권고대로 해」 — D1′=A 브랜드 원본 잠금)
 *   브랜드 원본을 **매장 현재값**으로 다시 맞춘다. 9/13 adopt 뒤 매장 계정이 메뉴를 고쳐(9/24 119건)
 *   브랜드 사본이 낡았고, 그 상태로 내려보내면 세트·설명·이모지가 9/13 값으로 덮이고 옵션이 두 번 붙는다.
 *   ① 연결된 메뉴: 이름·가격·분류·사진·설명·이모지·세트(set_items·set_groups 역변환)·세트전용·식후·레시피·순서 ← 매장
 *   ② 매장에만 있는 상품: 브랜드 메뉴를 만들어 연결 (같은 이름의 미연결 브랜드 메뉴가 있으면 재사용)
 *   ③ 어떤 매장에도 연결되지 않은 브랜드 메뉴: 비활성 (지우지 않는다)
 *   ④ 옵션: 매장 옵션그룹 = 미러. 브랜드 그룹 내용을 매장 그룹에 맞추고, 매장 그룹에 미러 연결 칸을 채우고,
 *      메뉴↔옵션그룹 연결을 매장 상품의 optionGroups 와 똑같이 만든다(그래야 내려보내도 옵션이 두 번 안 붙는다).
 *   ⛔ 매장 쪽 값은 하나도 바꾸지 않는다(연결 칸·미러 칸만). 버전은 올리지 않는다(내용이 같으니 내려보낼 것이 없다).
 *   미리보기가 기본이고 --apply 로 한 트랜잭션 반영 · 스냅샷 · --undo.
 *
 * --refresh --brand-only (2026-10-09 · Irene «절대 K-DINE IPC 메뉴를 건드리면 안돼»)
 *   위 refresh 에서 **매장 표 쓰기를 전부 뺀다** — products(연결 칸)·option_groups(미러 칸)·brand_menu_restaurants(배포 대상) 0행.
 *   브랜드 메뉴·카테고리·옵션·메뉴↔옵션 연결만 매장 현재값으로 맞춘다. 매장에만 있는 상품의 브랜드 메뉴는 만들되
 *   **연결하지 않고 배포 대상에도 넣지 않는다**(scope selected · 대상 0 → 내려보내도 아무 매장에 안 감).
 *   매장 표 쓰기 함수는 실행 중 막아 둔다(호출되면 예외 → 트랜잭션 전체 취소). --lock 과 함께 쓰지 않는다.
 *
 * --lock (같은 판정 §3-2 ③ — 반드시 --refresh 반영 뒤)
 *   매장에 연결된 브랜드 메뉴의 잠금 5칸(이름·가격·분류·사진·옵션) 켬 + 배포 auto + version+1 → 그 매장으로 sync 1회.
 *   이후 매장은 판매여부·품절·재고·주방만 만지고, 메뉴 편집은 브랜드 화면에서 한다.
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
const BRAND_ONLY = has('--brand-only');
const UNDO_FILE = arg('--undo', null);

const { sequelize } = require('../config/database');
// ⚠ 반드시 models/index 로 읽는다 (2026-10-04). option_groups.brand_menu_option_group_id 는 index.js 의
//   belongsTo 가 붙이는 칸이라, 모델 파일을 직접 require 하면 그 칸이 없어 update 가 **조용히 버린다**.
//   9/13 --options 실행 뒤 운영 매장 8 옵션그룹의 미러 연결이 전부 NULL 이었던 원인이 이것이다.
const {
  Product, BrandMenu, BrandMenuCategory, BrandMenuRestaurant, Category, OptionGroup, Option,
  BrandMenuOptionGroup, BrandMenuOption, BrandMenuOptionGroupLink,
} = require('../models');

const LOCKS = { name: false, price: false, category: false, image: false, options: false, sort_order: false, set_items: false };

async function undo() {
  const snap = JSON.parse(fs.readFileSync(UNDO_FILE, 'utf8'));
  console.log(`되돌리기: 스냅샷 ${UNDO_FILE}`);
  const t = await sequelize.transaction();
  try {
    // refresh/lock 스냅샷: 갱신 전 행을 통째로 되돌린다(역순 — 같은 행이 여러 번 찍혔으면 가장 처음 값)
    for (const m of [...(snap.updated_menus || [])].reverse()) {
      const { id, createdAt, updatedAt, created_at, updated_at, ...rest } = m.before;
      await BrandMenu.update(rest, { where: { id: m.id }, transaction: t });
    }
    for (const g of [...(snap.updated_groups || [])].reverse()) {
      const { id, createdAt, updatedAt, created_at, updated_at, ...rest } = g.before;
      await BrandMenuOptionGroup.update(rest, { where: { id: g.id }, transaction: t });
    }
    for (const o of [...(snap.updated_options || [])].reverse()) {
      const { id, createdAt, updatedAt, created_at, updated_at, ...rest } = o.before;
      await BrandMenuOption.update(rest, { where: { id: o.id }, transaction: t });
    }
    for (const l of (snap.deleted_links || [])) {
      const { createdAt, updatedAt, created_at, updated_at, ...rest } = l;
      await BrandMenuOptionGroupLink.create(rest, { transaction: t });
    }
    if (snap.mode === 'lock') {
      for (const p of (snap.products || [])) {
        const { id, createdAt, updatedAt, created_at, updated_at, ...rest } = p.full;
        await Product.update(rest, { where: { id: p.id }, transaction: t });
      }
      snap.products = [];
    }
    for (const p of (snap.products || [])) {
      await Product.update({
        brand_menu_id: p.before.brand_menu_id, brand_menu_synced_version: p.before.brand_menu_synced_version,
        brand_menu_synced_at: p.before.brand_menu_synced_at, brand_menu_locks_snapshot: p.before.brand_menu_locks_snapshot,
        brand_menu_link_status: p.before.brand_menu_link_status,
      }, { where: { id: p.id }, transaction: t });
    }
    // 메뉴↔옵션 연결을 먼저 지운다 — 메뉴·옵션그룹을 가리키는 외래키라 나중에 지우면 되돌리기 전체가 실패한다(2026-10-09)
    if (snap.created_link_ids?.length) await BrandMenuOptionGroupLink.destroy({ where: { id: snap.created_link_ids }, transaction: t });
    if (snap.created_menu_ids?.length) {
      await BrandMenuRestaurant.destroy({ where: { brand_menu_id: snap.created_menu_ids }, transaction: t });
      await BrandMenu.destroy({ where: { id: snap.created_menu_ids }, transaction: t });
    }
    if (snap.created_category_ids?.length) await BrandMenuCategory.destroy({ where: { id: snap.created_category_ids }, transaction: t });
    if (snap.created_option_ids?.length) await BrandMenuOption.destroy({ where: { id: snap.created_option_ids }, transaction: t });
    if (snap.created_group_ids?.length) await BrandMenuOptionGroup.destroy({ where: { id: snap.created_group_ids }, transaction: t });
    for (const g of (snap.local_groups || [])) {
      await OptionGroup.update({ brand_menu_option_group_id: g.before.brand_menu_option_group_id,
        brand_menu_synced_version: g.before.brand_menu_synced_version }, { where: { id: g.id }, transaction: t });
    }
    await t.commit();
    console.log(`✓ 되돌리기 완료 — 매장 상품 ${(snap.products || []).length}건 원복 · 브랜드 메뉴 생성분 ${(snap.created_menu_ids || []).length}건 삭제 · 갱신분 ${(snap.updated_menus || []).length}건 복원`);
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
          // 어느 매장에서 올라온 메뉴인지 남긴다 — 브랜드 화면이 «매장 X 가 만든 것» 으로 보여준다
          //   (2026-09-17). 메뉴의 주인은 매장이므로, 브랜드 목록에서 출처가 보여야 헷갈리지 않는다.
          origin_restaurant_id: RID,
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

const norm = (v) => (v == null ? '' : String(v)).trim();
const same = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
const num = (v) => (v == null || v === '' ? null : Number(v));
const parseJsonish = (v) => { if (typeof v !== 'string') return v ?? null; try { return JSON.parse(v); } catch { return v; } };

/** 매장 set_groups(구성품 = 매장 상품 id) → 브랜드 set_groups(구성품 = brand_menu_id). sync 의 역방향. */
function reverseSetGroups(setGroups, productById) {
  const groups = parseJsonish(setGroups);
  if (!Array.isArray(groups) || !groups.length) return { value: null, dropped: 0 };
  let dropped = 0;
  const out = groups.map(g => ({
    ...g,
    items: (g.items || []).map(it => {
      const bmId = productById.get(Number(it.product_id))?.brand_menu_id;
      if (!bmId) { dropped++; return null; }
      return { ...it, product_id: Number(bmId) };
    }).filter(Boolean)
  })).filter(g => (g.items || []).length > 0);
  return { value: out.length ? out : null, dropped };
}

async function refresh() {
  const products = await Product.findAll({ where: { restaurant_id: RID }, order: [['id', 'ASC']] });
  const productById = new Map(products.map(p => [p.id, p]));
  const restCats = await Category.findAll({ where: { restaurant_id: RID } });
  const restCatById = new Map(restCats.map(c => [String(c.id), c]));
  const catNameOf = (p) => {
    const raw = norm(p.category);
    const hit = restCatById.get(raw);
    return norm(hit ? hit.name : (raw && !/^\d+$/.test(raw) ? raw : 'Uncategorized'));
  };
  const brandCats = await BrandMenuCategory.findAll({ where: { brand_id: BRAND_ID } });
  const brandCatByName = new Map(brandCats.map(c => [norm(c.name), c]));
  const brandMenus = await BrandMenu.findAll({ where: { brand_id: BRAND_ID } });
  const bmById = new Map(brandMenus.map(m => [m.id, m]));

  // 이 브랜드 메뉴에 연결된 상품(전 매장) — «브랜드에만 있음» 판정과 공유 메뉴 경고에 쓴다
  const allLinked = await Product.findAll({ where: { brand_menu_id: brandMenus.map(m => m.id) }, attributes: ['id', 'restaurant_id', 'brand_menu_id'] });
  const linkCountByMenu = new Map();
  allLinked.forEach(p => linkCountByMenu.set(p.brand_menu_id, (linkCountByMenu.get(p.brand_menu_id) || 0) + 1));

  const plan = { update: [], create: [], reuse: [], deactivate: [], shared: [], dropped_set_items: 0 };
  const rowsInRid = new Map();   // brand_menu_id → 이 매장 상품들
  products.filter(p => p.brand_menu_id && bmById.has(p.brand_menu_id)).forEach(p => {
    if (!rowsInRid.has(p.brand_menu_id)) rowsInRid.set(p.brand_menu_id, []);
    rowsInRid.get(p.brand_menu_id).push(p);
  });

  const targetOf = (p) => {
    const rs = reverseSetGroups(p.set_groups, productById);
    plan.dropped_set_items += rs.dropped;
    return {
      name: norm(p.name), recommended_price: num(p.price), category_name: catNameOf(p),
      image_url: p.image || null, description: p.description || null, emoji: p.emoji || null,
      is_set_menu: !!p.is_set_menu, set_items: parseJsonish(p.set_items) || null, set_groups: rs.value,
      set_only: p.set_only === true, after_meal: p.after_meal === true,
      recipe_id: p.recipe_id || null, product_recipe_id: p.product_recipe_id || null,
      sort_order: p.display_order || 0,
    };
  };
  const FIELDS = ['name', 'recommended_price', 'image_url', 'description', 'emoji', 'is_set_menu', 'set_items',
    'set_groups', 'set_only', 'after_meal', 'recipe_id', 'product_recipe_id', 'sort_order'];

  for (const [bmId, arr] of rowsInRid) {
    if (arr.length > 1) { plan.shared.push({ brand_menu_id: bmId, products: arr.map(p => p.id) }); continue; }
    const p = arr[0], bm = bmById.get(bmId), tgt = targetOf(p);
    const diff = {};
    for (const f of FIELDS) {
      const cur = f === 'recommended_price' ? num(bm[f]) : (['set_items', 'set_groups'].includes(f) ? parseJsonish(bm[f]) : bm[f]);
      if (!same(cur ?? null, tgt[f] ?? null)) diff[f] = { from: cur ?? null, to: tgt[f] ?? null };
    }
    const curCatName = norm(brandCats.find(c => c.id === bm.category_id)?.name);
    if (curCatName !== tgt.category_name) diff.category = { from: curCatName || null, to: tgt.category_name };
    if (bm.origin_restaurant_id !== RID) diff.origin_restaurant_id = { from: bm.origin_restaurant_id, to: RID };
    if (Object.keys(diff).length) plan.update.push({ brand_menu_id: bmId, product_id: p.id, name: tgt.name, diff, tgt });
  }
  const linkedNames = new Set([...rowsInRid.keys()].map(id => norm(bmById.get(id).name)));
  for (const p of products.filter(p => !p.brand_menu_id || !bmById.has(p.brand_menu_id))) {
    const tgt = targetOf(p);
    const reuse = brandMenus.find(m => norm(m.name) === tgt.name && !linkCountByMenu.get(m.id) && !linkedNames.has(tgt.name));
    (reuse ? plan.reuse : plan.create).push({ product_id: p.id, name: tgt.name, brand_menu_id: reuse ? reuse.id : null, tgt });
  }
  const reuseIds = new Set(plan.reuse.map(r => r.brand_menu_id));
  for (const m of brandMenus) {
    if (m.is_active && !linkCountByMenu.get(m.id) && !reuseIds.has(m.id)) plan.deactivate.push({ brand_menu_id: m.id, name: m.name });
  }

  // ── 옵션 계획 ──
  const localGroups = await OptionGroup.findAll({ where: { restaurant_id: RID }, order: [['id', 'ASC']] });
  const localOpts = await Option.findAll({ where: { option_group_id: localGroups.map(g => g.id) } });
  const optsByLocal = new Map();
  localOpts.forEach(o => { if (!optsByLocal.has(o.option_group_id)) optsByLocal.set(o.option_group_id, []); optsByLocal.get(o.option_group_id).push(o); });
  const usedLocalIds = new Set(products.flatMap(p => (parseJsonish(p.optionGroups) || []).map(Number)));
  const brandGroups = await BrandMenuOptionGroup.findAll({ where: { brand_id: BRAND_ID } });
  const brandGroupById = new Map(brandGroups.map(g => [g.id, g]));
  const claimed = new Set();
  const groupPlan = [];
  for (const g of localGroups) {
    if (!usedLocalIds.has(g.id)) { groupPlan.push({ local_id: g.id, name: g.name, action: 'unused-skip' }); continue; }
    let bg = g.brand_menu_option_group_id && brandGroupById.get(g.brand_menu_option_group_id);
    if (bg && claimed.has(bg.id)) bg = null;
    if (!bg) bg = brandGroups.find(x => norm(x.name) === norm(g.name) && !claimed.has(x.id)) || null;
    if (bg) claimed.add(bg.id);
    groupPlan.push({ local_id: g.id, name: g.name, action: bg ? 'mirror-existing' : 'create', brand_group_id: bg ? bg.id : null,
      options: (optsByLocal.get(g.id) || []).length });
  }

  // ── 미리보기 ──
  console.log(`\n[refresh${BRAND_ONLY ? ' --brand-only' : ''}] 브랜드 ${BRAND_ID} ← 매장 ${RID} 현재값`);
  if (BRAND_ONLY) console.log('  (매장 표 쓰기 0 — 매장에만 있는 상품의 브랜드 메뉴는 만들되 연결·배포 대상 없음, 매장 옵션그룹 미러 칸 그대로)');
  console.log(`  ① 갱신할 브랜드 메뉴 ${plan.update.length}건`);
  plan.update.forEach(u => console.log(`     #${u.brand_menu_id} ${u.name}: ${Object.keys(u.diff).join(', ')}`));
  console.log(`  ② 새로 만들 브랜드 메뉴 ${plan.create.length}건 · 이름 같은 미연결 메뉴 재사용 ${plan.reuse.length}건`);
  [...plan.create, ...plan.reuse].forEach(c => console.log(`     상품 ${c.product_id} ${c.name}${c.brand_menu_id ? ' → 재사용 #' + c.brand_menu_id : ''}`));
  console.log(`  ③ 비활성할 브랜드 메뉴(어느 매장에도 연결 없음) ${plan.deactivate.length}건`);
  plan.deactivate.forEach(d => console.log(`     #${d.brand_menu_id} ${d.name}`));
  console.log(`  ④ 옵션그룹: ${groupPlan.map(g => `${g.local_id}:${norm(g.name)}→${g.action}${g.brand_group_id ? '#' + g.brand_group_id : ''}`).join(' · ')}`);
  if (plan.shared.length) console.log(`  ⚠ 한 브랜드 메뉴를 여러 상품이 공유 — 건너뜀(먼저 --fix-shared): ${JSON.stringify(plan.shared)}`);
  if (plan.dropped_set_items) console.log(`  ⚠ 세트 구성품 중 연결 없는 상품 ${plan.dropped_set_items}개 — 브랜드 set_groups 에서 빠짐(이번 실행에서 새로 연결되는 것은 반영 시 다시 계산)`);
  const dupNames = groupPlan.filter(g => g.action !== 'unused-skip').map(g => norm(g.name)).filter((n, i, a) => a.indexOf(n) !== i);
  if (dupNames.length) console.log(`  ⚠ 이름이 같은 매장 옵션그룹 — 브랜드에도 같은 이름 그룹이 둘 생김: ${[...new Set(dupNames)].join(', ')}`);
  if (!APPLY) { console.log('\n(미리보기 — --apply 로 한 트랜잭션 반영)'); process.exit(0); }

  // ── 반영 ──
  const snap = { at: new Date().toISOString(), mode: 'refresh', brand_id: BRAND_ID, restaurant_id: RID,
    created_category_ids: [], created_menu_ids: [], products: [], updated_menus: [],
    created_group_ids: [], created_option_ids: [], created_link_ids: [], updated_groups: [], updated_options: [],
    deleted_links: [], local_groups: [], brand_only: BRAND_ONLY };
  if (BRAND_ONLY) {
    // 매장 표 쓰기를 구조로 막는다 — 실수로 호출되면 예외 → 아래 catch 가 전체 롤백
    const block = (name) => () => { throw new Error(`--brand-only 인데 매장 표 쓰기 호출: ${name}`); };
    for (const [M, n] of [[Product, 'Product'], [OptionGroup, 'OptionGroup'], [Option, 'Option'], [Category, 'Category'], [BrandMenuRestaurant, 'BrandMenuRestaurant']]) {
      for (const fn of ['update', 'create', 'bulkCreate', 'destroy', 'upsert', 'findOrCreate']) M[fn] = block(`${n}.${fn}`);
    }
  }
  const t = await sequelize.transaction();
  try {
    const catIdOf = async (name) => {
      let c = brandCatByName.get(name);
      if (!c) {
        const rc = restCats.find(x => norm(x.name) === name);
        c = await BrandMenuCategory.create({ brand_id: BRAND_ID, name, emoji: rc?.emoji || null,
          sort_order: rc?.displayOrder || 0, is_active: rc ? rc.isActive !== false : true }, { transaction: t });
        brandCatByName.set(name, c); snap.created_category_ids.push(c.id);
      }
      return c.id;
    };
    const attrsOf = async (tgt) => {
      const a = {};
      FIELDS.forEach(f => { a[f] = tgt[f] ?? null; });
      a.category_id = await catIdOf(tgt.category_name);
      a.origin_restaurant_id = RID;
      return a;
    };
    const linkProduct = async (p, bm) => {
      if (BRAND_ONLY) { p.brand_menu_id = bm.id; return; }   // 메모리에서만 — 세트 역변환·옵션 연결 계산용, DB 쓰기 0
      snap.products.push({ id: p.id, before: { brand_menu_id: p.brand_menu_id, brand_menu_synced_version: p.brand_menu_synced_version,
        brand_menu_synced_at: p.brand_menu_synced_at, brand_menu_locks_snapshot: p.brand_menu_locks_snapshot, brand_menu_link_status: p.brand_menu_link_status } });
      await Product.update({ brand_menu_id: bm.id, brand_menu_synced_version: bm.version, brand_menu_synced_at: new Date(),
        brand_menu_locks_snapshot: LOCKS, brand_menu_link_status: 'in_sync' }, { where: { id: p.id }, transaction: t });
      p.brand_menu_id = bm.id;   // 아래 set_groups 역변환이 새 연결을 보게
      await BrandMenuRestaurant.findOrCreate({ where: { brand_menu_id: bm.id, restaurant_id: RID },
        defaults: { brand_menu_id: bm.id, restaurant_id: RID }, transaction: t });
    };
    // ② 먼저 연결을 만든다 — 그래야 ①의 세트 역변환이 새로 연결된 구성품을 찾는다
    for (const c of plan.create) {
      const p = productById.get(c.product_id);
      const bm = await BrandMenu.create({ brand_id: BRAND_ID, ...(await attrsOf(c.tgt)), is_active: true, version: 1,
        distribution_mode: 'manual', scope_mode: 'selected', lock_name: false, lock_price: false, lock_category: false,
        lock_image: false, lock_options: false, lock_sort_order: false, lock_set_items: false }, { transaction: t });
      snap.created_menu_ids.push(bm.id); bmById.set(bm.id, bm);
      await linkProduct(p, bm);
    }
    for (const r of plan.reuse) {
      const bm = bmById.get(r.brand_menu_id);
      snap.updated_menus.push({ id: bm.id, before: bm.toJSON() });
      await bm.update({ ...(await attrsOf(r.tgt)), is_active: true }, { transaction: t });
      await linkProduct(productById.get(r.product_id), bm);
    }
    // ① 기존 연결 메뉴 (+ 방금 만든 것의 세트 다시 계산)
    const recompute = [...plan.update.map(u => u.brand_menu_id), ...plan.create.map(c => productById.get(c.product_id).brand_menu_id),
      ...plan.reuse.map(r => r.brand_menu_id)];
    for (const bmId of [...new Set(recompute)]) {
      const p = products.find(x => x.brand_menu_id === bmId);
      if (!p) continue;
      const bm = bmById.get(bmId);
      if (!snap.updated_menus.find(u => u.id === bmId) && !snap.created_menu_ids.includes(bmId)) snap.updated_menus.push({ id: bmId, before: bm.toJSON() });
      plan.dropped_set_items = 0;
      await bm.update(await attrsOf(targetOf(p)), { transaction: t });
    }
    // ③ 비활성
    for (const d of plan.deactivate) {
      const bm = bmById.get(d.brand_menu_id);
      snap.updated_menus.push({ id: bm.id, before: bm.toJSON() });
      await bm.update({ is_active: false }, { transaction: t });
    }
    // ④ 옵션 — 매장 그룹 = 미러
    const bgOfLocal = new Map();
    for (const gp of groupPlan) {
      if (gp.action === 'unused-skip') continue;
      const g = localGroups.find(x => x.id === gp.local_id);
      const opts = optsByLocal.get(g.id) || [];
      const gAttrs = { name: norm(g.name), is_required: !!g.required, min_select: g.required ? 1 : 0,
        max_select: g.multiple ? Math.max(opts.length, 2) : 1, is_active: g.isActive !== false };
      let bg = gp.brand_group_id ? brandGroupById.get(gp.brand_group_id) : null;
      if (bg) { snap.updated_groups.push({ id: bg.id, before: bg.toJSON() }); await bg.update(gAttrs, { transaction: t }); }
      else { bg = await BrandMenuOptionGroup.create({ brand_id: BRAND_ID, ...gAttrs, version: 1 }, { transaction: t }); snap.created_group_ids.push(bg.id); }
      const bOpts = await BrandMenuOption.findAll({ where: { group_id: bg.id }, transaction: t });
      const used = new Set();
      for (const o of opts) {
        const oAttrs = { name: o.name, extra_price: o.price || 0, sort_order: o.displayOrder || 0, is_active: o.isActive !== false };
        const hit = bOpts.find(b => b.name === o.name && !used.has(b.id));
        if (hit) { used.add(hit.id); snap.updated_options.push({ id: hit.id, before: hit.toJSON() }); await hit.update(oAttrs, { transaction: t }); }
        else { const bo = await BrandMenuOption.create({ group_id: bg.id, ...oAttrs }, { transaction: t }); snap.created_option_ids.push(bo.id); }
      }
      for (const b of bOpts.filter(b => !used.has(b.id) && b.is_active)) {
        snap.updated_options.push({ id: b.id, before: b.toJSON() }); await b.update({ is_active: false }, { transaction: t });
      }
      if (!BRAND_ONLY) snap.local_groups.push({ id: g.id, before: { brand_menu_option_group_id: g.brand_menu_option_group_id, brand_menu_synced_version: g.brand_menu_synced_version } });
      if (!BRAND_ONLY) await OptionGroup.update({ brand_menu_option_group_id: bg.id, brand_menu_synced_version: bg.version }, { where: { id: g.id }, transaction: t });
      bgOfLocal.set(g.id, bg.id);
    }
    for (const p of products.filter(x => x.brand_menu_id && bmById.has(x.brand_menu_id))) {
      if ((rowsInRid.get(p.brand_menu_id) || []).length > 1) continue;
      const want = (parseJsonish(p.optionGroups) || []).map(Number).map(id => bgOfLocal.get(id)).filter(Boolean);
      const cur = await BrandMenuOptionGroupLink.findAll({ where: { brand_menu_id: p.brand_menu_id }, transaction: t });
      for (const l of cur.filter(l => !want.includes(l.option_group_id))) {
        snap.deleted_links.push(l.toJSON()); await l.destroy({ transaction: t });
      }
      for (let i = 0; i < want.length; i++) {
        const ex = cur.find(l => l.option_group_id === want[i]);
        if (ex) { if (ex.sort_order !== i) await ex.update({ sort_order: i }, { transaction: t }); continue; }
        const row = await BrandMenuOptionGroupLink.create({ brand_menu_id: p.brand_menu_id, option_group_id: want[i], sort_order: i }, { transaction: t });
        snap.created_link_ids.push(row.id);
      }
    }
    await t.commit();
  } catch (e) { await t.rollback(); console.error('실패 — 아무것도 반영되지 않았습니다:', e.message); process.exit(1); }
  const file = `/var/www/backups/adopt-refresh-brand${BRAND_ID}-rid${RID}-${Date.now()}.json`;
  fs.writeFileSync(file, JSON.stringify(snap, null, 1));
  console.log(`\n✓ refresh 반영 — 갱신 ${snap.updated_menus.length} · 생성 ${snap.created_menu_ids.length} · 연결 ${snap.products.length} · 옵션그룹 생성 ${snap.created_group_ids.length}/갱신 ${snap.updated_groups.length} · 메뉴↔옵션 연결 +${snap.created_link_ids.length}/-${snap.deleted_links.length}`);
  console.log(`  되돌리기: node scripts/adopt-restaurant-menus-to-brand.js --undo ${file}`);
  process.exit(0);
}

/** --lock: 잠금 5칸 + auto + version+1 → 이 매장으로 sync 1회 (refresh 반영 뒤에만). */
async function lockAndSync() {
  const { syncBrandMenuToRestaurant } = require('../services/brandMenuSyncService');
  const linked = await Product.findAll({ where: { restaurant_id: RID, brand_menu_id: { [require('sequelize').Op.ne]: null } }, attributes: ['id', 'brand_menu_id'] });
  const menus = await BrandMenu.findAll({ where: { brand_id: BRAND_ID, id: [...new Set(linked.map(p => p.brand_menu_id))], is_active: true } });
  const unmirrored = await OptionGroup.count({ where: { restaurant_id: RID, brand_menu_option_group_id: null } });
  console.log(`\n[lock] 브랜드 ${BRAND_ID} 메뉴 ${menus.length}건 → 잠금 5칸·auto·version+1 → 매장 ${RID} sync`);
  if (unmirrored) console.log(`  ⚠ 미러 연결이 없는 매장 옵션그룹 ${unmirrored}개 — 쓰는 그룹이면 --refresh 를 먼저 반영할 것`);
  if (!APPLY) { console.log('\n(미리보기 — --apply 로 반영)'); process.exit(0); }
  const snap = { at: new Date().toISOString(), mode: 'lock', brand_id: BRAND_ID, restaurant_id: RID, updated_menus: [], products: [] };
  const t = await sequelize.transaction();
  try {
    const prods = await Product.findAll({ where: { id: linked.map(p => p.id) }, transaction: t });
    prods.forEach(p => snap.products.push({ id: p.id, full: p.toJSON() }));
    for (const bm of menus) {
      snap.updated_menus.push({ id: bm.id, before: bm.toJSON() });
      await bm.update({ lock_name: true, lock_price: true, lock_category: true, lock_image: true, lock_options: true,
        distribution_mode: 'auto', version: (bm.version || 1) + 1 }, { transaction: t });
      await syncBrandMenuToRestaurant({ brandMenuId: bm.id, restaurantId: RID, transaction: t });
    }
    await t.commit();
  } catch (e) { await t.rollback(); console.error('실패 — 아무것도 반영되지 않았습니다:', e.message); process.exit(1); }
  const file = `/var/www/backups/adopt-lock-brand${BRAND_ID}-rid${RID}-${Date.now()}.json`;
  fs.writeFileSync(file, JSON.stringify(snap, null, 1));
  console.log(`\n✓ 잠금·sync 완료 — 메뉴 ${snap.updated_menus.length}건`);
  console.log(`  되돌리기: node scripts/adopt-restaurant-menus-to-brand.js --undo ${file}`);
  process.exit(0);
}

(async () => {
  if (UNDO_FILE) return undo();
  if (has('--refresh')) return refresh();
  if (has('--lock')) { if (BRAND_ONLY) { console.error('--brand-only 와 --lock 은 같이 못 씁니다(잠금은 매장 표에 씀)'); process.exit(2); } return lockAndSync(); }
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
          // 어느 매장에서 올라온 메뉴인지 남긴다 — 브랜드 화면이 «매장 X 가 만든 것» 으로 보여준다
          //   (2026-09-17). 메뉴의 주인은 매장이므로, 브랜드 목록에서 출처가 보여야 헷갈리지 않는다.
          origin_restaurant_id: RID,
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
