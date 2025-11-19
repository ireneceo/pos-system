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
          <NavLink onClick={() => navigate('/about')}>회사 소개</NavLink>
          <NavLink onClick={() => navigate('/service')}>서비스</NavLink>
          <NavLink onClick={() => navigate('/pos')}>로그인</NavLink>
        </Nav>
      </Header>

      <Hero>
        <Title>스마트한 매장 운영의 시작</Title>
        <Subtitle>
          Purple Here POS 시스템으로 푸드코트, 브랜드, 레스토랑을 효율적으로 관리하세요
        </Subtitle>
        <ButtonGroup>
          <PrimaryButton onClick={() => navigate('/pos')}>
            시작하기
          </PrimaryButton>
          <SecondaryButton onClick={() => navigate('/service')}>
            서비스 알아보기
          </SecondaryButton>
        </ButtonGroup>
      </Hero>

      <Features>
        <FeatureCard>
          <FeatureIcon>🏪</FeatureIcon>
          <FeatureTitle>푸드코트 관리</FeatureTitle>
          <FeatureDescription>
            여러 매장을 효율적으로 관리하고 실시간으로 모니터링할 수 있습니다
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>📊</FeatureIcon>
          <FeatureTitle>브랜드 통합 관리</FeatureTitle>
          <FeatureDescription>
            다양한 지점의 데이터를 한눈에 확인하고 성과를 분석할 수 있습니다
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>💳</FeatureIcon>
          <FeatureTitle>간편한 주문 & 결제</FeatureTitle>
          <FeatureDescription>
            모바일 주문부터 POS 결제까지 모든 과정을 편리하게 처리합니다
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
