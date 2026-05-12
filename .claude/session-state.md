# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-12
**버전:** **v3.28** (Unreleased 누적 / 미배포)
**작업 상태:** 완료

---

## ⚡ 빠른 재개

```
session-state.md 읽고 이어서 개발해.
```

---

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 2026-05-12 후반)

**Backend 안정화 + 예약 timezone 정상화 (미배포)**

- **DB 중복 unique 인덱스 521건 일괄 정리** — `users` 64-key 한도 임박. `username_2`/`email_3`/... 19 테이블에 누적. `scripts/cleanup-duplicate-indexes.js` 신규 (dry-run + apply)
- **`sequelize.sync()` startup OFF** — 매 재시작마다 unique 인덱스 누적 추가 결함. 기본 비활성, `STARTUP_DB_SYNC=true` 로만 활성. 미실행 시 인덱스 정리만 자동 (`server.js`)
- **`sync-database.js` 안전 모드** — `--alter` 명시 시에만 실행 + 직후 자동 중복 정리
- **`push.js` IPv6 rate-limit fix** — `keyGenerator` 가 `req.ip` 그대로 → `ipKeyGenerator(req.ip)` 로 IPv6 정규화. 미적용 시 push 라우트 등록 실패 (express-rate-limit 8+ validation)
- **Foodcourt General Reports 라우트 차단 버그 fix** — `addon_modules.fc_stats.ui_routes` 가 `/pos/foodcourt/general/stats` (미존재 React route) 였던 매핑 오류. `/pos/foodcourt/general/reports` 로 갱신
- **예약 슬롯 생성 timezone 정상화** — `reservations-public.js calcSlotAvailability` 가 server-local (UTC) 로 영업시간 / 슬롯 일자 산출하던 결함. 레스토랑 `operation_settings.timeZone` 으로 모두 변환. `dateTimeHelper` 에 `localClockToUTC` / `formatTimeInTZ` 헬퍼 추가
- 예약 스태프 list API (`GET /reservations/restaurant/:id`) 일자 필터도 동일하게 `getDateBounds(date, tz)` 적용
- 예약 시드 데이터 (restaurant_id=5 Test3/KR) 5건 정상화 — UTC 19:30 → 10:30 (KST 19:30 표시)
- health-check.js — `db` 카테고리 추가 (인덱스 ≤ 15, 동일 컬럼·uniqueness 중복 0건). 78 → 80 케이스
- Test3 (`kdine-korean`) reservation_settings 활성화 — 모바일 OrderTypePage 에 "📅 Reserve a Table" 카드 노출

### 검증
- 빌드 main.6471d9fd.js (exit 0, 0 신규 경고)
- Health-check 80/80 통과 (db 카테고리 신규)
- /api/reservations/availability/8?date=2026-05-13&party=2 → 26 슬롯, label 09:00 (= 01:00 UTC + 8h MY) 정상
- pm2 restart 후 ER_TOO_MANY_KEYS 사라짐, 인덱스 정상 유지 (auto-purge 동작)
- DB 사전 백업 `/var/www/backups/dev-daily/20260512/purple_dev_db_pre_index_cleanup.sql` (8.8M)

### 이전 누적 작업 (2026-05-12 전반)
- 예약 UI 정렬 + SVG favicon 버그 fix + 앱 아이콘 교체 (commit 3e74a2a2)
- 사이드바 2단 구조 전면 리디자인 + 헤더 80px 통일 (2026-05-11, 운영 배포 완료)
- Reservation R1 customer_id fix + 백필 스크립트
- ManagersPage / RestaurantsPage SubscriptionFormFields 통합
- User.auto_renew 컬럼 추가

### 다음 할 일

1. **버전 결정** — 사이드바 UX + backend 안정화 큰 변경 → v3.29 올릴지 (CHANGELOG Unreleased → v3.29 이동 + 릴리즈 노트 + 블로그)
2. 후속 후보 (우선순위):
   - 운영 DB 도 동일하게 중복 인덱스 정리 + sync OFF 배포 (배포 명령 시)
   - Reservation R2 — deposit 결제 UI / 캘린더 monthly view / WaitingList / 보증금 자동 환불 cron
   - Reservation 동시 booking race window — advisory lock 또는 SERIALIZABLE 트랜잭션
   - SubscriptionsPage Edit SubscriptionFormFields 통합 검토 (Status dropdown + custom plan 보존 설계)
   - PageSettingsLink i18n 4언어
   - 운영 demo 시드 ID 파라미터화

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
