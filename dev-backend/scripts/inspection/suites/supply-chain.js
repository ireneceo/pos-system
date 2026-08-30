/**
 * suites/supply-chain.js — 브랜드↔레스토랑 공급망 구조 불변식.
 * 이번(2026-07-05) with MIN 임포트에서 유출된 결함 클래스를 회귀로 박제한다.
 * 전부 DB 데이터 정합 검사(결정론적, 브라우저 불필요).
 */
module.exports = {
  name: 'supply-chain',
  async run({ q }) {
    const checks = [];
    const add = (name, pass, detail) => checks.push({ name, pass, detail });

    // ── R-SC-001: 판매품목(sync_to_ingredients) → 레스토랑 미러 완결성 ──────────────
    // distribution_mode='all' 상품은 brand_product_brands N:M 행이 없어 옛 sync가 미러 0개를
    // 만들던 버그. 규칙: sync=1 이면 대상 브랜드마다 Ingredient(brand) 미러가 있어야 한다.
    const allNoMirror = (await q(`
      SELECT bp.id, bp.name FROM brand_products bp
      WHERE bp.sync_to_ingredients = 1 AND bp.distribution_mode = 'all' AND bp.owner_user_id IS NOT NULL
        AND (SELECT COUNT(*) FROM brands b WHERE b.owner_id = bp.owner_user_id) >
            (SELECT COUNT(DISTINCT i.brand_id) FROM ingredients i WHERE i.brand_product_id = bp.id AND i.owner_type='brand')
      LIMIT 20`));
    add('R-SC-001 판매품목(all) → 전 브랜드 미러 존재',
      allNoMirror.length === 0,
      allNoMirror.length ? `${allNoMirror.length}개 판매품목이 소유 브랜드 일부에 미러 없음 (예: ${allNoMirror.slice(0,3).map(r=>`#${r.id} ${r.name}`).join(', ')})` : '');

    // ── R-SC-002: 자기참조(self-brand) 셀러매핑 = 0 ────────────────────────────────
    // BG 스톡(ProductIngredient)이 "자기가 파는 BrandProduct"를 공급원으로 가리키는 매핑.
    // verifySellerRelation상 BG 발주 불가한 dead 매핑 + preferred=1이면 발주 제출 실패 유발.
    const selfBrand = (await q(`
      SELECT COUNT(*) c FROM ingredient_seller_products isp
      JOIN product_ingredients pi ON isp.product_ingredient_id = pi.id
      JOIN brand_products bp ON isp.seller_type='brand' AND isp.seller_product_id = bp.id
      WHERE bp.owner_user_id = pi.owner_user_id`))[0].c;
    add('R-SC-002 자기참조 셀러매핑 없음 (BG 스톡→자기 판매품목)',
      Number(selfBrand) === 0,
      Number(selfBrand) ? `${selfBrand}건 — BG가 발주에 못 쓰는 dead 매핑 (매입경로 미완결 신호)` : '');

    // ── R-SC-003: 고아 셀러매핑 = 0 ───────────────────────────────────────────────
    // 삭제된 스톡/판매품목을 가리키는 매핑 (from-catalog 멱등 우회로 중복 재료를 만드는 뿌리).
    const orphanStock = (await q(`
      SELECT COUNT(*) c FROM ingredient_seller_products isp
      WHERE (isp.ingredient_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ingredients i WHERE i.id=isp.ingredient_id))
         OR (isp.product_ingredient_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM product_ingredients p WHERE p.id=isp.product_ingredient_id))`))[0].c;
    add('R-SC-003 고아 셀러매핑 없음 (삭제된 재고 참조)',
      Number(orphanStock) === 0,
      Number(orphanStock) ? `${orphanStock}건 — 재료 중복생성 유발 (멱등체크 restaurant 스코프 누락 버그)` : '');
    const orphanSeller = (await q(`
      SELECT COUNT(*) c FROM ingredient_seller_products isp WHERE isp.seller_product_id IS NOT NULL AND (
        (isp.seller_type='supplier' AND NOT EXISTS (SELECT 1 FROM supplier_products sp WHERE sp.id=isp.seller_product_id))
        OR (isp.seller_type='brand' AND NOT EXISTS (SELECT 1 FROM brand_products bp WHERE bp.id=isp.seller_product_id)))`))[0].c;
    add('R-SC-004 고아 셀러매핑 없음 (삭제된 판매품목 참조)',
      Number(orphanSeller) === 0,
      Number(orphanSeller) ? `${orphanSeller}건` : '');

    // ── R-SC-005: 레거시↔외부 공급업체 중복 = 0 ──────────────────────────────────
    // 같은 오너 밑에서 레거시 Supplier(미링크)와 외부 SupplierCompany 이름이 겹치면 화면에
    // OWN·DIRECT 두 번 뜬다. 레거시 supplier_company_id 백필로 통합돼야 함.
    const dupLegacy = (await q(`
      SELECT COUNT(*) c FROM suppliers s
      WHERE s.owner_type='brand' AND s.owner_user_id IS NOT NULL AND s.supplier_company_id IS NULL
        AND EXISTS (
          SELECT 1 FROM supplier_companies sc
          JOIN brands b ON b.owner_id = s.owner_user_id
          WHERE sc.is_system_registered = 0 AND sc.status='active'
            AND sc.registered_by_entity_type='brand' AND sc.registered_by_entity_id = b.id
            AND REPLACE(LOWER(sc.name),' ','') = REPLACE(LOWER(s.name),' ','') COLLATE utf8mb4_general_ci)`))[0].c;
    add('R-SC-005 레거시↔외부 공급업체 중복 없음 (미링크)',
      Number(dupLegacy) === 0,
      Number(dupLegacy) ? `${dupLegacy}건 — 화면에 OWN·DIRECT 이중 표시 (supplier_company_id 백필 필요)` : '');

    // ── R-SC-006: 재고 카테고리 커버리지 (미분류 정보) ────────────────────────────
    // 카테고리가 있는 오너인데 스톡이 미분류로 남으면 카테고리 연결 누락.
    const uncat = (await q(`
      SELECT pi.owner_user_id oid, COUNT(*) c FROM product_ingredients pi
      WHERE pi.category_id IS NULL
        AND EXISTS (SELECT 1 FROM product_ingredient_categories c WHERE c.owner_user_id = pi.owner_user_id)
      GROUP BY pi.owner_user_id HAVING c > 0`));
    add('R-SC-006 재고 카테고리 연결 (카테고리 있는 오너)',
      uncat.length === 0,
      uncat.length ? `미분류 재고: ${uncat.map(r=>`owner${r.oid}:${r.c}건`).join(', ')}` : '');

    // ── R-SC-007: 단위가 다른데 환산비가 1 인 판매자 링크 = 0 ─────────────────────
    // 재고 단위(g)와 판매자 단위(kg)가 다른데 unit_conversion 이 1 이면,
    // **1kg 입고가 1g 으로 기록된다** — 재고가 1000배 어긋난다.
    // 뿌리: restaurants-ingredients.js 의 from-catalog **생성** 흐름이 body 의
    // unit_conversion 을 무시하고 1 을 박고 있었다(2026-08-30 수정). 나머지 3벌은 정상이었다.
    //
    // ⚠ 함정 1 — seller_product_id 는 **다형 참조**다.
    //   seller_type='supplier' 면 supplier_products, 'brand' 면 brand_products 를 가리킨다.
    //   타입 필터 없이 한쪽 테이블에 조인하면 **ID 충돌로 엉뚱한 행이 붙는다**
    //   (2026-08-30 실제 오측: brand 링크 2건이 supplier 상품과 id 가 겹쳐 가짜 불일치로 잡혔다).
    //   그래서 아래는 seller_type 별로 나눠 조인한다.
    //
    // ⚠ 함정 2 — COLLATE 를 빼지 말 것.
    //   ingredients 와 supplier_products 의 collation 이 다르다(utf8mb4_unicode_ci vs utf8mb4_0900_ai_ci).
    //   빼면 MySQL 이 "Illegal mix of collations" 로 던지거나, 조건이 성립하지 않아 **조용히 0건**이 된다.
    //   0건 = 통과처럼 보이지만 그건 검사기 고장이다. 그래서 아래 표본 0 검사가 exit 2 로 떨어뜨린다.
    //
    // ⛔ 자동 백필 금지 — tray→kg 의 환산비는 기계가 추측할 수 없다. 이 검사는 **표시만** 한다.
    //    표시된 것을 사람이 "옳다"고 판정하면 baseline 에 등재한다(design-guard 와 동일 모델).
    //    ⛔ 아래 동의어 테이블을 불려서 지우지 말 것 — 그건 검사를 눈멀게 하는 것이다.
    //
    // 동의어 = **순수 개수 단위만.** 여기 없는 쌍은 전부 표시된다(퍼지 매칭·복수형 추론 없음).
    const COUNT_UNIT_SYNONYMS = ['piece', 'pcs', 'pc', 'ea', 'unit'];
    const synList = COUNT_UNIT_SYNONYMS.map(u => `'${u}'`).join(',');
    const norm = (col) => `LOWER(TRIM(${col})) COLLATE utf8mb4_general_ci`;
    // 두 단위가 "다르다" 의 정의: 정규화 후 문자열이 다르고, **둘 다 개수 동의어인 경우는 제외**
    const mismatchClause = (a, b) => `
         ${norm(a)} <> ${norm(b)}
         AND NOT (${norm(a)} IN (${synList}) AND ${norm(b)} IN (${synList}))`;

    const convRows = [];
    for (const leg of [
      { type: 'supplier', table: 'supplier_products' },
      { type: 'brand', table: 'brand_products' },
    ]) {
      const rows = (await q(`
        SELECT isp.id, i.name, i.unit AS stock_unit, s.unit AS seller_unit, '${leg.type}' AS leg
          FROM ingredient_seller_products isp
          JOIN ingredients i ON i.id = isp.ingredient_id
          JOIN \`${leg.table}\` s ON s.id = isp.seller_product_id
         WHERE isp.is_active = 1
           AND isp.seller_type = '${leg.type}'
           AND isp.unit_conversion = 1
           AND i.unit IS NOT NULL AND s.unit IS NOT NULL
           AND ${mismatchClause('i.unit', 's.unit')}
         LIMIT 50`));
      convRows.push(...rows);
    }

    // 표본 0 = 검사기 고장 판정 (collate 누락·조인 붕괴로 조용히 0건이 되는 것을 잡는다).
    // 활성 링크가 애초에 없는 빈 환경은 정상이므로 그때만 면제한다.
    const activeLinks = Number((await q(`
      SELECT COUNT(*) c FROM ingredient_seller_products
       WHERE is_active = 1 AND seller_type IN ('supplier','brand') AND seller_product_id IS NOT NULL`))[0].c);
    if (activeLinks > 0) {
      const probe = Number((await q(`
        SELECT COUNT(*) c FROM ingredient_seller_products isp
          JOIN ingredients i ON i.id = isp.ingredient_id
          JOIN supplier_products s ON s.id = isp.seller_product_id
         WHERE isp.is_active = 1 AND isp.seller_type = 'supplier'
           AND i.unit IS NOT NULL AND s.unit IS NOT NULL`))[0].c);
      if (probe === 0) {
        add('R-SC-007 검사기 자체 건전성 (표본 0 = 고장)', false,
          `활성 링크 ${activeLinks}건인데 supplier 다리 조인 표본이 0 — 조인/collate 붕괴 의심. 이 검사 결과를 신뢰하지 말 것`);
      }
    }

    // 결과는 **행 단위 검사**로 낸다. 러너의 baseline 은 검사 **이름**으로 매칭하므로,
    // "R-SC-007 ... 없음" 같은 요약 1개로 내면 baseline 등재 시 **신규 불량 링크까지 통째로 숨는다**
    // (= baseline 이 필터가 아니라 구멍이 된다). 행마다 이름을 다르게 내면
    // 기존 부채는 known 으로 빠지고 **새로 생긴 행만 신규 실패**로 배포를 막는다.
    //
    // 이름에 **단위쌍과 conv 값을 포함**한다 — 누가 고쳤다가 다시 다른 값으로 망가뜨리면
    // 이름이 달라져 baseline 에 안 걸리고 재적발된다.
    if (convRows.length === 0) {
      add('R-SC-007 단위 불일치 + 환산비 1 인 판매자 링크 없음', true, '');
    } else {
      for (const r of convRows) {
        const pair = `${String(r.stock_unit).trim().toLowerCase()}↔${String(r.seller_unit).trim().toLowerCase()}`;
        add(`R-SC-007 #${r.id}[${r.leg}] ${pair} conv=1`, false,
          `${r.name} — 입고 수량이 환산 없이 기록된다. 환산비를 사람이 입력해야 한다(⛔ 자동 백필 금지)`);
      }
    }

    return checks;
  },
};
