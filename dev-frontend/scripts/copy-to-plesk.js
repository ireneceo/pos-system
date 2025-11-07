const fs = require('fs-extra');
const path = require('path');

/**
 * Plesk 서버 배포용 파일 복사 스크립트
 * React 빌드 파일들을 httpdocs 루트로 복사하여 올바른 경로에서 접근 가능하도록 설정
 */

const buildDir = path.join(__dirname, '..', 'build');
const rootDir = path.join(__dirname, '..', '..');

console.log('🚀 Plesk 서버 배포 파일 복사 시작...');

async function copyForPlesk() {
  try {
    // 빌드 디렉토리 존재 확인
    if (!fs.existsSync(buildDir)) {
      console.error('❌ build 디렉토리가 존재하지 않습니다. 먼저 npm run build를 실행하세요.');
      process.exit(1);
    }

    // 1. index.html을 루트로 복사
    const indexSource = path.join(buildDir, 'index.html');
    const indexDest = path.join(rootDir, 'index.html');

    if (fs.existsSync(indexSource)) {
      await fs.copy(indexSource, indexDest);
      console.log('✅ index.html → 루트 디렉토리 복사 완료');
    }

    // 2. static 폴더를 루트의 static으로 복사
    const staticSource = path.join(buildDir, 'static');
    const staticDest = path.join(rootDir, 'static');

    if (fs.existsSync(staticSource)) {
      // 기존 static 폴더 제거 후 복사
      if (fs.existsSync(staticDest)) {
        await fs.remove(staticDest);
      }
      await fs.copy(staticSource, staticDest);
      console.log('✅ static/ → 루트/static/ 복사 완료');
    }

    // 3. 기타 에셋 파일들 복사 (manifest.json, favicon.ico 등)
    const buildFiles = await fs.readdir(buildDir);
    for (const file of buildFiles) {
      if (file !== 'index.html' && file !== 'static') {
        const sourceFile = path.join(buildDir, file);
        const destFile = path.join(rootDir, file);

        const stat = await fs.stat(sourceFile);
        if (stat.isFile()) {
          await fs.copy(sourceFile, destFile);
          console.log(`✅ ${file} → 루트 디렉토리 복사 완료`);
        }
      }
    }

    // 4. .htaccess 파일 생성 (React Router 지원)
    const htaccessContent = `
# React Router 지원을 위한 설정
<IfModule mod_rewrite.c>
  RewriteEngine On

  # Handle Angular and React Router
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# 캐시 설정
<IfModule mod_expires.c>
  ExpiresActive on
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
`.trim();

    const htaccessPath = path.join(rootDir, '.htaccess');
    await fs.writeFile(htaccessPath, htaccessContent);
    console.log('✅ .htaccess 파일 생성 완료');

    console.log('\n🎉 Plesk 서버 배포 파일 복사가 완료되었습니다!');
    console.log('📁 파일 구조:');
    console.log('   / (루트)');
    console.log('   ├── index.html       (React 앱 엔트리포인트)');
    console.log('   ├── static/          (CSS, JS, 이미지 등)');
    console.log('   ├── .htaccess         (React Router 지원)');
    console.log('   ├── frontend/         (원본 소스코드)');
    console.log('   └── backend/          (API 서버)');

  } catch (error) {
    console.error('❌ 파일 복사 중 오류가 발생했습니다:', error);
    process.exit(1);
  }
}

copyForPlesk();