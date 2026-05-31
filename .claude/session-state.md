# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-31 (The Fire 영업 critical 대응일 — 저장 후 마무리)
**버전:** v3.45 운영 (오늘은 emergency 핫픽스 — 버전 미변경)
**작업 상태:** 완료 (세션 마무리)

The Fire(restaurant 16) 종일 실매출 중 연쇄 이슈 대응. 핫픽스 다수 운영 배포 + **설정 소실 사고 복구 완료.**

### 진행 중인 작업
- 없음 (세션 마무리)

### 완료된 작업 (이번 세션, 운영 배포)
- **빈 빌/결제 크래시** — PaymentModal `liveTotalOverride` TDZ(선언 전 참조) → 결제팝업·POS 크래시. 선언 위로 이동. (교훈: build/smoke 통과≠runtime 안전, critical 페이지 mount검증 필수)
- **빌 toFixed 크래시** — POSTerminal completedOrderData가 savedOrder DECIMAL **문자열** 전달 → `subtotal.toFixed is not a function`. parseFloat 코어싱 (🔒 POSTerminal bless).
- **KDS pending↔ready 역행 복귀** — order-updated가 오래된 echo 무조건 덮어씀. updatedAt monotonic guard 4곳 (🔒 KDS bless).
- **LiveOrders 재연결 재동기화** — connect 시 fetchOrders + 30초 폴링(끊긴 사이 주문 누락 방지).
- **Leave 버튼 비파괴** — table_number=null 파괴 → `table_cleared` 플래그(번호 보존), table-status 제외. 모델+DB컬럼(dev/운영)+restaurants-crud.
- **clearTableOnPayment** The Fire ON(운영 DB 직접). **T-7→T-13 고객 이동**(직접).
- 모바일 무테이블 생성가드 정상 확인(활성 무테이블 0).
- **설정 소실 복구** — 3am 백업서 printer_settings(POS-80C+KITCHEN/KITCHEN2/BAR 3스테이션+autoPrint)+payment_settings(8) 복원. end-to-end 검증(기기 localStorage 동기화 OK, 앱 에러0). ⚠️ 실프린터 종이=매장 새로고침+테스트 필요(Irene 원격 미확인).
- 복구불가: 오늘 Leave로 날아간 테이블번호 19건(덤프에 없음, binlog 권한없음).

### 다음 확정 작업
- **[CRITICAL] 설정 저장 빈값 덮어쓰기 백엔드 가드** — 오늘 설정 소실 사고 영구 차단. restaurants 설정 저장 시 이미 값 있는 printer_settings/payment_settings를 빈값/기본값으로 덮어쓰는 요청 거부(또는 merge). 인쇄무관·비보호. 상세: memory `project_thefire_settings_wipe`. (Irene이 "다신 일어나면 안돼"로 영구해결 강조 → 최우선)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- 설정 저장 merge + hydration 완료 전 저장 금지 ("계속 로딩" 동반)
- 오더티켓 2장 중복 인쇄 — 부모창+iframe POS overlay의 poller 동시 인쇄(inflight dedup이 iframe 경계 못 넘음, print-then-mark). **Irene 답 대기: "플로어플랜→POS 진입 시"냐 "모든 주문"이냐** → 한쪽 poller만. 🔒+실프린터.
- POS UI 정비: Dine In/Takeaway 버튼 높이=좌측헤더 / 고객검색+테이블번호 밀착·간격축소 / 카테고리탭 전체영역 클릭 / "더 POS답게"
- 플로어플랜 하단 통계 "여전히 안나온다" 재진단
- 테이블별 "오늘 주문" 탭(완료 포함, 신규주문과 구분) — 백엔드 clearTableOnPayment는 됨, UI 미구현

### Irene 실물 확인 대기 (매장 방문/원격 새로고침)
- 결제완료 빌 1장 출력 / 오더티켓 옵션+요청사항 표기 / 복원된 프린터·결제설정(POS 새로고침 후 테스트)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
