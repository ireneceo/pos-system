// Foodcourt Floor Plan EDITOR — structure cloned from Restaurant FloorPlanEditor.tsx.
// Same Header/Sidebar/Canvas layout, same styled components, uses FloorPlanCanvas.
// Data: foodcourt units (stores) placed on per-branch per-floor plans.
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FloorPlanData, FloorTable, TABLE_SHAPES } from '../FloorPlan/types';
import FloorPlanCanvas from '../FloorPlan/FloorPlanCanvas';
import FoodcourtUnitNode, { UnitDisplay } from './FoodcourtUnitNode';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { getAuthToken } from '../../utils/auth';

// ───── Types ─────
interface Branch { id: number; name: string; code: string; foodcourt_id: number; is_primary?: boolean; }
interface FoodcourtUnit {
  id: number; unit_number: string; status: string;
  plan_x: number | null; plan_y: number | null;
  plan_width: number | null; plan_height: number | null;
  plan_shape: string | null;
}
interface FloorPlan {
  id: number; branch_id: number; floor_name: string;
  canvas_width: number; canvas_height: number; grid_size: number; show_grid: boolean;
  units: FoodcourtUnit[];
}

// ───── Styled (cloned from FloorPlanEditor.tsx) ─────
const PageContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #F9FAFB; height: 100vh;
  display: flex; flex-direction: column; overflow: hidden;
`;
const Header = styled.div`
  background: white; padding: 16px 32px; border-bottom: 1px solid #C7CED6;
  display: flex; justify-content: space-between; align-items: center; height: 56px;
  @media (max-width: 768px) { padding: 12px 16px; height: auto; }
`;
const HeaderTitle = styled.h1`font-size: 24px; font-weight: 700; color: #0A2540; margin: 0;`;
const HeaderActions = styled.div`display: flex; gap: 12px; align-items: center;`;
const Btn = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all .15s; border: none;
  display: flex; align-items: center; gap: 6px;
  ${p => p.$variant === 'primary' ? `
    background: #635BFF; color: white;
    &:hover { background: #5A51E6; transform: translateY(-1px); }
    &:disabled { opacity: .6; cursor: not-allowed; transform: none; }
  ` : p.$variant === 'danger' ? `
    background: #FEE2E2; color: #DC2626;
    &:hover { background: #FECACA; }
  ` : `
    background: #F1F4F8; color: #1F2937;
    &:hover { background: #C7CED6; }
    &:disabled { opacity: .6; cursor: not-allowed; }
  `}
`;
const StatusMsg = styled.div<{ $type: 'success' | 'info' }>`
  font-size: 12px; font-weight: 500;
  color: ${p => p.$type === 'success' ? '#059669' : '#4B5563'};
`;

const SubHeader = styled.div`
  background: white; padding: 8px 24px; border-bottom: 1px solid #C7CED6;
  display: flex; gap: 12px; align-items: center; flex-shrink: 0; flex-wrap: wrap;
`;
const Select = styled.select`
  padding: 5px 10px; border: 1px solid #C7CED6; border-radius: 6px;
  font-size: 13px; background: white; cursor: pointer;
`;
const Tabs = styled.div`display: flex; gap: 2px; flex: 1; overflow-x: auto;`;
const TabBtn = styled.button<{ $active?: boolean }>`
  padding: 5px 12px; border: none; background: none; cursor: pointer;
  font-size: 13px; font-weight: 500; white-space: nowrap;
  color: ${p => p.$active ? '#635BFF' : '#4B5563'};
  border-bottom: 2px solid ${p => p.$active ? '#635BFF' : 'transparent'};
  &:hover { color: #635BFF; }
`;

const Content = styled.div`
  flex: 1; display: flex; padding: 24px; gap: 20px; min-height: 0; overflow: hidden;
  @media (max-width: 768px) { flex-direction: column; padding: 16px; }
`;
const Sidebar = styled.div`
  width: 240px; flex-shrink: 0;
  display: flex; flex-direction: column; gap: 16px; overflow-y: auto;
  @media (max-width: 768px) { width: 100%; flex-direction: row; flex-wrap: wrap; overflow-y: visible; }
`;
const SidebarCard = styled.div`
  background: white; border: 1px solid #C7CED6; border-radius: 8px; padding: 16px;
`;
const CardTitle = styled.div`
  font-size: 12px; font-weight: 600; color: #4B5563;
  text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;
`;
const ShapeGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;`;
const ShapeBtn = styled.button`
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  padding: 10px 4px; border: 1px solid #C7CED6; border-radius: 6px;
  background: white; cursor: pointer; transition: all .15s;
  font-size: 10px; color: #4B5563; font-weight: 500;
  &:hover:not(:disabled) { border-color: #635BFF; color: #635BFF; background: rgba(99,91,255,.04); }
  &:disabled { opacity: .4; cursor: not-allowed; }
`;
const ShapeIcon = styled.div<{ $shape: string; $variant?: string }>`
  width: ${p => p.$variant === 'vertical' ? '24px' : p.$shape === 'rectangle' ? '36px' : '24px'};
  height: ${p => p.$variant === 'vertical' ? '36px' : '24px'};
  border: 2px solid currentColor;
  border-radius: ${p => p.$shape === 'round' ? '50%' : '4px'};
`;
const UnplacedChip = styled.button<{ $border: string }>`
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 10px;
  background: white; border: 1px solid ${p => p.$border}; border-radius: 16px;
  font-size: 12px; color: #0A2540; cursor: pointer; margin: 3px 3px 3px 0;
  &:hover { background: #F1F4F8; }
  &::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background: ${p => p.$border}; }
`;
const CanvasArea = styled.div`flex: 1; display: flex; flex-direction: column; min-height: 0;`;
const FormGroup = styled.div`margin-bottom: 12px; &:last-child { margin-bottom: 0; }`;
const FormLabel = styled.label`
  display: block; font-size: 11px; font-weight: 500; color: #4B5563;
  text-transform: uppercase; margin-bottom: 4px;
`;
const FormInput = styled.input`
  width: 100%; padding: 6px 10px; border: 1px solid #C7CED6; border-radius: 4px;
  font-size: 13px; box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 2px rgba(99,91,255,.1); }
`;
const FormSelect = styled.select`
  width: 100%; padding: 6px 10px; border: 1px solid #C7CED6; border-radius: 4px;
  font-size: 13px; background: white; box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; }
`;
const FormRow = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 8px;`;
const SizeRow = styled.div`display: flex; gap: 6px; margin-bottom: 12px;`;
const SizeBtn = styled.button<{ $active?: boolean }>`
  flex: 1; padding: 6px 4px;
  border: 1px solid ${p => p.$active ? '#635BFF' : '#C7CED6'};
  border-radius: 4px;
  background: ${p => p.$active ? 'rgba(99,91,255,.08)' : 'white'};
  color: ${p => p.$active ? '#635BFF' : '#4B5563'};
  font-size: 11px; font-weight: 600; cursor: pointer; transition: all .1s;
  &:hover { border-color: #635BFF; }
`;
const CheckboxRow = styled.label`
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; color: #1F2937; cursor: pointer; margin-top: 8px;
`;

// ───── Component ─────

// Grid-friendly defaults — all multiples of 20 so shape edges AND center both land on grid.
const UNIT_SHAPES = [
  { key: 'round',  shape: 'round',     label: 'Round',    w: 80,  h: 80  },
  { key: 'square', shape: 'square',    label: 'Square',   w: 80,  h: 80  },
  { key: 'rect-h', shape: 'rectangle', label: 'Rect (H)', w: 120, h: 80  },
  { key: 'rect-v', shape: 'rectangle', label: 'Rect (V)', w: 80,  h: 120, variant: 'vertical' }
];

// Editable store (mirrors FloorTable but with Foodcourt unit id + shape kept DB-native)
interface EditableStore extends FloorTable {
  unitId: number;
  dbShape: 'rect' | 'circle'; // what to save to DB
}

const STATUS_COLORS: Record<string, { border: string }> = {
  vacant:    { border: '#6B7280' },
  reserved:  { border: '#F59E0B' },
  preparing: { border: '#3B82F6' },
  occupied:  { border: '#16A34A' }
};

// Grid snap on one axis. `centerPos` is the cursor-following center; `half` is half the
// shape's extent. Mode controls which key point aligns to grid:
//   'edge'   — left/top edge snaps (default — predictable, matches Figma/Sketch)
//   'center' — center snaps (hold Shift during drag)
//   'free'   — no snap (hold Alt during drag)
type SnapMode = 'edge' | 'center' | 'free';
function snapAxis(centerPos: number, half: number, gridSize: number, mode: SnapMode): number {
  if (mode === 'free' || gridSize <= 0) return centerPos;
  if (mode === 'center') {
    return Math.round(centerPos / gridSize) * gridSize;
  }
  // edge mode — snap the top/left edge, then re-center
  const snappedEdge = Math.round((centerPos - half) / gridSize) * gridSize;
  return snappedEdge + half;
}

const FoodcourtFloorPlanEditorPage: React.FC = () => {
  const { t } = useTranslation('contract');
  const navigate = useNavigate();
  const { user } = useAuth();
  const fcId = user?.foodcourt_id;
  const [searchParams] = useSearchParams();
  const branchFromUrl = searchParams.get('branch') ? Number(searchParams.get('branch')) : null;
  const planFromUrl = searchParams.get('plan') ? Number(searchParams.get('plan')) : null;

  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(branchFromUrl);
  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(planFromUrl);
  const [allUnits, setAllUnits] = useState<FoodcourtUnit[]>([]);

  // Editable state (mirrors FloorPlanData)
  const [canvasW, setCanvasW] = useState(1200);
  const [canvasH, setCanvasH] = useState(800);
  const [gridSize, setGridSize] = useState(20);
  const [showGrid, setShowGrid] = useState(true);
  const [stores, setStores] = useState<EditableStore[]>([]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const justFinishedDrag = useRef(false);
  const [undoStack, setUndoStack] = useState<EditableStore[][]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [unplaceIds, setUnplaceIds] = useState<Set<number>>(new Set());
  const canvasRef = useRef<HTMLDivElement>(null);

  // Load branches
  useEffect(() => {
    if (!fcId) return;
    (async () => {
      const token = getAuthToken();
      const res = await fetch(`/api/foodcourts/${fcId}/branches`, { headers: { Authorization: `Bearer ${token}` } });
      const list: Branch[] = (await res.json()).data || [];
      setBranches(list);
      if (list.length > 0) setSelectedBranchId(prev => prev ?? list[0].id);
    })().catch(() => {});
  }, [fcId]);

  // Load plans + units. Auto-creates a floor plan if branch has none (1 plan per branch).
  const loadData = useCallback(async () => {
    if (!selectedBranchId) return;
    setLoading(true);
    try {
      const token = getAuthToken();
      const [pRes, uRes] = await Promise.all([
        fetch(`/api/foodcourt-branches/${selectedBranchId}/floor-plans`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`/api/foodcourts/${fcId}/units?branch_id=${selectedBranchId}`, { headers: { Authorization: `Bearer ${token}` } })
      ]);
      let plans: FloorPlan[] = (await pRes.json()).data || [];
      const units: FoodcourtUnit[] = (await uRes.json()).data || [];

      // Auto-create default floor plan if branch has none
      if (plans.length === 0) {
        const createRes = await fetch(`/api/foodcourt-branches/${selectedBranchId}/floor-plans`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ floor_name: 'Main', canvas_width: 1200, canvas_height: 800, grid_size: 20, show_grid: true })
        });
        const created = (await createRes.json()).data;
        if (created) plans = [created];
      }

      setFloorPlans(plans);
      setAllUnits(units);
      if (plans.length > 0) setSelectedPlanId(plans[0].id);
    } finally { setLoading(false); }
  }, [selectedBranchId, fcId]);

  useEffect(() => { loadData(); }, [loadData]);

  const currentPlan = useMemo(() => floorPlans.find(p => p.id === selectedPlanId) || null, [floorPlans, selectedPlanId]);
  const currentBranch = useMemo(() => branches.find(b => b.id === selectedBranchId) || null, [branches, selectedBranchId]);

  // Sync local editable state from currentPlan
  useEffect(() => {
    if (!currentPlan) { setStores([]); return; }
    setCanvasW(currentPlan.canvas_width);
    setCanvasH(currentPlan.canvas_height);
    setGridSize(currentPlan.grid_size);
    setShowGrid(currentPlan.show_grid);
    const edit: EditableStore[] = currentPlan.units
      .filter(u => u.plan_x != null && u.plan_y != null)
      .map(u => {
        const w = u.plan_width ?? 70;
        const h = u.plan_height ?? 70;
        const dbShape: 'rect' | 'circle' = u.plan_shape === 'circle' ? 'circle' : 'rect';
        const shape: FloorTable['shape'] = dbShape === 'circle' ? 'round' : (w === h ? 'square' : 'rectangle');
        return {
          id: `u${u.id}`,
          unitId: u.id,
          tableNumber: u.unit_number,
          label: u.unit_number,
          shape,
          dbShape,
          x: (u.plan_x as number) + w / 2,
          y: (u.plan_y as number) + h / 2,
          width: w, height: h,
          rotation: 0, seats: 0,
          tableType: 'table' as const
        };
      });
    setStores(edit);
    setHasChanges(false);
    setUndoStack([]);
    setUnplaceIds(new Set());
  }, [currentPlan]);

  const placedIds = useMemo(() => new Set(stores.map(s => s.unitId)), [stores]);
  const unplacedUnits = useMemo(() => allUnits.filter(u => !placedIds.has(u.id)), [allUnits, placedIds]);
  const selectedStore = stores.find(s => s.id === selectedId) || null;

  const pushUndo = () => setUndoStack(prev => [...prev.slice(-19), JSON.parse(JSON.stringify(stores))]);

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const prev = undoStack[undoStack.length - 1];
    setUndoStack(s => s.slice(0, -1));
    setStores(prev);
    setSelectedId(null);
    setHasChanges(true);
  };

  // Add store from shape button — picks next unplaced
  const addStore = (cfg: typeof UNIT_SHAPES[number]) => {
    if (unplacedUnits.length === 0) return;
    const u = unplacedUnits[0];
    pushUndo();
    const newStore: EditableStore = {
      id: `u${u.id}`,
      unitId: u.id,
      tableNumber: u.unit_number,
      label: u.unit_number,
      shape: cfg.shape as FloorTable['shape'],
      dbShape: cfg.shape === 'round' ? 'circle' : 'rect',
      x: canvasW / 2,
      y: canvasH / 2,
      width: cfg.w,
      height: cfg.h,
      rotation: 0, seats: 0, tableType: 'table' as const
    };
    setStores(prev => [...prev, newStore]);
    setSelectedId(newStore.id);
    setHasChanges(true);
  };

  // Add specific unplaced chip
  const addUnit = (unit: FoodcourtUnit) => {
    pushUndo();
    const newStore: EditableStore = {
      id: `u${unit.id}`,
      unitId: unit.id,
      tableNumber: unit.unit_number,
      label: unit.unit_number,
      shape: 'rectangle' as FloorTable['shape'],
      dbShape: 'rect',
      x: canvasW / 2, y: canvasH / 2,
      width: 110, height: 70, rotation: 0, seats: 0, tableType: 'table'
    };
    setStores(prev => [...prev, newStore]);
    setSelectedId(newStore.id);
    setHasChanges(true);
  };

  const deleteSelected = () => {
    if (!selectedId || !selectedStore) return;
    pushUndo();
    setStores(prev => prev.filter(s => s.id !== selectedId));
    setUnplaceIds(prev => new Set(prev).add(selectedStore.unitId));
    setSelectedId(null);
    setHasChanges(true);
  };

  const updateStore = (updates: Partial<EditableStore>) => {
    if (!selectedId) return;
    setStores(prev => prev.map(s => s.id === selectedId ? { ...s, ...updates } : s));
    setHasChanges(true);
  };

  // ─── Drag logic (mirrors FloorPlanEditor) ───
  const getCanvasScale = useCallback(() => {
    const canvas = canvasRef.current?.querySelector('[data-scaled-layer]')?.parentElement;
    if (!canvas) return { x: 1, y: 1, rect: new DOMRect() };
    const rect = canvas.getBoundingClientRect();
    return { x: canvasW / rect.width, y: canvasH / rect.height, rect };
  }, [canvasW, canvasH]);

  const getEventPos = (e: MouseEvent | TouchEvent) => {
    if ('touches' in e && e.touches.length > 0) return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
    if ('clientX' in e) return { clientX: e.clientX, clientY: e.clientY };
    return { clientX: 0, clientY: 0 };
  };

  const startDrag = (clientX: number, clientY: number, storeId: string) => {
    const store = stores.find(s => s.id === storeId);
    if (!store) return;
    const { x: sx, y: sy, rect } = getCanvasScale();
    setDragOffset({
      x: (clientX - rect.left) * sx - store.x,
      y: (clientY - rect.top) * sy - store.y
    });
    pushUndo();
    setIsDragging(true);
    setSelectedId(storeId);
  };

  const handleTableMouseDown = (e: React.MouseEvent, id: string) => {
    e.preventDefault(); e.stopPropagation();
    startDrag(e.clientX, e.clientY, id);
  };
  const handleTableTouchStart = (e: React.TouchEvent, id: string) => {
    e.stopPropagation();
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY, id);
  };

  useEffect(() => {
    if (!isDragging || !selectedId) return;
    const handleMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const { clientX, clientY } = getEventPos(e);
      const { x: sx, y: sy, rect } = getCanvasScale();
      let nx = (clientX - rect.left) * sx - dragOffset.x;
      let ny = (clientY - rect.top) * sy - dragOffset.y;
      const store = stores.find(s => s.id === selectedId);
      if (store) {
        // Modifier-based snap mode (predictable, Figma/Sketch convention):
        //   default  → edge snap (left/top corner to grid)
        //   Shift    → center snap
        //   Alt/Opt  → no snap (free)
        const mouseEvt = (e as MouseEvent);
        const touchEvt = (e as TouchEvent);
        const shift = mouseEvt.shiftKey ?? touchEvt.shiftKey ?? false;
        const alt = mouseEvt.altKey ?? touchEvt.altKey ?? false;
        const mode: SnapMode = alt ? 'free' : shift ? 'center' : 'edge';
        nx = snapAxis(nx, store.width / 2, gridSize, mode);
        ny = snapAxis(ny, store.height / 2, gridSize, mode);
      }
      nx = Math.max(0, Math.min(canvasW, nx));
      ny = Math.max(0, Math.min(canvasH, ny));
      setStores(prev => prev.map(s => s.id === selectedId ? { ...s, x: nx, y: ny } : s));
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
  }, [isDragging, selectedId, dragOffset, getCanvasScale, gridSize, canvasW, canvasH]);

  // Keyboard — delete/undo + arrow-key nudge for precise positioning
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      const inInput = tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA';

      if ((e.key === 'Delete' || e.key === 'Backspace') && !inInput) {
        deleteSelected();
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault();
        handleUndo();
        return;
      }
      // Arrow-key nudge (precise positioning)
      if (selectedId && !inInput && (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault();
        const step = e.shiftKey ? gridSize : e.altKey ? 10 : 1;
        const dx = e.key === 'ArrowLeft' ? -step : e.key === 'ArrowRight' ? step : 0;
        const dy = e.key === 'ArrowUp' ? -step : e.key === 'ArrowDown' ? step : 0;
        pushUndo();
        setStores(prev => prev.map(s => {
          if (s.id !== selectedId) return s;
          const nx = Math.max(s.width / 2, Math.min(canvasW - s.width / 2, s.x + dx));
          const ny = Math.max(s.height / 2, Math.min(canvasH - s.height / 2, s.y + dy));
          return { ...s, x: nx, y: ny };
        }));
        setHasChanges(true);
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, undoStack, stores, gridSize, canvasW, canvasH]);

  // Save
  const handleSave = async () => {
    if (!currentPlan) return;
    setSaving(true);
    try {
      const token = getAuthToken();
      // First: save canvas settings if changed
      if (canvasW !== currentPlan.canvas_width || canvasH !== currentPlan.canvas_height ||
          gridSize !== currentPlan.grid_size || showGrid !== currentPlan.show_grid) {
        await fetch(`/api/foodcourt-floor-plans/${currentPlan.id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ canvas_width: canvasW, canvas_height: canvasH, grid_size: gridSize, show_grid: showGrid })
        });
      }
      // Then: batch save layout (convert center coords → top-left for DB)
      const res = await fetch(`/api/foodcourt-floor-plans/${currentPlan.id}/layout`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          units: stores.map(s => ({
            id: s.unitId,
            plan_x: s.x - s.width / 2,
            plan_y: s.y - s.height / 2,
            plan_width: s.width,
            plan_height: s.height,
            plan_shape: s.dbShape
          })),
          unplace_ids: Array.from(unplaceIds)
        })
      });
      if (res.ok) {
        setHasChanges(false);
        setStatusMsg('Saved');
        setTimeout(() => setStatusMsg(''), 2000);
        setUnplaceIds(new Set());
        await loadData();
      }
    } finally { setSaving(false); }
  };

  // Plan CRUD (new/edit/delete floor tab)
  // Convert stores → FloorPlanData for FloorPlanCanvas
  const floorPlanData: FloorPlanData = useMemo(() => ({
    version: 1,
    canvasWidth: canvasW, canvasHeight: canvasH,
    gridSize, showGrid,
    tables: stores as FloorTable[]
  }), [canvasW, canvasH, gridSize, showGrid, stores]);

  if (!fcId) return <PageContainer><Header><HeaderTitle>Floor Plan Editor</HeaderTitle></Header></PageContainer>;

  if (loading) {
    return (
      <PageContainer>
        <Header><HeaderTitle>{t('floorPlan.editorTitle', 'Floor Plan Editor')}</HeaderTitle></Header>
        <Content><div style={{ color: '#4B5563' }}>{t('common.loading', 'Loading...')}</div></Content>
      </PageContainer>
    );
  }

  const goBack = () => {
    if (window.opener) window.close();
    else navigate(`/pos/foodcourt/floor-plan${selectedBranchId ? `?branch=${selectedBranchId}` : ''}`);
  };

  return (
    <PageContainer>
      <Header>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <HeaderTitle>
            {t('floorPlan.editorTitle', 'Floor Plan Editor')}
            {currentBranch && (
              <span style={{ fontSize: 14, fontWeight: 500, color: '#4B5563', marginLeft: 10 }}>
                · {currentBranch.name}{currentBranch.code ? ` (${currentBranch.code})` : ''}
              </span>
            )}
          </HeaderTitle>
          <Btn $variant="secondary" onClick={goBack}>← {t('common.back', 'Back')}</Btn>
        </div>
        <HeaderActions>
          {statusMsg && <StatusMsg $type="success">{statusMsg}</StatusMsg>}
          {hasChanges && <StatusMsg $type="info">{t('floorPlan.unsaved', 'Unsaved changes')}</StatusMsg>}
          <Btn $variant="secondary" onClick={handleUndo} disabled={undoStack.length === 0}>Undo</Btn>
          <Btn $variant="primary" onClick={handleSave} disabled={saving || !hasChanges}>{saving ? 'Saving...' : 'Save'}</Btn>
        </HeaderActions>
      </Header>

      <Content>
        {!currentPlan ? null : (
          <>
            <Sidebar>
              {/* Add Store */}
              <SidebarCard>
                <CardTitle>{t('floorPlan.addStore', 'Add Store')} ({unplacedUnits.length} {t('floorPlan.available', 'available')})</CardTitle>
                <ShapeGrid>
                  {UNIT_SHAPES.map((s, idx) => (
                    <ShapeBtn
                      key={`${s.key}-${idx}`}
                      onClick={() => addStore(s)}
                      disabled={unplacedUnits.length === 0}
                      title={s.label}
                    >
                      <ShapeIcon $shape={s.shape} $variant={s.variant} />
                      {s.label}
                    </ShapeBtn>
                  ))}
                </ShapeGrid>
              </SidebarCard>

              {/* Unplaced Stores */}
              {unplacedUnits.length > 0 && (
                <SidebarCard>
                  <CardTitle>{t('floorPlan.unplacedStores', 'Unplaced Stores ({{count}})', { count: unplacedUnits.length })}</CardTitle>
                  <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 6 }}>
                    {t('floorPlan.clickToAdd', 'Click a store to place it')}
                  </div>
                  {unplacedUnits.map(u => (
                    <UnplacedChip key={u.id} $border={STATUS_COLORS[u.status]?.border || '#6B7280'} onClick={() => addUnit(u)}>
                      {u.unit_number}
                    </UnplacedChip>
                  ))}
                </SidebarCard>
              )}

              {/* Store Properties */}
              {selectedStore && (
                <SidebarCard>
                  <CardTitle>{t('floorPlan.storeProperties', 'Store Properties')}</CardTitle>
                  <FormGroup>
                    <FormLabel>{t('floorPlan.storeNumber', 'Store Number')}</FormLabel>
                    <FormInput value={selectedStore.tableNumber} readOnly style={{ background: '#F1F4F8' }} />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>{t('floorPlan.shape', 'Shape')}</FormLabel>
                    <FormSelect
                      value={selectedStore.shape}
                      onChange={(e) => {
                        const newShape = e.target.value as FloorTable['shape'];
                        const cfg = TABLE_SHAPES.find(s => s.value === newShape) || TABLE_SHAPES[0];
                        updateStore({
                          shape: newShape,
                          dbShape: newShape === 'round' ? 'circle' : 'rect',
                          width: cfg.defaultWidth,
                          height: cfg.defaultHeight
                        });
                      }}
                    >
                      {TABLE_SHAPES.map((s, idx) => (
                        <option key={`${s.value}-${idx}`} value={s.value}>{s.label}</option>
                      ))}
                    </FormSelect>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>{t('floorPlan.size', 'Size')}</FormLabel>
                    <SizeRow>
                      {(() => {
                        const isRect = selectedStore.shape === 'rectangle';
                        const isVertical = selectedStore.width < selectedStore.height;
                        // Sizes aligned to grid (multiples of 20) — edges + center both land on grid.
                        const sizes = isRect
                          ? (isVertical
                            ? [{ label: 'S', w: 60, h: 80 }, { label: 'M', w: 80, h: 120 }, { label: 'L', w: 100, h: 160 }]
                            : [{ label: 'S', w: 80, h: 60 }, { label: 'M', w: 120, h: 80 }, { label: 'L', w: 160, h: 100 }])
                          : [{ label: 'S', w: 60, h: 60 }, { label: 'M', w: 80, h: 80 }, { label: 'L', w: 100, h: 100 }];
                        return sizes.map(s => (
                          <SizeBtn key={s.label}
                            $active={selectedStore.width === s.w && selectedStore.height === s.h}
                            onClick={() => updateStore({ width: s.w, height: s.h })}
                          >{s.label}</SizeBtn>
                        ));
                      })()}
                    </SizeRow>
                  </FormGroup>
                  <FormRow>
                    <FormGroup>
                      <FormLabel>{t('floorPlan.width', 'Width')}</FormLabel>
                      <FormInput type="number" min={30} max={400}
                        value={selectedStore.width}
                        onChange={(e) => {
                          const w = parseInt(e.target.value) || 60;
                          updateStore({
                            width: w,
                            height: selectedStore.shape === 'round' || selectedStore.shape === 'square' ? w : selectedStore.height
                          });
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>{t('floorPlan.height', 'Height')}</FormLabel>
                      <FormInput type="number" min={30} max={400}
                        value={selectedStore.height}
                        onChange={(e) => updateStore({ height: parseInt(e.target.value) || 60 })}
                        disabled={selectedStore.shape !== 'rectangle'}
                      />
                    </FormGroup>
                  </FormRow>
                  {/* X / Y top-left position — precise positioning */}
                  <FormRow>
                    <FormGroup>
                      <FormLabel>{t('floorPlan.posX', 'X (left edge)')}</FormLabel>
                      <FormInput type="number" min={0} max={canvasW}
                        value={Math.round(selectedStore.x - selectedStore.width / 2)}
                        onChange={(e) => {
                          const tlX = parseInt(e.target.value);
                          if (isNaN(tlX)) return;
                          const nx = Math.max(selectedStore.width / 2, Math.min(canvasW - selectedStore.width / 2, tlX + selectedStore.width / 2));
                          updateStore({ x: nx });
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>{t('floorPlan.posY', 'Y (top edge)')}</FormLabel>
                      <FormInput type="number" min={0} max={canvasH}
                        value={Math.round(selectedStore.y - selectedStore.height / 2)}
                        onChange={(e) => {
                          const tlY = parseInt(e.target.value);
                          if (isNaN(tlY)) return;
                          const ny = Math.max(selectedStore.height / 2, Math.min(canvasH - selectedStore.height / 2, tlY + selectedStore.height / 2));
                          updateStore({ y: ny });
                        }}
                      />
                    </FormGroup>
                  </FormRow>
                  <SizeRow style={{ marginTop: 8, marginBottom: 0 }}>
                    <Btn onClick={() => {
                      // Edge snap: align left-edge to grid
                      if (gridSize <= 0) return;
                      pushUndo();
                      const nx = snapAxis(selectedStore.x, selectedStore.width / 2, gridSize, 'edge');
                      const ny = snapAxis(selectedStore.y, selectedStore.height / 2, gridSize, 'edge');
                      updateStore({ x: nx, y: ny });
                    }} style={{ flex: 1, justifyContent: 'center' }}>
                      ⊟ {t('floorPlan.snapEdge', 'Snap edge')}
                    </Btn>
                    <Btn onClick={() => {
                      // Center snap: align center to grid
                      if (gridSize <= 0) return;
                      pushUndo();
                      const nx = snapAxis(selectedStore.x, selectedStore.width / 2, gridSize, 'center');
                      const ny = snapAxis(selectedStore.y, selectedStore.height / 2, gridSize, 'center');
                      updateStore({ x: nx, y: ny });
                    }} style={{ flex: 1, justifyContent: 'center' }}>
                      ⊕ {t('floorPlan.snapCenter', 'Snap center')}
                    </Btn>
                  </SizeRow>
                  <Btn $variant="danger" onClick={deleteSelected} style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                    {t('floorPlan.removeStore', 'Remove Store')}
                  </Btn>
                  {/* Drag + nudge hints */}
                  <div style={{ fontSize: 10, color: '#6B7280', marginTop: 8, lineHeight: 1.5 }}>
                    <div>{t('floorPlan.dragHintSnap', 'Drag: edge snap · Shift = center snap · Alt = free')}</div>
                    <div>{t('floorPlan.nudgeHint', '↑↓←→ 1px · Shift 1 grid · Alt 10px')}</div>
                  </div>
                </SidebarCard>
              )}

              {/* Canvas Settings */}
              <SidebarCard>
                <CardTitle>{t('floorPlan.canvas', 'Canvas')}</CardTitle>
                <CheckboxRow>
                  <input type="checkbox" checked={showGrid} onChange={(e) => { setShowGrid(e.target.checked); setHasChanges(true); }} />
                  {t('floorPlan.showGrid', 'Show Grid')}
                </CheckboxRow>
                <FormGroup style={{ marginTop: 8 }}>
                  <FormLabel>{t('floorPlan.gridSize', 'Grid Size')}</FormLabel>
                  <FormInput type="number" min={10} max={50} step={5}
                    value={gridSize}
                    onChange={(e) => { setGridSize(parseInt(e.target.value) || 20); setHasChanges(true); }}
                  />
                </FormGroup>
                <FormRow>
                  <FormGroup>
                    <FormLabel>{t('floorPlan.canvasWidth', 'Width')}</FormLabel>
                    <FormInput type="number" value={canvasW} onChange={(e) => { setCanvasW(parseInt(e.target.value) || 1200); setHasChanges(true); }} />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>{t('floorPlan.canvasHeight', 'Height')}</FormLabel>
                    <FormInput type="number" value={canvasH} onChange={(e) => { setCanvasH(parseInt(e.target.value) || 800); setHasChanges(true); }} />
                  </FormGroup>
                </FormRow>
              </SidebarCard>
            </Sidebar>

            <CanvasArea ref={canvasRef}>
              <FloorPlanCanvas
                floorPlan={floorPlanData}
                isEditing={true}
                selectedTableId={selectedId}
                onTableMouseDown={handleTableMouseDown}
                onTableTouchStart={handleTableTouchStart}
                onCanvasClick={() => { if (!justFinishedDrag.current) setSelectedId(null); }}
                renderNode={({ table, isSelected, isEditing, onMouseDown, onTouchStart }) => {
                  // In editor mode we only need shape + unit code; no tenant/pill rendered.
                  // Map legacy unit.status to displayStatus palette so border color roughly reflects state.
                  const unitId = (table as any).unitId ?? Number(String(table.id).replace(/^u/, ''));
                  const u = allUnits.find(x => x.id === unitId);
                  const raw = u?.status || 'vacant';
                  const displayStatus = (raw === 'occupied' ? 'active'
                    : raw === 'preparing' ? 'preparing'
                    : raw === 'reserved' ? 'contracting'
                    : 'vacant') as UnitDisplay['displayStatus'];
                  const augmented = {
                    ...table,
                    unitDisplay: { displayStatus, tenantName: null, contractStage: null, contractId: null, logoUrl: null }
                  };
                  return (
                    <FoodcourtUnitNode
                      table={augmented as FloorTable & { unitDisplay: UnitDisplay }}
                      isSelected={isSelected}
                      isEditing={isEditing}
                      onMouseDown={onMouseDown}
                      onTouchStart={onTouchStart}
                    />
                  );
                }}
              />
            </CanvasArea>
          </>
        )}
      </Content>
    </PageContainer>
  );
};

export default FoodcourtFloorPlanEditorPage;
