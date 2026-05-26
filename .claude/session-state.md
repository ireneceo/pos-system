# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-26 (BRAND CONCEPT v2 + 글쓰기 스킬 통합 + 랜딩 z-index fix + lua ACL)
**버전:** **v3.42** 운영 (Irene 지시로 버전 미상승, backstage 누적)
**작업 상태:** 완료. 매장 점검 결과 + 새 작업 지시 대기.

### 진행 중인 작업
- 없음

### 오늘 (2026-05-26) 완료된 작업

**1. /글쓰기 SOP v2 — 타깃 + 단일 톤 통합**
- 0단계 신설 — AskUserQuestion 으로 타깃 (6 역할 + Auto) 먼저 결정. PERSONA_CODE 정해진 후만 1단계 진입
- 1단계 트렌드 리서치 persona 별 쿼리 세트 분기 (RA/BG/FG/OW/SP/ST 6개 세트)
- 2단계 고객 DB persona 매칭만 필터
- 3단계 매트릭스 통합 — 같은 persona row 안에서 problem 만 다양화 (후보 3건 모두 동일 persona)
- 1.5단계 영상 트랙 결정 (CHAOS vs INTERVIEW) 폐지

**2. BRAND CONCEPT v2 — 단일 톤 영구 박제**
- CHAOS/INTERVIEW 두 트랙 분기 완전 폐지 → 단일 톤 통일
- 포지셔닝: "Built by F&B operators. Solving real problems." / "NOT a POS company — real-operations-problem-solving brand"
- 5비트 구조 고정 (HOOK / 문제 / 해결 / 결과 / CTA)
- 시각: Apple-clean SaaS + 자연광 + 한국감성 모던 F&B (white oak / marble / 큰 창)
- 캐스팅: 30s 동양인 사장/매니저, 모델급 외모, 깔끔 apron
- POS UI: 둥근 버튼 / 여백 / 3 패널 / violet 절제
- CTA: "Start Your Free Trial" pill + purplehere.com
- **video_prompt 4000자 한도 강제**

**3. e-invoice 글 video_prompt 재작성 (id 78/79/80)**
- v1 (8500자) → v2 (en 3970 / ms 3992 / zh 3199)
- dev DB + 운영 DB 동기화 완료
- pain_point: "January 1st. Receipts aren't enough." / "1 Januari. Resit tidak cukup." / "1月1日。光收据不够了。"
- 5비트 BREAKDOWN 정확 (HOOK 0-2s / 문제 2-7s / 해결 8-10s / 결과 10-13s / CTA 13-15s)

**4. 블로그 스킬 5개 → 1개 통합**
- `/블로그초안.md` `/블로그발행.md` `/블로그감사.md` `/블로그리서치.md` `/블로그캘린더.md` git rm
- 5-A (video_prompt BRAND CONCEPT v2 + PER-SECOND TEMPLATE) + 5-B (social_post 단일 톤) 을 `/글쓰기.md` 5단계 안에 통째 흡수
- 한 파일에서 SOP 관리 — 동기화 부담 해소

**5. 랜딩 헤더 z-index fix (언어 드롭다운 sub-banner 가림 해결)**
- `LandingHeader.tsx`: overflow-x:hidden → overflow:visible + max-width:100vw (자식 dropdown 세로 clipping 문제 해결)
- 헤더 z-index 1000 → 1500
- `LanguageSelector.tsx` GlobeDropdown + Dropdown z-index 1100 → 1600
- 빌드 (`main.3cb764c3.js`) + dev 배포 완료
- **운영 미배포** — 다음 운영 배포 시 함께 반영

**6. sync-contents-to-prod.js 영구 패치**
- `video_prompt` + `social_post` 컬럼이 운영 sync payload 에서 빠져있던 버그 fix
- payload + remote schema migration cols + UPDATE/INSERT 3곳 모두 추가
- 향후 `/배포` 자동 콘텐츠 sync 시 두 필드 함께 흐름

**7. lua 사용자 ACL 권한 부여 (Irene 직접 실행)**
- 5개 디렉토리에 `setfacl -R -m u:lua:rwX` + default ACL:
  - `/var/www/.claude/commands` (글쓰기 스킬)
  - `/var/www/docs` (콘텐츠 매트릭스)
  - `/var/www/dev-frontend/src/pages/Landing` (랜딩 페이지)
  - `/var/www/dev-frontend/src/components/Landing` (랜딩 헤더/푸터)
  - `/var/www/dev-frontend/public/locales` (i18n 번역)
- POS 코드는 그대로 lua read-only (POS 보호)
- 신규 파일 자동 적용 (default ACL)

### 미해결 / 다음 세션 결정 필요

- **lua 가 `/블로그초안.md` 재생성한 점** — 우리 정리 후 lua 가 6:25 에 다시 생성함 (소유자 `lua:lua`, 26.5KB). 정책상 폐지 결정이었지만 lua 작업 흐름이 다를 수 있음. 이번 commit 에는 untracked 로 둠. Irene 결정 필요: (a) 또 삭제, (b) 살리고 글쓰기와 역할 분리 명확히, (c) lua 가 만든 그대로 흡수
- **매장 점검 결과 대기** — Irene 매장 가서 프린터 라인별 자동 인쇄 + Customer Display 듀얼 모니터 점검 중. 결과에 따라 hotfix 가능성

### 다음 확정 작업
- 없음 — 지시 대기 (매장 점검 결과 받은 후)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- E-Invoice 5단계 구현 (`docs/E_INVOICE_INTEGRATION_DESIGN.md`, 4-5주, 사전 LHDN sandbox 가입 필요)
- Settings "Printer" 탭 → "Printer & Display" 리네임 + 카드 순서 조정
- React Query 도입 (Priority A)
- 랜딩 헤더 z-index fix 운영 반영 (`/배포` 시 자동)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
