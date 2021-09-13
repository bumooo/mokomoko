import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../css/main/Comment.css";
import ContentHeader from "../header/ContentHeader";
import { Avatar } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import axios from "axios";
import { setPostData } from "../../modules/PostData";

const CommentPage = () => {
  // 출력할 데이터
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({
    user: state.userInfo.user,
  }));
  const { PostData } = useSelector((state) => state.PostData);
  const [writeComment, setWriteComment] = useState(null);

  const onChangeWriteComment = (e) => {
    setWriteComment(e.target.value);
  };

  const updateInfo = () => {
    //화면 정보 갱신하기 위해 사용
    var url = window.location.href.split("/");
    var postid = url[6];
    axios({
      method: "get",
      url: "http://localhost:8080/api/post/" + user.id + "/" + postid,
    })
      .then((response) => {
        console.log(response);
        dispatch(setPostData(response.data.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const submitComment = () => {
    //댓글 작성 함수
    axios({
      method: "post",
      url: "http://localhost:8080/api/comment",
      data: {
        userid: user.id,
        postid: PostData.post.id,
        description: writeComment,
      },
    })
      .then((response) => {
        updateInfo();
      })
      .catch((error) => {
        console.log(error);
      });
    // .then((response) => {
    //   updateInfo();
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

    setWriteComment("");
  };

  const modifyComments = () => {
    console.log("수정");
  };

  const childComment = () => {
    console.log("답글 달기");
  };

  const deleteComments = (e, commentid) => {
    e.preventDefault();
    var isDelete = window.confirm("삭제하시겠습니까?");

    if (isDelete == true) {
      axios({
        method: "delete",
        url: "http://localhost:8080/api/comment/" + commentid,
      })
        .then((response) => {
          updateInfo();
        })
        .catch((error) => {
          console.error(error);
        });
      // .then((response) => {
      //   updateInfo();
      // })
      // .catch((error) => {
      //   console.error(error);
      // });
    }
  };

  useEffect(() => {
    return () => {};
  }, [PostData.comments]);

  return (
    <div className="comments-wrapper">
      <ContentHeader title="댓글" />
      <div className="type-comment">
        {/* body-comment는 댓글 페이지의 헤더부분 제외한 전반적인 영역 담당 */}
        <div className="comment-type-container">
          {/* container1, 2 는 댓글 작성자의 입력폼 */}
          <div className="comment-type-container2">
            <div className="comment-avatar-container">
              <Avatar id="comment-avatar" className="post-avatar" src={PostData.userImage} />
            </div>
            <textarea
              type="textarea"
              id="comment-ipt"
              name="commenttext"
              placeholder="댓글 달기..."
              value={writeComment}
              onChange={onChangeWriteComment}
            ></textarea>
            <button type="submit" className="comment-btn" onClick={submitComment}>
              <CheckCircleIcon id="submit-icon" />
            </button>
            {/* </div> */}
          </div>
        </div>
      </div>

      <div className="user-comment">
        <ul className="comment-list">
          {PostData.comments &&
            PostData.comments.map((item, index) => {
              return (
                <li className="comment-list-detail" key={index}>
                  <div className="usr-comment-userInfo">
                    <Avatar id="usr-comment-avatar" className="post-avatar" src={item.image} />
                    <p className="usr-comment-username">{item.name}</p>
                    <span className="usr-comment-desc">{item.description}</span>
                    <input type="text" value={item.description}></input>
                  </div>
                  <div className="usr-comment-like">
                    <FavoriteBorderIcon id="comment-like" />
                  </div>
                  <div className="usr-comment-footer">
                    <div className="comment-likecnt-cont">
                      <a href="#" id="comment-likecnt">
                        <p id="comment-likecnt-desc">좋아요 30개</p>
                      </a>
                    </div>
                    <div className="comment-footer-recomment-cont">
                      <div className="comment-footer-re">
                        <button id="recomment-btn" onClick={childComment}>
                          <p id="recomment">답글 달기</p>
                        </button>
                        {user.nickname == item.name ? (
                          <button id="modify-btn" onClick={modifyComments}>
                            <p id="modify">수정</p>
                          </button>
                        ) : (
                          ""
                        )}
                        {user.nickname == item.name ? (
                          <button id="delete-btn" onClick={(e) => deleteComments(e, `${item.id}`)}>
                            <p id="delete">삭제</p>
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default CommentPage;
