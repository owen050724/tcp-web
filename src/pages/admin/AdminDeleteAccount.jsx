
import React, { useState, useEffect } from 'react';

const sampleUsers = [
    {
        id: 1,
        name: '김민준',
        nickname: 'kimminjun',
        role: 'Admin',
        position: 'Frontend',
        techStacks: ['React', 'JavaScript', 'Node.js'],
        profileImage: 'https://via.placeholder.com/40/A8C5E6/FFFFFF?text=김',
        joinDate: '2023-03-15',
        lastActive: '2024-01-15'
    },
    {
        id: 2,
        name: '이서연',
        nickname: 'leeseoyeon',
        role: 'Study Leader',
        position: 'AI',
        techStacks: ['Python', 'AI/ML', 'TensorFlow'],
        profileImage: 'https://via.placeholder.com/40/C5A8E6/FFFFFF?text=이',
        joinDate: '2023-05-20',
        lastActive: '2024-01-14'
    },
];

const DeleteModal = ({ user, onClose, onConfirm }) => {
    if (!user) return null;
    return (
        <div className="modal show">
            <div className="modal-content">
                <h3 className="text-xl font-bold text-red-400 mb-4">계정 삭제 확인</h3>
                <p>정말로 {user.name} 계정을 삭제하시겠습니까?</p>
                <div className="flex justify-end space-x-3 mt-6">
                    <button className="btn-secondary" onClick={onClose}>취소</button>
                    <button className="btn-danger" onClick={() => onConfirm(user.id)}><i className="fas fa-trash mr-2"></i>삭제</button>
                </div>
            </div>
        </div>
    );
};

const AdminDeleteAccount = () => {
    const [users, setUsers] = useState(sampleUsers);
    const [filteredUsers, setFilteredUsers] = useState(sampleUsers);
    const [filters, setFilters] = useState({ search: '', role: '', position: '' });
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        let result = users.filter(user =>
            (user.name.toLowerCase().includes(filters.search.toLowerCase()) || user.nickname.toLowerCase().includes(filters.search.toLowerCase())) &&
            (filters.role ? user.role === filters.role : true) &&
            (filters.position ? user.position === filters.position : true)
        );
        setFilteredUsers(result);
    }, [filters, users]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
    };

    const confirmDelete = (id) => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        setUserToDelete(null);
    };

    return (
        <div className="container mx-auto max-w-7xl">
            <section className="mb-8">
                <h3 className="text-3xl font-bold gradient-text mb-6">계정 검색 및 삭제</h3>
                <div className="search-filter-card p-6 rounded-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <input type="text" name="search" placeholder="이름/닉네임 검색" onChange={handleFilterChange} className="form-input" />
                        <select name="role" onChange={handleFilterChange} className="form-input">
                            <option value="">전체 권한</option>
                            <option value="Admin">관리자</option>
                            <option value="Study Leader">스터디 리더</option>
                            <option value="Member">일반 멤버</option>
                        </select>
                        <select name="position" onChange={handleFilterChange} className="form-input">
                            <option value="">전체 포지션</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="AI">AI</option>
                            <option value="Mobile">Mobile</option>
                        </select>
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
                                    <th className="p-4 text-center">작업</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(user => (
                                    <tr key={user.id} className="table-row">
                                        <td className="p-4"><img src={user.profileImage} alt={user.name} className="w-12 h-12 rounded-full" /></td>
                                        <td className="p-4">
                                            <div className="font-semibold text-white">{user.name}</div>
                                            <div className="text-sm text-gray-400">@{user.nickname}</div>
                                        </td>
                                        <td className="p-4"><span className={`permission-badge permission-${user.role.toLowerCase().replace(' ', '-')}`}>{user.role}</span></td>
                                        <td className="p-4 text-white font-medium">{user.position}</td>
                                        <td className="p-4 text-center">
                                            <button className="btn-danger btn-small" onClick={() => handleDeleteClick(user)}>
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

            <DeleteModal user={userToDelete} onClose={() => setUserToDelete(null)} onConfirm={confirmDelete} />
        </div>
    );
};

export default AdminDeleteAccount;
