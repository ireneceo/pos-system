import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStaff, Staff } from '../../contexts/StaffContext';
import PhoneInput from '../Common/PhoneInput';
import { useTranslation } from 'react-i18next';

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  padding: 40px 0;
  z-index: 10000;
  animation: fadeIn 0.2s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 85vh;
  overflow: auto;
  animation: slideUp 0.3s ease-out;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  
  @keyframes slideUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  margin: auto 0;
`;

const ModalHeader = styled.div`
  padding: 24px 24px 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #F1F5F9;
  margin-bottom: 0;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #64748B;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;
  
  &:hover {
    background: #F1F5F9;
    color: #475569;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const ProfileSection = styled.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 16px 0;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const StaffAvatar = styled.div<{ role: string }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 20px;
  color: white;
  background: ${props => {
    switch(props.role) {
      case 'admin': return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      case 'manager': return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
      case 'cashier': return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
      case 'kitchen': return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
      case 'server': return 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)';
      default: return 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)';
    }
  }};
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`;

const ProfileRole = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const RoleBadge = styled.span<{ role: string }>`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch(props.role) {
      case 'admin': return '#EDE9FE';
      case 'manager': return '#FEE2E2';
      case 'cashier': return '#DBEAFE';
      case 'kitchen': return '#ECFDF5';
      case 'server': return '#FEF3C7';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.role) {
      case 'admin': return '#5B21B6';
      case 'manager': return '#DC2626';
      case 'cashier': return '#1E40AF';
      case 'kitchen': return '#059669';
      case 'server': return '#D97706';
      default: return '#6B7280';
    }
  }};
`;

const ProfileMeta = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  
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

const StatCard = styled.div`
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 20px;
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
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
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

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #E5E7EB;
  margin-bottom: 24px;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 12px 16px;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 2px solid ${props => props.active ? '#635BFF' : 'transparent'};
  color: ${props => props.active ? '#635BFF' : '#6B7280'};
  
  &:hover {
    color: #635BFF;
  }
`;

const ScheduleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-top: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DayCard = styled.div<{ active: boolean }>`
  padding: 12px 8px;
  border: 1px solid ${props => props.active ? '#635BFF' : '#E5E7EB'};
  border-radius: 8px;
  text-align: center;
  background: ${props => props.active ? 'rgba(99, 91, 255, 0.05)' : 'white'};
`;

const DayName = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 4px;
  text-transform: uppercase;
`;

const DayTime = styled.div`
  font-size: 11px;
  color: #6B7280;
`;

interface StaffProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StaffProfileModal: React.FC<StaffProfileModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation('common');
  const { currentStaff, updateStaff, isLoggedIn } = useStaff();
  const [activeTab, setActiveTab] = useState<'profile' | 'schedule' | 'performance'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (currentStaff) {
      setFormData({
        name: currentStaff.name,
        email: currentStaff.email,
        phone: currentStaff.phone,
      });
    }
  }, [currentStaff]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStaff) return;

    try {
      await updateStaff(currentStaff.id, formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleClose = () => {
    setIsEditing(false);
    setActiveTab('profile');
    onClose();
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
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

  if (!isLoggedIn || !currentStaff) {
    return null;
  }

  return (
    <ModalOverlay isOpen={isOpen} onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>My Profile</ModalTitle>
          <CloseButton onClick={handleClose}>×</CloseButton>
        </ModalHeader>

        <ModalBody>
          <ProfileHeader>
            <StaffAvatar role={currentStaff.role}>
              {getInitials(currentStaff.name)}
            </StaffAvatar>
            <ProfileInfo>
              <ProfileName>{currentStaff.name}</ProfileName>
              <ProfileRole>
                <RoleBadge role={currentStaff.role}>
                  {currentStaff.role}
                </RoleBadge>
                <span style={{ fontSize: '12px', color: '#6B7280', textTransform: 'capitalize' }}>
                  {currentStaff.department}
                </span>
              </ProfileRole>
              <ProfileMeta>
                Member since {formatDate(currentStaff.joinDate)} • Last login {formatLastLogin(currentStaff.lastLogin)}
              </ProfileMeta>
            </ProfileInfo>
          </ProfileHeader>

          <TabContainer>
            <Tab 
              active={activeTab === 'profile'} 
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </Tab>
            <Tab 
              active={activeTab === 'schedule'} 
              onClick={() => setActiveTab('schedule')}
            >
              Schedule
            </Tab>
            <Tab 
              active={activeTab === 'performance'} 
              onClick={() => setActiveTab('performance')}
            >
              Performance
            </Tab>
          </TabContainer>

          {activeTab === 'profile' && (
            <ProfileSection>
              <SectionTitle>Personal Information</SectionTitle>
              <FormContainer onSubmit={handleSubmit}>
                <FormGrid>
                  <FormGroup>
                    <Label>Full Name</Label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!isEditing}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Username</Label>
                    <Input
                      type="text"
                      value={currentStaff.username}
                      disabled
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Phone Number</Label>
                    {isEditing ? (
                      <PhoneInput
                        value={formData.phone}
                        onChange={(value) => setFormData({ ...formData, phone: value })}
                      />
                    ) : (
                      <Input
                        type="text"
                        value={formData.phone}
                        disabled
                      />
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label>Role</Label>
                    <Input
                      type="text"
                      value={currentStaff.role}
                      disabled
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Department</Label>
                    <Input
                      type="text"
                      value={currentStaff.department}
                      disabled
                    />
                  </FormGroup>
                </FormGrid>

                <ButtonContainer>
                  {isEditing ? (
                    <>
                      <Button type="button" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="primary">
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <Button type="button" variant="primary" onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  )}
                </ButtonContainer>
              </FormContainer>
            </ProfileSection>
          )}

          {activeTab === 'schedule' && (
            <ProfileSection>
              <SectionTitle>Work Schedule</SectionTitle>
              <ScheduleGrid>
                {Object.entries(currentStaff.schedule).map(([day, schedule]) => (
                  <DayCard key={day} active={schedule.active}>
                    <DayName>{day.slice(0, 3)}</DayName>
                    <DayTime>
                      {schedule.active 
                        ? `${schedule.start} - ${schedule.end}`
                        : 'Off'
                      }
                    </DayTime>
                  </DayCard>
                ))}
              </ScheduleGrid>
            </ProfileSection>
          )}

          {activeTab === 'performance' && (
            <ProfileSection>
              <SectionTitle>Performance Statistics</SectionTitle>
              <FormGrid>
                <StatCard>
                  <StatValue>{currentStaff.totalShifts}</StatValue>
                  <StatLabel>Total Shifts</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>RM {currentStaff.totalSales.toLocaleString()}</StatValue>
                  <StatLabel>Total Sales</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{currentStaff.performance.efficiency}%</StatValue>
                  <StatLabel>Efficiency</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{currentStaff.performance.customerRating.toFixed(1)}</StatValue>
                  <StatLabel>Customer Rating</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{currentStaff.performance.ordersProcessed.toLocaleString()}</StatValue>
                  <StatLabel>Orders Processed</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>
                    {currentStaff.performance.ordersProcessed > 0 
                      ? (currentStaff.totalSales / currentStaff.performance.ordersProcessed).toFixed(2)
                      : '0.00'
                    }
                  </StatValue>
                  <StatLabel>Avg Order Value</StatLabel>
                </StatCard>
              </FormGrid>
            </ProfileSection>
          )}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default StaffProfileModal;