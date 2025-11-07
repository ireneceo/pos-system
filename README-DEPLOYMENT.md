# 개발 환경 배포 가이드

## 🚨 문제 발생 시 해결 순서

### 1. 인증 문제 (로그인 안됨, 대시보드 하얀 화면)

```bash
# 완전 초기화 스크립트 실행
/var/www/fix-auth.sh
```

**사용자 액션:**
1. 브라우저 F12 → Console
2. 실행: `localStorage.clear()`
3. F5로 새로고침
4. 재로그인

---

### 2. 정상 배포 프로세스

#### 전체 배포 (Frontend + Backend)
```bash
/var/www/dev-deploy.sh all
```

#### Frontend만 배포
```bash
/var/www/dev-deploy.sh frontend
```

#### Backend만 배포
```bash
/var/www/dev-deploy.sh backend
```

---

## 📋 체크리스트

### 배포 전
- [ ] 코드 변경사항 확인
- [ ] .env 파일 설정 확인
- [ ] 데이터베이스 마이그레이션 필요 여부 확인

### 배포 후
- [ ] PM2 상태 확인: `pm2 status`
- [ ] 백엔드 헬스체크: `curl http://localhost:3001/api/health`
- [ ] 프론트엔드 빌드 확인: `ls -lh /var/www/dev-frontend/build/static/js/`
- [ ] 브라우저 테스트 (localStorage 클리어 후)

---

## 🔧 수동 작업

### 프론트엔드 완전 클린 빌드
```bash
cd /var/www/dev-frontend
rm -rf build node_modules/.cache
npm run build
```

### 백엔드 재시작 (환경변수 업데이트 포함)
```bash
cd /var/www/dev-backend
pm2 restart pos-dev-backend --update-env
```

### Nginx 캐시 완전 삭제
```bash
rm -rf /var/cache/nginx/*
nginx -t && systemctl reload nginx
```

---

## 🐛 디버깅

### 백엔드 로그 확인
```bash
# 실시간 로그
pm2 logs pos-dev-backend

# 최근 50줄
pm2 logs pos-dev-backend --lines 50 --nostream

# 에러만 보기
tail -100 /var/www/dev-backend/logs/err.log
```

### 빌드 파일 확인
```bash
# 현재 빌드된 JS 파일
ls -lh /var/www/dev-frontend/build/static/js/main.*.js

# 브라우저가 받는 HTML 확인
curl -s https://dev.purplehere.com/ | grep "main\."
```

### 토큰 확인
```bash
# 브라우저 콘솔에서 실행
localStorage.getItem('auth_token')
```

---

## ⚡ 빠른 문제 해결

### "jwt malformed" 에러
→ localStorage의 old 토큰 문제
→ 해결: `localStorage.clear()` 후 재로그인

### 대시보드 하얀 화면
→ 프론트엔드 빌드 캐시 문제
→ 해결: `/var/www/fix-auth.sh` 실행

### "Cannot read properties of undefined"
→ 백엔드 API 응답 구조 문제
→ 해결: 백엔드 재시작 + 프론트엔드 리빌드

---

## 📞 지원

문제가 지속되면:
1. `/var/www/fix-auth.sh` 실행
2. 브라우저 콘솔 에러 스크린샷
3. `pm2 logs` 출력 복사
