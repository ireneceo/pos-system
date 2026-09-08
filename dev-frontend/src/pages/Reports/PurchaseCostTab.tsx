/**
 * 구매·원가 탭 — 설계 §8 P2 (2026-09-08)
 *
 * "우리가 이 품목을 얼마에 사 왔나"를 **보여주기만** 한다.
 * ⛔ 원가는 여전히 «공급업체 현재가» 하나다. 여기 평균·오르내림 폭은 관측이지 원가가 아니다.
 *
 * 실효가 = 인보이스로 확정된 청구가가 있으면 그것, 없으면 발주가.
 * 대상 = 실제로 받은 발주만 — 받지 않은 발주는 «그 값에 샀다»는 근거가 못 된다.
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, DataTableEmpty
} from '../../components/UI/DataTable';
import { getAuthToken } from '../../utils/auth';
import { formatCurrency } from '../../utils/currency';

interface CostItem {
  map_id: number | null;
  name: string;
  unit: string | null;
  times: number;
  qty: number;
  spend: number;
  avg_price: number;
  min_price: number;
  max_price: number;
  last_price: number | null;
  spread_pct: number;
  vs_avg_pct: number | null;
  invoiced_lines: number;
  last_at: string | null;
}

interface TrendPoint { month: string; spend: number; orders: number; }

const Summary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
`;

const SumCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #E3E8EF;
  border-radius: 10px;
  padding: 14px 16px;
`;

const SumLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;

const SumValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin-top: 4px;
`;

/** 월별 구매액 — 라이브러리 없이 막대로. 값이 몇 개뿐이라 그래프에 붙일 무게가 아니다. */
const Bars = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 120px;
  padding: 8px 0 0;
  margin-bottom: 16px;
  overflow-x: auto;
`;

const Bar = styled.div<{ h: number }>`
  flex: 0 0 44px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  gap: 4px;
  > .fill {
    width: 100%;
    background: #635BFF;
    border-radius: 4px 4px 0 0;
    height: ${(p) => Math.max(2, p.h)}%;
  }
  > .label { font-size: 10px; color: #6B7280; white-space: nowrap; }
`;

const Note = styled.div`
  padding: 10px 12px;
  background: #F1F4F8;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 12px;
  color: #0A2540;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const Muted = styled.div`
  font-size: 11px;
  color: #6B7280;
  margin-top: 2px;
`;

/** 숫자 천단위 구분. `toLocaleString` 은 날짜에 쓰면 매장 타임존을 놓치는 함수라
 *  화면 코드에서는 아예 쓰지 않는다(타임존 가드도 그래서 잡는다). */
const numberFormat = new Intl.NumberFormat('en-US');
const formatCount = (n: number) => numberFormat.format(Number(n) || 0);

interface Props { currency?: string; startDate?: string; endDate?: string; }

const PurchaseCostTab: React.FC<Props> = ({ currency = 'MYR', startDate, endDate }) => {
  const { t } = useTranslation(['reports', 'common']);
  const [items, setItems] = useState<CostItem[]>([]);
  const [trend, setTrend] = useState<TrendPoint[]>([]);
  const [totals, setTotals] = useState({ spend: 0, items: 0, lines: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const qs = startDate && endDate ? `?start=${startDate}&end=${endDate}` : '';
      const res = await fetch(`/api/purchase-cost-report${qs}`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` }
      });
      const body = await res.json();
      if (!res.ok || !body.success) throw new Error(body.message || 'failed');
      setItems(body.data.items || []);
      setTrend(body.data.trend || []);
      setTotals(body.data.totals || { spend: 0, items: 0, lines: 0 });
    } catch (e: any) {
      setError(e?.message || 'failed');
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => { load(); }, [load]);

  const maxSpend = useMemo(() => trend.reduce((m, p) => Math.max(m, p.spend), 0), [trend]);

  return (
    <div>
      <Note>
        {t('reports:purchaseCost.note',
          '실제로 받은 발주만 셉니다. 인보이스와 대조한 줄은 청구가로, 대조 전이면 발주가로 계산합니다. 여기 평균은 보기 위한 값이고 원가로 쓰이지 않습니다.')}
      </Note>

      <Summary>
        <SumCard>
          <SumLabel>{t('reports:purchaseCost.totalSpend', '기간 구매액')}</SumLabel>
          <SumValue>{formatCurrency(totals.spend, currency)}</SumValue>
        </SumCard>
        <SumCard>
          <SumLabel>{t('reports:purchaseCost.itemCount', '품목 수')}</SumLabel>
          <SumValue>{formatCount(totals.items)}</SumValue>
        </SumCard>
        <SumCard>
          <SumLabel>{t('reports:purchaseCost.lineCount', '구매 횟수')}</SumLabel>
          <SumValue>{formatCount(totals.lines)}</SumValue>
        </SumCard>
      </Summary>

      {trend.length > 0 && (
        <Bars>
          {trend.map((p) => (
            <Bar key={p.month} h={maxSpend > 0 ? (p.spend / maxSpend) * 100 : 0} title={`${p.month} · ${formatCurrency(p.spend, currency)}`}>
              <div className="fill" />
              <div className="label">{p.month.slice(5)}</div>
            </Bar>
          ))}
        </Bars>
      )}

      <DataTable>
        <DataTableHead>
          <DataTableHeaderCell>{t('reports:purchaseCost.item', '품목')}</DataTableHeaderCell>
          <DataTableHeaderCell align="right">{t('reports:purchaseCost.times', '횟수')}</DataTableHeaderCell>
          <DataTableHeaderCell align="right">{t('reports:purchaseCost.spend', '구매액')}</DataTableHeaderCell>
          <DataTableHeaderCell align="right">{t('reports:purchaseCost.avg', '평균가')}</DataTableHeaderCell>
          <DataTableHeaderCell align="right">{t('reports:purchaseCost.range', '최저~최고')}</DataTableHeaderCell>
          <DataTableHeaderCell align="right">{t('reports:purchaseCost.last', '마지막가')}</DataTableHeaderCell>
        </DataTableHead>
        {loading ? (
          <DataTableEmpty>{t('common:loading', '불러오는 중…')}</DataTableEmpty>
        ) : error ? (
          <DataTableEmpty>{t('reports:purchaseCost.loadFailed', '불러오지 못했습니다')}</DataTableEmpty>
        ) : items.length === 0 ? (
          <DataTableEmpty>{t('reports:purchaseCost.empty', '이 기간에 받은 발주가 없습니다')}</DataTableEmpty>
        ) : (
          items.map((it) => (
            <DataTableRow key={`${it.map_id ?? 'x'}-${it.name}`}>
              <DataTableCell data-label={t('reports:purchaseCost.item', '품목')}>
                <div style={{ fontWeight: 600 }}>{it.name}</div>
                <Muted>
                  {it.qty} {it.unit || ''}
                  {it.invoiced_lines > 0 && ` · ${t('reports:purchaseCost.invoicedLines', '대조 {{n}}건', { n: it.invoiced_lines })}`}
                </Muted>
              </DataTableCell>
              <DataTableCell align="right" data-label={t('reports:purchaseCost.times', '횟수')}>{it.times}</DataTableCell>
              <DataTableCell align="right" data-label={t('reports:purchaseCost.spend', '구매액')}>{formatCurrency(it.spend, currency)}</DataTableCell>
              <DataTableCell align="right" data-label={t('reports:purchaseCost.avg', '평균가')}>{formatCurrency(it.avg_price, currency)}</DataTableCell>
              <DataTableCell align="right" data-label={t('reports:purchaseCost.range', '최저~최고')}>
                {it.times < 2
                  ? <span style={{ color: '#6B7280' }}>{t('reports:purchaseCost.onceOnly', '한 번만 삼')}</span>
                  : <>
                      {formatCurrency(it.min_price, currency)} ~ {formatCurrency(it.max_price, currency)}
                      <Muted>{it.spread_pct > 0 ? `± ${it.spread_pct}%` : ''}</Muted>
                    </>}
              </DataTableCell>
              <DataTableCell align="right" data-label={t('reports:purchaseCost.last', '마지막가')}>
                {it.last_price != null ? formatCurrency(it.last_price, currency) : '-'}
                {it.vs_avg_pct != null && Math.abs(it.vs_avg_pct) >= 0.5 && (
                  <Muted style={{ color: it.vs_avg_pct > 0 ? '#B45309' : '#047857' }}>
                    {it.vs_avg_pct > 0 ? '▲' : '▼'} {Math.abs(it.vs_avg_pct)}%
                  </Muted>
                )}
              </DataTableCell>
            </DataTableRow>
          ))
        )}
      </DataTable>
    </div>
  );
};

export default PurchaseCostTab;
