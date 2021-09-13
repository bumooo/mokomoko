import React from "react";
import Switch from "react-switch";
import { useSelector, useDispatch } from "react-redux";
import { setContent } from "../../../modules/Food";
const FoodSetting = (props) => {
  const { write } = useSelector((state) => ({
    write: state.Food,
  }));
  const dispatch = useDispatch();
  // like 이벤트
  const onLikeChange = () => {
    let newWrite = Object.assign({}, write);
    newWrite.setting.like = !newWrite.setting.like;
    dispatch(setContent(newWrite));
  };
  // comment 이벤트
  const onCommentChange = () => {
    let newWrite = Object.assign({}, write);
    newWrite.setting.comment = !newWrite.setting.comment;
    dispatch(setContent(newWrite));
  };
  return (
    <div>
      <div className="food-setting-header">설정</div>
      <div className="food-setting-body">
        <div className="food-setting-title">좋아요 표시하기</div>
        <div className="food-setting-toggle">
          <Switch onChange={onLikeChange} checked={write.setting.like} />
        </div>
      </div>
      <div className="food-setting-body">
        <div className="food-setting-title">댓글 표시하기</div>
        <div className="food-setting-toggle">
          <Switch onChange={onCommentChange} checked={write.setting.comment} />
        </div>
      </div>
    </div>
  );
};

export default FoodSetting;
