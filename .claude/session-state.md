---
## 현재 작업 상태
**마지막 업데이트:** 2026-09-30 (/개발완료 — K-DINE 9월 정산서 발행 완료, Issued 다브랜드 dev 완료·미배포)
**버전:** 운영 **v3.104** · SW 운영·개발 **5.66-sales-order-share-20260929** (v3.104 배포 16:29 UTC · 백업 20260929_162231 / 추가 배포 17:29 UTC · 백업 20260929_172243 · 버전 미상승)
**작업 상태:** 🟡 미배포 1건 + Irene 결정 대기 2건

### 진행 중인 작업
- 🟡 **[Claude Code] 브랜드 «Issued Invoices» 다브랜드 — dev 완료 · 운영 미배포**
  - `dev-backend/routes/invoices-list.js` GET / BG/BM 분기 → `managerBrandScope.brandIdsForUser`(소유 ∪ 배정), 컨텍스트 brandId 있으면 그 하나
  - 검증: 소유 BG(22) 두 번째 브랜드 정산서 보임 · 남 BG(6)·RA(23) 안 보임 · 고장주입(수정 전 코드 → 안 보임) · health 269/269 · deploy-ready 통과 · 기록 `dev-backend/releases/2026-09-30-issued-multi-brand.json`
  - check-sensitive-diff ★ ② 대상 — Fable 한도 소진, Irene 「검증 자체 검증으로 처리해」 → skip 기록
  - 👉 Irene `/배포` 대기. 배포 후 https://purplehere.com/pos/brand/invoices?tab=issued 에 SOA-BRD2-R8-M20260929173419 보이는지

### 완료된 작업 (이번 세션 2026-09-29~30) [Claude Code]
- v3.104 운영 배포(1차 묶음 R1~R8·F1~F5·Sales Orders·판매자 다중 브랜드 — Fable 게이트 PASS 8b7b143e1a92 + K-DINE SOA 2차: 월결제 Pay 가드·정산서 전체 PDF·발행일/수동 뒤 skip·수신자 0 생성·메일 링크·청구서 발행 시점). 릴리즈 블로그·공지 v3.104 운영 동기화
- 추가 배포(버전 미상승): 정산서 발행 직전 확정 이후 주문 청구서 선발행(`soaScheduler.issueMissingTradeInvoices`) — Irene 「내가 수동으로 만들어도 포함되어야지」
- 운영 처리(Irene 지시): users 19 kdineipc1 email=kate.kim.snkn@gmail.com(⚠ 규칙상 Irene 몫이었음, 보고함) · 첫 정산서 185 취소(PATCH 앱 경로, 자식 8장 해제) · Printing 상품 258·259·260 → 매장 8 from-catalog 연결(재고품목 1253~1255 · 매핑 1413~1415)
- **K-DINE IPC 9월 정산서 발행 확인: SOA-BRD2-R8-M20260929173419 · 10장 · RM 7,691.90 · 마감 10/15 · kate 메일 발송 · 청구서 없는 주문 0**
- 판정 원문: `.claude/fable-verdict-20260929-soa2.md`(SOA 2차) · `-gate.md`(1차 게이트) · `-structure.md`(재료·메뉴 구조, 보고문 세션 시작 때 전달)
- 문서: DEVELOPMENT_PLAN 09-30 절 · CHANGELOG(v3.104 + Unreleased 09-30) · docs/INVOICE_SYSTEM.md §11.8 · 메모리 2건(판매자 주문 추가=매장 연결 · 정산서=확정 주문 전부)

### 다음 확정 작업
1. **Irene `/배포`** — Issued Invoices 다브랜드(위 진행 중)
2. **A안 (Irene 결정 2026-09-30 「A로 해. 서비스 상품도 주문 넣을 수 있게」)** — 브랜드가 배포(distribution all 등)한 상품은 매장 연결 없이 판매자 «주문 추가»에 바로 뜨고 넣을 수 있게, 서비스 상품 포함. 구조 변경(주문 줄 재고 타깃 «정확히 하나» 불변식·9/4 재료 자동생성 금지와 닿음) → **Fable 설계 판정부터**(한도 소진으로 미수신, 요청문 사실 목록은 이 세션 대화). 그 전까지 새 상품은 매장 from-catalog 연결로 처리([[reference_seller_add_order_needs_buyer_link]])

### 👉 Irene 님 결정 대기
- K-DINE 재료·메뉴 구조 컨펌 4건(D1′ 브랜드 원본 잠금 A · D1″ 브랜드 화면 다중 관리자 · D3′ GIT 판매자 연결 자동 · D2′ 표 2건) + E 보고 — `.claude/fable-verdict-20260929-structure.md` §4·§5 (세션 시작 때 전달, 답 없음)
- v3.104 이후 추가 배포 버전 상승 여부(물었으나 답 없음 — 미상승으로 기록)
- 배포 후 확인: 브랜드 1·2 Payment Settings «배송 가능 지역» Petaling Jaya, Selangor 입력 · 0원 청구서 93·88·69·61 Confirm

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.
- 판매자 «완료»(`/seller-orders/:id/complete`, 서비스 전용) 는 received 로 바꾸지만 청구서를 즉시 안 냄 — 이제 정산서 선발행이 덮지만 immediate 매장은 여전히 없음
- BG Stock Items catalogLink 경로 판매자 비결정(다브랜드 소유자) — `utils/catalogLink.js` 주석
- 판정상 안 함: 브랜드·푸드코트 모자/기존 아이디 연결(d) · shared_with_stores 드롭(i)
- 받은 발주 알림 일부(buyerReceivedEmail) 무브랜딩 · 인보이스 결제 알림 머리글이 수신자 users.brand_id 기준
- Sales Orders 검색이 불러온 첫 페이지 안에서만 찾음 — 기존 동작
- 인스펙션 ING-UNI-001/002 가 브랜드↔매장 짝을 원리상 못 잡음(Fable 지적)

### 주요 변경사항
- 운영 쓰기(전부 Irene 지시): users 19 email 1행 · invoices 185 cancelled(앱 경로) · 매장 8 재고품목 3 + 판매 연결 3(앱 경로) · 정산서 188 은 Irene 이 직접 발행
- dev DB: 테스트 데이터 전부 원복(잔여 0)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
