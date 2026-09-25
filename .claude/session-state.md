## 현재 작업 상태
**마지막 업데이트:** 2026-09-25 09:40 UTC
**버전:** 운영 v3.102 + 핫픽스 3 + SW 5.59 · 5.60 · 5.61 · **5.62**(마지막 배포 2026-09-25 07:26, 백업 20260925_072023)
**작업 상태:** SW 5.62 운영 배포 완료 · 오너 모자(v1.1) **개발 중단 저장**(Irene 외출, 「다음 섹션에 계속 할게」)

### 진행 중인 작업
- 🔨 **오너 모자 = 소유행 파생 (v1.1)** [Claude Code] — 백엔드 완료 · 프론트 절반 · **빌드 전**
  - **왜**: Irene 「기존 아이드 연결 기능 넣었어?」 — 지금은 오너·브랜드·공급업체가 전부 별도 계정이라 역할마다 새 아이디를 만들어야 했다. 한 아이디에서 오너까지 고르게 만든다.
  - **핵심**: 오너 권한은 `restaurant_managers` 소유행 **하나로만** 판정 → **부여 = 소유행 생성**. `user_contexts` ENUM 확장·**운영 마이그 0건**. 롤백 = 코드 되돌리기만.
  - 👉 **남은 작업 지시서 전문 = `.claude/owner-hat-remaining.md`** (다음 세션은 이 파일부터 읽는다)
  - 기록: `dev-backend/releases/2026-09-25-owner-hat.json`
  - ✅ 완료: 백엔드 5파일(`userContexts.js`·`middleware/auth.js`·`routes/auth.js`·`routes/users.js`·`socketService.js`) + 프론트 3파일(`AuthContext`·`ContextSelectPage`·`HeaderContextSwitcher`) + jest ⑦ 8건 + health-check auth 2건
  - ⬜ 남음: **F4** `UserContextsSection.tsx`(역할 선택 2개·소유행 목록·회수) · **F5** i18n 4언어 · **H** 설계문서 §5.4 → 빌드 1회 → `verify-all --full` 1회 → 실브라우저 → **Fable 게이트** → `/배포`
  - 검증(현재까지): jest **25/25** · health-check auth **12/12** · **고장주입 2/2 반증 성립**(원복 cmp 동일·잔여 0) · 🔒 print-guard **8/8 무변경**
  - ⚠ **빌드·SW bump 안 했다** — 프론트가 남아 「코드 확정 후 빌드 1회」 규칙대로 미실행
  - 🔴 **`check-sensitive-diff` = FABLE 게이트 대상**(⑤ 보안 경계 2건: `middleware/auth.js`·`routes/auth.js`). **Fable 게이트 통과 전 배포 금지**
  - 🔴 **F4·F5·H 는 Fable 이 코드·문안까지 확정했다. 새로 판단하지 말고 그대로 옮겨 적을 것** (Irene 「너가 판단하지마. 이건 복잡한 구조야」)

- ⏳ **SW 5.62 운영 확인 (Irene 눈)** — 배포는 끝났고 확인만 남음. withmin_owner 로그인 → 발주 «내 매장 전체(N)»·줄마다 매장 이름 → «My suppliers» → 업체 1개 등록 → with MIN Cafe 매장 계정에서 «FROM OWNER» 카드(Edit/Delete 없음)

### 완료된 작업 (2026-09-25 세션) [Claude Code]
- ✅ **SW 5.62 오너 공급업체 상속 + 오너 발주 전체 표 — 운영 배포**(07:26, 스모크 10/10). Fable 게이트 PASS(`a0a5a4f24572`). 운영 마이그 적용 확인(배포 로그 「추가 owner」 2컬럼 · 사후 패리티 ENUM 소실 0 · 운영 sw.js `5.62-owner-supplier-20260924`)
- ✅ **Irene 신고 2건 원인 판정**(Fable) — 「이메일 인증해도 오너가 안 나온다」는 버그 아님. 오너는 **별도 계정 withmin_owner**, 「Choose where to work」는 로그인한 계정 하나의 것만 보여준다. 「with MIN Cafe Owner」는 구조가 아니라 **지어 넣은 이름값**
- ✅ **「기존 아이디 연결 기능」 부재 실측** — 저장소에 0건. 있는 것은 SA 의 「매장 × 매장관리자」 자격 하나뿐이고 부여 화면에 역할 선택 칸 자체가 없었다
- ✅ **오너 모자 설계 판정**(Fable 2회차, B안 개시) + **코드 형태까지 지정한 실행 지시서**(Fable 3회차)
- ✅ 오너 모자 백엔드 구현 + 테스트 + 고장주입 2/2 (위 「진행 중」)

### 다음 확정 작업
- **오너 모자(v1.1) 이어서** (Irene 「다음 섹션에 계속 할게」)
  1. F4 `UserContextsSection.tsx` → 2. F5 i18n 4언어 → 3. H 설계문서
  4. `npm run i18n:verify` → `npm run build:dev` **1회** → `verify-all --full` **1회**(sweep 11분)
  5. 실브라우저(dev): demo BG 22 에 rid 18 소유행 부여 → 선택 화면 3카드(◯ 「Test Debug Restaurant」) → 오너 대시보드 → 헤더 제목 → 브랜드 복귀 → SA 부여/회수 → **끝나면 소유행 삭제**
  6. `check-sensitive-diff` → **Fable 게이트 1회** → Irene `/배포`

### 👉 Irene 님이 하실 일
1. **SW 5.62 운영 눈 확인** (위 ⏳ 항목)
2. **`withmin_owner`(irene@gitconsulting.group)는 «별도 계정»** — 지금 쓰시는 아이디에 오너가 붙은 게 아닙니다. 그 계정으로 **따로 로그인**해야 오너 화면이 나옵니다(인증 메일 → 「비밀번호 찾기」로 비번 설정 → 로그인, 다른 브라우저 권장). 운영 email_verified=0(2026-09-24)
   - ⚠ 단, **오너 모자가 배포되면 이 절차가 필요 없어집니다** — gitconsulting 계정에서 바로 오너를 고르게 됩니다
3. **오너 모자 배포 후 순서 고정**(Fable 판정): SA 화면에서 ①gitconsulting 에 「오너 · with MIN Cafe」 부여 → ②`withmin_owner`(64)의 소유 회수 → ③64 비활성화
   - 근거: `subscriptions.js:90` 이 매장 청구 대상을 **첫 소유행 1개**로 뽑아 소유자가 둘이면 비결정
4. **64 의 로그인 이력 확인** — SA Users 에서 마지막 로그인이 비어 있는지. 비어 있으면 오너 데이터 0 증명(로그인 없이는 못 만듦). **비어 있지 않으면 알려주세요**
5. (기록용) with MIN Cafe 구독 «billed to» 가 브랜드인지 확인
6. New Seoul Mart 멸치액젓 재료를 매장 화면에서 새 상품(800g RM 19.00 · 2.5kg 단가 0 확인)에 다시 연결 — 권고
7. 오너 사이드바 «Suppliers» 메뉴 추가 승인 여부(🔒 인쇄 보호 파일)
8. with MIN 오너 승인은 OFF 상태 — 오너 승인 흐름을 쓰려면 다시 켜기
9. 2026-10-15 전후 Search Console 재판독 · (선택) 개발 nginx noindex 적용
10. **버전 v3.103 올릴지 미정** — 오너 모자까지 묶어서 한 번에 올리는 것을 권고드렸고 답 대기

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **Fable 지시서 G3 의 기대 1건이 실측과 달랐다** — FI-A 가 G1 첫 테스트를 깨지 않았다(그 테스트는 다른 함수 경로). 반증은 health-check 에서 성립. Fable 에 사실만 보고했고 판정은 아직 안 받음
- 브랜드·푸드코트 모자를 한 아이디에 얹기 · 「기존 아이디 연결」 셀프서비스 · 초대/요청 흐름 — **오너 모자 범위 밖**(Fable 이 명시 제외)
- 배포 스크립트: 마이그 실패 시 pm2 재시작 없이 멈춰 «디스크 새 코드 + 옛 프로세스», autorestart 가 미검증 코드를 올릴 수 있음 · **`rollback-production.sh` 는 지금 그대로는 못 쓴다**(로컬 경로 `/var/www/production-backend`·`db_backup_` 을 찾는데 실제 백업은 운영서버 `/var/www/backups/<TS>/production-backend` 와 `/var/backups/orderhere/pre-deploy/db_predeploy_<TS>.sql.gz`) — Fable: 다음 «단순하지 않은 마이그» 배포 전에 처리
- site-settings 이중 호출(App.tsx:483 · SiteSettingsContext.tsx:72) — 이동 중 abort 를 console.error 로 찍음, 기능 영향 없음
- 운영 production-backend/_tmp_uname.js(2026-08-30 잔여) 정리
- supplier_companies.shared_with_stores 칸 드롭(더 이상 안 읽음)
- GET /api/supplier-catalog ?supplier_id= 가 계약 목록을 무시(기존 부채)
- 이전 메모: 720px Windows 앱 홍보 팝업이 버튼 가림 · 인보이스 대조 e2e spec · 브랜드 상품 값 채우기 등

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
