import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIndex } from "../../../modules/MainNav";
import Post from "./Post";
import List from "../explore/List";
import FetchMore from "../explore/FetchMore";
import { Container, Row, Col } from "react-bootstrap";
import Cheader from "../../header/Cheader";
import axios from "axios";
import "../../../css/main/explore/Explore.css";
const Feed = ({ history }) => {
  const { activeNav, user } = useSelector((state) => ({
    activeNav: state.activeNav,
    user: state.userInfo.user,
  }));

  const dispatch = useDispatch();

  const onSetIndex = (activeNav) => dispatch(setIndex(activeNav));

  const [page, setPage] = useState(0);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postid, setPostid] = useState(0);
  const [postCheck, setPostCheck] = useState(true);
  useEffect(() => {
    onSetIndex(1);
    if (user.nickname == null) {
      console.log(user);
      history.push("/main/settingNick");
    }
    return () => {};
  }, []);

  //피드 받아오기
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
          <Cheader title="피드" />
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
};

export default Feed;
