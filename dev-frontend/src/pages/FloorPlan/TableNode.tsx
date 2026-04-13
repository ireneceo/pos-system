import React from 'react';
import styled from 'styled-components';
import { FloorTable, FixtureType, TableStatus, TableStatusInfo, STATUS_COLORS, ORDER_STATUS_COLORS } from './types';

interface TableNodeProps {
  table: FloorTable;
  status?: TableStatus;
  isSelected?: boolean;
  isEditing?: boolean;
  scale?: number;
  onClick?: (tableNumber: string) => void;
  onMouseDown?: (e: React.MouseEvent, tableId: string) => void;
  onTouchStart?: (e: React.TouchEvent, tableId: string) => void;
  statusInfo?: TableStatusInfo;
  currency?: string;
}

const NodeWrapper = styled.div<{
  $x: number; $y: number; $w: number; $h: number;
  $shape: string; $rotation: number;
  $bgColor: string; $borderColor: string; $textColor: string;
  $isSelected: boolean; $isEditing: boolean;
}>`
  position: absolute;
  left: ${p => p.$x - p.$w / 2}px;
  top: ${p => p.$y - p.$h / 2}px;
  width: ${p => p.$w}px;
  height: ${p => p.$h}px;
  background: ${p => p.$bgColor};
  border: 2.5px solid ${p => p.$isSelected ? '#635BFF' : p.$borderColor};
  border-radius: ${p => p.$shape === 'round' ? '50%' : '8px'};
  transform: rotate(${p => p.$rotation}deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: ${p => p.$isEditing ? 'grab' : 'pointer'};
  transition: ${p => p.$isEditing ? 'none' : 'box-shadow 0.15s, transform 0.15s'};
  user-select: none;
  -webkit-user-select: none;
  box-shadow: ${p => p.$isSelected
    ? '0 0 0 3px rgba(99, 91, 255, 0.3)'
    : '0 1px 3px rgba(0, 0, 0, 0.08)'};
  z-index: ${p => p.$isSelected ? 10 : 1};

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

const TableLabel = styled.div<{ $textColor: string }>`
  font-size: 13px;
  font-weight: 700;
  color: ${p => p.$textColor};
  line-height: 1;
`;

const SeatsLabel = styled.div<{ $textColor: string }>`
  font-size: 10px;
  font-weight: 500;
  color: ${p => p.$textColor};
  opacity: 0.7;
  margin-top: 2px;
`;

const StatusInfo = styled.div<{ $textColor: string }>`
  font-size: 9px;
  font-weight: 600;
  color: ${p => p.$textColor};
  margin-top: 3px;
`;

const StaffMealBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  padding: 1px 5px;
  border-radius: 6px;
  background: #F3F4F6;
  color: #6B7280;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.3px;
  z-index: 5;
  border: 1px solid #D1D5DB;
`;

const MultiOrderBadge = styled.div`
  position: absolute;
  top: -6px;
  left: -6px;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  background: #635BFF;
  color: white;
  font-size: 9px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  border: 1.5px solid white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
`;

const TEXT_ONLY_FIXTURES = new Set(['kitchen', 'entrance']);

const FIXTURE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  kitchen: { bg: 'transparent', border: 'transparent', text: '#6B7280' },
  counter: { bg: '#FEF3C7', border: '#D97706', text: '#92400E' },
  entrance: { bg: 'transparent', border: 'transparent', text: '#6B7280' }
};

const TableNode: React.FC<TableNodeProps> = React.memo(({
  table,
  status = 'available',
  isSelected = false,
  isEditing = false,
  onClick,
  onMouseDown,
  onTouchStart,
  statusInfo,
  currency = ''
}) => {
  const fixtureType: FixtureType = table.tableType || 'table';
  const isFixture = fixtureType !== 'table';
  const isTextOnly = TEXT_ONLY_FIXTURES.has(fixtureType);

  // Use order-level status colors (matching LiveOrders) when table has an active order
  const colors = isFixture
    ? (FIXTURE_COLORS[fixtureType] || FIXTURE_COLORS.kitchen)
    : isEditing
      ? { bg: '#F8F9FA', border: '#D1D9E0', text: '#374151' }
      : (!isEditing && statusInfo?.orderStatus && ORDER_STATUS_COLORS[statusInfo.orderStatus])
        ? ORDER_STATUS_COLORS[statusInfo.orderStatus]
        : STATUS_COLORS[status];

  const handleClick = (e: React.MouseEvent) => {
    if (!isEditing && onClick && !isFixture) {
      e.stopPropagation();
      onClick(table.tableNumber);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isEditing && onMouseDown) {
      onMouseDown(e, table.id);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isEditing && onTouchStart) {
      onTouchStart(e, table.id);
    }
  };

  const fixtureStyle: React.CSSProperties | undefined = isFixture ? {
    ...(isTextOnly ? {
      background: 'transparent',
      border: isSelected && isEditing ? '1.5px dashed #635BFF' : 'none',
      boxShadow: isSelected && isEditing ? '0 0 0 2px rgba(99, 91, 255, 0.2)' : 'none',
      borderRadius: '4px',
    } : {
      border: `2.5px solid ${isSelected ? '#635BFF' : colors.border}`,
    }),
    cursor: isEditing ? 'grab' : 'default',
    opacity: isEditing ? 1 : 0.85
  } : undefined;

  // Counter with narrow width: use vertical text
  const isNarrowCounter = fixtureType === 'counter' && table.width < table.height;
  const isStaffMeal = !isEditing && statusInfo?.paymentMethod === 'staffMeal';


  return (
    <NodeWrapper
      $x={table.x} $y={table.y}
      $w={table.width} $h={table.height}
      $shape={isTextOnly ? 'square' : table.shape}
      $rotation={table.rotation}
      $bgColor={isTextOnly ? 'transparent' : colors.bg}
      $borderColor={isTextOnly ? 'transparent' : colors.border}
      $textColor={colors.text}
      $isSelected={isSelected && !isTextOnly}
      $isEditing={isEditing}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={fixtureStyle}
    >
      {isStaffMeal && <StaffMealBadge>{'STAFF'}</StaffMealBadge>}
      {!isFixture && statusInfo?.orderCount && statusInfo.orderCount > 1 && (
        <MultiOrderBadge>{statusInfo.orderCount}</MultiOrderBadge>
      )}
      <TableLabel $textColor={colors.text} style={isTextOnly ? {
        fontSize: '14px',
        fontWeight: 600,
        whiteSpace: 'nowrap',
      } : isNarrowCounter ? {
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
        letterSpacing: '1px',
      } as React.CSSProperties : undefined}>
        {table.label || table.tableNumber}
      </TableLabel>
      {!isFixture && (
        <>
          <SeatsLabel $textColor={colors.text}>
            {!isEditing && statusInfo?.guestCount
              ? `${statusInfo.guestCount} guests`
              : `${table.seats} seats`}
          </SeatsLabel>
          {!isEditing && statusInfo && status !== 'available' && (
            <StatusInfo $textColor={colors.text}>
              {isStaffMeal ? 'Staff Meal' : ({
                pending: 'Pending',
                preparing: 'Preparing',
                ready: 'Ready',
                served: 'Served',
                awaiting_payment: 'Awaiting Pay',
                outstanding: 'Outstanding'
              } as Record<string, string>)[statusInfo.orderStatus || ''] || 'Occupied'}
            </StatusInfo>
          )}
        </>
      )}
    </NodeWrapper>
  );
});

TableNode.displayName = 'TableNode';

export default TableNode;
