## 현재 작업 상태
**마지막 업데이트:** 2026-02-25
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)

#### EntityPlan 1플랜=1과금항목 + 인보이스 issuer 체계 (2026-02-25)

##### 1. EntityPlan 구조 변경
- EntityPlanCharge 모델/테이블 롤백 (삭제)
- EntityPlan에 charge_type, percentage_value, revenue_base, billing_day 추가
- 1플랜 = 1과금항목 (로열티, 임대료, 관리비 등 각각 별도 플랜)

##### 2. Brand/Foodcourt 페이지 전면 리팩토링
- BrandPlansPage: Charge Type UI (Fixed/Percentage), 다중통화 가격, billing_day
- FoodcourtPlansPage: 동일 구조
- BrandSubscriptionsPage, FoodcourtSubscriptionsPage: issuer 구분 반영
- BrandInvoicesPage, FoodcourtInvoicesPage: issuer 구분 반영
- BrandGeneralDashboard, FoodcourtGeneralDashboard: 통계 개선

##### 3. 인보이스 issuer 체계
- system_admin / brand / foodcourt 발행 주체 구분
- 각 주체별 독립 인보이스 발행

##### 4. 레시피/재고 다중통화
- RestaurantIngredientCost 모델 추가
- 원재료 원가 통화별 관리

##### 5. 배포 스모크 테스트
- deploy-to-production.sh에 POS 핵심 흐름 자동 검증 추가
- Health → Login → Menu → POST Order → GET Bill Data → Frontend (6개)

##### 6. 운영서버 배포
- 스모크 테스트 6/6 통과

### 현재 비밀번호 매핑
| 계정 | 이메일 | 비밀번호 |
|------|--------|----------|
| Demo | demo-brand/demo-restaurant@purplehere.com | Demo@2024 |
| System Admin | irene@irenewp.com | Admin1234 |
| Foodcourt/Brand General/Manager | *@orderhere.center | Test1234 |
| Restaurant Owner | owner@purplehere.com | Owner1234 |
| Restaurant Admin (K-DINE) | admin@kdine.com | Restaurant1 |
| Staff (K-DINE) | staff@kdine.com | Staff1234 |

### 전체 완료 현황
- 서비스 오픈 준비 로드맵: Phase A ✅, Phase B ✅
- Brand/Foodcourt 구독 플랜: Phase 1~5 전체 ✅
- Restaurant-Admin 1:1 매칭 ✅
- Restaurant Admin 리네임 + 비밀번호 정책 ✅
- Blog/FAQ CMS ✅
- 랜딩 페이지 디자인 통일 ✅
- Brand General/Foodcourt General RestaurantsPage Admin 기준 통일 ✅
- Brand/Foodcourt Manager 대시보드 실데이터 ✅
- 백엔드 자동 연결 + Trial 권한 ✅
- Staff 관리 + PIN 캐셔 전환 + 메뉴 권한 시스템 ✅
- 배포 안정화 + DB 스키마 동기화 시스템 ✅
- Staff 비밀번호 리셋 기능 ✅
- Restaurant Owner 역할 전체 구현 ✅
- **EntityPlan 1플랜=1과금항목 구조 + 인보이스 issuer 체계 ✅**
- **레시피/재고 다중통화 지원 ✅**
- **배포 스모크 테스트 (POS 주문→빌) ✅**
- 운영서버 배포 ✅

### 다음 할 일
- 인보이스 자동 발행 (billing_day 14일 전)
- 결제 시스템 연동 (Stripe/PayPal)
- Phase C: 셀프 회원가입, 결제 연동, 세금계산서

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
