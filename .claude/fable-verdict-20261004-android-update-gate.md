# Fable 게이트 판정 — 안드로이드 앱 업데이트 안내·설치 (2026-10-04)

> 설계: `.claude/fable-design-20261004-android-update.md` · Irene 원문 「바꿔. 업데이트 뜨게 해.」 → 「권고대로 진행해」 → 「언제 다해? 다 하면 말해」
> 판정 세션: Fable(리더). 팀원(Opus) 제출물을 diff·가드·실호출로 직접 재대조했다.

---

## 0-최종. 재제출 판정 (08:18 재빌드) — **PASS. 마커 찍음.**

| 재대조 | 결과 |
|---|---|
| `NativeUpdatePlugin.kt:49` | `val size = call.data.optLong("size", -1L)` + 이유 주석. 106줄, 다른 앵커(host 검사·BAD_FEED·SIZE/SHA_MISMATCH·권한·FileProvider·BUSY) 전부 동일. 저장소에는 **미추적(??)** 상태 — «auto-save 커밋됨» 보고는 사실과 다르지만 판정에 영향 없음(지문은 미추적 내용도 포함) |
| 산출물 3개 | `PurplePOS-0.3.1.apk` = `PurplePOS.apk` sha256 `290d12ff…` 3215823B(cmp 동일) · 피드 sha·size 일치 · signer `b55813cf…` · versionCode 4 / 0.3.1 / REQUEST_INSTALL_PACKAGES · APK 내 브릿지 = src cmp 동일 |
| **수정이 바이트코드에 들어갔나** | `dexdump -d` NativeUpdatePlugin.install: 옛 APK `invoke-virtual PluginCall.getLong` / 새 APK `PluginCall.getData` → `JSObject.optLong` — **확정** |
| 옛 산출물 | 스크래치패드 `apk031-old/` 로 이동(sha 5e006ee8…), 운영·기기 어디에도 없음 |
| 가드 | check-desktop-feed 통과 · print-guard 8/8 변동 0 · SW 5.75(src=build 동일, 프론트 재빌드 없음 — 맞음) |

배포 조건 §6 · Irene 태블릿 절차 §7 · §5 조건 2개 그대로 유효. 아래 §0 은 1차 판정(보류) 원문 — 기록용.

## 0. (1차) 결론 — **보류(HOLD). 네이티브 결함 1건 수정 + 0.3.1 재빌드 뒤 지문 대조만 거쳐 마커.**

- 프론트·게이트·스크립트·문서·i18n·산출물 구조 = 설계 §9 절단면과 **일치**, 가드·e2e·jest 전부 **내 재실행 통과**.
- 그러나 **`NativeUpdatePlugin.kt:49` 가 `call.getLong("size")` 를 쓴다 → Android `org.json` 은 int 범위 정수(3215588)를 `Integer` 로 파싱하고, Capacitor `PluginCall.getLong` 은 `instanceof Long` 일 때만 값을 돌려준다(그 외 null) → `size = -1` → `BAD_FEED`.** 즉 **0.3.1 의 앱 안 설치(A 경로)는 지금 APK 로는 100% 실패**한다. 이대로 나가면 D7(브라우저 경로는 딱 한 번)이 무효 — 다음 네이티브 릴리즈에서 태블릿이 또 수동 설치를 밟는다.
- 운영에는 아직 아무것도 안 나갔고 어느 기기에도 0.3.1 이 설치되지 않았다(§3-④ 실측) → **0.3.1(versionCode 4)을 버리고 같은 번호로 재빌드**해도 된다. 마커는 재빌드 뒤 찍는다(지문이 바뀌므로 지금 찍어도 죽는다).

---

## 1. diff 범위 대조 — 설계 §9 절단면

| 구분 | 설계 | 실제 | 판정 |
|---|---|---|---|
| 프론트 신규 5 | utils/nativeAppUpdate.ts · hooks/useNativeAppUpdate.ts · Common/NativeAppUpdateBanner.tsx · utils/__tests__/nativeAppUpdate.test.ts · e2e/native-app-update.spec.js | 동일 5개 | 일치 |
| App.tsx | import 1 + 마운트 1(PwaInstallBanner 아래) | +2줄, 정확히 그 자리 | 일치 |
| SettingsPage.tsx | AndroidPrinterSetupCard 안 줄 1개 | import 1 + `<NativeAppVersionRow />` desc 아래 | 일치 |
| locales ×4 | `nativeUpdate.*` | 4개 언어 키 12개 동일 집합(내 대조) | 일치 |
| sw.js | 버전 bump 마지막 | 5.75-android-update-20261004 | 일치 |
| check-desktop-feed.js | §6 ①~⑥ | ①피드 없음→버전본 있으면 실패 ②모양 ③sha256·size ④별칭 바이트 ⑤더 높은 버전본 금지 ⑥APK 리터럴(별칭 허용) | 일치 |
| mobile-app 신규 2 | NativeUpdatePlugin.kt · scripts/build-release.sh | 동일 | 일치(결함 §2) |
| mobile-app 수정 7 | Manifest 권한 1 · MainActivity 등록 1 · NativePrintPlugin diagnostics 1 · nativePrintBridge(versionCode+__NATIVE_UPDATE) · build.gradle 4/0.3.1 · ANDROID_APP_DESIGN §8-7 · README | 전부 그 범위 안 | 일치 |
| 산출물 | PurplePOS-0.3.1.apk · PurplePOS.apk · android-latest.json | sha256 5e006ee8… 3개 일치, cmp 동일 | 일치(재빌드 대상) |
| 무접촉 | 🔒 8개 · PwaInstallContext/Banner · DownloadPage · printDiagnostics · nginx · deploy-to-production.sh | print-guard 8/8 변동 0 · deploy 스크립트 diff 0 · PwaInstallBanner diff 0 | 일치 |

**절단면 밖 작업트리 파일 8개 — 이 사안 아님, 선행 게이트 승계:**
- `middleware/auth.js` · `routes/auth.js` · `services/userContexts.js` · `tests/user-contexts-switch.test.js` · `e2e/brand-manager-hat.spec.js` · `CardTerminalSettings.tsx` · `docs/MULTI_CONTEXT_LOGIN_DESIGN.md` — mtime 06:44~06:50(이 작업 07:47 이전), **(0-a) 게이트 PASS**(`.claude/fable-verdict-20261004-0a-gate.md`) 범위이며 **운영 배포 #3(SW 5.74, 07:30)으로 이미 나간 내용**(운영 sw.js 5.74 실측). 배포 커밋 4999baf4f 가 문서만 담아 작업트리에 남아 있을 뿐이다. `check-sensitive-diff` 의 ⑤ 2건은 이 파일들이다. 이번 묶음 커밋에 같이 들어가는 것 수용.
- `dev-backend/releases/2026-10-04-android-update.json` — 배포 기록. 수용.

---

## 2. 결함 — `NativeUpdatePlugin.kt:49` (수정 필수)

```kotlin
val size = call.getLong("size") ?: -1L          // 현재
```
- 증거 ①: `node_modules/@capacitor/android/.../PluginCall.java:242-252` — `getLong` 은 `value instanceof Long` 일 때만 반환, 아니면 `defaultValue(null)`.
- 증거 ②: `MessageHandler.java:54` `new JSObject(jsonStr)` → `org.json.JSONObject` 파싱. Android `org.json.JSONTokener.readLiteral` 은 소수점 없는 숫자를 `Long.parseLong` 뒤 **int 범위면 `(int)` 로 반환** → `Integer`.
- 증거 ③: 이 저장소의 다른 플러그인 7곳 전부 `call.getInt(...)` 를 쓴다(NativePrintPlugin 100·101·184, NativeEcrPlugin 128·131·138) — `getLong` 은 이 파일 한 줄만.
- 결과: `size <= 0` → `BAD_FEED` → 웹은 `status='error'` «파일 확인 실패(BAD_FEED)». 다운로드도 시작 안 함. **A 경로 전멸.**

**수정(한 줄):**
```kotlin
val size = call.data.optLong("size", -1L)       // JSONObject.optLong 은 Integer/Long/Double 모두 long 으로
```
JS 쪽 변경 없음(`size: feed.size` 그대로). 다른 네이티브 변경 금지.

**재빌드 절차(판정):**
1. 0.3.1 산출물은 운영에 안 나갔고 기기에 설치된 적 없다(§3-④) → **버전 번호 유지(4 / 0.3.1) 재빌드 허용.** build-release.sh 의 «같은 버전 재빌드 금지» 는 *배포된* 버전을 위한 자물쇠다 — 미배포 빌드를 버리는 것은 그 규칙의 대상이 아니다.
2. `dev-frontend-build/desktop/{PurplePOS-0.3.1.apk, PurplePOS.apk, android-latest.json}` 3개를 스크래치패드로 **이동(삭제 아님)** → `mobile-app/scripts/build-release.sh` 1회 → 스크립트가 지문·cmp·피드·feed 게이트까지 돈다. 실패하면 3개를 되돌린다.
3. 확인: 새 APK sha256 ≠ `5e006ee8…`(바뀌었음) · `aapt2 dump badging` versionCode 4 / 0.3.1 / REQUEST_INSTALL_PACKAGES · 피드 sha=파일 sha · `check-desktop-feed.js` 통과. **프론트 재빌드 없음**(Kotlin 만, SW 5.75 유지), mount sweep 재실행 없음.
4. 재제출 시 내가 보는 것: `git diff -- NativeUpdatePlugin.kt` 가 위 한 줄만인지 · 피드/산출물 3개 · `fable-gate status` 지문 → 마커.

---

## 3. 내 재실행·실측 (팀원 보고와 대조)

| 항목 | 결과 |
|---|---|
| ① e2e `native-app-update.spec.js` (`-c e2e/playwright.config.js`) | **4/4** 16.3s — 배너 0.2.0→0.3.1 · 나중에 기록·리로드 후 숨김 · 피드 404 무배너 · SHA_MISMATCH 문구 · 브라우저 무배너+피드요청 0 |
| ② jest `nativeAppUpdate.test.ts` | **6/6** — `react-scripts test` 로 돌려야 함(`npx jest` 직접은 CRA TS 변환이 없어 0건 실패 — 러너 문제, 코드 문제 아님) |
| ③ 가드 | check-desktop-feed 통과(피드 0.3.1·versionCode 4·별칭 동일) · print-guard **8/8 변동 0** · design-guard 신규 0 · sensitive-diff ⑤ = 0-a 승계 파일만 |
| ④ 운영 현재 상태 | `/desktop/android-latest.json`·`PurplePOS-0.3.1.apk` → **200 text/html(SPA 폴백)** = 없음(앱은 `res.json()` 예외→null→배너 없음, 정상) · 별칭 sha `f912f96a…` = 0.3.0 · sw 5.74 → **0.3.1 은 어디에도 안 나갔다** |
| ⑤ dev 서빙 | 피드 200 `no-cache, no-store` cf DYNAMIC · APK 200 octet-stream 3215588 · `http://dev…/desktop/…apk` 301→https · `http://purplehere.com/desktop/…` 301→https (F5·F6 재확인) |
| ⑥ B 경로 전제(F3) | `capacitor.config.ts` 에 `allowNavigation` 없음 → `Bridge.launchIntent:393-396` 에서 scheme http≠https → `ACTION_VIEW` 외부. APK 내장 config `server.url=https://purplehere.com/pos` |
| ⑦ D4 전제 | **0.2.0 APK 브릿지 실제 내용**: `window.__PURPLE_DESKTOP = { isDesktop:true, platform:'android' }` (22행) + `version` 비동기 채움(52행) → 운영 태블릿에서 배너 조건 성립 |
| ⑧ A 경로 정적 점검 | host 검사: `bridge.config.serverUrl` host `purplehere.com` = 웹 `location.origin` host ✓ · FileProvider `cache-path path="."` 가 `cacheDir/updates/` 포함 ✓ · authority `${applicationId}.fileprovider` = `${packageName}.fileprovider` ✓ · aapt2 versionCode 4 / REQUEST_INSTALL_PACKAGES ✓ · **size 파싱 ✗(§2)** |
| ⑨ 훅 로직 | 60분 메모 공유(배너·Settings 줄 fetch 1회) · `check()` 가 installing/handoff/permission/error 를 덮지 않음 · «나중에» 는 같은 versionName 24h 만 · 브라우저 fetch 0 — 설계 §4-2 와 일치 |

---

## 4. 팀원 결정·이탈 판정

| 이탈 | 판정 |
|---|---|
| `status:'permission'` 을 별도 상태로 둠 (설계는 'available'+문구) | **수용** — 문구만 다른 상태를 상태로 분리한 것, 동작 동일. «다시 시도» 버튼이 재다운로드→설치 시트로 이어짐 ✓ |
| 플러그인 URL 경로 `^/desktop/PurplePOS-x.y.z.apk$` + sha/size 형식 `BAD_FEED` | **수용** — 설계보다 좁힌 것(웹이 아무 파일이나 설치시키지 못하게). 단 size 검사가 §2 결함과 결합해 전멸을 만들었다 — 수정 뒤에는 의도대로 작동 |
| Settings 줄 «✓ Up to date» | **수용** — 텍스트 글리프(✓)는 디자인 규칙 허용 범위 |
| `checkNoHardcodedVersion` 이 `__tests__` 디렉토리 생략 | **수용** — 테스트 픽스처는 번들에 안 들어간다. e2e 는 `src/` 밖이라 원래 스캔 대상 아님 |
| build-release.sh 서명 지문을 0.3.0 에서 apksigner 로 읽어 상수화 | 설계 §5-3 그대로 ✓ |

---

## 5. §7-2(dev 실기기) 생략 제안 — **수용, 조건 2개**

Irene 2026-10-02 원문 「모든 테스트는 실 운영에서」(단말기 때 수용) 와 일관되게 **dev 디버그 앱 실기기 단계는 생략**하고 §7-3(운영 태블릿) 만 한다. 근거: B 경로는 dev 와 운영이 같은 코드·같은 분기이고, 실패해도 배너의 «{{host}}/download 에서 받아 주세요» 보조 줄이 **오늘과 같은 수동 길**을 열어 둔다(더 나빠지지 않음).

조건:
1. **§7-3 에 확인 1개 추가** — 설치 뒤 설정 › 프린터 › Android 카드 줄이 **«앱 버전 0.3.1 · 최신 0.3.1 ✓»** 로 보여야 한다. 이게 실기기에서 피드 읽기 + `appVersionCode`(4=4 → up_to_date) 경로가 산 증거다(e2e 는 흉내였다).
2. **A 경로 첫 실측 = 다음 네이티브 릴리즈(0.3.2) 게이트의 필수 조건.** 그때는 B 가 없으므로(`__NATIVE_UPDATE` 존재→A 분기) A 가 실패하면 배너 error 문구의 수동 /download 로 처리하고, 그 결과를 그 릴리즈 판정에 넣는다. §2 수정이 들어가야 이 조건이 의미가 있다.

---

## 6. 배포 조건 (재빌드·마커 뒤)

1. `/배포` 는 Irene 만. 마이그 0. 배포 7a(추가형 rsync)가 `/desktop/` 의 0.3.1·별칭·피드를 옮긴다 — **배포 뒤 확인**: 운영 `android-latest.json` 이 `application/json` 200 + sha=`PurplePOS-0.3.1.apk` sha · `PurplePOS.apk` sha 동일 · sw.js 5.75.
2. 배포 뒤 **잠깐(7→7a 사이)** 0.2.0 앱이 피드 대신 HTML 을 받을 수 있다 → null → 배너 없음 → 60분/화면 복귀 시 재확인. 정상, 조치 불필요.
3. 마커 뒤 저장소 수정 금지(session-state.md 예외). 판정문 커밋은 배포 후.

## 7. Irene 가 태블릿에서 할 것 (운영, 1회)

1. 운영 태블릿(0.2.0) 앱 열기 → 로그인 화면 우하단 **«Purple POS 새 버전 0.3.1 — 현재 0.2.0 → 0.3.1»** 카드.
2. 「업데이트」 → **Chrome 이 열리고** `PurplePOS-0.3.1.apk` 다운로드 → 알림/하단 「열기」 → (처음 1회) «Chrome 에서 이 출처 허용» 켬 → 「설치」(삭제·재로그인 없음, 같은 서명키 덮어쓰기).
3. 앱 다시 열기 → 배지 `app v0.3.1` → 설정 › 프린터 › Android 카드 줄 **«앱 버전 0.3.1 · 최신 0.3.1 ✓»**.
4. 설정 › 결제 › Card → 단말기 자동 확인/찾기 동작(오늘 일의 원래 목적).
- Chrome 이 안 열리면: 태블릿 Chrome 에서 `purplehere.com/download` → 받기 → 설치(동일 결과). Chrome 이 «열 수 없음» 이라 하면 → D10(nginx `.apk` MIME) 승인 요청으로 넘어온다.

## 8. 한계 (정직)
- F3(http 스킴 → 외부 브라우저)·설치 시트·권한 화면은 **실기기 미검증** — §7 이 첫 실측. 실패 양상별 대응은 §7 끝줄과 설계 §7-2-1.
- A 경로는 §2 수정 뒤에도 정적 점검만 — 첫 실측은 다음 네이티브 릴리즈(§5 조건 2).
- `check-sensitive-diff` ⑤ 는 이 사안 파일이 아니라 0-a 승계 파일에서 났다 — 이번 묶음 자체는 ⚠(안전망 변경 check-desktop-feed) + 신규 네이티브 설치 코드(④ 자기평가) 로 Fable 대상.
