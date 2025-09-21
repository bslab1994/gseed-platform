// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import App from './App';

// React 18의 새로운 createRoot API 사용
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 성능 측정을 위한 함수 (선택사항)
// 자세한 내용: https://bit.ly/CRA-vitals
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// 성능 측정 시작 (필요시 함수 전달)
reportWebVitals();