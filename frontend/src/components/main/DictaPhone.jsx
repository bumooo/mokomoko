import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import "../../css/DictaPhone.css";

const Dictaphone = () => {
  useEffect(() => {
    // checking();
    return () => {
      checking();
    };
  }, [transcript]);
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [imageList, setImageList] = useState([
    "https://i.pinimg.com/564x/c3/21/f6/c321f62ac98c92ca483e5172ec43eb3f.jpg",
    "https://i.pinimg.com/564x/08/07/de/0807dee6ae87715dd00c6881b5f72325.jpg",
    "https://i.pinimg.com/564x/83/83/35/838335ba98c405b799422a24b28b45e8.jpg",
    "https://i.pinimg.com/564x/49/ad/54/49ad541a46127857f13ac041d2b3695c.jpg",
  ]);

  const [scrollState, setScrollState] = useState(Number(0));
  var word = transcript.split(" ");

  console.log(transcript);
  const prevButton = () => {
    if (scrollState === 0) {
      setScrollState(imageList.length - 1);
    } else {
      setScrollState(scrollState - 1);
    }
  };

  const nextButton = () => {
    if (scrollState === imageList.length - 1) {
      setScrollState(0);
    } else {
      setScrollState(scrollState + 1);
    }
  };

  const checking = () => {
    console.log("체크", word[word.length - 1]);
    if (word[word.length - 1] === "다음") {
      nextButton();
    } else if (word[word.length - 1] === "이전") {
      prevButton();
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={SpeechRecognition.startListening({ continuous: true, language: "ko" })}>
        Start
      </button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
      <img src={imageList[scrollState]} />

      <div className="imageTest">
        <div className="prevButton">
          <button onClick={prevButton}>이전</button>
        </div>
        <div className="nextButton">
          <button onClick={nextButton}>다음</button>
        </div>
      </div>
    </div>
  );
};
export default Dictaphone;
