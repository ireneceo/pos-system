import React from 'react';
import styled from 'styled-components';
import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';

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
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
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
