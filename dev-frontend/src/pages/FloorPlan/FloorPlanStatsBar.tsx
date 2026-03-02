import React from 'react';
import styled from 'styled-components';
import { FloorTable, TableStatus, TableStatusInfo, STATUS_COLORS, STATUS_LABELS } from './types';
import { formatCurrency } from '../../utils/currency';

interface FloorPlanStatsBarProps {
  tables: FloorTable[];
  tableStatuses: Record<string, TableStatusInfo>;
  currency: string;
}

const Bar = styled.div`
  background: white;
  padding: 10px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    padding: 8px 12px;
    gap: 12px;
  }
`;

const LegendGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
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
  height: 20px;
  background: #E6EBF1;
`;

const StatGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
`;

const StatItem = styled.div`
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
  white-space: nowrap;

  span {
    font-weight: 700;
    color: #0A2540;
  }
`;

const FloorPlanStatsBar: React.FC<FloorPlanStatsBarProps> = ({ tables, tableStatuses, currency }) => {
  const totalTables = tables.length;

  const counts: Record<TableStatus, number> = {
    available: 0,
    occupied: 0,
    ready: 0,
    'needs-attention': 0
  };

  let todaySales = 0;
  let totalElapsed = 0;
  let occupiedCount = 0;

  tables.forEach(t => {
    const info = tableStatuses[t.tableNumber];
    const s = info?.status || 'available';
    counts[s]++;
    if (s !== 'available' && info) {
      todaySales += info.totalAmount;
      totalElapsed += info.elapsedMinutes;
      occupiedCount++;
    }
  });

  const avgTime = occupiedCount > 0 ? Math.round(totalElapsed / occupiedCount) : 0;

  return (
    <Bar>
      <LegendGroup>
        {(Object.keys(STATUS_COLORS) as TableStatus[]).map(status => (
          <LegendItem key={status}>
            <LegendDot $color={STATUS_COLORS[status].border} />
            {STATUS_LABELS[status]}
          </LegendItem>
        ))}
      </LegendGroup>
      <Divider />
      <StatGroup>
        <StatItem>Tables: <span>{totalTables}</span></StatItem>
        <StatItem>Avail: <span>{counts.available}</span></StatItem>
        <StatItem>Occupied: <span>{counts.occupied}</span></StatItem>
        {counts.ready > 0 && <StatItem>Ready: <span>{counts.ready}</span></StatItem>}
        {counts['needs-attention'] > 0 && <StatItem>Attn: <span>{counts['needs-attention']}</span></StatItem>}
        <Divider />
        <StatItem>Today: <span>{formatCurrency(todaySales, currency)}</span></StatItem>
        {avgTime > 0 && <StatItem>Avg: <span>{avgTime}min</span></StatItem>}
      </StatGroup>
    </Bar>
  );
};

export default FloorPlanStatsBar;
