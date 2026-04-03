## 현재 작업 상태
**마지막 업데이트:** 2026-04-03
**작업 상태:** 완료
**버전:** v3.7

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- 시스템 프로덕트 + 하드웨어 패키지 견적 시스템 전체 구현
- BrandProduct 보강 (세트/이모지/복제/토글)
- 20개 개별상품 + 6개 패키지 데이터 등록 (MY/SG/KR 3개국 가격)
- 설계서: docs/SYSTEM_PRODUCT_AND_HARDWARE_PACKAGE.md

### 다음 할 일 (Irene 피드백 기반, 우선순위 순)

#### 1. PackagesPage (/packages) 수정
- 추가 장비: 같은 디바이스 중복 제거 (POS Additional, Kitchen 등 소제목 제거)
- 견적 문의 폼: 이메일 + 전화번호 필수 밸리데이션 추가
- 역할별 소프트웨어 구독 플랜 비용을 별도 안내로 표시
- 추가 서비스 상품 등록: "메뉴 추가 등록", "교육 추가" 를 개별 상품으로 등록 → addon 연결

#### 2. HardwareQuotesPage (/pos/admin/hardware-quotes) 대폭 개선
- 카드 리스트에 선택된 패키지/추가장비 내용 표시
- 버튼 디자인 통일 (Inquiry Management /pos/admin/support 패턴 기반)
- 인보이스 발행 버튼 동작 확인/수정
- Active/Closed 탭 구조 + Close 버튼 추가 (support 페이지 패턴)
- 카드 전체 클릭으로 상세 보기

#### 3. Contact Inquiries + 문의 관리 페이지 통일 개선
- /pos/admin/contact-inquiries: support 페이지 패턴으로 완성도 올리기
- Brand General, Foodcourt General 문의 페이지도 동일 패턴 적용
- Active/Closed 탭 + Close 버튼 + 전체 클릭 뷰

#### 4. SystemProductManagementPage (/pos/admin/system-products) 수정
- Set Configuration: 체크 시에만 세트 설정 표시, 유저페이지 노출 조건 명확화
- 상품 옵션(OptionGroup) 추가: Set이 아닌 상품에 옵션 활성화, Set이면 비활성
  - BrandProduct에도 동일 적용 (옵션은 이미 있지만 Set과의 관계 정리)
  - SystemProduct 전용 Set Configuration은 System Admin만
- Shipping 구조 변경:
  - 상품별 배송설정 제거 → 별도 운영설정(Shipping Settings)으로 이동
  - 국가 목록: 시스템 설정의 "대응 국가" 기반 (통화설정처럼 먼저 등록)
  - 국가그룹별 배송비 등록 (레스토랑 배송설정 패턴이되 국가그룹 기반)
- Available Countries: 시스템/브랜드 설정의 대응 국가에서 가져오도록 변경
- 가격 표시: 기본 통화(MYR) 우선, 통화별 리스트 전환 가능, 천단위 콤마, KRW 소수점 없음
- 복사: 복사 후 자동 스크롤 또는 하이라이트로 식별 가능하게

#### 5. forEach 버그
- shipping_settings 배열/객체 양쪽 대응 수정 완료 (빌드 반영됨, Ctrl+Shift+R 필요)

---

## 복구 가이드
```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
