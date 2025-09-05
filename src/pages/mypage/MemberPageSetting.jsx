import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import MyPageLayout from '../../components/MyPageLayout';

const MemberPageSetting = () => {
  const { showNotification } = useOutletContext();
  const [settings, setSettings] = useState({
    email: true,
    techstack: true,
    career: true,
    github: true,
    portfolio: true,
  });

  const toggleSetting = (settingName) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [settingName]: !prevSettings[settingName],
    }));
  };

  const saveSettings = () => {
    showNotification('설정이 저장되었습니다.', 'success');
    console.log('Settings saved:', settings);
  };

  const resetSettings = () => {
    setSettings({
      email: true,
      techstack: true,
      career: true,
      github: true,
      portfolio: true,
    });
    showNotification('설정이 초기화되었습니다.', 'info');
  };

  const ToggleSwitch = ({ settingName, isActive, onClick }) => (
    <div
      className={`toggle-switch ${isActive ? 'active' : ''}`}
      onClick={onClick}
    ></div>
  );

  return (
    <MyPageLayout>
      <main className="flex-1 p-6">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-6">
            <h3 className="text-3xl font-bold gradient-text mb-2">
              멤버 페이지 공개 설정
            </h3>
            <p className="text-gray-400">
              멤버 페이지에서 다른 사람들에게 공개할 정보를 선택해주세요.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="widget-card p-6 rounded-xl">
                <h4 className="text-xl font-bold text-white mb-4">
                  항상 공개되는 정보
                </h4>
                <p className="text-sm text-gray-400 mb-6">
                  다음 정보는 멤버 페이지에서 항상 공개됩니다.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800 bg-opacity-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-user-circle text-blue-400"></i>
                      <div>
                        <h5 className="font-semibold text-white">
                          프로필 사진
                        </h5>
                        <p className="text-sm text-gray-400">
                          설정된 프로필 이미지
                        </p>
                      </div>
                    </div>
                    <i className="fas fa-lock text-gray-500"></i>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-800 bg-opacity-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-id-card text-green-400"></i>
                      <div>
                        <h5 className="font-semibold text-white">이름</h5>
                        <p className="text-sm text-gray-400">Admin Kim</p>
                      </div>
                    </div>
                    <i className="fas fa-lock text-gray-500"></i>
                  </div>
                </div>
              </div>

              <div className="widget-card p-6 rounded-xl">
                <h4 className="text-xl font-bold text-white mb-4">
                  선택적 공개 정보
                </h4>
                <p className="text-sm text-gray-400 mb-6">
                  다음 정보들은 원하는 경우에만 공개할 수 있습니다.
                </p>
                <div className="space-y-4">
                  <div className="setting-item">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <i className="fas fa-envelope text-blue-400"></i>
                        <div>
                          <h5 className="font-semibold text-white">이메일</h5>
                          <p className="text-sm text-gray-400">
                            kimtcp@seoultech.ac.kr
                          </p>
                        </div>
                      </div>
                      <ToggleSwitch
                        settingName="email"
                        isActive={settings.email}
                        onClick={() => toggleSetting('email')}
                      />
                    </div>
                  </div>
                  <div className="setting-item">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <i className="fas fa-code text-purple-400"></i>
                        <div>
                          <h5 className="font-semibold text-white">
                            기술 스택
                          </h5>
                          <p className="text-sm text-gray-400">
                            JavaScript, React, Node.js, Python, MySQL
                          </p>
                        </div>
                      </div>
                      <ToggleSwitch
                        settingName="techstack"
                        isActive={settings.techstack}
                        onClick={() => toggleSetting('techstack')}
                      />
                    </div>
                  </div>
                  <div className="setting-item">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <i className="fas fa-briefcase text-green-400"></i>
                        <div>
                          <h5 className="font-semibold text-white">
                            현재 상태
                          </h5>
                          <p className="text-sm text-gray-400">
                            컴퓨터공학과 20학번 재학생
                          </p>
                        </div>
                      </div>
                      <ToggleSwitch
                        settingName="career"
                        isActive={settings.career}
                        onClick={() => toggleSetting('career')}
                      />
                    </div>
                  </div>
                  <div className="setting-item">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <i className="fab fa-github text-pink-400"></i>
                        <div>
                          <h5 className="font-semibold text-white">
                            GitHub 링크
                          </h5>
                          <p className="text-sm text-gray-400">
                            github.com/kimtcp
                          </p>
                        </div>
                      </div>
                      <ToggleSwitch
                        settingName="github"
                        isActive={settings.github}
                        onClick={() => toggleSetting('github')}
                      />
                    </div>
                  </div>
                  <div className="setting-item">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <i className="fas fa-link text-yellow-400"></i>
                        <div>
                          <h5 className="font-semibold text-white">
                            포트폴리오 링크
                          </h5>
                          <p className="text-sm text-gray-400">
                            portfolio.kimtcp.com
                          </p>
                        </div>
                      </div>
                      <ToggleSwitch
                        settingName="portfolio"
                        isActive={settings.portfolio}
                        onClick={() => toggleSetting('portfolio')}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={saveSettings}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors font-bold"
                >
                  <i className="fas fa-save mr-2"></i>설정 저장
                </button>
                <button
                  onClick={resetSettings}
                  className="px-6 py-3 border border-gray-600 rounded-lg hover:border-gray-400 transition-colors"
                >
                  <i className="fas fa-undo mr-2"></i>초기화
                </button>
              </div>
            </div>

            <div className="preview-container">
              <div className="widget-card p-6 rounded-xl">
                <h4 className="text-xl font-bold gradient-text mb-4">
                  실시간 미리보기
                </h4>
                <p className="text-sm text-gray-400 mb-6">
                  설정 변경사항이 실시간으로 반영됩니다.
                </p>
                <div
                  id="member-preview"
                  className="member-card p-6 rounded-xl text-center card-hover"
                >
                  <div className="img-container mx-auto">
                    <img
                      src="https://via.placeholder.com/120/A8C5E6/FFFFFF?text=김TCP"
                      alt="Profile Preview"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">
                    Admin Kim
                  </h3>
                  <p className="text-blue-300 mb-4">
                    안녕하세요! TCP에서 활동 중인 Admin Kim입니다.
                  </p>
                  {settings.email && (
                    <div className="mb-2 text-sm text-gray-300">
                      <i className="fas fa-envelope text-blue-400 mr-2"></i>
                      kimtcp@seoultech.ac.kr
                    </div>
                  )}
                  {settings.career && (
                    <div className="mb-4 text-sm text-gray-300">
                      <i className="fas fa-graduation-cap text-green-400 mr-2"></i>
                      컴퓨터공학과 20학번 재학생
                    </div>
                  )}
                  {settings.techstack && (
                    <div className="mb-4">
                      <span className="tech-tag">JavaScript</span>
                      <span className="tech-tag">React</span>
                      <span className="tech-tag">Node.js</span>
                      <span className="tech-tag">Python</span>
                      <span className="tech-tag">MySQL</span>
                    </div>
                  )}
                  {(settings.github || settings.portfolio) && (
                    <div className="flex justify-center space-x-4">
                      {settings.github && (
                        <a
                          href="https://github.com/kimtcp"
                          target="_blank"
                          className="text-gray-400 hover:text-blue-400 text-xl"
                        >
                          <i className="fab fa-github"></i>
                        </a>
                      )}
                      {settings.portfolio && (
                        <a
                          href="https://portfolio.kimtcp.com"
                          target="_blank"
                          className="text-gray-400 hover:text-purple-400 text-xl"
                        >
                          <i className="fas fa-link"></i>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </MyPageLayout>
  );
};

export default MemberPageSetting;
