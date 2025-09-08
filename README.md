# 🗒️ 과제 07. 리액트를 이용해서 노트 앱 만들기

React + TypeScript + Express로 구현한 풀스택 노트 관리 애플리케이션입니다.

---

## 주요 기능

### 📝 노트 관리

- **CRUD 기능**: 노트 생성, 조회, 수정, 삭제
- **노트 편집**: 제목, 내용, 태그, 배경색 설정
- **2단계 삭제**: 휴지통 → 확인 후 완전 삭제로 실수 방지

### 🎯 상태 관리

- **우선순위 토글**: 핀 아이콘으로 high/low 우선순위 설정
- **아카이브 기능**: 중요하지만 당장 필요없는 노트 보관

### 🔍 검색 및 필터링

- **실시간 검색**: 제목, 내용 기반 즉시 검색
- **메뉴별 필터링**: 전체/아카이브/휴지통/태그별 분류
- **정렬 옵션**: 최신순/제목순/우선순위순 정렬

---

## 🛠️ 기술 스택

### Frontend

- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Redux Toolkit** - 상태 관리
- **React Redux** - React-Redux 연결
- **Tailwind CSS** - 스타일링
- **Vite** - 개발 도구
- **React Icons** - 아이콘 라이브러리

### Backend

- **Node.js** - 런타임 환경
- **Express** - 웹 프레임워크
- **TypeScript** - 백엔드 타입 안전성
- **CORS**
- **ts-node** - TypeScript 실행 환경

---

## 📂 프로젝트 구조

```
📦note-app
 ┣ 📂backend
 ┃ ┣ 📂data
 ┃ ┃ ┗ 📜notes.json          # 노트 데이터 저장소
 ┃ ┣ 📂src
 ┃ ┃ ┗ 📜app.ts              # Express 서버
 ┃ ┣ 📜.gitignore
 ┃ ┣ 📜package-lock.json
 ┃ ┣ 📜package.json
 ┃ ┗ 📜tsconfig.json
 ┣ 📂frontend
 ┃ ┣ 📂public
 ┃ ┃ ┗ 📜vite.svg
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂assets
 ┃ ┃ ┃ ┗ 📜react.svg
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜AddNoteModal.tsx  # 노트 추가 모달
 ┃ ┃ ┃ ┣ 📜EditNoteModal.tsx # 노트 수정 모달
 ┃ ┃ ┃ ┣ 📜Header.tsx        # 헤더 (검색, 정렬)
 ┃ ┃ ┃ ┣ 📜MainContent.tsx   # 메인 노트 목록
 ┃ ┃ ┃ ┣ 📜Modal.tsx         # 재사용 모달 컨테이너
 ┃ ┃ ┃ ┣ 📜NoteItem.tsx      # 개별 노트 카드
 ┃ ┃ ┃ ┗ 📜Sidebar.tsx       # 사이드바 네비게이션
 ┃ ┃ ┣ 📂store
 ┃ ┃ ┃ ┣ 📜index.ts          # Redux 스토어 설정
 ┃ ┃ ┃ ┗ 📜notesSlice.ts     # 노트 상태 관리
 ┃ ┃ ┣ 📜App.css
 ┃ ┃ ┣ 📜App.tsx             # 메인 앱 컴포넌트
 ┃ ┃ ┣ 📜index.css
 ┃ ┃ ┣ 📜main.tsx
 ┃ ┃ ┣ 📜types.ts            # TypeScript 타입 정의
 ┃ ┃ ┗ 📜vite-env.d.ts
 ┃ ┣ 📜.gitignore
 ┃ ┣ 📜eslint.config.js
 ┃ ┣ 📜index.html
 ┃ ┣ 📜package-lock.json
 ┃ ┣ 📜package.json
 ┃ ┣ 📜tsconfig.app.json
 ┃ ┣ 📜tsconfig.json
 ┃ ┣ 📜tsconfig.node.json
 ┃ ┗ 📜vite.config.ts
 ┗ 📜README.md
```

---

## 🖥️ 주요 컴포넌트

### Core Components

- **App.tsx**: 메인 앱 컨테이너 및 상태 관리
- **Header.tsx**: 검색창, 정렬 옵션, 새 노트 버튼
- **Sidebar.tsx**: 메뉴 네비게이션 및 태그 목록
- **MainContent.tsx**: 노트 목록 표시
- **NoteItem.tsx**: 개별 노트 카드

### Modal Components

- **AddNoteModal.tsx**: 새 노트 생성 모달
- **EditNoteModal.tsx**: 노트 수정 모달
- **Modal.tsx**: 재사용 가능한 모달 컨테이너

---

## 🔗 API 엔드포인트

```
GET    /api/notes      # 모든 노트 조회
POST   /api/notes      # 새 노트 생성
PUT    /api/notes/:id  # 노트 수정
DELETE /api/notes/:id  # 노트 삭제
```

---

### 💬 커밋 규칙

| 타입         | 설명                                 | 예시                                  |
| ------------ | ------------------------------------ | ------------------------------------- |
| **feat**     | 새로운 기능 추가                     | feat: 노트 추가 기능 구현             |
| **fix**      | 버그 수정                            | fix: 노트 저장 오류 수정              |
| **style**    | UI/스타일 변경 (코드 동작 변화 없음) | style: 버튼 색상 변경                 |
| **refactor** | 코드 구조 개선                       | refactor: NoteList 컴포넌트 로직 분리 |
| **chore**    | 환경설정/패키지 설치/초기 세팅       | chore: Tailwind 설치 및 초기 세팅     |
| **docs**     | 문서 작성/수정                       | docs: README 사용법 작성              |
