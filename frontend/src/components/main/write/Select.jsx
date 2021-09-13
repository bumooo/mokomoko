import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIndex } from "../../../modules/MainNav";
import { Link } from "react-router-dom";
import "../../../css/main/write/Select.css";
import { setContent, setInitValue } from "../../../modules/Food";
import Cheader from "../../header/Cheader";

// Select창이 뜨면 세션에 존재하는 write data 초기화
const Select = () => {
  const { activeNav } = useSelector((state) => ({
    activeNav: state.activeNav,
  }));

  // 글을 쓰기위한 write 객체 가져오기
  const { write } = useSelector((state) => ({
    write: state.Food,
  }));

  // dispatch 생성
  const dispatch = useDispatch();

  const onSetIndex = (activeNav) => dispatch(setIndex(activeNav));
  // 초기화
  useEffect(() => {
    onSetIndex(3);
    dispatch(setInitValue());
  }, [dispatch]);

  // 음식인지 레시피인지 받아서 state 변경
  const onClickIsRecipe = (data) => {
    let newWrite = Object.assign({}, write);
    newWrite.isRecipe = data;
    dispatch(setContent(newWrite));
  };

  return (
    <div className="select-wrapper">
      <div className="select-row">
        <div className="select-col">
          {/* <header className="select-header">피드 작성</header> */}
          <Cheader title="글 작성" />
          <div className="select-content">
            <div className="select-btn">
              <Link
                to="/main/writeFood"
                className="select-link"
                onClick={() => onClickIsRecipe(false)}
              >
                <button>음식 피드 작성</button>
              </Link>
            </div>
            <div className="select-btn">
              <Link
                to="/main/writeFood"
                className="select-link"
                onClick={() => onClickIsRecipe(true)}
              >
                <button>레시피 피드 작성</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Select;
