import React from 'react';

const Privacy = () => {
  return (
    <div className="container mx-auto max-w-4xl pt-24 p-6">
      <h2 className="text-3xl font-bold gradient-text mb-6">
        개인정보처리방침
      </h2>

      <div className="widget-card p-6 rounded-xl mb-8">
        <p className="text-gray-300 mb-4">
          Team Crazy Performance (이하 "TCP")는 정보통신망 이용촉진 및 정보보호
          등에 관한 법률, 개인정보보호법 등 관련 법령상의 개인정보보호 규정을
          준수하며, 관련 법령에 의거한 개인정보처리방침을 정하여 이용자 권익
          보호에 최선을 다하고 있습니다.
        </p>
        <p className="text-gray-300 mb-4">
          본 개인정보처리방침은 TCP가 제공하는 서비스에 적용되며, 다음과 같은
          내용을 담고 있습니다.
        </p>

        <h3 className="text-xl font-bold text-white mb-3">
          1. 개인정보의 수집 및 이용 목적
        </h3>
        <p className="text-gray-300 mb-4">
          TCP는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
          개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이
          변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등
          필요한 조치를 이행할 예정입니다.
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
          <li>
            회원 가입 및 관리: 회원 가입 의사 확인, 회원제 서비스 제공에 따른
            본인 식별·인증, 회원 자격 유지·관리, 제한적 본인확인제 시행에 따른
            본인확인, 서비스 부정이용 방지, 만 14세 미만 아동 개인정보 처리 시
            법정대리인의 동의 여부 확인, 각종 고지·통지, 고충처리 등을 목적으로
            개인정보를 처리합니다.
          </li>
          <li>
            서비스 제공: 콘텐츠 제공, 맞춤 서비스 제공, 본인인증, 연령인증,
            요금결제·정산, 채권추심 등을 목적으로 개인정보를 처리합니다.
          </li>
          <li>
            마케팅 및 광고에의 활용: 신규 서비스(제품) 개발 및 맞춤 서비스 제공,
            이벤트 및 광고성 정보 제공 및 참여기회 제공, 인구통계학적 특성에
            따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 접속빈도 확인
            또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를
            처리합니다.
          </li>
        </ul>

        <h3 className="text-xl font-bold text-white mb-3">
          2. 수집하는 개인정보 항목
        </h3>
        <p className="text-gray-300 mb-4">
          TCP는 회원가입, 서비스 이용 등을 위해 아래와 같은 개인정보를 수집하고
          있습니다.
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
          <li>필수 항목: 이름, 이메일 주소, 비밀번호, 휴대전화번호</li>
          <li>
            선택 항목: 생년월일, 성별, 주소, 직업, 관심 분야, 기술 스택, GitHub
            URL, 포트폴리오 URL 등
          </li>
          <li>
            서비스 이용 과정에서 자동으로 수집될 수 있는 항목: IP 주소, 쿠키,
            방문 일시, 서비스 이용 기록, 불량 이용 기록 등
          </li>
        </ul>

        <h3 className="text-xl font-bold text-white mb-3">
          3. 개인정보의 보유 및 이용 기간
        </h3>
        <p className="text-gray-300 mb-4">
          TCP는 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터
          개인정보를 수집 시에 동의 받은 개인정보 보유·이용 기간 내에서
          개인정보를 처리·보유합니다.
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
          <li>회원 정보: 회원 탈퇴 시까지</li>
          <li>다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지</li>
          <ul className="list-circle list-inside text-gray-300 mb-4 ml-8">
            <li>
              관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우에는 해당
              수사·조사 종료 시까지
            </li>
            <li>
              서비스 이용에 따른 채권·채무 관계 잔존 시에는 해당 채권·채무 관계
              정산 시까지
            </li>
          </ul>
        </ul>

        <h3 className="text-xl font-bold text-white mb-3">
          4. 개인정보의 파기
        </h3>
        <p className="text-gray-300 mb-4">
          TCP는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게
          되었을 때에는 지체없이 해당 개인정보를 파기합니다.
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
          <li>
            파기 절차: 이용자가 입력한 정보는 목적 달성 후 별도의 DB에
            옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라
            일정기간 저장된 후 혹은 즉시 파기됩니다. 이 때, DB로 옮겨진
            개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로 이용되지
            않습니다.
          </li>
          <li>
            파기 방법: 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수
            없는 기술적 방법을 사용하여 삭제하며, 종이 문서에 저장된 개인정보는
            분쇄기로 분쇄하거나 소각하여 파기합니다.
          </li>
        </ul>

        <h3 className="text-xl font-bold text-white mb-3">
          5. 개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항
        </h3>
        <p className="text-gray-300 mb-4">
          TCP는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를
          저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다. 쿠키는
          웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터
          브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터 내의
          하드디스크에 저장되기도 합니다.
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
          <li>
            쿠키의 사용 목적: 이용자가 방문한 각 서비스와 웹 사이트들에 대한
            방문 및 이용형태, 인기 검색어, 보안접속 여부 등을 파악하여
            이용자에게 최적화된 정보 제공을 위해 사용됩니다.
          </li>
          <li>
            쿠키의 설치·운영 및 거부: 웹브라우저 상단의 도구 &gt; 인터넷 옵션
            &gt; 개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부할 수
            있습니다.
          </li>
          <li>
            쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수
            있습니다.
          </li>
        </ul>

        <h3 className="text-xl font-bold text-white mb-3">
          6. 개인정보 보호책임자
        </h3>
        <p className="text-gray-300 mb-4">
          TCP는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와
          관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이
          개인정보 보호책임자를 지정하고 있습니다.
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
          <li>개인정보 보호책임자: [이름]</li>
          <li>소속: [부서]</li>
          <li>직책: [직책]</li>
          <li>연락처: [전화번호], [이메일]</li>
        </ul>
        <p className="text-gray-300 mb-4">
          정보주체께서는 TCP의 서비스(또는 사업)을 이용하시면서 발생한 모든
          개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보
          보호책임자 및 담당부서로 문의하실 수 있습니다. TCP는 정보주체의 문의에
          대해 지체없이 답변 및 처리해드릴 것입니다.
        </p>

        <h3 className="text-xl font-bold text-white mb-3">
          7. 개인정보 처리방침 변경
        </h3>
        <p className="text-gray-300 mb-4">
          이 개인정보처리방침은 2025년 1월 1일부터 적용됩니다.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
