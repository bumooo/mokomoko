package com.web.webcuration.controller;

import com.web.webcuration.Entity.ChildComment;
import com.web.webcuration.dto.request.CommentRequest;
import com.web.webcuration.dto.response.BaseResponse;
import com.web.webcuration.service.ChildCommentService;
import com.web.webcuration.service.PostService;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/child")
public class ChildCommentController {

    private final PostService postService;
    private final ChildCommentService childCommentService;

    @PostMapping()
    @Transactional
    public ResponseEntity<BaseResponse> createChildComment(@RequestBody ChildComment childComment) {
        postService.changePostCommentCnt(childComment.getPostid(), 1L);
        return ResponseEntity.ok(childCommentService.createChildComment(childComment));
    }

    @PutMapping()
    public ResponseEntity<BaseResponse> updateChildComment(@RequestBody CommentRequest childComment) {
        return ResponseEntity.ok(childCommentService.updateChildComment(childComment));
    }

    @DeleteMapping("/{childCommentid}")
    @Transactional
    public ResponseEntity<BaseResponse> deleteChildComment(@PathVariable("childCommentid") Long childCommentid) {
        Long postid = childCommentService.getChildCommentPostid(childCommentid);
        postService.changePostCommentCnt(postid, -1L);
        return ResponseEntity.ok(childCommentService.deleteChildComment(childCommentid));
    }

}
