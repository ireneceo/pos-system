# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-06-05
**버전:** v3.46 (운영 배포 기준 — /배포 시에만 갱신)
**작업 상태:** 완료 (DEV, 미배포 — 실화면 눈확인 대기)

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
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
- 없음 — 지시 대기

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **실화면 눈확인 (다음 세션 진입 시 Irene 테스트 안내 필수)**:
  - 세트 주문 → 주방 티켓/KDS 구성품+옵션 정상(실프린터)
  - Off-table 뷰 픽업/배달 + 배너 라우팅
  - 색상 통일(테이블맵/아이템 솔리드) + 카드 선택 디자인
  - 주문 알림음(Floor Plan 새주문음, Settings 종류)
  - prep timer 카운트다운(KDS/Floor Plan 아이템리스트) 신호등 3단계
- 사운드 아이콘 스타일 통일 미완 (Floor Plan vs LiveOrders 모양 다름)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
