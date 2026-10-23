# [Fable 게이트 판정] 공급업체 상품 삭제 — 연결 있으면 바꾸고/끊고 삭제 (2026-10-23)

> 설계: `/var/www/.claude/fable-design-20261023-supplier-product-delete.md` · 호출 조건 `gate`(②돈·주문 무결성 — 발주가 읽는 연결 줄 가격·환산을 서버가 고쳐 쓴다). 한 사안 2회(설계 1 + 이 검증 1)로 끝.
> Irene 원문: «https://purplehere.com/pos/suppliers?tab=products. 역할마다 공급업체 상품보는 곳 있으면 삭제도 되게 해. 지울 수가 없잖아. 지울 때 연결된 거 있으면 바꾸게 하고. 스톡아이템 처럼»
> 내가 직접 읽은 것: `services/supplierProductDelete.js` 전문 · `routes/supplier-directory.js` diff(loadOwnedProduct · DELETE · /replace · /unlink) + `loadOwnedExternalSupplier`(:1263) · `utils/catalogLink.js` diff · `services/sellerLinkConversion.js` diff + `linkConversionOf`·`deriveLinkConversion`(:201~242) · `services/costSync.js recomputeUnitCost`·`isOwnedByActor`(:72~245) · `utils/stockTarget.js` · `scripts/health-check.js` diff(supplier 3건 + 준비물) · `pages/Suppliers/DeleteSupplierProductFlow.tsx` 전문 · `AllSupplierProductsView.tsx`·`SupplierProfilePage.tsx` diff · locales en diff + 4언어 키 수 · `scripts/button-sweep/spdel-click-check.js` · 모델 `SupplierProduct`(paranoid·is_active BOOLEAN)·`PurchaseOrder` status ENUM · `Button.tsx` 변형 · `deploy-to-production.sh` 5b.
> 내가 직접 돌린 것: `health-check --category=supplier` **6/6** · `check-print-guard` **8/8 변경 없음** · `check-design-guard` **신규 0**(299/295 baseline) · `npm run i18n:verify` **Errors 0** · `check-sensitive-diff` 기계 비대상(안전망 health-check.js 변경 표기 — 근거 = 새 계약 3건 추가) · DB `SHOW INDEX ingredient_seller_products`(유니크 = PK 뿐) · 서버 메모리(`free -m` 가용 484MB · PlanQ tsc 5.3GB).

## 0. 판정: **PASS** (조건 1 · 고칠 것 0 · 권고 3)

설계 D1~D6 범위 안에서 구현됐고, 설계 §5 증명 기준 (a)~(f) 가 health-check 로 실호출 증명됐다(내가 재실행 6/6). 설계와 다르게 한 4가지는 모두 **수용**(§2). 범위 밖 변경 0. 🔒 인쇄·KDS 무접촉(print-guard 8/8). 모델·마이그·ENUM 0.

**조건(배포 방 몫):** mount sweep 미실행 — 서버 메모리 부족(PlanQ tsc 5.3GB)으로 확인 불가. `deploy-to-production.sh` 5b 가 운영 가기 전 **fail-closed 로 같은 sweep 을 돈다**(실측: :604~614) 그래서 이 판정을 막지는 않는다. 단 배포 방은 `--skip-safety` 로 넘기지 말 것.

## 1. ①diff 범위 대조 — 설계 밖 변경 0

| 설계 § | 파일 | 대조 |
|---|---|---|
| 4-1 D2·D3·D4 | `services/supplierProductDelete.js` 신규 | collect / replace / unlink 셋 · 트랜잭션 인자 · «외부 업체» 가정 없음(권한은 라우트) ✓ |
| 4-2 | `routes/supplier-directory.js` | DELETE 409 IN_USE + uses[] · `/replace`(dry_run 기본 true · TARGET_REQUIRED/INVALID · REPLACE_BLOCKED 무변화 · 옮긴 뒤 다시 세기 · destroy · dry_run 롤백) · `/unlink`(UNLINK_BLOCKED) · 게이트 = `loadOwnedProduct` → `loadOwnedExternalSupplier`(POST/PUT 과 같은 함수) + `supplier_company_id === sc.id` ✓ · 새 권한 칸 0 ✓ · `router.use(['/external-suppliers'], authenticateToken, requireBuyerRole)` 아래라 새 라우트도 덮임 ✓ |
| 4-3 | `utils/catalogLink.js` | `sellerCopiedLinkFields` export · `mappingAttrs` 가 그것을 spread — 출력 동일(unit_price·min_order_quantity · 주석 그대로 옮김) ✓ |
| (허용 조항 D6) | `services/sellerLinkConversion.js` | export 한 줄 `linkConversionOf` — D6 «export 한 줄 추가는 허용» 안 ✓ |
| 4-4 | `scripts/health-check.js` | supplier 3건 + `hcSpDelFixture/Cleanup`(데모 38 · ZZ-HC-SPDEL 태그 · 뒷정리) ✓ |
| 4-5 | `DeleteSupplierProductFlow.tsx` 신규 | ConfirmModal → DELETE → 409 면 바로 교체 창(막힘 창 없음) · 쓰는 곳 목록 · SearchableSelect(자기 제외·켜진 것) · Preview → Switch & delete(danger) · Unlink & delete · REPLACE_BLOCKED 사유 목록 · raw fetch(S8) · 공용 Modal/ModalButton/ConfirmModal/SearchableSelect · 장식 이모지 0 ✓ |
| 4-6 | `AllSupplierProductsView.tsx` | `isMine(r)` 행에만 Delete(공용 `Button variant="danger-outline"` — 타입에 있음 :18) · 끝나면 `fetchRows()`·`fetchMyItems()` ✓ |
| 4-7 | `SupplierProfilePage.tsx` | 옛 ConfirmModal + `doDeleteProduct`(조용한 실패) 제거 → 공용 흐름 · `getAuthToken` 은 다른 곳에서 계속 씀(미사용 import 아님) ✓ |
| 4-8 | locales 4언어 | `extProduct.deleteConfirm` + `extProduct.del.*` 22키 = en·ko·zh·ms 각 **23** ✓ · i18n verify Errors 0 ✓ |
| 4-9 | `docs/EXTERNAL_SUPPLIER_PRODUCTS.md` | 설계가 «배포 뒤» 로 둔 항목 — 지금 없음이 맞다 |
| 범위 밖 | `index.html`·`tracking.ts`·`MARKETING_TRACKING.md`·`gtm-container-*.json` | GTM 보류 건(다른 작업) — 이 판정 대상 아님. 배포 방이 섞여 나가지 않게 볼 것 |

규칙 대조(설계 D3): 같은 업체·살아있음(paranoid findByPk)·켜짐·자기 아님 ✓ · 복사 칸 = `sellerCopiedLinkFields(target)` ✓ · 환산 = `sameSpec`(unit·base_quantity·order_mode) 같으면 보존, 다르면 `deriveLinkConversion` + 확인 칸 3개 비움 ✓ · 구매자 칸(is_preferred·is_active·notes·lead_time_days·buyer_restaurant_id) 무접촉 ✓ · 막힘 ① 같은 대상·같은 `buyer_restaurant_id` 에 대상 연결 이미 있음 ② `linkConversionOf(...).compatible===false` ✓ · 원가 = `recomputeUnitCost` 같은 ctx·actor(PUT :1680 과 같은 꼴) ✓ · 발주 줄 무접촉 ✓. D4: `has_history`(발주 줄 어느 상태든 + 정기 발주) 있으면 is_active=0, 없으면 행 삭제 ✓.

## 2. 설계와 다르게 한 것 — 판정

| # | 다른 점 | 판정 |
|---|---|---|
| 1 | `cost_change_logs.source` 를 `'seller_product_replace'` 대신 **`'seller_edit'` + note «공급업체 상품 교체 A → B»** | **수용.** source 는 ENUM(8값) — 새 값은 `expandEnum` 마이그가 필요하고 설계가 «마이그 0» 을 우선으로 둠. note(STRING 500)로 구분되고 health-check 가 그 note 로 이력 1건을 센다. 내 설계가 ENUM 을 안 본 것. 다음에 교체 이력을 따로 집계할 일이 생기면 그때 expand-only 로 값 추가. |
| 2 | `linkConversionOf` export 한 줄 | **수용** — D6 허용 조항 그대로. |
| 3 | D4 unlink 를 Irene 컨펌 전에 구현 | **수용** — 원문 «지울 수가 없잖아» 에 직접 닿고, Fable 권고가 «예» 였다. 보고에 «Fable 권고: 예 · 안 원하면 뺌» 으로 알리면 된다(코드는 라우트 1 + 라디오 1 로 떼기 쉬움). |
| 4 | unlink 뒤 «다시 세기» 를 0 이 아니라 «남은 것 = 이력 때문에 끈 것뿐» 으로 판정 | **수용** — D4 가 «이력 있는 연결은 끈 채 남긴다» 고 했으니 0 일 수 없다. 내 설계의 모순을 바르게 풀었다(`left.some(u => u.is_active || !keptIds.has(u.link_id))` 가 정확한 술어). |

## 3. ②가드 · ③실호출 · ④배포 안전성

- **가드(내가 실행):** print-guard 8/8 변경 없음 · design-guard 신규 0 · i18n Errors 0 · check-sensitive-diff 기계 비대상(②돈·주문은 자기평가로 gate — 이 문서).
- **실호출(내가 재실행) health-check supplier 6/6** — 설계 §5 대조: (a) 409 IN_USE · uses 2 · open_po 1 · A 살아있음 ✓ (b) dry_run 가격 5→48 · 환산 1→10 · needs_confirm · 연결은 A · A 살아있음 ✓ (c) 적용: 연결 id 그대로 · seller_product_id=B · unit_price 48 · unit_conversion 10 · confirmed NULL · 재료 unit_cost **4.8**(=48/10, `convertPrice`) · 이력 ≥1 · 발주 줄 FK 그대로 · A deleted ✓ (d) 다른 업체·자기 TARGET_INVALID · kg↔L REPLACE_BLOCKED · 중복 already_linked · 연결 2줄 A 그대로 ✓ (e) unlink: 이력 없는 줄 삭제 · 발주 쓰는 줄 is_active=0 · 발주 줄 FK 그대로 · 미리보기 무변화 ✓ (f) 남의 데모 매장 RA 403/404 · 가입 공급업체 상품 403 NOT_EXTERNAL ✓. **(f) «오너 업체 상품을 소유 매장 RA 가 → 403»** 은 별도 케이스로 안 돌렸으나 코드 경로가 «남의 매장 RA» 와 같은 가지(`registered_by_entity` ≠ 내 buyerEntity → 403 'Not your supplier', `loadOwnedExternalSupplier` 는 상속 분기가 없음) — 수용.
- **(c) 의 «재고 목록 GET 에서 conversion_status: needs_confirm»** 은 health-check 가 직접 GET 하지 않음 — 대신 `conversion_confirmed_at NULL` + 단위쌍 변경이 `conversionStatusFor` 의 기존 장치로 이어진다(코드로 확인). 확인 못 한 항목으로 적되 막지 않음.
- **고장주입 2(팀원 보고 · 내가 재현 안 함 — 코드 수정 금지 조건):** ① 같은 업체 검사 제거 → (d)① 실패 ② 중복 연결 검사 제거 → (d)③ 실패 · 원복 grep 0 · 재실행 6/6. 보고 내용이 테스트 술어와 맞다(각 검사가 빠지면 그 assert 가 정확히 깨지는 구조).
- **실브라우저(팀원 · 스크린샷 4장 확인 경로 존재):** RA 데모 38 전체 상품 탭 검색→Delete→확인→교체 창→B→Preview→Switch & delete→Done→목록에서 사라짐 8/8 · 화면 오류 0 · 업체 상세에서 같은 창. 스크립트 `spdel-click-check.js` 가 pageerror·console.error 를 세고 404/409 리소스 로그만 거른다 — 판정 기계 정상.
- **mount sweep — 확인 불가**(메모리). RA 가 같은 번들·같은 모듈(`DeleteSupplierProductFlow` 는 역할 무관 같은 chunk)을 실제로 mount 해 TDZ 류 모듈 초기화 크래시는 배제됨. BG·FG·owner 는 배포 5b sweep 이 fail-closed 로 본다.
- **배포 안전성:** 마이그 0 · ENUM 0 · 모델 0 · 라우트 3개 추가(기존 `router.use` 인증 아래) · SW 버전·배포 기록은 배포 방 몫(verify-all «배포 준비» 1건 실패가 그것). 롤백 = 코드 되돌림만.

## 4. 고칠 것 — **0건(막는 것 없음)**. 권고 3(다음 묶음 · 지금 안 고쳐도 됨)

| # | 무엇 | 왜 | 어디 |
|---|---|---|---|
| R1 | 교체 계획 안 **같은 대상·같은 범위에 옛 상품 연결이 2줄**이면 둘 다 B 로 옮겨 B 연결이 2줄이 된다(DB 유니크가 PK 뿐이라 조용히 통과). 계획 단계에서 `(kind,id,buyer_restaurant_id)` Set 으로 두 번째를 `already_linked` 로 막으면 한 줄. | 개발 DB 엔 그런 행 없음(상품 12개 전부 연결 1줄) — 생길 가능성 낮음. | `services/supplierProductDelete.js :117~132` |
| R2 | `linkHistory` 가 연결 줄마다 정기 발주 **전표를 다시 읽는다**(줄 N × 전표 전수). 전표가 수십 개라 지금은 무해. | 전표가 늘면 collect 가 느려진다 — 한 번 읽어 Map 으로. | 같은 파일 :54~68 |
| R3 | `loadTarget` 이 **소프트삭제된 재료**도 대상으로 싣는다 → 지운 재료의 연결이 삭제를 막고 이름이 목록에 뜬다. unlink 로 치워지므로 막힘은 아님. 목록에 «(지워진 재료)» 표시 또는 `deleted_at IS NULL` 필터 중 하나. | 설계 D2 가 «전부» 라 했고 unlink 가 출구라 지금 동작도 설계 안. | 같은 파일 :32~51 |

기존 특성(이번 결함 아님 · 기록만): 오너가 교체하면 `isOwnedByActor` 가 매장 재료를 «구매자 소유 아님» 으로 건너뛰어 **연결 줄 unit_price 사본은 새 상품으로 바뀌지만 매장 재료 unit_cost 는 재계산되지 않는다** — 오너의 가격 PUT(:1680)과 똑같은 D-3 규칙. 바꾸려면 D-3 재설계가 먼저.

## 5. Irene 보고용 — 사실만

- 만든 것: 전체 상품 탭(내가 등록한 외부 업체 상품 행)과 업체 상세에 **같은 삭제 흐름** — 연결된 재고아이템·재료가 있으면 «같은 업체 다른 상품으로 바꾸고 삭제»(미리보기 → 적용) 또는 «연결 끊고 삭제». 발주 이력·정기 발주는 연결 줄 번호를 그대로 둬서 안 깨진다.
- Fable 권고 첨부(Q1): «연결 끊고 삭제» 도 넣는 것 — **예**(상품 하나뿐인 업체가 개발 8곳 중 3곳 · 지금 삭제가 남기던 «지운 상품을 가리키는 켜진 연결» 보다 깨끗 · 레시피·원가 무영향). 안 원하면 라우트 1 + 선택지 1 을 뺀다.
- 운영 반영: 다음 배포 때(배포 방 mount sweep 이 fail-closed 로 BG·FG·owner 화면을 본다).
