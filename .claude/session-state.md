## 현재 작업 상태
**마지막 업데이트:** 2026-01-30 UTC
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)

#### 주방 티켓 개별 출력 기능
- Settings > Printer Settings에 "Print separate ticket for each item" 토글 추가
- RawBT(Android): 아이템별로 500ms 간격으로 개별 티켓 출력
- 브라우저 인쇄: 멀티페이지 HTML로 page-break-after 적용
- **파일:** `dev-frontend/src/pages/Settings/SettingsPage.tsx`, `dev-frontend/src/utils/billPrint.js`

#### 배포 스크립트 v3.0 개선
- **문제:** sudo 비밀번호 필요, 배포 10분+ 소요
- **해결:**
  - nginx 명령만 NOPASSWD로 sudoers 설정
  - 불필요한 단계 제거, 병렬 처리
  - --auto 플래그로 CI/CD 자동화 지원
- **결과:** 배포 시간 88초로 단축
- **파일:** `deploy-production-v3.sh`, `/etc/sudoers.d/deploy-permissions`

#### 레시피/상품 이미지 URL 통합
- yield_amount, yield_unit, image_thumbnail 컬럼 추가
- nginx /uploads location 설정
- 운영 DB 스키마 동기화 완료

#### 운영서버 배포 완료
- 배포 커밋: 6b0a156
- 백업: `/var/www/backups/20260130_*`

### 다음 할 일
1. Phase 2: DB 테이블 생성 (11개 테이블)
2. 메뉴 로딩 성능 최적화 (이미지 24MB 문제)
3. Kitchen Display 개선 (Pending 아이템별 Done 버튼)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
