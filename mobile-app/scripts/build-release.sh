#!/usr/bin/env bash
# 안드로이드 정식 앱 릴리즈 빌드 — Google Play AAB + 사이드로드 APK (2026-10-12 Play 등록 설계 §6 · /var/www/.claude/fable-design-20261012-play-store.md)
# (처음 만든 것: 2026-10-04 · Fable 설계 .claude/fable-design-20261004-android-update.md §5-3 — 피드는 이 스크립트만 만든다, 손 편집 금지)
# 규칙: 네이티브 파일이 하나라도 바뀌면 build.gradle versionCode +1 · versionName 을 올린 뒤 이 스크립트를 돌린다.
#       웹만 바뀌면 앱을 만들지 않는다(화면은 SW 가 자동 갱신).
#
# 사용:
#   build-release.sh                → AAB·APK 를 dev-apps/ 에만 둔다(Play 업로드용 · 운영에 안 간다)
#   build-release.sh --publish-feed → 새로 빌드하지 않고, 이미 만든 dev-apps/PurplePOS-<버전>.apk 를 desktop/ 피드에 올린다
#                                     (Play 에 올린 AAB 와 같은 빌드의 APK — 버전·서명이 Play 본과 같다)
#       ⚠ desktop/ 은 /배포 때 운영으로 복사된다. «Play 에서 업데이트» 안내가 Play 게시 전에 뜨지 않게,
#         새 버전 피드는 Play 프로덕션 게시(스토어 주소 200) 뒤에만 --publish-feed 로 올린다(설계 §3·§9).
set -euo pipefail
ROOT=/var/www/mobile-app
DEVAPPS=/var/www/dev-frontend-build/dev-apps
OUT=/var/www/dev-frontend-build/desktop
PUBLISH_FEED=0
[ "${1:-}" = "--publish-feed" ] && PUBLISH_FEED=1
# 0.2.0 부터 같은 키여야 덮어 설치된다 — 다르면 전 매장 «앱이 설치되지 않음» 으로 조용히 실패한다.
# Play App Signing 에도 이 키를 앱 서명 키로 올린다(설계 D1) — Play 본과 사이드로드 APK 가 서로 덮어쓴다.
EXPECTED_SIGNER_SHA256="b55813cfcb362672371d4d4ee39ee034274b9a9b9b64437a694d373f45801eb8"
BT=/opt/android-sdk/build-tools/36.0.0
APKSIGNER=$BT/apksigner
AAPT2=$BT/aapt2
EXPECT_TARGET=36
EXPECT_MIN=24

# 툴체인은 mobile-app/.toolchain 에만(전역 무변경, 설계 D4) — Capacitor 8 = Node 22+ · JDK 21
[ -x "$ROOT/.toolchain/node22/bin/node" ] || { echo "✗ Node 22 없음 — $ROOT/.toolchain/node22 (설계 D4)"; exit 1; }
[ -x "$ROOT/.toolchain/jdk21/bin/java" ] || { echo "✗ JDK 21 없음 — $ROOT/.toolchain/jdk21 (설계 D4)"; exit 1; }
[ -x "$AAPT2" ] || { echo "✗ build-tools 36.0.0 없음 — sdkmanager \"build-tools;36.0.0\""; exit 1; }
export PATH="$ROOT/.toolchain/node22/bin:$ROOT/.toolchain/jdk21/bin:$PATH"
export JAVA_HOME="$ROOT/.toolchain/jdk21"

VN=$(grep -oP 'versionName\s+"\K[^"]+' "$ROOT/android/app/build.gradle" | head -1)
VC=$(grep -oP 'versionCode\s+\K\d+' "$ROOT/android/app/build.gradle" | head -1)
echo "▶ PurplePOS $VN (versionCode $VC)"
[ -f "$ROOT/android/keystore.properties" ] || { echo "✗ keystore.properties 없음 — 미서명 빌드는 올리지 않는다"; exit 1; }
if [ "$PUBLISH_FEED" = 1 ]; then
  APK="$DEVAPPS/PurplePOS-$VN.apk"
  [ -f "$APK" ] || { echo "✗ $APK 없음 — 먼저 build-release.sh(인자 없이)로 이 버전을 빌드한다"; exit 1; }
  "$APKSIGNER" verify --print-certs "$APK" | grep -qi "SHA-256 digest: $EXPECTED_SIGNER_SHA256" || { echo "✗ APK 서명 지문 불일치. 중단"; exit 1; }
  "$AAPT2" dump badging "$APK" | grep -q "^package: name='com.purplehere.pos.mobile' versionCode='$VC'" || { echo "✗ dev-apps APK 의 versionCode 가 build.gradle($VC) 과 다르다"; exit 1; }
  [ -e "$OUT/PurplePOS-$VN.apk" ] && { echo "✗ desktop/PurplePOS-$VN.apk 가 이미 있다"; exit 1; }
  cp "$APK" "$OUT/PurplePOS-$VN.apk"
  cp "$APK" "$OUT/PurplePOS.apk"
  SHA=$(sha256sum "$OUT/PurplePOS-$VN.apk" | cut -d' ' -f1)
  SIZE=$(stat -c%s "$OUT/PurplePOS-$VN.apk")
  DATE=$(date -u +%FT%T.000Z)
  printf '{\n  "versionName": "%s",\n  "versionCode": %s,\n  "file": "PurplePOS-%s.apk",\n  "sha256": "%s",\n  "size": %s,\n  "minSdk": %s,\n  "releaseDate": "%s",\n  "signerSha256": "%s"\n}\n' \
    "$VN" "$VC" "$VN" "$SHA" "$SIZE" "$EXPECT_MIN" "$DATE" "$EXPECTED_SIGNER_SHA256" > "$OUT/android-latest.json"
  echo "✓ $OUT/PurplePOS-$VN.apk · PurplePOS.apk · android-latest.json (sha $SHA) — 다음 /배포 때 운영에 간다"
  cd /var/www/dev-backend && node scripts/check-desktop-feed.js
  exit 0
fi

[ -e "$DEVAPPS/PurplePOS-$VN.aab" ] && { echo "✗ PurplePOS-$VN.aab 가 이미 있다 — 버전을 올리지 않고 다시 빌드하지 않는다(Play 는 같은 versionCode 를 두 번 받지 않는다)"; exit 1; }

bash /var/www/scripts/heavy-task-gate.sh build
cd "$ROOT" && PURPLE_APP_URL=https://purplehere.com/pos npx cap sync android
cd "$ROOT/android" && ./gradlew --no-daemon -Dorg.gradle.jvmargs=-Xmx1536m bundleRelease assembleRelease \
  -x lintVitalAnalyzeRelease -x lintVitalReportRelease -x lintVitalRelease
APK="$ROOT/android/app/build/outputs/apk/release/app-release.apk"
AAB="$ROOT/android/app/build/outputs/bundle/release/app-release.aab"

# ── Play 사전검사 (fail-closed) — 소스가 아니라 빌드가 만든 것을 본다 ──
# AAB 안 매니페스트는 protobuf 라 aapt2 로 못 읽는다 → 같은 빌드의 APK 로 판정, AAB 는 서명만 따로 확인.
FAIL=0
BADGING=$("$AAPT2" dump badging "$APK")
echo "$BADGING" | grep -q "^package: name='com.purplehere.pos.mobile' versionCode='$VC'" || { echo "✗ 패키지 이름/versionCode 불일치"; FAIL=1; }
echo "$BADGING" | grep -q "^targetSdkVersion:'$EXPECT_TARGET'" || { echo "✗ targetSdk 가 $EXPECT_TARGET 이 아니다 — Play 제출 불가(2026-08-31 부터 36 의무)"; FAIL=1; }
echo "$BADGING" | grep -q "^minSdkVersion:'$EXPECT_MIN'\|^sdkVersion:'$EXPECT_MIN'" || { echo "✗ minSdk 가 $EXPECT_MIN 이 아니다"; FAIL=1; }
PERMS=$("$AAPT2" dump permissions "$APK")
echo "$PERMS" | grep -q "REQUEST_INSTALL_PACKAGES" && { echo "✗ REQUEST_INSTALL_PACKAGES 가 있다 — Play 정책상 자가 업데이트 금지(설계 D3)"; FAIL=1; }
echo "$PERMS" | grep -q "name='android.permission.BLUETOOTH_CONNECT'" || { echo "✗ BLUETOOTH_CONNECT 가 없다 — 블루투스 인쇄가 죽는다"; FAIL=1; }
MANI=$("$AAPT2" dump xmltree --file AndroidManifest.xml "$APK")
echo "$MANI" | grep -q 'android:allowBackup.*=false' || { echo "✗ allowBackup 이 false 가 아니다 — 토큰·프린터 설정이 Google 백업에 실린다(설계 D8)"; FAIL=1; }
echo "$BADGING" | grep -q "uses-feature-not-required: name='android.hardware.bluetooth'" || { echo "✗ 블루투스가 «필수» 로 잡혔다 — 블루투스 없는 태블릿에서 Play 가 앱을 숨긴다"; FAIL=1; }
[ "$FAIL" = 0 ] || { echo "✗ Play 사전검사 실패 — 산출물을 내보내지 않는다"; exit 1; }
echo "✓ Play 사전검사: target $EXPECT_TARGET · min $EXPECT_MIN · code $VC · 설치권한 없음 · BT 연결권한 · allowBackup=false · BT 선택"

# 서명 — APK 는 apksigner, AAB 는 jarsigner(apksigner 는 AAB 를 못 읽는다)
"$APKSIGNER" verify --print-certs "$APK" | grep -qi "SHA-256 digest: $EXPECTED_SIGNER_SHA256" \
  || { echo "✗ APK 서명 지문 불일치 — 전 매장 설치 거부. 중단"; exit 1; }
AAB_SHA=$("$JAVA_HOME/bin/keytool" -printcert -jarfile "$AAB" | grep -oP 'SHA256: \K[0-9A-F:]+' | head -1 | tr -d ':' | tr 'A-F' 'a-f')
[ "$AAB_SHA" = "$EXPECTED_SIGNER_SHA256" ] || { echo "✗ AAB 서명 지문 불일치($AAB_SHA) — Play 업로드 거부. 중단"; exit 1; }
"$JAVA_HOME/bin/jarsigner" -verify "$AAB" | grep -q "jar verified" || { echo "✗ AAB 서명 검증 실패"; exit 1; }
unzip -p "$APK" assets/public/nativePrintBridge.js | cmp - "$ROOT/src/nativePrintBridge.js" \
  || { echo "✗ APK 안 브릿지가 src/nativePrintBridge.js 와 다르다(cap sync 확인)"; exit 1; }
echo "✓ 서명: APK·AAB 모두 $EXPECTED_SIGNER_SHA256"

# Play 업로드용 — dev-apps/ 는 개발서버에만 있다(운영 배포는 새 빌드 산출물만 보내고 dev-frontend-build 를 안 보낸다)
cp "$AAB" "$DEVAPPS/PurplePOS-$VN.aab"
cp "$APK" "$DEVAPPS/PurplePOS-$VN.apk"
echo "✓ $DEVAPPS/PurplePOS-$VN.aab  sha256 $(sha256sum "$DEVAPPS/PurplePOS-$VN.aab" | cut -d' ' -f1)"
echo "  내려받기: https://dev.purplehere.com/dev-apps/PurplePOS-$VN.aab"
echo "  커밋: $(git -C /var/www rev-parse HEAD) — mobile-app/docs/ANDROID_APP_DESIGN.md §10 릴리즈 기록에 적는다(작업 폴더에 미커밋 변경이 있으면 그것도 적는다)"

echo "· 피드(desktop/)는 그대로 — Play 프로덕션 게시 뒤 build-release.sh --publish-feed"
