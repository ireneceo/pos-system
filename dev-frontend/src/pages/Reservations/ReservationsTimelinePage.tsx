import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useStore } from '../../contexts/StoreContext';
import { getAuthToken } from '../../utils/auth';
import PageHeader from '../../components/Common/PageHeader';
import { formatDateTime } from '../../utils/timezone';
import { useTranslation } from 'react-i18next';
import DateField from '../../components/Common/DateField';
import { ActionButton, ActionButtons, IconButton } from '../../components/UI/TableComponents';

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
  notes: string | null;
  source: 'customer_mobile' | 'staff_phone' | 'walk_in';
}

const ALLOWED: Record<string, string[]> = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['arrived', 'cancelled', 'no_show'],
  arrived: ['seated', 'cancelled'],
  seated: ['completed', 'cancelled'],
  completed: [], cancelled: [], no_show: []
};

// Status badge colors — aligned with ORDER_STATUS_STYLE_GUIDE.md (Tailwind palette)
const STATUS_COLOR: Record<string, { bg: string; fg: string }> = {
  pending:   { bg: '#FEF3C7', fg: '#92400E' },  // amber (same as LiveOrders pending)
  confirmed: { bg: '#D1FAE5', fg: '#065F46' },  // emerald (same as LiveOrders ready)
  arrived:   { bg: '#DBEAFE', fg: '#1E40AF' },  // blue (same as LiveOrders preparing)
  seated:    { bg: '#EDE9FE', fg: '#5B21B6' },  // violet
  completed: { bg: '#E5E7EB', fg: '#374151' },  // gray (same as LiveOrders completed)
  cancelled: { bg: '#FEE2E2', fg: '#991B1B' },  // red (same as LiveOrders cancelled)
  no_show:   { bg: '#F3F4F6', fg: '#6B7280' }   // light gray
};

// Forward-action button colors — LiveOrders 500-level palette (mid-shade, not dark fg)
const FORWARD_BTN_COLOR: Record<string, string> = {
  confirmed: '#10B981',  // emerald-500 — LiveOrders' forward action color
  arrived:   '#635BFF',  // brand purple — main action color
  seated:    '#8B5CF6',  // violet-500 — exists in LiveOrders codebase
  completed: '#9CA3AF'   // LiveOrders' served/neutral gray
};

const ACTION_LABEL: Record<string, string> = {
  confirmed: 'Confirm',
  arrived:   'Arrived',
  seated:    'Seated',
  completed: 'Completed',
  no_show:   'No-show',
  cancelled: 'Cancel'
};

const STATUS_LABEL: Record<string, string> = {
  pending:   'Pending',
  confirmed: 'Confirmed',
  arrived:   'Arrived',
  seated:    'Seated',
  completed: 'Completed',
  cancelled: 'Cancelled',
  no_show:   'No-show'
};

const SOURCE_META: Record<Reservation['source'], { label: string; bg: string; fg: string }> = {
  customer_mobile: { label: 'Customer',  bg: '#F0EEFF', fg: '#635BFF' },
  staff_phone:     { label: 'Staff',     bg: '#ECEFF1', fg: '#37474F' },
  walk_in:         { label: 'Walk-in',   bg: '#FFF3E0', fg: '#E65100' }
};

type SourceFilter = 'all' | 'customer_mobile' | 'staff';
const SOURCE_FILTER_OPTIONS: Array<{ key: SourceFilter; label: string }> = [
  { key: 'all',             label: 'All' },
  { key: 'customer_mobile', label: 'Customer' },
  { key: 'staff',           label: 'Staff' }
];

export default function ReservationsTimelinePage() {
  const { user } = useAuth();
  const { storeInfo } = useStore();
  const { t } = useTranslation();
  const tz = storeInfo?.timeZone || 'Asia/Kuala_Lumpur';
  const restaurantId = user?.restaurantId ? Number(user.restaurantId) : undefined;
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [list, setList] = useState<Reservation[]>([]);
  const [pendingList, setPendingList] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all');

  // Pending 항목은 위쪽 "Pending approval" 섹션에 이미 노출되므로 Today 에서는 제외
  const nonPendingList = list.filter(r => r.status !== 'pending');
  const filteredList = nonPendingList.filter(r => {
    if (sourceFilter === 'all') return true;
    if (sourceFilter === 'customer_mobile') return r.source === 'customer_mobile';
    if (sourceFilter === 'staff') return r.source === 'staff_phone' || r.source === 'walk_in';
    return true;
  });
  const sourceCounts = {
    all: nonPendingList.length,
    customer_mobile: nonPendingList.filter(r => r.source === 'customer_mobile').length,
    staff: nonPendingList.filter(r => r.source === 'staff_phone' || r.source === 'walk_in').length
  };

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

  const changeStatus = async (id: number, status: string) => {
    const token = getAuthToken();
    const res = await fetch(`/api/reservations/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status })
    });
    if (res.ok) reload();
  };

  return (
    <Container>
      <PageHeader
        title="Reservations"
        settingsHref={restaurantId ? `/restaurant/${restaurantId}/settings?tab=reservation` : undefined}
        settingsLabel="Reservation settings"
      >
        <div style={{ minWidth: 180 }}>
          <DateField value={date} onChange={setDate} />
        </div>
        <PrimaryBtn onClick={() => setShowCreate(true)}>+ New Reservation</PrimaryBtn>
      </PageHeader>

      <Content>
        {pendingList.length > 0 && (
          <Section>
            <SectionTitle>
              Pending approval <Badge>{pendingList.length}</Badge>
            </SectionTitle>
            <Table>
              <thead>
                <tr>
                  <Th>Time</Th><Th>Guest</Th><Th>Party</Th><Th>Source</Th><Th>Notes</Th><Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {pendingList.map(r => {
                  const src = SOURCE_META[r.source];
                  return (
                  <tr key={r.id}>
                    <Td>{formatDateTime(r.reserved_at, tz)}</Td>
                    <Td>
                      <strong>{r.guest_name}</strong>
                      <Hint>{r.guest_phone}</Hint>
                    </Td>
                    <Td>{r.party_size}</Td>
                    <Td><SourceBadge style={{ background: src.bg, color: src.fg }}>{src.label}</SourceBadge></Td>
                    <Td><Hint>{r.notes || '—'}</Hint></Td>
                    <Td>
                      <ActionButtons>
                        <ActionButton
                          onClick={() => changeStatus(r.id, 'confirmed')}
                          style={{ background: FORWARD_BTN_COLOR.confirmed, borderColor: FORWARD_BTN_COLOR.confirmed, color: 'white' }}
                        >Confirm</ActionButton>
                        <IconButton onClick={() => changeStatus(r.id, 'cancelled')} title="Decline">×</IconButton>
                      </ActionButtons>
                    </Td>
                  </tr>
                  );
                })}
              </tbody>
            </Table>
          </Section>
        )}

        <Section>
          <SectionHeader>
            <SectionTitle>
              {date === today ? 'Today' : date} <Badge>{filteredList.length}</Badge>
            </SectionTitle>
            <FilterChips>
              {SOURCE_FILTER_OPTIONS.map(opt => (
                <FilterChip
                  key={opt.key}
                  active={sourceFilter === opt.key}
                  onClick={() => setSourceFilter(opt.key)}
                >
                  {opt.label}
                  <ChipCount>{sourceCounts[opt.key]}</ChipCount>
                </FilterChip>
              ))}
            </FilterChips>
          </SectionHeader>
          {loading ? (
            <Empty>Loading…</Empty>
          ) : list.length === 0 ? (
            <Empty>No reservations on this date.</Empty>
          ) : filteredList.length === 0 ? (
            <Empty>No reservations match this filter.</Empty>
          ) : (
            <Table>
              <thead>
                <tr>
                  <Th>Time</Th><Th>Guest</Th><Th>Party</Th><Th>Source</Th><Th>Status</Th><Th>Table</Th><Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map(r => {
                  const color = STATUS_COLOR[r.status];
                  const src = SOURCE_META[r.source];
                  const next = ALLOWED[r.status] || [];
                  return (
                    <tr key={r.id}>
                      <Td>{formatDateTime(r.reserved_at, tz)}</Td>
                      <Td>
                        <strong>{r.guest_name}</strong>
                        <Hint>{r.guest_phone}</Hint>
                      </Td>
                      <Td>{r.party_size}</Td>
                      <Td>
                        <SourceBadge style={{ background: src.bg, color: src.fg }}>{src.label}</SourceBadge>
                      </Td>
                      <Td>
                        <StatusBadge style={{ background: color.bg, color: color.fg }}>{STATUS_LABEL[r.status] || r.status}</StatusBadge>
                      </Td>
                      <Td>{r.table_number || '—'}</Td>
                      <Td>
                        <ActionButtons>
                          {next.filter(s => s !== 'cancelled' && s !== 'no_show').map(s => {
                            const color = FORWARD_BTN_COLOR[s];
                            return (
                              <ActionButton
                                key={s}
                                onClick={() => changeStatus(r.id, s)}
                                style={{ background: color, borderColor: color, color: 'white' }}
                              >
                                {ACTION_LABEL[s] || s}
                              </ActionButton>
                            );
                          })}
                          {next.includes('no_show') && (
                            <ActionButton
                              onClick={() => changeStatus(r.id, 'no_show')}
                              style={{ background: '#F6F9FC', borderColor: '#E6EBF1', color: '#6B7C93' }}
                            >{ACTION_LABEL.no_show}</ActionButton>
                          )}
                          {next.includes('cancelled') && (
                            <IconButton onClick={() => changeStatus(r.id, 'cancelled')} title="Cancel reservation">×</IconButton>
                          )}
                        </ActionButtons>
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Section>
      </Content>

      {showCreate && restaurantId && (
        <CreateModal
          restaurantId={restaurantId}
          defaultDate={date}
          onClose={() => setShowCreate(false)}
          onCreated={() => { setShowCreate(false); reload(); }}
        />
      )}
    </Container>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Create modal — staff direct create
// ────────────────────────────────────────────────────────────────────────────
function CreateModal({ restaurantId, defaultDate, onClose, onCreated }: {
  restaurantId: number; defaultDate: string; onClose: () => void; onCreated: () => void;
}) {
  const [form, setForm] = useState({
    reserved_date: defaultDate,
    reserved_time: '18:00',
    party_size: 2,
    guest_name: '',
    guest_phone: '',
    guest_email: '',
    notes: '',
    table_number: ''
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!form.guest_name || !form.guest_phone) { setError('Name and phone required'); return; }
    setBusy(true); setError(null);
    const reserved_at = new Date(`${form.reserved_date}T${form.reserved_time}:00`).toISOString();
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/reservations/restaurant/${restaurantId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, reserved_at })
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Failed');
      onCreated();
    } catch (e: any) { setError(e.message); } finally { setBusy(false); }
  };

  return (
    <Backdrop onClick={onClose}>
      <Dialog onClick={e => e.stopPropagation()}>
        <h2 style={{ margin: '0 0 16px', fontSize: '18px', color: '#0A2540' }}>New Reservation</h2>
        <FormGrid>
          <Field><Label>Date *</Label><DateField value={form.reserved_date} onChange={v => setForm({ ...form, reserved_date: v })} /></Field>
          <Field><Label>Time *</Label><Input type="time" value={form.reserved_time} onChange={e => setForm({ ...form, reserved_time: e.target.value })} /></Field>
          <Field><Label>Party *</Label><Input type="number" min={1} max={20} value={form.party_size} onChange={e => setForm({ ...form, party_size: parseInt(e.target.value) || 1 })} /></Field>
          <Field><Label>Table</Label><Input value={form.table_number} onChange={e => setForm({ ...form, table_number: e.target.value })} placeholder="optional" /></Field>
          <FieldFull><Label>Guest name *</Label><Input value={form.guest_name} onChange={e => setForm({ ...form, guest_name: e.target.value })} /></FieldFull>
          <Field><Label>Phone *</Label><Input value={form.guest_phone} onChange={e => setForm({ ...form, guest_phone: e.target.value })} /></Field>
          <Field><Label>Email</Label><Input type="email" value={form.guest_email} onChange={e => setForm({ ...form, guest_email: e.target.value })} /></Field>
          <FieldFull><Label>Notes</Label><Textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={2} /></FieldFull>
        </FormGrid>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <DialogActions>
          <ActionBtn onClick={onClose} disabled={busy}>Cancel</ActionBtn>
          <ActionBtn variant="primary" onClick={submit} disabled={busy}>{busy ? 'Saving…' : 'Create'}</ActionBtn>
        </DialogActions>
      </Dialog>
    </Backdrop>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Styles
// ────────────────────────────────────────────────────────────────────────────
const Container = styled.div`background:#FAFBFC;min-height:100vh;`;
const PrimaryBtn = styled.button`padding:8px 16px;background:#635BFF;color:white;border:none;border-radius:6px;font-size:14px;font-weight:500;cursor:pointer;&:hover{background:#5A51E6;}`;
const Content = styled.main`padding:24px 32px;@media(max-width:768px){padding:16px;}`;
const Section = styled.section`background:white;border:1px solid #E6EBF1;border-radius:12px;padding:20px 24px;margin-bottom:24px;`;
const SectionHeader = styled.div`display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:16px;flex-wrap:wrap;`;
const SectionTitle = styled.h2`font-size:16px;font-weight:600;color:#0A2540;margin:0 0 16px;display:flex;align-items:center;gap:8px;${SectionHeader} &{margin:0;}`;
const Badge = styled.span`background:#F0EEFF;color:#635BFF;padding:2px 10px;border-radius:12px;font-size:12px;font-weight:600;`;
const FilterChips = styled.div`display:flex;gap:6px;`;
const FilterChip = styled.button<{ active?: boolean }>`
  display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:18px;font-size:13px;font-weight:500;cursor:pointer;
  background:${p => p.active ? '#635BFF' : 'white'};
  color:${p => p.active ? 'white' : '#6B7C93'};
  border:1px solid ${p => p.active ? '#635BFF' : '#E6EBF1'};
  &:hover{background:${p => p.active ? '#5A51E6' : '#F6F9FC'};}
`;
const ChipCount = styled.span`display:inline-block;padding:1px 7px;border-radius:10px;font-size:11px;font-weight:600;background:rgba(0,0,0,0.08);color:inherit;`;
const SourceBadge = styled.span`display:inline-block;padding:3px 10px;border-radius:12px;font-size:12px;font-weight:600;`;
const Table = styled.table`width:100%;border-collapse:collapse;`;
const Th = styled.th`text-align:left;font-size:12px;font-weight:600;color:#6B7C93;text-transform:uppercase;letter-spacing:0.04em;padding:10px 12px;border-bottom:1px solid #E6EBF1;`;
const Td = styled.td`padding:14px 12px;border-bottom:1px solid #F0F4F8;font-size:14px;color:#0A2540;vertical-align:top;`;
const Hint = styled.div`color:#6B7C93;font-size:12px;margin-top:2px;`;
const StatusBadge = styled.span`display:inline-block;padding:3px 10px;border-radius:12px;font-size:12px;font-weight:600;text-transform:capitalize;`;
const ActionBtn = styled.button<{ variant?: 'primary' }>`
  padding:6px 12px;margin-right:6px;border-radius:6px;border:1px solid #E6EBF1;font-size:13px;font-weight:500;cursor:pointer;
  background:${p => p.variant === 'primary' ? '#635BFF' : 'white'};
  color:${p => p.variant === 'primary' ? 'white' : '#6B7C93'};
  border-color:${p => p.variant === 'primary' ? '#635BFF' : '#E6EBF1'};
  text-transform:capitalize;transition:opacity 0.15s;
  &:hover{opacity:0.85;}
  &:disabled{opacity:0.5;cursor:not-allowed;}
`;
const Empty = styled.div`text-align:center;padding:48px 20px;color:#6B7C93;font-size:14px;`;
const Backdrop = styled.div`position:fixed;inset:0;background:rgba(10,37,64,0.4);display:flex;align-items:center;justify-content:center;z-index:1000;`;
const Dialog = styled.div`background:white;border-radius:12px;padding:24px 28px;width:560px;max-width:90vw;`;
const FormGrid = styled.div`display:grid;grid-template-columns:1fr 1fr;gap:14px 16px;`;
const Field = styled.div`display:flex;flex-direction:column;`;
const FieldFull = styled(Field)`grid-column:1 / -1;`;
const Label = styled.label`font-size:12px;color:#6B7C93;margin-bottom:6px;font-weight:500;`;
const Input = styled.input`padding:8px 12px;border:1px solid #E6EBF1;border-radius:6px;font-size:14px;color:#0A2540;&:focus{outline:none;border-color:#635BFF;box-shadow:0 0 0 3px rgba(99,91,255,0.1);}`;
const Textarea = styled.textarea`padding:8px 12px;border:1px solid #E6EBF1;border-radius:6px;font-size:14px;color:#0A2540;resize:vertical;font-family:inherit;&:focus{outline:none;border-color:#635BFF;box-shadow:0 0 0 3px rgba(99,91,255,0.1);}`;
const ErrorMsg = styled.div`margin-top:12px;padding:8px 12px;background:#FFEBEE;color:#C62828;border-radius:6px;font-size:13px;`;
const DialogActions = styled.div`display:flex;justify-content:flex-end;gap:8px;margin-top:20px;`;
