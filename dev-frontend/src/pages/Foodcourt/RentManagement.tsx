import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
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

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #C7CED6;
  margin-bottom: 0;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
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

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
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

const ActionSection = styled.div`
  display: flex;
  gap: 12px;
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
        setInfoModal({ open: true, title: 'Could not issue invoices', message: json.message || 'Failed to issue rent invoices.' });
        return;
      }
      await loadRent();
    } catch (err) {
      console.error('Error generating rent invoices:', err);
      setInfoModal({ open: true, title: 'Could not issue invoices', message: 'Failed to issue rent invoices.' });
    } finally {
      setGenerating(false);
    }
  };


  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Paid';
      case 'pending': return 'Pending';
      case 'overdue': return 'Overdue';
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
            <Title>{'Rent Management'}</Title>
            <Subtitle>{'Foodcourt tenant rent status and payment management'}</Subtitle>
          </div>
          <ActionSection>
            <ThemedButton variant="outline" onClick={() => navigate('/pos/foodcourt/tenancy')}>
              {'Manage Contracts'}
            </ThemedButton>
            <ThemedButton variant="primary" onClick={handleGenerateInvoices} disabled={generating}>
              {generating ? 'Issuing...' : 'Issue This Month'}
            </ThemedButton>
          </ActionSection>
        </Header>

        <Content>
          <StatsGrid>
            <StatCard>
              <StatValue>{stats.totalStores}</StatValue>
              <StatLabel>{'Total Tenants'}</StatLabel>
              <StatTrend trend="up">{'All active spaces'}</StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{stats.paidStores}</StatValue>
              <StatLabel>{'Paid'}</StatLabel>
              <StatTrend trend="up">
                {stats.totalStores > 0 ? `${Math.round((stats.paidStores / stats.totalStores) * 100)}% payment rate` : 'No tenants'}
              </StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{stats.pendingStores}</StatValue>
              <StatLabel>{'Pending'}</StatLabel>
              <StatTrend trend="down">{'Awaiting payment'}</StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{stats.overdueStores}</StatValue>
              <StatLabel>{'Overdue'}</StatLabel>
              <StatTrend trend={stats.overdueStores > 0 ? "down" : "up"}>{'Requires attention'}</StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{formatCurrency(stats.totalRevenue, currency)}</StatValue>
              <StatLabel>{'Monthly Rent Total'}</StatLabel>
              <StatTrend trend="up">{'Base rent + maintenance'}</StatTrend>
            </StatCard>
          </StatsGrid>

          <ActionBar>
            <SearchInput
              type="text"
              placeholder="Search by tenant or unit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ButtonGroup>
              <ThemedButton variant="outline" onClick={loadRent} disabled={loading}>
                {loading ? 'Loading...' : 'Refresh'}
              </ThemedButton>
            </ButtonGroup>
          </ActionBar>

          <TableContainer>
            {filteredData.length === 0 ? (
              rentData.length === 0 ? (
                <EmptyState
                  title="No tenants yet"
                  description="Rent management lists each active tenant restaurant and their monthly billing status. Once you have tenants linked to your branch units, they will appear here."
                  primaryAction={{ label: 'Manage Tenants', onClick: () => navigate('/pos/foodcourt/tenancy') }}
                  secondaryAction={{ label: 'Open Floor Plan', onClick: () => navigate('/pos/foodcourt/floor-plan') }}
                />
              ) : (
                <DataTableEmpty>No tenants match the current filter</DataTableEmpty>
              )
            ) : (
              <DataTable>
                <DataTableHead>
                  <tr>
                    <DataTableHeaderCell align="left">{'Tenant'}</DataTableHeaderCell>
                    <DataTableHeaderCell align="left">{'Unit'}</DataTableHeaderCell>
                    <DataTableHeaderCell align="left">{'Contact'}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">{'Monthly Rent'}</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">{'Due Date'}</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">{'Status'}</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">{'Invoice'}</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">{'Contract End'}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">{'Actions'}</DataTableHeaderCell>
                  </tr>
                </DataTableHead>
                <tbody>
                  {filteredData.map((item) => (
                    <DataTableRow key={item.contractId}>
                      <DataTableCell data-label="Tenant">
                        <strong>{item.storeName}</strong>
                      </DataTableCell>
                      <DataTableCell data-label="Unit">
                        {item.unit || '-'}{item.unitSize ? ` (${item.unitSize})` : ''}
                      </DataTableCell>
                      <DataTableCell data-label="Contact">{item.phone || '-'}</DataTableCell>
                      <DataTableCell data-label="Monthly Rent" align="right">
                        <strong>{formatCurrency(item.totalMonthly, item.currency || currency)}</strong>
                        {item.maintenanceFee > 0 && (
                          <div style={{ fontSize: '11px', color: '#4B5563' }}>
                            {`incl. maintenance ${formatCurrency(item.maintenanceFee, item.currency || currency)}`}
                          </div>
                        )}
                      </DataTableCell>
                      <DataTableCell data-label="Due Date" align="center">
                        {item.dueDate ? formatDate(item.dueDate) : '-'}
                      </DataTableCell>
                      <DataTableCell data-label="Status" align="center">
                        <StatusBadge status={item.status}>
                          {getStatusText(item.status)}
                        </StatusBadge>
                        {item.status === 'overdue' && item.daysOverdue > 0 && (
                          <div style={{ fontSize: '11px', color: '#DC2626' }}>{`${item.daysOverdue}d overdue`}</div>
                        )}
                      </DataTableCell>
                      <DataTableCell data-label="Invoice" align="center">
                        {item.lastInvoice ? item.lastInvoice.number : 'Not issued'}
                      </DataTableCell>
                      <DataTableCell data-label="Contract End" align="center">
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
        confirmText="OK"
        type="info"
        singleButton
      />
    </>
  );
};

export default RentManagement;