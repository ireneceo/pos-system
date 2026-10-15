/**
 * 발주 줄 «고른 옵션» 규칙 — utils/poLineOptions.js (2026-10-15 Fable 설계 D3·D4)
 * 고장주입: resolveLineOptions 의 그룹 검사(OPTION_TOO_MANY / OPTION_REQUIRED / OPTION_INVALID)나
 *   optionsAdjustment 합을 빼면 해당 테스트가 실패해야 한다.
 */
const mockQuery = jest.fn();
jest.mock('../config/database', () => ({ sequelize: { query: (...a) => mockQuery(...a) } }));

const {
  parseOptionIds, resolveLineOptions, optionsAdjustment, optionsKey,
  descriptionWithOptions, carriedOptionsFor, LineOptionError
} = require('../utils/poLineOptions');

// 데모 공급업체 14 와 같은 모양 — Cut Style(필수, 1개) · Trim Style(선택, 최대 2개)
const GROUPS = [
  { id: 3, name: 'Cut Style', is_required: 1, min_selections: 1, max_selections: 1 },
  { id: 5, name: 'Trim Style', is_required: 0, min_selections: 0, max_selections: 2 },
];
const OPTS = [
  { id: 7, option_group_id: 3, name: 'Whole', price_adjustment: '0.00' },
  { id: 8, option_group_id: 3, name: 'Sliced', price_adjustment: '3.00' },
  { id: 9, option_group_id: 3, name: 'Cubed', price_adjustment: '5.00' },
  { id: 13, option_group_id: 5, name: 'Skinless', price_adjustment: '2.00' },
  { id: 14, option_group_id: 5, name: 'Boneless', price_adjustment: '5.00' },
];
const supplierMap = { seller_type: 'supplier', seller_product_id: 38 };

beforeEach(() => {
  mockQuery.mockReset();
  mockQuery.mockImplementation(async (sql) => (/supplier_product_option_groups/.test(sql) ? [GROUPS] : [OPTS]));
});

const codeOf = async (p) => { try { await p; return 'OK'; } catch (e) { return e instanceof LineOptionError ? e.code : `THROW ${e.message}`; } };

describe('resolveLineOptions — 조정액은 DB 값', () => {
  test('Sliced(+3) → 스냅샷 1개 · 조정 3', async () => {
    const r = await resolveLineOptions({ mapping: supplierMap, optionIds: [8] });
    expect(r.adjustment).toBe(3);
    expect(r.options).toEqual([{ group_id: 3, group_name: 'Cut Style', option_id: 8, option_name: 'Sliced', price_adjustment: 3 }]);
  });
  test('여러 그룹 합 — Cubed + Skinless + Boneless = 12', async () => {
    const r = await resolveLineOptions({ mapping: supplierMap, optionIds: ['9', 13, 14] });
    expect(r.adjustment).toBe(12);
    expect(r.options.map(o => o.option_id)).toEqual([9, 13, 14]);
  });
  test('옵션 안 고름 → 옵션 없음(지금 발주 길 그대로)', async () => {
    expect(await resolveLineOptions({ mapping: supplierMap, optionIds: [] })).toEqual({ options: null, adjustment: 0 });
    expect(await resolveLineOptions({ mapping: supplierMap, optionIds: undefined })).toEqual({ options: null, adjustment: 0 });
    expect(mockQuery).not.toHaveBeenCalled();
  });
  test('검증 네 갈래', async () => {
    expect(await codeOf(resolveLineOptions({ mapping: supplierMap, optionIds: [999] }))).toBe('OPTION_INVALID');
    expect(await codeOf(resolveLineOptions({ mapping: supplierMap, optionIds: [7, 8] }))).toBe('OPTION_TOO_MANY');
    expect(await codeOf(resolveLineOptions({ mapping: supplierMap, optionIds: [13] }))).toBe('OPTION_REQUIRED');
    expect(await codeOf(resolveLineOptions({ mapping: { seller_type: 'brand', seller_product_id: 5 }, optionIds: [8] }))).toBe('OPTIONS_NOT_SUPPORTED');
    expect(await codeOf(resolveLineOptions({ mapping: null, optionIds: [8] }))).toBe('OPTIONS_NOT_SUPPORTED');
    expect(await codeOf(resolveLineOptions({ mapping: supplierMap, optionIds: 'x' }))).toBe('OPTION_INVALID');
    expect(await codeOf(resolveLineOptions({ mapping: supplierMap, optionIds: [-1] }))).toBe('OPTION_INVALID');
  });
});

describe('스냅샷 도우미', () => {
  const snap = [
    { group_name: 'Cut Style', option_id: 8, option_name: 'Sliced', price_adjustment: 3 },
    { group_name: 'Trim Style', option_id: 14, option_name: 'Boneless', price_adjustment: 5 },
    { group_name: 'Trim Style', option_id: 13, option_name: 'Skinless', price_adjustment: 2 },
  ];
  test('조정 합 · 글자 JSON 도 같은 값', () => {
    expect(optionsAdjustment(snap)).toBe(10);
    expect(optionsAdjustment(JSON.stringify(snap))).toBe(10);
    expect(optionsAdjustment(null)).toBe(0);
  });
  test('키는 정렬된 번호 — 순서가 달라도 같은 줄', () => {
    expect(optionsKey(snap)).toBe('8,13,14');
    expect(optionsKey([...snap].reverse())).toBe('8,13,14');
    expect(optionsKey(null)).toBe('');
  });
  test('설명 «Beef Rib (Cut Style: Sliced, Trim Style: Boneless, Skinless)»', () => {
    expect(descriptionWithOptions('Beef Rib', snap)).toBe('Beef Rib (Cut Style: Sliced, Trim Style: Boneless, Skinless)');
    expect(descriptionWithOptions('Beef Rib', null)).toBe('Beef Rib');
    expect(descriptionWithOptions('x'.repeat(300), snap).length).toBe(255);
  });
  test('판매자 수정 — 원래 줄의 옵션이 따라간다', () => {
    const before = [
      { id: 1, ingredient_seller_product_id: 50, options: [snap[0]] },
      { id: 2, ingredient_seller_product_id: 50, options: null },
      { id: 3, ingredient_seller_product_id: 60, options: [snap[1]] },
    ];
    expect(carriedOptionsFor({ item_id: 1 }, 50, before)).toEqual([snap[0]]);
    expect(carriedOptionsFor({ item_id: 2 }, 50, before)).toBeNull();
    expect(carriedOptionsFor({ item_id: 1 }, 60, before)).toBeNull();      // 다른 연결로 바꾼 줄은 옵션 없음
    expect(carriedOptionsFor({}, 60, before)).toEqual([snap[1]]);           // 옛 화면 — 같은 연결이 하나뿐
    expect(carriedOptionsFor({}, 50, before)).toBeNull();                   // 옛 화면 — 옵션이 갈리면 모름
    expect(carriedOptionsFor({}, 70, before)).toBeNull();                   // 새 줄
  });
  test('parseOptionIds 중복 제거', () => {
    expect(parseOptionIds([8, '8', 13])).toEqual([8, 13]);
  });
});
