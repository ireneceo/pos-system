import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import MobileLayout from '../components/common/MobileLayout';
import MobileAlertModal from '../components/common/MobileAlertModal';
import { useCustomer } from '../../contexts/CustomerContext';
import { useMobileOrder } from '../contexts/MobileOrderContext';
import { formatCurrency } from '../../utils/currency';

const Container = styled.div`
  padding: 0 0 24px;
`;

const ProfileSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

const Avatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #635BFF 0%, #8B85FF 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: 600;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`;

const ProfilePhone = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`;

const ProfileEmail = styled.p`
  font-size: 13px;
  color: #9CA3AF;
  margin: 4px 0 0 0;
`;

const StatsRow = styled.div`
  display: flex;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #E5E7EB;
`;

const StatItem = styled.div`
  flex: 1;
  text-align: center;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 12px;
`;

const StatValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #1F2937;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`;

const MenuSection = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;

const MenuItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: none;
  border: none;
  border-bottom: 1px solid #F3F4F6;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background: #F9FAFB;
  }
`;

const MenuIcon = styled.div<{ color?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => props.color || '#F3F4F6'};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    height: 20px;
    color: ${props => props.color ? 'white' : '#6B7280'};
  }
`;

const MenuContent = styled.div`
  flex: 1;
`;

const MenuTitle = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #1F2937;
`;

const MenuSubtitle = styled.div`
  font-size: 13px;
  color: #9CA3AF;
  margin-top: 2px;
`;

const MenuArrow = styled.div`
  color: #D1D5DB;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #FEF2F2;
  border: none;
  border-radius: 12px;
  color: #DC2626;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:active {
    background: #FEE2E2;
  }
`;

const GuestSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const GuestTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`;

const GuestDescription = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
  line-height: 1.5;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #635BFF;
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 12px;
  transition: background 0.2s;

  &:active {
    background: #5A51E6;
  }
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: 16px;
  background: white;
  border: 2px solid #635BFF;
  border-radius: 12px;
  color: #635BFF;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    background: #F5F3FF;
  }
`;

// Password Change Modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  padding: 24px;
`;

const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 20px 0;
`;

const InputGroup = styled.div`
  margin-bottom: 16px;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  font-size: 16px; /* Prevent iOS zoom on focus */
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const ModalButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 14px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${props => props.variant === 'secondary' ? `
    background: #F3F4F6;
    border: none;
    color: #4B5563;
  ` : `
    background: #635BFF;
    border: none;
    color: white;
  `}
`;

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { currentCustomer, logoutCustomer, updateCustomer } = useCustomer();
  const { currency, currentStore, setCurrentStore } = useMobileOrder();

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: 'error' | 'success' | 'warning' | 'info';
    title: string;
    message: string;
    onConfirm?: () => void;
  }>({ isOpen: false, type: 'info', title: '', message: '' });

  const [customerStats, setCustomerStats] = useState<{
    totalOrders: number;
    totalSpent: number;
    points: number;
  }>({ totalOrders: 0, totalSpent: 0, points: 0 });

  // Load restaurant data from slug on mount
  useEffect(() => {
    const loadRestaurant = async () => {
      if (!currentStore && slug) {
        try {
          const response = await fetch(`/api/restaurants/slug/${slug}`);
          if (response.ok) {
            const result = await response.json();
            if (result.success && result.data) {
              setCurrentStore({
                id: result.data.id.toString(),
                name: result.data.name,
                slug: result.data.slug,
                description: result.data.description || '',
                logo: result.data.logo || '',
                isOpen: result.data.is_open || true,
                openingHours: result.data.opening_hours || {}
              });
            }
          }
        } catch (error) {
          console.error('Failed to load restaurant:', error);
        }
      }
    };
    loadRestaurant();
  }, [slug, currentStore, setCurrentStore]);

  // Load customer stats
  useEffect(() => {
    const loadCustomerStats = async () => {
      if (currentCustomer && currentStore) {
        try {
          const response = await fetch(`/api/customers/stats/${currentCustomer.id}?restaurant_id=${currentStore.id}`);
          if (response.ok) {
            const result = await response.json();
            if (result.success && result.data) {
              setCustomerStats({
                totalOrders: result.data.total_orders || 0,
                totalSpent: parseFloat(result.data.total_spent) || 0,
                points: result.data.points || 0
              });
            }
          }
        } catch (error) {
          console.error('Failed to load customer stats:', error);
        }
      }
    };
    loadCustomerStats();
  }, [currentCustomer, currentStore]);

  const showAlertModal = (type: 'error' | 'success' | 'warning' | 'info', title: string, message: string, onConfirm?: () => void) => {
    setAlertModal({ isOpen: true, type, title, message, onConfirm });
  };

  const handleLogout = () => {
    showAlertModal('warning', 'Logout', 'Are you sure you want to logout?', () => {
      logoutCustomer();
      navigate(`/mobile/${slug}`);
    });
  };

  const handlePasswordChange = async () => {
    if (!currentPassword) {
      showAlertModal('error', 'Error', 'Please enter your current password');
      return;
    }
    if (!newPassword) {
      showAlertModal('error', 'Error', 'Please enter a new password');
      return;
    }
    if (newPassword.length < 6) {
      showAlertModal('error', 'Error', 'Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      showAlertModal('error', 'Error', 'New passwords do not match');
      return;
    }

    setIsChangingPassword(true);

    try {
      const response = await fetch(`/api/customers/${currentCustomer?.id}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setShowPasswordModal(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        showAlertModal('success', 'Success', 'Password changed successfully');
      } else {
        showAlertModal('error', 'Error', result.message || 'Failed to change password');
      }
    } catch (error) {
      showAlertModal('error', 'Error', 'Failed to change password. Please try again.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Not logged in - show login prompt
  if (!currentCustomer) {
    return (
      <MobileLayout title="Account" currentPage="orders">
        <Container>
          <GuestSection>
            <Avatar style={{ margin: '0 auto 20px', width: 80, height: 80, fontSize: 32 }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </Avatar>
            <GuestTitle>Welcome!</GuestTitle>
            <GuestDescription>
              Login or create an account to track your orders, earn points, and enjoy a faster checkout experience.
            </GuestDescription>
            <LoginButton onClick={() => navigate(`/mobile/${slug}/login`)}>
              Login
            </LoginButton>
            <RegisterButton onClick={() => navigate(`/mobile/${slug}/register`)}>
              Create Account
            </RegisterButton>
          </GuestSection>

          <MenuSection style={{ marginTop: 16 }}>
            <MenuItem onClick={() => navigate(`/mobile/${slug}/orders`)}>
              <MenuIcon color="#635BFF">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
              </MenuIcon>
              <MenuContent>
                <MenuTitle>Order History</MenuTitle>
                <MenuSubtitle>View your recent orders</MenuSubtitle>
              </MenuContent>
              <MenuArrow>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </MenuArrow>
            </MenuItem>
          </MenuSection>
        </Container>

        <MobileAlertModal
          isOpen={alertModal.isOpen}
          onClose={() => setAlertModal(prev => ({ ...prev, isOpen: false }))}
          type={alertModal.type}
          title={alertModal.title}
          message={alertModal.message}
          onConfirm={alertModal.onConfirm}
          showCancel={!!alertModal.onConfirm}
        />
      </MobileLayout>
    );
  }

  // Logged in - show account info
  return (
    <MobileLayout title="My Account" currentPage="orders">
      <Container>
        <ProfileSection>
          <ProfileHeader>
            <Avatar>{getInitials(currentCustomer.name || 'U')}</Avatar>
            <ProfileInfo>
              <ProfileName>{currentCustomer.name}</ProfileName>
              <ProfilePhone>{currentCustomer.phone}</ProfilePhone>
              {currentCustomer.email && (
                <ProfileEmail>{currentCustomer.email}</ProfileEmail>
              )}
            </ProfileInfo>
          </ProfileHeader>

          <StatsRow>
            <StatItem>
              <StatValue>{customerStats.totalOrders}</StatValue>
              <StatLabel>Orders</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{formatCurrency(customerStats.totalSpent, currency)}</StatValue>
              <StatLabel>Total Spent</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{customerStats.points}</StatValue>
              <StatLabel>Points</StatLabel>
            </StatItem>
          </StatsRow>
        </ProfileSection>

        <MenuSection>
          <MenuItem onClick={() => navigate(`/mobile/${slug}/orders`)}>
            <MenuIcon color="#635BFF">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </MenuIcon>
            <MenuContent>
              <MenuTitle>Order History</MenuTitle>
              <MenuSubtitle>View your past orders</MenuSubtitle>
            </MenuContent>
            <MenuArrow>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </MenuArrow>
          </MenuItem>

          <MenuItem onClick={() => setShowPasswordModal(true)}>
            <MenuIcon color="#10B981">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </MenuIcon>
            <MenuContent>
              <MenuTitle>Change Password</MenuTitle>
              <MenuSubtitle>Update your password</MenuSubtitle>
            </MenuContent>
            <MenuArrow>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </MenuArrow>
          </MenuItem>
        </MenuSection>

        <LogoutButton onClick={handleLogout}>
          Logout
        </LogoutButton>
      </Container>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <ModalOverlay onClick={() => setShowPasswordModal(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalTitle>Change Password</ModalTitle>

            <InputGroup>
              <InputLabel>Current Password</InputLabel>
              <Input
                type="password"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
            </InputGroup>

            <InputGroup>
              <InputLabel>New Password</InputLabel>
              <Input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </InputGroup>

            <InputGroup>
              <InputLabel>Confirm New Password</InputLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </InputGroup>

            <ModalButtons>
              <ModalButton variant="secondary" onClick={() => setShowPasswordModal(false)}>
                Cancel
              </ModalButton>
              <ModalButton onClick={handlePasswordChange} disabled={isChangingPassword}>
                {isChangingPassword ? 'Changing...' : 'Change Password'}
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}

      <MobileAlertModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal(prev => ({ ...prev, isOpen: false }))}
        type={alertModal.type}
        title={alertModal.title}
        message={alertModal.message}
        onConfirm={alertModal.onConfirm}
        showCancel={!!alertModal.onConfirm}
      />
    </MobileLayout>
  );
};

export default AccountPage;
