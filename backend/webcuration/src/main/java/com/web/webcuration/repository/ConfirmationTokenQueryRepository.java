package com.web.webcuration.repository;

import java.time.LocalDateTime;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.web.webcuration.Entity.ConfirmationToken;
import com.web.webcuration.Entity.QConfirmationToken;
import com.web.webcuration.dto.request.AuthMailCode;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ConfirmationTokenQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private QConfirmationToken qConfirmationToken = QConfirmationToken.confirmationToken;

    public ConfirmationToken AuthMailCodeAndTime(AuthMailCode authMailCode, LocalDateTime time, boolean type) {
        ConfirmationToken confirmToken = jpaQueryFactory.select(qConfirmationToken).from(qConfirmationToken)
                .where(qConfirmationToken.virifyCode.eq(authMailCode.getCode())
                        .and(qConfirmationToken.email.eq(authMailCode.getEmail()))
                        .and(qConfirmationToken.expirationDate.goe(time)).and(qConfirmationToken.type.eq(type)))
                .fetchOne();
        return confirmToken;
    }

    public ConfirmationToken existAuthMail(String email, LocalDateTime time) {
        ConfirmationToken confirmationToken = jpaQueryFactory.select(qConfirmationToken).from(qConfirmationToken)
                .where(qConfirmationToken.email.eq(email).and(qConfirmationToken.expirationDate.goe(time))).fetchOne();
        return confirmationToken;
    }

}