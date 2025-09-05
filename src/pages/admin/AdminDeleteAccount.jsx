import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

import { initialUsers } from '../../data/users';

const AdminDeleteAccount = () => {
  const { showNotification } = useOutletContext();
  const [users, setUsers] = useState(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    position: '',
  });
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const result = users.filter((user) => {
      const searchMatch =
        filters.search === '' ||
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.nickname.toLowerCase().includes(filters.search.toLowerCase());
      const roleMatch = filters.role === '' || user.role === filters.role;
      const positionMatch =
        filters.position === '' || user.position === filters.position;
      return searchMatch && roleMatch && positionMatch;
    });
    setFilteredUsers(result);
  }, [users, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const showDeleteModal = (user) => {
    setUserToDelete(user);
  };

  const closeDeleteModal = () => {
    setUserToDelete(null);
  };

  const confirmDelete = () => {
    if (!userToDelete) return;
    setUsers(users.filter((u) => u.id !== userToDelete.id));
    showNotification(
      `${userToDelete.name} 계정이 성공적으로 삭제되었습니다.`,
      'success'
    );
    closeDeleteModal();
  };

  const RoleBadge = ({ role }) => {
    const roleClass = `permission-${role === 'Admin' ? 'admin' : role === 'Study Leader' ? 'leader' : 'member'}`;
    return <span className={`permission-badge ${roleClass}`}>{role}</span>;
  };

  return (
    <AdminLayout>
      <main className="flex-1 bg-primary-black p-6">
        <div className="container mx-auto max-w-7xl">
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold gradient-text">
                계정 검색 및 삭제
              </h3>
            </div>
            <div className="search-filter-card p-6 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    이름/닉네임 검색
                  </label>
                  <div className="relative">
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="text"
                      name="search"
                      value={filters.search}
                      onChange={handleFilterChange}
                      className="form-input pl-10"
                      placeholder="이름 또는 닉네임을 입력하세요..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    권한 역할
                  </label>
                  <select
                    name="role"
                    value={filters.role}
                    onChange={handleFilterChange}
                    className="form-input"
                  >
                    <option value="">전체 권한</option>
                    <option value="Admin">관리자</option>
                    <option value="Study Leader">스터디 리더</option>
                    <option value="Member">일반 멤버</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    포지션
                  </label>
                  <select
                    name="position"
                    value={filters.position}
                    onChange={handleFilterChange}
                    className="form-input"
                  >
                    <option value="">전체 포지션</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="AI">AI</option>
                    <option value="Mobile">Mobile</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Design">Design</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="widget-card rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="p-4 text-left">프로필</th>
                      <th className="p-4 text-left">이름/닉네임</th>
                      <th className="p-4 text-left">권한 역할</th>
                      <th className="p-4 text-left">포지션</th>
                      <th className="p-4 text-left">기술 스택</th>
                      <th className="p-4 text-center">작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="table-row">
                        <td className="p-4">
                          <img
                            src={user.profileImage}
                            alt={user.name}
                            className="w-12 h-12 rounded-full"
                          />
                        </td>
                        <td className="p-4">
                          <div className="font-semibold text-white">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-400">
                            @{user.nickname}
                          </div>
                        </td>
                        <td className="p-4">
                          <RoleBadge role={user.role} />
                        </td>
                        <td className="p-4">
                          <div className="text-white font-medium">
                            {user.position}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap">
                            {user.techStacks.slice(0, 3).map((tech) => (
                              <span key={tech} className="tech-tag">
                                {tech}
                              </span>
                            ))}
                            {user.techStacks.length > 3 && (
                              <span className="text-xs text-gray-400 ml-1">
                                +{user.techStacks.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            className="btn-danger btn-small"
                            onClick={() => showDeleteModal(user)}
                          >
                            <i className="fas fa-trash mr-1"></i>삭제
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>

      {userToDelete && (
        <div className="modal show">
          <div className="modal-content">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-red-400">계정 삭제 확인</h3>
              <button
                onClick={closeDeleteModal}
                className="text-gray-400 hover:text-white"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="mb-6">
              <div className="flex items-center space-x-4 p-4 bg-red-900 bg-opacity-20 rounded-lg border border-red-500 border-opacity-30">
                <i className="fas fa-exclamation-triangle text-red-400 text-2xl"></i>
                <div>
                  <p className="text-white font-semibold">
                    정말로 이 계정을 삭제하시겠습니까?
                  </p>
                  <p className="text-gray-300 text-sm mt-1">
                    이 작업은 되돌릴 수 없으며, 사용자의 모든 데이터가
                    영구적으로 삭제됩니다.
                  </p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img
                    src={userToDelete.profileImage}
                    alt={userToDelete.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="text-white font-semibold">
                      {userToDelete.name}
                    </div>
                    <div className="text-gray-400 text-sm">
                      @{userToDelete.nickname}
                    </div>
                    <RoleBadge role={userToDelete.role} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button className="btn-secondary" onClick={closeDeleteModal}>
                취소
              </button>
              <button className="btn-danger" onClick={confirmDelete}>
                <i className="fas fa-trash mr-2"></i>삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDeleteAccount;
