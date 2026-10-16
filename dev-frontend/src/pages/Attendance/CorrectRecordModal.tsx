/**
 * 출퇴근 기록 고치기 / 수동 추가 창 — 사유 필수, 원래 값은 서버가 보존한다(삭제 없음).
 * 입력 시각은 매장 타임존 기준이다(브라우저 시계 아님).
 */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../components/UI/Modal';
import { Button } from '../../components/UI/Button';
import { attendanceApi, AttendanceRecord, StaffProfile, toLocalInput, fromLocalInput } from './attendanceApi';
import { Field, TextInput, TextArea, Select, ErrorBox, Muted } from './attendanceStyles';
import { formatDateTime } from '../../utils/dateFormat';

interface Props {
  restaurantId: string;
  timeZone: string;
  record?: AttendanceRecord | null;   // 없으면 수동 추가
  staff?: StaffProfile[];
  onClose: () => void;
  onSaved: () => void;
}

const CorrectRecordModal: React.FC<Props> = ({ restaurantId, timeZone, record, staff = [], onClose, onSaved }) => {
  const { t } = useTranslation('attendance');
  const adding = !record;
  const [userId, setUserId] = useState<string>(record ? String(record.user_id) : '');
  const [inAt, setInAt] = useState(toLocalInput(record?.clock_in_at, timeZone));
  const [outAt, setOutAt] = useState(toLocalInput(record?.clock_out_at, timeZone));
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const save = async () => {
    setError('');
    if (!reason.trim()) { setError(t('correct.reasonRequired', 'Please write a reason.')); return; }
    const inIso = fromLocalInput(inAt, timeZone);
    const outIso = outAt ? fromLocalInput(outAt, timeZone) : null;
    if (!inIso || (outAt && !outIso)) { setError(t('correct.invalidTime', 'Please enter valid times.')); return; }
    if (adding && !outIso) { setError(t('correct.outRequired', 'Clock-out time is required for a manual record.')); return; }
    if (adding && !userId) { setError(t('correct.staffRequired', 'Choose a staff member.')); return; }
    const r = adding
      ? await attendanceApi(restaurantId, '/records', { method: 'POST', body: { user_id: Number(userId), clock_in_at: inIso, clock_out_at: outIso, reason } })
      : await attendanceApi(restaurantId, `/records/${record!.id}`, { method: 'PATCH', body: { clock_in_at: inIso, clock_out_at: outIso, reason } });
    if (!r.ok) { setError(r.message || t('errors.save', 'Could not save')); return; }
    onSaved();
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={adding ? t('correct.addTitle', 'Add a record') : t('correct.title', 'Correct record')}
      size="small"
      footer={
        <>
          <Button variant="cancel" onClick={onClose}>{t('actions.cancel', 'Cancel')}</Button>
          <Button variant="primary" onClick={save}>{t('actions.save', 'Save')}</Button>
        </>
      }
    >
      {error && <ErrorBox>{error}</ErrorBox>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {adding ? (
          <Field>
            {t('fields.staff', 'Staff')}
            <Select value={userId} onChange={e => setUserId(e.target.value)}>
              <option value="">{t('fields.choose', 'Choose…')}</option>
              {staff.map(s => <option key={s.user_id} value={s.user_id}>{s.name}</option>)}
            </Select>
          </Field>
        ) : (
          <Muted><strong>{record!.user_name}</strong> · {record!.work_date}</Muted>
        )}
        <Field>
          {t('fields.clockIn', 'Clock in')}
          <TextInput type="datetime-local" value={inAt} onChange={e => setInAt(e.target.value)} />
        </Field>
        <Field>
          {t('fields.clockOut', 'Clock out')}
          <TextInput type="datetime-local" value={outAt} onChange={e => setOutAt(e.target.value)} />
        </Field>
        {!adding && record!.original_clock_in_at && (
          <Muted>
            {t('correct.original', 'Originally: {{in}} – {{out}}', {
              in: formatDateTime(record!.original_clock_in_at, timeZone),
              out: record!.original_clock_out_at ? formatDateTime(record!.original_clock_out_at, timeZone) : '—',
            })}
          </Muted>
        )}
        <Field>
          {t('fields.reason', 'Reason')}
          <TextArea value={reason} onChange={e => setReason(e.target.value)} placeholder={t('correct.reasonPlaceholder', 'e.g. forgot to clock out')} maxLength={500} />
        </Field>
        <Muted>{t('correct.timeZoneNote', 'Times are in the store time zone ({{tz}}).', { tz: timeZone })}</Muted>
      </div>
    </Modal>
  );
};

export default CorrectRecordModal;
