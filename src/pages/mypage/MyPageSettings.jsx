
import React, { useState, useEffect } from 'react';

const MyPageSettings = () => {
    // This is a simplified mock of the logic from the HTML file.
    // A full implementation would require more robust state management and validation.
    const [formData, setFormData] = useState({
        name: 'Admin Kim',
        birthday: '2002-03-01',
        phone: '010-1234-5678',
        email: 'kimtcp@seoultech.ac.kr'
    });
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        // In a real app, you would fetch initial data here.
        // This effect checks for changes to enable the save button.
        // For this example, we'll just assume it can always be saved.
        setIsDirty(true); 
    }, [formData]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('저장되었습니다!');
        // API call to save data would go here
    };

    return (
        <div className="container mx-auto max-w-4xl">
            <h3 className="text-2xl font-bold gradient-text mb-6">계정 정보 수정</h3>
            <form id="settings-form" className="widget-card rounded-xl p-6" noValidate onSubmit={handleSubmit}>
                <section aria-labelledby="sec-profile">
                    <div className="flex items-center justify-between mb-4">
                        <h4 id="sec-profile" className="text-lg font-bold">프로필</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="name" className="label">이름</label>
                            <input id="name" name="name" type="text" className="input" required value={formData.name} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor="birthday" className="label">생일</label>
                            <input id="birthday" name="birthday" type="date" className="input" required value={formData.birthday} onChange={handleInputChange} />
                        </div>
                    </div>
                </section>

                <hr className="my-6 border-gray-700" />

                <section aria-labelledby="sec-contacts">
                    <h4 id="sec-contacts" className="text-lg font-bold mb-4">연락처</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="phone" className="label">휴대전화</label>
                            <input id="phone" name="phone" type="tel" className="input" required value={formData.phone} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor="email" className="label">이메일</label>
                            <input id="email" name="email" type="email" className="input" required value={formData.email} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <button type="button" className="px-4 py-2 rounded-lg btn-outline hover:bg-gray-800">
                            <i className="fa-solid fa-key mr-2"></i>비밀번호 변경
                        </button>
                    </div>
                </section>

                <hr className="my-6 border-gray-700" />

                <div className="flex items-center justify-end gap-3">
                    <button id="btn-save" type="submit" className="px-5 py-2 rounded-lg btn-primary disabled:opacity-50" disabled={!isDirty}>저장</button>
                </div>
            </form>
        </div>
    );
};

export default MyPageSettings;
