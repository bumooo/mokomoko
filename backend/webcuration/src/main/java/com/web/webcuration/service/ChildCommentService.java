package com.web.webcuration.service;

import java.util.List;

import com.web.webcuration.Entity.ChildComment;
import com.web.webcuration.dto.request.CommentRequest;
import com.web.webcuration.dto.response.BaseResponse;

public interface ChildCommentService {

    List<ChildComment> getPostChildComment(Long commentid);

    BaseResponse updateChildComment(CommentRequest childComment);

    BaseResponse deleteChildComment(Long childCommentid);

    BaseResponse createChildComment(ChildComment childComment);

    Long getChildCommentPostid(Long childCommentid);

    List<ChildComment> deleteChildCommentByPostid(List<Long> postid);

    Long getChildCommentByCommentid(Long commentid);

    Long deleteChildCommentByCommentids(List<Long> commentids);
}
