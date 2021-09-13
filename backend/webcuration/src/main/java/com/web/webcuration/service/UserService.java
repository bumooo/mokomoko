package com.web.webcuration.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import com.web.webcuration.Entity.User;
import com.web.webcuration.dto.SearchUserInfo;
import com.web.webcuration.dto.request.NickNameRequest;
import com.web.webcuration.dto.request.ProfileRequest;
import com.web.webcuration.dto.request.UserRequest;
import com.web.webcuration.dto.response.BaseResponse;
import com.web.webcuration.dto.response.UserRelationListResponse;

public interface UserService {

    User getUserInfo(String email);

    User getUserInfo(Long userid);

    BaseResponse deleteUser(Long userid);

    BaseResponse updateUser(ProfileRequest profileRequest) throws IllegalStateException, IOException;

    BaseResponse updatePasswordUser(UserRequest changeUser);

    BaseResponse setNickname(NickNameRequest nicknameRequest);

    User createUser(User newUser);

    List<SearchUserInfo> getSearchNickname(List<Long> block, String text);

    void changeUserFollowing(Long userid, Long number);

    void changeUserFollower(Long userid, Long number);

    List<User> getRankUsers(List<Long> block);

    BaseResponse getRelationToUser(HashMap<Long, String> states);

    List<UserRelationListResponse> getRandomUserInfo(List<Long> block, Long userid);

    boolean CheckNickname(String nickname);

}
