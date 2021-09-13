package com.web.webcuration.dto.response;

import com.web.webcuration.Entity.Post;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ScrapResponse {

    private Long scrapid;

    private Post post;

    private String image;
}
