import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

import { initialUsers as mockUsers } from '../../data/users';

const AdminModifyUserInfo = () => {
  const { showNotification } = useOutletContext();
  const [searchParams, setSearchParams] = useState({
    studentId: '',
    name: '',
    nickname: '',
  });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState(null);
  const [techStackInput, setTechStackInput] = useState('');

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const { studentId, name, nickname } = searchParams;
    if (!studentId && !name && !nickname) {
      showNotification('검색어를 입력해주세요.', 'warning');
      return;
    }
    const results = mockUsers.filter(
      (user) =>
        (studentId && user.studentId.includes(studentId)) ||
        (name && user.realName.includes(name)) ||
        (nickname && user.username.includes(nickname))
    );
    setSearchResults(results);
    setSelectedUser(null);
    setFormData(null);
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    setFormData({ ...user });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const addTechStack = (e) => {
    if (e.key === 'Enter' && techStackInput.trim()) {
      e.preventDefault();
      const newTechStack = [...formData.techStack, techStackInput.trim()];
      setFormData({ ...formData, techStack: newTechStack });
      setTechStackInput('');
    }
  };

  const removeTechStack = (techToRemove) => {
    const newTechStack = formData.techStack.filter(
      (tech) => tech !== techToRemove
    );
    setFormData({ ...formData, techStack: newTechStack });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the formData to a server
    showNotification('사용자 정보가 성공적으로 업데이트되었습니다.', 'success');
    // Update mock data for demonstration
    const userIndex = mockUsers.findIndex((u) => u.id === selectedUser.id);
    if (userIndex > -1) {
      mockUsers[userIndex] = { ...formData };
    }
    setSelectedUser(null);
    setFormData(null);
    setSearchResults([]);
  };

  return (
    <AdminLayout>
      <main className="flex-1 bg-primary-black p-6">
        <div className="container mx-auto max-w-7xl">
          <section className="mb-8">
            <h3 className="text-3xl font-bold gradient-text mb-6">
              사용자 검색
            </h3>
            <div className="widget-card p-6 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  name="studentId"
                  placeholder="학번으로 검색"
                  onChange={handleSearchChange}
                  className="form-input"
                />
                <input
                  type="text"
                  name="name"
                  placeholder="이름으로 검색"
                  onChange={handleSearchChange}
                  className="form-input"
                />
                <input
                  type="text"
                  name="nickname"
                  placeholder="닉네임으로 검색"
                  onChange={handleSearchChange}
                  className="form-input"
                />
              </div>
              <button onClick={handleSearch} className="btn-primary">
                검색
              </button>
            </div>
          </section>

          {searchResults.length > 0 && (
            <section className="mb-8">
              <h3 className="text-2xl font-bold gradient-text mb-6">
                검색 결과
              </h3>
              <div className="widget-card rounded-xl overflow-hidden">
                {searchResults.map((user) => (
                  <div
                    key={user.id}
                    className={`search-result-item ${selectedUser?.id === user.id ? 'selected' : ''}`}
                    onClick={() => selectUser(user)}
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={user.profileImage}
                        alt={user.realName}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold text-white">
                          {user.realName}
                        </h4>
                        <p className="text-sm text-gray-400">
                          @{user.username} · {user.studentId}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {selectedUser && formData && (
            <section>
              <h3 className="text-2xl font-bold gradient-text mb-6">
                사용자 정보 수정
              </h3>
              <form
                onSubmit={handleFormSubmit}
                className="widget-card p-6 rounded-xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    id="realName"
                    value={formData.realName}
                    onChange={handleFormChange}
                    className="editable"
                    placeholder="실명"
                  />
                  <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={handleFormChange}
                    className="editable"
                    placeholder="사용자명"
                  />
                  <input
                    type="text"
                    id="studentId"
                    value={formData.studentId}
                    onChange={handleFormChange}
                    className="editable"
                    placeholder="학번"
                  />
                  <input
                    type="text"
                    id="department"
                    value={formData.department}
                    onChange={handleFormChange}
                    className="editable"
                    placeholder="학과"
                  />
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleFormChange}
                    className="editable"
                    placeholder="전화번호"
                  />
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="editable"
                    placeholder="이메일"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    기술 스택
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.techStack.map((tech) => (
                      <span key={tech} className="tag">
                        {tech}
                        <i
                          className="fas fa-times remove-tag"
                          onClick={() => removeTechStack(tech)}
                        ></i>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                    onKeyPress={addTechStack}
                    className="editable"
                    placeholder="기술 스택 추가 후 Enter"
                  />
                </div>
                <button type="submit" className="btn-primary">
                  변경사항 저장
                </button>
              </form>
            </section>
          )}
        </div>
      </main>
    </AdminLayout>
  );
};

export default AdminModifyUserInfo;
