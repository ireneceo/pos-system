# Fable 게이트 판정 — 브랜드 Performance 통계 (2026-11-02)

설계: `.claude/fable-design-20261101-brand-performance.md` · 검증 기록(Opus): `.claude/fable-verify-20261101-brand-performance.md`
Irene 원문: «https://purplehere.com/pos/brand/general/performance 모든 퍼포먼스 통계들 맞는지 확인해주고 브랜드나 레스토랑 추가되는거 제대로 적용되는지도 확인해줘.»

## 판정: PASS

### ① diff 범위 대조 — 설계 §2 안
- 서버: `managerBrandScope.restaurantIdsForBrandUser`(브랜드 매장 ∪ 매니저 행 — 🔒 orders-crud GET / 의 식과 줄 단위로 같음) · `restaurants-crud` GET / BG·BM 분기만 `whereClause.id` 로, `/manager/:id` BG·BM 분기만 교체(FG·Owner·SA 분기 무접촉, 응답 `timeZone` 1필드) · `auth.js` 두 게이트에 같은 `brandScopeIncludes` 폴백(푸드코트 폴백 그대로).
- 화면: 유틸 2개(순수 함수) · Overview 계산을 `brandPerformanceMath` 로 · 6탭 기간 fetch(≤366일 limit=0 / 초과 5,000+안내)·`isRevenueOrder`·매장 시간대 버킷 · 라벨 i18n 4언어 · SW 6.05.
- 설계 밖 1건(6탭 총매출 = 차트 칸 반올림 합 → 정확 합): 실브라우저 2,764.00 ≠ SQL 2,761.71 로 잡힌 실제 결함 수정, 매출 정의는 같은 `revenueOrders`. **수용.** 콘솔 로그 제거는 고친 함수 안 정리.

### ② 가드·기계 게이트 (판정 세션 재실행)
- print-guard 8/8 변경 0 · check-sensitive-diff = ⑤ 대상(auth.js — 정상) · jest `brandPerformanceMath.test.ts` 5/5(orderLocalTime 사례 포함).
- mount: 현재 서빙 번들(03:32 빌드 · `periodLast30Days` 문자열 포함 · sha e791b327…)이 03:49 sweep 통과(.sweep-cache). 그 전 번들에서의 mount 실패 1회는 로그 잘림으로 원인 **확인 못 함** — 현재 번들로는 통과이고 아래 실브라우저에서 console.error 0.
- 빌드 3회차 EXIT 1 원인 확인 못 함 — 4회차 성공·현재 번들 정상(기록만).

### ③ 실호출·실브라우저 (판정 세션 직접)
- 범위: 22 → {38,39}/{38,39} · 2212(BM) → {39}/{39} · 11(배정 BG) → {1,5,8,10,24}/{1,5,8,10,24} — 두 경로 동일, 설계 §4-1 기대값과 일치. 주문 범위 ⊆ 목록(22: 38,39 · 2212: 39 · 11: 1,5,8,10).
- 목록 ⊆ 상세: 2212→39 · 11→24 · 11→8 · 2001→24 메뉴 200·상세 200. 남의 브랜드: 2212→38 · 11→38 · 2002→24 메뉴 403·상세 403.
- 숫자: SQL(KL 30일 · completed/served · 삭제 제외 · createdAt UTC 저장) = 52건 RM 2,906.19. Playwright 로 계정 22 Overview 를 KL·Seoul·LA 세 시간대로 열어 **셋 다 RM 2,906.19 · 52건 · +3953.8%**, 요청 창 `start_date=2026-09-03&end_date=2026-11-03&limit=0`(이전기간 앞 하루·끝 뒤 하루), console.error 0.
- 고장주입 2회(폴백 제거 → 메뉴 200 실패 · 매니저 행 합집합 제거 → 계정 11 에서 8·10 빠짐)는 Opus 기록 채택(코드 수정 금지 규칙상 재현 안 함).

### ④ 배포 안전성
- 마이그 없음 · SW bump 있음 · 🔒 보호파일 무접촉. 롤백 = 코드 되돌리기만.
- 넓어지는 권한(사실로 Irene 보고 한 줄): 브랜드 매니저·배정만 된 브랜드 총괄이 자기 브랜드 매장 전체(목록·상세·메뉴 등 `checkRestaurantAccess` 라우트)에 닿음 — 2026-10-11 «매니저 = 회사 직원» 판정의 연장, 주문은 이미 같은 범위, 돈 경계(현금 쓰기는 cashWriteGate·requirePaymentAccess 별도 게이트·결제설정·구독·브랜드 수정)는 그대로.

### 남긴 것(이 일 밖 · 기록)
- `GET /api/brands` 는 배정만 된 BG 에게 소유 브랜드만 → 계정 11 류는 브랜드 필터·브랜드 랭킹 줄이 빈다(매장 줄은 나옴). 별도 건.
- 6탭 All 기간 시작 2020-01-01(기간 필터 공용 정의) · 서버 집계 라우트 전환은 설계 §3 대로 범위 밖.
