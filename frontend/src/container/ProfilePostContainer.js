import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfilePost from '../components/main/profile/ProfilePost';
import { setDetail,getDetailNumber,getDetail } from '../modules/profileDetail';

function ProfilePostContainer(){
    // useSelector는 리덕스 스토어의 상태를 조회하는 Hook입니다.
    // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일합니다.
    const {postList,post,number} = useSelector(state => ({
        postList : state.profileDetail.postList,
        post : state.profileDetail.post,
        number : state.profileDetail.number,
    }));

    // useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용 할 수 있게 해주는 Hook 입니다.
    const dispatch = useDispatch();

    const onSetDetail = postList => dispatch(setDetail(postList));
    const onGetDetailNumber = number => dispatch(getDetailNumber(number));
    const onGetDetail = number => dispatch(getDetail(number));


    return(
        <ProfilePost
        // 상태와
        postList = {postList}
        post = {post}
        number = {number}
        // 액션을 디스패치 하는 함수들을 props로 넣어줍니다.
        onSetDetail = {onSetDetail}
        onGetDetailNumber ={onGetDetailNumber}
        onGetDetail = {onGetDetail}
        />
    );

}

export default ProfilePostContainer;