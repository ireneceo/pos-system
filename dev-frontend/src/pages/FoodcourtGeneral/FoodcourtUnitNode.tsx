// Foodcourt-specific node renderer used in Floor Plan canvas.
// 4-Tier information hierarchy — content shown adapts to shape size:
//   Tier A (always):     unit code + status color
//   Tier B (≥60×50 px):  status pill (Vacant / Proposal / In Talks / Setup / Active / Expiring / Expired)
//   Tier C (≥90×60 px):  tenant/applicant name (1-line truncate)
//   Tier D (≥120×80 px): stage-specific key number (rent / days-left / opens / since / size / ended)
//
// Accent: corner dot (6px) indicates stage at a glance.
//
// No seats concept. No "Occupied" vocabulary. Every label goes through i18n.
import React from 'react';
import styled from 'styled-components';
import { FloorTable } from '../FloorPlan/types';

export type UnitDisplayStatus = 'vacant' | 'proposal' | 'contracting' | 'preparing' | 'active' | 'expiring' | 'expired';

export interface UnitDisplay {
  // Semantic status derived from the chosen contract's stage (or 'vacant' if none).
  // 'expiring' is a variant of 'active' when days-remaining <= renewal_alert_months.
  displayStatus: UnitDisplayStatus;
  tenantName?: string | null;       // restaurant.name or applicant_company_name
  contractStage?: string | null;    // raw contract.stage for actions
  contractId?: number | null;
  logoUrl?: string | null;
  // Stage-specific key number rendered only on large shapes (Tier D)
  keyNumber?: string | null;
  // Unit physical size — used as fallback key number on vacant units
  sizeLabel?: string | null;
  // Billing gap: active contract but no Plan attached → operator risk (no auto-billing)
  billingGap?: boolean;
}

interface Props {
  table: FloorTable & { unitDisplay?: UnitDisplay };
  isSelected: boolean;
  isEditing: boolean;
  onClick?: (tableNumber: string) => void;
  onMouseDown?: (e: React.MouseEvent, tableId: string) => void;
  onTouchStart?: (e: React.TouchEvent, tableId: string) => void;
  statusLabels?: Partial<Record<UnitDisplayStatus, string>>;
}

const STATUS_PALETTE: Record<UnitDisplayStatus, { bg: string; border: string; text: string; dot: string; dashed?: boolean }> = {
  vacant:      { bg: '#F3F4F6', border: '#D1D5DB', text: '#6B7280', dot: '#9CA3AF' },
  proposal:    { bg: '#EDE9FE', border: '#8B5CF6', text: '#5B21B6', dot: '#8B5CF6' },
  contracting: { bg: '#FFEDD5', border: '#F97316', text: '#9A3412', dot: '#F97316' },
  preparing:   { bg: '#DBEAFE', border: '#3B82F6', text: '#1E40AF', dot: '#3B82F6' },
  active:      { bg: '#DCFCE7', border: '#16A34A', text: '#15803D', dot: '#16A34A' },
  expiring:    { bg: '#DCFCE7', border: '#F59E0B', text: '#92400E', dot: '#F59E0B', dashed: true },
  expired:     { bg: '#FEE2E2', border: '#EF4444', text: '#991B1B', dot: '#EF4444' }
};

const NodeWrapper = styled.div<{
  $x: number; $y: number; $w: number; $h: number;
  $shape: string; $rotation: number;
  $bgColor: string; $borderColor: string; $textColor: string;
  $isSelected: boolean; $isEditing: boolean; $dashed: boolean;
}>`
  position: absolute;
  left: ${p => p.$x - p.$w / 2}px;
  top: ${p => p.$y - p.$h / 2}px;
  width: ${p => p.$w}px;
  height: ${p => p.$h}px;
  background: ${p => p.$bgColor};
  border: 2.5px ${p => p.$dashed ? 'dashed' : 'solid'} ${p => p.$isSelected ? '#635BFF' : p.$borderColor};
  border-radius: ${p => p.$shape === 'round' ? '50%' : '8px'};
  transform: rotate(${p => p.$rotation}deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 4px 6px;
  cursor: ${p => p.$isEditing ? 'grab' : 'pointer'};
  user-select: none;
  -webkit-user-select: none;
  box-shadow: ${p => p.$isSelected
    ? '0 0 0 3px rgba(99, 91, 255, 0.3)'
    : '0 1px 3px rgba(0, 0, 0, 0.08)'};
  transition: ${p => p.$isEditing ? 'none' : 'box-shadow 0.15s, transform 0.15s'};
  z-index: ${p => p.$isSelected ? 10 : 1};
  overflow: hidden;

  &:hover {
    box-shadow: ${p => p.$isEditing
      ? (p.$isSelected ? '0 0 0 3px rgba(99, 91, 255, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.12)')
      : '0 4px 12px rgba(0, 0, 0, 0.15)'};
    ${p => !p.$isEditing && 'transform: scale(1.03);'}
  }
  &:active {
    ${p => p.$isEditing && 'cursor: grabbing;'}
  }
`;

const CornerDot = styled.div<{ $color: string }>`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${p => p.$color};
  box-shadow: 0 0 0 2px white;
`;

// Billing-gap indicator: active contract with no Plan attached = invoice won't auto-generate
const GapBadge = styled.div`
  position: absolute;
  top: 3px;
  left: 3px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #DC2626;
  color: white;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 2px white;
  line-height: 1;
`;

const UnitLabel = styled.div<{ $textColor: string }>`
  font-size: 13px;
  font-weight: 700;
  color: ${p => p.$textColor};
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const TenantLabel = styled.div<{ $textColor: string }>`
  font-size: 10px;
  font-weight: 500;
  color: ${p => p.$textColor};
  opacity: 0.85;
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  text-align: center;
`;

const StatusPill = styled.div<{ $textColor: string; $borderColor: string }>`
  font-size: 9px;
  font-weight: 600;
  color: ${p => p.$textColor};
  padding: 1px 6px;
  border-radius: 8px;
  border: 1px solid ${p => p.$borderColor};
  background: rgba(255, 255, 255, 0.55);
  text-transform: uppercase;
  letter-spacing: 0.3px;
  white-space: nowrap;
  line-height: 1.3;
`;

const KeyNumber = styled.div<{ $textColor: string }>`
  font-size: 10px;
  font-weight: 600;
  color: ${p => p.$textColor};
  opacity: 0.9;
  line-height: 1;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const defaultLabels: Record<UnitDisplayStatus, string> = {
  vacant: 'Vacant',
  proposal: 'Proposal',
  contracting: 'In Talks',
  preparing: 'Setup',
  active: 'Active',
  expiring: 'Expiring',
  expired: 'Expired'
};

const FoodcourtUnitNode: React.FC<Props> = React.memo(({
  table, isSelected, isEditing, onClick, onMouseDown, onTouchStart, statusLabels
}) => {
  const ud = table.unitDisplay;
  const status: UnitDisplayStatus = ud?.displayStatus || 'vacant';
  const colors = STATUS_PALETTE[status];
  const labels = { ...defaultLabels, ...(statusLabels || {}) };

  // Tier logic by shape size
  const canFitPill = table.width >= 60 && table.height >= 50;       // Tier B
  const canFitTenant = table.width >= 90 && table.height >= 60;     // Tier C
  const canFitKeyNumber = table.width >= 120 && table.height >= 80; // Tier D

  const tenantLine = ud?.tenantName && ud.tenantName.trim().length > 0 ? ud.tenantName : null;
  // For vacant units we still like to show the physical size (sizeLabel) as key number
  const keyNumberLine = ud?.keyNumber || (status === 'vacant' ? ud?.sizeLabel || null : null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isEditing && onClick) onClick(table.tableNumber);
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isEditing && onMouseDown) onMouseDown(e, table.id);
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isEditing && onTouchStart) onTouchStart(e, table.id);
  };

  const tenantAriaPart = tenantLine ? `, ${tenantLine}` : '';
  const ariaLabel = `${table.tableNumber}: ${labels[status] || status}${tenantAriaPart}`;

  return (
    <NodeWrapper
      $x={table.x} $y={table.y} $w={table.width} $h={table.height}
      $shape={table.shape === 'round' ? 'round' : 'rectangle'}
      $rotation={table.rotation}
      $bgColor={colors.bg}
      $borderColor={colors.border}
      $textColor={colors.text}
      $isSelected={isSelected}
      $isEditing={isEditing}
      $dashed={!!colors.dashed}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      role={isEditing ? undefined : 'button'}
      aria-label={isEditing ? undefined : ariaLabel}
      tabIndex={isEditing ? undefined : 0}
    >
      {!isEditing && <CornerDot $color={colors.dot} />}
      {!isEditing && ud?.billingGap && (
        <GapBadge title="Billing not configured — plan missing">!</GapBadge>
      )}
      <UnitLabel $textColor={colors.text}>{table.tableNumber}</UnitLabel>
      {!isEditing && canFitTenant && tenantLine && (
        <TenantLabel $textColor={colors.text}>{tenantLine}</TenantLabel>
      )}
      {!isEditing && canFitPill && (
        <StatusPill $textColor={colors.text} $borderColor={colors.border}>
          {labels[status] || status}
        </StatusPill>
      )}
      {!isEditing && canFitKeyNumber && keyNumberLine && (
        <KeyNumber $textColor={colors.text}>{keyNumberLine}</KeyNumber>
      )}
    </NodeWrapper>
  );
});

FoodcourtUnitNode.displayName = 'FoodcourtUnitNode';

export default FoodcourtUnitNode;
