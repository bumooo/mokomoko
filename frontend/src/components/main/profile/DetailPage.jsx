import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../css/main/profile/Detail.css";
import { Avatar } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ChatBubbleOutlinedIcon from "@material-ui/icons/ChatBubbleOutlined";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import { Col, Form, Row } from "react-bootstrap";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { setLike, setPost } from "../../../modules/Post";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { setPostData } from "../../../modules/PostData";
const DetailPage = (props) => {
  const history = useHistory();
  // 출력할 데이터

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  var word = transcript.split(" ");

  // 출력할 데이터
  const { user } = useSelector((state) => ({
    user: state.userInfo.user,
  }));
  const { PostData } = useSelector((state) => state.PostData);
  console.log(PostData);
  const [likeNumber, setLikeNumber] = useState(PostData.post.likeCnt);
  useEffect(() => {
    // checking();
    return () => {
      checking();
    };
  }, [transcript, likeNumber, PostData.post]);

  const dispatch = useDispatch();
  const onSetLike = (like) => dispatch(setLike(like));

  const [bookmark, setBookmark] = useState(false);
  const [scrollState, setScrollState] = useState(Number(0));

  const isPostLike = () => {
    console.log("좋아요");

    let newPostData = Object.assign({}, PostData);

    if (PostData.like === false) {
      newPostData.like = true;
      dispatch(setPostData(newPostData));

      axios({
        method: "post",
        url: "http://localhost:8080/api/likes",
        data: {
          userid: user.id,
          postid: PostData.post.id,
        },
      })
        .then((response) => {
          setLikeNumber(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      newPostData.like = false;
      dispatch(setPostData(newPostData));

      axios({
        method: "delete",
        url: "http://localhost:8080/api/likes",
        data: {
          userid: user.id,
          postid: PostData.post.id,
        },
      })
        .then((response) => {
          setLikeNumber(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const isBookmark = () => {
    setBookmark(!bookmark);
  };

  const goToShop = (e, shoppingUrl) => {
    e.preventDefault();

    window.open(shoppingUrl);
  };

  const showNextImage = () => {
    console.log("다음 이미지 보여주기");
    if (scrollState === PostData.contents.length - 1) {
      setScrollState(0);
    } else {
      setScrollState(scrollState + 1);
    }
  };

  const goToComment = () => {
    SpeechRecognition.stopListening();
    console.log("댓글페이지 이동");
    console.log(window.location.href);
    var url = window.location.href.split("/");
    console.log(url[5]);

    history.push({
      pathname: `/main/p/commentPage/${url[5]}`,
      data: { ...PostData },
    });
  };

  const checking = () => {
    console.log("체크", word[word.length - 1]);
    if (word[word.length - 1] === "다음") {
      showNextImage();
    }
    //  else if (word[word.length - 1] === "이전") {
    //   prevButton();
    // }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  } else {
    SpeechRecognition.startListening({ continuous: true, language: "ko" });
  }

  return (
    <>
      <div className="detail-contents">
        {/* <div className="mobile-headerDiv">
          <div className="mobile-headerDiv icon">
            <IoIosArrowBack onClick={onClickBack} />
          </div>
          <div className="mobile-headerDiv title">사진</div>
        </div> */}
        <div className="mobile-detail-contents-wrapper">
          {" "}
          <div className="mobile-detail-userInfo">
            <Avatar className="mobile-detail-avatar" />
            <span className="mobile-detail-username">{PostData.userName}</span>
          </div>
          <div className="mobile-detail-img">
            {/* <img src={item.img} alt="image" /> */}
            <img className="mobile-detail-img" src={PostData.contents[scrollState].image} />
            <div className="mobile-image-next" onClick={showNextImage}>
              <NavigateNextIcon fontSize="large" />
            </div>
          </div>
          <div className="mobile-detail-things">
            <div className="mobile-detail-like" onClick={isPostLike}>
              {PostData.like ? (
                <FavoriteIcon fontSize="large" />
              ) : (
                <FavoriteBorderOutlinedIcon fontSize="large" />
              )}
            </div>
            <div className="mobile-detail-comment" onClick={goToComment}>
              <ChatBubbleOutlinedIcon fontSize="large" />
            </div>
            <div className="mobile-detail-scrap" onClick={isBookmark}>
              {bookmark ? (
                <BookmarkIcon fontSize="large" />
              ) : (
                <BookmarkBorderOutlinedIcon fontSize="large" />
              )}
            </div>
          </div>
          <div className="mobile-detail-likecnt">
            <p className="mobile-detail-user-likecnt">
              좋아요 {likeNumber == null ? PostData.post.likeCnt : likeNumber}
            </p>
          </div>
          <div className="mobile-detail-bottom">
            <h5 className="mobile-detail-desc-username">{PostData.userName}</h5>
            {PostData.contents.map((item, index) => {
              return <span key={index}> {item.description}</span>;
            })}
          </div>
        </div>
        {/* 큰화면  */}{" "}
        <div className="dt">
          {" "}
          <div className="dt-details-content">
            <div className="dt-details-content2">
              <div className="dt-img-section">
                <img src={PostData.contents[scrollState].image} />
                <div className="dt-image-next" onClick={showNextImage}>
                  <NavigateNextIcon fontSize="large" />
                </div>
              </div>
              <div className="dt-right-section">
                <div className="dt-right-header">
                  <div className="dt-detail-userInfo">
                    <Avatar className="dt-detail-avatar" />
                    <span className="dt-detail-username">{PostData.userName}</span>
                  </div>
                </div>
                <div className="dt-right-content">
                  <div className="dt-right-content-desc">
                    <div className="content-description">
                      {PostData.contents.map((item, index) => {
                        return <span key={index}> {item.description}</span>;
                      })}
                    </div>
                  </div>
                  <div className="dt-right-content-comment"></div>
                </div>
                <div className="dt-right-footer">
                  <div className="dt-right-footer-btn-section">
                    <div className="dt-detail-like" onClick={isPostLike}>
                      {PostData.like ? (
                        <FavoriteIcon fontSize="large" />
                      ) : (
                        <FavoriteBorderOutlinedIcon fontSize="large" />
                      )}
                    </div>
                    <div className="dt-detail-comment" onClick={goToComment}>
                      <ChatBubbleOutlinedIcon fontSize="large" />
                    </div>
                    <div className="dt-detail-scrap" onClick={isBookmark}>
                      {bookmark ? (
                        <BookmarkIcon fontSize="large" />
                      ) : (
                        <BookmarkBorderOutlinedIcon fontSize="large" />
                      )}
                    </div>
                  </div>
                  <div className="dt-right-footer-likecnt">
                    <a href="#">
                      <b>좋아요 {likeNumber == null ? PostData.post.likeCnt : likeNumber}</b>
                    </a>
                  </div>
                  <div className="dt-right-footer-upload-date">2일전</div>
                  <div className="dt-right-footer-upload-comment">
                    <input id="footer-comments" type="text" placeholder="댓글 입력..." />
                    <button id="footer-btn" type="submit">
                      게시
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        링크
        {PostData.tags.map((item, index) => {
          return (
            <div key={index} onClick={(e) => goToShop(e, `${item.url}`)}>
              {item.name}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DetailPage;
