# Fable 판정·설계 — 안드로이드 앱 HTML 티켓 «백지(잉크 0%)» (2026-11-02)

> 작성: Fable(리더). 요청자: Opus 팀원(사실 전달). 범위: 원인 판정 · 최소 수정 설계 · 판정 기준 · 수정 전 안전 설정 권고 · Irene 질문.
> 코드·운영 무변경(읽기만). 근거 파일: `mobile-app/android/.../OffscreenHtmlRenderer.kt`(2026-07-13) · `NativePrintPlugin.kt` · `$CLAUDE_JOB_DIR/tmp/v4-logcat2.txt`(11-02 13:35) · `scripts/verify/run-v3.js`·`run-v4.js` · `docs/ANDROID_APP_DESIGN.md` §7-2·§8 · `.claude/session-state.md` 10-12~10-15 기록.
> Irene 원문(11-02): «이제 안드로이드앱에서 자동프린트 하는 거 실사용할거야. … 안드로이드앱을 심사에 넣는 시점과 상관없이 사용 가능하지? …»

---

## 0. 결론 (먼저 읽을 것)

1. **백지는 에뮬레이터 탓이 아니라 앱 결함이다.** 창(window)에 붙이지 않은 WebView 를 소프트웨어 캔버스에 `draw()` 하는 방식은 Chromium WebView 가 지원하지 않는 그리기 경로다. 10-12 «에뮬레이터의 화면 밖 그리기 문제로 보임» 메모는 **추정이었고 근거가 없었다** — 실기기에서 통과한 기록은 0건이다.
2. 직접 증거: 11-02 V4 logcat 에 **렌더 순간마다**(13:35:06 · 13:35:32, 두 티켓 모두) Chromium 렌더러가 `tile_manager.cc(835) WARNING: tile memory limits exceeded, some content may not draw` 를 4~5번씩 찍었다. 다른 시점엔 없다. 이 경고는 GPU 가 아니라 **컴포지터 메모리 예산**(붙임·보임·하드웨어 그리기 상태로 결정) 문제다 — 실기기도 같은 규칙으로 돈다.
3. 비결정성(첫 실행 1회 6.6% → 이후 0.1%·0.0%)도 같은 설명이다: 예산·가시성이 정리되기 전 첫 번째만 우연히 그려졌다. **실기기에서도 «첫 장은 나오고 다음 장부터 백지» 가 가장 그럴듯한 증상**이다.
4. 영향: **한글 메뉴 매장의 주방 티켓 전부 + 로고 있는 영수증 전부**(그림 경로)가 백지 위험. 라틴 메뉴 + 로고 없음(글자 경로)은 영향 없음(V3 바이트 13/13 정확).
5. **더 나쁜 점: 백지가 «성공» 으로 보고된다.** 앱은 `{ok:true}` 를 돌려주고 폴러는 printed 도장을 찍는다(V4-1·V4-3 통과). 매장은 흰 종이를 받고 시스템은 «인쇄됨». §4 «성공처럼 보이는 미인쇄 금지» 위반.
6. 수정(설계 §3): **렌더 WebView 를 액티비티 창에 붙이고(화면 밖 위치) → `postVisualStateCallback` 으로 DOM 이 컴포지터에 실제로 반영된 뒤 → 그린다 → 떼고 버린다.** 그리고 **그린 비트맵의 잉크를 세어 0 이면 `BLANK_RENDER` 로 실패**시킨다(백지를 «눈에 보이는 실패» 로 바꿈 → 폴러 재시도·print-trace 기록).
7. 절단면: 네이티브 `OffscreenHtmlRenderer.kt` 1파일(+ `NativePrintPlugin.kt` 는 `activity` 를 넘기는 1줄). **웹 0줄(billPrint 무접촉, print-guard 8/8 그대로)**. 하니스 2파일(검사 추가). 버전 **0.4.1 / versionCode 9**.
8. 판정: 서버 — V3-2b + 새 V3-2c(같은 프로세스에서 한글 티켓 3장 연속, 전부 잉크 2~60%·서로 다름) + V4-2·V4-6 잉크 2~60%, **API 34 와 API 36 각 1회 전부 PASS**. 수정 전 같은 검사의 0.0% 가 반증 기록이다. 실기기 — Irene 가 종이로 6항목(§5-2).
9. 수정 전 지금 앱(0.3.4/0.4.0)으로 매장이 쓰려면: **라틴 메뉴 매장만, 인쇄 형식 «텍스트»**. 한글 메뉴 매장은 앱 자동인쇄를 **쓰지 말 것**(«텍스트» 로도 한글은 그림 경로로 떨어져 백지 위험 그대로).
10. Play 심사 시점과 사이드로드 사용은 무관(같은 서명 키, `/desktop/PurplePOS.apk`) — **단 지금 피드의 0.3.4 는 이 결함을 그대로 가진 판**이다. 권고: 0.4.0 심사 제출을 보류하고 **0.4.1 을 제출**한다.

---

## 1. 사실 (Opus 실측 + 내가 읽은 것)

- 렌더러(`OffscreenHtmlRenderer.kt`): `WebView(context)` 를 **어느 ViewGroup 에도 붙이지 않고** `layout(0,0,w,1)` → `loadDataWithBaseURL` → `onPageFinished` → 80ms 뒤 `measure/contentHeight` 로 높이 → `layout(0,0,w,h)` → `view.draw(Canvas(bitmap))` → `destroy()`. `postVisualStateCallback`·창 붙임·`enableSlowWholeDocumentDraw` 없음. 호출부 `NativePrintPlugin.printHtml` 은 html 레인 직렬화 + 20초 타임아웃, `null` → `TIMEOUT`.
- 11-02 V4-2: 도착 잡 14489바이트, `ESC @` + `GS v 0`(576px) + 컷 정상, **래스터 잉크 0.0%**. logcat: `render: page finished, measuring` → (경고 4~5회) → `render ok: 576x201 (measured=201 content=201)`. 두 번째 티켓(스테이션 KQ1, «김치찌개») 도 같은 패턴(576x229, 경고 5회).
- 10-12~10-15 V3-2b(같은 `printHtml` 을 CDP 직접 호출): API 36 새 앱·API 34 새 앱·API 34 옛 0.3.4 모두 잉크 0.1% 반복, **첫 실행 1회만 6.6%**. 즉 Capacitor 6→8·targetSdk 36 업그레이드와 무관, 옛 0.3.4 도 같다.
- AVD `purplepos-ci`: `hw.gpu.enabled=no`(소프트웨어 GL). 메인 Capacitor WebView 는 같은 프로세스에서 정상 렌더(이 경고 없음) — **같은 Chromium, 같은 GPU 설정에서 «붙인 WebView 는 그려지고 안 붙인 WebView 만 안 그려진다».** GPU 가설을 직접 반박한다.
- 글자 경로(`printRaw`)는 V3 13/13 바이트 정확, V4-4·V4-5 통과. 경로 선택은 `billPrint._ticketIsTextSafe`: ASCII 만이면 글자, 한글·로고·QR 이 있으면 그림. 매장 설정 «인쇄 형식» `auto|text|graphic`: `text` 여도 **한글은 그림**(`fmt==='text' → asciiSafe` 만 글자).
- 실매장 앱 사용 0곳(운영 `print_device_status` android-app 0행). 실기기 종이 확인 0회. 운영 피드 APK = 0.3.4(같은 렌더러).

## 2. 원인 판정

### 2-1. 무엇이 백지를 만드나
Android WebView(Chromium) 는 자기 컴포지터의 **활동·메모리 예산을 뷰의 상태**(창에 붙었는가 · `VISIBLE` 인가 · 창이 보이는가 · 하드웨어 캔버스로 그려진 적이 있는가)로 정한다. 창에 붙지 않은 WebView 는 이 조건을 하나도 못 채운다 → 컴포지터는 «안 보이는 뷰» 로 취급돼 예산이 최소(0 에 가깝다)·프레임 생산이 보장되지 않는다. 그 상태에서 `draw(Canvas)` 를 부르면 Chromium 은 «지금 가진 것» 을 그린다 — 레이아웃은 끝나 높이는 맞게 나오지만(`contentHeight` 201), 그림 내용은 **메모리 예산 밖이라 래스터되지 않았거나 아직 커밋되지 않았다** → 하얀 배경만. logcat 의 `tile memory limits exceeded, some content may not draw` 가 바로 «예산 때문에 내용 일부를 못 그린다» 는 Chromium 자신의 문장이다.

WebView 문서·Chromium 팀의 일관된 입장: **WebView 는 뷰 계층(창)에 붙어 있어야 렌더링된다.** 붙이지 않은 WebView 를 비트맵에 그리는 것은 지원 범위 밖이며 «우연히 되기도 한다» 가 정확한 서술이다 — 첫 실행 6.6% 가 그 우연이다.

### 2-2. 에뮬레이터만의 문제인가 → **아니다 (실기기 동일 위험)**
- 경고의 출처가 렌더러의 타일 관리자(메모리 예산)이고, 예산은 뷰 상태로 정해진다. GPU 유무·에뮬레이터 여부와 독립.
- 같은 프로세스의 메인 WebView 는 멀쩡히 그려진다(§1). 에뮬레이터 그래픽이 원인이면 메인 화면도 깨져야 한다.
- API 34·36·옛 0.3.4 세 조합에서 재현, 실기기 통과 기록 0건. «에뮬레이터 탓» 을 지지하는 관측은 하나도 없다.
- 실기기에서 예상되는 증상: 대개 백지, 때로 첫 장만 정상. 매장 입장에선 «가끔 나온다» 라서 더 헷갈리는 종류.

### 2-3. 왜 지금까지 «통과» 로 보였나
V4-1(1장 도착)·V4-3(printed 도장)은 **바이트 길이와 프레임** 만 봤다. 백지 래스터도 길이 14489·`ESC @`·컷을 다 갖춘다. 11-02 Opus 가 V4-2 에 잉크 비율을 넣은 뒤에야 드러났다(올바른 추가). 앱 자체도 흰 비트맵을 성공으로 보낸다 — §3-3 의 `BLANK_RENDER` 가드가 이 구멍을 막는다.

## 3. 수정 설계 (최소·정석)

### 3-1. 원칙
- 🔒 웹 인쇄 코드 0줄. 변경은 네이티브 렌더러 한 곳 + 호출부 1줄. 인쇄 **동작**(경로 선택·타이밍·라우팅·바이트 포맷) 불변 — 바뀌는 건 «비트맵에 그림이 들어 있는가» 뿐.
- 성공처럼 보이는 미인쇄 금지: 못 그리면 **실패로 돌려준다**(`TIMEOUT`/`RENDER_ERROR`/`BLANK_RENDER`). 폴러가 재시도하고 print-trace `err` 에 남는다.
- 모든 종료 경로에서 뷰 떼기·destroy·latch 해제(현 파일의 규칙 1·3 유지).

### 3-2. 정석 A — 창에 붙여서 그린다 (1차 구현)
`OffscreenHtmlRenderer.render(activity: Activity?, html, widthPx, timeoutMs)`:

1. **UI 스레드**: WebView 생성(설정은 지금 그대로: JS off · initialScale 100 · 배경 흰색). 아직 붙이지 않고 `layout(0,0,w,1)` → `loadDataWithBaseURL`. (레이아웃·`contentHeight` 는 지금도 이 단계에서 나온다 — 그대로 쓴다.)
2. `onPageFinished` → 지금의 `attempt()` 그대로 높이 `h = max(measuredHeight, contentHeight×scale)` (0 이면 재시도 10회 — 기존 로직 유지).
3. **붙인다**: `root = activity.findViewById<ViewGroup>(android.R.id.content)`; `wv.translationX = -(w + 8f)`(화면 왼쪽 바깥 — 사용자 눈에 안 띔, 크기·가시성 플래그는 정상); `root.addView(wv, 0, FrameLayout.LayoutParams(w, h))`. `activity == null`(액티비티 소멸) 이면 즉시 실패 `NO_WINDOW`.
   - `View.INVISIBLE`·`GONE`·`alpha 0` **금지** — Chromium 이 «안 보이는 뷰» 로 보고 다시 예산을 끊는다. 위치만 바깥으로 보낸다.
4. **`wv.postVisualStateCallback(id) { onComplete → drawAndFinish() }`** — «이 DOM 상태가 컴포지터에 반영돼 다음 draw 가 그걸 그린다» 는 Chromium 의 공식 보증(API 23+, 우리 minSdk 24). 80ms 추측 대기를 이 보증으로 바꾼다. 콜백이 **5초**(`VISUAL_TIMEOUT_MS`) 안에 안 오면 실패 `VISUAL_STATE_TIMEOUT`(창이 안 보이는 상태 — 화면 꺼짐·앱 백그라운드 — 가 여기로 떨어진다).
5. `drawAndFinish()`: 실제 뷰 높이 `wv.height`(부모가 레이아웃한 값; `h` 와 다르면 로그) 로 비트맵 → 흰 배경 → `wv.draw(canvas)`(소프트웨어 캔버스 → Chromium 소프트웨어 그리기 경로, 붙어 있고 보이는 뷰에선 지원되는 조합) → **§3-3 잉크 검사** → `ref.set`.
6. `finally`: `root.removeView(wv)` → `wv.destroy()`(떼고 나서 — WebView 규칙) → `latch.countDown()`.

**A 의 비상 단계(게이트가 실패할 때만, 순서대로 — 그 밖의 임의 변형 금지):**
- A-2: `translationX` 바깥 배치 대신 **index 0 로 메인 WebView 뒤**(화면 안, 메인 WebView 가 가림)에 붙인다. 시스템바 여백 띠에 1초 미만 티켓이 비칠 수 있으나 기능상 무해.
- A-3: `WebView.enableSlowWholeDocumentDraw()` 를 **어느 WebView 도 만들어지기 전**(= `MainActivity.onCreate` 에서 `super.onCreate` 앞) 1회 호출. 정적이라 절단면이 `MainActivity.java` 1줄 늘어난다. 뷰 크기를 문서 크기로 맞춘 지금 구조에선 필요 없을 것으로 본다 — 게이트가 «위쪽 한 화면 높이까지만 잉크» 를 보일 때만.

### 3-3. `BLANK_RENDER` 가드 (A 와 같은 파일, 같은 커밋)
그린 비트맵에서 어두운 픽셀(밝기 < 128)을 센다(576×h 전부 세도 수십만 픽셀 — ms 단위). **어두운 픽셀 비율 < 0.2% → `null` 반환 + `Log.w("render blank: ink=…")`**, 호출부가 `ok:false, error:'BLANK_RENDER'` 로 돌려주게 `render()` 반환형을 `Bitmap?` 에서 결과(비트맵 또는 오류 문자열) 로 바꾼다. 어느 티켓이든 글자가 있으면 1% 를 넘는다(V3 첫 실행 6.6%). 이 가드가 «흰 종이 + printed 도장» 을 «실패 + 재시도 + print-trace err=BLANK_RENDER» 로 바꾼다. 호출부 1줄: `?: return ok(call,false,"TIMEOUT")` → 결과의 오류 문자열을 그대로.

### 3-4. 대안 B — 인쇄 어댑터 경로 (A 가 §5 게이트를 두 AVD 모두에서 못 넘을 때만)
`wv.createPrintDocumentAdapter()` → PDF(`PrintAttributes`: 80mm × 긴 용지, 203dpi) → `PdfRenderer.Page.render(bitmap, RENDER_MODE_FOR_PRINT)` → 꼬리 흰 줄 잘라내기. Blink 의 **인쇄 렌더링** 경로라 컴포지터·창·가시성과 무관하다(OS 인쇄가 쓰는 길). 단점: 코드가 더 많고(페이지 크기·꼬리 자르기), 글꼴 크기 환산을 다시 검증해야 하며, `@media print` 규칙이 적용된다. **A 가 되면 B 는 하지 않는다.** B 로 가면 설계를 다시 받는다(이 문서 범위 밖).

### 3-5. 하지 않는 것(이유)
- `setLayerType(LAYER_TYPE_SOFTWARE)`: 문제는 하드웨어/소프트웨어가 아니라 «붙지 않음». 효과 없음.
- WebView 재사용(§7-2 ④ «인스턴스 재사용»): 지금도 매 렌더 새로 만든다. 상태 잔존 위험을 없애는 지금 방식을 유지하고 §7-2 ④ 를 «매 렌더 새로 만든다(생성 수십 ms, 티켓 간격보다 훨씬 짧다)» 로 정정한다.
- 80ms 뒤 그리기 유지: `postVisualStateCallback` 이 대체한다(추측 대기 → 보증).
- 웹(billPrint·SettingsPage) 변경: 0. 경로 선택 규칙도 그대로.

## 4. 절단면 · 버전 · 배포

| 파일 | 변경 |
|---|---|
| `mobile-app/android/app/src/main/java/com/purplehere/pos/mobile/OffscreenHtmlRenderer.kt` | §3-2 A + §3-3 가드. 주석의 «규칙 2(측정 0 재시도)·3(View.postDelayed 금지)» 유지, 규칙 4(창에 붙여야 그려진다 — 11-02 logcat 근거) 추가 |
| `.../NativePrintPlugin.kt` | `OffscreenHtmlRenderer.render(activity, …)` 호출 1줄 + 오류 문자열 전달. 레인·타임아웃·rasterize·send 무변경 |
| `mobile-app/scripts/verify/run-v3.js` · `expr/v3.json` | **V3-2c** 추가: 한글 티켓 3장 연속 `printHtml`(내용 서로 다름) → 각각 잉크 2%~60% + 래스터 바이트 서로 다름 |
| `mobile-app/scripts/verify/run-v4.js` | V4-2 잉크 상한 60% 추가 · **V4-6 에 같은 잉크 검사** 추가(스테이션 티켓 «김치찌개» 도 그림 경로) · 렌더 구간 logcat 의 `tile memory limits exceeded` 건수 출력(WARN, 판정엔 안 넣음) |
| `mobile-app/android/app/build.gradle` | `versionCode 9` · `versionName "0.4.1"` (§8-7 규칙: 네이티브 변경 = +1) |
| `mobile-app/docs/ANDROID_APP_DESIGN.md` | §7-2 ① «창에 붙이고 visual state 뒤 그린다 / 백지 가드» 로 정정, ④ 재사용 문구 정정, §10 릴리즈 기록 0.4.1 |

**불가침(0줄):** `billPrint.js` · `useAutoPrintPoller.ts` · `MainLayout.tsx` · `KitchenDisplayPage.tsx` · `POSTerminalPage.tsx` · `orders-crud.js` · `stationEnrichment.js` · `orderTotals.js` · `hybridKitchenPrint.ts` · `MainActivity.java`(A-3 가 필요해질 때만 1줄) · `PrinterRegistry.kt` · `nativePrintBridge.js`.

**배포:** `build-release.sh`(AAB+APK, 서명 키 동일) → Play 업로드는 Irene(**0.4.0 대신 0.4.1**, §10) → 사이드로드 피드 `--publish-feed` 는 Play 게시 뒤 `/배포`(§8-7 그대로). 운영 웹은 무변경. CLAUDE.md 🔒 규칙상 **실프린터 종이 확인(§5-2) 전에는 매장 안내를 내지 않는다**.

## 5. 판정 기준

### 5-1. 서버(에뮬레이터) — 전부 PASS 여야 «고쳐졌다»
메모리 규칙: 가용 3GB 미만이면 기동 거부(기존), 에뮬 1대씩, 빌드와 겹치지 않게(heavy-task-gate).

| 검사 | 기준 | 횟수 |
|---|---|---|
| V3-2b | 한글 티켓 래스터 잉크 **2% < ink < 60%** · 576px · 컷 | API 34 1회 + API 36 1회 |
| **V3-2c(신규)** | 같은 앱 프로세스에서 한글 티켓 **3장 연속** 각각 2~60% · 세 래스터 바이트 서로 다름 (= «첫 장만 나오는» 역사적 증상을 직접 겨눔) | 위 각 실행 안에서 |
| V3 나머지 1·3·4·5·6·7 | 13/13 유지(회귀 0) | 같은 실행 |
| V4-1~6 | 기존 통과 유지 + **V4-2·V4-6 잉크 2~60%** | API 34 1회(메모리상 V4 는 34 만; 36 은 V3 로 충분) |
| 반증 기록 | **수정 전 같은 검사가 0.0%/0.1%** 였음(11-02 V4-2 · 10-12~15 V3-2b) — 같은 픽스처·같은 판정식·코드만 다름 = 가드가 깨진 것을 잡는다는 증명. 추가 고장주입 빌드 불필요(메모리·22분 절약) | 기록으로 첨부 |
| `BLANK_RENDER` 가드 반증 | 하니스 1건: 빈 `<html><body></body></html>` 을 `printHtml` → `{ok:false,error:'BLANK_RENDER'}` + 가짜 프린터 0바이트 (V3-2d) | 같은 실행 |
| 무접촉 | `check-print-guard.js` 8/8 무변경 · `check-sensitive-diff.js` «일반 변경» (웹 0줄) | 1회 |
| 빌드 | `build-release.sh` EXIT 0 · 서명 지문 동일 · versionCode 9 | 1회 |

실패 처리: A 실패 → A-2 → A-3 순서로 1단계씩(각 단계 빌드 1회). A-3 까지 실패하면 B 로 가되 **설계 재요청**(이 문서는 A 까지만 승인).

### 5-2. 실기기 — Irene 가 종이로 볼 것 (상황판 «Irene 할 일», `check:true`)
준비: 0.4.1 사이드로드 APK(dev 서버 빌드본) · 태블릿 · 와이파이 ESC/POS 프린터(앱 설정 › 프린터 › Android 카드에 등록) · 데모 매장 38 · 화면 켜 둔 채 앱 앞에 두기.
1. 한글 메뉴 주문 1건 → 주방 티켓 **글자가 읽힌다**(백지 아님, 깨진 네모 아님).
2. **연속 3장**(주문 3건 또는 재발행 3회) 모두 나온다 — 첫 장만 나오면 실패.
3. 폭: 글자가 80mm 안에 다 들어오고 오른쪽이 잘리지 않는다 · 컷 된다.
4. 로고 있는 영수증 1장 — 로고와 금액이 보인다.
5. 라틴 메뉴 주문 1건(글자 경로) — 지금과 같은 모양.
6. 미등록 프린터 이름으로 1건 — 종이 0장 + 앱 설정 화면에 «인쇄 대기» 로 남아 있다(조용한 실패 없음).
«✗ 문제 있어요» 면 어디서 어떻게 를 적어 보내면 방이 이어서 본다.

## 6. 수정 전, 지금 앱(0.3.4 · 0.4.0)으로 쓸 때의 안전 설정

| 매장 유형 | 앱 자동인쇄 | 설정 | 이유 |
|---|---|---|---|
| **메뉴·옵션·메모가 전부 영문/숫자, 영수증 로고 없음** | 가능 | 인쇄 형식 **«텍스트»**(auto 도 글자 경로지만 «텍스트» 가 로고가 생겨도 글자로 고정) | 글자 경로 = V3 13/13 바이트 정확 · 운영 QZ LAN 경로와 같은 ESC/POS |
| 영문 메뉴 + 영수증 로고/QR | 가능(«텍스트» 필수) | «텍스트» → 로고 자리에 매장 이름 글자 | 로고를 살리려면 그림 경로 = 백지 위험 |
| **한글(또는 다른 비ASCII) 메뉴·옵션·메모가 하나라도 있음** (thefire 등) | **쓰지 말 것** — 0.4.1 뒤 | 어떤 형식이든 한글 품목은 그림 경로로 떨어진다(`_ticketIsTextSafe`: text 모드도 ASCII 만 글자) | 백지 + «인쇄됨» 도장 |
| 모든 매장 | — | «그래픽» 선택 금지 | 전부 그림 경로 |

덧붙임: «텍스트» 모드에서 한글 품목 하나가 섞이면 그 티켓만 그림(백지) 으로 간다 — 매장이 «대체로 나오는데 가끔 백지» 를 겪는다. 그래서 한글 매장은 «가끔» 이 아니라 «쓰지 말 것» 이다. 현재 운영 태블릿 8대는 브라우저+RawBT(`web-rawbt`) 로 돌고 있으니 **그대로 두면 된다**.

## 7. Irene 질문 (한 문장) + Fable 권고

**백지 수정판(0.4.1)이 서버 게이트(§5-1)를 넘을 때까지 한글 메뉴 매장의 앱 자동인쇄 실사용을 미루고(지금 방식 유지), 영문 메뉴 매장만 «인쇄 형식=텍스트» 로 먼저 시작해도 될까요?**
- 선택지 ① 예(권고) — 0.4.1 게이트 PASS → Irene 실기기 6항목 → Play 0.4.1 제출 → 그 뒤 한글 매장. 영문 매장은 지금 0.3.4/0.4.0 으로 «텍스트» 설정만 하고 시작 가능.
- 선택지 ② 전부 0.4.1 뒤로 — 가장 안전하지만 영문 매장도 며칠 늦어진다.
- 선택지 ③ 한글 매장도 지금 시작 — **반대**: 백지가 «인쇄됨» 으로 기록돼 매장이 주문을 놓치고도 시스템은 정상이라고 말한다(인쇄 = 영업 생명선).
- **Fable 권고: ①.** Play 는 0.4.0 제출을 보류하고 0.4.1 을 제출(네이티브 변경이라 심사판이 결함판이 되는 걸 피함). Irene 가 Play 시점을 따로 정하고 싶지 않으면 이 권고대로 간다.

## 8. 범위 밖 · 다음 (Irene 원문의 나머지)

- «안내가 알기 쉽게» · «와이파이 프린터 기본 사용법 스탠다드»: 네이티브 변경 없음 — 웹 설정 화면 문구·순서(`SettingsPage` Android 카드 / 미추적 `AndroidPrinterSetup.tsx` 가 작업 중인 듯) 와 문서. Fable 없이 팀원이 진행 가능(기계로 갈리지 않는 UX 라도 핵심 결제 흐름이 아니라 공용 기준상 «쓰지 않는 곳»). 단 **안내문의 «프린터 IP 를 고정하세요» 류는 금지**(메모리 feedback_auto_over_manual_setup) — 자동 찾기가 없으면 «프린터 설정지(self-test) 에 찍힌 IP 를 적는다» 로.
- «와이파이 프린터가 자동으로 잡히는 게 있으면»: 지금 앱엔 네트워크 프린터 자동 찾기(9100 포트 스캔·mDNS)가 **없다**(`__NATIVE_PRINT_SETUP` 은 수동 등록만). 추가하면 네이티브 SETUP 메서드 + 설정 화면 = 새 기능 → **별도 설계 1회**(이 문서와 분리, 백지 수정 뒤). 백지 수정과 한 커밋에 묶지 않는다(절단면·게이트가 흐려진다).
- 운영 안전: 앱 자동인쇄는 **화면 켜짐 + 앱 전면** 이 전제다(`FLAG_KEEP_SCREEN_ON` 유지; 창이 안 보이면 §3-2 ④ 가 `VISUAL_STATE_TIMEOUT` 으로 실패하고 폴러가 다시 시도 — 백지보단 낫지만 지연). 안내문에 «태블릿 화면을 끄지 말 것·앱을 앞에 둘 것» 한 줄.

— Fable, 2026-11-02. 이 문서가 구현·판정의 단일 기준. 설계와 다른 판단이 필요해지면 중단하고 다시 묻는다.
