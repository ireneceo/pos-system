/**
 * 휴가 신청 창 — 직원 본인(내 출퇴근) · 관리자 대리 신청(Leave 탭) 공용.
 * 일수는 서버가 매장 휴일·쉬는 요일을 빼고 계산한다(utils/leaveDays) — 여기서는 보여 주기만.
 */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../components/UI/Modal';
import { Button } from '../../components/UI/Button';
import DateField from '../../components/Common/DateField';
import { attendanceApi, LeaveTypeRow, LeaveBalance, StaffProfile } from './attendanceApi';
import { Field, TextArea, Select, ErrorBox, Muted, Row, Toggle } from './attendanceStyles';

interface Props {
  restaurantId: string;
  staff?: StaffProfile[];   // 있으면 관리자 대리 신청(직원 고르기)
  onClose: () => void;
  onSaved: () => void;
}

const LeaveRequestModal: React.FC<Props> = ({ restaurantId, staff, onClose, onSaved }) => {
  const { t } = useTranslation('attendance');
  const [types, setTypes] = useState<LeaveTypeRow[]>([]);
  const [balances, setBalances] = useState<LeaveBalance[]>([]);
  const [userId, setUserId] = useState('');
  const [typeId, setTypeId] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [halfDay, setHalfDay] = useState<'' | 'am' | 'pm'>('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    attendanceApi<LeaveTypeRow[]>(restaurantId, '/leave/types').then(r => { if (r.ok) setTypes((r.data || []).filter(x => x.is_active)); });
  }, [restaurantId]);

  useEffect(() => {
    if (staff && !userId) { setBalances([]); return; }
    const year = (start || new Date().toISOString()).slice(0, 4);
    const q = staff ? `?user_id=${userId}&year=${year}` : `?year=${year}`;
    attendanceApi<{ balances: LeaveBalance[] }>(restaurantId, `/leave/balance${q}`).then(r => setBalances(r.ok ? r.data.balances : []));
  }, [restaurantId, staff, userId, start]);

  const single = !!start && (!end || end === start);
  const bal = balances.find(b => String(b.leave_type_id) === typeId);

  const submit = async () => {
    setError('');
    if (staff && !userId) { setError(t('correct.staffRequired', 'Choose a staff member.')); return; }
    if (!typeId) { setError(t('leave.typeRequired', 'Choose a leave type.')); return; }
    if (!start) { setError(t('leave.dateRequired', 'Choose the dates.')); return; }
    const body: Record<string, unknown> = {
      leave_type_id: Number(typeId), start_date: start, end_date: end || start,
      half_day: single && halfDay ? halfDay : null, reason: reason || null,
    };
    if (staff) body.user_id = Number(userId);
    const r = await attendanceApi(restaurantId, '/leave/requests', { method: 'POST', body });
    if (!r.ok) { setError(r.message || t('errors.save', 'Could not save')); return; }
    onSaved();
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={t('leave.requestTitle', 'Request leave')}
      size="small"
      footer={
        <>
          <Button variant="cancel" onClick={onClose}>{t('actions.cancel', 'Cancel')}</Button>
          <Button variant="primary" onClick={submit}>{t('leave.submit', 'Send request')}</Button>
        </>
      }
    >
      {error && <ErrorBox>{error}</ErrorBox>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {staff && (
          <Field>
            {t('fields.staff', 'Staff')}
            <Select value={userId} onChange={e => setUserId(e.target.value)}>
              <option value="">{t('fields.choose', 'Choose…')}</option>
              {staff.map(s => <option key={s.user_id} value={s.user_id}>{s.name}</option>)}
            </Select>
          </Field>
        )}
        <Field>
          {t('leave.type', 'Leave type')}
          <Select value={typeId} onChange={e => setTypeId(e.target.value)}>
            <option value="">{t('fields.choose', 'Choose…')}</option>
            {types.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}
          </Select>
        </Field>
        {bal && (
          <Muted>
            {bal.remaining == null
              ? t('leave.untracked', 'No yearly limit for this type.')
              : t('leave.remainingLine', '{{remaining}} of {{entitled}} days left this year ({{pending}} waiting)', { remaining: bal.remaining, entitled: bal.entitled, pending: bal.pending })}
          </Muted>
        )}
        <Row>
          <Field style={{ flex: 1 }}>
            {t('leave.from', 'From')}
            <DateField value={start} onChange={v => { setStart(v); if (!end || end < v) setEnd(v); }} />
          </Field>
          <Field style={{ flex: 1 }}>
            {t('leave.to', 'To')}
            <DateField value={end} min={start || undefined} onChange={v => setEnd(v)} />
          </Field>
        </Row>
        {single && (
          <Row gap={16}>
            <Toggle><input type="radio" checked={halfDay === ''} onChange={() => setHalfDay('')} />{t('leave.fullDay', 'Full day')}</Toggle>
            <Toggle><input type="radio" checked={halfDay === 'am'} onChange={() => setHalfDay('am')} />{t('leave.halfAm', 'Half day (AM)')}</Toggle>
            <Toggle><input type="radio" checked={halfDay === 'pm'} onChange={() => setHalfDay('pm')} />{t('leave.halfPm', 'Half day (PM)')}</Toggle>
          </Row>
        )}
        <Field>
          {t('fields.reason', 'Reason')}
          <TextArea value={reason} onChange={e => setReason(e.target.value)} maxLength={500} />
        </Field>
        <Muted>{t('leave.daysNote', 'Store holidays and your rest days are not counted.')}</Muted>
      </div>
    </Modal>
  );
};

export default LeaveRequestModal;
