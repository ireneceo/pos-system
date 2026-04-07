# 리퍼럴 시스템 기획설계서

> **작성일:** 2026-04-07
> **상태:** 설계 확정
> **규모:** 대 (신규 시스템, DB 변경 포함)

---

## 1. 비즈니스 요구사항

### 1-1. 목표
Purple POS 구독자를 확보하기 위한 리퍼럴 프로그램 구축.
추천인에게 지속적인 수익을, 피추천인에게 초기 비용 절감을 제공하여 양측 모두에 가입 동기를 부여한다.

### 1-2. 핵심 규칙

| 항목 | 내용 |
|------|------|
| **추천인 보상** | 피추천인 POS 구독 결제 금액의 **15% 영구 커미션** |
| **피추천인 혜택** | 첫 달 POS 구독료 **20% 할인** |
| **커미션 대상** | POS 구독 인보이스 (issuer_type: system_admin)만 해당 |
| **커미션 기간** | 영구 — 피추천인이 구독을 유지하는 한 매월 반복 |
| **커미션 기준** | 할인 적용 후 실제 결제 금액 기준 |
| **참여 자격** | 모든 가입자 (POS 구독자 + 리퍼럴 전용 가입자) |
| **설정 변경** | System Admin이 커미션율/할인율/최소 지급액 조정 가능, 변경 후 새 커미션에만 적용 (소급 불가) |

### 1-3. 영구 커미션 근거
- 15%는 구독료 대비 크지 않은 비용
- 영구여야 추천인이 피추천인 이탈을 방지하려 능동적으로 관리 (자연스러운 리텐션 효과)
- 기간 제한 시 "어차피 끝나는데" 심리로 추천 동기 약화
- SaaS 리퍼럴 업계 표준 10~30% recurring

### 1-4. 커미션 계산 예시

| 피추천인 플랜 | 월 구독료 | 첫 달 (20% 할인) | 추천인 커미션 (15%) | 2달째~ 커미션 |
|-------------|---------|:---------------:|:-----------------:|:-----------:|
| Starter (MYR) | RM 89 | RM 71.20 | RM 10.68 | RM 13.35 |
| Professional (KRW) | ₩49,000 | ₩39,200 | ₩5,880 | ₩7,350 |
| Enterprise (USD) | $199 | $159.20 | $23.88 | $29.85 |

---

## 2. 시스템 구조

### 2-1. 독립 앱 분리 원칙

리퍼럴 시스템은 기존 POS 대시보드와 **완전히 분리된 독립 앱**으로 구축한다.

```
purplehere.com/pos/*              ← 기존 POS 대시보드 (변경 최소)
purplehere.com/referral/*         ← 리퍼럴 전용 앱 (신규, 독립 레이아웃)
purplehere.com/signup?ref=CODE    ← 기존 가입 페이지 (코드 필드 + 리퍼럴 배너 추가)
purplehere.com/referral-program   ← 공개 소개 페이지 (Landing)
```

**분리 이유:**
- POS 대시보드의 ProtectedRoute/MainLayout/사이드바 로직을 건드리지 않음
- 구독 해지 유저, 리퍼럴 전용 유저도 별도 레이아웃에서 접근 가능
- 모바일 최적화 별도 적용 (리퍼럴 공유는 모바일에서 주로 발생)

**공유 요소:**
- 같은 User 테이블 (리퍼럴 파트너는 role = 'Referral Partner')
- 같은 JWT 인증 시스템 (/api/auth/login 공유)
- 같은 백엔드 서버 (dev-backend)

### 2-2. 사용자 유형

| 유형 | 가입 경로 | POS 접근 | 리퍼럴 접근 |
|------|----------|:-------:|:---------:|
| POS 구독자 (활성) | /signup (플랜 필수) | O | O |
| POS 구독자 (해지/만료) | 구독 후 해지 | X | O |
| 리퍼럴 파트너 | /referral/signup (플랜 불필요) | X | O |

- 리퍼럴 파트너: 이름, 이메일, 비밀번호만으로 가입. role = 'Referral Partner'
- POS 전환: Phase 1은 별도 POS 가입 안내, Phase 2~3에서 계정 통합(role 업그레이드)

### 2-3. 레이아웃 구조

**ReferralLayout (신규)** — 리퍼럴 대시보드/월렛/프로필
```
┌──────────────────────────────────────────────────┐
│  [Purple Logo]        Dashboard   Wallet   Profile│
├──────────────────────────────────────────────────┤
│              페이지 콘텐츠 (최대 960px)              │
└──────────────────────────────────────────────────┘
- 사이드바 없음, 상단 네비만
- 모바일: 햄버거 메뉴
- 배경: #FAFBFC
```

**ReferralAuthLayout (신규)** — 로그인/가입 전용
```
로고 + 중앙 정렬 카드 폼 (기존 LoginPage 스타일)
```

**MainLayout (기존, 변경 최소)** — SA 관리 페이지만 여기서 동작
```
사이드바에 "Referrals" 메뉴 추가 + 사이드바 하단 리퍼럴 링크 고정 (전 역할)
```

### 2-4. 리퍼럴 코드 규칙

```
형식: PURPLE-XXXX
사용 문자: A B C D E F G H J K M N P Q R S T U V W X Y Z 2 3 4 5 6 7 8 9
제외: O, 0, I, 1, L (가독성)
발급 시점:
  - 신규 가입 시 자동 (POS + Referral Partner)
  - 기존 유저는 /referral 최초 접근 시 자동 (lazy generation)
고유성: users.referral_code UNIQUE
```

---

## 3. 사용자 흐름

### 3-1. 리퍼럴 파트너 가입

```
/referral/signup 접속
  → 이름, 이메일, 비밀번호, 비밀번호 확인 입력
  → 유효성: 이메일 중복+MX 검증, 비밀번호 8자+대소문자+숫자
  → User 생성: role='Referral Partner', referral_code 자동 발급, subscription_status=null
  → 이메일 인증 발송
  → 인증 완료 후 /referral/dashboard 리다이렉트
```

authService 로그인 시 Referral Partner는 구독 상태 체크 스킵 (subscription_status가 null이므로 명시적 예외 처리)

### 3-2. 기존 POS 유저의 리퍼럴 접근

```
POS 대시보드 사이드바 하단 "Referral Program" 링크 클릭
  → /referral/dashboard 새 탭 열림
  → 같은 도메인이므로 localStorage auth_token 공유, 별도 로그인 불필요
  → referral_code 없으면 최초 접근 시 자동 발급
```

### 3-3. 피추천인 가입 — 리퍼럴 링크

```
purplehere.com/signup?ref=PURPLE-A3K9 클릭
  → 기존 SignupPage 로드
  → 상단에 리퍼럴 배너 표시 (Primary #635BFF 배경):
    "You've been referred! Get 20% off your first month. Code: PURPLE-A3K9"
  → 배너는 전체 가입 과정 동안 유지
  → Step 2의 Referral Code 필드에 자동 입력 (수정 가능)
  → 코드 실시간 검증 (500ms debounce):
    유효 → 초록 체크 + "Valid referral code"
    무효 → 빨간색 + "Invalid referral code" (가입은 가능, 할인만 미적용)
    자기 자신 코드 → 차단
  → 가입 완료 → users.referred_by = 추천인 user.id 저장
```

코드 직접 입력: Step 2에 Referral Code 필드 (optional, placeholder: "Enter referral code")

### 3-4. 리퍼럴 링크 클릭 추적

```
SignupPage 로드 시 ?ref= 감지
  → POST /api/referrals/track-click (referral_code, 서버에서 IP/UA 추출)
  → 같은 IP 24시간 내 중복은 미카운트
  → 가입 완료 시 해당 click의 converted = true 업데이트
```

### 3-5. 첫 인보이스 20% 할인 적용

**중요: restaurant.discount 필드를 사용하지 않는다** (기존 Admin 수동 할인과 충돌 방지)

인보이스 생성 시점에 직접 할인 적용:
```
invoiceScheduler가 인보이스 생성 시:
  1. 인보이스 대상 유저의 referred_by 존재 확인
  2. 해당 유저에 대해 referral_discount_applied 플래그 확인 (User 테이블)
  3. false이면 (첫 인보이스):
     → 인보이스에 직접 할인 세팅:
       discount_type: 'percentage'
       discount_value: 20 (ReferralSettings에서 조회)
       discount_amount: planAmount × 0.20
       discount_reason: 'Referral: 20% off first month (PURPLE-A3K9)'
     → User.referral_discount_applied = true 업데이트
  4. true이면 (이미 적용됨): 할인 없이 정상 생성
```

**역할별 적용 위치:**
- Restaurant Admin: `createSubscriptionInvoice` 내에서 referred_by 확인 후 할인 적용 (기존 restaurant.discount와 독립)
- Brand/Foodcourt/Owner: `createEntitySubscriptionInvoice`에 discountOptions 옵션 파라미터 추가 (기본 null → 기존 동작 유지)

**기존 Admin 수동 할인과 공존:**
- Admin 할인: restaurant.discount_type/value → 매월 적용 (기존 그대로)
- 리퍼럴 할인: referred_by + referral_discount_applied → 첫 달만
- 둘 다 있으면 둘 다 적용 (중첩 할인)

### 3-6. 커미션 발생

```
피추천인 인보이스 결제 완료 (status → 'paid')
  │
  ├─ 공통 함수 handleInvoicePaid(invoice) 호출
  │   (기존 코드에서 paid 처리하는 모든 경로를 이 공통 함수로 통합)
  │   → restoreSubscription() (기존 로직)
  │   → referralService.processCommission(invoice) (신규 추가)
  │
  ├─ processCommission 내부:
  │   1. invoice.issuer_type === 'system_admin' && invoice_category === 'subscription' 확인
  │   2. payer의 referred_by 존재 확인
  │   3. 동일 invoice_id 중복 커미션 체크 (UNIQUE 제약)
  │   4. commission_amount = invoice.total_amount × commission_rate (ReferralSettings)
  │   5. ReferralCommission 생성 (status: 'credited')
  │   6. ReferralWallet 찾기/생성 (user_id + currency)
  │   7. wallet.balance += commission_amount
  │   8. ReferralWalletTransaction 기록
  │   9. 추천인에게 이메일 알림
  │
  └─ 기존 결제 흐름에 영향 없음 (추가 호출일 뿐)
```

### 3-7. 커미션 사용 — 크레딧 적용

```
기존 인보이스 상세 페이지에서 처리 (월렛 페이지가 아닌 인보이스 페이지)
  │
  ├─ 조건:
  │   - 본인 인보이스 && status: 'pending_payment'
  │   - 해당 통화의 월렛 잔액 > 0
  │
  ├─ "Apply Referral Credit" 버튼 → 모달:
  │   - Invoice Amount / Already Paid / Remaining
  │   - Wallet Balance (해당 통화)
  │   - Apply Amount (max: remaining과 잔액 중 작은 값)
  │   - 적용 후 예상: 잔여 인보이스 / 잔여 월렛
  │
  ├─ 적용 (트랜잭션):
  │   1. wallet.balance -= amount
  │   2. wallet.total_credited += amount
  │   3. WalletTransaction 기록 (type: 'credit_used')
  │   4. invoice.paid_amount += amount
  │   5. 전액 커버 → handleInvoicePaid(invoice) 호출 (공통 함수)
  │      → restoreSubscription + processCommission 모두 정상 동작
  │
  └─ 월렛 페이지에는 안내만: "You can apply your balance when paying invoices."
```

### 3-8. 커미션 사용 — 지급 요청

```
/referral/wallet → "Request Payout" 클릭
  │
  ├─ 조건:
  │   - 해당 통화 wallet.balance >= 최소 지급 금액 (통화별, ReferralSettings)
  │   - 진행 중 요청(requested/approved) 없을 것
  │
  ├─ 모달:
  │   - Available Balance, Minimum Payout
  │   - Payout Amount (기본 전액, 수정 가능, min~max)
  │   - Bank Information (저장된 값 자동 표시, 없으면 입력)
  │
  ├─ 요청 (트랜잭션):
  │   1. ReferralPayout 생성 (status: 'requested')
  │   2. wallet.balance -= amount (즉시 차감, 중복 방지)
  │   3. wallet.total_withdrawn += amount
  │   4. WalletTransaction 기록 (type: 'payout')
  │   5. 은행 정보 User에 저장 (다음 요청 시 자동 입력)
  │   6. System Admin에게 이메일 알림
  │
  ├─ Admin 처리:
  │   Approve → Mark as Paid (실제 송금은 수동)
  │
  └─ 거절 시:
      wallet.balance += amount (원복)
      wallet.total_withdrawn -= amount
      WalletTransaction (type: 'adjustment', description: 'Payout rejected: {reason}')
      요청자에게 이메일 + 사유
```

---

## 4. 화면 설계

### 4-1. 리퍼럴 가입 (`/referral/signup`)

```
┌──────────────────────────────────────────────────────┐
│  [Purple Logo]                             [Log In]  │
├──────────────────────────────────────────────────────┤
│                                                       │
│  ┌─────────────────────┐  ┌────────────────────────┐ │
│  │                      │  │                         │ │
│  │  Join the Referral   │  │  Earnings Calculator    │ │
│  │  Program             │  │                         │ │
│  │                      │  │  Plan  [Professional ▾] │ │
│  │  Full Name           │  │  Referrals  [ 5 ]       │ │
│  │  [________________]  │  │                         │ │
│  │                      │  │  Estimated Monthly:     │ │
│  │  Email               │  │  RM 111.75              │ │
│  │  [________________]  │  │                         │ │
│  │                      │  │  Estimated Yearly:      │ │
│  │  Password            │  │  RM 1,341.00            │ │
│  │  [________________]  │  │                         │ │
│  │                      │  │  (Based on 15%          │ │
│  │  Confirm Password    │  │   recurring commission) │ │
│  │  [________________]  │  │                         │ │
│  │                      │  └────────────────────────┘ │
│  │  [  Create Account ] │                             │
│  │                      │  No subscription required   │
│  │  Already have an     │  15% commission forever     │
│  │  account? Log in     │  Withdraw anytime           │
│  │  Want POS?           │                             │
│  │  Sign up here >      │                             │
│  └─────────────────────┘                              │
│                                                       │
│  모바일: 시뮬레이터가 폼 위로 이동 (세로 배치)            │
└──────────────────────────────────────────────────────┘
```

수익 시뮬레이터: 플랜 드롭다운 + 추천 수 입력 → 예상 월/연 수익 실시간 계산.
PlanPrice 공개 API에서 플랜별 가격 조회.

필드 유효성:
- Full Name: 필수, 2자+
- Email: 필수, 이메일 형식, MX 검증, 중복 확인
- Password: 8자+, 대문자 1+, 소문자 1+, 숫자 1+
- Confirm Password: Password와 일치

### 4-2. 리퍼럴 로그인 (`/referral/login`)

```
┌──────────────────────────────────────────────────────┐
│  [Purple Logo]                                        │
├──────────────────────────────────────────────────────┤
│                                                       │
│               Referral Partner Login                   │
│                                                       │
│  ┌────────────────────────────────────────────┐       │
│  │  Email          [________________________] │       │
│  │  Password       [________________________] │       │
│  │                                             │       │
│  │  [            Log In                      ] │       │
│  │                                             │       │
│  │  Forgot password?                           │       │
│  │  Don't have an account? Sign up             │       │
│  │  Looking for POS? Go to POS Login >         │       │
│  └────────────────────────────────────────────┘       │
│                                                       │
└──────────────────────────────────────────────────────┘
```

- POS 유저도 여기서 로그인 가능 (같은 auth API)
- auth_token 있으면 바로 dashboard 리다이렉트

### 4-3. 리퍼럴 대시보드 (`/referral/dashboard`)

```
┌──────────────────────────────────────────────────────┐
│  [Purple Logo]          Dashboard   Wallet   Profile │
├──────────────────────────────────────────────────────┤
│                                                       │
│  ┌────────────────────────────────────────────────┐   │
│  │  Available Balance          This Month          │   │
│  │  RM 125.40                  + RM 45.20          │   │
│  └────────────────────────────────────────────────┘   │
│                                                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────┐ │
│  │  Clicks  │ │ Signups  │ │  Active  │ │  Total  │ │
│  │    42    │ │    8     │ │    5     │ │ Earned  │ │
│  │ +12 MTD  │ │ +3 MTD   │ │ +2 MTD   │ │RM250.00│ │
│  └──────────┘ └──────────┘ └──────────┘ └─────────┘ │
│                                                       │
│  (은행 정보 미입력 시)                                  │
│  ┌────────────────────────────────────────────────┐   │
│  │  Set up your payout info to withdraw earnings. │   │
│  │  [Go to Profile >]                             │   │
│  └────────────────────────────────────────────────┘   │
│                                                       │
│  My Referral Code                        [펼치기 ▾]   │
│  ┌────────────────────────────────────────────────┐   │
│  │  PURPLE-A3K9                      [Copy Code]  │   │
│  │  purplehere.com/signup?ref=PURPLE-A3K9         │   │
│  │                        [Copy Link] [Share]     │   │
│  └────────────────────────────────────────────────┘   │
│  첫 방문: 펼침 / 재방문: 접힘                           │
│  [Share]: 모바일=Web Share API, 데스크톱=Copy Link     │
│                                                       │
│  My Referrals                                         │
│  ┌────────────────────────────────────────────────┐   │
│  │ Business       Status    Signed Up  Commission │   │
│  │ Kim's Cafe     Active    2026-03-15  RM 45.20 │   │
│  │ Seoul BBQ      Active    2026-04-01   RM 0.00 │   │
│  │ Pasta House    Active    2026-02-10  RM 80.20 │   │
│  │ ABC Brand      Inactive  2026-01-05  RM 12.30 │   │
│  └────────────────────────────────────────────────┘   │
│  Status: Active / Inactive 2가지만 (프라이버시)         │
│                                                       │
│  Recent Commissions                    [View All >]   │
│  ┌────────────────────────────────────────────────┐   │
│  │ Date        Referred      Invoice     Amount   │   │
│  │ 2026-04-01  Kim's Cafe    INV-260401 RM 15.20 │   │
│  │ 2026-03-15  Pasta House   INV-260315 RM 30.00 │   │
│  │ 2026-03-01  Kim's Cafe    INV-260301 RM 15.20 │   │
│  └────────────────────────────────────────────────┘   │
│  최근 5건, View All → /referral/wallet                 │
│                                                       │
└──────────────────────────────────────────────────────┘
```

### 4-4. 월렛 (`/referral/wallet`)

```
┌──────────────────────────────────────────────────────┐
│  [Purple Logo]          Dashboard   Wallet   Profile │
├──────────────────────────────────────────────────────┤
│                                                       │
│  My Wallet                                            │
│                                                       │
│  ┌────────────────────────────────────────────────┐   │
│  │  Available Balance                              │   │
│  │  RM 125.40                                      │   │
│  │                                                  │   │
│  │  Total Earned: RM 250.00                        │   │
│  │  Total Withdrawn: RM 100.00                     │   │
│  │  Total Credit Used: RM 24.60                    │   │
│  │                                                  │   │
│  │  [Request Payout]                               │   │
│  └────────────────────────────────────────────────┘   │
│  여러 통화 잔액 → 통화별 섹션 반복                       │
│  크레딧 안내: "You can apply your balance when          │
│  paying invoices in POS."                             │
│                                                       │
│  Transaction History              [Filter: All ▾]     │
│  ┌────────────────────────────────────────────────┐   │
│  │ Date        Type           Amount      Balance │   │
│  │ 2026-04-01  Commission    +RM 15.20  RM125.40 │   │
│  │ 2026-03-20  Credit Used   -RM 30.00  RM110.20 │   │
│  │ 2026-03-15  Commission    +RM 30.00  RM140.20 │   │
│  │ 2026-03-05  Payout Paid   -RM 50.00  RM110.20 │   │
│  └────────────────────────────────────────────────┘   │
│  필터: All / Commission / Credit Used / Payout         │
│  색상: Commission=#059669 / Credit=#2563EB             │
│       Payout=#6B7280 / Adjustment=#6B7280             │
│                                                       │
│  Payout History                                       │
│  ┌────────────────────────────────────────────────┐   │
│  │ Requested   Amount     Status       Completed  │   │
│  │ 2026-03-01  RM 50.00  Paid         2026-03-05 │   │
│  └────────────────────────────────────────────────┘   │
│                                                       │
└──────────────────────────────────────────────────────┘
```

### 4-5. 지급 요청 모달

```
┌───────────────── Request Payout ─────────────────────┐
│                                                       │
│  Available Balance: RM 125.40                         │
│  Minimum Payout: RM 50.00                             │
│                                                       │
│  Payout Amount                                        │
│  [RM 125.40                                        ]  │
│  (min RM 50.00 ~ max RM 125.40)                      │
│                                                       │
│  Bank Information                                     │
│  Bank Name       [Maybank                          ]  │
│  Account Number  [1234567890                       ]  │
│  Account Holder  [Kim Irene                        ]  │
│                                                       │
│  (프로필에서 미리 저장하면 자동 표시)                     │
│                                                       │
│  {formError && <ErrorMessage>}                        │
│                      [Cancel]   [Request Payout]      │
└───────────────────────────────────────────────────────┘

유효성: Amount min~max / Bank 3필드 필수 / 진행 중 요청 있으면 차단
```

### 4-6. 크레딧 적용 모달 (기존 인보이스 상세 페이지 내)

```
┌──────────────── Apply Referral Credit ────────────────┐
│                                                        │
│  Invoice: INV-260401001                                │
│  Invoice Amount: RM 100.00                             │
│  Already Paid: RM 0.00                                 │
│  Remaining: RM 100.00                                  │
│                                                        │
│  Wallet Balance: RM 125.40                             │
│                                                        │
│  Credit Amount                                         │
│  [RM 100.00                                         ]  │
│  (max: RM 100.00)                                      │
│                                                        │
│  After applying:                                       │
│  Invoice remaining: RM 0.00                            │
│  Wallet remaining: RM 25.40                            │
│                                                        │
│                      [Cancel]    [Apply Credit]        │
└────────────────────────────────────────────────────────┘

인보이스 통화와 같은 통화 월렛에서만 차감
전액 커버 → handleInvoicePaid() → restoreSubscription + processCommission
```

### 4-7. 프로필 (`/referral/profile`)

```
┌──────────────────────────────────────────────────────┐
│  [Purple Logo]          Dashboard   Wallet   Profile │
├──────────────────────────────────────────────────────┤
│                                                       │
│  Profile                                              │
│                                                       │
│  Account Information                                  │
│  ┌────────────────────────────────────────────────┐   │
│  │  Full Name    [Kim Irene              ] Saved  │   │
│  │  Email        irene@example.com         (고정)  │   │
│  │  Phone        [+82-10-1234-5678       ] Saved  │   │
│  └────────────────────────────────────────────────┘   │
│                                                       │
│  Bank Information (for Payouts)                       │
│  ┌────────────────────────────────────────────────┐   │
│  │  Bank Name       [Maybank              ] Saved │   │
│  │  Account Number  [1234567890           ] Saved │   │
│  │  Account Holder  [Kim Irene            ] Saved │   │
│  └────────────────────────────────────────────────┘   │
│                                                       │
│  My Referral Code                                     │
│  ┌────────────────────────────────────────────────┐   │
│  │  PURPLE-A3K9                      [Copy Code]  │   │
│  └────────────────────────────────────────────────┘   │
│                                                       │
│  POS Account                                          │
│  ┌────────────────────────────────────────────────┐   │
│  │  (구독 유저) Role / Restaurant / Subscription    │   │
│  │  Go to POS Dashboard >                          │   │
│  │  (리퍼럴 파트너) Want to use POS? Subscribe >    │   │
│  └────────────────────────────────────────────────┘   │
│                                                       │
│  [Change Password]                                    │
└──────────────────────────────────────────────────────┘

AutoSaveField 적용: Name, Phone, Bank 3개 필드
```

### 4-8. 기존 가입 페이지 변경 (`/signup` — SignupPage.tsx)

```
(?ref= 있을 때 상단 배너)
┌──────────────────────────────────────────────────────┐
│  You've been referred! Get 20% off your first month  │
│  of Purple POS.                   Code: PURPLE-A3K9  │
└──────────────────────────────────────────────────────┘
배경: #635BFF, 텍스트: white, 가입 전 과정에서 유지

Step 2: Account Information — Referral Code 필드 추가 (Phone 다음, Password 전):
  Referral Code (optional)
  [PURPLE-A3K9                    ✓ Valid     ]
  20% off your first month!

동작:
- ?ref=CODE → 자동 입력 + 배너 + 안내
- 직접 입력 → 500ms debounce 후 검증
- 유효: ✓ 초록 / 무효: ✗ 빨간 / 빈 값: 정상 (optional)
- 무효여도 가입 가능 (할인만 미적용)
```

### 4-9. POS 사이드바 변경 (전 역할)

```
사이드바 하단 고정 영역:
  ├────────────────────┤
  │ Referral Program   │
  │ Balance: RM 125.40 │
  └────────────────────┘
- 클릭 → /referral/dashboard (새 탭)
- 월렛 없으면 "Start earning!" 표시
```

### 4-10. System Admin 리퍼럴 관리 (`/pos/admin/referrals`)

기존 MainLayout 사이드바에 "Referrals" 메뉴 추가.

**Overview 탭:**
- 통계 카드 3개 (Total Partners / Active Referrals / Total Paid Out)
- 월별 가입 추이 차트 + 월별 커미션 총액 차트
- 전환 퍼널: Clicks → Signups → Active
- Top 10 추천인

**Partners 탭:**
- 추천인 목록 (검색/필터/정렬)
- 행 클릭 → 상세 (추천 목록, 커미션 내역, 월렛 잔액)

**Payouts 탭:**
- 지급 요청 목록 (상태 필터)
- Approve / Mark as Paid / Reject (사유 입력 필수 → 잔액 원복 + 이메일)

**Settings (Overview 내 또는 별도 영역):**
- Commission Rate (%), First Month Discount (%)
- Min Payout (통화별), Program Active 토글
- AutoSaveField 적용

### 4-11. Landing 소개 페이지 (`/referral-program`)

기존 LandingLayout 사용. GNB에 "Referral" 메뉴 추가.

- Hero (그라데이션) + How It Works 4단계 + Why Join 4항목
- Earnings Calculator (수익 시뮬레이터: 플랜 + 추천수 → 월/연 수익)
- "Already a POS user?" → Referral Dashboard 링크

---

## 5. 기술 설계

### 5-1. DB 모델

**User 변경 (최소):**
```sql
ALTER TABLE users MODIFY COLUMN role ENUM(
  'System Admin', 'Foodcourt General', 'Brand General',
  'Foodcourt Manager', 'Brand Manager', 'Restaurant Owner',
  'Restaurant Admin', 'Staff', 'Referral Partner'
);

ALTER TABLE users
  ADD COLUMN referral_code VARCHAR(20) UNIQUE DEFAULT NULL,
  ADD COLUMN referred_by INT DEFAULT NULL,
  ADD COLUMN referral_discount_applied BOOLEAN DEFAULT FALSE,
  ADD COLUMN bank_name VARCHAR(100) DEFAULT NULL,
  ADD COLUMN bank_account_number VARCHAR(50) DEFAULT NULL,
  ADD COLUMN bank_account_holder VARCHAR(100) DEFAULT NULL,
  ADD INDEX idx_referral_code (referral_code),
  ADD INDEX idx_referred_by (referred_by);
```

**ReferralWallet** (유저 x 통화별 1개):
```
user_id + currency → UNIQUE
balance, total_earned, total_withdrawn, total_credited (DECIMAL 10,2)
```

**ReferralCommission:**
```
referrer_id, referred_id, invoice_id (invoice_id + referrer_id UNIQUE)
invoice_amount, commission_rate(%), commission_amount, currency
status: credited / cancelled
```

**ReferralWalletTransaction:**
```
wallet_id, type (commission / credit_used / payout / adjustment)
amount (+/-), balance_after, reference_type, reference_id, description
```

**ReferralPayout:**
```
user_id, amount, currency
bank_name, bank_account_number, bank_account_holder
status: requested / approved / paid / rejected
reviewed_by, reviewed_at, paid_at, reject_reason
```

**ReferralClick:**
```
referral_code, ip_address, user_agent, source
converted (BOOLEAN), converted_at
```

**ReferralSettings** (단일 레코드):
```
commission_rate (%), first_month_discount (%)
min_payout_amounts (JSON: {"MYR":50, "KRW":50000, ...})
program_active (BOOLEAN)
```

### 5-2. API 엔드포인트

**인증 (auth.js 확장):**
```
POST /api/auth/referral-signup         리퍼럴 파트너 가입 (role 고정, 플랜 불필요)
```

**공개 API (인증 불필요):**
```
GET  /api/referrals/validate-code?code=  코드 유효성 검증 (이름 이니셜만 반환)
POST /api/referrals/track-click          링크 클릭 추적
```

**리퍼럴 대시보드 (authenticateToken):**
```
GET  /api/referrals/my-code              내 코드 조회 (없으면 자동 생성)
GET  /api/referrals/dashboard            대시보드 통계
GET  /api/referrals/referrals            추천 목록 (페이지네이션)
GET  /api/referrals/commissions          커미션 내역 (페이지네이션)
```

**월렛 (authenticateToken):**
```
GET  /api/referrals/wallet               잔액 (통화별)
GET  /api/referrals/wallet/transactions  트랜잭션 내역 (필터/페이지네이션)
POST /api/referrals/wallet/apply-credit  인보이스 크레딧 적용
```

**지급 (authenticateToken):**
```
POST /api/referrals/payouts              지급 요청
GET  /api/referrals/payouts              내 지급 내역
```

**프로필 (authenticateToken):**
```
GET  /api/referrals/profile              프로필 조회
PATCH /api/referrals/profile             프로필 수정 (AutoSaveField)
```

**System Admin (authenticateToken + requireRole):**
```
GET  /api/referrals/admin/overview       전체 통계
GET  /api/referrals/admin/partners       추천인 목록
GET  /api/referrals/admin/partners/:id   추천인 상세
GET  /api/referrals/admin/payouts        지급 요청 목록
PUT  /api/referrals/admin/payouts/:id    지급 승인/거절/완료
GET  /api/referrals/admin/settings       리퍼럴 설정
PUT  /api/referrals/admin/settings       설정 수정
```

### 5-3. 기존 코드 변경 포인트 & 주의사항

| 파일 | 변경 | 주의사항 |
|------|------|---------|
| **models/User.js** | role ENUM + 6개 필드 | ENUM 변경 시 ALTER TABLE 필요 |
| **models/index.js** | 신규 모델 6개 association | 기존 association 건드리지 않음 |
| **routes/auth.js** | referral-signup 추가, signup에 referral_code 처리 | 기존 signup 로직 변경 없음, referred_by 저장만 추가 |
| **services/authService.js** | referred_by 저장, BG/FG/Owner는 discountOptions 전달 | restaurant.discount 필드 절대 건드리지 않음 |
| **services/invoiceScheduler.js** | createSubscriptionInvoice: referred_by 확인 후 할인 직접 적용, createEntitySubscriptionInvoice: discountOptions 파라미터 추가 (기본 null) | 기존 restaurant.discount 로직은 그대로 유지, 리퍼럴 할인은 별도 경로 |
| **routes/invoices.js** | paid 처리 시 handleInvoicePaid() 공통 함수 추출 | 기존 restoreSubscription 호출 포함, referralService 추가 |
| **services/authService.js (login)** | Referral Partner 구독 체크 스킵 | 기존 역할 로직 변경 없음, 분기 추가만 |
| **server.js** | referrals 라우트 등록 | 기존 라우트 순서 변경 없음 |
| **ProtectedRoute.tsx** | 'Referral Partner' 리다이렉트 분기 추가 | 기존 역할 분기에 case 추가만 |
| **AuthContext.tsx** | ROLE_PERMISSIONS/ROLE_ROUTES에 'Referral Partner' 추가 | 기존 역할 배열 수정 없음 |
| **App.tsx** | /referral/* 라우트 + PosRootRedirect에 RP 분기 | public 라우트 영역에 추가, PosRootRedirect에 case 추가 |
| **SignupPage.tsx** | Step 2에 Referral Code 필드 + URL ?ref= + 배너 | FormGrid에 필드 추가만, 기존 필드 변경 없음 |
| **LandingHeader.tsx** | GNB에 "Referral" 메뉴 | 기존 메뉴 변경 없음 |
| **MainLayout.tsx** | 사이드바 하단 리퍼럴 링크 + SA 메뉴에 "Referrals" | SidebarFooter 전에 고정 영역 추가, 기존 메뉴 변경 없음 |

### 5-4. 신규 파일

```
백엔드:
  models/ReferralWallet.js
  models/ReferralCommission.js
  models/ReferralWalletTransaction.js
  models/ReferralPayout.js
  models/ReferralClick.js
  models/ReferralSettings.js
  routes/referrals.js
  services/referralService.js

프론트엔드:
  components/Referral/ReferralLayout.tsx
  components/Referral/ReferralAuthLayout.tsx
  pages/Referral/ReferralLoginPage.tsx
  pages/Referral/ReferralSignupPage.tsx
  pages/Referral/ReferralDashboardPage.tsx
  pages/Referral/ReferralWalletPage.tsx
  pages/Referral/ReferralProfilePage.tsx
  pages/Landing/ReferralLandingPage.tsx
  pages/Admin/ReferralManagementPage.tsx
```

### 5-5. 다중 통화 처리

```
월렛: user_id + currency UNIQUE (유저당 여러 통화 월렛 가능)
  MYR 피추천인 결제 → 추천인 MYR 월렛에 적립
  KRW 피추천인 결제 → 추천인 KRW 월렛에 적립
  환율 변환 없음 (통화별 독립)

크레딧 적용: 인보이스 통화와 같은 월렛에서만 차감
지급 요청: 통화별로 요청
대시보드: 여러 통화면 통화별 섹션 표시
```

### 5-6. 보안

| 항목 | 적용 |
|------|------|
| 인증 | 모든 API에 authenticateToken (공개 2개 제외) |
| Admin 권한 | admin API에 requireRole('System Admin') |
| 소유권 | 월렛/지급은 본인 것만 조회/수정 |
| 금액 조작 | 서버에서 잔액 재계산 (프론트 금액 신뢰 안 함) |
| 중복 커미션 | invoice_id + referrer_id UNIQUE 제약 |
| 동시 요청 | DB 트랜잭션 + SELECT FOR UPDATE |
| Rate Limit | track-click IP당 분 10회, validate-code IP당 분 30회 |

### 5-7. 이메일 알림 7종

| 이벤트 | 수신 | 내용 |
|--------|------|------|
| 리퍼럴 파트너 가입 | 가입자 | 환영 + 코드 안내 |
| 피추천인 가입 | 추천인 | "{Business} 가입. 유료 전환 시 커미션 적립" |
| 커미션 발생 | 추천인 | "{Business} 결제. {amount} 적립!" |
| 지급 요청 | System Admin | "{Partner}이 {amount} 지급 요청" |
| 지급 승인 | 요청자 | "승인됨. 곧 송금" |
| 지급 완료 | 요청자 | "{amount} 송금 완료" |
| 지급 거절 | 요청자 | "거절됨. 사유: {reason}" |

NOTIFICATION_CATEGORIES에 'referral_commission', 'referral_payout' 추가.

---

## 6. 기존 코드 충돌 방지 — 검증 완료

### 충돌 1: Restaurant 할인 필드
- **문제**: restaurant.discount_type/value는 Admin 수동 할인용. 리퍼럴이 덮어쓰면 기존 할인 소실 + 매월 반복 적용
- **해결**: restaurant.discount 필드 사용 안 함. invoiceScheduler에서 referred_by + referral_discount_applied 확인 후 인보이스에 직접 할인 적용

### 충돌 2: Referral Partner 로그인 리다이렉트
- **문제**: PosRootRedirect에 RP case 없으면 /pos/manager로 잘못 이동
- **해결**: PosRootRedirect + ProtectedRoute에 'Referral Partner' → /referral/dashboard 분기 추가

### 충돌 3: 크레딧 결제 시 restoreSubscription
- **문제**: 인보이스 paid → restoreSubscription 자동 호출, 별도 경로로 처리하면 누락
- **해결**: handleInvoicePaid() 공통 함수 추출, 모든 paid 경로에서 호출

### 충돌 4: createEntitySubscriptionInvoice 할인 미지원
- **문제**: Brand/Foodcourt/Owner 인보이스에 할인 필드 하드코딩 0
- **해결**: discountOptions 옵션 파라미터 추가 (기본 null → 기존 동작 유지, 하위 호환)

### 충돌 5: EntityPlanRestaurant 할인과의 관계
- **검증**: 리퍼럴 할인은 POS 구독(system_admin) 인보이스만 대상. Brand/Foodcourt 플랜 인보이스와 무관. 충돌 없음.

### 충돌 없는 영역 (확인 완료)
- 이메일 인증: 역할 무관 동작
- SignupPage: FormGrid 필드 추가 안전
- App.tsx: public 라우트 영역 추가 안전
- server.js: /api/referrals 경로 충돌 없음
- AuthContext: 기존 역할 배열 수정 없이 추가만
- MainLayout: 역할별 독립 렌더링, 추가 안전
- AutoSaveField: 기존 패턴 재사용

---

## 7. 엣지 케이스

| 상황 | 처리 |
|------|------|
| 피추천인 구독 해지 | 커미션 중단 (새 인보이스 없으므로), 기존 적립분 유지 |
| 피추천인 재구독 | 커미션 재발생 (referred_by 관계 유지) |
| 인보이스 취소 | 적립된 커미션 cancelled 처리, 잔액 차감 |
| 자기 자신 추천 | 차단 (프론트 + 백엔드) |
| 연간 결제 | 연간 결제 금액의 15% |
| 플랜 업/다운그레이드 | 변경된 금액 기준 |
| Admin 커미션율 변경 | 이후 새 커미션만 적용 (소급 불가) |
| 크레딧으로 결제 | 정상적으로 커미션 발생 (결제 수단 무관) |
| 추천인 계정 삭제 | 잔액 정산 전 삭제 차단 |
| Admin 수동 할인 + 리퍼럴 할인 동시 | 둘 다 적용 (독립 경로) |
| 리퍼럴 파트너 → POS 전환 | Phase 1: 별도 가입 안내, Phase 2~3: role 업그레이드 |
| 지급 중복 요청 | 진행 중(requested/approved) 있으면 새 요청 차단 |

---

## 8. 구현 계획

### Phase 1: 핵심 시스템
1. DB 모델 6개 생성 + User 변경 + sync-database
2. referralService.js (코드 생성, 커미션 계산, 크레딧 적용)
3. routes/referrals.js (공개 API + 대시보드 + 월렛 + 지급 + 프로필)
4. auth.js 확장 (referral-signup + 기존 signup에 referral_code 처리)
5. authService.js 수정 (referred_by 저장, login에 RP 스킵)
6. invoiceScheduler.js 수정 (첫 인보이스 리퍼럴 할인, createEntitySubscriptionInvoice discountOptions)
7. invoices.js 수정 (handleInvoicePaid 공통 함수 + processCommission)
8. ReferralLayout + ReferralAuthLayout
9. ReferralSignupPage (수익 시뮬레이터 포함)
10. ReferralLoginPage
11. ReferralDashboardPage
12. ReferralWalletPage + 지급 요청 모달
13. ReferralProfilePage (AutoSaveField)
14. SignupPage 수정 (referral_code 필드 + URL ?ref= + 배너)
15. App.tsx 라우트 + PosRootRedirect RP 분기
16. AuthContext + ProtectedRoute에 RP 추가

### Phase 2: 관리 + 크레딧
17. System Admin ReferralManagementPage (Overview/Partners/Payouts/Settings)
18. SA 사이드바에 Referrals 메뉴 추가
19. 크레딧 적용 (기존 인보이스 페이지에 "Apply Referral Credit" 버튼 + 모달)
20. 지급 거절 시 잔액 원복 로직

### Phase 3: 마케팅 + 알림
21. Landing ReferralLandingPage (/referral-program)
22. GNB에 Referral 메뉴 추가 (LandingHeader)
23. POS 사이드바 하단 리퍼럴 링크 (전 역할)
24. 이메일 알림 7종 + NOTIFICATION_CATEGORIES
25. 클릭 추적 + 전환율 통계
