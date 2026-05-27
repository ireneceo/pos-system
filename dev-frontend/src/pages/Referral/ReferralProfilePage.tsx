import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../../utils/auth';

interface ProfileData {
  id: number;
  full_name: string | null;
  email: string;
  phone: string | null;
  role: string;
  referral_code: string;
  bank_name: string | null;
  bank_account_number: string | null;
  bank_account_holder: string | null;
  pos_account: {
    is_pos_user: boolean;
    role: string;
    subscription_status?: string | null;
    plan_type?: string | null;
  };
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
`;

const PageTitle = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const Block = styled.section`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
`;

const BlockTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 4px;
`;

const BlockHint = styled.p`
  font-size: 13px;
  color: #4B5563;
  margin: 0 0 16px;
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 16px;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #F1F4F8;

  &:last-child { border-bottom: none; }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 6px;
  }
`;

const FieldLabel = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #4B5563;
`;

const FieldControl = styled.div`
  position: relative;
`;

const InputBox = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 12px;
  font-size: 14px;
  color: #0A2540;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  background: white;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus {
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F5F7FA;
    color: #4B5563;
    cursor: not-allowed;
  }
`;

const SaveOverlay = styled.span<{ $state: 'idle' | 'saving' | 'saved' | 'error' }>`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 12px;
  pointer-events: none;
  transition: opacity 0.2s;
  opacity: ${p => (p.$state === 'idle' ? 0 : 1)};
  background: ${p => ({
    idle: 'transparent',
    saving: '#FEF3C7',
    saved: '#ECFDF5',
    error: '#FEE2E2'
  })[p.$state]};
  color: ${p => ({
    idle: 'transparent',
    saving: '#A16207',
    saved: '#059669',
    error: '#B91C1C'
  })[p.$state]};
`;

const ReadValue = styled.div`
  font-size: 14px;
  color: #0A2540;
  padding: 10px 0;
`;

const CodeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: #F9FAFB;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  gap: 12px;
  flex-wrap: wrap;
`;

const CodeText = styled.div`
  font-family: 'SFMono-Regular', Menlo, Consolas, monospace;
  font-size: 16px;
  font-weight: 600;
  color: #635BFF;
  letter-spacing: 0.5px;
`;

const Btn = styled.button`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
  cursor: pointer;
  &:hover { background: #F5F7FA; border-color: #C9CFD9; }
`;

const Empty = styled.div`
  padding: 24px;
  text-align: center;
  color: #4B5563;
  font-size: 14px;
  background: #F9FAFB;
  border: 1px dashed #C7CED6;
  border-radius: 8px;
`;

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

interface AutoSaveProps {
  field: keyof ProfileData;
  value: string;
  type?: 'text' | 'tel';
  placeholder?: string;
  onSave: (field: string, value: string) => Promise<void>;
}

const AutoSaveField: React.FC<AutoSaveProps> = ({ field, value, type = 'text', placeholder, onSave }) => {
  const { t } = useTranslation('referrals');
  const [local, setLocal] = useState(value || '');
  const [state, setState] = useState<SaveState>('idle');
  const initial = useRef(value || '');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSent = useRef<string>(initial.current);

  useEffect(() => {
    initial.current = value || '';
    lastSent.current = value || '';
    setLocal(value || '');
  }, [value]);

  const onChange = (next: string) => {
    setLocal(next);
    if (timer.current) clearTimeout(timer.current);
    if (next === lastSent.current) {
      setState('idle');
      return;
    }
    setState('saving');
    timer.current = setTimeout(async () => {
      try {
        await onSave(field as string, next);
        lastSent.current = next;
        setState('saved');
        setTimeout(() => setState('idle'), 1500);
      } catch {
        setState('error');
      }
    }, 600);
  };

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  return (
    <FieldControl>
      <InputBox
        type={type}
        value={local}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
      />
      <SaveOverlay $state={state}>
        {state === 'saving' && t('profile.autosave.saving', 'Saving')}
        {state === 'saved' && t('profile.autosave.saved', 'Saved')}
        {state === 'error' && t('profile.autosave.error', 'Error')}
      </SaveOverlay>
    </FieldControl>
  );
};

const ReferralProfilePage: React.FC = () => {
  const { t } = useTranslation('referrals');
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/referrals/profile', {
        headers: { Authorization: `Bearer ${getAuthToken()}` }
      });
      if (!res.ok) throw new Error(t('profile.error.loadFailed', 'Failed to load profile'));
      const body = await res.json();
      setProfile(body.data || null);
    } catch (e) {
      setError(e instanceof Error ? e.message : t('common.failedToLoad', 'Failed to load'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => { load(); }, [load]);

  const saveField = useCallback(async (field: string, value: string) => {
    const res = await fetch('/api/referrals/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
      body: JSON.stringify({ [field]: value })
    });
    if (!res.ok) throw new Error(t('profile.error.saveFailed', 'Save failed'));
    setProfile(prev => (prev ? { ...prev, [field]: value } : prev));
  }, [t]);

  const copyCode = async () => {
    if (!profile) return;
    try {
      await navigator.clipboard.writeText(profile.referral_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* ignore */ }
  };

  if (loading && !profile) {
    return <><Header><PageTitle>{t('profile.title', 'Profile')}</PageTitle></Header><Block><Empty>{t('common.loading', 'Loading…')}</Empty></Block></>;
  }
  if (error) {
    return <><Header><PageTitle>{t('profile.title', 'Profile')}</PageTitle></Header><Block><Empty>{error}</Empty></Block></>;
  }
  if (!profile) return null;

  return (
    <>
      <Header><PageTitle>{t('profile.title', 'Profile')}</PageTitle></Header>

      <Block>
        <BlockTitle>{t('profile.account.title', 'Account information')}</BlockTitle>
        <BlockHint>{t('profile.account.hint', 'Your account details. Email is fixed; the rest auto-saves.')}</BlockHint>
        <FieldRow>
          <FieldLabel>{t('profile.account.fullName', 'Full name')}</FieldLabel>
          <AutoSaveField field="full_name" value={profile.full_name || ''} onSave={saveField} />
        </FieldRow>
        <FieldRow>
          <FieldLabel>{t('profile.account.email', 'Email')}</FieldLabel>
          <ReadValue>{profile.email}</ReadValue>
        </FieldRow>
        <FieldRow>
          <FieldLabel>{t('profile.account.phone', 'Phone')}</FieldLabel>
          <AutoSaveField field="phone" type="tel" placeholder={t('profile.account.phonePlaceholder', '+60 12 345 6789')} value={profile.phone || ''} onSave={saveField} />
        </FieldRow>
      </Block>

      <Block>
        <BlockTitle>{t('profile.bank.title', 'Bank information for payouts')}</BlockTitle>
        <BlockHint>{t('profile.bank.hint', 'Used when you request a payout. Saved across requests so you only enter it once.')}</BlockHint>
        <FieldRow>
          <FieldLabel>{t('profile.bank.bankName', 'Bank name')}</FieldLabel>
          <AutoSaveField field="bank_name" value={profile.bank_name || ''} onSave={saveField} />
        </FieldRow>
        <FieldRow>
          <FieldLabel>{t('profile.bank.accountNumber', 'Account number')}</FieldLabel>
          <AutoSaveField field="bank_account_number" value={profile.bank_account_number || ''} onSave={saveField} />
        </FieldRow>
        <FieldRow>
          <FieldLabel>{t('profile.bank.accountHolder', 'Account holder')}</FieldLabel>
          <AutoSaveField field="bank_account_holder" value={profile.bank_account_holder || ''} onSave={saveField} />
        </FieldRow>
      </Block>

      <Block>
        <BlockTitle>{t('profile.code.title', 'My referral code')}</BlockTitle>
        <BlockHint>{t('profile.code.hint', 'Share this code or link with prospective Purple POS users.')}</BlockHint>
        <CodeRow>
          <CodeText>{profile.referral_code}</CodeText>
          <Btn onClick={copyCode}>{copied ? t('common.copied', 'Copied!') : t('common.copyCode', 'Copy code')}</Btn>
        </CodeRow>
      </Block>

      <Block>
        <BlockTitle>{t('profile.pos.title', 'POS account')}</BlockTitle>
        {profile.pos_account.is_pos_user && profile.pos_account.role !== 'Referral Partner' ? (
          <>
            <BlockHint>{t('profile.pos.alsoUser', 'You are also a Purple POS user.')}</BlockHint>
            <FieldRow>
              <FieldLabel>{t('profile.pos.role', 'Role')}</FieldLabel>
              <ReadValue>{profile.pos_account.role}</ReadValue>
            </FieldRow>
            {profile.pos_account.plan_type && (
              <FieldRow>
                <FieldLabel>{t('profile.pos.plan', 'Plan')}</FieldLabel>
                <ReadValue>{profile.pos_account.plan_type}</ReadValue>
              </FieldRow>
            )}
            {profile.pos_account.subscription_status && (
              <FieldRow>
                <FieldLabel>{t('profile.pos.subscription', 'Subscription')}</FieldLabel>
                <ReadValue>{profile.pos_account.subscription_status}</ReadValue>
              </FieldRow>
            )}
            <div style={{ marginTop: 12 }}>
              <Link to="/pos" style={{ color: '#635BFF', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
                {t('profile.pos.goToDashboard', 'Go to POS dashboard →')}
              </Link>
            </div>
          </>
        ) : (
          <>
            <BlockHint>{t('profile.pos.partnerOnly', "You are a Referral Partner only — you don't have a POS subscription.")}</BlockHint>
            <Link to="/signup" style={{ color: '#635BFF', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
              {t('profile.pos.signUpForPos', 'Want to use POS too? Sign up →')}
            </Link>
          </>
        )}
      </Block>
    </>
  );
};

export default ReferralProfilePage;
