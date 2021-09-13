import React from 'react';
import {IoIosArrowBack} from 'react-icons/io';
import "../../../css/header/profileSidebar/UserBlock.css";


const UserBlock = () => {
    const goBack = () =>{
        window.history.back();
    }
    return (
        <div>
            <div className="userBlock-header">
                <div className="userBlock-header back" onClick={goBack}>
                    <IoIosArrowBack/>
                </div>
                <div className="userBlock-header title">
                    차단된 계졍
                </div>
            </div>
        </div>
    );
};

export default UserBlock;