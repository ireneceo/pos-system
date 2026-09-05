/**
 * specFromName — 운영 실측 이름(2026-09-05)으로 케이스를 박는다.
 * 단위 주의: 기대값은 전부 **정규화 후**(kg→g, L→ml).
 */
const { specFromName } = require('../utils/specFromName');

describe('읽어야 하는 것 (운영 실제 이름)', () => {
  const ok = [
    ['Mozzarella Cheese 2kg (Emborg모짜렐라치즈)', 2000, 'g'],
    ['Corn Syrup (물엿 청정원18kg)', 18000, 'g'],
    ['Roasted Sesame Seed (볶은참깨오뚜기(팩)500g)', 500, 'g'],
    ['Soju Pet bottle (소주 참이슬 패트병 1.8L)', 1800, 'ml'],
    ['Fire oil (화유 500ml-Sias)', 500, 'ml'],
    ['Kimbob Yellow Pickled Radish (김밥 단무지2.8kg)', 2800, 'g'],
    ['Glass Noodle(150g)_Prepared', 150, 'g'],
    ['Lees Chicken Frank 32ea (프랑크소시지(닭))', 32, 'piece'],
    ['Ground White Pepper (O\'Chef) (오쉐프순후추450g)', 450, 'g'],
    ['Gas Cylinder (14kg) (가스통)', 14000, 'g'],
    ['BT PAPER LUNCH BOX KRAFT (M) (50PCS/PKT)', 50, 'piece'],
    ['Beef Stock (소고기다시다 2kg)', 2000, 'g'],
    // 용기라도 **개수**가 적힌 것은 진짜 팩당 수량이다 (부피가 아니다)
    ['BL-140 INNER BOWL TRAY WITH LID (100PCS/PKT)', 100, 'piece'],
  ];
  test.each(ok)('%s → %s %s', (name, q, u) => {
    expect(specFromName(name)).toMatchObject({ quantity: q, unit: u });
  });
});

describe('거부해야 하는 것 (사람이 정한다)', () => {
  const no = [
    ['범위',        'Chicken Chop L(260~280g) (닭다리살)'],
    ['둘 중 하나',  'Cockle Meat(Blood Clam) 300 / 500 Pcs (조갯살)'],
    ['컵 용량',     '9OZ / 270ML Double Wall Paper Cup Kraft (갈색 종이컵)'],
    ['천단위 쉼표', '120Z I 95mm x 107mm I Transparent x20pkts; 1,000pcs'],
    ['용량+포장',   'Mineral water Spritzer (미네럴워터 550ml 1박스)'],
    ['같은 값 두 번', 'Curry Powder Mild 1kg (오뚜기 카레 순한맛 1kg)'],
    ['규격 없음',   'Yellow Onion(양파)'],
    ['박스만',      'Jin Ramen(Mild) (진라면마일드1박스)'],
    ['용기 용량 (슬래시 없음)', '(SC-450) 450ML Round Container (국물판매용 원형 소)'],
    ['용기 용량 대',            '(SC-800) 800ML Round Container (국물판매용 원형 대)'],
    ['빈 값',       ''],
  ];
  test.each(no)('%s: %s → null', (_label, name) => {
    expect(specFromName(name)).toBeNull();
  });
  test('null/undefined 도 견딘다', () => {
    expect(specFromName(null)).toBeNull();
    expect(specFromName(undefined)).toBeNull();
  });
});
