## 현재 작업 상태
**마지막 업데이트:** 2026-01-27 12:30
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)

#### 결제설정 추가비용 (Additional Charges)
- Invoice 모델에 additional_charges JSON 필드 추가
- Admin/Brand PaymentSettingsPage에 추가비용 UI 추가
- 최대 3개 항목 설정 가능 (enabled, name, rate)

#### 메뉴 관리 기능 개선
- Product 모델에 is_active 필드 추가 (비활성화용)
- 메뉴 복사 API 추가 (`/product/:id/copy`)
- 메뉴 활성화 토글 API 추가 (`/product/:id/toggle-active`)
- MenuManagementPage 아이콘 버튼으로 변경 (복사, 비활성화, 품절, 삭제)

#### 재료/레시피 UI 개선
- IngredientsTab 모달에서 Track in Inventory 체크박스 제거
- ProductIngredientsTab 모달에서 Track in Inventory 체크박스 제거
- RecipesTab 소수점 4자리 → 2자리 표시 수정
- Unit Cost 라벨은 이미 동적 통화(useBrandCurrency) 적용됨

#### Invoice 페이지 버그 수정
- StatCard의 variant prop → color prop 수정
- operationSettings.defaultCurrency → currency 수정

### 다음 할 일
1. **메뉴 로딩 성능 최적화** - 이미지 지연 로딩 또는 썸네일 적용
2. Payment System Integration (Stripe, PayPal)
3. Auto Payment System
4. Kitchen Display 개선 (Pending 컬럼 아이템별 Done 버튼)
