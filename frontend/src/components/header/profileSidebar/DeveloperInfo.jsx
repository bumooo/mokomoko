import React from 'react';
import {IoIosArrowBack} from 'react-icons/io';
import "../../../css/header/profileSidebar/DeveloperInfo.css";

const DeveloperInfo = () => {

    const goBack = () =>{
        window.history.back();
    }

    return (
        <>
            
            <div className="developerInfo-header">
                <div className="developerInfo-header back" onClick={goBack}>
                    <IoIosArrowBack/>
                </div>
                <div className="developerInfo-header title">
                    개발자정보
                </div>
            </div>

            <div className="developerInfo">
                <div className="developerInfo img">
                    <img src="https://i.pinimg.com/564x/44/bb/57/44bb5716cac824ea4554f7f4d6b97ad5.jpg" />
                </div>
                <div className="developerInfo text">
                    <h3>이재민</h3>
                    팀장님<br />
                    FrontEnd
                </div>
            </div>

            <div className="developerInfo">
                <div className="developerInfo img">
                    <img src="https://i.pinimg.com/564x/44/bb/57/44bb5716cac824ea4554f7f4d6b97ad5.jpg" />
                </div>
                <div className="developerInfo text">
                    <h3>김범수</h3>
                    CTO <br />
                    BackEnd
                </div>
            </div>

            <div className="developerInfo">
                <div className="developerInfo img">
                    <img src="https://i.pinimg.com/564x/44/bb/57/44bb5716cac824ea4554f7f4d6b97ad5.jpg" />
                </div>
                <div className="developerInfo text">
                    <h3>박종한</h3>
                    CTO <br />
                    FrontEnd
                </div>
            </div>

            <div className="developerInfo">
                <div className="developerInfo img">
                    <img src="https://i.pinimg.com/564x/44/bb/57/44bb5716cac824ea4554f7f4d6b97ad5.jpg" />
                </div>
                <div className="developerInfo text">
                    <h3>박다영</h3>
                    FrontEnd
                </div>
            </div>
        </>
    );
};

export default DeveloperInfo;