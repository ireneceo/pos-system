# Changelog

> 배포 전 개발 내역을 추적합니다. `/개발완료` 시 자동 추가, `/배포` 시 버전으로 이동.

---

## [Unreleased] — 미배포 (개발서버만)

### 2026-06-22
- 재고 — 재고 편집 화면에서 "공급업체 상품 연결"을 누르면 연결 팝업이 편집창 뒤로 가려지던 문제 수정(이제 앞으로 뜸).
- 외부공급업체 상품 등록 — 솔루션을 안 쓰는 외부 공급업체(동네 정육점 등)의 상품을 매장이 직접 등록·관리할 수 있게 함. ① 공급업체 프로필에서 상품 추가/수정/삭제, ② 재고(Stock Item)에서 "Register on external supplier"로 공급업체명·가격만 입력하면 등록(이미 있는 공급업체는 입력 시 검색돼 재사용, 없으면 자동 생성). 등록한 상품은 발주 화면에 떠서 바로 발주 가능. (레스토랑 관리자 우선, 브랜드/푸드코트는 후속)
- 발주 화면 — 브랜드/푸드코트에서 연결한 재고(Stock Item)가 발주 목록에 안 뜨던 문제 수정. 입고 발주 목록이 '오늘'로만 걸려 과거 발주가 안 보이던 것 → 전체 기간 기본.
- 인보이스 — '결제대기' 탭의 기간 필터를 전체(All) 기본으로(한 달 넘은 미결제 인보이스가 가려져 결제 누락되는 것 방지). 모든 역할 적용.
- 재고 — 재고 편집 화면 안에서도 공급업체 상품 연결·외부공급업체 등록이 가능하도록 추가.
- 공급업체 목록 — 직원(Staff) 계정에서 공급업체 행의 수정/삭제 버튼이 안 눌리던 문제 수정.
- (내부) 브랜드 재료 목록에 다른 매장 재료가 섞여 보이던 데이터 노출 문제 차단.

### 2026-06-21 (운영 피드백 Round2)
- 발주 오너 승인 — 오너가 연결된 매장에서, 레스토랑이 만든 발주를 공급처로 보내기 전에 오너가 승인/반려하는 과정을 추가. 오너 전용 '발주 승인' 화면(승인 대기 목록, 승인·사유 입력 반려), 사이드바 대기 배지, 매장 설정의 '발주 오너 승인 필요' 토글(오너 연결 시 기본 켜짐). 반려 시 사유와 함께 작성자에게 알림. (브랜드/푸드코트의 공급처 발주는 레스토랑 발주와 완전히 동일한 화면·구조 — 한쪽 수정이 양쪽에 함께 반영됨을 확인)
- 메일 발신전용 안내 — 시스템에서 보내는 모든 이메일 하단에 "발신전용·수신 불가" 안내를 추가(4개 언어). 매장이 자체 메일서버로 보내는 메일에도 동일 적용.
- 문의 목록 가독성 — 시스템 문의 목록에서 본문을 두 줄로 줄여 표시(전체 내용은 클릭해 상세에서 확인).
- (내부) 주간 이미지 점검 알림이 플랫폼 운영자에게만 가도록 수신 대상 제한(매장 계정 노출 차단).

### 2026-06-21
- 쿠폰 (다매장) — 푸드코트/브랜드 관리자가 산하 매장에 쿠폰을 "전 매장" 또는 "선택 매장"으로 한 번에 발행. 쿠폰 코드·할인(%/금액)·최소주문·사용한도·유효기간 설정, 적용 매장 선택, 목록에서 수정·삭제. (기존 빈 화면이던 쿠폰 페이지를 실제 기능으로 신축)
- 데모/운영 버그 수정 — 푸드코트·브랜드·오너 화면에서 보고된 다음 항목 정상화:
  - System Inquiry(시스템 문의) 등록이 일부 분류 선택 시 실패하던 문제
  - 브랜드 레시피 분류 등록 실패, 브랜드 메뉴의 'Linked Recipe' 목록이 비어 보이던 문제(메뉴와 레시피가 다른 브랜드를 가리킴)
  - Restaurant Admin 추가 시 매장 선택이 강제되어 가맹점 배정 전 관리자 생성이 막히던 문제(매장 선택 선택사항으로)
  - Restaurant Admin 비활성화(Deactivate)가 동작하지 않던 문제
  - 오너가 매장을 추가해도 목록에 안 보이던 문제
  - 운영 문의(Operation Inquiry) 상태 변경이 항상 'closed'로 저장되던 문제
  - 공지 'Send to Work Manuals'(작업 매뉴얼로 보내기)가 반응 없던 문제
- 시재관리 — 'Today's Cash Drawer' 버튼이 안 열리던 문제 수정 + 시재관리 페이지에 팝업과 동일한 현재 드로어 잔액(개시현금+입금−출금) 표시로 계산 일치.

### 2026-06-20 (백스테이지 운영 배포 완료 — Backup 20260620_193147, Smoke 9/9, 버전 미상승)
- 시재관리 — 파이널 마감 확정 시 현금 차이(과부족)를 시재 입출금 내역(원장)에 자동 한 줄 기록("Cash over/short at settlement", "마감 조정" 표시, 수정/삭제 불가). 통장식으로 차이까지 추적. (cash_movements.source 컬럼 신설)
- 시재관리 — "오늘" 필터가 매장 타임존 기준으로 계산되도록 수정(서버 UTC가 매장 새벽이면 당일 입출금이 화면에서 누락되던 버그). 라이브오더에서 넣은 현금 내역이 즉시 보임.
- (백스테이지) 표·목록 액션 아이콘 버튼을 라이브오더와 동일한 정사각 회색 버튼으로 통일(공용 IconButton 단일 수정).
- 할인 PIN 승인 수정 — 매장 설정 '할인 PIN 필수' ON 시 POS 금액할인·% 할인·결제창 할인 모두에서 PIN 승인 모달이 뜨도록(기존엔 정책버튼 경로만 검사해 실제 할인엔 안 떴음). (Backup 20260620_195910, Smoke 9/9, 버전 미상승)

## [v3.60] — 2026-06-20 배포
- 직원 PIN 로그인 — 공용 단말에서 직원이 이메일/아이디 없이 PIN만으로 로그인. 온스크린 숫자패드(터치), 단말이 매장 기억. PIN 입력 횟수 제한으로 무차별 추측 차단.
- 시재관리(현금 드로어) — 개시현금(직전 마감현금 자동 제시), 영업 중 현금 입금/출금, 현재 시재(개시+입−출) 한눈에. 카운터(POS) 권한 직원도 사용.
- 최종 마감(Daily Settlement) — 마감자가 카드 단말기 배치 정산·현금·이월렛을 실물 확인 후 결제수단별 실제 금액을 입력하면, 시스템 예상과 비교해 수단별 차이(과부족)를 표시. 마감 확정 시 Z-Report 출력 + 마감현금 다음날 이월. 지난 마감 이력 조회·Z-Report 재인쇄.
- 예약 ↔ 플로어플랜 연결 — 예약에 플로어플랜 테이블 배정, 임박한 예약은 플로어플랜에 "예약됨" 표시. 손님 도착(체크인) 시 해당 테이블 POS 자동 열림 + 인원 자동 입력, 주문 결제 완료 시 예약 자동 완료. 같은 테이블·시간 이중예약 차단. 설정에서 표시 리드타임 조절.
- 취소/삭제 사유 — 아이템 삭제·주문 취소 시 사유 입력을 매장 설정(끔/선택/필수)으로 관리. 손실방지 기록에 저장.
- (백스테이지) 보안 강화 — 직원 명단·PIN, 메뉴 대량입력 등이 다른 매장에서 접근되던 교차 매장(IDOR) 취약점 차단. 서버 크래시 방지 가드 추가.
- (백스테이지) PayPal 결제 알림 노이즈 — 미사용 매장에 봇이 보내던 가짜 요청 알림 메일 중단(요청은 기존대로 차단).

## [v3.59] — 2026-06-19 배포

### 2026-06-19 (운영 배포 완료 — Backup 20260619_065629, Smoke 9/9)
- 운영시간(요일별) + 라스트오더 — 매장이 요일마다 영업시간과 라스트오더 시각을 설정하면, 모바일 고객 주문이 영업시간 외·라스트오더 이후 자동으로 막힘. 마감 화면엔 메뉴는 보이되 주문 버튼 비활성 + "오늘 휴무 / 오전 11시 오픈" 안내. POS(카운터) 주문은 영향 없음.
- 픽업 예약 시간 유도 — 픽업은 막지 않고, 선택 가능한 픽업 시간을 매장 운영시간에 맞춰 제시(마감이어도 다음 영업일 시간으로 미리 주문 가능).
- 취소/삭제 사유 — 아이템 삭제·주문 취소 시 사유 입력을 매장 설정(끔/선택/필수, 기본 필수)으로 관리. 사유는 손실방지(취소·삭제) 기록에 저장돼 누가 왜 취소했는지 추적. 라이브오더·플로어플랜 모두 동일 적용(기존에 플로어플랜은 사유 없이 바로 취소되던 것 보완).
- 발주 통화 오류 수정 — 레스토랑이 본사(Brand)에 발주할 때 RM과 MYR을 다른 통화로 인식해 "통화 불일치"로 막히던 문제 수정(RM = MYR, 같은 통화).
- 업로드 이미지 파일명 영어화 + 다국어(4개 언어) 표기 보강 — 업로드 이미지 파일명을 항목명 기반 영문으로 정리, 미사용 이미지 정리 도구 추가, 화면 곳곳의 다국어 누락 보강.
- (백스테이지) QZ 프린트 진단 글이 매장 문의함에 쌓이던 것 분리(관리자 전용), 존재하지 않는 테스트 주소로 메일이 나가 반송되던 것 차단.

## [v3.58] — 2026-06-18 배포

### 2026-06-18 (운영 배포 완료 — Backup 20260618_010728, 위 데모/floor-plan 누적분 함께 배포)
- 브랜드 메뉴 순서를 카드 드래그로 변경 — "Menu order" 정렬에서 각 메뉴 카드 손잡이를 끌어 순서 지정, 즉시 저장(기존 숨은 화살표 방식 제거).
- "메뉴 순서 고정" 토글 — 본사(Brand) 설정에서 한 번에 켜고 끄면 산하 모든 매장이 브랜드 메뉴 순서를 그대로 따름(메뉴별 체크박스 제거로 혼란 해소).
- 목록 화면이 새로고침될 때 맨 위로 튀던 문제 수정 — 본사/푸드코트/공급사/리포트/주문/예약/관리자 등 전반에서 보던 위치 유지.
- 브랜드 메뉴 이미지 업로드 오류 수정 — www 주소(www.purplehere.com)로 접속했을 때 업로드가 차단되던 문제 해결. 이제 www·일반 주소 모두 정상.
- (운영 데모 데이터 정리) 데모 매장 취소 주문에 남아 있던 인쇄 대기 플래그 39건 정리 — 데모 매장 한정, 실매장 무관.

### 2026-06-16 (데모 리포트 14건 전수 수정 — v3.58로 운영 배포 완료)
- 본사(Brand)·푸드코트 관리자가 가맹점 직원/관리자 계정 정보를 수정·비활성(Deactivate)할 수 있도록 정상화 — 권한 부족으로 막혀 있던 것 해제. 비활성 계정은 로그인 차단, 본인 계정은 비활성 불가.
- 관리자 추가 시 매장 선택을 필수에서 선택으로 — 매장 미배정 관리자도 등록 가능.
- 결제 QR 코드 업로드에 정사각형 검증 추가 — QR이 아닌 가로/세로 사진을 올리면 경고. 결제창에 엉뚱한 이미지가 뜨던 문제 예방.
- 본사(Brand) 인보이스 카테고리 생성 버튼 정상화.
- 푸드코트 매장 추가 화면에 소속 푸드코트 자동 연결, 공급업체 직접 추가 가능.
- 인벤토리 등 관리 테이블 헤더 모서리가 어긋나 보이던 것 정리(둥근 모서리 클립).
- 상품 등록 폼에서 'After meal' 항목 제거, 본사 상품 '판매 범위' 한글로 보이던 것 영문화.
- 공지 등록 오류(작성자 정보 누락) 수정.

### 2026-06-15 (운영 배포 완료 — 버전 미상승 backstage/security/UI)
- 본사↔가맹점 월 청구(SOA) 정상화 — 월 명세서 자동 발행이 내부 오류로 매번 실패하던 것 수정(발행자 정보 누락). 이제 발주→거래 인보이스→월 명세서 자동 발행이 정상 동작. (Backup 20260615_161034)
- 월 명세서 "지금 생성" 버튼 — 본사(BG)/푸드코트(FG)가 매월 1일 자동 발행을 기다리지 않고, 매장별 결제조건 화면에서 미청구 거래를 즉시 한 장의 명세서로 발행. (BillingTermsModal, 멱등)
- 소켓 인증 하드닝 Phase B (모니터 모드) — 라이브 주문/주방/고객결제 실시간 채널에 로그인 인증 + 매장별 접근 검증 추가. 모니터 모드로 배포(동작 무변경, 토큰 채택률만 관찰). 매장 도달 확인 후 SOCKET_AUTH_ENFORCE 강제 전환 시 타매장 주문 열람 구멍 차단. (Backup 20260615_133815, 검증 모니터 2/2+강제 5/5)
- 라이브 오더 상태 탭 태블릿 표시 — 1024 태블릿에서 상태 필터 탭(8개)이 가로로 잘려 스크롤되던 것을 2줄로 펼쳐 모두 보이게 수정(데스크톱은 1줄 유지). LiveOrders+ReservationsTimeline 적용. (Backup 20260615_084256)
- (운영 데이터) The Fire 주문내역 삭제 — Irene 요청. thefire01 지난주(6/8~) 16건 + thefire02/03 전체 삭제(빈 내역). 32건 hard delete + 백업 보관(/var/www/backups/thefire-*-20260615.json)

### 2026-06-13 저녁 (운영 배포 완료 — 버전 미상승 backstage/security)
- 소켓 인증 하드닝 Phase A — 라이브 주문 소켓에 로그인 토큰 전송 시작(동작 무변경, 매장 간 데이터 격리의 1단계). Phase B(서버 강제)는 매장이 새 버전 받은 뒤. (docs/SOCKET_AUTH_HARDENING.md)
- (운영 데이터) The Fire 공지 누락 수정 — trial 실고객이 '테스트 계정'으로 잘못 분류돼 공지·청구에서 빠지던 것 정정 → 공지 정상 수신
- (인프라) Cloudflare sw.js 캐시 퍼지 — 매장이 5/30 옛 버전에 묶여 있던 것 해소, 최신 버전 전달 복구

### 기획설계 (구현 대기)
- 소켓 인증 Phase B — 백엔드 인증 강제(`io.of().use()` JWT + userCanAccessRestaurant). 매장이 Phase A 받은 뒤. (docs/SOCKET_AUTH_HARDENING.md)

---

## [v3.57] — 2026-06-15 배포 (브랜드메뉴 레스토랑 적용범위 · Backup 20260615_055313, smoke 9/9)

> 운영 DB 마이그(선적용): products.brand_scope_active + brand_menus.scope_mode + brand_menu_restaurants 테이블 (additive, 하위호환 — 기존 상품 758/758 노출 유지). 안전게이트 print-guard 8/8 + health 101/101 + 주문 생명주기 21/21 + scope 19/19 통과.

### 본사(브랜드) 사장
- 브랜드메뉴 적용 매장 선택(Scope) — 메뉴마다 "전체 매장" 또는 "지정 매장만" 적용을 선택. 직영점에 신메뉴를 먼저 시도하고 다른 가맹점엔 안 보이게 할 수 있음. 메뉴 카드의 Scope 버튼.
- 범위에서 매장 빼기 = 숨김+보존 — 매장에서 메뉴가 사라지되 데이터(가격 편집·주문 이력)는 보존, 다시 넣으면 복원
- 적용 범위(본사 결정)와 활성화(매장 ON/OFF)를 분리 — 노출 = 범위 안 + 매장 활성화 둘 다일 때만
- 브랜드 설정 → 새 메뉴 기본 범위(전체/지정) 선택 (브랜드 운영 방식에 맞게)

---

## [v3.56] — 2026-06-13 배포 (삭제/취소 PIN 게이트 + 6/12 오후 배포분 버전 반영 · 공지/블로그 발송 완료)

> 마지막 공지가 v3.54라 v3.55 미공지분 + v3.56을 묶어 공지/블로그 발송(2026-06-13, 수신 8명·The Fire 4/4). 공지 본문은 공통/역할별로 정리.
> 공지 수신 복구: The Fire(실 trial 고객)가 `is_test=true`로 잘못 분류돼 공지·청구에서 빠지던 데이터 오류 수정 — User 8 + Restaurant 3(r16/24/25) is_test=false. (코드 변경 아님)

### 매장 사장 (운영)
- 주문 삭제·취소 PIN 보호 — 직원의 품목 삭제·주문 취소 전 매니저 PIN 요구(손실 방지). 설정 → Operations(할인 PIN 옆). 모든 삭제·취소는 리포트 'Void & Cancel Log'에 금액·결제상태·승인자 기록(Owner/Admin 전용). 인쇄 파이프라인 무접촉(print-guard bless 완료)
- 통합 오더티켓 스테이션 범위 — 저장해도 "풀오더"로 되돌아가던 문제 근본 수정(getter 키 보존 + settingsGuard + 인쇄용 데이터 보강)
- 모바일 주문 후 테이블 유지 — 테이블 QR 손님 추가 주문 시 테이블 재입력 불필요(주문 완료가 테이블까지 지우던 것)
- 모바일 테이블 선택 — 번호 입력 시 화면 확대로 레이아웃 밀리던 것 수정(iOS 자동확대 차단)

### 본사 (브랜드)
- 브랜드메뉴 카드 — 사진 없을 때 메뉴 이모지 표시(회색 아이콘 대신)

### 공통 (안정성)
- 스탭 로그인/PIN 전환 크래시 수정 — 이메일 없는 스탭(PIN 전용)이 로그인·전환 시 앱 전체가 죽던 문제
- 시작 크래시 자동 복구 — 켜자마자 죽으면 캐시·서비스워커 1회 자동 삭제 후 재시도(로그인 유지)
- 업데이트 전달 우회 — Cloudflare 잘못 캐시된 옛 서비스워커(5/30)를 빌드별 주소로 영구 우회

### 백스테이지 (공지 비노출)
- 본사 계정 구독 — 미래 시작 계정을 항상 trial 처리(시작 전 정지/즉시청구 갭 방지, thefire 본사 사례)
- 주방 인쇄 대기열 — 삭제 주문 티켓 재인쇄 제외(유령 티켓 방지)
- 잠복버그 — 할인 PIN 설정(requirePinForDiscount)이 settingsGuard 화이트리스트 누락으로 저장 시 stripped 되던 것 수정(requireVoidPin과 함께 등록)

---

## [v3.55] — 2026-06-12 배포 (실시간 동기화 통일 + 세트전용 메뉴 + 통합티켓 범위 · Backup 20260612_063050, smoke 9/9 · 운영 demo 실검증 13/13)

### 2026-06-12
- 전 화면 주문 단계 실시간 동기화 통일 — 라이브오더/플로어플랜(테이블맵·아이템리스트·테이크아웃)/주방화면이 같은 데이터로 즉시 동기화. 어디서 단계를 바꾸거나 되돌려도 전 화면 2초 내 반영(리프레시 불필요)
- 주문 단계 규칙 통일 — 주문 단위 이동 시 아이템(세트 구성품 포함)이 같이 이동(되돌리기 포함), 아이템 단위 진행/되돌리기는 주문 단계에 자동 반영
- 주방 디스플레이 실시간 수신 복구 — 새 주문/단계 변경이 30초 기다림 없이 즉시 표시되도록 근본 수정
- 주방 디스플레이 아이템보기 — 준비시간 신호등(N분 남음/+N분) 표시 + 긴 메뉴명에 버튼이 밀려나던 레이아웃 수정
- 테이블 이동 머지 안내 — "Orders Merged"로 표기(어느 주문/테이블에서 합쳐졌는지 명시, 추가주문과 혼동 제거)
- 세트 전용 메뉴 설정 — "세트 전용(단품 판매 안 함)" 토글. POS·모바일 주문에서 숨김(전부 세트전용인 카테고리는 탭째 숨김), 세트 구성·주방 라우팅은 정상. 브랜드메뉴에도 동일 설정 + 푸시/동기화 전파
- 주방스테이션 배정 정리 — 세트메뉴는 배정 목록에서 제외(구성품이 라우팅), 카테고리 방식 전환 시 옛 개별 배정 자동 정리 + 예외는 경고 표시
- 통합 오더티켓 — 워크스테이션별 주방 스테이션 범위 선택(예: 주방엔 바 메뉴 제외 티켓). 미선택=전체 주문
- 브랜드메뉴 이미지 깨짐 근본 수정 — 이미지를 참조 대신 복사 소유 + 매장 수정이 브랜드 파일을 지우지 못하게 보호 (The Fire 3개 매장 죽은 참조 정리, BG 이미지 재업로드 1회 필요)
- (운영 데이터) thefire02 주방스테이션 옛 개별 배정 97건 정리 — 카테고리 라우팅이 정상 적용되도록

### 2026-06-11
- 통합 주문티켓 4건 수정 (운영 배포됨, Backup 085310) — 토글 안 한 메인 POS 오발행 차단 / 티켓 상단 라벨을 워크스테이션 이름으로 / 주문·아이템 취소도 동일 규칙으로 통일
- 테이크아웃을 테이블 손님에게 추가 주문해도 테이크아웃으로 유지 (기존엔 매장식사로 합쳐져 Takeout 목록에서 사라짐)
- 테이크아웃에 테이블 번호가 있으면 Takeout 목록에 "Table B-4" 표시 (해당 테이블로 갖다주기)
- 주방 디스플레이 — 세트 구성품 단계가 새로고침마다 초기화되던 문제 수정
- (설계) 전 화면 주문 단계 실시간 동기화 통일 설계 문서 작성 — 화면 간 단계 불일치/새로고침 필요 근본원인 정리

### 2026-06-10 (운영 배포 3회 — Backup 071746/084756/105904, 버전 미상승)
- 카운터 주문 영수증/주방티켓 — 새 주문 시 중복 2장 인쇄되던 문제 해결 (티켓 정확히 1장)
- 통합 주문티켓 — 각 POS(카운터)별로 "전체 주문 티켓 보내기" 토글 제공. 여러 POS면 각각 켜기. 자유입력 주소 제거
- 지점 등록 시 미래 시작일 지정 시 자동 트라이얼 + 시작일부터 청구 (즉시 청구되던 버그 수정)
- 이메일 알림 로고가 일부 계정에서 깨져 보이던(?) 문제 수정
- 브랜드 레시피 — 여러 브랜드 소유 시 레시피 등록이 안 되던 문제 수정 (메뉴 'Linked Recipe' 정상 표시)
- 테넌시 계약 화면 — Archive 갔다 돌아오면 보기 방식이 바뀌던 문제 수정
- 인벤토리 표 헤더가 화면 크기 조절 시 어긋나던 문제 수정
- 모바일 주문 메뉴 — 인기/추천 탭이 첫 탭인데 둘째 탭이 기본 선택되던 문제 수정
- POS — 필수 옵션이 있는 상품은 카드 클릭 시 옵션 선택창이 뜨고, 옵션 미선택 시 주문 불가
- POS — 현금박스 자동 열림이 현금결제에만 작동하도록 변경 (카드결제 시 안 열림)
- (인프라) 운영 sw.js 캐시 정책 수정 — 앞으로 화면 업데이트가 매장에 더 빨리 반영됨

### 2026-06-09 (저녁 — 운영 배포했으나 실프린터 검증 실패 → 설정 OFF, 버전 미상승)
- 통합 오더티켓 재구조 — 별도 폴러 제거 + 주방인쇄 미러를 지정 프린터로 1장 발행. **운영 배포(Backup 20260609_130201, print-guard bless)했으나 실프린터 테스트 실패**: 통합티켓 안 나옴(설정 주소 "MASTER"가 실제 프린터 아님) + BAR 2장 중복. → thefire02/03 통합티켓 **설정 OFF로 임시 안정화**(스테이션 티켓만). 제대로 고치기(실프린터 목록 선택식)는 다음 세션. memory `project_consolidated_ticket_prod_fail`
- 테이블 이동 대상 목록에서 고정요소(키친/입구/카운터 등) 제외 — 실제 테이블만 선택지로 표시 (배포됨)

### 함께 배포된 이전 dev 분 — 참고
- 구독 시작일/트라이얼 코드 수정 — 미래 시작일 지정 시 트라이얼 자동 + 시작일부터 청구. 백엔드(restaurants-crud create/update) 완료, 프론트(Manager/RestaurantsPage:991) 미완. 결제/청구 코드라 실API 검증 후 배포. memory `project_thefire_billing_trial_fix`

---

## [v3.54] — 2026-06-09 배포 (통합 오더티켓 + 자동인쇄 미리보기 다국어 · Backup 20260609_103649, smoke 9/9)

- 통합 오더티켓(Consolidated Order Ticket) — 한 주문의 전체 품목을 한 장의 티켓으로, 원하는 프린터 한 대(예: 주방 메인 프린터)로 인쇄하는 기능 추가. 설정 → 프린터의 새 카드에서 사용 on/off, 보낼 프린터 선택(테스트 인쇄 포함), 새 주문 시 자동 인쇄를 설정. 기존 스테이션별 주방 티켓과 **함께** 인쇄되며 대체하지 않음(스테이션=품목 분배, 통합=전체 한 장). 기본값 OFF — 켠 매장에만 동작
- 자동 인쇄 미리보기 다국어 — "자동 인쇄 미리보기" 버튼이 선택한 언어 하나로만 표시되도록 정리(이전엔 한/영 이중 표기), 미리보기 화면 안의 모든 문구를 영어·한국어·중국어·말레이어로 번역(이전엔 한국어로 고정 노출되던 문제 해결)

---

## [v3.53] — 2026-06-09 배포 (프린터 원클릭 설치 + 설정 화면 3단계 정리 · Backup 20260609_084352, smoke 9/9)

- 프린터 원클릭 설치 — 설정 > 프린터의 「프린터 설치 파일 받기」 버튼 하나로 끝. 받은 파일을 더블클릭하면 인쇄 프로그램(QZ Tray) 설치 + 인증서 자동 신뢰 + 실행까지 한 번에 처리. 더 이상 외부 사이트(qz.io) 방문, 인증서 수동 이동, 인쇄 때마다 뜨던 "허용" 팝업이 필요 없음. 기기당 한 번만 실행
- 프린터 설정 화면 3단계로 정리 — QZ Tray 안내를 ① 설치 → ② 연결 확인 → ③ 프린터 찾기 순서의 번호 단계로 재구성. 중복되고 영어로만 나오던 안내 블록을 제거해 혼란을 없앰
- 프린터 안내 다국어 정리 — 프린터 설정 문구를 영어·한국어·중국어·말레이어 4개 언어로 정리(이전엔 일부 안내가 언어 설정과 무관하게 영어/한국어로 고정 노출되던 문제 해결)

---

## [v3.52] — 2026-06-09 배포 (멀티지점 브런치명 입력 + 매장 추가 폼 필수항목 정리 · Backup 20260609_071746, smoke 9/9)

- 멀티지점 브런치명(Branch Name) 입력 — 같은 레스토랑명을 쓰는 여러 지점을 구분할 수 있도록 매장 추가/수정 폼에 브런치명 입력란 추가(예: 더파이어 Bukit Bintang / Sunway Pyramid). 브랜드 제너럴이 입력하며, 매장 목록 카드에 지점 배지로 표시
- 매장 추가 폼 필수항목 정리 — 레스토랑 이메일·전화번호를 선택 입력으로 변경. 계정 생성과 무관한 단순 매장 정보인데 필수처럼 별표(*)가 붙어 있던 것을 해제(실제로는 빈 값도 저장되던 표시상의 오류). 계정 생성용 Admin 이메일은 그대로 필수 유지

---

## [v3.51] — 2026-06-08 배포 (메뉴/아이템 시간제한 스케줄 + 카테고리 이모지 피커 + Settings 모바일주문 정돈 + 출시 하드닝 Phase 1~3 · Backup 20260608_190859, smoke 9/9)

- 메뉴 카테고리 가용 스케줄 — 카테고리별로 요일·이벤트 기간(시작/종료일)·하루 시간대를 설정해 모바일 메뉴에 자동 노출/숨김. 매장 타임존 기준 평가. 표시 방식은 숨김(hide) 또는 비활성(회색·주문불가) 선택
- 아이템별 시간제한 스케줄 — 개별 메뉴 아이템에도 동일한 스케줄 적용(카테고리와 함께 평가, 아이템이 더 구체적이면 우선). 메뉴 관리 추가/수정/세트 모달 + Settings 양쪽에서 관리
- Settings 모바일주문 탭 정돈 — Popular "Source Categories"를 Show Popular 토글 아래로 중첩, 카테고리·아이템 시간제한을 반응형 2열로 묶음, Item Time Restrictions 중앙관리 추가
- 브랜드 카테고리 이모지 피커 — 브랜드 메뉴 카테고리 이모지를 텍스트 입력에서 레스토랑과 동일한 60개 그리드 피커로 통일
- (백스테이지) 첫 유료 멀티지점 브랜드 출시 전수감사 + 보안 하드닝 (설계: docs/OPERATIONAL_READINESS_AUDIT.md §8)
- (백스테이지) 지점 간 데이터 격리 강화 — 한 지점이 다른 지점의 주문·쿠폰·옵션·설정을 보거나 수정하지 못하도록 차단 (멀티테넌시 IDOR)
- (백스테이지) 미인증 대시보드 집계 누출 차단 — 사용 안 하던 레거시 통계 라우트 폐기
- (백스테이지) 요금제 게이팅 — 재고·레시피·재료 등 Advanced 기능을 요금제에 포함된 매장만 사용하도록 API 차원에서 적용(브랜드 지점은 브랜드 플랜 권한도 합산 인정). 기존 사용 매장 영향 0건
- (백스테이지) 결제 정확성 하드닝 (Phase 3) — 브랜드·푸드코트·오너가 구독을 정상 결제하면 정지(suspended) 상태가 즉시 해제되도록 복구 처리 (이전엔 지점 단위만 복구되어 엔티티 계정이 영구 차단될 수 있었음)
- (백스테이지) 결제 보안 — 서명 검증이 안 된 PayPal 결제 알림(webhook)은 거부(fail-closed), 게이트웨이가 보고한 실결제액이 청구액보다 적으면 결제완료 처리를 보류, 청구서 합계가 음수로 떨어지지 않도록 캡 적용
- (백스테이지) 결제 안정성 — 같은 청구서에 결제창이 중복으로 열려 이중 청구되는 것을 방지 (열려 있는 기존 결제 세션 재사용)
- (백스테이지) 안전망 — health-check 101/101(격리·게이팅·위조 webhook 거부 검사 추가) + 결제 단위 테스트 13건

---

## [v3.50] — 2026-06-05 배포 (주방디스플레이 로그인 + Takeout/아이템 필터 정렬 · Backup 20260605_191333, smoke 9/9)

- 주방 디스플레이 계정 로그인 — 플로어플랜·POS와 동일하게 주방 디스플레이 헤더에도 계정 로그인(이름+▼, 클릭 시 PIN 전환) 추가. 시간과 설정(⚙) 아이콘 사이에 배치
- Takeout 필터 한 줄 정렬 — 포장·배달 뷰의 검색·정렬·타입 필터가 두 줄로 나뉘던 것을 한 줄로
- 아이템 리스트 필터 폭 조정 — 검색창만 길던 것을 검색·선택 칸이 비율로 함께 늘어나게 정리

---

## [v3.49] — 2026-06-05 배포 (입력란 흰 배경 + Takeout 라벨/필터 + 결제설정 여백 · Backup 20260605_183731, smoke 9/9)

- 입력란 흰 배경 통일 — 솔루션 전체(모든 역할·모든 페이지)의 입력/검색/선택 칸이 회색 배경에서 흰 배경으로. 안내 글자(미입력/기본값)는 회색, 입력·선택하면 검정으로 표시
- Floor Plan Takeout 명칭 통일 — 포장·배달 통합 뷰의 탭 이름이 "Takeaway"로 뜨던 것을 항상 "Takeout(포장·배달)"으로. 링크 주소도 view=takeout 으로 통일(기존 takeaway 링크도 계속 동작)
- Floor Plan Takeout 필터 — 정렬(주문 시간 / 금액) + 타입(테이크아웃·픽업·배달이 둘 이상일 때) 필터 추가. 주문 카드 뷰에 맞춘 필터
- 결제설정 여백 — "Available order types" 아래 결제수단별 설정 구분선이 버튼에 바로 붙던 간격 문제 수정

---

## [v3.48] — 2026-06-05 배포 (주문 알림음 통합 + 아이템취소 티켓 스테이션 박스 + 발주 안내 · Backup 20260605_174713, smoke 9/9)

- 주문 알림음 단일화 — 라이브오더·플로어플랜·주방·다른 화면에 흩어져 있던 새 주문 알림음을 "New Order(전 화면 공통)" 하나로 통합. "Item Ready(서빙)"만 별도 소리로 구분. 설정에서 화면 불문 한 곳에서 관리
- 알림음 설정 위치 이동 — Mobile Order 탭 → Operations 탭 "Order Notification Sounds"(전체 주문 공통이라). Mobile Order 알림은 배너 표시만 남고 소리는 통합 설정 사용
- 알림음 중복 제거 — 플로어플랜에서 전역 모바일 알림음과 자체 새주문음이 겹쳐 울리던 것 정리(라이브오더·주방과 동일하게 자체 소리만)
- 아이템 취소 티켓 정비 — 아이템 1개 취소 시에도 취소표에 "*** ITEM CANCELLED ***" 안내문 아래 주방 스테이션명이 표시되도록(주문 전체 취소·테이블 이동 티켓과 동일 형식)
- 발주 화면 안내 보완 — 발주할 상품이 없을 때 "공급사 계약" 한 경로만 안내되던 것을, 3가지 출처(브랜드 자동 카탈로그 / 등록 공급사 계약 / 외부 발주처 직접 등록) + "발주 시 재료 자동 연결"로 명확히 안내

---

## [v3.47] — 2026-06-05 배포 (세트 주문 파이프라인 + Off-table 통합뷰 + 색상 통일 + 주문 알림음 + 오더티켓 스테이션 정비 + Reports 달력 · Backup 20260605_150148, smoke 9/9)

### 2026-06-05
- 세트 메뉴 주문 정확 표시 — 플로어플랜·주방디스플레이에서도 세트가 통째로 풀리지 않고 고른 구성품+옵션만 정확히 표시(이전: 모바일만 정상, 나머지는 세트 전체 펼쳐짐). 주방디스플레이 세트 구성품 2번 표시·옵션 누락도 해결
- 세트 메뉴 등록 오류 수정 — Create Set Menu가 조용히 실패하던 문제(카테고리 처리 오류) 수정 + 실패 시 원인 메시지 화면 표시
- 세트 슬롯 이름 선택 입력 — 슬롯마다 이름을 안 넣어도 등록 가능, 빈 슬롯은 주문화면에서 "Item N (선택 필수)" 로 표시
- 영어판 한글 노출 제거 — 세트 메뉴 안내 문구가 영어판에서 한글로 나오던 부분 전수 수정(4개 언어)
- 플로어플랜 Takeout 통합 뷰 — 테이크아웃·픽업·배달 주문을 한 화면에서 타입 배지/필터/검색으로 관리. 새 주문 들어오면 배너 → 우측 패널 자동 연결
- 색상 통일 — 테이블맵 박스 + 아이템 단계 버튼을 라이브오더 액션 버튼과 같은 단계색(대기 amber/준비 purple/완료 green/서빙 gray)으로 통일. 우측 패널 기존 색상 유지
- 주문 알림음 체계화 — 라이브오더·주방·플로어플랜 알림음을 화면별로 분리. 플로어플랜 새 주문음 추가. 설정에서 화면별 on/off + 소리 종류 선택

### 2026-06-04
- POS 세트 주문 정확 저장 — POS에서 세트를 담으면 구성품 선택 팝업이 떠서, 고른 메뉴+옵션만 정확히 들어감(이전: 세트의 모든 선택지가 통째로 들어가고 옵션 누락). 모바일과 동일하게 동작
- 주방 오더티켓 단일화 — 모든 화면(주문완료·라이브오더·플로어플랜·자동발행)에서 오더티켓이 같은 내용으로, 각 주방 스테이션 + 카운터에 정확히 1장씩. 중복·내용 다름 해소
- 마지막 스테이션 누락 수정 — 여러 주방에 보낼 때 마지막 스테이션이 가끔 빠지던 문제 수정. 실패하면 카운터로 대신 인쇄 + 화면 경고
- 자동/수동 발행 정의 정리 — 자동발행을 켜면 "켠 시점 이후" 주문만 인쇄(이전에 쌓인 게 한꺼번에 폭주하지 않음). 수동(자동발행 OFF)이면 오더티켓 버튼으로 발행
- 취소·이동 주방 알림 — 자동발행 OFF여도 주문/아이템 취소·테이블 이동 시 주방 디스플레이에 팝업(현재 보고 있는 주방 탭 기준). POS엔 발송/재발송 버튼
- 취소 오더티켓 글꼴 통일 — 취소표가 일반 오더티켓과 같은 글꼴 + 취소 품목 가운데 줄긋기로 출력
- 첫 티켓 지연 해소 — 플로어플랜 등 다른 화면에서 주문해도 주방 티켓이 바로 나옴
- 모바일 테이크웨이 테이블 유지 — 테이블 QR로 들어와 테이크웨이로 바꿔도 그 테이블 번호 유지(그 테이블로 가져다주게)
- 주방 오더티켓 이모지 깨짐 정리 — 영수증 프린터(LAN/모바일)에서 메뉴명·옵션의 이모지(🌶️ 등)가 깨져 나오던 것을 제거(한글·내용은 그대로). 매운맛 레벨처럼 옵션명에 이모지가 들어가도 글자만 깔끔히 출력
- 취소 오더티켓 디자인 통일 — 따로 놀던 취소표 디자인을 폐기하고, 평소 주방 오더티켓과 똑같은 모양으로 출력 + 상단 "CANCELLED" 도장 + 취소 품목 줄긋기 + "STOP PREPARATION". 주방이 레일에 걸린 원래 티켓과 한눈에 짝맞춰 멈출 수 있게(업계 표준). 평소 오더티켓 출력은 100% 그대로
- 단말기 자동 갱신 — 새 버전 배포 시 매장 단말기가 옛 화면에 묶이지 않고 자동으로 최신 화면으로 갱신되도록 처리

### 2026-06-03
- 서빙 화면(홀 직원용) — Floor Plan 아이템별 서빙 리스트(?view=items): 세트는 구성 메뉴별로 표시, 탭하면 서빙 완료, 주방 디스플레이와 색·단계 동기화
- 직원 권한 분리 — POS(카운터)·서빙·주방 디스플레이 접근을 직원별로 따로 부여 (라이브오더·결제·취소는 POS 권한만)
- 직원 이메일 선택 입력 — 직원은 Staff ID + PIN으로 로그인(이메일 없어도 등록 가능). 다른 역할은 이메일 필수 유지
- 직원 ID 매장별 자유 사용 — 매장마다 같은 ID(예: counter)를 쓸 수 있게(내부 매장 구분 저장). 공용 단말에서 PIN으로 전환
- 준비시간 타이머 — 매장 설정에 "준비시간 추적" 토글 + 주문/아이템 목표 시간 + 긴급 임계. 주방·서빙 화면에 남은 시간 표시, 늦은 주문만 빨갛게 깜빡(신호등 방식). 기준=주방 진입 시각
- 필터 UI 통일 — 아이템 리스트의 카테고리·주방·정렬 필터를 검색 가능한 드롭다운으로 통일
- 직원 권한 메뉴명 정정 — "Support" → "Communication"

### 2026-06-03 (매장 현장 인쇄 핫픽스 — 운영 배포 15:08, Backup 20260603_150638)
- 세트메뉴 주방 인쇄 정상화 — POS 세트 주문도 구성품이 각 주방(스테이션)으로 정확히 분배, 주방 티켓에 세트명 작게+구성 메뉴명 크게 표시 (기존: "SET" 이름만 찍히고 한 주방으로 몰리던 문제)
- 취소 오더티켓 — 아이템/주문 취소 시 주방에 인쇄됐던 항목이면 취소표 발송(자동발행 ON=자동, OFF=팝업 수동). 세트는 구성 메뉴까지 펼쳐 표시. 주문이 아직 진행 전(pending)이어도 이미 주방에 갔으면 취소표 나가게 수정
- 테이블 이동 오더티켓 — 세트가 구성 메뉴별로 펼쳐서 표시되게 수정
- 통합(카운터) 오더티켓 — 상단의 단일 주방 박스(예: "KQ1") 제거, 항목별 주방 태그만 표시(여러 주방이 섞인 통합표라)
- 플로어플랜 하단 통계 — 매출/평균/최대/임계% 가 0으로만 나오던 버그 수정(받은 주문 기준 집계)
- 서빙 화면 알림음 — 음식 준비완료(ready) 시 서빙 담당에게 소리 + 헤더에 스피커 on/off 토글
- 주방 디스플레이(KDS) 헤더 버튼 높이 정렬
- 테이블맵 길게누르기 시 뜨던 브라우저 메뉴 차단
- 주방 스테이션 배정 화면 — 카테고리를 배정하면 그 카테고리의 개별 메뉴 목록은 숨김(예외 지정만 노출)
- 오더티켓 스테이션 표시 정비 — 통합(카운터) 티켓에만 아이템·세트구성품별 작은 주방 스테이션 표시, 스테이션별 티켓은 중복 인라인 태그 제거. 취소 티켓 스테이션을 "ORDER CANCELLED" 안내문 아래 그룹라벨로(테이블이동 티켓과 동일 레이아웃)
- Reports 커스텀 기간 달력 — 달력이 항상 현재 월로 열려 "선택해도 자꾸 이번 달로" 보이던 문제 수정 → 선택된 시작월에서 열림

---

## [v3.46] — 2026-06-02 배포 (POS UI/UX 개편 + 주방 인쇄·알림 v2 + 테이블 이동/취소표 · Backup 20260602_233232, table_moved ENUM 운영 적용 · smoke 3/4=레거시 계정 1건 false)

### POS 운영페이지 UI/UX 개편 + 보기 색상 토글
- POS Terminal 화면 개편 — 매장 단말(10인치) 클릭/가독성 개선: 카테고리·주문유형을 또렷한 선택 디자인으로 통일, 장바구니 수량/삭제·결제 버튼 확대, 메뉴 목록 여백 최적화로 한 화면에 더 많이 표시
- 주문 화면 영역 정리 — 상단(주문유형·고객·테이블)과 하단(결제 버튼)은 고정, 가운데 주문내역만 스크롤되게 구분
- 통화 표시 통일 — 모든 화면에서 "MYR" → "RM"(매장 설정 통화 기준), 장바구니·요약은 숫자만 표시하고 합계에만 통화 표기
- 보기 색상 토글 신설 — POS/플로어플랜/주방 화면에 밝게·고대비·어둡게 3가지 보기 모드(단말별 저장). 밝은 매장·야간 등 환경에 맞춰 전환

### 주방 인쇄·알림 모델 v2
- 주문 취소·테이블 이동 시 주방 자동 통보 — 자동발행 설정과 무관하게 취소표/이동표를 **항상** 주방에 발송. 발송 후 주문 낸 화면에 "주방에 발송됨" 알림 + [재발송]
- 모든 주방 티켓 상단에 **주방(station) 이름 박스** — 어느 주방 표인지 한눈에 (신규·추가·이동·취소 전부)
- 주방 디스플레이 알림 — 주문 전체취소(빨강) 신설, 이동이 합치기였을 때 "다른 주문에 합쳐짐", 보고 있는 주방 탭 기준 표시
- "취소 티켓 인쇄" 설정 토글 삭제(항상 발송)

### 테이블 이동 + 아이템 취소표
- 주문을 다른 테이블로 이동 — 빈 테이블 이동 / 점유 시 합치기, 주방 station이 바뀌면 옛 표 취소·새 표 발행
- 아이템 취소 — 사유 빠른버튼 + 주방에 이미 들어간 항목만 취소표 발송

### KDS 이동 팝업 + 알림 배너 정리
- KDS 테이블 이동 팝업을 "어느 테이블 → 어느 테이블" 우선 표시(오더번호는 022처럼 짧게 보조)
- 새 모바일 주문 녹색 상단 배너와 "항목 추가" 우측 배너가 겹쳐 안 보이던 문제 수정(우측 배너가 자동으로 아래로 비킴)

### 이메일 인증
- 미인증/placeholder 주소 발송 차단(인증메일 예외) + 미인증 안내 배너·재인증 버튼
- 가입·이메일 변경 시 인증 요구(로그인은 차단하지 않음)

### DB / 인프라
- `order_actions.action_type` ENUM에 `table_moved` 추가 — 배포 스크립트에 멱등 마이그레이션 등록(운영 자동 적용 확인)

---

## [v3.45-hotfix] — 2026-06-01 배포 (The Fire 3대 이슈 근본 수정 — backstage, 버전 미상승 · Backup 20260601_031208 + 20260601_032829, smoke 10/10)

> The Fire(16) 실매출 중 재발 보고 3건의 근본 원인을 데이터 무결성 차원에서 수정. 인쇄 방식/라우팅은 무변경(타이밍만). 운영 검증: 데모 r13 주문 18루트 + The Fire 100% 동일설정 테스트매장으로 모바일/POS/플로어플랜 결제완료까지 풀플로우.

- **오더티켓 2장 중복 출력 차단** — Floor Plan에서 테이블 POS를 열면(오버레이) 부모 화면과 POS 화면이 둘 다 자동인쇄 폴링을 돌려, 가끔 같은 주방티켓이 2장 나오던 문제. 오버레이 POS는 폴링을 끄고 부모 화면 하나만 인쇄(인쇄 방식·라우팅 무변경, 타이밍만). ※ 실프린터 눈 확인은 매장에서 진행
- **테이블번호 누락 구멍 차단** — (1) 주문방식 정보가 빠진 요청도 매장식사로 간주해 테이블 강제, (2) 빈 문자열 테이블도 차단, (3) 주문 수정 시 테이블번호가 빈값/null로 통째 덮어써지던 것 무시(테이블 비우기는 전용 플래그로만) — 5/31 설정소실과 같은 "통째 덮어쓰기" 차단
- **모바일 주문이 POS/Floor Plan에 안 뜨거나 안 맞던 문제** — 모바일 실결제 경로가 Floor Plan 테이블 ID를 안 넘겨 멀티존 매장에서 테이블에 안 꽂히던 근본원인 수정(생성 시 라벨→테이블ID 자동 해석). 매장 정보 미로딩 시 엉뚱한 매장(1번)으로 주문이 가던 폴백 제거(미로딩 시 제출 차단)
- **테이블 라벨 표기 달라도 한 빌로 합치기** — "1" / "T001" / "Table 1" 처럼 표기만 다르면 같은 테이블인데 주문이 2개 빌로 갈라지던 문제. 자동합치기 매칭에 라벨 정규화 추가. 멀티존에서 같은 정규화 라벨이 2개 이상 충돌하면 오합치기 방지를 위해 합치지 않음(유일 매칭만)
- **(검증 중 발견·수정) 주문 조회 IDOR 차단** — 로그인한 다른 매장 관리자가 주문 ID로 남의 매장 주문을 조회할 수 있던 권한 구멍 차단(본인 매장만, 시스템 관리자는 전체)
- i18n: 매장 로딩중 안내 문구 4언어 추가

## [v3.45] — 2026-05-31 배포 (주문/주방 안정성 + 모바일 dine-in 테이블 — The Fire 실매출 중 · Backup 20260531_021629, smoke 10/10)

### 주문/주방 안정성 (이번 핵심)
- **모바일 테이블번호 휘발 안정성** — 장바구니는 localStorage(영구)인데 테이블번호/주문방식은 sessionStorage(탭 정리 시 소멸)였던 불일치 수정. 손님이 주문 도중 앱 전환/화면잠금으로 모바일 브라우저가 백그라운드 탭을 정리하면 장바구니만 복구되고 테이블번호가 사라져 dine-in이 테이블 없이("픽업 N") 들어가던 문제 → 셋 다 localStorage 통일 (`mobile/contexts/MobileOrderContext.tsx` 외 6파일)
- **dine_in 테이블없음 표시 정정** — 테이블 없는 매장식사 주문이 "픽업"으로 뜨던 것을 "테이블 미지정"으로 (Live Orders 직원 식별 + 고객 추적화면 "주문번호"). 주문방식대로 표시 (`LiveOrders/LiveOrdersPage.tsx`, `mobile/pages/OrderTrackingPage.tsx`, i18n 4언어)
- **동일 품목 중복 라인 합치기** — 모바일 장바구니가 같은 구성을 매번 새 줄로 쌓아 "1개 눌렀는데 여러 줄"로 주문·인쇄되던 문제. 동일(상품+옵션+메모+세트) 자동 수량합산 + 추가버튼 600ms 디바운스 (`MobileOrderContext.tsx`, `ItemDetailPage.tsx`)
- **KDS 주방단계 자동 역행 차단 (forward-only)** — 소켓 에코/연타/동시편집으로 서빙한 단계가 저절로 되돌아가던(서빙했는데 다시 뜨던) 문제. 정방향 진행은 그대로, 역행은 "되돌리기" 버튼(수동)만 (`KitchenDisplay/KitchenDisplayPage.tsx`)
- **주방 아이템 쿠킹단계 백엔드 가드** — order_items 전체배열 교체 구조라 갱신 놓친 화면이 PATCH하면 DB에 served가 하향 저장되던 근본결함. 아이템별 단계 forward-only(낮아지면 기존 유지), 수동 되돌리기(allowItemRevert)만 우회. 주문상태·+Round·결제·인쇄 흐름 무영향 (`routes/orders-crud.js`)

### 모바일 매장식사(dine-in) 테이블번호 필수 — 매장별 설정
- 대표/공용 QR로 테이블 없이 들어와 주문되던(Floor Plan "픽업 N") 문제 해결 — 설정 ON 시 테이블 강제
- 테이블 없는 손님은 Floor Plan 테이블 목록에서 직접 선택 (오타 방지)
- 테이크웨이 전용 QR 면제, 테이블 QR 테이크웨이는 그 테이블에 표시
- 설정: 설정 → Tables & QR → "테이블 번호 필수" (기본 꺼짐)

### 세트메뉴 옵션 전구간 + 브랜드 세트 OR/택1 (2026-05-30 기배포분 — v3.45로 버전 확정)
- 세트 직접옵션 + 각 구성품 개별옵션이 주방티켓·영수증·주문내역·KDS 전부에 표시
- POS에서도 세트 자체 옵션 입력 가능
- 브랜드 메뉴 세트 "이거 또는 저거"(택1) 슬롯 + 구성품 옵션 빌더 → 매장에 옵션·조건 그대로 전파
- 세트 구성 화면 Fixed(항상 포함)/Choice(택1) 설명 친절화
- Floor Plan 편집 화면 테이블 안 보이던 문제 + 캔버스 크기 조정

### 검증
- 백엔드 forward-only 가드 API 4케이스(정방향통과/stale차단/revert허용/새품목통과) + 주문 풀 라이프사이클(+되돌리기/+Round 기존served보존·새품목pending) + station 라우팅 데이터레벨 + cart 중복 실브라우저(더블탭=1라인) + KDS/FloorPlan/LiveOrders/모바일 mount crash0·error0
- 인쇄 계약 7/7(티켓 정확히 1번·+Round 새것만·동시 1장) + **인쇄·QZ·라우팅 코드 변경 0줄(git diff)** + health-check 87통과
- Backup: 20260531_021629, smoke 10/10. 🔒 보호파일 bless(KitchenDisplayPage·orders-crud) — 인쇄방식 무변경 git diff 확인 후

---

## [v3.44] — 2026-05-29 배포 (모바일 고객주문 UX + 품목서빙/KDS 주방별 단계/이머전시 모바일인쇄/결제팝업 통일 — The Fire 실매출 중)

### 모바일 고객주문 UX (QR 주문 사이트)
- **결제 버튼 라벨 결제수단별 표시** — 카운터/현금은 "Place Order"(결제 안 함), QR/이월렛은 "Scan to Pay", 은행이체는 "Continue to Bank Transfer", 카드/PayPal만 금액 포함 "Pay". 카운터 결제인데 "Pay"라 고객이 결제하는 줄 알고 헷갈리던 문제 해결 (`mobile/pages/PaymentPage.tsx`)
- **영업시간 기반 Open / On Break / Closed 배지** — 기존엔 매장 계정 status(active) 기준이라 trial/overdue 매장은 운영시간 중에도 "Closed"로 뜨고, active 매장은 새벽에도 "Open"으로 뜸. 매장 타임존의 운영시간(openingTime/closingTime) + 브레이크타임으로 판정하도록 변경 + 운영시간 텍스트 표시 + 1분마다 자동 갱신. 신규 `mobile/utils/storeHours.ts` (표시 전용 — 주문 차단엔 미적용, 시간 오설정으로 매출 막히는 사고 방지). 4언어 (`mobile/pages/MenuPage.tsx`)
- **캐시리스 안내 배너 메뉴 → 결제화면 이동** — 메뉴엔 상단 작은 Cashless 뱃지만 유지, 안내 배너는 실제 결제 직전(PaymentPage)에 노출 (`MenuPage.tsx`, `PaymentPage.tsx`)
- **인기/추천 메뉴 탭 기본 선택** — 인기/추천 탭이 있으면 진입 시 그 탭이 잡히도록 (기존엔 무조건 첫 상품 카테고리). 설정만 켜지고 실제 아이템 0개면 첫 카테고리로 폴백 (`MenuPage.tsx`)
- **메뉴 담아도 장바구니로 안 튐** — 상품 담으면 장바구니 화면으로 전환되지 않고 카트 뱃지 숫자만 증가, 계속 둘러보기 가능 (`mobile/pages/ItemDetailPage.tsx`)
- **상세 갔다 돌아오면 탭 위치 복원** — 상품 상세 진입 전 현재 탭을 URL에 기록 → 뒤로가기 시 그 탭 그대로 복원 (`MenuPage.tsx`)
- **주문완료/주문히스토리 "주문 못 찾음" 깜빡임 제거** — 주문 생성 직후 추적 페이지가 곧장 조회하면 타이밍상 잠깐 404 → "못 찾음"이 깜빡이던 문제. 초기 로드 grace-retry(로딩 유지하며 짧게 재시도) + 주문목록 첫 로드 로딩표시 (`mobile/pages/OrderTrackingPage.tsx`, `OrdersPage.tsx`)

### 매장 운영 (POS / Floor Plan / KDS)
- **품목별 서빙 (Floor Plan + Live Orders 통일)** — 주방이 ready 체크 안 해도 홀 직원이 음식 나오면 품목 칩 클릭 → 서빙 처리(요리끝+서빙 한 번에). KDS 표시전용 매장 지원. 신규 공유 컴포넌트 `components/Order/ItemServeChip.tsx`
- **KDS 주방별 독립 단계 (주문단위 보기)** — 멀티 스테이션 주문에서 각 주방 탭이 자기 아이템 기준으로 독립 단계 이동. 'all' 탭은 전 주방 완료 시 승급 (`KitchenDisplay/KitchenDisplayPage.tsx`)
- **Floor Plan 결제 팝업 통일** — Floor Plan 테이블 결제 팝업에서 서비스차지/쿠폰/포인트/할인이 안 보이던 문제. 풀 주문 fetch로 Live Orders와 동일하게 표시 (`FloorPlan/FloorPlanPage.tsx`)
- **이머전시(비상) 모드 모바일 인쇄 + 프린터 명칭** — 비상모드에서 모바일/QR 주문이 자동인쇄 안 되던 결함 수정(poller가 정상 경로 타고 영수증 프린터로 redirect) + Settings 비상 카드에 추상어 "cashier" 대신 실제 프린터 이름(예: POS-80C) 노출. 4언어 (`hooks/useAutoPrintPoller.ts`, `Layout/MainLayout.tsx`, `Settings/SettingsPage.tsx`)

### 안전망 (backstage)
- **인쇄/주문 회귀 안전망 3종** — `scripts/check-print-guard.js`(🔒 보호파일 8개 지문 무결성 감시) + health-check `print` 카테고리 8건(전체 80→88) + `tests/order-totals.test.js`(청구 공식 11건). `deploy-to-production.sh`에 fail-closed 배포 게이트 통합(운영 도달 전 무결성+health 88 무조건 실행)
- /글쓰기 스킬 video_prompt 4섹션 구조화 + 6000자 확장 (dev 툴링)

### 검증
- state-hydration 0 / build (main.f3f5942d.js) / 타입에러 0 / health-check 88/88 / Autoprint regression 44 / 🔒 print guard 8/8 무변경 / storeHours 로직 단위 9/9 / 주문 루트 실호출 (POS 12 + 모바일 8 + 인쇄 8) / headless mount menu·payment·tracking 크래시 0
- Backup: 20260529_224606, smoke 10/10 (운영 POST order #12258 포함)
- 운영 검증: The Fire(trial status) 모바일 메뉴 실데이터 mount 크래시 0 + 영업시간 배지 정상 (#7 근본원인 = trial status 확정)

---

## [v3.43 hotfix #4] — 2026-05-29 배포 (결제 팝업 SC/Takeaway 표시 + Served 클릭 + Daily Settlement 인쇄경로 — The Fire 실매출 중 실시간)

- **결제 팝업(PaymentModal) 서비스차지/세금 표시 fix** — 인쇄·계산·영수증은 정상인데 화면 결제 팝업에서만 Service Charge / Tax 줄이 안 보이던 버그. 게이트가 `serviceChargeEnabled`/`taxEnabled` prop 의존이었는데 Floor Plan·LiveOrders 호출부가 이 prop 을 안 넘겨 숨겨짐. 게이트를 값 기준(`serviceCharge>0`, `tax>0`)으로 변경 → Floor Plan·LiveOrders·POS 팝업 일괄 정상. (`components/POSTerminal/PaymentModal.tsx`)
- **테이크웨이 차지 Floor Plan 표시** — 백엔드 `/table-status` 가 `takeaway_charge` 를 안 돌려줘 Floor Plan 결제 팝업·우측 패널의 Takeaway 항상 0. attributes + buildOrderInfo 에 `takeawayCharge` 추가 (`routes/restaurants-crud.js`) + 우측 패널 Takeaway 줄 추가 + 팝업에 serviceChargeRate 전달 (`FloorPlan/TableDetailPanel.tsx`, `FloorPlanPage.tsx`, `FloorPlan/types.ts`)
- **Floor Plan Served 버튼 클릭 안 되던 버그 fix** — v3.43 에서 Served 를 품목별 체크박스로 바꾸며 `item.status==='ready'` 일 때만 클릭 가능하게 했는데, The Fire 는 KDS 표시전용이라 품목별 ready 마킹이 없어 영원히 클릭 불가였음. 활성 주문(pending/preparing/ready)이면 단계 무관하게 홀 직원이 Served 토글 가능하도록 변경 + 전 품목 served 시 주문 자동 'served' 승급에 pending 포함 (`FloorPlan/TableDetailPanel.tsx`)
- **Daily Settlement 인쇄 경로 fix** — `printSettlementReport(html, null)` 이 escposContent=null 이라 QZ 분기를 건너뛰고 브라우저 print 다이얼로그로 폴백 → 빌(POS-80C, QZ HTML pixel)과 다르게 출력되던 문제. 빌/주방과 동일한 QZ HTML pixel 경로(`sendHTMLViaQZTray`, OS 이름 프린터)로 라우팅, LAN IP 만 raw ESC/POS. 보호된 인쇄 함수 자체는 미변경, 호출만 빌과 동일하게 (`utils/billPrint.js`). 제목 템플릿 리터럴 버그(`{t(...)}` 가 그대로 인쇄되던 것) 수정 (`Reports/DailySettlementPrint.tsx`)
- 검증: state-hydration 0 / build (main.a2f57813.js) / health-check 80/80 / table-status API 실호출 (takeawayCharge/serviceCharge/rate/tax 반환 Write→Read) / headless mount floor-plan·pos·kitchen·settings 0 크래시
- Backup: 20260529_141604, smoke 10/10
- ⚠️ Daily Settlement 인쇄는 실제 매장 프린터 출력(종이) 확인 필요 — 코드/헤드리스로는 출력 못 봄

---

## [v3.43 hotfix #3] — 2026-05-28 배포 (Kitchen Station hybrid 모드 + 모바일 주문 카테고리 라우팅 fix — 매장 영업 1일차 실시간)

- **Kitchen Station hybrid 모드** — 기존 `kitchen_assignment_mode` radio (category 또는 menu_item 둘 중 하나) 제거. 항상 hybrid: 카테고리를 station 에 배정하면 기본 라우팅 + 같은 카테고리 안 일부 메뉴만 다른 station 으로 보내려면 메뉴별 override. 산업 표준 (Toast / Square / Lightspeed) 패턴. 매장 영업 첫날 The Fire 피드백 즉시 반영
- Station Add/Edit Modal 카테고리 섹션 + 메뉴 Override 섹션 동시 노출. 메뉴 섹션은 카테고리별 그룹화 + "via Category → Station" 현재 라우팅 힌트 + 다른 station 에 override 된 메뉴는 disabled
- 새 explainer 카드 — "Category default + per-item override" 사용 가이드 안내 (2+ stations 일 때만)
- Unassigned 경고 hybrid 기준 재계산 — 카테고리 미배정 + 메뉴 override 도 없는 메뉴만 경고
- **Mobile orders 카테고리 fallback bug fix** — `routes/mobile-orders.js` 의 `catStationMap` 이 `Number(product.category)` 로 lookup 하던 부분이 legacy `Product.category` (카테고리 이름 STRING) 일 때 `NaN` → 카테고리 기본 라우팅이 모바일 주문에서 작동 안 하던 pre-existing 버그. id/name 양쪽 lookup map 으로 fix. 메뉴별 station 지정 없이 카테고리 단위로만 매핑하던 매장의 모바일 주문이 KDS 분배 안 되던 사례 차단
- Backend `routes/kitchen-stations.js` GET 응답 `assignment_mode='hybrid'` 강제 (DB 컬럼은 호환 위해 유지)
- i18n 4언어 (en/ko/zh/ms) 12 신규 키
- 검증: API hybrid (override 우선 + category fallback) ✓ / DB ✓ / health-check 80/80 ✓ / headless mount ✓ / 운영 The Fire (r=16) `assignment_mode: hybrid` 응답 확인
- Backup: 20260528_085906, smoke 10/10

---

## [v3.43 hotfix #2] — 2026-05-27 배포 (Customer Display Floor Plan lookup — 같은 날 누적)

- Floor Plan 의 cart-update useEffect lookup 에 `tableStatuses[tLabel]` fallback 추가. 우측 패널 (`selectedStatusInfo` line 1040) 과 동일한 lookup 식으로 통일. 옛 주문 (floor_plan_table_id=null + table_number=label) 시 lookup miss 로 cart-update 가 발사 안 돼 CD 가 blank 이던 사례 차단. 주문 여러 개 — useEffect deps `selectedOrderIndex` + 내부 `orders[idx]` 로 탭 변경 자동 반영

## [v3.43 hotfix #1] — 2026-05-27 배포 (Customer Display 회원/포인트 UX — 같은 날 누적)

- Floor Plan 빈 테이블 클릭 placeholder — tableStatus 미준비 / 빈 테이블에도 cart-update emit (table label + `orderInfo.orderStatus='empty'`). 사용자가 테이블 눌렀는데 CD 가 blank 인 사례 차단
- POS Terminal 시 좌측 keypad 유지 — CD 좌측 분기를 `cart?.orderInfo && cart?.source === 'floor-plan'` 로 한정. POS source 의 cart-update 가 keypad 를 OrderInfo 로 덮던 사례 차단
- "Enter phone number for points" → "Enter phone number for membership" 라벨 변경 (포인트 한정 아닌 일반 회원 식별)
- 매장 membership.is_active=false → CD 회원/포인트 UI 자동 hide. `/api/membership/settings/:rid` (익명) fetch + `membershipActive` state. keypad 자체 hide + customer card 의 points/tier/orders 영역 hide + Floor Plan source cart.customer points/tier hide + Thank-you "Points earned" hide. 운영 매장 16 (The Fire, is_active=false) 에서 즉시 적용

---

## [v3.43] — 2026-05-27 배포 (매장 도입 직전 critical fix + 누적 backstage 정식화)

### 2026-05-27 매장 도입 critical fix
- **AutoPrint master gate** — `kitchenPrinter.autoPrint=false` 면 station-level 토글이 ON 이어도 자동 인쇄 절대 차단. 6곳 일괄 (KDS x2 / POS x2 / FloorPlan / LiveOrders). 매장 운영 신뢰: 사용자가 OFF 둔 설정이 station 토글로 우회되어 browser print dialog 가 뜨던 사례 차단
- **신규주문 banner 개편** — 보라→emerald 그라데이션(`#10B981→#059669`), zIndex 9999→10001 (NotificationToaster 위), body.has-mobile-banner 클래스로 우측 toaster top: 68 push (View/X 버튼 안 가림), X 28x28→36x36 + type="button" 중복 제거
- **Customer Display socket cart cache** — `services/socketService.js` 매장별 in-memory cart cache, reconnect 시 last cart-update / pos-customer-update 자동 replay. cart-clear / checkout-complete 시 evict, 60min TTL. Floor Plan/POS 표시 내용이 일정시간 후 사라지던 사례 차단
- **Customer Display 자동오픈 default ON** — localStorage 값이 `'0'` 명시일 때만 OFF, 그 외 enable. 매장 도입 첫날 staff 가 토글 모르고 지나가도 동작
- **Customer Display 크기 키움** — LeftPanel 360→440 / Keypad 14px→22px padding + 폰트 20→28 / 전화 24→38px (tabular-nums) / OrderInfo / Member / SummaryRow 폰트 일괄 키움 / 1024px breakpoint
- **Receipt logo endpoint 운영 path fix** — `path.join(__dirname,'..',...)` → `path.resolve('/var/www/uploads', rel)` + path traversal 가드 + data: URL 처리. 어떤 매장의 receipt-logo 도 모두 404 반환하던 핵심 버그 fix. 매장 16 (운영) 200 OK + PNG raster 확인
- **billPrint.js img src 정규식 fix** — `/^https?:\/\//` → `/^(data:|https?:\/\/)/`. StoreContext 의 base64 dataUrl 이 `https://.../data:image/...` broken URL 로 변환되어 로고가 모든 인쇄 경로에서 깨지던 버그 fix. POS / LiveOrders / OrderDetailModal View Receipt / 모바일 ReceiptShare 모두 자동 적용
- **Brand Menu 카테고리 필수** — `BrandMenusPage.tsx` label `*` + select required + handleSave validation
- **Brand Menu 카테고리 필터** — ListControlsBar 의 검색 옆 select (별도 탭 X), categories lazy load
- **Brand Menu fully locked = View** — Restaurant MenuManagement 에서 brand-linked 이고 lock ≥ 4 면 Edit → View 라벨 (사용자 confusion 해결)
- **Floor Plan TableDetailPanel item 단계 분리** — 체크박스 `pending↔completed` → `ready↔served`. ItemStatusPill 4단계 dot (Queued/Cooking/Ready/Served), pending/preparing 은 disabled + 단계 dot 만, 모든 item served → order.status='served' 자동 승급. legacy `completed` 도 `served` 매핑. i18n 4언어
- **Mobile orders status override** — `routes/orders-crud.js:386` `source='mobile'` 일 때 매장 setting `requirePaymentBeforeKitchen` 으로 status 강제 override. 모바일 PaymentPage 가 `status:'outstanding'` 하드코딩으로 setting 무시하던 버그 fix
- **KDS +Round N divider + auto-print** — `order_group` 별 노란 띠 divider (`#FEF3C7`/`#FCD34D`) + `added_at` 시각 표시. `order-items-added` socket → printKitchenTicketViaRawBT 자동 호출 (added_at 기반 필터, `** ADDITIONAL ORDER **` ticket)
- **Auto-merge 조건 완화 + status preservation** — order_type 필터 제거 (dine_in ↔ takeaway 무관), payment_method 필터 제거, Mobile→Mobile customer 검사 제거 (guest 도 머지). 머지 시 기존 `outstanding` 보존
- 운영 critical 페이지 mount 검증 6/6 통과 (POS / KDS / Floor Plan / Settings Printer / Live Orders / Customer Display)
- 문서화: ORDER_MERGE_RULES / KITCHEN_DISPLAY_RULES / PRINT_RULES_MATRIX 에 오늘 변경 반영 (총 ~230줄)

### 2026-05-27 backstage 누적 (정식화)
- /글쓰기 템플릿 v3 확정 — 5비트→4비트(HOOK/문제/해결/결과), 15초→13초, CTA 제거 (로고 별도 클립)
  - BRAND CONCEPT v3 — locked 섹션(STYLE/VISUAL/CAMERA/TYPOGRAPHY/SOUND/NEGATIVE) video_prompt 포함, 4-BEAT STORY는 Claude 참조용(video_prompt 제외)
  - SPACE 생성규칙 — 공간 설명만 (분위기/시간대 묘사 제외, 글자수 최적화)
  - CASTING 생성규칙 — 한국인 명시 + Model-level beautiful face + 긍정형 복장규칙만 (NO apron 같은 부정형 금지)
  - CAMERA 생성규칙 — Slow Push-in, Pull-back, Slider Drift 등 씨댄스 호환 카메라워크
  - POS SCENE 규칙 — side profile / over-the-shoulder / 화면 중심 금지
  - NARRATION 규칙 — 선택적, 무음 선호
  - 구분자 최적화 — ═══(47자) → ───(3자) 변경으로 글자수 절약
- E-Invoice 글 (id 78/79/80) video_prompt v3 재생성 — 3,148자 (씨댄스 4000자 한도 내)
- Floor Plan zone 격리 (orders.floor_plan_table_id) — 다중 zone 매장 같은 tableNumber 충돌 해결, label 우선 매핑
- Customer Display 풍부화 — 주문 정보 + 회원 카드 좌측 패널, 키패드 자동 hide. POSTerminal 빈 카트 emit skip
- Emergency Routing Mode — 매장 운영 critical 비상 토글, 빨간 카드 + Pre-flight 좌/우 비교 + Troubleshoot modal
- QZ Tray SHA1→SHA512 + 자동 installer (.bat/.command/.sh 단일 파일)
- Settings printer 탭 전면 개편 — 3 방법 결정 매트릭스 (아코디언), Workstations + Kitchen 2-column, Customer Display → operations 탭 이동
- 반응형 헤더 (Floor Plan + POS Terminal, 공용 OverflowMenu)
- i18n 4 언어 154 키 추가 (printer.* 전체 — Emergency / methodGuide / Workstations / Troubleshoot)
- LiveOrders 결제 PATCH 400 hotfix — orderData ReferenceError, 모든 결제 확인 실패하던 버그
- Brand 메뉴 마이그 (Restaurant 16 → Brand 5 BrandMenu 시스템 풀 변환, 110 product / 41 option / lock 일괄)
- Settings token 키 fix (`getAuthToken()` 통일) + workstations state hydrate 누락 fix
- sync-contents-to-prod.js video_prompt + social_post 컬럼 sync 추가

### 2026-05-26
- Social Post SOP 개편 — 6단계 본문 구조 (문제→문제확대→진단질문→숨겨진리스크→PurpleHere=해결책→CTA). 브랜드 톤: 전문가가 조용히 알려주는 느낌. 제목 톤: 직관적 (한 번에 무슨 상황인지 보임, 제도명/기능명 X → 결과/리스크 O)
- 기존 블로그 2개 social_post 업데이트 — e-invoice: "One receipt. RM20,000 penalty." / staff-mistakes: "Changed the menu. POS stayed the same. Three wrong orders."
- /글쓰기 0단계 신설 — 타깃 (persona) 먼저 결정 (AskUserQuestion 6 역할 + Auto). PERSONA_CODE 정해진 후에만 1단계 진입
- BRAND CONCEPT v2 영구 박제 — 단일 톤 고정 (Apple + 자연광 한국감성 모던 F&B + 5비트 HOOK/문제/해결/결과/CTA). CHAOS/INTERVIEW 두 트랙 분기 폐지. video_prompt 4000자 한도 강제
- e-invoice 글 (id 78/79/80) video_prompt 재작성 — v1 8500자 → v2 ≤4000자 (en 3970 / ms 3992 / zh 3199). dev + 운영 sync
- 블로그 스킬 5개 → 1개 통합 — `/블로그초안`+`/블로그발행`+`/블로그감사`+`/블로그리서치`+`/블로그캘린더` 삭제, `/글쓰기.md` 안에 5-A/5-B SOP 흡수
- 랜딩 헤더 z-index fix — overflow-x:hidden → overflow:visible + max-width:100vw. 헤더 z-index 1000→1500, 언어 드롭다운 1100→1600. 블로그 hero 등 sub-banner 위로 드롭다운 떠야 함
- sync-contents-to-prod.js 패치 — `video_prompt` + `social_post` 컬럼 sync payload + schema migration + UPDATE/INSERT 3곳 추가
- lua 사용자 ACL 권한 부여 (Irene 실행) — `.claude/commands` / `docs` / Landing 코드 / locales 5개 디렉토리만. POS 코드는 lua read-only 유지

---

## [v3.42] — 2026-05-24 배포 (Floor Plan Takeaway 완전 재설계)

### Floor Plan Takeaway View — 풍부화 + iframe overlay 통일
- **Takeaway 카드 그리드** 색상 통일 — Floor Plan canvas 의 TableNode 와 동일한 `ORDER_STATUS_COLORS` 팔레트 (pending=yellow / preparing=purple / ready=green / served=darkgreen / completed=gray / cancelled=red / awaiting_payment=orange). 정신없던 다른 색 혼재 해소
- **데이터 scope = 오늘 (매장 타임존)** — Floor Plan canvas 의 `/table-status` 가 오늘 기준이라 takeaway 도 동일하게 `calculatePeriodDateRange('today', timezone)` 로 맞춤. 전체 history 는 Live Orders 에서
- **공유 가능한 URL** — `?zone=z_main`, `?view=takeaway`, `?order=123` 쿼리 쌍방향 sync. 직원 간 링크 공유 시 동일 화면 진입
- **Takeaway 사이드 패널 풍부화** — TableDetailPanel 수준 정보 (다이닝 specific 제외):
  - Header: 주문 번호 + "Just now" / "N min ago" 경과 시간
  - Status / Payment 뱃지 (palette 색)
  - Order Info 섹션: 주문 시간 (timezone) / Source (POS·Mobile) / Cashier / Payment method
  - Customer 섹션 (있을 때만): 이름 / 전화
  - Items 풀 리스트: 라인 합계 + 옵션 + 노란 highlight 메모
  - Money breakdown: Subtotal / Packaging / Service Charge / Tax / Discount (− 빨간) / Total (bold) / Received + Change
- **사이드 패널 absolute overlay** — 클릭/닫기 시 그리드 카드 reflow 없음 (Linear/Figma/Stripe 표준). 좌측 그림자로 floating 표시
- **i18n** — `floorPlanPage.*` 19 키 × 4언어 (en/ko/zh/ms) = 76 신규 string

### Walk-in Takeaway 진입 — iframe POSOverlay 통일
- v3.41 의 walk-in 진입이 `navigate('/pos-terminal?order_type=takeaway&from=floor-plan')` 직접 라우팅이라 테이블 New Order 의 iframe overlay (검정 바 × Close) 와 비대칭이었음 — 일관성 깨짐
- **단일 함수 `handleNewOrder(opts?: { takeaway?: boolean })`** — 테이블 New Order 와 walk-in 양쪽 모두 같은 `POSOverlay` iframe 사용. 검정 바 title 만 `Table N` vs `Walk-in Takeaway` 동적 분기
- 닫기 = `× Close` 검정 바 하나. 주문 완료 시 `postMessage('pos-order-complete')` → Floor Plan listener 가 overlay 닫고 fetchStatuses
- **POS Terminal 자체에 close/back 버튼 절대 추가 금지** — 검정 바가 유일한 닫기 경로 (Floor Plan state 보존)

### 문서화 — POSOverlay 패턴 박제
- `reference_floor_plan_pos_overlay.md` memory 신규 + MEMORY.md 인덱스 추가
- `FloorPlanPage.tsx` `handleNewOrder` 위 코드 anchor 주석 — "split 금지 / navigate 직진 금지 / × Close 유일" 명시
- 새 진입 타입 추가 시 옵션 키만 늘리면 됨

### Takeaway 주문관리 패널 — TableDetailPanel 100% 재사용 (지난 작업 정정)
- 직전 작업에서 takeaway 사이드 패널을 **별도 컴포넌트** 로 만들고 "Open in Live Orders" 한 줄짜리 액션만 둠 — 테이블 카드 클릭 패널과 비대칭. 사용자는 takeaway 패널에서 직접 Confirm/Ready/Served/Payment/Cancel 못 함
- **올바른 fix** — `TableDetailPanel` 컴포넌트 자체에 `tableNumber: string | null` 지원 추가. null = takeaway 모드 자동 분기
  - Header: `Table N` ↔ `Takeaway · #orderNumber` 동적
  - Seats / Table QR / "Leaved" / "Available" 빈 상태 — tableNumber null 시 자동 숨김
  - ActionGroup (Confirm/Ready/Served/Complete/Cancel/Payment, IconButton, Quick Complete ✓) **100% 동일** — 같은 함수, 같은 wiring
  - `handlePaymentConfirm` 도 takeaway orderId 분기 추가 — 한 함수로 dine-in + takeaway 둘 다 처리. PaymentModal 도 같은 컴포넌트 재사용
- **FloorPlanPage**: 별도 panel 200 줄 삭제, 같은 `<TableDetailPanel>` 호출만 2회 (dine-in + takeaway). takeaway order → TableStatusInfo 어댑터 함수 추가
- **Zone chip active gate** — Floor 뷰일 때만 zone chip highlight (`activeView === 'floor' && activeZoneFilter === ...`). Takeaway 뷰에서 zone chip 같이 highlight 되던 시각적 모순 해소
- **검증**: API PATCH `/orders/2173/status pending→preparing` 200 · READ-BACK status=preparing 일치 · revert 200. Mount sweep 6/6, hydration 0, i18n 0, health-check 80/80

---

## [v3.41 hotfix #1] — 2026-05-24 배포 (Canvas Size input UX — 같은 날 누적)

### Floor Plan Editor — Canvas Size 입력 자유 타이핑
- v3.41 의 Canvas Size 입력 필드가 `onChange` 시점에 즉시 clamp(600..5000) 하여, 사용자가 "1500" 타이핑 중 "1" 만 눌러도 600 으로 강제 변경되는 버그
- Local string state 도입 (`canvasWidthInput` / `canvasHeightInput`) — `onChange` = 자유 string 보관, `onBlur` 또는 **Enter 키** 시점에 commit + clamp + DB state 반영
- `useEffect([floorPlan.canvasWidth/Height])` 로 외부 변경 (load/undo) 시 자동 sync
- Industry-standard pattern (Notion / Linear / Figma 동일)
- 검증: clamp 로직 5/5 (정상/공백/min/max) + DB round-trip 2500x1800

---

## [v3.41] — 2026-05-24 배포 (Floor Plan Editor Pro + Takeaway Walk-in)

### Floor Plan Editor — Pro 기능 추가 (큰 매장 + 빠른 편집)
- **Canvas Size 조절** — Sidebar 새 카드 "Canvas Size" + Width/Height 입력 (600~5000 clamp, step 100). 대형 매장 / 다중 zone 매장 대응
- **도형 드래그-드롭 (Drag-to-add)** — Shape 버튼 mouseDown → 캔버스 mouseup 위치에 정확 배치. 클릭만 = 기존 중앙 배치 (fallback). 드래그 중 cursor: crosshair
- **다중 선택 (Multi-select)** —
  - 빈 캔버스 drag = lasso 사각형 선택 (반투명 보라 박스, 1.5px dashed)
  - Shift/Cmd/Ctrl + 테이블 클릭 = 개별 add/remove
  - 다중 선택 + drag = anchor 기준 offset 보존하며 그룹 전체 함께 이동
  - Delete 키 = 일괄 삭제
  - 우상단 "N selected" 보라 뱃지

### Floor Plan 운영 화면 — Takeaway Walk-in Mode pills
- 매장에서 walk-in 손님이 takeaway 주문할 때 매번 페이지 왔다갔다 하던 흐름 해소
- Header 아래 ModeBar 추가: `[🪑 Dine-In]` (current floor canvas) + `[📦 + Takeaway Walk-in]` (CTA 보라 테두리)
- Takeaway pill 클릭 → `/pos-terminal?order_type=takeaway&from=floor-plan` 으로 자동 이동 + POS Terminal 첫 mount 시 takeaway 모드 자동 초기화
- Pickup / Delivery 는 의도적 제외 — 모바일 셀프 전용 흐름

### POS Terminal
- `order_type` query param 받아서 초기 orderType 설정 (Floor Plan walk-in 흐름과 deep-link)

### FloorPlanCanvas 인터페이스 확장
- `selectedTableIds?: Set<string>` optional 추가 (back-compat — 기존 호출자 4곳 영향 없음)

### i18n
- 신규 9 키 × 4언어 (en/ko/zh/ms) — `canvasSize`, `width`, `height`, `multiSelected`, `mode`, `dineIn`, `takeawayWalkIn` 등

### 검증
- API 7/7 (canvas 3000x2000 round-trip / drag-to-add 좌표 / group move +100 / 401), mount sweep 6/6 (deep-link 포함), Health check 80/80, hydration 0 warnings

---

## [v3.40 hotfix #1] — 2026-05-24 배포 (Zones & Groups Pool 시각화 — 같은 날 누적)

### ZonesAndGroupsCard UI 시각화 개선
- v3.40 의 `slot_count` 도입 후 그룹 행 표시가 "0 table" 단순 카운트라 풀이 비어있는 상태와 의도적 0 의 구분이 안 됨 — 사용자가 "0/0 이면 뭐를 어떻게 해야 하는지" 모름
- **Pool 상태 시각화** — 3가지 variant (empty / partial / full):
  - **Empty** (slot_count=0): 회색 "Set pool size →" CTA 링크 (클릭 시 Edit 모달 직접 오픈)
  - **Partial** (0 < placed < pool): 보라색 `placed / pool` 메트릭 + 진행바 (`▮▮▯▯▯▯▯▯▯▯▯`)
  - **Full** (placed >= pool > 0): 초록색 메트릭 + ✓ 아이콘
- **Zone 헤더 합계** — 각 zone 옆에 zone 전체 `{placed} placed / {pool} in pool` 표시 (tabular-nums)
- **PrefixBadge** — prefix 없는 그룹은 회색 `—` 표시로 의도적 unset 시각화
- **마이크로 인터랙션** — row hover 시 #FAFBFC 배경 + 6px radius + 0.15s transition, 진행바 width 0.2s transition
- **접근성** — `type="button"` 명시, `aria-hidden` on 진행바, `aria-label="all placed"` on ✓, `font-variant-numeric: tabular-nums`
- **i18n 4언어** (en/ko/zh/ms): `poolNotSet`, `setPoolSizeHint`, `poolMetric`, `zonePoolMeta` 신규 4 키 × 4 = 16 string
- 검증: API variant 계산 (empty/partial/full ratio 0/0.30/1.00) ✓, mount sweep 5/5 ✓, hydration 0 warnings ✓

---

## [v3.40] — 2026-05-24 배포 (Floor Plan Pool-driven 재설계 — Settings = 풀 / Editor = 배치)

### Pool-driven 재설계 — 테이블 데이터 단일 진리의 원천 정리
- **문제**: Settings 의 그룹 만들기 (자동 N개 깔기) 와 Editor 의 Add Table (임의 max+1) 두 흐름이 공존 → 사용자가 "어느 게 기준?" 혼란 + Settings 풀 밖 임의 숫자 추가 가능 + 주문/결제 흐름에 따라다니는 테이블 번호 안정성 우려
- **재설계**: Settings = 풀 정의 (`slot_count`) / Editor = 배치만
  - `FloorTableGroup.slot_count` 신규 필드 (optional, legacy 매장은 placed count 로 fallback)
  - Settings → Zones & Groups 그룹 모달: "Pool size" 필드. Add 시 floor 에 자동 배치 X (풀만 정의). Edit 시도 size 조정. 배치된 수 미만으로 축소 시 amber 경고
  - Editor 의 "Place Table" 카드: 그룹 selector + `placed/total` 카운트. Shape 클릭 → 그룹의 미배치 slot 첫번째 자동 → 캔버스 배치. 풀 exhausted 시 "Edit pool in Settings" indigo 안내 + 링크 버튼
  - 선택 테이블 Table Number: 평소 read-only display ("B-3" + "Change" 작은 링크). Change 클릭 → 입력박스 + 같은 그룹 미배치 slot 자동완성 매칭 (임의 입력 불가). 매칭 없으면 "Edit pool in Settings" 링크. ESC/Cancel 닫기
- **운영 마이그레이션 완료**: 4 매장 / 6 그룹 — `slot_count = placed tables 수` 자동 설정 (legacy fallback 명시화)
- **POS Terminal**: `availableTables` 도 v2 동기화 (`floor_plan.tables[].label` 우선)
- **i18n**: 22개 신규 키 × 4언어 (en/ko/zh/ms) = 88 string 추가
- 검증: API 10/10, Health check 80/80, mount sweep 6/6, hydration 0 warnings

---

## [v3.39 hotfix #2] — 2026-05-24 배포 (Floor Plan Editor 통합 정리 — 같은 날 누적 2차)

### Floor Plan Editor — Zone Filter Chip 추가
- 다중 zone 매장에서 Editor 가 모든 zone 의 테이블을 한 캔버스에 그려서 zone1 의 B 와 zone2 의 A 가 시각적으로 겹치던 문제
- FloorPlanPage 와 동일 패턴의 zone chip 바를 Editor 헤더 아래에 추가 — All Zones (전체 카운트) + 각 zone (해당 zone 카운트)
- 선택한 zone 만 캔버스에 표시. 저장 시에는 전체 데이터를 그대로 PUT 하므로 데이터 손실 없음

### Floor Plan Editor — v1 "T001-T020" 드롭다운 완전 제거
- 좌측 "Add Table (N left)" 카운터가 옛 `table_settings.tablePrefix + totalTables` 에서 생성된 v1 식 풀 (T001..T020) 을 보여주던 버그 — v2 Zones & Groups 와 mismatch
- Add Table UI 재구성:
  - 그룹 selector 드롭다운 (active zone 의 그룹만 노출)
  - Shape 클릭 시 해당 그룹의 max(tableNumber)+1 자동 + 라벨 = `group.prefix + 번호`
  - 그룹 없으면 "Settings → Tables & QR 에서 만들어주세요" amber 안내 박스
- 선택된 테이블의 Table Number 편집도 드롭다운 → free-text 숫자 input 변경. 변경 시 라벨도 그룹 prefix 기반 자동 재계산

### POS Terminal `availableTables` 도 v2 동기화
- POS dine-in 모드의 테이블 선택 드롭다운도 v1 풀 사용하던 것 → `floor_plan.tables[].label` 우선
- 옛 매장 (floor plan 미설정) 만 v1 fallback 유지

### Settings Zones & Groups — 자동 테이블 생성 default 0
- 그룹 생성 모달의 "Number of tables" default `4` → `0` 로 변경
- 0 = 빈 그룹 생성 (사용자가 Floor Plan Editor 에서 하나씩 추가). count > 0 입력 시에만 자동 배치 (amber 안내 노출)
- "Number of tables (optional)" 라벨 + "Leave at 0 to create an empty group" hint 노출

### 운영 restaurant 16 일회성 데이터 재배치 (across zones)
- Zone1 + Zone2 가 같은 (50,50) 시작 좌표라 All Zones 보기에서 겹치던 문제
- zone 별로 sort_order 순회 + 이전 zone 의 max y + 60px ZONE_GAP 부터 재시작하여 reflow
- 결과: Zone1/B (y=50..140) + Zone1/T (y=240..600) + Zone2/A (y=730..910) — All Zones 보기에서도 겹침 없음

---

## [v3.39 hotfix #1] — 2026-05-24 배포 (Floor Plan UX bugfix — 같은 날 누적)

### Floor Plan Rect (V) 셀렉트 매핑 수정
- 테이블 편집 패널의 Shape 셀렉트에서 Rect (H) 와 Rect (V) 둘 다 내부 `value='rectangle'` 이라 V 선택해도 H 로 매핑되던 버그 수정
- 셀렉트 option value 를 복합 키 (`rectangle:vertical` / `rectangle:horizontal`) 로 변경 → DB 의 shape 컬럼은 `'rectangle'` 그대로 유지, orientation 은 width/height 로 식별
- 기존 데이터 호환: 현재 width < height 인 테이블은 V 로, 아니면 H 로 자동 표시

### Zones & Groups 신규 그룹 좌표 자동 충돌 회피
- 같은 zone 에 두 번째 그룹 생성 시 두 그룹 모두 (50, 50) 부터 시작해서 시각적으로 겹치던 버그 수정
- 새 그룹의 시작 y 좌표 = 같은 zone 에 이미 있는 테이블 max(y + height) + 30px 갭
- 결과: B 그룹 → 위쪽 행, 새로 추가하는 T 그룹 → 자동으로 B 아래 행부터 시작

### 운영 restaurant 16 일회성 좌표 재배치 (데이터 패치)
- 기존 B + T 그룹이 같은 zone (z_main) 의 동일 좌표 (50,50) 부터 시작해서 화면에 B 가 T 에 가려 안 보이던 데이터 수동 fix
- 사용자가 손으로 정렬한 테이블 없어서 grid 재계산 (각 그룹 sort_order 순서대로 max(y) 다음 행부터 재배치) 적용. 데이터 손실 없음
- 결과: restaurant 16 → Table-B (y=50..140) + Tables T (y=240..600) + Table-A (별도 zone) 모두 노출

---

## [v3.39] — 2026-05-24 배포 (Store↔Legal 분리 + Takeaway per-menu + Floor Plan prefix + Owner 인보이스 + Bill 헤더 brand-first)

### Mobile order type chip 정리
- 모바일 카트(`/mobile/{slug}/cart`) / Orders(`/mobile/{slug}/orders`) / Account(`/mobile/{slug}/account`) 페이지 우측 상단 Order Type chip (🍽️ Dine-In / 🥡 Takeaway 등) 숨김 — 메뉴 페이지의 StoreHeader Change 버튼으로 이미 선택했고 잠긴 상태에서 chip 은 노이즈
- Checkout / Reserve 페이지는 결제 직전 재확인 목적으로 chip 유지

### 모바일 OrderType 화면 지점명 시각 분리
- 첫 화면 (`OrderTypePage`) 의 branch name 을 location pin chip (회색 pill + MapPin 아이콘) 으로 변환 — 기존엔 회색 13px 텍스트가 Subtitle "How would you like your order?" 와 같은 색/크기로 시각 분리 안 됨
- chip 하단 여백 22px 로 늘려 질문 텍스트와 명확한 breathing room 확보

### Takeaway 포장비 — 메뉴별 개별 설정 (Per Menu Item)
- Operations 탭 Takeaway Pricing 의 Pricing Type 에 3번째 옵션 추가: **Per Menu Item (set individually)**
  - 기존 `per-item` (모든 아이템 동일 금액) / `per-category` (카테고리별) 와 별개
  - 각 메뉴 아이템마다 자체 포장비 (`products.takeaway_charge`) 보유 — 동일 메뉴여도 용기 차이를 가격에 반영
  - 0 인 메뉴는 포장비 미부과 (옵션-인)
- DB: `products.takeaway_charge DECIMAL(10,2) NOT NULL DEFAULT 0` 컬럼 추가
- 메뉴 편집 모달: Price 아래에 "Takeaway Packaging Fee" 입력 필드 추가 (모드 무관 항상 표시 — 데이터 영속)
- Settings (Operations 탭): Pricing Type = per-item-individual 선택 시 카테고리 그룹화된 메뉴 일괄 편집 그리드 노출 (Settings 페이지에서 직접 일괄 관리)
- 자동 첨부: `StoreContext.getTakeawayCharge` 가 menuItem 객체 받도록 signature 변경 + 신규 모드 분기. POS Terminal / 모바일 PaymentPage 둘 다 takeaway 주문 시 자동 가산
- i18n 4언어 (en/ko/zh/ms) 추가

### Floor Plan prefix 자동 "T" 주입 제거 + 그룹 prefix 선택 가능
- `floor_plan` v1→v2 자동 마이그레이션 기본 prefix 를 `"T"` → 빈 문자열로 변경. 사용자가 prefix 를 설정하지 않으면 테이블 라벨은 숫자만 (1, 2, 3…)
- Floor Plan Editor 의 add-table fallback 도 `"T"` 제거 → 그룹에 prefix 없으면 라벨 = tableNumber 단독
- `computeTableLabel(prefix, n)` 도 fallback `"T"` 제거
- Zones & Groups 모달의 prefix 필드 — 선택 사항으로 변경 (필수 검증 제거). 빈 prefix 도 저장 가능. 동일 zone 내 중복 검사는 비어있지 않은 prefix 만 검사
- 결과: 옛 매장이 prefix 입력 없이 진입해도 "T-1" 같은 자동 prefix 안 붙음. 사용자가 명시 입력한 prefix 만 라벨에 반영

### 인보이스 — Restaurant Owner payer 분기 추가 + 모든 4 역할 확인
- `getPayerCompanyInfo` 에 `restaurant_owner` 분기 누락되어 있어서 추가 → User 모델의 `company_name || full_name`, `address`, `phone`, `email` 사용
- 모든 4 역할 인보이스 청구처 회사정보 노출 검증 (RA / BG / FG / Restaurant Owner) 통과

### Settings 안내 배너 + Bill/Invoice 출처 명시
- Store Settings 탭 상단 배너: "Store info — printed on customer bills/receipts" (어디에 사용되는지 명시)
- Company Information 페이지 배너: "Company info — printed on invoices and legal documents" + Empty field 시 store info fallback 명시
- 각 필드별 HelpText:
  - Mobile Phone "Used for system notifications only. Never printed on bills."
  - Telephone "Landline shown on bills/receipts. Leave empty to hide."
  - Store/Brand Name "The customer-facing brand printed at the top of bills and shown in mobile orders."
- i18n 4언어 (en/ko/zh/ms) 모두 추가: 신규 storeName/telephone/mobilePhone/storeInfoBanner / companyInformationPage.banner / zonesGroups.tablesLabeledNoPrefix / liveOrdersPage.billPreview 등

### Bill 헤더 추가 보강 (Phase 6 후속)
- `OrderCompleteModal` (POS 결제 영수증) + `thermalPrinter.ts` 2곳도 동일 패턴 적용
  (큰글씨 = tradeName||name, 작은글씨 = address / legalName 다를 때만 / telephone 있을 때만 / Reg No / Tax No)
- 3 시나리오 검증 통과: legacy store (mobile phone 숨김 ✓) / brand≠legal (legal 노출 ✓) / brand=legal (중복 생략 ✓)

### Store info ↔ Legal entity (Company) 정보 컬럼 분리 (Bill vs Invoice 출처 분리)
- **문제**: `restaurants.name`/`address`/`phone`/`email`/`business_registration`/`tax_id` 한 세트만 있어서 Store Settings 의 "Store Name" 과 Company Info 의 "Company Name" 이 **같은 컬럼**을 편집 — 한 쪽 변경 시 다른 쪽도 바뀜. Bill 헤더와 Invoice 청구처 모두 같은 `restaurants.name` 사용 → 매장 브랜드 ≠ 법인명 인 매장이 둘 중 하나만 맞추면 다른 쪽이 어긋남.
- **분리**: 신규 컬럼 10개 추가
  - `telephone VARCHAR(20)` — 매장 landline (Bill 헤더 표시용)
  - `legal_name VARCHAR(255)` — 법인명 (Invoice 청구처)
  - `legal_address` / `legal_address_line_2` / `legal_city` / `legal_state` / `legal_postal_code` / `legal_country` — 법인 주소
  - `legal_phone` / `legal_email` — 법인 연락처
- **Fallback**: `legal_*` 가 NULL 이면 Invoice 가 자동으로 store 측 (`name`/`address`/`phone`/`email`) 으로 폴백 — 옛 매장 무손실 마이그레이션
- **UI 정리**:
  - Store Settings (`?tab=store`) — 매장 표시 정보만: Store/Brand Name, Telephone (landline, 빌 표시용), Mobile Phone (POS 알림용, 빌 표시 안 함), Email, Address, Logo. **Business Registration / Tax No 제거** (Company Info 로 이동)
  - Company Info 페이지 — 법인 정보 편집: Company Legal Name → `legal_name`, address → `legal_address_*`, phone → `legal_phone`, email → `legal_email`. business_registration / tax_id / trade_name / website / bank / logo 는 회사 단위 메타로 유지 (Company Info 만 편집)
- **Bill 헤더 개조** (`utils/billPrint.js` + `mobile/ReceiptShare.tsx`):
  - 큰 글씨: `trade_name || name` (브랜드명)
  - 작은 글씨 (있을 때만): 주소 / legal_name (브랜드와 다를 때만) / `Tel: telephone` / Reg No / Tax No
  - **`phone` (mobile) 은 빌에 절대 표시 안 함**
- **Invoice payer resolver** (`invoices-helpers.js`): `restaurant.legal_name || restaurant.name`, `legal_address || address` 등 모든 필드 fallback chain
- **LiveOrders 모달 라벨**: "Receipt Preview" → "Bill Preview" (2곳)
- 옛 데이터 보존: 신규 컬럼은 NULL 시작 → fallback 으로 기존 표시와 100% 동일. 매장이 회사 정보를 별도 입력하면 Invoice 만 그 값 사용
- 검증: API 테스트 7/7 통과 (legal_* PUT/GET/Fallback resolve 모두 확인), Health check 80/80

### 사이드바 2뎁스 active 유지 (내부 탭 이동 시)
- `/restaurant/{id}/settings` Store Settings 항목이 내부 탭(store/operations/managers) 이동 시 사이드바 active 가 풀리던 버그 수정
- `AdminSubItem` 에 `matchTabs?: string[]` 별칭 필드 추가 — 같은 pathname 을 공유하는 여러 탭 중 사이드바 항목이 자기 영역으로 인정할 추가 탭값 명시
- Store Settings 항목: `matchTabs: ['operations', 'managers']` → 3개 내부 탭 어디에 있어도 사이드바 active 유지
- 기존 Reports 의 `?tab=ranking|sales|...` 같이 각 탭이 분리된 sibling 인 케이스는 영향 없음 (별칭 미사용 시 동작 동일)

---

## [v3.38 hotfix #1] — 2026-05-22 배포 (Customer Display 매장 입점 준비 + 멤버십 UX + Floor Plan 통합)

### Customer Display (Dual Monitor) 매장 입점 critical 보강
- **force placement timer 4회**: 첫 popup 의 moveTo/resizeTo 가 Chromium PWA standalone 에서 좌표 무시되던 결함 → immediate + load 이벤트 + 100ms + 500ms + 1500ms 4 패스로 강제. 매장 setup 1회 드래그 → localStorage 저장 후 모든 재오픈에 자동 적용
- **Floor Plan Customer Display 버튼**: POS Terminal 헤더 와 동일 위치/플로우에 추가. 결제 흐름 안 들어가도 빈 매장 모니터에 안내 화면 즉시 띄울 수 있음
- **사이드바 라벨 정리**: 좌측 메뉴 "Customer Display" → "Pickup Display" (실제 픽업 안내 화면, Floor Plan/POS 의 Customer Display 와 명칭 충돌 해소)
- **Customer Display 멤버십 키패드 토글 위치 정정**: Settings → Printer 탭 → Membership 탭으로 이동 (의미상 올바른 위치)
- **토글 컴포넌트 일관화**: 멤버십 키패드 표시 ToggleSwitch + AutoSaveField wrap → 다른 멤버십 토글들과 동일 자동저장 인디케이터

### 테이블 풀라벨 통일
- LiveOrders / Floor Plan / 머지 모달 / 주문 상세 모두 `utils/tableLabel.ts` 통합 — "Zone / A1" 형식
- 그룹 prefix 자동 결합 (A + 4 → A4, hyphen 제거)
- "Main / Tables · T002" verbose 제거 → "Main / T002"

---

## [v3.38] — 2026-05-22 배포 (Split bill + Order History + Auto-merge 선택 + 통계 row 별 + 성능 -52%)

### Split bill — 한 주문 아이템 나눠서 결제 (Phase 2)
- 1 order → N 결제 row (`order_payments` 신규 테이블). 각 row 별로 method (cash/card/qrpay/mobile/bank_transfer 등) 와 amount 독립 저장 → 통계도 row 별 정확 분배
- PaymentModal 에 "Split bill" 토글 + 아이템 체크박스 + 선택 합계 자동 비례 계산 (모든 변수: discount/coupon/discount_policy/point_discount/takeaway/service/tax 모두 비례)
- 영수증 자동 분리 (-P1/-P2/-P3 …) — payment row 단위
- 이미 결제된 아이템 자동 disabled + PAID 라벨 (idx/id/name+price 3-tier 매칭, 옛 receipt 호환)
- 부분 결제 후 모달 안 닫고 남은 결제 가능 — `payment_status='partial'` 자동
- LiveOrders 행: `(Partial X.XX / Y.YY)` 라벨 + "Continue Payment" 버튼 + 보라색 partial 뱃지
- Floor Plan TableDetailPanel: 보라 partial 상태 + 결제 가능
- 옛 데이터 결함 흡수: `order.amount_paid` 는 `total` 로 cap, `order_payments.amount` 는 실제 received 그대로 (통계/회계 정확)

### Auto-merge → 매번 묻기 (cashier 명시 선택)
- POS 같은 테이블 새 주문 시 backend default `skipAutoMerge=true` (자동 머지 OFF)
- 새 endpoint `GET /api/orders/mergeable` (진행 중 주문 리스트)
- POS 결제 진행 직전 mergeable 발견 시 모달: "기존 주문 #X 에 추가" vs "별도 새 주문" — cashier 명시 선택
- `forceMergeIntoOrderId` 옵션으로 명시 머지
- Mobile 흐름은 기존 (customer 검사) 그대로 유지

### Order Action History — 주문 audit trail
- 신규 `order_actions` 테이블 + `services/orderAuditLog.js` helper
- 모든 주문 액션 추적: created / status_change / item_added / item_removed / item_modified / cancelled / payment_received / printed / merged / note_added 등 17 action types
- 자동 기록 위치: orders-crud (POST/PATCH 6곳) + orders-payment (Stripe/PayPal capture) + mobile-orders (POST/cancel)
- 신규 endpoint `GET /api/orders/:id/actions` (restaurant scope 가드)
- 주문 상세 모달 / Floor Plan 우측 패널 / KDS ticket — 본문 끝 "View history ›" 작은 링크 → floating popover
- cancelled 주문은 모달 진입 시 자동 popover 열림 (취소 시점/단계/사유 즉시 부각)
- i18n 4언어 (17 action types + History UI + Switch staff PIN)

### POS Terminal Compact + Sort + 검색
- 검색박스 우측에 segmented View toggle (Image / Compact) — 모드 localStorage 저장 (per-device)
- Compact mode = 텍스트 only 그리드 + 더 조밀 + 자동 "All" 카테고리 노출 + 카드 옵션 버튼 하단 정렬
- Sort dropdown: Newest (기본) / Name A-Z / Price ↑ / Price ↓ — 모든 카테고리/모드/검색결과에 일관 적용, localStorage 저장
- All 탭은 Compact 모드 전용 (사진 모드는 카테고리별 — 메뉴 많은 매장 속도 보호)
- 카드 액션 버튼 하단 정렬 (제목 1줄/2줄 차이 무관)
- menu API 응답에 `createdAt` 포함 (Newest sort 정확)

### KDS PIN + 헤더 정돈 + 반응형
- KDS 진입 시 RA 로그인 그대로 사용 (자동 차단 X). 헤더 우상단 staff 뱃지 (2줄: 이름 / Switch staff) — 다른 주방 직원 audit 시 Switch staff → PIN modal
- 헤더 레이아웃 정돈: Merge (item view 전용) 2줄 → Order/Item → Station chips (overflow-x scroll) → Staff (2줄) → Sound (작게, 끝) → Live · Time (2줄, 끝)
- 10/13인치 태블릿 반응형: HeaderInfo `flex-wrap`, PageHeader 1180px wrap 허용, Station chip 가로 스크롤

### 성능 최적화
- main.js 1.58MB → **757KB (-52%)** — Landing 18 페이지 + MobileApp `React.lazy()` 마이그
- gzip 482KB → **242KB (-50%)**
- Global fetch dedupe util (`utils/fetchDedupe.ts` + `utils/httpClient.ts`) — 동일 GET URL in-flight Promise / 2초 TTL cache 공유. POS Terminal mount fetch 16건 → 11건 (-31%). 라이브 데이터 (orders/notifications/badge/dashboard) opt-out
- POS Terminal `useTranslation('pos')` 추가 (TDZ fix)
- 다음 사이클 후보 — React Query 도입 + Backend composite endpoints (`docs/PERFORMANCE_OPTIMIZATION_PLAN.md`)

### 통계 정확성
- Dashboard `reports-summary` paymentMethodSales / cardTypeSales 가 `order_payments` row 별 method × amount 로 정확 분배. split bill 다중 method 정확 반영. 옛 단일 결제 주문은 fallback `order.payment_method` 사용 (회귀 0)
- 통계 검증: cash 10 + card 12 + qrpay 8 (split 30) → 통계 행 정확 ✓

### Floor Plan ↔ POS Terminal
- Floor Plan → POS 진입 시 `table_number` 강제 setTableNumber (v2 group prefix 호환). 빈 table 로 주문 생성 결함 해소
- Floor Plan prefetch 제거 — CPU 점유 부작용 차단
- 테이블 풀라벨 helper `utils/tableLabel.ts`: Zone/Group 정보 + tableNumber 결합 (예: "Indoor / Main Hall · T001"). LiveOrders 행 / 머지 모달 / Floor Plan 헤더 모두 통일

### DB schema 변경 (운영 적용 완료, 옛 데이터 100% 보존)
- `orders.payment_status` ENUM 확장 (`partial` 추가)
- `orders.amount_paid` DECIMAL(10,2) default 0 신규 컬럼
- `order_payments` 신규 테이블 (16 컬럼, idx: order_id+paid_at, restaurant_id+paid_at)
- `order_actions` 신규 테이블 (13 컬럼, immutable audit log)
- 운영 검증: orders 10,676 건 그대로, payment_status 분포 (completed 10,321 / pending 341 / 기타) 100% 보존
- `migrate-add-partial-payment.js` idempotent 마이그레이션 + `deploy-to-production.sh` 자동 실행 등록

### 기타 fix
- POS Terminal `'all'` 가상 카테고리 reset 버그 fix (categories.find(id==='all')=false → reset 발동 무한루프 차단)
- LiveOrders payment_status='partial' 처리 8군데 (canOrderBeMerged / SelectAll / merge invalid / PaymentMethod cell / Pay 버튼 / Mark Completed 차단 등)
- 모달 안의 History 링크 simplify (선 제거 + 여백 최소, Floor Plan 우측 패널 스타일과 통일)

---

## [v3.37] — 2026-05-22 배포 (쿠폰 dine-in 매칭 hotfix + Settings 조건부 표시 + 모바일 메뉴 UX)

- **쿠폰 validate `dine-in`/`dine_in` 표기 정규화 hotfix** — POS Terminal 은 `'dine-in'` (kebab), DB `applicable_order_types` 는 `'dine_in'` (snake) 저장. `routes/coupons.js` validate 매칭 시 양쪽 모두 snake_case 로 정규화 후 비교. 데모/실매장에서 POS dine-in 쿠폰이 "not applicable for dine-in orders" 로 거부되던 운영 결함 즉시 해소. 운영 실 API 검증: BBQ30 (DB `['dine_in']`) + `order_type='dine-in'` → 400 → **200 valid=true discount=30** ✓
- **모바일 메뉴 매장 카드 매장명 2줄 제한** — 매장명 + 지점명이 길면 3줄까지 늘어나던 문제. `-webkit-line-clamp: 2` + `text-overflow: ellipsis` + `word-break: break-word` 적용. 짧으면 1줄, 길면 2줄로 잘림. 시각 노이즈 정리
- **Settings 조건부 표시 보강 (베이스 토글 OFF 시 세부 카드 자동 숨김)**
  - Takeaway Pricing Settings (Operations 탭): `orderTypes.takeaway` OFF 시 카드 숨김
  - Delivery Pricing Settings (Mobile Order 탭): `orderTypes.delivery` OFF 시 카드 숨김
  - Quick-entry QR (Operations 탭) 안내문에 "Mobile Order tab" 인라인 링크 추가 — 토글-결과 카드 분리 혼동 해소
- **모바일 메뉴 탭 URL persistence** — 새로고침/뒤로가기 시 카테고리 탭 reset 되던 문제. `?cat=ID` 쿼리에 `history.replaceState` 로 카테고리 유지 (기존 `?table=X&order_type=Y` 쿼리 보존). Featured 탭은 `?cat=__featured__`. 잘못된 cat ID는 첫 카테고리 fallback. 카테고리 직접 공유 URL 가능

---

## [v3.36] — 2026-05-20 배포 (Customer Display 안정성 hotfix 3차 + 10-12" POS 반응형 + 사이드바 폭 축소)

- **Customer Display 안정성 hotfix 3차 누적** — 매장에서 "POS Customer Display 가 두 번째 모니터에 안 뜬다" 보고로 시작된 critical 이슈 대응. 같은 날 3 hotfix 운영 배포.
  - **1차 (silent fail → 안내 모달)**: `openCustomerDisplay()` 반환을 `Promise<boolean>` → `Promise<OpenResult>` 로 변경. 5 시나리오(permission-denied / no-secondary-screen / popup-blocked / opened-fallback / opened) 별 안내 모달. Window Management permission API 명시 체크. 호출자 2곳 (POSTerminalPage, SettingsPage) update. SettingsPage 의 `alert()` → `setInfoModal()` ([Standard modal components] 메모리 준수)
  - **2차 (Hidden popup reuse 제거)**: `openedWindow.focus()` early return 제거 → 매번 `window.open()` 재호출 + 즉시 `moveTo` + `resizeTo` + `focus` 강제. `forcePlacement` 헬퍼 (immediate + addEventListener('load') 양쪽 호출). 한 번 popup 잃어버린 상태에서 다시 클릭해도 시각적 변화 없던 결함 해소
  - **3차 (Stale bounds 자동 검증 + Reset Position UI)**: `isBoundsOnAttachedScreen()` 추가 — `getScreenDetails()` 로 모든 모니터 영역과 비교, fallback 으로 `window.screen` 영역과 비교. `getValidatedStoredBounds()` 가 stale 이면 localStorage 자동 삭제. `resetCustomerDisplayPosition()` export. Settings → Customer Display 카드에 "Reset Position" 버튼 추가 (보라 outline). i18n 4 langs `resetPosition`/`resetPositionTitle`/`resetDoneTitle`/`resetDoneMessage` 4 키 × 4 = 16 entries. Dead key `popupBlocked` 4 langs 모두 cleanup

- **10-12" POS 모니터 반응형 + 사이드바 단계별 동적 반응** — 작은 POS 모니터(1280×800) 에서 사이드바가 컨텐츠를 너무 많이 차지하던 문제. Stripe/Notion 표준 패턴으로 단계별 반응형 적용.
  - **사이드바 폭 220→180px** — 1뎁스 (`SIDEBAR_ADMIN_EXPANDED`) + 2뎁스 (`SECONDARY_PANEL_W`) 일관 축소. RailItem padding 14→10, gap 10→8 → "Products & Inventory" 같은 긴 메뉴 ellipsis 해소
  - **2뎁스 자동 접힘 (≤1280px)** — `SECONDARY_AUTOCOLLAPSE_BREAKPOINT=1280`. 10-12" 진입 시 2뎁스 접고 hover popover 표시 (이미 있던 SecondaryPopover 활용). 13" (1366×768) 이상은 둘 다 펼침 유지 — 컨텐츠 폭 1006px+ 충분
  - **localStorage 우선순위 반전** — 기존 옛 토글값(`false`) 저장된 사용자도 작은 화면 진입 시 자동 접힘 강제. 큰 화면(>1280px) 일 때만 사용자 토글값 존중
  - **동적 resize 즉시 반응 (120ms debounce)** — `useEffect` 안 `window.addEventListener('resize')` → 브라우저 가로 폭 줄이면 즉시 접힘, 키우면 즉시 펼침. 리프레시 불필요
  - **단계별 breakpoint** — >1280 둘 다 펼침 / 1280~769 2뎁스 접힘(popover) / ≤768 1뎁스도 햄버거 모드 (기존 CSS @media 활용)
  - **1뎁스 수동 접힘(64px) 시 푸터 icon rail** — 사용자가 « 토글 클릭해 1뎁스 완전 접으면 Refer & Earn / Install App / Language / Profile 4 요소가 깨져 보이던 문제. 40×40 정사각형 icon rail 로 일관 재디자인 (`FooterRailButton`/`FooterRailDot`/`FooterRailAvatar`/`FooterRailLang`). Gift 아이콘(보라 그라데이션) + 잔액 dot indicator, Download 아이콘, 깃발 이모지, 이니셜 아바타. hover translateY(-1px) + shadow + tooltip. 펼친 상태 Refer & Earn 의 ↗ 도 Gift 아이콘으로 통일
  - **로고 100×40 + 사이드바 헤더 여백** — `LogoImage max-width: 140→100, max-height: 60→40`. `SidebarHeader padding 16→14` + `gap: 10px` 명시. 로고와 « 토글 버튼 사이 명확한 여백 확보
  - **Settings Printer 탭 안전 가드** — Bill/Kitchen Printer + Station 의 IP input + Test Print 버튼 행에 `flexWrap: 'wrap'` + `flex: '1 1 180px'`. QZ Tray 상태 행 flexWrap. Network diagram `overflowX:auto`. 좁은 폭에서 자동 줄바꿈
  - **반응형 회귀 점검 도구 추가** — `dev-frontend/scripts/capture-responsive.js` (Playwright). 향후 반응형 회귀 검증 표준 도구

### 검증
- 빌드 `main.53ed5199.js` (1.58MB) · health-check 80/80 · state-hydration 0 warning
- Playwright 검증: 1280×800 / 1366×768 / 1920×1080 × 6 페이지 = 18 캡처 overflow 0 + 에러 0
- 7 역할 × 2 viewport = 14 캡처 overflow 0 + pageerror 0 (Owner 만 dev DB 미존재 → 코드 자동 적용)
- 동적 resize 4 단계 검증 (1600→1200→700→1500) 즉시 반응 확인

---

## [v3.35] — 2026-05-19 배포 (SNS 썸네일 정식 로고 + 모바일 메뉴 헤더 정리)

- **SNS 썸네일 OG 이미지 정식 로고 적용** — 기존 `og-image.png` 가 단순 "PurpleHere" 텍스트 + 그라데이션이라 SNS 공유 시 브랜드 인식 떨어지던 문제. 정식 색상 로고(`color_logo-slogan.svg`, 17.6KB) 를 1200×630 OG 표준 사이즈에 중앙 배치 + "Solving Real F&B Problems" 슬로건 + `purplehere.com` URL 푸터. 파일 사이즈 351KB → 19.6KB (95% 감소). Facebook/Twitter scraper 캐시 무효화를 위해 운영 배포 후 Facebook Debugger / Twitter Card Validator 에서 "Scrape Again" 한 번 필요
- **모바일 메뉴 헤더 정리** — 같은 정보가 두 곳에 중복 표시되던 문제. 상단 헤더 우측의 단순 표시용 "🍽️ Dine-In" 라벨을 메뉴 페이지에 한해 제거 (Cart/Checkout 등 StoreHeader 없는 페이지는 유지), 매장 카드 안의 변경 가능한 chip 만 남김. 매장 카드는 세 줄(매장명/상태/chip) → **한 줄 flex 정렬** (좌측 매장명+branch+작은 상태 도트, 우측 Dine-in chip). 모바일 좁은 화면은 자동 wrap. 상태 표시도 큰 글씨 "✓ Open Now / ✗ Closed" → 작은 컬러 도트 + 라벨로 슬림화

---

## [v3.34] — 2026-05-19 배포 (모바일 오더 UX 정리 + 탭 전환 즉시화)

- **모바일 메뉴 "How to order" 배너 제거** — 모바일 오더 메뉴 페이지 상단의 3-step 안내 배너 (`FirstVisitHint` 컴포넌트) 가 의미가 적고 매번 작은 노이즈가 되던 문제. 컴포넌트 정의 + 사용처 모두 제거. 헤더 직후 검색바 즉시 시작
- **모바일 메뉴 카테고리 idle prefetch** — 첫 탭 후 다른 카테고리 전환 시마다 데이터/이미지를 새로 다운로드하던 문제. `requestIdleCallback` 으로 init 완료 후 백그라운드 순차 prefetch 추가 (데이터 → `categoryCacheRef` 적재 + 썸네일 → `new Image().src` 로 브라우저 HTTP 캐시 적재). 두 번째 탭부터 즉시 표시. **추가 only — 기존 `LazyImage` / `handleCategoryChange` / `categoryCacheRef` 무수정**, 실패해도 기존 동작 그대로 fallback. 안전 가드: `cancelled` flag + cleanup, 첫 카테고리 cache hit 가드, `try/catch silent`

---

## [v3.33] — 2026-05-18 배포 (v3.32 직후 누적 + hotfix 2건)

### 2026-05-18 hotfix (v3.33 같은 날 세 번째 배포, 버전 유지)

- **RA Recipe Management 5 탭 ReferenceError 시급 fix** — v3.32 alert→Modal sweep 작업에서 `setInfoModal()` 호출과 `<ConfirmModal isOpen={infoModal.open}>` JSX 를 추가했지만 `const [infoModal, setInfoModal] = useState(...)` 선언을 누락. 운영 매장 (16/5/8/10) 의 RA가 Recipe Management 탭 진입 즉시 `ReferenceError` → ErrorBoundary 폴백 화면. 5 파일에 useState 한 줄씩 추가 (CategoriesTab / GeneralStockCategoriesTab / IngredientCategoriesTab / RecipeCategoriesTab / IngredientsTab). 전수 sweep 으로 동등 결함 0건 확인
- **모바일 OrderTypePage Footer 링크** — 모바일 첫 화면 하단에 로그인 상태 분기 (POS Admin/Staff → "Back to Dashboard", 그 외 → "Visit PurpleHere homepage"). i18n `common:visitHomepage` 4언어 신규
- **BG/FG/Owner Reports `/api/menu` 호출 fix** — restaurantId 없이 호출하던 결함 (BG/FG/Owner 는 own `restaurant_id` 없음). `allowedRestaurantIds` 순회 + 카테고리 dedup 패턴으로 변경. Owner 운영 검증 OK, BG/FG 는 backend `checkRestaurantAccess` 미들웨어가 BG/FG scope 미지원 (별도 사이클 작업)
- **헤드리스 자동 mount sweep 도구 작성** — Playwright 기반. RA(47) + BG(23) + Admin(28) + FG(26) + Owner(15) + Supplier(14) + FCM(6) + BM(6) = 95 페이지 mount + console error 캡처. 안정화 사이클 표준 도구로 정착. 운영 hotfix 전 검증 가능

---

### 2026-05-18 (v3.32 직후 누적 — KDS / PWA standalone / Back 버튼 / Admin Invoices / RA support)

- **Kitchen Display 정확성 보완 4건** — 30년차 개발자 수준 전수 검증 후 잠재 결함 제거.
  - `formatPickupTimeRange` 가 브라우저 로컬 timezone 사용하던 결함 → `Intl.DateTimeFormat({ timeZone })` 으로 매장 timezone 기준 표시 (`KitchenDisplayPage.tsx:14-30`, 호출 2곳 `operationSettings?.timeZone` 전달). CLAUDE.md 룰 위반 정정
  - Pickup 주문 정렬이 `orderTime` 만 사용하여 14:00 pickup 이 13:45 dine-in 뒤에 표시되던 문제 → `ordersByStatus` 정렬 키 분기 (pickup → `scheduled_pickup_time`, 그 외 → `orderTime`). ASAP pickup 은 orderTime fallback
  - URL `?station={index}` 1-based index 가 station 재정렬 시 잘못된 station 활성화 → stationId 우선 매칭, index fallback 유지 (구 bookmark 호환). 토글 클릭 시 URL 에 stationId 저장
  - Backend `/api/orders/restaurant/:id?status=` 가 단일 status 만 지원 → 콤마 구분 다중 status 지원 (`pending,preparing,ready`). KDS fetch URL 에 status param 추가하여 cancelled/served 응답 페이로드 제외 (효율). 단일 status / 빈 status / 미지정 모두 호환
  - 운영 영향: 4개 활성 매장 모두 1-station / pickup 미사용 / merge disabled — 즉시 영향 0. 향후 pickup 활성화 / 멀티 station 도입 시 안전망 작용

- **PWA standalone 데스크탑 앱 풀화면 메뉴 새 창 → 같은 창 전환** — 사이드바의 POS Terminal / Floor Plan / Kitchen Display / Customer Display / Mobile Order 가 `window.open(_, '_blank')` 사용하던 결함. PWA standalone 명세상 외부 브라우저로 빠짐 → 데스크탑 앱 사용자 경험 깨짐.
  - `src/utils/runtime.ts` 신규 (`isStandalone()` helper, 추후 다른 페이지에서도 활용)
  - `MainLayout.tsx` `openSecondaryWindow(path)` 헬퍼 추가 — standalone → `navigate(path)` 같은 창 라우팅, 브라우저 → 기존 새 탭 (멀티 모니터 운영 패턴 보존)
  - 사이드바 + dashboard quick-launch + mobile-order popup-blocker 회피 패턴 모든 호출 일괄 교체

- **4개 풀화면 페이지 Back 버튼 표준화** — Customer Display 에 Back 버튼이 없어 데스크탑 앱에서 빠져나갈 수 없던 문제. POS Terminal 의 inline Back 패턴을 공용화.
  - `components/Common/PageHeader.tsx` 에 `backHref` / `backLabel` prop 추가 + 좌측 Back 버튼 렌더링 (디자인 토큰 일치, hover/focus ring, a11y title)
  - Kitchen Display: `PageHeader` 에 `backHref` 전달
  - Customer Display: 자체 Header 좌측 inline Back 버튼 추가 (POS Terminal 동일 패턴)
  - Floor Plan: 기존 "← Back" 라벨 → "← Dashboard" 통일
  - i18n `common:backToDashboard` 4언어 신규 (Back to Dashboard / 대시보드로 돌아가기 / 返回仪表盘 / Kembali ke Papan Pemuka)

- **System Admin Invoices — Cancel + Revert to Draft 버튼 추가** — 운영 매장이 발행한 invoice 를 결제 전에 취소할 방법이 없던 문제. `pending_payment` / `overdue` 상태에 **"Revert to Draft"** 버튼 (invoice_number 유지, 매장 수정/재발송/삭제 자유, modification history 자동 기록) + **"Cancel"** 버튼 (영구 무효, 회계 audit trail 보존) 추가. `payment_submitted` 상태에는 Cancel 만 (손님 결제 정보 제출 후 draft 복귀 부적절). 기존 dead 코드였던 Cancel 모달 trigger 연결 + Revert 모달 신규. backend `PATCH /invoices/:id/status` 는 이미 자유 status 변경 지원하여 backend 변경 없음. i18n 4언어 5 키 × 4 = 20 추가

- **RA `/restaurant/:id/support` 페이지 타이틀 = 사이드바 라벨** — 메뉴는 "System Inquiry" 인데 페이지 타이틀이 "Support Tickets" 로 미스매치였던 문제. `Restaurant/SupportTicketsPage.tsx` 의 Title 만 `t('nav.systemInquiry')` 로 변경. 4언어 common.json 에 이미 존재. Manager/Admin/BG/FG/Supplier 동등 페이지는 이미 systemInquiry 키 사용 — RA 만 outlier 였음

---

## [v3.32] — 2026-05-18 배포

- **테이블 QR 무조건 dine-in 고정** — 플로어 플랜에서 프린트되는 테이블 QR이 매장 설정의 dineIn 토글 상태에 따라 picker가 떠 takeaway/delivery 로 새는 문제. `/api/restaurants/:id/tables/:num/qr` POST/GET 응답의 `qr_url` 끝에 `&order_type=dine-in` 강제 추가 + Settings → Table QR generator (1451/1472) 2곳 동일 처리. master QR 4종(`?order_type=takeaway` 등)은 의도된 모드 선택용이라 미변경
- **Reservation 기능 base 격상 (paywall 제거)** — RA 사이드바 Reservation 메뉴가 `hasModule('reservations')` 에 묶여 plan 모듈 보유 여부에 따라 메뉴가 사라졌다 나타났다 하던 문제. `MainLayout.tsx` 두 곳의 `hasModule` 제거 → 사이드바 항상 표시. `store.js` 의 `reservation_settings.enabled=true` 시 plan 모듈 검증 paywall block 제거. `promote-reservations-to-base.js` 신규 마이그(AddonModule category `advanced`→`basic` + 3개 restaurant plan에 `reservations` 보장, idempotent). 모바일 손님 가시성은 Settings 토글이 단독 제어
- **Mobile Order Settings 탭 전수 보강 (7개 카드)** —
  - Order Types 4개 토글에 hint span 추가 (Dine-in/Takeaway/Pickup/Delivery — Reservation 패턴 일관). "Popular Menu Categories" → "Popular Menu — Source Categories" + 의미 명확 설명. Quick Order ON 시 callout 박스(픽업 번호 호출 운영 안내)
  - **Mobile Order Entry 카드 신규** (탭 최상단) — 매장 모바일 URL + Copy URL 버튼 + 미니 QR + Store Settings 의 Quick-entry QR codes 페이지로 이동 링크
  - **Pickup Settings 카드 신규** (orderTypes.pickup ON 시) — 평균 준비 시간 + 픽업 위치 안내 + 직원 확정 필요 토글. operation_settings JSON 확장
  - **Takeaway Settings 카드 신규** (orderTypes.takeaway ON 시) — 평균 준비 시간 + 포장 안내
  - **모바일 주문 일시 중단 카드 신규** — `mobile_settings.pause_ordering` 토글 + `pause_message` 커스텀 메시지. 활성화 시 빨간 좌측 4px border 강조. 모바일 OrderTypePage 에서 메뉴 픽커 대신 빨간 일시 중단 박스 + 커스텀 메시지 표시
  - 모바일 OrderTypePage: Pickup/Takeaway OptionSubtitle 에 "Ready in ~X min · pick up at counter" 동적 표시. backend mobile-public.js 에 pickupSettings/takeawaySettings/pauseOrdering/pauseMessage 노출
  - i18n 4언어 신규 27 키 (orderTypeHint × 4 + quickOrderCallout + popularMenuCategoriesHint + pauseOrdering + pauseMessageLabel/Placeholder + pickupSettings + takeawaySettings + prepMinutes + pickupLocationNote/Placeholder + packagingNote/Placeholder + confirmationRequired + mobileOrderAccess/Hint + copyUrl/urlCopied/openQrManager)
  - state-hydration 안전성: `popular_excluded_category_ids.includes` unsafe access 동시 fix
- **RA `/restaurant/:id/support` 페이지 타이틀 = 사이드바 라벨** — 메뉴는 "System Inquiry" 인데 페이지 타이틀이 "Support Tickets" 미스매치. `Restaurant/SupportTicketsPage.tsx` 의 Title 만 `t('nav.systemInquiry')` 로 변경 (4언어 common.json 에 이미 존재: System Inquiry / 시스템 문의 / 系统咨询 / Pertanyaan Sistem). Manager/Admin/BG/FG/Supplier 동등 페이지는 이미 systemInquiry 키 사용 — RA 만 outlier 였음

- **QZ Tray 프린터 설정 가이드 시나리오 분기** — Settings → Printer → "View Setup Guide" 모달에 "기존 LAN 프린터 (다른 POS에서 이전)" / "프린터 새로 설치 (신규 세팅)" 토글 추가. 시나리오별 step list (마이그 3단계 / 신규 5단계 + 공통 "브라우저 연결 허용" 1단계). 마이그 Step 1 에 "이미 설치돼 있는지 확인" 보조 hint (시스템 트레이 QZ Tray 아이콘 — 다른 web POS 도 사용 가능성). 데스크탑 앱 설치 시 동일 작동 안내 박스 추가. 네트워크 다이어그램에 "Browser 또는 Desktop App (POS)" 명시. 토글 button 접근성 `type="button"` + `aria-pressed`. 4언어 (en/ko/zh/ms) 17 신규 키 × 4 = 68 entries
- **전수 alert() → 표준 Modal sweep** — 24 페이지 70+ 건의 브라우저 `alert()` 호출을 통일 패턴 (`infoModal` state + `<ConfirmModal singleButton type="info">`) 또는 페이지 자체 `setSuccessMessage + setShowSuccessModal` 재사용 으로 일괄 교체. 전체 pages 의 `alert()` 잔존 0건. 주요 페이지: MenuManagement / Customers / Settings / BrandInvoices (15건) / BrandProducts / BrandProductRecipe (Ingredients · Categories · RecipeCategories) / Suppliers / SystemInquiry (Brand/Restaurant/Foodcourt) / CategoryManagement / POSTerminal (4건, 매장 운영 핵심 화면) / ProductRecipe / NewPurchaseOrder (styled overlay → UIModal 컴포넌트) / FoodcourtInvoices (15건) / Admin (Invoices 14 · Staff 11 · Subscriptions 5 · RestaurantSubscriptions 6 · Content 3 · SystemConfig 4 · BackupRestore 1 · SystemProductManagement 9 · Security 2) / Manager (Plans · ManagerSubscriptions · Signup) / RecipeManagement (5 tabs)
- **신규 i18n 키** — menu: copyFailed/toggleFailed/setMenuRequired (6키), customers: deleteFailed (2키), brand: brandProductsTab deleteFailed (2키), settings: featureInDevelopment/addBrandComingSoon/billingComingSoon/externalQR* (7키) — 모두 4언어
- 알림 이메일 카테고리 + 역할별 분리 검증 — NOTIFICATION_CATEGORIES single source, RA 21 cats / BG 14 cats / FG/Admin/Supplier 각 의도된 분리 확인. sendNotification 호출 18곳 일관
- BG → RA Brand Menu 동기화 검증 — rest=5 에 5개 메뉴 `brand_menu_link_status='in_sync'` propagation 정상. BG → 다른 brand / RA → 다른 brand-menus cross-access 모두 403 차단

### 2026-05-15 (v3.31 배포 후 추가 개발)

- **운영 매장 메뉴 긴급 복구 hotfix** — v3.31 배포 시 `migrate-brand-menu-system.js` 자동 실행 누락으로 신규 컬럼 (`brand_menu_link_status` 등) 부재 → API 500 → 매장 메뉴 안 보임. 마이그레이션 + backend 재시작으로 즉시 복구 (데이터 손실 0). 운영 직접 조회로 490건 매장 product 모두 자체 메뉴 (brand_menu_id=NULL) 보존 확인
- `deploy-to-production.sh` 의 sprint migrations 목록에 `migrate-brand-menu-system.js` 추가 — 같은 누락 재발 방지
- `brandMenuSyncService.js` push 정책 — BG push 메뉴는 매장에 `is_active=false` 로 도착 (사용자가 활성화 결정). 매장 자체 메뉴 (brand_menu_id=NULL) 영향 0, recipe-style 공존
- Brand Menu System 통합 검증 27/27 PASS — BG push + Lock guard (PRODUCT_FIELD_LOCKED_BY_BRAND) + Version bump propagation (OG → BM) + Sync (RA `pending_update` → `in_sync`) + Soft unlink (BM 삭제 시 매장 product 보존 + status='unlinked') + 자체 메뉴 자유

- **Customer Display 전화번호 토글** — Settings → Printer 탭 Customer Display 카드에 토글 추가. `operation_settings.checkout_display.show_phone_input` 매장 단위 저장. 멤버십 안 쓰는 매장 OFF 시 LeftPanel 미표시 — 우측 주문 내역 풀 너비. 디폴트 ON (회귀 0). i18n 4언어
- 식재료 이미지 업로드 fix — `IngredientsTab.tsx` (RA) + `ProductIngredientsTab.tsx` (BG) 가 `<input type="file">` + 직접 FileReader 패턴 → ImageUploadDropzone 으로 교체. 큰 사진 업로드 silent fail 해소

- **buildVersionWatcher 자동 reload** — Cloudflare 5분 캐시 우회. 4분마다 백그라운드 `/index.html` fetch → main bundle hash 비교 → 새 빌드 발견 시 30초 grace 후 자동 reload. 사용자 입력 중 (form/textarea/modal/active fetch) + 탭 hidden 안전 대기. localStorage 60초 throttle 로 reload 루프 방지. 탭 visible 전환 시 즉시 한 번 더 체크. 향후 모든 배포에서 직원 캐시 문제 영구 해소

- **/install 페이지 정리** — 디자인 빈약 + 사용 동선 적음. 페이지 자체 삭제 + `/install` → `/` redirect (옛 URL 호환). LandingHeader/LandingFooter Install nav 제거. PWA 설치는 브라우저 native + PwaInstallBanner 로 충분
- 사이드바 Install 버튼 promptInstall 직접 호출 방식 복원 — MainLayout 사이드바 하단. 데스크탑 (Chrome/Edge `canInstall=true`) + iOS Safari ("Share → 홈화면 추가" 안내 alert). standalone 모드 자동 숨김

- **i18n 안정화 (RA 한국어 핵심)** — ko/settings 11 + ko/orders 2 + ko/notifications 1 + ko/menu 2 + ko/pos 1 + ko/floorplan 1 = 18건 한국어 번역 누락 fix (영수증 안내 / 카테고리별 포장 추가금 설명 / 옵션그룹 빈상태 등). 글로서리 자동 fix 16건
- 신규 i18n 도구 — `auto-fix-glossary.js` (글로서리 mismatch `--apply` 자동 fix), `i18n-find-english-leaks.js` (heatmap + drill-in `--file <lang>/<name>.json`)

- **운영 디버그 패턴 메모리** — `feedback_debug_real_calls.md`: 운영 버그 보고 시 SSH read-only + API 직접 호출로 진단 (dev 코드 추정 금지)
- **운영 배포 룰 강화** — `feedback_deploy_only_irene.md`: frontend rsync 포함 모든 운영 변경 = Irene 직접 실행. 룰 위반 사례 기록

---

## [v3.31] — 2026-05-15 배포 (이전 사이클)

### 2026-05-15

- **Customer Display 듀얼 모니터 자동 표시** — POS Terminal 헤더 "Customer Display" 버튼 강화. Window Management API (Chrome 100+/Edge 100+) 로 보조 모니터 자동 감지 + 풀스크린 popup. 첫 클릭 후 localStorage 에 위치 저장 → 다음 POS 진입 시 첫 user gesture 에 자동 재오픈
- Settings → Printer 탭에 Customer Display 카드 추가 — Open Now + Auto-reopen 토글 + Windows 부팅 시 100% 자동 (Chrome `--kiosk --new-window` 4-step 가이드)
- 신규 utility `src/utils/customerDisplay.ts` — 다른 페이지에서도 호출 가능
- i18n 4언어 11키 신규 (settingsPage.customerDisplay.*)

- **메뉴 이미지 업로드 차단 fix** — `ImageUploadDropzone` 의 `maxSize=2MB` 가드가 핸드폰 카메라 사진 (3-7MB) alert 차단하던 결함. canvas 가 어차피 1200x1200 + JPEG 0.85 자동 압축하므로 원본 size 체크 무의미
- maxSize 디폴트 2 → 10MB, hard limit 15MB, HEIC/HEIF silent fail 명확 alert 로 변경, file.type 가드에 HEIC/HEIF 포함
- MenuManagementPage × 3곳 + GeneralStockFormModal `maxSize={2}` prop 제거 → 디폴트 적용
- BG BrandMenusPage 텍스트 input → ImageUploadDropzone 교체 (BG가 brand menu 이미지 업로드 자체가 안되던 누락 결함 동시 fix)
- 운영 backend `/api/upload/image` 직접 검증: 4000x4000 JPG 까지 200, sharp/nginx/디렉토리 모두 정상 — 차단 원인은 100% frontend

- **i18n 안정화 (한국어 핵심 18건 + 글로서리 자동 16건)**
- 신규 도구 `dev-frontend/scripts/auto-fix-glossary.js` — `--apply` 로 글로서리 mismatch 자동 fix
- 신규 도구 `dev-frontend/scripts/i18n-find-english-leaks.js` — heatmap + drill-in (`--file <lang>/<name>.json`)
- ko/settings.json 11건 + ko/orders.json 2건 + ko/notifications.json 1건 + ko/menu.json 2건 + ko/pos.json 1건 + ko/floorplan.json 1건 한국어 번역 (영수증 안내 / 카테고리별 포장 추가금 설명 / 옵션그룹 빈상태 등)

- **RA / BG 전수 기능 검사 (실제 데이터)** — RA GET 26/26 + CRUD 13/13 = 39/39 PASS. BG GET 24/25 + CRUD 4/4 = 28/29 (1 known-by-design: coupon 모델은 restaurant 단위만 지원). 다음 주 유료 고객 운영 대비 안정성 확보

### 2026-05-14
- **Brand Menu System (v3.32-dev)** — Brand General(본부) 이 메뉴 템플릿을 만들어 산하 가맹점 매장에 푸시. 잠금/버전 동기화 지원.
- BG 페이지 3개 — Brand Menus (CRUD + push + 잠금 5플래그 + Auto/Manual distribution), Menu Categories, Menu Options (옵션 그룹 + 옵션 inline)
- RA 페이지 1개 — Brand Menu Updates (pending 카드 + diff + Sync This / Skip / Sync All Now)
- MenuManagement (RA) — BRAND 뱃지 + 잠금 개수 + pending dot, Edit 모달 잠긴 필드 disabled + 자물쇠 아이콘
- 사이드바 재구성 — 기존 Management → Brand Management (Brands / Brand Menus / Menu Categories / Menu Options / Brand Recipes) + Franchise (Restaurants / Restaurant Admins / Managers) 2개로 분리
- 잠금 가드 — products.brand_menu_locks_snapshot JSON. PUT /api/menu/product/:id 가 잠긴 필드 수정 시 400 PRODUCT_FIELD_LOCKED_BY_BRAND
- 버전 propagation — BG 가 메뉴/옵션그룹 수정 시 version++ + 사용 매장 Product 자동 pending_update 마킹. RA "Skip This Version" 으로 특정 버전 건너뛰기 가능
- 옵션 그룹 미러 — BrandMenuOptionGroup → 매장 OptionGroup 양쪽 entity (RA 자체 옵션은 보존)
- DB — 5 신규 테이블 (brand_menus, brand_menu_categories, brand_menu_option_groups, brand_menu_options, brand_menu_option_group_links) + products 5 컬럼 + option_groups 2 컬럼. 마이그레이션 idempotent
- i18n 4언어 (en/ko/zh/ms) 71 키 추가
- 설계 문서 `docs/BRAND_MENU_SYSTEM.md`. 검증: E2E 21/21 PASS, health-check 80/80, state-hydration 0 warning

---

## [v3.30] — 2026-05-13 배포

- **PWA 데스크탑/모바일 앱 빈 화면 fix** — `manifest.json` start_url 이 `/pos/login?utm_source=pwa` 였는데 App.tsx 에 `/pos/login` 라우트 자체가 없어서 PWA 설치 후 빈 화면. `/pos?utm_source=pwa` 로 교정 (LoginPage 가 useEffect 로 역할별 dashboard 자동 redirect)
- **알림 우리 규칙 정확 반영** — NotificationSettings UI 토글이 `user.notification_preferences` 에 저장되는데 푸시 발송은 `push_preferences.categories` 만 검사하던 결함. UI 토글 OFF 해도 푸시 계속 받던 문제. `pushService.isCategoryEnabled` 통합 — `notification_preferences` 우선 검사 + `push_preferences` 도 fallback (둘 중 하나라도 false 면 차단). 단일 source of truth = NotificationSettings UI
- pushService `User.findByPk` attributes 에 `notification_preferences` 추가. 미사용 OPT_IN_CATEGORIES (`marketing`, `owner_report`) 제거
- **Stock Items 페이지 응답 3.15MB → 7.4KB (425배 감소)** — `ingredients.image_url` 컬럼에 base64 PNG 인라인 저장(각 1.5MB) 되던 결함. IngredientsPage 는 image_url 을 사용도 안 하는데 매 진입마다 전체 다운로드 → 페이지 로딩 전반 느림의 진짜 원인
- DB 마이그레이션 스크립트 신규 — `scripts/migrate-base64-images.js`: ingredients 6건 base64 → 파일 (sharp 600×600 압축 75KB), company_settings.og_image_url 1건 (153KB → 33KB), products.image 누락 1건 (product_14 `/uploads/products/*.jpg 404`) NULL 처리
- 백엔드 신규 입력 가드 — `routes/restaurants-ingredients.js`, `routes/ingredients.js` POST/PUT 핸들러에 `normalizeIngredientImage` 추가. base64 들어오면 자동 디스크 저장 + URL 변환. 같은 안티패턴 재발 차단
- `utils/imageProcessor.saveImageToFile` — `subdir` 옵션 추가 (logos/ 외 ingredients/, site/ 등 임의 dir)
- **MenuManagement onError TypeError fix** — `e.currentTarget.parentElement.innerHTML` 직접 교체하던 React 안티패턴이 null.style TypeError + 무한 루프 가능성. `<MenuItemImageWithFallback>` 컴포넌트 + useState 분리 패턴으로 교체
- **햄버거 메뉴 모바일 2뎁스 펼침** — `SecondaryPanel` 이 `@media (max-width: 768px) { display: none }` 라서 모바일에서 1뎁스만 노출되던 결함. `MobileSubmenu` styled-component 추가 (RailItem 바로 아래 inline accordion, 흰배경, ≤768px 만 표시) + `mobileExpandedCatId` state. 현재 location active 카테고리는 자동 펼침. 적용 6 역할(useTwoTier) 모두
- `deploy-dev.sh` 견고화 — 다중 user (irene/lua) 번갈아 빌드 시 chmod fail 로 배포 중단되던 결함. `find -not -user CURRENT_USER` 로 다른 user 소유 파일도 자동 chown
- 개발서버 lua 사용자 ACL 부여 — `/var/www/dev-frontend`, `/var/www/dev-backend`, `/var/www/dev-frontend-build` 에 `setfacl -R -m u:lua:rwX` + default ACL. 운영 영향 없음 (개발서버 환경 변화)
- 운영 배포 main.44e0d72d.js, smoke 10/10 PASS, 백업 `/var/www/backups/20260513_074418`

---

## [v3.29] — 2026-05-12 배포

### 2026-05-12 — backend 안정화 + 예약 timezone 정상화

- **DB 중복 unique 인덱스 일괄 정리** — `users` 64-key 한도 임박 (`username_2`/`email_3`/...). 전체 19 테이블 521건 정리 (`scripts/cleanup-duplicate-indexes.js` 신규)
- **`sequelize.sync()` startup 비활성화** — 매 재시작마다 unique 인덱스 누적 추가 결함. 기본 OFF, `STARTUP_DB_SYNC=true` 로만 활성. 미실행 시 인덱스 정리만 자동 수행
- `node sync-database.js` 안전 모드 추가 — `--alter` 명시 시에만 실행, 직후 자동 중복 정리
- **`push.js` IPv6 rate-limit** — `keyGenerator` 가 `req.ip` 그대로 사용 → `ipKeyGenerator(req.ip)` 로 IPv6 정규화. 미적용 시 라우트 등록 실패
- **Foodcourt General Reports 라우트 차단 버그 fix** — `fc_stats` 모듈 ui_routes 가 `/pos/foodcourt/general/stats` (미존재) 였던 결함. React route 매칭 `/pos/foodcourt/general/reports` 로 갱신
- **예약 슬롯 생성 timezone 정상화** — `calcSlotAvailability` 가 server-local (UTC) 로 시간을 해석하던 결함. 레스토랑 `operation_settings.timeZone` 으로 일자/슬롯 산출. `dateTimeHelper` 에 `localClockToUTC` / `formatTimeInTZ` 추가
- 예약 스태프 list API (`GET /reservations/restaurant/:id`) 일자 필터도 동일하게 레스토랑 timezone 기준 UTC bounds 사용
- 예약 시드 데이터 (restaurant_id=5, KR) 5건 정상화 — `at(19,30)` UTC → 10:30 UTC (KST 19:30 표시)
- health-check.js — DB 카테고리 추가 (인덱스 ≤ 15, 동일 컬럼 중복 0건). 총 78 → 80 케이스

### 2026-05-12

- 예약 페이지 (ReservationsTimelinePage) 에 Source 컬럼 + 필터 chip (All / Customer / Staff) 추가 — 고객이 직접 넣은 예약과 직원이 입력한 예약 구분
- 예약 액션 버튼 LiveOrders 정렬 — 단계 전환은 destination status 색 + 흰 글자 (Confirm 녹 / Arrived 브랜드 메인 / Seated 보라 / Completed 회색), No-show + Cancel × 는 LiveOrders 연회색
- 예약 STATUS_COLOR Tailwind 팔레트 정렬 (ORDER_STATUS_STYLE_GUIDE 시스템 일치)
- 예약 Pending approval 과 Today 섹션 중복 제거 — pending 항목은 Pending approval 에만 노출
- 버튼 / 뱃지 라벨 대문자화 (Confirm / Arrived / No-show 등)
- PwaInstallBanner Dismiss 텍스트 버튼 → × 아이콘 버튼
- 앱 아이콘 (favicon / logo192 / logo512 / apple-touch-icon / favicon.ico) 새 SVG 기반으로 일괄 교체. manifest.json SVG 우선 + PNG fallback 등록
- **site-settings SVG 파비콘 업로드 버그 fix** — imageProcessor.js base64 mime regex `\w+` → `[a-zA-Z0-9.+-]+` (svg+xml 의 `+` 미매칭으로 SVG 업로드 시 favicon 이 wipe 되던 결함). SVG 는 벡터 보존 (.svg 그대로 저장)
- favicon 즉시 갱신 UX — 저장 후 응답 기반 state 갱신 + cache-bust 토큰으로 LogoPreview / link[rel~='icon'] / apple-touch-icon 모두 무효화. App.tsx 글로벌 favicon 적용도 동일 처리
- UI_DESIGN_GUIDE 4.2.1 신규 — 상태 전환 액션 버튼 strict 규칙 (LiveOrders 4 색 팔레트 + 공용 컴포넌트 import + Material 진한색 / 파스텔 채움 금지)

### 사이드바 2단 구조 전면 리디자인 (2026-05-11)

**모든 역할(System Admin / Brand / Foodcourt / Owner / Supplier / Restaurant Admin) 사이드바를 1뎁스 카테고리 + 2뎁스 sub-menu 2단 구조로 통일** (Sentry / Stripe / Linear 패턴).

**1뎁스 (카테고리 rail, 220px / collapsed 64px)**:
- 좌측 사이드바: 회색 `#EEF0F4` 배경
- 메뉴 아이콘: 유니코드 기하문자(■◯◐◆◉) → **lucide-react 통일 라인 아이콘** (stroke 1.5, 16px)
- Active: 흰 배경 + 좌측 3px 보라 라인 + 보라 글자 (font-weight 600)
- Hover: 글자만 보라 (배경 없음)
- 알림 dot: 1뎁스 카테고리에 자식 pending 있으면 propagation + blink 점멸

**2뎁스 (sub-menu panel, 220px white)**:
- 우측 흰 패널: 1뎁스에서 선택된 카테고리의 sub-menu
- 텍스트만 (아이콘 없음)
- collapse 가능 (ChevronsLeft) → localStorage 저장
- collapsed 상태에서 1뎁스 hover 시 floating popover 자동 노출

**헤더 80px 통일**:
- SidebarHeader / SecondaryHeader / PageHeader 모두 `height 80px / box-sizing border-box / padding 16px` 강제
- PageComponents.tsx / Common/PageHeader.tsx 의 Header height 56 → 80
- 65개 페이지의 자체 styled Header 일괄 변경
- 가로 라인 정렬

**역할별 카테고리 재분류**:
- System Admin: 7 카테고리 (Settings 안에 Company Info / Site Settings / Notifications / System Config / System Logs / Change History)
- Brand: 10 카테고리 (Operations 안 Purchase Order/Order History/Supplier Contracts 통합, Reports 1뎁스 + 6 탭 sub)
- Foodcourt: 동일 + **Floor Plan** 1뎁스 단독 (새 창)
- Restaurant Owner: 6 카테고리
- Supplier Admin: 6 카테고리
- Restaurant Admin: **POS Terminal · Floor Plan · Kitchen Display · Customer Display · Mobile Order** 1뎁스 단독 (모두 새 창) + Reports 1뎁스 + 6 탭 sub

**Reports 1뎁스 + 탭 2뎁스 (Brand/Foodcourt/Owner/Restaurant Admin)**:
- 6 탭 (Sales Ranking / Sales Report / Sales Details / Menu Analysis / Customer Insights / Operations) 각각 `?tab=xxx` URL
- matchPathBase / matchPathFull 매칭 함수 신규

**풀화면 메뉴 새 창 열림**:
- POS Terminal / Floor Plan / Kitchen Display / Customer Display / Mobile Order
- AdminCategory.openInNewTab + mobileOrder 옵션
- Mobile Order popup blocker fix: `window.open('about:blank') + async slug fetch → location.href`

**Subtitle 제거**:
- Live Orders / Foodcourt Management / Reservations Timeline 의 단순 설명 부제목 hide
- Common/PageHeader.tsx subtitle prop 렌더링 무력화

**버그 fix**:
- `/restaurant/:rid/customers` ReferenceError: user is not defined — useParams 의 `restaurantId` 로 교체
- styled-components #12: keyframe interpolation 을 `css` helper 로 감싸 v5+ 호환

**검증**: state hydration 0 warnings / health-check 78/78 / 빌드 0 new warning / Playwright 측정 (3 역할 헤더 80px + RailItem 정렬 확인)

### Reservation 모듈화 + Settings UI 통일 (2026-05-11)

**Backend 모듈 시스템 등록**:
- AddonModule 신규: `reservations` (target='restaurant', category='advanced', sort_order=235 — 모바일오더 230 다음, price=$0.00 시장 진입용)
- PlanTemplate Basic/Professional/Enterprise `included_modules` 에 reservations 추가 (모든 tier 무료 제공)
- `middleware/requireModule.js`: `requireRestaurantModule(moduleCode)` 신규 (Restaurant.plan_type → PlanTemplate.included_modules 검사, System Admin/demo bypass)
- `routes/store.js` PUT /settings: `reservation_settings.enabled=true` 토글 시 module 보유 검증 — 미포함 plan 매장 자동 403 차단

**Frontend 모듈화**:
- `MainLayout.tsx` Reservations NavItem 에 `hasModule('reservations')` gate
- `RestaurantsPage` 매장 카드에 보라색 'Reservations' 배지 (reservation_settings.enabled=true 일 때)
- 추가 fix: `routes/restaurants-crud.js` GET `/` transform 함수에 `reservation_settings` 명시 추가 — list 응답에서 누락되어 배지 데이터가 안 오던 결함 (검증 중 발견)

**랜딩 (4언어)**:
- `FeaturesPage` Restaurant 탭에 Reservations 카드 (모바일오더 다음, 6 bullet features)
- `PricingPage` 모듈 라벨 매핑에 reservations 추가
- `landing.json` 4언어: features.reservations.title/desc

**Settings UI 통일 (산업 표준)**:
- `PageHeader.tsx` 에 `settingsHref` + `settingsLabel` prop, `<PageSettingsLink>` 재사용 컴포넌트 export
- 페이지 우상단 ⚙️ 아이콘 → 관련 Settings 탭 deep link (Stripe/Toast/Square 패턴)
- 적용 6 페이지: Reservations, LiveOrders, KitchenDisplay, Customers, Promotions, Reports
- 신규 가입자 안내는 v3.27 Walkthrough 가 담당 — 가이드 패널 중복 제거

**검증**: 모듈 gating 9/9 + health-check 78/78 + 빌드 main.70ff1b26.js 0 new warning.

### Reservation R1 3가지 결함 fix (2026-05-11)

**검증 중 3개의 추가 결함 발견 및 수정 (단순 customer_id fix 만이 아니었음):**

**결함 A — customer_id NULL (사용자 차단)**:
- POST `/reservations` 가 첫 예약 (RestaurantCustomer 없는 경우) 시 `customer_id: null` 로 저장 → 본인 `/me` 에 안 보이고 취소/수정 불가
- 수정: `sequelize.transaction` 안에서 `findOrCreate` → `Reservation.create` → `reservation_count++` 원자적 실행

**결함 B — reservation_count 이중 증가 (데이터 부정확)**:
- `routes/reservations-staff.js` PATCH `/:id/status` 의 `status='completed'` 분기가 `reservation_count++` 수행
- POST 단계에서도 +1 → 한 예약 완료 시 카운트 2 가 됨 (통계 부정확, 사실상 운영 배포된 상태로 dev DB 손상 가능)
- 수정: completed 분기는 `last_reservation_at` 만 업데이트, count 증가 제거

**결함 C — PATCH /me/:id 정책 우회 (비즈니스 룰 무력화)**:
- 고객이 본인 예약 수정 시 `party_size`, `reserved_at` 변경에 검증 부재 → `party_size: 100` (max=20) 같은 입력 통과
- 새 슬롯 캐파 / min_advance_hours 도 재검증 안 함 → 슬롯 우회 가능
- 수정: POST 와 동일한 정책 적용 (min/max party, min_advance, slot capacity). 자기 자신 기존 예약은 캐파 계산에서 제외 (이중 차감 방지).

**Tooling**:
- `scripts/backfill-reservation-customer-id.js`: 운영 안전망 (Customer.phone 매칭 복구, `--dry-run`).
- `scripts/health-check.js` reservation 카테고리 신규 **5건**: customer_id NOT NULL + /me 포함, 익명 차단, cross-token 차단, **이중계산 차단**, **PATCH party_size 차단**. health 73 → **78**.

**검증**:
- R1 결함 probe 4/4 (이중계산 발견·수정·재검증, party_size=100 차단 검증)
- health-check 전체 78/78
- 운영 배포 시 backfill 스크립트 실행 권장 (이중계산은 PATCH 코드 fix 로 미래 차단, 과거 손상은 별도 정정 필요 시 SQL 보정)

**known-WONTFIX (별도 sprint)**:
- RestaurantCustomer 모델 vs DB 컬럼 불일치 (name/phone/email silently dropped, 데이터 손실 없음 — Customer 모델이 권원)
- 동시 booking race window (slot check ↔ INSERT 사이) — advisory lock 필요
- 과거 손상된 reservation_count 값 정정 (필요 시 SQL: `UPDATE restaurant_customers SET reservation_count = (SELECT COUNT(*) FROM reservations WHERE customer_id = restaurant_customers.id)` — 미실행, Irene 확인 후)

### ManagersPage Edit SubscriptionFormFields 통합 + User.auto_renew 컬럼 추가 (2026-05-11)
- **목적**: v3.27 sprint 4 의 Add 모달 통일을 Edit 모달까지 확장. BG/FG/Owner 의 Edit 폼에서도 Discount/Auto-renew/Trial/Summary 사용 가능.
- **ManagersPage Edit 모달**: Currency/Plan/BillingCycle/Period 5 필드 → `<SubscriptionFormFields userType="brand|foodcourt|owner" mode="edit" hideActivateNow hidePaymentModel>` 1 컴포넌트. Discount 등 추가 기능 자동 노출.
- **Manager interface 확장**: discountType/discountValue/discountReason/treatAsTrial 필드 추가.
- **handleUpdateManager 보강**: discount_type/value/reason + subscription_status 전송 추가.
- **Pre-existing bug 발견 + 수정**: User 모델에 `auto_renew` 컬럼 부재 → Sequelize silently drop → BG/FG/Owner 의 auto_renew 데이터 손실. User.js 모델에 `auto_renew BOOLEAN NOT NULL DEFAULT true` 추가 + dev DB ALTER TABLE 적용. 운영 배포 시 sync-database.js 가 자동 적용.
- **부산물**: `formatPlanPrice`, `DateField` 미사용 import 제거. ManagersPage.tsx 1650 → 1613줄 (-37줄).
- **검증**: PUT BG 9/9 (plan_type/billing_cycle/currency/auto_renew/discount_*/subscription_end auto-calc). health-check 73/73. 빌드 main.cfcf20e4.js 0 new warning.
- **범위**: SubscriptionsPage Edit 는 통합 X — Status dropdown + "others" custom plan 같은 고유 기능 보존 위해 별도 design 필요.

### RestaurantsPage SubscriptionFormFields 통합 (2026-05-11)
- **목적**: v3.27 sprint 4 의 4 페이지 구독 form 통일을 RestaurantsPage Add/Edit 모달까지 확장. 4 caller 모두 동일 9-필드 UX 도달.
- **`SubscriptionFormFields` 컴포넌트에 옵션 2개 추가**: `hideCurrency`, `hideSectionHeader` (backward-compatible — 기존 3 caller 영향 없음, default false)
- **`RestaurantsPage.tsx` Add/Edit 모달 통합**: plan/billing/period/auto-renew/trial/payment_model/discount/summary 8 종 필드 → `<SubscriptionFormFields userType="restaurant">` 1 컴포넌트 (-321줄)
- **외부 유지**: Currency 필드, Activate Subscription 토글, Self-managed banner, "Subscription Settings" 헤더 (2026-05-10 backstage cleanup 산출물 보존)
- **어댑터 함수**: `toSubscriptionValues()`, `fromSubscriptionPatch()` — legacy camelCase ↔ snake_case `SubscriptionValues`. submit payload 형식은 그대로 유지 (백엔드 contract 변경 없음).
- **Backend POST 핸들러 보강** (`routes/restaurants-crud.js`): `discount_type/value/reason` 필드 처리 (기존엔 PUT 만 처리, POST 누락이었음) + `subscription_end` auto-calc fallback (frontend 미전송 시 start + cycle - 1 day)
- **부산물**: 미사용 import 제거 (`DateRangeField`, `formatPlanPrice`)
- **검증**: API 실호출 25/25 — POST activate=true (plan + 10% discount + auto-end) → DB readback / PUT active→self-managed (plan NULL wipe) / PUT self-managed→active (annual + fixed discount). Health-check 73/73 PASS. 빌드 main.3eca6803.js 93초 0 new warning.

### 레스토랑 예약 시스템 R1 MVP (2026-05-10)
- **목적**: 모바일 메뉴에서 고객 직접 예약 + 운영 페이지에서 직원이 승인/체크인하는 single-property 예약 워크플로우
- **상태 머신**: `pending → confirmed → arrived → seated → completed / cancelled / no_show` (7-state ENUM, 잘못된 전이 차단)
- **신규 모델 1개**: `Reservation` (FK: restaurant_id, customer_id, deposit_order_id) + 3 인덱스 (restaurant+date / restaurant+status+date / customer+date)
- **모델 확장 (3개)**:
  - `Restaurant.reservation_settings` JSON (enabled, auto_confirm, slot, cancellation_policy, no_show_policy, closed_dates)
  - `RestaurantCustomer` 6 컬럼 추가 (reservation_count, no_show_count, last_reservation_at, allergies, birthday, vip_notes)
  - `Order.order_type` ENUM 에 `reservation_deposit` + `reservation_id` FK (deposit = 선결제 Order — 별도 모델 X)
- **백엔드 라우트 12 endpoint**:
  - `routes/reservations-public.js` 6개 (GET availability + customer me CRUD + cancel) — Customer JWT
  - `routes/reservations-staff.js` 6개 (list, pending, staff-create, status transition, table assign, delete) — POS Admin JWT + checkRestaurantAccess
- **알림 인프라 재사용**:
  - `services/reservationNotificationService.js` (notifyCreated / notifyStatusChanged / notifyReminder / notifyNoShow) — 기존 pushService + emailService + emailLayout 활용
  - `routes/notification-settings.js` 4 카테고리 추가 (reservation_new / reservation_status_changed / reservation_reminder / reservation_no_show)
- **스케줄러 1개**: `services/reservationScheduler.js` (매시간 cron) — 24h/2h 리마인드 발송 + grace 지난 confirmed 예약 자동 no_show 전환 + SchedulerRun 모니터링
- **운영 페이지 1개**: `pages/Reservations/ReservationsTimelinePage.tsx` (Pending 큐 상단 + 오늘 timeline + staff 직접 생성 모달 + 상태 전이 버튼)
- **모바일 페이지 3개**: `mobile/pages/ReservationPage.tsx` (3-step stepper) / `ReservationsListPage.tsx` (내 예약) / `ReservationDetailPage.tsx` (상세 + share + cancel)
- **공유 컴포넌트**: `mobile/components/common/ReservationShare.tsx` — `ReceiptShare` 패턴 그대로 (WhatsApp wa.me + Telegram + navigator.share + .ics 캘린더 다운로드, 말레이시아 base — 한국 특정 통합 X)
- **Settings 12번째 탭**: `components/Settings/ReservationSettingsTab.tsx` — AutoSaveField 패턴 9 필드 (enabled / auto_confirm / min·max party / turn time / advance hours / cancel hours / grace minutes / block after N)
- **mobile/store API 확장**: `reservationsEnabled` 플래그 노출 → OrderTypePage 의 dine-in/takeaway/pickup/delivery 옆에 "Reserve a Table" 옵션 자동 표시
- **AccountPage 진입점**: "My Reservations" 메뉴 추가
- **store/settings 통합**: `reservation_settings` GET/PUT 통합 — Settings 탭 1회 저장으로 끝
- **사이드바**: Restaurant Admin/Staff 사이드바에 NavItem 추가 (Live Orders 아래)
- **i18n 4언어**: `public/locales/{en,ko,zh,ms}/reservation.json` (status, actions, mobile stepper, settings 키 ~50개씩)
- **검증**: API 12/12 (생성/조회/수정/취소, state machine, IDOR, 익명 차단) + store/settings PUT/GET readback 3/3 + health-check 73/73 + 빌드 88초 OK

---

## [v3.28] — 2026-05-10 배포

### PWA Push Notifications — 데스크탑/모바일 앱 설치 + Web Push (2026-05-10)
- **PWA 설치 가능** — 같은 React 빌드 한 벌로 데스크탑(Chrome/Edge/Safari dock) + 모바일(Android 홈 / iOS 16.4+ Safari "홈 화면에 추가") 모두 "앱처럼" 설치
- **Web Push API 백엔드** — `web-push` npm + VAPID 키 + `routes/push.js` 8 endpoints (vapid-public-key / subscribe / unsubscribe / preferences GET·PUT / test / admin/stats / admin/logs)
- **Service Worker** (`public/sw.js`) — push event + same-origin notificationclick + Badge API + pushsubscriptionchange
- **Socket.IO `/notifications` namespace** 신규 — JWT auth + scoped room (user / restaurant / brand / foodcourt / supplier)
- **NotificationToaster** 우상단 in-app 토스트 + Web Audio chime (G5+D6) + 200ms ping debounce
- **PwaInstallBanner** 우하단 — Android `Install` CTA + iOS 가이드 + localStorage 7일 dismiss
- **`/install` 페이지** — UA 분기 가이드 (Android/iOS/macOS/Windows/Desktop) + iOS 16 미만 푸시 경고
- **NotificationSettings 의 PushPreferencesCard** — 마스터 토글 + 카테고리(POS Operations 5개) + muted hours + 테스트 푸시
- **5 PlanQ 결함 처음부터 개선 적용**: rate-limit (`/test` 5/min/user) / endpoint host 화이트리스트 (FCM/Mozilla/APNs/Windows) / endpoint reassign soft-delete / PushLog 운영 로깅 / 권한 회수 자동 감지

### Self-managed Restaurant 모드 (2026-05-10)
- **Restaurant 추가 시 구독 강제 제거** — Add 모달의 `Activate Subscription` 토글 OFF 시 plan/billing/period 섹션 hide + DB plan_type/plan_amount/billing_cycle/subscription_start/end 모두 NULL 명시 저장 (Restaurant 모델 default 자동 할당 회피)
- **Edit 모달 wipeSubscription 분기** — 활성 → self-managed 전환 시 plan + pending_* + plan_change_* 모두 NULL wipe + divertToPending 우회
- **Self-managed 안내 banner** (회색 info box) + 목록 회색 배지 (plan_type IS NULL)
- **활성 전환** — Edit 토글 ON → plan 입력 → invoice 자동 생성 (`syncPendingInvoice` / `createInitialInvoice`)
- 의도: BG/FG/Owner 가 본인 산하 매장을 시스템에 등록할 때 POS 구독 강제 없이 데이터 관리 전용으로 등록 가능

### Supplier 자체 구독 흐름 보완 (2026-05-10)
- `routes/subscriptions.js` `getPlanTarget(role)` 매핑에 `'Supplier Admin': 'supplier'` 추가 — Supplier Admin 의 GET `/api/subscriptions/my-plan` 이전 403 → 200 정상 응답
- `models/Subscription.js` `payer_type` ENUM 에 `'supplier'` 추가 (모델 정의만, DB 레거시 그대로)

### Staff Manager username 표시 fix (2026-05-10)
- `StaffManagementPage.tsx` 의 `fetchStaff` 매핑에서 `username` 필드 누락 → Edit Staff Member 모달의 `Staff ID (Username)` 빈 값 + 카드의 `username • email` 라인 깨짐. `username: user.username || ''` 한 줄 추가로 복구

### 모바일 반응형 보강 (2026-05-10)
- 신규 공통 컴포넌트 `components/UI/FormGrid.tsx` — `<FormGrid2/3/4>` 반응형 grid (모바일 1col 자동 stack)
- Supplier 모달 폼 7 곳 inline `gridTemplateColumns: '1fr 1fr'` / `'1fr 1fr 1fr 1fr'` → FormGrid 교체 (ProductsTab / ProductOptionsTab / SystemInquiryPage)
- IncomingOrdersView 의 header summary 3-col → FormGrid3 (5 역할 영향)
- DataTable 자체 1024px 카드 변환 + FilterBar 600px column stack 확인 — 추가 fix 불필요

### 로그인 페이지 언어 셀렉터 위치 정합 (2026-05-10)
- LoginBox 모서리에 어중간하게 걸치던 LanguageBar 를 LoginBox 우상단 안쪽 absolute 로 정합화 (viewport 무관 동일 위치)

### 검증
- API 실호출 14/14 + 회귀 4/4 + Socket.IO 5 역할 7/7 + 주문 파이프라인 10/10 = **35 시나리오 통과**
- health-check 73/73 PASS
- i18n 4언어 35 신규 키 (errors=0)
- 빌드 hash main.18ff5bf3.js (1.45MB)

### 운영 배포 시 운영 .env 별도 키 생성 (필수)
- 운영 VAPID 키는 dev 와 분리 — `node -e "console.log(require('web-push').generateVAPIDKeys())"` 으로 운영 서버에서 별도 생성 후 `production-backend/.env` 에 추가

---

## [v3.27] — 2026-05-08 배포

### Subscription Form 통일 + Discount 전 역할 적용 (2026-05-08)
- **신규 공통 컴포넌트** `components/Subscription/SubscriptionFormFields.tsx` — 9 필드 (Currency / Plan / Trial / Activate now / BillingCycle / PaymentModel / Period / Auto-renew / Discount / Summary). Plan/Currency/BillingCycle 변경 시 amount 자동 재계산
- **BillingCycle default 빈 값** — 사용자가 선택해야 Summary 표시 (이전 'monthly' 자동 표시로 발생한 RM 29 등 phantom 값 제거)
- **Discount 모든 역할 적용** — `users` 테이블에 `discount_type` ENUM(none/percentage/fixed) + `discount_value` DECIMAL(8,2) + `discount_reason` TEXT 컬럼 추가. 이전엔 Restaurant 만 있었음
- **`SUBSCRIBING_ROLES` 확장** — Brand General / Foodcourt General / Restaurant Owner + **Supplier Admin** (4 → 5 역할)
- **`/pos/admin/subscriptions`** Add 폼 통합 — User Type 5 옵션 (Restaurant / Brand / Foodcourt / Owner / **Supplier**, 이전 4 옵션) + Currency 동적 + Discount 등록 시 노출 (이전엔 edit 모드만)
- **`/pos/admin/managers`** Add 폼 통합 — BG/FG/Owner 분기 시 동일 컴포넌트 사용. Discount + Activate now + Trial 옵션 추가
- **i18n 4언어 신규 namespace** — `subscription.json` (en/ko/ms/zh)
- **검증**: 0단계 hydration 0 warning / API 10/10 / 빌드 sprint origin TS 0건 / health-check 73/73 PASS
- **설계 문서**: `docs/SUBSCRIPTION_FORM_UNIFY_v3.27.md`

### 5 역할 Walkthrough 확장 (2026-05-08)
- **5 역할 dashboard 모두 step-by-step 투어 적용** — Restaurant Admin / Brand General / Restaurant Owner / System Admin / Supplier Admin (이미 적용된 Foodcourt General 포함 6 역할)
- **MainLayout 사이드바 17개 NavItem 에 `data-tour` attribute 부착** — 각 역할 핵심 메뉴 spotlight 가능
- **각 dashboard step 정의**: RA/BG/Admin/Supplier 5 step / Owner 2 step (사이드바 단순함 반영)
- **i18n 4언어 walkthrough.json 확장** — 27 step entries × 4 언어
- **검증**: 22 data-tour selector 모두 번들 포함 / 5 역할 tutorial-progress write→read 왕복 5/5 / health-check 73/73 PASS

### FG 온보딩 + Walkthrough 시스템 신규 (2026-05-08)
- **신규 인프라**:
  - `User.tutorial_progress` JSON 컬럼 — per-tour `{ completed, skipped, version, last_seen }`
  - `GET/PUT /api/users/me/tutorial-progress` — 단일 tour_key patch + merge + 자기 자신 전용
  - `useTourProgress` hook — optimistic PUT + `walkthrough:start` CustomEvent 디스패처
  - `<Walkthrough>` overlay/spotlight/tooltip 자체 구현 (외부 의존성 0, 4-rect mask)
  - `<TourTrigger>` 헤더 "Show me around" 버튼 — 언제든 재시청
- **FG 온보딩 정합화**:
  - `useSetupStatus` FG 라우트 정정 (`/general/branches`→`/branches`, `/general/floor-plan`→`/floor-plan`)
  - `SetupGuide` locked 항목 클릭 차단 + 3초 inline flash "Complete X first"
  - 5 페이지 EmptyState 통일 (Branches / FloorPlan / TenancyMap / RentManagement) + steps 가이드 + CTA
- **i18n 4언어 walkthrough.json 신규**
- **설계 문서**: `docs/FG_ONBOARDING_v3.26.md`

### 데모 데이터 4-step 시드 (2026-05-08)
- **FC44 (demo_foodcourt_general)** — units 0→**12** (다양한 stage) / tenants 0→**2** (R38, R39 link) / contracts 6 (active 2 / contracting 2 / proposal 1 / setup 1) / company info ✓
- **Owner 매장 4곳 (R2/R3/R6/R7)** — cats 3 + prods 8 + orders 25 (30일 분포) + company info ✓ → demo-owner / test-owner 양쪽 다중 매장 비교 가능
- **B10 / B1 (BG demo)** — brandProducts 0→8 (B10) / 0→7 (B1) + brand_product_brands join + brand company info ✓
- **R38 시계열 주문** — 30일 분포 30건 신규 + company info ✓
- **idempotent 시드 마커** (`SEED-V326-FC44`, `SEED-V326-OWNER-DEMO`, `SEED-V326-BG`) — 재실행 안전, 비-시드 데이터 격리

### Pricing/Module Audience 정합화 (2026-05-06)
- **PricingPage 모듈 정렬 깨짐 + buyer_* 카테고리 잘못 + Owner 잘못 노출 + Supplier 누락 + Features 빈 캡처 슬롯 일괄 정합**
- DB sort_order + category 정합화 — sort_order=0 모듈 0건. buyer_* 4=advanced. 96 모듈 (target distribution: restaurant 24 / brand 23 / foodcourt 22 / owner 10 / all 4 / supplier 13)
- PricingPage filter 분기 — owner 의 buyer_* 차단, supplier 'all' 매치 자동 노출
- FeaturesPage Supplier 탭 buyer_* 4 카드 등록 (Procurement wording 차별화) + supplier 4 신규 캡처
- 모델 ENUM 확장 — AddonModule.target_user_type +supplier / PlanTemplate.plan_target +supplier / Invoice.issuer_type +supplier / Invoice.status +credit
- 시드 (idempotent) — `seed-buyer-data-v3.25.js` + `seed-foodcourt-rich-v3.25.js`
- **설계 문서**: `docs/PRICING_MODULE_AUDIENCE_v3.25.md`

### Signup UX 개선 (2026-05-06)
- **SignupPage / ReferralSignupPage** missing fields UI + 비밀번호 4-요건 체크리스트 (length/upper/lower/digit) + 강도 미터 (Weak/Fair/Strong) + 비밀번호 일치 표시
- **`INVALID_EMAIL_DOMAIN` 에러 핸들러** — `routes/auth.js` signup/referral-signup
- **signup transaction double-rollback guard** — "Transaction cannot be rolled back" 노이즈 차단
- **i18n 4언어 landing.json `signupPage.*` 17 신규 키**

### JSON 컬럼 이중 stringify 정합성 복구 (2026-05-05)
- **데모 레스토랑 13의 결제 settings 카드 미표시 증상에서 시작 → 광범위 점검**
- 운영 DB scan: 99건 깨진 row → 백업 후 트랜잭션 1개로 0건. dev DB 88건 → 0건
- Restaurant / Brand / Foodcourt / SupplierCompany 모델의 9 setter 에 `typeof value === 'string'` 가드 — 재래거시 입력 안전
- seed-demo-data.js cleanup — 9곳 `JSON.stringify(...)` 래퍼 제거 + restaurant 1 payment_settings 정식 7-method 스키마

### 2026-05-05
- Features 페이지 (`/features`) 캡처 정합성 정리 — 깨진/빈 카드 16개 삭제, 11개 신규 캡처, 23개 정직하게 "Coming soon" 표시
- Work manuals 14개 시드 (brand/restaurant/foodcourt 각 영역)
- demo_owner ↔ restaurant 1/2/3 ownership 연결 + 5개 OperationTicket 시드 → Owner inquiry 페이지 실제 데이터 노출
- MySuppliersPage `supplier_name` 표시 버그 fix (API `supplierCompany.name` 중첩 → 평면 fallback)

### BG/FG → Restaurant Trade Billing 시스템 (2026-05-04)
- **결제조건 컬럼 신설**: `Restaurant.brand_billing_terms` / `foodcourt_billing_terms` JSON (terms / invoice_cycle / payment_due_day / credit_limit / currency / notes). NULL = immediate (default)
- **BG/FG 결제조건 설정 UI**: `Restaurants` 메뉴의 매장 카드에 Billing 항목 + Edit 버튼 추가 → `BillingTermsModal` 공용 모달 (Supplier Customers 모달 패턴)
- **BG/FG Trade Invoices 메뉴 신설**: `Plans & Payments` 섹션에 추가. Supplier `Trade Invoices` 페이지 패턴 100% 복제 (SOA invoice purple badge 통합 list)
- **PO → Trade Invoice 자동 발행 시 결제조건 적용**: `purchaseOrderService.resolvePaymentTerms()` 에 brand/foodcourt 분기 추가. 발행되는 trade invoice의 due_date가 결제조건 기반으로 산출
- **SOA scheduler 3 평행 처리**: 매월 1일 cron이 supplier / brand / foodcourt 모두 처리. SOA invoice (`invoice_category='soa'`) 발행 + child trade invoice의 `parent_soa_invoice_id` cascade 세팅
- **RA Trade Invoices 통합 SOA bundle**: `/api/purchase-invoices/soa/current` 가 `issuer_type ['supplier','brand','foodcourt']` 모두 반환. supplier 그룹은 `SupplierContract.payment_terms`, brand/foodcourt 그룹은 `Restaurant.{brand,foodcourt}_billing_terms` 기반으로 monthly_soa 필터
- **Credit limit 강제 차단**: PO 생성 시점에 `checkCreditLimit()` 호출. 미수금 누적 + 신규 PO 합계가 한도 초과 시 400 차단 + `code:'CREDIT_LIMIT_EXCEEDED'` + hint `"Pay outstanding trade invoices first..."`. 한도 미설정(NULL/0) 통과. SOA child invoice 중복 카운트 방지 (`parent_soa_invoice_id` skip)
- **공통 검증 헬퍼 추출**: `utils/paymentTerms.js` 신규 (validatePaymentTerms / buildPaymentTerms / VALID_INVOICE_CYCLES). `routes/supplier.js` + `routes/entity-billing.js` 가 동일 검증 공유
- **백엔드 신규 라우트**: `routes/entity-billing.js` (BG/FG billing-terms PUT/GET) + `routes/brand-soa.js` + `routes/foodcourt-soa.js` (SOA bundle + reminder + trade-invoices list)
- **i18n 4 언어 신규 namespace**: `billing.json` (en/ko/zh/ms 각 27 키) + `brand.tradeInvoices.*` 21 키 추가 + `nav.tradeInvoices` 4 언어
- **검증**: 통합 25/25 PASS, credit_limit 단위 9/9 PASS, health-check 73/73 PASS, 빌드 성공
- **설계 문서**: `docs/BG_FG_TRADE_BILLING.md`

### 데모 5 역할 정합화 + 헤더 PlanBadge + Pricing/Features 누락 32 보강 (2026-05-03)
- **데모 5 계정**: Foodcourt General + Multi-Restaurant Owner 신규 user 생성 (foodcourt entity + supplier company 포함). Login/Demo 카드 5개 + 순서 (RA / BG / FG / Multi-Owner / Supplier)
- **Multi-Restaurant Owner 표시**: `utils/roleDisplay.ts` 헬퍼 (ENUM 그대로, 표시만 변경)
- **App.tsx Supplier default redirect**: `/pos/supplier/dashboard` case 추가 (이전 누락)
- **헤더 PlanBadge**: `components/Layout/PlanBadge.tsx` — useAllowedRoutes planType 기반 보라 그라데이션 pill (대시보드 우측 상단)
- **5 역할 enterprise fallback**: Owner `Owner Enterprise` (13 modules) / Supplier `Supplier Advanced` (13 modules) 정정. RA/Brand/Foodcourt 는 이미 enterprise fallback
- **Pricing 19 누락 모듈 매핑 추가**: supplier 13 + fc 2 + buyer 4
- **Features 13 누락 entry 추가**: fc 2 + supplier 7 + buyer 4 (B2B Procurement 카테고리 신규)
- **운영 DB demo user 5종 정합**: foodcourt + owner + supplier 신규 생성 (Demo Hawker Center foodcourt id=1, Demo Supplier Co. supplier_company id=1)

### LoginPage / DemoPage 보안 정리 — 번들에서 평문 비밀번호/이메일 완전 제거
- **POST `/api/auth/demo-login`** (신규) — 화이트리스트 key 기반 (`demo_brand_general`, `test_restaurant_admin` 등 8 entries). 서버 가드: 매핑된 user 의 `is_demo` OR `is_test === true` 만 토큰 발급. rate limit 30/min
- `services/authService.js` — `loginAsDemo(key)` + `DEMO_KEY_TO_EMAIL` 화이트리스트
- `AuthContext.tsx` — `loginAsDemo(key)` context 함수
- `LoginPage.tsx` / `DemoPage.tsx` — `DEMO_ACCOUNTS` / `TEST_ACCOUNTS` 배열에서 `email`/`password` 필드 완전 제거. `key` 필드만 전송
- **UI 노출 제거** — Demo/Test 카드에서 Email/Pass 텍스트 표시 제거 (역할 + 설명만)
- **번들 검증** — Demo@2024 / Test1234 / 8 emails 모두 main.js 에서 0 file (검색 불가)
- **DB 정정** — demo-supplier / admin@kdine / staff@kdine 3 계정 is_test=true 마킹 (가드 통과 위해)

## [v3.24] — 2026-05-03 배포

**결제 시스템 표준화 (Stripe/PayPal Subscriptions + Hosted Checkout + Customer Portal) + External QR ↔ Coupon 자동 매핑 (협력업체 할인) + PayPal 가이드 보완 + 리퍼럴 로고 v2**

### External QR ↔ Coupon 자동 매핑 (협력업체 할인)
External QR (Settings → Operations) 에 발행된 쿠폰을 연결하면 QR 스캔 진입 시 자동 적용. 협력업체 (호텔/사무실 등) 직원이 매번 코드 입력 없이 자동 할인.

#### 데이터
- `restaurant.table_settings.externalQRs`: `string[]` → `Array<{name, coupon_id?}>`
- legacy string 자동 normalize (백워드 호환). DB 마이그레이션 X

#### 백엔드 (`routes/external-qrs.js`)
- `GET /api/restaurants/:id/external-qr-coupon?name=X` — 익명 (모바일 진입), 매핑된 active 쿠폰 + 유효성 반환
- `GET /api/restaurants/:id/coupons-linked-qrs` — 인증, byCouponId 맵 (Coupons list "Linked to" 뱃지)
- `inventory-core` router-level `authenticateToken` fall-through 회피 위해 `restaurantsRouter` 보다 먼저 mount
- 자체 `ensureRestaurantAccess` (System Admin / token restaurant_id / DB admin_id 매핑) — RA token 의 restaurant_id null 케이스 fallback

#### 프론트엔드
- **Settings → External QR** 섹션
  - Add 폼 단순화 (이름 + Add). 쿠폰 link 는 list 항목 inline select 로
  - List 카드: ✕ 삭제 우측 상단 absolute / inline 쿠폰 select AutoSaveField wrap (저장 표시)
  - 항목별 연결 쿠폰 정보 보라색 뱃지 (`PARTNER10 10% off`)
- **Promotions → Coupons list**
  - Code 셀에 "Linked to: Hotel ABC, ..." 보라색 뱃지
  - 삭제 confirm 시 linked QR 영향 안내
- **Mobile PaymentPage**
  - `selectedTable + currentStore.id` → `external-qr-coupon` API 자동 fetch
  - linked → `partnerCoupon` state set, `couponCode` 자동 입력
  - subtotal/orderType 변경 시 `validateCouponAPI` 재호출로 discount 갱신
  - Coupon Code 섹션 보라색 partner 배너 + 수동 input disabled (partner 우선)

#### 문서
- `docs/EXTERNAL_QR_PARTNER_DISCOUNT.md` — 도메인/API/UI/검증 시나리오

### 리퍼럴 로고 v2 + Cookie banner /referral 제외
- `public/images/purple-referral-logo.svg` → `purple-referral-logo-v2.svg` (Cloudflare CDN 7일 캐시 우회)
- `ReferralLayout.tsx` + `ReferralAuthLayout.tsx` import path → -v2.svg
- `components/Common/CookieConsentBanner.tsx` isPosRoute 분기에 `/referral` 추가

### Stripe/PayPal 결제 표준화 — Subscriptions API + Hosted Checkout + Customer Portal
**Phase 1-3 (직접 cron + off_session) 폐기**. Stripe Subscriptions / PayPal Subscriptions / Hosted Checkout 표준으로 재설계.

- **카드 정보 PurpleHere DB 저장 X** — Stripe Customer / PayPal Vault 에 위임, 토큰만 매핑
- **자동 결제는 게이트웨이 위임** — Card Updater (만료 카드 자동 갱신) / Smart Retries / Dunning email / 3DS / SCA 모두 Stripe·PayPal 무료 제공
- **사용자 셀프서비스** — Stripe Customer Portal redirect / PayPal 은 paypal.com 셀프서비스
- **4 issuer 정합화** — System / Brand / Foodcourt / Supplier 자격증명만 보유. autoCharge 토글 4 페이지에서 제거 (구독 가입 자체가 곧 auto-charge)
- **3 결제자 SubscriptionPanel mount** — Restaurant / Brand / Foodcourt InvoicesPage 상단에 자기 구독 카드 + Manage / Cancel

#### 백엔드
- 신규 모델: `PaymentCustomer`, `Subscription` (`payment_subscriptions`), `WebhookEvent`. Invoice 에 `gateway_session_id` + `subscription_id` 추가. Phase 1-3 잔재 컬럼 4종 (`stripe_customer_id` 외) Restaurant/Brand/Foodcourt 에서 제거
- `services/stripeCheckoutService.js` — Customer / Subscription / Checkout (subscription · payment) / Portal / Cancel — 4 issuer 지원
- `services/paypalCheckoutService.js` — Plan / Subscription / Order / Cancel (직접 fetch v1/billing + v2/checkout)
- `routes/payments.js` — `POST /checkout/start`, `POST /portal/start`, `GET /subscriptions`, `POST /subscriptions/:id/cancel`, `GET /issuer-gateways`
- `routes/webhooks-payments.js` — Stripe 5종 + PayPal 6종 + signature 검증 + WebhookEvent dedupe (event_id UNIQUE). 기존 server.js inline 제거
- `utils/stripeService` + `utils/paypalService` — `system` alias + `supplier` issuer 추가
- `scripts/migrate-payment-v324.js` — idempotent

#### 프론트엔드
- `components/Payment/HostedCheckoutLauncher.tsx` — hosted Checkout redirect. 기존 StripePaymentForm 분기 대체
- `components/Payment/SubscriptionPanel.tsx` — 구독 카드 + 상태 badge 6종 + Customer Portal + Cancel
- 4 PaymentSettings (Admin/Brand/Foodcourt/Supplier) — autoCharge 토글 제거 + 자격증명 통합
- 3 InvoicesPage (Restaurant/Brand/Foodcourt) — SubscriptionPanel mount

#### 문서
- `docs/PAYMENT_ARCHITECTURE.md` — 결제 도메인/API/모델/Webhook/UI 명세

## [v3.23] — 2026-05-03 배포

**비대 라우트 분리 + Sentry cleanup + B9 dashboard 사전 집계 + B10 Jest 27 tests + Overdue cron + UI/UX 친절도 보강 (Stripe/PayPal/SMTP 가이드 + Empty states + Mobile hints) + 백엔드 에러 응답 표준화 (fieldErrors + hint)**

### 비대 라우트 분리 (CLAUDE.md 500줄 가이드 시정 완료)
- `inventory-routes.js` 1820줄 → inventory-core (1108) + inventory-extra (732). barrel 마운트
- `purchase-orders.js` 1624줄 → purchase-orders-crud (889) + purchase-orders-workflow (971). barrel 마운트
- 모든 sub-router 1500줄 미만 달성

### Sentry 코드 정리 (사용자 미사용 결정 후속)
- server.js Sentry init + setupExpressErrorHandler 제거
- middleware/auth + customerAuth Sentry.setUser + import 제거
- frontend index.tsx Sentry.init + Sentry.ErrorBoundary → React 표준 inline class
- frontend AuthContext Sentry.setUser 4곳 + import 제거
- 효과: frontend 번들 1726KB → 1447KB (−280KB)

### Dashboard 통계 사전 집계 인프라 (B9)
- DB 모델 `RestaurantDailyStats` (restaurant_id × date UNIQUE, revenue/order_count/AOV/currency/timezone)
- `services/dailyStatsScheduler.js` 매일 00:30 SGT cron + SchedulerRun 기록 + upsert 멱등
- `scripts/backfill-daily-stats.js` (1회 실행: 25 식당 × 30일 = 750 row)
- 신규 endpoint `GET /api/dashboard/restaurant/:rid/daily-stats?from&to` (어제까지 사전집계 + 오늘 실시간 fallback + 누락 zero row)
- 기존 sales-chart endpoint도 사전 집계 lookup + today live 로 통합 (B9 v2 — week=daily / month=weekly / year=monthly bucket)
- `docs/DASHBOARD_AGGREGATION.md` 설계 문서

### Jest 도입 + 27 contract tests + CI workflow template (B10)
- jest ^30.3.0 + supertest ^7.2.2 (devDependency)
- `tests/_helpers.js` — uniqueIP + http + login (X-Forwarded-For 로 authLimiter 우회, trust proxy=1 활용)
- tests/auth.test.js (8) — login valid/invalid + anonymous + garbage token
- tests/idor.test.js (5) — RA cross-tenant + RP scope
- tests/payment-flow.test.js (6) — payment endpoint surface + invoice schema invariants
- tests/suspended-ux.test.js (3) — login response + /auth/me restaurantStatus 필드 surface
- tests/referral-commission.test.js (4) — UNIQUE(invoice_id, referrer_id) 제약 + wallet 잔액≥0 + (user, currency) UNIQUE
- npm test → "jest --forceExit"
- `dev-backend/ci-workflow.yml.template` — MySQL 8.0 service container + 3 jobs (backend-tests / i18n-verify / state-hydration)
- 검증: 27/27 PASS

### 비-subscription 인보이스 overdue 자동 전환 cron
- `services/invoiceOverdueScheduler.js` 신규 — service/hardware/po/soa 등 (subscription 외) due_date 지난 invoice 자동 status='overdue' + invoiceOverdueEmail
- SOA child (parent_soa_invoice_id) 제외 — finalizeInvoice cascade 가 처리
- 매일 02:30 UTC, SchedulerRun 기록
- subscription overdue 는 기존 subscriptionScheduler.processOverduePayments 가 그대로 처리

### 결제 게이트웨이 + 알림 연동 안내 보강 (UI/UX 친절도)
- `components/Payment/PaymentGatewayGuide.tsx` 신규 — Stripe/PayPal/Bank 단계별 가이드 (가입 → API key → webhook 등록 → test 카드/Sandbox)
- 4 PaymentSettings 페이지 (Admin/Brand/Foodcourt/Supplier) 에 Stripe/PayPal 섹션 위 가이드 마운트
- `components/Common/SmtpGuide.tsx` 신규 — Gmail/Outlook/Other (SES/SendGrid/Mailgun) 3-tab 단계별 가이드 (App Password 생성 + SMTP AUTH + STARTTLS 등)
- NotificationSettings Email tab 에 마운트

### Empty states + 빈 상태 가이드
- `components/Common/EmptyState.tsx` 표준 컴포넌트 (아이콘 + 제목 + 설명 + 1/2차 CTA + 단계 list)
- Customers 빈상태 — "QR 메뉴 자동 등록 / 수동 추가" 안내 + CTA
- NewPurchaseOrder 빈 카탈로그 — "Suppliers → 계약 → 발주" 3-step 가이드 + Browse suppliers CTA
- Ingredients 빈상태 — "Stock items 추가 → Recipe 연결 → min/par level → 자동 알림" 3-step + 도메인 설명

### Mobile / Settings 친절도
- Mobile MenuPage — 첫 사용자 dismissable 3-step banner (Browse → Cart → Checkout) + localStorage 기억
- Mobile PaymentPage — 결제방법별 hint (card 즉시 / paypal 리디렉션 / bank 몇 시간 / qr 앱 / counter 매장 cash)
- Admin SiteSettings — 페이지 상단 "어디 표시되나" 영향 범위 박스 (site name → 랜딩/탭/이메일 / brand logo → 헤더/이메일/PDF / default currency → 신규 식당만)
- Brand/Foodcourt PaymentSettings — Stripe 토글 비활성화 시 "고객 화면에서 옵션 사라짐" 작은 안내
- Restaurant Invoices Submit Payment 모달 — "How payment works" 보라 박스 (카드/PayPal 즉시 vs 은행 이체 + transaction reference + admin 확인 ~몇 시간)
- InvoiceSettings Late Fee — 입력 시 실시간 example ("RM 1,000 overdue → adds RM 20.00")

### 백엔드 에러 응답 표준화 (fieldErrors + hint)
- `middleware/errorHandler.js` 강화 — Sequelize ValidationError → fieldErrors 자동 / UniqueConstraintError → 409 DUPLICATE / FK / JWT errors 모두 명확한 code + hint
- `requireFields(res, fields)` 신규 헬퍼 — 인라인 검증 단축
- `middleware/validation.js` handleValidationErrors → fieldErrors map 변환 (하위호환 details 유지)
- `utils/parseApiError.ts` 프론트엔드 헬퍼 — modern + legacy 응답 통합 파싱
- 표준 형식:
  ```json
  { "success": false, "error": { "message": "...", "code": "VALIDATION_ERROR", "fieldErrors": {"name": "Required"}, "hint": "Both Name and Code are required." }}
  ```
- 44 라우트 파일 일괄 sweep (Python regex) — legacy `error: 'string'` → `error: { message, code }`. status → code 자동 매핑 (400→VALIDATION_ERROR / 401→UNAUTHORIZED / 403→FORBIDDEN / 404→NOT_FOUND / 409→DUPLICATE / 500→INTERNAL_ERROR 등)
- middleware/auth + recipeAuth 도 동일 sweep
- Sample 라우트 (POST /api/invoices/categories) 에 fieldErrors + hint 수동 보강 (패턴 예시)
- 회귀 0 — parseApiError 가 modern + legacy 모두 호환

### 운영 점검 보고서 갱신
- `docs/OPERATIONAL_READINESS_AUDIT.md` PM2 logrotate + Sentry 미사용 후속 + uploads 백업 + financial audit log 처리 이력
- `docs/DASHBOARD_AGGREGATION.md` (신규) — B9 설계
- `docs/V3_18_BASIC_TIER_GAPS.md` 갱신 — UNGUARDED 이미 fix 표기 (historical)
- `docs/BILLING_SYSTEM_INTEGRATION_PLAN.md` 갱신 — Overdue Cron 완료 표기

## [v3.22] — 2026-05-03 배포

**리퍼럴 UX 보강 + `/api/restaurants` 익명 노출 fix + 인보이스 사유 표시 + 운영 준비 점검 P0+P1 + 비대 라우트 분리**

### 리퍼럴 UX 보강
- `/referral/dashboard` 헤더 아래 "How it works" 보라 카드 (15% recurring / 20% off first month / Forever) — 3컬럼 desktop, 1컬럼 mobile
- `/signup` Referral Code 필드 옆 항상 보이는 hint *"Have a referral code? Get 20% off your first month."* (코드 입력 전에도 노출 → 신규 가입자 유도)
- ReferralLogin/Signup Input/Submit `box-sizing: border-box` 추가 (Input padding 28px 가 카드 밖으로 튀어나오던 레이아웃 깨짐 fix)
- 리퍼럴 페이지 모바일 반응형 (StatCard DashboardStats, ReferralLayout, ReferralAuthLayout) + 신규 `purple-referral-logo.svg`
- i18n 4언어 (en/ko/zh/ms): referrals.json + landing.json 32 신규 키

### 보안 fix
- `/api/restaurants` GET 익명 노출 차단 — `optionalAuth` → `authenticateToken` (admin email/businessReg/taxId/subscription 미인증 GET 차단)
- `Manager/SalesPage`, `Manager/SystemInquiryPage`, `Recipes/RecipesPage` 인증 헤더 누락 fetch fix
- health-check 익명 `/restaurants` → 401 영구 케이스 (security 21 → 22)

### 인보이스 사유 표시
- Restaurant/Owner/Admin 인보이스 페이지 우측 패널 + print HTML 에 `discount_reason` 라인 노출
- 효과: 자동 세팅된 'Referral: 20% off first month (PURPLE-XXXX)' 가 사용자에게 보임 (이전엔 'Discount (20%)' 만)

### 운영 준비 점검 (P0+P1 라운드)
- **uploads 백업** (C1): `backup-database.sh` dev/prod 양쪽 패치 — tar.gz + cross-backup, dev 14일/prod 7일 retention. 디스크 사고 시 32MB 이미지 영구 손실 위험 차단
- **financial path audit log** (C2): `utils/activityLogger.js` logActivity restaurant_id 가드 완화 + logSystemActivity 신규. referralService.processCommission/applyCredit, subscriptionScheduler.restoreSubscription, routes/referrals.js POST /payouts + PUT /admin/payouts/:id 모두 audit
- **결제/인보이스 console.log 정리** (C5+D1): invoices-payment 10건 + invoices-main 26건 제거 (User email + payment_method + transaction_id 평문 노출 차단). console.error 보존
- **PM2 log rotation** (A): pm2-logrotate dev/prod 양쪽 도입. dev 14일/prod 30일 retain, 10MB max, gzip, 매일 자정. Sentry 미사용 결정 후속
- **per-route rate limit** (D): auth signup 10/h, forgot 5/15min, admin-analytics/admin-reports 30/min
- **utils/logger.js thin wrapper** (E): info/warn/error/debug + 환경별 필터, 향후 winston/pino swap 가능
- **운영 sysops cron 이전**: root crontab → irene crontab, `/var/backups/orderhere/` chown irene

### 비대 라우트 분리 (CLAUDE.md 500줄 가이드 시정)
- `invoices-main.js` 2622줄 → invoices-list (1203) + invoices-crud (926) + invoices-generation (513). `invoiceInBranch` shared helper 를 invoices-helpers.js 로 이동
- `brands.js` 2596줄 → brands-core (1247) + brands-plans (1368). `brands.js` 는 barrel
- `foodcourts.js` 2333줄 → foodcourts-core (1243) + foodcourts-plans (1109). `foodcourts.js` 는 barrel
- 모든 sub-router barrel mount, server.js mount path 변경 없음

### 운영 준비 점검 보고서 (신규)
- `docs/OPERATIONAL_READINESS_AUDIT.md` — 실서비스 SaaS 기준 점검 (Baseline + 부족 + 위험 C1~C5 + 트래픽 트리거 + 실행 계획)

### 검증
- health-check 73/73 PASS (security 22, auth, pos, mobile, payment, referral)
- /api/restaurants 익명 401, RA 인증 200
- IDOR cross-tenant 라이브 401/403

## [v3.21] — 2026-05-01 배포

**Refer & Earn (리퍼럴 시스템) Phase 1+2+3 + IDOR 7 endpoint fix + Suspended account UX 재설계 + DB 인덱스 정리**

### 리퍼럴 시스템 (신규)
- **Phase 1 — Refer & Earn 핵심**: DB 모델 6 (`ReferralWallet`, `ReferralCommission`, `ReferralWalletTransaction`, `ReferralPayout`, `ReferralClick`, `ReferralSettings`) + User에 `referral_code/referred_by/bank_*/pos_account` 6 컬럼. `referralService` (code 발급 — 4자 retry, wallet upsert FOR UPDATE, processCommission 멱등 + SOA child guard, applyCredit, requestPayout/rejectPayout). 공개 2 + 본인 11 endpoint. `auth.js` referral-signup endpoint + signup의 5 role에 referral_code 처리 + 자기추천 차단. `invoiceLifecycle.js` `handleInvoicePaid` 공통 hook (paid 4경로 통합 + commission 적립). 첫 달 20% 할인 자동 적용 (음수 InvoiceItem + finalizeInvoice). 프론트 7개: ReferralLayout/AuthLayout + Login/Signup/Dashboard/Wallet/Profile + AutoSaveField (스위치 위 오버레이). SignupPage `?ref=PURPLE-XXXX` 자동입력 + 500ms validate-code debounce + 상단 그라데이션 배너 + Step 2 Referral Code 필드. `/referral` 라우트 + PosRootRedirect RP 분기 + ProtectedRoute switch + AuthContext UserRole/ROLE_PERMISSIONS/ROLE_ROUTES에 RP+Supplier Staff 추가. **38/38 PASS**.
- **Phase 2 — 관리 + 크레딧**: `POST /api/referrals/wallet/apply-credit` (invoice ownership 체크 + 전액 시 handleInvoicePaid 자동 호출). admin endpoints — overview / partners(검색) / partners/:id (referred users + wallets + commissions + payouts 5섹션) / payouts(filter) / payouts/:id PUT(approve|mark_paid|reject) / settings GET-PUT. `ApplyCreditModal` 공통 컴포넌트 — 통화 매칭, 잔액 자동 픽업, 실시간 preview, KRW/JPY/VND zero-decimal. Restaurant `InvoicesPage` "Apply Referral Credit" 버튼 통합. `ReferralManagementPage` SA 4 탭 (Overview/Partners/Payouts/Settings) — 검색/필터/액션 모달/AutoSave 토글. **23/23 PASS**.
- **Phase 3 — 마케팅 + 알림**: 이메일 알림 7종 (`referralPartnerWelcomeEmail`, `referredSignupEmail`, `commissionCreditedEmail`, `payoutRequestedAdminEmail`, `payoutApprovedEmail`, `payoutPaidEmail`, `payoutRejectedEmail`) + `NOTIFICATION_CATEGORIES`에 `referral_commission`/`referral_payout` 추가. `ReferralLandingPage` `/referral-program` 공개 — Hero(그라데이션) + 4-step + 4 Why Join + Earnings Calculator. `LandingHeader` GNB + Mobile menu Referral 메뉴. `MainLayout` 모든 역할 SidebarFooter ↗ Refer & Earn 그라데이션 링크 (60s polling 잔액 표시).
- **5 치명결함 fix (v3.21 안정화)**:
  1. `cancelCommissionsForInvoice` helper + `handleInvoiceCancelled` lifecycle hook + invoice PATCH `paid → other` / DELETE 시 자동 호출 (멱등 + transaction 내부)
  2. Admin Overview 차트 + 전환 퍼널 (시계열 monthly_signups/commissions + recharts LineChart 2 + 그라데이션 progress bar 3-step funnel)
  3. 사이드바 잔액 표시 — MainLayout 60s polling, 통화 표시 (RM/$/₩/S$/¥/₫). 잔액 0이면 "Start earning!"
  4. 추천인 계정 삭제 가드 — `routes/users.js` DELETE에 wallet.balance > 0 OR pending payout 체크. SELECT FOR UPDATE 잠금. **409 + `REFERRAL_BALANCE_NOT_SETTLED` code**
  5. Per-route rate limit — validate-code 30/min/IP, track-click 10/min/IP
- **i18n 4언어 분리**: `referrals.json` 288 키 × en/ko/zh/ms. 한국어 "수수료" → "커미션" 26 키 + 조사 보정 10건 (받침 통일).

### Suspended account UX 재설계
- **로그인 차단 제거**: `authService.js`에서 `subscription_status='suspended'` / `restaurant.status='suspended'` 분기 완전 제거 (이전엔 "contact your administrator" 데드엔드).
- **로그인 응답 + `/me`에 status 필드 포함**: `restaurantStatus`, `restaurantName`, `restaurantIsDemo`, `restaurantIsTest`, `is_demo`, `is_test`, `subscription_status`. login 직후 별도 fetch 없이도 frontend가 즉시 인식.
- **ProtectedRoute pinning**: suspended 감지 시 역할별 invoice 페이지로 강제 redirect (RA/Staff `/restaurant/{rid}/invoices`, BG `/pos/brand/invoices`, FG `/pos/foodcourt/invoices`, Owner `/pos/owner/invoices`). System Admin / demo / test 예외.
- **`SuspendedBanner` 공통 컴포넌트** + 4 invoice 페이지 마운트 (주황색 그라데이션, "Account on hold — overdue invoice. Pay any overdue invoice below to restore full access. The account reactivates automatically once payment is confirmed.").
- **`AuthContext.refreshUser()` hook 노출** + 4 invoice 페이지 `fetchInvoicesToPay()` 끝에 호출 → 결제 후 즉시 배너/redirect 풀림 (새로고침 불필요).
- 결제 후 자동 복구: 백엔드 `handleInvoicePaid` → `restoreSubscription` (기존 hook 활용).

### IDOR 보안 fix (cross-tenant 7 endpoint)
v3.21 검증 중 발견한 사전 부채. `authenticateToken`만 있고 `checkRestaurantAccess` 누락 — 다른 RA가 타 매장 데이터 조회 가능.
- `orders-views.js:19/172/416` — orders list / counts / next-order-number
- `activityLogs.js:12/124` — activity logs / stats
- `invoices-main.js` — `settings/:rid GET+PUT`, `update-payer/:rid`, `generate-missing/:rid` (4곳)
- `membership.js` — `settings/:rid PUT`, `tier/update/:rid/:cid` (2곳)
- 모두 `checkRestaurantAccess` 추가. RA cross-tenant 11 endpoint 모두 → 403 라이브 검증.

### Invoice 카운트 정합성 fix (legacy ENUM)
- `dashboard.js:457`, `restaurants-subscription.js:209`에서 `inv.status === 'sent'` 사용 — Invoice ENUM에 `'sent'` 없음 (legacy schema 흔적). `pending_payment` 인보이스 모두 누락되고 `overdue` 만 카운트되는 결함. 9개 vs 1개 불일치 fix.
- `BrandManagerDashboard.tsx:442`, `FoodcourtGeneralDashboard.tsx:687` — frontend 카운터도 동일 패턴. fix.
- 정상 ENUM (`pending_payment` / `payment_submitted` / `overdue`)으로 통일.

### SignupPage 가입 흐름 정돈
- 로그인된 상태에서 `/signup` 진입 시 가입 폼 대신 안내 카드 ("You're already signed in" + Go to my dashboard / Sign out and create new account 두 액션). 기존엔 가입 완료 시 새 토큰이 기존 세션을 silent override하던 결함.
- `?ref=PURPLE-XXXX` 진입 시 referral 입력 필드 숨김 — 상단 보라 배너만 표시 ("You've been referred! Get 20% off your first month of Purple POS. Referred by X.").

### SA Partners detail Modal
- `/pos/admin/referrals` Partners 탭에서 행 클릭 → Detail Modal (5 섹션):
  - Partner 기본 정보 (이름/코드/email/phone/role/가입일/은행)
  - **Referred users** 테이블 (이름/role/가입일/구독상태) — 누가 누구를 추천했는지
  - Wallets (통화별 잔액/누적 적립/누적 출금)
  - Recent commissions 최대 20건
  - Recent payouts 최대 20건
- i18n 4언어 17 신규 키.

### Wallet UX 단순화
- `/referral/wallet` 필터 5개 → 3개 (`All` / `Commissions` / `Payouts`) — RP에 무의미한 `Credit used` / `Adjustments` 제거.
- Stats 3개 → 2개 (`Total earned` / `Total withdrawn`) — Credit used 제거.
- POS 사용 안내문구 (`applyHint`) 제거 (RP는 POS 안 씀).
- i18n 4언어 4 키 제거 (288 → 284 통일).

### 운영 Staff fix (Restaurant Admin staff 관리)
- `routes/users.js` GET/POST/PUT/DELETE/reset-password 5개 endpoint 권한 확장 — Restaurant Admin이 자기 매장 staff 관리 가능. tenant isolation (cross-tenant 차단), role escalation 차단 (RA는 'Staff'만 만들 수 있음). `middleware/auth.js` `requireRole` 에러 메시지 개선 (required_roles + current_role + code 추가). `StaffPage.tsx` fetchStaff silent catch 제거 → 빨간 에러 박스 표시.

### DB 마이그레이션 (자동 실행)
- **`scripts/cleanup-users-duplicate-indexes.js`** — `email_N`/`username_N` 60개 중복 unique 인덱스 정리.
- **`scripts/cleanup-restaurants-duplicate-indexes.js`** — `slug_N` 59개.
- **`scripts/cleanup-sequelize-duplicate-indexes.js`** — 통합 sweep 17개 테이블 769 중복 정리 (canonical UNIQUE만 keep). MySQL 64-key 한계 도달 → 신규 ALTER TABLE 차단되던 상태 해소.
- `scripts/migrate-referral.js` — referral 6 테이블 + User 6 컬럼.

### health-check 안전망 강화
- security 카테고리 16 → 21 (cross-tenant IDOR 5건 영구 추가). `defineSecurityTests`에 `restId` 인자 추가하여 다른 RA가 타 매장 access 시 403 검증.
- 6번째 카테고리 'referral' 추가 — 24개 테스트 (public 3 + 401 차단 9 + auth 200 4 + cross-token 격리 1 + admin endpoint 5 + RA 403 RBAC 2).
- **총 67/67 → 72/72 PASS**.

### 검증
- 리퍼럴 비즈니스 로직 E2E: commission 적립 (8/8) + 멱등성 + cancel 환원 (5/5) + Skip 규칙 (4/4) + applyCredit + currency mismatch (4/4) + Payout 라이프사이클 (5/5) + CRIT-3 delete guard (5/5) + CRIT-4 rate limit + Self-referral 방어 = 49 PASS / 0 FAIL.
- IDOR 라이브 16 endpoint sample: cross-tenant 11/11 protected, own-tenant 6/6 OK.
- Invoice 카운트 정합성: DB=9, /to-pay=9, /dashboard.billing.unpaidInvoices=9 (이전 1).
- 주문 라이프사이클 5/5 (POST → PATCH preparing/ready/completed → 최종 status 검증).

### Sysops — 양방향 DB cross-backup 정돈
- POS는 dev → 운영 cross-backup 단방향만 적용되어 운영 손실 시 dev에 복구 소스 부재 (PlanQ는 양방향 적용 완료). 디렉토리/스크립트 일관 정리.
- POS 운영 `backup-database.sh` cross-backup 디렉토리 `production` → `production-pos` (PlanQ가 사용 중인 `dev-planq/` `prod-planq/`와 충돌 회피).
- POS dev `backup-database.sh` cleanup 라인도 `production-pos`로 통일.
- dev 측 빈 디렉토리 정리 (`production/` legacy 1건 → `production-pos/`로 이동 후 production 디렉토리 제거).
- 1회 수동 실행 검증: 5/1 운영 백업 (1.9 MB)이 dev `production-pos/`로 도착 확인.
- 후속 권고 (별도 작업): 운영 cron이 root user로 실행되는데 root SSH key가 dev 미등록 상태라 cron 자동 scp는 4-23 이후 실패 중. 운영 cron을 `irene` user로 이전하거나 root 공개키 dev 등록 필요.

## [v3.20] — 2026-04-30 배포

**Supply Chain Sprint 7 + Supplier Staff + SOA Invoice 재설계 + 운영 쿠폰 버그 fix**

### 2026-04-30 (이번 배포 — 30년차 시니어 감사 → Phase A + B 일괄)

**🔥 운영 사고 fix (즉시 운영 정정 포함)**
- **POS 100% 쿠폰 할인 → total_amount=0 보존 fix**: `routes/orders-crud.js:414, 487` falsy 체크(`!total_amount`)가 0을 "값 없음"으로 오인 → items 합계로 덮어쓰던 버그. `== null` 로 변경. **운영 DB 8건 정정** (Restaurant 8 IPC 쿠폰: 6건 cancelled + 2건 completed). 회귀 테스트 PASS (subtotal=7, coupon=7, total=0 보존).
- **Restaurant ingredient POST `image_url` 무시 fix**: `routes/restaurants-ingredients.js:185` POST 핸들러가 `image_url, ingredient_category_id, supplier_id, base_quantity, track_stock` 5개 필드 drop. 누락 필드 추가. RA/SA × POST/PUT × image set/null 4/4 PASS.

**📦 Supply Chain Sprint 7 — Operational Hardening (운영 사고 위험 4영역 + 12빈틈)**
- inventory_transactions / batches polymorphic (entity_type/entity_id + Sequelize hook + 백필 86 rows)
- Returns 양방향 환원 (Brand/Foodcourt seller도 stock 환원) + Currency invariant 검증
- 수령 차이 분류 (line별 splits: 정상/short/damaged/wrong_item/pending) + auto-returns 자동 생성
- PO.status ENUM 확장 (in_transit / delivery_failed)
- Carrier webhook 인프라 (HMAC SHA-256 + 2단계 처리 + idempotency + payload_hash UNIQUE)
- Admin Carrier 모달에 webhook 섹션 (regenerate-secret 한 번 노출 + status_map editor)
- 신규 페이지: `/pos/admin/carrier-webhooks` (System Admin 전용)
- path-level middleware fix: brand-inventory.js carrier-webhooks public endpoint 401 사고 해결.

**🛡️ Supplier 시니어 감사 → Phase A (운영 위험 5건)**
- **A1 신규 PO 알림**: `purchase-orders.js submit` + bulk autoSubmit → Supplier에게 이메일+socket 알림. `getSupplierAdminIds` 헬퍼 신규 (`utils/notificationService.js`). 24시간 SLA 가능하게.
- **A2 Buyer mark-shipped 외부 supplier 한정**: `purchase-orders.js:1100`. 시스템 supplier 차단 (403) — supplier stock 차감 우회 사고 방지.
- **A3 seller-orders 트랜잭션·락**: confirm/ship/reject/deliver 4 endpoint sequelize.transaction() 래핑 + supplier stock 차감을 같은 트랜잭션 내. ship 실패 시 롤백 → 데이터 불일치 차단.
- **A5 PO 상태전이 row-level lock**: submit/cancel/confirm/ship/reject/deliver 모두 `LOCK.UPDATE`. confirm + cancel 동시 클릭 race condition 방지. 라이브 검증 PASS.

**📑 Phase B — UX 통일 + 신규 기능**
- **B1 SOA 재설계 — Invoice record로 발행 (Irene 명세 반영)**:
  - `invoices.parent_soa_invoice_id` 컬럼 신규
  - `soaScheduler` 가 월말 SOA Invoice (`invoice_category='soa'`) 발행 + child trade invoices 묶음
  - 결제 cascade: SOA paid → child들 자동 paid (3 endpoint: submit-payment / record-payment / confirm-payment)
  - Frontend: SOA invoice 인라인 표시 (보라 SOA 배지) + Pay 버튼 조건부 (parent_soa 있으면 'Pay via SOA' 표시)
  - 모든 역할 동일 패턴 (Restaurant Admin, Supplier 등)
  - 설계 문서: `docs/INVOICE_SYSTEM.md` 11절 추가
- **B2 Supplier Staff (Advanced 모듈 `supplier_admin_staff`)**:
  - `users.supplier_company_id` 컬럼 + `Supplier Staff` 역할 ENUM 확장
  - `supplierScope` 미들웨어가 Supplier Staff 인식 (supplier_company_id 기반)
  - `routes/supplier.js` staff CRUD 4 endpoint + module 게이팅 + PIN 중복 방지
  - 신규 페이지 `SupplierStaffPage` + 사이드바 module 게이팅 (Basic plan 미노출, Advanced unlock 시 노출)
  - `authService` + `/auth/me` 에 `supplier_company_id` 포함
  - 신규 endpoint `/api/supplier-companies/:id/allowed-routes` (Supplier 본인+Staff+SA 권한)
- **B3 SupplierDashboard 리팩토링**: 인라인 styled 제거 → `Container/Header/Title/Content` 공통 컴포넌트 (UI_DESIGN_GUIDE 2.1 준수). StatusBadge 자체 색매핑 → `CommonStatusBadge` variant 매핑. Skeleton 4 → 8 cards.
- **B4 Empty state + CTA 통일**: `SupplierContractsPage` 탭별 hint, `SupplierCustomersPage` "View Pending Contracts" CTA.

**📱 모바일 + UX 통일**
- 모달 padding 모바일 통일: `UI/Modal.tsx` (76 페이지 사용) + 4 인라인 모달에 `@media (max-width: 640px)` — 가로 gutter 8px / inner padding 16px / overlay 12px.
- Restaurant 관리자 구매자 흐름 정돈: `alert()` / `window.confirm()` 12건 → `AlertDialog`/`ConfirmDialog`. 13개 항목 (PO history 6 / PO Detail 2 / PO Staging 2 / Cart 1 / Invoices 2). `🔍` SVG 대체. `📦` 텍스트 대체. AddressFields 적용. i18n 4언어 stockItems. Restaurant InvoicesPage 모바일 반응형 (768/480px).

**🔒 보안 + 데이터 무결성 (검증 중 발견)**
- `checkPaymentPermission` Restaurant Admin payer_type 새 모델 인식 fix (`invoices-helpers.js:379`) — 기존 invoice.restaurant_id 만 체크 → SOA/trade invoice의 payer_type='restaurant'/payer_id 도 인식.
- `/api/supplier-companies/:id/allowed-routes` SA-only 라우터 위로 이동 + owner/staff/SA 권한 분기.
- `users.role` ENUM 'Supplier Staff' 추가 (마이그레이션).
- `users.last_login_at` 미존재 컬럼 SELECT 제거 (supplier staff 500 에러 fix).
- 자동 테스트 패턴 이메일 가드: `s4*-{ts}@purplehere.com` / `test-*@`, `verify-*@`, `flow-*@`, `final-*@`, `dup_*@`, `smoke-*@`, `qa-*@` / `*@test.local` 패턴 → admin 알림 + verification email 차단. dev block 외 한 겹 더.

**🗂️ 기존 미배포 분 (이번 배포에 포함)**

### 2026-04-29 (PO/Supplier/Invoice 통합 UX)
- Cart 페이지 viewport 고정 + 검색 확장 (이름/카테고리/공급업체/단위/상세 OR-검색) + 타이틀 "Purchase Order"
- PO history: LiveOrders 동일 필터, SearchableSelect 공급업체, 우측 패널 (DetailPage embedded)
- PO Detail: Edit 제거, "+ Order More", embedded mode
- 통화 정책: 구매자 통화 기준 강제, 공급업체 통화 불일치 차단
- 사이드바 Order 섹션 + Suppliers 1메뉴 통합 + Stock Items 명칭 변경
- 데이터 무결성 fix: `tracking_info.events.note` 인자 순서 버그 (React crash 해결)

### 2026-04-28 (Sprint 7 + 타임존 일괄)
- 타임존 일괄 적용: Frontend 2 + Backend 11 파일
- 모바일 헤더 fix (480~768px StaffInfo overflow)
- 로그인 LanguageSelector globe variant
- Restaurants 페이지 계약 뱃지/만료일

**🗄️ DB 마이그레이션 (자동 실행)**
- `scripts/sprint7-migration.js` (Sprint 7 ENUM 확장 + 신규 컬럼)
- `scripts/migrate-supplier-staff.js` (users.supplier_company_id + role ENUM 확장)
- `scripts/migrate-soa-invoice.js` (invoices.parent_soa_invoice_id)

**📊 검증 (실 데이터 라운드트립)**
- POS 쿠폰 100% 할인 + 부분 할인 — total/coupon/subtotal DB 보존 검증
- PO 라이프사이클 — submit → confirm/cancel race lock → mark-shipped 차단 (6/6)
- Supplier Staff CRUD — POST/GET/PUT/DELETE + PIN 중복 거부 (7/7)
- SOA cascade — submit-payment/confirm-payment 양쪽 child 자동 (8/8)
- Restaurant Ingredient image — 5개 필드 round-trip (6/6)
- health-check 43/43 / state hydration 0 warning

**📂 신규 파일 (대표)**
- Backend: `models/CarrierWebhookEvent.js`, `routes/carrier-webhooks.js`, `routes/upload.js` 보강
- Frontend: `pages/Admin/CarrierWebhookEventsPage.tsx`, `pages/Supplier/SupplierStaffPage.tsx`
- Migrations: `scripts/sprint7-migration.js`, `scripts/migrate-supplier-staff.js`, `scripts/migrate-soa-invoice.js`
- Docs: `docs/SUPPLY_CHAIN_SPRINT_7.md`, `docs/INVOICE_SYSTEM.md` 11절

## [v3.19] — 2026-04-28 배포

**Supply Chain System 운영 도입 — Sprint 1~6 + 보안 일괄**

### 2026-04-28 (보안 IDOR 일괄 + UX 정리 + dev 이메일 차단 + 검증 10단계)
**🔒 보안: 운영 배포 직전 IDOR 3건 차단 + 운영 사고 4건 방지**
- **menu.js IDOR**: 8개 endpoint에 `checkRestaurantAccess` 적용. `/product/:id`는 `:id`가 product id이므로 `checkProductTenant` 별도 미들웨어로 분리. middleware/auth.js의 `checkRestaurantAccess`가 query/body restaurantId까지 해결하도록 확장.
- **brand-inventory.js IDOR**: 4개 `:brandId` endpoint에 `requireBrandScope` 적용.
- **PO 비-Restaurant audit**: Brand/Foodcourt buyer 수령 시 `ActivityLog` 기록 (entity_type='po_receipt') — 감사 추적 회복.
- **Socket.IO seller room 격리**: system_admin seller emit skip (`seller_${type}_${id}` fallback 폐기).
- **글로벌 seller socket**: MainLayout에 BG/FG/Supplier 페이지 무관 socket listener — Dashboard 등 다른 페이지에 있어도 새 PO 즉시 반응.
- **BG multi-brand 지원**: BrandProductRecipePage가 `/api/brands` fetch + selector 드롭다운 + brand_id 쿼리 필터.

**🚨 운영 사고 방지**
- **dev 이메일 SMTP 차단**: emailService 3종(Platform/Entity/Issuer) 모두 dev에서 SMTP skip. Test signup이 운영 admin 메일함 폭격하던 사고 차단.
- **nginx HTML no-cache**: index.html `cache-control: no-cache, no-store, must-revalidate` — 브라우저 stale main.js → chunk 404 → TDZ 표시 문제 해결.
- **IncomingOrdersView TDZ**: `dateRange` useState를 `fetchList` useCallback 위로 이동.
- **FoodcourtTenancyMap i18n ref**: PinsLayer 컴포넌트에 `useTranslation` 추가.
- **OrderTypePage 빈 상태**: 모든 모바일 주문 유형 비활성 시 안내 카드 + 관리자 Settings 경고.

**🟡 i18n + UX 정리**
- PO Detail i18n 키 4언어 (`detail.actions.{returns,print}` + `detail.returns.*` + `print.*`).
- BrandProductsTab i18n 28키 × 4언어 적용.
- IncomingOrdersView 이모지 제거 (📭/📦/📍 → 텍스트, Restaurant LiveOrdersPage 패턴 통일).

**기타**
- `deploy-to-production.sh` 콘텐츠 sync 기본 ON + sync-contents-to-prod.js 위임.
- `/글쓰기` 스킬에 4.5단계 팩트 검증 (.gov.my 1차 출처 우선) 추가.
- 블로그 발행: e-Invoice RM10K Malaysian Restaurants 2026 (3언어).
- 검증 10단계 모두 PASS (health-check 43/43 + IDOR 14/14 + SPA 17/17).

### 2026-04-27 (Sprint 5+6 — Smart Reorder, Live Sales Order, Delivery Tracking, Lifecycle Completion)
**📦 발주/주문 라이프사이클 완성 — 운영 배포 가능 상태**
- **PO Phase 2**: Restaurant 발주 ↔ 계약 검증 통합 (Supplier=SupplierContract / BG=brand_id / FG=foodcourt_id) + RestaurantIngredientCost 가중평균 자동 갱신 + Mapping 강제. 신규 `/api/buyer-sellers` 통합 picker.
- **Sprint 5 — Smart Reorder + Live Sales Order**: Carrier 카탈로그 (Lalamove/Grab/JNT/Ninja Van/Pos Laju 시드) + 신규 `/api/purchase-orders/bulk` (다중 seller 그룹 일괄) + Socket.IO `/orders` namespace `seller-order-created/updated` 실시간 + tracking_info JSON 표준화 (events 자동 push) + ship 시 carrier_code → tracking_url 자동 생성 + 5단계 DeliveryTimeline 공유 컴포넌트.
- **Sprint 5 Detail**: BulkOrderModal (multi-select cart) + StockListSection 추천 컬럼 (preferred seller + suggested_qty) + CarrierAdminPage (System Admin CRUD) + IncomingOrders Detail Drawer (DeliveryTimeline + Returns 액션).
- **Sprint 6 — Lifecycle Completion**: PO status enum +`'delivered'` (shipped→delivered→received) + Buyer cancel 'submitted' 허용 + Buyer edit 'submitted' 허용 + PUT `/seller-orders/:id/tracking` 사후 수정 + Supplier stock 자동 차감 (ship 시) + SupplierInventoryTransaction `po_shipped` 자동 기록 + **Returns / Credit Notes** 신규 (PurchaseOrderReturn 모델 + Approve→Credit Note Invoice 자동 발행 + 양쪽 stock reversal) + **PO Print 페이지** (window.print A4 layout, 라이브러리 X).
- **Sprint 6 마무리 — Live Orders Restaurant 패턴 100% 일치**: 사이드바 Live Orders 메뉴를 Dashboard 직후로 이동 (BG/FG/Supplier) + NavIcon `hasPending` pulse 만 (NavCount/NavDot 폐기) + AudioToggleButton + speaker SVG + DataTable 레이아웃 (카드 그리드 폐기) + DatePeriodFilter (today/yesterday/week/month/year/all/custom) + StatusTabs/TabBadge + StatisticsBar (작은 inline). 새 PO 행 highlight (배경 + NEW 배지). Backend `/api/seller-orders` date filter (`from`/`to`).
- **Backend `livePoCount` badge**: `/api/badge-counts` 응답에 supplier/brand/foodcourt/SA role 별 submitted PO 카운트.
- **신규 모델 2 + 신규 라우트 4**: Carrier, PurchaseOrderReturn / carriers, buyer-sellers, po-returns, + bulk endpoint.
- **DB 마이그레이션 2**: sprint5-migration (carriers 테이블 + 5 시드), sprint6-migration (PO status +'delivered', Invoice status +'credit', purchase_order_returns 테이블).
- **i18n 4언어**: nav.liveOrders / inventory.bulkOrder / common.delivery.steps / admin.carriers / status.delivered.
- **버그 fix**: po_number race condition (cleanup 후 duplicate) → MAX-based 생성, trackingInfo undefined (rename 누락), TDZ runtime crash (cross-chunk styled import → 인라인 복제), invoice.status='credit' enum 누락.
- 데이터 cleanup: test garbage 9 PO + 4 returns + 2 orphan Credit Note 삭제. 데모 lifecycle 데이터 보존 (draft 1 / submitted 12 / confirmed 4 / shipped 7 / received 16 / Returns 2 / Credit Note 1).
- **테스트 가이드** `docs/SPRINT_5_6_TEST_GUIDE.md` (8 시나리오 운영 테스트). 다음 세션에서 Irene 직접 운영 → `/배포` 결정.
- 검증: Sprint 5 38/38 / Sprint 6 29/29 / Phase 2 21/21 / Live Orders 마무리 9/9 / health-check 43/43 / Stage 0 hydration 0 warning.

### 2026-04-27 (Supplier Portal Polish — UX 통일성 + 데이터 + Inventory Transaction)
**Supplier 포털 사용성 — Brand/Foodcourt 와 동일 패턴으로 통일**
- Sidebar 재구성: "Settings" NavTitle 두 번 렌더 fix. Operations / Plans & Payments / Communication 3 섹션. Profile disabled 제거.
- Dashboard 재작성 (313 → 540줄): 4 stat → **8 KPI** (pending/confirmed/shipped orders + monthly_revenue + outstanding + active_customers + low_stock + received_this_month) + **6개월 매출 추이 LineChart** + **Alerts panel** (clickable deep-link) + **Recent Orders/Trade Invoices 2-col 테이블** + Subscription card. Backend `/api/supplier/dashboard` 응답 18 필드.
- **Inventory Transaction 신규** (Sprint 1 의 Sprint 3 TODO 마무리): SupplierInventoryTransaction 모델 + 테이블, adjust/receive 자동 기록, `/transactions` endpoint. Frontend Tab 구조 (Stock List / Transaction History) + 8 transaction 시드.
- Demo data 종합: demo-supplier@purplehere.com (is_demo=true → supplier_advanced 모듈 자동). 6 Products / 1 Active Contract / 4 PurchaseOrders (다양 상태) / 1 Trade Invoice / 2 Subscription Invoices / 2 Notices / 2 SupportTickets.
- Notices 라우트 추가 (`/pos/supplier/notices`, BrandNoticesPage 재사용) + System Inquiry/Subscription Invoices 시드.
- Pricing Supplier 탭 추가 + 가격 시드 (Basic MYR 99 / Advanced MYR 299).
- LoginPage Demo 카드에 Supplier Admin 추가.
- 회원가입 에러 메시지 정확 노출 (MX 검증 메시지 그대로 사용자에게).
- **Path-level middleware fix** (6개 라우터): supplier-directory / purchase-orders / purchase-invoices / ingredient-seller-products / foodcourt-products / foodcourt-inventory — `/api` 광범위 prefix 시 router-level use가 다른 역할 요청까지 차단하던 silent 버그 fix.
- addon-modules `?active_only=true` public 처리.
- i18n 4언어 36+ 신규 키.
- 회귀 health-check 43/43, Buyer/Brand 측 endpoint 영향 없음.

### 2026-04-26 (Supply Chain System 4-Design 시리즈 완료)
**🎉 Supply Chain System — Supplier 사업체 도입 + Buyer-Seller 거래 흐름 완성**
- Sprint 1: Seller Product & Inventory — Supplier 사업체 신규 도입 (Brand/Foodcourt 패턴 미러). 12 모델 + 66 endpoints + 16 페이지. Supplier signup A+B (SA invitation + Landing 일반 가입). Foodcourt 자체 상품/재고 추가.
- Sprint 2: Supplier Contract — 구매자(Restaurant/Brand/Foodcourt) ↔ 공급업체 계약 시스템. 디렉터리 검색 + 계약 신청/승인/거절/종료. 활성 계약 1건 원칙. 13 endpoints + 5 페이지.
- Sprint 3: Purchase Order & Receiving — 발주관리 본체. Ingredient ↔ Seller Product 다중 연결. PO 작성 + 입고 (재고 자동 update + lock). PAR Level 자동 추천. 14 endpoints + 3 페이지 (3-step wizard).
- Sprint 4: Seller Order Mgmt + Trade Invoice + Monthly SOA — Seller-side PO 처리 (confirm/ship/reject). PO Received 시 Trade Invoice 자동 발행. Monthly SOA cron (매월 1일). 9 endpoints + 6 페이지 (BG/FG incoming-orders + Buyer purchase-invoices).
- 신규 16 DB 모델, 102 endpoints, 30 UI 페이지, 5 i18n namespace (4 언어)
- 신규 미들웨어 4종 (requireSupplierScope / requireBuyerRole / requireSellerRole / requirePlanLimit / requireSupplierModule)
- 신규 service 2종 (purchaseOrderService.createTradeInvoice / soaScheduler)
- 보안: IDOR 12건 + Anon 16건 + Cross-role 8건 + Validation 8건 = **44 시나리오 PASS**
- API E2E **86/86 PASS** (Sprint 30+18+18+20)
- health-check 43/43, hydration 0, i18n 0 errors (5292 키)
- 빌드 `main.6f22a419.js`
- 설계 문서: SUPPLY_CHAIN_SYSTEM_OVERVIEW.md + 4 Design 문서 (각 850~1400줄)

### 2026-04-26 (DEVELOPMENT_PLAN.md 예정 작업 일괄 완료)
**보안 fix — POST /api/restaurants 역할 제한**
- Brand Manager / Foodcourt Manager 제거. `requireRole('System Admin', 'Brand General', 'Foodcourt General', 'Restaurant Owner')`만 허용
- DEVELOPMENT_PLAN.md "선행 보안 이슈 (HIGH)" 해소
- health-check 회귀 케이스 3개 추가 (BM/FM/Staff POST → 403 검증) — 40 → **43/43 PASS**

**Trial 만료 자동 알림 이메일** (DEVELOPMENT_PLAN.md 예정 #3)
- 신규 4 컬럼 `last_trial_reminder_day INT NULL` (restaurants/brands/foodcourts/users) — 마지막 발송 임계점 (3/0/-1) 저장, 멱등성 보장
- `subscriptionScheduler.processTrialReminders` — D-3, D-0, D+1 세 임계점에 발송 (Restaurant + Brand + Foodcourt + Restaurant Owner 4 entity 통합)
- 이메일 템플릿 `trialExpiringSoonEmail` — 임계점별 톤 변화 (heads-up amber → urgent orange → grace red), CTA 버튼, 발신자 브랜딩
- 신규 알림 카테고리 `trial_expiry_reminder` (Subscription 섹션, 사용자 opt-out 가능)
- `EMAIL_NOTIFICATION_MATRIX.md` 갱신
- 검증: 6 시나리오 (D-3, idempotent, D-0, D+1, D-2 no-op, D-3→D-0 transition) 핵심 로직 100% PASS

**Daily scheduler 모니터링 대시보드** (DEVELOPMENT_PLAN.md 예정 #4)
- 신규 모델 + 테이블 `scheduler_runs` (job_name, started_at, finished_at, duration_ms, status, results JSON, error_message)
- subscriptionScheduler.processAllSubscriptions + invoiceScheduler daily cron에 SchedulerRun 기록 통합 (start='running' → end='success/partial/error' + results)
- 신규 endpoint `GET /api/admin/scheduler-runs?job_name=&status=&limit=&since=` + `GET /api/admin/scheduler-runs/jobs` (per-job summary + 24h error count)
- 신규 페이지 `pages/Admin/SchedulerMonitorPage.tsx` — Job summary cards (status pill, errors_24h badge, latest run time/duration/results) + Recent runs table (job/status filter)
- App.tsx 라우트 + MainLayout Admin 사이드바 메뉴
- 검증: list 200 + jobs 200 + summary count + auth 401

**구독 변경 히스토리 페이지** (DEVELOPMENT_PLAN.md 예정 #2)
- 신규 컴포넌트 `<InvoiceHistoryModal>` — 타임라인 UI (각 modification 카드: 수정자, 시각, reason quote, field별 from→to diff)
- 빈 상태 / from line-through / to bold green / arrow / monospace field name pill
- Admin/Brand/Foodcourt InvoicesPage 통합 — 기존 "Modified" 뱃지를 클릭 가능 button으로 변환 + tooltip
- (Restaurant Admin은 자기 invoice 수정 권한 없어서 skip)

**인보이스 수동/자동 UI 구분** (DEVELOPMENT_PLAN.md 예정 #6)
- 확인 결과: 4개 InvoicesPage 모두 이미 `<AutoBadge>` (#10B981) 구현됨. DEVELOPMENT_PLAN.md 항목 stale → 추가 작업 불필요로 마감

**검증**:
- 빌드 `main.3fc1c132.js` exit 0
- State hydration 0 warning
- health-check 43/43 PASS (신규 보안 케이스 3건 포함)
- scheduler-runs API: list 200 + jobs summary 200 + auth 401
- Trial reminder 6 시나리오 핵심 로직 통과

### 2026-04-25 (밤)
**알림 센터 (Inbox) v1**
- 신규 통합 endpoint `routes/inbox.js`:
  - `GET /api/inbox?type=...&unread_only=...&limit=...&before=...` — Notice + SupportTicket + OperationTicket UNION 시간순 정렬
  - `GET /api/inbox/unread-count` — 헤더 배지용 (notice + by-type 카운트)
  - `POST /api/inbox/notice/:id/read`, `POST /api/inbox/mark-all-read?type=notice`
  - 읽음 추적: Notice는 `notice_recipients.read_at`, Ticket은 status 휴리스틱 (open/in_progress/pending = unread)
  - 권한별 가시성: NoticeRecipient (user_id 또는 본인 restaurant) + Ticket (customerId/managerId/requesterId)
- 신규 컴포넌트 (`components/Inbox/`):
  - `inboxApi.ts` — fetch 래퍼 + relativeTime + TYPE_COLORS/SEVERITY_COLORS 디자인 토큰
  - `InboxItemCard` — type별 아이콘 색상 (notice indigo / support amber / ops teal), unread 좌측 색 stripe + bold + bg, severity dot, relative time + absolute tooltip
  - `InboxBell` — 헤더 종 + 미읽음 빨간 배지 (99+ 캡), 30s polling, 새 알림 도착 시 subtle shake + badge pop, focus ring
  - `InboxDrawer` — 우측 슬라이드 패널 420px (모바일 fullscreen), filter pills + unreadOnly 토글, skeleton loading, 빈 상태 (📬 + "You're all caught up!"), Mark all read, ESC + focus 관리, body scroll lock
- 신규 페이지 `pages/Inbox/InboxPage.tsx` — 전체 보기. tab + status segment + search input + result count + 같은 InboxItemCard 재사용
- App.tsx 라우트 2개: `/pos/inbox`, `/restaurant/:id/inbox` (모든 로그인 사용자)
- MainLayout 헤더에 InboxBell 마운트 (LanguageSelector 옆)
- i18n 30+ 키 신규 (`inbox.*`) — en/ko/zh/ms 4언어
- 접근성: `role="dialog" aria-modal="true"`, bell `aria-live="polite"`, severity dot `title=`, keyboard nav (Enter/Space)
- 검증: API 12/12 PASS, 빌드 `main.1ec04872.js` exit 0, hydration 0 warning, health-check 40/40

### 2026-04-25 (저녁)
**Onboarding wizard 강화 (옵션 A)**
- `<WelcomeModal>` 신설 — 첫 로그인 시 1회 표시되는 환영 modal. setup checklist 미리보기 + "Start Setup" CTA. localStorage `welcome_modal_seen_${userId}` 키로 1회 제어. 진행 중인 사용자(아무 항목 미완료)만 노출, completed > 0 이면 자동 skip
- `useSetupStatus` 확장:
  - **Restaurant Owner** 신규 분기 — first_restaurant / assign_admin / activate_plan (3 items)
  - **System Admin** 신규 분기 — admin_company / admin_smtp / admin_plan_templates / admin_payment (4 items)
  - **Brand General** 확장 — linked_restaurants 추가 (5 items, 전 4)
  - **Foodcourt General** 확장 — first_branch + fc_floor_plan 추가 (4 items, 전 2)
  - 기존 Restaurant Admin 11 items 그대로 유지
- `SetupItem.dependsOn` 메타 추가 — 의존 미완료 항목은 회색 + lock icon (🔒) + tooltip ("Complete first: ..."), 클릭은 가능하나 시각적 deemphasize (절대 차단 X — feedback_action_button_placement 가이드 따름)
- Admin/Owner Dashboard에 SetupGuide + WelcomeModal 통합 (이전엔 Brand/Foodcourt/Restaurant 3곳만)
- Restaurant/Brand/Foodcourt Dashboard에 WelcomeModal 추가
- i18n 신규 키 `welcomeModal.*` 5개 (greeting/subtitle/moreSteps/skip/start) — en/ko/zh/ms 4언어
- 빌드 `main.162bf2a4.js`, state hydration 0 warning, health-check 40/40 PASS


## [v3.18] — 2026-04-25 배포

**Invoice 정합성 — Single Source of Truth**
- Invoice 헤더 자동 재계산 — 11개 생성/수정 path에 `finalizeInvoice` 적용. `subtotal/discount/total`은 항상 items + additional_charges + discount 로부터 도출
- Invoice tax 저장 표준화 (Path B) — `items.tax_amount` 폐기, 모든 tax는 `header.additional_charges`에만. dev 79건 마이그
- Invoice 이메일 템플릿 보강 — `additional_charges` + `discount` 행 표시, phantom "Tax 0.00" 라인 제거 (산술 모순 해소)
- Invoice GET 응답 `tax` 필드 보강 — frontend 모달 Tax 0 표시 버그 fix (4 endpoint)
- Invoice 수정 시 이메일 재발송 옵션 — `PUT /api/invoices/:id` 에 `resend_email: true` 추가

**주소 시스템 통일 — Phase 1 + Phase 2 (Display & AutoSave)**
- 신규 컴포넌트 `<AutoSaveAddressFields>` — `<AddressFields>` + 600 ms debounce + 코너 저장 배지
- 신규 유틸 3개 — `formatAddressHtml` (HTML `<br>`), `formatAddressLines` (JSX 배열), `formatEntityAddress` (camelCase 변환 + 레거시 fallback)
- 입력 폼 6 곳 마이그 — Admin/Brand/Foodcourt/Manager Settings + Restaurant Settings + Owner/Restaurants Modal × 2 (모두 `address_line_2` 추가, country ISO 정규화). CompanyInformationPage MY-only state dropdown 제거
- 백엔드 4 라우트 보강 — brands/foodcourts/restaurants-crud company-info + store 에 `address_line_2` allowedFields + ISO 정규화
- 표시 사이트 33+ 파일 통일 — 청구서 HTML/PDF (9), 지점/관리/리스트 (24+), 모두 `formatAddress*` 유틸로 마이그
- 설계 문서 `docs/ADDRESS_STANDARDIZATION.md` 12장 추가

**주소 보완 — datalist 자동완성 + 정규화 + 검증**
- 신규 endpoint `GET /api/address/suggestions?field=city|state&country=XX` — 8개 주소 테이블 UNION DISTINCT (utf8mb4 collation 통일), 5분 서버 캐시
- 유틸 `normalizePlaceName` (Latin Title Case, CJK trim만), `validatePostalCode` (17국 정규식)
- `<AddressFields>` city/state HTML5 `<datalist>` 통합 + blur 정규화 + postal 형식 amber 경고 (입력 차단 X)
- i18n 신규 키 `address.postalCodeInvalid` (en/ko/zh/ms 4언어)
- 외부 API 의존성 0 (Google Places 미사용 — 자체 데이터로 점진적 통일)

**Subscription Plan 게이팅 정합성 fix**
- `ProtectedRoute.MODULE_GATED_ROUTES` prefix 정합성 — `/pos/brand/subscriptions` → `/pos/brand/general/subscriptions`, `/pos/foodcourt/subscriptions` → `/pos/foodcourt/general/subscriptions`
- Backend 가드 추가 — `GET /api/brands/:id/subscription` + `GET /api/foodcourts/:id/subscription` 에 `requireBrandModule('brand_subscriptions')` / `requireFoodcourtModule('fc_subscriptions')` 미들웨어 (`docs/V3_18_BASIC_TIER_GAPS.md` audit)

**Invoice 수동 발행 prefill (financial_terms 연동)**
- `routes/contracts.js` GET 라우트에 `restaurant_id` 필터 추가
- Brand/Foodcourt InvoicesPage `selectTarget`: restaurant 선택 시 active contract fetch → financial_terms로 amount/description 자동 채움 (Brand: `system_monthly_fee`, Foodcourt: `base_rent + maintenance_fee`). Best-effort

**Email Integrity Audit (F3)**
- 17개 site / 23개 발송 지점 전수 점검 → `docs/EMAIL_INTEGRITY_AUDIT.md`
- 결과: 모든 site fresh fetch 확보, 즉시 fix 0건

**운영 데이터 동기화 (사전 작업)**
- 운영 콘텐츠 sync — release-v3.16 + 다국어 마케팅 12건 + FAQ 11건 (53건) 운영 DB 반영
- 운영 enum ALTER — `users.subscription_status += 'overdue'`, `notification_settings.entity_type += 'brand'/'foodcourt'`

**검증**:
- health-check 40/40 PASS
- API 라운드트립 18/18 (admin/brand/foodcourt/restaurants company-info — address_line_2 + ISO 정규화)
- Address suggestions 23/23 (city/state for MY/KR + cache + 역할별 + edge)
- 운영 smoke tests 10/10 (health/login/menu/order/bill/invoices/restaurants/payment/frontend/JS bundle)
- 빌드 `main.e5103dd0.js` (1.6M)


## [v3.17] — 2026-04-24 배포

### FC Tenancy Map — 계층 사이드리스트 + 유닛 상세 패널
- **사이드 리스트 계층화**: branch 카드 선택 시 그 아래 tenant 레스토랑/유닛을 nested로 자동 전개. 정렬 규칙은 stage priority (active → setup → contracting → proposal → expired → vacant) 후 unit_number 자연순. Tenant 이름 없으면 "Vacant" italic 표시.
- **유닛 클릭 시 우측 상세 패널 (Brand Map / Floor Plan 패턴)**: unit code + stage badge header, Billing Gap banner (`fc_plans` 모듈 보유 시만), Unit info, Vacant empty state CTA, Current Contract, Tenant, Financial Terms (base_rent / revenue share / min guarantee / deposit / CAM), Actions (stage advance / renew / new tenancy / open contract).
- **지도 핀 클릭 연동**: branch 선택 상태에서 tenant restaurant 핀 클릭 → 해당 unit의 상세 패널로 전환. 사이드리스트와 핀 양쪽으로 진입 가능.
- **타이머/통화**: `data.foodcourt.currency`/`time_zone` 재사용, 하드코딩 없음
- **표준 Button 컴포넌트 일관 사용**, 화살표/아이콘 없음

**검증 결과 (30/30)**:
- 주문 라이프사이클 create → read → preparing → ready → served → delete: 8/8 ✓
- 세션 변경 회귀 (R1 제거, 모듈 게이팅 Basic/Enterprise, 지도 신규 필드, branch.units 구조, stage transition): 10/10 ✓
- 역할별 접근 (SA/BG/FG + cross-tenant): 4/4 ✓
- DB 정합성 (orphan 없음): 3/3 ✓
- 보안 (anon 401 전 영역): 5/5 ✓
- **health-check 40/40 ✓**

**빌드**: `main.30c49482.js` + `8535.ccdbd53d.chunk.js` 배포

### Brand Franchise Map + Foodcourt Tenancy Map 감사 + 개선
- **Brand Franchise Map detail panel 개선** — 오늘 Floor Plan에 만든 패턴 대칭 적용
  - `OpenContractLink` anchor 제거 → opener-aware navigate + 표준 Button (variant=secondary)
  - 파이프라인 stage advance primary 버튼 (proposal→contracting→setup→active) 추가
  - Expiring/Expired 상태 각각 Renew / Create new tenancy CTA
  - `brand_plans` 모듈 게이팅 — 미보유 시 Current Plans 섹션 숨김
  - 통화/타임존 하드코딩 제거 (`'RM'`, `'Asia/Kuala_Lumpur'`, `'en-MY'` locale) → `data.brand.currency`, `data.brand.time_zone`, `contract.currency` 사용
  - 화살표/아이콘 완전 제거 (→, +, ↻ 전부)
- **Foodcourt Tenancy Map 개선**
  - **`unit_stats.occupied` runtime 버그 수정** — 백엔드는 `occupied` 필드를 반환하지 않는데 프론트가 참조해서 NaN% 표시되던 문제. Retail property 표준에 맞춰 `occupiedCount(stats) = active + setup` 헬퍼로 정의하고 아이콘/사이드리스트/팝업 모두 일관 적용
  - Leaflet 팝업의 하드코딩 영문 "PRIMARY", "Occupied", "Vacant", "Type", "Sales 30d" → `t('map.popup.*')` 4개 언어 i18n 키로 치환
  - 팝업 HTML에 branch name/code/address XSS escape 추가 (Leaflet이 raw HTML 렌더링하므로)
  - `"View floor plan →"` 화살표 제거
  - 통화 `toLocaleString()` locale-neutral + 매장 통화 심볼 prefix
- **백엔드 API 응답 확장**
  - `GET /api/brands/:id/franchise-map` 응답에 `data.brand.currency`, `data.brand.time_zone` 추가 + contract 쿼리에 `currency` 필드 포함
  - `GET /api/foodcourts/:id/tenancy-map` 응답에 `data.foodcourt.currency`, `data.foodcourt.time_zone` 추가
- **i18n 4개 언어 추가 키**: `map.primary`, `map.popup.{total,occupied,vacant,type,sales30d}`

**검증**: 빌드 exit 0, `main.41b0e710.js` + chunk 4867/5295/8535 배포, 새 i18n 키 4개 언어 live. API E2E 12/12 (brand franchise-map currency/tz + contract.currency, FC tenancy-map currency/tz, unit_stats 구조 확인, stage transition, module gating). health-check 40/40

### Foodcourt Floor Plan 감사 + 개선
- **SPA 버그 수정** — `FoodcourtFloorPlanPage.tsx` 의 "Open contract" 가 `<a href>` 였어서 full page reload 유발. opener-aware 패턴(`openInOpener`)으로 교체 — 팝업으로 떠 있으면 opener 창에서 이동 + popup close, 단독 탭이면 in-page navigate
- **Dead code 제거** — 정의되기만 하고 렌더링 안 되던 `Tabs`, `TabBtn`, `SubHeader`, `OpenLink`, `UNIT_STATUS_COLOR` 제거
- **i18n 경로 통일** — 코드의 `floorPlan.financial.redacted` → `floorPlan.fin.redacted` (locale 실존 경로에 맞춤). 4개 언어에 `editLayout`, `sec.actions`, `action.advanceToContracting/advanceToSetup/advanceToActive/advanceConfirm/newTenancy/linkPlan` 키 추가
- **Pipeline 단계 전진 버튼** — proposal→contracting→setup→active 각 단계에 primary CTA 추가. confirm modal → `PUT /api/contracts/:id/stage` 호출 → 성공 시 플로어플랜 자동 리프레시. 기존엔 계약편집 페이지 진입해야만 가능했던 흐름을 원클릭으로 축소 (ops manager 반복 동작 단축)
- **billing_gap CTA + 모듈 게이팅** — active 계약에 ContractPlan 미연결 시 띄우는 배너에 "Link a plan →" 버튼 추가. `fc_plans` 모듈 없는 basic 고객에겐 배너 자체 숨김 (오늘 구현한 `hasModule` 헬퍼 재사용 — 그들은 수동 청구만 사용하므로 혼란 제거)
- **Currency/Timezone 하드코딩 제거** — `'RM'`/`'Asia/Kuala_Lumpur'` 하드코딩 6곳 제거. 마운트 시 `/api/foodcourts/:id` fetch → `currency`(통화 심볼 변환) + `operation_settings.timeZone`을 state로 보관 → Clock + 3개 date rendering + financial tile 에 실제 적용
- **새 tenancy CTA** — expired 상태 유닛에 "Create new tenancy" 버튼 추가 (vacant와 동일한 new=1&unit_id 쿼리)
- **백엔드 권한 완화 (foodcourts GET /:id)** — Foodcourt Manager 가 자신의 foodcourt_id 매칭 시 접근 허용 (이전엔 owner만 가능해서 Manager 가 floor plan 헤더에서 currency/timezone 조회 실패)

**검증**: 빌드 exit 0, chunk `5295.9c7289aa.chunk.js` 배포, 새 i18n 키 8개 4개 언어 전체 라이브 서빙, API E2E 10/10 (currency+timezone fetch, stage transition advance+restore, fc_plans 모듈 gating, billing_gap 필드 유지), health-check 40/40

### Subscription Plan 모듈 — 실질 티어 차단 (API + URL + UI 3중 가드)
- **`middleware/requireModule.js` 신설** — 타겟 엔티티(brand/foodcourt)의 활성 `PlanTemplate.included_modules` 를 확인해서 해당 모듈 코드가 없으면 `403 MODULE_NOT_INCLUDED` 반환. SA + demo 계정 bypass. Helpers: `requireBrandModule(code)`, `requireFoodcourtModule(code)`, `requireContractEntityModule({brand: 'brand_plans', foodcourt: 'fc_plans'})`
- **백엔드 엔드포인트 29개 게이팅**: `routes/brands.js` 의 plan/subscription 엔드포인트 13개 (`brand_plans` / `brand_subscriptions`), `routes/foodcourts.js` 의 대응 13개 (`fc_plans` / `fc_subscriptions`), `routes/contracts.js` 의 plan linkage 3개 (POST/DELETE `/:id/plans`, POST `/:id/create-plan-from-contract`)
- **프론트 `ProtectedRoute.tsx` URL 가드** — `/pos/brand/plans`, `/pos/brand/subscriptions`, `/pos/manager/plans`, `/pos/manager/subscriptions`, `/pos/foodcourt/plans`, `/pos/foodcourt/subscriptions` 6개 URL 에 대해 모듈 미보유 시 역할 대시보드로 자동 redirect. 이전엔 사이드바만 숨겨져 있어 URL 직접 입력으로 우회 가능했음
- **검증 (동일 유저의 plan_type 스왑으로 전수)**: Basic tier BG → `GET/POST /brands/:id/plans`, `GET /brands/:id/subscriptions`, `POST /contracts/23/plans` 전부 403 MODULE_NOT_INCLUDED. SA → 200 bypass. Enterprise tier BG → 200. plan_type 원복 검증 포함 10/10 pass. health-check 40/40

### R1/R2 방어선 철회 + Contract Billing Plan 연결 모듈 게이팅
- **R1/R2 정합성 방어선 전면 제거** — 직전 세션에 도입한 restaurant-contract cross-brand 차단이 잘못된 도메인 모델이었음. Contract UI 에 브랜드 선택 필드가 없어(`entity_id` 는 BG 유저의 `brand_id` 자동 반영) 사용자가 의식적으로 지정하지도 않은 필드로 정당한 브랜드 변경을 400으로 막고 있었음. Restaurant 은 live entity (컨셉/방향/세무 유연 변경), Contract 는 시점 합의 스냅샷이라는 원칙으로 재정립.
- **수정 대상 5곳**: `routes/restaurants-crud.js` PUT / `routes/brands.js` plan 배정 / `routes/foodcourts.js` plan 배정 / `routes/contracts.js` POST restaurant 연결 / `scripts/cleanup-addresses.js` (brand_id/foodcourt_id 자동 교정 로직 제거, 주소 sanitize + EPR cross-brand informational 경고만 유지)
- **Subscription Plan UI 게이팅** — `ContractDetail` 의 `LinkedPlansSection` 을 `brand_plans`/`fc_plans` 모듈 보유자에게만 조건부 렌더. Basic 고객은 `financial_terms` + One-time Invoice 만으로 운영. `hooks/useAllowedRoutes` 에 `hasModule(code)` 헬퍼 + `includedModules` 노출
- **검증**: Restaurant #10 brand_id 1→4 PUT 200 OK, Contract #23 / EPR 2건 snapshot 보존, cross-brand plan assignment 차단 해제, health-check 40/40
- **설계 문서 회고 추가**: `docs/ADDRESS_STANDARDIZATION.md` §2 에 R1/R2 철회 사유/범위 기록

### Address Standardization — Global Unification
- **주소 입력 표준화** — 9개 엔티티 주소 관련 DB 스키마 통일: `country CHAR(2) ISO 3166-1 alpha-2`, `latitude/longitude DECIMAL(10,7)`, 전 엔티티에 `address_line_2 VARCHAR(255)` 추가. users/suppliers/hardware_quotes 에 6필드(city/state/postal/country) 확장
- **공용 `<AddressFields>` 컴포넌트** — 6필드 + lat/lng, 250국가 locale별 이름 select, 줄바꿈 자동차단, autoComplete 지원. Admin/Manager Restaurants, FoodcourtBranches, Suppliers, BrandManagement 5곳에 일괄 적용
- **AutoSave 패턴 페이지**에도 address_line_2 추가 — CompanyInformation, AdminSettings, BrandCompanyInfo
- **Cross-brand 정합성 3중 방어선** — (1) plan→restaurant 배정 API, (2) contract 생성 API, (3) restaurant brand_id PUT 에 R1/R2 규칙 강제 (BRAND_MISMATCH / FOODCOURT_MISMATCH 400 차단). 이전 with MIN Cafe 같은 증상 재발 방지
- **Picker UX 개선** — Manager/RestaurantsPage Link contract/plan 피커 상단에 "Linking restaurant X to Y under brand Z" amber 배너 사전 안내
- **주소 표시 유틸 `formatAddress()`** — 국가별 포맷 (MY/KR/JP/default), format: `'full' / 'short' / 'oneline' / 'location'`. BrandFranchiseMapPage 상세/리스트/팝업(+XSS escape 보너스), Brand/Foodcourt InvoiceViewModal 에 적용
- **운영 DB 사전 점검 스크립트** `scripts/audit-addresses.js` (read-only) — schema + country ISO + 줄바꿈/탭 + R1/R2/EPR 정합성 전수 점검
- **데이터 정제** — `scripts/cleanup-addresses.js` — newline sanitize, "Malaysia" → "MY" 등 country 정규화, R1 정합성 자동 교정 (dev DB 에서 Restaurant #10 brand_id 4→1 수정됨)
- **franchise-map API 500 에러 수정** — 존재하지 않는 `entity_plans.fixed_amount`/`billing_cycle` 컬럼 참조 제거, `entity_plan_prices.monthly_price` 별도 조회, `currentPlans` 배열로 변경 (한 레스토랑 다중 플랜 지원)
- **설계 문서**: `docs/ADDRESS_STANDARDIZATION.md` (11장, 30년차 리뷰 반영)
- **의존성**: `i18n-iso-countries@^7.14.0` (frontend + backend)

### Subscriptions Pending Plan Change + Foodcourt General Parity
- **Subscriptions 예정 변경 (pending) 플로우** — `/pos/brand/general/subscriptions`, `/pos/foodcourt/general/subscriptions` 에서 이미 플랜이 배정된 레스토랑에 다른 플랜을 배정하면 즉시 교체가 아니라 다음 청구 주기 날짜로 스케줄. 행에 "Scheduled change: X on YYYY-MM-DD" 배너 + Cancel 버튼 표시. 스케줄러(2AM cron)가 활성일 도래 시 자동 전환
- **Add Subscription 모달 필터** — 이미 플랜 있는 레스토랑은 드롭다운에서 제외 (기존 플랜은 Change Plan 행 버튼으로만 변경). 전부 배정되어 있으면 안내 문구
- **버튼 silent 실패 수정** — Assign / Unassign / Discount / Cancel-pending 모든 액션의 에러를 페이지 상단 토스트 + 모달 inline 으로 surface (이전엔 `console.error`만)
- **Change Plan 경고 힌트** — 다른 플랜 선택 시 "다음 청구 주기부터 적용" amber 배너 명시
- **Foodcourt Subscription 섹션** — Manager/RestaurantsPage.tsx Edit 모달에 Foodcourt General 전용 섹션 신설 (Tenancy Contract + Foodcourt Plan 2카드, 인라인 피커)
- **Foodcourt Subscriptions 페이지 + Add Subscription 버튼** — 이전엔 Export만 있었고 추가 버튼 자체 부재. 브랜드와 동일한 모달 UX
- **Contract Detail "View all plans" 버튼 심벌 제거** — "↗" 제거, "+ Issue One-time Invoice" 의 "+" 제거
- **contract.json i18n 보정** — `detail.viewAllPlans / viewAllPlansHint / linkExistingPlan / noLinkedPlansHint` 4개 언어 누락 키 추가
- **DB**: `entity_plan_restaurants` 에 `pending_plan_id`, `pending_activation_date` 컬럼 추가 (backward-compatible)

### Billing 섹션 액션 버튼 정리
- "All Plans ↗" 버튼 제거 — 인라인 2개 액션(Link / Create)이 95% 케이스를 커버하므로 중복 제거. 플랜 관리는 사이드바 네비게이션 Plans 페이지에서
- 피커 모달 "No available plans" 빈 상태에 Plans 페이지 링크 추가 — 엣지 케이스만 대비

### Contract Detail 섹션 상태 배지 + 배너 오판 수정
- "Billing plan linked" 초록 배너가 **닫힌(end_at SET)** ContractPlan도 카운트해서 잘못 표시되던 버그 — `form.plans.length > 0` → `form.plans.some(p => !p.end_at)` 로 open 링크만 체크
- 5개 아코디언 섹션(Parties/Contract/Billing/Setup/Documents) 상태 배지 로직 **완전 통일** — 이전엔 섹션마다 다른 라벨("Complete" / "N/4 filled" / "Pending" / "No plan linked" 등)로 비일관적. 수정 후 3-상태 일관:
  - **Required N** (빨강) — 다음 stage 필수 필드 부족
  - **✓ Complete** (초록) — 섹션 핵심 필드 전부 채워짐
  - **Incomplete** (회색) — 일부 입력 또는 미입력 (지금 안 해도 됨)
- 섹션별 `isSectionComplete()` 기준 정의:
  - Parties: 신청자 식별(회사/담당자) + 연락처(이메일/전화) + 발행자 회사명
  - Contract: 계약번호 + 시작일 + 종료일 + financial_terms 값 1건 이상 + (foodcourt) unit
  - Billing: open(end_at=null) ContractPlan 1건 이상
  - Setup: 필수 task 존재 + is_required=true 전부 완료
  - Documents: 문서 1건 이상


## [v3.16] — 2026-04-22 배포

### 2026-04-23 (POS 로그인 UX)
- POS 로그인 페이지 원클릭 로그인 — 데모/테스트 계정 카드 클릭 시 자동 로그인 + 역할 기반 리다이렉트. 이전엔 필드만 채워지고 별도로 "Login" 버튼을 눌러야 했음. 문구도 "sign in instantly"로 변경

### 2026-04-23 (Contract Detail Billing 섹션 UX 정비)
- Billing 섹션 상태 배지 로직 재작성 — 이전: nextStage 요구사항이 billing에 없어서 항상 "✓ Complete"로 잘못 표시됨. 수정: open plan 링크 있으면 `✓ Plan linked`, setup/active 단계이면서 billable terms 있는데 plan 미연결이면 `No plan linked`(required), plan 없고 billable terms도 없으면 `Not set up`(required), 그 외엔 `Pending`(optional)
- "Create plan from contract" 버튼 이모지(⚡) 제거 — 비인라인 아이콘이 어지러워 텍스트로 단순화
- "Link existing plan" 피커 모달 신규 — 기존 EntityPlan 목록에서 검색/선택해서 이 contract에 link. Phase 2-C 패턴 재사용(transaction 내 이전 ContractPlan close + EPR 자동 전환). 권한: 같은 entity 소속 Plan만 link 허용(403)
- "All Plans ↗" 버튼 — 이전 `window.location.href`로 전체 페이지 이동 → `window.open(_blank)` 새창
- "Issue One-time Invoice ↗" 버튼 — 새창으로 열리도록 변경(현재 Contract 페이지 유지)
- "View all invoices for this contract ↗" 버튼 신규 — 계약에 연결된 전체 invoice를 새창으로 조회
- 백엔드 `POST /api/contracts/:id/plans` 강화 — 이전: ContractPlan만 만들고 EPR 안 만듦(스케줄러가 빌링 못 함). 수정: entity ownership 검증 + transaction 내 prior ContractPlan.end_at + prior EPR deactivate + 새 ContractPlan + 새 EPR 자동 생성/재활성화. create-plan-from-contract 마법사와 동일 EPR 배선

### 2026-04-23 (Contract-Plan-Invoice 파이프라인 완결)
- Phase 2-C: Contract → Plan → Invoice 자동화 완결 — `create-plan-from-contract` 마법사가 EntityPlanRestaurant를 트랜잭션 내 동시 생성, 스케줄러가 실제로 invoice를 발행. 이전까지 0건이던 Contract 기반 invoice 자동 생성이 실동작 확인
- Phase 2-C: Contract stage 전환 시 Plan/EPR 동기화 — stage=terminated/expired/renewed 전환, /terminate 호출, subscriptionScheduler auto-expire 3경로 모두 ContractPlan.end_at + EntityPlanRestaurant.is_active=false 동시 처리
- Phase 2-C: invoiceScheduler 방어선 — 생성 invoice에 contract_id 기입 (traceability), Contract-originated Plan의 모든 ContractPlan.end_at이 닫혔으면 skip (ghost billing 차단)
- Phase 2-C: 마법사 Plan 교체 시 이전 EPR 정리 — create-plan-from-contract 재호출로 Plan 교체될 때 이전 EPR도 is_active=false 처리
- Phase 2-C: Backfill 스크립트 `scripts/backfill-contract-plan-restaurants.js` (idempotent) — 기존 orphan plan 복구
- Phase 2-D: Contract renewal Plan carry-over — `POST /contracts/:id/renew` 트랜잭션화. terms_changed=false면 이전 ContractPlan close + 새 ContractPlan create (same EntityPlan, EPR 유지). terms_changed=true면 EPR deactivate + ContractPlan close, 새 계약은 proposal
- Phase 2-E: Proration (일할 계산) — invoiceScheduler.computeProrationFactor 신규. 고정분만 factor 곱 (percentage는 활동 기반이라 자연 비례). 계약이 기간과 겹치지 않으면 invoice 스킵
- Phase 2-E: billing-preview API proration 반영 — proration_factor, period 필드 응답 추가. 검증 5 시나리오 통과: full(3000), mid-start(15/31 일할), mid-end(11/31 일할), no overlap(skip)
- Phase 2-F: Plans 역참조 — EntityPlan.hasMany(ContractPlan, as: contractLinks) 추가. /foodcourts/:id/plans + /brands/:id/plans 응답에 contractLinks include (contract_number/stage/period/applicant)
- Phase 2-F: Plan DELETE 가드 — open ContractPlan 있으면 400 차단. Foodcourt/Brand 양쪽 동일
- Phase 2-F: FE — Plan 카드 "From contract" 배지 + 상세 모달 "Linked Contracts (N)" 섹션 (계약번호/기간/stage/Open·Closed 상태)
- 설계 문서 `docs/CONTRACT_PLAN_CURRENCY.md`에 Phase 2-C/D/E/F 섹션 추가

### 2026-04-20 (저녁)
- Brand Franchise Map / Foodcourt Branch Map 독립 창 분리 — 사이드바 메뉴 클릭 시 `window.open(_blank)` 로 새 창, 사이드바 없는 standalone 레이아웃. `← Back` 으로 창 닫기
- Map 사이드 리스트 패널 — 레스토랑/지점 리스트 클릭 시 해당 위치로 지도 확대 + 상세 정보. Foodcourt Branch 클릭 시 입점 매장 서브 리스트 펼침
- 핀 스타일 정제 — 외부 보라 그림자 제거(잘림 해결), 선택 표시는 핀 내부 링. `franchise=★` / `direct=●`, 계약 없는 경우 마크 표시 안함
- Brand Map 다중 브랜드 개선 — 레스토랑 많은 순 정렬 + 드롭다운 항상 표시 + 각 브랜드 레스토랑 개수 표기
- Foodcourt Floor Plan 뷰/에디터 신규 — `/pos/foodcourt/floor-plan` (뷰, 매장 클릭 → 계약 정보 사이드 패널: Store / Tenancy Contract / Financial Terms / Restaurant 4섹션) / `/pos/foodcourt/floor-plan-editor` (에디터, 레스토랑 FloorPlanEditor 패턴 복제, FloorPlanCanvas 재사용, Add Store shape 4종 / Unplaced / Properties / Canvas 설정 Sidebar 카드, drag/resize/undo/save)
- Floor Plan 1 지점 = 1 평면도 단순화 — 에디터 진입 시 평면도 없으면 자동 생성, 다층 UI 제거
- Branch Unit Numbering 설정 — 지점 편집 모달 신규 섹션. Toggle switch + Zone cards. Prefix 토글(선택적) + Free-form textarea (콤마/줄바꿈, 범위 `01-20` `A01-A10` `05A-08A` `P-2-01A-05A` 자동 확장). Preview + 변경 Diff (Create/Delete/Blocked-by-contract) + contract 연결 유닛 삭제 시 거부
- Branch Unit Numbering 저장 시 Contract / Floor Plan / Restaurant 자동 반영 — 동기화된 Units 가 계약 생성 시 드롭다운 및 Floor Plan Unplaced Stores 에 자동 표시
- Branch 편집 모달 공용 컴포넌트화 — `CommonModal size="large"` + `FormRow/FormGroup/FormLabel/FormInput/FormSelect` 로 교체, 필드 겹침 해소, `Add Branch` (+기호 제거)
- 사이드바 Foodcourt General — Tenancy / Branch Map / Floor Plan 3개 메뉴 분리. Branches / Floor Plan / Map 은 새 창
- AddonModule `fc_floor_plan` 등록 + 모든 Foodcourt 플랜(Basic/Pro/Enterprise)에 자동 편입
- DB: `foodcourt_floor_plans` 테이블 신규 / `foodcourt_units.floor_plan_id/plan_x/plan_y/plan_width/plan_height/plan_shape` 추가 / `foodcourt_branches.unit_config JSON` 추가
- Backend API — `GET/POST/PUT/DELETE /api/foodcourt-branches/:id/floor-plans`, `PUT /api/foodcourt-floor-plans/:id/layout` (batch 배치), `GET /api/foodcourt-units/:id/detail` (계약 join), `POST /api/foodcourt-branches/:id/sync-units` (preview/confirm, contract 보호)
- ProtectedRoute brandLevelRoutes 에 `/pos/brand/franchise-map`, `/pos/foodcourt/tenancy-map`, `/pos/foodcourt/floor-plan(-editor)` 추가
- i18n 4개 언어 — Floor Plan / Unit Numbering / Map 관련 40+ 키

### 2026-04-20
- Manager 지점/브랜드 접근 enforcement — `users.branch_id/brand_id` 기반으로 contracts / invoices / units / branches / restaurants 5개 라우트에 실제 필터 적용. `getManagerScope()` 헬퍼 + `req.user.branch_id` 노출. 통합 테스트 8/8 pass
- Contract 리스트 Active Pipeline / Archive 탭 — expired 드롭다운 누락 버그 수정. Pipeline은 4단계(proposal~active) 유지, Archive는 List 뷰 강제 + stats 3종(terminated/expired/renewed)
- Restaurant 리스트 Operational / Archive 탭 — Suspended는 Operational에 유지 (결제 주의 놓치지 않게). 백엔드 `/api/restaurants?status=` 다중값 필터 추가
- Brand Franchise Map 신규 — Leaflet + OpenStreetMap, 클러스터링, 상태별 핀 색상 5종, Franchise=★ / Direct=● 구분, 핀 크기 = 최근 30일 매출, 점선 원 = territory radius (`exclusivity_terms.radius_km`), Un-mapped 매장 리스트
- Foodcourt Tenancy Map 신규 — Branch 큰 핀(점유율 % 표시) + 입점 Restaurant 작은 핀(계약/매출), territory radius 동일 적용, 유닛 통계 (total/occupied/vacant/reserved)
- 수동 좌표 편집 UI — Restaurant(Admin 신규+편집 모달), FoodcourtBranch 폼에 latitude/longitude 입력 필드
- Auto-Geocoding (Nominatim) — POST/PUT 주소 변경 시 비동기 훅 (응답 차단 없음). 수동 좌표가 있으면 우선. `utils/geocoding.js` (1 req/s 스로틀)
- DB `restaurants.latitude/longitude DOUBLE NULL` 컬럼 추가 + backfill 스크립트 (`scripts/backfill-restaurant-geocode.js` dry-run 지원)
- AddonModule 등록 — `brand_franchise`, `fc_tenancy`, `fc_branches` 신규 모듈. 모든 Brand/Foodcourt 플랜(Basic/Pro/Enterprise)에 자동 포함 (`scripts/register-map-modules.js` idempotent)
- i18n 4개 언어 확장 — tabs + franchiseTabs + map legend + latitude/longitude 키 (en/ko/zh/ms)


## [v3.15] — 2026-04-19 배포

### 2026-04-19
- Sidebar 실시간 뱃지 갱신 — 전역 소켓 이벤트 `order-created/items-added/updated`에 뱃지 재조회 호출 추가 (기존 15초 polling 대기 → 즉시 반영)
- Contract 리스트 카드 UX — 금액 요약 블록 (플랜 연결시 플랜 값, 미연결시 financial_terms + "pending plan" 힌트), 잔여기간 태그 (expired/warning/normal), Foodcourt 카드 유닛/location_description 표시. 공용 헬퍼 `utils/contractBillable.ts` 신규 (getBillableSummary, getRemainingInfo)
- Contract 리스트 파이프라인 레이아웃 정렬 — Column 회색 배경 제거, gap 8px, width 100% — 상단 StatsGrid 와 좌우 full 정렬
- Contract Detail Tab → Smart Accordion 전환 — Parties/Contract/Setup/Documents 4개 섹션 아코디언화. `FormAccordion`+`FormAccordionSection` 신규 컴포넌트, 섹션별 상태 배지 (✓ Complete / ⚠ N required), RequiredBanner 집계 + chip click→scroll, ReadyBanner 초록 안내, 외곽 박스 제거 (선 구분만)
- Contract Detail 필드 하이라이트 — 필수 부족 필드 빨간 테두리 + 인라인 에러 메시지, chip 클릭시 보라 pulse 애니메이션 (1.2s × 2회) 및 smooth scroll
- 버튼 정책 전환 — "필수 부족 시 disabled" → "클릭 허용 + 자동 섹션 펼침/스크롤". UI_DESIGN_GUIDE 4.4 개정
- Notes & Comments 제목/구분선 중복 제거 — CommentSection `titleText` prop + `$embedded` 스타일 (외부 제목 없애고 "Notes & Comments (N)" 단일로 통합)
- Documents 필수 제거 — 외부 DMS 사용 가능 반영. Contracting→Setup 전환 시 Documents 업로드 강제 요건 삭제
- P0 #1 Foodcourt `unit_id` 필수 — Contracting→Setup 시 entity_type='foodcourt' && !unit_id 검증 추가 (기존 허점 보완)
- P0 #2 Applicant 식별 OR 조건 — `applicant_company_name` 또는 `applicant_contact_person` 중 하나만 있으면 통과 (개인 자영업자 대응)
- P0 #3 `contract_tasks.is_required` 필드 신규 — Setup→Active 전환 시 `is_required=true` task만 완료 요구. Marketing 지원 등 진행형 task 유연성 확보. SetupChecklist UI 에 Required/Optional 토글
- i18n 4개국어 13키 추가 (en/ko/zh/ms) — banner/section/applicant/unit/task 관련
- Accordion 패턴 UI_DESIGN_GUIDE 14장 신설
- 설계 문서 `docs/CONTRACT_DETAIL_UX.md` 실제 구현 기준으로 최신화
- Contract 만료 임박 알림 — renewal_alert_months + D-7 2단계 이메일 자동 발송, 만료 하루 경과 시 자동 stage='expired' 전환, Brand/Foodcourt General 팀 + applicant 별도 이메일. 상세 페이지 상단 ExpiryBanner + URL `?action=renew` 자동 Renew 트리거
- Contract → Invoice 추적 연결 — `invoices.contract_id` 컬럼 신규, Contract 상세 Accordion "Billing" 섹션 (Recurring Subscriptions + One-time Invoices + Negotiated Financial Terms 참조), "+ Issue One-time Invoice" 버튼 → Invoice Create Modal 자동 prefill (payer/brand/foodcourt/contract 정보 자동 채움)
- Foodcourt Branch 시스템 신규 — `foodcourt_branches` 테이블 신설, 1 Foodcourt = N Branch 지원. 지점 코드 기반 유닛 식별 (`SUNWAY-A01`, `PAVILION-A01` 형식). 지점별 주소/연락처/운영시간/위경도/inactive 전환 지원. Foodcourt General 전용 사이드바 "Branches" 메뉴 + 전용 관리 페이지. 기존 Foodcourt 자동 마이그레이션 (primary branch 생성)
- Foodcourt Unit 지점별 유일성 — `(branch_id, unit_number)` unique 제약. 서로 다른 지점에 같은 유닛 번호 허용. 지점 간 유닛 이동 지원. inactive 지점에는 신규 유닛 차단
- Contract Pipeline 카드 / Contract Detail Unit 섹션 — 유닛을 `CODE-UNIT (Branch Name)` 형식으로 표시 (예: `SUNWAY-A01 (Sunway Pyramid)`)
- Foodcourt Manager 지점 할당 — `users.branch_id` 컬럼 신규, FoodcourtStaffPage Add/Edit 모달에 "Branch Assignment" Select (All branches / 특정 지점). JWT payload에 branch_id 포함
- Brand Manager 브랜드 할당 — 여러 Brand 소유 Brand General이 Manager 추가 시 "어느 Brand에 소속시킬지" Select 필수. Manager 목록은 소유한 모든 Brand에서 통합 조회
- Brand 권한 로직 owner_id 기반으로 개편 — `req.user.brand_id` 단일 비교에서 `brand.owner_id === req.user.id` 로 전환 (6개 라우트). 다중 브랜드 소유자가 primary 외 브랜드에도 Manager 생성/수정/삭제 가능
- Invoice PUT IDOR 취약점 수정 (보안) — `Number(null) === Number(null)` = `true` 버그로 인해 타 엔티티가 인보이스 수정 가능했던 점 차단. issuer_type/id + restaurant_id null-safe 비교로 System Admin / 발행자 / 수신 restaurant 만 편집 허용
- Restaurant ↔ Branch 연결 — `restaurants.branch_id` 컬럼 신규. Foodcourt General이 레스토랑 생성/편집 시 Branch Select로 입점 지점 지정 가능 (branch ↔ foodcourt 일관성 검증 + inactive 차단). 레스토랑 리스트 응답에 branch 정보 포함
- Foodcourt General 레스토랑 스코프 버그 수정 — `/api/restaurants` 에서 Foodcourt General이 전체 레스토랑을 보던 문제 수정. `optionalAuth`가 foodcourt_id를 req.user에 누락시킨 버그 동시 수정. 이제 본인 foodcourt 내 레스토랑만 조회
- Foodcourt General Admin 관리 페이지 레스토랑 드롭다운 수정 — `/api/restaurants/manager/:managerId` 가 RestaurantManager 조인만 사용해서 Foodcourt General에는 빈 목록 나오던 버그. Role 분기 추가로 Foodcourt General/Manager 는 `foodcourt_id` 기반 조회
- Foodcourt 사이드바 정리 — obsolete "Foodcourts" Coming Soon 플레이스홀더 제거, "Branches" 메뉴를 Management 섹션 첫번째로 이동
- FoodcourtStaffPage 버튼 스타일 표준화 — 얇던 버튼 (8px 16px) → 표준 사이즈 (12px 20px, border-radius 8px, font-weight 600)
- Documents 필수 차단 제거 — Contracting→Setup 전환 시 Documents 업로드 강제 요건 삭제 (외부 DMS 사용 가능)
- ContractDetail Financial Terms 섹션 상태 배너 — 플랜 연결됨/미연결 상태에 따라 상단에 "Billing plan linked" 초록 배너 또는 "No billing plan linked" 노란 배너 표시 (카드/상세 일관성)

### 2026-04-18
- Contract Management Enhancement Phase 1 구현 — 당사자/발행자 정보 확장 + 4탭 UI (Parties/Contract/Setup/Documents), 신규 컴포넌트 3개 (BankInfoField, RepresentativeField, SyncMasterToggle)
- Contract Phase 1.5 — Brand/Foodcourt 마스터 정보 수정 시 issuer_sync_with_master=true 계약(proposal/contracting/setup 단계만) 자동 전파 훅
- Contract Phase 2 — Tenancy/Franchise 재무 조건 확장, RentScheduleEditor(연도별, 모바일 카드 뷰) + PercentageRentField 컴포넌트, financial_terms JSON 스키마 validate 훅
- Contract Phase 3 — 계약 조항 5종 JSON 컬럼 추가 (special_conditions/renewal_policy/exclusivity_terms/support_services/legal_terms), Support Services 카탈로그 (Brand/Foodcourt 각 12개), Setup 단계 진입 시 체크된 지원업무 항목 자동 태스크 생성, 신규 컴포넌트 3개 (ConditionListEditor, SupportServicesChecklist, LegalTermsEditor)
- Contract 필수 필드 UX — 라벨에 빨간 `*` 표시 + 필수 미입력 시 상단/하단 "Proceed" 버튼 disabled + tooltip + 단계 전환 에러에 누락 필드명 구체화
- Contract Detail 상단 HeaderActions — 긴 스크롤 없이 상단에서도 "Proceed to X" / "Renew" / "Terminate" 액션 가능 (하단 버튼과 동기화)
- Inquiry Close 버튼 버그 수정 — Brand/Foodcourt Operation Inquiry 카드의 Close 버튼 PATCH → PUT 메서드 변경 (silent fail 해소)
- Inquiry 모달 Close 버튼 UX 변경 — 우측 상단 X = 모달 닫기, 하단 Close Ticket 버튼 = 티켓 상태 closed로 변경 (이미 closed/resolved면 버튼 숨김). 11개 Inquiry 페이지 전체 적용 (Operation × 5 + System × 6)
- UI_DESIGN_GUIDE 4.3/4.4 신규 섹션 — 주요 액션 버튼 상단/하단 양쪽 배치 규칙 + 필수 미입력 시 버튼 비활성화 규칙 명문화
- `/검증` 스킬 8단계 UI/UX 품질 확장 — 7개 서브카테고리 (디자인 시스템/트렌드 디테일/기능 적합성/반응형/i18n/접근성/실제 확인 방법)

### 2026-04-17
- Contract Management Enhancement 설계 완료 (4단계 + 30년차 3개 관점 검증 반영) — 구현은 다음 세션. 주요 보완: issuer 마스터 동기화 토글, financial_terms JSON 검증, Support Services↔Tasks 연동, legal_terms 컬럼, 4탭 인터페이스 도입
- Contract Information 레이아웃 재구성 — 2열×3행 6필드 (Number/Type/Period/SigningDate/Duration/Remarks)
- Contract Franchise/Tenancy Terms 통화 심볼 표시 (`RM 5,000.00` 형식) + Security Deposit 필드 재확인
- Contract Applicant Information 분리 — "Name" 하나 → "Company Name" + "Contact Person" 2개
- ContractDetail 자동저장 실패(빨간 !) fix — whitelist 필드만 PUT
- Link Restaurant 검색 수정 — 백엔드 search/limit 쿼리 지원
- Brand General Dashboard — Active Contracts 위젯 신규 (총 개수 + 최근 5개 목록 + View all)
- Date Input 전면 통일 — `<input type="date">` 42곳 제거, DateField/DateRangeField 컴포넌트 신규 (25개 파일 적용)
- C-6 거대 컴포넌트 분할 — LiveOrders/Admin·Brand·Foodcourt Invoices 4개 파일 17,452→7,015줄 (60% 감소)

### 2026-04-16
- 모바일 주문 영수증 다운로드 (PNG) + 공유 (WhatsApp/Telegram/Web Share) 기능 추가
- 모바일 주문 API 응답에 재무 데이터 + 레스토랑 정보(사업자번호/세금번호) 포함
- branch_name 표시 전수 점검 — 25개 파일 일괄 `getRestaurantDisplayName()` 유틸 적용
- Recipe 이미지 base64 → 파일 전환 (3건 마이그레이션)
- N:M 조인 테이블 DROP — `brand_product_brands`, `supplier_brands` 삭제 + 죽은 코드 제거
- 구독 전환 이메일 보강 — Active→Overdue, Entity(Brand/Foodcourt/Owner) 전환 알림 추가
- 인보이스 연체 리마인더 — D+3/D+7/D+14 발행자 SMTP로 자동 발송
- 타임존 전체 적용 — `toLocaleString` 계열 ~200곳 유틸로 교체 (~74파일)
- nginx 권한 수정 — 500 에러 해결
- `/기능설계` 스킬 신규 추가 (대규모 기능 개발용 6단계 체계)

### 2026-04-15
- 모바일 주문 카테고리 전환 시 전체 페이지 리로딩 현상 제거 (inline fetch, isLoading 상태 토글 생략)
- 모바일 이미지 파이프라인 전면 재작성 — base64 저장 구조를 파일 URL 로 전환, 운영 DB `products.image` 35.4MB → 0.01MB (289건 sharp 변환)
- 모바일 상품 상세 API 500 에러 복구 (`getPreparationTime is not defined` ReferenceError)
- 모바일 메뉴 카테고리별 초기 로드 + 메모리 캐시 (`categoryCacheRef`) — 재방문 시 네트워크 0
- 이메일 엔티티 브랜딩 시스템 구축 — Restaurant/Brand/Foodcourt 자체 로고·이름·색상을 이메일 헤더/푸터에 반영
- 고객 비밀번호 리셋 메일: 레스토랑 SMTP 우선 → 없으면 플랫폼 fallback, 항상 레스토랑 브랜딩 유지
- Notification 이메일 (공지/댓글/인보이스/티켓): 수신자 entity 브랜딩으로 자동 재렌더 (notificationTemplates metadata + notificationService 재렌더 파이프라인)
- 엔티티 브랜딩 이메일에서 PurpleHere 로고/링크 완전 제거 (헤더 `<a>` 래퍼 + 푸터 링크 + unreferenced CID 첨부 모두 조건부 제거)
- `emailLayout` 로고 텍스트 fallback — 로고 없는 엔티티는 브랜드 이름 텍스트 표시 (PurpleHere 기본 로고로 오해되던 문제 해결)
- 이메일 로고 바이너리 pre-resize (sharp, height 40px / max-width 280px) — CSS 스케일링 의존 제거로 와이드 배너 overflow 방지
- System Admin 발송 메일(POS 비밀번호 리셋/회원가입 환영/랜딩 문의 등)은 기존과 완전 동일 (PurpleHere 브랜딩 유지)

## [v3.14] — 2026-04-14 배포

### 공지 가시성 + Updates 카테고리 배지 (배포 2 — hotfix)
- **증상 1**: 릴리즈 공지가 `/pos/admin/notices` 에 안 보임. 이전 v3.13 공지까지 전부 누락
- **원인**: `/api/notices/sent` 가 `where: { author_id: req.user.id }` 로 본인 작성만 반환. release-post 스크립트가 author=1 로 고정 생성 → Irene(id=4) 로그인 시 0건
- **수정**: System Admin 로그인 시 `author_id IN (모든 System Admin ids)` 로 확장. 다른 역할은 기존대로 본인 작성만
- **증상 2**: 리스트가 "NORMAL" 만 보이고 Updates 카테고리 표시 없음
- **원인**: `NoticesPage.tsx` 5개 역할 모두 `notice.category === 'guide'` 만 배지 렌더, `updates` 누락
- **수정**: 5개 역할 페이지 전부 `updates` 카테고리에 보라색 "Updates" 배지 추가 (기존 `guide` 패턴 재사용)
- **검증**: 운영 Irene (id=4) `/sent` 응답 0 → 14건 (v3.14 포함). 배포 2 smoke 10/10 (07:14 UTC, `main.3fe57608.js`)

### 인보이스 발행자 은행계좌 정보 복구 + PDF 안전 분할
- **증상**: Brand/Foodcourt 가 Payment Settings 모달에 입력한 은행계좌가 인보이스 뷰/프린트/다운로드 어디에도 표시 안 됨. 2장 넘는 긴 인보이스는 PDF 다운로드 시 글자 중간에서 잘림
- **원인 1**: `invoices-helpers.js getIssuerCompanyInfo` 가 brand/foodcourt 분기에서 legacy `brand.bank_name` 직접 컬럼만 읽고 `payment_settings.bankTransfer[currency]` JSON 을 무시
- **원인 2**: 메인 `/api/invoices` GET transform 이 `issuerInfo` 필드를 응답에 포함 안 함. Admin 프론트는 `companySettings.bankName` (별개 엔드포인트) 을 사용하는데 여긴 은행정보 없음
- **원인 3**: 5개 역할 페이지 모두 `html2canvas` → 단일 PNG → 297mm 고정 height slice 로 기계적 분할. 행 중간 절단 방지 장치 없음
- **수정 (백엔드)**: `extractBankFromPaymentSettings(payment_settings, currency)` 헬퍼 추가. brand/foodcourt 분기에서 payment_settings 우선, legacy 컬럼 폴백. 메인 GET 에 `issuerInfo` 추가 (캐시로 N+1 방지)
- **수정 (프론트)**: `dev-frontend/src/utils/invoicePdf.ts` 신규 — `renderIframeToPdf()` 로 캔버스 픽셀 행 스캔 (흰색 행) 후 안전 분할. `INVOICE_PRINT_CSS` 상수 — `.summary-section`, `.items-table tr`, `.bank-section` 등에 `page-break-inside: avoid`. 5개 invoice 페이지 (Admin/Restaurant/Brand/Foodcourt/Owner) 모두 공통 util 호출로 중복 로직 제거
- **수정 (Admin/Brand/Foodcourt view)**: HTML 템플릿 + React 뷰 모달 모두 `invoice.issuerInfo?.bankName` 우선, `companySettings` 폴백
- **검증**: API 실호출 — System Admin 34건 중 33건 issuerInfo.bankName 채움 (1건 EUR 미설정), Brand General 8건 전부 `payment_settings.bankTransfer.MYR` 기반 bank info 매칭. health-check 39/39. 뷰/프린트/다운로드 3경로 모두 표시 확인

### Kitchen Stations 3개 이슈
- **증상 1**: 신규 레스토랑이 메뉴 아이템에 카테고리 다 배정했는데도 "2 uncategorized menu items" 오경고 표시
- **원인**: `SettingsPage.tsx:4697` 필터가 `p.category` 를 검사하는데 백엔드 `/api/menu` 응답은 `categoryId` (camelCase) 로 반환 → 항상 undefined → 전부 오탐
- **수정**: `p.categoryId ?? p.category_id` 둘 다 허용
- **증상 2**: 주방이 1개뿐인데도 복잡한 Assignment Mode 카드 + 경고 배너 표시. 사용자가 "세팅 안 해도 되는데 헷갈린다" 호소
- **수정 (백엔드)**: `kitchen-stations.js GET /` 에서 stations 0개이면 "Kitchen" default station 자동 INSERT (lazy create)
- **수정 (프론트)**: stations ≤ 1 일 때 초록색 안내 배너 ("You have 1 kitchen station. All orders will be routed here. No setup needed.") 표시 + Assignment Mode 카드 + Unassigned 경고 블록 숨김
- **증상 3**: 대시보드 "Complete Your Setup" 체크리스트에서 "Set up Kitchen Stations" 가 설정 후에도 체크 안 됨
- **원인**: `useSetupStatus.ts:103` 가 `result.data` 를 array 로 취급하는데 실제 응답은 `{ data: { assignment_mode, stations: [...] } }` 구조 → 항상 length=0
- **수정**: `result.data?.stations || []` 로 올바르게 파싱
- **검증**: lazy create idempotent (Settings/KitchenDisplay/Dashboard 3경로 동일 ID 반환, DB 중복 없음)

### Legacy email 템플릿 2개 → emailLayout() 교체
- **증상**: 운영에서 신규 회원가입 admin 알림 이메일이 옛날 템플릿으로 발송 — 로고 없음, 텍스트 `<h1>PurpleHere</h1>` 헤더, "No-reply email" 레거시 footer
- **원인**: 2개 사이트가 `emailLayout()` 미사용 raw HTML
  - `services/authService.js:437 notifyAdminNewSignup` (이번 운영 사건의 템플릿)
  - `routes/public.js:356` 문의 답변
- **수정**: 둘 다 `bodyContent` 만 구성 → `emailLayout(bodyContent)` 로 래핑. `sendPlatformEmail` 이 `cid:purplehere-logo` 자동 감지 → `getLogoAttachment()` 로 로고 CID 첨부
- **검증**: 테스트 이메일 실발송 → 신규 템플릿 렌더링 확인 (액센트 바 + 로고 + preferences footer). 다른 모든 email 발송 사이트 감사 — 모두 `emailLayout()` 기반 정상

### POST /api/restaurants 역할 가드 보강 (HIGH 보안 갭)
- **증상**: `POST /api/restaurants` 에 `requireRole` 미들웨어 없음. `validateBrandPermission` 은 brand_id 파라미터가 있을 때만 작동하므로 Restaurant Admin/Staff/Customer 가 brand_id 생략하고 호출하면 restaurant 생성 가능
- **수정**: `restaurants-crud.js:638` 에 `requireRole('System Admin', 'Brand General', 'Brand Manager', 'Foodcourt General', 'Foodcourt Manager', 'Restaurant Owner')` 명시 추가. 회원가입 흐름은 `authService.js:193 Restaurant.create` 직접 호출이므로 이 endpoint 미경유 — 영향 없음
- **영구 안전망**: `scripts/health-check.js` 에 "Restaurant Admin POST /restaurants → 403 (역할 가드)" regression test 추가 (39 → 40)
- **검증**: 8개 역할 매트릭스 — 6 allow + 2 BLOCK. Attack 시나리오 — Restaurant Admin 가 POST 시도 → 403, DB 에 생성 안 됨. Write→Read 왕복 (System Admin) 201 → GET 200 확인

## 2026-04-13 배포 4 — Brand Cross-Tenant 누수 fix (치명 보안, 버전 미상승)

### Brand General 격리 (운영 발견 누수)
- **증상**: BG 사용자가 다른 BG 소유 재료/공급업체/상품을 조회/수정 가능 (`/pos/brand-ingredients`, `/pos/suppliers`)
- **모델 정립**: 한 BG가 여러 brand를 소유 (`brands.owner_id`). 재료/공급업체/BG 프로덕트는 BG 소유자 단위 공유. 레시피는 브랜드별 사용
- **DB 변경**: 7개 BG-level 테이블에 `owner_user_id` 컬럼 추가 (`product_ingredients`, `product_ingredient_categories`, `suppliers`, `brand_products`, `brand_product_categories`, `brand_product_option_groups`, `brand_product_options`). 2개 brand-level 테이블에 `brand_id` 컬럼 추가 (`product_recipes`, `product_recipe_categories`)
- **운영 백필**: 기존 N:M 조인(`brand_product_brands`, `supplier_brands`) + 레시피→재료 추적으로 자동 백필. 한국 음식 K-DINE 시리즈 고아 데이터(재료 7건, 카테고리 4건, 레시피 2건, 공급업체 1건)는 K-DINE owner(user 23)에 수동 할당
- **신규 미들웨어** `middleware/brandScope.js`: `requireBGScope`/`applyBGFilter`/`assertBGOwnsRow` (BG 단위) + `requireBrandScope`/`applyBrandFilter`/`assertBrandOwnsRow` (브랜드 단위, `brands.owner_id` 검증)
- **라우트 패치 (6개)**: product-ingredients.js / product-ingredient-categories.js / product-recipes.js / product-recipe-categories.js / suppliers.js / brand-products.js — GET 필터 + POST owner 자동 세트 + PUT/DELETE 소유권 검증 (404 존재 은닉)
- **suppliers.js**: `|| supplier.connectedBrands.length === 0` 폴백 제거 (누수의 직접 원인). N:M `supplier_brands` 읽기 중단
- **`isBrandManager` free pass 제거**: URL에 brand_id가 없을 때 `Brand.count({where:{owner_id:user.id}})` 검증 (dangling BG 차단)
- **9개 모델** 업데이트 — owner_user_id 또는 brand_id 필드 추가
- **검증**: dev 21/21 격리 테스트 통과, health-check 39/39, 운영 smoke 10/10
- **운영 영향**: 배포 후 user 23(K-DINE)/user 24(K-Taste)/user 29(The Fire) 각각 본인 데이터만 표시. 교차 GET/PUT/DELETE 모두 404

### 이월 항목 (이전 [Unreleased])
- AddonModule 전체 역할 1:1 분리 (restaurant/brand/foodcourt/owner). 신규 8개 advanced 모듈: `work_manuals`, `ingredients`, `suppliers`, `brand_work_manuals`, `brand_ingredients`, `brand_suppliers`, `fc_work_manuals`, `owner_work_manuals`. dev + 운영 DB 직접 반영 (코드 변경 없음)
- `inventory_management` + `brand_inventory` 모듈 이름을 "Inventory & Supplier Management" → "Inventory"로 정리 (suppliers가 독립 모듈로 승격)
- 기존 플랜 자동 마이그레이션 없음 — System Admin이 `/pos/admin/plans`에서 수동 체크 필요

## 2026-04-13 배포 3 — 인보이스 안정화 + Dangling Admin 가드

### 인보이스 인쇄/PDF/View i18n + 레이아웃
- 인보이스 인쇄/PDF/View 모달의 i18n 키가 그대로 출력되던 버그 수정 (5개 역할)
- 인보이스 PDF가 1장에 잘리던 문제 해결 (다중 페이지 분할 + iframe 동적 높이)
- 인보이스 금액 RM이 줄바꿈되던 UI 깨짐 fix (`white-space: nowrap`)
- Pricing 페이지 탭별 URL 딥링크 (`/pricing?tab=brand` 등)

### 인보이스 정합성
- Payment Settings 변경 시 미결제 인보이스 자동 재계산 + "수정됨" 배지 자동 표시
- 시스템 자동 수정도 modification_history 기록 (수동 수정과 동일 UX)
- 인보이스 view 모달 크래시 fix (modification_history 이중 인코딩 + 양형식 호환 렌더러)
- Hardware 인보이스 QTY/단가 표시 정상화 (description "x4" → 별도 quantity 컬럼)
- Hardware Quote 모달 payment_settings 자동 로드
- 인보이스 삭제 시 hardware_quotes FK 해제 (500 에러 제거)

### Brand ↔ Restaurant 연결
- Brand General 레스토랑 생성/편집에 "Link to Brand" 드롭다운 신규 (브랜드-레스토랑 연결 UI)

### Dangling Restaurant Admin 가드 (치명)
- 백엔드 `POST /api/users`: role이 Restaurant Admin/Staff인데 restaurant_id 없이 생성 요청 시 400 차단
- 백엔드 `PUT /api/users/:id`: restaurant_id 클리어 또는 role 변경으로 dangling 상태 만드는 시도 차단
- 백엔드 `POST /api/users`: `skipVerification is not defined` ReferenceError 수정 (req.body destructure 누락)
- 프론트 `App.tsx`: `user.restaurantId || '1'` 하드코딩 폴백 제거 — dangling 사용자에게 `NoRestaurantAssigned` 에러 화면 렌더 (다른 테넌트 누수 차단)
- 프론트 `ProtectedRoute.tsx`: restaurant-scoped 역할이 restaurant_id 없이 `/restaurant/:id/*` 접근 시 `/pos`로 바운스. `|| '1'` 폴백 4건 모두 제거
- 프론트 `LoginPage.tsx` / `OperationInquiryPage.tsx`: 하드코딩 폴백 정리

## 2026-04-13 배포 2 (v3.13 유지 — 회계/인보이스 정합성 복구)

### Payment settings → Invoice additional_charges 자동 적용 (치명)
- fix(services/subscriptionInvoiceService.js): 기존엔 tax 6% 하드코딩이었는데, 이제 `SystemSettings.payment_settings.additionalCharges[currency]`에서 조회해 적용. enabled=true + rate>0 인 charge만 필터. 각 charge를 `{name, rate, amount}` JSON으로 `invoices.additional_charges` 컬럼에 저장
- fix: `invoices` 테이블의 `total_amount`가 base + 모든 charge 합으로 정확히 계산됨 (이전엔 6% 고정이라 SST 이외의 service charge 등이 누락)
- fix(syncPendingInvoice): 비교 로직에 `additional_charges` 포함. total_amount는 같아도 charges JSON이 다르면 업데이트 수행

### A 방안: Activate Subscription 토글 (하드웨어 전용 고객 대응)
- feat(restaurants-crud.js POST): `activate_subscription` 플래그 수용. false면 `createInitialInvoice` 호출 skip
- feat(Admin/RestaurantsPage 생성 모달): "Activate subscription now" 체크박스 추가. 기본 ON (backward compat). OFF 시 주황 배경 + 경고 텍스트 "No subscription invoice will be generated"
- 유스케이스: 하드웨어만 주문한 고객 / 플레이스홀더 계정 / 파트너 셋업 등 — 구독 결정 전까지 인보이스 미발행. 나중에 PUT으로 플랜 변경 시 자동 동기화 (no_pending → createInitialInvoice 전환)

### Unknown Restaurant 표시 제거
- fix(routes/invoices-main.js): customerName/customerCompany/payerName/restaurantName 전부 폴백 체인 변경. `restaurant?.name → external_payer_company → external_payer_name → '—'`. "Unknown Restaurant" 텍스트 완전 제거

### 운영 DB 인보이스 정비
- chore: INV-2025110001 (Sunway Pyramid Basic Annual) — additional_charges=[{SST, 6, 29.40}] 수동 추가
- chore: INV-2025110002 (KFC Professional Monthly) — additional_charges=[{SST, 6, 5.94}] 수동 추가
- INV-2026040001 (Enterprise)는 이미 정상 (189.74 + SST 10.74)

### 선행 이슈 기록 (다음 세션)
- `POST /api/restaurants`에 `requireRole` 없음. Staff/Brand Manager도 restaurant 생성 가능한 보안 갭. DEVELOPMENT_PLAN.md에 HIGH로 기록

## 2026-04-13 배포 (v3.13 유지 — 시스템관리자 버그 수정 위주)

### 구독 플랜 한도 시스템 정합성
- fix(users.js POST): Staff / Restaurant Admin 생성 시 `staff_limit` 체크 로직 추가. 초과 시 403 + `{limit, current, upgradeRequired}` 반환. 이전엔 플랜 한도 무시하고 무제한 생성 가능했음 (치명)
- fix(subscriptions.js): Downgrade 검증에 `order_limit` 체크 추가. 기존엔 staff/menu만 체크 → Professional→Basic 같은 다운그레이드 시 월 주문 한도 위반해도 통과하던 버그
- feat(Profile/SubscriptionTab): 플랜 사용량 섹션 신규. Staff / Menu Items / Orders (this month) 3개 카드 + 진행바. 80% 접근 시 주황 경고 배너, 100% 도달 시 빨강 차단 배너 자동. 이전엔 백엔드가 `current_usage` 반환하는데 프론트가 렌더 안 함
- fix(Profile/SubscriptionTab): Unlimited 플랜(`-1`) 처리 추가 — "Unlimited" 텍스트 표시, 진행바 숨김

### 사용자/매니저 검색 수정
- fix(users.js GET): `?search=` 파라미터 지원 추가. `%term%` LIKE substring 매칭으로 중간글자 검색 가능. 이전엔 param이 무시되어 프론트가 전체 목록을 받고 `slice(0,20)`으로 잘라서 알파벳 순 상위 20명만 보이던 버그 — Hardware Quote 등에서 Restaurant Admin 검색이 작동 안 하던 근본 원인
- fix(users.js GET): `?q=` 파라미터도 backward compat로 수용

### Hardware Quote → Link Restaurant Admin 전용
- feat(Admin/HardwareQuotesPage): "Link User" → "Link Restaurant Admin" 이름 변경. 하드웨어 인보이스가 레스토랑 관리자에게 청구되므로 역할 명확화
- feat(Admin/HardwareQuotesPage): 검색 쿼리에 `role=Restaurant Admin` 필터 추가 + client-side 이중 필터 방어. 다른 역할(Manager, Staff 등) 노출 차단
- feat(Admin/HardwareQuotesPage): 모달 내부에 설명 텍스트 추가 ("Only Restaurant Admins are shown — hardware invoices are billed to the restaurant admin")
- feat(Admin/HardwareQuotesPage): 검색 결과 없음 메시지 명확화 ("No Restaurant Admin found matching your search")

### 공지 Updates 카테고리 UI
- feat(NoticesPage x5 — Admin/Brand/Foodcourt/Owner/Restaurant): 카테고리 필터 탭에 `Updates` 추가. 이전엔 백엔드 Notice.category ENUM에 'updates' 있는데 프론트 타입/필터/라벨이 'general'/'guide' 만 하드코딩되어 Updates 카테고리 공지(v3.0.1~v3.13 릴리즈 노트 12건 포함)가 탭에서 필터링되지 않던 문제

## [v3.13] — 2026-04-12 배포 (구독/인보이스 시스템 정합성 복구 + 업무매뉴얼/News 신규)

### 구독/인보이스 정합성 복구 (치명 버그 수정)
- fix(users.js POST): Brand General / Foodcourt General 유저 생성 시 구독 필드(plan_type, plan_amount, billing_cycle, subscription_start/end, trial_end_date 등)가 저장 안 되던 버그. role 체크가 'Restaurant Owner' 만 되어 있어 Brand General/Foodcourt General은 프론트에서 보낸 구독 정보가 무시됨. 이게 프로덕션에 Brand/Foodcourt 인보이스 0건인 근본 원인
- fix(users.js POST): Restaurant Owner 구독의 `calcSubscriptionEnd` 변수가 정의 안 되어 `subscription_end`가 `undefined` 저장되던 버그
- fix(users.js POST): `subscription_status` 논리 오류 — `subscription_start ? 'active' : 'trial'` 이 아니라 "start가 미래면 trial, 오늘/과거면 active"로 수정
- feat(users.js POST): Brand General / Foodcourt General / Restaurant Owner 생성 시 첫 구독 인보이스 자동 발행 (레스토랑 생성과 동일 패턴)
- feat(users.js PUT): 구독 필드 변경 시 미결제 인보이스 자동 동기화. 미결제 인보이스 없으면 신규 생성
- feat(restaurants-crud.js PUT): 구독 필드 변경 시 미결제 인보이스 자동 동기화. 결제된 인보이스는 절대 건드리지 않음 (`status IN ('draft','pending_payment','overdue')` 필터)
- fix(invoiceScheduler.js `isTodayAdvanceOf`): 정확히 14일 전인 날에만 true 반환하던 1일 창문 브리틀니스. Catch-up 모드(`today >= generationDate`)로 전환. cron 하루 실패해도 다음날 발행됨. 중복 방지는 기존 `billing_period_start` 체크로 보장

### 리팩토링 — 공용 인보이스 헬퍼
- refactor(services/subscriptionInvoiceService.js 신규): Restaurant/User 공용 `createInitialInvoice(subject)` + `syncPendingInvoice(subject)`. 기존 `routes/restaurants-crud.js` 의 인보이스 생성 로직을 헬퍼로 교체. `invoice.modification_history` JSON에 before/after/reason 감사 추적 기록
- refactor(utils/subscriptionDates.ts 신규): `calcEndDate`, `deriveStatus`, `calcTrialEnd`, `formatDateISO`, `parseDateLocal` 공용 날짜 함수

### 레스토랑/매니저 등록 UI
- feat(Admin/RestaurantsPage): End Date 필드 readonly 전환 (자동 계산, 회색 배경). Start Date 변경 시 `+1개월-1일`(Monthly) 또는 `+1년-1일`(Annual) 자동 재계산
- feat(Admin/RestaurantsPage): Billing Cycle 변경 시 End Date 즉시 재계산
- feat(Admin/RestaurantsPage): "Apply 7-Day Free Trial" 체크박스 → "Treat as trial until subscription starts"로 일반화. 7일 하드코드 제거. Start Date가 미래면 그 기간이 자동으로 트라이얼 (20일/30일/자유)
- feat(Admin/ManagersPage): `calcSubscriptionEnd` 함수에 `-1일` 규칙 적용 (기존: +1개월, 수정: +1개월-1일)
- fix(Admin/RestaurantsPage 편집 모달): 트라이얼 체크박스 신규 추가 (기존에는 편집 시 변경 불가였음)

### 업무매뉴얼 (신규 기능)
- feat: 5개 역할(Admin/Brand/Foodcourt/Owner/Restaurant) 전용 업무매뉴얼 메뉴 추가. 블로그 형식 카드 그리드 + 상세 모달 + 댓글
- feat: 스코프별 격리 (System=company-wide, Brand=brand_id, Foodcourt=foodcourt_id, Restaurant Admin/Staff=restaurant_id, Owner=per-restaurant 선택)
- feat: 사용자 자체 카테고리 CRUD (100% 자율 관리)
- feat: 공지 guide 카테고리 상세 모달에 "업무매뉴얼로 보내기" 버튼 — 타역할 가이드를 복사해 자기 스코프로 가져오기
- feat: 매뉴얼 간 복사 기능 (Owner는 대상 레스토랑 선택 가능)
- model: `WorkManual`, `WorkManualCategory` 신규. `Comment.entity_type` ENUM에 `work_manual` 추가

### 랜딩 페이지 News 메뉴 (신규)
- feat: 상단 GNB에 `Setup Quote` 제거 → `News` 추가 (4개 언어 번역 포함)
- feat: `/news` 페이지 신규 — 블로그와 동일 구조, 카테고리 탭 `All / Product News / Updates`
- feat: `GET /api/contents/public/news` 엔드포인트 — Product News + Updates 카테고리만 반환
- refactor: `GET /api/contents/public/blog` — Product News/Updates 카테고리 제외
- fix: 두 엔드포인트 모두 **포스트가 있는 카테고리만** 반환 (빈 카테고리 숨김)
- feat: `BlogPostPage`가 `/news/:slug` 도 처리 — 경로로 back 버튼 목적지 분기 (/blog vs /news)

### 릴리즈 콘텐츠 자동 등록 인프라
- feat: `scripts/create-release-post.js` 신규 — 배포 시 JSON을 입력받아 (1) 랜딩 블로그 포스트(영어, ContentCategory=updates) + (2) System Admin 공지(영어+한글 이중언어, Notice.category=updates, target_type=all) 동시 생성. `--sync-prod` 플래그로 SSH 운영 DB 자동 동기화
- model: `Notice.category` ENUM에 `updates` 추가 (dev + prod 둘 다 동기화)
- chore: 운영 DB 기존 릴리즈 공지 12개(v3.0.1~v3.12)를 `general` → `updates` 카테고리로 마이그레이션
- chore: 운영 DB 기존 릴리즈 공지 12개의 영어 섹션만 추출하여 `contents` 테이블에 `release-v{version}` slug로 블로그 포스트 생성
- docs: `/배포` 스킬 문서에 "릴리즈 콘텐츠 자동 등록" 섹션 추가

### 자동저장 정리 (SettingsPage)
- fix: `brands` / `billing` 탭에서 의미 없는 "Save Changes" 버튼 4곳 제거. 두 탭 모두 편집 가능 필드가 없는 표시 전용이라 Save 버튼이 혼란만 줬음. 실제 편집 가능한 모든 설정은 `AutoSaveField`로 자동저장 동작 확인 완료

### UI 수정
- fix: `Admin/ContactInquiriesPage` 헤더 높이가 공통 `PageComponents.Header` (56px)와 달라서 다른 페이지와 정렬 안 맞던 문제 수정

### i18n
- fix: `i18next-http-backend` 캐시버스트 추가 — 페이지 로드 시 `/locales/{lng}/{ns}.json?v={timestamp}` 쿼리 파라미터. 번역 키 추가 시 사용자가 수동 캐시 클리어 없이 반영됨 (ETag 유지로 내용 미변경 시 304)
- feat: `common.json`에 `nav.workManuals` 4개 언어 추가 (en/ko/zh/ms)
- feat: `landing.json`에 `nav.news` 4개 언어 추가

## 2026-04-11 배포 (v3.12 유지 — 버그 수정 및 UI 조정 위주)

### notices 데모/테스트 제외 + admin 하드웨어 max_quantity 무제한 + /packages Quote 모달 수정 + External QR + inventory adjust fix

- fix(notices): 관리자 공지 이메일 발송 시 `is_demo=true`/`is_test=true` 계정 제외. broadcast 4개 target(all/role/brand/foodcourt)의 recipient 생성 로직에서 User/Restaurant 양쪽 필터. `select_restaurants`(명시 선택)는 관리자 의도 존중 — `routes/notices.js`
- fix(admin/system-products): Hardware Package 편집 모달의 addon Max 입력 필드에서 `0`(무제한) 설정 불가하던 버그. (1) loader `|| 1`이 기존 `max_quantity=0` 값을 로드 시 1로 변조하던 핵심 버그를 `?? 0`으로 수정, (2) 신규 addon 기본값 `1 → 0`, (3) input `min="1" → "0"`, `|| 1 → || 0`, (4) `(0 = unlimited)` 힌트 문구 추가 — `SystemProductManagementPage.tsx`
- chore(db): 운영 DB `system_product_addons.max_quantity=1`인 108건을 `0`(무제한)으로 일괄 UPDATE. 12건(max_quantity=5)은 유지. 백업 `/var/www/backups/system_product_addons_20260411_175650.sql`. 운영 /packages 에서 Additional Equipment 1개만 추가되던 증상 해소
- feat(packages): Request a Quote 모달 Quote Summary에 소프트웨어 구독 라인 신규. 플랜명 + 청구주기 (monthly/annual) + 가격 + "Billed separately from hardware (recurring invoice)" 안내. 하드웨어 총액은 one-time 그대로, 구독은 dashed divider 아래 별도 섹션. 체크박스 해제/플랜/가격 없을 때 숨김 가드 — `PackagesPage.tsx` + `locales/{en,ko,zh,ms}/landing.json` (2 keys × 4 lang)
- fix(packages): Request a Quote 모달 레이아웃/z-index 수정. (1) z-index `200 → 10000` — Landing 헤더(1000) 뒤로 숨던 문제, (2) ModalContent `max-height: calc(100vh - 40px)` + flex column, (3) ModalTitle `flex-shrink:0` 상단 고정, (4) ModalForm `overflow-y: auto` 중앙만 스크롤, (5) ModalButtonRow `position: sticky; bottom:0` 하단 고정, (6) 모바일(≤640px) 풀스크린. 타이틀/버튼이 스크롤로 사라지던 문제 해소
- fix(admin/payment-settings): `GET/POST /api/admin/payment-settings` 응답을 `{success, data}` 표준으로 래핑. 에러 응답도 `{success:false, message}`로 정규화. 프론트에 legacy flat/새 래핑 둘 다 수용하는 defensive 언랩 — `admin-payment-settings.js`, `Admin/PaymentSettingsPage.tsx`

### 2026-04-11 (External QR + inventory adjust fix + hydration 검증 자동화)
- feat(settings): External QR 카드 신규 — Operations 탭에 커스텀 이름 QR 생성 섹션 추가. 파트너 가게, 호텔 로비, 사무실 등 외부 지점에 주는 QR. 이름(최대 20자) 입력 → SVG/PNG/Print/삭제. 손님이 스캔 시 모바일 메뉴 진입, 주문의 `table_number` 컬럼에 이름 그대로 저장(내부 테이블 QR과 동일 경로). 저장 위치: `table_settings.externalQRs: string[]` — DB 마이그레이션/백엔드 변경 0건
- fix(settings): External QR 카드 좌우 풀폭 — `gridColumn: 1 / -1`로 2열 SettingsGrid에서 한 행 통째 사용. 생성된 QR들은 `TablesGrid auto-fill minmax(180px, 1fr)`로 가로 wrap
- fix(mobile): OrderTypePage의 `Table {tableFromQR}` 하드코딩 제거 — 내부(`T001`)에선 prefix 중복이었고 외부(`Cafe Maru`)에선 어색했음. 이제 값 그대로 표시
- fix(settings): External QR runtime crash 수정 — legacy `localStorage.tableSettings` 캐시에 `externalQRs` 필드가 없어서 `setTableSettings(parsedSettings)` 로 통째 덮어쓰면서 `undefined.length` 접근. 함수형 업데이트 + 기본값 머지로 전환, JSX 5개 접근 모두 `(... || [])` 가드
- fix(inventory): `POST /api/restaurants/:id/inventory/adjust` 라우트가 `quantity`(incremental delta)만 받아서 프론트 인라인 편집(`new_quantity` absolute 전달)이 작동 안 함. 두 파라미터 모두 수용하도록 수정 (new_quantity 우선, 없으면 quantity 폴백, new_quantity=0 정상 처리). General Stock은 별도 라우트라 이미 정상이었음. long-standing 버그
- chore(검증): `/검증` 스킬 0단계 신규 — `dev-frontend/scripts/state-hydration-check.js` 정적 분석 스크립트. 새 state field 추가 시 legacy hydration source(localStorage/JSON.parse/fetch)에서 defensive merge 안 하면 warning, JSX에서 `.length`/`.map`/`.filter` 접근 시 `(... || [])` / `?.` 가드 없으면 warning. 위 External QR 버그를 자동 차단 가능. npm run check:hydration으로 실행

### 2026-04-11 (Phase C-6 + UX 정리 + repo hygiene)
- refactor(C-6): `components/Inventory/InventoryManager.tsx` 3141줄 → 26개 파일로 분할 (types/styles/utils + 11 hooks + 3 sections + 9 modals + 슬림 main 340줄). 공개 API 불변(`<InventoryManager mode restaurantId />`) — 2개 consumer 무수정. 패턴: hook = state+API capsule, mode 분기는 hook 내부에만, Add+Edit는 mode prop으로 통합
- fix(Inventory): 대시보드 카드 5 → 4 (Expiring Soon 제거 — 아래 Expiring Items 섹션과 중복)
- fix(Inventory): 9개 모달 모두 표준 `Modal footer={...}` prop 사용 → ButtonGroup이 body 안에 있어 본문 길어지면 사라지던 문제 해결, sticky footer + border-top
- fix(Inventory): 테이블 반응형 정렬 깨짐 — `& > div:nth-child(N)`은 MobileGrid의 `display: contents` 때문에 grandchildren에 도달 못 함. 클래스 기반(`.col-min`, `.col-cost`, `.col-supplier`, `.col-last`) 셀렉터로 교체. 1280px 미만에서 5컬럼으로 줄이고 Actions 컬럼 폭 160px → 260px로 4개 액션 버튼이 한 줄에 나란히
- fix(Inventory): 버튼에서 `+` prefix 제거 (Receive Stock / Record Waste / Add General Stock)
- fix(StatsGrid): 15개 페이지의 로컬 StatsGrid styled-component 표준화. 모두 `repeat(4,1fr) → ≤1024px repeat(2,1fr) → ≤768px repeat(2,1fr)` 패턴. 이전엔 12개가 `auto-fit minmax(200px,1fr)`로 모바일에서 1열로 무너지거나, AddonModulesPage는 ≤640px에서 명시적 1열이었음. 영향 페이지: Admin/{AddonModules,ContactInquiries,HardwareQuotes,RestaurantSubscriptions}, Brand/Foodcourt/Owner/Manager/Restaurant 5종 OperationInquiry, Manager/{Invoices,ManagerPromotions,ManagerSubscriptions,Sales,Subscriptions}, Owner/Notices
- chore(repo): `dev-frontend/public/static/`(4 파일) + `dev-frontend/nginx-build/`(138 파일) git untrack — Auto-commit이 잡아간 옛 빌드 산출물. CRA가 `public/`을 빌드에 그대로 복사하기 때문에 매 빌드마다 옛 main.js 해시가 함께 들어와 brower cache miss 시 ChunkLoadError 유발했음. 이제 단일 main.js만 출력
- chore(repo): `dev-frontend-build/` (495 파일) git untrack — 로컬 nginx 서빙 디렉토리. 매 빌드마다 거대 diff를 생성하던 hygiene 이슈. 디렉토리는 디스크에 남아 nginx 서빙 정상

### 2026-04-10 (저녁 — Phase C 구조 개선)
- refactor(C-3): Fetch 인터셉터 단일화 — `utils/httpClient.ts` 추출, `index.tsx` 시작 시 1회만 설치. `AuthContext`의 이중 fetch 패치 제거 → StrictMode/HMR 인터셉터 누락/중복 위험 해소
- refactor(C-4): `CustomerContext` 내부 분할 — `useMobileCustomerState` + `usePosCustomersState` + composite provider. 공개 API 불변으로 10개 consumer 수정 없음
- fix(C-4): 모바일 로그인 세션이 레스토랑 간 공유되던 버그 — localStorage 키를 slug별로 분리 (`mobile_customer:<slug>`, `mobile_token:<slug>`). SPA 네비게이션 시 `history.pushState` 패치로 `locationchange` 이벤트 발생 → 즉시 상태 재로드. 레거시(스코프 없는) 세션은 첫 로드 시 자동 정리
- refactor(C-5): 백엔드 5개 거대 라우트 파일 → 16개로 기능별 분할
  - `routes/customers.js` 1263 → barrel + self/admin/auth 3개
  - `routes/mobile.js` 1304 → barrel + helpers + public/orders 2개
  - `routes/orders.js` 2140 → barrel + crud/views/payment 3개
  - `routes/restaurants.js` 2204 → barrel + subscription/crud/ingredients 3개
  - `routes/invoices.js` 3170 → barrel + helpers + main/payment 2개 (routes/owner.js 호환 위해 getIssuerCompanyInfo/getPayerCompanyInfo 배럴 re-export)
- fix: `mobile-public.js`에서 `Order` import 누락 → `GET /popular/:slug` 500 에러 수정 (분할 회귀)
- chore: 63개 백엔드/셸 스크립트의 상태 이모지 ✅/❌ → 텍스트 문자 ✓/✗ 일괄 치환 (터미널 가독성)

### 🐛 추가 버그 수정 (2026-04-10 오후)
- fix: 모바일 메뉴 로딩 속도 개선 — `MenuPage.tsx` init 흐름 개편. 백그라운드 `limit=500` 전체 메뉴 호출 제거, 검색용 전체 메뉴는 검색창 포커스/입력 시 lazy load. 첫 호출 `limit=1`로 카테고리만 빠르게 받기
- fix: 모바일 AccountPage My Coupons에 본인 것이 아닌 매장 전체 공개 쿠폰까지 모두 표시되던 버그 — `routes/coupons.js` 응답을 `myCoupons`(명시적 타겟)/`promotions`(전체공개)/`available`(호환) 3개로 분리. AccountPage는 `myCoupons`만 표시
- fix: 모바일 멤버십 비활성 매장에서 points UI 숨김 — `AccountPage` `pointsEnabled` 기본값 `false`로 변경 (깜빡임 방지), `PaymentPage` 비회원 결제 폼의 "Register as a Member" 체크박스를 `membershipSettings?.is_active` 조건부로 변경
- fix: `routes/coupons.js GET /customer/:customerId` dual auth 적용 — POS Admin 또는 모바일 customer 본인 (IDOR 방어 포함)

### 🛡 보안 정석화 (Phase A)
- 익명 고객 DB 덤프/삭제/비밀번호 변경 차단 (`routes/customers.js` 라우트별 인증 정책)
- 모바일 주문 IDOR 차단 (`routes/mobile.js` GET /orders restaurant_id 필수)
- 결제 라우트 위변조 방어 — 30분 시간 윈도우 + 중복결제 방지 + PayPal orderId 검증 (`routes/orders.js`)
- inventory IDOR 차단 (`routes/inventory-routes.js` checkRestaurantAccess 적용)
- 사업자등록번호/은행계좌 무인증 노출 차단 (`routes/restaurants.js`)
- addon-modules GET 인증 추가
- 모바일 고객 JWT 시스템 신규 — `utils/customerJwt.js`, `middleware/customerAuth.js`
- POST /customers/auth, /register이 customer 토큰 발급
- 모바일 자가서비스 라우트 IDOR 방어 (`requireCustomerSelf`)
- 모바일 페이지에 `mobileFetch` 헬퍼 + `mobile_token` 분리 저장
- POS 관리자와 모바일 고객 세션 완전 분리

### 🔧 안정화 인프라 (Phase D)
- Sentry 에러 추적 도입 (프론트엔드 + 백엔드)
- 환경 자동 감지 (production/development), component 태그로 프론트/백 구분
- AuthContext 4곳에 user context 동기화 (login/checkSession/logout/switchUser)
- 백엔드 admin/customer 미들웨어 user context 자동 첨부
- 민감정보 자동 마스킹 (password, token, Authorization, cookie)
- ErrorBoundary 폴백 UI ("Try again" 버튼)
- Health-check 스크립트 신규 (`dev-backend/scripts/health-check.js`)
- 5개 카테고리 / 39개 자동 테스트 (auth/security/pos/mobile/payment)
- CLI 옵션 (--category, --quiet, --host, --verbose)
- CLAUDE.md에 검증 단계 마지막에 health-check 필수 실행 규칙 추가

### 🐛 깨진 기능 복구 (Phase B)
- fix: Activity Log Stats 500 에러 — `routes/activityLogs.js` sequelize 구조분해 import 누락 수정
- fix: NotificationSettings 잘못된 token 키 (`'token'` → `'auth_token'`) 3곳
- fix: POS 결제 모달 포인트 사용 UI 미노출 — PaymentModal에 `selectedCustomerId` prop 추가, 회원 선택 시 0 pts여도 적립 안내 표시
- fix: **인쇄 다이얼로그 이중 트리거** — `printHTMLContent`의 `iframe.onload`가 두 번 트리거되어 print 다이얼로그가 2번 큐잉되던 문제. 취소 시 두 번째가 즉시 표시되어 "취소해도 또 뜬다" 증상. doc.close() 직후 setTimeout 단일 호출 + hasPrinted flag로 해결. POS 결제/Bill/Kitchen/Settlement/Table QR 등 8개 인쇄 흐름 전체 영향.

---

## [v3.12] — 2026-04-09 배포
- Franchise & Tenancy Management Phase 1 구현 (DB 모델 7개, API 20개, 프론트 Pipeline/List/Detail)
- ContractManagementPage UI 개선: StatCard 색상 분리, ViewToggle 연회색, DatePeriodFilter 통합
- ContractPipeline 카드 정보 보강 (이름/전화/위치/타입/기간/진행률)
- ContractDetail 레이아웃 전체폭, 입력란 width:100%
- 레스토랑 연결 섹션 추가 (검색→선택→연결/해제)
- Notes → CommentSection 교체 (파일첨부, 읽음표시 통합)
- Document 업로드/다운로드/삭제 기능 (upload/files API 활용)
- 통합검색 서버사이드 전환 (코멘트 내용 포함 검색)
- URL 기반 상태 유지 (view/id → 새로고침 시 화면 유지)
- Settings 3개 페이지 AutoSaveField 적용 (InvoiceSettings, CompanySettings, CompanyProfile)
- AutoSaveField 아이콘 위치 점프 수정 + 즉시 spinner 반응
- Owner Plan 매니저 설정 필터 버그 수정
- Comment/CommentRead ENUM에 'contract' 추가
- CHANGELOG 시스템 도입
- fix: 프린터 설정 저장 안 되는 버그 수정 (store.js allowedFields에 printer_settings 누락)
- fix: ImageUploadDropzone 자동저장 안정화 (수동 triggerSave 추가)
- fix: 브라우저 간 설정 불일치 수정 (StoreContext auth-ready 이벤트 재로드)
- fix: LiveOrders 빌프린트 미리보기/출력 로고 누락 수정
- fix: StoreContext 기본값 'FOODCOURT CENTRAL' 제거
- fix: AuthProvider > StoreProvider 구조 변경 (모든 기기에서 설정 로드 안정화)
- fix: 영수증 인쇄 시 로고/멤버십QR/커스텀QR/푸터 누락 수정 (React state 직접 전달)
- fix: 멤버십 QR URL `/m/{id}` → `/mobile/{slug}/account` (올바른 프로필 페이지로 연결)
- fix: 영수증 QR 아래 불필요한 URL 텍스트 삭제
- fix: 멤버십 QR 외부 API 의존 제거 → 로컬 생성 (QRCode.toDataURL)
- fix: getStoreInfo()에 receiptSettings/slug/membershipQR 통합 (모든 인쇄 경로 통일)
- fix: QR Code Mode (Static/Session) 자동저장 안 되는 버그 수정
- fix: FloorPlan Print QR이 브라우저 인쇄 모드를 무시하던 버그 수정
- fix: Table QR 프린트 레이아웃 개선 + @page margin:0 + 시간/만료 표시 + 타임존 적용
- fix: QR Code Mode AutoSaveField 개별 라디오 감싸기 (클릭한 항목에 아이콘)
- fix: StoreContext URL 레스토랑 ID 변경 감지 (다른 레스토랑 데이터 혼재 방지)
- CLAUDE.md 타임존 규칙 추가, UI_DESIGN_GUIDE.md AutoSaveField 필수 규칙 추가

---

## [v3.10] — 2026-04-07 배포
- v3.10 다국어 시스템 (i18n) — 4개 언어 지원 (EN/KO/ZH/MS)
- react-i18next 인프라 + 용어집 + 검증 스크립트
- User.preferred_language + 언어 변경 API
- 160개 페이지 t() 래핑, 4,698키 x 4개 언어
- 언어 선택 UI (Landing globe, POS sidebar, Mobile, Login)
- 이메일 템플릿 다국어
