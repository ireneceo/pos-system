# 문제 해결 가이드

> **최종 업데이트:** 2026-01-31

이 문서는 운영 중 발생한 문제와 해결 방법을 기록합니다.

---

## 목차

1. [Nginx 관련](#nginx-관련)
2. [이미지 업로드](#이미지-업로드)
3. [PM2/백엔드](#pm2백엔드)
4. [프론트엔드 빌드](#프론트엔드-빌드)

---

## Nginx 관련

### 이미지 업로드 후 404 에러 (2026-01-31)

**증상:**
- 이미지 업로드는 성공 (파일이 `/var/www/uploads/products/`에 저장됨)
- 브라우저에서 이미지 URL 접근 시 404 에러

**원인:**
개발서버와 운영서버의 nginx 설정 방식 차이

| 서버 | 설정 방식 | 결과 |
|------|----------|------|
| 개발서버 | `proxy_pass http://localhost:3001` | 정상 |
| 운영서버 | `alias /var/www/uploads/` | 404 에러 |

`alias` 방식은 경로 매핑 문제가 발생할 수 있음.

**해결:**
운영서버 nginx 설정을 `proxy_pass` 방식으로 변경

```nginx
# 잘못된 설정 (alias 방식)
location /uploads/ {
    alias /var/www/uploads/;
    expires 1y;
    add_header Cache-Control "public, immutable, max-age=31536000";
    access_log off;
    try_files $uri =404;
}

# 올바른 설정 (proxy_pass 방식)
location ^~ /uploads {
    proxy_pass http://localhost:3002;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    expires 1y;
    add_header Cache-Control "public, immutable, max-age=31536000";
}
```

**수정 명령어:**
```bash
# 설정 파일 위치
/etc/nginx/sites-enabled/purplehere.com

# 수정 후 테스트 및 재시작
sudo nginx -t && sudo systemctl reload nginx

# 확인
curl -I https://purplehere.com/uploads/products/파일명.jpg
```

**핵심 포인트:**
- 개발서버 설정을 먼저 확인하고 동일하게 맞출 것
- `alias` vs `proxy_pass`: 백엔드에서 static 파일을 서빙하는 경우 `proxy_pass` 사용

---

### Nginx 설정 문법 오류

**증상:**
```
nginx: [emerg] "location" directive is not allowed here
```

**원인:**
`}` 괄호 불일치 또는 중복

**해결:**
1. 설정 파일 전체를 확인하여 `{` `}` 짝이 맞는지 확인
2. sed로 수정 시 줄바꿈 문제로 괄호가 잘못 추가될 수 있음
3. 복잡한 수정은 전체 파일을 새로 작성하는 것이 안전

```bash
# 백업 후 전체 파일 교체
sudo cp /etc/nginx/sites-enabled/도메인 /etc/nginx/sites-enabled/도메인.bak
sudo cp /var/www/새설정파일.nginx /etc/nginx/sites-enabled/도메인
sudo nginx -t && sudo systemctl reload nginx
```

---

## 이미지 업로드

### Sharp 라이브러리 에러

**증상:**
```
VipsJpeg: premature end of JPEG image
```

**원인:**
손상된 이미지 파일 또는 불완전한 Base64 데이터

**해결:**
프론트엔드에서 이미지 유효성 검증 추가

---

## PM2/백엔드

### Heap OOM 크래시

**증상:**
```
FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
```

**원인:**
Node.js 기본 힙 메모리 제한 초과

**해결:**
ecosystem.config.js 수정

```javascript
// 변경 전
node_args: '--max-old-space-size=384'
max_memory_restart: '512M'

// 변경 후
node_args: '--max-old-space-size=768'
max_memory_restart: '800M'
```

---

## 프론트엔드 빌드

### 빌드 시 메모리 부족

**증상:**
빌드 중 프로세스 killed 또는 heap out of memory

**해결:**
```bash
# 빌드 시 메모리 증가
NODE_OPTIONS=--max_old_space_size=4096 npm run build:dev
```

---

## 문제 발생 시 체크리스트

1. **로그 확인**
   ```bash
   pm2 logs production-backend --lines 100
   tail -f /var/www/logs/production/error.log
   ```

2. **nginx 설정 확인**
   ```bash
   sudo nginx -t
   cat /etc/nginx/sites-enabled/purplehere.com
   ```

3. **개발서버와 비교**
   ```bash
   # 개발서버 설정
   cat /etc/nginx/sites-enabled/dev.purplehere.com
   ```

4. **서비스 상태 확인**
   ```bash
   pm2 status
   sudo systemctl status nginx
   ```
