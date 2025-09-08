
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StepIndicator = ({ currentStep }) => (
    <div className="step-indicator">
        <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>1</div>
        <div className={`step-connector ${currentStep > 1 ? 'completed' : ''}`}></div>
        <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>2</div>
        <div className={`step-connector ${currentStep > 2 ? 'completed' : ''}`}></div>
        <div className={`step ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}>3</div>
    </div>
);

const Withdraw = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmations, setConfirmations] = useState({ dataLoss: false, reregisterLimit: false, teamExit: false, final: false });
    const navigate = useNavigate();

    const isFinalButtonEnabled = Object.values(confirmations).every(Boolean);

    const handleConfirmationChange = (e) => {
        const { id, checked } = e.target;
        setConfirmations(prev => ({ ...prev, [id]: checked }));
    };

    const verifyPassword = () => {
        if (!password) { setPasswordError('비밀번호를 입력해주세요.'); return; }
        if (password === 'wrongpassword') { setPasswordError('비밀번호가 일치하지 않습니다.'); return; }
        setPasswordError('');
        setCurrentStep(3);
    };

    const finalWithdraw = () => {
        console.log('Finalizing withdrawal...');
        setTimeout(() => {
            setCurrentStep(4);
            setTimeout(() => navigate('/'), 5000);
        }, 2000);
    };

    return (
        <div className="container mx-auto max-w-4xl p-6">
            <StepIndicator currentStep={currentStep} />

            {currentStep === 1 && (
                <section className="widget-card p-8 rounded-xl">
                    <h3 className="text-3xl font-bold gradient-text-red mb-4 text-center">계정 탈퇴 안내</h3>
                    <p className="text-gray-300 text-lg text-center mb-6">계정을 삭제하기 전에 아래 내용을 신중히 검토해주세요.</p>
                    <div className="warning-list">
                        {/* Warning details can be listed here */}
                    </div>
                    <div className="flex justify-between items-center mt-8">
                        <Link to="/mypage" className="btn-secondary"><i className="fas fa-arrow-left mr-2"></i>마이페이지로</Link>
                        <button onClick={() => setCurrentStep(2)} className="btn-danger">내용을 확인했으며, 탈퇴를 진행합니다<i className="fas fa-arrow-right ml-2"></i></button>
                    </div>
                </section>
            )}

            {currentStep === 2 && (
                <section className="widget-card p-8 rounded-xl">
                    <h3 className="text-3xl font-bold gradient-text mb-4 text-center">본인 확인</h3>
                    <div className="max-w-md mx-auto">
                        <label className="block text-sm font-medium text-gray-300 mb-3">현재 비밀번호</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="editable w-full" placeholder="비밀번호 입력" />
                        {passwordError && <div className="text-red-400 text-sm mt-2">{passwordError}</div>}
                    </div>
                    <div className="flex justify-between items-center mt-8">
                        <button onClick={() => setCurrentStep(1)} className="btn-secondary"><i className="fas fa-arrow-left mr-2"></i>이전 단계</button>
                        <button onClick={verifyPassword} className="btn-primary">비밀번호 확인<i className="fas fa-arrow-right ml-2"></i></button>
                    </div>
                </section>
            )}

            {currentStep === 3 && (
                <section className="widget-card p-8 rounded-xl">
                    <h3 className="text-3xl font-bold gradient-text-red mb-4 text-center">최종 확인</h3>
                    <div className="space-y-4 mb-8">
                        <div className="checkbox-container"><input type="checkbox" id="dataLoss" checked={confirmations.dataLoss} onChange={handleConfirmationChange} /><label htmlFor="dataLoss" className="text-gray-300 ml-2">모든 데이터가 영구적으로 삭제됨을 이해했습니다.</label></div>
                        <div className="checkbox-container"><input type="checkbox" id="reregisterLimit" checked={confirmations.reregisterLimit} onChange={handleConfirmationChange} /><label htmlFor="reregisterLimit" className="text-gray-300 ml-2">30일간 재가입이 불가능함을 이해했습니다.</label></div>
                        <div className="checkbox-container"><input type="checkbox" id="teamExit" checked={confirmations.teamExit} onChange={handleConfirmationChange} /><label htmlFor="teamExit" className="text-gray-300 ml-2">모든 팀 활동에서 제외됨을 이해했습니다.</label></div>
                        <div className="checkbox-container"><input type="checkbox" id="final" checked={confirmations.final} onChange={handleConfirmationChange} /><label htmlFor="final" className="text-gray-300 font-semibold ml-2">모든 내용을 숙지했으며, 계정 영구 삭제에 동의합니다.</label></div>
                    </div>
                    <div className="flex justify-between items-center">
                        <button onClick={() => setCurrentStep(2)} className="btn-secondary"><i className="fas fa-arrow-left mr-2"></i>이전 단계</button>
                        <button onClick={finalWithdraw} className={`btn-danger ${!isFinalButtonEnabled && 'opacity-50 cursor-not-allowed'}`} disabled={!isFinalButtonEnabled}><i className="fas fa-trash-alt mr-2"></i>계정 영구 삭제</button>
                    </div>
                </section>
            )}

            {currentStep === 4 && (
                <section className="widget-card p-8 rounded-xl text-center success-animation">
                    <h3 className="text-3xl font-bold text-green-400 mb-4">탈퇴가 완료되었습니다</h3>
                    <p className="text-gray-300 text-lg mb-8">그동안 TCP와 함께해 주셔서 감사했습니다.</p>
                    <p className="text-sm text-gray-400 mb-8">5초 후 자동으로 메인 페이지로 이동합니다...</p>
                    <Link to="/" className="btn-primary"><i className="fas fa-home mr-2"></i>메인 페이지로 이동</Link>
                </section>
            )}
        </div>
    );
};

export default Withdraw;
