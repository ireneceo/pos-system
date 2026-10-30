/**
 * 매장 비교 표 — 오너 «Store Comparison» · 브랜드 «Store Profitability» 공용 (설계 §6-3 · §6-4)
 * 위: 규칙 기반 세 문장(가장 좋은 매장 · 가장 나쁜 매장 · 가장 벌어진 지표) → 표(셀 = 판정색 + 글씨).
 * 1단계 열: 순매출 · 공헌이익률 · 식재료비율(이론) · 객단가 · 준비도. 인건비·임대·영업이익 열은 2단계(브랜드에는 공유한 매장만 — Q1-A).
 */
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DataTableContainer, DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, DataTableEmpty } from '../../components/UI/DataTable';
import { StoreRow } from './profitabilityApi';
import { Card, Muted, Dot, COLORS, money, pctText, deltaPct, foodCostTone, Tone } from './profitabilityUi';

interface Props {
  rows: StoreRow[];
  /** 매장 화면으로 들어갈 수 있나(Brand Manager 는 매장 단위 화면 권한이 없다) */
  linkable: boolean;
  /** 금액 칸 가림(Brand Manager) */
  redacted?: boolean;
  start: string;
  end: string;
  /** 브랜드 평균 줄 */
  showAverage?: boolean;
  /** 매장 화면 주소 앞부분(역할마다 자기 허용 경로) — 예: /pos/owner/profitability/store */
  storeBase?: string;
}

type SortKey = 'name' | 'net_sales' | 'contribution_pct' | 'food_cost_pct' | 'avg_ticket' | 'costed_sales_pct';

const TINT: Record<Tone, string> = { good: '#ECFDF5', warn: '#FFFBEB', bad: '#FEF2F2', none: 'transparent' };
const Cell = styled.span<{ tone: Tone }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 8px;
  border-radius: 6px;
  background: ${p => TINT[p.tone]};
  font-variant-numeric: tabular-nums;
`;
const SortHead = styled.span`
  cursor: pointer;
  user-select: none;
  &:hover { color: ${COLORS.primary}; }
`;
const Lines = styled.ul`
  margin: 0;
  padding-left: 18px;
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
`;

const coverTone = (v: number | null | undefined): Tone => (v === null || v === undefined ? 'none' : v >= 80 ? 'good' : v >= 50 ? 'warn' : 'bad');
const mean = (vals: Array<number | null | undefined>) => {
  const v = vals.filter((x): x is number => typeof x === 'number');
  return v.length ? Math.round((v.reduce((s, x) => s + x, 0) / v.length) * 10) / 10 : null;
};

const StoreComparison: React.FC<Props> = ({ rows, linkable, redacted, start, end, showAverage, storeBase }) => {
  const { t } = useTranslation('profitability');
  const navigate = useNavigate();
  const [sort, setSort] = useState<SortKey>('net_sales');
  const [desc, setDesc] = useState(true);

  const live = rows.filter(r => !r.module_missing && !r.error);
  const off = rows.filter(r => r.module_missing || r.error);

  const sorted = useMemo(() => [...live].sort((a, b) => {
    const va = (a as any)[sort]; const vb = (b as any)[sort];
    if (sort === 'name') return (desc ? -1 : 1) * String(va || '').localeCompare(String(vb || ''));
    const na = typeof va === 'number' ? va : -Infinity; const nb = typeof vb === 'number' ? vb : -Infinity;
    return desc ? nb - na : na - nb;
  }), [live, sort, desc]);

  const head = (k: SortKey, label: string) => (
    <SortHead role="button" tabIndex={0} onClick={() => { if (sort === k) setDesc(!desc); else { setSort(k); setDesc(k !== 'food_cost_pct'); } }}
      onKeyDown={e => { if (e.key === 'Enter') { setSort(k); setDesc(!desc); } }}>
      {label}{sort === k ? (desc ? ' ▼' : ' ▲') : ''}
    </SortHead>
  );

  // 위 세 문장 — 규칙 기반, 숫자 포함(§6-3)
  const lines = useMemo(() => {
    const out: string[] = [];
    const withCon = live.filter(r => typeof r.contribution_pct === 'number');
    if (withCon.length >= 2) {
      const best = withCon.reduce((a, b) => ((b.contribution_pct || 0) > (a.contribution_pct || 0) ? b : a));
      const worst = withCon.reduce((a, b) => ((b.contribution_pct || 0) < (a.contribution_pct || 0) ? b : a));
      out.push(t('compare.best', '{{name}} leaves the most per sale: {{pct}} contribution margin.', { name: best.name, pct: pctText(best.contribution_pct) }));
      out.push(t('compare.worst', '{{name}} leaves the least: {{pct}}.', { name: worst.name, pct: pctText(worst.contribution_pct) }));
    }
    const fc = live.filter(r => typeof r.food_cost_pct === 'number');
    if (fc.length >= 2) {
      const hi = fc.reduce((a, b) => ((b.food_cost_pct || 0) > (a.food_cost_pct || 0) ? b : a));
      const lo = fc.reduce((a, b) => ((b.food_cost_pct || 0) < (a.food_cost_pct || 0) ? b : a));
      out.push(t('compare.gap', 'Food cost spreads from {{lo}} ({{loName}}) to {{hi}} ({{hiName}}) — a {{d}}%p gap.', {
        lo: pctText(lo.food_cost_pct), loName: lo.name, hi: pctText(hi.food_cost_pct), hiName: hi.name,
        d: (Math.round(((hi.food_cost_pct || 0) - (lo.food_cost_pct || 0)) * 10) / 10).toFixed(1),
      }));
    }
    if (!out.length) out.push(t('compare.notEnough', 'Comparisons appear once at least two stores have menus with cost. Low readiness below shows where recipes are missing.'));
    return out;
  }, [live, t]);

  const open = (r: StoreRow) => { if (linkable && storeBase) navigate(`${storeBase}/${r.restaurant_id}${start && end ? `?start=${start}&end=${end}` : ''}`); };

  const avg = showAverage && live.length ? {
    contribution_pct: mean(live.map(r => r.contribution_pct)),
    food_cost_pct: mean(live.map(r => r.food_cost_pct)),
    costed_sales_pct: mean(live.map(r => r.costed_sales_pct)),
  } : null;

  return (
    <>
      <Card>
        <Lines>{lines.map(l => <li key={l}>{l}</li>)}</Lines>
      </Card>
      <Card>
        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">{head('name', t('compare.colStore', 'Store'))}</DataTableHeaderCell>
                {!redacted && <DataTableHeaderCell align="right">{head('net_sales', t('compare.colSales', 'Net sales'))}</DataTableHeaderCell>}
                <DataTableHeaderCell align="right">{head('contribution_pct', t('compare.colContribution', 'Contribution margin'))}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{head('food_cost_pct', t('compare.colFood', 'Food cost (theoretical)'))}</DataTableHeaderCell>
                {!redacted && <DataTableHeaderCell align="right">{head('avg_ticket', t('compare.colTicket', 'Avg ticket'))}</DataTableHeaderCell>}
                <DataTableHeaderCell align="right">{head('costed_sales_pct', t('compare.colReady', 'Sales with cost'))}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {sorted.map(r => {
                const sD = deltaPct(r.net_sales, r.previous?.net_sales);
                const sTone: Tone = sD.diff === null ? 'none' : sD.diff >= 0 ? 'good' : sD.diff > -10 ? 'warn' : 'bad';
                const cDiff = typeof r.contribution_pct === 'number' && typeof r.previous?.contribution_pct === 'number' ? r.contribution_pct - r.previous.contribution_pct : null;
                const cTone: Tone = cDiff === null ? 'none' : cDiff >= 0 ? 'good' : cDiff > -3 ? 'warn' : 'bad';
                const fTone = foodCostTone(r.food_cost_pct, r.targets?.food_cost_pct ?? 35);
                return (
                  <DataTableRow key={r.restaurant_id} onClick={() => open(r)} style={{ cursor: linkable ? 'pointer' : 'default' }}>
                    <DataTableCell data-label={t('compare.colStore', 'Store')} mobileFullWidth>
                      <strong style={{ color: linkable ? COLORS.primary : COLORS.ink }}>{r.name}</strong>
                      <Muted>{t('kpi.orders', '{{n}} orders', { n: r.orders ?? 0 })} · {t('readiness.menuCost', 'Menus with cost {{n}}/{{total}}', { n: r.readiness?.menus_costed ?? 0, total: r.readiness?.menus_total ?? 0 })}</Muted>
                    </DataTableCell>
                    {!redacted && (
                      <DataTableCell data-label={t('compare.colSales', 'Net sales')} align="right">
                        <Cell tone={sTone}>{money(r.net_sales, r.currency || 'MYR')}{sD.text && <small>{sD.text}</small>}</Cell>
                      </DataTableCell>
                    )}
                    <DataTableCell data-label={t('compare.colContribution', 'Contribution margin')} align="right">
                      <Cell tone={cTone}><Dot tone={cTone} />{pctText(r.contribution_pct)}</Cell>
                    </DataTableCell>
                    <DataTableCell data-label={t('compare.colFood', 'Food cost (theoretical)')} align="right">
                      <Cell tone={fTone}><Dot tone={fTone} />{pctText(r.food_cost_pct)}</Cell>
                    </DataTableCell>
                    {!redacted && <DataTableCell data-label={t('compare.colTicket', 'Avg ticket')} align="right">{money(r.avg_ticket, r.currency || 'MYR')}</DataTableCell>}
                    <DataTableCell data-label={t('compare.colReady', 'Sales with cost')} align="right">
                      <Cell tone={coverTone(r.costed_sales_pct)}><Dot tone={coverTone(r.costed_sales_pct)} />{pctText(r.costed_sales_pct)}</Cell>
                    </DataTableCell>
                  </DataTableRow>
                );
              })}
              {avg && (
                <DataTableRow>
                  <DataTableCell data-label={t('compare.colStore', 'Store')} mobileFullWidth><strong>{t('compare.average', 'Brand average')}</strong><Muted>{t('compare.averageHint', 'Simple average of stores')}</Muted></DataTableCell>
                  {!redacted && <DataTableCell data-label={t('compare.colSales', 'Net sales')} align="right">—</DataTableCell>}
                  <DataTableCell data-label={t('compare.colContribution', 'Contribution margin')} align="right">{pctText(avg.contribution_pct)}</DataTableCell>
                  <DataTableCell data-label={t('compare.colFood', 'Food cost (theoretical)')} align="right">{pctText(avg.food_cost_pct)}</DataTableCell>
                  {!redacted && <DataTableCell data-label={t('compare.colTicket', 'Avg ticket')} align="right">—</DataTableCell>}
                  <DataTableCell data-label={t('compare.colReady', 'Sales with cost')} align="right">{pctText(avg.costed_sales_pct)}</DataTableCell>
                </DataTableRow>
              )}
            </tbody>
          </DataTable>
          {live.length === 0 && <DataTableEmpty>{t('compare.empty', 'No stores to compare.')}</DataTableEmpty>}
        </DataTableContainer>
        <Muted style={{ marginTop: 8 }}>
          {linkable ? t('compare.clickHint', 'Click a store to see its menus, order mix and simulator.') : ''}
          {redacted ? ` ${t('compare.redacted', 'Amounts are hidden for brand managers; ratios are shown.')}` : ''}
          {' '}{t('compare.basis', 'Server totals for completed orders, staff meals excluded — may differ slightly from the sales report screens.')}
        </Muted>
        {off.length > 0 && <Muted style={{ marginTop: 6 }}>{t('compare.off', 'Not in plan: {{names}}', { names: off.map(r => r.name || `#${r.restaurant_id}`).join(', ') })}</Muted>}
      </Card>
    </>
  );
};

export default StoreComparison;
