# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-25 (v3.42 backstage 3회 배포 — 매장 직원 UX + 안정성)
**버전:** **v3.42** 운영 (Irene 지시로 버전 미상승)
**작업 상태:** 완료. Irene 매장 점검 외출 중. 새 작업 지시 대기.

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션, v3.42 backstage 누적)

**1차 배포 (08:36, Backup 20260525_083449):**
- Takeaway per-item-individual UI 재설계 (Default + Override + inline combobox + 보라 하이라이트)
- i18n html lang sync (한국어 '오전/오후' AM/PM 해결)
- Notice [Send to Work Manuals] silent UX fix (5 NoticesPage navigate to Work Manuals)
- POS Terminal 쿠폰 검색 UI 신규 (검색 input + dropdown combobox)
- Mobile Order Alerts (sticky banner + 사운드 + Floor Plan dot + Settings 토글)
- 마이그 hang 방지 (`process.exit(0)`)

**2차 배포 (09:32, Backup 20260525_093056):**
- 주문 취소 권한 분리 (Staff = cancel, Restaurant Admin/Owner = delete)
- `GET /api/orders/:id/actions` audit trail endpoint 신규
- OrderDetailModal cancelled 자동 history popover (단계 + 시점 + 사용자 즉시 인지)
- Staff 추가 시 role 권한 차이 helper text (보라 박스, 4언어)

**3차 배포 (10:07, Backup 20260525_100534):**
- Customer Display Reset Position 자동화 (좌표 클리어 + popup 자동 열기 + "두 번째 모니터로 드래그" 안내)

**매장 사전 점검 (rest 16 The Fire Korean Restaurant):**
- Category → Station 매핑 15/15 정상 (KQ1/KQ2/BARPR)
- `restaurants.printer_settings.kitchenStationPrinters` 컬럼에 IP 정상 (192.168.1.120/200/110)
- 매장 가서 Test 버튼만 누르면 진단 끝

**Backstage 분류 (Irene 명시 지시):**
- CHANGELOG [Unreleased] 그대로
- 릴리즈 노트 / 블로그 / 공지 모두 생략

### 다음 확정 작업
- 없음 — 지시 대기
- (다음 진입 시) 매장 16 점검 결과 (프린터 라인별 출력 + Customer Display 듀얼 모니터) 보고 받아 처리

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- 탭 라벨 변경: "Printer" → "Printer & Display" (Customer Display 카드가 Printer 탭 안에 있어서 의미 묶음). 카드 순서 위→아래: Customer Display → Receipt Printer → Kitchen Printer → QZ Tray 설정. (매장 점검 후 진행 여부 확정)
- React Query 도입 (Priority A, `docs/PERFORMANCE_OPTIMIZATION_PLAN.md`)
- Backend composite endpoints (Priority B)
- 응답 size 최적화 (Priority C)
- cache-bust 정리 (Priority D)
- 서버 캐싱 (Priority E)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
