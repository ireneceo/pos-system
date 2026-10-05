## 현재 작업 상태
**마지막 업데이트:** 2026-10-04 18:5x UTC (/개발완료 — 오늘 운영 배포 11회, 마지막 #11)
**버전:** 운영 SW **5.83-owner-po-on-behalf-20261005** · 안드로이드 앱 **0.3.4** · 버전 번호 v3.10x 미확정
**작업 상태:** ✅ 2026-10-05 #1 배포(SW 5.83 오너 대리 발주) · 다음 섹션 남은 4건

### 오늘 마지막 배포들 (요약)
- #9 SW 5.80: 단일 화면 고객화면 자동열림 안 함 · 고객화면 대시보드 버튼 · 세션복원 기기언어 유지 · POS 문구 90곳 번역
- #10 SW 5.81: 주문 취소 = 단말기 Void(A2) · B0/CA/HTTP BUSY 분류 · 직원 발주 inventory 권한 · 오너 모자 사이드바(Owner Enterprise)
- #11 SW 5.82: 오너 승인 화면(상세·PDF·WA·Email, 공급업체별 문구) · 오너 발주 취소 · 월결제 발주 단위 결제 400 PAY_VIA_SOA · 내역 Invoice 버튼(없는 라우트 → Invoices 상세) · 청구 총액 확정 금액 표시 · 발주 화면 번역 89키 · 설정 Operations 카드 정렬
- 카드 단말기: POS↔단말기 왕복 정상(Echo·C7·B0 실측). 단말기 자체 결제도 B0 → GHL 활성화 회신 대기(Irene 이 짧은 질문 발송)

### 📌 다음 섹션 (Irene 2026-10-04 지정 — 「이건 다음 섹션에 체크하고 구현할게. 위에 다른 기능도 다음 섹션에 넣어」)
1. ✅ (2026-10-05 운영 배포) **오너 대리 발주** — Irene «응». Fable 판정 `.claude/fable-verdict-20261004-owner-po-on-behalf.md` ①(9-24 §2-A 한 조항 변경: 오너가 소유 매장 골라 그 매장 자격으로 발주·제출, 그 매장 내역, 오너 제출=승인 생략 · buyerScope 작성 흐름 라우트 개방 · applySubmitGate 오너 분기 · OwnerToPoHistory 삭제 · 매장 선택 선행 · MainLayout 무접촉 · 증명 §3) — 다음 섹션 착수(Irene 이 이번 묶음에 넣으라면 바로).
2. **선택 화면 «역할 추가 요청»**(직원 역할 포함, 승인 → 카드) — `.claude/next-context-request.md` · 보존 패치 `.claude/next-context-request-grantContext.patch` · Fable 재설계 필요(Staff 승인 주체).
3. **외부 공급업체 월별 SOA** — Irene 원문: 「외부공급업체 중에 1달 기준으로 SOA 보내는 곳이 있어. 이것도 정리한 후 SOA 결제 인보이스 뜨게 하고 최종 받은 SOA랑 대조해서 결제정리할 수 있게 해줄 수 있어?」 → 설계부터(Fable). 참고 메모리: 인보이스·SOA 통합(feedback_invoice_soa_unified) · 정산서엔 확정 주문 전부(feedback_soa_includes_all_confirmed_orders) · 발주↔인보이스 원가 대조(project_po_invoice_cost_variance) · 발주 «개인금액»(reference_po_personal_money).

4. **발주 품목 «스탭밀» 구분 + 재고 분리** — Irene 원문: 「발주할 때 스탭밀인 것도 항목에 표시할 수 있어? 스탭주문인지 실 비용인지 모르는데. 스탭밀은 재고관리도 따로 해야 하잖아. 안그래? 이거 재고아이템도 스탭밀을 따로 연결해야 할까? 이것도 제대로 fable 설계를 다음 섹션에 받아.」 → Fable 설계부터(원가·재고 구조 = TRADE_STRUCTURE 대조 필수, «같은 개념에 새 목록 금지» 규칙).
5. **승인 메일 문구** — 오너 승인 시 fireBuyerConfirmNotification «Your purchase order has been sent to {{seller}}» 가 외부 공급업체엔 사실과 다름(Fable 이월). 오너 PO Approvals 실화면 클릭(운영 help@ 오너 모자) Irene 확인 대기.

### (지난 기록) 단말기 연결 재개 지점 — 해결됨: 0.3.4 로 13:58 Echo 승인, 이후 B0 = 단말기↔은행(GHL 활성화 대기)
- Irene 할 일: 태블릿 앱 «새 버전 0.3.4» 업데이트 → 설정 › 결제 › Card › **연결 테스트 1번**
- 팀원 할 일: 운영 읽기 — `terminal_transactions` id>22 의 status·status_message·**response_hex(실패 행 = 단말기가 보낸 원본)** · activity_logs «Card terminal discovery» 의 probed[].raw → 단말기 응답 형식 확정 → 맞춤 수정(형식이 갈리면 Fable 1회)
- 실측 경과(매장 13, .112:33898 http-hex): ~11:12 CONNECT_REFUSED(찾기 253대 응답 0) → **11:40부터 연결 수락·응답 있음, BAD_RESPONSE**(앱이 원본을 버려 형식 미상) → #8 에서 원본 기록 + HTTP chunked/Content-Length 해석 추가
- 단말기 = **PayHere Direct** 앱(+ADAPTIS·Launcher). Direct: Notify C2 선행(#7 대비 완료) · E3/E6/C01A 는 ECR 전용 · 직불 D007 Account Type 필요 가능 → 첫 테스트는 신용카드·QR
- GHL 자료 전수 확인 완료(scratchpad 6473b77f…/ghl): Postman 프레임 CRC 551A 우리 코덱과 일치 · 단말기 ECR 켜는 법은 자료에 없음
- 오늘 배포: #7 SW 5.78+APK 0.3.3(Notify 건너뜀·probe Echo 행 0·프로필 칸·앱 새로고침, Fable PASS `.claude/fable-verdict-20261004-terminal-direct-gate.md`, 백업 20261004_120751) · #8 SW 5.79+APK 0.3.4(원본 기록·HTTP 해석, 민감 비대상, 백업 20261004_125600)
- 남은 것: Windows 데스크탑 앱 설치본 재빌드(되돌림 검사·Notify 건너뜀 소스 반영됨) · Kate 브랜드 관리자 부여 → K-DINE 데이터 정리 밤 1회 · /docs SEO nginx 보류

### 진행 중인 작업
- ✅ **[Claude Code] 오너 대리 발주(다음 섹션 1번) — 운영 배포 2026-10-05 05:31 UTC** (SW 5.83 · 백업 `20261005_052507` · 마이그 105/105 · 스모크 10/10 · Fable 게이트 PASS 조건 없음 `.claude/fable-verdict-20261005-owner-po-on-behalf-gate.md`)
  - 운영 확인: sw 5.83 · 익명 POST 401 · buyerScope OWNER_ACTING_ROUTES·Submitted by Owner 반영 · production-backend online
  - 1차 배포 시도는 PlanQ tsc 메모리 게이트로 빌드 전 중단(운영 무변경, 백업 20261005_052017만 생성) → 재시도 성공
  - 문서 3곳(§2-4) 갱신 완료
  - ⏳ Irene 눈 확인 1회: help@ 오너 모자 → Purchase Order → 매장 고르기 → 담기 → Create POs → 대기 화면 제출 → 그 매장 Order History
- ⏳ **카드 단말기 GHL WAG(2026-10-05 Irene 전달)**: «Payhere Direct spec shared · UAT terminal deployed · TCP connection program · 검수 = Visa/Master credit/debit + DuitNow QR»
  - 실측: 보유 규격 V2.9.26 이 Direct 포함 · 우리 transport http-hex/tcp-hex/tcp-bin 서버·안드로이드 0.3.4 모두 지원(설정만 바꾸면 됨)
  - 갭: ① Direct 직불 D007 Account Type 필수인데 미전송 ② C01A Product ID 는 ECR 전용 → Direct DuitNow 방법 미상(D003 'CD' 대비만 있음)
  - GHL 질문 5개(UAT 여부·B0, TCP 형식·포트, D007 주체, DuitNow D003=CD 여부, 최신 규격·검수 목록) → 답 후 Fable 설계 1회
- ⏳ **[Claude Code] Docs(안내 페이지) + 사이드바 정리 + 랜딩 Download — 접수 2026-10-04, 구조 묶음 뒤 같은 빌드로**
  - Irene 원문: 「Docs에 필요한 안내 내용들 이렇게 안내페이지들 넣는 거 구성해야 하는데. 좌측 메뉴에 Contact Support랑 버튼 합쳐서 표시 안될까? 그리고 Install App은 없애자. 우측 하단에 배너들 나오니까 없어도 될 것 같고. 랜딩페이지에 다운로드 메뉴를 추가해. 내가 말한 Docs 페이지들은 샘플 이거 말하는 거야. https://claude.ai/artifact/ALL7b8nE7jZr4vgAuS3LeK」
  - ⚠ 사이드바 = 🔒 MainLayout.tsx(인쇄 보호파일) — 푸터 버튼 줄만, Irene 명시 요청 → print-guard --bless 대상
- ⏳ **[Claude Code] 단말기 설정 화면 — 주소 입력칸 → 표시 전용 + «다시 찾기» + 같은 와이파이 확인 표시 + 포트·연결방식 «고급» 접기** (같은 빌드)
  - Irene 원문: 「이거 내가 직접 넣어야 해? 터미널 IP가 와이파이가 바뀌면 바뀌는데 이걸 지금 잡은 와이파이로 잡을 수 없어? ... 같은 와이파이인지 확인하고 자동체크나 자동입력 필요해. 이게 어떻게 운영하면서 계속 바꿔?」
  - 실측: 동작은 이미 자동(terminalSale.ts roundTrip 연결 실패 → findTerminal → 저장·재전송). 화면이 입력칸이라 수동처럼 보임
- 🟡 **[Claude Code] K-DINE 재료·메뉴·공급업체 구조 코드 묶음 — 착수 2026-10-04**
  - 근거: Fable 판정 `.claude/fable-verdict-20260929-structure.md` §6. Irene 2026-10-04 원문 「권고대로 해」 → D1′=A(브랜드 원본 잠금) · D1″=다중 관리자 같이 · D3′=GIT 연결 자동·공용 · D2′=#6(Stock Item 315) 정본 #57 로 합침 / beef 둘(#51↔#75)은 표 보고 Irene 확인
  - 순서: §6-3 사실 확인(운영 읽기) → 4~12 코드 → build 1회 → verify-all --full 1회 → Fable 게이트 1회 → /배포 → 데이터 1회(표 승인·밤)
  - ✅ 2026-10-04 06:1x UTC **운영 배포 완료**(백업 `20261004_060510` · 마이그 2건 적용 · 105/105 · 스모크 10/10) · Fable 게이트 PASS 조건부(`.claude/fable-verdict-20261004-structure-gate.md`, 마커 93581328bab3) · 배포 후 확인: /docs·/download·docs API 200 · sw 5.73 · buyer_restaurant_id 칸 · ENUM docs · 브랜드2 소유자(help@, user 23) 브랜드 메뉴 200(104건)
  - ✅ 2026-10-04 #3 운영 배포 SW 5.74(백업 `20261004_073021` · 스모크 10/10 · Fable (0-a) 게이트 PASS `.claude/fable-verdict-20261004-0a-gate.md`) — 브랜드 관리자 사이드바 표시 키 · 단말기 설정 브릿지 재확인 · help@ 브랜드 메뉴 200 회귀 확인
  - ✅ 2026-10-04 #4 운영 배포 SW 5.75 + 안드로이드 앱 0.3.1(백업 `20261004_082627` · 스모크 10/10 · Fable 게이트 PASS `.claude/fable-verdict-20261004-android-update-gate.md`) — 앱 업데이트 안내 카드·설정 줄 · NativeUpdatePlugin · 피드 /desktop/android-latest.json(sha 290d12ff…) · 운영 확인: 피드 200 json · APK·별칭 sha 일치 · http→https 301
  - ⏳ Irene 태블릿 1회: 0.2.0 → 카드 → Chrome → 설치 → «앱 버전 0.3.1 · 최신 0.3.1 ✓» → 단말기 자동 찾기 · A 경로 첫 실측은 0.3.2 게이트 필수 조건
  - ✅ 2026-10-04 #6 운영 배포 SW 5.77 + APK 0.3.2(Fable PASS `.claude/fable-verdict-20261004-terminal-discovery-gate.md`) — 자동 찾기 되돌림 거부(앱·서버 422 FRAME_REFLECTED)·대기 1.5초·검색 기록(/api/terminal/discovery-report → activity_logs)·주소칸 키보드·앱 아이콘. 대기: Irene 태블릿 0.3.2 앱 안 설치(A 경로 첫 실측) → 자동 찾기 → 활동 기록으로 .112 미발견 원인 확정. 다음 묶음(보관 scratchpad/MainLayout.profile-fix.tsx): 프로필 여백 + 앱 새로고침 메뉴
  - ✅ 2026-10-04 #5 운영 배포 SW 5.76(Fable PASS `.claude/fable-verdict-20261004-late-bridge-gate.md`) — 앱 배지·업데이트 카드 늦은 브릿지 재확인 · 도움말 › 앱 다운로드(기기별) · 앱 안 Guides. 대기: Irene 태블릿 app v 숫자·카드 → 0.3.1 설치 → 토글 ON → 자동 찾기 (5.76 뒤에도 배지 안 뜨면 상한 제거가 다음 수정)
  - 🔴 2026-10-04 09:1x Irene 「여전히 아이피 안잡아. 업데이트도 안돼. 뭘 하는 거야? 그리고 앱에서 버전 안보여. 안드로이드앱이야. 좌측 도움말 하위메뉴에 다운로드도 다시 넣어줘. 기종에 맞게 다운되게」
    · 실측: 운영·dev 단말기 기록 0(태블릿 신호 없음) · 0.2.0/0.3.0/0.3.1 서명 동일(b55813cf) · 앱 배지·업데이트 카드도 브릿지 늦은 주입 결함(App 재렌더 없음) 추정
    · 대기: Irene 안드로이드 설정 › 앱 › PurplePOS 버전 숫자 / Chrome 설치 실패 문구
    · 준비: useNativeAppUpdate inApp 10초 재확인(dev 수정 완료·미빌드) · 배지 재확인 · 도움말 하위 «다운로드»(기기별, 🔒MainLayout 푸터)
  - ⏳ 다음: Kate(kate.kim.snkn@gmail.com) 부여(SA 화면, Fable 표적 판정 `.claude/fable-verdict-20261004-brand-manager-targets.md`) → 데이터 정리 밤 1회 · 안드로이드 앱 업데이트 안내(Irene 「바꿔. 업데이트 뜨게 해.」) Fable 설계 중
  - (이전) ⏳ Irene 결정 대기: 브랜드 관리자 부여 — Irene 「kate, k-din은 내 관련 아니야」 → A(help@ 만, 부여 0) / B(지정 이메일) 질문 중 · 데이터 정리 1회(밤·표 승인) 대기 · ⚠ 매장 My Cost 0.0279 는 데이터 ⑦ 전까지 틀리게 보임(예정)
  - (이전 기록) 코드·빌드(SW 5.73-brand-structure-docs-20261004)·검증 완료 → **Fable 게이트 제출**. 같은 묶음: Docs(/docs·/download·관리 Docs 탭)·사이드바 Help(Install App 제거, 🔒MainLayout 푸터만, print-guard bless)·단말기 설정 표시전용·브랜드 관리자 모자(Fable 지시서 .claude/fable-instruction-20261004-brand-manager.md)
  - 검증: verify-all --full 24/24 · jest user-contexts 38/38 · jest 원가E 3/3 · health auth 13/13·pos 53/53 · 공급처 실호출 16/16 · e2e brand-manager-hat 3회×2폭 통과 · 고장주입 5종(형제필터·원가E·FI-13·033·FI-10~12) · 운영 읽기 031=28·032=77
  - 지시서와 다른 것(게이트 보고): ⑧-6 매장 38 은 브랜드 17 소속이라 BM 에게 200(테스트를 사실대로 수정) · 033 운영 0(315/319 는 이름이 달라 기계 미검출) · 원가 오버레이 매장 10 매장소유 행에 bq≠1 혼재(읽히지 않는 옛 행)
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
2. ~~APK 복사~~ 완료 2026-10-04 [Claude Code] — sha256 3개 f912f96a… 일치
3. ~~Fable 게이트~~ **PASS 2026-10-04** 마커 지문 0766dbfe04df · 판정문 `.claude/fable-verdict-20261004-ghl-gate3.md`(배포·실단말기 조건 포함). ⚠ 마커 뒤 저장소 파일 수정·커밋 금지(session-state.md 만 예외) — 판정문 커밋은 배포 후
4. ~~/배포~~ 완료 2026-10-04 03:26 UTC [Claude Code] — 운영 sw 5.72 · APK sha f912f96a… 일치 · 데모13 `/api/terminal/config` enabled:false · 마이그 103/103. **남은 눈 확인: 운영 결제창 «Card» 그대로(Irene)** · (원문) Irene `/배포` → 운영 sw 5.72 · `purplehere.com/desktop/PurplePOS.apk` 가 0.3.0 인지 sha 확인 · 운영 결제창 «Card» 그대로(Fable 조건 ③, 미확인) · Owner/FG 보고서 운영 화면 1회(미확인)
5. **운영 데모 매장 실단말기 테스트**(Irene 「테스트 데모 계정에서」) — 운영 데모 매장 id 확인(기록상 13) → 태블릿 정식 앱 덮어 설치 → 설정 › 결제 › Card › 카드 단말기 연동 켜기 → 단말기 찾기 → RM 1.00 카드 1건 + TnG QR 1건 → 원장·terminal_transactions·보고서 확인 → **단말기 메뉴에서 Void**(진짜 돈, POS 취소 없음). 기록 4항목: Echo 응답 hex · 프로파일 · QR 수용 여부(D-5) · 찾기 동작. 안내 아티팩트 https://claude.ai/artifact/ALL7b8nE7jZr4vgAuS3LeK 정식 앱·운영 데모 기준으로 갱신 완료(10-04, Fable 조건: Void 뒤 재결제 금지·테스트 후 연동 끄기)
6. 10-02 배포분 버전 번호(v3.108?) · 릴리즈 공지 — 다음 배포와 합칠지 Irene 확인(CHANGELOG 에 «버전 번호 확정 대기» 섹션으로 둠)

### 👉 Irene 님 결정 대기 / 할 일
- 🔴 K-DINE 구조 D1′·D1″·D3′·D2′ 답 — 10-04 Irene 「브랜드제너럴·브랜드메뉴·재료 연동 기준, 공급업체 각자 관리 다 했어?」 → 코드 0(미착수) 확인·권고표 재보고. 답 오면 판정문 §6 코드 묶음 착수
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
