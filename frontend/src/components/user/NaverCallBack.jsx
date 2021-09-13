import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../../modules/userInfo";
const { naver } = window;
const NaverCallBack = (props) => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  //useDispatch 사용해서 리덕스 스토어의 dispatch를 함수에서 사용할 수 있도록 해준다.
  const dispatch = useDispatch();

  const onSetUserInfo = (userInfo) => dispatch(setUserInfo(userInfo));
  const naverLogin = new naver.LoginWithNaverId({
    clientId: "nwk_DGz4Rg8qXKe4QUws",
    callbackUrl: "http://localhost:3000/account/naverLogin",
    isPopup: false, // popup 형식으로 띄울것인지 설정
    callbackHandle: true,
  });
  naverLogin.init();
  useEffect(() => {
    naverLogin.getLoginStatus(function (status) {
      if (status) {
        let image = naverLogin.user.getProfileImage();
        let id = naverLogin.user.getId();
        let nickname = naverLogin.user.getNickName();
        const data = {
          id: id,
          nickname: nickname,
          image: image,
        };
        console.log(data);
        // axios로 백엔드와 통신 후 login 페이지로 redirect
        props.history.push("/account/login");
        axios({
          method: "post",
          url: "https://i5d104.p.ssafy.io/api/auth/sns",
          data: data,
        })
          .then((res) => {
            console.log(res);
            let user = res.data.data.user;
            user = { ...user, ...res.data.data.relationResponse };
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            console.log("네이버 유저정보", user);
            console.log("naver res.data", res.data);
            console.log("naver res.data.data", res.data.data);
            onSetUserInfo(user);
            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

            props.history.push("/main/feed");
          })
          .catch((error) => {
            console.error(error);
            props.history.push("/account/login");
            alert("네이버 로그인에 실패했습니다.");
          });
      }
    });
  }, []);

  return <div></div>;
};

export default NaverCallBack;
