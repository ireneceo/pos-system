#!/usr/bin/env node
/**
 * 콘텐츠 종류에 'docs'(안내 문서) 추가 · expand-only · 멱등 (2026-10-04)
 *
 * Irene 「Docs에 필요한 안내 내용들 이렇게 안내페이지들 넣는 거 구성해야 하는데」 — 블로그·FAQ 와 같은
 * 관리 화면에서 쓰고 `/docs` 에 보인다. 새 표를 만들지 않고 contents·content_categories 의 type 에 값 하나만 더한다.
 * 이 스크립트는 'docs' 만 보장한다(남의 값은 나열하지 않는다 — CLAUDE.md ENUM 규칙).
 * 되돌리기: 'docs' 행이 0 일 때만 ENUM 에서 빼도 안전하다. 행이 있으면 빼지 말 것(값이 '' 로 바뀐다).
 */
require('dotenv/config');
const { sequelize } = require('../config/database');
const { expandEnum } = require('./lib/enumExpand');

const TAG = '[migrate-content-type-docs]';

(async () => {
  try {
    for (const [table, column] of [['contents', 'type'], ['content_categories', 'type']]) {
      const r = await expandEnum(sequelize, table, column, ['docs']);
      console.log(`${TAG} ${table}.${column}: ${r.added.length ? `추가 ${r.added.join(',')}` : '이미 있음'} → (${r.current.join(',')})`);
    }
    await sequelize.close();
    process.exit(0);
  } catch (e) {
    console.error(`${TAG} 실패:`, e.message);
    try { await sequelize.close(); } catch {}
    process.exit(1);
  }
})();
