package com.web.webcuration.dto.response;

import java.util.List;

import com.web.webcuration.dto.MainFeedDto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MainFeedResponse {

    private boolean type;

    private List<MainFeedDto> mainFeedDto;

    private List<UserRelationListResponse> randomUsers;
}
