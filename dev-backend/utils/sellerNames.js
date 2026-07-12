/**
 * sellerNames — 발주(PO)의 판매자 표시 이름 단일 해석기.
 *
 * PO 는 (seller_type, seller_entity_id) 로 판매자를 가리킨다:
 *   supplier  → SupplierCompany (시스템 등록 / 외부 업체 둘 다)
 *   brand     → Brand      (BG 가 자기 소속 매장에 파는 경우)
 *   foodcourt → Foodcourt  (FG 가 입점 매장에 파는 경우)
 *   system_admin → POS Catalog (엔티티 없음)
 *
 * 목록·상세·제안·승인 라우트가 각자 조회를 짜다가 목록만 brand/foodcourt 를 빠뜨려
 * 브랜드 발주의 공급업체 이름이 비어 보였다(2026-07-12, with MIN). 해석은 여기 한 곳에서만 한다.
 *
 * 표시 이름 = **수신처(법인) 기준** (2026-07-12 Irene):
 *   발주를 받는 주체는 브랜드가 아니라 그 브랜드를 운영하는 **회사**다. 브랜드명만 보여주면
 *   ("with MIN") 수신처가 누군지 알 수 없다. → `회사명 (브랜드명)` = "GIT Consulting (with MIN)".
 *   회사명이 없으면 브랜드/푸드코트명으로 폴백. supplier 는 name 자체가 업체명이라 그대로.
 */
const { Op } = require('sequelize');

const ENTITY_SELLER_TYPES = ['supplier', 'brand', 'foodcourt'];

const sellerKey = (type, id) => `${type}:${parseInt(id, 10)}`;

/**
 * 수신처 표시 이름. 발주를 받는 것은 브랜드/푸드코트가 아니라 그것을 운영하는 회사다.
 *   brand/foodcourt : "회사명 (브랜드명)" — 회사명 없으면 브랜드명만
 *   supplier        : 업체명 그대로 (name 이 이미 회사)
 */
function buildSellerDisplayName(type, row) {
  const entityName = (row.name || '').trim();
  const companyName = (row.company_name || '').trim();
  if (type === 'supplier') return entityName || companyName || null;
  if (!companyName || companyName === entityName) return entityName || null;
  if (!entityName) return companyName;
  return `${companyName} (${entityName})`;
}

/**
 * @param {Array<{seller_type: string, seller_entity_id: number|null}>} refs
 * @returns {Promise<Map<string, {id, name, phone, email, is_system_registered, seller_type}>>}
 */
async function resolveSellers(refs) {
  const models = {
    supplier: require('../models/SupplierCompany'),
    brand: require('../models/Brand'),
    foodcourt: require('../models/Foodcourt')
  };

  const idsByType = { supplier: new Set(), brand: new Set(), foodcourt: new Set() };
  for (const ref of refs || []) {
    const type = ref && ref.seller_type;
    const id = parseInt(ref && ref.seller_entity_id, 10);
    if (ENTITY_SELLER_TYPES.includes(type) && Number.isFinite(id)) idsByType[type].add(id);
  }

  const map = new Map();
  await Promise.all(ENTITY_SELLER_TYPES.map(async (type) => {
    const ids = [...idsByType[type]];
    if (!ids.length) return;
    // address 는 발주서(PDF)의 공급업체 블록이 쓴다 — 빼면 문서에서 주소가 사라진다.
    // company_name 은 수신처(법인) 표기용.
    const attributes = ['id', 'name', 'company_name', 'phone', 'email', 'address'];
    if (type === 'supplier') attributes.push('is_system_registered');
    const rows = await models[type].findAll({
      where: { id: { [Op.in]: ids } },
      attributes
    }).catch(() => []);
    for (const row of rows) {
      map.set(sellerKey(type, row.id), {
        id: row.id,
        name: buildSellerDisplayName(type, row),
        entity_name: row.name,                       // 브랜드/푸드코트/업체 자체 이름
        company_name: row.company_name || null,      // 법인명 (실제 수신처)
        phone: row.phone || null,
        email: row.email || null,
        address: row.address || null,
        // brand/foodcourt 는 플랫폼 계정이므로 항상 시스템 등록 = 자동 발송 대상.
        // 외부(수동 발송)는 미등록 SupplierCompany 뿐이다.
        is_system_registered: type === 'supplier' ? !!row.is_system_registered : true,
        seller_type: type
      });
    }
  }));
  return map;
}

/** 해석된 map 에서 PO 1건의 판매자 레코드 (없으면 null) */
function getSeller(map, sellerType, sellerEntityId) {
  if (!map || !ENTITY_SELLER_TYPES.includes(sellerType)) return null;
  return map.get(sellerKey(sellerType, sellerEntityId)) || null;
}

/** 화면 표시용 이름. system_admin 은 엔티티가 없어 고정 라벨. */
function getSellerName(map, sellerType, sellerEntityId) {
  if (sellerType === 'system_admin') return 'POS Catalog';
  const seller = getSeller(map, sellerType, sellerEntityId);
  return seller ? seller.name : null;
}

/** 외부(수동 발송) 여부 — 미등록 supplier 만 true. brand/foodcourt/system_admin 은 false. */
function isExternalSeller(map, sellerType, sellerEntityId) {
  const seller = getSeller(map, sellerType, sellerEntityId);
  return seller ? !seller.is_system_registered : false;
}

module.exports = { resolveSellers, getSeller, getSellerName, isExternalSeller, sellerKey };
