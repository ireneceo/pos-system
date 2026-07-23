# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-07-23 (IOI Mall 매출보고 + 이월렛 서브타입 — dev 완료·미배포)
**버전:** **v3.69** (운영 — 2026-07-16 배포. 버전은 /배포 시에만 갱신) · 데스크탑앱 0.1.9 · 안드로이드앱 0.2.0
**작업 상태:** **완료(dev) — 배포 대기(Fable CONDITIONAL GO 조건).**

### 진행 중인 작업
- 없음 (이월렛/몰연동 dev 완료, 배포는 Irene /배포 + 아래 조건)

### 완료된 작업 (이번 세션 — 2026-07-23)
- **인쇄 백로그 신선도 경계**: 자동인쇄 안 켠 매장이 needs_print 무한누적(K-DINE 1,616건) → pending-print 24h 경계(orders-crud, 🔒보호파일). 운영 청소 2,035건. Fable CONDITIONAL GO. **미배포·미bless**(실프린터 확인 대기).
- **운영서버 earlyoom + sudoers 정리**: 메모리 보호막 설치(mysqld−800/nginx−500/sshd−1000)·위험 NOPASSWD 3종(chown/kill/lsof) 제거. Irene 실행 완료.
- **개발서버 sudoers 정리**: 서빙폴더 root→irene(sudo 근본제거)·NOPASSWD:ALL 드롭인 제거·평문비번 패턴 제거. Fable PASS. `sudo visudo -c` 최종확인만 Irene.
- **IOI Mall 매출보고 + 이월렛 서브타입** (아래 상세) — dev 완료.

### 다음 확정 작업
- 없음 — 지시 대기 (배포는 아래 조건 충족 + Irene /배포)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.
- **IOI Mall 배포·가동**: orders-crud 별건 승인+bless → 배포 → 운영 backfill·rid16 acceptedTypes 지정 → 몰 운영자격증명 수령 시 production 전환·enabled=true
- **IOI Mall 회신**(임대인): 인증 검증완료 + 샘플 + 운영 machine ID 요청
- 이월렛 후속(비차단): PaymentModal isOpen 리셋(주문간 잔존)·split 오프라인 op card_type/ewallet_type·모바일 이월렛 서브타입
- ENCRYPTION_KEY 강화(go-live 직전)·개발서버 sudoers Irene visudo -c·인쇄 자가진단 D8 실프린터·안드로이드 실기기 폴러·소켓 인증 하드닝·매출 대조 마감

---

## 🔵 IOI Mall 매출보고 + 이월렛 서브타입 (2026-07-23, dev 완료·미배포)

### IOI Mall 매출보고 (Tangent SalesHourly)
- **대상 = 운영 rid=16** (The Fire @ IOI Mall Damansara). rid=5는 is_test 테스트매장(오전 오인 정정). IOI=임대인(인증 묻는쪽)/The Fire=임차인.
- **인증 = 된다**: 몰 staging 자격증명(User/Machine `50100025`, PW `DCStest1234`)으로 우리 코드 토큰발급→0값24레코드+rid16 실매출 전송 전부 `status:success` 실증.
- **버그2건 수정**: ①tender가 SST 포함→gto 불일치 → SST 전 환산(분모 paySum, tender합=gto) ②HTTP 200 status:error를 성공기록 → fail-closed(status!=='success' throw).
- **운영 config 저장**: restaurant_sales_integrations id=1(rid16, staging, **enabled=false**=자동전송OFF, gst=Y). 시스템 경유 test-connection 성공.
- staging 자격증명은 비민감. 운영 실자격증명 저장 전 ENCRYPTION_KEY 강화(migrate-encryption-key-rotation, manual).
- 단일 진실 = `docs/MALL_SALES_API_INTEGRATION.md` · 메모리 [[reference_ioi_mall_sales_reporting]]

### 이월렛 서브타입 캡처 (몰 tng 구분)
- 전용컬럼 `ewallet_type`(카드 card_type 대칭). 설정 `payment_settings.ewallet.acceptedTypes[]` 다중선택: **0개=캡처안함(기존동작) / 1개=자동태깅(캐셔 선택불필요) / 2개↑=선택강제**.
- 몰 매핑: ewallet_type='tng'→몰 tng, 나머지(grabpay 등)→othersamount(몰에 필드없음).
- **전 POS 경로 배선**: POSTerminal·FloorPlan(온·오프)·LiveOrders(온·오프)·split — card_type 8경로 1:1. 백엔드 PATCH는 order.update(req.body) 통째저장이라 무변경.
- 🔴 **TDZ 크래시 수정**: auto-tag useEffect가 뒤 선언 acceptedEwallets 참조 → POS Terminal 런타임 크래시(빌드·TS 통과, 실브라우저서 발견) → 선언 이동.
- **grabpay 백필**(Irene 지시): 기존 이월렛 NULL→grabpay, dev 241건. 운영은 컬럼배포 후 migrate-backfill-ewallet-grabpay(manual) 1회.

### 검증 (/검증 완료)
- verify-all --full: 실브라우저 mount sweep 8역할+POS **크래시0(662.8s)** · state-hydration 0 · 인쇄 라우트가드 34/34 · health 139/140(유일실패=print-guard 지문 의도)
- 실 API 왕복 5/5 · 계약테스트 14/14 · 실UI 3시나리오(0/1/2개)
- **Fable 2차 재검증 CONDITIONAL GO**: 이월렛 절단면 A~E 결함0. check-sensitive-diff ★Fable 대상(①보호영역 ②결제무결성 ③DB마이그).

### 배포 전 필수 (Fable 조건, 순서)
1. **orders-crud 별건(pending-print 24h 신선도)에 Irene 명시 승인** — 이월렛 게이트가 대신 승인 불가(인쇄 절대규칙). 티켓 포맷·방식 무변경+계약테스트 박제라 종이 재확인 없이 회귀게이트 갈음 가능(최종 Irene 결정).
2. 승인 후 `check-print-guard.js --bless`(POSTerminalPage 결제 plumbing 4줄 + orders-crud) → /배포.
3. 운영: migrate-add-ewallet-type(deploy 자동) → 컬럼확인 후 backfill manual 1회 → rid16 acceptedTypes 지정.
- **이월렛 자체 실프린터 확인 불요**(billPrint/폴러 diff 0, 인쇄 무변경, 라우트가드 34/34).

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```

> 전체 완료 아카이브(과거 세션 상세)는 `DEVELOPMENT_PLAN.md`. 이 파일은 진행/다음/후속의 단일 소스.
