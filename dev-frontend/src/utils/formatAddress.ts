import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import koLocale from 'i18n-iso-countries/langs/ko.json';
import zhLocale from 'i18n-iso-countries/langs/zh.json';
import msLocale from 'i18n-iso-countries/langs/ms.json';

countries.registerLocale(enLocale);
countries.registerLocale(koLocale);
countries.registerLocale(zhLocale);
countries.registerLocale(msLocale);

export type AppLocale = 'en' | 'ko' | 'zh' | 'ms';

export interface Address {
  address?: string | null;
  address_line_2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
}

export type AddressFormat = 'full' | 'short' | 'location' | 'oneline';

const DEFAULT_LOCALE: AppLocale = 'en';

export function getCountryName(iso2: string | null | undefined, locale: AppLocale = DEFAULT_LOCALE): string {
  if (!iso2) return '';
  const code = String(iso2).toUpperCase();
  return countries.getName(code, locale) || code;
}

export function getCountryList(locale: AppLocale = DEFAULT_LOCALE): Array<{ code: string; name: string }> {
  const map = countries.getNames(locale, { select: 'official' }) as Record<string, string>;
  return Object.entries(map)
    .map(([code, name]) => ({ code, name }))
    .sort((a, b) => a.name.localeCompare(b.name, locale));
}

export function isValidCountryCode(iso2: string | null | undefined): boolean {
  if (!iso2) return false;
  return countries.isValid(String(iso2).toUpperCase());
}

function clean(v: string | null | undefined): string {
  if (v == null) return '';
  return String(v).replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function joinParts(parts: Array<string | null | undefined>, sep: string = ', '): string {
  return parts.map(clean).filter(Boolean).join(sep);
}

export function formatAddress(addr: Address | null | undefined, format: AddressFormat = 'full', locale: AppLocale = DEFAULT_LOCALE): string {
  if (!addr) return '';

  const line1 = clean(addr.address);
  const line2 = clean(addr.address_line_2);
  const city = clean(addr.city);
  const state = clean(addr.state);
  const postal = clean(addr.postal_code);
  const country = addr.country ? getCountryName(addr.country, locale) : '';

  if (format === 'location') {
    return joinParts([city, country]);
  }

  if (format === 'short') {
    return joinParts([city, state]);
  }

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

  // full (multi-line capable but we return single string with line breaks)
  switch (iso) {
    case 'KR':
      return [country, joinParts([state, city], ' '), joinParts([line1, line2], ' '), postal].filter(Boolean).join('\n');
    case 'JP':
      return [country, postal, joinParts([state, city], ''), joinParts([line1, line2], ' ')].filter(Boolean).join('\n');
    default:
      return [line1, line2, joinParts([city, state && postal ? `${state} ${postal}` : state || postal], ', '), country].filter(Boolean).join('\n');
  }
}

export function sanitizeAddressFields<T extends Address>(addr: T): T {
  const out: Address = {
    address: addr.address != null ? clean(addr.address) : addr.address,
    address_line_2: addr.address_line_2 != null ? clean(addr.address_line_2) : addr.address_line_2,
    city: addr.city != null ? clean(addr.city) : addr.city,
    state: addr.state != null ? clean(addr.state) : addr.state,
    postal_code: addr.postal_code != null ? clean(addr.postal_code) : addr.postal_code,
    country: addr.country != null ? String(addr.country).toUpperCase().slice(0, 2) : addr.country
  };
  return { ...addr, ...out };
}

export function isSameAddress(a: Address | null | undefined, b: Address | null | undefined): boolean {
  if (!a || !b) return false;
  const norm = (v: string | null | undefined) => clean(v).toLowerCase();
  return norm(a.address) === norm(b.address)
    && norm(a.postal_code) === norm(b.postal_code)
    && (a.country || '').toUpperCase() === (b.country || '').toUpperCase();
}
