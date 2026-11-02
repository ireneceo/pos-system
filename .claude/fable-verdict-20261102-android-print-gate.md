# Fable 완료 검증(gate) 판정 — 안드로이드 앱 자동인쇄 백지 수정(0.4.1) + 와이파이 프린터 안내·자동 찾기 (2026-11-02)

> 판정자: Fable(리더). 요청: Opus 팀원(사실 전달). 설계 기준: `/var/www/.claude/fable-design-20261102-android-raster.md`.
> 읽은 것: 설계 · `OffscreenHtmlRenderer.kt` 전체 · `NativePrintPlugin.kt`/`build.gradle` diff · `NativeEcrPlugin.kt discover`/`exchangeJob` · `run-v3.js`/`expr/v3.json`/`run-v4.js` diff · `AndroidPrinterSetup.tsx`(신규) · `wifiPrinterDiscovery.ts`(+test) · `SettingsPage.tsx` diff · i18n 4언어 키 · `useAutoPrintPoller.ts`(읽기만) · `billPrint.js` 라인 4658(읽기만) · `ANDROID_APP_DESIGN.md` diff · 로그 `v3-a2-34/36.log` · `v4-a2-34.log` · `v3-fix-34b.log`(A 판 실패) · `v4-run2.log`(수정 전) · `v3-a2-logcat.txt`/`v4-a2-logcat.txt` · `verify-all.log` · `release-041.log` · `check-print-guard`(지금 실행 8/8) · `check-sensitive-diff`(지금 실행).
> 코드·운영 무변경. 마커 **안 찍음**(아래 §0).

---

## 0. 결론

**판정: 보류(HOLD) — 조건부 PASS.** 설계 범위·A-2 이탈·웹 안내·자동 찾기·반증 기록은 모두 받아들인다. **막는 것은 하나: «긴 티켓» 검사가 없다.** A-2 는 렌더 WebView 를 **화면 안**에 두어 살린 방식인데, 시험한 티켓은 전부 한 화면보다 훨씬 짧다(576×49·141·201·229px, 에뮬레이터 화면 1600px). 실매장 티켓(주문 10품목·로고 영수증)은 태블릿 화면 높이(800~1200px)를 넘기는 일이 흔하다. Chromium 은 **창 밖(화면 아래) 부분엔 타일 예산을 적게 준다** — A 판(화면 왼쪽 바깥)이 한 장 걸러 백지였던 것과 같은 원리이고, A-2 판 logcat 에도 `tile memory limits exceeded` 가 **여전히** 찍힌다(V3 13건 · V4 4건). 즉 «윗부분은 나오고 아래가 흰 티켓» 가능성이 검증되지 않았다. 설계 §3-2 A-3 가 바로 이 증상(«위쪽 한 화면 높이까지만 잉크»)을 위해 남겨 둔 단계다.

**조건(둘 다 Opus 가 할 수 있는 기계 검사):**
1. **V3-2e «긴 티켓»** 추가 — 높이 ≥ 에뮬 화면 2배(≥3200px, 예: 100줄 한글 품목) `printHtml` → ① 전체 잉크 2~60% ② **아래쪽 25% 줄의 잉크 ≥ 1%**(래스터는 위→아래 순서라 바이트 끝 25% 로 판정) ③ 응답 `ok:true`. API 34 1회 필수(36 은 선택). **실패하면 설계 A-3(`MainActivity.onCreate` 에 `WebView.enableSlowWholeDocumentDraw()` 1줄, super 앞) → 재빌드 1회 → V3 전체 재실행.** A-3 도 실패하면 B 로 가지 않고 설계를 다시 받는다.
2. **커밋 범위** — 이 묶음 파일만(§4 목록). 작업 트리에 함께 있는 GTM 추적(`tracking.ts`·`index.html`·`docs/MARKETING_TRACKING.md`·`gtm-container-purplehere.json`)·`playwright.config.js`·`oneoff-kdine-*` 는 **넣지 않는다**(GTM 게시 확인 전 운영에 나가면 GA4 가 멈춤 — 메모리 reference_marketing_tracking_single_source).

조건 1 의 로그(`v3-*-34.log` + logcat)를 보내면 **로그 읽기만으로 재판정**(짧게)하고 그때 마커를 찍는다. 재판정에서 볼 것은 V3-2e 한 줄 + 나머지 16건 유지 + 지문이 바뀐 파일이 §4 목록 안인지.

## 1. 설계 범위 대조

| 파일 | 설계 | 실제 | 판정 |
|---|---|---|---|
| `OffscreenHtmlRenderer.kt` | §3-2 A(붙임→visual state→draw→떼기) + §3-3 가드, 규칙 4 추가, 반환형 결과 | 그대로. 붙이는 위치만 A-2(index 0·화면 안·translationX 없음). `NO_WINDOW`/`VISUAL_STATE_TIMEOUT`(5초)/`BLANK_RENDER`(<0.2%)/`RENDER_ERROR`/`TIMEOUT` 다 있음. 모든 종료 경로가 `finish()` 로 removeView→destroy→latch. visual state 콜백 뒤 한 프레임 더 기다려 부모 레이아웃 반영(`view.height`) — 설계 5번 그대로 | ✅ |
| **A-2 이탈** | §3-2 «비상 단계 — 게이트 실패 시 순서대로» · §5-1 «A 실패 → A-2 → A-3» | A 판 V3 15건 중 3건 실패 기록(`v3-fix-34b.log`: 2b ink 4.8% 인데 2c 가운데 1장 BLANK_RENDER·2d 래스터 2장) → A-2. A-3·B 안 함. MainActivity 무변경 | ✅ **정당** — 설계가 허용한 순서 그대로. 단 A-2 는 «화면 안» 이라 §0 의 긴 티켓 질문이 새로 생김(설계가 A-3 를 남겨둔 이유) |
| `NativePrintPlugin.kt` | `render(activity,…)` 1줄 + 오류 문자열 전달 | 2줄(주석 포함), 레인·타임아웃·rasterize·send 무변경 | ✅ |
| `build.gradle` | 0.4.1 / 9 | 그대로 | ✅ |
| `run-v3.js`·`v3.json` | V3-2c(3장 연속·2~60%·서로 다름) | 있음 + V3-2d(빈 HTML→BLANK_RENDER·0바이트) + V3-8(자동 찾기) + 2b 상한 60% | ✅ (2d 는 설계 §5-1 «가드 반증» 행 그대로) |
| `run-v4.js` | V4-2·V4-6 잉크 2~60% | 있음 + 픽스처 `order_number` 추가 + reload 를 setTimeout 뒤로 | ✅ — 두 추가는 **도구 결함 수정**(설계 외지만 앱·웹 동작 무관). `order_number` 없는 픽스처가 7월부터 V4 를 0바이트로 보이게 했다는 서술은 그럴듯하나 **내가 재현하진 않았다** |
| `ANDROID_APP_DESIGN.md` | §7-2 정정·§10 0.4.1 | 그대로 + 0.4.0 «제출 보류→0.4.1 대체» | ✅ |
| 🔒 8파일 · `hybridKitchenPrint` · `MainActivity` · `PrinterRegistry` · `nativePrintBridge` | 0줄 | `check-print-guard` 8/8 무변경(지금 실행). git status 에 그 파일들 없음 | ✅ |
| **설계 밖 — 웹 3파일 + i18n + sw.js** | §8 «안내·표준 = Fable 없이 팀원 진행 가능» · «자동 찾기 = 네이티브 추가면 별도 설계 1회» | 네이티브 추가 **없이** 기존 `__NATIVE_ECR.discover`(0.3.2+) 를 9100 으로 재사용 → 웹만. SettingsPage 는 Android 카드 **이동**(삭제 179줄 ≈ 신규 파일로 이사) + 앱 안에서 방법 탭 숨김 + 안내·준비 점검 탭 맨 위 | ✅ **받아들임** — §8 의 «별도 설계» 조건은 «네이티브 SETUP 메서드 + 새 기능» 이었고, 그게 없다. 백지 수정과 한 커밋에 묶이는 건 설계가 피하라고 한 것이지만, 절단면이 네이티브(앱)↔웹으로 완전히 갈려 있어 게이트가 흐려지지 않는다(print-guard 가 그 증명). 조건: 커밋 메시지에 두 묶음을 구분해 적는다 |

**설계 외 변경 0건 판정의 한계:** `check-sensitive-diff` 는 «운영 배포 스냅샷 대비» 라 이번 달 미배포 커밋 전부(발주·인증·마이그 등 197+건)를 «FABLE 게이트 대상» 으로 올린다 — **이 묶음의 파일은 ①②③⑤ 어느 칸에도 없다**(인쇄 보호파일 0 · 돈 0 · 마이그 0 · 보안 0). 이 일의 게이트 사유는 설계 §3 «인쇄 파이프라인(네이티브)» 자체다.

## 2. 자동 찾기 — 받아들일 만한가 · 안전한가

**받아들인다.** 근거:
- `NativeEcrPlugin.discover`: 이 기기 **사설 대역만**(isPrivate · 최대 /22 · 1100호스트) · 9100 **connect 1.5초** · 열린 호스트에만 `probeHex` 전송 · 응답 3초 대기 · `probed[]` 로 전부 돌려줌. 웹은 `probed` 의 host 만 쓴다(단말기 판정 `hosts` 는 비어 있는 게 정상 — V3-8 실측 `hosts:["10.0.2.2"]` 는 하니스가 probed 를 hosts 로 이름 붙인 것).
- **보내는 3바이트 `10 04 01`(DLE EOT 1)** = ESC/POS 실시간 프린터 상태 질의. 종이에 찍히지 않고 1바이트 답만 온다(V3-8: 가짜 프린터가 받은 것 = 그 3바이트 1건, `ESC @`·컷 0). 상태 질의를 모르는 프린터는 무시한다. 9100 을 쓰는 비-영수증 기기(사무용 레이저의 JetDirect)에 3바이트 제어문자가 가도 인쇄 가능 문자가 없어 종이가 나오지 않는다.
- 🔒 무접촉: 찾은 주소는 `__NATIVE_PRINT_SETUP.addNetPrinter` 등록부로만 간다. billPrint 는 이 파일을 모른다.
- 메모리 규칙 준수: 안내문에 «IP 고정하세요» 없음(ko/en 확인 — 기존 QZ 안내의 «고정 IP 설정» 줄은 QZ 탭 것으로 앱 안에선 숨겨짐). 주소가 바뀐 프린터는 «이 주소에서 안 보임 → 새 주소로 바꾸기»(같은 이름 upsert) — 자동이 수동을 대신하는 올바른 방향.
- jest 3/3 + 고장주입(probe 바꾸면 1 실패) 반증 — 받아들임.

**알고 있을 것(막지 않음, 다음 묶음·안내 문구 후보):**
- 찾기는 열린 호스트마다 **순차** 3초 대기 → /22 에 프린터 3대면 ~35초(안내는 «약 20초»). /24 실측 9.5초.
- 찾기 중 그 프린터의 9100 연결을 최대 3초 점유 → 그 순간 자동인쇄 발송은 실패하고 **폴러가 다음 주기에 재시도**(V4-5 가 «실패는 도장 안 찍음» 증명). 안내에 «주문이 몰릴 때는 찾기를 누르지 말 것» 한 줄이면 충분.
- 9100 이 열린 사무용 프린터가 후보에 섞일 수 있다 — «추가 후 테스트» 안내가 있어 사람이 가른다.

## 3. 검증 충분성

| 항목 | 설계 기준 | 결과 | 판정 |
|---|---|---|---|
| V3-2b | 2~60% · API 34+36 | 6.7% / 6.6% | ✅ |
| V3-2c | 3장 연속 각 2~60% · 서로 다름 | 4.8/5.7/5.1 · 4.6/5.6/5.0 | ✅ |
| V3-2d 가드 반증 | BLANK_RENDER · 0바이트 | 양 API 통과(logcat `render blank: ink=0.0000 576x8`) | ✅ |
| V3 나머지 | 13/13 유지 | 15/15 · 16/16 | ✅ |
| V4-1~6 | 유지 + 잉크 | 6/6 · V4-2 8.1% · V4-6 10.2% | ✅ |
| 반증 기록 | 수정 전 0.0/0.1% | `v4-run2.log` 0.0% · A 판 3건 실패(같은 판정식) | ✅ |
| 무접촉 | print-guard 8/8 | 8/8(내가 지금 실행) | ✅ |
| 빌드 | EXIT 0 · 서명 동일 · code 9 | `release-041.log`: 서명 b55813cf… APK·AAB 동일 · AAB f193331b…17f1 · code 9 | ✅ |
| 웹 | verify-all --full | 23/24 — 실패 1 = deploy-ready(`releases/` 기록 없음 = 배포 준비 단계 산출물, 이 일과 무관) · mount sweep 크래시 0 · i18n 4언어 키 수 동일(android 31 · androidGuide 25 · androidReady 15 · matrixRow3Why) · design-guard/tsc 신규 0 | ✅ |
| **긴 티켓(화면 높이 초과)** | 설계에 없음 — A-2 로 바뀌면서 필요해짐 | **미검증** | ❌ **§0 조건 1** |
| 실기기 종이 | §5-2 | 0회(사실대로 기록됨) | Irene 할 일 |

**판정 기계 의심(규율 3):** V3-2d 가 BLANK_RENDER 를 내고 V3-2b/2c 가 2~60% 안에 서로 다른 값으로 들어온 것 = 검사기가 «항상 같은 답» 이 아님을 보여 준다. 잉크 계산이 `GS v 0` 헤더 뒤 바이트의 비영 비율이라 «흰 줄 = 0x00» 가정이 맞는지도 확인 — 래스터는 1=검정이므로 맞다.

**안내·준비 점검의 판정식 대조(`AndroidPrintReadiness` ↔ `useAutoPrintPoller`):**
- 다중 POS 판정 — 폴러: `workstations>1 && (!wsId || activeBill.autoPrint===false)` 면 건너뜀. 점검: `ws 찾음 && ws.billPrinter.autoPrint!==false` 면 초록. **초록인데 폴러가 안 찍는 경우 없음**(거짓 초록 0). wsId 가 있는데 목록에 없는 기기만 점검은 주황·폴러는 폴백 인쇄 — 거짓 주황이라 무해.
- 주방 자동인쇄 — 둘 다 `kitchenPrinter.enabled && autoPrint`(마스터) 기준. ✅
- 프린터 이름 — 등록 이름(대소문자 무시) 또는 raw IP 만 초록. 앱의 `PRINTER_NOT_FOUND` 와 같은 기준. ✅
- **거짓 주황 1건(막지 않음):** 스테이션이 있는데 그 스테이션 프린터가 비어 있으면 점검은 «프린터 안 고름», billPrint(4658줄)는 마스터 주방 프린터로 폴백. 다음 웹 묶음에서 «스테이션 → (마스터) 이름» 으로 보이게 고치면 된다. 지금 고치면 빌드+sweep 13분 재실행이라 미룬다.
- **확인 못 함:** 앱 버전 줄은 `__NATIVE_PRINT.version` 을 렌더 시점에 읽는데 브릿지는 버전을 **나중에** 채운다(`nativePrintBridge.js: version:null` → 비동기). 설정 화면이 다른 상태 변경으로 재렌더되면 보이지만, **0.3.4 태블릿에서 주황 «업데이트» 줄이 실제로 뜨는지는 실기기로만 확인된다** → §5 Irene 확인 항목에 넣음.

## 4. 커밋·배포 조건

- **커밋 = 이 묶음만:** `mobile-app/android/.../OffscreenHtmlRenderer.kt` · `NativePrintPlugin.kt` · `build.gradle` · `mobile-app/docs/ANDROID_APP_DESIGN.md` · `mobile-app/scripts/verify/{run-v3.js,run-v4.js,expr/v3.json,expr/.v4.json}` · `dev-frontend/src/pages/Settings/{SettingsPage.tsx,AndroidPrinterSetup.tsx}` · `dev-frontend/src/utils/wifiPrinterDiscovery.ts` + `__tests__/…` · `public/locales/*/settings.json`(4) · `public/sw.js` · `.claude/session-state.md` · 이 판정문·설계문. **제외:** `tracking.ts` · `public/index.html` · `docs/MARKETING_TRACKING.md` · `docs/gtm-container-purplehere.json` · `e2e/playwright.config.js` · `.claude/oneoff-kdine-issued-at-20261030.js`.
- 운영 웹(설정 화면 안내·찾기·준비 점검)은 다음 정기 배포에 실린다 — 0.3.4 앱에서도 동작(discover 는 0.3.2+). 0.3.4 사용자에겐 준비 점검이 «업데이트» 주황 줄을 보인다(§3 확인 못 함 참고).
- APK/AAB: 이미 `dev-apps/PurplePOS-0.4.1.*` 에 있음. 운영 피드(`/desktop/`)·Play 는 §5·§6.
- SW 6.06 올림 ✅. 마이그 0.

## 5. Irene 에게 남길 것

**A. 실기기 종이 확인(상황판 «Irene 할 일», `check:true`) — 설계 §5-2 6항목 + 아래 3개 추가:**
준비: 태블릿에 `https://dev.purplehere.com/dev-apps/PurplePOS-0.4.1.apk` 사이드로드(같은 키라 0.3.4 위에 덮어씀) · 와이파이 영수증 프린터 · 데모 매장 38 · 설정 › 프린터 탭에서 «와이파이 프린터 자동으로 찾기» 로 등록(이것 자체가 확인 1).
1. 찾기 버튼 → 프린터가 목록에 뜨고 «추가» → 아래 프린터 고르기에 그 이름이 나온다.
2. 한글 메뉴 주문 1건 → 주방 티켓 글자가 읽힌다(백지·네모 아님).
3. 연속 3장(주문 3건 또는 재발행 3회) 모두 나온다.
4. **긴 티켓 1장** — 품목 15개 이상 주문(또는 로고 있는 영수증 + 10품목): **맨 아래 합계·꼬리말까지** 찍힌다(아래가 하얗게 끊기면 ✗).
5. 폭: 80mm 안에 다 들어오고 컷 된다.
6. 로고 있는 영수증 1장 — 로고·금액 보인다.
7. 라틴 메뉴 1건 — 지금과 같은 모양.
8. 미등록 프린터 이름 1건 — 종이 0장 + «인쇄 대기» 로 남음.
9. **화면:** 티켓이 찍히는 순간 태블릿 화면에 티켓 그림이 비치거나 깜빡이지 않는다(A-2 는 메인 화면 뒤에 그린다 — 가장자리 띠에 1초 미만 비칠 수 있음, 그 이상이면 ✗ 로 적어 보내기).
(가능하면) 0.3.4 가 깔린 다른 태블릿에서 설정 › 프린터 탭 «자동 인쇄 준비» 상자에 주황 «업데이트» 줄이 보이는지.

**B. Play:** 0.4.0 제출 보류 → **0.4.1 AAB 제출**(내부 테스트 → 프로덕션, 설계 fable-design-20261012 §9 순서 그대로). A 가 ✓ 인 뒤.

**C. 사이드로드 피드(`/desktop/PurplePOS.apk` = 지금 0.3.4):** §6 질문.

**D. 그 전 매장 설정(설계 §6 그대로):** 0.4.1 종이 확인 전까지 한글 메뉴 매장은 앱 자동인쇄 **쓰지 않음**(브라우저+RawBT 유지). 영문 메뉴 매장만 «인쇄 형식=텍스트» 로 시작 가능.

## 6. Irene 질문(한 문장) + Fable 권고

**실기기 종이 확인(§5-A 9항목)이 ✓ 이면, Play 심사 결과를 기다리지 않고 0.4.1 을 사이드로드 피드(`/desktop/PurplePOS.apk`)에 바로 올려 매장 태블릿에서 쓰기 시작해도 될까요?**
- ① 예(권고) — 종이 ✓ → `build-release.sh --publish-feed` → 다음 `/배포` 에 실림. Play 0.4.1 은 같은 날 제출. «피드는 Play 게시 뒤» 규칙(play-store 설계 §3·§9)의 이유는 **Play 설치본에 «Play 에서 업데이트» 라고 안내했는데 Play 에 아직 없는 상황 방지**였다 — 지금 Play 설치본은 0대(0.4.0 미게시·실사용 0곳)라 그 위험이 없고, 사이드로드본은 브라우저 넘김 경로로 받는다. 같은 서명 키라 Play 가 나중에 그대로 덮어쓴다. 예외 1회로 `ANDROID_APP_DESIGN.md §10` 0.4.1 행에 적는다.
- ② Play 게시 뒤 — 규칙 그대로. 심사 며칠만큼 매장 시작이 늦는다. Irene 원문 «심사에 넣는 시점과 상관없이 사용 가능하지?» 와 어긋남.
- **Fable 권고: ①.** 단 **종이 ✓ 전에는 피드에 올리지 않는다**(지금 피드의 0.3.4 는 결함판이지만 매장 사용 0곳이라 급하지 않다).

## 7. 재판정 절차(짧게)

Opus: V3-2e 추가 → API 34 실행(+36 선택) → 실패면 A-3 → 로그 경로·결과 한 줄·바뀐 파일 목록을 Fable 에 전달. Fable: 로그 1개 + 파일 목록 읽기 → PASS 면 `node dev-backend/scripts/fable-gate.js pass --note "…"`. 이번 호출에서는 **마커를 찍지 않았다**(보류).

— Fable, 2026-11-02.

---

## 8. 재판정 (2026-11-02, 2차) — **PASS**

조건 1·2 모두 충족. 읽은 것: `v3-2e-34.log`(A-2 판 — 2e ✓ 3734px/19.9%/끝25% 19.5% **그러나 2c 3번째 BLANK_RENDER** → A-2 단독은 간헐 백지, 가드가 종이 0 으로 막음) · A-3 판 `v3-a3-34a.log` 17/17 · `v3-a3-34b.log` 17/17 · `v3-a3-36.log` 17/17(2c 매번 [ok,ok,ok] 4.6~5.7% · 2e 3734px 19.9~20.0%/끝25% 19.5% · 2d BLANK_RENDER·래스터 4장) · `v4-a3-34.log` 6/6(V4-2 8.3% · V4-6 10.1%) · `MainActivity.java` diff(설계 §3-2 A-3 그대로 — `super.onCreate` 앞 `WebView.enableSlowWholeDocumentDraw()` 1줄+주석) · `run-v3.js` V3-2e 판정식(스트립 yL/yH 합으로 높이 · 끝 25% 바이트 잉크 ≥1% · BAR 로 분리해 2d 와 안 섞음) · V3-8 보정(`질의 ≥1 + 찾기 구간 종이 바이트 잡 0` — 에뮬 10.0.2.3 가상 DNS 가 같은 호스트로 이어지는 사실에 맞는 보정, 판정의 뜻은 그대로) · `release-041c.log`(EXIT 0 · 서명 b55813cf… 동일 · AAB sha256 61411e48…6be3 — 내가 지금 sha256sum 으로 일치 확인 · code 9) · `check-print-guard` 8/8(지금 실행) · `.v4.json` HEAD 로 원복 · 웹 소수정(스테이션 칸 비면 주방 기본 주소로 판정 = billPrint 폴백과 같게 · «최대 약 40초» 4언어).

- A-3 이탈 정당성: 설계 §5-1 «A → A-2 → A-3 순서로 1단계씩» 그대로. A-2 가 2회 통과 뒤 3회째 실패한 사실이 기록으로 남아(간헐성 = 설계 §0-3 의 비결정성과 같은 종류) A-3 가 필요했음이 증명됨. B 안 함 ✓.
- 반증 체계: 같은 판정식에서 A 판 3건 실패 · A-2 판 1건 실패 · A-3 판 3회 연속 0건 — 가드가 깨짐을 잡는다는 증명으로 충분.
- 확인 못 함(그대로 Irene 실기기 9항목에 있음): 종이 · 화면 비침 · 0.3.4 주황 줄. 웹 소수정 뒤 mount sweep 은 재실행하지 않았다(변경 = 식 1줄·문구, 같은 컴포넌트가 직전 sweep 크래시 0) — 받아들임.
- 첫 0.4.1(f193331b…, A-2 판)은 어디에도 제출·게시 안 됨 · 지워짐 ✓. 제출·피드 대상은 **61411e48…6be3 하나**.
- 커밋 범위: 조건 2 목록 그대로(GTM·playwright·index.html·oneoff 제외) — /개발완료 때 지킬 것.

§5(Irene 할 일 9항목 · Play 0.4.1 · 설계 §6 매장 설정) · §6(질문 + Fable 권고 ①) 그대로 유효. 마커: 아래 명령 1회.
