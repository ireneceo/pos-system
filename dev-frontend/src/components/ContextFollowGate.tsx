import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Button } from './UI';
import { getDashboardPath, isFullscreenRoute } from '../utils/dashboardPath';

/**
 * 크로스탭 팔로우 + 컨텍스트 회수 처리.
 * docs/MULTI_CONTEXT_LOGIN_DESIGN.md §4.7 / §6.2. 🔒 인쇄 안전 직결.
 *
 * **왜 필요한가**: 로그인 토큰은 탭이 아니라 브라우저 단위로 공유된다. 한 탭에서 컨텍스트를
 * 바꾸면 다른 탭은 옛 화면 그대로인데 요청만 새 자격으로 나가 전부 거부된다. 그 탭이 POS·주방이면
 * **결제 실패와 자동인쇄 정지가 아무 안내 없이** 일어난다.
 *
 * 그래서 두 가지를 한다:
 *  1. 일반 화면 → 새 컨텍스트의 대시보드로 따라간다.
 *  2. **전체화면/현장 화면(POS·주방·플로어플랜) → 조용히 갈아치우지 않고 차단 안내를 먼저 띄운다.**
 *     진행 중인 결제·인쇄가 있을 수 있어 사용자가 상황을 알고 넘어가야 한다.
 *
 * ⚠ MainLayout(🔒 인쇄 보호파일)이 아니라 App 의 AuthProvider 안쪽에 마운트한다.
 */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(10, 37, 64, 0.72);
`;

const Panel = styled.div`
  background: var(--pos-surface, #FFFFFF);
  color: var(--pos-text, #0A2540);
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-width: 440px;
  width: 100%;
  padding: 28px 24px 24px;
  text-align: center;
`;

const Glyph = styled.div`
  font-size: 28px;
  line-height: 1;
  margin-bottom: 12px;
  color: #635BFF;
`;

const Title = styled.h2`
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
`;

const Message = styled.p`
  margin: 0 0 20px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--pos-text-muted, #425466);
`;

// 터치 단말 전제 — 액션은 세로로 쌓고 최소 44px 높이를 확보한다.
const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  button {
    min-height: 44px;
  }
`;

interface FollowDetail {
  role?: string;
  restaurant_id?: number | null;
  restaurantName?: string | null;
}

const ContextFollowGate: React.FC = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const location = useLocation();
  const [pending, setPending] = useState<FollowDetail | null>(null);
  const [revoked, setRevoked] = useState(false);

  const go = useCallback((detail: FollowDetail) => {
    navigate(getDashboardPath(detail.role, { restaurantId: detail.restaurant_id }), { replace: true });
  }, [navigate]);

  // 다른 탭에서 컨텍스트가 바뀜 → 이 탭도 따라간다.
  useEffect(() => {
    const onFollow = (e: Event) => {
      const detail = (e as CustomEvent).detail as FollowDetail;
      if (!detail) return;
      if (isFullscreenRoute(location.pathname)) {
        setPending(detail);   // 현장 화면은 안내 후 이동
      } else {
        go(detail);
      }
    };
    window.addEventListener('context-follow', onFollow);
    return () => window.removeEventListener('context-follow', onFollow);
  }, [location.pathname, go]);

  // 모자가 회수됨 → 강제 로그아웃이 아니라 픽커로 복귀(설계 §4.3).
  useEffect(() => {
    const onRevoked = () => setRevoked(true);
    window.addEventListener('context-revoked', onRevoked);
    return () => window.removeEventListener('context-revoked', onRevoked);
  }, []);

  if (pending) {
    return (
      <Overlay role="alertdialog" aria-modal="true">
        <Panel>
          <Glyph aria-hidden="true">◐</Glyph>
          <Title>{t('context.switchedElsewhere.title')}</Title>
          <Message>{t('context.switchedElsewhere.message')}</Message>
          <Actions>
            <Button variant="primary" onClick={() => { const d = pending; setPending(null); go(d); }}>
              {t('context.switchedElsewhere.continue')}
            </Button>
          </Actions>
        </Panel>
      </Overlay>
    );
  }

  if (revoked) {
    return (
      <Overlay role="alertdialog" aria-modal="true">
        <Panel>
          <Glyph aria-hidden="true">●</Glyph>
          <Title>{t('context.revoked.title')}</Title>
          <Message>{t('context.revoked.message')}</Message>
          <Actions>
            <Button variant="primary" onClick={() => { setRevoked(false); navigate('/pos/select-context', { replace: true }); }}>
              {t('context.revoked.choose')}
            </Button>
          </Actions>
        </Panel>
      </Overlay>
    );
  }

  return null;
};

export default ContextFollowGate;
