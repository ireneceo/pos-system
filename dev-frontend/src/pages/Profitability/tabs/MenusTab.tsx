/**
 * «어느 메뉴가 돈이 되나» — 메뉴 성과판 4분면 + 메뉴별 공헌이익 표 (설계 §3-7 · §6-2)
 * 결론(분면별 행동) → 그래프(산점도: 판매량 × 1개당 공헌이익, 크기 = 매출) → 표.
 * 원가는 «현재 레시피 기준» 하나(판매 당시 원가는 2단계). 원가 모르는 메뉴는 분면 밖 묶음으로 — 지우지 않는다.
 */
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Cell } from 'recharts';
import { DataTableContainer, DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, DataTableEmpty } from '../../../components/UI/DataTable';
import { Button } from '../../../components/UI/Button';
import { storeApi, periodQuery, MenusData, MenuRow, Quadrant } from '../profitabilityApi';
import { Card, CardTitle, Muted, Row, ErrorBox, Dot, EstimateTag, COLORS, money, pctText, Tone } from '../profitabilityUi';

interface Props { restaurantId: string; start: string; end: string; currency: string; canLinkRecipes: boolean }

const Q_ORDER: Quadrant[] = ['star', 'plowhorse', 'puzzle', 'dog'];
export const Q_COLOR: Record<Quadrant, string> = { star: COLORS.good, plowhorse: COLORS.warn, puzzle: COLORS.primary, dog: COLORS.bad, unknown: COLORS.none };
const Q_TONE: Record<Quadrant, Tone> = { star: 'good', plowhorse: 'warn', puzzle: 'good', dog: 'bad', unknown: 'none' };

const QuadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 16px;
  @media (max-width: 1024px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
`;
const QuadBox = styled.div<{ color: string; on: boolean }>`
  text-align: left;
  background: ${p => (p.on ? '#F5F3FF' : '#FFFFFF')};
  border: 1px solid ${p => (p.on ? p.color : COLORS.line)};
  border-top: 4px solid ${p => p.color};
  border-radius: 10px;
  padding: 12px;
  cursor: pointer;
  font: inherit;
  color: inherit;
  min-height: 44px;
`;
const QuadName = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: ${COLORS.ink};
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;
const ChartWrap = styled.div`
  height: 340px;
  @media (max-width: 768px) { display: none; }
`;
const PhoneNote = styled(Muted)`
  display: none;
  @media (max-width: 768px) { display: block; margin-bottom: 8px; }
`;
const TipBox = styled.div`
  background: #FFFFFF;
  border: 1px solid ${COLORS.line};
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 12px;
  color: #374151;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const MenusTab: React.FC<Props> = ({ restaurantId, start, end, currency, canLinkRecipes }) => {
  const { t } = useTranslation('profitability');
  const [data, setData] = useState<MenusData | null>(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Quadrant | null>(null);

  useEffect(() => {
    if (!start || !end) return;
    let live = true;
    storeApi<MenusData>(restaurantId, `/menus${periodQuery(start, end)}`).then(r => {
      if (!live) return;
      if (!r.ok) { setError(r.message || t('errors.load', 'Could not load')); return; }
      setError(''); setData(r.data);
    });
    return () => { live = false; };
  }, [restaurantId, start, end, t]);

  const qLabel = (q: Quadrant) => t(`quadrant.${q}.name`, { star: 'Stars', plowhorse: 'Plowhorses', puzzle: 'Puzzles', dog: 'Dogs', unknown: 'No cost yet' }[q]);
  const qHint = (q: Quadrant) => t(`quadrant.${q}.hint`, {
    star: 'Sell a lot, earn a lot — keep them visible',
    plowhorse: 'Sell a lot, earn little — review price, portion or set',
    puzzle: 'Earn a lot, sell little — better spot, photo, staff tip',
    dog: 'Sell little, earn little — remove or change the recipe',
    unknown: 'Link a recipe to place it',
  }[q]);

  const counts = useMemo(() => {
    const c: Record<Quadrant, number> = { star: 0, plowhorse: 0, puzzle: 0, dog: 0, unknown: 0 };
    (data?.menus || []).forEach(m => { c[m.quadrant] += 1; });
    return c;
  }, [data]);

  if (error) return <ErrorBox>{error}</ErrorBox>;
  if (!data) return <Muted>{t('common.loading', 'Loading…')}</Muted>;

  const costed = data.menus.filter(m => m.quadrant !== 'unknown');
  const unknown = data.menus.filter(m => m.quadrant === 'unknown');
  const rows = data.menus.filter(m => (filter ? m.quadrant === filter : m.quadrant !== 'unknown'));
  const maxSales = Math.max(1, ...costed.map(m => m.net_sales || 0));

  const Tip: React.FC<any> = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    const m: MenuRow = payload[0].payload;
    return (
      <TipBox>
        <div style={{ fontWeight: 700, color: COLORS.ink }}>{m.name}</div>
        <div>{t('menus.tipQty', 'Sold {{n}}', { n: m.quantity })} · {qLabel(m.quadrant)}</div>
        <div>{t('menus.tipUnit', 'Left per sale {{v}}', { v: money(m.unit_contribution, currency) })} · {pctText(m.contribution_pct)}</div>
        <div>{t('menus.tipSales', 'Net sales {{v}}', { v: money(m.net_sales, currency) })}</div>
      </TipBox>
    );
  };

  return (
    <>
      <QuadGrid>
        {Q_ORDER.map(q => (
          <QuadBox key={q} color={Q_COLOR[q]} on={filter === q} role="button" tabIndex={0} aria-pressed={filter === q}
            onClick={() => setFilter(filter === q ? null : q)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFilter(filter === q ? null : q); } }}>
            <QuadName><span>{qLabel(q)}</span><span>{counts[q]}</span></QuadName>
            <Muted>{qHint(q)}</Muted>
          </QuadBox>
        ))}
      </QuadGrid>

      <Card>
        <CardTitle>{t('menus.chartTitle', 'Sold vs. left per sale')}<EstimateTag>{t('tags.currentRecipe', 'Current recipe cost')}</EstimateTag></CardTitle>
        <Muted style={{ marginBottom: 8 }}>
          {costed.length
            ? t('menus.chartLines', 'Lines = median of {{n}} menus with cost: {{qty}} sold · {{unit}} left per sale. Dot size = net sales.', { n: costed.length, qty: data.qty_line ?? '—', unit: money(data.contribution_line, currency) })
            : t('menus.noCosted', 'No sold menu has a cost yet, so the matrix is empty. Link recipes (or set a cost) to place menus.')}
        </Muted>
        <PhoneNote>{t('menus.phoneNote', 'On a phone the matrix is shown as the list below — tap a group above to filter.')}</PhoneNote>
        {costed.length > 0 && (
          <ChartWrap>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, bottom: 24, left: 10 }}>
                <CartesianGrid stroke="#F1F4F8" />
                <XAxis type="number" dataKey="quantity" name={t('menus.colQty', 'Sold')} tick={{ fontSize: 12, fill: COLORS.muted }} stroke="#C7CED6"
                  label={{ value: t('menus.axisQty', 'Sold (qty)'), position: 'insideBottom', offset: -12, fontSize: 12, fill: COLORS.muted }} />
                <YAxis type="number" dataKey="unit_contribution" name={t('menus.colUnit', 'Left per sale')} tick={{ fontSize: 12, fill: COLORS.muted }} stroke="#C7CED6" width={56} />
                <ZAxis type="number" dataKey="net_sales" range={[60, 420]} domain={[0, maxSales]} />
                {data.qty_line !== null && <ReferenceLine x={data.qty_line} stroke="#9CA3AF" strokeDasharray="4 4" />}
                {data.contribution_line !== null && data.contribution_line !== undefined && <ReferenceLine y={data.contribution_line} stroke="#9CA3AF" strokeDasharray="4 4" />}
                <Tooltip content={<Tip />} cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={costed} isAnimationActive={false}>
                  {costed.map(m => <Cell key={m.key} fill={Q_COLOR[m.quadrant]} stroke="#FFFFFF" strokeWidth={2} fillOpacity={filter && filter !== m.quadrant ? 0.2 : 0.9} />)}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </ChartWrap>
        )}
      </Card>

      <Card>
        <Row style={{ marginBottom: 8 }}>
          <CardTitle style={{ margin: 0 }}>{filter ? qLabel(filter) : t('menus.tableTitle', 'Menus with cost')}</CardTitle>
          {filter && <Button variant="secondary" size="small" onClick={() => setFilter(null)}>{t('menus.clearFilter', 'Show all')}</Button>}
        </Row>
        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">{t('menus.colMenu', 'Menu')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('menus.colQty', 'Sold')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('menus.colSales', 'Net sales')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('menus.colCost', 'Cost / sale')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('menus.colUnit', 'Left per sale')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('menus.colContribution', 'Contribution')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('menus.colQuadrant', 'Group')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {rows.map(m => (
                <DataTableRow key={m.key}>
                  <DataTableCell data-label={t('menus.colMenu', 'Menu')} mobileFullWidth>
                    <div style={{ fontWeight: 600 }}>{m.name}</div>
                    <Muted>{m.category}{m.partly_costed ? ` · ${t('menus.partly', 'some sales without cost')}` : ''}{m.options_unknown ? ` · ${t('menus.optUnknown', 'option cost missing')}` : ''}</Muted>
                  </DataTableCell>
                  <DataTableCell data-label={t('menus.colQty', 'Sold')} align="right">{m.quantity}</DataTableCell>
                  <DataTableCell data-label={t('menus.colSales', 'Net sales')} align="right">{money(m.net_sales, currency)}</DataTableCell>
                  <DataTableCell data-label={t('menus.colCost', 'Cost / sale')} align="right">{money(m.unit_cost, currency)}</DataTableCell>
                  <DataTableCell data-label={t('menus.colUnit', 'Left per sale')} align="right">{money(m.unit_contribution, currency)}</DataTableCell>
                  <DataTableCell data-label={t('menus.colContribution', 'Contribution')} align="right">
                    {money(m.contribution, currency)}<Muted>{pctText(m.contribution_pct)}</Muted>
                  </DataTableCell>
                  <DataTableCell data-label={t('menus.colQuadrant', 'Group')}>
                    <Row gap={6}><Dot tone={Q_TONE[m.quadrant]} style={{ background: Q_COLOR[m.quadrant] }} />{qLabel(m.quadrant)}</Row>
                  </DataTableCell>
                </DataTableRow>
              ))}
            </tbody>
          </DataTable>
          {rows.length === 0 && <DataTableEmpty>{t('menus.empty', 'No menus here for this period.')}</DataTableEmpty>}
        </DataTableContainer>
      </Card>

      {unknown.length > 0 && filter === null && (
        <Card>
          <Row style={{ marginBottom: 6 }}>
            <CardTitle style={{ margin: 0 }}>{t('menus.unknownTitle', '{{n}} menus sold without a cost', { n: unknown.length })}</CardTitle>
            {canLinkRecipes && <Link to={`/restaurant/${restaurantId}/recipe-management`} style={{ color: COLORS.primary, fontWeight: 600, fontSize: 13 }}>{t('readiness.linkRecipes', 'Link recipes')}</Link>}
          </Row>
          <Muted style={{ marginBottom: 8 }}>{t('menus.unknownHint', 'Their sales are counted, but what is left per sale is unknown until a recipe or cost is set.')}</Muted>
          <Muted>{unknown.slice(0, 40).map(m => `${m.name} (${m.quantity})`).join(' · ')}{unknown.length > 40 ? ' …' : ''}</Muted>
        </Card>
      )}
    </>
  );
};

export default MenusTab;
