#!/usr/bin/env node
/**
 * 🖥️  DESKTOP FEED GUARD — 윈도우 설치본 배포 무결성
 *
 * 왜 있나 (2026-07-13):
 *   다운로드 CTA 가 프론트에 박힌 버전 상수(`0.1.6`)로 URL 을 만들고 있었다.
 *   운영 피드는 0.1.7 인데 상수는 그대로라 **신규 매장이 구버전을 내려받았다.**
 *   → CTA 는 이제 `/desktop/latest.yml`(electron-updater 가 읽는 그 피드)에서 파일명을
 *     읽고, 못 읽으면 항상-최신 별칭 `/desktop/PurplePOS-Setup.exe` 로 폴백한다.
 *
 *   그래서 이 게이트가 지키는 불변식 3개:
 *     1) 피드가 가리키는 exe 가 실제로 있고 sha512 가 일치한다
 *        (틀리면 자동업데이트가 조용히 실패 — 0.1.2 사가의 재발)
 *     2) 별칭 PurplePOS-Setup.exe 가 그 최신 exe 와 바이트 동일하다
 *        (CTA 폴백이 구버전을 주면 안 된다)
 *     3) 프론트 소스에 설치본 버전이 다시 하드코딩되지 않았다
 *        (상수가 돌아오면 같은 드리프트가 그대로 재발)
 *
 * 대상 = 배포 소스 디렉토리(dev-frontend-build/desktop) — deploy 가 이걸 그대로 rsync 한다.
 * 디렉토리 자체가 없으면 skip (배포 스크립트도 없으면 건너뛴다).
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// 경로 오버라이드는 이 게이트 자신의 회귀 테스트용 (고장을 일부러 만들어 잡히는지 실증).
const DESKTOP_DIR = process.env.DESKTOP_DIR || '/var/www/dev-frontend-build/desktop';
const FRONTEND_SRC = process.env.FRONTEND_SRC || '/var/www/dev-frontend/src';
const ALIAS = 'PurplePOS-Setup.exe';

const failures = [];
const notes = [];

function sha512Base64(file) {
  return crypto.createHash('sha512').update(fs.readFileSync(file)).digest('base64');
}

function checkFeed() {
  const feedPath = path.join(DESKTOP_DIR, 'latest.yml');
  if (!fs.existsSync(feedPath)) {
    failures.push('latest.yml 없음 — 설치본은 있는데 업데이트 피드가 없다 (자동업데이트·CTA 둘 다 깨짐)');
    return;
  }
  const feed = fs.readFileSync(feedPath, 'utf8');
  const version = (feed.match(/^version:\s*(\S+)\s*$/m) || [])[1];
  const file = (feed.match(/^path:\s*(\S+)\s*$/m) || [])[1];
  const sha = (feed.match(/^sha512:\s*(\S+)\s*$/m) || [])[1];

  if (!version || !file || !sha) {
    failures.push('latest.yml 파싱 실패 (version/path/sha512 중 누락) — CTA 가 폴백으로만 동작');
    return;
  }
  notes.push(`피드 버전 ${version} → ${file}`);

  // 1) 피드가 가리키는 exe 실재 + 해시 일치
  const exePath = path.join(DESKTOP_DIR, file);
  if (!fs.existsSync(exePath)) {
    failures.push(`피드가 가리키는 설치본이 없다: ${file} (CTA 404 + 자동업데이트 실패)`);
    return;
  }
  const exeSha = sha512Base64(exePath);
  if (exeSha !== sha) {
    failures.push(`${file} 의 sha512 가 피드와 불일치 — electron-updater 가 조용히 업데이트를 버린다`);
  }

  // 2) 항상-최신 별칭이 그 exe 와 바이트 동일
  const aliasPath = path.join(DESKTOP_DIR, ALIAS);
  if (!fs.existsSync(aliasPath)) {
    failures.push(`${ALIAS} (항상-최신 별칭) 없음 — 피드를 못 읽는 브라우저의 CTA 폴백이 404`);
  } else if (sha512Base64(aliasPath) !== sha) {
    failures.push(`${ALIAS} 이 최신 설치본(${file}) 과 다르다 — CTA 폴백이 구버전을 배포한다`);
  }
}

// 2026-07-23: 안드로이드 APK 커버리지. 이 게이트는 윈도우 exe/피드/별칭만 검사했는데, 매장에 나가는
// 네이티브 앱은 윈도우·안드로이드 둘이다(2026-07-15 안드로이드 CTA 운영 배포). 안드로이드 쪽만 무검사면
// APK 가 빠지거나 프론트 링크와 파일명이 어긋나도 배포가 통과하고, 태블릿 매장은 CTA 404 를 받는다
// (안드로이드는 sideload 라 스토어가 대신 잡아주지도 않는다). exe 와 같은 모델로 막는다.
function checkAndroidApk() {
  // 프론트가 실제로 가리키는 경로를 소스에서 읽는다 — 상수를 손으로 따라가지 않는다(드리프트 차단).
  const ctxFile = path.join(FRONTEND_SRC, 'contexts/PwaInstallContext.tsx');
  let referenced = null;
  if (fs.existsSync(ctxFile)) {
    const m = fs.readFileSync(ctxFile, 'utf8').match(/ANDROID_APP_URL\s*=\s*['"]([^'"]+)['"]/);
    referenced = m ? m[1] : null;
  }
  if (!referenced) {
    notes.push('안드로이드 CTA 상수(ANDROID_APP_URL)를 프론트에서 못 찾음 — APK 검사 skip');
    return;
  }
  const apkName = referenced.replace(/^\/desktop\//, '');
  const apkPath = path.join(DESKTOP_DIR, apkName);

  if (!fs.existsSync(apkPath)) {
    failures.push(`프론트 CTA 가 가리키는 APK 가 없다: ${referenced} — 안드로이드 태블릿 매장이 다운로드 404`);
    return;
  }
  // 실제 APK 인지(ZIP 매직 PK\x03\x04) + 껍데기 아닌지. 빈/잘린 파일이 올라가면 설치 단계에서야 드러난다.
  const fd = fs.openSync(apkPath, 'r');
  const head = Buffer.alloc(4);
  fs.readSync(fd, head, 0, 4, 0);
  fs.closeSync(fd);
  const size = fs.statSync(apkPath).size;
  if (head[0] !== 0x50 || head[1] !== 0x4b) {
    failures.push(`${apkName} 이 APK(ZIP) 형식이 아니다 — 설치 불가 파일이 배포된다`);
  } else if (size < 1024 * 1024) {
    failures.push(`${apkName} 크기가 비정상(${Math.round(size / 1024)}KB) — 잘린 빌드로 보인다`);
  } else {
    notes.push(`안드로이드 APK ${apkName} (${(size / 1048576).toFixed(1)}MB)`);
  }

  // 별칭이 최신 버전본과 바이트 동일한지 — exe 별칭과 같은 사고(구버전 배포) 방지.
  const versioned = fs.readdirSync(DESKTOP_DIR)
    .filter((f) => /^PurplePOS-\d+\.\d+\.\d+\.apk$/.test(f))
    .sort((a, b) => {
      const v = (s) => s.match(/(\d+)\.(\d+)\.(\d+)/).slice(1, 4).map(Number);
      const [a1, a2, a3] = v(a); const [b1, b2, b3] = v(b);
      return a1 - b1 || a2 - b2 || a3 - b3;
    });
  if (versioned.length) {
    const latest = versioned[versioned.length - 1];
    if (sha512Base64(path.join(DESKTOP_DIR, latest)) !== sha512Base64(apkPath)) {
      failures.push(`${apkName}(CTA 별칭) 이 최신 APK(${latest}) 와 다르다 — 매장이 구버전을 받는다`);
    } else {
      notes.push(`APK 별칭 = ${latest} (바이트 동일)`);
    }
  }
}

function checkNoHardcodedVersion() {
  // 프론트가 버전이 붙은 설치본 파일명을 스스로 만들면(리터럴이든 템플릿이든) 드리프트가 재발한다.
  //   금지: 'PurplePOS-Setup-0.1.6.exe' · `PurplePOS-Setup-${VER}.exe`
  //   허용: '/desktop/PurplePOS-Setup.exe' (항상-최신 별칭) · 피드에서 읽은 파일명
  // ⚠ 옛 회귀는 템플릿 리터럴이었다 — "대시 뒤 숫자"만 보면 정확히 그 버그를 놓친다
  //   (이 게이트의 첫 판이 실제로 놓쳤고, 고장 주입 테스트에서 잡혔다).
  const hits = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) { walk(p); continue; }
      if (!/\.(ts|tsx|js|jsx)$/.test(entry.name)) continue;
      const src = fs.readFileSync(p, 'utf8');
      src.split('\n').forEach((line, i) => {
        // 주석(설명·이력)은 허용 — 코드에서 파일명을 조립하는 것만 잡는다
        const isComment = /^\s*(\/\/|\*|\/\*)/.test(line);
        if (!isComment && /PurplePOS-Setup-/.test(line)) {
          hits.push(`${path.relative(FRONTEND_SRC, p)}:${i + 1}`);
        }
      });
    }
  };
  walk(FRONTEND_SRC);
  if (hits.length) {
    failures.push(
      `프론트에 설치본 버전이 하드코딩됐다 (${hits.join(', ')}) — 피드에서 읽어야 한다. ` +
      '상수는 릴리즈마다 손으로 따라가야 해서 반드시 어긋난다 (2026-07-13 회귀).'
    );
  }
}

function main() {
  const quiet = process.argv.includes('--quiet');
  if (!quiet) console.log('\n🖥️  DESKTOP FEED GUARD — 윈도우 설치본 배포 무결성\n');

  if (!fs.existsSync(DESKTOP_DIR)) {
    if (!quiet) console.log('   설치본 디렉토리 없음 — skip (배포도 건너뛴다)\n');
    process.exit(0);
  }

  checkFeed();
  checkAndroidApk();
  checkNoHardcodedVersion();

  if (failures.length) {
    console.error('\n✗ DESKTOP FEED GUARD 실패\n');
    failures.forEach((f) => console.error(`   • ${f}`));
    console.error('');
    process.exit(1);
  }

  if (!quiet) {
    notes.forEach((n) => console.log(`   ${n}`));
    console.log('   ✓ 피드 ↔ 설치본 sha512 일치');
    console.log(`   ✓ ${ALIAS} = 최신 설치본과 바이트 동일`);
    console.log('   ✓ 프론트에 버전 하드코딩 없음\n');
  }
  console.log('✓ DESKTOP FEED GUARD 통과');
  process.exit(0);
}

main();
