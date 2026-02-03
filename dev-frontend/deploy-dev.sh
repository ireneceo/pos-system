#!/bin/bash
# Dev Frontend 빌드 및 배포 자동화 스크립트

set -e  # 에러 발생 시 중단

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 경로 설정
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BUILD_DIR="$SCRIPT_DIR/build"
CACHE_DIR="$SCRIPT_DIR/node_modules/.cache"

echo -e "${BLUE}Dev Frontend 배포 시작...${NC}"

# 0. 권한 문제 자동 해결 (캐시, 빌드, node_modules)
CURRENT_USER=$(whoami)

fix_ownership() {
    local dir=$1
    local name=$2
    if [ -d "$dir" ]; then
        local owner=$(stat -c '%U' "$dir" 2>/dev/null || echo "unknown")
        if [ "$owner" = "root" ] && [ "$CURRENT_USER" != "root" ]; then
            echo -e "${YELLOW}$name 권한 문제 감지 - 자동 수정 중...${NC}"
            # sudoers 설정으로 비밀번호 없이 실행 (sudo -n)
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
fix_ownership "$SCRIPT_DIR/node_modules" "node_modules"

# 1. 빌드 실행
echo -e "\n${YELLOW}React 앱 빌드 중...${NC}"
cd "$SCRIPT_DIR"

# TypeScript 에러를 경고로 처리
export TSC_COMPILE_ON_ERROR=true
npm run build 2>&1 | grep -v "deploy.sh" || true

# 2. 빌드 확인
if [ ! -f "$BUILD_DIR/index.html" ]; then
    echo -e "${RED}❌ 빌드 실패: index.html을 찾을 수 없습니다${NC}"
    exit 1
fi

# 3. 빌드 파일 정보 출력
echo -e "\n${GREEN}✅ 빌드 완료!${NC}"
echo -e "${BLUE}📁 빌드된 파일:${NC}"
ls -lh "$BUILD_DIR/index.html" | awk '{print "   index.html (" $5 ")"}'
if [ -d "$BUILD_DIR/static/js" ]; then
    MAIN_JS=$(ls "$BUILD_DIR/static/js/main."*.js 2>/dev/null | head -1)
    if [ -n "$MAIN_JS" ]; then
        ls -lh "$MAIN_JS" | awk '{print "   " $9 " (" $5 ")"}'
    fi
fi

# 4. 파일 권한 설정
echo -e "\n${YELLOW}🔐 파일 권한 설정 중...${NC}"
chmod -R 755 "$BUILD_DIR"
find "$BUILD_DIR" -type f -exec chmod 644 {} \;

# 5. nginx 서빙 폴더로 복사 (핵심!)
DEPLOY_DIR="/var/www/dev-frontend-build"
echo -e "\n${YELLOW}📦 nginx 배포 폴더로 복사 중...${NC}"
if sudo cp -r "$BUILD_DIR"/* "$DEPLOY_DIR"/; then
    sudo chown -R root:root "$DEPLOY_DIR"
    echo -e "${GREEN}✅ $DEPLOY_DIR 로 복사 완료${NC}"
else
    echo -e "${RED}❌ 배포 폴더 복사 실패${NC}"
    exit 1
fi

echo -e "\n${GREEN}✅ 배포 완료!${NC}"
echo -e "${BLUE}📂 빌드 위치: $BUILD_DIR${NC}"
echo -e "${BLUE}📂 배포 위치: $DEPLOY_DIR${NC}"
echo -e "${BLUE}🌐 웹사이트: https://dev.purplehere.com${NC}"
echo -e "${YELLOW}💡 브라우저에서 강력 새로고침 (Ctrl+Shift+R)을 사용하세요.${NC}"
