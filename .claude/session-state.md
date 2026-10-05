## 현재 작업 상태
**마지막 업데이트:** 2026-10-05 09:4x UTC (/저장 — 오늘 운영 배포 3회, 마지막 #3)
**버전:** 운영 SW **5.85-terminal-busy-wait-20261005** · 안드로이드 앱 0.3.4 · 버전 번호 v3.10x 미확정
**작업 상태:** ✅ 배포 완료 · 다음 섹션 대기

### 진행 중인 작업
- 없음 (Irene 2026-10-05 「배포하고 저장하고 개발완료해. 나머지는 다음 섹션에 해줘.」)

### 완료된 작업 (2026-10-05) [Claude Code]
- **#1 SW 5.83 오너 대리 발주** (백업 20261005_052507 · Fable PASS · 커밋 760c8c886) — 오너가 소유 매장을 골라 그 매장 자격으로 발주·제출·취소, 오너 제출=승인 생략. buyerScope OWNER_ACTING_ROUTES · applySubmitGate actor · 화면 매장 선택 먼저
- **#2 SW 5.84** (백업 20261005_072313 · 마이그 2 · Fable PASS 조건 4 · 커밋 fea0a4e92) — 역할 추가 요청(Staff 포함, user_context_requests·user_contexts.permissions) · 발주 최소주문 강제(MOQ 1=미설정) · 판매 상품 연결 환산에 팩 용량 · 판매 상품 등록 화면 설명·미리보기·재고단위 칸 제거 · 단말기 거절 뒤 Confirm 잠김·BUSY 제목
- **#3 SW 5.85** (백업 20261005_093553 · 스모크 10/10 · Fable PASS 재도장 2회 `.claude/fable-verdict-20261005-terminal-busy-gate.md`) — 단말기 BUSY 자동 대기(3초 간격 최대 60초, «단말기에서 DONE 을 눌러 대기 화면으로 → 자동 시작», Stop waiting) · 판매자 받은 주문 «배송 준비 목록 (가격 없음)» WhatsApp 버튼. 운영 확인: sw 5.85 · ko 문구 2종 서빙 · online
- 카드 단말기 GHL UAT: 10-05 운영 첫 승인(VISA 346631·254719, GrabPay QR 1건 → 이월렛 grabpay 기록). 10-04 B0 = 일요일(UAT 근무시간 외). 승인 직후 다음 결제 BUSY = 단말기 DONE 대기 화면 → 5.85 로 대응
- 운영 데이터 직접 수정 2건(Irene 긴급 지시): ① brands#2(K-DINE).payment_settings ← brands#1 값(비어 있을 때만, 되돌리기 = #2 칸 NULL) ② SOA-BRD2-R8-M20260929173419(#188) 하위 청구서 10건 payment_submitted→paid(paid_at·confirmed_at = SOA paid_at, confirmed_by 23). 연결 발주 10건은 이미 paid

### 다음 확정 작업 (Irene 2026-10-05 「나머지는 다음 섹션에」 + 10-04 다음 섹션 잔여)
1. **영수증 드래그·PDF** — 구현 완료·미빌드, 저장소 밖 보관 `/home/irene/wip-receipt-upload-20261005/`(receipt.patch + new/ 4파일). 되살리기: `cd /var/www && git apply /home/irene/wip-receipt-upload-20261005/receipt.patch && cp -r /home/irene/wip-receipt-upload-20261005/new/* .` → 빌드·verify --full·Fable 게이트. 팀원 검증 기록: health 296/296 · 서버/화면 고장주입 · SVG 거절 · 서버가 /uploads/receipts 파일 저장
2. **발행자 청구서 «To Confirm» 탭 + 업무 버튼 색 규칙** — Irene 「컨펌해야 할 탭이 따로 있어야 하지 않을까? … 컨펌 버튼도 녹색으로」 「업무패턴에 맞게 버튼색 못 맞춰?」 → 지금 처리할 돈 업무(Pay·Confirm)=초록 · 위험=빨강 · 보기=테두리. 브랜드·푸드코트·시스템관리자 청구서 화면
3. **SOA 확인 경로 재발 방지** — 브랜드 «Confirm Payment Received» 가 PATCH /api/invoices/:id/status(SOA 한 건만)를 씀 → confirm-payment 경로 또는 같은 하위 반영 함수로. ⚠ 착수 때 자동 권한 검사가 막음 — Irene 허용 필요
4. **결제 설정 = 계정(회사) 하나** — 설정 화면이 첫 브랜드 칸에만 저장 → 같은 주인의 모든 브랜드가 그 값을 쓰게(돈 경로 — Fable 1회). 임시조치 ① 은 계좌 변경을 안 따라감
5. **판매자 배송 지역별 설정** — Irene 「배송은 지역별로 달라야 하는데 왜 지역표시가 그냥 텍스트야? 나중에 레스토랑처럼 추가해서 세팅」. 설계부터
6. (10-04 다음 섹션 잔여) 외부 공급업체 월별 SOA 대조 · 발주 스탭밀 구분 · 승인 메일 문구(외부 공급업체에 «보냈습니다» 거짓)

### 👉 Irene 님 확인 대기
- 단말기(5.85): 카드 1건 승인 → 바로 다음 결제 → 안내 문구 → 단말기 DONE → 금액 자동 표시되는지 (60초 안에 안 풀리면 Fable 재판정)
- 판매자 받은 주문 상세 «배송 준비 목록 (가격 없음)» 1회
- 5.84 확인 3건 중 남은 것: 역할 추가 요청 실제 1건 제출(10-05 운영 기록 0건이었음) · 단말기 거절 뒤 Confirm 잠김
- 상품 16(K-Yukgaejang Beef 1kg)이 45g/pack·made_to_order 로 수정돼 있음 — 매장 8 연결(kg, 환산 1)과 어긋남. 16 을 1kg 값으로 되돌리고 45g 은 신규 등록 권고(안내 완료, 처리 여부 미확인)
- GHL: UAT 근무시간 확인 질문 · 직불(D007)·DuitNow QR 방식은 결제가 안정된 뒤 질문

### 후속 후보 (아이디어 메모, 확정 X)
> /개발시작 자동 추천 대상 아님. 다음 사이클 결정은 Irene 지시 기준.
- Fable 조건(5.84): jest context-requests ⑨ 와 user-contexts-switch 가 rid 18 공유 — 분리 전까지 --runInBand · R-SC-007 같은 단위·기준양≠1·환산 1 기존 연결 탐지 보강
- BUSY 외 다른 HTTP 4xx 도 같은 «앞 결제 화면» 문구로 60초 대기(실측 4xx 는 400 BUSY 만)
- 재시도마다 declined H400 단말기 거래 행이 남음(결제 아님)
- DB 에 이미 들어간 base64 결제 영수증 소급 정리
- po-qty-step e2e 는 TOKEN_FILE 환경변수 필요(단독 실행 불가)
- 버전 번호(v3.10x)·릴리즈 공지: 10-02 이후 배포분 미확정
- Windows 데스크탑 설치본(단말기 브릿지) 재빌드 · Kate 브랜드 관리자 부여 → K-DINE 데이터 정리 · /docs SEO nginx

### 주요 변경사항
- Git: HEAD fea0a4e92(5.84). 5.85 변경분은 /개발완료 커밋 예정. 영수증 작업은 저장소 밖 보관(작업트리 미포함)
- 운영 데이터 직접 수정 2건(위 완료 작업 참조)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
