/**
 * 외부 공급업체 상품 목록 정렬 — 해석기 계약 (docs/EXTERNAL_SUPPLIER_PRODUCTS.md §11)
 * 고장주입 대상(Fable 게이트 지시):
 *   ① 이상 표기가 «check» 로 떨어지는가 — parseSpec 의 unparsed 반환을 지우면 «이상 표기» 테스트가 실패해야 한다.
 *   ② 짝 후보 2개인 행이 자동 수정되지 않는가 — buildReview 의 «짝 후보 2개 이상» 검사를 지우면 «짝 2개» 테스트가 실패해야 한다.
 * 이름 규칙(Irene 2026-09-11): 판매 상품 이름 = 공급업체가 부르는 이름(영문). New Seoul Mart 만 «English (한글)».
 */
const { parseSpec, splitListText, buildReview, summarize, buildApplyPlan, convertAmount, buildPoLinePlan, poLineWritableFields, assertPoLineWrite } = require('../utils/catalogSpecParser');

describe('parseSpec — 규격 표기 → 세 칸', () => {
  const s = (raw, seller = 'KK Mart') => parseSpec(raw, seller);
  test('a) 용량/포장', () => {
    expect(s('1kg/pkt').spec).toEqual({ unit: 'kg', base_quantity: 1, package_unit: 'pack', order_mode: 'pack' });
    expect(s('50ea/box').spec).toEqual({ unit: 'piece', base_quantity: 50, package_unit: 'box', order_mode: 'pack' });
    expect(s('360ml/btl').spec).toEqual({ unit: 'ml', base_quantity: 360, package_unit: 'bottle', order_mode: 'pack' });
    expect(s('300g/1ea').spec).toEqual({ unit: 'g', base_quantity: 300, package_unit: 'piece', order_mode: 'pack' });
  });
  test('b) 1포장/용량 · c) 1포장(용량)', () => {
    expect(s('1pkt/500g').spec).toEqual({ unit: 'g', base_quantity: 500, package_unit: 'pack', order_mode: 'pack' });
    expect(s('1btl/1.5L').spec).toEqual({ unit: 'L', base_quantity: 1.5, package_unit: 'bottle', order_mode: 'pack' });
    expect(s('1btl (623g)').spec).toEqual({ unit: 'g', base_quantity: 623, package_unit: 'bottle', order_mode: 'pack' });
  });
  test('d) 1포장 단독 → piece · 1 · 포장 이름 · 용량 미상 (취급단위 칸에 포장 이름 금지)', () => {
    const r = s('1btl');
    expect(r.spec).toEqual({ unit: 'piece', base_quantity: 1, package_unit: 'bottle', order_mode: 'pack' });
    expect(r.capacity_unknown).toBe(true);
    expect(s('1pc').capacity_unknown).toBe(false);
  });
  test('e) 단독 용량 — 무게로 사는 업체의 1kg 은 무게 주문', () => {
    expect(s('1kg', 'TaiYangFresh').spec).toEqual({ unit: 'kg', base_quantity: 1, package_unit: null, order_mode: 'measure' });
    expect(s('1kg', 'KK Mart').spec).toEqual({ unit: 'kg', base_quantity: 1, package_unit: 'pack', order_mode: 'pack' });
    expect(s('835ml').spec).toEqual({ unit: 'ml', base_quantity: 835, package_unit: 'pack', order_mode: 'pack' });
  });
  test('이상 표기는 해석하지 않는다(unparsed)', () => {
    for (const raw of ['12can/CT', '12pkts(450g)/1bundle', 'RM9/pkt', '60*200g', '1/kg', '300~330g', '100매']) {
      expect(s(raw).rule).toBe('unparsed');
      expect(s(raw).spec).toBeNull();
    }
    expect(s('').rule).toBe('empty');
  });
});

describe('splitListText', () => {
  test('공백 4칸 칸 나누기 · 따옴표 안 줄바꿈 합치기', () => {
    const rows = splitListText('닭다리    Chicken Drumstick (Medium)        Guan Kee poultry     1kg    18.50    1kg    18.5\n통닭    "Whole\nLeg"        Guan Kee poultry            1kg    18.5\n');
    expect(rows[0]).toEqual(['닭다리', 'Chicken Drumstick (Medium)', '', 'Guan Kee poultry', '1kg', '18.50', '1kg', '18.5']);
    expect(rows[1][1]).toBe('Whole Leg');
  });
});

describe('buildReview — 검토표', () => {
  const catalog = {
    companies: [
      { id: 10, name: 'TaiYangFresh', status: 'active' },
      { id: 21, name: 'KK Mart', status: 'active' },
      { id: 22, name: 'KK Mart', status: 'inactive' },
      { id: 28, name: 'New Seoul Mart', status: 'active' }
    ],
    products: [
      { id: 1, supplier_company_id: 10, name: 'Carrot', invoice_name: null, unit: 'kg', base_quantity: '0.50', package_unit: null, order_mode: 'pack', unit_price: '3.80', deleted_at: null },
      // 완전일치가 없고 앞부분 일치 후보가 둘 — «Egg» 줄은 어느 쪽인지 기계가 정하면 안 된다
      { id: 2, supplier_company_id: 21, name: 'Egg Grade A', invoice_name: null, unit: 'piece', base_quantity: '1.00', package_unit: 'piece', order_mode: 'pack', unit_price: '7.50', deleted_at: null },
      { id: 3, supplier_company_id: 21, name: 'Egg D', invoice_name: null, unit: 'piece', base_quantity: '1.00', package_unit: 'piece', order_mode: 'pack', unit_price: '9.50', deleted_at: null },
      { id: 4, supplier_company_id: 21, name: 'Sweetened Milk', invoice_name: 'SWEETENED MILK TEAPOT', unit: 'g', base_quantity: '1.00', package_unit: null, order_mode: 'pack', unit_price: '3.00', deleted_at: null },
      { id: 5, supplier_company_id: 28, name: 'Kimchi', invoice_name: null, unit: 'piece', base_quantity: '1.00', package_unit: 'piece', order_mode: 'pack', unit_price: '48.00', deleted_at: null }
    ],
    links: [
      { id: 900, seller_type: 'supplier', seller_product_id: 4, unit_conversion: '1.0000', target_unit: 'g', target_name: 'Sweetened Milk (연유)' },
      { id: 901, seller_type: 'supplier', seller_product_id: 1, unit_conversion: '1.0000', target_unit: 'piece', target_name: 'Carrot (당근)' },
      { id: 902, seller_type: 'supplier', seller_product_id: 5, unit_conversion: '1.0000', target_unit: 'g', target_name: 'Kimchi (김치)' }
    ]
  };
  const rows = splitListText([
    '당근    Carrot        TaiYangFresh    1kg    4.50    0.5kg    3.8',
    '    Egg         KK Mart            10pcs/pkt    7.5',
    '연유    Sweetened Milk        KK Mart            500g/can    3.2',
    '    Hero Thing        Hero Market            1pkt    3.0',
    '라이터    Lady\'s Choice Real Mayonaisse        KK Mart            1btl/450ml    12.8',
    '    Weird        KK Mart            12can/CT    21.0',
    '클로록스(락스)    Delivery Fee (K Dine Sticker)                    1way    15.0',
    '포기김치 10kg_삼시    Kimchi        New Seoul Mart            10kg/CT    48.0',
    '일회용장갑    Candy Mentos Fruit        New Seoul Mart            1pkt    4.5'
  ].join('\n'));
  const items = buildReview(rows, catalog, { koreanNameSellers: ['New Seoul Mart'] });
  const byEn = (en) => items.find((i) => i.en === en);

  test('완전일치 → update · 이름은 영문(공급업체 이름) · 규격 diff', () => {
    const it = byEn('Carrot');
    expect(it.action).toBe('update');
    expect(it.next.name).toBe('Carrot');
    // 가격 3.8 = 기존 3.80 → 바뀌지 않음 · «0.5kg» 는 무게 업체라도 1 이 아니라 0.5 kg 들이 포장
    expect(it.diff.name).toBeUndefined();
    expect(it.diff.unit_price).toBeUndefined();
    expect(it.diff.base_quantity).toBeUndefined();
    expect(it.diff.package_unit).toEqual({ from: null, to: 'pack' });
  });
  test('New Seoul Mart 만 «English (한글)»', () => {
    const it = byEn('Kimchi');
    expect(it.action).toBe('update');
    expect(it.next.name).toBe('Kimchi (포기김치 10kg_삼시)');
    expect(it.spec).toEqual({ unit: 'kg', base_quantity: 10, package_unit: 'carton', order_mode: 'pack' });
    expect(it.link_conversions).toEqual([{ link_id: 902, target: 'Kimchi (김치)', target_unit: 'g', from: 1, to: 10000 }]);
    // 옵션이 없으면 New Seoul Mart 도 영문만
    const [plain] = buildReview(splitListText('포기김치 10kg_삼시    Kimchi        New Seoul Mart            10kg/CT    48.0'), catalog);
    expect(plain.next.name).toBe('Kimchi');
  });
  test('짝 2개(Egg Grade A · Egg D) → 자동 수정하지 않고 check', () => {
    const it = byEn('Egg');
    expect(it.action).toBe('check');
    expect(it.checks.join()).toMatch(/짝 후보 2개 이상/);
    expect(it.next).toBeUndefined();
  });
  test('기존 invoice_name 은 덮어쓰지 않는다 · 연결 환산 1 → 500 (g)', () => {
    const it = byEn('Sweetened Milk');
    expect(it.action).toBe('update');
    expect(it.next.invoice_name).toBe('SWEETENED MILK TEAPOT');
    expect(it.link_conversions).toEqual([{ link_id: 900, target: 'Sweetened Milk (연유)', target_unit: 'g', from: 1, to: 500 }]);
  });
  test('단위 차원이 다르면 환산 제안 없음(kg 상품 ↔ piece 재료)', () => {
    expect(byEn('Carrot').link_conversions).toEqual([]);
  });
  test('회사 없는 공급업체 → add + new_company · 용량 미상', () => {
    const it = byEn('Hero Thing');
    expect(it.action).toBe('add');
    expect(it.new_company).toBe(true);
    expect(it.capacity_unknown).toBe(true);
  });
  test('어긋난 한글은 모든 공급업체에서 check(목록 칸 밀림 신호) — 이름에 한글을 쓰는 곳은 New Seoul Mart 뿐', () => {
    const kk = byEn("Lady's Choice Real Mayonaisse");
    expect(kk.action).toBe('check');
    expect(kk.checks.join()).toMatch(/한글·영문 다른 물건/);
    expect(kk.next).toBeUndefined();
    const nsm = byEn('Candy Mentos Fruit');
    expect(nsm.action).toBe('check');
    expect(nsm.checks.join()).toMatch(/한글·영문 다른 물건/);
  });
  test('이상 표기 · 공급업체 빈 행', () => {
    expect(byEn('Weird').action).toBe('check');
    expect(byEn('Delivery Fee (K Dine Sticker)').action).toBe('exclude');
  });
  test('summary', () => {
    const sum = summarize(items);
    expect(sum.rows).toBe(9);
    expect(sum.update).toBe(3);
    expect(sum.add).toBe(1);
    expect(sum.check).toBe(4);
    expect(sum.exclude).toBe(1);
    expect(sum.new_companies).toEqual(['Hero Market']);
  });
  // dev 연습 적용에서 잡은 결함 — 한글 칸에 영문이 있으면 «X (X)» 가 되고, 연결 재료 한글과 «안 겹침» 으로 잘못 걸렸다
  test('한글 칸에 영문만 있으면 이름은 영문만 · check 에 걸지 않는다', () => {
    const cat2 = {
      companies: [{ id: 5, name: 'New Seoul Mart', status: 'active' }],
      products: [{ id: 50, supplier_company_id: 5, name: 'Chamomile Herbal', invoice_name: null, unit: 'piece', base_quantity: '1.00', package_unit: null, order_mode: 'pack', unit_price: '0.00', deleted_at: null }],
      links: [{ id: 950, seller_type: 'supplier', seller_product_id: 50, unit_conversion: '1.0000', target_unit: 'piece', target_name: 'Chamomile (카모마일)' }]
    };
    const [it] = buildReview(splitListText('Chamomile Herbal    Chamomile Herbal        New Seoul Mart            50ea/box    48.0'), cat2, { koreanNameSellers: ['New Seoul Mart'] });
    expect(it.action).toBe('update');
    expect(it.checks).toEqual([]);
    expect(it.next.name).toBe('Chamomile Herbal');
  });
});

describe('buildApplyPlan — 적용 계획', () => {
  const review = { items: [
    { row: 1, action: 'update', match: { id: 11 }, company_id: 5, supplier: 'AIM coffee',
      diff: { name: { from: 'Earl Grey Tea', to: 'Earl Grey' }, unit_price: { from: '40.00', to: 48 } },
      link_conversions: [{ link_id: 700, from: 1, to: 50 }] },
    { row: 2, action: 'check', supplier: 'KK Mart', checks: ['짝 후보 2개 이상'] },
    { row: 3, action: 'add', supplier: 'Hero Market', new_company: true, company_id: null,
      next: { name: 'Green Coral', invoice_name: 'Green Coral', unit: 'piece', base_quantity: 1, package_unit: 'pack', order_mode: 'pack', unit_price: 7 } },
    { row: 4, action: 'add', supplier: 'KK Mart', company_id: 21,
      next: { name: 'Sponge', invoice_name: 'Sponge', unit: 'piece', base_quantity: 1, package_unit: 'pack', order_mode: 'pack', unit_price: 6.5 } },
    { row: 5, action: 'same', match: { id: 12 } },
    { row: 6, action: 'exclude' }
  ] };

  test('답 없으면 — review update 는 diff 의 to 만 · check 는 건너뜀 · 새 공급업체 주체 답 없으면 건너뜀', () => {
    const p = buildApplyPlan(review, {});
    expect(p.updates).toEqual([{ row: 1, product_id: 11, company_id: 5, fields: { name: 'Earl Grey', unit_price: 48 }, expect: { name: 'Earl Grey Tea', unit_price: '40.00' }, source: 'review' }]);
    expect(p.links).toEqual([{ row: 1, link_id: 700, product_id: 11, from: 1, to: 50 }]);
    expect(p.adds).toEqual([{ row: 4, company_id: 21, fields: review.items[3].next }]);
    expect(p.companies).toEqual([]);
    expect(p.skipped.map((s) => s.row)).toEqual([2, 3]);
  });
  test('답이 있으면 — 새 공급업체 1곳 생성 계획 · check 행은 답의 값만', () => {
    const p = buildApplyPlan(review, {
      companies: { 'Hero Market': { entity_type: 'brand', entity_id: 1 } },
      rows: { 2: { action: 'update', match_id: 65, fields: { name: 'Egg', unit: 'piece', base_quantity: 10, package_unit: 'pack', order_mode: 'pack', unit_price: 7.5, bogus: 'x' } } }
    });
    expect(p.companies).toEqual([{ key: 'heromarket', name: 'Hero Market', entity_type: 'brand', entity_id: 1 }]);
    expect(p.adds.find((a) => a.row === 3)).toEqual({ row: 3, company_key: 'heromarket', fields: review.items[2].next });
    const ans = p.updates.find((u) => u.row === 2);
    expect(ans.fields).toEqual({ name: 'Egg', unit: 'piece', base_quantity: 10, package_unit: 'pack', order_mode: 'pack', unit_price: 7.5 });
    expect(ans.expect).toBeNull();
    expect(p.skipped).toEqual([]);
  });
  // 운영 1차 반영(2026-09-11)에서 «같음» 행의 연결 환산 5건이 빠진 결함 — 고장주입: same 분기의 links.push 를 지우면 실패해야 한다
  test('상품 칸이 같음이어도 연결 환산 제안은 계획에 들어간다', () => {
    const p = buildApplyPlan({ items: [
      { row: 7, action: 'same', match: { id: 50 }, company_id: 5, supplier: 'AIM coffee', link_conversions: [{ link_id: 801, from: 1, to: 1000 }] }
    ] }, {});
    expect(p.updates).toEqual([]);
    expect(p.links).toEqual([{ row: 7, link_id: 801, product_id: 50, from: 1, to: 1000 }]);
  });
  // 추천표 연습 계산에서 잡은 결함 — 영문명 없는 행이 공급업체를 못 찾아 «추가» 답이 건너뛰어졌다.
  //   고장주입: buildReview 의 영문명 검사를 공급업체 찾기 앞으로 되돌리면 실패해야 한다.
  test('영문명 없는 행도 공급업체를 찾아 두어 «추가» 답이 그 공급업체로 들어간다', () => {
    const cat = { companies: [{ id: 28, name: 'New Seoul Mart', status: 'active' }], products: [], links: [] };
    const items = buildReview(splitListText('면사랑 멸치밑국물육수1.8L            New Seoul Mart            1.8L    43.0'), cat);
    expect(items[0].action).toBe('check');
    expect(items[0].company_id).toBe(28);
    const p = buildApplyPlan({ items }, { rows: { 1: { action: 'add', fields: { name: 'Anchovy Broth Base 1.8L (면사랑 멸치밑국물육수1.8L)', unit: 'L', base_quantity: 1.8, package_unit: 'bottle', order_mode: 'pack', unit_price: 43 } } } });
    expect(p.adds).toEqual([{ row: 1, company_id: 28, fields: { name: 'Anchovy Broth Base 1.8L (면사랑 멸치밑국물육수1.8L)', unit: 'L', base_quantity: 1.8, package_unit: 'bottle', order_mode: 'pack', unit_price: 43 } }]);
    expect(p.skipped).toEqual([]);
  });
  test('새 공급업체 답은 표기가 흔들려도 찾는다(hero  MARKET → Hero Market)', () => {
    const p = buildApplyPlan(review, { companies: { 'hero  MARKET': { entity_type: 'brand', entity_id: 1 } } });
    expect(p.companies.map((c) => c.name)).toEqual(['Hero Market']);
  });
  // 2026-09-11 운영 2차 반영 결함 · Fable 판정 — 답(answers)으로 들어온 update 도 **답의 규격으로** 연결 환산·원가를 다시 계산한다.
  //   실제 사고: 호떡 «65 g/piece» 로 고쳤는데 연결 환산이 1 로 남아 1개 입고가 재고 +1 g 이 됐다.
  //   고장주입: buildApplyPlan 답 경로의 `newLinks` push 를 지우면 첫 기대가, 3배 검사(bigCost)를 지우면 둘째 기대가 실패해야 한다.
  test('답 경로 update — 답 규격으로 연결 환산 제안 · 원가 3배면 답이라도 안 쓴다', () => {
    const reviewDoc = {
      items: [{ row: 1, action: 'check', supplier: 'New Seoul Mart', company_id: 28, checks: ['짝 후보 2개 이상'] }],
      links_by_product: { 194: [{ id: 212, unit_conversion: '1.0000', target_unit: 'g', target_name: 'Hotteok', target_base: '1.00', target_cost: '2.4000' }] }
    };
    const fields = { name: 'Hotteok HOIHOI', unit: 'g', base_quantity: 65, package_unit: 'piece', order_mode: 'pack', unit_price: 2.4 };
    // 원가가 2.4 → 0.0369(1 g 당)로 3배 이상 움직이므로 답이라도 건너뛴다
    const blocked = buildApplyPlan(reviewDoc, { rows: { 1: { action: 'update', match_id: 194, fields } } });
    expect(blocked.updates).toEqual([]);
    expect(blocked.links).toEqual([]);
    expect(blocked.skipped[0].reason).toMatch(/원가 3배 이상 변동/);
    // 사람이 확인해 넘기면 상품과 **연결 환산 1 → 65** 가 함께 계획에 들어간다
    const ok = buildApplyPlan(reviewDoc, { rows: { 1: { action: 'update', match_id: 194, fields, accept_cost_change: true } } });
    expect(ok.updates.map((u) => u.product_id)).toEqual([194]);
    expect(ok.links).toEqual([{ row: 1, link_id: 212, product_id: 194, from: 1, to: 65 }]);
  });
  test('같은 상품 두 번 쓰는 계획은 표시된다', () => {
    const p = buildApplyPlan(review, { rows: { 2: { action: 'update', match_id: 11, fields: { name: 'X' } } } });
    expect(p.duplicate_products).toEqual([11]);
  });
});

// Fable 게이트 보정 1 — 가격이 2배 이상/절반 이하로 바뀌면 사람 확인
test('가격 배수 안전장치 — 7.80 → 78 은 check, 3.00 → 3.2 는 통과', () => {
  const cat = {
    companies: [{ id: 35, name: 'UGS', status: 'active' }, { id: 21, name: 'KK Mart', status: 'active' }],
    products: [
      { id: 1, supplier_company_id: 35, name: 'CILI SERVIETTE NAPKIN', invoice_name: null, unit: 'piece', base_quantity: '1.00', package_unit: 'pack', order_mode: 'pack', unit_price: '7.80', deleted_at: null },
      { id: 2, supplier_company_id: 21, name: 'Sweetened Milk', invoice_name: null, unit: 'g', base_quantity: '1.00', package_unit: null, order_mode: 'pack', unit_price: '3.00', deleted_at: null },
      { id: 3, supplier_company_id: 21, name: 'Battery', invoice_name: null, unit: 'piece', base_quantity: '1.00', package_unit: null, order_mode: 'pack', unit_price: '9.90', deleted_at: null }
    ],
    links: []
  };
  const items = buildReview(splitListText([
    '휴지    CILI SERVIETTE NAPKIN        UGS            1ctn    78.0',
    '연유    Sweetened Milk        KK Mart            500g/can    3.2',
    '배터리    Battery        KK Mart            1pkt(4pcs)    4.9'
  ].join('\n')), cat);
  expect(items[0].action).toBe('check');
  expect(items[0].checks.join()).toMatch(/가격 2배 이상 변동: 7.8 → 78/);
  expect(items[1].action).toBe('update');
  expect(items[2].action).toBe('check'); // 9.90 → 4.9 (절반 이하)
});

// 2026-09-11 운영 원가 사고 · Fable 판정 ④-d — 가격이 그대로여도 규격이 바뀌어 연결 재료 원가가 3배 이상 움직이면 사람 확인.
//   고장주입: buildReview 원가 미리보기의 checks.push 를 지우면 첫 행이 update 로 통과해 실패해야 한다.
test('원가 미리보기 — 1kg → 10kg 규격 변경(가격 같음)은 원가 1/10 이라 check · 소폭 인상은 통과하고 미리보기만 남는다', () => {
  const cat = {
    companies: [{ id: 21, name: 'KK Mart', status: 'active' }],
    products: [
      { id: 7, supplier_company_id: 21, name: 'MSG', invoice_name: null, unit: 'kg', base_quantity: '1.00', package_unit: 'pack', order_mode: 'pack', unit_price: '18.80', deleted_at: null },
      { id: 8, supplier_company_id: 21, name: 'Radish', invoice_name: null, unit: 'kg', base_quantity: '1.00', package_unit: null, order_mode: 'measure', unit_price: '4.80', deleted_at: null }
    ],
    links: [
      { id: 901, seller_type: 'supplier', seller_product_id: 7, unit_conversion: '1000.0000', is_active: 1, target_unit: 'g', target_name: 'MSG', target_base: '1000.00', target_cost: '18.8000' },
      { id: 902, seller_type: 'supplier', seller_product_id: 8, unit_conversion: '1000.0000', is_active: 1, target_unit: 'g', target_name: 'Radish(무)', target_base: '1000.00', target_cost: '4.8000' }
    ]
  };
  const items = buildReview(splitListText([
    'MSG    MSG        KK Mart            10kg/pkt    18.8',
    '무    Radish        KK Mart            1kg/pkt    5.2'
  ].join('\n')), cat);
  expect(items[0].action).toBe('check');
  expect(items[0].checks.join()).toMatch(/원가 3배 이상 변동: MSG 18.8 → 1.88/);
  expect(items[1].action).toBe('update');
  expect(items[1].cost_preview).toEqual([{ link_id: 902, target: 'Radish(무)', from: 4.8, to: 5.2, ratio: 1.08 }]);
});

// Fable 게이트 보정 2 — 지난 발주 줄. 고장주입: poLineWritableFields 가 늘 unit_conversion 을 허용하게 바꾸면
//   «received 줄은 환산값을 못 쓴다» 두 테스트가 실패해야 한다.
describe('지난 발주 줄 — 받은 줄은 라벨·규격만, 안 받은 줄은 환산값까지', () => {
  test('쓸 수 있는 칸', () => {
    expect(poLineWritableFields('received', 30)).toEqual(['unit', 'base_quantity', 'base_unit']);
    expect(poLineWritableFields('received', 0)).toEqual(['unit', 'base_quantity', 'base_unit']);
    expect(poLineWritableFields('draft', 0)).toEqual(['unit', 'base_quantity', 'base_unit', 'unit_conversion']);
    expect(poLineWritableFields('submitted', null)).toEqual(['unit', 'base_quantity', 'base_unit', 'unit_conversion']);
    expect(poLineWritableFields('draft', 2)).toEqual(['unit', 'base_quantity', 'base_unit']); // 받은 수량이 있으면 환산 무접촉
    expect(poLineWritableFields('cancelled', 0)).toEqual([]);
  });
  test('received 줄에 환산값 쓰기 시도 → 거부', () => {
    expect(() => assertPoLineWrite('received', 3, { unit: 'box', unit_conversion: 10000 })).toThrow(/쓰기 거부.*unit_conversion/);
    expect(() => assertPoLineWrite('cancelled', 0, { unit: 'box' })).toThrow(/쓰기 거부/);
    expect(() => assertPoLineWrite('draft', 0, { unit: 'box', base_quantity: 10, base_unit: 'kg', unit_conversion: 10000 })).not.toThrow();
  });
  test('계획 — 받은 줄은 환산값이 달라도 라벨·규격만 · 안 받은 줄은 환산값까지 · 취소·변화 없음은 빠진다', () => {
    const productById = new Map([
      [179, { unit: 'kg', base_quantity: '10.00', package_unit: 'carton', order_mode: 'pack' }],
      [176, { unit: 'kg', base_quantity: '1.00', package_unit: null, order_mode: 'measure' }]
    ]);
    const base = { seller_product_id: 179, link_unit_conversion: '10000.0000', stock_unit: 'g', stock_package_unit: 'pack', base_quantity: null, base_unit: null, unit_conversion: '1.0000' };
    const plan = buildPoLinePlan([
      { ...base, id: 1, purchase_order_id: 33, po_number: 'PO-A', po_status: 'received', quantity_received: '2.00', unit: 'piece' },
      { ...base, id: 2, purchase_order_id: 37, po_number: 'PO-B', po_status: 'draft', quantity_received: '0.00', unit: 'piece' },
      { ...base, id: 3, purchase_order_id: 40, po_number: 'PO-C', po_status: 'cancelled', quantity_received: '0.00', unit: 'piece' },
      { id: 4, purchase_order_id: 33, po_number: 'PO-A', po_status: 'received', quantity_received: '1', unit: 'kg', base_quantity: null, base_unit: null,
        unit_conversion: '1000.0000', seller_product_id: 176, link_unit_conversion: '1000.0000', stock_unit: 'g', stock_package_unit: 'g' }
    ], productById);
    expect(plan.map((p) => p.line_id)).toEqual([1, 2]);
    expect(plan[0].diff).toEqual({ unit: { from: 'piece', to: 'carton' }, base_quantity: { from: null, to: 10 }, base_unit: { from: null, to: 'kg' } });
    expect(plan[1].diff.unit_conversion).toEqual({ from: '1.0000', to: 10000 });
  });
});

test('convertAmount — 같은 차원만', () => {
  expect(convertAmount(10, 'kg', 'g')).toBe(10000);
  expect(convertAmount(1.5, 'L', 'ml')).toBe(1500);
  expect(convertAmount(1, 'kg', 'piece')).toBeNull();
});
