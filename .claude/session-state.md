# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-04-30 (v3.20 운영 배포 + 후속 fix/cleanup, 미배포 v3.21 후보)
**버전:** **v3.20** (운영) → 누적 v3.21 후보 (미배포)
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)

**🔥 v3.20 운영 배포 (2026-04-30)**
- 운영 쿠폰 100% 할인 → total=0 보존 fix (운영 8건 정정 — Restaurant 8 IPC)
- Supply Chain Sprint 7 — Operational Hardening (4 영역 + 12 빈틈)
- Phase A — 운영 위험 5건 (PO 알림, mark-shipped 차단, 트랜잭션·락)
- B1 SOA 재설계 — Invoice record 발행 + parent_soa_invoice_id + cascade payment + 인라인 표시
- B2 Supplier Staff Advanced 모듈 — supplier_company_id + role ENUM + supplierScope + 4 CRUD endpoint + SupplierStaffPage
- B3 SupplierDashboard 리팩토링 (공통 컴포넌트, StatusBadge variant, Skeleton 8)
- B4 Empty state + CTA 통일 (Contracts hint, Customers CTA)
- 모바일 모달 padding 통일 (Modal.tsx + 4 인라인)
- Restaurant 구매자 흐름 정돈 (alert/confirm 12건 → AlertDialog/ConfirmDialog, 이모지 SVG, AddressFields)
- DB 마이그레이션 자동 실행: sprint7 + supplier-staff + soa-invoice
- 릴리즈 노트 + 랜딩 블로그 + System Admin 공지 자동 등록

**🛠️ v3.20 배포 후 dev 적용 (다음 /배포 시 v3.21로 묶임)**
- Restaurant Ingredient POST image_url 드롭 버그 fix + 5개 필드 누락 보강
- Ingredient modal UX 정돈 (푸터 sticky / disabled 조건 / Saving 표시)
- Supplier Staff 모듈 게이팅 fix (`/pos/supplier/staff` → `supplier_admin_staff`)
- Orphan 페이지 9개 + 빈 디렉토리 4개 정리 (PurchaseInvoicesPage 등)
- 운영 직전 전수조사 검증 (Sidebar/Route/Lazy import/FE↔BE 매핑 모두 PASS)
- 자동 테스트 패턴 이메일 가드 (admin spam 방지)

### 다음 할 일
1. **다음 4 — 리퍼럴 시스템 (Refer & Earn)** — 신규 시스템 (대규모). 설계 문서 `docs/REFERRAL_SYSTEM.md` 존재. Phase 1 (16 항목) / Phase 2 (4 항목) / Phase 3 (5 항목) 모두 미시작
2. **다음 2 Phase 2-3 잔여** — 계약 관리 후속 (Plan 연결 UI / 갱신 알림 / Checklist 템플릿 / Foodcourt Unit UI)
3. **다음 /배포** — v3.21 묶음 (이번 후속 fix + cleanup)

---

## 환경 / 인증 현황

- 백엔드: dev-backend (PM2, port 3001)
- 프론트: nginx → /var/www/dev-frontend-build, 배포된 번들 `main.83a6f63c.js` (2026-04-30 18:56)
- DB: purple_dev_db (MySQL)
- 테스트: kdine_admin (Restaurant Admin, restaurant_id=5)

---

## 주요 문서 위치

- `/var/www/CLAUDE.md` — 프로젝트 워크플로우 + 검증 절차
- `/var/www/DEVELOPMENT_PLAN.md` — Phase 로드맵 + 작업 히스토리
- `/var/www/CHANGELOG.md` — 배포 전 변경 내역 (Unreleased)
- `/var/www/dev-frontend/UI_DESIGN_GUIDE.md` — Modal 패턴, 디자인 토큰
- `/var/www/docs/INVOICE_SYSTEM.md` — 11절 SOA 재설계 (B1)
- `/var/www/docs/SUPPLY_CHAIN_SPRINT_*.md` — Sprint 1~7 설계 문서
- `/var/www/docs/REFERRAL_SYSTEM.md` — 다음 세션 우선순위 (미시작)

---

## 복구 가이드

새 Claude 세션 시작 시:

```
session-state.md 읽고 이어서 개발해.
```
