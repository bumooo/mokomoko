package com.web.webcuration.dto.request;

import com.web.webcuration.Entity.Authority;
import com.web.webcuration.Entity.Provide;
import com.web.webcuration.Entity.User;

import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SNSRequest {

    private String id;
    private String nickname;
    private String image;

    @Builder
    public User SNStoUser(PasswordEncoder passwordEncoder) {
        return User.builder().email(this.id).password(passwordEncoder.encode(this.id)).image(this.image)
                .nickname(this.nickname).authority(Authority.ROLE_USER).provide(Provide.SNS).build();
    }

}
