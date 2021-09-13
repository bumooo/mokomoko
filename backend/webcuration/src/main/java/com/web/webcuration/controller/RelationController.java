package com.web.webcuration.controller;

import com.web.webcuration.dto.request.RelationRequest;
import com.web.webcuration.dto.response.BaseResponse;
import com.web.webcuration.service.RelationService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/relation")
public class RelationController {

    private final RelationService relationService;

    @PostMapping()
    public ResponseEntity<BaseResponse> createRelation(@RequestBody RelationRequest relationRequest) {
        return ResponseEntity.ok(relationService.createRelation(relationRequest));
    }

    @DeleteMapping()
    public ResponseEntity<BaseResponse> deleteRelation(@RequestBody RelationRequest relationRequest) {
        return ResponseEntity.ok(relationService.deleteRelation(relationRequest));
    }
}
