# Fable 설계·점검 — 설정 › 프린터 §1 안내: 상자 겹침 제거 + 우리 설정과의 매칭 점검 + 배포 안전 (2026-11-08 b)

> 작성: Fable(리더). 구현: Opus(팀원) — 이 문서 그대로. 설계와 다른 판단이 필요해지면 **즉시 중단**하고 사실만 들고 돌아온다.
> 앞 설계 `.claude/fable-design-20261108-printer-setup-guide.md`(구현 6e6289f15)의 **내용(순서·문구·기기 판정·EspTouch 사실)은 유지**하고, 이 문서는 ① 보여 주는 틀 ② 설정·인쇄 경로와의 매칭 ③ 배포 안전 증명을 정한다.
>
> Irene 원문 (2026-11-08): «이게 뭐야? 왠 박스디자인이 몇개야? 박스 안에 박스 안에 박스 안에 박스 안에 내용이 나오네? 가독성 엉망..... fable에게 물어봐서 이런 안내에 어울리는 ui ux 로 보완해. 그리고 우리 설정에서는 기능 문제 없는지 제대로 다시 fable 이 점검하게 해. 매칭 명확히 하고 작동하는지 테스트도 하게 해.» · «배포해도 기존 레스토랑들 설정 바뀌는 일 없는지 최종 점검도 하고»

---

## 0. 한 줄 결론

§1 카드 안을 **«고르기 두 줄(연결 방식 · 내 프린터 기종) → 번호 목록 하나(평면) → 접힘 글줄 둘»** 로 다시 짠다. **카드 안에는 테두리 상자를 하나도 두지 않는다**(세그먼트 버튼·행동 버튼·상태 한 줄만). 기종별 안내는 «상자 안 소목록» 이 아니라 **기종 고르기 한 줄이 본문을 바꾸는 방식**으로. QZ Tray 상자 3개는 «인쇄 도우미» 단계의 **버튼 줄**이 된다. 점검에서 찾은 매칭 어긋남 5건 중 코드 수정 2건(설정 불러올 때 `method` 누락 — 기존 결함 · 스테이션 Test 무응답)과 문구 3건을 같이 고친다. 배포 안전은 **«불러오기 → 아무 저장 1회 → 다시 불러오기» 가 바이트 단위로 같다** 를 데모 매장에서 3가지 모양으로 증명하고, 운영은 Irene 가 붙여 넣는 **읽기 전용 지문 스냅샷**(배포 전·후 비교)으로 닫는다.

---

## 1. 지금 화면이 왜 읽기 어려운가 — 실측 (스크린샷 A·S1·S1b·S4·S3b 기준)

PC 브라우저 · Wi-Fi 고른 상태에서 1단계 하나 안의 겹침:

```
SettingsCard(테두리)
 └ 1단계 li
    ├ StdPrinterItem        ← 테두리 + 배경 #FAFBFF            (깊이 1)
    │  └ StdPrinterBlock inline ← 테두리 + 배경 #FAFBFF        (깊이 2)
    │     ├ «시작 전에» 회색 상자 ← 테두리 + 배경 #F9FAFB     (깊이 3)
    │     ├ 소번호 1~5 (그 안에 버튼 2개 + 주황 글줄)
    │     └ «안 될 때» 노란 상자  ← 테두리 + 배경 #FFFBEB     (깊이 3)
    └ subList(Epson·Star·기타·LAN) ← 테두리 상자 안 4칸 구분선   (깊이 1)
 2단계 li └ subList(셀프테스트 4기종)  ← 테두리 상자              (깊이 1)
 3단계 li └ StdRegister A/B 상자      ← 테두리 상자              (깊이 1)
 4~7단계
 QZ 설명 문단 + QZ 상자 1·2·3 ← 테두리 + 배경, 각각 24px 번호 (앞 번호 1~7 과 다른 번호 체계가 또 시작)
 접힘 상자 3개(브라우저 인쇄 · 추천 기종 · 2대)  ← 테두리 상자 3줄
```

문제는 네 가지다.
1. **상자가 의미를 나르지 않는다.** 상자 = «여기부터 다른 것» 인데, 안내문에서는 모두 같은 «따라 할 순서» 다. 상자가 깊어질수록 독자는 «지금 몇 번째 안에 있나» 를 세야 한다.
2. **번호 체계가 셋이다.** 큰 번호 1~7 · 작은 번호 1~5(EspTouch) · QZ 상자 1~3. 「4단계에 가면 1·2·3 이 또 있다」.
3. **기종별 분기를 «전부 펼쳐 놓고» 독자가 고르게 했다.** 표준 프린터 + Epson + Star + 기타 + LAN 포트 안내가 한 화면에 다 보인다. 독자의 프린터는 하나다.
4. **줄 길이.** 카드가 1000px 폭이라 12px 본문 한 줄이 180자다(S2 참고). 안내문은 70자 안팎이어야 읽힌다.

설계 원칙(이 문서 전체에 적용):
- **상자 금지.** 카드 안 깊이 ≥1 의 «테두리+배경 컨테이너» 0개. 허용: 세그먼트(고르기) 버튼 · 행동 버튼 · 상태 한 줄(점+글) · 안드로이드 «자동 인쇄 준비» 상태판 1개(그건 안내가 아니라 상태라 상자가 맞다).
- **번호는 한 체계.** 화면에 보이는 번호는 큰 목록 하나뿐. EspTouch 세부도 그 목록의 단계다(평면).
- **분기는 고르기로.** 기종·연결 방식·기기는 «고르기 한 줄» 이 본문을 바꾼다. 안 고른 분기는 화면에 없다.
- **본문 폭 760px(≈ 영문 95자 · 한글 60자).** 목록 컨테이너 `maxWidth: 760`.
- 디자인 기준은 RA 표준 그대로(primary `#635BFF` · 본문 `#1F2937/#4B5563/#6B7280` · 선 `#E5E7EB` · 이모지 없음 · 글리프 `○ ● ▸ ▾ ✓ ✗` 만). 메모리 `feedback_tab_vs_accordion`(«외곽 박스 없음 · 섹션 사이 border-bottom 만 · 중첩 박스 금지»)과 같은 원칙.

---

## 2. 새 틀 — §1 카드 (모든 기기 한 틀)

```
[카드]
  이 기기: Windows PC · 웹브라우저                             아니에요? [select]   ← 글 한 줄 + 아래 hairline. 회색 상자 아님
  프린터 연결    [● Wi-Fi  추천] [○ LAN 케이블] [○ USB]                                ← 세그먼트 1줄(높이 36). 고른 것의 설명 한 줄만 아래에
  내 프린터      [● PurpleHere 표준] [○ Epson] [○ Star] [○ 다른 기종]                  ← Wi-Fi·LAN 일 때만. 고른 것 식별 문구 한 줄
  ─────────────────────────────────────────────── (hairline)
  ① 제목 (13px/700)
     본문 1~3줄 (12px/1.6, #4B5563)                                                   ← 상자 없음
     [버튼] [버튼]   상태 한 줄                                                         ← 행동이 있는 단계만
     안 될 때 ▸                                                                       ← 글 링크. 펼치면 왼쪽 2px 회색 선 + 평문 2~3줄
  ② …
  ⑨ …
  ─────────────────────────────────────────────── (hairline)
  ▸ 프린터 2대(계산대 + 주방) · 기기가 여러 대일 때                                      ← 글 링크 접힘(테두리 없음). 워크스테이션 ≥2 면 기본 펼침
  ▸ 자동 인쇄가 필요 없다면 — 브라우저 인쇄 창으로 (pc-browser 만)
```

### 2-1. 기기 줄 (D1 유지, 모양만)
- `DeviceLine`: 배경·테두리 제거. `padding: 0 0 10px` + `borderBottom: 1px solid #E5E7EB` + `marginBottom: 12px`. PWA 설명은 같은 줄 아래 12px 회색 한 줄 그대로.
- 안드로이드 브라우저 권고(앱 설치) · iPad 안내는 **상자 대신 2줄 글 + 버튼**(제목 13px/700 색 그대로 `#065F46`/`#92400E`, 본문 12px, 배경·테두리 없음, 아래 hairline). 색이 상자 대신 «이건 권고/주의» 를 나른다.

### 2-2. 고르기 두 줄 — 세그먼트 컨트롤 `Seg`
- 공용 컴포넌트 `Seg`(PrinterSetupGuide.tsx): `options: {v, label, tag?}[]` · `value` · `onChange` · `ariaLabel`. 한 줄 flex-wrap, 버튼 `padding 7px 12px · 13px/600 · border 1px #D1D5DB · radius 6 · 선택 = border #635BFF + bg #EEF2FF + color #312E81`, 앞 글리프 `●/○`. `tag` 는 선택 여부와 무관하게 버튼 안 11px `#065F46`(«추천»). 설명(sub)은 버튼 안이 아니라 **줄 아래 12px 회색 한 줄, 고른 것만**.
- 연결 방식(비-앱·Windows 앱): 기존 키 `printer_setup_conn`(wifi|lan|usb) 그대로. 안드로이드 앱: 기존 `AndroidConnPicker` 를 `Seg` 로 바꾸고 키 `android_printer_conn`(wifi|lan|bluetooth|builtin) 그대로 — **값·키 변경 금지**(매장 태블릿 선택 유지).
- **내 프린터 기종(새)**: `printer_setup_model` = `std | epson | star | other`(이 기기 브라우저 저장, 기본 `std`). 보이는 조건: conn ∈ {wifi, lan}(앱·PC 공통). 라벨: «PurpleHere 표준 프린터» · «Epson TM» · «Star» · «다른 기종». 아래 식별 한 줄(고른 것만):
  - std: «셀프테스트 종이에 «WIFI distribution network method» 가 있으면 이 기종입니다 — 80 mm · USB + Wi-Fi 2.4 GHz · 자동 커터. 저희 매장 패키지 기종.» (+ 모델명 키 `std.model` 이 채워지면 앞에 붙임 — §8 Irene 답)
  - epson: «TM-m30 · TM-T82X 등 Wi-Fi 모델» · star: «TSP143 · mC-Print 등» · other: «Xprinter · Gprinter · Rongta · HPRT … 상자 안 설정 안내지대로».
  - conn=usb 일 때는 기종 줄 대신 12px 회색 한 줄: «프린터를 새로 사신다면: PurpleHere 표준 프린터(80 mm · USB + Wi-Fi) — Wi-Fi 로 쓰면 주방 프린터로도 됩니다.» → **«추천 기종» 접힘 상자는 없앤다**(내용이 기종 줄 + Wi-Fi 순서 안으로 들어간다).
- 고르기 전(연결 방식 미선택): 기존 문구 «하나 고르면 그 방식의 순서만 보입니다» 한 줄, 목록 없음(기존 동작).

### 2-3. 번호 목록 — 공용 `StepList`
- `StepList({ steps, maxWidth=760 })`, `steps: Step[]`, `Step = { title, body, lines?: string[], actions?: ReactNode, trouble?: string[] }`.
  - `lines` = 본문 아래 평문 줄(«A. …» «B. …» 같은 것). 들여쓰기 없음, 줄 사이 4px.
  - `actions` = 버튼 줄(gap 8, flex-wrap) + 필요하면 상태 한 줄. **상자 없음.**
  - `trouble` = «안 될 때 ▸» 글 링크(12px `#4F46E5`, underline 없음, 글리프 ▸/▾). 펼치면 `borderLeft: 2px solid #E5E7EB · paddingLeft 10 · marginTop 6` 안에 12px 평문 줄들. 노란 배경 없음.
- 번호 배지 = 기존 `stepNo`(22px 보라 원) 하나만. `smallNo` 삭제.
- 안드로이드 `AndroidPrintGuide` 도 이 `StepList` 를 쓴다(지금 자체 ol 과 동일 모양이라 교체 비용 0). 안드로이드 «안 나올 때 — 이 순서로» 접힘 상자 → 목록 끝 «안 될 때 ▸» 글 링크(같은 `trouble` 모양).

### 2-4. 단계표 (화면에 보이는 그대로 — 번호는 렌더 순서)

공통 끝단계 **[고르기] [자동] [켜 두기]** 는 앞 설계 D5 문구 그대로(키 `pc.pick*` · `pc.auto*` · `pc.keepOpen*` · 안드로이드 `androidGuide.pick/auto/keepOpen`).

**A. pc-browser / windows-app**

| conn | model | 단계 (제목 — 본문 요지) |
|---|---|---|
| wifi | std | ① **EspTouch 앱 설치** — iPhone/iPad 가 있으면 App Store «Espressif Esptouch»(가장 쉬움) · 안드로이드 폰은 공식 설치 파일(APK) → 열어 설치(«이 출처 허용» 한 번). 무료. `actions`: [App Store 열기] [EspTouch 받기(안드로이드)] + 11px 주황 한 줄 «Google Play 에는 공식 앱이 없습니다…» (기존 `std.e1*`) ② **프린터를 설정 모드로** (`std.e2*`) ③ **EspTouch 로 Wi-Fi 보내기 — 1분 안에 IP 가 뜨면 성공** — 첫 줄 굵게 «먼저: 폰을 매장 2.4 GHz Wi-Fi 에(«Shop-5G» 아님 · 손님용 아님)» 그 다음 기존 `e3Body` + `e4Body` 를 한 본문으로(새 키 `std.e3Merged`). `trouble` = 기존 `trouble1`(Timeout) ④ **종이로 확인 — 셀프테스트** (`std.e5*`; «2초 뒤 손 떼기» 포함) `trouble` = `trouble2`+`trouble3` ⑤ **이 PC 에 등록 — 두 길 중 하나** — `lines` = «A. 메뉴가 영어·말레이어만: …» «B. 한글·중문·로고: …» «권고: 영문 아닌 글자가 하나라도 있으면 B» (기존 `regPc*`, **단 기기별 문구 §3-M1 반영**) ⑥ **인쇄 도우미(QZ Tray)** / 앱이면 **앱이 직접 인쇄** (§2-5) ⑦ 고르기 ⑧ 자동 ⑨ 켜 두기 |
| wifi | epson / star / other | ① **프린터를 매장 Wi-Fi 에 붙이기 — {기종} 방법** — 본문 = 기존 `wjEpsonHow` / `wjStarHow` / `wjGenericHow` 한 문단 + 끝에 «2.4 GHz · 손님용 아님» 한 줄(기존 `pc.wifiJoinBody` 요약) ② **셀프테스트로 IP 확인** — 본문 = 기존 `pc.checkBody` + 그 기종의 셀프테스트 한 줄(`stEpsonHow`/`stStarHow`/`stGenericHow`) ③ 등록(A/B) ④ 도우미 ⑤ 고르기 ⑥ 자동 ⑦ 켜 두기 |
| lan | (기종 줄 보임 — 셀프테스트 문구용) | ① **랜선으로 공유기에 꽂기** (`pc.lanPlug*`) ② **셀프테스트로 IP 확인** (기종 줄의 셀프테스트 한 줄 — std 면 `std.stHow`) ③ 등록 ④ 도우미 ⑤ 고르기 ⑥ 자동 ⑦ 켜 두기 |
| usb | — | ① **USB 로 이 PC 에 연결** (`pc.usbPlug*`) ② 도우미 ③ 고르기(백지면 §3 «Text» — `pc.pickBodyUsb`) ④ 자동 ⑤ 켜 두기 |

- «LAN 포트도 있으면 랜선이 더 쉽습니다»(옛 `wjLan*`)는 Wi-Fi 고른 상태의 **연결 방식 줄 아래 설명 한 줄**로 옮긴다: «프린터에 LAN 포트가 있으면 랜선이 더 쉽고 안정적입니다(Wi-Fi 설정 없음).»

**B. android-app** — `PLAN` 표(wifi 6 · lan 5 · bluetooth 4 · builtin 4) 그대로. 바뀌는 것:
- wifi ① `wifiJoin`: 기종 줄(`printer_setup_model`) 로 본문 교체 — std 면 **EspTouch 가 ①~④ 로 펼쳐진 평면 단계**(PC 와 같은 4단계 → 이 경우 wifi 는 6+3 = 9단계. `stepNumber()` 가 PLAN 길이를 쓰므로 «N단계» 제목·준비 상자의 «— N단계» 참조가 저절로 맞게 PLAN 을 `wifi_std` 변형으로 만든다: `['espInstall','espMode','espSend','espCheck','find','pick','auto','keepOpen']` — `wifiCheck` 는 `espCheck` 가 대신함). epson/star/other 면 기존 wifi PLAN.
- `find` 단계 본문에 기존 `regAndroidApp` 문구를 합친다(«찾은 주소에 KITCHEN 이름 → 추가 · 못 찾으면 IP 로»).
- `subList` 상자 → 삭제. `selfTest` 소목록 → 기종 줄의 한 줄.
- «안 나올 때» 접힘 상자 → `trouble` 글 링크.
- **둘째 카드(«이 태블릿의 프린터») 의 compact 연결 방식 고르기 삭제** — 같은 화면에 «프린터는 어떻게 연결하나요?» 가 두 번 나온다(S3b). 값은 위 고르기와 공유(`useAndroidConn`)라 동작 동일. 녹색 «✓ Direct printing is active» 띠 삭제(기기 줄이 이미 «Purple POS 안드로이드 앱»). 그 카드의 나머지(찾기·등록·블루투스)는 그대로 — 그건 안내가 아니라 **도구**라 카드가 맞다.

**C. android-browser** — 기기 줄 → 권고(글+버튼) → «브라우저 그대로 쓰기(RawBT) ▸» 글 접힘(안에 기존 5단계 ol, 주황 상자 없이 평문) → 2대 접힘.
**D. ipad-browser** — 기기 줄 → 주의(글) → 브라우저 인쇄 3줄 평문(상자 없음) → 2대 접힘.

### 2-5. 인쇄 도우미 단계 = QZ 상자 3개를 버튼 줄로 (pc-browser)
⑥ **인쇄 도우미(QZ Tray) 설치 → 연결 확인 → 프린터 찾기 — 인쇄하는 PC 마다 한 번**
본문: «한 번 받아 실행하면 QZ Tray 와 신뢰 인증서가 같이 설치됩니다(허용 창 없음). 주방 화면만 보는 태블릿은 필요 없습니다.»
`actions`(한 줄, wrap): **[Windows 설치 파일 받기]**(primary) [macOS] · [연결 확인] · [프린터 찾기] · 상태 한 줄 «● 연결됨 — 찾은 프린터: KITCHEN, POS-80C» / «○ 연결 안 됨 — 설치 뒤 «연결 확인»».
- «연결 확인» 결과(`qzDiagSteps`)는 버튼 줄 아래 **평문 줄** `✓ 라벨 — 상세` / `✗ 라벨 — 상세`(초록/빨강 글자만, 상자 없음) + 모두 ✓ 면 초록 한 줄 «모두 정상 — 허용 창 없이 조용히 인쇄됩니다». 실패 시 [진단 보내기] 버튼은 그 아래 같은 줄 모양.
- 코드: 세 상자의 **핸들러·상태(`runQZDiagnostic`·`connectQZTray`·`getQZTrayPrinters`·`qzDiag*`·`qzTrayStatus/Printers`)는 SettingsPage 에 그대로** 두고, JSX 만 `QzHelperRow`(SettingsPage 모듈 스코프, props 로 상태·핸들러) 로 묶어 `SetupSteps` 에 `slots={{ helper: <QzHelperRow …/> }}` 로 넘긴다. `SetupSteps` 는 `helper` 단계의 `actions` 자리에 그 슬롯을 그린다. **동작·호출 순서 변경 0.**
- windows-app: 같은 단계가 «앱이 직접 인쇄합니다 — 프린터 목록은 자동» 본문 + `actions` = [프린터 다시 읽기](= 기존 Find Printers 핸들러) + 상태 한 줄. 번호 «3» 상자 없음.
- QZ 설명 문단(`methodGuide.qzDesc`, «QZ Tray runs on each Windows / macOS / Linux POS device…») 삭제 — 단계 본문이 대신한다.

### 2-6. 접힘 두 줄 — `TextFold`
- `Fold`(테두리 상자) → `TextFold`: 버튼 = 글 한 줄(13px/600 `#1F2937`, 왼쪽 글리프 ▸/▾), 배경·테두리 없음, 위에 hairline. 펼친 내용은 평문/ol(12px). `TwoPrintersBlock` 이 이걸 쓴다(기본 펼침 조건 `workstations.length ≥ 2` 유지, 7줄 유지 — l5 문구만 §3-M5).
- 브라우저 인쇄 접힘(pc-browser): 같은 `TextFold`, 안은 `methodGuide.browserDesc` + 3줄 ol 평문(회색 상자 제거).
- `StdPrinterBlock`(accordion) 과 그 호출 2곳 삭제(§2-2 로 흡수).

### 2-7. 지우는 코드 (AndroidPrinterSetup.tsx · PrinterSetupGuide.tsx)
`subList` · `StdPrinterItem` · `StdPrinterBlock` · `EspTouchSteps`(JSX) · `StdRegister`(JSX) · `smallNo` · `accordionStyles/accHead` · `Fold`. 대신 **데이터 함수**로: `espTouchSteps(t): Step[]`(4단계) · `registerLines(t, device): string[]` · `makerJoin(t, model): {title, body}` · `selfTestLine(t, model): string` · `wifiOthers` 는 `makerJoin` 으로 흡수. `ESPTOUCH_*_URL` 상수 유지.

### 2-8. 로케일 (4언어, en → ko → zh → ms)
- 재사용(글자 그대로): `setupGuide.std.e1*·e2*·e5*·trouble1~3·regPcA/B/Recommend·stHow·identify(짧게 손봄)·head`, `pc.*`, `androidGuide.*`, `two.*`, `appBox.*`, `ipadBox.*`, `methodGuide.qzStep1WinBtn/MacBtn/qzStep2Btn/qzStep3Btn/qzStatus*/qzDetectedPrinters/qzAutoTestAllOk/qzSendDiag*`.
- 새 키: `setupGuide.model.{label, std, epson, star, other, stdId, epsonId, starId, otherId, buyHint}` · `setupGuide.std.e3Merged` · `setupGuide.pc.helperQzBody2`(위 2-5 본문) · `setupGuide.pc.wifiLanHint` · `setupGuide.pc.wifiJoinMaker`(제목 «프린터를 매장 Wi-Fi 에 붙이기 — {{model}} 방법») · `setupGuide.trouble`(«안 될 때») · `assign.wsAutoPrintHint`(§3-M4) · `stations.testNeedsPrinter`(§3-M6) · `two.l5` 교체(§3-M5).
- 지움(4언어 + grep 0 확인 뒤): `std.inlineTitle·accTitle·espTitle·regTitle·othersHide·othersShow·itemName·itemSummary·itemHide·itemShow·prepTitle·prepBody·prepShort·e4Title·e4Body·regPcTitle·stName`, `androidGuide.wjLanName/wjLanHow`, `methodGuide.qzDesc·qzStep1Title·qzStep1Desc·qzStep1Note·qzStep2Title·qzStep2Desc·qzStep3Title·qzStep3Desc·nativeActiveTitle·nativeActiveDesc·nativeActiveDescAndroid`, `setupGuide.rawbtFold·browserFold`(글 접힘 제목으로 계속 쓰면 유지).
- `npm run i18n:verify` 0.

---

## 3. 기능 매칭 점검 — 지금 코드에서 찾은 어긋남 (읽기만 · 보호파일은 읽기 전용)

점검 범위: 안내문이 가리키는 모든 «§2 에서 …» «이름/IP» «Find Printers» «이 기기에서 사용» «자동 인쇄» «Text 형식» 이 §2·§3 화면과 `billPrint.js`/폴러의 실제 판정과 같은가.

### 맞는 것(확인됨)
- **이름 → 그림 경로 · IP → raw ESC/POS**: `billPrint.js` `sendToRawBTPrinter` 3834–3860(`isLanIP` 면 `sendViaQZTray` raw, 아니면 `sendTicketAutoFormat` → HTML 또는 ASCII 면 raw) · 빌 경로 2196–2216 동일. 안내 «IP 로 적으면 한글·로고 안 됨 / 이름으로 적으면 됨» **일치**.
- **Print Format «Text»**: `_ticketIsTextSafe` 2098: `text` 면 ASCII 일 때 raw. 안내 «백지면 §3 Text» **일치**(§3 = `#printer-sec-output`, 선택지 auto/graphic/text 7239–7241).
- **빈 주소 = 안 찍힘**: qztray + 빈 address → `return false`(3836) · 빌 2200. §2 스테이션 경고 6950 과 안드로이드 준비 상자가 이걸 보여 준다. 안내 «자리마다 고르기 → Test» **일치**.
- **Find Printers → §2 드롭다운**: `qzTrayPrinters` 하나가 §1 버튼과 §2 «Or pick a printer found on this device» 를 같이 쓴다(6597 · 7059) **일치**. Windows 앱은 mount 때 자동 로드(1000–1016) **일치**.
- **«이 기기에서 사용»** = `setActiveWorkstationId` → localStorage `workstation_id` → `getActiveBillPrinter()` **일치**. 폴러: 워크스테이션 ≥2 이고 (미선택 또는 활성 자리 `billPrinter.autoPrint===false`) 면 **이 기기는 주방 티켓을 안 찍는다**(`useAutoPrintPoller.ts` 73 · `MainLayout.tsx` 1314). 안내 «자동 인쇄 켜진 POS 자리에 이 기기에서 사용» **논리 일치** — 단 §2 라벨이 이를 말하지 않는다(M4).
- 기기 판정 `detectSetupDevice`(printDiagnostics.ts): 앱 브릿지 → UA → PWA. 저장 키 `printer_setup_device/conn` 은 **billPrint·폴러·MainLayout 어디서도 읽지 않는다**(grep 0 — 구현자가 S5 로 다시 증명).
- 안드로이드 앱 등록(이름 → 주소) · 준비 상자 판정(`resolves` = IP 또는 등록 이름) **일치**.

### 어긋남 — 고친다
| # | 무엇 | 근거(파일:줄) | 고치는 법 (최소) |
|---|---|---|---|
| **M1** | 등록 안내 A/B 가 «§2 에서 “Printer name or IP” 고르기 → IP 입력 / Find Printers» 라고 하는데 **Windows 앱** §2 는 연결 방식 select 가 없고 `NativePrinterSelect` 하나(«Network printer (enter IP)…» · 자동 로드 목록) | SettingsPage 6532–6551 · 6835–6853 · `StdRegister` 550–556 | `registerLines(t, device)`: windows-app 용 문구 분리 — A «§2 드롭다운에서 «네트워크 프린터(IP 입력)…» → 셀프테스트 IP» · B «드라이버 설치·이름 KITCHEN → §2 드롭다운에 바로 보임(안 보이면 [프린터 다시 읽기])». pc-browser 문구는 지금 그대로(옵션 글자 `assign.optQz` 와 일치 확인됨) |
| **M2** | 4단계 본문 «바로 아래 상자 3개» 인데 상자는 7단계 뒤에 그려짐(S1) | PrinterSetupGuide 137–138 · SettingsPage 6157–6338 | §2-5 로 해결(단계 안 버튼 줄) |
| **M3 (기존 결함)** | **설정을 불러올 때 `billPrinter.method`·`kitchenPrinter.method` 를 버린다.** → ① 스테이션 없는 매장에서 §2 «주방 연결 방식» select 가 저장값(browser/rawbt)과 무관하게 «qztray» 로 보임(6863 `method || 'qztray'`) ② 그 상태로 **무관한 자동저장 1회**(결제 토글 등)가 나가면 JSON 에서 `method` 가 빠지고, 서버 getter 가 옛 `printerMode` 로 다시 채운다(`models/Restaurant.js` 627–633) → 매장이 골라 둔 방식이 **조용히 되돌아간다**(예: printerMode=rawbt 매장이 주방을 qztray 로 바꿔 둠 → 다음 저장 뒤 rawbt). 이 커밋 이전부터 있던 결함(ef1f02699^ 에도 동일 · 운영 SW 6.06 에도 있음). dev DB 실측: 매장 38 `kitchenPrinter.method='browser'`·`printerMode='rawbt'`(불러오면 select 는 qztray 로 보임) · 매장 5 `kitchenPrinter` method 없음 + address `KITCHEN` + printerMode rawbt(= PC 인데 주방이 RawBT 경로로 풀림) | SettingsPage **1593–1607**(method 없음) vs 저장 2419–2420(state 그대로 PUT) · `getPrinterMethod` billPrint 190–206 | 불러오기에 두 줄 추가: `method: dbSettings.billPrinter?.method || undefined` / `method: dbSettings.kitchenPrinter?.method || undefined` (undefined 면 키 자체를 넣지 않는다 — 서버가 준 값을 그대로 돌려줄 뿐 새 기본값을 만들지 않는다). **다른 저장 로직 무변경.** 효과 = «화면에 보이는 값 = 저장되는 값 = 기기가 쓰는 값». 증명은 §4 S2 라운드트립. Fable 판단: 이번에 같이 고친다 — Irene 질문의 핵심(«설정이 바뀌는 일») 그 자체이고, 보존만 하므로 되돌리기 쉽다 |
| **M4** | §2 워크스테이션 토글 «Auto-print receipt after payment (this workstation only)» 가 **POS 2대 이상일 때 «어느 기기가 주방 티켓을 찍나»도 결정**하는데 라벨이 말하지 않는다. 새 워크스테이션 기본 `autoPrint:false`(6758) 라, POS1 도 꺼져 있으면 아무도 안 찍는다 | poller 73 · MainLayout 1314 · 6625–6636 | 토글 아래 11px 회색 한 줄 `assign.wsAutoPrintHint`: «POS 자리가 2개 이상이면: 이 토글이 **켜진** 자리에 «이 기기에서 사용» 한 기기가 주방 티켓도 찍습니다. 주문만 넣는 자리는 끕니다.» (논리 무변경) + 안내 «자동» 단계·2대 l1 에 같은 문장 한 줄 |
| **M5** | 2대 l5 «다른 이름이면 §2 에 “saved (not detected now)” 가 뜬다» — 그 글자는 앱(`NativePrinterSelect`)에만 있고 PC 브라우저 §2 는 글 입력칸이라 안 뜬다 | SettingsPage 720–722 vs 6574–6582 | l5 끝 문장을 «이름이 다르면 §2 Test 가 실패하고(앱에서는 «saved (not detected now)» 로 보임) 티켓이 안 나옵니다» 로 |
| **M6** | 스테이션 Test 버튼: 주소가 비면 아무 반응 없음(`if (!addr) return;`) — 안내는 «Test 눌러 종이 확인» | SettingsPage 7040–7042 | `setSaveStatus({type:'error', message: t('settings:printer.stations.testNeedsPrinter', 'Pick a printer for this station first.')})` 한 줄. 인쇄 경로 무접촉 |
| **M7** | 안드로이드 둘째 카드에 연결 방식 고르기 중복 + «Direct printing is active» 띠 | AndroidPrinterSetup 237 · SettingsPage 6140–6147 | §2-4 B 대로 삭제 |

### 확인했지만 범위 밖(기록만)
- iPad·프린터 없는 PC 가 Purple 탭을 열어 두면 **단일 워크스테이션 매장**에서는 폴러가 주문을 claim 할 수 있다(2026-05-29 `qzHasPrinter` 게이트 제거 이후의 기존 동작). 안내 «iPad 는 주문만» 은 그 뜻이 아니라 «자동 인쇄 기기로 삼지 말라» 는 뜻 — 문구는 그대로 두되, 인쇄 구조 변경은 🔒 라 이 건에서 다루지 않는다.
- 스테이션 시드 저장(1785–1812): 주방 스테이션은 있는데 프린터 칸이 없는 매장은 설정 탭을 **열기만 해도** 시드 PUT 이 1회 나간다(2026-06-17 부터 · 운영에도 이미 있음). 이 배포가 만든 것이 아니며 바꾸지 않는다 — §4 S3 «mount 시 쓰기 0» 판정에서 **이 경우만 예외**로 명시.

---

## 4. 배포 안전 — «기존 매장 설정이 바뀌지 않는다» 증명

**주장:** 이 두 커밋(ef1f02699 · 6e6289f15) + 이번 구현은 ① 백엔드·DB·마이그 변경 0 ② 프론트의 저장 payload 구성(`handleSave` 2416–2430)·자물쇠(로딩/오류 중 제외)·`AutoSaveField` 트리거 조건 변경 0 ③ mount 시 새 쓰기 0 ④ §2 select 의 **값**(`browser|qztray|rawbt`) 변경 0 ⑤ 새 localStorage 키는 안내만 바꾼다. M3 수정은 «서버가 준 값을 버리지 않는다» 뿐이다.

구현자가 **실제로 돌려 숫자로** 남길 것:

| # | 증명 | 방법 | 통과 기준 |
|---|---|---|---|
| **S1** | 백엔드·저장 로직 정적 무변경 | `git diff ef1f02699^ HEAD --stat -- dev-backend/ dev-frontend/src/utils/billPrint.js dev-frontend/src/hooks dev-frontend/src/components/Layout/MainLayout.tsx` · `git diff ef1f02699^ HEAD -- dev-frontend/src/pages/Settings/SettingsPage.tsx \| grep -n "printer_settings:\|printerSettingsLoading \|\| printerSettingsError\|AutoSaveField onSave"` | 백엔드 0줄(다른 방의 미커밋 변경은 작업트리에만 있고 커밋 사본 배포라 섞이지 않음 — `git status` 로 그 파일들이 이 커밋에 없음을 보고에 적는다) · handleSave 블록 diff 0 · M3 두 줄만 로드 블록에 추가 |
| **S2** | **라운드트립 바이트 동일** | 데모 매장 38 에서 Playwright(RA 토큰): ① `GET /api/restaurants/38` → `A = printer_settings`(getter 결과) ② 설정 › 프린터 열고 10초 대기 ③ §2 «Print Copies» select 를 **같은 값으로 다시 고르기**(AutoSave 1회 발동) → PUT 1건 확인 ④ `GET` 다시 → `B`. 비교는 **키 정렬 후 JSON 문자열 동일**. 모양 3가지로 반복(각각 테스트 전 RA PUT 으로 심고 끝나면 원래 38 값으로 복원 — 심는 값은 아래, 매장 38 만): (a) 지금 38 값 그대로(스테이션 2 · method 명시) (b) **레거시 모양**: `printerMode:'rawbt'`, `billPrinter/kitchenPrinter` 에 `method` 없음, `kitchenPrinter.address:'KITCHEN'`, 워크스테이션 1개 qztray/POS-80C (= dev 매장 5 모양) (c) **혼합 모양**: `printerMode:'rawbt'`, `kitchenPrinter.method:'qztray'`, 워크스테이션 2개(POS1 autoPrint true · POS2 false, rawbt) | A ≡ B 세 모양 모두. **반증 1회 의무**: M3 두 줄을 잠시 빼고 (c) 를 돌리면 `kitchenPrinter.method` 가 qztray→rawbt 로 바뀌어 **실패해야** 한다(검사기가 살아 있음을 증명) → 되돌리고 다시 통과 |
| **S3** | mount 시 쓰기 0 | 기존 `check-printer-guide.js` 의 `writes` 수집 유지 + 기기 5종(PC·Win UA·안드로이드 UA·iPad UA·앱 2종 흉내) × 15초 대기 × 고르기 줄 전부 클릭 | PUT/POST/PATCH to `/api/restaurants/38|/api/store/settings` = 0 (예외: §3 끝 «스테이션 시드» — 38 은 스테이션 프린터 칸이 둘 다 있어 발동하지 않는다. 발동하면 그 사실을 적는다) |
| **S4** | §2 값 무변경 · 표시 = 저장값 | Playwright: §2 의 모든 `select` 중 옵션 값 집합이 `{browser,qztray,rawbt}` 인 것 → 각 select 의 `value` 가 `GET` 의 해당 `method` 와 같다(워크스테이션·주방·스테이션). 모양 (b)(c) 에서도 | 전부 일치(M3 전엔 (c) 주방이 불일치 → 반증으로도 쓴다) |
| **S5** | 새 키는 안내만 | `grep -n "printer_setup_device\|printer_setup_conn\|printer_setup_model\|android_printer_conn" dev-frontend/src/utils/billPrint.js dev-frontend/src/hooks/useAutoPrintPoller.ts dev-frontend/src/components/Layout/MainLayout.tsx dev-frontend/src/pages/KitchenDisplay dev-frontend/src/pages/POSTerminal dev-frontend/src/contexts` | 0건 |
| **S6** | 기계 게이트 | `check-print-guard.js`(8/8 변경 0) · `check-design-guard.js` 신규 0 · `check-sensitive-diff.js`(비대상) · `npx jest tests/settings-guard.test.js` · `health-check.js --category=print` · 빌드 1회 뒤 `verify-all --full` 1회 | 전부 통과. 숫자 그대로 보고 |
| **S7** | **상자 없음 기계 검사**(가독성의 대리 지표) | Playwright: §1 카드(`#printer-sec-connect` 다음 SettingsCard) 안 모든 요소 중 `getComputedStyle` 의 `borderTopWidth>0 && backgroundColor !== 'rgba(0, 0, 0, 0)'` 이고 태그가 `button/select/input` 이 아닌 것의 수 = **0**(안드로이드 흉내는 준비 상자 1 허용). 단계 목록 컨테이너 `clientWidth ≤ 760`. 번호 배지(`stepNo` 22px 원) 외에 숫자 원 0 | 기기 5종 모두 |
| **S8** | 운영 읽기 전용 비교(Irene 가 붙여 넣음) | 아래 스크립트 — 배포 **전** 1회 → 파일 보관 → 배포 **후** 같은 스크립트 → diff. 쓰기 0. `GROUP_CONCAT` 쓰지 않는다(지문 1024바이트 잘림 메모리) | 배포 전후 `sha` 가 다른 행 = RA 가 그 사이 실제로 저장한 매장(`updated_at` 로 대조)뿐 |

**S8 스크립트(읽기 전용 · 운영 `/tmp/ps-fp.js` · `cd /var/www/production-backend && timeout 60 node /tmp/ps-fp.js > /tmp/ps-fp-$(date +%F-%H%M).txt`):**
```js
require('/var/www/production-backend/node_modules/dotenv').config({ path: '/var/www/production-backend/.env' });
const { sequelize } = require('/var/www/production-backend/config/database');
(async () => {
  const [rows] = await sequelize.query("SELECT id, name, is_demo, updated_at, SHA2(printer_settings,256) sha, printer_settings ps FROM restaurants WHERE printer_settings IS NOT NULL AND printer_settings<>'' ORDER BY id");
  for (const r of rows) {
    let p = {}; try { p = JSON.parse(r.ps); } catch {}
    const st = Object.values(p.kitchenStationPrinters || {});
    console.log([r.id, JSON.stringify(r.name), r.updated_at && new Date(r.updated_at).toISOString(), r.sha,
      'mode=' + p.printerMode, 'billM=' + (p.billPrinter?.method || '-'), 'kitM=' + (p.kitchenPrinter?.method || '-'),
      'kitA=' + (p.kitchenPrinter?.address ? 'y' : '-'), 'ws=' + (p.workstations || []).map(w => (w.billPrinter?.method || '-') + (w.billPrinter?.autoPrint ? '+auto' : '')).join('|'),
      'st=' + st.length + '/' + st.filter(s => !s.address).length + 'empty', 'fmt=' + (p.printFormat || '-')].join('\t'));
  }
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
```
- 배포 전 결과로 Fable 이 한 번 더 본다: **`kitM` 이 `-` 가 아니고 `mode` 와 다른 매장 수**(= M3 수정으로 «지금 쓰던 방식이 유지되는» 매장) · **`ws` 에 `+auto` 가 하나도 없는데 워크스테이션 ≥2 인 매장 수**(= M4 안내가 필요한 매장). 숫자만 — 매장 설정은 건드리지 않는다.

---

## 5. 인수 체크리스트 (구현자 · 실브라우저 · 데모 38 · `[as=restaurant store=38]`)
주소 `https://dev.purplehere.com/restaurant/38/settings?tab=printer`

- [ ] PC: 기기 줄이 글 한 줄(회색 상자 없음) · 연결 방식 세그먼트 1줄 · Wi-Fi 고르면 기종 세그먼트 1줄 + 식별 한 줄 · std 9단계 / epson·star·other 7단계 / LAN 7 / USB 5 · 단계 안 **테두리 상자 0**(S7) · 번호 원은 큰 배지만.
- [ ] ⑥ 도우미 단계 안에 [Windows 설치 파일 받기][macOS][연결 확인][프린터 찾기] + 상태 한 줄. «연결 확인» 결과가 평문 ✓/✗ 줄. 카드 아래쪽에 QZ 상자·QZ 설명 문단 **없음**.
- [ ] EspTouch ① 버튼 2개(App Store · APK) 새 탭 · Play 버튼 없음 · ③ 본문 첫 줄 굵게 «먼저: 폰을 2.4 GHz…» · ③④ «안 될 때 ▸» 펼침 = 왼쪽 선 + 평문.
- [ ] «추천 기종» 접힘 **없음**. USB 고르면 기종 줄 대신 «새로 사신다면…» 한 줄. 접힘은 «2대» (+ pc-browser «브라우저 인쇄») 글 링크만, 테두리 없음.
- [ ] Windows 앱 흉내: 등록 단계 A/B 문구가 «네트워크 프린터(IP 입력)…»/«드롭다운에 바로 보임» (M1) · 도우미 단계 = [프린터 다시 읽기] + 상태 · 녹색 띠 없음.
- [ ] 안드로이드 앱 흉내: wifi+std 9단계(«— N단계» 참조가 준비 상자에서 맞게) · wifi+epson 6단계 · 둘째 카드에 연결 방식 고르기 **없음** · 녹색 띠 없음 · «안 될 때 ▸» 글 링크 · 준비 상자는 그대로 1개.
- [ ] §2: 워크스테이션 자동인쇄 토글 아래 힌트 한 줄(M4, 4언어) · 스테이션 Test 빈 주소 → 빨간 상태 글(M6) · 2대 l5 새 문구(M5).
- [ ] M3: 모양 (c) 를 심고 새로고침 → §2 주방 연결 방식 select 가 **qztray** 로 보이고, 저장 1회 뒤에도 GET 의 `kitchenPrinter.method` = qztray (S2·S4).
- [ ] ko/zh/ms 전환 — 새 키 전부 번역(키 이름 노출 0) · `i18n:verify` 0.
- [ ] 스크린샷 6장(PC Wi-Fi std 전체 · PC Wi-Fi epson · PC USB · Win 앱 · 안드로이드 앱 wifi std · 안드로이드 브라우저) + S2 표(모양 3 × A≡B) + S7 숫자 + S8 은 «Irene 할 일» 이 아니라 **보고 «확인할 곳» 아래 «운영 비교용 명령»** 으로만 붙인다(배포는 이 방이 묻지 않는다 — 배포 방·정기 점검이 S8 을 실행).

**구현 순서(빌드 1회):** ① AndroidPrinterSetup 데이터 함수화 + Seg/StepList/TextFold/ModelPicker(PrinterSetupGuide) ② SettingsPage §1 재조립(QzHelperRow 슬롯 · 띠/상자/accordion 삭제) + M1·M3·M4·M5·M6 ③ 로케일 4언어 ④ `check-printer-guide.js` 를 S2·S3·S4·S7 포함으로 확장(같은 파일) ⑤ 빌드 1회 → `verify-all --full` 1회 → 체크리스트 → Fable 에 스크린샷 6장 + 숫자 넘김(UX 점검 + 게이트 판정 1회로 묶음).

---

## 6. Fable 호출 기준 대입
- 이 문서 = 설계 1회(`ux`+`verify` 묶음). 구현 뒤 **검증 1회**(완성 화면 UX 점검 + S2 반증 포함 숫자 판정) — 한 사안 2회 한도 안.
- 🔒 보호파일 무접촉(읽기만) · 돈·보안 경계·마이그 없음 → `gate` 비대상. M3 는 저장 payload 가 아니라 **불러오기 두 줄** — `check-sensitive-diff` 가 비대상으로 나오면 그대로, 대상으로 잡으면 그 판정을 들고 온다(우회 금지).

---

## 7. Irene 가 정할 것

**7-1. (이월) 화면의 추천 기종 이름을 «Xprinter XP-T80B» 로 적을까요, 모델명 확정 전까지 «PurpleHere 표준 프린터(80 mm · USB + Wi-Fi 2.4 GHz)» 로만 적을까요?**
- 사실: 셀프테스트 종이에 모델명 없음 · 리포 문서의 XP-T80B 가 같은 기기인지 미확인. 틀린 이름이 화면에 박히면 매장이 다른 기기를 사 온다(되돌리기 어려운 쪽).
- **Fable 권고:** 모델명 없이 구현한다(키 `setupGuide.std.model` 비움). Irene 가 프린터 바닥 라벨을 알려 주면 그 키 하나만 채운다. 구현은 답을 기다리지 않는다.

그 밖(M3 수정 포함 여부 · 추천 기종 상자 삭제 · 상자 없는 틀)은 되돌리기 쉬운 설계 결정이라 Fable 이 정했다 — 위 본문대로.

---

## 9. Fable 검증 판정 (2026-11-08 20:40 · 구현 뒤 1회 — 이 사안의 2번째이자 마지막 Fable 호출)

읽은 것: 구현자 결과 `check-printer-b.result.txt`(51/4) · `git diff`(SettingsPage 4 hunk 전부 · printerGuideKit/PrinterSetupGuide/AndroidPrinterSetup 스타일·저장 사용처 grep) · 스크린샷 4장(b-A-pc-wifi-std · b-A-pc-usb · b-C-win-app · b-B-android-std) · billPrint/poller 읽기(채워진 기본값을 읽는 쪽이 어떻게 해석하는지) · dev DB `restaurants` 컬럼명.

### 9-1. 판정: **조건부 통과** — 아래 9-3 두 가지를 넣고 빌드 1회 → `verify-all --full` 1회 → 숫자가 기준대로면 그대로 완료(Fable 재호출 없음).

**통과 근거(사실):**
- 화면: §1 카드 안 테두리+배경 컨테이너 0(기기 5종, 안드로이드 앱은 준비 상자 1) · 번호 체계 1개 · 목록 폭 760 · 고르기 두 줄(세그먼트) · QZ 상자 3개 → ⑥ 버튼 줄 + 상태 한 줄 · 접힘은 글 링크만. 스크린샷 4장이 §2 틀과 일치. **UX 점검 통과.**
- 설계와 다른 점 4가지 모두 수용: ① 공용 틀을 `printerGuideKit.tsx` 에 둔 것(순환 import 회피 — 더 낫다) ② 안드로이드 Wi-Fi+표준 **8단계가 맞다** — 설계 §2-4 B 의 PLAN 목록이 8개이고 체크리스트의 «9» 는 내 셈 오류 ③ helper 를 JSX prop 으로 넘긴 것(핸들러 글자 그대로 이동 확인) ④ M3 반증을 PUT 가로채기로 한 것(= 고치기 전 코드가 보내던 본문과 동일 — 반증으로 유효).
- 매칭: M1(Windows 앱 문구 = `NativePrinterSelect` 옵션 글자) · M3(로드 2줄, 서버 값 있을 때만 — `?` 분기 확인) · M4(워크스테이션 ≥2 일 때만 힌트 — 폴러 조건과 같음) · M5 · M6(두 Test 버튼) · M7 — diff 에서 확인. **저장 payload 블록(2416–2430)·자물쇠·AutoSaveField·스테이션 시드 effect 는 diff 에 없음(무변경).**
- 안전: S3 쓰기 0(기기 6종 · 모양 b/c) · S4 표시=저장값 3모양 · M3 (c) 유지 + 반증 잡힘 · 38 원본 바이트 복원 · 새 키 4개는 안내 파일 2개에서만 읽고 쓴다(S5).

**S2 «바이트 동일» 실패 3건의 해석 — 결함이 아니라 검사 기준이 너무 셌다:**
저장 때 채워지는 `printPerItem:false · mirrorToBillPrinter:false · printCancellationTicket:true · consolidatedOrderTicket 기본 · emergencyMode:false · station copies:1` 은 전부 **읽는 쪽이 «없음» 과 같은 값으로 해석**한다(billPrint: `|| false` · `if (settings.emergencyMode)` · `copies || 1` · printCancellationTicket 게이트는 삭제돼 아예 안 읽음 4633/4706). 이 채움은 이 커밋 전부터 있던 `handleSave` 동작(운영 6.06 동일)이고 이 배포가 바꾼 것이 아니다. → **S2 는 «읽는 쪽 동치 기본값 화이트리스트를 뺀 뒤 동일» 로 기준을 고쳐 다시 센다**(9-3 ②).
**단 하나 진짜 동작 차이 = `receiptSettings`:** 매장 JSON 에 `receiptSettings` 가 없으면 아무 저장 1회에 화면 기본값(`copiesAfterPayment:2`)이 들어가고, 읽는 쪽(POSTerminal 2869–2871 · LiveOrders 1790 · FloorPlan 1618)은 없을 때 1장 → 저장 뒤 2장. 2026-05-26 부터 있던 동작(Irene 가 «F&B 표준 2장» 으로 정한 기본값) · 운영에도 동일 · 이 배포 무관. 영향 조건 = «receiptSettings 없음 ∧ 워크스테이션 결제 후 자동인쇄 ON ∧ RA 가 설정에서 무엇이든 저장». dev 6매장 중 해당 0.

### 9-2. 결정
- **receiptSettings(1장→2장): 이번에 고치지 않는다.** 이유: ① 이 배포가 만든 것이 아니고 5개월 넘게 운영에 있던 동작 ② «없을 때 1장» 을 보존하려면 저장 payload 에 «DB 에서 왔거나 사용자가 만진 경우만 포함» 추적을 영수증 입력 6곳에 심어야 해 범위가 커진다 ③ 기본값 2 자체는 Irene 결정. 대신 **S8 에 «receiptSettings 없음 ∧ ws +auto» 매장 수를 센다** → 운영에서 0 이면 끝. **0 이 아니면 Irene 결정으로 올린다**(아래 §10).
- **스테이션 시드 경합: 이번에 고친다(1줄 + deps).** `SettingsPage.tsx` 1785 effect 머리에 `if (printerSettingsLoading || printerSettingsError) return;` 를 **`stationSeedDoneRef` 검사보다 앞에** 넣고 deps 에 `printerSettingsLoading, printerSettingsError` 추가. 효과: 프린터 설정이 다 오기 전엔 시드하지 않으므로 «printer_settings 없는 PUT» 이 사라지고, 로드 뒤 정말 빠진 스테이션만 시드한다(2026-06-17 의도 그대로). 쓰기는 **줄어들기만** 한다(새 쓰기 0). 반증: 가드를 빼고 38 을 5번 열면 ≥1 PUT, 넣고 5번 열면 0.
- **USB ④ «자동 인쇄» 본문 중복(스크린샷 b-A-pc-usb):** `pc.autoBody` 끝 문장(«With 2 or more POS devices only ONE prints…»)과 그 아래 M4 문장이 같은 말 두 번. `pc.autoBody` 에서 그 문장을 빼고 M4 문장 한 줄만 남긴다(4언어). 글자만.
- **Fable 게이트 마커: 찍지 않는다.** 지문이 작업트리 전체(다른 방 ea9976b2 의 청구서·구독 미커밋 포함)를 덮는데 그 파일들은 내가 보지 않았다 — 마커를 찍으면 검증 안 한 변경이 게이트를 통과한다. 이 일은 `check-sensitive-diff` 기준으로도 UI·로드 2줄·효과 가드 1줄이라 비대상이다. 구현자는 완료 때 `touch .claude/.fable-gate-skip` 로 넘기고 skip 로그 사유에 «printer-guide-b: Fable 판정 §9 통과 · 대상 파일은 다른 방 ea9976b2 미커밋(청구서·구독) — 그 방이 자기 게이트를 받는다» 를 남긴다. 그 방 파일은 이 커밋에 **넣지 않는다**(파일 지정 커밋).

### 9-3. 남은 일 (구현자 · 빌드 1회)
① 시드 가드 1줄 + deps · USB autoBody 중복 제거(4언어) · 필요하면 `i18n:verify`.
② `check-printer-b.js` S2 를 **화이트리스트 비교**로: 비교 전 양쪽 JSON 을 정규화 — `kitchenPrinter.{printPerItem:false, mirrorToBillPrinter:false, printCancellationTicket:true}` · `consolidatedOrderTicket` 이 `{enabled:false,method:'qztray',address:'',autoPrint:false}` 와 같으면 제거 · `emergencyMode:false`·`emergencyEnabledAt:null` 제거 · 모든 station `copies:1` 제거 · `receiptSettings` 는 **별도 줄로 보고**(있었나/생겼나). 정규화 뒤 A ≡ B 세 모양 모두 = 통과. 반증은 기존 것(method 뺀 PUT) 유지.
③ S3 모양 (a) 5회 열기 → PUT/POST 0(가드 뒤) · 가드 뺀 반증 1회(≥1) 는 **빌드 없이** 못 하므로 생략하고, 대신 코드 줄을 보고에 그대로 적는다(확인 못 함 아님 — 실행 순서상 자명하지만 «반증 생략» 이라고 쓴다).
④ 빌드 1회 → `verify-all --full` 1회 → print-guard 8/8 · design-guard 신규 0 · sensitive-diff 비대상 · jest settings-guard · health print — 숫자 그대로 보고.
⑤ 보고 «확인할 곳»: `https://dev.purplehere.com/restaurant/38/settings?tab=printer — §1 상자 없는 안내(Wi-Fi·표준 9단계 / USB 5단계 / «내 프린터» 줄) · §2 워크스테이션 힌트는 자리 2개일 때만 [as=restaurant store=38]` + 스크린샷 경로. 운영 반영: 다음 배포 때(이 방은 묻지 않는다). **S8 은 배포 방·정기 점검이 실행**한다 — 보고 끝에 «운영 비교용 명령» 으로만 붙인다.

### 9-4. S8 고친 판 (읽기 전용 · `updatedAt` · receiptSettings 집계 추가)
운영: `scp ps-fp.js irene@87.106.78.146:/tmp/ && ssh irene@87.106.78.146 'cd /var/www/production-backend && timeout 60 node /tmp/ps-fp.js > /tmp/ps-fp-$(date +%F-%H%M).txt && tail -3 /tmp/ps-fp-*.txt'` — 배포 전 1회 → 배포 뒤 1회 → `diff` 로 `sha` 가 바뀐 줄만 본다(그 매장의 `updatedAt` 이 배포 뒤 RA 저장 시각이면 정상).
```js
// 읽기 전용 — 운영 printer_settings 행별 지문 + 모양 집계. 쓰기 0. 끝에 process.exit.
require('/var/www/production-backend/node_modules/dotenv').config({ path: '/var/www/production-backend/.env' });
const { sequelize } = require('/var/www/production-backend/config/database');
(async () => {
  const [rows] = await sequelize.query("SELECT id, name, is_demo, updatedAt, SHA2(printer_settings,256) sha, printer_settings ps FROM restaurants WHERE printer_settings IS NOT NULL AND printer_settings<>'' ORDER BY id");
  let m3 = 0, noAuto2 = 0, rcpt = 0;
  for (const r of rows) {
    let p = {}; try { p = JSON.parse(r.ps); } catch {}
    const ws = p.workstations || []; const st = Object.values(p.kitchenStationPrinters || {});
    const wsAuto = ws.some(w => w.billPrinter && w.billPrinter.autoPrint);
    const kitM = (p.kitchenPrinter && p.kitchenPrinter.method) || '-';
    if (kitM !== '-' && kitM !== p.printerMode && st.length === 0) m3++;          // M3 수정으로 «고른 방식이 유지되는» 매장
    if (ws.length >= 2 && !wsAuto) noAuto2++;                                      // POS≥2 인데 자동인쇄 켜진 자리 0 → 아무도 주방 안 찍음(M4 안내 대상)
    if (!p.receiptSettings && wsAuto) rcpt++;                                      // receiptSettings 없음 ∧ 결제후 자동인쇄 ON → 저장 1회 뒤 1장→2장
    console.log([r.id, JSON.stringify(r.name), r.is_demo, r.updatedAt && new Date(r.updatedAt).toISOString(), r.sha,
      'mode=' + p.printerMode, 'billM=' + ((p.billPrinter && p.billPrinter.method) || '-'), 'kitM=' + kitM,
      'kitA=' + (p.kitchenPrinter && p.kitchenPrinter.address ? 'y' : '-'),
      'ws=' + ws.map(w => ((w.billPrinter && w.billPrinter.method) || '-') + (w.billPrinter && w.billPrinter.autoPrint ? '+auto' : '')).join('|'),
      'st=' + st.length + '/' + st.filter(s => !s.address).length + 'empty', 'fmt=' + (p.printFormat || '-'), 'rcpt=' + (p.receiptSettings ? 'y' : '-')].join('\t'));
  }
  console.log('# rows=' + rows.length + ' m3_keep=' + m3 + ' pos2_noAuto=' + noAuto2 + ' rcpt_missing_autoOn=' + rcpt);
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
```

## 10. Irene 가 정할 것 (갱신)
- §7-1(추천 기종 모델명) 그대로 이월 — 구현은 기다리지 않음.
- **(조건부 · S8 결과가 `rcpt_missing_autoOn > 0` 일 때만) 결제 후 영수증 자동인쇄를 쓰는데 영수증 설정을 한 번도 저장한 적 없는 매장은 지금 1장이 나오고, 관리자가 설정에서 무엇이든 저장하면 2장이 됩니다 — 그대로 둘까요(기본 2장 = 2026-05-26 결정), 아니면 «없으면 1장» 을 보존하도록 고칠까요?** Fable 권고: 그 매장 수가 1~2 면 **그대로 두고** 해당 매장에 «영수증 2장 기본» 을 알리는 쪽(표준 유지). 많으면 보존 수정(저장 payload 에 «DB 에서 온 경우/만진 경우만 포함»)을 별건으로. 0 이면 묻지 않는다.
