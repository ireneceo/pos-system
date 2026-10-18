# 마케팅 추적 설계 — GTM · GA4 · Meta Pixel · Search Console (PurpleHere)

> 2026-10-17 · Fable 설계 (리더) · 구현 = Opus(개발서버 코드만) · 외부 관리 화면·ID 발급·게시 = Irene
> 적용 범위: **공개 마케팅 사이트(purplehere.com 랜딩·블로그·가입·문의)만.** POS·KDS·손님 모바일 주문·관리자 화면 안쪽은 추적하지 않는다(SEO_OPERATIONS 와 같은 경계).
> 이 문서는 `docs/MARKETING_TRACKING.md` 로 옮긴다(1문서 1주제 · SEO_OPERATIONS 는 검색 노출, 이 문서는 «측정»). GTM 컨테이너 가져오기 파일은 `docs/gtm-container-purplehere.json`.

---

## 0. 결론 먼저 — «안 한 것» 판정 (Irene 질문에 대한 답)

| 항목 | 지금 | 판정 |
|---|---|---|
| GA4 | gtag.js 직접 삽입(`G-LTTLKH1J85`), 페이지뷰만. 커스텀 이벤트 0. **개발서버 트래픽이 운영 속성에 섞임.** POS·KDS·모바일 주문 화면에서도 로드됨(index.html 하나). | **반쯤 됨** — 전환 측정 없음 · 개발/운영 미분리 · 범위 과다 |
| GTM | 없음 | **안 함** |
| Meta Pixel | 없음. 개인정보처리방침에 광고·마케팅 쿠키 항목 없음. | **안 함** |
| Search Console | 운영 DNS 에 `google-site-verification` TXT 있음 → 도메인 속성은 인증된 것으로 보임. sitemap 제출·GA4 연결·소유 계정 = 관리 화면이라 이 방에서 확인 불가. SEO_OPERATIONS «10-15 전후 재판독» 아직 안 함. | **확인 필요(Irene 화면)** — 코드 쪽 할 일 없음 |

덧붙여 실측에서 나온 결함 2개(이번 작업 안에서 같이 고친다):
- **동의 배너가 `/referral-program`(공개 랜딩)에서 안 뜬다** — `startsWith('/referral')` 이 `/referral-program` 까지 잡는다(CookieConsentBanner.tsx 125). 아래 §3 의 «마케팅 경로 목록» 하나로 배너·추적 둘 다 판정하면 사라진다.
- **개발 사이트에 noindex 장치가 코드·nginx 어디에도 없다**(SEOHead 에 hostname 판정 없음 · dev nginx 에 X-Robots-Tag 없음 · 응답 헤더 실측 없음 · robots.txt 는 운영과 같은 «Allow /»). SEO_OPERATIONS 는 «개발 사이트의 noindex 는 정상 설정» 이라고 적혀 있으나 실물이 없다. **이 작업 범위 밖** — Cloudflare 쪽 설정은 확인 불가. SEO 작업으로 따로 올린다(아래 §9).

---

## 1. 구조 결정 (Fable)

**결정 1 — 태그는 GTM 한 길로.** 코드는 «dataLayer 에 사실을 올리는 일» 만 하고, GA4·Meta Pixel 은 전부 GTM 안의 태그다. index.html 의 gtag.js 직접 삽입은 **제거**한다(GTM 이 GA4 를 대신 로드). 이유: 이후 태그 추가·수정이 배포 없이 GTM 게시로 끝나고, Irene 의 «발행·게시 전 목록 승인» 이 GTM 워크스페이스 단위로 자연스럽게 된다.

**결정 2 — GTM 은 React 쪽에서, 마케팅 경로에서만 로드.** index.html 에 넣지 않는다. 이유 두 가지: ① index.html 은 SPA 단 하나의 HTML 이라 POS·KDS·손님 주문 화면까지 로드된다(지금 gtag 가 그렇다 — 직원·손님 화면에 광고 픽셀이 실릴 이유가 없고, 오프라인 PWA 에 외부 스크립트가 늘어난다). ② «마케팅 경로가 무엇인가» 는 목록 하나(`utils/tracking.ts`)에만 두고, 배너 표시·GTM 로드·페이지뷰 세 곳이 같은 함수를 쓴다(목록 두 벌 금지). dataLayer 는 GTM 이 뒤늦게 로드돼도 앞서 쌓인 항목을 그대로 처리하므로 React 마운트 뒤 로드해도 페이지뷰가 빠지지 않는다.

**결정 3 — 개발/운영은 같은 컨테이너·같은 GA4 속성, `environment` 값으로 가른다.** 빌드가 개발·운영 **같은 명령·같은 .env** 로 돈다(deploy-to-production.sh 577 이 `npm run build:dev` 를 부름) → 빌드 시점 env 로는 못 가른다. 런타임 hostname 으로 `production`(purplehere.com · www.purplehere.com) / `development`(그 외 전부) 를 dataLayer 첫 항목에 올리고:
- GA4 태그: 둘 다 쏘되 development 면 `debug_mode: true` → GA4 관리에서 **«개발자 트래픽» 데이터 필터를 활성**(Irene) 하면 보고서에서 빠지고 DebugView 에서는 보인다. 두 번째 GA4 속성을 만들지 않는다(관리 늘고, 개발 검증은 DebugView 로 충분).
- Meta Pixel: `environment == production` **또는 GTM 미리보기(Debug Mode)** 일 때만. 개발 사이트 일상 트래픽은 Meta 에 안 간다. 미리보기로 Irene 이 개발서버에서 픽셀 발화를 눈으로 확인할 수 있다.

**결정 4 — 동의(Consent Mode v2)는 지금 모델을 유지하고 Meta 만 더 엄격.** index.html 의 기본값 denied 블록과 `gtag()` 심은 **그대로 둔다**(GTM 보다 먼저 있어야 하고, 동의 명령은 dataLayer 로 들어가 GTM 이 읽는다). GA4 = 지금처럼 동의 전 쿠키 없는 핑(advanced consent mode). **Meta Pixel 은 `ad_storage` 가 granted 가 된 뒤에만 로드**(Meta 는 쿠키 없는 모드가 없다). 배너에서 «모두 수락» 을 누른 뒤에도 픽셀이 뜨도록 동의 갱신 때 `cookie_consent` 이벤트를 올려 GTM 이 다시 평가하게 한다.

**결정 5 — Meta 에 개인정보를 보내지 않는다.** 고급 매칭(이메일·전화 해시) 끄기, Conversions API(서버 전송) 안 함. 말레이시아 PDPA·현재 방침 범위에서 «쿠키 동의 + 브라우저 픽셀» 까지만. 나중에 광고를 실제로 집행하며 매칭률이 문제 되면 그때 별건.

**결정 6 — 이벤트 이름은 GA4 권장 이름을 그대로 dataLayer 이벤트명으로 쓴다**(`sign_up`·`generate_lead`·`page_view`). GTM 에서 이름을 다시 매핑하지 않는다 — 코드·GTM·GA4 보고서가 같은 단어를 쓴다. Meta 표준 이벤트로의 대응은 GTM 태그 안에서만.

**결정 7 — 1차 구현 범위는 «전환 + 페이지뷰 + 동의» 7개 이벤트.** CTA 클릭·언어 전환·다운로드 클릭은 2차(§4-2). 이유: 1차는 승인·검증 표면을 작게 — 전환 지점은 코드가 이미 success 분기 한 줄씩이라 위험이 낮다.

Fable 게이트: `check-sensitive-diff.js` 분류상 대상 아님(돈·보안·운영 마이그·🔒 보호파일 무접촉). 구현 뒤 **자체 검증 수치**(§7)로 끝낸다. 단 **GTM 게시 목록(§5)은 Irene 승인 뒤에만 게시** — 이것이 Irene 원문의 승인 지점이다.

---

## 2. 전체 흐름 (누가 · 언제)

```
[Irene] GTM 계정·컨테이너(Web) 생성 → GTM-ID 를 이 방에 답
   ↓
[Opus] 코드 구현(§3) · 개발 빌드 1회 · dataLayer 자체 검증(§7) · GTM 가져오기 JSON 작성(§5)
   ↓
[Irene] GTM 관리 → 컨테이너 가져오기(JSON · 새 워크스페이스 · «덮어쓰기») → 상수 변수에 Meta Pixel ID 입력
        → «미리보기» 로 dev.purplehere.com 열고 §5 목록대로 태그 발화 확인
   ↓
[Irene] §4·§5 목록 승인 → GTM «제출 → 게시»   ← 운영 코드 배포보다 **먼저**
   ↓
[배포 방] 다음 정기 배포에 코드 반영 (전제조건: GTM 게시 완료 — 아니면 운영 GA4 가 멈춘다)
   ↓
[Irene] GA4 관리 4개 · Meta 도메인 인증 · Search Console 확인(§6)
```

GTM 컨테이너를 운영 코드보다 먼저 게시해도 해롭지 않다(운영 HTML 에 아직 스니펫이 없으면 아무것도 안 돈다). 반대로 코드가 먼저 나가면 gtm.js 가 404 → 게시 전까지 GA4 페이지뷰가 끊긴다. 그래서 순서를 고정한다.

---

## 3. 코드 설계 (Opus 구현 — 그대로)

### 3-1. 새 파일 `dev-frontend/src/utils/tracking.ts` (단일 소스)

```ts
export const GTM_CONTAINER_ID = 'GTM-XXXXXXX';   // Irene 발급 값으로 교체. 코드에 들어가는 외부 ID 는 이것 하나.

export type TrackingEnv = 'production' | 'development';
export function getTrackingEnv(): TrackingEnv
  // hostname 이 'purplehere.com' | 'www.purplehere.com' → production, 그 외(dev.·localhost·앱 WebView) → development

// 마케팅(공개) 경로 — 배너 표시·GTM 로드·page_view 세 곳이 이 함수 하나를 쓴다.
// App.tsx 공개 라우트 538~575 기준. 앱 화면(/pos·/restaurant·/kitchen·/customer-display·/mobile·/mobile-order·
// /referral/dashboard|wallet|profile·/dev-login·/notification-preferences·/login)은 포함하지 않는다 → 허용목록.
export const MARKETING_PATHS = {
  exact:  ['/', '/install', '/about', '/features', '/service', '/pricing', '/packages', '/contact', '/demo',
           '/signup', '/forgot-password', '/reset-password', '/company', '/privacy', '/account-deletion',
           '/terms', '/faq', '/referral-program', '/blog', '/docs', '/download', '/news',
           '/verify-email', '/referral/signup', '/referral/login'],
  prefix: ['/blog/', '/news/', '/docs/', '/shop/'],
};
export function isMarketingPath(pathname: string): boolean

export function ensureGtm(): void
  // 1회만. dataLayer.push({ environment: getTrackingEnv(), site_language: i18n 현재 언어 2자 }) 뒤
  // 표준 GTM 스니펫(gtm.start + script 삽입). 이미 로드됐거나 GTM_CONTAINER_ID 가 'GTM-XXXXXXX' 그대로면 아무것도 안 함.

export function track(event: string, params?: Record<string, string|number|boolean|undefined>): void
  // window.dataLayer.push({ event, ...params }) — undefined 값은 빼고. GTM 미로드여도 배열 push 는 무해.
  // 개인정보(이름·이메일·전화·주소·회사명) 는 절대 넣지 않는다 — 호출부가 아니라 여기서 키 블랙리스트로 한 번 더 걸러 drop.

export type ConsentChoice = 'accept_all' | 'essential_only';
export function setConsent(choice: ConsentChoice): void
  // localStorage 'cookie_consent_accepted' = 'true' | 'essential_only' (키·값 그대로 — 기존 방문자 선택 유지)
  // window.gtag('consent','update', { analytics_storage/ad_storage/ad_user_data/ad_personalization: granted|denied 4개 전부 })
  // track('cookie_consent', { consent_choice: choice })   ← GTM 이 Meta 픽셀을 이 이벤트로 다시 평가
export function restoreConsent(): void
  // 저장값 'true' 면 granted 4개 update 만(이벤트 없음) — 지금 배너 useEffect 의 복원 블록을 옮긴 것
```

### 3-2. `public/index.html`
- 19~23줄(gtag.js `<script async src=…G-LTTLKH1J85>` + `gtag('js')`·`gtag('config')`) **삭제**.
- 8~18줄 Consent Mode 기본값 블록(`dataLayer` 초기화 + `gtag` 심 + `consent default`)은 **그대로**. 주석 한 줄: «GTM 은 utils/tracking.ts 가 마케팅 경로에서만 로드 — 여기 넣지 말 것».
- `/seo-html` 크롤러용 HTML 은 이 파일을 템플릿으로 쓰므로 자동으로 같아진다(SEO_OPERATIONS §5-1 의 «gtag 막히지 않게» 주석은 «dataLayer/consent 스크립트» 로 문구만 맞춘다 — 헤더 규칙 자체는 그대로).

### 3-3. `components/Common/PageViewTracker.tsx` (새 컴포넌트, App.tsx 522 `<CookieConsentBanner />` 옆에 1줄)
- `useLocation()` 의 `pathname` 이 바뀔 때마다: `isMarketingPath` 아니면 아무것도 안 함. 맞으면 `ensureGtm()` → `setTimeout(150ms)` 뒤 `track('page_view', { page_path, page_location: href, page_title: document.title, page_language })`. (150ms 는 Helmet 이 제목을 바꾼 뒤 읽기 위함 — GA4 에 제목이 조금 늦게 들어가도 무방.)
- 같은 pathname 연속 두 번은 한 번만(쿼리만 바뀌는 /blog?page=2 는 새 페이지뷰 아님).
- 첫 진입(새로고침·직접 접속)도 같은 effect 로 1회.

### 3-4. `CookieConsentBanner.tsx`
- `isPosRoute` 7줄 → `!isMarketingPath(location.pathname)`. (이로써 `/referral-program` 결함 해소. `/login`·`/dev-login`·`/notification-preferences` 에선 배너가 안 뜨게 되는데 거기선 추적도 없으니 맞다.)
- `handleAccept` → `setConsent('accept_all')`, `handleDecline` → `setConsent('essential_only')`, useEffect 복원 → `restoreConsent()`. gtag 직접 호출 3군데 제거(한 곳으로).
- 문구 `cookie.message` 4개 언어: «analyze site traffic» → «analyze site traffic and measure our marketing (Google Analytics, Meta Pixel)». 버튼·키 이름은 그대로.

### 3-5. 전환 지점 — 각 success 분기에 `track()` 1줄 (PII 없음)

| 파일:줄(실측) | 조건 | 이벤트 · 파라미터 |
|---|---|---|
| `Landing/SignupPage.tsx` handleSubmit, `clearDraft()` 직후(두 분기 공통, 674 앞) | POST /api/auth/signup 2xx | `sign_up` { method:'email', account_type: roleKey(form.role), plan_id, billing_cycle, currency, has_referral: !!form.referral_code } |
| `Referral/ReferralSignupPage.tsx` 462 `setSuccess` 직전 | POST /api/auth/referral-signup 2xx | `sign_up` { method:'email', account_type:'referral_partner', has_referral: !!referralCode } |
| `Login/VerifyEmailPage.tsx` 50 `setStatus('success')` 분기만(already 제외) | 인증 성공 | `email_verified` {} |
| `Landing/ContactPage.tsx` 365 `setSuccess(true)` 직전(폼 초기화 전에 값을 읽는다) | POST /api/public/contact 2xx | `generate_lead` { lead_type:'contact', inquiry_type, interested_plan } |
| `Landing/PackagesPage.tsx` 1320 `setQuoteSubmitted(true)` 직전 | POST /api/public/hardware-quotes 2xx | `generate_lead` { lead_type:'hardware_quote', value: totalAmount, currency:'MYR', plan_id, package_name: selectedPackage.name } |
| `Landing/DemoPage.tsx` 313 `navigate(...)` 직전 | demo-login 2xx | `try_demo` { demo_account: account.key } |
| `tracking.ts setConsent` | 배너 버튼 | `cookie_consent` { consent_choice } |

`roleKey` = 'Restaurant Admin'→`restaurant`, 'Brand General'→`brand`, 'Foodcourt General'→`foodcourt`, 'Restaurant Owner'→`owner`, 'Supplier Admin'→`supplier` (tracking.ts 안의 작은 맵). `currency` 는 가입 폼의 selectedCurrency 코드(MYR 등 — 저장=코드 규칙과 같음).

### 3-6. 개인정보처리방침 + 데이터 안전 문서
- `public/locales/{en,ko,zh,ms}/landing.json` `privacyPolicyPage.*` 쿠키 절에 항목 1개 추가: **Marketing cookies (Meta Pixel)** — «광고 효과 측정에 쓰며, 쿠키 동의 «모두 수락» 을 눌렀을 때만 설정된다. Google Analytics 는 분석 쿠키 항목에 이름을 밝힌다.» + 철회 방법 한 줄(브라우저에서 이 사이트 쿠키 삭제 → 배너가 다시 뜸). `PrivacyPolicyPage.tsx` 335 아래 `<ListItem>` 1개. (영문 원문 Opus 작성 → ko/zh/ms 번역 · `npm run i18n:verify`.)
- `mobile-app/store/data-safety.md` 21줄 근거 경로를 `utils/tracking.ts`(마케팅 경로에서만, /pos 앱 화면은 미로드) 로 고친다 — 신고 내용(선택·동의·Analytics)은 그대로.

### 3-7. 건드리지 않는 것
- 🔒 인쇄·KDS 보호파일 8개 — 무접촉. `index.html` 수정은 보호 대상 아니지만 모든 화면이 읽는 파일이므로 **mount sweep 필수**(§7).
- `seoPages.js`·sitemap·robots·nginx·Cloudflare — 이번 작업 무관.
- `/api/referrals/track-click`(자체 집계) — 그대로. GA4 와 역할이 다르다(수당 정산 근거).

---

## 4. 이벤트 설계 (사이트 구조 → 측정)

### 4-1. 1차(이번 구현) — 7개

깔때기: `page_view`(랜딩·요금·기능·블로그) → `try_demo` / `select_plan`(2차) → `sign_up` → `email_verified` → (유료 전환은 앱 안 청구서 결제 = 브라우저 밖, 이번 범위 아님)
리드: `generate_lead`(문의 · 하드웨어 견적)

| GA4 이벤트 | 뜻 | 파라미터(이벤트 범위) | Meta Pixel 대응 | GA4 «주요 이벤트(전환)» |
|---|---|---|---|---|
| `page_view` | 마케팅 페이지 보기(SPA 이동 포함) | page_path · page_location · page_title · page_language | `PageView` | — |
| `sign_up` | 계정 가입 제출 성공(이메일 인증 대기 포함) | method · account_type · plan_id · billing_cycle · currency · has_referral | `CompleteRegistration` { content_name: account_type, status: 'pending_verification' } | ✔ |
| `email_verified` | 가입 이메일 인증 완료 | — | — | ✔ |
| `generate_lead` | 문의 보내기 / 하드웨어 견적 요청 | lead_type · inquiry_type · interested_plan · value · currency · plan_id · package_name | `Lead` { content_category: lead_type, value, currency } | ✔ |
| `try_demo` | 데모 계정으로 들어감 | demo_account | 맞춤 `TryDemo` { content_name: demo_account } | ✔ |
| `cookie_consent` | 배너 선택(수락률 측정) | consent_choice | — | — |
| (자동) scroll · click(외부 링크) · file_download | GA4 향상된 측정이 처리 | — | — | — |

GA4 맞춤 측정기준 등록(Irene · 관리 → 맞춤 정의, 이벤트 범위 7개): `account_type` `plan_id` `billing_cycle` `lead_type` `inquiry_type` `interested_plan` `demo_account` + `page_language` `consent_choice` (총 9, 한도 50). 등록 전엔 보고서에 안 보여도 데이터는 쌓인다.

### 4-2. 2차(데이터 본 뒤 · 별도 승인) — 코드 위치만 적어 둔다
| 이벤트 | 위치 | 파라미터 |
|---|---|---|
| `select_plan` | PricingPage 865 «Start free trial» 클릭 | plan_id · plan_target(activeTab) |
| `cta_click` | Home 199/202 · Features 778 · About 387/463/469 · FAQ 401 · Demo 381 · Contact 604 · ShopCatalog 225 | cta_location(page.section) · cta_target(경로) |
| `language_change` | LanguageSelector 40 | from · to |
| `app_download` | DownloadPage 스토어/APK 링크 | platform |
| «쿠키 설정 다시 열기» 푸터 링크 | Footer | (철회 경로 — PDPA 친절) |

---

## 5. GTM 컨테이너 구성 — **Irene 승인 목록** (게시 전 이 표대로)

Opus 가 `docs/gtm-container-purplehere.json`(GTM «컨테이너 가져오기» 형식)로 만든다. Irene 은 가져온 뒤 이 표와 대조한다. 폴더 이름 `PurpleHere`.

**변수(Variables)**
| 이름 | 종류 | 값 |
|---|---|---|
| `const - GA4 measurement id` | 상수 | `G-LTTLKH1J85` |
| `const - Meta pixel id` | 상수 | `REPLACE_ME` → Irene 이 Events Manager 픽셀 ID 로 교체 |
| `dl - environment` | 데이터 영역 변수 | `environment` |
| `dl - page_path` `dl - page_location` `dl - page_title` `dl - page_language` | 데이터 영역 변수 | 각 키 |
| `dl - account_type` `dl - plan_id` `dl - billing_cycle` `dl - currency` `dl - has_referral` `dl - method` | 〃 | 〃 |
| `dl - lead_type` `dl - inquiry_type` `dl - interested_plan` `dl - value` `dl - package_name` | 〃 | 〃 |
| `dl - demo_account` `dl - consent_choice` | 〃 | 〃 |
| `js - is production` | 맞춤 JS | `{{dl - environment}} === 'production'` |
| `js - ga4 debug_mode` | 맞춤 JS | production 이면 `undefined`, 아니면 `true` |
| 기본 제공 `Debug Mode` · `Event` 켜기 | 내장 | — |

**트리거(Triggers)**
| 이름 | 종류 | 조건 |
|---|---|---|
| `Init - All Pages` | 초기화 | 전체 |
| `CE - page_view` | 맞춤 이벤트 `page_view` | — |
| `CE - sign_up` / `CE - email_verified` / `CE - generate_lead` / `CE - try_demo` / `CE - cookie_consent` | 맞춤 이벤트 각 이름 | — |
| `CE - meta base load` | 맞춤 이벤트 정규식 `^(page_view\|cookie_consent)$` | 조건: `js - is production` equals true **또는** `Debug Mode` equals true |

**태그(Tags)** — 동의 설정은 «고급 → 동의 설정»
| 이름 | 종류 | 트리거 | 동의 |
|---|---|---|---|
| `GA4 - Config` | Google 태그 · ID `{{const - GA4 measurement id}}` · 구성: `send_page_view=false` · `debug_mode={{js - ga4 debug_mode}}` | `Init - All Pages` | 기본 제공(analytics_storage) |
| `GA4 - page_view` | GA4 이벤트 `page_view` · page_location/page_title/page_language | `CE - page_view` | 기본 제공 |
| `GA4 - sign_up` | GA4 이벤트 `sign_up` · method/account_type/plan_id/billing_cycle/currency/has_referral | `CE - sign_up` | 기본 제공 |
| `GA4 - email_verified` | GA4 이벤트 `email_verified` | `CE - email_verified` | 기본 제공 |
| `GA4 - generate_lead` | GA4 이벤트 `generate_lead` · lead_type/inquiry_type/interested_plan/value/currency/plan_id/package_name | `CE - generate_lead` | 기본 제공 |
| `GA4 - try_demo` | GA4 이벤트 `try_demo` · demo_account | `CE - try_demo` | 기본 제공 |
| `GA4 - cookie_consent` | GA4 이벤트 `cookie_consent` · consent_choice | `CE - cookie_consent` | 기본 제공 |
| `Meta - Base + PageView` | 맞춤 HTML(표준 fbq 스니펫 + `fbq('init', '{{const - Meta pixel id}}')` + `fbq('track','PageView')`) · **페이지당 1회** · 고급 매칭 없음 | `CE - meta base load` | **추가 동의 확인: `ad_storage` 필요** |
| `Meta - PageView (SPA)` | 맞춤 HTML `fbq('track','PageView')` · 태그 순서: `Meta - Base` 뒤 | `CE - page_view`(단 첫 page_view 는 Base 가 이미 보냄 → 조건 `js - is production or Debug` 동일) | ad_storage |
| `Meta - CompleteRegistration` | 맞춤 HTML `fbq('track','CompleteRegistration',{content_name:{{dl - account_type}},status:'pending_verification'})` | `CE - sign_up` + (production or Debug) | ad_storage |
| `Meta - Lead` | 맞춤 HTML `fbq('track','Lead',{content_category:{{dl - lead_type}},value:{{dl - value}},currency:{{dl - currency}}})` | `CE - generate_lead` + (production or Debug) | ad_storage |
| `Meta - TryDemo` | 맞춤 HTML `fbq('trackCustom','TryDemo',{content_name:{{dl - demo_account}}})` | `CE - try_demo` + (production or Debug) | ad_storage |

Meta 태그 전부: «태그 순서 → `Meta - Base + PageView` 가 먼저 실행» + «`Meta - Base` 가 실패·일시중지면 실행 안 함». Meta 이벤트 태그는 `fbq` 가 없으면 아무것도 안 하도록 `if(window.fbq)` 로 감싼다(동의 전·개발 일상 트래픽).

컨테이너 설정: «동의 개요 사용» 켜기(관리 → 컨테이너 설정) — 동의 없는 태그가 목록에 빨갛게 보여 Irene 이 승인 때 한눈에 본다.

**Irene 의 미리보기 확인 순서(개발서버)** — `check:true` 할 일로 올린다
1. Tag Assistant 미리보기 → `https://dev.purplehere.com/` : `GA4 - Config`·`GA4 - page_view` 발화, `environment=development`, Meta Base 발화(Debug Mode)·그러나 배너 «Essential Only» 면 **Meta 는 동의 차단**으로 미발화 — 이게 맞는 모습.
2. 배너 «Accept All» → `cookie_consent` 뒤 Meta Base 발화. Meta Pixel Helper 확장에 PageView 1개.
3. `/pricing` → `/contact` 이동: page_view 각 1(중복 0). 문의 보내기(이름에 `[확인용]`) → `GA4 - generate_lead` + `Meta - Lead`.
4. `/demo` 데모 들어가기 → `try_demo` 발화 뒤 `/restaurant/38/...` 에서는 **page_view 없음**(앱 화면).
5. GA4 DebugView 에 위 이벤트가 `debug_mode` 로 들어옴.

---

## 6. 외부 관리 화면 — Irene 할 일 (Opus 가 카드로 하나씩 올린다)

| # | 할 일 | 왜 Irene 만 | 끝나면 |
|---|---|---|---|
| 1 | **GTM 계정·컨테이너(Web, purplehere.com) 만들고 `GTM-XXXXXXX` 를 이 방에 답** — tagmanager.google.com | 계정 소유 | 코드 상수 교체·빌드 |
| 2 | **Meta Events Manager 에서 픽셀(데이터 세트) 만들고 ID 를 GTM 상수에 입력** · Business 설정 → 브랜드 안전 → 도메인에 `purplehere.com` 추가 → **DNS TXT 로 인증**(Cloudflare) | 계정·DNS | GTM 미리보기 |
| 3 | **GTM 가져오기 → 미리보기 §5 확인 → 승인 → 게시** | 게시 = 외부 발행 | 운영 반영(다음 배포) |
| 4 | **GA4 관리 4개**: ① 데이터 설정 → 데이터 필터 → «개발자 트래픽» → **활성** ② 데이터 스트림 → 향상된 측정 → «브라우저 기록 이벤트 기반 페이지 변경» **끄기**(나머지 켜 둠) ③ 관리 → 이벤트 → `sign_up` `email_verified` `generate_lead` `try_demo` 를 **주요 이벤트**로 ④ 맞춤 정의 9개(§4-1) · 데이터 보관 14개월 | 관리 화면 | — |
| 5 | **Search Console**: ① 속성 `purplehere.com`(도메인) 이 Irene 계정에 보이는지 ② Sitemaps → `https://purplehere.com/sitemap.xml` 제출(미제출이면) ③ 색인 생성 → 페이지: 색인 수·미색인 이유 캡처(= SEO_OPERATIONS «10-15 재판독» 을 이때 같이) ④ GA4 관리 → 제품 링크 → Search Console 연결 | 관리 화면 | ③ 결과는 SEO 방이 읽음 |

할 일 4·5 는 코드와 무관하므로 1~3 과 **병행**. 1 이 와야 Opus 의 빌드가 의미 있다(그 전엔 상수 placeholder 라 GTM 이 로드되지 않게 막아 둠 — §3-1 ensureGtm).

---

## 7. 검증 (Opus 자체 검증 · 숫자로)

1. 빌드 1회(`npm run build:dev`) → `verify-all --full` 1회(mount sweep — index.html 을 바꿨으므로 POS/KDS/모바일 포함 크래시 0 · console.error 0).
2. **dataLayer e2e(Playwright, 개발서버·데모 매장 38 만)** — 임시 스크립트로 돌리고 삭제:
   - `/` 진입 → `window.dataLayer` 에 `{environment:'development'}` 1 · `page_view` 1 · GTM 스크립트 태그 1(`gtm.js?id=GTM-…`).
   - `/` → `/pricing` → `/pricing?x=1` → `/contact` : page_view **3**(쿼리 변화 0).
   - `/restaurant/38/dashboard`(시험 계정) 직접 진입: GTM 스크립트 **0** · page_view **0**.
   - `/referral-program`: 배너 **보임**(결함 해소 증명) · `/pos/select-context`: 배너 안 보임.
   - 배너 Accept → `cookie_consent {consent_choice:'accept_all'}` 1 + `gtag consent update` granted 4 · Decline → essential_only.
   - 문의 폼 제출(`[확인용]`) → `generate_lead {lead_type:'contact'}` 1 · 하드웨어 견적 → `generate_lead {lead_type:'hardware_quote', value>0, currency:'MYR'}` 1 · 데모 로그인 → `try_demo` 1 · 가입(`@example.com`, `[확인용]`) → `sign_up {account_type:'restaurant', plan_id}` 1 · PII 키(email/full_name/phone) **0**.
   - **반증 1회**: `isMarketingPath` 에서 `/contact` 를 빼면 위 contact 검사가 실패하는지 → 실패 확인 후 원복(프론트 고장주입은 코드 확정 단계에 몰아서, 빌드 전).
3. `health-check`(seo·mobile 포함) 전부 통과 · `check-print-guard` 0건 · `check-design-guard` 신규 위반 0 · `npm run i18n:verify` 통과.
4. 운영 반영 뒤(배포 방): `curl https://purplehere.com/` 에 `G-LTTLKH1J85` **0**(직접 gtag 제거) · `gtm.js` 는 HTML 엔 없고(React 로드) 브라우저 네트워크에서 1 · GA4 실시간에 운영 page_view 들어옴 — 이건 Irene 이 GA4 실시간 화면으로(«check» 할 일).

---

## 8. 롤백 · 안전
- 코드 롤백 = 일반 배포 롤백(스키마 변경 없음). GTM 롤백 = GTM «버전 → 이전 버전 게시»(Irene, 1분).
- GTM 컨테이너가 게시 안 된 채 코드가 운영에 나가면 GA4 가 멈춘다 → 배포 전제조건으로 session-state «운영 반영 조건: GTM 게시 완료(할 일 3)» 를 적어 배포 방이 읽게 한다.
- GTM 맞춤 HTML 은 외부 스크립트 주입 통로다 — GTM 편집 권한을 Irene 계정 외엔 주지 않는다(문서에 명시).

---

## 9. 범위 밖으로 넘기는 것
- **개발 사이트 noindex 부재**(§0) — SEO 작업으로: dev nginx `add_header X-Robots-Tag "noindex, nofollow" always;`(Irene sudo) 가 가장 단순. SEO_OPERATIONS 문구와 실물이 어긋나 있으니 그 문서 쪽에서 정리.
- Meta Conversions API · 고급 매칭 — 광고 집행 뒤 필요해지면 별건(설계 다시).
- 유료 전환(구독 결제) 측정 — 앱 안 결제라 브라우저 태그로 못 잡는다. 필요하면 GA4 Measurement Protocol 로 서버에서 보내는 별건.
- 2차 이벤트(§4-2).

---

## 10. Irene 에게 — 승인 질문 (Fable 권고 포함)

**«§4-1 이벤트 7개 · §5 GTM 구성 목록 · 결정 1~7(특히 Meta 는 «모두 수락» 뒤에만 · 개발/운영은 환경값으로 분리 · 개인정보 미전송) 대로 진행할까요?»**

Fable 권고: **그대로 진행.** 이 설계는 코드 변경을 «사실을 올리는 줄 7개 + 경로 목록 하나» 로 묶어 두고 바뀌는 것은 전부 GTM 게시로 돌린 것이라, 앞으로 이벤트를 더하거나 픽셀을 바꿀 때 배포 없이 Irene 승인·게시만으로 끝난다. 승인되면 Opus 는 할 일 1(GTM ID)을 기다리는 동안 코드·JSON·검증 스크립트를 먼저 끝낸다(ID 는 상수 한 줄).

---

## 11. 구현 상태 (2026-10-17 · Opus · 개발서버 · 미배포) [Claude Code · 백그라운드 작업방 46669669]

**한 것(코드)** — §3 그대로
- 새 `dev-frontend/src/utils/tracking.ts`(경로 목록 · ensureGtm · track + 개인정보 키 빼기 · roleKey · setConsent/restoreConsent) · 새 `components/Common/PageViewTracker.tsx`(App.tsx 배너 옆 1줄)
- `CookieConsentBanner.tsx` → isMarketingPath · setConsent/restoreConsent (gtag 직접 호출 3곳 제거 · `/referral-program` 배너 결함 해소)
- 전환 6곳 track 1줄: SignupPage `sign_up` · ReferralSignupPage `sign_up` · VerifyEmailPage `email_verified` · ContactPage `generate_lead/contact` · PackagesPage `generate_lead/hardware_quote` · DemoPage `try_demo`
- 개인정보처리방침 «Marketing Cookies (Meta Pixel)» 항목 + 배너 문구 4언어 · `mobile-app/store/data-safety.md` 근거 경로
- GTM 가져오기 파일 `docs/gtm-container-purplehere.json` (생성기로 만듦 — 태그 12 · 트리거 12 · 변수 23 · 내장 6)

**설계와 다르게 한 것 3개 (이유)**
1. **index.html 의 gtag.js 직접 삽입은 아직 지우지 않았다.** GTM ID 를 넣는 커밋에서 같이 지운다(tracking.ts 주석). 이유: 아침 정기 점검이 커밋된 것을 자동 배포하므로, GTM 게시 전에 운영에 나가면 운영 GA4 가 끊긴다(§8 위험) — 순서 조건을 사람이 기억하는 대신 «ID 없으면 아무것도 안 바뀜» 으로 만들었다. 그동안은 지금과 같다(GA4 페이지뷰는 gtag 가 보내고, dataLayer 이벤트는 GTM 이 없으니 아무 데도 안 간다 · 개발 트래픽 섞임도 ID 넣을 때 해소).
2. **Meta 태그 구성**: «Base + PageView» 와 «PageView (SPA)» 대신 `Meta - Base (init)`(페이지당 1회, init 만) + `Meta - PageView`(page_view 마다 + «모두 수락» 직후 1회, Base 를 설정 태그로). 결과는 같고 첫 페이지 중복 판정이 필요 없다. 트리거 조건 «운영 또는 미리보기» 는 맞춤 JS 변수 `js - meta allowed` 하나로.
3. **하드웨어 견적 `currency`** 는 'MYR' 고정 대신 화면에서 고른 통화 코드(selectedCurrency) — value 가 그 통화 금액이라서.

**남은 것 (Irene 할 일 → 상황판 카드)**: §6 #1~#4. #5 서치콘솔(사이트맵·GA4 연결)은 Irene 가 이미 해 둠(2026-10-17 답) — 이 서버엔 서치콘솔 API 열쇠가 없어 직접 확인은 못 함. #1(GTM ID) 이 오면: 상수 교체 + index.html 19~23줄 삭제 → 빌드 1회 → dataLayer·GTM 로드 재검증 → #3(미리보기·게시) 카드.
**운영 반영**: 지금 코드는 다음 배포 때 나가도 안전(위 1). GTM 게시 뒤 ID 커밋이 나가야 GTM 이 운영에서 돈다.
