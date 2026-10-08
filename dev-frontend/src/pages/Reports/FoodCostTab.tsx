/**
 * 원가 탭 — 기간 원가(실제 vs 이론) · 폐기 (2026-10-08 · Fable 판정 Ⅱ-3-B·D)
 *
 * 숫자는 전부 재고 장부(그때 금액이 남는 장부)에서 서버가 낸다 — services/foodCostReport · utils/foodCostMath.
 *   실제 사용액 = 기초 + 매입 − 기말 · 이론 사용액 = 팔린 메뉴의 레시피대로 빠진 값
 *   설명 안 되는 차이 = 실사에서 모자란 몫 + 원가 변동분
 * 기간 끝에 실사가 없으면 기말은 장부로 추정한 값이다 — 그 사실을 위에 밝힌다.
 */
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, DataTableEmpty
} from '../../components/UI/DataTable';
import { StatsGridComponent } from '../../components/UI/StatCard';
import { getAuthToken } from '../../utils/auth';
import { formatCurrency } from '../../utils/currency';

interface Totals {
  opening_value: number; purchase_value: number; closing_value: number;
  actual_usage: number; theoretical_usage: number; waste_value: number; explained_usage: number;
  stock_take_variance: number; unexplained_variance: number; revaluation: number; unknown_rows: number;
  revenue: number; actual_cost_pct: number | null; theoretical_cost_pct: number | null;
}
interface Line extends Totals { id: number; name: string; unit: string; opening_qty: number; closing_qty: number; uncosted: boolean }
interface FoodCost { opening_source: string; closing_source: string; stock_takes_in_period: number; totals: Totals; lines: Line[] }
interface WasteReport {
  total_value: number; entries: number; unknown_value_entries: number;
  by_reason: Array<{ reason_code: string; count: number; value: number }>;
  by_ingredient: Array<{ ingredient_id: number; name: string; unit: string; reason_code: string; quantity: number; value: number }>;
}

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
const SectionTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: #0A2540;
  margin: 24px 0 10px;
`;
const Muted = styled.div`
  font-size: 11px;
  color: #6B7280;
  margin-top: 2px;
`;

const pct = (n: number | null) => (n === null || n === undefined ? '—' : `${n}%`);

interface Props { restaurantId?: number | string | null; currency?: string; startDate?: string; endDate?: string; }

const FoodCostTab: React.FC<Props> = ({ restaurantId, currency = 'MYR', startDate, endDate }) => {
  const { t } = useTranslation(['inventory', 'common']);
  const [data, setData] = useState<FoodCost | null>(null);
  const [waste, setWaste] = useState<WasteReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!restaurantId || !startDate || !endDate) return;
    setLoading(true);
    setError(null);
    try {
      const headers = { Authorization: `Bearer ${getAuthToken()}` };
      const qs = `?start=${startDate}&end=${endDate}`;
      const [a, b] = await Promise.all([
        fetch(`/api/restaurants/${restaurantId}/reports/food-cost${qs}`, { headers }),
        fetch(`/api/restaurants/${restaurantId}/reports/waste${qs}`, { headers }),
      ]);
      const ja = await a.json();
      const jb = await b.json();
      if (!a.ok || !ja.success) throw new Error(a.status === 403 ? 'forbidden' : (ja.message || 'failed'));
      setData(ja.data);
      setWaste(jb.success ? jb.data : null);
    } catch (e: any) {
      setError(e?.message || 'failed');
    } finally {
      setLoading(false);
    }
  }, [restaurantId, startDate, endDate]);

  useEffect(() => { load(); }, [load]);

  if (loading) return <DataTable><DataTableEmpty>{t('common:loading', 'Loading…')}</DataTableEmpty></DataTable>;
  if (error || !data) {
    return <Note>{error === 'forbidden' ? t('inventory:costReport.forbidden') : t('inventory:costReport.loadFailed')}</Note>;
  }
  const tt = data.totals;
  const estimated = data.closing_source !== 'stock_take';
  return (
    <div>
      <Note>
        {t('inventory:costReport.note')}
        {estimated && <><br />{t('inventory:costReport.estimatedNote')}</>}
        {tt.unknown_rows > 0 && <><br />{t('inventory:costReport.unknownRows', { count: tt.unknown_rows })}</>}
      </Note>

      <StatsGridComponent stats={[
        { color: '#0A2540', value: formatCurrency(tt.revenue, currency), label: t('inventory:costReport.revenue') },
        { color: '#635BFF', value: formatCurrency(tt.actual_usage, currency), label: t('inventory:costReport.actualUsage'), description: `${t('inventory:costReport.costPct')} ${pct(tt.actual_cost_pct)}` },
        { color: '#059669', value: formatCurrency(tt.theoretical_usage, currency), label: t('inventory:costReport.theoreticalUsage'), description: `${t('inventory:costReport.costPct')} ${pct(tt.theoretical_cost_pct)}` },
        { color: '#D97706', value: formatCurrency(tt.waste_value, currency), label: t('inventory:costReport.waste') },
        { color: '#DC2626', value: formatCurrency(tt.unexplained_variance, currency), label: t('inventory:costReport.unexplained'), description: `${t('inventory:costReport.stockTakeVariance')} ${formatCurrency(tt.stock_take_variance, currency)} · ${t('inventory:costReport.revaluation')} ${formatCurrency(tt.revaluation, currency)}` },
      ]} />

      <SectionTitle>{t('inventory:costReport.byIngredient')}</SectionTitle>
      <DataTable>
        <DataTableHead>
          <DataTableHeaderCell>{t('inventory:costReport.ingredient')}</DataTableHeaderCell>
          <DataTableHeaderCell align="right">{t('inventory:costReport.opening')}</DataTableHeaderCell>
          <DataTableHeaderCell align="right">{t('inventory:costReport.purchases')}</DataTableHeaderCell>
          <DataTableHeaderCell align="right">{t('inventory:costReport.closing')}</DataTableHeaderCell>
          <DataTableHeaderCell align="right">{t('inventory:costReport.actualUsage')}</DataTableHeaderCell>
          <DataTableHeaderCell align="right">{t('inventory:costReport.theoreticalUsage')}</DataTableHeaderCell>
          <DataTableHeaderCell align="right">{t('inventory:costReport.waste')}</DataTableHeaderCell>
          <DataTableHeaderCell align="right">{t('inventory:costReport.unexplained')}</DataTableHeaderCell>
        </DataTableHead>
        {data.lines.length === 0 ? (
          <DataTableEmpty>{t('inventory:costReport.empty')}</DataTableEmpty>
        ) : data.lines.map(l => (
          <DataTableRow key={l.id}>
            <DataTableCell data-label={t('inventory:costReport.ingredient')}>
              <div style={{ fontWeight: 600 }}>{l.name}</div>
              <Muted>{l.opening_qty} → {l.closing_qty} {l.unit}{l.uncosted ? ` · ${t('inventory:costReport.noCost')}` : ''}</Muted>
            </DataTableCell>
            <DataTableCell align="right" data-label={t('inventory:costReport.opening')}>{formatCurrency(l.opening_value, currency)}</DataTableCell>
            <DataTableCell align="right" data-label={t('inventory:costReport.purchases')}>{formatCurrency(l.purchase_value, currency)}</DataTableCell>
            <DataTableCell align="right" data-label={t('inventory:costReport.closing')}>{formatCurrency(l.closing_value, currency)}</DataTableCell>
            <DataTableCell align="right" data-label={t('inventory:costReport.actualUsage')}>{formatCurrency(l.actual_usage, currency)}</DataTableCell>
            <DataTableCell align="right" data-label={t('inventory:costReport.theoreticalUsage')}>{formatCurrency(l.theoretical_usage, currency)}</DataTableCell>
            <DataTableCell align="right" data-label={t('inventory:costReport.waste')}>{formatCurrency(l.waste_value, currency)}</DataTableCell>
            <DataTableCell align="right" data-label={t('inventory:costReport.unexplained')}>
              <span style={{ fontWeight: 600, color: Math.abs(l.unexplained_variance) >= 0.01 ? '#DC2626' : '#0A2540' }}>{formatCurrency(l.unexplained_variance, currency)}</span>
            </DataTableCell>
          </DataTableRow>
        ))}
      </DataTable>

      <SectionTitle>{t('inventory:costReport.wasteTitle')}</SectionTitle>
      <DataTable>
        <DataTableHead>
          <DataTableHeaderCell>{t('inventory:wasteReason.label')}</DataTableHeaderCell>
          <DataTableHeaderCell align="right">{t('inventory:costReport.entries')}</DataTableHeaderCell>
          <DataTableHeaderCell align="right">{t('inventory:costReport.value')}</DataTableHeaderCell>
        </DataTableHead>
        {!waste || waste.by_reason.length === 0 ? (
          <DataTableEmpty>{t('inventory:costReport.wasteEmpty')}</DataTableEmpty>
        ) : waste.by_reason.map(r => (
          <DataTableRow key={r.reason_code}>
            <DataTableCell data-label={t('inventory:wasteReason.label')}>
              {r.reason_code === 'unspecified' ? t('inventory:costReport.unspecified') : t(`inventory:wasteReason.${r.reason_code}`, r.reason_code)}
            </DataTableCell>
            <DataTableCell align="right" data-label={t('inventory:costReport.entries')}>{r.count}</DataTableCell>
            <DataTableCell align="right" data-label={t('inventory:costReport.value')}>{formatCurrency(r.value, currency)}</DataTableCell>
          </DataTableRow>
        ))}
      </DataTable>
      {waste && waste.by_ingredient.length > 0 && (
        <DataTable>
          <DataTableHead>
            <DataTableHeaderCell>{t('inventory:costReport.ingredient')}</DataTableHeaderCell>
            <DataTableHeaderCell>{t('inventory:wasteReason.label')}</DataTableHeaderCell>
            <DataTableHeaderCell align="right">{t('inventory:costReport.quantity')}</DataTableHeaderCell>
            <DataTableHeaderCell align="right">{t('inventory:costReport.value')}</DataTableHeaderCell>
          </DataTableHead>
          {waste.by_ingredient.slice(0, 20).map(w => (
            <DataTableRow key={`${w.ingredient_id}-${w.reason_code}`}>
              <DataTableCell data-label={t('inventory:costReport.ingredient')}>{w.name}</DataTableCell>
              <DataTableCell data-label={t('inventory:wasteReason.label')}>
                {w.reason_code === 'unspecified' ? t('inventory:costReport.unspecified') : t(`inventory:wasteReason.${w.reason_code}`, w.reason_code)}
              </DataTableCell>
              <DataTableCell align="right" data-label={t('inventory:costReport.quantity')}>{w.quantity} {w.unit}</DataTableCell>
              <DataTableCell align="right" data-label={t('inventory:costReport.value')}>{formatCurrency(w.value, currency)}</DataTableCell>
            </DataTableRow>
          ))}
        </DataTable>
      )}
    </div>
  );
};

export default FoodCostTab;
