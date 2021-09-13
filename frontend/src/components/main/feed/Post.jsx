import { Avatar } from "@material-ui/core";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ChatBubbleOutlinedIcon from "@material-ui/icons/ChatBubbleOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import React from "react";
import "../../../css/main/Post.css";
import testImg from "../../../img/logo-back.png";

const Post = (profilePhoto, image, username, description, timestamp) => {
  return (
    <div className="post">
      <div className="post-content">
        <div className="post-header">
          <Avatar className="post-avatar" src={profilePhoto} />
          <div className="post-info">
            <h3>{username}aaa</h3>
            {/* <p className="upload-date">{new Date(timestamp?.toDate()).toUTCString()}</p> */}
          </div>
        </div>
        <div className="post-image">
          {/* <img src={image} alt="image" /> */}
          <img src={testImg} alt="image" />
        </div>

        <div className="post-things">
          <div className="post-like">
            <FavoriteBorderOutlinedIcon fontSize="large" />
          </div>
          <div className="post-comment">
            <ChatBubbleOutlinedIcon fontSize="large" />
          </div>
          <div className="post-scrap">
            <BookmarkBorderOutlinedIcon fontSize="large" />
          </div>
        </div>
        <div className="likecnt">
          <p className="feed-user-likecnt">좋아요 232,323개</p>
        </div>
        <div className="post-bottom">
          <h5 className="post-desc-username">admin </h5>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
