/**
 * BrandTradeInvoicesPage — Brand General/Brand Manager view of trade invoices
 * issued by their brand to franchisee restaurants.
 *
 * Mirror of pages/Supplier/SupplierTradeInvoicesPage. Source endpoint:
 *   GET /api/brand/trade-invoices?status=&from=&to=
 *
 * SOA invoices (invoice_category='soa') appear in the same list with a purple
 * SOA badge — same as SupplierTradeInvoicesPage (B1 재설계 in supplier flow).
 */
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

const StatusVariantMap: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
  draft: 'info',
  pending_payment: 'warning',
  payment_submitted: 'warning',
  paid: 'success',
  overdue: 'error',
  cancelled: 'error'
};

interface Props {
  /** 'brand' | 'foodcourt' — same page shape, different source endpoint. */
  entityType?: 'brand' | 'foodcourt';
}

const BrandTradeInvoicesPage: React.FC<Props> = ({ entityType = 'brand' }) => {
  const { t } = useTranslation(['brand', 'supplier', 'common']);
  const endpoint = `/api/${entityType}/trade-invoices`;

  const [rows, setRows] = useState<TradeInvoiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [detailRow, setDetailRow] = useState<TradeInvoiceRow | null>(null);

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (fromDate) params.set('from', fromDate);
      if (toDate) params.set('to', toDate);
      const url = params.toString() ? `${endpoint}?${params.toString()}` : endpoint;
      const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setRows([]);
        return;
      }
      setRows(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error('Failed to load trade invoices:', err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [endpoint, statusFilter, fromDate, toDate]);

  useEffect(() => { fetchInvoices(); }, [fetchInvoices]);

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
    let outstanding = 0, paidThisMonth = 0, overdue = 0;
    const totalIssued = rows.length;
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

  const titleKey = entityType === 'foodcourt'
    ? t('brand:tradeInvoices.titleFc', 'Trade Invoices')
    : t('brand:tradeInvoices.title', 'Trade Invoices');

  return (
    <Container>
      <Header>
        <div>
          <Title>{titleKey}</Title>
        </div>
      </Header>

      <Content>
        <StatsGrid>
          <StatCard color="#F59E0B">
            <StatValue>{formatMoney(stats.outstanding)}</StatValue>
            <StatLabel>{t('brand:tradeInvoices.stats.outstanding', 'Outstanding')}</StatLabel>
          </StatCard>
          <StatCard color="#10B981">
            <StatValue>{formatMoney(stats.paidThisMonth)}</StatValue>
            <StatLabel>{t('brand:tradeInvoices.stats.paidThisMonth', 'Paid this month')}</StatLabel>
          </StatCard>
          <StatCard color="#DC2626">
            <StatValue>{formatMoney(stats.overdue)}</StatValue>
            <StatLabel>{t('brand:tradeInvoices.stats.overdue', 'Overdue')}</StatLabel>
          </StatCard>
          <StatCard color="#635BFF">
            <StatValue>{stats.totalIssued}</StatValue>
            <StatLabel>{t('brand:tradeInvoices.stats.totalIssued', 'Total issued')}</StatLabel>
          </StatCard>
        </StatsGrid>

        <FilterBar>
          <SearchInput
            type="text"
            placeholder={t('brand:tradeInvoices.searchPlaceholder', 'Search restaurant or invoice #') as string}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">{t('brand:tradeInvoices.allStatuses', 'All statuses')}</option>
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
                <DataTableHeaderCell align="left">{t('brand:tradeInvoices.col.invoiceNumber', 'Invoice #')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('brand:tradeInvoices.col.restaurant', 'Restaurant')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('brand:tradeInvoices.col.total', 'Total')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('brand:tradeInvoices.col.status', 'Status')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('brand:tradeInvoices.col.issuedAt', 'Issued')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('brand:tradeInvoices.col.dueDate', 'Due Date')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right" isActions>{t('brand:tradeInvoices.col.actions', 'Actions')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7}><DataTableEmpty>...</DataTableEmpty></td></tr>
              ) : filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <DataTableEmpty>
                      <div style={{ color: '#6B7280' }}>{t('brand:tradeInvoices.empty', 'No trade invoices yet')}</div>
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
                        <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
                          {t('brand:tradeInvoices.bundledInSoa', 'Bundled in SOA')}
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
                          {t('common:view', 'View')}
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
        title={detailRow ? `${t('brand:tradeInvoices.col.invoiceNumber', 'Invoice #')} ${detailRow.invoice_number}` : ''}
        size="large"
        footer={<ModalButton onClick={() => setDetailRow(null)}>{t('common:close', 'Close')}</ModalButton>}
      >
        {detailRow && (
          <>
            <DetailRow>
              <span>{t('brand:tradeInvoices.col.restaurant', 'Restaurant')}</span>
              <span>{detailRow.buyer_name || '-'}</span>
            </DetailRow>
            <DetailRow>
              <span>{t('brand:tradeInvoices.col.status', 'Status')}</span>
              <span>{t(`supplier:status.${detailRow.status}`, detailRow.status)}</span>
            </DetailRow>
            <DetailRow>
              <span>{t('brand:tradeInvoices.col.issuedAt', 'Issued')}</span>
              <span>{formatDate(detailRow.issued_at) || '-'}</span>
            </DetailRow>
            <DetailRow>
              <span>{t('brand:tradeInvoices.col.dueDate', 'Due Date')}</span>
              <span>{formatDate(detailRow.due_date) || '-'}</span>
            </DetailRow>

            {Array.isArray(detailRow.items) && detailRow.items.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <h4 style={{ marginBottom: 8, color: '#0A2540' }}>{t('brand:tradeInvoices.items', 'Items')}</h4>
                <ItemTable>
                  <thead>
                    <tr>
                      <th>{t('brand:tradeInvoices.itemDescription', 'Description')}</th>
                      <th className="right">{t('brand:tradeInvoices.itemQty', 'Qty')}</th>
                      <th className="right">{t('brand:tradeInvoices.itemUnit', 'Unit Price')}</th>
                      <th className="right">{t('brand:tradeInvoices.col.total', 'Total')}</th>
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

            <div style={{ marginTop: 12, padding: 12, background: '#F8FAFC', borderRadius: 8 }}>
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
              <div style={{ marginTop: 12, padding: 12, background: '#FFFBEB', borderRadius: 8, fontSize: 13, color: '#374151' }}>
                {detailRow.notes}
              </div>
            )}
          </>
        )}
      </Modal>
    </Container>
  );
};

export default BrandTradeInvoicesPage;
