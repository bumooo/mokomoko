import React from "react";
import FoodTag from "./FoodTag";
import FoodSetting from "./FoodSetting";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setContent } from "../../../modules/Food";
import "../../../css/main/write/Food.css";
import FoodHeader from "./FoodHeader";
// foodHeader에서 images 값 받아서 출력하기
const FoodRecipeText = (props) => {
  const { write } = useSelector(
    (state) => ({
      write: state.Food,
    }),
    shallowEqual
  );
  // dispatch 생성
  const dispatch = useDispatch();

  // 뒤로가기 이벤트
  const goBack = () => {
    // -1
    let newWrite = Object.assign({}, write);
    newWrite.recipeIndex = write.recipeIndex - 1;
    dispatch(setContent(newWrite));
    props.history.goBack();
  };

  return (
    <div className="food-wrapper">
      <div className="food-row">
        <div className="food-col">
          <FoodHeader
            navigation={{ goBack: () => goBack() }}
            next={
              // 상세페이지로 이동하도록 수정 필요
              write.isRecipe
                ? write.recipeIndex + 1 === write.contents.length
                  ? "/main/writeFoodRecipeSubmit"
                  : "/main/writeFoodRecipeText"
                : "/main/writeFoodImageText"
            }
            // 사용자가 지정한대로 이미지 순서 배열 만들기
            makeArr={false}
            // 음식 사진이거나, 레시피 사진의 설명을 모두 적으면 submit= true
            submit={
              write.isRecipe ? (write.recipeIndex + 1 > write.contents.length ? true : false) : true
            }
          ></FoodHeader>
          <div className="food-content">
            <div className="food-top">
              <FoodTag></FoodTag>
            </div>
            <div className="food-setting">
              <FoodSetting></FoodSetting>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodRecipeText;
