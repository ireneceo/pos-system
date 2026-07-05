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
            AND REPLACE(LOWER(sc.name),' ','') = REPLACE(LOWER(s.name),' ',''))`))[0].c;
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

    return checks;
  },
};
