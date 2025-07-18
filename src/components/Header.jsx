import React from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 임포트
import logo from '../logo.svg';

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          {/* Link to home page */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10">
              <img src={logo} alt="TCP 로고" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="orbitron text-xl font-bold gradient-text">TCP</h1>
              <p className="text-xs text-gray-400">Team Crazy Performance</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            {/* 각 메뉴 항목을 Link 컴포넌트로 변경 */}
            <Link to="/about" className="nav-link orbitron text-sm font-medium text-gray-300 hover:text-white">About</Link>
            <Link to="/members" className="nav-link orbitron text-sm font-medium text-gray-300 hover:text-white">Members</Link>
            <Link to="/recruitment" className="nav-link orbitron text-sm font-medium text-gray-300 hover:text-white">Recruitment</Link>
            <Link to="/announcement" className="nav-link orbitron text-sm font-medium text-gray-300 hover:text-white">Announcement</Link>
            <Link to="/study" className="nav-link orbitron text-sm font-medium text-gray-300 hover:text-white">Study</Link>
            <Link to="/team" className="nav-link orbitron text-sm font-medium text-gray-300 hover:text-white">Find Your Team</Link>
          </nav>

          {/* Login/Sign Up */}
          <div className="flex space-x-3">
            <Link to="/login" className="px-4 py-2 text-sm border border-gray-600 rounded-lg hover:border-gray-400 transition-colors">Login</Link>
            <Link to="/register" className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors">Sign Up</Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden">
            <i className="fas fa-bars text-white"></i>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;