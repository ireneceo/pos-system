/**
 * Address Suggestions API
 *
 * Returns DISTINCT city/state values from all 8 address-bearing tables for
 * datalist auto-completion. Cached in-process for 5 minutes per (field, country)
 * key to keep cost negligible.
 *
 * GET /api/address/suggestions?field=city|state&country=MY
 *   200 { field, country, suggestions: ['Kuala Lumpur', ...] }
 *   400 invalid field
 *
 * Sources unioned: restaurants, brands, foodcourts, foodcourt_branches,
 *                  company_settings, users, suppliers, hardware_quotes
 */

const express = require('express');
const router = express.Router();
const { sequelize } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const ALLOWED_FIELDS = new Set(['city', 'state']);
// Tables paired with whether they expose a `country` column. hardware_quotes
// has only `country_code` (legacy) so we skip the country filter there.
const TABLES = [
  { name: 'restaurants',        hasCountry: true  },
  { name: 'brands',             hasCountry: true  },
  { name: 'foodcourts',         hasCountry: true  },
  { name: 'foodcourt_branches', hasCountry: true  },
  { name: 'company_settings',   hasCountry: true  },
  { name: 'users',              hasCountry: true  },
  { name: 'suppliers',          hasCountry: true  },
  { name: 'hardware_quotes',    hasCountry: false }
];

// In-process cache: Map<"field|country", { value: string[], ts: number }>
const CACHE = new Map();
const TTL_MS = 5 * 60 * 1000;

function cacheGet(key) {
  const hit = CACHE.get(key);
  if (!hit) return null;
  if (Date.now() - hit.ts > TTL_MS) { CACHE.delete(key); return null; }
  return hit.value;
}
function cacheSet(key, value) {
  CACHE.set(key, { value, ts: Date.now() });
}

router.get('/suggestions', authenticateToken, async (req, res) => {
  const field = String(req.query.field || '').toLowerCase();
  const country = String(req.query.country || '').toUpperCase().slice(0, 2) || null;

  if (!ALLOWED_FIELDS.has(field)) {
    return res.status(400).json({ success: false, message: 'Invalid field — must be city or state' });
  }

  const cacheKey = `${field}|${country || 'ALL'}`;
  const cached = cacheGet(cacheKey);
  if (cached) {
    return res.json({ success: true, field, country, suggestions: cached, cached: true });
  }

  try {
    // Build UNION over tables that exist with this column
    // company_settings has no `country` column historically — handle gracefully
    const unions = [];
    const replacements = {};
    for (const tbl of TABLES) {
      const where = [`\`${field}\` IS NOT NULL`, `TRIM(\`${field}\`) <> ''`];
      if (country && tbl.hasCountry) {
        where.push(`UPPER(country) = :country`);
      }
      // CONVERT...COLLATE forces a common collation so UNION across tables with
      // different defaults (utf8mb4_general_ci vs _unicode_ci) doesn't blow up
      // with ER_CANT_AGGREGATE_NCOLLATIONS.
      unions.push(`SELECT DISTINCT CONVERT(\`${field}\` USING utf8mb4) COLLATE utf8mb4_unicode_ci AS v FROM \`${tbl.name}\` WHERE ${where.join(' AND ')}`);
    }
    if (country) replacements.country = country;
    const sql = unions.join(' UNION ') + ' ORDER BY v ASC LIMIT 500';

    const rows = await sequelize.query(sql, {
      replacements,
      type: sequelize.QueryTypes.SELECT
    });

    const suggestions = rows
      .map(r => String(r.v || '').trim())
      .filter(Boolean)
      .filter((v, i, arr) => arr.indexOf(v) === i); // dedupe (case-sensitive — preserves user spelling)

    cacheSet(cacheKey, suggestions);
    res.json({ success: true, field, country, suggestions, cached: false });
  } catch (error) {
    console.error('Address suggestions error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch address suggestions' });
  }
});

module.exports = router;
