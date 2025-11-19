import React, { useState } from 'react';
import styled from 'styled-components';
import { useStaff } from '../../contexts/StaffContext';
import { Modal, ModalButton, FormLabel as Label } from '../UI/Modal';

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ModalSubtitle = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
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

  &:disabled {
    background: #F9FAFB;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background: #FEE2E2;
  border: 1px solid #FECACA;
  color: #DC2626;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 20px;
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
  margin-right: 8px;
  display: inline-block;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const DemoAccountsBox = styled.div`
  margin-top: 24px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
`;

const DemoTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #64748B;
  margin-bottom: 8px;
`;

const DemoContent = styled.div`
  font-size: 11px;
  color: #64748B;
  line-height: 1.6;

  strong {
    color: #475569;
  }

  em {
    display: block;
    margin-top: 4px;
  }
`;

interface StaffLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StaffLoginModal: React.FC<StaffLoginModalProps> = ({ isOpen, onClose }) => {
  const { login, isLoggedIn, currentStaff } = useStaff();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    try {
      const success = await login(username, password);
      if (success) {
        handleClose();
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleClose = () => {
    setUsername('');
    setPassword('');
    setError('');
    onClose();
  };

  if (isLoggedIn && currentStaff) {
    return null;
  }

  const footer = (
    <>
      <ModalButton variant="secondary" onClick={handleClose} disabled={isLoggingIn}>
        Cancel
      </ModalButton>
      <ModalButton onClick={() => handleSubmit()} disabled={isLoggingIn || !username || !password}>
        {isLoggingIn ? (
          <>
            <LoadingSpinner />
            Logging in...
          </>
        ) : (
          'Login'
        )}
      </ModalButton>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Staff Login"
      footer={footer}
    >
      <ModalHeader>
        <ModalSubtitle>Please login to access the POS terminal</ModalSubtitle>
      </ModalHeader>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Username</Label>
          <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoggingIn}
            autoFocus
          />
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoggingIn}
          />
        </FormGroup>

        <button type="submit" style={{ display: 'none' }} />
      </form>

      <DemoAccountsBox>
        <DemoTitle>Demo Accounts:</DemoTitle>
        <DemoContent>
          • <strong>admin</strong> - Full access<br/>
          • <strong>sarah.manager</strong> - Manager access<br/>
          • <strong>mike.cashier</strong> - Cashier access<br/>
          • <strong>chef.wang</strong> - Kitchen access<br/>
          <em>Password: any value for demo</em>
        </DemoContent>
      </DemoAccountsBox>
    </Modal>
  );
};

export default StaffLoginModal;
