package com.web.webcuration.dto;

import com.web.webcuration.Entity.Post;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserPostInfo {

    private Post post;

    private String image;
}
