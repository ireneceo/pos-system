/**
 * PlayUnavailable — 안드로이드 앱(Purple POS · Google Play) 안에서 막힌 화면 자리에 보이는 빈 안내.
 *
 * ⛔ 웹·결제·문의·주소 글자와 링크를 넣지 않는다 — Play 정책 4절(다른 결제로 이끄는 글·버튼 금지).
 *    제목 + 한 줄 + «대시보드로 돌아가기»(noPlan 은 로그아웃) 뿐. 설계 /var/www/.claude/fable-design-20261118-play-billing-hide.md §4
 *
 * PlayGate — ProtectedRoute 밖 공개 주소(/pricing·/packages·/signup)를 앱에서만 막는 감싸개.
 */
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ThemedButton } from '../UI';
import { useAuth } from '../../contexts/AuthContext';
import { getDashboardPath } from '../../utils/dashboardPath';
import { usePlayApp } from '../../utils/playApp';

const Wrap = styled.div`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  background: #F9FAFB;
`;

const Card = styled.div`
  width: 100%;
  max-width: 440px;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 28px 24px;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
`;

const Body = styled.p`
  margin: 0 0 20px;
  font-size: 14px;
  line-height: 1.6;
  color: #6B7280;
`;

interface Props {
  variant?: 'page' | 'noPlan';
}

const PlayUnavailable: React.FC<Props> = ({ variant = 'page' }) => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const noPlan = variant === 'noPlan';

  const home = isAuthenticated && user ? getDashboardPath(user.role, { restaurantId: user.restaurantId }) : '/pos';

  return (
    <Wrap data-testid="play-unavailable">
      <Card>
        <Title>{noPlan ? t('appUnavailable.noPlanTitle') : t('appUnavailable.title')}</Title>
        <Body>{noPlan ? t('appUnavailable.noPlanBody') : t('appUnavailable.body')}</Body>
        {noPlan ? (
          <ThemedButton variant="secondary" onClick={() => logout()}>{t('nav.logout')}</ThemedButton>
        ) : (
          <ThemedButton variant="primary" onClick={() => navigate(home, { replace: true })}>{t('backToDashboard')}</ThemedButton>
        )}
      </Card>
    </Wrap>
  );
};

/** 앱이면 안내, 아니면 그대로 */
export const PlayGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const playApp = usePlayApp();
  return playApp ? <PlayUnavailable /> : <>{children}</>;
};

export default PlayUnavailable;
