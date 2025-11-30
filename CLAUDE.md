# Claude Code 프로젝트 규칙

## 배포 규칙 (필수!)

### 운영서버 배포 금지
- **운영서버 배포는 절대로 자동으로 하지 않는다**
- 운영서버 배포는 **오직 사용자가 `/배포` 명령어를 실행했을 때만** 수행한다
- 개발 완료 후 "배포할까요?" 같은 질문도 하지 않는다
- `deploy-production.sh` 스크립트는 `/배포` 명령어 없이 실행하지 않는다

### 개발서버 배포
- 개발서버(`dev-backend`, `dev-frontend`)는 자유롭게 배포 가능
- 배포 방법은 `.claude/commands/배포.md` 참고

### 배포 관련 파일
- `/배포` 명령어: `.claude/commands/배포.md`
- 배포 스크립트: `deploy-production.sh`
- 롤백 스크립트: `rollback-production.sh`
