#!/bin/bash
# Dev Frontend 빌드 및 배포 자동화 스크립트

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BUILD_DIR="$SCRIPT_DIR/build"
CACHE_DIR="$SCRIPT_DIR/node_modules/.cache"
DEPLOY_DIR="/var/www/dev-frontend-build"
CURRENT_USER=$(whoami)

echo -e "${BLUE}Dev Frontend 배포 시작...${NC}"

# 0. 권한 문제 자동 해결 — 디렉터리 내 한 파일이라도 CURRENT_USER 가 아닌 소유면 전체 chown.
# 다중 개발자 (irene/lua) 가 번갈아 빌드할 때 chmod fail 방지.
fix_ownership() {
    local dir=$1
    local name=$2
    if [ -d "$dir" ]; then
        local mismatched=$(find "$dir" -not -user "$CURRENT_USER" -print -quit 2>/dev/null)
        if [ -n "$mismatched" ]; then
            echo -e "${YELLOW}$name 소유자 불일치 감지 - 자동 수정 중...${NC}"
            if sudo -n chown -R "$CURRENT_USER":"$CURRENT_USER" "$dir" 2>/dev/null; then
                echo -e "${GREEN}$name 권한 수정 완료${NC}"
            else
                echo -e "${RED}sudo 권한이 없습니다. 수동으로 권한을 수정하세요:${NC}"
                echo -e "  sudo chown -R $CURRENT_USER:$CURRENT_USER $dir"
                exit 1
            fi
        fi
    fi
}

fix_ownership "$CACHE_DIR" "캐시 폴더"
fix_ownership "$BUILD_DIR" "빌드 폴더"

# 0.5 Autoprint regression gate — locks in critical store invariants
# (enrichment per-path, polling stationName, frontend bucketing including the
# "station has no printer config → silent merge" trap). If this fails the
# build aborts so a broken auto-print path cannot ship to dev/store.
# Skip with SKIP_REGRESSION=1 if backend is intentionally offline.
if [ "$SKIP_REGRESSION" != "1" ]; then
    echo -e "\n${BLUE}🧪 Autoprint regression check...${NC}"
    REGRESSION_LOG=$(mktemp)
    if (cd /var/www/dev-backend && node tests/autoprint-regression.js) >"$REGRESSION_LOG" 2>&1; then
        PASS_LINE=$(grep -E "^PASS: " "$REGRESSION_LOG" | tail -1)
        echo -e "${GREEN}✓ Autoprint regression $PASS_LINE${NC}"
        rm -f "$REGRESSION_LOG"
    else
        echo -e "${RED}✗ Autoprint regression FAILED — build aborted${NC}"
        echo -e "${YELLOW}━━━ Last 40 lines of regression output ━━━${NC}"
        tail -40 "$REGRESSION_LOG"
        echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "${RED}코드 변경이 자동인쇄 invariant 를 깼습니다. fix 후 다시 build.${NC}"
        echo -e "${YELLOW}(긴급히 우회 필요 시: SKIP_REGRESSION=1 npm run build:dev — 사유 기록 권장)${NC}"
        rm -f "$REGRESSION_LOG"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠ Autoprint regression SKIPPED (SKIP_REGRESSION=1)${NC}"
fi

# 0. 메모리 게이트 — 에뮬레이터와 겹치거나 메모리가 부족하면 빌드를 시작하지 않는다.
#    (서버 프리즈·강제 재부팅 방지. 우회: SKIP_MEMGATE=1)
if ! bash /var/www/scripts/heavy-task-gate.sh build; then
    echo -e "${RED}✗ 빌드를 시작하지 않았습니다 (메모리 게이트).${NC}"
    exit 1
fi

# 1. 이전 빌드 정리 + 빌드 실행
if [ -d "$BUILD_DIR/static" ]; then
    rm -rf "$BUILD_DIR/static"
    echo -e "${YELLOW}🗑️ 이전 빌드 파일 정리 완료${NC}"
fi
echo -e "\n${YELLOW}React 앱 빌드 중... (1~3분 소요)${NC}"
cd "$SCRIPT_DIR"

export TSC_COMPILE_ON_ERROR=true
BUILD_START=$(date +%s)

# 빌드를 cgroup 상자에 가둔다 — 폭주해도 빌드만 죽고 서버는 산다.
# (실측 총피크 3.08GiB → 4G 캡. 힙 상한 2560MB 는 package.json.)
BUILD_RUNNER=""
if systemd-run --user --scope -q -p MemoryMax=10M true >/dev/null 2>&1; then
    BUILD_RUNNER="systemd-run --user --scope -q -p MemoryMax=4G -p MemorySwapMax=512M"
else
    echo -e "${YELLOW}⚠ systemd-run 사용 불가 — cgroup 상자 없이 빌드합니다${NC}"
fi

# 빌드 실행 — 진행 상황을 실시간 출력
set -o pipefail
$BUILD_RUNNER npm run build 2>&1 | while IFS= read -r line; do
    # 핵심 진행 메시지만 출력 (Creating, Compiled, error)
    if echo "$line" | grep -qiE "Creating|Compiled|error|warning|Failed"; then
        echo -e "  ${line}"
    fi
done
BUILD_STATUS=${PIPESTATUS[0]}
set +o pipefail

if [ "$BUILD_STATUS" -ne 0 ]; then
    echo -e "${RED}✗ 빌드 실패 (exit ${BUILD_STATUS})${NC}"
    if [ "$BUILD_STATUS" -eq 137 ] || [ "$BUILD_STATUS" -eq 134 ]; then
        echo -e "${RED}  메모리 상한(4G)에 걸려 죽었습니다. 다른 무거운 작업을 끄고 재시도하거나,${NC}"
        echo -e "${RED}  필요치를 재측정해 package.json 힙 상한(현재 2560MB)을 조정하세요.${NC}"
    fi
    exit 1
fi

BUILD_END=$(date +%s)
BUILD_TIME=$((BUILD_END - BUILD_START))

# 2. 빌드 확인
if [ ! -f "$BUILD_DIR/index.html" ]; then
    echo -e "${RED}✗ 빌드 실패: index.html을 찾을 수 없습니다${NC}"
    exit 1
fi

# 3. 빌드 파일 정보 출력
echo -e "\n${GREEN}✓ 빌드 완료! (${BUILD_TIME}초)${NC}"
echo -e "${BLUE}📁 빌드된 파일:${NC}"
ls -lh "$BUILD_DIR/index.html" | awk '{print "   index.html (" $5 ")"}'
if [ -d "$BUILD_DIR/static/js" ]; then
    MAIN_JS=$(ls "$BUILD_DIR/static/js/main."*.js 2>/dev/null | head -1)
    if [ -n "$MAIN_JS" ]; then
        ls -lh "$MAIN_JS" | awk '{print "   " $9 " (" $5 ")"}'
    fi
fi

# 4. 파일 권한 설정 + nginx 배포
echo -e "\n${YELLOW}🔐 파일 권한 설정 중...${NC}"
chmod -R 755 "$BUILD_DIR"
find "$BUILD_DIR" -type f -exec chmod 644 {} \;

echo -e "\n${YELLOW}🗑️ 이전 빌드 파일 정리 중...${NC}"
# 2026-07-23: DEPLOY_DIR(dev-frontend-build)은 irene 소유 + lua ACL → sudo 불필요.
# nginx(www-data)는 other 읽기(755/644)만 필요하므로 소유자가 irene 이어도 서빙 정상.
# (근거·설계 = Fable 게이트. root 소유를 고집할 보안 이익 0 이었다.)
rm -rf "$DEPLOY_DIR/static"

echo -e "\n${YELLOW}📦 nginx 배포 폴더로 복사 중...${NC}"
if cp -r "$BUILD_DIR"/* "$DEPLOY_DIR"/; then
    echo -e "${GREEN}✓ $DEPLOY_DIR 로 복사 완료${NC}"
else
    echo -e "${RED}✗ 배포 폴더 복사 실패${NC}"
    exit 1
fi

echo -e "\n${GREEN}✓ 배포 완료!${NC}"
echo -e "${BLUE}📂 빌드 위치: $BUILD_DIR${NC}"
echo -e "${BLUE}📂 배포 위치: $DEPLOY_DIR${NC}"
echo -e "${BLUE}🌐 웹사이트: https://dev.purplehere.com${NC}"
echo -e "${YELLOW}💡 브라우저에서 강력 새로고침 (Ctrl+Shift+R)을 사용하세요.${NC}"
