import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProfileSideBarData } from "./ProfileSidebarData";
import axios from "axios";

import "../../css/header/ProfileHambar.css";

const ProfileHambar = () => {
  const { user } = useSelector((state) => ({ user: state.userInfo.user }));

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const logout = (e) => {
    e.preventDefault();

    //localStorage 지워주기
    localStorage.removeItem("accessToken");

    //백엔드 통신
    axios({
      method: "post",
      url: "https://i5d104.p.ssafy.io/api/auth/logout",
      data: {
        email: user.email,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };

  return (
    <>
      {/*네비게이션 토글 코드 */}
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <HiIcons.HiOutlineDotsHorizontal id="hori-menu" onClick={showSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-itmes" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="navbar-toggle">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {/* ProfileSideBarData 순서대로 담기 */}
          {ProfileSideBarData &&
            ProfileSideBarData.map((item, index) => {
              return (
                <li
                  key={index}
                  className={item.cName}
                  onClick={item.title == "로그아웃" ? logout : ""}
                >
                  <Link to={item.path}>
                    {item.icons}
                    <span className="navbar-item-title">{item.title}</span>
                  </Link>
                </li>
              );
            })}
        </ul>
      </nav>
    </>
  );
};

export default ProfileHambar;
