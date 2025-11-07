import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useMobileOrder } from '../contexts/MobileOrderContext';
import api from '../services/api';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #635BFF 0%, #4F46E5 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  color: white;
`;

const Logo = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 16px;
  opacity: 0.9;
  margin: 0 0 40px 0;
  text-align: center;
`;

const ScanButton = styled.button`
  background: white;
  color: #635BFF;
  border: none;
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s;
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const OrDivider = styled.div`
  margin: 32px 0;
  font-size: 14px;
  opacity: 0.8;
`;

const ManualInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 300px;
`;

const CodeInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 16px;
  text-align: center;
  transition: all 0.2s;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
    border-color: white;
    background: rgba(255, 255, 255, 0.2);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid white;
  background: transparent;
  color: white;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:active {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid #EF4444;
  padding: 12px 16px;
  border-radius: 8px;
  margin-top: 16px;
  font-size: 14px;
  text-align: center;
`;

const DemoNote = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.3);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  opacity: 0.8;
`;

const ScanPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentStore, setIsLoading, setError } = useMobileOrder();
  const [manualCode, setManualCode] = useState('');
  const [localError, setLocalError] = useState('');
  
  const handleScanClick = () => {
    // For demo, simulate QR scan
    handleQRCode('DEMO123');
  };
  
  const handleManualSubmit = () => {
    if (manualCode.trim()) {
      handleQRCode(manualCode.trim());
    }
  };
  
  const handleQRCode = async (qrCode: string) => {
    setIsLoading(true);
    setLocalError('');
    
    try {
      // Initialize guest session
      const guestResponse = await api.guestCheckout();
      if (guestResponse.success) {
        api.setToken(guestResponse.data.token);
      }
      
      // Get store info
      const storeResponse = await api.getStoreByQRCode(qrCode);
      if (storeResponse.success) {
        const store = storeResponse.data;
        
        if (!store.isOpen) {
          setLocalError('Sorry, this store is currently closed.');
          setIsLoading(false);
          return;
        }
        
        setCurrentStore(store);
        navigate(`/mobile/menu/${store.id}`);
      } else {
        setLocalError('Invalid QR code. Please try again.');
      }
    } catch (error) {
      setLocalError('Failed to connect to store. Please try again.');
      console.error('Error handling QR code:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Container>
      <Logo>🍔</Logo>
      <Title>Welcome to FoodCourt</Title>
      <Subtitle>Scan QR code to start ordering</Subtitle>
      
      <ScanButton onClick={handleScanClick}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H7M17 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V7M21 17V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H17M7 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="7" y="7" width="10" height="10" stroke="currentColor" strokeWidth="2"/>
        </svg>
        Scan QR Code
      </ScanButton>
      
      <OrDivider>or enter code manually</OrDivider>
      
      <ManualInput>
        <CodeInput
          type="text"
          placeholder="Enter store code"
          value={manualCode}
          onChange={(e) => setManualCode(e.target.value.toUpperCase())}
          onKeyPress={(e) => e.key === 'Enter' && handleManualSubmit()}
        />
        <SubmitButton 
          onClick={handleManualSubmit}
          disabled={!manualCode.trim()}
        >
          Continue
        </SubmitButton>
      </ManualInput>
      
      {localError && <ErrorMessage>{localError}</ErrorMessage>}
      
      <DemoNote>Demo: Use code "DEMO123" or click Scan QR Code</DemoNote>
    </Container>
  );
};

export default ScanPage;