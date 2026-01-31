import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LandingLayout } from '../../components/Landing';
import { BaseButton } from '../../components/UI';

const PageContainer = styled.div`
  background: #FAFBFC;
  min-height: calc(100vh - 80px);
  padding: 40px 20px;
`;

const Content = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 60px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const Title = styled.h1`
  font-size: 42px;
  color: #0A2540;
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
  font-size: 24px;
  color: #635BFF;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #E6EBF1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #6B7C93;
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  font-size: 16px;
  line-height: 1.8;
  color: #6B7C93;
  margin-bottom: 15px;
  padding-left: 28px;
  position: relative;

  &:before {
    content: '~';
    position: absolute;
    left: 0;
    color: #10B981;
    font-weight: bold;
    font-size: 18px;
  }

  strong {
    color: #0A2540;
  }
`;

const CTAButton = styled(BaseButton)`
  background: #635BFF;
  color: white;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  display: block;
  margin: 40px auto 0;
  border-radius: 8px;

  &:hover {
    background: #5A51E6;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <LandingLayout>
      <PageContainer>
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

          <CTAButton onClick={() => navigate('/pricing')}>
            View Our Pricing Plans
          </CTAButton>
        </Content>
      </PageContainer>
    </LandingLayout>
  );
};

export default AboutPage;
