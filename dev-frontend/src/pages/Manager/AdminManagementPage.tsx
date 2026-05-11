import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { useAuth } from '../../contexts/AuthContext';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormRow as UIFormRow } from '../../components/UI/Modal';
import ConfirmModal from '../../components/ConfirmModal';
import PhoneInput from '../../components/Common/PhoneInput';
import { useTranslation } from 'react-i18next';
import { useRoleDisplayName } from '../../utils/roleDisplay';

import { getAuthToken } from '../../utils/auth';
import { formatDate as formatDateTz } from '../../utils/timezone';
interface Staff {
  id: number;
  username: string;
  full_name: string;
  email: string;
  phone: string;
  role: string;
  restaurant_id: number | null;
  restaurantName?: string;
  is_active: boolean;
  pin_code?: string | null;
  createdAt: string;
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

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;
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

  th:nth-child(3) { text-align: center; }
  th:nth-child(4) { text-align: center; }
  th:nth-child(5) { text-align: right; }
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

  &:nth-child(3) { text-align: center; }
  &:nth-child(4) { text-align: center; }
  &:nth-child(5) { text-align: right; }

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

const StatusBadge = styled.span<{ active: boolean }>`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${props => props.active ? '#ECFDF5' : '#FEE2E2'};
  color: ${props => props.active ? '#059669' : '#DC2626'};
`;

const RoleBadge = styled.span<{ role: string }>`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${props => props.role === 'Restaurant Admin' ? '#ECFDF5' : '#EDE9FE'};
  color: ${props => props.role === 'Restaurant Admin' ? '#059669' : '#7C3AED'};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const ActionButton = styled.button<{ variant?: 'danger' }>`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid ${props => props.variant === 'danger' ? '#FEE2E2' : '#E6EBF1'};
  border-radius: 6px;
  color: ${props => props.variant === 'danger' ? '#DC2626' : '#6B7280'};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${props => props.variant === 'danger' ? '#FCA5A5' : '#635BFF'};
    color: ${props => props.variant === 'danger' ? '#B91C1C' : '#635BFF'};
    background: ${props => props.variant === 'danger' ? '#FEF2F2' : '#F4F3FF'};
  }
`;

const ViewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ViewRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const ViewField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ViewLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const ViewValue = styled.span`
  font-size: 14px;
  color: #1F2937;
  font-weight: 500;
`;

const ViewDivider = styled.hr`
  border: none;
  border-top: 1px solid #E6EBF1;
  margin: 4px 0;
`;

const RestaurantSearchContainer = styled.div`
  position: relative;
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
`;

const DropdownItem = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  border-bottom: 1px solid #F3F4F6;
  font-size: 14px;
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #F8FAFC;
  }
`;

const ErrorMessage = styled.div`
  padding: 12px 16px;
  background: #FEE2E2;
  border: 1px solid #FCA5A5;
  border-radius: 6px;
  color: #991B1B;
  font-size: 14px;
  margin-bottom: 16px;
`;

const ManagerAdminManagementPage: React.FC = () => {
  const { t } = useTranslation('admin');
  const displayRole = useRoleDisplayName();
  const { user } = useAuth();
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [restaurantFilter, setRestaurantFilter] = useState('all');

  // Create modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    username: '',
    full_name: '',
    email: '',
    phone: '',
    role: 'Restaurant Admin' as 'Restaurant Admin',
    restaurant_id: '',
  });
  const [createError, setCreateError] = useState('');
  const [restaurantSearch, setRestaurantSearch] = useState('');
  const [showRestaurantDropdown, setShowRestaurantDropdown] = useState(false);

  // View modal
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewStaff, setViewStaff] = useState<Staff | null>(null);

  // Edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: '',
    email: '',
    phone: '',
  });
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [editError, setEditError] = useState('');

  // Deactivate confirm
  const [deactivateConfirm, setDeactivateConfirm] = useState<{ isOpen: boolean; staff: Staff | null }>({
    isOpen: false,
    staff: null
  });

  // Success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [successPassword, setSuccessPassword] = useState('');
  const [passwordCopied, setPasswordCopied] = useState(false);

  const getToken = useCallback(() => getAuthToken(), []);

  const fetchData = useCallback(async () => {
    try {
      const token = getToken();
      const headers = { 'Authorization': `Bearer ${token}` };
      const managerId = user?.id;

      // Fetch restaurants managed by this user
      const restResponse = await fetch(`/api/restaurants/manager/${managerId}`, { headers });
      const restData = restResponse.ok ? await restResponse.json() : [];
      setRestaurants(restData);

      const restaurantMap: Record<number, string> = {};
      restData.forEach((r: any) => { restaurantMap[r.id] = r.name; });

      // Fetch all users
      const usersResponse = await fetch('/api/users', { headers });
      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        const usersArray = usersData.data || usersData;

        const filtered: Staff[] = usersArray
          .filter((u: any) => {
            if (u.role !== 'Restaurant Admin') return false;
            return u.restaurant_id && restData.some((r: any) => r.id === u.restaurant_id);
          })
          .map((u: any) => ({
            id: u.id,
            username: u.username || '',
            full_name: u.full_name || u.username || 'Unknown',
            email: u.email,
            phone: u.phone || '',
            role: u.role,
            restaurant_id: u.restaurant_id,
            restaurantName: restaurantMap[u.restaurant_id] || 'Unknown',
            is_active: u.is_active !== false,
            pin_code: u.pin_code || null,
            createdAt: u.createdAt
          }));

        setStaffList(filtered);
      }
    } catch (error) {
      console.error('Error fetching staff data:', error);
    } finally {
      setLoading(false);
    }
  }, [user, getToken]);

  useEffect(() => {
    if (user) fetchData();
  }, [user, fetchData]);

  // Filtered staff
  const filteredStaff = staffList.filter(staff => {
    if (searchQuery && !staff.full_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !staff.email.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (statusFilter === 'active' && !staff.is_active) return false;
    if (statusFilter === 'inactive' && staff.is_active) return false;
    if (restaurantFilter !== 'all' && staff.restaurant_id?.toString() !== restaurantFilter) return false;
    return true;
  });

  const stats = {
    total: staffList.length,
    active: staffList.filter(s => s.is_active).length
  };

  // Restaurant search for create modal
  const filteredRestaurants = restaurantSearch
    ? restaurants.filter((r: any) => r.name.toLowerCase().includes(restaurantSearch.toLowerCase()))
    : restaurants;

  // --- Create ---
  const handleOpenCreate = () => {
    setCreateForm({ username: '', full_name: '', email: '', phone: '', role: 'Restaurant Admin', restaurant_id: '' });
    setCreateError('');
    setRestaurantSearch('');
    setShowCreateModal(true);
  };

  const handleSubmitCreate = async () => {
    setCreateError('');
    if (!createForm.username.trim()) { setCreateError('Username is required'); return; }
    if (!createForm.full_name.trim()) { setCreateError('Full Name is required'); return; }
    if (!createForm.email.trim()) { setCreateError('Email is required'); return; }
    if (!createForm.restaurant_id) { setCreateError('Please select a restaurant'); return; }

    try {
      const token = getToken();
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          username: createForm.username.trim(),
          email: createForm.email.trim(),
          full_name: createForm.full_name.trim(),
          phone: createForm.phone.trim() || null,
          role: 'Restaurant Admin',
          restaurant_id: parseInt(createForm.restaurant_id),
        })
      });

      const data = await response.json();
      if (!response.ok) {
        setCreateError(data.error || 'Failed to create staff');
        return;
      }

      setShowCreateModal(false);
      setSuccessMessage(`Restaurant Admin "${createForm.username}" created successfully.`);
      setSuccessPassword(data.generatedPassword || '');
      setPasswordCopied(false);
      setShowSuccessModal(true);
      fetchData();
    } catch (error) {
      setCreateError('An error occurred. Please try again.');
    }
  };

  // --- View ---
  const handleView = (staff: Staff) => {
    setViewStaff(staff);
    setShowViewModal(true);
  };

  // --- Edit ---
  const handleOpenEdit = (staff: Staff) => {
    setEditingStaff(staff);
    setEditForm({
      full_name: staff.full_name,
      email: staff.email,
      phone: staff.phone,
    });
    setEditError('');
    setShowEditModal(true);
  };

  const handleSubmitEdit = async () => {
    if (!editingStaff) return;
    setEditError('');
    if (!editForm.full_name.trim()) { setEditError('Full Name is required'); return; }
    if (!editForm.email.trim()) { setEditError('Email is required'); return; }

    try {
      const token = getToken();
      const response = await fetch(`/api/users/${editingStaff.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          full_name: editForm.full_name.trim(),
          email: editForm.email.trim(),
          phone: editForm.phone.trim() || null,
        })
      });

      const data = await response.json();
      if (!response.ok) {
        setEditError(data.error || 'Failed to update');
        return;
      }

      setShowEditModal(false);
      fetchData();
    } catch (error) {
      setEditError('An error occurred. Please try again.');
    }
  };

  // --- Deactivate/Activate ---
  const handleToggleActive = async () => {
    const staff = deactivateConfirm.staff;
    if (!staff) return;

    try {
      const token = getToken();
      const response = await fetch(`/api/users/${staff.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ is_active: !staff.is_active })
      });

      if (response.ok) {
        setDeactivateConfirm({ isOpen: false, staff: null });
        fetchData();
      }
    } catch (error) {
      console.error('Error toggling staff status:', error);
    }
  };

  const uniqueRestaurants = Array.from(
    new Map(staffList.filter(s => s.restaurant_id).map(s => [s.restaurant_id!, { id: s.restaurant_id!, name: s.restaurantName! }])).values()
  );

  if (loading) {
    return (
      <Container>
        <Header><Title>{t('admin:adminManagementPage.restaurantAdmin')}</Title></Header>
        <Content>
          <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>{t('admin:adminManagementPage.loading')}</div>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>{t('admin:adminManagementPage.restaurantAdmin')}</Title>
        <ActionSection>
          <Button variant="primary" onClick={handleOpenCreate}>{t('admin:adminManagementPage.addAdmin')}</Button>
        </ActionSection>
      </Header>

      <Content>
        <StatsGrid>
          <StatCard color="#059669">
            <StatValue>{stats.total}</StatValue>
            <StatLabel>{t('admin:adminManagementPage.totalAdmins')}</StatLabel>
            <StatSubtext>Across {uniqueRestaurants.length} restaurants</StatSubtext>
          </StatCard>
          <StatCard color="#7C3AED">
            <StatValue>{stats.active}</StatValue>
            <StatLabel>{t('admin:adminManagementPage.active')}</StatLabel>
            <StatSubtext>{stats.total > 0 ? Math.round((stats.active/stats.total)*100) : 0}% of total</StatSubtext>
          </StatCard>
        </StatsGrid>

        <FilterBar>
          <SearchInput
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">{t('admin:adminManagementPage.allStatus')}</option>
            <option value="active">{t('admin:adminManagementPage.active')}</option>
            <option value="inactive">{t('admin:adminManagementPage.inactive')}</option>
          </FilterSelect>
          <FilterSelect value={restaurantFilter} onChange={(e) => setRestaurantFilter(e.target.value)}>
            <option value="all">{t('admin:adminManagementPage.allRestaurants')}</option>
            {uniqueRestaurants.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </FilterSelect>
        </FilterBar>

        <StaffTableContainer>
          {filteredStaff.length === 0 ? (
            <EmptyState>
              <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                No restaurant admin found
              </div>
              <div style={{ fontSize: '14px' }}>
                {staffList.length === 0 ? 'Add your first restaurant admin' : 'Try adjusting your filters'}
              </div>
            </EmptyState>
          ) : (
            <StaffTable>
              <StaffTableHead>
                <tr>
                  <th>{t('admin:adminManagementPage.name')}</th>
                  <th>{t('admin:adminManagementPage.restaurant')}</th>
                  <th>{t('admin:adminManagementPage.role')}</th>
                  <th>{t('admin:adminManagementPage.status')}</th>
                  <th>{t('admin:adminManagementPage.actions')}</th>
                </tr>
              </StaffTableHead>
              <tbody>
                {filteredStaff.map(staff => (
                  <StaffTableRow key={staff.id}>
                    <StaffTableCell data-label="Name">
                      <StaffInfo>
                        <StaffDetails>
                          <StaffName>{staff.full_name}</StaffName>
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
                      <RoleBadge role={staff.role}>{displayRole(staff.role)}</RoleBadge>
                    </StaffTableCell>

                    <StaffTableCell data-label="Status">
                      <StatusBadge active={staff.is_active}>
                        {staff.is_active ? 'Active' : 'Inactive'}
                      </StatusBadge>
                    </StaffTableCell>

                    <StaffTableCell data-label="">
                      <ActionButtons>
                        <ActionButton onClick={() => handleView(staff)}>{t('admin:adminManagementPage.view')}</ActionButton>
                        <ActionButton onClick={() => handleOpenEdit(staff)}>{t('admin:adminManagementPage.edit')}</ActionButton>
                        <ActionButton
                          variant="danger"
                          onClick={() => setDeactivateConfirm({ isOpen: true, staff })}
                        >
                          {staff.is_active ? 'Deactivate' : 'Activate'}
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

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Add Restaurant Admin"
        size="medium"
        footer={
          <>
            <ModalButton variant="secondary" onClick={() => setShowCreateModal(false)}>{t('admin:adminManagementPage.cancel')}</ModalButton>
            <ModalButton variant="primary" onClick={handleSubmitCreate}>{t('admin:adminManagementPage.create')}</ModalButton>
          </>
        }
      >
        {createError && <ErrorMessage>{createError}</ErrorMessage>}

        <UIFormGroup>
          <FormLabel>Restaurant *</FormLabel>
          <RestaurantSearchContainer>
            <FormInput
              type="text"
              placeholder="Search restaurant..."
              value={restaurantSearch}
              onChange={(e) => { setRestaurantSearch(e.target.value); setShowRestaurantDropdown(true); }}
              onFocus={() => setShowRestaurantDropdown(true)}
            />
            {showRestaurantDropdown && filteredRestaurants.length > 0 && (
              <DropdownContainer>
                {filteredRestaurants.map((r: any) => (
                  <DropdownItem
                    key={r.id}
                    onClick={() => {
                      setCreateForm({ ...createForm, restaurant_id: r.id.toString() });
                      setRestaurantSearch(r.name);
                      setShowRestaurantDropdown(false);
                    }}
                  >
                    {r.name}
                  </DropdownItem>
                ))}
              </DropdownContainer>
            )}
          </RestaurantSearchContainer>
        </UIFormGroup>

        <UIFormRow>
          <UIFormGroup>
            <FormLabel>Username *</FormLabel>
            <FormInput
              type="text"
              placeholder="Username"
              value={createForm.username}
              onChange={(e) => setCreateForm({ ...createForm, username: e.target.value })}
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>Full Name *</FormLabel>
            <FormInput
              type="text"
              placeholder="Full name"
              value={createForm.full_name}
              onChange={(e) => setCreateForm({ ...createForm, full_name: e.target.value })}
            />
          </UIFormGroup>
        </UIFormRow>

        <UIFormRow>
          <UIFormGroup>
            <FormLabel>Email *</FormLabel>
            <FormInput
              type="email"
              placeholder="Email"
              value={createForm.email}
              onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>{t('admin:adminManagementPage.phone')}</FormLabel>
            <PhoneInput
              value={createForm.phone}
              onChange={(value: string) => setCreateForm({ ...createForm, phone: value })}
            />
          </UIFormGroup>
        </UIFormRow>

        <div style={{ fontSize: '13px', color: '#6B7280', background: '#F9FAFB', padding: '12px', borderRadius: '8px' }}>
          Password will be auto-generated and shown after creation.
        </div>
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => { setShowViewModal(false); setViewStaff(null); }}
        title="Admin Details"
        size="medium"
        footer={
          <ModalButton variant="secondary" onClick={() => { setShowViewModal(false); setViewStaff(null); }}>{t('admin:adminManagementPage.close')}</ModalButton>
        }
      >
        {viewStaff && (
          <ViewSection>
            <ViewRow>
              <ViewField>
                <ViewLabel>{t('admin:adminManagementPage.fullName')}</ViewLabel>
                <ViewValue>{viewStaff.full_name}</ViewValue>
              </ViewField>
              <ViewField>
                <ViewLabel>{t('admin:adminManagementPage.username')}</ViewLabel>
                <ViewValue>{viewStaff.username}</ViewValue>
              </ViewField>
            </ViewRow>

            <ViewDivider />

            <ViewRow>
              <ViewField>
                <ViewLabel>{t('admin:adminManagementPage.email')}</ViewLabel>
                <ViewValue>{viewStaff.email}</ViewValue>
              </ViewField>
              <ViewField>
                <ViewLabel>{t('admin:adminManagementPage.phone')}</ViewLabel>
                <ViewValue>{viewStaff.phone || '-'}</ViewValue>
              </ViewField>
            </ViewRow>

            <ViewDivider />

            <ViewRow>
              <ViewField>
                <ViewLabel>{t('admin:adminManagementPage.role')}</ViewLabel>
                <ViewValue><RoleBadge role={viewStaff.role}>{displayRole(viewStaff.role)}</RoleBadge></ViewValue>
              </ViewField>
              <ViewField>
                <ViewLabel>{t('admin:adminManagementPage.status')}</ViewLabel>
                <ViewValue>
                  <StatusBadge active={viewStaff.is_active}>
                    {viewStaff.is_active ? 'Active' : 'Inactive'}
                  </StatusBadge>
                </ViewValue>
              </ViewField>
            </ViewRow>

            <ViewDivider />

            <ViewRow>
              <ViewField>
                <ViewLabel>{t('admin:adminManagementPage.restaurant')}</ViewLabel>
                <ViewValue>{viewStaff.restaurantName || '-'}</ViewValue>
              </ViewField>
            </ViewRow>

            <ViewRow>
              <ViewField>
                <ViewLabel>{t('admin:adminManagementPage.joined')}</ViewLabel>
                <ViewValue>{viewStaff.createdAt ? formatDateTz(viewStaff.createdAt, null) : '-'}</ViewValue>
              </ViewField>
            </ViewRow>
          </ViewSection>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => { setShowEditModal(false); setEditingStaff(null); }}
        title="Edit Restaurant Admin"
        size="medium"
        footer={
          <>
            <ModalButton variant="secondary" onClick={() => { setShowEditModal(false); setEditingStaff(null); }}>{t('admin:adminManagementPage.cancel')}</ModalButton>
            <ModalButton variant="primary" onClick={handleSubmitEdit}>{t('admin:adminManagementPage.update')}</ModalButton>
          </>
        }
      >
        {editError && <ErrorMessage>{editError}</ErrorMessage>}

        <UIFormRow>
          <UIFormGroup>
            <FormLabel>Full Name *</FormLabel>
            <FormInput
              type="text"
              value={editForm.full_name}
              onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>Email *</FormLabel>
            <FormInput
              type="email"
              value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
            />
          </UIFormGroup>
        </UIFormRow>

        <UIFormGroup>
          <FormLabel>{t('admin:adminManagementPage.phone')}</FormLabel>
          <PhoneInput
            value={editForm.phone}
            onChange={(value: string) => setEditForm({ ...editForm, phone: value })}
          />
        </UIFormGroup>

        {editingStaff && (
          <div style={{ fontSize: '13px', color: '#6B7280', background: '#F9FAFB', padding: '12px', borderRadius: '8px' }}>
            Restaurant: {editingStaff.restaurantName || '-'} &middot; Role: {editingStaff.role}
          </div>
        )}
      </Modal>

      {/* Deactivate Confirm */}
      <ConfirmModal
        isOpen={deactivateConfirm.isOpen}
        onCancel={() => setDeactivateConfirm({ isOpen: false, staff: null })}
        onConfirm={handleToggleActive}
        title={deactivateConfirm.staff?.is_active ? 'Deactivate Admin' : 'Activate Admin'}
        message={deactivateConfirm.staff?.is_active
          ? `Are you sure you want to deactivate "${deactivateConfirm.staff?.full_name}"? They will no longer be able to log in.`
          : `Activate "${deactivateConfirm.staff?.full_name}"? They will be able to log in again.`
        }
        confirmText={deactivateConfirm.staff?.is_active ? 'Deactivate' : 'Activate'}
        cancelText="Cancel"
        type={deactivateConfirm.staff?.is_active ? 'danger' : 'info'}
      />

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Password Generated"
        size="small"
        footer={<>
          {successPassword && <ModalButton variant="secondary" onClick={() => { navigator.clipboard.writeText(successPassword); setPasswordCopied(true); setTimeout(() => setPasswordCopied(false), 2000); }}>{passwordCopied ? 'Copied!' : 'Copy Password'}</ModalButton>}
          <ModalButton variant="primary" onClick={() => setShowSuccessModal(false)}>{t('admin:adminManagementPage.done')}</ModalButton>
        </>}
      >
        <div style={{ marginBottom: '20px', fontSize: '14px', color: '#6B7280' }}>
          {successMessage} Please share this password securely. They should change it after first login.
        </div>
        {successPassword && (
          <div style={{ background: '#F8FAFC', border: '1px solid #E6EBF1', borderRadius: '8px', padding: '16px', textAlign: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px', fontWeight: 600 }}>{t('admin:adminManagementPage.temporaryPassword')}</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#0A2540', fontFamily: 'monospace', letterSpacing: '1px', userSelect: 'all' as const }}>{successPassword}</div>
          </div>
        )}
        <div style={{ fontSize: '12px', color: '#DC2626' }}>{t('admin:adminManagementPage.thisPasswordWillNotBeShownAgainPleaseCopyItNow')}</div>
      </Modal>
    </Container>
  );
};

export default ManagerAdminManagementPage;
