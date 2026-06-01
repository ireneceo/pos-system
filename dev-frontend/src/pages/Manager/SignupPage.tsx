import React, { useState, useEffect } from 'react';
import ConfirmModal from '../../components/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';
import PhoneInput from '../../components/Common/PhoneInput';
import { useTranslation } from 'react-i18next';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  phone: string;
  address: string;
  restaurantCount: number;
}

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const SignupBox = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 800px;
  overflow: hidden;
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

const Subtitle = styled.p`
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
`;

const Content = styled.div`
  padding: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #F1F4F8;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`;

const Input = styled.input`
  padding: 14px 16px;
  border: 1px solid #C7CED6;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
  
  &:invalid {
    border-color: #DC2626;
  }
`;

const Select = styled.select`
  padding: 14px 16px;
  border: 1px solid #C7CED6;
  border-radius: 10px;
  font-size: 16px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const RestaurantCountSection = styled.div`
  background: #F1F4F8;
  border: 1px solid #C7CED6;
  border-radius: 12px;
  padding: 24px;
  margin: 8px 0;
`;

const CountOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

const CountOption = styled.div<{ selected: boolean }>`
  background: ${props => props.selected ? '#635BFF' : 'white'};
  color: ${props => props.selected ? 'white' : '#1F2937'};
  border: 2px solid ${props => props.selected ? '#635BFF' : '#C7CED6'};
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #635BFF;
    ${props => !props.selected && `
      background: #F4F3FF;
    `}
  }
`;

const CountValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const CountLabel = styled.div`
  font-size: 14px;
  opacity: 0.8;
`;

const CountPrice = styled.div`
  font-size: 12px;
  margin-top: 4px;
  opacity: 0.7;
`;

const PricingInfo = styled.div`
  background: #EFF6FF;
  border: 1px solid #DBEAFE;
  border-radius: 10px;
  padding: 16px;
  margin-top: 16px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  
  &:last-child {
    margin-bottom: 0;
    padding-top: 8px;
    border-top: 1px solid #DBEAFE;
    font-weight: 600;
    font-size: 16px;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 16px 24px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${props => props.variant === 'primary' ? `
    background: #635BFF;
    color: white;
    
    &:hover {
      background: #5A51E6;
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(99, 91, 255, 0.3);
    }
    
    &:disabled {
      background: #6B7280;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  ` : `
    background: white;
    color: #4B5563;
    border: 1px solid #C7CED6;
    
    &:hover {
      background: #F1F4F8;
      color: #0A2540;
      border-color: #64748B;
    }
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`;

const ErrorMessage = styled.div`
  background: #FEF2F2;
  color: #DC2626;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  border: 1px solid #FEE2E2;
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: #4B5563;
  
  a {
    color: #635BFF;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const restaurantCountOptions = [
  { count: 1, label: 'Single Restaurant', basePrice: 99, description: 'Perfect for independent restaurants' },
  { count: 3, label: 'Small Chain', basePrice: 249, description: '3 restaurants with centralized management' },
  { count: 5, label: 'Medium Chain', basePrice: 399, description: '5 restaurants with advanced analytics' },
  { count: 10, label: 'Large Chain', basePrice: 699, description: '10 restaurants with enterprise features' },
  { count: 0, label: 'Custom', basePrice: 0, description: 'Contact us for custom pricing' }
];

const ManagerSignupPage: React.FC = () => {
  const { t } = useTranslation('admin');
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    phone: '',
    address: '',
    restaurantCount: 1
  });
  const [infoModal, setInfoModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRestaurantCountSelect = (count: number) => {
    setFormData(prev => ({
      ...prev,
      restaurantCount: count
    }));
  };

  const calculateTotalPrice = () => {
    const selectedOption = restaurantCountOptions.find(opt => opt.count === formData.restaurantCount);
    if (!selectedOption || selectedOption.count === 0) return 0;
    return selectedOption.basePrice;
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.password) return 'Password is required';
    if (formData.password.length < 6) return 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match';
    if (!formData.companyName.trim()) return 'Company name is required';
    if (!formData.phone.trim()) return 'Phone number is required';
    if (!formData.address.trim()) return 'Address is required';
    if (formData.restaurantCount < 1) return 'Please select number of restaurants';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real app, this would make an API call to create the manager account
      console.log('Manager signup data:', {
        ...formData,
        totalPrice: calculateTotalPrice(),
        selectedPlan: restaurantCountOptions.find(opt => opt.count === formData.restaurantCount)
      });

      setInfoModal({ open: true, title: 'Account Created', message: `Manager account created successfully. Restaurants: ${formData.restaurantCount}. Monthly Fee: RM ${calculateTotalPrice()}.` });
      navigate('/pos');

    } catch (error) {
      console.error('Signup error:', error);
      setError('An error occurred during signup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedOption = restaurantCountOptions.find(opt => opt.count === formData.restaurantCount);

  return (
    <Container>
      <SignupBox>
        <Header>
          <Title>{t('admin:signupPage.managerRegistration')}</Title>
          <Subtitle>{t('admin:signupPage.createYourMultirestaurantManagementAccount')}</Subtitle>
        </Header>

        <Content>
          <Form onSubmit={handleSubmit}>
            <Section>
              <SectionTitle>{t('admin:signupPage.personalInformation')}</SectionTitle>
              <Row>
                <InputGroup>
                  <Label>Full Name *</Label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </InputGroup>
                <InputGroup>
                  <Label>Email Address *</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <Label>Password *</Label>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter password (min 6 characters)"
                    minLength={6}
                    required
                  />
                </InputGroup>
                <InputGroup>
                  <Label>Confirm Password *</Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    required
                  />
                </InputGroup>
              </Row>
            </Section>

            <Section>
              <SectionTitle>{t('admin:signupPage.businessInformation')}</SectionTitle>
              <InputGroup>
                <Label>Company/Business Name *</Label>
                <Input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter your company name"
                  required
                />
              </InputGroup>
              <Row>
                <InputGroup>
                  <Label>Phone Number *</Label>
                  <PhoneInput
                    value={formData.phone}
                    onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                  />
                </InputGroup>
                <InputGroup>
                  <Label>Business Address *</Label>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter business address"
                    required
                  />
                </InputGroup>
              </Row>
            </Section>

            <Section>
              <SectionTitle>{t('admin:signupPage.restaurantManagementPlan')}</SectionTitle>
              <RestaurantCountSection>
                <Label style={{ fontSize: '16px', marginBottom: '8px' }}>
                  How many restaurants will you manage?
                </Label>
                <CountOptions>
                  {restaurantCountOptions.map((option) => (
                    <CountOption
                      key={option.count}
                      selected={formData.restaurantCount === option.count}
                      onClick={() => handleRestaurantCountSelect(option.count)}
                    >
                      <CountValue>
                        {option.count === 0 ? '∞' : option.count}
                      </CountValue>
                      <CountLabel>{option.label}</CountLabel>
                      <CountPrice>
                        {option.count === 0 ? 'Contact Sales' : `RM ${option.basePrice}/month`}
                      </CountPrice>
                    </CountOption>
                  ))}
                </CountOptions>
              </RestaurantCountSection>

              {selectedOption && selectedOption.count > 0 && (
                <PricingInfo>
                  <PriceRow>
                    <span>Selected Plan:</span>
                    <span>{selectedOption.label}</span>
                  </PriceRow>
                  <PriceRow>
                    <span>Number of Restaurants:</span>
                    <span>{selectedOption.count}</span>
                  </PriceRow>
                  <PriceRow>
                    <span>Monthly Subscription:</span>
                    <span>{formatCurrency(selectedOption.basePrice, selectedCurrency)}</span>
                  </PriceRow>
                  <PriceRow>
                    <span>Total Monthly Fee:</span>
                    <span>{formatCurrency(calculateTotalPrice(), selectedCurrency)}</span>
                  </PriceRow>
                </PricingInfo>
              )}

              {selectedOption && selectedOption.count === 0 && (
                <PricingInfo>
                  <div style={{ textAlign: 'center', color: '#635BFF', fontWeight: '600' }}>
                    Custom Enterprise Plan
                  </div>
                  <div style={{ textAlign: 'center', fontSize: '14px', marginTop: '8px' }}>
                    Our sales team will contact you within 24 hours to discuss your requirements
                  </div>
                </PricingInfo>
              )}
            </Section>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <ButtonGroup>
              <Button type="button" variant="secondary" onClick={() => navigate('/pos')}>
                Back to Login
              </Button>
              <Button type="submit" variant="primary" disabled={isLoading} style={{ flex: 1 }}>
                {isLoading ? 'Creating Account...' : 'Create Manager Account'}
              </Button>
            </ButtonGroup>
          </Form>

          <LoginLink>
            Already have an account? <a href="/pos">{t('admin:signupPage.signInHere')}</a>
          </LoginLink>
        </Content>
      </SignupBox>      <ConfirmModal
        isOpen={infoModal.open}
        title={infoModal.title}
        message={infoModal.message}
        onConfirm={() => setInfoModal({ open: false, title: '', message: '' })}
        onCancel={() => setInfoModal({ open: false, title: '', message: '' })}
        confirmText="OK"
        type="info"
        singleButton
      />

    </Container>
  );
};

export default ManagerSignupPage;