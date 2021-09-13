package com.web.webcuration.service;

import java.util.List;

import com.web.webcuration.Entity.Contents;

public interface ContentsService {

    void deleteAllContents(List<Contents> contents);

    List<Contents> saveAllContents(List<Contents> contents);

    List<Contents> findAllByPostidOrderBy(Long postid);

    Contents FindByPostidOrderby(Long postid);
}
