import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/user/ForgotPassword.css";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [btnColorState, setBtnColorState] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  //이메일 유효성 검사
  const isEmail = () => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (emailRegex.test(email)) {
      setEmailValidation(true);
      btnChangeColor();
    } else {
      setEmailValidation(false);
      btnChangeColor();
    }
  };

  const btnChangeColor = () => {
    emailValidation ? setBtnColorState(true) : setBtnColorState(false);
    console.log(btnColorState);
  };

  const sendMail = () => {
    axios({
      url: "http://localhost:8080/api/auth/passwords/" + email,
      method: "get",
    }).then((res) => {
      console.log(res);
    });
  };

  const onClickNext = () => {
    sendMail();
  };
  return (
    <div className="wrap">
      <div className="content-container">
        <div className="inner">
          <div className="logo-name">
            <h2>mokomoko</h2>
          </div>
          <p className="forgot-msg">
            비밀번호를 잊으셨나요 ? <br /> 이메일 인증을 통해 비밀번호를 재설정 해보세요.
          </p>

          <div className="input-form">
            <div className="forgot-id">
              <input
                className="input-forgot-id"
                type="text"
                autoCapitalize="off"
                name="email"
                value={email}
                placeholder="이메일"
                onChange={onChangeEmail}
                onKeyUp={isEmail}
              />
              <div className={"email-validation-" + (emailValidation ? "onColor" : "offColor")}>
                {emailValidation ? "" : "이메일 형식이 잘못되었습니다."}
              </div>
              <div className="forgot-submit">
                <Link to={`/account/enterCode/${email}`}>
                  <button
                    id="forgot-next-btn"
                    className={"forgot-next-btn-" + (btnColorState ? "onColor" : "offColor")}
                    type="button"
                    onClick={onClickNext}
                    disabled={!btnColorState}
                    // email={email}
                  >
                    다음
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
