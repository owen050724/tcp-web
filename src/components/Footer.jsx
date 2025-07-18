import React from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 임포트
import logo from '../logo.svg';

function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Club Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <img src={logo} alt="TCP 로고" className="w-full h-full object-contain" />
              </div>
              <h3 className="orbitron text-lg font-bold gradient-text">TCP</h3>
            </div>
            <p className="text-sm text-gray-400">
              Team Crazy Performance<br />
              컴퓨터공학 동아리
            </p>
          </div>

          {/* Leadership */}
          <div>
            <h4 className="orbitron text-lg font-bold mb-4 text-white">임원진</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div>
                <span className="text-blue-300">회장:</span> 김TCP
              </div>
              <div>
                <span className="text-purple-300">부회장:</span> 이Performance
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="orbitron text-lg font-bold mb-4 text-white">연락처</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <i className="fas fa-phone text-blue-400"></i>
                <span>010-1234-5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-envelope text-purple-400"></i>
                <span>tcp@university.ac.kr</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fab fa-instagram text-pink-400"></i>
                <a href="#" className="hover:text-pink-300 transition-colors">@tcp_official</a>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="orbitron text-lg font-bold mb-4 text-white">법적 정보</h4>
            <div className="space-y-2 text-sm">
              <div>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">이용약관</Link>
              </div>
              <div>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">개인정보처리방침</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2024 TCP (Team Crazy Performance). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;