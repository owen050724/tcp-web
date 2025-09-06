
import React, { useState } from 'react';

const sampleUsers = [
    {
        id: 1,
        studentId: '2020001234',
        realName: '김민준',
        username: 'kimminjun',
        department: '컴퓨터공학과',
        phoneNumber: '010-1234-5678',
        email: 'kimminjun@seoultech.ac.kr',
        admissionYear: 2020,
        enrollmentStatus: '재학',
        birthday: '2000-03-15',
        currentWorkplace: '',
        techStack: ['JavaScript', 'React', 'Node.js'],
        githubUrl: 'https://github.com/kimminjun',
        portfolioUrl: 'https://kimminjun.dev',
        profileImage: 'https://via.placeholder.com/128/A8C5E6/FFFFFF?text=KM'
    },
];

const AdminModifyUserInfo = () => {
    const [users, setUsers] = useState(sampleUsers);
    const [search, setSearch] = useState({ studentId: '', name: '', nickname: '' });
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState(null);

    const handleSearchChange = (e) => {
        setSearch({ ...search, [e.target.name]: e.target.value });
    };

    const handleSearch = () => {
        const results = users.filter(user =>
            (search.studentId && user.studentId.includes(search.studentId)) ||
            (search.name && user.realName.includes(search.name)) ||
            (search.nickname && user.username.includes(search.nickname))
        );
        setSearchResults(results);
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setFormData(user);
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setUsers(users.map(user => user.id === formData.id ? formData : user));
        alert('User information updated!');
        setSelectedUser(null);
    };

    return (
        <div className="container mx-auto max-w-7xl">
            <section className="mb-8">
                <h3 className="text-3xl font-bold gradient-text mb-6">사용자 검색</h3>
                <div className="widget-card p-6 rounded-xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <input name="studentId" onChange={handleSearchChange} placeholder="학번으로 검색" className="form-input" />
                        <input name="name" onChange={handleSearchChange} placeholder="이름으로 검색" className="form-input" />
                        <input name="nickname" onChange={handleSearchChange} placeholder="닉네임으로 검색" className="form-input" />
                    </div>
                    <button onClick={handleSearch} className="btn-primary">검색</button>
                </div>
            </section>

            {searchResults.length > 0 && (
                <section className="mb-8">
                    <h3 className="text-2xl font-bold gradient-text mb-6">검색 결과</h3>
                    <div className="widget-card rounded-xl overflow-hidden">
                        {searchResults.map(user => (
                            <div key={user.id} className="search-result-item" onClick={() => handleSelectUser(user)}>
                                {user.realName} (@{user.username})
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {selectedUser && formData && (
                <section>
                    <h3 className="text-2xl font-bold gradient-text mb-6">사용자 정보 수정</h3>
                    <form onSubmit={handleFormSubmit} className="widget-card p-6 rounded-xl">
                        <input id="realName" value={formData.realName} onChange={handleFormChange} className="editable" />
                        {/* Add other form fields here */}
                        <button type="submit" className="btn-primary mt-4">변경사항 저장</button>
                    </form>
                </section>
            )}
        </div>
    );
};

export default AdminModifyUserInfo;
