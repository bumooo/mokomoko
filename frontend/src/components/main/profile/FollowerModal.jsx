import React from 'react';
import '../../../css/main/profile/FollowModal.css'

const FollowerModal = ({showFollowerModal}) => {
    return (
        <>
            <div className="background" onClick={showFollowerModal} />
            <div className="followList">
                    <h1>팔로워 리스트 띄워주기</h1>
            </div>
            
        </>
    );
};

export default FollowerModal;