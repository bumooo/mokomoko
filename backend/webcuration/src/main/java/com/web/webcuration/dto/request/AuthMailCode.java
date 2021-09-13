package com.web.webcuration.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class AuthMailCode {

    private String email;

    private String code;
}