import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCustomer, Customer } from '../../contexts/CustomerContext';
import { Modal, ModalButton, FormLabel as Label } from '../UI/Modal';
import { Section } from '../common/Modal';
import PhoneInput from '../common/PhoneInput';

const SwitchLink = styled.button`
  background: none;
  border: none;
  color: #635BFF;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 0;
  margin-top: 16px;
  text-align: center;
  width: 100%;

  &:hover {
    text-decoration: underline;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 24px;
  border-bottom: 1px solid #E5E7EB;
  margin-bottom: 20px;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 12px 0;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: ${props => props.active ? '#635BFF' : '#6B7280'};
  border-bottom: 2px solid ${props => props.active ? '#635BFF' : 'transparent'};
  margin-bottom: -1px;

  &:hover {
    color: ${props => props.active ? '#635BFF' : '#374151'};
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #635BFF;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 0;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

const GuestSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  min-height: 44px;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

const SearchInput = styled(Input)`
  margin-bottom: 16px;
`;

const CustomerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 16px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #F3F4F6;
  }

  &::-webkit-scrollbar-thumb {
    background: #D1D5DB;
    border-radius: 3px;
  }
`;

const CustomerCard = styled.div<{ selected?: boolean }>`
  padding: 16px;
  border: 2px solid ${props => props.selected ? '#635BFF' : '#E5E7EB'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.selected ? '#F8F7FF' : 'white'};

  &:hover {
    border-color: #635BFF;
    background: #F8F7FF;
  }
`;

const CustomerInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CustomerDetails = styled.div`
  flex: 1;
`;

const CustomerName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 4px;
`;

const CustomerMeta = styled.div`
  font-size: 13px;
  color: #64748B;
  display: flex;
  gap: 16px;
`;

const LoyaltyBadge = styled.span<{ tier: string }>`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch(props.tier) {
      case 'VIP': return '#FEF3C7';
      case 'Gold': return '#FDE68A';
      case 'Silver': return '#F3F4F6';
      default: return '#DBEAFE';
    }
  }};
  color: ${props => {
    switch(props.tier) {
      case 'VIP': return '#92400E';
      case 'Gold': return '#D97706';
      case 'Silver': return '#6B7280';
      default: return '#1E40AF';
    }
  }};
`;

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const ErrorArea = styled.div<{ show: boolean }>`
  min-height: ${props => props.show ? 'auto' : '0'};
  max-height: ${props => props.show ? '200px' : '0'};
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  opacity: ${props => props.show ? '1' : '0'};
`;

const ErrorMessage = styled.div`
  padding: 12px;
  background: #FEE2E2;
  border: 1px solid #EF4444;
  border-radius: 8px;
  color: #DC2626;
  font-size: 14px;
  line-height: 1.5;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #64748B;
`;

const Divider = styled.div`
  margin: 20px 0;
  height: 1px;
  background: #E5E7EB;
`;

const CustomerModal: React.FC = () => {
  const {
    showCustomerModal,
    setShowCustomerModal,
    setGuestInfo,
    loginCustomer,
    registerCustomer,
    customerModalMode
  } = useCustomer();

  const [memberTab, setMemberTab] = useState<'login' | 'register'>('login');
  const [guestForm, setGuestForm] = useState({ name: '', phone: '' });
  const [loginForm, setLoginForm] = useState({ phone: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', phone: '', email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!showCustomerModal) {
      setMemberTab('login');
      setGuestForm({ name: '', phone: '' });
      setLoginForm({ phone: '', password: '' });
      setRegisterForm({ name: '', phone: '', email: '', password: '' });
      setLoginError('');
      setRegisterError('');
      setIsLoading(false);
    }
  }, [showCustomerModal]);

  const handleClose = () => {
    setShowCustomerModal(false);
  };

  const handleGuestOrder = () => {
    if (!guestForm.name || !guestForm.phone) return;

    setGuestInfo({
      name: guestForm.name,
      phone: guestForm.phone
    });
    handleClose();
  };

  const handleLogin = async () => {
    if (!loginForm.phone) {
      setLoginError('Phone number is required');
      return;
    }

    setLoginError('');
    setIsLoading(true);

    try {
      const customer = await loginCustomer(loginForm.phone, loginForm.password);
      if (customer) {
        handleClose();
      } else {
        // loginCustomer가 null을 반환하면 로그인 실패
        setLoginError('Login failed. Please check your phone number and password.');
      }
    } catch (error: any) {
      setLoginError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!registerForm.name || !registerForm.phone) {
      setRegisterError('Name and phone number are required');
      return;
    }

    if (!registerForm.password || registerForm.password.length < 6) {
      setRegisterError('Password must be at least 6 characters');
      return;
    }

    setRegisterError('');
    setIsLoading(true);

    try {
      await registerCustomer(registerForm);
      handleClose();
    } catch (error: any) {
      setRegisterError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getTitle = () => {
    if (customerModalMode === 'guest') return 'Guest Order';
    return memberTab === 'login' ? 'Member Login' : 'Create Account';
  };

  const getFooter = () => {
    if (customerModalMode === 'guest') {
      return (
        <FooterWrapper>
          <ButtonRow>
            <ModalButton variant="secondary" onClick={handleClose}>
              Cancel
            </ModalButton>
            <ModalButton
              variant="primary"
              disabled={!guestForm.name || !guestForm.phone}
              onClick={handleGuestOrder}
            >
              Continue
            </ModalButton>
          </ButtonRow>
          <ErrorArea show={false}>
            {/* Guest Order doesn't have errors */}
          </ErrorArea>
        </FooterWrapper>
      );
    }

    if (customerModalMode === 'member') {
      if (memberTab === 'login') {
        return (
          <FooterWrapper>
            <ButtonRow>
              <ModalButton variant="secondary" onClick={handleClose}>
                Cancel
              </ModalButton>
              <ModalButton
                variant="primary"
                disabled={!loginForm.phone || isLoading}
                onClick={handleLogin}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </ModalButton>
            </ButtonRow>
            <ErrorArea show={!!loginError}>
              {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
            </ErrorArea>
          </FooterWrapper>
        );
      } else {
        return (
          <FooterWrapper>
            <ButtonRow>
              <ModalButton variant="secondary" onClick={handleClose}>
                Cancel
              </ModalButton>
              <ModalButton
                variant="primary"
                disabled={!registerForm.name || !registerForm.phone || isLoading}
                onClick={handleRegister}
              >
                {isLoading ? 'Creating...' : 'Create Account'}
              </ModalButton>
            </ButtonRow>
            <ErrorArea show={!!registerError}>
              {registerError && <ErrorMessage>{registerError}</ErrorMessage>}
            </ErrorArea>
          </FooterWrapper>
        );
      }
    }

    return null;
  };

  return (
    <Modal
      isOpen={showCustomerModal}
      onClose={handleClose}
      title={getTitle()}
      footer={getFooter()}
    >
      {/* Guest View */}
      {customerModalMode === 'guest' && (
        <GuestSection>
          <FormGroup>
            <Label>Your Name *</Label>
            <Input
              type="text"
              placeholder="Enter your name"
              value={guestForm.name}
              onChange={(e) => setGuestForm({ ...guestForm, name: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label>Phone Number *</Label>
            <PhoneInput
              value={guestForm.phone}
              onChange={(value) => setGuestForm({ ...guestForm, phone: value })}
              required
            />
          </FormGroup>
        </GuestSection>
      )}

      {/* Member View: Login or Register */}
      {customerModalMode === 'member' && (
        <>
          <TabContainer>
            <Tab
              active={memberTab === 'login'}
              onClick={() => setMemberTab('login')}
            >
              Login
            </Tab>
            <Tab
              active={memberTab === 'register'}
              onClick={() => setMemberTab('register')}
            >
              Sign Up
            </Tab>
          </TabContainer>

          {memberTab === 'login' && (
            <>
              <FormGroup>
                <Label>Phone Number *</Label>
                <PhoneInput
                  value={loginForm.phone}
                  onChange={(value) => {
                    setLoginForm({ ...loginForm, phone: value });
                    setLoginError('');
                  }}
                  required
                  disabled={isLoading}
                />
              </FormGroup>

              <FormGroup>
                <Label>Password *</Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={loginForm.password}
                  onChange={(e) => {
                    setLoginForm({ ...loginForm, password: e.target.value });
                    setLoginError('');
                  }}
                  disabled={isLoading}
                />
              </FormGroup>
            </>
          )}

          {memberTab === 'register' && (
            <>
              <FormGroup>
                <Label>Full Name *</Label>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={registerForm.name}
                  onChange={(e) => {
                    setRegisterForm({ ...registerForm, name: e.target.value });
                    setRegisterError('');
                  }}
                  disabled={isLoading}
                />
              </FormGroup>

              <FormGroup>
                <Label>Phone Number *</Label>
                <PhoneInput
                  value={registerForm.phone}
                  onChange={(value) => {
                    setRegisterForm({ ...registerForm, phone: value });
                    setRegisterError('');
                  }}
                  required
                  disabled={isLoading}
                />
              </FormGroup>

              <FormGroup>
                <Label>Email Address</Label>
                <Input
                  type="email"
                  placeholder="Enter your email (optional)"
                  value={registerForm.email}
                  onChange={(e) => {
                    setRegisterForm({ ...registerForm, email: e.target.value });
                    setRegisterError('');
                  }}
                  disabled={isLoading}
                />
              </FormGroup>

              <FormGroup>
                <Label>Password *</Label>
                <Input
                  type="password"
                  placeholder="Create a password (min 6 characters)"
                  value={registerForm.password}
                  onChange={(e) => {
                    setRegisterForm({ ...registerForm, password: e.target.value });
                    setRegisterError('');
                  }}
                  disabled={isLoading}
                />
              </FormGroup>
            </>
          )}
        </>
      )}
    </Modal>
  );
};

export default CustomerModal;
