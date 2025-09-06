
import React, { useState, useEffect } from 'react';

// Sample data - in a real app, this would come from an API
const sampleApplications = [
    {
        id: 1,
        name: '김민준',
        nickname: 'minjun_dev',
        studentId: '20241234',
        major: '컴퓨터공학과',
        phone: '010-1234-5678',
        techStacks: ['React', 'JavaScript', 'Node.js', 'Python'],
        awards: [
            { name: '해커톤 대상', org: '서울과학기술대학교', date: '2024-03', desc: 'AI 기반 학습 관리 시스템 개발' }
        ],
        projects: [
            { name: '온라인 학습 플랫폼', target: '개인 프로젝트', participation: 100, tech: 'React, Node.js, MongoDB', date: '2024-02', desc: '학생들을 위한 온라인 학습 관리 시스템' }
        ],
        interests: '웹 개발, AI/ML, 오픈소스 기여',
        selfIntroduction: '안녕하세요! 컴퓨터공학과 김민준입니다. 새로운 기술을 배우고 적용하는 것을 좋아하며, 팀 프로젝트를 통해 협업 능력을 키우고 싶습니다.',
        expectations: 'TCP에서 다양한 프로젝트 경험을 쌓고, 선배들과의 멘토링을 통해 실무 역량을 키우고 싶습니다.',
        submitDate: '2024-01-15T10:30:00',
        status: 'pending',
        comment: ''
    },
    {
        id: 2,
        name: '이서연',
        nickname: 'seoyeon_ai',
        studentId: '20241235',
        major: '전자IT미디어공학과',
        phone: '010-2345-6789',
        techStacks: ['Python', 'TensorFlow', 'PyTorch', 'AI/ML'],
        awards: [],
        projects: [
            { name: '이미지 분류 모델', target: '학교 과제', participation: 80, tech: 'Python, TensorFlow', date: '2024-01', desc: 'CNN을 이용한 이미지 분류 모델 구현' }
        ],
        interests: 'AI/ML, 컴퓨터 비전, 자연어 처리',
        selfIntroduction: 'AI에 관심이 많은 전자IT미디어공학과 학생입니다. 머신러닝과 딥러닝 기술을 활용한 프로젝트를 해보고 싶습니다.',
        expectations: 'AI 프로젝트 팀에 참여하여 실제 서비스에 적용할 수 있는 AI 모델을 개발하고 싶습니다.',
        submitDate: '2024-01-16T14:20:00',
        status: 'reviewed',
        comment: 'AI 분야에 대한 열정이 보이며, 기본기가 탄탄합니다.'
    },
];

const StatusBadge = ({ status }) => {
    const statusStyles = {
        pending: { text: '대기', className: 'status-pending' },
        reviewed: { text: '검토 완료', className: 'status-reviewed' },
        accepted: { text: '합격', className: 'status-accepted' },
        rejected: { text: '불합격', className: 'status-rejected' },
    };
    const { text, className } = statusStyles[status] || { text: 'N/A', className: '' };
    return <span className={`status-badge ${className}`}>{text}</span>;
};

const ApplicationModal = ({ app, onClose, onUpdateStatus, onSaveComment, comment, setComment }) => {
    if (!app) return null;

    const handleSaveComment = () => {
        onSaveComment(app.id, comment);
    };

    return (
        <div className="modal active">
            <div className="modal-content">
                <button className="close-modal" onClick={onClose}><i className="fas fa-times"></i></button>
                <div className="p-8">
                    <h2 className="text-2xl font-bold gradient-text mb-6 text-center">지원서 상세 정보</h2>
                    {/* ... modal content from HTML converted to JSX ... */}
                    <div className="mt-8 pt-6 border-t border-gray-600">
                        <h4 className="text-lg font-bold mb-4 text-blue-300">관리자 검토 의견</h4>
                        <textarea 
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="form-input form-textarea" 
                            placeholder="이 지원자에 대한 검토 의견을 작성하세요..."
                        ></textarea>
                        <button className="btn-primary text-sm mt-4" onClick={handleSaveComment}>
                            <i className="fas fa-save mr-1"></i> 의견 저장
                        </button>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-600">
                        <h4 className="text-lg font-bold mb-4 text-purple-300">심사 결정</h4>
                        <div className="flex flex-wrap gap-3">
                            <button className="btn-primary text-sm" onClick={() => onUpdateStatus(app.id, 'reviewed')}>검토 완료</button>
                            <button className="btn-success text-sm" onClick={() => onUpdateStatus(app.id, 'accepted')}>합격</button>
                            <button className="btn-warning text-sm" onClick={() => onUpdateStatus(app.id, 'pending')}>대기</button>
                            <button className="btn-danger text-sm" onClick={() => onUpdateStatus(app.id, 'rejected')}>불합격</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdminApplicationManagement = () => {
    const [applications, setApplications] = useState(sampleApplications);
    const [filteredApps, setFilteredApps] = useState(sampleApplications);
    const [filters, setFilters] = useState({ search: '', status: '', major: '' });
    const [selectedApp, setSelectedApp] = useState(null);
    const [adminComment, setAdminComment] = useState('');

    useEffect(() => {
        let result = applications
            .filter(app => 
                (app.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                 app.studentId.includes(filters.search) || 
                 app.nickname.toLowerCase().includes(filters.search.toLowerCase())) &&
                (filters.status ? app.status === filters.status : true) &&
                (filters.major ? app.major === filters.major : true)
            )
            .sort((a, b) => new Date(b.submitDate) - new Date(a.submitDate));
        setFilteredApps(result);
    }, [filters, applications]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateStatus = (id, status) => {
        setApplications(apps => apps.map(app => app.id === id ? { ...app, status } : app));
        setSelectedApp(null); // Close modal
    };

    const handleSaveComment = (id, comment) => {
        setApplications(apps => apps.map(app => app.id === id ? { ...app, comment } : app));
        alert('Comment saved!');
    };

    const handleSelectApp = (app) => {
        setSelectedApp(app);
        setAdminComment(app.comment || '');
    }

    return (
        <div className="container mx-auto max-w-7xl">
            <section className="mb-8">
                <h3 className="text-3xl font-bold gradient-text mb-6">지원서 현황</h3>
                {/* ... statistics dashboard ... */}
            </section>

            <section className="mb-8">
                <h3 className="text-3xl font-bold gradient-text mb-6">지원서 검색 및 필터</h3>
                <div className="search-filter-card p-6 rounded-xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input type="text" name="search" placeholder="이름/학번/닉네임 검색" onChange={handleFilterChange} className="form-input" />
                        <select name="status" onChange={handleFilterChange} className="form-input">
                            <option value="">전체 상태</option>
                            <option value="pending">대기</option>
                            <option value="reviewed">검토 완료</option>
                            <option value="accepted">합격</option>
                            <option value="rejected">불합격</option>
                        </select>
                        <select name="major" onChange={handleFilterChange} className="form-input">
                            <option value="">전체 전공</option>
                            <option value="컴퓨터공학과">컴퓨터공학과</option>
                            <option value="전자IT미디어공학과">전자IT미디어공학과</option>
                            <option value="기계시스템디자인공학과">기계시스템디자인공학과</option>
                            <option value="산업공학과">산업공학과</option>
                            <option value="기타">기타</option>
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
                                    <th className="p-4 text-left">지원자 정보</th>
                                    <th className="p-4 text-left">전공</th>
                                    <th className="p-4 text-left">제출일시</th>
                                    <th className="p-4 text-left">심사 상태</th>
                                    <th className="p-4 text-left">작업</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredApps.map(app => (
                                    <tr key={app.id} className="table-row">
                                        <td className="p-4">
                                            <div className="font-semibold text-white">{app.name}</div>
                                            <div className="text-sm text-gray-400">@{app.nickname}</div>
                                            <div className="text-xs text-gray-500 mt-1">학번: {app.studentId}</div>
                                        </td>
                                        <td className="p-4 text-white font-medium">{app.major}</td>
                                        <td className="p-4 text-white">{new Date(app.submitDate).toLocaleString('ko-KR')}</td>
                                        <td className="p-4"><StatusBadge status={app.status} /></td>
                                        <td className="p-4">
                                            <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => handleSelectApp(app)}>
                                                <i className="fas fa-eye mr-1"></i>상세 보기
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {selectedApp && 
                <ApplicationModal 
                    app={selectedApp} 
                    onClose={() => setSelectedApp(null)} 
                    onUpdateStatus={handleUpdateStatus} 
                    onSaveComment={handleSaveComment} 
                    comment={adminComment}
                    setComment={setAdminComment}
                />
            }
        </div>
    );
};

export default AdminApplicationManagement;
