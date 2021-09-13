import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../../css/user/Join.css";
import EmailBtnModal from "./EmailBtnModal";

const Join = ({ props, history }) => {
  //state 선언
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordChk, setPasswordChk] = useState("");
  const [btnColorState, setBtnColorState] = useState(false); // 기본값 false
  const [isCheck, setCheck] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [passwordChkValidation, setPasswordChkValidation] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [validationCnt, setValidationCnt] = useState(0);

  useEffect(() => {}, [password, passwordChk, passwordChkValidation, isCheck, validationCnt]);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  // 비밀번호 이벤트
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangePasswordChk = (e) => {
    setPasswordChk(e.target.value);
  };

  const btnChangeColor = () => {
    //회원가입 유효성 검사 후 btnColorState값 변경
    emailValidation && passwordValidation && password === passwordChk
      ? setBtnColorState(true)
      : setBtnColorState(false);
  };

  const onClickJoin = () => {
    axios({
      url: "http://localhost:8080/api/auth/signup",
      method: "post",
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {})
      .catch((error) => {});
    history.push("/account/login");
  };

  //이메일 유효성 검사
  const isEmail = () => {
    // eslint-disable-next-line
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

  const mailValidation = () => {
    setValidationCnt(validationCnt + 1);
    if (!isCheck) {
      axios({
        url: "http://localhost:8080/api/auth/mails/" + email,
        method: "get",
      }).then((res) => {});
    }

    setModalShow(true);
  };

  return (
    <div className="wrap">
      <div className="user-container">
        <div className="inner">
          <div className="logo-name">
            <h2>mokomoko</h2>
          </div>
          {/* 회원가입 입력 창 */}
          <div className="join-form">
            <div className="join-id">
              <input
                className="user-email-input"
                type="text"
                autoCapitalize="off"
                name="email"
                value={email}
                placeholder="이메일 주소"
                onChange={onChangeEmail}
                onKeyUp={isEmail}
                disabled={isCheck}
              />
              {/* <LoadingButton /> */}
              <button
                id="mail-check-btn"
                className={"email-btn-validation-" + (emailValidation ? "onColor" : "offColor")}
                onClick={mailValidation}
                disabled={!emailValidation || isCheck}
              >
                {isCheck ? "인증완료" : "인증"}
              </button>

              <EmailBtnModal
                email={email}
                setCheck={setCheck}
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
              <div
                className={"email-validation-" + (emailValidation ? "onColor" : "offColor")}
                style={isCheck || validationCnt > 0 ? { display: "none" } : {}}
              >
                {emailValidation ? "사용 가능한 아이디입니다." : "이메일 형식이 잘못되었습니다."}
              </div>
              <div className={"id-validation-" + (isCheck ? "onColor" : "offColor")}>
                {isCheck ? "인증이 완료되었습니다." : "이메일 인증을 해주세요."}
              </div>
            </div>
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
            </div>
            <div className="submit">
              <button
                id="join-btn"
                className={btnColorState && isCheck ? "join-btn-active" : "join-btn-unactive"}
                type="button"
                onClick={onClickJoin}
                disabled={!btnColorState || !isCheck}
              >
                회원가입
              </button>
            </div>
            <div className="to-login">
              <span className="have-account-msg">이미 계정이 있나요 ? </span>
              <Link to="/account/Login">
                <span className="to-login-name"> 로그인하기.</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
