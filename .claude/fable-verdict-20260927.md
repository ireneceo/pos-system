# Fable 판정 원문 (2026-09-27) — 이 사안 1회차. 다음 세션은 이 지시대로 실행 (Fable 재호출 불필요, 게이트 2회차만 남음)

> 수신 시 auto mode 보안 경고 「Remote Shell Writes」(보고문에 운영 쓰기 지시 포함). 팀원이 수신 직후 운영 읽기로 확인: restaurant_managers r10 = id29 m23 oversight · id45 m64 ownership / users 23·64 is_active=1 / brands 1·2 min_order_amount·delivery_fee = null → **운영 무변경 확인.**
> Irene 이 「멈추고 저장」 지시한 뒤 도착 → 미실행. Irene 에게는 Ⅰ·Ⅲ 을 전달함.

## Ⅰ. Irene 에게 올릴 보고문

### 1. 오너 계정 — 합니다. 단, 화면 버튼으로는 안 되고 데이터 직접 정리로 처리합니다
- 왜 화면으로 안 되나: gitconsulting 은 with MIN Cafe 에 이미 「감독 매니저」로 연결. 부여 버튼은 안전장치로 409. 안전장치는 옳아서 코드 안 바꾸고, 그 연결 한 줄을 「감독」→「소유」로 바꾼다. (오너 화면의 「내 매장 연결」도 내부적으로 똑같이 감독→소유 승격 — 같은 방식.)
- withmin_owner(irene@gitconsulting.group) 는 소유 연결을 지우고 비활성화. 이 계정이 남긴 데이터는 운영 DB 71개 칸 전수 스캔으로 「그 소유 연결 한 줄」뿐(주문·발주·현금·활동기록 0). 비활성화는 되돌릴 수 있음.
- 끝나면 gitconsulting 로그인 → 시작 화면에 「with MIN Cafe」 오너 카드 보이는지 Irene 눈 확인.
- 숨은 결함 1건: SA 화면에서 매장 정보 「수정 → 저장」 시 그 매장의 모든 연결(오너 연결 포함)을 지우고 감독 연결로 다시 만들어 오너 모자가 조용히 벗겨짐. 이번 사이클에 고친다. **다음 배포 전까지 SA 화면에서 with MIN Cafe 매장 정보 저장을 피할 것.**

### 캐시매니지먼트 삭제 — 되는데 구멍 하나
- 직원 직접 입력은 삭제·수정됨, 시스템 기록은 막힘 — 정상.
- 구멍: 마감한 교대의 입출금도 삭제·수정됨 → Z-리포트와 목록 어긋남. 운영 이런 건 0건. 「열린 교대만 수정·삭제」로 잠근다(입금 추가는 이미 그렇게 잠김).

### 2. AI — 돈 받고 붙이자는 맞는 방향. 결정 2개
- 사실: 「다 선택해야 한다」의 절반은 SW 5.65 로 이미 풀림 — 대조 화면 맨 위에서 총액·배송비만 적고 「이 총액으로 확정」 → 줄 안 맞춰도 저장·차액 목록에 남음. 줄 매칭은 원가 반영하고 싶을 때만. 버튼 안 보이면 알려 달라.
- AI 효과 큰 순: ①인보이스 사진 판독(첫 시범) ②공급업체 상품 대량 등록(가격표 사진/PDF→초안) ③메뉴판 사진→메뉴 초안 ④레시피 재료 연결·발주 수량·재고실사 요약·리포트 설명(뒤 순위, 일부는 AI 없이 통계로 먼저).
- 과금 권고: 「AI 판독」 부가 모듈 월정액 + 월 한도(월 N장). 없는 것은 「매장이 부가 모듈 따로 사는 칸」·「사용 횟수 세기」. 건당 크레딧은 충전·잔액·환불 구조가 커서 과함.
- 원가 추정(착수 때 실측): 사진 1장 ≈ RM 0.05~0.12, 월 100장 RM 5~12.
- 안전 조건: 서버 중계(키는 서버) · 사람 확인 전 저장 0 · 무료 판독기 기본, AI 는 매장이 켠 경우만 · 매장별 비용·호출 기록 · 실패율 실측 후 확대.
- 결정 ①(외부 AI 전송 허용) 권고 허용(매장 opt-in·서버 경유) / 결정 ②(과금) 권고 부가 모듈 월정액+월 한도. 답 오면 `/기능설계` 6단계, 첫 구현은 대조 화면 「AI 로 읽기」 버튼 1개.

### 3. GIT Consulting 배송비 — 300 이상 무료 · 미만 RM 10 지금 넣는다. 「페탈링자야만」은 칸 없고 지금 필요도 없음
- 위치: gitconsulting(BG) 로그인 → Plans & Payments → Payment Settings → 「배송 조건」 두 칸. 판매자 설정이라 브랜드 쪽.
- 브랜드 「with MIN」(발주 7)·「K-DINE with MIN」(발주 8) 둘 다 300/10. 확인: ①그 화면에 값 ②with MIN Cafe 관리자 발주 담기에서 판매자 with MIN 에 「RM 300 이상 무료 · 미만 RM 10」, 300 미만이면 총액에 10.
- 브랜드 1 의 외부 공급업체 「GIT Consult」(supplier_companies 37, 상품 0·발주 0)는 건드리지 않음.
- 지역: GIT 에 발주하는 매장은 with MIN Cafe·K-DINE IPC 둘뿐, 둘 다 Petaling Jaya → 이미 사실. 결정 ③ 권고: 지역 기능 만들지 않음(PJ 밖 매장이 발주하게 되는 날 만든다).

### 4. 참고용 메모 — 한다/안 한다/끝났다
| # | 항목 | 판정 | 조치 |
|---|---|---|---|
| a | RA 모자 부여 화면 없음 | 한다 | SA Staff Management 수정 창에 부여 칸 |
| b | 대조했는데 줄 단가 전부 빈 발주 | 끝났다 | 운영 0건 |
| c | 빌드 내 타입 검사 OOM | 한다 | 빌드 밖 tsc(기준 439) 를 배포 전 게이트, 늘면 차단 |
| d | 브랜드·푸드코트 모자·기존 아이디 연결 | 안 한다 | 새 기능, 수요 없음 |
| e | 배포 마이그 실패 반쪽 상태 | 한다 | 실패 시 그 배포 백업으로 자동 원복 후 멈춤 |
| f | 되돌리기 스크립트 거짓 성공 | 한다 | 경로를 배포 스크립트와 같은 소스로, node_modules·logs·설정 보존 (e 와 묶음) |
| g | 첫 방문 API 2회 | 한다 | 첫 설치면 새로고침 안 함, 자가 업데이트는 유지 |
| h | 운영 `_tmp_uname.js` | 한다 | dev 삭제 + rsync 임시파일 제외 |
| i | shared_with_stores 삭제 | 안 한다 | 재생성·전 매장 복사 위험, 남겨도 해 0, 문서에 「지우지 않음」 |
| j | 720px 설치 팝업이 버튼 가림 | 한다 | 모달 아래 층으로 |
| k | 마감 교대 입출금 삭제·수정 | 한다 | 위 캐시 답 |

이번 사이클 = 운영 데이터 2건(오너·배송비) 즉시 + 코드 「한다」 9건 한 묶음(빌드 1회·검증 1회) → Fable 게이트 → Irene `/배포`.

## Ⅱ. 팀원 실행 지시 (순서대로)

### 0단계
git status · session-state 확인, 타 도구 미커밋 없음 확인.

### 1단계 운영 데이터 2건 (코드보다 먼저)
**1-A 오너 연결** — 트랜잭션, 각 문장 영향행 1 확인 후 COMMIT, 하나라도 1 아니면 ROLLBACK·Fable 보고.
```sql
-- 사전 SELECT 저장: SELECT * FROM restaurant_managers WHERE restaurant_id=10; SELECT id,username,is_active FROM users WHERE id IN (23,64);
START TRANSACTION;
UPDATE restaurant_managers SET relationship_type='ownership', updatedAt=NOW()
 WHERE id=29 AND restaurant_id=10 AND manager_id=23 AND relationship_type='oversight';      -- 1행
DELETE FROM restaurant_managers
 WHERE id=45 AND restaurant_id=10 AND manager_id=64 AND relationship_type='ownership';      -- 1행
UPDATE users SET is_active=0 WHERE id=64 AND username='withmin_owner';                       -- 1행
COMMIT;
-- 사후 SELECT 같은 두 쿼리.
```
- 근거: `owner.js:490` 정식 승격 경로와 동일(제자리 UPDATE). 지우고 새로 만들지 말 것(is_primary 유지).
- 확인: 운영 gitconsulting 토큰으로 컨텍스트 목록 API 에 with MIN Cafe 오너 카드 1회 실호출.

**1-B 배송비 (브랜드 1·2)**
- 1순위 운영 API `PUT /api/brands/1/payment-settings`·`/2/…` body `{"min_order_amount":300,"delivery_fee":10}`.
- 자격 없으면 `UPDATE brands SET min_order_amount=300.00, delivery_fee=10.00 WHERE id IN (1,2) AND owner_id=23;` (2행).
- 사후 SELECT + 운영 GET payment-settings 응답에 두 값. supplier_companies 37 무접촉.
- 사전/사후 SELECT 원문을 Irene 보고에 첨부, session-state 에 `[Claude Code] 운영 데이터 변경 2건` 기록.

### 2단계 개발 코드 — 9건 한 묶음 (코드 확정 → 빌드 1회 → verify-all --full 1회)
백엔드(각 건 실호출 + 고장주입 1회):
- **R1 오너행 보존** `routes/restaurants-crud.js` :1929·:2002 — destroy 를 `relationship_type:'oversight'` 로 한정, bulkCreate 는 이미 ownership 행 가진 manager_id 제외. managers 응답 :299·:852 는 through 에 relationship_type 포함해 ownership 제외. 생성 :1270 무변경. 실호출: ownership 1+oversight 1 → SA 매장 수정 PUT → ownership 생존. 고장주입: 한정 제거 → 소실 재현.
- **R2 마감 교대 잠금** `routes/cash-management.js` PUT :442·DELETE :461 — shift status≠'open' 이면 400 `SHIFT_NOT_OPEN`(POST :418 과 같은 코드·문구). 프론트 0. 실호출 open 200/closed 400, 고장주입.
- **R3 타입 게이트** `scripts/verify-all.js` 에 빌드 밖 tsc(3584MB + i18next 스텁, 메모리 reference_type_gate_two_blocks), 기준선(439)보다 늘면 실패. heavy-task-gate 존중. 반증: 오류 1개 임시 파일.
- **R4 배포 안전망(e+f)** `deploy-to-production.sh`: rsync 직후 플래그, pm2 restart 성공 후 해제, ERR/EXIT trap 에서 플래그 서 있으면 이번 백업으로 백엔드·프론트 원복(node_modules·logs·.env 보존) 후 실패 종료. `rollback-production.sh`: 백업·DB 덤프(`/var/backups/orderhere/pre-deploy/db_predeploy_${TS}.sql.gz`)·.env 경로를 배포 스크립트와 같은 변수로, rm -rf+cp → 제외 rsync, 전 단계 skip 이면 실패 종료. 검증: dev 가짜 디렉터리로 함수 단위 재현. 두 스크립트 diff 통째로 게이트 첨부.
- **R5 임시파일** `_tmp_uname.js` git rm(✅ 완료·미커밋), `dev-backend/tmp/` 확인 후 정리, rsync `--exclude '_tmp_*' --exclude 'tmp/'`.
- **R6 문서** 「다음 정리에서 드롭」→「드롭하지 않음 — 재생성 마이그 위험, 칸 유지」. 코드 0.

프론트:
- **F1** `pages/Admin/StaffManagementPage.tsx` Edit 모달(:2003) 에 `UserContextsSection` — RA 탭만, 새 styled 금지, i18n 4언어.
- **F2** `index.tsx` — 등록 전 `hadController` 저장, false 면 reload 안 함. 검증: 새 프로필 reload 0·site-settings 1회 / SW bump 후 재방문 reload 1회(자가 업데이트 증명 필수).
- **F3** `components/Common/PwaInstallBanner.tsx` zIndex 9000 → 900. 720px·모달 열림 확인.
- 순서: F1~F3 → i18n:verify → SW bump 마지막 1회 → build:dev 1회 → verify-all --full 1회.

**게이트 제출(2회차 Fable):** check-sensitive-diff 결과 · diff 목록 · 실호출/고장주입 · sweep · 배포 스크립트 2개 diff 원문 · print-guard 변경 0. 사실만.

### 3단계 기록
session-state·DEVELOPMENT_PLAN. 후속 후보: b 끝남 / d·i 안 함 명시. 기록은 게이트 마커 뒤에.

### 하지 말 것
부여 API 409 완화 · printOrder* · 보호파일 8개 · 발주 총액 공식 · computeDeliveryFee 무접촉. 지역별 배송비 코드 0줄. AI 코드 0줄(결정 ①② 대기). d·i 착수 금지. 구현 중 세부 질문은 팀원 판단.

## Ⅲ. Irene 컨펌 필요 (권고)
- 결정 ① AI 외부 전송 → 허용(매장 opt-in · 서버 중계)
- 결정 ② AI 과금 → 부가 모듈 월정액 + 월 한도
- 결정 ③ 페탈링자야 지역 기능 → 만들지 않음
- 1·3 운영 데이터와 「한다」 9건은 Irene 원문이 지시이므로 재질문 없이 진행. 64 비활성화는 되돌릴 수 있어 함께 진행.
