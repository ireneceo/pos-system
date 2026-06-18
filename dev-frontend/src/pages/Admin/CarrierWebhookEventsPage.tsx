/**
 * Sprint 7 — Carrier Webhook Events Monitor (System Admin)
 *
 * 기능:
 *  - Webhook event 모니터 (필터: carrier, status, simulated, date range)
 *  - 실패 event retry
 *  - Test simulate (HMAC bypass)
 *  - Detail drawer (raw payload, 적용 PO 링크)
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  Container, Header, Title, Content,
  DataTableContainer, DataTable, DataTableHead, DataTableRow, DataTableCell,
  DataTableHeaderCell, DataTableEmpty,
  Modal, ModalButton, FormGroup, FormLabel, FormInput
} from '../../components/UI';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { getAuthToken } from '../../utils/auth';
import { formatDateTime } from '../../utils/timezone';

interface Carrier {
  id: number;
  code: string;
  name: string;
}

interface WebhookEvent {
  id: number;
  carrier_id: number;
  carrier_event_id: string | null;
  payload_hash: string;
  signature_valid: boolean;
  payload: any;
  raw_body: string;
  purchase_order_id: number | null;
  mapped_status: string | null;
  status: 'pending_apply' | 'applied' | 'ignored_duplicate' | 'ignored_regress' | 'failed';
  applied_at: string | null;
  error: string | null;
  retry_count: number;
  simulated: boolean;
  source_ip: string | null;
  received_at: string;
  carrier?: Carrier;
}

const Subtitle = styled.div`
  color: #4B5563;
  font-size: 14px;
  margin-top: 4px;
`;

const StatsRow = styled.div`
  display: flex;
  gap: 14px;
  margin-bottom: 18px;
  flex-wrap: wrap;
`;

const StatCard = styled.div`
  flex: 1;
  min-width: 140px;
  padding: 14px 18px;
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 12px;
  .label { font-size: 11px; color: #4B5563; text-transform: uppercase; font-weight: 600; letter-spacing: 0.4px; }
  .value { font-size: 24px; font-weight: 700; color: #0A2540; margin-top: 4px; }
`;

const FilterBar = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
  align-items: center;
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 13px;
  background: white;
  color: #0A2540;
  &:focus { outline: none; border-color: #635BFF; }
`;

const StatusBadge = styled.span<{ $status: WebhookEvent['status'] }>`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  background: ${p => {
    switch (p.$status) {
      case 'applied': return '#ECFDF5';
      case 'failed': return '#FEF2F2';
      case 'pending_apply': return '#FFFBEB';
      case 'ignored_duplicate':
      case 'ignored_regress':
        return '#F1F4F8';
      default: return '#F1F4F8';
    }
  }};
  color: ${p => {
    switch (p.$status) {
      case 'applied': return '#065F46';
      case 'failed': return '#991B1B';
      case 'pending_apply': return '#92400E';
      default: return '#4B5563';
    }
  }};
`;

const SimulatedBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  background: #FEF3C7;
  color: #92400E;
  border: 1px dashed #F59E0B;
  margin-left: 6px;
`;

const Code = styled.code`
  font-size: 12px;
  background: #F1F4F8;
  padding: 2px 6px;
  border-radius: 4px;
  color: #0A2540;
`;

const PreBox = styled.pre`
  background: #0F172A;
  color: #E2E8F0;
  padding: 16px;
  border-radius: 8px;
  font-size: 12px;
  font-family: 'Monaco', 'Menlo', monospace;
  max-height: 360px;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-all;
`;

const CarrierWebhookEventsPage: React.FC = () => {
  const { t } = useTranslation(['admin', 'common']);

  const [events, setEvents] = useState<WebhookEvent[]>([]);
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [filterCarrier, setFilterCarrier] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterSimulated, setFilterSimulated] = useState<string>('');

  const [selected, setSelected] = useState<WebhookEvent | null>(null);
  const [simOpen, setSimOpen] = useState(false);
  const [simCarrierCode, setSimCarrierCode] = useState<string>('');
  const [simPayload, setSimPayload] = useState<string>('{\n  "event": { "type": "DELIVERED", "id": "evt_test_1" },\n  "data": { "tracking_number": "LM-TEST-001" }\n}');
  const [simSubmitting, setSimSubmitting] = useState(false);
  const [simResult, setSimResult] = useState<any>(null);

  const headers = useMemo(() => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}`
  }), []);

  const loadCarriers = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/carriers', { headers });
      const data = await res.json();
      if (res.ok && data.success) setCarriers(data.data || []);
    } catch { /* silent */ }
  }, [headers]);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '50' });
      if (filterCarrier) params.set('carrier_id', filterCarrier);
      if (filterStatus) params.set('status', filterStatus);
      if (filterSimulated) params.set('simulated', filterSimulated);

      const res = await fetch(`/api/admin/carrier-webhook-events?${params}`, { headers });
      const data = await res.json();
      if (res.ok && data.success) {
        setEvents(data.data.events || []);
        setTotal(data.data.total || 0);
      }
    } catch (err) {
      console.error('Failed to load webhook events', err);
    } finally {
      setLoading(false);
    }
  }, [headers, filterCarrier, filterStatus, filterSimulated]);

  useEffect(() => { loadCarriers(); }, [loadCarriers]);
  useEffect(() => { loadEvents(); }, [loadEvents]);

  // Stats
  const stats = useMemo(() => {
    const last24h = events.filter(e => Date.now() - new Date(e.received_at).getTime() < 24 * 3600 * 1000);
    return {
      received: last24h.length,
      applied: last24h.filter(e => e.status === 'applied').length,
      failed: last24h.filter(e => e.status === 'failed').length,
      simulated: last24h.filter(e => e.simulated).length
    };
  }, [events]);

  const onRetry = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/carrier-webhook-events/${id}/retry`, {
        method: 'POST', headers
      });
      if (res.ok) {
        setTimeout(loadEvents, 800); // brief delay for async apply
      }
    } catch { /* silent */ }
  };

  const onSimulate = async () => {
    if (!simCarrierCode) return;
    setSimSubmitting(true);
    setSimResult(null);
    try {
      let payloadObj;
      try { payloadObj = JSON.parse(simPayload); }
      catch { setSimResult({ error: 'Invalid JSON' }); setSimSubmitting(false); return; }

      const res = await fetch(`/api/admin/carrier-webhooks/${simCarrierCode}/simulate`, {
        method: 'POST', headers,
        body: JSON.stringify({ payload: payloadObj })
      });
      const data = await res.json();
      setSimResult(data.success ? data.data : { error: data.message });
      if (data.success) loadEvents();
    } catch (err: any) {
      setSimResult({ error: err.message });
    } finally {
      setSimSubmitting(false);
    }
  };

  return (
    <Container>
      <Header>
        <Title>{t('admin:carrierWebhooks.title', 'Carrier Webhook Events')}</Title>
        <ThemedButton variant="primary" onClick={() => { setSimOpen(true); setSimResult(null); }}>
          {t('admin:carrierWebhooks.simulate', 'Send Simulate Event')}
        </ThemedButton>
      </Header>
      <Content>
        <div style={{ background: '#F1F5F9', border: '1px solid #64748B', borderRadius: 10, padding: '14px 18px', marginBottom: 20, fontSize: 13, color: '#334155', lineHeight: 1.6 }}>
          <div style={{ fontWeight: 600, color: '#0A2540', marginBottom: 6 }}>
            {t('admin:carrierWebhooks.helpTitle', 'What is this page?')}
          </div>
          <div>
            {t('admin:carrierWebhooks.helpDesc', 'These are events recorded automatically whenever an external carrier (Lalamove, GrabExpress, etc.) reports the delivery status of a PO (picked up, in transit, delivered, failed, etc.). Failed events can be reprocessed with the Retry button, and you can send a test event with "Send Simulate Event". The webhook URL and secret for each carrier are managed on the ')}
            <a href="/pos/admin/carriers" style={{ color: '#635BFF', fontWeight: 600 }}>Carriers</a>
            {t('admin:carrierWebhooks.helpDesc2', ' page.')}
          </div>
        </div>
        <StatsRow>
          <StatCard><div className="label">{t('admin:carrierWebhooks.stats.received24h', 'Last 24h received')}</div><div className="value">{stats.received}</div></StatCard>
          <StatCard><div className="label">{t('admin:carrierWebhooks.stats.applied', 'Applied')}</div><div className="value" style={{ color: '#15803D' }}>{stats.applied}</div></StatCard>
          <StatCard><div className="label">{t('admin:carrierWebhooks.stats.failed', 'Failed')}</div><div className="value" style={{ color: '#DC2626' }}>{stats.failed}</div></StatCard>
          <StatCard><div className="label">{t('admin:carrierWebhooks.stats.simulated', 'Simulated')}</div><div className="value" style={{ color: '#92400E' }}>{stats.simulated}</div></StatCard>
        </StatsRow>

        <FilterBar>
          <Select value={filterCarrier} onChange={(e) => setFilterCarrier(e.target.value)}>
            <option value="">{t('admin:carrierWebhooks.filter.allCarriers', 'All carriers')}</option>
            {carriers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>
          <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">{t('admin:carrierWebhooks.filter.allStatuses', 'All statuses')}</option>
            <option value="applied">{t('admin:carrierWebhooks.statusValues.applied', 'Applied')}</option>
            <option value="failed">{t('admin:carrierWebhooks.statusValues.failed', 'Failed')}</option>
            <option value="pending_apply">{t('admin:carrierWebhooks.statusValues.pending', 'Pending')}</option>
            <option value="ignored_duplicate">{t('admin:carrierWebhooks.statusValues.duplicate', 'Duplicate')}</option>
            <option value="ignored_regress">{t('admin:carrierWebhooks.statusValues.regress', 'Out-of-order')}</option>
          </Select>
          <Select value={filterSimulated} onChange={(e) => setFilterSimulated(e.target.value)}>
            <option value="">{t('admin:carrierWebhooks.filter.realAndSim', 'Real + Simulate')}</option>
            <option value="false">{t('admin:carrierWebhooks.filter.realOnly', 'Real only')}</option>
            <option value="true">{t('admin:carrierWebhooks.filter.simOnly', 'Simulate only')}</option>
          </Select>
          <span style={{ color: '#4B5563', fontSize: 13, marginLeft: 'auto' }}>
            {t('admin:carrierWebhooks.totalCount', { count: total, defaultValue: `Total: ${total}` })}
          </span>
        </FilterBar>

        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <DataTableRow>
                <DataTableHeaderCell>{t('admin:carrierWebhooks.col.received', 'Received')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('admin:carrierWebhooks.col.carrier', 'Carrier')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('admin:carrierWebhooks.col.mapped', 'Mapped status')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('admin:carrierWebhooks.col.po', 'PO')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('admin:carrierWebhooks.col.status', 'Status')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('admin:carrierWebhooks.col.error', 'Error / Note')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('common:actions', 'Actions')}</DataTableHeaderCell>
              </DataTableRow>
            </DataTableHead>
            <tbody>
              {events.length === 0 ? (
                <DataTableEmpty colSpan={7}>
                  {loading ? t('common:loading', 'Loading…') : t('admin:carrierWebhooks.empty', 'No events match the current filter.')}
                </DataTableEmpty>
              ) : events.map(ev => (
                <DataTableRow key={ev.id}>
                  <DataTableCell data-label="Received">
                    <div style={{ fontSize: 12, color: '#0A2540' }}>{formatDateTime(ev.received_at)}</div>
                  </DataTableCell>
                  <DataTableCell data-label="Carrier">
                    <strong>{ev.carrier?.name || '?'}</strong>
                    {ev.simulated && <SimulatedBadge>SIM</SimulatedBadge>}
                  </DataTableCell>
                  <DataTableCell data-label="Mapped">
                    {ev.mapped_status ? <Code>{ev.mapped_status}</Code> : <span style={{ color: '#6B7280' }}>—</span>}
                  </DataTableCell>
                  <DataTableCell data-label="PO">
                    {ev.purchase_order_id ? (
                      <a href={`/pos/admin/purchase-orders/${ev.purchase_order_id}`} style={{ color: '#635BFF', fontWeight: 600, fontSize: 13 }}>#{ev.purchase_order_id}</a>
                    ) : <span style={{ color: '#6B7280' }}>—</span>}
                  </DataTableCell>
                  <DataTableCell data-label="Status">
                    <StatusBadge $status={ev.status}>{ev.status}</StatusBadge>
                  </DataTableCell>
                  <DataTableCell data-label="Error">
                    <div style={{ fontSize: 12, color: ev.error ? '#991B1B' : '#4B5563', maxWidth: 280, wordBreak: 'break-word' }}>
                      {ev.error || (ev.signature_valid ? '' : t('admin:carrierWebhooks.invalidSig', 'invalid signature'))}
                    </div>
                  </DataTableCell>
                  <DataTableCell align="right">
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      {ev.status === 'failed' && (
                        <ThemedButton size="small" variant="outline" onClick={() => onRetry(ev.id)}>
                          {t('common:retry', 'Retry')}
                        </ThemedButton>
                      )}
                      <ThemedButton size="small" variant="ghost" onClick={() => setSelected(ev)}>
                        {t('common:view', 'View')}
                      </ThemedButton>
                    </div>
                  </DataTableCell>
                </DataTableRow>
              ))}
            </tbody>
          </DataTable>
        </DataTableContainer>
      </Content>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={`Event #${selected?.id || ''}`}
        size="large"
        footer={
          <ModalButton variant="secondary" onClick={() => setSelected(null)}>
            {t('common:close', 'Close')}
          </ModalButton>
        }
      >
        {selected && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div><strong style={{ fontSize: 12, color: '#4B5563' }}>Carrier:</strong> {selected.carrier?.name}</div>
              <div><strong style={{ fontSize: 12, color: '#4B5563' }}>Carrier event id:</strong> {selected.carrier_event_id || '—'}</div>
              <div><strong style={{ fontSize: 12, color: '#4B5563' }}>Received:</strong> {formatDateTime(selected.received_at)}</div>
              <div><strong style={{ fontSize: 12, color: '#4B5563' }}>Applied:</strong> {selected.applied_at ? formatDateTime(selected.applied_at) : '—'}</div>
              <div><strong style={{ fontSize: 12, color: '#4B5563' }}>Signature:</strong> <span style={{ color: selected.signature_valid ? '#15803D' : '#991B1B', fontWeight: 600 }}>{selected.signature_valid ? 'valid' : 'invalid'}</span></div>
              <div><strong style={{ fontSize: 12, color: '#4B5563' }}>Source IP:</strong> <Code>{selected.source_ip || '—'}</Code></div>
              <div><strong style={{ fontSize: 12, color: '#4B5563' }}>Status:</strong> <StatusBadge $status={selected.status}>{selected.status}</StatusBadge></div>
              <div><strong style={{ fontSize: 12, color: '#4B5563' }}>Retry count:</strong> {selected.retry_count}</div>
            </div>
            {selected.error && (
              <div style={{ padding: 10, background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 8, fontSize: 13, color: '#991B1B', marginBottom: 12 }}>
                <strong>Error:</strong> {selected.error}
              </div>
            )}
            <div style={{ fontSize: 11, color: '#4B5563', textTransform: 'uppercase', fontWeight: 600, letterSpacing: 0.4, marginBottom: 6 }}>Payload</div>
            <PreBox>{JSON.stringify(selected.payload, null, 2)}</PreBox>
          </div>
        )}
      </Modal>

      {/* Simulate Modal */}
      <Modal
        isOpen={simOpen}
        onClose={() => setSimOpen(false)}
        title={t('admin:carrierWebhooks.simulateTitle', 'Send Simulate Event') as string}
        size="medium"
        footer={
          <>
            <ModalButton variant="secondary" onClick={() => setSimOpen(false)} disabled={simSubmitting}>
              {t('common:cancel', 'Cancel')}
            </ModalButton>
            <ModalButton variant="primary" onClick={onSimulate} disabled={simSubmitting || !simCarrierCode}>
              {simSubmitting ? t('common:sending', 'Sending…') : t('admin:carrierWebhooks.send', 'Send')}
            </ModalButton>
          </>
        }
      >
        <FormGroup>
          <FormLabel>{t('admin:carrierWebhooks.simulateCarrier', 'Carrier')}</FormLabel>
          <Select value={simCarrierCode} onChange={(e) => setSimCarrierCode(e.target.value)}>
            <option value="">{t('common:select', 'Select…')}</option>
            {carriers.map(c => <option key={c.id} value={c.code}>{c.name} ({c.code})</option>)}
          </Select>
        </FormGroup>
        <FormGroup>
          <FormLabel>{t('admin:carrierWebhooks.simulatePayload', 'Payload (JSON)')}</FormLabel>
          <textarea
            value={simPayload}
            onChange={(e) => setSimPayload(e.target.value)}
            style={{ width: '100%', minHeight: 200, fontFamily: 'Monaco, monospace', fontSize: 12, padding: 12, border: '1px solid #6B7280', borderRadius: 8 }}
          />
        </FormGroup>
        {simResult && (
          <div style={{ marginTop: 12, padding: 12, background: simResult.error ? '#FEF2F2' : '#ECFDF5', border: `1px solid ${simResult.error ? '#FCA5A5' : '#A7F3D0'}`, borderRadius: 8, fontSize: 13 }}>
            {simResult.error ? (
              <span style={{ color: '#991B1B', fontWeight: 600 }}>{simResult.error}</span>
            ) : (
              <div style={{ color: '#065F46' }}>
                <strong>Event {simResult.event_id}</strong> — status: <strong>{simResult.status}</strong>
                {simResult.mapped_status && <> · mapped: <Code>{simResult.mapped_status}</Code></>}
                {simResult.purchase_order_id && <> · PO #{simResult.purchase_order_id}</>}
                {simResult.error && <div style={{ marginTop: 6, color: '#991B1B', fontWeight: 600 }}>{simResult.error}</div>}
              </div>
            )}
          </div>
        )}
      </Modal>
    </Container>
  );
};

export default CarrierWebhookEventsPage;
