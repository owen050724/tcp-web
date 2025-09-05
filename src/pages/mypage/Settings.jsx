import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import MyPageLayout from '../../components/MyPageLayout';

const Settings = () => {
  const { showNotification } = useOutletContext();
  const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    phone: '',
    email: '',
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    // Mock fetching initial data
    setFormData({
      name: 'Admin Kim',
      birthday: '2002-03-01',
      phone: '010-1234-5678',
      email: 'kimtcp@seoultech.ac.kr',
    });
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    showNotification('저장되었습니다.', 'success');
  };

  const PasswordModal = () => (
    <div className="modal show">
      <div className="modal-panel">
        <h3 className="text-xl font-bold">비밀번호 변경</h3>
        {/* Simplified for brevity */}
        <p className="my-4">비밀번호 변경 UI가 여기에 표시됩니다.</p>
        <button
          onClick={() => setShowPasswordModal(false)}
          className="btn-primary"
        >
          닫기
        </button>
      </div>
    </div>
  );

  return (
    <MyPageLayout>
      <main className="flex-1 p-6">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-2xl font-bold gradient-text mb-6">
            계정 정보 수정
          </h3>
          <form
            onSubmit={handleFormSubmit}
            className="widget-card rounded-xl p-6"
          >
            <section className="mb-6">
              <h4 className="text-lg font-bold mb-4">프로필</h4>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="label">
                    이름
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="input"
                    value={formData.name}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label htmlFor="birthday" className="label">
                    생일
                  </label>
                  <input
                    id="birthday"
                    name="birthday"
                    type="date"
                    className="input"
                    value={formData.birthday}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
            </section>

            <section>
              <h4 className="text-lg font-bold mb-4">연락처</h4>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="label">
                    휴대전화
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="input"
                    value={formData.phone}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="label">
                    이메일
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="input"
                    value={formData.email}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(true)}
                  className="px-4 py-2 rounded-lg btn-outline hover:bg-gray-800"
                >
                  <i className="fa-solid fa-key mr-2"></i>비밀번호 변경
                </button>
              </div>
            </section>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="submit"
                className="px-5 py-2 rounded-lg btn-primary"
              >
                저장
              </button>
            </div>
          </form>
        </div>
      </main>
      {showPasswordModal && <PasswordModal />}
    </MyPageLayout>
  );
};

export default Settings;
