## 현재 작업 상태
**마지막 업데이트:** 2026-03-18
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
1. 구독 플랜 셀프 변경 시스템 (기획→구현→검증→배포)
2. 차액 인보이스 자동 발행 (proration)
3. invoiceScheduler/subscriptionScheduler pending 전환 로직
4. 통화 일관성 통합 (RM→MYR fallback 21곳 수정, SystemSettings 기준)
5. 컬러 가이드 생성 (COLOR_GUIDE.md)
6. 데모/테스트 계정 분리 (is_test 필드, DEMO/TEST 배지)
7. Activity History 전역화 (5개 역할)
8. 인보이스 결제 모달 통일 (Notes, Receipt, 버튼 색상)
9. LiveOrders 페이지네이션 수정
10. Foodcourt InvoicesPage 스타일 통일
11. 운영서버 배포 완료 (9/10 smoke test)

### 운영서버 배포
- 배포 시간: 2026-03-18 21:10 UTC
- Smoke test: 9/10 (payment-settings GET 기존 이슈)
- 마이그레이션: migrate-2026-03-18.js 자동 실행 완료

### 다음 할 일
- Schedule 탭 → StaffPage로 이동 (직원 스케줄 관리 통합)
- Foodcourt General / Owner 데모 계정 Phase 2
- Kitchen Station 시스템 구현
- 재고/발주 시스템 v3.0 Phase 2

---

## 복구 가이드
```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
