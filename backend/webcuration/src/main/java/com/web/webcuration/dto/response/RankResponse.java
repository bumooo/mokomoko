package com.web.webcuration.dto.response;

import java.util.List;

import com.web.webcuration.Entity.Tag;
import com.web.webcuration.Entity.User;
import com.web.webcuration.dto.UserPostInfo;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RankResponse {

    private List<Tag> tags;
    private List<User> users;
    private List<UserPostInfo> postInfos;
}
