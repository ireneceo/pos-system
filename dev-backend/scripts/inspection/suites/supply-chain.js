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
    const cnt = async (sql) => Number((await q(sql))[0].c);

    // ── R-SC-001: 폐기 → 새 계약으로 교체 (2026-09-04) ───────────────────────────
    // 옛 계약: "판매품목(sync_to_ingredients=1, distribution_mode='all')은 소유 브랜드마다
    //   재료 미러가 있어야 한다." 이건 **프로덕트가 재료를 자동 생성하던 시절**의 규칙이다.
    //   그 경로(F5)를 폐기했으므로 이 검사는 이제 **없어야 정상인 것을 없다고 실패**시킨다
    //   (운영에서 20건 실패 — 전부 정상 상태).
    // 새 계약: 재료 행은 **명시적으로 만들어질 때만** 존재한다(Stock Item 공유 또는 레시피에서 선택).
    //   대신 지켜야 할 것은 **만들어진 거울이 출처를 갖는가**이고, 그건 인스펙션
    //   `ingredient-unification` (ING-UNI-002/003/004)이 검사한다.
    //   여기서는 **옛 경로가 되살아났는지**만 본다 — 프로덕트가 만든 흔적(`brand_product_id`)이 있는데
    //   새 출처(`source_brand_product_id`)가 없는 행은 옛 복제가 다시 돌았다는 신호다.
    const revived = (await q(`
      SELECT i.id, i.name FROM ingredients i
      WHERE i.brand_product_id IS NOT NULL
        AND i.source_brand_product_id IS NULL
        AND i.is_active = 1
        AND i.created_at >= '2026-09-04'
      LIMIT 20`));
    add('R-SC-001 프로덕트→재료 자동 복제가 되살아나지 않음 (>=2026-09-04)',
      revived.length === 0,
      revived.length ? `${revived.length}건이 옛 경로로 만들어진 것으로 보임 (예: ${revived.slice(0,3).map(r=>`#${r.id} ${r.name}`).join(', ')})` : '');

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

    // ⚠ **모드 인지형** (2026-08-30 개정) — `unit` 의미가 바뀌며 이 검사의 전제도 바뀌었다.
    //   단가표 반영 후 `supplier_products.unit` 은 **판매 단위가 아니라 내용물 단위**다(5kg 들이의 kg).
    //   그러면 pack 모드에서 "재고 piece ↔ 판매자 kg" 은 불일치가 아니다 — 주문 수량은 여전히 팩 수라
    //   1팩 주문 = 재고 +1개가 맞다. 옛 규칙은 이런 행 90건을 오탐으로 잡았다.
    //   ⛔ 오탐만 걷어내고 **진짜 위험 2종은 오히려 강화**한다:
    //     ① measure + 재고 개수단위 → 1kg 주문이 재고 +1개
    //     ② pack + 재고 연속단위    → conv 가 base×단위계수와 어긋나면 1팩이 1g
    //   ⚠ **차원(질량/부피)을 반드시 구분한다.** kg 와 L 은 둘 다 계수 1000 이라
    //      한 표에 담으면 `kg ↔ L` 이 want=1 로 "계산됨" 처리되어 통과한다 —
    //      질량↔부피는 밀도를 알아야 하므로 **기계가 정할 수 없다**(2026-08-30 실측으로 발견:
    //      Test Oil kg↔L conv=1 이 조용히 통과하고 있었다).
    const DIM = { g: 'mass', kg: 'mass', ml: 'vol', l: 'vol' };
    const UNIT_FACTOR = { g: 1, kg: 1000, ml: 1, l: 1000 };
    const isContinuous = (u) => !!DIM[String(u || '').trim().toLowerCase()];
    const dim = (u) => DIM[String(u || '').trim().toLowerCase()];
    const sameDim = (a, b) => !!dim(a) && dim(a) === dim(b);
    const factor = (u) => UNIT_FACTOR[String(u || '').trim().toLowerCase()];

    const convRows = [];
    for (const leg of [
      { type: 'supplier', table: 'supplier_products' },
      { type: 'brand', table: 'brand_products' },
    ]) {
      // 브랜드 판매상품에는 order_mode/base_quantity 컬럼이 없다 — pack·1 로 본다.
      const modeCol = leg.type === 'supplier' ? 's.order_mode' : "'pack'";
      const baseCol = leg.type === 'supplier' ? 's.base_quantity' : '1';
      const rows = (await q(`
        SELECT isp.id, i.name, i.unit AS stock_unit, s.unit AS seller_unit,
               ${modeCol} AS order_mode, ${baseCol} AS base_quantity,
               isp.unit_conversion AS conv, '${leg.type}' AS leg
          FROM ingredient_seller_products isp
          JOIN ingredients i ON i.id = isp.ingredient_id
          JOIN \`${leg.table}\` s ON s.id = isp.seller_product_id
         WHERE isp.is_active = 1
           AND isp.seller_type = '${leg.type}'
           AND i.unit IS NOT NULL AND s.unit IS NOT NULL
           AND ${mismatchClause('i.unit', 's.unit')}
         LIMIT 300`));
      for (const r of rows) {
        const stockCont = isContinuous(r.stock_unit);
        const conv = Number(r.conv);
        if (r.order_mode === 'measure') {
          if (!stockCont) {
            convRows.push({ ...r, why: '무게·부피로 주문하는데 재고는 개수 단위 — 1kg 주문이 재고 1개로 들어간다' });
            continue;
          }
          if (!sameDim(r.seller_unit, r.stock_unit)) {
            convRows.push({ ...r, why: `${r.seller_unit} ↔ ${r.stock_unit} 는 질량↔부피라 기계가 환산할 수 없다 — 사람이 넣어야 한다` });
            continue;
          }
          const want = factor(r.seller_unit) / factor(r.stock_unit);
          if (Math.abs(conv - want) > 1e-6) {
            convRows.push({ ...r, why: `환산비가 ${conv} 인데 단위상 ${want} 여야 한다` });
          }
          continue;
        }
        // pack — 주문 수량은 팩 수. 재고가 개수면 conv=1 이 정상이므로 잡지 않는다.
        if (!stockCont) continue;
        if (isContinuous(r.seller_unit)) {
          if (!sameDim(r.seller_unit, r.stock_unit)) {
            convRows.push({ ...r, why: `${r.seller_unit} ↔ ${r.stock_unit} 는 질량↔부피라 기계가 환산할 수 없다 — 사람이 넣어야 한다` });
          } else {
            const want = Number(r.base_quantity) * factor(r.seller_unit) / factor(r.stock_unit);
            if (Math.abs(conv - want) > 1e-6) {
              convRows.push({ ...r, why: `1팩 = ${r.base_quantity}${r.seller_unit} 이므로 환산비 ${want} 여야 하는데 ${conv}` });
            }
          }
        } else if (conv === 1) {
          convRows.push({ ...r, why: '재고는 무게·부피인데 판매 단위가 개수 — 1팩이 몇 g인지 사람이 넣어야 한다' });
        }
      }
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
        add(`R-SC-007 #${r.id}[${r.leg}] ${pair} conv=${r.conv}`, false,
          `${r.name} — ${r.why} (⛔ 자동 백필 금지)`);
      }
    }

    // ── R-SC-008: 재고 타깃은 "넷 중 정확히 하나" ────────────────────────────────
    // 2026-09-01: 발주 라인·공급처 연결에 프로덕트 타깃 2개(product_id·brand_product_id)를
    // 열었다. 넷 중 둘 이상 채워지면 입고가 두 곳으로 가거나(이중 계상) 0개면 아무 데도
    // 안 들어간다 — 둘 다 화면에는 정상으로 보이는 조용한 결함이다.
    // 쓰기 경로는 utils/stockTarget.js 가 막지만, **막았다고 믿지 않고** DB 에서 다시 잰다.
    const TARGET_SUM = `(ingredient_id IS NOT NULL) + (product_ingredient_id IS NOT NULL)
                      + (product_id IS NOT NULL) + (brand_product_id IS NOT NULL)`;
    for (const [table, label] of [['purchase_order_items', '발주 라인'], ['ingredient_seller_products', '공급처 연결']]) {
      const many = await cnt(`SELECT COUNT(*) c FROM ${table} WHERE ${TARGET_SUM} > 1`);
      add(`R-SC-008 ${label} 재고 타깃 2개 이상 없음 (${table})`, many === 0, `${many}건`);
      const none = await cnt(`SELECT COUNT(*) c FROM ${table} WHERE ${TARGET_SUM} = 0`);
      add(`R-SC-008 ${label} 재고 타깃 0개 없음 (${table})`, none === 0, `${none}건`);
    }

    // ── R-SC-011: 재고추적 스위치 재발 감지 ──────────────────────────────────────
    // Q5(2026-09-01)로 스위치를 없앴다. 컬럼은 호환용으로 남아 있는데, 누군가 다시
    // 게이트로 쓰기 시작하면 가장 먼저 0 행이 생긴다(끄는 UI 나 기본값 되돌림).
    // 그때 조용히 "팔려도 재고가 안 빠지는" 상태로 되돌아가므로 0 을 불변식으로 박는다.
    for (const table of ['products', 'brand_products', 'ingredients', 'product_ingredients']) {
      const off = await cnt(`SELECT COUNT(*) c FROM ${table} WHERE track_stock = 0`);
      add(`R-SC-011 ${table} 재고추적 꺼진 행 없음 (스위치 폐기)`, off === 0, `${off}건`);
    }

    // ── R-SC-012: 레시피 없는 브랜드 프로덕트는 판매 단위 = 재고 단위 ───────────
    // 프로덕트가 곧 재고아이템이고 판매·출고 차감이 quantity 를 **환산 없이** 그대로 뺀다
    // (brand_products 에는 환산 필드가 없다). 두 단위가 다르면 숫자가 조용히 틀린다.
    // 2026-09-01 실제 사례: "NULL 이면 pack" 규칙이 unit=bottle 인 행에 stock_unit=pack 을 박았다.
    const unitMismatch = await q(`
      SELECT id, name, unit, stock_unit FROM brand_products
       WHERE product_recipe_id IS NULL AND is_active = 1
         AND unit IS NOT NULL AND stock_unit IS NOT NULL AND unit <> stock_unit`);
    if (unitMismatch.length === 0) {
      add('R-SC-012 레시피 없는 브랜드 프로덕트 단위 불일치 없음', true, '');
    } else {
      for (const r of unitMismatch) {
        add(`R-SC-012 #${r.id} ${r.unit}↔${r.stock_unit}`, false,
          `${r.name} — 판매 단위와 재고 단위가 다르면 차감이 틀린다(환산 없음)`);
      }
    }

    // ── R-SC-009: 공급처 연결이 남의 소유 프로덕트를 가리키지 않는다 ─────────────
    // 프로덕트 타깃이 열리면서 "내 재고 화면에 남의 프로덕트가 뜨는" 크로스테넌트 경로가
    // 생길 수 있다. 링크의 소유자와 프로덕트의 소유자가 다른 행 = 0 이어야 한다.
    const crossBrand = await cnt(`
      SELECT COUNT(*) c FROM ingredient_seller_products isp
      JOIN brand_products bp ON bp.id = isp.brand_product_id
      WHERE isp.brand_product_id IS NOT NULL AND bp.owner_user_id IS NULL`);
    add('R-SC-009 브랜드 프로덕트 링크에 소유자 없는 행 없음', crossBrand === 0, `${crossBrand}건`);
    const crossProd = await cnt(`
      SELECT COUNT(*) c FROM ingredient_seller_products isp
      JOIN products p ON p.id = isp.product_id
      WHERE isp.product_id IS NOT NULL AND p.restaurant_id IS NULL`);
    add('R-SC-009 매장 프로덕트 링크에 매장 없는 행 없음', crossProd === 0, `${crossProd}건`);

    // ── R-SC-010: 레시피 있는 프로덕트를 재고아이템처럼 사지 않는다 ──────────────
    // 레시피가 있으면 재고는 재료에서 빠진다. 그 프로덕트를 발주로 또 사면 이중 계상이다.
    const recipeBuy = await cnt(`
      SELECT COUNT(*) c FROM purchase_order_items poi
      JOIN products p ON p.id = poi.product_id
      WHERE poi.product_id IS NOT NULL AND (p.recipe_id IS NOT NULL OR p.product_recipe_id IS NOT NULL)`);
    add('R-SC-010 레시피 있는 매장 프로덕트 발주 라인 없음', recipeBuy === 0, `${recipeBuy}건`);
    const recipeBuyB = await cnt(`
      SELECT COUNT(*) c FROM purchase_order_items poi
      JOIN brand_products bp ON bp.id = poi.brand_product_id
      WHERE poi.brand_product_id IS NOT NULL AND bp.product_recipe_id IS NOT NULL`);
    add('R-SC-010 레시피 있는 브랜드 프로덕트 발주 라인 없음', recipeBuyB === 0, `${recipeBuyB}건`);

    // ── R-SC-020 (관측, WARN — 막지 않는다) 레시피·재료가 안 붙은 활성 상품 ────────────
    //   2026-09-06 운영 실측: 활성 상품 751 중 **687(91%)** 이 `recipe_id`·`ingredient_id`·
    //   `product_recipe_id` 셋 다 NULL 이다. 이건 **코드 결함이 아니라 미입력 데이터**다
    //   (Fable 판정) — 레시피가 없으면 시스템은 무엇을 뺄지 알 방법이 없고, 이름으로 자동
    //   연결 가능한 것은 운영 전체에서 2건뿐이었다. 미연결 상품은 "상품 자체가 재고 단위"
    //   경로로 `products.current_stock` 에서 빠지는데, 그 값이 0 이면 아무 일도 일어나지 않는다.
    //   ⚠ 위험은 이 상태가 **조용하다**는 것이다 — 부족분 경고를 `orders-crud.js` 가
    //   `console.warn` 으로만 흘린다. 그래서 **배포 로그에 매장별 숫자가 계속 뜨게** 한다.
    //   ⛔ 화면 배지는 하지 않는다(91%가 미연결이라 전부 빨개져 소음이 된다).
    //   ⛔ 차단하지 않는다(`warn: true`) — 이미 687건이 있고, 사람이 레시피를 넣어야 풀린다.
    const unlinked = await q(`
      SELECT p.restaurant_id, r.name AS restaurant_name, COUNT(*) AS c
        FROM products p
        LEFT JOIN restaurants r ON r.id = p.restaurant_id
       WHERE p.is_active = 1
         AND p.recipe_id IS NULL
         AND p.ingredient_id IS NULL
         AND p.product_recipe_id IS NULL
         AND COALESCE(p.current_stock, 0) = 0
       GROUP BY p.restaurant_id, r.name
       ORDER BY c DESC
       LIMIT 10`);
    const unlinkedTotal = unlinked.reduce((n, r) => n + Number(r.c), 0);
    checks.push({
      name: 'R-SC-020 (관측) 레시피·재료 미연결 + 재고 0 인 활성 상품 — 팔아도 아무것도 안 빠진다',
      pass: unlinkedTotal === 0,
      warn: true,
      detail: unlinkedTotal === 0
        ? ''
        : `${unlinkedTotal}건 · 매장별 ${unlinked.map(r => `${r.restaurant_name || ('rid ' + r.restaurant_id)} ${r.c}`).join(' · ')}`,
    });

    return checks;
  },
};
