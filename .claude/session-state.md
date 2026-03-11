## 현재 작업 상태
**마지막 업데이트:** 2026-03-12
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
1. 인보이스 일괄 생성 버튼 (Admin InvoicesPage, 연회색 secondary)
2. RestaurantsPage +Invoice 버튼 제거
3. Brand/Foodcourt/Owner 구독 인보이스 자동발행 (invoiceScheduler.generateEntitySubscriptionInvoices)
4. GET /api/users에 Brand/Foodcourt 구독 데이터 LEFT JOIN 추가
5. POST /api/users에 Brand/Foodcourt entity 자동 생성 + 구독 필드 처리
6. PUT /api/users에 엔티티별 구독 필드 업데이트
7. ManagersPage Edit 팝업 구독 데이터 표시 + Add/Edit 구독 저장
8. Subscription End Date 자동 계산 (Start + Billing Cycle)
9. ManagersPage 팝업 레이아웃 정돈
10. 운영서버 배포 완료 (2026-03-12)

### 다음 할 일
- Phase C 남은 항목: Stripe/PayPal 연동, 세금계산서, AI 마케팅 인사이트 (고객 피드백 후 트리거)
- 재고/발주 시스템 v3.0 Phase 2~8 (서비스 오픈 후 진행)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
