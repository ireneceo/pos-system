import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  Container, Header, Title, Content,
  StatsGrid, StatCard, StatValue, StatLabel,
  DataTableContainer, DataTable, DataTableHead, DataTableRow, DataTableCell,
  DataTableHeaderCell, DataTableActions, DataTableEmpty, DataTableStatus,
  Modal, ModalButton
} from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import DateField from '../../components/Common/DateField';
import { getAuthToken } from '../../utils/auth';
import { formatDate } from '../../utils/timezone';
import { useStore } from '../../contexts/StoreContext';
import AlertDialog from '../../components/Common/AlertDialog';

interface TradeInvoiceRow {
  id: number;
  invoice_number: string;
  buyer_name?: string | null;
  buyer_entity_type?: string | null;
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
  invoice_category?: string;
  parent_soa_invoice_id?: number | null;
}

// SoaGroup / SoaBundleRow removed in B1 재설계 (2026-04-30) —
// SOA is a real Invoice record (invoice_category='soa') in the main list with a purple badge.

const Subtitle = styled.div`
  color: #4B5563;
  font-size: 14px;
  margin-top: 4px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px dashed #F1F4F8;
  font-size: 14px;

  &:last-child { border-bottom: none; }

  span:first-child { color: #4B5563; }
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
  th { color: #4B5563; font-weight: 600; }
  td.right, th.right { text-align: right; }
`;

const StatusVariantMap: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
  draft: 'info',
  pending_payment: 'warning',
  payment_submitted: 'warning',
  paid: 'success',
  overdue: 'error',
  cancelled: 'error'
};

const SupplierTradeInvoicesPage: React.FC = () => {
  const { t } = useTranslation(['supplier', 'common']);
  useStore(); // currency context (timezone usage removed with SoaBundleRow)

  const [rows, setRows] = useState<TradeInvoiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [detailRow, setDetailRow] = useState<TradeInvoiceRow | null>(null);
  const [alertDlg, setAlertDlg] = useState<{ title: string; message: string } | null>(null);

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const params = new URLSearchParams();
      params.set('invoice_category', 'trade');
      params.set('issuer_type', 'supplier');
      params.set('issuer_id', 'mycompany');
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (fromDate) params.set('from', fromDate);
      if (toDate) params.set('to', toDate);
      const res = await fetch(`/api/invoices?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setRows([]);
        return;
      }
      const list = Array.isArray(data.data) ? data.data : (Array.isArray(data.invoices) ? data.invoices : []);
      setRows(list);
    } catch (err) {
      console.error('Failed to load trade invoices:', err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, fromDate, toDate]);

  // SOA derived view (`/api/supplier/soa/current`) removed in B1 재설계 — SOA invoices appear
  // inline in the regular list with `invoice_category='soa'` (purple badge) and follow standard
  // payment/cascade flow. Reminder action moved to per-SOA-row context menu (Detail modal).

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return rows.filter(r => {
      if (!term) return true;
      return (
        (r.buyer_name || '').toLowerCase().includes(term) ||
        (r.invoice_number || '').toLowerCase().includes(term)
      );
    });
  }, [rows, search]);

  const stats = useMemo(() => {
    let outstanding = 0, paidThisMonth = 0, overdue = 0, totalIssued = rows.length;
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    for (const r of rows) {
      const total = Number(r.total_amount) || 0;
      const paid = Number(r.paid_amount) || 0;
      const remaining = Math.max(0, total - paid);
      if (r.status === 'overdue') overdue += remaining;
      if (r.status !== 'paid' && r.status !== 'cancelled') outstanding += remaining;
      if (r.status === 'paid' && r.issued_at) {
        const ts = new Date(r.issued_at).getTime();
        if (ts >= monthStart) paidThisMonth += paid;
      }
    }
    return { outstanding, paidThisMonth, overdue, totalIssued };
  }, [rows]);

  const formatMoney = (amount: number | string | null | undefined, currency?: string) => {
    if (amount == null) return '-';
    const n = Number(amount);
    if (!Number.isFinite(n)) return '-';
    return `${currency || 'MYR'} ${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <Container>
      <Header>
        <div>
          <Title>{t('supplier:tradeInvoicesPage.title', 'Trade Invoices')}</Title>
        </div>
      </Header>

      <Content>
        <StatsGrid>
          <StatCard color="#F59E0B">
            <StatValue>{formatMoney(stats.outstanding)}</StatValue>
            <StatLabel>{t('supplier:tradeInvoicesPage.stats.outstanding')}</StatLabel>
          </StatCard>
          <StatCard color="#10B981">
            <StatValue>{formatMoney(stats.paidThisMonth)}</StatValue>
            <StatLabel>{t('supplier:tradeInvoicesPage.stats.paidThisMonth')}</StatLabel>
          </StatCard>
          <StatCard color="#DC2626">
            <StatValue>{formatMoney(stats.overdue)}</StatValue>
            <StatLabel>{t('supplier:tradeInvoicesPage.stats.overdue')}</StatLabel>
          </StatCard>
          <StatCard color="#635BFF">
            <StatValue>{stats.totalIssued}</StatValue>
            <StatLabel>{t('supplier:tradeInvoicesPage.stats.totalIssued')}</StatLabel>
          </StatCard>
        </StatsGrid>

        {/* SOA invoices appear in the regular DataTable below with a purple SOA badge (B1 재설계). */}

        <FilterBar>
          <SearchInput
            type="text"
            placeholder={t('supplier:tradeInvoicesPage.filter.searchBuyer') as string}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">{t('supplier:tradeInvoicesPage.filter.allStatuses')}</option>
            <option value="pending_payment">{t('supplier:status.pending_payment', 'Pending Payment')}</option>
            <option value="payment_submitted">{t('supplier:status.payment_submitted', 'Payment Submitted')}</option>
            <option value="paid">{t('supplier:status.paid', 'Paid')}</option>
            <option value="overdue">{t('supplier:status.overdue', 'Overdue')}</option>
            <option value="cancelled">{t('supplier:status.cancelled', 'Cancelled')}</option>
          </FilterSelect>
          <div style={{ minWidth: 150 }}>
            <DateField value={fromDate} onChange={setFromDate} />
          </div>
          <div style={{ minWidth: 150 }}>
            <DateField value={toDate} onChange={setToDate} />
          </div>
        </FilterBar>

        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">{t('supplier:tradeInvoicesPage.table.invoiceNumber')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('supplier:tradeInvoicesPage.table.buyer')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('supplier:tradeInvoicesPage.table.total')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('supplier:tradeInvoicesPage.table.status')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('supplier:tradeInvoicesPage.table.issuedAt')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('supplier:tradeInvoicesPage.table.dueDate')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right" isActions>{t('supplier:tradeInvoicesPage.table.actions')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {loading && filteredRows.length === 0 ? (
                <tr><td colSpan={7}><DataTableEmpty>...</DataTableEmpty></td></tr>
              ) : filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <DataTableEmpty>
                      <div style={{ color: '#4B5563' }}>{t('supplier:tradeInvoicesPage.empty')}</div>
                    </DataTableEmpty>
                  </td>
                </tr>
              ) : (
                filteredRows.map(row => (
                  <DataTableRow
                    key={row.id}
                    onClick={() => setDetailRow(row)}
                    style={{ cursor: 'pointer' }}
                  >
                    <DataTableCell>
                      {row.invoice_category === 'soa' && (
                        <span style={{
                          background: '#EEF2FF', color: '#635BFF',
                          fontSize: 10, fontWeight: 700, padding: '2px 6px',
                          borderRadius: 999, textTransform: 'uppercase', letterSpacing: 0.4,
                          marginRight: 6
                        }}>SOA</span>
                      )}
                      <strong>{row.invoice_number}</strong>
                      {row.parent_soa_invoice_id && (
                        <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>
                          {t('supplier:tradeInvoicesPage.bundledInSoa', 'Bundled in SOA')}
                        </div>
                      )}
                    </DataTableCell>
                    <DataTableCell>{row.buyer_name || '-'}</DataTableCell>
                    <DataTableCell align="right">{formatMoney(row.total_amount, row.currency)}</DataTableCell>
                    <DataTableCell align="center">
                      <DataTableStatus variant={StatusVariantMap[row.status] || 'info'}>
                        {t(`supplier:status.${row.status}`, row.status)}
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
                          {t('supplier:tradeInvoicesPage.view')}
                        </ThemedButton>
                      </DataTableActions>
                    </DataTableCell>
                  </DataTableRow>
                ))
              )}
            </tbody>
          </DataTable>
        </DataTableContainer>
      </Content>

      <Modal
        isOpen={!!detailRow}
        onClose={() => setDetailRow(null)}
        title={detailRow ? `${t('supplier:tradeInvoicesPage.table.invoiceNumber')} ${detailRow.invoice_number}` : ''}
        size="large"
        footer={<ModalButton onClick={() => setDetailRow(null)}>{t('common:close', 'Close')}</ModalButton>}
      >
        {detailRow && (
          <>
            <DetailRow>
              <span>{t('supplier:tradeInvoicesPage.table.buyer')}</span>
              <span>{detailRow.buyer_name || '-'}</span>
            </DetailRow>
            <DetailRow>
              <span>{t('supplier:tradeInvoicesPage.table.status')}</span>
              <span>{t(`supplier:status.${detailRow.status}`, detailRow.status)}</span>
            </DetailRow>
            <DetailRow>
              <span>{t('supplier:tradeInvoicesPage.table.issuedAt')}</span>
              <span>{formatDate(detailRow.issued_at) || '-'}</span>
            </DetailRow>
            <DetailRow>
              <span>{t('supplier:tradeInvoicesPage.table.dueDate')}</span>
              <span>{formatDate(detailRow.due_date) || '-'}</span>
            </DetailRow>

            {Array.isArray(detailRow.items) && detailRow.items.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <h4 style={{ marginBottom: 8, color: '#0A2540' }}>{t('supplier:menu.products', 'Items')}</h4>
                <ItemTable>
                  <thead>
                    <tr>
                      <th>{t('supplier:products.fields.name', 'Description')}</th>
                      <th className="right">{t('supplier:products.fields.baseQuantity', 'Qty')}</th>
                      <th className="right">{t('supplier:products.fields.unitPrice', 'Unit Price')}</th>
                      <th className="right">{t('supplier:tradeInvoicesPage.table.total', 'Total')}</th>
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
            )}

            <div style={{ marginTop: 12, padding: 12, background: '#F1F4F8', borderRadius: 8 }}>
              {detailRow.subtotal != null && (
                <DetailRow>
                  <span>Subtotal</span>
                  <span>{formatMoney(detailRow.subtotal, detailRow.currency)}</span>
                </DetailRow>
              )}
              {Number(detailRow.discount_amount) > 0 && (
                <DetailRow>
                  <span>Discount</span>
                  <span>-{formatMoney(detailRow.discount_amount, detailRow.currency)}</span>
                </DetailRow>
              )}
              {Number(detailRow.tax_amount) > 0 && (
                <DetailRow>
                  <span>Tax</span>
                  <span>{formatMoney(detailRow.tax_amount, detailRow.currency)}</span>
                </DetailRow>
              )}
              <DetailRow>
                <span><strong>Total</strong></span>
                <span><strong>{formatMoney(detailRow.total_amount, detailRow.currency)}</strong></span>
              </DetailRow>
              <DetailRow>
                <span>Paid</span>
                <span>{formatMoney(detailRow.paid_amount, detailRow.currency)}</span>
              </DetailRow>
            </div>

            {detailRow.notes && (
              <div style={{ marginTop: 12, padding: 12, background: '#FFFBEB', borderRadius: 8, fontSize: 13, color: '#1F2937' }}>
                {detailRow.notes}
              </div>
            )}
          </>
        )}
      </Modal>
      <AlertDialog
        isOpen={!!alertDlg}
        onClose={() => setAlertDlg(null)}
        title={alertDlg?.title || ''}
        message={alertDlg?.message || ''}
      />
    </Container>
  );
};

export default SupplierTradeInvoicesPage;
