package com.web.webcuration.service;

import com.web.webcuration.dto.request.SearchRequest;
import com.web.webcuration.dto.response.BaseResponse;

public interface SearchService {

    BaseResponse getSearchWord(SearchRequest searchRequest);

    BaseResponse getSearchResult(SearchRequest searchRequest);
}
