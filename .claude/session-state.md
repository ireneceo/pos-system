# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-30 14:00
**작업 상태:** 완료 (모바일 dine-in 테이블번호 필수 — DEV 구현+검증 완료, 미배포)

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- **모바일 dine-in 테이블번호 필수 기능** — 매장별 설정 ON 시, 대표/공용 QR로 테이블 없이 들어온 손님이 Floor Plan 테이블 목록에서 테이블을 직접 고르게 강제. 백엔드 2경로 가드(400 TABLE_REQUIRED) + OrderTypePage picker + PaymentPage 결제차단 + i18n 4언어.
- 부수 수정: PaymentPage 테이블목록 소스 버그(operation_settings → table_settings), picker 색상 모바일 토큰(#635BFF) 정렬.
- 검증: API 7/7 + 회귀 3/3(OFF매장 무영향) + print 계약 7/7 + i18n 0 + state-hydration 0 + 실브라우저 mount 5/5.

### 다음 확정 작업 (Irene 명시)
- **Irene 가 dev 에서 직접 테스트** → 이상 없으면 **bless + 운영 배포**. (Irene: "이거 테스트 다음에 하게 저장해줘")
  - 테스트 절차 ↓ "테스트 가이드" 참조.

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- 🔴 **[미해결 known issue] 주방 단계 멋대로 바뀜** (이전 세션 Irene critical 지목). ① 해물부침개 서빙해도 다시 생김 ② 잡채 1개 눌렀는데 3개 들어가고 취소해도 3개. 가설(미검증): 모바일 멱등키 없음 / 자동머지 dedup 없는 append / `/orders` 소켓 replay 캐시 없음 / 서빙 시 printed_at 없으면 재필터. **먼저 할 일**: 운영 DB에서 해당 order_items 직접조회 → DB행 중복 vs 렌더 중복 확정. 🔒 KDS/billPrint/orders-crud print 부분 보호.
- 세트/옵션 표시 전수 감사 (set_components 렌더 전 구간). 애프터밀=옵션 처리, after_meal 플래그 제거 대상.
- 브랜드 세트(OR/옵션) 산하 매장 실전파 + 세트 A/B 인쇄 실프린터 확인 ([[project_brand_set_groups_verify]]).

---

## 🧪 테스트 가이드 — 테이블번호 필수 (DEV, 다음 세션 Irene)

dev 에는 The Fire(16) 없음 → **데모매장 `demo-korean-bbq`**(id 38, Floor Plan 테이블 T001~T003) 사용.

1. 설정: **설정 → "Tables & QR" 탭** (`/restaurant/{id}/settings?tab=tablesQr`) 토글 2개 둘 다 ON:
   - ① **테이블 번호 활성화**(Enable Table Numbers) — 게이트
   - ② **테이블 번호 필수**(Table Number Required) — ①꺼지면 ②비활성
2. 모바일 **대표/공용 링크**(테이블 QR 아님)로 진입: `https://dev.purplehere.com/mobile/demo-korean-bbq` → **Dine In** → **테이블 선택 모달**(T001~T003 칩) 떠야 정상.
3. 비교: 테이블 QR(`?table=T001&order_type=dine-in`) → 모달 없이 바로 메뉴(이미 테이블 보유). takeaway 전용 QR(`?order_type=takeaway`) → 테이블 안 물음.

**테스트 OK 후 배포 순서 (둘 다 필요):**
- ① **bless**: `cd /var/www/dev-backend && node scripts/check-print-guard.js --bless` (orders-crud.js TABLE_REQUIRED 가드 지문 — 인쇄 무관, print 7/7 통과. **Irene 승인 후에만**. 안 하면 deploy-to-production.sh fail-closed)
- ② 배포 후 **The Fire(16) 설정에서 ①② 토글 ON** (배포만으론 자동적용 X, 기본 OFF)

**구현 파일:** mobile-public.js / orders-crud.js🔒 / mobile-orders.js / OrderTypePage.tsx / PaymentPage.tsx / common.json 4언어. 정본 문서 `docs/ORDER_TYPE_PINNING.md` "Dine-in table requirement". 메모리 [[reference_dinein_table_required]].

---

## 🔑 환경 / 운영
- 운영: irene@87.106.78.146, /var/www/production-backend(3002), /var/www/production-frontend. 매장 The Fire=16, slug=the-fire-korean-restaurant.
- dev DB는 The Fire(16) 없음 → 모바일 주문/테이블 검증은 데모매장 38(demo-korean-bbq) 또는 운영 직접(읽기)/SSH.
- 운영 DB 직접조회: dev-backend 읽기전용 node script → scp → ssh 실행 후 rm. Order 금액컬럼 = `total_amount`(not total).
- dev 최신 번들: main.1b8e01d1.js. git: 로컬 commit-only(push 안 함), origin 대비 11+ 커밋 앞섬.

## 📂 주의
- 🔒 인쇄 코드 변경은 Irene 승인+실프린터 확인 후 bless. orders-crud.js 이번 가드는 인쇄 무관이나 지문 변경 → bless 대기.
- 운영 배포는 Irene `/배포` 명시 지시만. git push 도 안 함(PurpleHere commit-only).

## 서버 재시작 후 복구 가이드
새 Claude 세션 시작 시:
```
session-state.md 읽고 이어서 개발해.
```
