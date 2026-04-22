# 다음 세션 이어받기 — 블로그 자동화 시스템 운영 배포

## 현재 상태 (2026-04-21)

### ✅ 완료 — 개발 서버 (dev DB + dev frontend)

**DB 스키마 2차 확장 완료 (contents 테이블)**:
- 1차: `language`, `translation_group_id`, `target_persona`, `funnel_stage`, `content_tier`
- 2차: `problem_category`, `video_script`, `thumbnail_copy`, `social_captions` (JSON)
- 인덱스 3개 추가
- 마이그레이션 스크립트: `scripts/migrate-contents-multilingual.js` + `scripts/migrate-contents-tags-multiformat.js`

**Backend API**:
- 공개 API 3종 (faq/blog/news)에 `?lang=en|ms|zh|ko` + `?persona=` + `?problem=` 필터
- 응답에 `available_tags: { persona, problem }` 집계 포함 → 프론트에서 필터 UI 자동 구성
- `POST /api/contents/bulk` — 3언어 transaction 일괄 생성

**슬래시 커맨드 5종** (`/var/www/.claude/commands/`):
- `/블로그-리서치` (주제 뱅크)
- `/블로그-초안` (**5단계 광고 구조 + 후킹 기법 내장**)
- `/블로그-발행`
- `/블로그-감사`
- `/블로그-캘린더`

**설계 문서**:
- `/var/www/docs/BLOG_AUTOMATION_MULTILANG.md` — 시스템 전체 설계
- `/var/www/docs/blog-research/2026-04-21-content-bank.md` — 12주제 뱅크 + 영상 스크립트 구조

**발행된 샘플 3편 (dev DB 전용, 운영 미반영)**:

| group_id | 제목 | persona | problem | tier | row 수 |
|---|---|---|---|---|---|
| 1 | Floor Plan Strategies to Reduce Foodcourt Vacancy | foodcourt_operator | — | tactical | 3 (en/ms/zh) |
| 2 | Your Staff Isn't the Problem — Your POS Is | restaurant_owner | operations | tactical | 3 |
| 3 | The Second-Location Collapse: Why 42% Close Within 18 Months | brand_general | management | tactical | 3 |

→ group 2/3은 **영상 스크립트 + 썸네일 카피 + 4개 플랫폼 캡션** 포함 (DB 필드 저장됨)

---

## ⏳ 다음 세션 작업 (이 파일 읽고 이어 받으세요)

### 1. Frontend BlogPage 태그 필터 UI
- 현재 BlogPage/FAQPage/NewsPage는 `lang` 파라미터만 전달 중
- 추가해야 할 UI:
  - Target 필터 칩 (All / Restaurant / Brand / Foodcourt / Owner)
  - Problem 필터 칩 (All / Operations / Customer Experience / Data & Decisions / Management / Organization / Automation)
  - URL 쿼리 동기화 (`/blog?persona=brand_general&problem=management`)
  - `available_tags` API 응답 기반 동적 카운트 표시
- 파일: `/var/www/dev-frontend/src/pages/Landing/BlogPage.tsx`

### 2. BlogPostPage 멀티포맷 표시
- 현재는 content 본문만 렌더링
- 추가: 글 하단에 (있을 경우만):
  - 🎥 영상 스크립트 (펼치기 가능)
  - 🖼️ 썸네일 카피
  - 📱 SNS 캡션 (LinkedIn/Instagram/Twitter/TikTok 복사 버튼)
- 이건 홍보 담당자가 한 페이지에서 모든 포맷 받아갈 수 있게 하는 용도

### 3. **운영 반영 (Irene이 질문한 부분)**

현재 샘플 3편은 dev DB에만 있음. 운영 반영 방식:

#### 3-A. DB 스키마 마이그레이션 (운영 DB)
```bash
# 운영 서버 SSH 후 실행 필요:
ssh irene@87.106.78.146
cd /var/www/production-backend
node scripts/migrate-contents-multilingual.js
node scripts/migrate-contents-tags-multiformat.js
```
→ 운영 contents 테이블에 9개 신규 컬럼 + 인덱스 추가

#### 3-B. 콘텐츠 복제 방식 (신규 스크립트 작성 필요)

**방식 A (권장) — `scripts/sync-contents-to-prod.js` 신규 작성**:
- dev DB에서 `status='published'` + 특정 group_id 또는 최근 N일 발행 컨텐츠 추출
- SSH로 payload 전송 → 운영 DB에서 UPSERT (slug+language 유니크 기준)
- `create-release-post.js` 의 `syncToProd()` 함수 패턴 복제

사용 예시:
```bash
# 특정 group만 복제
node scripts/sync-contents-to-prod.js --group=2
node scripts/sync-contents-to-prod.js --group=3

# 또는 최근 7일 published 전체
node scripts/sync-contents-to-prod.js --since=7d
```

**방식 B — 슬래시 커맨드에 --sync-prod 통합**:
- `/블로그-발행 <group_id> --sync-prod`
- 단일 명령으로 dev 발행 + 운영 복제

#### 3-C. Frontend 코드 배포
`/배포` 명령으로 production-frontend에 태그 필터 UI 포함 번들 배포.

### 4. 10단계 검증 (운영 반영 후)
- 0단계 state hydration
- 1단계 빌드
- 2단계 production-backend pm2 상태
- 3단계 API 실호출 (운영 URL)
- 4단계 프론트 서빙 확인
- 5단계 유저 흐름 (language switcher + 태그 필터)
- 6단계 요구사항 대조
- 7단계 연관 영향 (기존 EN-only 6개 블로그가 깨지지 않았는지)
- 8단계 UI (태그 칩 디자인 + 언어 스위처 + fallback 배너)
- 9단계 크로스페이지 (/blog + /faq + /blog/:slug)

### 5. `/블로그-감사` 월간 자동화 (선택)
- cron으로 매월 1일 실행 → 성과 리포트 → 리라이트 후보 제시

---

## 운영 발행 방식 요약 (Irene 질문 답변)

| 단계 | 방법 | 실행 시점 |
|------|------|-----------|
| 1. DB 스키마 | 마이그레이션 스크립트 2개 실행 (idempotent) | 최초 1회 |
| 2. 콘텐츠 복제 | `scripts/sync-contents-to-prod.js --group=N` | 매 발행 시 |
| 3. 코드 | `/배포` 명령 (deploy-to-production.sh) | 프론트 변경 시 |

**기본 원칙**:
- dev DB에서 먼저 `/블로그-초안` → `/블로그-발행` 으로 검수 확정
- 만족스러우면 `sync-to-prod` 로 운영 복제
- 운영 코드(필터 UI 등)는 `/배포` 와 별도 타이밍

**즉시 시작 순서 (다음 세션)**:
1. Frontend 태그 필터 UI 구현
2. sync-contents-to-prod.js 작성 + 테스트
3. 빌드 + 10단계 검증
4. Irene 승인 후 `/배포` + 스크립트 실행으로 운영 반영
