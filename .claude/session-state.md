# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-06-04
**버전:** v3.46 운영 (이번 세션 인쇄/세트 핫픽스 다회 배포 — 버전 미상승, Irene 결정 보류)
**작업 상태:** 완료 (운영 배포 다회 — 인쇄 파이프라인 + POS 세트 캡처 대수정)

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션, 2026-06-04 — 전부 운영 배포)
- **POS 세트 캡처 근본수정:** `isV2Set`가 메뉴 LIST set_groups 유무 게이트(lazy 로드/머지 dedup 누락 시 레거시 전체확장) → **세트면 무조건 POSSetModal 개방**(모달이 `/api/menu/product/:id` set_groups_resolved 직접 fetch). 고른 구성품+옵션만 정확 저장(모바일 동등, 한국녹차 포함). 백엔드는 올바른 payload면 그대로 저장 검증됨.
- **인쇄 단일소스화:** 새 주문 POS 직접인쇄(장바구니) 제거 → poller 단일(백엔드 enriched=테이블이동과 동일). 2장중복/내용차이/SET5만 해소. + cross-realm poke(storage 이벤트)로 인쇄기기 즉시 발행(첫 티켓 지연 해소).
- **스테이션 발행 누락 근본수정:** `sendToRawBTPrinter`가 sendHTMLViaQZTray 실패(false) 삼키고 true 반환 → 마지막 스테이션 누락. 실제 결과 반환 + 실패 시 카운터 폴백 + POS 배너.
- **수동 오더티켓 통일:** LiveOrders(3)+FloorPlan(2) 재발행 printOrderTicketToBillPrinter → printKitchenTicketViaRawBT enriched.
- **취소표 폰트/줄긋기:** OS드라이버엔 HTML pixel(같은 폰트+line-through), LAN IP만 raw.
- **자동/수동 발행 정의 + 백로그 컷오프:** PRINT_RULES_MATRIX §8.7. autoPrint OFF→ON 폭주 차단(kitchenAutoPrintEnabledAt 이전 주문 skip).
- **KDS 취소/이동 팝업:** printed 게이트 제거(autoPrint OFF여도 station 탭 필터로 팝업). 이동도 autoPrint 준수(Send/Resend).
- **스테이션명 1번:** 자동발행 상단 박스 억제(groupLabel 헤더 1개=테이블이동 동일).
- **모바일 테이크웨이 테이블 보존** / **자동 업데이트 하드닝(60초 SW update + controllerchange 리로드)**.
- (별건) 직원 무이메일: 운영 DB `users.email` NOT NULL→NULL ALTER.

### 다음 확정 작업
- 없음 — 지시 대기 (이번 배포 운영 반영, Irene 실프린터 현장 최종 확인 중)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **KDS 실시간 미반영:** 새 주문이 리플래시해야 KDS에 보임 — 별도 소켓 이슈, 미진단.
- **전 화면 세트 렌더링 통일:** POS/FloorPlan/KDS/LiveOrders가 세트를 제각각 표시(LiveOrders는 세트명만). 데이터 정상화 후 공용 렌더러로 통일 검토.
- **버전 결정:** 이번 인쇄 핫픽스들 버전 미상승. Irene이 v3.47로 올리고 릴리즈노트 낼지 미정.
- **실프린터 현장 최종 확인** (Irene): 세트 선택팝업/N스테이션 N장+마지막/스테이션명1번/자동발행 폭주없음/취소 KDS팝업/첫티켓 빠름.

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
