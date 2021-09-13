import React, { useEffect } from "react";

import "../../css/user/NaverLogin.css";

const { naver } = window;

function NaverLogin() {
  const init = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: "nwk_DGz4Rg8qXKe4QUws",
      callbackUrl: "http://localhost:3000/account/naverLogin",
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: "green", type: 3, height: "28" }, //버튼의 스타일, 타입, 크기를 지정
    });
    naverLogin.init();
  };
  useEffect(() => {
    init();
  }, []);

  return <div id="naverIdLogin" />;
}

export default NaverLogin;
