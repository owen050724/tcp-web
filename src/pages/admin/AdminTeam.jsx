
import React, { useState, useEffect } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const sampleTeams = [
    {
        id: 1,
        title: '2025 AI Creativity Hackathon',
        leader: '김AI',
        category: '해커톤',
        period: '2025.8.14 - 2025.12.18',
        neededRoles: ['기획자 1명', '프론트엔드 1명'],
        status: '모집중',
        year: 2025,
        techstack: ['Python', 'TensorFlow', 'React', 'FastAPI'],
    },
];

const AdminTeam = () => {
    const [teams] = useState(sampleTeams);
    const [filteredTeams, setFilteredTeams] = useState(sampleTeams);
    const [filters, setFilters] = useState({ search: '', role: '', status: '', category: '', year: '' });

    const categoryChartData = {
        labels: ['해커톤', '대회', '프로젝트', '스터디'],
        datasets: [{
            data: [2, 1, 4, 1],
            backgroundColor: ['#a8c5e6', '#a8e6c5', '#c5a8e6', '#e6a8c5'],
        }]
    };

    const statusChartData = {
        labels: ['모집중', '모집마감'],
        datasets: [{
            data: [3, 5],
            backgroundColor: ['#a8c5e6', '#ef4444'],
        }]
    };

    useEffect(() => {
        let result = teams.filter(team =>
            team.title.toLowerCase().includes(filters.search.toLowerCase()) &&
            (filters.role ? team.neededRoles.some(r => r.includes(filters.role)) : true) &&
            (filters.status ? team.status === filters.status : true) &&
            (filters.category ? team.category === filters.category : true) &&
            (filters.year ? team.year.toString() === filters.year : true)
        );
        setFilteredTeams(result);
    }, [filters, teams]);

    return (
        <div className="container mx-auto max-w-7xl">
            <section className="mb-8">
                <h3 className="text-3xl font-bold gradient-text mb-6">팀 통계</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="widget-card p-6 rounded-xl">
                        <h4 className="font-bold text-lg mb-4 text-yellow-300">카테고리 분포</h4>
                        <div className="chart-container" style={{ height: '150px' }}>
                            <Doughnut data={categoryChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>
                    <div className="widget-card p-6 rounded-xl">
                        <h4 className="font-bold text-lg mb-4 text-green-300">모집 현황</h4>
                        <div className="chart-container" style={{ height: '150px' }}>
                            <Bar data={statusChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h3 className="text-3xl font-bold gradient-text mb-6">검색 및 필터</h3>
                {/* ... filters ... */}
            </section>

            <section className="mb-8">
                <div className="widget-card rounded-xl overflow-hidden">
                    <table className="w-full">
                        {/* ... table head ... */}
                        <tbody>
                            {filteredTeams.map(team => (
                                <tr key={team.id} className="table-row">
                                    <td className="p-4"><input type="checkbox" /></td>
                                    <td className="p-4 text-white">{team.title}</td>
                                    <td className="p-4 text-white">{team.leader}</td>
                                    <td className="p-4 text-white">{team.category}</td>
                                    <td className="p-4 text-gray-300">{team.period}</td>
                                    <td className="p-4 text-white">{team.neededRoles.join(', ')}</td>
                                    <td className="p-4"><span className={`status-badge status-${team.status === '모집중' ? 'recruiting' : 'closed'}`}>{team.status}</span></td>
                                    <td className="p-4">{/* Actions */}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default AdminTeam;
