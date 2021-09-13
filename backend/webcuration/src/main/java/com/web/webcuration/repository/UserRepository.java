package com.web.webcuration.repository;

import java.util.Optional;

import com.web.webcuration.Entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

}
