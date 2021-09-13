package com.web.webcuration.dto.response;

import java.time.LocalDateTime;

import com.web.webcuration.Entity.ChildComment;
import com.web.webcuration.Entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ChildCommentResponse {

    // child commentid
    private Long id;

    private String name;

    private String image;

    private String description;

    private LocalDateTime createdate;

    public static ChildCommentResponse of(User user, ChildComment childComment) {
        return ChildCommentResponse.builder().image(user.getImage()).name(user.getNickname()).id(childComment.getId())
                .description(childComment.getDescription()).createdate(childComment.getCreatedate()).build();
    }
}
