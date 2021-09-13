package com.web.webcuration.service;

import java.util.Optional;

import com.web.webcuration.Entity.RefreshToken;
import com.web.webcuration.repository.RefreshTokenRepository;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public Optional<RefreshToken> findBytokenKey(String tokenKey) {
        return refreshTokenRepository.findBytokenKey(tokenKey);
    }

    @Override
    public Long deleteBytokenKey(String tokenKey) {
        Optional<RefreshToken> findToken = refreshTokenRepository.findBytokenKey(tokenKey);
        if (findToken.isPresent()) {
            refreshTokenRepository.deleteById(findToken.get().getId());
            return 1L;
        } else {
            return 0L;
        }

    }

    @Override
    public RefreshToken creatRefreshToken(RefreshToken refreshToken) {
        return refreshTokenRepository.save(refreshToken);
    }

}
