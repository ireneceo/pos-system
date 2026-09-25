## 현재 작업 상태
**마지막 업데이트:** 2026-09-25 00:20 UTC
**버전:** 운영 v3.102 + 핫픽스 3 + SW 5.59 · 5.60 · 5.61(마지막 배포 2026-09-24 22:56, 백업 20260924_225639)
**작업 상태:** 개발완료(커밋) — 오너 공급업체 상속 + 오너 발주 전체 표(SW 5.62)는 **개발 완료·미배포, Fable 게이트 대기**

### 진행 중인 작업
- ⏸ **오너 공급업체 상속 + 오너 발주 전체 표 (SW 5.62-owner-supplier-20260924)** [Claude Code] — Fable «오너=슈퍼바이저» 판정 §1-A·§2-B 그대로 구현(Irene 「마저 해」). 개발 완료·검증 완료, **남은 것: Fable 게이트 판정 1회 → /배포 → 운영 확인**.
  - 설계·동작: `docs/SUPPLIER_CONTRACT_SYSTEM.md` §H-3 · 기록 `dev-backend/releases/2026-09-24-owner-supplier.json`
  - 운영 DB 마이그 있음: `scripts/migrate-owner-supplier-enum.js`(ENUM 'owner' 추가, expand-only, deploy 등록). **배포 스크립트 마이그 실패 동작 결함(별도 사안)을 Fable 이 «다음 마이그 동반 배포 전 처리 권고»** — 게이트 때 함께 판정받을 것.
  - 증명: API 35/35 · 실브라우저 30/30(1440·390) · health-check security 67/67(신규 오너 공급업체 검사) · 고장주입 5종(백엔드 4·화면 1, 전부 원복 cmp) · verify-all --full 23/23(mount sweep 크래시 0).
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
- **SW 5.62 오너 공급업체 — Fable 게이트 → /배포 → 운영 확인** (Irene 「다음 섹션에 마저 할게」)

### 👉 Irene 님이 하실 일
1. **withmin_owner(irene@gitconsulting.group) 인증 메일 클릭 → 「비밀번호 찾기」로 비번 설정** — 운영 email_verified=0 확인(2026-09-24)
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
