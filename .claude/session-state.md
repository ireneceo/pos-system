---
## 현재 작업 상태
**마지막 업데이트:** 2026-09-28 (Irene 외출로 중단 저장 — /개발완료)
**버전:** 운영 **v3.103** · SW **5.65-reconcile-total-first-20260925**(마지막 배포 2026-09-25 19:16, 백업 20260925_185824)
**작업 상태:** 🟡 진행 중 — 코드 묶음 착수(백엔드 3건 편집만 · 빌드·검증·게이트 전)

### 진행 중인 작업
- 🟡 **[Claude Code] 2026-09-27 Irene 지시 묶음 — 코드 13건 한 묶음(빌드 1회·verify-all --full 1회 → Fable 게이트 1회 → Irene /배포)**
  - 판정 원문(재호출 불필요): **1회차 `.claude/fable-verdict-20260927.md` Ⅱ** + **2회차 `.claude/fable-verdict-20260928.md` Ⅱ(R7·F4)**. 남은 Fable = 구현 후 게이트 1회뿐. Irene 「fable 사용최소화하고 계속 해」.
  - ✅ 운영 데이터 2건 COMMIT (2026-09-28 03:24 UTC) — restaurant_managers id29 oversight→ownership · id45 삭제 · users 64 is_active=0 · brands 1·2 min_order_amount 300 / delivery_fee 10 (영향행 1·1·1·2). 사전 SELECT = 판정 예상과 동일. 사후: gitconsulting 컨텍스트 3장(GIT Consulting BG · with MIN Cafe RA · with MIN Cafe 오너) — **Irene 로그인 눈 확인 대기**.
  - 🟡 편집 완료·**테스트 전**(node --check 만 통과, pm2 restart 안 함):
    - R1 `routes/restaurants-crud.js` PUT /:id 두 곳 — destroy 를 oversight 로 한정 + 소유 행 가진 manager_id 는 bulkCreate 제외 · managers through 에 relationship_type, 목록(:299)·상세(:852) 필터에서 ownership 제외
    - R2 `routes/cash-management.js` — `assertShiftOpen` 헬퍼, 입출금 PUT/DELETE 에 SHIFT_NOT_OPEN
    - R7 백엔드 — `models/Brand.js`·`Foodcourt.js` delivery_policy(**dev DB 컬럼 ALTER 로 추가 완료**) · brands-core/foodcourts-core GET·PUT · supplier.js 허용필드 · `utils/sellerNames.js` attributes+map+`normalizeDeliveryPolicy`(500자, 태그문자 제거) · restaurants-ingredients `seller_delivery_policy`
  - ⬜ 남은 것:
    - R3 verify-all 에 빌드 밖 tsc 기준선(439) 게이트
    - R4 배포 안전망 — 조사 결과: 운영 `/var/www/rollback-production.sh` 는 dev 사본과 **md5 다름**(c768… vs c9ab…), 1월 버전. 백업 실제 구조 = `/var/www/backups/<TS>/production-backend/`(node_modules·.git 제외, .env·uploads 포함) + `production-frontend-build/`, DB 덤프 `/var/backups/orderhere/pre-deploy/db_predeploy_<TS>.sql.gz`. 롤백은 `.backup` 접미사·`db_backup_<TS>` 를 찾아 전부 skip. 계획: 공용 경로 파일(예 `deploy-layout.sh`)을 두 스크립트가 source + 배포가 롤백 스크립트를 운영에 복사 · 배포에 rsync 후 플래그/EXIT trap 자동 원복(.env·uploads·logs·node_modules 보존) · 롤백은 제외 rsync + 전부 skip 이면 실패.
    - R5 rsync `--exclude '_tmp_*' --exclude 'tmp/'` (dev `tmp/restart.txt` = 2025-11 빈 파일, 미사용 — 제외만)
    - R6 문서 shared_with_stores 「드롭하지 않음」
    - R8 판매자 메일 머리글 = `company_name || name`(`utils/emailBranding.js` brand 분기 name) + 월 SOA `services/soaScheduler.js:375` sellerName 같은 규칙 · buyerReceivedEmail 무브랜딩(`notificationTemplates.js:613`) 은 참고
    - F1 StaffManagementPage Edit 모달 UserContextsSection(RA) · F2 index.tsx hadController · F3 PwaInstallBanner zIndex 900 · F4 배송 가능 지역 textarea 3화면 + 담기 화면 한 줄 · **F5 BG 인보이스 0원 Confirm 성공 후 `fetchInvoicesToPay(); fetchPaidInvoices(); refreshBadgeCounts`**(`BrandInvoicesPage.tsx:383`, 현재 `fetchInvoices()` 만 → 목록 그대로 남아 «안 눌림») + **실브라우저 클릭 확인**
    - 순서: 백엔드 실호출·고장주입(pm2 restart 후) → 프론트 → i18n:verify → SW bump → build:dev 1회 → verify-all --full 1회 → check-sensitive-diff → Fable 게이트 → 기록
  - 배포 뒤 할 일: 운영 브랜드 1·2 delivery_policy 「Petaling Jaya, Selangor」 입력(판정 2회차).
  - ⚠ 다음 배포 전까지 SA 화면에서 with MIN Cafe 매장 정보 저장 금지(R1 미배포).
  - 운영 미확정 0원 청구서 93·88·69·61(payer BG 23, pending_payment) — F5 배포 후 Irene 이 Confirm.

### 완료된 작업 (이번 세션 2026-09-28) [Claude Code]
- Fable 2회차 판정 수신·저장(AI 키 = SA 화면 Stripe 방식 · 과금 확정 · 배송지역 = 안내 글)
- 운영 데이터 2건 적용·사후 확인
- Irene 신고 2건 원인 확정: ①판매자 메일 머리글이 brands.name(로고 없어 «with MIN» 텍스트, 회사명은 바닥글만) ②0원 Confirm 은 저장됨(운영 153·154 paid) — 성공 뒤 엉뚱한 목록 재조회
- 백엔드 R1·R2·R7 편집 · dev DB 컬럼 추가

### 다음 확정 작업
- 위 «진행 중인 작업» 이어서 (Irene 「다음섹션에 하자」)

### 👉 Irene 님이 하실 일
1. gitconsulting 로그인 → 시작 화면에 «with MIN Cafe» 오너 카드 확인
2. Plans & Payments → Payment Settings 에서 300 / 10 확인
3. AI: 이번 배포 뒤 /기능설계 (결정 ①② 확정됨)

### 후속 후보 (아이디어 메모, 확정 X)
> /개발시작 자동 추천 대상 아님. 다음 사이클 결정은 Irene 지시 기준.
- 판정상 안 함: 브랜드·푸드코트 모자/기존 아이디 연결(d) · shared_with_stores 드롭(i) · 대조 줄 단가 전부 빈 발주(b, 운영 0건 — 끝남)
- 받은 발주 알림 일부(buyerReceivedEmail)가 PurpleHere 기본 모양 — 브랜딩 없음
- 인보이스 결제 알림 머리글이 거래 브랜드가 아니라 수신자 users.brand_id 기준

### 주요 변경사항
- 운영 DB 쓰기 2건(위) · dev DB brands/foodcourts.delivery_policy 컬럼
- Git: 이번 /개발완료 커밋

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
