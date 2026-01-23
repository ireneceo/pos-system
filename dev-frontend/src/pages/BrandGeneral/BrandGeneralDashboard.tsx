import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { TabContainer, Tab, DashboardStatsGrid, DashboardStatCard, DashboardStatLabel, DashboardStatValue, ModalComponent, FormGroup, FormLabel, FormInput, Button } from '../../components/UI';
import ConfirmModal from '../../components/ConfirmModal';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';
import PhoneInput from '../../components/Common/PhoneInput';

interface BrandMetrics {
  totalBrands: number;
  totalStores: number;
  totalManagers: number;
  monthlyRevenue: number;
  cumulativeRevenue: number;
  averageRevenuePerStore: number;
  marketShare: number;
  growthRate: number;
  customerSatisfaction: number;
  activePromotions: number;
  newFranchises: number;
  totalTransactions: number;
}

interface RevenueData {
  period: string;
  revenue: number;
  storeCount: number;
}

interface BrandManager {
  id: string;
  name: string;
  email: string;
  assignedBrand: string;
  storeCount: number;
  monthlyRevenue: number;
  createdAt: string;
  lastActive: string;
  performanceScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  permissions?: string[];
  phone?: string;
  password?: string;
}

interface ManagerFormData {
  name: string;
  email: string;
  phone: string;
  assignedBrand: string;
  password: string;
  permissions: string[];
}

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

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const ChartContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`;

const QuickStatsContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`;

const QuickStatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`;

const QuickStatLabel = styled.span`
  font-size: 14px;
  color: #6B7280;
`;

const QuickStatValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`;

const ManagersList = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`;

const ManagerItem = styled.div`
  padding: 16px;
  border: 1px solid #F3F4F6;
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #DC2626;
    background: #FEF2F2;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ManagerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ManagerName = styled.span`
  font-weight: 600;
  color: #0A2540;
`;

const ManagerScore = styled.span<{ score: number }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: ${props => {
    if (props.score >= 90) return '#059669';
    if (props.score >= 70) return '#2563EB';
    if (props.score >= 50) return '#D97706';
    return '#DC2626';
  }};
`;

const ManagerInfo = styled.div`
  font-size: 13px;
  color: #6B7280;
  display: flex;
  justify-content: space-between;
`;

const PlaceholderChart = styled.div`
  height: 300px;
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  font-style: italic;
`;

const TimeFilter = styled.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 8px;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: #F4F3FF;
  }
`;

const ManagersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const AddButton = styled(Button)`
  background: #DC2626;
  color: white;
  border: none;

  &:hover {
    background: #B91C1C;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const ActionButton = styled.button<{ variant: 'edit' | 'delete' }>`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${props => props.variant === 'edit' ? `
    background: #EBF8FF;
    border-color: #2563EB;
    color: #2563EB;

    &:hover {
      background: #DBEAFE;
    }
  ` : `
    background: #FEF2F2;
    border-color: #DC2626;
    color: #DC2626;

    &:hover {
      background: #FECACA;
    }
  `}
`;

const PermissionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

const PermissionItem = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #DC2626;
  }
`;

const BrandGeneralDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [managers, setManagers] = useState<BrandManager[]>([]);
  const [, setRevenueData] = useState<RevenueData[]>([]);
  const [timePeriod, setTimePeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [showManagerModal, setShowManagerModal] = useState(false);
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedManager, setSelectedManager] = useState<BrandManager | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ManagerFormData>({
    name: '',
    email: '',
    phone: '',
    assignedBrand: '',
    password: '',
    permissions: []
  });
  const [metrics, setMetrics] = useState<BrandMetrics>({
    totalBrands: 0,
    totalStores: 0,
    totalManagers: 0,
    monthlyRevenue: 0,
    cumulativeRevenue: 0,
    averageRevenuePerStore: 0,
    marketShare: 0,
    growthRate: 0,
    customerSatisfaction: 0,
    activePromotions: 0,
    newFranchises: 0,
    totalTransactions: 0
  });

  const availablePermissions = [
    'Franchise Management',
    'Brand Marketing',
    'Sales Management',
    'Customer Management',
    'Promotion Management',
    'Report Generation',
    'New Franchise',
    'Quality Management'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Starting brand data fetch...');

        // Fetch brand managers
        const usersResponse = await fetch('/api/users?role=Brand Manager');
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          const managerUsers = usersData.data || usersData;
          console.log('👥 Fetched brand managers:', managerUsers?.length || 0);

          // Transform to BrandManager format
          const brandManagers = managerUsers.map((manager: any) => ({
            id: manager.id.toString(),
            name: manager.name || `${manager.first_name} ${manager.last_name}`.trim(),
            email: manager.email,
            assignedBrand: `Brand ${manager.id}`,
            storeCount: Math.floor(Math.random() * 15) + 3, // Mock data
            monthlyRevenue: Math.floor(Math.random() * 80000) + 20000,
            createdAt: manager.created_at || manager.createdAt,
            lastActive: new Date().toISOString(),
            performanceScore: Math.floor(Math.random() * 40) + 60,
            riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
          }));

          setManagers(brandManagers);

          // Calculate metrics
          const newMetrics = {
            ...metrics,
            totalManagers: brandManagers.length,
            totalBrands: brandManagers.length, // 1:1 mapping for now
            totalStores: brandManagers.reduce((sum: number, m: BrandManager) => sum + m.storeCount, 0),
            monthlyRevenue: brandManagers.reduce((sum: number, m: BrandManager) => sum + m.monthlyRevenue, 0),
            marketShare: Math.random() * 15 + 10, // Mock: 10-25%
            growthRate: Math.random() * 25 + 8, // Mock: 8-33%
            customerSatisfaction: Math.random() * 1.5 + 3.5, // Mock: 3.5-5.0
            activePromotions: Math.floor(Math.random() * 12) + 3,
            newFranchises: Math.floor(Math.random() * 8) + 2
          };

          newMetrics.averageRevenuePerStore = newMetrics.totalStores > 0
            ? newMetrics.monthlyRevenue / newMetrics.totalStores
            : 0;

          setMetrics(newMetrics);

          // Generate revenue data
          const periods = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
          const revenueArray = periods.map(period => ({
            period,
            revenue: Math.floor(Math.random() * 150000) + 80000,
            storeCount: Math.floor(Math.random() * 10) + 25
          }));
          setRevenueData(revenueArray);
        }
      } catch (error) {
        console.error('Error fetching brand data:', error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddManager = () => {
    setIsEditing(false);
    setSelectedManager(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      assignedBrand: '',
      password: '',
      permissions: []
    });
    setShowManagerModal(true);
  };

  const handleEditManager = (manager: BrandManager) => {
    setIsEditing(true);
    setSelectedManager(manager);
    setFormData({
      name: manager.name,
      email: manager.email,
      phone: manager.phone || '',
      assignedBrand: manager.assignedBrand,
      password: '',
      permissions: manager.permissions || []
    });
    setShowManagerModal(true);
  };

  const handleDeleteManager = (manager: BrandManager) => {
    setSelectedManager(manager);
    setShowDeleteModal(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isEditing && selectedManager
        ? `/api/users/${selectedManager.id}`
        : '/api/users';

      const method = isEditing ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        role: 'Brand Manager',
        first_name: formData.name.split(' ')[0],
        last_name: formData.name.split(' ').slice(1).join(' ') || '',
        ...(formData.password && { password: formData.password })
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setShowManagerModal(false);
        // Refresh managers list
        const usersResponse = await fetch('/api/users?role=Brand Manager');
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          const managerUsers = usersData.data || usersData;

          const brandManagers = managerUsers.map((manager: any) => ({
            id: manager.id.toString(),
            name: manager.name || `${manager.first_name} ${manager.last_name}`.trim(),
            email: manager.email,
            phone: manager.phone || '',
            assignedBrand: `Brand ${manager.id}`,
            storeCount: Math.floor(Math.random() * 15) + 3,
            monthlyRevenue: Math.floor(Math.random() * 80000) + 20000,
            createdAt: manager.created_at || manager.createdAt,
            lastActive: new Date().toISOString(),
            performanceScore: Math.floor(Math.random() * 40) + 60,
            riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
            permissions: manager.permissions || []
          }));

          setManagers(brandManagers);
        }
      } else {
        console.error('Failed to save manager');
      }
    } catch (error) {
      console.error('Error saving manager:', error);
    }
  };

  const confirmDeleteManager = async () => {
    if (!selectedManager) return;

    try {
      const response = await fetch(`/api/users/${selectedManager.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setManagers(managers.filter(m => m.id !== selectedManager.id));
        setShowDeleteModal(false);
        setSelectedManager(null);
      } else {
        console.error('Failed to delete manager');
      }
    } catch (error) {
      console.error('Error deleting manager:', error);
    }
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        permissions: [...prev.permissions, permission]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions.filter(p => p !== permission)
      }));
    }
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Brand General Dashboard</Title>
        </Header>

        <Content>
          <TabContainer>
            <Tab
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </Tab>
            <Tab
              active={activeTab === 'managers'}
              onClick={() => setActiveTab('managers')}
            >
              Brand Managers ({metrics.totalManagers})
            </Tab>
          </TabContainer>

          {activeTab === 'overview' && (
            <>
              <DashboardStatsGrid>
                <DashboardStatCard>
                  <DashboardStatValue>{metrics.totalBrands}</DashboardStatValue>
                  <DashboardStatLabel>Managed Brands</DashboardStatLabel>
                </DashboardStatCard>
                <DashboardStatCard>
                  <DashboardStatValue>{metrics.totalStores}</DashboardStatValue>
                  <DashboardStatLabel>Total Franchises</DashboardStatLabel>
                </DashboardStatCard>
                <DashboardStatCard>
                  <DashboardStatValue>{formatCurrency(metrics.monthlyRevenue, selectedCurrency)}</DashboardStatValue>
                  <DashboardStatLabel>Monthly Revenue</DashboardStatLabel>
                </DashboardStatCard>
                <DashboardStatCard>
                  <DashboardStatValue>{metrics.marketShare.toFixed(1)}%</DashboardStatValue>
                  <DashboardStatLabel>Market Share</DashboardStatLabel>
                </DashboardStatCard>
              </DashboardStatsGrid>

              <MainGrid>
                <ChartContainer>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3>Monthly Brand Revenue Trend</h3>
                    <TimeFilter value={timePeriod} onChange={(e) => setTimePeriod(e.target.value as any)}>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="quarter">Quarter</option>
                      <option value="year">This Year</option>
                    </TimeFilter>
                  </div>
                  <PlaceholderChart>
                    Monthly Brand Revenue Chart (Coming Soon)
                  </PlaceholderChart>
                </ChartContainer>

                <QuickStatsContainer>
                  <h3>Brand Status</h3>
                  <QuickStatItem>
                    <QuickStatLabel>Customer Satisfaction</QuickStatLabel>
                    <QuickStatValue>{metrics.customerSatisfaction.toFixed(1)}/5.0</QuickStatValue>
                  </QuickStatItem>
                  <QuickStatItem>
                    <QuickStatLabel>Active Promotions</QuickStatLabel>
                    <QuickStatValue>{metrics.activePromotions}</QuickStatValue>
                  </QuickStatItem>
                  <QuickStatItem>
                    <QuickStatLabel>New Franchises</QuickStatLabel>
                    <QuickStatValue>{metrics.newFranchises}</QuickStatValue>
                  </QuickStatItem>
                  <QuickStatItem>
                    <QuickStatLabel>Average Revenue per Store</QuickStatLabel>
                    <QuickStatValue>{formatCurrency(metrics.averageRevenuePerStore, selectedCurrency)}</QuickStatValue>
                  </QuickStatItem>
                  <QuickStatItem>
                    <QuickStatLabel>Growth Rate (vs Last Month)</QuickStatLabel>
                    <QuickStatValue>+{metrics.growthRate.toFixed(1)}%</QuickStatValue>
                  </QuickStatItem>
                </QuickStatsContainer>
              </MainGrid>
            </>
          )}

          {activeTab === 'managers' && (
            <ManagersList>
              <ManagersHeader>
                <h3>Brand Manager Team</h3>
                <AddButton onClick={handleAddManager}>
                  Add Manager
                </AddButton>
              </ManagersHeader>
              {managers.length === 0 ? (
                <PlaceholderChart>
                  👥 Loading brand manager data...
                </PlaceholderChart>
              ) : (
                managers.map((manager) => (
                  <ManagerItem key={manager.id}>
                    <div onClick={() => navigate(`/manager/profile/${manager.id}`)}>
                      <ManagerHeader>
                        <ManagerName>{manager.name}</ManagerName>
                        <ManagerScore score={manager.performanceScore}>
                          {manager.performanceScore} pts
                        </ManagerScore>
                      </ManagerHeader>
                      <ManagerInfo>
                        <span>{manager.assignedBrand} • {manager.storeCount} stores</span>
                        <span>{formatCurrency(manager.monthlyRevenue, selectedCurrency)}/month</span>
                      </ManagerInfo>
                      <ManagerInfo style={{ marginTop: '4px' }}>
                        <span>{manager.email}</span>
                        <span>Permissions: {manager.permissions?.length || 0}</span>
                      </ManagerInfo>
                    </div>
                    <ActionButtons>
                      <ActionButton variant="edit" onClick={() => handleEditManager(manager)}>
                        Edit
                      </ActionButton>
                      <ActionButton variant="delete" onClick={() => handleDeleteManager(manager)}>
                        Delete
                      </ActionButton>
                    </ActionButtons>
                  </ManagerItem>
                ))
              )}
            </ManagersList>
          )}

          {/* Manager Form Modal */}
          <ModalComponent
            isOpen={showManagerModal}
            onClose={() => setShowManagerModal(false)}
            title={isEditing ? 'Edit Manager Information' : 'Add New Manager'}
          >
            <form onSubmit={handleFormSubmit}>
              <FormGroup>
                <FormLabel>Name</FormLabel>
                <FormInput
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormInput
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Phone Number</FormLabel>
                <PhoneInput
                  value={formData.phone}
                  onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Assigned Brand</FormLabel>
                <FormInput
                  type="text"
                  value={formData.assignedBrand}
                  onChange={(e) => setFormData(prev => ({ ...prev, assignedBrand: e.target.value }))}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{isEditing ? 'New Password (only when changing)' : 'Password'}</FormLabel>
                <FormInput
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  required={!isEditing}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Permission Settings</FormLabel>
                <PermissionsGrid>
                  {availablePermissions.map(permission => (
                    <PermissionItem key={permission}>
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission)}
                        onChange={(e) => handlePermissionChange(permission, e.target.checked)}
                      />
                      {permission}
                    </PermissionItem>
                  ))}
                </PermissionsGrid>
              </FormGroup>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <Button type="button" variant="secondary" onClick={() => setShowManagerModal(false)}>
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
            title="Delete Manager"
            message={`Are you sure you want to delete manager '${selectedManager?.name}'? This action cannot be undone.`}
            onConfirm={confirmDeleteManager}
            onCancel={() => { setShowDeleteModal(false); setSelectedManager(null); }}
            confirmText="Delete"
            cancelText="Cancel"
            type="danger"
          />
        </Content>
      </Container>
    </MainLayout>
  );
};

export default BrandGeneralDashboard;