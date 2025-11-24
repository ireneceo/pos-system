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
  max-width: 1000px;
  margin: 80px auto;
  padding: 60px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    margin: 40px 20px;
    padding: 30px 20px;
  }
`;

const Title = styled.h1`
  font-size: 42px;
  color: #667eea;
  margin-bottom: 30px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Section = styled.section`
  margin-bottom: 50px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  color: #764ba2;
  margin-bottom: 20px;
  border-bottom: 3px solid #667eea;
  padding-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Paragraph = styled.p`
  font-size: 18px;
  line-height: 1.8;
  color: #333;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  font-size: 18px;
  line-height: 1.8;
  color: #333;
  margin-bottom: 15px;
  padding-left: 30px;
  position: relative;

  &:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #667eea;
    font-weight: bold;
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const CTAButton = styled(BaseButton)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px 40px;
  font-size: 18px;
  font-weight: 600;
  border: none;
  display: block;
  margin: 40px auto 0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const AboutPage: React.FC = () => {
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
        <Title>About Us</Title>

        <Section>
          <SectionTitle>Our Vision</SectionTitle>
          <Paragraph>
            Purple Here provides an integrated POS solution for food courts, brands, and restaurants.
            Our goal is to digitize every aspect of store operations to maximize efficiency
            and support data-driven decision making.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>Why Purple Here?</SectionTitle>
          <List>
            <ListItem>
              <strong>Multi-tier Management:</strong> From food court general managers to brand managers,
              we provide a hierarchical management system
            </ListItem>
            <ListItem>
              <strong>Real-time Data:</strong> Monitor orders, sales, and inventory data
              from all stores in real-time
            </ListItem>
            <ListItem>
              <strong>Mobile Ordering:</strong> QR code-based mobile ordering improves customer convenience
              and store operation efficiency
            </ListItem>
            <ListItem>
              <strong>Unified Management:</strong> Manage menus, staff, customers, and invoices
              in one integrated system
            </ListItem>
            <ListItem>
              <strong>Cloud-based:</strong> Access anywhere, anytime with our cloud system
              for remote management capabilities
            </ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Our Technology</SectionTitle>
          <Paragraph>
            Built on the latest web technologies and cloud infrastructure for a stable and scalable system.
            We provide a fast and convenient user experience with React-based intuitive UI
            and real-time Socket.IO communication.
          </Paragraph>
        </Section>

        <CTAButton onClick={() => navigate('/service')}>
          Learn More About Our Services
        </CTAButton>
      </Content>
    </Container>
  );
};

export default AboutPage;
