import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTableContainer, DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, DataTableEmpty } from '../../../components/UI/DataTable';
import { Button } from '../../../components/UI/Button';
import { attendanceApi, LeaveBalance, StaffProfile, WEEKDAY_KEYS, todayIn } from '../attendanceApi';
import { Card, CardTitle, Muted, Row, Spacer, Badge, ErrorBox, TextInput, Select } from '../attendanceStyles';

interface Draft { rest_days: number[]; days: Record<number, string>; }

const StaffWorkSection: React.FC<{ restaurantId: string; timeZone: string }> = ({ restaurantId, timeZone }) => {
  const { t } = useTranslation('attendance');
  const thisYear = Number(todayIn(timeZone).slice(0, 4));
  const [year, setYear] = useState(thisYear);
  const [staff, setStaff] = useState<StaffProfile[]>([]);
  const [balances, setBalances] = useState<Record<number, LeaveBalance[]>>({});
  const [drafts, setDrafts] = useState<Record<number, Draft>>({});
  const [error, setError] = useState('');
  const [savedId, setSavedId] = useState<number | null>(null);

  const load = useCallback(async () => {
    const p = await attendanceApi<StaffProfile[]>(restaurantId, '/profiles');
    if (!p.ok) { setError(p.message || t('errors.load', 'Could not load')); return; }
    const list = p.data || [];
    const bal: Record<number, LeaveBalance[]> = {};
    await Promise.all(list.map(async s => {
      const b = await attendanceApi<{ balances: LeaveBalance[] }>(restaurantId, `/leave/balance?user_id=${s.user_id}&year=${year}`);
      bal[s.user_id] = b.ok ? b.data.balances.filter(x => x.is_active) : [];
    }));
    setStaff(list);
    setBalances(bal);
    setDrafts(Object.fromEntries(list.map(s => [s.user_id, {
      rest_days: s.rest_days || [],
      days: Object.fromEntries((bal[s.user_id] || []).map(b => [b.leave_type_id, b.entitlement_source === 'staff' ? String(b.entitled) : ''])),
    }])));
  }, [restaurantId, year, t]);
  useEffect(() => { load(); }, [load]);

  const types = (staff.length && balances[staff[0].user_id]) || [];

  const toggleDay = (uid: number, d: number) => setDrafts(x => {
    const cur = x[uid].rest_days;
    return { ...x, [uid]: { ...x[uid], rest_days: cur.includes(d) ? cur.filter(v => v !== d) : [...cur, d].sort() } };
  });

  const saveRow = async (s: StaffProfile) => {
    setError('');
    const d = drafts[s.user_id];
    const p = await attendanceApi(restaurantId, `/profiles/${s.user_id}`, { method: 'PUT', body: { rest_days: d.rest_days } });
    if (!p.ok) { setError(p.message || t('errors.save', 'Could not save')); return; }
    for (const b of balances[s.user_id] || []) {
      const want = d.days[b.leave_type_id] ?? '';
      const had = b.entitlement_source === 'staff' ? String(b.entitled) : '';
      if (want === had) continue;
      const r = await attendanceApi(restaurantId, '/leave/entitlements', { method: 'PUT', body: {
        user_id: s.user_id, leave_type_id: b.leave_type_id, year, days: want === '' ? null : Number(want),
      } });
      if (!r.ok) { setError(r.message || t('errors.save', 'Could not save')); return; }
    }
    setSavedId(s.user_id);
    load();
  };

  return (
    <Card>
      <Row>
        <CardTitle style={{ margin: 0 }}>{t('settings.staffTitle', 'Staff rest days and leave days')}</CardTitle>
        <Spacer />
        <Select value={year} onChange={e => setYear(Number(e.target.value))}>
          {[thisYear - 1, thisYear, thisYear + 1].map(y => <option key={y} value={y}>{y}</option>)}
        </Select>
      </Row>
      <Muted style={{ margin: '8px 0 12px' }}>{t('settings.staffHelp', 'Rest days are not counted as leave. Leave a day box empty to use the leave type default (shown in grey).')}</Muted>
      {error && <ErrorBox>{error}</ErrorBox>}
      <DataTableContainer>
        {staff.length === 0 ? <DataTableEmpty>{t('settings.noStaff', 'No staff in this store yet.')}</DataTableEmpty> : (
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">{t('fields.staff', 'Staff')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('settings.restDays', 'Rest days')}</DataTableHeaderCell>
                {types.map(ty => <DataTableHeaderCell key={ty.leave_type_id} align="center">{ty.name}</DataTableHeaderCell>)}
                <DataTableHeaderCell align="right">{t('records.actions', 'Actions')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {staff.map(s => drafts[s.user_id] && (
                <DataTableRow key={s.user_id}>
                  <DataTableCell>
                    <div>{s.name}</div>
                    {!s.has_pin && <Badge tone="amber">{t('settings.noPin', 'No PIN — cannot use Time Clock')}</Badge>}
                  </DataTableCell>
                  <DataTableCell>
                    <Row gap={4}>
                      {WEEKDAY_KEYS.map((k, i) => (
                        <label key={k} style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 2 }}>
                          <input type="checkbox" checked={drafts[s.user_id].rest_days.includes(i)} onChange={() => toggleDay(s.user_id, i)} />
                          {t(`weekday.${k}`, k)}
                        </label>
                      ))}
                    </Row>
                  </DataTableCell>
                  {types.map(ty => {
                    const b = (balances[s.user_id] || []).find(x => x.leave_type_id === ty.leave_type_id);
                    const def = b && b.entitlement_source !== 'staff' && b.entitled != null ? String(b.entitled) : '—';
                    return (
                      <DataTableCell key={ty.leave_type_id} align="center">
                        <TextInput
                          type="number" min={0} step={0.5} style={{ width: 80 }}
                          placeholder={def}
                          value={drafts[s.user_id].days[ty.leave_type_id] ?? ''}
                          onChange={e => setDrafts(x => ({ ...x, [s.user_id]: { ...x[s.user_id], days: { ...x[s.user_id].days, [ty.leave_type_id]: e.target.value } } }))}
                        />
                        {b && <Muted style={{ fontSize: 11 }}>{t('settings.usedLine', 'used {{used}}', { used: b.used })}</Muted>}
                      </DataTableCell>
                    );
                  })}
                  <DataTableCell align="right">
                    <Button size="small" variant="primary" onClick={() => saveRow(s)}>{t('actions.save', 'Save')}</Button>
                    {savedId === s.user_id && <Muted style={{ fontSize: 11 }}>{t('settings.saved', 'Saved')}</Muted>}
                  </DataTableCell>
                </DataTableRow>
              ))}
            </tbody>
          </DataTable>
        )}
      </DataTableContainer>
    </Card>
  );
};

export default StaffWorkSection;
