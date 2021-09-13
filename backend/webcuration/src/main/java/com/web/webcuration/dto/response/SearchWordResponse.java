package com.web.webcuration.dto.response;

import java.util.List;

import com.web.webcuration.dto.SearchUserInfo;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SearchWordResponse {

    private List<String> tags;

    private List<SearchUserInfo> users;

}
