package com.web.webcuration.service;

import java.util.List;
import java.util.Optional;

import com.web.webcuration.Entity.ChildComment;
import com.web.webcuration.dto.request.CommentRequest;
import com.web.webcuration.dto.response.BaseResponse;
import com.web.webcuration.repository.ChildCommentQueryRepository;
import com.web.webcuration.repository.ChildCommentRepository;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChildCommentServiceImpl implements ChildCommentService {

    private final ChildCommentRepository childCommentRepository;
    private final ChildCommentQueryRepository childCommentQueryRepository;

    @Override
    public List<ChildComment> getPostChildComment(Long postid) {
        return childCommentQueryRepository.getPostChildComment(postid);
    }

    @Override
    public BaseResponse updateChildComment(CommentRequest childComment) {
        Optional<ChildComment> findChildComment = childCommentRepository.findById(childComment.getId());
        if (findChildComment.isPresent()) {
            findChildComment.get().setDescription(childComment.getDescription());
            return BaseResponse.builder().status("200").msg("success")
                    .data(childCommentRepository.save(findChildComment.get())).build();
        } else {
            throw new RuntimeException("해당 대댓글이 없습니다.");
        }
    }

    @Override
    public BaseResponse deleteChildComment(Long childCommentid) {
        childCommentRepository.deleteById(childCommentid);
        return BaseResponse.builder().status("200").msg("success").build();
    }

    @Override
    public BaseResponse createChildComment(ChildComment childComment) {
        return BaseResponse.builder().status("200").msg("success").data(childCommentRepository.save(childComment))
                .build();
    }

    @Override
    public Long getChildCommentPostid(Long childCommentid) {
        Optional<ChildComment> childComment = childCommentRepository.findById(childCommentid);
        if (childComment.isPresent()) {
            return childComment.get().getPostid();
        } else {
            throw new RuntimeException("해당 대댓글이 없습니다.");
        }
    }

    @Override
    public List<ChildComment> deleteChildCommentByPostid(List<Long> postid) {
        List<ChildComment> deleteChildComment = childCommentQueryRepository.getDeleteChildComment(postid);
        childCommentRepository.deleteAll(deleteChildComment);
        return deleteChildComment;
    }

    @Override
    public Long getChildCommentByCommentid(Long commentid) {
        List<ChildComment> childComments = childCommentQueryRepository.getChildCommentByCommentid(commentid);
        childCommentRepository.deleteAll(childComments);
        return Long.valueOf(childComments == null ? 0 : childComments.size());
    }

    @Override
    public Long deleteChildCommentByCommentids(List<Long> commentids) {
        List<ChildComment> childComments = childCommentQueryRepository.findChildCommentByCommentids(commentids);
        childCommentRepository.deleteAll(childComments);
        Long cnt = Long.valueOf(childComments == null ? 0 : childComments.size());
        return cnt + Long.valueOf(commentids == null ? 0 : commentids.size());
    }

}
