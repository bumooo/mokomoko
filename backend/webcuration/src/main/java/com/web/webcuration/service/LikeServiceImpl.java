package com.web.webcuration.service;

import java.util.List;
import java.util.Optional;

import com.web.webcuration.Entity.Likes;
import com.web.webcuration.dto.request.LikeRequest;
import com.web.webcuration.dto.response.BaseResponse;
import com.web.webcuration.repository.LikeRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    private final LikeRepository likeRepository;

    @Override
    public boolean readLike(LikeRequest reqLike) {
        Optional<Likes> likes = likeRepository.findByUseridAndPostid(reqLike.getUserid(), reqLike.getObjectid());
        if (likes.isPresent()) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public BaseResponse createLike(LikeRequest reqLike) {
        return BaseResponse.builder().status("200").msg("success").data(likeRepository.save(reqLike.toLikes())).build();
    }

    @Override
    public BaseResponse deleteLike(LikeRequest reqLike) {
        Optional<Likes> findLike = likeRepository.findByUseridAndPostid(reqLike.getUserid(), reqLike.getObjectid());
        if (findLike.isPresent()) {
            likeRepository.deleteById(findLike.get().getId());
            return BaseResponse.builder().status("200").msg("success").build();
        } else {
            throw new RuntimeException("해당 Likes 데이터가 없습니다.");
        }
    }

    @Override
    @Transactional
    public List<Likes> deleteLikeByUserid(Long userid) {
        List<Likes> deleteByUserid = likeRepository.findAllByUserid(userid);
        likeRepository.deleteAll(deleteByUserid);
        return deleteByUserid;
    }

    @Override
    @Transactional
    public void deleteLikeByPostid(Long postid) {
        List<Likes> deleteByPostid = likeRepository.findAllByPostid(postid);
        likeRepository.deleteAll(deleteByPostid);
    }
}
