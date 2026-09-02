/**
 * 원가·가격 "미설정" 표시 단일 규칙 (2026-09-02).
 *
 * 0 은 **"정말 0원"이 아니라 안 넣은 것**이다. 숫자로 찍으면 둘이 구분되지 않아
 * 그대로 발주·레시피 원가에 들어간다(운영 실측: 원가 0 인 재료 99건, 단가 0 인 활성 링크 100건).
 * 규칙을 화면마다 따로 적으면 곧 갈라지므로 여기 한 곳에 둔다 —
 * 실제로 이번에 RA 화면에만 넣고 BG 화면을 빠뜨려 한 번 갈라졌다.
 */
import { formatCurrency } from './currency';

/** 값이 있으면 통화 표기, 0·null 이면 "미설정" 문구(호출부가 i18n 으로 넘긴다). */
export function costOrNotSet(
  value: number | string | null | undefined,
  currency: string,
  notSetLabel: string,
  unit?: string | null,
): string {
  const n = Number(value);
  if (!(n > 0)) return notSetLabel;
  return unit ? `${formatCurrency(n, currency)}/${unit}` : formatCurrency(n, currency);
}

/** 0 인지(=미설정인지) 판정만 필요할 때. 배지 색·강조 분기에 쓴다. */
export function isCostNotSet(value: number | string | null | undefined): boolean {
  return !(Number(value) > 0);
}
