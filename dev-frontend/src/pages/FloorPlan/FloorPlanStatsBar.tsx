import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FloorTable, TableStatus, TableStatusInfo, STATUS_COLORS, STATUS_LABELS } from './types';
import { formatCurrency } from '../../utils/currency';
import { useTranslation } from 'react-i18next';

interface FloorPlanStatsBarProps {
  tables: FloorTable[];
  tableStatuses: Record<string, TableStatusInfo>;
  currency: string;
  restaurantId: number;
}

const Bar = styled.div`
  background: white;
  padding: 10px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  flex-wrap: wrap;
  font-size: 12px;

  @media (max-width: 768px) {
    padding: 8px 12px;
    gap: 10px;
    font-size: 11px;
  }
`;

const LegendGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6B7C93;
  font-weight: 500;
`;

const LegendDot = styled.div<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${p => p.$color};
`;

const Divider = styled.div`
  width: 1px;
  height: 18px;
  background: #E6EBF1;
`;

const StatItem = styled.div`
  color: #6B7C93;
  font-weight: 500;
  white-space: nowrap;

  span {
    font-weight: 700;
    color: #0A2540;
  }
`;

const ThresholdInput = styled.input`
  width: 36px;
  border: none;
  border-bottom: 1px dashed #635BFF;
  background: transparent;
  font-size: 12px;
  font-weight: 700;
  color: #0A2540;
  text-align: center;
  padding: 0;
  outline: none;

  &:focus {
    border-bottom-style: solid;
    border-bottom-color: #635BFF;
  }
`;

interface OrderStats {
  totalSales: number;
  avgAmount: number;
  maxAmount: number;
  orderCount: number;
  avgServeTime: number;
  maxServeTime: number;
  minServeTime: number;
  aboveThresholdPercent: number;
}

const FloorPlanStatsBar: React.FC<FloorPlanStatsBarProps> = ({ tables, tableStatuses, currency, restaurantId }) => {
  const { t } = useTranslation('floorplan');
  const totalTables = tables.length;
  const [orderStats, setOrderStats] = useState<OrderStats | null>(null);
  const [threshold, setThreshold] = useState(20);
  const [editingThreshold, setEditingThreshold] = useState(false);
  const thresholdInputRef = useRef<HTMLInputElement>(null);
  const thresholdSaveRef = useRef<NodeJS.Timeout | null>(null);

  const counts: Record<TableStatus, number> = {
    available: 0,
    occupied: 0,
    ready: 0,
    'needs-attention': 0,
    completed: 0
  };

  tables.forEach(t => {
    const info = tableStatuses[t.tableNumber];
    const s = info?.status || 'available';
    counts[s]++;
  });

  // Fetch order stats + threshold from server
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const today = new Date().toISOString().split('T')[0];

        // Fetch order counts
        const res = await fetch(`/api/orders/restaurant/${restaurantId}/counts?startDate=${today}&endDate=${today}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          const stats = data.statistics || data;

          // Fetch orders for serve time + threshold calculation
          const ordersRes = await fetch(`/api/orders?restaurantId=${restaurantId}&status=all&startDate=${today}&endDate=${today}&limit=500`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          let serveTimes = { avg: 0, max: 0, min: 0 };
          let abovePercent = 0;
          let orderCount = 0;

          if (ordersRes.ok) {
            const ordersData = await ordersRes.json();
            const orders = ordersData.data || ordersData.orders || ordersData || [];
            orderCount = Array.isArray(orders) ? orders.length : 0;

            if (Array.isArray(orders) && orders.length > 0) {
              // Calculate serve times
              const times: number[] = [];
              orders.forEach((o: any) => {
                if (o.status === 'cancelled') return;
                if (o.created_at && o.completed_at) {
                  const diff = (new Date(o.completed_at).getTime() - new Date(o.created_at).getTime()) / 60000;
                  if (diff > 0 && diff < 300) times.push(diff);
                }
              });
              if (times.length > 0) {
                serveTimes.avg = parseFloat((times.reduce((a, b) => a + b, 0) / times.length).toFixed(1));
                serveTimes.max = parseFloat(Math.max(...times).toFixed(1));
                serveTimes.min = parseFloat(Math.min(...times).toFixed(1));
              }

              // Calculate threshold percentage
              const validOrders = orders.filter((o: any) => o.status !== 'cancelled');
              const above = validOrders.filter((o: any) => parseFloat(o.total_amount) >= threshold).length;
              abovePercent = validOrders.length > 0 ? parseFloat(((above / validOrders.length) * 100).toFixed(1)) : 0;
            }
          }

          setOrderStats({
            totalSales: parseFloat(stats.totalSales || stats.total_sales || 0),
            avgAmount: parseFloat(stats.avgAmount || stats.avg_amount || 0),
            maxAmount: parseFloat(stats.maxAmount || stats.max_amount || 0),
            orderCount: parseInt(stats.totalOrders || stats.total_orders || orderCount || 0),
            avgServeTime: serveTimes.avg,
            maxServeTime: serveTimes.max,
            minServeTime: serveTimes.min,
            aboveThresholdPercent: abovePercent
          });
        }
      } catch (e) {
        console.error('Failed to fetch floor plan stats:', e);
      }
    };

    // Load threshold from restaurant settings
    const loadThreshold = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const res = await fetch(`/api/restaurants/${restaurantId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          const restaurant = data.data || data;
          const opSettings = typeof restaurant.operation_settings === 'string'
            ? JSON.parse(restaurant.operation_settings)
            : restaurant.operation_settings;
          if (opSettings?.salesThreshold) {
            setThreshold(opSettings.salesThreshold);
          }
        }
      } catch (e) {
        // Keep default
      }
    };

    loadThreshold();
    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Refresh every 30s
  // useTranslation moved to component level

  return () => clearInterval(interval);
  }, [restaurantId, threshold]);

  const handleThresholdChange = (value: string) => {
    const num = parseInt(value) || 0;
    setThreshold(num);

    // Debounce save to server
    if (thresholdSaveRef.current) clearTimeout(thresholdSaveRef.current);
    thresholdSaveRef.current = setTimeout(async () => {
      try {
        const token = localStorage.getItem('auth_token');
        // Fetch current operation_settings first
        const res = await fetch(`/api/restaurants/${restaurantId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          const restaurant = data.data || data;
          const opSettings = typeof restaurant.operation_settings === 'string'
            ? JSON.parse(restaurant.operation_settings)
            : (restaurant.operation_settings || {});
          opSettings.salesThreshold = num;

          await fetch(`/api/restaurants/${restaurantId}`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ operation_settings: opSettings })
          });
        }
      } catch (e) {
        console.error('Failed to save threshold:', e);
      }
    }, 1000);
  };

  const sym = currency === 'MYR' ? 'RM' : currency;

  return (
    <Bar>
      <LegendGroup>
        {(Object.keys(STATUS_COLORS) as TableStatus[]).map(status => (
          <LegendItem key={status}>
            <LegendDot $color={STATUS_COLORS[status].border} />
            {STATUS_LABELS[status]} {counts[status]}
          </LegendItem>
        ))}
      </LegendGroup>

      {orderStats && (
        <>
          <Divider />
          <StatItem>{t('floorplan:floorPlanStatsBar.sales')}<span>{sym}{orderStats.totalSales.toLocaleString(undefined, { minimumFractionDigits: currency === 'KRW' ? 0 : 2 })}</span></StatItem>
          <StatItem>{t('floorplan:floorPlanStatsBar.avg')}<span>{sym}{orderStats.avgAmount.toLocaleString(undefined, { minimumFractionDigits: currency === 'KRW' ? 0 : 2 })}</span></StatItem>
          <StatItem>{t('floorplan:floorPlanStatsBar.max')}<span>{sym}{orderStats.maxAmount.toLocaleString(undefined, { minimumFractionDigits: currency === 'KRW' ? 0 : 2 })}</span></StatItem>
          <StatItem>
            ≥{sym}
            <ThresholdInput
              ref={thresholdInputRef}
              type="number"
              value={threshold}
              onChange={(e) => handleThresholdChange(e.target.value)}
              onFocus={() => setEditingThreshold(true)}
              onBlur={() => setEditingThreshold(false)}
              min="0"
            />
            {' '}<span>{orderStats.aboveThresholdPercent}%</span>
          </StatItem>
          {orderStats.avgServeTime > 0 && (
            <>
              <Divider />
              <StatItem>{t('floorplan:floorPlanStatsBar.avgServe')}<span>{orderStats.avgServeTime}m</span></StatItem>
              <StatItem>{t('floorplan:floorPlanStatsBar.max')}<span>{orderStats.maxServeTime}m</span></StatItem>
              <StatItem>{t('floorplan:floorPlanStatsBar.min')}<span>{orderStats.minServeTime}m</span></StatItem>
            </>
          )}
        </>
      )}
    </Bar>
  );
};

export default FloorPlanStatsBar;
