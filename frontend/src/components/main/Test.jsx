import React ,{useEffect}from 'react';

const Test = ({history}) => {
    useEffect(() => {
        console.log(localStorage.getItem("accessToken"));
        if(localStorage.getItem("accessToken") == null){
            history.push("/account/login");
        }else{
            history.push("main/feed");
        }
        return () => {
            
        }
    }, [])
    return (
        <div>
            테스트화면
        </div>
    );
};

export default Test;