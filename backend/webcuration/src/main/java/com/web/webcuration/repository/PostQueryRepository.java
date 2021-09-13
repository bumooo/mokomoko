package com.web.webcuration.repository;

import java.util.ArrayList;
import java.util.List;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.web.webcuration.Entity.Post;
import com.web.webcuration.Entity.QPost;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class PostQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QPost qPost = QPost.post;

    public List<Post> FindByUserPostOrderby(Long userid) {
        List<Post> userPost = jpaQueryFactory.select(qPost).from(qPost).where(qPost.userid.eq(userid))
                .orderBy(qPost.createdate.desc()).fetch();
        return userPost;
    }

    public List<Post> getExplorePost(List<Long> block, Long postid) {
        List<Post> explorePost = new ArrayList<>();
        if (postid == 0L) {
            explorePost = jpaQueryFactory.select(qPost).from(qPost).where(qPost.userid.notIn(block))
                    .orderBy(qPost.id.desc()).limit(15).fetch();
        } else {
            explorePost = jpaQueryFactory.select(qPost).from(qPost)
                    .where(qPost.id.lt(postid).and(qPost.userid.notIn(block))).orderBy(qPost.id.desc()).limit(15)
                    .fetch();
        }
        return explorePost;
    }

    public List<Post> getMainFeed(List<Long> follow, Long postid) {
        List<Post> posts = new ArrayList<>();
        if (postid == 0L) {
            posts = jpaQueryFactory.select(qPost).from(qPost).where(qPost.userid.in(follow))
                    .orderBy(qPost.createdate.desc()).limit(5).fetch();
        } else {
            posts = jpaQueryFactory.select(qPost).from(qPost).where(qPost.userid.in(follow).and(qPost.id.lt(postid)))
                    .orderBy(qPost.createdate.desc()).limit(5).fetch();
        }
        return posts;
    }

    public List<Post> findAllByUserid(Long userid) {
        List<Post> posts = new ArrayList<>();
        posts = jpaQueryFactory.select(qPost).from(qPost).where(qPost.userid.eq(userid)).fetch();
        return posts;
    }

    public List<Post> getRankPost(List<Long> block) {
        return jpaQueryFactory.selectFrom(qPost).where(qPost.userid.notIn(block))
                .orderBy(qPost.likeCnt.desc(), qPost.createdate.asc()).limit(9).fetch();
    }

    public Long getPostCountByUserid(Long userid) {
        return jpaQueryFactory.selectFrom(qPost).where(qPost.userid.eq(userid)).fetchCount();
    }

    public List<Post> getAllPostByPostids(List<Long> block, List<Long> postid) {
        return jpaQueryFactory.selectFrom(qPost).where(qPost.id.in(postid).and(qPost.userid.notIn(block))).fetch();
    }
}
