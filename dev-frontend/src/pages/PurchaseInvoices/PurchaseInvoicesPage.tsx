import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  Container, Header, Title, Content,
  StatsGrid, StatCard, StatValue, StatLabel,
  DataTableContainer, DataTable, DataTableHead, DataTableRow, DataTableCell,
  DataTableHeaderCell, DataTableActions, DataTableEmpty, DataTableStatus,
  TabContainer, Tab,
  Modal, FormGroup, FormLabel, FormInput, FormTextArea, ModalButton
} from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import DateField from '../../components/Common/DateField';
import { getAuthToken } from '../../utils/auth';
import { formatDate } from '../../utils/timezone';

/**
 * Buyer-side Purchase Invoices.
 * Lists trade invoices issued TO the buyer by their suppliers/partners.
 * Includes a Monthly SOA tab that lets the buyer pay all open invoices for a
 * given supplier in one go (delegates to the existing payment endpoint).
 */

interface PurchaseInvoiceRow {
  id: number;
  invoice_number: string;
  issuer_name?: string | null;
  issuer_type?: string | null;
  issuer_id?: number | null;
  total_amount?: number | string | null;
  paid_amount?: number | string | null;
  currency?: string;
  status: string;
  issued_at?: string | null;
  due_date?: string | null;
  notes?: string | null;
  items?: Array<{
    id?: number;
    description?: string | null;
    quantity?: number | string | null;
    unit_price?: number | string | null;
    line_total?: number | string | null;
  }>;
  subtotal?: number | string | null;
  discount_amount?: number | string | null;
  tax_amount?: number | string | null;
}

interface SoaSupplierGroup {
  issuer_type: string;
  issuer_id: number;
  issuer_name: string;
  invoice_count: number;
  total_billed: number | string;
  total_paid: number | string;
  outstanding: number | string;
  currency?: string;
  invoice_ids?: number[];
}

type TabKey = 'all' | 'soa';

const Subtitle = styled.div`
  color: #6B7280;
  font-size: 14px;
  margin-top: 4px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px dashed #F3F4F6;
  font-size: 14px;

  &:last-child { border-bottom: none; }

  span:first-child { color: #6B7280; }
  span:last-child { color: #0A2540; font-weight: 600; }
`;

const ItemTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  margin-bottom: 12px;

  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #F1F5F9;
  }
  th { color: #6B7280; font-weight: 600; }
  td.right, th.right { text-align: right; }
`;

const SoaCard = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

const SoaInfo = styled.div`
  flex: 1;
  min-width: 0;

  h4 { margin: 0 0 6px; color: #0A2540; font-size: 15px; }
  p { margin: 0; color: #6B7280; font-size: 13px; }
`;

const SoaAmounts = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;

  .label { color: #6B7280; font-size: 12px; }
  .value { color: #0A2540; font-size: 15px; font-weight: 600; }
  .outstanding { color: #DC2626; }
`;

const StatusVariantMap: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
  draft: 'info',
  pending_payment: 'warning',
  payment_submitted: 'warning',
  paid: 'success',
  overdue: 'error',
  cancelled: 'error'
};

const PurchaseInvoicesPage: React.FC = () => {
  const { t } = useTranslation(['purchaseInvoices', 'common']);

  const [activeTab, setActiveTab] = useState<TabKey>('all');

  // All invoices
  const [rows, setRows] = useState<PurchaseInvoiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // SOA
  const [soaGroups, setSoaGroups] = useState<SoaSupplierGroup[]>([]);
  const [soaLoading, setSoaLoading] = useState(false);

  // Detail modal
  const [detailRow, setDetailRow] = useState<PurchaseInvoiceRow | null>(null);

  // Pay modal
  const [payRow, setPayRow] = useState<PurchaseInvoiceRow | null>(null);
  const [payAmount, setPayAmount] = useState('');
  const [payMethod, setPayMethod] = useState('bank_transfer');
  const [payTxId, setPayTxId] = useState('');
  const [payNotes, setPayNotes] = useState('');
  const [paySubmitting, setPaySubmitting] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (fromDate) params.set('from', fromDate);
      if (toDate) params.set('to', toDate);
      const res = await fetch(`/api/purchase-invoices?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setRows([]);
        return;
      }
      const list = Array.isArray(data.data) ? data.data
        : (Array.isArray(data.invoices) ? data.invoices : []);
      setRows(list);
    } catch (err) {
      console.error('Failed to load purchase invoices:', err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, fromDate, toDate]);

  const fetchSoa = useCallback(async () => {
    setSoaLoading(true);
    try {
      const token = getAuthToken();
      const res = await fetch('/api/purchase-invoices/soa/current', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setSoaGroups([]);
        return;
      }
      const list = Array.isArray(data.data) ? data.data
        : (Array.isArray(data.data?.groups) ? data.data.groups : []);
      setSoaGroups(list);
    } catch (err) {
      console.error('Failed to load SOA:', err);
      setSoaGroups([]);
    } finally {
      setSoaLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'all') fetchInvoices();
    else if (activeTab === 'soa') fetchSoa();
  }, [activeTab, fetchInvoices, fetchSoa]);

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter(r =>
      (r.issuer_name || '').toLowerCase().includes(term) ||
      (r.invoice_number || '').toLowerCase().includes(term)
    );
  }, [rows, search]);

  const stats = useMemo(() => {
    let outstanding = 0, paid = 0, overdue = 0, thisMonth = 0;
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    for (const r of rows) {
      const total = Number(r.total_amount) || 0;
      const paidAmt = Number(r.paid_amount) || 0;
      const remaining = Math.max(0, total - paidAmt);
      if (r.status !== 'paid' && r.status !== 'cancelled') outstanding += remaining;
      if (r.status === 'paid') paid += paidAmt;
      if (r.status === 'overdue') overdue += remaining;
      if (r.issued_at && new Date(r.issued_at).getTime() >= monthStart) thisMonth += 1;
    }
    return { outstanding, paid, overdue, thisMonth };
  }, [rows]);

  const formatMoney = (amount: number | string | null | undefined, currency?: string) => {
    if (amount == null) return '-';
    const n = Number(amount);
    if (!Number.isFinite(n)) return '-';
    return `${currency || 'MYR'} ${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const openPayModal = (row: PurchaseInvoiceRow) => {
    const total = Number(row.total_amount) || 0;
    const paid = Number(row.paid_amount) || 0;
    const remaining = Math.max(0, total - paid);
    setPayRow(row);
    setPayAmount(remaining.toFixed(2));
    setPayMethod('bank_transfer');
    setPayTxId('');
    setPayNotes('');
    setPayError(null);
  };

  const handleSubmitPayment = async () => {
    if (!payRow) return;
    const amount = parseFloat(payAmount);
    if (!Number.isFinite(amount) || amount <= 0) {
      setPayError('Invalid amount');
      return;
    }
    setPaySubmitting(true);
    setPayError(null);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/invoices/${payRow.id}/submit-payment`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payment_amount: amount,
          payment_method: payMethod,
          transaction_id: payTxId || null,
          payment_notes: payNotes || null
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setPayError(data.message || 'Failed to submit payment');
        return;
      }
      setPayRow(null);
      fetchInvoices();
    } catch (err) {
      console.error(err);
      setPayError('Network error');
    } finally {
      setPaySubmitting(false);
    }
  };

  const handlePayAll = async (group: SoaSupplierGroup) => {
    try {
      const token = getAuthToken();
      const res = await fetch('/api/purchase-invoices/soa/pay-all', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          issuer_type: group.issuer_type,
          issuer_id: group.issuer_id,
          invoice_ids: group.invoice_ids || []
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return;
      }
      fetchSoa();
    } catch (err) {
      console.error('Pay-all failed:', err);
    }
  };

  return (
    <Container>
      <Header>
        <div>
          <Title>{t('purchaseInvoices:list.title')}</Title>
          <Subtitle>{t('purchaseInvoices:list.subtitle')}</Subtitle>
        </div>
      </Header>

      <Content>
        <StatsGrid>
          <StatCard color="#F59E0B">
            <StatValue>{formatMoney(stats.outstanding)}</StatValue>
            <StatLabel>{t('purchaseInvoices:list.stats.outstanding')}</StatLabel>
          </StatCard>
          <StatCard color="#10B981">
            <StatValue>{formatMoney(stats.paid)}</StatValue>
            <StatLabel>{t('purchaseInvoices:list.stats.paid')}</StatLabel>
          </StatCard>
          <StatCard color="#DC2626">
            <StatValue>{formatMoney(stats.overdue)}</StatValue>
            <StatLabel>{t('purchaseInvoices:list.stats.overdue')}</StatLabel>
          </StatCard>
          <StatCard color="#635BFF">
            <StatValue>{stats.thisMonth}</StatValue>
            <StatLabel>{t('purchaseInvoices:list.stats.thisMonth')}</StatLabel>
          </StatCard>
        </StatsGrid>

        <TabContainer>
          <Tab type="button" active={activeTab === 'all'} onClick={() => setActiveTab('all')}>
            {t('purchaseInvoices:list.tabs.all')}
          </Tab>
          <Tab type="button" active={activeTab === 'soa'} onClick={() => setActiveTab('soa')}>
            {t('purchaseInvoices:list.tabs.soa')}
          </Tab>
        </TabContainer>

        {activeTab === 'all' && (
          <>
            <FilterBar>
              <SearchInput
                type="text"
                placeholder={t('purchaseInvoices:list.filter.searchIssuer') as string}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">{t('purchaseInvoices:list.filter.allStatuses')}</option>
                <option value="pending_payment">{t('purchaseInvoices:status.pending_payment')}</option>
                <option value="payment_submitted">{t('purchaseInvoices:status.payment_submitted')}</option>
                <option value="paid">{t('purchaseInvoices:status.paid')}</option>
                <option value="overdue">{t('purchaseInvoices:status.overdue')}</option>
                <option value="cancelled">{t('purchaseInvoices:status.cancelled')}</option>
              </FilterSelect>
              <div style={{ minWidth: 150 }}>
                <DateField value={fromDate} onChange={setFromDate} placeholder={t('purchaseInvoices:list.filter.from') as string} />
              </div>
              <div style={{ minWidth: 150 }}>
                <DateField value={toDate} onChange={setToDate} placeholder={t('purchaseInvoices:list.filter.to') as string} />
              </div>
            </FilterBar>

            <DataTableContainer>
              <DataTable>
                <DataTableHead>
                  <tr>
                    <DataTableHeaderCell align="left">{t('purchaseInvoices:list.table.invoiceNumber')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="left">{t('purchaseInvoices:list.table.issuer')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">{t('purchaseInvoices:list.table.total')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">{t('purchaseInvoices:list.table.status')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="left">{t('purchaseInvoices:list.table.issuedAt')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="left">{t('purchaseInvoices:list.table.dueDate')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right" isActions>{t('purchaseInvoices:list.table.actions')}</DataTableHeaderCell>
                  </tr>
                </DataTableHead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={7}><DataTableEmpty>{t('purchaseInvoices:list.loading')}</DataTableEmpty></td></tr>
                  ) : filteredRows.length === 0 ? (
                    <tr>
                      <td colSpan={7}>
                        <DataTableEmpty>
                          <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 600, color: '#374151' }}>
                            {t('purchaseInvoices:list.empty.title')}
                          </div>
                          <div style={{ color: '#6B7280', fontSize: 13 }}>
                            {t('purchaseInvoices:list.empty.hint')}
                          </div>
                        </DataTableEmpty>
                      </td>
                    </tr>
                  ) : (
                    filteredRows.map(row => {
                      const total = Number(row.total_amount) || 0;
                      const paid = Number(row.paid_amount) || 0;
                      const isPayable = (row.status === 'pending_payment' || row.status === 'overdue') && (total - paid) > 0.01;
                      return (
                        <DataTableRow
                          key={row.id}
                          onClick={() => setDetailRow(row)}
                          style={{ cursor: 'pointer' }}
                        >
                          <DataTableCell><strong>{row.invoice_number}</strong></DataTableCell>
                          <DataTableCell>{row.issuer_name || '-'}</DataTableCell>
                          <DataTableCell align="right">{formatMoney(row.total_amount, row.currency)}</DataTableCell>
                          <DataTableCell align="center">
                            <DataTableStatus variant={StatusVariantMap[row.status] || 'info'}>
                              {t(`purchaseInvoices:status.${row.status}`, row.status)}
                            </DataTableStatus>
                          </DataTableCell>
                          <DataTableCell>{formatDate(row.issued_at) || '-'}</DataTableCell>
                          <DataTableCell>{formatDate(row.due_date) || '-'}</DataTableCell>
                          <DataTableCell align="right" mobileFullWidth>
                            <DataTableActions>
                              <ThemedButton
                                size="small"
                                variant="outline"
                                onClick={(e) => { e.stopPropagation(); setDetailRow(row); }}
                              >
                                {t('purchaseInvoices:list.view')}
                              </ThemedButton>
                              {isPayable && (
                                <ThemedButton
                                  size="small"
                                  variant="primary"
                                  onClick={(e) => { e.stopPropagation(); openPayModal(row); }}
                                >
                                  {t('purchaseInvoices:list.pay')}
                                </ThemedButton>
                              )}
                            </DataTableActions>
                          </DataTableCell>
                        </DataTableRow>
                      );
                    })
                  )}
                </tbody>
              </DataTable>
            </DataTableContainer>
          </>
        )}

        {activeTab === 'soa' && (
          <div>
            <div style={{ marginBottom: 12 }}>
              <h3 style={{ margin: '0 0 4px', color: '#0A2540' }}>{t('purchaseInvoices:soa.title')}</h3>
              <p style={{ margin: 0, color: '#6B7280', fontSize: 13 }}>{t('purchaseInvoices:soa.subtitle')}</p>
            </div>
            {soaLoading ? (
              <DataTableEmpty>{t('purchaseInvoices:list.loading')}</DataTableEmpty>
            ) : soaGroups.length === 0 ? (
              <DataTableEmpty>
                <div style={{ color: '#6B7280' }}>{t('purchaseInvoices:soa.empty')}</div>
              </DataTableEmpty>
            ) : (
              soaGroups.map(g => (
                <SoaCard key={`${g.issuer_type}-${g.issuer_id}`}>
                  <SoaInfo>
                    <h4>{g.issuer_name}</h4>
                    <p>{t('purchaseInvoices:soa.invoiceCount')}: {g.invoice_count}</p>
                  </SoaInfo>
                  <SoaAmounts>
                    <div>
                      <div className="label">{t('purchaseInvoices:soa.totalBilled')}</div>
                      <div className="value">{formatMoney(g.total_billed, g.currency)}</div>
                    </div>
                    <div>
                      <div className="label">{t('purchaseInvoices:soa.totalPaid')}</div>
                      <div className="value">{formatMoney(g.total_paid, g.currency)}</div>
                    </div>
                    <div>
                      <div className="label">{t('purchaseInvoices:soa.outstanding')}</div>
                      <div className="value outstanding">{formatMoney(g.outstanding, g.currency)}</div>
                    </div>
                    {Number(g.outstanding) > 0 && (
                      <ThemedButton
                        size="medium"
                        variant="primary"
                        onClick={() => handlePayAll(g)}
                      >
                        {t('purchaseInvoices:soa.payAll')}
                      </ThemedButton>
                    )}
                  </SoaAmounts>
                </SoaCard>
              ))
            )}
          </div>
        )}
      </Content>

      {/* Detail Modal */}
      <Modal
        isOpen={!!detailRow}
        onClose={() => setDetailRow(null)}
        title={detailRow ? t('purchaseInvoices:detail.title', { number: detailRow.invoice_number }) : ''}
        size="large"
        footer={
          <>
            <ModalButton onClick={() => setDetailRow(null)}>{t('purchaseInvoices:detail.close')}</ModalButton>
            {detailRow && (detailRow.status === 'pending_payment' || detailRow.status === 'overdue') && (
              <ModalButton
                variant="primary"
                onClick={() => { const r = detailRow; setDetailRow(null); openPayModal(r); }}
              >
                {t('purchaseInvoices:detail.pay')}
              </ModalButton>
            )}
          </>
        }
      >
        {detailRow && (
          <>
            <DetailRow>
              <span>{t('purchaseInvoices:detail.issuedBy')}</span>
              <span>{detailRow.issuer_name || '-'}</span>
            </DetailRow>
            <DetailRow>
              <span>{t('purchaseInvoices:detail.status')}</span>
              <span>{t(`purchaseInvoices:status.${detailRow.status}`, detailRow.status)}</span>
            </DetailRow>
            <DetailRow>
              <span>{t('purchaseInvoices:detail.issuedAt')}</span>
              <span>{formatDate(detailRow.issued_at) || '-'}</span>
            </DetailRow>
            <DetailRow>
              <span>{t('purchaseInvoices:detail.dueDate')}</span>
              <span>{formatDate(detailRow.due_date) || '-'}</span>
            </DetailRow>

            {Array.isArray(detailRow.items) && detailRow.items.length > 0 ? (
              <div style={{ marginTop: 16 }}>
                <h4 style={{ marginBottom: 8, color: '#0A2540' }}>{t('purchaseInvoices:detail.items')}</h4>
                <ItemTable>
                  <thead>
                    <tr>
                      <th>{t('purchaseInvoices:detail.items')}</th>
                      <th className="right">Qty</th>
                      <th className="right">Unit</th>
                      <th className="right">{t('purchaseInvoices:detail.total')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailRow.items.map((it, idx) => (
                      <tr key={it.id ?? idx}>
                        <td>{it.description || '-'}</td>
                        <td className="right">{it.quantity ?? '-'}</td>
                        <td className="right">{formatMoney(it.unit_price, detailRow.currency)}</td>
                        <td className="right">{formatMoney(it.line_total, detailRow.currency)}</td>
                      </tr>
                    ))}
                  </tbody>
                </ItemTable>
              </div>
            ) : (
              <div style={{ color: '#6B7280', fontSize: 13, marginTop: 12 }}>
                {t('purchaseInvoices:detail.noItems')}
              </div>
            )}

            <div style={{ marginTop: 12, padding: 12, background: '#F8FAFC', borderRadius: 8 }}>
              {detailRow.subtotal != null && (
                <DetailRow>
                  <span>{t('purchaseInvoices:detail.subtotal')}</span>
                  <span>{formatMoney(detailRow.subtotal, detailRow.currency)}</span>
                </DetailRow>
              )}
              {Number(detailRow.discount_amount) > 0 && (
                <DetailRow>
                  <span>{t('purchaseInvoices:detail.discount')}</span>
                  <span>-{formatMoney(detailRow.discount_amount, detailRow.currency)}</span>
                </DetailRow>
              )}
              {Number(detailRow.tax_amount) > 0 && (
                <DetailRow>
                  <span>{t('purchaseInvoices:detail.tax')}</span>
                  <span>{formatMoney(detailRow.tax_amount, detailRow.currency)}</span>
                </DetailRow>
              )}
              <DetailRow>
                <span><strong>{t('purchaseInvoices:detail.total')}</strong></span>
                <span><strong>{formatMoney(detailRow.total_amount, detailRow.currency)}</strong></span>
              </DetailRow>
              <DetailRow>
                <span>{t('purchaseInvoices:detail.paid')}</span>
                <span>{formatMoney(detailRow.paid_amount, detailRow.currency)}</span>
              </DetailRow>
              <DetailRow>
                <span>{t('purchaseInvoices:detail.outstanding')}</span>
                <span>{formatMoney(Math.max(0, (Number(detailRow.total_amount) || 0) - (Number(detailRow.paid_amount) || 0)), detailRow.currency)}</span>
              </DetailRow>
            </div>

            {detailRow.notes && (
              <div style={{ marginTop: 12, padding: 12, background: '#FFFBEB', borderRadius: 8, fontSize: 13, color: '#374151' }}>
                <strong>{t('purchaseInvoices:detail.notes')}: </strong>{detailRow.notes}
              </div>
            )}
          </>
        )}
      </Modal>

      {/* Pay Modal */}
      <Modal
        isOpen={!!payRow}
        onClose={() => setPayRow(null)}
        title={payRow ? t('purchaseInvoices:detail.pay') + ' — ' + payRow.invoice_number : ''}
        size="medium"
        footer={
          <>
            <ModalButton onClick={() => setPayRow(null)} disabled={paySubmitting}>
              {t('common:cancel', 'Cancel')}
            </ModalButton>
            <ModalButton variant="primary" onClick={handleSubmitPayment} disabled={paySubmitting}>
              {t('purchaseInvoices:detail.pay')}
            </ModalButton>
          </>
        }
      >
        <FormGroup>
          <FormLabel>Amount *</FormLabel>
          <FormInput
            type="number"
            step="0.01"
            min="0"
            value={payAmount}
            onChange={(e) => setPayAmount(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Method *</FormLabel>
          <FilterSelect value={payMethod} onChange={(e) => setPayMethod(e.target.value)}>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="cash">Cash</option>
            <option value="cheque">Cheque</option>
            <option value="other">Other</option>
          </FilterSelect>
        </FormGroup>
        <FormGroup>
          <FormLabel>Transaction ID</FormLabel>
          <FormInput
            type="text"
            value={payTxId}
            onChange={(e) => setPayTxId(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>{t('purchaseInvoices:detail.notes')}</FormLabel>
          <FormTextArea
            rows={3}
            value={payNotes}
            onChange={(e) => setPayNotes(e.target.value)}
          />
        </FormGroup>
        {payError && (
          <div style={{ color: '#DC2626', fontSize: 13 }}>{payError}</div>
        )}
      </Modal>
    </Container>
  );
};

export default PurchaseInvoicesPage;
