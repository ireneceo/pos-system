import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useAuth, UserContextOption } from '../../contexts/AuthContext';
import { Button, IconButton } from '../../components/UI';
import ConfirmModal from '../../components/ConfirmModal';
import { useStore } from '../../contexts/StoreContext';
import { formatDate } from '../../utils/dateFormat';
import { getAuthToken } from '../../utils/auth';
import ContextRequestModal from './ContextRequestModal';

/**
 * 컨텍스트 선택 화면 ("어느 자격으로 들어갈까").
 * docs/MULTI_CONTEXT_LOGIN_DESIGN.md §6.1.
 *
 * 부여받은 모자가 없으면 목록은 [기본 정체] 1개뿐이라 로그인은 여기 오지 않고 곧장 대시보드로 간다
 * (LoginPage 가 판단). 이 화면은 모자가 2개 이상인 사람과, 상시 전환으로 다시 들어온 사람만 본다.
 *
 * ⚠ 목록의 단일 소스는 `GET /api/auth/contexts` — 로그인 응답의 contexts 는 최초 표시 최적화일 뿐,
 *   부여/회수 직후에도 정확하려면 진입 시 다시 읽어야 한다.
 *
 * v1.3(2026-10-05): 리스트 맨 아래 = 내 역할 요청 행(승인 대기·거절) + 「+ 역할 추가 요청」 카드.
 *   요청은 부여가 아니다 — 승인자(매장 RA 또는 SA)가 승인할 때만 카드가 생긴다(설계 §8-3 봉인 유지).
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

// 내 요청 행 — 카드와 같은 높이, 눌리지 않는다(상태 표시 + 오른쪽 ✕ 만).
const RequestRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  min-height: 68px;
  padding: 12px 12px 12px 18px;
  border: 1px solid var(--pos-border, #E3E8EE);
  border-radius: 12px;
  background: var(--pos-bg, #F6F9FC);
  box-sizing: border-box;
`;

const RequestText = styled(CardText)`
  flex: 1;
`;

const RequestStatus = styled.span<{ $rejected?: boolean }>`
  font-size: 13px;
  color: ${p => (p.$rejected ? '#EF4444' : 'var(--pos-text-muted, #425466)')};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// 「+ 역할 추가 요청」 — 카드(공용 Button 확장)를 다시 확장: 점선 테두리 · 가운데 정렬.
const AddCard = styled(Card)`
  justify-content: center;
  border-style: dashed;
  color: #635BFF;
  font-weight: 600;

  &:hover:not(:disabled) {
    color: #635BFF;
  }
`;

const SentText = styled.p`
  margin: 12px 0 0;
  font-size: 13px;
  color: var(--pos-text, #0A2540);
  text-align: center;
`;

// 요청은 받을 수 있지만 부여는 승인자만 한다(셀프 부여 금지 — 설계 §8-3). 누가 검토하는지 알려 준다.
const FooterHint = styled.p`
  margin: 16px 0 0;
  font-size: 12px;
  line-height: 1.5;
  text-align: center;
  color: var(--pos-text-muted, #425466);
`;

const Footer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const contextKey = (c: UserContextOption) => `${c.kind}:${c.entity_type}:${c.entity_id ?? 'none'}:${c.role}`;

interface MyRequest {
  id: number;
  entity_type: 'restaurant' | 'brand';
  entity_id: number;
  role: string;
  label: string | null;
  status: 'pending' | 'rejected';
  decision_note: string | null;
  created_at: string;
}

const REQUEST_ROLE_KEY: Record<string, string> = {
  'Staff': 'context.request.typeStoreStaff',
  'Restaurant Admin': 'context.request.typeStoreAdmin',
  'Restaurant Owner': 'context.request.typeStoreOwner',
  'Brand Manager': 'context.request.typeBrandManager'
};

const requestHeaders = () => {
  const token = getAuthToken();
  return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
};

const ContextSelectPage: React.FC = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const { contexts, refreshContexts, switchContext, logout, user } = useAuth();
  const { getStoreInfo } = useStore();

  const [list, setList] = useState<UserContextOption[]>(contexts);
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmTarget, setConfirmTarget] = useState<UserContextOption | null>(null);

  // ── 역할 추가 요청 (v1.3) — SA 와 demo 계정은 입구 없음(서버도 403).
  const canRequest = !!user && user.role !== 'System Admin' && !user.isDemo;
  const [myRequests, setMyRequests] = useState<MyRequest[]>([]);
  const [requestOpen, setRequestOpen] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [cancelTarget, setCancelTarget] = useState<MyRequest | null>(null);

  const loadMyRequests = useCallback(async () => {
    if (!canRequest) return;
    try {
      const res = await fetch('/api/context-requests/mine', { headers: requestHeaders() });
      const body = await res.json().catch(() => null);
      if (res.ok && body && Array.isArray(body.data)) setMyRequests(body.data);
    } catch { /* 요청 목록은 부가 정보 — 실패해도 카드 선택은 된다 */ }
  }, [canRequest]);

  useEffect(() => { loadMyRequests(); }, [loadMyRequests]);

  const removeRequest = useCallback(async (r: MyRequest) => {
    try {
      await fetch(`/api/context-requests/${r.id}`, { method: 'DELETE', headers: requestHeaders() });
    } catch { /* 다시 읽어 실제 상태를 보여 준다 */ }
    setRequestSent(false);
    loadMyRequests();
  }, [loadMyRequests]);

  // 타임존 없는 날짜 표시 금지 — 매장 타임존이 없으면 날짜를 생략한다.
  const requestDate = (iso: string): string | null => {
    const tz = getStoreInfo()?.timeZone;
    return tz ? formatDate(iso, tz) : null;
  };

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
            // 카드 제목은 서버가 정한다 — 기본 카드 = 이 아이디의 프로필 이름, 부여·오너 카드 = 들어갈 곳의 이름.
            // "기본" 배지는 두지 않는다 — 고르는 사람에겐 3장이 전부 동등한 선택지라 아무 질문에도
            // 답하지 않는 라벨이었다. "내 원래 자리"라는 정보는 **맨 위 고정**으로 전달한다.
            <Card key={contextKey(ctx)} onClick={() => onPick(ctx)} disabled={busyKey !== null}>
              <CardGlyph aria-hidden="true">{ctx.kind === 'default' ? '◉' : ctx.entity_type === 'owner' ? '◯' : ctx.entity_type === 'brand' ? '◐' : '▦'}</CardGlyph>
              <CardText>
                <CardLabel>{ctx.label}</CardLabel>
                <CardRole>{ctx.role}</CardRole>
              </CardText>
            </Card>
          ))}

          {/* 맨 아래 — 내 요청(대기·거절) → 「+ 역할 추가 요청」 (Irene 지정 위치) */}
          {canRequest && myRequests.map((r) => {
            const date = r.status === 'pending' ? requestDate(r.created_at) : null;
            const roleLabel = REQUEST_ROLE_KEY[r.role] ? t(REQUEST_ROLE_KEY[r.role]) : r.role;
            const status = r.status === 'pending'
              ? (date ? t('context.request.pending', { date }) : t('context.request.pendingNoDate'))
              : `${t('context.request.rejected')}${r.decision_note ? ` · ${r.decision_note}` : ''}`;
            return (
              <RequestRow key={`req-${r.id}`}>
                <CardGlyph aria-hidden="true">{r.role === 'Restaurant Owner' ? '◯' : r.entity_type === 'brand' ? '◐' : '▦'}</CardGlyph>
                <RequestText>
                  <CardLabel>{r.label || t('context.request.deletedTarget')}</CardLabel>
                  <RequestStatus $rejected={r.status === 'rejected'}>{roleLabel} · {status}</RequestStatus>
                </RequestText>
                <IconButton
                  type="button"
                  variant="delete"
                  title={r.status === 'pending' ? t('context.request.cancel') : t('context.request.dismiss')}
                  aria-label={r.status === 'pending' ? t('context.request.cancel') : t('context.request.dismiss')}
                  onClick={() => (r.status === 'pending' ? setCancelTarget(r) : removeRequest(r))}
                >
                  ✕
                </IconButton>
              </RequestRow>
            );
          })}

          {canRequest && (
            <AddCard onClick={() => { setRequestSent(false); setRequestOpen(true); }} disabled={busyKey !== null}>
              + {t('context.request.add')}
            </AddCard>
          )}
        </List>

        {requestSent && <SentText>{t('context.request.sent')}</SentText>}

        {error && <ErrorText>{error}</ErrorText>}

        <FooterHint>{t('context.select.grantHint')}</FooterHint>

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

      {canRequest && (
        <ContextRequestModal
          isOpen={requestOpen}
          onClose={() => setRequestOpen(false)}
          onSent={() => { setRequestOpen(false); setRequestSent(true); loadMyRequests(); }}
          isNativeOwner={(list.find(c => c.kind === 'default')?.role ?? user?.role) === 'Restaurant Owner'}
        />
      )}

      <ConfirmModal
        isOpen={cancelTarget !== null}
        type="warning"
        title={t('context.request.cancel')}
        message={t('context.request.cancelConfirm')}
        confirmText={t('context.request.cancel')}
        cancelText={t('context.request.keep')}
        onConfirm={() => { const r = cancelTarget; setCancelTarget(null); if (r) removeRequest(r); }}
        onCancel={() => setCancelTarget(null)}
      />
    </Page>
  );
};

export default ContextSelectPage;
