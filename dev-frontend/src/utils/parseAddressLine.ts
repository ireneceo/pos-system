import countries from 'i18n-iso-countries';
import { Address } from './formatAddress';

/**
 * 한 줄 주소 → 주소 칸 나누기 (2026-11-15 Irene «주소를 검색 안되면 한번에 넣으면 알아서 항목 맞춰서 넣어줄 수 없어?»)
 *
 * 규칙 (나라를 몰라도 글자를 잃지 않는 것이 첫째):
 *  1. 쉼표·줄바꿈으로 자른다.
 *  2. 맨 끝 조각이 나라 이름·코드면 나라로 뺀다.
 *  3. 뒤에서부터 우편번호를 찾는다(첫 조각은 번지일 수 있어 보지 않음).
 *     - 우편번호 조각의 나머지 글자: 뒤에 조각이 더 있으면 도시(«50490 Kuala Lumpur»),
 *       없고 대문자 약자면 주(«CA 94105»), 아니면 도시(«London SW1A 2AA»).
 *     - 우편번호 뒤 조각 = 주. 도시를 아직 못 정했으면 우편번호 앞 조각 = 도시.
 *  4. 우편번호가 없으면 끝에서 주·도시를 하나씩(조각이 3개 이상일 때만).
 *  5. 남은 앞 조각: 3개 이상이면 마지막 하나(동네)는 주소 2줄, 나머지는 주소 1줄.
 * 나눌 수 없는 주소(쉼표 없는 한국·일본식 등)는 통째로 주소 1줄에 둔다.
 */

const COUNTRY_ALIASES: Record<string, string> = {
  'MALAYSIA': 'MY', 'SINGAPORE': 'SG', 'KOREA': 'KR', 'SOUTH KOREA': 'KR', 'REPUBLIC OF KOREA': 'KR',
  'USA': 'US', 'U.S.A.': 'US', 'UNITED STATES': 'US', 'UK': 'GB', 'U.K.': 'GB', 'ENGLAND': 'GB',
  'UAE': 'AE', 'CHINA': 'CN', 'HONG KONG': 'HK', 'TAIWAN': 'TW', 'VIETNAM': 'VN', 'INDONESIA': 'ID',
  'THAILAND': 'TH', 'PHILIPPINES': 'PH', 'JAPAN': 'JP', 'AUSTRALIA': 'AU', 'INDIA': 'IN', 'CANADA': 'CA',
  '대한민국': 'KR', '한국': 'KR', '말레이시아': 'MY', '싱가포르': 'SG', '中国': 'CN', '日本': 'JP', /* i18n-ok: 화면 문구가 아니라 붙여 넣은 주소에서 나라를 알아보는 낱말이다 — 번역하면 인식이 깨진다 */
};

function detectCountry(token: string): string | null {
  const t = token.trim();
  if (!t) return null;
  const up = t.toUpperCase();
  if (COUNTRY_ALIASES[up]) return COUNTRY_ALIASES[up];
  if (/^[A-Z]{2}$/.test(t) && countries.isValid(t)) return t;
  for (const loc of ['en', 'ms', 'ko', 'zh']) {
    const code = countries.getAlpha2Code(t, loc);
    if (code) return code;
  }
  return null;
}

// 우편번호 모양 (조각 안 어디든). 나라를 알면 그 나라 모양을 먼저.
const POSTAL_BY_COUNTRY: Record<string, RegExp> = {
  MY: /\b\d{5}\b/, KR: /\b\d{5}\b/, SG: /\b\d{6}\b/, JP: /\b\d{3}-\d{4}\b/, US: /\b\d{5}(?:-\d{4})?\b/,
  GB: /\b[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}\b/i, AU: /\b\d{4}\b/, CN: /\b\d{6}\b/, TH: /\b\d{5}\b/,
  VN: /\b\d{6}\b/, ID: /\b\d{5}\b/, PH: /\b\d{4}\b/, IN: /\b\d{6}\b/, CA: /\b[A-Z]\d[A-Z]\s?\d[A-Z]\d\b/i,
  DE: /\b\d{5}\b/, FR: /\b\d{5}\b/, TW: /\b\d{3}(?:\d{2})?\b/,
};
const POSTAL_GENERIC: RegExp[] = [
  /\b[A-Z]{1,2}\d[A-Z\d]?\s\d[A-Z]{2}\b/,   // 영국
  /\b[A-Z]\d[A-Z]\s\d[A-Z]\d\b/,             // 캐나다
  /\b\d{3}-\d{4}\b/,                         // 일본
  /\b\d{5}-\d{4}\b/,                         // 미국 9자리
  /\b\d{4,6}\b/,                             // 대부분 나라
];

function findPostal(token: string, country: string | null): { postal: string; rest: string } | null {
  const pats = country && POSTAL_BY_COUNTRY[country] ? [POSTAL_BY_COUNTRY[country]] : POSTAL_GENERIC;
  for (const re of pats) {
    const m = token.match(re);
    if (m && m.index !== undefined) {
      const rest = (token.slice(0, m.index) + ' ' + token.slice(m.index + m[0].length)).replace(/\s+/g, ' ').trim();
      return { postal: m[0].toUpperCase(), rest };
    }
  }
  return null;
}

export interface ParsedAddress extends Address {}

export function parseAddressLine(input: string, knownCountry?: string | null): ParsedAddress {
  const tokens = String(input || '')
    .split(/[,\n\r]+/)
    .map(s => s.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  const out: ParsedAddress = {};
  if (tokens.length === 0) return out;

  // 2. 나라
  if (tokens.length > 1) {
    const c = detectCountry(tokens[tokens.length - 1]);
    if (c) { out.country = c; tokens.pop(); }
  }
  const country = (out.country || knownCountry || '').toUpperCase() || null;

  if (tokens.length === 1) { out.address = tokens[0]; return out; }

  // 3. 우편번호 (뒤에서부터 · 첫 조각 제외)
  let pIdx = -1;
  let found: { postal: string; rest: string } | null = null;
  for (let i = tokens.length - 1; i >= 1; i--) {
    found = findPostal(tokens[i], country);
    if (found) { pIdx = i; break; }
  }

  let head: string[];
  if (found) {
    out.postal_code = found.postal;
    const after = tokens.slice(pIdx + 1);
    head = tokens.slice(0, pIdx);
    if (found.rest) {
      if (after.length > 0) out.city = found.rest;
      else if (/^[A-Z]{2,3}$/.test(found.rest)) out.state = found.rest;
      else out.city = found.rest;
    }
    if (after.length > 0) out.state = after.join(', ');
    if (!out.city && head.length > 1) out.city = head.pop();
  } else {
    head = tokens.slice();
    if (head.length >= 3) { out.state = head.pop(); out.city = head.pop(); }
    else if (head.length === 2) { out.city = head.pop(); }
  }

  // 5. 주소 1줄·2줄
  if (head.length >= 3) {
    out.address_line_2 = head.pop();
  }
  out.address = head.join(', ');
  return out;
}
