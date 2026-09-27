# 다음 세션 이어서 — 2026-09-27 [Claude Code] 조사 완료분 + Fable 판정 요청(결과 미수신)

> 이 세션에서 Fable 판정 1회를 띄웠으나 Irene 외출로 결과 수신 전 중단.
> **다음 세션: 아래 «Fable 요청 원문»을 그대로 Agent(model: fable) 로 1회 다시 띄운다** (Irene 「fable은 최소로 사용해」 — 이 1회 + 필요할 때만 게이트 1회).
> 운영 쓰기는 아직 0건. 개발 변경: `dev-backend/_tmp_uname.js` git rm(스테이징, 미커밋) 1건뿐.

## Irene 원문 (2026-09-27)
「1. 이거 해줘. 오너 계정 해줘. 2. 손글씨 아니여도 잘 안떠서 다 선택해야 하는데... 이거 제안 좀 해줘. 너무 일이야. ai를 쓰고 안쓰고 돈을 받으면? 지금 ai 들어갈 곳 좀 많지 않아? 3.git consulting 에 300링깃 이하 10링깃 배송비 하고, 이상은 무료. 지역은 페탈링자야만 지정하 놔줘. 너가 설정에 넣어놔봐. 그럼 내가 볼게. 도대체 설정이 어디있는지도 모르겟어. 4. 뭘 보류해? 다음에 해? 아니면 필요없어? 참고용메모 내용은 다 원인파악해서 수정해. 문제 없게 해.」
이어서: 「응 계속 진행해. fable은 최소로 사용해」
앞선 질문: 「레스토랑 캐시매니지먼트 리스트 삭제가 되는 거 맞아?」 (답변 완료 — 아래 0 참조, 마감 교대 삭제 가능 여부는 미결)

번호 대응: 1=오너 모자 후속(`.claude/owner-hat-remaining.md` 161행~) · 2=AI 판독(`docs/PURCHASE_ORDER_SYSTEM.md` §8-6 C) · 3=판매자 배송 조건 · 4=지역별 배송비 보류(`docs/TRADE_STRUCTURE.md` ⑦ §5(b)) · 참고용메모 = session-state «후속 후보».

## 실측 사실

### 0. 현금 원장 삭제 (dev 데모 38 실호출)
- 열린 교대 수동 입출금 DELETE 200 / **마감(closed) 교대 수동 입출금도 DELETE 200 하드삭제** / 시스템 기록(source≠manual) 400 SETTLEMENT_LOCKED.
- `routes/cash-management.js:442`(PUT)·`:461`(DELETE) 교대 상태 확인 없음, 감사 기록 없음.

### 1. 오너 (운영 읽기)
- users 23 `gitconsulting`(BG, help@) · 11 `K-DINE Brand`(BG) · 64 `withmin_owner`(Restaurant Owner, irene@gitconsulting.group, 활성, created 09-24 17:59, updated 09-25 07:10).
- restaurant_managers: id29 r10/m23 **oversight** · id30 r8/m23 oversight · id14 r9/m11 oversight · **id45 r10/m64 ownership**.
- r10 with MIN Cafe brand 1 owner 23. subscriptions r10 = 0행.
- **부여 API(`routes/users.js` POST /:id/contexts ~1362)는 oversight 행이 있으면 409** → 절차 ① 그대로는 실패.
- 64 «마지막 로그인» 확인 불가: 운영 users 에 last_login 칸 없음. activity_logs user 64 = 0행. pm2 로그 0회.

### 2. AI
- `utils/invoiceOcr.ts` tesseract.js 브라우저·eng·전처리 없음·PDF 첫 장만·텍스트층 무시·표 구조 없음. `utils/invoiceMatcher.ts` 한 줄=이름+끝 숫자, 낱말 정확일치(퍼지 없음), 1센트 검산, 20배 벽.
- LLM SDK 0. 과금: 모듈 게이트(`middleware/requireModule.js`, `addon_modules`) 있으나 플랜 포함만, 사용량 계측 0.
- AI 후보 화면: 인보이스 대조 · 공급업체 상품 대량등록 · 메뉴판 사진→메뉴 · 레시피 재료 연결 · 발주 수량 제안 · 재고실사 차이 요약 · 마감/리포트 이상 설명.

### 3·4. 배송비
- GIT Consulting 판매자 = 브랜드 1 «with MIN»·2 «K-DINE with MIN»(owner 23). 설정 = BG 사이드바 **Plans & Payments → Payment Settings**(`/pos/brand/payment-settings`, `PUT /api/brands/:id/payment-settings` brands-core.js ~716). 공급업체 GIT(supplier_companies) 별도 존재 여부 미확인.
- 지역 칸 없음. 09-25 Fable 판정: 「지금 넣지 않는다 — 별도 사안」(필요없음 아님). 페탈링자야 = Selangor 안의 도시(state 아님).

### 참고용 메모 원인
- a. RA 부여 입구: 목록 `/api/users?role=Manager` 가 RA 제외(users.js:71-74). 안(가) `StaffManagementPage.tsx` Edit 모달(:2003)에 `UserContextsSection` (프론트 1파일).
- b. 운영 «대조 있음 AND 줄 단가 전부 null» = reconciled 3건 중 **0건 → 종결**.
- c. 타입 검사 OOM: ForkTsChecker 기본 2048MB, 4G cgroup, i18next d.ts TS5 vs TS4.9.5, TSC_COMPILE_ON_ERROR=true. 안: verify-all 에 빌드 밖 tsc 기준선(3584MB+i18next 스텁, 기준 439).
- d. 브랜드·푸드코트 모자 / 기존 아이디 연결: 신규 기능(`docs/MULTI_CONTEXT_LOGIN_DESIGN.md`).
- e. 배포 마이그 실패 반쪽 상태: rsync(:470,:526) 뒤 마이그(:640-700) 실패 시 exit, pm2 restart(:807) 안 함. 프론트는 이미 새 번들.
- f. 운영 `/var/www/rollback-production.sh`: `.backup` 경로·DB 덤프 경로(실제 `/var/backups/orderhere/pre-deploy/db_predeploy_${TS}.sql.gz`)·.env.backup 불일치 → 전부 skip 후 거짓 «ROLLBACK COMPLETE». 경로 고쳐도 rm -rf 후 cp 로 node_modules·logs 소실.
- g. site-settings 이중 호출: 첫 방문 `index.tsx:133-137` controllerchange → 무조건 reload. 안: 등록 전 hadController 저장.
- h. `_tmp_uname.js`: **dev 에서 git rm 완료(미커밋)** → 다음 배포 --delete 로 운영도 삭제.
- i. shared_with_stores 드롭: 쓰기 5곳 잔존. **레지스트리 deploy 의 `migrate-add-supplier-company-shared.js` 가 드롭 후 DEFAULT 1 재생성 → `migrate-share-brand-suppliers-to-stores.js` 가 전 브랜드 업체를 전 매장 복사** 위험. 묶음 처리 필요.
- j. 720px 팝업: `components/Common/PwaInstallBanner.tsx` zIndex 9000 > Modal 1000. 안: z-index 낮추기 / 모달 열림 시 숨김.

## Fable 요청 원문
위 «Irene 원문» + «실측 사실» 전체를 사실로 전달하고, 요청은 다음 한 줄만:
「항목별 판정(할지/안 할지/어떻게/순서), 운영 데이터 작업(1·3)의 실행 방법 지시, Irene 보고문(컨펌 항목엔 권고 포함). 운영 쓰기 금지(읽기 가능), 배포는 Irene /배포 때만, 🔒 인쇄 보호파일 무접촉, 프론트 빌드 1회+verify-all --full 1회, Fable 호출 최소(이번 1회 + 게이트 필요 시 1회).」
