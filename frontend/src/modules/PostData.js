const SET_POSTDATA = "Post/SET_POSTDATA";

//데이터베이스에서 글 목록 불러온 후 setting
export const setPostData = (PostData) => ({
  type: SET_POSTDATA,
  PostData,
});

/*초기 상태 선언 */
const initialState = {
  userImage: "",
  userName: "",
  post: {},
  tags: [],
  content: [],
  contentImage: [],
  like: false,
  comments: [],
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function PostData(state = initialState, action) {
  switch (action.type) {
    case SET_POSTDATA:
      return {
        ...state,
        PostData: action.PostData,
      };

    default:
      return state;
  }
}
