#!/usr/bin/env node
/**
 * migrate-company-logo-to-file.js — 회사 설정 로고(그림 글자 base64) → 파일 주소 (멱등 · 매 배포)
 *
 * 왜: company_settings.company_logo · logo 가 base64 로 남아 있으면 인보이스 목록 응답에
 *   송장 한 줄마다 복제된다(getIssuerCompanyInfo → issuerInfo.logoUrl). 2026-08-23 실측 57배,
 *   송장이 매달 쌓이며 커진다 — 2026-11-08 Irene «인보이스 목록이 안나와».
 *   저장 경로(routes/admin-settings.js)는 같은 날 파일로 바꿨다. 이 스크립트는 이미 들어 있는 값만 옮긴다.
 * 멱등: data:image/ 로 시작하는 값만 대상 — 이미 /uploads/ 주소면 건너뜀.
 * 실행: node scripts/migrate-company-logo-to-file.js [--dry-run]
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
const { saveImageToFile } = require('../utils/imageProcessor');

const DRY = process.argv.includes('--dry-run');
const COLS = [
  { col: 'company_logo', file: 'company-logo' },
  { col: 'logo', file: 'logo-legacy' },
  { col: 'brand_logo', file: 'brand-logo' }
];

(async () => {
  const [rows] = await sequelize.query(
    `SELECT id, ${COLS.map(c => c.col).join(', ')} FROM company_settings`
  );
  let moved = 0, failed = 0;
  for (const r of rows) {
    const done = new Map(); // 같은 그림이 두 칸에 있으면 파일 하나
    for (const { col, file } of COLS) {
      const v = r[col];
      if (!v || typeof v !== 'string' || !v.startsWith('data:image/')) continue;
      const kb = Math.round(v.length / 1024);
      if (DRY) { console.log(`[dry] company_settings#${r.id}.${col} ${kb}KB → /uploads/logos/${file}.*`); moved++; continue; }
      let url = done.get(v);
      if (!url) {
        url = await saveImageToFile(v, r.id === 1 ? file : `${file}-${r.id}`, { maxWidth: 400, maxHeight: 400 });
        if (!url) { console.warn(`[warn] company_settings#${r.id}.${col} — 그림을 읽지 못함(그대로 둠)`); failed++; continue; }
        done.set(v, url);
      }
      const [res] = await sequelize.query(
        `UPDATE company_settings SET ${col} = ? WHERE id = ? AND ${col} LIKE 'data:image/%'`,
        { replacements: [url, r.id] }
      );
      console.log(`[ok] company_settings#${r.id}.${col} ${kb}KB → ${url} (affected ${res.affectedRows ?? '?'})`);
      moved++;
    }
  }
  console.log(`company logo → file: ${DRY ? 'would move' : 'moved'} ${moved} · failed ${failed}`);
  // 못 옮긴 그림은 그대로 두는 게 무해하다(크기 문제일 뿐) — 배포를 막지 않게 경고만 남기고 0 으로 끝낸다(Fable 게이트 R4).
  if (failed) console.warn('[migrate-company-logo-to-file] WARN: 옮기지 못한 칸은 base64 그대로 둠');
  process.exit(0);
})().catch(e => { console.error('[migrate-company-logo-to-file] ' + e.message); process.exit(1); });
