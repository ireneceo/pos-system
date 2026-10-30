# Fable 게이트 판정 — 오너 다매장(레스토랑 2개 이상) 공급업체·상품·원가 (2026-10-29)

Irene 원문: «레스토랑 오너가 레스토랑 2개 이상을 관리하는데 문제되는 구조나 기능이 없는지 체크해줘. 공급업체 통합관리/분리관리, 공급업체 상품관리는 오너가 직접 하는 거 제대로 해주고, 스톡아이템과 연결하는 건 레스토랑관리자가 자기 페이지에서 하는 거야.»
기준 설계: `docs/SUPPLIER_CONTRACT_SYSTEM.md` §H-3(오너 공급업체 = 상속) · §H-4(오너 매장 전환 관리 · 재고아이템 연결은 매장만) · 10-22 게이트 §5-1(«매장 주소 from-catalog 는 오너가 통과 — 새 사안»).

## 0. 판정 — **통과 (게이트에서 어긋남 1개를 찾아 Fable 이 직접 정정한 뒤 통과)**

팀원 변경 4건은 전부 설계 안이고, 설계가 매장 쪽에서 실제로 닫히지 않던 3곳(계약 판정 · 원가 전파 · 오너 403)을 **새 표·새 실체·새 경로 없이 기존 함수 하나로** 맞췄다. 게이트에서 1곳(③ 오너 403 조건)이 buyerScope 의 기존 규칙과 어긋나는 것을 찾아 같은 조건으로 좁혔다(아래 §1). 운영 배포는 다음 배포 때(마이그 0 · 화면 코드 0 · SW bump 불필요).

## 1. 게이트에서 찾은 어긋남 1개 — Fable 이 직접 정정

**③ `POST /restaurants/:id/ingredients/from-catalog` 의 오너 403** 이 `req.user.role === 'Restaurant Owner'` 전부였다. 그런데 구매자 라우트의 문(`middleware/buyerScope.resolveBuyerFromUser`)은 **소속 매장(`users.restaurant_id`)이 있는 오너를 그 매장의 매장 구매자**로 본다 — 그런 오너는 `/api/ingredients/:id/seller-sources`(기존 아이템에 연결)는 되는데 같은 뜻의 from-catalog 만 403 이 되는 두 문 어긋남. 화면(`AllSupplierProductsView.tsx:71`)도 같은 규칙으로 그 오너에게 «Add to my items» 를 보여 준다.
→ 조건을 buyerScope 와 **같은 규칙 하나**로: `role === 'Restaurant Owner' && parseInt(req.user.restaurant_id) !== parseInt(req.params.restaurantId)` 일 때만 403. 다매장 오너(소속 매장 없음)는 어느 매장 주소로도 403 그대로(Irene ②).
- 실측: 소속 매장 38 인 임시 오너 → 매장 38 from-catalog(빈 본문) **400**(문 통과 뒤 본문 검사) · 같은 오너의 restaurant_id 를 NULL 로 → **403** «Stock item links are managed by the restaurant admin». 임시 행 삭제 확인(users 0 · supplier_companies 0).
- dev 에 소속 매장 있는 오너는 0명(활성 오너 2명 모두 NULL) · 오너 계정의 RA 모자(user_contexts) 0 — 그래서 팀원 검증에서 드러나지 않았다. **운영 DB 는 읽지 않았다(확인 안 함)** — 있어도 이 정정으로 기존 동작(매장 구매자)이 유지된다.

## 2. 변경 1~4 대조 (설계 범위 밖 변경 0)

| # | 파일 | 판정 |
|---|---|---|
| 1 | `services/restaurantCatalogLink.js` — 공급업체 계약 판정을 `supplierAccess.findEffectiveContract(sid, {type:'restaurant', id})` 로 | **통과.** 발주(`purchase-orders-crud verifySellerRelation`)·`seller-sources`·`stock-ledger` 와 같은 함수 = §H-3 «상속 판정 단일 소스». 의미 차이: ① 자기 행이 없으면 오너 상속(오너 등록 외부 업체 · ownership · 오너 계약 active) ② 자기 최신 행이 terminated 면 null(예전 `findOne({status:'active'})` 는 옛 active 행을 집을 수 있었다 — 조이는 방향, 발주와 같음) ③ 가입 공급업체는 상속 없음(자기 행 필수, 그대로). 다른 호출자 `routes/seller-orders.js:484` 는 brand_product_id 만 넘겨 이 콜백을 타지 않는다. |
| 2 | `services/costSync.js isOwnedByActor` — actor `owner` 분기 | **통과.** §8-4 D-3 «구매자가 일으킨 전파는 구매자 소유 행 밖으로 안 나간다» 를 오너 = 소유 매장으로 해석: `kind==='ingredient' && owner_type==='restaurant' && restaurant_managers(ownership)` 만 true. 브랜드 공유 재료(owner_type brand)·BG 재고아이템(product_ingredients)은 false — 오너 업체는 브랜드에 상속되지 않으므로 그 행에 공용 연결이 생길 길도 없다. actor 는 `supplier-directory.js:1718/1778` 이 `req.buyerEntity`(`{owner, user.id}`)로 넘긴다 — 오너가 매장 전환으로 매장 자기 업체를 고치면 actor 가 `restaurant` 라 기존 분기. |
| 3 | `routes/restaurants-ingredients.js` from-catalog 오너 403 | **조건부 통과 → §1 정정 뒤 통과.** |
| 4 | `scripts/health-check.js` security 새 1건 | **통과.** 임시 오너(데모 38 소유)·임시 업체·상품·RA38 재고아이템을 finally 로 삭제. Fable 이 `cost_change_logs` 정리 1줄 추가(오너 가격 수정이 이력 1줄을 남겨 고아 행이 쌓였다 — 다른 검사 8곳과 같은 정리). ⚠ 이 파일의 git diff 에는 다른 방 hunk(수익성 5건 · 매장 관리자 검색/할인 3건)가 섞여 있다 — 이 판정은 «오너 공통 업체 …» 1건만 본다. |

- 화면 코드 변경 0 · 마이그 0 · 🔒 인쇄 보호파일 접촉 0(print-guard 1건은 다른 방 `MainLayout.tsx`).
- 문서: `docs/SUPPLIER_CONTRACT_SYSTEM.md` §H-4 끝에 «2026-10-29 오너 다매장 점검» 절 추가(Fable) · 메모리 `reference_owner_supplier_inheritance.md` ⚠ 줄 갱신(Fable).

## 3. 검증 (Fable 직접 · 4조항)

1. **diff 대조** — 변경 3파일 21+/5- 전부 위 표 안. 설계 밖 0.
2. **가드 반증(고장주입)** — Fable 1회: `costSync` 오너 분기 끄기 → `pm2 restart` → security **✗ 1건 «오너 공통 업체 …» / 104 통과** → 원복 → **105/105**. 팀원 3회(변경 1·2·3 각각 → 각 ✗ → 원복 ✓)는 팀원 보고 그대로.
3. **실호출** — health-check security **105/105** 2회(정정 전·후) · §1 실호출 2건(400 / 403) · 팀원 실측(매장 2·3 from-catalog 201 · 오너 10→20 → 재고아이템 4개 unit_cost 20 · replace dry 20→11 · 끈 매장3 403 · 매장 자기 업체 201 · 다른 매장 업체 403 · 실브라우저 RA326 «Add to my items» 성공 unit_cost 9)은 팀원 보고 그대로.
4. **배포 안전성** — 마이그 0 · 프론트 0(SW bump 불필요) · 롤백 = 3파일 되돌리기. 운영 DB·운영 서버 접촉 0.
- `check-sensitive-diff`: ⑤ 보안 경계 3건(`validation.js`·`server.js`·`settingsGuard.js`)·③ DB 4건·① 보호 1건은 **전부 다른 방 변경** — 이 사안은 ⑤ 성격(권한 문)이라 게이트 대상이 맞고, 위로 판정.
- verify-all 23 중 5 실패(print-guard·health print 1건·bundle-fresh·deploy-ready·type-baseline)는 팀원 보고대로 다른 방 미빌드·메모리 게이트 몫 — **Fable 이 다시 돌리지 않음(확인 안 함)**. 배포 방이 전체를 다시 돈다.

## 4. 확인 못 한 것 (추측하지 않는다)
- 운영 DB 에 «소속 매장 있는 오너» 가 몇 명인지 — 읽지 않음. 정정 덕에 어느 쪽이든 기존 동작 유지.
- 팀원 실브라우저 결과는 재현하지 않음(화면 코드 변경 0 이라 재현 가치 낮음).

## 5. Irene 에게 물을 것 — **없음**
«남은 구조 사실» 3가지는 모두 이미 Irene 이 정한 것(§H-3 §1-C 자동 병합 없음 · 10-22 컨펌 ① 되돌림 없음 ⑥ 월결제 매장만 · 매장별 가격 불가는 «한 행 공유» 의 정의)이라 새 결정이 필요 없다. 알려진 한계 하나만 적어 둔다(결정 아님): 매장들이 각자 넣어 둔 같은 업체를 한 매장 것만 «오너 공통으로 올리기» 하면 다른 매장엔 자기 사본 + 공통 둘이 보이고 그 매장 재고아이템은 자기 사본에 묶인 채라, 그 매장 RA 가 하나씩 다시 연결해야 한다(«바꾸고 삭제» 는 같은 업체 안에서만). 실제 매장에서 이 요청이 오면 그때 설계(업체 간 연결 옮기기 = 상품 이름 맞추기라 추측이 들어가 지금은 만들지 않는 게 맞다).

## 6. 마커
- 통과 마커는 이 판정문을 쓴 뒤 Fable 이 직접 찍는다(`fable-gate.js pass`). **지문은 작업공간 전체**라 다른 방 미커밋 변경(수익성 · 매장 관리자 검색 · GTM 4파일 · 🔒 MainLayout.tsx · `fable-design-20261029-store-direct-path.md`)까지 들어 있다 — 그 변경들은 이 판정의 대상이 아니다(각자 자기 게이트). 마커 뒤 어느 방이든 한 줄만 고쳐도 마커는 죽는다(정상).
- 팀원이 만든 증거 스크립트 2개(`.claude/evidence-20261029-owner-multistore-{audit,ui}.js`)는 «끝에 삭제» 계획대로 **Fable 이 마커 전에 지웠다**(미추적 파일도 지문에 들어가서) — 팀원은 다시 지우려 하지 않아도 된다. 숫자는 이 문서 §3 에 남겼다.
- 팀원 할 일: `.claude/session-state.md`(지문 제외) 갱신 · 보고 ✅ «운영 반영: 다음 배포 때».
