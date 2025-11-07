import React from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { useAuth } from '../../contexts/AuthContext';

const Container = styled.div`
  padding: 32px;
  background: #F8FAFC;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const WelcomeCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  border: 1px solid #E6EBF1;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #6B7280;
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
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.role) {
      case 'System Admin': return '#5B21B6';
      case 'Manager': return '#1E40AF';
      case 'Restaurant Admin': return '#059669';
      case 'Staff': return '#D97706';
      default: return '#6B7280';
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
  border: 1px solid #E6EBF1;
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
  color: #6B7280;
  line-height: 1.5;
`;

const BasicDashboard: React.FC = () => {
  const { user } = useAuth();

  const getRoleDescription = (role: string) => {
    switch(role) {
      case 'System Admin':
        return 'You have full system access and can manage all managers, restaurants, and system settings.';
      case 'Manager':
        return 'You can manage multiple restaurants, view consolidated reports, and oversee operations.';
      case 'Restaurant Admin':
        return 'You can manage your restaurant, staff, menu, and access all POS functions.';
      case 'Staff':
        return 'You have access to POS terminal, kitchen display, and order management functions.';
      default:
        return 'Welcome to the OrderHere POS System.';
    }
  };

  return (
    <MainLayout>
      <Container>
        <WelcomeCard>
          <Title>Welcome to OrderHere POS</Title>
          <RoleBadge role={user?.role || 'User'}>
            {user?.role}
          </RoleBadge>
          <Subtitle>Hello, {user?.name}!</Subtitle>
          
          <InfoGrid>
            <InfoCard>
              <InfoTitle>Your Role</InfoTitle>
              <InfoText>
                {getRoleDescription(user?.role || '')}
              </InfoText>
            </InfoCard>
            
            <InfoCard>
              <InfoTitle>System Status</InfoTitle>
              <InfoText>
                All systems operational. You can access your permitted functions through the sidebar menu.
              </InfoText>
            </InfoCard>
            
            <InfoCard>
              <InfoTitle>Getting Started</InfoTitle>
              <InfoText>
                Use the navigation menu on the left to access available features for your role.
              </InfoText>
            </InfoCard>
          </InfoGrid>
        </WelcomeCard>
      </Container>
    </MainLayout>
  );
};

export default BasicDashboard;