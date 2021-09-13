import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FoodHeader from "./FoodHeader";
import "../../../css/main/write/Food.css";
import { useSelector, useDispatch } from "react-redux";
import { setContent } from "../../../modules/Food";

// 동영상 렉 이슈 있음(8/10)
// food에서 isRecipe 값에 따라 header로 넘겨주는 next값을 다르게 준다.
// 새로
const Food = ({ history }) => {
  const { write } = useSelector((state) => ({
    write: state.Food,
  }));

  // dispatch 생성
  const dispatch = useDispatch();
  const handleImageUpload = (e) => {
    const fileArr = e.target.files;
    let file;
    let fileLength = fileArr.length > 12 ? 12 : fileArr.length;
    // 이미지를 저장할 임시 객체
    let newWrite = Object.assign({}, write);
    // contents 초기화
    newWrite.temp = [];
    newWrite.imgArr = [];
    newWrite.nowImage = 0;
    // 현재 선택된 이미지 저장
    newWrite.nowImage = fileLength - 1;
    let check = false;
    for (let i = 0; i < fileLength; i++) {
      // 파일 하나 받아오기
      file = fileArr[i];
      if (file.size > 1024 * 1024 * 50) {
        // 용량 초과시 경고후 해당 파일의 용량도 보여줌
        alert(
          "50MB 이하 파일만 등록할 수 있습니다.\n\n" +
            (i + 1) +
            "번째 파일 용량 : " +
            Math.round((file.size / 1024 / 1024) * 100) / 100 +
            "MB"
        );
        check = true;
      }
    }
    // 파일 용량이 50MB 이상이면 종료
    if (check) return;
    for (let i = 0; i < fileLength; i++) {
      // 파일 하나 받아오기
      file = fileArr[i];
      // 각 파일에 순서 부여
      newWrite.imgArr[i] = i;
      // i번째 객체 삽입
      newWrite.temp.push({
        file: file,
        media: "",
        desc: "",
        isImage: "",
      });
      // 해당 파일이 이미지인지 비디오인지 저장
      newWrite.temp[i].isImage = file.type.includes("image") ? true : false;
      let reader = new FileReader();
      reader.onload = () => {
        newWrite.temp[i].media = reader.result;
        newWrite.contents[i] = newWrite.temp[i];
        newWrite.contents[i].desc = "";
        dispatch(setContent(newWrite));
      };
      reader.readAsDataURL(file);
    }
  };
  // 3가지 기능 수행
  // 사진 클릭하면 메인화면 변환, 사진 두번 클릭하면 이미지 배열에서 삭제, 이미지 배열에 없는 사진 클릭하면 배열에 넣기
  const handleImageClick = (idx) => {
    // 이미지를 저장할 임시 객체
    let newWrite = Object.assign({}, write);
    const idxValue = newWrite.imgArr[idx];

    let tempLength = 0;
    for (let i = 0; i < newWrite.imgArr.length; i++) {
      if (newWrite.imgArr[i] !== null) {
        tempLength++;
      }
    }

    // 현재 배열에 없으면 추가
    if (idxValue === null) {
      newWrite.imgArr[idx] = tempLength; // 배열의 마지막 순서로 추가
      newWrite.nowImage = idx;
    } else {
      // 현재 배열에 있으면
      // 현재 선택되지 않았다면 선택
      if (newWrite.nowImage !== idx) {
        newWrite.nowImage = idx;
      } else {
        newWrite.nowImage = 0;
        // 현재 이미지가 선택되어있고 한번 더 누를 경우에 삭제
        for (let i = 0; i < newWrite.imgArr.length; i++) {
          if (newWrite.imgArr[i] > idxValue) {
            // 현재 삭제한 순서보다 큰 순서를 모두 1씩 감소
            newWrite.imgArr[i]--;
          }
          if (newWrite.imgArr[i] !== idxValue && newWrite.imgArr[i] !== null) {
            // 순서에 포함되어있는 가장 큰 인덱스 번호 찾기
            newWrite.nowImage = Math.max(newWrite.nowImage, i);
          }
        }
        newWrite.imgArr[idx] = null;
      }
    }
    let temp = [];
    for (let i = 0; i < newWrite.temp.length; i++) {
      for (let j = 0; j < newWrite.temp.length; j++) {
        if (newWrite.imgArr[j] === i) {
          temp.push(newWrite.temp[j]);
          break;
        }
      }
    }
    newWrite.contents = temp;
    dispatch(setContent(newWrite));
  };

  // 똑같은 사진을 넣었을 때 onChange를 적용하기위해 input의 값을 초기화
  const handleUploadClick = (e) => {
    e.target.value = null;
  };
  const goBack = () => {
    history.goBack();
  };
  return (
    <div className="food-wrapper">
      <div className="food-row">
        <div className="food-col">
          <FoodHeader
            navigation={{ goBack: () => goBack() }}
            next={
              write.isRecipe
                ? write.recipeIndex === write.contents.length
                  ? "/main/writeFoodRecipeSubmit"
                  : "/main/writeFoodRecipeText"
                : "/main/writeFoodImageText"
            }
            // 사용자가 지정한대로 이미지 순서 배열 만들기
            first={true}
            // 음식 사진이거나, 레시피 사진의 설명을 모두 적으면 submit= true
            submit={
              write.isRecipe ? (write.recipeIndex + 1 > write.contents.length ? true : false) : true
            }
          ></FoodHeader>
          <div className="food-content">
            <div className="food-image-border">
              {write.nowImage !== "" ? (
                write.temp[write.nowImage].isImage ? (
                  <img className="food-image" src={write.temp[write.nowImage].media}></img>
                ) : (
                  <video
                    className="food-video"
                    src={write.temp[write.nowImage].media}
                    controls
                  ></video>
                )
              ) : (
                ""
              )}
            </div>
            <div className="food-filebox">
              <label htmlFor="food-file">
                <FontAwesomeIcon icon="images" />
              </label>
              <input
                type="file"
                id="food-file"
                multiple
                accept="image/jpg,image/png,image/jpeg,image/gif,video/mp4"
                onChange={handleImageUpload}
                onClick={handleUploadClick}
              />
            </div>
            {write.nowImage !== ""
              ? write.temp.map((content, idx) => (
                  <div className="food-border" onClick={() => handleImageClick(idx)} key={idx}>
                    {content.isImage ? (
                      <img
                        className={
                          idx === write.nowImage ? "food-images food-selected" : "food-images"
                        }
                        src={content.media}
                      ></img>
                    ) : (
                      <video
                        className={
                          idx === write.nowImage ? "food-images food-selected" : "food-images"
                        }
                        src={content.media}
                      ></video>
                    )}

                    <div
                      className={write.imgArr[idx] !== null ? "food-item-selected" : "food-item"}
                    >
                      {write.imgArr[idx] == null ? null : write.imgArr[idx] + 1}
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Food;
