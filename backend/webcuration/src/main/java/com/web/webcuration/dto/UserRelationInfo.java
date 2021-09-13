package com.web.webcuration.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserRelationInfo {

    private boolean isFollow;

    private Long follower;

    private Long following;
}
