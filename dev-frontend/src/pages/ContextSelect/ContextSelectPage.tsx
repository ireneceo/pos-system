import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useAuth, UserContextOption } from '../../contexts/AuthContext';
import { Button } from '../../components/UI';
import ConfirmModal from '../../components/ConfirmModal';

/**
 * 컨텍스트 선택 화면 ("어느 자격으로 들어갈까").
 * docs/MULTI_CONTEXT_LOGIN_DESIGN.md §6.1.
 *
 * 부여받은 모자가 없으면 목록은 [기본 정체] 1개뿐이라 로그인은 여기 오지 않고 곧장 대시보드로 간다
 * (LoginPage 가 판단). 이 화면은 모자가 2개 이상인 사람과, 상시 전환으로 다시 들어온 사람만 본다.
 *
 * ⚠ 목록의 단일 소스는 `GET /api/auth/contexts` — 로그인 응답의 contexts 는 최초 표시 최적화일 뿐,
 *   부여/회수 직후에도 정확하려면 진입 시 다시 읽어야 한다.
 */

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
  background: var(--pos-bg, #F6F9FC);
`;

const Panel = styled.div`
  width: 100%;
  max-width: 560px;
`;

const Header = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0 0 6px;
  font-size: 22px;
  font-weight: 600;
  color: var(--pos-text, #0A2540);
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: var(--pos-text-muted, #425466);
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// 터치 단말 전제 — 카드 자체가 액션이라 최소 높이를 넉넉히 잡는다(44px 이상).
// 로컬 버튼 스타일 신규 금지(디자인 단일 기준) → 공용 Button 을 확장한다.
const Card = styled(Button)`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  min-height: 68px;
  padding: 16px 18px;
  border: 1px solid var(--pos-border, #E3E8EE);
  border-radius: 12px;
  background: var(--pos-surface, #FFFFFF);
  color: var(--pos-text, #0A2540);
  cursor: pointer;
  text-align: left;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  /* ⚠ 공용 Button 의 기본형은 **보라 배경 + 흰 글자**라, hover 규칙이 배경을 진한 보라로 바꾼다.
     카드로 쓰려고 배경만 흰색으로 덮으면 hover 순간 배경만 보라로 돌아가 **글자가 안 보인다**
     (실측: 배경 rgb(90,84,229) + 글자 rgb(10,37,64)). 그래서 hover 에서도 배경·글자색을
     명시적으로 유지하고, 강조는 테두리·그림자로만 준다. */
  &:hover:not(:disabled) {
    background: var(--pos-surface, #FFFFFF);
    color: var(--pos-text, #0A2540);
    border-color: #635BFF;
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.12);
  }

  &:focus-visible {
    background: var(--pos-surface, #FFFFFF);
    color: var(--pos-text, #0A2540);
    outline: 2px solid #635BFF;
    outline-offset: 2px;
  }

  &:active:not(:disabled) {
    background: var(--pos-surface, #FFFFFF);
    color: var(--pos-text, #0A2540);
    transform: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const CardGlyph = styled.span`
  font-size: 20px;
  line-height: 1;
  color: #635BFF;
`;

const CardText = styled.span`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
`;

const CardLabel = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: var(--pos-text, #0A2540);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CardRole = styled.span`
  font-size: 13px;
  color: var(--pos-text-muted, #425466);
`;

const ErrorText = styled.p`
  margin: 14px 0 0;
  font-size: 13px;
  color: #EF4444;
  text-align: center;
`;

const Footer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const contextKey = (c: UserContextOption) => `${c.kind}:${c.entity_type}:${c.entity_id ?? 'none'}:${c.role}`;

const ContextSelectPage: React.FC = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const { contexts, refreshContexts, switchContext, logout } = useAuth();

  const [list, setList] = useState<UserContextOption[]>(contexts);
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmTarget, setConfirmTarget] = useState<UserContextOption | null>(null);

  // 조회에 성공하면 **결과가 줄어들었어도 그대로 반영**한다 — 회수된 모자가 화면에 남으면 안 된다.
  // (실패는 null 로 구분되며, 그때만 직전 목록을 유지한다.)
  useEffect(() => {
    refreshContexts().then((fresh) => { if (fresh) setList(fresh); });
  }, [refreshContexts]);

  // 이 기기가 특정 매장 POS 로 고정돼 있는지 — 다른 매장으로 넘어갈 때 강하게 경고한다.
  // (로그인 시에만 기록되는 값이라 컨텍스트 전환이 이 값을 덮어쓰지 않는다 — 설계 §4.5)
  const deviceRestaurant = useMemo(() => {
    try {
      const raw = localStorage.getItem('pos_device_restaurant');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  // 본래 정체를 항상 맨 위에 — 구글 계정 선택이 주 계정을 배지 없이 맨 위에 두는 방식과 같다.
  const orderedList = useMemo(
    () => [...list].sort((a, b) => (a.kind === 'default' ? -1 : 0) - (b.kind === 'default' ? -1 : 0)),
    [list]
  );

  const applySwitch = useCallback(async (ctx: UserContextOption) => {
    setBusyKey(contextKey(ctx));
    setError(null);
    const target = ctx.kind === 'default'
      ? { target: 'default' as const }
      : { entity_type: ctx.entity_type, entity_id: ctx.entity_id as number, role: ctx.role };

    const res = await switchContext(target);
    setBusyKey(null);
    if (!res.ok) {
      setError(t('context.switchFailed'));
      // 실패 원인이 "회수됨"일 수 있으므로 목록을 다시 읽는다.
      refreshContexts().then((fresh) => { if (fresh) setList(fresh); });
      return;
    }
    navigate(res.path || '/pos', { replace: true });
  }, [switchContext, refreshContexts, navigate, t]);

  const onPick = useCallback((ctx: UserContextOption) => {
    const deviceRid = deviceRestaurant?.id ? String(deviceRestaurant.id) : null;
    const targetRid = ctx.entity_id != null ? String(ctx.entity_id) : null;
    // 기기가 고정된 매장과 다른 곳으로 가려는 경우에만 확인을 받는다.
    if (deviceRid && targetRid !== deviceRid) {
      setConfirmTarget(ctx);
      return;
    }
    applySwitch(ctx);
  }, [deviceRestaurant, applySwitch]);

  return (
    <Page>
      <Panel>
        <Header>
          <Title>{t('context.select.title')}</Title>
          <Subtitle>{t('context.select.subtitle')}</Subtitle>
        </Header>

        <List>
          {orderedList.map((ctx) => (
            // 카드 제목 = **들어갈 곳의 이름**(서버가 엔티티명으로 해석해 준다). 계정명은 쓰지 않는다.
            // "기본" 배지는 두지 않는다 — 고르는 사람에겐 3장이 전부 동등한 선택지라 아무 질문에도
            // 답하지 않는 라벨이었다. "내 원래 자리"라는 정보는 **맨 위 고정**으로 전달한다.
            <Card key={contextKey(ctx)} onClick={() => onPick(ctx)} disabled={busyKey !== null}>
              <CardGlyph aria-hidden="true">{ctx.kind === 'default' ? '◉' : '▦'}</CardGlyph>
              <CardText>
                <CardLabel>{ctx.label}</CardLabel>
                <CardRole>{ctx.role}</CardRole>
              </CardText>
            </Card>
          ))}
        </List>

        {error && <ErrorText>{error}</ErrorText>}

        {/* 로그인 직후엔 돌아갈 곳이 없어 "뒤로"가 빈 동작이 된다. 이 화면에서 필요한 탈출구는
            "이 계정으로 안 들어가겠다" = 로그아웃 하나뿐이다. 앱 안에서 들어온 경우엔 쓰던 카드를
            다시 누르면 제자리로 돌아간다. */}
        <Footer>
          <Button variant="secondary" onClick={logout}>
            {t('context.select.logout')}
          </Button>
        </Footer>
      </Panel>

      <ConfirmModal
        isOpen={confirmTarget !== null}
        type="warning"
        title={t('context.confirm.title')}
        message={t('context.confirm.deviceMessage', {
          device: deviceRestaurant?.name || '',
          target: confirmTarget?.label || ''
        })}
        confirmText={t('context.confirm.proceed')}
        cancelText={t('context.confirm.cancel')}
        onConfirm={() => { const c = confirmTarget; setConfirmTarget(null); if (c) applySwitch(c); }}
        onCancel={() => setConfirmTarget(null)}
      />
    </Page>
  );
};

export default ContextSelectPage;
