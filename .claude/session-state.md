---
## 현재 작업 상태
**마지막 업데이트:** 2026-10-01 (/개발완료 — GHL 카드단말기 1단계 dev 완료 · 보고서 크래시 수정, 미배포)
**버전:** 운영 **v3.107** · SW 운영 **5.69-seller-unlinked-service-20261001** · 개발 **5.71-card-terminal-tender-20261001**
**작업 상태:** 🟡 미배포 — 내일 Irene 확인 후 배포

### 진행 중인 작업
- 🟡 **[Claude Code] GHL 카드단말기 ECR 자동연동 1단계 + Owner·Foodcourt 보고서 크래시 — dev 완료 · 미배포 (SW 5.71)**
  - Fable 설계 `.claude/fable-design-20261001-ghl-ecr.md`(1회차 + 끝 절 «추가 판정 — 결제수단 선택») · 기준 문서 `docs/CARD_TERMINAL_ECR_DESIGN.md` · 메모리 reference_card_terminal_ghl_ecr
  - UI 안내(실화면 9장): https://claude.ai/artifact/ALL7b8nE7jZr4vgAuS3LeK
  - 설정 위치: 설정 › 결제 › Card › «Card terminal integration»(기본 꺼짐) → «Find terminal»
  - 구현: utils/ghlEcr(코덱·분류) · services/terminalPayments(상태기계) · /api/terminal · 표 terminal_transactions(+tender_method·ewallet_type, 마이그 deploy 등록) · PaymentModal «Card / QR (Terminal)» + TerminalPanel · 자동 찾기(Windows desktop-pos/src/ecr · Android NativeEcrPlugin.kt) · 설정 CardTerminalSettings · OrderContext 주문 생성 직후 link
  - 🔴 운영 결함 수정(미배포): Owner·Foodcourt 보고서 isRevenueOrder/isDeletedOrder import 누락(f44885685, 09-17~) → 기간에 주문 있으면 화면 멈춤. **운영에 아직 결함 있음**
  - 검증: jest 28/28 · health terminal 5/5 · 고장주입 7 · desktop 14/14 · e2e card-terminal 8/8×3 · Kotlin 컴파일·debug APK · verify-all --full 24/24 · print-guard 8/8
  - Fable 게이트(2회차) 요청함 — 판정 파일 `.claude/fable-verdict-20261001-ghl-ecr-gate.md`(작성됐으면). 기록 커밋으로 마커 지문이 바뀌므로 배포 전 `fable-gate.js status` 재확인, 실단말기 수정 생기면 재판정
  - 확인 불가: 실단말기(전송·응답 형식, 금액만 Sale 로 QR 수용 여부) · Android 실기기 · Windows 설치본 미빌드(0.1.10)

### 완료된 작업 (2026-10-01) [Claude Code]
- **v3.106 운영 배포** — 결제 뒤 발주 금액 정정(Fable 게이트 PASS `.claude/fable-verdict-20261001-paid-po.md`). Fable 비차단 후속 3건 아래 후속 후보
- **v3.107 운영 배포**(백업 20261001_192853) — A안: 판매자 품목 수정에 미연결 배포 상품 · 서비스 줄 수령 재고 무접촉(Fable 설계 `.claude/fable-design-20261001-a-plan.md`)
- GHL 1단계 dev 완료(위) · 보고서 크래시 수정(위)
- 개발용 안드로이드 APK(패키지 .dev, 정식 앱과 별도): https://dev.purplehere.com/dev-apps/PurplePOS-dev-ecr.apk (운영 동기화 경로 밖)
- health-check 단말기 테스트 정리 구멍(order_actions FK) 보강 · dev 잔재 주문 4건 삭제

### 다음 확정 작업
1. **Irene 2026-10-02 확인** (Irene 「관리페이지 UI/UX 도 내일 확인할게」「테스트 내일 할게」)
   - 안드로이드 태블릿 실단말기 테스트: 단말기와 같은 와이파이 → 개발용 APK 설치 → 개발서버 로그인 → 설정 «Find terminal» → POS RM1 카드 → RM1 TnG QR → 리포트에 카드1·이월렛1 반영 → 단말기·POS 둘 다 취소
   - 관리페이지(설정) UI/UX 확인 — 안내 아티팩트 참고
2. 테스트 결과 반영 — 응답 형식 다르면 브릿지 transport 수정 / 금액만 Sale 로 QR 안 받으면 «QR (단말기)» 버튼 + D003=CD(코덱 인자 준비됨, Fable 재호출 없이 팀원)
3. Fable 게이트 확인/재판정 → `/배포`(보고서 크래시 수정 포함). 배포 후 데스크탑앱·안드로이드 정식 설치본(버전 올림) 검토

### 👉 Irene 님 결정 대기 / 할 일
- GHL 에 질문서 6개 발송(설계 문서 §5-4 영문 문안) — 샌드박스 TID/MID · 전송 형식 · DuitNow Product ID 등
- 매장10 PO 12·26·52 중 1건 대조 «이 총액으로 확정» → 현금관리 차액 줄 실사용 확인(v3.106)
- K-DINE 재료·메뉴 구조 컨펌 4건 + E — `.claude/fable-verdict-20260929-structure.md` §4·§5
- 매장 재업로드 필요(파일 복구 불가): 매장8 «Fried Chicken (6 pcs)» · 매장10 9건
- 브랜드2 브랜드 메뉴 이미지 미조치 13건(254·272·273·274·279·280·281·283·290·321·329·333·346)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.
- GHL 2단계: DuitNow 단말기 화면 QR(Product ID) · Void · Settlement · 마감 카드금액 자동입력 · 단말기에서 한 취소의 POS 역반영
- 결제 창: 단말기 결과 미확인 상태에서 하단 «Confirm Payment» 도 재시도로 동작 — 패널 버튼만 남길지 검토
- e2e card-terminal 이 dev terminal_transactions 행을 정리하지 않음(데모 38, 무해)
- 타입 기준선: 보고서 import 수정으로 실제 오류 수 감소 — 기준선 낮추기 검토
- Fable 비차단(v3.106): 대조 결과 paid_adjustment 표시 · reversePayment 재결제 가장자리 · reimbursePersonalPayment total_amount
- 가입 판매자 발주 결제 뒤 금액 정정 · deleteOldImages 다른 라우트 점검 · 판매자 «완료» 청구서 즉시 미발행 등(이전 메모)

### 주요 변경사항
- 운영 쓰기: 없음(이번 GHL 작업) · v3.106/v3.107 배포·공지
- dev DB: terminal_transactions 표 생성(+2칸) · 데모 38 설정 원복 확인 · 테스트 잔재 0

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
