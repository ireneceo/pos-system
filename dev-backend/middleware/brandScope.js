/**
 * Brand-General scope middleware
 *
 * Two scoping modes:
 *  - BG scope  (requireBGScope)     — resources owned per Brand General user
 *                                     (ingredients, suppliers, BG product catalog)
 *  - Brand scope (requireBrandScope) — resources owned per brand
 *                                     (recipes), with brand ownership verified via
 *                                     brands.owner_id === req.user.id
 *
 * Usage:
 *   router.get('/', authenticateToken, requireBGScope, handler);
 *   // handler can use: req.bgOwnerId, or applyBGFilter(where, req)
 *
 *   router.put('/:id', authenticateToken, requireBrandScope('brand_id'), handler);
 *   // handler can use: req.brandScope.brandId, req.brandScope.ownedBrandIds
 */
const { Brand } = require('../models');

function isSysAdmin(user) {
  return user?.role === 'System Admin';
}

function isBG(user) {
  return user?.role === 'Brand General' || user?.role === 'Brand Manager';
}

/**
 * requireBGScope — resources scoped to the Brand General user.
 * Sets req.bgOwnerId:
 *  - Brand General/Manager: their user.id
 *  - System Admin: null (unfiltered) unless ?owner_user_id=N explicitly passed
 */
function requireBGScope(req, res, next) {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }
  if (isSysAdmin(user)) {
    const override = req.query.owner_user_id ? parseInt(req.query.owner_user_id, 10) : null;
    req.bgOwnerId = Number.isFinite(override) ? override : null;
    req.bgOwnerIsAdmin = true;
    return next();
  }
  if (isBG(user)) {
    req.bgOwnerId = user.id;
    req.bgOwnerIsAdmin = false;
    return next();
  }
  return res.status(403).json({ success: false, message: 'Brand General access only' });
}

/**
 * applyBGFilter — adds owner_user_id filter to a Sequelize where clause.
 * System Admin without override: no filter (sees all).
 */
function applyBGFilter(where, req) {
  if (req.bgOwnerIsAdmin && req.bgOwnerId == null) return where;
  where.owner_user_id = req.bgOwnerId;
  return where;
}

/**
 * assertBGOwnsRow — row-level ownership guard for write/delete operations.
 * Throws 404 on mismatch to avoid leaking existence of other BG's resources.
 */
function assertBGOwnsRow(row, req, res) {
  if (!row) {
    res.status(404).json({ success: false, message: 'Not found' });
    return false;
  }
  if (req.bgOwnerIsAdmin) return true;
  if (row.owner_user_id !== req.bgOwnerId) {
    res.status(404).json({ success: false, message: 'Not found' });
    return false;
  }
  return true;
}

/**
 * requireBrandScope — resources scoped to a specific brand the BG owns.
 *
 * brandIdFrom: function(req) => brand_id (defaults to req.params.brandId || req.query.brand_id || req.body.brand_id)
 *
 * Sets req.brandScope = { brandId, ownedBrandIds }
 *  - brandId: the resolved brand id (or null if not supplied and user is BG — see below)
 *  - ownedBrandIds: all brand ids the user owns (for list endpoints without a specific brand)
 */
function requireBrandScope(brandIdFrom) {
  const resolver = typeof brandIdFrom === 'function'
    ? brandIdFrom
    : (req) => req.params.brandId || req.params.brand_id || req.query.brand_id || req.body?.brand_id;

  return async (req, res, next) => {
    try {
      const user = req.user;
      if (!user) return res.status(401).json({ success: false, message: 'Not authenticated' });

      const rawBrandId = resolver(req);
      const brandId = rawBrandId != null && rawBrandId !== '' ? parseInt(rawBrandId, 10) : null;

      if (isSysAdmin(user)) {
        req.brandScope = {
          brandId: Number.isFinite(brandId) ? brandId : null,
          ownedBrandIds: null, // unfiltered
          isAdmin: true,
        };
        return next();
      }

      if (!isBG(user)) {
        return res.status(403).json({ success: false, message: 'Brand General access only' });
      }

      // `isBG()` 는 Brand Manager 도 통과시키는데, 그 다음 `owner_id` 조회가 **항상 빈 배열**이라
      //   BM 은 무조건 403 이었다(2026-09-06 Fable 판정 · 실측: BM 토큰 → `GET /api/brands/1/inventory` 403).
      //   BM 은 소유자가 아니라 **소속**이다 — 형제 라우트와 같은 판정식(`user.brand_id`)을 쓴다.
      //   brand_id 가 비어 있으면 볼 브랜드가 없다 → 기존 403 그대로(넓히지 않는다).
      // 브랜드 사람은 두 갈래다 — **소유**(brands.owner_id)와 **배정**(users.brand_id).
      //   2026-09-06 에 Brand Manager 만 «소속»으로 인정했는데, **Brand General 도 배정만 된 경우가 있다.**
      //   실측(2026-09-08): `irene@gitconsulting.group`(BG, brand_id=1, 소유자 아님)이
      //   브랜드 매출 리포트에서 403 을 받았다. 같은 브랜드의 소유자 계정은 200 이었다.
      //   판정은 단일 소스 `utils/managerBrandScope` 로 — orders-crud·manager-sales 와 같은 답을 내야 한다.
      //   ⛔ 형제 브랜드(같은 소유자의 다른 브랜드)는 넣지 않는다. 소유 ∪ 배정까지만.
      const isBM = user.role === 'Brand Manager';
      const { brandIdsForUser } = require('../utils/managerBrandScope');
      let ownedIds = await brandIdsForUser(user);
      if (!ownedIds.length && !isBM) {
        // 폴백: 역할 목록이 달라 helper 가 비어 오면 기존 규칙(소유)으로 한 번 더 본다
        const owned = await Brand.findAll({ where: { owner_id: user.id }, attributes: ['id'] });
        ownedIds = owned.map(b => b.id);
      }

      if (ownedIds.length === 0) {
        return res.status(403).json({
          success: false,
          message: isBM ? 'No brand assigned to this manager' : 'No brand owned by user'
        });
      }

      if (Number.isFinite(brandId)) {
        if (!ownedIds.includes(brandId)) {
          return res.status(404).json({ success: false, message: 'Brand not found' });
        }
      }

      req.brandScope = {
        brandId: Number.isFinite(brandId) ? brandId : null,
        ownedBrandIds: ownedIds,
        isAdmin: false,
      };
      return next();
    } catch (err) {
      console.error('requireBrandScope error:', err);
      return res.status(500).json({ success: false, message: 'Scope check failed' });
    }
  };
}

/**
 * applyBrandFilter — adds brand_id filter to Sequelize where using req.brandScope.
 *  - If a specific brandId was resolved: filter to that one.
 *  - Else (list view, no brand specified): filter to ownedBrandIds.
 *  - System Admin unfiltered: no clause added.
 */
function applyBrandFilter(where, req) {
  const scope = req.brandScope;
  if (!scope) return where;
  if (scope.isAdmin) {
    if (scope.brandId != null) where.brand_id = scope.brandId;
    return where;
  }
  if (scope.brandId != null) {
    where.brand_id = scope.brandId;
  } else {
    where.brand_id = scope.ownedBrandIds;
  }
  return where;
}

/**
 * assertBrandOwnsRow — row-level guard for brand-scoped resources.
 */
function assertBrandOwnsRow(row, req, res) {
  if (!row) {
    res.status(404).json({ success: false, message: 'Not found' });
    return false;
  }
  const scope = req.brandScope;
  if (!scope) {
    res.status(500).json({ success: false, message: 'Scope not set' });
    return false;
  }
  if (scope.isAdmin) return true;
  if (!scope.ownedBrandIds.includes(row.brand_id)) {
    res.status(404).json({ success: false, message: 'Not found' });
    return false;
  }
  return true;
}

module.exports = {
  requireBGScope,
  applyBGFilter,
  assertBGOwnsRow,
  requireBrandScope,
  applyBrandFilter,
  assertBrandOwnsRow,
};
