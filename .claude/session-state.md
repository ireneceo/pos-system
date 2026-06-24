# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-06-24 #2
**버전:** v3.62 + 백스테이지. 운영 인쇄/표시 핫픽스 **SW 4.11**(정식 버전번호 미부여). 스키마 dev=운영 일치(144=144).
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 #2)
- **8GB 업그레이드 확인**: RAM 4→8GB(available 5.6GB), 메모리 압박 해소. swap 잔재 1.1GB 무해(콘솔서 swapoff/swapon 선택). CPU 2코어·디스크83%.
- **A 직원ID 네임스페이스 표시 strip — 운영배포(SW 4.11)**: SERVER1이 `r16:server1`로 보이던 버그. AuthContext displayStaffName + 백엔드 폴백 strip + 화면 strip + cashier_name 1회 백필. **인쇄 무접촉(print-guard 8/8)**. 운영 prefix 잔여 0.
- **B 권한리셋·D MYR/RM**: 운영 실측 결과 이미 해결 확인.
- **C rid=16 cancelled 테스트주문 31건 삭제**(완료 4건 보존, 백업 thefire16-cancelled-testdelete-20260624T_evening.json).
- **E 메뉴sync 종결**: 실영업점(본점 rid16) 정상, 미반영은 주문0건 빈 분점(24/25)뿐. 원인=manual 전송모드(버그 아님).
- **모바일 크로스셀 기획설계 저장**: docs/MOBILE_ADDON_CROSS_SELL.md.
- 배포 사고 수정: migrate-strip-cashier-namespace.js process.exit 추가([[reference_deploy_migration_must_exit]]).
- 운영 라이프사이클 검증 ALL PASS(주문/단계/결제/프린트).

### 다음 확정 작업
- **모바일 크로스셀(추천 애드온) 구현** — 설계 완료(docs/MOBILE_ADDON_CROSS_SELL.md). Irene "구현 시작" 지시 시 착수. (①상품수동연결→②추천카테고리[Dessert/Drink 자동+체크] 폴백, RA+BG 동기화, 담은직후 바텀시트)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- E: The Fire 빈 분점(24/25) 실제 오픈 시 브랜드메뉴 manual→auto 전환(또는 "업데이트 N건" 알림 강화).
- 모바일 크로스셀: 장바구니 결제직전 추천줄 / 주문이력 기반 자동추천(우리 데이터 집계, 외부 API 불필요).
- 운영 PlanQ 분리 → 모바일오더 애드온 → 오프라인 대응 설계(기존 확정 순서).
- 운영 디스크 83% 관찰. swap 잔재 정리(콘솔 swapoff/swapon, 선택).

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
