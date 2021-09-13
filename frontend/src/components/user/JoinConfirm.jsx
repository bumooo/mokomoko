import React from "react";


import "../../css/user/JoinConfirm.css";


const JoinConfirm = () => {
  
  const reSendEmail = () => {
    console.log("이메일 재발송 이벤트");
  };

  return (
    <div>
      <h1>회원가입 인증 메일이 발송되었습니다.</h1>
      <h3>이메일을 확인해 주세요.</h3>
      <div>
        <a>이메일이 발송되지 않았나요? &nbsp;</a>
        <button className="btn-resend-email" onClick={reSendEmail}>이메일 재발송</button>
      </div>
    </div>
  );
};

export default JoinConfirm;
