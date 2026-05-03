# Dashboard 통계 사전 집계 설계서

> **작성일:** 2026-05-03
> **상태:** 설계 확정 — 구현 진행
> **규모:** 중 (DB 모델 1개 + scheduler + backfill + endpoint 통합)
> **트리거 근거:** 운영 점검 P1 라운드 (`docs/OPERATIONAL_READINESS_AUDIT.md` §B9)

---

## 1. 배경

`routes/dashboard.js` 의 sales-chart / reports-summary 등은 **매 요청마다 Order 테이블에서 raw row 들을 fetch 후 application 레벨 GROUP BY** 한다.

가장 무거운 endpoint:
- `GET /api/dashboard/restaurant/:rid/sales-chart?period=year` — 최대 365일 분 order row 모두 fetch (식당당 일 50건 × 365 = 18,250 row), 메모리 GROUP BY → 응답 비대
- `GET /api/dashboard/admin/stats` — 모든 식당 across 매출 합산
- `GET /api/dashboard/restaurant/:rid/reports-summary` — 기간 필터 + 다중 지표 집계

식당 25 → 100+ 시점에서 응답 1초 초과 위험. 트리거 도달 전 사전 집계 도입.

---

## 2. 설계 목표

| 항목 | 값 |
|------|---|
| 대상 stat | revenue, order_count, average_order_value (가장 자주 호출) |
| 집계 단위 | restaurant × date (DATEONLY in restaurant timezone) |
| 집계 시점 | 매일 site timezone 00:30 (어제 데이터) + 백필 30일 |
| Fallback | 오늘 데이터 (집계 안 된 날짜) 는 실시간 query, 어제 이전은 사전 집계 lookup |
| Status filter | `completed` orders only (기존 sales-chart 와 동일) |

---

## 3. DB 모델

### `RestaurantDailyStats`

```javascript
{
  id: INTEGER PK,
  restaurant_id: INTEGER NOT NULL (FK Restaurant.id, ON DELETE CASCADE),
  date: DATEONLY NOT NULL,        // restaurant timezone 기준 YYYY-MM-DD
  revenue: DECIMAL(12,2) DEFAULT 0,
  order_count: INTEGER DEFAULT 0,
  average_order_value: DECIMAL(10,2) DEFAULT 0,
  currency: STRING(3),            // 집계 시점 식당 통화 snapshot (예: MYR)
  timezone_snapshot: STRING(50),  // 집계 기준 timezone (예: Asia/Kuala_Lumpur)
  computed_at: DATETIME,          // 마지막 집계 시각 (재계산 추적)
  createdAt, updatedAt
}
```

**제약:**
- `UNIQUE(restaurant_id, date)` — 한 날짜당 식당 1 row
- INDEX `(restaurant_id, date DESC)` — sales-chart range query 최적화

**고려:**
- `payment_method_breakdown JSON` 등 추가 stat 은 v2 (이번 라운드 X)
- multi-currency 식당 — 현재 식당 1개당 currency 1 (operation_settings.currency) → row 1개로 충분

---

## 4. Scheduler

### `services/dailyStatsScheduler.js`

```
node-cron 매일 00:30 site timezone (UTC offset 자동 계산)
  ├─ SchedulerRun.create('running')
  ├─ 모든 active 식당 list
  │   ├─ 각 식당 timezone 별 어제 (yesterdayStr) 계산
  │   └─ Order completed where order_date in [yesterday 00:00, 23:59 UTC bounds] 집계
  ├─ RestaurantDailyStats.upsert (UNIQUE 키 (restaurant_id, date) 충돌 시 update)
  └─ SchedulerRun.update success/error/results
```

**Site timezone 처리:**
- 식당별 `operation_settings.timeZone` 이 다를 수 있음 — 각 식당 별로 어제 bounds 계산
- order_date 는 UTC 저장 → 식당 timezone 에서 어제 0시~23:59 의 UTC 범위로 변환

**Idempotency:**
- 같은 (restaurant_id, date) 재집계 시 upsert 로 갱신 (멱등)
- cron 실패 후 재실행 안전

---

## 5. Backfill 스크립트

### `scripts/backfill-daily-stats.js`

```
node scripts/backfill-daily-stats.js [--days=30] [--restaurant-id=NN]
  ├─ 모든 식당 (또는 특정 restaurant-id) × 최근 30일 (또는 --days)
  ├─ 각 (restaurant, date) 에 대해 dailyStatsScheduler 와 동일 집계 로직
  └─ upsert
```

**용도:**
- 운영 배포 직후 1회 실행 → 과거 데이터 채우기
- 디스크 사고 복구 시 재계산
- 재계산 디버깅 (특정 식당)

---

## 6. Endpoint 통합

### `routes/dashboard.js` 변경

**대상 endpoint (이번 라운드):**
1. `GET /api/dashboard/restaurant/:rid/sales-chart` — 사전 집계 lookup with today fallback

**처리 방식:**
```js
// (의사 코드)
const todayStr = todayInTimezone(restaurant.operation_settings.timeZone);
const dateRange = computeDateRange(period); // [start, end] in YYYY-MM-DD

// 어제 이전: 사전 집계
const aggregated = await RestaurantDailyStats.findAll({
  where: { restaurant_id, date: { [Op.between]: [start, yesterday] } }
});

// 오늘: 실시간 query (오늘 분은 cron 안 돔)
let todayRow = null;
if (dateRange.includes(todayStr)) {
  todayRow = computeTodayLive(restaurant_id, todayStr); // Order.findAll + reduce
}

// 통합 결과 반환
return [...aggregated, todayRow].fillMissingDates();
```

**다른 endpoint (별도 라운드):**
- `GET /api/dashboard/restaurant/:rid/reports-summary` — period 필터 광범위, v2 에서 처리
- `GET /api/dashboard/admin/stats` — 모든 식당 합산, v2 에서 처리

---

## 7. 검증

- backfill 후 sales-chart 응답이 사전 집계 + today 실시간 으로 분리 동작 확인
- 같은 식당 같은 기간 응답이 사전 집계 vs 실시간 비교 시 동일 (백필 후)
- cron 실행 SchedulerRun 기록 확인
- health-check 73 → 74+ (daily stats endpoint 추가 시)

---

## 8. 향후 확장 (이번 라운드 X)

- `payment_method_breakdown JSON` (cash / card / wallet 분포)
- `top_items JSON` (상위 5개 메뉴)
- multi-tenant aggregation (Brand/Foodcourt 단위)
- materialized view (PostgreSQL 전환 시)
- ETL 파이프라인 (BullMQ + Redis 도입 시 worker 분리)
