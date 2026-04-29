import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  Container, Header, Title, Content,
  DataTableContainer, DataTable, DataTableHead, DataTableRow, DataTableCell,
  DataTableHeaderCell, DataTableActions, DataTableEmpty, DataTableStatus,
  Modal, ModalButton
} from '../../components/UI';
import { FilterBar, SearchInput } from '../../components/Common/FilterComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { getAuthToken } from '../../utils/auth';
import { formatDate } from '../../utils/timezone';

interface SoaRow {
  contract_id: number;
  buyer_name: string;
  buyer_entity_type?: string;
  buyer_entity_id?: number;
  month: string;
  invoice_count: number;
  total_billed: number | string;
  total_paid: number | string;
  outstanding: number | string;
  currency?: string;
}

interface SoaInvoice {
  id: number;
  invoice_number: string;
  total_amount?: number | string | null;
  paid_amount?: number | string | null;
  status: string;
  issued_at?: string | null;
  due_date?: string | null;
}

const Subtitle = styled.div`
  color: #6B7280;
  font-size: 14px;
  margin-top: 4px;
`;

const StatusVariantMap: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
  pending_payment: 'warning',
  payment_submitted: 'warning',
  paid: 'success',
  overdue: 'error',
  cancelled: 'error'
};

function currentMonthLabel(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

const SupplierSoaPage: React.FC = () => {
  const { t } = useTranslation(['supplier', 'common']);

  const [rows, setRows] = useState<SoaRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [month, setMonth] = useState(currentMonthLabel());

  const [detailRow, setDetailRow] = useState<SoaRow | null>(null);
  const [detailInvoices, setDetailInvoices] = useState<SoaInvoice[]>([]);
  const [detailLoading, setDetailLoading] = useState(false);

  const fetchSoa = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const params = new URLSearchParams();
      if (month) params.set('month', month);
      const res = await fetch(`/api/supplier/soa?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setRows([]);
        return;
      }
      const list = Array.isArray(data.data) ? data.data : [];
      setRows(list);
    } catch (err) {
      console.error('Failed to load SOA list:', err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [month]);

  useEffect(() => {
    fetchSoa();
  }, [fetchSoa]);

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter(r => (r.buyer_name || '').toLowerCase().includes(term));
  }, [rows, search]);

  const formatMoney = (amount: number | string | null | undefined, currency?: string) => {
    if (amount == null) return '-';
    const n = Number(amount);
    if (!Number.isFinite(n)) return '-';
    return `${currency || 'MYR'} ${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const openDetail = async (row: SoaRow) => {
    setDetailRow(row);
    setDetailInvoices([]);
    setDetailLoading(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/supplier/soa/${row.contract_id}/${encodeURIComponent(row.month)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setDetailInvoices([]);
        return;
      }
      const list = Array.isArray(data.data?.invoices) ? data.data.invoices
        : Array.isArray(data.data) ? data.data : [];
      setDetailInvoices(list);
    } catch (err) {
      console.error('Failed to load SOA detail:', err);
      setDetailInvoices([]);
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <div>
          <Title>{t('supplier:soaPage.title', 'Statement of Account (Monthly SOA)')}</Title>
        </div>
      </Header>

      <Content>
        <FilterBar>
          <SearchInput
            type="text"
            placeholder={t('supplier:soaPage.filter.searchBuyer') as string}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            style={{
              padding: '10px 12px',
              border: '1px solid #E6EBF1',
              borderRadius: 8,
              fontSize: 14,
              background: 'white',
              color: '#0A2540'
            }}
            aria-label={t('supplier:soaPage.filter.month') as string}
          />
        </FilterBar>

        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">{t('supplier:soaPage.table.buyer')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('supplier:soaPage.table.month')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('supplier:soaPage.table.invoiceCount')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('supplier:soaPage.table.totalBilled')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('supplier:soaPage.table.totalPaid')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('supplier:soaPage.table.outstanding')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right" isActions>{t('supplier:soaPage.table.actions')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7}><DataTableEmpty>...</DataTableEmpty></td></tr>
              ) : filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <DataTableEmpty>
                      <div style={{ color: '#6B7280' }}>{t('supplier:soaPage.empty')}</div>
                    </DataTableEmpty>
                  </td>
                </tr>
              ) : (
                filteredRows.map(row => (
                  <DataTableRow
                    key={`${row.contract_id}-${row.month}`}
                    onClick={() => openDetail(row)}
                    style={{ cursor: 'pointer' }}
                  >
                    <DataTableCell><strong>{row.buyer_name}</strong></DataTableCell>
                    <DataTableCell>{row.month}</DataTableCell>
                    <DataTableCell align="center">{row.invoice_count}</DataTableCell>
                    <DataTableCell align="right">{formatMoney(row.total_billed, row.currency)}</DataTableCell>
                    <DataTableCell align="right">{formatMoney(row.total_paid, row.currency)}</DataTableCell>
                    <DataTableCell align="right">
                      <strong style={{ color: Number(row.outstanding) > 0 ? '#DC2626' : '#10B981' }}>
                        {formatMoney(row.outstanding, row.currency)}
                      </strong>
                    </DataTableCell>
                    <DataTableCell align="right" mobileFullWidth>
                      <DataTableActions>
                        <ThemedButton
                          size="small"
                          variant="outline"
                          onClick={(e) => { e.stopPropagation(); openDetail(row); }}
                        >
                          {t('supplier:soaPage.view')}
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
        title={detailRow ? t('supplier:soaPage.detail.title', { buyer: detailRow.buyer_name, month: detailRow.month }) : ''}
        size="large"
        footer={<ModalButton onClick={() => setDetailRow(null)}>{t('supplier:soaPage.detail.close', 'Close')}</ModalButton>}
      >
        {detailLoading ? (
          <DataTableEmpty>...</DataTableEmpty>
        ) : detailInvoices.length === 0 ? (
          <DataTableEmpty>
            <div style={{ color: '#6B7280' }}>{t('supplier:soaPage.detail.noInvoices')}</div>
          </DataTableEmpty>
        ) : (
          <DataTableContainer>
            <DataTable>
              <DataTableHead>
                <tr>
                  <DataTableHeaderCell>{t('supplier:soaPage.detail.invoiceNumber')}</DataTableHeaderCell>
                  <DataTableHeaderCell>{t('supplier:soaPage.detail.issuedAt')}</DataTableHeaderCell>
                  <DataTableHeaderCell>{t('supplier:soaPage.detail.dueDate')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="right">{t('supplier:soaPage.detail.total')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="right">{t('supplier:soaPage.detail.paid')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="right">{t('supplier:soaPage.detail.outstanding')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="center">{t('supplier:soaPage.detail.status')}</DataTableHeaderCell>
                </tr>
              </DataTableHead>
              <tbody>
                {detailInvoices.map(inv => {
                  const total = Number(inv.total_amount) || 0;
                  const paid = Number(inv.paid_amount) || 0;
                  const remaining = Math.max(0, total - paid);
                  return (
                    <DataTableRow key={inv.id}>
                      <DataTableCell><strong>{inv.invoice_number}</strong></DataTableCell>
                      <DataTableCell>{formatDate(inv.issued_at) || '-'}</DataTableCell>
                      <DataTableCell>{formatDate(inv.due_date) || '-'}</DataTableCell>
                      <DataTableCell align="right">{formatMoney(total, detailRow?.currency)}</DataTableCell>
                      <DataTableCell align="right">{formatMoney(paid, detailRow?.currency)}</DataTableCell>
                      <DataTableCell align="right">{formatMoney(remaining, detailRow?.currency)}</DataTableCell>
                      <DataTableCell align="center">
                        <DataTableStatus variant={StatusVariantMap[inv.status] || 'info'}>
                          {t(`supplier:status.${inv.status}`, inv.status)}
                        </DataTableStatus>
                      </DataTableCell>
                    </DataTableRow>
                  );
                })}
              </tbody>
            </DataTable>
          </DataTableContainer>
        )}
      </Modal>
    </Container>
  );
};

export default SupplierSoaPage;
