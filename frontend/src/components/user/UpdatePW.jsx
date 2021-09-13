import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/user/UpdatePW.css";

const UpdatePW = (props, { history }) => {
  // console.log(match.params.email);
  // const [email, setEmail] = useState("");
  const email = props.match.params.email;
  const [password, setPassword] = useState("");
  const [passwordChk, setPasswordChk] = useState("");
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [passwordChkValidation, setPasswordChkValidation] = useState(false);
  const [btnColorState, setBtnColorState] = useState(false);

  useEffect(() => {
    // setEmail(props.email);
    console.log(password);
    console.log(passwordChk);
    console.log(email);
  }, [password, passwordChk, passwordChkValidation, email]);

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangePasswordChk = (e) => {
    setPasswordChk(e.target.value);
  };

  const btnChangeColor = () => {
    //회원가입 유효성 검사 후 btnColorState값 변경
    passwordValidation && password === passwordChk
      ? setBtnColorState(true)
      : setBtnColorState(false);
  };

  const isPassword = () => {
    //조건1. 6~20 영문 대소문자
    // 조건2. 최소 1개의 숫자 혹은 특수 문자를 포함해야 함

    const passwordRegex = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;

    if (passwordRegex.test(password)) {
      setPasswordValidation(true);
      btnChangeColor();
    } else {
      setPasswordValidation(false);
      btnChangeColor();
    }
  };

  const isPasswordChk = () => {
    if (password === passwordChk) {
      setPasswordChkValidation(true);
    } else {
      setPasswordChkValidation(false);
    }
    btnChangeColor();
  };

  const onClickUpdate = () => {
    axios({
      url: "http://localhost:8080/api/user/passwords",
      method: "put",
      data: {
        email: email,
        password: password,
      },
    }).then((res) => {
      console.log(res);
      // history.push("/account/login");
    });
  };
  return (
    <div className="wrap">
      <div className="content-container">
        <div className="inner">
          <div className="logo-name">
            <h2>mokomoko</h2>
          </div>
          <p className="update-msg">비밀번호를 재설정 해주세요.</p>

          <div className="input-form">
            <div>
              <input
                className="user-input"
                type="password"
                name="password"
                value={password}
                placeholder="비밀번호"
                onChange={onChangePassword}
                onKeyUp={isPassword}
              />

              <div
                className={"password-validation-" + (passwordValidation ? "onColor" : "offColor")}
              >
                {passwordValidation
                  ? "괜찮은 비밀번호입니다."
                  : "6-20자 및 최소 1개의 숫자 혹은 특수 문자를 포함해주세요."}
              </div>
            </div>
            <div>
              <input
                className="user-input"
                type="password"
                name="passwordChk"
                value={passwordChk}
                placeholder="비밀번호 확인"
                onChange={onChangePasswordChk}
                onKeyUp={isPasswordChk}
              />
              <div
                className={
                  "passwordChk-validation-" + (passwordChkValidation ? "onColor" : "offColor")
                }
              >
                {passwordChkValidation
                  ? "비밀번호 일치"
                  : "상위에 입력한 비밀번호와 일치하지 않습니다."}
              </div>
              <div className="update-pw-submit">
                <Link to="/account/login">
                  <button
                    id="update-pw-btn"
                    className={"update-pw-btn-" + (btnColorState ? "onColor" : "offColor")}
                    type="button"
                    onClick={onClickUpdate}
                    disabled={!btnColorState}
                  >
                    완 료
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

export default UpdatePW;
