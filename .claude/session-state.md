# Purple POS — 개발 세션 상태

<!-- AUTOSAVE-STALE-BANNER -->
> **[AUTO-SAVE STALE] (2026-07-13 04:55, idle 1835s)** — narrative 가 마지막 편집된 이후 작업 파일이 변경됐는데 narrative 가 미갱신 상태로 자동저장됨. /개발시작 진입 시 git HEAD 와 대조해 진행/완료를 정정하고 이 블록을 삭제할 것.
> 변경된 작업 파일: inventory-core.js,inventory-extra.js purchase-orders-crud.js,health-check.js inventoryDeductionService.js,brandStockAccess.js stockAlerts.js,SettingsModal.tsx DashboardSection.tsx,StockListSection.tsx types.ts,StockTakePage.tsx
<!-- /AUTOSAVE-STALE-BANNER -->

## 현재 작업 상태
**마지막 업데이트:** 2026-07-12 (심야)
**버전:** v3.68 (운영). 오늘 배포 5회 모두 **버전 미상승**(기능 수정·신규 기능).
**작업 상태:** 완료 — Fable 최종 게이트 승인 후 운영 배포, **운영 실검증 11/11**.

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 2026-07-12 #2)

#### 브랜드 재고 공유 (신규 기능, 운영 배포 · Backup 20260712_201511)
> Irene "공급업체·스톡아이템도 브랜드에 연결하면 레시피처럼 공유돼야 한다. K-DINE with MIN 기준으로." · 설계 = `docs/BRAND_STOCK_SHARING_DESIGN.md`
- **Fable 구조판정 C안** — 내가 제안한 `product_ingredients` 통합은 **기각**. 그건 *본사 자체 구매 재고*(current_stock/PAR/실사 = buyer 재고)라 브랜드 표준 재료와 **성격이 다르다**. 통합해도 K-DINE 은 계약 0건이라 발주 불가 → 전제가 무너짐. 정석 = **이미 있는 구조를 잇는다**.
- 브랜드 재료(`ingredients.owner_type='brand'`, 운영 270건) → 소속 매장에 **읽기전용** 공유. 매장은 발주·입고·레시피에 사용, **수정·삭제·공급처 연결은 브랜드 전용**.
- **신규 테이블 1개** `restaurant_ingredient_stocks`(매장별 실재고 오버레이) — 브랜드 공유 행의 current_stock 을 매장이 갱신하면 형제 매장 재고가 오염된다. 단가는 기존 `restaurant_ingredient_costs` 와 대칭. **데이터 이관 0**.
- 접근·재고 규칙 **단일 소스** = `utils/brandStockAccess.js`(readable/writable/stockFor/applyStock). brand_id 는 **항상 서버 조회**(형제 브랜드 누출 방지).
- **K-DINE 이 막혀 있던 진짜 원인** = `buyerScope` 가 BG 를 primary 브랜드(brand 1)에 고정 → **두 번째 브랜드(K-DINE=brand 2) 재료엔 공급처를 붙일 수조차 없었다**(그래서 운영 매핑 0건·계약 0건). → 소유 브랜드로 전환 허용(`?entity_type=brand&entity_id=N` + `Brand.owner_id` 검증, `isBrandManager` 와 동일 기준). 프론트도 와이어링(안 하면 **primary 브랜드로 잘못 귀속**되는 침묵 버그).

#### 함께 봉쇄한 기존 결함 (전부 이번 절단면 안)
- **IDOR 5개**: `/inventory/receive` · `/inventory/deduct` · PAR settings · 재료 `PUT` · 재료 `DELETE` 에 **소유권 검사가 아예 없었다** — 남의 매장 재료를 id 만으로 입고·차감·수정·삭제 가능.
- **`/inventory/deduct` 항상 500** — 라우트 분리 때 `checkAndCreateAlert` 헬퍼가 유실(호출 화면이 없어 미발견) → `utils/stockAlerts.js` 로 공용화(알림은 매장 스코프 — 안 그러면 A매장 입고가 B매장 알림을 지운다).
- **주문 차감·FIFO 배치가 브랜드 행을 깎던 것** (Fable P0 적발) — 입고=오버레이 / 차감=브랜드행 이면 **이중장부**가 된다. 폐기·PO 반품 환원도 동일 분기.
- **레시피 재료 소유권 검증 없음** — 운영에 **타 브랜드 재료 참조 1건 실재**.

#### 부록 (공급업체 혼동 정리)
- **Direct → External(외부업체)** 명칭 변경(4언어) · **Find Suppliers 에서 외부업체 제외**(= 가입 공급업체를 찾아 계약 신청하는 곳) · 외부업체 프로필의 **계약 UI 제거**(자동계약은 발주를 열어주는 내부 장치일 뿐) · 운영 테스트 잔재 `__EDIT_DELETE_TEST__` 삭제.
- 확인: **외부업체는 유저 계정이 생기지 않는다** (운영 39곳 전부 owner_id NULL, supplier 역할 유저는 데모 1개뿐).

#### 발주 리스트 보기 재작성
- 원인: **카드 마크업을 grid 행에 흘려넣어** 열과 자식이 어긋남 → 가운데 공백·정렬 붕괴. 행마다 별개 grid 라 `auto` 열은 행별 폭이 달라짐. 미디어쿼리가 **뷰포트**를 봐서(카트 패널 때문에 1100px 창에서도 리스트 실폭 490px) 이름 열이 35px 까지 찌그러짐.
- 수정: **5열 전용 마크업**(이름+배지/분류/공급처/가격/액션) + **컨테이너 쿼리**(리스트 실폭 기준) + 가격·액션 고정폭(행 간 정렬 보장) + **행높이 44px 균일**. 토글은 **POS Image/Compact 와 동일 디자인**(연회색 트랙+흰 활성칩) · 우측정렬.
- 실측: 5개 폭 전부 열정렬 ✓ · 행높이 44px · pageerror 0.

#### 검증
- 실호출 30/30(읽기전용·공급처 읽기/쓰기403·발주 생성/타브랜드 차단·입고 오버레이·**실주문 차감 오버레이**·IDOR 404·본사체인 무접촉) · health-check `pos` **27/27**(브랜드 재고 회귀 **6건 신규 박제**) · verify-all **13/13** · print-guard 8/8 무접촉.
- **Fable 최종 게이트: 승인** (C1 deduct 500 · C2 죽은 토글 수정 후).
- **운영 실검증 11/11** — 테스트 매장(rid=5)에서 주문 생성 → 단계이동(preparing→ready→served) → **현금 결제 completed** → 인쇄 계약(동시 claim 5개 중 **1개만 승리**, printed 후 재인쇄 0) → 주문 삭제·인쇄 플래그 정리(**종이 안 나감**).

### 다음 확정 작업
- 없음 — 지시 대기

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **브랜드 재료 실사(stock-take)·발주제안 미지원** (Fable 별건 판정) — 현재 매장 실사 목록이 브랜드 재료를 제외한다(`inventory-core.js` restaurant_id 만). 포함하려면 complete 경로도 오버레이 분기 필요.
- **Find/Contracts 페이지의 BG 브랜드 선택 UI** — 두 번째 브랜드 명의로 *가입 공급업체* 계약을 신청하려면 필요(외부업체 경로는 이번에 해결됨).
- `inventory-core.js` stock-take complete 의 stockTakeId 매장 귀속 미검증(기존 IDOR, 이번 범위 밖).
- `po-returns.js` brand-seller 환원이 buyer 감소와 같은 행을 도로 증가시켜 net 0 이 되는 기존 버그 의심 — 별도 조사.
- with MIN 매장 인쇄 1회 물리 테스트(사람 필요) · timezone(242)·design(310) baseline 부채 · E2E 시나리오 확장

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```

> 전체 완료 아카이브(과거 세션 상세)는 `DEVELOPMENT_PLAN.md`. 이 파일은 진행/다음/후속의 단일 소스.
