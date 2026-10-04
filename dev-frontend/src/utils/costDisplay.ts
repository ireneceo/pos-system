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

/**
 * 재료 원가 표기 (2026-10-04 Fable 판정 E · TRADE_STRUCTURE §2-2).
 * 원가 값의 뜻 = **기준양(base_quantity)의 가격** — 브랜드 원가·매장 원가(My Cost) 모두.
 * 예전엔 «RM 34.90/g» 로 그려 1 kg 값이 g 값처럼 보였다(Irene 이 본 그 화면). 이제
 * «RM 34.90 / 1000 g · g 당 RM 0.0349» — 기준양이 1 이면 «RM 5.00 / 1 kg» 만.
 * @param perUnitLabel 호출부 i18n — 예: t('ingredients.perUnit', '{{unit}} 당', { unit })
 */
export function costPerBaseText(
  value: number | string | null | undefined,
  currency: string,
  notSetLabel: string,
  item?: { unit?: string | null; base_quantity?: number | string | null } | null,
  perUnitLabel?: string,
): string {
  const n = Number(value);
  if (!(n > 0)) return notSetLabel;
  const unit = item?.unit || '';
  const bqRaw = Number(item?.base_quantity);
  const bq = Number.isFinite(bqRaw) && bqRaw > 0 ? bqRaw : 1;
  const head = unit ? `${formatCurrency(n, currency)} / ${bq} ${unit}` : formatCurrency(n, currency);
  if (bq === 1 || !unit) return head;
  // 단위당 값은 작다(0.0279) — 통화 기호는 공용 표기에서 가져오고 숫자만 4자리로 쓴다.
  const symbol = formatCurrency(0, currency).replace(/[\d.,\s]+$/, '');
  const per = Math.round((n / bq) * 10000) / 10000;
  return `${head} · ${perUnitLabel || unit} ${symbol} ${per}`;
}

