# GSeed Platform - 녹색건축인증 관리 시스템

React 기반의 녹색건축인증(G-SEED) 프로젝트 관리 플랫폼입니다. 
건설 프로젝트의 녹색건축인증 과정을 체계적으로 관리하고, 
참여자들 간의 협업을 지원합니다.

## 🚀 주요 기능

### ✅ 완성된 기능
- **로그인 시스템**: 회사별 사용자 관리 (설계사, 시공사, 컨설턴트, 관리자)
- **프로젝트 생성**: 5단계 마법사를 통한 프로젝트 설정
- **참여자 관리**: 자동 계정 생성 및 권한 배정
- **메인 대시보드**: 실시간 진행률 및 현황 모니터링
- **세부항목 관리**: G-SEED 평가항목별 관리 (토지이용 및 교통)
- **관리자 모드**: G-SEED 기준 편집 시스템

### 🔄 개발 중인 기능
- 파일 업로드 시스템
- 나머지 6개 평가분야 (에너지, 재료, 물순환, 유지관리, 생태환경, 실내환경)
- 자료요청 이메일 시스템

### ⏳ 예정 기능
- 자체평가서 자동 생성
- 시놀로지 NAS 완전 연동
- 모바일 최적화

## 🛠 기술 스택

### Frontend
- **React 18**: UI 라이브러리
- **React Router**: 라우팅
- **Tailwind CSS**: 스타일링
- **Lucide React**: 아이콘
- **Axios**: HTTP 클라이언트

### Backend (예정)
- **Node.js**: 서버 런타임
- **Express.js**: 웹 프레임워크
- **Multer**: 파일 업로드
- **PostgreSQL**: 데이터베이스

### Deployment
- **시놀로지 NAS**: 자체 호스팅
- **Docker**: 컨테이너화
- **Nginx**: 웹서버/프록시

## 📦 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/[사용자명]/gseed-platform.git
cd gseed-platform
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm start
```

브라우저에서 `http://localhost:3000`으로 접속

### 4. 프로덕션 빌드
```bash
npm run build
```

## 🎯 사용 방법

### 테스트 계정
| 역할 | 회사명 | 사용자명 | 비밀번호 |
|------|--------|----------|----------|
| 설계사 | ABC설계 | 김설계 | 1234 |
| 시공사 | XYZ시공 | 박시공 | 1234 |
| 컨설턴트 | DEF컨설팅 | 정컨설 | 1234 |
| 관리자 | 시스템 관리자 | 관리자 | admin |

### 기본 워크플로우
1. **로그인** → 회사 선택 → 담당자 선택 → 비밀번호 입력
2. **프로젝트 목록** → 참여 중인 프로젝트 확인
3. **프로젝트 입장** → 대시보드에서 전체 현황 확인
4. **세부항목 관리** → 각 평가분야별 작업 수행
5. **파일 업로드** → 필요 서류 제출
6. **자료요청** → 타 참여자에게 자료 요청

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── auth/           # 인증 관련
│   ├── project/        # 프로젝트 관리
│   ├── dashboard/      # 대시보드
│   ├── items/          # 세부항목 관리
│   ├── admin/          # 관리자 기능
│   ├── files/          # 파일 관리
│   └── common/         # 공통 컴포넌트
├── pages/              # 페이지 컴포넌트
├── hooks/              # 커스텀 훅
├── services/           # API 서비스
├── utils/              # 유틸리티
├── data/               # 샘플 데이터
└── styles/             # 스타일
```

## 🔧 개발 가이드

### 새로운 평가분야 추가
1. `src/data/gseedData.js`에 새 카테고리 데이터 추가
2. `src/components/items/ItemManagementPage.jsx`에 라우팅 추가
3. 필요시 전용 컴포넌트 생성

### 새로운 권한 추가
1. `src/data/sampleUsers.js`에 역할 정의
2. `src/components/auth/LoginSystem.jsx`에 권한 로직 추가
3. 각 컴포넌트에서 권한 체크 구현

### API 연동
1. `src/services/api.js`에 새 엔드포인트 추가
2. 컴포넌트에서 `useEffect`로 데이터 로딩
3. 에러 핸들링 및 로딩 상태 관리

## 🚀 배포 가이드

### 시놀로지 NAS 배포
1. **Web Station 설정**
2. **Docker 컨테이너 준비**
3. **빌드 파일 업로드**
4. **도메인 연결**

자세한 배포 가이드는 `docs/DEPLOYMENT.md` 참조

## 📝 기여하기

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 개발 로드맵

### v1.0 (현재)
- [x] 로그인 시스템
- [x] 프로젝트 생성
- [x] 기본 대시보드
- [x] 1개 평가분야 (토지이용 및 교통)

### v1.1
- [ ] 파일 업로드 시스템
- [ ] 나머지 6개 평가분야
- [ ] 자료요청 이메일

### v1.2
- [ ] 자체평가서 자동 생성
- [ ] 고급 권한 관리
- [ ] 알림 시스템

### v2.0
- [ ] 모바일 앱
- [ ] API 개방
- [ ] 다국어 지원

## 🐛 알려진 이슈

- 현재 샘플 데이터로만 동작 (실제 DB 연동 필요)
- 파일 업로드 UI만 구현 (백엔드 연동 필요)
- 이메일 발송 기능 미구현

## 💡 FAQ

**Q: 어떤 브라우저를 지원하나요?**
A: Chrome, Firefox, Safari, Edge 최신 버전을 지원합니다.

**Q: 오프라인에서도 사용할 수 있나요?**
A: 현재는 온라인 전용입니다. PWA 지원은 v2.0에서 예정됩니다.

**Q: 모바일에서도 사용할 수 있나요?**
A: 반응형 디자인으로 모바일 브라우저에서 사용 가능하지만, 전용 앱은 v2.0에서 제공됩니다.

## 📞 지원

- 🐛 **버그 신고**: [Issues](https://github.com/[사용자명]/gseed-platform/issues)
- 💡 **기능 제안**: [Discussions](https://github.com/[사용자명]/gseed-platform/discussions)
- 📧 **이메일**: [이메일 주소]

## 📄 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙏 감사의 말

- **Tailwind CSS**: 빠른 스타일링
- **Lucide React**: 아름다운 아이콘
- **React 팀**: 훌륭한 프레임워크

---

**Made with ❤️ for 녹색건축인증 업계**

> 지속 가능한 건축을 위한 디지털 혁신 