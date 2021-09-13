package com.web.webcuration.dto.response;

import java.util.List;

import com.web.webcuration.Entity.Contents;
import com.web.webcuration.Entity.Post;
import com.web.webcuration.Entity.Tag;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PostResponse {

    private Long userid;

    private String userImage;

    private String userName;

    private Post post;

    private List<Tag> tags;

    private List<Contents> contents;

    private boolean like;

    private boolean scrap;

    private List<CommentResponse> comments;
}
