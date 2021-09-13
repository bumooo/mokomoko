/*
네비게이션 바 
'Ducks 패턴'
*/

/*액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.

const SET_NAVINDEX = "MainNav/SET_INDEX";
const GET_NAVINDEX = "MainNav/GET_INDEX";
/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.

//데이터베이스에서 글 목록 불러온 후 setting
export const setIndex = (activeNav) => ({
  type: SET_NAVINDEX,
  activeNav,
});

export const getIndex = () => ({
  type: GET_NAVINDEX,
});

/*초기 상태 선언 */
const initialState = {
  activeNav: 1,
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function MainNav(state = initialState, action) {
  switch (action.type) {
    case SET_NAVINDEX:
      return {
        ...state,
        activeNav: action.activeNav,
      };
    case GET_NAVINDEX:
      return state.activeNav;

    default:
      return state;
  }
}
