#!/usr/bin/env node
/**
 * sitemap.xml 생성 — PurpleHere 랜딩 + 공개 블로그·뉴스 (docs/SEO_OPERATIONS.md · 2026-09-21 SEO 검사 H3)
 *
 * 왜: 손으로 관리하던 public/sitemap.xml 이 11개 주소에 멈춰 있었다(수정일 2026-03-03 고정,
 *     블로그·뉴스 글 0개, /packages·/news 누락).
 *
 * 무엇을 읽나: **운영의 공개 API**(로그인 없는 GET) — 지금 운영에 실제로 공개된 글만 담는다.
 *   개발 DB 를 읽지 않는 이유: 개발에만 있는 초안·테스트 글이 운영 sitemap 에 새면 404 주소를 검색엔진에 알리게 된다.
 * 무엇을 쓰나: dev-frontend/public/sitemap.xml 하나. 운영 반영은 기존 배포(/배포)로만 — 새 배포 체계 아님.
 *
 * lastmod
 *   - 글: published_at. (updated_at 은 배포 때 콘텐츠 동기화가 매번 건드려 «전부 오늘 바뀜» 이 되므로 쓰지 않는다)
 *   - 고정 페이지: 그 페이지 소스 파일의 마지막 git 커밋 날짜.
 *
 * 사용:  node scripts/generate-sitemap.js           # 파일 쓰기
 *        node scripts/generate-sitemap.js --check   # 쓰지 않고 현재 파일과 비교만(다르면 exit 1)
 * 새 글을 발행한 뒤·SEO 작업 때 실행하고, 결과 파일을 커밋해 배포한다.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const { SITE, STATIC_PAGES } = require('../config/seoPages'); // 목록 단일 소스 — routes/seo-html.js 와 공유
const REPO = path.resolve(__dirname, '../..');
const OUT = path.join(REPO, 'dev-frontend/public/sitemap.xml');
const LANDING = 'dev-frontend/src/pages/Landing';

const day = (d) => new Date(d).toISOString().slice(0, 10);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function gitDate(rel) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', rel], { cwd: REPO, encoding: 'utf8' }).trim();
    return out ? day(out) : null;
  } catch { return null; }
}

async function getJson(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'purplehere-sitemap-generator' } });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.json();
}

function itemsOf(body) {
  const x = body && body.data !== undefined ? body.data : body;
  if (Array.isArray(x)) return x;
  if (x && Array.isArray(x.items)) return x.items;
  if (x && Array.isArray(x.rows)) return x.rows;
  return [];
}

async function fetchAll(type, lang) {
  const out = [];
  for (let page = 1; page <= 50; page++) {
    const q = new URLSearchParams({ page: String(page), limit: '100' });
    if (lang) q.set('lang', lang);
    const body = await getJson(`${SITE}/api/contents/public/${type}?${q}`);
    const items = itemsOf(body);
    out.push(...items);
    const pg = body.pagination || (body.data && body.data.pagination);
    if (!pg || page >= (pg.totalPages || 1) || items.length === 0) break;
  }
  return out;
}

async function main() {
  const check = process.argv.includes('--check');
  const urls = [];

  for (const p of STATIC_PAGES) {
    const rel = `${LANDING}/${p.file}`;
    if (!fs.existsSync(path.join(REPO, rel))) throw new Error(`페이지 파일이 없다: ${rel} — STATIC_PAGES 를 App.tsx 공개 라우트와 맞출 것`);
    urls.push({ loc: SITE + (p.loc === '/' ? '/' : p.loc), lastmod: gitDate(rel), changefreq: p.changefreq, priority: p.priority });
  }

  // 블로그 — 언어별 번역이 각자 슬러그를 가진다. 네 언어를 모두 물어 합집합(공개 목록이 없는 언어는 en 을 돌려준다 → 중복 제거로 흡수)
  const blog = new Map();
  for (const lang of ['en', 'ms', 'zh', 'ko']) {
    for (const it of await fetchAll('blog', lang)) {
      if (it.status && it.status !== 'published') continue;
      if (it.slug && !blog.has(it.slug)) blog.set(it.slug, it);
    }
  }
  const news = new Map();
  for (const it of await fetchAll('news')) {
    if (it.status && it.status !== 'published') continue;
    if (it.slug && !news.has(it.slug)) news.set(it.slug, it);
  }

  const byDateDesc = (a, b) => new Date(b.published_at || 0) - new Date(a.published_at || 0);
  for (const it of [...blog.values()].sort(byDateDesc)) {
    urls.push({ loc: `${SITE}/blog/${encodeURIComponent(it.slug)}`, lastmod: it.published_at ? day(it.published_at) : null, changefreq: 'monthly', priority: '0.6' });
  }
  for (const it of [...news.values()].sort(byDateDesc)) {
    urls.push({ loc: `${SITE}/news/${encodeURIComponent(it.slug)}`, lastmod: it.published_at ? day(it.published_at) : null, changefreq: 'yearly', priority: '0.4' });
  }

  // 글 목록 페이지의 lastmod = 가장 최근 글 날짜(목록 내용이 그때 바뀌었으므로)
  const newest = (m) => [...m.values()].map((i) => i.published_at).filter(Boolean).sort().pop();
  for (const [loc, m] of [['/blog', blog], ['/news', news]]) {
    const u = urls.find((x) => x.loc === SITE + loc);
    const n = newest(m);
    if (u && n && (!u.lastmod || day(n) > u.lastmod)) u.lastmod = day(n);
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!-- 생성: dev-backend/scripts/generate-sitemap.js — 손으로 고치지 말 것 (docs/SEO_OPERATIONS.md) -->',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((u) => [
      '  <url>',
      `    <loc>${esc(u.loc)}</loc>`,
      u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>` : null,
      `    <changefreq>${u.changefreq}</changefreq>`,
      `    <priority>${u.priority}</priority>`,
      '  </url>',
    ].filter(Boolean).join('\n')),
    '</urlset>',
    '',
  ].join('\n');

  const summary = `고정 ${STATIC_PAGES.length} · 블로그 ${blog.size} · 뉴스 ${news.size} = ${urls.length}개 주소`;
  if (check) {
    const cur = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
    if (cur === xml) { console.log(`✓ sitemap 최신 (${summary})`); return; }
    console.log(`✗ sitemap 이 운영 공개 글과 다르다 — node scripts/generate-sitemap.js 로 다시 만들 것 (${summary})`);
    process.exit(1);
  }
  fs.writeFileSync(OUT, xml);
  console.log(`✓ ${path.relative(REPO, OUT)} — ${summary}`);
}

main().catch((e) => { console.error('✗ sitemap 생성 실패:', e.message); process.exit(1); });
