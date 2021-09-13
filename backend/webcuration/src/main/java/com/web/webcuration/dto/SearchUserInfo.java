package com.web.webcuration.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SearchUserInfo {

    private Long id;

    private String name;

    private String image;
}
