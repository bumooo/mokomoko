package com.web.webcuration.Entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ConfirmationToken {

    private static final long EMAIL_TOKEN_EXPIRATION_TIME_VALUE = 5L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private LocalDateTime expirationDate;

    @Column
    private boolean expired;

    @Column
    private String email;

    @Column
    private LocalDateTime createDate;

    @Column
    private String virifyCode;

    @Column
    private boolean type; // true면 회원가입, false면 비밀번호 찾기

    // 이메일 인증 토큰 생성
    public static ConfirmationToken createEmailConfirmationToken(String email, boolean type) {
        ConfirmationToken confirmationToken = new ConfirmationToken();
        confirmationToken.createDate = LocalDateTime.now();
        confirmationToken.expirationDate = LocalDateTime.now().plusMinutes(EMAIL_TOKEN_EXPIRATION_TIME_VALUE);
        confirmationToken.email = email;
        confirmationToken.expired = false;
        confirmationToken.virifyCode = confirmationToken.CreateCode();
        confirmationToken.type = type;
        return confirmationToken;
    }

    public String CreateCode() {
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            code.append((int) (Math.random() * 10));
        }
        return code.toString();
    }

    // 토큰 사용으로 인한 만료
    public void userToken() {
        this.expired = true;
    }
}
