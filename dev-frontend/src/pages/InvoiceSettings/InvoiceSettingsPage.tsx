import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import AutoSaveField from '../../components/Common/AutoSaveField';

interface InvoiceSettings {
  id: string;
  level: 'admin' | 'manager';
  
  // Platform fee settings (Admin -> Manager)
  platformFeeEnabled?: boolean;
  platformMonthlyFee?: number;
  platformAnnualFee?: number;
  
  // Rental and management fee settings (Manager -> Restaurant)
  rentalEnabled?: boolean;
  rentType?: 'fixed' | 'revenue' | 'hybrid';
  fixedRentAmount?: number;
  revenuePercentage?: number;
  hybridFixedAmount?: number;
  hybridPercentage?: number;
  
  // Management fees
  managementFees?: {
    id: string;
    name: string;
    amount: number;
    enabled: boolean;
  }[];
  
  // Invoice settings
  invoicePrefix?: string;
  invoiceStartNumber?: number;
  paymentTerms?: number; // Days
  lateFeePercentage?: number;
  autoGenerateMonthly?: boolean;
  autoSendEmail?: boolean;
  emailReminders?: boolean;
  reminderDays?: number[]; // e.g., [7, 3, 1] for 7, 3, and 1 day before due
  
  updatedAt: string;
  updatedBy: string;
}

const Container = styled.div`
  background: #F9FAFB;
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

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const SaveButton = styled.button<{ hasChanges: boolean }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  background: ${props => props.hasChanges ? '#635BFF' : '#C7CED6'};
  color: ${props => props.hasChanges ? 'white' : '#8898AA'};
  
  &:hover {
    background: ${props => props.hasChanges ? '#5A51E6' : '#C7CED6'};
    transform: ${props => props.hasChanges ? 'translateY(-2px)' : 'none'};
    box-shadow: ${props => props.hasChanges ? '0 4px 12px rgba(99, 91, 255, 0.3)' : 'none'};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const Content = styled.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

const Section = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #C7CED6;
  padding: 32px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid #F1F4F8;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div<{ fullWidth?: boolean }>`
  grid-column: ${props => props.fullWidth ? 'span 2' : 'span 1'};
  
  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
  margin-bottom: 8px;
  
  span {
    color: #DC2626;
    margin-left: 2px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
  
  &:disabled {
    background: #F1F4F8;
    cursor: not-allowed;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #1F2937;
  cursor: pointer;
  margin-bottom: 16px;
  
  input {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #1F2937;
  cursor: pointer;
  padding: 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  transition: all 0.2s;
  
  &:hover {
    background: #F1F4F8;
  }
  
  input {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  
  &.selected {
    background: #F0F0FF;
    border-color: #635BFF;
  }
`;

const InfoBox = styled.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  
  p {
    margin: 0;
    font-size: 14px;
    color: #075985;
    line-height: 1.5;
  }
`;

const FeeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  margin-bottom: 12px;
  
  &:hover {
    background: #F1F4F8;
  }
`;

const FeeCheckbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const FeeName = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const FeeAmount = styled.input`
  width: 150px;
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const DeleteButton = styled.button`
  padding: 6px;
  background: transparent;
  border: none;
  color: #DC2626;
  cursor: pointer;
  
  &:hover {
    background: #FEE2E2;
    border-radius: 4px;
  }
`;

const AddButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #635BFF;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #F0F0FF;
    border-color: #635BFF;
  }
`;

const CalculationExample = styled.div`
  background: #F1F4F8;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
  
  h4 {
    font-size: 14px;
    font-weight: 600;
    color: #0A2540;
    margin: 0 0 12px 0;
  }
  
  p {
    font-size: 13px;
    color: #4B5563;
    margin: 4px 0;
  }
  
  .total {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid #C7CED6;
    font-weight: 600;
    color: #0A2540;
  }
`;

const InvoiceSettingsPage: React.FC = () => {
  const { t } = useTranslation('invoices');
  const { user } = useAuth();
  const [settings, setSettings] = useState<InvoiceSettings>({
    id: 'settings-001',
    level: user?.role as 'admin' | 'manager' || 'manager',
    
    platformFeeEnabled: true,
    platformMonthlyFee: 199,
    platformAnnualFee: 1990,
    
    rentalEnabled: true,
    rentType: 'hybrid',
    fixedRentAmount: 5000,
    revenuePercentage: 8,
    hybridFixedAmount: 3000,
    hybridPercentage: 5,
    
    managementFees: [
      { id: 'fee-1', name: 'Basic Management Fee', amount: 500, enabled: true },
      { id: 'fee-2', name: 'Utilities (Electricity/Water)', amount: 300, enabled: true },
      { id: 'fee-3', name: 'Cleaning Service', amount: 200, enabled: true },
      { id: 'fee-4', name: 'Marketing Fee', amount: 100, enabled: false },
    ],
    
    invoicePrefix: 'INV',
    invoiceStartNumber: 1001,
    paymentTerms: 30,
    lateFeePercentage: 2,
    autoGenerateMonthly: true,
    autoSendEmail: true,
    emailReminders: true,
    reminderDays: [7, 3, 1],
    
    updatedAt: '2025-01-20 14:30:00',
    updatedBy: 'System Admin'
  });

  const [exampleRevenue, setExampleRevenue] = useState(50000);
  const settingsRef = useRef(settings);

  useEffect(() => { settingsRef.current = settings; }, [settings]);

  const handleSaveSettings = useCallback(async () => {
    // TODO: API call to save invoice settings
    console.log('Auto-saving invoice settings:', settingsRef.current);
  }, []);

  const handleInputChange = (field: keyof InvoiceSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFeeChange = (id: string, field: 'name' | 'amount' | 'enabled', value: any) => {
    setSettings(prev => ({
      ...prev,
      managementFees: prev.managementFees?.map(fee =>
        fee.id === id ? { ...fee, [field]: value } : fee
      )
    }));
  };

  const addManagementFee = () => {
    const newFee = {
      id: `fee-${Date.now()}`,
      name: '',
      amount: 0,
      enabled: true
    };

    setSettings(prev => ({
      ...prev,
      managementFees: [...(prev.managementFees || []), newFee]
    }));
  };

  const deleteManagementFee = (id: string) => {
    setSettings(prev => ({
      ...prev,
      managementFees: prev.managementFees?.filter(fee => fee.id !== id)
    }));
  };

  const calculateRental = () => {
    switch (settings.rentType) {
      case 'fixed':
        return settings.fixedRentAmount || 0;
      case 'revenue':
        return (exampleRevenue * (settings.revenuePercentage || 0)) / 100;
      case 'hybrid':
        return (settings.hybridFixedAmount || 0) + (exampleRevenue * (settings.hybridPercentage || 0)) / 100;
      default:
        return 0;
    }
  };

  const calculateTotalFees = () => {
    const rental = settings.rentalEnabled ? calculateRental() : 0;
    const management = settings.managementFees
      ?.filter(fee => fee.enabled)
      .reduce((sum, fee) => sum + fee.amount, 0) || 0;
    return rental + management;
  };

  const renderAdminSettings = () => (
    <Section>
      <SectionTitle>Platform Fee Settings (Admin → Manager)</SectionTitle>
      <AutoSaveField onSave={handleSaveSettings} type="toggle">
        <CheckboxLabel>
          <input
            type="checkbox"
            checked={settings.platformFeeEnabled}
            onChange={(e) => handleInputChange('platformFeeEnabled', e.target.checked)}
          />
          Enable platform fee billing
        </CheckboxLabel>
      </AutoSaveField>
      
      {settings.platformFeeEnabled && (
        <FormGrid>
          <FormGroup>
            <Label>{t('invoices:invoiceSettingsPage.monthlyFeeRm')}</Label>
            <AutoSaveField onSave={handleSaveSettings}>
              <Input
                type="number"
                value={settings.platformMonthlyFee}
                onChange={(e) => handleInputChange('platformMonthlyFee', parseFloat(e.target.value))}
                placeholder="0.00"
              />
            </AutoSaveField>
          </FormGroup>

          <FormGroup>
            <Label>{t('invoices:invoiceSettingsPage.annualFeeRm')}</Label>
            <AutoSaveField onSave={handleSaveSettings}>
              <Input
                type="number"
                value={settings.platformAnnualFee}
                onChange={(e) => handleInputChange('platformAnnualFee', parseFloat(e.target.value))}
                placeholder="0.00"
              />
            </AutoSaveField>
          </FormGroup>
        </FormGrid>
      )}
    </Section>
  );

  const renderManagerSettings = () => (
    <>
      <Section>
        <SectionTitle>Rental Fee Settings (Manager → Restaurant)</SectionTitle>
        <AutoSaveField onSave={handleSaveSettings} type="toggle">
          <CheckboxLabel>
            <input
              type="checkbox"
              checked={settings.rentalEnabled}
              onChange={(e) => handleInputChange('rentalEnabled', e.target.checked)}
            />
            Enable rental fee billing
          </CheckboxLabel>
        </AutoSaveField>
        
        {settings.rentalEnabled && (
          <>
            <InfoBox>
              <p>
                Choose how rental fees are calculated. This will be automatically applied to monthly invoices.
              </p>
            </InfoBox>
            
            <RadioGroup>
              <RadioLabel className={settings.rentType === 'fixed' ? 'selected' : ''}>
                <input
                  type="radio"
                  name="rentType"
                  value="fixed"
                  checked={settings.rentType === 'fixed'}
                  onChange={(e) => handleInputChange('rentType', e.target.value)}
                />
                <div style={{ flex: 1 }}>
                  <strong>{t('invoices:invoiceSettingsPage.fixedRental')}</strong>
                  <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '4px' }}>
                    Charge a fixed amount every month regardless of revenue
                  </div>
                </div>
              </RadioLabel>
              
              <RadioLabel className={settings.rentType === 'revenue' ? 'selected' : ''}>
                <input
                  type="radio"
                  name="rentType"
                  value="revenue"
                  checked={settings.rentType === 'revenue'}
                  onChange={(e) => handleInputChange('rentType', e.target.value)}
                />
                <div style={{ flex: 1 }}>
                  <strong>{t('invoices:invoiceSettingsPage.revenueShare')}</strong>
                  <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '4px' }}>
                    Charge a percentage of monthly revenue
                  </div>
                </div>
              </RadioLabel>
              
              <RadioLabel className={settings.rentType === 'hybrid' ? 'selected' : ''}>
                <input
                  type="radio"
                  name="rentType"
                  value="hybrid"
                  checked={settings.rentType === 'hybrid'}
                  onChange={(e) => handleInputChange('rentType', e.target.value)}
                />
                <div style={{ flex: 1 }}>
                  <strong>Hybrid (Fixed + Revenue Share)</strong>
                  <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '4px' }}>
                    Charge a base amount plus a percentage of revenue
                  </div>
                </div>
              </RadioLabel>
            </RadioGroup>
            
            <FormGrid style={{ marginTop: '24px' }}>
              {(settings.rentType === 'fixed' || settings.rentType === 'hybrid') && (
                <FormGroup>
                  <Label>{t('invoices:invoiceSettingsPage.fixedAmountRm')}</Label>
                  <AutoSaveField onSave={handleSaveSettings}>
                    <Input
                      type="number"
                      value={settings.rentType === 'fixed' ? settings.fixedRentAmount : settings.hybridFixedAmount}
                      onChange={(e) => handleInputChange(
                        settings.rentType === 'fixed' ? 'fixedRentAmount' : 'hybridFixedAmount',
                        parseFloat(e.target.value)
                      )}
                      placeholder="0.00"
                    />
                  </AutoSaveField>
                </FormGroup>
              )}

              {(settings.rentType === 'revenue' || settings.rentType === 'hybrid') && (
                <FormGroup>
                  <Label>Revenue Percentage (%)</Label>
                  <AutoSaveField onSave={handleSaveSettings}>
                    <Input
                      type="number"
                      step="0.1"
                      value={settings.rentType === 'revenue' ? settings.revenuePercentage : settings.hybridPercentage}
                      onChange={(e) => handleInputChange(
                        settings.rentType === 'revenue' ? 'revenuePercentage' : 'hybridPercentage',
                        parseFloat(e.target.value)
                      )}
                      placeholder="0.0"
                    />
                  </AutoSaveField>
                </FormGroup>
              )}
            </FormGrid>
            
            <CalculationExample>
              <h4>{t('invoices:invoiceSettingsPage.calculationExample')}</h4>
              <FormGroup>
                <Label>{t('invoices:invoiceSettingsPage.exampleMonthlyRevenueRm')}</Label>
                <Input
                  type="number"
                  value={exampleRevenue}
                  onChange={(e) => setExampleRevenue(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                />
              </FormGroup>
              <p>Rental Fee: RM {calculateRental().toFixed(2)}</p>
            </CalculationExample>
          </>
        )}
      </Section>

      <Section>
        <SectionTitle>{t('invoices:invoiceSettingsPage.managementFees')}</SectionTitle>
        <InfoBox>
          <p>
            Add management fees that will be charged to restaurants. These can be enabled/disabled per restaurant.
          </p>
        </InfoBox>
        
        {settings.managementFees?.map(fee => (
          <FeeItem key={fee.id}>
            <FeeCheckbox
              type="checkbox"
              checked={fee.enabled}
              onChange={(e) => handleFeeChange(fee.id, 'enabled', e.target.checked)}
            />
            <FeeName
              type="text"
              value={fee.name}
              onChange={(e) => handleFeeChange(fee.id, 'name', e.target.value)}
              placeholder="Fee name"
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '14px', color: '#4B5563' }}>{t('invoices:invoiceSettingsPage.rm')}</span>
              <FeeAmount
                type="number"
                value={fee.amount}
                onChange={(e) => handleFeeChange(fee.id, 'amount', parseFloat(e.target.value))}
                placeholder="0.00"
              />
            </div>
            <DeleteButton onClick={() => deleteManagementFee(fee.id)}>
              ✕
            </DeleteButton>
          </FeeItem>
        ))}
        
        <AddButton onClick={addManagementFee}>
          Add Management Fee
        </AddButton>
        
        <CalculationExample>
          <h4>{t('invoices:invoiceSettingsPage.monthlyInvoiceTotal')}</h4>
          <p>Rental Fee: RM {(settings.rentalEnabled ? calculateRental() : 0).toFixed(2)}</p>
          {settings.managementFees?.filter(fee => fee.enabled).map(fee => (
            <p key={fee.id}>{fee.name}: RM {fee.amount.toFixed(2)}</p>
          ))}
          <p className="total">Total: RM {calculateTotalFees().toFixed(2)}</p>
        </CalculationExample>
      </Section>
    </>
  );

  return (
    <>
      <Container>
        <Header>
          <Title>{t('invoices:invoiceSettingsPage.invoiceSettings')}</Title>
        </Header>

        <Content>
          {user?.role === 'System Admin' && renderAdminSettings()}
          {['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager'].includes(user?.role || '') && renderManagerSettings()}

          <Section>
            <SectionTitle>{t('invoices:invoiceSettingsPage.invoiceConfiguration')}</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>{t('invoices:invoiceSettingsPage.invoicePrefix')}</Label>
                <AutoSaveField onSave={handleSaveSettings}>
                  <Input
                    type="text"
                    value={settings.invoicePrefix}
                    onChange={(e) => handleInputChange('invoicePrefix', e.target.value)}
                    placeholder="INV"
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('invoices:invoiceSettingsPage.startingNumber')}</Label>
                <AutoSaveField onSave={handleSaveSettings}>
                  <Input
                    type="number"
                    value={settings.invoiceStartNumber}
                    onChange={(e) => handleInputChange('invoiceStartNumber', parseInt(e.target.value))}
                    placeholder="1001"
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>{t('invoices:invoiceSettingsPage.paymentTermsDays')}</Label>
                <AutoSaveField onSave={handleSaveSettings}>
                  <Input
                    type="number"
                    value={settings.paymentTerms}
                    onChange={(e) => handleInputChange('paymentTerms', parseInt(e.target.value))}
                    placeholder="30"
                  />
                </AutoSaveField>
              </FormGroup>

              <FormGroup>
                <Label>Late Fee (%)</Label>
                <AutoSaveField onSave={handleSaveSettings}>
                  <Input
                    type="number"
                    step="0.1"
                    value={settings.lateFeePercentage}
                    onChange={(e) => handleInputChange('lateFeePercentage', parseFloat(e.target.value))}
                    placeholder="2.0"
                  />
                </AutoSaveField>
                {settings.lateFeePercentage > 0 && (
                  <div style={{ fontSize: 12, color: '#4B5563', marginTop: 4, lineHeight: 1.5 }}>
                    Example: a {settings.invoicePrefix || 'INV'} of <strong>RM 1,000</strong> overdue → adds <strong>RM {(1000 * settings.lateFeePercentage / 100).toFixed(2)}</strong> per overdue cycle.
                  </div>
                )}
              </FormGroup>
            </FormGrid>
          </Section>

          <Section>
            <SectionTitle>{t('invoices:invoiceSettingsPage.automationSettings')}</SectionTitle>
            <AutoSaveField onSave={handleSaveSettings} type="toggle">
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={settings.autoGenerateMonthly}
                  onChange={(e) => handleInputChange('autoGenerateMonthly', e.target.checked)}
                />
                Automatically generate monthly invoices
              </CheckboxLabel>
            </AutoSaveField>

            <AutoSaveField onSave={handleSaveSettings} type="toggle">
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={settings.autoSendEmail}
                  onChange={(e) => handleInputChange('autoSendEmail', e.target.checked)}
                />
                Automatically send invoices via email
              </CheckboxLabel>
            </AutoSaveField>

            <AutoSaveField onSave={handleSaveSettings} type="toggle">
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={settings.emailReminders}
                  onChange={(e) => handleInputChange('emailReminders', e.target.checked)}
                />
                Send payment reminders
              </CheckboxLabel>
            </AutoSaveField>
            
            {settings.emailReminders && (
              <InfoBox style={{ marginTop: '16px' }}>
                <p>
                  Reminders will be sent 7, 3, and 1 day(s) before the due date.
                </p>
              </InfoBox>
            )}
          </Section>
        </Content>
      </Container>
    </>
  );
};

export default InvoiceSettingsPage;