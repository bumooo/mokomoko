package com.web.webcuration.service;

import java.util.List;

import com.web.webcuration.Entity.Likes;
import com.web.webcuration.dto.request.LikeRequest;
import com.web.webcuration.dto.response.BaseResponse;

public interface LikeService {

    boolean readLike(LikeRequest reqLike);

    BaseResponse createLike(LikeRequest reqLike);

    BaseResponse deleteLike(LikeRequest reqLike);

    List<Likes> deleteLikeByUserid(Long userid);

    void deleteLikeByPostid(Long postid);
}
