import React from 'react';
import {AiOutlineUser} from  'react-icons/ai'
import {FiLogOut} from 'react-icons/fi';
import {FaConnectdevelop} from 'react-icons/fa';
import {BiCut} from 'react-icons/bi';

export const ProfileSideBarData = [
    {
        title: '회원정보수정',
        path: '/main/account/userInfo/modify',
        icons: <AiOutlineUser/>,
        cName: 'nav-text',
        functionName : '',
    },
    {
        title: '차단된 계정',
        path: '/main/account/userInfo/block',
        icons: <BiCut/>,
        cName: 'nav-text',
        functionName : '',
    },
    {
        title: '개발자 정보',
        path: '/main/developers/info',
        icons: <FaConnectdevelop/>,
        cName: 'nav-text',
        functionName : '',
    },
    {
        title: '로그아웃',
        path: '/',
        icons: <FiLogOut/>,
        cName: 'nav-text',
        functionName :'logout',
    }
];