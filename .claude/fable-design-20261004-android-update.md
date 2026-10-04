# 안드로이드 앱 업데이트 안내·설치 — 설계 (Fable, 2026-10-04)

> Irene 원문: 「앱버전 자동으로 안올라가?」 → 「다른 고객들은 어떻게 그렇게 해? 매번 업데이트를 앱 삭제부터 해?」 → **「바꿔. 업데이트 뜨게 해.」**
> 본 문서 = 구현 단일 기준. 설계와 다른 판단이 필요해지면 즉시 중단하고 Fable 재확인.
> 🔒 인쇄 보호파일 8개 **무접촉**(MainLayout 포함). 접촉 파일은 §9 절단면이 전부.

---

## 0. 한 줄 결론

**앱이 `/desktop/android-latest.json` 을 읽어 자기 버전과 비교 → 새 버전이면 로그인 화면 어디서든 우하단 카드로 «새 버전 x.y.z — 업데이트» → 탭 한 번.**
설치 경로는 두 층:
- **(A) 0.3.1 이후 앱** = 앱 안에서 내려받아 설치 시트까지 띄운다(네이티브 `__NATIVE_UPDATE`). 매장은 «설치» 한 번.
- **(B) 지금 깔린 0.2.0 / 0.3.0** = 앱 안에 설치 코드가 없다. 코드 0줄로 할 수 있는 유일한 길 = **시스템 브라우저(Chrome)로 넘겨 다운로드 → 열기 → 설치**. 삭제 불필요(같은 서명키·덮어쓰기). **이 경로는 딱 한 번**(0.3.1 로 올라오면 그 다음부턴 A).

Windows 앱은 electron-updater 로 이미 자가 업데이트 → 이 설계는 **Android 전용**. 웹 화면은 SW 가 이미 자동.

---

## 1. 실측 사실 (설계의 근거 — Opus 보고 + Fable 재확인)

| # | 사실 | 출처 |
|---|---|---|
| F1 | 앱 버전 단일 소스 = `android/app/build.gradle` versionCode 3 / versionName "0.3.0". 브릿지 `__NATIVE_PRINT.version` 은 `diagnostics().appVersion = BuildConfig.VERSION_NAME` 로 **비동기** 채움(상수 금지, §8-4-B2) | build.gradle:21-22, nativePrintBridge.js 끝부분 |
| F2 | 디버그 빌드 = applicationId `.dev` 접미 + versionName `-dev` 접미(정식 옆에 따로 설치됨) | build.gradle buildTypes.debug |
| F3 | Capacitor 6.2.1 `Bridge.launchIntent()`: **host 와 scheme 이 앱 URL(https://purplehere.com)과 둘 다 같으면 WebView 안에서 처리, 하나라도 다르면 `ACTION_VIEW` 로 외부 앱(=Chrome) 에 넘기고 WebView 는 그대로** | node_modules/@capacitor/android/.../Bridge.java:392-404 |
| F4 | WebView 에 `DownloadListener` 없음 → **같은 origin 의 .apk 링크(특히 `download` 속성)는 아무 일도 안 일어난다**. `onCreateWindow`(target=_blank) 처리도 코드에 없음 | MainActivity.java, Capacitor 소스 grep 0건 |
| F5 | `http://purplehere.com/...`·`http://dev.purplehere.com/...` 둘 다 **301 → https** (nginx/CF) | curl 실측 |
| F6 | `/desktop/*` 는 nginx `no-cache, no-store` + CF BYPASS, `.apk` 는 `application/octet-stream` 으로 나감. sw.js fetch 핸들러는 `/desktop/` 을 가로채지 않음(nav·/static/·캐시가능 API 만) | curl, sw.js:83-108 |
| F7 | 배포 7a = `dev-frontend-build/desktop/` → 운영 `build/desktop/` **추가형 rsync(--delete 없음)**. 여기 둔 파일은 전부 운영으로 간다 | deploy-to-production.sh:579-596 |
| F8 | `check-desktop-feed.js` 에 이미 `checkAndroidApk()`(APK 존재·ZIP 매직·크기·별칭=최신 버전본) 있음. verify-all `desktop-feed` 항목 | dev-backend/scripts/check-desktop-feed.js |
| F9 | 설계문서 §8-7 은 `/mobile/latest.json` 을 적었지만 **현실은 `/desktop/`** 에 0.2.0·0.3.0·별칭이 올라가 있고 배포 7a 도 그 경로만 안다 | ANDROID_APP_DESIGN.md §8-7, ls dev-frontend-build/desktop |
| F10 | 프론트: `PwaInstallBanner` 가 App.tsx 에 마운트(MainLayout 아님), 우하단 고정 카드 zIndex 900. `isNativeDesktop()` = `__PURPLE_DESKTOP` 존재. 앱 버전 배지는 App.tsx:515-523 | App.tsx, PwaInstallBanner.tsx |
| F11 | Settings › 프린터 › QZ 탭에 Android 전용 `AndroidPrinterSetupCard`(SettingsPage.tsx:770, 마운트 6623) — 앱 안에서만 보임 | SettingsPage.tsx |
| F12 | `file_paths.xml` 에 `cache-path` 가 이미 있고 FileProvider authority `${applicationId}.fileprovider` 선언됨. `REQUEST_INSTALL_PACKAGES` 권한 없음. compile/targetSdk 34, minSdk 22 | AndroidManifest.xml, variables.gradle |
| F13 | 서명키 /opt/secrets (0.2.0 = 0.3.0 동일키, SHA-256 b55813cf…). build-tools 34/35 에 `apksigner` 있음(/opt/android-sdk). 10-01 디버그 0.3.0-dev APK 가 `android/app/build/outputs/apk/debug/app-debug.apk` 로 남아 있음(업데이트 플러그인 **없는** 빌드 = B 경로 dev 시험용) | ls 실측 |
| F14 | 운영 태블릿은 0.2.0 추정(terminal_transactions 0행), 고객 매장 네이티브앱 사용 0 | Opus 보고 |

---

## 2. 결정 (판단이 갈리는 지점만)

| # | 결정 | 이유 |
|---|---|---|
| D1 | **피드 위치 = `/desktop/android-latest.json`** (§8-7 의 `/mobile/` 폐기, 문서 수정) | 이미 APK·배포 7a·메모리가 `/desktop` 이다. 같은 개념에 새 경로를 만들지 않는다(CLAUDE.md 2026-09-04 규칙). 데스크탑 `latest.yml` 옆에 나란히. |
| D2 | **피드는 빌드 스크립트가 생성, 손 편집 금지**(desktop 피드와 같은 원칙). 비교 기준 = `versionCode` 정수(둘 다 있을 때) → 없으면 `versionName` semver(`-dev` 접미 제거 후) | 상수 드리프트 사고(2026-07-13) 재발 차단. 0.2.0/0.3.0 은 versionCode 를 노출하지 않으므로 versionName 폴백 필수. |
| D3 | **안내 UI = 비차단 카드 + Settings 상시 진입점.** 강제 모달 금지 | 영업 중 태블릿을 막으면 안 된다. «나중에» 는 24시간·그 버전 한정, 더 새 버전이 오면 즉시 다시 뜸. Settings 줄은 항상 보임(배너를 닫아도 길이 있음). |
| D4 | **보는 사람 = 앱 안(`__PURPLE_DESKTOP.platform==='android'`) + 로그인(어느 역할이든) + 고객화면 경로 아님** | 설치는 Android 권한이지 POS 역할이 아니다. 태블릿 앞에 있는 사람이 눌러야 한다. 고객용 화면 억제는 PwaInstallBanner 와 같은 정규식. |
| D5 | **설치 2층(A 네이티브 / B 브라우저 핸드오프)**, 웹은 `window.__NATIVE_UPDATE` 유무로 자동 분기 | B 는 0.2.0/0.3.0 의 유일한 길(F3·F4). A 는 앞으로의 정답. 둘을 한 코드에 두면 0.2.0→0.3.1 이 B 로 한 번 올라온 뒤 자동으로 A 가 된다. |
| D6 | **B 의 핸드오프 URL = `http://` + 현재 host + `/desktop/<file>`** (`window.location.assign`, `download` 속성·`_blank` 금지) | F3: scheme 만 달라도 외부 브라우저로 간다 + F5: 301 로 https 로 돌아옴 → Chrome 이 .apk 다운로드. dev·운영 둘 다 같은 규칙(www 호스트 트릭은 dev 에 없음). F4 때문에 `download`/`_blank` 는 «아무 일도 안 일어남». |
| D7 | **이번에 0.3.1(versionCode 4) 을 빌드해 피드가 처음부터 0.3.1 을 가리키게 한다** | 운영 태블릿(0.2.0)이 B 경로를 **한 번만** 밟고 바로 A 가 있는 빌드로 올라온다. 0.3.0 으로 올렸다가 0.3.1 로 또 올리면 B 를 두 번 밟는다. |
| D8 | **A 의 다운로드는 앱 자신이(HttpURLConnection, cacheDir), sha256 검증 후 설치 시트.** DownloadManager·진행률 이벤트는 넣지 않는다 | 3MB 파일. 검증 실패 = 설치 시트 안 띄우고 파일 삭제(깨진 파일이 설치 단계에서야 드러나는 것 차단). 진행률은 YAGNI — 스피너 한 줄. |
| D9 | **서명자 지문 검사는 빌드 스크립트에서 fail-closed** | 다른 키로 서명되면 모든 태블릿이 «앱이 설치되지 않음» 으로 조용히 실패한다. 피드에 올라가기 전에 막는다. |
| D10 | nginx MIME(`application/vnd.android.package-archive`) 추가는 **하지 않는다(보류)** — 실기기에서 Chrome 이 .apk 를 설치파일로 못 열 때만, Irene 승인 후 | Chrome 은 확장자로 판별해 보통 문제없다. 인프라 변경은 «이유·영향 보고 후 승인» 규칙. |

---

## 3. 피드 명세 — `/desktop/android-latest.json`

```json
{
  "versionName": "0.3.1",
  "versionCode": 4,
  "file": "PurplePOS-0.3.1.apk",
  "sha256": "<hex 64자>",
  "size": 3213366,
  "minSdk": 22,
  "releaseDate": "2026-10-04T08:00:00.000Z",
  "signerSha256": "b55813cf…(전체)"
}
```
- 생성자: `mobile-app/scripts/build-release.sh`(§6) 만. 앱은 `fetch('/desktop/android-latest.json', {cache:'no-store'})` — 상대경로라 dev 앱은 dev, 운영 앱은 운영 피드를 읽는다(F6: SW 미개입·no-store).
- 웹은 **`file` 이 `/^PurplePOS-\d+\.\d+\.\d+\.apk$/` 에 맞을 때만** URL 을 만든다(desktop 피드와 같은 «검증 안 된 피드 텍스트로 URL 만들지 않기»). 안 맞으면 피드 없음 취급.
- 별칭 `PurplePOS.apk` 는 **그대로 유지**(브라우저 CTA·/download 페이지가 쓴다). 피드와 바이트 동일해야 한다(게이트 §7).

---

## 4. 프론트 설계 (dev-frontend)

### 4-1. `src/utils/nativeAppUpdate.ts` (신규, 순수 함수 + fetch 1개 — jest 대상)
```ts
export interface AndroidFeed { versionName: string; versionCode: number | null; file: string; sha256: string; size: number }
export const ANDROID_FEED_URL = '/desktop/android-latest.json';
const FILE_RE = /^PurplePOS-\d+\.\d+\.\d+\.apk$/;

export function parseFeed(raw: unknown): AndroidFeed | null       // 모양·정규식 검증, 실패 = null (throw 금지)
export function parseVersion(v: string | null | undefined): number[] | null  // "0.3.1-dev" → [0,3,1]; 못 읽으면 null
export function isNewer(feed: AndroidFeed, current: { versionName: string | null; versionCode: number | null }): boolean
//   둘 다 versionCode 있으면 정수 비교. 아니면 semver 비교. current.versionName 이 null(브릿지가 못 채움)이면 true — §2 D2·아래 주석.
export function readDismiss(): { version: string; until: number } | null   // localStorage 'pos.native-update.dismissed', try/catch
export function writeDismiss(version: string, hours = 24): void
export function isDismissed(feed: AndroidFeed): boolean   // 같은 versionName && now < until 만 true
export function currentNativeVersion(): { versionName: string | null; versionCode: number | null }
//   (window as any).__NATIVE_PRINT?.version / ?.versionCode
export function isAndroidNativeApp(): boolean  // (window as any).__PURPLE_DESKTOP?.platform === 'android'
export async function fetchAndroidFeed(): Promise<AndroidFeed | null>  // no-store, !ok → null, parseFeed
export function externalHandoffUrl(file: string): string   // `http://${location.host}/desktop/${file}` — D6, 주석에 F3·F4·F5 적시
```
`current.versionName === null → true` 주석: 브릿지가 5초 안에 버전을 못 채운 앱은 어차피 고장이고, 안내가 떠도 «같은 버전 덮어쓰기» 이상의 해는 없다. 숨기면 고장이 안 보인다(검증규율 4조).

### 4-2. `src/hooks/useNativeAppUpdate.ts` (신규)
- 상태: `{ feed, current, status: 'idle'|'checking'|'up_to_date'|'available'|'installing'|'handoff'|'error', error }`
- 동작: `isAndroidNativeApp()` 아니면 아무것도 안 한다(fetch 0회). 맞으면 마운트 시 체크 → **`__NATIVE_PRINT.version` 이 null 이면 500ms 간격 최대 10회 재읽기** 후 판정 → 60분 interval + `visibilitychange(visible)` 재체크.
- `install()`:
  1. `window.__NATIVE_UPDATE?.install` 있으면(A): `status='installing'` → `install({ url: location.origin + '/desktop/' + feed.file, sha256, size })` → `{ok:true}` = 설치 시트가 떴다(상태 'available' 로 복귀, 문구 «설치 화면을 따라 주세요»); `{ok:false, error:'NEEDS_INSTALL_PERMISSION'}` = 권한 화면이 열렸다 → 문구 «'이 출처 허용' 을 켠 뒤 다시 업데이트»; 그 외 error → `status='error'` + 문구(SHA_MISMATCH/DOWNLOAD_FAILED/...).
  2. 없으면(B): `status='handoff'` → `window.location.assign(externalHandoffUrl(feed.file))`. WebView 는 머문다(F3 가 true 를 돌려 네비게이션 취소). 카드 문구가 B 안내로 바뀜(§4-3).
- `dismiss()`: `writeDismiss(feed.versionName)` → 카드 숨김.
- 단일 인스턴스: Provider 없이 **배너·Settings 줄이 각자 훅을 쓰면 fetch 2회**가 된다 → 모듈 스코프 메모(마지막 결과 + 타임스탬프, 60분)로 1회만 나가게 한다. Provider 추가로 App.tsx 트리를 더 깊게 하지 않는다.

### 4-3. `src/components/Common/NativeAppUpdateBanner.tsx` (신규) — App.tsx 의 `<PwaInstallBanner />` 바로 아래에 마운트
- 조건: `status==='available'|'installing'|'handoff'|'error'` && `isAuthenticated` && `!isCustomerDisplayRoute`(PwaInstallBanner 와 같은 정규식) && `!isDismissed(feed)`.
- 모양: PwaInstallBanner 와 같은 자리·같은 카드(우하단, maxWidth 360, zIndex 900, 로고 40px). 둘이 동시에 뜰 일은 없다(PwaInstallBanner 는 `isNativeDesktop()` 이면 안 뜬다).
- 문구(i18n `common:nativeUpdate.*`, en→ko→zh→ms 4개):
  - title: «Purple POS 새 버전 {{version}}» / body: «현재 {{current}} → {{version}}. 설치해도 로그인·설정은 그대로입니다.»
  - 버튼 2개 = 공용 `components/UI/Button`: primary «업데이트» / ghost «나중에»(24시간). 상단 × 는 «나중에» 와 동일.
  - installing: «내려받는 중…» (버튼 비활성). 
  - handoff(B): «브라우저가 열리고 다운로드가 시작됩니다. 끝나면 '열기' → '설치'. 처음 한 번 'Chrome 에서 이 출처 허용' 을 켜 주세요.» + 보조 줄 «브라우저가 열리지 않으면 태블릿 Chrome 에서 {{host}}/download» + 버튼 «다시 시도».
  - error: «파일 확인 실패({{error}}). 잠시 후 다시 시도하거나 {{host}}/download 에서 받아 주세요.»
  - 번역 키 설명에 «열기/설치/허용» 은 Android 시스템 버튼 이름이라 적는다.
- 색·컴포넌트: primary #635BFF 는 Button 이 가진 것. 인라인 hex 신규 금지 → 카드 테두리/그림자만 PwaInstallBanner 것을 그대로 복사(기존 값).

### 4-4. Settings 상시 진입점 — `SettingsPage.tsx` `AndroidPrinterSetupCard` 안 첫 줄
- 한 줄: «앱 버전 {{current}} · 최신 {{latest}}» + (available 이면) `Button size=sm` «업데이트». 최신 = 현재면 «최신 버전입니다», 피드 못 읽으면 줄 자체 생략(에러 표시 금지 — 피드가 없는 dev 상태도 정상).
- 훅은 §4-2 와 같은 것(메모 공유). 설치 동작·문구도 배너와 동일 함수 재사용(두 벌 금지).

### 4-5. 손대지 않는 것
- `App.tsx` 배지(515-523) 그대로. `PwaInstallContext/Banner` 그대로(브라우저용). `DownloadPage` 그대로(별칭). `printDiagnostics.ts` 그대로.
- MainLayout·🔒 8개 파일 무접촉. `check-print-guard.js` 8/8 변동 0 이 증명.

---

## 5. 네이티브 설계 (mobile-app, 0.3.1)

### 5-1. `NativeUpdatePlugin.kt` (신규, `@CapacitorPlugin(name="NativeUpdate")`)
```kotlin
@PluginMethod fun canInstall(call)   // { granted: Boolean }  — SDK<26 은 true, 아니면 packageManager.canRequestPackageInstalls()
@PluginMethod fun install(call)      // { url, sha256, size } → 항상 resolve { ok, error? } (throw 금지 — §4 계약과 같은 버릇)
```
`install` 순서(단일 스레드 executor 1개, 동시 호출은 `BUSY`):
1. `url` 은 `https` 이고 host 가 `BuildConfig`-쪽 앱 URL host 와 같아야 한다 → 아니면 `BAD_URL`. (앱 URL host 는 `bridge.config.serverUrl` 에서 읽는다 — `getBridge().getConfig().getServerUrl()`; 상수 금지.)
2. `cacheDir/updates/` 비우고 `PurplePOS-update.apk` 로 다운로드(HttpURLConnection, connect 10s / read 30s, `size` 와 바이트 수 불일치 = `SIZE_MISMATCH`).
3. sha256 hex 비교(대소문자 무시) → 불일치 = 파일 삭제 + `SHA_MISMATCH`.
4. SDK ≥ 26 && !canRequestPackageInstalls → `Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES, Uri.parse("package:"+packageName))` NEW_TASK 로 startActivity → `{ok:false, error:"NEEDS_INSTALL_PERMISSION"}` (파일은 보존 — 다음 호출이 sha 일치하면 다운로드 생략해도 됨; 단순화를 위해 재다운로드 허용).
5. `FileProvider.getUriForFile(ctx, "$packageName.fileprovider", file)` → `Intent(ACTION_VIEW).setDataAndType(uri, "application/vnd.android.package-archive")` + `FLAG_ACTIVITY_NEW_TASK | FLAG_GRANT_READ_URI_PERMISSION` → startActivity → `{ok:true}`. `ActivityNotFoundException` → `NO_INSTALLER`.
- 로그 태그 `NativeUpdate`, 단계별 `Log.i`(logcat 으로 실기기 추적).

### 5-2. 매니페스트·등록·브릿지
- `AndroidManifest.xml`: `<uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />` 추가. FileProvider·`cache-path` 는 이미 있음(F12) — 변경 없음.
- `MainActivity.java`: `registerPlugin(NativeUpdatePlugin.class);` (ECR 등록 줄 아래, `super.onCreate` 전).
- `NativePrintPlugin.kt` diagnostics: `r.put("appVersionCode", BuildConfig.VERSION_CODE)` 한 줄 추가(§4 계약 모양에 키 1개 추가 — 읽는 쪽은 선택적).
- `src/nativePrintBridge.js`:
  - diagnostics `.then` 에서 `if (d.appVersionCode != null) window.__NATIVE_PRINT.versionCode = d.appVersionCode;`
  - `const U = Cap.Plugins.NativeUpdate; if (U) window.__NATIVE_UPDATE = { available:true, canInstall: () => U.canInstall().catch(() => ({granted:false})), install: safe((job) => U.install(job)) };`
  - 0.2.0/0.3.0 에는 이 객체가 없다 = 웹의 B 분기 조건.
- `build.gradle`: `versionCode 4` / `versionName "0.3.1"`.
- 규칙(문서 §8-7 에 명기): **네이티브 파일이 하나라도 바뀌면 versionCode +1, versionName patch +1, 피드 재생성.** 웹만 바뀌면 APK 안 만든다.

### 5-3. `mobile-app/scripts/build-release.sh` (신규 — 메모리에 손으로 적힌 명령을 스크립트로)
```
set -euo pipefail
ROOT=/var/www/mobile-app; OUT=/var/www/dev-frontend-build/desktop
EXPECTED_SIGNER_SHA256="<0.3.0 APK 에서 apksigner 로 읽은 전체 지문 — Opus 가 채움>"
APKSIGNER=/opt/android-sdk/build-tools/35.0.0/apksigner
VN=$(grep -oP 'versionName\s+"\K[^"]+' $ROOT/android/app/build.gradle); VC=$(grep -oP 'versionCode\s+\K\d+' $ROOT/android/app/build.gradle)
[ -f $ROOT/android/keystore.properties ] || { echo "keystore.properties 없음 — 미서명 빌드는 올리지 않는다"; exit 1; }
[ -e $OUT/PurplePOS-$VN.apk ] && { echo "PurplePOS-$VN.apk 가 이미 있다 — 버전 올리지 않고 재빌드 금지"; exit 1; }
cd $ROOT && PURPLE_APP_URL=https://purplehere.com/pos npx cap sync android
cd android && ./gradlew assembleRelease -x lintVitalAnalyzeRelease -x lintVitalReportRelease -x lintVitalRelease
APK=app/build/outputs/apk/release/app-release.apk
$APKSIGNER verify --print-certs $APK | grep -qi "SHA-256 digest: $EXPECTED_SIGNER_SHA256" || { echo "서명 지문 불일치 — 전 매장 설치 거부. 중단"; exit 1; }
unzip -p $APK assets/public/nativePrintBridge.js | cmp - $ROOT/src/nativePrintBridge.js  # cap sync 가 최신 브릿지를 담았는지
cp $APK $OUT/PurplePOS-$VN.apk && cp $APK $OUT/PurplePOS.apk
SHA=$(sha256sum $OUT/PurplePOS-$VN.apk | cut -d' ' -f1); SIZE=$(stat -c%s $OUT/PurplePOS-$VN.apk)
SIGNER=$EXPECTED_SIGNER_SHA256; DATE=$(date -u +%FT%T.000Z)
printf '{\n  "versionName": "%s",\n  "versionCode": %s,\n  "file": "PurplePOS-%s.apk",\n  "sha256": "%s",\n  "size": %s,\n  "minSdk": 22,\n  "releaseDate": "%s",\n  "signerSha256": "%s"\n}\n' "$VN" "$VC" "$VN" "$SHA" "$SIZE" "$DATE" "$SIGNER" > $OUT/android-latest.json
cd /var/www/dev-backend && node scripts/check-desktop-feed.js
```
- heavy-task-gate 가 있는 서버다 — gradle 은 다른 빌드와 겹치지 않게(기존 규칙).
- 디버그(.dev) 빌드는 이 스크립트 대상이 아니다(`./gradlew assembleDebug`, 피드에 올리지 않음).

---

## 6. 게이트 — `check-desktop-feed.js` 확장 (새 스크립트 만들지 않음, F8)
`checkAndroidApk()` 를 피드 기준으로 고친다(«가장 큰 버전본» 추측 → 피드가 권위):
1. `android-latest.json` 이 **없으면**: 버전본 APK 가 하나도 없을 때만 skip, 있으면 **실패**(«피드 없이 APK 만 있다 — 앱이 업데이트를 못 안다»). *주의: 이 항목은 0.3.1 피드를 올리기 전까지 현 상태(0.2.0·0.3.0 만 있음)에서 실패한다 — 구현 묶음 안에서 피드와 함께 들어가므로 순서상 문제 없음. 피드 전에 게이트만 먼저 올리지 말 것.*
2. 피드 JSON 파싱 + `file` 정규식 + `versionName` 이 `file` 의 버전과 일치 + `versionCode` 정수.
3. 피드 `file` 이 존재·ZIP 매직·sha256·size 일치.
4. 별칭 `PurplePOS.apk` 바이트 == 피드 file.
5. **피드 버전보다 높은 버전본 APK 가 디렉토리에 없다**(dev 시험용 파일을 지우고 안 올렸을 때 운영으로 새는 것 차단 — F7 추가형 rsync).
6. `checkNoHardcodedVersion()` 정규식을 APK 버전(`PurplePOS-\d+\.\d+\.\d+\.apk` 리터럴)도 잡게 확장 — 단 `/download` 와 CTA 의 **별칭 `PurplePOS.apk` 는 허용**.
- 고장주입 3건 의무(검증규율 2조): 피드 sha 한 글자 바꿈 → 실패 / 별칭을 0.3.0 으로 바꿈 → 실패 / `PurplePOS-9.9.9.apk` 빈 파일 추가 → 실패. 원복 후 통과. `DESKTOP_DIR` 환경변수로 복사본에 주입(원본 디렉토리에서 주입 금지).

---

## 7. 검증 계획

### 7-1. 서버에서 끝내는 것 (Opus)
| 항목 | 방법 | 기준 |
|---|---|---|
| 순수 함수 | `dev-frontend` jest `src/utils/__tests__/nativeAppUpdate.test.ts`(게이트 밖이라 **직접 실행**, 메모리 reference_frontend_jest_outside_gate) | isNewer: 0.2.0<0.3.1 / 0.3.0=0.3.0 false / "0.3.1-dev" vs 0.3.1 false / versionCode 3<4 true 우선 / versionName null → true / parseFeed 모양 불량·file 정규식 불일치 → null / isDismissed 같은 버전만 |
| 피드 게이트 | §6 고장주입 3건 + 정상 통과 | 3/3 실패·원복 후 통과 |
| 브라우저에서 안 뜸 | mount sweep(`verify-all --full`) | NativeAppUpdateBanner 가 어떤 화면에도 없음(`__PURPLE_DESKTOP` 없음), console.error 0 |
| 앱 조건 모의 | Playwright 1 spec: `addInitScript` 로 `window.__PURPLE_DESKTOP={platform:'android'}`, `window.__NATIVE_PRINT={version:'0.2.0'}`, `/desktop/android-latest.json` 을 route 로 0.3.1 응답 → 로그인 → 배너 존재·문구·«나중에» 후 사라짐·localStorage 키·피드 404 route 면 배너 없음 / `window.__NATIVE_UPDATE={install: async()=>({ok:false,error:'SHA_MISMATCH'})}` 주입 → error 문구 | 각 1회 통과 |
| i18n | 4개 언어 키 + `npm run i18n:verify` | 통과 |
| 가드 | `verify-all --full`(print-guard 8/8 변동 0 · design-guard 신규 0 · health-check) | 전부 통과, 빌드 1회·sweep 1회(09-06 규칙) |
| APK | build-release.sh 1회 → 지문·cmp·피드 생성·feed 게이트 | 통과. `apksigner verify --print-certs` 출력 보고 |

### 7-2. 실기기 — dev (Irene 손, Opus 체크리스트·logcat 없음 → 화면·배지로 판정)
사전: dev 태블릿(또는 운영 태블릿 옆자리)에 **디버그 앱**(`.dev`, dev.purplehere.com) 사용. 운영 정식 앱과 따로 설치되므로 운영 영업 무영향.
1. **B 경로**: F13 의 10-01 `app-debug.apk`(0.3.0-dev, 플러그인 없음) 설치 → 로그인 → 배너 «0.3.0 → 0.3.1» 떠야 함(dev 피드 = 0.3.1) → 「업데이트」 → **Chrome 이 열리고 PurplePOS-0.3.1.apk 다운로드** → 열기 → (처음) Chrome 출처 허용 → 설치. *이때 설치되는 것은 정식 패키지(com.purplehere.pos.mobile, 운영 URL)* — dev 태블릿에 정식 0.3.1 이 생긴다(해롭지 않음, 운영 로그인 안 하면 됨). **이 단계가 전체에서 가장 불확실한 지점(F3 실기기 미검증)** — 실패 양상별 대응: Chrome 이 안 열림 → `www.` 호스트로 재시험(운영만) / Chrome 이 «열 수 없음» → D10 MIME 승인 요청.
2. **A 경로**: 디버그 0.3.1-dev 빌드(`assembleDebug`) 설치 → dev 피드 비교(0.3.1-dev→0.3.1 = 같음 → 배너 없음, Settings 줄 «최신 버전입니다» 확인) → Opus 가 **dev 전용 시험 피드**를 올린다: 디버그 0.3.2-dev APK 를 `PurplePOS-0.3.2.apk` 로 복사 + `android-latest.json` 0.3.2/5 (sha·size 실값) → 앱 재진입 → 배너 → 「업데이트」 → 첫 회 «이 출처 허용» 설정 열림 → 허용 → 「업데이트」 다시 → 설치 시트 → 설치 → 앱 재실행 → 배지 `app v0.3.2-dev`, 배너 없음.
3. **sha 불일치 주입**: 시험 피드 sha 한 글자 수정 → 「업데이트」 → 배너 error «파일 확인 실패(SHA_MISMATCH)», 설치 시트 안 뜸.
4. **나중에**: 닫힘 → 앱 재진입에도 안 뜸 → Opus 가 피드 버전 5→6(파일 그대로) → 재진입 즉시 다시 뜸.
5. **정리(필수, 배포 전)**: 시험 파일 `PurplePOS-0.3.2.apk` 삭제, 피드를 build-release.sh 산출(0.3.1) 로 복원 → `check-desktop-feed.js` 통과(§6-5 가 남은 파일을 잡는다).

### 7-3. 실기기 — 운영 (배포 후, Irene)
`/배포` 뒤 운영 태블릿(0.2.0) 에서 앱 열기 → 배너 «0.2.0 → 0.3.1» → 「업데이트」 → Chrome → 다운로드 → 열기 → 출처 허용(1회) → 설치 → 앱 열림, 배지 `app v0.3.1` → **Settings › 카드단말기 자동 찾기가 동작**(오늘 일의 원래 목적) → 운영 `terminal_transactions` 가 첫 거래 뒤 0행 탈출. 삭제·재로그인 없음을 확인.

---

## 8. 롤아웃 순서 (빌드 1회·sweep 1회 규칙 준수)
1. 코드 전부 확정: 프론트(§4) + 네이티브(§5) + 스크립트(§5-3) + 게이트(§6) + i18n + 문서(§8-7 수정·README 빌드 절 갱신·`reference_android_app_distribution` 메모리에 피드·스크립트 추가).
2. `build-release.sh` → 0.3.1 APK·피드가 `dev-frontend-build/desktop/` 에 생김. `assembleDebug` 로 0.3.1-dev·0.3.2-dev 도 만들어 두되 **피드 디렉토리엔 시험 때만**.
3. `npm run build:dev` 1회 → `verify-all --full` 1회 → §7-1.
4. §7-2 실기기 dev(Irene) → §7-2-5 정리 → `check-desktop-feed.js` 재통과 → `check-sensitive-diff.js`.
5. 완료 보고 → Fable 게이트 판정(이 사안 2회째 = 마지막) → Irene 컨펌 → `/배포`(SW 버전은 프론트 변경 끝에 올림) → §7-3.

---

## 9. 절단면 (이 목록 밖 변경 = 반려)
**dev-frontend**
- 신규: `src/utils/nativeAppUpdate.ts`, `src/hooks/useNativeAppUpdate.ts`, `src/components/Common/NativeAppUpdateBanner.tsx`, `src/utils/__tests__/nativeAppUpdate.test.ts`, `e2e/native-app-update.spec.js`
- 수정: `src/App.tsx`(import 1 + 마운트 1줄, PwaInstallBanner 아래), `src/pages/Settings/SettingsPage.tsx`(AndroidPrinterSetupCard 안 줄 1개), `public/locales/{en,ko,zh,ms}/common.json`(`nativeUpdate.*`), `public/sw.js`(버전 bump, 맨 마지막)
**dev-backend**
- 수정: `scripts/check-desktop-feed.js`(§6)
**mobile-app**
- 신규: `android/app/src/main/java/com/purplehere/pos/mobile/NativeUpdatePlugin.kt`, `scripts/build-release.sh`
- 수정: `AndroidManifest.xml`(권한 1줄), `MainActivity.java`(등록 1줄), `NativePrintPlugin.kt`(diagnostics 1줄), `src/nativePrintBridge.js`(versionCode + `__NATIVE_UPDATE`), `android/app/build.gradle`(4 / 0.3.1), `docs/ANDROID_APP_DESIGN.md §8-7`, `README.md` 빌드 절
**산출물**: `dev-frontend-build/desktop/PurplePOS-0.3.1.apk`, `PurplePOS.apk`(갱신), `android-latest.json`
**무접촉**: 🔒 8개, `PwaInstallContext/Banner`, `DownloadPage`, `printDiagnostics.ts`, nginx(D10 보류), `deploy-to-production.sh`(7a 가 이미 전부 옮긴다)

---

## 10. Irene 가 할 일 / 결정
| | 내용 | Fable 권고 |
|---|---|---|
| 결정 1 | 비차단 배너(24h «나중에») + Settings 상시 줄, 강제 모달 없음 | **권고: 이대로.** 영업 중 화면을 막지 않는다. 강제가 필요해지면 피드에 `minVersionCode` 한 칸 추가로 후속 가능. |
| 결정 2 | 0.3.0 건너뛰고 **0.3.1 을 바로 빌드·피드** | **권고: 예.** 지금 태블릿이 브라우저 경로를 한 번만 밟고 그 뒤로는 앱 안 한 번 탭. |
| 결정 3 | nginx `.apk` MIME 추가 | **권고: 보류.** 실기기 B 경로에서 Chrome 이 설치파일로 못 열 때만 승인 요청. |
| 할 일 1 | dev 실기기 §7-2 (디버그 앱으로 1~5, 10~15분) | 네이티브 설치 코드는 서버에서 못 본다 — Windows 때와 같다. |
| 할 일 2 | 배포 후 운영 태블릿 §7-3 **한 번**: 업데이트 → Chrome → 열기 → 출처 허용(1회) → 설치 | 이번이 마지막 수동 설치. 삭제·재로그인 없음. |

---

## 11. 한계 (정직)
- F3 의 «scheme 다르면 외부 브라우저» 는 Capacitor 소스로 확인했지만 **실기기에서 안 돌려 봤다**(§7-2-1 이 첫 실측). 실패 시 대안 두 개(www 호스트 / MIME) 를 §7-2-1 에 적어 두었다.
- 0.2.0/0.3.0 은 어떤 코드로도 «탭 한 번 설치» 가 안 된다. 브라우저 핸드오프가 코드 0줄로 가능한 최선이다.
- 진행률 표시 없음(3MB, 스피너). 필요해지면 플러그인 `notifyListeners` 로 후속.
