import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Modal, FormGroup, FormLabel, FormInput, FormTextArea } from '../../components/UI/Modal';
import { StandardSelect } from '../../components/UI/SelectComponents';
import { ThemedButton, ThemedModalButton } from '../../components/UI';
import { getAuthToken } from '../../utils/auth';

/**
 * 역할 추가 요청 모달 — 멀티 로그인 v1.3 (.claude/fable-design-20261005-context-request.md §6.1).
 * 요청은 부여가 아니다 — 서버가 pending 1행만 만들고, 승인자가 승인할 때만 카드가 생긴다.
 * 역할이 entity_type 을 정한다(ENUM 미노출). 권한(Staff)은 요청자가 아니라 승인자가 고른다.
 *
 * ⚠ 실패 사유는 서버 message 를 그대로 보여 준다 — fetchAPI 는 실패 본문을 버리므로 직접 fetch.
 */

type RoleKind = 'store_staff' | 'store_admin' | 'store_owner' | 'brand_manager';

const ROLE_SPEC: Record<RoleKind, { entity_type: 'restaurant' | 'brand'; role: string; labelKey: string }> = {
  store_staff: { entity_type: 'restaurant', role: 'Staff', labelKey: 'context.request.typeStoreStaff' },
  store_admin: { entity_type: 'restaurant', role: 'Restaurant Admin', labelKey: 'context.request.typeStoreAdmin' },
  store_owner: { entity_type: 'restaurant', role: 'Restaurant Owner', labelKey: 'context.request.typeStoreOwner' },
  brand_manager: { entity_type: 'brand', role: 'Brand Manager', labelKey: 'context.request.typeBrandManager' }
};

const Hint = styled.div`
  margin-top: 6px;
  font-size: 12px;
  color: #4B5563;
`;

const Results = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
`;

// 검색 결과 한 줄 — 공용 Button(secondary) 확장, 터치 44px.
const ResultButton = styled(ThemedButton)`
  width: 100%;
  min-height: 44px;
  justify-content: flex-start;
  text-align: left;
`;

const Chip = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: 44px;
  padding: 6px 6px 6px 12px;
  border: 1px solid #635BFF;
  border-radius: 8px;
  background: #F4F3FF;
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`;

const Counter = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: #6B7280;
  text-align: right;
`;

const ErrorText = styled.div`
  margin-top: 12px;
  font-size: 13px;
  color: #EF4444;
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSent: () => void;
  /** 네이티브 오너면 「매장 오너」 옵션을 숨긴다(서버도 400). */
  isNativeOwner: boolean;
}

const authHeaders = () => {
  const token = getAuthToken();
  return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
};

const ContextRequestModal: React.FC<Props> = ({ isOpen, onClose, onSent, isNativeOwner }) => {
  const { t } = useTranslation('auth');
  const [kind, setKind] = useState<RoleKind>('store_staff');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Array<{ id: number; name: string }>>([]);
  const [searched, setSearched] = useState(false);
  const [target, setTarget] = useState<{ id: number; name: string } | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const seq = useRef(0);

  const spec = ROLE_SPEC[kind];
  const kinds = useMemo(
    () => (Object.keys(ROLE_SPEC) as RoleKind[]).filter(k => !(isNativeOwner && k === 'store_owner')),
    [isNativeOwner]
  );

  // 열릴 때마다 초기화
  useEffect(() => {
    if (!isOpen) return;
    setKind('store_staff'); setQuery(''); setResults([]); setSearched(false);
    setTarget(null); setMessage(''); setError(null);
  }, [isOpen]);

  // 대상 검색 — 2자 이상 · 300ms 디바운스 · 늦게 온 응답은 버린다
  useEffect(() => {
    if (!isOpen || target) return;
    const q = query.trim();
    if (q.length < 2) { setResults([]); setSearched(false); return; }
    const my = ++seq.current;
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/context-requests/targets?type=${spec.entity_type}&q=${encodeURIComponent(q)}`, { headers: authHeaders() });
        const body = await res.json().catch(() => null);
        if (my !== seq.current) return;
        setResults(res.ok && body && Array.isArray(body.data) ? body.data : []);
        setSearched(true);
      } catch {
        if (my === seq.current) { setResults([]); setSearched(true); }
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query, spec.entity_type, isOpen, target]);

  const changeKind = (k: RoleKind) => {
    // 매장↔브랜드가 바뀌면 고른 대상·검색 결과는 의미가 없다
    if (ROLE_SPEC[k].entity_type !== spec.entity_type) { setTarget(null); setResults([]); setSearched(false); }
    setKind(k);
    setError(null);
  };

  const submit = async () => {
    if (!target) return;
    setError(null);
    try {
      const res = await fetch('/api/context-requests', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ entity_type: spec.entity_type, entity_id: target.id, role: spec.role, message: message.trim() || undefined })
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) { setError((body && body.message) || t('context.request.failed')); return; }
      onSent();
    } catch {
      setError(t('context.request.failed'));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('context.request.title')}
      size="small"
      footer={
        <>
          <ThemedModalButton variant="secondary" onClick={onClose}>{t('context.requests.cancel')}</ThemedModalButton>
          <ThemedModalButton variant="primary" onClick={submit} disabled={!target}>{t('context.request.submit')}</ThemedModalButton>
        </>
      }
    >
      <FormGroup>
        <FormLabel>{t('context.request.type')}</FormLabel>
        <StandardSelect value={kind} onChange={(e) => changeKind(e.target.value as RoleKind)}>
          {kinds.map(k => <option key={k} value={k}>{t(ROLE_SPEC[k].labelKey)}</option>)}
        </StandardSelect>
        {kind === 'store_staff' && <Hint>{t('context.request.typeStoreStaffHint')}</Hint>}
      </FormGroup>

      <FormGroup>
        <FormLabel>{t('context.request.target')}</FormLabel>
        {target ? (
          <Chip>
            <span>{spec.entity_type === 'brand' ? '◐' : '▦'} {target.name}</span>
            <ThemedButton variant="secondary" size="small" onClick={() => { setTarget(null); setQuery(''); setResults([]); setSearched(false); }}>
              {t('context.request.change')}
            </ThemedButton>
          </Chip>
        ) : (
          <>
            <FormInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('context.request.searchPlaceholder')}
              autoComplete="off"
            />
            <Results>
              {results.map(r => (
                <ResultButton key={r.id} variant="secondary" onClick={() => { setTarget(r); setError(null); }}>
                  {r.name}
                </ResultButton>
              ))}
              {searched && results.length === 0 && <Hint>{t('context.request.noResults')}</Hint>}
            </Results>
          </>
        )}
      </FormGroup>

      <FormGroup>
        <FormLabel>{t('context.request.message')}</FormLabel>
        <FormTextArea
          rows={3}
          maxLength={500}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Counter>{message.length}/500</Counter>
      </FormGroup>

      {error && <ErrorText>{error}</ErrorText>}
    </Modal>
  );
};

export default ContextRequestModal;
