/**
 * 마진 계산 — 운영 실제 숫자로 고정한다.
 * 2026-09-20 두 건의 신고가 모두 «단위 섞임»이었다:
 *   김치  : 재고아이템 g·10000·RM 48   / 판매 1 kg  RM 7.50  → −540% 로 보였다
 *   Sawah : 재고아이템 g·10000·RM 34.5 / 판매 10 kg RM 43.00 → +124537% 로 보였다
 */
import { marginStateOf } from './productMargin';

const si = (unit: string, base_quantity: number, unit_cost: number) => ({ unit, base_quantity, unit_cost });

describe('marginStateOf — 판매 단위와 원가 단위가 다를 때', () => {
  test('김치 1kg: (48/10000)×1000 = RM 4.80 원가, 마진 RM 2.70 (36%)', () => {
    const ms: any = marginStateOf({
      product_ingredient_id: 142, stockItem: si('g', 10000, 48),
      unit: 'kg', base_quantity: 1, unit_price: 7.5,
    });
    expect(ms.kind).toBe('ok');
    expect(ms.cost).toBeCloseTo(4.8, 6);
    expect(ms.margin).toBeCloseTo(2.7, 6);
    expect(Math.round(ms.rate * 100)).toBe(36);
  });

  test('Sawah Mas 10kg: 원가 RM 34.50, 마진 RM 8.50 (20%)', () => {
    const ms: any = marginStateOf({
      product_ingredient_id: 70, stockItem: si('g', 10000, 34.5),
      unit: 'kg', base_quantity: 10, unit_price: 43,
    });
    expect(ms.kind).toBe('ok');
    expect(ms.cost).toBeCloseTo(34.5, 6);
    expect(ms.margin).toBeCloseTo(8.5, 6);
    expect(Math.round(ms.rate * 100)).toBe(20);
  });

  test('편집창 경로(재고아이템 1단위 값으로 넣어도 같은 답)', () => {
    const ms: any = marginStateOf({
      product_ingredient_id: 70, stockItem: si('g', 1, 34.5 / 10000),
      unit: 'kg', base_quantity: 10, unit_price: 43,
    });
    expect(ms.cost).toBeCloseTo(34.5, 6);
    expect(ms.margin).toBeCloseTo(8.5, 6);
  });

  test('환산 불가(kg ↔ piece)는 추측하지 않고 «환산 불가»', () => {
    const ms: any = marginStateOf({
      product_ingredient_id: 1, stockItem: si('piece', 1, 5),
      unit: 'kg', base_quantity: 1, unit_price: 10,
    });
    expect(ms.kind).toBe('noConvert');
  });

  test('연결 없음 / 원가 0 은 각각 제 상태로', () => {
    expect(marginStateOf({ unit: 'kg', base_quantity: 1, unit_price: 10 }).kind).toBe('noLink');
    expect(marginStateOf({ product_ingredient_id: 9, stockItem: si('g', 1000, 0), unit: 'kg', base_quantity: 1, unit_price: 10 }).kind).toBe('noCost');
  });
});
