## 현재 작업 상태
**마지막 업데이트:** 2026-04-13
**현재 버전:** v3.13
**작업 상태:** 완료 (일부 변경 사항 미배포 상태)

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-04-13)

#### 1. 인보이스 인쇄/PDF/View 안정화
- 5개 역할 인보이스 페이지의 인쇄 템플릿에서 `{t(...)}`(JSX 스타일)이 그대로 텍스트로 출력되던 버그 → `${t(...)}`(템플릿 리터럴 보간식) 수정
- 인쇄용 PDF가 1장에 모든 내용 박혀서 잘리던 문제 → `pageHeight=297mm` 기준 슬라이스 + `addPage()` 다중 페이지
- iframe 캡처 클리핑 방지: `body.scrollHeight`로 동적 높이
- 금액 RM 줄바꿈 방지: `.text-right` / `.summary-row`에 `white-space: nowrap`

#### 2. Payment Settings 자동 재계산 + 수정 배지
- 미결제(draft/pending_payment/overdue) 인보이스를 새 charges로 일괄 재계산
- `subtotal - discount_amount` base 사용 (할인 보존)
- modification_history에 `{reason:'payment_settings_updated'}` 기록 + `is_modified=true` 자동 표시
- `syncPendingInvoice`도 동일하게 `is_modified=true` 추가 (시스템 자동 수정도 수정 배지 표시)

#### 3. modification_history 크래시 (치명) 해결
- 이중 인코딩 fix: `JSON.stringify(history)` → `history` (Sequelize JSON 컬럼 자동 직렬화)
- DB 클린업: dev 33건 + 운영 12건 string → array
- 프론트엔드 렌더러: 수동 편집 `{changes:{...}}` + 시스템 자동 `{before,after}` 양형식 모두 처리
- Admin/Brand/Foodcourt 6곳 (view 모달 + edit 모달)

#### 4. Hardware 인보이스 QTY/단가 (치명)
- `invoice_items.quantity INT NOT NULL DEFAULT 1`, `unit_price DECIMAL(10,2)` 컬럼 추가 (dev + 운영)
- `hardware-quotes.js` 양쪽 addon 생성 경로에서 `description x{N}` 제거 + quantity/unit_price 저장
- `invoices-main.js` 4개 transform이 `item.unit_price`로 unitPrice 노출
- DB 백필: hardware_quotes.addon_items JSON_TABLE join (dev 9건, 운영 5건)

#### 5. 기타 수정
- Pricing 페이지 탭 URL 딥링크 (`?tab=restaurant|brand|foodcourt|owner`)
- Hardware Quote 모달에 payment_settings 자동 로드 (rate-based + amount preview)
- 인보이스 DELETE FK 해제 (`hardware_quotes` FK 사전 NULL)
- InvoicesPage Non-Member 뱃지: `payerType === 'external'`만으로 단순화
- Brand General 레스토랑 생성/편집 모달에 "Link to Brand" 드롭다운 신규 (이전엔 user.brand_id가 null이라 연결 못 함)

### 운영 배포 (이번 세션)
- 배포 1 (23:14 MYT): 인보이스 i18n + nowrap + PDF 분할 — `main.7c8f69a7.js`
- 배포 2 (23:52 MYT): hardware quantity/unit_price + DELETE FK fix + payment_settings recalc — 백엔드 only
- 배포 3 (대기): modification_history 양형식 렌더러 + Brand-Restaurant 연결 UI — 빌드 완료, `main.fd0a9498.js` (배포 대기)

### 미배포 변경 (다음 /배포 시 반영)
- 인보이스 view 모달 modificationHistory 크래시 양형식 렌더러 fix
- Brand General Restaurant 생성/편집에 "Link to Brand" 드롭다운

### 다음 할 일
1. 미배포 변경 운영 배포
2. 모든 역할 모든 페이지 레스토랑 이름 옆에 `branch_name` 표시 (같은 브랜드 내 이름 중복 구분 — Reports, Stats, Performance, 인보이스, 주문 등 전 영역)
3. "No Active Subscription" 배너 정책 결정: Brand General 테스트 계정 plan_type=null 케이스 → Free 플랜 자동 발행할지, "구독 없음 + 접근 허용"으로 풀지
4. `POST /api/restaurants` requireRole 누락 (HIGH 보안 갭) 수정

### 알아둘 것 (DB 변경)
- `invoice_items` 테이블에 `quantity` + `unit_price` 컬럼 추가됨 (dev + 운영 모두)
- modification_history JSON 컬럼 데이터 정합성 복구 완료

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
