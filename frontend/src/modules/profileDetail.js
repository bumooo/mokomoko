/*
보통 action과 reducer가 서로 다른 파일에 정의되어 있는데
굳이 분리할 필요는 없다.
하나의 파일에 몰아서 해보도록 하겠다 -> 'Ducks 패턴' 으로 불립니다.
*/



/*액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const SET_DETAIL = 'profileDetail/SET_DETAIL';
const GET_DETAIL = 'profileDetail/GET_DETAIL';
const GET_DETAIL_NUMBER = 'profileDetail/GET_DETAIL_NUMBER';

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.


//데이터베이스에서 글 목록 불러온 후 setting
export const setDetail = postList => ({
    type : SET_DETAIL,
    postList
})

export const getDetailNumber = number => ({
    type : GET_DETAIL_NUMBER,
    number,
})

//상세보기 시 여러 글 목록 중 하나 선택 할 시 사용
export const getDetail = (number) => ({
    type : GET_DETAIL,
    number,
    // post,
})


/*초기 상태 선언 */
const initialState = {
    postList : [],
    post : {},
    number : 0,
}


/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function profileDetail(state=initialState, action){
    switch(action.type){
        case SET_DETAIL:
            return{
                ...state,
                postList : action.postList
            };
        case  GET_DETAIL_NUMBER:
            return{
                ...state,
                number : action.number,
            };
        case GET_DETAIL:
            return{
                ...state,
                post : state.postList[state.number],
                // post : state.postList[action.number]
            }

        default:
            return state;
    }
}