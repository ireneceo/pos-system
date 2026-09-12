/**
 * 외부 공급업체 상품 목록 정렬 — 해석기 (2026-09-11 Fable 설계 · Irene 「fable 권고대로」)
 *
 * Irene 원문: 「이 내용이 우리 공급업체들 이름이야. 영문(한글) 이렇게 이름 좀 다 맞춰줘. 단위도 여기 표시되는 거 포장단위야. …
 *              내가 준 것중에서 동일한 아이템이 없으면 추가도 해줘. 기존에 있는 건 수정해주고.」
 *             「레시피나 재고관리에 사용하는 단위는 포장 기준수량에 사용하는 단위와 같아야 해. … 발주에서는 1kg/pack 이런식인거야.」
 * 규칙 단일 기준: docs/TRADE_STRUCTURE.md §2-2 «판매 상품 규격 표기·어휘» · 절차: docs/EXTERNAL_SUPPLIER_PRODUCTS.md §11
 *
 * **순수 함수만** — DB·파일을 만지지 않는다. 읽기·쓰기는 scripts/catalog-alignment.js 가 한다.
 * ⛔ 이 파일은 «검토표»를 만든다. 짝이 애매한 행을 **자동으로 고치지 않는다**(action = 'check').
 */

// ── 포장단위 저장 어휘 (Fable 규칙 3 · 풀네임 통일)
const PACKAGE_WORDS = {
  pkt: 'pack', pkts: 'pack', pck: 'pack', pack: 'pack', packs: 'pack',
  btl: 'bottle', bottle: 'bottle',
  ea: 'piece', pc: 'piece', pcs: 'piece', piece: 'piece',
  ct: 'carton', ctn: 'carton', carton: 'carton',
  tub: 'tub', tin: 'tin', drum: 'drum', roll: 'roll', rolls: 'roll', bundle: 'bundle',
  tray: 'tray', box: 'box', can: 'can', bag: 'bag'
};
// ── 취급단위(내용물) 어휘 — kg·g·L·ml·piece 만 (Irene «레시피·재고는 g·kg»)
const CONTENT_WORDS = { kg: 'kg', g: 'g', gram: 'g', gr: 'g', l: 'L', ml: 'ml' };
const COUNT_WORDS = new Set(['ea', 'pc', 'pcs']);

// 원가 미리보기는 실제 전파와 **같은 식**을 쓴다(순수 함수 — DB 무접촉)
const { convertPrice } = require('../services/costSync');

// «1kg» 을 무게 주문으로 읽는 업체 (Fable 규칙 4 원문 목록) — 공급업체 이름 정규화 값
const WEIGHT_SELLERS = new Set(['taiyangfresh', 'degreenwholesaleenterprise', 'guankeepoultry', 'leesfandbeefrozen', 'nikudo', 'nsk']);

const NUM = '(\\d+(?:\\.\\d+)?)';
const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9가-힣]/g, '');
const hangulSet = (s) => new Set(String(s || '').match(/[가-힣]/g) || []);

const contentOf = (w) => {
  const k = String(w || '').toLowerCase();
  if (CONTENT_WORDS[k]) return CONTENT_WORDS[k];
  if (COUNT_WORDS.has(k)) return 'piece';
  return null;
};
const packageOf = (w) => PACKAGE_WORDS[String(w || '').toLowerCase()] || null;

/**
 * 규격 표기 한 칸 → 판매 상품 세 칸.
 * @returns {{ spec: null|{unit, base_quantity, package_unit, order_mode}, rule: string, capacity_unknown: boolean }}
 *   rule: a(용량/포장) b(1포장/용량) c(1포장(용량)) d(1포장 단독 — 용량 미상) e-pack · e-measure(단독 용량) · empty · unparsed
 */
function parseSpec(raw, sellerName) {
  const s = String(raw || '').trim();
  if (!s) return { spec: null, rule: 'empty', capacity_unknown: false };
  const t = s.replace(/\s+/g, '').toLowerCase();
  const pack = (unit, bq, pkg, rule, unknown = false) => ({
    spec: { unit, base_quantity: bq, package_unit: pkg, order_mode: 'pack' }, rule, capacity_unknown: unknown
  });
  let m;
  // a) 10kg/pkt · 50ea/box · 360ml/btl · 500gram/pkt · 10pcs/Pack · 300g/1ea
  if ((m = t.match(new RegExp(`^${NUM}([a-z]+)/1?([a-z]+)$`)))) {
    const c = contentOf(m[2]); const p = packageOf(m[3]);
    if (c && p) return pack(c, Number(m[1]), p, 'a');
  }
  // b) 1pkt/500g · 1btl/1L · 1can/320ml · 1tub/3.2kg
  if ((m = t.match(new RegExp(`^1([a-z]+)/${NUM}([a-z]+)$`)))) {
    const p = packageOf(m[1]); const c = contentOf(m[3]);
    if (c && p) return pack(c, Number(m[2]), p, 'b');
  }
  // c) 1pkt(400g) · 1btl(623g) · 1pkt(4pcs)
  if ((m = t.match(new RegExp(`^1([a-z]+)\\(${NUM}([a-z]+)\\)$`)))) {
    const p = packageOf(m[1]); const c = contentOf(m[3]);
    if (c && p) return pack(c, Number(m[2]), p, 'c');
  }
  // d) 1pkt · 1btl · 1drum — 용량 미상 → 취급단위 piece · 용량 1 · 포장 이름 (2026-09-11 Fable 규칙 4 보정)
  //    ⛔ 취급단위 칸에 포장 이름(pack·bottle)을 넣지 않는다 — Irene «레시피·재고는 g·kg». 표시는 «1 bottle» 로 접힌다.
  if ((m = t.match(/^1([a-z]+)$/)) && packageOf(m[1])) {
    const p = packageOf(m[1]);
    return pack('piece', 1, p, 'd', p !== 'piece');
  }
  // e) 1kg · 500g · 835ml · 1.5L · 14kg 단독
  if ((m = t.match(new RegExp(`^${NUM}([a-z]+)$`)))) {
    const c = contentOf(m[2]);
    if (c && c !== 'piece') {
      const n = Number(m[1]);
      if (n === 1 && c === 'kg' && WEIGHT_SELLERS.has(norm(sellerName))) {
        return { spec: { unit: 'kg', base_quantity: 1, package_unit: null, order_mode: 'measure' }, rule: 'e-measure', capacity_unknown: false };
      }
      return pack(c, n, 'pack', 'e-pack');
    }
  }
  return { spec: null, rule: 'unparsed', capacity_unknown: false };
}

/** 목록 원문(탭이 공백 4칸으로 온 붙여넣기) → 행 배열 [한글, 영문, 코드, 공급업체, 예전 규격, 예전 가격, 규격, 가격] */
function splitListText(text) {
  const body = String(text || '').replace(/"([^"]*)"/g, (_, g) => g.replace(/\n/g, ' '));
  return body.split('\n').filter((ln) => ln.trim()).map((ln) => {
    const cells = ln.split('    ').map((c) => c.trim());
    while (cells.length && cells[cells.length - 1] === '') cells.pop();
    while (cells.length < 8) cells.push('');
    return cells.slice(0, 8);
  });
}

/** 단위 환산 — 같은 차원일 때만(kg↔g · L↔ml · piece↔piece). 아니면 null (추측 금지) */
const DIM = { kg: ['w', 1000], g: ['w', 1], l: ['v', 1000], ml: ['v', 1], piece: ['c', 1] };
function convertAmount(qty, from, to) {
  const a = DIM[String(from || '').toLowerCase()]; const b = DIM[String(to || '').toLowerCase()];
  if (!a || !b || a[0] !== b[0]) return null;
  return Math.round((Number(qty) * a[1] / b[1]) * 10000) / 10000;
}

// Opus 가 Fable 에 전달한 «한글·영문이 다른 물건» 행(영문명) — 연결 재료 이름으로 못 잡는 것까지 확실히 걸기 위해
const KNOWN_KO_MISMATCH = new Set([
  'Candy Mentos Fruit', 'Apple Cinnamon Jam', "Lady's Choice Real Mayonaisse", 'Cyber Fresh Cling Film (450mm)',
  'Baby Kailan', 'Bitter Melon (Peria Besar)', 'MSTA Mechanical Pencil', 'DISH WASH 900ML Lime PPT | 900ml x 12btl/ctn',
  'GOODMAID COCOREX BLEACH 1KG Regular | 1kg x 12btl/ctn', 'Delivery Fee (K Dine Sticker)', 'Measurement spoon 15ml',
  'Heavy Duty Garbage Bag[L Size]', 'Heavy Duty Garbage Bag[XL Size]'
].map(norm));

/**
 * 검토표 — 쓰기 없음.
 * @param {string[][]} rows splitListText 결과
 * @param {{companies:object[], products:object[], links:object[]}} catalog
 *   companies: {id,name,status} · products: {id,supplier_company_id,name,invoice_name,unit,base_quantity,package_unit,order_mode,unit_price,deleted_at}
 *   links: {id, seller_type, seller_product_id, unit_conversion, is_active, target_unit, target_name, target_base, target_cost}
 * @param {{koreanNameSellers?: string[]}} options 이름에 한글을 붙이는 공급업체(Irene: New Seoul Mart 만)
 */
function buildReview(rows, catalog, options = {}) {
  const koreanSellers = new Set((options.koreanNameSellers || []).map(norm));
  const companies = catalog.companies || [];
  const products = (catalog.products || []).filter((p) => !p.deleted_at);
  const byNorm = new Map();
  for (const c of companies) {
    const k = norm(c.name);
    if (!byNorm.has(k)) byNorm.set(k, []);
    byNorm.get(k).push(c);
  }
  const byCompany = new Map();
  for (const p of products) {
    if (!byCompany.has(p.supplier_company_id)) byCompany.set(p.supplier_company_id, []);
    byCompany.get(p.supplier_company_id).push(p);
  }
  const linksByProduct = new Map();
  for (const l of (catalog.links || [])) {
    if (l.seller_type !== 'supplier') continue;
    if (!linksByProduct.has(l.seller_product_id)) linksByProduct.set(l.seller_product_id, []);
    linksByProduct.get(l.seller_product_id).push(l);
  }

  const items = rows.map((cells, idx) => {
    const [ko, en, code, supplier, oldSpec, oldPrice, specRaw, priceRaw] = cells;
    const item = { row: idx + 1, ko, en, code, supplier, old_spec: oldSpec, old_price: oldPrice, spec_raw: specRaw, price_raw: priceRaw, checks: [] };
    if (!supplier) { item.action = 'exclude'; item.checks.push('공급업체 칸 빈 행(상품 아님)'); return item; }

    // 공급업체 — 영문명 검사보다 **먼저** 찾는다. 영문명 없는 행도 사람이 답으로 «추가»를 고르면 어느 공급업체인지 알아야 한다
    //   (2026-09-11 추천표 연습 계산: New Seoul Mart «면사랑 멸치밑국물육수1.8L» 행이 공급업체 없음 → «새 공급업체 등록 주체 답 없음» 으로 빠졌다)
    const cands = byNorm.get(norm(supplier)) || [];
    const active = cands.filter((c) => c.status === 'active');
    const pool = active.length ? active : cands;
    item.company_id = pool.length === 1 ? pool[0].id : null;
    item.company_name = pool.length === 1 ? pool[0].name : null;
    if (pool.length > 1) item.checks.push('같은 이름 공급업체 2곳 이상');
    item.new_company = pool.length === 0;

    if (!en) { item.action = 'check'; item.checks.push('영문명 없음'); return item; }

    // 상품 짝 — 같은 공급업체 안에서 영문명 완전일치 → 없으면 앞부분 일치
    let matches = [];
    if (item.company_id) {
      const ne = norm(en);
      const list = byCompany.get(item.company_id) || [];
      const exact = list.filter((p) => norm(p.name) === ne);
      const loose = list.filter((p) => ne && (norm(p.name).startsWith(ne) || ne.startsWith(norm(p.name))));
      matches = exact.length ? exact : loose;
    }
    if (matches.length > 1) item.checks.push('짝 후보 2개 이상: ' + matches.map((p) => `#${p.id} ${p.name}`).join(' | '));
    item.match = matches.length === 1 ? { id: matches[0].id, name: matches[0].name } : null;

    // 규격
    const parsed = parseSpec(specRaw, supplier);
    item.spec_rule = parsed.rule;
    item.spec = parsed.spec;
    item.capacity_unknown = parsed.capacity_unknown;
    if (parsed.rule === 'unparsed') item.checks.push(`규격 표기 해석 불가: «${specRaw}»`);

    // 가격 — 마지막 칸(최근 값). 빈 칸은 기존값 유지
    item.price = null;
    if (priceRaw) {
      const n = Number(String(priceRaw).replace(/,/g, ''));
      if (Number.isFinite(n) && n >= 0) item.price = n;
      else item.checks.push(`가격 칸 숫자 아님: «${priceRaw}»`);
    }
    // 가격 배수 안전장치 (2026-09-11 Fable 게이트 보정 1) — 2배 이상/절반 이하로 바뀌면 사람 확인.
    //   목록 칸이 밀리면 가격이 엉뚱한 상품에 들어간다(실측: 냅킨 7.80/pack → 78/carton 이 자동 수정으로 통과했었다).
    const curForPrice = item.match ? products.find((p) => p.id === item.match.id) : null;
    if (curForPrice && item.price != null && Number(curForPrice.unit_price) > 0) {
      const ratio = item.price / Number(curForPrice.unit_price);
      if (ratio >= 2 || ratio <= 0.5) item.checks.push(`가격 2배 이상 변동: ${Number(curForPrice.unit_price)} → ${item.price}`);
    }

    // 이름 — 판매 상품 이름 = **공급업체가 부르는 이름(영문)**. 한글은 우리 재고아이템 이름 쪽에 이미 있다.
    //   Irene 2026-09-11 「아이템명은 공급업체쪽에는 영어만 표시되면 돼. 발주할 때도, New Seoul Mart 만 영어(한글) 그대로 해줘.」
    //                    「원래 공급업체 아이템 이름이랑 우리 재고아이템 이름 달라.」「DB 항목 다 있어」
    //   → 한글을 붙이는 공급업체는 옵션 `koreanNameSellers` 로만(CLI --korean-name-sellers).
    //   ⚠ 목록의 한글 칸에 영문이 들어 있는 행이 있다(«Chamomile Herbal / Chamomile Herbal») → 한글 글자가 있을 때만 붙이고 비교한다.
    //   ⚠ 어긋난 한글은 **모든 공급업체**에서 check — 이름에 한글을 안 쓰더라도 목록 칸이 밀린 신호다
    //     (예: Bila Bila Mart «일회용장갑 / Candy Mentos Fruit» — 그대로 두면 사탕 상품에 장갑 가격·규격이 들어갈 수 있다. Fable 설계 «검토표에 올린다»).
    const koHasHangul = /[가-힣]/.test(ko || '');
    const koreanSeller = koreanSellers.has(norm(supplier));
    let koBad = koHasHangul && KNOWN_KO_MISMATCH.has(norm(en));
    if (item.match && koHasHangul) {
      const linkedKo = new Set();
      for (const l of (linksByProduct.get(item.match.id) || [])) for (const ch of hangulSet(l.target_name)) linkedKo.add(ch);
      if (linkedKo.size && ![...hangulSet(ko)].some((ch) => linkedKo.has(ch))) {
        koBad = true;
        item.checks.push(`한글이 연결 재료 이름과 안 겹침: «${ko}»`);
      }
    }
    if (koBad && !item.checks.some((c) => c.includes('한글'))) item.checks.push(`한글·영문 다른 물건으로 보임: «${ko}» / «${en}»`);
    item.new_name = koreanSeller && koHasHangul && !koBad ? `${en} (${ko})` : en;

    item.action = item.checks.length ? 'check' : (item.match ? 'update' : 'add');
    if (item.action === 'add' && !parsed.spec) { item.action = 'check'; item.checks.push('새 상품인데 규격 칸 비었음/해석 불가'); }
    return item;
  });

  // 목록 두 줄이 같은 기존 상품에 짝 → 둘 다 사람 확인 (한 상품을 두 번 덮어쓰지 않는다)
  const hits = new Map();
  for (const it of items) if (it.match) hits.set(it.match.id, (hits.get(it.match.id) || 0) + 1);
  for (const it of items) {
    if (it.match && hits.get(it.match.id) > 1) {
      it.checks.push(`목록 여러 줄이 같은 상품 #${it.match.id} 에 짝`);
      it.action = 'check';
    }
  }

  // 수정 내용(diff) · 연결 환산값 2차 제안
  const productById = new Map(products.map((p) => [p.id, p]));
  for (const it of items) {
    if (it.action !== 'update' && it.action !== 'add') continue;
    const cur = it.match ? productById.get(it.match.id) : null;
    const next = {
      name: it.new_name,
      invoice_name: cur && cur.invoice_name ? cur.invoice_name : it.en,   // 이미 있는 값(대조에서 배운 이름)은 덮어쓰지 않는다
      ...(it.spec || {}),
      ...(it.price != null ? { unit_price: it.price } : {})
    };
    it.next = next;
    if (cur) {
      it.diff = {};
      for (const [k, v] of Object.entries(next)) {
        const a = cur[k] == null ? null : String(cur[k]);
        const b = v == null ? null : String(v);
        const same = (k === 'base_quantity' || k === 'unit_price') ? Number(a) === Number(b) : a === b;
        if (!same) it.diff[k] = { from: cur[k] ?? null, to: v };
      }
      if (!Object.keys(it.diff).length) it.action = 'same';
    }
    // 연결 환산값 — «지금 1 인데 공식값이 다르고 단위 차원이 맞는» 연결만 (Fable 규칙 8)
    it.link_conversions = [];
    if (cur && it.spec) {
      for (const l of (linksByProduct.get(cur.id) || [])) {
        if (Number(l.unit_conversion) !== 1 || !l.target_unit) continue;
        const qty = it.spec.order_mode === 'measure' ? 1 : it.spec.base_quantity;
        const conv = convertAmount(qty, it.spec.unit, l.target_unit);
        if (conv !== null && conv !== 1) it.link_conversions.push({ link_id: l.id, target: l.target_name, target_unit: l.target_unit, from: 1, to: conv });
      }
    }
    // 원가 미리보기 (2026-09-11 운영 원가 사고 · Fable 판정 ④-d) — 가격·규격이 바뀌면 연결 재료 원가가 얼마가 되는가.
    //   적용 ⑤ 가 같은 식(services/costSync convertPrice)으로 원가를 옮긴다. 3배 이상/3분의 1 이하면 사람 확인.
    //   가격 2배 검사와 따로 둔다 — 가격이 그대로여도 규격(용량·단위)이 바뀌면 원가가 크게 움직인다.
    it.cost_preview = [];
    const costKeys = ['unit_price', 'unit', 'base_quantity'];
    if (cur && it.diff && costKeys.some((k) => k in it.diff)) {
      const pick = (k) => (k in next ? next[k] : cur[k]);
      for (const l of (linksByProduct.get(cur.id) || [])) {
        if (l.is_active === 0 || l.is_active === false || !(Number(l.target_cost) > 0)) continue;
        const r = convertPrice({ sellerPrice: pick('unit_price'), sellerUnit: pick('unit'), sellerBase: pick('base_quantity'),
          myUnit: l.target_unit, myBase: l.target_base });
        if (!(r.cost > 0)) continue;
        const ratio = r.cost / Number(l.target_cost);
        it.cost_preview.push({ link_id: l.id, target: l.target_name, from: Number(l.target_cost), to: r.cost, ratio: Math.round(ratio * 100) / 100 });
        if (ratio >= 3 || ratio <= 1 / 3) it.checks.push(`원가 3배 이상 변동: ${l.target_name} ${Number(l.target_cost)} → ${r.cost}`);
      }
      if (it.checks.length) it.action = 'check';
    }
  }
  return items;
}

function summarize(items) {
  const count = (f) => items.filter(f).length;
  return {
    rows: items.length,
    update: count((i) => i.action === 'update'),
    same: count((i) => i.action === 'same'),
    add: count((i) => i.action === 'add'),
    check: count((i) => i.action === 'check'),
    exclude: count((i) => i.action === 'exclude'),
    capacity_unknown: count((i) => i.capacity_unknown && (i.action === 'update' || i.action === 'add')),
    link_conversion_changes: items.reduce((s, i) => s + ((i.link_conversions || []).length), 0),
    new_companies: [...new Set(items.filter((i) => i.new_company && i.supplier).map((i) => i.supplier))]
  };
}

// ── 적용 계획 (쓰기 없음 — scripts/catalog-alignment.js apply 가 이 계획대로 트랜잭션 1개로 쓴다)
const APPLY_FIELDS = ['name', 'invoice_name', 'unit', 'base_quantity', 'package_unit', 'order_mode', 'unit_price'];
const pickFields = (obj) => Object.fromEntries(APPLY_FIELDS.filter((k) => obj && Object.prototype.hasOwnProperty.call(obj, k)).map((k) => [k, obj[k]]));

/**
 * 검토표 + Irene 답 → 적용 계획.
 *   - review 의 update: diff 의 `to` 만 쓴다 · `from` 은 적용 직전 DB 값과 대조(다르면 전체 중단)
 *   - check 행: **답이 있을 때만**, 답에 적힌 값만 쓴다(기계 추측을 섞지 않는다)
 *   - 새 공급업체: 등록 주체(brand/restaurant + id) 답이 없으면 그 공급업체의 추가 행은 건너뛴다
 * @param {{items:object[]}} review
 * @param {{rows?:Object<string,{action:'skip'|'update'|'add', match_id?:number, company_id?:number, fields?:object}>, companies?:Object<string,{entity_type:string, entity_id:number}>}} answers
 */
function buildApplyPlan(review, answers = {}) {
  const rowAns = (answers && answers.rows) || {};
  const compAns = (answers && answers.companies) || {};
  const plan = { updates: [], adds: [], companies: [], links: [], skipped: [] };
  const companyKeys = new Set();
  const addWithCompany = (it, fields, companyId) => {
    if (companyId) { plan.adds.push({ row: it.row, company_id: companyId, fields }); return; }
    // 답의 공급업체 이름은 표기가 흔들려도(«Bila Bila Mart» · «BilaBila Mart») 같은 곳으로 찾는다 — 짝 규칙과 같은 norm
    const ownerKey = Object.keys(compAns).find((k) => norm(k) === norm(it.supplier));
    const owner = ownerKey ? compAns[ownerKey] : null;
    if (!owner || !['brand', 'restaurant', 'foodcourt'].includes(owner.entity_type) || !Number.isInteger(Number(owner.entity_id))) {
      plan.skipped.push({ row: it.row, reason: `새 공급업체 «${it.supplier}» 등록 주체 답 없음` });
      return;
    }
    const key = norm(it.supplier);
    if (!companyKeys.has(key)) {
      companyKeys.add(key);
      plan.companies.push({ key, name: it.supplier, entity_type: owner.entity_type, entity_id: Number(owner.entity_id) });
    }
    plan.adds.push({ row: it.row, company_key: key, fields });
  };

  for (const it of review.items || []) {
    const ans = rowAns[String(it.row)];
    if (ans && ans.action === 'skip') { plan.skipped.push({ row: it.row, reason: 'Irene 답: 건너뜀' }); continue; }
    if (it.action === 'check' && !ans) { plan.skipped.push({ row: it.row, reason: '확인필요 행 — 답 없음' }); continue; }
    if (!ans && it.action === 'exclude') continue;
    // 상품 칸이 «같음»이어도 연결 환산 제안은 적용한다 (Fable 규칙 8 · 2026-09-11 운영 1차 반영에서 5건이 빠진 결함)
    if (!ans && it.action === 'same') {
      for (const l of it.link_conversions || []) plan.links.push({ row: it.row, link_id: l.link_id, product_id: it.match.id, from: l.from, to: l.to });
      continue;
    }

    if (ans) {
      const fields = pickFields(ans.fields);
      if (!fields.name) { plan.skipped.push({ row: it.row, reason: '답에 이름(fields.name) 없음' }); continue; }
      if (ans.action === 'update') {
        if (!Number.isInteger(Number(ans.match_id))) { plan.skipped.push({ row: it.row, reason: '답에 match_id 없음' }); continue; }
        const pid = Number(ans.match_id);
        // 답으로 들어온 행도 **답의 규격으로** 연결 환산·원가를 다시 계산한다 (2026-09-11 Fable 판정).
        //   전에는 검토표 시점 계산(it.link_conversions)만 썼고 답 경로에는 아예 없었다 → 2차 운영 반영에서
        //   호떡 «65 g/piece» 로 고쳤는데 연결 환산이 1 로 남아 «1개 입고 = 1 g» 이 됐다(연결 14건을 뒤에 손으로 고침).
        const pool = ((review.links_by_product || {})[String(pid)]) || [];
        const qty = fields.order_mode === 'measure' ? 1 : Number(fields.base_quantity);
        const newLinks = []; const bigCost = [];
        for (const l of pool) {
          if (fields.unit && l.target_unit && Number(l.unit_conversion) === 1) {
            const conv = convertAmount(qty, fields.unit, l.target_unit);
            if (conv !== null && conv !== 1) newLinks.push({ row: it.row, link_id: l.id, product_id: pid, from: 1, to: conv });
          }
          if (fields.unit_price != null && Number(l.target_cost) > 0 && fields.unit && l.target_unit) {
            const r = convertPrice({ sellerPrice: fields.unit_price, sellerUnit: fields.unit, sellerBase: fields.base_quantity, myUnit: l.target_unit, myBase: l.target_base });
            if (r.cost > 0) {
              const ratio = r.cost / Number(l.target_cost);
              if (ratio >= 3 || ratio <= 1 / 3) bigCost.push(`${l.target_name} ${Number(l.target_cost)} → ${r.cost}`);
            }
          }
        }
        // 원가가 3배 이상 움직이면 답이라도 자동으로 쓰지 않는다 — 답에 `accept_cost_change: true` 를 적어야 넘어간다.
        if (bigCost.length && !ans.accept_cost_change) {
          plan.skipped.push({ row: it.row, reason: `원가 3배 이상 변동 — 답을 확인하거나 accept_cost_change 로 넘기세요: ${bigCost.join(' · ')}` });
          continue;
        }
        plan.updates.push({ row: it.row, product_id: pid, company_id: it.company_id || null, fields, expect: null, source: 'answer' });
        for (const l of newLinks) plan.links.push(l);
      } else if (ans.action === 'add') {
        addWithCompany(it, fields, ans.company_id ? Number(ans.company_id) : it.company_id);
      } else {
        plan.skipped.push({ row: it.row, reason: `알 수 없는 답 action «${ans.action}»` });
      }
      continue;
    }

    if (it.action === 'update') {
      const fields = {}; const expect = {};
      for (const [k, d] of Object.entries(it.diff || {})) { fields[k] = d.to; expect[k] = d.from; }
      if (!Object.keys(fields).length) continue;
      plan.updates.push({ row: it.row, product_id: it.match.id, company_id: it.company_id, fields, expect, source: 'review' });
      for (const l of it.link_conversions || []) plan.links.push({ row: it.row, link_id: l.link_id, product_id: it.match.id, from: l.from, to: l.to });
    } else if (it.action === 'add') {
      addWithCompany(it, pickFields(it.next), it.company_id);
    }
  }

  // 같은 상품을 두 번 쓰는 계획은 만들지 않는다(답이 review 행과 겹친 경우)
  const seen = new Map();
  for (const u of plan.updates) seen.set(u.product_id, (seen.get(u.product_id) || 0) + 1);
  plan.duplicate_products = [...seen.entries()].filter(([, n]) => n > 1).map(([id]) => id);
  return plan;
}

/** 적용 직전 대조 — 검토표를 만든 뒤 누가 고쳤으면 true 가 아니다 */
function sameValue(field, a, b) {
  if (a == null && b == null) return true;
  if (field === 'base_quantity' || field === 'unit_price' || field === 'unit_conversion') return Number(a) === Number(b);
  return String(a ?? '') === String(b ?? '');
}

// ── 지난 발주 줄 (2026-09-11 Fable 게이트 보정 2 · Irene 「기존 발주한 내용들이나 POs에 있는 것도 정보 맞춰서 나오게 해줘」)
//   빈 규격 스냅샷을 **고쳐진 판매 상품**에서 채운다. 있는 스냅샷을 덮는 게 아니라 빈 칸을 채우는 것(§2-2 원칙 유지).
//   · 입고가 시작된 줄(received 등): 라벨 `unit` + `base_quantity`·`base_unit` 만. **`unit_conversion`·수량·단가 무접촉** —
//     재고는 이미 «수량 × 환산값»으로 들어갔고 반품(routes/po-returns.js)이 같은 환산값으로 되돌린다.
//   · 아직 받지 않은 줄(draft·pending_approval·submitted · 받은 수량 0): 위 + `unit_conversion` 을 연결의 현재 환산값으로.
//   · 취소(cancelled): 건드리지 않는다.
const PO_LINE_SPEC_FIELDS = ['unit', 'base_quantity', 'base_unit'];
const PO_CONVERSION_WRITABLE = new Set(['draft', 'pending_approval', 'submitted']);
const PO_LINE_SKIP = new Set(['cancelled']);

/** 이 발주 상태·받은 수량에서 쓸 수 있는 칸 — 쓰기 직전에 반드시 이것으로 막는다(assertPoLineWrite) */
function poLineWritableFields(status, quantityReceived) {
  if (!status || PO_LINE_SKIP.has(status)) return [];
  const notReceived = !(Number(quantityReceived) > 0);
  return PO_CONVERSION_WRITABLE.has(status) && notReceived ? [...PO_LINE_SPEC_FIELDS, 'unit_conversion'] : [...PO_LINE_SPEC_FIELDS];
}

function assertPoLineWrite(status, quantityReceived, fields) {
  const allowed = poLineWritableFields(status, quantityReceived);
  const bad = Object.keys(fields || {}).filter((k) => !allowed.includes(k));
  if (bad.length) throw new Error(`발주 줄 쓰기 거부 — 상태 ${status} · 받은 수량 ${Number(quantityReceived) || 0} 인 줄에 ${bad.join(', ')} 를 쓸 수 없다`);
}

/**
 * @param {object[]} lines {id, purchase_order_id, po_number, po_status, quantity_received, unit, base_quantity, base_unit,
 *                          unit_conversion, description, seller_product_id, link_unit_conversion, stock_unit, stock_package_unit}
 * @param {Map<number, object>} productById 판매 상품(정리 **뒤** 값) {unit, base_quantity, package_unit, order_mode}
 * @returns {object[]} 바뀌는 줄만 {line_id, purchase_order_id, po_number, po_status, quantity_received, description, diff}
 */
function buildPoLinePlan(lines, productById) {
  const { sellerOrderLine } = require('./poLineSpec'); // 발주 줄 규격 규칙 단일 소스(담을 때와 같은 답)
  const out = [];
  for (const l of lines || []) {
    const allowed = poLineWritableFields(l.po_status, l.quantity_received);
    if (!allowed.length) continue;
    const sp = productById.get(Number(l.seller_product_id));
    if (!sp) continue;
    const spec = sellerOrderLine(sp, { unit: l.stock_unit, package_unit: l.stock_package_unit });
    if (!spec.unit) continue;
    const next = { unit: spec.unit, base_quantity: spec.base_quantity, base_unit: spec.base_unit };
    if (allowed.includes('unit_conversion') && l.link_unit_conversion != null) next.unit_conversion = Number(l.link_unit_conversion);
    const diff = {};
    for (const [k, v] of Object.entries(next)) {
      if (!sameValue(k, l[k], v)) diff[k] = { from: l[k] ?? null, to: v };
    }
    if (Object.keys(diff).length) {
      out.push({ line_id: l.id, purchase_order_id: l.purchase_order_id, po_number: l.po_number, po_status: l.po_status,
        quantity_received: l.quantity_received, description: l.description, diff });
    }
  }
  return out;
}

module.exports = {
  parseSpec, splitListText, buildReview, summarize, buildApplyPlan, sameValue, convertAmount, norm,
  buildPoLinePlan, poLineWritableFields, assertPoLineWrite,
  APPLY_FIELDS, PACKAGE_WORDS, WEIGHT_SELLERS
};
