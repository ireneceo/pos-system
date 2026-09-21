# SEO점검 — purplehere.com 운영 사이트 SEO 검사 (PurpleHere 전용)

> **규칙 원본: `docs/SEO_OPERATIONS.md`** — 먼저 읽는다. 이 명령은 그 문서의 1단계(운영 검사)와 4단계(배포 후 재검사)를 실행하는 절차다.
> 도구: Claude SEO (`~/.claude/skills/seo`). 시작 전 `~/.claude/skills/seo/scripts/claude-seo doctor` 로 실행환경 확인.

## 절대 원칙
1. **검사 대상은 운영 `https://purplehere.com`.** 운영 서버·운영 소스는 읽기(외부 요청)만. 수정은 개발 소스에서, 반영은 `/배포` 로만.
2. **이 명령은 검사·보고만 한다.** 수정은 Irene 확인 후 별도로(규칙 문서 3장).
3. 개발 사이트의 noindex·차단은 문제로 올리지 않는다.
4. 도구 점수는 참고. 판정은 실제 크롤링·색인·메타·canonical·sitemap·schema·콘텐츠·노출 기준.
5. 확인 못 한 것은 「확인 불가」.

## 절차
1. **크롤러가 실제로 받는 것** — 대표 URL(`/` `/pricing` `/features` `/faq` `/blog` + 블로그 글 2개)을 JS 없이(`curl -A Googlebot`) 받아 title·description·canonical·robots·JSON-LD·본문 텍스트 양을 비교. 이어 Claude SEO 의 렌더링 검사(seo-technical 의 JavaScript rendering)로 JS 실행 후 결과와 대조.
2. **robots.txt · sitemap.xml** — 운영 응답 그대로. sitemap 의 URL 이 200·canonical 일치·색인 허용인지, 공개 페이지·블로그 글 누락 여부(`/api/contents/public/blog` 목록과 대조).
3. **Claude SEO 검사** — `/seo audit https://purplehere.com` (필요 시 seo-technical · seo-schema · seo-sitemap · seo-hreflang · seo-content 개별).
4. **원인 추적** — 문제마다 개발 소스의 원인 파일:줄을 찾는다(`dev-frontend/src/pages/Landing/*`, `components/Common/SEOHead.tsx`, `public/*`, 블로그는 `dev-backend/routes/contents.js`).
5. **보고** — Critical / High / Medium / Low 표: 문제 · 검색 노출 영향 · 원인 위치 · 수정 방향 · (서버/URL/빌드 등 승인 필요 영역이면 표시).
6. **배포 후 재검사 모드** (`/SEO점검 재검사`) — 이번에 고친 항목만 운영에서 다시 확인 + 공개 페이지 실제 로드 + 결과를 `docs/SEO_OPERATIONS.md` «기록» 에 한 줄.
