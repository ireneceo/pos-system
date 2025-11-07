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
        <Logo onClick={() => navigate('/')}>OrderHere</Logo>
        <Nav>
          <NavLink onClick={() => navigate('/about')}>회사 소개</NavLink>
          <NavLink onClick={() => navigate('/service')}>서비스</NavLink>
          <NavLink onClick={() => navigate('/pos')}>로그인</NavLink>
        </Nav>
      </Header>

      <Content>
        <Title>서비스 소개</Title>

        <ServiceGrid>
          <ServiceCard>
            <ServiceIcon>🏪</ServiceIcon>
            <ServiceTitle>푸드코트 관리</ServiceTitle>
            <ServiceDescription>
              여러 매장이 모인 푸드코트를 효율적으로 관리할 수 있는 통합 솔루션
            </ServiceDescription>
            <ServiceFeatures>
              <ServiceFeature>푸드코트 총괄매니저 계층 관리</ServiceFeature>
              <ServiceFeature>렌트비 및 계약서 관리</ServiceFeature>
              <ServiceFeature>입점 매장 실시간 모니터링</ServiceFeature>
              <ServiceFeature>통합 매출 분석 및 리포트</ServiceFeature>
              <ServiceFeature>테넌트 지원 티켓 시스템</ServiceFeature>
            </ServiceFeatures>
          </ServiceCard>

          <ServiceCard>
            <ServiceIcon>🏢</ServiceIcon>
            <ServiceTitle>브랜드 통합 관리</ServiceTitle>
            <ServiceDescription>
              다수의 지점을 운영하는 브랜드를 위한 중앙 집중식 관리 시스템
            </ServiceDescription>
            <ServiceFeatures>
              <ServiceFeature>브랜드 총괄매니저 권한 시스템</ServiceFeature>
              <ServiceFeature>전체 지점 성과 대시보드</ServiceFeature>
              <ServiceFeature>통합 메뉴 및 가격 관리</ServiceFeature>
              <ServiceFeature>프랜차이즈 지원 시스템</ServiceFeature>
              <ServiceFeature>지점별 비교 분석</ServiceFeature>
            </ServiceFeatures>
          </ServiceCard>

          <ServiceCard>
            <ServiceIcon>💳</ServiceIcon>
            <ServiceTitle>POS 시스템</ServiceTitle>
            <ServiceDescription>
              직관적이고 빠른 매장 운영을 위한 올인원 POS 솔루션
            </ServiceDescription>
            <ServiceFeatures>
              <ServiceFeature>터치 기반 직관적 UI</ServiceFeature>
              <ServiceFeature>실시간 주문 관리 및 주방 디스플레이</ServiceFeature>
              <ServiceFeature>다양한 결제 수단 지원</ServiceFeature>
              <ServiceFeature>메뉴, 옵션, 카테고리 관리</ServiceFeature>
              <ServiceFeature>고객 디스플레이 연동</ServiceFeature>
            </ServiceFeatures>
          </ServiceCard>

          <ServiceCard>
            <ServiceIcon>📱</ServiceIcon>
            <ServiceTitle>모바일 주문</ServiceTitle>
            <ServiceDescription>
              QR 코드를 통한 간편한 모바일 주문 시스템
            </ServiceDescription>
            <ServiceFeatures>
              <ServiceFeature>QR 코드 스캔으로 즉시 주문</ServiceFeature>
              <ServiceFeature>테이블 번호 자동 인식</ServiceFeature>
              <ServiceFeature>실시간 주문 알림</ServiceFeature>
              <ServiceFeature>고객 주문 히스토리 관리</ServiceFeature>
              <ServiceFeature>모바일 결제 연동</ServiceFeature>
            </ServiceFeatures>
          </ServiceCard>

          <ServiceCard>
            <ServiceIcon>📊</ServiceIcon>
            <ServiceTitle>분석 & 리포트</ServiceTitle>
            <ServiceDescription>
              데이터 기반 의사결정을 위한 강력한 분석 도구
            </ServiceDescription>
            <ServiceFeatures>
              <ServiceFeature>일별/주별/월별 매출 분석</ServiceFeature>
              <ServiceFeature>인기 메뉴 및 트렌드 분석</ServiceFeature>
              <ServiceFeature>시간대별 주문 패턴 분석</ServiceFeature>
              <ServiceFeature>고객 분석 및 재방문율</ServiceFeature>
              <ServiceFeature>커스터마이징 가능한 리포트</ServiceFeature>
            </ServiceFeatures>
          </ServiceCard>

          <ServiceCard>
            <ServiceIcon>👥</ServiceIcon>
            <ServiceTitle>통합 관리</ServiceTitle>
            <ServiceDescription>
              직원, 고객, 청구서를 한 곳에서 관리
            </ServiceDescription>
            <ServiceFeatures>
              <ServiceFeature>직원 계정 및 권한 관리</ServiceFeature>
              <ServiceFeature>고객 정보 및 포인트 관리</ServiceFeature>
              <ServiceFeature>자동 청구서 발행 시스템</ServiceFeature>
              <ServiceFeature>프로모션 및 할인 관리</ServiceFeature>
              <ServiceFeature>재고 관리 (옵션)</ServiceFeature>
            </ServiceFeatures>
          </ServiceCard>
        </ServiceGrid>

        <PricingSection>
          <PricingTitle>맞춤형 요금제</PricingTitle>
          <PricingText>
            매장의 규모와 필요에 따라 다양한 요금제를 제공합니다.
            소규모 레스토랑부터 대형 푸드코트까지, 최적의 솔루션을 찾아드립니다.
          </PricingText>
          <PricingText>
            <strong>지금 바로 시작하고 30일 무료 체험</strong>을 경험해보세요!
          </PricingText>
          <CTAButton onClick={() => navigate('/pos')}>
            무료로 시작하기
          </CTAButton>
        </PricingSection>
      </Content>
    </Container>
  );
};

export default ServicePage;
