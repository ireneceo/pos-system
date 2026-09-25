/**
 * 크롤러가 받는 페이지별 HTML — 마케팅 주소 전용 (docs/SEO_OPERATIONS.md · 2026-09-24 Fable 판정 C1)
 *
 * 왜: 앱이 브라우저에서만 그려지는 구조라, 검색엔진이 처음 받는 HTML 이 모든 주소에서 똑같았다
 *     (홈 = /pricing 바이트 동일, 본문 46자, canonical 0개). 그래서 페이지 대부분이 «발견됨–색인 안 됨».
 *
 * 무엇을: nginx 가 마케팅 주소(랜딩 14 + /blog·/news 와 그 글)만 `/seo-html<주소>` 로 넘기면,
 *   지금 빌드된 index.html 을 **그대로 읽어** 그 페이지의 제목·설명·canonical·hreflang·og·JSON-LD 와
 *   #root 안 본문 텍스트를 채워 돌려준다. 브라우저에서는 지금과 똑같이 React 가 뜨고(createRoot 가 #root 를 교체),
 *   Helmet 이 data-rh="true" 붙은 태그를 같은 값으로 갈아 끼운다.
 *   - 모든 방문자에게 같은 HTML(봇 판별 없음).
 *   - 없는 글·미공개 글 → 404 상태코드(지금은 200 이라 soft 404).
 *   - 백엔드가 죽으면 nginx 가 정적 index.html 로 되돌아간다 — 지금보다 나빠지는 경우가 없다.
 *
 * ⚠ server.js 에서 helmet·securityHeaders·API 제한 **앞**에 마운트한다. 백엔드 CSP·X-Frame-Options 가
 *   붙으면 index.html 의 gtag·Google Fonts 가 막히고, 헤더가 정적 서빙과 달라진다.
 * ⚠ 빌드 산출물을 복사해 두는 두 번째 파일을 만들지 않는다 — 템플릿은 요청 때 읽는다(mtime 캐시).
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');
const Content = require('../models/Content');
const ContentCategory = require('../models/ContentCategory');
const CompanySettings = require('../models/CompanySettings');
const { SITE, STATIC_PAGES, NEWS_CATEGORY_SLUGS } = require('../config/seoPages');

const router = express.Router();

const BUILD_DIR = process.env.FRONTEND_BUILD_DIR
  || (process.env.NODE_ENV === 'production' ? '/var/www/production-frontend/build' : '/var/www/dev-frontend-build');
const TEMPLATE_PATH = path.join(BUILD_DIR, 'index.html');

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// JSON-LD 를 <script> 안에 넣을 때 `</script>` 로 빠져나가지 않게
const ldJson = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');

// ── 템플릿: 빌드된 index.html (새 빌드면 mtime 이 바뀌어 다시 읽힌다)
let tplCache = { mtimeMs: 0, html: null };
function readTemplate() {
  const st = fs.statSync(TEMPLATE_PATH);
  if (!tplCache.html || st.mtimeMs !== tplCache.mtimeMs) {
    tplCache = { mtimeMs: st.mtimeMs, html: fs.readFileSync(TEMPLATE_PATH, 'utf8') };
  }
  return tplCache.html;
}

// ── 사이트 이름: 화면 SEOHead 와 같은 규칙(`제목 | site_name`). 1분 캐시
let siteNameCache = { at: 0, name: 'PurpleHere' };
async function getSiteName() {
  if (Date.now() - siteNameCache.at < 60 * 1000) return siteNameCache.name;
  try {
    const s = await CompanySettings.findOne({ attributes: ['site_name'] });
    siteNameCache = { at: Date.now(), name: (s && s.site_name) || 'PurpleHere' };
  } catch (e) {
    siteNameCache = { at: Date.now(), name: siteNameCache.name };
  }
  return siteNameCache.name;
}

// ── 글 본문: 실행될 수 있는 것만 걷어낸다(스크립트·on* 속성·javascript: 링크)
function sanitizeHtml(html) {
  return String(html || '')
    .replace(/<script\b[\s\S]*?<\/script\s*>/gi, '')
    .replace(/<script\b[^>]*>/gi, '')
    .replace(/\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(href|src|action)\s*=\s*("|')\s*javascript:[^"']*\2/gi, '$1="#"');
}

const absUrl = (u) => {
  if (!u || /^data:/i.test(u)) return null; // base64 이미지는 og 에 싣지 않는다
  if (/^https?:\/\//i.test(u)) return u;
  return SITE + (u.startsWith('/') ? u : `/${u}`);
};

/**
 * 템플릿에 페이지 값을 채운다.
 * 기존 태그(제목·설명·og·twitter)는 교체, canonical·hreflang·JSON-LD 등은 추가 — 추가 태그는 전부 data-rh="true"
 * (없으면 화면이 뜬 뒤 Helmet 이 대체하지 못해 두 벌이 된다 — 2026-09-21 M2 사고).
 */
function renderPage(tpl, { lang = 'en', fullTitle, description, canonical, ogType = 'website', ogImage,
  alternates, jsonLd = [], extraHead = '', bodyHtml }) {
  let html = tpl;
  const setMetaById = (id, attr, value) => {
    const re = new RegExp(`(<meta[^>]*\\bid="${id}"[^>]*\\b${attr}=")[^"]*(")`);
    const re2 = new RegExp(`(<meta[^>]*\\b${attr}=")[^"]*("[^>]*\\bid="${id}")`);
    if (re.test(html)) html = html.replace(re, `$1${esc(value)}$2`);
    else if (re2.test(html)) html = html.replace(re2, `$1${esc(value)}$2`);
  };

  html = html.replace(/<html\b[^>]*>/i, `<html lang="${esc(lang)}">`);
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(fullTitle)}</title>`);
  setMetaById('meta-description', 'content', description);
  setMetaById('og-title', 'content', fullTitle);
  setMetaById('og-description', 'content', description);
  setMetaById('twitter-title', 'content', fullTitle);
  setMetaById('twitter-description', 'content', description);
  if (ogImage) {
    setMetaById('og-image', 'content', ogImage);
    setMetaById('twitter-image', 'content', ogImage);
  }
  html = html.replace(/(<meta[^>]*property="og:type"[^>]*content=")[^"]*(")/i, `$1${esc(ogType)}$2`);

  const head = [
    `<link rel="canonical" href="${esc(canonical)}" data-rh="true"/>`,
    `<meta property="og:url" content="${esc(canonical)}" data-rh="true"/>`,
    ...(alternates ? Object.entries(alternates).map(([l, u]) =>
      `<link rel="alternate" hreflang="${esc(l)}" href="${esc(u)}" data-rh="true"/>`) : []),
    ...(alternates && alternates.en ? [`<link rel="alternate" hreflang="x-default" href="${esc(alternates.en)}" data-rh="true"/>`] : []),
    ...jsonLd.map((o) => `<script type="application/ld+json" data-rh="true">${ldJson(o)}</script>`),
    extraHead,
  ].filter(Boolean).join('');
  html = html.replace('</head>', `${head}</head>`);

  html = html.replace(/<div id="root">\s*<\/div>/i, `<div id="root">${bodyHtml}</div>`);
  return html;
}

// 모든 랜딩에 붙는 메뉴 — 크롤러가 따라갈 링크
function siteNav() {
  const label = (p) => p.title.split(/ [-—|] /)[0];
  return `<nav><ul>${STATIC_PAGES.map((p) => `<li><a href="${p.loc}">${esc(p.loc === '/' ? 'Home' : label(p))}</a></li>`).join('')}</ul></nav>`;
}

const breadcrumb = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
});

async function newsCategoryIds() {
  const cats = await ContentCategory.findAll({ where: { type: 'blog', slug: { [Op.in]: NEWS_CATEGORY_SLUGS } }, attributes: ['id'] });
  return cats.map((c) => c.id);
}

// /blog · /news 목록 — 최근 글 링크(영어). 목록 API 와 같은 범위(news 카테고리 포함/제외)
async function postListHtml(isNews) {
  const newsIds = await newsCategoryIds();
  const where = { type: 'blog', status: 'published', language: 'en' };
  if (isNews) where.category_id = { [Op.in]: newsIds.length ? newsIds : [0] };
  else if (newsIds.length) where[Op.or] = [{ category_id: null }, { category_id: { [Op.notIn]: newsIds } }];
  const posts = await Content.findAll({
    where, order: [['published_at', 'DESC']], limit: 100,
    attributes: ['slug', 'title', 'excerpt', 'published_at'],
  });
  const base = isNews ? '/news' : '/blog';
  return `<ul>${posts.map((p) => `<li><a href="${base}/${encodeURIComponent(p.slug)}">${esc(p.title)}</a>${p.excerpt ? ` — ${esc(p.excerpt)}` : ''}</li>`).join('')}</ul>`;
}

async function renderStatic(page, tpl) {
  const siteName = await getSiteName();
  const canonical = page.loc === '/' ? SITE : SITE + page.loc;
  const jsonLd = page.loc === '/'
    ? [{ '@context': 'https://schema.org', '@type': 'WebSite', name: siteName, url: SITE }]
    : [breadcrumb([{ name: 'Home', url: SITE }, { name: page.title.split(/ [-—|] /)[0], url: canonical }])];
  let list = '';
  if (page.loc === '/blog') list = await postListHtml(false);
  if (page.loc === '/news') list = await postListHtml(true);
  const body = `<header>${siteNav()}</header><main><h1>${esc(page.title)}</h1><p>${esc(page.description)}</p>${list}</main>`;
  return renderPage(tpl, {
    fullTitle: `${page.title} | ${siteName}`,
    description: page.description,
    canonical,
    jsonLd,
    bodyHtml: body,
  });
}

// 글 하나. 주소의 slug 는 언어마다 따로라 언어 무관으로 찾고, 같은 slug 가 여러 언어에 있으면 영어 우선
async function findPost(slug) {
  const rows = await Content.findAll({
    where: { type: 'blog', status: 'published', slug },
    include: [{ model: ContentCategory, as: 'category', attributes: ['slug', 'name'] }],
  });
  if (!rows.length) return null;
  return rows.find((r) => r.language === 'en') || rows[0];
}

async function renderPost(post, tpl) {
  const siteName = await getSiteName();
  const isNews = !!(post.category && NEWS_CATEGORY_SLUGS.includes(post.category.slug));
  const section = isNews ? 'news' : 'blog';
  // canonical = 글의 종류로 정한다(요청 주소가 아니라). 화면 BlogPostPage 도 같은 규칙.
  const canonical = `${SITE}/${section}/${encodeURIComponent(post.slug)}`;

  let alternates = null;
  if (post.translation_group_id) {
    const sib = await Content.findAll({
      where: { type: 'blog', status: 'published', translation_group_id: post.translation_group_id },
      attributes: ['language', 'slug'],
    });
    if (sib.length > 1) alternates = Object.fromEntries(sib.map((s) => [s.language, `${SITE}/${section}/${encodeURIComponent(s.slug)}`]));
  }

  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt || post.ai_summary || `Read ${post.title} on PurpleHere Blog`;
  const image = absUrl(post.og_image_url) || absUrl(post.thumbnail_url);
  const author = post.author_name && !post.author_name.includes('@') ? post.author_name : 'PurpleHere';
  const published = post.published_at ? new Date(post.published_at).toISOString() : null;

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: canonical,
    ...(image ? { image } : {}),
    author: { '@type': 'Organization', name: author },
    publisher: { '@type': 'Organization', name: 'PurpleHere', logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` } },
    ...(published ? { datePublished: published, dateModified: published } : {}),
  };
  const crumbs = breadcrumb([
    { name: 'Home', url: SITE },
    { name: isNews ? 'News' : 'Blog', url: `${SITE}/${section}` },
    { name: post.title, url: canonical },
  ]);
  const extraHead = published ? `<meta property="article:published_time" content="${esc(published)}" data-rh="true"/>` : '';

  const body = `<header>${siteNav()}</header><main><article>`
    + `<h1>${esc(post.title)}</h1>`
    + (published ? `<p><time datetime="${esc(published)}">${esc(published.slice(0, 10))}</time></p>` : '')
    + sanitizeHtml(post.content)
    + `</article></main>`;

  return renderPage(tpl, {
    lang: post.language || 'en',
    fullTitle: `${title} | ${siteName}`,
    description,
    canonical,
    ogType: 'article',
    ogImage: image,
    alternates,
    jsonLd: [article, crumbs],
    extraHead,
    bodyHtml: body,
  });
}

function send(res, status, html) {
  res.removeHeader('X-Powered-By');
  res.status(status)
    .set('Content-Type', 'text/html; charset=utf-8')
    // 정적 index.html 과 같은 캐시 규칙(nginx `location /`) — 새 번들로 즉시 전환
    .set('Cache-Control', 'no-cache, no-store, must-revalidate')
    .set('Pragma', 'no-cache')
    .set('Expires', '0')
    .send(html);
}

router.get('*', async (req, res) => {
  let tpl;
  try {
    tpl = readTemplate();
  } catch (e) {
    // 빌드 폴더를 못 읽으면 nginx 가 정적 파일로 되돌아가게 502
    console.error('[seo-html] template read failed:', e.message);
    return res.status(502).end();
  }
  try {
    const p = (req.path.replace(/\/+$/, '') || '/');
    const page = STATIC_PAGES.find((x) => x.loc === p);
    if (page) return send(res, 200, await renderStatic(page, tpl));

    const m = p.match(/^\/(blog|news)\/([^/]+)$/);
    if (m) {
      let slug;
      try { slug = decodeURIComponent(m[2]); } catch { slug = m[2]; }
      const post = await findPost(slug);
      if (post) return send(res, 200, await renderPost(post, tpl));
    }
    // 없는 주소·미공개 글: 껍데기 그대로 + 404 (화면은 지금처럼 «찾을 수 없음» 을 그린다)
    return send(res, 404, tpl);
  } catch (e) {
    console.error('[seo-html] render failed:', req.path, e.message);
    // 채우다 실패하면 정적과 같은 껍데기라도 준다(방문자에겐 차이 없음)
    return send(res, 200, tpl);
  }
});

module.exports = router;
module.exports._internal = { renderPage, sanitizeHtml, readTemplate };
