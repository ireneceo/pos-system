import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { FloorPlanData, FloorTable, DEFAULT_FLOOR_PLAN, TABLE_SHAPES, FIXTURE_PRESETS } from './types';
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
  background: #FAFBFC;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;

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
    background: #F3F4F6;
    color: #374151;
    &:hover { background: #E5E7EB; }
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
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
`;

const CardTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
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
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.15s;
  font-size: 10px;
  color: #6B7C93;
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
  color: #6B7C93;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #E6EBF1;
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
  border: 1px solid #E6EBF1;
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
  border: 1px solid ${p => p.$active ? '#635BFF' : '#E6EBF1'};
  border-radius: 4px;
  background: ${p => p.$active ? 'rgba(99, 91, 255, 0.08)' : 'white'};
  color: ${p => p.$active ? '#635BFF' : '#6B7C93'};
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
  color: #374151;
  cursor: pointer;
  margin-top: 8px;
`;

const StatusMsg = styled.div<{ $type: 'success' | 'info' }>`
  font-size: 12px;
  color: ${p => p.$type === 'success' ? '#059669' : '#6B7C93'};
  font-weight: 500;
`;

// ─── Main Component ───

const FloorPlanEditor: React.FC = () => {
  const { t } = useTranslation('floorplan');
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const canvasRef = useRef<HTMLDivElement>(null);

  const [floorPlan, setFloorPlan] = useState<FloorPlanData>(DEFAULT_FLOOR_PLAN);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const justFinishedDrag = useRef(false);
  const [undoStack, setUndoStack] = useState<FloorPlanData[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string>('');
  const [availableTableNumbers, setAvailableTableNumbers] = useState<string[]>([]);
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
          setFloorPlan(restaurant.floor_plan);
        }

        if (restaurant.table_settings?.enableTableNumbers) {
          const { totalTables, tablePrefix } = restaurant.table_settings;
          const tables: string[] = [];
          for (let i = 1; i <= totalTables; i++) {
            tables.push(`${tablePrefix}${String(i).padStart(3, '0')}`);
          }
          setAvailableTableNumbers(tables);
        }
      } catch (err) {
        console.error('Failed to load floor plan:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [restaurantId]);

  const selectedTable = floorPlan.tables.find(t => t.id === selectedId) || null;

  const usedTableNumbers = floorPlan.tables.map(t => t.tableNumber);
  const unusedTableNumbers = availableTableNumbers.filter(tn => !usedTableNumbers.includes(tn));

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

  // Add table
  const addTable = (shape: FloorTable['shape'], shapeConfig?: { defaultWidth: number; defaultHeight: number }) => {
    const nextNumber = unusedTableNumbers[0];
    if (!nextNumber) return;

    const config = shapeConfig || TABLE_SHAPES.find(s => s.value === shape)!;
    const newTable: FloorTable = {
      id: `ft-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      tableNumber: nextNumber,
      label: nextNumber,
      shape,
      x: floorPlan.canvasWidth / 2,
      y: floorPlan.canvasHeight / 2,
      width: config.defaultWidth,
      height: config.defaultHeight,
      rotation: 0,
      seats: shape === 'square' ? 2 : 4,
      tableType: 'table'
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

  // Delete selected table
  const deleteSelected = () => {
    if (!selectedId) return;
    pushUndo();
    setFloorPlan(prev => ({ ...prev, tables: prev.tables.filter(t => t.id !== selectedId) }));
    setSelectedId(null);
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

  const startDrag = (clientX: number, clientY: number, tableId: string) => {
    const table = floorPlan.tables.find(t => t.id === tableId);
    if (!table) return;
    const { x: sx, y: sy, rect } = getCanvasScale();
    setDragOffset({
      x: (clientX - rect.left) * sx - table.x,
      y: (clientY - rect.top) * sy - table.y
    });
    pushUndo();
    setIsDragging(true);
    setSelectedId(tableId);
  };

  const handleTableMouseDown = (e: React.MouseEvent, tableId: string) => {
    e.preventDefault();
    e.stopPropagation();
    startDrag(e.clientX, e.clientY, tableId);
  };

  const handleTableTouchStart = (e: React.TouchEvent, tableId: string) => {
    e.stopPropagation();
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY, tableId);
  };

  useEffect(() => {
    if (!isDragging || !selectedId) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const { clientX, clientY } = getEventPos(e);
      const { x: sx, y: sy, rect } = getCanvasScale();

      let newX = (clientX - rect.left) * sx - dragOffset.x;
      let newY = (clientY - rect.top) * sy - dragOffset.y;

      const table = floorPlan.tables.find(t => t.id === selectedId);
      if (table) {
        // Modifier-based snap: default edge / Shift center / Alt free
        const mouseEvt = e as MouseEvent;
        const touchEvt = e as TouchEvent;
        const shift = mouseEvt.shiftKey ?? touchEvt.shiftKey ?? false;
        const alt = mouseEvt.altKey ?? touchEvt.altKey ?? false;
        const mode: SnapMode = alt ? 'free' : shift ? 'center' : 'edge';
        newX = snapAxis(newX, table.width / 2, floorPlan.gridSize, mode);
        newY = snapAxis(newY, table.height / 2, floorPlan.gridSize, mode);
      }
      newX = Math.max(0, Math.min(floorPlan.canvasWidth, newX));
      newY = Math.max(0, Math.min(floorPlan.canvasHeight, newY));

      setFloorPlan(prev => ({
        ...prev,
        tables: prev.tables.map(t => t.id === selectedId ? { ...t, x: newX, y: newY } : t)
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

  // useTranslation moved to component level

  return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, selectedId, dragOffset, getCanvasScale, floorPlan.gridSize, floorPlan.canvasWidth, floorPlan.canvasHeight]);

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
        <Content><div style={{ color: '#6B7C93' }}>{t('floorplan:floorPlanEditor.loading')}</div></Content>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <HeaderTitle>{t('floorplan:floorPlanEditor.floorPlanEditor')}</HeaderTitle>
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

      <Content>
        <Sidebar>
          {/* Add Tables & Counter */}
          <SidebarCard>
            <CardTitle>Add Table ({unusedTableNumbers.length} left)</CardTitle>
            <ShapeGrid>
              {TABLE_SHAPES.map((shape, idx) => (
                <ShapeBtn
                  key={`${shape.value}-${idx}`}
                  onClick={() => addTable(shape.value, shape)}
                  disabled={unusedTableNumbers.length === 0}
                  title={`Add ${shape.label} table`}
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

          {/* Properties Panel */}
          {selectedTable && (() => {
            const isFixture = selectedTable.tableType && selectedTable.tableType !== 'table';
            return (
              <SidebarCard>
                <CardTitle>{isFixture ? 'Fixture Properties' : 'Table Properties'}</CardTitle>
                {!isFixture && (
                  <FormGroup>
                    <FormLabel>{t('floorplan:floorPlanEditor.tableNumber')}</FormLabel>
                    <FormSelect
                      value={selectedTable.tableNumber}
                      onChange={(e) => updateTable({ tableNumber: e.target.value, label: e.target.value })}
                    >
                      <option value={selectedTable.tableNumber}>{selectedTable.tableNumber}</option>
                      {unusedTableNumbers.map(tn => (
                        <option key={tn} value={tn}>{tn}</option>
                      ))}
                    </FormSelect>
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
                      <FormSelect
                        value={selectedTable.shape}
                        onChange={(e) => {
                          const shape = e.target.value as FloorTable['shape'];
                          const config = TABLE_SHAPES.find(s => s.value === shape)!;
                          updateTable({ shape, width: config.defaultWidth, height: config.defaultHeight });
                        }}
                      >
                        {TABLE_SHAPES.map((s, idx) => (
                          <option key={`${s.value}-${idx}`} value={s.value}>{s.label}</option>
                        ))}
                      </FormSelect>
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
                <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 8, lineHeight: 1.5 }}>
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

        <CanvasArea ref={canvasRef}>
          <FloorPlanCanvas
            floorPlan={floorPlan}
            isEditing={true}
            selectedTableId={selectedId}
            onTableMouseDown={handleTableMouseDown}
            onTableTouchStart={handleTableTouchStart}
            onCanvasClick={() => { if (!justFinishedDrag.current) setSelectedId(null); }}
          />
        </CanvasArea>
      </Content>
    </PageContainer>
  );
};

export default FloorPlanEditor;
