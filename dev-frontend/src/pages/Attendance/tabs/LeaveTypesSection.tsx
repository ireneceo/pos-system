import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTableContainer, DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell } from '../../../components/UI/DataTable';
import { Button } from '../../../components/UI/Button';
import { attendanceApi, LeaveTypeRow } from '../attendanceApi';
import { Card, CardTitle, Muted, Row, ErrorBox, TextInput, Dot } from '../attendanceStyles';

interface Draft { name: string; is_paid: boolean; default_days: string; is_active: boolean; }
const toDraft = (r: LeaveTypeRow): Draft => ({
  name: r.name, is_paid: r.is_paid, is_active: r.is_active,
  default_days: r.default_days == null ? '' : String(Number(r.default_days)),
});

const LeaveTypesSection: React.FC<{ restaurantId: string }> = ({ restaurantId }) => {
  const { t } = useTranslation('attendance');
  const [rows, setRows] = useState<LeaveTypeRow[]>([]);
  const [drafts, setDrafts] = useState<Record<number, Draft>>({});
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    const r = await attendanceApi<LeaveTypeRow[]>(restaurantId, '/leave/types');
    if (!r.ok) { setError(r.message || t('errors.load', 'Could not load')); return; }
    setRows(r.data || []);
    setDrafts(Object.fromEntries((r.data || []).map(x => [x.id, toDraft(x)])));
  }, [restaurantId, t]);
  useEffect(() => { load(); }, [load]);

  const set = (id: number, patch: Partial<Draft>) => setDrafts(d => ({ ...d, [id]: { ...d[id], ...patch } }));
  const dirty = (r: LeaveTypeRow) => JSON.stringify(drafts[r.id]) !== JSON.stringify(toDraft(r));

  const saveRow = async (r: LeaveTypeRow) => {
    const d = drafts[r.id];
    const res = await attendanceApi(restaurantId, `/leave/types/${r.id}`, { method: 'PATCH', body: {
      name: d.name, is_paid: d.is_paid, is_active: d.is_active, default_days: d.default_days === '' ? null : Number(d.default_days),
    } });
    if (!res.ok) { setError(res.message || t('errors.save', 'Could not save')); return; }
    setError(''); load();
  };
  const add = async () => {
    if (!newName.trim()) return;
    const res = await attendanceApi(restaurantId, '/leave/types', { method: 'POST', body: { name: newName.trim(), is_paid: true, default_days: null } });
    if (!res.ok) { setError(res.message || t('errors.save', 'Could not save')); return; }
    setNewName(''); setError(''); load();
  };

  return (
    <Card>
      <CardTitle>{t('settings.leaveTypesTitle', 'Leave types')}</CardTitle>
      <Muted style={{ marginBottom: 12 }}>{t('settings.leaveTypesHelp', 'Days per year is the default for every staff member. Leave it empty to not track a yearly limit. You can set different days per person below.')}</Muted>
      {error && <ErrorBox>{error}</ErrorBox>}
      <DataTableContainer>
        <DataTable>
          <DataTableHead>
            <tr>
              <DataTableHeaderCell align="left">{t('settings.name', 'Name')}</DataTableHeaderCell>
              <DataTableHeaderCell align="center">{t('settings.paid', 'Paid')}</DataTableHeaderCell>
              <DataTableHeaderCell align="center">{t('settings.daysPerYear', 'Days per year')}</DataTableHeaderCell>
              <DataTableHeaderCell align="center">{t('settings.inUse', 'In use')}</DataTableHeaderCell>
              <DataTableHeaderCell align="right">{t('records.actions', 'Actions')}</DataTableHeaderCell>
            </tr>
          </DataTableHead>
          <tbody>
            {rows.map(r => drafts[r.id] && (
              <DataTableRow key={r.id}>
                <DataTableCell>
                  <Row gap={6} wrap={false}><Dot color={r.color} /><TextInput value={drafts[r.id].name} onChange={e => set(r.id, { name: e.target.value })} maxLength={60} /></Row>
                </DataTableCell>
                <DataTableCell align="center"><input type="checkbox" checked={drafts[r.id].is_paid} onChange={e => set(r.id, { is_paid: e.target.checked })} /></DataTableCell>
                <DataTableCell align="center">
                  <TextInput type="number" min={0} step={0.5} style={{ width: 90 }} placeholder="—" value={drafts[r.id].default_days} onChange={e => set(r.id, { default_days: e.target.value })} />
                </DataTableCell>
                <DataTableCell align="center"><input type="checkbox" checked={drafts[r.id].is_active} onChange={e => set(r.id, { is_active: e.target.checked })} /></DataTableCell>
                <DataTableCell align="right">
                  <Button size="small" variant="primary" disabled={!dirty(r)} onClick={() => saveRow(r)}>{t('actions.save', 'Save')}</Button>
                </DataTableCell>
              </DataTableRow>
            ))}
          </tbody>
        </DataTable>
      </DataTableContainer>
      <Row style={{ marginTop: 12 }}>
        <TextInput placeholder={t('settings.newTypePlaceholder', 'New leave type, e.g. Maternity Leave')} value={newName} onChange={e => setNewName(e.target.value)} maxLength={60} style={{ minWidth: 260 }} />
        <Button variant="secondary" onClick={add} disabled={!newName.trim()}>{t('settings.addType', 'Add type')}</Button>
      </Row>
    </Card>
  );
};

export default LeaveTypesSection;
