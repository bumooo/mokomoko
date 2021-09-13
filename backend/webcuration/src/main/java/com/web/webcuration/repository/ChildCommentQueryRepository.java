package com.web.webcuration.repository;

import java.util.ArrayList;
import java.util.List;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.web.webcuration.Entity.ChildComment;
import com.web.webcuration.Entity.QChildComment;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ChildCommentQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QChildComment qChildComment = QChildComment.childComment;

    public List<ChildComment> getPostChildComment(long postid) {
        List<ChildComment> childComments = new ArrayList<>();
        childComments = jpaQueryFactory.select(qChildComment).from(qChildComment).where(qChildComment.postid.eq(postid))
                .orderBy(qChildComment.createdate.asc()).fetch();
        return childComments;
    }

    public List<ChildComment> getDeleteChildComment(List<Long> postid) {
        List<ChildComment> deleteChildComments = new ArrayList<>();
        deleteChildComments = jpaQueryFactory.select(qChildComment).from(qChildComment)
                .where(qChildComment.postid.in(postid)).fetch();
        return deleteChildComments;
    }

    public List<ChildComment> getChildCommentByCommentid(Long commentid) {
        List<ChildComment> childComments = jpaQueryFactory.selectFrom(qChildComment)
                .where(qChildComment.commentid.eq(commentid)).fetch();
        return childComments;
    }

    public List<ChildComment> findChildCommentByCommentids(List<Long> commentids) {
        List<ChildComment> childComments = jpaQueryFactory.selectFrom(qChildComment)
                .where(qChildComment.commentid.in(commentids)).fetch();
        return childComments;
    }

}
