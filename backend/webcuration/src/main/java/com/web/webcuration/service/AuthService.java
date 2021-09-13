package com.web.webcuration.service;

import com.web.webcuration.dto.request.AuthMailCode;
import com.web.webcuration.dto.request.SNSRequest;
import com.web.webcuration.dto.request.TokenRequest;
import com.web.webcuration.dto.request.UserRequest;
import com.web.webcuration.dto.response.BaseResponse;

public interface AuthService {

    BaseResponse signup(UserRequest userRequest);

    BaseResponse logout(String email);

    BaseResponse login(UserRequest userRequest);

    BaseResponse reissue(TokenRequest tokenReuqest);

    BaseResponse sendAuthMail(String email, boolean type);

    BaseResponse authMail(AuthMailCode authMailCode, boolean type);

    BaseResponse authSNSLogin(SNSRequest snsRequest);
}
