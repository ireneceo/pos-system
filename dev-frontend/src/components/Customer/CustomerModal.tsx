import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useCustomer } from '../../contexts/CustomerContext';
import { Modal, ModalButton, FormLabel as Label, FormInput } from '../UI/Modal';
import PhoneInput from '../Common/PhoneInput';

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

const GuestSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
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

const CustomerModal: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
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

    // register 모드(관리자 추가)에서는 비밀번호 선택, member 모드에서는 필수
    if (customerModalMode === 'member' && (!registerForm.password || registerForm.password.length < 6)) {
      setRegisterError('Password must be at least 6 characters');
      return;
    }

    if (registerForm.password && registerForm.password.length > 0 && registerForm.password.length < 6) {
      setRegisterError('Password must be at least 6 characters');
      return;
    }

    setRegisterError('');
    setIsLoading(true);

    try {
      await registerCustomer(registerForm, restaurantId);
      handleClose();
    } catch (error: any) {
      setRegisterError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getTitle = () => {
    if (customerModalMode === 'guest') return 'Guest Order';
    if (customerModalMode === 'register') return 'Add New Customer';
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

    if (customerModalMode === 'register') {
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
              {isLoading ? 'Adding...' : 'Add Customer'}
            </ModalButton>
          </ButtonRow>
          <ErrorArea show={!!registerError}>
            {registerError && <ErrorMessage>{registerError}</ErrorMessage>}
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
            <FormInput
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

      {/* Register New Customer (from Customers page) */}
      {customerModalMode === 'register' && (
        <>
          <FormGroup>
            <Label>Full Name *</Label>
            <FormInput
              type="text"
              placeholder="Enter customer's full name"
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
            <FormInput
              type="email"
              placeholder="Enter email (optional)"
              value={registerForm.email}
              onChange={(e) => {
                setRegisterForm({ ...registerForm, email: e.target.value });
                setRegisterError('');
              }}
              disabled={isLoading}
            />
          </FormGroup>
        </>
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
                <FormInput
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
                <FormInput
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
                <FormInput
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
                <FormInput
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
