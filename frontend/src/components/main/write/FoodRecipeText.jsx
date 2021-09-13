import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setContent } from "../../../modules/Food";
import FoodHeader from "./FoodHeader";
import "../../../css/main/write/Food.css";

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
    if (write.recipeIndex !== 0) {
      let newWrite = Object.assign({}, write);
      newWrite.recipeIndex = write.recipeIndex - 1;
      dispatch(setContent(newWrite));
    }
    props.history.goBack();
  };

  // text onchange event
  const onDescChange = (e) => {
    let newWrite = Object.assign({}, write);
    newWrite.contents[write.recipeIndex].desc = e.target.value;
    dispatch(setContent(newWrite));
  };

  return (
    <div className="food-wrapper">
      <div className="food-row">
        <div className="food-col">
          <FoodHeader
            navigation={{ goBack: () => goBack() }}
            next={
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
              <div className="food-top-border">
                {write.contents[write.recipeIndex].isImage ? (
                  <img
                    className="food-top-image"
                    src={write.contents[write.recipeIndex].media}
                  ></img>
                ) : (
                  <video
                    className="food-top-image"
                    src={write.contents[write.recipeIndex].media}
                  ></video>
                )}

                <div className="food-top-info">
                  {write.recipeIndex + 1}/{write.contents.length}장
                </div>
              </div>
              <textarea
                className="food-desc"
                value={write.contents[write.recipeIndex].desc}
                onChange={onDescChange}
                placeholder="내용을 입력해주세요"
              ></textarea>
              {/* <FoodTag></FoodTag> */}
            </div>
            {/* <div className="food-setting">
              <FoodSetting></FoodSetting>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodRecipeText;
