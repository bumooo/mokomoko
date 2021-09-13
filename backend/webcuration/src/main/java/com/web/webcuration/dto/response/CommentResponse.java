package com.web.webcuration.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import com.web.webcuration.Entity.Comment;
import com.web.webcuration.Entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CommentResponse {

    // comment id
    private Long id;

    private String name;

    private String image;

    private String description;

    private LocalDateTime createdate;

    private List<ChildCommentResponse> childComment;

    private boolean like;

    public static CommentResponse of(User user, Comment comment, List<ChildCommentResponse> childCommentResponses,
            boolean like) {
        return CommentResponse.builder().childComment(childCommentResponses).image(user.getImage())
                .name(user.getNickname()).description(comment.getDescription()).createdate(comment.getCreatedate())
                .id(comment.getId()).like(like).build();
    }
}
