# Frontend 빌드 문제해결 가이드

## 빌드 경로
- **개발서버**: `/var/www/dev-frontend/build/`
- **운영서버**: `/var/www/production-frontend/build/`
- **nginx 설정**: `/etc/nginx/sites-enabled/dev.purplehere.com` (개발), `/etc/nginx/sites-available/purplehere.com` (운영)

---

## 증상별 문제해결

### 1. 404 Not Found (nginx)

**원인**: build 폴더에 `index.html`이 없음

**확인 방법**:
```bash
ls -la /var/www/dev-frontend/build/index.html
```

**해결**:
```bash
cd /var/www/dev-frontend
npm run build
```

빌드 후에도 index.html이 없으면 아래 "빌드가 완료되지 않음" 섹션 참고.

---

### 2. 빌드가 완료되지 않음 (index.html 미생성)

**원인**: `node_modules/.cache/` 폴더가 root 소유로 되어 ESLint 캐시 쓰기 실패

**확인 방법**:
```bash
ls -la /var/www/dev-frontend/node_modules/.cache/
# 소유자가 root로 되어 있으면 문제
```

**해결**:
```bash
# 방법 1: 자동 (deploy-dev.sh 사용)
cd /var/www/dev-frontend
./deploy-dev.sh

# 방법 2: 수동
sudo chown -R irene:irene /var/www/dev-frontend/node_modules/.cache
npm run build
```

---

### 3. 500 Internal Server Error (nginx redirect loop)

**원인**: nginx 설정에서 `.html` 파일에 대해 `try_files $uri /index.html;` 설정 시 무한 루프 발생

**확인 방법**:
```bash
sudo tail -20 /var/log/nginx/error.log
# "rewrite or internal redirection cycle" 메시지 확인
```

**해결**:
nginx 설정에서 `.html` location 블록 수정:
```nginx
# 잘못된 설정 (무한 루프 발생)
location ~* \.html$ {
    try_files $uri /index.html;
}

# 올바른 설정
location ~* \.html$ {
    expires -1;
    add_header Cache-Control "no-store, no-cache";
    try_files $uri =404;
}
```

적용:
```bash
sudo nginx -t && sudo systemctl reload nginx
```

---

### 4. 메모리 부족 빌드 실패

**증상**: 빌드 중 프로세스가 중단되거나 "JavaScript heap out of memory" 에러

**해결**:
```bash
# 메모리 증가 옵션 적용
NODE_OPTIONS='--max-old-space-size=2048' npm run build
```

---

### 5. CORS 에러

**증상**: 브라우저 콘솔에 "Access-Control-Allow-Origin" 에러

**확인 및 해결**:
`/var/www/dev-backend/app.js`에서 allowedOrigins 배열에 도메인 추가:
```javascript
const allowedOrigins = [
  'https://dev.purplehere.com',
  'https://purplehere.com',
  // 필요한 도메인 추가
];
```

백엔드 재시작:
```bash
cd /var/www/dev-backend && pm2 restart dev-backend
```

---

## 빌드 명령어

```bash
# 개발서버 빌드 및 배포
cd /var/www/dev-frontend
./deploy-dev.sh

# 또는
npm run build

# 운영서버 배포 (반드시 /배포 명령어로만)
cd /var/www
./deploy-production.sh
```

---

## 체크리스트

빌드 문제 발생 시 순서대로 확인:

1. [ ] `node_modules/.cache/` 소유권 확인 (root면 문제)
2. [ ] `build/index.html` 존재 확인
3. [ ] nginx 설정 문법 확인 (`sudo nginx -t`)
4. [ ] nginx 에러 로그 확인 (`sudo tail -50 /var/log/nginx/error.log`)
5. [ ] 백엔드 PM2 상태 확인 (`pm2 status`)

---

## 자주 사용하는 명령어

```bash
# nginx 설정 테스트 및 재시작
sudo nginx -t && sudo systemctl reload nginx

# nginx 에러 로그
sudo tail -50 /var/log/nginx/error.log

# PM2 상태 확인
pm2 status

# 캐시 폴더 권한 수정
sudo chown -R irene:irene /var/www/dev-frontend/node_modules/.cache

# 빌드 폴더 확인
ls -la /var/www/dev-frontend/build/
```
