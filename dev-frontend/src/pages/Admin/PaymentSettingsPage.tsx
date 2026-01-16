import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import PageHeader from '../../components/common/PageHeader';
import { SaveButtonContainer, SaveButtonGroup, SaveButton, StatusMessage } from '../../components/UI';
import ImageUploadDropzone from '../../components/common/ImageUploadDropzone';

interface CurrencyConfig {
  [code: string]: {
    symbol: string;
    name: string;
    decimals: number;
  };
}

interface PaymentMethodConfig {
  enabled: boolean;
  // Stripe specific
  publishableKey?: string;
  secretKey?: string;
  webhookSecret?: string;
  autoCharge?: boolean;
  // PayPal specific
  clientId?: string;
  clientSecret?: string;
  // Bank Transfer specific
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  // QR Payment specific
  qrImage?: string;
  qrDescription?: string;
}

interface CurrencyPaymentSettings {
  stripe?: PaymentMethodConfig;
  paypal?: PaymentMethodConfig;
  bankTransfer?: PaymentMethodConfig;
  qrPayment?: PaymentMethodConfig;
}

interface PaymentSettings {
  [currencyCode: string]: CurrencyPaymentSettings;
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

const CurrencyTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  padding-bottom: 0;
  overflow-x: auto;
`;

const CurrencyTab = styled.button<{ active: boolean }>`
  padding: 12px 20px;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.active ? '#635BFF' : '#6B7C93'};
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? '#635BFF' : 'transparent'};
  margin-bottom: -1px;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    color: #635BFF;
  }
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

const MethodLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`;

const MethodDescription = styled.span`
  font-size: 13px;
  color: #6B7C93;
  margin-left: 8px;
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

const NoCurrencyMessage = styled.div`
  background: #FEF3C7;
  border: 1px solid #F59E0B;
  border-radius: 8px;
  padding: 16px;
  color: #92400E;
  margin-bottom: 24px;
`;

const PaymentSettingsPage: React.FC = () => {
  const [currencyConfig, setCurrencyConfig] = useState<CurrencyConfig>({});
  const [supportedCurrencies, setSupportedCurrencies] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      // Load currency config and supported currencies
      const [configRes, supportedRes, settingsRes] = await Promise.all([
        fetch('/api/currencies/config'),
        fetch('/api/currencies/supported'),
        fetch('/api/admin/payment-settings')
      ]);

      if (configRes.ok) {
        const configData = await configRes.json();
        if (configData.success && configData.currencies) {
          setCurrencyConfig(configData.currencies);
        }
      }

      if (supportedRes.ok) {
        const supportedData = await supportedRes.json();
        if (supportedData.success && supportedData.data) {
          const currencies = supportedData.data.map((c: { code: string }) => c.code);
          setSupportedCurrencies(currencies);
          if (currencies.length > 0) {
            setSelectedCurrency(currencies[0]);
          }
        }
      }

      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        if (settingsData && Object.keys(settingsData).length > 0) {
          setPaymentSettings(settingsData);
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMethodConfig = (method: string): PaymentMethodConfig => {
    return paymentSettings[selectedCurrency]?.[method as keyof CurrencyPaymentSettings] || { enabled: false };
  };

  const updateMethodConfig = (method: string, updates: Partial<PaymentMethodConfig>) => {
    setPaymentSettings(prev => ({
      ...prev,
      [selectedCurrency]: {
        ...prev[selectedCurrency],
        [method]: {
          ...getMethodConfig(method),
          ...updates
        }
      }
    }));
    setHasChanges(true);
  };

  const handleToggle = (method: string, enabled: boolean) => {
    updateMethodConfig(method, { enabled });
  };

  const handleFieldChange = (method: string, field: string, value: string | boolean) => {
    updateMethodConfig(method, { [field]: value });
  };

  const savePaymentSettings = async () => {
    if (!hasChanges) return;

    setIsSaving(true);
    setSaveStatus(null);

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/admin/payment-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(paymentSettings)
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

  const renderStripeConfig = () => {
    const config = getMethodConfig('stripe');
    if (!config.enabled) return null;

    return (
      <MethodContent>
        <FormGroup>
          <Label>Publishable Key</Label>
          <Input
            type="text"
            placeholder="pk_live_..."
            value={config.publishableKey || ''}
            onChange={(e) => handleFieldChange('stripe', 'publishableKey', e.target.value)}
          />
          <HelpText>Your Stripe publishable key (starts with pk_)</HelpText>
        </FormGroup>
        <FormGroup>
          <Label>Secret Key</Label>
          <Input
            type="password"
            placeholder="sk_live_..."
            value={config.secretKey || ''}
            onChange={(e) => handleFieldChange('stripe', 'secretKey', e.target.value)}
          />
          <HelpText>Your Stripe secret key (starts with sk_)</HelpText>
        </FormGroup>
        <FormGroup>
          <Label>Webhook Secret</Label>
          <Input
            type="password"
            placeholder="whsec_..."
            value={config.webhookSecret || ''}
            onChange={(e) => handleFieldChange('stripe', 'webhookSecret', e.target.value)}
          />
          <HelpText>Webhook endpoint secret for verifying events</HelpText>
        </FormGroup>
        <FormGroup>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={config.autoCharge || false}
              onChange={(e) => handleFieldChange('stripe', 'autoCharge', e.target.checked)}
            />
            Enable auto-charge for subscriptions
          </CheckboxLabel>
          <HelpText>Automatically charge saved cards for subscription renewals</HelpText>
        </FormGroup>
      </MethodContent>
    );
  };

  const renderPayPalConfig = () => {
    const config = getMethodConfig('paypal');
    if (!config.enabled) return null;

    return (
      <MethodContent>
        <FormGroup>
          <Label>Client ID</Label>
          <Input
            type="text"
            placeholder="Enter PayPal Client ID"
            value={config.clientId || ''}
            onChange={(e) => handleFieldChange('paypal', 'clientId', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Client Secret</Label>
          <Input
            type="password"
            placeholder="Enter PayPal Client Secret"
            value={config.clientSecret || ''}
            onChange={(e) => handleFieldChange('paypal', 'clientSecret', e.target.value)}
          />
        </FormGroup>
      </MethodContent>
    );
  };

  const renderBankTransferConfig = () => {
    const config = getMethodConfig('bankTransfer');
    if (!config.enabled) return null;

    return (
      <MethodContent>
        <FormGroup>
          <Label>Bank Name</Label>
          <Input
            type="text"
            placeholder="e.g., Maybank, CIMB, Shinhan Bank"
            value={config.bankName || ''}
            onChange={(e) => handleFieldChange('bankTransfer', 'bankName', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Account Number</Label>
          <Input
            type="text"
            placeholder="Enter Bank Account Number"
            value={config.accountNumber || ''}
            onChange={(e) => handleFieldChange('bankTransfer', 'accountNumber', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Account Name</Label>
          <Input
            type="text"
            placeholder="Enter Account Holder Name"
            value={config.accountName || ''}
            onChange={(e) => handleFieldChange('bankTransfer', 'accountName', e.target.value)}
          />
        </FormGroup>
        <HelpText>
          Customers paying in {selectedCurrency} will see this bank information when selecting bank transfer.
          They will need to upload a receipt after making the transfer.
        </HelpText>
      </MethodContent>
    );
  };

  const renderQRPaymentConfig = () => {
    const config = getMethodConfig('qrPayment');
    if (!config.enabled) return null;

    return (
      <MethodContent>
        <ImageUploadDropzone
          value={config.qrImage || ''}
          onChange={(base64) => handleFieldChange('qrPayment', 'qrImage', base64)}
          label="QR Code Image"
          helpText={`Upload QR code image for ${selectedCurrency} payments (DuitNow, KakaoPay, etc.)`}
          changeButtonText="Change QR Code"
          removeButtonText="Remove QR Code"
          imageAltText="Payment QR Code"
        />
        <FormGroup style={{ marginTop: '16px' }}>
          <Label>Description</Label>
          <Input
            type="text"
            placeholder="e.g., Scan to pay via DuitNow"
            value={config.qrDescription || ''}
            onChange={(e) => handleFieldChange('qrPayment', 'qrDescription', e.target.value)}
          />
          <HelpText>Short description shown below the QR code</HelpText>
        </FormGroup>
      </MethodContent>
    );
  };

  if (loading) {
    return (
      <MainLayout>
        <Container>
          <PageHeader title="Payment Settings" />
          <Content>
            <p>Loading...</p>
          </Content>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container>
        <PageHeader title="Payment Settings" />
        <Content>
          <Description>
            Configure payment methods for each currency. Different currencies can have different payment gateways
            (e.g., Stripe for MYR, PayPal for KRW).
          </Description>

          {supportedCurrencies.length === 0 ? (
            <NoCurrencyMessage>
              No currencies configured. Please go to Site Settings and add supported currencies first.
            </NoCurrencyMessage>
          ) : (
            <>
              <CurrencyTabs>
                {supportedCurrencies.map(code => (
                  <CurrencyTab
                    key={code}
                    active={selectedCurrency === code}
                    onClick={() => setSelectedCurrency(code)}
                  >
                    {currencyConfig[code]?.symbol} {code}
                  </CurrencyTab>
                ))}
              </CurrencyTabs>

              {/* Stripe */}
              <PaymentMethodCard>
                <MethodHeader>
                  <MethodLeft>
                    <MethodLabel>Stripe</MethodLabel>
                    <MethodDescription>Credit/Debit Card payments</MethodDescription>
                  </MethodLeft>
                  <ToggleSwitch>
                    <ToggleInput
                      type="checkbox"
                      checked={getMethodConfig('stripe').enabled}
                      onChange={(e) => handleToggle('stripe', e.target.checked)}
                    />
                    <ToggleSlider />
                  </ToggleSwitch>
                </MethodHeader>
                {renderStripeConfig()}
              </PaymentMethodCard>

              {/* PayPal */}
              <PaymentMethodCard>
                <MethodHeader>
                  <MethodLeft>
                    <MethodLabel>PayPal</MethodLabel>
                    <MethodDescription>PayPal account or card</MethodDescription>
                  </MethodLeft>
                  <ToggleSwitch>
                    <ToggleInput
                      type="checkbox"
                      checked={getMethodConfig('paypal').enabled}
                      onChange={(e) => handleToggle('paypal', e.target.checked)}
                    />
                    <ToggleSlider />
                  </ToggleSwitch>
                </MethodHeader>
                {renderPayPalConfig()}
              </PaymentMethodCard>

              {/* Bank Transfer */}
              <PaymentMethodCard>
                <MethodHeader>
                  <MethodLeft>
                    <MethodLabel>Bank Transfer</MethodLabel>
                    <MethodDescription>Manual transfer with receipt upload</MethodDescription>
                  </MethodLeft>
                  <ToggleSwitch>
                    <ToggleInput
                      type="checkbox"
                      checked={getMethodConfig('bankTransfer').enabled}
                      onChange={(e) => handleToggle('bankTransfer', e.target.checked)}
                    />
                    <ToggleSlider />
                  </ToggleSwitch>
                </MethodHeader>
                {renderBankTransferConfig()}
              </PaymentMethodCard>

              {/* QR Payment */}
              <PaymentMethodCard>
                <MethodHeader>
                  <MethodLeft>
                    <MethodLabel>QR Payment</MethodLabel>
                    <MethodDescription>Scan QR code to pay (DuitNow, KakaoPay, etc.)</MethodDescription>
                  </MethodLeft>
                  <ToggleSwitch>
                    <ToggleInput
                      type="checkbox"
                      checked={getMethodConfig('qrPayment').enabled}
                      onChange={(e) => handleToggle('qrPayment', e.target.checked)}
                    />
                    <ToggleSlider />
                  </ToggleSwitch>
                </MethodHeader>
                {renderQRPaymentConfig()}
              </PaymentMethodCard>
            </>
          )}

          <SaveButtonContainer>
            <SaveButtonGroup>
              {saveStatus && (
                <StatusMessage type={saveStatus.type}>
                  {saveStatus.message}
                </StatusMessage>
              )}
              <SaveButton onClick={savePaymentSettings} disabled={isSaving || !hasChanges}>
                {isSaving ? 'Saving...' : hasChanges ? 'Save Changes' : 'Saved'}
              </SaveButton>
            </SaveButtonGroup>
          </SaveButtonContainer>
        </Content>
      </Container>
    </MainLayout>
  );
};

export default PaymentSettingsPage;
