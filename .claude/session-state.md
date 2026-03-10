## 현재 작업 상태
**마지막 업데이트:** 2026-03-10
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
1. 브랜드 로고/파비콘 정적 파일 방식 전환 (base64 API → `/uploads/logos/*.png` 직접 참조)
2. imageProcessor.js에 saveImageToFile() 유틸 추가
3. 프론트엔드 4곳 API fetch 제거 (LandingHeader, MainLayout, LoginPage, POSTerminalPage)
4. DB base64 → 파일 마이그레이션 스크립트 작성 및 실행 (dev + production)
5. K-Dine Korean Restaurant 관리자(admin_id) 연결 수정 (운영DB)
6. 운영서버 배포 완료 (Smoke 6/6)

### 다음 할 일
- Plan type 변경 후 배포 시 보존 여부 확인
- 서비스 오픈 준비 로드맵 Phase A~C 진행

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
