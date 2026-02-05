import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LandingLayout } from '../../components/Landing';

const PageContainer = styled.div`
  background: #FAFBFC;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  @media (max-width: 768px) {
    padding: 32px 20px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 16px;
  opacity: 0.9;
  max-width: 600px;
  margin: 6px auto 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ContentSection = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 20px;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const Section = styled.section`
  background: white;
  border-radius: 16px;
  padding: 40px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 20px;

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
    content: '✓';
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

const CTASection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  text-align: center;
  padding: 60px 20px;
  color: white;
  margin-top: 40px;
  border-radius: 16px;
`;

const CTATitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const CTAButton = styled.button`
  background: white;
  color: #635BFF;
  border: none;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: auto;
  }
`;

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <LandingLayout>
      <PageContainer>
        <HeroSection>
          <HeroTitle>About PurpleHere</HeroTitle>
          <HeroSubtitle>
            Where Innovation Meets Food Business
          </HeroSubtitle>
        </HeroSection>

        <ContentSection>
          <Section>
            <SectionTitle>Our Story</SectionTitle>
            <Paragraph>
              <strong>Like a Purple Cow, Standing Out Through Creative Innovation</strong>
            </Paragraph>
            <Paragraph>
              PurpleHere is inspired by Seth Godin's "Purple Cow" - a remarkable solution that stands out
              in the foodcourt and chain restaurant industry. We break conventional thinking and deliver
              innovation that truly matters.
            </Paragraph>
            <Paragraph>
              <strong>"Here"</strong> represents the central hub where all your outlets, data, and solutions
              converge into one unified platform. It embodies the immediacy of "start right here, right now"
              and serves as the place where everything comes together.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Our Vision</SectionTitle>
            <Paragraph>
              <strong>"Not Just Another POS, But a Creative Unified Platform"</strong>
            </Paragraph>
            <Paragraph>
              Beyond simple order processing, we revolutionize the entire food business operation like
              a purple cow in the field. Our goal is to digitalize every aspect of store management,
              maximize operational efficiency, and empower data-driven decision making.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Why PurpleHere?</SectionTitle>
            <List>
              <ListItem>
                <strong>Innovative Thinking:</strong> Stand out with a remarkable, differentiated solution
                that breaks industry stereotypes
              </ListItem>
              <ListItem>
                <strong>Unified Platform:</strong> Manage all outlets, data, and features from a single
                centralized system
              </ListItem>
              <ListItem>
                <strong>Real-time Insights:</strong> Monitor and analyze orders, sales, and inventory
                across all locations in real-time
              </ListItem>
              <ListItem>
                <strong>Mobile Ordering:</strong> QR code-based mobile ordering enhances both customer
                convenience and operational efficiency
              </ListItem>
              <ListItem>
                <strong>Cloud-Based:</strong> Access your system anytime, anywhere with cloud technology
                enabling remote management
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>Our Technology</SectionTitle>
            <Paragraph>
              Built on modern web technologies and cloud infrastructure, we deliver a stable and scalable
              system. Our React-based intuitive UI and real-time Socket.IO communication provide a fast
              and seamless user experience.
            </Paragraph>
            <Paragraph>
              Works smoothly across various devices, and we continuously maintain the latest technology
              and security standards through regular updates.
            </Paragraph>
          </Section>

          <CTASection>
            <CTATitle>Experience the Difference, Start Today</CTATitle>
            <CTAButton onClick={() => navigate('/features')}>
              Explore Features
            </CTAButton>
          </CTASection>
        </ContentSection>
      </PageContainer>
    </LandingLayout>
  );
};

export default AboutPage;
