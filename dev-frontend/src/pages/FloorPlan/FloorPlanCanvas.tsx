import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { FloorPlanData, FloorTable, TableStatusInfo } from './types';
import TableNode from './TableNode';

type TableStatus = 'available' | 'occupied' | 'ready' | 'needs-attention';

export interface CanvasNodeRenderProps {
  table: FloorTable;
  status: TableStatus;
  statusInfo?: TableStatusInfo;
  isSelected: boolean;
  isEditing: boolean;
  onClick?: (tableNumber: string) => void;
  onMouseDown?: (e: React.MouseEvent, tableId: string) => void;
  onTouchStart?: (e: React.TouchEvent, tableId: string) => void;
  currency?: string;
}

interface FloorPlanCanvasProps {
  floorPlan: FloorPlanData;
  tableStatuses?: Record<string, TableStatusInfo>;
  isEditing?: boolean;
  selectedTableId?: string | null;
  // Multi-select support (editor lasso / Shift+click). When provided, every id in the set renders
  // as selected. Takes precedence over `selectedTableId` if both are given.
  selectedTableIds?: Set<string>;
  onTableClick?: (tableNumber: string) => void;
  onTableMouseDown?: (e: React.MouseEvent, tableId: string) => void;
  onTableTouchStart?: (e: React.TouchEvent, tableId: string) => void;
  onCanvasClick?: () => void;
  currency?: string;
  // Optional custom node renderer. Falls back to restaurant TableNode if not provided.
  // Foodcourt Floor Plan uses this to render tenancy-aware unit nodes (no seats label).
  renderNode?: (props: CanvasNodeRenderProps) => React.ReactNode;
}

// In edit mode the outer area gets a faint dark wrap so the canvas plotting region (white) is
// visually distinct from the outside. This solves "I can't tell where the canvas ends" reports
// when the user shrinks/grows the canvas via Sidebar's Canvas Size card.
const CanvasOuter = styled.div<{ $editing?: boolean }>`
  width: 100%;
  flex: 1;
  overflow: hidden;
  background: ${p => p.$editing ? '#F5F7FA' : 'white'};
  border-radius: 8px;
  border: 1px solid ${p => p.$editing ? '#64748B' : '#C7CED6'};
  position: relative;
`;
const CanvasBoundsOverlay = styled.div<{ $w: number; $h: number; $scale: number; $offX: number; $offY: number }>`
  position: absolute;
  left: ${p => p.$offX}px;
  top: ${p => p.$offY}px;
  width: ${p => p.$w / p.$scale}px;
  height: ${p => p.$h / p.$scale}px;
  background: white;
  border: 1.5px solid #635BFF;
  border-radius: 4px;
  box-shadow: 0 0 0 2px rgba(99,91,255,0.08), 0 4px 12px rgba(0,0,0,0.04);
  pointer-events: none;
  z-index: 1;
`;

const CanvasInner = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  touch-action: none;
`;

const GridOverlay = styled.div<{ $gridSize: number; $scale: number }>`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(to right, #C7CED6 1px, transparent 1px),
    linear-gradient(to bottom, #C7CED6 1px, transparent 1px);
  background-size:
    ${p => p.$gridSize / p.$scale}px ${p => p.$gridSize / p.$scale}px;
  opacity: 0.5;
`;

const ScaledLayer = styled.div`
  position: absolute;
  transform-origin: 0 0;
`;

const EmptyMessage = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  font-size: 14px;
  gap: 8px;
`;

const FloorPlanCanvas: React.FC<FloorPlanCanvasProps> = ({
  floorPlan,
  tableStatuses = {},
  isEditing = false,
  selectedTableId,
  selectedTableIds,
  onTableClick,
  onTableMouseDown,
  onTableTouchStart,
  onCanvasClick,
  currency = '',
  renderNode
}) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [uniformScale, setUniformScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // In view mode (not editing), compute bounding box of all tables + padding
  const viewBox = useMemo(() => {
    if (isEditing || floorPlan.tables.length === 0) {
      return { x: 0, y: 0, w: floorPlan.canvasWidth, h: floorPlan.canvasHeight };
    }

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const t of floorPlan.tables) {
      const halfW = t.width / 2;
      const halfH = t.height / 2;
      minX = Math.min(minX, t.x - halfW);
      minY = Math.min(minY, t.y - halfH);
      maxX = Math.max(maxX, t.x + halfW);
      maxY = Math.max(maxY, t.y + halfH);
    }

    // Add symmetric padding (10% of bounds or minimum 40px)
    const boundsW = maxX - minX;
    const boundsH = maxY - minY;
    const padX = Math.max(boundsW * 0.10, 40);
    const padY = Math.max(boundsH * 0.10, 40);

    // Keep padding symmetric around bounding box center
    const vx = minX - padX;
    const vy = minY - padY;
    const vw = boundsW + padX * 2;
    const vh = boundsH + padY * 2;

    return { x: vx, y: vy, w: vw, h: vh };
  }, [floorPlan, isEditing]);

  const updateScale = useCallback(() => {
    if (!innerRef.current) return;
    const rect = innerRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    // Use uniform scale: pick the larger ratio so everything fits
    const scaleX = viewBox.w / rect.width;
    const scaleY = viewBox.h / rect.height;
    const s = Math.max(scaleX, scaleY);
    setUniformScale(s);

    // Center the content within the container
    const renderedW = viewBox.w / s;
    const renderedH = viewBox.h / s;
    setOffset({
      x: (rect.width - renderedW) / 2,
      y: (rect.height - renderedH) / 2
    });
  }, [viewBox]);

  useEffect(() => {
    updateScale();
    const observer = new ResizeObserver(() => updateScale());
    if (outerRef.current) observer.observe(outerRef.current);
    return () => observer.disconnect();
  }, [updateScale]);

  // 2026-05-27: lookup by table.id first (Floor Plan v2 unique id), fall back to
  // tableNumber for legacy orders that pre-date the floor_plan_table_id column.
  const getTableStatus = (tableId: string, tableNumber: string): TableStatus => {
    const info = tableStatuses[tableId] || tableStatuses[tableNumber];
    return (info?.status as TableStatus) || 'available';
  };

  return (
    <CanvasOuter ref={outerRef} $editing={isEditing}>
      <CanvasInner
        ref={innerRef}
        onClick={(e) => {
          if (e.target === e.currentTarget || (e.target as HTMLElement).closest('[data-scaled-layer]')) {
            onCanvasClick?.();
          }
        }}
      >
        {/* In edit mode, render a clear white "canvas plotting region" rectangle inside the
            darker outer area. Sits underneath the grid + ScaledLayer so tables and shapes draw on
            top. This is the visible "edge" the user was looking for. */}
        {isEditing && (
          <CanvasBoundsOverlay
            $w={floorPlan.canvasWidth}
            $h={floorPlan.canvasHeight}
            $scale={uniformScale}
            $offX={0}
            $offY={0}
          />
        )}
        {isEditing && floorPlan.showGrid && (
          <GridOverlay $gridSize={floorPlan.gridSize} $scale={uniformScale} />
        )}

        <ScaledLayer
          data-scaled-layer
          style={{
            transform: `scale(${1 / uniformScale})`,
            left: isEditing ? 0 : `${offset.x - viewBox.x / uniformScale}px`,
            top: isEditing ? 0 : `${offset.y - viewBox.y / uniformScale}px`,
            width: isEditing ? `${floorPlan.canvasWidth}px` : `${viewBox.w}px`,
            height: isEditing ? `${floorPlan.canvasHeight}px` : `${viewBox.h}px`
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onCanvasClick?.();
          }}
        >
          {floorPlan.tables.map(table => {
            const nodeProps: CanvasNodeRenderProps = {
              table,
              status: getTableStatus(table.id, table.tableNumber),
              statusInfo: tableStatuses[table.id] || tableStatuses[table.tableNumber],
              isSelected: selectedTableIds ? selectedTableIds.has(table.id) : (selectedTableId === table.id),
              isEditing,
              onClick: onTableClick,
              onMouseDown: onTableMouseDown,
              onTouchStart: onTableTouchStart,
              currency
            };
            return (
              <React.Fragment key={table.id}>
                {renderNode ? renderNode(nodeProps) : (
                  <TableNode
                    table={table}
                    status={nodeProps.status}
                    isSelected={nodeProps.isSelected}
                    isEditing={isEditing}
                    onClick={onTableClick}
                    onMouseDown={onTableMouseDown}
                    onTouchStart={onTableTouchStart}
                    statusInfo={nodeProps.statusInfo}
                    currency={currency}
                  />
                )}
              </React.Fragment>
            );
          })}
        </ScaledLayer>

        {floorPlan.tables.length === 0 && (
          <EmptyMessage>
            <span style={{ fontSize: '32px' }}>&#x25A6;</span>
            {isEditing
              ? 'Add tables using the toolbar above'
              : 'No floor plan configured yet'}
          </EmptyMessage>
        )}
      </CanvasInner>
    </CanvasOuter>
  );
};

export default FloorPlanCanvas;
