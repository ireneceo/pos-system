const countries = require('i18n-iso-countries');

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
countries.registerLocale(require('i18n-iso-countries/langs/ko.json'));
countries.registerLocale(require('i18n-iso-countries/langs/zh.json'));
countries.registerLocale(require('i18n-iso-countries/langs/ms.json'));

const DEFAULT_LOCALE = 'en';

function clean(v) {
  if (v == null) return '';
  return String(v).replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function joinParts(parts, sep = ', ') {
  return parts.map(clean).filter(Boolean).join(sep);
}

function getCountryName(iso2, locale = DEFAULT_LOCALE) {
  if (!iso2) return '';
  const code = String(iso2).toUpperCase();
  return countries.getName(code, locale) || code;
}

function isValidCountryCode(iso2) {
  if (!iso2) return false;
  return countries.isValid(String(iso2).toUpperCase());
}

function formatAddress(addr, format = 'full', locale = DEFAULT_LOCALE) {
  if (!addr) return '';

  const line1 = clean(addr.address);
  const line2 = clean(addr.address_line_2);
  const city = clean(addr.city);
  const state = clean(addr.state);
  const postal = clean(addr.postal_code);
  const country = addr.country ? getCountryName(addr.country, locale) : '';

  if (format === 'location') return joinParts([city, country]);
  if (format === 'short') return joinParts([city, state]);

  const iso = addr.country ? String(addr.country).toUpperCase() : '';

  if (format === 'oneline') {
    switch (iso) {
      case 'KR':
        return joinParts([country, state, city, line1, line2, postal], ' ');
      case 'JP':
        return joinParts([country, postal, state, city, line1, line2], ' ');
      default:
        return joinParts([line1, line2, city, state && postal ? `${state} ${postal}` : state || postal, country]);
    }
  }

  switch (iso) {
    case 'KR':
      return [country, joinParts([state, city], ' '), joinParts([line1, line2], ' '), postal].filter(Boolean).join('\n');
    case 'JP':
      return [country, postal, joinParts([state, city], ''), joinParts([line1, line2], ' ')].filter(Boolean).join('\n');
    default:
      return [line1, line2, joinParts([city, state && postal ? `${state} ${postal}` : state || postal], ', '), country].filter(Boolean).join('\n');
  }
}

function sanitizeAddressFields(addr) {
  if (!addr) return addr;
  const out = { ...addr };
  if (out.address != null) out.address = clean(out.address);
  if (out.address_line_2 != null) out.address_line_2 = clean(out.address_line_2);
  if (out.city != null) out.city = clean(out.city);
  if (out.state != null) out.state = clean(out.state);
  if (out.postal_code != null) out.postal_code = clean(out.postal_code);
  if (out.country != null) out.country = String(out.country).toUpperCase().slice(0, 2);
  return out;
}

// Map common legacy country names/codes to ISO 3166-1 alpha-2.
// Used by cleanup migration and as fallback when incoming data isn't already ISO.
const COUNTRY_ALIAS = {
  'MALAYSIA': 'MY', 'MY': 'MY', 'MALAY': 'MY', '말레이시아': 'MY',
  'KOREA': 'KR', 'SOUTH KOREA': 'KR', 'REPUBLIC OF KOREA': 'KR', 'KR': 'KR', '한국': 'KR', '대한민국': 'KR',
  'SINGAPORE': 'SG', 'SG': 'SG', '싱가포르': 'SG',
  'THAILAND': 'TH', 'TH': 'TH', '태국': 'TH',
  'VIETNAM': 'VN', 'VIET NAM': 'VN', 'VN': 'VN', '베트남': 'VN',
  'INDONESIA': 'ID', 'ID': 'ID', '인도네시아': 'ID',
  'PHILIPPINES': 'PH', 'PH': 'PH', '필리핀': 'PH',
  'JAPAN': 'JP', 'JP': 'JP', '일본': 'JP',
  'CHINA': 'CN', 'CN': 'CN', '중국': 'CN',
  'HONG KONG': 'HK', 'HK': 'HK', '홍콩': 'HK',
  'TAIWAN': 'TW', 'TW': 'TW', '대만': 'TW',
  'UNITED STATES': 'US', 'USA': 'US', 'US': 'US', 'AMERICA': 'US', '미국': 'US',
  'UNITED KINGDOM': 'GB', 'UK': 'GB', 'GB': 'GB', 'ENGLAND': 'GB', '영국': 'GB',
  'AUSTRALIA': 'AU', 'AU': 'AU', '호주': 'AU',
  'CANADA': 'CA', 'CA': 'CA', '캐나다': 'CA',
  'INDIA': 'IN', 'IN': 'IN', '인도': 'IN',
  'UNITED ARAB EMIRATES': 'AE', 'UAE': 'AE', 'AE': 'AE', 'EMIRATES': 'AE', '아랍에미리트': 'AE',
  'SAUDI ARABIA': 'SA', 'SAUDI': 'SA', 'SA': 'SA', 'KSA': 'SA', '사우디아라비아': 'SA', '사우디': 'SA'
};

function normalizeCountry(input) {
  if (!input) return null;
  const raw = String(input).trim();
  if (raw.length === 2 && isValidCountryCode(raw)) return raw.toUpperCase();
  const upper = raw.toUpperCase();
  if (COUNTRY_ALIAS[upper]) return COUNTRY_ALIAS[upper];
  if (COUNTRY_ALIAS[raw]) return COUNTRY_ALIAS[raw];
  // Last resort: try package lookup by name in several locales
  for (const loc of ['en', 'ko', 'zh', 'ms']) {
    const code = countries.getAlpha2Code(raw, loc);
    if (code) return code;
  }
  return null;
}

function isSameAddress(a, b) {
  if (!a || !b) return false;
  const norm = v => clean(v).toLowerCase();
  return norm(a.address) === norm(b.address)
    && norm(a.postal_code) === norm(b.postal_code)
    && (a.country || '').toUpperCase() === (b.country || '').toUpperCase();
}

module.exports = {
  formatAddress,
  sanitizeAddressFields,
  getCountryName,
  isValidCountryCode,
  normalizeCountry,
  isSameAddress,
  COUNTRY_ALIAS
};
