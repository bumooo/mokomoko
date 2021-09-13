package com.web.webcuration.repository;

import java.util.List;

import com.web.webcuration.Entity.TagManage;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TagManageRepository extends JpaRepository<TagManage, Long> {

    List<TagManage> findAllBypostId(Long postid);
}