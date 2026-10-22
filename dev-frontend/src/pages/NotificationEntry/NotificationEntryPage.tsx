import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useAuth, UserContextOption } from '../../contexts/AuthContext';
import { Button } from '../../components/UI';
import { findContextCard, isCurrentContext, parseCtx, safeInternalPath } from '../../utils/contextMatch';

/**
 * 알림 버튼 진입 화면 `/go?ctx=…&to=…&n=…` (2026-10-22 Fable 설계 notification-addressee §4-3).
 *
 * 메일·앱 알림의 버튼은 모두 여기를 거친다 — 여러 모자(역할)를 가진 사람이 다른 모자로 들어와 있으면
 * 그 화면이 역할 검사에 막혀 대시보드로 튕기던 것을 막는다.
 *   ① 이미 그 자격이면 → 바로 이동
 *   ② 고를 수 있는 모자에 그 자격이 있으면 → 한 번 확인 → 전환 → 이동
 *      (전환은 같은 브라우저 모든 탭이 따라온다 — 카운터 POS 탭이 조용히 바뀌지 않게 확인 1탭)
 *   ③ 그 자격이 없으면 → 선택 화면 + 안내 한 줄
 * 비로그인은 ProtectedRoute → 로그인 → 이 주소로 복귀(LoginPage 가 ?ctx 까지 되살린다).
 */

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  background: var(--pos-bg, #F6F9FC);
`;

const Panel = styled.div`
  width: 100%;
  max-width: 440px;
  background: var(--pos-surface, #FFFFFF);
  border: 1px solid var(--pos-border, #E6EBF1);
  border-radius: 12px;
  padding: 28px 24px;
`;

const Title = styled.h1`
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 600;
  color: var(--pos-text, #0A2540);
`;

const Message = styled.p`
  margin: 0 0 12px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--pos-text-secondary, #425466);
`;

const Warn = styled.p`
  margin: 0 0 12px;
  font-size: 13px;
  font-weight: 600;
  color: #B45309;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const NotificationEntryPage: React.FC = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { user, refreshContexts, switchContext } = useAuth();

  const ctx = useMemo(() => parseCtx(params.get('ctx')), [params]);
  const to = useMemo(() => safeInternalPath(params.get('to')), [params]);
  const entityName = (params.get('n') || '').slice(0, 80);

  const [card, setCard] = useState<UserContextOption | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const label = entityName ? `${entityName} · ${ctx?.role || ''}` : (ctx?.role || '');

  useEffect(() => {
    let alive = true;
    if (!ctx) { navigate(to, { replace: true }); return; }
    if (isCurrentContext(ctx, user)) { navigate(to, { replace: true }); return; }
    refreshContexts().then((list) => {
      if (!alive) return;
      const found = list ? findContextCard(ctx, list) : null;
      if (found) { setCard(found); return; }
      navigate('/pos/select-context', { replace: true, state: { notice: t('go.noRole', { label }) } });
    });
    return () => { alive = false; };
    // 진입 1회 판단 — 전환 뒤 user 가 바뀌어도 다시 돌지 않게 user 는 넣지 않는다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx, to]);

  const deviceName = useMemo(() => {
    try {
      const raw = localStorage.getItem('pos_device_restaurant');
      const d = raw ? JSON.parse(raw) : null;
      if (!d || !d.id || !card) return null;
      return card.entity_type === 'restaurant' && String(card.entity_id) === String(d.id) ? null : (d.name || String(d.id));
    } catch { return null; }
  }, [card]);

  const open = async () => {
    if (!card || busy) return;
    setBusy(true);
    setError(null);
    const target = card.kind === 'default'
      ? { target: 'default' as const }
      : { entity_type: card.entity_type, entity_id: card.entity_id as number, role: card.role };
    const res = await switchContext(target);
    setBusy(false);
    if (!res.ok) { setError(t('go.failed')); return; }
    navigate(to, { replace: true });
  };

  if (!card) {
    return <Page><Panel><Message>{t('go.opening')}</Message></Panel></Page>;
  }

  const current = user ? `${user.restaurantName || ''}${user.restaurantName ? ' · ' : ''}${user.role}` : '';

  return (
    <Page>
      <Panel>
        <Title>{t('go.title', { label })}</Title>
        <Message>{t('go.message', { label, current })}</Message>
        {deviceName && <Warn>{t('go.deviceWarn', { device: deviceName })}</Warn>}
        {error && <Warn>{error}</Warn>}
        <Actions>
          <Button variant="secondary" onClick={() => navigate('/pos/select-context', { replace: true })} disabled={busy}>
            {t('go.other')}
          </Button>
          <Button variant="primary" onClick={open} disabled={busy}>
            {t('go.open')}
          </Button>
        </Actions>
      </Panel>
    </Page>
  );
};

export default NotificationEntryPage;
