/**
 * 공급업체에게 나가는 문서의 상품 이름 — 영문만 (2026-09-11 Irene 「fable 권고대로」)
 * 화면 dev-frontend/src/utils/poShare.ts 와 같은 답을 내야 한다(packSpec.test.ts 에 같은 사례).
 * 고장주입: supplierFacingName 이 입력을 그대로 돌려주게 바꾸면 앞의 세 건이 실패해야 한다.
 */
const { supplierFacingName } = require('../utils/sellerProductIdentity');

describe('supplierFacingName', () => {
  test('«English (한글)» → 영문만', () => {
    expect(supplierFacingName('Carrot (당근)')).toBe('Carrot');
  });
  test('괄호 안 괄호도 균형으로 뗀다', () => {
    expect(supplierFacingName('Green Chilli Padi(Cili Api Hijau) (청양고추(칠리파디))')).toBe('Green Chilli Padi(Cili Api Hijau)');
  });
  test('전각 괄호', () => {
    expect(supplierFacingName('Kimchi（포기김치 10kg）')).toBe('Kimchi');
  });
  test('영문 괄호는 남긴다', () => {
    expect(supplierFacingName('Chicken Chop L(260~280g)')).toBe('Chicken Chop L(260~280g)');
    expect(supplierFacingName('Soju (Peach Flavour)')).toBe('Soju (Peach Flavour)');
  });
  test('가운데 박힌 한글·한글뿐인 이름·빈 값은 그대로', () => {
    expect(supplierFacingName('Gochujang_해찬들태양초알찬')).toBe('Gochujang_해찬들태양초알찬');
    expect(supplierFacingName('(흑설탕시럽)')).toBe('(흑설탕시럽)');
    expect(supplierFacingName('')).toBe('');
    expect(supplierFacingName(null)).toBe('');
  });
});
