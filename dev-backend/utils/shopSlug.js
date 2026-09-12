/**
 * 주문용 상품 링크 slug — 단일 소스
 * 설계: docs/BUYER_FREE_TIER_DESIGN.md §5-6 (Irene 2026-09-12)
 *
 * 링크는 **하나의 주소 모양** `/shop/:slug` 뿐이다. 공급업체와 브랜드가 같은 칸 이름
 * (`shop_slug`)·같은 규칙을 쓴다 — 판매자 종류마다 다른 링크 개념을 만들지 않는다.
 *
 * ⚠ 두 표가 각자 UNIQUE 라도 **표를 가로지르면 겹칠 수 있다.** 겹치면 같은 링크가
 *   두 판매자를 가리켜 «누구 가게인지» 가 흔들린다 → 배정할 때 양쪽을 다 본다.
 *
 * slug 규칙은 매장(`restaurants.slug`)과 같은 것을 쓴다. 길이만 칸 크기(50)에 맞춘다.
 */

const MAX_LEN = 50;

/** 이름 → slug. 매장 slug 와 같은 규칙. */
function slugifyShop(name) {
  if (!name) return '';
  return String(name)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, MAX_LEN);
}

/** 사람이 직접 적어 넣은 값도 같은 규칙으로 정규화한다(대문자·공백·기호 허용 X). */
function normalizeShopSlug(value) {
  return slugifyShop(value);
}

/** 이 slug 를 이미 쓰는 판매자가 있는가. 자기 자신은 제외한다. */
async function shopSlugTaken(slug, { excludeType, excludeId } = {}) {
  if (!slug) return false;
  const SupplierCompany = require('../models/SupplierCompany');
  const Brand = require('../models/Brand');
  const [sup, brand] = await Promise.all([
    SupplierCompany.findOne({ where: { shop_slug: slug }, attributes: ['id'] }),
    Brand.findOne({ where: { shop_slug: slug }, attributes: ['id'] })
  ]);
  if (sup && !(excludeType === 'supplier' && Number(excludeId) === sup.id)) return true;
  if (brand && !(excludeType === 'brand' && Number(excludeId) === brand.id)) return true;
  return false;
}

/** 겹치면 뒤에 -2, -3 … 을 붙여 비어 있는 것을 찾는다.
 *  ⚠ 이름이 한글·중국어뿐이면 규칙상 빈 문자열이 된다(이 시장에 실제로 있는 경우다).
 *     그때는 `opts.fallback`(보통 회사 코드나 `shop-<id>`)으로 대신한다 — 링크가
 *     «만들 수 없음»으로 끝나면 판매자는 이유를 알 수 없다. */
async function ensureUniqueShopSlug(desired, opts = {}) {
  const base = normalizeShopSlug(desired) || normalizeShopSlug(opts.fallback);
  if (!base) return null;
  let candidate = base;
  let n = 1;
  // 100 은 «사람이 쓰는 이름» 기준으로 충분하고, 무한 루프를 막는 상한이다.
  while (await shopSlugTaken(candidate, opts) && n < 100) {
    n += 1;
    const suffix = `-${n}`;
    candidate = base.substring(0, MAX_LEN - suffix.length) + suffix;
  }
  return candidate;
}

/** slug → 판매자. 공급업체를 먼저 본다(먼저 쓰던 쪽). 없으면 브랜드. */
async function resolveShopSlug(slug) {
  const clean = normalizeShopSlug(slug);
  if (!clean) return null;
  const SupplierCompany = require('../models/SupplierCompany');
  const Brand = require('../models/Brand');
  const sup = await SupplierCompany.findOne({
    where: { shop_slug: clean, status: 'active' },
    attributes: ['id', 'name', 'code', 'logo_url', 'description', 'city', 'state', 'country', 'operation_settings']
  });
  if (sup) return { type: 'supplier', entity: sup };
  const brand = await Brand.findOne({
    where: { shop_slug: clean },
    attributes: ['id', 'name', 'code', 'logo_url', 'owner_id', 'operation_settings']
  });
  if (brand) return { type: 'brand', entity: brand };
  return null;
}

module.exports = { MAX_LEN, slugifyShop, normalizeShopSlug, shopSlugTaken, ensureUniqueShopSlug, resolveShopSlug };
