/**
 * «손님은 어떻게 시키나» — 주문 구성 (설계 §3-8 · §6-2)
 * 객단가·주문당 공헌이익·유료 옵션 추가율·세트 주문률 → 채널(주문 종류 × 들어온 곳) 표 → 카테고리 동반 주문률 막대 → 함께 시킨 메뉴 상위 10.
 * 동반 주문률은 모든 카테고리에 대해 낸다 — 어느 카테고리가 «사이드» 인지 매장이 고를 필요 없다(입력 0).
 * 시간대 인건비율은 2단계(인건비가 들어온 뒤).
 */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { DataTableContainer, DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, DataTableEmpty } from '../../../components/UI/DataTable';
import { storeApi, periodQuery, OrderMix } from '../profitabilityApi';
import { Card, CardTitle, Muted, Grid, KpiCard, ErrorBox, COLORS, money, pctText } from '../profitabilityUi';

interface Props { restaurantId: string; start: string; end: string; currency: string }

const BarRow = styled.div`
  display: grid;
  grid-template-columns: minmax(90px, 200px) 1fr 64px;
  gap: 10px;
  align-items: center;
  font-size: 13px;
  padding: 4px 0;
  color: #374151;
`;
const BarTrack = styled.div`
  height: 12px;
  background: #F1F4F8;
  border-radius: 0 4px 4px 0;
  overflow: hidden;
`;
const BarFill = styled.div<{ w: number }>`
  height: 100%;
  width: ${p => Math.max(0, Math.min(100, p.w))}%;
  background: ${COLORS.primary};
  border-radius: 0 4px 4px 0;
`;
const Name = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MixTab: React.FC<Props> = ({ restaurantId, start, end, currency }) => {
  const { t } = useTranslation('profitability');
  const [data, setData] = useState<OrderMix | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!start || !end) return;
    let live = true;
    storeApi<OrderMix>(restaurantId, `/order-mix${periodQuery(start, end)}`).then(r => {
      if (!live) return;
      if (!r.ok) { setError(r.message || t('errors.load', 'Could not load')); return; }
      setError(''); setData(r.data);
    });
    return () => { live = false; };
  }, [restaurantId, start, end, t]);

  if (error) return <ErrorBox>{error}</ErrorBox>;
  if (!data) return <Muted>{t('common.loading', 'Loading…')}</Muted>;

  const typeLabel = (k: string) => t(`channel.type.${k}`, { dine_in: 'Dine-in', takeaway: 'Takeaway', delivery: 'Delivery', pickup: 'Pickup' }[k] || k);
  const srcLabel = (k: string) => t(`channel.source.${k}`, { pos: 'POS', mobile: 'Mobile order', kiosk: 'Kiosk' }[k] || k);
  const best = [...data.channels].filter(c => c.contribution_per_order !== null && c.contribution_per_order !== undefined && (c.costed_sales_pct || 0) > 0)
    .sort((a, b) => (b.contribution_per_order || 0) - (a.contribution_per_order || 0));

  return (
    <>
      <Grid cols={4}>
        <KpiCard label={t('mix.avgTicket', 'Average ticket')} value={money(data.avg_ticket, currency)} tone="none"
          why={t('mix.ordersIn', '{{n}} orders in this period', { n: data.orders })} />
        <KpiCard label={t('mix.perOrder', 'Contribution per order')} tag={t('tags.estimate', 'Estimate')} value={money(data.contribution_per_order, currency)}
          tone={(data.costed_sales_pct || 0) >= 80 ? 'good' : (data.costed_sales_pct || 0) >= 50 ? 'warn' : 'bad'}
          why={t('kpi.onCosted', 'on {{pct}} of sales with known cost', { pct: pctText(data.costed_sales_pct) })} />
        <KpiCard label={t('mix.optionAttach', 'Paid add-on rate')} value={pctText(data.option_attach_pct)} tone="none"
          why={t('mix.optionAttachWhy', 'Share of order lines with a paid option')} />
        <KpiCard label={t('mix.setRate', 'Set order rate')} value={pctText(data.set_order_pct)} tone="none"
          why={t('mix.setRateWhy', 'Share of orders with at least one set')} />
      </Grid>

      <Card>
        <CardTitle>{t('mix.channelsTitle', 'By channel')}</CardTitle>
        <Muted style={{ marginBottom: 8 }}>
          {best.length >= 2
            ? t('mix.channelGap', '{{a}} leaves {{diff}} more per order than {{b}}.', {
              a: `${typeLabel(best[0].order_type)} · ${srcLabel(best[0].source)}`,
              b: `${typeLabel(best[best.length - 1].order_type)} · ${srcLabel(best[best.length - 1].source)}`,
              diff: money((best[0].contribution_per_order || 0) - (best[best.length - 1].contribution_per_order || 0), currency),
            })
            : t('mix.channelOne', 'Orders made outside PurpleHere (e.g. Grab) are not here.')}
        </Muted>
        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">{t('mix.colChannel', 'Channel')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('mix.colOrders', 'Orders')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('mix.colSales', 'Net sales')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('mix.colTicket', 'Avg ticket')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('mix.colPerOrder', 'Contribution / order')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('mix.colFees', 'Fees')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {data.channels.map(c => (
                <DataTableRow key={`${c.order_type}|${c.source}`}>
                  <DataTableCell data-label={t('mix.colChannel', 'Channel')} mobileFullWidth>
                    <strong>{typeLabel(c.order_type)}</strong> · {srcLabel(c.source)}<Muted>{pctText(c.share_pct)} {t('mix.ofSales', 'of sales')}</Muted>
                  </DataTableCell>
                  <DataTableCell data-label={t('mix.colOrders', 'Orders')} align="right">{c.orders}</DataTableCell>
                  <DataTableCell data-label={t('mix.colSales', 'Net sales')} align="right">{money(c.net_sales, currency)}</DataTableCell>
                  <DataTableCell data-label={t('mix.colTicket', 'Avg ticket')} align="right">{money(c.avg_ticket, currency)}</DataTableCell>
                  <DataTableCell data-label={t('mix.colPerOrder', 'Contribution / order')} align="right">
                    {money(c.contribution_per_order, currency)}<Muted>{t('kpi.onCosted', 'on {{pct}} of sales with known cost', { pct: pctText(c.costed_sales_pct) })}</Muted>
                  </DataTableCell>
                  <DataTableCell data-label={t('mix.colFees', 'Fees')} align="right">{money(c.fees, currency)}</DataTableCell>
                </DataTableRow>
              ))}
            </tbody>
          </DataTable>
          {data.channels.length === 0 && <DataTableEmpty>{t('mix.empty', 'No orders in this period.')}</DataTableEmpty>}
        </DataTableContainer>
      </Card>

      <Card>
        <CardTitle>{t('mix.attachTitle', 'How often each category is in an order')}</CardTitle>
        <Muted style={{ marginBottom: 10 }}>{t('mix.attachWhy', 'Orders containing the category ÷ all orders. Low side / drink rates are where a set or staff tip helps.')}</Muted>
        {data.categories.length === 0 && <Muted>{t('mix.empty', 'No orders in this period.')}</Muted>}
        {data.categories.map(c => (
          <BarRow key={c.category} title={`${c.category}: ${c.orders}/${data.orders}`}>
            <Name>{c.category}</Name>
            <BarTrack><BarFill w={c.attach_pct || 0} /></BarTrack>
            <span style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{pctText(c.attach_pct)}</span>
          </BarRow>
        ))}
      </Card>

      <Card>
        <CardTitle>{t('mix.combosTitle', 'Menus ordered together (top 10)')}</CardTitle>
        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">{t('mix.colPair', 'Pair')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('mix.colOrders', 'Orders')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('mix.colSupport', 'Of all orders')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('mix.colPairContribution', 'Contribution together')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {data.combos.map(p => (
                <DataTableRow key={`${p.a}|${p.b}`}>
                  <DataTableCell data-label={t('mix.colPair', 'Pair')} mobileFullWidth>{p.a} + {p.b}</DataTableCell>
                  <DataTableCell data-label={t('mix.colOrders', 'Orders')} align="right">{p.orders}</DataTableCell>
                  <DataTableCell data-label={t('mix.colSupport', 'Of all orders')} align="right">{pctText(p.support_pct)}</DataTableCell>
                  <DataTableCell data-label={t('mix.colPairContribution', 'Contribution together')} align="right">{money(p.contribution, currency)}</DataTableCell>
                </DataTableRow>
              ))}
            </tbody>
          </DataTable>
          {data.combos.length === 0 && <DataTableEmpty>{t('mix.noCombos', 'No orders with two or more different menus yet.')}</DataTableEmpty>}
        </DataTableContainer>
      </Card>
    </>
  );
};

export default MixTab;
