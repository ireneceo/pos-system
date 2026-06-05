# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-06-05
**버전:** v3.50 (2026-06-05 운영 배포, Backup 20260605_191333, smoke 9/9)
**작업 상태:** 운영 배포 완료 — 주방디스플레이 로그인 실화면 확인 + 아이템취소 티켓 실프린터 눈확인(v3.48) 대기

### 진행 중인 작업
- 없음

### 완료된 작업 (v3.48 배포 — 2026-06-05)
- 주문 알림음 단일화(New Order 전화면 공통 + Item Ready 별도) + Operations 탭 이동 + 중복음 제거
- 아이템취소 티켓 스테이션 박스(안내>박스>정보, 테이블이동과 동일)
- 발주 빈상태 안내 3경로 보완(브랜드/등록공급사/외부) + 재료 자동연결
- headless-page-sweep serviceWorkers:'block' 보강(SW 리다이렉트 우회)
- 발주 시스템 전수조사 — 코드/플로우 무결성 확인(생성→수령→인보이스→반품→크레딧, IDOR/익명 차단)

### 완료된 작업 (이전 세션)
- 세트 i18n: 세트 검증문구 영어판 한글노출 제거(frontend t-주입 / backend 영어)
- 세트 등록 무음실패 수정: 카테고리 FK(드롭다운 id→name 정규화, normalizeCategoryToName) + addMenuItem 에러 가시화 + 인라인 표시(스택팝업 제거) + cleanDbError(SQL 노출 제거)
- 세트 슬롯명 선택화: 슬롯명 필수 폐기, 빈 슬롯 주문화면 "Item N (선택 필수)" 폴백
- 세트 주문 렌더 폭발 수정: OrderContext.addOrder set_components 누락 → FloorPlan·KDS 폭발/옵션소실 해결 (POS=mobile 동일)
- KDS 세트 중복 제거 + 액션행 옵션 표시
- Floor Plan Off-table 통합뷰: Takeout 뷰=테이크아웃+픽업+배달, 타입배지/필터칩/검색, 배너→우측패널 라우팅, off-table 새주문 배너
- Off-table 아이템리스트(?view=items): 픽업/배달 타입색 loc 배지
- SearchableSelect 통일: 아이템리스트 필터 셀렉트화, 화살표 박스내 고정, 선택값 진하게/기본값 회색
- 색상 통일: 테이블맵 박스 + 아이템 리스트 버튼 = 솔리드 단계색(amber/purple/green/gray), 우측패널 기존 파스텔 유지. 카드 선택 디자인(좌측라인 유지 + inset ring + 텍스트 이동 없음)
- 주문 알림음 체계: 키 분리(liveorders_sound_enabled/kds_sound_enabled/floorplan), Floor Plan 새주문음 추가, Settings 화면별 종류/on-off (orderSounds operation_settings + settingsGuard 화이트리스트)

### 다음 확정 작업
- 없음 — 지시 대기 (v3.47 운영 배포 완료)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **v3.47 배포 후 매장 프린터 실출력 눈확인** (코드/실데이터 검증은 통과, 종이 출력만 남음):
  - 세트 주문 통합티켓 = 구성품별 주방 / 스테이션 티켓 = 인라인 태그 없음 / 취소 티켓 = 스테이션이 안내문 아래
  - 평소 일반 오더티켓 출력 회귀 없는지
- 사운드 아이콘 스타일 통일 미완 (Floor Plan vs LiveOrders 모양 다름)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
