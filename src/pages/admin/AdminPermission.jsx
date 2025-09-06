
import React, { useState, useEffect } from 'react';

const sampleUsers = [
    {
        id: 1,
        name: '김민준',
        nickname: 'kimminjun',
        role: 'Admin',
        position: 'Frontend',
        techStacks: ['React', 'JavaScript', 'Node.js'],
        profileImage: 'https://via.placeholder.com/40/A8C5E6/FFFFFF?text=KM',
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
        profileImage: 'https://via.placeholder.com/40/C5A8E6/FFFFFF?text=LS',
        joinDate: '2023-05-20',
        lastActive: '2024-01-14'
    },
];

const PermissionBadge = ({ role }) => {
    const roleStyles = {
        Admin: 'permission-admin',
        'Study Leader': 'permission-leader',
        Member: 'permission-member',
    };
    return <span className={`permission-badge ${roleStyles[role]}`}>{role}</span>;
};

const AdminPermission = () => {
    const [users, setUsers] = useState(sampleUsers);
    const [filteredUsers, setFilteredUsers] = useState(sampleUsers);
    const [filters, setFilters] = useState({ search: '', role: '', position: '' });
    const [selectedUsers, setSelectedUsers] = useState(new Set());

    useEffect(() => {
        let result = users.filter(user =>
            (user.name.toLowerCase().includes(filters.search.toLowerCase()) || user.nickname.toLowerCase().includes(filters.search.toLowerCase())) &&
            (filters.role ? user.role === filters.role : true) &&
            (filters.position ? user.position === filters.position : true)
        );
        setFilteredUsers(result);
    }, [filters, users]);

    const handleSelectUser = (id) => {
        const newSelection = new Set(selectedUsers);
        if (newSelection.has(id)) {
            newSelection.delete(id);
        } else {
            newSelection.add(id);
        }
        setSelectedUsers(newSelection);
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedUsers(new Set(filteredUsers.map(u => u.id)));
        } else {
            setSelectedUsers(new Set());
        }
    };

    const updateUserRole = (id, role) => {
        setUsers(users.map(user => user.id === id ? { ...user, role } : user));
    };

    const bulkUpdateRoles = (role) => {
        setUsers(users.map(user => selectedUsers.has(user.id) ? { ...user, role } : user));
        setSelectedUsers(new Set());
    };

    return (
        <div className="container mx-auto max-w-7xl">
            {/* ... stats and filters ... */}
            <section className="mb-6">
                <div className="flex items-center space-x-4">
                    <input type="checkbox" onChange={handleSelectAll} />
                    <span>{selectedUsers.size}개 선택됨</span>
                </div>
                {selectedUsers.size > 0 && (
                    <div className="flex gap-2 mt-2">
                        <button className="btn-primary text-sm" onClick={() => bulkUpdateRoles('Admin')}>관리자 권한 부여</button>
                        <button className="btn-success text-sm" onClick={() => bulkUpdateRoles('Study Leader')}>리더 권한 부여</button>
                        <button className="btn-warning text-sm" onClick={() => bulkUpdateRoles('Member')}>권한 해지</button>
                    </div>
                )}
            </section>

            <section className="mb-8">
                <div className="widget-card rounded-xl overflow-hidden">
                    <table className="w-full">
                        {/* ... table head ... */}
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="table-row">
                                    <td className="p-4"><input type="checkbox" checked={selectedUsers.has(user.id)} onChange={() => handleSelectUser(user.id)} /></td>
                                    <td className="p-4"><img src={user.profileImage} alt={user.name} className="w-10 h-10 rounded-full" /></td>
                                    <td className="p-4">
                                        <div className="font-semibold text-white">{user.name}</div>
                                        <div className="text-sm text-gray-400">@{user.nickname}</div>
                                    </td>
                                    <td className="p-4"><PermissionBadge role={user.role} /></td>
                                    <td className="p-4 text-white">{user.position}</td>
                                    <td className="p-4">
                                        <div className="flex space-x-2">
                                            <button onClick={() => updateUserRole(user.id, 'Admin')} className="px-2 py-1 text-xs bg-blue-600 rounded">A</button>
                                            <button onClick={() => updateUserRole(user.id, 'Study Leader')} className="px-2 py-1 text-xs bg-green-600 rounded">L</button>
                                            <button onClick={() => updateUserRole(user.id, 'Member')} className="px-2 py-1 text-xs bg-yellow-600 rounded">M</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default AdminPermission;
