import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ModalComponent, FormGroup, FormLabel, FormInput, Button, StatsGrid, StatCard, StatValue, StatLabel, StatTrend } from '../../components/UI';
import { DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, DataTableEmpty } from '../../components/UI/DataTable';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import ConfirmModal from '../../components/ConfirmModal';
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
  border-bottom: 1px solid #E6EBF1;
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
  background: #FAFBFC;
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
  color: #6B7280;
  margin: 8px 0 0;
`;


const ActionBar = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
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
  border: 1px solid #E6EBF1;
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
  border: 1px solid #E6EBF1;
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
        return 'background: #F3F4F6; color: #374151;';
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
          background: #F3F4F6;
          border-color: #9CA3AF;
          color: #374151;
          &:hover { background: #E5E7EB; }
        `;
    }
  }}
`;

interface RentData {
  id: string;
  storeName: string;
  owner: string;
  rentAmount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentDate: string | null;
  area: string;
  phone: string;
  contractEndDate: string;
}

interface RentFormData {
  storeName: string;
  owner: string;
  rentAmount: string;
  area: string;
  phone: string;
  contractEndDate: string;
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
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedRent, setSelectedRent] = useState<RentData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<RentFormData>({
    storeName: '',
    owner: '',
    rentAmount: '',
    area: '',
    phone: '',
    contractEndDate: ''
  });

  useEffect(() => {
    const fetchRentData = async () => {
      try {
        // TODO: Implement API call to fetch rent data
        setRentData([]);
        setStats({
          totalStores: 0,
          paidStores: 0,
          pendingStores: 0,
          overdueStores: 0,
          totalRevenue: 0
        });
      } catch (error) {
        console.error('Error fetching rent data:', error);
      }
    };

    fetchRentData();
  }, []);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Paid';
      case 'pending': return 'Pending';
      case 'overdue': return 'Overdue';
      default: return status;
    }
  };

  const handleAddRent = () => {
    setIsEditing(false);
    setSelectedRent(null);
    setFormData({
      storeName: '',
      owner: '',
      rentAmount: '',
      area: '',
      phone: '',
      contractEndDate: ''
    });
    setShowModal(true);
  };

  const handleEditRent = (rent: RentData) => {
    setIsEditing(true);
    setSelectedRent(rent);
    setFormData({
      storeName: rent.storeName,
      owner: rent.owner,
      rentAmount: rent.rentAmount.toString(),
      area: rent.area,
      phone: rent.phone,
      contractEndDate: rent.contractEndDate
    });
    setShowModal(true);
  };

  const handleSendReminder = (rent: RentData) => {
    setSelectedRent(rent);
    setShowConfirmModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && selectedRent) {
      setRentData(prev => prev.map(rent =>
        rent.id === selectedRent.id
          ? { ...rent, ...formData, rentAmount: parseInt(formData.rentAmount) }
          : rent
      ));
    } else {
      const newRent: RentData = {
        id: (rentData.length + 1).toString(),
        ...formData,
        rentAmount: parseInt(formData.rentAmount),
        dueDate: '2024-01-15',
        status: 'pending',
        paymentDate: null
      };
      setRentData(prev => [...prev, newRent]);
    }
    setShowModal(false);
  };

  const confirmSendReminder = () => {
    console.log(`Sending reminder to ${selectedRent?.storeName}`);
    setShowConfirmModal(false);
  };

  const filteredData = rentData.filter(item =>
    item.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <Container>
        <Header>
          <div>
            <Title>{'Rent Management'}</Title>
            <Subtitle>{'Foodcourt tenant rent status and payment management'}</Subtitle>
          </div>
          <ActionSection>
            <ThemedButton variant="outline">{'Export Report'}</ThemedButton>
            <ThemedButton variant="primary" onClick={handleAddRent}>{'Set Rent'}</ThemedButton>
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
              <StatTrend trend="up">{Math.round((stats.paidStores/stats.totalStores)*100)}% payment rate</StatTrend>
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
              <StatValue>RM {(stats.totalRevenue / 1000000).toFixed(0)}M</StatValue>
              <StatLabel>{'This Month Revenue'}</StatLabel>
              <StatTrend trend="up">+5% vs last month</StatTrend>
            </StatCard>
          </StatsGrid>

          <ActionBar>
            <SearchInput
              type="text"
              placeholder="Search by business name or owner name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ButtonGroup>
              <ThemedButton variant="primary" onClick={handleAddRent}>
                Set Rent
              </ThemedButton>
              <ThemedButton variant="outline">
                Send Bulk Invoices
              </ThemedButton>
            </ButtonGroup>
          </ActionBar>

          <TableContainer>
            {filteredData.length === 0 ? (
              rentData.length === 0 ? (
                <EmptyState
                  title="No tenants yet"
                  description="Rent management lists each active tenant restaurant and their monthly billing status. Once you have tenants linked to your branch units, they will appear here."
                  primaryAction={{ label: 'Manage Tenants', onClick: () => navigate('/pos/foodcourt/general/management') }}
                  secondaryAction={{ label: 'Open Floor Plan', onClick: () => navigate('/pos/foodcourt/floor-plan') }}
                />
              ) : (
                <DataTableEmpty>No tenants match the current filter</DataTableEmpty>
              )
            ) : (
              <DataTable>
                <DataTableHead>
                  <tr>
                    <DataTableHeaderCell align="left">{'Business Name'}</DataTableHeaderCell>
                    <DataTableHeaderCell align="left">{'Owner'}</DataTableHeaderCell>
                    <DataTableHeaderCell align="left">{'Contact'}</DataTableHeaderCell>
                    <DataTableHeaderCell align="left">{'Area'}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">{'Monthly Rent'}</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">{'Due Date'}</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">{'Status'}</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">{'Payment Date'}</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">{'Contract End'}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">{'Actions'}</DataTableHeaderCell>
                  </tr>
                </DataTableHead>
                <tbody>
                  {filteredData.map((item) => (
                    <DataTableRow key={item.id}>
                      <DataTableCell data-label="Business Name">
                        <strong>{item.storeName}</strong>
                      </DataTableCell>
                      <DataTableCell data-label="Owner">{item.owner}</DataTableCell>
                      <DataTableCell data-label="Contact">{item.phone}</DataTableCell>
                      <DataTableCell data-label="Area">{item.area}</DataTableCell>
                      <DataTableCell data-label="Monthly Rent" align="right">
                        <strong>RM {item.rentAmount.toLocaleString()}</strong>
                      </DataTableCell>
                      <DataTableCell data-label="Due Date" align="center">{item.dueDate}</DataTableCell>
                      <DataTableCell data-label="Status" align="center">
                        <StatusBadge status={item.status}>
                          {getStatusText(item.status)}
                        </StatusBadge>
                      </DataTableCell>
                      <DataTableCell data-label="Payment Date" align="center">
                        {item.paymentDate || '-'}
                      </DataTableCell>
                      <DataTableCell data-label="Contract End" align="center">{item.contractEndDate}</DataTableCell>
                      <DataTableCell data-label="" align="right" mobileFullWidth>
                        <ActionButtons>
                          <SmallButton variant="primary" onClick={() => handleEditRent(item)}>
                            Edit
                          </SmallButton>
                          {item.status !== 'paid' && (
                            <SmallButton variant="danger" onClick={() => handleSendReminder(item)}>
                              Remind
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

          {/* Add/Edit Modal */}
          <ModalComponent
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={isEditing ? 'Edit Rent Information' : 'Set New Rent'}
          >
            <form onSubmit={handleFormSubmit}>
              <FormGroup>
                <FormLabel>{'Business Name'}</FormLabel>
                <FormInput
                  type="text"
                  value={formData.storeName}
                  onChange={(e) => setFormData(prev => ({ ...prev, storeName: e.target.value }))}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{'Owner Name'}</FormLabel>
                <FormInput
                  type="text"
                  value={formData.owner}
                  onChange={(e) => setFormData(prev => ({ ...prev, owner: e.target.value }))}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{'Contact'}</FormLabel>
                <FormInput
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{'Area'}</FormLabel>
                <FormInput
                  type="text"
                  value={formData.area}
                  onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                  placeholder="e.g. 45㎡"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{'Monthly Rent (RM)'}</FormLabel>
                <FormInput
                  type="number"
                  value={formData.rentAmount}
                  onChange={(e) => setFormData(prev => ({ ...prev, rentAmount: e.target.value }))}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{'Contract End Date'}</FormLabel>
                <DateField
                  value={formData.contractEndDate}
                  onChange={(v) => setFormData(prev => ({ ...prev, contractEndDate: v }))}
                  required
                />
              </FormGroup>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditing ? 'Update' : 'Add'}
                </Button>
              </div>
            </form>
          </ModalComponent>

          {/* Reminder Confirmation Modal */}
          <ConfirmModal
            isOpen={showConfirmModal}
            title="Payment Reminder"
            message={`Send payment reminder to '${selectedRent?.storeName}'?`}
            onConfirm={confirmSendReminder}
            onCancel={() => setShowConfirmModal(false)}
            confirmText="Send"
            cancelText="Cancel"
            type="warning"
          />
        </Content>
      </Container>
    </>
  );
};

export default RentManagement;