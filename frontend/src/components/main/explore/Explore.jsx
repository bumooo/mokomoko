import React, { useState, useEffect } from "react";
import List from "./List";
import FetchMore from "./FetchMore";
import { useSelector, useDispatch } from "react-redux";
import { setIndex } from "../../../modules/MainNav";
// import { getUserInfo, setUserInfo } from "../../../modules/userInfo";
import ExploreHeader from "./ExploreHeader";
// import jQuery from "jquery";
import "../../../css/main/explore/Explore.css";
// test 이미지
import image1 from "../../../img/햄버거1.jpg";
import image2 from "../../../img/햄버거2.jpg";
import image3 from "../../../img/햄버거3.jpg";
import axios from "axios";
export default function App() {
  // 현재 로그인된 사용자의 정보 받아오기
  const { user } = useSelector((state) => ({ user: state.userInfo.user }));

  const dispatch = useDispatch();
  // const onSetUserInfo = (userInfo) => dispatch(setUserInfo(userInfo));

  // const [userInfo, SetUserInfo] = useState(user);

  const onSetIndex = (activeNav) => dispatch(setIndex(activeNav));

  const [page, setPage] = useState(0);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postid, setPostid] = useState(0);
  const [postCheck, setPostCheck] = useState(true);

  // 탐색 피드 받아오기
  useEffect(() => {
    onSetIndex(2);
  }, []);
  useEffect(() => {
    setLoading(true);
    axios({
      method: "post",
      url: "http://localhost:8080/api/post/explore/",
      data: {
        postid: postid,
        userid: user.id,
      },
    })
      .then((result) => {
        console.log(result);
        console.log(result.data.data);
        let newList = Object.assign([], list);
        console.log(newList);
        newList.push(...result.data.data);
        setList(newList);
        console.log(newList);
        if (result.data.data.length > 0) {
          setPostid(result.data.data[result.data.data.length - 1].post.id);
        } else {
          setPostCheck(false);
        }
      })
      .catch((res) => {
        console.log(res);
      });
    setLoading(false);
  }, [page]);

  return (
    <div className="explore-wrapper">
      <div className="explore-row">
        <div className="explore-col">
          <ExploreHeader />
          <div id="explore" className={page === 0 && loading ? "loading" : ""}>
            <List list={list} />
            {postCheck ? (
              <FetchMore loading={page !== 0 && loading} setPage={setPage} page={page} />
            ) : (
              <div>데이터 없음</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
