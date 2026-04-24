# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-04-24 (v3.17 운영 배포 + /개발완료)
**버전:** **v3.17 (2026-04-24 배포 완료)** — 다음 개발은 v3.18 [Unreleased] 누적 시작
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — v3.17 배포 묶음)

**주소 표준화 (Global Unification)**
- 9 엔티티 주소 스키마 통일 (`country CHAR(2)` ISO, `lat/lng DECIMAL(10,7)`, `address_line_2 VARCHAR(255)`)
- 공용 `<AddressFields>` 컴포넌트 + `formatAddress()` 유틸 (frontend+backend), `i18n-iso-countries` 250국×4언어
- 5페이지 입력폼 일괄 교체 + AutoSave 3페이지 확장 + Display 치환
- 운영 DB 마이그레이션: `Malaysia→MY` 15 rows 정규화 + ALTER CHAR(2)/DECIMAL(10,7)

**R1/R2 방어선 철회 + 도메인 원칙 재정립**
- Restaurant은 live entity, Contract는 snapshot. 잘못된 cross-brand 차단 4곳 제거 + cleanup 스크립트 정제
- `docs/ADDRESS_STANDARDIZATION.md` §2 회고 추가

**Subscription Plan 실질 티어 차단 (3중 가드)**
- `middleware/requireModule.js` 신설
- 백엔드 29개 엔드포인트 + 프론트 6개 URL + UI `hasModule` 게이팅
- Basic 고객 curl 우회 불가

**Franchise Map + Floor Plan + Tenancy Map 전면 개선**
- All Brands 집계 옵션 (brand map)
- 파이프라인 stage advance 원클릭 (floor plan + brand map + FC tenancy map)
- billing_gap CTA with `fc_plans` 모듈 게이팅
- 통화/타임존 API 연동 (하드코딩 제거)
- 표준 Button 컴포넌트 일관 사용, 화살표/아이콘 제거
- FC Tenancy Map 사이드리스트 계층화 + 유닛 상세 패널 + 지도 tenant 핀 클릭 연동
- FC Tenancy Map `unit_stats.occupied` NaN 버그 수정

**v3.17 운영 배포 완료**
- deploy-to-production.sh --auto 실행, smoke 10/10 pass (POST order #9720 포함)
- DB 마이그레이션 성공, audit 전영역 ISO 정규화 확인
- 운영 홈 https://purplehere.com 200, 릴리즈 블로그 `/blog/release-v3.17` live
- System Admin 공지 id=44 (5 recipients)
- 백업: `/var/www/backups/20260424_174607` (운영서버)

### 업데이트된 문서
- `DEVELOPMENT_PLAN.md` — v3.17 배포 섹션 추가
- `CHANGELOG.md` — [Unreleased] → [v3.17] 2026-04-24 이동
- `docs/FEATURE_BASED_SUBSCRIPTION_PLAN.md` — v3.17 실질 티어 차단 섹션 추가
- `docs/ADDRESS_STANDARDIZATION.md` — §2 R1/R2 철회 회고 (이전 세션에 완료)
- Memory: `reference_address_system.md` 업데이트, `reference_tier_gating.md` + `project_domain_restaurant_contract.md` 신규

### 다음 할 일 (v3.18 후보)
- 운영 배포 직후 모니터링 (Irene 판단 시 실제 고객 경험 재현 — 특히 basic 티어 고객의 Subscription/Plan 페이지 redirect 동작)
- Basic 고객 경험 전수 체험 — plan_type='Brand Basic'으로 일시 변경 후 UI 전체 점검 (숨은 구멍 찾기, 필요 시 "Upgrade to unlock" CTA 추가 여부 판단)
- Invoice 수동 발행 UX 개선 — basic 고객 매달 수동 청구를 위해 financial_terms 에서 금액 prefill 등 편의성 (선택적, Plan advance 고객에게도 valuable)
- 블로그/랜딩/Pricing 페이지 티어별 기능표 정리 — v3.17에서 티어 게이팅이 명확해졌으니 공개 페이지 설명 갱신
- 계약 Detail "Open contract →" 후속 플로우 검증 — opener-aware navigate 팝업 + 기본 창 양쪽 케이스 실사용 확인
- 운영 DB 에서 Restaurant #10 후속 — Irene 판단 시 brand 이동 실행 (v3.17 배포로 가능해짐)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
