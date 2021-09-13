import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setContent, setInitValue } from "../../../modules/Food";
import axios from "axios";
// 헤더 컴포넌트
const FoodHeader = (props) => {
  const { navigation } = props;
  const { next } = props;
  const { write } = useSelector(
    (state) => ({
      write: state.Food,
    }),
    shallowEqual
  );
  //userSelector로 리덕스 스토어의 상태 조회하기
  const { user } = useSelector((state) => ({
    user: state.userInfo.user,
  }));
  const dispatch = useDispatch();
  // recipeIndex 더하기
  const count = (e) => {
    if (props.first) {
      // 사진을 안넣었으면 다음으로 못가게 막는다.
      if (write.contents[0].media === "") {
        alert("사진이나 영상을 넣어주세요");
        e.preventDefault();
      }
      return;
    }
    let newWrite = Object.assign({}, write);
    newWrite.recipeIndex = write.recipeIndex + 1;
    dispatch(setContent(newWrite));
  };
  // 백엔드와 통신
  const submit = (e) => {
    if (props.first) {
      // 사진을 안넣었으면 다음으로 못가게 막는다.
      if (write.contents.length === 0 || write.contents[0].media === "") {
        alert("사진이나 영상을 넣어주세요");
        e.preventDefault();
      }
      return;
    }
    // formData로 변환
    const formData = new FormData();
    write.contents.forEach((element, i) => {
      formData.append("contents[" + i + "].media", element.file);
      formData.append("contents[" + i + "].desc", element.desc);
      formData.append("contents[" + i + "].is", element.isImage);
    });
    write.tag.forEach((element, i) => {
      formData.append("tags[" + i + "].title", element.title);
      formData.append("tags[" + i + "].url", element.url);
    });
    formData.append("type", write.isRecipe);
    formData.append("comment", write.setting.comment);
    formData.append("like", write.setting.like);
    // 유저이메일 넣기
    formData.append("email", user.email);

    // 초기화
    dispatch(setInitValue());
    //axios 통신 후 상세페이지로 이동하게 수정하기!
    axios({
      method: "post",
      url: "https://i5d104.p.ssafy.io/api/post",
      data: formData,
      contentType: false,
      processData: false,
      enctype: "multipart/form-data",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
    props.history.push("/main/feed");
    e.preventDefault();
  };
  return (
    <header className="food-header">
      <span className="food-icon">
        <div className="food-link" onClick={navigation.goBack}>
          <FontAwesomeIcon icon="chevron-left" />
        </div>
      </span>
      <span className="food-title">음식 피드 작성</span>
      <Link
        to={{
          pathname: next,
        }}
        className="food-link"
      >
        <span className="food-finish" onClick={props.submit ? submit : count}>
          다음
        </span>
      </Link>
    </header>
  );
};

export default withRouter(FoodHeader);
