import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container, Header, Title, Content,
  DataTableContainer, DataTable, DataTableHead, DataTableRow, DataTableCell,
  DataTableHeaderCell, DataTableEmpty, DataTableStatus,
  Modal as CommonModal, ModalButton,
  FormGroup, FormLabel, FormTextArea, FormInput
} from '../../components/UI';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import DateField from '../../components/Common/DateField';
import { getAuthToken } from '../../utils/auth';
import { formatDate } from '../../utils/timezone';

type POStatus = 'draft' | 'submitted' | 'confirmed' | 'shipped' | 'partial_received' | 'received' | 'cancelled';

interface POItem {
  id: number;
  ingredient_id: number;
  ingredient_name: string;
  ingredient_unit?: string;
  seller_product_id?: number | null;
  seller_product_name?: string | null;
  quantity_ordered: number | string;
  quantity_received: number | string;
  unit_price: number | string;
  line_total?: number | string;
}

interface PODetail {
  id: number;
  po_number: string;
  status: POStatus;
  seller_type: string;
  seller_id: number;
  seller_name?: string;
  contract_id?: number | null;
  expected_delivery_date?: string | null;
  actual_delivery_date?: string | null;
  delivery_address?: string | null;
  notes?: string | null;
  subtotal?: number | string;
  tax_amount?: number | string;
  total_amount?: number | string;
  currency?: string;
  created_at?: string | null;
  submitted_at?: string | null;
  confirmed_at?: string | null;
  shipped_at?: string | null;
  received_at?: string | null;
  cancelled_at?: string | null;
  cancellation_reason?: string | null;
  tracking_number?: string | null;
  items: POItem[];
}

interface ReceiveLine {
  item_id: number;
  ingredient_name: string;
  ordered: number;
  alreadyReceived: number;
  remaining: number;
  unit?: string;
  quantity: number;
  batch_no: string;
  expiry_date: string;
  unit_cost: number;
}

const Subtitle = styled.div`
  color: #6B7280;
  font-size: 14px;
  margin-top: 4px;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Section = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;

  h3 {
    margin: 0 0 12px;
    font-size: 16px;
    color: #0A2540;
  }
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 13px;
`;

const TimelineItem = styled.div<{ active?: boolean; done?: boolean; cancelled?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  position: relative;
  padding-left: 4px;

  &::before {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: 4px;
    flex-shrink: 0;
    background: ${(p) => p.cancelled ? '#EF4444' : p.active ? '#635BFF' : p.done ? '#10B981' : '#E5E7EB'};
    box-shadow: ${(p) => p.active ? '0 0 0 4px rgba(99, 91, 255, 0.15)' : 'none'};
  }
`;

const TimelineContent = styled.div`
  flex: 1;

  strong {
    color: #0A2540;
    font-size: 14px;
  }
  div.meta {
    color: #6B7280;
    font-size: 12px;
    margin-top: 2px;
  }
`;

const KvGrid = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 8px 16px;
  font-size: 14px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const KvKey = styled.div`
  color: #6B7280;
  font-size: 13px;
`;

const KvValue = styled.div`
  color: #0A2540;
  word-break: break-word;
`;

const ErrorBox = styled.div`
  padding: 10px 14px;
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  color: #DC2626;
  font-size: 13px;
  margin-top: 12px;
`;

const ReceiveRow = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 80px 80px 100px 110px 100px 110px;
  gap: 8px;
  padding: 10px 0;
  align-items: center;
  border-bottom: 1px solid #F3F4F6;
  font-size: 13px;

  &.header {
    font-size: 11px;
    font-weight: 600;
    color: #6B7280;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    border-bottom: 1px dashed #E6EBF1;
    padding: 12px 0;
  }
`;

const TotalsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 16px;
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  max-width: 320px;
  margin-left: auto;
  margin-top: 12px;

  > div {
    display: flex;
    justify-content: space-between;
    color: #374151;
  }
  > div.total {
    border-top: 1px solid #E6EBF1;
    padding-top: 8px;
    margin-top: 4px;
    font-weight: 700;
    color: #0A2540;
    font-size: 16px;
  }
`;

const StatusVariantMap: Record<POStatus, 'success' | 'warning' | 'error' | 'info'> = {
  draft: 'info',
  submitted: 'warning',
  confirmed: 'warning',
  shipped: 'info',
  partial_received: 'warning',
  received: 'success',
  cancelled: 'error'
};

const STAGES: POStatus[] = ['draft', 'submitted', 'confirmed', 'shipped', 'received'];

const PurchaseOrderDetailPage: React.FC = () => {
  const { t } = useTranslation(['purchaseOrders', 'common']);
  const navigate = useNavigate();
  const { id: routeId } = useParams<{ id: string }>();
  const id = Number(routeId);

  const [detail, setDetail] = useState<PODetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [receiveOpen, setReceiveOpen] = useState(false);
  const [receiveLines, setReceiveLines] = useState<ReceiveLine[]>([]);
  const [receiveError, setReceiveError] = useState<string | null>(null);
  const [receiveSubmitting, setReceiveSubmitting] = useState(false);

  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [cancelSubmitting, setCancelSubmitting] = useState(false);

  const [shippedOpen, setShippedOpen] = useState(false);
  const [trackingNo, setTrackingNo] = useState('');
  const [shippedError, setShippedError] = useState<string | null>(null);
  const [shippedSubmitting, setShippedSubmitting] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const fetchDetail = useCallback(async () => {
    if (!Number.isFinite(id)) return;
    setLoading(true);
    setError(null);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/purchase-orders/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data?.message || (t('detail.loadFailed') as string));
        setDetail(null);
        return;
      }
      setDetail(data.data || null);
    } catch (err) {
      console.error('Failed to fetch PO detail:', err);
      setError(t('detail.loadFailed') as string);
    } finally {
      setLoading(false);
    }
  }, [id, t]);

  useEffect(() => { fetchDetail(); }, [fetchDetail]);

  const formatMoney = (amount: number | string | null | undefined) => {
    if (amount == null) return '-';
    const n = Number(amount);
    if (!Number.isFinite(n)) return '-';
    return `${detail?.currency || 'MYR'} ${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const subtotal = useMemo(() => {
    if (!detail) return 0;
    if (detail.subtotal != null) return Number(detail.subtotal);
    return detail.items.reduce((sum, it) => sum + Number(it.quantity_ordered) * Number(it.unit_price), 0);
  }, [detail]);
  const tax = useMemo(() => detail?.tax_amount != null ? Number(detail.tax_amount) : 0, [detail]);
  const total = useMemo(() => detail?.total_amount != null ? Number(detail.total_amount) : (subtotal + tax), [detail, subtotal, tax]);

  // Submit (draft → submitted)
  const handleSubmit = async () => {
    if (!detail || submitting) return;
    setSubmitting(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/purchase-orders/${detail.id}/submit`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data?.message || (t('new.errors.submitFailed') as string));
        return;
      }
      await fetchDetail();
    } catch (err) {
      console.error('Failed to submit PO:', err);
      setError(t('new.errors.submitFailed') as string);
    } finally {
      setSubmitting(false);
    }
  };

  // Mark Shipped
  const openShipped = () => {
    setShippedError(null);
    setTrackingNo('');
    setShippedOpen(true);
  };
  const handleMarkShipped = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!detail || shippedSubmitting) return;
    setShippedError(null);
    setShippedSubmitting(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/purchase-orders/${detail.id}/mark-shipped`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ tracking_number: trackingNo.trim() || null })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setShippedError(data?.message || (t('markShipped.submitFailed') as string));
        return;
      }
      setShippedOpen(false);
      await fetchDetail();
    } catch (err) {
      console.error('Failed to mark shipped:', err);
      setShippedError(t('markShipped.submitFailed') as string);
    } finally {
      setShippedSubmitting(false);
    }
  };

  // Receive
  const openReceive = () => {
    if (!detail) return;
    setReceiveError(null);
    setReceiveLines(detail.items.map(it => {
      const ordered = Number(it.quantity_ordered);
      const already = Number(it.quantity_received);
      return {
        item_id: it.id,
        ingredient_name: it.ingredient_name,
        ordered,
        alreadyReceived: already,
        remaining: Math.max(0, ordered - already),
        unit: it.ingredient_unit,
        quantity: 0,
        batch_no: '',
        expiry_date: '',
        unit_cost: Number(it.unit_price) || 0
      };
    }));
    setReceiveOpen(true);
  };

  const updateReceiveLine = (itemId: number, patch: Partial<ReceiveLine>) => {
    setReceiveLines(prev => prev.map(l => l.item_id === itemId ? { ...l, ...patch } : l));
  };

  const handleReceive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!detail || receiveSubmitting) return;
    setReceiveError(null);

    // Validate
    const linesToSend = receiveLines.filter(l => l.quantity > 0);
    if (linesToSend.length === 0) {
      setReceiveError(t('receive.noChanges') as string);
      return;
    }
    for (const l of linesToSend) {
      if (l.quantity > l.remaining) {
        setReceiveError(t('receive.exceedsRemaining') as string);
        return;
      }
    }

    setReceiveSubmitting(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/purchase-orders/${detail.id}/receive`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          lines: linesToSend.map(l => ({
            item_id: l.item_id,
            quantity_received: l.quantity,
            batch_no: l.batch_no.trim() || null,
            expiry_date: l.expiry_date || null,
            unit_cost: l.unit_cost
          }))
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setReceiveError(data?.message || (t('receive.submitFailed') as string));
        return;
      }
      setReceiveOpen(false);
      await fetchDetail();
    } catch (err) {
      console.error('Failed to receive PO:', err);
      setReceiveError(t('receive.submitFailed') as string);
    } finally {
      setReceiveSubmitting(false);
    }
  };

  // Cancel
  const openCancel = () => {
    setCancelReason('');
    setCancelError(null);
    setCancelOpen(true);
  };

  const handleCancel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!detail || cancelSubmitting) return;
    if (!cancelReason.trim()) {
      setCancelError(t('cancel.reasonRequired') as string);
      return;
    }
    setCancelError(null);
    setCancelSubmitting(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/purchase-orders/${detail.id}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ reason: cancelReason.trim() })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setCancelError(data?.message || (t('cancel.submitFailed') as string));
        return;
      }
      setCancelOpen(false);
      await fetchDetail();
    } catch (err) {
      console.error('Failed to cancel PO:', err);
      setCancelError(t('cancel.submitFailed') as string);
    } finally {
      setCancelSubmitting(false);
    }
  };

  const renderTimeline = () => {
    if (!detail) return null;
    const status = detail.status;
    const stageIndex = STAGES.indexOf(status === 'partial_received' ? 'shipped' : status);
    const isCancelled = status === 'cancelled';

    const stageMeta: Record<POStatus, string | null | undefined> = {
      draft: detail.created_at,
      submitted: detail.submitted_at,
      confirmed: detail.confirmed_at,
      shipped: detail.shipped_at,
      partial_received: detail.shipped_at,
      received: detail.received_at,
      cancelled: detail.cancelled_at
    };

    return (
      <Timeline>
        {STAGES.map((stage, idx) => {
          const active = !isCancelled && (stage === status || (stage === 'shipped' && status === 'partial_received'));
          const done = !isCancelled && idx < stageIndex;
          return (
            <TimelineItem key={stage} active={active} done={done}>
              <TimelineContent>
                <strong>{t(`detail.timeline.${stage}`)}</strong>
                {stageMeta[stage] && (
                  <div className="meta">{formatDate(stageMeta[stage]!)}</div>
                )}
              </TimelineContent>
            </TimelineItem>
          );
        })}
        {isCancelled && (
          <TimelineItem cancelled>
            <TimelineContent>
              <strong>{t('detail.timeline.cancelled')}</strong>
              {detail.cancelled_at && <div className="meta">{formatDate(detail.cancelled_at)}</div>}
              {detail.cancellation_reason && <div className="meta">{detail.cancellation_reason}</div>}
            </TimelineContent>
          </TimelineItem>
        )}
      </Timeline>
    );
  };

  const renderActions = () => {
    if (!detail) return null;
    const s = detail.status;
    return (
      <HeaderActions>
        {s === 'draft' && (
          <>
            <ThemedButton
              variant="primary"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? t('common.submitting') : t('detail.actions.submit')}
            </ThemedButton>
            <ThemedButton
              variant="outline"
              onClick={() => navigate(`/pos/purchase-orders/new?edit=${detail.id}`)}
            >
              {t('detail.actions.edit')}
            </ThemedButton>
            <ThemedButton variant="danger-outline" onClick={openCancel}>
              {t('detail.actions.cancel')}
            </ThemedButton>
          </>
        )}
        {s === 'confirmed' && (
          <>
            <ThemedButton variant="primary" onClick={openShipped}>
              {t('detail.actions.markShipped')}
            </ThemedButton>
            <ThemedButton variant="danger-outline" onClick={openCancel}>
              {t('detail.actions.cancel')}
            </ThemedButton>
          </>
        )}
        {(s === 'shipped' || s === 'partial_received') && (
          <ThemedButton variant="primary" onClick={openReceive}>
            {t('detail.actions.receive')}
          </ThemedButton>
        )}
        {(s === 'submitted') && (
          <ThemedButton variant="danger-outline" onClick={openCancel}>
            {t('detail.actions.cancel')}
          </ThemedButton>
        )}
      </HeaderActions>
    );
  };

  return (
    <Container>
      <Header>
        <div>
          <Title>
            {detail ? detail.po_number : (loading ? '...' : '')}
            {detail && (
              <span style={{ marginLeft: 12 }}>
                <DataTableStatus variant={StatusVariantMap[detail.status] || 'info'}>
                  {t(`status.${detail.status}`)}
                </DataTableStatus>
              </span>
            )}
          </Title>
          <Subtitle>{detail?.seller_name || ''}</Subtitle>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <ThemedButton variant="outline" onClick={() => navigate('/pos/purchase-orders')}>
            {t('detail.back')}
          </ThemedButton>
          {renderActions()}
        </div>
      </Header>

      <Content>
        {error && <ErrorBox>{error}</ErrorBox>}

        {loading && !detail ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#6B7280' }}>
            {t('list.loading')}
          </div>
        ) : !detail ? null : (
          <>
            <Section>
              <h3>{t('detail.timeline.title')}</h3>
              {renderTimeline()}
            </Section>

            <Section>
              <h3>{t('detail.section.items')}</h3>
              <DataTableContainer>
                <DataTable>
                  <DataTableHead>
                    <tr>
                      <DataTableHeaderCell align="left">{t('detail.items.ingredient')}</DataTableHeaderCell>
                      <DataTableHeaderCell align="right">{t('detail.items.qtyOrdered')}</DataTableHeaderCell>
                      <DataTableHeaderCell align="right">{t('detail.items.qtyReceived')}</DataTableHeaderCell>
                      <DataTableHeaderCell align="right">{t('detail.items.unitPrice')}</DataTableHeaderCell>
                      <DataTableHeaderCell align="right">{t('detail.items.lineTotal')}</DataTableHeaderCell>
                    </tr>
                  </DataTableHead>
                  <tbody>
                    {detail.items.length === 0 ? (
                      <tr><td colSpan={5}><DataTableEmpty>—</DataTableEmpty></td></tr>
                    ) : (
                      detail.items.map(it => {
                        const lineTotal = it.line_total != null
                          ? Number(it.line_total)
                          : Number(it.quantity_ordered) * Number(it.unit_price);
                        return (
                          <DataTableRow key={it.id}>
                            <DataTableCell data-label={t('detail.items.ingredient') as string}>
                              <strong>{it.ingredient_name}</strong>
                              {it.seller_product_name && (
                                <div style={{ fontSize: 12, color: '#6B7280' }}>{it.seller_product_name}</div>
                              )}
                            </DataTableCell>
                            <DataTableCell data-label={t('detail.items.qtyOrdered') as string} align="right">
                              {Number(it.quantity_ordered).toFixed(2)} {it.ingredient_unit || ''}
                            </DataTableCell>
                            <DataTableCell data-label={t('detail.items.qtyReceived') as string} align="right">
                              {Number(it.quantity_received).toFixed(2)} {it.ingredient_unit || ''}
                            </DataTableCell>
                            <DataTableCell data-label={t('detail.items.unitPrice') as string} align="right">
                              {formatMoney(it.unit_price)}
                            </DataTableCell>
                            <DataTableCell data-label={t('detail.items.lineTotal') as string} align="right">
                              {formatMoney(lineTotal)}
                            </DataTableCell>
                          </DataTableRow>
                        );
                      })
                    )}
                  </tbody>
                </DataTable>
              </DataTableContainer>

              <TotalsBox>
                <div>
                  <span>{t('detail.items.subtotal')}</span>
                  <span>{formatMoney(subtotal)}</span>
                </div>
                <div>
                  <span>{t('detail.items.tax')}</span>
                  <span>{formatMoney(tax)}</span>
                </div>
                <div className="total">
                  <span>{t('detail.items.total')}</span>
                  <span>{formatMoney(total)}</span>
                </div>
              </TotalsBox>
            </Section>

            <Section>
              <h3>{t('detail.section.delivery')}</h3>
              <KvGrid>
                <KvKey>{t('detail.delivery.expected')}</KvKey>
                <KvValue>{formatDate(detail.expected_delivery_date) || '-'}</KvValue>
                <KvKey>{t('detail.delivery.actual')}</KvKey>
                <KvValue>{formatDate(detail.actual_delivery_date) || '-'}</KvValue>
                <KvKey>{t('detail.delivery.address')}</KvKey>
                <KvValue>{detail.delivery_address || '-'}</KvValue>
              </KvGrid>
            </Section>

            <Section>
              <h3>{t('detail.section.notes')}</h3>
              <div style={{ fontSize: 14, color: '#374151', whiteSpace: 'pre-wrap' }}>
                {detail.notes || t('detail.noNotes')}
              </div>
            </Section>
          </>
        )}
      </Content>

      {/* Receive Modal */}
      <CommonModal
        isOpen={receiveOpen}
        onClose={() => !receiveSubmitting && setReceiveOpen(false)}
        title={t('receive.modalTitle') as string}
        size="large"
        footer={
          <>
            <ModalButton type="button" onClick={() => setReceiveOpen(false)} disabled={receiveSubmitting}>
              {t('common.cancel')}
            </ModalButton>
            <ModalButton
              type="submit"
              form="po-receive-form"
              variant="primary"
              disabled={receiveSubmitting}
            >
              {receiveSubmitting ? t('receive.submitting') : t('receive.submit')}
            </ModalButton>
          </>
        }
      >
        <form id="po-receive-form" onSubmit={handleReceive}>
          <p style={{ margin: '0 0 16px', color: '#6B7280', fontSize: 13 }}>{t('receive.subtitle')}</p>

          <ReceiveRow className="header">
            <div>{t('receive.ingredient')}</div>
            <div>{t('receive.ordered')}</div>
            <div>{t('receive.alreadyReceived')}</div>
            <div>{t('receive.receivingNow')}</div>
            <div>{t('receive.batchNo')}</div>
            <div>{t('receive.expiryDate')}</div>
            <div>{t('receive.unitCost')}</div>
          </ReceiveRow>

          {receiveLines.map(line => (
            <ReceiveRow key={line.item_id}>
              <div>
                <strong>{line.ingredient_name}</strong>
                {line.unit && <div style={{ fontSize: 11, color: '#6B7280' }}>{line.unit}</div>}
              </div>
              <div>{line.ordered.toFixed(2)}</div>
              <div>{line.alreadyReceived.toFixed(2)}</div>
              <div>
                <FormInput
                  type="number"
                  step="0.01"
                  min="0"
                  max={line.remaining}
                  value={line.quantity}
                  onChange={(e) => updateReceiveLine(line.item_id, { quantity: Number(e.target.value) })}
                />
              </div>
              <div>
                <FormInput
                  type="text"
                  value={line.batch_no}
                  onChange={(e) => updateReceiveLine(line.item_id, { batch_no: e.target.value })}
                />
              </div>
              <div>
                <DateField
                  value={line.expiry_date}
                  onChange={(v) => updateReceiveLine(line.item_id, { expiry_date: v })}
                />
              </div>
              <div>
                <FormInput
                  type="number"
                  step="0.01"
                  min="0"
                  value={line.unit_cost}
                  onChange={(e) => updateReceiveLine(line.item_id, { unit_cost: Number(e.target.value) })}
                />
              </div>
            </ReceiveRow>
          ))}

          {receiveError && <ErrorBox>{receiveError}</ErrorBox>}
        </form>
      </CommonModal>

      {/* Cancel Modal */}
      <CommonModal
        isOpen={cancelOpen}
        onClose={() => !cancelSubmitting && setCancelOpen(false)}
        title={t('cancel.modalTitle') as string}
        footer={
          <>
            <ModalButton type="button" onClick={() => setCancelOpen(false)} disabled={cancelSubmitting}>
              {t('common.close')}
            </ModalButton>
            <ModalButton
              type="submit"
              form="po-cancel-form"
              variant="danger"
              disabled={cancelSubmitting}
            >
              {cancelSubmitting ? t('common.submitting') : t('cancel.submit')}
            </ModalButton>
          </>
        }
      >
        <form id="po-cancel-form" onSubmit={handleCancel}>
          <div style={{
            padding: 12,
            background: '#FEF2F2',
            border: '1px solid #FCA5A5',
            borderRadius: 8,
            color: '#991B1B',
            fontSize: 13,
            marginBottom: 16
          }}>
            {t('cancel.warning')}
          </div>
          <FormGroup>
            <FormLabel>{t('cancel.reasonLabel')} *</FormLabel>
            <FormTextArea
              rows={4}
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder={t('cancel.reasonPlaceholder') as string}
              maxLength={500}
              required
            />
          </FormGroup>
          {cancelError && <ErrorBox>{cancelError}</ErrorBox>}
        </form>
      </CommonModal>

      {/* Mark Shipped Modal */}
      <CommonModal
        isOpen={shippedOpen}
        onClose={() => !shippedSubmitting && setShippedOpen(false)}
        title={t('markShipped.modalTitle') as string}
        footer={
          <>
            <ModalButton type="button" onClick={() => setShippedOpen(false)} disabled={shippedSubmitting}>
              {t('common.cancel')}
            </ModalButton>
            <ModalButton
              type="submit"
              form="po-shipped-form"
              variant="primary"
              disabled={shippedSubmitting}
            >
              {shippedSubmitting ? t('common.submitting') : t('markShipped.submit')}
            </ModalButton>
          </>
        }
      >
        <form id="po-shipped-form" onSubmit={handleMarkShipped}>
          <p style={{ margin: '0 0 16px', color: '#6B7280', fontSize: 13 }}>{t('markShipped.hint')}</p>
          <FormGroup>
            <FormLabel>{t('markShipped.trackingLabel')}</FormLabel>
            <FormInput
              type="text"
              value={trackingNo}
              onChange={(e) => setTrackingNo(e.target.value)}
              placeholder={t('markShipped.trackingPlaceholder') as string}
            />
          </FormGroup>
          {shippedError && <ErrorBox>{shippedError}</ErrorBox>}
        </form>
      </CommonModal>
    </Container>
  );
};

export default PurchaseOrderDetailPage;
