---
## 현재 작업 상태
**마지막 업데이트:** 2026-09-29 (Irene 「나머지는 저장하고 다음 섹션에 할게」 — 중단 저장)
**버전:** 운영 **v3.103** · SW 운영 **5.65-reconcile-total-first-20260925** / 개발 **5.66-sales-order-share-20260929**(빌드 1회 완료·미배포)
**작업 상태:** 🟡 진행 중 — 코드 묶음 거의 완료(verify-all --full·Fable 게이트 전) + Fable 판정 1건 대기

### 진행 중인 작업
- 🟡 **[Claude Code] 코드 묶음 (09-27 지시 13건 + 09-29 Sales Orders 3건) — 개발서버, 미배포**
  - 판정 원문: `.claude/fable-verdict-20260927.md` Ⅱ · `.claude/fable-verdict-20260928.md` Ⅱ. **새 판정 대기: `.claude/fable-verdict-20260929.md`**(사안1 K-DINE 재료·메뉴 / 사안2 F2) — Fable 이 백그라운드로 작성 중이었음. 파일 없으면 재호출 필요.
  - ✅ 09-29 신규(Irene 「Buyer 2열 → 위아래」「상세팝업에서 왓츠앱 공유」「카테고리별로 묶어서」): `IncomingOrdersView.tsx`(Buyer 세로 · 상세 품목 판매자 카테고리 묶음 · WhatsApp 공유 버튼) · `utils/poShare.ts`(`groupItemsBySellerCategory`·`shareSellerOrderViaWhatsApp`, wa.me/?text= 그룹 선택) · 백엔드 `utils/sellerProductIdentity.js attachSellerProductCategory` → `seller-orders.js GET /:id` · supplier.json 4언어 2키. 실호출 BG 200·공급업체 200·익명 401 · jest poShare 11/11 · 고장주입 1(1차 약함 → 재주입 성립) · 실브라우저 6/6. 해석: 주문 1건 안의 품목 묶음(여러 주문 합산 준비목록 아님 — Irene 확인 필요 시).
  - ✅ R1 오너행 보존 실호출 8/8(관리자 교체 분기 포함, 데모 매장 38 임시 오너행 → 원복 identical) · 고장주입 5 실패 확인
  - ✅ R2 마감 교대 잠금 5/5 · 고장주입 3 실패 확인 · 잔여 0
  - ✅ R7 배송 지역 브랜드 8/8 · 공급업체·푸드코트 2/2 · 원복. ⚠ 판정은 «마이그 불필요»였으나 배포는 sync-database 를 --alter 없이 돌리고 게이트가 막음 → **`scripts/migrate-add-seller-delivery-policy.js` 신설·레지스트리 deploy 등록**(dev 칸 드롭→마이그로 재추가 증명·멱등). 게이트에 사실로 보고할 것.
  - ✅ R8 메일 머리글 회사명(`emailBranding.js` brand name = company_name||name) 3/3 · 고장주입 2 · 월 SOA sellerName 두 경로(`soaScheduler.js` 자동·수동) — 메일 실발송 확인 불가(코드 대조만)
  - ✅ R3 `scripts/check-type-baseline.js` + `scripts/type-baseline.json`(436건/80파일, 저장소 밖 증분캐시) · verify-all `type-baseline`(runtime) 등록 · 반증(오류 1줄 → 실패, 원복 → 통과). tsc 종료코드 1 도 정상 처리.
  - ✅ R4 `/var/www/scripts/deploy-layout.sh` 신설(경로+`restore_code_from_backup`, --checksum 제외 rsync) · `deploy-to-production.sh`(layout source · 백업 직후 롤백 도구 운영 복사 · 백엔드 rsync~pm2 재시작 구간 EXIT trap 자동 원복, 레이아웃을 ssh stdin 으로 실행) · `rollback-production.sh` v3 재작성(되돌린 것 0 이면 실패). 가짜 디렉터리 재현 `scratchpad r4test.sh` 25/25 · 고장주입 2. 백업 원본: 세션 scratchpad deploy.bak/rollback.bak.
  - ✅ R5 rsync `_tmp_*`·`tmp/` 제외 · R6 `docs/SUPPLIER_CONTRACT_SYSTEM.md` «드롭하지 않음»
  - ✅ F1 RA 수정 창 자격 영역(실브라우저: RA 보임·Staff 안 보임) · F3 배너 z 900(모달이 위) · F4 배송 지역 칸 BG·FG·공급업체 + 발주 담기 한 줄(4언어, BG 저장→새로고침 유지) · F5 0원 Confirm 후 목록 즉시 갱신(BG 실클릭 5/5, **푸드코트 화면 같은 결함 함께 수정**). F5 프론트 고장주입은 빌드 1회 원칙으로 생략.
  - 🔴 **F2 불충족** — 실측: 새 프로필 첫 방문 문서 로드 2회, SW 교체 시 2회. 원인 추정 `public/sw.js` activate 의 `w.navigate(w.url)`(범위 밖이라 무접촉). Fable 판정 대기(사안2).
  - ⚠ 테스트 사고 1건: F5 실브라우저 원복 스크립트가 JSON 칸 때문에 실패 → dev 청구서 462 가 paid/0 으로 남았던 것을 461 대조로 원복(금액·상태·paid_at·메모·updatedAt) + 테스트 활동기록 1건 삭제. 재실행 원복 정상.
  - ⬜ 남은 순서: Fable 판정(F2) 반영 → (프론트 바뀌면) build:dev 1회 → **verify-all --full 1회** → check-sensitive-diff → 배포 기록 `releases/2026-09-29-*.json` → Fable 게이트 → Irene /배포
  - 배포 뒤: 운영 브랜드 1·2 delivery_policy «Petaling Jaya, Selangor» 입력 · 0원 청구서 93·88·69·61 Irene Confirm
  - ⚠ 배포 전까지 SA 화면에서 with MIN Cafe 매장 정보 저장 금지(R1 미배포)
- 🟡 **[Claude Code] K-DINE IPC(매장 8) 재료 중복·메뉴 상태 — 조사 완료, Fable 판정 대기(사안1)**
  - 운영 읽기 실측(2026-09-29): 재료 301 = 브랜드 171 + 매장 130, 이름 중복 42그룹(브랜드+매장 짝 38: 브랜드행=레시피 사용, 매장행=09-21 생성·발주 연결 → 사도 레시피 재고 안 움직임). 순두부 4줄. 메뉴: 브랜드 104(수동·잠금 0) / 매장 110(연결 101: 이름 31·가격 21 다름, 매장 신메뉴 8, 브랜드만 3). 재전송 시 세트 15개 구성 덮임 + 브랜드 옵션그룹 38링크 새로 붙음(매장 미러 0).
  - ⛔ Irene 「절대 지금 K-DINE IPC가 바꾼 메뉴가 돌아가면 안돼」 → 판정 전 brand 2→매장 8 push 금지 · 운영 `/tmp/kd.js --apply` 금지.
  - Irene 후속 원문 「그럼 1, 2, 3, 4번 문제를 다 어떻게 해결해?」 Fable 에 전달함 — 판정 원문 그대로 전달할 것.

### 완료된 작업 (이번 세션 2026-09-29) [Claude Code]
- 위 코드 묶음 구현·검증(빌드 1회 · verify-all --quick 정적 통과(deploy-ready·bundle-fresh 만 예정된 실패))
- SOA 확인(아래 Irene 할 일 2)

### 다음 확정 작업
- 위 «진행 중인 작업» 이어서 (Irene 「나머지는 저장하고 다음 섹션에 할게」)

### 👉 Irene 님이 하실 일
1. gitconsulting 로그인 → 시작 화면에 «with MIN Cafe» 오너 카드 확인 · Payment Settings 300/10 확인
2. **K-DINE IPC SOA** — 운영 사실: 매장 8 월말정산(monthly_soa, 15일) · 정산서 0장 · 안 묶인 청구서 7장 RM 5,705.90(09-13~09-29, 입고 완료 7건) · 입고 전(confirmed) 2건 PO-R8-20260927-002 RM 219.20 · PO-R8-20260929-004 RM 1,089.80 은 청구서 미생성. 발행 = 브랜드 계정 Restaurants(/pos/manager/restaurants) → K-DINE IPC «청구» → 월 명세서 «이번달(오늘까지)» 생성(이전 안 묶인 것 자동 포함). ⚠ 지금 발행하면 R8 미배포라 머리글·발신명이 브랜드명 «K-DINE with MIN».
3. AI: 이번 배포 뒤 /기능설계

### 후속 후보 (아이디어 메모, 확정 X)
> /개발시작 자동 추천 대상 아님. 다음 사이클 결정은 Irene 지시 기준.
- 판정상 안 함: 브랜드·푸드코트 모자/기존 아이디 연결(d) · shared_with_stores 드롭(i)
- 받은 발주 알림 일부(buyerReceivedEmail) 무브랜딩 · 인보이스 결제 알림 머리글이 수신자 users.brand_id 기준
- Sales Orders 검색이 불러온 첫 페이지 안에서만 찾음(브랜드 1 은 141건 중 PO-R5-20260622-003 이 목록 밖) — 기존 동작
- Owner·Manager 청구서 화면 0원 Confirm 재조회는 확인 안 함

### 주요 변경사항
- 운영 쓰기 0 (읽기만) · dev DB: brands/foodcourts.delivery_policy 드롭→마이그 재추가, 청구서 462 테스트 후 원복
- Git: 이번 중단 저장 커밋

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
