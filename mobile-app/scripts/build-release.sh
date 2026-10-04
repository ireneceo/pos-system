#!/usr/bin/env bash
# 안드로이드 정식 앱 릴리즈 빌드 + 업데이트 피드 생성 (2026-10-04 · Fable 설계 .claude/fable-design-20261004-android-update.md §5-3)
# 메모리에 손으로 적혀 있던 명령을 스크립트로 — 피드(android-latest.json)는 이 스크립트만 만든다(손 편집 금지).
# 규칙: 네이티브 파일이 하나라도 바뀌면 build.gradle versionCode +1 · versionName patch +1 후 이 스크립트를 돌린다.
#       웹만 바뀌면 APK 를 만들지 않는다(화면은 SW 가 자동 갱신).
set -euo pipefail
ROOT=/var/www/mobile-app
OUT=/var/www/dev-frontend-build/desktop
# 0.2.0·0.3.0 과 같은 키여야 덮어 설치된다 — 다르면 전 매장 «앱이 설치되지 않음» 으로 조용히 실패한다
EXPECTED_SIGNER_SHA256="b55813cfcb362672371d4d4ee39ee034274b9a9b9b64437a694d373f45801eb8"
APKSIGNER=/opt/android-sdk/build-tools/35.0.0/apksigner

VN=$(grep -oP 'versionName\s+"\K[^"]+' "$ROOT/android/app/build.gradle" | head -1)
VC=$(grep -oP 'versionCode\s+\K\d+' "$ROOT/android/app/build.gradle" | head -1)
echo "▶ PurplePOS $VN (versionCode $VC)"
[ -f "$ROOT/android/keystore.properties" ] || { echo "✗ keystore.properties 없음 — 미서명 빌드는 올리지 않는다"; exit 1; }
[ -e "$OUT/PurplePOS-$VN.apk" ] && { echo "✗ PurplePOS-$VN.apk 가 이미 있다 — 버전을 올리지 않고 다시 빌드하지 않는다"; exit 1; }

cd "$ROOT" && PURPLE_APP_URL=https://purplehere.com/pos npx cap sync android
cd "$ROOT/android" && ./gradlew assembleRelease -x lintVitalAnalyzeRelease -x lintVitalReportRelease -x lintVitalRelease
APK="$ROOT/android/app/build/outputs/apk/release/app-release.apk"

"$APKSIGNER" verify --print-certs "$APK" | grep -qi "SHA-256 digest: $EXPECTED_SIGNER_SHA256" \
  || { echo "✗ 서명 지문 불일치 — 전 매장 설치 거부. 중단"; exit 1; }
unzip -p "$APK" assets/public/nativePrintBridge.js | cmp - "$ROOT/src/nativePrintBridge.js" \
  || { echo "✗ APK 안 브릿지가 src/nativePrintBridge.js 와 다르다(cap sync 확인)"; exit 1; }

cp "$APK" "$OUT/PurplePOS-$VN.apk"
cp "$APK" "$OUT/PurplePOS.apk"
SHA=$(sha256sum "$OUT/PurplePOS-$VN.apk" | cut -d' ' -f1)
SIZE=$(stat -c%s "$OUT/PurplePOS-$VN.apk")
DATE=$(date -u +%FT%T.000Z)
printf '{\n  "versionName": "%s",\n  "versionCode": %s,\n  "file": "PurplePOS-%s.apk",\n  "sha256": "%s",\n  "size": %s,\n  "minSdk": 22,\n  "releaseDate": "%s",\n  "signerSha256": "%s"\n}\n' \
  "$VN" "$VC" "$VN" "$SHA" "$SIZE" "$DATE" "$EXPECTED_SIGNER_SHA256" > "$OUT/android-latest.json"
echo "✓ $OUT/PurplePOS-$VN.apk · PurplePOS.apk · android-latest.json (sha $SHA)"

cd /var/www/dev-backend && node scripts/check-desktop-feed.js
