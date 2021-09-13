package com.web.webcuration.repository;

import java.util.List;
import java.util.Optional;

import com.web.webcuration.Entity.Likes;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Likes, Long> {

    Optional<Likes> findByUseridAndPostid(Long userid, Long postid);

    List<Likes> findAllByUserid(Long userid);

    List<Likes> findAllByPostid(Long postid);

}
