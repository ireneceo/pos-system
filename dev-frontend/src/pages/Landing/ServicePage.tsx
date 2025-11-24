import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BaseButton } from '../../components/UI';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Header = styled.header`
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

const Logo = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: white;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const NavLink = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 6px 12px;
  }
`;

const Content = styled.main`
  max-width: 1200px;
  margin: 80px auto;
  padding: 60px;

  @media (max-width: 768px) {
    margin: 40px 20px;
    padding: 30px 20px;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: white;
  margin-bottom: 50px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 36px;
    margin-bottom: 30px;
  }
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 60px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  }
`;

const ServiceIcon = styled.div`
  font-size: 56px;
  margin-bottom: 20px;
`;

const ServiceTitle = styled.h2`
  font-size: 28px;
  color: #667eea;
  margin-bottom: 15px;
`;

const ServiceDescription = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #555;
  margin-bottom: 20px;
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
`;

const ServiceFeature = styled.li`
  font-size: 15px;
  color: #666;
  margin-bottom: 10px;
  padding-left: 25px;
  position: relative;

  &:before {
    content: '▪';
    position: absolute;
    left: 0;
    color: #764ba2;
    font-size: 18px;
  }
`;

const PricingSection = styled.section`
  background: rgba(255, 255, 255, 0.95);
  padding: 50px;
  border-radius: 20px;
  text-align: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const PricingTitle = styled.h2`
  font-size: 36px;
  color: #667eea;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const PricingText = styled.p`
  font-size: 18px;
  color: #555;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto 30px;
`;

const CTAButton = styled(BaseButton)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 18px 50px;
  font-size: 20px;
  font-weight: 600;
  border: none;
  margin-top: 20px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 15px 30px;
    font-size: 18px;
  }
`;

const ServicePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <Logo onClick={() => navigate('/')}>Purple Here</Logo>
        <Nav>
          <NavLink onClick={() => navigate('/about')}>About Us</NavLink>
          <NavLink onClick={() => navigate('/service')}>Services</NavLink>
          <NavLink onClick={() => navigate('/pos')}>POS System Access</NavLink>
        </Nav>
      </Header>

      <Content>
        <Title>Our Services</Title>

        <ServiceGrid>
          <ServiceCard>
            <ServiceIcon>🏪</ServiceIcon>
            <ServiceTitle>Food Court Management</ServiceTitle>
            <ServiceDescription>
              An integrated solution for efficiently managing food courts with multiple stores
            </ServiceDescription>
            <ServiceFeatures>
              <ServiceFeature>Food court general manager hierarchy</ServiceFeature>
              <ServiceFeature>Rent and contract management</ServiceFeature>
              <ServiceFeature>Real-time monitoring of tenant stores</ServiceFeature>
              <ServiceFeature>Integrated sales analysis and reports</ServiceFeature>
              <ServiceFeature>Tenant support ticket system</ServiceFeature>
            </ServiceFeatures>
          </ServiceCard>

          <ServiceCard>
            <ServiceIcon>🏢</ServiceIcon>
            <ServiceTitle>Brand Integration</ServiceTitle>
            <ServiceDescription>
              A centralized management system for brands operating multiple locations
            </ServiceDescription>
            <ServiceFeatures>
              <ServiceFeature>Brand general manager authority system</ServiceFeature>
              <ServiceFeature>All-branch performance dashboard</ServiceFeature>
              <ServiceFeature>Unified menu and pricing management</ServiceFeature>
              <ServiceFeature>Franchise support system</ServiceFeature>
              <ServiceFeature>Branch-by-branch comparative analysis</ServiceFeature>
            </ServiceFeatures>
          </ServiceCard>

          <ServiceCard>
            <ServiceIcon>💳</ServiceIcon>
            <ServiceTitle>POS System</ServiceTitle>
            <ServiceDescription>
              An all-in-one POS solution for intuitive and fast store operations
            </ServiceDescription>
            <ServiceFeatures>
              <ServiceFeature>Touch-based intuitive UI</ServiceFeature>
              <ServiceFeature>Real-time order management and kitchen display</ServiceFeature>
              <ServiceFeature>Multiple payment method support</ServiceFeature>
              <ServiceFeature>Menu, option, and category management</ServiceFeature>
              <ServiceFeature>Customer display integration</ServiceFeature>
            </ServiceFeatures>
          </ServiceCard>

          <ServiceCard>
            <ServiceIcon>📱</ServiceIcon>
            <ServiceTitle>Mobile Ordering</ServiceTitle>
            <ServiceDescription>
              A convenient mobile ordering system via QR codes
            </ServiceDescription>
            <ServiceFeatures>
              <ServiceFeature>Instant ordering via QR code scan</ServiceFeature>
              <ServiceFeature>Automatic table number recognition</ServiceFeature>
              <ServiceFeature>Real-time order notifications</ServiceFeature>
              <ServiceFeature>Customer order history management</ServiceFeature>
              <ServiceFeature>Mobile payment integration</ServiceFeature>
            </ServiceFeatures>
          </ServiceCard>

          <ServiceCard>
            <ServiceIcon>📊</ServiceIcon>
            <ServiceTitle>Analytics & Reports</ServiceTitle>
            <ServiceDescription>
              Powerful analytics tools for data-driven decision making
            </ServiceDescription>
            <ServiceFeatures>
              <ServiceFeature>Daily/weekly/monthly sales analysis</ServiceFeature>
              <ServiceFeature>Popular menu and trend analysis</ServiceFeature>
              <ServiceFeature>Time-based order pattern analysis</ServiceFeature>
              <ServiceFeature>Customer analysis and return rates</ServiceFeature>
              <ServiceFeature>Customizable reports</ServiceFeature>
            </ServiceFeatures>
          </ServiceCard>

          <ServiceCard>
            <ServiceIcon>👥</ServiceIcon>
            <ServiceTitle>Unified Management</ServiceTitle>
            <ServiceDescription>
              Manage staff, customers, and invoices all in one place
            </ServiceDescription>
            <ServiceFeatures>
              <ServiceFeature>Staff account and permission management</ServiceFeature>
              <ServiceFeature>Customer information and points management</ServiceFeature>
              <ServiceFeature>Automatic invoice generation system</ServiceFeature>
              <ServiceFeature>Promotion and discount management</ServiceFeature>
              <ServiceFeature>Inventory management (optional)</ServiceFeature>
            </ServiceFeatures>
          </ServiceCard>
        </ServiceGrid>

        <PricingSection>
          <PricingTitle>Flexible Pricing Plans</PricingTitle>
          <PricingText>
            We offer various pricing plans based on your store size and needs.
            From small restaurants to large food courts, we'll find the optimal solution for you.
          </PricingText>
          <PricingText>
            <strong>Start now and experience a 30-day free trial!</strong>
          </PricingText>
          <CTAButton onClick={() => navigate('/pos')}>
            Start Free Trial
          </CTAButton>
        </PricingSection>
      </Content>
    </Container>
  );
};

export default ServicePage;
