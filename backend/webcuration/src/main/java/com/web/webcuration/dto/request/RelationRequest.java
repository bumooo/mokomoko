package com.web.webcuration.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class RelationRequest {

    private Long send;

    private Long receive;

    private boolean state;
}
