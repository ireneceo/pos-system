## 현재 작업 상태
**마지막 업데이트:** 2026-02-28
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- 품질 체크: Restaurant/InvoicesPage 모달 Free 표시, NoticesPage/InquiryPage refreshBadgeCounts 이벤트 추가
- Brand/Foodcourt Subscriptions Assign/Change Plan 400 에러 수정 (restaurant_id→restaurant_ids)
- Create Invoice 모달 할인 UI 추가 (Admin, Brand, Foodcourt 3개 페이지)
- Admin SubscriptionsPage 401 에러 수정 (Authorization 헤더 추가)
- Admin RestaurantsPage Edit 모달에 Subscription Discount UI 추가
- 할인 후 실제 결제 금액 표시 일괄 수정 (Admin/Brand/Foodcourt/Manager SubscriptionsPage)
- Manager API에 discountType/Value/Reason 필드 반환 추가

### 다음 할 일
- DEVELOPMENT_PLAN.md Phase별 진행 현황 점검
- 인보이스 할인 e2e 테스트 (자동 인보이스 + 수동 인보이스)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
