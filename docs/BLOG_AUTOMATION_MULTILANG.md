# PurpleHere Blog & Content Automation — Multilingual (EN/MS/ZH)

> **목적**: 말레이시아 시장 3개 주요 언어(EN/MS/ZH)로 정기 블로그/FAQ 콘텐츠를 자동 생산·발행하여 SEO/AEO 유입 극대화 + PurpleHere 구독 전환 유입원 확보.
>
> **시장 커버리지**: 말레이시아 95% (EN 비즈니스/국제 + MS 공용어 + ZH 화교권) + 싱가포르 확장 대비.

---

## Part A — DB 스키마 확장

### 변경사항

```sql
-- contents 테이블 확장
ALTER TABLE contents
  ADD COLUMN language VARCHAR(5) NOT NULL DEFAULT 'en'
    COMMENT 'en/ms/zh/ko — ISO 639-1 2-letter code',
  ADD COLUMN translation_group_id INT NULL
    COMMENT 'Links translated versions of the same article',
  ADD COLUMN target_persona VARCHAR(30) NULL
    COMMENT 'restaurant_owner / brand_general / foodcourt_operator / owner',
  ADD COLUMN funnel_stage VARCHAR(10) NULL
    COMMENT 'TOFU / MOFU / BOFU',
  ADD COLUMN content_tier VARCHAR(15) NULL
    COMMENT 'pillar / cluster / tactical / case_study / news_jack';

-- slug 유니크 → (slug, language) 조합 유니크로 변경
ALTER TABLE contents DROP INDEX slug;
ALTER TABLE contents ADD UNIQUE KEY idx_slug_lang (slug, language);

-- 쿼리 성능용 복합 인덱스
CREATE INDEX idx_contents_pub ON contents(type, language, status, published_at);
CREATE INDEX idx_contents_group ON contents(translation_group_id);
```

### 기존 데이터 백필

- 33개 기존 레코드(FAQ 27 + Blog 6) → `language='en'` 일괄 업데이트
- `translation_group_id`는 다국어판이 생성될 때 자동 부여

### Content 모델 필드 업데이트

`/var/www/dev-backend/models/Content.js` 에 5개 새 필드 추가 + getter.

---

## Part B — API 다국어 대응

### 기존 API 확장 (backward-compat)

- `GET /api/contents/public/faq?lang=ms` — `lang` 미지정 시 `en` fallback
- `GET /api/contents/public/blog?lang=ms`
- `GET /api/contents/public/news?lang=ms`
- `GET /api/contents/public/blog/:slug?lang=ms` — 해당 언어 우선, 없으면 translation_group 내 en fallback

### 신규 응답 필드

- `available_languages`: `["en", "ms"]` — 같은 translation_group_id에 있는 언어들
- `translation_group_id`: 언어 스위처가 이걸로 대응판 점프

### 백오피스 API (System Admin 전용)

- `POST /api/contents` — 신규 작성
- `POST /api/contents/bulk` — 번역 그룹 일괄 생성 (EN+MS+ZH 3 rows)
- `PUT /api/contents/:id` — 수정
- `DELETE /api/contents/:id` — 삭제

---

## Part C — Frontend 다국어 라우팅

### 라우팅 규칙

| URL 패턴 | 설명 |
|---------|------|
| `/blog` | i18n.language 기반 자동 필터 |
| `/blog/:slug` | 해당 언어에서 slug 매칭 |
| `/ms/blog/:slug` | 명시적 MS 라우트 (SEO용) |
| `/zh/blog/:slug` | 명시적 ZH 라우트 |
| `/faq` | 동일 원리 |

### hreflang 자동 삽입

각 페이지 `<head>`:
```html
<link rel="alternate" hreflang="en" href="https://purplehere.com/blog/floor-plan-guide">
<link rel="alternate" hreflang="ms" href="https://purplehere.com/ms/blog/panduan-pelan-lantai">
<link rel="alternate" hreflang="zh" href="https://purplehere.com/zh/blog/平面图指南">
<link rel="alternate" hreflang="x-default" href="https://purplehere.com/blog/floor-plan-guide">
```

### 언어 스위처

블로그 단일 글 페이지 상단에 "🌐 Available in: EN | MS | ZH" 표시. 클릭 시 translation_group_id 기반 대응판 이동.

### BlogPage.tsx / FAQPage.tsx 수정

- `useTranslation` 의 `i18n.language` 로 API 호출 시 `lang` 전달
- 응답에 없는 언어는 영어판 fallback 안내 배너 ("Original in English — translation coming soon")

---

## Part D — 마케팅 프레임워크 (콘텐츠 전략)

### D.1 페르소나 × 퍼널 매트릭스

| 페르소나 | TOFU (인지) | MOFU (검토) | BOFU (구매) |
|----------|-------------|-------------|-------------|
| Restaurant Owner | 운영 팁, 첫 개업 | POS 비교, ROI | Free Trial, Demo |
| Brand General | 프랜차이즈 스케일 | 멀티브랜드 요건 | Demo 예약 |
| Foodcourt Operator | 공실률 줄이기 | 입점 계약 템플릿 | Tenancy 데모 |
| Restaurant Owner (다점포) | 확장 기준 | Owner Dashboard 비교 | Sales 문의 |

### D.2 콘텐츠 Tier 5종

| Tier | 빈도 | 분량 | 작성 방식 |
|------|------|------|----------|
| **Pillar** | 월 1편 | 2500-3500자 | Claude 초안 → Irene 검수 필수 |
| **Cluster** | 주 1편 | 1200-1800자 | Claude 초안 → Irene 스팟체크 |
| **Tactical** | 주 2편 | 700-1000자 | Claude 100% 자동 |
| **Case Study** | 월 1편 | 1500자 | Claude 템플릿 → Irene 사실 확인 |
| **News-jack** | 주 1편 | 1000자 | Claude 리서치 → Irene 관점 |

### D.3 주간 발행 리듬

| 요일 | 타입 | 언어 커버 | 검수 레벨 |
|------|------|----------|----------|
| 월 | Tactical | EN + MS + ZH | 자동 |
| 화 | Cluster | EN + MS + ZH | 스팟체크 |
| 수 | Pillar (격주) or Case Study (격주) | EN + MS + ZH | 필수 검수 |
| 목 | Tactical | EN + MS + ZH | 자동 |
| 금 | News-jack | EN + MS | 관점 추가 |

**월간 산출**: 13 원글 × 3 언어 = 39 contents / 월 → 연 468 contents

### D.4 현지화 가이드 (단순 번역 금지)

**EN (영어)**:
- 톤: 비즈니스, 팩트 중심, 국제적
- 레퍼런스: Sunway, Pavilion, Mid Valley, KLCC
- 화폐: RM (Ringgit)
- 문화 컨텍스트: 다인종 말레이시아

**MS (말레이어)**:
- 톤: 친근, 실용적, 공동체 중심
- 레퍼런스: 현지 푸드코트 브랜드, 바자르 라마단/하리라야 시즌
- 예시: "restoran keluarga" (가족 식당) 류의 친근한 비유
- 종교/문화 민감도 (할랄, 라마단 기간)

**ZH (중국어 — Simplified)**:
- 톤: 간결, 효율 중심, 숫자/ROI 강조
- 레퍼런스: 차이나타운, 호커센터, 화교 프랜차이즈 (Old Town White Coffee 등)
- 관용어: 비즈니스 성공/성장 관련 고사성어 사용 가능

**주의**: 원문 EN → 직역 아닌 **재창작** (title/hook 특히). slug는 로컬 언어 기반으로 (SEO).

---

## Part E — Claude Code 슬래시 커맨드 (자동화)

`.claude/commands/` 에 배치:

### E.1 `/purple-blog-research`

주제 뱅크 리서치:
1. WebSearch로 최신 업계 뉴스 (restaurant POS, food court, malaysia)
2. DB의 SupportTicket/ContactInquiry 에서 반복 질문 키워드 추출
3. Google Keyword Planner 데이터 스코어링 (수작업 입력 시)
4. 결과: 다음 주 13개 주제 후보 (페르소나 + Tier 분류 포함)

### E.2 `/purple-blog-draft [topic] [persona] [funnel] [tier]`

단일 글 작성 (3개 언어 동시):
1. EN 원본 (Tier 에 맞는 분량/포맷)
2. MS 현지화 (단순 번역 아님)
3. ZH 현지화
4. 각각 seo_title / seo_description / seo_keywords / ai_summary 별도 최적화
5. CTA: 페르소나 + 퍼널에 맞는 적절한 링크 삽입
6. 3 row Content (동일 translation_group_id) 생성, status='draft'
7. 결과: draft 링크 3개 (preview URL)

### E.3 `/purple-blog-publish [group_id]`

발행:
1. draft → published 전환
2. published_at = now
3. hreflang 메타 자동 작성
4. Schema.org Article JSON-LD 삽입
5. 사이트맵 자동 갱신 (robots 또는 별도 sitemap-content.xml)

### E.4 `/purple-blog-audit`

성과 분석:
1. view_count 기반 Top 10 / Bottom 10 글
2. 발행된 지 3개월 지났으나 view_count < 50 → 리라이트 후보
3. 최근 4주 발행 주기 점검 (리듬 준수 여부)

### E.5 `/purple-blog-calendar`

발행 캘린더 관리:
1. 향후 4주 발행 예정 리스트
2. 비어있는 슬롯 → 주제 후보 자동 채움

---

## Part F — 측정 KPI

| 지표 | 목표 (6개월 후) | 측정 방법 |
|------|-----------------|----------|
| 월간 검색 유입 세션 | 5,000+ | Google Search Console |
| 블로그 → Signup 전환율 | 1.5%+ | GA4 이벤트 |
| 언어별 트래픽 비중 | EN 50% / MS 30% / ZH 20% | GA4 |
| 키워드 상위 10 진입 | 30+ 키워드 | Rank Math / GSC |
| AEO 인용 (ChatGPT/Perplexity) | 월 100+ | 수동 모니터링 + 브랜드 검색량 |
| 블로그 평균 체류 시간 | 2분+ | GA4 |

---

## 구현 순서 (즉시 착수)

1. **Phase 0 — DB/API (1-2일)**: Content 스키마 확장, 백필, API 다국어 대응
2. **Phase 1 — Frontend 라우팅 (2-3일)**: `/:lang/blog/:slug`, 언어 스위처, hreflang
3. **Phase 2 — Slash commands (1주)**: research/draft/publish/audit/calendar 5종
4. **Phase 3 — 첫 주 발행 (Phase 2 완료 후 즉시)**: Tactical EN+MS+ZH 3편 실전 가동

운영 안정화 후 **월 39 contents 자동화 누적 리듬 진입**.
