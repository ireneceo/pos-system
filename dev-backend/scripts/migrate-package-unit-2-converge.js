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

// `ingredient_seller_products.unit_conversion` 은 DECIMAL(10,4) (models/IngredientSellerProduct.js).
// 표현 가능한 최대값 = 999,999.9999. 이 위로 쓰면 MySQL 이 거부하고 트랜잭션이 통째로 롤백된다.
const CONV_MAX = 999999.9999;

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
  const sellers = await q(`SELECT isp.id, isp.ingredient_id, isp.product_ingredient_id, isp.unit_conversion,
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
  const t = await sequelize.transaction();
  const before = APPLY ? await fingerprint(t) : null;
  // 실행 **전** 비호환 줄의 id 집합 — 증명 ③ 이 "늘지도 줄지도 않았음" 을 본다.
  const incompatBefore = new Set();
  for (const [tbl, jn] of [['recipe_ingredients', 'JOIN ingredients i ON i.id = ri.ingredient_id'],
                           ['product_recipe_ingredients', 'JOIN product_ingredients i ON i.id = ri.ingredient_id']]) {
    const rows = await q(`SELECT ri.id, ri.unit lu, i.unit iu FROM ${tbl} ri ${jn} WHERE ri.unit <> i.unit`, {}, t);
    rows.forEach((r) => {
      const k = `${r.lu}->${r.iu}`;
      if (!['kg->g', 'g->kg', 'L->ml', 'ml->L'].includes(k)) incompatBefore.add(`${tbl}#${r.id}`);
    });
  }
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

    const counts = { name: 0, mirror: 0, seller: 0, copy: 0, converted: 0, baseOnly: 0, lines: 0, mappings: 0 };
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
      // ⛔ **두 종류를 갈라야 한다** (2026-09-05 Fable 적발 — 이걸 안 가른 코드가 배포 직전에 막혔다):
      //   `unitChanged` 취급단위 자체가 바뀜(pack → g) — 재고·매핑·줄을 함께 환산해야 뜻이 유지된다.
      //   `baseOnly`   단위는 같고 기준숫자만 채움(K-소스 `g/1 → g/1000`) — **아무것도 환산하면 안 된다.**
      //                재고는 이미 g 로 세고 있었고, 줄도 g 이며, 매핑도 g 기준이다.
      //                바뀌는 것은 "가격이 몇 g 의 값인가" 하나뿐이라 **원가 표시만** 맞아진다.
      //   합쳐서 `changed` 하나로 두면 `ratio = 1000` 이 그대로 재고·매핑·줄에 곱해진다.
      // ⛔ **쓰기 전에 검산한다** (2026-09-06 Fable 판정 — 운영 배포를 두 번 세운 결함).
      //   매핑 환산은 `unit_conversion * ratio` 인데 그 컬럼은 DECIMAL(10,4) = 최대 999,999.9999 다.
      //   운영 ing#970 의 매핑 3건이 `unit_conversion = 250,000`("판매 1팩 = 취급 25만 팩" — 명백한
      //   오염값)이고 ratio 500 을 곱해 1.25e8 이 되어 MySQL 이 거부 → 트랜잭션 통째 롤백 →
      //   **한 매장의 오염 행 하나가 모든 매장의 배포를 막았다.**
      //   09-05 에 넣은 "판매단위 == 옛 취급단위" 필터는 이 셋을 통과시킨다(둘 다 pack).
      //   ⛔ 컬럼을 넓히거나(1.25e8 을 그대로 합법화) 상한으로 자르는 것(값을 지어냄)은 하지 않는다.
      //   기대 밖 값이면 **쓰지 않고 사람 몫으로 강등**한다 — 이 스크립트의 기존 철학 그대로다.
      //   예외를 던져 배포를 세우지 않는 이유: 예외는 "스크립트 자신의 결함"용이고,
      //   이건 "데이터가 사람 몫"인 경우다.
      //
      //   ⚠ 강등은 `plan.review` 만 세워선 안 된다 — 매핑·줄 환산(`if (unitChanged)`)은 리뷰 분기
      //   **바깥**에 있어서, 단위를 바꾼 채 리뷰만 달면 곱셈이 그대로 실행된다(2026-09-06 실측).
      //   그래서 **계획을 옛 값으로 되돌려** `unitChanged` 자체가 서지 않게 한다 = 완전 무접촉.
      //   ⚠ `!plan.review` 로 가두면 안 된다 — **리뷰가 달린 행도 단위는 바뀐 채로 환산된다**
      //   (2026-09-06 실측: 픽스처가 `리뷰(이름 규격이 애매)` 인데 plan.unit 이 g/500 으로 서서
      //    매핑 곱셈이 그대로 실행됐다). 리뷰 여부와 무관하게 검산한다.
      if (plan.unit !== row.unit) {
        const wouldRatio = plan.base_quantity / oldBase;
        const over = ((isItem ? sellerByItem.get(row.id) : sellerByIng.get(row.id)) || [])
          .filter((sp) => String(sp.sp_unit || '').toLowerCase() === String(row.unit).toLowerCase())
          .map((sp) => ({ id: sp.id, conv: num(sp.unit_conversion) || 0 }))
          .filter((m) => Math.abs(m.conv * wouldRatio) > CONV_MAX);
        if (over.length) {
          const w = over[0];
          const why = `리뷰(매핑 #${w.id} conv ${w.conv} × ratio ${wouldRatio} = ${(w.conv * wouldRatio).toExponential(2)}`
            + ` — 표현 범위 ${CONV_MAX} 초과, 매핑 값이 의심스럽다)`
            + (over.length > 1 ? ` 외 ${over.length - 1}건` : '');
          plan.review = plan.review ? `${plan.review} · ${why}` : why;
          plan.unit = row.unit;            // 되돌린다 → unitChanged=false → 매핑·줄·재고 전부 무접촉
          plan.base_quantity = oldBase;
        }
      }

      const unitChanged = plan.unit !== row.unit;
      const baseOnly = !unitChanged && plan.base_quantity !== oldBase;
      const changed = unitChanged || baseOnly;
      const ratio = unitChanged ? plan.base_quantity / oldBase : 1;
      counts[plan.source] += 1;
      if (changed) counts.converted += 1;
      if (baseOnly) counts.baseOnly += 1;

      const entry = {
        kind, id: row.id, code: row.code || null, restaurant_id: row.restaurant_id || null, name: row.name,
        before: { unit: row.unit, base_quantity: oldBase, stock: num(row.current_stock), unit_cost: num(row.unit_cost) },
        after: { unit: plan.unit, base_quantity: plan.base_quantity,
                 // 기준단위·기준양은 **취급단위가 바뀐 행에만** 적는다.
                 //   기준숫자만 바뀐 행에 `(oldBase, oldUnit)` 을 복사하면 `1 g = 1000 g` 이 되어
                 //   §2-2 항등식이 깨진다. 그 행들의 진짜 포장은 데이터에 없다 → 미결(NULL).
                 package_unit: unitChanged ? row.unit : null,
                 package_quantity: unitChanged ? oldBase : null,
                 stock: unitChanged ? round2((num(row.current_stock) || 0) * ratio) : num(row.current_stock) },
        source: plan.source, note: plan.note, ratio, unitChanged, baseOnly,
        maps: ((isItem ? sellerByItem.get(row.id) : sellerByIng.get(row.id)) || []).length,
        lines: 0, maps_applied: 0,
        review: plan.review || (baseOnly
          ? `기준숫자 교정(원가 기준 ${oldBase} → ${plan.base_quantity} ${plan.unit}) · 포장 단위 미상 — 사람이 정함`
            + ((num(row.current_stock) || 0) !== 0 ? ' ⚠ 재고 ≠ 0 — 무엇으로 세었는지 확인 필요' : '')
          : null),
      };

      if (APPLY) {
        if (plan.review || baseOnly) {
          // baseOnly 는 **기준숫자만** 고친다. 재고·매핑·줄 전부 무접촉, package_* 는 NULL(미결).
          if (baseOnly && !plan.review) {
            await run(`UPDATE ${table} SET base_quantity = :b WHERE id = :id`,
              { b: plan.base_quantity, id: row.id }, t);
          }
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
        // ⛔ **리뷰 행은 줄·매핑도 건드리지 않는다** (2026-09-06 Opus 실측 · Fable 판정).
        //   이 블록이 위 `if (plan.review || baseOnly) {미결} else {행 UPDATE}` **바깥**에 있어서,
        //   리뷰 행은 **행은 pack/미결로 남는데 레시피 줄·매핑만 g 기준으로 환산**됐다 —
        //   "미결은 미결로 남긴다"(09-05 결정 2)와 정면 충돌이고 레시피 차감이 ×ratio 틀어진다.
        //   운영 노출은 0 이었다(09-05 감사 로그 26개 전수 0건 · 현재 비호환 줄 0). 조건을
        //   행 UPDATE 의 `else` 와 **정확히 대칭**으로 맞춰 그 길을 닫는다.
        if (unitChanged && !plan.review) {
          // 매핑 환산 규칙: **취급단위가 바뀐 타깃의 매핑만**, 배수 = 그 단위 환산비(구→신) = ratio.
          //   ⛔ base_quantity 를 곱하는 게 아니다. 그래서
          //     ①기준숫자만 바뀐 행(단위 동일)은 여기 안 들어온다 → 매핑 불변
          //     ②K-소스 거울 직접 매핑(g→g, 비 1)은 그대로 1000 유지
          //     ③PI-142 는 pack→g 비 2000
          // ⛔ **판매단위 == 옛 취급단위 인 매핑만** 곱한다 (2026-09-05 Fable 적발).
          //   판매자가 이미 다른 포장으로 매핑돼 있으면(1 kg 봉지, conv 1000) 그 행은 자기 환산을
          //   갖고 있다 — 거기에 ×2000 을 곱하면 2,000,000 이 된다.
          //   필터에 안 걸린 매핑은 표에 "conv 유지" 로 찍는다(조용히 넘기지 않는다).
          const fk = isItem ? 'product_ingredient_id' : 'ingredient_id';
          const myMaps = (isItem ? sellerByItem.get(row.id) : sellerByIng.get(row.id)) || [];
          const sameUnitIds = myMaps
            .filter((sp) => String(sp.sp_unit || '').toLowerCase() === String(row.unit).toLowerCase())
            .map((sp) => sp.id).filter(Boolean);
          const keptIds = myMaps.filter((sp) => !sameUnitIds.includes(sp.id)).map((sp) => sp.id);
          if (keptIds.length) entry.mapping_kept = keptIds;
          if (sameUnitIds.length) {
            const [m] = await run(`UPDATE ingredient_seller_products SET unit_conversion = unit_conversion * :r
                                    WHERE id IN (:ids)`, { r: ratio, ids: sameUnitIds }, t);
            const applied = m?.affectedRows ?? sameUnitIds.length;
            counts.mappings += applied; entry.maps_applied = applied;
          }

          // 거울 오버레이 가드 — 단위가 바뀌는 거울에 매장 실재고가 남아 있으면 멈춘다.
          //   지금 운영은 56행 전부 0 이라 통과하지만, 조용히 건너뛰는 코드로 두면 안 된다.
          if (!isItem) {
            const [ov] = await q(`SELECT COUNT(*) n FROM restaurant_ingredient_stocks
                                   WHERE ingredient_id = :id AND current_stock <> 0`, { id: row.id }, t);
            if (Number(ov.n) > 0) {
              throw new Error(`거울 ing#${row.id} 의 매장 오버레이 재고가 ${ov.n}행 남아 있다 — 단위 변경 중단`);
            }
          }
          const lineTable = isItem ? 'product_recipe_ingredients' : 'recipe_ingredients';
          const [l] = await run(`UPDATE ${lineTable} SET quantity = quantity * :r, unit = :u
                                  WHERE ingredient_id = :id`, { r: ratio, u: plan.unit, id: row.id }, t);
          const lApplied = l?.affectedRows || 0;
          counts.lines += lApplied; entry.lines = lApplied;
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
    // ⚠ **두 표 모두** 돈다 (2026-09-05 운영 실패에서 드러남 — 매장 표만 돌아 프로덕트 레시피
    //   8줄(kg↔g)이 고쳐지지 않았고, 그 뒤 증명이 그걸 실패로 잡아 통째로 롤백됐다).
    const SWEEPS = [
      { table: 'recipe_ingredients', join: 'JOIN ingredients i ON i.id = ri.ingredient_id',
        label: '매장', nameSql: 'i.name' },
      { table: 'product_recipe_ingredients', join: 'JOIN product_ingredients i ON i.id = ri.ingredient_id',
        label: '프로덕트', nameSql: 'i.name' },
    ];
    const incompatible = [];   // 계수를 모르는 쌍 — 사람이 정한다. 증명은 "늘지도 줄지도 않았음" 만 본다.
    for (const sw of SWEEPS) {
      const rows = await q(`SELECT ri.id, ri.quantity, ri.unit line_unit, i.unit ing_unit, ${sw.nameSql} ing_name
                              FROM ${sw.table} ri ${sw.join}
                             WHERE ri.unit <> i.unit`, {}, t);
      for (const r of rows) {
        const k = `${r.line_unit}->${r.ing_unit}`;
        const f = COMPAT[k];
        if (!f) {
          incompatible.push({ table: sw.table, id: r.id, line: `${r.quantity} ${r.line_unit}`,
                              ing: `${r.ing_name} (${r.ing_unit})`, pair: k });
          explicit.push({ what: `D-2 사람 몫(호환 아님 ${k}) — ${sw.label} #${r.id} ${r.ing_name}: ${r.quantity} ${r.line_unit} ↔ 재료 ${r.ing_unit}`, id: r.id, skipped: true });
          continue;
        }
        const next = Math.round(num(r.quantity) * f * 10000) / 10000;
        explicit.push({ what: `D-2 ${sw.label} #${r.id} ${r.ing_name}: ${r.quantity} ${r.line_unit} → ${next} ${r.ing_unit}`, id: r.id });
        if (APPLY) {
          await run(`UPDATE ${sw.table} SET quantity = :q, unit = :u WHERE id = :id`,
            { q: next, u: r.ing_unit, id: r.id }, t);
          // ⚠ D-2 가 고친 줄도 집계에 더한다 — 안 더하면 딸린 표 건수 대조(fail-loud)가
          //   "지문 4 vs 집계 3" 으로 잡아 통째로 롤백된다(픽스처 M 이 그렇게 잡았다).
          counts.lines += 1;
        }
      }
    }
    report.incompatible = incompatible;

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
      // ⛔ 증명 ②③ (2026-09-05 운영 실패에서 다시 씀):
      //   예전 조건은 `ri.unit <> i.unit` **전역 0** 이었다. 그런데 D-2 는 계수를 모르는 쌍
      //   (g↔bottle, piece↔kg)을 **의도적으로 남긴다** — 스크립트가 자기가 남긴 것을 실패로
      //   판정해 매번 롤백했다(운영 배포 1회 실패). 조건을 둘로 가른다:
      //     ② 호환쌍(kg↔g·L↔ml) 불일치 = 0  — D-2 가 고쳤어야 하는 것
      //     ③ 비호환 불일치 = 실행 전 목록과 **동일**  — 늘지도 줄지도 않았음
      const COMPAT_KEYS = ['kg->g', 'g->kg', 'L->ml', 'ml->L'];
      const incompatAfter = new Set();
      let compatLeft = 0;
      for (const [tbl, jn] of [['recipe_ingredients', 'JOIN ingredients i ON i.id = ri.ingredient_id'],
                               ['product_recipe_ingredients', 'JOIN product_ingredients i ON i.id = ri.ingredient_id']]) {
        const rows = await q(`SELECT ri.id, ri.unit lu, i.unit iu FROM ${tbl} ri ${jn} WHERE ri.unit <> i.unit`, {}, t);
        rows.forEach((r) => {
          const k = `${r.lu}->${r.iu}`;
          if (COMPAT_KEYS.includes(k)) compatLeft += 1;
          else incompatAfter.add(`${tbl}#${r.id}`);
        });
      }
      const grew = [...incompatAfter].filter((x) => !incompatBefore.has(x));
      const shrank = [...incompatBefore].filter((x) => !incompatAfter.has(x));
      console.log(`증명 ② 호환쌍 불일치 ${compatLeft} (기대 0)`);
      console.log(`증명 ③ 비호환 불일치 ${incompatAfter.size} = 실행 전 ${incompatBefore.size} · 늘어남 ${grew.length} · 줄어듦 ${shrank.length} (기대 0/0)`);
      if (report.incompatible?.length) {
        console.log('  사람이 정해야 하는 줄 (계수를 데이터로 알 수 없다):');
        report.incompatible.forEach((r) => console.log(`    · ${r.table}#${r.id} ${r.line} ↔ ${r.ing}`));
      }
      if (Number(a.n) || Number(b.n)) throw new Error('증명 ① 실패(미기입 남음) — 되돌린다');
      if (compatLeft > 0) throw new Error(`증명 ② 실패(호환쌍 불일치 ${compatLeft}건 남음) — 되돌린다`);
      if (grew.length || shrank.length) throw new Error('증명 ③ 실패(비호환 목록이 바뀜) — 되돌린다');

      // ⛔ **대조는 commit 앞에서 한다** (2026-09-05 Fable 적발).
      //   예전 코드는 commit 뒤에 대조하고 exit(1) 했다 — 배포는 멈추지만 **데이터는 이미 커밋된 뒤**라
      //   되돌리는 길이 백업 복구밖에 없었다. fingerprint 는 트랜잭션 인자를 받으므로 여기서 잰다.
      // 테스트 전용 훅 — 대조가 진짜로 롤백을 부르는지 증명하기 위한 고장주입 자리.
      //   운영에서는 이 env 가 없으므로 통째로 건너뛴다.
      if (process.env.CONVERGE_FAULT_ROW) {
        await run(`UPDATE product_ingredients SET base_quantity = base_quantity + 1 WHERE id = :id`,
          { id: Number(process.env.CONVERGE_FAULT_ROW) }, t);
      }
      const after = await fingerprint(t);
      const diffs = fingerprintDiff(before, after);
      const expected = new Set();
      [...report.items, ...report.ings].forEach((r) => {
        // 기준숫자만 바뀌는 행은 review 문구를 달고도 실제로 base_quantity 를 고친다 → 기대 목록에 포함.
        if (r.review && !r.baseOnly) return;
        expected.add(`${r.kind === 'item' ? 'product_ingredients' : 'ingredients'}#${r.id}`);
      });
      const unexpected = diffs.filter((d) =>
        (d.table === 'product_ingredients' || d.table === 'ingredients') && !expected.has(`${d.table}#${d.id}`));
      const mapDiffs = diffs.filter((d) => d.table === 'ingredient_seller_products').length;
      const lineDiffs = diffs.filter((d) => d.table === 'recipe_ingredients' || d.table === 'product_recipe_ingredients').length;

      // 로그는 트랜잭션 밖(파일)이라 먼저 남겨 둔다 — 롤백돼도 무엇을 하려 했는지 남는다.
      const fs = require('fs'), path = require('path');
      const dir = path.join(__dirname, '..', 'logs');
      fs.mkdirSync(dir, { recursive: true });
      const logFile = path.join(dir, `converge-unit-model-${new Date().toISOString().replace(/[:.]/g, '')}.json`);
      fs.writeFileSync(logFile, JSON.stringify({ summary: report.summary, diffs, unexpected, report }, null, 1));
      console.log(`\n지문 대조: 바뀐 행 ${diffs.length} · 기대 밖 ${unexpected.length} (기대 0)`);
      console.log(`  매핑 실제 ${mapDiffs} = 집계 ${counts.mappings} · 레시피 줄 실제 ${lineDiffs} = 집계 ${counts.lines}`);
      console.log(`감사 로그: ${logFile}`);
      if (unexpected.length) {
        console.error('❌ 기대 밖 변경 — 되돌립니다.');
        unexpected.slice(0, 10).forEach((d) => console.error(`   ${d.table}#${d.id} ${d.before} → ${d.after}`));
        throw new Error('지문 대조 실패 — 되돌린다');
      }
      if (mapDiffs !== counts.mappings || lineDiffs !== counts.lines) {
        throw new Error(`딸린 표 건수 불일치 — 매핑 ${mapDiffs}/${counts.mappings} · 줄 ${lineDiffs}/${counts.lines} — 되돌린다`);
      }

      await t.commit();
      console.log('\n✅ 적용 완료');
    } else {
      await t.rollback();
    }

    const s = report.summary;
    console.log(`\n${APPLY ? '적용' : '드라이런'} 요약`);
    console.log(`  대상: 재고아이템 ${s.items} · 매장/거울 재료 ${s.ingredients}`);
    console.log(`  출처: 이름 ${s.name} · 거울 ${s.mirror} · 판매자 ${s.seller} · 복사 ${s.copy}`);
    console.log(`  취급단위가 바뀌는 행: ${s.converted - s.baseOnly}${APPLY ? ` · 매핑 ${s.mappings} · 레시피 줄 ${s.lines}` : ''}`);
    console.log(`  기준숫자만 바뀌는 행: ${s.baseOnly}  (재고·매핑·줄 무접촉 · 기준단위는 미결로 남음)`);

    // 자기검증 — **대상 수를 같이 찍는다.** 0/0 을 OK 로 통과시키지 않는다(판정 기계 의심 3조).
    const all = [...report.items, ...report.ings];
    const baseOnlyWithMaps = all.filter((r) => r.baseOnly && (r.maps || 0) > 0);
    const baseOnlyWithLines = all.filter((r) => r.baseOnly && (r.lines || 0) > 0);
    const assertLine = (label, pass, n) =>
      console.log(`  ${n === 0 ? 'SKIP' : pass ? 'PASS' : 'FAIL'}  ${label} (대상 ${n}건)`);
    assertLine('① 기준숫자만 바뀐 행의 매핑 conv 불변',
      baseOnlyWithMaps.every((r) => !r.unitChanged), baseOnlyWithMaps.length);
    assertLine('② 기준숫자만 바뀐 행의 레시피 줄 불변',
      baseOnlyWithLines.every((r) => !r.unitChanged), baseOnlyWithLines.length);
    const kept = all.filter((r) => r.mapping_kept && r.mapping_kept.length);
    assertLine('③ 판매단위 ≠ 옛 취급단위 인 매핑은 conv 유지', true, kept.length);
    kept.forEach((r) => console.log(`      · ${r.code || r.id} ${String(r.name).slice(0, 34)} — 매핑 ${r.mapping_kept.join(',')} conv 유지`));
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
