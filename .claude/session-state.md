# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-01 (v3.21 운영 배포 + sysops cross-backup 정돈)
**버전:** **v3.21** (운영, 2026-05-01 배포)
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)

**🎯 v3.21 운영 배포 (2026-05-01)**
- 리퍼럴 시스템 Phase 1+2+3 완성 (DB 6 모델 + 27 endpoint + 7 페이지 + 7 이메일 + i18n 4언어 1152 키)
- 5 치명결함 fix (cancel hook / overview funnel + 시계열 / 사이드바 잔액 / delete guard 409 / per-route rate limit)
- Suspended account UX 재설계 (로그인 차단 → invoice 페이지 redirect + SuspendedBanner + refreshUser hook)
- IDOR fix 7 endpoint (orders × 3, activity-logs × 2, invoices × 4, membership × 2)
- Invoice 카운트 정합성 fix ('sent' legacy → 정상 ENUM, 9 vs 1 → 9 vs 9)
- SignupPage 인증 차단 + ?ref= 입력 필드 숨김
- 한국어 "수수료" → "커미션" 26 키 + 조사 보정 10건
- SA Partners detail Modal (5섹션)
- Wallet UX 단순화 (필터 5→3, Stats 3→2)
- 운영 Staff fix (RA 자기 매장 staff 관리)
- DB 마이그레이션 통합 cleanup-sequelize-duplicate-indexes (17 테이블 769 중복 정리)
- migrate-referral 자동 실행 (운영 6 테이블 + User 6 컬럼 생성)
- health-check 67 → 72 (security IDOR 5건 영구 추가)
- 운영 배포 + 라이브 헬스 정상 (frontend 4/4 200, backend ok, PM2 online)

**🛡️ 양방향 cross-backup 정돈 (sysops)**
- POS 운영 backup-database.sh cross-backup 디렉토리 production → production-pos
- dev cleanup 동일 통일
- 1회 수동 실행 → dev 도착 검증 (1.9 MB)

**📚 문서 + 콘텐츠**
- CHANGELOG v3.21 섹션 추가 + sysops 항목
- DEVELOPMENT_PLAN v3.21 완료 섹션
- 메모리 reference_suspended_pin + reference_idor_sweep 신규
- 랜딩 블로그 + System Admin 공지 자동 등록 (dev + 운영 양쪽 sync)

### 다음 할 일

1. **운영 cron user 이전** (사용자 sudo 비번 직접 입력 필요 — 별도 세션):
   - 운영서버에서 `/var/backups/orderhere/` chown irene
   - root crontab에서 backup 라인 제거 → irene crontab으로 이전
   - 1회 수동 실행 + 다음날 03:00 자동 도착 확인
   - 안 하면 dev 측 cross-backup이 자동으로 안 도착 (수동만 가능)

2. **브라우저 E2E 검증** (Irene 수동, 25분):
   - RP 가입 → POS 가입 with code → 첫 인보이스 20% 할인 → 결제 → 커미션 → wallet → payout 요청 → Admin 승인 → 7종 이메일 수신
   - 11단계 체크리스트는 이전 session-state 참조

3. **운영 SMTP 7종 메일 수신 확인**:
   - 배포 직후 commissionCreditedEmail / payoutRequestedAdminEmail 등 실제 이메일 도달 검증

---

## 환경 / 인증 현황

- 백엔드: dev-backend (PM2, port 3001), production-backend (PM2, port 3002)
- 프론트: nginx → /var/www/dev-frontend-build (dev 19:12 main.68bc67df.js); 운영 production-frontend
- DB: purple_dev_db / purple_production_db (MySQL)
- 테스트 계정: kdine_admin (Restaurant Admin, restaurant_id=5, restaurant.status='suspended')

---

## 주요 문서 위치

- `/var/www/CLAUDE.md` — 프로젝트 워크플로우 + 검증 절차
- `/var/www/DEVELOPMENT_PLAN.md` — Phase 로드맵 + 작업 히스토리
- `/var/www/CHANGELOG.md` — v3.21 배포 내역
- `/var/www/dev-frontend/UI_DESIGN_GUIDE.md` — Modal 패턴, 디자인 토큰
- `/var/www/docs/REFERRAL_SYSTEM.md` — Phase 1~3 설계 (구현 완료)
- `/var/www/docs/INVOICE_SYSTEM.md` — 11절 SOA 재설계 (B1)
- `/var/www/docs/SUPPLY_CHAIN_SPRINT_*.md` — Sprint 1~7 설계 문서

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
