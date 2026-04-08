import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Tabs from '../UI/Tabs';
import { useTranslation } from 'react-i18next';

const ContentCard = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;

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
  color: #1F2937;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: 500;
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

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;

  ${props => props.variant === 'primary' ? `
    background: #635BFF;
    color: white;

    &:hover:not(:disabled) {
      background: #5A51E6;
    }
  ` : `
    background: white;
    color: #635BFF;
    border: 1px solid #635BFF;

    &:hover:not(:disabled) {
      background: #F0F4FF;
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Alert = styled.div<{ type: 'success' | 'error' }>`
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  font-size: 14px;

  ${props => props.type === 'success' ? `
    background: #D1FAE5;
    color: #065F46;
  ` : `
    background: #FEE2E2;
    color: #991B1B;
  `}
`;

const DisabledMessage = styled.div`
  padding: 20px;
  background: #F9FAFB;
  border-radius: 8px;
  color: #6B7280;
  font-size: 14px;
  text-align: center;
`;

interface NotificationSettingsProps {
  entityType: 'restaurant' | 'manager' | 'admin';
  entityId: number;
}

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

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ entityType, entityId }) => {
  const { t } = useTranslation('common');
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

  useEffect(() => {
    loadSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityType, entityId]);

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
    return <ContentCard>Loading...</ContentCard>;
  }

  const tabs = [
    { key: 'email', label: 'Email', active: activeTab === 'email', onClick: () => setActiveTab('email') },
    { key: 'sms', label: 'SMS', active: activeTab === 'sms', onClick: () => setActiveTab('sms') },
    { key: 'whatsapp', label: 'WhatsApp', active: activeTab === 'whatsapp', onClick: () => setActiveTab('whatsapp') }
  ];

  return (
    <ContentCard>
      {message && (
        <Alert type={message.type}>{message.text}</Alert>
      )}

      <Tabs tabs={tabs} />

      {activeTab === 'email' && (
        <>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={settings.email_enabled}
              onChange={(e) => setSettings({ ...settings, email_enabled: e.target.checked })}
            />
            Enable Email Notifications
          </CheckboxLabel>

          {settings.email_enabled && (
            <>
              <FormGrid>
                <FormGroup>
                  <Label>SMTP Server</Label>
                  <Input
                    type="text"
                    placeholder="smtp.gmail.com"
                    value={settings.smtp_host}
                    onChange={(e) => setSettings({ ...settings, smtp_host: e.target.value })}
                  />
                  <HelpText>Gmail: smtp.gmail.com</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>SMTP Port</Label>
                  <Input
                    type="number"
                    placeholder="587"
                    value={settings.smtp_port}
                    onChange={(e) => setSettings({ ...settings, smtp_port: parseInt(e.target.value) })}
                  />
                  <HelpText>Typically 587 (TLS) or 465 (SSL)</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>SMTP Username (Email)</Label>
                  <Input
                    type="email"
                    placeholder="your-email@gmail.com"
                    value={settings.smtp_user}
                    onChange={(e) => setSettings({ ...settings, smtp_user: e.target.value })}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>SMTP Password / App Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={settings.smtp_password}
                    onChange={(e) => setSettings({ ...settings, smtp_password: e.target.value })}
                  />
                  <HelpText>For Gmail, use an app password</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>From Email</Label>
                  <Input
                    type="email"
                    placeholder="noreply@yourstore.com"
                    value={settings.from_email}
                    onChange={(e) => setSettings({ ...settings, from_email: e.target.value })}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>From Name</Label>
                  <Input
                    type="text"
                    placeholder="Your Store Name"
                    value={settings.from_name}
                    onChange={(e) => setSettings({ ...settings, from_name: e.target.value })}
                  />
                </FormGroup>
              </FormGrid>

              <FormGroup style={{ marginTop: '20px' }}>
                <Label>Reply-To Email (Optional)</Label>
                <Input
                  type="email"
                  placeholder="support@yourstore.com"
                  value={settings.reply_to_email}
                  onChange={(e) => setSettings({ ...settings, reply_to_email: e.target.value })}
                />
              </FormGroup>
            </>
          )}

          <ButtonContainer>
            <Button variant="primary" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Settings'}
            </Button>
            {settings.email_enabled && (
              <Button variant="secondary" onClick={handleTestEmail}>
                Send Test Email
              </Button>
            )}
          </ButtonContainer>
        </>
      )}

      {activeTab === 'sms' && (
        <DisabledMessage>
          SMS notifications are coming soon. Stay tuned for updates!
        </DisabledMessage>
      )}

      {activeTab === 'whatsapp' && (
        <DisabledMessage>
          WhatsApp notifications are coming soon. Stay tuned for updates!
        </DisabledMessage>
      )}
    </ContentCard>
  );
};

export default NotificationSettings;
