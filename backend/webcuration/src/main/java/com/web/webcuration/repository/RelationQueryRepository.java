package com.web.webcuration.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.web.webcuration.Entity.QRelation;
import com.web.webcuration.Entity.Relation;
import com.web.webcuration.dto.UserRelationInfo;
import com.web.webcuration.dto.request.RelationRequest;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class RelationQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QRelation qRelation = QRelation.relation;

    public Relation findBySendAndReceive(RelationRequest relationRequest) {
        Relation findRelation = jpaQueryFactory.select(qRelation).from(qRelation).where(
                qRelation.send.eq(relationRequest.getSend()).and(qRelation.receive.eq(relationRequest.getReceive())))
                .fetchOne();
        return findRelation;
    }

    // 로그인했을 때 팔로워, 차단 userid 전해주기
    public List<Relation> getUserRelation(Long userid) {
        List<Relation> relations = new ArrayList<>();
        relations = jpaQueryFactory.select(qRelation).from(qRelation).where(qRelation.send.eq(userid)).fetch();
        return relations;
    }

    // 팔로우, 팔로워 수 가져오기
    public UserRelationInfo getCountUserRelation(Long send, Long userid) {
        Long follwing = jpaQueryFactory.selectFrom(qRelation)
                .where(qRelation.state.eq(true).and(qRelation.send.eq(userid))).fetchCount() - 1;

        List<Relation> follwerRelations = jpaQueryFactory.selectFrom(qRelation)
                .where(qRelation.state.eq(true).and(qRelation.receive.eq(userid))).fetch();
        Long follwer = 0L;
        boolean isFollow = false;
        if (follwerRelations != null) {
            follwer = Long.valueOf(follwerRelations.size() - 1);
            for (Relation relation : follwerRelations) {
                if (relation.getSend() == send) {
                    isFollow = true;
                    break;
                }
            }
        }
        return UserRelationInfo.builder().follower(follwer).following(follwing).isFollow(isFollow).build();
    }

    public List<Relation> findAllbyUserid(Long userid) {
        List<Relation> relations = new ArrayList<>();
        relations = jpaQueryFactory.select(qRelation).from(qRelation)
                .where(qRelation.send.eq(userid).or(qRelation.receive.eq(userid))).fetch();
        return relations;
    }

    public HashMap<Long, String> getMeAndSelecterRelation(List<Long> relationList, Long userid) {
        HashMap<Long, String> states = new HashMap<>();
        for (Long listid : relationList) {
            states.put(listid, "no");
        }
        List<Tuple> findResult = jpaQueryFactory.select(qRelation.state, qRelation.receive).from(qRelation)
                .where(qRelation.send.eq(userid).and(qRelation.receive.in(relationList))).fetch();
        for (Tuple tuple : findResult) {
            if (tuple.get(0, Boolean.class)) {
                states.put(tuple.get(1, Long.class), "yes");
            } else {
                states.put(tuple.get(1, Long.class), "block");
            }
        }
        return states;
    }

    public List<Long> getRelationListByUserid(String type, Long userid) {
        List<Long> relationList = null;
        switch (type) {
            case "Follow":
                relationList = jpaQueryFactory.select(qRelation.receive).from(qRelation).where(
                        qRelation.send.eq(userid).and(qRelation.receive.ne(userid)).and(qRelation.state.eq(true)))
                        .fetch();
                break;
            case "Follower":
                relationList = jpaQueryFactory.select(qRelation.send).from(qRelation).where(
                        qRelation.receive.eq(userid).and(qRelation.send.ne(userid)).and(qRelation.state.eq(true)))
                        .fetch();
                break;
            case "Block":
                relationList = jpaQueryFactory.select(qRelation.receive).from(qRelation)
                        .where(qRelation.send.eq(userid).and(qRelation.state.eq(false))).fetch();
                break;
        }
        return relationList;
    }
}
