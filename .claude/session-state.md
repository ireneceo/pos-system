## 현재 작업 상태
**마지막 업데이트:** 2026-03-17
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
1. **사이드바 배지 로직 수정**
   - Restaurant의 System Inquiry / Operation Inquiry 깜빡이 점: "open 티켓 수" → "읽지 않은 답변 수"로 변경
   - 답변이 없으면 깜빡이지 않음
   - SupportTicketsPage, OperationInquiryPage 카드에 "New Reply" / "Replied" 배지 추가
   - 수정 파일: badgeCounts.js, MainLayout.tsx, SupportTicketsPage.tsx, OperationInquiryPage.tsx

2. **Kitchen Station 시스템 기획 완료**
   - 멀티 주방 등록 + 메뉴 배정 + Kitchen Display 필터 + 주방별 오더티켓 분리 인쇄
   - 설계서: `/var/www/docs/KITCHEN_STATION_SYSTEM.md`
   - DEVELOPMENT_PLAN.md에 5-Phase 예정 항목 추가
   - 구현은 Irene 지시 시 진행

### 이전 세션 완료
- Kitchen Display Item View 모드 + 실시간 업데이트 개선
- Free 인보이스 Confirm + 로그아웃 버그 수정 + 타임존 통일 + 푸터 로고
- Retry Payment 0원 버그 수정
- Payment Proof 주문 상세팝업 표시

### 다음 할 일
- **Kitchen Station 구현** (Phase 1~5) — `/var/www/docs/KITCHEN_STATION_SYSTEM.md` 참조
- Phase C 남은 항목: Stripe/PayPal 연동, 세금계산서, AI 마케팅 인사이트 (고객 피드백 후 트리거)
- 재고/발주 시스템 v3.0 Phase 2~8 (서비스 오픈 후 진행)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
