import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  DataTableContainer,
  DataTable,
  DataTableHead,
  DataTableHeaderCell,
  DataTableRow,
  DataTableCell,
  DataTableEmpty,
  DataTableAmount,
  DataTableStatus,
  Modal as CommonModal,
  FormGroup,
  FormLabel,
  FormSelect
} from '../../components/UI';
import { getAuthToken } from '../../utils/auth';
import { formatDate, formatDateTime } from '../../utils/timezone';
import { formatCurrency } from '../../utils/currency';

// ----- Types -----

interface InvoiceItem {
  id: number | string;
  description: string;
  quantity: number | string;
  unit_price: number | string;
  total: number | string;
}

interface Invoice {
  id: number | string;
  invoice_number: string;
  status: string;
  currency?: string;
  total: number | string;
  amount?: number | string;
  tax?: number | string;
  issue_date?: string;
  due_date?: string;
  paid_date?: string | null;
  billing_period?: string;
  plan_type?: string;
  service_description?: string;
  custom_description?: string;
  items?: InvoiceItem[];
  createdAt?: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ----- Styled -----

const FiltersContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  padding: 10px 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  min-width: 160px;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const PaginationBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  font-size: 13px;
  color: #4B5563;
`;

const PageButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const PageBtn = styled.button<{ disabled?: boolean }>`
  padding: 6px 12px;
  border: 1px solid #C7CED6;
  background: white;
  border-radius: 6px;
  font-size: 13px;
  color: #1F2937;
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${p => (p.disabled ? 0.5 : 1)};
  &:hover:not(:disabled) {
    border-color: #635BFF;
    color: #635BFF;
  }
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const DetailRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DetailLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #4B5563;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

const DetailValue = styled.span`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`;

const ItemsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;

  th, td {
    padding: 10px 12px;
    border-bottom: 1px solid #C7CED6;
    font-size: 13px;
    text-align: left;
  }
  th {
    background: #F1F4F8;
    color: #4B5563;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-size: 11px;
  }
  td.right, th.right { text-align: right; }
  td.center, th.center { text-align: center; }
`;

const TotalsBlock = styled.div`
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #C7CED6;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const TotalRow = styled.div<{ highlight?: boolean }>`
  display: flex;
  justify-content: space-between;
  font-size: ${p => (p.highlight ? '16px' : '14px')};
  font-weight: ${p => (p.highlight ? '700' : '500')};
  color: ${p => (p.highlight ? '#0A2540' : '#1F2937')};
`;

// ----- Helpers -----

const STATUS_LABEL: Record<string, string> = {
  draft: 'Draft',
  sent: 'Sent',
  pending_payment: 'Pending Payment',
  pending: 'Pending',
  payment_submitted: 'Payment Submitted',
  paid: 'Paid',
  overdue: 'Overdue',
  cancelled: 'Cancelled'
};

const statusVariant = (status: string): 'success' | 'warning' | 'error' | 'info' | 'default' => {
  switch (status) {
    case 'paid':
      return 'success';
    case 'overdue':
    case 'cancelled':
      return 'error';
    case 'pending_payment':
    case 'pending':
    case 'payment_submitted':
      return 'warning';
    case 'sent':
      return 'info';
    default:
      return 'default';
  }
};

const num = (v: any): number => {
  const n = typeof v === 'string' ? parseFloat(v) : Number(v);
  return isNaN(n) ? 0 : n;
};

// ----- Component -----

const SupplierInvoicesPage: React.FC = () => {
  const { t } = useTranslation('supplier');

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0
  });
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  const [showDetail, setShowDetail] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const qs = new URLSearchParams();
      if (statusFilter) qs.set('status', statusFilter);
      qs.set('page', String(page));
      qs.set('limit', '20');

      const res = await fetch(`/api/supplier/invoices?${qs.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setInvoices(Array.isArray(json.data) ? json.data : []);
          if (json.pagination) setPagination(json.pagination);
        }
      }
    } catch (e) {
      // swallow — empty state will show
    } finally {
      setLoading(false);
    }
  }, [statusFilter, page]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const openDetail = async (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowDetail(true);
    // Fetch full detail for items
    setDetailLoading(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/supplier/invoices/${invoice.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setSelectedInvoice(json.data);
        }
      }
    } catch (e) {
      // keep summary row data
    } finally {
      setDetailLoading(false);
    }
  };

  const closeDetail = () => {
    setShowDetail(false);
    setSelectedInvoice(null);
  };

  const totalCount = pagination.total;
  const pendingCount = invoices.filter(
    i => i.status === 'pending_payment' || i.status === 'pending' || i.status === 'sent'
  ).length;
  const paidCount = invoices.filter(i => i.status === 'paid').length;
  const overdueCount = invoices.filter(i => i.status === 'overdue').length;

  return (
    <Container>
      <Header>
        <Title>{t('invoices.title', 'My Invoices')}</Title>
      </Header>
      <Content>
        <StatsGrid>
          <StatCard color="#635BFF">
            <StatValue>{totalCount}</StatValue>
            <StatLabel>Total Invoices</StatLabel>
          </StatCard>
          <StatCard color="#D97706">
            <StatValue>{pendingCount}</StatValue>
            <StatLabel>Pending</StatLabel>
          </StatCard>
          <StatCard color="#059669">
            <StatValue>{paidCount}</StatValue>
            <StatLabel>Paid</StatLabel>
          </StatCard>
          <StatCard color="#DC2626">
            <StatValue>{overdueCount}</StatValue>
            <StatLabel>Overdue</StatLabel>
          </StatCard>
        </StatsGrid>

        <FiltersContainer>
          <FilterSelect
            value={statusFilter}
            onChange={e => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Statuses</option>
            <option value="pending_payment">Pending Payment</option>
            <option value="payment_submitted">Payment Submitted</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
            <option value="cancelled">Cancelled</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
          </FilterSelect>
        </FiltersContainer>

        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">Invoice #</DataTableHeaderCell>
                <DataTableHeaderCell align="center">Issue Date</DataTableHeaderCell>
                <DataTableHeaderCell align="center">Period / Plan</DataTableHeaderCell>
                <DataTableHeaderCell align="right">Total</DataTableHeaderCell>
                <DataTableHeaderCell align="center">Status</DataTableHeaderCell>
                <DataTableHeaderCell align="center">Due Date</DataTableHeaderCell>
                <DataTableHeaderCell align="right">Actions</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {invoices.map(inv => (
                <DataTableRow key={inv.id} onClick={() => openDetail(inv)} style={{ cursor: 'pointer' }}>
                  <DataTableCell data-label="Invoice #">
                    <strong>{inv.invoice_number}</strong>
                  </DataTableCell>
                  <DataTableCell data-label="Issue Date" align="center">
                    {inv.issue_date ? formatDate(inv.issue_date, null) : '—'}
                  </DataTableCell>
                  <DataTableCell data-label="Period / Plan" align="center">
                    {inv.billing_period || inv.plan_type || inv.service_description || '—'}
                  </DataTableCell>
                  <DataTableCell data-label="Total" align="right">
                    <DataTableAmount highlight>
                      {formatCurrency(num(inv.total), inv.currency || 'MYR')}
                    </DataTableAmount>
                  </DataTableCell>
                  <DataTableCell data-label="Status" align="center">
                    <DataTableStatus variant={statusVariant(inv.status)}>
                      {STATUS_LABEL[inv.status] || inv.status}
                    </DataTableStatus>
                  </DataTableCell>
                  <DataTableCell data-label="Due Date" align="center">
                    {inv.due_date ? formatDate(inv.due_date, null) : '—'}
                  </DataTableCell>
                  <DataTableCell data-label="Actions" align="right" mobileFullWidth>
                    <Button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        openDetail(inv);
                      }}
                      style={{ padding: '8px 14px', fontSize: '13px' }}
                    >
                      View
                    </Button>
                  </DataTableCell>
                </DataTableRow>
              ))}
            </tbody>
          </DataTable>
          {invoices.length === 0 && (
            <DataTableEmpty>
              {loading
                ? 'Loading...'
                : t('invoices.noInvoices', 'No invoices yet. Your first invoice will appear after your trial begins.')}
            </DataTableEmpty>
          )}
        </DataTableContainer>

        {pagination.totalPages > 1 && (
          <PaginationBar>
            <span>
              Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
            </span>
            <PageButtons>
              <PageBtn
                disabled={page <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                Previous
              </PageBtn>
              <PageBtn
                disabled={page >= pagination.totalPages}
                onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
              >
                Next
              </PageBtn>
            </PageButtons>
          </PaginationBar>
        )}

        {showDetail && selectedInvoice && (
          <CommonModal
            isOpen={true}
            onClose={closeDetail}
            title={`Invoice ${selectedInvoice.invoice_number}`}
            size="large"
          >
            <DetailGrid>
              <DetailRow>
                <DetailLabel>Status</DetailLabel>
                <DetailValue>
                  <DataTableStatus variant={statusVariant(selectedInvoice.status)}>
                    {STATUS_LABEL[selectedInvoice.status] || selectedInvoice.status}
                  </DataTableStatus>
                </DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Issue Date</DetailLabel>
                <DetailValue>
                  {selectedInvoice.issue_date ? formatDate(selectedInvoice.issue_date, null) : '—'}
                </DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Due Date</DetailLabel>
                <DetailValue>
                  {selectedInvoice.due_date ? formatDate(selectedInvoice.due_date, null) : '—'}
                </DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Paid Date</DetailLabel>
                <DetailValue>
                  {selectedInvoice.paid_date ? formatDateTime(selectedInvoice.paid_date, null) : '—'}
                </DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Period</DetailLabel>
                <DetailValue>{selectedInvoice.billing_period || '—'}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Plan</DetailLabel>
                <DetailValue>{selectedInvoice.plan_type || '—'}</DetailValue>
              </DetailRow>
            </DetailGrid>

            {(selectedInvoice.service_description || selectedInvoice.custom_description) && (
              <DetailRow style={{ marginBottom: 16 }}>
                <DetailLabel>Description</DetailLabel>
                <DetailValue>
                  {selectedInvoice.service_description || selectedInvoice.custom_description}
                </DetailValue>
              </DetailRow>
            )}

            <DetailLabel style={{ marginBottom: 8, display: 'block' }}>Line Items</DetailLabel>
            {detailLoading && !selectedInvoice.items?.length ? (
              <div style={{ padding: 16, color: '#4B5563', fontSize: 13 }}>Loading items...</div>
            ) : selectedInvoice.items && selectedInvoice.items.length > 0 ? (
              <ItemsTable>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th className="right">Qty</th>
                    <th className="right">Unit Price</th>
                    <th className="right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.items.map(item => (
                    <tr key={item.id}>
                      <td>{item.description}</td>
                      <td className="right">{num(item.quantity)}</td>
                      <td className="right">
                        {formatCurrency(num(item.unit_price), selectedInvoice.currency || 'MYR')}
                      </td>
                      <td className="right">
                        {formatCurrency(num(item.total), selectedInvoice.currency || 'MYR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </ItemsTable>
            ) : (
              <div style={{ padding: 12, color: '#4B5563', fontSize: 13 }}>No line items.</div>
            )}

            <TotalsBlock>
              {selectedInvoice.amount !== undefined && (
                <TotalRow>
                  <span>Subtotal</span>
                  <span>{formatCurrency(num(selectedInvoice.amount), selectedInvoice.currency || 'MYR')}</span>
                </TotalRow>
              )}
              {selectedInvoice.tax !== undefined && num(selectedInvoice.tax) > 0 && (
                <TotalRow>
                  <span>Tax</span>
                  <span>{formatCurrency(num(selectedInvoice.tax), selectedInvoice.currency || 'MYR')}</span>
                </TotalRow>
              )}
              <TotalRow highlight>
                <span>Total</span>
                <span>{formatCurrency(num(selectedInvoice.total), selectedInvoice.currency || 'MYR')}</span>
              </TotalRow>
            </TotalsBlock>
          </CommonModal>
        )}
      </Content>
    </Container>
  );
};

export default SupplierInvoicesPage;
