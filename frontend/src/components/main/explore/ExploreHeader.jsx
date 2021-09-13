import React, { useEffect, useState } from "react";
// import "../../../css/main/explore/ExploreHeader.css";
const ExploreHeader = () => {
  const [results, setResults] = useState("");
  const [updateField, setUpdateField] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    console.log(keyword);
  }, [keyword]);

  const onChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };
  return (
    <>
      <div className="search-form">
        <div className="search-box">
          <input id="search-ipt" type="text" value={keyword} onChange={onChangeKeyword} />
          <div id="ospan"></div>
        </div>
      </div>
    </>
  );
};

export default ExploreHeader;
