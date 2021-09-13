import axios from "axios";
import React, { Component, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "../../../css/award/AwardUser.css";

// import 'slick-carousel/slick/slick-theme.css'; 슬라이더 구현시 참고한 사이트
// https://velog.io/@cookncoding/React-slick%EC%97%90-styled-components-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0

const AwardUser = () => {
  const [sliderPlay, setSliderPlay] = useState(false);
  const [sliderPause, setSliderPause] = useState(false);
  const [userList, setUserList] = useState([]);

  const user = useSelector((state) => state.userInfo.user);

  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      url: "http://localhost:8080/api/rank",
      method: "get",
    }).then((res) => {
      console.log(res.data);
      let uList = Object.assign([], userList);
      console.log(uList);
      uList.push(...res.data.users);
      setUserList(uList);
      console.log(uList);
    });
  });

  const playSlider = () => {
    setSliderPlay(true);
    setSliderPause(false);
  };

  const pauseSlider = () => {
    setSliderPlay(false);
    setSliderPause(true);
  };
  const slider = useRef();
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
  };

  const award_user = [
    //9개 가져온다는 가정하에
    {
      id: "test1",
      img: "https://matsudapet.com.br/blog/wp-content/uploads/2019/08/shutterstock_275863976-compressed.jpg",
    },
    {
      id: "test2",
      img: "https://i.pinimg.com/564x/df/59/91/df59919e59912d4be6131ab437412e87.jpg",
    },
    {
      id: "test3",
      img: "https://i.pinimg.com/564x/df/59/91/df59919e59912d4be6131ab437412e87.jpg",
    },
    {
      id: "test4",
      img: "https://i.pinimg.com/564x/df/59/91/df59919e59912d4be6131ab437412e87.jpg",
    },
    {
      id: "test5",
      img: "https://i.pinimg.com/564x/df/59/91/df59919e59912d4be6131ab437412e87.jpg",
    },
    {
      id: "test6",
      img: "https://i.pinimg.com/564x/df/59/91/df59919e59912d4be6131ab437412e87.jpg",
    },
    {
      id: "test7",
      img: "https://i.pinimg.com/564x/df/59/91/df59919e59912d4be6131ab437412e87.jpg",
    },
    {
      id: "test8",
      img: "https://i.pinimg.com/564x/df/59/91/df59919e59912d4be6131ab437412e87.jpg",
    },
    {
      id: "test9",
      img: "https://i.pinimg.com/564x/28/9e/fa/289efa2d92e57cc33d0ef5a3503d4973.jpg",
    },
  ];
  return (
    <div>
      <div className="awardUser-wrapper">
        <div className="awardUser-row">
          <div className="awardUser-col">
            <h3 className="award-user-title">인기 사용자</h3>
            <Slider ref={slider} {...settings}>
              <div className="awardUserItem">
                <div className="award-user-profilepic">
                  <div className="round-user">
                    <img src={award_user[0].img} alt="" />
                  </div>
                  <div className="round-user">
                    <img src={award_user[1].img} alt="" />
                  </div>
                  <div className="round-user">
                    <img src={award_user[2].img} alt="" />
                  </div>
                </div>
                <div className="award-usernick">
                  <div className="award-user-nick">
                    <span>{award_user[0].id}</span>
                  </div>
                  <div className="award-user-nick">
                    <span>{award_user[0].id}</span>
                  </div>
                  <div className="award-user-nick">
                    <span>{award_user[0].id}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="round-user">
                  <img src={award_user[3].img} alt="" />
                </div>
                <div className="round-user">
                  <img src={award_user[4].img} alt="" />
                </div>
                <div className="round-user">
                  <img src={award_user[5].img} alt="" />
                </div>
              </div>
              <div>
                <div className="round-user">
                  <img src={award_user[6].img} alt="" />
                </div>
                <div className="round-user">
                  <img src={award_user[7].img} alt="" />
                </div>
                <div className="round-user">
                  <img src={award_user[8].img} alt="" />
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardUser;
