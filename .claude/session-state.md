# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-12
**버전:** **v3.29** (2026-05-12 운영 배포 완료 / smoke 10/10)
**작업 상태:** 배포 완료

---

## ⚡ 빠른 재개

```
session-state.md 읽고 이어서 개발해.
```

---

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 2026-05-12)

**v3.29 운영 배포 완료 (smoke 10/10, 빌드 main.f00fad6b.js)**

- 배포 스크립트 `/var/www/deploy-to-production.sh --auto` 실행
- DB 스키마 dev/prod 일치 (130 tables, post-sync 재확인)
- Backend 19 파일 rsync + Frontend 716 파일 rsync
- Migration 자동 실행: sprint4/5/6/7 + supplier-staff + soa-invoice + referral + cleanup × 3 (users/restaurants/sequelize duplicate indexes)
- Seed sync 97 updated
- PM2 production-backend 재시작 + Nginx reload
- 운영 health 정상 (production env, uptime 3s confirmed)
- 백업 `/var/www/backups/20260512_205708`

**v3.29 릴리즈 콘텐츠 자동 등록**

- 랜딩 블로그 `release-v3.29` (id=88, /blog/release-v3.29 → 200)
- System Admin 공지 id=56 (운영 5 수신자 자동 생성)
- 왓츠앱용 릴리즈 노트 ko + en 출력 완료

**문서 업데이트**

- CHANGELOG.md — `[Unreleased]` → `[v3.29] — 2026-05-12 배포` 이동
- DEVELOPMENT_PLAN.md — v3.29 배포 결과 + 포함 변경 섹션 상단 추가
- session-state.md — 본 파일 갱신

### 다음 할 일

1. 후속 후보 (우선순위):
   - **Reservation R2** — deposit 결제 UI / 캘린더 monthly view / WaitingList / 보증금 자동 환불 cron
   - **Reservation 동시 booking race window** — advisory lock 또는 SERIALIZABLE 트랜잭션 (Known WONTFIX, R1에서 후속 명시)
   - **SubscriptionsPage Edit SubscriptionFormFields 통합** — Status dropdown + "others" custom plan 보존 설계 필요
   - **PageSettingsLink i18n** — `<PageSettingsLink>` 라벨 4언어 (현재 영어 고정)
   - **`_localToUTC` DST 보정** — 현재 `now` 기준 offset 사용. MY/KR/SG 무영향이지만 미래 대비
   - **운영 demo 시드 ID 파라미터화** — 데모 계정 마킹 스크립트 하드코딩 정리

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
