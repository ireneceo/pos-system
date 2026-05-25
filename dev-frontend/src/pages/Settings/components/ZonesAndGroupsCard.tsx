import React, { useState, useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
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
  gap: 12px;
  padding: 10px 8px;
  border-top: 1px solid #EEF0F3;
  border-radius: 6px;
  transition: background 0.15s;

  &:first-of-type { border-top: 0; }
  &:hover { background: #FAFBFC; }
`;
const GroupName = styled.div`
  flex: 1;
  min-width: 0;
  font-size: 13px;
  color: #0A2540;
  font-weight: 500;
  display: flex;
  align-items: center;
`;
const PrefixBadge = styled.span<{ $unset?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${p => p.$unset ? '#F3F4F6' : '#F0EFFF'};
  color: ${p => p.$unset ? '#9CA3AF' : '#635BFF'};
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  min-width: 28px;
  border-radius: 6px;
  letter-spacing: 0.5px;
  margin-right: 10px;
`;
// Pool status — compact metric + progress bar + state-coded color. Three states:
//   empty  (slot_count=0) — gray "Pool not set" with a CTA hint
//   partial (0 < placed < pool) — purple "{placed} / {pool}" with progress bar
//   full   (placed >= pool > 0) — green "✓ all placed"
const PoolStatus = styled.div<{ $variant: 'empty' | 'partial' | 'full' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  font-size: 12px;
  font-weight: 500;
  color: ${p => p.$variant === 'empty' ? '#9CA3AF'
    : p.$variant === 'full' ? '#15803D' : '#635BFF'};
  white-space: nowrap;
`;
const PoolMetric = styled.span`
  font-variant-numeric: tabular-nums;
`;
const PoolBar = styled.div<{ $ratio: number; $variant: 'partial' | 'full' }>`
  position: relative;
  width: 80px;
  height: 4px;
  background: #EEF0F3;
  border-radius: 2px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    width: ${p => Math.max(0, Math.min(100, p.$ratio * 100))}%;
    background: ${p => p.$variant === 'full' ? '#16A34A' : '#635BFF'};
    transition: width 0.2s;
  }
`;
const PoolEmptyHint = styled.button`
  background: transparent;
  border: 0;
  color: #635BFF;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;
// Zone header — total placed / total pool across the zone's groups.
const ZoneMeta = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #6B7C93;
  margin-left: 12px;
  font-variant-numeric: tabular-nums;
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
  const { t } = useTranslation('settings');
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
      setInfoModalMsg(t('zonesGroups.saveFailed', { error: e?.message || 'unknown' }));
    } finally {
      setSaving(false);
    }
  }, [restaurantId, restaurantName, authToken, t]);

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
  }>({ open: false, mode: 'add', zoneId: '', name: '', prefix: '', tableCount: '0', seats: '4' });
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
    open: true, mode: 'add', zoneId, name: '', prefix: '', tableCount: '0', seats: '4'
  });
  const openEditGroup = (zone: FloorZone, group: FloorTableGroup) => {
    // Load existing slot_count for editing. Fallback: count of placed tables (legacy data has no slot_count).
    const placedCount = (floorPlan.tables || []).filter(t => t.group_id === group.id).length;
    const currentSlot = group.slot_count != null ? group.slot_count : placedCount;
    setGroupModal({
      open: true, mode: 'edit', zoneId: zone.id, groupId: group.id,
      name: group.name, prefix: group.prefix,
      tableCount: String(currentSlot), seats: '4'
    });
  };
  const closeGroupModal = () => setGroupModal({ open: false, mode: 'add', zoneId: '', name: '', prefix: '', tableCount: '0', seats: '4' });

  const saveGroup = useCallback(async () => {
    const name = groupModal.name.trim();
    const prefix = sanitizePrefix(groupModal.prefix);  // may be '' — that's OK now
    if (!name) return;

    // Prevent duplicate prefix within the same zone — only when a non-empty prefix is set
    // (multiple groups with no prefix are allowed since they don't collide in labels).
    if (prefix) {
      const dup = (floorPlan.table_groups || []).some(g =>
        g.zone_id === groupModal.zoneId &&
        (g.prefix || '').toUpperCase() === prefix &&
        g.id !== groupModal.groupId
      );
      if (dup) {
        setInfoModalMsg(t('zonesGroups.prefixDuplicate', { prefix }));
        return;
      }
    }

    // v3.39 hotfix #3 redesign — group is a POOL definition. Settings stores `slot_count`; the
    // tables themselves are NOT auto-placed on the floor. Floor Plan Editor consumes the pool
    // (slot_count) and lets the user drop each slot onto the canvas. The old "auto-grid all N
    // tables on the floor at (50,50)" behaviour has been removed because it surprised users.
    let next: FloorPlanData;
    if (groupModal.mode === 'add') {
      const slotCount = Math.max(0, Math.min(200, parseInt(groupModal.tableCount, 10) || 0));
      const newGroupId = uid('g');
      const sortOrder = ((floorPlan.table_groups || []).filter(g => g.zone_id === groupModal.zoneId).length) + 1;
      const newGroup: FloorTableGroup = {
        id: newGroupId, zone_id: groupModal.zoneId, name, prefix, sort_order: sortOrder,
        slot_count: slotCount
      };
      next = {
        ...floorPlan,
        table_groups: [...(floorPlan.table_groups || []), newGroup]
        // tables: untouched — user adds via Floor Plan Editor
      };
    } else {
      // Edit — name + prefix + slot_count 변경. Reducing slot_count below the number of already
      // placed tables is prevented (user must remove tables from the Floor Plan Editor first).
      const placedInGroup = (floorPlan.tables || []).filter(t => t.group_id === groupModal.groupId);
      const placedCount = placedInGroup.length;
      const wantedSlotCount = Math.max(0, Math.min(200, parseInt(groupModal.tableCount, 10) || 0));
      const slotCount = Math.max(wantedSlotCount, placedCount);  // floor cannot lose placed tables
      next = {
        ...floorPlan,
        table_groups: (floorPlan.table_groups || []).map(g =>
          g.id === groupModal.groupId ? { ...g, name, prefix, slot_count: slotCount } : g
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
      <CardTitle>{t('zonesGroups.title')}</CardTitle>
      <CardDesc>{t('zonesGroups.desc')}</CardDesc>

      {loading && (
        <div style={{ padding: '24px', textAlign: 'center', color: '#9CA3AF', fontSize: '13px' }}>{t('zonesGroups.loading')}</div>
      )}
      {errorMsg && !loading && (
        <div style={{ padding: '14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '6px', color: '#B91C1C', fontSize: '13px', marginBottom: '12px' }}>
          {errorMsg}
        </div>
      )}

      {!loading && zones.length === 0 && (
        <div style={{ padding: '24px', textAlign: 'center', background: '#FAFBFC', borderRadius: '8px', color: '#6B7C93', fontSize: '13px', marginBottom: '12px' }}>
          {t('zonesGroups.noZones')}
        </div>
      )}

      {zones.map(zone => {
        const zoneGroups = groupsByZone[zone.id] || [];
        return (
          <ZoneBlock key={zone.id}>
            <ZoneHeader>
              <ZoneName>{zone.name}</ZoneName>
              {(() => {
                // Zone-wide aggregate: total placed / total pool across this zone's groups.
                // Helps the user see "ZONE1 — 5 placed / 44 in pool" at a glance.
                const totalPlaced = floorPlan.tables.filter(t2 =>
                  zoneGroups.some(g => g.id === t2.group_id) && (!t2.tableType || t2.tableType === 'table')
                ).length;
                const totalPool = zoneGroups.reduce((sum, g) => {
                  const placedInG = floorPlan.tables.filter(t2 => t2.group_id === g.id && (!t2.tableType || t2.tableType === 'table')).length;
                  const pool = g.slot_count != null ? g.slot_count : placedInG;
                  return sum + pool;
                }, 0);
                if (zoneGroups.length === 0) return null;
                return (
                  <ZoneMeta>{t('zonesGroups.zonePoolMeta', { placed: totalPlaced, pool: totalPool, defaultValue: '{{placed}} placed / {{pool}} in pool' })}</ZoneMeta>
                );
              })()}
              <ZoneActions>
                <IconBtn type="button" onClick={() => openRenameZone(zone)}>{t('zonesGroups.rename')}</IconBtn>
                <DangerBtn type="button" onClick={() => setDeleteZone(zone)}>{t('zonesGroups.delete')}</DangerBtn>
              </ZoneActions>
            </ZoneHeader>

            {zoneGroups.length === 0 && (
              <div style={{ padding: '12px', textAlign: 'center', color: '#9CA3AF', fontSize: '12px' }}>
                {t('zonesGroups.noGroupsInZone')}
              </div>
            )}

            {zoneGroups.map(group => {
              const placed = floorPlan.tables.filter(t2 => t2.group_id === group.id && (!t2.tableType || t2.tableType === 'table')).length;
              const pool = group.slot_count != null ? group.slot_count : placed;
              const isEmpty = pool === 0;
              const isFull = pool > 0 && placed >= pool;
              const variant: 'empty' | 'partial' | 'full' = isEmpty ? 'empty' : isFull ? 'full' : 'partial';
              const ratio = pool > 0 ? placed / pool : 0;
              return (
                <GroupRow key={group.id}>
                  <GroupName>
                    <PrefixBadge $unset={!group.prefix}>{group.prefix || '—'}</PrefixBadge>
                    {group.name}
                  </GroupName>
                  <PoolStatus $variant={variant}>
                    {isEmpty ? (
                      <PoolEmptyHint
                        type="button"
                        onClick={() => openEditGroup(zone, group)}
                        title={t('zonesGroups.setPoolSizeHint', 'Set pool size →')}
                      >
                        {t('zonesGroups.poolNotSet', 'Set pool size →')}
                      </PoolEmptyHint>
                    ) : (
                      <>
                        <PoolMetric>{t('zonesGroups.poolMetric', { placed, pool, defaultValue: '{{placed}} / {{pool}}' })}</PoolMetric>
                        <PoolBar $ratio={ratio} $variant={isFull ? 'full' : 'partial'} aria-hidden />
                        {isFull && <span aria-label="all placed">✓</span>}
                      </>
                    )}
                  </PoolStatus>
                  <IconBtn type="button" onClick={() => openEditGroup(zone, group)}>{t('zonesGroups.edit')}</IconBtn>
                  <DangerBtn type="button" onClick={() => setDeleteGroup({ zone, group })}>{t('zonesGroups.delete')}</DangerBtn>
                </GroupRow>
              );
            })}

            <AddBtn type="button" onClick={() => openAddGroup(zone.id)}>{t('zonesGroups.addTableGroup')}</AddBtn>
          </ZoneBlock>
        );
      })}

      <AddBtnPrimary type="button" onClick={openAddZone}>{t('zonesGroups.addZone')}</AddBtnPrimary>

      {/* ── Table QR Codes section — zone filter + per-table QR ─────────── */}
      {floorPlan.tables.filter(tt => !tt.tableType || tt.tableType === 'table').length > 0 && (() => {
        const realCount = floorPlan.tables.filter(tt => !tt.tableType || tt.tableType === 'table').length;
        return (
        <QRSection>
          <QRSectionHeader>
            <QRSectionTitle>{t('zonesGroups.tableQrCodes')}</QRSectionTitle>
            <span style={{ fontSize: 12, color: '#9CA3AF' }}>
              {t('zonesGroups.tableCount', { count: realCount })}
            </span>
          </QRSectionHeader>

          {zones.length > 1 && (
            <ZoneFilterRow>
              <ZoneFilterChip
                type="button"
                active={activeZoneFilter === 'all'}
                onClick={() => setActiveZoneFilter('all')}
              >
                {t('zonesGroups.allZones', { count: realCount })}
              </ZoneFilterChip>
              {zones.map(zone => {
                const groupIds = (floorPlan.table_groups || []).filter(g => g.zone_id === zone.id).map(g => g.id);
                const count = floorPlan.tables.filter(tt => tt.group_id && groupIds.includes(tt.group_id) && (!tt.tableType || tt.tableType === 'table')).length;
                return (
                  <ZoneFilterChip
                    key={zone.id}
                    type="button"
                    active={activeZoneFilter === zone.id}
                    onClick={() => setActiveZoneFilter(zone.id)}
                  >
                    {t('zonesGroups.zoneCount', { name: zone.name, count })}
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
            t={t}
          />
        </QRSection>
        );
      })()}

      {/* Zone add/rename modal */}
      <Modal isOpen={zoneModal.open} onClose={closeZoneModal} title={zoneModal.mode === 'add' ? t('zonesGroups.addZoneTitle') : t('zonesGroups.renameZoneTitle')} size="small">
        <FormRow>
          <Label htmlFor="zone-name">{t('zonesGroups.zoneName')}</Label>
          <Input
            id="zone-name"
            type="text"
            value={zoneModal.name}
            onChange={(e) => setZoneModal(s => ({ ...s, name: e.target.value }))}
            placeholder={t('zonesGroups.zoneNamePlaceholder')}
            maxLength={50}
            autoFocus
          />
          <HintText>{t('zonesGroups.zoneNameExamples')}</HintText>
        </FormRow>
        <Footer>
          <SecondaryBtn type="button" onClick={closeZoneModal}>{t('zonesGroups.cancel')}</SecondaryBtn>
          <PrimaryBtn type="button" onClick={saveZone} disabled={!zoneModal.name.trim()}>
            {zoneModal.mode === 'add' ? t('zonesGroups.add') : t('zonesGroups.save')}
          </PrimaryBtn>
        </Footer>
      </Modal>

      {/* Group add/edit modal */}
      <Modal isOpen={groupModal.open} onClose={closeGroupModal} title={groupModal.mode === 'add' ? t('zonesGroups.addGroupTitle') : t('zonesGroups.editGroupTitle')} size="small">
        <FormRow>
          <Label htmlFor="group-name">{t('zonesGroups.groupName')}</Label>
          <Input
            id="group-name"
            type="text"
            value={groupModal.name}
            onChange={(e) => setGroupModal(s => ({ ...s, name: e.target.value }))}
            placeholder={t('zonesGroups.groupNamePlaceholder')}
            maxLength={50}
            autoFocus
          />
        </FormRow>
        <FormRow>
          <Label htmlFor="group-prefix">{t('zonesGroups.prefixLabel')}</Label>
          <Input
            id="group-prefix"
            type="text"
            value={groupModal.prefix}
            onChange={(e) => setGroupModal(s => ({ ...s, prefix: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 3) }))}
            placeholder={t('zonesGroups.prefixPlaceholder')}
            maxLength={3}
            style={{ textTransform: 'uppercase', maxWidth: '160px' }}
          />
          <HintText>
            {groupModal.prefix
              ? <strong>{t('zonesGroups.tablesLabeledAs', { prefix: groupModal.prefix })}</strong>
              : <strong>{t('zonesGroups.tablesLabeledNoPrefix', 'Tables will be labeled by number only (1, 2, 3...). Set a prefix above (e.g. "A") if you want labels like A-1, A-2.')}</strong>}
          </HintText>
        </FormRow>
        {/* Pool size — show for both add and edit. This is the single source of truth for how many
            tables this group has. Floor Plan Editor consumes this pool. Reducing slot_count below
            already-placed tables is silently floored to the placed count (must remove from editor first). */}
        <FormRow>
          <Label htmlFor="group-count">{t('zonesGroups.poolSize', 'Pool size (number of tables)')}</Label>
          <Input
            id="group-count"
            type="number"
            min="0" max="200"
            value={groupModal.tableCount}
            onChange={(e) => setGroupModal(s => ({ ...s, tableCount: e.target.value }))}
            style={{ maxWidth: '160px' }}
          />
          <HintText>{t('zonesGroups.poolSizeHelp', 'Total tables defined for this group. Tables are NOT placed on the floor here — open Floor Plan Editor to drop each one onto the canvas.')}</HintText>
        </FormRow>
        {groupModal.mode === 'edit' && (() => {
          const placedInGroup = (floorPlan.tables || []).filter(t => t.group_id === groupModal.groupId).length;
          const wanted = parseInt(groupModal.tableCount, 10) || 0;
          if (placedInGroup > 0 && wanted < placedInGroup) {
            return (
              <div style={{
                background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 8,
                padding: '10px 12px', fontSize: 12, color: '#92400E', marginTop: 8
              }}>
                {t('zonesGroups.poolMinPlaced', { count: placedInGroup, defaultValue: 'Pool size cannot drop below {{count}} — that many tables are already on the floor plan. Remove them from Floor Plan Editor first.' })}
              </div>
            );
          }
          return null;
        })()}
        {groupModal.mode === 'edit' && (
          <HintText>{t('zonesGroups.labelUpdateDesc')}</HintText>
        )}
        <Footer>
          <SecondaryBtn type="button" onClick={closeGroupModal}>{t('zonesGroups.cancel')}</SecondaryBtn>
          <PrimaryBtn type="button" onClick={saveGroup} disabled={!groupModal.name.trim()}>
            {groupModal.mode === 'add' ? t('zonesGroups.create') : t('zonesGroups.save')}
          </PrimaryBtn>
        </Footer>
      </Modal>

      {/* Delete zone confirm */}
      <ConfirmModal
        isOpen={!!deleteZone}
        onCancel={() => setDeleteZone(null)}
        onConfirm={confirmDeleteZone}
        title={t('zonesGroups.deleteZoneConfirm')}
        message={deleteZone ? t('zonesGroups.deleteZoneMessage', { name: deleteZone.name }) : ''}
        confirmText={t('zonesGroups.delete')}
        type="danger"
      />

      {/* Delete group confirm */}
      <ConfirmModal
        isOpen={!!deleteGroup}
        onCancel={() => setDeleteGroup(null)}
        onConfirm={confirmDeleteGroup}
        title={t('zonesGroups.deleteGroupConfirm')}
        message={deleteGroup ? t('zonesGroups.deleteGroupMessage', {
          name: deleteGroup.group.name,
          prefix: deleteGroup.group.prefix,
          count: floorPlan.tables.filter(t2 => t2.group_id === deleteGroup.group.id).length
        }) : ''}
        confirmText={t('zonesGroups.delete')}
        type="danger"
      />

      {/* Info modal (alert 대체) */}
      <ConfirmModal
        isOpen={!!infoModalMsg}
        onCancel={() => setInfoModalMsg(null)}
        onConfirm={() => setInfoModalMsg(null)}
        title={t('zonesGroups.notice')}
        message={infoModalMsg || ''}
        confirmText={t('zonesGroups.ok')}
        singleButton
      />

      {saving && (
        <div style={{ position: 'fixed', top: 12, right: 12, background: '#0A2540', color: '#fff', padding: '8px 14px', borderRadius: 6, fontSize: 13, zIndex: 9999 }}>{t('zonesGroups.saving')}</div>
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
  t: (key: string, options?: any) => string;
}

const TableQRGridContent: React.FC<TableQRGridContentProps> = ({ tables, groups, activeZoneFilter, qrCodeBaseUrl, restaurantSlug, t }) => {
  // Filter tables by selected zone + EXCLUDE fixtures (counter/entrance/kitchen are not seating).
  const filteredTables = useMemo(() => {
    const realTables = tables.filter(t => !t.tableType || t.tableType === 'table');
    if (activeZoneFilter === 'all') return realTables;
    const groupIdsInZone = new Set(groups.filter(g => g.zone_id === activeZoneFilter).map(g => g.id));
    return realTables.filter(t => t.group_id && groupIdsInZone.has(t.group_id));
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
    return <EmptyMsg>{t('zonesGroups.noTablesInZone')}</EmptyMsg>;
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
              <QRActionBtn type="button" onClick={() => handleCopy(url)} title={t('zonesGroups.copyTitle')}>{t('zonesGroups.copy')}</QRActionBtn>
              <QRActionBtn type="button" onClick={() => handleDownloadSVG(label)} title={t('zonesGroups.downloadSvgTitle')}>{t('zonesGroups.downloadSvg')}</QRActionBtn>
              <QRActionBtn type="button" onClick={() => handleDownloadPNG(label)} title={t('zonesGroups.downloadPngTitle')}>{t('zonesGroups.downloadPng')}</QRActionBtn>
            </TableQRActions>
          </TableQRItem>
        );
      })}
    </TablesGrid>
  );
};

export default ZonesAndGroupsCard;
