import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { FloorPlanData, FloorTable, DEFAULT_FLOOR_PLAN, TABLE_SHAPES } from './types';
import FloorPlanCanvas from './FloorPlanCanvas';

// ─── Styled Components ───

const PageContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #FAFBFC;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
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
  grid-template-columns: 1fr 1fr 1fr;
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

const ShapeIcon = styled.div<{ $shape: string }>`
  width: ${p => p.$shape === 'rectangle' ? '36px' : '24px'};
  height: 24px;
  border: 2px solid currentColor;
  border-radius: ${p => p.$shape === 'round' ? '50%' : '4px'};
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
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const canvasRef = useRef<HTMLDivElement>(null);

  const [floorPlan, setFloorPlan] = useState<FloorPlanData>(DEFAULT_FLOOR_PLAN);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
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
        const token = localStorage.getItem('auth_token');
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
      const token = localStorage.getItem('auth_token');
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
  const addTable = (shape: FloorTable['shape']) => {
    const nextNumber = unusedTableNumbers[0];
    if (!nextNumber) return;

    const shapeConfig = TABLE_SHAPES.find(s => s.value === shape)!;
    const newTable: FloorTable = {
      id: `ft-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      tableNumber: nextNumber,
      label: nextNumber,
      shape,
      x: floorPlan.canvasWidth / 2,
      y: floorPlan.canvasHeight / 2,
      width: shapeConfig.defaultWidth,
      height: shapeConfig.defaultHeight,
      rotation: 0,
      seats: 4
    };

    pushUndo();
    setFloorPlan(prev => ({ ...prev, tables: [...prev.tables, newTable] }));
    setSelectedId(newTable.id);
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

      if (floorPlan.gridSize > 0) {
        newX = Math.round(newX / floorPlan.gridSize) * floorPlan.gridSize;
        newY = Math.round(newY / floorPlan.gridSize) * floorPlan.gridSize;
      }
      newX = Math.max(0, Math.min(floorPlan.canvasWidth, newX));
      newY = Math.max(0, Math.min(floorPlan.canvasHeight, newY));

      setFloorPlan(prev => ({
        ...prev,
        tables: prev.tables.map(t => t.id === selectedId ? { ...t, x: newX, y: newY } : t)
      }));
      setHasChanges(true);
    };

    const handleUp = () => setIsDragging(false);

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
        <Header><HeaderTitle>Floor Plan Editor</HeaderTitle></Header>
        <Content><div style={{ color: '#6B7C93' }}>Loading...</div></Content>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <HeaderTitle>Floor Plan Editor</HeaderTitle>
        <HeaderActions>
          {statusMsg && <StatusMsg $type="success">{statusMsg}</StatusMsg>}
          {hasChanges && <StatusMsg $type="info">Unsaved changes</StatusMsg>}
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
          {/* Add Tables */}
          <SidebarCard>
            <CardTitle>Add Table ({unusedTableNumbers.length} left)</CardTitle>
            <ShapeGrid>
              {TABLE_SHAPES.map(shape => (
                <ShapeBtn
                  key={shape.value}
                  onClick={() => addTable(shape.value)}
                  disabled={unusedTableNumbers.length === 0}
                  title={`Add ${shape.label} table`}
                >
                  <ShapeIcon $shape={shape.value} />
                  {shape.label}
                </ShapeBtn>
              ))}
            </ShapeGrid>
            {selectedId && (
              <Btn $variant="danger" onClick={deleteSelected} style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>
                Delete Table
              </Btn>
            )}
          </SidebarCard>

          {/* Properties Panel */}
          {selectedTable && (
            <SidebarCard>
              <CardTitle>Properties</CardTitle>
              <FormGroup>
                <FormLabel>Table Number</FormLabel>
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
              <FormGroup>
                <FormLabel>Label</FormLabel>
                <FormInput
                  value={selectedTable.label}
                  onChange={(e) => updateTable({ label: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Shape</FormLabel>
                <FormSelect
                  value={selectedTable.shape}
                  onChange={(e) => {
                    const shape = e.target.value as FloorTable['shape'];
                    const config = TABLE_SHAPES.find(s => s.value === shape)!;
                    updateTable({ shape, width: config.defaultWidth, height: config.defaultHeight });
                  }}
                >
                  {TABLE_SHAPES.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </FormSelect>
              </FormGroup>
              <FormGroup>
                <FormLabel>Seats</FormLabel>
                <FormInput
                  type="number"
                  min={1} max={20}
                  value={selectedTable.seats}
                  onChange={(e) => updateTable({ seats: parseInt(e.target.value) || 1 })}
                />
              </FormGroup>
              <FormRow>
                <FormGroup>
                  <FormLabel>Width</FormLabel>
                  <FormInput
                    type="number"
                    min={40} max={200}
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
                  <FormLabel>Height</FormLabel>
                  <FormInput
                    type="number"
                    min={40} max={200}
                    value={selectedTable.height}
                    onChange={(e) => updateTable({ height: parseInt(e.target.value) || 60 })}
                    disabled={selectedTable.shape !== 'rectangle'}
                  />
                </FormGroup>
              </FormRow>
            </SidebarCard>
          )}

          {/* Canvas Settings */}
          <SidebarCard>
            <CardTitle>Canvas</CardTitle>
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
              <FormLabel>Grid Size</FormLabel>
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
            onCanvasClick={() => setSelectedId(null)}
          />
        </CanvasArea>
      </Content>
    </PageContainer>
  );
};

export default FloorPlanEditor;
