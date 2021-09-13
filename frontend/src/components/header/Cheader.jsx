import React from "react";
import { Navbar, Container } from "react-bootstrap";
import "../../css/header/Cheader.css";

const Cheader = (props) => {
  return (
    <div className="cheader-wrapper">
      <Navbar className="header-nav">
        <Container className="logo">
          <Navbar.Brand href="/account/login">
            <span id="profile-header-name">mokomoko</span>
            {/* <img id="logo-img" src={logoImg} /> */}
          </Navbar.Brand>
          <div id="header-title">{props.title}</div>
        </Container>
      </Navbar>
      {/* <hr className="header-line" /> */}
    </div>
  );
};

export default Cheader;
