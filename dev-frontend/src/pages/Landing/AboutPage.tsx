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
        <Logo onClick={() => navigate('/')}>OrderHere</Logo>
        <Nav>
          <NavLink onClick={() => navigate('/about')}>회사 소개</NavLink>
          <NavLink onClick={() => navigate('/service')}>서비스</NavLink>
          <NavLink onClick={() => navigate('/pos')}>로그인</NavLink>
        </Nav>
      </Header>

      <Content>
        <Title>회사 소개</Title>

        <Section>
          <SectionTitle>Our Vision</SectionTitle>
          <Paragraph>
            OrderHere는 푸드코트, 브랜드, 레스토랑을 위한 통합 POS 솔루션을 제공합니다.
            우리의 목표는 매장 운영의 모든 과정을 디지털화하여 효율성을 극대화하고,
            데이터 기반의 의사결정을 지원하는 것입니다.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>Why OrderHere?</SectionTitle>
          <List>
            <ListItem>
              <strong>다중 계층 관리:</strong> 푸드코트 총괄매니저부터 브랜드 매니저까지
              계층별 관리 시스템을 제공합니다
            </ListItem>
            <ListItem>
              <strong>실시간 데이터:</strong> 모든 매장의 주문, 매출, 재고 데이터를
              실시간으로 확인할 수 있습니다
            </ListItem>
            <ListItem>
              <strong>모바일 주문:</strong> QR 코드 기반 모바일 주문으로 고객 편의성을
              높이고 매장 운영 효율을 개선합니다
            </ListItem>
            <ListItem>
              <strong>통합 관리:</strong> 메뉴, 직원, 고객, 청구서를 하나의 시스템에서
              관리할 수 있습니다
            </ListItem>
            <ListItem>
              <strong>클라우드 기반:</strong> 언제 어디서나 접속 가능한 클라우드 시스템으로
              원격 관리가 가능합니다
            </ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Our Technology</SectionTitle>
          <Paragraph>
            최신 웹 기술과 클라우드 인프라를 기반으로 안정적이고 확장 가능한
            시스템을 구축했습니다. React 기반의 직관적인 UI와 실시간 Socket.IO
            통신으로 빠르고 편리한 사용 경험을 제공합니다.
          </Paragraph>
        </Section>

        <CTAButton onClick={() => navigate('/service')}>
          서비스 자세히 알아보기
        </CTAButton>
      </Content>
    </Container>
  );
};

export default AboutPage;
