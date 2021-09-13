package com.web.webcuration.controller;

import com.web.webcuration.Entity.Comment;
import com.web.webcuration.dto.request.CommentRequest;
import com.web.webcuration.dto.response.BaseResponse;
import com.web.webcuration.service.ChildCommentService;
import com.web.webcuration.service.CommentService;
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
@RequestMapping("/api/comment")
public class CommentController {

    private final PostService postService;
    private final CommentService commentService;
    private final ChildCommentService childCommentService;

    @PutMapping()
    public ResponseEntity<BaseResponse> updateComment(@RequestBody CommentRequest comment) {
        return ResponseEntity.ok(commentService.updateComment(comment));
    }

    @DeleteMapping("/{commentid}")
    @Transactional
    public ResponseEntity<BaseResponse> deleteComment(@PathVariable("commentid") Long commentid) {
        Long postid = commentService.getCommentPostid(commentid);
        commentService.deleteComment(commentid);
        Long cnt = childCommentService.getChildCommentByCommentid(commentid);
        return ResponseEntity.ok(postService.changePostCommentCnt(postid, -(cnt + 1L)));
    }

    @PostMapping()
    @Transactional
    public ResponseEntity<BaseResponse> createComment(@RequestBody Comment comment) {
        commentService.createComment(comment);
        return ResponseEntity.ok(postService.changePostCommentCnt(comment.getPostid(), 1L));
    }
}
