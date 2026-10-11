#!/bin/bash
# make-clean-source.sh — 운영 배포용 «마지막 커밋의 깨끗한 사본» 을 만든다 (2026-10-11)
#
# 왜
#   Irene 2026-10-11 «배포를 하면 모든 작업 일시정지하고 점검 후 배포 · 진행중인 거 있으면 그건 빼고 배포».
#   예전 배포는 작업 폴더(/var/www/dev-backend · dev-frontend)를 그대로 빌드·rsync 해서, 다른 작업방의
#   미커밋(= 진행 중) 변경이 같이 운영에 나갔다. 그래서 배포 방이 stash 로 비켜 두는 임시 규칙을 썼다.
#   이제 배포는 이 사본(= git HEAD 그대로)에서만 빌드·전송한다. 작업 폴더는 건드리지 않는다.
#
# 사본에 들어가는 것
#   - HEAD 의 추적 파일만 (git archive) — 미커밋·미추적 파일은 들어가지 않는다.
#   - node_modules: 작업 폴더 것을 심볼릭 링크 (rsync 는 node_modules 를 제외하므로 운영엔 안 간다).
#   - 추적 안 되는 설정 파일 — 아래 COPY_UNTRACKED 목록만: 프론트 빌드 설정 2개(공개값) + 타입 검사 캐시 +
#     dev-backend/.env(**개발** DB 접속 — 사본에서 배포 마이그 실전 검사를 dev DB 로 돌리기 위해).
#     운영엔 가지 않는다: 배포 rsync 가 .env 를 이름으로 제외하고, 무시 파일 보호 목록에도 들어 있다.
#
# 사용
#   bash scripts/make-clean-source.sh <사본 폴더>     # 출력 마지막 줄: COMMIT <sha>
#   사본 폴더는 매번 지우고 새로 만든다(고정 경로를 쓰면 빌드 캐시가 다음 배포에도 맞는다).
set -euo pipefail

REPO="/var/www"
DEST="${1:?사본 폴더를 인자로 주세요}"

# 엉뚱한 곳을 지우지 않게 — 사본 폴더 이름은 반드시 'deploy-clean' 으로 끝나야 한다.
case "$DEST" in
  */deploy-clean) ;;
  *) echo "make-clean-source: 사본 폴더 이름은 …/deploy-clean 이어야 합니다 ($DEST)" >&2; exit 1 ;;
esac
case "$DEST" in
  "$REPO"|"$REPO"/*) echo "make-clean-source: 사본은 저장소 밖에 둡니다 ($DEST)" >&2; exit 1 ;;
esac

# 배포 대상 범위 — 운영에 가는 소스 + deploy-manifest.js 가 지문을 뜨는 범위.
PATHS=(dev-backend dev-frontend desktop-pos deploy-to-production.sh CLAUDE.md)
# git 이 추적하지 않지만 사본에서 빌드·검사하는 데 필요한 파일 (위 설명 참고 — 운영으로는 안 간다).
#   dev-frontend/.tsbuildinfo = 타입 검사 캐시(상대경로·파일 해시 기준이라 바뀐 파일만 다시 검사). 없으면 빌드 중
#   타입 검사가 전체를 처음부터 돌다 힙 한도(2GB)로 죽는다 — 2026-10-11 사본 빌드 시험에서 실측(OOM).
COPY_UNTRACKED=(dev-frontend/.env dev-frontend/.env.build dev-frontend/.tsbuildinfo dev-backend/.env)

COMMIT="$(git -C "$REPO" rev-parse HEAD)"

rm -rf "$DEST"
mkdir -p "$DEST"
git -C "$REPO" archive --format=tar "$COMMIT" -- "${PATHS[@]}" | tar -x -C "$DEST"

for rel in "${COPY_UNTRACKED[@]}"; do
  if [ -f "$REPO/$rel" ]; then cp -p "$REPO/$rel" "$DEST/$rel"; fi
done

ln -s "$REPO/dev-backend/node_modules"  "$DEST/dev-backend/node_modules"
ln -s "$REPO/dev-frontend/node_modules" "$DEST/dev-frontend/node_modules"

# 확인 — 사본이 비었으면 실패로 끝낸다(«아무것도 안 했는데 성공» 금지).
for must in dev-backend/server.js dev-backend/package.json dev-frontend/package.json dev-frontend/src/index.tsx; do
  if [ ! -f "$DEST/$must" ]; then
    echo "make-clean-source: 사본에 $must 가 없습니다" >&2; exit 1
  fi
done

# 이번 배포에서 빠지는 것(작업 폴더의 미커밋·미추적) 개수를 알린다 — 무시된 파일은 세지 않는다.
LEFT_OUT=$(git -C "$REPO" status --porcelain -- dev-backend dev-frontend desktop-pos | wc -l)
echo "LEFT_OUT ${LEFT_OUT}"
echo "COMMIT ${COMMIT}"
