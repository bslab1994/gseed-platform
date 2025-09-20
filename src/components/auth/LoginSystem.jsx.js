// src/components/auth/LoginSystem.jsx
import React, { useState } from 'react';
import { Building2, User, Lock, ChevronDown, Eye, EyeOff } from 'lucide-react';

const LoginSystem = ({ onLogin, setUser }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    company: '',
    name: '',
    password: ''
  });

  // 샘플 사용자 데이터
  const companies = [
    {
      id: 'abc-design',
      name: 'ABC설계',
      type: 'designer',
      users: [
        { id: 1, name: '김설계', password: '1234', role: 'designer' },
        { id: 2, name: '이건축', password: '1234', role: 'designer' }
      ]
    },
    {
      id: 'xyz-construction',
      name: 'XYZ시공',
      type: 'contractor', 
      users: [
        { id: 3, name: '박시공', password: '1234', role: 'contractor' },
        { id: 4, name: '최건설', password: '1234', role: 'contractor' }
      ]
    },
    {
      id: 'def-consulting',
      name: 'DEF컨설팅',
      type: 'consultant',
      users: [
        { id: 5, name: '정컨설', password: '1234', role: 'consultant' },
        { id: 6, name: '조자문', password: '1234', role: 'consultant' }
      ]
    },
    {
      id: 'admin',
      name: '시스템 관리자',
      type: 'admin',
      users: [
        { id: 7, name: '관리자', password: 'admin', role: 'admin' }
      ]
    }
  ];

  // 사용자별 참여 프로젝트 (샘플 데이터)
  const userProjects = {
    1: [
      { id: 1, name: '○○○ 아파트', status: '진행중', progress: 65, role: '설계 담당' },
      { id: 2, name: '△△△ 오피스텔', status: '완료', progress: 100, role: '설계 담당' }
    ],
    3: [
      { id: 1, name: '○○○ 아파트', status: '진행중', progress: 65, role: '시공 담당' },
      { id: 3, name: '□□□ 학교', status: '대기중', progress: 20, role: '시공 담당' }
    ],
    5: [
      { id: 1, name: '○○○ 아파트', status: '진행중', progress: 65, role: '인증 컨설팅' },
      { id: 2, name: '△△△ 오피스텔', status: '완료', progress: 100, role: '인증 컨설팅' },
      { id: 3, name: '□□□ 학교', status: '대기중', progress: 20, role: '인증 컨설팅' }
    ],
    7: [
      { id: 1, name: '○○○ 아파트', status: '진행중', progress: 65, role: '시스템 관리' },
      { id: 2, name: '△△△ 오피스텔', status: '완료', progress: 100, role: '시스템 관리' },
      { id: 3, name: '□□□ 학교', status: '대기중', progress: 20, role: '시스템 관리' },
      { id: 4, name: '◇◇◇ 병원', status: '설계중', progress: 10, role: '시스템 관리' }
    ]
  };

  const selectedCompany = companies.find(c => c.id === loginData.company);
  const availableUsers = selectedCompany ? selectedCompany.users : [];

  const handleLogin = () => {
    if (!loginData.company || !loginData.name || !loginData.password) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const company = companies.find(c => c.id === loginData.company);
    const user = company?.users.find(u => u.name === loginData.name && u.password === loginData.password);

    if (user) {
      const userData = {
        ...user,
        company: company.name,
        companyType: company.type,
        projects: userProjects[user.id] || []
      };
      setUser(userData);
      onLogin(true);
    } else {
      alert('로그인 정보가 올바르지 않습니다.');
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'designer': return '📐';
      case 'contractor': return '🔨';
      case 'consultant': return '💼';
      case 'admin': return '⚙️';
      default: return '👤';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">녹색건축인증 플랫폼</h1>
          <p className="text-gray-600">로그인하여 프로젝트에 참여하세요</p>
        </div>

        {/* Login Form */}
        <div className="space-y-6">
          {/* Company Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">회사명</label>
            <div className="relative">
              <select
                value={loginData.company}
                onChange={(e) => setLoginData(prev => ({ ...prev, company: e.target.value, name: '', password: '' }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="">회사를 선택하세요</option>
                {companies.map(company => (
                  <option key={company.id} value={company.id}>
                    {getRoleIcon(company.type)} {company.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* User Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">담당자명</label>
            <div className="relative">
              <select
                value={loginData.name}
                onChange={(e) => setLoginData(prev => ({ ...prev, name: e.target.value, password: '' }))}
                disabled={!selectedCompany}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none disabled:bg-gray-50"
              >
                <option value="">담당자를 선택하세요</option>
                {availableUsers.map(user => (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </select>
              <User className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={loginData.password}
                onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="비밀번호를 입력하세요"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-blue-700 transition-colors"
          >
            로그인
          </button>
        </div>

        {/* Demo Info */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">테스트 계정</h4>
          <div className="text-xs text-gray-600 space-y-1">
            <div>📐 ABC설계 - 김설계 (1234)</div>
            <div>🔨 XYZ시공 - 박시공 (1234)</div>
            <div>💼 DEF컨설팅 - 정컨설 (1234)</div>
            <div>⚙️ 관리자 - 관리자 (admin)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSystem;