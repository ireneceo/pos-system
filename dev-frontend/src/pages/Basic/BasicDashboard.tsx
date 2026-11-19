import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { getRoleDisplayName } from '../../utils/roleDisplay';

const Container = styled.div`
  padding: 32px;
  background: #F1F4F8;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const WelcomeCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  border: 1px solid #C7CED6;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
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

const Subtitle = styled.p`
  font-size: 18px;
  color: #4B5563;
  margin-bottom: 32px;
`;

const RoleBadge = styled.div<{ role: string }>`
  display: inline-block;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 24px;
  background: ${props => {
    switch(props.role) {
      case 'System Admin': return '#EDE9FE';
      case 'Manager': return '#DBEAFE';
      case 'Restaurant Admin': return '#ECFDF5';
      case 'Staff': return '#FEF3C7';
      default: return '#F1F4F8';
    }
  }};
  color: ${props => {
    switch(props.role) {
      case 'System Admin': return '#5B21B6';
      case 'Manager': return '#1E40AF';
      case 'Restaurant Admin': return '#059669';
      case 'Staff': return '#D97706';
      default: return '#4B5563';
    }
  }};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 32px;
`;

const InfoCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #C7CED6;
  border-left: 4px solid #635BFF;
  transition: all 0.2s;
  text-align: left;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

const InfoTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #4B5563;
  line-height: 1.5;
`;

const BasicDashboard: React.FC = () => {
  const { t } = useTranslation('dashboard');
  const { user } = useAuth();

  const getRoleDescription = (role: string) => {
    switch(role) {
      case 'System Admin':
        return t('dashboard:ui.basic.roleSystemAdmin');
      case 'Manager':
        return t('dashboard:ui.basic.roleManager');
      case 'Restaurant Admin':
        return t('dashboard:ui.basic.roleRestaurantAdmin');
      case 'Staff':
        return t('dashboard:ui.basic.roleStaff');
      default:
        return t('dashboard:ui.basic.roleDefault');
    }
  };

  return (
    <>
      <Container>
        <WelcomeCard>
          <Title>{t('dashboard:basicDashboard.welcomeToPurpleHerePos')}</Title>
          <RoleBadge role={user?.role || 'User'}>
            {getRoleDisplayName(user?.role, t)}
          </RoleBadge>
          <Subtitle>{t('dashboard:ui.basic.hello', { name: user?.name || '' })}</Subtitle>
          
          <InfoGrid>
            <InfoCard>
              <InfoTitle>{t('dashboard:basicDashboard.yourRole')}</InfoTitle>
              <InfoText>
                {getRoleDescription(user?.role || '')}
              </InfoText>
            </InfoCard>
            
            <InfoCard>
              <InfoTitle>{t('dashboard:basicDashboard.systemStatus')}</InfoTitle>
              <InfoText>
                {t('dashboard:ui.basic.systemOk')}
              </InfoText>
            </InfoCard>
            
            <InfoCard>
              <InfoTitle>{t('dashboard:basicDashboard.gettingStarted')}</InfoTitle>
              <InfoText>
                {t('dashboard:ui.basic.gettingStarted')}
              </InfoText>
            </InfoCard>
          </InfoGrid>
        </WelcomeCard>
      </Container>
    </>
  );
};

export default BasicDashboard;