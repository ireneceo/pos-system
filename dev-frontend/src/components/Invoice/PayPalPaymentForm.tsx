import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import styled from 'styled-components';
import axios from 'axios';

import { getAuthToken } from '../../utils/auth';
const API_BASE = process.env.REACT_APP_API_URL || '';

interface PayPalPaymentFormProps {
  invoiceId: number | string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const PayPalPaymentForm: React.FC<PayPalPaymentFormProps> = ({ invoiceId, onSuccess, onError }) => {
  const [clientId, setClientId] = useState('');
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const initPayment = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.post(
          `${API_BASE}/api/invoices/${invoiceId}/create-paypal-order`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          setClientId(response.data.clientId);
          setOrderId(response.data.orderId);
        }
      } catch (err: any) {
        const msg = err.response?.data?.error || err.message || 'Failed to initialize PayPal';
        setError(msg);
        onError(msg);
      } finally {
        setLoading(false);
      }
    };

    initPayment();
  }, [invoiceId]);

  if (loading) {
    return <LoadingBox>Initializing PayPal...</LoadingBox>;
  }

  if (error) {
    return <ErrorBox>{error}</ErrorBox>;
  }

  if (!clientId || !orderId) {
    return <ErrorBox>PayPal initialization failed. Please try again.</ErrorBox>;
  }

  return (
    <PayPalScriptProvider options={{ clientId, currency: 'MYR' }}>
      <PayPalButtonWrapper>
        <PayPalButtons
          style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay' }}
          createOrder={async () => orderId}
          onApprove={async (data) => {
            try {
              const token = getAuthToken();
              const captureResponse = await axios.post(
                `${API_BASE}/api/invoices/${invoiceId}/capture-paypal-order`,
                { orderId: data.orderID },
                { headers: { Authorization: `Bearer ${token}` } }
              );
              if (captureResponse.data.success && captureResponse.data.status === 'COMPLETED') {
                onSuccess();
              } else {
                onError('Payment capture was not completed');
              }
            } catch (err: any) {
              onError(err.response?.data?.error || 'Failed to capture payment');
            }
          }}
          onError={() => {
            onError('PayPal payment error. Please try again.');
          }}
          onCancel={() => {
            // User closed PayPal popup - no action needed
          }}
        />
      </PayPalButtonWrapper>
    </PayPalScriptProvider>
  );
};

// Styled Components
const PayPalButtonWrapper = styled.div`
  min-height: 150px;
`;

const LoadingBox = styled.div`
  padding: 24px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
`;

const ErrorBox = styled.div`
  padding: 16px;
  background: #FEF2F2;
  color: #DC2626;
  border: 1px solid #FECACA;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
`;

export default PayPalPaymentForm;
