package com.web.webcuration.service;

import java.time.LocalDateTime;

import com.web.webcuration.Entity.ConfirmationToken;
import com.web.webcuration.Entity.RefreshToken;
import com.web.webcuration.Entity.User;
import com.web.webcuration.dto.TokenDto;
import com.web.webcuration.dto.UserRelationInfo;
import com.web.webcuration.dto.request.AuthMailCode;
import com.web.webcuration.dto.request.RelationRequest;
import com.web.webcuration.dto.request.SNSRequest;
import com.web.webcuration.dto.request.TokenRequest;
import com.web.webcuration.dto.request.UserRequest;
import com.web.webcuration.dto.response.BaseResponse;
import com.web.webcuration.dto.response.LoginUserResponse;
import com.web.webcuration.jwt.TokenProvider;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final RelationService relationService;
    private final RefreshTokenService refreshTokenService;
    private final TokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final ConfirmationTokenService confirmationTokenService;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @Override
    @Transactional
    public BaseResponse signup(UserRequest userRequest) {

        if (userService.getUserInfo(userRequest.getEmail()) != null) {
            return BaseResponse.builder().status("500").msg("이미 가입된 이메일입니다.").build();
        }

        User userInfo = userRequest.toUser(passwordEncoder);
        User newUser = userService.createUser(userInfo);
        relationService.createRelation(
                RelationRequest.builder().send(newUser.getId()).receive(newUser.getId()).state(true).build());
        return BaseResponse.builder().status("200").msg("success").data(newUser).build();
    }

    @Override
    @Transactional
    public BaseResponse login(UserRequest userRequest) {

        User loginUser = userService.getUserInfo(userRequest.getEmail());
        if (loginUser == null) {
            return BaseResponse.builder().status("500").msg("가입하지 않은 이메일입니다.").build();
        }
        // userRepository
        // 1. Login ID/PW를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = userRequest.toAuthentication();

        // 2. 실제로 검증 (사용자 비밀번호 체크)가 이루어지는 부분
        // authenticate 메서드가 실행이 될 때 CustomUserDeatailService에서 만들었던 loadUserByUsername
        // 메서드 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenDto tokenDto = tokenProvider.createToken(authentication);

        // 4. RefreshToken 저장
        RefreshToken refreshToken = RefreshToken.builder().tokenKey(authentication.getName())
                .tokenValue(tokenDto.getRefreshToken()).build();
        refreshTokenService.deleteBytokenKey(authentication.getName());
        // 5. 토큰 발급
        refreshTokenService.creatRefreshToken(refreshToken);
        UserRelationInfo userRelationInfo = relationService.getCountUserRelation(loginUser.getId(), loginUser.getId());
        loginUser.setFollower(userRelationInfo.getFollower());
        loginUser.setFollowing(userRelationInfo.getFollowing());
        return BaseResponse.builder().status("200").msg("success")
                .data(LoginUserResponse.builder().user(loginUser).token(tokenDto).build()).build();
    }

    @Override
    @Transactional
    public BaseResponse logout(String email) {
        Long tokenKey = userService.getUserInfo(email).getId();
        Long effectRaw = refreshTokenService.deleteBytokenKey(Long.toString(tokenKey));
        if (effectRaw > 0) {
            return BaseResponse.builder().status("200").msg("success").build();
        } else {
            throw new RuntimeException("로그아웃을 실패하였습니다.");
        }
    }

    @Override
    @Transactional
    public BaseResponse reissue(TokenRequest tokenRequest) {

        // 1. RefreshToken 검증
        if (!tokenProvider.validateToken(tokenRequest.getRefreshToken())) {
            throw new RuntimeException("Refresh Token이 유효하지 않습니다.");
        }

        // 2. Access Token에서 User ID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(tokenRequest.getAccessToken());

        // 3. 저장소에서 UserID를 기반으로 Refresh Token 값 가져옴
        RefreshToken refreshToken = refreshTokenService.findBytokenKey(authentication.getName())
                .orElseThrow(() -> new RuntimeException("로그아웃 된 사용자입니다."));

        // 4. Refresh Token 일치하는지 검사
        if (!refreshToken.getTokenValue().equals(tokenRequest.getRefreshToken())) {
            refreshTokenService.deleteBytokenKey(authentication.getName());
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 5. 새로운 토큰 생성
        TokenDto tokenDto = tokenProvider.createToken(authentication);

        // 6. 저장소 정보 업데이트
        RefreshToken newRefreshToken = refreshToken.updateValue(tokenDto.getRefreshToken());
        refreshTokenService.creatRefreshToken(newRefreshToken);

        // 토큰 발급
        return BaseResponse.builder().status("200").msg("success").data(tokenDto).build();
    }

    @Override
    @Transactional
    public BaseResponse sendAuthMail(String email, boolean type) {
        if (type) { // 회원 가입
            if (userService.getUserInfo(email) == null) {
                ConfirmationToken confirmationToken = confirmationTokenService.existAuthMail(email,
                        LocalDateTime.now());
                if (confirmationToken != null) {
                    confirmationTokenService.deleteAuthMail(confirmationToken.getId());
                }
                confirmationTokenService.createEmailConfirmationToken(email, type);
                return BaseResponse.builder().status("200").msg("success").build();
            } else {
                throw new RuntimeException("이미 가입된 이메일이 존재합니다.");
            }
        } else { // 비밀번호 찾기
            if (userService.getUserInfo(email) != null) {
                ConfirmationToken confirmationToken = confirmationTokenService.existAuthMail(email,
                        LocalDateTime.now());
                if (confirmationToken != null) {
                    confirmationTokenService.deleteAuthMail(confirmationToken.getId());
                }
                confirmationTokenService.createEmailConfirmationToken(email, type);
                return BaseResponse.builder().status("200").msg("success").build();
            } else {
                throw new RuntimeException("가입된 이메일이 없습니다.");
            }
        }
    }

    @Override
    @Transactional
    public BaseResponse authMail(AuthMailCode authMailCode, boolean type) {
        ConfirmationToken confirmationToken = confirmationTokenService.AuthMailCodeAndTime(authMailCode,
                LocalDateTime.now(), type);
        if (confirmationToken == null) {
            throw new RuntimeException("인증 가능한 이메일 또는 코드가 없습니다.");
        } else {
            confirmationTokenService.deleteAuthMail(confirmationToken.getId());
            return BaseResponse.builder().status("200").msg("success").build();
        }
    }

    @Override
    public BaseResponse authSNSLogin(SNSRequest snsRequest) {
        User snsUser = snsRequest.SNStoUser(passwordEncoder);
        User newSnsUser = userService.getUserInfo(snsUser.getEmail());
        if (newSnsUser == null) {
            // 닉네임이 있으면
            if (userService.CheckNickname(snsUser.getNickname())) {
                snsUser.setNickname(null);
            }
            newSnsUser = userService.createUser(snsUser);
            relationService.createRelation(
                    RelationRequest.builder().send(newSnsUser.getId()).receive(newSnsUser.getId()).state(true).build());
        }
        return login(new UserRequest(newSnsUser.getEmail(), newSnsUser.getEmail()));
    }

}