import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SetupItem } from './SetupGuide';

interface WelcomeModalProps {
  /** Distinguishes the storage key per user so each user sees this once */
  userKey: string | number;
  /** Display name in the greeting */
  userName?: string;
  /** Setup items to preview (typically the first 3-5) */
  items: SetupItem[];
  /** Optional role label shown under the name */
  roleLabel?: string;
}

/**
 * First-login welcome modal that previews the role's setup checklist.
 *
 * Visibility rule: only shows when ALL of the following hold —
 *   1. localStorage flag for this userKey is missing
 *   2. There are setup items at all
 *   3. NONE of them are completed yet (truly new user, not someone who has
 *      already started)
 *
 * Skip / Start Setup both dismiss permanently for this user.
 */
const WelcomeModal: React.FC<WelcomeModalProps> = ({ userKey, userName, items, roleLabel }) => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const storageKey = `welcome_modal_seen_${userKey}`;

  const completedCount = items.filter(i => i.completed).length;
  const isTrulyNew = items.length > 0 && completedCount === 0;

  const [open, setOpen] = useState(() => {
    try {
      if (!isTrulyNew) return false;
      return localStorage.getItem(storageKey) !== 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    // Re-evaluate when items load asynchronously (initially empty → populated).
    if (!isTrulyNew) {
      setOpen(false);
      return;
    }
    try {
      if (localStorage.getItem(storageKey) !== 'true') setOpen(true);
    } catch { /* private mode etc. */ }
  }, [isTrulyNew, storageKey]);

  const dismiss = () => {
    try { localStorage.setItem(storageKey, 'true'); } catch { /* ignore */ }
    setOpen(false);
  };

  const startSetup = () => {
    dismiss();
    const first = items.find(i => !i.completed && (!i.dependsOn || i.dependsOn.length === 0));
    if (first) navigate(first.path);
  };

  if (!open) return null;

  const preview = items.slice(0, 5);

  return (
    <Backdrop role="dialog" aria-modal="true" aria-labelledby="welcome-modal-title">
      <ModalCard>
        <CloseBtn type="button" aria-label={t('button.close', 'Close')} onClick={dismiss}>×</CloseBtn>
        <Header>
          <Greeting id="welcome-modal-title">
            {t('welcomeModal.greeting', 'Welcome')}{userName ? `, ${userName}` : ''}!
          </Greeting>
          {roleLabel && <RoleTag>{roleLabel}</RoleTag>}
          <Subtitle>
            {t('welcomeModal.subtitle', "Let's get your account ready in a few quick steps.")}
          </Subtitle>
        </Header>

        <PreviewList>
          {preview.map((item, idx) => (
            <PreviewItem key={item.key}>
              <Step>{idx + 1}</Step>
              <PreviewBody>
                <PreviewLabel>{item.label}</PreviewLabel>
                <PreviewDesc>{item.description}</PreviewDesc>
              </PreviewBody>
            </PreviewItem>
          ))}
        </PreviewList>

        {items.length > preview.length && (
          <MoreNote>
            {t('welcomeModal.moreSteps', '+ {{count}} more steps in your setup checklist below.', {
              count: items.length - preview.length
            })}
          </MoreNote>
        )}

        <Actions>
          <SecondaryBtn type="button" onClick={dismiss}>
            {t('welcomeModal.skip', 'I will explore on my own')}
          </SecondaryBtn>
          <PrimaryBtn type="button" onClick={startSetup}>
            {t('welcomeModal.start', 'Start Setup →')}
          </PrimaryBtn>
        </Actions>
      </ModalCard>
    </Backdrop>
  );
};

export default WelcomeModal;

// ─── Styled ──────────────────────────────────────────────────

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const slideIn = keyframes`
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 37, 64, 0.55);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: ${fadeIn} 0.2s ease;
`;

const ModalCard = styled.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 540px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 32px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  animation: ${slideIn} 0.25s ease;

  @media (max-width: 640px) {
    padding: 24px 20px;
    border-radius: 12px;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 16px;
  top: 12px;
  background: none;
  border: none;
  font-size: 28px;
  color: #9CA3AF;
  cursor: pointer;
  line-height: 1;
  padding: 4px 8px;
  border-radius: 6px;

  &:hover { color: #4B5563; background: #F3F4F6; }
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const Greeting = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 6px;
`;

const RoleTag = styled.span`
  display: inline-block;
  background: #F0EDFF;
  color: #635BFF;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 12px;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: #6B7C93;
  font-size: 14px;
  margin: 4px 0 0;
  line-height: 1.5;
`;

const PreviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
`;

const PreviewItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: #FAFBFC;
`;

const Step = styled.div`
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #635BFF;
  color: white;
  font-weight: 600;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviewBody = styled.div`
  flex: 1;
  min-width: 0;
`;

const PreviewLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`;

const PreviewDesc = styled.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 2px;
  line-height: 1.4;
`;

const MoreNote = styled.div`
  font-size: 12px;
  color: #6B7C93;
  text-align: center;
  margin-bottom: 20px;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 8px;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;

const buttonBase = `
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s, background 0.15s;
`;

const SecondaryBtn = styled.button`
  ${buttonBase}
  background: #F3F4F6;
  color: #4B5563;

  &:hover { background: #E5E7EB; }
`;

const PrimaryBtn = styled.button`
  ${buttonBase}
  background: #635BFF;
  color: white;

  &:hover { opacity: 0.9; }
`;
