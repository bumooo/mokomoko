package com.web.webcuration.controller;

import java.util.Map;

import com.web.webcuration.dto.request.AuthMailCode;
import com.web.webcuration.dto.request.SNSRequest;
import com.web.webcuration.dto.request.TokenRequest;
import com.web.webcuration.dto.request.UserRequest;
import com.web.webcuration.dto.response.BaseResponse;
import com.web.webcuration.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<BaseResponse> signup(@RequestBody UserRequest userRequest) {
        return ResponseEntity.ok(authService.signup(userRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<BaseResponse> login(@RequestBody UserRequest userRequest) {
        return ResponseEntity.ok(authService.login(userRequest));
    }

    @PostMapping("/logout")
    public ResponseEntity<BaseResponse> logout(@RequestBody Map<String, String> logoutRequest) {
        return ResponseEntity.ok(authService.logout(logoutRequest.get("email")));
    }

    @PostMapping("/reissue")
    public ResponseEntity<BaseResponse> reissue(@RequestBody TokenRequest tokenRequest) {
        return ResponseEntity.ok(authService.reissue(tokenRequest));
    }

    @GetMapping("/mails/{email}")
    public ResponseEntity<BaseResponse> sendAuthMail(@PathVariable("email") String email) {
        return ResponseEntity.ok(authService.sendAuthMail(email, true));
    }

    @PostMapping("/mails") // 인증 코드 확인
    public ResponseEntity<BaseResponse> authCodeMails(@RequestBody AuthMailCode authMailCode) {
        return ResponseEntity.ok(authService.authMail(authMailCode, true));
    }

    @GetMapping("/passwords/{email}") // 패스워드 찾기 코드 전송
    public ResponseEntity<BaseResponse> findPassword(@PathVariable("email") String email) {
        return ResponseEntity.ok(authService.sendAuthMail(email, false));
    }

    @PostMapping("/passwords") // 패스워드 찾기 코드 확인
    public ResponseEntity<BaseResponse> authFindPassword(@RequestBody AuthMailCode authMailCode) {
        System.out.println(authMailCode);
        return ResponseEntity.ok(authService.authMail(authMailCode, false));
    }

    @PostMapping("/sns") // SNS 로그인
    public ResponseEntity<BaseResponse> authSNSLogin(@RequestBody SNSRequest snsRequest) {
        return ResponseEntity.ok(authService.authSNSLogin(snsRequest));
    }

}
