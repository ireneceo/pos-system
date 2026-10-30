# 브랜드 수익성 분석 1단계 — Fable 게이트 재확인 판정 (2026-10-30)

> 판정: Fable(리더) · 구현: Opus 팀원(작업방 d91b977b) · 설계 `.claude/fable-design-20261029-brand-profitability.md` §5·§10
> Irene 원문: 설계 Q1~Q5 «권고대로 진행해 줘» · 빌드 재시작 «권고대로 진행해 줘» · print-guard bless «권고대로»
> 앞선 판정(2026-10-29): 조건부 PASS — 고칠 것 1(브랜드 총괄의 매장 화면 접근 범위) + 폰 화면 증거 1. 이 문서는 그 두 조건의 재확인.

## 1. 판정 — PASS (마커 찍음)

두 조건이 모두 실제로 닫혔고, Fable 이 직접 돌린 실호출·검사로 다시 확인했다. 막는 것 없음.

## 2. 조건 ① — 브랜드 사람의 매장 화면 접근 (닫힘)

코드 실측 `dev-backend/routes/profitability.js` 52~70:
- `storeAccess`: 역할이 Brand General/Brand Manager 면 `brandRestaurantIdsForUser(req.user)` 에 매장 id 가 있을 때만 통과, 없으면 404 «Restaurant not found»(비교 라우트와 같은 답). 다른 역할은 기존 `checkRestaurantAccess` 그대로.
- `view = [authenticateToken, storeAccess, requireRole(VIEW_ROLES), requireRestaurantModule]` · `manage = [authenticateToken, checkRestaurantAccess, requireRole(MANAGE_ROLES), 모듈]` — 설정·운영비·시뮬레이터는 BG·BM 403 유지(Q1-A).
- 핸들러는 전부 `rid(req) = parseInt(...)` 하나로 매장 id 를 쓴다(원문 문자열 사용 0 — grep).
- 프론트: `App.tsx` 1014 `/pos/brand/general/profitability/store/:restaurantId` 역할 `['Brand General','Brand Manager']` · `BrandProfitabilityPage` 비교 표 `linkable` 항상 · `StoreProfitabilityPage` 64 BM 도 «← Store comparison», 141 `financial_redacted` 안내 한 줄.

Fable 실호출(JWT 직접 서명 · 127.0.0.1:3001 · 기간 10-01~10-30):
| 호출 | 결과 |
|---|---|
| BG(22) 매장 38 summary | 200 · net_sales 있음 |
| BG 매장 39 summary(매니저 행 있는 상태) | 200 |
| BG 매장 1(브랜드 1 = 남의 브랜드) summary | **404** |
| BG 38 sim-baseline · settings | **403 · 403** |
| BM(2212) 매장 39 summary | 200 · `financial_redacted:true` · 금액 키(net_sales·contribution·avg_ticket·gross_sales·unit_cost) **0개** |
| BM 39 menus | 200 · 금액 키 0개 |
| BM 39 sim-baseline | 403 |
| BM `/profitability/brands/10/stores` | 200 · redacted |
| BG `/profitability/brands/1/stores` | 404 |

health-check 새 검사(`scripts/health-check.js` 11984~12005): 데모 BG 의 매장 39 매니저 행(id 67)을 지우고 summary → 200, finally 같은 값 재삽입 → 남의 매장 404 → BM 39 금액 키 없음. **검사가 가르는 근거를 DB 로 확인**: 매장 39 `admin_id = NULL`, BG 22 가 39 에 닿는 `checkRestaurantAccess` 경로는 행 67(oversight) 하나뿐 → 행을 빼면 옛 코드로는 403 이 날 수밖에 없다(팀원 고장주입 G4: storeAccess 를 무조건 checkRestaurantAccess 로 → 이 검사만 ✗ → cp 원복 cmp 일치 → 재통과 — 일관). Fable 은 공유 백엔드를 다시 재시작하지 않으려고 주입을 반복하지 않고 위 DB 사실로 갈음.
- Fable 실행 `health-check --category=security --quiet` → **105/105** · 실행 뒤 행 67 그대로 있음(restaurant 39 · manager 22 · oversight).

## 3. 조건 ② — 폰 화면 증거 (닫힘)

`/home/irene/.claude/jobs/d91b977b/tmp/shots/` 22장(04:08~04:09) · md5 중복 **0**(앞선 판정 때 세 장이 같았던 문제 해소).
Fable 이 직접 본 폰 4장(390×2600): `ra-menus-phone` 준비도 띠 5줄 + 카드마다 판정 문장(ESTIMATE·THEORETICAL 꼬리표) + 분면 4칸 + 폰에서 산점도 대신 목록 · `ra-sim-phone` 가정 슬라이더가 한 열로 · `bm-store-phone` 금액 전부 빠지고 «Amounts are hidden for brand managers; ratios are shown.» 보임, 뒤로 가기 링크 · `brand-compare-phone` 매장 카드형 + 브랜드 평균. 가로 넘침 없음. 설계 §6 «숫자 하나에 판정 하나 · 준비도 띠 · 추정 꼬리표» 가 폰에서 실제로 보인다.

## 4. 그 밖에 다시 본 것

- 수학 `tests/profitability-math.test.js` **22/22**(Fable 실행).
- 보호파일 `check-print-guard` **8/8 변경 없음**(기준 2026-10-30T04:06:17Z) · bless-log 항목 있음(MainLayout = 사이드바 3항목 + 아이콘 import).
- 차감 서비스·`revenueOrderWhere`·`orderTotals`·`foodCostMath`·`foodCostReport` diff **0줄**. `productCost.js` 는 `optionUnitCosts` **추가만**, `menuUnitCosts` 본체 무변경.
- `server.js` 수익성 몫 = 정확한 경로 마운트 2줄(`/api/restaurants/:restaurantId/profitability` · `/api/profitability`) · `settingsGuard` 화이트리스트에 `profitability` 1줄 · `models/index.js` RestaurantCostEntry 등록 · 마이그 `migrations.registry.json` 등록 ✓.
- 팀원 보고 verify-all --full 23/24(✗ 1 = 배포 준비, 미커밋) — Fable 재실행 안 함(빌드 1회·sweep 1회 규칙).

## 5. 막지 않는 권고(2단계 때 같은 파일 손댈 때)

1. `storeAccess` 에 `checkRestaurantAccess` 와 같은 `/^\d+$/` 정수 검사 1줄. 지금은 핸들러가 전부 parseInt 라 **남의 매장이 새는 길은 없다**(탐침: `38e1`→404 · `1.38e2`→404 · `38.0`→200 = 38 자기 매장). 다만 모듈 게이트(`requireRestaurantModule`)가 원문 문자열로 findByPk 하므로 `38e1` 같은 입력에선 다른 번호(380)의 요금제를 보게 된다 — 지금은 profit_analysis 가 전 요금제(Q4-A)라 영향 0, Q4-B 로 바꾸기 전에 닫을 것.
2. 앞선 판정의 비차단 셋 그대로: storesComparison 순차 읽기(2단계 캐시) · 공헌이익 카드 «왜» 줄 길이 · 탭 파일 낱개 hex.

## 6. 마커

지문에는 이 방 것 외에 같은 폴더의 다른 방 미커밋이 섞여 있다 — 오너 다매장 점검 3파일(restaurants-ingredients·costSync·restaurantCatalogLink: 자체 게이트 `fable-gate-20261029-owner-multistore.md`) · server.js LISTEN_HOST(그 방이 기계 확인, Fable 안 씀) · GTM 보류 4파일 · playwright 관문 머리글 · session-state. 이 판정은 **수익성 1단계**에 대한 것이고, 다른 묶음은 각자 기록대로.
