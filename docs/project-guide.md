# 🍕 POS 시스템 프로젝트 - 전체 가이드

## 📋 프로젝트 기본 정보
- **프로젝트명**: 푸드코트 POS 시스템
- **타겟**: 푸드코트 (선불결제 + 픽업번호 시스템)
- **도메인**: https://pos.orderhere.center
- **서버 위치**: /var/www/vhosts/orderhere.center/pos.orderhere.center/
- **기술 스택**: React + Node.js + PostgreSQL + Socket.IO
- **통화**: RM (Malaysian Ringgit)
- **언어**: 영어

## 📚 필수 참고 문서
- https://pos.orderhere.center/docs/development-guide.md
- https://pos.orderhere.center/docs/api-specification.md  
- https://pos.orderhere.center/docs/database-erd.md
- https://pos.orderhere.center/docs/requirements.md
- https://pos.orderhere.center/docs/system-architecture.md
- https://pos.orderhere.center/docs/ia-structure.md

## 🗄️ 데이터베이스 정보
- **데이터베이스명**: pos_orderhere_db
- **서버**: localhost:5432 (PostgreSQL)
- **관련 사이트**: pos.orderhere.center
- **DB 사용자**: pos_admin
- **액세스 제어**: 모든 호스트로부터 원격 연결 허용

## 🏗️ 시스템 구조 (6개 독립 화면)
1. **포스 터미널** (/pos) - 직원이 주문 받는 화면
2. **고객 모바일** (/mobile) - 고객이 주문하는 화면
3. **주방 디스플레이** (/kitchen) - 주방에서 주문 보는 화면
4. **고객 디스플레이** (/display) - 픽업 번호 표시 화면
5. **관리자 패널** (/) - 업체 관리자용 대시보드
6. **솔루션 관리자** (/admin) - 시스템 운영자용

## 🏗️ 새로운 폴더 구조
```
pos.orderhere.center/
├── frontend/                (React 앱 - 새로 구축)
│   ├── src/
│   │   ├── pages/          (페이지 컴포넌트)
│   │   │   ├── LoginPage/
│   │   │   ├── MainPage/
│   │   │   ├── OrderPage/
│   │   │   ├── PaymentPage/
│   │   │   └── AdminPage/
│   │   ├── components/     (재사용 컴포넌트)
│   │   ├── styles/         (CSS/디자인)
│   │   ├── utils/          (유틸리티)
│   │   └── hooks/          (커스텀 훅)
├── backend/                (API 서버 - Node.js - 기존 활용)
├── dashboard/              (관리자용 - HTML/CSS - 완료 - 수정금지)
└── docs/                   (개발 문서들)
```

## 🗄️ 데이터베이스 구조 (12개 테이블)
1. **users**: 시스템 사용자 (직원/관리자) - 이메일 로그인
2. **stores**: 업체 정보 + 브랜딩 설정
3. **customers**: 고객 정보 - 전화번호 기반, 선택적 회원가입
4. **menu_categories**: 메뉴 카테고리 (한식, 중식 등)
5. **menu_items**: 메뉴 정보
6. **option_groups**: 옵션 그룹 (관리자가 이름 설정: "맵기정도", "크기선택" 등)
7. **option_items**: 옵션 항목 (관리자가 설정: "안맵게", "적당히맵게" 등)
8. **menu_option_groups**: 메뉴-옵션 연결
9. **orders**: 주문 정보 + 픽업번호 + 포스/모바일 구분
10. **order_items**: 주문 상세
11. **order_item_options**: 주문시 선택한 옵션들
12. **point_history**: 포인트 이력

## 💼 주요 비즈니스 로직
- **픽업번호**: 매일 001부터 시작, 자동 생성
- **주문 상태**: pending → paid → preparing → ready → completed
- **결제 구분**: 포스(현금/카드) vs 모바일(카드/간편결제)
- **권한 구분**: 역할별 접근 가능 화면/기능 다름
- **실시간 동기화**: 주문 생성 → 주방에 즉시 표시

## 🎯 새로운 개발 전략

### 1단계: React 환경 구축 (1일)
- [ ] Node.js 환경 확인
- [ ] React 프로젝트 생성
- [ ] 기본 라이브러리 설치
- [ ] Git 초기화 및 브랜치 전략 설정

### 2단계: 기본 구조 설정 (1일)
- [ ] 폴더 구조 생성
- [ ] 라우팅 설정 (React Router)
- [ ] 기본 컴포넌트 템플릿

### 3단계: 페이지별 개발 (주단위)
**개발 순서**: 로그인 → 메인 → 주문 → 결제 → 관리자

**각 페이지 프로세스**:
1. 기본 컴포넌트 구조 생성
2. 기능 구현 (API 연동 제외)
3. 사용자 확인 → git tag 생성
4. 다음 페이지 진행

### 4단계: 디자인 디테일 보완 (주단위)
- [ ] UI/UX 최적화
- [ ] 디자인 시스템 적용
- [ ] 반응형 디자인 구현

### 5단계: API 연동 및 최종 테스트
- [ ] 백엔드 API 연동
- [ ] Socket.IO 실시간 통신
- [ ] 통합 테스트

## 📝 Git 관리 체계
### 브랜치 전략
- `main`: 최종 확정 코드만
- `feature/login-page`: 로그인 페이지 개발
- `feature/main-page`: 메인 페이지 개발
- `feature/order-page`: 주문 페이지 개발
- `feature/payment-page`: 결제 페이지 개발
- `feature/admin-page`: 관리자 페이지 개발

### 버전 관리 규칙
1. **버전 태깅**: 각 페이지 완성시 git tag로 버전 고정
   - 예: `v1.0.0-login-page`
2. **확인 후 머지**: 사용자 컨펌 후에만 main 브랜치 머지
3. **컴포넌트 문서화**: 각 컴포넌트마다 README.md 작성

## 👥 업무분담 정리
### 사용자 + 웹용 Claude 영역 (완전 컨트롤)
- 🎨 모든 디자인 (CSS, UI/UX, 레이아웃)
- 📱 React 컴포넌트 구조 (어떤 화면, 어떤 기능)
- 🖼️ 화면 흐름 (POS 사용자 경험)
- 🎯 요구사항 정의 (이런 기능 필요해!)
- ✅ 페이지별 개발 완료 확인
- 🔀 최종 코드 머지 승인

### 비주얼스튜디오 내 Claude Code 영역
- ⚙️ React 컴포넌트 개발
- 🔗 API 개발 (데이터 처리, 서버 로직)
- 🗄️ 데이터베이스 로직 (CRUD 작업)
- 🐛 기술적 문제 해결 (오류 수정, 최적화)
- 📚 컴포넌트 문서화

## 🚨 Claude Code 요청 규칙
반드시 프로젝트명 'pos' 프리픽스 사용:
- ✅ 올바른 예: pos "로그인 페이지 컴포넌트 만들어줘"
- ✅ 올바른 예: pos "백엔드 API 이렇게 수정해줘"
- ✅ 올바른 예: pos "새로운 React 훅 만들어줘"
- ❌ 잘못된 예: "컴포넌트 만들어줘" (pos 없음)

## 🚨 중요한 작업 규칙
1. **단계별 확인**: 모든 변경사항은 사용자 확인 후 적용
2. **구조 우선**: 디자인보다 기능 구조를 먼저 완성
3. **문서화**: 모든 컴포넌트와 페이지는 문서화 필수
4. **버전 관리**: 완성된 코드는 반드시 태그로 고정
5. **React 중심**: HTML/CSS에서 React 컴포넌트로 전환

## ❌ 절대 금지 사항
- 사용자 확인 없이 기존 파일 수정 금지
- 완성된 컴포넌트 임의 변경 금지
- UI/UX 디자인 방향성 임의 결정 금지
- 버전 태그된 코드 무단 수정 금지
- dashboard/ 폴더 수정 금지 (관리자용 완성본)

## ✅ 허용된 작업 영역
- frontend/ 폴더 (React 컴포넌트 개발)
- backend/ 폴더 (Node.js API 개발/수정)
- 새로운 React 컴포넌트/페이지 생성 (사용자 요청 시에만)
- API 연동 로직 (axios, fetch)
- 데이터베이스 연동 로직

## 🔨 빌드 및 배포 명령어
```bash
# Frontend 개발 서버 실행
cd frontend
npm start

# Backend 서버 실행
cd backend
npm start

# 빌드 (배포용)
cd frontend
npm run build
```

## ✅ 완료된 기능들
1. **백엔드 시스템** (100% 완료)
   - ✅ Node.js + Express API 서버 (포트 3000)
   - ✅ 데이터베이스 연결 완료 (pos_orderhere_db)
   - ✅ 테이블 구조 완성 (12개 테이블)
   - ✅ 주요 API 엔드포인트 완성

2. **관리자 대시보드** (100% 완료)
   - ✅ 기존 대시보드: https://pos.orderhere.center/dashboard.html
   - ✅ HTML/CSS/JavaScript 완성 (수정 금지)

## 🎯 현재 작업 상태
- React 개발 환경 재구축 준비
- 페이지별 컴포넌트 개발 전략 수립
- Git 관리 체계 구축 중

## 🎯 다음 할 일 (우선순위)

### 1단계: React 환경 구축 (현재)
- [ ] Node.js 버전 확인
- [ ] React 프로젝트 생성
- [ ] Git 초기화
- [ ] 기본 폴더 구조 설정

### 2단계: 로그인 페이지 개발
- [ ] LoginPage 컴포넌트 생성
- [ ] 기본 UI 구조
- [ ] 폼 검증 로직
- [ ] 사용자 확인 → git tag

### 3단계: 메인 POS 화면 개발
- [ ] MainPage 컴포넌트 생성
- [ ] 메뉴 카테고리 표시
- [ ] 기본 레이아웃 구성
- [ ] 사용자 확인 → git tag

### 4단계: 순차적 페이지 개발
- [ ] 주문 페이지 (OrderPage)
- [ ] 결제 페이지 (PaymentPage)
- [ ] 관리자 페이지 (AdminPage)

### 5단계: API 연동 및 완성
- [ ] 백엔드 API 연동
- [ ] 실시간 동기화
- [ ] 최종 테스트

## 🛠️ 작업 방식
1. **사용자**: "이런 페이지 필요해" + 디자인 요구사항
2. **Claude Code**: "React 컴포넌트 만들어서 연결해줄게" + 기술적 구현
3. **확인 과정**: 각 단계별 사용자 승인 후 다음 진행

## 📞 다음 단계 액션 아이템
1. **즉시**: React 환경 상태 확인
2. **1단계**: React 프로젝트 재구축
3. **2단계**: 로그인 페이지부터 단계별 개발
4. **3단계**: 페이지별 순차 완성
5. **4단계**: API 연동 및 실시간 기능

**현재 상태**: React 개발 환경 재구축 준비  
**다음 우선순위**: Node.js 환경 확인 후 React 프로젝트 생성