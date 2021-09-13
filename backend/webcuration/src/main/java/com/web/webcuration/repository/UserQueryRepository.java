package com.web.webcuration.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.web.webcuration.Entity.QUser;
import com.web.webcuration.Entity.User;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private QUser qUser = QUser.user;

    public boolean DuplicateCheckName(Long userid, String nickname) {
        Long findNicknameId = jpaQueryFactory.select(qUser.id).from(qUser).where(qUser.nickname.eq(nickname))
                .fetchOne();
        if (findNicknameId == null || findNicknameId == userid) {
            return true;
        } else {
            return false;
        }
    }

    public boolean DuplicateCheckName(String nickname) {
        Long count = jpaQueryFactory.selectFrom(qUser).where(qUser.nickname.eq(nickname)).fetchCount();
        return count > 0 ? true : false;
    }

    public List<User> getUserOrderBy(List<Long> block) {
        List<User> UserOrderBy = new ArrayList<>();
        UserOrderBy = jpaQueryFactory.selectFrom(qUser).where(qUser.nickname.isNotNull().and(qUser.id.notIn(block)))
                .orderBy(qUser.nickname.asc()).fetch();
        return UserOrderBy;
    }

    public List<User> getRankUsers(List<Long> block) {
        return jpaQueryFactory.selectFrom(qUser).where(qUser.id.notIn(block).and(qUser.nickname.isNotNull()))
                .orderBy(qUser.follower.desc(), qUser.createdate.asc()).limit(9).fetch();
    }

    public List<User> getListToUser(HashMap<Long, String> states) {
        return jpaQueryFactory.selectFrom(qUser).where(qUser.id.in(states.keySet())).fetch();
    }

    public List<User> getOtherUser(List<Long> block, Long userid) {
        List<User> otherUser = jpaQueryFactory.selectFrom(qUser)
                .where(qUser.id.ne(userid).and(qUser.id.notIn(block)).and(qUser.nickname.isNotNull())).fetch();
        return otherUser == null ? new ArrayList<>() : otherUser;
    }
}