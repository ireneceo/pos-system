# Fable 판정 — 서버 확장성 정비 (2026-11-08 · 작업방 3be6f3de)

## 설계 (1회)
- 지금 할 것: ① 스케줄러 주인 가드(utils/schedulerOwner — SCHEDULER_OWNER 0/1 우선, 아니면 NODE_APP_INSTANCE 없음/0, 기본 주인) + ecosystem 운영값 fork 1 ② socketService cluster 블록 redis v5 형식·error 리스너·실패 시 systemLogger.critical(계속 동작).
- 나중(조건): DB 잠금(두 번째 서버 + 자동 넘겨받기 필요할 때, scheduler_runs slot_key UNIQUE 권고·GET_LOCK 비권고) · 요청 제한 Redis 저장소(프로세스 ≥2 와 같은 변경) · DB pool(20×N + planq + 10 > 120 이면) · 업로드 공유 저장소(두 번째 서버) · findOne 정리(실측 느린 화면만).

## 게이트: PASS (지문 d0de881bd6da)
- diff 범위 = 설계 그대로(server.js 가드 줄만 · start 12/12 순서 동일 · isPM2Cluster 그대로 · 새 파일 3).
- jest 8/8 · health-check 466/466 · print-guard 8/8 · 민감 분류 ⑤ server.js 만 이 건.
- 실증: 비주인 재시작 → start 로그 0, scheduler_runs 15:38~16:04 0행(16:00 정각 미발생) · 복구 뒤 16:05 po_auto_receive 1행. 15:37·16:05 다발 행 = health-check 서비스 직접 호출.
- 배포 안전: 마이그 0 · SW 그대로 · 운영 fork 1 이라 Redis 블록 미실행 · 배포는 pm2 restart 만 써 ecosystem 변경 무해.
- 확인 못 함: Redis 실연결(fork) · 운영 pm2 값은 Opus 실측을 사실로 받음.
