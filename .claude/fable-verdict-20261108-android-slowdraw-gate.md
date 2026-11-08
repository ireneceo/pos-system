# Fable 완료 검증(gate) 판정 — 안드로이드 0.4.2 1단계(enableSlowWholeDocumentDraw 삭제 + 렌더 뷰 보강 2개) · 웹 InboxDrawer (2026-11-08)

> 판정자: Fable(리더). 요청: Opus 팀원(사실 전달). 설계 기준: `/var/www/.claude/fable-design-20261108-android-slowdraw.md`.
> 내가 직접 읽음·실행: `git diff` MainActivity.java·OffscreenHtmlRenderer.kt·build.gradle · `check-print-guard`(지금 실행 8/8) · 정적 grep(소스 호출 0건, 주석 2건만) · `run-v3.js`/`build-release.sh` 의 fail-closed 검사 줄 · `v3b-34-{1,2,3}.log`·`v3b-36.log`·`v4b-34.log` · `.v3-logcat-*.txt` 8개(실패판 4 + 통과판 4)의 render ok/retry/blank/tile 집계 · `emu4.log` · `git status` · `fable-gate.js status` · `ANDROID_APP_DESIGN.md §7-2·§10`.
> 코드·운영 무변경. 마커: **아직 안 찍음 — §4 순서대로 남은 기계 단계 뒤에 찍는다**(지문 때문).

---

## 0. 결론

**판정: PASS(조건부 — 조건은 전부 기계 단계, 판단 사항 없음).** 설계 범위 안이고, 설계 이탈 1건은 **내 식의 오류**를 팀원이 실측으로 바로잡은 것이라 받아들인다. 게이트 수치는 기준을 넘되 두 곳이 경계에 있다(§2) — 그 뜻을 아래에 적고 Irene 종이 확인 항목에 반영한다.

## 1. 설계 범위 대조

| 파일 | 설계 | 실제 | 판정 |
|---|---|---|---|
| `MainActivity.java` | 1줄 삭제 + 금지 주석 | 그대로(주석 3줄, 호출 0) | ✅ |
| `OffscreenHtmlRenderer.kt` | ⓐ `padH=max(h,root.height)` 붙임 ⓑ `drawOnce` 재그리기 최대 3회/120ms/visual state 2초 대체 · 머리 규칙 정정 · 비트맵 = 내용 높이 | 그대로. **비트맵 높이 식만 이탈**: 설계 `min(view.height, max(h, contentHeight×scale))` → 실제 `min(laidOut, h)` | ✅ **이탈 정당** — 붙인 뒤 `contentHeight` 가 키운 뷰 높이(1432/1600)로 늘어난다(body 가 뷰포트를 채움). 내 식은 그걸 몰랐다. 실패판 logcat 이 증명: `render blank after 3 draws ink=0.0010 576x1432`(141px 티켓이 1432px 종이로 → 잉크 묽어져 오판) 16건. 고친 식은 11-02 A-3 판과 같은 높이(붙이기 전 측정 h)를 쓴다 |
| `NativePrintPlugin.kt` | 무변경 | 무변경 | ✅ |
| `build.gradle` | 0.4.2 / 10 | 그대로 | ✅ |
| `run-v3.js`·`v3.json` | V3-2f(6장) · 정적 grep · 재시도 집계 · tile 집계 | 2f 6장(40/76/148/256/616/1264px) · V3-R(3번째 그리기 정상 티켓 0) · V3-H(높이 ±5%) · grep 앞머리 · logcat 저장 | ✅ (V3-R 은 설계의 «≤10% + 3번째 0» 중 뒤쪽만 기계화 — 비율은 로그로 내가 셈, §2) |
| `build-release.sh` | 정적 grep fail-closed | 있음(주석 줄 제외 정규식) · 반증: 주입 파일 잡음 | ✅ |
| `ANDROID_APP_DESIGN.md` | §7-2 ② 정정 · §10 0.4.1 «제출 안 함 → 0.4.2» · 0.4.2 행 | 있음. 0.4.2 행은 «정식 AAB 는 게이트 통과 뒤» 상태 | ✅ (sha 채움은 §4) |
| 웹 | `InboxDrawer.tsx` 1줄 · `sw.js` | 그대로(6.15). §4 허용 확장(최대 3파일) 안 씀 | ✅ |
| 🔒 8파일·hybrid·PrinterRegistry·nativePrintBridge | 0줄 | print-guard 8/8(내가 지금 실행) · git status 에 없음 | ✅ |
| 커밋 범위 | 이 묶음만 | 작업 트리의 GTM(`tracking.ts`·`index.html`·`MARKETING_TRACKING.md`·gtm json)·`playwright.config.js`·`oneoff-*`·`run-*.sh` 는 다른 방 — **커밋에 넣지 않는다** | 조건 |

## 2. 검증 충분성

| 항목 | 기준 | 결과 | 판정 |
|---|---|---|---|
| V3 API 34 연속 3회 + 36 1회 | 전부 PASS | 20/20 ×4 (2b 6.7% · 2c 4.8/5.7/5.1 · 2d BLANK_RENDER·래스터 4 · 2e 3734px 19.9%/끝25% 19.5% · 2f 6장 ok 13.0~16.3% 폭 576 · V3-H 0건) | ✅ |
| 재시도 비율 | ≤ 10% · 3번째 0 | logcat 4회: retry 3/4/3/3 중 2d 몫 2씩 → 정상 티켓 1/2/1/1 = **5/52 = 9.6%**, 전부 2번째에서 ok, 3번째 0 | ✅ **경계**. 재시도 난 것은 전부 첫 그리기 `ink=0.0000`(타일이 아예 없던 순간) → 2번째에 들어옴 = 설계 ⓑ 가 겨눈 «타이밍» 유형 그대로. 예산(ⓐ) 유형이면 재시도해도 비었을 것. swiftshader 에뮬은 래스터가 실기기보다 느려 비관적 조건. 실기기에서는 비율이 낮을 것으로 보되 **단정하지 않는다** → Irene 항목 11 |
| tile 경고 | 기록 | 회차당 26(렌더 14) ≈ 1.9/렌더 — 11-02 (13/6 렌더 ≈ 2.2) 와 같은 비율 | 기록 |
| V4 | 6/6 | 6/6 (V4-2 8.2% · V4-6 10.1%) | ✅ |
| 성능 | without ±15% · POS ≤3.0 · p50 ≤120 · 지연 ≤10 | 스크롤 p50 new 80/95/93/81 vs without 82/87/85/83 ✓ · POS 열기 1.4/3.0 vs 1.4/2.4 ✓(3.0 경계) · 지연 new 최대 11 vs without 최대 10(한 칸 초과) · 대시보드 열기 6.0/5.3 vs 3.6/1.8(**±15% 벗어남**) 그러나 Floor Plan 은 반대로 new 1.2 vs without 2.4 | ✅ **받아들임, 이유 명시**: 새 APK 와 `without-slowdraw` 는 **정적으로 같은 WebView 설정**이고 렌더러 코드는 이 측정 중 한 번도 돌지 않는다(인쇄 0). 따라서 둘의 차이는 구조상 소음이고, 양방향으로 흔들린 것이 그 증거. 판단에 쓰는 지표(스크롤 p50 — with-slowdraw 가 141~174 로 갈렸던 것)는 80~95 로 «없음» 쪽에 있다. 화면 열기 시간은 이 하니스에서 설치 직후 캐시·네트워크를 포함해 소음이 커서 다음부터 **같은 화면을 2회 열고 2번째만** 쓰도록 emu.js 를 고친다(이번 판정엔 영향 없음) |
| 정적 검사 | 0건 · 반증 | 소스 호출 0 · 주석 2 · 주입 파일 잡음 | ✅ |
| 웹 | 빌드 1회 · verify-all --full · CPU 전/후 · 기능 | CPU live-orders 13040→963ms · dashboard 10878→610ms(≈ 93~94% 감소) · 서랍 닫힘 반짝임 0·열기/닫기/다시 열기 정상·pageerror 0 · 23/24(실패 1 = deploy-ready 의 sw 6.14≠6.15 — 배포 준비 기록 파일, 이 일과 무관·다음 배포 준비가 새로 씀) · mount sweep 크래시 0 | ✅ 고장주입 생략(«전/후 수치가 반증», 빌드 1회 규칙) 받아들임 |
| check-sensitive-diff | 실행·기록 | 운영 스냅샷 대비 ②③⑤ 전부 다른 방 커밋분 — 이 묶음 파일은 목록 밖. 이 일의 게이트 사유는 설계 §3 «인쇄 파이프라인(네이티브)» 자체 | ✅ |
| 반증 체계 | 같은 판정식에서 실패 기록 | **실패판 4회**(내 높이 식) 가 같은 판정식으로 2c 3/3 BLANK·V4-2 1.2%·V3-H 불일치를 잡았고, 고친 판 4회 0건 — 검사기가 «항상 같은 답» 이 아님 증명 | ✅ |
| 확인 못 함 | — | 종이 · 화면 비침 · 실기기 재시도 비율 · 0.3.4 체감 대비 → Irene 항목 | 사실대로 |

**판정 기계 의심(규율 3):** V3-R 이 «3번째까지=1(2d 포함)» 로 2d 를 세고 있어 2d 가 실제로 3번 그려 BLANK 로 끝남을 보여 준다(루프 종료 증명). V3-H 는 실패판에서 `[[1432,141],…]` 를 잡았으니 살아 있는 검사다.

## 3. 받아들이되 적어 두는 것
- `fable-gate.js status` 에 **skip 파일 «있음»** 이 보인다(다른 방 것으로 보임). 이 묶음은 skip 으로 넘기지 않는다 — §4 순서대로 마커를 받는다.
- 운영 기기 UA 읽기는 허락 창에서 멈췄고 `print_device_status` 엔 UA 칸이 없다 → **우회하지 않는다.** 운영 nginx 로그를 뒤지는 Irene 터미널 작업을 만들 가치보다 설계 §7 질문 한 문장이 싸다 → 보고에 질문으로.
- emu.js 화면 열기 측정 소음(§2) — 다음 측정 전 고친다. 이번 판정과 무관.

## 4. 남은 순서 (전부 기계 단계 · 이 순서대로)

1. `dev-frontend-build/dev-apps/PurplePOS-0.4.1.aab`·`.apk` 삭제(어디에도 없는 판으로). git 밖(ignored) — 지문 무관.
2. 정식 빌드 `build-release.sh`(0.4.2 / code 10) → EXIT 0 · 서명 b55813cf… 동일 · AAB sha256 기록. 정적 grep 이 이 안에서 한 번 더 돈다.
3. `ANDROID_APP_DESIGN.md §10` 0.4.2 행에 AAB sha256·«게이트 PASS(이 판정문)» 채움. `.claude/session-state.md` 갱신.
4. **그 뒤 Fable 에 한 줄 전달**(sha256 · `git status --short` 결과) → 내가 **마커 찍음** `node dev-backend/scripts/fable-gate.js pass --note "…"`. 3번의 문서 변경이 지문을 바꾸므로 **3 뒤에만** 찍는다 — 먼저 찍으면 마커가 죽는다.
5. `/개발완료` 커밋 — §1 «커밋 범위» 목록만(다른 방 미커밋 제외). 마이그 0 · SW 6.15.
6. Irene 할 일 카드(Play 앱 만들기) 를 같은 tid 로 다시 올림 — 올릴 AAB = `dev-apps/PurplePOS-0.4.2.aab`, steps 4줄 이하.
7. 보고 «확인할 곳»(카드 아님): 11-02 판정 §5-A 9항목 + **10.** 인쇄 전·중·후 화면 전환(POS Terminal·Live Orders 스크롤)이 0.3.4 와 같거나 빠르다 + **11.** 연속 6장(주문 6건 또는 재발행 6회) 모두 나오고 **한 장도 늦게 나오지 않는다**(한 장이 유독 1~2초 늦으면 그 사실만 적어 보내기 — 실기기 재시도 비율의 간접 측정). 피드(`/desktop/PurplePOS.apk`) 는 종이 ✓ 전 금지(11-02 판정 §6 그대로, 대상 0.4.2).
8. 보고 마지막 질문 1개(설계 §7): **느린 태블릿의 기종과 Android 버전, 설정 › 앱 › «Android System WebView» 의 버전을 알려 줄 수 있을까요?** — Fable 권고: 이 셋이 있어야 «앱이 느린가 / WebView 가 낡았는가 / 기기가 느린가» 를 가르고 다음 설계(일반 성능)가 추측 없이 시작된다. 보고 첫 줄은 ✅(이 묶음은 끝) + 질문은 «답 기다림» 이 아니라 다음 일의 입력으로.

— Fable, 2026-11-08. 재판정은 §4-4 한 줄 읽기로 끝낸다.
