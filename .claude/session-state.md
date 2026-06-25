# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-06-25 #2
**버전:** v3.62 + 백스테이지(하이브리드 로컬 인쇄 SW 4.16→4.17 운영배포, 버전 미상승 — backstage). 스키마 dev=운영 일치.
**작업 상태:** 완료 (다음 세션 이어감 — BAR 원인 A/B 확인 대기)

### 진행 중인 작업
- 없음 (인계 항목은 아래 "다음 확정 작업" 참조)

### 완료된 작업 (2026-06-25 #2)
- **하이브리드 로컬 인쇄 — 운영배포(SW 4.16 신규주문, 4.17 이동/취소/void. Backup 20260625_140705·142900, Smoke 9/9 ×2)**: thefire 와이파이 불안정으로 폴러(서버경유) 자동인쇄 지연/누락 → **POS1이 자기 동작(신규·이동·취소·void)을 폴러 안 기다리고 즉시 로컬(QZ) 인쇄**. 신규파일 `hybridKitchenPrint.ts`(`printOrderKitchenNow`), billPrint 무변경, atomic claim 중복0, 표준 noticeHeader 재사용, master gate(POS1만·POS2 게이트로 폴러위임). POSTerminal(2)·FloorPlanPage(이동)·LiveOrders(취소)·TableDetailPanel(취소+void) 연결. 검증: build·autoprint44·health107·hydration0·design0·print-guard8/8(POSTerminal bless)·mount crash0·데이터흐름 API 실증. 상세=[[project_hybrid_local_print]], docs/THEFIRE_REMAINING_WORK_PLAN.md §1.
- **BAR 미인쇄 원인 진단(코드/설정 정상, 물리 도달 문제)**: station 14(BAR) `address="BAR"` 살아있음, 코드도 `.address`로 QZ 지정(billPrint:3382, 빌이 POS-80C로 잘 나오는 것과 동일). **원인=POS1 QZ가 "BAR" 프린터 미도달**(KITCHEN/KITCHEN 2는 잡힘). 이름 못 찾으면 기본프린터 폴백 + mirror로 printed_at만 찍힘 → BAR 전용 프린터엔 0장. **신규주문 하이브리드는 정상 동작 확인(Irene "신규 잘 나옴").**
- **(참고) 직전 세션 #1 완료분**: 설정 wipe 방지 자물쇠3개(v4.x) + 소켓 즉시화 + 백로그 컷오프(SW 4.12). 인쇄 구조 결정 CLAUDE.md 박제. 운영 디스크 83%→21%.

### 다음 확정 작업
- **BAR 미인쇄 — Irene가 물리 연결 확인 후 수정**: (A) BAR가 POS1 네트워크 공유인데 윈도우 프린터 이름이 "BAR" 맞나 → 이름만 맞추면 끝 / (B) BAR가 POS2에만 물림 → POS2가 BAR 스테이션만 자동인쇄하는 구조로 게이트 조정. **A/B 확답 받고 착수.**
- **하이브리드 실프린터 확인(이동/취소/void)**: POS1 강력새로고침 후 이동→TABLE CHANGED 1장 / 취소→ORDER CANCELLED 1장 / void→ITEM VOIDED 1장(표준 디자인, 중복0). 문제 시 롤백 Backup 20260625_142900.

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **+Round 추가주문 "1 바로 + 1 나중" 2장 조사**: 백엔드 claim 중복0 재현으로 정상 입증, KDS 표시전용(인쇄 안 함) 확인 → 코드 누락 아님. 의심=`mirrorToBillPrinter=true`(미러 카운터 사본) 또는 BAR 미도달의 기본프린터 폴백. **BAR 도달 해결 후 재관찰 권장.** (실측: 진단은 "어느 프린터에서 2장 나왔나"로 미러 vs 진짜중복 즉시 판별 가능.)
- **#8 다른기기 결제 빌 즉시 트리거**: thefire는 빌프린터 POS에서만 결제 → 현재 불필요. 다른기기 결제 운영 시에만.
- **프린터 설정 `name` 빈 필드 정리**: QZ는 `address`로 동작(정상)이나 `name`이 전부 ""라 혼동. getter([[reference_model_getter_key_strip]]) 점검 겸 정리 검토(기능 영향 없음).
- **모바일 크로스셀 구현**: 설계 완료(docs/MOBILE_ADDON_CROSS_SELL.md). Irene "구현 시작" 지시 시.
- 매장 측(코드 아님): POS1·POS2 유선 이더넷(와이파이 혼잡이 크로스기기 인쇄 지연 근본). docs/THEFIRE_REMAINING_WORK_PLAN.md §0.

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
