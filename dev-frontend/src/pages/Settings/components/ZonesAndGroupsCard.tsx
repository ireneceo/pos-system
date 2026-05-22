import React, { useState, useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { FloorPlanData, FloorZone, FloorTableGroup, FloorTable, DEFAULT_FLOOR_PLAN, computeTableLabel } from '../../FloorPlan/types';
import Modal from '../../../components/UI/Modal';
import ConfirmModal from '../../../components/ConfirmModal';

// ============================================================
// Zones & Table Groups manager card — Settings → Operations 탭
// ----------
// 기존 Tables Grid 의 단일 prefix (tablePrefix) 모델을 확장:
//   Restaurant → Zone (여러 개) → Table Group (각 group 별 prefix) → Tables
// 옛 매장은 backend lazy migrate 로 default zone "Main" + default group (prefix=옛 tablePrefix) 자동 생성.
// 이 컴포넌트는 zones + table_groups CRUD 만 담당. tables[] 자동 생성/삭제는 group 액션에 연동.
// ============================================================

interface ZonesAndGroupsCardProps {
  restaurantId: number;
  restaurantName?: string;     // PUT 시 보존
  authToken?: string | null;
  qrCodeBaseUrl?: string;      // Table QR generation
  restaurantSlug?: string;     // Table QR URL
}

const Card = styled.div`
  background: #fff;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
`;
const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 4px 0;
`;
const CardDesc = styled.p`
  font-size: 13px;
  color: #6B7C93;
  margin: 0 0 16px 0;
`;
const ZoneBlock = styled.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  background: #FAFBFC;
`;
const ZoneHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
`;
const ZoneName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ZoneActions = styled.div`
  display: flex;
  gap: 6px;
  flex-shrink: 0;
`;
const IconBtn = styled.button`
  background: transparent;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  color: #6B7C93;
  cursor: pointer;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.15s;

  &:hover { background: #F5F7FA; color: #635BFF; border-color: #DDD9FF; }
  &:focus-visible { outline: 2px solid #635BFF; outline-offset: 1px; }
`;
const DangerBtn = styled(IconBtn)`
  &:hover { background: #FEE2E2; color: #B91C1C; border-color: #FECACA; }
`;
const GroupRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-top: 1px solid #EEF0F3;

  &:first-of-type { border-top: 0; }
`;
const GroupName = styled.div`
  flex: 1;
  min-width: 0;
  font-size: 13px;
  color: #0A2540;
  font-weight: 500;
`;
const GroupMeta = styled.div`
  font-size: 12px;
  color: #6B7C93;
  white-space: nowrap;
`;
const PrefixBadge = styled.span`
  display: inline-block;
  background: #F0EFFF;
  color: #635BFF;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 6px;
  letter-spacing: 0.5px;
  margin-right: 8px;
`;
const AddBtn = styled.button`
  background: transparent;
  border: 1px dashed #DDD9FF;
  color: #635BFF;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 8px;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover { background: #F0EFFF; border-color: #635BFF; }
  &:focus-visible { outline: 2px solid #635BFF; outline-offset: 1px; }
`;
const AddBtnPrimary = styled(AddBtn)`
  background: #635BFF;
  color: #fff;
  border: 1px solid #635BFF;

  &:hover { background: #514DD6; }
`;
const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
`;
const Label = styled.label`
  font-size: 12px;
  font-weight: 500;
  color: #6B7C93;
  text-transform: uppercase;
`;
const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;
const HintText = styled.div`
  font-size: 11px;
  color: #9CA3AF;
  margin-top: 2px;
`;
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
`;
const PrimaryBtn = styled.button`
  background: #635BFF;
  color: #fff;
  border: 0;
  border-radius: 6px;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:disabled { background: #C7D2FE; cursor: not-allowed; }
  &:hover:not(:disabled) { background: #514DD6; }
`;
const SecondaryBtn = styled.button`
  background: #fff;
  color: #6B7C93;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  padding: 10px 18px;
  font-size: 14px;
  cursor: pointer;

  &:hover { background: #F5F7FA; }
`;

// ── Table QR Grid 섹션 styled ────────────────────
const QRSection = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #E6EBF1;
`;
const QRSectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 12px;
`;
const QRSectionTitle = styled.h4`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;
const ZoneFilterRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;
const ZoneFilterChip = styled.button<{ active: boolean }>`
  background: ${p => p.active ? '#635BFF' : '#fff'};
  color: ${p => p.active ? '#fff' : '#6B7C93'};
  border: 1px solid ${p => p.active ? '#635BFF' : '#E6EBF1'};
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;

  &:hover { background: ${p => p.active ? '#514DD6' : '#F5F7FA'}; }
  &:focus-visible { outline: 2px solid #635BFF; outline-offset: 2px; }
`;
const TablesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
`;
const TableQRItem = styled.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  background: #FAFBFC;
`;
const TableQRLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`;
const TableQRContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  background: #fff;
  padding: 6px;
  border-radius: 4px;
`;
const TableQRActions = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
`;
const QRActionBtn = styled.button`
  background: #fff;
  color: #635BFF;
  border: 1px solid #DDD9FF;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &:hover { background: #F0EFFF; }
  &:focus-visible { outline: 2px solid #635BFF; outline-offset: 1px; }
`;
const EmptyMsg = styled.div`
  padding: 32px;
  text-align: center;
  color: #9CA3AF;
  font-size: 13px;
  background: #FAFBFC;
  border-radius: 8px;
`;

// ── Utility ─────────────────────────────────────
const uid = (prefix: string) => `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
const sanitizePrefix = (s: string) => String(s || '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 3);

const ZonesAndGroupsCard: React.FC<ZonesAndGroupsCardProps> = ({ restaurantId, restaurantName, authToken, qrCodeBaseUrl, restaurantSlug }) => {
  const [floorPlan, setFloorPlan] = useState<FloorPlanData>(DEFAULT_FLOOR_PLAN);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoModalMsg, setInfoModalMsg] = useState<string | null>(null);  // alert 대체

  // Fetch floor_plan on mount.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const headers: HeadersInit = authToken ? { 'Authorization': `Bearer ${authToken}` } : {};
        const res = await fetch(`/api/restaurants/${restaurantId}`, { headers });
        if (!res.ok) throw new Error('Failed to load restaurant');
        const json = await res.json();
        const r = json.data || json;
        if (cancelled) return;
        if (r.floor_plan && typeof r.floor_plan === 'object') {
          setFloorPlan(r.floor_plan);
        } else {
          setFloorPlan(DEFAULT_FLOOR_PLAN);
        }
      } catch (e: any) {
        if (!cancelled) setErrorMsg(e?.message || 'Failed to load floor plan');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [restaurantId, authToken]);

  // PUT helper — saves floor_plan to backend. Preserves restaurant name (required by PUT validator).
  const onChange = useCallback(async (next: FloorPlanData) => {
    setSaving(true);
    try {
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (authToken) (headers as any)['Authorization'] = `Bearer ${authToken}`;
      const res = await fetch(`/api/restaurants/${restaurantId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ name: restaurantName, floor_plan: next })
      });
      if (!res.ok) throw new Error('Save failed');
      setFloorPlan(next);
    } catch (e: any) {
      setInfoModalMsg(`Save failed: ${e?.message || 'unknown error'}. Please try again.`);
    } finally {
      setSaving(false);
    }
  }, [restaurantId, restaurantName, authToken]);

  // ── All hooks declared here BEFORE any early return (React rules-of-hooks) ─────────────────
  const [zoneModal, setZoneModal] = useState<{ open: boolean; mode: 'add' | 'rename'; zoneId?: string; name: string }>({
    open: false, mode: 'add', name: ''
  });
  const [deleteZone, setDeleteZone] = useState<FloorZone | null>(null);
  const [groupModal, setGroupModal] = useState<{
    open: boolean; mode: 'add' | 'edit';
    zoneId: string;
    groupId?: string;
    name: string;
    prefix: string;
    tableCount: string;
    seats: string;
  }>({ open: false, mode: 'add', zoneId: '', name: '', prefix: '', tableCount: '4', seats: '4' });
  const [deleteGroup, setDeleteGroup] = useState<{ zone: FloorZone; group: FloorTableGroup } | null>(null);
  const [activeZoneFilter, setActiveZoneFilter] = useState<string>('all');

  // Derived (cheap — every render OK)
  const zones: FloorZone[] = (floorPlan.zones || []).slice().sort((a, b) => a.sort_order - b.sort_order);
  const groupsByZone: Record<string, FloorTableGroup[]> = {};
  (floorPlan.table_groups || []).forEach(g => {
    if (!groupsByZone[g.zone_id]) groupsByZone[g.zone_id] = [];
    groupsByZone[g.zone_id].push(g);
  });
  Object.values(groupsByZone).forEach(arr => arr.sort((a, b) => a.sort_order - b.sort_order));

  // ── Zone CRUD callbacks ─────────────────────────────
  const openAddZone = () => setZoneModal({ open: true, mode: 'add', name: '' });
  const openRenameZone = (z: FloorZone) => setZoneModal({ open: true, mode: 'rename', zoneId: z.id, name: z.name });
  const closeZoneModal = () => setZoneModal({ open: false, mode: 'add', name: '' });

  const saveZone = useCallback(async () => {
    const name = zoneModal.name.trim();
    if (!name) return;
    let next: FloorPlanData;
    if (zoneModal.mode === 'add') {
      const newZone: FloorZone = {
        id: uid('z'),
        name,
        sort_order: zones.length + 1,
        manager_user_ids: []
      };
      next = { ...floorPlan, zones: [...zones, newZone] };
    } else if (zoneModal.mode === 'rename' && zoneModal.zoneId) {
      next = { ...floorPlan, zones: zones.map(z => z.id === zoneModal.zoneId ? { ...z, name } : z) };
    } else {
      return;
    }
    await onChange(next);
    setZoneModal({ open: false, mode: 'add', name: '' });
  }, [zoneModal, zones, floorPlan, onChange]);

  // ── Delete zone confirm ────────────────────────
  const confirmDeleteZone = useCallback(async () => {
    if (!deleteZone) return;
    // Remove zone + all groups under it + tables of those groups.
    const remainingGroups = (floorPlan.table_groups || []).filter(g => g.zone_id !== deleteZone.id);
    const removedGroupIds = new Set((floorPlan.table_groups || []).filter(g => g.zone_id === deleteZone.id).map(g => g.id));
    const remainingTables = floorPlan.tables.filter(t => !t.group_id || !removedGroupIds.has(t.group_id));
    const next: FloorPlanData = {
      ...floorPlan,
      zones: zones.filter(z => z.id !== deleteZone.id),
      table_groups: remainingGroups,
      tables: remainingTables
    };
    await onChange(next);
    setDeleteZone(null);
  }, [deleteZone, floorPlan, zones, onChange]);

  // ── Group modal callbacks (state declared above) ────────────────────────────────
  const openAddGroup = (zoneId: string) => setGroupModal({
    open: true, mode: 'add', zoneId, name: '', prefix: '', tableCount: '4', seats: '4'
  });
  const openEditGroup = (zone: FloorZone, group: FloorTableGroup) => setGroupModal({
    open: true, mode: 'edit', zoneId: zone.id, groupId: group.id,
    name: group.name, prefix: group.prefix, tableCount: '0', seats: '4'
  });
  const closeGroupModal = () => setGroupModal({ open: false, mode: 'add', zoneId: '', name: '', prefix: '', tableCount: '4', seats: '4' });

  const saveGroup = useCallback(async () => {
    const name = groupModal.name.trim();
    const prefix = sanitizePrefix(groupModal.prefix);
    if (!name || !prefix) return;

    // Prevent duplicate prefix within same zone
    const dup = (floorPlan.table_groups || []).some(g =>
      g.zone_id === groupModal.zoneId &&
      g.prefix.toUpperCase() === prefix &&
      g.id !== groupModal.groupId
    );
    if (dup) {
      setInfoModalMsg(`Prefix "${prefix}" is already used in this zone. Choose a different prefix.`);
      return;
    }

    let next: FloorPlanData;
    if (groupModal.mode === 'add') {
      const tableCount = Math.max(0, Math.min(200, parseInt(groupModal.tableCount, 10) || 0));
      const seats = Math.max(1, Math.min(20, parseInt(groupModal.seats, 10) || 4));
      const newGroupId = uid('g');
      const sortOrder = ((floorPlan.table_groups || []).filter(g => g.zone_id === groupModal.zoneId).length) + 1;
      const newGroup: FloorTableGroup = {
        id: newGroupId, zone_id: groupModal.zoneId, name, prefix, sort_order: sortOrder
      };
      // Auto-create tables (un-positioned — Floor Plan editor 에서 배치)
      const startNum = 1;
      const newTables = Array.from({ length: tableCount }, (_, i) => {
        const n = startNum + i;
        return {
          id: uid('t'),
          tableNumber: String(n),
          label: computeTableLabel(prefix, n),
          shape: 'square' as const,
          x: 50 + (i % 8) * 90,
          y: 50 + Math.floor(i / 8) * 90,
          width: 70, height: 70,
          rotation: 0,
          seats,
          group_id: newGroupId
        };
      });
      next = {
        ...floorPlan,
        table_groups: [...(floorPlan.table_groups || []), newGroup],
        tables: [...floorPlan.tables, ...newTables]
      };
    } else {
      // Edit — name + prefix 변경 시 그 group 의 tables 의 label 도 자동 갱신
      next = {
        ...floorPlan,
        table_groups: (floorPlan.table_groups || []).map(g =>
          g.id === groupModal.groupId ? { ...g, name, prefix } : g
        ),
        tables: floorPlan.tables.map(t =>
          t.group_id === groupModal.groupId
            ? { ...t, label: computeTableLabel(prefix, t.tableNumber) }
            : t
        )
      };
    }
    await onChange(next);
    closeGroupModal();
  }, [groupModal, floorPlan, onChange]);

  // ── Delete group (state declared above) ────────────────────────────────
  const confirmDeleteGroup = useCallback(async () => {
    if (!deleteGroup) return;
    const next: FloorPlanData = {
      ...floorPlan,
      table_groups: (floorPlan.table_groups || []).filter(g => g.id !== deleteGroup.group.id),
      tables: floorPlan.tables.filter(t => t.group_id !== deleteGroup.group.id)
    };
    await onChange(next);
    setDeleteGroup(null);
  }, [deleteGroup, floorPlan, onChange]);

  return (
    <Card>
      <CardTitle>Zones &amp; Table Groups</CardTitle>
      <CardDesc>
        Organize tables by zone (e.g., Indoor / Outdoor) and group (each with its own prefix like I, P, O).
        Table numbers will be labeled as <code>prefix-number</code> (e.g., I-1, O-3) and used everywhere — QR codes, KDS, bills.
      </CardDesc>

      {loading && (
        <div style={{ padding: '24px', textAlign: 'center', color: '#9CA3AF', fontSize: '13px' }}>Loading…</div>
      )}
      {errorMsg && !loading && (
        <div style={{ padding: '14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '6px', color: '#B91C1C', fontSize: '13px', marginBottom: '12px' }}>
          {errorMsg}
        </div>
      )}

      {!loading && zones.length === 0 && (
        <div style={{ padding: '24px', textAlign: 'center', background: '#FAFBFC', borderRadius: '8px', color: '#6B7C93', fontSize: '13px', marginBottom: '12px' }}>
          No zones yet. Add your first zone to organize tables.
        </div>
      )}

      {zones.map(zone => {
        const zoneGroups = groupsByZone[zone.id] || [];
        return (
          <ZoneBlock key={zone.id}>
            <ZoneHeader>
              <ZoneName>{zone.name}</ZoneName>
              <ZoneActions>
                <IconBtn type="button" onClick={() => openRenameZone(zone)}>Rename</IconBtn>
                <DangerBtn type="button" onClick={() => setDeleteZone(zone)}>Delete</DangerBtn>
              </ZoneActions>
            </ZoneHeader>

            {zoneGroups.length === 0 && (
              <div style={{ padding: '12px', textAlign: 'center', color: '#9CA3AF', fontSize: '12px' }}>
                No table groups in this zone yet.
              </div>
            )}

            {zoneGroups.map(group => {
              const count = floorPlan.tables.filter(t => t.group_id === group.id).length;
              return (
                <GroupRow key={group.id}>
                  <GroupName>
                    <PrefixBadge>{group.prefix}</PrefixBadge>
                    {group.name}
                  </GroupName>
                  <GroupMeta>{count} table{count !== 1 ? 's' : ''}</GroupMeta>
                  <IconBtn type="button" onClick={() => openEditGroup(zone, group)}>Edit</IconBtn>
                  <DangerBtn type="button" onClick={() => setDeleteGroup({ zone, group })}>Delete</DangerBtn>
                </GroupRow>
              );
            })}

            <AddBtn type="button" onClick={() => openAddGroup(zone.id)}>+ Add table group</AddBtn>
          </ZoneBlock>
        );
      })}

      <AddBtnPrimary type="button" onClick={openAddZone}>+ Add zone</AddBtnPrimary>

      {/* ── Table QR Codes section — zone filter + per-table QR ─────────── */}
      {floorPlan.tables.length > 0 && (
        <QRSection>
          <QRSectionHeader>
            <QRSectionTitle>Table QR Codes</QRSectionTitle>
            <span style={{ fontSize: 12, color: '#9CA3AF' }}>
              {floorPlan.tables.length} table{floorPlan.tables.length !== 1 ? 's' : ''}
            </span>
          </QRSectionHeader>

          {zones.length > 1 && (
            <ZoneFilterRow>
              <ZoneFilterChip
                type="button"
                active={activeZoneFilter === 'all'}
                onClick={() => setActiveZoneFilter('all')}
              >
                All ({floorPlan.tables.length})
              </ZoneFilterChip>
              {zones.map(zone => {
                const groupIds = (floorPlan.table_groups || []).filter(g => g.zone_id === zone.id).map(g => g.id);
                const count = floorPlan.tables.filter(t => t.group_id && groupIds.includes(t.group_id)).length;
                return (
                  <ZoneFilterChip
                    key={zone.id}
                    type="button"
                    active={activeZoneFilter === zone.id}
                    onClick={() => setActiveZoneFilter(zone.id)}
                  >
                    {zone.name} ({count})
                  </ZoneFilterChip>
                );
              })}
            </ZoneFilterRow>
          )}

          <TableQRGridContent
            tables={floorPlan.tables}
            groups={floorPlan.table_groups || []}
            activeZoneFilter={activeZoneFilter}
            qrCodeBaseUrl={qrCodeBaseUrl || ''}
            restaurantSlug={restaurantSlug || ''}
          />
        </QRSection>
      )}

      {/* Zone add/rename modal */}
      <Modal isOpen={zoneModal.open} onClose={closeZoneModal} title={zoneModal.mode === 'add' ? 'Add Zone' : 'Rename Zone'} size="small">
        <FormRow>
          <Label htmlFor="zone-name">Zone name</Label>
          <Input
            id="zone-name"
            type="text"
            value={zoneModal.name}
            onChange={(e) => setZoneModal(s => ({ ...s, name: e.target.value }))}
            placeholder="e.g., Indoor Hall, Outdoor Patio"
            maxLength={50}
            autoFocus
          />
          <HintText>Examples: "Indoor Hall", "Outdoor Patio", "VIP Lounge"</HintText>
        </FormRow>
        <Footer>
          <SecondaryBtn type="button" onClick={closeZoneModal}>Cancel</SecondaryBtn>
          <PrimaryBtn type="button" onClick={saveZone} disabled={!zoneModal.name.trim()}>
            {zoneModal.mode === 'add' ? 'Add' : 'Save'}
          </PrimaryBtn>
        </Footer>
      </Modal>

      {/* Group add/edit modal */}
      <Modal isOpen={groupModal.open} onClose={closeGroupModal} title={groupModal.mode === 'add' ? 'Add Table Group' : 'Edit Table Group'} size="small">
        <FormRow>
          <Label htmlFor="group-name">Group name</Label>
          <Input
            id="group-name"
            type="text"
            value={groupModal.name}
            onChange={(e) => setGroupModal(s => ({ ...s, name: e.target.value }))}
            placeholder="e.g., Main Hall, Private Rooms"
            maxLength={50}
            autoFocus
          />
        </FormRow>
        <FormRow>
          <Label htmlFor="group-prefix">Prefix (1-3 letters)</Label>
          <Input
            id="group-prefix"
            type="text"
            value={groupModal.prefix}
            onChange={(e) => setGroupModal(s => ({ ...s, prefix: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 3) }))}
            placeholder="I, O, P, VIP"
            maxLength={3}
            style={{ textTransform: 'uppercase', maxWidth: '160px' }}
          />
          <HintText>
            Tables will be labeled as <strong>{groupModal.prefix || 'X'}-1, {groupModal.prefix || 'X'}-2, …</strong>
          </HintText>
        </FormRow>
        {groupModal.mode === 'add' && (
          <>
            <FormRow>
              <Label htmlFor="group-count">Number of tables to create</Label>
              <Input
                id="group-count"
                type="number"
                min="0" max="200"
                value={groupModal.tableCount}
                onChange={(e) => setGroupModal(s => ({ ...s, tableCount: e.target.value }))}
                style={{ maxWidth: '160px' }}
              />
              <HintText>Auto-positioned in a grid. Drag to rearrange in the Floor Plan page later.</HintText>
            </FormRow>
            <FormRow>
              <Label htmlFor="group-seats">Default seats per table</Label>
              <Input
                id="group-seats"
                type="number"
                min="1" max="20"
                value={groupModal.seats}
                onChange={(e) => setGroupModal(s => ({ ...s, seats: e.target.value }))}
                style={{ maxWidth: '160px' }}
              />
            </FormRow>
          </>
        )}
        {groupModal.mode === 'edit' && (
          <HintText>Existing table labels will update automatically when the prefix changes.</HintText>
        )}
        <Footer>
          <SecondaryBtn type="button" onClick={closeGroupModal}>Cancel</SecondaryBtn>
          <PrimaryBtn type="button" onClick={saveGroup} disabled={!groupModal.name.trim() || !sanitizePrefix(groupModal.prefix)}>
            {groupModal.mode === 'add' ? 'Create' : 'Save'}
          </PrimaryBtn>
        </Footer>
      </Modal>

      {/* Delete zone confirm */}
      <ConfirmModal
        isOpen={!!deleteZone}
        onCancel={() => setDeleteZone(null)}
        onConfirm={confirmDeleteZone}
        title="Delete zone?"
        message={
          deleteZone
            ? `Delete "${deleteZone.name}" and all its table groups and tables? This cannot be undone.`
            : ''
        }
        confirmText="Delete"
        type="danger"
      />

      {/* Delete group confirm */}
      <ConfirmModal
        isOpen={!!deleteGroup}
        onCancel={() => setDeleteGroup(null)}
        onConfirm={confirmDeleteGroup}
        title="Delete table group?"
        message={
          deleteGroup
            ? `Delete "${deleteGroup.group.name}" (prefix ${deleteGroup.group.prefix}) and all ${floorPlan.tables.filter(t => t.group_id === deleteGroup.group.id).length} tables in it? This cannot be undone.`
            : ''
        }
        confirmText="Delete"
        type="danger"
      />

      {/* Info modal (alert 대체) */}
      <ConfirmModal
        isOpen={!!infoModalMsg}
        onCancel={() => setInfoModalMsg(null)}
        onConfirm={() => setInfoModalMsg(null)}
        title="Notice"
        message={infoModalMsg || ''}
        confirmText="OK"
        singleButton
      />

      {saving && (
        <div style={{ position: 'fixed', top: 12, right: 12, background: '#0A2540', color: '#fff', padding: '8px 14px', borderRadius: 6, fontSize: 13, zIndex: 9999 }}>Saving…</div>
      )}
    </Card>
  );
};

// ── Table QR Grid sub-component ────────────────────────────────
// floor_plan.tables 기반 QR 표시. Zone filter 적용. 각 table 의 label (group prefix + number) 사용.
interface TableQRGridContentProps {
  tables: FloorTable[];
  groups: FloorTableGroup[];
  activeZoneFilter: string;
  qrCodeBaseUrl: string;
  restaurantSlug: string;
}

const TableQRGridContent: React.FC<TableQRGridContentProps> = ({ tables, groups, activeZoneFilter, qrCodeBaseUrl, restaurantSlug }) => {
  // Filter tables by selected zone
  const filteredTables = useMemo(() => {
    if (activeZoneFilter === 'all') return tables;
    const groupIdsInZone = new Set(groups.filter(g => g.zone_id === activeZoneFilter).map(g => g.id));
    return tables.filter(t => t.group_id && groupIdsInZone.has(t.group_id));
  }, [tables, groups, activeZoneFilter]);

  const buildQrUrl = (table: FloorTable) => {
    const base = qrCodeBaseUrl || '';
    const slug = restaurantSlug || '';
    const label = table.label || table.tableNumber;
    return `${base}/mobile/${slug}?table=${encodeURIComponent(label)}&order_type=dine-in`;
  };

  const handleCopy = (url: string) => {
    if (navigator.clipboard) navigator.clipboard.writeText(url).catch(() => {});
  };

  const handleDownloadSVG = (label: string) => {
    const svg = document.getElementById(`table-qr-svg-${label}`);
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `table-${label}.svg`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleDownloadPNG = (label: string) => {
    const canvas = document.getElementById(`table-qr-canvas-${label}`) as HTMLCanvasElement | null;
    if (!canvas) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `table-${label}.png`;
    a.click();
  };

  if (filteredTables.length === 0) {
    return <EmptyMsg>No tables in this zone yet. Add a table group above to auto-create tables.</EmptyMsg>;
  }

  // Sort by label for stable display
  const sorted = filteredTables.slice().sort((a, b) => {
    const la = a.label || a.tableNumber;
    const lb = b.label || b.tableNumber;
    return la.localeCompare(lb, undefined, { numeric: true, sensitivity: 'base' });
  });

  return (
    <TablesGrid>
      {sorted.map(table => {
        const label = table.label || table.tableNumber;
        const url = buildQrUrl(table);
        return (
          <TableQRItem key={table.id}>
            <TableQRLabel>{label}</TableQRLabel>
            <TableQRContainer>
              <QRCodeCanvas id={`table-qr-canvas-${label}`} value={url} size={100} level="H" includeMargin={true} style={{ display: 'none' }} />
              <QRCodeSVG id={`table-qr-svg-${label}`} value={url} size={100} level="H" includeMargin={true} />
            </TableQRContainer>
            <TableQRActions>
              <QRActionBtn type="button" onClick={() => handleCopy(url)} title="Copy URL">Copy</QRActionBtn>
              <QRActionBtn type="button" onClick={() => handleDownloadSVG(label)} title="Download SVG">SVG</QRActionBtn>
              <QRActionBtn type="button" onClick={() => handleDownloadPNG(label)} title="Download PNG">PNG</QRActionBtn>
            </TableQRActions>
          </TableQRItem>
        );
      })}
    </TablesGrid>
  );
};

export default ZonesAndGroupsCard;
