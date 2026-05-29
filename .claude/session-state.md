# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-29
**버전:** v3.43 (운영) — 아래 변경들은 **dev 에만 있고 미배포** (버전 미상승, /배포 대기)
**작업 상태:** 분석/설계 마침. 다음 세션 = 아래 "다음 확정 작업" 바로 구현 착수.

---

## 🔔 다음 세션 진입 시 사용자에게 알려야 할 것

### A. 이번 세션 dev 반영했으나 **아직 운영 미배포** (Irene /배포 시 함께 나감)
1. **주문 머지 전체 금액 재계산 정합성** — `utils/orderTotals.computeOrderTotals` 단일 공식. 세금/서비스차지=할인후금액 기준, %할인정책·쿠폰 새 소계 재계산, 고정할인·포인트 유지. 4경로(POS forceMerge / add-items·merge-items / bulk merge / 모바일) + DELETE item 통일. (검증: E2E 5케이스 PASS, health 80/80)
2. **빌프린트 단가 제거 + 줄간격 축소** (ESC/POS + HTML 양쪽, 세트 구성품 표기 동일화). `billPrint.js`.
3. **Floor Plan QR 인쇄 캐시리스 표시** + **모바일 메뉴 캐시리스 배너** (4언어).
4. **진단 이메일 자동발송 중단** — POSTerminal `_tele`/`_telemetry` no-op, Floor Plan QR-fail 자동발송 제거. 수동 Settings 진단 버튼만 유지. (qz-tray/diagnose 백엔드는 그대로)
5. **카드 결제 시 카드종류 선택 필수 토글** — `payment_settings.card.requireCardType`(기본 false). Settings 결제탭 토글 + PaymentModal 강제 + 4언어.

→ **다음 세션 진입 시 "위 5개 dev 검증 끝, /배포 할까요?" 먼저 물어볼 것.** (커밋도 아직 — 작업 트리에만 있음, /개발완료 미실행)

### B. v3.43 운영 매장 현장 검증 (이전 세션 이월, The Fire 도입)
AutoPrint master gate / 신규주문 banner / Customer Display reconnect·자동오픈 / Receipt logo 인쇄 / Brand Menu / KDS +Round N — 현장 동작 확인 여부 확인.

---

## 다음 확정 작업 (Irene 명시 지시 + 결정 확정 완료 — 바로 구현)

> 2026-05-29 Irene 가 AskUserQuestion 으로 전부 컨펌함. 재질문 없이 구현.

### 그룹 1 — Floor Plan / POS 운영 개선 (중규모, 바로 구현 가능)
1. **우측 패널 접기** (`TableDetailPanel.tsx`) — 항상 노출: 주문 상태진행 버튼 + 결제 + Add Items. 접이식 "테이블 작업 ▾"(기본 접힘): QR Reprint/Expire/정보, 프린트 아이콘, Cancel/Leaved. → 주문내역 가독성 확보.
2. **"Open in POS Terminal" 링크 제거** — `TableDetailPanel.tsx` 2곳(occupied ~1798 / available ~1837). 신규주문은 기존 "+ New Order" iframe POSOverlay(`handleNewOrder`)로 충분.
3. **테이블 점 재정의** (`TableNode.tsx` `MobileOrderDot`) — 기준을 "**미접수 새 주문**"으로: `orderStatus === 'pending'`(+outstanding), **출처 무관**. 색=빨강(needs-attention 토큰). 직원이 접수(Start Cooking 등 상태 진행)하면 사라짐. 테이블 색은 주문상태, 점은 "확인 필요" 직교 신호. **범례(legend) 추가** (Floor Plan 화면).
4. **POS 품절(sold-out)** — `Product.soldOut` 필드 이미 존재(is_active=활성/비활성과 별개). 메뉴 타일 **길게누르기 → 품절/재고복구 토글**. 즉시 회색+SOLD OUT + **socket 브로드캐스트**(전 POS/모바일 반영). 백엔드: `PUT /menu/product/:id/toggle-soldout`(toggle-active 미러, `checkProductTenant` → Staff 허용). Staff 권한 OK.
5. **할인 PIN 승인** — 매장 설정 토글 "할인 시 PIN 승인 필요"(operation_settings 권장). ON 시 할인 적용에 PIN 입력 → **신규 경량 엔드포인트** `POST /api/staff/verify-pin-permission`(PIN 이 *할인 승인 권한* 가진 직원인지 서버 검증, **JWT 재발급/세션 전환 없이** `{authorized, by}` 반환) + 감사로그. **하드코딩 `MANAGER123` 제거**(`POSTerminalPage.tsx:1914`). 권한 모델: User.permissions JSON 에 `discount_authorize` 추가 or Restaurant Admin/Owner/Manager 자동 허용 — 구현 시 확정.

### 그룹 2 — 세트메뉴(콤보) 재설계 (대규모 → `/기능설계` 6단계)
- 설계 문서: **`docs/SET_MENU_REDESIGN.md`** (작성 완료).
- 핵심: ① OR(택1) 슬롯 `set_groups` 구조 ② 구성품 Product live 참조 + 옵션 상속 + 주문라인 구성품 분해 → 단품/세트 통합 통계 + 구성품 레시피 재고차감 ③ 품절 연동(fixed=상품품절 시 차단, choice=전 선택지 품절 시만 차단).
- 기존 set_items → set_groups[fixed] 무손실 마이그.
- 구성품 선택 UI는 이미 검색 가능(확인됨).

---

## 후속 후보 (아이디어 메모, 확정 X)
> /개발시작 자동 추천 대상 아님.
- station-only 매장 패턴 검증 / Customer Display PWA popup 우회 / Brand Menu lock 토글 UI / Staff 권한 fine-grained

---

## 서버 재시작 후 복구 가이드
새 Claude 세션 시작 시:
```
이전 세션 이어서 할게. /var/www/.claude/session-state.md 읽어줘.
```
