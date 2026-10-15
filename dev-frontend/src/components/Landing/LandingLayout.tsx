import React from 'react';
import styled from 'styled-components';
import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';
import { useIsNativeShell } from '../../hooks/useNativeShell';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #F9FAFB;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 68px; /* Header height */
`;

interface LandingLayoutProps {
  children: React.ReactNode;
  /** 계산대 앱 안에서는 사이트 메뉴·바닥글(가입 버튼·홈 링크)을 빼고 본문만 — 로그인 화면에서 이어지는 페이지용.
   *  Play 정책: 앱 안에서 가입 길이 열리면 앱 안 계정 삭제가 의무(2026-10-12 Play 등록 설계 D6) */
  bareInApp?: boolean;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children, bareInApp }) => {
  const inApp = useIsNativeShell();
  if (bareInApp && inApp) {
    return (
      <LayoutContainer>
        <main style={{ flex: 1 }}>{children}</main>
      </LayoutContainer>
    );
  }
  return (
    <LayoutContainer>
      <LandingHeader />
      <MainContent>
        {children}
      </MainContent>
      <LandingFooter />
    </LayoutContainer>
  );
};

export default LandingLayout;
