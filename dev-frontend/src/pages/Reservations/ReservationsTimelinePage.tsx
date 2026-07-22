import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useStore } from '../../contexts/StoreContext';
import { getAuthToken } from '../../utils/auth';
import PageHeader from '../../components/Common/PageHeader';
import { formatDateTime } from '../../utils/timezone';
import DateField from '../../components/Common/DateField';
import {
  Modal, FormGroup, FormLabel, FormInput, FormSelect, FormTextArea, FormRow, ModalButton
} from '../../components/UI/Modal';
import {
  DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, DataTableEmpty
} from '../../components/UI/DataTable';
import { ActionButton, ActionButtons, IconButton } from '../../components/UI/TableComponents';
import {
  FilterToolbar, StatusTabs, StatusTab, TabBadge
} from '../LiveOrders/styles';

interface Reservation {
  id: number;
  restaurant_id: number;
  customer_id: number | null;
  guest_name: string;
  guest_phone: string;
  guest_email: string | null;
  reserved_at: string;
  party_size: number;
  turn_minutes: number;
  status: 'pending' | 'confirmed' | 'arrived' | 'seated' | 'completed' | 'cancelled' | 'no_show';
  table_number: string | null;
  floor_plan_table_id: string | null;
  notes: string | null;
  source: 'customer_mobile' | 'staff_phone' | 'walk_in';
}

interface FloorTable {
  id: string;
  tableNumber: string;
  label: string;
  seats: number;
  tableType?: string;
}

// Reservation lifecycle 은 'arrived' 가 종착점.
// 손님이 도착한 후 자리/식사는 주문 영역 (POS Terminal / Floor Plan) 책임.
// 레거시 seated/completed enum 값은 DB 호환 목적으로 남기지만 UI 전이 버튼은 노출 안 함.
const ALLOWED: Record<string, string[]> = {
  pending:   ['confirmed', 'cancelled'],
  confirmed: ['arrived', 'cancelled', 'no_show'],
  arrived:   [],
  seated:    [], completed: [], cancelled: [], no_show: []
};

const STATUS_COLOR: Record<string, { bg: string; fg: string }> = {
  pending:   { bg: '#FEF3C7', fg: '#92400E' },
  confirmed: { bg: '#D1FAE5', fg: '#065F46' },
  arrived:   { bg: '#DBEAFE', fg: '#1E40AF' },
  seated:    { bg: '#EDE9FE', fg: '#5B21B6' },
  completed: { bg: '#C7CED6', fg: '#1F2937' },
  cancelled: { bg: '#FEE2E2', fg: '#991B1B' },
  no_show:   { bg: '#F1F4F8', fg: '#4B5563' }
};

const FORWARD_BTN_COLOR: Record<string, string> = {
  confirmed: '#10B981',
  arrived:   '#635BFF',
  seated:    '#8B5CF6',
  completed: '#6B7280'
};

const ACTION_LABEL: Record<string, string> = {
  confirmed: 'Confirm', arrived: 'Arrived', seated: 'Seated',
  completed: 'Completed', no_show: 'No-show', cancelled: 'Cancel'
};

const STATUS_LABEL: Record<string, string> = {
  pending: 'Pending', confirmed: 'Confirmed', arrived: 'Arrived',
  seated: 'Seated', completed: 'Completed', cancelled: 'Cancelled', no_show: 'No-show'
};

const SOURCE_LABEL: Record<Reservation['source'], string> = {
  customer_mobile: 'Customer',
  staff_phone:     'Staff',
  walk_in:         'Staff'
};

// Status tabs — Arrived 가 종착점. Seated/Completed 는 더 이상 reservation lifecycle 에서 사용 안 함.
type StatusTabKey = 'all' | 'pending' | 'confirmed' | 'arrived' | 'cancelled' | 'no_show';
const STATUS_TABS: Array<{ key: StatusTabKey; label: string }> = [
  { key: 'all',       label: 'All' },
  { key: 'pending',   label: 'Pending' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'arrived',   label: 'Arrived' },
  { key: 'cancelled', label: 'Cancelled' },
  { key: 'no_show',   label: 'No-show' }
];

function todayInTz(tz: string): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: tz });
}
function tomorrowInTz(tz: string): string {
  const t = new Date();
  t.setDate(t.getDate() + 1);
  return t.toLocaleDateString('en-CA', { timeZone: tz });
}

export default function ReservationsTimelinePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { storeInfo } = useStore();
  const tz = storeInfo?.timeZone || 'Asia/Kuala_Lumpur';
  const restaurantId = user?.restaurantId ? Number(user.restaurantId) : undefined;
  const today = todayInTz(tz);
  const tomorrow = tomorrowInTz(tz);

  const [date, setDate] = useState(today);
  const [list, setList] = useState<Reservation[]>([]);
  const [pendingList, setPendingList] = useState<Reservation[]>([]);
  const [tables, setTables] = useState<FloorTable[]>([]);
  const [statusTab, setStatusTab] = useState<StatusTabKey>('all');
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const reload = useCallback(async () => {
    if (!restaurantId) return;
    setLoading(true);
    try {
      const token = getAuthToken();
      const headers = { Authorization: `Bearer ${token}` };
      const [r1, r2] = await Promise.all([
        fetch(`/api/reservations/restaurant/${restaurantId}?date=${date}`, { headers }),
        fetch(`/api/reservations/restaurant/${restaurantId}/pending`, { headers })
      ]);
      const j1 = await r1.json();
      const j2 = await r2.json();
      if (j1.success) setList(j1.data || []);
      if (j2.success) setPendingList(j2.data || []);
    } finally { setLoading(false); }
  }, [restaurantId, date]);

  useEffect(() => { reload(); }, [reload]);

  // 화면 간 상태 동기화 — Floor Plan/POS 에서 예약을 체크인(arrived/seated)하면 예약 상태가
  // 바뀌는데, 이 화면은 mount 때만 fetch 했다. 창 포커스 복귀 / 탭 재표시 시 재조회해 최신
  // 상태(예: Seated)를 반영한다. (예약 상태는 소켓 이벤트가 없어 focus/visibility 재조회가 표준.)
  useEffect(() => {
    const onFocus = () => { if (document.visibilityState !== 'hidden') reload(); };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onFocus);
    return () => {
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onFocus);
    };
  }, [reload]);

  // FloorPlan 의 정의된 테이블 로드 (선택지)
  useEffect(() => {
    if (!restaurantId) return;
    const token = getAuthToken();
    fetch(`/api/restaurants/${restaurantId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(j => {
        const fp = j?.data?.floor_plan || j?.floor_plan;
        const arr = (fp?.tables || []).filter((t: any) => !t.tableType || t.tableType === 'table');
        setTables(arr);
      })
      .catch(() => setTables([]));
  }, [restaurantId]);

  // Pending 탭은 날짜 무관 (모든 pending 노출), 그 외는 date 필터된 list 기반
  const baseList = statusTab === 'pending' ? pendingList : list;
  const filteredList = useMemo(() => {
    if (statusTab === 'all') return baseList;
    if (statusTab === 'pending') return pendingList;
    return baseList.filter(r => r.status === statusTab);
  }, [baseList, statusTab, pendingList]);

  // Status 별 카운트 (pending 은 항상 전체 pending, 그 외는 date 의 list 기준)
  const statusCounts = useMemo(() => {
    const counts: Record<StatusTabKey, number> = {
      all: list.length,
      pending: pendingList.length,
      confirmed: list.filter(r => r.status === 'confirmed').length,
      arrived:   list.filter(r => r.status === 'arrived').length,
      cancelled: list.filter(r => r.status === 'cancelled').length,
      no_show:   list.filter(r => r.status === 'no_show').length
    };
    return counts;
  }, [list, pendingList]);

  const changeStatus = async (r: Reservation, status: string) => {
    const token = getAuthToken();
    const res = await fetch(`/api/reservations/${r.id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status })
    });
    if (!res.ok) return;
    // 체크인 (P2-6) — arrived 시 배정 테이블이 있으면 플로어플랜으로 이동해 POS 자동 진입
    // (인원 prefill). 테이블 미배정이면 목록만 갱신.
    if (status === 'arrived' && r.floor_plan_table_id && restaurantId) {
      const params = new URLSearchParams({
        seatReservation: String(r.id),
        tableId: r.floor_plan_table_id,
        guests: String(r.party_size || 0)
      });
      if (r.table_number) params.set('table', r.table_number);
      navigate(`/restaurant/${restaurantId}/floor-plan?${params.toString()}`);
      return;
    }
    reload();
  };

  const deleteReservation = async (id: number) => {
    const token = getAuthToken();
    const res = await fetch(`/api/reservations/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) { setConfirmDelete(null); reload(); }
  };

  // FPTI 우선 배정 — 드롭다운 value=floor_plan_table_id. 빈 값=배정 해제.
  const assignTable = async (id: number, fpti: string | null) => {
    const token = getAuthToken();
    const t = fpti ? tables.find(tb => tb.id === fpti) : null;
    const res = await fetch(`/api/reservations/${id}/table`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        floor_plan_table_id: fpti,
        table_number: t ? (t.tableNumber || t.label || null) : null
      })
    });
    if (res.ok) reload();
  };

  const handleXClick = (r: Reservation) => {
    if (r.status !== 'cancelled') changeStatus(r, 'cancelled');
    else setConfirmDelete(r.id);
  };

  return (
    <Container>
      <PageHeader
        title="Reservations"
        settingsHref={restaurantId ? `/restaurant/${restaurantId}/settings?tab=reservation` : undefined}
        settingsLabel="Reservation settings"
      >
        <NewBtn onClick={() => setShowCreate(true)}>New Reservation</NewBtn>
      </PageHeader>

      <Content>
        <FilterToolbar>
          <DateButton active={date === today} onClick={() => setDate(today)}>Today</DateButton>
          <DateButton active={date === tomorrow} onClick={() => setDate(tomorrow)}>Tomorrow</DateButton>
          <div style={{ minWidth: 180 }}>
            <DateField value={date} onChange={setDate} />
          </div>
        </FilterToolbar>

        <StatusTabs>
          {STATUS_TABS.map(tab => (
            <StatusTab key={tab.key} active={statusTab === tab.key} onClick={() => setStatusTab(tab.key)}>
              {tab.label}
              <TabBadge>{statusCounts[tab.key]}</TabBadge>
            </StatusTab>
          ))}
        </StatusTabs>

        <DataTable>
          <DataTableHead>
            <tr>
              <DataTableHeaderCell>Time</DataTableHeaderCell>
              <DataTableHeaderCell>Guest</DataTableHeaderCell>
              <DataTableHeaderCell>Party</DataTableHeaderCell>
              <DataTableHeaderCell>Source</DataTableHeaderCell>
              <DataTableHeaderCell>Status</DataTableHeaderCell>
              <DataTableHeaderCell>Table</DataTableHeaderCell>
              <DataTableHeaderCell>Notes</DataTableHeaderCell>
              <DataTableHeaderCell>Actions</DataTableHeaderCell>
            </tr>
          </DataTableHead>
          <tbody>
            {loading && filteredList.length === 0 ? (
              <tr><td colSpan={8}><DataTableEmpty>Loading…</DataTableEmpty></td></tr>
            ) : filteredList.length === 0 ? (
              <tr><td colSpan={8}><DataTableEmpty>No reservations</DataTableEmpty></td></tr>
            ) : filteredList.map(r => {
              const color = STATUS_COLOR[r.status];
              const next = ALLOWED[r.status] || [];
              return (
                <DataTableRow key={r.id}>
                  <DataTableCell>{formatDateTime(r.reserved_at, tz)}</DataTableCell>
                  <DataTableCell>
                    <strong>{r.guest_name}</strong>
                    <Hint>{r.guest_phone}</Hint>
                  </DataTableCell>
                  <DataTableCell>{r.party_size}</DataTableCell>
                  <DataTableCell>{SOURCE_LABEL[r.source]}</DataTableCell>
                  <DataTableCell>
                    <StatusPill style={{ background: color.bg, color: color.fg }}>
                      {STATUS_LABEL[r.status] || r.status}
                    </StatusPill>
                  </DataTableCell>
                  <DataTableCell>
                    {tables.length === 0 ? (
                      <span>{r.table_number || '—'}</span>
                    ) : (
                      <TableSelect
                        value={r.floor_plan_table_id || ''}
                        onChange={e => assignTable(r.id, e.target.value || null)}
                        title="Assign table"
                      >
                        <option value="">—</option>
                        {tables.map(t => (
                          <option key={t.id} value={t.id}>
                            {t.label || `Table ${t.tableNumber}`}{t.seats ? ` (${t.seats})` : ''}
                          </option>
                        ))}
                      </TableSelect>
                    )}
                  </DataTableCell>
                  <DataTableCell><Hint>{r.notes || '—'}</Hint></DataTableCell>
                  <DataTableCell>
                    <ActionButtons>
                      {next.filter(s => s !== 'cancelled' && s !== 'no_show').map(s => {
                        const c = FORWARD_BTN_COLOR[s];
                        return (
                          <ActionButton
                            key={s}
                            onClick={() => changeStatus(r, s)}
                            style={{ background: c, borderColor: c, color: 'white' }}
                          >{ACTION_LABEL[s] || s}</ActionButton>
                        );
                      })}
                      {next.includes('no_show') && (
                        <ActionButton
                          onClick={() => changeStatus(r, 'no_show')}
                          style={{ background: '#F4F6F9', borderColor: '#C7CED6', color: '#4B5563' }}
                        >{ACTION_LABEL.no_show}</ActionButton>
                      )}
                      {(next.includes('cancelled') || r.status === 'cancelled') && (
                        <IconButton
                          onClick={() => handleXClick(r)}
                          title={r.status === 'cancelled' ? 'Delete permanently' : 'Cancel reservation'}
                        >×</IconButton>
                      )}
                    </ActionButtons>
                  </DataTableCell>
                </DataTableRow>
              );
            })}
          </tbody>
        </DataTable>
      </Content>

      {showCreate && restaurantId && (
        <CreateModal
          restaurantId={restaurantId}
          defaultDate={date}
          tables={tables}
          onClose={() => setShowCreate(false)}
          onCreated={() => { setShowCreate(false); reload(); }}
        />
      )}

      <Modal
        isOpen={confirmDelete !== null}
        onClose={() => setConfirmDelete(null)}
        title="Delete reservation?"
        size="small"
        footer={
          <>
            <ModalButton onClick={() => setConfirmDelete(null)}>Keep</ModalButton>
            <ModalButton variant="danger" onClick={() => confirmDelete && deleteReservation(confirmDelete)}>Delete</ModalButton>
          </>
        }
      >
        <p style={{ margin: 0, color: '#4B5563', fontSize: 14, lineHeight: 1.5 }}>
          This cancelled reservation will be permanently removed and cannot be recovered.
        </p>
      </Modal>
    </Container>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Create modal — staff direct create
// ────────────────────────────────────────────────────────────────────────────
function CreateModal({ restaurantId, defaultDate, tables, onClose, onCreated }: {
  restaurantId: number;
  defaultDate: string;
  tables: FloorTable[];
  onClose: () => void;
  onCreated: () => void;
}) {
  const [form, setForm] = useState({
    reserved_date: defaultDate,
    reserved_time: '18:00',
    party_size: 2,
    guest_name: '',
    guest_phone: '',
    guest_email: '',
    notes: '',
    table_number: '',
    floor_plan_table_id: ''
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!form.guest_name || !form.guest_phone) { setError('Name and phone required'); return; }
    setBusy(true); setError(null);
    const reserved_at = new Date(`${form.reserved_date}T${form.reserved_time}:00`).toISOString();
    const selectedTable = form.floor_plan_table_id ? tables.find(t => t.id === form.floor_plan_table_id) : null;
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/reservations/restaurant/${restaurantId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...form, reserved_at,
          table_number: selectedTable ? (selectedTable.tableNumber || selectedTable.label) : (form.table_number || null)
        })
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Failed');
      onCreated();
    } catch (e: any) { setError(e.message); } finally { setBusy(false); }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="New Reservation"
      footer={
        <>
          <ModalButton onClick={onClose} disabled={busy}>Cancel</ModalButton>
          <ModalButton variant="primary" onClick={submit} disabled={busy}>
            {busy ? 'Saving…' : 'Create'}
          </ModalButton>
        </>
      }
    >
      <FormRow>
        <FormGroup>
          <FormLabel>Date *</FormLabel>
          <DateField value={form.reserved_date} onChange={v => setForm({ ...form, reserved_date: v })} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Time *</FormLabel>
          <FormInput type="time" value={form.reserved_time} onChange={e => setForm({ ...form, reserved_time: e.target.value })} />
        </FormGroup>
      </FormRow>
      <FormRow>
        <FormGroup>
          <FormLabel>Party *</FormLabel>
          <FormInput type="number" min={1} max={30}
            value={form.party_size}
            onChange={e => setForm({ ...form, party_size: parseInt(e.target.value) || 1 })} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Table</FormLabel>
          {tables.length === 0 ? (
            <FormInput value={form.table_number} onChange={e => setForm({ ...form, table_number: e.target.value })} placeholder="optional" />
          ) : (
            <FormSelect value={form.floor_plan_table_id} onChange={e => setForm({ ...form, floor_plan_table_id: e.target.value })}>
              <option value="">— No table —</option>
              {tables.map(t => (
                <option key={t.id} value={t.id}>
                  {t.label || `Table ${t.tableNumber}`} ({t.seats} seats)
                </option>
              ))}
            </FormSelect>
          )}
        </FormGroup>
      </FormRow>
      <FormGroup>
        <FormLabel>Guest name *</FormLabel>
        <FormInput value={form.guest_name} onChange={e => setForm({ ...form, guest_name: e.target.value })} />
      </FormGroup>
      <FormRow>
        <FormGroup>
          <FormLabel>Phone *</FormLabel>
          <FormInput value={form.guest_phone} onChange={e => setForm({ ...form, guest_phone: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Email</FormLabel>
          <FormInput type="email" value={form.guest_email} onChange={e => setForm({ ...form, guest_email: e.target.value })} />
        </FormGroup>
      </FormRow>
      <FormGroup>
        <FormLabel>Notes</FormLabel>
        <FormTextArea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={2} />
      </FormGroup>
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </Modal>
  );
}

const Container = styled.div`background:#F9FAFB;min-height:100vh;`;
const Content = styled.main`padding:24px 32px;@media(max-width:768px){padding:16px;}`;
const NewBtn = styled.button`
  padding:8px 16px;background:#635BFF;color:white;border:none;border-radius:6px;
  font-size:14px;font-weight:500;cursor:pointer;
  &:hover{background:#5A51E6;}
`;
// LiveOrders 의 DatePeriodFilter DateButton 과 동일한 스타일
const DateButton = styled.button<{ active?: boolean }>`
  padding:8px 16px;
  background:${p => p.active ? '#635BFF' : '#FFFFFF'};
  color:${p => p.active ? '#FFFFFF' : '#4B5563'};
  border:1px solid ${p => p.active ? '#635BFF' : '#C7CED6'};
  border-radius:6px;font-size:14px;font-weight:500;cursor:pointer;transition:all 0.2s;
  &:hover{background:${p => p.active ? '#5A51E6' : '#F1F4F8'};border-color:${p => p.active ? '#5A51E6' : '#64748B'};}
  @media(max-width:768px){padding:6px 12px;font-size:13px;}
`;
const Hint = styled.div`color:#4B5563;font-size:12px;margin-top:2px;`;
const StatusPill = styled.span`display:inline-block;padding:3px 10px;border-radius:12px;font-size:12px;font-weight:600;`;
const ErrorMsg = styled.div`margin-top:12px;padding:8px 12px;background:#FFEBEE;color:#C62828;border-radius:6px;font-size:13px;`;
// Inline 테이블 배정 — 빈 셀 호버 시 회색, 값 있으면 보라 강조
const TableSelect = styled.select`
  padding:4px 8px;border:1px solid #C7CED6;border-radius:4px;
  font-size:13px;background:white;color:#0A2540;cursor:pointer;min-width:90px;
  &:hover{border-color:#635BFF;}
  &:focus{outline:none;border-color:#635BFF;box-shadow:0 0 0 2px rgba(99,91,255,0.1);}
`;
