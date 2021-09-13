import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../FontAwesome";
import Loading from "./Loading";
import EmailBtnModal from "./EmailBtnModal";

const emailNetworkRequest = () => {
  return new Promise((resolve) => setTimeout(resolve, 10000));
};

const LoadingButton = (props) => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      emailNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);
  return (
    <Button
      id="email-check"
      variant="primary"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
    >
      {isLoading ? "loading" : "인증"}
    </Button>
  );
};

export default LoadingButton;
