import React from "react";
import { Link } from "react-router-dom";
import "../../css/Error.css";
import image404 from "../../img/404.png";

const Error404 = () => {
  return (
    <div>
      <div className="error-icon">
        <img src={image404} alt="404 icon" />
      </div>
      <div className="home-icon">
        <Link to="/account/login">
          <h2>홈으로 가기</h2>
        </Link>
      </div>
      <h2>페이지가 존재하지 않습니다.</h2>
    </div>
  );
};

export default Error404;
