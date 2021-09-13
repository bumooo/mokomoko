package com.web.webcuration.service;

import java.util.Optional;

import com.web.webcuration.Entity.RefreshToken;

public interface RefreshTokenService {

    Optional<RefreshToken> findBytokenKey(String tokenKey);

    Long deleteBytokenKey(String tokenKey);

    RefreshToken creatRefreshToken(RefreshToken refreshToken);
}
