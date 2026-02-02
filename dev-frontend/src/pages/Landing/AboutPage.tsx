import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LandingLayout } from '../../components/Landing';

const PageContainer = styled.div`
  background: #FAFBFC;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 60px 20px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const HeroTitle = styled.h1`
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 18px;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 16px;
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
            혁신은 여기, 모든 것이 여기 - Where Innovation Meets Food Business
          </HeroSubtitle>
        </HeroSection>

        <ContentSection>
          <Section>
            <SectionTitle>💜 Our Story</SectionTitle>
            <Paragraph>
              <strong>보라색 소가 가듯, 창의적 혁신으로 여기에 모이다</strong>
            </Paragraph>
            <Paragraph>
              PurpleHere는 세스 고딘의 '보라색 소가 온다'에서 영감을 받았습니다.
              평범함을 거부하고 푸드코트와 체인 업계의 고정관념을 깨는 혁신적 솔루션입니다.
            </Paragraph>
            <Paragraph>
              <strong>"Here"</strong>는 모든 점포, 모든 데이터, 모든 솔루션이 한 곳에 모이는 통합 플랫폼의 중심을 의미합니다.
              지금 여기서 바로 시작하는 즉시성과 함께, 모두가 모이는 곳이 되고자 합니다.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>🎯 Our Vision</SectionTitle>
            <Paragraph>
              <strong>"평범한 POS가 아닌, 창의적 통합 플랫폼"</strong>
            </Paragraph>
            <Paragraph>
              단순 주문 시스템을 넘어, 푸드 비즈니스 전체를 혁신하는 보라색 소 같은 차별화된 솔루션을 제공합니다.
              우리의 목표는 매장 운영의 모든 측면을 디지털화하여 효율성을 극대화하고
              데이터 기반 의사 결정을 지원하는 것입니다.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>✨ Why PurpleHere?</SectionTitle>
            <List>
              <ListItem>
                <strong>혁신적 사고:</strong> 눈에 띄는, 차별화된, 기억되는 솔루션으로
                푸드 산업의 고정관념을 깨트립니다
              </ListItem>
              <ListItem>
                <strong>통합 플랫폼:</strong> 모든 점포, 모든 데이터, 모든 기능이
                하나의 플랫폼에서 관리됩니다
              </ListItem>
              <ListItem>
                <strong>실시간 인사이트:</strong> 모든 매장의 주문, 매출, 재고 데이터를
                실시간으로 모니터링하고 분석합니다
              </ListItem>
              <ListItem>
                <strong>모바일 주문:</strong> QR 코드 기반 모바일 주문으로
                고객 편의성과 매장 운영 효율성을 동시에 향상시킵니다
              </ListItem>
              <ListItem>
                <strong>클라우드 기반:</strong> 언제 어디서나 접속 가능한 클라우드 시스템으로
                원격 관리가 가능합니다
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>🚀 Our Technology</SectionTitle>
            <Paragraph>
              최신 웹 기술과 클라우드 인프라를 기반으로 안정적이고 확장 가능한 시스템을 구축했습니다.
              React 기반의 직관적인 UI와 실시간 Socket.IO 통신으로 빠르고 편리한 사용자 경험을 제공합니다.
            </Paragraph>
            <Paragraph>
              다양한 디바이스에서 원활하게 작동하며, 지속적인 업데이트를 통해
              최신 기술과 보안 표준을 유지합니다.
            </Paragraph>
          </Section>

          <CTASection>
            <CTATitle>다르게 생각하는 솔루션, 지금 시작하세요</CTATitle>
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
