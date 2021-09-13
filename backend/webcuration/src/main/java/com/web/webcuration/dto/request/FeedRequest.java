package com.web.webcuration.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class FeedRequest {

    private Long userid;

    private Long postid;

}
