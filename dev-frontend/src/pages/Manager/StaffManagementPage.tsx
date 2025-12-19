import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { TabContainer, Tab, StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { useAuth } from '../../contexts/AuthContext';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';

interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'restaurant_staff' | 'company_staff' | 'freelancer';
  role: string;
  department: string;
  restaurantId?: string;
  restaurantName?: string;
  status: 'active' | 'inactive';
  joinDate: string;
  lastActive: string;
  salary?: number;
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

// TabContainer and Tab components now imported from ../../components/UI

const Content = styled.div`
  padding: 32px;
`;


const StatSubtext = styled.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;
`;


const StaffTable = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1fr 1fr 150px;
  gap: 16px;
  padding: 16px 24px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1fr 1fr 150px;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #F3F4F6;
  align-items: center;
  transition: all 0.2s;
  
  &:hover {
    background: #F8FAFC;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const StaffInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StaffAvatar = styled.div<{ type: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  color: white;
  background: ${props => {
    switch(props.type) {
      case 'restaurant_staff': return '#059669';
      case 'company_staff': return '#7C3AED';
      case 'freelancer': return '#DC2626';
      default: return '#6B7280';
    }
  }};
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

const TypeBadge = styled.span<{ type: string }>`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${props => {
    switch(props.type) {
      case 'restaurant_staff': return '#ECFDF5';
      case 'company_staff': return '#EDE9FE';
      case 'freelancer': return '#FEF2F2';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.type) {
      case 'restaurant_staff': return '#059669';
      case 'company_staff': return '#7C3AED';
      case 'freelancer': return '#DC2626';
      default: return '#6B7280';
    }
  }};
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

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
`;

const Modal = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: #0A2540;
  }
`;

const FormGrid = styled.div`
  display: grid;
  gap: 20px;
  margin-bottom: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const ManagerStaffManagementPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'restaurant' | 'company' | 'freelancer'>('all');
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [restaurantFilter, setRestaurantFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('MYR');

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'restaurant_staff' as 'restaurant_staff' | 'company_staff' | 'freelancer',
    role: '',
    department: '',
    restaurantId: '',
    salary: ''
  });

  useEffect(() => {
    // Load real staff data from API
    const fetchStaff = async () => {
      try {
        const managerId = user?.managerId || user?.id || '2';
        console.log('👥 Fetching staff for manager:', managerId);
        
        // Fetch all users/staff
        const usersResponse = await fetch('/api/users');
        console.log('📡 Users API response status:', usersResponse.status);
        
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          console.log('👥 Users data from API:', usersData);
          
          // Also fetch restaurants to get restaurant names for staff
          const restaurantsResponse = await fetch(`/api/restaurants/manager/${managerId}`);
          const restaurantsData = restaurantsResponse.ok ? await restaurantsResponse.json() : [];
          console.log('🏪 Restaurants data for staff mapping:', restaurantsData);
          
          // Create a map of restaurant ID to restaurant name
          const restaurantMap: Record<number, string> = {};
          restaurantsData.forEach((restaurant: any) => {
            restaurantMap[restaurant.id] = restaurant.name;
          });
          
          // Transform backend data to match frontend interface - handle both data array and direct array
          const usersArray = usersData.data || usersData;
          const transformedStaff: Staff[] = usersArray
            .filter((user: any) => {
              // Show staff that belong to this manager (direct hierarchy)
              if (user.manager_id && user.manager_id.toString() === managerId) {
                return true;
              }
              // Also show staff for restaurants managed by this manager (indirect)
              if (user.restaurant_id && restaurantsData.some((r: any) => r.id === user.restaurant_id)) {
                return true;
              }
              // Also show company staff (no restaurant_id) if user is manager
              return user.restaurant_id === null && (user.role === 'Manager' || user.role === 'System Admin');
            })
            .map((user: any) => ({
              id: user.id.toString(),
              name: user.full_name || user.username || 'Unknown',
              email: user.email,
              phone: '+60 12-345-6789', // Default phone since not in DB
              type: user.restaurant_id ? 'restaurant_staff' as const : 'company_staff' as const,
              role: user.role,
              department: user.restaurant_id ? 'Restaurant Operations' : 'Management',
              restaurantId: user.restaurant_id?.toString(),
              restaurantName: user.restaurant_id ? restaurantMap[user.restaurant_id] || 'Unknown Restaurant' : undefined,
              status: 'active' as const,
              joinDate: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : '2024-01-01',
              lastActive: 'Active',
              permissions: user.role === 'System Admin' ? ['all'] : 
                          user.role === 'Manager' ? ['restaurants', 'staff', 'reports'] :
                          user.role === 'Restaurant Admin' ? ['pos', 'inventory', 'reports'] :
                          ['pos']
            }));
          
          console.log('✅ Transformed staff data:', transformedStaff);
          setStaffList(transformedStaff);
        } else {
          console.error('Failed to fetch users data');
        }
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };

    if (user) {
      fetchStaff();
    } else {
      // Fallback to empty array if no user
      setStaffList([]);
    }
  }, [user]);

  // Filter staff based on active tab and filters
  const filteredStaff = staffList.filter(staff => {
    // Tab filter
    if (activeTab !== 'all' && staff.type !== `${activeTab}_staff` && staff.type !== activeTab) {
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
    
    // Restaurant filter (only for restaurant staff)
    if (restaurantFilter !== 'all' && staff.restaurantId !== restaurantFilter) {
      return false;
    }
    
    return true;
  });

  // Calculate statistics
  const stats = {
    total: staffList.length,
    restaurant: staffList.filter(s => s.type === 'restaurant_staff').length,
    company: staffList.filter(s => s.type === 'company_staff').length,
    freelancer: staffList.filter(s => s.type === 'freelancer').length,
    active: staffList.filter(s => s.status === 'active').length,
    totalSalary: staffList.filter(s => s.salary).reduce((sum, s) => sum + (s.salary || 0), 0)
  };

  const handleExportData = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      totalStaff: staffList.length,
      manager: user?.name,
      statistics: {
        total: stats.total,
        restaurant: stats.restaurant,
        company: stats.company,
        freelancer: stats.freelancer,
        active: stats.active,
        monthlyPayroll: stats.totalSalary
      },
      staff: staffList.map(staff => ({
        name: staff.name,
        email: staff.email,
        phone: staff.phone,
        type: staff.type,
        role: staff.role,
        department: staff.department,
        restaurantName: staff.restaurantName || 'Head Office',
        status: staff.status,
        joinDate: staff.joinDate,
        lastActive: staff.lastActive,
        salary: staff.salary || 'N/A',
        permissions: staff.permissions.join(', ')
      }))
    };
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `staff-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddStaff = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setNewStaff({
      name: '',
      email: '',
      phone: '',
      type: 'restaurant_staff',
      role: '',
      department: '',
      restaurantId: '',
      salary: ''
    });
  };

  const handleSubmitStaff = async () => {
    if (!newStaff.name || !newStaff.email || !newStaff.restaurantId) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const managerId = user?.managerId || user?.id || '2';
      
      // Create staff user in database
      const staffUserData = {
        username: newStaff.email.split('@')[0] + '_staff',
        email: newStaff.email,
        password: 'staff123', // Default password
        role: 'Staff',
        full_name: newStaff.name,
        restaurant_id: parseInt(newStaff.restaurantId),
        manager_id: parseInt(managerId)
      };

      console.log('🔄 Creating staff user:', staffUserData);
      
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(staffUserData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Staff created successfully:', result);
        
        // Refresh staff list
        const usersResponse = await fetch('/api/users');
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          const restaurantsResponse = await fetch(`/api/restaurants/manager/${managerId}`);
          const restaurantsData = restaurantsResponse.ok ? await restaurantsResponse.json() : [];
          
          const restaurantMap: Record<number, string> = {};
          restaurantsData.forEach((restaurant: any) => {
            restaurantMap[restaurant.id] = restaurant.name;
          });
          
          const transformedStaff = usersData.data
            .filter((user: any) => {
              if (user.manager_id && user.manager_id.toString() === managerId) {
                return true;
              }
              if (user.restaurant_id && restaurantsData.some((r: any) => r.id === user.restaurant_id)) {
                return true;
              }
              return user.restaurant_id === null && (user.role === 'Manager' || user.role === 'System Admin');
            })
            .map((user: any) => ({
              id: user.id.toString(),
              name: user.full_name || user.username || 'Unknown',
              email: user.email,
              phone: newStaff.phone || '+60 12-345-6789',
              type: user.restaurant_id ? 'restaurant_staff' as const : 'company_staff' as const,
              role: user.role,
              department: user.restaurant_id ? 'Restaurant Operations' : 'Management',
              restaurantId: user.restaurant_id?.toString(),
              restaurantName: user.restaurant_id ? restaurantMap[user.restaurant_id] || 'Unknown Restaurant' : undefined,
              status: 'active' as const,
              joinDate: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : '2024-01-01',
              lastActive: 'Active',
              permissions: user.role === 'System Admin' ? ['all'] : 
                          user.role === 'Manager' ? ['restaurants', 'staff', 'reports'] :
                          user.role === 'Restaurant Admin' ? ['pos', 'inventory', 'reports'] :
                          ['pos']
            }));
          
          setStaffList(transformedStaff);
        }
        
        handleCloseModal();
        alert('Staff member added successfully! Default password: staff123');
      } else {
        const errorData = await response.json();
        console.error('Failed to create staff:', errorData);
        alert('Failed to create staff: ' + (errorData.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error creating staff:', error);
      alert('Error creating staff: ' + (error as Error).message);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewStaff(prev => ({ ...prev, [field]: value }));
  };

  const handleEditStaff = (staff: Staff) => {
    alert(`Edit ${staff.name} functionality will be implemented`);
  };

  const handleViewPermissions = (staff: Staff) => {
    alert(`${staff.name} permissions: ${staff.permissions.join(', ')}`);
  };

  const handlePromoteToAdmin = async (staff: Staff) => {
    if (staff.role === 'Restaurant Admin') {
      alert(`${staff.name} is already a Restaurant Admin`);
      return;
    }

    const confirmPromote = confirm(`Promote ${staff.name} to Restaurant Admin? They will be able to manage the restaurant independently.`);
    if (!confirmPromote) return;

    try {
      console.log(`🔄 Promoting ${staff.name} to Restaurant Admin...`);
      
      const response = await fetch(`/api/users/${staff.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: 'Restaurant Admin'
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Staff promoted successfully:', result);
        
        // Refresh staff list
        const managerId = user?.managerId || user?.id || '2';
        const usersResponse = await fetch('/api/users');
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          const restaurantsResponse = await fetch(`/api/restaurants/manager/${managerId}`);
          const restaurantsData = restaurantsResponse.ok ? await restaurantsResponse.json() : [];
          
          const restaurantMap: Record<number, string> = {};
          restaurantsData.forEach((restaurant: any) => {
            restaurantMap[restaurant.id] = restaurant.name;
          });
          
          const transformedStaff = usersData.data
            .filter((user: any) => {
              if (user.manager_id && user.manager_id.toString() === managerId) {
                return true;
              }
              if (user.restaurant_id && restaurantsData.some((r: any) => r.id === user.restaurant_id)) {
                return true;
              }
              return user.restaurant_id === null && (user.role === 'Manager' || user.role === 'System Admin');
            })
            .map((user: any) => ({
              id: user.id.toString(),
              name: user.full_name || user.username || 'Unknown',
              email: user.email,
              phone: '+60 12-345-6789',
              type: user.restaurant_id ? 'restaurant_staff' as const : 'company_staff' as const,
              role: user.role,
              department: user.restaurant_id ? 'Restaurant Operations' : 'Management',
              restaurantId: user.restaurant_id?.toString(),
              restaurantName: user.restaurant_id ? restaurantMap[user.restaurant_id] || 'Unknown Restaurant' : undefined,
              status: 'active' as const,
              joinDate: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : '2024-01-01',
              lastActive: 'Active',
              permissions: user.role === 'System Admin' ? ['all'] : 
                          user.role === 'Manager' ? ['restaurants', 'staff', 'reports'] :
                          user.role === 'Restaurant Admin' ? ['pos', 'inventory', 'reports'] :
                          ['pos']
            }));
          
          setStaffList(transformedStaff);
        }
        
        alert(`${staff.name} has been promoted to Restaurant Admin successfully!`);
      } else {
        const errorData = await response.json();
        console.error('Failed to promote staff:', errorData);
        alert('Failed to promote staff: ' + (errorData.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error promoting staff:', error);
      alert('Error promoting staff: ' + (error as Error).message);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  // Get unique restaurants for filter
  const restaurants = Array.from(
    new Map(staffList
      .filter(s => s.restaurantId)
      .map(s => [s.restaurantId!, { id: s.restaurantId!, name: s.restaurantName! }])
    ).values()
  ).concat([
    { id: 'rest-004', name: 'Satay Station' },
    { id: 'rest-005', name: 'Laksa Paradise' }
  ]);

  // Get unique roles for filter
  const roles = Array.from(new Set(staffList.map(s => s.role)));

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Staff</Title>
          <ActionSection>
            <Button variant="secondary" onClick={handleExportData}>Export Data</Button>
            <Button variant="primary" onClick={handleAddStaff}>
              + Add Staff
            </Button>
          </ActionSection>
        </Header>
        
        <Content>
          <TabContainer>
            <Tab active={activeTab === 'all'} onClick={() => setActiveTab('all')}>
              All Staff ({stats.total})
            </Tab>
            <Tab active={activeTab === 'restaurant'} onClick={() => setActiveTab('restaurant')}>
              Restaurant Staff ({stats.restaurant})
            </Tab>
            <Tab active={activeTab === 'company'} onClick={() => setActiveTab('company')}>
              Company Staff ({stats.company})
            </Tab>
            <Tab active={activeTab === 'freelancer'} onClick={() => setActiveTab('freelancer')}>
              Freelancers ({stats.freelancer})
            </Tab>
          </TabContainer>
          
          <StatsGrid>
            <StatCard color="#059669">
              <StatValue>{stats.total}</StatValue>
              <StatLabel>Total Staff</StatLabel>
              <StatSubtext>Across all categories</StatSubtext>
            </StatCard>
            <StatCard color="#7C3AED">
              <StatValue>{stats.active}</StatValue>
              <StatLabel>Active Staff</StatLabel>
              <StatSubtext>{Math.round((stats.active/stats.total)*100)}% of total</StatSubtext>
            </StatCard>
            <StatCard color="#2563EB">
              <StatValue>{stats.restaurant}</StatValue>
              <StatLabel>Restaurant Staff</StatLabel>
              <StatSubtext>From {restaurants.length} restaurants</StatSubtext>
            </StatCard>
            <StatCard color="#DC2626">
              <StatValue>{formatCurrency(stats.totalSalary, selectedCurrency)}</StatValue>
              <StatLabel>Monthly Payroll</StatLabel>
              <StatSubtext>Company staff only</StatSubtext>
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
              style={{ display: activeTab === 'all' || activeTab === 'restaurant' ? 'block' : 'none' }}
            >
              <option value="all">All Restaurants</option>
              {restaurants.map(rest => (
                <option key={rest.id} value={rest.id}>{rest.name}</option>
              ))}
            </FilterSelect>
          </FilterBar>

          <StaffTable>
            <TableHeader>
              <span>Staff Member</span>
              <span>Restaurant & Type</span>
              <span>Role</span>
              <span>Department</span>
              <span>Status</span>
              <span>Last Active</span>
              <span>Actions</span>
            </TableHeader>
            
            {filteredStaff.length === 0 ? (
              <EmptyState>
                <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                  No staff found
                </div>
                <div style={{ fontSize: '14px' }}>
                  Try adjusting your filters or add new staff members
                </div>
              </EmptyState>
            ) : (
              filteredStaff.map(staff => (
                <TableRow key={staff.id}>
                  <StaffInfo>
                    <StaffAvatar type={staff.type}>
                      {getInitials(staff.name)}
                    </StaffAvatar>
                    <StaffDetails>
                      <StaffName>{staff.name}</StaffName>
                      <StaffEmail>{staff.email}</StaffEmail>
                    </StaffDetails>
                  </StaffInfo>
                  
                  <div>
                    {staff.restaurantName ? (
                      <>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#0A2540', marginBottom: '4px' }}>
                          {staff.restaurantName}
                        </div>
                        <TypeBadge type={staff.type}>
                          {staff.type.replace('_', ' ')}
                        </TypeBadge>
                      </>
                    ) : (
                      <>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#0A2540', marginBottom: '4px' }}>
                          Head Office
                        </div>
                        <TypeBadge type={staff.type}>
                          {staff.type.replace('_', ' ')}
                        </TypeBadge>
                      </>
                    )}
                  </div>
                  
                  <div style={{ fontSize: '14px', color: '#374151' }}>
                    {staff.role}
                  </div>
                  
                  <div style={{ fontSize: '14px', color: '#6B7280' }}>
                    {staff.department}
                  </div>
                  
                  <StatusBadge status={staff.status}>
                    {staff.status}
                  </StatusBadge>
                  
                  <div style={{ fontSize: '13px', color: '#6B7280' }}>
                    {staff.lastActive}
                  </div>
                  
                  <ActionButtons>
                    <ActionButton onClick={() => handleEditStaff(staff)}>
                      Edit
                    </ActionButton>
                    <ActionButton onClick={() => handleViewPermissions(staff)}>
                      Permissions
                    </ActionButton>
                    {staff.type === 'restaurant_staff' && staff.role === 'Staff' && (
                      <ActionButton 
                        onClick={() => handlePromoteToAdmin(staff)}
                        style={{ 
                          backgroundColor: '#635BFF', 
                          color: 'white', 
                          borderColor: '#635BFF' 
                        }}
                      >
                        Promote to Admin
                      </ActionButton>
                    )}
                  </ActionButtons>
                </TableRow>
              ))
            )}
          </StaffTable>
        </Content>
        
        <Modal show={showAddModal}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Add New Staff Member</ModalTitle>
              <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            </ModalHeader>
            
            <FormGrid>
              <FormGroup>
                <Label>Full Name</Label>
                <Input
                  type="text"
                  value={newStaff.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter full name"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={newStaff.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Phone</Label>
                <Input
                  type="text"
                  value={newStaff.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Staff Type</Label>
                <Select
                  value={newStaff.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                >
                  <option value="restaurant_staff">Restaurant Staff</option>
                  <option value="company_staff">Company Staff</option>
                  <option value="freelancer">Freelancer</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label>Role</Label>
                <Input
                  type="text"
                  value={newStaff.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  placeholder="e.g. Manager, Cashier, Kitchen Head"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Department</Label>
                <Input
                  type="text"
                  value={newStaff.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  placeholder="e.g. Operations, Service, Kitchen"
                />
              </FormGroup>
              
              {newStaff.type === 'restaurant_staff' && (
                <FormGroup>
                  <Label>Restaurant</Label>
                  <Select
                    value={newStaff.restaurantId}
                    onChange={(e) => handleInputChange('restaurantId', e.target.value)}
                  >
                    <option value="">Select Restaurant</option>
                    {restaurants.map(restaurant => (
                      <option key={restaurant.id} value={restaurant.id}>
                        {restaurant.name}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
              )}
              
              {newStaff.type === 'company_staff' && (
                <FormGroup>
                  <Label>Monthly Salary (RM)</Label>
                  <Input
                    type="number"
                    value={newStaff.salary}
                    onChange={(e) => handleInputChange('salary', e.target.value)}
                    placeholder="Enter monthly salary"
                  />
                </FormGroup>
              )}
            </FormGrid>
            
            <ModalActions>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSubmitStaff}>
                Add Staff
              </Button>
            </ModalActions>
          </ModalContent>
        </Modal>
      </Container>
    </MainLayout>
  );
};

export default ManagerStaffManagementPage;