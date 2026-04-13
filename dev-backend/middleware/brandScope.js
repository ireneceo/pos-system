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

      const owned = await Brand.findAll({ where: { owner_id: user.id }, attributes: ['id'] });
      const ownedIds = owned.map(b => b.id);

      if (ownedIds.length === 0) {
        return res.status(403).json({ success: false, message: 'No brand owned by user' });
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
