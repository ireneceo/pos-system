# 인앱 Docs / 매뉴얼 시스템 — 기획서

> **상태:** 기획 (2026-06-20, Irene 지시). 구현 미착수.
> **한 줄:** 모든 기능·사용법·설정을 **단일 콘텐츠 소스**로 관리해서 (1) 랜딩페이지 (2) 앱 안 Docs 뷰어 (3) 관리자 기능 모듈(AddonModule)이 **항상 같은 내용으로 동기화**되게 한다. 사용자는 작업 중 사이드바 Docs 또는 **팝아웃 창**으로 바로 도움말을 본다.

---

## 1. 배경 / 목표

- **문제:** 지금은 기능 설명이 흩어져 있다 — 랜딩 `FeaturesPage`, `FAQPage`, `PricingPage`, 관리자 `AddonModule.description`, 그리고 사용법 문서는 사실상 없음. 같은 기능을 세 곳에 따로 적어 **불일치 + 누락 + 유지보수 폭발**.
- **목표 (Irene 지시):**
  1. 기능안내 등 콘텐츠는 **랜딩페이지와 같은 내용으로 함께 관리**된다(한 곳 고치면 다 반영).
  2. **관리자 기능 모듈(AddonModule)과 모두 동기화** — 구매 가능한 모듈 ↔ 그 모듈의 매뉴얼이 1:1.
  3. **철저한 구조화** — 카테고리 → 모듈 → 항목(기능/사용법/설정)으로 위계.
  4. 사용자가 **쓰는 동안** 쉽게 방법을 안다 — 인앱 Docs + 컨텍스트 도움말 + **팝아웃**.

---

## 2. 핵심 설계 — 단일 콘텐츠 소스 (Single Source of Truth)

```
                ┌──────────────────────────────┐
                │   Feature Catalog (단일 소스)   │
                │  = DocArticle + module_code 매핑 │
                └──────────────┬───────────────┘
            ┌──────────────────┼──────────────────┐
            ▼                  ▼                  ▼
   ① 랜딩 FeaturesPage   ② 인앱 Docs 뷰어     ③ AddonModule
   /features, /pricing   (사이드바+팝아웃)    (관리자 모듈 카드)
   /faq (발췌)          역할/구독별 필터      description = 카탈로그에서
```

- **연결 키 = `module_code`.** 이미 `AddonModule.module_code`(예: `reservations`, `cash_management`, `brand_menus`, `purchase_orders`)가 존재. 모든 매뉴얼 항목은 `module_code` 로 모듈과 묶인다.
- 모듈에 안 묶이는 공통 기능(주문/결제/플로어플랜 등 base)도 `module_code='base'` 같은 가상 키로 같은 구조에 들어간다.

---

## 3. 콘텐츠 정보 구조 (IA)

3단 위계 — `AddonModule.category`(basic/advanced) + `target_user_type` 를 그대로 재사용:

```
카테고리 (Operations / Menu / Sales / Procurement / Brand·Foodcourt / Settings …)
└─ 모듈 (= AddonModule, module_code 로 매핑)
   └─ 항목(Article) — 3종 탭으로 통일:
      • 기능 소개 (What/Why) ← 랜딩과 공유
      • 사용법 (How, step-by-step + 스크린샷/짧은 GIF)
      • 설정 (관련 Settings 위치·옵션·기본값)
```

- 1 모듈 = 1 Article(탭 3개). 항목이 많은 모듈(예: Settings)은 하위 Article 허용.
- **역할/구독 필터:** `target_user_type` + 해당 매장이 그 모듈을 구독했는지(`hasModule`)로 노출 결정 → 안 산 기능 매뉴얼은 "업그레이드" CTA 로, 권한 없는 역할엔 숨김.

---

## 4. 데이터 모델 (제안)

새 모델 **`DocArticle`** (DB 관리 → 운영 중 편집 가능, i18n 4언어):

| 필드 | 설명 |
|------|------|
| `id` | PK |
| `module_code` | AddonModule.module_code 매핑(또는 'base') |
| `category` | IA 카테고리 |
| `slug` | URL/딥링크용 (`/docs/reservations`) |
| `target_user_type` | restaurant/brand/foodcourt/owner/supplier/all (모듈과 동일 enum) |
| `tier` | basic/advanced (모듈과 동일) |
| `title_i18n` / `summary_i18n` | {en,ko,zh,ms} — 랜딩 카드 = summary, Docs = 본문 |
| `feature_md_i18n` | 기능 소개(랜딩 공유 본문) |
| `howto_md_i18n` | 사용법(step-by-step) |
| `settings_md_i18n` | 설정 안내 + Settings 딥링크 |
| `related_routes` | 이 문서가 뜨는 앱 경로들(컨텍스트 도움말 매칭) |
| `sort_order`, `is_published` | 정렬/공개 |

- **랜딩 동기화:** `FeaturesPage`/`PricingPage` 가 `DocArticle.summary_i18n`+`feature_md_i18n` 을 읽어 렌더. 별도 하드코딩 제거.
- **모듈 동기화:** AddonModule 관리 화면/플랜 카드의 설명을 `DocArticle.summary_i18n` 로 채움(또는 양방향 link). `module_code` 미스매치 감지용 점검 스크립트(`scripts/check-docs-module-sync.js`) — health-check 에 1건 추가(고아 Article/모듈 0건).
- *대안:* MD/MDX 파일 기반(코드 저장소). 장점=버전관리/PR, 단점=운영 중 비개발자 편집 불가·i18n 4언어 파일 폭증. **권장=DB(DocArticle)** — Irene가 직접 편집·발행 가능(블로그 파이프라인과 동일 운영 모델).

---

## 5. 인앱 Docs 뷰어 UX

1. **사이드바 진입점:** 모든 역할 사이드바 하단 고정 **"Docs / 도움말"** (lucide `BookOpen`). 2단 사이드바 패턴([[reference_sidebar_two_tier]]) 준수.
2. **레이아웃:** 좌=카테고리/모듈 트리, 우=Article(기능/사용법/설정 탭). 검색(제목+본문). 역할/구독 필터 자동.
3. **팝아웃 창 (요청):** Article 헤더의 "팝아웃 ↗" → `window.open` 별도 창(`/docs/:slug?popout=1`, 작은 chrome-less 레이아웃). POS 작업 화면 옆에 띄워두고 보면서 작업. 같은 라우트라 SW/번들 재사용.
4. **컨텍스트 도움말:** 각 페이지 헤더 "?" 아이콘 → `related_routes` 로 현재 경로에 맞는 Article 을 팝아웃으로 바로 오픈(예: 현금관리 화면에서 "?" → Cash 매뉴얼).
5. **온보딩 연계:** 기존 Walkthrough([[reference_walkthrough_pattern]]) 스텝의 "자세히" 링크 = 해당 Docs Article.
6. **디자인:** 표준 컴포넌트만(Modal/Card/Tab), 인앱 색 토큰. alert/toast 금지. 빈/로딩/에러 상태 디자인 포함.

---

## 6. 다국어 / 접근성

- 4언어(en→ko→zh→ms) `*_i18n` 컬럼. 미번역 항목은 en fallback + "번역 예정" 뱃지.
- 용어는 `glossary.json` 기준. 접근성: 팝아웃 `aria-label`, 키보드 네비, 대비 AA.

---

## 7. 콘텐츠 운영 (누가 쓰나)

- 관리자(System Admin) 전용 **Docs 편집기**(블로그 글쓰기 파이프라인 재사용) — Article CRUD + 발행 + 4언어.
- 신규 기능 추가 시 체크리스트([[feedback_new_feature_rollout]])에 **"DocArticle 작성(module_code 매핑)"** 항목 추가 → 기능과 매뉴얼이 함께 출시.

---

## 8. 단계별 구현 로드맵

| Phase | 범위 | 산출물 |
|------|------|--------|
| **P1 데이터·동기화 기반** | DocArticle 모델 + module_code 매핑 + sync 점검 스크립트 + 시드(기존 AddonModule description 이관) | 단일 소스 확립 |
| **P2 인앱 뷰어** | 사이드바 Docs + 트리/탭/검색 + 역할·구독 필터 | 앱 안에서 매뉴얼 열람 |
| **P3 팝아웃 + 컨텍스트 도움말** | `?popout=1` 창 + 페이지 "?" → related_routes | 작업 중 도움말 |
| **P4 랜딩 동기화** | FeaturesPage/Pricing/FAQ 가 DocArticle 렌더(하드코딩 제거) | 랜딩=앱 일치 |
| **P5 편집기 + 콘텐츠 채움** | Admin Docs 편집기 + 전 모듈 Article 4언어 작성 | 운영 가능 |

---

## 9. Cash Up 재설계와의 연계

Cash Up 시재/마감 분리 재설계(session-state 다음 확정 작업)가 끝나면 그 결과를 **첫 DocArticle 샘플**로 작성 — `module_code='cash_management'`, 항목: 기능(시재관리 vs 결제마감 차이), 사용법(교대 시작→블라인드 카운트→차이공개→마감→Z-Report, 카드타입은 단말 배치영수증 수동입력), 설정(결제수단 사전등록·권한). 이걸 템플릿으로 나머지 모듈 확장.

---

## 10. 미결 (Irene 결정 필요)

- 콘텐츠 저장: **DB(DocArticle, 권장)** vs MD 파일 — 권장안대로 진행할지.
- 랜딩 즉시 전환 여부: P4에서 랜딩 하드코딩을 한 번에 교체할지, 신규 모듈부터 점진 적용할지.
- 편집 권한: System Admin 만 vs 매장 관리자도 자기 매장용 메모 추가 허용 여부.
