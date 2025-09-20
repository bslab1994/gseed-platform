// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginSystem from './components/auth/LoginSystem';
import ProjectList from './components/project/ProjectList';
import MainDashboard from './components/dashboard/MainDashboard';
import ItemManagementPage from './components/items/ItemManagementPage';
import AdminGSeedManagement from './components/admin/AdminGSeedManagement';
import ProjectCreationWizard from './components/project/ProjectCreationWizard';
import './styles/globals.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleLogin = (loginStatus) => {
    setIsLoggedIn(loginStatus);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSelectedProject(null);
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 로그인 페이지 */}
          <Route 
            path="/login" 
            element={
              isLoggedIn ? 
                <Navigate to="/projects" /> : 
                <LoginSystem onLogin={handleLogin} setUser={setCurrentUser} />
            } 
          />

          {/* 프로젝트 목록 (로그인 후 첫 화면) */}
          <Route 
            path="/projects" 
            element={
              isLoggedIn ? 
                <ProjectList 
                  user={currentUser} 
                  onProjectSelect={handleProjectSelect}
                  onLogout={handleLogout}
                /> : 
                <Navigate to="/login" />
            } 
          />

          {/* 프로젝트 대시보드 */}
          <Route 
            path="/project/:id/dashboard" 
            element={
              isLoggedIn && selectedProject ? 
                <MainDashboard 
                  user={currentUser} 
                  project={selectedProject}
                  onLogout={handleLogout}
                /> : 
                <Navigate to="/projects" />
            } 
          />

          {/* 세부항목 관리 */}
          <Route 
            path="/project/:id/items/:category" 
            element={
              isLoggedIn && selectedProject ? 
                <ItemManagementPage 
                  user={currentUser} 
                  project={selectedProject}
                /> : 
                <Navigate to="/projects" />
            } 
          />

          {/* 프로젝트 생성 (관리자만) */}
          <Route 
            path="/admin/project/create" 
            element={
              isLoggedIn && currentUser?.role === 'admin' ? 
                <ProjectCreationWizard user={currentUser} /> : 
                <Navigate to="/projects" />
            } 
          />

          {/* G-SEED 기준 관리 (관리자만) */}
          <Route 
            path="/admin/gseed" 
            element={
              isLoggedIn && currentUser?.role === 'admin' ? 
                <AdminGSeedManagement user={currentUser} /> : 
                <Navigate to="/projects" />
            } 
          />

          {/* 기본 경로 */}
          <Route 
            path="/" 
            element={<Navigate to={isLoggedIn ? "/projects" : "/login"} />} 
          />

          {/* 404 페이지 */}
          <Route 
            path="*" 
            element={
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-gray-600 mb-8">페이지를 찾을 수 없습니다.</p>
                  <button 
                    onClick={() => window.location.href = '/'}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    홈으로 돌아가기
                  </button>
                </div>
              </div>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;