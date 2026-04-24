const { sanitizeAddressFields, isValidCountryCode } = require('../utils/formatAddress');

/**
 * Address input middleware — see docs/ADDRESS_STANDARDIZATION.md §3.3
 *
 * - Strips \n/\t/redundant whitespace from address fields
 * - Uppercases country, validates ISO 3166-1 alpha-2 (warn-only, does not reject NULL)
 * - Does NOT enforce postal_code format (country-specific, too varied to validate globally)
 *
 * Usage: router.post('/...', sanitizeAddressBody, handler)
 * Or: router.post('/...', sanitizeAddressBody(['location', 'branch']), handler)  // nested paths
 */

const ADDRESS_FIELDS = ['address', 'address_line_2', 'city', 'state', 'postal_code', 'country', 'latitude', 'longitude'];

function sanitizeAddressBody(req, res, next) {
  if (!req.body || typeof req.body !== 'object') return next();

  // Top-level sanitize
  const hasAny = ADDRESS_FIELDS.some(f => f in req.body);
  if (hasAny) {
    const pick = {};
    for (const f of ADDRESS_FIELDS) if (f in req.body) pick[f] = req.body[f];
    const cleaned = sanitizeAddressFields(pick);
    for (const k of Object.keys(cleaned)) req.body[k] = cleaned[k];
  }

  // Country validation (warning header only, does not reject)
  if (req.body.country != null && req.body.country !== '' && !isValidCountryCode(req.body.country)) {
    res.setHeader('X-Address-Warning', `Invalid country code: ${req.body.country}`);
  }

  next();
}

module.exports = { sanitizeAddressBody, ADDRESS_FIELDS };
