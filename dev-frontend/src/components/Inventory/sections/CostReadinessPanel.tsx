import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StatsGridComponent } from '../../UI/StatCard';
import { formatCurrency } from '../../../utils/currency';
import { formatDate as formatDateTz } from '../../../utils/timezone';
import { InventoryMode } from '../types';
import { AuthFetch } from '../hooks/useAuthFetch';

// 재고 총액(원가) · 원가 측정 준비도 (2026-10-08 · Fable 판정 Ⅱ-3-A·F)
//   서버 계산 한 곳: services/inventoryValuation — 화면은 숫자만 보여 주고 «어디를 채우면 되는지» 로 이어 준다.
//   연결 없는 메뉴는 팔려도 재고가 안 빠지고 원가도 0 이라, 원가 숫자보다 이 준비도가 먼저 보여야 한다.
interface Valuation { total_value: number; uncosted_count: number }
interface Readiness {
  menus_total: number; menus_linked: number;
  ingredients_total: number; ingredients_costed: number;
  ingredients_mapped: number; last_stock_take_at: string | null;
}

interface Props {
  mode: InventoryMode;
  restaurantId?: number;
  selectedCurrency: string;
  authFetch: AuthFetch;
}

const CostReadinessPanel: React.FC<Props> = ({ mode, restaurantId, selectedCurrency, authFetch }) => {
  const { t } = useTranslation(['inventory']);
  const navigate = useNavigate();
  const [val, setVal] = useState<Valuation | null>(null);
  const [ready, setReady] = useState<Readiness | null>(null);

  useEffect(() => {
    let alive = true;
    const base = mode === 'restaurant' ? `/api/restaurants/${restaurantId}/inventory` : null;
    authFetch(base ? `${base}/valuation` : '/api/product-ingredients/valuation')
      .then(r => { if (alive && r?.success) setVal(r.data); })
      .catch(() => { /* 총액을 못 불러와도 재고 화면은 그대로 쓴다 */ });
    if (base) {
      authFetch(`${base}/readiness`)
        .then(r => { if (alive && r?.success) setReady(r.data); })
        .catch(() => {});
    }
    return () => { alive = false; };
  }, [mode, restaurantId, authFetch]);

  if (!val) return null;
  const stats: Array<{ color: string; value: string | number; label: string; description?: string; onClick?: () => void }> = [{
    color: '#635BFF',
    value: formatCurrency(val.total_value || 0, selectedCurrency),
    label: t('inventory:costPanel.inventoryValue'),
    description: val.uncosted_count > 0
      ? t('inventory:costPanel.uncostedWithStock', { count: val.uncosted_count })
      : t('inventory:costPanel.atCost'),
  }];
  if (mode !== 'restaurant') {
    // 본사 창고 실사 입구(사이드바는 인쇄 보호 파일이라 건드리지 않고 여기서 연다)
    stats.push({
      color: '#0A2540',
      value: '→',
      label: t('inventory:costPanel.stockTakeCta'),
      description: t('inventory:costPanel.stockTakeCtaHint'),
      onClick: () => navigate('/pos/brand-stock-take'),
    });
  }
  if (ready && restaurantId) {
    stats.push({
      color: ready.menus_linked < ready.menus_total ? '#D97706' : '#059669',
      value: `${ready.menus_linked} / ${ready.menus_total}`,
      label: t('inventory:costPanel.menusLinked'),
      description: t('inventory:costPanel.menusLinkedHint'),
      onClick: () => navigate(`/restaurant/${restaurantId}/product-recipes`),
    });
    stats.push({
      color: ready.ingredients_costed < ready.ingredients_total ? '#D97706' : '#059669',
      value: `${ready.ingredients_costed} / ${ready.ingredients_total}`,
      label: t('inventory:costPanel.ingredientsCosted'),
      description: t('inventory:costPanel.ingredientsCostedHint'),
      onClick: () => navigate(`/restaurant/${restaurantId}/ingredients`),
    });
    stats.push({
      color: ready.last_stock_take_at ? '#059669' : '#D97706',
      value: ready.last_stock_take_at ? formatDateTz(ready.last_stock_take_at, null) : t('inventory:costPanel.never'),
      label: t('inventory:costPanel.lastStockTake'),
      description: t('inventory:costPanel.lastStockTakeHint'),
      onClick: () => navigate(`/restaurant/${restaurantId}/stock-take`),
    });
  }
  return <StatsGridComponent stats={stats} />;
};

export default CostReadinessPanel;
