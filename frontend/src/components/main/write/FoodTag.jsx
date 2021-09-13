import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../css/main/write/Food.css";
import FoodModal from "./FoodModal";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setContent } from "../../../modules/Food";
const FoodTag = () => {
  const { write } = useSelector(
    (state) => ({
      write: state.Food,
    }),
    shallowEqual
  );
  // dispatch 생성
  const dispatch = useDispatch();
  // FoodModal로부터 title과 url을 받아서 tag로 전달
  const onTagChange = (title, url) => {
    let newWrite = Object.assign([], write);
    newWrite.tag.push({ title: title, url: url });
    dispatch(setContent(newWrite));
  };
  // 태그를 지우는 메서드
  const onTagRemove = (value) => {
    let newWrite = Object.assign([], write);
    newWrite.tag.splice(value, 1);
    dispatch(setContent(newWrite));
  };
  return (
    <div className="food-tag-wrap">
      <ul className="food-tag-ul">
        {write.tag.map((item, index) => (
          <li className="food-tag" key={index}>
            <button type="button" className="food-tag-btn">
              {/* url 주소가 있는 것만 링크로 연결 */}
              {item.url !== "" ? (
                <a href={/*"https://" + */item.url} target="_blank" rel="noopener noreferrer">
                  {"\u00A0"}
                  {"\u00A0"}
                  {"\u00A0"}
                  {item.title}
                  {"\u00A0"}
                  {"\u00A0"}
                </a>
              ) : (
                <a>
                  {"\u00A0"}
                  {"\u00A0"}
                  {"\u00A0"}
                  {item.title}
                  {"\u00A0"}
                  {"\u00A0"}
                </a>
              )}
              <FontAwesomeIcon
                icon="minus"
                className="food-tag-remove"
                onClick={() => onTagRemove(index)}
              ></FontAwesomeIcon>
              {"\u00A0"}
            </button>
          </li>
        ))}
      </ul>
      {/* 피드는 최대 5개 */}
      {write.tag.length < 5 ? <FoodModal onTagChange={onTagChange}></FoodModal> : ""}
    </div>
  );
};

export default FoodTag;
