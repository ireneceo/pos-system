import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTableContainer, DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, DataTableEmpty } from '../../../components/UI/DataTable';
import { Button } from '../../../components/UI/Button';
import { Modal } from '../../../components/UI/Modal';
import ConfirmModal from '../../../components/ConfirmModal';
import { attendanceApi, LeaveRequestRow, LeaveBalance, StaffProfile, formatPeriod, todayIn } from '../attendanceApi';
import { Card, CardTitle, Muted, Row, Spacer, Badge, Dot, ErrorBox, Select, Field, TextArea, PersonGrid, PersonCard, PersonName } from '../attendanceStyles';
import LeaveRequestModal from '../LeaveRequestModal';

interface Props { restaurantId: string; timeZone: string; onChanged: () => void; }

export const statusTone = (s: string) => (s === 'approved' ? 'green' : s === 'pending' ? 'amber' : s === 'rejected' ? 'red' : 'gray');

const LeaveTab: React.FC<Props> = ({ restaurantId, timeZone, onChanged }) => {
  const { t } = useTranslation('attendance');
  const [pending, setPending] = useState<LeaveRequestRow[]>([]);
  const [history, setHistory] = useState<LeaveRequestRow[]>([]);
  const [status, setStatus] = useState('');
  const [balances, setBalances] = useState<Record<number, LeaveBalance[]>>({});
  const [staff, setStaff] = useState<StaffProfile[]>([]);
  const [error, setError] = useState('');
  const [deciding, setDeciding] = useState<{ row: LeaveRequestRow; action: 'approve' | 'reject' } | null>(null);
  const [note, setNote] = useState('');
  const [requesting, setRequesting] = useState(false);
  const [cancelling, setCancelling] = useState<LeaveRequestRow | null>(null);
  const today = todayIn(timeZone);

  const load = useCallback(async () => {
    const [p, h] = await Promise.all([
      attendanceApi<LeaveRequestRow[]>(restaurantId, '/leave/requests?status=pending'),
      attendanceApi<LeaveRequestRow[]>(restaurantId, `/leave/requests${status ? `?status=${status}` : ''}`),
    ]);
    if (!p.ok || !h.ok) { setError(p.message || h.message || t('errors.load', 'Could not load')); return; }
    setError('');
    setPending(p.data || []);
    setHistory((h.data || []).filter(r => status || r.status !== 'pending'));
    // 대기 중 신청자들의 잔여일(그 해) — 승인 판단 근거
    const users = Array.from(new Set((p.data || []).map(r => `${r.user_id}:${r.start_date.slice(0, 4)}`)));
    const out: Record<number, LeaveBalance[]> = {};
    await Promise.all(users.map(async key => {
      const [uid, year] = key.split(':');
      const b = await attendanceApi<{ balances: LeaveBalance[] }>(restaurantId, `/leave/balance?user_id=${uid}&year=${year}`);
      if (b.ok) out[Number(uid)] = b.data.balances;
    }));
    setBalances(out);
  }, [restaurantId, status, t]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    attendanceApi<StaffProfile[]>(restaurantId, '/profiles').then(r => { if (r.ok) setStaff(r.data || []); });
  }, [restaurantId]);

  const decide = async () => {
    if (!deciding) return;
    const r = await attendanceApi(restaurantId, `/leave/requests/${deciding.row.id}/${deciding.action}`, { method: 'POST', body: { note: note || null } });
    if (!r.ok) { setError(r.message || t('errors.save', 'Could not save')); }
    setDeciding(null); setNote('');
    await load(); onChanged();
  };

  const cancel = async (row: LeaveRequestRow) => {
    setCancelling(null);
    const r = await attendanceApi(restaurantId, `/leave/requests/${row.id}/cancel`, { method: 'POST', body: {} });
    if (!r.ok) setError(r.message || t('errors.save', 'Could not save'));
    await load(); onChanged();
  };

  const balanceLine = (row: LeaveRequestRow) => {
    const b = (balances[row.user_id] || []).find(x => x.leave_type_id === row.leave_type_id);
    if (!b) return null;
    if (b.remaining == null) return t('leave.untracked', 'No yearly limit for this type.');
    return t('leave.afterApprove', '{{remaining}} days left → {{after}} after approval', { remaining: b.remaining, after: Math.round((b.remaining - row.days) * 2) / 2 });
  };

  return (
    <>
      {error && <ErrorBox>{error}</ErrorBox>}
      <Card>
        <Row>
          <CardTitle style={{ margin: 0 }}>{t('leave.pendingTitle', 'Waiting for approval')} ({pending.length})</CardTitle>
          <Spacer />
          <Button variant="secondary" onClick={() => setRequesting(true)}>{t('leave.requestForStaff', 'Request for staff')}</Button>
        </Row>
        <div style={{ marginTop: 12 }}>
          {pending.length === 0 ? <Muted>{t('leave.noPending', 'No requests waiting.')}</Muted> : (
            <PersonGrid>
              {pending.map(r => (
                <PersonCard key={r.id}>
                  <PersonName>{r.user_name}</PersonName>
                  <Muted><Dot color={r.leave_type?.color} />{r.leave_type?.name} · {formatPeriod(r)} · {t('leave.daysCount', '{{count}} day(s)', { count: r.days })}</Muted>
                  {r.reason && <Muted style={{ marginTop: 4 }}>“{r.reason}”</Muted>}
                  {balanceLine(r) && <Muted style={{ marginTop: 4, color: '#4F46E5' }}>{balanceLine(r)}</Muted>}
                  <Row gap={8} style={{ marginTop: 10 }}>
                    <Button size="small" variant="primary" onClick={() => setDeciding({ row: r, action: 'approve' })}>{t('leave.approve', 'Approve')}</Button>
                    <Button size="small" variant="danger-outline" onClick={() => setDeciding({ row: r, action: 'reject' })}>{t('leave.reject', 'Reject')}</Button>
                  </Row>
                </PersonCard>
              ))}
            </PersonGrid>
          )}
        </div>
      </Card>

      <Card>
        <Row>
          <CardTitle style={{ margin: 0 }}>{t('leave.historyTitle', 'All requests')}</CardTitle>
          <Spacer />
          <Field style={{ minWidth: 140 }}>
            <Select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="">{t('leave.decided', 'Decided')}</option>
              <option value="approved">{t('status.approved', 'Approved')}</option>
              <option value="rejected">{t('status.rejected', 'Rejected')}</option>
              <option value="cancelled">{t('status.cancelled', 'Cancelled')}</option>
            </Select>
          </Field>
        </Row>
      </Card>
      <DataTableContainer>
        {history.length === 0 ? <DataTableEmpty>{t('leave.noHistory', 'No leave requests yet.')}</DataTableEmpty> : (
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">{t('fields.staff', 'Staff')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('leave.type', 'Leave type')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('leave.period', 'Period')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('records.days', 'Days')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('leave.status', 'Status')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('leave.note', 'Note')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('records.actions', 'Actions')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {history.map(r => (
                <DataTableRow key={r.id}>
                  <DataTableCell>{r.user_name}</DataTableCell>
                  <DataTableCell><Dot color={r.leave_type?.color} />{r.leave_type?.name}</DataTableCell>
                  <DataTableCell>{formatPeriod(r)}</DataTableCell>
                  <DataTableCell align="right">{r.days}</DataTableCell>
                  <DataTableCell align="center"><Badge tone={statusTone(r.status)}>{t(`status.${r.status}`, r.status)}</Badge></DataTableCell>
                  <DataTableCell>{r.decision_note || r.reason || '—'}</DataTableCell>
                  <DataTableCell align="right">
                    {r.status === 'approved' && r.start_date > today && (
                      <Button size="small" variant="danger-outline" onClick={() => setCancelling(r)}>{t('leave.cancel', 'Cancel')}</Button>
                    )}
                  </DataTableCell>
                </DataTableRow>
              ))}
            </tbody>
          </DataTable>
        )}
      </DataTableContainer>

      {deciding && (
        <Modal
          isOpen
          onClose={() => { setDeciding(null); setNote(''); }}
          title={deciding.action === 'approve' ? t('leave.approveTitle', 'Approve leave') : t('leave.rejectTitle', 'Reject leave')}
          size="small"
          footer={
            <>
              <Button variant="cancel" onClick={() => { setDeciding(null); setNote(''); }}>{t('actions.cancel', 'Cancel')}</Button>
              <Button variant={deciding.action === 'approve' ? 'primary' : 'danger'} onClick={decide}>
                {deciding.action === 'approve' ? t('leave.approve', 'Approve') : t('leave.reject', 'Reject')}
              </Button>
            </>
          }
        >
          <Muted style={{ marginBottom: 12 }}>
            <strong>{deciding.row.user_name}</strong> · {deciding.row.leave_type?.name} · {formatPeriod(deciding.row)} · {t('leave.daysCount', '{{count}} day(s)', { count: deciding.row.days })}
          </Muted>
          {balanceLine(deciding.row) && <Muted style={{ marginBottom: 12, color: '#4F46E5' }}>{balanceLine(deciding.row)}</Muted>}
          <Field>
            {t('leave.noteOptional', 'Note to staff (optional)')}
            <TextArea value={note} onChange={e => setNote(e.target.value)} maxLength={500} />
          </Field>
        </Modal>
      )}

      <ConfirmModal
        isOpen={!!cancelling}
        title={t('leave.cancelTitle', 'Cancel leave')}
        message={cancelling ? t('leave.cancelConfirm', 'Cancel the approved leave of {{name}} ({{period}})?', { name: cancelling.user_name, period: formatPeriod(cancelling) }) : ''}
        type="danger"
        confirmText={t('leave.cancel', 'Cancel leave')}
        cancelText={t('actions.keep', 'Keep')}
        onConfirm={() => { if (cancelling) cancel(cancelling); }}
        onCancel={() => setCancelling(null)}
      />

      {requesting && (
        <LeaveRequestModal
          restaurantId={restaurantId}
          staff={staff}
          onClose={() => setRequesting(false)}
          onSaved={() => { setRequesting(false); load(); onChanged(); }}
        />
      )}
    </>
  );
};

export default LeaveTab;
