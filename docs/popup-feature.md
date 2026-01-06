# 팝업 관리 기능 구현 문서

## 개요
백오피스에서 이미지를 업로드하고 팝업창 설정을 할 수 있는 기능입니다.

---

## 생성된 파일 목록

### 백엔드 (Node.js/Express)

| 파일 | 경로 | 설명 |
|------|------|------|
| popup.model.js | `src/models/popup.model.js` | MongoDB 스키마 정의 |
| popup.controller.js | `src/controllers/popup.controller.js` | CRUD + 활성 팝업 조회 API |
| popup.routes.js | `src/routes/popup.routes.js` | API 라우트 정의 |

### 프론트엔드 (React)

| 파일 | 경로 | 설명 |
|------|------|------|
| popupService.js | `client/src/service/popupService.js` | API 호출 서비스 |
| PopupAdmin.jsx | `client/src/pages/Popup/PopupAdmin.jsx` | 팝업 목록/관리 페이지 |
| PopupAdmin.css | `client/src/pages/Popup/PopupAdmin.css` | 관리 페이지 스타일 |
| PopupEditor.jsx | `client/src/pages/Popup/PopupEditor.jsx` | 팝업 생성/수정 페이지 |
| PopupEditor.css | `client/src/pages/Popup/PopupEditor.css` | 에디터 스타일 |
| PopupModal.jsx | `client/src/components/Popup/PopupModal.jsx` | 사용자용 팝업 표시 컴포넌트 |
| PopupModal.css | `client/src/components/Popup/PopupModal.css` | 팝업 모달 스타일 |

### 수정된 파일

| 파일 | 경로 | 수정 내용 |
|------|------|----------|
| index.js | `src/models/index.js` | popup 모델 등록 |
| index.js | `src/routes/index.js` | popup 라우트 등록 |
| App.js | `client/src/App.js` | PopupAdmin, PopupEditor 라우트 및 PopupModal 컴포넌트 추가 |
| Admin.jsx | `client/src/pages/Admin/Admin.jsx` | 팝업 관리 탭 추가 |
| Admin.css | `client/src/pages/Admin/Admin.css` | 탭 너비 조정 (50% → 33.33%) |

---

## API 엔드포인트

| 메서드 | 경로 | 설명 |
|--------|------|------|
| POST | `/api/popup` | 팝업 생성 |
| POST | `/api/popup/find` | 단일 팝업 조회 |
| PUT | `/api/popup` | 팝업 수정 |
| DELETE | `/api/popup/:id` | 팝업 삭제 |
| GET | `/api/popup` | 전체 팝업 조회 (관리자용) |
| GET | `/api/popup/active` | 활성 팝업 조회 (프론트엔드용) |

---

## 데이터베이스 스키마

```javascript
{
    title: { type: String, required: true },      // 팝업 제목
    image: { type: String, required: true },      // 이미지 경로
    linkUrl: { type: String, default: "" },       // 클릭 시 이동 링크
    isActive: { type: Boolean, default: true },   // 활성화 여부
    startDate: { type: Date },                    // 표시 시작일
    endDate: { type: Date },                      // 표시 종료일
    order: { type: Number, default: 0 },          // 표시 순서
    createdAt: { type: Date, default: Date.now }  // 생성일
}
```

---

## 기능 상세

### 백오피스 기능 (`/admin/popup`)

1. **팝업 목록 조회**
   - 등록된 모든 팝업 목록 표시
   - 이미지 썸네일, 제목, 상태, 기간, 링크 정보 표시

2. **팝업 추가/수정**
   - 팝업 제목 (필수)
   - 이미지 업로드 (필수) - 기존 업로드 시스템 재활용
   - 클릭 시 이동 링크 (선택)
   - 활성화/비활성화 토글
   - 표시 기간 설정 (시작일 ~ 종료일)
   - 표시 순서 설정

3. **팝업 삭제**
   - 삭제 시 이미지 파일도 함께 삭제

### 프론트엔드 팝업 표시

1. **자동 표시**
   - 메인 페이지 등 접속 시 활성 팝업 자동 표시
   - 기간 설정된 팝업은 해당 기간에만 표시

2. **다중 팝업 지원**
   - 여러 개 팝업 등록 시 좌우 네비게이션 표시
   - 페이지 인디케이터 (1/3 형태)

3. **사용자 편의 기능**
   - "오늘 하루 보지 않기" 버튼 (localStorage 활용)
   - 이미지 클릭 시 설정된 링크로 이동 (새 탭)
   - 닫기 버튼

4. **예외 처리**
   - `/admin/*`, `/login` 페이지에서는 팝업 미표시

---

## 사용 방법

1. 서버 재시작
2. 관리자 로그인
3. `/admin/popup` 접속
4. "+ 팝업 추가" 버튼 클릭
5. 팝업 정보 입력 및 이미지 업로드
6. "팝업 등록" 버튼 클릭
7. 메인 페이지에서 팝업 확인

---

## 권장 이미지 크기

- 가로: 400px ~ 600px
- 세로: 자유 (비율 유지됨)
- 포맷: JPG, PNG, GIF 등

---

## 구현일

2025-12-26
