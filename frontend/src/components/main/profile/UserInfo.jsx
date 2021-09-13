import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUserInfo} from '../../../modules/userInfo';

import userImg from '../../../img/user_image.png';
import FollowModal from './FollowModal';
import FollowerModal from './FollowerModal';
import '../../../css/main/profile/UserInfo.css'

const UserInfo = () => {

    const {user} = useSelector(state => ({user: state.userInfo.user}));

    const dispatch = useDispatch();

    const [userInfo, SetUesrInfo] = useState(user);

    const [isFollow, setIsFollow] = useState(false);
    const [isFollower, setIsFollower] = useState(false);

    const showFollowModal = () => {
        setIsFollow(prev => !prev);
    }

    const showFollowerModal = () => {
        setIsFollower(prev => !prev);
    }

    return (
        <div className="userInfo-wrapper">
            <div className="userInfo-row">
                <div className="userInfo-col">
                    <div className="userInfo">
                        <div className="userImg">
                            <img
                                className="userImg-img"
                                alt="my-image"
                                src={(
                                    user.image != null)
                                    ? user.image
                                    : `${userImg}`}/>
                        </div>
                        <div className="userInfo-nickname">
                            <span>{user.nickname}</span>
                        </div>
                        <div className="userInfo-introduce">
                            <span>{user.introduce}</span>
                        </div>

                        <div className="userFriend">
                            <div className="userFriend follow" onClick={showFollowModal}>
                                <p >
                                    <b>팔로우</b>
                                </p>
                                <div>
                                    {user.following}
                                </div>
                            </div>

                            {isFollow && <FollowModal showFollowModal={showFollowModal}/>}

                            <div className="userFriend follower" onClick={showFollowerModal}>
                                <p>
                                    <b>팔로워</b>
                                </p>
                                <div>
                                    {user.follower}
                                </div>
                            </div>
                            {isFollower && <FollowerModal showFollowerModal={showFollowerModal}/>}
                            <hr/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default UserInfo;