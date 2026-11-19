import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Header, Title, ActionSection } from '../../components/UI/PageComponents';
import { StatsGrid, StatCard, StatValue, StatLabel, StatTrend } from '../../components/UI';
import { DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, DataTableEmpty } from '../../components/UI/DataTable';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import ConfirmModal from '../../components/ConfirmModal';
import { getAuthHeaders } from '../../utils/auth';
import { formatCurrency } from '../../utils/currency';
import { formatDate } from '../../utils/dateFormat';
import DateField from '../../components/Common/DateField';
import EmptyState from '../../components/Common/EmptyState';

const Container = styled.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`;


const Content = styled.div`
  padding: 32px;
  background: #F9FAFB;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;


const Subtitle = styled.p`
  font-size: 16px;
  color: #4B5563;
  margin: 8px 0 0;
`;


const ActionBar = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #C7CED6;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchInput = styled.input`
  padding: 10px 16px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  min-width: 300px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 768px) {
    min-width: auto;
    width: 100%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;


const TableContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #C7CED6;
  overflow-x: auto;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${props => {
    switch (props.status) {
      case 'paid':
        return 'background: #DCFCE7; color: #166534;';
      case 'pending':
        return 'background: #FEF3C7; color: #92400E;';
      case 'overdue':
        return 'background: #FEE2E2; color: #991B1B;';
      default:
        return 'background: #F1F4F8; color: #1F2937;';
    }
  }}
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const SmallButton = styled.button<{ variant: 'primary' | 'secondary' | 'danger' }>`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: #EBF8FF;
          border-color: #2563EB;
          color: #2563EB;
          &:hover { background: #DBEAFE; }
        `;
      case 'danger':
        return `
          background: #FEF2F2;
          border-color: #DC2626;
          color: #DC2626;
          &:hover { background: #FECACA; }
        `;
      default:
        return `
          background: #F1F4F8;
          border-color: #6B7280;
          color: #1F2937;
          &:hover { background: #C7CED6; }
        `;
    }
  }}
`;

interface RentData {
  contractId: number;
  storeName: string;
  restaurantId: number | null;
  unit: string | null;
  unitSize: string | null;
  rentAmount: number;        // 기본 임대료
  maintenanceFee: number;    // 관리비
  totalMonthly: number;      // 청구 금액 = 기본 + 관리비
  currency: string;
  dueDate: string | null;
  status: 'paid' | 'pending' | 'overdue';
  daysOverdue: number;
  lastInvoice: { id: number; number: string; amount: number; status: string } | null;
  contractEndDate: string | null;
  phone: string | null;
}

interface Stats {
  totalStores: number;
  paidStores: number;
  pendingStores: number;
  overdueStores: number;
  totalRevenue: number;
}

const RentManagement: React.FC = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [rentData, setRentData] = useState<RentData[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalStores: 0,
    paidStores: 0,
    pendingStores: 0,
    overdueStores: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [currency, setCurrency] = useState('MYR');
  const [infoModal, setInfoModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });

  // 임대 현황 = 계약의 임대 조건 + 그 달의 임대료 인보이스. 화면이 자체 데이터를 들고 있지 않다.
  // 임대 조건의 단일 소스는 계약이다 (docs/TENANT_RENT_BILLING.md).
  const loadRent = useCallback(async () => {
    setLoading(true);
    try {
      const [tRes, sRes] = await Promise.all([
        fetch('/api/rent/tenants', { headers: getAuthHeaders() }),
        fetch('/api/rent/summary', { headers: getAuthHeaders() }),
      ]);
      if (!tRes.ok || !sRes.ok) throw new Error('Failed to load rent data');
      const tJson = await tRes.json();
      const sJson = await sRes.json();

      setRentData(tJson.data || []);
      const d = sJson.data || {};
      setStats({
        totalStores: d.totalTenants || 0,
        paidStores: d.paid || 0,
        pendingStores: d.pending || 0,
        overdueStores: d.overdue || 0,
        totalRevenue: d.monthlyRentTotal || 0,
      });
      setCurrency(d.currency || 'MYR');
    } catch (err) {
      console.error('Error fetching rent data:', err);
      setRentData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRent();
  }, [loadRent]);

  // 이번 달 임대료 청구서 발행 (서버가 멱등 처리 — 이미 발행된 계약은 건너뛴다)
  const handleGenerateInvoices = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/rent/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({}),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setInfoModal({ open: true, title: t('common:rentManagement.issueFailedTitle'), message: json.message || t('common:rentManagement.issueFailed') });
        return;
      }
      await loadRent();
    } catch (err) {
      console.error('Error generating rent invoices:', err);
      setInfoModal({ open: true, title: t('common:rentManagement.issueFailedTitle'), message: t('common:rentManagement.issueFailed') });
    } finally {
      setGenerating(false);
    }
  };


  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return t('common:rentManagement.paid');
      case 'pending': return t('common:rentManagement.pending');
      case 'overdue': return t('common:rentManagement.overdue');
      default: return status;
    }
  };

  const filteredData = rentData.filter(item => {
    const q = searchTerm.toLowerCase();
    return (item.storeName || '').toLowerCase().includes(q) || (item.unit || '').toLowerCase().includes(q);
  });
  return (
    <>
      <Container>
        <Header>
          <div>
            <Title>{t('common:rentManagement.rentManagement')}</Title>
            <Subtitle>{t('common:rentManagement.foodcourtTenantRentStatusAndPaymentManagement')}</Subtitle>
          </div>
          <ActionSection>
            <ThemedButton variant="outline" onClick={() => navigate('/pos/foodcourt/tenancy')}>
              {t('common:rentManagement.manageContracts')}
            </ThemedButton>
            <ThemedButton variant="primary" onClick={handleGenerateInvoices} disabled={generating}>
              {generating ? t('common:rentManagement.issuing') : t('common:rentManagement.issueThisMonth')}
            </ThemedButton>
          </ActionSection>
        </Header>

        <Content>
          <StatsGrid>
            <StatCard>
              <StatValue>{stats.totalStores}</StatValue>
              <StatLabel>{t('common:rentManagement.totalTenants')}</StatLabel>
              <StatTrend trend="up">{t('common:rentManagement.allActiveSpaces')}</StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{stats.paidStores}</StatValue>
              <StatLabel>{t('common:rentManagement.paid')}</StatLabel>
              <StatTrend trend="up">
                {stats.totalStores > 0 ? t('common:rentManagement.paymentRate', { pct: Math.round((stats.paidStores / stats.totalStores) * 100) }) : t('common:rentManagement.noTenants')}
              </StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{stats.pendingStores}</StatValue>
              <StatLabel>{t('common:rentManagement.pending')}</StatLabel>
              <StatTrend trend="down">{t('common:rentManagement.awaitingPayment')}</StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{stats.overdueStores}</StatValue>
              <StatLabel>{t('common:rentManagement.overdue')}</StatLabel>
              <StatTrend trend={stats.overdueStores > 0 ? "down" : "up"}>{t('common:rentManagement.requiresAttention')}</StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{formatCurrency(stats.totalRevenue, currency)}</StatValue>
              <StatLabel>{t('common:rentManagement.monthlyRentTotal')}</StatLabel>
              <StatTrend trend="up">{'Base rent + maintenance'}</StatTrend>
            </StatCard>
          </StatsGrid>

          <ActionBar>
            <SearchInput
              type="text"
              placeholder={t('common:rentManagement.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ButtonGroup>
              <ThemedButton variant="outline" onClick={loadRent} disabled={loading}>
                {loading ? t('common:rentManagement.loading') : t('common:rentManagement.refresh')}
              </ThemedButton>
            </ButtonGroup>
          </ActionBar>

          <TableContainer>
            {filteredData.length === 0 ? (
              rentData.length === 0 ? (
                <EmptyState
                  title={t('common:rentManagement.emptyTitle')}
                  description={t('common:rentManagement.emptyDesc')}
                  primaryAction={{ label: t('common:rentManagement.manageTenants'), onClick: () => navigate('/pos/foodcourt/tenancy') }}
                  secondaryAction={{ label: t('common:rentManagement.openFloorPlan'), onClick: () => navigate('/pos/foodcourt/floor-plan') }}
                />
              ) : (
                <DataTableEmpty>{t('common:rentManagement.noMatch')}</DataTableEmpty>
              )
            ) : (
              <DataTable>
                <DataTableHead>
                  <tr>
                    <DataTableHeaderCell align="left">{t('common:tableCol.tenant')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="left">{t('common:tableCol.unit')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="left">{t('common:rentManagement.contact')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">{t('common:rentManagement.monthlyRent')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">{t('common:rentManagement.dueDate')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">{t('common:rentManagement.status')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">{t('common:tableCol.invoice')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">{t('common:rentManagement.contractEnd')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">{t('common:rentManagement.actions')}</DataTableHeaderCell>
                  </tr>
                </DataTableHead>
                <tbody>
                  {filteredData.map((item) => (
                    <DataTableRow key={item.contractId}>
                      <DataTableCell data-label={t('common:tableCol.tenant')}>
                        <strong>{item.storeName}</strong>
                      </DataTableCell>
                      <DataTableCell data-label={t('common:tableCol.unit')}>
                        {item.unit || '-'}{item.unitSize ? ` (${item.unitSize})` : ''}
                      </DataTableCell>
                      <DataTableCell data-label={t('common:rentManagement.contact')}>{item.phone || '-'}</DataTableCell>
                      <DataTableCell data-label={t('common:rentManagement.monthlyRent')} align="right">
                        <strong>{formatCurrency(item.totalMonthly, item.currency || currency)}</strong>
                        {item.maintenanceFee > 0 && (
                          <div style={{ fontSize: '11px', color: '#4B5563' }}>
                            {`incl. maintenance ${formatCurrency(item.maintenanceFee, item.currency || currency)}`}
                          </div>
                        )}
                      </DataTableCell>
                      <DataTableCell data-label={t('common:rentManagement.dueDate')} align="center">
                        {item.dueDate ? formatDate(item.dueDate) : '-'}
                      </DataTableCell>
                      <DataTableCell data-label={t('common:rentManagement.status')} align="center">
                        <StatusBadge status={item.status}>
                          {getStatusText(item.status)}
                        </StatusBadge>
                        {item.status === 'overdue' && item.daysOverdue > 0 && (
                          <div style={{ fontSize: '11px', color: '#DC2626' }}>{`${item.daysOverdue}d overdue`}</div>
                        )}
                      </DataTableCell>
                      <DataTableCell data-label={t('common:tableCol.invoice')} align="center">
                        {item.lastInvoice ? item.lastInvoice.number : t('common:rentManagement.notIssued')}
                      </DataTableCell>
                      <DataTableCell data-label={t('common:rentManagement.contractEnd')} align="center">
                        {item.contractEndDate ? formatDate(item.contractEndDate) : '-'}
                      </DataTableCell>
                      <DataTableCell data-label="" align="right" mobileFullWidth>
                        <ActionButtons>
                          {item.lastInvoice ? (
                            <SmallButton variant="primary" onClick={() => navigate('/pos/foodcourt/invoices')}>
                              View Invoice
                            </SmallButton>
                          ) : (
                            <SmallButton variant="primary" onClick={handleGenerateInvoices} disabled={generating}>
                              Issue
                            </SmallButton>
                          )}
                        </ActionButtons>
                      </DataTableCell>
                    </DataTableRow>
                  ))}
                </tbody>
              </DataTable>
            )}
          </TableContainer>


          {/* Reminder Confirmation Modal */}
        </Content>
      </Container>
      <ConfirmModal
        isOpen={infoModal.open}
        title={infoModal.title}
        message={infoModal.message}
        onConfirm={() => setInfoModal({ open: false, title: '', message: '' })}
        onCancel={() => setInfoModal({ open: false, title: '', message: '' })}
        confirmText={t('common:button.ok', 'OK')}
        type="info"
        singleButton
      />
    </>
  );
};

export default RentManagement;