import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BaseButton } from '../../components/UI';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
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

const Hero = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 50px 20px;
  color: white;
`;

const Title = styled.h1`
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Subtitle = styled.p`
  font-size: 22px;
  margin-bottom: 40px;
  opacity: 0.9;
  max-width: 700px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 30px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`;

const PrimaryButton = styled(BaseButton)`
  background: white;
  color: #667eea;
  padding: 15px 40px;
  font-size: 18px;
  font-weight: 600;
  border: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SecondaryButton = styled(BaseButton)`
  background: transparent;
  color: white;
  padding: 15px 40px;
  font-size: 18px;
  font-weight: 600;
  border: 2px solid white;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Features = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 80px 50px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 40px 20px;
  }
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 15px;
  color: white;
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const FeatureIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 15px;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  opacity: 0.9;
  line-height: 1.6;
`;

const Footer = styled.footer`
  background: rgba(0, 0, 0, 0.2);
  padding: 30px 50px;
  text-align: center;
  color: white;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <Logo>Purple Here</Logo>
        <Nav>
          <NavLink onClick={() => navigate('/about')}>About Us</NavLink>
          <NavLink onClick={() => navigate('/service')}>Services</NavLink>
          <NavLink onClick={() => navigate('/pos')}>POS System Access</NavLink>
        </Nav>
      </Header>

      <Hero>
        <Title>Smart Store Management Starts Here</Title>
        <Subtitle>
          Efficiently manage your food courts, brands, and restaurants with Purple Here POS System
        </Subtitle>
        <ButtonGroup>
          <PrimaryButton onClick={() => navigate('/pos')}>
            Get Started
          </PrimaryButton>
          <SecondaryButton onClick={() => navigate('/service')}>
            Learn More
          </SecondaryButton>
        </ButtonGroup>
      </Hero>

      <Features>
        <FeatureCard>
          <FeatureIcon>🏪</FeatureIcon>
          <FeatureTitle>Food Court Management</FeatureTitle>
          <FeatureDescription>
            Efficiently manage multiple stores and monitor them in real-time
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>📊</FeatureIcon>
          <FeatureTitle>Brand Integration</FeatureTitle>
          <FeatureDescription>
            View data from all branches at a glance and analyze performance
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>💳</FeatureIcon>
          <FeatureTitle>Easy Order & Payment</FeatureTitle>
          <FeatureDescription>
            Handle everything from mobile orders to POS payments conveniently
          </FeatureDescription>
        </FeatureCard>
      </Features>

      <Footer>
        © 2025 Purple Here. All rights reserved.
      </Footer>
    </Container>
  );
};

export default HomePage;
