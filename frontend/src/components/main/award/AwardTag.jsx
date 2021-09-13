import React from 'react';


import '../../../css/award/AwardTag.css';

const AwardTag = () => {
    return (
        <div>
            <div className="awardTag-wrapper">
                <div className="awardTag-row">
                    <div className="awardTag-col">
                        <div className="awardTag-col top3">
                            <li>1등</li>
                            <li>2등</li>
                            <li>3등</li>
                        </div>
                        <div className="awardTag-col top6">
                            <li>4등</li>
                            <li>5등</li>
                            <li>6등</li>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AwardTag;