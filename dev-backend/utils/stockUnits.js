/**
 * 재고 행(ingredients · product_ingredients) 단위 어휘 — 단일 소스 (2026-10-15 Fable 설계 D3)
 *   설계: /var/www/.claude/fable-design-20261015-supplier-catalog.md · docs/TRADE_STRUCTURE.md §2-2
 *
 * - STOCK_UNIT_ENUM          취급단위(unit) — 레시피·재고·차감 단위. 이번에 늘리지 않는다(레시피 줄 ENUM 과 짝).
 * - STOCK_PACKAGE_UNIT_ENUM  기준단위(package_unit) — 판매 상품 폼 제안 목록과 **같은 어휘**.
 *     ⛔ 화면 `dev-frontend/src/utils/unitConversion.ts PACKAGE_UNIT_SUGGESTIONS` 와 맞춰 둔다(그 목록 ⊆ 이 목록).
 *     DB 칸은 expand-only — `scripts/migrate-stock-package-unit-enum-expand.js` 가 이 목록을 보장하고
 *     health-check 가 information_schema 로 확인한다.
 * 모델이 require 하는 상수 파일이다 — 여기서 모델·DB 를 require 하지 말 것(순환).
 */
const STOCK_UNIT_ENUM = ['kg', 'g', 'L', 'ml', 'piece', 'pack', 'can', 'bottle'];

const STOCK_PACKAGE_UNIT_ENUM = [
  ...STOCK_UNIT_ENUM,
  'box', 'bag', 'tin', 'tub', 'drum', 'tray', 'carton', 'roll', 'bundle', 'sheet', 'sack', 'jar', 'ea'
];

/**
 * 판매 상품의 자유 글자 포장단위 → 재고 ENUM 값. 모르면 null(빈 칸 — 배포 수렴 마이그가 «취급단위와 같다» 로 채운다).
 * ①대소문자 무시 ENUM 일치(`BOX`→box · `ea`→ea) ②판매 상품 어휘표 `catalogSpecParser.PACKAGE_WORDS`(pkt→pack · ctn→carton)
 */
function normalizeStockPackageUnit(v) {
  if (v === undefined || v === null) return null;
  const s = String(v).trim();
  if (!s) return null;
  const lower = s.toLowerCase();
  const hit = STOCK_PACKAGE_UNIT_ENUM.find((u) => u.toLowerCase() === lower);
  if (hit) return hit;
  // 지연 require — catalogSpecParser 가 costSync 를 끌어와서, 모델 로딩 시점에 부르지 않게
  const { PACKAGE_WORDS } = require('./catalogSpecParser');
  const w = PACKAGE_WORDS[lower];
  return w && STOCK_PACKAGE_UNIT_ENUM.includes(w) ? w : null;
}

module.exports = { STOCK_UNIT_ENUM, STOCK_PACKAGE_UNIT_ENUM, normalizeStockPackageUnit };
