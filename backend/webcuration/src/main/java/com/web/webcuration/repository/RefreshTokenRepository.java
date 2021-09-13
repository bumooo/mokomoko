package com.web.webcuration.repository;

import java.util.Optional;

import com.web.webcuration.Entity.RefreshToken;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findBytokenKey(String tokenKey);

    Long deleteBytokenKey(String tokenKey);
}
