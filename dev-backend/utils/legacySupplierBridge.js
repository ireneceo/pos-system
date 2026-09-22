/**
 * 예전 방식 공급업체(`suppliers`, 화면 «OWN») → 지금 방식 외부 공급업체(`supplier_companies` + 계약, 화면 «EXTERNAL»)
 * 연결 — 단일 소스 (2026-09-21 Irene 「OWN이 왜있냐고」).
 *
 * 쓰는 곳 두 곳이 같은 함수를 부른다:
 *   - `POST /api/external-suppliers/from-legacy/:legacyId` (OWN 카드의 «Products» 버튼)
 *   - `scripts/migrate-legacy-suppliers-to-external.js` (남은 OWN 일괄 이관, 배포마다 멱등)
 * 연결된 레거시 행은 목록에서 숨고(AllSuppliersView: supplier_company_id 있으면 skip) EXTERNAL 카드로 보인다.
 * 레거시 행·재고의 옛 FK 는 그대로 둔다(회귀 0).
 */
const { SupplierCompany, SupplierContract } = require('../models');
const { Op, fn, col, where: sqlWhere } = require('sequelize');
const { sanitizeString } = require('../middleware/validation');

/**
 * 이 레거시 행을 가진 구매자 — 연결 후 외부 공급업체의 «등록 주체» 가 된다.
 *   브랜드 행은 두 모양이 있다: brand_id 가 채워진 옛 행 / BG 가 `POST /api/suppliers` 로 만든 행
 *   (설계상 brand_id=null · owner_user_id=그 BG — BG 의 여러 브랜드에 공통). 뒤쪽은 소유 BG 의 배정 브랜드로 잡는다.
 * @returns {{type:string,id:number}|null}
 */
async function legacyOwnerEntity(legacy, { ownerUser } = {}) {
  if (legacy.owner_type === 'restaurant' && legacy.restaurant_id) return { type: 'restaurant', id: Number(legacy.restaurant_id) };
  if (legacy.owner_type === 'foodcourt' && legacy.foodcourt_id) return { type: 'foodcourt', id: Number(legacy.foodcourt_id) };
  if (legacy.owner_type === 'brand') {
    if (legacy.brand_id) return { type: 'brand', id: Number(legacy.brand_id) };
    let u = ownerUser;
    if (!u && legacy.owner_user_id) u = await require('../models/User').findByPk(legacy.owner_user_id, { attributes: ['id', 'brand_id'] });
    if (u && u.brand_id) return { type: 'brand', id: Number(u.brand_id) };
  }
  return null;
}

/**
 * 요청자가 이 레거시 행을 가졌나 — 라우트 전용 판정.
 *   브랜드 행 중 brand_id=null 인 것은 **그 행을 만든 BG 계정**이 주인이다
 *   (routes/suppliers.js 의 수정·삭제가 쓰는 assertBGOwnsRow 와 같은 규칙). 예전엔 brand_id 만 봐서 BG 가 만든 행은 늘 403 이었다.
 */
function requesterOwnsLegacy(legacy, buyerEntity, user) {
  if (!buyerEntity) return false;
  if (buyerEntity.type === 'restaurant') return legacy.owner_type === 'restaurant' && Number(legacy.restaurant_id) === buyerEntity.id;
  if (buyerEntity.type === 'foodcourt') return legacy.owner_type === 'foodcourt' && Number(legacy.foodcourt_id) === buyerEntity.id;
  if (buyerEntity.type === 'brand') {
    if (legacy.owner_type !== 'brand') return false;
    if (legacy.brand_id != null) return Number(legacy.brand_id) === buyerEntity.id;
    return !!user && legacy.owner_user_id != null && Number(legacy.owner_user_id) === Number(user.id);
  }
  return false;
}

/**
 * 연결(find-or-create). 멱등:
 *   ① 이미 연결됨 → 그 회사
 *   ② 같은 구매자가 **같은 이름**의 외부 공급업체를 이미 등록 → 새로 만들지 않고 거기에 연결(중복 업체 방지)
 *   ③ 없으면 새로 만든다 + 그 구매자의 활성 계약
 * @returns {Promise<{supplier_company_id:number, bridged:boolean, reused:boolean}>}
 */
async function bridgeLegacySupplier(legacy, entity, { userId = null, transaction } = {}) {
  const t = transaction;
  if (legacy.supplier_company_id) {
    const existing = await SupplierCompany.findByPk(legacy.supplier_company_id, { transaction: t });
    if (existing) return { supplier_company_id: existing.id, bridged: false, reused: false };
  }
  const name = sanitizeString(String(legacy.name || 'Supplier')).trim().slice(0, 255) || 'Supplier';

  let company = await SupplierCompany.findOne({
    where: {
      is_system_registered: false,
      registered_by_entity_type: entity.type,
      registered_by_entity_id: entity.id,
      [Op.and]: [sqlWhere(fn('LOWER', fn('TRIM', col('name'))), name.toLowerCase())],
    },
    transaction: t,
  });
  const reused = !!company;
  if (!company) {
    company = await SupplierCompany.create({
      name,
      status: 'active',
      is_system_registered: false,
      registered_by_entity_type: entity.type,
      registered_by_entity_id: entity.id,
      phone: legacy.phone ? String(legacy.phone).slice(0, 20) : null,
      email: legacy.email ? String(legacy.email).slice(0, 100) : null,
      address: legacy.address || null,
      city: legacy.city || null,
      state: legacy.state || null,
      postal_code: legacy.postal_code || null,
      country: legacy.country ? String(legacy.country).toUpperCase().slice(0, 2) : 'MY',
      description: legacy.notes || null,
    }, { transaction: t });
  }

  const contract = await SupplierContract.findOne({
    where: { entity_type: entity.type, entity_id: entity.id, supplier_company_id: company.id },
    transaction: t,
  });
  if (!contract) {
    await SupplierContract.create({
      entity_type: entity.type,
      entity_id: entity.id,
      supplier_company_id: company.id,
      status: 'active',
      requested_by_user_id: userId,
    }, { transaction: t });
  }

  legacy.supplier_company_id = company.id;
  await legacy.save({ transaction: t });
  return { supplier_company_id: company.id, bridged: true, reused };
}

module.exports = { legacyOwnerEntity, requesterOwnsLegacy, bridgeLegacySupplier };
