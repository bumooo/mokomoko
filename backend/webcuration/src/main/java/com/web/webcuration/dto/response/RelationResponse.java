package com.web.webcuration.dto.response;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RelationResponse {

    private List<Long> follow;

    private List<Long> block;
}
