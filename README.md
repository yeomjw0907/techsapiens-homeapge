# Techsapiens 홈페이지

SI 전문가 그룹 테크레디의 공식 홈페이지입니다.

## 🚀 프로젝트 개요

AI와 글로벌 협업으로 소프트웨어 개발 산업을 혁신하는 테크 컴퍼니의 홈페이지입니다.

## 📋 주요 기능

- **메인페이지**: Hero 섹션, 서비스 소개, 회사소개, 프로젝트 포트폴리오
- **프로젝트 페이지**: 필터링 기능이 있는 프로젝트 포트폴리오
- **프로젝트 상세 페이지**: 개별 프로젝트의 상세 정보
- **프로젝트 문의 모달**: 문의 폼을 통한 연락처 수집

## 🛠️ 기술 스택

- **Frontend**: React 18, TypeScript
- **Styling**: Styled Components
- **Animation**: Framer Motion
- **Routing**: React Router DOM
- **Build Tool**: Create React App

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 프로덕션 빌드
npm run build
```

## 🎨 디자인 특징

- **다크 테마**: 전문적이고 모던한 다크 컬러 스킴
- **그라디언트**: 보라색-파란색 그라디언트를 활용한 시각적 효과
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기 지원
- **애니메이션**: 부드러운 스크롤 애니메이션과 호버 효과

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── Header.tsx      # 네비게이션 헤더
│   ├── Footer.tsx      # 푸터
│   ├── ContactModal.tsx # 문의 모달
│   └── sections/       # 페이지 섹션들
├── pages/              # 페이지 컴포넌트
├── styles/             # 스타일 관련 파일
└── App.tsx             # 메인 앱 컴포넌트
```

## 🔄 버전 관리

### v1.0.1 (2025-01-27)
- **TypeScript 타입 에러 수정**
  - Styled Components 테마 타입 정의 추가 (styled.d.ts)
  - GlobalStyle export 문제 수정
  - Header 컴포넌트 scrolled prop 타입 정의
  - tsconfig.json에 타입 정의 파일 포함
  - 모든 TypeScript 컴파일 에러 해결

### v1.0.0 (2025-01-27)
- **초기 릴리스**
  - React + TypeScript 기반 프로젝트 설정
  - Styled Components를 활용한 다크 테마 디자인
  - Framer Motion을 통한 애니메이션 효과
  - 메인페이지 구성 (Hero, 서비스, 회사소개, 프로젝트, 문의 섹션)
  - 프로젝트 페이지 및 상세 페이지 구현
  - 프로젝트 문의 모달 기능
  - 반응형 디자인 적용
  - React Router를 통한 SPA 라우팅

## 📞 문의

- **이메일**: contact@techsapiens.com
- **전화**: 02-1234-5678
- **주소**: 서울특별시 강남구

---

© 2025 Techsapiens. All rights reserved.