package com.web.webcuration.dto.request;

import javax.validation.constraints.NotNull;

import com.web.webcuration.Entity.Authority;
import com.web.webcuration.Entity.Provide;
import com.web.webcuration.Entity.User;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {

    @NotNull
    private String email;

    @NotNull
    private String password;

    public User toUser(PasswordEncoder passwordEncoder) {
        return User.builder().email(this.email).password(passwordEncoder.encode(this.password))
                .authority(Authority.ROLE_USER).provide(Provide.LOCAL).build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(this.email, this.password);
    }
}
