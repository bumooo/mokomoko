package com.web.webcuration.repository;

import java.util.Optional;

import com.web.webcuration.Entity.Tag;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {

    Optional<Tag> findByName(String name);

}
