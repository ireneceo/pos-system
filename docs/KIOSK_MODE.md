# 키오스크 (매장 태블릿 셀프 주문 · 결제)

> 단일 진실. 설계 판정: `.claude/fable-verdict-20261007-kiosk-payment-split.md` (Fable 2026-10-07, Irene 승인 «Fable 권고대로 해. 우리 완벽한 키오스크 필요해. 카드단말기랑 자동 연동 된»).
> 이전: 키오스크 = 모바일오더 표시 모드(`?kiosk=1`, 2026-09-10). 이 문서는 그 위에 «결제 분리» 를 더한 것이다.

## 1. 원칙

- **주문 흐름은 한 벌.** 키오스크용 새 페이지·주문 라우트·결제 라우트 없음. 같은 모바일오더(`/mobile/<slug>`) + 같은 `POST /api/orders`.
- **«키오스크» 는 URL 이 아니라 등록된 기기다.** 매장이 등록한 태블릿만 서버가 발급한 기기 토큰을 갖는다. 토큰이 있어야
  ① Kiosk 결제 채널 ② 카드단말기 결제 ③ 주문 꼬리표 `source='kiosk'` 가 열린다.
- 손님 폰은 등록할 수 없다. 폰이 `?kiosk=1` 을 열어도 화면만 넓어지고 결제수단은 모바일 그대로다 — **서버가 거절한다**.
- **사용 여부 = `mobile_settings.kiosk_enabled`** (설정 › Kiosk 맨 위 «키오스크 사용» 스위치, 없으면 꺼짐 — 기존 매장 변화 0).
  켜야 결제수단 화면에 Kiosk 열이 보이고, 기기 등록·키오스크 주문이 열린다. 끄면 등록 기기는 «키오스크가 꺼져 있습니다 — 카운터에서 주문» 안내를 보이고
  등록은 해제되지 않는다(다시 켜면 이어진다). 판정 한 곳: `middleware/kioskDevice.isKioskEnabled` (Fable 판정 `.claude/fable-verdict-20261007-kiosk-settings-entry.md`).
- **카드단말기는 강제가 아니다.** Kiosk 열에서 켠 결제수단(이월렛 · 온라인 결제)만으로 키오스크 주문이 된다. **카운터 결제는 키오스크에 없다**(2026-10-10 Irene «키오스크가 쓸 일이 없잖아. 카운터인데» · Fable 판정 `backups/fable-pending/fable-verdict-20261010-kiosk-checkout-layout.md` D1). 카드는 Purple POS 앱 + 단말기 연동일 때 더해지는 선택.

## 2. 기기 등록

| 무엇 | 어디 |
|---|---|
| 표 | `kiosk_devices` (`models/KioskDevice.js`, 마이그 `scripts/migrate-create-kiosk-devices.js` — 레지스트리 deploy) |
| 토큰 | 등록 응답에 원문 1회, DB 는 sha256 만. 기기 `localStorage` 의 `kiosk_device_token` (`dev-frontend/src/utils/kioskDevice.ts`) |
| API | `routes/kiosk-devices.js` — `POST /api/kiosk-devices`(등록) · `GET`(목록) · `PATCH /:id`(이름·기기별 단말기 주소) · `POST /:id/revoke`(해제) · `GET /me`(기기 토큰으로 «아직 등록돼 있나») |
| 권한 | 매장 관리자(Restaurant Admin)·System Admin + 그 매장 접근. 남의 매장 기기는 404 |
| 화면 | 좌측 메뉴 **설정 › Kiosk** (`?tab=kiosk`): ①키오스크 사용 스위치 ②등록된 키오스크 태블릿(`pages/Settings/KioskDevicesCard.tsx`, 꺼짐이면 등록만 막고 목록·해제는 유지) ③(선택) 등록 없이 화면만 키오스크 모양으로 여는 주소·QR. 좌측 메뉴 맨 위쪽 **Kiosk** 항목 = 키오스크 화면 열기(꺼져 있으면 설정 › Kiosk 로) |

- **등록:** 매장 관리자가 **그 태블릿에서** 로그인 → 이름 입력 → «이 기기를 키오스크로 등록» → 토큰 저장 → 직원 로그인 삭제 → `/mobile/<slug>?kiosk=1`.
- **앱 시작:** 안드로이드 앱은 `/pos` 로 뜬다 → `components/Kiosk/KioskEntryGate.tsx` 가 «토큰 있음 + 직원 로그인 없음» 이면 키오스크 주소로 보낸다.
- **직원이 나가기(2026-10-10):** 키오스크 첫 화면(주문 방식 고르기) 아래 «← Back to Dashboard». 직원 로그인 있음 → 그 역할 대시보드(`utils/dashboardPath` · 오너 포함). 없음(등록 기기) → `/pos?staff=1` = 직원 로그인 화면(관문이 키오스크로 되돌리지 않음) + 맨 위 «← Back to kiosk». 키오스크에선 PurpleHere 홈페이지 링크·purplehere.com 바깥 링크를 그리지 않는다(손님이 매장 화면을 벗어나 랜딩으로 가던 결함). 폰(키오스크 아님·비로그인)은 그대로 홈페이지 링크.
- **해제:** 어느 기기에서든 «등록 해제» → 그 기기의 다음 요청이 401 `KIOSK_REVOKED` → `utils/httpClient` 가 토큰을 지우고 `/pos?kiosk_revoked=1`.
- 기기 토큰은 `utils/httpClient` 한 곳에서 `/api/orders` · `/api/terminal/` · `/api/kiosk-devices/me` 요청에만 실린다.

## 3. 결제 채널 (pos · mobile · kiosk)

- 결제수단마다 `availableIn` 에 `'kiosk'` 를 둔다. 설정 화면 결제수단 줄에 POS · Mobile · **Kiosk** 토글.
- **기존 매장 무변화:** `payment_settings._kioskSplit` 표시가 없으면 키오스크 = 모바일 값. 매장이 Kiosk 토글을 처음 만지는 순간
  지금 보이던 값을 굳히고(`splitKioskFromMobile`) 표시를 단다 — 그 뒤로 따로 저장. 마이그·운영 데이터 쓰기 0.
- 키오스크에서 **숨김**: 현금 · 직원식 · 계좌이체(송금 증빙 업로드는 공용 기기에 부적합) · **카운터 결제**(2026-10-10). 분리 여부와 무관 — 설정 화면 Pay at Counter 줄에도 Kiosk 토글이 없다.
  카드 거절 뒤 «카운터에서 결제»(이미 만든 주문을 카운터로 넘기는 복구, §5)는 결제수단이 아니라 이 목록과 무관하다.
- **키오스크 모양 화면(`?kiosk=1`, 미등록)도 숨김 목록은 적용**한다(화면이 더 숨기기만 — 서버와 어긋남 없음). 켜짐/꺼짐 값은 미등록이면 Mobile 열이다. 매장이 키오스크를 켰는데 미등록 태블릿이면 결제수단 위에 «이 태블릿은 키오스크로 등록되지 않았습니다 — 모바일 결제수단을 보입니다» 한 줄, 설정 › Kiosk ③ 주소 카드에도 같은 뜻의 한 줄.
- 같은 규칙 두 곳: 서버 `utils/paymentMethodGuard.methodOpenIn` · 화면 `utils/paymentChannel.methodOpenIn` (단위 검사 `paymentChannel.test.ts`).
- **서버 강제:** `orders-crud` Defence B 가 손님 주문(`mobile`·`kiosk`)에 채널을 넘긴다 → 그 채널에 안 열린 수단이면 400 `PAYMENT_METHOD_NOT_OPEN_IN_CHANNEL`. POS 직원 주문은 오늘처럼 무검사.
- 결제수단 화면의 Kiosk 열은 **키오스크 사용이 켜졌을 때만** 보인다(꺼도 저장된 값은 보존 — 다시 켜면 그대로).
- `normalizePaymentSettings` 는 `_kioskSplit` 을 보존한다. 설정 화면 결제수단 목록은 `_kioskSplit` 을 줄로 그리지 않는다.

## 4. 주문 꼬리표 `source='kiosk'` (🔒 승인 변경 — Irene Q2 «예»)

- `server.js` 에서 `/api/orders` 앞에 `authenticateKioskDevice` + `stampKioskOrderSource` (🔒 orders-crud 밖) — 기기 토큰이 있으면 출처를 `kiosk` 로 고정(자기 매장만, 아니면 403), 토큰 없이 `kiosk` 면 400 `KIOSK_NOT_REGISTERED`, 키오스크 카드 주문인데 단말기가 꺼져 있으면 409 `TERMINAL_DISABLED`.
- 🔒 `routes/orders-crud.js`: 손님 주문 계열 = `mobile`+`kiosk` (자동머지 상대·테이블 필수·결제수단 가드·상태 결정). **키오스크 카드 주문은 승인 전 `outstanding`** (거절된 카드 주문을 조리하지 않는다).
- 🔒 `MainLayout.tsx` 모바일 주문 알림에 키오스크 포함 · 🔒 `MainLayout.tsx`/`useAutoPrintPoller.ts` 티켓 계산원 칸에 `Kiosk`. **인쇄 경로(발행·폴러 판정·티켓 내용 구성) 무접촉.**
- LiveOrders 뱃지·상세·KDS 타입은 원래 `kiosk` 를 알고 있었다.

## 5. 키오스크 카드단말기 결제

전제: 태블릿 = Purple POS 앱(브릿지 `window.__NATIVE_ECR`) + 등록 토큰 + 매장 `card.terminal.enabled` (+ 기기별 단말기 주소가 있으면 그것).
화면은 브릿지가 있고 `GET /api/terminal/config` 가 «켜짐» 일 때만 카드를 보인다.

```
[카드로 결제]  (mobile/pages/PaymentPage.tsx — 카운터 결제와 같은 주문 생성 길, skipAutoMerge)
 1. POST /api/orders (기기 토큰 · payment_method card)        → 주문 outstanding (주방 X)
 2. runTerminalSale (utils/terminalSale — 계산대와 같은 흐름: BUSY 자동 대기 · Reprint 복구 · 상태조회)
      POST /api/terminal/transactions (order_id 필수, 키오스크 주문만) → 브릿지 운반 → /response → 서버 판정·주문 연결
 3. POST /api/orders/:id/payments { terminal_transaction_id } (기기 토큰)
      서버가 그 거래에서 금액·수단·참조를 읽는다(화면 값 무시). 조건: 기기 매장=주문 매장 · 주문 source kiosk ·
      이 주문에 연결된 approved 판매 · 이 기기가 만든 거래. 같은 승인 재기록은 deduped.
      완납이면 키오스크 주문만 outstanding → pending (주방 발행은 기존 폴러)
 4. 추적 화면
```

- 손님 창 `mobile/components/KioskCardPanel.tsx`: 진행 안내 · 거절/단말기 못 찾음 → «다시 시도» 또는 «카운터에서 결제» ·
  결과 모름(무응답) → 다시 긁기 없음, «직원에게» · 승인됐는데 기록 실패 → «결제됐습니다, 주문번호를 직원에게».
- 키오스크 토큰으로 되는 단말기 호출: `GET /config` · `POST /transactions` · `/:id/response` · `/:id/recover` · `/:id/check-status`.
  **안 되는 것(403):** 수동 기록 · Void · 연결 · 찾기(echo·discovery) · 주소 저장 · 목록 — 직원 판단 영역.
- 키오스크가 만든 거래는 `device_label` 머리가 `kiosk#<기기번호> ` — 자기 기기 거래만 이어서 다룬다(남의 것 404).
- **복구:** 승인 뒤 기록이 실패해도(앱 꺼짐) 직원이 FloorPlan·LiveOrders 에서 같은 주문에 카드를 고르면 `409 ALREADY_APPROVED` 로 그 승인을 재청구 없이 기록한다(기존 경로, 새 코드 0). 카운터에서 결제 선택 주문도 FloorPlan 에서 평소대로.

## 5-1. 화면 배치 — 오른쪽 장바구니 상시 (2026-10-07 Irene · 2026-10-10 결제 패널·세로)

- **(2026-10-10 풀화면) 흐름은 한 벌, 틀은 두 벌** — Irene «좌우 여백 왜 남겨? … 모바일때매 못 바꾸면 같이 가지마». 설계 `backups/fable-pending/fable-verdict-20261010-kiosk-fullscreen.md`.
  - 틀: `mobile/components/common/KioskLayout.tsx` — `MobileLayout` 이 키오스크(메뉴판 모드 제외)면 이 틀로 넘긴다(페이지 코드는 그대로). 폭 전체(좌우 24px) · 브랜드 띠·1120 상자·**아래 Home/Menu/Cart 바 없음** · 위 바 72px 하나(«↺ 처음으로»/«‹ 뒤로» · 제목 · 테이블/주문방식 칩) · 유휴 리셋은 이 틀이 한다.
  - 치수: 같은 파일 `KIOSK_TOKENS`(CSS 변수). 페이지 styled 는 `var(--mo-xxx, <폰 값>)` 로 읽어 **폰은 0 변경**(폰 390×844 스크린샷 변경 전후 픽셀 비교로 확인). 새 `$kiosk` 삼항 대신 토큰.
  - 아래 버튼(담기·결제·장바구니·QR 확인)은 **고정(fixed) 바가 아니라 본문 안 `KioskActionBar`(sticky)** — 다른 요소를 가리지 않는다. `kioskSplitBarCss` 폐기.
  - 가로 메뉴 = 3칸(카테고리 세로열 | 격자 auto-fill 210px | 장바구니 패널 `clamp(340px,24vw,440px)`), 세로 메뉴 = 검색 + 카테고리 알약 + 격자 + 아래 장바구니 바. 첫 화면 = 큰 타일 격자(가운데 최대 960). 결제 가로 1280 이상은 왼쪽 입력 2열, 결제 실패 문구는 패널 안.

- **2칸은 가로일 때만**: 폭 1024 이상 **그리고** 폭 > 높이(`useKioskSplit`). 세로 태블릿(800×1280 · 1080×1920)은 폭과 무관하게 한 칸 — 메뉴 폭 전체 + 아래 장바구니 바, 결제는 큰 결제수단 타일(폭 600 이상 2열) + 아래 sticky 결제 바(`KioskActionBar`).
- **가로 결제 화면 = 오른쪽 패널에 장바구니 줄 + 합계 + 결제수단 + 결제 버튼**(`KioskCartAside` 의 `footer` 칸). 왼쪽은 입력(손님정보·메모·쿠폰·테이블)만, 주문 요약·화면 아래 고정 바는 그리지 않는다. 합계는 결제 화면 식(쿠폰·포인트·포장비 반영) 하나 — 폰·세로·가로가 같은 조각(`summaryRows`·`paymentMethodBody`·`payHintText`·`payButtonContent`)을 꽂는다. 품목이 많으면 패널 안 줄 목록만 스크롤.
- (2026-10-07) 넓은 가로 키오스크에서는 메뉴·상품 상세·결제·QR 결제·온라인 결제 화면 모두 오른쪽 같은 자리에 장바구니(`mobile/components/KioskCartAside.tsx`).
- 메뉴·상세: 합계 + «결제하기»(바로 결제 화면). 결제 화면: 위 결제 패널(수량 수정 가능, 결제 진행 중엔 보기 전용). QR·온라인: 보기 전용.
- 넓은 키오스크의 `/cart` 는 메뉴로 보낸다.

## 6. 검증

- `node scripts/health-check.js --category=kiosk` (4건): 등록·해제·401 / 사용 스위치(꺼짐 → 등록 기기 주문·새 등록 409 `KIOSK_DISABLED`, /me·목록은 됨, 공개 응답 `kioskEnabled`, 폰 주문 무영향) / 출처·채널·다른 매장 / 카드 기록 4조건·멱등·직원 전용 403.
  사용 스위치 고장주입 2건(주문 관문·등록 관문 제거) 모두 실패로 잡힘(2026-10-07). 검사는 데모 매장 `mobile_settings` 원본을 파일로 먼저 저장하고 끝에 되돌린다.
  고장주입 4건(토큰 없는 kiosk 허용 · 매장·기기 확인 제거 · 승인 확인 제거 · 채널 검사 제거) 모두 실패로 잡힘(2026-10-07).
- 화면 jest: `src/utils/paymentChannel.test.ts`.
- 2단계 실기(앱 기기 + 실단말기)는 GHL 파일럿과 같은 날: 승인→paid·pending·주방 티켓 1장 / 거절→outstanding 유지·FloorPlan 처리 /
  승인 직후 앱 강제 종료 → FloorPlan 카드 → ALREADY_APPROVED 재청구 0 / 해제 뒤 401.

## 7. 범위 밖

손님 QR 세션 · 메뉴판 모드 · 🔒 인쇄 경로 · KDS 단계 · 안드로이드 키오스크 잠금(기기 설정) · 오프라인 키오스크(카드는 온라인 전제 — 연결 없으면 카드 주문을 큐에 넣지 않는다).
