/**
 * suites/ingredient-unification.js — "재료는 목록 하나" 불변식 (같은 물건이 두 줄로 갈라지는 클래스를 박제).
 *
 * 배경 (2026-09-04 실측·Fable 판정 · docs/INGREDIENT_UNIFICATION_DESIGN.md):
 *   재료를 만드는 길이 셋이었다 — Stock Items / 브랜드 재료 수기 / **프로덕트 자동 복제**.
 *   프로덕트를 등록하면 `syncProductToIngredients` 가 브랜드 재료 행을 하나 더 만들었고,
 *   이미 레시피가 쓰던 `K-Gochujang`(g, 2026-01 생성) 옆에 `K-Gochujang Sauce 1kg`(piece)이 생겼다.
 *   생성일별 실측: 1~2월 재료 56건 중 53건이 레시피에 붙어 있고, 6/8 이후 만든 89건 중 붙은 것은 1건.
 *   레시피는 옛 줄을, 발주·재고는 새 줄을 쓰게 갈라져 **사서 넣어도 레시피 숫자가 안 움직였다.**
 *
 * 사람이 기억하는 규칙은 또 잊힌다. 그래서 게이트가 막는다 — 다음에 누가 같은 방식으로 지으면
 * 배포 전에 여기서 걸린다.
 *
 * 단위 주의: 이 스위트가 세는 것은 전부 **행 수(건)** 다. 가격·수량 비교 없음.
 *
 * 창(window) 원칙: 통합 마이그 적용 전에는 과거 부채(같은 물질 두 줄)가 남아 있다.
 * per-check baseline 으로 통째로 뮤트하면 게이트가 죽으므로, **CUTOFF 이후에 만들어진 행만**
 * 검사해 신규 분열을 살아있는 게이트로 잡는다. 마이그 완료 후 CUTOFF 를 낮춰 전수로 넓힌다.
 */

// 이 날짜 이후 생성된 재료만 검사(고정 컷오프 — 어느 시점에 돌려도 같은 결과).
// 통합 마이그 적용일 다음날로 낮추면 전수 게이트가 된다.
const CUTOFF = '2026-09-04';

module.exports = {
  name: 'ingredient-unification',
  async run({ q }) {
    const checks = [];
    const add = (name, pass, detail) => checks.push({ name, pass, detail });
    const cnt = async (sql) => Number((await q(sql))[0].c);

    // ⚠ 재발을 실제로 막는 것은 아래 **002(브랜드 행은 Stock Item 출처 필수)** 다.
    //   재료를 만드는 길이 Stock Items 하나뿐이면 같은 물건이 두 줄로 생길 수 없고, 002 가 그 구조를 지킨다.
    //   001 은 그 위의 얇은 그물일 뿐이다.

    // 이름 정규화 = 대문자 + 공백·하이픈·언더바 제거. **완전일치만** 본다.
    // ⛔ 괄호 앞 본체만 비교(`SUBSTRING_INDEX(name,'(',1)`)하지 말 것 —
    //   `… Bowl (M)` 과 `… Bowl (L)` 을 같은 물질로 묶어 **실제로 다른 상품 때문에 배포를 막는다**(거짓 양성).
    //   반대로 이 분열의 진짜 형태였던 `K-Gochujang` vs `K-Gochujang Sauce 1kg` 은 어차피 본체가 달라 못 잡는다.
    //   즉 헛것은 잡고 진짜는 놓치는 열쇠였다. "같은 물질인데 이름이 다르다"는 판정은 사람 몫이고,
    //   기계는 **완전일치 중복**만 확실히 잡는다(거짓 양성 0).
    const NORM = `UPPER(REPLACE(REPLACE(REPLACE(TRIM(name),' ',''),'-',''),'_',''))`;

    // ING-UNI-001: 한 주인(브랜드) 안에 이름이 똑같은 활성 재료가 두 줄 이상 없을 것.
    const dupBrand = await cnt(`SELECT COUNT(*) c FROM (
      SELECT brand_id, ${NORM} nm
        FROM ingredients
       WHERE brand_id IS NOT NULL AND is_active = 1 AND created_at >= '${CUTOFF}'
         AND TRIM(name) <> ''
       GROUP BY brand_id, ${NORM}
      HAVING COUNT(*) > 1) x`);
    add(`ING-UNI-001 브랜드 안 같은 이름 활성 재료 1줄 (>=${CUTOFF})`,
      dupBrand === 0,
      dupBrand ? `${dupBrand}개 이름이 두 줄 이상 — 재료 생성 경로가 또 열렸는지 확인` : '');

    // ING-UNI-002: **이 검사가 재발을 막는 본체다.** 브랜드 재료 행은 반드시 출처(Stock Item)를 가질 것.
    // 재료를 만드는 길이 Stock Items 하나뿐이라면, 브랜드 행은 전부 그 거울이어야 한다.
    // 출처 없는 브랜드 행 = 다른 길로 만들어진 것(수기 또는 자동 복제 재도입).
    // 출처는 **둘 중 하나**다 (2026-09-04): GIT 이 **사는 것** → Stock Item / **파는 것** → 브랜드 프로덕트.
    //   파는 물건에 Stock Item 을 또 만들면 2026-09-01 에 합쳐 놓은 것이 다시 갈라진다.
    const orphanMirror = await cnt(`SELECT COUNT(*) c FROM ingredients
       WHERE brand_id IS NOT NULL AND is_active = 1
         AND source_product_ingredient_id IS NULL
         AND source_brand_product_id IS NULL
         AND created_at >= '${CUTOFF}'`);
    add(`ING-UNI-002 브랜드 재료는 출처(Stock Item 또는 프로덕트)를 가짐 (>=${CUTOFF})`,
      orphanMirror === 0,
      orphanMirror ? `${orphanMirror}건 출처 없음 — 정해진 두 경로 밖에서 만들어짐` : '');

    // ING-UNI-003: 거울이 가리키는 Stock Item 이 실제로 존재할 것(끊긴 참조 0).
    // 창 없이 전수 — 이 검사는 부채가 아니라 참조 무결성이라 지금도 0 이어야 한다.
    const brokenSource = await cnt(`SELECT COUNT(*) c FROM ingredients i
       LEFT JOIN product_ingredients pi ON pi.id = i.source_product_ingredient_id
       LEFT JOIN brand_products bp ON bp.id = i.source_brand_product_id
      WHERE (i.source_product_ingredient_id IS NOT NULL AND pi.id IS NULL)
         OR (i.source_brand_product_id IS NOT NULL AND bp.id IS NULL)`);
    add('ING-UNI-003 거울의 출처가 실제로 존재 (끊긴 참조 0)',
      brokenSource === 0, brokenSource ? `${brokenSource}건 출처가 사라짐` : '');

    // ING-UNI-004: 출처는 **정확히 하나**. 둘 다 채워진 행은 어느 쪽을 따라야 할지 알 수 없다.
    const bothSources = await cnt(`SELECT COUNT(*) c FROM ingredients
      WHERE source_product_ingredient_id IS NOT NULL AND source_brand_product_id IS NOT NULL`);
    add('ING-UNI-004 출처는 둘 중 하나만 (Stock Item · 프로덕트 동시 0)',
      bothSources === 0, bothSources ? `${bothSources}건이 두 출처를 다 가짐` : '');

    // ING-UNI-005: 프로덕트는 **재고아이템 또는 레시피** 중 하나에 연결돼 있을 것.
    // Irene 규칙 (2026-09-04, 2026-09-01 결정을 대체):
    //   "프로덕트=재고아이템 or 프로덕트=레시피=재고아이템 이렇게야."
    //   재고는 재고아이템에만 산다 — 프로덕트가 스스로 재고를 들면 판매 차감과 입고가 어긋난다.
    // 연결 수단은 프로덕트 폼의 **재고아이템 다이렉트**(`product_ingredient_id`, 1:1·환산 없음) 또는
    //   `Linked Product Recipe`(`product_recipe_id`) 둘 중 하나다.
    //   ⛔ 예전 `Ingredients (direct)` 는 뒤에서 `(auto)` 레시피를 만드는 **세 번째 길**이었고 없앴다 —
    //      되살리지 말 것(009 가 막는다). 어느 쪽인지는 물건마다 사람만 아는 것이라 기계가 만들지 않는다.
    // ⚠ 그래서 이 검사는 **차단이 아니라 목록**이다 — baseline 에 담아 두고(➖),
    //   Irene 이 화면에서 다 연결하면 자동으로 baseline 에서 빠져 초록으로 바뀐다.
    //   컷오프 없이 **전수**로 본다(과거 부채가 곧 지금 해야 할 일 그 자체라서).
    const unlinkedProducts = await cnt(`SELECT COUNT(*) c FROM brand_products
      WHERE is_active = 1 AND product_recipe_id IS NULL AND product_ingredient_id IS NULL`);
    add('ING-UNI-005 활성 프로덕트는 재고아이템(direct) 또는 레시피에 연결됨',
      unlinkedProducts === 0,
      unlinkedProducts ? `${unlinkedProducts}건 미연결 — 팔려도 재고가 안 빠진다. 프로덕트 폼에서 재고아이템 다이렉트 또는 Linked Product Recipe 로 연결` : '');

    // ING-UNI-006: 매장 메뉴(products)도 같은 규칙 — 메뉴 = 재고아이템(direct) 또는 메뉴 = 레시피 = 재고아이템.
    // 매장 쪽 연결 열쇠는 `products.recipe_id`(Recipe 계통)다. `product_recipe_id`(ProductRecipe 계통)는
    // 브랜드 프로덕트 전용이라 매장 메뉴에 걸리면 안 된다 — 2026-07-15 에 잘못 물려 있던 것을 떼어냈다
    // (memory: reference_two_recipe_systems). 그래서 아래 007 이 그 재발을 따로 지킨다.
    // 005 와 같은 이유로 **차단이 아니라 목록**(baseline 에 담아 두고, 다 연결되면 자동으로 초록).
    const unlinkedMenus = await cnt(`SELECT COUNT(*) c FROM products
      WHERE is_active = 1 AND recipe_id IS NULL AND product_recipe_id IS NULL AND ingredient_id IS NULL`);
    add('ING-UNI-006 활성 매장 메뉴는 재고아이템(direct) 또는 레시피에 연결됨',
      unlinkedMenus === 0,
      unlinkedMenus ? `${unlinkedMenus}건 미연결 — 팔려도 재고가 안 빠진다. 메뉴 폼에서 Linked Recipe 또는 재고아이템 다이렉트로 연결` : '');

    // ING-UNI-007: 매장 메뉴는 **브랜드 프로덕트 레시피(ProductRecipe)를 쓰지 않는다.**
    // 계통이 둘이라 헷갈리기 쉽고, 잘못 물리면 매장 재고차감이 통째로 엉뚱한 곳을 본다.
    // 이건 부채가 아니라 계통 오염이라 창 없이 전수 — 살아있는 메뉴는 지금도 0 이어야 한다.
    // ⚠ is_active=1 로 좁힌 이유(실측 2026-09-04 dev): 비활성 감사 잔재 `AUDIT-MENU-17` 2건
    //   (products 407·408 → product_recipe 16)이 걸렸다. 꺼진 메뉴는 팔리지 않아 재고를 움직이지 못하므로
    //   배포를 막을 일이 아니다. 되살아나 팔리는 순간 이 검사가 잡는다.
    const wrongSystem = await cnt(`SELECT COUNT(*) c FROM products WHERE is_active = 1 AND product_recipe_id IS NOT NULL`);
    add('ING-UNI-007 매장 메뉴에 브랜드 프로덕트 레시피가 물리지 않음',
      wrongSystem === 0, wrongSystem ? `${wrongSystem}건 — recipe_id(Recipe) 계통으로 옮겨야 함` : '');

    // ING-UNI-008 (차단): 레시피와 재고아이템을 **동시에** 건 행이 없을 것.
    // 둘 다 걸리면 어느 쪽으로 재고를 뺄지 알 수 없다 — 라우트가 400 으로 막지만(LINK_EXCLUSIVE),
    // 마이그·직접 SQL 로도 들어올 수 있으므로 상태 자체를 게이트가 지킨다.
    const bothLinks = await cnt(`SELECT
      (SELECT COUNT(*) FROM products WHERE recipe_id IS NOT NULL AND ingredient_id IS NOT NULL)
    + (SELECT COUNT(*) FROM brand_products WHERE product_recipe_id IS NOT NULL AND product_ingredient_id IS NOT NULL) c`);
    add('ING-UNI-008 레시피와 재고아이템을 동시에 건 행 0 (둘 중 하나만)',
      bothLinks === 0, bothLinks ? `${bothLinks}건 — 어느 쪽으로 뺄지 알 수 없다` : '');

    // ING-UNI-009 (차단): 이름이 ` (auto)` 로 끝나는 레시피가 없을 것.
    // 자동 레시피 = "둘 중 하나"에 없던 세 번째 길. 다시 생기면 여기서 걸린다.
    const autoNamed = await cnt(`SELECT
      (SELECT COUNT(*) FROM recipes WHERE name LIKE '% (auto)')
    + (SELECT COUNT(*) FROM product_recipes WHERE name LIKE '% (auto)') c`);
    add('ING-UNI-009 자동 생성 레시피(` (auto)`) 0건',
      autoNamed === 0, autoNamed ? `${autoNamed}건 — 자동 레시피 경로가 다시 열렸는지 확인` : '');

    // ING-UNI-010 (비차단·baseline): 재료 0줄 레시피에 연결된 활성 프로덕트/메뉴.
    // **연결돼 보이는데 차감은 0** 이다 — 005/006 은 이걸 초록으로 세므로, 010 이 없으면 거짓 통과다.
    // 자동으로 끊지 않는다(Fable 2026-09-04): 사람이 걸어둔 미완성 레시피일 수 있고,
    //   조용히 상태를 바꾸는 것은 없앤 "세 번째 길"과 같은 종류다. 연결은 사람이 화면에서 한다.
    const emptyRecipeLinked = await cnt(`SELECT
      (SELECT COUNT(*) FROM brand_products bp
        WHERE bp.is_active = 1 AND bp.product_recipe_id IS NOT NULL
          AND (SELECT COUNT(*) FROM product_recipe_ingredients pri WHERE pri.recipe_id = bp.product_recipe_id) = 0)
    + (SELECT COUNT(*) FROM products p
        WHERE p.is_active = 1 AND p.recipe_id IS NOT NULL
          AND (SELECT COUNT(*) FROM recipe_ingredients ri WHERE ri.recipe_id = p.recipe_id) = 0) c`);
    add('ING-UNI-010 재료 0줄 레시피에 연결된 활성 프로덕트/메뉴 0',
      emptyRecipeLinked === 0,
      emptyRecipeLinked ? `${emptyRecipeLinked}건 — 연결돼 보이지만 차감 0. 레시피에 재료를 넣거나 재고아이템 다이렉트로 바꿀 것` : '');

    // ─── 단위 불변식 (2026-09-05 P0, Fable 판정) ──────────────────────────────
    // 차감(`inventoryDeductionService.js:292`)은 `ri.quantity` 를 **환산 없이** 뺀다.
    // 그래서 "레시피 줄 단위 == 그 재료의 단위" 가 성립해야만 숫자가 맞는다.
    // 어긋나면 조용히 틀린다 — 예: 줄 `0.07 kg` 인데 재료가 g 이면 0.07 g 만 빠진다.
    // 운영 실측 2026-09-05: 위반 1건(ri 522 `Beef Miyeokguk` 0.07 kg ↔ 재료 26 g).
    // 단위 주의: 세는 것은 **행 수(건)** 다.

    // ING-UNI-011: 레시피 줄 단위 == 거울(브랜드 재료) 단위.
    const lineUnitMismatch = await cnt(`SELECT COUNT(*) c
      FROM recipe_ingredients ri
      JOIN ingredients i ON i.id = ri.ingredient_id
     WHERE ri.unit <> i.unit`);
    add('ING-UNI-011 레시피 줄 단위 = 재료 단위 (차감이 환산 없이 뺀다)',
      lineUnitMismatch === 0,
      lineUnitMismatch ? `${lineUnitMismatch}건 — 줄 단위와 재료 단위가 다르다. 차감·원가가 조용히 틀린다` : '');

    // ING-UNI-012: 프로덕트 레시피 줄 단위 == 재고아이템의 **레시피 단위**.
    // 레시피 단위 = `base_unit ?? unit` (P1 에서 base_unit 신설. 그전까지는 unit 하나).
    // ⚠ 컬럼이 아직 없을 수 있으므로 존재 여부를 보고 식을 고른다 — P0/P1 어느 쪽에서도 돈다.
    const hasBaseUnit = Number((await q(`SELECT COUNT(*) c FROM information_schema.columns
       WHERE table_schema = DATABASE() AND table_name = 'product_ingredients' AND column_name = 'base_unit'`))[0].c) > 0;
    const recipeUnitExpr = hasBaseUnit ? 'COALESCE(pi.base_unit, pi.unit)' : 'pi.unit';
    const prLineUnitMismatch = await cnt(`SELECT COUNT(*) c
      FROM product_recipe_ingredients pri
      JOIN product_ingredients pi ON pi.id = pri.ingredient_id
     WHERE pri.unit <> ${recipeUnitExpr}`);
    add('ING-UNI-012 프로덕트 레시피 줄 단위 = 재고아이템 레시피 단위',
      prLineUnitMismatch === 0,
      prLineUnitMismatch ? `${prLineUnitMismatch}건 — 줄 단위와 재고아이템 단위가 다르다` : '');

    // ING-UNI-013 (비차단·목록): 기준단위(package_unit)가 아직 안 채워진 행.
    //   "미결"의 뜻이다 — 수렴 규칙이 정할 수 없어 **사람이 정해야 하는 것**(이름이 애매하거나
    //   비식품이라 제외했거나 카테고리가 없는 것). 복사로 채워 버리면 재수렴이 영영 안 되므로
    //   NULL 로 남긴다(2026-09-05 Fable 결정). 목표는 0 이지만 **차단하지 않는다** — 감추지 않고 보이게.
    //   단위 주의: 세는 것은 행 수(건).
    const hasPkg = Number((await q(`SELECT COUNT(*) c FROM information_schema.columns
       WHERE table_schema = DATABASE() AND table_name = 'product_ingredients' AND column_name = 'package_unit'`))[0].c) > 0;
    if (hasPkg) {
      const pendingItems = await cnt(`SELECT COUNT(*) c FROM product_ingredients WHERE is_active = 1 AND package_unit IS NULL`);
      const pendingIngs = await cnt(`SELECT COUNT(*) c FROM ingredients WHERE is_active = 1 AND package_unit IS NULL`);
      const total = pendingItems + pendingIngs;
      add('ING-UNI-013 기준단위 미기입 0 (사람이 정할 것 — 비차단)',
        total === 0,
        total ? `재고아이템 ${pendingItems} · 재료 ${pendingIngs} — 화면에서 채우거나 카테고리·이름을 고치면 다음 배포가 자동 수렴` : '');
    }

    // ── 2026-09-05 H1 에서 나온 두 검사 ─────────────────────────────────────────
    // ING-UNI-014 (차단): 아이템 원가가 0 인데 **같은 기준**의 거울에는 값이 있다.
    //   수렴 스크립트가 `unit_cost := 거울 값` 규칙을 빠뜨려 프로덕트 레시피 59줄의 원가가
    //   실제보다 적게 나왔다. 기준(단위·기준숫자)이 같을 때만 센다 — 다르면 가격의 뜻도 다르다.
    const costGap = await cnt(`SELECT COUNT(*) c FROM product_ingredients pi
      JOIN ingredients i ON i.source_product_ingredient_id = pi.id
     WHERE pi.is_active = 1 AND (pi.unit_cost = 0 OR pi.unit_cost IS NULL) AND i.unit_cost > 0
       AND pi.unit = i.unit AND pi.base_quantity = i.base_quantity`);
    add('ING-UNI-014 아이템 원가 0 인데 같은 기준 거울엔 값 있음 = 0',
      costGap === 0, costGap ? `${costGap}건 — 레시피 원가가 실제보다 적게 나온다. 거울 값을 복사할 것` : '');

    // ING-UNI-015 (비차단·목록): 포장 이름 단위인데 기준숫자가 큰 행 = 뜻이 안 되는 값.
    //   실측: 액젓이 `bottle / 880`("1병 = 880병")이 됐다 — 옛 코드 동기화가 거울 단위를 덮은 결과.
    //   ⚠ `piece/pack` + 10·32 는 정상이다(1 봉지 = 10개). 그래서 **bottle·can 만**,
    //     그리고 기준숫자 100 이상만 의심한다 — 낱개로 100병을 한 묶음이라 부르는 일은 없다.
    if (hasPkg) {
      const nonsense = await cnt(`SELECT COUNT(*) c FROM (
        SELECT id FROM product_ingredients WHERE is_active = 1 AND unit IN ('bottle','can') AND base_quantity >= 100
        UNION ALL
        SELECT id FROM ingredients WHERE is_active = 1 AND unit IN ('bottle','can') AND base_quantity >= 100) x`);
      add('ING-UNI-015 병·캔 단위인데 기준숫자 100 이상 0 (뜻이 안 되는 값)',
        nonsense === 0, nonsense ? `${nonsense}건 — "1병 = N병" 형태. 취급단위가 소단위여야 하는데 포장 이름이 남아 있다` : '');
    }

    // ING-UNI-016 (차단): 아이템 단위 ≠ 거울 단위.
    //   이 상태에서 아이템을 저장하면 동기화가 거울을 덮고, 그 거울을 가리키는 레시피 줄의
    //   뜻이 말없이 바뀐다(`20 g` → `20 pack`). 코드에도 가드를 뒀지만 데이터도 어긋나 있으면 안 된다.
    //   ⚠ 이 검사가 있었으면 2026-09-05 P1 운영검증에서 PI-139 를 잡았다.
    const unitPairGap = await cnt(`SELECT COUNT(*) c FROM product_ingredients pi
      JOIN ingredients i ON i.source_product_ingredient_id = pi.id
     WHERE pi.is_active = 1 AND pi.unit <> i.unit`);
    add('ING-UNI-016 재고아이템 단위 = 거울 단위 (다르면 저장 한 번에 레시피가 틀어진다)',
      unitPairGap === 0, unitPairGap ? `${unitPairGap}쌍 — 화면에서 둘을 맞추거나 정합 마이그를 돌릴 것` : '');

    return checks;
  },
};
