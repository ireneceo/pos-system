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

    return checks;
  },
};
