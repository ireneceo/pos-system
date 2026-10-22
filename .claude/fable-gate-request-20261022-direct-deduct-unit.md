# Fable 검증(gate) 요청 — 다이렉트 상품 출고·반품 차감 = 주문 수량 × 상품 규격 (2026-10-22 · 작업방 669bfa10)
판정: .claude/fable-design-20261022-direct-deduct-unit.md (Irene «권고대로 진행해 줘» ①~⑤)
결과 파일: .claude/fable-gate-20261022-direct-deduct-unit.md (Fable 이 씀)

## 바뀐 파일 (git status 전부 이 방 몫 · 앞 일은 f414c2403 로 커밋됨)
- services/sellerLinkConversion.js — linkConversionOf({stock,sellerProduct})→{conv,compatible} 본체 · deriveLinkConversion 은 raw 우선 뒤 .conv (기존 반환 무변경) · directDeductConversion export
- routes/seller-orders.js 다이렉트 분기 — delta −round(qty×conv,2) · 비호환 notes [unit_mismatch a↔b] · 주석
- routes/po-returns.js 다이렉트 분기 — 같은 함수로 +round(delta×conv,2) · 같은 표시
- routes/brand-products.js — resolveDirectLink: 새로 걸거나 바뀔 때만(String(nextDirect)≠current) unitIncompatible → 400 UNIT_INCOMPATIBLE (spec = body 값 ?? current) · /stock-item existing_stock_item_id 가지도 같은 검사
- utils/directDeductAudit.js(새 · 조회+판정 한 곳) · scripts/report-direct-deduct-unit.js(새 · 읽기만) · 인스펙션 ING-UNI-034(비차단 목록, 번호 013 은 이미 있어 034)
- docs/TRADE_STRUCTURE.md §2-1 문장 교체 + 매장 메뉴 괄호 한 줄
- BrandProductsTab.tsx renderStockItemFields 재고 칸 아래 «= N pack»(base>1 · 입력>0) + brand.json siStockInPacks 4언어
- scripts/health-check.js — defineDirectDeductUnitTests(P1·P2 · P3 · P4) 끝에 + 호출 한 줄 · **기존 검사 1건 수정**: «프로덕트 재고아이템 다이렉트 — 자동 레시피 0» 가 unit 'ea' 상품을 아무 재고아이템(g 등)에 붙여 새 400 에 걸림 → 판매 단위를 그 재고아이템 단위로(검사 목적 = 자동 레시피 0, 단위와 무관). «P3 ship»(pack/1 → −3) 무접촉·통과

## 자체 검증 숫자 (개발)
- health-check inventory 80/80: P1 500 g/pack 3 pack → 2000→500 · 장부 −1500 · cost_value −19.5 / P2 반품 1 pack 승인 → 1000 / P3 kg/1↔g 2 pack → 5000→3000 / P4 piece↔g 출고 −2 «[unit_mismatch piece↔g]» · 이름만 PUT 200 · PUT 새 연결 400 UNIT_INCOMPATIBLE · /stock-item existing 400 · 뒷정리 잔재 0(재고아이템·상품·발주·고아 반품 0)
- 고장주입 2/2(pm2 재시작 뒤): ①·② 를 한 번에 주입: ① 출고 conv→1 고정 → P1·P2(한 시험)·P3 실패 ② unitIncompatible 끔 → P4 실패 (P4 의 출고 −2 는 conv 1 이라 ①과 무관 — P4 실패 원인은 ②의 400 이 200 이 된 것) → cp 원복(cmp 동일) → 재시작 → 80/80
- 환산 함수 표: 500 g/pack↔g 500 · kg/1↔g 1000 · pack/1↔pack 1 · piece↔g 1·false · measure kg↔g 1000 · kg↔ml 1·false
- report-direct-deduct-unit.js dev: 상품 2(13931·13939, 환산 500) · 판매·반품 줄 0 — 설계 §7 예상과 같음
- 인스펙션 신규 0 (ING-UNI-034 dev 0건)
- 화면: B 상태 base 500 · 개시 재고 900 → «= 1.8 pack» · 콘솔 오류 0
- verify-all --full: 22/24 → ✗ 배포 준비(배포 방 몫) · ✗ 타입 기준선 «확인 불가 — 메모리 게이트» → 단독 재실행 통과 · mount sweep 크래시 0 · print-guard 8/8
- check-sensitive-diff: 기계 기준 비대상(안전망 2: health-check · 인스펙션) → 설계 §0 대로 gate(돈·주문 무결성 자기평가)

## 확인 못 함
- 운영 수치(report 스크립트) — 운영검증 몫
- 앞 연동 시험(③)에서 개발 상품 13939 를 3 pack 출고했던 시험은 원복함(재고 9 · 장부 줄 삭제)
