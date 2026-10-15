# 안드로이드 앱 Google Play 정식 등록·심사 — 설계 (Fable, 2026-10-12)

> Irene 원문: **«안드로이드앱 정식으로 등록하고 심사 진행하자.»**
> 본 문서 = 구현 단일 기준. 설계와 다른 판단이 필요해지면 즉시 중단하고 Fable 재확인.
> 🔒 인쇄 보호파일 8개 **무접촉**(MainLayout 포함 — 아래 §5 가 MainLayout 을 피해 가도록 짜여 있다). 접촉 파일은 §4·§5 절단면이 전부.
> 이 문서는 `mobile-app/docs/ANDROID_APP_DESIGN.md §8-7` 의 «Play 스토어는 안 간다» 결정을 **Irene 지시로 뒤집는다** — 구현 때 그 절에 «2026-10-12 Play 등록으로 대체, 이 문서 참조» 한 줄을 단다.

---

## 0. 한 줄 결론

**Capacitor 8 로 올려(targetSdk 36 = Play 제출의 필수조건) 자가 업데이트(설치 권한)를 걷어낸 단일 빌드 하나를 만들고, 기존 서명키를 Play App Signing 에 올려 PlanQ 가 쓰는 조직 개발자 계정에 «Purple POS» 로 등록한다.**
사이드로드 APK 는 같은 빌드의 산출물로 남기되(Play 없는 기기용) 앱 안 업데이트 안내는 «어디서 설치됐는가» 로 갈린다 — Play 설치본은 Play 로, 사이드로드본은 지금 있는 브라우저 넘김(B 경로)으로. 웹은 로그인 화면에서 앱 안 «회원가입» 길을 닫고 계정 삭제 요청 페이지 하나를 더한다.

---

## 1. 실측 사실 (Opus 보고 + Fable 재확인)

| # | 사실 | 출처 |
|---|---|---|
| F1 | 앱 `com.purplehere.pos.mobile` · versionName 0.3.4 / versionCode 7 · Capacitor 6.2.1 · AGP 8.2.1 · Gradle 8.2.1 · compile/target 34 · minSdk 22 · Kotlin 1.9.22 · 네이티브 .so 없음(DantSu 는 순수 Java) | build.gradle · variables.gradle · 의존성 |
| F2 | **Play 는 targetSdk 36 이 이미 의무다** — 2026-08-31 부터 새 앱·업데이트 전부. 연장 신청은 11-01 까지지만 36 으로 가면 무의미 | developer.android.com/google/play/requirements/target-sdk |
| F3 | **Capacitor 는 버전마다 targetSdk 가 고정** — 6.x=34 · 7.x=35 · 8.x=36. «Capacitor Android 는 커스텀 targetSdk 를 지원하지 않는다. 숫자만 올리면 그 버전에서 안 나는 문제가 난다» | capacitorjs.com/docs/android/setting-target-sdk |
| F4 | Capacitor 8 요건: compile/target 36 · **minSdk 24** · AGP 8.13.0 · Gradle 8.14.3 · Kotlin 2.2.20 · **Node ≥ 22**(CLI) · JDK 17 이상(21 권장) · 매니페스트 configChanges 에 `density` 추가 · `adjustMarginsForEdgeToEdge` 설정 삭제됨(8.x 는 System Bars 코어 플러그인 + CSS 변수 `--safe-area-inset-*`, 8.4.0+ 는 `insetsHandling:'disable'` 존중) | capacitorjs.com/docs/updating/8-0 · capawesome edge-to-edge 가이드 |
| F5 | 서버 툴체인: JDK 17 · Node **20.20**(22 없음, nvm 없음) · SDK platforms 34·36 · build-tools 34/35 · cmdline-tools 있음 · 메모리 7.9GB(에뮬 4.5GB RSS, 가용 3GB 미만이면 하니스가 기동 거부) | 실측 |
| F6 | **Android 16(targetSdk 36) 은 edge-to-edge 를 못 끈다** — `windowOptOutEdgeToEdgeEnforcement` 가 36 대상 앱에서 비활성. 즉 WebView 가 상태바·내비바 밑까지 깔린다. Capacitor 의 CSS 변수 방식은 **원격 페이지(dev-frontend)가 패딩을 넣어야** 먹는다 — 그 자리는 MainLayout(🔒) | Android 16 behavior changes · F4 |
| F7 | 현재 매니페스트에 `REQUEST_INSTALL_PACKAGES` + `NativeUpdatePlugin`(10-04 A 경로). Play 정책: 이 권한은 «앱의 핵심 목적이 패키지 설치» 일 때만, 선언 양식 필수, FAQ 가 «Play 업데이트 외 방법으로 자가 업데이트하는 앱» 을 명시적으로 막음 → **Play 빌드에 남기면 거부·계정 제재 사유** | support.google.com/googleplay/android-developer/answer/12085295 |
| F8 | 웹 `useNativeAppUpdate.install()`: `__NATIVE_UPDATE` 있으면 A(네이티브 설치), 없으면 **B(시스템 브라우저로 APK 다운로드 넘김)**. `appDownloadTarget()` 도 앱 안이면 APK 핸드오프. **플러그인만 빼면 Play 설치본이 APK 를 받으러 브라우저로 나간다** = 정책 위반 표면 | useNativeAppUpdate.ts:79-95 · nativeAppUpdate.ts:103-106 |
| F9 | 로그인 화면 `/pos` 에 «Sign up → /signup» 링크 + «Back to Home → /»(랜딩에 가입 CTA). **앱 안에서 계정 생성 가능** → Play 는 앱 내 삭제 경로 + 웹 삭제 URL 요구. 자기 계정 삭제 API 0건(`users.js:1041` «본인 삭제 불가»). `/account-deletion` 은 SPA NotFound(200 은 폴백) | LoginPage.tsx:673-680 · users.js · App.tsx |
| F10 | 개인정보처리방침 `purplehere.com/privacy` 200, «삭제 요청 가능, 법적 의무 범위 내» 문장 있음(line 300) | PrivacyPolicyPage.tsx |
| F11 | 로그인 화면에 데모 계정 카드(비밀번호 없이 `/api/auth/demo-login`, is_demo 게이트) — 운영에도 공개 → 심사자 접근 경로로 쓸 수 있다. 데모 매장은 자정(GMT+8) 초기화 | LoginPage.tsx:11-45, 737 |
| F12 | PlanQ: 조직 개발자 계정 `6744981296049524067`(표시명 PlanQ) · Play App Signing(업로드 키는 Codemagic 생성) · App Links 는 **구글 앱 서명 키 지문**으로 · Draft 만 저장하면 아무 일도 안 일어난 사고(3일) · 백업 잠금 단언 게이트 | /opt/planq/docs/ANDROID_PLAY_RUNBOOK.md |
| F13 | 서명키 `/opt/secrets/purplepos-release.keystore`(alias purplepos, SHA-256 `b55813cf…1eb8`), 0.2.0~0.3.4 전부 같은 키. `build-release.sh` 가 지문 fail-closed. 운영 실사용 매장 0(07-27, 재측정 안 함) | 실측 · 메모리 |
| F14 | 디버그 앱 `.dev` 는 App Link(dev 주소만) · 정식 앱은 링크 안 받음(§9 결정) — 이번 일과 무관, 유지 | debug/AndroidManifest.xml |
| F15 | `android:allowBackup="true"` (Capacitor 기본값). 앱 데이터(WebView localStorage = 토큰·프린터 설정)가 Google 백업 대상 | AndroidManifest.xml |

---

## 2. 결정 (판단이 갈리는 지점)

| # | 결정 | 이유 |
|---|---|---|
| **D1 서명** | **기존 키스토어를 Play App Signing 의 «앱 서명 키» 로 올린다(PEPK 내보내기). 업로드 키 = 같은 키(별도 생성 안 함).** | 같은 키라야 ① 사이드로드 설치본이 Play 버전으로 **삭제 없이** 올라간다(Play 가 같은 서명·높은 versionCode 를 «업데이트» 로 본다) ② 같은 빌드의 사이드로드 APK 와 Play 배포본이 서로 덮어쓴다(D3 의 전제). 구글 생성 키면 두 갈래가 영영 못 섞인다. 별도 업로드 키는 비밀 하나 더 — 키스토어가 이미 `/opt/secrets` + 일일 백업이라 YAGNI. |
| **D2 개발자 계정** | **PlanQ 조직 계정에 올린다.** 개발자 표시명은 Irene 결정(§10 Q1) — Fable 권고는 회사(법인) 이름으로 바꾸기. | 새 계정 = $25 + 조직 검증(D-U-N-S, 수 일~수 주) + 같은 법인이 두 계정 = 관리 분산. 한 법인 한 계정에 여러 앱이 표준. 표시명은 계정 설정에서 바꿀 수 있고 PlanQ 등록정보에도 같이 적용된다(앱 이름은 그대로). |
| **D3 채널** | **빌드는 하나**(flavor 없음). 산출물 둘: AAB(Play) + APK(사이드로드, `/desktop/` 피드 그대로). **설치 권한·`NativeUpdatePlugin` 은 삭제.** 앱 안 업데이트 안내는 **설치 출처**로 갈린다: `installer == com.android.vending` → «Google Play 에서 업데이트»(스토어 열기) / 그 외 → 지금 있는 B 경로(브라우저 넘김, 코드 0줄 변경). | F7 로 A 경로는 Play 에 못 싣는다. flavor 두 벌(play/sideload)은 산출물·검증 2배 + 같은 versionCode 두 바이너리. 사이드로드가 필요한 기기(GMS 없는 POS 단말)는 B 경로가 이미 작동하는 길이고(0.2.0→0.3.1 설계 D5), 같은 키라 삭제 없이 덮어쓴다. Play 설치본은 Play 자동 업데이트(항상 전원+WiFi 인 POS 태블릿 = 배경 자동)가 «다른 고객들은 어떻게 하나» 의 정답이다. **10-04 A 경로(설치 시트)를 되돌리는 결정** — §10 Q3 로 Irene 컨펌. |
| **D4 targetSdk 36 경로** | **Capacitor 6 → 7 → 8 (`npx cap migrate` 두 번) + 수동 보정.** 숫자만 올리기 금지(F3). minSdk 24 수용(= 설계 D4 «Android 7+» 과 일치). Node 22 는 전역 설치 없이 `mobile-app/.toolchain/`(git-ignore) 에 받아 빌드 스크립트 PATH 에서만 쓴다(`/opt/android-sdk` 격리와 같은 원칙). JDK 17 로 먼저 시도(AGP 8.13 최소 = 17), 실패하면 JDK 21 설치는 sudo → «Irene 할 일». | F3·F4. 플러그인이 코어뿐이라 마이그 범위가 작다. |
| **D5 edge-to-edge** | **네이티브에서 끝낸다 — 웹 0줄.** `MainActivity` 가 WebView 에 시스템바 inset 만큼 패딩을 넣고(`ViewCompat.setOnApplyWindowInsetsListener`), 상태바 아이콘은 어두운 색(`isAppearanceLightStatusBars=true`), 배경 흰색. `capacitor.config.ts` `android.insetsHandling:'disable'`(8.4+) 로 Capacitor 의 CSS 변수 처리는 끈다(이중 처리 방지). | F6: CSS 변수 방식은 원격 페이지 수정 = MainLayout(🔒) 접촉. 지금 보이는 모양(상태바 아래부터 화면) 그대로가 목표이지 새 UI 가 아니다. 전체화면(immersive)은 범위 밖. |
| **D6 가입·삭제** | **앱 안에서는 계정을 못 만들게 한다** + **계정 삭제 요청 페이지 `/account-deletion`(공개, 4언어)** 를 만들어 Data safety 삭제 URL 로 쓴다. 앱 내 계정 삭제 기능은 **이번에 안 만든다**(별건 설계 — 레스토랑 주인 계정 삭제 = 매장·주문·청구 데이터 보존 규칙이 얽힌 `design`+`gate` 사안). | Play 규칙은 «앱이 계정 생성을 허용하면» 앱 내 삭제 의무. POS 태블릿 앱은 매장 직원이 로그인하는 곳이지 가입하는 곳이 아니다 — 가입은 웹(브라우저)에서(PlanQ 의 «네이티브에서 결제 표면 봉쇄» 와 같은 결). 삭제 요청 URL 은 가입 여부와 무관하게 Data safety 가 묻고, 개인정보처리방침의 «삭제 요청 가능» 과도 맞아야 한다. |
| **D7 버전** | **0.4.0 / versionCode 8.** 이후 규칙은 §8-7 그대로(네이티브 변경마다 +1). Play 는 versionCode 단조 증가 — 같은 규칙. | minSdk·툴체인·배포 채널이 바뀌는 릴리즈라 patch 가 아니라 minor. |
| **D8 백업** | `android:allowBackup="false"`. | F15: 토큰·프린터 설정이 담긴 WebView 데이터를 Google 백업에 싣지 않는다. 기능 영향 0, PlanQ 가 같은 잠금을 게이트로 둔다. |
| **D9 등록정보** | 앱 이름 **«Purple POS»**(설치된 앱 이름과 동일), 카테고리 Business, 기본 언어 en-US 하나로 시작, 국가 말레이시아부터. 스크린샷은 데모 매장(38)에서 Playwright 로. 광고 없음·광고 ID 미사용·금융기능 해당 없음(§7 참조)·정부앱 아님·건강 아님. | 한 번에 통과가 목표 — 언어·국가는 등록 뒤 언제든 추가. |
| **D10 트랙 순서** | **내부 테스트 → 프로덕션.** 내부 테스트에서 Irene 태블릿의 사이드로드 0.3.4 가 Play 로 **삭제 없이** 올라가는지(D1 증명) + 인쇄 1회를 보고 프로덕션 제출. | 조직 계정이라 테스터 수·기간 조건 없음. 심사 전 실기기 확인이 유일한 BT·종이 검증 자리. |

**기각한 대안**
- flavor `play`/`sideload` 두 벌 유지(A 경로 보존): 위 D3. 사용자 0 인 채널의 편의를 위해 산출물·게이트를 두 배로 만들지 않는다.
- Play In-App Updates API(`com.google.android.play:app-update`): 정석이긴 하나 의존성·네이티브 코드 추가. POS 태블릿은 Play 자동 업데이트로 충분, 카드는 안내만. 필요해지면 후속.
- Capacitor 7(targetSdk 35) 에서 멈추기: 이미 36 의무(F2). 7 은 경유만.
- 앱 내 계정 삭제 기능: D6. 다음 사안으로 분리(«Irene 할 일» 아님, 설계 1회 필요).

---

## 3. 산출물·채널 모델

```
mobile-app (소스 하나, versionCode N)
 ├─ bundleRelease  → PurplePOS-x.y.z.aab  → Irene 이 Play Console 업로드 (dev-apps/ 에 두고 내려받음, 운영엔 안 감)
 └─ assembleRelease → PurplePOS-x.y.z.apk + PurplePOS.apk + android-latest.json → /desktop/ (사이드로드, 기존 피드·게이트 그대로)
                     둘 다 /opt/secrets 키 서명 = Play 가 재서명해도 같은 키(D1) → 서로 덮어쓴다
```
- 웹의 «새 버전» 카드: 피드(`android-latest.json`) 와 앱 버전 비교는 그대로. **버튼 동작만** 설치 출처로 갈린다(D3).
- 피드 운영 반영은 **Play 프로덕션이 게시된 뒤** `/배포` 로(카드가 «Play 에서 업데이트» 라고 했는데 Play 에 아직 없는 상황 방지 — §9 순서).

---

## 4. 네이티브 절단면 (mobile-app/) — 이 목록 밖 변경 = 반려

| 파일 | 변경 |
|---|---|
| `package.json` / `package-lock.json` | `@capacitor/core`·`android`·`cli` 8.x 최신(≥ 8.4.0). TypeScript 그대로 |
| `android/variables.gradle` | Capacitor 8 값 전부(F4 표: minSdk 24 · compile/target 36 · androidx 버전들 · cordovaAndroidVersion 14.0.1) |
| `android/build.gradle` | AGP 8.13.0 · google-services 4.4.4 · Kotlin 2.2.20 |
| `android/gradle/wrapper/gradle-wrapper.properties` | 8.14.3 |
| `android/app/build.gradle` | `namespace = ` 등 `=` 문법 · versionCode 8 / versionName "0.4.0" · kotlin-stdlib 2.2.20 · 그 외 그대로(signingConfig·debug 접미) |
| `android/app/src/main/AndroidManifest.xml` | `REQUEST_INSTALL_PACKAGES` 줄·주석 **삭제** · `configChanges` 에 `density` 추가 · `allowBackup="false"` |
| `android/app/src/main/java/.../NativeUpdatePlugin.kt` | **삭제** |
| `android/app/src/main/java/.../MainActivity.java` | `registerPlugin(NativeUpdatePlugin.class)` 삭제 · D5 inset 패딩 블록 추가(super.onCreate 뒤) · 나머지(브릿지 주입·KEEP_SCREEN_ON·openAppLink) 무변경 |
| `android/app/src/main/java/.../NativePrintPlugin.kt` | diagnostics 에 `installer` 1키 추가: `packageManager.getInstallSourceInfo(packageName).installingPackageName`(API 30+) / `getInstallerPackageName`(이하) → 문자열 또는 null. **인쇄 경로 0줄 변경** |
| `src/nativePrintBridge.js` | `__NATIVE_UPDATE` 블록 삭제 · diagnostics `.then` 에서 `__NATIVE_PRINT.installer = d.installer ?? null` 1줄 |
| `capacitor.config.ts` | `android.insetsHandling: 'disable'`(D5) · 나머지 그대로 |
| `scripts/build-release.sh` | §6 |
| `.gitignore`(mobile-app) | `.toolchain/` |
| `docs/ANDROID_APP_DESIGN.md` | §8-7 «Play 안 간다» 에 대체 표시 1줄 + **§10 Play 릴리즈 기록 표**(버전·code·커밋·날짜·트랙·심사 상태) 신설 — PlanQ 교훈 «어느 커밋의 AAB 인지 남긴다» |
| `README.md` | 릴리즈 절에 AAB·Play 순서 |
| `store/`(신규, git) | 아이콘 512 · 피처 1024×500 · 스크린샷 · `listing.en.md`(이름·짧은/긴 설명·릴리즈 노트) · `data-safety.md`(§7 초안) · `app-access.md`(심사자 안내문) |

**무접촉:** `NativeEcrPlugin.kt` · `PrinterRegistry.kt` · `OffscreenHtmlRenderer.kt` · `src/debug/AndroidManifest.xml` · `applinks/` · `scripts/verify/*`(하니스는 돌리기만, 수정 필요 시 보고).

**D5 구현 메모(MainActivity):**
```java
// super.onCreate(...) 뒤
WebView wv = getBridge().getWebView();
wv.setBackgroundColor(0xFFFFFFFF);
ViewCompat.setOnApplyWindowInsetsListener(wv, (v, insets) -> {
    Insets sb = insets.getInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.ime());
    v.setPadding(sb.left, sb.top, sb.right, sb.bottom);
    return WindowInsetsCompat.CONSUMED;
});
WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView()).setAppearanceLightStatusBars(true);
```
- API 34 이하(edge-to-edge 미강제)에서 inset 이 0 으로 오는지 / 중복 패딩이 없는지는 **§7-2 에서 두 API 모두 스크린샷으로 판정**(코드 예측 금지). 키보드(ime) 포함은 로그인 입력창이 키보드에 가리지 않게 — 현재 동작과 같은지 같이 본다.

---

## 5. 웹 절단면 (dev-frontend/) — 🔒 8개 무접촉, MainLayout 무접촉

| 파일 | 변경 |
|---|---|
| `src/hooks/useNativeShell.ts`(신규) | `useIsNativeShell()`: `__PURPLE_DESKTOP` 유무를 0.5초×20회 재확인하는 상태 훅(useNativeAppUpdate 의 inApp 폴링을 여기로 옮김 — 두 벌 금지) |
| `src/hooks/useNativeAppUpdate.ts` | inApp 폴링 → `useIsNativeShell()` · `install()` 첫 분기: `__NATIVE_PRINT.installer === 'com.android.vending'` → `status='store'` + `window.location.assign(PLAY_URL)` (다른 host → Capacitor 가 외부로 넘김 → Play 앱이 받는다). 그 다음 기존 A(`__NATIVE_UPDATE`)·B 분기 **그대로**(0.3.x 사이드로드본이 쓴다) |
| `src/utils/nativeAppUpdate.ts` | `PLAY_STORE_URL` 상수(`https://play.google.com/store/apps/details?id=com.purplehere.pos.mobile`) · `installedFromPlay()` · `appDownloadTarget()`: 앱 안 + Play 설치본 → `{kind:'page', href: PLAY_STORE_URL}`(사이드로드본은 기존 handoff 그대로). 피드 `minSdk` 는 읽지 않으므로 무변경 |
| `src/components/Common/NativeAppUpdateBanner.tsx` | `status==='store'` 문구: «Google Play 가 열립니다. '업데이트' 를 눌러 주세요.» + 버튼 «Play 열기». 나머지 상태 무변경 |
| `src/pages/Login/LoginPage.tsx` | `useIsNativeShell()` 이 true 면 «Don't have an account? Sign up» 줄과 «Back to Home» 링크 **렌더 안 함**(Windows 앱도 같은 규칙 — 가입은 브라우저에서). 데모 카드·비밀번호 찾기·PIN 그대로 |
| `src/pages/Landing/AccountDeletionPage.tsx`(신규) + `App.tsx` 라우트 `/account-deletion`(공개, Privacy 와 같은 static import·레이아웃) | 내용: 누가(계정 소유자) · 어떻게(지원 이메일 — 개인정보처리방침의 연락처와 같은 주소 — 로 계정 이메일·요청 문장) · 무엇이 지워지나(프로필 개인정보·로그인) · 무엇이 남나(매장 거래·청구 기록 — 법·세무 보존, 방침 line 300 과 같은 표현) · 처리 기한(30일) · 앱 삭제만으로는 계정이 안 지워진다는 안내 |
| `src/pages/Landing/PrivacyPolicyPage.tsx` | 삭제 문단(line 300 근처)에 `/account-deletion` 링크 1개 |
| `public/locales/{en,ko,zh,ms}/common.json` · `landing.json` | `nativeUpdate.store*` · `accountDeletionPage.*` · (LoginPage 는 기존 키 재사용) |
| `src/utils/__tests__/nativeAppUpdate.test.ts` | `installedFromPlay`·`appDownloadTarget` Play 분기 케이스 |
| `e2e/native-app-update.spec.js` | `__NATIVE_PRINT.installer='com.android.vending'` 주입 → 카드 버튼이 Play URL 로 이동(네비게이션 가로채 URL 단언) · 사이드로드(installer null) → 기존 B · `__PURPLE_DESKTOP` 주입 상태에서 `/pos`·`/forgot-password` 에 `/signup`·`/` 앵커 0 |
| `public/sw.js` | 버전 bump — 프론트 변경이 다 끝난 **맨 마지막** |

**무접촉:** `App.tsx` 의 기존 배지·배너 마운트, `PwaInstallContext/Banner`, `DownloadPage`(Play 배지 추가는 §9 3단계 — 스토어 URL 200 뒤 별도 작은 묶음), `MainLayout.tsx`(도움말›다운로드는 `appDownloadTarget()` 의 반환값만 바뀐다 — 호출부 수정 없음), `printDiagnostics.ts`.

---

## 6. 빌드 스크립트·게이트 (`scripts/build-release.sh`)

변경·추가(기존 지문 검사·피드 생성·`check-desktop-feed.js` 는 그대로):
1. `export PATH=$ROOT/.toolchain/node22/bin:$PATH`(없으면 fail: «Node 22 없음 — §4 D4»).
2. `./gradlew bundleRelease assembleRelease -x lint*`.
3. **Play 사전검사(fail-closed, aapt2 = build-tools 36)** — APK 와 AAB(bundletool 없이: AAB 안 `base/manifest/AndroidManifest.xml` 은 protobuf 라 aapt2 로 못 읽는다 → **APK 로 판정**하고 AAB 는 같은 빌드라는 전제 + `jarsigner -verify` 서명 확인):
   - `aapt2 dump badging` → `targetSdkVersion:'36'` · `sdkVersion:'24'` · `versionCode='8'` · `package: name='com.purplehere.pos.mobile'`
   - `aapt2 dump permissions` → `REQUEST_INSTALL_PACKAGES` **0건** · `BLUETOOTH_CONNECT` 1건
   - `aapt2 dump xmltree --file AndroidManifest.xml` 에 `allowBackup=false`(PlanQ 백업 잠금 단언과 같은 자리 — 빌드가 만든 것을 본다)
4. `jarsigner -verify -verbose -certs app-release.aab` → 서명 있음 + 지문 `b55813cf…`(apksigner 는 AAB 를 못 읽는다).
5. AAB → `/var/www/dev-frontend-build/dev-apps/PurplePOS-$VN.aab` + sha256 출력(Irene 이 `https://dev.purplehere.com/dev-apps/PurplePOS-$VN.aab` 로 내려받는다. `dev-apps/` 는 운영에 안 간다 — 배포 스크립트 확인은 Opus 몫).
6. 피드 `minSdk` 24 로.
7. 마지막 줄에 `git rev-parse HEAD` 를 찍고 Opus 가 §4 릴리즈 기록 표에 적는다.

**고장주입 의무(검증규율 2조):** ① 매니페스트에 `REQUEST_INSTALL_PACKAGES` 를 임시로 되살려 빌드 → 3번이 막는지 ② `allowBackup` 을 true 로 → 막는지 ③ variables targetSdk 35 → 막는지. 원복 후 통과. (APK 빌드 1회가 길면 ①②③을 한 번에 넣어 한 빌드로 3건 실패를 보고, 원복 1빌드 — 빌드 2회.)

---

## 7. 검증 계획

### 7-1. 서버 (Opus)
| 항목 | 방법 | 기준 |
|---|---|---|
| 툴체인 | Node 22 격리 설치 · `sdkmanager "build-tools;36.0.0" "system-images;android-36;default;x86_64"`(AOSP, GMS 없음 — 하니스 교훈) · AVD `purplepos-ci-36` | 설치 완료, 전역 env 무변경 |
| 마이그 | `npx cap migrate`(7) → (8) → §4 수동 보정 → `git diff` 를 §4 표와 대조 | 절단면 밖 변경 0 |
| 빌드 | `build-release.sh` 1회 + §6 고장주입 | 전부 PASS, 지문 b55813cf |
| **V3 재실행(API 36)** | `scripts/verify/run-v3.js` 를 36 AVD 로 | **13/13**(인쇄 바이트 동일 — targetSdk 36·Capacitor 8 에서 인쇄 경로 무변경 증명) |
| V4-1/V4-2(API 36) | 브릿지 존재·7메서드·`available`·`__NATIVE_PRINT_SETUP`·`version==0.4.0`·`installer===null`(adb 설치) · `__NATIVE_UPDATE === undefined` | 전부 PASS |
| **edge-to-edge 스크린샷** | API 36 AVD + API 34 AVD(기존 `purplepos-ci`) 각각 `/pos` 로그인 화면 · 로그인 뒤 POS 화면 · 키보드 올라온 상태 | 36: 헤더가 상태바 밑에 안 깔림, 하단 버튼이 내비바에 안 가림 · 34: 지금(0.3.4)과 픽셀 차이 0(중복 패딩 없음) · 두 API 모두 console.error 0 |
| 뒤로가기(predictive back, 36 기본 ON) | 로그인 화면에서 Back → 앱이 꺼지는지 / POS 안에서 Back → 현재 동작과 동일한지 | 0.3.4 와 같은 동작(달라지면 보고, 임의 수정 금지) |
| BT 권한 대화상자(36) | Settings › 프린터 › Android 카드 «권한 요청» → 시스템 대화상자가 뜨는지(에뮬에 BT 어댑터 없어도 권한 UI 는 뜬다) | 뜸 + 거부 시 `BT_PERMISSION` 상태 표시 |
| 웹 | jest(게이트 밖, 직접) · e2e spec · `npm run i18n:verify` · `npm run build:dev` **1회** · `verify-all --full` **1회**(print-guard 8/8 변동 0 · design-guard 신규 0 · mount sweep) | 전부 통과 |
| 게이트 | `check-sensitive-diff.js` · `check-print-guard.js` | 보호파일 변동 0 |

### 7-2. 실기기 — Irene (내부 테스트 트랙, 1회)
사이드로드 0.3.4 가 깔린 태블릿에서:
1. Play 내부 테스트 링크 → 앱 페이지에 **«업데이트»** 로 보이는지(«설치» 가 아니라 — 같은 키 증명) → 업데이트 → 로그인 유지·프린터 설정 유지.
2. 상태바/하단바와 화면 겹침 없음(태블릿 Android 버전 기록).
3. 주방 티켓 1장(BT 또는 LAN, 매장 실프린터) + 빌 1장 — **종이 확인은 Irene 눈**.
4. Settings › 프린터 › Android 카드: 앱 버전 0.4.0 · 업데이트 카드 안 뜸(피드=0.3.4 < 0.4.0).
5. (가능하면) 카드단말기 자동 찾기 1회.
6. 로그인 화면에 «Sign up»·«Back to Home» 없음.

### 7-3. Play 심사 뒤 (Irene + Opus)
스토어 URL 200 → Opus §9 3단계(웹 Play 배지·피드 운영 반영) → `/배포` → 운영 태블릿 없음(실사용 0) 이라 추가 확인 없음.

---

## 8. Play Console — Irene 할 일 (순서대로 · 상황판 «Irene 할 일» 로 하나씩)

> Console 조작은 전부 Irene 만 가능. Opus 는 각 단계 **직전에** 필요한 파일·문구를 만들어 주소와 함께 올린다. 아래 «준비물» 이 Opus 산출물.

| # | Irene 가 하는 일 | 준비물(Opus) | 비고 |
|---|---|---|---|
| I1 | §10 결정 4가지 답(계정 표시명 · 서명 · 채널 · 가입/삭제) | 이 문서 | 답 전엔 I2 이하 진행 안 함 |
| I2 | Play Console(계정 6744981296049524067) → **앱 만들기**: 이름 `Purple POS` · 기본 언어 English (US) · 앱 · 무료 · 선언 체크 | — | |
| I3 | **서명키 올리기(첫 AAB 업로드 전)**: Test and release → 앱 무결성(App integrity) → App signing → «Use a different key» → «Export and upload a key from Java keystore» → PEPK 도구 다운로드 링크와 **암호화 키(hex)** 를 복사해 이 방에 붙여넣기 | Opus 가 받으면 서버에서 `java -jar pepk.jar --keystore=/opt/secrets/purplepos-release.keystore --alias=purplepos --output=… --include-cert --rsa-aes-encryption --encryption-key-hex=<hex>` 실행 → 결과 zip 을 `dev-apps/` 에 두고 주소 알림 → Irene 업로드 | PlanQ 런북 교훈: 서명 메뉴 위치가 바뀌었을 수 있음 — 주소로 간다. pepk.jar 는 Console 이 주는 링크에서(Opus 가 서버에서 받을 수 있으면 그대로) |
| I4 | **내부 테스트** 릴리즈: AAB 업로드(`https://dev.purplehere.com/dev-apps/PurplePOS-0.4.0.aab`) → 릴리즈 노트(en) → 테스터 목록에 본인 Google 계정 → **출시(Start rollout)** — 초안 저장만 하면 아무 일도 안 일어남(PlanQ 3일 사고) | `store/listing.en.md` 의 릴리즈 노트 | |
| I5 | §7-2 실기기 6항목 → 결과를 이 방에 | §7-2 체크리스트 | 실패 항목이 있으면 Opus 수정 → 0.4.1/code 9 → I4 반복 |
| I6 | **앱 콘텐츠**(App content) 전부: 개인정보처리방침 URL `https://purplehere.com/privacy` · **앱 액세스**(«일부 기능 제한» + 안내문) · 광고 없음 · 콘텐츠 등급 설문(Utility/Business → Everyone) · 타겟층 18+ · 뉴스 아님 · 코로나 아님 · **Data safety**(§7 초안대로, 삭제 URL `https://purplehere.com/account-deletion`) · 정부앱 아님 · 금융기능 «제공 안 함» · 건강 아님 · 광고 ID 미사용 | `store/app-access.md` · `store/data-safety.md` | 금융기능·Data safety 는 Irene 가 화면 문구를 읽고 최종 — §11 |
| I7 | **스토어 등록정보**: 이름·짧은 설명(80자)·긴 설명(4000자) · 아이콘 512 · 피처 그래픽 1024×500 · 폰 스크린샷 2장+ · 7인치·10인치 태블릿 각 4~6장(가로) · 카테고리 Business · 연락처 이메일·웹사이트(전화 비움) · 태그 | `store/` 전부 | 아이콘·피처는 각자 칸(섞으면 거부 — PlanQ 교훈) |
| I8 | **프로덕션** 릴리즈: 같은 AAB 승격(«Promote release») → 국가 Malaysia(+원하면 추가) → 검토 → **제출·출시 시작** | — | 심사 수 일. 거부 시 사유 원문을 이 방에 |
| I9 | 게시 확인: 스토어 URL 200 → 이 방에 «게시됨» | — | Opus §9 3단계 시작 신호 |

**계정 삭제 페이지·Data safety 초안 범위(§7 — Opus 가 `store/data-safety.md` 에 근거 줄과 함께 적는다):**
- 근거는 **코드에서** — 로그인(이메일·이름·전화 = 계정 관리, 필수) · 앱 활동(주문·메뉴 등 사용자 생성 콘텐츠) · 사진(메뉴 이미지, 선택) · 기기 식별자(`printDiagnostics.ts` 가 기기 ID 를 보내면 «기기 또는 기타 ID» 수집 — grep 으로 확정) · 메시지(앱 내 Inbox 있으면 «기타 앱 내 메시지») · 위치·연락처·건강·크래시로그 없음 · 전송 암호화 예(https) · 삭제 요청 가능(URL) · 제3자 공유: 코드에서 외부로 나가는 사용자 데이터가 있으면 그 항목만(결제 게이트웨이는 구독 결제 화면이 앱 안에서 보이는지부터 확인).
- 개인정보처리방침과 어긋나는 줄이 있으면 **방침 쪽을 고친다**(Data safety 가 방침보다 넓게 선언되면 거부 사유).

---

## 9. 롤아웃 순서

1. **Irene §10 답** → Opus 착수.
2. Opus §7-1 전부(코드 확정 → 빌드 1회 → 고장주입 → 에뮬 36/34 → 웹 빌드 1회·sweep 1회) → 완료 보고 → **Fable 게이트 판정 1회**(이 사안 2회째 = 마지막) → Irene 컨펌.
   - 이 묶음은 `gate` 대상: 공개 라우트 추가(`/account-deletion`) + 로그인 화면 변경 + 배포 채널 변경. 인쇄 보호파일 0줄이 조건.
3. I2~I5(내부 테스트) → I6~I8(제출) → I9(게시).
4. 게시 뒤 Opus 작은 묶음: `DownloadPage`·`PwaInstallContext` 에 «Get it on Google Play» 1순위 + APK 는 «Play 없는 기기» 2순위 · `android-latest.json`(0.4.0) 운영 반영 · `/배포`. (이 묶음은 Fable 안 씀 — 링크 교체.)
5. 메모리·문서: `reference_android_app_distribution` 에 Play 채널·D1·D3 반영, `ANDROID_APP_DESIGN.md §10` 릴리즈 기록.

**순서 금지 사항:** 피드(0.4.0)를 Play 게시 전에 운영에 올리지 않는다(§3). 내부 테스트 전에 프로덕션에 올리지 않는다(D10). Draft 저장으로 끝내지 않는다(F12).

---

## 10. Irene 가 정할 것 (각 선택지 + Fable 권고)

| | 선택지 | Fable 권고 |
|---|---|---|
| **Q1 계정·표시명** | (a) PlanQ 조직 계정에 올리고 개발자 표시명을 **회사 이름**으로 바꿈(PlanQ 등록정보도 «by 회사명» 이 됨) (b) 같은 계정, 표시명 «PlanQ» 유지 (c) PurpleHere 용 새 계정($25·조직 검증 수 주) | **(a).** 한 법인 한 계정이 표준이고 «Purple POS by PlanQ» 는 다른 제품 이름이 개발자로 보여 혼란. 회사 이름은 Irene 만 안다 — 답에 이름을 함께. |
| **Q2 서명** | (a) 기존 키를 앱 서명 키로 올림(PEPK, I3) (b) 구글 생성 키 | **(a).** 사이드로드본이 삭제 없이 Play 로 넘어오고, 같은 빌드의 APK·Play 본이 서로 덮어쓴다. (b) 면 두 갈래가 영영 못 섞이고 기존 설치본은 전부 재설치. |
| **Q3 채널·자가 업데이트** | (a) 빌드 하나 — 설치 권한·앱 내 설치 시트(10-04 A 경로) **삭제**, Play 본은 Play 로·사이드로드본은 브라우저 넘김(B) (b) flavor 두 벌(Play 용 / 사이드로드 용 A 경로 유지) | **(a).** Play 정책상 A 경로는 어차피 못 싣는다. 사이드로드 실사용 0 인 채널을 위해 산출물·검증을 두 배로 두지 않는다. B 는 이미 있는 길이고 같은 키라 삭제 없이 덮어쓴다. **10-04 «바꿔. 업데이트 뜨게 해» 의 카드는 그대로 뜬다 — 누르면 가는 곳만 바뀐다.** |
| **Q4 가입·삭제** | (a) 앱 안 «회원가입»·«홈으로» 숨김 + 삭제 요청 페이지(이메일 접수) — 앱 내 삭제 기능은 다음 사안 (b) 이번에 앱 내 계정 삭제까지 구현(설계 1회 더 — 매장 주인 계정 삭제 시 매장·거래 데이터 규칙) | **(a).** 태블릿은 가입하는 곳이 아니다. (b) 는 돈·데이터 보존이 얽혀 이번 묶음에 넣으면 심사 일정이 설계에 묶인다 — 분리해서 따로. |
| **Q5 등록정보 범위** | 앱 이름 «Purple POS» · 영어 1개 언어 · 말레이시아 1개 국가로 시작 (다른 조합이면 지정) | **그대로.** 통과가 먼저, 언어·국가는 게시 뒤 추가가 자유. |

**답을 바라면:** 위 5개를 «Q1 (a)+회사명 ○○ / Q2 (a) / Q3 (a) / Q4 (a) / Q5 그대로» 식으로.

---

## 11. 한계·위험 (정직)

- **Capacitor 6→8 마이그를 이 서버에서 돌려 본 적 없다.** AGP 8.13 + JDK 17 조합이 막히면 JDK 21(sudo = Irene 할 일)이 추가된다. Kotlin 2.2 + DantSu 3.3.0 조합도 빌드로만 확인된다.
- **edge-to-edge 는 에뮬 스크린샷까지만 서버에서 증명**된다. 실제 태블릿(제조사 내비바·제스처 모드)은 §7-2-2 가 첫 실측.
- **BT 인쇄·종이·단말기는 서버에서 못 본다**(변함없음) — §7-2 가 유일한 자리. 실사용 매장 0 이라 회귀 피해 범위는 Irene 태블릿뿐.
- **Data safety·금융기능 선언은 Google 의 심사 기준 문구를 Irene 가 화면에서 읽어야** 최종이다. Opus 초안은 코드 근거가 붙은 «사실 목록» 이지 제출 답이 아니다. 방침과 어긋나면 거부.
- **심사자가 «앱 안 가입 경로» 를 더 넓게 볼 가능성**(예: 비밀번호 찾기 → 메일 → 웹 가입): e2e 가 `/pos`·`/forgot-password` 의 앵커 0 을 단언하지만 심사 판단은 사람 몫. 거부되면 사유 원문으로 Q4(b) 재검토.
- **사이드로드본의 B 경로가 Play 심사 대상 바이너리에 남아 있다**(설치 출처가 Play 가 아닐 때만 실행). 권한이 없고 브라우저 링크일 뿐이라 정책 위반 표면은 아니라고 판단하나, 심사 지적이 오면 그 분기를 `installer==null` 에서도 끄는 쪽으로 1줄 조정(그때 재논의 없이 Opus 가 바로).
- Node 22 를 `.toolchain/` 에 받는 것은 외부 바이너리 다운로드다 — nodejs.org 공식 tarball sha 를 대조하고 PATH 는 스크립트 안에서만.
