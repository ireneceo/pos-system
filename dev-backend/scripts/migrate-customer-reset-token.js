#!/usr/bin/env node
/**
 * Migration — customers 비밀번호 재설정 링크를 DB 에 보관 (2026-11-02)
 *
 * 배경: 손님(모바일 회원) 비밀번호 찾기 링크 정보가 routes/customers-auth.js 의 메모리 Map 에만 있었다.
 *       서버가 재시작되면(배포마다) 그 전에 보낸 링크가 전부 «Invalid or expired» 로 실패했다.
 *       Irene «권고대로 진행해 줘»(A — DB 저장).
 *
 * 추가 칸(없을 때만):
 *   reset_token_hash    CHAR(64)   — 링크 토큰의 sha256(원문은 저장 안 함) · 인덱스
 *   reset_token_expires DATETIME   — 만료(발급 + 1시간)
 *   reset_token_slug    VARCHAR(255) — 링크를 보낸 매장 주소(slug) — 재설정 뒤 돌아갈 곳
 *
 * Usage: node scripts/migrate-customer-reset-token.js [--dry-run]
 * 멱등: 칸·인덱스가 이미 있으면 skip.
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const DRY = process.argv.includes('--dry-run');
const log = (m) => console.log(`[migrate-customer-reset-token]${DRY ? ' [DRY]' : ''} ${m}`);

const COLS = [
  ['reset_token_hash', 'CHAR(64) NULL'],
  ['reset_token_expires', 'DATETIME NULL'],
  ['reset_token_slug', 'VARCHAR(255) NULL'],
];

(async () => {
  try {
    for (const [name, def] of COLS) {
      const has = await sequelize.query(
        `SELECT 1 FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'customers' AND column_name = :c`,
        { type: QueryTypes.SELECT, replacements: { c: name } });
      if (has.length) { log(`skip — customers.${name} 있음`); continue; }
      const sql = `ALTER TABLE customers ADD COLUMN ${name} ${def}`;
      log(sql);
      if (!DRY) await sequelize.query(sql);
    }
    const idx = await sequelize.query(
      `SELECT 1 FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = 'customers' AND index_name = 'idx_customers_reset_token_hash'`,
      { type: QueryTypes.SELECT });
    if (idx.length) log('skip — 인덱스 있음');
    else {
      const sql = 'CREATE INDEX idx_customers_reset_token_hash ON customers (reset_token_hash)';
      log(sql);
      if (!DRY) await sequelize.query(sql);
    }
    log('✓ done');
    process.exit(0);
  } catch (e) {
    console.error('[migrate-customer-reset-token] ✗', e.message);
    process.exit(1);
  }
})();
