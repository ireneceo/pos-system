/**
 * 판매자 배송 지역 (2026-10-07 Fable 판정 `.claude/fable-verdict-20261007-seller-delivery-zones.md`)
 *
 * 지역 판정(주 정규화·우편번호)·저장 검증·발주 총액 반영을 잠근다.
 * 이 파일이 깨지면 «어느 매장이 어떤 배송비를 내는가»가 바뀐 것이다.
 */
jest.mock('../utils/sellerNames', () => ({
  resolveSellers: jest.fn(async () => new Map()),
  getSeller: jest.fn(),
}));
jest.mock('../models/Restaurant', () => ({ findByPk: jest.fn() }));

const sellerNames = require('../utils/sellerNames');
const Restaurant = require('../models/Restaurant');
const {
  MY_STATES, normalizeState, normalizeZonesForSave, resolveDeliveryZone, readZones,
} = require('../utils/deliveryZones');
const { computeTotalsWithDelivery } = require('../utils/purchaseOrderTotals');

const items = (...pairs) => pairs.map(([q, p]) => ({ quantity_ordered: q, unit_price: p }));

describe('주(州) 정규화', () => {
  test('정본 16개', () => {
    expect(MY_STATES).toHaveLength(16);
  });

  test.each(['WP Kuala Lumpur', 'W.P. Kuala Lumpur', 'Wilayah Persekutuan Kuala Lumpur', 'kuala lumpur', 'KL'])(
    '쿠알라룸푸르 별칭 «%s» → Kuala Lumpur', (raw) => {
      expect(normalizeState(raw)).toEqual({ state: 'Kuala Lumpur', matched_by: 'state' });
    });

  test('«WP» 단독은 모호 — 우편번호 50xxx 로 KL', () => {
    expect(normalizeState('WP', { postal_code: '50450' })).toEqual({ state: 'Kuala Lumpur', matched_by: 'postal_code' });
  });

  test('«Wilayah Persekutuan» 단독 + 우편번호 없음 → 모름', () => {
    expect(normalizeState('Wilayah Persekutuan')).toEqual({ state: null, matched_by: null });
  });

  test('주 칸이 비면 우편번호 47820 → Selangor', () => {
    expect(normalizeState('', { postal_code: '47820' })).toEqual({ state: 'Selangor', matched_by: 'postal_code' });
    expect(normalizeState(null, { postal_code: '62000' }).state).toBe('Putrajaya');
    expect(normalizeState(null, { postal_code: '69000' }).state).toBe('Pahang');
  });

  test('주 칸이 우편번호보다 먼저다', () => {
    expect(normalizeState('Selangor', { postal_code: '50450' }).state).toBe('Selangor');
  });

  test('Pulau Pinang · Malacca 별칭', () => {
    expect(normalizeState('Pulau Pinang').state).toBe('Penang');
    expect(normalizeState('Malacca').state).toBe('Melaka');
  });
});

describe('지역 저장 검증 (판매자 3종 공통)', () => {
  const ok = [{ name: 'Klang Valley', fee: 10, states: ['Selangor', 'kuala lumpur'] }, { name: 'South', fee: 25, states: ['Johor'] }];

  test('정상 저장 — 주는 정본 이름으로, id 부여', () => {
    const { zones, error } = normalizeZonesForSave(ok);
    expect(error).toBeNull();
    expect(zones[0].states).toEqual(['Selangor', 'Kuala Lumpur']);
    expect(zones[0].id).toMatch(/^zone-/);
    expect(zones[1].fee).toBe(25);
  });

  test('[]·null → null (지역 없음)', () => {
    expect(normalizeZonesForSave([]).zones).toBeNull();
    expect(normalizeZonesForSave(null).zones).toBeNull();
  });

  test('같은 주가 두 지역에 → ZONE_STATE_DUPLICATE', () => {
    const r = normalizeZonesForSave([...ok, { name: 'Dup', fee: 5, states: ['Selangor'] }]);
    expect(r.error.code).toBe('ZONE_STATE_DUPLICATE');
  });

  test('음수 배송비 거절', () => {
    expect(normalizeZonesForSave([{ name: 'A', fee: -1, states: ['Johor'] }]).error.code).toBe('ZONE_FEE_INVALID');
  });

  test('모르는 주 거절 · 빈 주 거절 · 이름 필수 · 배열 아님 거절', () => {
    expect(normalizeZonesForSave([{ name: 'A', fee: 1, states: ['Bangkok'] }]).error.code).toBe('ZONE_STATE_UNKNOWN');
    expect(normalizeZonesForSave([{ name: 'A', fee: 1, states: [] }]).error.code).toBe('ZONE_STATES_REQUIRED');
    expect(normalizeZonesForSave([{ name: ' ', fee: 1, states: ['Johor'] }]).error.code).toBe('ZONE_NAME_REQUIRED');
    expect(normalizeZonesForSave({ name: 'A' }).error.code).toBe('ZONES_NOT_ARRAY');
  });

  test('readZones — 문자열 JSON 도 읽는다', () => {
    expect(readZones(JSON.stringify(ok))).toHaveLength(2);
    expect(readZones('[]')).toBeNull();
    expect(readZones('not json')).toBeNull();
  });
});

describe('지역 판정 사유', () => {
  const zones = normalizeZonesForSave([{ name: 'Klang Valley', fee: 10, states: ['Selangor', 'Kuala Lumpur'] }]).zones;

  test('매칭', () => {
    const r = resolveDeliveryZone(zones, { state: 'Selangor' });
    expect(r.zone.name).toBe('Klang Valley');
    expect(r.zone.fee).toBe(10);
    expect(r.reason).toBeNull();
  });
  test('미매칭 = no_match', () => {
    expect(resolveDeliveryZone(zones, { state: 'Johor' }).reason).toBe('no_match');
  });
  test('지역 없음 = no_zones', () => {
    expect(resolveDeliveryZone(null, { state: 'Selangor' }).reason).toBe('no_zones');
  });
  test('구매자 주 모름 = buyer_location_unknown', () => {
    expect(resolveDeliveryZone(zones, { state: '', postal_code: '' }).reason).toBe('buyer_location_unknown');
  });
});

describe('발주 총액 — 지역 배송비 반영 (zone 10 · 기본 15 · 300 이상 무료)', () => {
  const zones = normalizeZonesForSave([{ name: 'Klang Valley', fee: 10, states: ['Selangor', 'Kuala Lumpur'] }]).zones;
  const seller = (over = {}) => ({ id: 1, delivery_fee: 15, min_order_amount: 300, currency: 'MYR', delivery_zones: zones, ...over });
  const po = { seller_type: 'brand', seller_entity_id: 1, entity_type: 'restaurant', entity_id: 38 };

  beforeEach(() => {
    sellerNames.getSeller.mockReset();
    Restaurant.findByPk.mockReset();
  });

  test('Selangor 매장 250 → 260 (지역 배송비)', async () => {
    sellerNames.getSeller.mockReturnValue(seller());
    Restaurant.findByPk.mockResolvedValue({ state: 'Selangor', postal_code: null, country: 'MY' });
    const t = await computeTotalsWithDelivery(items([1, 250]), po, { orderCurrency: 'MYR' });
    expect(t.delivery_fee).toBe(10);
    expect(t.total_amount).toBe(260);
    expect(t.delivery_fee_basis.zone.name).toBe('Klang Valley');
    expect(t.delivery_fee_basis.rule).toBe('below_threshold');
  });

  test('Selangor 매장 300 → 300 (무료 기준은 판매자당 하나)', async () => {
    sellerNames.getSeller.mockReturnValue(seller());
    Restaurant.findByPk.mockResolvedValue({ state: 'Selangor' });
    const t = await computeTotalsWithDelivery(items([1, 300]), po, { orderCurrency: 'MYR' });
    expect(t.total_amount).toBe(300);
  });

  test('주 없는 매장 250 → 265 (기본 배송비 · 사유 남김)', async () => {
    sellerNames.getSeller.mockReturnValue(seller());
    Restaurant.findByPk.mockResolvedValue({ state: null, postal_code: null, country: 'MY' });
    const t = await computeTotalsWithDelivery(items([1, 250]), po, { orderCurrency: 'MYR' });
    expect(t.total_amount).toBe(265);
    expect(t.delivery_fee_basis.zone_reason).toBe('buyer_location_unknown');
  });

  test('지역 있고 기본 배송비 미설정 · 미매칭 → 0 · rule unset · no_match', async () => {
    sellerNames.getSeller.mockReturnValue(seller({ delivery_fee: null }));
    Restaurant.findByPk.mockResolvedValue({ state: 'Johor' });
    const t = await computeTotalsWithDelivery(items([1, 250]), po, { orderCurrency: 'MYR' });
    expect(t.delivery_fee).toBe(0);
    expect(t.delivery_fee_basis.rule).toBe('unset');
    expect(t.delivery_fee_basis.zone_reason).toBe('no_match');
  });

  test('운영 회귀 0 — 지역 없는 판매자는 지금과 같다(구매자 조회도 안 함)', async () => {
    sellerNames.getSeller.mockReturnValue(seller({ delivery_zones: null }));
    const t = await computeTotalsWithDelivery(items([1, 250]), po, { orderCurrency: 'MYR' });
    expect(t.total_amount).toBe(265);
    expect(t.delivery_fee_basis.zone).toBeUndefined();
    expect(Restaurant.findByPk).not.toHaveBeenCalled();
  });

  test('구매자 조회 실패는 막지 않는다 — 기본 배송비 + buyer_lookup_failed', async () => {
    sellerNames.getSeller.mockReturnValue(seller());
    Restaurant.findByPk.mockRejectedValue(new Error('db down'));
    const t = await computeTotalsWithDelivery(items([1, 250]), po, { orderCurrency: 'MYR' });
    expect(t.total_amount).toBe(265);
    expect(t.delivery_fee_basis.zone_reason).toBe('buyer_lookup_failed');
  });

  test('opts.buyer 가 po 의 구매자보다 우선(발주 생성 경로)', async () => {
    sellerNames.getSeller.mockReturnValue(seller());
    Restaurant.findByPk.mockResolvedValue({ state: 'Kuala Lumpur' });
    const t = await computeTotalsWithDelivery(items([1, 100]), { seller_type: 'brand', seller_entity_id: 1 },
      { orderCurrency: 'MYR', buyer: { entity_type: 'restaurant', entity_id: 7 } });
    expect(Restaurant.findByPk).toHaveBeenCalledWith(7, expect.anything());
    expect(t.total_amount).toBe(110);
  });
});
