/**
 * costSync 환산 규칙 — 원가는 공급업체 가격에서 나온다 (Irene 2026-09-05).
 * 단위 주의: 반환 `cost` 는 **그 행의 기준양(package_quantity) 기준 가격** = `unit_cost` 칸의 뜻.
 */
const { convertPrice } = require('../services/costSync');

describe('판매자 가격 → 내 기준양 가격', () => {
  test('같은 단위·같은 규격 — 그대로', () => {
    // 판매자 1 pack = RM 93, 내 취급 pack/1, 기준양 1 → 93
    expect(convertPrice({ sellerPrice: 93, sellerUnit: 'pack', sellerBase: 1,
      myUnit: 'pack', myBase: 1, myPackageQty: 1 })).toEqual({ cost: 93 });
  });

  test('판매자 kg → 내 g (치즈 형태)', () => {
    // 판매자 1 kg = RM 27.90, 내 취급 g/1000(1 pack = 1000 g), 기준양 1 → 27.90
    expect(convertPrice({ sellerPrice: 27.9, sellerUnit: 'kg', sellerBase: 1,
      myUnit: 'g', myBase: 1000, myPackageQty: 1 })).toEqual({ cost: 27.9 });
  });

  test('판매자가 500g 봉지 — 내가 1000 g 기준이면 두 배', () => {
    expect(convertPrice({ sellerPrice: 5, sellerUnit: 'g', sellerBase: 500,
      myUnit: 'g', myBase: 1000, myPackageQty: 1 })).toEqual({ cost: 10 });
  });

  test('판매자 5kg 포대 → 내 kg/5 (식용유 형태)', () => {
    expect(convertPrice({ sellerPrice: 30, sellerUnit: 'kg', sellerBase: 5,
      myUnit: 'kg', myBase: 5, myPackageQty: 1 })).toEqual({ cost: 30 });
  });

  test('기준양이 1 이 아니면 그만큼 곱한다 (6병 묶음)', () => {
    // 판매자 1 bottle(330 ml) = RM 2, 내 취급 ml/1980, 기준양 6 → ml 당 2/330, ×1980×6
    const r = convertPrice({ sellerPrice: 2, sellerUnit: 'ml', sellerBase: 330,
      myUnit: 'ml', myBase: 1980, myPackageQty: 6 });
    expect(r.cost).toBeCloseTo(72, 2);
  });

  test('L → ml 도 호환', () => {
    expect(convertPrice({ sellerPrice: 12, sellerUnit: 'L', sellerBase: 1,
      myUnit: 'ml', myBase: 1000, myPackageQty: 1 })).toEqual({ cost: 12 });
  });
});

describe('건드리면 안 되는 경우', () => {
  test('비호환 단위(piece ↔ g)는 계수를 모르니 건너뛴다', () => {
    const r = convertPrice({ sellerPrice: 10, sellerUnit: 'piece', sellerBase: 1,
      myUnit: 'g', myBase: 1000, myPackageQty: 1 });
    expect(r.cost).toBeUndefined();
    expect(r.skip).toMatch(/단위 비호환/);
  });

  test('판매자 가격이 0 이면 계산하지 않는다', () => {
    expect(convertPrice({ sellerPrice: 0, sellerUnit: 'kg', sellerBase: 1,
      myUnit: 'g', myBase: 1000, myPackageQty: 1 }).skip).toMatch(/가격이 0/);
  });

  test('빈 값·null 도 견딘다', () => {
    expect(convertPrice({ sellerPrice: null, sellerUnit: 'kg', sellerBase: null,
      myUnit: 'g', myBase: null, myPackageQty: null }).skip).toBeTruthy();
  });
});

describe('운영 실제 사례', () => {
  test('K-Yukgaejang Sauce — 프로덕트 34.90/kg → 거울 g/1000 = 34.90 (지금 30.00 에서 오른다)', () => {
    expect(convertPrice({ sellerPrice: 34.9, sellerUnit: 'kg', sellerBase: 1,
      myUnit: 'g', myBase: 1000, myPackageQty: 1 })).toEqual({ cost: 34.9 });
  });

  test('K-Bulgogi 1kg — 75.90/kg → 75.90 (지금 75.00)', () => {
    expect(convertPrice({ sellerPrice: 75.9, sellerUnit: 'kg', sellerBase: 1,
      myUnit: 'g', myBase: 1000, myPackageQty: 1 })).toEqual({ cost: 75.9 });
  });
});
