## 현재 작업 상태
**마지막 업데이트:** 2026-10-02 (/개발완료 — 운영 배포 1회 · GHL 2차 묶음 dev 완료, 미배포)
**버전:** 운영 **v3.107**(10-02 배포분 버전 번호 미확정 — 아래) · SW 운영 **5.71-card-terminal-tender-20261001** · 개발 **5.72-terminal-guards-app030-20261002**
**작업 상태:** 🟡 다음 섹션에서 이어서 — Fable 게이트 → /배포 → 운영 데모 매장 실단말기 테스트

### 진행 중인 작업
- 🟡 **[Claude Code] GHL 2차 묶음 — dev 완료 · 미배포 (SW 5.72)**
  - 근거: Fable 판정 2026-10-02 (이 세션, 2회 응답) — Irene 「모든 테스트는 실 운영에서」「테스트 데모 계정에서 하면 되지」 수용. 개발용 .dev 앱 경로 폐기 → **안드로이드 정식 앱 0.3.0** + R1 은 활성화 전 수정. 판정문 R1~R5: `.claude/fable-verdict-20261001-ghl-ecr-gate.md` §2
  - 구현: R1 분할 결제 거절·미확인 뒤 Confirm 잠김(`PaymentModal.handleSplitConfirm(manual?)`, canConfirm) · R2 서버 `createSale` 409 ALREADY_APPROVED(«승인 합+이번 금액 > 주문 금액», 같은 금액 승인은 `data.txn` 재사용→화면이 새로 안 긁고 기록) + DOUBLE_APPROVAL 경고(`reason:alreadyApproved/doubleApproval` 4언어) · R3 OrderContext 대기 연결 금액 대조 · R4 `/manual` 뒤 safeLink · R5 busy 순서
  - ⚠ 팀원 판단 1건(게이트에 보고): Fable 문구 «합이 잔액을 덮으면» 그대로면 정상 분할 2번째 몫이 막혀 «합+이번 > 주문 금액» 으로 구현. 분할 몫 기록 실패 뒤 같은 몫 재시도는 이 규칙으로 못 잡음(합 ≤ 총액)
  - 안드로이드 0.3.0: `mobile-app/android/app/build/outputs/apk/release/app-release.apk` (versionCode 3 · 운영 URL `purplehere.com/pos` · dex NativeEcr 7 · 서명 SHA-256 b55813cf… = 0.2.0 과 동일 → 덮어 설치)
  - 🔴 **다운로드 폴더 복사 미완** — 자동 모드 권한이 막음. Irene 이 `! cp …app-release.apk /var/www/dev-frontend-build/desktop/PurplePOS-0.3.0.apk && cp … /var/www/dev-frontend-build/desktop/PurplePOS.apk` (root 소유면 sudo). 이게 돼야 /배포 7a 단계가 운영에 올린다
  - 검증: health terminal **6/6**(신규 1) · 고장주입 서버 2(사전차단 제거→재시도 201 ✗ · 수동 link 제거→transaction_id null ✗, cp 원복 cmp 동일) + 화면 1(e2e I 를 **수정 전 번들**로 실행 → «거절 뒤 Confirm 비활성» 실패 = R1 재현) · e2e card-terminal **9/9 ×3** · 빌드 1회(PlanQ tsc 메모리 게이트로 1회 막혀 대기 후 재빌드)
  - verify-all --full **24/24 통과**(mount sweep 695초 크래시 0, 번들 5.72)
  - 배포 기록: `dev-backend/releases/2026-10-02-terminal-guards-app030.json`

### 완료된 작업 (2026-10-02) [Claude Code]
- **운영 배포**(SW 5.71 · 백업 `20261002_042847` · 스모크 10/10 · verify-all --full 24/24) — Owner·Foodcourt 보고서 크래시 수정 반영 · 운영 실측: terminal_transactions 생성 0행 · 단말기 켠 매장 0 · `/api/terminal/config` 익명 401. 마커는 auto-save 커밋(문서 2개)으로 죽은 채 배포 — Fable: «실질 통과·절차 위반, 되돌릴 사유 아님»
- `.claude/.fable-gate-skip` 삭제(Irene 「삭제하라고 해」) — 이제 Stop 훅이 실제로 막는다
- GHL 2차 묶음 dev(위)

### 다음 확정 작업
1. ~~verify-all --full~~ 완료 24/24 (2026-10-02 05:2x)
2. Irene 이 0.3.0 APK 를 `dev-frontend-build/desktop/` 에 복사 → sha256 3개 일치 확인
3. **Fable 게이트 1회**(예정된 그것: R1~R5 + 앱 0.3.0) → 마커. ⚠ 마커 뒤 저장소 파일 수정·커밋 금지(session-state.md 만 예외)
4. Irene `/배포` → 운영 sw 5.72 · `purplehere.com/desktop/PurplePOS.apk` 가 0.3.0 인지 sha 확인 · 운영 결제창 «Card» 그대로(Fable 조건 ③, 미확인) · Owner/FG 보고서 운영 화면 1회(미확인)
5. **운영 데모 매장 실단말기 테스트**(Irene 「테스트 데모 계정에서」) — 운영 데모 매장 id 확인(기록상 13) → 태블릿 정식 앱 덮어 설치 → 설정 › 결제 › Card › 카드 단말기 연동 켜기 → 단말기 찾기 → RM 1.00 카드 1건 + TnG QR 1건 → 원장·terminal_transactions·보고서 확인 → **단말기 메뉴에서 Void**(진짜 돈, POS 취소 없음). 기록 4항목: Echo 응답 hex · 프로파일 · QR 수용 여부(D-5) · 찾기 동작. 안내 아티팩트 https://claude.ai/artifact/ALL7b8nE7jZr4vgAuS3LeK 는 개발용 앱 기준이라 정식 앱·운영 데모로 갱신 필요
6. 10-02 배포분 버전 번호(v3.108?) · 릴리즈 공지 — 다음 배포와 합칠지 Irene 확인(CHANGELOG 에 «버전 번호 확정 대기» 섹션으로 둠)

### 👉 Irene 님 결정 대기 / 할 일
- 0.3.0 APK 복사(위 2)
- GHL 에 질문서 6개 발송(설계 문서 §5-4 영문 문안) — 샌드박스 TID/MID · 전송 형식 · DuitNow Product ID 등
- 매장10 PO 12·26·52 중 1건 대조 «이 총액으로 확정» → 현금관리 차액 줄 실사용 확인(v3.106)
- K-DINE 재료·메뉴 구조 컨펌 4건 + E — `.claude/fable-verdict-20260929-structure.md` §4·§5
- 매장 재업로드 필요(파일 복구 불가): 매장8 «Fried Chicken (6 pcs)» · 매장10 9건
- 브랜드2 브랜드 메뉴 이미지 미조치 13건(254·272·273·274·279·280·281·283·290·321·329·333·346)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.
- GHL 2단계: DuitNow 단말기 화면 QR(Product ID) · Void · Settlement · 마감 카드금액 자동입력 · 단말기에서 한 취소의 POS 역반영
- 실단말기가 금액만으로 QR 을 안 받으면 «QR (단말기)» 버튼 + D003=CD (웹·서버만, 앱 재빌드 불필요 — Fable)
- Windows 데스크탑 설치본(단말기 브릿지) 미빌드
- 개발용 APK `dev-frontend-build/dev-apps/PurplePOS-dev-ecr.apk` — 경로 폐기됨, 정리 여부
- e2e card-terminal 이 dev terminal_transactions 행을 정리하지 않음(데모 38, 무해)
- 빌드 안 타입 검사기(fork-ts-checker) OOM 은 기존 현상 — 타입은 verify-all 기준선 게이트가 봄
- 타입 기준선 낮추기 · Fable 비차단(v3.106) 3건 · 가입 판매자 발주 결제 뒤 금액 정정 등(이전 메모)

### 주요 변경사항
- 운영 쓰기: 배포 1회(마이그 terminal_transactions 생성) 외 없음 · 운영 읽기 1회(표·켠 매장 수)
- dev DB: 테스트 잔재 0(health·e2e 정리)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
