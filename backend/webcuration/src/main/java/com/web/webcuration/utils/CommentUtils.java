package com.web.webcuration.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.web.webcuration.Entity.ChildComment;
import com.web.webcuration.Entity.Comment;
import com.web.webcuration.Entity.User;
import com.web.webcuration.dto.request.LikeRequest;
import com.web.webcuration.dto.response.ChildCommentResponse;
import com.web.webcuration.dto.response.CommentResponse;
import com.web.webcuration.service.LikeCommentService;
import com.web.webcuration.service.UserService;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CommentUtils {

    private final UserService userService;
    private final LikeCommentService likeCommentService;

    public Map<Long, List<ChildCommentResponse>> childCommentToResponse(List<ChildComment> childComments) {
        Map<Long, List<ChildCommentResponse>> childResponseMap = new HashMap<>();
        Map<Long, User> userMap = new HashMap<>();
        for (ChildComment childComment : childComments) {
            User user = null;
            if (userMap.get(childComment.getUserid()) == null) {
                user = userService.getUserInfo(childComment.getUserid());
                userMap.put(childComment.getUserid(), user);
            } else {
                user = userMap.get(childComment.getUserid());
            }
            if (user != null) {
                if (childResponseMap.get(childComment.getCommentid()) == null) {
                    childResponseMap.put(childComment.getCommentid(),
                            new ArrayList<>(Arrays.asList(ChildCommentResponse.of(user, childComment))));
                } else {
                    childResponseMap.get(childComment.getCommentid()).add(ChildCommentResponse.of(user, childComment));
                }
            } else {
                new RuntimeException("해당 유저가 없습니다.");
            }
        }
        return childResponseMap;
    }

    public List<CommentResponse> CommentToResponse(List<Comment> comments, List<ChildComment> childComments) {
        List<CommentResponse> commentResponses = new ArrayList<>();
        Map<Long, List<ChildCommentResponse>> childResponseMap = childCommentToResponse(childComments);
        Map<Long, User> userMap = new HashMap<>();
        for (Comment comment : comments) {
            User user = null;
            if (userMap.get(comment.getUserid()) == null) {
                user = userService.getUserInfo(comment.getUserid());
                userMap.put(comment.getUserid(), user);
            } else {
                user = userMap.get(comment.getUserid());
            }
            if (user != null) {
                boolean like = likeCommentService
                        .readLike(LikeRequest.builder().userid(user.getId()).objectid(comment.getId()).build());
                commentResponses.add(CommentResponse.of(user, comment, childResponseMap.get(comment.getId()), like));
            } else {
                new RuntimeException("해당 유저가 없습니다.");
            }
        }
        return commentResponses;
    }
}
