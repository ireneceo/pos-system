import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { FloorPlanData, FloorTable, DEFAULT_FLOOR_PLAN, TABLE_SHAPES, FIXTURE_PRESETS, computeTableLabel } from './types';
import FloorPlanCanvas from './FloorPlanCanvas';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';

// Grid snap on one axis. Matches the convention used by FoodcourtFloorPlanEditor so
// operators switching between Restaurant and Foodcourt editors see identical behavior.
//   'edge'   — left/top edge snaps (default — predictable, matches Figma/Sketch)
//   'center' — center snaps (hold Shift during drag)
//   'free'   — no snap (hold Alt during drag)
type SnapMode = 'edge' | 'center' | 'free';
function snapAxis(centerPos: number, half: number, gridSize: number, mode: SnapMode): number {
  if (mode === 'free' || gridSize <= 0) return centerPos;
  if (mode === 'center') {
    return Math.round(centerPos / gridSize) * gridSize;
  }
  const snappedEdge = Math.round((centerPos - half) / gridSize) * gridSize;
  return snappedEdge + half;
}

// ─── Styled Components ───

const PageContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #F9FAFB;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #C7CED6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 12px 16px;
    height: auto;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Btn = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;
  display: flex;
  align-items: center;
  gap: 6px;

  ${p => p.$variant === 'primary' ? `
    background: #635BFF;
    color: white;
    &:hover { background: #5A51E6; transform: translateY(-1px); }
    &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
  ` : p.$variant === 'danger' ? `
    background: #FEE2E2;
    color: #DC2626;
    &:hover { background: #FECACA; }
  ` : `
    background: #F1F4F8;
    color: #1F2937;
    &:hover { background: #C7CED6; }
  `}
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  padding: 24px;
  gap: 20px;
  min-height: 0;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 16px;
  }
`;

// Zone filter chip row — mirrors the FloorPlanPage chip pattern so the two screens look identical.
const ZoneFilterBar = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 10px 24px;
  background: #F9FAFB;
  border-bottom: 1px solid #C7CED6;
  flex-wrap: wrap;
  flex-shrink: 0;
`;
const ZoneChip = styled.button<{ $active: boolean }>`
  background: ${p => p.$active ? '#635BFF' : '#fff'};
  color: ${p => p.$active ? '#fff' : '#4B5563'};
  border: 1px solid ${p => p.$active ? '#635BFF' : '#C7CED6'};
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover { background: ${p => p.$active ? '#514DD6' : '#F5F7FA'}; }
  &:focus-visible { outline: 2px solid #635BFF; outline-offset: 2px; }
`;
const ZoneChipCount = styled.span`
  font-size: 11px;
  font-weight: 600;
  opacity: 0.75;
`;

const Sidebar = styled.div`
  width: 240px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    overflow-y: visible;
  }
`;

const SidebarCard = styled.div`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  padding: 16px;
`;

const CardTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #4B5563;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`;

const ShapeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

const ShapeBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 4px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.15s;
  font-size: 10px;
  color: #4B5563;
  font-weight: 500;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: rgba(99, 91, 255, 0.04);
  }
`;

const ShapeIcon = styled.div<{ $shape: string; $variant?: string }>`
  width: ${p => p.$variant === 'vertical' ? '24px' : p.$shape === 'rectangle' ? '36px' : '24px'};
  height: ${p => p.$variant === 'vertical' ? '36px' : '24px'};
  border: 2px solid currentColor;
  border-radius: ${p => p.$shape === 'round' ? '50%' : '4px'};
`;

const FixtureIcon = styled.div<{ $type: string }>`
  width: 36px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  font-style: italic;
  color: currentColor;
  opacity: 0.7;
`;

const CanvasArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const FormGroup = styled.div`
  margin-bottom: 12px;
  &:last-child { margin-bottom: 0; }
`;

const FormLabel = styled.label`
  display: block;
  font-size: 11px;
  font-weight: 500;
  color: #4B5563;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #C7CED6;
  border-radius: 4px;
  font-size: 13px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 2px rgba(99, 91, 255, 0.1);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #C7CED6;
  border-radius: 4px;
  font-size: 13px;
  background: white;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const SizeRow = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
`;

const SizeBtn = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 6px 4px;
  border: 1px solid ${p => p.$active ? '#635BFF' : '#C7CED6'};
  border-radius: 4px;
  background: ${p => p.$active ? 'rgba(99, 91, 255, 0.08)' : 'white'};
  color: ${p => p.$active ? '#635BFF' : '#4B5563'};
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.1s;
  &:hover { border-color: #635BFF; }
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #1F2937;
  cursor: pointer;
  margin-top: 8px;
`;

const StatusMsg = styled.div<{ $type: 'success' | 'info' }>`
  font-size: 12px;
  color: ${p => p.$type === 'success' ? '#059669' : '#4B5563'};
  font-weight: 500;
`;

// 캔버스가 내용(테이블)보다 과도하게 크면 내용에 맞게 자동 fit (기능 A + 데이터 조치 B).
// 테이블을 여백 위치로 정렬 + 캔버스를 content+margin 으로 축소 → 에디터에서 테이블이 크게 보임.
// 큰 매장(내용이 이미 캔버스를 충분히 채움)은 가드로 미적용(좌표 보존).
function fitCanvasToContent(fp: FloorPlanData): { changed: boolean; floorPlan: FloorPlanData } {
  const tables = fp.tables || [];
  if (tables.length === 0) return { changed: false, floorPlan: fp };
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const t of tables) {
    const hw = t.width / 2, hh = t.height / 2;
    minX = Math.min(minX, t.x - hw); minY = Math.min(minY, t.y - hh);
    maxX = Math.max(maxX, t.x + hw); maxY = Math.max(maxY, t.y + hh);
  }
  const margin = 150;
  const needW = (maxX - minX) + margin * 2;
  const needH = (maxY - minY) + margin * 2;
  // 캔버스가 필요분의 1.5배 이내면(이미 적정) 손대지 않음 — 큰 매장 보호.
  if ((fp.canvasWidth || 0) <= needW * 1.5 && (fp.canvasHeight || 0) <= needH * 1.5) {
    return { changed: false, floorPlan: fp };
  }
  const dx = margin - minX, dy = margin - minY;
  const newTables = tables.map(t => ({ ...t, x: t.x + dx, y: t.y + dy }));
  return {
    changed: true,
    floorPlan: { ...fp, tables: newTables, canvasWidth: Math.round(needW), canvasHeight: Math.round(needH) }
  };
}

// ─── Main Component ───

const FloorPlanEditor: React.FC = () => {
  const { t } = useTranslation('floorplan');
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLDivElement>(null);

  const [floorPlan, setFloorPlan] = useState<FloorPlanData>(DEFAULT_FLOOR_PLAN);
  // Multi-select state. selectedIds is the canonical set; selectedId (singular) is derived for the
  // property panel which only shows when exactly one table is selected. Lasso selection on empty
  // canvas + Shift+click for incremental add/remove are the standard floor-plan editor patterns.
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const selectedId = selectedIds.size === 1 ? Array.from(selectedIds)[0] : null;
  const setSelectedId = useCallback((id: string | null) => {
    setSelectedIds(id == null ? new Set() : new Set([id]));
  }, []);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  // Lasso (rectangle) selection — drag on empty canvas to select multiple tables at once.
  const [lasso, setLasso] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  // Drag-to-add — shape currently being dragged from the palette into the canvas. Null when not dragging.
  const [dragAdd, setDragAdd] = useState<{ shape: FloorTable['shape']; config: typeof TABLE_SHAPES[number] } | null>(null);
  const justFinishedDrag = useRef(false);
  const [undoStack, setUndoStack] = useState<FloorPlanData[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string>('');
  // Zone filter (mirrors FloorPlanPage's chip pattern). 'all' = show every zone, otherwise the active zone id.
  // Drives both the canvas (only show tables in selected zone) and the Add Table dropdown (default group).
  const [activeZoneFilter, setActiveZoneFilter] = useState<string>('all');
  // Which group new tables are appended to. Auto-selects first group in active zone, or first group overall.
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  // Edit mode for the selected table's number. Default OFF — number is shown read-only so the user
  // doesn't accidentally change a table that already has orders/payments referencing it. Toggling
  // Change opens a search input that filters Settings-defined slots within the same group.
  const [editingTableNum, setEditingTableNum] = useState(false);
  const [tableNumQuery, setTableNumQuery] = useState('');
  // Canvas size inputs — buffered as raw strings while the user types so they can freely backspace
  // through digits without the value snapping to the min/max clamp mid-edit. Commit on blur / Enter.
  const [canvasWidthInput, setCanvasWidthInput] = useState<string>('');
  const [canvasHeightInput, setCanvasHeightInput] = useState<string>('');
  // Sync buffered inputs whenever the underlying floor plan canvas dimensions change (initial load,
  // undo, or an external commit). The local string is the visible value; the canvas itself uses the
  // committed number from floorPlan.canvasWidth/Height.
  useEffect(() => { setCanvasWidthInput(String(floorPlan.canvasWidth)); }, [floorPlan.canvasWidth]);
  useEffect(() => { setCanvasHeightInput(String(floorPlan.canvasHeight)); }, [floorPlan.canvasHeight]);
  const commitCanvasWidth = useCallback(() => {
    const v = Math.max(300, Math.min(5000, parseInt(canvasWidthInput, 10) || 1200));
    if (v !== floorPlan.canvasWidth) {
      setFloorPlan(prev => ({ ...prev, canvasWidth: v }));
      setHasChanges(true);
    }
    setCanvasWidthInput(String(v));
  }, [canvasWidthInput, floorPlan.canvasWidth]);
  const commitCanvasHeight = useCallback(() => {
    const v = Math.max(300, Math.min(5000, parseInt(canvasHeightInput, 10) || 800));
    if (v !== floorPlan.canvasHeight) {
      setFloorPlan(prev => ({ ...prev, canvasHeight: v }));
      setHasChanges(true);
    }
    setCanvasHeightInput(String(v));
  }, [canvasHeightInput, floorPlan.canvasHeight]);
  const [restaurantName, setRestaurantName] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Load floor plan & table settings from DB
  useEffect(() => {
    const load = async () => {
      try {
        const token = getAuthToken();
        const res = await fetch(`/api/restaurants/${restaurantId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) return;
        const data = await res.json();
        const restaurant = data.data || data;

        if (restaurant.name) {
          setRestaurantName(restaurant.name);
        }
        if (restaurant.floor_plan) {
          // 기능 A + 조치 B: 캔버스가 내용(테이블)보다 과도하게 크면 내용에 맞게 자동 fit
          // → 에디터에서 테이블이 작게 나오던 문제 해결. 큰 매장(내용이 꽉 찬 경우)은 가드로 미적용.
          const fitted = fitCanvasToContent(restaurant.floor_plan);
          setFloorPlan(fitted.floorPlan);
          if (fitted.changed) {
            setHasChanges(true);
            setStatusMsg('Canvas auto-fitted to your tables — review and Save to keep.');
          }
        }

        // NOTE: legacy `table_settings.tablePrefix + totalTables` (v1) auto-generated table number
        // pool removed in v3.39 hotfix #2 — table numbers now come from each group's existing
        // tableNumber max + 1 (group-aware). See `addTable` below.
      } catch (err) {
        console.error('Failed to load floor plan:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [restaurantId]);

  const selectedTable = floorPlan.tables.find(t => t.id === selectedId) || null;

  // Zone-filtered view of floor plan — only used for canvas rendering. The underlying floorPlan
  // (full data) stays intact so save/PUT writes back everything.
  const displayedFloorPlan = React.useMemo(() => {
    if (activeZoneFilter === 'all' || !floorPlan.zones || floorPlan.zones.length <= 1) return floorPlan;
    const groupIdsInZone = new Set(
      (floorPlan.table_groups || []).filter(g => g.zone_id === activeZoneFilter).map(g => g.id)
    );
    return {
      ...floorPlan,
      tables: (floorPlan.tables || []).filter(t => !t.group_id || groupIdsInZone.has(t.group_id))
    };
  }, [floorPlan, activeZoneFilter]);

  // Groups available for "Add Table" — restricted to the active zone when one is selected.
  // Empty array means: cannot add tables yet (user must create a group first in Settings).
  const groupsInScope = React.useMemo(() => {
    const all = floorPlan.table_groups || [];
    if (activeZoneFilter === 'all') return all;
    return all.filter(g => g.zone_id === activeZoneFilter);
  }, [floorPlan.table_groups, activeZoneFilter]);

  // Keep selectedGroupId valid as zone filter / groups change.
  React.useEffect(() => {
    if (groupsInScope.length === 0) { setSelectedGroupId(''); return; }
    if (!groupsInScope.some(g => g.id === selectedGroupId)) {
      setSelectedGroupId(groupsInScope[0].id);
    }
  }, [groupsInScope, selectedGroupId]);

  // Per-zone table counts (for the chip count badge).
  const zoneTableCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    for (const t of (floorPlan.tables || [])) {
      const g = (floorPlan.table_groups || []).find(g => g.id === t.group_id);
      const zid = g?.zone_id || '_unassigned';
      counts[zid] = (counts[zid] || 0) + 1;
    }
    return counts;
  }, [floorPlan.tables, floorPlan.table_groups]);

  // Save to DB
  const handleSave = async () => {
    setSaving(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/restaurants/${restaurantId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ name: restaurantName, floor_plan: floorPlan })
      });
      if (res.ok) {
        setHasChanges(false);
        setStatusMsg('Saved');
        setTimeout(() => setStatusMsg(''), 2000);
      }
    } catch (err) {
      console.error('Failed to save:', err);
    } finally {
      setSaving(false);
    }
  };

  // Add table — pool-aware. Picks the FIRST unplaced slot (1..slot_count) within the selected
  // group and drops it onto the canvas. Pool size is defined in Settings → Tables & QR. When all
  // slots are placed, addTable is a no-op and the UI directs the user to Settings to expand the pool.
  // Legacy data (group without slot_count) falls back to "pool = currently placed tables" so the
  // old behaviour of "endlessly add max+1" continues only for those carry-over restaurants.
  // `xOverride` / `yOverride` come from the drag-from-palette flow — when the user drops a shape
  // somewhere on the canvas, that drop coordinate is used instead of the default center placement.
  const addTable = (shape: FloorTable['shape'], shapeConfig?: { defaultWidth: number; defaultHeight: number }, xOverride?: number, yOverride?: number) => {
    if (!selectedGroupId) return;
    const group = (floorPlan.table_groups || []).find(g => g.id === selectedGroupId);
    if (!group) return;
    const sameGroup = (floorPlan.tables || []).filter(t => t.group_id === selectedGroupId);
    const placedNums = new Set(sameGroup.map(t => String(t.tableNumber)));
    const poolSize = group.slot_count != null ? group.slot_count : sameGroup.length;
    // Find the first 1..poolSize slot that isn't placed yet.
    let nextNumber: string | null = null;
    for (let i = 1; i <= poolSize; i++) {
      if (!placedNums.has(String(i))) { nextNumber = String(i); break; }
    }
    // If pool exhausted, do nothing — the UI shows "Edit pool in Settings" instead of an add button.
    if (nextNumber == null) return;

    const config = shapeConfig || TABLE_SHAPES.find(s => s.value === shape)!;
    const newTable: FloorTable = {
      id: `ft-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      tableNumber: nextNumber,
      label: computeTableLabel(group.prefix || '', nextNumber),
      shape,
      x: xOverride != null ? xOverride : floorPlan.canvasWidth / 2,
      y: yOverride != null ? yOverride : floorPlan.canvasHeight / 2,
      width: config.defaultWidth,
      height: config.defaultHeight,
      rotation: 0,
      seats: shape === 'square' ? 2 : 4,
      tableType: 'table',
      group_id: selectedGroupId
    };

    pushUndo();
    setFloorPlan(prev => ({ ...prev, tables: [...prev.tables, newTable] }));
    setSelectedId(newTable.id);
    setHasChanges(true);
  };

  // Add fixture (kitchen, counter, entrance)
  const addFixture = (preset: typeof FIXTURE_PRESETS[number]) => {
    const newFixture: FloorTable = {
      id: `fx-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      tableNumber: '',
      label: preset.textOnly ? preset.label.toUpperCase() : preset.label.replace(/ \(.\)$/, '').toUpperCase(),
      shape: 'rectangle',
      x: floorPlan.canvasWidth / 2,
      y: floorPlan.canvasHeight / 2,
      width: preset.defaultWidth,
      height: preset.defaultHeight,
      rotation: 0,
      seats: 0,
      tableType: preset.type
    };

    pushUndo();
    setFloorPlan(prev => ({ ...prev, tables: [...prev.tables, newFixture] }));
    setSelectedId(newFixture.id);
    setHasChanges(true);
  };

  // Delete selected tables (single or multi). Removes every table whose id is in selectedIds.
  const deleteSelected = () => {
    if (selectedIds.size === 0) return;
    const ids = new Set(selectedIds);
    pushUndo();
    setFloorPlan(prev => ({ ...prev, tables: prev.tables.filter(t => !ids.has(t.id)) }));
    setSelectedIds(new Set());
    setHasChanges(true);
  };

  // Undo
  const pushUndo = () => {
    setUndoStack(prev => [...prev.slice(-19), JSON.parse(JSON.stringify(floorPlan))]);
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const prev = undoStack[undoStack.length - 1];
    setUndoStack(s => s.slice(0, -1));
    setFloorPlan(prev);
    setSelectedId(null);
    setHasChanges(true);
  };

  // Update selected table property
  const updateTable = (updates: Partial<FloorTable>) => {
    if (!selectedId) return;
    setFloorPlan(prev => ({
      ...prev,
      tables: prev.tables.map(t => t.id === selectedId ? { ...t, ...updates } : t)
    }));
    setHasChanges(true);
  };

  // ─── Drag Logic ───
  const getCanvasScale = useCallback(() => {
    const canvas = canvasRef.current?.querySelector('[data-scaled-layer]')?.parentElement;
    if (!canvas) return { x: 1, y: 1, rect: new DOMRect() };
    const rect = canvas.getBoundingClientRect();
    return {
      x: floorPlan.canvasWidth / rect.width,
      y: floorPlan.canvasHeight / rect.height,
      rect
    };
  }, [floorPlan.canvasWidth, floorPlan.canvasHeight]);

  const getEventPos = (e: MouseEvent | TouchEvent) => {
    if ('touches' in e && e.touches.length > 0) {
      return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
    }
    if ('clientX' in e) {
      return { clientX: e.clientX, clientY: e.clientY };
    }
    return { clientX: 0, clientY: 0 };
  };

  // Drag start — handles three flows:
  //   1) plain click on a table → that table becomes the sole selection, drag moves it
  //   2) Shift/Ctrl/Cmd + click → toggle the table in/out of the selection set, no drag
  //   3) click on a table already in a multi-selection → drag moves the whole group together
  const startDrag = (clientX: number, clientY: number, tableId: string, shiftKey: boolean) => {
    const table = floorPlan.tables.find(t => t.id === tableId);
    if (!table) return;

    // Shift/Cmd toggles selection; no drag begins in this case so the user can keep picking.
    if (shiftKey) {
      setSelectedIds(prev => {
        const next = new Set(prev);
        if (next.has(tableId)) next.delete(tableId); else next.add(tableId);
        return next;
      });
      return;
    }

    // If the clicked table is part of an existing multi-selection, keep the set and group-drag.
    // Otherwise reset to single selection on this table.
    const inMulti = selectedIds.has(tableId) && selectedIds.size > 1;
    if (!inMulti) setSelectedIds(new Set([tableId]));

    const { x: sx, y: sy, rect } = getCanvasScale();
    setDragOffset({
      x: (clientX - rect.left) * sx - table.x,
      y: (clientY - rect.top) * sy - table.y
    });
    pushUndo();
    setIsDragging(true);
  };

  const handleTableMouseDown = (e: React.MouseEvent, tableId: string) => {
    e.preventDefault();
    e.stopPropagation();
    startDrag(e.clientX, e.clientY, tableId, e.shiftKey || e.metaKey || e.ctrlKey);
  };

  const handleTableTouchStart = (e: React.TouchEvent, tableId: string) => {
    e.stopPropagation();
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY, tableId, false);
  };

  useEffect(() => {
    if (!isDragging || selectedIds.size === 0) return;

    // Anchor table = the one the user grabbed (first in the set). The whole group moves as a rigid
    // body — every other selected table retains its offset relative to the anchor.
    const anchorId = Array.from(selectedIds)[0];
    const anchorAtDragStart = floorPlan.tables.find(t => t.id === anchorId);
    if (!anchorAtDragStart) return;
    const groupOffsets = new Map<string, { dx: number; dy: number }>();
    for (const t of floorPlan.tables) {
      if (selectedIds.has(t.id) && t.id !== anchorId) {
        groupOffsets.set(t.id, { dx: t.x - anchorAtDragStart.x, dy: t.y - anchorAtDragStart.y });
      }
    }

    const handleMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const { clientX, clientY } = getEventPos(e);
      const { x: sx, y: sy, rect } = getCanvasScale();

      let newX = (clientX - rect.left) * sx - dragOffset.x;
      let newY = (clientY - rect.top) * sy - dragOffset.y;

      // Snap based on the anchor table only (group keeps its relative spacing).
      const anchor = floorPlan.tables.find(t => t.id === anchorId);
      if (anchor) {
        const mouseEvt = e as MouseEvent;
        const touchEvt = e as TouchEvent;
        const shift = mouseEvt.shiftKey ?? touchEvt.shiftKey ?? false;
        const alt = mouseEvt.altKey ?? touchEvt.altKey ?? false;
        const mode: SnapMode = alt ? 'free' : shift ? 'center' : 'edge';
        newX = snapAxis(newX, anchor.width / 2, floorPlan.gridSize, mode);
        newY = snapAxis(newY, anchor.height / 2, floorPlan.gridSize, mode);
      }
      newX = Math.max(0, Math.min(floorPlan.canvasWidth, newX));
      newY = Math.max(0, Math.min(floorPlan.canvasHeight, newY));

      setFloorPlan(prev => ({
        ...prev,
        tables: prev.tables.map(t => {
          if (t.id === anchorId) return { ...t, x: newX, y: newY };
          const off = groupOffsets.get(t.id);
          if (off) {
            return {
              ...t,
              x: Math.max(0, Math.min(prev.canvasWidth, newX + off.dx)),
              y: Math.max(0, Math.min(prev.canvasHeight, newY + off.dy))
            };
          }
          return t;
        })
      }));
      setHasChanges(true);
    };

    const handleUp = () => {
      setIsDragging(false);
      justFinishedDrag.current = true;
      setTimeout(() => { justFinishedDrag.current = false; }, 0);
    };

    document.addEventListener('mousemove', handleMove, { passive: false });
    document.addEventListener('mouseup', handleUp);
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleUp);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, selectedIds, dragOffset, getCanvasScale, floorPlan.gridSize, floorPlan.canvasWidth, floorPlan.canvasHeight]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
        deleteSelected();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault();
        handleUndo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, undoStack]);

  if (loading) {
    return (
      <PageContainer>
        <Header><HeaderTitle>{t('floorplan:floorPlanEditor.floorPlanEditor')}</HeaderTitle></Header>
        <Content><div style={{ color: '#4B5563' }}>{t('floorplan:floorPlanEditor.loading')}</div></Content>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <HeaderTitle>{t('floorplan:floorPlanEditor.floorPlanEditor')}</HeaderTitle>
          <Btn
            $variant="secondary"
            onClick={() => {
              if (hasChanges && !window.confirm('Unsaved changes will be lost. Leave anyway?')) return;
              navigate(`/restaurant/${restaurantId}/floor-plan`);
            }}
            title="Back to Floor Plan"
          >
            ← {t('nav.back', 'Back')}
          </Btn>
        </div>
        <HeaderActions>
          {statusMsg && <StatusMsg $type="success">{statusMsg}</StatusMsg>}
          {hasChanges && <StatusMsg $type="info">{t('floorplan:floorPlanEditor.unsavedChanges')}</StatusMsg>}
          <Btn $variant="secondary" onClick={handleUndo} disabled={undoStack.length === 0}>
            Undo
          </Btn>
          <Btn $variant="primary" onClick={handleSave} disabled={saving || !hasChanges}>
            {saving ? 'Saving...' : 'Save'}
          </Btn>
        </HeaderActions>
      </Header>

      {/* Zone filter — only render when there are multiple zones (single-zone restaurants don't need it).
          Hides tables outside the active zone so multi-zone restaurants don't see canvases overlapping. */}
      {floorPlan.zones && floorPlan.zones.length > 1 && (
        <ZoneFilterBar>
          <ZoneChip
            type="button"
            $active={activeZoneFilter === 'all'}
            onClick={() => setActiveZoneFilter('all')}
          >
            {t('floorplan:floorPlanEditor.allZones', 'All Zones')}
            <ZoneChipCount>{(floorPlan.tables || []).length}</ZoneChipCount>
          </ZoneChip>
          {floorPlan.zones.map(z => (
            <ZoneChip
              key={z.id}
              type="button"
              $active={activeZoneFilter === z.id}
              onClick={() => setActiveZoneFilter(z.id)}
            >
              {z.name}
              <ZoneChipCount>{zoneTableCounts[z.id] || 0}</ZoneChipCount>
            </ZoneChip>
          ))}
        </ZoneFilterBar>
      )}

      <Content>
        <Sidebar>
          {/* Place Tables — pool-driven. The group dropdown shows pools defined in Settings; each
              "Add" button drops the next unplaced slot onto the canvas. When the pool runs out, the
              card morphs into a "Edit pool in Settings" link. No arbitrary numbers can be created here. */}
          {(() => {
            const settingsHref = `/restaurant/${restaurantId}/settings?tab=tablesQr`;
            const group = groupsInScope.find(g => g.id === selectedGroupId);
            const placedInGroup = group
              ? (floorPlan.tables || []).filter(t => t.group_id === group.id).length
              : 0;
            const poolSize = group
              ? (group.slot_count != null ? group.slot_count : placedInGroup)
              : 0;
            const remaining = Math.max(0, poolSize - placedInGroup);
            const poolExhausted = group && remaining === 0;

            return (
              <SidebarCard>
                <CardTitle>{t('floorplan:floorPlanEditor.placeTable', 'Place Table')}</CardTitle>
                {groupsInScope.length === 0 ? (
                  <div style={{
                    background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 8,
                    padding: '10px 12px', fontSize: 12, color: '#92400E', marginBottom: 10
                  }}>
                    {activeZoneFilter === 'all'
                      ? t('floorplan:floorPlanEditor.noGroupsAtAll', 'No groups configured yet. Go to Settings → Tables & QR to create zones and groups first.')
                      : t('floorplan:floorPlanEditor.noGroupsInZone', 'This zone has no groups. Create one in Settings → Tables & QR.')}
                    <div style={{ marginTop: 8 }}>
                      <Btn $variant="primary" onClick={() => navigate(settingsHref)} type="button">
                        {t('floorplan:floorPlanEditor.openSettings', 'Open Tables & QR Settings →')}
                      </Btn>
                    </div>
                  </div>
                ) : (
                  <>
                    <FormGroup style={{ marginBottom: 10 }}>
                      <FormLabel style={{ fontSize: 11 }}>
                        {t('floorplan:floorPlanEditor.addToGroup', 'Add to group')}
                      </FormLabel>
                      <FormSelect
                        value={selectedGroupId}
                        onChange={(e) => setSelectedGroupId(e.target.value)}
                      >
                        {groupsInScope.map(g => {
                          const zoneName = (floorPlan.zones || []).find(z => z.id === g.zone_id)?.name || '';
                          const placedCount = (floorPlan.tables || []).filter(t => t.group_id === g.id).length;
                          const pSize = g.slot_count != null ? g.slot_count : placedCount;
                          return (
                            <option key={g.id} value={g.id}>
                              {g.name}{g.prefix ? ` (${g.prefix})` : ''} — {placedCount}/{pSize}{zoneName && activeZoneFilter === 'all' ? ` · ${zoneName}` : ''}
                            </option>
                          );
                        })}
                      </FormSelect>
                      {group && (
                        <div style={{ fontSize: 11, color: '#4B5563', marginTop: 4 }}>
                          {t('floorplan:floorPlanEditor.poolStatus', { placed: placedInGroup, total: poolSize, defaultValue: 'Placed {{placed}} of {{total}}' })}
                        </div>
                      )}
                    </FormGroup>
                    {poolExhausted && (
                      <div style={{
                        background: '#F0F4FF', border: '1px solid #C7D2FE', borderRadius: 8,
                        padding: '10px 12px', fontSize: 12, color: '#3730A3', marginBottom: 10
                      }}>
                        {t('floorplan:floorPlanEditor.poolExhausted', 'All slots in this group are placed. To add more or change numbers, edit the pool in Settings.')}
                        <div style={{ marginTop: 8 }}>
                          <Btn $variant="primary" onClick={() => navigate(settingsHref)} type="button">
                            {t('floorplan:floorPlanEditor.openSettings', 'Open Tables & QR Settings →')}
                          </Btn>
                        </div>
                      </div>
                    )}
                  </>
                )}
                <ShapeGrid>
                  {TABLE_SHAPES.map((shape, idx) => (
                    <ShapeBtn
                      key={`${shape.value}-${idx}`}
                      // Unified click/drag handler — measure pointer movement after mousedown to
                      // distinguish click (place at center) from drag (place at drop point). The
                      // previous setup combined onClick + onMouseDown which fired both flows on a
                      // plain click and left dragAdd un-cleared, producing phantom tables on the
                      // very next canvas interaction.
                      onMouseDown={(e) => {
                        if (!selectedGroupId || poolExhausted) return;
                        e.preventDefault();
                        const startX = e.clientX;
                        const startY = e.clientY;
                        let dragged = false;
                        setDragAdd({ shape: shape.value, config: shape });
                        const onMove = (ev: MouseEvent) => {
                          if (!dragged && Math.hypot(ev.clientX - startX, ev.clientY - startY) > 5) dragged = true;
                        };
                        const onUp = (ev: MouseEvent) => {
                          document.removeEventListener('mousemove', onMove);
                          document.removeEventListener('mouseup', onUp);
                          if (!dragged) {
                            // Pure click → place at canvas center.
                            addTable(shape.value, shape);
                          } else {
                            // Drag — check if release landed inside the canvas plotting area, then
                            // clamp the drop coord so the shape stays fully inside the canvas.
                            const canvas = canvasRef.current;
                            if (canvas) {
                              const rect = canvas.getBoundingClientRect();
                              const inCanvas = ev.clientX >= rect.left && ev.clientX <= rect.right
                                            && ev.clientY >= rect.top && ev.clientY <= rect.bottom;
                              if (inCanvas) {
                                const { x: sx, y: sy } = getCanvasScale();
                                const dropX = (ev.clientX - rect.left) * sx;
                                const dropY = (ev.clientY - rect.top) * sy;
                                const halfW = shape.defaultWidth / 2;
                                const halfH = shape.defaultHeight / 2;
                                const minX = halfW + 4, maxX = floorPlan.canvasWidth - halfW - 4;
                                const minY = halfH + 4, maxY = floorPlan.canvasHeight - halfH - 4;
                                const cx = Math.max(minX, Math.min(maxX, dropX));
                                const cy = Math.max(minY, Math.min(maxY, dropY));
                                addTable(shape.value, shape, cx, cy);
                              }
                              // If release was outside canvas → cancel silently (don't add).
                            }
                          }
                          setDragAdd(null);
                        };
                        document.addEventListener('mousemove', onMove);
                        document.addEventListener('mouseup', onUp);
                      }}
                      disabled={!selectedGroupId || !!poolExhausted}
                      title={!selectedGroupId ? 'Select a group first' : poolExhausted ? 'Pool full — edit in Settings' : `Click to add at center, or drag to drop at exact spot`}
                    >
                      <ShapeIcon $shape={shape.value} $variant={shape.variant} />
                      {shape.label}
                    </ShapeBtn>
                  ))}
                  {FIXTURE_PRESETS.filter(p => !p.textOnly).map((preset, idx) => (
                    <ShapeBtn
                      key={`counter-${idx}`}
                      onClick={() => addFixture(preset)}
                      title={`Add ${preset.label}`}
                    >
                      <ShapeIcon $shape="rectangle" $variant={preset.variant === 'vertical' ? 'vertical' : undefined} />
                      {preset.label}
                    </ShapeBtn>
                  ))}
                </ShapeGrid>
              </SidebarCard>
            );
          })()}

          {/* Text Labels (Kitchen, Entrance) */}
          <SidebarCard>
            <CardTitle>{t('floorplan:floorPlanEditor.labels')}</CardTitle>
            <ShapeGrid>
              {FIXTURE_PRESETS.filter(p => p.textOnly).map(preset => (
                <ShapeBtn
                  key={preset.type}
                  onClick={() => addFixture(preset)}
                  title={`Add ${preset.label} label`}
                >
                  <FixtureIcon $type={preset.type}>{preset.icon}</FixtureIcon>
                  {preset.label}
                </ShapeBtn>
              ))}
            </ShapeGrid>
          </SidebarCard>

          {/* Canvas Size — large restaurants need a bigger plotting area than the 1200x800 default.
              Inputs accept any digits while typing (no live clamp). Value is clamped to 600..5000
              on blur / Enter so the user can freely backspace through digits to type a new value. */}
          <SidebarCard>
            <CardTitle>{t('floorplan:floorPlanEditor.canvasSize', 'Canvas Size')}</CardTitle>
            <FormRow>
              <FormGroup>
                <FormLabel>{t('floorplan:floorPlanEditor.width', 'Width')}</FormLabel>
                <FormInput
                  type="number"
                  min={300}
                  max={5000}
                  step={100}
                  value={canvasWidthInput}
                  onChange={(e) => setCanvasWidthInput(e.target.value)}
                  onBlur={commitCanvasWidth}
                  onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>{t('floorplan:floorPlanEditor.height', 'Height')}</FormLabel>
                <FormInput
                  type="number"
                  min={300}
                  max={5000}
                  step={100}
                  value={canvasHeightInput}
                  onChange={(e) => setCanvasHeightInput(e.target.value)}
                  onBlur={commitCanvasHeight}
                  onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
                />
              </FormGroup>
            </FormRow>
            <div style={{ fontSize: 11, color: '#4B5563', marginTop: 6 }}>
              {t('floorplan:floorPlanEditor.canvasSizeHint', 'Default 1200×800. Range 300–5000 each side. Increase for large multi-zone restaurants.')}
            </div>
          </SidebarCard>

          {/* Properties Panel */}
          {selectedTable && (() => {
            const isFixture = selectedTable.tableType && selectedTable.tableType !== 'table';
            return (
              <SidebarCard>
                <CardTitle>{isFixture ? 'Fixture Properties' : 'Table Properties'}</CardTitle>
                {!isFixture && (
                  <FormGroup>
                    <FormLabel>{t('floorplan:floorPlanEditor.tableNumber')}</FormLabel>
                    {/* Read-only by default — table numbers flow through orders/payments/receipts,
                        so changing them is treated as a deliberate action. "Change" opens a search
                        input that ONLY surfaces unplaced slots within the same group's pool (defined
                        in Settings → Tables & QR). No arbitrary numbers can be typed in. */}
                    {(() => {
                      const grp = (floorPlan.table_groups || []).find(g => g.id === selectedTable.group_id);
                      const prefix = grp?.prefix || '';
                      const settingsHref = `/restaurant/${restaurantId}/settings?tab=tablesQr`;
                      const displayLabel = prefix
                        ? `${prefix}-${selectedTable.tableNumber}`
                        : String(selectedTable.tableNumber);

                      if (!editingTableNum) {
                        return (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{
                              flex: 1, padding: '8px 10px', border: '1px solid #C7CED6',
                              borderRadius: 6, background: '#F9FAFB', color: '#0A2540', fontSize: 13
                            }}>
                              {displayLabel}
                            </div>
                            <button
                              type="button"
                              onClick={() => { setEditingTableNum(true); setTableNumQuery(''); }}
                              style={{
                                background: 'transparent', border: 0, color: '#635BFF',
                                fontSize: 12, cursor: 'pointer', padding: '4px 6px'
                              }}
                            >
                              {t('floorplan:floorPlanEditor.change', 'Change')}
                            </button>
                          </div>
                        );
                      }

                      // Edit mode — show EVERY slot in this group's pool (1..slot_count). Each entry
                      // is marked either "available" (not placed yet) or "in use by <label>" (another
                      // table currently owns this number). Picking an "in use" slot swaps the two
                      // tables' numbers/labels — both keep their canvas position, only the identifier
                      // changes. This matches how restaurants actually reorganise seat numbering.
                      const sameGroup = (floorPlan.tables || []).filter(t => t.group_id === selectedTable.group_id);
                      const otherById = new Map<string, typeof sameGroup[number]>();
                      for (const t of sameGroup) {
                        if (t.id !== selectedTable.id) otherById.set(String(t.tableNumber), t);
                      }
                      const poolSize = grp?.slot_count != null
                        ? grp.slot_count
                        : Math.max(sameGroup.length, parseInt(String(selectedTable.tableNumber), 10) || 0);
                      const q = tableNumQuery.trim();
                      type Candidate = { n: string; takenBy: typeof sameGroup[number] | null };
                      const candidates: Candidate[] = [];
                      for (let i = 1; i <= poolSize; i++) {
                        const s = String(i);
                        if (s === String(selectedTable.tableNumber)) continue;
                        if (q && !s.includes(q)) continue;
                        candidates.push({ n: s, takenBy: otherById.get(s) || null });
                      }
                      const applyPick = (pick: Candidate) => {
                        if (!pick.takenBy) {
                          // Free slot — straight rename.
                          updateTable({ tableNumber: pick.n, label: computeTableLabel(prefix, pick.n) });
                        } else {
                          // Slot already owned by another placed table → atomic swap. Both tables keep
                          // their position/shape/seats; only the identifier (number + label) is exchanged
                          // so the floor plan stays visually identical while the labels reorder.
                          const myNum = String(selectedTable.tableNumber);
                          const other = pick.takenBy;
                          pushUndo();
                          setFloorPlan(prev => ({
                            ...prev,
                            tables: prev.tables.map(t => {
                              if (t.id === selectedTable.id) {
                                return { ...t, tableNumber: pick.n, label: computeTableLabel(prefix, pick.n) };
                              }
                              if (t.id === other.id) {
                                return { ...t, tableNumber: myNum, label: computeTableLabel(prefix, myNum) };
                              }
                              return t;
                            })
                          }));
                          setHasChanges(true);
                        }
                        setEditingTableNum(false);
                        setTableNumQuery('');
                      };
                      return (
                        <div>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <FormInput
                              autoFocus
                              value={tableNumQuery}
                              placeholder={t('floorplan:floorPlanEditor.searchNumber', 'Type a number or leave blank to see all...')}
                              onChange={(e) => setTableNumQuery(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Escape') { setEditingTableNum(false); setTableNumQuery(''); }
                                else if (e.key === 'Enter' && candidates.length > 0) applyPick(candidates[0]);
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => { setEditingTableNum(false); setTableNumQuery(''); }}
                              style={{
                                background: 'transparent', border: '1px solid #C7CED6',
                                borderRadius: 6, padding: '0 10px', fontSize: 12, color: '#4B5563',
                                cursor: 'pointer'
                              }}
                            >
                              {t('floorplan:floorPlanEditor.cancel', 'Cancel')}
                            </button>
                          </div>
                          {/* Always show the list (no need to type) — empty query = full pool. */}
                          <div style={{
                            marginTop: 6, border: '1px solid #C7CED6', borderRadius: 6,
                            maxHeight: 220, overflowY: 'auto', background: 'white'
                          }}>
                            {candidates.length === 0 ? (
                              <div style={{ padding: '10px 12px', fontSize: 12, color: '#4B5563' }}>
                                {t('floorplan:floorPlanEditor.noMatch', 'No matching numbers. To add more, edit the pool in Settings.')}
                                <div style={{ marginTop: 6 }}>
                                  <button
                                    type="button"
                                    onClick={() => navigate(settingsHref)}
                                    style={{
                                      background: 'transparent', border: 0, color: '#635BFF',
                                      fontSize: 12, cursor: 'pointer', padding: 0
                                    }}
                                  >
                                    {t('floorplan:floorPlanEditor.openSettings', 'Open Tables & QR Settings →')}
                                  </button>
                                </div>
                              </div>
                            ) : (
                              candidates.slice(0, 50).map(c => {
                                const takenLabel = c.takenBy
                                  ? (prefix ? `${prefix}-${c.takenBy.tableNumber}` : String(c.takenBy.tableNumber))
                                  : '';
                                return (
                                  <button
                                    key={c.n}
                                    type="button"
                                    onClick={() => applyPick(c)}
                                    title={c.takenBy
                                      ? t('floorplan:floorPlanEditor.swapHint', { defaultValue: 'Swap with {{label}}', label: takenLabel })
                                      : t('floorplan:floorPlanEditor.availableHint', 'Available — pick to assign')}
                                    style={{
                                      display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between',
                                      gap: 8, padding: '8px 12px', border: 0, background: 'white',
                                      cursor: 'pointer', fontSize: 13, color: '#0A2540',
                                      borderBottom: '1px solid #F1F5F9', textAlign: 'left'
                                    }}
                                  >
                                    <span style={{ fontWeight: 500 }}>{prefix ? `${prefix}-${c.n}` : c.n}</span>
                                    {c.takenBy ? (
                                      <span style={{
                                        fontSize: 11, color: '#92400E', background: '#FEF3C7',
                                        padding: '2px 8px', borderRadius: 999, fontWeight: 500
                                      }}>
                                        ⇄ {t('floorplan:floorPlanEditor.swapWith', { defaultValue: 'Swap with {{label}}', label: takenLabel })}
                                      </span>
                                    ) : (
                                      <span style={{
                                        fontSize: 11, color: '#15803D', background: '#DCFCE7',
                                        padding: '2px 8px', borderRadius: 999, fontWeight: 500
                                      }}>
                                        {t('floorplan:floorPlanEditor.available', 'Available')}
                                      </span>
                                    )}
                                  </button>
                                );
                              })
                            )}
                          </div>
                          <div style={{ marginTop: 6, fontSize: 11, color: '#4B5563' }}>
                            {t('floorplan:floorPlanEditor.changeNumberHintV2', 'Pool size set in Settings → Tables & QR. Picking a number already in use will swap the two tables.')}
                          </div>
                        </div>
                      );
                    })()}
                  </FormGroup>
                )}
                <FormGroup>
                  <FormLabel>{t('floorplan:floorPlanEditor.label')}</FormLabel>
                  <FormInput
                    value={selectedTable.label}
                    onChange={(e) => updateTable({ label: e.target.value })}
                  />
                </FormGroup>
                {!isFixture && (
                  <>
                    <FormGroup>
                      <FormLabel>{t('floorplan:floorPlanEditor.shape')}</FormLabel>
                      {/* Rect (H) and Rect (V) both store shape="rectangle" in DB — they only differ
                          by orientation (width vs height). The select needs a composite key so V can
                          be distinguished from H; we encode it as "rectangle:vertical" in the option
                          value, then decode on change to pick the right TABLE_SHAPES entry. */}
                      {(() => {
                        const currentKey = selectedTable.shape === 'rectangle'
                          ? (selectedTable.width < selectedTable.height ? 'rectangle:vertical' : 'rectangle:horizontal')
                          : selectedTable.shape;
                        const optKey = (s: typeof TABLE_SHAPES[number]) =>
                          s.value === 'rectangle'
                            ? (s.variant === 'vertical' ? 'rectangle:vertical' : 'rectangle:horizontal')
                            : s.value;
                        return (
                          <FormSelect
                            value={currentKey}
                            onChange={(e) => {
                              const key = e.target.value;
                              const config = TABLE_SHAPES.find(s => optKey(s) === key)!;
                              updateTable({
                                shape: config.value,
                                width: config.defaultWidth,
                                height: config.defaultHeight
                              });
                            }}
                          >
                            {TABLE_SHAPES.map((s, idx) => (
                              <option key={`${s.value}-${idx}`} value={optKey(s)}>{s.label}</option>
                            ))}
                          </FormSelect>
                        );
                      })()}
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>{t('floorplan:floorPlanEditor.size')}</FormLabel>
                      <SizeRow>
                        {(() => {
                          const isRect = selectedTable.shape === 'rectangle';
                          const isVertical = selectedTable.width < selectedTable.height;
                          const sizes = isRect
                            ? (isVertical
                              ? [{ label: 'S', w: 55, h: 85, seats: 2 }, { label: 'M', w: 70, h: 110, seats: 4 }, { label: 'L', w: 90, h: 140, seats: 6 }]
                              : [{ label: 'S', w: 85, h: 55, seats: 2 }, { label: 'M', w: 110, h: 70, seats: 4 }, { label: 'L', w: 140, h: 90, seats: 6 }])
                            : [{ label: 'S', w: 60, h: 60, seats: 2 }, { label: 'M', w: 70, h: 70, seats: 4 }, { label: 'L', w: 90, h: 90, seats: 6 }];
                          return sizes.map(s => (
                            <SizeBtn
                              key={s.label}
                              $active={selectedTable.width === s.w && selectedTable.height === s.h}
                              onClick={() => updateTable({ width: s.w, height: s.h, seats: s.seats })}
                            >
                              {s.label}
                            </SizeBtn>
                          ));
                        })()}
                      </SizeRow>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>{t('floorplan:floorPlanEditor.seats')}</FormLabel>
                      <FormInput
                        type="number"
                        min={1} max={20}
                        value={selectedTable.seats}
                        onChange={(e) => updateTable({ seats: parseInt(e.target.value) || 1 })}
                      />
                    </FormGroup>
                  </>
                )}
                <FormRow>
                  <FormGroup>
                    <FormLabel>{t('floorplan:floorPlanEditor.width')}</FormLabel>
                    <FormInput
                      type="number"
                      min={30} max={300}
                      value={selectedTable.width}
                      onChange={(e) => {
                        const w = parseInt(e.target.value) || 60;
                        updateTable({
                          width: w,
                          height: selectedTable.shape === 'round' || selectedTable.shape === 'square' ? w : selectedTable.height
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>{t('floorplan:floorPlanEditor.height')}</FormLabel>
                    <FormInput
                      type="number"
                      min={30} max={300}
                      value={selectedTable.height}
                      onChange={(e) => updateTable({ height: parseInt(e.target.value) || 60 })}
                      disabled={!isFixture && selectedTable.shape !== 'rectangle'}
                    />
                  </FormGroup>
                </FormRow>
                <SizeRow style={{ marginTop: '8px' }}>
                  <Btn onClick={() => {
                    if (floorPlan.gridSize <= 0) return;
                    const nx = snapAxis(selectedTable.x, selectedTable.width / 2, floorPlan.gridSize, 'edge');
                    const ny = snapAxis(selectedTable.y, selectedTable.height / 2, floorPlan.gridSize, 'edge');
                    updateTable({ x: nx, y: ny });
                  }} style={{ flex: 1, justifyContent: 'center' }}>
                    ⊟ Snap edge
                  </Btn>
                  <Btn onClick={() => {
                    if (floorPlan.gridSize <= 0) return;
                    const nx = snapAxis(selectedTable.x, selectedTable.width / 2, floorPlan.gridSize, 'center');
                    const ny = snapAxis(selectedTable.y, selectedTable.height / 2, floorPlan.gridSize, 'center');
                    updateTable({ x: nx, y: ny });
                  }} style={{ flex: 1, justifyContent: 'center' }}>
                    ⊕ Snap center
                  </Btn>
                </SizeRow>
                <FormGroup style={{ marginTop: 12 }}>
                  <FormLabel>{t('floorplan:floorPlanEditor.rotation', 'Rotation')}</FormLabel>
                  <FormRow>
                    <FormInput
                      type="number"
                      min={0} max={359} step={15}
                      value={selectedTable.rotation || 0}
                      onChange={(e) => {
                        const v = parseInt(e.target.value, 10);
                        const norm = ((Number.isFinite(v) ? v : 0) % 360 + 360) % 360;
                        updateTable({ rotation: norm });
                      }}
                      style={{ width: 80 }}
                    />
                    <SizeRow style={{ flex: 1, marginLeft: 8 }}>
                      {[0, 45, 90, -45].map(deg => {
                        const target = ((selectedTable.rotation || 0) + deg + 360) % 360;
                        return (
                          <Btn key={deg} onClick={() => updateTable({ rotation: target })} style={{ flex: 1, justifyContent: 'center' }}>
                            {deg === 0 ? '0°' : `${deg > 0 ? '+' : ''}${deg}°`}
                          </Btn>
                        );
                      })}
                    </SizeRow>
                  </FormRow>
                  <div style={{ fontSize: 10, color: '#6B7280', marginTop: 6, lineHeight: 1.5 }}>
                    {t('floorplan:floorPlanEditor.rotationHint', 'Rotate booth / long table to match floor layout. 0° = upright.')}
                  </div>
                </FormGroup>
                <div style={{ fontSize: 10, color: '#6B7280', marginTop: 8, lineHeight: 1.5 }}>
                  Drag: edge snap · Shift = center snap · Alt = free
                </div>
                <Btn $variant="danger" onClick={deleteSelected} style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>
                  Delete {isFixture ? 'Fixture' : 'Table'}
                </Btn>
              </SidebarCard>
            );
          })()}

          {/* Canvas Settings */}
          <SidebarCard>
            <CardTitle>{t('floorplan:floorPlanEditor.canvas')}</CardTitle>
            <CheckboxRow>
              <input
                type="checkbox"
                checked={floorPlan.showGrid}
                onChange={(e) => {
                  setFloorPlan(prev => ({ ...prev, showGrid: e.target.checked }));
                  setHasChanges(true);
                }}
              />
              Show Grid
            </CheckboxRow>
            <FormGroup style={{ marginTop: '8px' }}>
              <FormLabel>{t('floorplan:floorPlanEditor.gridSize')}</FormLabel>
              <FormInput
                type="number"
                min={10} max={50} step={5}
                value={floorPlan.gridSize}
                onChange={(e) => {
                  setFloorPlan(prev => ({ ...prev, gridSize: parseInt(e.target.value) || 20 }));
                  setHasChanges(true);
                }}
              />
            </FormGroup>
          </SidebarCard>
        </Sidebar>

        <CanvasArea
          ref={canvasRef}
          onMouseDown={(e) => {
            // Lasso (rectangle) selection on empty canvas. Skip when the user clicked a table —
            // those events stop propagation in handleTableMouseDown. Also skip if a drag-add from
            // palette is in progress (that flow is finalised on mouseup elsewhere).
            if (dragAdd) return;
            const target = e.target as HTMLElement;
            // Bail out if click landed on a table node (TableNode shapes have their own handlers).
            if (target.closest('[data-table-node]')) return;
            const { x: sx, y: sy, rect } = getCanvasScale();
            const startX = (e.clientX - rect.left) * sx;
            const startY = (e.clientY - rect.top) * sy;
            setLasso({ x1: startX, y1: startY, x2: startX, y2: startY });
            // Don't immediately clear selection — wait for mouseup to decide (a click without drag clears).
          }}
          onMouseMove={(e) => {
            if (!lasso) return;
            const { x: sx, y: sy, rect } = getCanvasScale();
            const x = (e.clientX - rect.left) * sx;
            const y = (e.clientY - rect.top) * sy;
            setLasso(l => l && { ...l, x2: x, y2: y });
          }}
          onMouseUp={(e) => {
            // Drag-add finalisation lives in the ShapeBtn handler now (document-level mouseup),
            // so this onMouseUp only deals with lasso selection. The ShapeBtn flow guarantees
            // dragAdd is cleared even when release happens outside the canvas (or back on the
            // button itself), so we no longer get phantom tables on subsequent canvas clicks.
            // Lasso: select every table whose bounding box INTERSECTS the lasso rectangle
            // (industry standard — Figma, Sketch, Illustrator all use box-intersection). The earlier
            // center-only check missed tables that were only partially inside the lasso.
            if (lasso) {
              const x0 = Math.min(lasso.x1, lasso.x2);
              const x1 = Math.max(lasso.x1, lasso.x2);
              const y0 = Math.min(lasso.y1, lasso.y2);
              const y1 = Math.max(lasso.y1, lasso.y2);
              const isClick = (x1 - x0) < 4 && (y1 - y0) < 4;
              if (isClick) {
                if (!justFinishedDrag.current) setSelectedIds(new Set());
              } else {
                const next = new Set<string>();
                for (const t of (displayedFloorPlan.tables || [])) {
                  const halfW = (t.width || 0) / 2;
                  const halfH = (t.height || 0) / 2;
                  const tx0 = t.x - halfW, tx1 = t.x + halfW;
                  const ty0 = t.y - halfH, ty1 = t.y + halfH;
                  // AABB intersection test — if any part of the table overlaps the lasso, select it.
                  const intersects = !(tx1 < x0 || tx0 > x1 || ty1 < y0 || ty0 > y1);
                  if (intersects) next.add(t.id);
                }
                setSelectedIds(next);
              }
              setLasso(null);
            }
          }}
          style={{ position: 'relative', cursor: dragAdd ? 'crosshair' : undefined }}
        >
          {/* Canvas renders the filtered view. The underlying `floorPlan` state (full data) is what
              save/PUT writes back, so filtering is a pure render concern with no data side-effect. */}
          <FloorPlanCanvas
            floorPlan={displayedFloorPlan}
            isEditing={true}
            selectedTableId={selectedId}
            selectedTableIds={selectedIds}
            onTableMouseDown={handleTableMouseDown}
            onTableTouchStart={handleTableTouchStart}
            onCanvasClick={() => { /* lasso/mouseup handles clearing */ }}
          />
          {/* Lasso rectangle overlay — rendered in canvas coords scaled by getCanvasScale. */}
          {lasso && (() => {
            const { x: sx, y: sy } = getCanvasScale();
            const x0 = Math.min(lasso.x1, lasso.x2) / sx;
            const y0 = Math.min(lasso.y1, lasso.y2) / sy;
            const w = Math.abs(lasso.x2 - lasso.x1) / sx;
            const h = Math.abs(lasso.y2 - lasso.y1) / sy;
            return (
              <div style={{
                position: 'absolute', left: x0, top: y0, width: w, height: h,
                border: '1.5px dashed #635BFF', background: 'rgba(99,91,255,0.08)',
                pointerEvents: 'none', borderRadius: 2, zIndex: 5
              }} />
            );
          })()}
          {/* Multi-select badge — shows how many tables are selected when more than one. */}
          {selectedIds.size > 1 && (
            <div style={{
              position: 'absolute', top: 12, right: 12, zIndex: 6,
              background: '#635BFF', color: 'white', fontSize: 12, fontWeight: 600,
              padding: '6px 10px', borderRadius: 999, boxShadow: '0 2px 8px rgba(99,91,255,0.25)'
            }}>
              {t('floorplan:floorPlanEditor.multiSelected', { count: selectedIds.size, defaultValue: '{{count}} selected' })}
            </div>
          )}
        </CanvasArea>
      </Content>
    </PageContainer>
  );
};

export default FloorPlanEditor;
