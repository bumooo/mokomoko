package com.web.webcuration.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class BaseResponse {

    String status;

    String msg;

    Object data;
}
