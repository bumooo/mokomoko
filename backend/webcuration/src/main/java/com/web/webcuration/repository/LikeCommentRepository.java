package com.web.webcuration.repository;

import java.util.Optional;

import com.web.webcuration.Entity.LikeComment;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeCommentRepository extends JpaRepository<LikeComment, Long> {

    Optional<LikeComment> findByUseridAndCommentid(Long userid, Long commentid);
}
