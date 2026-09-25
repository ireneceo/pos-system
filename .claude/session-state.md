## 현재 작업 상태
**마지막 업데이트:** 2026-09-25 00:20 UTC
**버전:** 운영 v3.102 + 핫픽스 3 + SW 5.59 · 5.60 · 5.61 · **5.62**(마지막 배포 2026-09-25 07:26, 백업 20260925_072023)
**작업 상태:** SW 5.62 운영 배포 완료 — **Irene 운영 눈 확인 대기** + 오너 계정 이름 교체(Irene 직접)

### 진행 중인 작업
- ⏳ **SW 5.62 운영 확인 (Irene 눈)** — 배포는 끝났고 확인만 남음. withmin_owner 로그인 → 발주 목록 «내 매장 전체(N)»·줄마다 매장 이름 → «My suppliers» → 업체 1개 등록 → with MIN Cafe 매장 계정에서 «FROM OWNER» 카드(Edit/Delete 없음).
  - 설계·동작: `docs/SUPPLIER_CONTRACT_SYSTEM.md` §H-3 · 기록 `dev-backend/releases/2026-09-24-owner-supplier.json`
  - 운영 마이그 적용 확인: 배포 로그 「[migrate-owner-supplier-enum] 추가 owner」 2컬럼 · 패리티 ENUM 소실 0 · 스모크 10/10 · 운영 sw.js `5.62-owner-supplier-20260924`
  - Fable 게이트 PASS(마커 `a0a5a4f24572`) — 설계 외 변경 0 · print-guard 8/8 · security 67/67 · Fable 실호출 28/28
  - 오너 사이드바 «Suppliers» 메뉴는 🔒 MainLayout 이라 미반영 — 발주 화면 «My suppliers» 버튼이 입구. 한 줄 추가는 Irene 승인 + print-guard bless 필요.

### 완료된 작업 (2026-09-24 세션) [Claude Code]
- ✅ SEO 백엔드 HTML — v3.102 운영 + 운영 nginx 교체(Irene sudo). 남은 것: 2026-10-15 전후 Search Console 재판독
- ✅ 보안 핫픽스 3(운영): /auth/register 410 · 오너 claim 가로채기 차단 · 옛 결제 기록 API 410 · 비밀번호 찾기 미인증 발송
- ✅ with MIN 멀티 아이디(Fable A~D): gitconsulting ← with MIN Cafe 관리자 자격(운영 17:11 실사용 확인) · 오너 withmin_owner(64) 신설·매장 10 소유 연결 · with MIN 오너 승인 OFF
- ✅ 오너 발주 보기(SW 5.59, 운영)
- ✅ 브랜드 공급업체 «매장에 공유» = 복사본 · 상속 종료(SW 5.60, 운영): 사본 23(꺼진 채 2)·실패 0 · 연결 301·발주 31·청구서 20(RM 4,745.47)·원가이력 20 이전 · New Seoul Mart 지워진 상품은 지워진 채 복사
- ✅ 공유 창 보완(SW 5.61, 운영): 공유 실패 사유가 지워지던 버그 · 옵션 업체 사전 잠금 · 카드 공유 매장 수 · 모두 선택 · 삭제 안내
- ✅ 오너 공급업체 상속 + 오너 발주 전체 표(SW 5.62, 개발) — 위 «진행 중»

### 다음 확정 작업
- 없음 — Irene 지시 대기.
  (직전 사이클 종료: SW 5.62 운영 배포 2026-09-25 07:26. 남은 것은 Irene 눈 확인 2건 = 오너 화면 동작 · 오너 계정 이름 교체.)

### 완료된 작업 (2026-09-25 세션) [Claude Code]
- ✅ **SW 5.62 오너 공급업체 상속 + 오너 발주 전체 표 — 운영 배포**(07:26, 백업 20260925_072023, 스모크 10/10). Fable 게이트 PASS(`a0a5a4f24572`). 운영 ENUM 'owner' 2컬럼 적용 확인.
- ✅ **오너 컨텍스트 원인 판정**(Fable) — Irene 「이메일 인증해도 오너가 안 나온다」는 버그 아님. 오너는 **별도 계정 withmin_owner** 로 만들어졌고, 「Choose where to work」는 로그인한 계정 하나의 것만 보여준다. 한 아이디에 오너 모자를 얹는 것은 설계가 v1 에서 명시 제외(`user_contexts.entity_type` ENUM 에 'owner' 없음 · 오너 권한은 `restaurant_managers` 신원 기반). 한 아이디 통합은 **백로그**(운영 마이그·권한 판정·청구 정체가 얽힘 — Irene 이 「반드시」 할 때만).

### 👉 Irene 님이 하실 일
1. **withmin_owner(irene@gitconsulting.group) 는 «별도 계정» — 지금 쓰시는 아이디에 오너가 붙은 것이 아닙니다.** 그 계정으로 **따로 로그인**해야 오너 화면이 나옵니다: 인증 메일 클릭 → 「비밀번호 찾기」로 비번 설정 → 로그인(다른 브라우저 권장). 운영 email_verified=0 확인(2026-09-24).
   - 「Choose where to work」에 오너 줄이 안 나오는 것은 정상 — 그 목록은 로그인한 계정 하나의 것만 보여주고, 오너는 한 아이디에 모자로 얹을 수 없는 구조다(`docs/MULTI_CONTEXT_LOGIN_DESIGN.md` §5.2 v1 부여 = restaurant × Restaurant Admin 만 · `user_contexts.entity_type` ENUM 에 'owner' 없음 · 오너 권한은 `restaurant_managers` 신원 기반). Fable 판정 2026-09-25.
   - 오너 계정 표시 이름 「with MIN Cafe Owner」는 구조가 아니라 지난 세션이 지어 넣은 **이름값** — 오너는 매장 N개를 거느리므로 매장 이름을 붙이면 안 된다. Fable 제안값: full_name `Irene Kim` / 회사 `GIT Consulting`. **System Admin > Users 에서 Irene 이 직접 수정**(운영 쓰기라 팀원 불가).
2. New Seoul Mart 멸치액젓 재료를 매장 화면에서 새 상품(800g RM 19.00 · 2.5kg 단가 0 확인)에 다시 연결 — 권고
3. 오너 사이드바 «Suppliers» 메뉴 추가 승인 여부(🔒 인쇄 보호 파일)
4. with MIN 오너 승인은 OFF 상태 — 오너 승인 흐름을 쓰려면 다시 켜기
5. 2026-10-15 전후 Search Console 재판독 · (선택) 개발 nginx noindex 적용

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- 배포 스크립트: 마이그 실패 시 pm2 재시작 없이 멈춰 «디스크 새 코드 + 옛 프로세스», autorestart 가 미검증 코드를 올릴 수 있음 · rollback-production.sh 가 배포 전 DB 덤프(/var/backups/orderhere/pre-deploy/db_predeploy_*)를 못 찾음(Fable: 다음 마이그 동반 배포 전 처리 권고)
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
