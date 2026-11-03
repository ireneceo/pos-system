import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  DashboardStatsGrid, DashboardStatCard, DashboardStatLabel, DashboardStatValue, DashboardStatDescription,
} from '../../UI/StatCard';
import { Button } from '../../UI/Button';
import { ForesightSummary } from '../hooks/useBulkOrder';

/**
 * 재고 «발주 전망» 띠 (2026-11-03 Fable 설계 .claude/fable-design-20261103-stock-foresight-oneclick-po.md §5-1)
 *   네 칸(품절 · 지금 발주 · 곧 부족 · 기준 없음) — 누르면 목록이 그 단계로 걸러진다.
 *   «필요한 것 담기» = 품절 + 지금 발주(토글 켜면 곧 부족도) 중 판매처 연결 있는 것 → 일괄 발주 창.
 *   확인 없이 보내지는 않는다(창에서 Send). 데이터는 useBulkOrder.loadSuggestions 하나(두 번 부르지 않는다).
 */
export type ForesightFilter = 'fs_out' | 'fs_order_now' | 'fs_soon' | 'fs_no_basis';

interface Props {
  summary: ForesightSummary | null;
  computedAt?: string | null;
  neededCount: number;
  soonLinkedCount: number;
  includeSoon: boolean;
  setIncludeSoon: (v: boolean) => void;
  activeFilter: string;
  onFilter: (f: ForesightFilter | 'all') => void;
  onAddNeeded: () => void;
}

const CARDS: Array<{ key: keyof ForesightSummary; filter: ForesightFilter; color: string }> = [
  { key: 'out', filter: 'fs_out', color: '#EF4444' },
  { key: 'order_now', filter: 'fs_order_now', color: '#F59E0B' },
  { key: 'soon', filter: 'fs_soon', color: '#EAB308' },
  { key: 'no_basis', filter: 'fs_no_basis', color: '#9CA3AF' },
];

const ForesightPanel: React.FC<Props> = ({
  summary, neededCount, soonLinkedCount, includeSoon, setIncludeSoon, activeFilter, onFilter, onAddNeeded,
}) => {
  const { t } = useTranslation(['inventory']);
  if (!summary) return null;

  const labels: Record<string, string> = {
    out: t('foresight.out', 'Out — can\'t cover orders'),
    order_now: t('foresight.orderNow', 'Order now'),
    soon: t('foresight.soon', 'Running low within 7 days'),
    no_basis: t('foresight.noBasis', 'No basis to judge'),
  };
  const hints: Record<string, string> = {
    out: t('foresight.outHint', 'Nothing left after orders already promised'),
    order_now: t('foresight.orderNowHint', 'At or below the reorder point'),
    soon: t('foresight.soonHint', 'Reaches the reorder point within a week'),
    no_basis: t('foresight.noBasisHint', 'Set a min stock or daily usage'),
  };
  const addCount = neededCount + (includeSoon ? soonLinkedCount : 0);

  return (
    <div style={{ margin: '0 0 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#0A2540' }}>{t('foresight.title', 'Reorder outlook')}</div>
          <div style={{ fontSize: 12, color: '#6B7280' }}>
            {t('foresight.subtitle', 'Based on the last 28 days of usage, orders on the way and orders you already promised to stores')}
            {summary.unlinked > 0 && <> · {t('foresight.unlinked', { count: summary.unlinked, defaultValue: '{{count}} need a supplier link' })}</>}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#4B5563', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={includeSoon}
              onChange={(e) => setIncludeSoon(e.target.checked)}
              style={{ width: 16, height: 16, accentColor: '#635BFF' }}
            />
            {t('foresight.includeSoon', 'Include items running low soon')}
          </label>
          <Button variant="primary" onClick={onAddNeeded} disabled={addCount === 0}>
            {t('foresight.addNeeded', { count: addCount, defaultValue: 'Add what\'s needed ({{count}})' })}
          </Button>
        </div>
      </div>
      <DashboardStatsGrid>
        {CARDS.map(c => {
          const active = activeFilter === c.filter;
          return (
            <DashboardStatCard
              key={c.key}
              color={c.color}
              role="button"
              tabIndex={0}
              aria-pressed={active}
              onClick={() => onFilter(active ? 'all' : c.filter)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onFilter(active ? 'all' : c.filter); } }}
              style={{ cursor: 'pointer', outline: active ? '2px solid #635BFF' : undefined }}
            >
              <DashboardStatLabel>{labels[c.key]}</DashboardStatLabel>
              <DashboardStatValue>{summary[c.key]}</DashboardStatValue>
              <DashboardStatDescription>{hints[c.key]}</DashboardStatDescription>
            </DashboardStatCard>
          );
        })}
      </DashboardStatsGrid>
      {summary.no_basis > 0 && (
        <div style={{ fontSize: 12, color: '#6B7280', marginTop: -8 }}>
          {t('foresight.noBasisLine', { count: summary.no_basis, defaultValue: '{{count}} items have no min stock or daily usage — set one in each item\'s settings and we\'ll warn you before they run out.' })}
        </div>
      )}
    </div>
  );
};

export default ForesightPanel;
