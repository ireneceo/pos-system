import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { Modal as CommonModal } from '../../components/UI';
import { useParams } from 'react-router-dom';
import { Tabs, Tab } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import { useAuth } from '../../contexts/AuthContext';
import ImportDataTab from '../../components/Settings/ImportDataTab';
import PushPreferencesCard from '../../components/Settings/PushPreferencesCard';
import AutoSaveField, { AutoSaveHandle } from '../../components/Common/AutoSaveField';
import SmtpGuide from '../../components/Common/SmtpGuide';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
const SettingsContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #F9FAFB;
  min-height: 100vh;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #C7CED6;
  margin-bottom: 0;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`;

const Content = styled.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

const SettingsCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #C7CED6;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #4B5563;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const RequiredMark = styled.span`
  color: #EF4444;
  margin-left: 2px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  background: white;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F9FAFB;
    color: #4B5563;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #6B7280;
  }
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #0A2540;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 24px;
`;

const HelpText = styled.small`
  display: block;
  font-size: 12px;
  color: #4B5563;
  margin-top: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SaveButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: none;
  background: #635BFF;
  color: white;

  &:hover {
    background: #5A51E6;
    transform: translateY(-1px);
  }

  &:disabled {
    background: #635BFF;
    color: white;
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
  }
`;

const SecondaryButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  background: white;
  color: #635BFF;
  border: 1px solid #635BFF;

  &:hover {
    background: #F0F4FF;
  }
`;


const ModalText = styled.p`
  font-size: 14px;
  color: #4B5563;
  margin: 0 0 16px 0;
`;


const CancelButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  background: #F1F4F8;
  color: #1F2937;
  border: none;
  transition: all 0.15s;

  &:hover {
    background: #C7CED6;
  }
`;

/* Notification Preferences Styles */
const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #4B5563;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #C7CED6;
`;

const PreferenceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid #F1F4F8;

  &:last-child {
    border-bottom: none;
  }
`;

const PreferenceInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const PreferenceLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 2px;
`;

const PreferenceDesc = styled.div`
  font-size: 13px;
  color: #4B5563;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  flex-shrink: 0;
  margin-left: 16px;
`;

const ToggleSlider = styled.span<{ checked: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.checked ? '#635BFF' : '#6B7280'};
  border-radius: 24px;
  transition: 0.2s;

  &::before {
    content: '';
    position: absolute;
    height: 18px;
    width: 18px;
    left: ${props => props.checked ? '23px' : '3px'};
    bottom: 3px;
    background-color: white;
    border-radius: 50%;
    transition: 0.2s;
  }
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const SectionSpacer = styled.div`
  margin-top: 28px;
`;

const DescriptionText = styled.p`
  font-size: 14px;
  color: #4B5563;
  margin: 0 0 24px 0;
  line-height: 1.5;
`;

const EmailInfoBox = styled.div`
  background: #F0F4FF;
  border: 1px solid #D6E0FF;
  border-radius: 8px;
  padding: 14px 16px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #425466;
  line-height: 1.5;
`;

const EmailInfoContent = styled.div`
  flex: 1;
`;

const EmailAddress = styled.span`
  font-weight: 600;
  color: #0A2540;
`;

const EmailInfoLink = styled.a`
  color: #635BFF;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

interface SmtpSettings {
  email_enabled: boolean;
  smtp_host: string;
  smtp_port: number;
  smtp_secure: boolean;
  smtp_user: string;
  smtp_password: string;
  from_email: string;
  from_name: string;
  reply_to_email: string;
}

interface NotificationCategory {
  key: string;
  label: string;
  description: string;
  section: string;
}

const NotificationSettingsPage: React.FC = () => {
  const { t } = useTranslation('notifications');
  const { user } = useAuth();
  const { restaurantId: urlRestaurantId } = useParams<{ restaurantId: string }>();
  const [activeTab, handleTabChange] = useTabParam<'preferences' | 'email' | 'import'>('preferences');

  // SMTP Settings state
  const [smtpSettings, setSmtpSettings] = useState<SmtpSettings>({
    email_enabled: false,
    smtp_host: '',
    smtp_port: 587,
    smtp_secure: false,
    smtp_user: '',
    smtp_password: '',
    from_email: '',
    from_name: '',
    reply_to_email: ''
  });

  // Notification Preferences state
  const [preferences, setPreferences] = useState<Record<string, boolean>>({});
  const [categories, setCategories] = useState<NotificationCategory[]>([]);
  const [prefsLoading, setPrefsLoading] = useState(false);

  // Live Order audio alert (browser-local; Restaurant Admin / Staff only)
  const isOrderRole = user?.role === 'Restaurant Admin' || user?.role === 'Staff';
  const [audioEnabled, setAudioEnabled] = useState<boolean>(
    () => typeof window !== 'undefined' && localStorage.getItem('sound_enabled') !== 'false'
  );
  const handleAudioToggle = useCallback(() => {
    setAudioEnabled(prev => {
      const next = !prev;
      try { localStorage.setItem('sound_enabled', String(next)); } catch { /* private mode */ }
      if (!next) {
        import('../../utils/notificationSound')
          .then(({ stopRepeatingSound }) => stopRepeatingSound())
          .catch(() => { /* ignore */ });
      }
      return next;
    });
  }, []);

  const [loading, setLoading] = useState(false);

  // Refs for per-toggle AutoSaveField instances (keyed by category key)
  const toggleRefs = useRef<Map<string, AutoSaveHandle>>(new Map());
  // Ref for email_enabled checkbox AutoSaveField
  const emailEnabledRef = useRef<AutoSaveHandle>(null);
  // 미인증 안내 배너 — 재인증 발송 상태 (외부 toast 없이 배너 인라인 피드백)
  const [resendingVerify, setResendingVerify] = useState(false);
  const [verifyResult, setVerifyResult] = useState<'idle' | 'sent' | 'error'>('idle');
  // Latest preferences ref so save callbacks always see up-to-date state
  const preferencesRef = useRef<Record<string, boolean>>({});
  const [showTestEmailModal, setShowTestEmailModal] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState('');
  const [sendingTestEmail, setSendingTestEmail] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState({ success: false, text: '' });

  const getEntityInfo = useCallback((): { entityType: 'restaurant' | 'manager' | 'admin' | 'brand' | 'foodcourt'; entityId: number } => {
    if (urlRestaurantId) {
      return { entityType: 'restaurant', entityId: Number(urlRestaurantId) };
    }
    if (!user) {
      return { entityType: 'restaurant', entityId: 1 };
    }
    if (user.role === 'Restaurant Admin' || user.role === 'Staff') {
      return { entityType: 'restaurant', entityId: Number(user.restaurantId) || 1 };
    } else if (user.role === 'Brand General' || user.role === 'Brand Manager') {
      return { entityType: 'brand', entityId: Number(user.brand_id) || 1 };
    } else if (user.role === 'Foodcourt General' || user.role === 'Foodcourt Manager') {
      return { entityType: 'foodcourt', entityId: Number(user.foodcourt_id) || 1 };
    } else if (user.role === 'System Admin') {
      return { entityType: 'admin', entityId: Number(user.id) || 1 };
    }
    return { entityType: 'restaurant', entityId: Number(user.id) || 1 };
  }, [user, urlRestaurantId]);

  const { entityType, entityId } = useMemo(() => getEntityInfo(), [getEntityInfo]);

  const loadSmtpSettings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/notification-settings/${entityType}/${entityId}`, {
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
      });
      if (response.ok) {
        const data = await response.json();
        setSmtpSettings({
          email_enabled: data.email_enabled || false,
          smtp_host: data.smtp_host || '',
          smtp_port: data.smtp_port || 587,
          smtp_secure: data.smtp_secure || false,
          smtp_user: data.smtp_user || '',
          smtp_password: data.smtp_password || '',
          from_email: data.from_email || '',
          from_name: data.from_name || '',
          reply_to_email: data.reply_to_email || ''
        });
      }
    } catch (error) {
      console.error('Failed to load SMTP settings:', error);
    } finally {
      setLoading(false);
    }
  }, [entityType, entityId]);

  const loadPreferences = useCallback(async () => {
    setPrefsLoading(true);
    try {
      const response = await fetch('/api/notification-settings/preferences', {
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setPreferences(data.data.preferences || {});
          setCategories(data.data.categories || []);
        }
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    } finally {
      setPrefsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadPreferences();
      loadSmtpSettings();
    }
  }, [user, loadPreferences, loadSmtpSettings]);

  // Group categories by section (must be before conditional return)
  const groupedCategories = useMemo(() => {
    const groups: Record<string, NotificationCategory[]> = {};
    categories.forEach(cat => {
      if (!groups[cat.section]) groups[cat.section] = [];
      groups[cat.section].push(cat);
    });
    return groups;
  }, [categories]);

  if (!user) return null;

  // Keep preferencesRef in sync so save callbacks always see the latest state
  const syncPrefsRef = (updated: Record<string, boolean>) => {
    preferencesRef.current = updated;
    setPreferences(updated);
  };

  const handleSmtpSave = async () => {
    const token = getAuthToken();
    if (!token) throw new Error('No authentication token found. Please log in again.');
    const response = await fetch(`/api/notification-settings/${entityType}/${entityId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(smtpSettings)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to save settings');
    }
  };

  const handlePrefsSave = async () => {
    const response = await fetch('/api/notification-settings/preferences', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify({ preferences: preferencesRef.current })
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to save preferences');
    }
  };

  const togglePreference = (key: string) => {
    const updated = { ...preferencesRef.current, [key]: !preferencesRef.current[key] };
    syncPrefsRef(updated);
    // Trigger the AutoSaveField for this toggle
    toggleRefs.current.get(key)?.triggerSave();
  };

  const handleTestEmail = () => {
    setTestEmailAddress('');
    setShowTestEmailModal(true);
  };

  const sendTestEmail = async () => {
    if (!testEmailAddress) return;
    setSendingTestEmail(true);
    try {
      const response = await fetch(`/api/notification-settings/${entityType}/${entityId}/test-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({ testEmail: testEmailAddress })
      });
      const data = await response.json();
      setShowTestEmailModal(false);
      if (response.ok) {
        setResultMessage({ success: true, text: 'Test email sent successfully!' });
      } else {
        setResultMessage({ success: false, text: data.error || 'Failed to send test email' });
      }
      setShowResultModal(true);
    } catch (error) {
      setShowTestEmailModal(false);
      setResultMessage({ success: false, text: 'An error occurred while sending test email' });
      setShowResultModal(true);
    } finally {
      setSendingTestEmail(false);
    }
  };

  if (loading && prefsLoading) {
    return (
      <SettingsContainer>
        <Header><HeaderTitle>{t('notifications:notificationSettingsPage.systemSettings')}</HeaderTitle></Header>
        <Content><SettingsCard>{t('notifications:notificationSettingsPage.loading')}</SettingsCard></Content>
      </SettingsContainer>
    );
  }

  const handleResendVerification = async () => {
    if (!user?.email || resendingVerify) return;
    setResendingVerify(true);
    setVerifyResult('idle');
    try {
      const r = await fetch('/api/auth/resend-verification', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email })
      });
      setVerifyResult(r.ok ? 'sent' : 'error');
    } catch (e) {
      setVerifyResult('error');
    } finally {
      setResendingVerify(false);
    }
  };

  return (
    <>
      <SettingsContainer>
        <Header>
          <HeaderTitle>{t('notifications:notificationSettingsPage.systemSettings')}</HeaderTitle>
        </Header>

        <Content>
          {user && user.emailVerified === false && !user.isDemo && !user.isTest && (
            <div style={{ margin: '0 0 16px', padding: '14px 16px', background: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ fontSize: 14, color: '#92400E', fontWeight: 600 }}>
                {verifyResult === 'sent'
                  ? t('notifications:notificationSettingsPage.verifySent', { defaultValue: 'Verification email sent. Check your inbox.' })
                  : verifyResult === 'error'
                    ? t('notifications:notificationSettingsPage.verifySendFailed', { defaultValue: 'Could not send the verification email. Please try again.' })
                    : t('notifications:notificationSettingsPage.verifyEmailNotice', { defaultValue: 'Your email is not verified — verify it to receive email notifications.' })}
              </div>
              {verifyResult !== 'sent' && (
                <button type="button" onClick={handleResendVerification} disabled={resendingVerify}
                  style={{ padding: '8px 14px', background: '#635BFF', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 13, cursor: resendingVerify ? 'default' : 'pointer', opacity: resendingVerify ? 0.6 : 1 }}>
                  {resendingVerify ? t('notifications:notificationSettingsPage.sending', { defaultValue: 'Sending…' }) : t('notifications:notificationSettingsPage.resendVerification', { defaultValue: 'Resend verification' })}
                </button>
              )}
            </div>
          )}
          <Tabs>
            <Tab active={activeTab === 'preferences'} onClick={() => handleTabChange('preferences')}>
              Notification Preferences
            </Tab>
            <Tab active={activeTab === 'email'} onClick={() => handleTabChange('email')}>
              Email Setup
            </Tab>
            <Tab active={activeTab === 'import'} onClick={() => handleTabChange('import')}>
              Import Data
            </Tab>
          </Tabs>

          {activeTab === 'preferences' && (
            <SettingsCard>
              <SectionTitle>Web Push & PWA</SectionTitle>
              <div style={{ marginBottom: 24 }}>
                <PushPreferencesCard />
              </div>
              {isOrderRole && (
                <>
                  <SectionTitle>{t('notifications:notificationSettingsPage.liveOrderAudio.section', 'Live Order Alert')}</SectionTitle>
                  <PreferenceRow>
                    <PreferenceInfo>
                      <PreferenceLabel>{t('notifications:notificationSettingsPage.liveOrderAudio.label', 'Sound notification')}</PreferenceLabel>
                      <PreferenceDesc>{t('notifications:notificationSettingsPage.liveOrderAudio.description', 'Play a sound when a new order arrives. This is a per-browser setting.')}</PreferenceDesc>
                    </PreferenceInfo>
                    <ToggleSwitch>
                      <ToggleInput type="checkbox" checked={audioEnabled} onChange={handleAudioToggle} />
                      <ToggleSlider checked={audioEnabled} />
                    </ToggleSwitch>
                  </PreferenceRow>
                  <SectionSpacer />
                </>
              )}

              <DescriptionText>
                Choose which notifications you want to receive via email. All notifications are enabled by default.
              </DescriptionText>

              {user?.email && (
                <EmailInfoBox>
                  <EmailInfoContent>
                    Notifications will be sent to <EmailAddress>{user.email}</EmailAddress>
                    <br />
                    To change your email, go to <EmailInfoLink href="/pos/profile">{t('notifications:notificationSettingsPage.profileSettings')}</EmailInfoLink>.
                  </EmailInfoContent>
                </EmailInfoBox>
              )}

              {prefsLoading ? (
                <DescriptionText>{t('notifications:notificationSettingsPage.loadingPreferences')}</DescriptionText>
              ) : categories.length === 0 ? (
                <DescriptionText>{t('notifications:notificationSettingsPage.noNotificationCategoriesAvailableForYourRole')}</DescriptionText>
              ) : (
                <>
                  {Object.entries(groupedCategories).map(([section, cats], idx) => (
                    <React.Fragment key={section}>
                      {idx > 0 && <SectionSpacer />}
                      <SectionTitle>{section}</SectionTitle>
                      {cats.map(cat => (
                        <PreferenceRow key={cat.key}>
                          <PreferenceInfo>
                            <PreferenceLabel>{cat.label}</PreferenceLabel>
                            <PreferenceDesc>{cat.description}</PreferenceDesc>
                          </PreferenceInfo>
                          <AutoSaveField
                            ref={(el) => {
                              if (el) toggleRefs.current.set(cat.key, el);
                              else toggleRefs.current.delete(cat.key);
                            }}
                            onSave={handlePrefsSave}
                            type="toggle"
                          >
                            <ToggleSwitch>
                              <ToggleInput
                                type="checkbox"
                                checked={preferences[cat.key] !== false}
                                onChange={() => togglePreference(cat.key)}
                              />
                              <ToggleSlider checked={preferences[cat.key] !== false} />
                            </ToggleSwitch>
                          </AutoSaveField>
                        </PreferenceRow>
                      ))}
                    </React.Fragment>
                  ))}
                </>
              )}
            </SettingsCard>
          )}

          {activeTab === 'email' && (
            <SettingsCard>
              <DescriptionText>
                By default, notifications are sent from the platform. Set up custom SMTP to send emails from your own domain.
              </DescriptionText>

              <SmtpGuide />

              <CheckboxLabel>
                <AutoSaveField ref={emailEnabledRef} onSave={handleSmtpSave} type="toggle">
                  <Checkbox
                    type="checkbox"
                    checked={smtpSettings.email_enabled}
                    onChange={(e) => {
                      setSmtpSettings({ ...smtpSettings, email_enabled: e.target.checked });
                      emailEnabledRef.current?.triggerSave();
                    }}
                  />
                </AutoSaveField>
                Enable Custom Email (SMTP)
              </CheckboxLabel>

              <FormGrid>
                <FormGroup>
                  <Label>{t('notifications:notificationSettingsPage.smtpServer')}<RequiredMark>*</RequiredMark></Label>
                  <AutoSaveField onSave={handleSmtpSave}>
                    <Input
                      type="text"
                      placeholder="smtp.gmail.com"
                      value={smtpSettings.smtp_host}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, smtp_host: e.target.value })}
                      disabled={!smtpSettings.email_enabled}
                    />
                  </AutoSaveField>
                  <HelpText>Gmail: smtp.gmail.com, Outlook: smtp-mail.outlook.com</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>{t('notifications:notificationSettingsPage.smtpPort')}<RequiredMark>*</RequiredMark></Label>
                  <AutoSaveField onSave={handleSmtpSave}>
                    <Input
                      type="number"
                      placeholder="587"
                      value={smtpSettings.smtp_port}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, smtp_port: parseInt(e.target.value) })}
                      disabled={!smtpSettings.email_enabled}
                    />
                  </AutoSaveField>
                  <HelpText>{t('notifications:notificationSettingsPage.typically587TlsOr465Ssl')}</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>{t('notifications:notificationSettingsPage.smtpUsername')}<RequiredMark>*</RequiredMark></Label>
                  <AutoSaveField onSave={handleSmtpSave}>
                    <Input
                      type="email"
                      placeholder="your-email@gmail.com"
                      value={smtpSettings.smtp_user}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, smtp_user: e.target.value })}
                      disabled={!smtpSettings.email_enabled}
                    />
                  </AutoSaveField>
                  <HelpText>{t('notifications:notificationSettingsPage.yourFullEmailAddress')}</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>{t('notifications:notificationSettingsPage.smtpPassword')}<RequiredMark>*</RequiredMark></Label>
                  <AutoSaveField onSave={handleSmtpSave}>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={smtpSettings.smtp_password}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, smtp_password: e.target.value })}
                      disabled={!smtpSettings.email_enabled}
                    />
                  </AutoSaveField>
                  <HelpText>Gmail: app password, Outlook: account password or app password</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>{t('notifications:notificationSettingsPage.fromEmail')}<RequiredMark>*</RequiredMark></Label>
                  <AutoSaveField onSave={handleSmtpSave}>
                    <Input
                      type="email"
                      placeholder="noreply@yourstore.com"
                      value={smtpSettings.from_email}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, from_email: e.target.value })}
                      disabled={!smtpSettings.email_enabled}
                    />
                  </AutoSaveField>
                  <HelpText>{t('notifications:notificationSettingsPage.emailAddressShownToRecipients')}</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>{t('notifications:notificationSettingsPage.fromName')}<RequiredMark>*</RequiredMark></Label>
                  <AutoSaveField onSave={handleSmtpSave}>
                    <Input
                      type="text"
                      placeholder="Your Store Name"
                      value={smtpSettings.from_name}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, from_name: e.target.value })}
                      disabled={!smtpSettings.email_enabled}
                    />
                  </AutoSaveField>
                  <HelpText>{t('notifications:notificationSettingsPage.displayNameShownToRecipients')}</HelpText>
                </FormGroup>
              </FormGrid>

              <FormGroup>
                <Label>{t('notifications:notificationSettingsPage.replytoEmailOptional')}</Label>
                <AutoSaveField onSave={handleSmtpSave}>
                  <Input
                    type="email"
                    placeholder="support@yourstore.com"
                    value={smtpSettings.reply_to_email}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, reply_to_email: e.target.value })}
                    disabled={!smtpSettings.email_enabled}
                  />
                </AutoSaveField>
                <HelpText>{t('notifications:notificationSettingsPage.whereRepliesShouldBeSent')}</HelpText>
              </FormGroup>

              {smtpSettings.email_enabled && (
                <ButtonContainer>
                  <SecondaryButton onClick={handleTestEmail}>
                    Send Test Email
                  </SecondaryButton>
                </ButtonContainer>
              )}
            </SettingsCard>
          )}

          {activeTab === 'import' && (
            <ImportDataTab restaurantId={user?.restaurantId || urlRestaurantId} />
          )}
        </Content>
      </SettingsContainer>

      {/* Test Email Modal */}
      {showTestEmailModal && (
        <CommonModal isOpen={true} onClose={() => setShowTestEmailModal(false)} title="Send Test Email" footer={<><CancelButton onClick={() => setShowTestEmailModal(false)}>{t('notifications:notificationSettingsPage.cancel')}</CancelButton><SaveButton onClick={sendTestEmail} disabled={sendingTestEmail || !testEmailAddress}>{sendingTestEmail ? 'Sending...' : 'Send'}</SaveButton></>}>
            <ModalText>{t('notifications:notificationSettingsPage.enterTheEmailAddressWhereYouWantToReceiveTheTestEmail')}</ModalText>
            <FormGroup>
              <Label>{t('notifications:notificationSettingsPage.emailAddress')}</Label>
              <Input
                type="email"
                placeholder="test@example.com"
                value={testEmailAddress}
                onChange={(e) => setTestEmailAddress(e.target.value)}
                autoFocus
              />
            </FormGroup>
        </CommonModal>
      )}

      {/* Result Modal */}
      {showResultModal && (
        <CommonModal isOpen={true} onClose={() => setShowResultModal(false)} title={resultMessage.success ? 'Success' : 'Error'} footer={<SaveButton onClick={() => setShowResultModal(false)}>{t('notifications:notificationSettingsPage.ok')}</SaveButton>}>
            <ModalText>{resultMessage.text}</ModalText>
        </CommonModal>
      )}
    </>
  );
};

export default NotificationSettingsPage;
