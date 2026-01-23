import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { useAuth } from '../../contexts/AuthContext';
import { StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI';

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

const StaffContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
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

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: ${props => props.variant === 'primary' ? 'none' : '1px solid #E6EBF1'};
  background: ${props => props.variant === 'primary' ? '#635BFF' : 'white'};
  color: ${props => props.variant === 'primary' ? 'white' : '#6B7C93'};
  
  &:hover {
    background: ${props => props.variant === 'primary' ? '#5A51E6' : '#F6F9FC'};
    transform: translateY(-1px);
  }
`;

const Content = styled.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;


const FilterBar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 300px;
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

const StaffList = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`;

const StaffHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 150px;
  gap: 16px;
  padding: 16px 20px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StaffItem = styled.div<{ clickable?: boolean }>`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 150px;
  gap: 16px;
  padding: 16px 20px;
  border-bottom: 1px solid #F6F9FC;
  align-items: center;
  transition: all 0.2s;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  
  &:hover {
    background: ${props => props.clickable ? '#F8FAFC' : 'transparent'};
  }
  
  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 16px;
  }
`;

const StaffInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StaffAvatar = styled.div<{ role: string }>`
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
    switch(props.role.toLowerCase()) {
      case 'restaurant admin': return '#DC2626';
      case 'manager': return '#7C3AED';
      case 'staff': return '#059669';
      case 'cashier': return '#2563EB';
      case 'kitchen': return '#059669';
      default: return '#6B7280';
    }
  }};
`;

const StaffDetails = styled.div`
  flex: 1;
`;

const StaffName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 2px;
`;

const StaffMeta = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const RoleBadge = styled.span<{ role: string }>`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch(props.role.toLowerCase()) {
      case 'restaurant admin': return '#FEE2E2';
      case 'manager': return '#EDE9FE';
      case 'staff': return '#ECFDF5';
      case 'cashier': return '#DBEAFE';
      case 'kitchen': return '#ECFDF5';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.role.toLowerCase()) {
      case 'restaurant admin': return '#DC2626';
      case 'manager': return '#7C3AED';
      case 'staff': return '#059669';
      case 'cashier': return '#1E40AF';
      case 'kitchen': return '#059669';
      default: return '#6B7280';
    }
  }};
`;

const StatusBadge = styled.span<{ active: boolean }>`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => props.active ? '#ECFDF5' : '#FEF2F2'};
  color: ${props => props.active ? '#059669' : '#DC2626'};
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
  margin-right: 8px;
  
  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: #F4F3FF;
  }
  
  &:last-child {
    margin-right: 0;
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

const StaffPage: React.FC = () => {
  const { user } = useAuth();
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Staff',
    department: 'Operations'
  });

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        console.log('👥 [Restaurant] Fetching staff for restaurant...');
        
        // Get current user's restaurant ID
        const restaurantId = user?.restaurantId;
        console.log('🏪 Current restaurant ID:', restaurantId);
        
        // Fetch all users
        const usersResponse = await fetch('/api/users');
        console.log('📡 Users API response status:', usersResponse.status);
        
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          console.log('👥 All users data from API:', usersData);
          
          // Handle both data array and direct array response
          const usersArray = usersData.data || usersData;
          
          // Filter staff for current restaurant
          const restaurantStaff = usersArray.filter((user: any) => {
            // Show staff from current restaurant
            return user.restaurant_id === restaurantId || user.restaurant_id?.toString() === restaurantId?.toString();
          });
          
          console.log('🏪 Filtered restaurant staff:', restaurantStaff);
          
          // Transform to staff format
          const transformedStaff: Staff[] = restaurantStaff.map((user: any) => ({
            id: user.id.toString(),
            name: user.full_name || user.username || 'Unknown',
            email: user.email,
            phone: user.phone || '+60 12-345-6789',
            role: user.role,
            department: user.department || 'Operations',
            restaurantId: user.restaurant_id?.toString(),
            status: 'active' as const,
            joinDate: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : '2024-01-01',
            lastActive: 'Active',
            permissions: user.role === 'Restaurant Admin' ? ['pos', 'inventory', 'reports'] : ['pos']
          }));
          
          console.log('✅ [Restaurant] Transformed staff data:', transformedStaff);
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
      setStaffList([]);
    }
  }, [user]);

  const filteredStaff = staffList.filter(staff => {
    if (searchQuery && !staff.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !staff.email.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const stats = {
    total: staffList.length,
    active: staffList.filter(s => s.status === 'active').length,
    admins: staffList.filter(s => s.role === 'Restaurant Admin').length,
    staff: staffList.filter(s => s.role === 'Staff').length,
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
      role: 'Staff',
      department: 'Operations'
    });
  };

  const handleSubmitStaff = async () => {
    if (!newStaff.name || !newStaff.email) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const restaurantId = user?.restaurantId;
      
      const staffUserData = {
        username: newStaff.email.split('@')[0],
        email: newStaff.email,
        password: 'staff123',
        role: newStaff.role,
        full_name: newStaff.name,
        restaurant_id: parseInt(restaurantId?.toString() || '0'),
        phone: newStaff.phone,
        department: newStaff.department
      };

      console.log('🔄 [Restaurant] Creating new staff user:', staffUserData);
      
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(staffUserData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ [Restaurant] Staff created successfully:', result);
        
        // Refresh staff list
        const usersResponse = await fetch('/api/users');
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          const usersArray = usersData.data || usersData;
          
          const restaurantStaff = usersArray.filter((user: any) => {
            return user.restaurant_id === restaurantId || user.restaurant_id?.toString() === restaurantId?.toString();
          });
          
          const transformedStaff: Staff[] = restaurantStaff.map((user: any) => ({
            id: user.id.toString(),
            name: user.full_name || user.username || 'Unknown',
            email: user.email,
            phone: user.phone || newStaff.phone || '+60 12-345-6789',
            role: user.role,
            department: user.department || 'Operations',
            restaurantId: user.restaurant_id?.toString(),
            status: 'active' as const,
            joinDate: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : '2024-01-01',
            lastActive: 'Active',
            permissions: user.role === 'Restaurant Admin' ? ['pos', 'inventory', 'reports'] : ['pos']
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

  const handlePromoteStaff = async (staff: Staff) => {
    if (staff.role === 'Restaurant Admin') {
      alert(`${staff.name} is already a Restaurant Admin`);
      return;
    }

    const confirmPromote = confirm(`Promote ${staff.name} to Restaurant Admin?`);
    if (!confirmPromote) return;

    try {
      console.log(`🔄 [Restaurant] Promoting ${staff.name} to Restaurant Admin...`);
      
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
        // Refresh staff list
        const restaurantId = user?.restaurantId;
        const usersResponse = await fetch('/api/users');
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          const usersArray = usersData.data || usersData;
          
          const restaurantStaff = usersArray.filter((user: any) => {
            return user.restaurant_id === restaurantId || user.restaurant_id?.toString() === restaurantId?.toString();
          });
          
          const transformedStaff: Staff[] = restaurantStaff.map((user: any) => ({
            id: user.id.toString(),
            name: user.full_name || user.username || 'Unknown',
            email: user.email,
            phone: user.phone || '+60 12-345-6789',
            role: user.role,
            department: user.department || 'Operations',
            restaurantId: user.restaurant_id?.toString(),
            status: 'active' as const,
            joinDate: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : '2024-01-01',
            lastActive: 'Active',
            permissions: user.role === 'Restaurant Admin' ? ['pos', 'inventory', 'reports'] : ['pos']
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

  return (
    <MainLayout>
      <StaffContainer>
        <Header>
          <HeaderTitle>Restaurant Staff</HeaderTitle>
          <HeaderActions>
            <Button variant="secondary" onClick={() => alert('Export functionality will be implemented')}>
              Export
            </Button>
            <Button variant="primary" onClick={handleAddStaff}>
              Add Staff
            </Button>
          </HeaderActions>
        </Header>

        <Content>
          <StatsGrid>
            <StatCard color="#059669">
              <StatValue>{stats.total}</StatValue>
              <StatLabel>Total Staff</StatLabel>
            </StatCard>
            <StatCard color="#7C3AED">
              <StatValue>{stats.active}</StatValue>
              <StatLabel>Active Staff</StatLabel>
            </StatCard>
            <StatCard color="#DC2626">
              <StatValue>{stats.admins}</StatValue>
              <StatLabel>Admins</StatLabel>
            </StatCard>
            <StatCard color="#2563EB">
              <StatValue>{stats.staff}</StatValue>
              <StatLabel>Staff Members</StatLabel>
            </StatCard>
          </StatsGrid>

          <FilterBar>
            <SearchInput
              type="text"
              placeholder="Search staff by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </FilterBar>

          <StaffList>
            <StaffHeader>
              <span>Staff Member</span>
              <span>Role</span>
              <span>Department</span>
              <span>Status</span>
              <span>Actions</span>
            </StaffHeader>
            
            {filteredStaff.length === 0 ? (
              <EmptyState>
                <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                  No staff found
                </div>
                <div style={{ fontSize: '14px' }}>
                  Add staff members to manage your restaurant team
                </div>
              </EmptyState>
            ) : (
              filteredStaff.map(staff => (
                <StaffItem key={staff.id}>
                  <StaffInfo>
                    <StaffAvatar role={staff.role}>
                      {getInitials(staff.name)}
                    </StaffAvatar>
                    <StaffDetails>
                      <StaffName>{staff.name}</StaffName>
                      <StaffMeta>{staff.email}</StaffMeta>
                    </StaffDetails>
                  </StaffInfo>
                  
                  <RoleBadge role={staff.role}>
                    {staff.role}
                  </RoleBadge>
                  
                  <div style={{ fontSize: '14px', color: '#6B7280' }}>
                    {staff.department}
                  </div>
                  
                  <StatusBadge active={staff.status === 'active'}>
                    {staff.status}
                  </StatusBadge>
                  
                  <div>
                    <ActionButton onClick={() => handleEditStaff(staff)}>
                      Edit
                    </ActionButton>
                    {staff.role === 'Staff' && (
                      <ActionButton 
                        onClick={() => handlePromoteStaff(staff)}
                        style={{ 
                          backgroundColor: '#635BFF', 
                          color: 'white', 
                          borderColor: '#635BFF' 
                        }}
                      >
                        Promote
                      </ActionButton>
                    )}
                  </div>
                </StaffItem>
              ))
            )}
          </StaffList>
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
                <Label>Role</Label>
                <Select
                  value={newStaff.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                >
                  <option value="Staff">Staff</option>
                  <option value="Restaurant Admin">Restaurant Admin</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label>Department</Label>
                <Select
                  value={newStaff.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                >
                  <option value="Operations">Operations</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Service">Service</option>
                  <option value="Management">Management</option>
                </Select>
              </FormGroup>
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
      </StaffContainer>
    </MainLayout>
  );
};

export default StaffPage;