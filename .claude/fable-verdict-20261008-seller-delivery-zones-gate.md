# Fable 판정 원문 (2026-10-08) — 판매자 배송 지역별 설정 · 게이트 2회차(마지막)

> 팀원은 이 문서를 **가공 없이** Irene 에게 전달한다. 이 사안의 Fable 호출은 이번으로 끝(설계 1회 + 게이트 1회).
> 1회차 설계: `.claude/fable-verdict-20261007-seller-delivery-zones.md` · 팀원 입력: `.claude/gate-input-20261007-seller-delivery-zones.md`

---

## Ⅰ. Irene 에게 올리는 보고문

### 0. 한 줄 결론
**PASS — 설계한 대로 만들어졌고, 돈 계산이 맞는지 제가 직접 다시 돌려 확인했습니다. 지역을 안 적은 판매자(지금 운영 전부)는 아무것도 달라지지 않습니다. 다음 `/배포` 묶음에 실어도 됩니다.** 통과 도장(마커)은 아직 안 찍었습니다 — 이유는 §4.

### 1. 제가 직접 확인한 것 (팀원 보고를 믿지 않고 다시 돌림)
| 무엇 | 결과 |
|---|---|
| 코드 범위 — 설계 밖 변경 | **0건.** 바뀐 파일 전부 설계 목록 안. 인쇄 보호파일 8/8 변경 없음(가드 직접 실행). 배송비 계산식 본문(`computeDeliveryFee`)·화면 계산(`deliveryFee.ts`)·주문 금액식(`orderTotals.js`) 무접촉 확인 |
| 자동 테스트(돈 공식) | 60/60 통과 — 새 지역 테스트 + 기존 발주 총액 12건 + 주문 금액 11건 그대로 |
| 실제 API 호출 17건 | 제가 다시 실행해 **17/17 통과.** 지역 저장·같은 주인 브랜드에 같이 적용·같은 주 중복 거절(400)·담기 목록에 지역 이름·발주 생성 240+10=250·매장 주소 비우고 제출하면 기본 배송비 15 로 다시 계산·**판매자 확인 뒤엔 지역을 바꿔도 총액 255 그대로(동결)**·끝에 데모 자료 원복 |
| 화면 사진 2장 | 브랜드 설정: 「Klang Valley · RM10 · Selangor+KL」「South · RM25 · Johor」, 둘째 지역에서 Selangor 는 회색(체크 불가) — 설계 그대로. 매장 담기 화면: 「Delivery fee Free at RM 300.00 and above · RM 10.00 below · Klang Valley」 배송비 10.00 — 설계 그대로 |
| 안전망 전체 | health-check **317/317** · 디자인 가드 신규 위반 0 · 마이그 등록 검사 통과 · 번역 4개 언어 오류 0 · 개발 DB 에 칸 3개 생김(brands·foodcourts·supplier_companies, 전부 비어 있음) |
| 팀원이 돌린 것 중 제가 재실행 안 한 것 | 실브라우저 전체 점검(mount sweep 720초·크래시 0) · 고장주입 4건 — 팀원 결과 원문을 받아들임. 고장주입은 테스트가 실제로 깨지는지 확인하는 절차인데 4/4 깨졌다가 원복 후 통과했다고 보고됨 |

### 2. 설계와 다르게 한 것 (팀원 재량 8건) — 판정
전부 **수용.** 하나씩:
1. 칸 추가를 자동 동기화 대신 **전용 마이그 스크립트**로 — 맞는 선택(운영 배포는 자동 동기화로 칸을 안 넣는다). 등록 검사 통과.
2. JSON 이 문자열로 와도 읽는 방어 — 해롭지 않음.
3. 외부(미등록) 공급업체는 읽는 쪽에서도 지역을 null 로 — 결정 6 을 두 겹으로 지킴. 좋음.
4. 제출 때 재계산에서 세금 보존 — 맞음.
5. 편집기 저장 = 칸 떠날 때·체크할 때 즉시, 완성된 줄만 — 레스토랑 모바일오더 편집기와 결은 다르지만 저장 버튼 하나 없이 「뭘 눌러야 저장되나」 혼란이 없어 수용. 안내문(「이름·배송비·주 하나 이상 넣으면 저장됩니다」)이 있어 미완성 줄이 안 저장돼도 이유가 보임.
6. 「주 입력하기」 링크 = 매장 설정 — 기존과 같은 주소.
7. SW 버전은 배포 때 올림 — 방 359 와 같은 방식. **배포 때 반드시 올려야 함**(아래 §5).
8. health-check 에 케이스 추가 안 함 — 새 라우트가 없어 맞음.

### 3. 알고 계셔야 할 것 (막는 것 아님)
- **제출 때 배송비를 다시 세는 것**이 이번에 생긴 유일한 「기존 동작 변화」입니다. 지역 없는 판매자는 담을 때와 같은 값으로 다시 세므로 결과가 같고, 담은 뒤 판매자가 배송비 두 칸을 바꾼 드문 경우에만 제출 값이 달라집니다 — 이건 원래 규칙(판매자 확인 전엔 다시 계산) 안입니다.
- 재계산은 「제출」 버튼 경로에만 붙었습니다(설계 그대로). 「보낸 것으로 표시」·직접구매·판매자 대리 생성 경로는 담을 때 계산한 값을 그대로 씁니다 — 담을 때 이미 지역이 반영되므로 매장이 **담은 뒤 주소를 고치고 그 경로로 보내는** 경우에만 옛 지역 값이 남습니다. 실제로 그런 매장이 나오면 그때 같은 한 줄을 붙이면 됩니다.
- 매장 주소에 주(州)가 없으면 지역 배송비가 안 붙고 기본 배송비가 붙습니다(주문은 안 막힘). 담기 화면에 「매장 주소에 주가 없어 기본 배송비 적용 · 주 입력하기」 가 보입니다.

### 4. 통과 도장(마커)을 왜 아직 안 찍었나
같은 작업 폴더에 **다른 방(359d0949 · 외부 월별 정산서·직원식)** 의 미완성 검증분이 함께 들어 있습니다. 도장은 폴더 전체 지문에 찍히므로 지금 찍으면 **아직 검증 안 받은 그 방 일까지 통과한 것으로** 됩니다 — 그건 이 도장 장치가 막으려는 바로 그 뒷문입니다. 그래서 **이 사안은 PASS 이되 도장은 방 359 의 Fable 게이트가 끝난 뒤, 그 판정이 두 사안을 한 줄 메모에 같이 적어 1회 찍는 것**으로 합니다(그 방이 FAIL 이면 코드가 바뀌어 지문도 바뀌니 그때 다시).

### 5. 배포 때 지켜야 할 것 (Irene `/배포` 지시 뒤 팀원 일)
- 마이그 `migrate-add-seller-delivery-zones.js` 는 deploy 등록이라 배포가 자동 실행 — 운영 판매자 표 3개에 빈 칸만 생기고 값은 없음 = 동작 변화 0.
- 프론트가 바뀌었으니 **SW 버전을 올려서** 매장 브라우저가 새 화면을 받게.
- 배포 뒤 운영 일(1회차 §7): with MIN · K-DINE 매장 주소에 주(州) 채우기 → GIT 브랜드 설정에서 Irene 이 지역 추가(예: Klang Valley = Selangor·KL·Putrajaya → RM 10). 안 하면 지금과 똑같이 돕니다.

### 6. Irene 컨펌 요청
**이번 게이트엔 결정할 것이 없습니다.** 설계는 이미 「권고대로」로 확정됐고, 구현이 그 설계 안에 있음을 확인했습니다. 남은 결정은 둘 다 때가 되면: ① 다음 `/배포` 묶음에 싣기(Irene `/배포` 지시) ② 배포 뒤 §5 운영 일 지시.

---

## Ⅱ. 팀원에게 (지시 아님 — 판정에 붙이는 사실·후속)

### 판정
- **PASS.** 게이트 5항 전부 충족: ①범위 밖 0·`check-sensitive-diff` 가 `purchaseOrderTotals`·마이그를 찍음(정상) ②테스트·실호출·고장주입 원문 확인, 실호출 17/17 은 내가 재실행 ③동결(F2)·제출 재계산(E1) 증명 ④verify-all --full 22/24(✗2 는 배포기록 없음·타입 기준선 메모리 게이트 → 단독 실행 신규 0 — 둘 다 비해당) · 기존 12건 불변 · i18n 4언어 ⑤운영 회귀 0 jest 1건 박힘(`운영 회귀 0 — 구매자 조회도 안 함`).

### 마커
- **이번에 찍지 않음.** 사유 Ⅰ-4. 방 359 게이트가 끝난 뒤 그 Fable 이 두 사안을 note 에 같이 적어 1회 `pass`. 이 방은 Stop 훅에 한 번 걸리는 것이 정상이다(같은 지문 1회만 차단).

### 비차단 후속 (다음 작업 때, 이번 묶음 아님)
1. 제출 재계산의 영구 자물쇠가 없다 — 지금은 `.claude/wip/live-seller-delivery-zones.js` E1 만이 잡는다. health-check 가 방 359 손에 있으니 그 방이 끝난 뒤 E1(주소 비움 → 제출 → 기본 배송비·`buyer_location_unknown`) 한 건을 health-check `po` 계열이나 계약 테스트에 옮긴다.
2. 보고 첫 줄은 `✅ 완료` 로, «확인할 곳» 에 `https://dev.purplehere.com/pos/brand/payment-settings`(배송 지역 편집) · `https://dev.purplehere.com/pos/purchase-orders/new`(배송비 줄 지역 이름) 링크. 단, 마커 미착으로 Stop 훅이 1회 멈춤을 거는 것은 정상임을 한 줄 적는다.
3. 메모리 갱신(게이트 뒤): `reference_delivery_fee_gap` 에 «지역별 배송비 = `delivery_zones`·매칭은 `utils/deliveryZones.js`·제출 때 1회 재계산» 한 줄.

---

## Ⅲ. 판정 근거 기록 (내가 실행한 명령)
- `node scripts/check-print-guard.js` → 8/8 변경 없음
- `node scripts/check-sensitive-diff.js` → ②`purchaseOrderTotals.js`·`purchase-orders-workflow.js` ③모델 3·마이그 1 찍힘(대상 = 정상)
- `npx jest tests/delivery-zones.test.js tests/purchase-order-totals.test.js tests/order-totals.test.js` → 60/60
- `node .claude/wip/live-seller-delivery-zones.js` → 17/17 · 원복 `{b:0,s:1,st:''}` · PO 30121 삭제
- `node scripts/health-check.js --quiet` → 317/317
- `node scripts/check-design-guard.js` → 신규 0 · `check-migration-registry.js` 통과 · `npm run i18n:verify` 오류 0
- information_schema: `delivery_zones json NULL` × brands·foodcourts·supplier_companies, 값 있는 행 0
- diff 전문 읽음: `utils/deliveryZones.js`·`purchaseOrderTotals.js`·`sellerNames.js`·`brandAccountSettings.js`·`purchase-orders-workflow.js`(submit)·`purchase-orders-crud.js`(opts.buyer)·`restaurants-ingredients.js`·판매자 라우트 3·`address-suggestions.js`·모델 3·마이그·`DeliveryZonesEditor.tsx`·`deliveryZones.ts`·`DeliveryTermsText.tsx`·`NewPurchaseOrderPage.tsx`·`PurchaseOrderDetailPage.tsx`·설정 화면 3·문서 2 · 사진 2장
