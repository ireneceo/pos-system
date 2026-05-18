import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useStaff } from '../../contexts/StaffContext';
import { useAuth } from '../../contexts/AuthContext';
import { Modal, ModalButton } from '../../components/UI/Modal';
import { Tabs, Tab } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import PhoneInput from '../../components/Common/PhoneInput';
import PageHeader from '../../components/Common/PageHeader';
import SubscriptionTab from './SubscriptionTab';
import AutoSaveField from '../../components/Common/AutoSaveField';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
import { formatDate as formatDateTz } from '../../utils/timezone';
// 스타일 컴포넌트
const ProfileContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`;


const Content = styled.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
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

const ContentCard = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
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
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.15s;

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

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
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


const ProfilePage: React.FC = () => {
  const { t } = useTranslation('settings');
  // const navigate = useNavigate();
  // const location = useLocation();
  // const { restaurantId } = useParams<{ restaurantId?: string }>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { currentStaff, updateStaff, isLoggedIn } = useStaff();
  const { user: authUser, isAuthenticated, updateUser, isLoading: authLoading } = useAuth();
  const [activeTab, handleTabParamChange] = useTabParam<'profile' | 'subscription' | 'schedule' | 'security'>('profile');
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
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

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
          const token = getAuthToken();
          const userResponse = await fetch(`/api/users/${authUser.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser?.id]);

  // Use database user as primary source, fallback to authUser if dbUser not loaded
  // Wrapped in useMemo to prevent exhaustive-deps warnings
  const currentUser = useMemo(() => {
    const user = dbUser || authUser;
    if (!user) return null;

    return {
      id: user.id,
      name: dbUser?.full_name || dbUser?.name || authUser?.name || authUser?.full_name || 'Unknown',
      email: user.email,
      phone: user.phone || '',
      username: dbUser?.username || user.email,
      role: user.role,
      department: dbUser?.department || dbUser?.position || (user.role === 'System Admin' ? 'System Administration' : 'Administration'),
      company_name: dbUser?.company_name || (user.role === 'System Admin' ? 'Purple Here Technologies Sdn Bhd' : ''),
      joinDate: dbUser?.createdAt || new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      schedule: {
        monday: { active: true, start: '09:00', end: '17:00' },
        tuesday: { active: true, start: '09:00', end: '17:00' },
        wednesday: { active: true, start: '09:00', end: '17:00' },
        thursday: { active: true, start: '09:00', end: '17:00' },
        friday: { active: true, start: '09:00', end: '17:00' },
        saturday: { active: false, start: '09:00', end: '17:00' },
        sunday: { active: false, start: '09:00', end: '17:00' }
      },
    };
  }, [dbUser, authUser]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbUser]);

  // Track if we've initialized from DB
  const [initializedFromDb, setInitializedFromDb] = useState(false);

  useEffect(() => {
    // Initialize formData when dbUser loads (primary source)
    // Or when currentUser first loads and dbUser is not available yet
    if (dbUser && !initializedFromDb) {
      console.log('🔥 Initializing formData from dbUser:', dbUser);
      const newFormData = {
        name: dbUser.full_name || dbUser.name || '',
        email: dbUser.email || '',
        phone: dbUser.phone || '',
        department: dbUser.department || dbUser.position || '',
        company_name: dbUser.company_name || '',
      };
      console.log('🔥 New formData from DB:', newFormData);
      setFormData(newFormData);
      setHasChanges(false);
      setInitializedFromDb(true);
    } else if (currentUser && formData.name === '' && !dbUser) {
      // Fallback: initialize from authUser only if dbUser not loaded yet
      console.log('🔥 Initializing formData from authUser (fallback):', currentUser);
      const newFormData = {
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        department: currentUser.department || '',
        company_name: currentUser.company_name || '',
      };
      setFormData(newFormData);
      setHasChanges(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbUser, currentUser, initializedFromDb]);

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

  // Tab change handler
  const handleTabChange = (tab: string) => {
    handleTabParamChange(tab as 'profile' | 'subscription' | 'schedule' | 'security');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔥 handleSubmit called');
    console.log('🔥 currentUser:', currentUser);
    console.log('🔥 hasChanges:', hasChanges);
    console.log('🔥 formData:', formData);
    console.log('🔥 dbUser:', dbUser);
    console.log('🔥 authUser:', authUser);

    if (!currentUser || !hasChanges || saving) return;

    try {
      setSaving(true);
      setSavedSuccessfully(false);

      if (dbUser && authUser?.id) {
        const token = getAuthToken();
        const response = await fetch(`/api/users/${authUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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
          const errData = await response.json().catch(() => null);
          throw new Error(errData?.message || errData?.error || 'Failed to update profile');
        }

        // Reload fresh data from database
        const updatedResponse = await fetch(`/api/users/${authUser.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (updatedResponse.ok) {
          const updatedResult = await updatedResponse.json();
          const updatedUserData = updatedResult.data || updatedResult;
          setDbUser(updatedUserData);
          // Re-sync formData with updated DB data
          setFormData({
            name: updatedUserData.full_name || '',
            email: updatedUserData.email || '',
            phone: updatedUserData.phone || '',
            department: updatedUserData.department || '',
            company_name: updatedUserData.company_name || '',
          });
          setInitializedFromDb(true);
        }

        updateUser({ name: formData.name, email: formData.email });
        setHasChanges(false);
        setSavedSuccessfully(true);
        setTimeout(() => setSavedSuccessfully(false), 3000);
      }
    } catch (error: any) {
      console.error('Failed to update profile:', error);
      setSavedSuccessfully(false);
      setSaveError(error?.message || 'Failed to save profile');
      setFormData(prev => ({ ...prev }));
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    const syntheticEvent = { preventDefault: () => {} } as React.FormEvent;
    await handleSubmit(syntheticEvent);
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

    if (passwordData.newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    if (!/[a-z]/.test(passwordData.newPassword)) {
      setPasswordError('Password must contain at least one lowercase letter');
      return;
    }

    if (!/[A-Z]/.test(passwordData.newPassword)) {
      setPasswordError('Password must contain at least one uppercase letter');
      return;
    }

    if (!/[0-9]/.test(passwordData.newPassword)) {
      setPasswordError('Password must contain at least one number');
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
      const token = getAuthToken();
      const response = await fetch(`/api/users/${currentUser?.id}/password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
    return formatDateTz(dateString, null);
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

  // Show loading state while auth is checking or profile is loading
  if (authLoading || loading) {
    return (
      <>
        <ProfileContainer>
          <PageHeader title="My Profile" />
          <Content>
            <ContentCard>
              <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
                <div>{t('settings:profilePage.loadingProfile')}</div>
              </div>
            </ContentCard>
          </Content>
        </ProfileContainer>
      </>
    );
  }

  // Show login message only after auth check is complete
  if (!isAuthenticated || !currentUser) {
    return (
      <>
        <ProfileContainer>
          <PageHeader title="My Profile" />
          <Content>
            <ContentCard>
              <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
                <div style={{ fontSize: '18px', marginBottom: '8px' }}>{t('settings:profilePage.pleaseLogInToViewYourProfile')}</div>
                <div style={{ fontSize: '14px' }}>{t('settings:profilePage.youNeedToBeLoggedInToAccessThisPage')}</div>
              </div>
            </ContentCard>
          </Content>
        </ProfileContainer>
      </>
    );
  }

  return (
    <>
      <ProfileContainer>
        <PageHeader title="My Profile" />

        <Content>
          {saveError && (
            <div style={{ padding: 12, background: '#FEE2E2', color: '#DC2626', borderRadius: 8, marginBottom: 16, fontSize: 13, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{saveError}</span>
              <button type="button" onClick={() => setSaveError(null)} style={{ background: 'transparent', border: 0, color: '#DC2626', cursor: 'pointer', fontSize: 16 }} aria-label="Dismiss">×</button>
            </div>
          )}
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

          <Tabs>
            <Tab active={activeTab === 'profile'} onClick={() => handleTabChange('profile')}>
              Personal Information
            </Tab>
            {['Restaurant Admin', 'Brand General', 'Foodcourt General', 'Restaurant Owner'].includes(currentUser.role) && !dbUser?.is_demo && (
              <Tab active={activeTab === 'subscription'} onClick={() => handleTabChange('subscription')}>
                Subscription
              </Tab>
            )}
            <Tab active={activeTab === 'schedule'} onClick={() => handleTabChange('schedule')}>
              Work Schedule
            </Tab>
            <Tab active={activeTab === 'security'} onClick={() => handleTabChange('security')}>
              Change Password
            </Tab>
          </Tabs>

          {activeTab === 'profile' && (
            <ContentCard>
              <div>
                <FormGrid>
                  <FormGroup>
                    <Label>{t('settings:profilePage.fullName')}</Label>
                    <AutoSaveField onSave={handleSave}>
                      <Input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => {
                          handleInputChange('name', e.target.value);
                        }}
                        placeholder="Enter full name"
                      />
                    </AutoSaveField>
                  </FormGroup>
                  <FormGroup>
                    <Label>{t('settings:profilePage.role')}</Label>
                    <Input
                      type="text"
                      value={currentUser.role}
                      disabled
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>{t('settings:profilePage.emailAddress')}</Label>
                    <AutoSaveField onSave={handleSave}>
                      <Input
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter email address"
                      />
                    </AutoSaveField>
                  </FormGroup>
                  <FormGroup>
                    <Label>{t('settings:profilePage.username')}</Label>
                    <Input
                      type="text"
                      value={currentUser.username}
                      disabled
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>{t('settings:profilePage.phoneNumber')}</Label>
                    <AutoSaveField onSave={handleSave}>
                      <PhoneInput
                        value={formData.phone || ''}
                        onChange={(value) => handleInputChange('phone', value)}
                      />
                    </AutoSaveField>
                  </FormGroup>

                  {/* System Admin Role - Company Name */}
                  {currentUser.role === 'System Admin' && (
                    <FormGroup>
                      <Label>{t('settings:profilePage.companyName')}</Label>
                      <AutoSaveField onSave={handleSave}>
                        <Input
                          type="text"
                          value={formData.company_name || ''}
                          onChange={(e) => handleInputChange('company_name', e.target.value)}
                          placeholder="Enter company name"
                        />
                      </AutoSaveField>
                    </FormGroup>
                  )}

                  <FormGroup>
                    <Label>{t('settings:profilePage.department')}</Label>
                    <AutoSaveField onSave={handleSave}>
                      <Input
                        type="text"
                        value={formData.department || ''}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        placeholder="Enter department"
                      />
                    </AutoSaveField>
                  </FormGroup>
                </FormGrid>
              </div>
            </ContentCard>
          )}

          {activeTab === 'subscription' && (
            <SubscriptionTab />
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


          {activeTab === 'security' && (
            <ContentCard>
              <div>
                <div style={{
                  padding: '12px 16px',
                  backgroundColor: '#F0F9FF',
                  border: '1px solid #BAE6FD',
                  borderRadius: '6px',
                  color: '#0C4A6E',
                  fontSize: '13px',
                  marginBottom: '20px',
                  lineHeight: '1.5'
                }}>
                  <strong>Password Requirements:</strong>
                  <ul style={{ margin: '6px 0 0 0', paddingLeft: '18px' }}>
                    <li>{t('settings:profilePage.atLeast8Characters')}</li>
                    <li>{t('settings:profilePage.atLeastOneLowercaseLetterAz')}</li>
                    <li>{t('settings:profilePage.atLeastOneUppercaseLetterAz')}</li>
                    <li>{t('settings:profilePage.atLeastOneNumber09')}</li>
                  </ul>
                </div>
                <FormGrid>
                  <FormGroup>
                    <Label>{t('settings:profilePage.currentPassword')}</Label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <Input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        placeholder="Enter current password"
                        style={{ paddingRight: '42px' }}
                      />
                      <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} tabIndex={-1}
                        style={{ position: 'absolute', right: '14px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', color: '#9CA3AF' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
                          {showCurrentPassword ? (<><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>) : (<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>)}
                        </svg>
                      </button>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label>{t('settings:profilePage.newPassword')}</Label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <Input
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        placeholder="Min 8 chars, uppercase + lowercase + number"
                        style={{ paddingRight: '42px' }}
                      />
                      <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} tabIndex={-1}
                        style={{ position: 'absolute', right: '14px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', color: '#9CA3AF' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
                          {showNewPassword ? (<><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>) : (<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>)}
                        </svg>
                      </button>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label>{t('settings:profilePage.confirmNewPassword')}</Label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        placeholder="Confirm new password"
                        style={{ paddingRight: '42px' }}
                      />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} tabIndex={-1}
                        style={{ position: 'absolute', right: '14px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', color: '#9CA3AF' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
                          {showConfirmPassword ? (<><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>) : (<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>)}
                        </svg>
                      </button>
                    </div>
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
    </>
  );
};

export default ProfilePage;