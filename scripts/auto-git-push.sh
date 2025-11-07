#!/bin/bash
# Auto Git Commit and Push Script
# 변경사항이 있을 때만 자동 커밋 및 푸시

cd /var/www

# Git이 초기화되어 있는지 확인
if [ ! -d ".git" ]; then
    echo "Git repository not initialized. Please run git init first."
    exit 1
fi

# 변경사항 확인
if [[ -z $(git status -s) ]]; then
    echo "$(date '+%Y-%m-%d %H:%M:%S') - No changes to commit"
    exit 0
fi

# 현재 날짜와 시간
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
DATE=$(date '+%Y-%m-%d')

# 변경된 파일 목록 가져오기
CHANGED_FILES=$(git status -s | head -5)

# 자동 커밋 메시지 생성
COMMIT_MSG="chore: Auto-commit $TIMESTAMP

Changes detected:
$CHANGED_FILES
"

# Git add, commit, push
git add .
git commit -m "$COMMIT_MSG"

# Push (에러 무시 - 네트워크 문제 등으로 실패해도 다음에 재시도)
git push origin develop 2>&1 | tee -a /var/www/logs/git-auto-push.log

if [ $? -eq 0 ]; then
    echo "$(date '+%Y-%m-%d %H:%M:%S') - Successfully pushed to remote"
else
    echo "$(date '+%Y-%m-%d %H:%M:%S') - Push failed, will retry next time"
fi
