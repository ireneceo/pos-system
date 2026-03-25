import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #F4F5F7;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 48px;
  max-width: 440px;
  width: 100%;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
`;

const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'already'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      setStatus('error');
      setMessage('Invalid verification link.');
      return;
    }

    fetch(`/api/auth/verify-email?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          if (data.data?.already_verified) {
            setStatus('already');
            setMessage('Your email is already verified.');
          } else {
            setStatus('success');
            setMessage('Your email has been verified successfully!');
          }
        } else {
          setStatus('error');
          setMessage(data.error?.message || data.message || 'Verification failed.');
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Verification failed. Please try again.');
      });
  }, [searchParams]);

  return (
    <Container>
      <Card>
        {status === 'loading' && (
          <>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
            <h2 style={{ color: '#374151', margin: '0 0 8px' }}>Verifying your email...</h2>
            <p style={{ color: '#6B7280' }}>Please wait a moment.</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
            <h2 style={{ color: '#059669', margin: '0 0 8px' }}>Email Verified!</h2>
            <p style={{ color: '#6B7280', marginBottom: '24px' }}>{message}</p>
            <button
              onClick={() => navigate('/pos')}
              style={{
                padding: '12px 32px', fontSize: '15px', fontWeight: 600,
                border: 'none', borderRadius: '8px', background: '#635BFF', color: '#fff', cursor: 'pointer'
              }}
            >
              Go to Login
            </button>
          </>
        )}
        {status === 'already' && (
          <>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
            <h2 style={{ color: '#374151', margin: '0 0 8px' }}>Already Verified</h2>
            <p style={{ color: '#6B7280', marginBottom: '24px' }}>{message}</p>
            <button
              onClick={() => navigate('/pos')}
              style={{
                padding: '12px 32px', fontSize: '15px', fontWeight: 600,
                border: 'none', borderRadius: '8px', background: '#635BFF', color: '#fff', cursor: 'pointer'
              }}
            >
              Go to Login
            </button>
          </>
        )}
        {status === 'error' && (
          <>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✗</div>
            <h2 style={{ color: '#EF4444', margin: '0 0 8px' }}>Verification Failed</h2>
            <p style={{ color: '#6B7280', marginBottom: '24px' }}>{message}</p>
            <button
              onClick={() => navigate('/pos')}
              style={{
                padding: '12px 32px', fontSize: '15px', fontWeight: 600,
                border: 'none', borderRadius: '8px', background: '#635BFF', color: '#fff', cursor: 'pointer'
              }}
            >
              Go to Login
            </button>
          </>
        )}
      </Card>
    </Container>
  );
};

export default VerifyEmailPage;
