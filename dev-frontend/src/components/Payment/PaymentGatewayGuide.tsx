// 결제 게이트웨이 (Stripe / PayPal) 연동 안내 박스.
// 4개 PaymentSettings 페이지 (Admin / Brand / Foodcourt / Supplier) 공통 사용.
//
// Why: 단순 placeholder 만으로는 가입 안 한 사용자가 어디서 키 받는지 모름.
// 단계별 안내 + 공식 dashboard link 제공.

import React, { useState } from 'react';
import styled from 'styled-components';

const GuideBox = styled.div`
  background: #F1F0FF;
  border: 1px solid #D4D0FF;
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #4B5563;
  line-height: 1.6;
`;

const GuideHeader = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #635BFF;
  font-size: 13px;
  font-weight: 600;
  text-align: left;
`;

const GuideBody = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #D4D0FF;
`;

const Step = styled.div`
  margin-bottom: 10px;
  &:last-child { margin-bottom: 0; }
`;

const StepLabel = styled.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  font-size: 13px;
`;

const StepBody = styled.div`
  color: #4B5563;
  font-size: 12.5px;
`;

const ExtLink = styled.a`
  color: #635BFF;
  text-decoration: none;
  font-weight: 500;
  &:hover { text-decoration: underline; }
`;

const Code = styled.code`
  background: white;
  border: 1px solid #E0DDFF;
  border-radius: 4px;
  padding: 1px 6px;
  font-family: 'SFMono-Regular', Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
  color: #635BFF;
`;

interface Props {
  gateway: 'stripe' | 'paypal' | 'bank';
  webhookUrl?: string; // 예: https://purplehere.com/api/webhooks/stripe
}

const PaymentGatewayGuide: React.FC<Props> = ({ gateway, webhookUrl }) => {
  const [open, setOpen] = useState(false);

  if (gateway === 'stripe') {
    return (
      <GuideBox>
        <GuideHeader type="button" onClick={() => setOpen(!open)}>
          <span>How to connect Stripe (card payments)</span>
          <span>{open ? '▴' : '▾'}</span>
        </GuideHeader>
        {open && (
          <GuideBody>
            <Step>
              <StepLabel>1. Create a Stripe account</StepLabel>
              <StepBody>
                Sign up at <ExtLink href="https://dashboard.stripe.com/register" target="_blank" rel="noopener noreferrer">dashboard.stripe.com/register</ExtLink>. Verify your business and add a payout bank account.
              </StepBody>
            </Step>
            <Step>
              <StepLabel>2. Copy API keys</StepLabel>
              <StepBody>
                Stripe Dashboard → <ExtLink href="https://dashboard.stripe.com/apikeys" target="_blank" rel="noopener noreferrer">Developers → API keys</ExtLink>.<br />
                Copy <Code>Publishable key</Code> (starts with <Code>pk_live_</Code>) and <Code>Secret key</Code> (starts with <Code>sk_live_</Code>) into the fields below.<br />
                <em>Tip: use test keys (<Code>pk_test_</Code> / <Code>sk_test_</Code>) first to verify the flow.</em>
              </StepBody>
            </Step>
            <Step>
              <StepLabel>3. Register webhook (auto-confirm payments)</StepLabel>
              <StepBody>
                Stripe Dashboard → <ExtLink href="https://dashboard.stripe.com/webhooks" target="_blank" rel="noopener noreferrer">Developers → Webhooks → Add endpoint</ExtLink>.<br />
                Endpoint URL: <Code>{webhookUrl || 'https://purplehere.com/api/webhooks/stripe'}</Code><br />
                Events to listen: <Code>payment_intent.succeeded</Code>, <Code>payment_intent.payment_failed</Code>.<br />
                Copy <Code>Signing secret</Code> (starts with <Code>whsec_</Code>) into the Webhook Secret field below.
              </StepBody>
            </Step>
            <Step>
              <StepLabel>4. Test the connection</StepLabel>
              <StepBody>
                Save the keys, issue a test invoice, and pay with Stripe's test card <Code>4242 4242 4242 4242</Code> (any future expiry, any CVC).
              </StepBody>
            </Step>
          </GuideBody>
        )}
      </GuideBox>
    );
  }

  if (gateway === 'paypal') {
    return (
      <GuideBox>
        <GuideHeader type="button" onClick={() => setOpen(!open)}>
          <span>How to connect PayPal (PayPal account & card)</span>
          <span>{open ? '▴' : '▾'}</span>
        </GuideHeader>
        {open && (
          <GuideBody>
            <Step>
              <StepLabel>1. Create a PayPal Business account</StepLabel>
              <StepBody>
                Sign up at <ExtLink href="https://www.paypal.com/bizsignup/" target="_blank" rel="noopener noreferrer">paypal.com/bizsignup</ExtLink>. Verify your business email and link a payout bank.
              </StepBody>
            </Step>
            <Step>
              <StepLabel>2. Create a REST API app</StepLabel>
              <StepBody>
                Open <ExtLink href="https://developer.paypal.com/dashboard/applications/live" target="_blank" rel="noopener noreferrer">developer.paypal.com → Apps & Credentials → Live → Create App</ExtLink>.<br />
                Copy <Code>Client ID</Code> and <Code>Secret</Code> into the fields below.<br />
                <em>Tip: use the Sandbox tab first to test without real money.</em>
              </StepBody>
            </Step>
            <Step>
              <StepLabel>3. Register webhook</StepLabel>
              <StepBody>
                In the same app detail page → scroll to <Code>Webhooks</Code> → <Code>Add Webhook</Code>.<br />
                URL: <Code>{webhookUrl || 'https://purplehere.com/api/webhooks/paypal'}</Code><br />
                Events: <Code>PAYMENT.CAPTURE.COMPLETED</Code>, <Code>PAYMENT.CAPTURE.DENIED</Code>.<br />
                Copy the <Code>Webhook ID</Code> into the Webhook ID field below.
              </StepBody>
            </Step>
            <Step>
              <StepLabel>4. Test the connection</StepLabel>
              <StepBody>
                Save the credentials, issue a test invoice, and pay using a PayPal Sandbox buyer account.
              </StepBody>
            </Step>
          </GuideBody>
        )}
      </GuideBox>
    );
  }

  // Bank transfer guide
  return (
    <GuideBox>
      <GuideHeader type="button" onClick={() => setOpen(!open)}>
        <span>How bank transfer works</span>
        <span>{open ? '▴' : '▾'}</span>
      </GuideHeader>
      {open && (
        <GuideBody>
          <Step>
            <StepLabel>1. Enter your bank details below</StepLabel>
            <StepBody>
              The customer sees these on the invoice payment page and uses them to make a manual transfer.
            </StepBody>
          </Step>
          <Step>
            <StepLabel>2. Customer pays + submits proof</StepLabel>
            <StepBody>
              After transferring, the customer submits a transaction reference (and optionally a receipt image).
            </StepBody>
          </Step>
          <Step>
            <StepLabel>3. You confirm the payment</StepLabel>
            <StepBody>
              Open the invoice → <Code>Confirm payment</Code>. The system marks it paid, restores the subscription, and credits any referral commission automatically.
            </StepBody>
          </Step>
        </GuideBody>
      )}
    </GuideBox>
  );
};

export default PaymentGatewayGuide;
