# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-27
**버전:** v3.43 운영 (2026-05-27 배포, Backup 20260527_203834, smoke 10/10)
**작업 상태:** 매장 도입 직전 critical fix 정식 배포 완료. 내일 매장 영업 시작.

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
