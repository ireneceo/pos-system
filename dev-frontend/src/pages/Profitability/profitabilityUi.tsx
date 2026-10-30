/**
 * 수익성 분석 화면 공용 모양·규칙 — 설계 §6-1 «보기만 해도 알게» 6규칙
 *   ① 숫자 하나에 판정 하나(점 + 글씨) ② 기준 없이 숫자 없음 ③ 준비도 띠 ④ 추정은 추정이라고
 * 표·버튼·창은 공용 컴포넌트, 여기는 카드·판정 점·띠 배치만.
 */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../utils/currency';
import { Readiness } from './profitabilityApi';

export const COLORS = {
  good: '#10B981',
  warn: '#F59E0B',
  bad: '#EF4444',
  none: '#9CA3AF',
  primary: '#635BFF',
  ink: '#0A2540',
  muted: '#6B7280',
  line: '#E5E7EB',
} as const;

export type Tone = 'good' | 'warn' | 'bad' | 'none';

export const Card = styled.div`
  background: #FFFFFF;
  border: 1px solid ${COLORS.line};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  @media (max-width: 768px) { padding: 14px; }
`;

export const CardTitle = styled.h3`
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 600;
  color: ${COLORS.ink};
`;

export const Muted = styled.div`
  color: ${COLORS.muted};
  font-size: 13px;
  line-height: 1.5;
`;

export const Row = styled.div<{ gap?: number }>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${p => p.gap ?? 12}px;
`;

export const Grid = styled.div<{ cols?: number }>`
  display: grid;
  grid-template-columns: repeat(${p => p.cols || 4}, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;
  @media (max-width: 1024px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
`;

export const ErrorBox = styled.div`
  padding: 12px 14px;
  border-radius: 8px;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #B91C1C;
  font-size: 13px;
  margin-bottom: 16px;
`;

export const Dot = styled.span<{ tone: Tone }>`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex: none;
  background: ${p => COLORS[p.tone]};
`;

export const EstimateTag = styled.span`
  display: inline-block;
  margin-left: 6px;
  padding: 1px 6px;
  border-radius: 999px;
  background: #F3F4F6;
  color: #4B5563;
  font-size: 11px;
  font-weight: 600;
  vertical-align: middle;
`;

const Kpi = styled.div<{ tone: Tone }>`
  background: #FFFFFF;
  border: 1px solid ${COLORS.line};
  border-left: 4px solid ${p => COLORS[p.tone]};
  border-radius: 12px;
  padding: 16px;
  min-width: 0;
`;
const KpiLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${COLORS.muted};
  text-transform: uppercase;
  letter-spacing: 0.02em;
`;
const KpiValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${COLORS.ink};
  margin: 6px 0 4px;
  font-variant-numeric: tabular-nums;
  overflow-wrap: anywhere;
`;
const KpiWhy = styled.div`
  display: flex;
  gap: 6px;
  align-items: flex-start;
  font-size: 12px;
  color: #374151;
  line-height: 1.45;
  & > span:first-child { margin-top: 3px; }
`;

/** 큰 숫자 + 판정 점 + «왜» 한 줄 (§6-1 ①②) */
export const KpiCard: React.FC<{ label: string; value: string; tone: Tone; why: string; tag?: string }> = ({ label, value, tone, why, tag }) => (
  <Kpi tone={tone}>
    <KpiLabel>{label}{tag && <EstimateTag>{tag}</EstimateTag>}</KpiLabel>
    <KpiValue>{value}</KpiValue>
    <KpiWhy><Dot tone={tone} /><span>{why}</span></KpiWhy>
  </Kpi>
);

export const money = (v: number | null | undefined, currency: string) => (v === null || v === undefined ? '—' : formatCurrency(v, currency));
export const pctText = (v: number | null | undefined) => (v === null || v === undefined ? '—' : `${v.toFixed(1)}%`);

/** 비율 차이(%p) 글리프 — ▲ / ▼ / = */
export const deltaPp = (cur: number | null | undefined, prev: number | null | undefined): { text: string; diff: number | null } => {
  if (cur === null || cur === undefined || prev === null || prev === undefined) return { text: '', diff: null };
  const d = Math.round((cur - prev) * 10) / 10;
  return { text: d === 0 ? '= 0.0%p' : `${d > 0 ? '▲' : '▼'} ${Math.abs(d).toFixed(1)}%p`, diff: d };
};

/** 금액 차이(%) — 전 기간 0 이면 비교 없음 */
export const deltaPct = (cur: number | null | undefined, prev: number | null | undefined): { text: string; diff: number | null } => {
  if (cur === null || cur === undefined || !prev) return { text: '', diff: null };
  const d = Math.round(((cur - prev) / prev) * 1000) / 10;
  return { text: d === 0 ? '= 0.0%' : `${d > 0 ? '▲' : '▼'} ${Math.abs(d).toFixed(1)}%`, diff: d };
};

/** 원가율 판정 — 목표 이하 좋음 · 목표+5%p 까지 주의 · 넘으면 나쁨 */
export const foodCostTone = (v: number | null | undefined, target: number): Tone =>
  v === null || v === undefined ? 'none' : v <= target ? 'good' : v <= target + 5 ? 'warn' : 'bad';

/** 비율 추세 판정 — 올랐거나 같으면 좋음 · 3%p 미만 하락 주의 · 그 이상 나쁨 */
export const trendToneUp = (diff: number | null, badAt = 3): Tone => (diff === null ? 'none' : diff >= 0 ? 'good' : diff > -badAt ? 'warn' : 'bad');

/** 준비도 띠 한 칸 판정 */
const coverageTone = (v: number | null): Tone => (v === null ? 'none' : v >= 80 ? 'good' : v >= 50 ? 'warn' : 'bad');

const Band = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid ${COLORS.line};
  border-radius: 12px;
  background: #F9FAFB;
  margin-bottom: 16px;
  font-size: 13px;
  color: #374151;
`;
const BandItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  & a { color: ${COLORS.primary}; font-weight: 600; text-decoration: none; }
  & a:hover { text-decoration: underline; }
`;

/**
 * 준비도 띠 (§6-1 ③) — 숫자가 비어 보이는 이유와 그 자리에서 할 일.
 * 다른 화면 링크(레시피·실사)는 매장 관리자만(오너·브랜드는 그 화면 권한이 없어 글씨만) · 설정 링크는 설정을 여는 사람(매장·오너)에게.
 */
export const ReadinessBand: React.FC<{ r: Readiness; restaurantId: string | number; showLinks: boolean; onOpenSettings?: () => void }> = ({ r, restaurantId, showLinks, onOpenSettings }) => {
  const { t } = useTranslation('profitability');
  const go = (to: string, label: string) => (showLinks ? <Link to={to}>{label}</Link> : null);
  const settingsLink = (label: string) => (onOpenSettings ? <a href="#settings" onClick={e => { e.preventDefault(); onOpenSettings(); }}>{label}</a> : null);
  return (
    <Band aria-label={t('readiness.title', 'Data readiness')}>
      <strong style={{ color: COLORS.ink }}>{t('readiness.title', 'Data readiness')}</strong>
      <BandItem>
        <Dot tone={coverageTone(r.menu_cost_pct)} />
        {t('readiness.menuCost', 'Menus with cost {{n}}/{{total}}', { n: r.menus_costed, total: r.menus_total })}
        {(r.menu_cost_pct ?? 0) < 100 && go(`/restaurant/${restaurantId}/recipe-management`, t('readiness.linkRecipes', 'Link recipes'))}
      </BandItem>
      <BandItem>
        <Dot tone={coverageTone(r.costed_sales_pct)} />
        {t('readiness.costedSales', 'Sales with known cost {{pct}}', { pct: pctText(r.costed_sales_pct) })}
      </BandItem>
      <BandItem>
        <Dot tone={r.last_stock_take ? 'good' : 'none'} />
        {r.last_stock_take ? t('readiness.lastStockTake', 'Last stock take {{date}}', { date: r.last_stock_take }) : t('readiness.noStockTake', 'No stock take yet')}
        {!r.last_stock_take && go(`/restaurant/${restaurantId}/stock-take`, t('readiness.linkStockTake', 'Start one'))}
      </BandItem>
      <BandItem>
        <Dot tone={r.fees_configured ? 'good' : 'warn'} />
        {r.fees_configured ? t('readiness.feesSet', 'Payment fees set') : t('readiness.feesUnset', 'Payment fees not set (counted as 0)')}
        {!r.fees_configured && settingsLink(t('readiness.linkSettings', 'Set fees'))}
      </BandItem>
      <BandItem>
        <Dot tone={r.cost_rules > 0 ? 'good' : 'none'} />
        {r.cost_rules > 0 ? t('readiness.rulesSet', 'Operating cost rules {{n}}', { n: r.cost_rules }) : t('readiness.rulesUnset', 'No rent / cost rules')}
        {r.cost_rules === 0 && settingsLink(t('readiness.linkRules', 'Add rules'))}
      </BandItem>
    </Band>
  );
};
