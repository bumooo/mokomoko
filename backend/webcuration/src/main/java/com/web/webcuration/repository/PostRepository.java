package com.web.webcuration.repository;

import java.util.List;
import java.util.Optional;

import com.web.webcuration.Entity.Post;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findAllByUserid(Long userid);

    Optional<Post> findByUserid(Long userid);

}
