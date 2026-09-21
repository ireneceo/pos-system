# SEO 운영 규칙 — PurpleHere (purplehere.com)

> 2026-09-21 Irene 지시로 제정. 범위는 **PurpleHere 한 솔루션의 랜딩(마케팅) 페이지와 블로그·뉴스**다 — 홈·About·Features·Pricing·Packages·FAQ·Blog·News·Contact·Demo·Company·Privacy·Terms. **POS 시스템 안(`/pos` `/admin` `/kitchen` 등 로그인 뒤 화면)은 대상이 아니다**(robots 로 차단 유지, Irene 「우리가 적용하는 SEO는 랜딩페이지이지 포스 시스템 안에 내용들이 아니야」). PlanQ(`/opt/planq`)는 이 저장소 밖이며 여기서 다루지 않는다.
> **대상 시장: 말레이시아 기반 해외용** — 콘텐츠·키워드·hreflang 은 영어·말레이어·중국어 기준. **한국어 콘텐츠는 만들지 않는다**(Irene 2026-09-21 「한국어글 필요없어. 이거 말레이시아가 기반이고 해외용이야」). 한국어 목록이 영어 글을 보여주는 것은 문제로 올리지 않는다.
> 도구: Claude SEO (사용자 공통 설치 `~/.claude/skills/seo`, 공식 https://claude-seo.md · 설치/업데이트는 공식 `install.sh`, 점검 `~/.claude/skills/seo/scripts/claude-seo doctor`).

## 1. 작업 순서 (고정)

**운영 사이트 검사 → 문제 분석 → 개발환경에서 수정 → 개발환경 검증 → 기존 배포 절차(`/배포`)로 운영 반영 → 운영 사이트 재검사**

- 검사 기준 도메인은 **운영 `https://purplehere.com`** 이다. 운영에서 발견한 문제는 **개발 소스**(`/var/www/dev-frontend`, `/var/www/dev-backend`)에서 원인을 찾아 고친다.
- **운영 소스·운영 서버 파일을 SEO 목적으로 직접 수정하지 않는다.** 운영 반영은 `deploy-to-production.sh`(= `/배포`)뿐이다. 새 배포 체계를 만들지 않는다.
- 개발 사이트 `https://dev.purplehere.com` 은 외부 접근이 되므로 수정 후 검증에 쓴다.
- 개발환경의 검색엔진 차단·noindex 같은 보호설정은 **정상 설정**이다. SEO 문제로 보고 제거하지 않는다.

## 2. 판정 기준

- 결과는 **Critical / High / Medium / Low** 로 나누고, 항목마다 ①실제 검색 노출에 미치는 영향 ②원인 코드·설정 위치(파일:줄) ③수정 방향을 함께 적는다.
  - Critical: 색인·크롤링 자체가 막히거나 페이지가 서로 구분되지 않는 것
  - High: 색인은 되지만 노출·순위에 직접 손해(누락된 sitemap 항목, 따라갈 수 없는 내부 링크, 중복 콘텐츠)
  - Medium: 리치 결과·클릭률에 영향(schema 오류, 메타 품질)
  - Low: 개선 여지
- **도구 점수를 올리는 것은 목표가 아니다.** 실제 크롤링·색인·메타데이터·canonical·sitemap·structured data·콘텐츠·검색 노출로 판단한다.
- 확인하지 못한 항목은 추측하지 않고 **「확인 불가」** 로 적는다.

## 3. 수정 규칙

- 수정 전 `git status` 로 현재 변경 상태를 확인하고 다른 작업자의 미커밋 변경을 훼손하지 않는다.
- SEO 와 관계없는 리팩터링·구조 변경을 같은 작업에 섞지 않는다.
- 🔒 인쇄·KDS 보호 파일은 SEO 작업에서 열지도 않는다(CLAUDE.md 절대 규칙). 공개 마케팅 페이지(`src/pages/Landing/*`, `components/Landing/*`, `components/Common/SEOHead.tsx`, `public/robots.txt`·`sitemap.xml`·`index.html`)가 주 대상이다.
- **먼저 보고하고 승인 후 적용하는 영역**: 서버·nginx 설정, DB, DNS, SSL, CDN(Cloudflare), 인증, API, 결제, 배포 체계, **URL 구조**, 빌드 방식(사전 렌더링 도입 등). 보고에는 이유·영향 범위·되돌리는 법을 담는다.
- 프론트 변경은 CLAUDE.md 의 «빌드 1회 · verify-all --full 1회» 순서를 따른다.

## 4. 배포 후 재검사 (의무)

- 운영 도메인에서 바뀐 항목을 다시 검사해 반영을 확인한다. Cloudflare 가 HTML 을 약 5분 캐시하므로 필요하면 시간을 두고 확인한다.
- 기존 기능 이상 여부를 확인한다(배포 스모크 10/10 + 해당 공개 페이지 실제 로드).
- 결과를 이 문서 끝 «기록» 에 한 줄 남긴다.

## 5. 현재 구조 요약 (2026-09-21 조사)

| 항목 | 현재 |
|---|---|
| 프레임워크 | React 19 · CRA(react-scripts 5) · react-router 7 · 클라이언트 렌더링만(SSR/prerender 없음) |
| 메타 | `components/Common/SEOHead.tsx`(react-helmet-async) — 공개 페이지 14개. 크롤러가 받는 HTML 은 `public/index.html` 하나 |
| robots | 정적 `dev-frontend/public/robots.txt` (개발·운영 동일 파일) |
| sitemap | `dev-frontend/public/sitemap.xml` — **`node dev-backend/scripts/generate-sitemap.js` 로 생성**(운영 공개 API 기준: 고정 14 + 블로그 + 뉴스). 새 글 발행 뒤·SEO 작업 때 다시 만들어 배포. `--check` 로 최신 여부 확인 |
| canonical | 각 페이지 코드에 `https://purplehere.com/...` 하드코딩, 블로그는 `BlogPostPage.tsx` |
| schema | `SEOHead.tsx` 도우미(Organization·SoftwareApplication·WebSite·FAQPage·Article·BreadcrumbList·HowTo·ItemList) |
| 블로그 | DB `contents` + `/api/contents/public/blog(/:slug)`, 번역은 슬러그별 + `translation_group_id` |
| 배포 | `/var/www/deploy-to-production.sh` — 게이트 → 백업 → 재빌드 → rsync → 운영 재시작 → 스모크 |
| 앞단 | Cloudflare (HTML `max-age=300`) |

## 6. 기록

| 날짜 | 작업 | 결과 |
|---|---|---|
| 2026-09-21 | 규칙 제정 · Claude SEO v2.2.4 → v2.3.1 (공식 install.sh) | doctor: Runtime ready · Chromium ready |
| 2026-09-21 | 첫 운영 검사(랜딩 12개 페이지 · robots · sitemap · 주소 처리) | Critical 1 · High 6 · Medium 4 · Low 3 — 수정 전, Irene 보고 |
| 2026-09-21 | 배포 SW 5.48 — H1 JSON-LD 출력 · H4 메뉴 `<a href>` · M2 설명 중복 · L1 html lang (백업 `20260921_163921`, 스모크 10/10) | 운영 재검사: JSON-LD 0→2~4(홈·요금·FAQ·기능·블로그·뉴스·블로그 글) · 설명 2→1 · 내부 링크 0~3→9~11. About·Contact 는 schema 를 원래 안 넘김(설계) |
| 2026-09-21 | M4(한국어 블로그 없음) 종결 — 대상 시장이 말레이시아·해외라 한국어 콘텐츠 불필요 (Irene) | 문제 목록에서 제외 |
| 2026-09-21 | 배포 SW 5.49 — H3 sitemap 생성기(116개) · 홈 SoftwareApplication 1개로 (백업 `20260921_172118`, 스모크 10/10) | 운영 재검사: sitemap 116개·XML 유효·robots 참조 · 홈 JSON-LD Organization·WebSite·SoftwareApplication · 설명 1 · 링크 11. 대기: H5 dev noindex(sudo 명령 Irene) · H2 site_name(Irene) · C1·M3 Fable · H6 적용 안내 |
