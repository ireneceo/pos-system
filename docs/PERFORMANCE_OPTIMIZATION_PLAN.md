# Performance Optimization Plan

> **목적**: purplehere POS 의 페이지 진입/탭 전환 속도 개선. 운영 매장에서 직원이 체감하는 속도를 산업 표준 (Stripe, Square, Toast POS) 수준으로 끌어올린다.
>
> **작성**: 2026-05-22 (v3.37 사이클 끝). 측정/적용된 fix 와 다음 사이클 계획.

---

## 1. 현재 상태 (2026-05-22 측정)

### 1-1. 적용된 fix

| 항목 | 상태 | 효과 |
|------|------|------|
| Lazy boundary 정비 (Landing 18 + MobileApp lazy 화) | ✓ | `main.js` 1545KB → 738KB (-52%), gzip 482KB → 242KB |
| Floor Plan prefetch 제거 | ✓ | CPU 점유 부작용 차단 |
| Global fetch dedupe util (`utils/fetchDedupe.ts` + `httpClient.ts`) | ✓ | 같은 GET URL 의 in-flight Promise / TTL 2s cache 공유. POS Terminal mount fetch 16건 → 11건 (-31%). 모든 페이지 자동 적용 |
| nginx cache-control + immutable + gzip + Service Worker | ✓ (이전부터) | 두 번째 진입 즉시 |

### 1-2. 남은 병목 (측정값)

```
페이지              Mount API 호출  Mount 시간  주요 중복 (dedupe 후)
POS Terminal        11건            4.8s        cache-bust _t= 호출 / category 별 fetch
Live Orders         16건            4.6s        cache-bust _t= 호출
KDS                 13건            4.5s        /orders polling 3x (의도적)
Floor Plan          13건            4.5s        cache-bust _t=
Dashboard           22건            4.5s        composite stats
```

**원인 분류**:

| 분류 | 비중 | 본질적 해결책 |
|------|------|---------------|
| useEffect 중복 fetch (같은 endpoint) | 30% | 페이지별 mount hook 통합 또는 **React Query** |
| 명시적 cache-bust `_t=` 호출 (옛 패턴) | 20% | 호출 코드 정리 + cache 전략 |
| Composite 페이지 (Dashboard 22건) | 25% | Backend **composite endpoint** 신설 |
| 응답 size (`/api/restaurants/:id` 큼) | 15% | Backend 응답 필드 정리 |
| 병렬 fetch 의 critical path (가장 느린 1건) | 10% | Backend 단일 endpoint 응답 시간 단축 |

---

## 2. 다음 사이클 — 완벽한 솔루션 (우선순위)

### Priority A — React Query (TanStack Query) 도입 ★★★

**왜**: 업계 표준 (Stripe, GitHub, Netflix 사용). 우리 dedupe util 은 minimal subset — React Query 가 완전한 답.

**핵심 기능**:
- 자동 dedupe (동일 query key)
- Stale-while-revalidate cache (옛 데이터 즉시 표시 + 백그라운드 fresh)
- 자동 refetch on focus / reconnect
- Mutation + optimistic update
- 무한 스크롤 / pagination
- DevTools

**도입 전략 (점진적)**:
1. `@tanstack/react-query` 설치 + `QueryClient` provider
2. 공통 query key factory (`queryKeys.restaurant(id)`, `queryKeys.menu(restaurantId)`)
3. POS Terminal / LiveOrders / KDS / Floor Plan 5개 critical 페이지 우선
4. context 의 mount fetch → `useQuery` 변환
5. 점진적 mutation 도 `useMutation` 변환

**예상 효과**:
- 같은 데이터 페이지 간 cache 공유 → 두 번째 페이지 진입 즉시 표시
- 백그라운드 refresh → 옛 데이터 갱신 자동
- 페이지 mount 시간 50% 절감 예상

**작업 범위**: 큰 사이클. 5개 critical 페이지만 해도 1-2주.

---

### Priority B — Backend Composite Endpoints ★★

**왜**: 페이지가 mount 시 필요한 데이터들을 합쳐서 1번에 응답. POS Terminal 11건 → 3건 가능.

**예시**:
```javascript
// 기존: 5건의 fetch
GET /api/restaurants/5
GET /api/store/settings?restaurantId=5
GET /api/site-settings
GET /api/menu?restaurantId=5
GET /api/option-groups?restaurantId=5

// 신규: 1건
GET /api/pos-terminal/init?restaurantId=5
{
  success: true,
  data: {
    restaurant: {...},
    storeSettings: {...},
    siteSettings: {...},
    menu: {...},
    optionGroups: {...}
  }
}
```

**구현 위치**: `routes/composite.js` 또는 각 페이지 전용 init endpoint
- `/api/pos-terminal/init`
- `/api/live-orders/init`
- `/api/kitchen-display/init`
- `/api/dashboard/init`

**작업 범위**: 페이지당 0.5-1일. 단 React Query 도입 후가 더 자연.

---

### Priority C — Backend 응답 size 최적화 ★

**왜**: `/api/restaurants/:id` 응답이 크면 critical path 가 길어짐.

**작업**:
1. 응답 size 측정 (curl + wc)
2. 사용 안 하는 필드 제거 / select 명시
3. base64 인라인 이미지 검사 (image_url 사용)
4. JSON 컬럼 (`payment_settings` 등) 사용처별 필드만 응답

---

### Priority D — Cache-bust `_t=` 호출 정리 ★

**왜**: 호출자가 일부러 cache 무효화 한 호출은 dedupe 자동 제외 — 의도적이지만 일부는 불필요.

**작업**:
1. `grep -rE "_t=Date.now\(\)" src/` 호출자 찾기
2. 의도 확인 — 정말 cache-bust 필요한가
3. 불필요한 경우 제거 → dedupe 효과 자동 ↑

---

### Priority E — Backend Response Caching (Redis or in-memory) ★

**왜**: 정적 데이터 (`/api/restaurants/:id`, `/api/site-settings`) 는 자주 안 변경 — 서버 캐시로 DB 부담 ↓.

**구현**:
- `cache-manager` 또는 Redis
- TTL 60s (변경 시 invalidate)
- `siteSettings`, `restaurant info`, `menu/category` 적용

---

## 3. 측정 방법

### 3-1. 페이지 mount 측정

```bash
# scripts/perf-measure.js (Playwright)
node scripts/perf-measure.js --page=pos-terminal --cold
node scripts/perf-measure.js --page=live-orders --warm
```

지표:
- DOMContentLoaded
- API 호출 수 + 중복
- networkIdle 도달 시간
- LCP (Largest Contentful Paint)
- 가장 느린 단일 fetch

### 3-2. 정량 KPI (다음 사이클 목표)

| 페이지 | 현재 | 목표 |
|--------|------|------|
| POS Terminal mount | 4.8s / 11 calls | 1.5s / 3 calls |
| Live Orders mount | 4.6s / 16 calls | 1.5s / 3 calls |
| KDS mount | 4.5s / 13 calls | 1.5s / 4 calls (orders polling 포함) |
| Floor Plan mount | 4.5s / 13 calls | 1.5s / 3 calls |
| Dashboard mount | 4.5s / 22 calls | 1.5s / 1 composite call |

---

## 4. 절대 금지

- ❌ React Query 마이그레이션 중 운영 매장 영향 (점진적 + 페이지별)
- ❌ Backend composite endpoint 가 GET cache 안 되게 만드는 휘발성 필드 (사용자별 카운트 등) 포함
- ❌ 응답 size 줄이려고 필수 필드 (payment_status, brand_id 등) 제거
- ❌ Cache TTL 너무 길게 (60s 권장 — 매장 설정 변경 즉시 반영 안 되면 직원 혼란)

---

## 5. 참고 자료

- TanStack Query: https://tanstack.com/query
- HTTP cache 표준: nginx already configured (immutable 1년)
- v3.37 dedupe util: `src/utils/fetchDedupe.ts`, `src/utils/httpClient.ts`
- 측정 결과: 본 문서 § 1-2

---

## 6. 작업 결정 시점

Irene 의 명시 지시 시 시작. 우선순위 권장:
1. Priority A (React Query) — 가장 큰 효과 + 산업 표준
2. Priority D (cache-bust 정리) — 작은 작업 + 즉시 효과
3. Priority B (composite endpoints) — A 와 같이 진행 시 자연
4. Priority C (응답 size) — A/B 효과 측정 후 필요시
5. Priority E (서버 캐싱) — A/B/C 후 추가 절감 필요시
