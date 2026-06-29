import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/UI/Button';
import { getAuthToken } from '../../utils/auth';

/**
 * 입점몰 매출보고 API 연동 설정 (Mall Sales Reporting).
 * 예: thefire01 @ IOI Mall Damansara (Tangent/Synthesis SalesHourly).
 * 매장이 몰 측에 시간별 매출(하루 24레코드)을 매일 자동 업로드. 자격증명은 서버에 암호화 저장.
 * 데이터/로직 단일 진실: docs/MALL_SALES_API_INTEGRATION.md
 */

interface Integration {
  id?: number;
  restaurant_id?: number;
  provider?: string;
  mall_name?: string;
  mall_operator?: string;
  environment?: 'staging' | 'production';
  token_url?: string;
  sales_url?: string;
  machine_id?: string;
  user_id?: string;
  password_set?: boolean;
  gst_registered?: 'Y' | 'N';
  cadence?: 'daily';
  send_window_days?: number;
  enabled?: boolean;
  last_run_at?: string | null;
  last_status?: string | null;
  last_error?: string | null;
}

interface Props { restaurantId: number; timeZone?: string; }

const Card = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #C7CED6;
  box-sizing: border-box;
  max-width: 760px;
`;
const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`;
const Description = styled.p`
  color: #4B5563;
  font-size: 14px;
  margin: 0 0 20px;
  line-height: 1.5;
`;
const FormGroup = styled.div`
  margin-bottom: 18px;
  &:last-child { margin-bottom: 0; }
`;
const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #4B5563;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;
const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  background: white;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
  &::placeholder { color: #C7D2E0; }
`;
const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  background: white;
  cursor: pointer;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;
const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  background: #F9FAFB;
  margin-bottom: 18px;
`;
const ToggleLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`;
const Switch = styled.div<{ $on: boolean }>`
  width: 46px; height: 26px; border-radius: 13px; cursor: pointer;
  background: ${p => (p.$on ? '#635BFF' : '#C7CED6')};
  position: relative; transition: background 0.15s; flex-shrink: 0;
  &::after {
    content: ''; position: absolute; top: 3px; left: ${p => (p.$on ? '23px' : '3px')};
    width: 20px; height: 20px; border-radius: 50%; background: white; transition: left 0.15s;
  }
`;
const Actions = styled.div`
  display: flex; gap: 10px; flex-wrap: wrap; margin-top: 24px;
  border-top: 1px solid #ECEFF3; padding-top: 20px;
`;
const StatusBox = styled.div<{ $kind: 'ok' | 'err' | 'neutral' }>`
  margin-top: 18px; padding: 12px 14px; border-radius: 8px; font-size: 13px;
  background: ${p => (p.$kind === 'ok' ? '#ECFDF5' : p.$kind === 'err' ? '#FEF2F2' : '#F4F6F9')};
  color: ${p => (p.$kind === 'ok' ? '#065F46' : p.$kind === 'err' ? '#991B1B' : '#4B5563')};
  border: 1px solid ${p => (p.$kind === 'ok' ? '#A7F3D0' : p.$kind === 'err' ? '#FECACA' : '#E5E7EB')};
  white-space: pre-wrap; word-break: break-word;
`;
const Hint = styled.div`
  font-size: 12px; color: #8898AA; margin-top: 6px;
`;

const API = '/api/sales-integrations';

const MallSalesIntegrationSettings: React.FC<Props> = ({ restaurantId, timeZone }) => {
  const { t } = useTranslation(['settings', 'common']);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState<string | null>(null); // 'test' | 'send'
  const [form, setForm] = useState<Integration>({
    provider: 'tangent_synthesis', environment: 'staging', gst_registered: 'N',
    send_window_days: 7, enabled: false, cadence: 'daily'
  });
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<{ kind: 'ok' | 'err' | 'neutral'; msg: string } | null>(null);

  const authHeaders = useCallback(() => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAuthToken()}`
  }), []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}?restaurant_id=${restaurantId}`, { headers: authHeaders() });
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setForm({ ...json.data[0] });
      }
    } catch {
      // 빈 폼 유지
    } finally {
      setLoading(false);
    }
  }, [restaurantId, authHeaders]);

  useEffect(() => { load(); }, [load]);

  const set = (k: keyof Integration, v: any) => setForm(prev => ({ ...prev, [k]: v }));

  const save = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const body: any = {
        restaurant_id: restaurantId,
        provider: form.provider || 'tangent_synthesis',
        mall_name: form.mall_name || '',
        mall_operator: form.mall_operator || '',
        environment: form.environment || 'staging',
        token_url: form.token_url || '',
        sales_url: form.sales_url || '',
        machine_id: form.machine_id || '',
        user_id: form.user_id || '',
        gst_registered: form.gst_registered || 'N',
        send_window_days: Number(form.send_window_days) || 7,
        enabled: !!form.enabled
      };
      if (password) body.password = password;
      const method = form.id ? 'PUT' : 'POST';
      const url = form.id ? `${API}/${form.id}` : API;
      const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(body) });
      const json = await res.json();
      if (json.success) {
        setForm({ ...json.data });
        setPassword('');
        setStatus({ kind: 'ok', msg: t('settings:mallSales.saved', 'Settings saved.') });
      } else {
        setStatus({ kind: 'err', msg: json.message || 'Save failed' });
      }
    } catch (e: any) {
      setStatus({ kind: 'err', msg: e?.message || 'Save failed' });
    } finally {
      setSaving(false);
    }
  };

  const testConnection = async () => {
    if (!form.id) { setStatus({ kind: 'err', msg: t('settings:mallSales.saveFirst', 'Please save the settings first.') }); return; }
    setBusy('test'); setStatus(null);
    try {
      const res = await fetch(`${API}/${form.id}/test`, { method: 'POST', headers: authHeaders() });
      const json = await res.json();
      setStatus(json.success
        ? { kind: 'ok', msg: t('settings:mallSales.testOk', 'Connection successful — credentials accepted.') }
        : { kind: 'err', msg: json.message || 'Connection failed' });
    } catch (e: any) {
      setStatus({ kind: 'err', msg: e?.message || 'Connection failed' });
    } finally { setBusy(null); }
  };

  const sendNow = async () => {
    if (!form.id) { setStatus({ kind: 'err', msg: t('settings:mallSales.saveFirst', 'Please save the settings first.') }); return; }
    setBusy('send'); setStatus(null);
    try {
      const res = await fetch(`${API}/${form.id}/send-now`, { method: 'POST', headers: authHeaders() });
      const json = await res.json();
      if (json.success) {
        const d = json.data;
        const sentN = d.sent?.length || 0;
        const failN = d.failed?.length || 0;
        const lines = [
          t('settings:mallSales.sendResult', { defaultValue: 'Sent {{sent}} day(s), {{failed}} failed.', sent: sentN, failed: failN }),
          ...(d.failed || []).map((f: any) => `· ${f.date}: ${f.error}`)
        ];
        setStatus({ kind: failN > 0 ? 'err' : 'ok', msg: lines.join('\n') });
        await load();
      } else {
        setStatus({ kind: 'err', msg: json.message || 'Send failed' });
      }
    } catch (e: any) {
      setStatus({ kind: 'err', msg: e?.message || 'Send failed' });
    } finally { setBusy(null); }
  };

  if (loading) {
    return <Card><Description>{t('common:loading', 'Loading...')}</Description></Card>;
  }

  return (
    <Card>
      <CardTitle>{t('settings:mallSales.title', 'Mall Sales Reporting')}</CardTitle>
      <Description>
        {t('settings:mallSales.description',
          'Automatically upload hourly sales (24 records per day) to your shopping mall’s POS reporting system. Credentials are provided by the mall and stored securely (encrypted).')}
      </Description>

      <ToggleRow>
        <div>
          <ToggleLabel>{t('settings:mallSales.enabled', 'Enable daily sales reporting')}</ToggleLabel>
          <Hint>{t('settings:mallSales.enabledHint', 'When on, sales are uploaded automatically every day after close (last 7 days re-sent).')}</Hint>
        </div>
        <Switch $on={!!form.enabled} onClick={() => set('enabled', !form.enabled)} role="button" tabIndex={0} aria-label="toggle" />
      </ToggleRow>

      <Row>
        <FormGroup>
          <Label>{t('settings:mallSales.mallName', 'Mall name')}</Label>
          <Input value={form.mall_name || ''} onChange={e => set('mall_name', e.target.value)} placeholder="IOI Mall Damansara" />
        </FormGroup>
        <FormGroup>
          <Label>{t('settings:mallSales.mallOperator', 'Mall operator')}</Label>
          <Input value={form.mall_operator || ''} onChange={e => set('mall_operator', e.target.value)} placeholder="IOI" />
        </FormGroup>
      </Row>

      <Row>
        <FormGroup>
          <Label>{t('settings:mallSales.environment', 'Environment')}</Label>
          <Select value={form.environment || 'staging'} onChange={e => set('environment', e.target.value)}>
            <option value="staging">{t('settings:mallSales.envStaging', 'Staging (testing)')}</option>
            <option value="production">{t('settings:mallSales.envProduction', 'Production (live)')}</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>{t('settings:mallSales.gstRegistered', 'GST/SST registered')}</Label>
          <Select value={form.gst_registered || 'N'} onChange={e => set('gst_registered', e.target.value)}>
            <option value="N">{t('common:no', 'No')}</option>
            <option value="Y">{t('common:yes', 'Yes')}</option>
          </Select>
        </FormGroup>
      </Row>

      <Row>
        <FormGroup>
          <Label>{t('settings:mallSales.machineId', 'Machine ID')}</Label>
          <Input value={form.machine_id || ''} onChange={e => set('machine_id', e.target.value)} placeholder="50100025" />
          <Hint>{t('settings:mallSales.machineIdHint', 'Store/terminal identifier provided by the mall.')}</Hint>
        </FormGroup>
        <FormGroup>
          <Label>{t('settings:mallSales.userId', 'User ID')}</Label>
          <Input value={form.user_id || ''} onChange={e => set('user_id', e.target.value)} placeholder="" autoComplete="off" />
        </FormGroup>
      </Row>

      <FormGroup>
        <Label>{t('settings:mallSales.password', 'Password')}</Label>
        <Input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="new-password"
          placeholder={form.password_set ? '••••••••  ' + t('settings:mallSales.passwordSet', '(saved — leave blank to keep)') : ''}
        />
      </FormGroup>

      <Row>
        <FormGroup>
          <Label>{t('settings:mallSales.sendWindow', 'Re-send window (days)')}</Label>
          <Input type="number" min={1} max={31} value={form.send_window_days ?? 7}
            onChange={e => set('send_window_days', e.target.value)} />
          <Hint>{t('settings:mallSales.sendWindowHint', 'Each run also re-sends the last N days to catch corrections.')}</Hint>
        </FormGroup>
        <div />
      </Row>

      {form.environment === 'production' && (
        <Row>
          <FormGroup>
            <Label>{t('settings:mallSales.tokenUrl', 'Token URL (optional)')}</Label>
            <Input value={form.token_url || ''} onChange={e => set('token_url', e.target.value)} placeholder="https://…/token" />
          </FormGroup>
          <FormGroup>
            <Label>{t('settings:mallSales.salesUrl', 'Sales URL (optional)')}</Label>
            <Input value={form.sales_url || ''} onChange={e => set('sales_url', e.target.value)} placeholder="https://…/SalesHourly" />
          </FormGroup>
        </Row>
      )}

      {(form.last_run_at || form.last_status) && (
        <StatusBox $kind={form.last_status === 'success' ? 'ok' : form.last_status === 'error' ? 'err' : 'neutral'}>
          {t('settings:mallSales.lastRun', 'Last run')}: {form.last_run_at
            ? new Date(form.last_run_at).toLocaleString('en-GB', { timeZone: timeZone || 'Asia/Kuala_Lumpur' })
            : '—'} · {form.last_status || '—'}
          {form.last_error ? `\n${form.last_error}` : ''}
        </StatusBox>
      )}

      {status && <StatusBox $kind={status.kind}>{status.msg}</StatusBox>}

      <Actions>
        <Button variant="primary" onClick={save} disabled={saving}>
          {saving ? t('common:saving', 'Saving...') : t('common:save', 'Save')}
        </Button>
        <Button variant="outline" onClick={testConnection} disabled={!form.id || busy === 'test'}>
          {busy === 'test' ? t('settings:mallSales.testing', 'Testing...') : t('settings:mallSales.testConnection', 'Test connection')}
        </Button>
        <Button variant="secondary" onClick={sendNow} disabled={!form.id || busy === 'send'}>
          {busy === 'send' ? t('settings:mallSales.sending', 'Sending...') : t('settings:mallSales.sendNow', 'Send now')}
        </Button>
      </Actions>
    </Card>
  );
};

export default MallSalesIntegrationSettings;
