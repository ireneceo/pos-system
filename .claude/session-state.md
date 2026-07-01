# Purple POS — 개발 세션 상태

## 현재 작업 상태

**마지막 업데이트:** 2026-07-01
**버전:** 운영=**v3.66 / SW 4.54** (2026-07-01 배포, Backup 20260701_201256, Smoke 9/9)
**작업 상태:** 완료 · 운영 배포됨

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션, v3.66 운영 배포)
- **세트 구성품 단계 KDS↔플로어플랜 불일치 근본수정** (핵심) — 패널이 `set_components`(단계필드 없음)를 읽어 부모 pending으로 보이던 것 → KDS(`processRawOrderItems`:775)처럼 **단계=set_items[동일 index] 폴백**으로 통일. 메모리 [[reference_set_component_stage_field]].
- **매출 대조 마감(Final)** — 오늘 매출요약(순매출·주문유형·소스·취소·미결) + **void 요약**(총·결제후). dashboard.js `voidedItems`/`voidedBilledItems` 집계.
- **고객 디스플레이 self-healing 하트비트** — 우측패널 열린 동안 2.5초 재emit(소켓 blip 자동복구). FloorPlanPage.
- **같은 테이블 별도 주문** — TableDetailPanel "New Order" 버튼(merge 없이 별도, 스탭밀 등). 백엔드 skipAutoMerge 기존.
- **오더노트 주방티켓** — 품목 special_instructions + 주문 notes, 폴러 2곳(MainLayout+useAutoPrintPoller) 일치. billPrint 기존 렌더. ⚠ **매장 첫 주방티켓 눈확인 필요**(실프린터 확인 전 배포, Irene 승인).
- **SW 정적자산 cache-first** — 오프라인 도입 때 network-first 회귀 → immutable 해시 자산 cache-first 환원(뒤로가기·라우트 속도).
- **false-offline 완화** — OfflineContext FAIL_THRESHOLD 2→3, TIMEOUT 4→6초.
- **KDS**: 취소 리스트 상시버튼+서버조회(오늘 취소) / 스테이션별 소리 on/off(탭별 스피커+All 마스터, 디폴트 다 켜짐) / 전체 되돌리기 제거(아이템 단위만)·세트 되돌리기 버튼 크기 / visibility·focus 즉시 재조회.
- **실시간 견고화** — OrdersRealtimeContext + KDS: 화면 복귀/포커스 시 즉시 재동기화.

### 다음 확정 작업
- **QZ 네이티브앱 전환 개발** (Irene 2026-07-01 명시 지시 — "네이티브 앱 개발 진행하자. 노트북에서 마저") — 인쇄 안정 근본해결(QZ 제거, OS 직접인쇄). 웹앱 재사용, 인쇄/저장/네트워크 계층만 네이티브. Electron(데스크탑) or Capacitor(+Android). **테스트=Mac에서 대부분 가능**(Electron은 Mac 실행), Windows 인쇄만 가상머신(Parallels/VMware/UTM) or 매장 실기기. 운영 웹/PWA와 독립·동일 동기화. **설계부터 착수** (Irene 노트북에서 이어감).

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- 오더노트 주방티켓 **실프린터 눈확인**(v3.66 배포됨, 매장 첫 티켓에서 메모 나오는지 확인 — 이상 시 알림).
- 오프라인 주문 편집 액션 배선(비핵심, 백엔드 opId가드 준비됨).
- IOI Mall 매출 API 운영 전환(몰이 운영 URL/자격증명 줄 때 environment=production).
- KDS All 탭에서도 개별 음소거 반영할지(현재 All=마스터 전용).

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
