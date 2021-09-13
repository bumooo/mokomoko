import React from "react";
import AwardUser from "./AwardUser";
import AwardTag from "./AwardTag";
import AwardPost from "./AwardPost";

import "../../../css/award/AwardMain.css";
import Cheader from "../../header/Cheader";
import { useSelector } from "react-redux";

const AwardMain = () => {
  return (
    <div>
      <div className="awardMain-wrapper">
        <div className="awardMain-row">
          <div className="awardMain-col">
            <div className="awardMain-header">
              <Cheader title="명예의 전당" />
            </div>
            <div className="awardMain-content">
              <br />
              <AwardUser />
              <AwardTag />
              <AwardPost />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardMain;
