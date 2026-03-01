import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { useAuth } from '../../contexts/AuthContext';
import { StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI';
import { Modal, ModalButton, ModalWarning, FormRow, FormGroup, FormLabel, FormInput } from '../../components/UI/Modal';
import { FilterBar, SearchInput } from '../../components/Common/FilterComponents';
import PhoneInput from '../../components/Common/PhoneInput';

interface Manager {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  joinDate: string;
  permissions: string[];
}

// Foodcourt Manager 권한 그룹 (MainLayout 사이드바 섹션 기반, products 없음)
const PERMISSION_GROUPS = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'management', label: 'Management (Foodcourts / Restaurants / Staff)' },
  { key: 'operations', label: 'Operations (Invoices / Statistics / Customers / Coupons)' },
  { key: 'communication', label: 'Communication (Notices / Inquiries)' },
  { key: 'plans_payments', label: 'Plans & Payments (Plans / Subscriptions / Payment Settings)' },
];

const Container = styled.div`
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

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: ${props => props.variant === 'primary' || props.variant === 'danger' ? 'none' : '1px solid #E6EBF1'};
  background: ${props => {
    if (props.variant === 'primary') return '#635BFF';
    if (props.variant === 'danger') return '#DC2626';
    return 'white';
  }};
  color: ${props => {
    if (props.variant === 'primary' || props.variant === 'danger') return 'white';
    return '#6B7C93';
  }};

  &:hover {
    background: ${props => {
      if (props.variant === 'primary') return '#5A51E6';
      if (props.variant === 'danger') return '#B91C1C';
      return '#F6F9FC';
    }};
    transform: translateY(-1px);
  }
`;

const Content = styled.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ManagerList = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`;

const ManagerHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 180px;
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

const ManagerItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 180px;
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

const ManagerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ManagerAvatar = styled.div`
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
  background: #2563EB;
`;

const ManagerDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const ManagerName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 2px;
`;

const ManagerMeta = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const PermissionTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const PermissionTag = styled.span`
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
  background: #DBEAFE;
  color: #2563EB;
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

const DeleteButton = styled(ActionButton)`
  &:hover {
    border-color: #DC2626;
    color: #DC2626;
    background: #FEF2F2;
  }
`;


const PermissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 8px;
`;

const PermissionLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 6px;
  background: white;
  border: 1px solid #E6EBF1;
  cursor: pointer;
  font-size: 13px;
  color: #374151;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
  }
`;

const FoodcourtStaffPage: React.FC = () => {
  const { user } = useAuth();
  const [managers, setManagers] = useState<Manager[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Add Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newManager, setNewManager] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    permissions: ['dashboard'] as string[]
  });

  // Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingManager, setEditingManager] = useState<Manager | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    permissions: [] as string[]
  });

  // Password display modal
  const [tempPassword, setTempPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);

  // Error/Notice modal
  const [errorMessage, setErrorMessage] = useState('');

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<Manager | null>(null);

  // Reset Password
  const [resetPasswordTarget, setResetPasswordTarget] = useState<Manager | null>(null);

  // Form error
  const [formError, setFormError] = useState('');

  const foodcourtId = user?.foodcourt_id;

  const fetchManagers = useCallback(async () => {
    if (!foodcourtId) return;
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/foodcourts/${foodcourtId}/staff`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        const managersArray = data.data || [];
        const transformed: Manager[] = managersArray.map((u: any) => ({
          id: u.id.toString(),
          username: u.username || '',
          name: u.full_name || u.username || 'Unknown',
          email: u.email,
          phone: u.phone || '',
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
        setManagers(transformed);
      }
    } catch (_) { /* silently fail */ }
  }, [foodcourtId]);

  useEffect(() => {
    if (user && foodcourtId) {
      fetchManagers();
    }
  }, [user, foodcourtId, fetchManagers]);

  const filteredManagers = managers.filter(m => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!m.name.toLowerCase().includes(q) && !m.email.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  const stats = {
    total: managers.length,
    active: managers.filter(m => m.status === 'active').length,
  };

  // === Add Modal ===
  const handleOpenAddModal = () => {
    setNewManager({ username: '', name: '', email: '', phone: '', permissions: ['dashboard'] });
    setFormError('');
    setShowAddModal(true);
  };

  const handleSubmitManager = async () => {
    if (!newManager.username.trim()) { setFormError('Username is required.'); return; }
    if (!newManager.name.trim()) { setFormError('Full Name is required.'); return; }
    if (!newManager.email.trim()) { setFormError('Email is required.'); return; }

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/foodcourts/${foodcourtId}/staff`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          username: newManager.username.trim(),
          email: newManager.email.trim(),
          full_name: newManager.name.trim(),
          phone: newManager.phone.trim() || null,
          permissions: JSON.stringify(newManager.permissions)
        })
      });

      if (response.ok) {
        const result = await response.json();
        await fetchManagers();
        setShowAddModal(false);
        if (result.generatedPassword) {
          setTempPassword(result.generatedPassword);
          setShowPasswordModal(true);
        }
      } else {
        const errorData = await response.json();
        setFormError(errorData.message || 'Failed to create manager');
      }
    } catch (error) {
      setFormError((error as Error).message);
    }
  };

  // === Edit Modal ===
  const handleOpenEditModal = (manager: Manager) => {
    setEditingManager(manager);
    setEditForm({
      name: manager.name,
      email: manager.email,
      phone: manager.phone,
      username: manager.username,
      permissions: [...manager.permissions]
    });
    setFormError('');
    setShowEditModal(true);
  };

  const handleUpdateManager = async () => {
    if (!editingManager) return;
    if (!editForm.name.trim()) { setFormError('Full Name is required.'); return; }
    if (!editForm.email.trim()) { setFormError('Email is required.'); return; }

    try {
      const token = localStorage.getItem('auth_token');

      const response = await fetch(`/api/foodcourts/${foodcourtId}/staff/${editingManager.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          full_name: editForm.name.trim(),
          email: editForm.email.trim(),
          phone: editForm.phone.trim() || null,
          username: editForm.username.trim()
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setFormError(errorData.message || 'Failed to update manager');
        return;
      }

      const permResponse = await fetch(`/api/foodcourts/${foodcourtId}/staff/${editingManager.id}/permissions`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ permissions: editForm.permissions })
      });

      if (permResponse.ok) {
        await fetchManagers();
        setShowEditModal(false);
        setEditingManager(null);
      } else {
        const errorData = await permResponse.json();
        setFormError(errorData.message || 'Failed to update permissions');
      }
    } catch (error) {
      setFormError((error as Error).message);
    }
  };

  // === Delete ===
  const executeDelete = async () => {
    if (!deleteTarget) return;
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/foodcourts/${foodcourtId}/staff/${deleteTarget.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        await fetchManagers();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to delete manager');
      }
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
    setDeleteTarget(null);
  };

  // === Reset Password ===
  const executeResetPassword = async () => {
    if (!resetPasswordTarget) return;
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/foodcourts/${foodcourtId}/staff/${resetPasswordTarget.id}/reset-password`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.generatedPassword) {
          setTempPassword(result.generatedPassword);
          setShowPasswordModal(true);
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to reset password');
      }
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
    setResetPasswordTarget(null);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2) || '?';
  };

  const renderPermissionCheckboxes = (
    permissions: string[],
    onChange: (updated: string[]) => void
  ) => (
    <div style={{ marginTop: '20px', padding: '16px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E6EBF1' }}>
      <div style={{ fontSize: '14px', fontWeight: 600, color: '#0A2540', marginBottom: '4px' }}>Menu Access</div>
      <div style={{ fontSize: '12px', color: '#6B7C93', marginBottom: '12px' }}>
        Select which menu sections this manager can access:
      </div>
      <PermissionGrid>
        {PERMISSION_GROUPS.map(group => (
          <PermissionLabel key={group.key}>
            <input
              type="checkbox"
              checked={permissions.includes(group.key)}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...permissions, group.key]
                  : permissions.filter(p => p !== group.key);
                onChange(updated);
              }}
              style={{ accentColor: '#635BFF' }}
            />
            {group.label}
          </PermissionLabel>
        ))}
      </PermissionGrid>
    </div>
  );

  const isGeneral = user?.role === 'Foodcourt General';

  return (
    <>
      <Container>
        <Header>
          <HeaderTitle>Foodcourt Managers</HeaderTitle>
          {isGeneral && (
            <HeaderActions>
              <Button variant="primary" onClick={handleOpenAddModal}>
                Add Manager
              </Button>
            </HeaderActions>
          )}
        </Header>

        <Content>
          <StatsGrid>
            <StatCard color="#2563EB">
              <StatValue>{stats.total}</StatValue>
              <StatLabel>Total Managers</StatLabel>
            </StatCard>
            <StatCard color="#059669">
              <StatValue>{stats.active}</StatValue>
              <StatLabel>Active</StatLabel>
            </StatCard>
          </StatsGrid>

          <FilterBar>
            <SearchInput
              type="text"
              placeholder="Search by name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
            />
          </FilterBar>

          <ManagerList>
            <ManagerHeader>
              <span>Manager</span>
              <span>Permissions</span>
              <span>Status</span>
              <span>Actions</span>
            </ManagerHeader>

            {filteredManagers.length === 0 ? (
              <EmptyState>
                <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                  No managers found
                </div>
                <div style={{ fontSize: '14px' }}>
                  {isGeneral ? 'Add managers to help manage your foodcourt' : 'No managers assigned to this foodcourt'}
                </div>
              </EmptyState>
            ) : (
              filteredManagers.map(manager => (
                <ManagerItem key={manager.id}>
                  <ManagerInfo>
                    <ManagerAvatar>
                      {getInitials(manager.name)}
                    </ManagerAvatar>
                    <ManagerDetails>
                      <ManagerName>{manager.name}</ManagerName>
                      <ManagerMeta>{manager.email}</ManagerMeta>
                    </ManagerDetails>
                  </ManagerInfo>

                  <PermissionTags>
                    {manager.permissions.length === 0 ? (
                      <span style={{ fontSize: '12px', color: '#9CA3AF' }}>No permissions</span>
                    ) : (
                      manager.permissions.slice(0, 3).map(p => (
                        <PermissionTag key={p}>
                          {PERMISSION_GROUPS.find(g => g.key === p)?.key || p}
                        </PermissionTag>
                      ))
                    )}
                    {manager.permissions.length > 3 && (
                      <PermissionTag>+{manager.permissions.length - 3}</PermissionTag>
                    )}
                  </PermissionTags>

                  <StatusBadge active={manager.status === 'active'}>
                    {manager.status}
                  </StatusBadge>

                  <ActionGroup>
                    <ActionButton onClick={() => handleOpenEditModal(manager)}>
                      Edit
                    </ActionButton>
                    {isGeneral && (
                      <>
                        <ActionButton onClick={() => setResetPasswordTarget(manager)}>
                          Reset PW
                        </ActionButton>
                        <DeleteButton onClick={() => setDeleteTarget(manager)}>
                          Delete
                        </DeleteButton>
                      </>
                    )}
                  </ActionGroup>
                </ManagerItem>
              ))
            )}
          </ManagerList>
        </Content>

        {/* ===== Add Manager Modal ===== */}
        <Modal
          isOpen={showAddModal}
          onClose={() => { setShowAddModal(false); setFormError(''); }}
          title="Add New Manager"
          size="large"
          footer={
            <>
              <ModalButton variant="secondary" onClick={() => { setShowAddModal(false); setFormError(''); }}>Cancel</ModalButton>
              <ModalButton variant="primary" onClick={handleSubmitManager}>Add Manager</ModalButton>
            </>
          }
        >
          <FormRow>
            <FormGroup>
              <FormLabel>Username *</FormLabel>
              <FormInput
                type="text"
                value={newManager.username}
                onChange={(e) => setNewManager(prev => ({ ...prev, username: e.target.value }))}
                placeholder="Enter unique username"
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
                value={newManager.name}
                onChange={(e) => setNewManager(prev => ({ ...prev, name: e.target.value }))}
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
                value={newManager.email}
                onChange={(e) => setNewManager(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter email address"
                autoComplete="off"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Phone</FormLabel>
              <PhoneInput
                value={newManager.phone}
                onChange={(value) => setNewManager(prev => ({ ...prev, phone: value }))}
              />
            </FormGroup>
          </FormRow>

          {renderPermissionCheckboxes(
            newManager.permissions,
            (updated) => setNewManager(prev => ({ ...prev, permissions: updated }))
          )}

          {formError && showAddModal && (
            <ModalWarning>{formError}</ModalWarning>
          )}
        </Modal>

        {/* ===== Edit Manager Modal ===== */}
        <Modal
          isOpen={showEditModal}
          onClose={() => { setShowEditModal(false); setEditingManager(null); setFormError(''); }}
          title={`Edit Manager: ${editingManager?.name || ''}`}
          size="large"
          footer={
            <>
              <ModalButton variant="secondary" onClick={() => { setShowEditModal(false); setEditingManager(null); setFormError(''); }}>Cancel</ModalButton>
              <ModalButton variant="primary" onClick={handleUpdateManager}>Update Manager</ModalButton>
            </>
          }
        >
          {editingManager && (
            <>
              <FormRow>
                <FormGroup>
                  <FormLabel>Username</FormLabel>
                  <FormInput
                    type="text"
                    value={editForm.username}
                    onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="Username"
                    autoComplete="off"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Full Name *</FormLabel>
                  <FormInput
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
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
                    value={editForm.email}
                    onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address"
                    autoComplete="off"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Phone</FormLabel>
                  <PhoneInput
                    value={editForm.phone}
                    onChange={(value) => setEditForm(prev => ({ ...prev, phone: value }))}
                  />
                </FormGroup>
              </FormRow>

              {renderPermissionCheckboxes(
                editForm.permissions,
                (updated) => setEditForm(prev => ({ ...prev, permissions: updated }))
              )}

              {formError && showEditModal && (
                <ModalWarning>{formError}</ModalWarning>
              )}
            </>
          )}
        </Modal>

        {/* ===== Generated Password Modal ===== */}
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
            Please share this password with the manager. They should change it after first login.
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

        {/* ===== Delete Confirmation Modal ===== */}
        <Modal
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          title="Delete Manager"
          size="small"
          footer={
            <>
              <ModalButton variant="secondary" onClick={() => setDeleteTarget(null)}>Cancel</ModalButton>
              <ModalButton variant="primary" onClick={executeDelete}>Delete</ModalButton>
            </>
          }
        >
          <div style={{ fontSize: '14px', color: '#374151' }}>
            Are you sure you want to delete <strong>{deleteTarget?.name}</strong>?
          </div>
          <div style={{ fontSize: '13px', color: '#DC2626', marginTop: '8px' }}>
            This action cannot be undone. The manager will lose access immediately.
          </div>
        </Modal>

        {/* ===== Error/Notice Modal ===== */}
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

        {/* ===== Reset Password Confirmation Modal ===== */}
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
      </Container>
    </>
  );
};

export default FoodcourtStaffPage;
