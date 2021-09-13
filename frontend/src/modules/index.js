/* 
한 프로젝트에 여러개의 리듀서가 있을 때는 한개의 리듀서로 함치기 위해
루드 리듀서를 사용
리듀서 하나로 합치기 위해 combineReducers 사용
*/

import { combineReducers } from "redux";
import profileDetail from "./profileDetail";
import userInfo from "./userInfo";
import MainNav from "./MainNav";
import Food from "./Food";
import Post from "./Post";
import PostData from "./PostData";

// redux-persist 새로고침 이슈 해결
import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // 로컬 스토리지에 store 저장
import storageSession from "redux-persist/lib/storage/session"; // 세션에 저장하고 싶을경우

// 새로고침 이슈 해결
const persistConfig = {
  key: "root",
  storage: storageSession,
};

const rootReducer = combineReducers({
  profileDetail,
  userInfo,
  MainNav,
  Food,
  Post,
  PostData,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;
