import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import PageHeader from '../../components/common/PageHeader';
import { SaveButtonContainer, SaveButtonGroup, SaveButton, StatusMessage } from '../../components/UI';
import ImageUploadDropzone from '../../components/common/ImageUploadDropzone';

interface PaymentMethod {
  enabled: boolean;
  label: string;
  config?: Record<string, string>;
  // Bank Transfer specific
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  // QR Payment specific
  qrImage?: string;
  qrDescription?: string;
}

interface PaymentSettings {
  stripe: PaymentMethod;
  paypal: PaymentMethod;
  bankTransfer: PaymentMethod;
  qrPayment: PaymentMethod;
  _order: string[];
}

const Container = styled.div`
  min-height: 100vh;
`;

const Content = styled.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

const Description = styled.p`
  color: #6B7C93;
  margin-bottom: 24px;
  font-size: 14px;
`;

const PaymentMethodCard = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
`;

const MethodHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MethodLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const OrderControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const OrderButton = styled.button<{ disabled?: boolean }>`
  background: none;
  border: none;
  padding: 2px 6px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  color: ${props => props.disabled ? '#D1D5DB' : '#6B7C93'};
  font-size: 10px;

  &:hover:not(:disabled) {
    color: #0A2540;
  }
`;

const MethodLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #635BFF;
  }

  &:checked + span:before {
    transform: translateX(20px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #E6EBF1;
  transition: 0.3s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }
`;

const MethodContent = styled.div`
  border-top: 1px solid #E6EBF1;
  margin-top: 16px;
  padding-top: 16px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

const HelpText = styled.p`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const defaultPaymentSettings: PaymentSettings = {
  stripe: {
    enabled: false,
    label: 'Stripe',
    config: {
      publishableKey: '',
      secretKey: '',
      webhookSecret: '',
    }
  },
  paypal: {
    enabled: false,
    label: 'PayPal',
    config: {
      clientId: '',
      clientSecret: '',
    }
  },
  bankTransfer: {
    enabled: false,
    label: 'Bank Transfer',
    bankName: '',
    accountNumber: '',
    accountName: '',
  },
  qrPayment: {
    enabled: false,
    label: 'QR Payment',
    qrImage: '',
    qrDescription: '',
  },
  _order: ['stripe', 'paypal', 'bankTransfer', 'qrPayment']
};

const PaymentSettingsPage: React.FC = () => {
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>(defaultPaymentSettings);
  const [paymentOrder, setPaymentOrder] = useState<string[]>(defaultPaymentSettings._order);
  const [autoChargeEnabled, setAutoChargeEnabled] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadPaymentSettings();
  }, []);

  const loadPaymentSettings = async () => {
    try {
      const response = await fetch('/api/admin/payment-settings');
      if (response.ok) {
        const data = await response.json();
        if (data && Object.keys(data).length > 0) {
          setPaymentSettings(data);
          setPaymentOrder(data._order || defaultPaymentSettings._order);
          setAutoChargeEnabled(data.stripe?.config?.autoCharge === 'true');
        }
      }
    } catch (error) {
      console.error('Error loading payment settings:', error);
    }
  };

  const handleToggle = (key: string, enabled: boolean) => {
    setPaymentSettings(prev => ({
      ...prev,
      [key]: {
        ...prev[key as keyof PaymentSettings] as PaymentMethod,
        enabled
      }
    }));
    setHasChanges(true);
  };

  const handleConfigChange = (key: string, field: string, value: string) => {
    setPaymentSettings(prev => ({
      ...prev,
      [key]: {
        ...prev[key as keyof PaymentSettings] as PaymentMethod,
        config: {
          ...(prev[key as keyof PaymentSettings] as PaymentMethod).config,
          [field]: value
        }
      }
    }));
    setHasChanges(true);
  };

  const handleFieldChange = (key: string, field: string, value: string) => {
    setPaymentSettings(prev => ({
      ...prev,
      [key]: {
        ...prev[key as keyof PaymentSettings] as PaymentMethod,
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const movePaymentMethod = (key: string, direction: 'up' | 'down') => {
    const index = paymentOrder.indexOf(key);
    if (direction === 'up' && index > 0) {
      const newOrder = [...paymentOrder];
      [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
      setPaymentOrder(newOrder);
      setHasChanges(true);
    } else if (direction === 'down' && index < paymentOrder.length - 1) {
      const newOrder = [...paymentOrder];
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
      setPaymentOrder(newOrder);
      setHasChanges(true);
    }
  };

  const savePaymentSettings = async () => {
    if (!hasChanges) return;

    setIsSaving(true);
    setSaveStatus(null);

    try {
      const dataToSave = {
        ...paymentSettings,
        _order: paymentOrder,
        stripe: {
          ...paymentSettings.stripe,
          config: {
            ...paymentSettings.stripe.config,
            autoCharge: autoChargeEnabled ? 'true' : 'false'
          }
        }
      };

      const response = await fetch('/api/admin/payment-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSave)
      });

      if (!response.ok) {
        throw new Error('Failed to save payment settings');
      }

      setSaveStatus({ type: 'success', message: 'Payment settings saved successfully!' });
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving payment settings:', error);
      setSaveStatus({ type: 'error', message: 'Failed to save payment settings' });
    } finally {
      setIsSaving(false);
    }
  };

  const renderMethodContent = (key: string, method: PaymentMethod) => {
    if (!method.enabled) return null;

    switch (key) {
      case 'stripe':
        return (
          <MethodContent>
            <FormGroup>
              <Label>Publishable Key</Label>
              <Input
                type="text"
                placeholder="pk_live_..."
                value={method.config?.publishableKey || ''}
                onChange={(e) => handleConfigChange(key, 'publishableKey', e.target.value)}
              />
              <HelpText>Your Stripe publishable key (starts with pk_)</HelpText>
            </FormGroup>
            <FormGroup>
              <Label>Secret Key</Label>
              <Input
                type="password"
                placeholder="sk_live_..."
                value={method.config?.secretKey || ''}
                onChange={(e) => handleConfigChange(key, 'secretKey', e.target.value)}
              />
              <HelpText>Your Stripe secret key (starts with sk_)</HelpText>
            </FormGroup>
            <FormGroup>
              <Label>Webhook Secret</Label>
              <Input
                type="password"
                placeholder="whsec_..."
                value={method.config?.webhookSecret || ''}
                onChange={(e) => handleConfigChange(key, 'webhookSecret', e.target.value)}
              />
              <HelpText>Webhook endpoint secret for verifying events</HelpText>
            </FormGroup>
            <FormGroup>
              <CheckboxLabel>
                <Checkbox
                  type="checkbox"
                  checked={autoChargeEnabled}
                  onChange={(e) => {
                    setAutoChargeEnabled(e.target.checked);
                    setHasChanges(true);
                  }}
                />
                Enable auto-charge for subscriptions
              </CheckboxLabel>
              <HelpText>Automatically charge saved cards for subscription renewals</HelpText>
            </FormGroup>
          </MethodContent>
        );

      case 'paypal':
        return (
          <MethodContent>
            <FormGroup>
              <Label>Client ID</Label>
              <Input
                type="text"
                placeholder="Enter PayPal Client ID"
                value={method.config?.clientId || ''}
                onChange={(e) => handleConfigChange(key, 'clientId', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Client Secret</Label>
              <Input
                type="password"
                placeholder="Enter PayPal Client Secret"
                value={method.config?.clientSecret || ''}
                onChange={(e) => handleConfigChange(key, 'clientSecret', e.target.value)}
              />
            </FormGroup>
          </MethodContent>
        );

      case 'bankTransfer':
        return (
          <MethodContent>
            <FormGroup>
              <Label>Bank Name</Label>
              <Input
                type="text"
                placeholder="e.g., Maybank, CIMB, Public Bank"
                value={method.bankName || ''}
                onChange={(e) => handleFieldChange(key, 'bankName', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Account Number</Label>
              <Input
                type="text"
                placeholder="Enter Bank Account Number"
                value={method.accountNumber || ''}
                onChange={(e) => handleFieldChange(key, 'accountNumber', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Account Name</Label>
              <Input
                type="text"
                placeholder="Enter Account Holder Name"
                value={method.accountName || ''}
                onChange={(e) => handleFieldChange(key, 'accountName', e.target.value)}
              />
            </FormGroup>
            <HelpText>
              Customers will see this information when selecting bank transfer as payment method.
              They will need to upload a receipt after making the transfer.
            </HelpText>
          </MethodContent>
        );

      case 'qrPayment':
        return (
          <MethodContent>
            <ImageUploadDropzone
              value={method.qrImage || ''}
              onChange={(base64) => handleFieldChange(key, 'qrImage', base64)}
              label="QR Code Image"
              helpText="Upload QR code image for customers to scan and make payment (DuitNow, etc.)"
              changeButtonText="Change QR Code"
              removeButtonText="Remove QR Code"
              imageAltText="Payment QR Code"
            />
            <FormGroup style={{ marginTop: '16px' }}>
              <Label>Description</Label>
              <Input
                type="text"
                placeholder="e.g., Scan to pay via DuitNow"
                value={method.qrDescription || ''}
                onChange={(e) => handleFieldChange(key, 'qrDescription', e.target.value)}
              />
              <HelpText>Short description shown below the QR code</HelpText>
            </FormGroup>
          </MethodContent>
        );

      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <Container>
        <PageHeader title="Payment Settings" />
        <Content>
          <Description>
            Configure payment methods for subscription billing and invoice payments.
            Customers will be able to pay using the enabled methods below.
          </Description>

          {paymentOrder.map((key, index) => {
            const method = paymentSettings[key as keyof PaymentSettings] as PaymentMethod;
            if (!method || key === '_order') return null;

            return (
              <PaymentMethodCard key={key}>
                <MethodHeader>
                  <MethodLeft>
                    <OrderControls>
                      <OrderButton
                        disabled={index === 0}
                        onClick={() => movePaymentMethod(key, 'up')}
                      >
                        ▲
                      </OrderButton>
                      <OrderButton
                        disabled={index === paymentOrder.length - 1}
                        onClick={() => movePaymentMethod(key, 'down')}
                      >
                        ▼
                      </OrderButton>
                    </OrderControls>
                    <MethodLabel>{method.label}</MethodLabel>
                  </MethodLeft>
                  <ToggleSwitch>
                    <ToggleInput
                      type="checkbox"
                      checked={method.enabled}
                      onChange={(e) => handleToggle(key, e.target.checked)}
                    />
                    <ToggleSlider />
                  </ToggleSwitch>
                </MethodHeader>
                {renderMethodContent(key, method)}
              </PaymentMethodCard>
            );
          })}

          <SaveButtonContainer show={hasChanges}>
            <SaveButtonGroup>
              {saveStatus && (
                <StatusMessage type={saveStatus.type}>
                  {saveStatus.message}
                </StatusMessage>
              )}
              <SaveButton onClick={savePaymentSettings} disabled={isSaving || !hasChanges}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </SaveButton>
            </SaveButtonGroup>
          </SaveButtonContainer>
        </Content>
      </Container>
    </MainLayout>
  );
};

export default PaymentSettingsPage;
