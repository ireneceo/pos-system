# POS 시스템 개발 서버

## 서버 정보
- **서버**: 개발/스테이징 서버
- **IP**: 87.106.78.146
- **도메인**: dev.purplehere.com
- **위치**: /var/www/dev-backend
- **포트**: 3001

## 환경 정보
- **Node.js**: v20.19.5
- **npm**: 10.8.2
- **Nginx**: 1.24.0
- **MySQL**: 8.0.43
- **PM2**: 6.0.13

## 데이터베이스
- **DB 이름**: pos_dev_db
- **사용자**: pos_dev_user
- **비밀번호**: PosDevPassword2024!
- **문자셋**: utf8mb4

## 배포 방법

### 1. 프로젝트 코드 업로드
```bash
# Git으로 클론하거나 파일을 업로드
cd /var/www/dev-backend
git clone [repository-url] .

# 또는 FTP/SFTP로 파일 업로드
```

### 2. 의존성 설치
```bash
cd /var/www/dev-backend
npm install
```

### 3. 환경 변수 설정
```bash
# .env.example을 복사하여 .env 생성
cp .env.example .env

# 필요한 경우 .env 파일 수정
nano .env
```

### 4. PM2로 애플리케이션 시작
```bash
# ecosystem.config.js의 script 경로를 실제 진입점으로 수정
nano ecosystem.config.js

# PM2로 시작
pm2 start ecosystem.config.js

# PM2 프로세스 확인
pm2 list

# 로그 확인
pm2 logs pos-dev-backend

# PM2 설정 저장 (재부팅 후 자동 시작)
pm2 save
```

## 유용한 명령어

### PM2 관련
```bash
pm2 start ecosystem.config.js   # 시작
pm2 restart pos-dev-backend      # 재시작
pm2 stop pos-dev-backend         # 중지
pm2 delete pos-dev-backend       # 삭제
pm2 logs pos-dev-backend         # 실시간 로그
pm2 logs pos-dev-backend --lines 100  # 최근 100줄 로그
pm2 monit                        # 모니터링
pm2 list                         # 프로세스 목록
```

### Nginx 관련
```bash
sudo nginx -t                    # 설정 테스트
sudo systemctl reload nginx      # 재로드
sudo systemctl restart nginx     # 재시작
sudo systemctl status nginx      # 상태 확인
sudo tail -f /var/log/nginx/dev-backend-error.log   # 에러 로그
sudo tail -f /var/log/nginx/dev-backend-access.log  # 액세스 로그
```

### MySQL 관련
```bash
sudo systemctl status mysql      # 상태 확인
mysql -u pos_dev_user -p pos_dev_db  # DB 접속
```

### 방화벽 관련
```bash
sudo ufw status                  # 방화벽 상태
sudo ufw allow 80/tcp            # HTTP 허용
sudo ufw allow 443/tcp           # HTTPS 허용
```

## 트러블슈팅

### 애플리케이션이 시작되지 않는 경우
1. PM2 로그 확인: `pm2 logs pos-dev-backend`
2. 포트 3001이 사용 중인지 확인: `sudo lsof -i :3001`
3. Node.js 버전 확인: `node --version`

### Nginx 502 Bad Gateway 에러
1. 백엔드 애플리케이션이 실행 중인지 확인: `pm2 list`
2. 포트 3001에서 리스닝하는지 확인: `sudo lsof -i :3001`
3. Nginx 에러 로그 확인: `sudo tail -f /var/log/nginx/dev-backend-error.log`

### 데이터베이스 연결 오류
1. MySQL 실행 확인: `sudo systemctl status mysql`
2. 데이터베이스 존재 확인: `sudo mysql -e "SHOW DATABASES;"`
3. 사용자 권한 확인: `sudo mysql -e "SELECT user, host FROM mysql.user;"`

## 디렉토리 구조 (예시)
```
/var/www/dev-backend/
├── ecosystem.config.js    # PM2 설정
├── .env                   # 환경 변수 (Git 제외)
├── .env.example           # 환경 변수 예시
├── logs/                  # PM2 로그
│   ├── err.log
│   └── out.log
├── src/                   # 소스 코드
│   ├── server.js         # 진입점
│   └── ...
├── package.json
└── README.md
```

## 보안 주의사항
1. .env 파일을 Git에 커밋하지 마세요
2. 정기적으로 시스템 업데이트를 실행하세요
3. 데이터베이스 비밀번호를 주기적으로 변경하세요
4. SSH 키 기반 인증을 사용하세요

## 🚀 자동화 스크립트

### 전체 재배포 (Frontend + Backend)
```bash
/var/www/deploy-dev.sh
```

### Frontend만 재배포
```bash
cd /var/www/dev-frontend
npm run build:dev
```

### 서비스 상태 모니터링
```bash
/var/www/monitor-dev.sh
```

### Health Check
```bash
curl http://localhost:3001/api/health | jq .
```

## 🔄 자동 재시작 설정
- **PM2**: 크래시 시 자동 재시작 (최대 10회)
- **Systemd**: 서버 재부팅 시 자동 시작 활성화됨
- **메모리 제한**: 1GB 초과 시 자동 재시작

## 📊 로그 파일 위치
- **Backend 출력**: /var/www/dev-backend/logs/out.log
- **Backend 에러**: /var/www/dev-backend/logs/err.log
- **Nginx 에러**: /var/log/nginx/error.log
- **Nginx 액세스**: /var/log/nginx/access.log
