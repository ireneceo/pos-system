# SSL 인증서 설치 가이드

## 🔒 Let's Encrypt SSL 인증서

### 자동 설치 (추천)

```bash
cd /var/www
./install-ssl.sh
```

이메일 주소를 입력하면 자동으로:
- SSL 인증서 발급
- Nginx 설정 업데이트
- HTTP → HTTPS 리다이렉트 설정
- 자동 갱신 설정

---

## 📋 수동 설치

### 1. 기본 설치
```bash
sudo certbot --nginx -d purplehere.com -d www.purplehere.com
```

### 2. 이메일 지정
```bash
sudo certbot --nginx \
  -d purplehere.com \
  -d www.purplehere.com \
  --email your@email.com \
  --agree-tos \
  --redirect
```

---

## ✅ 설치 후 확인

### 인증서 확인
```bash
sudo certbot certificates
```

### SSL 등급 테스트
https://www.ssllabs.com/ssltest/analyze.html?d=purplehere.com

### 브라우저 테스트
```
https://purplehere.com
https://www.purplehere.com
```

---

## 🔄 인증서 갱신

### 자동 갱신 (이미 설정됨)
Let's Encrypt 인증서는 90일 유효하며, certbot이 자동으로 갱신합니다.

### 수동 갱신 테스트
```bash
sudo certbot renew --dry-run
```

### 강제 갱신
```bash
sudo certbot renew --force-renewal
```

---

## 🛠️ 문제 해결

### 1. 도메인이 서버를 가리키지 않음
```bash
# DNS 확인
dig purplehere.com
dig www.purplehere.com

# 결과가 이 서버의 IP와 일치해야 함
```

**해결**: DNS 설정에서 A 레코드가 서버 IP를 가리키도록 설정

### 2. 포트 80, 443이 막혀있음
```bash
# 방화벽 확인
sudo ufw status

# 포트 열기
sudo ufw allow 80
sudo ufw allow 443
```

### 3. Nginx가 실행 중이 아님
```bash
sudo systemctl status nginx
sudo systemctl start nginx
```

### 4. 인증서 발급 실패 (Rate Limit)
Let's Encrypt는 시간당 발급 제한이 있습니다.
- 1시간 대기 후 재시도
- 또는 staging 환경으로 테스트:
```bash
certbot --nginx --staging -d purplehere.com
```

---

## 📊 현재 설정

### 개발 환경
- 도메인: dev.purplehere.com
- SSL: ✅ 설치됨
- 포트: 3001 (백엔드)

### 운영 환경
- 도메인: purplehere.com, www.purplehere.com
- SSL: ⏳ 설치 필요
- 포트: 3002 (백엔드)

---

## 🔐 보안 권장사항

### 1. HTTPS 강제 적용
자동으로 설정됩니다 (HTTP → HTTPS 리다이렉트)

### 2. HSTS 헤더 추가 (선택사항)
```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

### 3. 정기적인 보안 스캔
- https://www.ssllabs.com/ssltest/
- https://securityheaders.com/

---

## 📞 지원

문제 발생 시:
```bash
# 상세 로그 확인
sudo tail -f /var/log/letsencrypt/letsencrypt.log

# Certbot 문서
https://certbot.eff.org/
```
