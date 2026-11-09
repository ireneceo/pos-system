# Fable 설계 — «태블릿 + 프린터 + 카드단말기면 끝» 안내·어필 (GHL 단말기는 우리 통해 신청)

- 날짜 2026-11-09 · 종류 `design`(공용 기준: 여러 화면이 같은 규칙·문구를 나눔) · Fable 1회차
- Irene 원문: «우리 카드단말기 와이파이 자동연결해서 편하게 사업하려면 GHL 가입해야 한다고 안내하자. 문의신청으로 안내시켜서 가입신청 꼭 우리한테 해야 연결 가능하다고 하자. 이유는 그 GHL 단말기가 기종마다 달라서 변수가 많다고. 이거 전체적으로 잘 안내할 수 있는 곳, 그리고 어필할 수 있는 곳 찾아서 다 넣어줘. 카드단말기 자동결제 연동이 되는 거야. QR도 그런거고, 직원들이 일일이 입력 안해도 되는거지. 아주 단순. 기기만 맞춰쓰면 된다는 거야. … 태블릿+프린터+카드단말기 이렇게만 있으면 끝. 모든 자동화가 된다는 거야.»
- 사실 근거: `docs/CARD_TERMINAL_ECR_DESIGN.md` · 메모리 `reference_card_terminal_ghl_ecr` · 코드 실측(아래 §0-2)
- 구현은 팀원. 이 문서의 문구는 **영어 원문이 기준**, 한국어는 ko 파일 값. zh·ms 는 팀원이 영어 기준으로 번역(고유명사 GHL · PayHere Direct · DuitNow · PurpleHere 는 그대로).

---

## 0. 결론 (한 줄)

**한 문장을 정해 7곳에 같은 뜻으로 심는다 — «계산대엔 태블릿·프린터·GHL 카드단말기 세 가지면 끝. 주문은 주방 프린터로, 금액은 단말기로 자동. 직원이 다시 치는 게 없다. 단말기는 기종이 달라 변수가 많으니 PurpleHere 를 통해 신청해야 연결을 보장한다.»** 문의는 새 종류 `card_terminal` 하나로 모아 관리자가 바로 알아본다. 결제 중 화면(PaymentModal)·🔒 인쇄 파일은 건드리지 않는다.

### 0-1. 메시지 원칙 (모든 자리에 공통)
1. **셋이면 끝** — Tablet · Printer · Card terminal. 다른 장비 이름을 섞지 않는다(모니터·키오스크는 «더 있으면 좋은 것»이라 이 메시지엔 안 넣음).
2. **무엇이 자동인지 셋만 말한다** — ① QR 주문·POS·키오스크 주문이 주방 프린터로 자동 인쇄 ② 결제 금액이 단말기로 자동 전송 ③ 승인될 때만 자동 기록(카드·손님 QR·단말기 DuitNow QR 모두). «직원이 다시 입력하는 게 없다» 가 결론 문장.
3. **GHL 은 조건, 우리는 길** — «GHL 카드단말기(PayHere Direct)여야 한다 → 기종·소프트웨어가 달라 변수가 많다 → PurpleHere 를 통해 신청하면 맞는 기종을 확인해 매장에 맞게 준비해 준다 → 다른 곳에서 받은 단말기는 연결을 보장하지 못한다». 네 토막을 이 순서로.
4. **약속하지 않는 것** — GHL 수수료·계약 조건·승인 기간·«GHL 공식 파트너»·«모든 GHL 단말기 호환»·«무료 단말기». 확인 안 된 사실은 한 글자도 쓰지 않는다. GHL 소개는 «GHL (card terminal provider in Malaysia)» 까지만.
5. **행동은 하나** — 어디서든 버튼/링크는 **문의 페이지 `/contact?type=card_terminal`** 하나로 간다(새 랜딩 페이지·새 폼 만들지 않음).

### 0-2. 실측으로 확인한 사실 (문구의 근거 — 이 밖의 주장 금지)
- 단말기 연동 = GHL ECR, 단말기 앱 PayHere Direct. 브라우저는 단말기에 못 닿아 **계산대 앱(안드로이드·Windows) 필수**. Windows 데스크탑 앱도 단말기 브릿지가 있다(`desktop-pos/src/ecr/`) — 현재 다운로드 페이지 Windows 칸 문구는 프린터만 말해 **빠져 있다**(§3-5 에서 고침).
- 앱이 같은 와이파이에서 단말기를 자동으로 찾아 주소를 저장하고, 바뀌면 다시 찾는다(`CardTerminalSettings.tsx` runFind · `terminalSale.ts` roundTrip).
- 승인(00)일 때만 결제 기록. 응답의 D018/D002 로 카드/이월렛(TnG·GrabPay·…) 자동 분류 → 어떤 수단인지 기록된다. 단말기 화면 DuitNow QR 은 설정 토글(단말기에 DuitNow 열려 있어야).
- QR 테이블 주문·키오스크 주문은 POS1 폴러가 주방 티켓을 자동 인쇄(FAQ `receipt-printing` 이미 그렇게 설명).
- 문의 모델 `contact_inquiries.inquiry_type` ENUM('free_trial','pricing','demo','support','partnership','other'). 새 값은 `expandEnum` 마이그 + 모델 수정 + 레지스트리 `deploy` 등록이 정석(CLAUDE.md ENUM expand-only). `ContactPage` 는 `location.state.inquiry_type` 만 받고 query string 은 안 받는다. 성공 시 `track('generate_lead')`.
- FAQ = DB `contents`(type faq, category `features` 등, slug+language 로 배포 동기화). 추가 패턴 = `scripts/migrate-faq-refresh-20261011.js` + `scripts/data/*.json`(표지 system_settings 로 1회 덮기).
- 랜딩 `landing.json` 은 **평면 키**(`"featuresPage.restaurant.card_terminal.p1"`), `settings.json` 은 **중첩 키**(`settingsPage.cardTerminal.*`). 4개 언어 파일 모두 같은 키를 가져야 `npm run i18n:verify` 통과.
- 지금 아무도 안 고치는 파일: 랜딩 페이지 전부 · locales · CardTerminalSettings.tsx · routes/public.js · models/ContactInquiry.js · Admin/ContactInquiriesPage.tsx. (다른 방 미커밋: Admin/InvoicesPage · SubscriptionsPage · utils/tracking.ts · public/index.html · routes/users.js — **무접촉**.)

---

## 1. 핵심 문장 (복사해서 쓰는 원문 — 각 자리는 이 문장의 축약·변형만 쓴다)

| 키 | English | 한국어 |
|---|---|---|
| 세 가지 | **Tablet + printer + card terminal — that's the whole counter.** | **태블릿 + 프린터 + 카드단말기 — 계산대는 이 셋이면 끝입니다.** |
| 자동 셋 | Orders from the POS, table QR and kiosk print in the kitchen by themselves. The amount goes to the card terminal by itself, and the payment is recorded only when the terminal approves — card, e-wallet QR or DuitNow QR alike. Nobody retypes anything. | POS·테이블 QR·키오스크 주문은 주방 프린터에서 저절로 나오고, 결제 금액은 카드단말기로 저절로 넘어가 승인될 때만 기록됩니다 — 카드·이월렛 QR·DuitNow QR 모두. 직원이 다시 입력하는 게 없습니다. |
| GHL 조건 | Card terminal auto-connect works with GHL terminals running PayHere Direct, on the same Wi-Fi as your counter device. | 카드단말기 자동연결은 PayHere Direct 가 깔린 GHL 단말기가 계산대 기기와 같은 와이파이에 있을 때 됩니다. |
| 우리 통해 신청 | GHL terminals differ by model and software version, so please apply for your terminal through PurpleHere — we confirm a compatible unit and get it set up for your outlet. A terminal arranged elsewhere may not connect. | GHL 단말기는 기종과 소프트웨어 버전이 달라 변수가 많습니다. 단말기는 PurpleHere 를 통해 신청해 주세요 — 호환되는 기종을 확인하고 매장에 맞게 준비해 드립니다. 다른 경로로 받은 단말기는 연결을 보장하지 못합니다. |
| 행동 | Request a card terminal | 카드단말기 신청하기 |

«may not connect / 보장하지 못합니다» 로 쓴다(«연결 안 됩니다» 로 단정하지 않음 — 실제로 같은 기종이면 될 수도 있어 거짓이 되고, Irene 의 뜻(변수가 많으니 우리 통해서)은 이 문장으로 충분히 선다). 판정: Fable.

---

## 2. 자리 목록과 우선순위

| # | 자리 | 왜 여기인가 | 범위 | 우선 |
|---|---|---|---|---|
| 1 | **매장 설정 › 결제 › 카드 › Card terminal integration** (`pages/Settings/CardTerminalSettings.tsx`) | 실제 켜려는 사람이 «뭐가 필요하지?» 하는 순간. 지금은 hint 한 줄뿐 | 토글 꺼짐일 때 «What you need» 3줄 + 신청 버튼 · hint 재작성 | P1 |
| 2 | **문의 페이지** (`Landing/ContactPage.tsx` · `routes/public.js` · `models/ContactInquiry.js` · `Admin/ContactInquiriesPage.tsx`) | 모든 자리의 도착지. 관리자가 «단말기 신청» 을 한눈에 보고 챙겨야 함 | 문의 종류 `card_terminal` 신설 · `?type=` 미리 채움 · 본문 틀 · 관리자 배지 · 메일 한 줄 · ENUM 마이그 | P1 |
| 3 | **기능 페이지 restaurant › Card Terminal Integration** (`Landing/FeaturesPage.tsx` + landing.json) | 기능을 찾아온 사람에게 자동화 전체 + GHL 조건 + 신청 길 | desc·포인트 3→5 재작성 · 매장 탭 아래 **공용 띠**(§6) 1개 | P1 |
| 4 | **홈 기능 카드 3 «Easy Order & Payment»** (landing.json `homePage.feature3*`) | 첫 화면의 어필 자리. 코드 변경 0, 문구만 | 제목·설명 재작성 | P1 |
| 5 | **다운로드 페이지** (`Landing/DownloadPage.tsx`) | «앱이 왜 필요하지?» 의 답이 단말기. Windows 칸에 단말기가 빠져 있음 | Windows desc 보정 · 맨 아래 공용 띠 1개 | P1 |
| 6 | **FAQ** (DB · 새 마이그 + 데이터 JSON) | 검색 유입·AEO. 카드단말기 FAQ 0건 | 새 FAQ 2문항(features) 4개 언어 | P1 |
| 7 | **하드웨어 패키지 페이지** (`Landing/PackagesPage.tsx`) | 장비를 사는 순간. 단말기는 패키지에 없다는 걸 여기서 말해야 함 | 상단 SoftwareNote 아래 한 줄 + 링크 | P2 |
| 8 | **가격 페이지 하단 CTA «Need POS hardware?»** (`Landing/PricingPage.tsx`) | 하드웨어로 넘어가는 지점 | 부제 한 줄 추가 + 링크 | P2 |
| 9 | 관리자 알림 메일·손님 확인 메일 (`routes/public.js`) | 신청이 들어오면 «무엇을 준비하라» 가 보여야 함 | 종류별 한 블록씩(free_trial 과 같은 자리) | P2 |

**넣지 않는 곳(판정):**
- **결제창 `PaymentModal`/`TerminalPanel`** — 직원이 돈을 받는 중이다. 영업 문구를 넣지 않는다(`cardTerminal.noBridge` 등 그대로).
- **RA 대시보드 설정 체크리스트(`useSetupStatus`)** 에 «기기 연결» 단계 — 완료 판정(프린터 있음·단말기 켬)이 새 규칙이라 이번 범위 밖. «다음 할 일» 로 남긴다.
- **새 랜딩 페이지(/hardware 등)·GNB 메뉴** — 길이 하나 늘어나면 어필이 분산된다. 기존 7곳 + 문의 하나로 충분.
- **🔒 인쇄 보호파일·KDS·orders-crud** — 무접촉. 이 일은 인쇄 동작을 바꾸지 않는다.
- 가입 페이지(SignupPage) — 가입 흐름에 장비 얘기를 끼우면 전환이 떨어진다. 안 넣음.

---

## 3. 자리별 상세

### 3-1. 매장 설정 › 결제 › 카드 › Card terminal integration (`CardTerminalSettings.tsx`)

**구조(상자 없음 — 2026-11-08b 프린터 안내 판정과 같은 결)**: 제목·hint·토글 줄은 그대로. **토글이 꺼져 있을 때만** 그 아래에 다음을 그린다. 켜지면 지금 화면 그대로(자동 찾기·DuitNow·고급).

```
Card terminal integration                                                   [ off ]
<hint — 아래 재작성>

What you need                                              ← title 스타일(14px 600 #0A2540)
1. A GHL card terminal running PayHere Direct, on the same Wi-Fi as this counter device.
2. The PurpleHere POS app on this device (Android tablet or Windows PC) — purplehere.com/download.
3. Apply for the terminal through PurpleHere. GHL terminals differ by model and software version,
   so we confirm a compatible unit and get it set up for your outlet. A terminal arranged elsewhere may not connect.
[ Request a card terminal ]   ← ModalButton variant="secondary" (이 파일이 이미 쓰는 Button) · window.open('/contact?type=card_terminal', '_blank', 'noopener')
Once it arrives, turn this on — the app finds the terminal on this Wi-Fi by itself.   ← hint 스타일
```
- 번호 목록은 `<ol>` 평문(`fontSize 13px, color #425466, lineHeight 1.6, paddingLeft 18px`). 상자·배경색·아이콘 없음.
- 새 탭으로 여는 이유: 설정 화면(자동 저장 중)을 떠나지 않게. `/contact` 는 랜딩 레이아웃이라 같은 SPA 안에서 열려도 state 는 새 탭에 안 넘어가므로 **query `?type=`** 로 전달(§3-2).
- 역할: 이 화면은 RA(+System Admin)만 본다(결제 설정 잠금 그대로). 직원엔 안 보임 — 맞다.
- `data-testid="card-terminal-get-started"` 를 목록 컨테이너에(mount 검증용).

**settings.json `settingsPage.cardTerminal` 에 추가/변경 (중첩 키)**

| 키 | en | ko |
|---|---|---|
| `hint` (변경) | Sends the amount to the GHL card terminal and records the payment only when it is approved — card, e-wallet QR and DuitNow QR alike. Works in the PurpleHere POS app (Android or Windows). | 결제 금액을 GHL 카드단말기로 보내고, 승인될 때만 기록합니다 — 카드·이월렛 QR·DuitNow QR 모두. PurpleHere 계산대 앱(안드로이드·Windows)에서 됩니다. |
| `getStarted.title` | What you need | 필요한 것 |
| `getStarted.step1` | A GHL card terminal running PayHere Direct, on the same Wi-Fi as this counter device. | PayHere Direct 가 깔린 GHL 카드단말기 — 이 계산대 기기와 같은 와이파이에. |
| `getStarted.step2` | The PurpleHere POS app on this device (Android tablet or Windows PC) — purplehere.com/download. | 이 기기에 PurpleHere 계산대 앱(안드로이드 태블릿 또는 Windows PC) — purplehere.com/download. |
| `getStarted.step3` | Apply for the terminal through PurpleHere. GHL terminals differ by model and software version, so we confirm a compatible unit and get it set up for your outlet. A terminal arranged elsewhere may not connect. | 단말기는 PurpleHere 를 통해 신청해 주세요. GHL 단말기는 기종·소프트웨어 버전이 달라 변수가 많아서, 호환되는 기종을 확인하고 매장에 맞게 준비해 드립니다. 다른 경로로 받은 단말기는 연결을 보장하지 못합니다. |
| `getStarted.request` | Request a card terminal | 카드단말기 신청하기 |
| `getStarted.after` | Once it arrives, turn this on — the app finds the terminal on this Wi-Fi by itself. | 단말기가 오면 이 스위치를 켜세요 — 앱이 이 와이파이에서 단말기를 저절로 찾습니다. |

### 3-2. 문의 페이지 · 문의 종류 `card_terminal`

**결정: 문의 종류를 하나 늘린다(`other` + 본문 머리말로 때우지 않음).** 이유: 관리자 목록에서 배지로 바로 가려야 하고(«단말기 신청» 은 영업 리드), 메일 제목에 종류가 들어가며, 나중에 건수를 셀 수 있다. ENUM 확장은 `expandEnum` 한 줄짜리 정석이고 배포 게이트(`check-enum-parity`)가 운영 누락을 막는다.

**(a) 백엔드**
- `models/ContactInquiry.js` `inquiry_type` ENUM 에 `'card_terminal'` 추가(값 목록 끝에) + comment 갱신.
- 새 마이그 `dev-backend/scripts/migrate-contact-inquiry-type-card-terminal.js`:
  ```js
  const { expandEnum } = require('./lib/enumExpand');
  await expandEnum(sequelize, 'contact_inquiries', 'inquiry_type', ['card_terminal']);   // 내가 담당하는 값만
  ```
  멱등 · 끝에 `process.exit` · `scripts/migrations.registry.json` **`deploy`** 에 등록.
- `routes/public.js` POST 문의: 저장 로직 변경 없음(값이 그대로 들어감). 메일 두 통에 종류별 블록 추가(free_trial 블록과 같은 자리·같은 스타일, 색만 보라 계열 `#F5F3FF`/`#5B21B6`):
  - 손님 확인 메일: **«Card terminal request»** — We will contact you about a GHL card terminal for your outlet and the set-up steps. Please have your outlet name, address and number of counters ready.
  - 관리자 알림 메일: **«Card terminal lead»** — Reply with the GHL application steps and confirm the terminal model before it ships. (한 줄)
  - 메일은 영어 고정(기존 두 통이 영어 고정이라 같이 간다).

**(b) `ContactPage.tsx`**
- 문의 종류 select 에 `<option value="card_terminal">` 를 **Pricing 다음, Demo 앞**에(영업 리드 묶음). 라벨 `contactPage.cardTerminalInquiry`.
- 미리 채움 두 길을 다 받는다: `location.state.inquiry_type`(기존) **또는** `useSearchParams().get('type')`. 허용 목록(`pricing|demo|support|partnership|other|card_terminal`)에 있을 때만 적용. `type=card_terminal` 이고 본문이 비어 있으면 본문을 `contactPage.cardTerminalPrefill` 로 채운다(사용자는 지우고 쓸 수 있음). 다른 종류는 본문 미리 채움 없음.
- 종류를 `card_terminal` 로 고르면(수동 선택 포함) select 아래 안내 한 줄(기존 hint 스타일 13px #6B7C93): `contactPage.cardTerminalHelp`.
- `interested_plan` 칸은 지금처럼 종류가 정해지면 보이는 그대로(단말기 신청 때도 플랜을 고를 수 있어 좋다 — 변경 없음).
- 제출 성공 `track('generate_lead', {...})` 기존 호출에 `inquiry_type` 이 들어가 있는지 확인하고, 없으면 그 객체에 `inquiry_type: formData.inquiry_type` 한 필드만 더한다(utils/tracking.ts 는 다른 방이 수정 중 — **그 파일은 안 건드린다**, 호출부 인자만).

**landing.json (평면 키) 추가**

| 키 | en | ko |
|---|---|---|
| `contactPage.cardTerminalInquiry` | Card terminal (GHL) request | 카드단말기(GHL) 신청 |
| `contactPage.cardTerminalHelp` | Card terminal auto-connect works with GHL terminals arranged through PurpleHere — models and software differ, so we confirm a compatible unit for your outlet. Tell us your outlet and how many counters you have. | 카드단말기 자동연결은 PurpleHere 를 통해 신청한 GHL 단말기에서 됩니다 — 기종·소프트웨어가 달라서 매장에 맞는 기종을 확인해 드립니다. 매장과 계산대 수를 알려 주세요. |
| `contactPage.cardTerminalPrefill` | I would like to connect a GHL card terminal to PurpleHere.\nOutlet name and location:\nNumber of counters:\nCurrent card terminal (if any) — provider and model:\nAlready using PurpleHere? (yes / no): | PurpleHere 에 GHL 카드단말기를 연결하고 싶습니다.\n매장 이름·위치:\n계산대 수:\n지금 쓰는 카드단말기(있으면) — 업체·기종:\nPurpleHere 사용 중인가요? (예 / 아니오): |

**(c) `Admin/ContactInquiriesPage.tsx`**
- 타입 유니온에 `'card_terminal'` 추가 · `formatInquiryType` 에 `card_terminal: 'Card terminal'`(기존 라벨들이 영어 하드코딩이라 같은 방식 — 리팩터링하지 않음) · `InquiryTypeBadge` 색: 배경 `#EEF2FF`, 글자 `#4338CA`(primary 계열, 기존 partnership 보라 `#F3E8FF/#7C3AED` 와 구분).

### 3-3. 기능 페이지 restaurant › `card_terminal` (`FeaturesPage.tsx` + landing.json)

- `ROLE_TABS.restaurant` 의 `{ code: 'card_terminal', points: 3 → 5 }`. 사진은 그대로 0(«Screenshot coming soon» — 추후 설정 화면·결제창 캡처는 별도).
- **매장 탭(`activeTab === 'restaurant'`)일 때만** advanced 그리드 아래·CTASection 위에 **공용 띠 `<CounterSetupStrip />`**(§6) 1개. 다른 탭(브랜드·푸드코트·오너·공급업체)엔 안 그린다.

| 키 | en | ko |
|---|---|---|
| `featuresPage.restaurant.card_terminal.title` (유지) | Card Terminal Integration | 카드 단말기 연동 |
| `.desc` (변경) | The amount goes from the POS to the GHL card terminal by itself — no retyping, no manual records. | 결제 금액이 POS 에서 GHL 카드단말기로 저절로 넘어갑니다 — 다시 치는 것도, 수기 기록도 없습니다. |
| `.p1` | The POS app finds the terminal on your Wi-Fi automatically — nothing to type | 계산대 앱이 와이파이에서 단말기를 저절로 찾습니다 — 입력할 것 없음 |
| `.p2` | Recorded only when the terminal approves — card, e-wallet QR or DuitNow QR, each tagged correctly | 단말기가 승인할 때만 기록 — 카드·이월렛 QR·DuitNow QR 이 각각 맞게 표시됨 |
| `.p3` | Works in the PurpleHere POS app on an Android tablet or Windows PC | 안드로이드 태블릿·Windows PC 의 PurpleHere 계산대 앱에서 동작 |
| `.p4` | For GHL terminals running PayHere Direct — apply through PurpleHere so we can confirm a compatible model | PayHere Direct 가 깔린 GHL 단말기용 — PurpleHere 를 통해 신청하면 호환 기종을 확인해 드림 |
| `.p5` | Turn on under Settings › Payment › Card | 설정 › 결제 › 카드에서 켬 |

### 3-4. 홈 기능 카드 3 (landing.json `homePage.feature3*` — 코드 변경 0)

| 키 | en | ko |
|---|---|---|
| `homePage.feature3Title` | Order to Payment, Hands-free | 주문부터 결제까지 자동으로 |
| `homePage.feature3Desc` | Tablet, printer and card terminal — QR orders print in the kitchen and payments are recorded from the terminal, with nothing for staff to retype. | 태블릿·프린터·카드단말기 — QR 주문은 주방에서 저절로 인쇄되고 결제는 단말기 결과로 기록됩니다. 직원이 다시 입력할 게 없습니다. |

(기존 «Easy Order & Payment / Handle everything from mobile orders to POS payments conveniently» 를 대체. 히어로 문구는 그대로 — 홈 히어로는 역할 전체(브랜드·푸드코트) 메시지라 매장 장비 얘기로 좁히지 않는다.)

### 3-5. 다운로드 페이지 (`DownloadPage.tsx`)

- `download.windows.desc` 보정 — 현재 «프린터만» 이라 사실과 다르다.

| 키 | en | ko |
|---|---|---|
| `download.windows.desc` (변경) | For counter PCs. Prints to your USB and network printers and connects to the card terminal on the same Wi-Fi. | 계산대 PC용. USB·네트워크 프린터로 인쇄하고, 같은 와이파이의 카드 단말기와 연결됩니다. |

- Grid 아래(WideCard 다음)에 **공용 띠 `<CounterSetupStrip />`** 1개. 다운로드 페이지는 «앱을 왜 받나» 의 답이 이 띠다.

### 3-6. FAQ 2문항 (DB · 새 마이그)

- 새 스크립트 `dev-backend/scripts/migrate-faq-card-terminal-20261109.js` + 데이터 `scripts/data/faq-content-20261109-card-terminal.json`. **20261011 스크립트의 ②③ 만** 가져온다(중복 제거 ① 은 불필요). 표지 `system_settings.faq_card_terminal_20261109`(1회 덮기, 이후 관리자가 고친 글 보존). 레지스트리 `deploy`. 운영 반영은 배포 때 콘텐츠 동기화(`sync-contents-to-prod.js`, slug+language) — 팀원은 새 slug 가 동기화 대상에 들어오는지 1회 확인.
- 분류 `features`, 정렬 31·32(현재 최대 32 — `qr-code-mobile-ordering` 이 30, 그 뒤에 붙여 QR 주문 FAQ 옆에 서게).
- FAQ 본문 안 링크는 평문 주소(`purplehere.com/contact?type=card_terminal`) — 기존 FAQ 들이 `purplehere.com/download` 를 평문으로 쓰는 방식 그대로.

**FAQ A — slug `card-terminal-integration` (features · 31)**

| | title | content |
|---|---|---|
| en | Can PurpleHere connect to my card terminal? | Yes — with a GHL card terminal running PayHere Direct.\n\nHow it works:\n• The PurpleHere POS app (Android tablet or Windows PC) finds the terminal on your Wi-Fi by itself — nothing to type in\n• At checkout the amount goes to the terminal automatically; the customer taps a card or scans a QR\n• The payment is recorded only when the terminal approves, and PurpleHere notes whether it was a card or an e-wallet (Touch 'n Go, GrabPay, DuitNow QR and more)\n• Nothing for staff to retype, no manual card records\n\nWhich terminal:\n• GHL terminals differ by model and software version, so please apply for your terminal through PurpleHere (purplehere.com/contact?type=card_terminal). We confirm a compatible unit and get it set up for your outlet\n• A terminal arranged elsewhere may not connect\n\nIf you don't have a terminal yet, you can still take card payments and record them by hand in the POS. |
| ko | PurpleHere 에 카드단말기를 연결할 수 있나요? | 네 — PayHere Direct 가 깔린 GHL 카드단말기와 연결돼요.\n\n어떻게 되나요:\n• PurpleHere 계산대 앱(안드로이드 태블릿·Windows PC)이 와이파이에서 단말기를 저절로 찾아요 — 입력할 게 없어요\n• 결제 때 금액이 단말기로 자동으로 넘어가고, 손님은 카드를 대거나 QR 을 찍어요\n• 단말기가 승인할 때만 결제가 기록되고, 카드인지 이월렛(Touch 'n Go·GrabPay·DuitNow QR 등)인지도 함께 남아요\n• 직원이 다시 입력할 것도, 수기 카드 기록도 없어요\n\n어떤 단말기인가요:\n• GHL 단말기는 기종·소프트웨어 버전이 달라 변수가 많아요. 단말기는 PurpleHere 를 통해 신청해 주세요(purplehere.com/contact?type=card_terminal). 호환되는 기종을 확인하고 매장에 맞게 준비해 드려요\n• 다른 경로로 받은 단말기는 연결을 보장하지 못해요\n\n아직 단말기가 없어도 카드 결제를 받고 POS 에 직접 기록할 수는 있어요. |

**FAQ B — slug `counter-setup-tablet-printer-terminal` (features · 32)**

| | title | content |
|---|---|---|
| en | What do I need at the counter for everything to run automatically? | Three things: a tablet (or PC), a receipt/kitchen printer and a GHL card terminal.\n\nWith those three:\n• Orders from the POS, table QR codes and the self-order kiosk print in the kitchen by themselves\n• The bill amount goes to the card terminal by itself; the payment is recorded when the terminal approves — card, e-wallet QR or DuitNow QR\n• Staff never retype an amount or an order\n\nSet-up:\n• Install the free PurpleHere POS app on the counter tablet or PC (purplehere.com/download) — it connects the printer and the terminal\n• Printer: Settings › Printer walks you through connecting it\n• Card terminal: apply through PurpleHere (purplehere.com/contact?type=card_terminal) so we can confirm a compatible GHL model, then turn it on under Settings › Payment › Card\n\nYou can use your own tablet and printer, or choose a ready-made package at purplehere.com/packages. |
| ko | 계산대에 뭐가 있어야 전부 자동으로 돌아가나요? | 세 가지예요: 태블릿(또는 PC), 영수증·주방 프린터, GHL 카드단말기.\n\n이 셋이 있으면:\n• POS·테이블 QR·셀프 주문 키오스크 주문이 주방 프린터에서 저절로 나와요\n• 결제 금액이 카드단말기로 저절로 넘어가고, 단말기가 승인하면 기록돼요 — 카드·이월렛 QR·DuitNow QR 모두\n• 직원이 금액이나 주문을 다시 입력하는 일이 없어요\n\n준비:\n• 계산대 태블릿·PC 에 무료 PurpleHere 계산대 앱을 설치해요(purplehere.com/download) — 프린터와 단말기를 연결해 줘요\n• 프린터: 설정 › 프린터에서 순서대로 안내해요\n• 카드단말기: PurpleHere 를 통해 신청해 주세요(purplehere.com/contact?type=card_terminal). 호환되는 GHL 기종을 확인해 드리고, 받으면 설정 › 결제 › 카드에서 켜면 돼요\n\n갖고 있는 태블릿·프린터를 그대로 써도 되고, purplehere.com/packages 에서 준비된 패키지를 골라도 돼요. |

### 3-7. 하드웨어 패키지 페이지 (`PackagesPage.tsx`) — P2

- 상단 `CountriesBanner` 안 `SoftwareNote`(«Don't need hardware? …») **바로 아래** 같은 스타일로 한 줄 더:
  `{t('landing:packagesPage.cardTerminalNote')} <Link to="/contact?type=card_terminal">{t('landing:packagesPage.cardTerminalLink')} &rarr;</Link>`
- 패키지 데이터(DB)는 건드리지 않는다. 견적 폼(`/api/public/hardware-quotes`)도 변경 없음 — 단말기는 문의 한 길로만.

| 키 | en | ko |
|---|---|---|
| `packagesPage.cardTerminalNote` | Card terminal: not part of the packages — it comes from GHL. Apply through PurpleHere so we can confirm a model that connects to the POS automatically. | 카드단말기는 패키지에 들어 있지 않아요 — GHL 에서 나옵니다. PurpleHere 를 통해 신청하면 POS 와 자동으로 연결되는 기종을 확인해 드립니다. |
| `packagesPage.cardTerminalLink` | Request a card terminal | 카드단말기 신청하기 |

### 3-8. 가격 페이지 하단 CTA (`PricingPage.tsx`) — P2

- `CTASubtitle` 문구 뒤에 **두 번째 줄**(같은 CTASubtitle 컴포넌트 하나 더, 또는 `<br/>` 없이 별도 요소): `pricingPage.cardTerminalNote` + 링크 텍스트 `pricingPage.cardTerminalLink` → `/contact?type=card_terminal`. 버튼은 기존 «View Hardware Packages» 하나만 유지(버튼 둘로 늘리지 않음).

| 키 | en | ko |
|---|---|---|
| `pricingPage.cardTerminalNote` | Card terminal auto-connect is included in every plan — the terminal itself is a GHL unit arranged through PurpleHere. | 카드단말기 자동연결은 모든 플랜에 포함돼 있어요 — 단말기 자체는 PurpleHere 를 통해 신청하는 GHL 기기입니다. |
| `pricingPage.cardTerminalLink` | Request a card terminal | 카드단말기 신청하기 |

> «모든 플랜에 포함» 은 팀원이 `pricingPage.module.*`/플랜 모듈 표에서 card terminal 이 특정 티어에 묶여 있지 않은지 1회 확인한 뒤 쓴다. 묶여 있으면 그 문장을 «Card terminal auto-connect is a POS feature — …» 로 바꾼다(티어 이름을 적지 않음).

---

## 4. 공용 띠 `CounterSetupStrip` (새 컴포넌트 · 기능 페이지·다운로드 페이지에서 공유)

**파일** `dev-frontend/src/components/Landing/CounterSetupStrip.tsx` (Landing index 에 export). 랜딩 전용 — 앱 화면엔 쓰지 않는다.

**모양** (상자 하나·안에 상자 없음, 다운로드 페이지 Card 와 같은 어법):
```
┌─────────────────────────────────────────────────────────────────────────┐
│ Tablet + printer + card terminal — that's the whole counter.            │  H2 20px #0A2540
│ Orders print in the kitchen and payments are recorded from the terminal │  P 15px #425466
│ by themselves. Nobody retypes anything.                                 │
│                                                                         │
│ ▭ Tablet or PC        ≡ Printer              ▦ GHL card terminal        │  3열, 720px 아래 1열
│ Runs the PurpleHere   Kitchen tickets and    Amount sent automatically, │  13px #6B7C93
│ POS app — Android     receipts print by      recorded only when         │
│ or Windows.           themselves, including  approved. Apply through    │
│                       QR and kiosk orders.   PurpleHere — models differ.│
│                                                                         │
│ [ Request a card terminal ]   Download the POS app →                     │  Button primary · 텍스트 링크
└─────────────────────────────────────────────────────────────────────────┘
```
- 테두리 `1px solid #E3E8EE` · radius 12 · 배경 `#fff` · padding 24 · 글리프는 기하 유니코드 `▭ ≡ ▦` (26px, `#635BFF`, aria-hidden) — 이모지·lucide 금지.
- 버튼 = `components/UI/Button` variant primary → `navigate('/contact', { state: { inquiry_type: 'card_terminal' } })`(같은 SPA 안이니 state 로; ContactPage 는 state·query 둘 다 받음). 두 번째는 텍스트 링크 `<Link to="/download">` (다운로드 페이지에서 그릴 때는 `hideDownload` prop 으로 숨김).
- `data-testid="counter-setup-strip"`.

**landing.json 키 `counterSetup.*`**

| 키 | en | ko |
|---|---|---|
| `counterSetup.title` | Tablet + printer + card terminal — that's the whole counter. | 태블릿 + 프린터 + 카드단말기 — 계산대는 이 셋이면 끝입니다. |
| `counterSetup.lead` | Orders print in the kitchen and payments are recorded from the terminal by themselves. Nobody retypes anything. | 주문은 주방에서 저절로 인쇄되고 결제는 단말기 결과로 저절로 기록됩니다. 직원이 다시 입력할 게 없습니다. |
| `counterSetup.tablet.title` | Tablet or PC | 태블릿 또는 PC |
| `counterSetup.tablet.desc` | Runs the PurpleHere POS app — Android or Windows. | PurpleHere 계산대 앱을 돌립니다 — 안드로이드 또는 Windows. |
| `counterSetup.printer.title` | Printer | 프린터 |
| `counterSetup.printer.desc` | Kitchen tickets and receipts print by themselves, including table QR and kiosk orders. | 주방 티켓과 영수증이 저절로 나옵니다 — 테이블 QR·키오스크 주문까지. |
| `counterSetup.terminal.title` | GHL card terminal | GHL 카드단말기 |
| `counterSetup.terminal.desc` | The amount is sent automatically and recorded only when approved — card, e-wallet QR or DuitNow QR. Models differ, so apply through PurpleHere. | 금액이 자동으로 전송되고 승인될 때만 기록됩니다 — 카드·이월렛 QR·DuitNow QR. 기종이 달라 PurpleHere 를 통해 신청하세요. |
| `counterSetup.request` | Request a card terminal | 카드단말기 신청하기 |
| `counterSetup.download` | Download the POS app | 계산대 앱 받기 |

---

## 5. 하지 않는 것 (경계)
- PaymentModal · TerminalPanel · terminalSale 등 결제 흐름 파일 **무접촉**(문구 포함).
- 🔒 인쇄 보호파일 8개 · KDS · orders-crud **무접촉**. `check-print-guard.js` 변경 0 이어야 한다.
- GHL 수수료·계약·승인 기간·«파트너»·«무료 단말기»·«모든 GHL 기종 호환» 문구 금지.
- 패키지 DB 데이터·견적 API·새 라우트·GNB·사이트맵 변경 없음.
- `utils/tracking.ts`·`public/index.html`·Admin/InvoicesPage·SubscriptionsPage·routes/users.js (다른 방 작업 중) 무접촉.
- 기존 FAQ 글 수정 없음(새 2문항만) — 다음에 `hardware-not-required`·`supported-devices-and-browsers` 에 한 줄씩 보강하는 것은 «다음 할 일».

---

## 6. 구현 순서·검증 (팀원)

**순서** — 프론트 빌드 1회 원칙(2026-09-06): 백엔드·데이터·문구를 다 확정하고 마지막에 빌드.
1. 백엔드: 모델 ENUM + `migrate-contact-inquiry-type-card-terminal.js` + 레지스트리 · `routes/public.js` 메일 블록 2개 · FAQ 마이그+데이터 JSON(4개 언어) + 레지스트리 → dev 에서 마이그 2개 실행 · `pm2 restart dev-backend`.
2. 프론트: locales 4개 언어(landing·settings) → `CounterSetupStrip` → ContactPage(옵션·query·prefill·help) → CardTerminalSettings(꺼짐 안내) → FeaturesPage(points 5·띠) → DownloadPage(desc·띠) → PackagesPage·PricingPage 한 줄 → Admin 배지.
3. `npm run i18n:verify` → `npm run build:dev`(자리표) 1회 → `verify-all --full` 1회.

**검증(실호출·실브라우저 — 숫자로)**
- `POST /api/public/contact` `{inquiry_type:'card_terminal', …}` → 성공 + DB 행 `inquiry_type='card_terminal'` + 관리자 메일 로그(테스트 주소 @example.com) · 잘못된 값(`inquiry_type:'ghl'`) → 저장 실패가 500 로 새지 않는지 확인(기존 동작 그대로면 기록만).
- `SELECT COLUMN_TYPE FROM information_schema.COLUMNS WHERE TABLE_NAME='contact_inquiries' AND COLUMN_NAME='inquiry_type'` 에 `card_terminal` 포함 · 마이그 2회 실행 → 두 번째 0 변경(멱등).
- FAQ: `contents` 에 slug 2 × 언어 4 = 8줄 · `/faq?category=features` 에 두 문항 표시 · 마이그 재실행 시 표지로 건너뜀.
- 브라우저: `/` 카드 3 문구 · `/features`(restaurant 탭 띠 1개, brand 탭 띠 0) · `/download`(Windows desc·띠) · `/packages`·`/pricing` 한 줄 · `/contact?type=card_terminal` → 종류 선택됨 + 본문 틀 채워짐 · `/contact` 맨손 → 빈 선택·빈 본문 · 설정 › 결제 › 카드 토글 꺼짐 → 안내 3줄+버튼, 켜짐 → 안내 사라지고 기존 화면 · 버튼 클릭 → 새 탭 `/contact?type=card_terminal`.
- 게이트: `check-print-guard.js` 변경 0 · `check-design-guard.js` 신규 위반 0(스트립은 styled.section/div 만, 버튼은 공용 Button) · `check-sensitive-diff.js` · `check-migration-registry.js` · health-check 전체.
- **Fable 게이트 해당**: 운영 DB 마이그(ENUM 확장)가 들어가므로 공용 기준 `gate` ③ — 구현 끝나면 Fable 검증 1회(이 설계 1 + 검증 1 = 2회 한도 안). 마커는 그 Fable 세션이 찍는다.

**«확인할 곳» 보고 줄 예시**
- https://dev.purplehere.com/features — 매장 탭 맨 아래 «Tablet + printer + card terminal» 띠 · Card Terminal Integration 카드 5줄
- https://dev.purplehere.com/contact?type=card_terminal — 문의 종류 «Card terminal (GHL) request» 선택·본문 틀
- https://dev.purplehere.com/faq?category=features — 카드단말기 FAQ 2문항
- https://dev.purplehere.com/restaurant/38/settings?tab=payment — 카드 › Card terminal integration 꺼짐 상태 «What you need» [as=restaurant store=38]

---

## 7. 다음 할 일 (이번 범위 밖 — 기록만)
- RA 대시보드 설정 체크리스트에 «Connect counter devices(printer · card terminal)» 단계(완료 판정 규칙 설계 필요).
- 기능 페이지 `card_terminal` 스크린샷 2장(설정 화면 «Connected — same Wi-Fi» · 결제창 «Card / QR (Terminal)»).
- 기존 FAQ `hardware-not-required`·`supported-devices-and-browsers` 에 GHL 한 줄 보강(관리자가 고친 글 보존 규칙 때문에 별도 표지로).
- 블로그 글 1편 «계산대 세 가지로 끝내기»(/글쓰기 파이프라인).
