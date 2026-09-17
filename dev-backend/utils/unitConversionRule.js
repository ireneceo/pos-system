/**
 * 판매자 링크 환산비(unit_conversion) 판정 — **단일 규칙** (2026-09-17 Fable 판정 ③)
 *
 * 왜 한 파일인가
 *   인스펙션(R-SC-007)이 «잘못됐다»고 잡는 규칙과, 고치는 스크립트가 «이 값이 맞다»고 쓰는 규칙이
 *   다르면 서로를 못 믿는다. 규칙은 여기 하나뿐이고 둘 다 이 함수를 부른다.
 *
 * 환산비의 뜻: **판매자 1 주문단위를 받으면 내 재고가 몇 단위 늘어나는가.**
 *   `purchaseOrderReceive.js` 가 `수량 × conv` 로 재고를 넣고, 매장 입고원가는 `단가 ÷ conv` 로 잡는다.
 *   ⚠ 원가식(`costSync.convertPrice`)은 conv 가 아니라 `base_quantity` 로 계산한다 — 그래서 둘이
 *     어긋난 행은 «원가는 1팩=50개로 계산하는데 입고는 1개»가 된다. 이 규칙은 입고를 원가식에 맞춘다.
 *
 * 세 갈래
 *   N 정상  — 손대지 않는다 (pack 주문 + 내 재고가 개수 단위)
 *   D 기계  — 데이터만으로 값이 정해진다 (같은 차원 연속단위 · 포장 수량이 내 다섯 칸에 적혀 있음)
 *   H 사람  — 질량↔부피, 개수↔질량, 포장 낱말이 다른 개수 단위. **추측값을 쓰지 않는다.**
 */

// 개수 동의어 — 순수 개수 단위만. 여기 없는 쌍은 «다른 단위»로 본다(퍼지 매칭 금지).
const COUNT_UNIT_SYNONYMS = ['piece', 'pcs', 'pc', 'ea', 'unit'];
// 차원을 반드시 구분한다 — kg 와 L 은 둘 다 계수 1000 이라 한 표에 담으면 질량↔부피가 조용히 통과한다.
const DIM = { g: 'mass', kg: 'mass', ml: 'vol', l: 'vol' };
const UNIT_FACTOR = { g: 1, kg: 1000, ml: 1, l: 1000 };

const norm = (u) => String(u || '').trim().toLowerCase();
const isCount = (u) => COUNT_UNIT_SYNONYMS.includes(norm(u));
const isContinuous = (u) => !!DIM[norm(u)];
const dim = (u) => DIM[norm(u)];
const sameDim = (a, b) => !!dim(a) && dim(a) === dim(b);
const factor = (u) => UNIT_FACTOR[norm(u)];
/**
 * 「확인한 단위쌍」 표기 — 확인 기록이 어떤 단위 조합에 대한 것이었는지 한 줄로 남긴다.
 * 판매자 단위나 재고 단위가 나중에 바뀌면 이 문자열이 달라지고, 그때 그 확인은 무효가 된다.
 * 저장(라우트)과 판정(여기)이 **같은 함수**를 써야 한다 — 양쪽이 다르게 만들면 확인이 영영 안 맞는다.
 */
const conversionPair = (sellerUnit, stockUnit) => `${norm(sellerUnit)}>${norm(stockUnit)}`;

/** 두 단위가 «같은 뜻»인가 — 문자열이 같거나, 둘 다 개수 동의어 */
const sameUnit = (a, b) => norm(a) === norm(b) || (isCount(a) && isCount(b));

/**
 * @param {object} row
 *   stock_unit      내 재고 단위
 *   stock_base      내 base_quantity (기준양)
 *   stock_package_unit     내 package_unit (포장 단위)
 *   stock_package_quantity 내 package_quantity
 *   seller_unit     판매자 단위(내용물 단위)
 *   seller_base     판매자 base_quantity
 *   order_mode      'pack' | 'measure'  (브랜드 상품은 항상 pack)
 *   conv            현재 unit_conversion
 * @returns {{kind:'N'|'D'|'H', want:number|null, rule:string, why:string}}
 */
function classifyConversion(row) {
  const conv = Number(row.conv);
  // 사람이 화면에서 저장했는가 — 저장 = 확인이다. 값이 1 이어도(«개»와 «팩»이 같은 물건인 경우)
  //   확인으로 인정한다. 단, 확인은 **그때의 단위쌍에 묶인다** — 나중에 판매자 단위가 바뀌면
  //   저장된 쌍과 지금 쌍이 달라지고, 그 확인은 무효가 되어 다시 물어본다.
  const confirmed = !!row.confirmed_at
    && String(row.confirmed_pair || '') === conversionPair(row.seller_unit, row.stock_unit);
  // 확인 기록이 없더라도 1 이 아닌 값은 누군가 손으로 넣은 것으로 본다(확인 칸이 생기기 전의 데이터).
  //   H(사람 몫)로 분류되는 쌍이라도 값이 들어 있으면 **다시 알리지 않는다**(영원한 경고 금지).
  const humanSet = confirmed || (Number.isFinite(conv) && conv !== 1);
  const asHuman = (rule, why) => humanSet
    ? { kind: 'N', want: null, rule: 'human-set', why: `사람이 넣은 값(${conv}) — ${why}`, humanSet: true }
    : { kind: 'H', want: null, rule, why, humanSet: false };
  /**
   * 계산으로 값이 나왔을 때의 처리.
   *   conv 가 1(아직 안 정함) → **D**(기계가 넣는다)
   *   conv 가 계산값과 같음   → N
   *   conv 가 1도 아니고 계산값과도 다름 → **H**. 사람이 이미 다른 값을 넣었다는 뜻이고,
   *     판매자 기준양이 실제 포장과 다를 수 있다(운영 실측: Fine Salt 가 1kg 로 적혀 있는데 사람은 450 을 넣어 뒀다).
   *     ⛔ 이런 행을 기계가 덮어쓰면 **사람이 맞춰 둔 입고량을 망가뜨린다.**
   */
  const derived = (rawWant, rule, why) => {
    // 컬럼이 DECIMAL(10,4) 다 — 저장되는 값과 같은 자리로 먼저 맞춘다. 안 그러면 2000/3 같은 값에서
    //   저장값(666.6667)과 계산값이 미세하게 달라 **맞는 행이 «충돌»로 빠진다**(2026-09-17 게이트 지적).
    const want = Math.round(Number(rawWant) * 10000) / 10000;
    if (!(want > 0) || want >= 100000) {
      return asHuman(rule + '-out-of-range', `계산값 ${want} 가 허용 범위를 벗어난다`);
    }
    if (Math.abs(conv - want) < 1e-6) return { kind: 'N', want, rule, why: '이미 맞음' };
    if (conv === 1) return { kind: 'D', want, rule, why };
    return { kind: 'H', want, rule: rule + '-conflict', humanSet: true,
      why: `데이터로는 ${want} 인데 지금 값은 ${conv} — 어느 쪽이 맞는지 사람이 정해야 한다` };
  };
  // 사람이 이 쌍을 확인했으면 끝이다 — 데이터로 계산한 값보다 **화면에서 저장한 값이 우선**한다.
  //   (운영 실측 예: 고운소금은 데이터상 1000 이지만 사람이 450 을 맞춰 두었다.)
  if (confirmed) {
    return { kind: 'N', want: null, rule: 'human-confirmed', humanSet: true,
      why: `사람이 확인한 값(${conv}) — ${row.confirmed_at}` };
  }

  const stockCont = isContinuous(row.stock_unit);
  const mode = row.order_mode === 'measure' ? 'measure' : 'pack';

  // 단위가 같은 뜻이면 볼 것이 없다.
  if (sameUnit(row.stock_unit, row.seller_unit)) {
    return { kind: 'N', want: null, rule: 'same-unit', why: '판매자 단위와 재고 단위가 같은 뜻' };
  }

  if (mode === 'measure') {
    if (!stockCont) {
      return asHuman('measure-count-stock',
        '무게·부피로 주문하는데 재고는 개수 단위 — 1kg 주문이 재고 1개로 들어간다');
    }
    if (!sameDim(row.seller_unit, row.stock_unit)) {
      return asHuman('cross-dimension',
        `${row.seller_unit} ↔ ${row.stock_unit} 는 질량↔부피라 밀도를 알아야 한다`);
    }
    const want = factor(row.seller_unit) / factor(row.stock_unit);
    return derived(want, 'measure-same-dim', `단위상 ${want} 여야 한다`);
  }

  // pack 주문
  if (!stockCont) {
    // D2 — 판매자가 파는 단위가 내 «포장 단위»와 같고, 내 기준양이 여러 개짜리면
    //   1팩 = base_quantity ÷ package_quantity 개. (예: 소스통 1 pack → 내것 50 piece = 50)
    const base = Number(row.stock_base);
    const pkgQty = Number(row.stock_package_quantity) || 1;
    const sellerBase = Number(row.seller_base);
    if (row.stock_package_unit && sameUnit(row.seller_unit, row.stock_package_unit)
        && base > 1 && (!Number.isFinite(sellerBase) || sellerBase === 1)) {
      const want = base / pkgQty;
      return derived(want, 'pack-count-package',
        `내 기준양이 ${base}${row.stock_unit}/${row.stock_package_unit} 이므로 1${row.stock_package_unit} = ${want}${row.stock_unit}`);
    }
    // 그 밖의 개수↔개수(can↔piece, pack↔piece 등) — «1캔이 24개인지» 는 데이터가 아니라 사람이 안다.
    return asHuman('count-count-different-word',
      `${row.seller_unit} 와 ${row.stock_unit} 가 몇 대 몇인지는 사람이 정해야 한다`);
  }

  // pack + 내 재고가 연속단위
  if (isContinuous(row.seller_unit)) {
    if (!sameDim(row.seller_unit, row.stock_unit)) {
      return asHuman('cross-dimension',
        `${row.seller_unit} ↔ ${row.stock_unit} 는 질량↔부피라 밀도를 알아야 한다`);
    }
    const sellerBase = Number(row.seller_base) || 1;
    const want = sellerBase * factor(row.seller_unit) / factor(row.stock_unit);
    return derived(want, 'pack-measure', `1팩 = ${sellerBase}${row.seller_unit} 이므로 ${want}`);
  }

  // pack + 판매 단위가 개수 + 내 재고가 무게·부피 — 1팩이 몇 g인지 사람이 넣어야 한다
  return asHuman('pack-count-to-measure',
    '재고는 무게·부피인데 판매 단위가 개수 — 1팩이 몇 g인지 사람이 넣어야 한다');
}

module.exports = {
  classifyConversion,
  conversionPair,
  COUNT_UNIT_SYNONYMS,
  isCount, isContinuous, sameDim, factor, sameUnit
};
