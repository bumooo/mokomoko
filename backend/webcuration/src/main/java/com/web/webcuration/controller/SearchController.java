package com.web.webcuration.controller;

import com.web.webcuration.dto.request.SearchRequest;
import com.web.webcuration.dto.response.BaseResponse;
import com.web.webcuration.service.SearchService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
public class SearchController {

    private final SearchService searchService;

    @PostMapping("")
    public ResponseEntity<BaseResponse> getSearchWord(@RequestBody SearchRequest searchRequest) {
        return ResponseEntity.ok(searchService.getSearchWord(searchRequest));
    }

    @PostMapping("/result")
    public ResponseEntity<BaseResponse> getSearchResult(@RequestBody SearchRequest searchRequest) {
        return ResponseEntity.ok(searchService.getSearchResult(searchRequest));
    }

}
