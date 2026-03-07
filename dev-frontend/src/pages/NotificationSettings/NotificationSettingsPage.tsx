import React, { useState, useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { Modal as CommonModal } from '../../components/UI';
import { useParams } from 'react-router-dom';
import { Tabs, Tab } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import { useAuth } from '../../contexts/AuthContext';

const SettingsContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
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
  border: 1px solid #E6EBF1;
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
  color: #6B7C93;
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
  border: 1px solid #E6EBF1;
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
    color: #6B7280;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9CA3AF;
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
  color: #6B7280;
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

const Alert = styled.div<{ type: 'success' | 'error' }>`
  padding: 12px 16px;
  border-radius: 6px;
  margin-top: 16px;
  font-size: 14px;

  ${props => props.type === 'success' ? `
    background: #D1FAE5;
    color: #065F46;
  ` : `
    background: #FEE2E2;
    color: #991B1B;
  `}
`;

const ModalText = styled.p`
  font-size: 14px;
  color: #6B7C93;
  margin: 0 0 16px 0;
`;


const CancelButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  background: #F3F4F6;
  color: #374151;
  border: none;
  transition: all 0.15s;

  &:hover {
    background: #E5E7EB;
  }
`;

/* Notification Preferences Styles */
const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`;

const PreferenceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid #F3F4F6;

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
  color: #6B7C93;
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
  background-color: ${props => props.checked ? '#635BFF' : '#D1D5DB'};
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
  color: #6B7C93;
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

const EmailInfoIcon = styled.span`
  font-size: 18px;
  flex-shrink: 0;
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
  const { user } = useAuth();
  const { restaurantId: urlRestaurantId } = useParams<{ restaurantId: string }>();
  const [activeTab, handleTabChange] = useTabParam<'preferences' | 'email'>('preferences');

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
  const [prefsSaving, setPrefsSaving] = useState(false);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [prefsMessage, setPrefsMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
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
        headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` }
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
        headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` }
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

  const handleSmtpSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setMessage({ type: 'error', text: 'No authentication token found. Please log in again.' });
        setSaving(false);
        return;
      }
      const response = await fetch(`/api/notification-settings/${entityType}/${entityId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(smtpSettings)
      });
      const data = await response.json();
      if (response.ok) {
        setMessage({ type: 'success', text: 'Email settings saved successfully' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save settings' });
      }
    } catch (error) {
      console.error('Save error:', error);
      setMessage({ type: 'error', text: 'An error occurred while saving settings' });
    } finally {
      setSaving(false);
    }
  };

  const handlePrefsSave = async () => {
    setPrefsSaving(true);
    setPrefsMessage(null);
    try {
      const response = await fetch('/api/notification-settings/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ preferences })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setPrefsMessage({ type: 'success', text: 'Notification preferences saved' });
      } else {
        setPrefsMessage({ type: 'error', text: data.message || 'Failed to save preferences' });
      }
    } catch (error) {
      console.error('Prefs save error:', error);
      setPrefsMessage({ type: 'error', text: 'An error occurred while saving preferences' });
    } finally {
      setPrefsSaving(false);
    }
  };

  const togglePreference = (key: string) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
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
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
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
        <Header><HeaderTitle>Notification Settings</HeaderTitle></Header>
        <Content><SettingsCard>Loading...</SettingsCard></Content>
      </SettingsContainer>
    );
  }

  return (
    <>
      <SettingsContainer>
        <Header>
          <HeaderTitle>Notification Settings</HeaderTitle>
        </Header>

        <Content>
          <Tabs>
            <Tab active={activeTab === 'preferences'} onClick={() => handleTabChange('preferences')}>
              Notification Preferences
            </Tab>
            <Tab active={activeTab === 'email'} onClick={() => handleTabChange('email')}>
              Email Setup
            </Tab>
          </Tabs>

          {activeTab === 'preferences' && (
            <SettingsCard>
              <DescriptionText>
                Choose which notifications you want to receive via email. All notifications are enabled by default.
              </DescriptionText>

              {user?.email && (
                <EmailInfoBox>
                  <EmailInfoContent>
                    Notifications will be sent to <EmailAddress>{user.email}</EmailAddress>
                    <br />
                    To change your email, go to <EmailInfoLink href="/pos/profile">Profile Settings</EmailInfoLink>.
                  </EmailInfoContent>
                </EmailInfoBox>
              )}

              {prefsLoading ? (
                <DescriptionText>Loading preferences...</DescriptionText>
              ) : categories.length === 0 ? (
                <DescriptionText>No notification categories available for your role.</DescriptionText>
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
                          <ToggleSwitch>
                            <ToggleInput
                              type="checkbox"
                              checked={preferences[cat.key] !== false}
                              onChange={() => togglePreference(cat.key)}
                            />
                            <ToggleSlider checked={preferences[cat.key] !== false} />
                          </ToggleSwitch>
                        </PreferenceRow>
                      ))}
                    </React.Fragment>
                  ))}

                  <ButtonContainer>
                    <SaveButton onClick={handlePrefsSave} disabled={prefsSaving}>
                      {prefsSaving ? 'Saving...' : 'Save Preferences'}
                    </SaveButton>
                  </ButtonContainer>

                  {prefsMessage && (
                    <Alert type={prefsMessage.type}>{prefsMessage.text}</Alert>
                  )}
                </>
              )}
            </SettingsCard>
          )}

          {activeTab === 'email' && (
            <SettingsCard>
              <DescriptionText>
                By default, notifications are sent from the platform. Set up custom SMTP to send emails from your own domain.
              </DescriptionText>

              <CheckboxLabel>
                <Checkbox
                  type="checkbox"
                  checked={smtpSettings.email_enabled}
                  onChange={(e) => setSmtpSettings({ ...smtpSettings, email_enabled: e.target.checked })}
                />
                Enable Custom Email (SMTP)
              </CheckboxLabel>

              <FormGrid>
                <FormGroup>
                  <Label>SMTP Server<RequiredMark>*</RequiredMark></Label>
                  <Input
                    type="text"
                    placeholder="smtp.gmail.com"
                    value={smtpSettings.smtp_host}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, smtp_host: e.target.value })}
                    disabled={!smtpSettings.email_enabled}
                  />
                  <HelpText>Gmail: smtp.gmail.com, Outlook: smtp-mail.outlook.com</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>SMTP Port<RequiredMark>*</RequiredMark></Label>
                  <Input
                    type="number"
                    placeholder="587"
                    value={smtpSettings.smtp_port}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, smtp_port: parseInt(e.target.value) })}
                    disabled={!smtpSettings.email_enabled}
                  />
                  <HelpText>Typically 587 (TLS) or 465 (SSL)</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>SMTP Username<RequiredMark>*</RequiredMark></Label>
                  <Input
                    type="email"
                    placeholder="your-email@gmail.com"
                    value={smtpSettings.smtp_user}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, smtp_user: e.target.value })}
                    disabled={!smtpSettings.email_enabled}
                  />
                  <HelpText>Your full email address</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>SMTP Password<RequiredMark>*</RequiredMark></Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={smtpSettings.smtp_password}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, smtp_password: e.target.value })}
                    disabled={!smtpSettings.email_enabled}
                  />
                  <HelpText>Gmail: app password, Outlook: account password or app password</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>From Email<RequiredMark>*</RequiredMark></Label>
                  <Input
                    type="email"
                    placeholder="noreply@yourstore.com"
                    value={smtpSettings.from_email}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, from_email: e.target.value })}
                    disabled={!smtpSettings.email_enabled}
                  />
                  <HelpText>Email address shown to recipients</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>From Name<RequiredMark>*</RequiredMark></Label>
                  <Input
                    type="text"
                    placeholder="Your Store Name"
                    value={smtpSettings.from_name}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, from_name: e.target.value })}
                    disabled={!smtpSettings.email_enabled}
                  />
                  <HelpText>Display name shown to recipients</HelpText>
                </FormGroup>
              </FormGrid>

              <FormGroup>
                <Label>Reply-To Email (Optional)</Label>
                <Input
                  type="email"
                  placeholder="support@yourstore.com"
                  value={smtpSettings.reply_to_email}
                  onChange={(e) => setSmtpSettings({ ...smtpSettings, reply_to_email: e.target.value })}
                  disabled={!smtpSettings.email_enabled}
                />
                <HelpText>Where replies should be sent</HelpText>
              </FormGroup>

              <ButtonContainer>
                <SaveButton onClick={handleSmtpSave} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Settings'}
                </SaveButton>
                {smtpSettings.email_enabled && (
                  <SecondaryButton onClick={handleTestEmail}>
                    Send Test Email
                  </SecondaryButton>
                )}
              </ButtonContainer>

              {message && (
                <Alert type={message.type}>{message.text}</Alert>
              )}
            </SettingsCard>
          )}
        </Content>
      </SettingsContainer>

      {/* Test Email Modal */}
      {showTestEmailModal && (
        <CommonModal isOpen={true} onClose={() => setShowTestEmailModal(false)} title="Send Test Email" footer={<><CancelButton onClick={() => setShowTestEmailModal(false)}>Cancel</CancelButton><SaveButton onClick={sendTestEmail} disabled={sendingTestEmail || !testEmailAddress}>{sendingTestEmail ? 'Sending...' : 'Send'}</SaveButton></>}>
            <ModalText>Enter the email address where you want to receive the test email.</ModalText>
            <FormGroup>
              <Label>Email Address</Label>
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
        <CommonModal isOpen={true} onClose={() => setShowResultModal(false)} title={resultMessage.success ? 'Success' : 'Error'} footer={<SaveButton onClick={() => setShowResultModal(false)}>OK</SaveButton>}>
            <ModalText>{resultMessage.text}</ModalText>
        </CommonModal>
      )}
    </>
  );
};

export default NotificationSettingsPage;
