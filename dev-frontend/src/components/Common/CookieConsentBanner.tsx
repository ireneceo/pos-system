import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getStoredConsent, isMarketingPath, restoreConsent, setConsent } from '../../utils/tracking';


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
  const { t } = useTranslation('common');
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  // Only show on public marketing pages — same list as GTM/page_view (utils/tracking.ts)
  const isMarketing = isMarketingPath(location.pathname);

  useEffect(() => {
    const consent = getStoredConsent();
    if (!consent && isMarketing) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
    // Restore previous consent state (Consent Mode v2)
    restoreConsent();
  }, [isMarketing]);

  const handleAccept = () => {
    setConsent('accept_all');
    setVisible(false);
  };

  const handleDecline = () => {
    setConsent('essential_only');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Overlay>
      <Banner>
        <TextContent dangerouslySetInnerHTML={{ __html: t('cookie.message') }} />
        <ButtonGroup>
          <DeclineButton onClick={handleDecline}>{t('cookie.essentialOnly')}</DeclineButton>
          <AcceptButton onClick={handleAccept}>{t('cookie.acceptAll')}</AcceptButton>
        </ButtonGroup>
      </Banner>
    </Overlay>
  );
};

export default CookieConsentBanner;
