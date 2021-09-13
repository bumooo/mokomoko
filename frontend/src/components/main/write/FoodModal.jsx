import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const FoodModal = (props) => {
  const [show, setShow] = useState(false); // 모달창을 보여줄지 관리하는 state
  const [temp, setTemp] = useState({
    // 모달창에서 태그 title, url을 입력을 받아 부모에게 전달하는 state
    title: "",
    url: "",
  });
  const onTempChange = (e) => {
    // temp Change 이벤트
    const { value, name } = e.target;
    setTemp({
      ...temp,
      [name]: value,
    });
  };
  const onSubmit = () => {
    // 추가하기 버튼 이벤트 -> 모달창을 닫고 부모에게 state 전달
    handleClose();
    props.onTagChange(temp.title, temp.url);
    const newTemp = { title: "", url: "" };
    setTemp(newTemp);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  return (
    <>
      <div className="food-tag-create" onClick={handleShow}>
        {"\u00A0"}
        {"\u00A0"}
        <FontAwesomeIcon icon="plus" className="food-create-icon"></FontAwesomeIcon>
        {"\u00A0"}
        태그 추가하기
        {"\u00A0"}
        {"\u00A0"}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>태그 추가하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="food-create-input"
            name="title"
            placeholder="태그 제목"
            onChange={onTempChange}
          />
          <input
            type="text"
            className="food-create-input"
            name="url"
            placeholder="태그 URL"
            onChange={onTempChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={onSubmit} disabled={temp.title === "" ? true : false}>
            추가
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default FoodModal;
