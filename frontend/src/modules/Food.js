/*
네비게이션 바 
'Ducks 패턴'
*/

/*액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.

const SET_CONTENT = "Food/SET_CONTENT";
const SET_INITVALUE = "Food/SET_INITVALUE";
const GET_CONTENT = "Food/GET_CONTENT";

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.

//데이터베이스에서 글 목록 불러온 후 setting

// 글 미디어, 내용, 타입 설정
export const setContent = (data) => ({
  type: SET_CONTENT,
  write: data,
});
export const setInitValue = () => ({
  type: SET_INITVALUE,
});
// 글 미디어, 내용, 타입 가져오기
export const getContent = () => ({
  type: GET_CONTENT,
});

/*초기 상태 선언 */
const initialState = {
  // 글 내용 (수정한 부분 images->media, type -> isRecipe / 추가한 부분 isImage)
  temp: [
    {
      file: "",
      media: "", // 미디어 파일(이미지 또는 비디오)(파일 형태 그대로)
      desc: "", // 글 내용(string)
      isImage: "", // 미디어 파일이 비디오인지 이미지인지(boolean)
    },
  ],
  contents: [
    {
      media: "", // 미디어 파일(이미지 또는 비디오)(파일 형태 그대로)
      desc: "", // 글 내용(string)
      isImage: "", // 미디어 파일이 비디오인지 이미지인지(boolean)
    },
  ],
  // 좋아요 댓글 표시할 것인지
  setting: {
    like: true, // 좋아요 표시할 것인지(boolean)
    comment: true, // 댓글 표시할 것인지(boolean)
  },
  // 태그
  tag: [
    // {
    //   title: "", // 태그 제목 (string)
    //   url: "", // 태그 url (string)
    // },
  ],
  // 음식 사진인지 레시피인지 구분(type이 겹쳐서 수정했습니다)
  isRecipe: "", // boolean
  // 유저 이메일
  email: "", // boolean

  // DB에는 안들어가지만 필요한 state
  nowImage: "", // Number, 현재 사용자가 선택한 이미지 저장
  imgArr: [], // 사용자가 선택한 이미지 순서 저장
  recipeIndex: 0, // 레시피 작성 인덱스
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function Food(state = initialState, action) {
  switch (action.type) {
    case SET_CONTENT:
      return {
        ...state,
        ...action.write,
      };
    case SET_INITVALUE:
      return {
        ...state,
        temp: [
          {
            file: "",
            media: "", // 미디어 파일(이미지 또는 비디오)(파일 형태 그대로)
            desc: "", // 글 내용(string)
            isImage: "", // 미디어 파일이 비디오인지 이미지인지(boolean)
          },
        ],
        contents: [
          {
            media: "", // 미디어 파일(이미지 또는 비디오)(파일 형태 그대로)
            desc: "", // 글 내용(string)
            isImage: "", // 미디어 파일이 비디오인지 이미지인지(boolean)
          },
        ],
        // 좋아요 댓글 표시할 것인지
        setting: {
          like: true, // 좋아요 표시할 것인지(boolean)
          comment: true, // 댓글 표시할 것인지(boolean)
        },
        // 태그
        tag: [
          // {
          //   title: "", // 태그 제목 (string)
          //   url: "", // 태그 url (string)
          // },
        ],
        // 음식 사진인지 레시피인지 구분(type이 겹쳐서 수정했습니다)
        isRecipe: "", // boolean
        // 유저 이메일
        email: "", // boolean

        // DB에는 안들어가지만 필요한 state
        nowImage: "", // Number, 현재 사용자가 선택한 이미지 저장
        imgArr: [], // 사용자가 선택한 이미지 순서 저장
        recipeIndex: 0, // 레시피 작성 인덱스
      };
    case GET_CONTENT:
      return state;

    default:
      return state;
  }
}
