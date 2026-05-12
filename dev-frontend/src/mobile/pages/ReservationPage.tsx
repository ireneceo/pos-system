import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { mobileFetch, getMobileToken, setMobileToken } from '../utils/mobileApi';
import { useCustomer } from '../../contexts/CustomerContext';
import DateField from '../../components/Common/DateField';
import MobileLayout from '../components/common/MobileLayout';
import PhoneInput from '../components/common/PhoneInput';

interface Restaurant {
  id: number;
  name: string;
  slug: string;
  country?: string;
}

export default function ReservationPage() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { currentCustomer, guestInfo, setGuestInfo, logoutCustomer, loginCustomer } = useCustomer();

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  // 기본 date/time: 현재시각 + 2시간 (min_advance_hours=1 + 1h buffer), 30분 단위 올림.
  // 무조건 백엔드 advance-policy 통과하도록.
  const defaultDateTime = (() => {
    const t = new Date(Date.now() + 2 * 60 * 60 * 1000);
    t.setMinutes(t.getMinutes() < 30 ? 30 : 60, 0, 0);
    const date = t.toISOString().slice(0, 10);
    const hh = String(t.getHours()).padStart(2, '0');
    const mm = String(t.getMinutes()).padStart(2, '0');
    return { date, time: `${hh}:${mm}` };
  })();

  // Reservation details
  const [date, setDate] = useState(defaultDateTime.date);
  const [time, setTime] = useState(defaultDateTime.time);
  const [partySize, setPartySize] = useState<number>(2);

  // Customer 식별 — PaymentPage 와 동일한 Guest/Member 패턴
  const [activeTab, setActiveTab] = useState<'guest' | 'member' | null>(currentCustomer ? null : null);
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [memberLoginType, setMemberLoginType] = useState<'phone' | 'email'>('phone');
  const [memberPhone, setMemberPhone] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberPassword, setMemberPassword] = useState('');
  const [memberLoginError, setMemberLoginError] = useState('');

  const [guestName, setGuestName] = useState(guestInfo?.name && guestInfo.name !== 'Guest' ? guestInfo.name : '');
  const [guestPhone, setGuestPhone] = useState(guestInfo?.phone || '');
  const [guestEmail, setGuestEmail] = useState<string>((guestInfo as any)?.email || '');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const res = await mobileFetch(`/api/mobile/store/${slug}`, { skipAuth: true });
      const json = await res.json();
      if (json?.success && json.data) {
        setRestaurant({
          id: Number(json.data.id),
          name: json.data.name,
          slug: json.data.slug,
          country: json.data.country
        });
      }
    })().catch(() => {});
  }, [slug]);

  const resolvedName = currentCustomer?.name || (activeTab === 'guest' ? guestName : '');
  const resolvedPhone = currentCustomer?.phone || (activeTab === 'guest' ? guestPhone : '');
  const resolvedEmail = currentCustomer?.email || (activeTab === 'guest' ? guestEmail : '');

  const submit = async () => {
    if (!restaurant) return;
    if (!activeTab && !currentCustomer) {
      setError('Please choose Guest or Member to continue');
      return;
    }
    if (!resolvedName || !resolvedPhone) {
      setError('Name and phone are required');
      return;
    }
    setLoading(true); setError(null);
    try {
      // Guest 경로: customer record 와 token 을 즉석에서 생성 (전자상거래 표준 guest checkout).
      // OrderTypePage 가 설정하는 'guest_xxxxx' 로컬 토큰은 customer JWT 가 아니라 backend 가
      // 거부 (401) 하므로, JWT 형식이 아니면 토큰이 없는 것으로 간주하고 register 흐름 진입.
      const existing = getMobileToken();
      const isCustomerJwt = existing && existing.split('.').length === 3 && !existing.startsWith('guest_');
      let token = isCustomerJwt ? existing : null;
      if (!token && activeTab === 'guest' && !currentCustomer) {
        const regRes = await mobileFetch('/api/customers/register', {
          method: 'POST',
          skipAuth: true,
          body: JSON.stringify({
            name: guestName,
            phone: guestPhone,
            email: guestEmail || undefined,
            restaurantId: restaurant.id
          })
        });
        const regJson = await regRes.json();
        if (!regJson.success) throw new Error(regJson.message || 'Failed to register guest');
        // /api/customers/register 응답 구조: { data: { id, phone, name, email, type, token } }
        token = regJson.data?.token || regJson.data?.customerToken || regJson.customerToken;
        // setMobileToken 은 slug-aware 키 (mobile_token:kdine-korean) 사용 — mobileFetch 가 읽는 위치와 일치
        if (token) setMobileToken(token);
        // Persist guest profile for future visits
        setGuestInfo({ name: guestName, phone: guestPhone, email: guestEmail } as any);
      }
      if (!token) {
        navigate(`/mobile/${slug}/login?next=reservation`);
        return;
      }
      const reserved_at = new Date(`${date}T${time}:00`).toISOString();
      const res = await mobileFetch('/api/reservations', {
        method: 'POST',
        body: JSON.stringify({
          restaurant_id: restaurant.id,
          reserved_at,
          party_size: partySize,
          guest_name: resolvedName,
          guest_phone: resolvedPhone,
          guest_email: resolvedEmail || undefined,
          notes: notes || undefined
        })
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      // ?new=1 → ReservationDetailPage 에서 "Submitted" 성공 배너 노출
      navigate(`/mobile/${slug}/reservations/${json.data.id}?new=1`);
    } catch (e: any) {
      setError(e.message || 'Failed');
    } finally { setLoading(false); }
  };

  const handleMemberLogin = async () => {
    setMemberLoginError('');
    const identifier = memberLoginType === 'phone' ? memberPhone : memberEmail;
    if (!identifier.trim()) {
      setMemberLoginError(memberLoginType === 'phone' ? 'Please enter your phone number.' : 'Please enter your email.');
      return;
    }
    if (!memberPassword.trim()) {
      setMemberLoginError('Please enter your password.');
      return;
    }
    try {
      const customer = await loginCustomer(identifier, memberPassword, restaurant?.id);
      if (customer) {
        setShowMemberForm(false);
        setMemberPassword('');
        setMemberPhone('');
        setMemberEmail('');
      } else {
        setMemberLoginError('Login failed. Please check your credentials and try again.');
      }
    } catch {
      setMemberLoginError('Login failed. Please try again.');
    }
  };

  if (!restaurant) {
    return (
      <MobileLayout title="Reserve a Table" showBack onBack={() => navigate(`/mobile/${slug}/reservations`)} currentPage="reserve">
        <Empty>Loading…</Empty>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout title="Reserve a Table" showBack onBack={() => navigate(`/mobile/${slug}/reservations`)} currentPage="reserve">
      <Inner>
        <RestaurantName>{restaurant.name}</RestaurantName>

        {/* 1) Reservation details */}
        <Section>
          <SectionTitle>When</SectionTitle>
          <Row>
            <FormGroup>
              <Label>Date</Label>
              <DateField value={date} onChange={setDate} />
            </FormGroup>
            <FormGroup>
              <Label>Time</Label>
              <Input type="time" value={time} onChange={e => setTime(e.target.value)} />
            </FormGroup>
          </Row>
          <FormGroup>
            <Label>Guests</Label>
            <PartyRow>
              <PartyBtn type="button" onClick={() => setPartySize(Math.max(1, partySize - 1))} disabled={partySize <= 1}>−</PartyBtn>
              <Input
                type="number"
                inputMode="numeric"
                min={1}
                max={30}
                value={partySize}
                onChange={e => setPartySize(Math.min(30, Math.max(1, parseInt(e.target.value) || 1)))}
                style={{ textAlign: 'center' }}
              />
              <PartyBtn type="button" onClick={() => setPartySize(Math.min(30, partySize + 1))} disabled={partySize >= 30}>+</PartyBtn>
            </PartyRow>
          </FormGroup>
        </Section>

        {/* 2) Customer identification — PaymentPage Guest/Member 와 동일 */}
        <Section>
          <SectionTitle>Your details</SectionTitle>

          {!currentCustomer && (
            <CustomerChoiceContainer>
              <CustomerChoiceButton
                selected={activeTab === 'guest'}
                onClick={() => {
                  setActiveTab('guest');
                  setShowGuestForm(true);
                  setShowMemberForm(false);
                }}
              >
                <ChoiceTitle>Guest</ChoiceTitle>
                <ChoiceSubtitle>Continue without signing in</ChoiceSubtitle>
              </CustomerChoiceButton>
              <CustomerChoiceButton
                selected={activeTab === 'member'}
                onClick={() => {
                  setActiveTab('member');
                  setShowMemberForm(true);
                  setShowGuestForm(false);
                }}
              >
                <ChoiceTitle>Member</ChoiceTitle>
                <ChoiceSubtitle>Login</ChoiceSubtitle>
              </CustomerChoiceButton>
            </CustomerChoiceContainer>
          )}

          {/* Guest form (no register option per request) */}
          {!currentCustomer && showGuestForm && activeTab === 'guest' && (
            <Stack>
              <FormGroup>
                <Label>Name *</Label>
                <Input type="text" placeholder="Enter your name" value={guestName} onChange={e => setGuestName(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label>Phone Number *</Label>
                <PhoneInput value={guestPhone} onChange={setGuestPhone} defaultCountryCode={restaurant.country} placeholder="Phone number" />
              </FormGroup>
              <FormGroup>
                <Label>Email (Optional)</Label>
                <Input type="email" placeholder="your.email@example.com" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} />
              </FormGroup>
            </Stack>
          )}

          {/* Member login form (inline, no navigation away) */}
          {!currentCustomer && showMemberForm && activeTab === 'member' && (
            <Stack>
              <LoginTypeTabs>
                <LoginTypeTab type="button" active={memberLoginType === 'phone'} onClick={() => { setMemberLoginType('phone'); setMemberLoginError(''); }}>Phone</LoginTypeTab>
                <LoginTypeTab type="button" active={memberLoginType === 'email'} onClick={() => { setMemberLoginType('email'); setMemberLoginError(''); }}>Email</LoginTypeTab>
              </LoginTypeTabs>

              {memberLoginType === 'phone' ? (
                <FormGroup>
                  <Label>Phone Number *</Label>
                  <PhoneInput value={memberPhone} onChange={setMemberPhone} defaultCountryCode={restaurant.country} placeholder="Phone number" />
                </FormGroup>
              ) : (
                <FormGroup>
                  <Label>Email Address *</Label>
                  <Input type="email" placeholder="Enter your email" value={memberEmail} onChange={e => setMemberEmail(e.target.value)} />
                </FormGroup>
              )}
              <FormGroup>
                <Label>Password *</Label>
                <Input type="password" placeholder="Enter your password" value={memberPassword} onChange={e => setMemberPassword(e.target.value)} />
              </FormGroup>
              {memberLoginError && <ErrorMsg>{memberLoginError}</ErrorMsg>}
              <LoginBtn type="button" onClick={handleMemberLogin}>Login as Member</LoginBtn>
              <CenterText>
                <Link onClick={() => navigate(`/mobile/${slug}/forgot-password`)}>Forgot password?</Link>
              </CenterText>
              <CenterText>
                Not a member yet?{' '}
                <Link onClick={() => navigate(`/mobile/${slug}/register?next=reservation`)}>Sign up here</Link>
              </CenterText>
            </Stack>
          )}

          {/* Logged-in member info */}
          {currentCustomer && (
            <CustomerInfoBox>
              <CustomerInfoContent>
                <CustomerInfoName>{currentCustomer.name}</CustomerInfoName>
                <CustomerInfoDetails>
                  {currentCustomer.phone}
                  {currentCustomer.email && ` • ${currentCustomer.email}`}
                </CustomerInfoDetails>
              </CustomerInfoContent>
              <ClearButton type="button" onClick={() => { logoutCustomer(); setActiveTab(null); setShowGuestForm(false); setShowMemberForm(false); }} title="Clear customer info">×</ClearButton>
            </CustomerInfoBox>
          )}
        </Section>

        {/* 3) Notes */}
        <Section>
          <SectionTitle>Notes</SectionTitle>
          <Textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Allergies, occasion, special requests…" />
        </Section>

        {error && <ErrorMsg>{error}</ErrorMsg>}

        <PrimaryBtn type="button" disabled={loading} onClick={submit}>
          {loading ? 'Submitting…' : 'Confirm Reservation'}
        </PrimaryBtn>
      </Inner>
    </MobileLayout>
  );
}

const Inner = styled.div`display:flex;flex-direction:column;gap:16px;`;
const RestaurantName = styled.div`font-size:14px;color:#6B7C93;text-align:center;`;
const Section = styled.section`background:white;border:1px solid #E5E7EB;border-radius:8px;padding:16px;display:flex;flex-direction:column;gap:12px;`;
const SectionTitle = styled.h3`font-size:14px;font-weight:600;color:#1F2937;margin:0 0 4px 0;`;
const Row = styled.div`display:grid;grid-template-columns:1fr 1fr;gap:12px;`;
const FormGroup = styled.div`display:flex;flex-direction:column;gap:6px;`;
const Label = styled.label`font-size:13px;font-weight:600;color:#374151;`;
const Input = styled.input`
  width:100%;padding:10px 12px;border:1px solid #E5E7EB;border-radius:6px;
  font-size:16px;box-sizing:border-box;background:white;color:#0A2540;
  &:focus{outline:none;border-color:#635BFF;}
  &::placeholder{color:#9CA3AF;}
`;
const Textarea = styled.textarea`
  width:100%;padding:10px 12px;border:1px solid #E5E7EB;border-radius:6px;
  font-size:16px;color:#0A2540;resize:vertical;font-family:inherit;box-sizing:border-box;
  &:focus{outline:none;border-color:#635BFF;}
`;
const PartyRow = styled.div`display:grid;grid-template-columns:48px 1fr 48px;gap:8px;align-items:center;`;
const PartyBtn = styled.button`
  height:44px;border-radius:6px;border:1px solid #E5E7EB;background:white;
  color:#0A2540;font-size:20px;font-weight:600;cursor:pointer;
  &:disabled{opacity:0.3;cursor:not-allowed;}
  &:not(:disabled):hover{background:#F6F9FC;}
`;

// PaymentPage CustomerChoice — 동일
const CustomerChoiceContainer = styled.div`display:grid;grid-template-columns:1fr 1fr;gap:8px;`;
const CustomerChoiceButton = styled.button<{ selected?: boolean }>`
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:16px 12px;border:1px solid ${p => p.selected ? '#635BFF' : '#E5E7EB'};
  border-radius:6px;cursor:pointer;transition:all 0.2s;
  background:${p => p.selected ? 'rgba(99,91,255,0.05)' : 'white'};
  width:100%;gap:6px;
  &:hover{border-color:#635BFF;background:rgba(99,91,255,0.05);}
  &:active{transform:scale(0.98);}
`;
const ChoiceTitle = styled.div`font-size:14px;font-weight:600;color:#1F2937;text-align:center;`;
const ChoiceSubtitle = styled.div`font-size:11px;color:#6B7280;text-align:center;`;

const LoginTypeTabs = styled.div`display:flex;background:#F3F4F6;border-radius:10px;padding:4px;margin-bottom:16px;`;
const LoginTypeTab = styled.button<{ active?: boolean }>`
  flex:1;padding:8px;border:none;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;
  background:${p => p.active ? 'white' : 'transparent'};
  color:${p => p.active ? '#1F2937' : '#6B7280'};
  box-shadow:${p => p.active ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};
`;
const Stack = styled.div`display:flex;flex-direction:column;gap:14px;margin-top:16px;`;
const LoginBtn = styled.button`
  width:100%;padding:12px;background:#635BFF;color:white;border:none;border-radius:8px;
  font-size:14px;font-weight:600;cursor:pointer;margin-top:4px;
  &:hover{background:#5A51E6;}
`;
const CenterText = styled.div`font-size:13px;color:#6B7280;text-align:center;margin-top:8px;`;
const Link = styled.span`color:#635BFF;cursor:pointer;text-decoration:underline;`;

const CustomerInfoBox = styled.div`
  display:flex;justify-content:space-between;align-items:center;
  background:#F0EEFF;border-radius:6px;padding:12px;
`;
const CustomerInfoContent = styled.div`flex:1;`;
const CustomerInfoName = styled.div`font-size:14px;font-weight:600;color:#0A2540;`;
const CustomerInfoDetails = styled.div`font-size:12px;color:#6B7280;margin-top:4px;`;
const ClearButton = styled.button`
  background:none;border:none;color:#6B7280;cursor:pointer;font-size:18px;
  width:28px;height:28px;border-radius:50%;
  &:hover{background:rgba(0,0,0,0.05);color:#1F2937;}
`;

const PrimaryBtn = styled.button`
  width:100%;padding:14px;background:#635BFF;color:white;border:none;border-radius:6px;
  font-size:16px;font-weight:600;cursor:pointer;
  &:disabled{opacity:0.5;cursor:not-allowed;}
  &:hover:not(:disabled){background:#5A51E6;}
`;
const Empty = styled.div`text-align:center;padding:24px 12px;color:#6B7C93;font-size:14px;background:#F6F9FC;border-radius:6px;`;
const ErrorMsg = styled.div`background:#FFEBEE;color:#C62828;padding:12px;border-radius:6px;font-size:13px;`;
