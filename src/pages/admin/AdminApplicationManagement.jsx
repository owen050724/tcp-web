import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

import { initialApplications } from '../../data/applications';

const AdminApplicationManagement = () => {
  const { showNotification } = useOutletContext();
  const [applications, setApplications] = useState(initialApplications);
  const [filteredApplications, setFilteredApplications] =
    useState(initialApplications);
  const [filters, setFilters] = useState({ search: '', status: '', major: '' });
  const [stats, setStats] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApp, setSelectedApp] = useState(null);
  const [adminComment, setAdminComment] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    const newStats = {
      total: applications.length,
      pending: applications.filter((a) => a.status === 'pending').length,
      reviewed: applications.filter((a) => a.status === 'reviewed').length,
      accepted: applications.filter((a) => a.status === 'accepted').length,
      rejected: applications.filter((a) => a.status === 'rejected').length,
    };
    setStats(newStats);

    const result = applications
      .filter((app) => {
        const searchMatch =
          filters.search === '' ||
          app.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          app.studentId.toLowerCase().includes(filters.search.toLowerCase()) ||
          app.nickname.toLowerCase().includes(filters.search.toLowerCase());
        const statusMatch =
          filters.status === '' || app.status === filters.status;
        const majorMatch = filters.major === '' || app.major === filters.major;
        return searchMatch && statusMatch && majorMatch;
      })
      .sort((a, b) => new Date(b.submitDate) - new Date(a.submitDate));

    setFilteredApplications(result);
    setCurrentPage(1);
  }, [applications, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const viewApplication = (app) => {
    setSelectedApp(app);
    setAdminComment(app.comment || '');
  };

  const closeModal = () => {
    setSelectedApp(null);
  };

  const saveComment = () => {
    if (!selectedApp) return;
    const updatedApplications = applications.map((app) =>
      app.id === selectedApp.id ? { ...app, comment: adminComment } : app
    );
    setApplications(updatedApplications);
    showNotification('검토 의견이 저장되었습니다.', 'success');
  };

  const updateStatus = (newStatus) => {
    if (!selectedApp) return;
    const statusText = {
      pending: '대기',
      reviewed: '검토 완료',
      accepted: '합격',
      rejected: '불합격',
    };
    if (
      window.confirm(
        `이 지원자의 상태를 "${statusText[newStatus]}"로 변경하시겠습니까?`
      )
    ) {
      const updatedApplications = applications.map((app) =>
        app.id === selectedApp.id ? { ...app, status: newStatus } : app
      );
      setApplications(updatedApplications);
      showNotification(
        `상태가 "${statusText[newStatus]}"로 변경되었습니다.`,
        'success'
      );
      closeModal();
    }
  };

  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  const StatusBadge = ({ status }) => {
    const statusStyles = {
      pending: { text: '대기', className: 'status-pending' },
      reviewed: { text: '검토 완료', className: 'status-reviewed' },
      accepted: { text: '합격', className: 'status-accepted' },
      rejected: { text: '불합격', className: 'status-rejected' },
    };
    const { text, className } = statusStyles[status] || {
      text: 'N/A',
      className: '',
    };
    return <span className={`status-badge ${className}`}>{text}</span>;
  };

  return (
    <AdminLayout>
      <main className="flex-1 bg-primary-black p-6">
        <div className="container mx-auto max-w-7xl">
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold gradient-text">지원서 현황</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="widget-card p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-4 text-blue-300">
                  전체 지원서
                </h4>
                <div className="text-4xl font-black gradient-text mb-4">
                  {stats.total || 0}
                </div>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li className="flex justify-between">
                    <span>신규</span>
                    <span className="font-semibold text-blue-400">
                      {stats.pending || 0}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>검토중</span>
                    <span className="font-semibold text-yellow-400">
                      {stats.reviewed || 0}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="widget-card p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-4 text-green-300">합격</h4>
                <div className="text-4xl font-black gradient-text mb-4">
                  {stats.accepted || 0}
                </div>
              </div>
              <div className="widget-card p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-4 text-yellow-300">대기</h4>
                <div className="text-4xl font-black gradient-text mb-4">
                  {stats.pending || 0}
                </div>
              </div>
              <div className="widget-card p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-4 text-red-300">불합격</h4>
                <div className="text-4xl font-black gradient-text mb-4">
                  {stats.rejected || 0}
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold gradient-text">
                지원서 검색 및 필터
              </h3>
            </div>
            <div className="search-filter-card p-6 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    이름/학번/닉네임 검색
                  </label>
                  <div className="relative">
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="text"
                      name="search"
                      value={filters.search}
                      onChange={handleFilterChange}
                      className="form-input pl-10"
                      placeholder="검색어를 입력하세요..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    심사 상태
                  </label>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="form-input"
                  >
                    <option value="">전체 상태</option>
                    <option value="pending">대기</option>
                    <option value="reviewed">검토 완료</option>
                    <option value="accepted">합격</option>
                    <option value="rejected">불합격</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    전공 분야
                  </label>
                  <select
                    name="major"
                    value={filters.major}
                    onChange={handleFilterChange}
                    className="form-input"
                  >
                    <option value="">전체 전공</option>
                    <option value="컴퓨터공학과">컴퓨터공학과</option>
                    <option value="전자IT미디어공학과">
                      전자IT미디어공학과
                    </option>
                    <option value="기계시스템디자인공학과">
                      기계시스템디자인공학과
                    </option>
                    <option value="산업공학과">산업공학과</option>
                    <option value="기타">기타</option>
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
                      <th className="p-4 text-left">지원자 정보</th>
                      <th className="p-4 text-left">전공</th>
                      <th className="p-4 text-left">제출일시</th>
                      <th className="p-4 text-left">심사 상태</th>
                      <th className="p-4 text-left">작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedApplications.map((app) => (
                      <tr key={app.id} className="table-row">
                        <td className="p-4">
                          <div className="font-semibold text-white">
                            {app.name}
                          </div>
                          <div className="text-sm text-gray-400">
                            @{app.nickname}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            학번: {app.studentId}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-white font-medium">
                            {app.major}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-white">
                            {new Date(app.submitDate).toLocaleString('ko-KR')}
                          </div>
                        </td>
                        <td className="p-4">
                          <StatusBadge status={app.status} />
                        </td>
                        <td className="p-4">
                          <button
                            className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={() => viewApplication(app)}
                          >
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

          {totalPages > 1 && (
            <section className="mb-8">
              <div className="flex justify-center items-center space-x-2">
                <button
                  className="pagination-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                {[...Array(totalPages).keys()].map((i) => (
                  <button
                    key={i + 1}
                    className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="pagination-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </section>
          )}
        </div>
      </main>

      {selectedApp && (
        <div className="modal active">
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </button>
            <div className="p-8">
              <h2 className="text-2xl font-bold gradient-text mb-6 text-center">
                지원서 상세 정보
              </h2>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="form-label">이름</label>
                    <div className="p-3 bg-gray-800 rounded text-white">
                      {selectedApp.name}
                    </div>
                  </div>
                  <div>
                    <label className="form-label">학번</label>
                    <div className="p-3 bg-gray-800 rounded text-white">
                      {selectedApp.studentId}
                    </div>
                  </div>
                  <div>
                    <label className="form-label">전공</label>
                    <div className="p-3 bg-gray-800 rounded text-white">
                      {selectedApp.major}
                    </div>
                  </div>
                  <div>
                    <label className="form-label">전화번호</label>
                    <div className="p-3 bg-gray-800 rounded text-white">
                      {selectedApp.phone}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="form-label">기술 스택</label>
                  <div className="p-3 bg-gray-800 rounded">
                    {selectedApp.techStacks.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="form-label">자기소개</label>
                  <div className="p-3 bg-gray-800 rounded text-white whitespace-pre-wrap">
                    {selectedApp.selfIntroduction}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-600">
                <h4 className="text-lg font-bold mb-4 text-blue-300">
                  관리자 검토 의견
                </h4>
                <div className="mb-4">
                  <label className="form-label" htmlFor="adminComment">
                    내부 검토 의견
                  </label>
                  <textarea
                    id="adminComment"
                    className="form-input form-textarea"
                    placeholder="이 지원자에 대한 검토 의견을 작성하세요..."
                    value={adminComment}
                    onChange={(e) => setAdminComment(e.target.value)}
                  ></textarea>
                </div>
                <button
                  className="btn-primary text-sm mb-6"
                  onClick={saveComment}
                >
                  <i className="fas fa-save mr-1"></i>
                  의견 저장
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-600">
                <h4 className="text-lg font-bold mb-4 text-purple-300">
                  심사 결정
                </h4>
                <div className="flex flex-wrap gap-3">
                  <button
                    className="btn-primary text-sm"
                    onClick={() => updateStatus('reviewed')}
                  >
                    <i className="fas fa-check mr-1"></i>
                    검토 완료
                  </button>
                  <button
                    className="btn-success text-sm"
                    onClick={() => updateStatus('accepted')}
                  >
                    <i className="fas fa-thumbs-up mr-1"></i>
                    합격
                  </button>
                  <button
                    className="btn-warning text-sm"
                    onClick={() => updateStatus('pending')}
                  >
                    <i className="fas fa-clock mr-1"></i>
                    대기
                  </button>
                  <button
                    className="btn-danger text-sm"
                    onClick={() => updateStatus('rejected')}
                  >
                    <i className="fas fa-thumbs-down mr-1"></i>
                    불합격
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminApplicationManagement;
