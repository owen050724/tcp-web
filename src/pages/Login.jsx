import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // React Router Link 임포트
import logo from '../logo.svg'; // src 폴더에 있는 logo.svg를 상대 경로로 임포트

function Login() {
  // 아이디, 비밀번호, 로그인 상태 유지 체크박스 상태 관리
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    if (!username || !password) {
      alert('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    // 실제 로그인 로직 (서버 통신 등)은 여기에 구현됩니다.
    // 현재는 시뮬레이션 메시지만 출력합니다.
    alert('로그인 기능은 준비중입니다.');
    console.log('로그인 시도:', { username, password, keepLoggedIn });

    // 폼 초기화 (선택 사항)
    // setUsername('');
    // setPassword('');
    // setKeepLoggedIn(false);
  };

  // 인풋 필드 포커스 효과 (선택 사항: CSS로만 처리하는 경우 불필요)
  // 여기서는 기존 HTML의 JS 효과를 재현하기 위해 useEffect를 사용합니다.
  useEffect(() => {
    const inputFields = document.querySelectorAll('.input-field');

    const handleFocus = (event) => {
      event.target.parentElement.style.transform = 'scale(1.02)';
    };

    const handleBlur = (event) => {
      event.target.parentElement.style.transform = 'scale(1)';
    };

    inputFields.forEach(input => {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
    });

    return () => {
      inputFields.forEach(input => {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      });
    };
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  return (
    <>
      {/* Login Section */}
      <section className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <img src={logo} alt="TCP 로고" className="w-full h-full object-contain" />
              </div>
              <h1 className="orbitron text-3xl font-bold gradient-text mb-2">TCP 로그인</h1>
              <p className="text-gray-400">Team Crazy Performance에 오신 것을 환영합니다</p>
            </div>

            {/* Login Form */}
            <div className="login-card p-8 rounded-2xl card-hover">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="username">아이디</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      id="username"
                      className="input-field w-full px-4 py-3 rounded-lg text-white placeholder-gray-400"
                      placeholder="ID"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <i className="fas fa-user absolute right-3 top-3.5 text-gray-400"></i>
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="password">비밀번호</label>
                  <div className="relative">
                    <input 
                      type="password" 
                      id="password"
                      className="input-field w-full px-4 py-3 rounded-lg text-white placeholder-gray-400"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <i className="fas fa-lock absolute right-3 top-3.5 text-gray-400"></i>
                  </div>
                </div>

                {/* Keep me logged in */}
                <div className="checkbox-container">
                  <input 
                    type="checkbox" 
                    id="keepLogin" 
                    className="custom-checkbox"
                    checked={keepLoggedIn}
                    onChange={(e) => setKeepLoggedIn(e.target.checked)}
                  />
                  <label htmlFor="keepLogin" className="text-sm text-gray-300 cursor-pointer">로그인 상태 유지</label>
                </div>

                {/* Login Button */}
                <button 
                  type="submit" 
                  className="login-button w-full py-3 rounded-lg text-white font-semibold orbitron text-lg"
                >
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  로그인
                </button>

                {/* Secondary Actions */}
                <div className="flex justify-center space-x-6 text-sm pt-4">
                  <Link to="#" className="secondary-link hover:underline">
                    <i className="fas fa-search mr-1"></i>
                    아이디 찾기
                  </Link>
                  <span className="text-gray-600">|</span>
                  <Link to="#" className="secondary-link hover:underline">
                    <i className="fas fa-key mr-1"></i>
                    비밀번호 재설정
                  </Link>
                  <span className="text-gray-600">|</span>
                  <Link to="/register" className="secondary-link hover:underline"> {/* 회원가입 링크 */}
                    <i className="fas fa-user-plus mr-1"></i>
                    회원가입
                  </Link>
                </div>
              </form>
            </div>

            {/* Additional Info */}
            <div className="text-center mt-8 text-sm text-gray-400">
              <p>TCP 회원이 아니신가요? <Link to="/recruitment" className="text-blue-400 hover:text-blue-300 underline">지금 가입하세요</Link></p> {/* 가입 링크 */}
              <p className="mt-2">문의사항: <span className="text-blue-400">contact@tcp.club</span></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;