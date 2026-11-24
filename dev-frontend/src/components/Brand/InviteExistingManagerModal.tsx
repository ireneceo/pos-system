import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ModalButton, ModalWarning, FormGroup, FormLabel, FormInput, FormTextArea } from '../UI/Modal';
import { getAuthToken } from '../../utils/auth';
import { BRAND_MANAGER_PERMISSION_GROUPS } from '../../utils/brandManagerPermissions';

/**
 * 기존 계정을 내 브랜드의 «연결된 매니저» 로 초대 (2026-11-24 · .claude/fable-design-20261124-brand-manager-invite.md §3.1).
 * 브랜드마다 초대 한 장 → 받은 사람이 역할 선택 화면에서 브랜드마다 수락해야 매니저가 된다.
 * 서버가 «내 브랜드» 인지 판정한다(남의 브랜드가 섞이면 전체 404). 실패 문구는 서버 message 그대로 — fetchAPI 는 실패 본문을 버려서 직접 fetch.
 */
interface Props {
  isOpen: boolean;
  onClose: () => void;
  brands: Array<{ id: number; name: string }>;
  /** «Add Manager» 400(EMAIL_IN_USE) 에서 넘어오면 이메일·권한 미리 채움 */
  presetEmail?: string;
  presetPermissions?: string[];
  onSent: () => void;
}

interface InviteResult { brand_id: number; label: string; status: 'invited' | 'skipped'; reason?: string }

const boxStyle: React.CSSProperties = { marginTop: 16, padding: 16, background: '#F1F4F8', borderRadius: 8, border: '1px solid #C7CED6' };
const optionStyle = (on: boolean, locked = false): React.CSSProperties => ({
  display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 6, fontSize: 13,
  background: locked ? '#F0FDF4' : 'white', border: `1px solid ${locked ? '#BBF7D0' : (on ? '#635BFF' : '#C7CED6')}`,
  color: locked ? '#166534' : '#1F2937', cursor: locked ? 'default' : 'pointer'
});
const gridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 8 };

const InviteExistingManagerModal: React.FC<Props> = ({ isOpen, onClose, brands, presetEmail, presetPermissions, onSent }) => {
  const { t } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [brandIds, setBrandIds] = useState<number[]>([]);
  const [permissions, setPermissions] = useState<string[]>(['dashboard']);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [results, setResults] = useState<InviteResult[] | null>(null);
  const locked = !!presetEmail;

  useEffect(() => {
    if (!isOpen) return;
    setEmail(presetEmail || '');
    setBrandIds(brands.map(b => b.id));
    setPermissions(presetPermissions && presetPermissions.length ? Array.from(new Set(['dashboard', ...presetPermissions])) : ['dashboard']);
    setMessage('');
    setError('');
    setSending(false);
    setResults(null);
  }, [isOpen, presetEmail, presetPermissions, brands]);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canSend = emailValid && brandIds.length > 0 && !sending && !results;
  const allSelected = brands.length > 0 && brandIds.length === brands.length;

  const toggleBrand = (id: number, on: boolean) => {
    setBrandIds(prev => on ? Array.from(new Set([...prev, id])) : prev.filter(x => x !== id));
    if (error) setError('');
  };
  const togglePerm = (key: string, on: boolean) => {
    setPermissions(prev => on ? Array.from(new Set([...prev, key])) : prev.filter(p => p !== key));
  };

  const handleSend = async () => {
    if (!canSend) return;
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/context-requests/invite/brand-manager', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
        body: JSON.stringify({ email: email.trim(), brand_ids: brandIds, permissions, message: message.trim() || undefined })
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || body?.success === false) {
        setError(body?.message || body?.error || t('common:brandStaffPage.inviteFailed', 'Could not send the invitation.'));
        setSending(false);
        return;
      }
      setSending(false);
      const list: InviteResult[] = Array.isArray(body?.data?.results) ? body.data.results : [];
      onSent();
      // 일부 건너뛴 브랜드가 있으면 결과를 보여 주고, 전부 보냈으면 닫는다.
      if (list.some(r => r.status === 'skipped')) setResults(list);
      else onClose();
    } catch (e) {
      setError((e as Error).message || t('common:brandStaffPage.inviteFailed', 'Could not send the invitation.'));
      setSending(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('common:brandStaffPage.inviteTitle', 'Invite an existing account')}
      size="large"
      footer={results ? (
        <ModalButton variant="primary" onClick={onClose}>{t('common:brandStaffPage.ok', 'OK')}</ModalButton>
      ) : (
        <>
          <ModalButton variant="secondary" onClick={onClose}>{t('common:brandStaffPage.cancel', 'Cancel')}</ModalButton>
          <ModalButton variant="primary" onClick={handleSend} disabled={!canSend}>
            {sending ? t('common:brandStaffPage.inviteSending', 'Sending…') : t('common:brandStaffPage.inviteSend', 'Send invitation')}
          </ModalButton>
        </>
      )}
    >
      {results ? (
        <div>
          <div style={{ fontSize: 14, color: '#1F2937', marginBottom: 12 }}>
            {t('common:brandStaffPage.inviteResultTitle', 'Invitation sent for some brands:')}
          </div>
          {results.map(r => (
            <div key={r.brand_id} style={{ fontSize: 13, padding: '6px 0', borderBottom: '1px solid #E5E7EB', color: '#1F2937' }}>
              <strong>{r.label}</strong>{' — '}
              {r.status === 'invited'
                ? <span style={{ color: '#059669' }}>{t('common:brandStaffPage.inviteResultInvited', 'Invited')}</span>
                : <span style={{ color: '#4B5563' }}>{t('common:brandStaffPage.inviteResultSkipped', 'Skipped')}: {r.reason}</span>}
            </div>
          ))}
        </div>
      ) : (
        <>
          <div style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.5, marginBottom: 16 }}>
            {t('common:brandStaffPage.inviteHint', 'The person keeps their own account and password. They will see the invitation when they sign in and must accept it for each brand.')}
          </div>
          <FormGroup>
            <FormLabel>{t('common:brandStaffPage.inviteEmail', 'Email of the existing account')}</FormLabel>
            <FormInput
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
              disabled={locked}
              style={locked ? { backgroundColor: '#F1F4F8', color: '#4B5563' } : undefined}
              placeholder="name@example.com"
              autoComplete="off"
            />
          </FormGroup>

          <div style={boxStyle}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#0A2540', marginBottom: 4 }}>
              {t('common:brandStaffPage.brands', 'Brands')} *
            </div>
            <div style={{ fontSize: 12, color: '#4B5563', marginBottom: 12 }}>
              {t('common:brandStaffPage.invitePerBrandHint', 'Linked managers are added per brand. Brands you add later are not included.')}
            </div>
            <div style={gridStyle}>
              {brands.length > 1 && (
                <label style={optionStyle(allSelected)}>
                  <input type="checkbox" checked={allSelected} style={{ accentColor: '#635BFF' }}
                    onChange={(e) => setBrandIds(e.target.checked ? brands.map(b => b.id) : [])} />
                  {t('common:brandStaffPage.selectAllBrands', 'Select all')}
                </label>
              )}
              {brands.map(b => (
                <label key={b.id} style={optionStyle(brandIds.includes(b.id), brands.length === 1)}>
                  <input type="checkbox" checked={brandIds.includes(b.id)} disabled={brands.length === 1}
                    style={{ accentColor: '#635BFF' }} onChange={(e) => toggleBrand(b.id, e.target.checked)} />
                  {b.name}
                </label>
              ))}
            </div>
          </div>

          <div style={boxStyle}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#0A2540', marginBottom: 12 }}>
              {t('common:brandStaffPage.menuAccess', 'Menu Access')}
            </div>
            <div style={gridStyle}>
              {BRAND_MANAGER_PERMISSION_GROUPS.map(g => {
                const on = g.alwaysOn || permissions.includes(g.key);
                return (
                  <label key={g.key} style={optionStyle(on, g.alwaysOn)}>
                    <input type="checkbox" checked={on} disabled={g.alwaysOn} style={{ accentColor: '#635BFF' }}
                      onChange={(e) => togglePerm(g.key, e.target.checked)} />
                    {t(`common:ui.brandManagerPerm.${g.key}`, { defaultValue: g.label.split(' (')[0] })}
                  </label>
                );
              })}
            </div>
          </div>

          <FormGroup style={{ marginTop: 16 }}>
            <FormLabel>{t('common:brandStaffPage.inviteMessage', 'Message (optional)')}</FormLabel>
            <FormTextArea value={message} maxLength={300} rows={2} onChange={(e) => setMessage(e.target.value)} />
          </FormGroup>
          {error && <ModalWarning>{error}</ModalWarning>}
        </>
      )}
    </Modal>
  );
};

export default InviteExistingManagerModal;
