import React from 'react';
import styled from 'styled-components';
import { FloorTable, TableStatus, TableStatusInfo, STATUS_COLORS } from './types';

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
  letter-spacing: 0.3px;
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
  const colors = isEditing
    ? { bg: '#F8F9FA', border: '#D1D9E0', text: '#374151' }
    : STATUS_COLORS[status];

  const handleClick = (e: React.MouseEvent) => {
    if (!isEditing && onClick) {
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

  return (
    <NodeWrapper
      $x={table.x} $y={table.y}
      $w={table.width} $h={table.height}
      $shape={table.shape}
      $rotation={table.rotation}
      $bgColor={colors.bg} $borderColor={colors.border} $textColor={colors.text}
      $isSelected={isSelected}
      $isEditing={isEditing}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <TableLabel $textColor={colors.text}>
        {table.label || table.tableNumber}
      </TableLabel>
      <SeatsLabel $textColor={colors.text}>
        {!isEditing && statusInfo?.guestCount
          ? `${statusInfo.guestCount} guests`
          : `${table.seats} seats`}
      </SeatsLabel>
      {!isEditing && statusInfo && status !== 'available' && (
        <StatusInfo $textColor={colors.text}>
          {currency}{statusInfo.totalAmount.toFixed(0)} · {statusInfo.elapsedMinutes}m
        </StatusInfo>
      )}
    </NodeWrapper>
  );
});

TableNode.displayName = 'TableNode';

export default TableNode;
