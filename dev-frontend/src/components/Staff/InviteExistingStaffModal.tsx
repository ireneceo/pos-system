import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ModalButton, ModalWarning, FormGroup, FormLabel, FormInput, FormTextArea } from '../UI/Modal';
import StaffPermissionPicker from './StaffPermissionPicker';
import { getAuthToken } from '../../utils/auth';

/**
 * 기존 계정을 이 매장 직원으로 «초대» — 멀티 로그인 v1.4(.claude/fable-design-20261016-link-existing-account-staff.md §6.1-6).
 * 본인이 역할 선택 화면에서 수락해야 직원(Staff 모자)이 된다. 서버가 RA 의 매장을 강제한다(매장 id 안 보냄).
 * 실패 문구는 서버 message 그대로 — fetchAPI 는 실패 본문을 버려서 직접 fetch.
 */
interface Props {
  isOpen: boolean;
  onClose: () => void;
  /** Add Staff 400(EMAIL_IN_USE) 에서 넘어오면 이메일 고정 */
  presetEmail?: string;
  presetPermissions?: string[];
  onSent: () => void;
}

const InviteExistingStaffModal: React.FC<Props> = ({ isOpen, onClose, presetEmail, presetPermissions, onSent }) => {
  const { t } = useTranslation(['staff']);
  const [email, setEmail] = useState('');
  const [permissions, setPermissions] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const locked = !!presetEmail;

  useEffect(() => {
    if (!isOpen) return;
    setEmail(presetEmail || '');
    setPermissions(presetPermissions ? [...presetPermissions] : []);
    setMessage('');
    setError('');
    setSending(false);
  }, [isOpen, presetEmail, presetPermissions]);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canSend = emailValid && permissions.length > 0 && !sending;

  const handleSend = async () => {
    if (!canSend) return;
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/context-requests/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
        body: JSON.stringify({ email: email.trim(), permissions, message: message.trim() || undefined })
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || body?.success === false) {
        setError(body?.message || body?.error || t('staff:staffPage.inviteFailed'));
        setSending(false);
        return;
      }
      setSending(false);
      onSent();
    } catch (e) {
      setError((e as Error).message || t('staff:staffPage.inviteFailed'));
      setSending(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('staff:staffPage.inviteTitle')}
      size="large"
      footer={
        <>
          <ModalButton variant="secondary" onClick={onClose}>{t('staff:staffPage.cancel')}</ModalButton>
          <ModalButton variant="primary" onClick={handleSend} disabled={!canSend}>
            {sending ? t('staff:staffPage.inviteSending') : t('staff:staffPage.inviteSend')}
          </ModalButton>
        </>
      }
    >
      <div style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.5, marginBottom: 16 }}>
        {t('staff:staffPage.inviteHint')}
      </div>
      <FormGroup>
        <FormLabel>{t('staff:staffPage.inviteEmail')}</FormLabel>
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
      <StaffPermissionPicker value={permissions} onChange={setPermissions} />
      {permissions.length === 0 && (
        <div style={{ fontSize: 12, color: '#4B5563', marginTop: 6 }}>{t('staff:staffPage.invitePickOne')}</div>
      )}
      <FormGroup style={{ marginTop: 16 }}>
        <FormLabel>{t('staff:staffPage.inviteMessage')}</FormLabel>
        <FormTextArea
          value={message}
          maxLength={300}
          rows={2}
          onChange={(e) => setMessage(e.target.value)}
        />
      </FormGroup>
      {error && <ModalWarning>{error}</ModalWarning>}
    </Modal>
  );
};

export default InviteExistingStaffModal;
