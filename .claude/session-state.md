## 현재 작업 상태
**마지막 업데이트:** 2026-04-03
**작업 상태:** 완료
**버전:** v3.7

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- 시스템 프로덕트 + 하드웨어 패키지 견적 시스템 전체 구현
  - BrandProduct 보강 (세트/이모지/복제/토글)
  - 모델 5개 (SystemProduct, SystemProductCategory, SystemProductPrice, SystemProductAddon, HardwareQuote)
  - Admin SystemProductManagementPage (2탭: Products, Categories)
  - Admin HardwareQuotesPage (견적 관리 + 인보이스 발행)
  - PackagesPage (/packages, 공개 견적 UI)
  - Public API (packages, hardware-quotes)
  - 이메일 알림 (견적 접수 확인 + Admin 알림)
  - 20개 개별상품 + 6개 패키지 데이터 등록 (MY/SG/KR 3개국 가격)
- PricingPage 하단 → PackagesPage 링크 추가
- Subscriptions 메뉴 복원 (Coming Soon → 활성)
- 설계서: docs/SYSTEM_PRODUCT_AND_HARDWARE_PACKAGE.md

### 다음 할 일 (우선순위 순)
1. **Hardware Quotes + System Products 전체 기능 테스트** (최우선)
   - /pos/admin/system-products: 상품 CRUD, 카테고리 CRUD, 세트 생성/수정, 가격 설정, 배송 설정, 복제, 활성토글, 삭제
   - /pos/admin/hardware-quotes: 견적 목록, 상세 보기, 상태 변경, 유저 연결, 내부 메모, 인보이스 발행, 삭제
   - forEach 버그 수정 빌드 반영 확인 (Ctrl+Shift+R)
   - 모든 버튼/모달/필터/검색 동작 확인
2. 시재/발주 시스템 구현 Phase A (시재 관리) — docs/PETTY_CASH_AND_PURCHASE_ORDER_SYSTEM.md 참조
3. 또는 데모 데이터 Phase 2 (Foodcourt/Owner 데모 계정)

---

## 복구 가이드
```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
