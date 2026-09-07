/**
 * scripts/survey-dirty-data.js — 오염값·중복 실측 (읽기 전용, SELECT 만).
 *
 * 왜 있나 (2026-09-07 Irene 지시 "뭐든 잘못된 건 우리가 수정하게 표시해주고, 중복은 삭제해줘"):
 *   고칠 것을 정하려면 **운영에 실제로 뭐가 얼마나 있는지**부터 세야 한다.
 *   이 파일은 세기만 한다 — UPDATE/DELETE 가 한 줄도 없다. 고치는 것은 별건이다.
 *
 * ⛔ 이 스크립트는 아무것도 바꾸지 않는다. 바꾸는 스크립트를 여기에 섞지 말 것.
 *
 * 사용 (운영):
 *   scp /var/www/dev-backend/scripts/survey-dirty-data.js irene@87.106.78.146:/tmp/
 *   ssh irene@87.106.78.146 "cd /var/www/production-backend && node /tmp/survey-dirty-data.js"
 * 사용 (개발):
 *   cd /var/www/dev-backend && node scripts/survey-dirty-data.js
 *
 * 옵션: --json <경로>   결과를 파일로도 저장
 */
const path = require('path');
// /tmp 에 두고 운영 백엔드 폴더에서 실행할 수 있게 **cwd 기준**으로 설정을 찾는다.
const { sequelize } = require(path.join(process.cwd(), 'config/database'));

const jsonIdx = process.argv.indexOf('--json');
const JSON_OUT = jsonIdx > -1 ? process.argv[jsonIdx + 1] : null;

const out = {};
const Q = (sql) => sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });

// 스키마가 조금 달라도 한 항목 실패로 전체가 죽지 않게 한다(운영/개발 드리프트 대비).
async function section(key, title, sql, hint) {
  let rows;
  try { rows = await Q(sql); }
  catch (e) { console.log(`\n### ${title}\n    ! 조회 실패: ${e.message.slice(0, 120)}`); out[key] = { error: e.message }; return; }
  out[key] = rows;
  console.log(`\n### ${title} — ${rows.length}건`);
  if (hint && rows.length) console.log(`    ↳ ${hint}`);
  rows.slice(0, 40).forEach(r => console.log('    ' + JSON.stringify(r)));
  if (rows.length > 40) console.log(`    … 외 ${rows.length - 40}건 (전체는 --json 파일에)`);
}

// 재료/재고아이템/상품이 "어느 매장·브랜드 것인가"를 사람이 읽을 수 있게 붙인다.
const TARGET_JOIN = `
  LEFT JOIN ingredients i          ON i.id  = isp.ingredient_id
  LEFT JOIN product_ingredients pi ON pi.id = isp.product_ingredient_id
  LEFT JOIN products p             ON p.id  = isp.product_id
  LEFT JOIN restaurants r          ON r.id  = COALESCE(i.restaurant_id, p.restaurant_id)`;
const TARGET_COLS = `
  COALESCE(i.name, pi.name, p.name) AS 대상이름,
  CASE WHEN isp.ingredient_id IS NOT NULL THEN CONCAT('재료 #', isp.ingredient_id)
       WHEN isp.product_ingredient_id IS NOT NULL THEN CONCAT('재고아이템 #', isp.product_ingredient_id)
       WHEN isp.product_id IS NOT NULL THEN CONCAT('상품 #', isp.product_id)
       ELSE CONCAT('브랜드상품 #', isp.brand_product_id) END AS 대상,
  r.name AS 매장`;

(async () => {
  console.log('=== 오염값·중복 실측 (읽기 전용) ===');
  console.log('DB:', sequelize.config.database, '@', sequelize.config.host);

  console.log('\n\n──────── A. 오염값 (숫자가 말이 안 되는 것) ────────');

  await section('A1', 'A1. 발주 환산값이 비정상 (1단위 = 10,000 이상, 또는 0 이하)', `
    SELECT isp.id AS 매핑id, isp.unit_conversion AS 환산값, isp.unit_price AS 단가, ${TARGET_COLS}
    FROM ingredient_seller_products isp ${TARGET_JOIN}
    WHERE isp.unit_conversion <= 0 OR isp.unit_conversion >= 10000
    ORDER BY isp.unit_conversion DESC`,
    '"1팩 = 250,000팩" 같은 값. 배포 마이그를 세운 그 값이다 — 화면에서 정정 대상.');

  await section('A2', 'A2. 발주 환산값이 의심 (100 이상 10,000 미만 — 진짜일 수도 있음)', `
    SELECT isp.id AS 매핑id, isp.unit_conversion AS 환산값, ${TARGET_COLS}
    FROM ingredient_seller_products isp ${TARGET_JOIN}
    WHERE isp.unit_conversion >= 100 AND isp.unit_conversion < 10000
    ORDER BY isp.unit_conversion DESC`,
    '1kg=1000g 처럼 정상일 수 있다. 사람 눈 확인 필요 — 자동 판정 금지.');

  await section('A3', 'A3. 최소주문수량이 비정상 (0 이하 또는 10,000 이상)', `
    SELECT isp.id AS 매핑id, isp.min_order_quantity AS 최소주문, ${TARGET_COLS}
    FROM ingredient_seller_products isp ${TARGET_JOIN}
    WHERE isp.min_order_quantity <= 0 OR isp.min_order_quantity >= 10000`);

  await section('A4', 'A4. 살아있는 매핑인데 단가가 0', `
    SELECT isp.id AS 매핑id, isp.seller_type AS 판매자유형, ${TARGET_COLS}
    FROM ingredient_seller_products isp ${TARGET_JOIN}
    WHERE isp.is_active = 1 AND (isp.unit_price IS NULL OR isp.unit_price = 0)`,
    '단가 0 이면 발주 금액이 0 으로 잡힌다.');

  await section('A5', 'A5. 매장 재료 기준양이 비정상 (0 이하·비어있음·100만 이상)', `
    SELECT i.id AS 재료id, r.name AS 매장, i.name AS 이름, i.unit AS 취급단위,
           i.base_quantity AS 기준양, i.package_unit AS 기준단위, i.package_quantity AS 포장양,
           i.unit_cost AS 원가, i.current_stock AS 재고, i.is_active AS 활성
    FROM ingredients i LEFT JOIN restaurants r ON r.id = i.restaurant_id
    WHERE i.base_quantity IS NULL OR i.base_quantity <= 0 OR i.base_quantity >= 1000000`,
    '기준양이 0 이면 취급단위당 원가 계산이 0 나누기가 된다.');

  await section('A6', 'A6. 재고아이템 기준양이 비정상', `
    SELECT pi.id AS 아이템id, pi.name AS 이름, pi.unit AS 취급단위, pi.base_quantity AS 기준양,
           pi.package_unit AS 기준단위, pi.package_quantity AS 포장양, pi.unit_cost AS 원가,
           pi.current_stock AS 재고, pi.owner_user_id AS 소유자
    FROM product_ingredients pi
    WHERE pi.base_quantity IS NULL OR pi.base_quantity <= 0 OR pi.base_quantity >= 1000000`);

  await section('A7', 'A7. 재고가 음수', `
    SELECT '매장재료' AS 종류, i.id, r.name AS 매장, i.name AS 이름, i.current_stock AS 재고
    FROM ingredients i LEFT JOIN restaurants r ON r.id = i.restaurant_id WHERE i.current_stock < 0
    UNION ALL
    SELECT '재고아이템', pi.id, CONCAT('소유자 ', pi.owner_user_id), pi.name, pi.current_stock
    FROM product_ingredients pi WHERE pi.current_stock < 0`,
    '음수 재고는 차감은 됐는데 입고가 안 잡힌 흔적이다.');

  await section('A8', 'A8. 살아있는데 원가가 0 (매장별 건수)', `
    SELECT i.restaurant_id AS 매장id, r.name AS 매장, COUNT(*) AS 건수
    FROM ingredients i LEFT JOIN restaurants r ON r.id = i.restaurant_id
    WHERE i.is_active = 1 AND (i.unit_cost IS NULL OR i.unit_cost = 0)
    GROUP BY i.restaurant_id, r.name ORDER BY 건수 DESC`);

  await section('A9', 'A9. 살아있는 상품인데 판매가가 0 (매장별 건수)', `
    SELECT p.restaurant_id AS 매장id, r.name AS 매장, COUNT(*) AS 건수
    FROM products p LEFT JOIN restaurants r ON r.id = p.restaurant_id
    WHERE p.is_active = 1 AND (p.price IS NULL OR p.price = 0)
    GROUP BY p.restaurant_id, r.name ORDER BY 건수 DESC`);

  console.log('\n\n──────── B. 중복 (같은 것이 두 줄 이상) ────────');

  await section('B1', 'B1. 같은 매장에 같은 이름 재료가 두 줄 이상', `
    SELECT i.restaurant_id AS 매장id, r.name AS 매장, i.brand_id AS 브랜드, LOWER(TRIM(i.name)) AS 이름, COUNT(*) AS 줄수,
           GROUP_CONCAT(CONCAT('#', i.id, ' ', i.unit, ' 재고', IFNULL(i.current_stock,0),
             IF(i.is_active, '', ' (비활성)')) ORDER BY i.id SEPARATOR ' | ') AS 각줄
    FROM ingredients i LEFT JOIN restaurants r ON r.id = i.restaurant_id
    GROUP BY i.restaurant_id, i.brand_id, LOWER(TRIM(i.name))
    HAVING COUNT(*) > 1 ORDER BY 줄수 DESC`,
    '⚠ 삭제 전 반드시 확인 — 레시피가 어느 줄을 쓰는지 갈려 있을 수 있다(2026-09-04 사고와 같은 자리).');

  await section('B2', 'B2. 같은 소유자에 같은 이름 재고아이템이 두 줄 이상', `
    SELECT pi.owner_user_id AS 소유자, LOWER(TRIM(pi.name)) AS 이름, COUNT(*) AS 줄수,
           GROUP_CONCAT(CONCAT('#', pi.id, ' ', pi.unit, ' 재고', IFNULL(pi.current_stock,0),
             IF(pi.is_active, '', ' (비활성)')) ORDER BY pi.id SEPARATOR ' | ') AS 각줄
    FROM product_ingredients pi
    GROUP BY pi.owner_user_id, LOWER(TRIM(pi.name)) HAVING COUNT(*) > 1 ORDER BY 줄수 DESC`);

  await section('B3', 'B3. 재료 코드가 겹침', `
    SELECT i.restaurant_id AS 매장id, r.name AS 매장, i.code AS 코드, COUNT(*) AS 줄수,
           GROUP_CONCAT(CONCAT('#', i.id, ' ', i.name) ORDER BY i.id SEPARATOR ' | ') AS 각줄
    FROM ingredients i LEFT JOIN restaurants r ON r.id = i.restaurant_id
    WHERE i.code IS NOT NULL AND i.code <> ''
    GROUP BY i.restaurant_id, i.brand_id, i.code HAVING COUNT(*) > 1 ORDER BY 줄수 DESC`,
    '채번이 건수 기반이라 삭제 후 등록하면 번호가 재발급된다(기존 확인된 결함).');

  await section('B4', 'B4. 재고아이템 코드가 겹침', `
    SELECT pi.owner_user_id AS 소유자, pi.code AS 코드, COUNT(*) AS 줄수,
           GROUP_CONCAT(CONCAT('#', pi.id, ' ', pi.name) ORDER BY pi.id SEPARATOR ' | ') AS 각줄
    FROM product_ingredients pi WHERE pi.code IS NOT NULL AND pi.code <> ''
    GROUP BY pi.owner_user_id, pi.code HAVING COUNT(*) > 1 ORDER BY 줄수 DESC`);

  await section('B5', 'B5. 상품 코드(SKU)가 겹침', `
    SELECT p.restaurant_id AS 매장id, r.name AS 매장, p.code AS 코드, COUNT(*) AS 줄수,
           GROUP_CONCAT(CONCAT('#', p.id, ' ', p.name, IF(p.is_active, '', ' (비활성)')) ORDER BY p.id SEPARATOR ' | ') AS 각줄
    FROM products p LEFT JOIN restaurants r ON r.id = p.restaurant_id
    WHERE p.code IS NOT NULL AND p.code <> ''
    GROUP BY p.restaurant_id, p.code HAVING COUNT(*) > 1 ORDER BY 줄수 DESC`);

  await section('B6', 'B6. 같은 매장에 같은 이름 상품이 두 개 이상 (살아있는 것만)', `
    SELECT p.restaurant_id AS 매장id, r.name AS 매장, LOWER(TRIM(p.name)) AS 이름, COUNT(*) AS 줄수,
           GROUP_CONCAT(CONCAT('#', p.id, ' ', p.price) ORDER BY p.id SEPARATOR ' | ') AS 각줄
    FROM products p LEFT JOIN restaurants r ON r.id = p.restaurant_id
    WHERE p.is_active = 1
    GROUP BY p.restaurant_id, LOWER(TRIM(p.name)) HAVING COUNT(*) > 1 ORDER BY 줄수 DESC`,
    '⚠ 사이즈·옵션이 달라 일부러 나눈 것일 수 있다. 이름만 보고 지우면 안 된다.');

  await section('B7', 'B7. 같은 대상 ↔ 같은 공급업체 상품 매핑이 두 줄 이상', `
    SELECT isp.seller_type AS 판매자유형, isp.seller_product_id AS 공급업체상품, COUNT(*) AS 줄수,
           GROUP_CONCAT(CONCAT('#', isp.id, ' 단가', isp.unit_price,
             IF(isp.is_active, '', ' (비활성)')) ORDER BY isp.id SEPARATOR ' | ') AS 각줄,
           MAX(COALESCE(i.name, pi.name, p.name)) AS 대상이름
    FROM ingredient_seller_products isp
      LEFT JOIN ingredients i ON i.id = isp.ingredient_id
      LEFT JOIN product_ingredients pi ON pi.id = isp.product_ingredient_id
      LEFT JOIN products p ON p.id = isp.product_id
    GROUP BY IFNULL(isp.ingredient_id,0), IFNULL(isp.product_ingredient_id,0), IFNULL(isp.product_id,0),
             IFNULL(isp.brand_product_id,0), isp.seller_type, IFNULL(isp.seller_entity_id,0), isp.seller_product_id
    HAVING COUNT(*) > 1 ORDER BY 줄수 DESC`,
    '완전 동일 조합이라 안전하게 정리 가능성이 가장 높은 항목.');

  await section('B8', 'B8. 거래처 이름이 겹침', `
    SELECT s.owner_type AS 소유유형, r.name AS 매장, LOWER(TRIM(s.name)) AS 이름, COUNT(*) AS 줄수,
           GROUP_CONCAT(CONCAT('#', s.id, IF(s.supplier_company_id IS NULL, ' (연결없음)', CONCAT(' 회사', s.supplier_company_id)),
             IF(s.is_active, '', ' (비활성)')) ORDER BY s.id SEPARATOR ' | ') AS 각줄
    FROM suppliers s LEFT JOIN restaurants r ON r.id = s.restaurant_id
    GROUP BY s.owner_type, s.restaurant_id, s.brand_id, LOWER(TRIM(s.name)) HAVING COUNT(*) > 1 ORDER BY 줄수 DESC`);

  await section('B9', 'B9. 같은 공급업체 안에 같은 이름 상품이 두 개 이상', `
    SELECT sc.name AS 공급업체, LOWER(TRIM(sp.name)) AS 이름, COUNT(*) AS 줄수,
           GROUP_CONCAT(CONCAT('#', sp.id, ' ', sp.unit_price) ORDER BY sp.id SEPARATOR ' | ') AS 각줄
    FROM supplier_products sp LEFT JOIN supplier_companies sc ON sc.id = sp.supplier_company_id
    WHERE sp.deleted_at IS NULL
    GROUP BY sc.name, sp.supplier_company_id, LOWER(TRIM(sp.name)) HAVING COUNT(*) > 1 ORDER BY 줄수 DESC`);

  await section('Z', 'Z. 전체 규모 (분모)', `
    SELECT '매장 재료' AS 표, COUNT(*) AS 전체, SUM(is_active) AS 살아있음 FROM ingredients
    UNION ALL SELECT '재고아이템', COUNT(*), SUM(is_active) FROM product_ingredients
    UNION ALL SELECT '상품', COUNT(*), SUM(is_active) FROM products
    UNION ALL SELECT '공급업체 매핑', COUNT(*), SUM(is_active) FROM ingredient_seller_products
    UNION ALL SELECT '거래처', COUNT(*), SUM(is_active) FROM suppliers
    UNION ALL SELECT '공급업체 상품', COUNT(*), SUM(is_active) FROM supplier_products`);

  if (JSON_OUT) { require('fs').writeFileSync(JSON_OUT, JSON.stringify(out, null, 1)); console.log('\n저장:', JSON_OUT); }
  console.log('\n=== 끝 — 이 스크립트는 아무것도 바꾸지 않았습니다 ===');
  process.exit(0);
})().catch(e => { console.error('실패:', e.message); process.exit(1); });
