# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-27 (6차 운영 배포 — Floor Plan zone + CD 미러링 + Emergency + QZ SHA512 + Brand 마이그)
**버전:** **v3.42** 운영 (backstage 누적 6회, 버전 미상승)
**작업 상태:** 완료. 새 작업 지시 대기.

### 진행 중인 작업
- 없음

### 오늘 (2026-05-27) 완료된 6차 운영 배포 누적

**1. Floor Plan zone 격리**
- `orders.floor_plan_table_id` (VARCHAR(64)) 컬럼 + index 신설
- 운영 DB 마이그 — 272 scanned / 239 backfilled / 1 ambiguous
- 다중 zone 매장 (Restaurant 16, T1~22 + A20~22 둘 다 같은 tableNumber) 격리
- `selectedTable` derived = `label || tableNumber` (label 우선 — multi-zone 의 prefix 보존)
- POSTerminal URL ?tableId 박힘, orders POST body 의 floor_plan_table_id

**2. Customer Display 풍부화**
- Floor Plan / POS Terminal → CD socket cart-update payload 에 `orderInfo` + `customer` 풍부화
  - orderInfo: orderNumber / orderType / sourceLabel / createdAt / paymentStatus / paymentMethod / cashierName / orderStatus / guestCount
  - customer: id / name / phone / loyaltyTier / points
- CD 좌측: cart.orderInfo 있으면 **OrderInfo + Member 카드** (키패드 hide). 없으면 idle phone 키패드
- POSTerminal — 빈 카트 emit skip (overlay 진입 시 CD 빈 화면 되는 버그 해결)
- pos-customer-update 별도 socket event (선택만 변경 시)
- cart-clear / customer-cleared 명시 cleanup

**3. Emergency Routing Mode**
- printer_settings.emergencyMode boolean + emergencyEnabledAt timestamp
- 빨간 강조 카드 + Pre-flight 좌/우 2-column 비교 (현재 정상 vs 비상 켜면)
- Troubleshoot modal — 4 시나리오 (권한 캐시 reset / 주방 프린터 / 인터넷 다운 / OS 다이얼로그)
- 캐셔 method 별 적합도 자동 감지 (USB+QZ → ✓ 최적, LAN+QZ → ⚠ 부분)
- billPrint.js 의 printKitchenTicketViaRawBT / printCancellationTicket 진입점 emergencyMode 체크 → bill printer redirect

**4. QZ Tray 권한 알림 영구 fix**
- backend RSA-SHA1 → RSA-SHA512 (QZ Tray 2.2+ default)
- frontend `qz.security.setSignatureAlgorithm('SHA512')` 활성
- `/api/qz-tray/installer?os=windows|mac|linux` — 자동 설치 스크립트 (cert embed + 폴더 자동 생성)
- 보라 강조 박스 + 4 언어 안내

**5. Settings Printer 탭 전면 개편**
- "어떤 방법 선택?" 결정 매트릭스 (Windows POS / Android tablet / iPad / 혼합 5 row, **아코디언**)
- Browser Print / RawBT / QZ Tray 3 탭 (디폴트 Browser, QZ 마지막)
- Workstations + Kitchen Printer 2-column grid
- Customer Display 카드 → operations 탭 이동
- Workstation 카드 반응형 (input + 버튼 그룹 분리, minWidth:0)
- Test Cashier Printer 버튼 → Emergency 토글 옆으로 통합

**6. 반응형 헤더 (10인치 fix)**
- 공용 `OverflowMenu` 컴포넌트 (kebab + click-outside + ESC close + aria)
- Floor Plan + POS Terminal 헤더 ≤1280px collapse
- Customer Display 만 항상 가시

**7. i18n 4 언어 대량 추가**
- 154 개 `printer.*` 키 전체 4 언어 (en/ko/zh/ms) — verify Errors 0
- Emergency / methodGuide / Workstations / Stations / Troubleshoot / Auto installer
- 누락이었던 `howItWorksTitle` / `coreIdea` / `coreRecommendation` 발견 + 추가

**8. LiveOrders 결제 PATCH 400 hotfix (매장 critical)**
- PATCH /api/orders/:id 의 audit log 안 `orderData` 변수가 PATCH 함수에 정의 안 됨 (POST 코드 복붙)
- ReferenceError → catch → 400. DB 는 update 되지만 client 에 "결제 실패"
- fix: `(req.body.source || result.source || 'pos')` 안전 fallback + actionType 'updated'
- pm2 restart 후 LiveOrders 결제 정상

**9. Brand 메뉴 마이그 (Restaurant 16 → Brand 5)**
- 15 categories + 12 option groups + 41 options + 110 products + 25 OG-links → BrandMenu 시스템
- Restaurant 16 의 모든 Product 에 `brand_menu_id` + `brand_menu_link_status='in_sync'` stamp
- Brand 5 의 모든 BrandMenu lock = true (name/price/category/image/options), Restaurant snapshot 도 sync
- backend lock guard (menu.js:486-513) 정상 작동 — 매장에서 lock 된 필드 PATCH 시 400 PRODUCT_FIELD_LOCKED_BY_BRAND

**10. 운영 DB 마이그 hotfix (매장 영업 critical)**
- floor_plan_table_id column 운영에 자동 sync 안 되어 모든 Order query 500 → 매장 영업 down
- 즉시 SSH 로 운영 backend 의 마이그 스크립트 실행 + pm2 restart 복구
- (보완 필요) deploy-to-production.sh 의 sync-database.js 다음에 우리 신규 마이그도 자동 호출

**11. 기타 hotfix**
- Settings 의 workstation delete `localStorage.getItem('token')` → `getAuthToken()`
- printer_settings workstations state hydrate 누락 (새로고침 시 사라짐) fix
- setCdInfoModal undefined ReferenceError → setInfoModal (SettingsPage 의 진짜 state)
- sync-contents-to-prod.js 의 video_prompt + social_post 컬럼 sync 추가
- AutoSave 토글 indicator 위치 (다음 turn 후속)

### 6차 운영 배포 history
| 차수 | Backup | 핵심 |
|---|---|---|
| 1 | 20260525_142329 (어제) | 랜딩 헤더 z-index + BRAND CONCEPT v2 |
| 2 | 20260527_064446 | Floor Plan zone 격리 + CD 미러링 (DB 마이그 누락 → 매장 down 즉시 복구) |
| 3 | 20260527_070048 | PATCH ReferenceError + setCdInfoModal fix |
| 4 | 20260527_072413 | label 우선 (multi-zone 매장 prefix 보존) |
| 5 | 20260527_073933 | emit 풍부화 (orderInfo + customer) |
| 6 | 20260527_080403 | CD 좌측 OrderInfo 패널 + Brand lock 일괄 |

### 다음 확정 작업
- 없음 — 지시 대기

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준.

- **deploy-to-production.sh 보완** — 우리 마이그 스크립트들도 자동 호출 (운영 DB column 누락으로 매장 down 재발 방지)
- **검증 스킬 보완** — Multi-zone 매장 dev seed + Floor Plan → POS → addOrder e2e 자동화 (label/fpti end-to-end)
- AutoSave 토글 indicator 위치 정렬 (Brand 페이지 등)
- POS Terminal 헤더 단축 Emergency 토글 (운영 중 1 클릭 ON/OFF)
- BG → 가맹점 push 흐름 자동화 + 매장 lock 정책 UI 일관성
- Reconnect-safe Customer Display state (backend active_cart 캐시)
- 다른 Settings 탭 i18n 잔여 (store / mobileOrder / reservation 등)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시:
```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
