#!/usr/bin/env node
/**
 * Migration — 문의 종류에 'card_terminal'(GHL 카드단말기 신청) 한 값 추가 (2026-11-09)
 * 설계: .claude/fable-design-20261109-ghl-terminal-promo.md §3-2
 *
 * ⛔ MODIFY ... ENUM(하드코딩 목록) 금지 — expandEnum 으로 내가 담당하는 값만 더한다.
 * 멱등: 이미 있으면 건너뜀. 행 데이터 무접촉. process.exit 필수.
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
const { expandEnum } = require('./lib/enumExpand');

(async () => {
  try {
    const r = await expandEnum(sequelize, 'contact_inquiries', 'inquiry_type', ['card_terminal']);
    if (r.added.length) console.log(`  ✓ contact_inquiries.inquiry_type += ${r.added.join(', ')}`);
    else console.log('  · contact_inquiries.inquiry_type 이미 최신 (건너뜀)');
    console.log(`    현재 값: ${r.current.join(', ')}`);
    process.exit(0);
  } catch (e) {
    console.error('  ✗ migrate-contact-inquiry-type-card-terminal 실패:', e.message);
    process.exit(1);
  }
})();
