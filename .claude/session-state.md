## 현재 작업 상태
**마지막 업데이트:** 2026-03-16
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
1. **Company Information 저장 시 로그아웃 버그 수정**
   - GET/PUT fetch에 Authorization 헤더 누락 → 401 → AuthContext 자동 로그아웃
   - 토큰 추가 + alert() 제거 (UI 가이드 위반)

2. **Company Information 필수항목 검증**
   - 필수항목(*) 9개 미입력 시 저장버튼 비활성화

3. **Ingredients/Recipes DELETE auth 버그 수정**
   - DELETE fetch에 Authorization 헤더 추가 (같은 로그아웃 버그 방지)

4. **Free 인보이스 Confirm 버튼 (전 역할)**
   - 100% 할인 인보이스(total=0) pending_payment 영구 정체 문제 해결
   - 6개 인보이스 페이지에 Confirm/Mark Paid 버튼 추가
   - 백엔드: PATCH /:id/status에 payment_notes 지원 추가
   - BrandInvoicesPage/FoodcourtInvoicesPage additionalCharges 타입 에러 수정

5. **푸터 로고 교체**
   - LandingFooter "PurpleHere" 텍스트 → SVG 흰색 로고 이미지
   - 좌측 정렬 (align-items: flex-start)

### 이전 세션 완료
- Retry Payment 0원 버그 수정
- 타임존 통일 (14개소 + 유틸리티)
- Payment Proof 주문 상세팝업 표시 (모든 상태)
- Floor Plan 결제증빙 모달 (View 모드)
- Payment Retry 전체 플로우 (reject→history→retry→re-verify)
- Rejected 상태 표시 (LiveOrders, FloorPlan, Mobile OrdersPage)
- Floor Plan 테이블 주문 사라짐 버그 (타임존 문제 → table-status 수정)
- 결제 수단 전면 재구조화

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
