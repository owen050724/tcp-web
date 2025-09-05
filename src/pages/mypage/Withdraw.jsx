import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import MyPageLayout from '../../components/MyPageLayout';

const Withdraw = () => {
  const { showNotification } = useOutletContext();
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState('');
  const [confirmations, setConfirmations] = useState({
    dataLoss: false,
    limit: false,
    teamExit: false,
    final: false,
  });

  const handleNextStep = () => setStep((s) => s + 1);
  const handlePrevStep = () => setStep((s) => s - 1);

  const handlePasswordVerification = () => {
    if (password === 'password123') {
      // Mock verification
      handleNextStep();
    } else {
      showNotification('비밀번호가 일치하지 않습니다.', 'error');
    }
  };

  const handleConfirmationChange = (e) => {
    setConfirmations({ ...confirmations, [e.target.name]: e.target.checked });
  };

  const isFinalButtonDisabled = !Object.values(confirmations).every(Boolean);

  const handleFinalWithdraw = () => {
    if (!isFinalButtonDisabled) {
      showNotification('계정이 영구적으로 삭제되었습니다.', 'success');
      handleNextStep();
    }
  };

  const StepIndicator = () => (
    <div className="step-indicator mb-8">
      {[1, 2, 3].map((s) => (
        <React.Fragment key={s}>
          <div
            className={`step ${step === s ? 'active' : step > s ? 'completed' : ''}`}
          >
            {s}
          </div>
          {s < 3 && (
            <div
              className={`step-connector ${step > s ? 'completed' : ''}`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <MyPageLayout>
      <main className="flex-1 p-6">
        <div className="container mx-auto max-w-4xl">
          <StepIndicator />

          {step === 1 && (
            <section className="widget-card p-8 rounded-xl">
              <h3 className="text-3xl font-bold gradient-text-red mb-4 text-center">
                계정 탈퇴 안내
              </h3>
              <p className="text-center text-gray-300 mb-8">
                계정을 삭제하기 전에 아래 내용을 신중히 검토해주세요.
              </p>
              <div className="flex justify-end">
                <button onClick={handleNextStep} className="btn-danger">
                  내용을 확인했으며, 탈퇴를 진행합니다
                </button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="widget-card p-8 rounded-xl">
              <h3 className="text-3xl font-bold gradient-text mb-4 text-center">
                본인 확인
              </h3>
              <div className="max-w-md mx-auto">
                <label htmlFor="password-verification" className="label">
                  현재 비밀번호
                </label>
                <input
                  type="password"
                  id="password-verification"
                  className="editable"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-between mt-8">
                <button onClick={handlePrevStep} className="btn-secondary">
                  이전 단계
                </button>
                <button
                  onClick={handlePasswordVerification}
                  className="btn-primary"
                >
                  비밀번호 확인
                </button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="widget-card p-8 rounded-xl">
              <h3 className="text-3xl font-bold gradient-text-red mb-4 text-center">
                최종 확인
              </h3>
              <div className="space-y-4 mb-8">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="dataLoss"
                    checked={confirmations.dataLoss}
                    onChange={handleConfirmationChange}
                    className="mr-2"
                  />{' '}
                  모든 데이터가 영구적으로 삭제됩니다.
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="limit"
                    checked={confirmations.limit}
                    onChange={handleConfirmationChange}
                    className="mr-2"
                  />{' '}
                  30일간 재가입이 불가능합니다.
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="teamExit"
                    checked={confirmations.teamExit}
                    onChange={handleConfirmationChange}
                    className="mr-2"
                  />{' '}
                  모든 팀에서 자동 제외됩니다.
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="final"
                    checked={confirmations.final}
                    onChange={handleConfirmationChange}
                    className="mr-2"
                  />{' '}
                  위 내용에 모두 동의합니다.
                </label>
              </div>
              <div className="flex justify-between">
                <button onClick={handlePrevStep} className="btn-secondary">
                  이전 단계
                </button>
                <button
                  onClick={handleFinalWithdraw}
                  disabled={isFinalButtonDisabled}
                  className={`btn-danger ${isFinalButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  계정 영구 삭제
                </button>
              </div>
            </section>
          )}

          {step === 4 && (
            <section className="widget-card p-8 rounded-xl text-center">
              <h3 className="text-3xl font-bold text-green-400 mb-4">
                탈퇴가 완료되었습니다
              </h3>
              <p>그동안 함께해 주셔서 감사합니다.</p>
            </section>
          )}
        </div>
      </main>
    </MyPageLayout>
  );
};

export default Withdraw;
