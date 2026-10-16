import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/UI/Button';
import { Modal } from '../../../components/UI/Modal';
import { attendanceApi, LeaveRequestRow, todayIn, WEEKDAY_KEYS } from '../attendanceApi';
import { Card, Muted, Row, Spacer, ErrorBox, Field, TextInput, Select, Dot, InfoBox } from '../attendanceStyles';

interface Props { restaurantId: string; timeZone: string; }
interface Holiday { id: number; date: string; name: string; kind: 'public' | 'store_closed'; }
interface CalData { month: string; holidays: Holiday[]; leaves: LeaveRequestRow[]; rest_days: { user_id: number; user_name: string; rest_days: number[] }[]; }

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  border-top: 1px solid #E5E7EB;
  border-left: 1px solid #E5E7EB;
`;
const Head = styled.div`
  padding: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-align: center;
  border-right: 1px solid #E5E7EB;
  border-bottom: 1px solid #E5E7EB;
  background: #F9FAFB;
`;
const Cell = styled.div<{ muted?: boolean; holiday?: boolean; today?: boolean }>`
  min-height: 92px;
  padding: 6px 8px;
  border-right: 1px solid #E5E7EB;
  border-bottom: 1px solid #E5E7EB;
  background: ${p => (p.holiday ? '#FEF2F2' : p.muted ? '#FAFAFA' : '#FFFFFF')};
  cursor: ${p => (p.muted ? 'default' : 'pointer')};
  font-size: 12px;
  overflow: hidden;
  outline: ${p => (p.today ? '2px solid #635BFF' : 'none')};
  outline-offset: -2px;
  &:hover { background: ${p => (p.muted ? '#FAFAFA' : '#F5F3FF')}; }
`;
const DayNum = styled.div`
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
`;
const Chip = styled.div<{ color?: string | null }>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-left: 3px solid ${p => p.color || '#9CA3AF'};
  padding-left: 4px;
  margin-bottom: 2px;
  color: #374151;
`;

const shiftMonth = (m: string, delta: number) => {
  const [y, mo] = m.split('-').map(Number);
  const d = new Date(Date.UTC(y, mo - 1 + delta, 1));
  return d.toISOString().slice(0, 7);
};

const CalendarTab: React.FC<Props> = ({ restaurantId, timeZone }) => {
  const { t } = useTranslation('attendance');
  const today = todayIn(timeZone);
  const [month, setMonth] = useState(today.slice(0, 7));
  const [data, setData] = useState<CalData | null>(null);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [picked, setPicked] = useState<string | null>(null);
  const [hName, setHName] = useState('');
  const [hKind, setHKind] = useState<'public' | 'store_closed'>('store_closed');

  const load = useCallback(async () => {
    const r = await attendanceApi<CalData>(restaurantId, `/calendar?month=${month}`);
    if (r.ok) { setData(r.data); setError(''); } else setError(r.message || t('errors.load', 'Could not load'));
  }, [restaurantId, month, t]);
  useEffect(() => { load(); }, [load]);

  const cells = useMemo(() => {
    const [y, m] = month.split('-').map(Number);
    const first = new Date(Date.UTC(y, m - 1, 1));
    const daysIn = new Date(Date.UTC(y, m, 0)).getUTCDate();
    const lead = first.getUTCDay();
    const out: { date: string | null; dow: number }[] = [];
    for (let i = 0; i < lead; i++) out.push({ date: null, dow: i });
    for (let d = 1; d <= daysIn; d++) {
      const date = `${month}-${String(d).padStart(2, '0')}`;
      out.push({ date, dow: new Date(`${date}T00:00:00Z`).getUTCDay() });
    }
    while (out.length % 7) out.push({ date: null, dow: out.length % 7 });
    return out;
  }, [month]);

  const holidaysOn = (d: string) => (data?.holidays || []).filter(h => h.date === d);
  const leavesOn = (d: string) => (data?.leaves || []).filter(l => l.start_date <= d && l.end_date >= d);
  const restOn = (dow: number) => (data?.rest_days || []).filter(r => r.rest_days.includes(dow));

  const addHoliday = async () => {
    if (!picked || !hName.trim()) return;
    const r = await attendanceApi(restaurantId, '/holidays', { method: 'POST', body: { date: picked, name: hName.trim(), kind: hKind } });
    if (!r.ok) { setError(r.message || t('errors.save', 'Could not save')); return; }
    setPicked(null); setHName(''); load();
  };
  const removeHoliday = async (h: Holiday) => {
    const r = await attendanceApi(restaurantId, `/holidays/${h.id}`, { method: 'DELETE' });
    if (!r.ok) setError(r.message || t('errors.save', 'Could not save'));
    load();
  };
  const importNational = async () => {
    const year = Number(month.slice(0, 4));
    const r = await attendanceApi<{ added: number; total: number }>(restaurantId, '/holidays/import-national', { method: 'POST', body: { year } });
    if (!r.ok) { setError(r.message || t('errors.save', 'Could not save')); return; }
    setInfo(t('calendar.imported', 'Added {{added}} of {{total}} national holidays for {{year}}.', { added: r.data.added, total: r.data.total, year }));
    load();
  };

  return (
    <>
      {error && <ErrorBox>{error}</ErrorBox>}
      {info && <InfoBox>{info}</InfoBox>}
      <Card>
        <Row>
          <Button size="small" variant="secondary" onClick={() => setMonth(m => shiftMonth(m, -1))}>‹</Button>
          <strong style={{ minWidth: 90, textAlign: 'center' }}>{month}</strong>
          <Button size="small" variant="secondary" onClick={() => setMonth(m => shiftMonth(m, 1))}>›</Button>
          <Spacer />
          <Muted>{t('calendar.help', 'Click a date to add a holiday.')}</Muted>
          <Button size="small" variant="secondary" onClick={importNational}>{t('calendar.importNational', 'Add national holidays ({{year}})', { year: month.slice(0, 4) })}</Button>
        </Row>
      </Card>
      <Grid>
        {WEEKDAY_KEYS.map(k => <Head key={k}>{t(`weekday.${k}`, k)}</Head>)}
        {cells.map((c, i) => {
          if (!c.date) return <Cell key={`e${i}`} muted />;
          const hs = holidaysOn(c.date);
          const ls = leavesOn(c.date);
          const rs = restOn(c.dow);
          return (
            <Cell key={c.date} holiday={hs.length > 0} today={c.date === today} onClick={() => { setPicked(c.date); setHName(''); }}>
              <DayNum>{Number(c.date.slice(8))}</DayNum>
              {hs.map(h => <Chip key={h.id} color="#EF4444">{h.name}</Chip>)}
              {ls.map(l => <Chip key={l.id} color={l.leave_type?.color}>{l.user_name}{l.half_day ? ` (${l.half_day.toUpperCase()})` : ''}</Chip>)}
              {rs.length > 0 && <Muted style={{ fontSize: 11 }}>{t('calendar.restCount', '{{count}} resting', { count: rs.length })}</Muted>}
            </Cell>
          );
        })}
      </Grid>

      {(data?.rest_days || []).length > 0 && (
        <Card style={{ marginTop: 16 }}>
          <Muted>
            {(data!.rest_days).map(r => (
              <div key={r.user_id}><Dot />{r.user_name}: {r.rest_days.map(d => t(`weekday.${WEEKDAY_KEYS[d]}`, WEEKDAY_KEYS[d])).join(', ')}</div>
            ))}
          </Muted>
        </Card>
      )}

      {picked && (
        <Modal
          isOpen
          onClose={() => setPicked(null)}
          title={picked}
          size="small"
          footer={
            <>
              <Button variant="cancel" onClick={() => setPicked(null)}>{t('actions.close', 'Close')}</Button>
              <Button variant="primary" onClick={addHoliday} disabled={!hName.trim()}>{t('calendar.addHoliday', 'Add holiday')}</Button>
            </>
          }
        >
          {holidaysOn(picked).map(h => (
            <Row key={h.id} style={{ marginBottom: 10 }}>
              <span><Dot color="#EF4444" />{h.name} · {t(`calendar.kind.${h.kind}`, h.kind)}</span>
              <Spacer />
              <Button size="small" variant="danger-outline" onClick={() => removeHoliday(h)}>{t('actions.remove', 'Remove')}</Button>
            </Row>
          ))}
          {leavesOn(picked).map(l => (
            <Muted key={l.id} style={{ marginBottom: 6 }}><Dot color={l.leave_type?.color} />{l.user_name} · {l.leave_type?.name}</Muted>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
            <Field>
              {t('calendar.holidayName', 'Holiday name')}
              <TextInput value={hName} onChange={e => setHName(e.target.value)} maxLength={100} />
            </Field>
            <Field>
              {t('calendar.kindLabel', 'Kind')}
              <Select value={hKind} onChange={e => setHKind(e.target.value as 'public' | 'store_closed')}>
                <option value="store_closed">{t('calendar.kind.store_closed', 'Store closed')}</option>
                <option value="public">{t('calendar.kind.public', 'Public holiday')}</option>
              </Select>
            </Field>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CalendarTab;
