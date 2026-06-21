# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-06-21 (데모 버그 8건 + 다매장 쿠폰 신축 + 시재 드로어 동기화 — DEV 완료·검증 통과·운영 미배포)
**버전:** **v3.60 운영 배포됨 (2026-06-20).** 이후 백스테이지 배포 2건(버전 미상승). 6/21 작업은 DEV 미배포. SW_VERSION=3.68-demo-bugfixes-coupons-20260621.
**작업 상태:** 완료 (DEV 검증 통과) — **운영 배포 대기(Irene /배포)**

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션, 2026-06-21 · DEV 검증 통과 · 운영 미배포)
- **데모 버그 8건 일괄 수정** (운영 데모=고객사 노출용, "6/16 수정 반영 안 됨" 보고를 3개 역할 병렬 조사로 근본원인 확정):
  - FG/Brand System Inquiry 등록 실패(500) — create 카테고리값이 ENUM 밖 → 유효값
  - BG Recipe category 등록(400) — brand_id 미전송 → 전송
  - BG Linked Recipe 드롭다운 빔 — 브랜드 선택 상태 localStorage 키 공유
  - BG Add Admin 매장필수(403) — users.js allow-list에 BG/FG(소유권 스코프·매장 optional) + 프론트 필수 해제
  - BG Deactivate(403) — auth.js userCanAccessRestaurant 에 브랜드/푸드코트 소유권 분기 추가
  - Owner 추가매장 목록 안 보임 — 응답 shape + claim oversight→ownership 승격([[reference_owner_restaurant_claim]])
  - Owner Operation Inquiry Status 항상 closed — 푸터 하드코딩 제거(4파일), 드롭다운 선택 저장
  - Owner send-to-work-manual 무반응(500) — author_name null 폴백 + Owner 매장 귀속
  - (이미 dev 정상이던 FG 매장추가·BG 댓글삭제는 SW bump+빌드로 데모 반영)
- **시재(Cash Management)** — Today's Cash Drawer 버튼 렌더 누락 수정 + 페이지에 팝업과 동일 드로어 잔액(개시+입−출) 표시로 계산 동기화
- **다매장 쿠폰 신축(FG/BG)** — "전 매장/선택 매장" 타게팅. 매장당 1행 materialize + scope_group_id 묶음(결제/검증/orders-crud 무변경). migrate-coupon-scope.js(coupons 4컬럼, deploy 9a-2 등록) + routes/coupon-groups.js + ManagerPromotionsPage 전면 교체. 설계=docs/COUPON_MULTI_RESTAURANT.md, [[reference_coupon_groups]]
- **검증(/검증 10단계 전부 실행)**: 실API 16/16(Write→Read 왕복) · 쿠폰 백엔드 9/9 · 실브라우저 mount 10/10(pageerror/console/ErrorBoundary 0) · health 107/107 · print-guard 8/8(인쇄 무관) · state-hydration 0 · timezone 신규 0 · i18n:verify 0 error

### 다음 확정 작업
- 없음 — 지시 대기
  (단, **운영 배포 미실행 상태**: Irene 이 "쿠폰까지 만들고 한 번에 배포" 결정 → /배포 시 6/21 작업 전체 + 밀려있던 6/16 수정이 운영 반영. migrate-coupon-scope.js 가 deploy 9a-2 에서 자동 실행됨)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- 새 쿠폰 페이지 i18n — 현재 영어 라벨 하드코딩(기존 쿠폰 PromotionsPage 도 영어). 4언어 t() 적용 여지
- FG-B 쿠폰 후속 — 고객/등급 타게팅, 쿠폰 사용 리포트(매장별 사용수), 만료 자동 비활성
- 인앱 Docs/매뉴얼 시스템 — docs/IN_APP_DOCS_MANUAL_SYSTEM.md 기획만 됨
- 매장 실프린터 확인 대기 — Z-Report 종이·드로어·주방티켓(v3.60 시재/마감) 현장 눈확인
- 운영시간(요일별)+라스트오더 게이트 — 기획 확정·미구현(설계 문서 있음)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
