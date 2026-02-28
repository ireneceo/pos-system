import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ModalComponent, FormGroup, FormLabel, FormInput, Button, StatsGrid, StatCard, StatValue, StatLabel, StatTrend } from '../../components/UI';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import ConfirmModal from '../../components/ConfirmModal';

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
  height: 56px;
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



const ContentCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const ActionSection = styled.div`
  display: flex;
  gap: 12px;
`;

const FoodcourtsList = styled.div`
  display: grid;
  gap: 16px;
`;

const FoodcourtItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  background: white;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    transform: translateY(-1px);
  }
`;

const FoodcourtInfo = styled.div`
  flex: 1;
`;

const FoodcourtName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`;

const FoodcourtDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  font-size: 14px;
  color: #6B7280;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ variant: 'edit' | 'delete' | 'view' }>`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${props => {
    switch (props.variant) {
      case 'edit':
        return `
          background: #EBF8FF;
          border-color: #2563EB;
          color: #2563EB;
          &:hover { background: #DBEAFE; }
        `;
      case 'delete':
        return `
          background: #FEF2F2;
          border-color: #DC2626;
          color: #DC2626;
          &:hover { background: #FECACA; }
        `;
      case 'view':
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

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${props => {
    switch (props.status) {
      case 'active':
        return 'background: #DCFCE7; color: #166534;';
      case 'maintenance':
        return 'background: #FEF3C7; color: #92400E;';
      case 'closed':
        return 'background: #FEE2E2; color: #991B1B;';
      default:
        return 'background: #F3F4F6; color: #374151;';
    }
  }}
`;

interface Foodcourt {
  id: string;
  name: string;
  location: string;
  manager: string;
  tenantCount: number;
  occupancyRate: number;
  monthlyRevenue: number;
  status: 'active' | 'maintenance' | 'closed';
  openDate: string;
}

interface FoodcourtFormData {
  name: string;
  location: string;
  manager: string;
}

const FoodcourtManagement: React.FC = () => {
  const [stats, setStats] = useState({
    totalFoodcourts: 0,
    totalTenants: 0,
    activeManagers: 0,
    monthlyRevenue: 0,
    avgOccupancyRate: 0,
    totalRevenue: 0
  });

  const [foodcourts, setFoodcourts] = useState<Foodcourt[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFoodcourt, setSelectedFoodcourt] = useState<Foodcourt | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FoodcourtFormData>({
    name: '',
    location: '',
    manager: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: Implement API call to fetch foodcourt data
        setFoodcourts([]);
        setStats({
          totalFoodcourts: 0,
          totalTenants: 0,
          activeManagers: 0,
          monthlyRevenue: 0,
          avgOccupancyRate: 0,
          totalRevenue: 0
        });
      } catch (error) {
        console.error('Error fetching foodcourt data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddFoodcourt = () => {
    setIsEditing(false);
    setSelectedFoodcourt(null);
    setFormData({ name: '', location: '', manager: '' });
    setShowModal(true);
  };

  const handleEditFoodcourt = (foodcourt: Foodcourt) => {
    setIsEditing(true);
    setSelectedFoodcourt(foodcourt);
    setFormData({
      name: foodcourt.name,
      location: foodcourt.location,
      manager: foodcourt.manager
    });
    setShowModal(true);
  };

  const handleDeleteFoodcourt = (foodcourt: Foodcourt) => {
    setSelectedFoodcourt(foodcourt);
    setShowDeleteModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && selectedFoodcourt) {
      // Update existing foodcourt
      setFoodcourts(prev => prev.map(fc =>
        fc.id === selectedFoodcourt.id
          ? { ...fc, ...formData }
          : fc
      ));
    } else {
      // Add new foodcourt
      const newFoodcourt: Foodcourt = {
        id: (foodcourts.length + 1).toString(),
        ...formData,
        tenantCount: 0,
        occupancyRate: 0,
        monthlyRevenue: 0,
        status: 'active',
        openDate: new Date().toISOString().split('T')[0]
      };
      setFoodcourts(prev => [...prev, newFoodcourt]);
    }
    setShowModal(false);
  };

  const confirmDelete = () => {
    if (selectedFoodcourt) {
      setFoodcourts(prev => prev.filter(fc => fc.id !== selectedFoodcourt.id));
    }
    setShowDeleteModal(false);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'maintenance': return 'Maintenance';
      case 'closed': return 'Closed';
      default: return status;
    }
  };

  return (
    <>
      <Container>
        <Header>
          <div>
            <Title>Foodcourt Management</Title>
            <Subtitle>Integrated management and operational optimization for entire foodcourt network</Subtitle>
          </div>
          <ActionSection>
            <ThemedButton variant="outline">Export Data</ThemedButton>
            <ThemedButton variant="primary" onClick={handleAddFoodcourt}>Add Foodcourt</ThemedButton>
          </ActionSection>
        </Header>

        <Content>
          <StatsGrid>
            <StatCard>
              <StatValue>{stats.totalFoodcourts}</StatValue>
              <StatLabel>Total Foodcourts</StatLabel>
              <StatTrend trend="up">+1 this month</StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{stats.totalTenants}</StatValue>
              <StatLabel>Total Tenants</StatLabel>
              <StatTrend trend="up">+5 new tenants</StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{stats.avgOccupancyRate.toFixed(1)}%</StatValue>
              <StatLabel>Average Occupancy</StatLabel>
              <StatTrend trend="up">+2.5% vs last month</StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>RM {(stats.monthlyRevenue / 1000000).toFixed(0)}M</StatValue>
              <StatLabel>Total Monthly Revenue</StatLabel>
              <StatTrend trend="up">+12% vs last month</StatTrend>
            </StatCard>
          </StatsGrid>

          <ContentCard>
            <SectionHeader>
              <SectionTitle>Foodcourt List</SectionTitle>
              <ThemedButton variant="primary" onClick={handleAddFoodcourt}>
                Add New Foodcourt
              </ThemedButton>
            </SectionHeader>

            <FoodcourtsList>
              {foodcourts.map((foodcourt) => (
                <FoodcourtItem key={foodcourt.id}>
                  <FoodcourtInfo>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <FoodcourtName>{foodcourt.name}</FoodcourtName>
                      <StatusBadge status={foodcourt.status}>
                        {getStatusText(foodcourt.status)}
                      </StatusBadge>
                    </div>
                    <FoodcourtDetails>
                      <div>
                        <strong>Location:</strong> {foodcourt.location}
                      </div>
                      <div>
                        <strong>Manager:</strong> {foodcourt.manager}
                      </div>
                      <div>
                        <strong>Tenants:</strong> {foodcourt.tenantCount}
                      </div>
                      <div>
                        <strong>Occupancy:</strong> {foodcourt.occupancyRate}%
                      </div>
                      <div>
                        <strong>Monthly Revenue:</strong> RM {(foodcourt.monthlyRevenue / 1000000).toFixed(1)}M
                      </div>
                      <div>
                        <strong>Opening Date:</strong> {foodcourt.openDate}
                      </div>
                    </FoodcourtDetails>
                  </FoodcourtInfo>
                  <ActionButtons>
                    <ActionButton variant="view">
                      View Details
                    </ActionButton>
                    <ActionButton variant="edit" onClick={() => handleEditFoodcourt(foodcourt)}>
                      Edit
                    </ActionButton>
                    <ActionButton variant="delete" onClick={() => handleDeleteFoodcourt(foodcourt)}>
                      Delete
                    </ActionButton>
                  </ActionButtons>
                </FoodcourtItem>
              ))}
            </FoodcourtsList>
          </ContentCard>

          {/* Add/Edit Modal */}
          <ModalComponent
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={isEditing ? 'Edit Foodcourt' : 'Add New Foodcourt'}
          >
            <form onSubmit={handleFormSubmit}>
              <FormGroup>
                <FormLabel>Foodcourt Name</FormLabel>
                <FormInput
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Location</FormLabel>
                <FormInput
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Manager</FormLabel>
                <FormInput
                  type="text"
                  value={formData.manager}
                  onChange={(e) => setFormData(prev => ({ ...prev, manager: e.target.value }))}
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

          {/* Delete Confirmation Modal */}
          <ConfirmModal
            isOpen={showDeleteModal}
            title="Delete Foodcourt"
            message={`Are you sure you want to delete '${selectedFoodcourt?.name}' foodcourt? This action cannot be undone.`}
            onConfirm={confirmDelete}
            onCancel={() => setShowDeleteModal(false)}
            confirmText="Delete"
            cancelText="Cancel"
            type="danger"
          />
        </Content>
      </Container>
    </>
  );
};

export default FoodcourtManagement;