package com.web.webcuration.service;

import java.util.Optional;

import com.web.webcuration.Entity.LikeComment;
import com.web.webcuration.dto.request.LikeRequest;
import com.web.webcuration.dto.response.BaseResponse;
import com.web.webcuration.repository.LikeCommentRepository;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LikeCommentServiceImpl implements LikeCommentService {

    private final LikeCommentRepository likeCommentRepository;

    @Override
    public BaseResponse addLikeComment(LikeRequest reqLike) {
        likeCommentRepository.save(reqLike.toLikeCommet());
        return BaseResponse.builder().status("200").msg("success").build();
    }

    @Override
    public BaseResponse deleteLikeComment(LikeRequest reqLike) {
        Optional<LikeComment> findLikeComment = likeCommentRepository.findByUseridAndCommentid(reqLike.getUserid(),
                reqLike.getObjectid());
        if (findLikeComment.isPresent()) {
            likeCommentRepository.deleteById(findLikeComment.get().getId());
            return BaseResponse.builder().status("200").msg("success").build();
        } else {
            throw new RuntimeException("해당 LikeComment가 없습니다.");
        }
    }

    @Override
    public boolean readLike(LikeRequest reqLike) {
        Optional<LikeComment> findLikeComment = likeCommentRepository.findByUseridAndCommentid(reqLike.getUserid(),
                reqLike.getObjectid());
        if (findLikeComment.isPresent()) {
            return true;
        } else {
            return false;
        }
    }

}
