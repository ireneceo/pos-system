# Fable 판정 — 키오스크 «어디서 켜고, 어디로 들어가나» (2026-10-07, 사안 변경 추가 1회)

> 앞선 판정: `.claude/fable-verdict-20261007-kiosk-payment-split.md`(설계) · `…-gate.md`(게이트 §7 PASS) · 정리 `docs/KIOSK_MODE.md`.
> 이번 호출 근거: A(매장 영업·결제 설정이 손님 화면에 그대로 닿음) 크다 · C(«사용 여부» 를 어디에 어떤 형태로 두는가 — 길이 셋) 갈린다 → 성립.
> 코드 변경 0 · 운영 접근 0. 줄 번호는 2026-10-07 dev 기준.

---

## 0. 한 줄 결론

**좌측 메뉴 «설정» 에 «Kiosk» 항목을 Mobile Order 바로 아래에 만들고, 그 화면 맨 위에 «키오스크 사용» 스위치를 둔다. 스위치가 켜져 있을 때만 결제수단 화면에 Kiosk 열이 보이고, 기기 등록·키오스크 주문이 허용된다.** 스위치는 `mobile_settings.kiosk_enabled`(없으면 꺼짐) 한 칸이고, 서버가 같은 칸으로 거절한다(화면만 숨기는 게 아니다). 기존 매장은 전부 «꺼짐» 이라 아무것도 달라지지 않는다 — 마이그·운영 쓰기 0.

Irene 원문 두 질문에 대한 답(Irene 에게 그대로 전달할 문장):

| Irene 질문 | 답 |
|---|---|
| 「키오스크 카드기를 켜도 좌측메뉴에 키오스크 링크가 모바일오더처럼 안 나오는데 어떻게 접속해?」 | 지금은 안 나오는 게 맞습니다 — 키오스크 설정이 «Mobile Order» 화면 안의 카드 하나로 들어가 있어서였습니다(`SettingsPage.tsx:5190-5225`). 카드단말기 연동은 결제수단 › Card 안의 설정이라 켜도 메뉴는 안 바뀝니다. **이번에 «설정 › Kiosk» 메뉴를 따로 냅니다.** 순서는 ① Kiosk 메뉴에서 «키오스크 사용» 켜기 → ② 결제수단에 Kiosk 열이 나타나면 거기서 키오스크에서 받을 수단 고르기 → ③ 태블릿에서 관리자 로그인 후 Kiosk 메뉴의 «이 기기를 키오스크로 등록» → 그 태블릿이 손님 주문 화면으로 바뀝니다. |
| 「카드 단말기랑 강제로 무조건 사용하게 하는 키오스크 기능 아니면, 모바일오더처럼 키오스크 사용 여부는 어디서 설정해? 설정에서 쓸지 말지 정한 다음에 결제설정에도 나와야 하는 거 아니야?」 | **카드단말기를 강제하지 않습니다.** 키오스크는 결제수단 Kiosk 열에서 켠 수단(카운터 결제·이월렛 등)만으로도 됩니다. 카드단말기는 «그 태블릿이 Purple POS 앱 + 단말기 연동 켜짐» 일 때 **추가로** 열리는 선택입니다. «사용 여부» 는 지금까지 없었고(기기를 등록하면 그게 곧 사용이었습니다) **이번에 «설정 › Kiosk» 맨 위 스위치로 만듭니다. 말씀하신 구조 그대로 — 스위치를 켠 뒤에만 결제수단 화면에 Kiosk 열이 나타납니다.** 참고로 모바일오더에는 원래 사용/안 함 스위치가 없고 «주문 일시정지» 가 그 역할을 합니다(§6 참고). |

---

## 1. 실측 — 팀원 실측에 더해 내가 확인한 것

1. 사이드바 설정 섹션(🔒 `MainLayout.tsx:2080-2099`)은 `?tab=` 한 줄씩이다. Mobile Order 는 `{ path: …/settings?tab=mobileOrder, label: t('nav.mobileOrder'), visible: hasMenuPermission('settings') }` — **Kiosk 줄 하나를 같은 모양으로 더하면 된다.** 이 줄은 인쇄 블록 밖이고, 이 파일은 이미 이 사안(알림 판정·계산원 칸)으로 bless 대기 중이라 **같은 bless 묶음**에 들어간다(새 왕복 없음).
2. 탭은 `useTabParam`(`hooks/useTabParam.tsx:21`)이 URL 값을 그대로 `activeTab` 으로 쓴다 — 화이트리스트 없음. `TabType`(`SettingsPage.tsx:383`)에 `'kiosk'` 추가 + `PAGE_TITLE_BY_TAB`(`:2729`) 에 `kiosk: 'Kiosk'` + `{activeTab === 'kiosk' && …}` 블록이면 끝. 코어 3탭(`store/operations/managers`) 밖이라 탭바는 자동으로 숨고 독립 화면처럼 보인다(`:2746-2753` 주석의 설계 그대로).
3. 모바일 탭(`:5098-6024`) 카드 순서: 모바일 주문 주소 → 온라인 메뉴판 → **매장 태블릿(키오스크)** → 주문 일시정지 → 퀵오더 → 알림 → 추천 → 주문 유형 → … 키오스크 카드는 셋째 자리에 묻혀 있다. 통째로 옮겨도 다른 카드와 상태를 공유하지 않는다(`restaurantSlug`·`tableSettings.qrCodeBaseUrl`·`user.restaurantId`·`operationSettings.timeZone` 만 읽음).
4. `mobile_settings` 는 화면 상태 `mobileSettings`(`:1390-1392`, 로더 `:1645-1652`)를 통째로 저장(`:2541`)하고, 서버는 `guardShallowSettings`(`utils/settingsGuard.js:362-394`, 얕은 병합·빠진 키 보존)로 받는다 — `routes/store.js:209` · `restaurants-crud.js:1769` 두 길 다. **새 키 `kiosk_enabled` 를 넣어도 다른 저장이 지우지 않는다.** 공개 slug 응답(`mobile-public.js:146`)이 이미 `pause_ordering` 을 `pauseOrdering` 로 내보내는 자리가 있어 `kioskEnabled` 도 같은 줄에 붙는다.
5. 키오스크 첫 화면은 `OrderTypePage`(`MobileApp.tsx:40`)이고 `pauseOrdering` 안내(`OrderTypePage.tsx:717-731`)가 메뉴 대신 뜨는 분기가 있다 — «키오스크 꺼짐» 안내를 그 **앞**에 같은 모양으로 두면 된다. 등록 기기 판정은 `hasKioskToken()`(`utils/kioskDevice.ts`).
6. 서버 관문은 `middleware/kioskDevice.js stampKioskOrderSource`(🔒 밖, `server.js:465`). 등록 기기 주문이면 여기서 매장 일치·카드-단말기 확인을 이미 한다 — **«키오스크 꺼짐» 거절도 여기 한 곳**이다. `orders-crud.js` 무접촉. 등록 라우트 `POST /api/kiosk-devices`(`routes/kiosk-devices.js:65-87`)도 같은 칸으로 거절할 수 있다.
7. 모바일오더에는 사용/안 함 스위치가 없다 — 팀원 실측 맞다. 요금제 모듈 코드 `mobile_ordering` 은 랜딩(`FeaturesPage.tsx:506`·`PricingPage.tsx:452`)에만 있고 앱 어디서도 `hasModule('mobile_ordering')` 로 막지 않는다. 즉 모바일오더의 «끄기» = «주문 일시정지»(`mobile_settings.pause_ordering`) 뿐이다.
8. health-check `kiosk` 카테고리(`scripts/health-check.js:7509-`)는 데모 매장에 기기를 직접 만들어 주문한다 — 새 관문이 생기면 **그 매장의 `kiosk_enabled` 를 검사 중에만 켜고 원복**해야 한다(원본 파일 먼저 — 10-07 데모 38 결제설정 소실 교훈, 메모리 [[feedback_test_save_original_first]]).

---

## 2. 길 셋 — «사용 여부» 를 무엇으로 두나

| | **A. 명시 스위치 `mobile_settings.kiosk_enabled` (권고)** | B. 파생 — 등록 기기가 1대라도 있으면 «사용 중» | C. 요금제 모듈(`kiosk`)로만 |
|---|---|---|---|
| Irene 가 말한 «설정에서 쓸지 말지 정한 다음 결제설정에 나온다» | 그대로 | 반대 순서가 된다 — 기기를 **먼저** 등록해야 Kiosk 열이 보인다. 등록은 태블릿에서 직원 로그아웃까지 하는 동작이라, 결제수단을 미리 못 정하고 등록부터 하게 됨 | 매장이 못 끈다 |
| 끄면 | 등록 기기는 «키오스크 꺼짐» 화면(해제 안 함 — 다시 켜면 그대로 복귀) | 끄는 수단 = 전부 해제 → 다시 쓰려면 태블릿마다 재등록 | — |
| 새 상태 | 1칸(JSON 키) | 0 | 0 |
| 어긋남 가능성 | «켜짐 + 기기 0대» 는 그냥 준비 중 상태. «꺼짐 + 기기 있음» 은 기기가 꺼짐 화면을 보여 정직 | 없음 | — |
| 서버 강제 | 관문 1곳(§3 D4) | 이미 토큰이 강제 | — |

**A 로 간다.** B 가 «상태 하나 덜» 로 보이지만 설정 순서가 거꾸로 되고(결제수단보다 기기 등록이 먼저), 끄기가 곧 해제라 되돌리기 비용이 크다. C 는 다른 문제(요금제 어휘)고 지금 사안이 아니다 — 나중에 요금제에 키오스크를 넣더라도 A 의 스위치와 **AND** 로 겹치면 된다(모듈은 «살 수 있나», 스위치는 «쓰나»).

---

## 3. 설계 결정 (D1~D8) — 팀원이 바로 구현

### D1. 사이드바 — «Kiosk» 한 줄 (🔒 `MainLayout.tsx` 설정 섹션, Mobile Order 바로 아래)
```ts
{ path: `/restaurant/${rid}/settings?tab=mobileOrder`, label: t('nav.mobileOrder', 'Mobile Order'), visible: hasMenuPermission('settings') },
{ path: `/restaurant/${rid}/settings?tab=kiosk`,       label: t('nav.kiosk', 'Kiosk'),               visible: hasMenuPermission('settings') },
```
- 스위치 상태와 무관하게 **항상** 보인다(안 보이면 켤 곳이 없다). 잠금(`locked`) 없음 — 요금제 모듈은 §2 C 대로 범위 밖.
- 인쇄 블록 밖 한 줄. 이미 bless 대기 중인 이 파일의 승인 범위에 **이 한 줄을 추가**한다 — 게이트 diff 대조표에 적을 것.
- `nav.kiosk` 를 `common.json` 4개 언어에(en «Kiosk» · ko «키오스크» · zh «自助点餐机» · ms «Kiosk»).

### D2. 설정 탭 `kiosk` — 새 화면 (`SettingsPage.tsx`)
- `TabType` 에 `'kiosk'` · `PAGE_TITLE_BY_TAB.kiosk = 'Kiosk'`(기존 패턴이 영문 하드코딩이라 따라감).
- `{activeTab === 'kiosk' && (<SettingsGrid>…</SettingsGrid>)}` 블록. **카드 순서:**
  1. **«키오스크 사용»** 카드(`gridColumn: 1 / -1`) — `Toggle` + `AutoSaveField type="toggle"`(모바일 탭 «주문 일시정지» `:5229-5245` 와 같은 패턴, ref 는 새로 `kioskEnabledRef`) → `setMobileSettings(prev => ({ ...prev, kiosk_enabled }))` → `triggerSave()`. 힌트 1문단: «키오스크 = 매장이 등록한 태블릿에서 손님이 직접 주문. 켜면 결제수단 설정에 Kiosk 열이 생기고, 아래에서 태블릿을 등록할 수 있다. 카드단말기는 선택 — 태블릿이 Purple POS 앱이고 결제수단 › Card 의 단말기 연동이 켜져 있을 때만 키오스크에서 카드를 받는다.» 켜진 상태에서는 그 아래에 두 링크 버튼: «결제수단에서 Kiosk 열 정하기 →»(`?tab=payment`) · «카드 단말기 연동 →»(`?tab=payment`, 같은 화면 — 별도 앵커 불필요).
  2. **등록된 키오스크 태블릿** — 기존 `KioskDevicesCard` 를 **그대로** 이 탭으로 옮긴다(파일·props 변경 없음). 스위치가 꺼져 있으면: 등록 입력·버튼 `disabled` + 한 줄 «키오스크 사용을 켜면 등록할 수 있습니다». 이미 등록된 기기 목록·해제 버튼은 **꺼져 있어도 보인다**(잃어버린 기기를 끊을 수 있어야 한다). → `KioskDevicesCard` 에 prop `enabled: boolean` 하나 추가.
  3. **주소·QR** 카드(기존 `:5190-5222` 의 URL/복사/QR) — 셋째로 내리고 제목을 «등록 없이 화면만 키오스크 모양으로 열기(선택)» 로. 힌트는 기존 `kioskAccessHint` 그대로(미등록 기기 = 화면만 넓어짐, 결제수단은 모바일). 스위치 꺼짐이면 이 카드는 숨긴다.
- 모바일 탭(`:5190-5225`)에서 키오스크 카드를 **제거**. 그 자리에 아무것도 남기지 않는다(사이드바에 Kiosk 가 생겼다). 모바일 탭 카드 순서는 그 외 불변.
- `mobileSettings` 상태 타입(`:1390`)·초기값(`:1392`)·로더(`:1645-1652`)에 `kiosk_enabled: boolean`(로더 `!!restaurant.mobile_settings.kiosk_enabled`). 저장 경로는 기존 `:2541` 그대로.

### D3. 결제수단 화면 — Kiosk 열은 스위치가 켜졌을 때만
- `:2862-2884` Kiosk 토글 블록의 조건을 `mobileSettings.kiosk_enabled && !KIOSK_HIDDEN_METHODS.includes(key)` 로.
- 꺼져 있을 때 저장된 kiosk 값(`availableIn` 의 `'kiosk'` · `_kioskSplit`)은 **건드리지 않는다** — 다시 켜면 그대로 돌아온다. `handlePaymentToggle`·`splitKioskFromMobile`·`utils/paymentChannel` 무변경.
- 결제수단 화면 상단 설명 한 줄(선택): «Kiosk 열은 설정 › Kiosk 에서 키오스크 사용을 켜면 나타납니다». 힌트 키 `settingsPage.kioskDevices.columnHint` 문구를 거기에 맞춰 손봐도 된다(팀원 재량).

### D4. 서버 강제 — 같은 칸 한 곳 (`middleware/kioskDevice.js stampKioskOrderSource`, 🔒 밖)
- `req.kioskDevice` 가 있을 때, 매장 일치 확인 **직후·카드 확인 전**에: `Restaurant.findByPk(rid, { attributes: ['mobile_settings'] })` → `mobile_settings.kiosk_enabled !== true` 면 **409 `KIOSK_DISABLED`** («Kiosk ordering is turned off for this restaurant»). 상태코드는 기존 `TERMINAL_DISABLED` 와 같은 409 계열.
- `POST /api/kiosk-devices`(등록) 도 같은 판정 → 409 `KIOSK_DISABLED`. 목록·PATCH·해제·`/me` 는 꺼져 있어도 된다(관리 동작).
- `GET /api/kiosk-devices/me` 응답에 `kiosk_enabled` 를 더한다(기기가 «지금 꺼짐» 을 아는 보조 경로 — 화면은 D5 의 공개 응답을 쓴다; 이건 디버그·추후용).
- 판정 함수는 하나로: `isKioskEnabled(restaurantOrSettings)` 를 `middleware/kioskDevice.js` 에 export 하고 라우트가 그걸 쓴다(검사와 거절이 같은 조건 — 메모리 [[feedback_check_and_fix_same_sql]] 의 정신).
- **토큰 없는 요청·폰·`?kiosk=1` 미등록 기기는 영향 0** — 그들은 처음부터 모바일이다. 스위치는 «등록 기기의 키오스크 권한» 만 연다/닫는다.

### D5. 공개 응답 + 손님 화면 — «키오스크 꺼짐» 안내
- `routes/mobile-public.js:146` 옆에 `kioskEnabled: !!(restaurant.mobile_settings && restaurant.mobile_settings.kiosk_enabled)`.
- `OrderTypePage.tsx`: `storeData` 타입에 `kioskEnabled?: boolean`, 로더(`:417` 근처)에 매핑. 렌더 분기(`:717`) **앞**에 `hasKioskToken() && storeData?.kioskEnabled === false` → `pauseOrdering` 과 같은 모양의 상자: 제목 «Kiosk is turned off» · 본문 «Please order at the counter.»(i18n `menu:kiosk.off.title/body` 4개 언어, 장식 이모지 없이 — 기존 pause 상자의 `⏸` 글리프는 기존 코드라 그대로 두되 새 상자엔 넣지 않는다). 직원 로그인 링크는 **두지 않는다**(손님 손에 있는 기기 — 10-04 판정). 매장이 그 태블릿을 POS 로 되돌리려면 다른 기기에서 «해제» → 401 → `/pos?kiosk_revoked=1`(기존 경로).
- `pause_ordering`(주문 일시정지)은 **키오스크에도 그대로 적용**(오늘과 같음 — 같은 화면이고 «손님 셀프 주문 멈춤» 의미가 같다). 바꾸지 않는다.
- `KioskEntryGate` 무변경(등록 기기는 키오스크 주소로 가고, 거기서 D5 안내를 본다).

### D6. i18n (4개 언어 · `npm run i18n:verify`)
- `common.json`: `nav.kiosk`.
- `settings.json`: `settingsPage.kioskTab.enableTitle` · `enableLabel` · `enableHint` · `disabledRegisterHint` · `goPayment` · `goTerminal` · `urlCardTitle`. 기존 `kioskAccess*`·`kioskDevices.*` 키는 그대로 재사용.
- `menu.json`: `kiosk.off.title` · `kiosk.off.body`.

### D7. 문서
- `docs/KIOSK_MODE.md` §2 표의 «화면» 줄을 «매장 설정 › Kiosk»(사이드바 항목) 로 고치고, §1 원칙에 «**사용 여부 = `mobile_settings.kiosk_enabled`** (없으면 꺼짐). 켜야 Kiosk 결제 열·기기 등록·키오스크 주문이 열린다. 끄면 등록 기기는 꺼짐 안내를 보이고 해제되지 않는다» 한 줄. §3 에 «Kiosk 열은 스위치 켜짐일 때만 표시(저장값은 보존)». §6 에 health-check 추가분.
- `docs/ORDER_FLOW_MATRIX.md` §1 키오스크 줄에 «kiosk_enabled 꺼짐 → 409 KIOSK_DISABLED» 한 칸.

### D8. 범위 밖 (이번에 하지 않는다)
- **모바일오더 사용/안 함 마스터 스위치** — 지금 없고, «주문 일시정지» 가 그 역할. 운영 전 매장의 QR 주문에 닿는 변경이라 이 사안에 섞지 않는다(§6 Q1 로 Irene 에게 한 줄만 묻는다).
- 요금제 모듈 `kiosk`(§2 C) · 설정 체크리스트(`useSetupStatus.ts:229`)에 키오스크 항목 · 키오스크 전용 일시정지 · 🔒 `orders-crud` · 인쇄·KDS.

---

## 4. 파일 목록 (팀원용)

| 파일 | 변경 |
|---|---|
| 🔒 `dev-frontend/src/components/Layout/MainLayout.tsx` | 설정 섹션에 Kiosk 한 줄(D1). 인쇄 블록 밖. bless 묶음에 추가 |
| `dev-frontend/src/pages/Settings/SettingsPage.tsx` | `TabType`·`PAGE_TITLE_BY_TAB`·`mobileSettings` 타입/초기값/로더 · 새 `kiosk` 탭 블록(D2) · 모바일 탭에서 키오스크 카드 제거 · 결제수단 Kiosk 열 조건(D3) |
| `dev-frontend/src/pages/Settings/KioskDevicesCard.tsx` | prop `enabled` — 꺼짐이면 등록 입력·버튼 disabled + 힌트. 목록·해제는 유지 |
| `dev-frontend/src/mobile/pages/OrderTypePage.tsx` | `kioskEnabled` 매핑 + 꺼짐 안내(D5) |
| `dev-backend/middleware/kioskDevice.js` | `isKioskEnabled` export · `stampKioskOrderSource` 409 `KIOSK_DISABLED`(D4) |
| `dev-backend/routes/kiosk-devices.js` | 등록 409 `KIOSK_DISABLED` · `/me` 에 `kiosk_enabled` |
| `dev-backend/routes/mobile-public.js` | 공개 응답 `kioskEnabled`(D5) |
| `dev-backend/scripts/health-check.js` | kiosk 카테고리: fixture 가 데모 매장 `mobile_settings` 원본을 **파일로 먼저 저장**한 뒤 `kiosk_enabled=true` 로 켜고 cleanup 에서 원복 · 새 케이스 1건(§5-1) |
| `public/locales/{en,ko,zh,ms}/{common,settings,menu}.json` | D6 |
| `docs/KIOSK_MODE.md` · `docs/ORDER_FLOW_MATRIX.md` | D7 |

🔒 접촉: MainLayout 한 줄뿐. `orders-crud.js` · `useAutoPrintPoller.ts` · `billPrint.js` · `KitchenDisplayPage.tsx` · `POSTerminalPage.tsx` 무접촉. `check-print-guard` 는 MainLayout 1건만 떠야 한다(이미 떠 있는 것과 같은 파일).

---

## 5. 게이트 기준 (팀원이 증명 · 내가 판정)

1. **고장주입 2(필수):** ⓐ `stampKioskOrderSource` 의 `KIOSK_DISABLED` 분기를 빼면 → health-check 새 케이스(«꺼진 매장에 등록 기기 주문 → 409»)가 **실패**하는지 ⓑ 등록 라우트의 분기를 빼면 → «꺼진 매장 등록 → 409» 케이스가 **실패**하는지. 둘 다 원복 후 통과. 백엔드 주입이라 빌드 불필요(pm2 restart 뒤에 — watch 꺼짐).
2. **실호출:** `PATCH` 로 데모 38 `mobile_settings.kiosk_enabled` true → `GET /api/mobile/store/<slug>` 의 `kioskEnabled === true`; false → false. 그 사이 `show_featured`·`pause_ordering` 등 다른 키가 **바이트 그대로**인지(얕은 병합 증명). 검사 전 원본을 파일로 저장, 끝나면 원복.
3. **꺼짐 상태 등록 기기:** 토큰 있는 주문 → 409 `KIOSK_DISABLED` / 토큰 있는 `/me` 200 + `kiosk_enabled:false` / 해제 200. 켜짐 상태: 기존 kiosk 카테고리 3건 전부 통과.
4. **화면:** `verify-all --full` 1회(빌드 1회) — `settings?tab=kiosk` mount 크래시 0 · `?tab=payment` 에서 스위치 OFF 면 Kiosk 열 0개, ON 이면 수단마다 1개(headless 로 토글 개수 세기) · `?tab=mobileOrder` 에 키오스크 카드 0개 · 등록 기기 토큰을 localStorage 에 심은 headless 로 `/mobile/<slug>?kiosk=1` 열면 꺼짐 안내가 뜨고 메뉴 버튼 0개.
5. **회귀:** 미등록 브라우저 `?kiosk=1` 과 폰 QR 흐름은 스위치 ON/OFF 양쪽에서 오늘과 같음(결제수단 목록 스냅샷 비교). `paymentChannel.test.ts` · `kioskIdle.guard.test` 유지. `i18n:verify` 통과.
6. **🔒:** `check-print-guard` 변경 파일 = MainLayout 1개, diff = (이미 승인된 알림·계산원 줄) + (D1 한 줄) **정확히**. `check-sensitive-diff` · `health-check --category=print,kiosk,mobile,terminal`.
7. **배포 안전:** 마이그 0 · 스키마 0 · SW bump 는 프론트 변경 다 끝난 뒤 마지막 1회. 롤백 = 이전 번들(새 키는 있어도 무해 — 없으면 꺼짐).

---

## 6. Irene 에게 — 전달문과 결정 질문

**전달(§0 표 두 줄 그대로).** 그리고 아래 한 가지만 묻는다.

**Q1. 모바일오더에도 «사용/안 함» 스위치를 따로 만들까요?** (지금은 없고 «주문 일시정지» 가 그 역할입니다. Irene 원문 「모바일오더/키오스크 이렇게 설정에서 쓸지 말지 정한 다음에」 가 모바일오더에도 그런 스위치가 있다고 보신 것 같아 확인합니다.)
- **아니오(권고)** — 이번엔 키오스크 스위치만. 모바일오더는 «주문 일시정지» 로 멈추고, 결제수단 Mobile 열은 지금처럼 항상 보입니다. 운영 매장 QR 주문에 닿는 변경이 없습니다.
- 예 — 별도 사안으로 설계 1회 더. 기본값은 «켜짐» 이어야 하고(운영 매장 QR 주문이 끊기면 안 됨), 끄면 Mobile 열 숨김 + 공개 주소가 «모바일 주문 안 함» 안내를 보이게 됩니다. 일시정지와 역할이 겹쳐 둘의 관계(끄면 일시정지 무의미)를 정해야 합니다.
- **Fable 권고: 아니오.** 키오스크는 새 기능이라 «기본 꺼짐» 스위치가 자연스럽지만, 모바일오더는 이미 모든 매장이 쓰는 기능이라 «끄기» 는 일시정지로 충분하고, 스위치 하나를 더 두면 같은 뜻의 칸이 둘이 됩니다.

이 질문은 **구현을 막지 않는다** — 팀원은 §3 을 바로 진행하고, Q1 답이 «예» 면 그때 별도 사안으로 연다.
