/**
 * 발주 줄 «용량 · 포장단위 × 수량» — 서버 단일 소스 (2026-09-11)
 *
 * Irene 원문: 「발주할 때 기본용량 포장단위가 있고 거기에 수량이 올라가는 거잖아. 수량에 포장단위가 붙는거고.」
 * Fable 판정: docs/TRADE_STRUCTURE.md §2-2 «단위 다섯 칸» 을 판매 상품과 발주 줄까지 연장한다.
 *
 *   판매 상품   unit = 취급단위(내용물, kg) · base_quantity = 취급 기준숫자(10) · package_unit = 기준단위(포장, BOX)
 *   발주 줄     unit = 포장단위(BOX)        · base_quantity / base_unit = 주문 시점 용량 스냅샷(10 / kg)
 *   표시        Kimchi · 10 kg/BOX · × 3 BOX @ 48.00
 *
 * ⚠ 라벨이다. 재고 환산은 연결의 unit_conversion, 금액은 quantity × unit_price 가 한다 — 여기 값을 계산에 쓰지 말 것.
 * 화면 쪽 같은 규칙: dev-frontend/src/utils/unitConversion.ts (sellerOrderUnitOf / lineSpecText).
 */

const lower = (s) => String(s || '').trim().toLowerCase();
const num = (v) => {
  if (v === null || v === undefined || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

/** 수량 표기 — 정수는 소수점 없이, 소수는 끝 0 제거 (프론트 formatQuantity 와 같은 모양). 반올림 금지. */
function fmtQty(n) {
  return Number(n).toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
}

/**
 * 판매 상품 한 행 → 발주 줄에 저장할 { unit, base_quantity, base_unit }.
 *
 * 포장단위 순서: 판매자 포장단위 → (용량이 1 이 아니면) 'pack' → 판매자 내용물 단위 → 구매자 재고행 단위.
 *   ⚠ 구매자 재고행 단위를 판매자 내용물 단위보다 앞에 두지 않는다. 재고행의 package_unit 에는 취급단위(g)가
 *     그대로 복사돼 있는 경우가 대부분이라(dev 실측), 앞에 두면 2026-09-07 에 고친 «1kg 소스 2개 = 2 g» 가 되살아난다.
 * 용량 스냅샷: 내용물 단위가 있고, «1 × 포장단위와 같은 단위» (예: 1 pack/pack, 1 kg/kg) 가 아닐 때만.
 * 무게로 주문(measure)은 kg 자체가 주문 단위라 용량이 없다.
 */
function sellerOrderLine(sp, stockRow) {
  const stockUnit = stockRow ? (stockRow.package_unit || stockRow.unit || null) : null;
  if (!sp) return { unit: stockUnit, base_quantity: null, base_unit: null };

  const content = sp.unit || sp.stock_unit || null;
  if (sp.order_mode === 'measure') {
    return { unit: content || stockUnit, base_quantity: null, base_unit: null };
  }
  const bq = num(sp.base_quantity);
  const pkg = sp.package_unit ? String(sp.package_unit).trim() : '';
  const unit = pkg
    || (sp.unit && bq !== null && bq > 0 && bq !== 1 ? 'pack' : '')
    || content
    || stockUnit;
  const hasSpec = !!sp.unit && bq !== null && bq > 0 && !(bq === 1 && lower(sp.unit) === lower(unit));
  return { unit: unit || null, base_quantity: hasSpec ? bq : null, base_unit: hasSpec ? sp.unit : null };
}

// 판매자 종류 → 판매 상품 표. 기준은 models/IngredientSellerProduct.js seller_product_id 주석.
// 🔴 2026-09-11 결함: supplier 매핑을 `models/Product`(매장 메뉴 표)에서 찾아, 번호가 겹치면 그 메뉴의
//   stock_unit 기본값 'piece' 가 발주 줄에 찍혔다(dev 공급업체 매핑 46건 중 23건 겹침).
const SELLER_PRODUCT_MODEL = {
  supplier: '../models/SupplierProduct',
  brand: '../models/BrandProduct',
  foodcourt: '../models/FoodcourtProduct'
};

/** 연결(매핑) + 구매자 재고행 → 발주 줄 단위 칸. 판매 상품을 못 찾으면 재고행 단위로 폴백. */
async function resolveOrderLine(mapping, stockRow, transaction) {
  const modelPath = mapping && mapping.seller_product_id ? SELLER_PRODUCT_MODEL[mapping.seller_type] : null;
  let sp = null;
  if (modelPath) {
    try {
      // 삭제된 판매 상품도 과거와 같은 단위를 내야 한다 — paranoid:false (utils/sellerProductIdentity 와 같다)
      sp = await require(modelPath).findByPk(mapping.seller_product_id, { transaction, paranoid: false });
    } catch (e) { sp = null; }
  }
  return sellerOrderLine(sp, stockRow);
}

/** 발주 줄 → «10 kg/BOX». 용량 스냅샷이 없는 줄(옛 줄·무게 주문)은 빈 문자열. */
function lineSpecText(line) {
  if (!line) return '';
  const bq = num(line.base_quantity);
  if (!line.base_unit || bq === null || !(bq > 0)) return '';
  return `${fmtQty(bq)} ${line.base_unit}${line.unit ? '/' + line.unit : ''}`;
}

/** 폼에서 온 포장단위 — 자유 입력(인보이스의 Btl·PKT·Tin 을 그대로 받는다). 빈 값은 null. */
function normalizePackageUnit(v) {
  if (v === undefined || v === null) return null;
  const { sanitizeString } = require('../middleware/validation');
  const s = sanitizeString(String(v)).trim().slice(0, 50);
  return s || null;
}

module.exports = { sellerOrderLine, resolveOrderLine, lineSpecText, normalizePackageUnit, SELLER_PRODUCT_MODEL };
