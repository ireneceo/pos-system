#!/usr/bin/env node
/**
 * 고아(미사용) 상품 이미지 정리 스크립트
 *
 * /uploads/products/ (+ thumbnails) 에서 어떤 product 의 image/image_thumbnail 도
 * 참조하지 않는 파일을 찾아 정리한다.
 *
 * 안전장치:
 *   - 기본은 DRY-RUN (목록만 출력, 삭제 안 함). 실제 삭제는 --delete 필요.
 *   - 나이 가드: 최근 업로드(기본 7일 이내)는 건너뜀 — 저장 직후 DB 반영 전 레이스 방지.
 *   - DB 의 image/image_thumbnail(평문 URL + 레거시 JSON) 전부를 참조집합으로 수집.
 *   - /uploads/brand-menus/ 등 BG 공유자산 디렉토리는 대상 아님(products 만).
 *
 * 사용:
 *   node scripts/sweep-orphan-images.js              # dry-run, 7일 가드
 *   node scripts/sweep-orphan-images.js --delete     # 실제 삭제
 *   node scripts/sweep-orphan-images.js --days=30    # 30일 지난 고아만
 */

const fs = require('fs');
const path = require('path');
const { sequelize } = require('../config/database');

const PRODUCTS_DIR = '/var/www/uploads/products';
const THUMB_DIR = '/var/www/uploads/products/thumbnails';

const args = process.argv.slice(2);
const DO_DELETE = args.includes('--delete');
const daysArg = args.find(a => a.startsWith('--days='));
const MIN_AGE_DAYS = daysArg ? parseInt(daysArg.split('=')[1], 10) : 7;

function collectUrls(value, set) {
  if (!value || typeof value !== 'string') return;
  if (value.startsWith('/uploads/')) { set.add(value); return; }
  if (value.startsWith('{') || value.startsWith('[')) {
    try {
      const parsed = JSON.parse(value);
      const vals = Array.isArray(parsed) ? parsed : Object.values(parsed);
      vals.forEach(v => typeof v === 'string' && v.startsWith('/uploads/') && set.add(v));
    } catch { /* ignore */ }
  }
}

function listFiles(dir) {
  try {
    return fs.readdirSync(dir)
      .filter(f => {
        try { return fs.statSync(path.join(dir, f)).isFile(); } catch { return false; }
      });
  } catch { return []; }
}

(async () => {
  try {
    // 1) DB 가 참조하는 모든 product 이미지 URL 수집
    const [rows] = await sequelize.query(
      "SELECT image, image_thumbnail FROM products WHERE image IS NOT NULL AND image != ''"
    );
    const referenced = new Set();
    for (const r of rows) {
      collectUrls(r.image, referenced);
      collectUrls(r.image_thumbnail, referenced);
    }

    // 2) 디스크 파일 → URL 매핑 후 고아 판별
    const now = Date.now();
    const ageMs = MIN_AGE_DAYS * 24 * 60 * 60 * 1000;
    const orphans = [];
    let skippedYoung = 0;
    let totalSize = 0;

    const scan = (dir, urlPrefix) => {
      for (const f of listFiles(dir)) {
        const url = urlPrefix + f;
        if (referenced.has(url)) continue;
        const full = path.join(dir, f);
        let stat;
        try { stat = fs.statSync(full); } catch { continue; }
        if (now - stat.mtimeMs < ageMs) { skippedYoung++; continue; }
        orphans.push({ url, full, size: stat.size });
        totalSize += stat.size;
      }
    };
    scan(PRODUCTS_DIR, '/uploads/products/');
    scan(THUMB_DIR, '/uploads/products/thumbnails/');

    // 3) 출력 / 삭제
    console.log(`[sweep-orphan-images] mode=${DO_DELETE ? 'DELETE' : 'DRY-RUN'} age-guard=${MIN_AGE_DAYS}d`);
    console.log(`DB 참조 URL: ${referenced.size} | 고아: ${orphans.length} (${Math.round(totalSize / 1024)}KB) | 나이가드로 건너뜀: ${skippedYoung}`);

    if (orphans.length === 0) {
      console.log('정리할 고아 없음.');
      process.exit(0);
    }

    orphans.slice(0, 50).forEach(o => console.log(`  ${DO_DELETE ? 'DEL ' : 'orphan '} ${o.url} (${Math.round(o.size / 1024)}KB)`));
    if (orphans.length > 50) console.log(`  ... 외 ${orphans.length - 50}건`);

    if (DO_DELETE) {
      let deleted = 0;
      for (const o of orphans) {
        try { fs.unlinkSync(o.full); deleted++; } catch (e) { console.error(`  실패 ${o.url}: ${e.message}`); }
      }
      console.log(`삭제 완료: ${deleted}/${orphans.length}`);
    } else {
      console.log('\n실제 삭제하려면: node scripts/sweep-orphan-images.js --delete');
    }
    process.exit(0);
  } catch (e) {
    console.error('sweep-orphan-images error:', e.message);
    process.exit(1);
  }
})();
