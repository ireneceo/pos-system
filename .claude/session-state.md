## 현재 작업 상태
**마지막 업데이트:** 2026-01-28 21:02 UTC
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)

#### PM2 메모리 설정 수정 (서버 크래시 방지)
- **문제:** production-backend가 "JavaScript heap out of memory"로 크래시
- **원인:** node_args `--max-old-space-size=384` 너무 작음 (538MB 사용 중 죽음)
- **해결:**
  - `--max-old-space-size=768` (384MB → 768MB)
  - `max_memory_restart: '800M'` (512MB → 800MB)
- **파일:** `/var/www/ecosystem.config.js`

#### /저장 명령어 생성
- 세션 상태를 session-state.md에 저장하는 명령어
- **파일:** `/var/www/.claude/commands/저장.md`

#### 운영서버 배포 완료
- 운영 DB에 누락 컬럼 추가: general_stock.owner_id, general_stock_categories.owner_id
- 배포 커밋: 30b405f
- 백업: `/var/www/backups/20260128_205647`

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
