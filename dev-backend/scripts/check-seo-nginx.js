#!/usr/bin/env node
/**
 * 마케팅 주소 목록 대조 — config/seoPages.js STATIC_PAGES ↔ nginx 설정 (2026-09-24 SEO C1)
 *
 * 왜: nginx 는 JS 목록을 읽을 수 없어 마케팅 주소를 정규식으로 따로 적는다(목록이 두 벌이 되는 유일한 자리).
 *     랜딩 페이지를 더하고 nginx 를 안 고치면 그 페이지는 조용히 «내용 없는 HTML» 로 돌아가고,
 *     nginx 에만 더하면 백엔드가 404 를 준다. 둘 다 눈에 안 띄므로 기계로 대조한다.
 * 무엇을: docs/ 의 개발·운영 nginx 초안에서 `location ~ ^/(?:…)$` 줄의 주소를 뽑아 STATIC_PAGES('/' 제외)와 비교,
 *         `location = /` 과 `(?:blog|news)/[^/]+` 가 있는지도 본다.
 * 사용: node scripts/check-seo-nginx.js   (다르면 exit 1)
 */
const fs = require('fs');
const path = require('path');
const { STATIC_PAGES } = require('../config/seoPages');

const DOCS = path.resolve(__dirname, '../../docs');
const FILES = ['nginx-dev.purplehere.com.noindex.conf', 'nginx-purplehere.com.conf'];
const want = STATIC_PAGES.map((p) => p.loc).filter((l) => l !== '/').sort();

let bad = 0;
for (const f of FILES) {
  const conf = fs.readFileSync(path.join(DOCS, f), 'utf8');
  const m = conf.match(/location ~ \^\/\(\?:([^\n]*)\)\$ \{/);
  if (!m) { console.log(`✗ ${f}: 마케팅 location 정규식을 찾지 못함`); bad++; continue; }
  const alts = m[1].split('|');
  const post = alts.filter((a) => a.startsWith('(?:'));
  const got = alts.filter((a) => !a.startsWith('(?:') && !a.startsWith('news)') && !a.startsWith('[')).map((a) => '/' + a).sort();
  const missing = want.filter((x) => !got.includes(x));
  const extra = got.filter((x) => !want.includes(x));
  const hasPost = /\(\?:blog\|news\)\/\[\^\/\]\+/.test(m[1]);
  const rootAt = conf.indexOf('location = / {');
  const hasRoot = rootAt >= 0 && /proxy_pass [^;]*\/seo-html/.test(conf.slice(rootAt, rootAt + 600));
  const ok = !missing.length && !extra.length && hasPost && hasRoot;
  if (!ok) bad++;
  console.log(`${ok ? '✓' : '✗'} ${f}: 랜딩 ${got.length}/${want.length}${missing.length ? ` · 빠짐 ${missing.join(' ')}` : ''}${extra.length ? ` · 목록에 없음 ${extra.join(' ')}` : ''}${hasPost ? '' : ' · 글 주소 누락'}${hasRoot ? '' : ' · location = / 누락'}`);
}
process.exit(bad ? 1 : 0);
