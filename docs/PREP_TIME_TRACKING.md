# 준비시간 추적 (Preparation Time Tracking)

> 작성: 2026-06-03 · 상태: 설계 (Irene 확인 대기) · 결정: 신호등 3단계 + 주방 진입 시각 기준

주방(KDS)·서빙(Floor Plan 아이템리스트)·홀(테이블)에서 "이 음식/주문이 얼마나
기다렸는지"를 매장 설정 기준으로 표시한다. **타이머는 긴급(초과)한 것만 움직여**
시각적 노이즈 없이 늦은 주문만 시선을 끈다.

---

## 1. 결정사항 (Irene 승인)
- **표시 방식 = 신호등 3단계.** 평소 정적, 초과한 것만 맥동.
- **기준 시각 = 주방 진입 시각** (order `printed_at` / kitchen 진입). 실제 조리 시작점.
  - 미설정/주방 진입 기록 없으면 fallback = order `createdAt`.
- served 되면 타이머 정지·소멸.

## 2. 신호등 3단계

| 상태 | 기준(경과/목표) | 색 | 텍스트 | 움직임 | 형태 |
|---|---|---|---|---|---|
| On-time | < threshold% | `#6B7C93` 회색 | `4m` (남은시간) | 정지 | 테두리 없음 |
| Due soon | threshold% ~ 100% | `#F59E0B` 황색 | `2m left` | 정지 | 테두리 |
| Overdue | > 100% | `#EF4444` 적색 | `+3m` (카운트업) | **느린 맥동(~1.2s)** | 채움 + ● 점 |

- 색맹 대비: 색 + 형태(테두리/채움/점) 동시 변화.
- 30초 틱(이미 ItemListView 에 `now` 인터벌 구현됨) 재사용. 초 단위 불필요.

## 3. 주문단위 vs 아이템단위

- **아이템단위**: 각 요리가 자기 prep time 기준으로 카운트. 소스 우선순위:
  1. `product.preparationTime` (메뉴에 설정된 값)
  2. 없으면 Settings `defaultPreparationTimePerItem`
- **주문단위**: 주문 헤더 1개 = **가장 오래된 미완성 아이템 기준**(최댓값). 소스:
  - Settings `defaultPreparationTime` (주문 전체 목표, 기존 필드 재사용)
- 세트: 구성 아이템 각각 아이템 타이머 → 세트/주문은 max 롤업.

## 4. 설정 (Settings ▸ Operations)

```
Preparation Time Tracking                         [ 토글 prepTimeTracking ON/OFF ]
├─ Default Preparation Time (order)        [ 15 ] minutes   defaultPreparationTime (기존)
├─ Default Preparation Time (per item)     [ 10 ] minutes   defaultPreparationTimePerItem (신규)
└─ Urgent threshold                        [ 80 ] %         prepUrgentThreshold (신규)
```
- 토글 OFF → 타이머 UI 전부 숨김(기존 화면 그대로). 기본 OFF(점진 도입).
- AutoSaveField 패턴(설정 페이지 표준).
- StoreContext `operationSettings` 에 3필드 추가 + 백엔드 store 설정 저장/로드.

## 5. 공유 모듈 — `utils/prepTimer.ts` (단일 진실, 기존 중복 흡수)

⚠️ **이중·삼중 코드 금지 (Irene 지시).** 시간 계산이 이미 3군데 흩어져 있다. 신규 모듈은
이들을 **흡수/재사용**하고 새로 만들지 않는다.

| 기존 코드 | 위치 | 처리 |
|---|---|---|
| `getTimeElapsed(date)` "X mins ago" | `utils/timezone.ts:177` | **재사용** (상대시간 라벨 단일 소스). prepTimer 가 분 계산 시 내부 로직 공유 |
| `TimeAgoDisplay` (10s 갱신 컴포넌트) | `LiveOrders/helpers.ts:54` | **재사용** (라이브 갱신 패턴) |
| 서브 소요시간 `(served−created)/60000` 인라인 | `LiveOrdersPage.tsx:1782` | **추출** → `getServedDurationMin()` 공유 헬퍼로 빼고 LiveOrders·ItemListView·TableDetailPanel 가 동일 호출 |
| `ItemListView.ago()` "분 전" (i18n) | `ItemListView.tsx` (2026-06-03 추가) | **prepTimer 로 흡수** — tracking ON 이면 신호등 칩이 대체, OFF 면 getTimeElapsed 폴백 |

신규 `utils/prepTimer.ts` 는 색·임계 **레벨 판정 로직만** 새로 정의(이건 어디에도 없음):
```ts
type PrepLevel = 'on_time' | 'due_soon' | 'overdue';
interface PrepResult { level: PrepLevel; remainingMin: number; overdueMin: number; label: string; }
function computePrep(startedAt, targetMin, thresholdPct, now): PrepResult  // 분 계산은 공유 헬퍼 사용
export function getServedDurationMin(startedAt, servedAt): number          // LiveOrders 인라인 추출본
const PREP_TOKEN: Record<PrepLevel, {color, pulse, shape}>
```

**결과**: 상대시간·서브소요시간·prep레벨이 각 1곳에서만 계산되고 4개 화면(LiveOrders·KDS·
ItemListView·TableDetailPanel)이 공유. 같은 숫자가 화면마다 달라지는 사고 방지.

## 6. 표시 위치 (주방 + 홀 둘 다)
1. **KDS** (`KitchenDisplayPage`) — 아이템 카드 칩 + 카드 헤더 주문 타이머.
   - ⚠️ KDS 는 🔒 인쇄 보호 파일. **표시(읽기) 추가만**, 인쇄 핸들러/poller 절대 미접촉.
2. **Floor Plan 아이템리스트** (`ItemListView`) — 지금 `· 3분 전` 자리를 신호등 칩으로 승격.
3. **Floor Plan 테이블 카드 / 우측 패널** (`TableDetailPanel`) — 주문단위 타이머.

## 7. 구현 순서
1. Settings: 토글 + 2필드 (StoreContext + 백엔드 store 저장/로드) → 검증
2. `utils/prepTimer.ts` 공유 모듈 + 단위 테스트
3. ItemListView 적용 (신호등 칩) → 검증
4. KDS 적용 (표시 전용, 인쇄 무접촉, check-print-guard 통과 확인) → 검증
5. TableDetailPanel / 테이블 카드 주문 타이머 → 검증
6. i18n 4개 언어 + mount sweep + health-check

## 8. 주의 (🔒 인쇄)
- KDS 수정은 표시 레이어만. `check-print-guard.js` 변경 0 또는 표시 코드 외 미변경 확인.
- 인쇄 동작/타이밍/라우팅 절대 변경 없음. `docs/PRINT_RULES_MATRIX.md` 🔒 유지.
