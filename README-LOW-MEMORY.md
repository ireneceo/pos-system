# 저사양 서버 (2GB RAM) 운영 가이드

## 현재 서버 상태
- RAM: 2GB (업그레이드 불가)
- 최적화 완료

## 개발 시 주의사항

### 1. 빌드할 때
**절대 `npm run build` 직접 실행하지 마세요!**

대신 이 스크립트 사용:
```bash
cd /var/www/dev-frontend
./build-low-memory.sh
```

이 스크립트는:
- PM2 서비스 자동 정지
- 메모리 캐시 정리
- 400MB 제한으로 빌드
- 빌드 후 서비스 자동 재시작

### 2. npm install 할 때
```bash
/var/www/scripts/npm-install-safe.sh /var/www/dev-frontend
```

### 3. 일반 개발
```bash
# 개발 서버 시작 (이건 괜찮음)
cd /var/www/dev-frontend
npm start
```

## 적용된 최적화

### MySQL
- Buffer pool: 64MB
- Performance schema: OFF
- 설정파일: `/etc/mysql/mysql.conf.d/low-memory.cnf`

### Node.js (PM2)
- Max memory: 512MB
- Heap size: 448MB
- 설정파일: `/var/www/ecosystem.config.js`

### 시스템
- Swappiness: 10
- 자동 모니터링: 5분마다 실행
- 로그: `/var/www/logs/memory-monitor.log`

### 빌드 설정
- Source map: OFF
- Heap size: 400MB
- ESLint: 빌드 시 비활성화

## 메모리 부족 시 대응

### 즉시 대응
```bash
# 캐시 정리
sudo sync && echo 3 | sudo tee /proc/sys/vm/drop_caches

# 서비스 재시작
pm2 restart all
sudo systemctl restart mysql
```

### 로그 확인
```bash
# 메모리 모니터링 로그
tail -50 /var/www/logs/memory-monitor.log

# MySQL 에러 로그
sudo tail -50 /var/log/mysql/error.log

# PM2 로그
pm2 logs --lines 50
```

## 권장사항

**단기 (현재):**
- ✅ 현재 최적화로 개발 가능
- ⚠️ 빌드 시 반드시 스크립트 사용

**중기 (1-2주 내):**
- 호스팅 회사에 RAM 3GB~4GB 플랜으로 업그레이드
- 메모리만 업그레이드 가능 (CPU/디스크 유지)

**장기:**
- 프로덕션 배포 시 별도 서버 권장
