import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faTrash,
  faTimes,
  faPaperPlane,
  faRocket,
  faGraduationCap,
  faHeart,
  faTrophy,
  faProjectDiagram,
  faBriefcase,
  faCode,
  faGlobe,
  faMobileAlt,
  faBrain,
  faUsers,
  faCalendarAlt,
  faUserFriends,
  faAward,
} from '@fortawesome/free-solid-svg-icons';

function Recruitment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([{}]); // Initial single empty project
  const [awards, setAwards] = useState([{}]); // Initial single empty award

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-fade').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const privacyAgreement = document.getElementById('privacyAgreement');
    if (!privacyAgreement.checked) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    const formData = new FormData(e.target);
    const data = {
      projects: [],
      awards: [],
    };

    // Process Projects
    const projectNames = formData.getAll('project_name');
    const projectContributions = formData.getAll('project_contribution');
    const projectDates = formData.getAll('project_date');
    const projectDescriptions = formData.getAll('project_description');
    const projectTechStacks = formData.getAll('project_tech_stack');

    projectNames.forEach((_, index) => {
      data.projects.push({
        name: projectNames[index],
        contribution: projectContributions[index],
        date: projectDates[index],
        description: projectDescriptions[index],
        techStack: projectTechStacks[index],
      });
    });

    // Process Awards
    const awardNames = formData.getAll('award_name');
    const awardInstitutions = formData.getAll('award_institution');
    const awardDates = formData.getAll('award_date');
    const awardDescriptions = formData.getAll('award_description');

    awardNames.forEach((_, index) => {
      data.awards.push({
        name: awardNames[index],
        institution: awardInstitutions[index],
        date: awardDates[index],
        description: awardDescriptions[index],
      });
    });

    // Add other form fields
    data.name = formData.get('name');
    data.studentId = formData.get('studentId');
    data.major = formData.get('major');
    data.phone = formData.get('phone');
    data.techStack = formData.get('techStack');
    data.interests = formData.get('interests');
    data.selfIntroduction = formData.get('selfIntroduction');
    data.expectations = formData.get('expectations');

    console.log('지원서 데이터:', data);
    alert('지원서가 성공적으로 제출되었습니다! 검토 후 연락드리겠습니다.');

    e.target.reset();
    closeModal();
  };

  const addProject = () => {
    setProjects([...projects, {}]);
  };

  const removeProject = (index) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects(newProjects);
  };

  const addAward = () => {
    setAwards([...awards, {}]);
  };

  const removeAward = (index) => {
    const newAwards = [...awards];
    newAwards.splice(index, 1);
    setAwards(newAwards);
  };

  return (
    <>
      <section className="pt-24 pb-16 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faRocket}
                  className="text-white text-3xl"
                />
              </div>
              <h1 className="orbitron text-5xl md:text-7xl font-black mb-4">
                <span className="gradient-text">TCP</span>
              </h1>
              <p className="orbitron text-xl md:text-2xl text-gray-300 mb-6">
                Team Crazy Performance
              </p>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                서울과학기술대학교 선발형 개발자 동아리 TCP와 함께 실용적이고
                창의적인 소프트웨어 프로젝트를 만들어보세요.
              </p>
              <button
                id="heroApplyBtn"
                onClick={openModal}
                className="cta-button px-12 py-4 rounded-full text-lg font-bold orbitron text-white hover:text-black transition-colors"
              >
                <FontAwesomeIcon icon={faRocket} className="mr-2" />
                지금 지원하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About TCP 세션 */}
      <section
        id="about"
        className="py-16 bg-gradient-to-b from-transparent to-gray-900"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="orbitron text-3xl md:text-4xl font-bold gradient-text mb-4">
              About TCP
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-300 mb-6">
                TCP (Team Crazy Performance)는 서울과학기술대학교의 매우
                선발적인 개발자 동아리입니다.
              </p>
              <p className="text-lg text-gray-400 mb-8">
                우리는 협업, 스터디, 그리고 실험을 통해 실용적이고 창의적인
                소프트웨어 프로젝트를 구축하는 것을 목표로 합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 지원자 세션 */}
      <section id="who-should-apply" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="orbitron text-3xl font-bold gradient-text mb-8 text-center">
              Who Should Apply
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="scroll-fade">
                <div className="feature-card p-8 rounded-2xl">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faGraduationCap}
                      className="text-white text-2xl"
                    />
                  </div>
                  <h3 className="orbitron text-xl font-bold mb-4 text-blue-300 text-center">
                    모든 서울과기대 학생
                  </h3>
                  <p className="text-gray-300 text-center">
                    서울과학기술대학교의 모든 학생들을 환영합니다. 전공에
                    관계없이 개발에 대한 열정이 있다면 누구든지 지원할 수
                    있습니다.
                  </p>
                </div>
              </div>
              <div className="scroll-fade">
                <div className="feature-card p-8 rounded-2xl">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="text-white text-2xl"
                    />
                  </div>
                  <h3 className="orbitron text-xl font-bold mb-4 text-purple-300 text-center">
                    열정적인 학습자
                  </h3>
                  <p className="text-gray-300 text-center">
                    현재 실력 수준보다는 개선하고 성장하려는 열정적인 학습자를
                    특히 찾고 있습니다. 함께 배우고 발전해나가는 것이
                    중요합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TCP 활동 세션 */}
      <section
        id="what-we-do"
        className="py-16 bg-gradient-to-b from-transparent to-gray-900"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="orbitron text-3xl md:text-4xl font-bold gradient-text mb-8">
              What We Do
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* 2024 성과 */}
            <div className="mb-12 scroll-fade">
              <h3 className="orbitron text-2xl font-bold mb-6 text-center text-blue-300">
                2024 주요 성과
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="achievement-card">
                  <div className="text-center">
                    <FontAwesomeIcon
                      icon={faTrophy}
                      className="text-3xl text-yellow-400 mb-4"
                    />
                    <h4 className="orbitron font-bold text-lg mb-2">
                      대회 성과
                    </h4>
                    <p className="text-gray-300 text-sm">
                      • ICPC 지역 예선 본선 진출
                      <br />
                      • 해커톤 대회 3회 수상
                      <br />• 창업 경진대회 우수상
                    </p>
                  </div>
                </div>
                <div className="achievement-card">
                  <div className="text-center">
                    <FontAwesomeIcon
                      icon={faProjectDiagram}
                      className="text-3xl text-green-400 mb-4"
                    />
                    <h4 className="orbitron font-bold text-lg mb-2">
                      프로젝트 완료
                    </h4>
                    <p className="text-gray-300 text-sm">
                      • 웹 서비스 프로젝트 8개
                      <br />
                      • 모바일 앱 프로젝트 5개
                      <br />• AI/ML 프로젝트 3개
                    </p>
                  </div>
                </div>
                <div className="achievement-card">
                  <div className="text-center">
                    <FontAwesomeIcon
                      icon={faBriefcase}
                      className="text-3xl text-purple-400 mb-4"
                    />
                    <h4 className="orbitron font-bold text-lg mb-2">
                      취업 성과
                    </h4>
                    <p className="text-gray-300 text-sm">
                      • 네이버, 카카오 등 대기업 취업
                      <br />
                      • 스타트업 창업 2팀
                      <br />• 인턴십 경험 15명
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2024 스터디 활동 */}
            <div className="scroll-fade">
              <h3 className="orbitron text-2xl font-bold mb-6 text-center text-purple-300">
                2024 스터디 활동
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="feature-card p-6 rounded-2xl">
                  <h4 className="orbitron font-bold text-lg mb-4 text-blue-300 text-left">
                    기술 스터디
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faCode}
                        className="text-blue-400"
                      />
                      <span>알고리즘 & 자료구조 스터디 (매주 목요일)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faGlobe}
                        className="text-green-400"
                      />
                      <span>웹 개발 스터디 (React, Node.js)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faMobileAlt}
                        className="text-purple-400"
                      />
                      <span>모바일 앱 개발 스터디 (Flutter, React Native)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faBrain}
                        className="text-pink-400"
                      />
                      <span>AI/ML 스터디 (PyTorch, TensorFlow)</span>
                    </li>
                  </ul>
                </div>
                <div className="feature-card p-6 rounded-2xl">
                  <h4 className="orbitron font-bold text-lg mb-4 text-green-300 text-left">
                    프로젝트 기반 학습
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faUsers}
                        className="text-blue-400"
                      />
                      <span>팀 프로젝트 (4-6명 팀으로 구성)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="text-green-400"
                      />
                      <span>월간 프로젝트 발표회</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faUserFriends}
                        className="text-purple-400"
                      />
                      <span>선배 멘토링 프로그램</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faAward}
                        className="text-pink-400"
                      />
                      <span>우수 프로젝트 시상 및 포트폴리오 지원</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 지원 버튼 */}
          <div className="text-center mt-12">
            <button
              id="sectionApplyBtn"
              onClick={openModal}
              className="cta-button px-12 py-4 rounded-full text-lg font-bold orbitron text-white hover:text-black transition-colors"
            >
              <FontAwesomeIcon icon={faRocket} className="mr-2" />
              Apply Now
            </button>
            <p className="text-sm text-gray-300 mt-4">
              * 지원 기간: 매 학기 시작 2주 전 ~ 개강 후 1주
            </p>
          </div>
        </div>
      </section>

      {/* 지원서 모달 */}
      {isModalOpen && (
        <div
          id="applicationModal"
          className="modal active"
          onClick={(e) => e.target.id === 'applicationModal' && closeModal()}
        >
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="p-8">
              <h2 className="orbitron text-2xl font-bold gradient-text mb-6 text-center">
                TCP 지원서
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className="form-label required text-left"
                  >
                    이름
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="studentId"
                    className="form-label required text-left"
                  >
                    학번
                  </label>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="major"
                    className="form-label required text-left"
                  >
                    학과/전공
                  </label>
                  <input
                    type="text"
                    id="major"
                    name="major"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="phone"
                    className="form-label required text-left"
                  >
                    전화번호
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="interests"
                    className="form-label required text-left"
                  >
                    관심 분야
                  </label>
                  <textarea
                    id="interests"
                    name="interests"
                    className="form-input form-textarea"
                    placeholder="웹 개발, 모바일 앱, AI/ML, 게임 개발 등 관심 있는 분야를 작성해주세요"
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="selfIntroduction"
                    className="form-label required text-left"
                  >
                    자기소개
                  </label>
                  <textarea
                    id="selfIntroduction"
                    name="selfIntroduction"
                    className="form-input form-textarea"
                    placeholder="자신의 성격, 장점, 개발에 대한 열정 등을 자유롭게 작성해주세요"
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="expectations"
                    className="form-label required text-left"
                  >
                    TCP에 대한 기대
                  </label>
                  <textarea
                    id="expectations"
                    name="expectations"
                    className="form-input form-textarea"
                    placeholder="TCP에서 무엇을 배우고 경험하고 싶은지, 어떤 기여를 할 수 있는지 작성해주세요"
                    required
                  ></textarea>
                </div>

                {/* 프로젝트 경험 */}
                <div className="section">
                  <h3 className="orbitron text-xl font-bold gradient-text mb-4 text-left">
                    프로젝트 경험
                  </h3>
                  <div id="projects-container">
                    {projects.map((project, index) => (
                      <div
                        key={index}
                        className="entry mb-4 p-4 border border-gray-700 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white">
                            프로젝트 #{index + 1}
                          </h4>
                          {projects.length > 1 && (
                            <button
                              type="button"
                              className="text-red-400 hover:text-red-300"
                              onClick={() => removeProject(index)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          )}
                        </div>
                        <label className="block text-sm font-medium text-gray-300">
                          프로젝트명:
                          <input
                            type="text"
                            name="project_name"
                            className="form-input mt-1"
                          />
                        </label>
                        <label className="block text-sm font-medium text-gray-300 mt-2">
                          참여율 (%):
                          <input
                            type="text"
                            name="project_contribution"
                            className="form-input mt-1"
                          />
                        </label>
                        <label className="block text-sm font-medium text-gray-300 mt-2">
                          발표년월:
                          <input
                            type="month"
                            name="project_date"
                            className="form-input mt-1"
                          />
                        </label>
                        <label className="block text-sm font-medium text-gray-300 mt-2">
                          프로젝트 내용:
                          <textarea
                            name="project_description"
                            className="form-input form-textarea mt-1"
                          />
                        </label>
                        <label className="block text-sm font-medium text-gray-300 mt-2">
                          사용 기술:
                          <input
                            type="text"
                            name="project_tech_stack"
                            className="form-input mt-1"
                            placeholder="예: React, Node.js"
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="btn-secondary px-4 py-2 text-sm rounded-lg"
                    onClick={addProject}
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    프로젝트 추가
                  </button>
                </div>

                {/* 수상 기록 */}
                <div className="section">
                  <h3 className="orbitron text-xl font-bold gradient-text mb-4 text-left">
                    수상 기록
                  </h3>
                  <div id="awards-container">
                    {awards.map((award, index) => (
                      <div
                        key={index}
                        className="entry mb-4 p-4 border border-gray-700 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white">
                            수상 #{index + 1}
                          </h4>
                          {awards.length > 1 && (
                            <button
                              type="button"
                              className="text-red-400 hover:text-red-300"
                              onClick={() => removeAward(index)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          )}
                        </div>
                        <label className="block text-sm font-medium text-gray-300">
                          수상명:
                          <input
                            type="text"
                            name="award_name"
                            className="form-input mt-1"
                          />
                        </label>
                        <label className="block text-sm font-medium text-gray-300 mt-2">
                          수여 기관:
                          <input
                            type="text"
                            name="award_institution"
                            className="form-input mt-1"
                          />
                        </label>
                        <label className="block text-sm font-medium text-gray-300 mt-2">
                          수상 년월:
                          <input
                            type="month"
                            name="award_date"
                            className="form-input mt-1"
                          />
                        </label>
                        <label className="block text-sm font-medium text-gray-300 mt-2">
                          수상 내용:
                          <textarea
                            name="award_description"
                            className="form-input form-textarea mt-1"
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="btn-secondary px-4 py-2 text-sm rounded-lg"
                    onClick={addAward}
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    수상 추가
                  </button>
                </div>

                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="privacyAgreement"
                    name="privacyAgreement"
                    required
                  />
                  <label
                    htmlFor="privacyAgreement"
                    className="text-sm text-gray-300 text-left"
                  >
                    개인정보 수집 및 이용에 동의합니다.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full cta-button py-3 rounded-lg font-bold orbitron text-white hover:text-black transition-colors"
                >
                  <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                  지원서 제출
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Recruitment;
