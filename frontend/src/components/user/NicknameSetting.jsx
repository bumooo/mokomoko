import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../../modules/userInfo";
import axios from "axios";
import "../../css/user/NicknameSetting.css";

const NicknameSetting = ({ history }) => {
  const { user } = useSelector((state) => ({
    user: state.userInfo.user,
  }));

  const [nickname, setNickname] = useState("");

  const [nicknameValidation, setNicknameValidation] = useState(false);
  const [btnColorState, setBtnColorState] = useState(false);
  const [info, setInfo] = useState(user);

  const dispatch = useDispatch();

  const onSetUserInfo = (userInfo) => dispatch(setUserInfo(userInfo));

  useEffect(() => {
    // console.log(nickname);
  }, [nickname, nicknameValidation]);

  const btnChangeColor = () => {
    nicknameValidation ? setBtnColorState(true) : setBtnColorState(false);
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const isNicknameOk = () => {
    // 숫자, 알파벳 대소문자, . , _ 이외 문자일 경우 false
    // console.log("ok");

    const nicknameRegex = /^[a-zA-Z0-9._]{3,15}$/;

    // console.log(nicknameRegex.test(nickname));

    if (nicknameRegex.test(nickname)) {
      setNicknameValidation(true);
      btnChangeColor();
    } else {
      setNicknameValidation(false);
    }
  };

  const onClickProgress = () => {
    // setInfo(user);
    // console.log("사용자 정보", info)
    info.nickname = nickname;

    onSetUserInfo(info);
    const formData = new FormData();
    formData.append("id", info.id);
    formData.append("nickname", info.nickname);
    // 백엔드 통신
    axios({
      method: "put",
      url: "http://localhost:8080/api/user/name",
      data: user,
      contentType: "application/json; charset=utf-8",
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    history.push("/main/feed");
  };

  return (
    <div className="wrap">
      <div className="user-container">
        <div className="inner">
          <div className="logo-name">
            <h2>처음이신가요 ?</h2>
          </div>
          <div className="setting-form">
            <div className="nickname-desc">
              <p className="nickname-desc-msg">개성있는 나만의 닉네임을 설정해보세요 !</p>
            </div>
            <div className="nickname">
              <input
                className="input-nickname"
                type="text"
                autoCapitalize="off"
                name="nickname"
                value={nickname}
                placeholder="닉네임"
                onChange={onChangeNickname}
                onKeyUp={isNicknameOk}
              />
              <div
                className={"nickname-validation-" + (nicknameValidation ? "onColor" : "offColor")}
              >
                {nicknameValidation ? "사용 가능한 닉네임입니다." : "사용할 수 없는 닉네임입니다."}
              </div>
            </div>
            <div className="nickname-submit">
              <button
                id="nickname-set-btn"
                className={btnColorState ? "set-btn-active" : "set-btn-unactive"}
                type="button"
                onClick={onClickProgress}
              >
                닉네임 설정
                {/* <div>
                  <FontAwesomeIcon icon="fa-solid fa-circle-arrow-right" />
                </div> */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NicknameSetting;
