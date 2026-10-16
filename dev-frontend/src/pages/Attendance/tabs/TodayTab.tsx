import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/UI/Button';
import { formatTime, formatDateTime } from '../../../utils/dateFormat';
import { attendanceApi, AttendanceRecord, formatMinutes } from '../attendanceApi';
import { Card, CardTitle, Muted, PersonGrid, PersonCard, PersonName, Row, Spacer, Badge, Dot, ErrorBox } from '../attendanceStyles';
import CorrectRecordModal from '../CorrectRecordModal';

interface Props { restaurantId: string; timeZone: string; onOpenLeave: () => void; }

interface LiveData {
  today: string;
  working: AttendanceRecord[];
  overdue: AttendanceRecord[];
  on_leave: { id: number; user_id: number; user_name: string; type: string; color: string | null; half_day: string | null }[];
  pending_leave: number;
}

export const networkTone = (n: string | null) => (n === 'ok' ? 'green' : n === 'override' ? 'amber' : 'gray');

const TodayTab: React.FC<Props> = ({ restaurantId, timeZone, onOpenLeave }) => {
  const { t } = useTranslation('attendance');
  const [data, setData] = useState<LiveData | null>(null);
  const [error, setError] = useState('');
  const [closing, setClosing] = useState<AttendanceRecord | null>(null);

  const load = useCallback(async () => {
    const r = await attendanceApi<LiveData>(restaurantId, '/live');
    if (r.ok) { setData(r.data); setError(''); } else setError(r.message || t('errors.load', 'Could not load'));
  }, [restaurantId, t]);

  useEffect(() => {
    load();
    const id = window.setInterval(load, 60000);
    return () => window.clearInterval(id);
  }, [load]);

  if (error) return <ErrorBox>{error}</ErrorBox>;
  if (!data) return <Muted>{t('common.loading', 'Loading…')}</Muted>;

  const person = (r: AttendanceRecord, warn = false) => (
    <PersonCard key={r.id} warn={warn}>
      <PersonName>{r.user_name || `#${r.user_id}`}</PersonName>
      <Muted>
        {t('today.since', 'In since {{time}}', { time: warn ? formatDateTime(r.clock_in_at, timeZone) : formatTime(r.clock_in_at, timeZone) })}
        {' · '}{formatMinutes(r.minutes)}
      </Muted>
      <Row gap={6} style={{ marginTop: 8 }}>
        <Badge tone={networkTone(r.clock_in_network)}>{t(`network.${r.clock_in_network || 'off'}`, r.clock_in_network || 'off')}</Badge>
        <Badge>{t(`method.${r.clock_in_method}`, r.clock_in_method)}</Badge>
        {warn && <Spacer />}
        {warn && <Button size="small" variant="secondary" onClick={() => setClosing(r)}>{t('today.closeRecord', 'Close')}</Button>}
      </Row>
    </PersonCard>
  );

  return (
    <>
      {data.pending_leave > 0 && (
        <Card style={{ background: '#F5F3FF', borderColor: '#DDD6FE' }}>
          <Row>
            <div>{t('today.pendingLeave', '{{count}} leave request(s) waiting for approval', { count: data.pending_leave })}</div>
            <Spacer />
            <Button size="small" variant="primary" onClick={onOpenLeave}>{t('today.review', 'Review')}</Button>
          </Row>
        </Card>
      )}

      {data.overdue.length > 0 && (
        <Card>
          <CardTitle>{t('today.overdueTitle', 'Not clocked out')}</CardTitle>
          <Muted style={{ marginBottom: 12 }}>{t('today.overdueHelp', 'These records are still open after many hours. Set the real clock-out time — the system never closes them by itself.')}</Muted>
          <PersonGrid>{data.overdue.map(r => person(r, true))}</PersonGrid>
        </Card>
      )}

      <Card>
        <CardTitle>{t('today.workingTitle', 'Working now')} ({data.working.length})</CardTitle>
        {data.working.length === 0
          ? <Muted>{t('today.nobody', 'Nobody is clocked in.')}</Muted>
          : <PersonGrid>{data.working.map(r => person(r))}</PersonGrid>}
      </Card>

      <Card>
        <CardTitle>{t('today.onLeaveTitle', 'On leave today')} ({data.on_leave.length})</CardTitle>
        {data.on_leave.length === 0
          ? <Muted>{t('today.noLeave', 'No one is on leave today.')}</Muted>
          : (
            <PersonGrid>
              {data.on_leave.map(l => (
                <PersonCard key={l.id}>
                  <PersonName>{l.user_name}</PersonName>
                  <Muted><Dot color={l.color} />{l.type}{l.half_day ? ` (${l.half_day.toUpperCase()})` : ''}</Muted>
                </PersonCard>
              ))}
            </PersonGrid>
          )}
      </Card>

      {closing && (
        <CorrectRecordModal
          restaurantId={restaurantId}
          timeZone={timeZone}
          record={closing}
          onClose={() => setClosing(null)}
          onSaved={() => { setClosing(null); load(); }}
        />
      )}
    </>
  );
};

export default TodayTab;
