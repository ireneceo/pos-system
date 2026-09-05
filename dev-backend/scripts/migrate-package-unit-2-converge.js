/**
 * scripts/converge-unit-model.js — 다섯 칸 데이터 수렴 (1회성, docs/TRADE_STRUCTURE.md §2-2).
 *
 * 왜 마이그와 분리했나: 배포 레지스트리 `deploy` 는 **매 배포 재실행**된다.
 *   데이터를 옮기는 로직이 거기 있으면 사람이 화면에서 고친 값을 다음 배포가 되돌린다.
 *   그래서 스키마는 `migrate-package-unit.js`(deploy), 수렴은 이 파일(manual·1회)로 나눈다.
 *
 * 우선순위 (Irene 지시 + Fable 확정): **이름 규격 > 거울이 가진 값 > 판매자 상품 규격 > 취급 값 복사**
 *
 *   복사 (전 행 공통, Irene 원문 "취급단위에 있던 숫자랑 단위 그대로 기준양과 기준단위에도 넣어줘")
 *     package_unit := unit · package_quantity := base_quantity
 *
 *   규격 채택 (포장단위 행에 한함) — 취급단위 자리를 되돌린다
 *     unit := 규격 단위 · base_quantity := 규격 양
 *     ratio = 새 base_quantity ÷ 옛 base_quantity 로 **같은 트랜잭션에서** 함께 환산:
 *       · current_stock × ratio            (재고를 취급단위로 다시 센다)
 *       · 매핑 unit_conversion × ratio      (판매단위 == 기준단위 인 행만 — "1 판매단위 = ? 취급단위")
 *       · 레시피 줄 quantity × ratio + unit := 새 취급단위  (recipe_ingredients · product_recipe_ingredients)
 *       · 거울 행도 동일 (아이템 → 거울 한 방향)
 *
 * ⛔ 하지 않는 것: 가격 재계산 · 애매한 이름 자동 적용 · 사람이 정한 값 덮어쓰기.
 *
 * 단위 주의: ratio 는 **무차원**이다(새 양 ÷ 옛 양). 금액에는 절대 곱하지 않는다 —
 *   가격은 기준양의 값이고 기준양은 이 수렴에서 바뀌지 않는다.
 *
 * ⚠ **파일명이 실행 순서다.** 배포 레지스트리는 파일명 정렬로 실행한다.
 *   `converge-unit-model.js`(c) 였을 때는 `migrate-package-unit.js`(m) 보다 **먼저** 돌아
 *   컬럼이 없는 채로 실행됐다(2026-09-05 Fable 적발 — sprint6 ENUM 사고와 같은 자리).
 *   그래서 ①이름에 `-2-` 를 넣어 순서를 새기고 ②시작할 때 컬럼을 직접 보장한다. 둘 다 한다.
 *
 * 사용:
 *   node scripts/migrate-package-unit-2-converge.js             # 적용 (기본 — 배포 루프가 이렇게 부른다)
 *   node scripts/migrate-package-unit-2-converge.js --dry-run   # 미리보기
 *   node scripts/migrate-package-unit-2-converge.js --dry-run --json out.json
 */
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { specFromName } = require('../utils/specFromName');
const { ensureColumns } = require('./migrate-package-unit');

// ⚠ **기본이 적용이다.** 배포 루프는 레지스트리 목록을 인자 없이 실행한다.
//   `package_unit IS NULL` 인 행만 다루므로 재실행이 사람 수정을 되돌리지 않는다.
//   미리보기는 `--dry-run` 으로 뒤집는다.
const APPLY = !process.argv.includes('--dry-run');
const jsonIdx = process.argv.indexOf('--json');
const JSON_OUT = jsonIdx > -1 ? process.argv[jsonIdx + 1] : null;
const q = (sql, r, t) => sequelize.query(sql, { type: QueryTypes.SELECT, replacements: r, transaction: t });
const run = (sql, r, t) => sequelize.query(sql, { replacements: r, transaction: t });

const num = (v) => (v == null ? null : parseFloat(v));
const round2 = (v) => Math.round(v * 100) / 100;

/**
 * 판매자 상품 규격 → {quantity, unit} · 정규화(kg→g, L→ml)는 여기서 한다.
 * ⚠ 인자는 **조인 결과 행**이라 컬럼 이름이 `sp_unit`/`sp_base` 다(`sp.unit` 아님).
 *   처음에 `sp.unit` 을 읽어 이 경로가 통째로 죽어 있었고, 픽스처 C 가 잡았다.
 */
function specFromSeller(sp) {
  if (!sp || !sp.sp_unit) return null;
  // ⛔ **규격이라고 말한 것만** 쓴다 (Fable 규칙: `order_mode='pack' AND base_quantity > 1`).
  //   `order_mode='measure'` = 무게·부피로 파는 것이라 `1.00 kg` 은 "한 포장이 1 kg" 이 아니라
  //   "kg 단위로 판다"는 뜻이다. 이걸 규격으로 읽으면 `1 piece = 1000 g` 이라는, 데이터가
  //   말한 적 없는 주장을 하게 된다(2026-09-05 드라이런에서 222건이 그렇게 잡혔다 — 잘못).
  //   `base_quantity = 1` 도 규격이 아니다 — 기본값이지 사람이 적은 값이 아니다.
  if (String(sp.order_mode || '').toLowerCase() !== 'pack') return null;
  const u = String(sp.sp_unit).toLowerCase();
  const base = num(sp.sp_base);
  if (!base || base <= 1) return null;
  if (u === 'kg') return { quantity: round2(base * 1000), unit: 'g' };
  if (u === 'g') return { quantity: base, unit: 'g' };
  if (u === 'l') return { quantity: round2(base * 1000), unit: 'ml' };
  if (u === 'ml') return { quantity: base, unit: 'ml' };
  if (['piece', 'pcs', 'pc', 'ea'].includes(u)) return { quantity: base, unit: 'piece' };
  return null;   // pack/box/drum 등 포장 이름은 규격이 아니다
}

const PACKAGE_UNITS = new Set(['pack', 'piece', 'can', 'bottle']);

/**
 * 전 컬럼 지문 — 적용 전후를 기계로 대조한다.
 * 단위 주의: **날짜는 epoch(ms) 로 정규화**한다. ISO 문자열 ↔ Date 객체를 비교하면
 *   전 행이 거짓 불일치로 뜬다(2026-09-03 실측 사고). 숫자는 문자열로 굳혀 소수 표기 차를 없앤다.
 */
async function fingerprint(t) {
  const norm = (v) => (v instanceof Date ? String(v.getTime())
    : v == null ? '∅' : typeof v === 'number' ? String(v) : String(v));
  const out = {};
  for (const [key, sql] of [
    ['product_ingredients', 'SELECT id, unit, base_quantity, package_unit, package_quantity, unit_cost, current_stock FROM product_ingredients ORDER BY id'],
    ['ingredients', 'SELECT id, unit, base_quantity, package_unit, package_quantity, unit_cost, current_stock FROM ingredients ORDER BY id'],
    ['recipe_ingredients', 'SELECT id, quantity, unit FROM recipe_ingredients ORDER BY id'],
    ['product_recipe_ingredients', 'SELECT id, quantity, unit FROM product_recipe_ingredients ORDER BY id'],
    ['ingredient_seller_products', 'SELECT id, unit_conversion FROM ingredient_seller_products ORDER BY id'],
  ]) {
    const rows = await q(sql, {}, t);
    out[key] = rows.map((r) => Object.values(r).map(norm).join('|'));
  }
  return out;
}

/** 지문 두 장의 차이를 행 단위로. 기대 밖 변화가 있으면 여기서 드러난다. */
function fingerprintDiff(before, after) {
  const diffs = [];
  for (const key of Object.keys(before)) {
    const b = new Map(before[key].map((line) => [line.split('|')[0], line]));
    const a = new Map(after[key].map((line) => [line.split('|')[0], line]));
    for (const [id, line] of a) {
      if (!b.has(id)) diffs.push({ table: key, id, kind: 'added', after: line });
      else if (b.get(id) !== line) diffs.push({ table: key, id, kind: 'changed', before: b.get(id), after: line });
    }
    for (const [id, line] of b) if (!a.has(id)) diffs.push({ table: key, id, kind: 'removed', before: line });
  }
  return diffs;
}

/**
 * 비식품 카테고리 — **무게·부피 규격을 적용하지 않는다** (2026-09-05 Fable 판정).
 *   취급단위의 정의는 "우리 내부 **사용**단위"다. 가스통을 g 으로, 고무줄·랩을 g 으로,
 *   세제를 ml 로 **세는 주방은 없다.** 값이 맞아도 사용 실태와 어긋나면 재고 실사가
 *   "14,000 g" 이 되어 도로 혼란이다.
 *   ⚠ **개수 규격(piece)은 적용한다** — 봉지·캔은 낱개로 쓰는 게 맞다(쓰레기봉투 10 piece).
 *   카테고리가 비어 있으면 식품으로 보지 않고 **리뷰**로 뺀다.
 */
const NON_FOOD_CATEGORY = /(packaging|disposable|cleaning|chemical|kitchen\s*&?\s*supplies|supplies)/i;

/** 한 행의 목표 상태를 정한다. 데이터는 안 건드린다. */
function decide(row, { mirrorOf, sellerSpecs, categoryName }) {
  const oldUnit = row.unit;
  const oldBase = num(row.base_quantity) || 1;
  const plan = { source: 'copy', unit: oldUnit, base_quantity: oldBase, note: '', review: null };

  // 취급단위가 이미 소단위면 규격 탐색은 하지 않는다. 단 **거울이 더 구체적인 값을 갖고 있으면
  // 그것을 끌어올린다** — 아이템 `g/1` ↔ 거울 `g/1000` 같은 경우다.
  //   ⛔ 이 가드가 없으면 거울 상속이 **거꾸로** 돌아 거울의 1000 이 아이템의 1 로 덮이고,
  //     그 거울을 가리키는 레시피 줄이 ×(1/1000) 된다.
  //     실측 2026-09-05 드라이런: K-소스 등 **175줄**이 그렇게 망가질 뻔했다(적용 전 적발).
  if (!PACKAGE_UNITS.has(oldUnit)) {
    if (mirrorOf && mirrorOf.unit === oldUnit) {
      const mQty = num(mirrorOf.base_quantity) || 1;
      if (mQty > oldBase) {
        return { ...plan, source: 'mirror', base_quantity: mQty, note: `거울 ing#${mirrorOf.id} 기준숫자 채움` };
      }
    }
    return plan;
  }

  const nonFood = categoryName ? NON_FOOD_CATEGORY.test(categoryName) : null;   // null = 카테고리 없음

  /** 규격 하나를 채택할지 판정. 거부하면 사유를 리뷰로 남긴다. */
  const take = (spec, source, note) => {
    if (!spec) return null;
    const isCount = spec.unit === 'piece';
    if (!isCount && nonFood === true) {
      return { ...plan, review: `제외(비식품 ${categoryName}) — ${note} 는 맞지만 무게·부피로 세지 않는다` };
    }
    if (!isCount && nonFood === null) {
      return { ...plan, review: `리뷰(카테고리 없음) — ${note} 를 적용할지 사람이 정한다` };
    }
    return { ...plan, source, unit: spec.unit, base_quantity: spec.quantity, note };
  };

  // 1순위 — 이름 규격
  const byName = specFromName(row.name);
  if (byName) {
    const r = take(byName, 'name', byName.raw);
    if (r) {
      // 이름이 거울 값과 다르면 **원가가 그 비율만큼 달라진다**. 조용히 넘기지 않는다.
      //   실측: PI-139 볶은참깨 — 이름 500 g vs 거울 1000 g → g 당 원가 2배.
      if (r.source === 'name' && mirrorOf && !PACKAGE_UNITS.has(mirrorOf.unit)) {
        const mQty = num(mirrorOf.base_quantity) || 1;
        if (mirrorOf.unit !== r.unit || mQty !== r.base_quantity) {
          r.review = `⚠ 이름(${r.base_quantity} ${r.unit}) ≠ 기존값(${mQty} ${mirrorOf.unit}) — 이름 우선 규칙대로 적용하되 원가가 ${(mQty / r.base_quantity).toFixed(2)}배 달라진다. 실물 확인 필요`;
        }
      }
      return r;
    }
  }
  else if (NAME_HAS_NUMBER.test(row.name)) {
    // 파서가 거부한 것(범위·둘·용기 용량·쉼표)은 조용히 빠지지 않는다 — 목록에 찍는다.
    plan.review = '리뷰(이름 규격이 애매) — 범위·복수·용기 용량·천단위 쉼표 중 하나';
  }

  // 2순위 — 거울이 **더 구체적인 값**을 갖고 있으면 그것을 끌어올린다.
  //   "더 구체적"의 두 형태: ①소단위(g/ml/kg/L) ②같은 포장단위라도 기준숫자 > 1.
  //   ⛔ ②를 빠뜨리면 거울 `piece/40`(진라면 1박스 = 40개)이 아이템 `pack/1` 로 덮이고
  //     그 거울을 가리키는 레시피 줄이 ×(1/40) 된다. 2026-09-05 드라이런에서 적발.
  if (mirrorOf) {
    const mQty = num(mirrorOf.base_quantity) || 1;
    const moreSpecific = !PACKAGE_UNITS.has(mirrorOf.unit) || mQty > oldBase;
    if (moreSpecific) {
      // ⚠ kg→g · L→ml 정규화는 **이름·판매자 출처에만** 적용된다(`specFromName`/`specFromSeller` 안).
      //   거울 값은 그 매장·브랜드가 실제로 쓰던 단위이고 **레시피 줄이 그 단위로 적혀 있으므로**
      //   여기서 정규화하면 줄과 어긋난다. 예: PI-322 Rice `1 → 5 kg` 는 kg 그대로가 맞다.
      const r = take({ quantity: mQty, unit: mirrorOf.unit }, 'mirror', `거울 ing#${mirrorOf.id}`);
      if (r) return r;
    }
  }

  // 3순위 — 판매자 상품 규격
  for (const sp of sellerSpecs) {
    const spec = specFromSeller(sp);
    const r = take(spec, 'seller', `판매자 ${sp.sp_base} ${sp.sp_unit}`);
    if (r) return r;
  }
  return plan;   // 4순위 — 복사만
}

// 이름 안에 숫자+단위처럼 보이는 것이 있는데 파서가 거부한 경우를 잡기 위한 얕은 탐지
const NAME_HAS_NUMBER = /\d\s*(kg|g|ml|l|oz|pcs|pc|ea)\b/i;

async function loadRows(t) {
  // ⛔ **행 단위 1회 보장** (2026-09-05 Fable): `package_unit IS NULL` 인 행만 다룬다.
  //   수렴된 행은 값이 채워지므로 두 번 다루지 않는다 → 사람이 화면에서 고친 값을
  //   재실행이 되돌릴 길이 없다. 그래서 이 스크립트는 `deploy` 에 있어도 안전하고,
  //   Irene `/배포` 한 번으로 운영에 들어간다(Opus 는 운영 쓰기가 막혀 있다).
  const items = await q(`SELECT pi.id, pi.code, pi.name, pi.unit, pi.base_quantity, pi.unit_cost, pi.current_stock,
                                c.name category_name
                           FROM product_ingredients pi
                           LEFT JOIN product_ingredient_categories c ON c.id = pi.category_id
                          WHERE pi.is_active = 1 AND pi.package_unit IS NULL`, {}, t);
  const ings = await q(`SELECT i.id, i.restaurant_id, i.brand_id, i.name, i.unit, i.base_quantity, i.unit_cost,
                               i.current_stock, i.source_product_ingredient_id, c.name category_name
                          FROM ingredients i
                          LEFT JOIN ingredient_categories c ON c.id = i.ingredient_category_id
                         WHERE i.is_active = 1 AND i.package_unit IS NULL`, {}, t);
  // 이미 수렴된 아이템도 거울이 따라갈 수 있어야 한다(거울만 뒤늦게 생긴 경우).
  //   loadRows 는 `package_unit IS NULL` 만 가져오므로, 아이템 전체의 현재 값을 따로 읽는다.
  const allItems = await q(`SELECT id, unit, base_quantity FROM product_ingredients`, {}, t);
  const sellers = await q(`SELECT isp.ingredient_id, isp.product_ingredient_id, isp.unit_conversion,
                                  sp.unit sp_unit, sp.base_quantity sp_base, sp.order_mode
                             FROM ingredient_seller_products isp
                             LEFT JOIN supplier_products sp
                               ON sp.id = isp.seller_product_id AND isp.seller_type = 'supplier'`, {}, t);
  return { items, ings, sellers, allItems };
}


async function main() {
  // 순서 방어 — 스키마 마이그가 아직 안 돌았어도 여기서 컬럼을 보장한다(멱등).
  //   드라이런에서도 **만든다** — 컬럼이 없으면 읽지도 못한다. NULL 허용 가산이라 무해하다.
  await ensureColumns({ apply: true });
  const before = APPLY ? await fingerprint(null) : null;
  const t = await sequelize.transaction();
  const report = { items: [], ings: [], summary: {} };
  try {
    const { items, ings, sellers, allItems } = await loadRows(t);
    const itemNow = new Map(allItems.map((r) => [r.id, r]));
    const mirrorByItem = new Map();
    ings.forEach((i) => { if (i.source_product_ingredient_id) mirrorByItem.set(i.source_product_ingredient_id, i); });
    const sellerByItem = new Map(), sellerByIng = new Map();
    sellers.forEach((s) => {
      if (s.product_ingredient_id) (sellerByItem.get(s.product_ingredient_id) || sellerByItem.set(s.product_ingredient_id, []).get(s.product_ingredient_id)).push(s);
      if (s.ingredient_id) (sellerByIng.get(s.ingredient_id) || sellerByIng.set(s.ingredient_id, []).get(s.ingredient_id)).push(s);
    });

    const counts = { name: 0, mirror: 0, seller: 0, copy: 0, converted: 0, lines: 0, mappings: 0 };
    // 아이템 판정을 기억해 거울에 그대로 물려준다 (아이템 → 거울 한 방향)
    const itemPlans = new Map();

    const applyRow = async (row, kind) => {
      const isItem = kind === 'item';
      const table = isItem ? 'product_ingredients' : 'ingredients';
      // ⛔ **거울은 스스로 판정하지 않는다.** 아이템에서 다섯 칸을 그대로 받는다
      //   (docs/TRADE_STRUCTURE.md §2-2 · 방향은 아이템 → 거울 한 방향).
      //   이 가드가 없으면 거울의 **자기 카테고리·자기 이름**으로 따로 판정돼 둘이 갈라진다.
      //   실측 2026-09-05 드라이런: PI-142(Dairy & Egg)는 g/2000 이 되는데 그 거울(카테고리 없음)은
      //   pack/1 로 남고, **레시피 줄은 거울을 가리키므로 `0.02 pack` 이 그대로 남았다.**
      //   PI-317 은 정반대(아이템 리뷰·거울 적용)로 갈라졌다.
      const srcId = row.source_product_ingredient_id;
      const inherited = !isItem && srcId
        ? (itemPlans.get(srcId)
            || (itemNow.has(srcId)
                ? { source: 'copy', unit: itemNow.get(srcId).unit,
                    base_quantity: num(itemNow.get(srcId).base_quantity) || 1, review: null }
                : null))
        : null;
      // 상속은 **정보를 줄이지 않는다.** 거울이 이미 더 구체적인 기준숫자를 갖고 있고
      // 아이템이 그걸 못 따라왔으면(같은 단위·아이템 1) 거울 값을 지킨다.
      const keepMirror = inherited && (num(row.base_quantity) || 1) > (inherited.base_quantity || 1);
      const plan = (inherited && !keepMirror)
        ? { ...inherited, note: `아이템 #${srcId} 에서 복사` }
        : inherited
        ? { source: 'copy', unit: row.unit, base_quantity: num(row.base_quantity) || 1,
            note: `아이템 #${srcId} 이 덜 구체적이라 거울 값 유지`, review: null }
        : decide(row, {
            mirrorOf: isItem ? mirrorByItem.get(row.id) : null,
            sellerSpecs: (isItem ? sellerByItem.get(row.id) : sellerByIng.get(row.id)) || [],
            categoryName: row.category_name || null,
          });
      if (isItem) itemPlans.set(row.id, plan);
      const oldBase = num(row.base_quantity) || 1;
      const changed = plan.unit !== row.unit || plan.base_quantity !== oldBase;
      const ratio = changed ? plan.base_quantity / oldBase : 1;
      counts[plan.source] += 1;
      if (changed) counts.converted += 1;

      const entry = {
        kind, id: row.id, code: row.code || null, restaurant_id: row.restaurant_id || null, name: row.name,
        before: { unit: row.unit, base_quantity: oldBase, stock: num(row.current_stock), unit_cost: num(row.unit_cost) },
        after: { unit: plan.unit, base_quantity: plan.base_quantity,
                 package_unit: row.unit, package_quantity: oldBase,
                 stock: changed ? round2((num(row.current_stock) || 0) * ratio) : num(row.current_stock) },
        source: plan.source, note: plan.note, review: plan.review || null, ratio,
      };

      if (APPLY) {
        if (plan.review) {
          // ⛔ **미결은 미결로 남긴다** (2026-09-05 Fable 결정 2).
          //   복사로 채워 버리면 `package_unit IS NULL` null-guard 때문에 **영원히 재수렴이 안 된다.**
          //   NULL 로 두면 Irene 이 카테고리·이름을 고치거나 화면에서 직접 채우는 순간
          //   다음 배포가 자동으로 수렴한다. 화면은 `package_unit ?? unit` 으로 폴백해 보여준다.
          //   인스펙션 013 이 이 행들을 WARN + 목록으로 계속 드러낸다(감추지 않는다).
          entry.after = { ...entry.after, package_unit: null, package_quantity: null, pending: true };
        } else {
          await run(`UPDATE ${table} SET unit = :u, base_quantity = :b, package_unit = :pu, package_quantity = :pq,
                                         current_stock = :st
                      WHERE id = :id`,
            { u: plan.unit, b: plan.base_quantity, pu: row.unit, pq: oldBase, st: entry.after.stock, id: row.id }, t);
        }
        if (changed) {
          // 매핑 환산 규칙: **취급단위가 바뀐 타깃의 매핑만**, 배수 = 그 단위 환산비(구→신) = ratio.
          //   ⛔ base_quantity 를 곱하는 게 아니다. 그래서
          //     ①기준숫자만 바뀐 행(단위 동일)은 여기 안 들어온다 → 매핑 불변
          //     ②K-소스 거울 직접 매핑(g→g, 비 1)은 그대로 1000 유지
          //     ③PI-142 는 pack→g 비 2000
          const fk = isItem ? 'product_ingredient_id' : 'ingredient_id';
          const [m] = await run(`UPDATE ingredient_seller_products SET unit_conversion = unit_conversion * :r
                                  WHERE ${fk} = :id`, { r: ratio, id: row.id }, t);
          counts.mappings += m?.affectedRows || 0;
          const lineTable = isItem ? 'product_recipe_ingredients' : 'recipe_ingredients';
          const [l] = await run(`UPDATE ${lineTable} SET quantity = quantity * :r, unit = :u
                                  WHERE ingredient_id = :id`, { r: ratio, u: plan.unit, id: row.id }, t);
          counts.lines += l?.affectedRows || 0;
        }
      }
      report[isItem ? 'items' : 'ings'].push(entry);
    };

    for (const row of items) await applyRow(row, 'item');
    for (const row of ings) await applyRow(row, 'ing');

    // ── D. 명시 건 (Fable 확정 2026-09-05) — 규칙으로는 안 잡히는 개별 수정 ──────────
    //   ⛔ 코드/식별자가 아니라 **조건**으로 찾는다. 운영·dev id 가 다르고, 이미 고쳐졌으면 건너뛴다.
    const explicit = [];
    // D-1(PI-007 예외)은 **철회됐다** (2026-09-05 Fable). 거울 상속 경로 하나로 정합되며
    //   (아이템 `g/1000` 유지 · 거울 `kg/1 → g/1000` · 줄 4개 ×1000), 예외를 따로 두면
    //   같은 행을 두 번 환산할 위험만 남는다. 경로는 하나로 유지한다.

    // D-2. **아이템별 수렴이 전부 끝난 뒤** 도는 마지막 sweep 이다 — 위에서 이미 맞춰진 줄은
    //   `ri.unit <> i.unit` 조건에 안 걸리므로 **이중 환산이 일어나지 않는다**(순서가 안전장치다).
    //   레시피 줄 단위 ≠ 재료 단위 — kg↔g · L↔ml 호환쌍만 **값을 환산**해 맞춘다.
    //      운영 1건: ri 522 `Beef Miyeokguk` 0.07 kg ↔ 재료 g → 지금 0.07 g 만 빠지는 실결함.
    //      ⛔ 호환되지 않는 쌍(pack ↔ g 등)은 손대지 않는다 — 계수를 모른다.
    const COMPAT = { 'kg->g': 1000, 'g->kg': 0.001, 'L->ml': 1000, 'ml->L': 0.001 };
    const d2 = await q(`SELECT ri.id, ri.quantity, ri.unit line_unit, i.unit ing_unit, r.name recipe_name, i.name ing_name
                          FROM recipe_ingredients ri
                          JOIN ingredients i ON i.id = ri.ingredient_id
                          LEFT JOIN recipes r ON r.id = ri.recipe_id
                         WHERE ri.unit <> i.unit`, {}, t);
    for (const r of d2) {
      const k = `${r.line_unit}->${r.ing_unit}`;
      const f = COMPAT[k];
      if (!f) { explicit.push({ what: `D-2 건너뜀(호환 아님 ${k}) — ri#${r.id} ${r.recipe_name} · ${r.ing_name}`, id: r.id, skipped: true }); continue; }
      const next = Math.round(num(r.quantity) * f * 10000) / 10000;
      explicit.push({ what: `D-2 ri#${r.id} ${r.recipe_name} · ${r.ing_name}: ${r.quantity} ${r.line_unit} → ${next} ${r.ing_unit}`, id: r.id });
      if (APPLY) await run(`UPDATE recipe_ingredients SET quantity = :q, unit = :u WHERE id = :id`,
        { q: next, u: r.ing_unit, id: r.id }, t);
    }
    report.explicit = explicit;
    report.summary = { ...counts, items: items.length, ingredients: ings.length, explicit: explicit.length };

    if (APPLY) {
      // 증명 — 수렴 뒤 불변식이 서야 한다
      // ⚠ `package_unit IS NULL` 인 행은 **0이 아니다** — 사람이 정해야 하는 것(리뷰)이 남는다.
      //   그래서 "0" 이 아니라 **"이번에 결정한 행 중 안 채워진 것 0"** 을 증명한다.
      const decidedIds = { item: [], ing: [] };
      report.items.filter((r) => !r.review).forEach((r) => decidedIds.item.push(r.id));
      report.ings.filter((r) => !r.review).forEach((r) => decidedIds.ing.push(r.id));
      const [a] = decidedIds.item.length
        ? await q(`SELECT COUNT(*) n FROM product_ingredients WHERE package_unit IS NULL AND id IN (:ids)`, { ids: decidedIds.item }, t)
        : [{ n: 0 }];
      const [b] = decidedIds.ing.length
        ? await q(`SELECT COUNT(*) n FROM ingredients WHERE package_unit IS NULL AND id IN (:ids)`, { ids: decidedIds.ing }, t)
        : [{ n: 0 }];
      const [c] = await q(`SELECT COUNT(*) n FROM recipe_ingredients ri JOIN ingredients i ON i.id=ri.ingredient_id WHERE ri.unit <> i.unit`, {}, t);
      const [d] = await q(`SELECT COUNT(*) n FROM product_recipe_ingredients pri JOIN product_ingredients pi ON pi.id=pri.ingredient_id WHERE pri.unit <> pi.unit`, {}, t);
      console.log(`\n증명: 이번에 결정한 행 중 미기입 아이템 ${a.n} · 재료 ${b.n} (기대 0)`);
      console.log(`      줄 단위 불일치 매장 ${c.n} · 프로덕트 ${d.n} (기대 0)`);
      if (Number(a.n) || Number(b.n) || Number(c.n) || Number(d.n)) throw new Error('증명 실패 — 되돌린다');
      await t.commit();

      // 지문 대조 — 기대한 표(report)에 없는 행이 바뀌었으면 **배포를 멈춘다**(fail-loud).
      const after = await fingerprint(null);
      const diffs = fingerprintDiff(before, after);
      const expected = new Set();
      [...report.items, ...report.ings].forEach((r) => {
        if (r.review) return;
        expected.add(`${r.kind === 'item' ? 'product_ingredients' : 'ingredients'}#${r.id}`);
      });
      const unexpected = diffs.filter((d) => {
        if (d.table === 'product_ingredients' || d.table === 'ingredients') return !expected.has(`${d.table}#${d.id}`);
        return false;   // 줄·매핑은 위 행에 딸려 바뀐 것이라 개별 기대목록을 만들지 않는다(건수는 아래 로그에 남는다)
      });
      const fs = require('fs'), path = require('path');
      const dir = path.join(__dirname, '..', 'logs');
      fs.mkdirSync(dir, { recursive: true });
      const logFile = path.join(dir, `converge-unit-model-${new Date().toISOString().replace(/[:.]/g, '')}.json`);
      fs.writeFileSync(logFile, JSON.stringify({ summary: report.summary, diffs, unexpected, report }, null, 1));
      console.log(`지문 대조: 바뀐 행 ${diffs.length} · 기대 밖 ${unexpected.length} (기대 0)`);
      console.log(`감사 로그: ${logFile}`);
      if (unexpected.length) {
        console.error('❌ 기대 밖 변경 — 배포를 멈춥니다. 로그의 unexpected 를 보세요.');
        unexpected.slice(0, 10).forEach((d) => console.error(`   ${d.table}#${d.id} ${d.before} → ${d.after}`));
        process.exit(1);
      }
      console.log('\n✅ 적용 완료');
    } else {
      await t.rollback();
    }

    const s = report.summary;
    console.log(`\n${APPLY ? '적용' : '드라이런'} 요약`);
    console.log(`  대상: 재고아이템 ${s.items} · 매장/거울 재료 ${s.ingredients}`);
    console.log(`  출처: 이름 ${s.name} · 거울 ${s.mirror} · 판매자 ${s.seller} · 복사 ${s.copy}`);
    console.log(`  취급단위가 바뀌는 행: ${s.converted}${APPLY ? ` · 매핑 ${s.mappings} · 레시피 줄 ${s.lines}` : ''}`);
    const reviews = [...report.items, ...report.ings].filter((r) => r.review);
    console.log(`  사람이 정해야 하는 것: ${reviews.length}`);
    reviews.forEach((r) => console.log(`    · ${r.code || r.id} ${String(r.name).slice(0, 40)} — ${r.review}`));
    console.log(`  명시 건: ${report.explicit.length}`);
    report.explicit.forEach((e) => console.log(`    · ${e.what}`));
    if (JSON_OUT) { require('fs').writeFileSync(JSON_OUT, JSON.stringify(report, null, 1)); console.log(`  표 → ${JSON_OUT}`); }
    process.exit(0);
  } catch (e) {
    await t.rollback().catch(() => {});
    console.error('❌ 실패 — 롤백:', e.message);
    process.exit(1);
  }
}

if (require.main === module) main();
module.exports = { decide, specFromSeller };
