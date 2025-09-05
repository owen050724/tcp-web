import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { Doughnut, Bar } from 'react-chartjs-2';

const initialTeams = [
  {
    id: 1,
    title: '2025 AI Creativity Hackathon',
    leader: '김AI',
    category: '해커톤',
    period: '2025.8.14 - 2025.12.18',
    status: '모집중',
  },
  {
    id: 2,
    title: 'Software Maestro Pre-screening',
    leader: '이백엔드',
    category: '대회',
    period: '2025.08.04 - 2025.09.15',
    status: '모집중',
  },
  {
    id: 4,
    title: 'ICPC 알고리즘 스터디',
    leader: '최알고리즘',
    category: '스터디',
    period: '2025.03.10 - 2025.05.30',
    status: '모집마감',
  },
];

const AdminTeam = () => {
  const { showNotification } = useOutletContext();
  const [teams, setTeams] = useState(initialTeams);
  const [filteredTeams, setFilteredTeams] = useState(initialTeams);
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    status: '',
    category: '',
    year: '',
  });

  useEffect(() => {
    const result = teams.filter((team) => {
      return (
        (filters.search === '' ||
          team.title.toLowerCase().includes(filters.search.toLowerCase())) &&
        (filters.category === '' || team.category === filters.category) &&
        (filters.status === '' || team.status === filters.status)
      );
    });
    setFilteredTeams(result);
  }, [teams, filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const stats = {
    total: teams.length,
    recruiting: teams.filter((t) => t.status === '모집중').length,
    closed: teams.filter((t) => t.status === '모집마감').length,
  };

  const categoryChartData = {
    labels: ['해커톤', '대회', '프로젝트', '스터디'],
    datasets: [
      {
        data: [
          teams.filter((t) => t.category === '해커톤').length,
          teams.filter((t) => t.category === '대회').length,
          teams.filter((t) => t.category === '프로젝트').length,
          teams.filter((t) => t.category === '스터디').length,
        ],
        backgroundColor: ['#a8c5e6', '#a8e6c5', '#c5a8e6', '#e6a8c5'],
      },
    ],
  };

  const statusChartData = {
    labels: ['모집중', '모집마감'],
    datasets: [
      {
        data: [stats.recruiting, stats.closed],
        backgroundColor: ['#a8c5e6', '#ef4444'],
      },
    ],
  };

  return (
    <AdminLayout>
      <main className="flex-1 bg-primary-black p-6">
        <div className="container mx-auto max-w-7xl">
          <section className="mb-8">
            <h3 className="text-3xl font-bold gradient-text mb-6">팀 통계</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="widget-card p-6 rounded-xl">
                <h4>총 팀 수</h4>
                <div className="text-4xl font-black">{stats.total}</div>
              </div>
              <div className="widget-card p-6 rounded-xl">
                <h4>모집중</h4>
                <div className="text-4xl font-black">{stats.recruiting}</div>
              </div>
              <div className="widget-card p-6 rounded-xl">
                <h4>카테고리 분포</h4>
                <Doughnut data={categoryChartData} />
              </div>
              <div className="widget-card p-6 rounded-xl">
                <h4>모집 현황</h4>
                <Bar data={statusChartData} />
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="search-filter-card p-6 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <input
                  type="text"
                  name="search"
                  placeholder="팀명 검색"
                  onChange={handleFilterChange}
                  className="form-input"
                />
                <select
                  name="role"
                  onChange={handleFilterChange}
                  className="form-input"
                >
                  <option value="">전체 역할</option>
                </select>
                <select
                  name="status"
                  onChange={handleFilterChange}
                  className="form-input"
                >
                  <option value="">전체 상태</option>
                  <option value="모집중">모집중</option>
                  <option value="모집마감">모집마감</option>
                </select>
                <select
                  name="category"
                  onChange={handleFilterChange}
                  className="form-input"
                >
                  <option value="">전체 카테고리</option>
                  <option value="해커톤">해커톤</option>
                </select>
                <select
                  name="year"
                  onChange={handleFilterChange}
                  className="form-input"
                >
                  <option value="">전체 연도</option>
                </select>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="widget-card rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="p-4 text-left">팀명</th>
                    <th className="p-4 text-left">리더</th>
                    <th className="p-4 text-left">카테고리</th>
                    <th className="p-4 text-left">기간</th>
                    <th className="p-4 text-left">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeams.map((team) => (
                    <tr key={team.id} className="table-row">
                      <td className="p-4 text-white">{team.title}</td>
                      <td className="p-4 text-white">{team.leader}</td>
                      <td className="p-4 text-white">{team.category}</td>
                      <td className="p-4 text-white">{team.period}</td>
                      <td className="p-4 text-white">{team.status}</td>
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

export default AdminTeam;
