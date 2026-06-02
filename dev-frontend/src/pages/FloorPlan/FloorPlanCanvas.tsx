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
  /* 뷰 모드 배경 = 보기 테마(밝게/고대비/어둡게) 따라감. 편집 모드만 고정 회색. */
  background: ${p => p.$editing ? '#F5F7FA' : 'var(--pos-surface, white)'};
  /* 뷰 모드는 라운드박스 제거 — 테이블맵이 박스/여백 없이 꽉 차게 (편집 모드만 경계 표시) */
  border-radius: ${p => p.$editing ? '8px' : '0'};
  border: ${p => p.$editing ? '1px solid #64748B' : 'none'};
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
  z-index: 0;  /* 흰 plotting 영역은 바닥 — 그리드/테이블(ScaledLayer)이 위에 그려져야 함 (이전 z-index:1 이 테이블을 덮던 버그) */
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
  z-index: 2;  /* 테이블/도형은 흰 plotting 영역(0) + 그리드 위에 */
`;

const EmptyMessage = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--pos-text-muted, #6B7280);
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

    // 여백 최소화 — 테이블이 화면을 더 꽉 채워 크게 보이게 (10%/40px → 3%/12px)
    const boundsW = maxX - minX;
    const boundsH = maxY - minY;
    const padX = Math.max(boundsW * 0.03, 12);
    const padY = Math.max(boundsH * 0.03, 12);

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

  // 2026-05-27: status lookup priority — id (FPTI) → label → tableNumber.
  // The label fallback catches the case where POS / mobile saved the order
  // with table_number = "<prefix>-<num>" (e.g. "U-2") because Floor Plan now
  // prefers label when launching POS. Without this lookup, a table whose
  // tableNumber is the number alone ("2") never matches the order keyed by
  // label ("U-2") and the card appears statusless.
  const getTableStatus = (tableId: string, tableNumber: string, label?: string | null): TableStatus => {
    const info = tableStatuses[tableId]
      || (label ? tableStatuses[label] : undefined)
      || tableStatuses[tableNumber];
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
              status: getTableStatus(table.id, table.tableNumber, (table as any).label),
              statusInfo: tableStatuses[table.id]
                || ((table as any).label ? tableStatuses[(table as any).label] : undefined)
                || tableStatuses[table.tableNumber],
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
