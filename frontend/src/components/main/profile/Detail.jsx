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
import { useHistory } from "react-router-dom";

const Detail = (props) => {
  const history = useHistory();

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  var word = transcript.split(" ");

  const { user, userImage, userName, post, tags, content, contentImage, like, comments } =
    useSelector((state) => ({
      user: state.userInfo.user,
      userImage: state.Post.userImage,
      userName: state.Post.userName,
      post: state.Post.post,
      tags: state.Post.tags,
      content: state.Post.content,
      contentImage: state.Post.contentImage,
      like: state.Post.like,
      comments: state.Post.comments,
    }));

  const [likeNumber, setLikeNumber] = useState(post.likeCnt);
  useEffect(() => {
    // checking();
    return () => {
      checking();
    };
  }, [transcript, likeNumber, post]);

  const dispatch = useDispatch();
  const onSetLike = (like) => dispatch(setLike(like));

  const [bookmark, setBookmark] = useState(false);
  const [scrollState, setScrollState] = useState(Number(0));

  const isPostLike = () => {
    console.log("좋아요");

    if (like == false) {
      onSetLike(true);

      axios({
        method: "post",
        url: "http://localhost:8080/api/likes",
        data: {
          userid: user.id,
          postid: post.id,
        },
      })
        .then((response) => {
          setLikeNumber(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      onSetLike(false);

      axios({
        method: "delete",
        url: "http://localhost:8080/api/likes",
        data: {
          userid: user.id,
          postid: post.id,
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
    if (scrollState === contentImage.length - 1) {
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

    history.push(`/main/p/comment/${url[5]}`);
  };

  const goToUserPage = () =>{
      history.push("/main/profile");
  }

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
          <div className="mobile-detail-userInfo" onClick={goToUserPage}>
            <Avatar className="mobile-detail-avatar" />
            <span className="mobile-detail-username">{userName}</span>
          </div>
          <div className="mobile-detail-img">
            {/* <img src={item.img} alt="image" /> */}
            <img className="mobile-detail-img" src={contentImage[scrollState]} />
            <div className="mobile-image-next" onClick={showNextImage}>
              <NavigateNextIcon fontSize="large" />
            </div>
          </div>
          <div className="mobile-detail-things">
            <div className="mobile-detail-like" onClick={isPostLike}>
              {like ? (
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
              좋아요 {likeNumber == null ? post.likeCnt : likeNumber}
            </p>
          </div>
          <div className="mobile-detail-bottom">
            <h5 className="mobile-detail-desc-username">{userName}</h5>
            {content.map((item, index) => {
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
                <img src={contentImage[scrollState]} />
                <div className="dt-image-next" onClick={showNextImage}>
                  <NavigateNextIcon fontSize="large" />
                </div>
              </div>
              <div className="dt-right-section">
                <div className="dt-right-header">
                  <div className="dt-detail-userInfo" onClick={goToUserPage}>
                    <Avatar className="dt-detail-avatar" />
                    <span className="dt-detail-username">{userName}</span>
                  </div>
                </div>
                <div className="dt-right-content">
                  <div className="dt-right-content-desc">
                    <div className="content-description">
                      {content.map((item, index) => {
                        return <span key={index}> {item.description}</span>;
                      })}
                    </div>
                  </div>
                  <div className="dt-right-content-comment"></div>
                </div>
                <div className="dt-right-footer">
                  <div className="dt-right-footer-btn-section">
                    <div className="dt-detail-like" onClick={isPostLike}>
                      {like ? (
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
                      <b>좋아요 {likeNumber == null ? post.likeCnt : likeNumber}</b>
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
        {tags.map((item, index) => {
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

export default Detail;
