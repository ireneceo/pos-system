# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-15
**버전:** **v3.31** (운영 배포 완료) + dev 누적 (Install 버튼 promptInstall 복원, 운영 미반영)
**작업 상태:** 완료 (health-check 80/80, hydration 0 warning), Irene `/배포` 명령 대기

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션, 2026-05-15)

**v3.31 운영 배포 + 배포 후 추가 개발 + 매장 메뉴 긴급 복구**

- v3.31 운영 배포 (Brand Menu System + Customer Display 자동화 + 메뉴 이미지 fix + i18n RA 한국어 18건 + RA/BG 전수 검사)
- **운영 매장 메뉴 긴급 복구** — 배포 시 `migrate-brand-menu-system.js` 자동 실행 누락으로 매장 메뉴 안 보이던 결함. 마이그 + backend restart 로 즉시 복구. 데이터 손실 0
- `deploy-to-production.sh` 에 brand menu 마이그 자동 단계 추가 (재발 방지)
- `brandMenuSyncService.js` push 정책 — BG push 메뉴 매장에 `is_active=false` 도착, 매장이 활성화 결정
- Brand Menu System 통합 검증 27/27 PASS (push + lock + version bump + sync + soft unlink + 자체 메뉴 자유)
- RA/BG 전수 기능 검사 — RA GET 26 + CRUD 13, BG GET 24 + CRUD 20
- **Customer Display 전화번호 토글** (신규) — Settings → Printer 카드. 매장 단위 `operation_settings.checkout_display.show_phone_input` 저장. 멤버십 안 쓰는 매장 OFF
- /install 페이지 정리 — 페이지 삭제 + `/install` → `/` redirect, Header/Footer 메뉴 제거
- 사이드바 Install 버튼 promptInstall 직접 호출 복원 — 데스크탑 + iOS 모두
- 식재료 이미지 업로드 fix — IngredientsTab + ProductIngredientsTab → ImageUploadDropzone 교체
- 메뉴 이미지 업로드 fix — maxSize 디폴트 10MB, HEIC alert, BG BrandMenusPage 텍스트 input → 컴포넌트 교체
- Customer Display 자동화 (Window Management API + Settings 가이드)
- buildVersionWatcher 자동 reload (CF 5분 캐시 우회)
- i18n RA 한국어 18건 fix + 글로서리 자동 16건 + 신규 도구 2개
- 운영 진단 패턴 + 운영 배포 룰 강화 메모리

### 다음 확정 작업
- 없음 — 지시 대기
  (참고: dev 누적 변경 운영 반영은 Irene `/배포` 명령 시점)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- dev 누적 변경 운영 반영 (Install 버튼 promptInstall 복원 — main.30919f86.js)
- IDOR 보안 sweep — RA 가 다른 매장 GET 시 200 반환 결함 (이번 세션 검증 중 발견, preexisting)
- BG 가 산하 매장 operation_settings PUT 200 — 의도 design 인지 보안 결함인지 비즈니스 결정 필요
- zh/ms i18n 영어 잔존 (RA 사용 페이지 외 — Admin/Brand/Foodcourt namespace) 전수 fix
- `nav.install` / `nav.installApp` / `installPage.*` i18n dead key 4언어 정리
- Cloudflare API 토큰 추가 + `deploy-to-production.sh` 에 CF cache purge 자동화 (buildVersionWatcher 의 4분 대기 즉시 단축)
- BG → RA 가격 자동 재계산 (재료 cost 기반), Bulk push 페이지, Menu Template 라이브러리
- Reservation 후속 — deposit / 캘린더 monthly view / WaitingList / 환불 cron (스프린트 규모, `/기능설계` 필요)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
