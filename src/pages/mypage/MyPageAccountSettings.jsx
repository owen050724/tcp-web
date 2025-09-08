
import React, { useState, useEffect } from 'react';

const PasswordChangeModal = ({ isOpen, onClose }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('새 비밀번호가 일치하지 않습니다.');
            return;
        }
        // Mock API call
        console.log('Changing password...');
        setError('');
        alert('비밀번호가 변경되었습니다.');
        onClose();
    };

    return (
        <div className="modal show" role="dialog">
            <div className="modal-panel">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">비밀번호 변경</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl"><i className="fas fa-times"></i></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="pw-current" className="label">현재 비밀번호</label>
                        <input id="pw-current" type="password" className="input" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="pw-new" className="label">새 비밀번호</label>
                        <input id="pw-new" type="password" className="input" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="pw-confirm" className="label">새 비밀번호 확인</label>
                        <input id="pw-confirm" type="password" className="input" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="pw-code" className="label">인증 코드</label>
                        <input id="pw-code" type="text" className="input" value={authCode} onChange={e => setAuthCode(e.target.value)} required />
                    </div>
                    {error && <p className="error mt-1">{error}</p>}
                    <div className="flex items-center justify-end gap-3 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg btn-outline hover:bg-gray-800">취소</button>
                        <button type="submit" className="px-4 py-2 rounded-lg btn-primary">변경</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const MyPageAccountSettings = () => {
    const [formData, setFormData] = useState({ name: '', birthday: '', phone: '', email: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Mock fetching data
        setFormData({ name: 'Admin Kim', birthday: '2002-03-01', phone: '010-1234-5678', email: 'kimtcp@seoultech.ac.kr' });
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('저장되었습니다!');
    };

    return (
        <div className="container mx-auto max-w-4xl p-6">
            <h3 className="text-2xl font-bold gradient-text mb-6">계정 정보 수정</h3>
            <form onSubmit={handleSubmit} className="widget-card rounded-xl p-6">
                <section aria-labelledby="sec-profile" className="mb-6">
                    <h4 id="sec-profile" className="text-lg font-bold mb-4">프로필</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="name" className="label">이름</label>
                            <input id="name" type="text" className="input" value={formData.name} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor="birthday" className="label">생일</label>
                            <input id="birthday" type="date" className="input" value={formData.birthday} onChange={handleInputChange} />
                        </div>
                    </div>
                </section>

                <hr className="my-6 border-gray-700" />

                <section aria-labelledby="sec-contacts">
                    <h4 id="sec-contacts" className="text-lg font-bold mb-4">연락처</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="phone" className="label">휴대전화</label>
                            <input id="phone" type="tel" className="input" value={formData.phone} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor="email" className="label">이메일</label>
                            <input id="email" type="email" className="input" value={formData.email} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <button onClick={() => setIsModalOpen(true)} type="button" className="px-4 py-2 rounded-lg btn-outline hover:bg-gray-800">
                            <i className="fa-solid fa-key mr-2"></i>비밀번호 변경
                        </button>
                    </div>
                </section>

                <hr className="my-6 border-gray-700" />

                <div className="flex items-center justify-end gap-3">
                    <button type="submit" className="px-5 py-2 rounded-lg btn-primary">저장</button>
                </div>
            </form>
            <PasswordChangeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default MyPageAccountSettings;
