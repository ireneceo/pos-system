import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { useAuth } from '../../contexts/AuthContext';
import { StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI';
import { Modal, ModalButton, ModalWarning, FormRow, FormGroup, FormLabel, FormInput, FormSelect } from '../../components/UI/Modal';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import PhoneInput from '../../components/Common/PhoneInput';

interface Staff {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  pin_code?: string | null;
  company_name?: string;
  restaurantId?: string;
  restaurantName?: string;
  status: 'active' | 'inactive';
  joinDate: string;
  permissions: string[];
}

// Staff 권한 토글용 메뉴 그룹 (hasMenuPermission으로 체크하는 항목만)
// Dashboard, POS Terminal, Live Orders, Kitchen/Customer Display, Mobile Order, Profile은
// MainLayout에서 항상 표시되므로 여기에 포함하지 않음
const MENU_GROUPS = [
  { key: 'menu_management', label: 'Products (Menu / Categories / Options / Recipe)', alwaysOn: false },
  { key: 'inventory', label: 'Stock Management (Suppliers / Inventory)', alwaysOn: false },
  { key: 'marketing', label: 'Marketing (Customers / Coupons)', alwaysOn: false },
  { key: 'reports', label: 'Analytics (Reports / Activity History)', alwaysOn: false },
  { key: 'support', label: 'Support (Invoices / Inquiries)', alwaysOn: false },
  { key: 'settings', label: 'Settings (Store / Company / Notifications)', alwaysOn: false },
];

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

const StaffList = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`;

const StaffHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 80px 1fr 150px;
  gap: 16px;
  padding: 16px 20px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StaffItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 80px 1fr 150px;
  gap: 16px;
  padding: 16px 20px;
  border-bottom: 1px solid #F6F9FC;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background: #F8FAFC;
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
  flex-shrink: 0;
  background: ${props => {
    switch(props.role.toLowerCase()) {
      case 'restaurant admin': return '#DC2626';
      case 'staff': return '#059669';
      default: return '#6B7280';
    }
  }};
`;

const StaffDetails = styled.div`
  flex: 1;
  min-width: 0;
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
  display: inline-block;
  background: ${props => {
    switch(props.role.toLowerCase()) {
      case 'restaurant admin': return '#FEE2E2';
      case 'staff': return '#ECFDF5';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.role.toLowerCase()) {
      case 'restaurant admin': return '#DC2626';
      case 'staff': return '#059669';
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

const ActionGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
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


// Menu Access 체크박스 스타일
const PermissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 8px;
`;

const PermissionLabel = styled.label<{ alwaysOn?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 6px;
  background: ${props => props.alwaysOn ? '#F0FDF4' : 'white'};
  border: 1px solid ${props => props.alwaysOn ? '#BBF7D0' : '#E6EBF1'};
  cursor: ${props => props.alwaysOn ? 'default' : 'pointer'};
  font-size: 13px;
  color: ${props => props.alwaysOn ? '#166534' : '#374151'};
  opacity: ${props => props.alwaysOn ? 0.8 : 1};
  transition: all 0.15s;

  &:hover {
    border-color: ${props => props.alwaysOn ? '#BBF7D0' : '#635BFF'};
  }
`;

const AlwaysOnBadge = styled.span`
  font-size: 11px;
  color: #16A34A;
`;

const StaffPage: React.FC = () => {
  const { user } = useAuth();
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  // Add Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStaff, setNewStaff] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    role: 'Staff',
    department: '',
    company_name: '',
    pin_code: '',
    permissions: [] as string[]
  });

  // Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    company_name: '',
    pin_code: '',
    permissions: [] as string[]
  });

  // Password display modal
  const [tempPassword, setTempPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);

  // Error/Notice modal
  const [errorMessage, setErrorMessage] = useState('');

  // Promote confirmation modal (disabled - 1:1 admin constraint)
  // const [confirmPromoteTarget, setConfirmPromoteTarget] = useState<Staff | null>(null);

  // Reset Password
  const [resetPasswordTarget, setResetPasswordTarget] = useState<Staff | null>(null);
  const [resetPasswordResult, setResetPasswordResult] = useState('');

  // Form error (shown inside modal)
  const [formError, setFormError] = useState('');

  const fetchStaff = useCallback(async () => {
    try {
      const restaurantId = user?.restaurantId;
      const token = localStorage.getItem('auth_token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const usersResponse = await fetch('/api/users', { headers });

      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        const usersArray = usersData.data || usersData;

        const restaurantStaff = usersArray.filter((u: any) => {
          return u.restaurant_id === restaurantId || u.restaurant_id?.toString() === restaurantId?.toString();
        });

        const transformedStaff: Staff[] = restaurantStaff.map((u: any) => ({
          id: u.id.toString(),
          username: u.username || '',
          name: u.full_name || u.username || 'Unknown',
          email: u.email,
          phone: u.phone || '',
          role: u.role,
          department: u.department || '',
          pin_code: u.pin_code || null,
          company_name: u.company_name || '',
          restaurantId: u.restaurant_id?.toString(),
          status: 'active' as const,
          joinDate: u.createdAt ? new Date(u.createdAt).toISOString().split('T')[0] : '',
          permissions: (() => {
            if (Array.isArray(u.permissions)) return u.permissions;
            if (typeof u.permissions === 'string') {
              try { return JSON.parse(u.permissions); } catch { return []; }
            }
            return [];
          })()
        }));

        setStaffList(transformedStaff);
      }
    } catch (_) { /* silently fail */ }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchStaff();
    } else {
      setStaffList([]);
    }
  }, [user, fetchStaff]);

  const filteredStaff = staffList.filter(staff => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!staff.name.toLowerCase().includes(q) &&
          !staff.email.toLowerCase().includes(q) &&
          !staff.department.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (roleFilter && staff.role !== roleFilter) return false;
    return true;
  });

  const stats = {
    total: staffList.length,
    active: staffList.filter(s => s.status === 'active').length,
    admins: staffList.filter(s => s.role === 'Restaurant Admin').length,
    staff: staffList.filter(s => s.role === 'Staff').length,
  };

  // === Add Modal ===
  const handleOpenAddModal = () => {
    setNewStaff({
      username: '',
      name: '',
      email: '',
      phone: '',
      role: 'Staff',
      department: '',
      company_name: '',
      pin_code: '',
      permissions: []
    });
    setFormError('');
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setFormError('');
  };

  const handleAddInputChange = (field: string, value: string) => {
    setNewStaff(prev => ({ ...prev, [field]: value }));
    if (formError) setFormError('');
  };

  const handleSubmitStaff = async () => {
    if (!newStaff.username || newStaff.username.trim() === '') {
      setFormError('Staff ID (Username) is required.');
      return;
    }
    if (!newStaff.name || newStaff.name.trim() === '') {
      setFormError('Full Name is required.');
      return;
    }
    if (!newStaff.email || newStaff.email.trim() === '') {
      setFormError('Email is required.');
      return;
    }
    if (!newStaff.pin_code || newStaff.pin_code.length !== 4) {
      setFormError('A 4-digit PIN code is required for POS cashier switch.');
      return;
    }

    try {
      const restaurantId = user?.restaurantId;
      const staffUserData: Record<string, any> = {
        username: newStaff.username.trim(),
        email: newStaff.email.trim(),
        role: newStaff.role,
        full_name: newStaff.name.trim(),
        restaurant_id: parseInt(restaurantId?.toString() || '0'),
        phone: newStaff.phone ? newStaff.phone.trim() : null,
        department: newStaff.department ? newStaff.department.trim() : null,
        company_name: newStaff.company_name ? newStaff.company_name.trim() : null,
        pin_code: newStaff.pin_code,
        permissions: newStaff.role === 'Staff' ? JSON.stringify(newStaff.permissions) : '[]'
      };

      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(staffUserData)
      });

      if (response.ok) {
        const result = await response.json();
        await fetchStaff();

        const generatedPw = result.generatedPassword;
        handleCloseAddModal();
        if (generatedPw) {
          setTempPassword(generatedPw);
          setShowPasswordModal(true);
        }
      } else {
        const errorData = await response.json();
        setFormError(errorData.error || 'Failed to create staff');
      }
    } catch (error) {
      setFormError((error as Error).message);
    }
  };

  // === Edit Modal ===
  const handleOpenEditModal = (staff: Staff) => {
    setEditingStaff(staff);
    setEditForm({
      name: staff.name,
      email: staff.email,
      phone: staff.phone,
      department: staff.department,
      company_name: staff.company_name || '',
      pin_code: staff.pin_code || '',
      permissions: [...staff.permissions]
    });
    setFormError('');
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingStaff(null);
    setFormError('');
  };

  const handleEditInputChange = (field: string, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
    if (formError) setFormError('');
  };

  const handleUpdateStaff = async () => {
    if (!editingStaff) return;

    if (!editForm.name || editForm.name.trim() === '') {
      setFormError('Full Name is required.');
      return;
    }
    if (!editForm.email || editForm.email.trim() === '') {
      setFormError('Email is required.');
      return;
    }
    if (editForm.pin_code && editForm.pin_code.length !== 4) {
      setFormError('PIN code must be exactly 4 digits.');
      return;
    }

    try {
      const updateData: Record<string, any> = {
        full_name: editForm.name.trim(),
        email: editForm.email.trim(),
        phone: editForm.phone ? editForm.phone.trim() : null,
        department: editForm.department ? editForm.department.trim() : null,
        company_name: editForm.company_name ? editForm.company_name.trim() : null,
      };

      if (editForm.pin_code) {
        updateData.pin_code = editForm.pin_code;
      }

      // Staff 역할이면 permissions 업데이트
      if (editingStaff.role === 'Staff') {
        updateData.permissions = JSON.stringify(editForm.permissions);
      }

      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/users/${editingStaff.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        await fetchStaff();
        handleCloseEditModal();
      } else {
        const errorData = await response.json();
        setFormError(errorData.error || 'Failed to update staff');
      }
    } catch (error) {
      setFormError((error as Error).message);
    }
  };

  // === Promote === (disabled - 1:1 admin constraint prevents promotion)

  // === Reset Password ===
  const executeResetPassword = async () => {
    const staff = resetPasswordTarget;
    if (!staff) return;
    setResetPasswordTarget(null);

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/users/${staff.id}/reset-password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.tempPassword) {
          setTempPassword(result.tempPassword);
          setShowPasswordModal(true);
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to reset password');
      }
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2) || '?';
  };

  // Permission toggle helper
  const renderPermissionCheckboxes = (
    permissions: string[],
    onChange: (updated: string[]) => void
  ) => (
    <div style={{ marginTop: '20px', padding: '16px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E6EBF1' }}>
      <div style={{ fontSize: '14px', fontWeight: 600, color: '#0A2540', marginBottom: '4px' }}>Menu Access</div>
      <div style={{ fontSize: '12px', color: '#6B7C93', marginBottom: '4px' }}>
        Core menus are always visible: Dashboard, POS Terminal, Live Orders, Kitchen Display, Customer Display, Mobile Order, Profile.
      </div>
      <div style={{ fontSize: '12px', color: '#6B7C93', marginBottom: '12px' }}>
        Toggle additional menu sections below:
      </div>
      <PermissionGrid>
        {MENU_GROUPS.map(group => (
          <PermissionLabel key={group.key} alwaysOn={group.alwaysOn}>
            <input
              type="checkbox"
              checked={group.alwaysOn || permissions.includes(group.key)}
              disabled={group.alwaysOn}
              onChange={(e) => {
                if (group.alwaysOn) return;
                const updated = e.target.checked
                  ? [...permissions, group.key]
                  : permissions.filter(p => p !== group.key);
                onChange(updated);
              }}
              style={{ accentColor: '#635BFF' }}
            />
            {group.label}
            {group.alwaysOn && <AlwaysOnBadge>(Always ON)</AlwaysOnBadge>}
          </PermissionLabel>
        ))}
      </PermissionGrid>
    </div>
  );

  return (
    <>
      <StaffContainer>
        <Header>
          <HeaderTitle>Restaurant Staff</HeaderTitle>
          <HeaderActions>
            <Button variant="primary" onClick={handleOpenAddModal}>
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
              placeholder="Search by name, email, department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
            />
            <FilterSelect
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="Restaurant Admin">Restaurant Admin</option>
              <option value="Staff">Staff</option>
            </FilterSelect>
          </FilterBar>

          <StaffList>
            <StaffHeader>
              <span>Staff Member</span>
              <span>Role</span>
              <span>Department</span>
              <span>PIN</span>
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
                    {staff.department || '—'}
                  </div>

                  <div style={{ fontSize: '14px', color: '#6B7280', fontFamily: 'monospace', letterSpacing: '2px' }}>
                    {staff.pin_code ? '****' : '—'}
                  </div>

                  <StatusBadge active={staff.status === 'active'}>
                    {staff.status}
                  </StatusBadge>

                  <ActionGroup>
                    <ActionButton onClick={() => handleOpenEditModal(staff)}>
                      Edit
                    </ActionButton>
                    {staff.role === 'Staff' && (
                      <ActionButton onClick={() => setResetPasswordTarget(staff)}>
                        Reset PW
                      </ActionButton>
                    )}
                  </ActionGroup>
                </StaffItem>
              ))
            )}
          </StaffList>
        </Content>

        {/* ===== Add Staff Modal (Portal) ===== */}
        <Modal
          isOpen={showAddModal}
          onClose={handleCloseAddModal}
          title="Add New Staff Member"
          size="large"
          footer={
            <>
              <ModalButton variant="secondary" onClick={handleCloseAddModal}>Cancel</ModalButton>
              <ModalButton variant="primary" onClick={handleSubmitStaff}>Add Staff</ModalButton>
            </>
          }
        >
          <FormRow>
            <FormGroup>
              <FormLabel>Staff ID (Username) *</FormLabel>
              <FormInput
                type="text"
                value={newStaff.username}
                onChange={(e) => handleAddInputChange('username', e.target.value)}
                placeholder="Enter unique staff ID"
                autoComplete="off"
              />
              <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                A strong password will be auto-generated
              </div>
            </FormGroup>
            <FormGroup>
              <FormLabel>Full Name *</FormLabel>
              <FormInput
                type="text"
                value={newStaff.name}
                onChange={(e) => handleAddInputChange('name', e.target.value)}
                placeholder="Enter full name"
                autoComplete="off"
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <FormLabel>Email *</FormLabel>
              <FormInput
                type="email"
                value={newStaff.email}
                onChange={(e) => handleAddInputChange('email', e.target.value)}
                placeholder="Enter email address"
                autoComplete="off"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Phone</FormLabel>
              <PhoneInput
                value={newStaff.phone}
                onChange={(value) => handleAddInputChange('phone', value)}
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <FormLabel>Role</FormLabel>
              <FormSelect
                value={newStaff.role}
                onChange={(e) => handleAddInputChange('role', e.target.value)}
              >
                <option value="Staff">Staff</option>
                <option value="Restaurant Admin">Restaurant Admin</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>Department</FormLabel>
              <FormInput
                type="text"
                value={newStaff.department}
                onChange={(e) => handleAddInputChange('department', e.target.value)}
                placeholder="e.g. Operations, Kitchen, Service"
                autoComplete="off"
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <FormLabel>Company Name</FormLabel>
              <FormInput
                type="text"
                value={newStaff.company_name}
                onChange={(e) => handleAddInputChange('company_name', e.target.value)}
                placeholder="Enter company name"
                autoComplete="off"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>PIN Code (4 digits) *</FormLabel>
              <FormInput
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={newStaff.pin_code}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  handleAddInputChange('pin_code', val);
                }}
                placeholder="e.g. 1234"
                style={{ letterSpacing: '8px', fontSize: '18px', textAlign: 'center', fontFamily: 'monospace' }}
                autoComplete="off"
              />
              <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                Used for quick cashier switch at POS terminal
              </div>
            </FormGroup>
          </FormRow>

          {/* Menu Access - Staff 역할일 때만 표시 */}
          {newStaff.role === 'Staff' && renderPermissionCheckboxes(
            newStaff.permissions,
            (updated) => setNewStaff(prev => ({ ...prev, permissions: updated }))
          )}

          {formError && showAddModal && (
            <ModalWarning>{formError}</ModalWarning>
          )}
        </Modal>

        {/* ===== Edit Staff Modal (Portal) ===== */}
        <Modal
          isOpen={showEditModal}
          onClose={handleCloseEditModal}
          title={`Edit Staff: ${editingStaff?.name || ''}`}
          size="large"
          footer={
            <>
              <ModalButton variant="secondary" onClick={handleCloseEditModal}>Cancel</ModalButton>
              <ModalButton variant="primary" onClick={handleUpdateStaff}>Update Staff</ModalButton>
            </>
          }
        >
          {editingStaff && (
            <>
              <FormRow>
                <FormGroup>
                  <FormLabel>Staff ID (Username)</FormLabel>
                  <FormInput
                    type="text"
                    value={editingStaff.username}
                    disabled
                    style={{ backgroundColor: '#F8FAFC', color: '#6B7280' }}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Role</FormLabel>
                  <FormInput
                    type="text"
                    value={editingStaff.role}
                    disabled
                    style={{ backgroundColor: '#F8FAFC', color: '#6B7280' }}
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <FormLabel>Full Name *</FormLabel>
                  <FormInput
                    type="text"
                    value={editForm.name}
                    onChange={(e) => handleEditInputChange('name', e.target.value)}
                    placeholder="Enter full name"
                    autoComplete="off"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Email *</FormLabel>
                  <FormInput
                    type="email"
                    value={editForm.email}
                    onChange={(e) => handleEditInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                    autoComplete="off"
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <FormLabel>Phone</FormLabel>
                  <PhoneInput
                    value={editForm.phone}
                    onChange={(value) => handleEditInputChange('phone', value)}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Department</FormLabel>
                  <FormInput
                    type="text"
                    value={editForm.department}
                    onChange={(e) => handleEditInputChange('department', e.target.value)}
                    placeholder="e.g. Operations, Kitchen, Service"
                    autoComplete="off"
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <FormLabel>Company Name</FormLabel>
                  <FormInput
                    type="text"
                    value={editForm.company_name}
                    onChange={(e) => handleEditInputChange('company_name', e.target.value)}
                    placeholder="Enter company name"
                    autoComplete="off"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>PIN Code (4 digits)</FormLabel>
                  <FormInput
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    value={editForm.pin_code}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      handleEditInputChange('pin_code', val);
                    }}
                    placeholder={editingStaff.pin_code ? '****' : 'Enter new PIN'}
                    style={{ letterSpacing: '8px', fontSize: '18px', textAlign: 'center', fontFamily: 'monospace' }}
                    autoComplete="off"
                  />
                  <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                    Leave empty to keep current PIN
                  </div>
                </FormGroup>
              </FormRow>

              {/* Menu Access - Staff 역할일 때만 표시 */}
              {editingStaff.role === 'Staff' && renderPermissionCheckboxes(
                editForm.permissions,
                (updated) => setEditForm(prev => ({ ...prev, permissions: updated }))
              )}

              {formError && showEditModal && (
                <ModalWarning>{formError}</ModalWarning>
              )}
            </>
          )}
        </Modal>

        {/* ===== Generated Password Modal (Portal) ===== */}
        <Modal
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          title="Password Generated"
          size="small"
          footer={
            <>
              <ModalButton
                variant="secondary"
                onClick={() => {
                  navigator.clipboard.writeText(tempPassword);
                  setPasswordCopied(true);
                  setTimeout(() => setPasswordCopied(false), 2000);
                }}
              >
                {passwordCopied ? 'Copied!' : 'Copy Password'}
              </ModalButton>
              <ModalButton variant="primary" onClick={() => setShowPasswordModal(false)}>
                Done
              </ModalButton>
            </>
          }
        >
          <div style={{ marginBottom: '20px', fontSize: '14px', color: '#6B7280' }}>
            Please share this password with the staff member. They should change it after first login.
          </div>
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E6EBF1',
            borderRadius: '8px',
            padding: '16px',
            textAlign: 'center',
            marginBottom: '16px'
          }}>
            <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px', fontWeight: 600 }}>
              Temporary Password
            </div>
            <div style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#0A2540',
              fontFamily: 'monospace',
              letterSpacing: '1px',
              userSelect: 'all' as const
            }}>
              {tempPassword}
            </div>
          </div>
          <div style={{ fontSize: '12px', color: '#DC2626' }}>
            This password will not be shown again. Please copy it now.
          </div>
        </Modal>

        {/* ===== Error/Notice Modal (Portal) ===== */}
        <Modal
          isOpen={!!errorMessage}
          onClose={() => setErrorMessage('')}
          title="Notice"
          size="small"
          footer={
            <ModalButton variant="primary" onClick={() => setErrorMessage('')}>OK</ModalButton>
          }
        >
          <div style={{ fontSize: '14px', color: '#374151' }}>
            {errorMessage}
          </div>
        </Modal>

        {/* ===== Reset Password Confirmation Modal (Portal) ===== */}
        <Modal
          isOpen={!!resetPasswordTarget}
          onClose={() => setResetPasswordTarget(null)}
          title="Reset Password"
          size="small"
          footer={
            <>
              <ModalButton variant="secondary" onClick={() => setResetPasswordTarget(null)}>Cancel</ModalButton>
              <ModalButton variant="primary" onClick={executeResetPassword}>Reset</ModalButton>
            </>
          }
        >
          <div style={{ fontSize: '14px', color: '#374151' }}>
            Reset the password for <strong>{resetPasswordTarget?.name}</strong>?
          </div>
          <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '8px' }}>
            A new password will be generated. The current password will no longer work.
          </div>
        </Modal>

        {/* Promote modal removed - 1:1 admin constraint */}
      </StaffContainer>
    </>
  );
};

export default StaffPage;
