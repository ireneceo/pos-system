# Fable 게이트 판정 — 앱 브릿지 늦은 주입 수정 + 도움말 «앱 다운로드» (2026-10-04, 5.76)

> 선행 판정: `.claude/fable-verdict-20261004-android-update-gate.md` (SW 5.75 + APK 0.3.1, 운영 배포 #4).
> Irene 원문(배포 #4 뒤, 순서대로): 「업데이트 배너 안뜨는데? 그리고 변함 없어.」 → 「자, 지금 단말기 문제부터 해결해야 해」 → 「여전히 아이피 안잡아. 업데이트도 안돼. 뭘 하는 거야? 그리고 앱에서 버전 안보여. 안드로이드앱이야. 좌측 도움말 하위메뉴에 다운로드도 다시 넣어줘. 기종에 맞게 다운되게」
> 판정 세션: Fable(리더). 팀원(Opus) 제출물을 diff·가드·e2e·고장주입·운영 서빙 실측으로 직접 재대조했다.

---

## 0. 결론 — **PASS. 마커 찍음. 배포 가능(Irene 의 `/배포` 는 이미 있음).**

- 배포 #4 뒤 Irene 가 본 세 가지(배너 안 뜸 · 변함 없음 · 버전 안 보임)는 **결함 하나**로 전부 설명된다: 웹이 앱 브릿지(`__PURPLE_DESKTOP`/`__NATIVE_PRINT`)를 **첫 렌더에서 한 번만 읽는데**, 앱은 브릿지를 **페이지가 다 열린 뒤**(`MainActivity.onPageLoaded` → `evaluateJavascript`) 끼워 넣는다. React 는 그 전에 이미 그려졌고 다시 그리지 않는다 → 배지 0 · 업데이트 훅 `inApp=false` 고정 → 카드 0 → 설치 못 함 → «변함 없음». 5.74 의 단말기 설정 화면은 같은 결함을 이미 고쳤지만(0.5초×20 재확인) 배지·업데이트 훅에는 그 수정이 없었다 — **선행 판정 §7 의 «로그인 화면에 카드가 뜬다» 전제가 틀렸던 것**이고, 그건 내 판정의 빈틈이다(브릿지 내용은 실측했으나 주입 *시점*은 보지 않았다).
- 이번 수정은 그 결함을 배지·훅 두 곳에 같은 패턴(상태 + 재확인)으로 닫고, Irene 요청 2건(도움말 › 앱 다운로드 · 앱 안에서 안내문서 열기)을 더한 것. 절단면 밖 변경 0.

## 1. diff 범위 대조

| 파일 | 변경 | 판정 |
|---|---|---|
| `components/Common/NativeVersionBadge.tsx` (신규) | 상태 + 0.5초×30 재확인, 비동기 version 까지 대기 · 스타일은 옛 인라인과 동일 | 일치 |
| `App.tsx` | 인라인 배지 블록(5줄) → `<NativeVersionBadge />` 1줄 + import | 일치 — Router 안·인증 밖(로그인 화면에도 뜸) |
| `hooks/useNativeAppUpdate.ts` | `inApp` 을 상태로, 0.5초×20 재확인 · `check` 효과는 `[inApp, check]` 그대로 → 뒤늦게 true 가 되면 그때 피드 읽음 · `readCurrent` 가 version 을 500ms×10 기다리므로 0.3.1 에서 «available» 오탐 없음 | 일치 |
| `utils/nativeAppUpdate.ts` | `appDownloadTarget()` 추가만 — 안드로이드 앱→`http://host/desktop/PurplePOS.apk` 핸드오프 / 다른 앱→`/download` / 안드로이드 브라우저→APK 별칭 / Windows 브라우저→Setup.exe 별칭 / 그 밖→`/download`. 버전 리터럴 0(check-desktop-feed 통과) | 일치 |
| `MainLayout.tsx` 🔒 | import 2(lucide `Download`, `appDownloadTarget`) · `openGuides`/`openDownload` 2함수 · 레일 버튼 1 · 펼침 버튼 1 · Guides onClick 2곳을 `openGuides` 로. **인쇄·폴러·QZ·`_printPollFn` 접촉 0** (diff 전체를 내가 읽음) | 일치 |
| locales ×4 | `nav.download` en/ko/zh/ms 4개 실측 | 일치 |
| `e2e/native-app-update.spec.js` | 늦은 주입(2초 뒤 브릿지, 3초 뒤 version) → 배지 «app v0.2.0» + 카드 | 일치 |
| `sw.js` | 5.76-app-bridge-late-download-20261004 · build 산출물 동일 | 일치 |
| `print-guard.manifest.json` | MainLayout 지문 갱신(--bless) | 수용 — 단 **bless 는 게이트 PASS 뒤가 순서**다. 내용은 정당하나 다음부터는 판정 뒤에 찍을 것 |
| `releases/2026-10-04-app-bridge-late-download.json` | 배포 기록 | 수용 |

작업트리 = 위 13건만. 선행 판정의 0-a 승계 파일들은 a100da88d 에 커밋돼 사라졌다.

## 2. 내 재실행·실측

| 항목 | 결과 |
|---|---|
| e2e `native-app-update.spec.js` | **5/5** 19.8s (늦은 주입 포함) |
| **고장주입(내가 추가)** — 같은 테스트의 주입 지연을 2초→**20초**(재확인 창 10/15초 밖)로 바꾼 임시 spec | **실패** (`text=app v0.2.0` 없음) → 이 테스트는 «재확인이 늦은 브릿지를 잡았다» 에만 의존하고, App 의 우연한 재렌더로 통과하는 것이 아님을 증명. 임시 spec 삭제 확인(0개) |
| 팀원이 못 한 «수정 전 번들 반증»(빌드 2회·22분) | **생략 수용** — 수정 전 번들의 실패는 운영 5.75 에서 Irene 가 본 현상 그 자체이고, 위 고장주입이 테스트의 비공허성을 대신 증명한다 |
| 가드 | print-guard **8/8 변동 0**(bless 뒤) · check-desktop-feed 통과 · design-guard 신규 0(299/295 baseline) · sensitive-diff ① MainLayout 1건 = 이 판정으로 소화 |
| 운영 서빙(배포 #4 결과) | `android-latest.json` application/json 0.3.1/vc4 sha `290d12ff…` · `PurplePOS.apk` 별칭 sha **동일** 3215823B octet-stream · `http://purplehere.com/desktop/PurplePOS.apk` 301→https · sw 5.75 → **앱 쪽 재료는 운영에 다 있다. 막힌 건 웹의 브릿지 읽기 하나** |
| 브릿지 주입 시점 | `MainActivity.java:34-44` `addWebViewListener.onPageLoaded` → asset `nativePrintBridge.js` evaluate. `__PURPLE_DESKTOP` 동기(22행), `version` 은 `diagnostics()` 뒤 비동기(72-75행) |
| `verify-all --full 24/24`·mount sweep 684s·type baseline 0 | 팀원 보고 — 번들 지문 같아 재실행 안 함(빌드 1회 규칙) |

## 3. 팀원 결정 판정
- 배지 15초 / 훅 10초 **상한** — 수용. 단 **잔여 위험**: 느린 첫 로드에서 `onPageLoaded` 가 React 마운트보다 10초 넘게 늦으면 그 세션은 다시 놓친다(앱 재시작 때까지). 5.76 배포 뒤 Irene 가 **그래도** 배지·카드를 못 보면 원인 재조사가 아니라 **상한 제거(찾을 때까지 1초 간격)** 가 다음 수정이다.
- 앱 안 Guides 를 `navigate('/docs')` 로 — 수용(WebView 는 `_blank` 못 연다). `/docs` 는 App 라우트(558행) 안이라 쉘 안에서 열림.
- Windows 앱 안 «앱 다운로드» → `/download` 페이지 — 수용(electron-updater 가 자가 갱신, 수동 exe 유도 안 함 = App.tsx 주석 원칙과 일치).

## 4. 단말기(아이피 안 잡힘) 진단 — 판정

**사실:** 운영·개발 `terminal_transactions` 에 태블릿 echo 0건. echo 는 `CardTerminalSettings` 가 **(a) `__NATIVE_ECR` 브릿지를 찾았고 (b) 카드단말기 토글이 켜져 있을 때만** 자동으로 1번, 또는 «찾기» 버튼(브릿지 있을 때만 보임)으로 보낸다. `__NATIVE_ECR` 은 **0.3.0 부터**(NativeEcr 플러그인) 존재한다.

**판정:** 태블릿은 **0.2.0 일 가능성이 압도적**이다. 근거 — 카드가 안 떠서(위 결함) 설치할 길이 없었고, Irene 가 Chrome 수동 설치를 했다는 말이 없다. 0.2.0 이면 **시점 문제가 아니라 플러그인 자체가 없어** 단말기는 어떤 수정으로도 안 된다 → **0.3.1 설치가 유일한 선결 조건**이고, 5.76 이 그 길(카드 + 도움말 › 앱 다운로드)을 연다.

**Irene 에게 물을 것 — 한 가지만(설정 › 앱 메뉴 안 봐도 됨):** 5.76 배포 뒤 앱을 **완전히 닫고 다시 열어** ①왼쪽 위 보라색 `app v…` 숫자 ②우하단 업데이트 카드가 뜨는지.

**분기:**
- `app v0.2.0` + 카드 뜸 → 「업데이트」(Chrome 열림 → 다운로드 → 열기 → 처음 1회 «이 출처 허용» → 설치) **또는** 좌측 도움말 › 앱 다운로드(같은 길). 설치 뒤 재실행 → `app v0.3.1` → 설정 › 프린터 › Android 카드 «앱 버전 0.3.1 · 최신 0.3.1 ✓» → 설정 › 결제 › 카드단말기 **토글 ON**(꺼져 있으면 자동 확인이 안 돈다) → 자동 찾기.
- `app v0.3.1` 인데 아이피 안 잡힘 → 앱은 문제 아님. 순서대로: ①카드단말기 토글 ON 인지 ②화면에 «찾기» 버튼이 보이는지(보임=브릿지 OK) ③운영 `terminal_transactions` 에 echo 행이 **생겼는지** — 생겼으면 웹·앱은 끝까지 갔고 남은 건 네트워크·단말기(태블릿과 단말기 같은 Wi-Fi, 단말기 ECR/포트 33898 활성, AP 클라이언트 격리) · 0건이면 브릿지 쪽(설정 › 프린터 › Android 진단의 플러그인 목록 확인).
- `app v…` 자체가 안 뜸(5.76 에서도) → §3 상한 제거가 다음 수정. 추측 금지, 그 한 가지.

## 5. 배포 조건
1. 마이그 0 · 프론트만(SW 5.76) · 네이티브 산출물 변경 없음(0.3.1 그대로).
2. 배포 뒤 확인: 운영 `sw.js` = 5.76 · 피드/APK 는 이미 맞음(§2) → 변동 없어야 함.
3. 마커 뒤 저장소 수정 금지(session-state.md 예외). 판정문 커밋은 배포 묶음에.

## 6. 한계(정직)
- http 스킴 핸드오프가 외부 Chrome 으로 나가는 것(F3)·설치 시트·권한 화면은 **여전히 실기기 미검증** — 이번 Irene 태블릿이 첫 실측(선행 판정 §8 과 동일).
- 재확인 상한(10/15초)은 실기기 로드 시간을 재지 않고 정한 값이다(§3).
- 선행 판정이 주입 시점을 보지 않아 배포 #4 가 헛돌았다 — 다음 네이티브·브릿지 판정에서는 **«브릿지가 언제 들어오는가»** 를 실측 항목으로 넣는다.
