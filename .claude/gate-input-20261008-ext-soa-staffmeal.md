# Fable 게이트 2회차 입력 — 외부 월별 정산서(A) · 발주 직원식(B) (2026-10-08 · 팀원 실측 · [Claude Code · 작업방 359d0949])

설계 판정문: `.claude/fable-verdict-20261007-ext-soa-staffmeal.md` (Irene «그대로» 승인). 게이트 기준 = 판정문 Ⅱ 끝 «게이트 2회차에서 볼 것» 5항.
⚠ 작업트리에는 다른 방 3곳(5cdb5680 청구서 권한 경계 · 98b2ea7c 재고→원가 · 판매자 배송 지역)의 미커밋 변경이 섞여 있다. 아래 «이 방 파일» 만이 이 사안이다. 겹친 파일(ingredient-categories·purchase-cost-report·purchase-orders-crud·IngredientCategory·invoices-list·owner·supplier-directory·health-check·registry)에서 이 방 변경 부분은 grep 으로 살아 있음 확인.

## 이 방 파일
백엔드: utils/payViaSoa.js · routes/invoices-payment.js(mark-paid-external: 건별 blockPayViaSoa + soa 가지 · POST /:id/soa-reconcile) · services/purchaseOrderPayment.js(recordPayment viaSoa 옵션) · services/externalSoa.js(신규) · services/reconcileInvoiceSync.js(⑦) · services/soaScheduler.js(generateExternalSupplierSoaNow · 메일 isExternal) · routes/purchase-invoices.js(POST soa/external/:id/issue) · routes/supplier-directory.js(billing POST/PUT/GET·프로필 billing) · services/purchaseOrderService.js(isExternalSupplierWithoutTerms: NET 키 있을 때만 합의) · routes/invoices-list.js·routes/owner.js(external_document·pay_via_soa) · models/Invoice.js + scripts/migrate-add-invoice-external-document.js(deploy) · models/IngredientCategory.js + scripts/migrate-staff-meal-category-flag.js(deploy) · routes/ingredient-categories.js · utils/poStaffMeal.js(신규) · routes/purchase-orders-crud.js(목록 include=items·상세) · routes/purchase-cost-report.js · routes/restaurants-ingredients.js · scripts/migrate-staff-meal-ingredients-20261007.js(manual) · scripts/health-check.js(계약 10) · migrations.registry.json · services/poNotifications.js·utils/notificationTemplates.js·locales 4(C, 1회차 검토 완료)
화면: SupplierProfilePage(Billing 칸·창) · ExternalInvoicePayAction(정산서 가지) · ExternalSoaReconcilePanel·ExternalSoaIssueButton(신규) · Restaurant/Owner/Brand/Foodcourt InvoicesPage(Pay via SOA) · IngredientCategoriesTab · PurchaseOrderDetailPage · NewPurchaseOrderPage(담기 표시) · PurchaseCostTab · 4언어 키 64 + glossary
문서: TRADE_STRUCTURE ⑩⑪ · INVOICE_SYSTEM §11-2 · PURCHASE_ORDER_SYSTEM §5

## 판정문과 다르게 한 것 (팀원 재량)
1. 정산서 총액 = Σ묶인 청구서(취소 제외) + 차액 줄. finalizeInvoice 미사용 — 정산서 행엔 invoice_items 가 없어 finalize 가 소계 0 으로 만든다(utils/invoiceCalculation recomputeInvoiceTotals 실측).
2. invoices.external_document · ingredient_categories.is_staff_meal 은 전용 멱등 마이그(deploy 등록) — 운영 배포의 sync-database 는 안전모드라 칸을 안 넣는다(메모리 reference_sync_alter_drops_columns). 판정문은 «sync 로 추가, 마이그 불필요».
3. 오너 등록 외부 업체 월별 = 400 OWNER_SUPPLIER_MONTHLY_UNSUPPORTED. 계약 행이 오너 것(entity_type owner)이라 computePayerForBuyer 가 null → 자동 발행기·payViaSoa 둘 다 못 찾음. 운영 실측 오너 등록 외부 업체 0곳(restaurant 47 · brand 29).
4. 월 정산서 메일 «대조용» 한 줄은 영어(monthlySoaEmail 이 원래 영어 고정, 번역 키 없음).
5. SW 버전 미상승(다른 미배포 방들과 같이 배포 때).
6. 직원식 표시: 발주 상세·발주 담기(메타 줄)·보고서만. 발주 목록 머리·수령 창·발주서 PDF/공유 메시지는 안 함.
7. A4 금고 차액 줄: 현금 + payer 매장일 때만, 열린 시프트 없으면 drawerSkipped.
8. 고장주입 ③: 판정문의 «syncSoaChildren 빼면 ⑥ 실패» 는 성립하지 않음 — 자식은 전부 recordPayment(발주 있음)·직접 update(발주 없음) 루프에서 이미 paid 가 됨. 그 호출은 겹치는 안전망(«정산서 상태 바꾸는 모든 길이 syncSoaChildren 을 부른다» 규칙 유지 위해 둠). 대신 «자식 발주 결제 루프 제거» 주입으로 ⑥ 실패 확인.

## 증명 (원문 숫자)
- health-check 전체 317/317 (새 계약: payment «외부 월별 정산서 ①~⑥» 6 · inventory «직원식 ①~④» 4) · verify-all --full 안의 health-check 도 통과
- 고장주입(전부 pm2 restart 뒤): A-①(payViaSoa 외부 조기 return 복원) → ①~⑥ 6건 실패 / A-②(reconcileInvoiceSync ⑦ 끔) → ⑤만 실패 / A-③a(syncSoaChildren 제거) → 실패 안 남(위 8) / A-③b(자식 발주 recordPayment 루프 끔) → ⑥ 실패 / B-①(poStaffMeal 파생 false) → ② 실패 / B-②(보고서 is_staff_meal 0 고정) → ③ 실패 · 원복 후 전부 통과
- 회귀: 기존 «월결제 공급업체 발주 PAY_VIA_SOA» 계약 통과(브랜드·가입 공급업체 월결제 무변화) · 계약 ① 안에 «조건 없는 외부 청구서 pay_via_soa:false» 고정(운영 외부 계약 payment_terms 전부 비어 있음 → 배포 직후 변화 0) · 인스펙션 하니스 신규 위반 0(I-SOA-001 포함) · print-guard 8/8(이 방은 보호파일 무접촉 — orders-crud 변경은 5cdb5680 방)
- verify-all --full (2026-10-08 02:0x): 23/24 · 실브라우저 mount sweep 크래시 0(701s) · ✗1 = 배포 기록 파일 없음(배포 때 작성)
- 실브라우저 클릭 흐름 15/15(데모 매장 38, 끝에 정리): 업체 프로필 Billing 줄·창 · «Create supplier statement» 버튼·창(기간 비움=지난달 → «묶을 것 없음» 안내) · 정산서 상세 대조 패널 · 총액 70 입력 → 차이 줄(65→70) → 확정 → DB 총액 70.00 · 정산서 «결제함» 창 → 자식 2·발주 2 전부 paid · 분류 «Staff meal» 배지 · 발주 상세 배지·나눔 · 보고서 «Staff meal cost» 칸 · 페이지/콘솔 오류 0
- 마이그: migrate-add-invoice-external-document 2회(추가 → skip) · migrate-staff-meal-category-flag 2회(dev 0건/0건, health-check ④ 에서 이름 변형 3종 → 3건 → 0건) · 운영 읽기: 켜질 분류 1건(#23 매장 10 «Staff Meal») · B5 스크립트 데모 38 드라이런 2건 → apply → 재드라이런 0 → undo → 2건
- 타입 신규 0 · i18n 통과 · design-guard 신규 0 · 메일: 데모 매장 수신자 미인증 → notificationService 가 발송 건너뜀(실제 발송 0)
- 운영 쓰기 0 · 배포 0
