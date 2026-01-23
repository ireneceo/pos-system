import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { TabContainer, Tab, DashboardStatsGrid, DashboardStatCard, DashboardStatLabel, DashboardStatValue, ModalComponent, FormGroup, FormLabel, FormInput, Button } from '../../components/UI';
import ConfirmModal from '../../components/ConfirmModal';
import PhoneInput from '../../components/Common/PhoneInput';

interface FoodcourtMetrics {
  totalFoodcourts: number;
  totalStores: number;
  totalManagers: number;
  monthlyRentRevenue: number;
  cumulativeRevenue: number;
  averageRevenuePerStore: number;
  occupancyRate: number;
  growthRate: number;
  maintenanceRequests: number;
  activeLeases: number;
  pendingApplications: number;
  totalTransactions: number;
}


interface FoodcourtManager {
  id: string;
  name: string;
  email: string;
  assignedFoodcourt: string;
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
  assignedFoodcourt: string;
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
    border-color: #7C3AED;
    background: #FEFBFF;
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
  background: #7C3AED;
  color: white;
  border: none;

  &:hover {
    background: #6D28D9;
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
    accent-color: #7C3AED;
  }
`;

const FoodcourtGeneralDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [managers, setManagers] = useState<FoodcourtManager[]>([]);
  const [timePeriod, setTimePeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [showManagerModal, setShowManagerModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedManager, setSelectedManager] = useState<FoodcourtManager | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ManagerFormData>({
    name: '',
    email: '',
    phone: '',
    assignedFoodcourt: '',
    password: '',
    permissions: []
  });
  const [metrics, setMetrics] = useState<FoodcourtMetrics>({
    totalFoodcourts: 0,
    totalStores: 0,
    totalManagers: 0,
    monthlyRentRevenue: 0,
    cumulativeRevenue: 0,
    averageRevenuePerStore: 0,
    occupancyRate: 0,
    growthRate: 0,
    maintenanceRequests: 0,
    activeLeases: 0,
    pendingApplications: 0,
    totalTransactions: 0
  });

  const availablePermissions = [
    'Store Management',
    'Lease Contract',
    'Revenue Management',
    'Maintenance Request',
    'Report Generation',
    'Customer Management',
    'Promotion Management',
    'Inventory Management'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Starting foodcourt data fetch...');

        // Fetch foodcourt managers
        const usersResponse = await fetch('/api/users?role=Foodcourt Manager');
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          const managerUsers = usersData.data || usersData;
          console.log('👥 Fetched foodcourt managers:', managerUsers?.length || 0);

          // Transform to FoodcourtManager format
          const foodcourtManagers = managerUsers.map((manager: any) => ({
            id: manager.id.toString(),
            name: manager.name || `${manager.first_name} ${manager.last_name}`.trim(),
            email: manager.email,
            assignedFoodcourt: `Foodcourt ${manager.id}`,
            storeCount: Math.floor(Math.random() * 20) + 5, // Mock data
            monthlyRevenue: Math.floor(Math.random() * 50000) + 10000,
            createdAt: manager.created_at || manager.createdAt,
            lastActive: new Date().toISOString(),
            performanceScore: Math.floor(Math.random() * 40) + 60,
            riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
          }));

          setManagers(foodcourtManagers);

          // Calculate metrics
          const newMetrics = {
            ...metrics,
            totalManagers: foodcourtManagers.length,
            totalFoodcourts: Math.ceil(foodcourtManagers.length / 2), // Assume 2 managers per foodcourt on average
            totalStores: foodcourtManagers.reduce((sum: number, m: FoodcourtManager) => sum + m.storeCount, 0),
            monthlyRentRevenue: foodcourtManagers.reduce((sum: number, m: FoodcourtManager) => sum + m.monthlyRevenue, 0),
            occupancyRate: Math.random() * 30 + 70, // Mock: 70-100%
            growthRate: Math.random() * 20 + 5, // Mock: 5-25%
            activeLeases: foodcourtManagers.reduce((sum: number, m: FoodcourtManager) => sum + m.storeCount, 0),
            pendingApplications: Math.floor(Math.random() * 15) + 5,
            maintenanceRequests: Math.floor(Math.random() * 10) + 2
          };

          newMetrics.averageRevenuePerStore = newMetrics.totalStores > 0
            ? newMetrics.monthlyRentRevenue / newMetrics.totalStores
            : 0;

          setMetrics(newMetrics);

          // Generate revenue data
          const periods = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const revenueArray = periods.map(period => ({
            period,
            revenue: Math.floor(Math.random() * 100000) + 50000,
            storeCount: Math.floor(Math.random() * 20) + 40
          }));
          }
      } catch (error) {
        console.error('Error fetching foodcourt data:', error);
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
      assignedFoodcourt: '',
      password: '',
      permissions: []
    });
    setShowManagerModal(true);
  };

  const handleEditManager = (manager: FoodcourtManager) => {
    setIsEditing(true);
    setSelectedManager(manager);
    setFormData({
      name: manager.name,
      email: manager.email,
      phone: manager.phone || '',
      assignedFoodcourt: manager.assignedFoodcourt,
      password: '',
      permissions: manager.permissions || []
    });
    setShowManagerModal(true);
  };

  const handleDeleteManager = (manager: FoodcourtManager) => {
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
        role: 'Foodcourt Manager',
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
        const usersResponse = await fetch('/api/users?role=Foodcourt Manager');
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          const managerUsers = usersData.data || usersData;

          const foodcourtManagers = managerUsers.map((manager: any) => ({
            id: manager.id.toString(),
            name: manager.name || `${manager.first_name} ${manager.last_name}`.trim(),
            email: manager.email,
            phone: manager.phone || '',
            assignedFoodcourt: `Foodcourt ${manager.id}`,
            storeCount: Math.floor(Math.random() * 20) + 5,
            monthlyRevenue: Math.floor(Math.random() * 50000) + 10000,
            createdAt: manager.created_at || manager.createdAt,
            lastActive: new Date().toISOString(),
            performanceScore: Math.floor(Math.random() * 40) + 60,
            riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
            permissions: manager.permissions || []
          }));

          setManagers(foodcourtManagers);
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
          <Title>Foodcourt General Dashboard</Title>
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
              팀 매니저 ({metrics.totalManagers})
            </Tab>
          </TabContainer>

          {activeTab === 'overview' && (
            <>
              <DashboardStatsGrid>
                <DashboardStatCard>
                  <DashboardStatValue>{metrics.totalFoodcourts}</DashboardStatValue>
                  <DashboardStatLabel>Managed Foodcourts</DashboardStatLabel>
                </DashboardStatCard>
                <DashboardStatCard>
                  <DashboardStatValue>{metrics.totalStores}</DashboardStatValue>
                  <DashboardStatLabel>Total Rental Stores</DashboardStatLabel>
                </DashboardStatCard>
                <DashboardStatCard>
                  <DashboardStatValue>RM {(metrics.monthlyRentRevenue / 1000).toFixed(0)}K</DashboardStatValue>
                  <DashboardStatLabel>Monthly Rental Revenue</DashboardStatLabel>
                </DashboardStatCard>
                <DashboardStatCard>
                  <DashboardStatValue>{metrics.occupancyRate.toFixed(1)}%</DashboardStatValue>
                  <DashboardStatLabel>Average Occupancy Rate</DashboardStatLabel>
                </DashboardStatCard>
              </DashboardStatsGrid>

              <MainGrid>
                <ChartContainer>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3>월별 임대 수익 추이</h3>
                    <TimeFilter value={timePeriod} onChange={(e) => setTimePeriod(e.target.value as any)}>
                      <option value="week">이번 주</option>
                      <option value="month">이번 달</option>
                      <option value="quarter">분기</option>
                      <option value="year">올해</option>
                    </TimeFilter>
                  </div>
                  <PlaceholderChart>
                    📊 월별 임대 수익 차트 (개발 예정)
                  </PlaceholderChart>
                </ChartContainer>

                <QuickStatsContainer>
                  <h3>운영 현황</h3>
                  <QuickStatItem>
                    <QuickStatLabel>활성 임대 계약</QuickStatLabel>
                    <QuickStatValue>{metrics.activeLeases}</QuickStatValue>
                  </QuickStatItem>
                  <QuickStatItem>
                    <QuickStatLabel>임대 신청 대기</QuickStatLabel>
                    <QuickStatValue>{metrics.pendingApplications}</QuickStatValue>
                  </QuickStatItem>
                  <QuickStatItem>
                    <QuickStatLabel>유지보수 요청</QuickStatLabel>
                    <QuickStatValue>{metrics.maintenanceRequests}</QuickStatValue>
                  </QuickStatItem>
                  <QuickStatItem>
                    <QuickStatLabel>평균 매장당 수익</QuickStatLabel>
                    <QuickStatValue>RM {(metrics.averageRevenuePerStore).toFixed(0)}</QuickStatValue>
                  </QuickStatItem>
                  <QuickStatItem>
                    <QuickStatLabel>성장률 (전월 대비)</QuickStatLabel>
                    <QuickStatValue>+{metrics.growthRate.toFixed(1)}%</QuickStatValue>
                  </QuickStatItem>
                </QuickStatsContainer>
              </MainGrid>
            </>
          )}

          {activeTab === 'managers' && (
            <ManagersList>
              <ManagersHeader>
                <h3>Foodcourt Manager Team</h3>
                <AddButton onClick={handleAddManager}>
                  Add Manager
                </AddButton>
              </ManagersHeader>
              {managers.length === 0 ? (
                <PlaceholderChart>
                  👥 Loading Foodcourt manager data...
                </PlaceholderChart>
              ) : (
                managers.map((manager) => (
                  <ManagerItem key={manager.id}>
                    <div onClick={() => navigate(`/manager/profile/${manager.id}`)}>
                      <ManagerHeader>
                        <ManagerName>{manager.name}</ManagerName>
                        <ManagerScore score={manager.performanceScore}>
                          {manager.performanceScore}점
                        </ManagerScore>
                      </ManagerHeader>
                      <ManagerInfo>
                        <span>{manager.assignedFoodcourt} • {manager.storeCount}개 매장</span>
                        <span>RM {(manager.monthlyRevenue / 1000).toFixed(0)}K/월</span>
                      </ManagerInfo>
                      <ManagerInfo style={{ marginTop: '4px' }}>
                        <span>{manager.email}</span>
                        <span>권한: {manager.permissions?.length || 0}개</span>
                      </ManagerInfo>
                    </div>
                    <ActionButtons>
                      <ActionButton variant="edit" onClick={() => handleEditManager(manager)}>
                        수정
                      </ActionButton>
                      <ActionButton variant="delete" onClick={() => handleDeleteManager(manager)}>
                        삭제
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
            title={isEditing ? '매니저 정보 수정' : '새 매니저 추가'}
          >
            <form onSubmit={handleFormSubmit}>
              <FormGroup>
                <FormLabel>이름</FormLabel>
                <FormInput
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>이메일</FormLabel>
                <FormInput
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>전화번호</FormLabel>
                <PhoneInput
                  value={formData.phone}
                  onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Assigned Foodcourt</FormLabel>
                <FormInput
                  type="text"
                  value={formData.assignedFoodcourt}
                  onChange={(e) => setFormData(prev => ({ ...prev, assignedFoodcourt: e.target.value }))}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{isEditing ? '새 비밀번호 (변경시에만)' : '비밀번호'}</FormLabel>
                <FormInput
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  required={!isEditing}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>권한 설정</FormLabel>
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
                  취소
                </Button>
                <Button type="submit">
                  {isEditing ? '수정' : '추가'}
                </Button>
              </div>
            </form>
          </ModalComponent>

          {/* Delete Confirmation Modal */}
          <ConfirmModal
            isOpen={showDeleteModal}
            title="매니저 삭제"
            message={`'${selectedManager?.name}' 매니저를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
            onConfirm={confirmDeleteManager}
            onCancel={() => { setShowDeleteModal(false); setSelectedManager(null); }}
            confirmText="삭제"
            cancelText="취소"
            type="danger"
          />
        </Content>
      </Container>
    </MainLayout>
  );
};

export default FoodcourtGeneralDashboard;