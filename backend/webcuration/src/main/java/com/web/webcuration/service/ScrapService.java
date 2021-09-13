package com.web.webcuration.service;

import java.util.List;

import com.web.webcuration.Entity.Scrap;
import com.web.webcuration.dto.request.ScrapRequest;
import com.web.webcuration.dto.response.BaseResponse;

public interface ScrapService {

    BaseResponse addScrap(ScrapRequest scrapRequest);

    BaseResponse deleteScrap(ScrapRequest scrapRequest);

    BaseResponse deleteAllScrapByUserid(Long userid);

    BaseResponse deleteAllScrapByPostid(List<Long> postids);

    List<Scrap> getScrapByUserid(Long userid);

    boolean checkScrapPost(Long userid, Long postid);

}
