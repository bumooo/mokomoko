package com.web.webcuration.dto;

import java.util.List;

import com.web.webcuration.Entity.Contents;
import com.web.webcuration.Entity.Post;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MainFeedDto {

    private Long userid;

    private String nickname;

    private String image;

    private Post post;

    private List<Contents> contents;

    private boolean like;

    private boolean scrap;
}
