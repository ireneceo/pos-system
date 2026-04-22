## 현재 작업 상태
**마지막 업데이트:** 2026-04-22 UTC (밤)
**작업 상태:** 완료 (운영 미배포 / lua 권한 확장 대기 / Phase 1+2-A+Foodcourt Dashboard 완료)

### 2026-04-22 밤 추가 완료
**Phase 1: Contract ↔ Plan Integration**
- `contracts.currency` + `contract_plans.end_at` 스키마 + backfill (33 rows)
- 새 API 3개: create-plan-from-contract / billing-preview / unlinked-contracts
- Contract 통화 선택 (entity.supported_currencies 기반 dropdown)
- Manager 재무 마스킹
- FE LinkedPlansSection 신규 (마법사 + preview)
- Tenancy Map billing-gap 배지 (빨간 `!`)
- 설계 문서: `docs/CONTRACT_PLAN_CURRENCY.md`

**Phase 2-A: EntityPlan combined (min-guarantee)**
- `charge_type` ENUM 'combined' 추가
- `invoiceScheduler.calculatePlanCharges` 전면 재작성 (기존 버그: EntityPlan에 없는 필드 읽어 0원 invoice 생성)
- create-plan 마법사: base_rent + revenue_share 둘 다 있으면 자동 combined
- billing-preview + FE 표시 combined 지원

**Foodcourt Dashboard: Tenancy Operations 섹션**
- 새 API `GET /api/foodcourts/:id/tenancy-dashboard`
- FE 섹션: 파이프라인 펀널 + Expiring 30d/90d + Billing Gaps + Revenue Forecast
- 기존 FoodcourtGeneralDashboard에 추가 (재작성 아닌 확장)
- i18n 24 keys × 4 언어

### 검증 결과 (최종 스위프)
- 빌드: exit 0 (`main.cdbd261d.js`)
- State hydration: 0 warnings
- Health-check: 40/40 통과
- FC Dashboard API real-call 통과: pipeline 5 units, forecast MYR 3200/mo

### 진행 중인 작업
- lua 계정에 랜딩/콘텐츠 작업 권한 부여 (스크립트 작성 완료, Irene 승인 대기)
  - 파일: `/tmp/grant-lua-landing-permissions.sh`
  - 경계: 랜딩·블로그·FAQ·i18n·콘텐츠 DB만 lua 쓰기 / POS 운영 코드는 읽기만

### 첫 /글쓰기 실전 발행 완료 (2026-04-22 저녁)
- **주제**: 포스트 Hari Raya 고객 회복 + 바늘구멍 타깃팅 (restaurant_owner × customer_experience, MOFU/tactical)
- **translation_group_id = 4**, category_id = 6 (blog/guides)
- 3언어 발행 (status=published):
  - EN id=63: "Hari Raya Ended 4 Weeks Ago. Your Silent 20% Won't Come Back on Their Own"
    - /blog/post-hari-raya-customer-recovery-needle-eye-targeting
  - MS id=64: "Empat Minggu Selepas Raya: 20% Pelanggan Setia Yang Takkan Kembali Sendiri"
    - /blog/pemulihan-pelanggan-selepas-raya-sasaran-lubang-jarum
  - ZH id=65: "开斋节过后4周:悄悄流失的20%老顾客..."
    - /blog/kaizhaijie-guhou-laoguke-zhenyan-jingzhun
- 실제 PurpleHere 기능 기반 4개 세그먼트 (Dormant VIP / Expiring Points / One-Hit Wonder / Festive-Only):
  - `RestaurantCustomer.loyalty_tier`, `last_order_at`, `total_spent`, `points_expiring` 필드 활용
  - `Coupon.target_loyalty_tiers`, `target_customers` 실제 타겟팅 API
- 다포맷: video_prompt (15초 세로 영상 scene breakdown) + social_post (title/body/hashtags 10개)
- 검증 완료: API 9/9 (3 slug × 3 lang) 200, 페이지 서빙 3/3 200, translations 배열 3개, available_tags 필터 반영, 외부링크 2 (McKinsey/Kahneman) + 내부 2 (pricing/group 3)
- 방식: HTTP `/bulk` 대신 Content 모델 직접 insert (transaction + slug 중복 체크 복제)

### 완료된 작업 (이번 세션 — 2026-04-22)

**랜딩 페이지 반응형 개선 + 블로그 필터 UX 최종 확정 + /글쓰기 통합 커맨드 + lua 권한 설계**

1. **랜딩 헤더 모바일 반응형**
   - 로고 아래로 태그라인 내림 (flex-direction: column on ≤768px)
   - "Everything You Need, All" → "Solving Real F&B Problems"
   - 햄버거 메뉴 안 중복 언어 버튼 제거 (상단에 이미 있음)
   - 파일: `src/components/Landing/LandingHeader.tsx`

2. **랜딩 푸터 모바일 2열 레이아웃**
   - Logo+Description 풀폭 / Product+Info 나란히 2열 / Company 풀폭
   - `grid-template-columns: 1fr 1fr` on ≤768px + 1/4번째만 span full
   - 파일: `src/components/Landing/LandingFooter.tsx`

3. **블로그 필터 UI — 반복 수정 후 최종 확정**
   - 시도 1: 알약 칩 (카테고리 탭과 구분 안 됨) → reject
   - 시도 2: POS FilterSelect 드롭다운 → "구식" reject
   - 시도 3: Medium 텍스트 링크 우측정렬 → "거지같다" reject
   - **최종: POS OptionChip 스타일** (MenuManagementPage 참조 #E0E7FF + #4338CA 파스텔)
     - 6px radius 사각 칩, 한 줄 통합 (persona + problem 섞어서)
     - FOR/TOPIC 라벨 제거, 가운데 정렬
     - 활성: 파스텔 인디고 배경, 호버 시 살짝 진한 파스텔
   - 파일: `src/pages/Landing/BlogPage.tsx`

4. **필터 다중 선택 + 토글 동작**
   - 이전: 단일 택1 (Restaurant 클릭 → Brand로 바꾸면 Restaurant 해제)
   - 수정: array 기반 다중 선택 (OR 조건)
   - 클릭 = 토글 (활성 상태에서 또 클릭하면 해제)
   - URL 동기화: `?personas=a,b&problems=c,d` (comma-separated)
   - Backend: `Op.in` 배열 지원
   - `persona`/`problem` 단일 파라미터 backward-compat 유지
   - 파일: `routes/contents.js`, `src/pages/Landing/BlogPage.tsx`

5. **레거시 블로그 9편 태그 백필**
   - 이전: 태그 null로 인해 "모든 필터 선택해도 9편이 안 나옴" 버그
   - 원인: IN 조건은 null 못 잡음
   - 수정: 레거시 9편 전체에 target_persona + problem_category 부여
   - 7 × restaurant_owner, 1 × foodcourt_operator, 1 × brand_general
   - Operations 5 / Data 1 / CX 1 / Organization 1 / Management 1

6. **블로그 404 버그 수정 (slug→group fallback)**
   - 증상: MS 포스트에서 EN 스위치 시 "Post not found"
   - 원인: 서버 fallback 로직이 `lang !== 'en'` 때만 실행 → lang=en + MS slug 조합 404
   - 수정: 모든 언어에 대해 slug→translation_group 해석 + 요청 언어 sibling 반환
   - Frontend: post.slug !== URL slug 시 자동 canonical URL navigate(replace)
   - 파일: `routes/contents.js`, `src/pages/Landing/BlogPostPage.tsx`

7. **블로그 리스트 ko 언어 fallback**
   - 이전: `/blog?lang=ko` 요청 시 빈 페이지 (엄격 필터)
   - 수정: lang !== en 이면 translation_group 미커버된 EN 글을 fallback으로 병합
   - News 카테고리 분리 유지 (fallbackWhere에 `where` 전체 복사)
   - UI: "일부 글은 영어로 표시됩니다" 노란 배너 + 카드마다 "EN" 배지
   - Irene 결정: ko 콘텐츠 정식 생성 **거절** (fallback UI로 충분)

8. **Distribution Kit 단순화 (video_prompt + social_post)**
   - 이전: thumbnail_copy + 4개 플랫폼 캡션 (오버엔지니어링)
   - Irene 피드백: "영상 프롬프트 하나 + SNS 포스트 하나면 됨. 썸네일은 영상 첫 프레임으로"
   - 재설계:
     - `video_prompt` (LONGTEXT): AI 영상 생성기 전체 프롬프트 (scene + VO + thumbnail spec)
     - `social_post` (JSON): `{ title, body, hashtags[] }` — 모든 SNS 동일 업로드
     - 기존 필드(video_script/thumbnail_copy/social_captions)는 backward-compat 유지
   - UI: Article 하단 "📣 Distribution Kit" (System Admin만 표시)
     - 🔒 Admin only 오렌지 배지 + dashed border
     - Video Production Prompt (Copy prompt)
     - Social Post (Copy full package + 필드별 Copy)
   - 기존 3편 백필 완료 (group 1/2/3 × 3언어 = 9 row)

9. **SEO hreflang 자동 삽입**
   - SEOHead 컴포넌트에 `language` + `alternateUrls` props 추가
   - `<link rel="alternate" hreflang="en|ms|zh" href="...">` + `<meta property="og:locale">` + `<meta http-equiv="content-language">`
   - Google 언어별 URL 독립 인덱싱
   - 파일: `src/components/Common/SEOHead.tsx`, `src/pages/Landing/BlogPostPage.tsx`

10. **System Admin 이메일 알림 제거 (Irene 결정 — 옵션 B)**
    - notify-admins 엔드포인트 삭제 (404 확인)
    - `blogPublishedEmail` 템플릿 삭제
    - NOTIFICATION_CATEGORIES에서 `blog_published` 제거
    - User import / sendPlatformEmail import 제거
    - 이유: dev/prod SMTP 혼재 + URL 불일치 문제. Irene이 직접 슬랙/톡 공유로 단순화

11. **`/글쓰기` 통합 슬래시 커맨드** — 엔드투엔드 파이프라인
    - 파일: `/var/www/.claude/commands/글쓰기.md`
    - 흐름: 트렌드 리서치 → 키워드 수요 → 고객 대화 DB → 주제 3건 스코어링 → Irene 선택 → 3언어 풀 생성 → bulk API 발행 → 보고
    - 참조 문서: BLOG_AUTOMATION_MULTILANG.md + 2026-04-21-content-bank.md + 블로그-초안.md (5단계 광고 구조 + 후킹 7기법 + 다포맷)
    - 이메일 단계 제거 (Irene 결정)

12. **lua 계정 권한 설계 (대기 중)**
    - 현황 조사: lua = PlanQ 전용 (pm2 planq-*만 sudo). PurpleHere는 진입조차 제한.
    - PlanQ (`/opt/planq/`): owner=irene, group=planq, setgid → lua 전권 이미 보유
    - PurpleHere: /var/www 진입 시 irene 그룹 필요 → 현재 lua 불가
    - 설계: lua를 irene 그룹 가입 + 랜딩/콘텐츠 디렉토리만 g+rw + sudoers에 pm2 dev-backend 추가
    - 스크립트 작성: `/tmp/grant-lua-landing-permissions.sh` (idempotent)
    - Irene 요청한 표(공유용) 작성 — PlanQ 전권 vs PurpleHere 마케팅·콘텐츠 전용
    - **실행 대기** — Irene 승인 필요

### 수정/신규 파일 (이번 세션)

**백엔드 (dev-backend/)**
- 수정: `routes/contents.js` (다중 선택 필터 + fallback 로직 수정 + 리스트 available_tags 집계)
- 수정: `models/Content.js` (video_prompt, social_post 필드 추가)
- 수정: `scripts/register-map-modules.js` (이름 변경 반영)
- 신규: `scripts/migrate-contents-video-social.js`

**프론트엔드 (dev-frontend/)**
- 수정: `src/components/Landing/LandingHeader.tsx` (모바일 column + 태그라인 변경 + 중복 언어버튼 제거)
- 수정: `src/components/Landing/LandingFooter.tsx` (모바일 2열 레이아웃)
- 수정: `src/components/Common/SEOHead.tsx` (hreflang/og:locale 추가)
- 수정: `src/pages/Landing/BlogPage.tsx` (필터 다중선택 토글 + POS OptionChip 파스텔 + fallback 배너)
- 수정: `src/pages/Landing/BlogPostPage.tsx` (Distribution Kit + language auto-navigate + canonical URL 교정 + 404 버그 수정)

**Claude commands**
- 신규: `/var/www/.claude/commands/글쓰기.md`
- 수정: `/var/www/.claude/commands/블로그-초안.md` (5단계 광고 구조 + 후킹 + 다포맷)
- 신규: `/var/www/.claude/commands/블로그-감사.md`, `블로그-리서치.md`, `블로그-발행.md`, `블로그-캘린더.md`

**기타**
- 작성 (미실행): `/tmp/grant-lua-landing-permissions.sh` (lua 권한 확장 스크립트)

### Git 상태 (2026-04-22)
```
수정된 파일: 14개
미커밋 신규: 6개 (모두 .claude/commands/ Korean slash commands)
최근 커밋: bce69740 "Auto-commit 2026-04-20 evening — Floor Plan system..."
```

### 다음 할 일

**즉시 (Irene 결정 대기)**
1. lua 권한 확장 스크립트 실행 승인 — `sudo bash /tmp/grant-lua-landing-permissions.sh`
2. `.claude/settings.local.json` 에 POS 경로 deny 리스트 추가 (이중 가드)
3. lua 세션에서 실제 권한 테스트 (랜딩 쓰기 성공 / POS 쓰기 실패 확인)

**운영 배포 (Irene `/배포` 명령 대기)**
- 누적 변경: v3.16 (Floor Plan + Unit Numbering + Map) + v3.16 콘텐츠 + 블로그 자동화 시스템 + UI 개선
- 운영 DB 마이그레이션 필요: contents 테이블 9개 컬럼 + 인덱스 3개
- `sync-contents-to-prod.js` 로 샘플 3개 블로그 group 운영 복제

**후속 개선 (콘텐츠 누적 후)**
- 첫 `/글쓰기` 실전 실행 (주간 운영 리듬 시작)
- Google Search Console Tier 2 연동 (콘텐츠 20편 누적 후)

---

## 이전 세션 기록 (2026-04-21 아침)

**v3.16 콘텐츠 연동 — FAQ + Features + Pricing + 릴리즈 포스트**

1. **FAQ Q&A 6건 추가** (features 카테고리 id=3)
   - "How do I set up unit numbers for my foodcourt branches?"
   - "Can I use range notation like P-2-01A-05A for unit numbers?"
   - "How do I create a visual floor plan for my foodcourt?"
   - "What is the Franchise Map for brand owners?"
   - "How does the Foodcourt Tenancy Map show branch locations?"
   - "Do Floor Plan, Unit Numbering, and Maps cost extra?"
   - 각 항목 AEO 최적화 (ai_summary 포함)
   - API `/api/contents/public/faq` 21 → 27건 확인

2. **FeaturesPage.tsx 신규 FeatureItem 4개**
   - Brand 탭: `brand_franchise` (Franchise Management & Map, basic)
   - Foodcourt 탭: `fc_branches` (Branch Mgmt & Unit Numbering, basic) / `fc_tenancy` (Tenancy Mgmt & Map, basic) / `fc_floor_plan` (Floor Plan Editor, advanced)

3. **PricingPage.tsx MODULE_NAMES 매핑 4건 추가**
   - `brand_franchise`, `fc_branches`, `fc_tenancy`, `fc_floor_plan`
   - 모든 Brand/Foodcourt 플랜에 이미 편입됨 (register-map-modules.js로 기등록)

4. **v3.16 릴리즈 블로그 + 공지**
   - `scripts/release-v3.16.json` + `create-release-post.js` 실행
   - Blog id=53 (slug: `release-v3.16`, EN 전용, /news 노출)
   - Notice id=43 (EN + KO, 10명 수신자 생성)

### 신규/수정 파일
- 신규: `dev-backend/scripts/seed-faq-v3-16.js`, `dev-backend/scripts/release-v3.16.json`
- 수정: `dev-frontend/src/pages/Landing/FeaturesPage.tsx`, `dev-frontend/src/pages/Landing/PricingPage.tsx`

### 검증 결과
- 빌드: exit 0 (76초, 내 변경과 무관한 기존 경고만)
- Health-check: 40/40 통과
- Public API: FAQ 27건 / News에 release-v3.16 노출
- Page 서빙: /faq /features /pricing /blog/release-v3.16 모두 200

### 추가 작업 (동일 세션 — 모듈 순서/가드/이름 통일)

5. **AddonModule 카테고리 최종 결정**: Irene 결정 — `fc_floor_plan` 만 `advanced`, 나머지 3개 (`brand_franchise`, `fc_tenancy`, `fc_branches`) `basic`

6. **사이드바 NavItem `isRouteAllowed` 가드 추가** (신규 모듈 6개 NavItem 모두 누락 → 추가)
   - `/pos/brand/franchise`, `/pos/brand/franchise-map`
   - `/pos/foodcourt/tenancy`, `/pos/foodcourt/tenancy-map`
   - `/pos/foodcourt/branches`, `/pos/foodcourt/floor-plan`
   - 모듈 체크 해제 시 사이드바 메뉴 숨김 검증 완료 (Write→Read 왕복)

7. **AddonModule sort_order 전체 부여 (77개)**
   - `scripts/apply-module-sort-order.js` 신규
   - 사이드바 순서 기준으로 역할별 10 간격 부여
   - Pricing 페이지 + System Admin 플랜 관리 페이지 양쪽 자동 정렬

8. **기능 명칭 전면 통일 (DB ↔ PricingPage ↔ FeaturesPage 3곳 동기화)**
   - DB 이름 변경: `brand_franchise`, `fc_tenancy`, `fc_branches`, `fc_floor_plan`, `inventory_management`, `brand_inventory`
   - PricingPage MODULE_NAMES 전면 수정 + 누락 모듈 10개 추가 (ingredients/suppliers/work_manuals/activity_logs 역할별)
   - FeaturesPage 잘못된 코드 교체: `brand_restaurant_admin`→`brand_admin_staff`, `fc_admin_mgmt`→`fc_admin_staff`
   - FeaturesPage 누락 10개 항목 추가
   - 감사 결과: **불일치 0건**

### 신규/수정 파일 (추가분)
- 신규: `dev-backend/scripts/apply-module-sort-order.js`
- 수정: `dev-frontend/src/components/Layout/MainLayout.tsx` (NavItem 가드 6개)
- 수정: `dev-backend/scripts/register-map-modules.js` (이름 + 카테고리)

### 최종 검증 (전체 10단계)
- 빌드 최종: exit 0 (70초)
- Health-check: 40/40 통과
- AddonModule: 77개 sort_order 부여, 중복 0, 0값 0
- 3개 소스 명칭 감사: 불일치 0건
- Write→Read 왕복 (플랜 토글): fc_floor_plan / brand_franchise 둘 다 정상 반영

---

## 블로그 자동화 시스템 (동일 세션 후반 — Irene 요청 "정기적 마케팅 탁월한 자동화")

### 설계 문서
- `/var/www/docs/BLOG_AUTOMATION_MULTILANG.md` — 전체 프레임워크 (Pillar-Cluster, 페르소나 × 퍼널, AEO 우선, 현지화 가이드, 발행 리듬, KPI)

### Phase 0: DB + API 다국어화
- `contents` 테이블 5개 컬럼 추가: `language`, `translation_group_id`, `target_persona`, `funnel_stage`, `content_tier`
- (slug, language) 복합 유니크 + 쿼리용 인덱스 2개
- 기존 40개 레코드 language='en' 백필
- Content 모델 업데이트
- 공개 API 다국어: FAQ / Blog / News 모두 `?lang=` + fallback 로직
- 신규 `POST /api/contents/bulk` — 3언어 transaction 일괄 생성
- 스크립트: `scripts/migrate-contents-multilingual.js`

### Phase 1: Frontend
- 4개 페이지 (BlogPage/NewsPage/FAQPage/BlogPostPage) 모두 `i18n.language` 기반 API 호출
- BlogPostPage에 언어 스위처 UI (translations 배열 기반) + fallback 안내 배너

### Phase 2: Slash Commands (`/var/www/.claude/commands/`)
- `/블로그-리서치` — 주간 주제 뱅크 (고객 대화 + WebSearch + 키워드 수요)
- `/블로그-초안` — 3언어(EN/MS/ZH) 동시 작성 + bulk API 호출
- `/블로그-발행` — draft → published
- `/블로그-감사` — Top/Bottom, 리라이트 후보, 번역 갭
- `/블로그-캘린더` — 향후 주차 슬롯 관리 + 빈 슬롯 자동 채움 제안

### Phase 3: 실전 발행 (검증)
- **첫 Tactical 3언어 블로그 발행 완료**
- translation_group_id=1
- "5 Floor Plan Strategies to Reduce Foodcourt Vacancy"
- EN slug: `reduce-foodcourt-vacancy-floor-plan-strategies` (id=54)
- MS slug: `strategi-pelan-lantai-kurangkan-kekosongan-foodcourt` (id=55)
- ZH slug: `reduce-foodcourt-vacancy-floor-plan-zh` (id=56)
- 각 언어 native 현지화 (단순 번역 아님 — Malaysia 레퍼런스/문화 반영)

### 검증 결과
- 빌드: exit 0 (72초)
- State hydration: 0 warnings
- Health-check: 40/40 통과
- 서빙: /blog/* 200
- API 왕복 3언어 모두 정상 (list + single + translation switcher)

### 마케팅 운영 리듬 (설계 확정)
- 주 3편 원글 × 3언어 = 주 9 row
- 월 13 원글 × 3 = 월 39 contents
- Tier 분포: Tactical 주 2 / Cluster 주 1 / Pillar 격주 / Case Study 격주 / News-jack 주 1
- 타겟 시장 커버리지: 말레이시아 95% (EN+MS+ZH)

### 2차 확장 — 태그 기반 필터링 + 다포맷 + 광고 구조 (2026-04-21 후반)

**Irene 추가 요구사항**:
- 홈페이지에서 타겟/문제 태그 기반 포스트 필터링
- 광고 전환율 높은 5단계 구조 (공감→문제→해결→증거→CTA) + 후킹 기법 반영
- 외부 홍보 활용 다포맷 (블로그 + 15-30초 영상 스크립트 + 썸네일 + SNS 캡션)
- 12개 구체 주제 제공 (레스토랑/푸드코트/브랜드/오너 × 현장운영/고객경험/데이터/운영관리/조직/자동화)

**추가 완료**:
- DB 2차 확장: `problem_category`, `video_script`, `thumbnail_copy`, `social_captions(JSON)` 컬럼 + 인덱스
- 마이그레이션 스크립트: `scripts/migrate-contents-tags-multiformat.js`
- API: persona/problem 필터 + available_tags 응답 집계
- `/블로그-초안` 커맨드 5단계 광고 구조 + 후킹 7기법 내장 재작성
- 콘텐츠 뱅크: `/var/www/docs/blog-research/2026-04-21-content-bank.md` (12주제 전체 개요 + 영상 스크립트 구조 + 태그 필터 UI 구조)
- 샘플 2편 풀 다포맷 3언어 발행:
  - group_id=2 "Your Staff Isn't the Problem — Your POS Is" (restaurant_owner / operations / tactical)
  - group_id=3 "The Second-Location Collapse: Why 42% Close Within 18 Months" (brand_general / management / tactical)
  - 각각 video_script + thumbnail_copy + social_captions(LinkedIn/Instagram/Twitter/TikTok) 포함

**총 발행 상태 (dev DB 전용, 운영 미반영)**:
- group 1 (Floor Plan — foodcourt_operator) × 3 lang
- group 2 (Staff POS Sync — restaurant_owner) × 3 lang
- group 3 (Second Location — brand_general) × 3 lang
- 총 9 row + 기존 EN only 6편

### 후속 작업 완료 (2026-04-21 추가 세션)

**Phase C — Frontend 태그 필터 UI + 다포맷 표시 + sync 스크립트**:

1. **BlogPage.tsx 태그 필터 UI** ✅
   - Target(persona) 필터 칩 행 (Restaurant / Brand / Foodcourt / Multi-restaurant Owner)
   - Problem 필터 칩 행 (Operations / Customer Experience / Data & Decisions / Management / Organization / Automation)
   - URL 쿼리 동기화 (`?persona=xxx&problem=yyy&category=zzz`)
   - available_tags API 응답 기반 동적 카운트
   - 활성 필터 있을 때 Clear filters 버튼

2. **BlogPostPage.tsx 다포맷 섹션** ✅
   - Article 하단 "📣 Promotional Assets" 섹션 신규
   - 영상 스크립트 (15-30초) / 썸네일 카피 / LinkedIn / Instagram / Twitter / TikTok 각 카드
   - 각 카드 Copy 버튼 (clipboard API) + "✓ Copied" 피드백

3. **scripts/sync-contents-to-prod.js** ✅ (운영 반영 수단)
   - 필터: `--group=N` / `--id=N` / `--since=7d` / `--slug=x --lang=en` / `--dry-run`
   - SSH로 운영 서버에 페이로드 전송
   - 운영 DB에 스키마 마이그레이션 (idempotent) + 카테고리 UPSERT + 컨텐츠 UPSERT
   - translation_group_id 충돌 방지 (dev/prod 간 mapping)
   - dry-run 검증 완료 (group=2: 3 row 매칭)

### 최종 검증 결과
- State hydration: 0 warnings
- 빌드: exit 0 (73초)
- Health-check: 40/40 통과
- 페이지 서빙 (6개 URL 포함 필터 조합): 모두 200
- API 필터 AND 조건: `persona=brand_general&problem=management` → Second Location 매칭 정상
- 다포맷 필드: video_script 605자 / thumbnail_copy / 4개 플랫폼 captions 모두 저장/응답 정상
- 번들 반영: Multi-restaurant Owner / Customer Experience / Promotional Assets / clipboard 등 신규 문자열 모두 포함

### UX 개선 (Irene 피드백 3건)

1. **필터 UI 재디자인** — 카테고리 탭과 같은 알약 칩 → POS 표준 FilterSelect 드롭다운
   - For/Topic 드롭다운 2개 + 활성 필터 태그(× 제거 가능) + Clear filters
   - 카테고리 = 탭 / 필터 = 드롭다운 역할 분리 명확

2. **Promotional Assets 관리자 전용 제한**
   - 이전: 일반 독자에게도 영상 스크립트/SNS 캡션 노출 (실수)
   - 수정: `isSystemAdmin` 가드 + dashed border (#F59E0B) + "🔒 Admin only" 오렌지 배지
   - 일반 방문자는 섹션 완전 숨김, 관리자만 편집자 도구로 사용

3. **인라인 language switcher 제거 + SEO hreflang 추가**
   - 블로그 본문 위 `🌐 Available in: EN / MS / ZH` 중복 버튼 제거
   - 상단 LandingLayout switcher로 단일화
   - SEOHead에 `language` + `alternateUrls` props 추가 → `<link rel="alternate" hreflang="en|ms|zh" />` + `<meta property="og:locale" />` + `<meta http-equiv="content-language" />` 자동 삽입
   - Google 언어별 URL 독립 인덱싱 가능 (x-default fallback 포함)
   - Fallback 배너는 유지 (해당 언어 미존재 시 안내)

### ⏳ 다음 세션 이어받기 — 운영 배포

**남은 작업은 Irene이 `/배포` 명령을 줄 때까지 대기**:
1. 운영 DB 스키마 마이그레이션 (sync 스크립트가 자동 처리하게 됨)
2. `node scripts/sync-contents-to-prod.js --group=1 --group=2 --group=3` (3편 3언어 복제 = 9 row)
3. `/배포` 명령으로 production-frontend에 태그 필터 UI + 다포맷 섹션 반영
4. 운영 URL에서 10단계 검증

**Irene 질문 "운영 발행 방식" 최종 답**:
- dev에서 발행/검수 → `sync-contents-to-prod.js` 로 운영 DB 복제 → `/배포` 로 프론트 반영
- sync 스크립트는 스키마 마이그레이션까지 자동 처리 (idempotent)

---

## 완료된 작업 (이전 세션 — 2026-04-20 저녁)

1. **Brand Franchise Map / Foodcourt Branch Map — Standalone 창 분리**
   - `window.open(_blank)` 새 창, PosLayout 밖 라우트
   - 사이드 리스트 패널 (지도 확대 + 상세 정보)
   - 핀 스타일 정제 (외부 보라 그림자 제거, 선택 링, franchise=★/direct=●)
   - Brand Map 다중 브랜드 개선 (레스토랑 많은 순 정렬 + 드롭다운 + 카운트)

2. **Foodcourt Floor Plan 시스템 (뷰 + 에디터) 신규**
   - View: `/pos/foodcourt/floor-plan` (지점별 매장 배치 표시 + 매장 클릭 시 계약 4섹션 상세 패널)
   - Editor: `/pos/foodcourt/floor-plan-editor` (레스토랑 FloorPlanEditor 패턴 복제, FloorPlanCanvas 재사용, Add Store shape 4종, drag/resize/undo/save)
   - 1 지점 = 1 평면도 단순화 (자동 생성)
   - DB: foodcourt_floor_plans 테이블 + foodcourt_units 좌표 컬럼

3. **Branch Unit Numbering 시스템 신규**
   - `foodcourt_branches.unit_config JSON` 컬럼
   - Branch 편집 모달 신규 섹션 (Toggle + Zone cards)
   - Prefix 토글(선택) + Free-form textarea (자유 입력)
   - 범위 확장: `01-20` / `A01-A10` / `05A-08A` / `P-2-01A-05A` 자동 확장
   - Preview/Sync API (contract 연결 유닛 삭제 보호)
   - 저장 시 Contract 드롭다운 + Floor Plan Unplaced 자동 반영

4. **공용 컴포넌트화**
   - Branch 편집 모달 → `CommonModal size="large"` + `FormRow/FormGroup/FormLabel/FormInput/FormSelect`
   - 필드 overlap 해소, `Add Branch` (+기호 제거)
   - 사이드바 Foodcourt: Tenancy / Branch Map / Floor Plan 3개 메뉴

5. **AddonModule `fc_floor_plan` 등록** + 모든 Foodcourt plan(Basic/Pro/Enterprise) 편입

### 수정/신규 파일

**백엔드**
- 신규: `models/FoodcourtFloorPlan.js`, `routes/foodcourt-floor-plans.js`
- 수정: `models/FoodcourtBranch.js` (unit_config), `models/FoodcourtUnit.js` (plan_*), `models/index.js`, `routes/foodcourt-branches.js` (unit_config + sync-units + free-form generator), `routes/foodcourts.js` (tenancy-map), `server.js`

**프론트엔드**
- 신규: `pages/FoodcourtGeneral/FoodcourtFloorPlanPage.tsx` (뷰), `FoodcourtFloorPlanEditorPage.tsx` (에디터), `FoodcourtTenancyMapStandalone.tsx`, `pages/BrandGeneral/BrandFranchiseMapStandalone.tsx`
- 수정: `components/Layout/MainLayout.tsx`, `components/ProtectedRoute.tsx`, `pages/FoodcourtGeneral/FoodcourtBranchesPage.tsx` (Unit Numbering + 공용 컴포넌트), `FoodcourtTenancyMapPage.tsx` (지점 중심), `pages/BrandGeneral/BrandFranchiseMapPage.tsx` (핀 스타일), `App.tsx`

### 검증 결과
- state-hydration-check: 0 warnings
- 빌드: exit 0 (여러 차례)
- Floor Plan API: Create 201 / Batch save 200 / Read-back shapes 일치 / 권한 차단 403/404/401
- Unit Numbering 자유 입력 파싱: `P-2-01A-05A` 5개 / `05A-08A` 4개 / `01-20` 20개 / mixed list OK
- health-check: 40/40 pass

### 운영 배포 시 필요한 작업 (미배포)
1. `CREATE TABLE foodcourt_floor_plans (...)` — 신규 테이블
2. `ALTER TABLE foodcourt_units ADD COLUMN floor_plan_id INT NULL, plan_x/plan_y/plan_width/plan_height FLOAT, plan_shape VARCHAR(20)` + FK
3. `ALTER TABLE foodcourt_branches ADD COLUMN unit_config JSON NULL`
4. `node scripts/register-map-modules.js` (fc_floor_plan 모듈 + Plan 편입)
5. production-frontend 빌드 배포

### 다음 할 일
**단기**
- 운영 배포 (`/배포` 명령)
- 실제 유저 흐름 검증 (Foodcourt General 로그인 → 지점 Unit Numbering 설정 → Floor Plan 에디터로 배치 → 뷰에서 클릭 확인)

**후속 개발 (우선순위)**
- 랜딩페이지 Features/Pricing 에 Franchise Map / Branch Map / Floor Plan 기능 소개
- FAQ Q&A (Unit Numbering 사용법, 범위 표기법, Floor Plan 편집 방법)
- 릴리즈 블로그 포스트 (v3.16 예정)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
