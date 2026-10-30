# Fable 게이트 요청 — 발주 인보이스·영수증 다시 올리기·삭제 (2026-10-30 · 작업방 b93ac573)

## Irene 원문
«영수증이나 인보이스를 업로드하면 재업로드 기능이 나와야 해. 그래서 재업로드하면 이전 거 그냥 삭제하면 될 것 같아. 삭제도 가능해야 하지 않아? 검토하고 적용해줘.»

## 이 일로 바뀐 파일 (작업트리의 다른 미커밋 변경은 다른 방 몫 — 아래만 이 일)
- dev-backend/utils/poUploadedFile.js (새)
- dev-backend/routes/purchase-orders-workflow.js (upload-receipt·upload-invoice 에 옛 파일 치우기 + DELETE 2개 · require 1줄)
- dev-backend/scripts/health-check.js (invoice-actions A5 추가)
- dev-frontend/src/utils/poAttachment.ts (새)
- dev-frontend/src/components/PurchaseOrders/PoFileManageModal.tsx (새)
- dev-frontend/src/components/Invoices/TradeInvoiceActions.tsx (올리기 → poAttachment · 삭제 버튼·확인창)
- dev-frontend/src/pages/PurchaseOrders/PurchaseOrdersPage.tsx (영수증 보기·외부 인보이스 → 파일 관리 창)
- dev-frontend/src/pages/PurchaseOrders/PurchaseOrderDetailPage.tsx (인보이스 칸 «Re-upload / delete»)
- dev-frontend/public/locales/{en,ko,zh,ms}/{purchaseOrders,settings}.json (fileManage · tradeActions.delete*)
- dev-frontend/e2e/po-file-manage.spec.js (새) · docs/PURCHASE_ORDER_SYSTEM.md 끝 절
- `git diff -- <파일>` 로 보면 됨. 운영 DB·마이그 0.

## 사실
- 기존 DELETE /api/upload/file 은 로그인만 되면 첨부 폴더 안 아무 파일이나 지운다(이 일 전부터).
- upload-invoice/receipt 는 /uploads/ 로 시작하는 아무 주소나 받는다(이 일 전부터). 새 치우기는 첨부 폴더 안 + 다른 발주 인보이스·영수증 칸 · invoices.receipt_url 이 안 쓸 때만 지운다.
- 청구서 결제 제출 영수증(ReceiptUploadField)은 제출 전 바꾸기·지우기가 이미 있음 → 손대지 않음.

## 실측
- health-check invoice-actions 8/8 (A5 새) · 고장주입: 참조 검사·폴더 검사 제거 → A5 실패 → 원복 통과
- e2e po-file-manage 2건 × 3회 6/6 (첫 실행 1회 Playwright 내부 오류 «Object with guid response… not bound», 이후 6/6)
- 실브라우저 청구서 창(데모 38 · 청구서 32827 · 발주 52221 [확인용]): Re-upload invoice · Delete invoice file 보임 · 확인창 뜸 · 콘솔 오류 0 — 스크린샷 /home/irene/.claude/jobs/b93ac573/tmp/inv-window.png, inv-window-confirm.png
- print-guard 8/8 · design-guard 신규 0 · i18n OK · tsc 새 오류 0
- 빌드 main.c41753eb (deploy-dev.sh 가 빌드 성공 뒤 조용히 exit 1 → 스크립트 남은 복사 단계를 같은 명령으로 손으로 실행)
- verify-all --full 진행 중 — 결과 /home/irene/.claude/jobs/b93ac573/tmp/verify.txt
