// SMTP 연동 안내 — Gmail / Outlook / 일반 SMTP 서비스별 단계별 가이드.
// PaymentGatewayGuide 와 같은 패턴.

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

const ProviderTabs = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
`;

const ProviderTab = styled.button<{ $active: boolean }>`
  background: ${p => p.$active ? '#635BFF' : 'white'};
  color: ${p => p.$active ? 'white' : '#635BFF'};
  border: 1px solid ${p => p.$active ? '#635BFF' : '#D4D0FF'};
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
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

const Warning = styled.div`
  background: #FEF3C7;
  border: 1px solid #FCD34D;
  border-radius: 6px;
  padding: 8px 10px;
  margin-top: 8px;
  font-size: 12px;
  color: #78350F;
`;

const SmtpGuide: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [provider, setProvider] = useState<'gmail' | 'outlook' | 'other'>('gmail');

  return (
    <GuideBox>
      <GuideHeader type="button" onClick={() => setOpen(!open)}>
        <span>How to set up custom SMTP (send from your own domain)</span>
        <span>{open ? '▴' : '▾'}</span>
      </GuideHeader>
      {open && (
        <GuideBody>
          <ProviderTabs>
            <ProviderTab type="button" $active={provider === 'gmail'} onClick={() => setProvider('gmail')}>Gmail</ProviderTab>
            <ProviderTab type="button" $active={provider === 'outlook'} onClick={() => setProvider('outlook')}>Outlook / Microsoft 365</ProviderTab>
            <ProviderTab type="button" $active={provider === 'other'} onClick={() => setProvider('other')}>Other (SES, SendGrid, …)</ProviderTab>
          </ProviderTabs>

          {provider === 'gmail' && (
            <>
              <Step>
                <StepLabel>1. Enable 2-Step Verification</StepLabel>
                <StepBody>
                  Gmail requires 2-Step Verification before you can create an App Password.<br />
                  Enable at <ExtLink href="https://myaccount.google.com/security" target="_blank" rel="noopener noreferrer">myaccount.google.com/security → 2-Step Verification</ExtLink>.
                </StepBody>
              </Step>
              <Step>
                <StepLabel>2. Create an App Password (NOT your Gmail password)</StepLabel>
                <StepBody>
                  Open <ExtLink href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer">myaccount.google.com/apppasswords</ExtLink>.<br />
                  Choose <Code>Mail</Code> + <Code>Other</Code> (e.g. "Purple POS"), copy the 16-character password.
                </StepBody>
              </Step>
              <Step>
                <StepLabel>3. Fill in the form below</StepLabel>
                <StepBody>
                  Server: <Code>smtp.gmail.com</Code> · Port: <Code>587</Code> · Secure (TLS): <Code>off</Code> (STARTTLS auto)<br />
                  User: your full Gmail address · Password: <strong>the 16-char App Password</strong>
                </StepBody>
              </Step>
              <Warning>
                Your regular Gmail password will NOT work — must be an App Password.
              </Warning>
            </>
          )}

          {provider === 'outlook' && (
            <>
              <Step>
                <StepLabel>1. Confirm SMTP AUTH is enabled</StepLabel>
                <StepBody>
                  Microsoft 365 admin console: <Code>Users → [user] → Mail → Manage email apps</Code> → check <Code>Authenticated SMTP</Code>.
                </StepBody>
              </Step>
              <Step>
                <StepLabel>2. (If 2FA enabled) create an App Password</StepLabel>
                <StepBody>
                  <ExtLink href="https://account.microsoft.com/security" target="_blank" rel="noopener noreferrer">account.microsoft.com/security → Advanced security options</ExtLink> → App passwords.
                </StepBody>
              </Step>
              <Step>
                <StepLabel>3. Fill in the form below</StepLabel>
                <StepBody>
                  Server: <Code>smtp-mail.outlook.com</Code> (consumer) or <Code>smtp.office365.com</Code> (business) · Port: <Code>587</Code> · Secure: <Code>off</Code><br />
                  User: full email address · Password: account password (or App Password if 2FA on)
                </StepBody>
              </Step>
            </>
          )}

          {provider === 'other' && (
            <>
              <Step>
                <StepLabel>Common providers</StepLabel>
                <StepBody>
                  <strong>Amazon SES:</strong> Server <Code>email-smtp.{'<'}region{'>'}.amazonaws.com</Code>, Port <Code>587</Code>, User/Password from SES SMTP credentials.<br />
                  <strong>SendGrid:</strong> Server <Code>smtp.sendgrid.net</Code>, Port <Code>587</Code>, User <Code>apikey</Code>, Password = API key.<br />
                  <strong>Mailgun:</strong> Server <Code>smtp.mailgun.org</Code>, Port <Code>587</Code>, User/Password from Domain → SMTP credentials.
                </StepBody>
              </Step>
              <Step>
                <StepLabel>Generic SMTP</StepLabel>
                <StepBody>
                  Get host / port / username / password from your provider's documentation. Most use port 587 (STARTTLS) or 465 (SSL — toggle Secure on).
                </StepBody>
              </Step>
            </>
          )}

          <Step style={{ marginTop: 12, paddingTop: 8, borderTop: '1px dashed #D4D0FF' }}>
            <StepLabel>Test before saving</StepLabel>
            <StepBody>
              After saving, send yourself a test email (Send Test button below) to verify delivery. If it fails, check spam folder and verify the password.
            </StepBody>
          </Step>
        </GuideBody>
      )}
    </GuideBox>
  );
};

export default SmtpGuide;
