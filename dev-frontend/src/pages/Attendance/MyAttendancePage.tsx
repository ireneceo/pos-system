/**
 * 직원 «My Attendance» — /restaurant/:restaurantId/my-attendance
 * 큰 버튼 하나로 출근 ↔ 퇴근, 매장 네트워크가 아니면 관리자 PIN 칸. 아래: 오늘·이번 달 기록, 휴가 잔여·신청·내 신청.
 * 설계 .claude/fable-design-20261016-staff-attendance.md §4-2.
 */
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Header, Title, Content } from '../../components/UI/PageComponents';
import { DataTableContainer, DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, DataTableEmpty } from '../../components/UI/DataTable';
import { Button } from '../../components/UI/Button';
import { formatTime, formatDateTime } from '../../utils/dateFormat';
import { attendanceApi, AttendanceRecord, LeaveBalance, LeaveRequestRow, formatMinutes, formatPeriod, todayIn } from './attendanceApi';
import { Card, CardTitle, Muted, Row, Spacer, Badge, Dot, ErrorBox, InfoBox, TextInput, PersonGrid, PersonCard, PersonName } from './attendanceStyles';
import LeaveRequestModal from './LeaveRequestModal';
import { statusTone } from './tabs/LeaveTab';
import NetworkStatus from './NetworkStatus';

const ClockCard = styled(Card)`
  text-align: center;
  padding: 28px 20px;
`;
const BigTime = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: #0A2540;
  letter-spacing: 1px;
  margin-bottom: 4px;
`;
const ClockButton = styled(Button)`
  min-width: 240px;
  height: 64px;
  font-size: 20px;
  border-radius: 14px;
  margin-top: 16px;
`;

interface Status {
  open: AttendanceRecord | null;
  settings: { network_restriction: boolean; allow_self_clock: boolean; allow_pos_pin_clock: boolean };
  time_zone: string;
  on_store_network?: boolean | null;
}

const MyAttendancePage: React.FC = () => {
  const { t } = useTranslation(['attendance']);
  const { restaurantId = '' } = useParams<{ restaurantId: string }>();
  const [status, setStatus] = useState<Status | null>(null);
  const [today, setToday] = useState<AttendanceRecord[]>([]);
  const [month, setMonth] = useState<{ records: AttendanceRecord[]; total_minutes: number } | null>(null);
  const [balances, setBalances] = useState<LeaveBalance[]>([]);
  const [requests, setRequests] = useState<LeaveRequestRow[]>([]);
  const [now, setNow] = useState(new Date());
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [needPin, setNeedPin] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [requesting, setRequesting] = useState(false);
  const tz = status?.time_zone || 'Asia/Kuala_Lumpur';

  const load = useCallback(async () => {
    const s = await attendanceApi<Status>(restaurantId, '/me/status');
    if (!s.ok) { setError(s.message || t('errors.load', 'Could not load')); return; }
    setStatus(s.data);
    const tzz = s.data.time_zone;
    const d = todayIn(tzz);
    const [td, mo, bal, rq] = await Promise.all([
      attendanceApi<{ records: AttendanceRecord[] }>(restaurantId, '/me/today'),
      attendanceApi<{ records: AttendanceRecord[]; total_minutes: number }>(restaurantId, `/me?from=${d.slice(0, 8)}01&to=${d}`),
      attendanceApi<{ balances: LeaveBalance[] }>(restaurantId, `/leave/balance?year=${d.slice(0, 4)}`),
      attendanceApi<LeaveRequestRow[]>(restaurantId, '/leave/requests'),
    ]);
    if (td.ok) setToday(td.data.records || []);
    if (mo.ok) setMonth(mo.data);
    if (bal.ok) setBalances((bal.data.balances || []).filter(b => b.is_active));
    if (rq.ok) setRequests(rq.data || []);
    setError('');
  }, [restaurantId, t]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { const id = window.setInterval(() => setNow(new Date()), 15000); return () => window.clearInterval(id); }, []);

  const clock = async () => {
    if (!status) return;
    setError(''); setNotice('');
    const action = status.open ? 'out' : 'in';
    const body: Record<string, unknown> = { action, method: 'self' };
    if (needPin && adminPin) body.admin_pin = adminPin;
    const r = await attendanceApi<{ record: AttendanceRecord }>(restaurantId, '/clock', { method: 'POST', body });
    if (!r.ok) {
      if (r.code === 'NETWORK_MISMATCH') { setNeedPin(true); setError(t('my.networkMismatch', 'You are not on the store network. Connect to the store Wi-Fi, or ask a manager to enter their PIN.')); }
      else if (r.code === 'INVALID_ADMIN_PIN') setError(t('my.invalidAdminPin', 'Manager PIN is not correct.'));
      else setError(r.message || t('errors.save', 'Could not save'));
      return;
    }
    setNeedPin(false); setAdminPin('');
    setNotice(action === 'in'
      ? t('my.clockedIn', 'Clocked in at {{time}}', { time: formatTime(r.data.record.clock_in_at, tz) })
      : t('my.clockedOut', 'Clocked out at {{time}} · {{hours}} worked', { time: formatTime(r.data.record.clock_out_at, tz), hours: formatMinutes(r.data.record.minutes) }));
    load();
  };

  const cancelRequest = async (row: LeaveRequestRow) => {
    const r = await attendanceApi(restaurantId, `/leave/requests/${row.id}/cancel`, { method: 'POST', body: {} });
    if (!r.ok) setError(r.message || t('errors.save', 'Could not save'));
    load();
  };

  const open = status?.open;
  const selfOff = status && !status.settings.allow_self_clock;

  return (
    <Container>
      <Header><Title>{t('my.title', 'My Attendance')}</Title></Header>
      <Content>
        {error && <ErrorBox>{error}</ErrorBox>}
        {notice && <InfoBox>{notice}</InfoBox>}

        <ClockCard>
          <BigTime>{now.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', timeZone: tz })}</BigTime>
          <Muted>{now.toLocaleDateString('en-MY', { weekday: 'long', day: 'numeric', month: 'long', timeZone: tz })}</Muted>
          {status && (
            <Muted style={{ marginTop: 10 }}>
              {open
                ? t('my.workingSince', 'Working since {{time}} ({{hours}})', { time: formatTime(open.clock_in_at, tz), hours: formatMinutes(open.minutes) })
                : t('my.notWorking', 'You are not clocked in.')}
            </Muted>
          )}
          {selfOff ? (
            <Muted style={{ marginTop: 16 }}>{t('my.selfOff', 'Clocking from your own device is turned off. Use the Time Clock on the store tablet.')}</Muted>
          ) : (
            <>
              {needPin && (
                <Row style={{ justifyContent: 'center', marginTop: 16 }}>
                  <TextInput
                    type="password" inputMode="numeric" maxLength={4} placeholder={t('my.adminPin', 'Manager PIN')}
                    value={adminPin} onChange={e => setAdminPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    style={{ width: 160, textAlign: 'center', fontSize: 18, letterSpacing: 6 }}
                  />
                </Row>
              )}
              <div>
                <ClockButton variant={open ? 'warning' : 'primary'} onClick={clock} disabled={!status || (needPin && adminPin.length !== 4)}>
                  {open ? t('my.clockOut', 'Clock out') : t('my.clockIn', 'Clock in')}
                </ClockButton>
              </div>
              {status?.settings.network_restriction && <Muted style={{ marginTop: 10 }}>{t('my.networkNote', 'This store only allows clocking on the store Wi-Fi.')}</Muted>}
              <NetworkStatus onStoreNetwork={status?.on_store_network} style={{ marginTop: 8 }} />
            </>
          )}
        </ClockCard>

        <Card>
          <CardTitle>{t('my.today', 'Today')}</CardTitle>
          {today.length === 0 ? <Muted>{t('my.noToday', 'No records today.')}</Muted> : today.map(r => (
            <Row key={r.id} style={{ padding: '6px 0', borderBottom: '1px solid #F3F4F6' }}>
              <span>{formatTime(r.clock_in_at, tz)} – {r.clock_out_at ? formatTime(r.clock_out_at, tz) : t('records.working', 'Working')}</span>
              <Spacer />
              <span>{formatMinutes(r.minutes)}</span>
            </Row>
          ))}
        </Card>

        <Card>
          <Row>
            <CardTitle style={{ margin: 0 }}>{t('my.leaveTitle', 'My leave')}</CardTitle>
            <Spacer />
            <Button variant="primary" onClick={() => setRequesting(true)}>{t('leave.requestTitle', 'Request leave')}</Button>
          </Row>
          <PersonGrid style={{ marginTop: 12 }}>
            {balances.map(b => (
              <PersonCard key={b.leave_type_id}>
                <PersonName><Dot color={b.color} />{b.name}</PersonName>
                <Muted>
                  {b.remaining == null
                    ? t('my.usedOnly', '{{used}} day(s) used', { used: b.used })
                    : t('my.remaining', '{{remaining}} of {{entitled}} days left', { remaining: b.remaining, entitled: b.entitled })}
                  {b.pending > 0 ? ` · ${t('my.pending', '{{pending}} waiting', { pending: b.pending })}` : ''}
                </Muted>
              </PersonCard>
            ))}
          </PersonGrid>
          <div style={{ marginTop: 16 }}>
            {requests.length === 0 ? <Muted>{t('leave.noHistory', 'No leave requests yet.')}</Muted> : requests.map(r => (
              <Row key={r.id} style={{ padding: '8px 0', borderBottom: '1px solid #F3F4F6' }}>
                <span><Dot color={r.leave_type?.color} />{r.leave_type?.name} · {formatPeriod(r)} · {t('leave.daysCount', '{{count}} day(s)', { count: r.days })}</span>
                <Badge tone={statusTone(r.status)}>{t(`status.${r.status}`, r.status)}</Badge>
                {r.decision_note && <Muted>“{r.decision_note}”</Muted>}
                <Spacer />
                {r.status === 'pending' && <Button size="small" variant="danger-outline" onClick={() => cancelRequest(r)}>{t('leave.withdraw', 'Withdraw')}</Button>}
              </Row>
            ))}
          </div>
        </Card>

        <Card>
          <Row>
            <CardTitle style={{ margin: 0 }}>{t('my.thisMonth', 'This month')}</CardTitle>
            <Spacer />
            {month && <strong>{formatMinutes(month.total_minutes)}</strong>}
          </Row>
          <DataTableContainer style={{ marginTop: 12 }}>
            {!month || month.records.length === 0 ? <DataTableEmpty>{t('records.empty', 'No clock-in records for this period.')}</DataTableEmpty> : (
              <DataTable>
                <DataTableHead>
                  <tr>
                    <DataTableHeaderCell align="left">{t('records.date', 'Date')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">{t('fields.clockIn', 'Clock in')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">{t('fields.clockOut', 'Clock out')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">{t('records.hours', 'Hours')}</DataTableHeaderCell>
                  </tr>
                </DataTableHead>
                <tbody>
                  {month.records.map(r => (
                    <DataTableRow key={r.id}>
                      <DataTableCell>{r.work_date} {r.corrected && <Badge tone="purple" title={r.correction_reason || ''}>{t('records.corrected', 'Corrected')}</Badge>}</DataTableCell>
                      <DataTableCell align="center">{formatTime(r.clock_in_at, tz)}</DataTableCell>
                      <DataTableCell align="center">{r.clock_out_at ? formatTime(r.clock_out_at, tz) : '—'}</DataTableCell>
                      <DataTableCell align="right">{r.is_open ? '—' : formatMinutes(r.minutes)}</DataTableCell>
                    </DataTableRow>
                  ))}
                </tbody>
              </DataTable>
            )}
          </DataTableContainer>
          {open && open.minutes > 16 * 60 && (
            <Muted style={{ marginTop: 8, color: '#B45309' }}>{t('my.longOpen', 'You have been clocked in since {{time}}. If you forgot to clock out, tell your manager.', { time: formatDateTime(open.clock_in_at, tz) })}</Muted>
          )}
        </Card>

        {requesting && (
          <LeaveRequestModal restaurantId={restaurantId} onClose={() => setRequesting(false)} onSaved={() => { setRequesting(false); setNotice(t('my.requestSent', 'Leave request sent to your manager.')); load(); }} />
        )}
      </Content>
    </Container>
  );
};

export default MyAttendancePage;
