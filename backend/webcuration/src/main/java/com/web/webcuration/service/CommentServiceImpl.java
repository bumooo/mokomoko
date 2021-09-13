package com.web.webcuration.service;

import java.util.List;
import java.util.Optional;

import com.web.webcuration.Entity.ChildComment;
import com.web.webcuration.Entity.Comment;
import com.web.webcuration.dto.request.CommentRequest;
import com.web.webcuration.dto.response.BaseResponse;
import com.web.webcuration.dto.response.CommentResponse;
import com.web.webcuration.repository.CommentQueryRepository;
import com.web.webcuration.repository.CommentRepository;
import com.web.webcuration.utils.CommentUtils;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentUtils commentUtils;
    private final ChildCommentService childCommentService;
    private final CommentRepository commentRepository;
    private final CommentQueryRepository commentQueryRepository;

    // 게시글 모든 댓글 가져오기(미니 댓글 포함)
    @Override
    public List<CommentResponse> getPostComment(Long postid) {
        List<ChildComment> childComments = childCommentService.getPostChildComment(postid);
        List<Comment> comments = commentQueryRepository.getPostComment(postid);
        return commentUtils.CommentToResponse(comments, childComments);
    }

    // 댓글 수정
    @Override
    public BaseResponse updateComment(CommentRequest comment) {
        Optional<Comment> findComment = commentRepository.findById(comment.getId());
        if (findComment.isPresent()) {
            findComment.get().setDescription(comment.getDescription());
            return BaseResponse.builder().status("200").msg("success").data(commentRepository.save(findComment.get()))
                    .build();
        } else {
            throw new RuntimeException("해당 댓글이 없습니다.");
        }
    }

    // 댓글 삭제
    @Override
    public BaseResponse deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
        return BaseResponse.builder().status("200").msg("success").build();
    }

    // 댓글 작성
    @Override
    public BaseResponse createComment(Comment comment) {
        return BaseResponse.builder().status("200").msg("success").data(commentRepository.save(comment)).build();
    }

    @Override
    public Long getCommentPostid(Long commentid) {
        Optional<Comment> comment = commentRepository.findById(commentid);
        if (comment.isPresent()) {
            return comment.get().getPostid();
        } else {
            throw new RuntimeException("해당 댓글이 없습니다.");
        }
    }

    @Override
    public List<Comment> deleteCommentByPostid(List<Long> postid) {
        List<Comment> deleteComment = commentQueryRepository.getDeleteComment(postid);
        commentRepository.deleteAll(deleteComment);
        return deleteComment;
    }

    @Override
    public List<Long> findCommentidByPostid(Long postid) {
        List<Long> commentids = commentQueryRepository.findCommentidByPostid(postid);
        return commentids;
    }

    @Override
    public List<Comment> findCommentByUserid(Long userid) {
        List<Comment> commentids = commentQueryRepository.findCommentidByUserid(userid);
        return commentids;
    }

}
