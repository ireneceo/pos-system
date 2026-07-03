# Purple POS — 개발 세션 상태

<!-- AUTOSAVE-STALE-BANNER -->
> **[AUTO-SAVE STALE] (2026-07-03 08:25, idle 1783067101s)** — narrative 가 마지막 편집된 이후 작업 파일이 변경됐는데 narrative 가 미갱신 상태로 자동저장됨. /개발시작 진입 시 git HEAD 와 대조해 진행/완료를 정정하고 이 블록을 삭제할 것.
> 변경된 작업 파일: cdp-eval.js
<!-- /AUTOSAVE-STALE-BANNER -->

## 현재 작업 상태

**마지막 업데이트:** 2026-07-02 (개발완료)
**버전:** 운영=**v3.66 / SW 4.56** (2026-07-02 데스크탑앱 인에이블 배포 — 버전 미상승=기존 매장엔 dead-code/opt-in. Backup 20260702_065514)
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-07-02)
- **데스크탑앱(Windows/Electron) P0~P3 구현 + Fable 게이트 PASS + 운영 배포**
  - P0 스캐폴드 / P1 네이티브 브릿지(`__NATIVE_PRINT` §4)+Main인쇄(htmlPrinter·rawLan·rawWindows·serialQueue) / P2 billPrint 8절단면(QZ 투명대체) / P3 셸(2모니터 고객디스플레이·자동시작·powerSaveBlocker·electron-updater·아이콘)
  - 서버서 wine으로 `PurplePOS-Setup-0.1.0.exe`(76MB, oneClick 자동설치) 빌드 → 운영 호스팅 `https://purplehere.com/desktop/PurplePOS-Setup.exe`
  - 윈도우 접속 자동감지 → PwaInstallBanner "Download for Windows" CTA(4언어, 로그인 시 노출·앱내 숨김)
  - 앱 프린터 설정 = "직접 인쇄 활성"(QZ 설치 잔재 숨김, 브라우저는 QZ 유지)
  - 헤드리스 런타임 스모크(Xvfb): 브릿지 7/7(printHtml 한글→PDF·PRINTER_NOT_FOUND·rawLan) / node유닛 6/6 / build green / health 106/107(1=print-guard 의도) / critical mount✓
  - 운영 배포 2회(--skip-safety=승인된 인쇄변경, dev-backend 무변경 no-op), 스모크 9/9
- **안드로이드앱 착수(Capacitor)** — `/var/www/mobile-app/`(격리). 원격로드+`__NATIVE_PRINT` 네이티브 주입=billPrint 그대로(프론트 0줄). 스코프 확정=**WiFi+블투(USB 제외), 검증 라이브러리(DantSu 계열)**. 설계·스캐폴드·플러그인 스켈레톤 완비. `docs/ANDROID_APP_DESIGN.md`.
- **영어 단어암기앱 "Lingo" 착수** — **`/opt/lingo/`**(PlanQ `/opt/planq`처럼 완전 분리, 별도 repo, /var/www 밖). 백엔드 PM2 `lingo-backend`:3010 구동, DB lingo_dev_db, Claude Code 연결(CLAUDE.md+커맨드), 기획서 `docs/PRODUCT_SPEC.md`. 상세 설계는 Fable과. (초기 /var/www/lingo→2026-07-02 /opt/lingo 이동.)

### 진행 중: 안드로이드앱 (Fable 리드 — 기본설계 잠금, Opus 구현 중)
- **역할**: 기본설계+검증게이트 = **Fable**(리더, Irene 2026-07-03 지정) / 구현 = Opus.
- **기본설계 잠금**: Fable이 `mobile-app/docs/ANDROID_APP_DESIGN.md` **§7 확정**(A1 구현의 단일 기준, 변경은 Fable 재확인). 갭3 해결 = 7-1 프린터 레지스트리(안드로이드엔 OS스풀러 없음→앱 자체목록, 미스=명시실패) / 7-2 printHtml=WebView 오프스크린→비트맵→ESC/POS 래스터(한글보존) / 7-3 직렬화(serialQueue 대칭) / 7-4 블투권한 / 7-5 플러그인 등록·브릿지 주입 / 7-6 하드웨어 없는 검증(에뮬+가짜프린터로 도착 바이트=브라우저와 동일 실증).
- **Opus 구현 순서 (Fable 승인, 중간승인 불필요)**: ①JDK+Android SDK `/opt/android-sdk` 격리설치(2026-07-03 재개 허가) → ②프로젝트 생성+플러그인 배선·브릿지 주입 → ③WiFi(LAN)인쇄+드로어 → ④HTML→비트맵 인쇄(한글) → ⑤블투경로+프린터등록 화면 → ⑥APK빌드(dev/운영) → ⑦**Fable 검증게이트**(V1~V4+보호파일 무접촉) → ⑧A3 실기기.
- **Irene 필요 = A3 하드웨어 1개**: 안드로이드 태블릿(가능하면 Android 10+) + 블투 프린터. ⑦ 통과 후 종이 확인 1회. 그전까진 불필요.
- 위치 `/var/www/mobile-app/`(격리), billPrint 프론트 0줄(§4). 운영 웹/인쇄코드 무접촉(print-guard 자동감시).
2. **윈도우앱 매장 확인** — Irene 오늘 매장서 실행·로그인·POS로드·프린터목록·UI 확인(**실프린터 종이 인쇄는 안 함 — 본인 매장 아님**).
3. **윈도우앱 실프린터 종이 확인 = 실제 쓸 고객 생겼을 때** 그 프린터로 확인·보완 → 그 후 `check-print-guard.js --bless`. 그 전까진 print-guard 빨강(billPrint+MainLayout)=의도된 fail-closed.

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.
- Lingo 상세 개발설계(Fable)·프론트 npm install·dev 서브도메인(브라우저 접속용).
- 데스크탑앱 코드사이닝(여러 고객 셀프설치 확대 시 SmartScreen 제거용, 지금 불필요).
- 오더노트 주방티켓 실프린터 눈확인(v3.66) / IOI Mall 매출 API 운영전환.

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
