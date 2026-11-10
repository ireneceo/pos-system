import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  DashboardStatsGrid, DashboardStatCard, DashboardStatLabel, DashboardStatValue, DashboardStatDescription,
} from '../../UI/StatCard';
import { Button } from '../../UI/Button';
import { ForesightSummary } from '../hooks/useBulkOrder';

/**
 * 재고 «발주할 것» 띠 (2026-11-03 Fable 설계 .claude/fable-design-20261103-stock-foresight-oneclick-po.md §5-1
 *   → 2026-11-10 개정 .claude/fable-design-20261110-stock-simple-reorder.md §2-3)
 *   Irene «스톡없다고 표시되게 하는게 도대체 무슨 기준이야 … 재고 몇 개 이하면 발주하는 거 헷갈리지 않게»
 *   설명 한 줄이 그 답(품목마다 정한 «발주 기준» 이하 → 지금 발주). 카드 3칸(재고 없음 · 지금 발주 · 발주 기준 없음)
 *   — 누르면 목록이 그 단계로 걸러진다. «곧 부족» 은 카드 밑 한 줄 링크. «곧 부족 포함» 체크는 일괄 발주 창 안으로 옮겼다.
 *   «발주 담기» = 재고 없음 + 지금 발주 중 판매처 연결 있는 것 → 일괄 발주 창(확인 없이 보내지 않는다).
 */
export type ForesightFilter = 'fs_out' | 'fs_order_now' | 'fs_soon' | 'fs_no_basis';

interface Props {
  summary: ForesightSummary | null;
  computedAt?: string | null;
  neededCount: number;
  activeFilter: string;
  onFilter: (f: ForesightFilter | 'all') => void;
  onAddNeeded: () => void;
  /** 브랜드 모드 — «Stock settings» 버튼(재고 설정 한 창 · phase2 §4-1) · 매장 주문 차감 설명 한 줄 */
  onOpenSettings?: () => void;
  isBrand?: boolean;
  /** 브랜드 설정이 «보내기 막기» 면 띠 밑에 한 줄(켜 둔 걸 잊지 않게) */
  blocking?: boolean;
  /** 일반재고(General Stock) 중 같은 판정 수 — 목록 필터가 일반재고도 거르므로 카드 숫자 = 걸린 행 수 */
  extraCounts?: Partial<Record<'out' | 'order_now' | 'no_basis' | 'soon', number>>;
}

const CARDS: Array<{ key: 'out' | 'order_now' | 'no_basis'; filter: ForesightFilter; color: string }> = [
  { key: 'out', filter: 'fs_out', color: '#EF4444' },
  { key: 'order_now', filter: 'fs_order_now', color: '#F59E0B' },
  { key: 'no_basis', filter: 'fs_no_basis', color: '#9CA3AF' },
];

const ForesightPanel: React.FC<Props> = ({
  summary, neededCount, activeFilter, onFilter, onAddNeeded, onOpenSettings, isBrand, blocking, extraCounts,
}) => {
  const { t } = useTranslation(['inventory']);
  if (!summary) return null;

  const labels: Record<string, string> = {
    out: t('foresight.out', 'Out of stock'),
    order_now: t('foresight.orderNow', 'Order now'),
    no_basis: t('foresight.noBasis', 'No reorder number'),
  };
  const hints: Record<string, string> = {
    out: isBrand ? t('foresight.outHintBrand', 'Nothing left after store orders waiting') : t('foresight.outHint', 'Nothing left'),
    order_now: t('foresight.orderNowHint', 'At or below the reorder number'),
    no_basis: t('foresight.noBasisHint', 'Set a number and we\'ll tell you when to order'),
  };
  const soonActive = activeFilter === 'fs_soon';
  const count = (k: 'out' | 'order_now' | 'no_basis' | 'soon') => (Number(summary[k]) || 0) + (Number(extraCounts?.[k]) || 0);

  return (
    <div style={{ margin: '0 0 20px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ flex: '1 1 320px', minWidth: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#0A2540' }}>{t('foresight.title', 'What to order')}</div>
          <div style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.5, marginTop: 2 }}>
            {t('foresight.subtitle', 'An item shows “Order now” when its stock is at or below the reorder number you set for it. No number yet? We estimate one from the last 28 days of use.')}
            {isBrand && <> {t('foresight.subtitleBrand', 'Store orders waiting to ship are taken off first.')}</>}
            {summary.unlinked > 0 && <> · {t('foresight.unlinked', { count: summary.unlinked, defaultValue: '{{count}} need a supplier link' })}</>}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          {onOpenSettings && (
            <Button variant="secondary" onClick={onOpenSettings}>
              {t('foresight.settings', 'Stock settings')}
            </Button>
          )}
          <Button variant="primary" onClick={onAddNeeded} disabled={neededCount === 0}>
            {t('foresight.addNeeded', { count: neededCount, defaultValue: 'Order these ({{count}})' })}
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
              <DashboardStatValue>{count(c.key)}</DashboardStatValue>
              <DashboardStatDescription>{hints[c.key]}</DashboardStatDescription>
            </DashboardStatCard>
          );
        })}
      </DashboardStatsGrid>
      {count('soon') > 0 && (
        <div style={{ fontSize: 13, color: '#854D0E', marginTop: -8, marginBottom: 4 }}>
          {t('foresight.soonLine', { count: count('soon'), defaultValue: '{{count}} more will run low within 7 days' })}
          {' — '}
          <button
            type="button"
            onClick={() => onFilter(soonActive ? 'all' : 'fs_soon')}
            style={{ background: 'none', border: 'none', padding: 0, color: '#635BFF', fontSize: 13, fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
          >
            {t('foresight.soonView', 'View')}
          </button>
        </div>
      )}
      {blocking && (
        <div style={{ fontSize: 12, color: '#B91C1C', marginTop: 4 }}>
          {t('foresight.blockingOn', 'Stores can\'t send orders beyond your available stock (blocking is on).')}
        </div>
      )}
    </div>
  );
};

export default ForesightPanel;
