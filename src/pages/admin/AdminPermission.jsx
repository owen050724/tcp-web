import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

import { initialUsers } from '../../data/users';

const AdminPermission = () => {
  const { showNotification } = useOutletContext();
  const [users, setUsers] = useState(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    position: '',
  });
  const [selectedUsers, setSelectedUsers] = useState(new Set());

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

  const handleSelectUser = (userId) => {
    const newSelection = new Set(selectedUsers);
    if (newSelection.has(userId)) {
      newSelection.delete(userId);
    } else {
      newSelection.add(userId);
    }
    setSelectedUsers(newSelection);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allUserIds = new Set(filteredUsers.map((u) => u.id));
      setSelectedUsers(allUserIds);
    } else {
      setSelectedUsers(new Set());
    }
  };

  const updateUserRole = (userId, newRole) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
    showNotification(
      `${users.find((u) => u.id === userId).name}님에게 ${newRole} 권한이 부여되었습니다.`,
      'success'
    );
  };

  const bulkUpdateRoles = (newRole) => {
    setUsers(
      users.map((u) => (selectedUsers.has(u.id) ? { ...u, role: newRole } : u))
    );
    setSelectedUsers(new Set());
    showNotification(
      `선택된 사용자들에게 ${newRole} 권한이 부여되었습니다.`,
      'success'
    );
  };

  const stats = {
    total: users.length,
    admin: users.filter((u) => u.role === 'Admin').length,
    leader: users.filter((u) => u.role === 'Study Leader').length,
    member: users.filter((u) => u.role === 'Member').length,
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
            <h3 className="text-3xl font-bold gradient-text mb-6">
              권한 관리 통계
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="widget-card p-6 rounded-xl">
                <h4 className="font-bold text-lg text-blue-300">총 사용자</h4>
                <div className="text-4xl font-black gradient-text">
                  {stats.total}
                </div>
              </div>
              <div className="widget-card p-6 rounded-xl">
                <h4 className="font-bold text-lg text-purple-300">관리자</h4>
                <div className="text-4xl font-black gradient-text">
                  {stats.admin}
                </div>
              </div>
              <div className="widget-card p-6 rounded-xl">
                <h4 className="font-bold text-lg text-green-300">
                  스터디 리더
                </h4>
                <div className="text-4xl font-black gradient-text">
                  {stats.leader}
                </div>
              </div>
              <div className="widget-card p-6 rounded-xl">
                <h4 className="font-bold text-lg text-pink-300">일반 멤버</h4>
                <div className="text-4xl font-black gradient-text">
                  {stats.member}
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="search-filter-card p-6 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="search"
                  placeholder="이름/닉네임 검색"
                  onChange={handleFilterChange}
                  className="form-input"
                />
                <select
                  name="role"
                  onChange={handleFilterChange}
                  className="form-input"
                >
                  <option value="">전체 역할</option>
                  <option value="Admin">관리자</option>
                  <option value="Study Leader">스터디 리더</option>
                  <option value="Member">일반 멤버</option>
                </select>
                <select
                  name="position"
                  onChange={handleFilterChange}
                  className="form-input"
                >
                  <option value="">전체 포지션</option>
                  <option value="Frontend">프론트엔드</option>
                  <option value="Backend">백엔드</option>
                </select>
              </div>
            </div>
          </section>

          <section className="mb-6">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={
                  selectedUsers.size > 0 &&
                  selectedUsers.size === filteredUsers.length
                }
              />
              <span>{selectedUsers.size}개 선택됨</span>
              {selectedUsers.size > 0 && (
                <div className="flex gap-2">
                  <button
                    className="btn-primary text-sm"
                    onClick={() => bulkUpdateRoles('Admin')}
                  >
                    관리자 권한 부여
                  </button>
                  <button
                    className="btn-success text-sm"
                    onClick={() => bulkUpdateRoles('Study Leader')}
                  >
                    리더 권한 부여
                  </button>
                  <button
                    className="btn-warning text-sm"
                    onClick={() => bulkUpdateRoles('Member')}
                  >
                    권한 해지
                  </button>
                </div>
              )}
            </div>
          </section>

          <section className="mb-8">
            <div className="widget-card rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="p-4 text-left">
                      <input type="checkbox" onChange={handleSelectAll} />
                    </th>
                    <th className="p-4 text-left">프로필</th>
                    <th className="p-4 text-left">이름/닉네임</th>
                    <th className="p-4 text-left">현재 권한</th>
                    <th className="p-4 text-left">액션</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="table-row">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.has(user.id)}
                          onChange={() => handleSelectUser(user.id)}
                        />
                      </td>
                      <td className="p-4">
                        <img
                          src={user.profileImage}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
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
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateUserRole(user.id, 'Admin')}
                            disabled={user.role === 'Admin'}
                            className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                          >
                            A
                          </button>
                          <button
                            onClick={() =>
                              updateUserRole(user.id, 'Study Leader')
                            }
                            disabled={user.role === 'Study Leader'}
                            className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                          >
                            L
                          </button>
                          <button
                            onClick={() => updateUserRole(user.id, 'Member')}
                            disabled={user.role === 'Member'}
                            className="px-2 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
                          >
                            M
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </AdminLayout>
  );
};

export default AdminPermission;
