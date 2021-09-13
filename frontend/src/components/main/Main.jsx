import React from "react";

import MainNav from "./MainNav";

import Feed from "../main/feed/Feed";
import Post from "../main/feed/Post";
import NicknameSetting from "../user/NicknameSetting";
import Explore from "../main/explore/Explore";
import Profile from "../main/profile/Profile";
import Detail from "../main/profile/Detail";
import DetailPage from "../main/profile/DetailPage";
import Select from "../main/write/Select";
import Food from "../main/write/Food";
import FoodImageText from "./write/FoodImageText";
import FoodRecipeText from "./write/FoodRecipeText";
import FoodRecipeSubmit from "./write/FoodRecipeSubmit";
import DetailPresenter from "./DetailPresenter";
import DetailPresenterCopy from "./DetailPresenterCopy";
import DeveloperInfo from "../header/profileSidebar/DeveloperInfo";
import UserInfoModify from "../header/profileSidebar/UserInfoModify";
import UserBlock from "../header/profileSidebar/UserBlock";
import { Route } from "react-router-dom";
import Dictaphone from "./DictaPhone";
import AwardMain from "./award/AwardMain";
import Comment from "./Comment";
import CommentPage from "./CommentPage";

// 메인 네비게이션 있는 컴포넌트들
const Main = () => {
  return (
    <div>
      <div className="mainSection">
        <Route path="/main/feed" component={Feed} />
        <Route path="/main/post" component={Post} />
        <Route path="/main/settingNick" component={NicknameSetting} />
        <Route path="/main/explore" component={Explore} />
        <Route path="/main/profile" component={Profile} />
        <Route path="/main/detail/:index" component={Detail} />
        <Route path="/main/detail/:index" component={DetailPage} />
        <Route path="/main/select" component={Select} />
        <Route path="/main/writeFood" component={Food} />
        <Route path="/main/writeFoodImageText" component={FoodImageText} />
        <Route path="/main/writeFoodRecipeText" component={FoodRecipeText} />
        <Route path="/main/writeFoodRecipeSubmit" component={FoodRecipeSubmit} />
        <Route path="/main/p/comment/:index" component={Comment} />
        <Route path="/main/p/commentPage/:index" component={CommentPage} />
        <Route path="/main/testt/:index" component={DetailPresenter} />
        <Route path="/main/detailPresenter/:index" component={DetailPresenterCopy} />
        <Route path="/main/award" component={AwardMain} />

        {/*profile side bar */}
        <Route path="/main/developers/info" component={DeveloperInfo}></Route>
        <Route path="/main/account/userInfo/modify" component={UserInfoModify}></Route>
        <Route path="/main/account/userInfo/block" component={UserBlock}></Route>
        <Route path="/main/test/speech" component={Dictaphone} />

        <MainNav />
      </div>
    </div>
  );
};

export default Main;
