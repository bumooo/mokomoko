import React from "react";
import Loader from "react-loader-spinner";
import SpinContainer from "react-loader-spinner";

const Loading = () => {
  return (
    <SpinContainer>
      <Loader type="Oval" Color="#3d66ba" height={5} width={5} timeout={10000} />
    </SpinContainer>
  );
};

export default Loading;
