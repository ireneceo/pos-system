import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI';
import { Tabs, Tab, Badge } from '../../components/Common/TabComponents';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { useAuth } from '../../contexts/AuthContext';
import { useTabParam } from '../../hooks/useTabParam';

interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  restaurantId?: string;
  restaurantName?: string;
  status: 'active' | 'inactive';
  joinDate: string;
  lastActive: string;
  permissions: string[];
}

const Container = styled.div`
  min-height: 100vh;
  background: #FAFBFC;
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

const ActionSection = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${props => props.variant === 'primary' ? `
    background: #635BFF;
    color: white;

    &:hover {
      background: #5A51E6;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
    }
  ` : `
    background: white;
    color: #6B7280;
    border: 1px solid #E6EBF1;

    &:hover {
      background: #F8FAFC;
      color: #0A2540;
      border-color: #CBD5E1;
    }
  `}
`;

const Content = styled.div`
  padding: 32px;
`;

const StatSubtext = styled.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;
`;

const StaffTableContainer = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`;

const StaffTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;

  @media (max-width: 768px) {
    display: block;
  }

  tbody {
    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const StaffTableHead = styled.thead`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;

  @media (max-width: 768px) {
    display: none;
  }

  th {
    padding: 14px 16px;
    text-align: left;
    font-size: 12px;
    font-weight: 600;
    color: #6B7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* 정렬 규칙: Role, Status, Last Active는 가운데, Actions는 우측 */
  th:nth-child(3) { text-align: center; } /* Role */
  th:nth-child(4) { text-align: center; } /* Status */
  th:nth-child(5) { text-align: center; } /* Last Active */
  th:nth-child(6) { text-align: right; } /* Actions */
`;

const StaffTableRow = styled.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 14px;
    margin-bottom: 10px;
    background: white;
    border-radius: 10px;
    border: 1px solid #E6EBF1;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const StaffTableCell = styled.td`
  padding: 16px;
  font-size: 14px;
  color: #0A2540;
  vertical-align: middle;

  /* 정렬 규칙: Role, Status, Last Active는 가운데, Actions는 우측 */
  &:nth-child(3) { text-align: center; } /* Role */
  &:nth-child(4) { text-align: center; } /* Status */
  &:nth-child(5) { text-align: center; } /* Last Active */
  &:nth-child(6) { text-align: right; } /* Actions */

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 5px);
    min-width: 140px;
    padding: 0;
    text-align: left !important;

    &:before {
      content: attr(data-label);
      display: block;
      font-size: 10px;
      font-weight: 600;
      color: #9CA3AF;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    &:last-child {
      flex: 1 1 100%;
      padding-top: 10px;
      margin-top: 10px;
      border-top: 1px solid #F3F4F6;

      &:before {
        display: none;
      }
    }
  }
`;

const StaffInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StaffDetails = styled.div``;

const StaffName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`;

const StaffEmail = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${props => props.status === 'active' ? '#ECFDF5' : '#FEF2F2'};
  color: ${props => props.status === 'active' ? '#059669' : '#DC2626'};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  color: #6B7280;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: #F4F3FF;
  }
`;


const ManagerStaffManagementPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, handleTabChange] = useTabParam<'all' | 'restaurant_admin' | 'restaurant_staff'>('all');
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [restaurantFilter, setRestaurantFilter] = useState('all');

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const managerId = user?.managerId || user?.id || '2';

        const token = localStorage.getItem('auth_token');
        const headers = { 'Authorization': `Bearer ${token}` };

        const usersResponse = await fetch('/api/users', { headers });

        if (usersResponse.ok) {
          const usersData = await usersResponse.json();

          const restaurantsResponse = await fetch(`/api/restaurants/manager/${managerId}`, { headers });
          const restaurantsData = restaurantsResponse.ok ? await restaurantsResponse.json() : [];

          const restaurantMap: Record<number, string> = {};
          restaurantsData.forEach((restaurant: any) => {
            restaurantMap[restaurant.id] = restaurant.name;
          });

          const usersArray = usersData.data || usersData;
          const transformedStaff: Staff[] = usersArray
            .filter((u: any) => {
              // Only show Restaurant Admin and Staff roles
              if (u.role !== 'Restaurant Admin' && u.role !== 'Staff') {
                return false;
              }
              // Show staff that belong to restaurants managed by this manager
              if (u.restaurant_id && restaurantsData.some((r: any) => r.id === u.restaurant_id)) {
                return true;
              }
              return false;
            })
            .map((u: any) => ({
              id: u.id.toString(),
              name: u.full_name || u.username || 'Unknown',
              email: u.email,
              phone: u.phone || '-',
              role: u.role,
              department: u.role === 'Restaurant Admin' ? 'Management' : 'Restaurant Operations',
              restaurantId: u.restaurant_id?.toString(),
              restaurantName: u.restaurant_id ? restaurantMap[u.restaurant_id] || 'Unknown Restaurant' : undefined,
              status: 'active' as const,
              joinDate: u.createdAt ? new Date(u.createdAt).toISOString().split('T')[0] : '-',
              lastActive: 'Active',
              permissions: u.role === 'Restaurant Admin' ? ['pos', 'inventory', 'reports'] : ['pos']
            }));

          setStaffList(transformedStaff);
        }
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };

    if (user) {
      fetchStaff();
    } else {
      setStaffList([]);
    }
  }, [user]);

  // Filter staff based on active tab and filters
  const filteredStaff = staffList.filter(staff => {
    // Tab filter
    if (activeTab === 'restaurant_admin' && staff.role !== 'Restaurant Admin') {
      return false;
    }
    if (activeTab === 'restaurant_staff' && staff.role !== 'Staff') {
      return false;
    }

    // Search filter
    if (searchQuery && !staff.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !staff.email.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Role filter
    if (roleFilter !== 'all' && staff.role !== roleFilter) {
      return false;
    }

    // Status filter
    if (statusFilter !== 'all' && staff.status !== statusFilter) {
      return false;
    }

    // Restaurant filter
    if (restaurantFilter !== 'all' && staff.restaurantId !== restaurantFilter) {
      return false;
    }

    return true;
  });

  // Calculate statistics
  const stats = {
    total: staffList.length,
    admins: staffList.filter(s => s.role === 'Restaurant Admin').length,
    staff: staffList.filter(s => s.role === 'Staff').length,
    active: staffList.filter(s => s.status === 'active').length
  };

  const handleExportData = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      totalStaff: staffList.length,
      manager: user?.name,
      statistics: {
        total: stats.total,
        admins: stats.admins,
        staff: stats.staff,
        active: stats.active
      },
      staff: staffList.map(staff => ({
        name: staff.name,
        email: staff.email,
        phone: staff.phone,
        role: staff.role,
        department: staff.department,
        restaurantName: staff.restaurantName || '-',
        status: staff.status,
        joinDate: staff.joinDate,
        lastActive: staff.lastActive,
        permissions: staff.permissions.join(', ')
      }))
    };
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `admin-staff-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Get unique restaurants for filter
  const restaurants = Array.from(
    new Map(staffList
      .filter(s => s.restaurantId)
      .map(s => [s.restaurantId!, { id: s.restaurantId!, name: s.restaurantName! }])
    ).values()
  );

  // Get unique roles for filter
  const roles = Array.from(new Set(staffList.map(s => s.role)));

  return (
    <Container>
      <Header>
        <Title>Admin & Staff</Title>
        <ActionSection>
          <Button variant="secondary" onClick={handleExportData}>Export Data</Button>
        </ActionSection>
      </Header>

      <Content>
        <Tabs>
          <Tab active={activeTab === 'all'} onClick={() => handleTabChange('all')}>
            All <Badge count={stats.total} showZero />
          </Tab>
          <Tab active={activeTab === 'restaurant_admin'} onClick={() => handleTabChange('restaurant_admin')}>
            Restaurant Admin <Badge count={stats.admins} showZero />
          </Tab>
          <Tab active={activeTab === 'restaurant_staff'} onClick={() => handleTabChange('restaurant_staff')}>
            Restaurant Staff <Badge count={stats.staff} showZero />
          </Tab>
        </Tabs>

        <StatsGrid>
          <StatCard color="#059669">
            <StatValue>{stats.total}</StatValue>
            <StatLabel>Total</StatLabel>
            <StatSubtext>Admin & Staff</StatSubtext>
          </StatCard>
          <StatCard color="#7C3AED">
            <StatValue>{stats.active}</StatValue>
            <StatLabel>Active</StatLabel>
            <StatSubtext>{stats.total > 0 ? Math.round((stats.active/stats.total)*100) : 0}% of total</StatSubtext>
          </StatCard>
          <StatCard color="#2563EB">
            <StatValue>{stats.admins}</StatValue>
            <StatLabel>Restaurant Admin</StatLabel>
            <StatSubtext>Restaurant managers</StatSubtext>
          </StatCard>
          <StatCard color="#F59E0B">
            <StatValue>{stats.staff}</StatValue>
            <StatLabel>Restaurant Staff</StatLabel>
            <StatSubtext>From {restaurants.length} restaurants</StatSubtext>
          </StatCard>
        </StatsGrid>

        <FilterBar>
          <SearchInput
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <FilterSelect
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </FilterSelect>

          <FilterSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </FilterSelect>

          <FilterSelect
            value={restaurantFilter}
            onChange={(e) => setRestaurantFilter(e.target.value)}
          >
            <option value="all">All Restaurants</option>
            {restaurants.map(rest => (
              <option key={rest.id} value={rest.id}>{rest.name}</option>
            ))}
          </FilterSelect>
        </FilterBar>

        <StaffTableContainer>
          {filteredStaff.length === 0 ? (
            <EmptyState>
              <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                No admin or staff found
              </div>
              <div style={{ fontSize: '14px' }}>
                Try adjusting your filters
              </div>
            </EmptyState>
          ) : (
            <StaffTable>
              <StaffTableHead>
                <tr>
                  <th>Name</th>
                  <th>Restaurant</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Active</th>
                  <th>Actions</th>
                </tr>
              </StaffTableHead>
              <tbody>
                {filteredStaff.map(staff => (
                  <StaffTableRow key={staff.id}>
                    <StaffTableCell data-label="Name">
                      <StaffInfo>
                        <StaffDetails>
                          <StaffName>{staff.name}</StaffName>
                          <StaffEmail>{staff.email}</StaffEmail>
                        </StaffDetails>
                      </StaffInfo>
                    </StaffTableCell>

                    <StaffTableCell data-label="Restaurant">
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#0A2540' }}>
                        {staff.restaurantName || '-'}
                      </div>
                    </StaffTableCell>

                    <StaffTableCell data-label="Role">
                      {staff.role}
                    </StaffTableCell>

                    <StaffTableCell data-label="Status">
                      <StatusBadge status={staff.status}>
                        {staff.status}
                      </StatusBadge>
                    </StaffTableCell>

                    <StaffTableCell data-label="Last Active">
                      {staff.lastActive}
                    </StaffTableCell>

                    <StaffTableCell data-label="">
                      <ActionButtons>
                        <ActionButton onClick={() => window.open(`/restaurant/${staff.restaurantId}/staff`, '_blank')}>
                          View
                        </ActionButton>
                      </ActionButtons>
                    </StaffTableCell>
                  </StaffTableRow>
                ))}
              </tbody>
            </StaffTable>
          )}
        </StaffTableContainer>
      </Content>
    </Container>
  );
};

export default ManagerStaffManagementPage;