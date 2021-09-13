package com.web.webcuration.service;

import com.web.webcuration.dto.request.LikeRequest;
import com.web.webcuration.dto.response.BaseResponse;

public interface LikeCommentService {

    BaseResponse addLikeComment(LikeRequest reqLike);

    BaseResponse deleteLikeComment(LikeRequest reqLike);

    boolean readLike(LikeRequest reqLike);
}
