import React, { useState, useEffect } from 'react';
import logo from '../logo.svg'; // src 폴더에 있는 logo.svg를 상대 경로로 임포트

function AdminDashboard() {
  // 모바일 사이드바 열림/닫힘 상태
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // 서버 시간 상태
  const [serverTime, setServerTime] = useState('');

  // 컴포넌트 마운트 시 JavaScript 로직 실행
  useEffect(() => {
    // Mobile sidebar toggle
    // React state로 제어하므로, DOM 이벤트를 직접 추가할 필요가 없습니다.
    // 버튼의 onClick 핸들러만 설정하면 됩니다.

    // Live server time clock
    const updateServerTime = () => {
      const now = new Date();
      setServerTime(now.toLocaleTimeString('ko-KR'));
    };

    // 1초마다 시간 업데이트
    const intervalId = setInterval(updateServerTime, 1000);
    updateServerTime(); // 초기 시간 설정

    // 컴포넌트 언마운트 시 클린업
    return () => {
      clearInterval(intervalId); // 인터벌 해제
    };
  }, []); // 빈 배열을 두어 컴포넌트가 처음 마운트될 때 한 번만 실행되도록 합니다.

  return (
    <div className="flex h-screen bg-primary-black"> {/* 전역 bg-primary-black 적용 */}
      <aside id="sidebar" className={`sidebar flex-shrink-0 p-4 ${isSidebarOpen ? 'open' : ''}`}>
        <div className="flex items-center space-x-3 mb-8 px-2">
          <img src={logo} alt="TCP 로고" className="w-10 h-10 object-contain" />
          <div>
            <h1 className="orbitron text-xl font-bold gradient-text">TCP</h1>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>

        <nav className="space-y-4">
          <div>
            <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Dashboard</h3>
            <a href="#" className="sidebar-link bg-gray-700 text-white">
              <i className="fas fa-home"></i><span className="ml-2">Overview</span>
            </a>
          </div>

          <div>
            <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Page Management</h3>
            <a href="#" className="sidebar-link"><i className="fas fa-file-alt"></i><span className="ml-2">Main Page</span></a>
            <a href="#" className="sidebar-link"><i className="fas fa-bullhorn"></i><span className="ml-2">Recruitment Page</span></a>
            <a href="#" className="sidebar-link"><i className="fas fa-newspaper"></i><span className="ml-2">Announcement Page</span></a>
            <a href="#" className="sidebar-link"><i className="fas fa-book"></i><span className="ml-2">Study Group Page</span></a>
            <a href="#" className="sidebar-link"><i className="fas fa-project-diagram"></i><span className="ml-2">Project Team Page</span></a>
          </div>

          <div>
            <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Account Management</h3>
            <a href="#" className="sidebar-link"><i className="fas fa-user-shield"></i><span className="ml-2">Manage Permissions</span></a>
            <a href="#" className="sidebar-link"><i className="fas fa-user-slash"></i><span className="ml-2">Delete Accounts</span></a>
            <a href="#" className="sidebar-link"><i className="fas fa-database"></i><span className="ml-2">Modify Information</span></a>
          </div>

          <div>
            <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Application Management</h3>
            <a href="#" className="sidebar-link"><i className="fas fa-user-plus"></i><span className="ml-2">New Member Applications</span></a>
          </div>

          <div>
            <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Web Server Management</h3>
            <a href="#" className="sidebar-link"><i className="fas fa-server"></i><span className="ml-2">Server Tools</span></a>
          </div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex-shrink-0 bg-black bg-opacity-90 backdrop-blur-md border-b border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <button id="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden text-white">
                <i className="fas fa-bars text-xl"></i>
              </button>
              
              <h2 className="orbitron text-2xl font-bold text-white hidden md:block">Dashboard</h2>

              <div className="flex items-center space-x-4">
                <button className="text-gray-400 hover:text-white"><i className="fas fa-bell"></i></button>
                <div className="flex items-center space-x-2">
                  <img src="https://i.pravatar.cc/40?u=admin" alt="Admin" className="w-8 h-8 rounded-full" />
                  <span className="text-sm font-medium">Admin Kim</span>
                </div>
                <button className="px-4 py-2 text-sm border border-gray-600 rounded-lg hover:border-gray-400 transition-colors">Logout</button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-primary-black p-6">
          <div className="container mx-auto">
            <section className="mb-8">
              <h3 className="orbitron text-2xl font-bold gradient-text mb-4">TCP Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="widget-card p-6 rounded-xl">
                  <h4 className="font-bold text-lg mb-4 text-blue-300">총 회원 수</h4>
                  <div className="text-4xl font-black gradient-text mb-4">185</div>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li className="flex justify-between"><span>재학생</span><span className="font-semibold text-white">52</span></li>
                    <li className="flex justify-between"><span>휴학생</span><span className="font-semibold text-white">5</span></li>
                    <li className="flex justify-between"><span>졸업생</span><span className="font-semibold text-white">120</span></li>
                    <li className="flex justify-between"><span>탈퇴</span><span className="font-semibold text-white">4</span></li>
                    <li className="flex justify-between"><span>재적</span><span className="font-semibold text-white">3</span></li>
                    <li className="flex justify-between"><span>기타</span><span className="font-semibold text-white">1</span></li>
                  </ul>
                </div>
                <div className="widget-card p-6 rounded-xl">
                  <h4 className="font-bold text-lg mb-4 text-purple-300">총 스터디 수</h4>
                  <div className="text-4xl font-black gradient-text mb-4">35</div>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li className="flex justify-between"><span>진행중</span><span className="font-semibold text-white">10</span></li>
                    <li className="flex justify-between"><span>완료</span><span className="font-semibold text-white">22</span></li>
                    <li className="flex justify-between"><span>취소</span><span className="font-semibold text-white">3</span></li>
                    <li className="flex justify-between"><span>기타</span><span className="font-semibold text-white">0</span></li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="orbitron text-2xl font-bold gradient-text mb-4">Server Status Panel</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div className="widget-card p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-microchip text-blue-400"></i>
                      <h5 className="font-semibold text-gray-300">CPU Usage</h5>
                    </div>
                    <span className="text-lg font-bold text-white">42%</span>
                  </div>
                  <div className="progress-bar h-2"><div className="progress-bar-inner" style={{ width: '42%' }}></div></div>
                </div>
                <div className="widget-card p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-memory text-purple-400"></i>
                      <h5 className="font-semibold text-gray-300">RAM Usage</h5>
                    </div>
                    <span className="text-lg font-bold text-white">6.8 / 16 GB</span>
                  </div>
                  <div className="progress-bar h-2"><div className="progress-bar-inner" style={{ width: '42.5%' }}></div></div>
                </div>
                <div className="widget-card p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-thermometer-half text-red-400"></i>
                    <h5 className="font-semibold text-gray-300">CPU Temp</h5>
                  </div>
                  <span className="text-lg font-bold text-white">58°C</span>
                </div>
                <div className="widget-card p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-hdd text-green-400"></i>
                      <h5 className="font-semibold text-gray-300">Disk Usage</h5>
                    </div>
                    <span className="text-lg font-bold text-white">75%</span>
                  </div>
                  <div className="progress-bar h-2"><div className="progress-bar-inner bg-green-500" style={{ width: '75%' }}></div></div>
                </div>
                <div className="widget-card p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-network-wired text-yellow-400"></i>
                    <h5 className="font-semibold text-gray-300">Network</h5>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-white"><i className="fas fa-arrow-up"></i> TX: 15.2 Mbps</div>
                    <div className="text-sm font-bold text-white"><i className="fas fa-arrow-down"></i> RX: 88.4 Mbps</div>
                  </div>
                </div>
                <div className="widget-card p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-clock text-pink-400"></i>
                    <h5 className="font-semibold text-gray-300">Server Uptime</h5>
                  </div>
                  <span className="text-sm font-bold text-white">42d 11h 5m</span>
                </div>
                <div className="widget-card p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-calendar-alt text-cyan-400"></i>
                    <h5 className="font-semibold text-gray-300">Server Time</h5>
                  </div>
                  <span id="server-time" className="text-sm font-bold text-white">{serverTime}</span>
                </div>
                <div className="widget-card p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-users text-indigo-400"></i>
                    <h5 className="font-semibold text-gray-300">Current Users</h5>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-white">Logged-in: 4</div>
                    <div className="text-sm font-bold text-white">Guests: 12</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;