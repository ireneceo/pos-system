# Fable 게이트 2회차 입력 — 판매자 배송 지역별 설정 (2026-10-08 · 팀원 실행 결과 사실만)

판정문: `.claude/fable-verdict-20261007-seller-delivery-zones.md` (Ⅱ 구현 지시 · «게이트 2회차에서 볼 것» 5항)
Irene 답: 설계 «권고대로»(①자동 판정 ②지금 구현 ③결정 사항 그대로) · 이어가기 «권고대로»

## 작업트리 주의
같은 작업트리에 **방 359d0949(외부 월별 정산서·직원식)** 의 미커밋 구현이 함께 있다(그 방은 Fable 게이트 대기). 아래 «이 방 파일» 만이 이 사안 범위다. ※ 파일은 두 방이 같은 파일의 다른 줄을 고쳤다 — 이 방 몫은 지역 관련 줄만(`git diff` 에서 delivery_zone·deliveryZone·zone 검색).

## 이 방 파일
- 백엔드 신규: `dev-backend/utils/deliveryZones.js` · `dev-backend/scripts/migrate-add-seller-delivery-zones.js`(registry deploy 등록) · `dev-backend/tests/delivery-zones.test.js`
- 백엔드 수정: `models/Brand.js`·`models/Foodcourt.js`·`models/SupplierCompany.js`(delivery_zones JSON) · `utils/sellerNames.js` · `utils/brandAccountSettings.js` · `utils/purchaseOrderTotals.js` · `routes/purchase-orders-workflow.js`(submit 재계산) · `routes/brands-core.js` · `routes/foodcourts-core.js` · `routes/supplier.js` · `routes/address-suggestions.js` · ※`routes/purchase-orders-crud.js`(opts.buyer 1곳) · ※`routes/restaurants-ingredients.js` · ※`scripts/migrations.registry.json`
- 화면 신규: `dev-frontend/src/components/Common/DeliveryZonesEditor.tsx` · `dev-frontend/src/utils/deliveryZones.ts` / 수정: `BrandGeneral/BrandPaymentSettingsPage.tsx` · `FoodcourtGeneral/FoodcourtPaymentSettingsPage.tsx` · `Supplier/SupplierCompanyInfoPage.tsx` · `components/Common/DeliveryTermsText.tsx` · ※`PurchaseOrders/NewPurchaseOrderPage.tsx` · ※`PurchaseOrders/PurchaseOrderDetailPage.tsx`
- 번역: common `deliveryZones.*` 15키 · brand/foodcourt/supplier «배송 안내 메모» 값 변경 · ※purchaseOrders `newPo.deliveryAreas`(값)·`deliveryZoneUnknown`·`deliveryZoneFix` × 4언어 · ※glossary «Delivery zone»(배송 지역/配送区域/Zon penghantaran)
- 문서: ※TRADE_STRUCTURE ⑦ §5(b) 한 줄(«확정·개발서버 구현») · ※PURCHASE_ORDER_SYSTEM §2 한 줄

## 판정문과 다르게/추가로 한 것 (팀원 재량)
1. 칸 추가는 sync 가 아니라 **전용 멱등 마이그** `migrate-add-seller-delivery-zones.js`(deploy 등록). 이유: 운영 배포는 sync 로 칸을 넣지 않는다(방 359 도 같은 이유로 전용 마이그). 개발 DB 적용 → 재실행 «이미 있음» 3/3.
2. `readZones()` 도우미 추가 — JSON 칸이 문자열로 와도 읽게(개발 DB 는 MySQL json 이라 객체로 옴, 방어용).
3. sellerNames 에서 **외부(미등록) 공급업체는 delivery_zones 를 null 로** 내림(결정 6을 읽는 쪽에서도 보장). 외부 업체 PUT(supplier-directory)은 무변경 — 원래 delivery_zones 를 받지 않는 필드 목록이라 «무시» 동작이 이미 성립.
4. submit 재계산은 `tax_amount: locked.tax_amount` 를 넘겨 세금 보존, subtotal 이 라인 합과 다르면 경고 로그 후 라인 기준으로 맞춤(실호출에서 차이 0).
5. 편집기 저장 = 칸을 떠날 때·체크할 때 즉시, **완성된 줄만** 전송(미완성 줄은 «이름·배송비·주 하나 이상을 넣으면 저장됩니다» 안내). 서버 400 메시지는 편집기 아래 빨간 글.
6. 담기 화면 «주 없음» 안내의 «주 입력하기» 링크 = `/pos/settings`(crud 의 기존 settingsUrl 과 같음).
7. SW 버전은 올리지 않음 — 배포 때 올림(방 359 와 같은 방식).
8. health-check 에 케이스 추가 안 함(새 라우트 없음 · health-check.js 는 방 359 도 고친 파일).

## 증명 (게이트 5항 순서)
1. **범위**: 위 파일 목록. 🔒 print-guard 8/8 변경 0 · `utils/orderTotals.js` 무접촉 · `computeDeliveryFee` 본문 무접촉 · `dev-frontend/src/utils/deliveryFee.ts` 무접촉 · retroApplyPrice·청구서·PDF 무접촉. `check-sensitive-diff` → ② 돈에 `utils/purchaseOrderTotals.js`, ③ 스키마에 `migrate-add-seller-delivery-zones.js` 찍힘.
2. **테스트·실호출·고장주입**
   - jest 전체 26 묶음 통과(새 `delivery-zones.test.js` 28건: 별칭 5·WP+우편번호·WP 단독 null·우편번호 47820/62000/69000·중복/음수/모르는 주/빈 주/이름/배열 거절·세 사유·총액 260/300/265·unset+no_match·회귀0·조회실패·opts.buyer 우선). 기존 `purchase-order-totals.test.js` 12건·`order-totals.test.js` 11건 그대로.
   - 실호출 17/17 (dev, 데모 브랜드 10/17 · 데모 공급업체 20 · 데모 매장 38; 스크립트 `.claude/wip/live-seller-delivery-zones.js`): A1 브랜드 PUT zones 200 · A2 GET 그대로 · A3 같은 주인 17 에 펼침 · A4 중복 주 400 ZONE_STATE_DUPLICATE · A5 `<script>` 이름 sanitize · A6 [] → null(10·17) · B1 공급업체 PUT 200 · B2 GET 그대로 · B3 배열 아님 400 · C1 담기 목록 `seller_delivery_zone` (state «WP Kuala Lumpur» → Klang Valley) · C2 주소 없음 → reason buyer_location_unknown · D1 발주 생성 fee 10·basis.zone · D2 total 250(=240+10) · E1 매장 주소 비우고 제출 → fee 15·zone_reason buyer_location_unknown · E2 subtotal 240 불변 · F1 판매자 확인 200 · F2 확인 후 매장 주소 복구 + 판매자 지역 변경 → 총액 255·배송비 15 불변. 끝에 원복 확인(브랜드 zones 0 · 공급업체 3칸 NULL · 매장 state '') · 테스트 발주 3건 삭제.
   - 고장주입 4건(전부 원복 후 통과): ① `effectiveDeliveryTerms` 가 지역 결과를 무시하게 → jest 2 실패 ② 중복 주 검사 제거 → jest 1 실패 ③ submit 재계산 update 제거 → **pm2 재시작 뒤** 실호출 E1 실패(fee 10 그대로) → 원복·재시작 → E1 통과 ④ 형제 브랜드 17 에만 지역 → 인스펙션 B-ACC 실패(«17≠10 delivery_zones») → 원복 통과. JSON 비교: 키 순서만 다른 같은 목록 = 같음, 다른 값 = 다름, 객체 vs "[object Object]" = 다름.
3. **동결·제출 재계산**: F2(확인 후 불변) · E1(제출 재계산) 위 실호출.
4. **verify-all --full**: 22/24 — mount sweep ✓(720초, 크래시 0) · health-check ✓(317/317) · 인스펙션 ✓ · 계약 테스트 ✓ · i18n 4언어 ✓ · 훅 TDZ ✓ · 디자인 가드 신규 0. ✗2 = ①«배포 준비: 이번 배포 기록 파일 없음»(배포 때 작성, 다른 방들과 같음) ②타입 기준선 «확인 불가 — 메모리 게이트»→ 끝난 뒤 단독 실행 **신규 0**(432, 기준 436). 빌드 1회(EXIT 0, 경고는 기존).
   - 실브라우저 클릭 7/7(스크립트 `.claude/wip/click-seller-delivery-zones.js`, 사진 `.claude/wip/shots/`): BG 설정 «+ Add delivery zone» → Klang Valley(10, Selangor·KL) · 둘째 지역에서 Selangor 체크 불가 · South(25, Johor) → DB 2지역 저장 · 새로고침 후 유지 · «Other areas» 줄 / RA 담기 화면 «Delivery fee Free at RM 300.00 and above · RM 10.00 below · Klang Valley» 배송비 10.00 · 콘솔 오류 0 · 원복 확인.
5. **운영 회귀 0 논증**: zones 없는 판매자는 `resolveZoneForBuyer` 가 null → basis·fee 기존과 동일, 구매자 조회도 안 함(jest «운영 회귀 0» 1건으로 박음). 운영 판매자 지역 0곳(칸이 새로 생김). 바뀌는 동작 하나 = **제출 때 배송비 재계산**: 지역 없는 판매자는 담을 때와 같은 판매자 값으로 다시 세므로, 담은 뒤 판매자가 배송 두 칸을 바꾼 경우에만 제출 값이 달라진다(판매자 확인 전이므로 기존 «확인 전 재계산» 규칙 범위).
- 확인 못 함: 운영 DB(조회 안 함) · 푸드코트·공급업체 설정 화면 실브라우저 클릭(같은 컴포넌트, mount sweep 크래시 0 만 확인) · 실제 운영 배포 마이그 실행.
