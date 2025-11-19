import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { TabContainer, Tab } from '../../components/UI';
import { useAuth } from '../../contexts/AuthContext';

const SettingsContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`;

const Header = styled.header`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;

  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`;

const Content = styled.main`
  padding: 24px 32px 32px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 16px 20px 24px;
  }
`;

const SettingsCard = styled.div`
  background: white;
  padding: 32px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 24px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  background: white;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:hover {
    border-color: #C7D2FE;
  }

  &:disabled {
    background: #F6F9FC;
    color: #8898AA;
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
  font-size: 15px;
  color: #0A2540;
  cursor: pointer;
  font-weight: 600;
  padding: 16px 0;
  border-bottom: 1px solid #E6EBF1;
`;

const HelpText = styled.small`
  display: block;
  font-size: 12px;
  color: #6B7C93;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #E6EBF1;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;
  background: #635BFF;
  color: white;
  min-width: 140px;

  &:hover:not(:disabled) {
    background: #5A51E6;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.3);
  }

  &:disabled {
    background: #9CA3AF;
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SecondaryButton = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: white;
  color: #635BFF;
  border: 1px solid #635BFF;
  min-width: 140px;

  &:hover:not(:disabled) {
    background: #F0F4FF;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    width: 100%;
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
    border: 1px solid #10B981;
  ` : `
    background: #FEE2E2;
    color: #991B1B;
    border: 1px solid #EF4444;
  `}
`;

const DisabledMessage = styled.div`
  padding: 40px;
  background: #F9FAFB;
  border-radius: 8px;
  color: #6B7280;
  font-size: 14px;
  text-align: center;
`;

interface Settings {
  email_enabled: boolean;
  smtp_host: string;
  smtp_port: number;
  smtp_secure: boolean;
  smtp_user: string;
  smtp_password: string;
  from_email: string;
  from_name: string;
  reply_to_email: string;
  sms_enabled: boolean;
  whatsapp_enabled: boolean;
}

const NotificationSettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('email');
  const [settings, setSettings] = useState<Settings>({
    email_enabled: false,
    smtp_host: '',
    smtp_port: 587,
    smtp_secure: false,
    smtp_user: '',
    smtp_password: '',
    from_email: '',
    from_name: '',
    reply_to_email: '',
    sms_enabled: false,
    whatsapp_enabled: false
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // 역할에 따라 entityType과 entityId 결정
  const getEntityInfo = (): { entityType: 'restaurant' | 'manager' | 'admin'; entityId: number } => {
    if (!user) {
      return {
        entityType: 'restaurant' as const,
        entityId: 1
      };
    }
    if (user.role === 'Restaurant Admin' || user.role === 'Staff') {
      return {
        entityType: 'restaurant' as const,
        entityId: Number(user.restaurantId) || 1
      };
    } else if (user.role?.includes('Manager') || user.role?.includes('General')) {
      return {
        entityType: 'manager' as const,
        entityId: Number(user.id) || 1
      };
    } else if (user.role === 'System Admin') {
      return {
        entityType: 'admin' as const,
        entityId: Number(user.id) || 1
      };
    }
    return {
      entityType: 'restaurant' as const,
      entityId: Number(user.id) || 1
    };
  };

  const { entityType, entityId } = getEntityInfo();

  useEffect(() => {
    if (user) {
      loadSettings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityType, entityId, user]);

  if (!user) {
    return null;
  }

  const loadSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/notification-settings/${entityType}/${entityId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/notification-settings/${entityType}/${entityId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Settings saved successfully' });
      } else {
        setMessage({ type: 'error', text: 'Failed to save settings' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while saving settings' });
    } finally {
      setSaving(false);
    }
  };

  const handleTestEmail = async () => {
    const testEmail = prompt('Enter email address to send test email:');
    if (!testEmail) return;

    try {
      const response = await fetch(`/api/notification-settings/${entityType}/${entityId}/test-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ testEmail })
      });

      if (response.ok) {
        alert('Test email sent successfully');
      } else {
        alert('Failed to send test email');
      }
    } catch (error) {
      alert('An error occurred while sending test email');
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <SettingsContainer>
          <Header>
            <HeaderTitle>Notification Settings</HeaderTitle>
          </Header>
          <Content>
            <SettingsCard>Loading...</SettingsCard>
          </Content>
        </SettingsContainer>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <SettingsContainer>
        <Header>
          <HeaderTitle>Notification Settings</HeaderTitle>
        </Header>

        <TabContainer>
          <Tab active={activeTab === 'email'} onClick={() => setActiveTab('email')}>
            Email
          </Tab>
          <Tab active={activeTab === 'sms'} onClick={() => setActiveTab('sms')}>
            SMS
          </Tab>
          <Tab active={activeTab === 'whatsapp'} onClick={() => setActiveTab('whatsapp')}>
            WhatsApp
          </Tab>
        </TabContainer>

        <Content>
          {message && (
            <Alert type={message.type}>{message.text}</Alert>
          )}

          {activeTab === 'email' && (
            <SettingsCard>
              <CheckboxLabel>
                <Checkbox
                  type="checkbox"
                  checked={settings.email_enabled}
                  onChange={(e) => setSettings({ ...settings, email_enabled: e.target.checked })}
                />
                Enable Email Notifications
              </CheckboxLabel>

              <FormGrid>
                <FormGroup>
                  <Label>SMTP Server</Label>
                  <Input
                    type="text"
                    placeholder="smtp.gmail.com"
                    value={settings.smtp_host}
                    onChange={(e) => setSettings({ ...settings, smtp_host: e.target.value })}
                    disabled={!settings.email_enabled}
                  />
                  <HelpText>Gmail: smtp.gmail.com, Outlook: smtp-mail.outlook.com</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>SMTP Port</Label>
                  <Input
                    type="number"
                    placeholder="587"
                    value={settings.smtp_port}
                    onChange={(e) => setSettings({ ...settings, smtp_port: parseInt(e.target.value) })}
                    disabled={!settings.email_enabled}
                  />
                  <HelpText>Typically 587 (TLS) or 465 (SSL)</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>SMTP Username</Label>
                  <Input
                    type="email"
                    placeholder="your-email@gmail.com"
                    value={settings.smtp_user}
                    onChange={(e) => setSettings({ ...settings, smtp_user: e.target.value })}
                    disabled={!settings.email_enabled}
                  />
                  <HelpText>Your full email address</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>SMTP Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={settings.smtp_password}
                    onChange={(e) => setSettings({ ...settings, smtp_password: e.target.value })}
                    disabled={!settings.email_enabled}
                  />
                  <HelpText>Gmail: app password, Outlook: account password or app password</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>From Email</Label>
                  <Input
                    type="email"
                    placeholder="noreply@yourstore.com"
                    value={settings.from_email}
                    onChange={(e) => setSettings({ ...settings, from_email: e.target.value })}
                    disabled={!settings.email_enabled}
                  />
                  <HelpText>Email address shown to recipients</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>From Name</Label>
                  <Input
                    type="text"
                    placeholder="Your Store Name"
                    value={settings.from_name}
                    onChange={(e) => setSettings({ ...settings, from_name: e.target.value })}
                    disabled={!settings.email_enabled}
                  />
                  <HelpText>Display name shown to recipients</HelpText>
                </FormGroup>
              </FormGrid>

              <FormGroup style={{ marginTop: '24px', gridColumn: '1 / -1' }}>
                <Label>Reply-To Email (Optional)</Label>
                <Input
                  type="email"
                  placeholder="support@yourstore.com"
                  value={settings.reply_to_email}
                  onChange={(e) => setSettings({ ...settings, reply_to_email: e.target.value })}
                  disabled={!settings.email_enabled}
                />
                <HelpText>Where replies should be sent</HelpText>
              </FormGroup>

              {settings.email_enabled && (
                <>
                  <ButtonContainer>
                    <SaveButton onClick={handleSave} disabled={saving}>
                      {saving ? 'Saving...' : 'Save Settings'}
                    </SaveButton>
                    <SecondaryButton onClick={handleTestEmail}>
                      Send Test Email
                    </SecondaryButton>
                  </ButtonContainer>

                  {message && (
                    <Alert type={message.type}>{message.text}</Alert>
                  )}
                </>
              )}
            </SettingsCard>
          )}

          {activeTab === 'sms' && (
            <SettingsCard>
              <DisabledMessage>
                SMS notifications are coming soon. Stay tuned for updates!
              </DisabledMessage>
            </SettingsCard>
          )}

          {activeTab === 'whatsapp' && (
            <SettingsCard>
              <DisabledMessage>
                WhatsApp notifications are coming soon. Stay tuned for updates!
              </DisabledMessage>
            </SettingsCard>
          )}
        </Content>
      </SettingsContainer>
    </MainLayout>
  );
};

export default NotificationSettingsPage;
