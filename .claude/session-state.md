## 현재 작업 상태
**마지막 업데이트:** 2026-04-04
**작업 상태:** 완료
**버전:** v3.7

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- 하드웨어 패키지 시스템 보완
  - 국가 설정 API (통화설정 패턴 복제)
  - PaymentSettingsPage Supported Countries 섹션
  - SystemProduct 옵션그룹 (모델/라우트/3탭 UI)
  - PackagesPage: addon 중복 제거, 밸리데이션, 국가 배너, 서비스 상품
  - HardwareQuotesPage: 3탭(New/In Progress/Closed), 댓글, 인보이스 발행
  - ContactInquiriesPage: Active/Closed 탭, Close 버튼
  - GNB "Setup Quote" 메뉴
  - 견적 폼 인보이스용 회사정보 (company_address, tax_id, wants_invoice)
  - 이메일 로고 CID 방�� 통일
- QR 세션 시스템 (TableQRSession 모델, FloorPlan Print QR, Settings QR Mode)
- 카드 UI 통일 (9개 페이지 CardSpacer 패턴)

### 다음 할 일 (우선순위 순)
1. **견적 → 구독 플랜 연결 기능** (대규모)
   - 견적 문의 시 구독 플랜 선택 (plan_id, billing_cycle)
   - [계약 진행] 버튼: 인보이스 2개 생성 (hardware + subscription)
   - 계정 연결 후에만 계약 진행 가능
   - 인보이스는 기존 시스템에 생성 → Admin이 Send Email → 고객 결제 → Paid
   - 기존 인보이스 시스템(invoices.js) 전체 흐름 정밀 파악 필수
   - HardwareQuote에 plan_id, billing_cycle 필드 추가
   - PackagesPage에 플랜 선택 UI
   - HardwareQuotesPage에 [계약 진행] 버튼 + 구독 설정
2. 시재/발주 시스템 구현 Phase A

---

## 복구 가이드
```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
