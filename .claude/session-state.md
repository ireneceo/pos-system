# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-06-16
**버전:** v3.57 (이후 backstage 배포: 태블릿패치/소켓PhaseB/BG월청구 — 전부 버전 미상승). 직전 v3.56(6/13), v3.55(6/12). **데모14건은 미배포(배포 시 버전 결정).**
**작업 상태:** 완료 — dev 검증 끝, 운영 배포 대기

### 진행 중인 작업
- 없음 (운영시간+라스트오더는 설계 완료, 구현은 Irene go 대기 — docs/BUSINESS_HOURS_LAST_ORDER.md)

### 2026-06-17 추가 작업
- **thefire03(rid25) 운영 데이터 수정 2건 (배포 무관, DB 직접·이미 반영)**:
  - 모바일 메뉴 0건 → 상품 126개 is_active=1 활성화. 원인=브랜드메뉴 푸시는 비활성 생성(설계), 매장 미활성화. 백업 thefire03-isactive-backup-20260617.json
  - 플로어플랜 B그룹 7슬롯 0배치 → B-1~7 배치(B-1 가로 rectangle 110x70, B-2~7 square 70x70). 백업 thefire03-floorplan-*-20260617.json
- **floor-plan 자동배치 근본수정 (dev 완료·배포대기)**: ZonesAndGroupsCard.tsx autoPlaceSlots — 그룹 생성/풀증가 시 캔버스 자동배치(겹침회피). v3.39 수동정책 뒤집음. poolSizeHelp i18n 4언어. e2e PASS / print-guard 8/8 / health 101/101 / build TS0

### 완료된 작업 (이번 세션)
- 데모 리포트 14건 전수 수정 (Owner/FG/BG 3역할) — 전체유저 공유코드 버그로 처리, 주문 프로세스 미접촉
  - Owner-1 결제 QR 정사각 검증(squareHint) + brand K-DINE 잘못된 이미지 제거
  - Owner-3 공지 author_name null 폴백 / BG-4 인보이스 카테고리 생성 / BG-5 판매범위 영문화
  - FG-1 매장추가 foodcourt 자동연결 / FG-3 인벤토리 테이블 헤더 클립 / FG-4 After meal 제거 / FG-5 공급업체 추가
  - BG-1-1 Admin 매장선택 선택식 / BG-1-2 supervisor 수정권한+demoProtection self한정 / BG-1-3 is_active 컬럼 신설+로그인차단
  - 재현=이미정상(무변경): Owner-2 매장등록, FG-2 Tenancy탭, BG-2 레시피, BG-3 댓글삭제
  - FG-6 쿠폰 = 완전 목업 → 별도 기획건 분리
- 검증: print-guard 8/8, health 101/101, state-hydration 0, timezone 신규 0, build TS 0, 주문 E2E 전구간, 실브라우저 mount RA 48/48
- DB: users.is_active 컬럼 dev 적용(마이그 멱등, 배포 9a-2 등록). brand K-DINE QR 이미지 dev 정리.

### 다음 확정 작업
- **운영 배포** (Irene 지시: "이따가 레스토랑 운영 안 할 때 /배포"). 배포 시 migrate-user-is-active.js 자동 실행됨(9a-2).
  - 배포분: 데모 리포트 14건(코드) + **floor-plan 자동배치(ZonesAndGroupsCard 6/17)**.
  - 배포 후: 운영 데모 브랜드에 같은 잘못된 QR 이미지가 있으면 1회 데이터 정리 또는 매장 재업로드(검증이 안내).
- **운영시간+라스트오더 구현** — 설계 완료(docs/BUSINESS_HOURS_LAST_ORDER.md). 비즈니스 결정 확정(요일별 라스트오더 명시시각 / 모바일만 차단 / 메뉴노출+버튼비활성). Irene go 하면 구현 착수.

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- FG-6 쿠폰 기획건 — ManagerPromotionsPage 완전 목업(API 0건)을 실제 구현(매장 적용범위 + 쿠폰 CRUD 연동).
- 구독 플랜 게이팅(Owner/Supplier 데모) — 기능 미개방으로 튜토리얼 생성 제약 보고건. 데모는 is_demo bypass라 영향 적으나 프론트 모듈 게이팅 점검 여지.

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
