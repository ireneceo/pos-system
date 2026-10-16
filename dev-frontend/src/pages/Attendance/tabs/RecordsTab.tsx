import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTableContainer, DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, DataTableEmpty } from '../../../components/UI/DataTable';
import { Button } from '../../../components/UI/Button';
import DateRangeField from '../../../components/Common/DateRangeField';
import { formatTime } from '../../../utils/dateFormat';
import { attendanceApi, AttendanceRecord, StaffProfile, formatMinutes, todayIn } from '../attendanceApi';
import { Card, CardTitle, Muted, Row, Spacer, Badge, ErrorBox, Select, Field } from '../attendanceStyles';
import CorrectRecordModal from '../CorrectRecordModal';
import { networkTone } from './TodayTab';

interface Props { restaurantId: string; timeZone: string; }

interface SummaryRow { user_id: number; user_name: string; minutes: number; days: number; records: number; open: number; overdue: number; }

const shiftDate = (d: string, days: number) => {
  const x = new Date(`${d}T00:00:00Z`); x.setUTCDate(x.getUTCDate() + days); return x.toISOString().slice(0, 10);
};

const RecordsTab: React.FC<Props> = ({ restaurantId, timeZone }) => {
  const { t } = useTranslation('attendance');
  const today = todayIn(timeZone);
  const [from, setFrom] = useState(today.slice(0, 8) + '01');
  const [to, setTo] = useState(today);
  const [userId, setUserId] = useState('');
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [staff, setStaff] = useState<StaffProfile[]>([]);
  const [summary, setSummary] = useState<SummaryRow[]>([]);
  const [month, setMonth] = useState(today.slice(0, 7));
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<AttendanceRecord | null>(null);
  const [adding, setAdding] = useState(false);

  const load = useCallback(async () => {
    const q = new URLSearchParams({ from, to });
    if (userId) q.set('user_id', userId);
    const [r, s] = await Promise.all([
      attendanceApi<{ records: AttendanceRecord[] }>(restaurantId, `/records?${q}`),
      attendanceApi<{ staff: SummaryRow[] }>(restaurantId, `/summary?month=${month}`),
    ]);
    if (!r.ok) { setError(r.message || t('errors.load', 'Could not load')); return; }
    setError('');
    setRecords(r.data.records || []);
    setSummary(s.ok ? (s.data.staff || []) : []);
  }, [restaurantId, from, to, userId, month, t]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    attendanceApi<StaffProfile[]>(restaurantId, '/profiles').then(r => { if (r.ok) setStaff(r.data || []); });
  }, [restaurantId]);

  const total = useMemo(() => records.reduce((s, r) => s + (r.is_open ? 0 : r.minutes), 0), [records]);

  const exportCsv = () => {
    const head = ['Date', 'Staff', 'Clock in', 'Clock out', 'Minutes', 'Method', 'Network', 'Corrected', 'Reason'];
    const lines = records.map(r => [
      r.work_date, r.user_name || '', formatTime(r.clock_in_at, timeZone), r.clock_out_at ? formatTime(r.clock_out_at, timeZone) : '',
      r.is_open ? '' : String(r.minutes), r.clock_in_method, r.clock_in_network || '', r.corrected ? 'yes' : '', r.correction_reason || '',
    ]);
    const csv = [head, ...lines].map(l => l.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url; a.download = `attendance-${from}-${to}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Card>
        <Row>
          <CardTitle style={{ margin: 0 }}>{t('records.monthSummary', 'Monthly hours')}</CardTitle>
          <Spacer />
          <Button size="small" variant="secondary" onClick={() => setMonth(m => shiftDate(`${m}-01`, -1).slice(0, 7))}>‹</Button>
          <strong style={{ minWidth: 80, textAlign: 'center' }}>{month}</strong>
          <Button size="small" variant="secondary" onClick={() => setMonth(m => shiftDate(`${m}-01`, 32).slice(0, 7))}>›</Button>
        </Row>
        <div style={{ marginTop: 12 }}>
          {summary.length === 0 ? <Muted>{t('records.noSummary', 'No records this month.')}</Muted> : (
            <DataTableContainer>
              <DataTable>
                <DataTableHead>
                  <tr>
                    <DataTableHeaderCell align="left">{t('fields.staff', 'Staff')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">{t('records.days', 'Days')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">{t('records.hours', 'Hours')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">{t('records.openCount', 'Not clocked out')}</DataTableHeaderCell>
                  </tr>
                </DataTableHead>
                <tbody>
                  {summary.map(s => (
                    <DataTableRow key={s.user_id}>
                      <DataTableCell>{s.user_name}</DataTableCell>
                      <DataTableCell align="right">{s.days}</DataTableCell>
                      <DataTableCell align="right">{formatMinutes(s.minutes)}</DataTableCell>
                      <DataTableCell align="right">{s.overdue ? <Badge tone="amber">{s.overdue}</Badge> : (s.open || '—')}</DataTableCell>
                    </DataTableRow>
                  ))}
                </tbody>
              </DataTable>
            </DataTableContainer>
          )}
        </div>
      </Card>

      <Card>
        <Row>
          <Field style={{ minWidth: 260 }}>
            {t('records.period', 'Period')}
            <DateRangeField startDate={from} endDate={to} onChange={(s, e) => { setFrom(s); setTo(e || s); }} />
          </Field>
          <Field>
            {t('fields.staff', 'Staff')}
            <Select value={userId} onChange={e => setUserId(e.target.value)}>
              <option value="">{t('records.allStaff', 'All staff')}</option>
              {staff.map(s => <option key={s.user_id} value={s.user_id}>{s.name}</option>)}
            </Select>
          </Field>
          <Spacer />
          <Button variant="secondary" onClick={exportCsv} disabled={!records.length}>{t('records.exportCsv', 'Export CSV')}</Button>
          <Button variant="primary" onClick={() => setAdding(true)}>{t('records.add', 'Add record')}</Button>
        </Row>
        <Muted style={{ marginTop: 10 }}>
          {t('records.totalLine', '{{count}} records · {{hours}} worked (open records not counted)', { count: records.length, hours: formatMinutes(total) })}
        </Muted>
      </Card>

      {error && <ErrorBox>{error}</ErrorBox>}

      <DataTableContainer>
        {records.length === 0 ? (
          <DataTableEmpty>{t('records.empty', 'No clock-in records for this period.')}</DataTableEmpty>
        ) : (
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">{t('records.date', 'Date')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('fields.staff', 'Staff')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('fields.clockIn', 'Clock in')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('fields.clockOut', 'Clock out')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('records.hours', 'Hours')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('records.how', 'How')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('records.actions', 'Actions')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {records.map(r => (
                <DataTableRow key={r.id}>
                  <DataTableCell>{r.work_date}</DataTableCell>
                  <DataTableCell>{r.user_name}</DataTableCell>
                  <DataTableCell align="center">{formatTime(r.clock_in_at, timeZone)}</DataTableCell>
                  <DataTableCell align="center">{r.clock_out_at ? formatTime(r.clock_out_at, timeZone) : <Badge tone="blue">{t('records.working', 'Working')}</Badge>}</DataTableCell>
                  <DataTableCell align="right">{r.is_open ? '—' : formatMinutes(r.minutes)}</DataTableCell>
                  <DataTableCell align="center">
                    <Row gap={4} style={{ justifyContent: 'center' }}>
                      <Badge>{t(`method.${r.clock_in_method}`, r.clock_in_method)}</Badge>
                      <Badge tone={networkTone(r.clock_in_network)}>{t(`network.${r.clock_in_network || 'off'}`, r.clock_in_network || 'off')}</Badge>
                      {r.corrected && <Badge tone="purple" title={r.correction_reason || ''}>{t('records.corrected', 'Corrected')}</Badge>}
                    </Row>
                  </DataTableCell>
                  <DataTableCell align="right">
                    <Button size="small" variant="secondary" onClick={() => setEditing(r)}>{t('records.correct', 'Correct')}</Button>
                  </DataTableCell>
                </DataTableRow>
              ))}
            </tbody>
          </DataTable>
        )}
      </DataTableContainer>

      {(editing || adding) && (
        <CorrectRecordModal
          restaurantId={restaurantId}
          timeZone={timeZone}
          record={editing}
          staff={staff}
          onClose={() => { setEditing(null); setAdding(false); }}
          onSaved={() => { setEditing(null); setAdding(false); load(); }}
        />
      )}
    </>
  );
};

export default RecordsTab;
