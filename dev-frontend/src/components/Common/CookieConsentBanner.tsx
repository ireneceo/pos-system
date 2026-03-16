import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const COOKIE_CONSENT_KEY = 'cookie_consent_accepted';

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  animation: ${slideUp} 0.4s ease-out;
`;

const Banner = styled.div`
  background: #1A1A2E;
  color: #E0E0E0;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 16px 20px;
    gap: 16px;
  }
`;

const TextContent = styled.div`
  flex: 1;
  font-size: 14px;
  line-height: 1.5;

  a {
    color: #635BFF;
    text-decoration: underline;

    &:hover {
      color: #8B83FF;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const AcceptButton = styled.button`
  background: #635BFF;
  color: white;
  border: none;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;

  &:hover {
    background: #5A51E6;
  }
`;

const DeclineButton = styled.button`
  background: transparent;
  color: #999;
  border: 1px solid #444;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    border-color: #666;
    color: #ccc;
  }
`;

const CookieConsentBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  // Only show on public website pages, not inside POS/restaurant app
  const isPosRoute = location.pathname.startsWith('/pos') ||
                     location.pathname.startsWith('/restaurant') ||
                     location.pathname.startsWith('/kitchen') ||
                     location.pathname.startsWith('/customer-display') ||
                     location.pathname.startsWith('/mobile-order') ||
                     location.pathname.startsWith('/mobile');

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent && !isPosRoute) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
    // Restore previous consent state for GA4
    if (consent === 'true' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
    }
  }, [isPosRoute]);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    // Google Consent Mode v2: grant all
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
    }
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'essential_only');
    // Google Consent Mode v2: keep denied
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Overlay>
      <Banner>
        <TextContent>
          We use cookies to enhance your experience and analyze site traffic.
          By clicking "Accept All", you consent to our use of cookies.
          See our <a href="/privacy">Privacy Policy</a> for details.
        </TextContent>
        <ButtonGroup>
          <DeclineButton onClick={handleDecline}>Essential Only</DeclineButton>
          <AcceptButton onClick={handleAccept}>Accept All</AcceptButton>
        </ButtonGroup>
      </Banner>
    </Overlay>
  );
};

export default CookieConsentBanner;
