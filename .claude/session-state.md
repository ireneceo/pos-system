---
## 현재 작업 상태
**마지막 업데이트:** 2026-09-25 19:25 UTC
**버전:** 운영 **v3.103** · SW **5.65-reconcile-total-first-20260925**(마지막 배포 2026-09-25 19:16, 백업 20260925_185824, 스모크 10/10, 마이그 101/101, mount sweep 크래시 0)
**작업 상태:** 완료 — 오늘 운영 배포 2회(SW 5.64 · 5.65) · 지시 대기

### 진행 중인 작업
- 없음

### 완료된 작업 (2026-09-25 오후~밤 세션) [Claude Code]
- ✅ **SW 5.64 (17:06 배포, v3.103)** — Irene 지적 4건 + 발견 2건
  - 기본 카드 제목 = 프로필 이름(`services/userContexts.js listContexts`, jest 26/26)
  - 데스크탑 사이드바 전환 입구(🔒 `MainLayout.tsx` 2줄 — Fable 판정·Irene 승인·사인오프 → `check-print-guard --bless` 8/8)
  - 현금 원장: 잠금 기준 `source !== 'manual'`(서버와 동일) + 출처 배지 + 거절 사유 표시(`CashLedger.tsx`)
  - 푸드코트 배송 조건 두 칸(`FoodcourtPaymentSettingsPage.tsx`) + 배송 조건 문장 통화 기호(`DeliveryTermsText.tsx`)
  - 🔴 쓰기 뒤 GET 캐시 무효화(`utils/fetchDedupe.ts invalidateDedupe` + `httpClient.ts`) — 삭제 직후 2초 안 재조회가 옛 목록을 받던 앱 전역 결함
  - v3.103 릴리즈: 블로그 `release-v3.103` · 공지(운영 9곳) · CHANGELOG v3.103 섹션
- ✅ **SW 5.65 (19:16 배포)** — 인보이스 «총액 우선 대조»(`docs/PURCHASE_ORDER_SYSTEM.md` §8-6 A, Irene 「해」)
  - `InvoiceReconcilePage.tsx`: 맨 위 «1 · 인보이스 총액» 패널 + 갭 한 줄 + «이 총액으로 확정 (줄은 나중에)»(총액만 있으면 활성) · «2 · 줄까지 맞추기» · 노란 예비 상자 제거 · 저장된 줄 단가가 있으면 확인창
  - 갭 = 청구 총액 − 발주 총액 한 곳(`utils/reconcileGap.ts`) → 목록 버튼(«Total only · +RM 2.50»)·상세·결제 창. 백엔드 0줄 · DB 0
  - 검증: 서버 실호출 10/10 · 실브라우저 10/10(최종 번들) · 고장주입 2건 반증 · utils 73/73 · 배포 게이트(mount sweep 크래시 0)
  - ⚠ 최종 수정(통화 코드 인자) 이후 `verify-all --full` 은 메모리 부족 강제종료로 못 돌림 → 배포 스크립트 게이트(9개 + mount sweep)와 통화 게이트 단독 통과로 대신함
- 첫 배포 시도 1회는 PlanQ `tsc` 메모리 게이트로 빌드 전에 멈춤(운영 무변경) → 재배포

### 다음 확정 작업
- 없음 — 지시 대기

### 👉 Irene 님이 하실 일
1. 오너 모자 후속(Fable 판정 순서): gitconsulting 에 «오너 · with MIN Cafe» 부여 → withmin_owner(64) 소유 회수 → 64 비활성화 · 64 마지막 로그인 확인
2. AI 판독 시범 여부 — 손글씨로 오는 공급업체가 몇 곳인지(§8-6 C, 절반 넘으면 가치)
3. 판매자(브랜드·푸드코트·공급업체)가 배송 조건 두 칸을 적어야 배송비가 붙는다 — 지금 0곳
4. 지역별 배송비는 Fable 권고로 보류(컨펌만)

### 후속 후보 (아이디어 메모, 확정 X)
> /개발시작 자동 추천 대상 아님. 다음 사이클 결정은 Irene 지시 기준.
- RA 계정엔 부여 화면 UI 입구가 없다(기존 갭)
- 운영 «대조 시각 있음 AND 전 줄 단가 null» 발주 수 1회 실측(§8-6 D-4)
- 빌드 내부 타입 검사가 매번 OOM 으로 죽는다(빌드 자체는 성공) — 타입 게이트 사실상 없음
- 브랜드·푸드코트 모자를 한 아이디에 · 「기존 아이디 연결」 셀프서비스
- 배포 스크립트 마이그 실패 시 pm2 재시작 없이 멈춤 · `rollback-production.sh` 경로 불일치
- site-settings 이중 호출 · 운영 `_tmp_uname.js` 잔여 · `supplier_companies.shared_with_stores` 드롭 · 720px Windows 앱 팝업이 버튼 가림

### 주요 변경사항
- 🔒 `MainLayout.tsx` 2줄 + print-guard manifest 새 기준(Irene 사인오프)
- 앱 전역: 쓰기(POST/PUT/PATCH/DELETE) 응답 뒤 GET 2초 캐시·공유 목록 비움
- Git: 미커밋(아래 /개발완료 에서 커밋) · 최근 커밋 `229ebf664`

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
