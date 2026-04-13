import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import MobileLayout from '../components/common/MobileLayout';
import { useMobileOrder } from '../contexts/MobileOrderContext';
import { formatCurrency } from '../../utils/currency';

const Container = styled.div`
  padding: 24px 16px 100px;
  max-width: 500px;
  margin: 0 auto;
`;

const PaymentSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const AmountDisplay = styled.div`
  font-size: 48px;
  font-weight: 700;
  color: #635BFF;
  margin: 16px 0 24px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 16px 0;
  text-align: center;
`;

const LoadingBox = styled.div`
  padding: 40px 24px;
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
  margin-bottom: 16px;
`;

const SuccessBox = styled.div`
  padding: 24px;
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 16px;
`;

const StripeForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
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

// Stripe Checkout Form (must be inside Elements provider)
const StripeCheckoutForm: React.FC<{
  orderId: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}> = ({ orderId, onSuccess, onError }) => {
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
        return_url: window.location.href,
      },
      redirect: 'if_required'
    });

    if (error) {
      setMessage(error.message || 'Payment failed');
      onError(error.message || 'Payment failed');
      setProcessing(false);
    } else {
      // Confirm payment on backend
      try {
        await fetch(`/api/orders/${orderId}/confirm-stripe-payment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (e) {
        // Non-critical - webhook will handle it
      }
      onSuccess();
    }
  };

  return (
    <StripeForm onSubmit={handleSubmit}>
      <PaymentElement />
      <SubmitButton type="submit" disabled={!stripe || processing}>
        {processing ? 'Processing...' : 'Pay Now'}
      </SubmitButton>
      {message && <ErrorText>{message}</ErrorText>}
    </StripeForm>
  );
};

const OnlinePaymentPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { setCurrentOrder, clearCart, currency } = useMobileOrder();

  // Get order data from sessionStorage
  const sessionData = sessionStorage.getItem('pendingOnlinePayment');
  const paymentData = sessionData ? JSON.parse(sessionData) : null;
  const orderId = paymentData?.orderId;
  const total = paymentData?.total || 0;
  const provider = paymentData?.provider || 'stripe'; // 'stripe' | 'paypal'
  const orderCurrency = paymentData?.currency || currency || 'MYR';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Stripe state
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState('');

  // PayPal state
  const [paypalClientId, setPaypalClientId] = useState('');
  const [paypalOrderId, setPaypalOrderId] = useState('');

  useEffect(() => {
    if (!orderId) {
      setError('Order data not found. Please go back and try again.');
      setLoading(false);
      return;
    }

    const initPayment = async () => {
      try {
        if (provider === 'stripe' || provider === 'both') {
          // Initialize Stripe
          const response = await fetch(`/api/orders/${orderId}/create-payment-intent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          });
          const data = await response.json();

          if (data.success && data.publishableKey && data.clientSecret) {
            setStripePromise(loadStripe(data.publishableKey));
            setClientSecret(data.clientSecret);
          } else {
            throw new Error(data.error || 'Failed to initialize Stripe payment');
          }
        } else if (provider === 'paypal') {
          // Initialize PayPal
          const response = await fetch(`/api/orders/${orderId}/create-paypal-order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          });
          const data = await response.json();

          if (data.success && data.clientId && data.orderId) {
            setPaypalClientId(data.clientId);
            setPaypalOrderId(data.orderId);
          } else {
            throw new Error(data.error || 'Failed to initialize PayPal payment');
          }
        }
      } catch (err: any) {
        setError(err.message || 'Failed to initialize payment');
      } finally {
        setLoading(false);
      }
    };

    initPayment();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, provider]);

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);

    // Restore order context
    if (paymentData) {
      setCurrentOrder({
        id: paymentData.orderId,
        pickupNumber: paymentData.pickupNumber || '001',
        items: paymentData.items || [],
        total: paymentData.total,
        status: 'pending',
        createdAt: new Date(),
        estimatedPickupTime: new Date(Date.now() + 30 * 60000),
        paymentStatus: 'completed'
      });
      clearCart();
    }

    // Clear session data
    sessionStorage.removeItem('pendingOnlinePayment');

    // Navigate to order tracking after a brief delay
    setTimeout(() => {
      navigate(`/mobile/${slug}/order/${orderId}`);
    }, 2000);
  };

  const handlePaymentError = (errorMsg: string) => {
    setError(errorMsg);
  };

  if (!paymentData) {
    return (
      <MobileLayout
        title="Online Payment"
        showBack
        onBack={() => navigate(`/mobile/${slug}/payment`)}
      >
        <Container>
          <ErrorBox>Order data not found. Please go back and try again.</ErrorBox>
        </Container>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout
      title="Online Payment"
      showBack
      onBack={() => navigate(`/mobile/${slug}/payment`)}
    >
      <Container>
        <PaymentSection>
          <SectionTitle>Complete Payment</SectionTitle>
          <AmountDisplay>{formatCurrency(total, orderCurrency)}</AmountDisplay>

          {paymentSuccess ? (
            <SuccessBox>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>&#10003;</div>
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#059669', marginBottom: '8px' }}>
                Payment Successful!
              </div>
              <div style={{ fontSize: '14px', color: '#6B7280' }}>
                Redirecting to order tracking...
              </div>
            </SuccessBox>
          ) : loading ? (
            <LoadingBox>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>&#9881;</div>
              Initializing payment...
            </LoadingBox>
          ) : error ? (
            <ErrorBox>{error}</ErrorBox>
          ) : (
            <>
              {/* Stripe Payment */}
              {(provider === 'stripe' || provider === 'both') && clientSecret && stripePromise && (
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
                  <StripeCheckoutForm
                    orderId={orderId}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </Elements>
              )}

              {/* PayPal Payment */}
              {provider === 'paypal' && paypalClientId && paypalOrderId && (
                <PayPalScriptProvider options={{ clientId: paypalClientId, currency: orderCurrency.toUpperCase() }}>
                  <div style={{ minHeight: '150px' }}>
                    <PayPalButtons
                      style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay' }}
                      createOrder={async () => paypalOrderId}
                      onApprove={async (data) => {
                        try {
                          const captureResponse = await fetch(`/api/orders/${orderId}/capture-paypal-order`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ orderId: data.orderID })
                          });
                          const captureData = await captureResponse.json();
                          if (captureData.success && captureData.status === 'COMPLETED') {
                            handlePaymentSuccess();
                          } else {
                            handlePaymentError('Payment capture was not completed');
                          }
                        } catch (err: any) {
                          handlePaymentError('Failed to capture payment');
                        }
                      }}
                      onError={() => {
                        handlePaymentError('PayPal payment error. Please try again.');
                      }}
                      onCancel={() => {
                        // User closed PayPal popup - no action needed
                      }}
                    />
                  </div>
                </PayPalScriptProvider>
              )}
            </>
          )}
        </PaymentSection>
      </Container>
    </MobileLayout>
  );
};

export default OnlinePaymentPage;
