package com.web.webcuration.service;

import java.util.List;

import com.web.webcuration.Entity.Comment;
import com.web.webcuration.dto.request.CommentRequest;
import com.web.webcuration.dto.response.BaseResponse;
import com.web.webcuration.dto.response.CommentResponse;

public interface CommentService {

    List<CommentResponse> getPostComment(Long postid);

    BaseResponse updateComment(CommentRequest comment);

    BaseResponse deleteComment(Long commentid);

    BaseResponse createComment(Comment comment);

    Long getCommentPostid(Long commentid);

    List<Comment> deleteCommentByPostid(List<Long> postid);

    List<Long> findCommentidByPostid(Long postid);

    List<Comment> findCommentByUserid(Long userid);
}
