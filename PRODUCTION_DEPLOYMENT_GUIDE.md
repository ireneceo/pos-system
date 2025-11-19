# Production Deployment Guide - Pager System & Kitchen Ticket

## 배포 일자: 2025-11-12

## 변경 사항 요약

### 1. 데이터베이스 변경
- **orders 테이블에 `pager_number` 컬럼 추가**
  - Type: VARCHAR(10)
  - Nullable: YES (기존 데이터 영향 없음)
  - Default: NULL

### 2. 새로운 기능
- Pager System 설정 (Settings 페이지)
- POS Terminal에 Pager 번호 입력
- Kitchen Order Ticket 프린트 시스템

---

## ⚠️ 배포 전 체크리스트

### 개발 서버 확인 사항
- [✅] pager_number 컬럼이 개발 DB에 존재
- [✅] 기존 주문 데이터 96건 정상 유지
- [✅] pager_number가 있는 주문 3건 정상 작동 확인
- [✅] 새로운 컬럼이 nullable이므로 기존 데이터 영향 없음

### 운영 서버 배포 순서

#### Step 1: 데이터베이스 백업 (필수!)
```bash
# 운영 서버에서 실행
mysqldump -u [운영DB유저] -p [운영DB이름] > backup_$(date +%Y%m%d_%H%M%S).sql

# 백업 확인
ls -lh backup_*.sql
```

#### Step 2: 데이터베이스 마이그레이션
```sql
-- 운영 DB에서 실행
USE [운영DB이름];

-- pager_number 컬럼 추가 (안전한 변경)
ALTER TABLE orders
ADD COLUMN pager_number VARCHAR(10) NULL
COMMENT 'Pager device number for order notification'
AFTER table_number;

-- 컬럼 추가 확인
DESCRIBE orders;
```

#### Step 3: 코드 배포
```bash
# 운영 서버에서 실행
cd /var/www/production  # 운영 서버 경로

# Git pull
git pull origin main

# Frontend 빌드
cd frontend
npm install  # 새로운 의존성이 있다면
npm run build

# Backend 재시작
cd ../backend
pm2 restart all  # 또는 pm2 restart [app-name]
```

#### Step 4: 배포 후 확인
```bash
# 1. 데이터베이스 확인
mysql -u [유저] -p [DB이름] -e "DESCRIBE orders" | grep pager_number

# 2. 기존 주문 데이터 확인
mysql -u [유저] -p [DB이름] -e "SELECT COUNT(*) as total FROM orders"

# 3. 애플리케이션 로그 확인
pm2 logs --lines 50

# 4. 웹 접속 확인
# - Settings 페이지 정상 로드 확인
# - POS Terminal 정상 작동 확인
# - Live Orders 페이지 정상 로드 확인
```

---

## 🔒 안전성 보장

### 1. 데이터 무결성
- ✅ **새 컬럼은 nullable** → 기존 레코드에 영향 없음
- ✅ **기존 컬럼 변경 없음** → 데이터 손실 위험 제로
- ✅ **테이블 구조만 추가** → 기존 쿼리 작동 보장

### 2. 하위 호환성
- ✅ **기존 기능 유지** → pager_number가 없어도 정상 작동
- ✅ **선택적 기능** → Settings에서 enable/disable 가능
- ✅ **점진적 도입** → 필요한 레스토랑만 사용 가능

### 3. 롤백 가능
만약 문제가 발생하면:

```sql
-- pager_number 컬럼만 제거 (데이터는 유지됨)
ALTER TABLE orders DROP COLUMN pager_number;

-- 또는 백업에서 복원
mysql -u [유저] -p [DB이름] < backup_[날짜].sql
```

---

## 📋 배포 후 테스트 시나리오

### 1. Pager System 설정
1. Settings > Operations 탭 접속
2. Pager System Enable 체크
3. Total Pagers 수량 입력 (예: 20)
4. Save 후 페이지 새로고침 확인

### 2. POS Terminal에서 주문
1. POS Terminal 접속
2. Pager 번호 입력란 표시 확인
3. 번호 입력 (예: 1) 후 주문 생성
4. Order Complete Modal에서 Pager 번호 표시 확인
5. "Print Order Ticket" 버튼으로 주방 주문서 출력

### 3. Live Orders 확인
1. Live Orders 페이지 접속
2. Pager 번호가 있는 주문 확인
3. 📋 아이콘 클릭하여 주방 주문서 출력
4. "View Order Ticket" 버튼으로 미리보기 확인

### 4. 기존 기능 정상 작동 확인
1. Pager 없이 일반 주문 생성
2. 기존 영수증 프린트
3. 주문 상태 변경
4. 결제 처리

---

## 🚨 문제 발생 시 대응

### 시나리오 1: 데이터베이스 마이그레이션 실패
```bash
# 백업에서 복원
mysql -u [유저] -p [DB이름] < backup_[날짜].sql

# 코드 롤백
git reset --hard [이전커밋]
```

### 시나리오 2: 애플리케이션 에러
```bash
# 로그 확인
pm2 logs --err

# 필요시 이전 버전으로 롤백
git reset --hard [이전커밋]
pm2 restart all
```

### 시나리오 3: Pager 기능만 비활성화
- Settings에서 Pager System을 Disable로 변경
- 데이터는 유지되지만 UI에서 숨겨짐

---

## 📞 긴급 연락

문제 발생 시:
1. 즉시 백업 확인
2. 에러 로그 수집 (pm2 logs)
3. 필요시 롤백 진행

---

## ✅ 배포 완료 체크리스트

- [ ] 데이터베이스 백업 완료
- [ ] pager_number 컬럼 추가 완료
- [ ] 기존 주문 데이터 개수 확인 (변경 없음)
- [ ] Git pull 완료
- [ ] Frontend 빌드 완료
- [ ] Backend 재시작 완료
- [ ] Settings 페이지 접속 확인
- [ ] POS Terminal 정상 작동 확인
- [ ] Live Orders 정상 작동 확인
- [ ] Pager 기능 테스트 완료
- [ ] 기존 기능 정상 작동 확인

---

**생성일**: 2025-11-12
**마지막 업데이트**: 2025-11-12
**배포 담당자**: ___________
**배포 완료 시각**: ___________
