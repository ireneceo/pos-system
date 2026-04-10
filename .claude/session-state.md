## 현재 작업 상태
**마지막 업데이트:** 2026-04-10 (저녁 — Phase C 진행 완료)
**현재 버전:** v3.12
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- **Phase C-1/C-2 운영 배포** (17:19) — 토큰 키 단일 진입점 + 하드코딩 fallback 제거. 운영 health-check 39/39 통과
- **Phase C-3 개발 완료** — Fetch 인터셉터 단일화. 신규 `utils/httpClient.ts`에 `installFetchInterceptor()` + `setOn401Handler()`. `index.tsx`에서 1회 호출, `AuthContext`는 on401 콜백만 등록. StrictMode/HMR 인터셉터 누락·중복 위험 해소
- **Phase C-4 개발 완료** — `CustomerContext` 내부 분할
  - 신규: `contexts/customer/types.ts`, `useMobileCustomerState.ts`, `usePosCustomersState.ts`
  - `CustomerContext.tsx`는 composite provider로 재작성 (공개 API 불변 → 10개 consumer 무수정)
  - **레스토랑 간 모바일 세션 격리 버그 수정**: per-slug localStorage 키 (`mobile_customer:<slug>`, `mobile_guest:<slug>`, `mobile_token:<slug>`). `history.pushState/replaceState` 패치로 SPA 네비게이션 시 `locationchange` 이벤트 발생 → 즉시 상태 재로드. 첫 로드 시 레거시(스코프 없는) 키 자동 정리
  - `mobile/utils/mobileApi.ts`도 per-slug 토큰 키로 업데이트
- **Phase C-5 개발 완료** — 백엔드 5개 거대 라우트 → 16개 파일로 분할
  - customers.js 1263 → barrel + self(223) + admin(320) + auth(608)
  - mobile.js 1304 → barrel + helpers(163) + public(602) + orders(565)
  - orders.js 2140 → barrel + crud(1501) + views(469) + payment(231)
  - restaurants.js 2204 → barrel + subscription(461) + crud(1648) + ingredients(152)
  - invoices.js 3170 → barrel + helpers(418) + main(2327) + payment(527)
  - 마운트 순서 주의: customers는 self→auth→admin, literal 경로가 `/:id` 와일드카드보다 먼저
  - cross-module: `routes/owner.js` → `./invoices`에서 `getIssuerCompanyInfo/getPayerCompanyInfo` require → invoices.js 배럴에서 re-export로 호환
  - 중간 회귀 3건 즉시 수정: mobile-helpers `TableQRSession` 중복 선언, orders-payment `isPaymentAllowed` helper 누락, mobile-public `Order` import 누락
- **63개 백엔드/셸 스크립트 이모지 치환** — ✅/❌ → ✓/✗ (perl bulk 안전 치환). 운영 배포는 미뤄두고 다음 배포 기회에 합치기

### 검증
- 빌드: main.790aac97.js, 64초, 신규 warning 0
- health-check: 39/39 통과
- 분할 라우트 추가 실호출: 14/14 (total 53/53 포함 health)
- 역할별 플로우: 16/16 (POS Admin + 모바일 downtown-pizza + demo-korean-bbq)
- SPA 라우팅: 10개 경로 전부 200
- 번들 마커: `mobile_customer:`×1, `mobile_guest:`×1, `mobile_token:`×2, `locationchange`×1, `__locationChangePatched`×1, `__httpClientInstalled`×1, `auth_token`×2, 구 `__fetchInterceptorInstalled`/`__originalFetch` 0

### 운영 배포 대기분
- Phase C-3 (httpClient 단일화) — 프론트
- Phase C-4 (CustomerContext 분할 + 모바일 세션 slug 격리) — 프론트
- Phase C-5 (백엔드 5개 라우트 분할) — 백엔드
- 이모지 치환 (63개 스크립트) — 백엔드

→ 다음 `/배포` 명령 시 한 번에 운영 동기화. C-4의 모바일 세션 격리 버그 수정도 운영에 나가야 함.

### 다음 할 일
- **C-6**: 프론트 거대 컴포넌트 5개 분할 (각 세션 분리 권장, 브라우저 수동 검증 필수)
  - `pages/LiveOrders/LiveOrdersPage.tsx` 4458줄
  - `components/Inventory/InventoryManager.tsx` 3141줄
  - `pages/BrandGeneral/BrandInvoicesPage.tsx` 4566줄
  - `mobile/pages/PaymentPage.tsx` 2597줄
  - `pages/Admin/InvoicesPage.tsx` 4205줄
  - **접근법**: hook 추출(useXxxState.ts) + 서브컴포넌트 추출(XxxSection.tsx) — sed로 일괄 분할 불가 (closure/state/effects 얽힘)
- 브라우저 수동 확인: 모바일 세션 per-slug 격리 동작 확인 (Ctrl+Shift+R 후 레스토랑 간 이동 테스트)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
