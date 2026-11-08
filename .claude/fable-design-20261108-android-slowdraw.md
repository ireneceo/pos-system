# Fable 설계·판정 — 안드로이드 앱 «심하게 느림» · 0.4.1 의 `enableSlowWholeDocumentDraw` 처리 (2026-11-08)

> 작성: Fable(리더). 요청자: Opus 팀원(사실 전달). 범위: 원인 판정 · 0.4.1 설정 처리 설계 · 검증 기준 · 이번 일의 범위(할 것/하지 않을 것) · 웹 InboxDrawer 1줄 판정.
> 코드·운영 무변경(읽기만). 근거: `MainActivity.java` · `OffscreenHtmlRenderer.kt` · `NativePrintPlugin.kt printHtml/rasterize` · `billPrint.js` PRINT_STYLES(🔒 — 읽기만) · `ANDROID_APP_DESIGN.md §7-2·§10` · 지난 설계 `fable-design-20261102-android-raster.md` · 판정 `fable-verdict-20261102-android-print-gate.md` · 측정 `$CLAUDE_JOB_DIR/tmp/perf/emu.js·emu.log·emu2.log·emu-result.json` · `git diff InboxDrawer.tsx`.
> Irene 원문: «안드로이드앱이 너무 느려. 심하게 느려. 디바이스가 좋은게 아니라고 해도 이건 너무 심각해» → «권고대로 진행해 줘»(기종을 몰라도 낭비 줄이기와 0.4.1 설정 정리는 꼭).

---

## 0. 결론 (먼저 읽을 것)

1. **Irene 가 지금 느끼는 느림은 0.4.1 의 그 설정 때문이 아니다.** 실매장·Irene 기기는 전부 **0.3.4** 이고 0.3.4 에는 `enableSlowWholeDocumentDraw` 가 없다(사실 1). 0.4.1 은 dev-apps 에만 있고 어디에도 설치·게시되지 않았다. 따라서 이번 일은 «느림을 고친다» 가 아니라 **① 0.4.1 이 나가면 지금보다 2배 더 느려질 폭탄을 제거하고 ② 웹 쪽 확인된 낭비를 걷어내고 ③ 진짜 원인(기기·WebView 판·앱 자체 무게)을 가를 측정을 남기는 것**이다. «고쳤다» 고 보고하지 않는다 — 0.3.4 기기에서 Irene 가 체감하는 것은 ③ 뒤에야 안다.
2. **`WebView.enableSlowWholeDocumentDraw()` 는 뺀다. 재도입 금지(정적·프로세스 전체·되돌릴 수 없음).** 이 설정은 Android 자체 문서가 «문서 전체를 그리게 해 메모리·성능을 희생한다» 고 적은 스위치이고, 프로세스의 **모든** WebView — 즉 POS 메인 화면 — 에 걸린다. 팀원 실측(같은 코드, 그 한 줄만 차이, 순서 바꿔 2~3회): 스크롤 fps 9.7~10.3 → 6.3~7.7, p50 프레임 간격 94~116ms → 141~174ms, POS Terminal 열기 2.1~2.5초 → 4.4초, 가만히 있을 때 타이머 지연 2~10 → 4~19ms/초. 인쇄 한 장을 위해 영업 화면 전체를 상시 1.5~2배 느리게 하는 거래는 성립하지 않는다. «인쇄 때만 켜기» 는 **불가능**(정적 메서드, WebView 생성 전 1회만 유효, 해제 API 없음). 별도 프로세스도 안 된다(§3-4).
3. **백지는 다른 방법으로 막는다 — 1단계: A-2 그대로 두고 렌더 뷰 쪽 보강 2개**(§3-2): ⓐ 붙이는 뷰 높이를 **창 높이 이상으로 패딩**(짧은 티켓이 타일 예산 경계에서 떨어지는 것을 막음 — 11-02 실패는 전부 **짧은** 티켓(576×49~229)이었고 긴 티켓(3734px)은 A-2 로도 통과했다) ⓑ **그린 뒤 잉크 0 이면 1~2프레임 뒤 다시 그리기(최대 3회)** — visual state 콜백은 «DOM 이 컴포지터에 반영됨» 의 보증이고 **타일 래스터 완료의 보증은 아니다**; 소프트웨어 draw 는 그 순간 있는 타일만 그린다. 셋 다 비면 지금처럼 `BLANK_RENDER`(종이 0·print-trace err·폴러 재시도). 증상을 숨기는 게 아니라 «데이터가 있을 때 읽는다» 이고 실패는 그대로 보인다.
4. **2단계(1단계가 §5 게이트를 못 넘을 때만): B — 인쇄 어댑터 → PDF → `PdfRenderer`**(§3-3). 컴포지터·창·가시성과 무관한 Blink 인쇄 경로. 이 문서가 B 설계를 포함하므로 재설계 왕복은 없지만, **B 에는 숨은 API 의존(§3-3 ③)이 있어 게이트 로그에서 그 점을 확인한 뒤 Fable 재판정**을 받는다. 1단계가 통과하면 B 는 하지 않는다.
5. **웹 InboxDrawer 1줄 — 받아들인다**(§4). 닫힌 서랍(화면 밖으로 밀어둔 상태)에서 반짝임 카드 5장이 모든 관리 화면에서 끝없이 돌던 것. 렌더 조건 1줄, 🔒 무접촉, 열렸을 때 동작 불변. 같은 패턴(숨긴 컨테이너 속 무한 애니메이션)이 비보호 파일에 더 있으면 **최대 3파일**까지 같은 방식으로, 각각 수치와 함께. MainLayout 깜빡 점·pending-print·health 폴링은 **건드리지 않는다**(🔒·인쇄 폴러·오프라인 판정).
6. **버전: 0.4.2 / versionCode 10.** 0.4.1(code 9, AAB 61411e48…) 은 제출·게시 전이므로 **A-2 첫 빌드와 같이 지운다**(어디에도 없는 판으로 남김). §10 기록은 «0.4.1 제출 안 함 → 0.4.2 로 대체(앱 전체 느려짐)». Play 앱 만들기 카드(Irene 할 일)는 그대로, 올릴 AAB 만 0.4.2 로 카드 갱신.
7. **진짜 원인 측정(이번 일 안에서 읽기만):** 운영 읽기 패턴으로 Irene·실매장 기기의 **UA(기종·Android 버전·WebView Chrome 판)** 를 확인한다(print_device_status 또는 요청 로그에 남아 있으면). 없으면 마지막에 Irene 에게 한 문장으로 묻는다(§7). 이 숫자가 있어야 «앱이 느린가, 기기가 느린가, WebView 가 낡았는가» 를 가른다. 그 뒤 일(번들·DOM·폴링 다듬기)은 **별도 설계**(§6).

---

## 1. 사실 정리 (팀원 실측 + 내가 읽은 것)

- `MainActivity.onCreate`: `super.onCreate` 앞에 `WebView.enableSlowWholeDocumentDraw()` 1줄(A-3, 11-02). 주석에 근거 기록됨.
- `OffscreenHtmlRenderer.kt`(A-2+A-3 판): WebView 생성 → `layout(0,0,w,1)` → load → `onPageFinished` 80ms 뒤 측정(재시도 10회) → `root.addView(view, 0, LayoutParams(w, h))`(화면 안·메인 WebView 뒤) → `postVisualStateCallback` → 한 프레임 뒤 `view.draw(softwareCanvas)` → 잉크 < 0.2% 면 `BLANK_RENDER` → 떼고 destroy. 비트맵 높이 `vh = view.height`(부모가 레이아웃한 값).
- 11-02 기록: **A(화면 밖 translationX)** 3건 실패 · **A-2(화면 안)** 2회 통과 뒤 3회째 V3-2c 3장 중 1장 BLANK(짧은 티켓), 2e(3734px) 는 A-2 로도 통과 · **A-3** 17/17 ×3. logcat `tile memory limits exceeded` 는 A-2 에서도 계속(V3 13건·V4 4건).
- 성능 실측(에뮬 purplepos-ci, swiftshader, 같은 화면·같은 코드·그 한 줄만 차이): §0-2 의 숫자. 가만히 있을 때 fps 는 둘 다 ~60(차이는 스크롤·화면 열기·타이머 지연에서 난다 — 문서 전체 그리기의 비용이 **그릴 일이 생길 때** 터진다는 뜻).
- 운영 기기: 전부 0.3.4. 피드 `android-latest.json` = 0.3.4(code 7). 0.4.1 은 `dev-frontend-build/dev-apps/` 에만.
- 웹: `InboxDrawer` 는 `open` 일 때만 `load()` 를 부르지만 `loading` 초기값이 true 라 **닫힌 채로 Skeleton 5장이 렌더되고**(서랍은 `translateX(100%)` 로 화면 밖) 반짝임 애니메이션이 모든 관리 화면에서 계속 돈다 → 6배 CPU 늦춤에서 가만히 30초 중 11~13초 CPU. 팀원 수정: `{loading && !open ? null : loading ? <Skeleton…> : …}`(미빌드).
- 티켓 HTML(🔒 `billPrint.js` PRINT_STYLES, 읽기만): `@page { size: 80mm auto; margin:0 }`(`auto` 가 길이와 섞여 **CSS 상 무효 선언** → 브라우저가 버린다) · `-webkit-print-color-adjust: exact` · `@media print { .page-break{page-break-after:always} .no-print{display:none} }` · 검정 배경 배너(`background:#000;color:#fff`) 사용. 네이티브 폭 576px(80mm)·384px(58mm), `initialScale 100`(1 CSS px = 1 기기 px).

## 2. 판정

### 2-1. 느림의 원인은 무엇인가
- **0.4.1 의 설정**: 측정으로 확정 — 스크롤·화면 열기 1.5~2배. **그러나 Irene 기기에 없는 코드**다. 0.4.1 이 나갔다면 지금보다 더 나빠졌을 것이고, 그 전에 잡은 것.
- **웹 낭비(확정 1건)**: 닫힌 받은편지함 서랍 반짝임. 체감에 기여(저사양 WebView 에서 메인 스레드 상시 점유)하지만 «심하게 느림» 전부를 설명하진 않는다 — 가만히 있을 때 fps 는 60 이 나왔다.
- **기기·WebView 판(미확정)**: 기종·Android·WebView 버전을 모른다. Android System WebView 가 낡은 태블릿(갱신 안 된 Chrome 7x~9x)은 같은 SPA 에서 몇 배 느리다. 측정 전 단정하지 않는다.
- **앱 자체 무게(미확정)**: 에뮬에서 DOM 600·스크롤 10fps 는 swiftshader 소프트웨어 GL 탓이 커서 기기 수치로 못 쓴다. 실기기 UA 를 알아야 재현 조건을 만든다.

### 2-2. 왜 그 한 줄이 그렇게 비싼가
`enableSlowWholeDocumentDraw` 는 WebView 가 «보이는 부분 + 여백만 기록·래스터» 하는 L 이후 기본 최적화를 끈다(공식 문서: «memory footprint·performance 를 희생»). POS 메인 WebView 는 긴 목록(Live Orders·대시보드)을 가진 SPA 라 **문서 전체를 매번 기록·래스터** → 스크롤·화면 전환·레이아웃 변화마다 비용. 프로세스 정적 설정이어서 렌더 WebView 만 골라 켤 수 없다.

### 2-3. A-2 의 간헐 백지는 무엇이었나 (왜 보강 2개가 맞는가)
- 실패 사례는 전부 **짧은 티켓**(576×49~229px). 긴 티켓(3734px, 창 높이의 2배 이상)은 A-2 로도 아래 25% 까지 잉크 19.5% 로 통과. 즉 «창 밖은 안 그린다» 가 원인이 아니다.
- Chromium 의 타일 메모리 예산은 **뷰 크기에 비례**하고 타일은 256/512px 격자로 잡힌다. 짧은 뷰는 예산이 작은데 필요한 타일 수는 격자 때문에 뷰 면적보다 커서 경계에 걸린다 — logcat «tile memory limits exceeded» 가 A-2 에서도 계속 찍힌 것과 맞는다. → **뷰를 창 높이 이상으로 키우면 예산은 커지고 필요한 타일은 그대로**(내용은 짧으니까). 비트맵은 내용 높이만 자른다.
- `postVisualStateCallback` 은 «DOM 상태가 컴포지터 트리에 커밋됨» 의 보증이고 **래스터 완료 보증이 아니다.** 소프트웨어 `draw()` 는 그 순간 준비된 타일만 그린다(없으면 흰색). 그래서 **1~2프레임 뒤 다시 그리면 대개 들어 있다.** 재시도 한도 3회·실패는 `BLANK_RENDER` 그대로 — 조용한 실패가 아니다.
- 이 둘은 A-3 가 «전부 그려라» 로 우회했던 두 조건(예산·타이밍)을 렌더 뷰 안에서 푼다. 프로세스 전체에 미치는 것은 0.

## 3. 설계

### 3-1. 원칙
- 🔒 웹 인쇄 코드 0줄. 인쇄 **동작**(경로 선택·타이밍·라우팅·ESC/POS 바이트 포맷·폴러) 불변. 바뀌는 것은 «비트맵이 어떻게 채워지는가» 뿐.
- 프로세스 전체·메인 WebView 에 영향을 주는 변경 **금지**(정적 WebView 설정·`setDataDirectorySuffix`·별도 프로세스·레이어 타입 전환).
- 성공처럼 보이는 미인쇄 금지 — `BLANK_RENDER` 가드 유지. 모든 종료 경로 떼기·destroy·latch 해제(기존 규칙 1·3 유지).
- 한 단계 = 빌드 1회 + 게이트 1회. 단계 안에서 임의 변형 금지. 1단계가 통과하면 2단계 하지 않는다.

### 3-2. 1단계 — A-2 유지 + 렌더 뷰 보강 2개 (`OffscreenHtmlRenderer.kt` 1파일 + `MainActivity.java` 1줄 삭제)

**MainActivity.java:** `WebView.enableSlowWholeDocumentDraw();` 와 그 주석 블록 삭제. 대신 한 줄 주석: «프로세스 전체 WebView 설정 금지 — 2026-11-08 실측 메인 화면 1.5~2배 느려짐(Fable 설계 fable-design-20261108-android-slowdraw.md)». 다른 줄 무변경.

**OffscreenHtmlRenderer.attachAndDraw:**
1. **패딩 붙임** — `padH = max(h, root.height)`(root 가 아직 레이아웃 전이라 `root.height == 0` 이면 `h`). `root.addView(view, 0, FrameLayout.LayoutParams(widthPx, padH))`. 위치·index·VISIBLE 은 A-2 그대로(화면 안, 메인 WebView 뒤). 긴 티켓(h > 창)은 지금처럼 창보다 큰 뷰.
2. **비트맵 높이 = 내용 높이.** 지금의 `vh = view.height` 를 쓰면 패딩만큼 흰 종이가 나간다. → `bh = min(view.height>0 ? view.height : padH, max(h, (contentHeight×scale).roundToInt()))`. `view.height` 와 `h` 가 다르면 로그만(지금처럼).
3. **다시 그리기 루프** — `drawOnce(n)`: 비트맵 흰 배경 → `view.draw(canvas)` → `ink = inkRatio`. `ink ≥ MIN_INK` → 성공. 아니면 `n < MAX_DRAWS(3)` 이면 `bmp.recycle()` · `Log.i(TAG, "render retry $n ink=… ${widthPx}x$bh")` · `view.invalidate()` · `ui.postDelayed(REDRAW_DELAY_MS = 120)` 뒤 `postVisualStateCallback(n+1)` → 콜백 오면 `ui.post { drawOnce(n+1) }`; 콜백이 `REDRAW_VISUAL_TIMEOUT_MS = 2000` 안에 안 오면 콜백 기다리지 않고 바로 `drawOnce(n+1)`(그려서 판정 — 비어 있으면 결국 BLANK_RENDER). `n == MAX_DRAWS` 에서도 비면 `Log.w("render blank after $MAX_DRAWS draws …")` → `Result(null,"BLANK_RENDER")`.
4. 첫 visual state 5초 타임아웃(`VISUAL_STATE_TIMEOUT`)·`NO_WINDOW`·`RENDER_ERROR`·`finish()` 경로는 그대로. 전체 상한은 호출부 `RENDER_TIMEOUT_MS`(20초) 가 그대로 덮는다(최악 추가 지연 ≈ 3×(120+2000)ms < 20초 — 확인해 기록).
5. 파일 머리 규칙 4 를 정정: «붙이되 **창 높이 이상으로**, visual state 뒤 그리고, **비면 1~2프레임 뒤 최대 3회 다시 그린다**(visual state 는 DOM 커밋 보증이고 래스터 보증이 아니다). `enableSlowWholeDocumentDraw` 는 프로세스 전체를 느리게 해 금지(11-08)». 규칙 5(백지=실패) 유지.
6. `NativePrintPlugin.kt`: **무변경**(응답 `render` 필드가 있으면 재시도 횟수를 넣고 싶어도 이번엔 넣지 않는다 — 절단면 유지; 재시도 횟수는 logcat 으로 센다).

**하지 않는 것(이유):** `setLayerType(SOFTWARE)`(효과 미검증·메인과 섞일 가능성) · 뷰를 맨 위(index 마지막)에 붙여 `PixelCopy`(화면에 티켓이 비친다 — 11-02 판정 9항목 위반) · WebView 재사용(상태 잔존, 11-02 §3-5) · 재시도 횟수 3 초과(인쇄 지연만 늘고, 3회에도 비면 그 렌더는 못 믿는다 — 폴러 재시도가 새 WebView 로 다시 한다).

### 3-3. 2단계(1단계 게이트 실패 시에만) — B: 인쇄 어댑터 → PDF → `PdfRenderer`
같은 파일 `OffscreenHtmlRenderer.kt` 를 바꾸되 **붙이기·visual state 는 제거**(단일 경로. 두 경로 공존 금지 — 2026-06-30 인쇄 결정 «단순화가 답»).
1. WebView 생성(설정 그대로: JS off·initialScale 100·흰 배경) → `layout(0,0,w,1)` → load → `onPageFinished`.
2. `adapter = wv.createPrintDocumentAdapter("ticket")`. `PrintAttributes`: **MediaSize 폭 = 576 CSS px = 6000 mils**(384px → 4000 mils), 높이 48in(48000 mils ≈ 4608 CSS px), `Margins.NO_MARGINS`, `Resolution(96,96)`. 이 조합이 **지금 1:1 기하(576 CSS px 폭)** 를 그대로 유지한다. `@page {size:80mm auto}` 는 무효 선언이라 영향 없음(§1) — **그러나 게이트에서 기하를 실측해 확인**(§5-2 ⑤). `adapter.onLayout(null, attrs, cancel, layoutCb, bundle)` → `onWrite(PageRange.ALL_PAGES, pfd(cacheDir 임시 파일), cancel, writeCb)`.
3. **숨은 API 의존 — 알고 받아들이는 위험:** `PrintDocumentAdapter.LayoutResultCallback/WriteResultCallback` 의 생성자는 공개 API 가 아니다(`@hide`). 통용 방식은 `android.print` 패키지 이름의 클래스를 앱에 두거나 리플렉션. 게이트에서 logcat 의 `Accessing hidden method … (blocked|blacklist)` 가 1건이라도 있으면 **B 폐기** → 설계 재요청. «greylight/unsupported» 경고만이면 통과(기록).
4. `PdfRenderer(pfd)` → 각 페이지를 `Bitmap(576, pageHeightPx, RGB_565)` 에 `render(…, RENDER_MODE_FOR_PRINT)` → 각 페이지 **아래 흰 줄 잘라내기**(밝기 ≥ 250 인 줄 연속) → 세로로 이어 붙임(per-item 주방티켓의 `.page-break` 가 여러 페이지를 만든다 — 이어 붙이면 지금 화면 경로의 한 줄 출력과 같아짐). `.no-print` 는 숨겨진다(인쇄 의도와 같음 — 티켓 HTML 에 그 클래스가 실제로 쓰이는지 팀원이 grep 으로 확인해 기록).
5. 잉크 가드 `BLANK_RENDER` 유지. 임시 파일·pfd·renderer·WebView 모두 `finally` 에서 정리. 오류 코드 추가: `PDF_ERROR`.
6. 장점: 창·가시성·타일 예산과 무관(화면 꺼짐·백그라운드에서도 그려짐 → `VISUAL_STATE_TIMEOUT` 소멸). 단점: 코드 양·숨은 API·인쇄 미디어 규칙(`@media print`) 적용·PDF 왕복 시간(저사양에서 수백 ms — 비동기라 허용).

### 3-4. 검토했으나 버린 길
- **별도 프로세스에서 렌더**(`android:process=":render"`): Android 는 프로세스마다 WebView 데이터 디렉터리를 따로 요구(`setDataDirectorySuffix`, API 28+ — minSdk 24 에서 크래시)하고, 그 프로세스에도 **보이는 창**이 필요하다(A/A-2 가 창 없이는 백지였던 이유). 복잡도만 늘고 해결이 아니다.
- **서버에서 HTML 을 PNG 로 렌더해 내려줌**: 인쇄 파이프라인·🔒 billPrint 변경, 운영 서버 자원 제약(reference_prod_server_resource_constraint). 금지.
- **A-3 유지 + «느려도 감수»**: Irene 원문이 바로 느림이다. 거부.
- **텍스트 경로 강제**: 한글 매장은 글자 경로가 없다(`_ticketIsTextSafe`). 백지 수정의 전제를 버리는 것.

## 4. 웹 — InboxDrawer 1줄 판정

- **받아들인다.** `{loading && !open ? null : loading ? <Skeleton×5> : …}` — 닫힌 서랍에서는 Skeleton 을 그리지 않는다. 열린 뒤 동작(open → `load()` → loading 스켈레톤 → 목록) 불변. 🔒 무접촉(InboxDrawer.tsx 는 보호파일 아님 — `check-print-guard` 8/8 로 증명). 디자인 가드 무관(기존 styled 그대로).
- 대안 «`loading` 초기값 false» 도 같은 효과·같은 크기지만, 지금 1줄이 «닫혀 있으면 그리지 않는다» 는 의도를 코드에 직접 남기므로 그대로 둔다.
- **같은 패턴 확장(허용 범위):** `animation … infinite` 를 쓰는 컴포넌트 중 **숨겨진(translate·display 조건·화면 밖) 컨테이너 안에서 항상 마운트된 것**만, 🔒 밖, **최대 3파일**, 각각 «수정 전/후 가만히 30초 CPU(6배 늦춤)» 수치 첨부. 그 외는 목록으로만 보고(다음 묶음). `MainLayout.tsx` 깜빡 점은 🔒 — 손대지 않는다(요소 1개 opacity 깜빡임은 비용도 작다).
- **건드리지 않는 것:** pending-print 폴링(30초에 6)·health(4) — 인쇄 폴러·오프라인 판정. 소켓·캐시 정책.

## 5. 검증 기준 (전부 PASS 여야 «끝»)

### 5-1. 공통(기계)
| 검사 | 기준 |
|---|---|
| 정적 | `grep -R enableSlowWholeDocumentDraw mobile-app/android/app/src` **0건** — `run-v3.js` 앞머리 또는 `build-release.sh` 에 fail-closed 로 넣는다(«규칙이 아니라 기계가 막는다») |
| 무접촉 | `check-print-guard.js` 8/8 무변경 · `check-sensitive-diff.js` 실행·기록 · 웹 변경 = `InboxDrawer.tsx`(+§4 허용 범위) · `sw.js` 만 |
| 빌드 | `build-release.sh` EXIT 0 · 서명 b55813cf… 동일 · **versionCode 10 · versionName 0.4.2** · dev-apps 의 0.4.1 AAB/APK 삭제 확인 |
| 성능(에뮬) | `emu.js` 로 **새 APK ↔ `without-slowdraw.apk` 교대 2회씩**(같은 세션). 새 APK 의 스크롤 fps·p50·POS Terminal 열기가 without 과 **±15% 안**(소음 범위) **그리고** with-slowdraw 기록보다 분명히 좋음: POS Terminal 열기 ≤ 3.0초 · 스크롤 p50 ≤ 120ms · 타이머 지연 ≤ 10ms/초. 수치 표로 첨부 |

### 5-2. 1단계 네이티브(에뮬) — API 34 **연속 3회** + API 36 1회, 전부 PASS
메모리 규칙 그대로(mem-slot · 에뮬 1대 · 빌드와 겹치지 않게).

| 검사 | 기준 |
|---|---|
| V3-2b · 2c · 2e · 2d · 나머지 | 11-02 와 동일(2c 3장 전부 ok 2~60%·서로 다름 / 2e 3734px·끝 25% ≥1% / 2d 빈 HTML → `BLANK_RENDER`·종이 0 — **2d 가 통과해야 재시도 루프가 끝나고 가드가 살아 있음이 증명된다**) |
| **V3-2f(신규) 짧은 티켓 연속** | 한글 티켓 **6장 연속**, 높이 서로 다르게 약 50·100·150·250·600·1200px(줄 수로 맞추고 실측 높이 로그) → 전부 `ok:true`·잉크 2~60%·바이트 서로 다름. 11-02 실패 유형(짧은 티켓)을 직접 겨눈다 |
| **재시도 비율** | 4회 실행의 모든 렌더(2b·2c·2e·2f·V4)에서 logcat `render retry` 건수 / 렌더 수 **≤ 10%**, **3번째 그리기까지 간 렌더 0건**. 넘으면 PASS 라도 «경계에 걸린 것» 으로 보고 2단계로 간다(실기기 예산은 다르다) |
| logcat | `tile memory limits exceeded` 건수 출력(WARN, 판정 밖) — 11-02 (13·4) 와 비교해 기록 |
| V4-1~6 | API 34 1회, 6/6 · V4-2·V4-6 잉크 2~60% |
| 종이 폭 | 2f 각 장의 래스터 폭 576 · 비트맵 높이 = 내용 높이(패딩만큼 흰 종이가 나가지 않음 — 로그 `${widthPx}x$bh` 가 측정 h 와 ±5% 안) |
| 반증 기록 | A-2 단독 1/3 BLANK(11-02 `v3-2e-34.log`) 가 같은 판정식의 실패 기록. 추가 고장주입 빌드 불필요. 2d 가 가드 반증 |

### 5-3. 2단계(B) 게이트 — 5-2 전부 + 아래
| 검사 | 기준 |
|---|---|
| ⑤ 기하 | 같은 픽스처의 비트맵 높이가 1단계(또는 11-02 A-3) 기록과 **±15% 안**, 폭 576. 벗어나면(예: 80mm 로 좁아져 1.9배 커짐) **중단·보고** — 모양 결정은 Fable 몫 |
| 숨은 API | logcat `Accessing hidden method` 에 `blocked`/`blacklist` **0건**(§3-3 ③). 1건이면 B 폐기 |
| 배경 | 검정 배너(`background:#000;color:#fff`) 픽스처 1장: 배너 띠 영역 잉크 ≥ 50%(배경이 인쇄됐다는 증명 — `print-color-adjust: exact` 가 적용됨) |
| 페이지 이어붙임 | per-item 주방티켓(`.page-break` 2개 이상) 픽스처: 페이지 사이 흰 띠 ≤ 8px·내용 누락 0(각 페이지 잉크 > 0) |
| 재판정 | 로그·바뀐 파일 목록을 Fable 에 — 마커는 그때 |

### 5-4. 웹(InboxDrawer)
- 빌드 1회(모든 웹 변경 확정 뒤) → `verify-all --full` 1회(mount sweep 크래시 0).
- 측정 전/후: 같은 스크립트(크롬 6배 늦춤, Live Orders·Dashboard 가만히 30초) **CPU 바쁜 시간**: 전 11~13초 → 후 수치 기록(기대 ≤ 3초). 
- 기능: 받은편지함 열기 → 스켈레톤 → 목록 · 닫기 → 다시 열기 · 안 읽음 전환 — 실브라우저 1회(화면 그대로).
- 고장주입: 조건을 `loading ? …` 로 되돌리면 CPU 수치가 다시 오르는지 1회(같은 측정) — 빌드 없이 dev 서버 소스로 안 되면 **생략하고 «전/후 수치가 반증»** 으로 기록(빌드 1회 규칙).

### 5-5. 실기기 — Irene 종이 확인(1회로 묶음, 11-02 판정 §5-A 9항목에 1개 추가)
0.4.2 사이드로드 APK 로. 9항목 그대로 + **10. 앱 전체 체감: 인쇄 전·중·후 화면 전환(POS Terminal·Live Orders 스크롤)이 0.3.4 와 같거나 빠르다(더 느려지지 않았다).** 확인은 «Irene 할 일» 카드가 아니라 보고 «확인할 곳» 에 둔다.

## 6. 범위 — 이번 일에서 할 것 / 하지 않을 것

**할 것**
1. `MainActivity.java` 1줄 삭제 + `OffscreenHtmlRenderer.kt` §3-2 보강 2개 + 머리 규칙 정정.
2. `run-v3.js`·`expr/v3.json` 에 V3-2f · 정적 grep 검사 · 재시도 건수 집계 · tile 경고 집계.
3. `build.gradle` 0.4.2/10 · dev-apps 0.4.1 삭제 · `ANDROID_APP_DESIGN.md §7-2 ②·§10` 정정(0.4.1 행 «제출 안 함 → 0.4.2 로 대체 — enableSlowWholeDocumentDraw 가 메인 화면을 1.5~2배 느리게» · 0.4.2 행 추가).
4. 웹 `InboxDrawer.tsx` 1줄(+§4 허용 범위) · `sw.js` 올림(웹 변경이 다 끝난 뒤 마지막 1회).
5. 게이트 §5-1·5-2·5-4 전부 실행 → 로그 경로·수치·바뀐 파일 목록을 Fable 에 전달(판정·마커는 Fable).
6. 운영 **읽기만**으로 Irene·실매장 기기 UA(기종·Android·WebView 판) 확인 → 보고에 표. 없으면 §7 질문.
7. Irene 할 일 카드(Play 앱 만들기) 의 AAB 를 0.4.2 로 갱신(같은 tid 다시 올림) — 게이트 통과 뒤.

**하지 않을 것**
- 🔒 8파일·`hybridKitchenPrint`·`PrinterRegistry`·`nativePrintBridge`·`NativePrintPlugin.kt`(1단계) — 0줄.
- 인쇄 폴링·health 폴링·소켓·MainLayout 깜빡 점.
- 번들 크기·코드 분할·DOM 다이어트·목록 가상화 등 **일반 성능 작업** — UA 확인 뒤 별도 설계(«무엇이 느린가» 를 먼저 안다).
- 2단계 B — 1단계 통과 시 안 함. 실패 시에도 §5-3 로그를 Fable 에 보이고 간다.
- Play 제출·피드 게시 — Irene 몫. 종이 ✓ 전 피드 금지(11-02 판정 §6 그대로, 대상만 0.4.2).
- 운영 배포·운영 DB 쓰기.

## 7. Irene 에게 (질문 1 + 권고)

운영 로그에서 기종·WebView 판을 못 찾을 때만 묻는다:
**느린 태블릿의 기종과 Android 버전, 그리고 설정 › 앱 › «Android System WebView» 의 버전을 알려 줄 수 있을까요?**
- Fable 권고: 이 세 가지만 있으면 «앱이 느린가 / WebView 가 낡았는가 / 기기가 느린가» 를 한 번에 가를 수 있고, 다음 설계(일반 성능)가 추측 없이 시작된다. 그 전까지 이번 일(폭탄 제거 + 확인된 낭비 제거)은 질문과 무관하게 끝까지 진행한다.

## 8. Fable 사용 기록
- 이 호출 = 설계 1회(`design`). 1단계 게이트 판정 1회(`gate`) 가 남는다. 2단계로 가면 그 게이트가 대신한다(한 사안 2회 유지). InboxDrawer 는 설계·판정 대상이 아니다 — 수치로 자체 검증(«Fable 미검증(자체 검증)»).

— Fable, 2026-11-08. 이 문서가 구현·판정의 단일 기준. 설계와 다른 판단이 필요해지면 중단하고 다시 묻는다.
