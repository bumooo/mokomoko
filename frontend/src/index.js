import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FontAwesome";
import { createStore } from "redux";
import rootReducer from "./modules";

//slider 디자인 사용하기 위해 import
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension"; // 리덕스 개발자 도구

// 새로고침에도 redux 유지할 수 있는 redux-persist 적용
import persistedReducer from "./modules";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";
axios.defaults.withCredentials = true;

//composeWithDevTools 사용 시 에러 나길래 아래 코드로 수정하였습니다.
// const store = createStore(rootReducer,composeWithDevTools, window.__REDUX_DEVTOOLS_EXTENSION__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION__()); //스토어 만들기

const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
); //스토어 만들기
console.log(store.getState());

const persistor = persistStore(store); // 새로고침 이슈 해결

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* <BrowserRouter> */}
        <App />
        {/* </BrowserRouter> */}
      </PersistGate>
    </Provider>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function to
// log results (for example: reportWebVitals(console.log)) or send to an
// analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
