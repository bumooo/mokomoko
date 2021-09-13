package com.web.webcuration.dto.response;

import java.util.List;

import com.web.webcuration.Entity.User;
import com.web.webcuration.dto.UserPostInfo;
import com.web.webcuration.dto.UserRelationInfo;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserPostResponse {

    private User user;

    private List<UserPostInfo> postInfo;

    private UserRelationInfo relationInfo;
}
