# Purple POS — 개발 세션 상태

<!-- AUTOSAVE-STALE-BANNER -->
> **[AUTO-SAVE STALE] (2026-06-24 18:15, idle 2038s)** — narrative 가 마지막 편집된 이후 작업 파일이 변경됐는데 narrative 가 미갱신 상태로 자동저장됨. /개발시작 진입 시 git HEAD 와 대조해 진행/완료를 정정하고 이 블록을 삭제할 것.
> 변경된 작업 파일: cash-management.js,orders-payment.js migrate-strip-cashier-namespace.js,staffName.js AuthContext.tsx,LiveOrdersPage.tsx OrderDetailModal.tsx,staffName.ts
<!-- /AUTOSAVE-STALE-BANNER -->

## 현재 작업 상태
**마지막 업데이트:** 2026-06-24 (thefire 인쇄 정확성·속도 대응 운영 배포 SW 4.06→4.10)
**버전:** v3.62 + 백스테이지. 운영 인쇄 핫픽스 **SW 4.10**(정식 버전번호 미부여 — 인쇄 핫픽스 연속 배포). 스키마 dev=운영 일치 + 이번 마이그(print_claimed_at/pending_reprint, payment/void 권한) 적용됨.
**작업 상태:** 완료(코드측). 속도 잔여는 인프라 — 운영서버 8GB 업그레이드(Irene 진행).

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션, 운영 배포 SW 4.06→4.10)
- 서버(주문전용) 역할 권한 분리: 결제·주문취소만 차단(access_payment/access_void), 마이그 재실행 제거(배포마다 권한 도로 켜짐 방지)
- 모든 프린트 루트(신규·이동·취소·void) DB통일 → 누가/어느기기/계정이든 인쇄 전담 POS 1장(atomic print-claim 중복방지)
- 소켓→메인POS 즉시 폴링(order-created/items-added/updated, 120ms debounce) — 이동·취소 5초대기 제거
- 취소표 삭제 레이스 분실 수정: pending_reprint(취소/삭제/이동)은 is_deleted여도 1회 인쇄 + 죽은claim 복구(최근5분), 고스트(안내없음) 차단 유지
- 이동 티켓 맨 아래 "이전(취소선) → 새 테이블" 표기
- 티켓/빌 시간 매장 타임존 실수정(MainLayout 폴러 getStoreInfo 미선언→{} 버그) + billPrint 13곳 timeZone
- POS 권한(access_pos)에 프린터·주방 스테이션 설정 노출 → 비관리자 POS 계정서도 인쇄 정상
- (동반 배포) 6/24 오전 KDS 전용 PIN 게이트 제거→헤더 PIN 모달 통일 — 이번 인쇄 배포에 함께 운영 반영됨(더이상 미배포 아님)
- 인쇄 속도 근본 진단: 26~305초 지연=운영서버 4GB swap(free 268MB, swap 1.1GB 사용)으로 claim 왕복 굼뜸 → 빠른 서버가 답

### 다음 확정 작업
- **운영서버 8GB 업그레이드 (Irene 진행)** → 완료되면 인쇄 속도 재측정. PlanQ 공유 유지 가능(working set ~3.3GB).
- (기존 확정 순서) ①운영서버 PlanQ 분리 ②모바일오더 애드온 ③오프라인 대응 설계문서

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **멀티테넌트 확장 대비(중요)**: 유저 늘면 메모리·폴링부하 재발 가능. 대응순서 = ①PlanQ 분리(서버 단독화) ②MySQL innodb_buffer_pool 상향(현 128MB) ③인쇄 폴링 chattiness 감소(전담기기만 폴링 또는 소켓 푸시화) ④상시 인쇄 에이전트(브라우저 탭 의존 제거). 8GB는 현 규모 해결+런웨이, 영구해는 위 ②~④.
- 라이브 막힘주문 잔여 있으면 서버 업그레이드 후 재확인

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
