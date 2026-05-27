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
  color: #374151;
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
  color: #374151;
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
                Stripe Dashboard left sidebar → <Code>Developers</Code> (bottom-left) → <ExtLink href="https://dashboard.stripe.com/apikeys" target="_blank" rel="noopener noreferrer">API keys</ExtLink>.<br />
                <strong>Publishable key</strong> (<Code>pk_live_…</Code>) is shown directly — copy it.<br />
                <strong>Secret key</strong>: under "Standard keys" → click <Code>Create secret key</Code> → choose <Code>Powering an integration you built</Code> → name it <Code>PurpleHere POS</Code> → Stripe shows the full key <em>once</em> — copy it now (sk_live_… ~107 chars).<br />
                <em>Test mode: toggle "Test mode" on (top-right) to get pk_test_… / sk_test_… keys for sandbox testing without real charges.</em>
              </StepBody>
            </Step>
            <Step>
              <StepLabel>3. Register webhook (auto-confirm payments)</StepLabel>
              <StepBody>
                Stripe Dashboard → <Code>Developers → Webhooks</Code> (now called <strong>"Event destinations"</strong> in the new UI) → <ExtLink href="https://dashboard.stripe.com/webhooks" target="_blank" rel="noopener noreferrer"><Code>Add destination</Code></ExtLink>.<br />
                Step A — <strong>Select events</strong>: search <Code>payment_intent</Code> → check <Code>payment_intent.succeeded</Code> + <Code>payment_intent.payment_failed</Code>. (Events from = "Your account", API version default).<br />
                Step B — <strong>Destination type</strong>: choose <Code>Webhook endpoint</Code>.<br />
                Step C — <strong>Configure</strong>: Destination name <Code>PurpleHere POS</Code>, Endpoint URL <Code>{webhookUrl || 'https://purplehere.com/api/webhooks/stripe'}</Code> → <Code>Create destination</Code>.<br />
                Step D — On the destination detail page, find <strong>Signing secret</strong> → click <Code>Reveal</Code> → copy <Code>whsec_…</Code> into the Webhook Secret field below.
              </StepBody>
            </Step>
            <Step>
              <StepLabel>4. Test the connection</StepLabel>
              <StepBody>
                After saving the 3 keys: in test mode, issue a test invoice and pay with Stripe's test card <Code>4242 4242 4242 4242</Code> (any future expiry, any CVC, any ZIP).<br />
                The webhook should fire automatically and the invoice should turn <strong>paid</strong> within seconds. Check Stripe → <Code>Event destinations → PurpleHere POS → Activity</Code> for delivery status.
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
              <StepLabel>2. Create a REST API app & copy credentials</StepLabel>
              <StepBody>
                Open <ExtLink href="https://developer.paypal.com/dashboard/applications/live" target="_blank" rel="noopener noreferrer">developer.paypal.com → Apps & Credentials → Live → Create App</ExtLink>.<br />
                Set <Code>Display App Name</Code> = <Code>PurpleHere</Code>.<br />
                On the app detail page, copy <Code>Client ID</Code> and <Code>Secret key 1</Code> into the fields below.<br />
                <em>Tip: use the Sandbox tab first to test without real money.</em>
              </StepBody>
            </Step>
            <Step>
              <StepLabel>3. Enable required Features (CRITICAL)</StepLabel>
              <StepBody>
                On the same app page, scroll to <Code>Features</Code> and enable:<br />
                <strong>•</strong> <Code>Subscriptions</Code> — required for recurring subscription billing.<br />
                <strong>•</strong> <Code>Save payment methods</Code> (Vault API) — required for saved-card off-session charges.<br />
                Click <Code>Save Changes</Code>. Without these, the new app cannot create subscriptions or charge stored cards.
              </StepBody>
            </Step>
            <Step>
              <StepLabel>4. Register webhook with the FULL event set</StepLabel>
              <StepBody>
                Go to <Code>Live Webhooks → Add Webhook</Code>.<br />
                <strong>URL:</strong> <Code>{webhookUrl || 'https://purplehere.com/api/webhooks/paypal'}</Code><br />
                <strong>Events to subscribe</strong> (check all eight — partial sets break subscription state mirror):<br />
                &nbsp;&nbsp;<Code>BILLING.SUBSCRIPTION.ACTIVATED</Code><br />
                &nbsp;&nbsp;<Code>BILLING.SUBSCRIPTION.UPDATED</Code><br />
                &nbsp;&nbsp;<Code>BILLING.SUBSCRIPTION.CANCELLED</Code><br />
                &nbsp;&nbsp;<Code>BILLING.SUBSCRIPTION.EXPIRED</Code><br />
                &nbsp;&nbsp;<Code>BILLING.SUBSCRIPTION.PAYMENT.FAILED</Code><br />
                &nbsp;&nbsp;<Code>PAYMENT.SALE.COMPLETED</Code> &nbsp;<em>(subscription monthly cycle)</em><br />
                &nbsp;&nbsp;<Code>PAYMENT.CAPTURE.COMPLETED</Code> &nbsp;<em>(one-time invoice)</em><br />
                &nbsp;&nbsp;<Code>PAYMENT.CAPTURE.DENIED</Code> &nbsp;<em>(failure)</em><br />
                Save the webhook, then copy the <Code>Webhook ID</Code> (e.g. <Code>8MU24345NX395951Y</Code>) into the Webhook ID field below — required for signature verification.
              </StepBody>
            </Step>
            <Step>
              <StepLabel>5. Test the connection</StepLabel>
              <StepBody>
                Save the credentials, issue a test invoice, and pay using a PayPal Sandbox buyer account.<br />
                You can verify webhook delivery at <Code>Live Webhooks → your webhook → Recent activity</Code>.
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
