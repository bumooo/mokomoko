import { Button } from "react-bootstrap";
import React from "react";
import { useState } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import axios from "axios";
import "../../css/user/EmailBtnModal.css";
import { useEffect } from "react";

const EmailBtnModal = (props, history) => {
  const [code, setCode] = useState("");
  const [userCode, setUserCode] = useState("");
  const [codeValidation, setCodevalidation] = useState(false);
  const [btnColorState, setBtnColorState] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [okay, setOkay] = useState(null);

  const onChangeCode = (e) => {
    setCode(e.target.value);
  };

  const onClickCheck = () => {
    axios({
      url: "http://localhost:8080/api/auth/mails",
      method: "post",
      data: {
        code: code,
        email: props.email,
      },
    })
      .then((res) => {
        console.log(res);
        console.log(res.data.status);
        if (res.data.status === "200") {
          setChecked(true);
          saveAndPush();
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  const codeBtnChangeColor = () => {
    codeValidation ? setBtnColorState(true) : setBtnColorState(false);
  };

  const isCode = () => {
    const codeRegex = /^(?=.*[0-9]+$).{5}/;

    if (codeRegex.test(code) && code.length > 0) {
      setCodevalidation(true);
      codeBtnChangeColor();
    } else {
      setCodevalidation(false);
      codeBtnChangeColor();
    }
    console.log(codeValidation);
  };

  const saveAndPush = () => {
    props.setCheck(true);
    props.onHide();
  };

  const mailResend = () => {
    axios({
      url: "http://localhost:8080/api/auth/mails/" + props.email,
      method: "get",
    }).then((res) => {
      console.log(res);
    });
  };

  // const finalCodeCheck = async () => {
  //   setError(null);
  //   setUserCode("");
  //   setLoading(true);
  //   axios({
  //     //   url: "",
  //     //   method: "GET",
  //   })
  //     .then((res) => {
  //       setUserCode(res.data);
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setError(error);
  //     })
  //     .then(setLoading(false), setOkay(true));
  //   finalCheck();
  // };

  useEffect(() => {
    console.log(code);
  }, [code, btnColorState, codeValidation, isChecked]);

  if (loading) return <div>로딩중..</div>;

  if (okay) return <p className="okay-msg">인증이 완료되었습니다.</p>;

  return (
    <>
      <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">mokomoko</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>이메일 인증</h4>
          <p className="mail-auth-msg">가입을 위해 이메일 인증을 해주세요 !</p>
          <input
            className="code-input"
            type="text"
            name="codeinput"
            onChange={onChangeCode}
            onKeyUp={isCode}
            placeholder={isChecked ? code : "코드 입력"}
            disabled={isChecked}
          />
          <p className="error-msg">{error ? "에러가 발생했습니다" : ""}</p>
          <button
            id="email-check-validation"
            className={btnColorState ? "check-btn-active" : "check-btn-unactive"}
            type="submit"
            onClick={onClickCheck}
            disabled={!btnColorState || isChecked}
          >
            {isChecked ? "인증 완료 !" : "제출"}
          </button>
        </Modal.Body>
        <ModalFooter>
          <span className="notify">
            이메일을 받지 못했나요 ?
            <Button className="resend-mail" onClick={mailResend} variant="link">
              메일 재전송
            </Button>
          </span>
          <Button id="close-btn" onClick={saveAndPush} disabled={!isChecked}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EmailBtnModal;
