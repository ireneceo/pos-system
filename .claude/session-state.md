# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-06-03
**버전:** v3.46 운영 (2026-06-02 배포 — POS UI/UX·주방인쇄v2·테이블이동/취소표·이메일인증·KDS팝업/배너. Backup 20260602_233232. ⚠️ 실프린터 눈확인 매장 진행 중)
**작업 상태:** 완료 (DEV, 미배포)

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션, 2026-06-03)
- 서빙 화면(Floor Plan ?view=items) — 아이템별/세트구성품별 서빙, KDS 색 동기화
- 직원 작업 접근 분리 (access_pos/serving/kitchen) + requirePosCounter
- 직원 이메일 선택 + Staff ID 매장 네임스페이스(r{rid}:id, 화면 strip, 매장별 재사용, PIN 전환)
- 아이템 리스트 필터 → SearchableSelect 통일 (allowClear off, 값 string 일치)
- 스탭 권한 메뉴명 "Support"→"Communication"
- 준비시간 타이머 v1 — Settings 토글+주문/아이템 목표+임계, 신호등 3단계(여유/임박/초과 맥동), 기준=주방 진입 시각. ItemListView + TableDetailPanel + KDS(표시 전용) 적용
- utils/prepTimer.tsx 단일 소스 (경과/서브소요[LiveOrders 인라인 추출]/레벨). SC#12 keyframe 버그 fix(css 래핑)
- headless sweep 에 ?view=items / ?view=takeaway 추가 (검증 구멍 메움 — 49/49 OK)
- 테스트 데이터 정리: r5 junk 주문 260603-014(verify-test/A01/B02) 취소

### 다음 확정 작업
- 없음 — 지시 대기
  (단, 아래 "주문 머지 → KDS 미통지" 는 Irene 이 현장에서 발견한 실 이슈. 우선순위 높음)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **주문 머지 → KDS 미통지 (실 이슈, Irene 발견)**: Live Orders `POST /orders/merge`(orders-crud.js:1827)는 `order-updated`+`order-deleted`만 emit, `order-items-added` 미발행 → KDS 팝업/추가품목 자동인쇄 안 뜸. Floor Plan/POS "추가주문"은 `/add-items`(:1922)에서 emit 해서 동작. 머지가 신규 미인쇄 품목을 주방에 알려야 하는지 = 티켓 중복 위험 있는 인쇄 파이프라인 결정 → Irene 승인 + 실프린터 확인 필요. 추측 변경 금지.
- KDS 준비시간 타이머 적용 완료(표시 전용). 인쇄 보호 파일이라 실프린터 화면 눈확인 권장.
- un-serve 시 아이템이 직전 단계(preparing) 아닌 'ready'로 복귀 — Irene 이전에도 언급. 의도 확인 필요.

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
