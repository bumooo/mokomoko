package com.web.webcuration.service;

import com.web.webcuration.dto.response.BaseResponse;

public interface RankService {

    BaseResponse getRankList(Long userid);
}
