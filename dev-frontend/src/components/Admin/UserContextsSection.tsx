import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Button } from '../UI';
import ConfirmModal from '../ConfirmModal';
import { getAuthToken } from '../../utils/auth';

/**
 * 유저별 컨텍스트("모자") 부여 관리 — System Admin 전용 섹션.
 * docs/MULTI_CONTEXT_LOGIN_DESIGN.md §7-P4.
 *
 * v1 은 (매장 × Restaurant Admin) 조합만 부여할 수 있어 역할 선택이 없다 — 서버도 같은 규칙을
 * 강제하므로(서비스 단일 소스) 화면에서 역할을 고르게 하면 규칙이 두 곳으로 갈라진다.
 *
 * ⚠ 부여는 **다른 사람에게 그 매장의 관리자 권한을 주는 행위**다. 그래서 회수 시 확인을 받고,
 *   대상 매장이 사라진 "고아 모자"도 따로 보여준다(회수 누락을 사람이 알아채게).
 */

const Section = styled.div`
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--pos-border, #E3E8EE);
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
`;

const Title = styled.h4`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--pos-text, #0A2540);
`;

const Hint = styled.p`
  margin: 0 0 10px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--pos-text-muted, #425466);
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid var(--pos-border, #E3E8EE);
  border-radius: 8px;
  margin-bottom: 8px;
  font-size: 13px;
`;

const RowLabel = styled.span`
  flex: 1;
  min-width: 0;
  color: var(--pos-text, #0A2540);
`;

const Tag = styled.span<{ tone?: 'default' | 'warn' }>`
  flex-shrink: 0;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  background: ${(p) => (p.tone === 'warn' ? 'rgba(245, 158, 11, 0.12)' : 'rgba(99, 91, 255, 0.1)')};
  color: ${(p) => (p.tone === 'warn' ? '#B45309' : '#635BFF')};
`;

const Empty = styled.p`
  margin: 0 0 8px;
  font-size: 13px;
  color: var(--pos-text-muted, #425466);
`;

const Picker = styled.select`
  flex: 1;
  min-width: 0;
  height: 38px;
  padding: 0 10px;
  border: 1px solid var(--pos-border, #E3E8EE);
  border-radius: 8px;
  background: #FFFFFF;
  font-size: 13px;
`;

const Error = styled.p`
  margin: 8px 0 0;
  font-size: 12px;
  color: #EF4444;
`;

interface Ctx {
  kind: 'default' | 'granted';
  id?: number;
  entity_type: string;
  entity_id: number | null;
  role: string;
  label: string;
}

interface Orphan { id: number; entity_id: number; role: string; }

interface Props { userId: number | string; }

const UserContextsSection: React.FC<Props> = ({ userId }) => {
  const { t } = useTranslation('auth');
  const [contexts, setContexts] = useState<Ctx[]>([]);
  const [orphans, setOrphans] = useState<Orphan[]>([]);
  const [restaurants, setRestaurants] = useState<Array<{ id: number; name: string }>>([]);
  const [pick, setPick] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [revoking, setRevoking] = useState<Ctx | null>(null);

  const headers = useCallback(() => {
    const token = getAuthToken();
    return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
  }, []);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/users/${userId}/contexts`, { headers: headers() });
      if (!res.ok) { setError(t('context.admin.loadFailed')); return; }
      const json = await res.json();
      setContexts(json?.data?.contexts || []);
      setOrphans(json?.data?.orphans || []);
      setError(null);
    } catch {
      setError(t('context.admin.loadFailed'));
    }
  }, [userId, headers, t]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/restaurants', { headers: headers() });
        if (!res.ok) return;
        const json = await res.json();
        const list = (json?.data || json || []).map((r: any) => ({ id: r.id, name: r.name }));
        setRestaurants(list);
      } catch { /* 목록 실패 시 부여 UI 만 비활성 — 조회는 계속 동작 */ }
    })();
  }, [headers]);

  const grant = async () => {
    if (!pick) return;
    setBusy(true); setError(null);
    try {
      const res = await fetch(`/api/users/${userId}/contexts`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ entity_type: 'restaurant', entity_id: Number(pick), role: 'Restaurant Admin' })
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) { setError(json?.message || t('context.admin.grantFailed')); return; }
      setPick('');
      await load();
    } catch {
      setError(t('context.admin.grantFailed'));
    } finally {
      setBusy(false);
    }
  };

  const revoke = async (ctx: Ctx) => {
    setBusy(true); setError(null);
    try {
      const res = await fetch(`/api/users/${userId}/contexts/${ctx.id}`, { method: 'DELETE', headers: headers() });
      if (!res.ok) { setError(t('context.admin.revokeFailed')); return; }
      await load();
    } catch {
      setError(t('context.admin.revokeFailed'));
    } finally {
      setBusy(false);
    }
  };

  const granted = contexts.filter((c) => c.kind === 'granted');

  return (
    <Section>
      <Head>
        <Title>{t('context.admin.title')}</Title>
      </Head>
      <Hint>{t('context.admin.hint')}</Hint>

      {granted.length === 0 && <Empty>{t('context.admin.none')}</Empty>}

      {granted.map((c) => (
        <Row key={c.id}>
          <RowLabel>{c.label}</RowLabel>
          <Tag>{c.role}</Tag>
          <Button variant="danger" size="small" disabled={busy} onClick={() => setRevoking(c)}>
            {t('context.admin.revoke')}
          </Button>
        </Row>
      ))}

      {orphans.map((o) => (
        <Row key={'orphan-' + o.id}>
          <RowLabel>{t('context.admin.deletedRestaurant', { id: o.entity_id })}</RowLabel>
          <Tag tone="warn">{t('context.admin.orphan')}</Tag>
          <Button
            variant="danger"
            size="small"
            disabled={busy}
            onClick={() => setRevoking({ kind: 'granted', id: o.id, entity_type: 'restaurant', entity_id: o.entity_id, role: o.role, label: String(o.entity_id) })}
          >
            {t('context.admin.revoke')}
          </Button>
        </Row>
      ))}

      <Row>
        <Picker value={pick} onChange={(e) => setPick(e.target.value)} disabled={busy || restaurants.length === 0}>
          <option value="">{t('context.admin.selectRestaurant')}</option>
          {restaurants.map((r) => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </Picker>
        <Button variant="primary" size="small" disabled={busy || !pick} onClick={grant}>
          {t('context.admin.grant')}
        </Button>
      </Row>

      {error && <Error>{error}</Error>}

      <ConfirmModal
        isOpen={revoking !== null}
        type="danger"
        title={t('context.admin.revokeConfirmTitle')}
        message={t('context.admin.revokeConfirmMessage', { name: revoking?.label || '' })}
        confirmText={t('context.admin.revoke')}
        cancelText={t('context.confirm.cancel')}
        onConfirm={() => { const c = revoking; setRevoking(null); if (c) revoke(c); }}
        onCancel={() => setRevoking(null)}
      />
    </Section>
  );
};

export default UserContextsSection;
