# 구독 플랜 셀프 변경 설계서

> **작성일:** 2026-03-18
> **상태:** 구현 진행 중
> **위치:** Profile 페이지 > Subscription 탭

---

## 1. 개요

4개 구독 역할(Restaurant Admin, Brand General, Foodcourt General, Restaurant Owner)이 Profile 페이지에서 자기 플랜을 직접 변경할 수 있는 기능.

---

## 2. 변경 규칙

| 구분 | 적용 시점 | 모듈 | 청구 |
|------|----------|------|------|
| **업그레이드** | 즉시 | 즉시 확장 | 차액 인보이스 즉시 발행 (due: 다음 청구일) |
| **다운그레이드** | 다음 청구일 | 현재 유지 | 다음 청구일에 새 가격 |
| **Monthly → Annual** | 다음 청구일 | 변경 없음 | 다음 청구일에 연간 가격 |
| **Annual → Monthly** | **불가** | — | 전액환불+재구독 안내 → Contact Support |

### 업그레이드 차액 계산

```
남은 일수 = subscription_end - 오늘
주기 일수 = billing_cycle === 'annual' ? 365 : 해당 월 일수

기존 크레딧 = 현재 plan_amount × (남은일수 / 주기일수)
새 플랜 비용 = 새 plan_amount × (남은일수 / 주기일수)
차액 = 새 플랜 비용 - 기존 크레딧

→ 차액 인보이스 발행 (invoice_category: 'plan_upgrade', due_date: 다음 청구일)
→ plan_type, plan_amount 즉시 업데이트
→ subscription_end 변경 없음
```

### 결제 타임라인 (업그레이드)

```
업그레이드 실행 → 기능 즉시 사용 가능
→ 차액 인보이스 발행 (due_date = 다음 청구일)
→ due_date 경과 시 overdue
→ overdue 후 7일 grace period → suspended
```

---

## 3. 역할별 적용

| 역할 | 구독 대상 | 저장 위치 | plan_target |
|------|----------|----------|-------------|
| Restaurant Admin | 자기 레스토랑 POS 구독 | restaurants 테이블 | restaurant |
| Brand General | 관리 플랫폼 구독 (소속 레스토랑 구독과 별개) | users 테이블 | brand |
| Foodcourt General | 관리 플랫폼 구독 (입점 레스토랑 구독과 별개) | users 테이블 | foodcourt |
| Restaurant Owner | 관리 플랫폼 구독 | users 테이블 | owner |

---

## 4. 제한 조건

| 상황 | 처리 |
|------|------|
| payment_model ≠ 'restaurant' | 변경 불가. "Your POS subscription is billed to [이름]. Please contact them for plan changes." |
| Overdue/Suspended | 변경 불가. "You have overdue invoices. Please settle them before changing your plan." + [Go to Invoices] |
| 다운그레이드 시 사용량 초과 | **변경 차단**. "You currently use 12 staff (Basic limit: 5). Please reduce before downgrading." |
| Annual → Monthly | 변경 불가. 환불+재구독 안내 + [Contact Support] |
| Demo 계정 | 탭 미표시 |
| Trial 중 | 변경 허용. 즉시 적용, 차액 없음, trial 종료 후 새 가격 첫 청구 |
| System Admin / Staff | 탭 미표시 |
| 이미 예약 중 | 새 변경으로 덮어쓰기 |

---

## 5. DB 변경

### restaurants + users 테이블에 추가 (5개 필드)

| 필드 | 타입 | 용도 |
|------|------|------|
| pending_plan_type | STRING(100), NULL | 예약 플랜명 |
| pending_plan_amount | DECIMAL(10,2), NULL | 예약 금액 |
| pending_billing_cycle | ENUM('monthly','annual'), NULL | 예약 cycle |
| plan_change_date | DATE, NULL | 적용 예정일 |
| plan_change_type | ENUM('downgrade','cycle_change'), NULL | 변경 유형 |

### restaurants.js PUT에 subscription_end 자동 계산 추가
users.js와 동일 로직: subscription_start + billing_cycle → subscription_end 자동 산출

---

## 6. API

### GET /api/subscriptions/my-plan
- 역할 자동 감지 → 해당 plan_target 플랜만 반환
- 현재 구독 + pending 변경 + 사용량 + proration estimate

### POST /api/subscriptions/change-plan
- { new_plan_id, new_billing_cycle }
- 업그레이드: 즉시 반영 + 차액 인보이스
- 다운그레이드: 사용량 초과 체크 → 초과 시 거부, 미초과 시 pending 저장
- Monthly → Annual: pending 저장

### DELETE /api/subscriptions/change-plan
- 예약 취소, pending 초기화

---

## 7. 활동 로그

entity_type: 'subscription' 으로 ActivityLog에 기록.

| 액션 | description 예시 |
|------|-----------------|
| 업그레이드 | "Plan upgraded: Basic Plan → Professional Plan (RM 29.35 prorated)" |
| 다운그레이드 예약 | "Plan downgrade scheduled: Professional → Basic (effective Apr 1, 2026)" |
| 예약 취소 | "Plan change cancelled: kept Professional Plan" |
| Cycle 변경 예약 | "Billing cycle change scheduled: Monthly → Annual (effective Apr 1, 2026)" |
| Scheduler 전환 | "Scheduled plan change applied: Professional → Basic" |

---

## 8. 연관 시스템 수정

| 시스템 | 수정 |
|--------|------|
| invoiceScheduler | 청구일에 pending 확인 → 실제 전환 + 새 가격 인보이스 + pending 초기화 |
| subscriptionScheduler | suspended 시 pending 자동 취소 |
| subscription-status API | pending_change 정보 추가 반환 |
| GET /api/plans | ?plan_target= 필터 추가 |
| restaurants.js PUT | subscription_end 자동 계산 추가 |
| PaymentStatusContext | pending 정보 포함 |

---

## 9. UI 모달 종류 (6종)

1. 플랜 선택 모달 (플랜 카드 + billing cycle 토글)
2. 업그레이드 확인 모달 (차액 계산 표시)
3. Trial 중 업그레이드 확인 모달 (차액 없음 안내)
4. 다운그레이드 확인 모달 (제한 변경 안내)
5. 다운그레이드 차단 모달 (사용량 초과)
6. 예약 취소 확인 모달
7. Annual→Monthly 안내 모달 (Contact Support)
8. 업그레이드 완료 모달 (인보이스 안내)
