## 현재 작업 상태
**마지막 업데이트:** 2026-10-07 UTC — /개발완료 (결제 설정 = 계정 하나, 개발서버만 · 운영 최신 SW **5.89-kiosk-receipt-20261007** · 아래 버전 줄은 /배포 때만 갱신)
**버전:** **v3.109** (2026-10-07 · 5.87·5.88·5.89 묶음) · 운영 SW **5.89-kiosk-receipt-20261007** (백업 20261007_163801 · 스모크 10/10) · 안드로이드 앱 0.3.4
**작업 상태:** ✅ 판매자 결제 설정 = 계정 하나 완료(개발서버 · Fable 2회차 PASS · 운영 배포 대기) — 개발서버만 미배포: 이것 + 청구서 To Confirm 탭

### 완료 (2026-10-07 밤) — 판매자 결제 설정 = 계정(회사) 하나 [Claude Code · 백그라운드 작업방 17f1cc84]
- 지시: 작업기록 «다음 확정 작업» 5번 — 설정 화면이 첫 브랜드 칸에만 저장 → 같은 주인 모든 브랜드가 그 값
- **Fable 1회차 설계** `.claude/fable-verdict-20261007-payment-settings-account.md` — (a) 쓰기 펼치기: 저장 1곳만 바꾸고 읽는 곳 10곳+(청구서·Stripe·PayPal·PDF 은행)은 0줄. 묶는 칸 = 이 화면이 저장하는 6칸(payment_settings·invoice_settings·supported_currencies·배송 3칸), currency·회사정보 제외
- 구현: `utils/brandAccountSettings.js`(신규 · 칸 목록·펼치기·형제 복사·어긋남 탐지 공용) · `routes/brands-core.js` PUT 이 같은 주인 브랜드 전부에 한 트랜잭션으로 저장 · GET 에 `applies_to_brands` · 새 브랜드는 형제 값으로 시작 · 마이그 `scripts/migrate-brand-account-payment-settings.js`(deploy 등록, 멱등, 기준 = 주인 기본 브랜드) · 인스펙션 `brand-account-settings`(B-ACC, baseline 미등록) · health-check payment 2건 · 화면 맨 위 한 줄 «이 설정은 이 계정의 모든 브랜드에 적용됩니다: …»(브랜드 2개 이상일 때만, 4언어)
- 값 복사는 저장 원문 그대로(모델 getter 가 빈 칸을 «전부 꺼짐» 기본값으로 돌려줘서, 그걸 복사하면 «미설정»이 «설정됨»으로 바뀜) — Fable 2회차 수용
- 개발 DB 정렬 3건(owner 6: #2·#4 ← #1 / owner 22: #17 ← #10) · 실행 전 원문 `~/.claude/jobs/17f1cc84/tmp/brands-before-migrate.json`
- 검증: health-check payment 8/8 · 고장주입 2/2(펼치기 끄면 실패 → 원복 통과, pm2 재시작 뒤 / brand 17 비우면 인스펙션 실패 → 마이그 → 통과) · 마이그 재실행 0건 · 새 브랜드 생성 복사 실호출 · 실브라우저 7/7(설정 문구 · 브랜드 17 발행 청구서 → 매장 결제창 «Bank Transfer» 표시 · 데모 청구서 삭제) · 빌드 2회(문구 위치 고친 1회 추가) · verify-all --full 23/24(실패 1 = 배포 기록 파일, 배포 때 작성) · print-guard 8/8 · design-guard 신규 0
- **Fable 2회차(도장) PASS · 통과 마커 찍힘**(지문 16d2d5f28a09)
- 운영: 쓰기 0. 읽기 전용 dry-run — **실고객(GIT Consulting #1·#2)은 이미 같은 값 → 변경 0** · 바뀌는 건 데모 브랜드 2건(#10 Seoul Kitchen Collective·#12 New brand ← #4 K-Taste Group). 배포 노트에 «실고객 변경 0 · 데모 브랜드 2건 정렬»로 적을 것
- 배포 뒤 할 일: 메모리 reference_brand_payment_settings_per_brand_row 를 «해결 — 계정 단위 펼치기» 로 갱신
- 범위 밖(기록): 둘째 BG 계정(사람이 다른 소유자) 403 · brands.currency 형제마다 다름 · invoices-helpers 은행 칸 옛 폴백 · 새 브랜드 생성과 복사가 한 트랜잭션 아님(마이그·인스펙션이 자가치유·감지)

### 완료 (2026-10-07 밤) — 발행자 청구서 «To Confirm» 탭 + 업무 버튼 색 규칙 [Claude Code · 백그라운드 작업방 7beef54a]
- Irene 원문(10-05): 「컨펌해야 할 탭이 따로 있어야 하지 않을까? … 컨펌 버튼도 녹색으로」「업무패턴에 맞게 버튼색 못 맞춰?」
- 브랜드·푸드코트 청구서: **To Confirm** 탭 신설(Invoices to Pay 바로 옆, 빨간 숫자 배지) — 내가 발행했고 상대가 결제를 올린(payment_submitted) 것 전부, 기간·검색 필터 없이. 표는 Issued 와 같은 표·같은 버튼(확인 처리 함수 그대로, 서버 무변경). 시스템관리자는 기존 «Payment Submitted» 탭 이름만 «To Confirm»(주소 `?tab=payment_submitted` 그대로)
- 버튼 색(세 화면): View=테두리(보라 채움 → 테두리) · Confirm/Confirm Payment/Mark paid(0원)/확인 창 «Confirm Payment Received»=초록 · 삭제(×)·관리자 Cancel=빨강(#DC2626) · 나머지(Edit·PDF·Print·Send)=테두리. 팀원 재량: 초안 «보내기»(종이비행기)는 돈 업무가 아니라 초록 → 테두리. 페이지 «Create Invoice» 는 보라 그대로
- 번역 4언어(brand·foodcourt 5키, admin 1키)
- 검증: 빌드 1회 · 실브라우저 클릭 흐름 26/27(브랜드 10: To Confirm 1행=API 1 · View 테두리 · 삭제 빨강 / 푸드코트 44: 0행 빈 문구 / 관리자: 2행=API 2 · Confirm 초록 · 확인 창 초록 · Cancel 빨강 · 콘솔 오류 0). 실패 1 = 데모 브랜드 청구서 INV-DEMO-010 이 결제 정보(수단·영수증·제출시각) 없이 payment_submitted 라 기존 규칙대로 Confirm 이 숨음(데이터 문제, 코드 무관) · verify-all --full 23/24(mount sweep 크래시 0 · 타입 신규 0 · health-check 통과 · ✗1 = 배포 기록 파일 없음, 배포 때 작성) · check-sensitive-diff 비대상(Fable 미호출)
- 참고: 키오스크 방 /개발완료 커밋 0319d1986 에 이 작업의 중간 변경(Brand 화면·invoices/styles·types)이 함께 들어감 — 운영 배포 빌드는 그 전에 끝나 운영 무영향, 나머지는 미커밋
- 범위 밖(그대로): 매장·오너 청구서(낼 쪽)의 View 는 아직 보라 채움 · 브랜드/푸드코트 Trade Invoices 화면 · 삭제·취소 확인 창 버튼(이미 빨강)

### 완료 (2026-10-07) — K-Bulgogi 1kg 정리 · 운영 데이터 적용 [Claude Code · 백그라운드 작업방]
- Irene 답(10-07): 「이미 내가 정리했는데 남아있으면 정리해줘. 연결된 공급업체가 git consulting 으로 다른 역할에는 맞춰주고. 우린 알아서 맞추고.」 — Irene 이 bp#30 을 이미 «주문제작»·100 g @ 7.50 으로 정리해 둠(Q1 사실상 b)
- 운영 쓰기 ①: `scripts/migrate-kbulgogi-mirror-swap-20261007.js` 드라이런 7/7 → `--apply` 7/7. #23 출처 → bp#30 · #89 비활성 · 재고아이템 PI-302 비활성. 레시피 4줄·원장 129·배치 4·K-DINE 재고 7,870 g 전후 동일, g당 원가 0.075 그대로. 운영 «같은 물건 두 줄» 0. 영수증(운영 서버) `/var/www/backups/data-migrations/kbulgogi-mirror-swap-2026-10-07T13-21-09-724Z.json` · 되돌리기: production-backend 에서 `--undo=<영수증> --apply`
- 운영 쓰기 ②: with MIN Cafe K-Bulgogi(#133) → GIT 판매상품 bp#30 연결 isp#1421(화면 연결 함수 linkCatalogProductToRestaurant 그대로 · brand entity 1 = 다른 K-소스 14건과 같음 · 1팩 = 100 g · 7.50)
- K-DINE 쪽은 「우린 알아서」로 무접촉
- **Fable 2회차 판정: PASS**(`.claude/fable-verdict-20261007-kbulgogi-gate.md`) — 통과 마커는 **보류**: 작업트리에 다른 방의 키오스크 구현(orders-crud 🔒 등)이 섞여 있어 마커가 그것까지 덮게 됨. 키오스크 게이트 뒤 함께 찍기
- **Irene 이 해야 할 일(K-DINE, 운영 화면):** ①K-DINE 재료 K-Bulgogi 거래처 연결 환산 1000 → **100**(지금대로면 다음 발주 1팩=100 g 인데 재고 +1,000 g · 원가 10배 싸게) ②K-DINE 매장 소유 «K-Bulgogi 1kg»(#1122, 4 kg, 환산 1) 실사 0 뒤 삭제 ③상품 이름 «K-Bulgogi 1kg» → «K-Bulgogi 100g» 권장
- 확인 못 함: 거래처 표시 이름 실제 화면(권한 거부로 조회 안 함) · 운영 인스펙션 전체 실행 · isp#1272 단가·buyer 현재값 · 다음 배포 게이트에서 합치기 마이그 «⏸ K-Bulgogi» 줄 사라짐 확인(다음 배포 때 기록)
- 참고: 지금 작업트리 print-guard 실패 1건은 키오스크 작업분(orders-crud) — K-Bulgogi 변경분은 인쇄 보호파일 무접촉

### (이전) 답 기다림 (2026-10-07) — 버전 올림: v3.109 로 올릴까요 (5.87·5.88·5.89 묶음) — Irene «응» → v3.109 반영·릴리즈 공지 [Claude Code · 백그라운드 작업방 503af8e9]
- **무엇을:** 오늘 운영 배포 3번(5.87 오너 청구서·브랜드 매니저 메뉴 / 5.88 청구서 총액 수정·이력 / 5.89 키오스크·영수증)을 v3.109 로 묶어 올릴지
- **왜:** 버전은 /배포 때만, Irene 결정. 5.87·5.88 때부터 «묶어 올릴 예정» 으로 대기 중이었음
- **답이 오면(예):** CHANGELOG [Unreleased] → v3.109 절 · session-state·DEVELOPMENT_PLAN 버전 · 왓츠앱 릴리즈 노트(한·영) · 랜딩 블로그 + 시스템 공지(`create-release-post.js --stdin --sync-prod`) / (아니오): 그대로

### 완료 (2026-10-07 밤) — 키오스크·영수증 운영 배포 SW 5.89 [Claude Code · 백그라운드 작업방 503af8e9]
- Irene 원문(상황판): 「해」(배포 지시) → `deploy-to-production.sh --auto` · 백업 **20261007_163801** · 안전 게이트 통과 · mount sweep 크래시 0(번들 동일 재사용) · 마이그 `migrate-create-kiosk-devices.js` → 운영 `kiosk_devices` 생성 · 스모크 **10/10** · 운영 sw.js `5.89-kiosk-receipt-20261007` 실측 일치
- 배포 중 같은 폴더 작업방(«발행자 청구서 To Confirm», 7beef54a)에 파일 수정 보류 요청 → 동의 → 배포 뒤 재개 알림
- 참고: /개발완료 커밋 0319d1986 에 그 방이 고치던 청구서 변경 일부(Brand 화면 · invoices styles·types)가 섞여 들어감 — 배포 빌드·전송은 그 전에 끝나 운영 영향 없음(그 방 확인·기록). 되돌리지 않음
- 확인 못 함: 운영 설정 › Kiosk 화면 직접 확인(운영 로그인 없음 — Irene 화면 확인) · 키오스크 카드단말기 실기(GHL 파일럿)

### (이전) 답 기다림 (2026-10-07) — 키오스크·영수증 운영 배포: Irene «/배포» 지시 — «해» 로 해결, 배포 완료
- **무엇을:** 운영 배포 지시(«/배포»). 코드·검증·🔒 bless·SW 버전은 끝남
- **왜:** 운영 배포는 Irene 지시로만
- **Fable 최종 게이트 PASS** `.claude/fable-verdict-20261007-kiosk-final-gate.md` — 키오스크 결제 분리 + 설정 › Kiosk 스위치 · 영수증 드래그·PDF(이 자리에서 게이트) · K-Bulgogi(앞선 PASS). Fable 이 직접: 🔒 bless(manifest·bless-log) · SW_VERSION `5.89-kiosk-receipt-20261007` · 통과 마커(지문 3832931bca4f)
- 팀원 마무리: 빌드 1회(번들 main.18301e8f.js — 화면 검사 본 번들과 같음) · verify bundle-fresh·print-guard·deploy-ready 통과 · 배포 기록 `dev-backend/releases/2026-10-07-kiosk-receipt.json`(verification.fable_note 포함). 이 기록 파일 때문에 마커가 «무효» 로 보이는 것은 판정문 N6 대로 설계상 — `.fable-gate-skip` 쓰지 말 것
- 마이그 1개 `migrate-create-kiosk-devices.js`(deploy·멱등·신규 표)
- **답이 오면:** `/배포` → 운영 sw.js 5.89 실측 · 스모크 · 운영 설정 › Kiosk 화면 1회 → 기록 이동 → /개발완료
- Fable 참고(결정 불필요): 모바일오더 사용/안 함 스위치는 권고대로 안 만듦(원하시면 한 줄) · 영수증 파일은 다른 업로드처럼 링크를 알면 로그인 없이 열림(로그인 뒤에만 보이게 하려면 별도 설계) · 키오스크 카드단말기 실기는 GHL 파일럿 날

### 완료 (2026-10-07 밤) — 키오스크 오른쪽 장바구니 상시 표시 [Claude Code · 백그라운드 작업방 503af8e9]
- Irene 원문(상황판): 「키오스크 UI가 너무 이상해. 우측 장바구니 있는 상태 그대로 상세페이지 들어가야지. 결제하는 모든 과정에서도 우측에 장바구니 없어지면 안되는 거 아니야?」
- 공용 부품 `mobile/components/KioskCartAside.tsx`(오른쪽 장바구니 · useKioskSplit · 아래 고정 버튼을 왼쪽 칸에 맞추는 kioskSplitBarCss) — 메뉴(종전 인라인 → 공용으로) · 상품 상세 · 결제 · QR 결제 · 온라인 결제에 같은 자리(가로 1024px 이상 키오스크). 결제 화면에서는 «결제하기» 버튼 없이 수량 수정 가능(결제 진행 중엔 보기 전용), QR·온라인 결제는 보기 전용(주문 내용이 이미 넘어감) · 넓은 키오스크의 /cart 는 메뉴로(장바구니가 늘 오른쪽) · 오른쪽 «결제하기» 는 바로 결제 화면으로
- 팀원 재량(UI, Fable 미호출): 위 배치·보기 전용 범위·/cart 이동
- 검증: 실브라우저 20 중 19(장바구니 위치 메뉴=상세=결제 left 828 · 아래 버튼 겹침 0 · 기존 흐름 전부) — 실패 1 은 페이지 급히 옮길 때 끊긴 요청 콘솔 기록(끝까지 열면 0) · 타입 신규 0 · 디자인·TDZ·타임존 통과 · 빌드 1회
- **Fable 재확인 PASS · 마커 유효(지문 19cee3adbeec)** — 판정문 `.claude/fable-verdict-20261007-kiosk-final-gate.md` 끝 «재확인 (장바구니 상시 표시)». Fable 이 2줄 고침: 결제·QR·온라인 화면의 오른쪽 장바구니는 줄만(합계는 왼쪽 하나 — 쿠폰·포인트 들어간 합계와 두 값이 나란히 서던 것) · 결제 화면 카드 안내 바 위치. Fable 실행: 빌드 1회 · verify --full 24/24 · 클릭 흐름 20/20
- 데모 38 mobile_settings.kiosk_enabled: 지금 false — 16:13 UTC Mac 브라우저 설정 저장(Irene)으로 보임, 그대로 둠. 화면 확인하려면 설정 › Kiosk 에서 켜야 함
- 마커 보호: session-state.md 외 파일 수정 금지 → 다음은 Irene «/배포» 뿐

### (이전) 답 기다림 (2026-10-07) — 키오스크 결제 분리: 실프린터 확인 1회 (🔒 bless 전) — Irene «다 확인했어. 최종 검증은 fable이 해» 로 해결 [Claude Code · 백그라운드 작업방 503af8e9]
- **무엇을:** 데모 매장(또는 매장 1곳)에서 키오스크 주문 1건 → 주방 티켓 1장 · 계산원 칸 «Kiosk» · 중복 0 을 Irene 눈으로 확인
- **왜:** 🔒 보호파일 3개(orders-crud · MainLayout · useAutoPrintPoller)를 승인 범위대로 글자 수준 변경(인쇄 경로 무접촉) — 규칙상 실프린터 확인 뒤에만 `check-print-guard.js --bless`
- **답이 오면:** ①`cd dev-backend && node scripts/check-print-guard.js --bless` ②영수증 방 변경(작업트리에 섞임, Fable 게이트 미수령)이 자기 게이트를 받거나 트리에서 빠짐 ③Fable 짧은 1회로 통과 마커(조건: 판정문 §7-3 — diff = 지문 2648d2d91cca 내용 + bless 2파일 + 영수증 게이트 수정뿐) ④SW 버전 올림(맨 마지막) → 빌드 1회 → /배포(Irene). `.fable-gate-skip` 금지
- 판정문: 설계 `.claude/fable-verdict-20261007-kiosk-payment-split.md` · 게이트 `.claude/fable-verdict-20261007-kiosk-payment-split-gate.md`(§6 Irene 질문 · §7 재확인 PASS) · 문서 `docs/KIOSK_MODE.md`
- Fable 권고(그대로): Q1 실프린터 확인 1회 · Q2 1·2단계 함께 배포(2단계는 등록 기기+앱 브릿지+단말기 켜짐 없으면 잠든 코드) · Q3 미분리 키오스크의 온라인 결제(카드번호 입력)는 매장이 Kiosk 토글을 켜기 전까지 숨김
- 도장 단계 Fable 1회에 함께: «설정 › Kiosk 스위치» 변경의 게이트 판정(판정문 `.claude/fable-verdict-20261007-kiosk-settings-entry.md` §5 기준 — 팀원 증거: health-check kiosk 4/4 · 고장주입 2 · 클릭 흐름 17/17 · verify --full sweep 크래시 0). 통과 마커는 bless 뒤에만(지금 찍으면 bless 가 무효로 만듦), `.fable-gate-skip` 금지
- 추가(저녁): 모바일오더에도 «사용/안 함» 스위치를 따로 만들지 → **Fable 권고: 아니오**(«주문 일시정지» 가 그 역할 · 운영 QR 주문 무접촉). 🔒 bless 범위에 MainLayout 사이드바 Kiosk 2줄(설정 메뉴·열기 항목)+클릭 분기 포함 — 도장 때 diff 대조

### 완료 (2026-10-07 저녁) — 키오스크 «사용» 스위치 · 좌측 메뉴 Kiosk [Claude Code · 백그라운드 작업방 503af8e9]
- Irene 원문(상황판): 「키오스크 카드기를 켜도 좌측메뉴에 키오스크 링크 모바일오더처럼 안나오는데 어떻게 접속해? 바로 알게 적용해줘. 그리고 카드 단말기랑 강제로 무조건 사용하게 하는 키오스크 기능아니면 모바일오더처럼 키오스크 사용여부는 어디서 설정해? 모바일오더/키오스크 이렇게 설정에서 쓸지 말지 정한 다음에 결제설정에도 나와야 하는 거 아니야?」
- Fable 판정 `.claude/fable-verdict-20261007-kiosk-settings-entry.md`(A 명시 스위치) 대로: **설정 › Kiosk** 탭 신설(①«키오스크 사용» 스위치 `mobile_settings.kiosk_enabled`, 없으면 꺼짐 ②등록된 태블릿 — 꺼짐이면 등록만 막음 ③등록 없이 여는 주소·QR) · 모바일 주문 탭에서 키오스크 카드 제거 · 결제수단 Kiosk 열은 켜졌을 때만(저장값 보존) · 서버: 꺼짐이면 등록 기기 주문·새 등록 409 `KIOSK_DISABLED`(`isKioskEnabled` 한 곳), `/me`·공개 응답에 사용 여부 · 등록 기기에 «Kiosk is turned off — 카운터에서 주문» 안내
- 팀원 재량 추가: 좌측 메뉴 **맨 위쪽 «Kiosk» 열기 항목**(Mobile Order 바로 아래 — 켜져 있으면 키오스크 화면 새 창, 꺼져 있으면 설정 › Kiosk 로). Irene 원문 «모바일오더처럼 링크» 를 그대로 반영. 🔒 MainLayout 설정 메뉴 한 줄 + 열기 항목·클릭 분기 — 인쇄 블록 밖, bless 묶음에 추가
- 카드단말기는 강제 아님(Kiosk 열에서 켠 수단만으로 주문 가능, 카드는 앱+단말기 연동일 때 선택)
- 검증: health-check kiosk 4/4(스위치 케이스 추가) · 고장주입 2(주문 관문·등록 관문) 모두 잡힘 · 실브라우저 클릭 흐름 17/17(메뉴 Kiosk 2곳 · 꺼짐=Kiosk 칸 0·등록 막힘 · 스위치 저장 · 켜짐=Kiosk 칸 · 등록 · 카드 결제 기록 · 카운터 · 폰 카드 숨김 · 꺼짐 안내 · 해제) · 타입 신규 0 · 디자인·타임존·TDZ·i18n 통과 · 빌드 1회
- health-check 단말기 Void 검사가 데모 38 의 «취소 PIN 필요»(14:46·15:15 Mac 브라우저 demo-restaurant 계정 저장 — Irene 직접 사용으로 보임, 되돌리지 않음)에 걸려 실패 → 검사가 시작 때 PIN 끄고 끝에 원복하도록 고침. 전체 303/304(남은 1 = 🔒 지문) · verify-all --full: mount sweep 크래시 0 · 타입 신규 0 · ✗ = 🔒 지문·배포 기록 파일(예상)
- 데모 38: 이전 클릭 흐름 실행이 남긴 키오스크 값(정리 전 중단 → 다음 실행이 «원본» 으로 저장)을 다시 발견해 기본값으로 재정리. 지금 payment_settings·mobile_settings 에 kiosk 값 0, kiosk 주문·기기 0
- Irene 에게 물을 것(구현 막지 않음, Fable): 모바일오더에도 사용/안 함 스위치를 따로 만들까요? → **Fable 권고: 아니오**(«주문 일시정지» 가 그 역할)

### 완료 (2026-10-07) — 키오스크 결제 분리 구현 (1·2단계 코드) [Claude Code · 백그라운드 작업방 503af8e9]
- Irene 원문(10-07): 「Fable 권고대로 해. 우리 완벽한 키오스크필요해. 카드단말기랑 자동 연동 된」 → Q1=A · Q2=예 · Q3=1단계 먼저(2단계 코드도 함께 작성, 실기는 GHL 파일럿 날)
- 기기 등록: 표 `kiosk_devices`(마이그 `migrate-create-kiosk-devices.js`, 레지스트리 deploy, 개발 적용) · `routes/kiosk-devices.js` · `middleware/kioskDevice.js` · 설정 «매장 태블릿(키오스크)» 카드 안 등록·목록·해제·기기별 단말기 주소 · `/pos` 진입 관문(등록 기기 → 키오스크)
- 결제 채널 pos·mobile·**kiosk**: 설정 결제수단 줄에 Kiosk 토글 · `_kioskSplit` 없으면 키오스크=모바일(온라인 결제만 OFF) · 키오스크 숨김 현금·직원식·계좌이체 · 서버 강제 `paymentMethodGuard.methodOpenIn`(폰이 키오스크 전용 수단 → 400)
- 주문 꼬리표 `source='kiosk'`(서버가 기기 토큰 보고 붙임, 토큰 없이 kiosk → 400) · 🔒 3파일 승인 범위만 · 키오스크 카드 주문은 승인 전 outstanding
- 단말기: 키오스크 «카드로 결제» → 주문 → runTerminalSale(계산대와 같은 흐름) → 서버가 승인 거래에서 금액·수단 읽어 기록 → 완납 시 pending · 손님 창 `KioskCardPanel`(거절=다시 시도/카운터, 무응답=직원 안내, 승인 뒤 기록 실패=주문번호 직원에게) · 키오스크는 수동기록·Void·찾기 403
- Fable 게이트 지적 F1(wipe 자물쇠: 메타 키 제외 + 일반 저장도 보존) · F2(미분리 키오스크 online OFF) 반영
- 검증: health-check kiosk 3/3 · 고장주입 4/4 잡힘 · 전체 302/303(실패 1 = 🔒 지문, bless 전) · 계약 테스트 settings-guard 8/8 · 화면 jest 6/6 · 빌드 2회(F1·F2 뒤 재빌드) · verify-all --full 21/24(✗3 = 🔒 지문 2 · 배포 기록 파일 1, 전부 예상) · **mount sweep 크래시 0** · 타입 신규 0 · 실브라우저 클릭 흐름 11/11(등록→키오스크→카드 승인 기록→카운터→폰 카드 숨김→해제 401)
- ⚠ 사고(개발 DB): 첫 클릭 흐름 실행이 중간에 죽어 데모 매장 38 payment_settings 원래 값을 못 되돌림 — 원본 백업 없음(복구 불가). 오늘 생긴 값은 지우고 counter.allowed_order_types=dine-in·takeaway·pickup · card.availableIn=pos · card.terminal 삭제로 복원(직전 값 `~/.claude/jobs/503af8e9/tmp/ps38-before-fix.json`). 운영 무관. 데모 38 에서 카드단말기 테스트를 하던 설정이 있었다면 다시 켜야 함
- 확인 못 함: 2단계 실기(앱 기기+실단말기) · 실프린터 티켓

### 완료 (2026-10-07) — Fable 소급 판정 v3.108(#4)·#5 [Claude Code · 백그라운드 작업방]
- **Fable 판정: PASS (소급 — 되돌릴 것 없음)** · 원문 `.claude/fable-verdict-20261007-retro-v3108-n5-gate.md` · 범위 git 771a20bc6..99f428167(21파일, 기록 밖 변경 0, 🔒 보호파일 무접촉)
- 근거 요지: 정산서 상태 바꾸는 4길 전부 soaChildSync 한 함수·트랜잭션 · dev 트랜잭션 증명 후 롤백(반증 5/5 잡음 → 맞춤 후 0) · 운영 마이그 로그 #4 자식 4건 맞춤·불일치 0, #5 0건(멱등) · 이어서 내기는 미묶음만 수집해 이중 청구 불가
- 팀원 기계 게이트(오늘 dev): print-guard 8/8 · health-check 299/299 · 인스펙션 신규 실패 0 · I-SOA-001 통과
- `.claude/.fable-gate-skip` 은 10-07 5.88 때 이미 삭제(정지 훅 복구) — 추가 조치 없음. 통과 마커는 안 찍음(지금 작업트리 지문이 이 배포와 무관)
- Fable 이 남긴 위험(되돌릴 사유 아님): A 아래 «후속 후보» · B health-check 에 정산서 연동 4길·판매 통계 라우트 케이스 0건 → 팀원이 추가(다음 확정) · C childRuleFor 죽은 값 · D 운영 정산서 3건 restaurant_id 보정(기존 대기) · E 같은 달 정산서 두 장(승인된 동작) · F 자동 발행 시나리오·mount sweep·운영 DB 현재 상태는 Fable 재현 안 함(기록·로그 수용)

### 완료 (2026-10-07 오후) [Claude Code]
- **운영 배포 SW 5.88** 인보이스 총액 수정+수정 이력 (백업 20261007_112732 · 스모크 10/10 · mount 크래시 0 · Fable 게이트 PASS 마커 유효 상태로 배포). 버전 v3.109 는 아직 안 올림(5.87·5.88 묶어 올릴 예정 — Irene 결정 대기)
- `/개발시작` 0-B단계 추가: 운영 들어온 업무 읽기 `dev-backend/scripts/prod-inbox.js`(읽기 전용) → 건마다 «이미 해결/조치 필요/결정 필요», 답장·운영 쓰기는 Irene 지시 때만. 2026-10-07 11:34Z 실측: 열린 시스템 문의 3건 — SUPP-2026-6842-103·SUPP-2026-1886-062(/pos/purchase-orders «Cannot access 'mn' before initialization», 9/17) · SUPP-2026-2401-270(/pos/recipes React #31, 9/10). 후속 글 0 · 랜딩 문의 0
- ⏸ 운영 읽기 전용 계정(claude_ro) 미설정 — `/개발시작` 운영 문의 확인이 이 계정에 의존(ssh 직접 명령은 안전장치 확인에 걸려 아침 점검이 멈춤, 2026-10-07 실측). Irene 1회: 맥에서 `scp irene@87.106.11.184:dev-server/prod-ro-setup.sh irene@87.106.78.146:` → `ssh -t irene@87.106.78.146 bash prod-ro-setup.sh` (docs/PROD_READONLY_DB_SETUP.md 와 같은 내용)
- 아침 점검 cron 00:00 UTC(08:00 MYT) `~/dev-server/morning-check.sh` — PurpleHere·PlanQ 에 «/개발시작» 방. 첫 실행 2026-10-07 11:38Z(방 e6a3d881)
- 개발서버 상황판(~/dev-server/board, PM2 dev-board, 127.0.0.1:8800): 대화창·확인 완료→완료 목록(state.json)·개발완료 버튼(+git 기록)·대기열·방 줄 실행/중지/삭제 — 설명서 ~/dev-server/README.md

### /개발시작 들어온 업무 판단 (2026-10-07, 11:34Z 조회 결과 기준 · 운영 재조회 안 함 — Irene 지시: 운영 서버 직접 명령 금지) [Claude Code]
- SUPP-2026-6842-103 · SUPP-2026-1886-062 (/pos/purchase-orders TDZ 'mn', 9/17) → 이미 해결: 커밋 1e43a29fd 9/17 긴급 수정·운영 배포 SW 5.35, 재발 게이트 check-hook-tdz(오늘 624파일 0건)
- SUPP-2026-2401-270 (/pos/recipes React #31, 9/10) → 이미 해결: RecipesTab 저장 실패 getErrorMessage 교체(그 신고를 주석에 명시) · releases/2026-09-10-error-message-crash.json 로 9/10 배포
- 남은 일: 3건 모두 «열림» 상태 그대로 — 닫기·답장은 운영 쓰기라 Irene 지시 때만

### 진행 중인 작업
- 없음

### 완료 (2026-10-07) — 영수증 드래그·PDF (다음 확정 3번) [Claude Code · 백그라운드 작업방 20dc6966]
- 저장소 밖 패치(`/home/irene/wip-receipt-upload-20261005/`) 되살림 — Restaurant/InvoicesPage 1곳은 그사이 코드가 바뀌어 3-way 병합, 나머지 그대로 적용 + 새 파일 4개
- 내용: 청구서 결제 제출 영수증 칸 6개 화면 공용 `ReceiptUploadField`(클릭·끌어다 놓기 · JPG/PNG/WEBP/PDF · 5MB) · 발행자 쪽 보기 `ReceiptPreview`(이미지/PDF) · 서버 `utils/receiptFile.js` 가 data URL 을 `/uploads/receipts/` 파일로 저장(DB 에 base64 안 넣음, SVG·html 거절)
- 이 방 검증: health-check payment 6/6(영수증 케이스 포함) · 화면 jest 3/3 · 고장주입 2건(서버 정규화 제거 → 실패, 끌어다 놓기 제거 → 2건 실패) 잡힘 후 원복 · print-guard 8/8 · design-guard 신규 0 · i18n 통과. 빌드는 PlanQ 에뮬레이터 메모리 게이트로 대기
- 빌드·검증·게이트는 키오스크 방(503af8e9)이 묶어서 처리: 빌드 1회 · mount sweep 크래시 0 · **Fable 최종 게이트 PASS** `.claude/fable-verdict-20261007-kiosk-final-gate.md` §2 · SW 5.89-kiosk-receipt-20261007 · 배포 기록 `dev-backend/releases/2026-10-07-kiosk-receipt.json`
- 마커 «무효» 표시 = 마커(15:46Z) 뒤 바뀐 파일이 배포 기록 JSON·session-state 뿐임을 실측(판정문 N6 대로). skip 파일 안 씀
- Fable 참고(결정 불필요): 영수증 파일은 다른 업로드처럼 링크를 알면 로그인 없이 열림(이름 추측 불가) — 로그인 뒤에만 보이게 하려면 별도 설계
- 운영 배포는 키오스크와 한 묶음으로 Irene «/배포» 대기(위 «답 기다림» 절). /개발완료 커밋은 안 함 — 지금 커밋하면 통과 마커 지문이 바뀌어 배포 직전 게이트를 다시 받아야 함

### 완료된 작업 (2026-10-07) [Claude Code] — 운영 배포 SW 5.87-owner-invoices-brand-staff-20261007 (백업 20261007_075641 · 스모크 10/10 · mount sweep 크래시 0 · 1차 시도는 메모리 게이트로 빌드 전 중단, 운영 무변경)
- 오너 청구서 «Invoices to Pay» 탭이 매장 선택을 무시하던 결함: `routes/owner.js` GET /invoices/to-pay 가 restaurant_id(내 소유 매장일 때만) 로 좁힘. 실호출: 오너 289(매장 2·3) 매장3 선택 → 수정 전 1건(매장2 것) / 수정 후 0건, 익명 401
- 오너 청구서 화면에 매장이 올린 공급업체 인보이스 «올린 인보이스 보기»(목록 줄 + 상세 창 버튼) — 서버는 이미 보내고 있었고 화면만 안 그렸음. 운영 with MIN Cafe 48건 중 22건 해당
- 브랜드 사이드바 «매니저»(본사 직원) 프랜차이즈 → 설정(회사 정보 아래). MainLayout 메뉴 목록만, 인쇄 블록 무접촉 → Irene «배포해» 로 print-guard --bless. check-sensitive-diff ① 표시(보호파일) — 판단 갈림 없어 Fable 미호출
- 검증: build:dev · verify-all --full 23/24 통과(실패 1 = deploy-ready 배포 기록 파일 없음, 배포 시 작성) · print-guard 8/8 · 민감 diff 비대상

### 완료 · 운영 배포 SW 5.88 (2026-10-07) — 인보이스 총액 수정 + 수정 이력 [Claude Code · 백그라운드 작업방]
- 설계 §3 1~11 전부 구현: 백엔드 6파일(이전 세션) + 프론트 공용 `SupplierInvoiceTotalFix`·`InvoiceModificationHistory` · RA/오너 청구서 상세 버튼·이력 · i18n 4언어 · docs PURCHASE_ORDER_SYSTEM §8-7 + OWNER_PLAN·SUPPLIER_CONTRACT 1줄
- 검증: health-check `invoice-total-fix` T1~T4 4/4 · 고장주입 3/3(pm2 재시작) · print-guard 8/8 · design-guard 신규 0 · i18n 0 · 타입(반증 프로브) 새 파일 0 · build:dev 1회 · verify-all --full 24/24(deploy-ready 기록 수정 후) · 실브라우저 클릭 8/8
- SW 5.88-invoice-total-fix-20261007 · 배포 기록 `dev-backend/releases/2026-10-07-invoice-total-fix.json` · CHANGELOG [Unreleased] · DEVELOPMENT_PLAN
- 실측 메모: 청구서 목록의 «외부 공급업체» 판정은 서버가 60초 기억(invoices-list.js EXTERNAL_ISSUER_TTL_MS) — 테스트에서 가입 전환 직후 버튼이 남았던 원인, 실사용 영향 없음
- **Fable 게이트 PASS**(지문 5504b0d5bdc6 · 마커 유효 · 판정 `.claude/fable-verdict-20261007-invoice-total-fix-gate.md`). 남는 위험(배포 무관): 동시 수정 시 이력 한 줄 덮임 가능 · 오너 화면 이력 시각=기본 타임존 · T2 남의 매장 검사는 데모 매장 2개 이상일 때만
- Fable 후속 처리: 10-05 부터 남아 있던 `.claude/.fable-gate-skip` 삭제 → 정지 훅 복구(다음 확정 1번의 «skip 정리» 해당)
- 배포 뒤 바뀐 것: `scripts/prod-inbox.js`(읽기 전용 도구) 하나뿐(deploy-manifest 실측) → 통과 마커는 이 파일·기록 때문에 지금 «무효» 표시, 배포된 코드는 판정받은 그대로
- 남은 일: **v3.109 버전 올림·릴리즈 공지** — 5.87·5.88 묶음, Irene 결정 대기

### (이전) 답 기다림 (2026-10-07) — 인보이스 총액 수정 + 수정 이력
- Fable 판정 수령(2026-10-07, 설계 D1~D7 · 구현 §3 11항목 · 검증 T1~T4+고장주입 3종) — 원문은 이 대화에서 Irene 에게 그대로 전달함
- **Irene 확인 대기 4항목**(Fable 권고): ①고칠 수 있는 청구서=외부 공급업체 건만(권고 이대로) ②오너는 총액만·줄 단가 대조는 RA 만(이대로) ③결제 완료 건도 허용(유지) ④사유 메모 선택(선택)
- 답이 오면: Fable §3 순서대로 구현(buyerScope OWNER_ACTING_ROUTES reconcile 추가·cost-reconciliation OWNER_TOTAL_ONLY·reconcileInvoiceSync 이력 push·attach reconcile_invoiced_lines·SupplierInvoiceTotalFix/InvoiceModificationHistory 공용 컴포넌트·RA/오너 화면·i18n·docs §8-7) → health-check T1~T4 + 고장주입 → 빌드 1회 → verify-all --full → Fable 게이트 판정(2회차) → Irene /배포
- 버전: v3.109 는 이 기능 배포 때 오늘 SW 5.87 배포분과 묶어 올림(CHANGELOG Unreleased 에 기록됨)

### 이전 기록: Fable 판정 대기 (2026-10-07 Irene 원문, 10-07 Fable 한도 429 → 이후 판정 수령)
- 「토탈금액 안맞으면 수정하는 것도 인보이스에서 가능해야지. 레스토랑관리자도, 오너도.」「그리고 수정한 사람 이름이랑 시간 남겨서 히스토리 볼 수 있어야 하고」
- 실측: RA 는 청구서 상세 «인보이스와 대조하기»(cost-reconciliation POST, 총액만 대조 → 'Supplier invoice difference' 줄) 로 가능 · 오너는 buyerScope 10-04 Fable 판정으로 원가대조·결제 403 · PUT /api/invoices/:id 오너 불가 · 수정 이력 범위 미확인

### 완료된 작업 (2026-10-06) [Claude Code]
- 키오스크 결제 질문 조사(코드 변경 0): 키오스크=모바일 표시 모드라 결제수단 동일, 단말기는 POS 결제창에만, FloorPlan·LiveOrders·POSTerminal 같은 PaymentModal. Fable 판단 요청 → 한도 429 실패 → Irene 요청으로 Opus 의견 제시(Fable 판단 아님 명시) → 다음 확정 2번으로 등록

### 완료된 작업 (2026-10-05 저녁 · #4·#5) [Claude Code]
- **#4 v3.108 · SW 5.86** (백업 20261005_153730 · 스모크 10/10 · Fable 게이트: 1차 FAIL(하드웨어 청구서 이름) → 수정·재통과 기준 실측 → 도장은 Fable 한도 초과로 미수령, **Irene 이 skip 파일 직접 생성**)
  - 정산서↔묶인 청구서 상태 단일 규칙 `services/soaChildSync`(submit·confirm·reject·PATCH status) + 복구 `scripts/migrate-soa-child-status-sync.js`(deploy) + 인스펙션 `invoice-soa` I-SOA-001 — 운영 배포 때 #162 자식 4건 맞춤, 불일치 0
  - 정산서 손님 이름: SOA 생성 시 restaurant_id 채움 + `payerIdIsStore`(invoices-helpers, hardware 제외) 술어로 이름 계산 — 운영 확인 with MIN Cafe / K-DINE IPC Branch
  - 브랜드 정산서 상세·PDF 묶인 청구서 표 · 레스토랑 청구서(Mark paid 즉시 갱신·To pay 탭 먼저·올린 인보이스 보기) · 매출 Year 그래프 연-월 순서
  - 브랜드 매출 보고서 재구성: 브랜드·매장 체크 칩(직영 빼기, localStorage 기억) · 탭 요약/카테고리/상품/매장/청구·수금 · `GET /api/brand/sales-report`(주문 시점, 범위 밖 브랜드 403) — 운영 R8 9월 Sauce 4,492.80 · Meat 1,789.70
  - 릴리즈: CHANGELOG v3.108(10-02~10-05 배포 15회 묶음) · 블로그 release-v3.108 · 공지 v3.108
- **운영 데이터(Irene 지시):** with MIN Cafe 9월 미묶음 4건 → SOA-BRD1-R10-M20261005155254(#199, RM 345.60) 발행 → paid(브랜드 PATCH 경로, 자식·발주 paid, 불일치 0, 메일 help@k-dine.com 1통). #162 는 Irene 이 22:46 Confirm → paid
- **#5** (백업 20261005_184839 · 스모크 10/10 · skip 파일 그대로) — 정산서 자동 발행 «이어서 내기»(수동 정산서 있는 주기도 남은 미묶음만 발행, soaScheduler planAutoCycle `afterManual`) · health-check 임시 계정 `@example.com`(반송 메일 원인 — dev 가 zzhcobhmuv…@outlook.com 으로 실제 발송) · `migrate-merge-product-mirrors` 재고 남은 쌍은 건너뛰고 목록(첫 시도 18:33 이 K-Bulgogi 로 중단·자동 원복)

### 다음 확정 작업 (Irene 지시)
1. ~~**키오스크 결제 분리**~~ — ✅ 완료·운영 배포 SW 5.89(10-07, 위 «완료» 절) · 남은 것: 카드단말기 실기 GHL 파일럿 날 (Irene 2026-10-06 「지금 모바일오더랑 키오스크를 분리해야 맞지」「fable 에게 다음 작업으로 남겨두자」. 10-06 Fable 한도로 미수령) [Claude Code]
   - 실측: 키오스크 = 모바일오더 표시 모드(`mobile/utils/kioskMode.ts`, `?kiosk=1` sessionStorage) → 결제수단 목록 동일(`mobile/pages/PaymentPage.tsx:861` `availableIn.includes('mobile')`). 설정 채널은 pos·mobile 2개뿐. 카드단말기는 POS `PaymentModal`+`utils/nativeEcr.ts`(앱 브릿지 `__NATIVE_ECR`)에만, mobile/ 호출 0건. 기기 등록(페어링) 모델 없음
   - Irene 추가 원문(10-06): 「포스터미널처럼 고객이 키오스크로 주문해야 해. 그리고 플로우플랜에서도 결제 문제없는 거지? 어차피 포스로 가는 거니까.」 → 실측: FloorPlan·LiveOrders·POSTerminal 모두 같은 `components/POSTerminal/PaymentModal.tsx`(단말기 조건 = card + 설정 card.terminal + 앱 브릿지 + 온라인) → 키오스크 «카운터 결제» 주문은 FloorPlan 에서 단말기 결제 가능(현재도)
   - Irene 질문 3개: ①키오스크에서 카드단말기 결제 ②키오스크·모바일 결제수단 따로 설정 ③손님 폰에는 키오스크를 안 열어주고 모바일 결제만 — 어떻게 구분하나
   - Opus 의견(Fable 판단 아님, 참고): 주문 흐름은 하나로 두고 결제만 분리 · 설정에 «키오스크» 채널 추가(기존 매장은 모바일 값 복사로 무변화) · 판정은 URL 아닌 **등록된 기기 토큰**(키오스크 태블릿=앱+매장 등록, 서버가 토큰 없으면 모바일 수단만·단말기 결제 거절) · 단말기 처리는 기존 `services/terminalPayments.js` 공유
2. ~~K-Bulgogi 1kg 정리~~ — ✅ 완료(10-07, 위 «완료» 절) · K-DINE 쪽 3건은 Irene 몫
3. ~~영수증 드래그·PDF~~ — ✅ 완료·운영 배포 SW 5.89(10-07)
4. ~~발행자 청구서 «To Confirm» 탭 + 업무 버튼 색 규칙~~ — ✅ 완료(10-07, 위 «완료» 절) · 개발서버만, 운영 배포 대기
5. ~~**결제 설정 = 계정(회사) 하나**~~ — ✅ 완료(10-07, 위 «완료» 절) · 개발서버만, 운영 배포 대기(배포 시 데모 브랜드 2건만 정렬)
6. **판매자 배송 지역별 설정** — 설계부터
7. (10-04 잔여) 외부 공급업체 월별 SOA 대조 · 발주 스탭밀 구분 · 승인 메일 문구(외부 공급업체에 «보냈습니다» 거짓)

### 👉 Irene 님 확인·결정 대기
- 운영 SOA 3건(#162·#188·#2xx) restaurant_id NULL 보정 — Fable 권고 채움, 이름 표시는 이미 정상이라 급하지 않음(승인 시 실행)
- 상품 카테고리 정리: «Alcohol» 에 IKEA LED String Light · Sawah Mas (Staff Meal) · Kimchi 1kg — 보고서에 그대로 나옴
- 단말기(5.85) BUSY 자동 대기 실기 확인 · 판매자 «배송 준비 목록» 1회 · 역할 추가 요청 실제 1건 · 상품 16(K-Yukgaejang Beef) 45g/pack 수정 건
- GHL: UAT 근무시간 · 직불(D007)·DuitNow QR

### 후속 후보 (아이디어 메모, 확정 X)
> /개발시작 자동 추천 대상 아님. 다음 사이클 결정은 Irene 지시 기준.
- **(Fable 소급 판정 위험 A · 보안 경계 — 별도 사안 설계 필요)** PATCH `/invoices/:id/status` 로 낼 매장이 금액 있는 자기 정산서를 API 직접 호출로 paid 처리 가능(정산서에 restaurant_id 가 채워지면서 넓어짐, 묶인 청구서도 따라감). 화면은 0원 확정에만 사용. 2026-09-14 «낼 쪽 PATCH paid 는 0원만» 예외와 같은 선으로 좁힐지 Fable 설계
- (Fable 위험 B · 기계 작업) health-check 에 정산서 연동 4길(submit·confirm·reject·PATCH)·`/brand/sales-report` 범위 403 케이스 추가
- 하드웨어 청구서가 payer_type 'restaurant' 에 사람 번호를 넣는 생성 쪽 불일치(routes/hardware-quotes.js:234) — 데이터 보정 동반, 별도 판정
- 푸드코트·시스템관리자 정산서 상세에도 묶인 청구서 표(이번엔 브랜드만)
- 브랜드 보고서 범위 검사 고장주입 반증 미실시(403 실측만) · Mark paid 수정 전 코드 실패 반증 미실시
- invoice soaChildSync childRuleFor 의 'pending'·'sent'·'rejected' 는 ENUM 에 없는 죽은 값(Fable 지적 — 해 없음)
- K-Jjajang Sauce 1kg(ing#95) 비활성 재료를 레시피 3줄이 가리킴(운영, 합치기 마이그 목록)
- Fable 조건(5.84): jest context-requests ⑨ 와 user-contexts-switch rid 18 공유 · BUSY 외 4xx 대기 · declined H400 행 · base64 영수증 소급 · po-qty-step TOKEN_FILE · Windows 설치본 재빌드 · /docs SEO nginx

### 주요 변경사항
- Git: 2026-10-07 /개발완료 커밋(5.87·5.88 코드 + 기록). 영수증 작업은 저장소 밖 보관
- 운영 데이터 처리(10-05): brands#2 payment_settings · SOA#188 자식 10건 paid(오전) · SOA#199 발행·paid(저녁)

### 완료된 작업 (2026-10-05 오전 · #1~#3) [Claude Code]
- **#1 SW 5.83 오너 대리 발주** (백업 20261005_052507 · Fable PASS · 커밋 760c8c886) — 오너가 소유 매장을 골라 그 매장 자격으로 발주·제출·취소, 오너 제출=승인 생략. buyerScope OWNER_ACTING_ROUTES · applySubmitGate actor · 화면 매장 선택 먼저
- **#2 SW 5.84** (백업 20261005_072313 · 마이그 2 · Fable PASS 조건 4 · 커밋 fea0a4e92) — 역할 추가 요청(Staff 포함, user_context_requests·user_contexts.permissions) · 발주 최소주문 강제(MOQ 1=미설정) · 판매 상품 연결 환산에 팩 용량 · 판매 상품 등록 화면 설명·미리보기·재고단위 칸 제거 · 단말기 거절 뒤 Confirm 잠김·BUSY 제목
- **#3 SW 5.85** (백업 20261005_093553 · 스모크 10/10 · Fable PASS 재도장 2회 `.claude/fable-verdict-20261005-terminal-busy-gate.md`) — 단말기 BUSY 자동 대기(3초 간격 최대 60초, «단말기에서 DONE 을 눌러 대기 화면으로 → 자동 시작», Stop waiting) · 판매자 받은 주문 «배송 준비 목록 (가격 없음)» WhatsApp 버튼. 운영 확인: sw 5.85 · ko 문구 2종 서빙 · online
- 카드 단말기 GHL UAT: 10-05 운영 첫 승인(VISA 346631·254719, GrabPay QR 1건 → 이월렛 grabpay 기록). 10-04 B0 = 일요일(UAT 근무시간 외). 승인 직후 다음 결제 BUSY = 단말기 DONE 대기 화면 → 5.85 로 대응
- 운영 데이터 직접 수정 2건(Irene 긴급 지시): ① brands#2(K-DINE).payment_settings ← brands#1 값(비어 있을 때만, 되돌리기 = #2 칸 NULL) ② SOA-BRD2-R8-M20260929173419(#188) 하위 청구서 10건 payment_submitted→paid(paid_at·confirmed_at = SOA paid_at, confirmed_by 23). 연결 발주 10건은 이미 paid


---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
