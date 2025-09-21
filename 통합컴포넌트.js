// ===== GSeed Platform - 녹색건축인증 관리 시스템 =====
// 개발 날짜: 2024년 12월
// 개발자: [이름]
// 설명: React 기반 녹색건축인증 프로젝트 관리 플랫폼

// ===== 1. 로그인 시스템 (LoginSystem.jsx) =====
import React, { useState } from 'react';
import { Building2, User, Lock, ChevronDown, Eye, EyeOff } from 'lucide-react';

const LoginSystem = () => {
  // 로그인 시스템 코드
  // (이전에 만든 LoginSystem 컴포넌트 전체 코드)
};

// ===== 2. 프로젝트 생성 마법사 (ProjectCreationWizard.jsx) =====
import React, { useState } from 'react';
import { Building2, Users, Calendar, FileText, Settings, ChevronLeft, ChevronRight, Upload, X } from 'lucide-react';

const ProjectCreationWizard = () => {
  // 프로젝트 생성 마법사 코드
  // (이전에 만든 ProjectCreationWizard 컴포넌트 전체 코드)
};

// ===== 3. 참여자 계정 관리 (EnhancedProjectCreation.jsx) =====
import React, { useState } from 'react';
import { Users, Eye, EyeOff, Mail, RefreshCw, Copy, Building2, UserPlus, Trash2, Settings } from 'lucide-react';

const EnhancedProjectCreation = () => {
  // 참여자 계정 관리 코드
  // (이전에 만든 EnhancedProjectCreation 컴포넌트 전체 코드)
};

// ===== 4. 메인 대시보드 (MainDashboard.jsx) =====
import React, { useState } from 'react';
import { Bell, Search, User, Menu, BarChart3, FileText, Upload, MessageCircle, Calendar, AlertTriangle, CheckCircle, Clock, XCircle, Eye, Download, Send } from 'lucide-react';

const MainDashboard = () => {
  // 메인 대시보드 코드
  // (이전에 만든 MainDashboard 컴포넌트 전체 코드)
};

// ===== 5. 세부항목 관리 (ItemManagementPage.jsx) =====
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Clock, Upload, Download, Send, MessageCircle, User, Phone, Mail, FileText, AlertCircle, Star } from 'lucide-react';

const ItemManagementPage = () => {
  // 세부항목 관리 코드
  // (이전에 만든 ItemManagementPage 컴포넌트 전체 코드)
};

// ===== 6. 관리자 G-SEED 관리 (AdminGSeedManagement.jsx) =====
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Download, Settings, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

const AdminGSeedManagement = () => {
  // G-SEED 기준 관리 코드
  // (이전에 만든 AdminGSeedManagement 컴포넌트 전체 코드)
};

// ===== 7. 메인 앱 라우터 (App.jsx) =====
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={
              isLoggedIn ? 
                <Navigate to="/dashboard" /> : 
                <LoginSystem onLogin={setIsLoggedIn} setUser={setCurrentUser} />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isLoggedIn ? 
                <MainDashboard user={currentUser} /> : 
                <Navigate to="/login" />
            } 
          />
          <Route 
            path="/project/create" 
            element={
              isLoggedIn && currentUser?.role === 'admin' ? 
                <EnhancedProjectCreation /> : 
                <Navigate to="/dashboard" />
            } 
          />
          <Route 
            path="/project/:id/items" 
            element={
              isLoggedIn ? 
                <ItemManagementPage user={currentUser} /> : 
                <Navigate to="/login" />
            } 
          />
          <Route 
            path="/admin/gseed" 
            element={
              isLoggedIn && currentUser?.role === 'admin' ? 
                <AdminGSeedManagement /> : 
                <Navigate to="/dashboard" />
            } 
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

// ===== 8. package.json =====
/*
{
  "name": "gseed-platform",
  "version": "1.0.0",
  "description": "녹색건축인증 프로젝트 관리 플랫폼",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "lucide-react": "^0.263.1",
    "axios": "^1.3.0",
    "@tailwindcss/forms": "^0.5.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "devDependencies": {
    "react-scripts": "5.0.1",
    "tailwindcss": "^3.2.0",
    "autoprefixer": "^10.4.13",
    "postcss": "^8.4.21"
  }
}
*/

// ===== 9. 시놀로지 NAS API 서비스 (nasAPI.js) =====
import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-nas-domain.com/api'
  : 'http://localhost:3001/api';

const nasAPI = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000
});

// 파일 업로드
export const uploadFile = async (file, projectId, category) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('projectId', projectId);
  formData.append('category', category);
  
  return await nasAPI.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) => {
      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      console.log(`Upload Progress: ${progress}%`);
    }
  });
};

// 파일 목록 조회
export const getFiles = async (projectId) => {
  return await nasAPI.get(`/files/${projectId}`);
};

// 파일 다운로드
export const downloadFile = async (fileId) => {
  return await nasAPI.get(`/download/${fileId}`, {
    responseType: 'blob'
  });
};

// 프로젝트 생성
export const createProject = async (projectData) => {
  return await nasAPI.post('/projects', projectData);
};

// ===== 10. 시놀로지 Docker 서버 (server.js) =====
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// CORS 설정
app.use(cors({
  origin: ['https://your-nas-domain.com', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

// 파일 업로드 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { projectId, category } = req.body;
    const uploadPath = `/volume1/web/gseed-data/projects/${projectId}/${category}`;
    
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().toISOString().slice(0,10).replace(/-/g,'');
    const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
    cb(null, `${timestamp}_${originalName}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }
});

// API 라우트
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.json({
    success: true,
    file: {
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      path: req.file.path
    }
  });
});

app.get('/api/files/:projectId', (req, res) => {
  const { projectId } = req.params;
  const projectPath = `/volume1/web/gseed-data/projects/${projectId}`;
  
  if (!fs.existsSync(projectPath)) {
    return res.json({ files: [] });
  }
  
  const files = getAllFiles(projectPath);
  res.json({ files });
});

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      const stats = fs.statSync(fullPath);
      arrayOfFiles.push({
        name: file,
        path: fullPath,
        size: stats.size,
        modified: stats.mtime,
        category: path.basename(path.dirname(fullPath))
      });
    }
  });
  
  return arrayOfFiles;
}

app.listen(PORT, () => {
  console.log(`GSeed API 서버가 포트 ${PORT}에서 실행중입니다.`);
});

// ===== 11. 시놀로지 배포용 Dockerfile =====
/*
FROM node:18-alpine

WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm install

# 소스 복사
COPY . .

# React 앱 빌드
RUN npm run build

# 포트 노출
EXPOSE 3000

# 서버 실행
CMD ["npm", "start"]
*/

// ===== 개발 노트 =====
/*
완성된 기능:
✅ 로그인 시스템 (회사별 사용자 관리)
✅ 프로젝트 생성 마법사 (5단계)
✅ 참여자 계정 자동 생성
✅ 메인 대시보드 (진행률, 알림)
✅ 세부항목 관리 (토지이용 및 교통)
✅ 관리자 G-SEED 기준 편집
✅ 권한별 접근 제어

진행중인 기능:
🔄 파일 업로드 시스템
🔄 나머지 6개 평가분야
🔄 자료요청 이메일 시스템

예정 기능:
⏳ 자체평가서 자동 생성
⏳ 시놀로지 NAS 완전 연동
⏳ 모바일 최적화

기술 스택:
- Frontend: React, Tailwind CSS, Lucide React
- Backend: Node.js, Express, Multer
- Database: PostgreSQL + 시놀로지 NAS
- Deployment: 시놀로지 Docker

설치 방법:
1. npm install
2. npm start (개발모드)
3. npm run build (프로덕션 빌드)
4. 시놀로지 NAS Docker 배포
*/