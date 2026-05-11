import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useStore } from '../../contexts/StoreContext';
import { getAuthToken } from '../../utils/auth';
import PageHeader from '../../components/Common/PageHeader';
import { formatDateTime } from '../../utils/timezone';
import { useTranslation } from 'react-i18next';
import DateField from '../../components/Common/DateField';

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

const STATUS_COLOR: Record<string, { bg: string; fg: string }> = {
  pending:   { bg: '#FFF7E6', fg: '#B97D00' },
  confirmed: { bg: '#E8F5E9', fg: '#2E7D32' },
  arrived:   { bg: '#E3F2FD', fg: '#1565C0' },
  seated:    { bg: '#EDE7F6', fg: '#4527A0' },
  completed: { bg: '#ECEFF1', fg: '#37474F' },
  cancelled: { bg: '#FFEBEE', fg: '#C62828' },
  no_show:   { bg: '#FCE4EC', fg: '#AD1457' }
};

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
                {pendingList.map(r => (
                  <tr key={r.id}>
                    <Td>{formatDateTime(r.reserved_at, tz)}</Td>
                    <Td>
                      <strong>{r.guest_name}</strong>
                      <Hint>{r.guest_phone}</Hint>
                    </Td>
                    <Td>{r.party_size}</Td>
                    <Td>{r.source.replace('_', ' ')}</Td>
                    <Td><Hint>{r.notes || '—'}</Hint></Td>
                    <Td>
                      <ActionBtn variant="primary" onClick={() => changeStatus(r.id, 'confirmed')}>Confirm</ActionBtn>
                      <ActionBtn onClick={() => changeStatus(r.id, 'cancelled')}>Decline</ActionBtn>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Section>
        )}

        <Section>
          <SectionTitle>
            {date === today ? 'Today' : date} <Badge>{list.length}</Badge>
          </SectionTitle>
          {loading ? (
            <Empty>Loading…</Empty>
          ) : list.length === 0 ? (
            <Empty>No reservations on this date.</Empty>
          ) : (
            <Table>
              <thead>
                <tr>
                  <Th>Time</Th><Th>Guest</Th><Th>Party</Th><Th>Status</Th><Th>Table</Th><Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {list.map(r => {
                  const color = STATUS_COLOR[r.status];
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
                        <StatusBadge style={{ background: color.bg, color: color.fg }}>{r.status}</StatusBadge>
                      </Td>
                      <Td>{r.table_number || '—'}</Td>
                      <Td>
                        {next.map(s => (
                          <ActionBtn key={s} onClick={() => changeStatus(r.id, s)} variant={s === 'cancelled' || s === 'no_show' ? undefined : 'primary'}>
                            {s.replace('_', ' ')}
                          </ActionBtn>
                        ))}
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
const SectionTitle = styled.h2`font-size:16px;font-weight:600;color:#0A2540;margin:0 0 16px;display:flex;align-items:center;gap:8px;`;
const Badge = styled.span`background:#F0EEFF;color:#635BFF;padding:2px 10px;border-radius:12px;font-size:12px;font-weight:600;`;
const Table = styled.table`width:100%;border-collapse:collapse;`;
const Th = styled.th`text-align:left;font-size:12px;font-weight:600;color:#6B7C93;text-transform:uppercase;letter-spacing:0.04em;padding:10px 12px;border-bottom:1px solid #E6EBF1;`;
const Td = styled.td`padding:14px 12px;border-bottom:1px solid #F0F4F8;font-size:14px;color:#0A2540;vertical-align:top;`;
const Hint = styled.div`color:#6B7C93;font-size:12px;margin-top:2px;`;
const StatusBadge = styled.span`display:inline-block;padding:3px 10px;border-radius:12px;font-size:12px;font-weight:600;text-transform:capitalize;`;
const ActionBtn = styled.button<{ variant?: 'primary' }>`
  padding:6px 12px;margin-right:6px;border-radius:6px;border:1px solid #E6EBF1;font-size:13px;cursor:pointer;
  background:${p => p.variant === 'primary' ? '#635BFF' : 'white'};
  color:${p => p.variant === 'primary' ? 'white' : '#6B7C93'};
  border-color:${p => p.variant === 'primary' ? '#635BFF' : '#E6EBF1'};
  &:hover{background:${p => p.variant === 'primary' ? '#5A51E6' : '#F6F9FC'};}
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
