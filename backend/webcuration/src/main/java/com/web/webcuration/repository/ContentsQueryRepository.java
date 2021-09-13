package com.web.webcuration.repository;

import java.util.List;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.web.webcuration.Entity.Contents;
import com.web.webcuration.Entity.QContents;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ContentsQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private QContents qContents = QContents.contents;

    public List<Contents> FindAllByPostidOrderBy(Long postid) {
        List<Contents> resContents = jpaQueryFactory.select(qContents).from(qContents)
                .where(qContents.postid.eq(postid)).orderBy(qContents.seq.asc()).fetch();
        return resContents;
    }

    public Contents FindByPostidOrderby(Long postid) {
        Contents resContent = jpaQueryFactory.select(qContents).from(qContents).where(qContents.postid.eq(postid))
                .orderBy(qContents.seq.asc()).fetchFirst();
        if (resContent == null)
            throw new RuntimeException("컨텐츠가 없습니다");
        return resContent;
    }

}
