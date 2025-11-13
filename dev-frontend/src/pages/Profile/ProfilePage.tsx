import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import MainLayout from '../../components/Layout/MainLayout';
import { useStaff, Staff } from '../../contexts/StaffContext';
import { useAuth } from '../../contexts/AuthContext';
import { Modal, ModalButton } from '../../components/UI/Modal';
import Tabs from '../../components/UI/Tabs';

// 스타일 컴포넌트
const ProfileContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`;

const Header = styled.header`
  background: white;
  padding: 24px 32px;
  border-bottom: 1px solid #E6EBF1;

  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`;

const Content = styled.main`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ProfileSection = styled.div`
  margin-bottom: 32px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 20px 0;
`;

const ProfileHeader = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 24px;
  }
`;

const StaffAvatar = styled.div<{ role: string }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 24px;
  color: white;
  flex-shrink: 0;
  background: ${props => {
    switch(props.role) {
      case 'System Admin': return '#DC2626';
      case 'Foodcourt General': return '#EA580C';
      case 'Brand General': return '#DC2626';
      case 'Foodcourt Manager': return '#F59E0B';
      case 'Brand Manager': return '#EF4444';
      case 'Restaurant Admin': return '#059669';
      case 'Staff': return '#D97706';
      default: return '#6B7280';
    }
  }};
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 8px;
`;

const ProfileRole = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const RoleBadge = styled.span<{ role: string }>`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => {
    switch(props.role) {
      case 'System Admin': return '#FEE2E2';
      case 'Foodcourt General': return '#FED7AA';
      case 'Brand General': return '#FEE2E2';
      case 'Foodcourt Manager': return '#FEF3C7';
      case 'Brand Manager': return '#FEE2E2';
      case 'Restaurant Admin': return '#ECFDF5';
      case 'Staff': return '#FEF3C7';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.role) {
      case 'System Admin': return '#DC2626';
      case 'Foodcourt General': return '#EA580C';
      case 'Brand General': return '#DC2626';
      case 'Foodcourt Manager': return '#F59E0B';
      case 'Brand Manager': return '#EF4444';
      case 'Restaurant Admin': return '#059669';
      case 'Staff': return '#D97706';
      default: return '#6B7280';
    }
  }};
`;

const ProfileMeta = styled.div`
  font-size: 14px;
  color: #6B7280;
`;

// TabContainer and Tab are now imported from UI components

const ContentCard = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
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

  &:disabled {
    background: #F9FAFB;
    color: #6B7280;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const StatCard = styled.div`
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: ${props => props.variant === 'primary' ? 'none' : '1px solid #E5E7EB'};
  background: ${props => props.variant === 'primary' ? '#635BFF' : 'white'};
  color: ${props => props.variant === 'primary' ? 'white' : '#6B7280'};
  
  &:hover {
    background: ${props => props.variant === 'primary' ? '#5A51E6' : '#F9FAFB'};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ScheduleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const DayCard = styled.div<{ active: boolean }>`
  padding: 16px 12px;
  border: 2px solid ${props => props.active ? '#635BFF' : '#E5E7EB'};
  border-radius: 8px;
  text-align: center;
  background: ${props => props.active ? 'rgba(99, 91, 255, 0.05)' : 'white'};
  transition: all 0.2s;
`;

const DayName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  text-transform: uppercase;
`;

const DayTime = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const SaveStatusMessage = styled.div<{ show: boolean }>`
  min-height: 40px;
  margin-top: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transition: opacity 0.3s, visibility 0.3s;
  background: linear-gradient(135deg, #E0F2FE 0%, #DBEAFE 100%);
  color: #0369A1;
  border: 1px solid #BAE6FD;

  &::before {
    content: '✓';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #0369A1;
    color: white;
    font-size: 12px;
    flex-shrink: 0;
  }
`;

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { restaurantId } = useParams<{ restaurantId?: string }>();
  const { currentStaff, updateStaff, isLoggedIn } = useStaff();
  const { user: authUser, isAuthenticated, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'schedule' | 'performance' | 'security'>('profile');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    company_name: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Force hasChanges to true when any input changes
    if (!hasChanges) {
      setHasChanges(true);
      setSavedSuccessfully(false); // Clear saved message when making changes
    }
  };
  const [hasChanges, setHasChanges] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<any>(null);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);

  // State for actual user data from database (single source of truth)
  const [dbUser, setDbUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load user data from database using same pattern as AdminDashboard
  useEffect(() => {
    const fetchUserData = async () => {
      console.log('🔄 Starting user data fetch...');
      console.log('🔄 authUser:', authUser);
      console.log('🔄 authUser.id:', authUser?.id);

      if (authUser?.id) {
        try {
          console.log('🔄 Fetching user from API, ID:', authUser.id);

          // Use exact same pattern as AdminDashboard
          const userResponse = await fetch(`/api/users/${authUser.id}`);
          if (!userResponse.ok) {
            throw new Error('Failed to fetch user');
          }

          const userData = await userResponse.json();
          const user = userData.data || userData;
          console.log(' Fetched user:', user);

          setDbUser(user);
        } catch (error) {
          console.error('❌ Failed to load user from database:', error);
        }
      } else {
        console.log(' No authUser ID available');
      }
      setLoading(false);
    };

    fetchUserData();
  }, [authUser?.id]);

  // Tab state is now automatically managed by the Tabs component via URL params

  // ALWAYS use database user as primary source - NO fallbacks for System Admin
  const currentUser = dbUser ? {
    id: dbUser.id,
    name: dbUser.full_name || dbUser.name || 'Unknown',
    email: dbUser.email,
    phone: dbUser.phone || '',
    username: dbUser.username || dbUser.email,
    role: dbUser.role,
    department: dbUser.department || dbUser.position || (dbUser.role === 'System Admin' ? 'System Administration' : 'Administration'),
    company_name: dbUser.company_name || (dbUser.role === 'System Admin' ? 'Purple Here Technologies Sdn Bhd' : ''),
    joinDate: dbUser.createdAt || new Date().toISOString(),
    lastLogin: new Date().toISOString(), // Always show current time since we don't track last_login
    schedule: {
      monday: { active: true, start: '09:00', end: '17:00' },
      tuesday: { active: true, start: '09:00', end: '17:00' },
      wednesday: { active: true, start: '09:00', end: '17:00' },
      thursday: { active: true, start: '09:00', end: '17:00' },
      friday: { active: true, start: '09:00', end: '17:00' },
      saturday: { active: false, start: '09:00', end: '17:00' },
      sunday: { active: false, start: '09:00', end: '17:00' }
    },
    totalShifts: 0,
    totalSales: 0,
    performance: {
      efficiency: 100,
      customerRating: 5.0,
      ordersProcessed: 0
    }
  } : null;

  // Debug logging
  useEffect(() => {
    if (dbUser) {
      console.log('👤 Profile Page - DB User Data:', {
        full_name: dbUser.full_name,
        username: dbUser.username,
        email: dbUser.email,
        role: dbUser.role,
        department: dbUser.department,
        position: dbUser.position,
        createdAt: dbUser.createdAt,
        updatedAt: dbUser.updatedAt
      });
      console.log('👤 Profile Page - Current User:', currentUser);
    }
  }, [dbUser]);

  useEffect(() => {
    if (currentUser && formData.name === '') {
      // Only initialize formData once when currentUser first loads
      console.log('🔥 Initializing formData from currentUser:', currentUser);
      const newFormData = {
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        department: currentUser.department || '',
        company_name: currentUser.company_name || '',
      };
      console.log('🔥 New formData:', newFormData);
      setFormData(newFormData);
      setHasChanges(false);
    }
  }, [currentUser, formData.name]);

  // 변경사항 감지
  useEffect(() => {
    if (currentUser) {
      const hasChanged =
        formData.name !== currentUser.name ||
        formData.email !== currentUser.email ||
        formData.phone !== currentUser.phone ||
        formData.department !== (currentUser.department || '') ||
        formData.company_name !== (currentUser.company_name || '');
      setHasChanges(hasChanged);

      // Clear saved message when changes detected
      if (hasChanged && savedSuccessfully) {
        setSavedSuccessfully(false);
      }
    }
  }, [formData, currentUser, savedSuccessfully]);

  // Tab change handler - now just updates local state since URL is managed by Tabs component
  const handleTabChange = (tab: string) => {
    // System Admin should not access performance tab
    if (currentUser?.role === 'System Admin' && tab === 'performance') {
      setActiveTab('profile');
    } else {
      setActiveTab(tab as 'profile' | 'schedule' | 'performance' | 'security');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔥 handleSubmit called');
    console.log('🔥 currentUser:', currentUser);
    console.log('🔥 hasChanges:', hasChanges);
    console.log('🔥 formData:', formData);
    console.log('🔥 dbUser:', dbUser);
    console.log('🔥 authUser:', authUser);

    if (!currentUser || !hasChanges) {
      console.log('❌ Early return: no currentUser or no changes');
      return;
    }

    try {
      console.log('🔥 Saving profile data...');

      // ONLY handle database users - NO staff context for System Admin
      if (dbUser && authUser?.id) {
        console.log('🔥 Updating database user with ID:', authUser.id);

        // Update database
        const response = await fetch(`/api/users/${authUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            full_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            department: formData.department,
            company_name: formData.company_name
          }),
        });

        if (!response.ok) {
          console.error('❌ Database update failed:', response.status);
          throw new Error('Failed to update user in database');
        }

        const result = await response.json();
        console.log('✅ Database update result:', result);

        // Reload fresh data from database
        const updatedResponse = await fetch(`/api/users/${authUser.id}`);
        if (updatedResponse.ok) {
          const updatedResult = await updatedResponse.json();
          const updatedUserData = updatedResult.data || updatedResult;
          console.log('🔥 Reloaded user data:', updatedUserData);
          setDbUser(updatedUserData);
        }

        // Update AuthContext for sidebar sync
        updateUser({
          name: formData.name,
          email: formData.email
        });

        setHasChanges(false);
        setSavedSuccessfully(true);
        console.log('✅ Profile save completed');
      } else {
        console.error('❌ No database user or authUser ID available');
        alert('Failed to save profile. Please check database connection.');
      }
    } catch (error) {
      console.error('❌ Failed to update profile:', error);
      alert('Failed to save profile: ' + error.message);
    }
  };

  const handleReset = () => {
    if (currentUser) {
      setFormData({
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        department: currentUser.department || '',
        company_name: currentUser.company_name || '',
      });
      setHasChanges(false);
      setSavedSuccessfully(false);
    }
  };

  // Warn user before leaving page with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  const getInitials = (name: string) => {
    if (!name) return '?';

    const words = name.trim().split(' ').filter(word => word.length > 0);

    if (words.length === 0) return '?';

    // If single word, take first 2 characters
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }

    // If multiple words, take first character of each word (max 2)
    return words
      .slice(0, 2)
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const handleEditSchedule = () => {
    if (currentUser) {
      setEditingSchedule({ ...currentUser.schedule });
      setShowScheduleModal(true);
    }
  };

  const handleSaveSchedule = async () => {
    if (currentUser && editingSchedule) {
      // Only update staff schedule if it's a staff member
      if (currentStaff) {
        await updateStaff(currentStaff.id, { schedule: editingSchedule });
      }
      // For admin users, we would need a different update method
      setShowScheduleModal(false);
      setEditingSchedule(null);
    }
  };

  const handleScheduleChange = (day: string, field: string, value: any) => {
    setEditingSchedule((prev: any) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const handlePasswordChange = async () => {
    setPasswordError('');
    setPasswordSuccess(false);

    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('All fields are required');
      return;
    }

    if (passwordData.newPassword.length < 4) {
      setPasswordError('New password must be at least 4 characters long');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      setPasswordError('New password must be different from current password');
      return;
    }

    try {
      const response = await fetch(`/api/users/${currentUser?.id}/password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setPasswordError(errorData.error || 'Failed to change password');
        return;
      }

      // Success
      setPasswordSuccess(true);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setPasswordSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error changing password:', error);
      setPasswordError('An error occurred while changing password');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatLastLogin = (lastLogin?: string) => {
    if (!lastLogin) return 'Never';
    const date = new Date(lastLogin);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  if (!isAuthenticated || !currentUser) {
    return (
      <MainLayout>
        <ProfileContainer>
          <Header>
            <HeaderTitle>My Profile</HeaderTitle>
          </Header>
          <Content>
            <ContentCard>
              <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
                <div style={{ fontSize: '18px', marginBottom: '8px' }}>Please log in to view your profile</div>
                <div style={{ fontSize: '14px' }}>You need to be logged in to access this page.</div>
              </div>
            </ContentCard>
          </Content>
        </ProfileContainer>
      </MainLayout>
    );
  }

  // Show loading state
  if (loading || !currentUser) {
    return (
      <MainLayout>
        <ProfileContainer>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div>Loading profile...</div>
          </div>
        </ProfileContainer>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <ProfileContainer>
        <Header>
          <HeaderTitle>My Profile</HeaderTitle>
        </Header>

        <Content>
          <ProfileHeader>
            <StaffAvatar role={currentUser.role}>
              {getInitials(currentUser.name)}
            </StaffAvatar>
            <ProfileInfo>
              <ProfileName>{currentUser.name} {dbUser && <span style={{fontSize: '12px', color: '#10B981', fontWeight: 'normal'}}>✓ DB</span>}</ProfileName>
              <ProfileRole>
                <RoleBadge role={currentUser.role}>
                  {currentUser.role}
                </RoleBadge>
                <span style={{ fontSize: '14px', color: '#6B7280', textTransform: 'capitalize' }}>
                  {currentUser.department}
                </span>
              </ProfileRole>
              <ProfileMeta>
                Member since {formatDate(currentUser.joinDate)} • Last login {formatLastLogin(currentUser.lastLogin)}
                {dbUser && <span style={{fontSize: '11px', color: '#10B981', marginLeft: '8px'}}>• Database ID: {dbUser.id}</span>}
              </ProfileMeta>
            </ProfileInfo>
          </ProfileHeader>

          <Tabs
            useUrlParams={true}
            defaultTab="profile"
            onTabChange={handleTabChange}
            tabs={[
              { key: 'profile', label: 'Personal Information' },
              { key: 'schedule', label: 'Work Schedule' },
              // Performance tab only for non-System Admin roles
              ...(currentUser.role !== 'System Admin' ? [{ key: 'performance', label: 'Performance' }] : []),
              { key: 'security', label: 'Change Password' }
            ]}
          />

          {activeTab === 'profile' && (
            <ContentCard>
              <div>
                <FormGrid>
                  <FormGroup>
                    <Label>Full Name</Label>
                    <Input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => {
                        console.log('🔥 Name input onChange:', e.target.value);
                        handleInputChange('name', e.target.value);
                      }}
                      placeholder="Enter full name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Role</Label>
                    <Input
                      type="text"
                      value={currentUser.role}
                      disabled
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter email address"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Username</Label>
                    <Input
                      type="text"
                      value={currentUser.username}
                      disabled
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Phone Number</Label>
                    <Input
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </FormGroup>

                  {/* System Admin Role - Company Name */}
                  {currentUser.role === 'System Admin' && (
                    <FormGroup>
                      <Label>Company Name</Label>
                      <Input
                        type="text"
                        value={formData.company_name || ''}
                        onChange={(e) => handleInputChange('company_name', e.target.value)}
                        placeholder="Enter company name"
                      />
                    </FormGroup>
                  )}

                  <FormGroup>
                    <Label>Department</Label>
                    <Input
                      type="text"
                      value={formData.department || ''}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      placeholder="Enter department"
                    />
                  </FormGroup>
                </FormGrid>

                <ButtonContainer>
                  <Button type="button" onClick={handleReset} disabled={!hasChanges}>
                    Reset
                  </Button>
                  <Button type="button" variant="primary" disabled={!hasChanges} onClick={handleSubmit}>
                    Save Changes
                  </Button>
                </ButtonContainer>

                <SaveStatusMessage show={savedSuccessfully && !hasChanges}>
                  Your profile has been successfully updated.
                </SaveStatusMessage>
              </div>
            </ContentCard>
          )}

          {activeTab === 'schedule' && (
            <ContentCard>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '20px' }}>
                {(currentUser?.role === 'System Admin' || currentUser?.role === 'manager') && (
                  <Button 
                    variant="primary" 
                    style={{ 
                      flex: 'none',
                      padding: '10px 16px', 
                      fontSize: '14px',
                      minWidth: '120px'
                    }} 
                    onClick={handleEditSchedule}
                  >
                    Edit Schedule
                  </Button>
                )}
              </div>
              {currentUser?.role !== 'System Admin' && currentUser?.role !== 'manager' && (
                <div style={{ 
                  background: '#F8FAFC', 
                  border: '1px solid #E2E8F0', 
                  borderRadius: '8px', 
                  padding: '12px 16px', 
                  marginBottom: '20px',
                  fontSize: '14px',
                  color: '#6B7280'
                }}>
                  ℹ️ Work schedules are managed by administrators and managers. Contact your manager to make changes.
                </div>
              )}
              <ScheduleGrid>
                {Object.entries(currentUser.schedule).map(([day, schedule]) => (
                  <DayCard key={day} active={schedule.active}>
                    <DayName>{day}</DayName>
                    <DayTime>
                      {schedule.active 
                        ? `${schedule.start} - ${schedule.end}`
                        : 'Off'
                      }
                    </DayTime>
                  </DayCard>
                ))}
              </ScheduleGrid>
            </ContentCard>
          )}

          {activeTab === 'performance' && (
            <ContentCard>
              <SectionTitle>Performance Statistics</SectionTitle>
              <StatsGrid>
                <StatCard>
                  <StatValue>{currentUser.totalShifts}</StatValue>
                  <StatLabel>Total Shifts</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>RM {currentUser.totalSales.toLocaleString()}</StatValue>
                  <StatLabel>Total Sales</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{currentUser.performance.efficiency}%</StatValue>
                  <StatLabel>Efficiency</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{currentUser.performance.customerRating.toFixed(1)}</StatValue>
                  <StatLabel>Customer Rating</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{currentUser.performance.ordersProcessed.toLocaleString()}</StatValue>
                  <StatLabel>Orders Processed</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>
                    {currentUser.performance.ordersProcessed > 0
                      ? (currentUser.totalSales / currentUser.performance.ordersProcessed).toFixed(2)
                      : '0.00'
                    }
                  </StatValue>
                  <StatLabel>Avg Order Value</StatLabel>
                </StatCard>
              </StatsGrid>
            </ContentCard>
          )}

          {activeTab === 'security' && (
            <ContentCard>
              <div>
                <FormGrid>
                  <FormGroup>
                    <Label>Current Password</Label>
                    <Input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      placeholder="Enter current password"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>New Password</Label>
                    <Input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      placeholder="Enter new password (min 4 characters)"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Confirm New Password</Label>
                    <Input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      placeholder="Confirm new password"
                    />
                  </FormGroup>
                </FormGrid>

                {passwordError && (
                  <div style={{
                    padding: '12px 16px',
                    backgroundColor: '#FEE2E2',
                    border: '1px solid #FCA5A5',
                    borderRadius: '6px',
                    color: '#991B1B',
                    fontSize: '14px',
                    marginTop: '20px'
                  }}>
                    {passwordError}
                  </div>
                )}

                {passwordSuccess && (
                  <div style={{
                    padding: '12px 16px',
                    backgroundColor: '#ECFDF5',
                    border: '1px solid #10B981',
                    borderRadius: '6px',
                    color: '#047857',
                    fontSize: '14px',
                    marginTop: '20px'
                  }}>
                    Password changed successfully!
                  </div>
                )}

                <ButtonContainer>
                  <Button variant="primary" onClick={handlePasswordChange}>
                    Change Password
                  </Button>
                </ButtonContainer>
              </div>
            </ContentCard>
          )}
        </Content>

        {/* Schedule Edit Modal */}
        <Modal
          isOpen={showScheduleModal}
          onClose={() => setShowScheduleModal(false)}
          title="Edit Schedule"
          footer={
            <>
              <ModalButton variant="secondary" onClick={() => setShowScheduleModal(false)}>
                Cancel
              </ModalButton>
              <ModalButton onClick={handleSaveSchedule}>
                Save Schedule
              </ModalButton>
            </>
          }
        >
          {editingSchedule && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {Object.entries(editingSchedule).map(([day, schedule]: [string, any]) => (
                <div key={day} style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 0',
                  borderBottom: '1px solid #F3F4F6'
                }}>
                  <div style={{ fontWeight: '500', textTransform: 'capitalize', fontSize: '14px', color: '#374151' }}>
                    {day}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '14px', minWidth: '80px' }}>
                      <input
                        type="checkbox"
                        checked={schedule.active}
                        onChange={(e) => handleScheduleChange(day, 'active', e.target.checked)}
                        style={{ cursor: 'pointer' }}
                      />
                      <span style={{ color: schedule.active ? '#059669' : '#6B7280' }}>
                        {schedule.active ? 'Active' : 'Off'}
                      </span>
                    </label>
                    {schedule.active && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="time"
                          value={schedule.start}
                          onChange={(e) => handleScheduleChange(day, 'start', e.target.value)}
                          style={{
                            padding: '6px 8px',
                            border: '1px solid #D1D5DB',
                            borderRadius: '6px',
                            fontSize: '14px',
                            width: '100px'
                          }}
                        />
                        <span style={{ color: '#9CA3AF', fontSize: '14px' }}>-</span>
                        <input
                          type="time"
                          value={schedule.end}
                          onChange={(e) => handleScheduleChange(day, 'end', e.target.value)}
                          style={{
                            padding: '6px 8px',
                            border: '1px solid #D1D5DB',
                            borderRadius: '6px',
                            fontSize: '14px',
                            width: '100px'
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal>
      </ProfileContainer>
    </MainLayout>
  );
};

export default ProfilePage;