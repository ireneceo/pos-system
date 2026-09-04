/**
 * Migration (manual · 일회성): 재료 목록 통합 — 브랜드 재료를 Stock Items 의 거울로 만든다.
 *
 * 설계: docs/INGREDIENT_UNIFICATION_DESIGN.md §3-2 (단계 ②③⑦)
 * 구조: docs/TRADE_STRUCTURE.md
 *
 * 단위 선언(검증 규율): 이 스크립트가 비교·이동하는 값의 단위는 —
 *   - 건수: 행 수(건)
 *   - 재고 수량: **각 행의 자기 단위**. 서로 다른 단위 사이 이동은 하지 않는다(§7 A 는 환산비를 쓰지만
 *     대상이 전부 재고 0 인 것을 확인한 뒤에만 옮긴다).
 *   - 가격: 이 스크립트는 **가격을 만들지 않는다.** 거울 생성 시 Stock Item 원가를 초기값으로 1회 복사할 뿐.
 *
 * 원칙 (Irene 지시): **있으면 붙이고, 없을 때만 만든다. 새 행을 추가해 두 줄이 되는 결과는 금지.**
 *
 * 절:
 *   A. 브랜드 재료 → Stock Item 붙이기(이름 3단계 일치, 후보 유일할 때만) · 없으면 Stock Item 생성 후 붙임
 *   B. 잔재 6건 정정 (with MIN 옛 연결 — 별도 스크립트에서 옮겨 옴)
 *
 * ⛔ 손대지 않는 것: 원장·발주 이력 · 매장 소유 재료 · brand 1 비활성 63건 · 미확정 3건.
 * 멱등: 이미 출처가 붙은 행은 skip. 두 번 돌려도 같은 결과.
 * 사용: node scripts/migrate-ingredient-unification.js          → 드라이런(기본)
 *       node scripts/migrate-ingredient-unification.js --apply  → 단일 트랜잭션 적용
 */
require('dotenv').config();
const { sequelize } = require('../config/database');

const APPLY = process.argv.includes('--apply');
const q = (s, o = {}) => sequelize.query(s, { type: sequelize.QueryTypes.SELECT, ...o });

const N = (s) => (s || '').toUpperCase().replace(/[^A-Z0-9가-힣]/g, '');
const korParen = (s) => { const m = (s || '').match(/\(([^()]*[가-힣][^()]*)\)\s*$/); return m ? N(m[1]) : ''; };
const engBody = (s) => N((s || '').replace(/\([^()]*(?:\([^()]*\)[^()]*)*\)/g, ' '));


/**
 * 이름에서 포장 크기를 환산비로 뽑는다. `800g`→800 · `2.5kg`→2500 · `18L`→18000 · `100매`→100.
 * 못 뽑으면 null — **추측하지 않는다**(그 행은 미확정으로 남긴다).
 */
function packSizeFromName(name) {
  const s = String(name || '');
  const m = s.match(/(\d+(?:\.\d+)?)\s*(kg|g|l|ml|매|pcs)\b/i) || s.match(/(\d+(?:\.\d+)?)\s*(kg|g|L|ml|매)/);
  if (!m) return null;
  const v = parseFloat(m[1]);
  const u = m[2].toLowerCase();
  if (!Number.isFinite(v) || v <= 0) return null;
  if (u === 'kg') return v * 1000;
  if (u === 'l') return v * 1000;
  if (u === 'g' || u === 'ml') return v;
  if (u === '매' || u === 'pcs') return v;
  return null;
}

const USE_UNITS = new Set(['g', 'ml']);

/**
 * 데이터로는 못 정하지만 **사람이 정한** 합치기 (Fable 판정 2026-09-04).
 *   당면: 쓰는 단위 행이 아예 없어 포장 행 181 을 `Glass Noodle`·단위 g 로 **승격**하고,
 *         14kg 포장은 환산 14000, 185 의 백설햇 1kg 포장은 환산 1000 으로 181 에 붙인다.
 *   김밥용 김: 184 를 남기고 183(100매)의 연결을 환산 100 으로 옮긴다.
 * ⛔ 이름이 안 맞으면 **적용하지 않는다**(환경이 다르면 조용히 엉뚱한 행을 건드리지 않게).
 */
const EXPLICIT_MERGES = [
  { keepName: 'Glass Noodle (당면 14kg)', keepRename: 'Glass Noodle', keepUnit: 'g', selfConv: 14000,
    from: [{ name: 'Glass Noodle (당면 백설햇 1kg)', conv: 1000 }] },
  { keepName: 'Dried seaweed sheet for KImbob (김밥용 김)',
    from: [{ name: 'Dried seaweed sheet for KImbob (김밥용김_100매)', conv: 100 }] },
];

/**
 * S0 — Stock Items 내부 정리 계획을 세운다(쓰기 없음).
 *
 * 규칙 (설계 §3-2 ⑦ · Irene 단위 규칙 §1-5):
 *   같은 소유자 안에서 **괄호를 뗀 영문 본체**가 같은 것끼리 묶는다. 묶음 안에서 남길 행은
 *     ① 단위가 g/ml 인 행이 **정확히 하나**면 그것(= 우리가 쓰는 단위 행)
 *     ② 없으면, 끝 괄호에 한글명이 있는 행이 **정확히 하나**면 그것(= 표기 관례)
 *     ③ 둘 다 아니면 **미확정 — 손대지 않는다**
 *   나머지 행은 "공급업체 포장"으로 보고 공급처 연결을 남는 행으로 옮긴다.
 *   환산비는 **이름에서 뽑는다.** 못 뽑으면 그 행은 미확정(무접촉).
 *
 * ⛔ 크기·맛이 상품을 구분하는 묶음(소스통 1/2/3.25OZ · 밥그릇 L/M/S · 소주 3종 · 봉투 L/XL 등)은
 *    규칙 ③에 걸려 자동으로 미확정이 된다 — 그게 의도다. **이름 본체가 같다고 합치지 않는다.**
 */
async function planS0(q) {
  const items = await q(`SELECT id, name, unit, unit_cost, current_stock, owner_user_id, is_active
                           FROM product_ingredients WHERE is_active = 1`);
  const groups = new Map();
  items.forEach((p) => {
    const k = `${p.owner_user_id}::${engBody(p.name)}`;
    if (!engBody(p.name)) return;
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(p);
  });

  const merges = [];      // { keep, from, conv }
  const unresolved = [];  // { rows, why }
  const explicitHandled = new Set();

  // 사람이 정한 것 먼저 — 이름이 정확히 맞을 때만.
  for (const e of EXPLICIT_MERGES) {
    const keep = items.find((x) => x.name === e.keepName);
    if (!keep) continue;
    const froms = e.from.map((f) => ({ def: f, row: items.find((x) => x.name === f.name) })).filter((x) => x.row);
    if (froms.length !== e.from.length) continue;
    explicitHandled.add(keep.id);
    froms.forEach((f) => {
      explicitHandled.add(f.row.id);
      merges.push({ keep, from: f.row, conv: f.def.conv, mode: 'explicit', rename: e.keepRename, newUnit: e.keepUnit, selfConv: e.selfConv });
    });
  }

  for (const [, rows] of groups) {
    if (rows.some((r) => explicitHandled.has(r.id))) continue; // 사람이 정한 묶음은 자동 규칙에서 뺀다
    if (rows.length < 2) continue;
    const useUnit = rows.filter((r) => USE_UNITS.has(String(r.unit || '').toLowerCase()));
    let keep = null, mode = null;
    if (useUnit.length === 1) { keep = useUnit[0]; mode = 'use-unit'; }
    else {
      // ⚠ 한글명 규칙은 **"맨이름 + 한글명" 두 줄** 형태에만 쓴다(예: `Tomato` / `Tomato (토마토)`).
      //   그냥 "한글 괄호가 하나뿐인 행"을 고르면, 소주 참이슬 **복숭아·딸기·오리지널** 처럼
      //   전부 한글 괄호를 가진 묶음에서 정규식에 걸린 하나만 남기고 **맛이 다른 상품을 합쳐 버린다**
      //   (운영 드라이런에서 실제로 그렇게 나왔다). 그래서 조건을 좁힌다:
      //     한글명이 있는 행이 정확히 하나 **그리고** 나머지가 전부 한글명 없는 맨이름일 것.
      //   ⚠ "한글명 없음"을 `korParen()` 이 비었는지로 판단하면 안 된다 —
      //     `Soju (Peach Flavour) (소주 참이슬 (복숭아))` 처럼 **괄호가 중첩**되면 정규식이 못 잡아
      //     맛이 다른 상품이 "맨이름"으로 보인다(운영 드라이런에서 소주 3종이 실제로 합쳐질 뻔했다).
      //     그래서 맨이름은 **괄호가 아예 없는 행**으로만 인정한다.
      const kor = rows.filter((r) => korParen(r.name));
      const bare = rows.filter((r) => !String(r.name || '').includes('('));
      if (kor.length === 1 && bare.length > 0 && kor.length + bare.length === rows.length) {
        keep = kor[0]; mode = 'kor-name';
      }
    }
    if (!keep) { unresolved.push({ rows, why: '남길 행을 데이터로 못 정함(크기·맛 구분일 수 있음)' }); continue; }

    for (const r of rows) {
      if (r.id === keep.id) continue;
      // 남는 행이 g/ml 이면 포장 행의 환산비가 필요하다. 같은 단위끼리(B 형)면 1.
      const needConv = mode === 'use-unit';
      const conv = needConv ? packSizeFromName(r.name) : 1;
      if (!conv) { unresolved.push({ rows: [r], why: `환산비를 이름에서 못 뽑음 → 무접촉 (남길 행 ${keep.id})` }); continue; }
      merges.push({ keep, from: r, conv, mode });
    }
  }
  return { merges, unresolved };
}

/**
 * S2 — 브랜드 재료의 K-소스 이름 두 벌 정리 계획 (설계 ⑦③⑤).
 *
 * 규칙: 같은 브랜드 안에서 **A 의 정규화 이름이 B 의 정규화 이름의 진짜 접두사**이고
 *       A 에는 레시피 줄이 있고 B 에는 **하나도 없으면** — A 가 "레시피가 쓰는 줄", B 가 "발주가 사는 줄"이다.
 *       A 를 남기고 **이름만 B 의 긴 이름으로** 바꾼다(레시피 줄·단위 무이동, Irene "긴이름으로 다 써").
 *       B 의 매장 덧씌우기를 A 로 옮기고 B 는 비활성.
 * 가드: B 에 레시피 줄이 하나라도 있으면 **손대지 않는다**(두 줄 다 쓰이는 중 = 사람 판단).
 */
async function planS2(q) {
  const rows = await q(`SELECT i.id, i.name, i.unit, i.brand_id, i.is_active,
      (SELECT COUNT(*) FROM recipe_ingredients ri WHERE ri.ingredient_id = i.id) rec,
      (SELECT COUNT(*) FROM restaurant_ingredient_stocks s WHERE s.ingredient_id = i.id) ov
      FROM ingredients i WHERE i.brand_id IS NOT NULL AND i.is_active = 1`);
  const byBrand = new Map();
  rows.forEach((r) => { if (!byBrand.has(r.brand_id)) byBrand.set(r.brand_id, []); byBrand.get(r.brand_id).push(r); });

  const pairs = [];
  const skipped = [];
  for (const [, list] of byBrand) {
    for (const a of list) {
      if (Number(a.rec) === 0) continue;
      const na = N(a.name);
      // ⚠ 접두사만 보면 `K-Soy` 가 `K-Soybean Sauce 1kg` · `K-Soy Sauce for fish 1kg` · `K-Soy Sauce 1kg`
      //   **셋 다**에 걸린다(운영 드라이런에서 실제로 그렇게 나왔다). 한 줄을 세 번 개명할 수는 없다.
      //   그래서 후보를 모으고 **정확히 하나일 때만** 쌍으로 삼는다. 둘 이상이면 사람 판단으로 남긴다.
      const cands = list.filter((b) => {
        if (b.id === a.id) return false;
        const nb = N(b.name);
        return nb.startsWith(na) && nb.length > na.length;
      });
      if (!cands.length) continue;
      if (cands.length > 1) {
        skipped.push({ a, b: cands[0], why: `긴 이름 후보가 ${cands.length}개(${cands.map((c) => c.name).join(' / ')}) — 사람 판단` });
        continue;
      }
      const b = cands[0];
      if (Number(b.rec) > 0) { skipped.push({ a, b, why: '긴 이름 쪽에도 레시피가 있다 — 사람 판단' }); continue; }
      pairs.push({ keep: a, drop: b });
    }
  }
  return { pairs, skipped };
}

/** S3 — with MIN 잔재 6건. 운영 전용 링크 id. 없으면(=dev) 건너뛴다. */
const S3_LINKS = [9, 1160, 1165, 1199, 1200, 1251];
const S3_COST_EXCEPTION = new Set([1082, 1083]); // 옛 복사본 원가 — Fable 명시 허용

async function planS3(q) {
  const rows = await q(
    `SELECT isp.id link_id, isp.unit_price cur_price, isp.unit_conversion, isp.seller_type,
            i.id ing_id, i.name ing_name, i.unit_cost ing_cost, i.restaurant_id,
            bp.id bp_id, bp.sku, bp.unit_price git_price, bp.is_active bp_active
       FROM ingredient_seller_products isp
       JOIN ingredients i ON i.id = isp.ingredient_id
       JOIN brand_products bp ON bp.id = isp.seller_product_id
      WHERE isp.id IN (:ids)`, { replacements: { ids: S3_LINKS } });
  const plan = rows.map((r) => ({ r, finalPrice: Number(r.git_price) > 0 ? Number(r.git_price) : Number(r.cur_price) }));
  const fail = [];
  plan.forEach(({ r }) => {
    if (Number(r.restaurant_id) !== 10) fail.push(`S3 재료 ${r.ing_id} restaurant_id=${r.restaurant_id}`);
    if (r.seller_type !== 'brand') fail.push(`S3 링크 #${r.link_id} seller_type=${r.seller_type}`);
    if (Number(r.unit_conversion) !== 1) fail.push(`S3 링크 #${r.link_id} unit_conversion=${r.unit_conversion}`);
    if (!r.bp_active) fail.push(`S3 상품 ${r.bp_id} 비활성`);
    const c = Number(r.ing_cost);
    if (c !== 0 && c !== Number(r.cur_price) && !S3_COST_EXCEPTION.has(r.ing_id)) {
      fail.push(`S3 재료 ${r.ing_id} 원가 ${r.ing_cost} 가 0 도 옛 단가 ${r.cur_price} 도 아님`);
    }
  });
  return { plan, fail };
}

(async () => {
  // 드라이런은 **스키마 마이그 전에도** 계획을 세울 수 있어야 한다(운영 사전 점검).
  //   컬럼이 아직 없으면 "아무것도 안 붙어 있다"로 보고 계획만 낸다. `--apply` 는 컬럼 없이 진행하지 않는다.
  const [colExists] = await q(
    `SELECT COUNT(*) c FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME='ingredients' AND COLUMN_NAME='source_product_ingredient_id'`);
  const HAS_SOURCE_COL = Number(colExists.c) > 0;
  if (!HAS_SOURCE_COL) {
    console.log('⚠ ingredients.source_product_ingredient_id 컬럼이 없다 — 스키마 마이그 전.');
    console.log('  드라이런은 계획만 낸다. --apply 는 컬럼이 생긴 뒤에만 가능하다.');
    if (APPLY) { console.error('⛔ 컬럼 없이 적용 불가 — migrate-ingredient-source-column.js 를 먼저 실행할 것'); process.exit(1); }
  }
  const brandIngredients = await q(
    `SELECT id, name, unit, unit_cost, brand_id, is_active,
            ${HAS_SOURCE_COL ? 'source_product_ingredient_id' : 'NULL AS source_product_ingredient_id'}
       FROM ingredients WHERE brand_id IS NOT NULL ORDER BY brand_id, id`);
  const stockItems = await q(
    `SELECT id, name, unit, unit_cost, owner_user_id, is_active FROM product_ingredients`);

  // 브랜드별 소유자 — 매칭은 **같은 소유자의 Stock Items 안에서만** 한다.
  //   소유자를 안 가리면 남의(다른 BG 계정) Stock Item 이 후보로 잡혀 "후보 다수"가 되거나,
  //   더 나쁘면 **다른 테넌트 행에 붙는다.** dev 에서 실제로 6건이 그렇게 잡혔다.
  const brandOwnerId = new Map();
  for (const b of [...new Set(brandIngredients.map((x) => x.brand_id))]) {
    const [o] = await q(`SELECT owner_id FROM brands WHERE id = :b`, { replacements: { b } });
    brandOwnerId.set(b, o ? o.owner_id : null);
  }
  // ⚠ **순차 계산**: S0 이 끌 행은 S1 후보에서 빠져야 한다. 그러지 않으면 드라이런과 적용 결과가
  //   달라진다(적용은 한 트랜잭션에서 S0 → S1 순서다). 실제로 `Fine Pepper Powder` 가 S0 에서
  //   299 를 끄는데도 S1 에서 후보 2개로 남아 "무접촉"으로 잘못 계획됐다.
  //   드라이런이 적용과 다르면 그건 드라이런이 아니다.
  const s0Pre = await planS0(q);
  const willDeactivate = new Set(s0Pre.merges.map((m) => m.from.id));
  const s0Renames = new Map(s0Pre.merges.filter((m) => m.rename).map((m) => [m.keep.id, m.rename]));

  // 브랜드가 **파는 것**(프로덕트) 인덱스 — 브랜드별. 이게 S1 보다 **먼저** 걸린다.
  //   2026-09-01 결정: 레시피 없는 프로덕트는 그 자체가 재고아이템이다(수량이 프로덕트에 산다).
  //   그러니 파는 물건에 Stock Item 을 또 만들면 그때 합쳐 놓은 것이 다시 갈라진다.
  //   실측(2026-09-04): 활성 브랜드 재료 143건 중 25건이 소유 브랜드의 활성 프로덕트와 같은 물건이었다.
  // ⚠ 프로덕트가 브랜드에 닿는 길은 **둘**이다:
  //   ① `brand_product_brands` 명시 연결  ② 연결 행이 없는 프로덕트(전 브랜드 배포) → **소유자의 브랜드 전부**
  //   ②를 빠뜨리면 `PRD-114/115`(MTP 컵·뚜껑)처럼 brands=null 인 프로덕트를 못 찾아,
  //   그 재료가 **꺼진 Stock Item 에 붙으려다** 가드에 걸린다(운영 드라이런에서 실제로 그랬다).
  const bpRows = await q(`SELECT id, name, sku, owner_user_id FROM brand_products WHERE is_active = 1`);
  const bpLinks = await q(`SELECT product_id, brand_id FROM brand_product_brands`);
  const linksByProduct = new Map();
  bpLinks.forEach((l) => { if (!linksByProduct.has(l.product_id)) linksByProduct.set(l.product_id, []); linksByProduct.get(l.product_id).push(l.brand_id); });
  const brandsByOwner = new Map();
  for (const o of [...new Set(bpRows.map((x) => x.owner_user_id).filter(Boolean))]) {
    const bs = await q(`SELECT id FROM brands WHERE owner_id = :o`, { replacements: { o } });
    brandsByOwner.set(o, bs.map((x) => x.id));
  }
  const brandProducts = [];
  bpRows.forEach((p) => {
    const explicit = linksByProduct.get(p.id);
    const brands = (explicit && explicit.length) ? explicit : (brandsByOwner.get(p.owner_user_id) || []);
    brands.forEach((b) => brandProducts.push({ id: p.id, name: p.name, sku: p.sku, brand_id: b }));
  });
  const prodIdx = { full: new Map(), kor: new Map(), eng: new Map() };
  // ⚠ 키에 브랜드를 접두사로 붙이면 **이름 부분이 비어도 키가 truthy** 가 된다.
  //   그래서 한글명이 없는 프로덕트가 전부 `"2::"` 한 덩어리로 묶였고, 한글명 없는 브랜드 재료가
  //   그 덩어리를 "후보 23개"로 받아 **76건이 무더기로 미확정**이 됐다(운영 드라이런에서 실제로 그랬다).
  //   이름 부분이 비면 넣지도, 찾지도 않는다.
  const pushP = (m, brand, namePart, v) => {
    if (!namePart) return;
    const k = `${brand}::${namePart}`;
    if (!m.has(k)) m.set(k, []);
    m.get(k).push(v);
  };
  const getP = (m, brand, namePart) => (namePart ? m.get(`${brand}::${namePart}`) : null);
  brandProducts.forEach((p) => {
    pushP(prodIdx.full, p.brand_id, N(p.name), p);
    pushP(prodIdx.kor, p.brand_id, korParen(p.name), p);
    pushP(prodIdx.eng, p.brand_id, engBody(p.name), p);
  });

  const idxByOwner = new Map();
  const push = (m, k, v) => { if (!k) return; if (!m.has(k)) m.set(k, []); m.get(k).push(v); };
  stockItems.filter((p) => !willDeactivate.has(p.id)).forEach((p) => {
    if (s0Renames.has(p.id)) p = { ...p, name: s0Renames.get(p.id) }; // S0 개명 후 이름으로 대조
    if (!idxByOwner.has(p.owner_user_id)) idxByOwner.set(p.owner_user_id, { full: new Map(), kor: new Map(), eng: new Map() });
    const ix = idxByOwner.get(p.owner_user_id);
    push(ix.full, N(p.name), p); push(ix.kor, korParen(p.name), p); push(ix.eng, engBody(p.name), p);
  });
  const EMPTY_IDX = { full: new Map(), kor: new Map(), eng: new Map() };

  const attach = [];      // 기존 Stock Item 에 붙임
  const createThen = [];  // Stock Item 을 만들고 붙임
  const skipped = [];     // 이미 출처가 있음(멱등) 또는 비활성
  const ambiguous = [];   // 후보 2개 이상 — 손대지 않음
  const productAttach = []; // 브랜드가 **파는** 프로덕트가 출처 — Stock Item 만들지 않음

  for (const ing of brandIngredients) {
    if (ing.source_product_ingredient_id) { skipped.push({ ing, why: '이미 출처 있음' }); continue; }
    // brand 1 의 63건은 전부 비활성이고 레시피·덧씌우기·연결이 0 — 거울을 만들지 않는다(설계 §3-3).
    if (!ing.is_active) { skipped.push({ ing, why: '비활성 — 거울 안 만듦' }); continue; }

    // ① 먼저 "이 브랜드가 파는 프로덕트"인지 본다. 맞으면 **Stock Item 을 만들지 않고** 프로덕트를 출처로 삼는다.
    const pTries = [['전체이름', getP(prodIdx.full, ing.brand_id, N(ing.name))],
                    ['한글명', getP(prodIdx.kor, ing.brand_id, korParen(ing.name))],
                    ['영문본체', getP(prodIdx.eng, ing.brand_id, engBody(ing.name))]];
    let pHit = null, pBasis = null, pMulti = false;
    for (const [b, c] of pTries) {
      if (!c || !c.length) continue;
      if (c.length === 1) { pHit = c[0]; pBasis = b; break; }
      pMulti = true; break;
    }
    if (pHit) { productAttach.push({ ing, product: pHit, basis: pBasis }); continue; }
    if (pMulti) {
      const shown = (getP(prodIdx.full, ing.brand_id, N(ing.name))
        || getP(prodIdx.kor, ing.brand_id, korParen(ing.name))
        || getP(prodIdx.eng, ing.brand_id, engBody(ing.name)) || []);
      ambiguous.push({ ing, basis: '프로덕트 후보 다수', cands: shown });
      continue;
    }

    // ② 아니면 기존 규칙(Stock Item 붙임/생성).
    const idx = idxByOwner.get(brandOwnerId.get(ing.brand_id)) || EMPTY_IDX;
    const tries = [['전체이름', idx.full.get(N(ing.name))],
                   ['한글명', idx.kor.get(korParen(ing.name))],
                   ['영문본체', idx.eng.get(engBody(ing.name))]];
    let hit = null, basis = null, multi = null;
    for (const [b, c] of tries) {
      if (!c || !c.length) continue;
      if (c.length === 1) { hit = c[0]; basis = b; break; }
      if (!multi) multi = { basis: b, cands: c };
    }
    if (hit) attach.push({ ing, stock: hit, basis });
    else if (multi) ambiguous.push({ ing, ...multi });
    else createThen.push({ ing });
  }

  // 새로 만들 것들을 **소유자+이름**으로 묶는다. 행마다 만들면 중복을 우리가 만드는 꼴이라
  // 한 그룹에 Stock Item 하나만 만들고 그 그룹의 브랜드 행들이 각각 거울이 된다.
  const brandOwner = brandOwnerId;
  const createGroups = new Map();
  const sameBrandDupes = [];
  for (const item of createThen) {
    const key = `${brandOwner.get(item.ing.brand_id)}::${N(item.ing.name)}`;
    const g = createGroups.get(key) || [];
    // 같은 브랜드에 같은 이름이 두 줄이면 **이미 있던 중복**이다. 우리가 정할 일이 아니라 사람 몫 —
    // 둘 다 손대지 않고 목록으로 남긴다(거울은 브랜드당 하나여야 하므로 붙일 수도 없다).
    if (g.some((x) => x.ing.brand_id === item.ing.brand_id)) { sameBrandDupes.push(item.ing); continue; }
    g.push(item);
    createGroups.set(key, g);
  }

  // ── 가드 ──
  const fail = [];
  const stockUse = new Map();
  attach.forEach(({ ing, stock }) => {
    const k = `${stock.id}:${ing.brand_id}`;
    if (stockUse.has(k)) fail.push(`Stock Item ${stock.id} 에 브랜드 ${ing.brand_id} 재료가 둘(${stockUse.get(k)}, ${ing.id}) — 거울은 브랜드당 하나`);
    stockUse.set(k, ing.id);
  });
  attach.forEach(({ ing, stock }) => {
    if (!stock.is_active) fail.push(`대상 Stock Item ${stock.id} 비활성 — 붙이지 않는다`);
  });

  // ── 출력 ──
  console.log(`\n=== 대상: 브랜드 재료 ${brandIngredients.length}건 ===`);
  console.log(`  기존 Stock Item 에 붙임 : ${attach.length}`);
  console.log(`  Stock Item 생성 후 붙임 : ${createThen.length}`);
  console.log(`  건너뜀(멱등·비활성)     : ${skipped.length}`);
  console.log(`  프로덕트가 출처(파는 것) : ${productAttach.length}  ← Stock Item 만들지 않음`);
  console.log(`  후보 다수 — 무접촉       : ${ambiguous.length}`);

  const byBasis = attach.reduce((a, x) => { a[x.basis] = (a[x.basis] || 0) + 1; return a; }, {});
  console.log(`  붙임 근거 분포: ${Object.entries(byBasis).map(([k, v]) => `${k} ${v}`).join(' · ') || '-'}`);
  console.log(`  새로 만들 Stock Item 수 : ${createGroups.size} (브랜드 행 ${createThen.length - sameBrandDupes.length}건이 이 중 하나에 붙는다)`);
  if (sameBrandDupes.length) {
    console.log(`\n[같은 브랜드 안에 같은 이름이 두 줄 — 손대지 않음 ${sameBrandDupes.length}건]`);
    sameBrandDupes.forEach((x) => console.log(`  재료 ${x.id} [b${x.brand_id}] ${x.name}`));
  }

  if (ambiguous.length) {
    console.log('\n[후보 다수 — 손대지 않음]');
    ambiguous.forEach((x) => console.log(`  재료 ${x.ing.id} [b${x.ing.brand_id}] ${x.ing.name} (${x.basis}) → ${x.cands.map((c) => `${c.id} ${c.name}`).join(' / ')}`));
  }
  console.log('\n[Stock Item 을 새로 만들 것 (이동이지 중복이 아니다)]');
  createThen.slice(0, 30).forEach(({ ing }) => console.log(`  재료 ${ing.id} [b${ing.brand_id}] ${ing.name} [${ing.unit}]`));
  if (createThen.length > 30) console.log(`  … 외 ${createThen.length - 30}건`);

  // ── S0 · S2 · S3 계획 ──
  const s0 = s0Pre; // 위에서 이미 계산 — 두 번 세면 판정이 갈린다
  const s2 = await planS2(q);
  const s3 = await planS3(q);
  fail.push(...s3.fail);

  console.log(`\n=== S0 — Stock Items 내부 정리 ===`);
  console.log(`  합칠 쌍 ${s0.merges.length} · 미확정(무접촉) ${s0.unresolved.length}`);
  s0.merges.forEach((m) => console.log(`  ${m.from.id} ${m.from.name} → ${m.keep.id} ${m.keep.name} [${m.keep.unit}] · 환산 ${m.conv} (${m.mode})`));
  if (s0.unresolved.length) {
    console.log('  [미확정 — 손대지 않음]');
    s0.unresolved.slice(0, 20).forEach((u) => console.log(`    ${u.rows.map((r) => `${r.id} ${r.name}`).join(' / ')} — ${u.why}`));
    if (s0.unresolved.length > 20) console.log(`    … 외 ${s0.unresolved.length - 20}건`);
  }

  console.log(`\n=== S2 — 브랜드 재료 이름 두 벌 정리 (긴 이름으로) ===`);
  console.log(`  대상 ${s2.pairs.length}쌍 · 손대지 않음 ${s2.skipped.length}`);
  s2.pairs.forEach((x) => console.log(`  남김 ${x.keep.id} "${x.keep.name}" [${x.keep.unit}] 레시피 ${x.keep.rec} → 이름을 "${x.drop.name}" 로 · ${x.drop.id} 비활성(덧씌우기 ${x.drop.ov}건 이동)`));
  s2.skipped.forEach((x) => console.log(`  [무접촉] ${x.a.id}/${x.b.id} — ${x.why}`));

  console.log(`\n=== S3 — with MIN 잔재 정정 ===`);
  if (!s3.plan.length) console.log('  대상 0건 (이 환경엔 해당 링크가 없다 — dev 예상)');
  s3.plan.forEach(({ r, finalPrice }) => console.log(`  #${r.link_id} 재료 ${r.ing_id} ${r.ing_name} | 단가 ${r.cur_price} → ${finalPrice} | 원가 ${r.ing_cost} → ${finalPrice}`));

  if (fail.length) { console.log('\n⛔ 가드 실패 — 중단합니다:'); fail.forEach((f) => console.log('   - ' + f)); process.exit(1); }
  console.log('\n가드 통과: 브랜드당 Stock Item 중복 배정 0 · 대상 Stock Item 전부 활성 · S3 가드 통과');

  if (!APPLY) { console.log('\n[드라이런] 아무것도 쓰지 않았습니다. 적용하려면 --apply'); process.exit(0); }

  // ── 적용 ──
  // 증명 A·B 용 사전 스냅샷 (단위: 레시피는 행 수, 덧씌우기는 수량 합)
  const [{ n: recBefore }] = await q(`SELECT COUNT(*) n FROM recipe_ingredients`);
  const [{ t: ovBefore }] = await q(`SELECT COALESCE(SUM(current_stock),0) t FROM restaurant_ingredient_stocks`);

  const tx = await sequelize.transaction();
  try {
    const { ProductIngredient, Ingredient } = require('../models');
    let attached = 0, created = 0;

    for (const { ing, stock } of attach) {
      const [, a] = await sequelize.query(
        `UPDATE ingredients SET source_product_ingredient_id = :s, updated_at = NOW() WHERE id = :id`,
        { replacements: { s: stock.id, id: ing.id }, transaction: tx });
      if (a.affectedRows !== 1) throw new Error(`재료 ${ing.id} 붙이기 affectedRows=${a.affectedRows}`);
      attached += 1;
    }

    // 파는 것 → 프로덕트를 출처로 (Stock Item 생성 없음)
    let prodAttached = 0;
    for (const { ing, product } of productAttach) {
      const [, a] = await sequelize.query(
        `UPDATE ingredients SET source_brand_product_id = :p, source_product_ingredient_id = NULL, updated_at = NOW() WHERE id = :id`,
        { replacements: { p: product.id, id: ing.id }, transaction: tx });
      if (a.affectedRows !== 1) throw new Error(`프로덕트 출처 ${ing.id} affectedRows=${a.affectedRows}`);
      prodAttached += 1;
    }
    console.log(`  프로덕트 출처 ${prodAttached}건`);

    // ⚠ 같은 이름끼리 **한 Stock Item 으로 모은다.** 행마다 만들면 우리가 중복을 새로 만드는 꼴이다
    //   ("겹치는 거 또 추가하지 말라" — Irene). 소유자+이름이 열쇠이고, 브랜드가 둘이면 거울이 둘 생긴다.
    for (const [, group] of createGroups) {
      const first = group[0].ing;
      const [owner] = await q(`SELECT owner_id FROM brands WHERE id = :b`, { replacements: { b: first.brand_id }, transaction: tx });
      if (!owner || !owner.owner_id) throw new Error(`브랜드 ${first.brand_id} 소유자를 못 찾음 — 중단`);
      const si = await ProductIngredient.create({
        owner_user_id: owner.owner_id,
        name: first.name,
        unit: first.unit,
        unit_cost: first.unit_cost || 0,
        current_stock: 0,
        is_active: true
      }, { transaction: tx });
      for (const { ing } of group) {
        const [, a] = await sequelize.query(
          `UPDATE ingredients SET source_product_ingredient_id = :s, updated_at = NOW() WHERE id = :id`,
          { replacements: { s: si.id, id: ing.id }, transaction: tx });
        if (a.affectedRows !== 1) throw new Error(`재료 ${ing.id} 붙이기 affectedRows=${a.affectedRows}`);
      }
      created += 1;
    }

    // ── S0: Stock Items 내부 정리 ──
    let s0Moved = 0;
    const renamedKeeps = new Set(); // 같은 keep 을 두 번 개명하지 않는다
    for (const m of s0.merges) {
      // 공급처 연결을 남는 행으로 옮긴다(환산비 포함). 같은 판매자 상품이 이미 붙어 있으면 새로 만들지 않는다.
      const dup = await q(
        `SELECT a.id FROM ingredient_seller_products a
           JOIN ingredient_seller_products b
             ON b.seller_type = a.seller_type AND b.seller_product_id = a.seller_product_id
          WHERE a.product_ingredient_id = :from AND b.product_ingredient_id = :keep`,
        { replacements: { from: m.from.id, keep: m.keep.id }, transaction: tx });
      const dupIds = new Set(dup.map((x) => x.id));
      const links = await q(`SELECT id FROM ingredient_seller_products WHERE product_ingredient_id = :from`,
        { replacements: { from: m.from.id }, transaction: tx });
      for (const l of links) {
        if (dupIds.has(l.id)) {
          await sequelize.query(`UPDATE ingredient_seller_products SET is_active = 0, updated_at = NOW() WHERE id = :id`,
            { replacements: { id: l.id }, transaction: tx });
          continue;
        }
        const [, a] = await sequelize.query(
          `UPDATE ingredient_seller_products
              SET product_ingredient_id = :keep, unit_conversion = :conv, updated_at = NOW()
            WHERE id = :id`,
          { replacements: { keep: m.keep.id, conv: m.conv, id: l.id }, transaction: tx });
        if (a.affectedRows !== 1) throw new Error(`S0 링크 ${l.id} affectedRows=${a.affectedRows}`);
      }
      // 재고가 남아 있으면 환산해서 남는 행에 더한다(합계 보존 — 증명 C).
      const stock = Number(m.from.current_stock) || 0;
      if (stock > 0) {
        await sequelize.query(
          `UPDATE product_ingredients SET current_stock = current_stock + :add, updated_at = NOW() WHERE id = :id`,
          { replacements: { add: stock * m.conv, id: m.keep.id }, transaction: tx });
        await sequelize.query(
          `UPDATE product_ingredients SET current_stock = 0, updated_at = NOW() WHERE id = :id`,
          { replacements: { id: m.from.id }, transaction: tx });
      }
      const [, d] = await sequelize.query(
        `UPDATE product_ingredients SET is_active = 0, updated_at = NOW() WHERE id = :id`,
        { replacements: { id: m.from.id }, transaction: tx });
      if (d.affectedRows !== 1) throw new Error(`S0 ${m.from.id} 비활성 affectedRows=${d.affectedRows}`);

      // 명시 결정(EXPLICIT_MERGES)의 개명·단위 변경. 당면처럼 **쓰는 단위 행이 없어 포장 행을 승격**할 때만 쓴다.
      //   단위를 g 로 바꾸면 그 행 자신의 공급처 연결(14kg 포장)도 환산비를 함께 고쳐야 한다 —
      //   안 고치면 1 pack 을 1 g 로 읽어 재고가 14000배 틀어진다.
      if (m.rename && !renamedKeeps.has(m.keep.id)) {
        await sequelize.query(
          `UPDATE product_ingredients SET name = :n${m.newUnit ? ', unit = :u' : ''}, updated_at = NOW() WHERE id = :id`,
          { replacements: { n: m.rename, ...(m.newUnit ? { u: m.newUnit } : {}), id: m.keep.id }, transaction: tx });
        if (m.selfConv) {
          await sequelize.query(
            `UPDATE ingredient_seller_products SET unit_conversion = :c, updated_at = NOW()
              WHERE product_ingredient_id = :id AND is_active = 1`,
            { replacements: { c: m.selfConv, id: m.keep.id }, transaction: tx });
        }
        renamedKeeps.add(m.keep.id);
      }
      s0Moved += 1;
    }

    // ── S2: 브랜드 재료 이름 두 벌 정리 (긴 이름으로) ──
    let s2Done = 0;
    for (const { keep, drop } of s2.pairs) {
      const [, r1] = await sequelize.query(
        `UPDATE ingredients SET name = :n, updated_at = NOW() WHERE id = :id`,
        { replacements: { n: drop.name, id: keep.id }, transaction: tx });
      if (r1.affectedRows !== 1) throw new Error(`S2 개명 ${keep.id} affectedRows=${r1.affectedRows}`);
      // 덧씌우기를 남는 행으로. 이미 있으면 만들지 않는다(수량은 사람이 볼 일 — 합치지 않는다).
      const ov = await q(`SELECT id, restaurant_id FROM restaurant_ingredient_stocks WHERE ingredient_id = :id`,
        { replacements: { id: drop.id }, transaction: tx });
      for (const o of ov) {
        const exist = await q(
          `SELECT id FROM restaurant_ingredient_stocks WHERE ingredient_id = :keep AND restaurant_id = :r`,
          { replacements: { keep: keep.id, r: o.restaurant_id }, transaction: tx });
        if (exist.length) continue; // 남는 행에 이미 있으면 옛 행만 정리한다
        await sequelize.query(`UPDATE restaurant_ingredient_stocks SET ingredient_id = :keep WHERE id = :id`,
          { replacements: { keep: keep.id, id: o.id }, transaction: tx });
      }
      await sequelize.query(`UPDATE ingredients SET is_active = 0, updated_at = NOW() WHERE id = :id`,
        { replacements: { id: drop.id }, transaction: tx });
      s2Done += 1;
    }

    // ── S3: with MIN 잔재 정정 ──
    let s3Cells = 0;
    for (const { r, finalPrice } of s3.plan) {
      if (Number(r.cur_price) !== finalPrice) {
        const [, a] = await sequelize.query(
          `UPDATE ingredient_seller_products SET unit_price = :p, updated_at = NOW() WHERE id = :id`,
          { replacements: { p: finalPrice, id: r.link_id }, transaction: tx });
        if (a.affectedRows !== 1) throw new Error(`S3 링크 #${r.link_id} affectedRows=${a.affectedRows}`);
        s3Cells += 1;
      }
      if (finalPrice !== 0 && Number(r.ing_cost) !== finalPrice) {
        const [, a] = await sequelize.query(
          `UPDATE ingredients SET unit_cost = :p, updated_at = NOW() WHERE id = :id`,
          { replacements: { p: finalPrice, id: r.ing_id }, transaction: tx });
        if (a.affectedRows !== 1) throw new Error(`S3 재료 ${r.ing_id} affectedRows=${a.affectedRows}`);
        s3Cells += 1;
      }
    }
    console.log(`  S0 합침 ${s0Moved} · S2 정리 ${s2Done}쌍 · S3 ${s3Cells}칸`);

    // 증명 B: 매장 덧씌우기 수량 합계가 변하지 않았다(옮기기만 했다).
    const [{ t: ovAfter }] = await q(`SELECT COALESCE(SUM(current_stock),0) t FROM restaurant_ingredient_stocks`, { transaction: tx });
    if (Math.abs(Number(ovAfter) - Number(ovBefore)) > 0.001) {
      throw new Error(`덧씌우기 수량 합계가 변했다: ${ovBefore} → ${ovAfter}`);
    }
    // 증명 A: 레시피 줄 수·재료 참조가 변하지 않았다.
    const [{ n: recAfter }] = await q(`SELECT COUNT(*) n FROM recipe_ingredients`, { transaction: tx });
    if (Number(recAfter) !== Number(recBefore)) throw new Error(`레시피 줄 수가 변했다: ${recBefore} → ${recAfter}`);

    // 증명(커밋 전): 활성 브랜드 재료 중 출처 없는 것 = 후보 다수로 남긴 것뿐이어야 한다.
    const [{ n: orphan }] = await q(
      `SELECT COUNT(*) n FROM ingredients WHERE brand_id IS NOT NULL AND is_active = 1 AND source_product_ingredient_id IS NULL AND source_brand_product_id IS NULL`,
      { transaction: tx });
    const expectOrphan = ambiguous.length + sameBrandDupes.length;
    if (Number(orphan) !== expectOrphan) {
      throw new Error(`출처 없는 활성 브랜드 재료 ${orphan}건 != 미확정 ${expectOrphan}건(후보다수 ${ambiguous.length} + 동명중복 ${sameBrandDupes.length})`);
    }
    const [{ n: broken }] = await q(
      `SELECT COUNT(*) n FROM ingredients i LEFT JOIN product_ingredients pi ON pi.id = i.source_product_ingredient_id
        WHERE i.source_product_ingredient_id IS NOT NULL AND pi.id IS NULL`, { transaction: tx });
    if (Number(broken) !== 0) throw new Error(`끊긴 출처 ${broken}건`);

    await tx.commit();
    console.log(`\n✔ 커밋 완료 — 붙임 ${attached} · 생성 후 붙임 ${created}`);
  } catch (e) {
    await tx.rollback();
    console.error('\n⛔ 롤백:', e.message);
    process.exit(1);
  }

  console.log('\n=== 증명 ===');
  const [{ n: orphan2 }] = await q(`SELECT COUNT(*) n FROM ingredients WHERE brand_id IS NOT NULL AND is_active = 1 AND source_product_ingredient_id IS NULL AND source_brand_product_id IS NULL`);
  const [{ n: broken2 }] = await q(`SELECT COUNT(*) n FROM ingredients i LEFT JOIN product_ingredients pi ON pi.id = i.source_product_ingredient_id WHERE i.source_product_ingredient_id IS NOT NULL AND pi.id IS NULL`);
  const [{ n: recipeLines }] = await q(`SELECT COUNT(*) n FROM recipe_ingredients`);
  const [{ n: overlays }] = await q(`SELECT COUNT(*) n FROM restaurant_ingredient_stocks`);
  console.log(`  출처 없는 활성 브랜드 재료 ${orphan2}(미확정 ${ambiguous.length + sameBrandDupes.length} 이어야 함) · 끊긴 출처 ${broken2}(0) · 레시피 줄 ${recipeLines} · 덧씌우기 ${overlays}`);
  process.exit(Number(orphan2) === ambiguous.length + sameBrandDupes.length && Number(broken2) === 0 ? 0 : 1);
})().catch((e) => { console.error(e.message); process.exit(1); });
