# 🚨 CLAUDE CODE - 개발 가이드

## ❌ 절대 금지 사항
- 사용자 확인 없이 기존 파일 수정 금지
- 완성된 컴포넌트 임의 변경 금지
- UI/UX 디자인 방향성 임의 결정 금지
- 버전 태그된 코드 무단 수정 금지
- 사용자가 컨펌하지 않은 변경사항 적용 금지

## ✅ 허용된 작업 영역
- frontend/ 폴더 (React 컴포넌트 개발)
- backend/ 폴더 (Node.js API 개발)
- 새로운 컴포넌트/페이지 생성 (사용자 요청 시에만)
- API 연동 로직 (axios, fetch)
- 데이터베이스 연동 로직
- package.json (의존성 관리)

## 📋 프로젝트 정보
- **구조:** React Frontend + Node.js Backend
- **프론트엔드:** React (JavaScript/TypeScript)
- **백엔드:** Node.js + Express
- **데이터베이스:** PostgreSQL
- **통화:** RM (Malaysian Ringgit)
- **언어:** 영어
- **도메인:** pos.orderhere.center

## 🏗️ 프로젝트 구조
```
pos-system/
├── frontend/          # React 앱
│   ├── src/
│   │   ├── pages/     # 페이지 컴포넌트
│   │   ├── components/ # 재사용 컴포넌트
│   │   ├── styles/    # CSS/디자인
│   │   ├── utils/     # 유틸리티
│   │   └── hooks/     # 커스텀 훅
├── backend/           # Node.js API
├── docs/              # 문서
└── database/          # DB 스키마
```

## 🎯 개발 전략
### 1단계: 페이지별 기본 구조 개발
- React 컴포넌트로 페이지 단위 개발
- 기능 우선, 디자인은 2단계에서

### 2단계: 디자인 디테일 보완
- UI/UX 최적화
- 디자인 시스템 적용

## 📝 Git 관리 체계
### 브랜치 전략
- `main`: 최종 확정 코드만
- `feature/[페이지명]-page`: 페이지별 개발 브랜치
- 예: `feature/login-page`, `feature/main-page`

### 버전 관리 규칙
1. **버전 태깅**: 각 페이지 완성시 git tag로 버전 고정
   - 예: `v1.0.0-login-page`
2. **확인 후 머지**: 사용자 컨펌 후에만 main 브랜치 머지
3. **컴포넌트 문서화**: 각 컴포넌트마다 README.md 작성

## 👥 역할 분담
### 사용자 영역 (완전 컨트롤)
- 모든 디자인 결정
- React 컴포넌트 구조 승인
- 화면 흐름 및 UX 결정
- 페이지별 개발 완료 확인
- 최종 코드 머지 승인

### Claude 영역 (기술 지원)
- React 컴포넌트 개발
- API 개발/연동
- 데이터베이스 로직
- 기술적 구현 및 오류 해결
- 사용자 요청에 따른 코드 작성

## 🔄 개발 프로세스
```
1. 페이지 기획 → 2. 컴포넌트 개발 → 3. 사용자 확인 → 4. Git Tag 생성 → 5. 다음 페이지
```

## 💻 클로드 코드 명령어 패턴
- `claude code create component [컴포넌트명]` - 새 컴포넌트 생성
- `claude code setup page [페이지명]` - 페이지 설정
- `claude code review` - 코드 리뷰 요청
- `claude code merge feature/[브랜치명]` - 브랜치 머지

## ⚠️ 작업 원칙
1. **단계별 확인**: 모든 변경사항은 사용자 확인 후 적용
2. **구조 우선**: 디자인보다 기능 구조를 먼저 완성
3. **문서화**: 모든 컴포넌트와 페이지는 문서화 필수
4. **버전 관리**: 완성된 코드는 반드시 태그로 고정
5. **사용자 중심**: 사용자가 명령하지 않은 파일은 절대 수정하지 않음

## 📋 페이지 개발 순서
1. 로그인 페이지
2. 메인 대시보드
3. 주문 관리 페이지
4. 결제 페이지
5. 관리자 페이지

이 규칙을 반드시 지켜주세요!