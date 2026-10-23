import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTableContainer, DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, DataTableEmpty } from '../../../components/UI/DataTable';
import { Button } from '../../../components/UI/Button';
import ConfirmModal from '../../../components/ConfirmModal';
import { formatDateTime } from '../../../utils/dateFormat';
import { attendanceApi } from '../attendanceApi';
import { Card, CardTitle, Muted, Row, Badge, ErrorBox, Toggle, Mono, TextInput, InfoBox, Steps, Step, Num, StepBody, StepTitle, StepActions } from '../attendanceStyles';
import LeaveTypesSection from './LeaveTypesSection';
import StaffWorkSection from './StaffWorkSection';

interface Props { restaurantId: string; timeZone: string; }

interface Settings {
  network_restriction: boolean;
  allow_self_clock: boolean;
  allow_pos_pin_clock: boolean;
  pin_override_registers_network: boolean;
  open_session_flag_hours: number;
}
interface NetworkRow { id: number; label: string | null; ip: string; source: 'manual' | 'pin_override' | 'kiosk_auto'; is_active: boolean; last_matched_at: string | null; is_current: boolean; }

const SettingsTab: React.FC<Props> = ({ restaurantId, timeZone }) => {
  const { t } = useTranslation('attendance');
  const [settings, setSettings] = useState<Settings | null>(null);
  const [networks, setNetworks] = useState<NetworkRow[]>([]);
  const [current, setCurrent] = useState<string | null>(null);
  const [label, setLabel] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState('');
  const [removing, setRemoving] = useState<NetworkRow | null>(null);

  const load = useCallback(async () => {
    const [s, n] = await Promise.all([
      attendanceApi<Settings>(restaurantId, '/settings'),
      attendanceApi<{ current_ip: string; networks: NetworkRow[] }>(restaurantId, '/networks'),
    ]);
    if (!s.ok) { setError(s.message || t('errors.load', 'Could not load')); return; }
    setSettings(s.data);
    if (n.ok) { setNetworks(n.data.networks || []); setCurrent(n.data.current_ip); }
  }, [restaurantId, t]);
  useEffect(() => { load(); }, [load]);

  const save = async (patch: Partial<Settings>) => {
    setError(''); setSaved('');
    const r = await attendanceApi<Settings>(restaurantId, '/settings', { method: 'PUT', body: patch });
    if (!r.ok) {
      setError(r.code === 'NO_NETWORK' ? t('settings.needNetwork', 'Register the store network first (button below), then turn this on.') : (r.message || t('errors.save', 'Could not save')));
      return;
    }
    setSettings(r.data); setSaved(t('settings.saved', 'Saved'));
    window.dispatchEvent(new Event('attendance:settings-saved')); // 위 «사용 순서» 안내의 «검사 켜짐/꺼짐» 도 바로 맞춘다
  };

  const registerCurrent = async () => {
    setError('');
    const r = await attendanceApi(restaurantId, '/networks/register-current', { method: 'POST', body: { label: label || null } });
    if (!r.ok) { setError(r.message || t('errors.save', 'Could not save')); return; }
    setLabel(''); load();
  };
  const toggleNetwork = async (n: NetworkRow) => {
    const r = await attendanceApi(restaurantId, `/networks/${n.id}`, { method: 'PATCH', body: { is_active: !n.is_active } });
    if (!r.ok) setError(r.message || t('errors.save', 'Could not save'));
    load();
  };
  const removeNetwork = async (n: NetworkRow) => {
    setRemoving(null);
    const r = await attendanceApi(restaurantId, `/networks/${n.id}`, { method: 'DELETE' });
    if (!r.ok) setError(r.message || t('errors.save', 'Could not save'));
    load();
  };

  if (!settings) return error ? <ErrorBox>{error}</ErrorBox> : <Muted>{t('common.loading', 'Loading…')}</Muted>;
  const currentRegistered = networks.some(n => n.is_current && n.is_active);
  const hasActiveNetwork = networks.some(n => n.is_active);

  return (
    <>
      {error && <ErrorBox>{error}</ErrorBox>}
      {saved && <InfoBox>{saved}</InfoBox>}

      <Card>
        <CardTitle>{t('settings.networkTitle', 'Store network check')}</CardTitle>
        <Muted style={{ marginBottom: 4 }}>
          {t('settings.networkIntro', 'Optional. Use it if staff should only clock in or out while they are at the store. It checks the store internet line, so mobile data or home Wi-Fi will not work.')}
        </Muted>

        <Steps>
          <Step attention={!hasActiveNetwork}>
            <Num done={hasActiveNetwork}>{hasActiveNetwork ? '✓' : '1'}</Num>
            <StepBody>
              <StepTitle>{t('settings.stepRegisterTitle', 'Register the store Wi-Fi')}</StepTitle>
              <Muted>{t('settings.stepRegisterHelp', 'Do this on a phone, tablet or computer that is connected to the store Wi-Fi right now (not mobile data).')}</Muted>
              <Muted style={{ marginTop: 6 }}>
                {t('settings.thisDevice', 'This device:')} <Mono>{current || '—'}</Mono>{' '}
                {currentRegistered
                  ? <Badge tone="green">{t('settings.registered', 'Registered')}</Badge>
                  : <Badge tone="amber">{t('settings.notRegistered', 'Not registered')}</Badge>}
              </Muted>
              {!currentRegistered && (
                <Row style={{ marginTop: 10 }}>
                  <TextInput placeholder={t('settings.labelPlaceholder', 'Name, e.g. Main Wi-Fi')} value={label} onChange={e => setLabel(e.target.value)} maxLength={60} style={{ minWidth: 200 }} />
                  <Button variant="primary" onClick={registerCurrent}>{t('settings.registerCurrent', 'Register the network I am on now')}</Button>
                </Row>
              )}
            </StepBody>
          </Step>

          <Step>
            <Num done={settings.network_restriction}>{settings.network_restriction ? '✓' : '2'}</Num>
            <StepBody>
              <StepTitle>{t('settings.stepTurnOnTitle', 'Turn on the check')}</StepTitle>
              <Toggle style={{ opacity: hasActiveNetwork || settings.network_restriction ? 1 : 0.55 }}>
                <input type="checkbox" checked={settings.network_restriction} disabled={!hasActiveNetwork && !settings.network_restriction} onChange={e => save({ network_restriction: e.target.checked })} />
                <span>{t('settings.networkRestriction', 'Only allow clocking on the store network')}</span>
              </Toggle>
              {!hasActiveNetwork && !settings.network_restriction && <Muted>{t('settings.turnOnNeedsStep1', 'Finish step 1 first.')}</Muted>}
            </StepBody>
          </Step>

          <Step>
            <Num>3</Num>
            <StepBody>
              <StepTitle>{t('settings.stepTryTitle', 'Check it works')}</StepTitle>
              <Muted>{t('settings.stepTryHelp', 'Open the Time Clock on the store tablet (or My Attendance on a staff phone). On the store Wi-Fi it shows «On the store Wi-Fi». On mobile data it shows «Not on the store Wi-Fi» and a manager must type their PIN to allow it.')}</Muted>
            </StepBody>
            <StepActions>
              <Button size="small" variant="secondary" onClick={() => window.open(`/restaurant/${restaurantId}/time-clock`, '_blank', 'noopener')}>{t('guide.openTimeClock', 'Open Time Clock')}</Button>
            </StepActions>
          </Step>
        </Steps>

        <div style={{ marginTop: 16 }}>
          <Toggle>
            <input type="checkbox" checked={settings.pin_override_registers_network} onChange={e => save({ pin_override_registers_network: e.target.checked })} />
            <span>
              {t('settings.overrideRegisters', 'When a manager confirms with PIN, remember that network')}
              <Muted as="span" style={{ display: 'block', fontWeight: 400 }}>{t('settings.overrideRegistersHelp', 'Handy if the store internet changes: after one manager PIN, staff on the new line can clock in normally.')}</Muted>
            </span>
          </Toggle>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong style={{ fontSize: 14 }}>{t('settings.networks', 'Store networks')}</strong>
          <Muted style={{ marginTop: 2 }}>{t('settings.sourceLegend', 'Added by — Manager: the register button · Manager PIN: remembered when a manager confirmed with PIN · Kiosk: follows the registered kiosk.')}</Muted>
          <DataTableContainer style={{ marginTop: 8 }}>
            {networks.length === 0 ? <DataTableEmpty>{t('settings.noNetworks', 'No store network registered yet.')}</DataTableEmpty> : (
              <DataTable>
                <DataTableHead>
                  <tr>
                    <DataTableHeaderCell align="left">{t('settings.name', 'Name')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="left">{t('settings.address', 'Address')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">{t('settings.source', 'Added by')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="left">{t('settings.lastUsed', 'Last used')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">{t('records.actions', 'Actions')}</DataTableHeaderCell>
                  </tr>
                </DataTableHead>
                <tbody>
                  {networks.map(n => (
                    <DataTableRow key={n.id}>
                      <DataTableCell>{n.label || '—'} {n.is_current && <Badge tone="purple">{t('settings.thisDeviceBadge', 'This device')}</Badge>} {!n.is_active && <Badge>{t('settings.paused', 'Paused')}</Badge>}</DataTableCell>
                      <DataTableCell><Mono>{n.ip}</Mono></DataTableCell>
                      <DataTableCell align="center"><Badge>{t(`settings.sourceKind.${n.source}`, n.source)}</Badge></DataTableCell>
                      <DataTableCell>{n.last_matched_at ? formatDateTime(n.last_matched_at, timeZone) : '—'}</DataTableCell>
                      <DataTableCell align="right">
                        <Row gap={6} style={{ justifyContent: 'flex-end' }}>
                          <Button size="small" variant="secondary" onClick={() => toggleNetwork(n)}>{n.is_active ? t('settings.pause', 'Pause') : t('settings.resume', 'Use again')}</Button>
                          <Button size="small" variant="danger-outline" onClick={() => setRemoving(n)}>{t('actions.remove', 'Remove')}</Button>
                        </Row>
                      </DataTableCell>
                    </DataTableRow>
                  ))}
                </tbody>
              </DataTable>
            )}
          </DataTableContainer>
        </div>
      </Card>

      <Card>
        <CardTitle>{t('settings.methodsTitle', 'How staff clock in')}</CardTitle>
        <Toggle>
          <input type="checkbox" checked={settings.allow_self_clock} onChange={e => save({ allow_self_clock: e.target.checked })} />
          <span>{t('settings.allowSelf', 'Staff can clock in from their own phone (My Attendance)')}</span>
        </Toggle>
        <Toggle>
          <input type="checkbox" checked={settings.allow_pos_pin_clock} onChange={e => save({ allow_pos_pin_clock: e.target.checked })} />
          <span>{t('settings.allowPin', 'Staff can clock in on the store tablet with their 4-digit PIN (Time Clock)')}</span>
        </Toggle>
      </Card>

      <LeaveTypesSection restaurantId={restaurantId} />
      <StaffWorkSection restaurantId={restaurantId} timeZone={timeZone} />

      <ConfirmModal
        isOpen={!!removing}
        title={t('settings.removeTitle', 'Remove network')}
        message={removing ? t('settings.removeConfirm', 'Remove {{ip}}? Staff on this network will not be able to clock in while the check is on.', { ip: removing.ip }) : ''}
        type="danger"
        confirmText={t('actions.remove', 'Remove')}
        cancelText={t('actions.keep', 'Keep')}
        onConfirm={() => { if (removing) removeNetwork(removing); }}
        onCancel={() => setRemoving(null)}
      />
    </>
  );
};

export default SettingsTab;
