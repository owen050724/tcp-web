import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { Bar } from 'react-chartjs-2';

import { initialStudies } from '../../data/studies';

const AdminStudy = () => {
  const { showNotification } = useOutletContext();
  const [studies, setStudies] = useState(initialStudies);
  const [filteredStudies, setFilteredStudies] = useState(initialStudies);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    year: '',
  });

  useEffect(() => {
    const result = studies.filter((study) => {
      return (
        (filters.search === '' ||
          study.title.toLowerCase().includes(filters.search.toLowerCase())) &&
        (filters.category === '' || study.category === filters.category) &&
        (filters.status === '' || study.status === filters.status) &&
        (filters.year === '' || study.year.toString() === filters.year)
      );
    });
    setFilteredStudies(result);
  }, [studies, filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const stats = {
    total: studies.length,
    ongoing: studies.filter((s) => s.status === 'ongoing').length,
    completed: studies.filter((s) => s.status === 'completed').length,
  };

  const chartData = {
    labels: ['AI/ML', '웹 개발', '알고리즘', '모바일', '데이터'],
    datasets: [
      {
        data: [
          studies.filter((s) => s.category === 'ai').length,
          studies.filter((s) => s.category === 'web').length,
          studies.filter((s) => s.category === 'algorithm').length,
          studies.filter((s) => s.category === 'mobile').length,
          studies.filter((s) => s.category === 'data').length,
        ],
        backgroundColor: [
          '#a8c5e6',
          '#a8e6c5',
          '#c5a8e6',
          '#e6a8c5',
          '#f59e0b',
        ],
      },
    ],
  };

  return (
    <AdminLayout>
      <main className="flex-1 bg-primary-black p-6">
        <div className="container mx-auto max-w-7xl">
          <section className="mb-8">
            <h3 className="text-3xl font-bold gradient-text mb-6">
              스터디 현황 대시보드
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="widget-card p-6 rounded-xl">
                <h4>전체 스터디</h4>
                <div className="text-4xl font-black">{stats.total}</div>
              </div>
              <div className="widget-card p-6 rounded-xl">
                <h4>진행중</h4>
                <div className="text-4xl font-black">{stats.ongoing}</div>
              </div>
              <div className="widget-card p-6 rounded-xl">
                <h4>완료</h4>
                <div className="text-4xl font-black">{stats.completed}</div>
              </div>
              <div className="widget-card p-6 rounded-xl">
                <h4 className="font-bold text-lg">스터디 분포</h4>
                <Bar data={chartData} />
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="search-filter-card p-6 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  name="search"
                  placeholder="제목 검색"
                  onChange={handleFilterChange}
                  className="form-input"
                />
                <select
                  name="category"
                  onChange={handleFilterChange}
                  className="form-input"
                >
                  <option value="">전체 분야</option>
                  <option value="ai">AI/ML</option>
                  <option value="web">웹 개발</option>
                </select>
                <select
                  name="status"
                  onChange={handleFilterChange}
                  className="form-input"
                >
                  <option value="">전체 상태</option>
                  <option value="ongoing">진행중</option>
                  <option value="completed">완료</option>
                </select>
                <select
                  name="year"
                  onChange={handleFilterChange}
                  className="form-input"
                >
                  <option value="">전체 연도</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="widget-card rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="p-4 text-left">제목</th>
                    <th className="p-4 text-left">리더</th>
                    <th className="p-4 text-left">기간</th>
                    <th className="p-4 text-left">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudies.map((study) => (
                    <tr key={study.id} className="table-row">
                      <td className="p-4 text-white">{study.title}</td>
                      <td className="p-4 text-white">{study.leader}</td>
                      <td className="p-4 text-white">{study.period}</td>
                      <td className="p-4 text-white">{study.status}</td>
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

export default AdminStudy;
