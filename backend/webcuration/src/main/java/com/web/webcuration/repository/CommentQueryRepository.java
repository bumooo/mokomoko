package com.web.webcuration.repository;

import java.util.ArrayList;
import java.util.List;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.web.webcuration.Entity.Comment;
import com.web.webcuration.Entity.QComment;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class CommentQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QComment qComment = QComment.comment;

    public List<Comment> getPostComment(Long postid) {
        List<Comment> comments = new ArrayList<>();
        comments = jpaQueryFactory.select(qComment).from(qComment).where(qComment.postid.eq(postid))
                .orderBy(qComment.createdate.desc()).fetch();
        return comments;
    }

    public List<Comment> getDeleteComment(List<Long> postid) {
        List<Comment> deleteComments = new ArrayList<>();
        deleteComments = jpaQueryFactory.select(qComment).from(qComment).where(qComment.postid.in(postid)).fetch();
        return deleteComments;
    }

    public List<Long> findCommentidByPostid(Long postid) {
        List<Long> findCommentids = jpaQueryFactory.select(qComment.id).from(qComment).where(qComment.postid.eq(postid))
                .fetch();
        return findCommentids == null ? new ArrayList<>() : findCommentids;
    }

    public List<Comment> findCommentidByUserid(Long userid) {
        List<Comment> findCommentids = jpaQueryFactory.selectFrom(qComment).where(qComment.userid.eq(userid)).fetch();
        return findCommentids == null ? new ArrayList<>() : findCommentids;
    }
}
