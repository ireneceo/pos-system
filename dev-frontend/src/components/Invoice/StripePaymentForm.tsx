import React, { useState, useEffect } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styled from 'styled-components';
import axios from 'axios';

import { getAuthToken } from '../../utils/auth';
const API_BASE = process.env.REACT_APP_API_URL || '';

interface StripePaymentFormProps {
  invoiceId: number | string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

// Inner form component (must be inside Elements provider)
const CheckoutForm: React.FC<{
  onSuccess: () => void;
  onError: (error: string) => void;
}> = ({ onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setMessage('');

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/pos/invoices`,
      },
      redirect: 'if_required'
    });

    if (error) {
      setMessage(error.message || 'Payment failed');
      onError(error.message || 'Payment failed');
      setProcessing(false);
    } else {
      onSuccess();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <PaymentElement />
      <SubmitButton type="submit" disabled={!stripe || processing}>
        {processing ? 'Processing...' : 'Pay Now'}
      </SubmitButton>
      {message && <ErrorText>{message}</ErrorText>}
    </Form>
  );
};

// Outer component: creates PaymentIntent and loads Stripe
const StripePaymentForm: React.FC<StripePaymentFormProps> = ({ invoiceId, onSuccess, onError }) => {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const initPayment = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.post(
          `${API_BASE}/api/invoices/${invoiceId}/create-payment-intent`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          const { clientSecret: cs, publishableKey } = response.data;
          if (!publishableKey) {
            throw new Error('Stripe publishable key not configured');
          }
          setStripePromise(loadStripe(publishableKey));
          setClientSecret(cs);
        }
      } catch (err: any) {
        const msg = err.response?.data?.error || err.message || 'Failed to initialize payment';
        setError(msg);
        onError(msg);
      } finally {
        setLoading(false);
      }
    };

    initPayment();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceId]);

  if (loading) {
    return <LoadingBox>Initializing payment...</LoadingBox>;
  }

  if (error) {
    return <ErrorBox>{error}</ErrorBox>;
  }

  if (!clientSecret || !stripePromise) {
    return <ErrorBox>Payment initialization failed. Please try again.</ErrorBox>;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#635BFF',
            borderRadius: '8px'
          }
        }
      }}
    >
      <CheckoutForm onSuccess={onSuccess} onError={onError} />
    </Elements>
  );
};

// Styled Components
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #635BFF;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #4B45C6;
  }

  &:disabled {
    background: #A5B4FC;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.div`
  color: #DC2626;
  font-size: 14px;
  text-align: center;
`;

const LoadingBox = styled.div`
  padding: 24px;
  text-align: center;
  color: #4B5563;
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

export default StripePaymentForm;
