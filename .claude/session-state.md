# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-28
**버전:** v3.43 hotfix #3 운영 배포 (2026-05-28, Backup 20260528_085906, smoke 10/10) — 버전 미상승 (backstage)
**작업 상태:** Kitchen Station hybrid 모드 + 모바일 주문 카테고리 라우팅 fix 운영 배포 완료. The Fire 매장 영업 1일차 실시간 fix.

---

## 🔔 다음 세션 진입 시 사용자에게 알려야 할 것 (필수)

### 1. 매장 도입 (2026-05-28~) 현장 검증 항목
사용자에게 "어제 v3.43 운영 배포한 변경들 — 매장에서 실제 동작 확인하셨나요?" 명시.

**v3.43 매장 critical 검증 시나리오**:
- A. **AutoPrint master gate** — `kitchenPrinter.autoPrint=false` 시 station 토글 ON 이어도 자동 인쇄 안 됨 (browser print dialog 안 뜸)
- B. **신규주문 banner** — 녹색(emerald) 그라데이션, View/X 버튼 클릭 정상, 우측 NotificationToaster 와 안 겹침
- C. **Customer Display reconnect** — F5 / 네트워크 끊김 / 모니터 sleep 후 last cart 자동 복원
- D. **Customer Display 자동 오픈** — 첫 click 으로 secondary 모니터에 popup, default ON
- E. **Customer Display 크기** — 작은 모니터에서 가독성 (전화 38px tabular, member 22px)
- F. **Receipt logo 인쇄** — POS/LiveOrders/주문상세 뷰영수증/모바일 ReceiptShare 모두 로고 보임 (어제 안 나오던 핵심)
- G. **Brand Menu** — 카테고리 필터 select / 등록 시 카테고리 필수 / 모두 lock 시 Edit→View
- H. **Floor Plan TableDetailPanel** — 4단계 dot (Queued/Cooking/Ready/Served), ready 부터만 체크박스 활성
- I. **모바일 주문 status override** — Settings 토글 ON 일 때 outstanding / OFF 일 때 즉시 pending → KDS
- J. **KDS +Round N divider** — 같은 테이블 추가 주문 시 노란 띠 "+ ROUND N" 표시 + 자동 인쇄 (master gate 통과 시)

### 2. 진행 중인 미해결
- 매장 station-only 운영 패턴 (kitchenPrinter.enabled=false + station autoPrint 만) — 별도 검증 필요
- Customer Display PWA 모드 자동오픈 — Chrome 의 popup 제한 매장 PC 환경 확인

---

## 오늘 (2026-05-27) v3.43 운영 배포

### 매장 도입 직전 critical fix
1. **AutoPrint master gate** (6곳 일괄) — kitchenPrinter.autoPrint 가 master, station 토글 우회 차단
2. **신규주문 banner** — 색상/Z-index/X 버튼/NotificationToaster 분리
3. **Customer Display backend cart cache** — services/socketService.js, reconnect 시 자동 replay
4. **Customer Display 자동오픈 default ON** + 폰트/패딩 대폭 키움
5. **Receipt logo endpoint path fix** — `/var/www/uploads` 기준 + traversal 가드 + data: 처리
6. **billPrint.js img src 정규식 fix** — `^https?` → `^(data:|https?:\/\/)` (모든 인쇄 경로 자동 적용)
7. **Brand Menu** — 카테고리 필수 + 검색 옆 select 필터 + fully locked View
8. **Floor Plan TableDetailPanel** — ready↔served 4단계 dot ItemStatusPill + i18n 4언어
9. **Mobile orders status override** — orders-crud.js:386 source='mobile' 분기
10. **KDS +Round N divider** + auto-print
11. **Auto-merge 조건 완화** + status preservation

### 검증 (10단계 통과)
- 0 state-hydration 0 warning
- 1 빌드 main.1bf88f91.js warning 0
- 2 health-check 80/80
- 3 API 6/6 (autoPrint master gate / receipt-logo / status override / auto-merge / cart cache reconnect / clear evict)
- 10 critical mount 6/6 (POS/KDS/Floor Plan/Settings Printer/Live Orders/Customer Display)

### 운영 배포 확인
- Backup: 20260527_203834, smoke 10/10
- 운영 매장 16 receipt-logo endpoint 200 OK + PNG raster (어제 안 나오던 핵심)
- 운영 cartCache 코드 deploy 확인
- 운영 frontend main.1bf88f91.js

---

## 오늘 (2026-05-28) v3.43 hotfix #3 운영 배포 — Kitchen Station hybrid 모드 (버전 미상승, backstage)

### 매장 영업 1일차 실시간 fix
1. **Kitchen Station hybrid 모드** — `kitchen_assignment_mode` radio (category OR menu_item) 제거, 항상 hybrid (카테고리 기본 + 메뉴별 override 동시). Toast / Square / Lightspeed 산업 표준 패턴
2. **Station Modal 통합** — 카테고리 섹션 + 메뉴 Override 섹션 동시 노출, 메뉴는 카테고리별 그룹 + "via Category → Station" 라우팅 힌트
3. **Mobile orders 카테고리 fallback bug fix** — `routes/mobile-orders.js` `Product.category` 가 legacy NAME 일 때 `Number(name)=NaN` → 카테고리 라우팅 무효였던 pre-existing 버그. id/name 양쪽 lookup map. 모바일 주문의 카테고리 단위 station 매핑이 실제로 작동 안 하던 사례 차단
4. **Unassigned 경고 hybrid** — 카테고리 미배정 + 메뉴 override 도 없는 것만 경고
5. i18n en/ko/zh/ms 12 신규 키

### 검증 통과
- 빌드 main.7b94c1c9.js
- API hybrid (override 우선 + category fallback) ✓
- DB cat→A / product override→B / sibling→null ✓
- health-check 80/80 ✓
- headless mount kitchenStations 탭 ✓ pageerror 0
- 운영 검증: backend 2개 파일 MD5 일치, frontend bundle 일치, The Fire (r=16) `assignment_mode: hybrid` 응답

### 운영 배포
- Backup: 20260528_085906, smoke 10/10
- Content sync: 51 contents updated (블로그 자동 동기화)

---

### 다음 확정 작업
- 없음 — 매장 도입 후 실 운영 피드백 기준 대응

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- station-only 매장 패턴 검증 (kitchenPrinter 미사용)
- Customer Display PWA 모드 popup 차단 우회 (Chrome 환경)
- Floor Plan 우측 패널 — Restaurant Admin 전용 권한 일부 확장
- Brand Menu lock 토글 UI (현재 backend 설정만, UI 없음)
- Staff 권한 fine-grained (지금은 6 그룹)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
