import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import "../../css/main/Comment.css";
import ContentHeader from "../header/ContentHeader";
import {Avatar} from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import axios from "axios";
import {
    setContent,
    setContentImage,
    setPost,
    setTags,
    setUserImage,
    setUserName,
    setLike,
    setComments
} from "../../modules/Post";

const Comment = () => {
    const {
        user,
        userImage,
        userName,
        post,
        tags,
        content,
        contentImage,
        like,
        comments
    } = useSelector((state) => ({
        user: state.userInfo.user,
        userImage: state.Post.userImage,
        userName: state.Post.userName,
        post: state.Post.post,
        tags: state.Post.tags,
        content: state.Post.content,
        contentImage: state.Post.contentImage,
        like: state.Post.like,
        comments: state.Post.comments
    }));

    const dispatch = useDispatch();

    const onSetUserImage = (userImage) => dispatch(setUserImage(userImage));
    const onSetUserName = (userName) => dispatch(setUserName(userName));
    const onSetPost = (post) => dispatch(setPost(post));
    const onSetTags = (tags) => dispatch(setTags(tags));
    const onSetContent = (content) => dispatch(setContent(content));
    const onSetContentImage = (contentImage) => dispatch(
        setContentImage(contentImage)
    );
    const onSetLike = (like) => dispatch(setLike(like));
    const onSetComments = (comments) => dispatch(setComments(comments));

    const [writeComment, setWriteComment] = useState(null); //댓글 저장
    const [isModify, setIsModify] = useState(false); //수정 인지 아닌지 확인하기 위해
    const [whichComment, setWhichComment] = useState(null); //수정하는 댓글 몇번 째 댓글인지 확인하기 위해 사용
    const [modifyComment, setModifyComment] = useState(null); //수정한 내용 저장
    const [isRecomment, setIsRecomment] = useState(false);
    const [whichRecomment, setWhichRecomment] = useState(null); //대댓글 몇번 째 인지
    const [recomment, setRecomment] = useState("");

    const onChangeWriteComment = (e) => {
        setWriteComment(e.target.value);
    };

    const updateInfo = () => {
        //화면 정보 갱신하기 위해 사용
        var url = window
            .location
            .href
            .split("/");
        var postid = url[6];
        axios({
            method: "get",
            url: "http://localhost:8080/api/post/" + user.id + "/" + postid
        })
            .then((response) => {
                onSetUserImage(response.data.data.userImage);
                onSetUserName(response.data.data.userName);
                onSetPost(response.data.data.post);
                onSetTags(response.data.data.tags);
                onSetContent(response.data.data.contents);
                onSetLike(response.data.data.like);
                onSetComments(response.data.data.comments);

                var contentImage = new Array();
                var content_box = response.data.data.contents;

                for (var i = 0; i < content_box.length; i++) {
                    contentImage.push(content_box[i].image);
                }

                //이미지 여러장 처리 위해 사용
                onSetContentImage(contentImage);
            })
            .catch((error) => {
                console.error(error);
            })
    };

    const submitComment = () => {
        //댓글 작성 함수
        axios({
            method: "post",
            url: "http://localhost:8080/api/comment",
            data: {
                userid: user.id,
                postid: post.id,
                description: writeComment,
            }
        })
            .then((response) => {
                updateInfo();
            })
            .catch((error) => {
                console.log(error);
            })

        setWriteComment("");
    };

    const showModify = (e, description, index) => {
        console.log("수정");
        setModifyComment(description);
        setIsModify(!isModify);
        setWhichComment(index);
    };

    const onChangeModifyComment = (e) => {
        setModifyComment(e.target.value);
    }

    const modifyComments = (item) => {
        //작성한 댓글 서버에 보내기 userid,postid,description
        axios({
            method: "put",
            url: "http://localhost:8080/api/comment",
            data: {
              "id": item.id,
              "description": modifyComment,
            }
        })
            .then((response) => {
                console.log("성공", response);
                updateInfo();
            })
            .catch((error) => {
                console.error(error);
            })

        }

    const showChildComment = (e, index) => {
        setWhichRecomment(index);
        setIsRecomment(!isRecomment);
        setRecomment("");
    }

    const onChangeRecomment = (e) => {
        setRecomment(e.target.value);
    }

    const submitRecomment = (e,index) => {
        console.log("대댓글 전송");
        console.log(index);
        console.log(post.id);

        axios({
          method:'post',
          url:'http://localhost:8080/api/child',
          data:{
            "id": user.id,
            "commentid":index,
            "postid": post.id,
            "description": recomment,
          }
        }).then((response) =>{
          console.log("답글 성공",response);
        })
        .catch((error) =>{
          console.error("답글 에러",error);
        })
    }

    const deleteComments = (e, commentid) => {
        e.preventDefault();
        var isDelete = window.confirm("삭제하시겠습니까?");

        if (isDelete == true) {
            axios({
                method: "delete",
                url: "http://localhost:8080/api/comment/" + commentid
            })
                .then((response) => {
                    updateInfo();
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    };

    useEffect(() => {
        return() => {};
    }, [comments,modifyComment]);

    return (
        <div className="comments-wrapper">
            <ContentHeader title="댓글"/>
            <div className="type-comment">
                {/* body-comment는 댓글 페이지의 헤더부분 제외한 전반적인 영역 담당 */}
                <div className="comment-type-container">
                    {/* container1, 2 는 댓글 작성자의 입력폼 */}
                    <div className="comment-type-container2">
                        <div className="comment-avatar-container">
                            <Avatar id="comment-avatar" className="post-avatar" src={userImage}/>
                        </div>
                        <textarea
                            type="textarea"
                            id="comment-ipt"
                            name="commenttext"
                            placeholder="댓글 달기..."
                            value={writeComment}
                            onChange={onChangeWriteComment}></textarea>
                        <button type="submit" className="comment-btn" onClick={submitComment}>
                            <CheckCircleIcon id="submit-icon"/>
                        </button>
                        {/* </div> */}
                    </div>
                </div>
            </div>

            <div className="user-comment">
                <ul className="comment-list">
                    {
                        comments && comments.map((item, index) => {
                            return (
                                <li className="comment-list-detail" key={index}>
                                    <div className="usr-comment-userInfo">
                                        <Avatar id="usr-comment-avatar" className="post-avatar" src={item.image}/>
                                        <p className="usr-comment-username">{item.name}</p>
                                        {
                                            isModify && (whichComment == index)
                                                ? <input
                                                        className="usr-comment-desc"
                                                        type="text"
                                                        value={modifyComment}
                                                        onChange={onChangeModifyComment}></input>
                                                : <span className="usr-comment-desc">{item.description}</span>
                                        }
                                        {
                                            isModify && (whichComment == index)
                                                ? <button onClick={(e)=>modifyComments(e,`${item}`)}>수정</button>
                                                : ""
                                        }

                                    </div>
                                    <div className="usr-comment-like">
                                        <FavoriteBorderIcon id="comment-like"/>
                                    </div>
                                    <div className="usr-comment-footer">
                                        <div className="comment-likecnt-cont">
                                            <a href="#" id="comment-likecnt">
                                                <p id="comment-likecnt-desc">좋아요 30개</p>
                                            </a>
                                        </div>
                                        <div className="comment-footer-recomment-cont">
                                            <div className="comment-footer-re">
                                                <button id="recomment-btn" onClick={(e) => showChildComment(e, `${index}`)}>
                                                    <p id="recomment">답글 달기</p>
                                                </button>
                                                {
                                                    user.nickname == item.name
                                                        ? (
                                                            <button
                                                                id="modify-btn"
                                                                onClick={(e) => showModify(e, `${item.description}`, `${index}`)}>
                                                                <p id="modify">수정</p>
                                                            </button>
                                                        )
                                                        : ("")
                                                }
                                                {
                                                    user.nickname == item.name
                                                        ? (
                                                            <button id="delete-btn" onClick={(e) => deleteComments(e, `${item.id}`)}>
                                                                <p id="delete">삭제</p>
                                                            </button>
                                                        )
                                                        : ("")
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    {/*답글 띄우기 */}
                                    {
                                        isRecomment && (whichRecomment == index)
                                            ?
                        
                                                                                    
                                            
                                            <div className="usr-recomment">
                                                    <div className="user-recomment-arrow">
                                                        <SubdirectoryArrowRightIcon fontSize="large"/>
                                                    </div>
                                                    <div className="user-recomment-input">
                                                        <textarea
                                                            type="textarea"
                                                            id="comment-ipt"
                                                            name="commenttext"
                                                            placeholder="대댓글 달기"
                                                            value={recomment}
                                                            onChange={onChangeRecomment}></textarea>
                                                            <button type="submit" className="comment-btn" onClick={(e) =>{submitRecomment(e,`${item.index}`)}}>
                                                            <CheckCircleIcon/>
                                                        </button>
                                                    </div>
                                                </div>
                                            : ""
                                    }
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default Comment;
