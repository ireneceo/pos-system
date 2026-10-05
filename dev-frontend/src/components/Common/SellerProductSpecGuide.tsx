/**
 * 판매 상품 등록 폼의 «구매자가 보는 문장» 과 칸 설명 — 브랜드·공급업체 폼이 **같이** 쓴다
 * (2026-10-05 Fable 설계 §4-C · Irene 「완전 쉽게 알 수 없어?」).
 *
 * 정식 명칭(취급단위·취급 기준숫자·기준단위(포장)·가격 — docs/TRADE_STRUCTURE.md §2-2)은 바꾸지 않는다.
 * 칸마다 쉬운 설명 한 줄 + 전부 합친 미리보기 문장 «구매자는 1 pack = 45 g 을 RM 4.50 에, 22 pack 부터 담습니다» 를 더한다.
 * 규격 문구 규칙은 utils/unitConversion (sellerOrderUnitOf · sellerSpecText) 하나 — 여기서 새로 만들지 않는다.
 * 번역 키는 common:sellerProduct.* 한 벌(두 폼의 네임스페이스가 brand / supplier 로 달라서 공용 네임스페이스에 둔다).
 */
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { sellerOrderUnitOf, sellerSpecText, formatQuantity, parseMinOrderQty } from '../../utils/unitConversion';

export interface SellerSpecFields {
  unit?: string | null;
  base_quantity?: string | number | null;
  package_unit?: string | null;
  order_mode?: string | null;
  unit_price?: string | number | null;
  min_order_quantity?: string | number | null;
}

/** 금액 표기 — 소수 둘째 자리까지, 그보다 작은 단가(RM 0.0045/g)는 넷째 자리까지 */
const money = (n: number): string => {
  if (!Number.isFinite(n)) return '0.00';
  if (n !== 0 && Math.abs(n) < 0.01) return n.toFixed(4).replace(/0+$/, '');
  return n.toFixed(2);
};

export function sellerSpecParts(f: SellerSpecFields) {
  const measure = f.order_mode === 'measure';
  const unit = String(f.unit || '').trim();
  const base = Number(f.base_quantity) > 0 ? Number(f.base_quantity) : 1;
  const seller = { seller_unit: unit, base_quantity: base, seller_package_unit: f.package_unit, order_mode: f.order_mode };
  const orderUnit = sellerOrderUnitOf(seller, unit) || unit;
  // «45 g/pack» 처럼 용량 문구가 있을 때만 «1 pack = 45 g» 을 말한다(«1 kg/kg» 같은 반복은 접는다 — 같은 규칙)
  const hasContent = !measure && !!sellerSpecText(seller, unit);
  const content = hasContent ? `${formatQuantity(base)} ${unit}` : '';
  const price = Number(f.unit_price);
  const min = parseMinOrderQty(f.min_order_quantity);
  return { measure, unit, base, orderUnit, hasContent, content, price: Number.isFinite(price) ? price : 0, min };
}

/** 폼이 쓰는 라벨·설명 문자열 — 컴포넌트 최상단에서 부를 것(훅) */
export function useSellerSpecCopy(f: SellerSpecFields) {
  const { t } = useTranslation('common');
  const p = sellerSpecParts(f);
  const ou = p.orderUnit || t('sellerProduct.unitFallback', 'unit');
  const priceText = `RM ${money(p.price)}`;

  let summary: string;
  if (!p.unit || !(p.price > 0)) {
    summary = t('sellerProduct.summary.needFields', 'Fill in the unit and price to see what buyers will see.');
  } else if (p.measure) {
    summary = t('sellerProduct.summary.measure', {
      defaultValue: 'Buyers order by {{unit}} at {{price}} per {{unit}}, from {{min}} {{unit}}.',
      unit: p.unit, price: priceText, min: formatQuantity(p.min) });
  } else if (p.hasContent) {
    summary = t('sellerProduct.summary.pack', {
      defaultValue: 'Buyers order 1 {{orderUnit}} = {{content}} at {{price}}, from {{min}} {{orderUnit}}.',
      orderUnit: ou, content: p.content, price: priceText, min: formatQuantity(p.min) });
  } else {
    summary = t('sellerProduct.summary.packPlain', {
      defaultValue: 'Buyers order by {{orderUnit}} at {{price}} each, from {{min}} {{orderUnit}}.',
      orderUnit: ou, price: priceText, min: formatQuantity(p.min) });
  }

  const specPreview = p.measure
    ? t('sellerProduct.spec.measurePreview', { defaultValue: 'Buyers order in {{unit}} directly.', unit: p.unit || 'kg' })
    : p.hasContent ? `1 ${ou} = ${p.content}` : (p.unit ? `1 ${ou}` : '');

  const priceLabel = p.measure
    ? t('sellerProduct.price.labelMeasure', { defaultValue: 'Price of 1 {{unit}} (RM)', unit: p.unit || 'kg' })
    : t('sellerProduct.price.label', { defaultValue: 'Price of 1 {{orderUnit}} (RM)', orderUnit: ou });
  const priceMeaning = !p.unit
    ? t('sellerProduct.price.needUnit', 'Choose a unit to see what this price covers')
    : p.hasContent && p.price > 0
      ? t('sellerProduct.price.meaningContent', {
          defaultValue: '{{price}} / {{orderUnit}} ({{content}} · RM {{per}}/{{unit}})',
          price: priceText, orderUnit: ou, content: p.content, per: money(p.price / p.base), unit: p.unit })
      : t('sellerProduct.price.meaningPlain', { defaultValue: '{{price}} / {{orderUnit}}', price: priceText, orderUnit: p.measure ? p.unit : ou });

  const minHint = p.min === 1
    ? t('sellerProduct.min.hintNone', 'Leave at 1 for no minimum.')
    : p.measure
      ? t('sellerProduct.min.hintMeasure', { defaultValue: 'Buyers cannot order less than {{min}} {{unit}}. Above that, any amount.', min: formatQuantity(p.min), unit: p.unit || 'kg' })
      : t('sellerProduct.min.hint', { defaultValue: 'Buyers cannot order less than {{min}} {{orderUnit}}. Above that they can add 1 {{orderUnit}} at a time.', min: formatQuantity(p.min), orderUnit: ou });

  return {
    parts: p,
    orderUnit: p.measure ? (p.unit || '') : ou,
    summary,
    specPreview,
    priceLabel,
    priceMeaning,
    minLabel: t('sellerProduct.min.label', 'Minimum order quantity') as string,
    minHint,
    orderModeQuestion: t('sellerProduct.orderModeQuestion', 'How do buyers order this?') as string,
    specTitle: t('sellerProduct.spec.title', 'One package') as string,
    specHint: t('sellerProduct.spec.hint', 'Unit = what is inside the package (g, kg, ml, L, piece). Package unit = the name buyers count (pack, box).') as string,
    baseQuantityLabel: t('sellerProduct.fields.baseQuantity', 'Base quantity') as string,
    unitLabel: t('sellerProduct.fields.unit', 'Unit (content)') as string,
    packageUnitLabel: t('sellerProduct.fields.packageUnit', 'Package unit') as string,
    stockLabel: t('sellerProduct.stock.label', { defaultValue: 'Current stock (number of {{orderUnit}})', orderUnit: p.measure ? (p.unit || 'kg') : ou }) as string,
    stockHint: t('sellerProduct.stock.hint', { defaultValue: 'Sold as-is (no recipe). Count it in {{orderUnit}} — the same unit buyers order.', orderUnit: p.measure ? (p.unit || 'kg') : ou }) as string,
    summaryTitle: t('sellerProduct.summary.title', 'What buyers see') as string,
  };
}

const SummaryBox = styled.div`
  margin-bottom: 16px;
  padding: 12px 14px;
  border: 1px solid #C7D2FE;
  background: #F5F3FF;
  border-radius: 8px;
  .k { font-size: 11px; font-weight: 600; color: #4C42E6; margin-bottom: 4px; }
  .v { font-size: 14px; font-weight: 600; color: #0A2540; line-height: 1.45; }
`;

/** 맨 위 고정 «구매자가 보는 문장» — 칸을 바꾸면 즉시 갱신된다 */
export const SellerSpecSummary: React.FC<{ title: string; text: string }> = ({ title, text }) => (
  <SummaryBox aria-live="polite">
    <div className="k">{title}</div>
    <div className="v">{text}</div>
  </SummaryBox>
);
