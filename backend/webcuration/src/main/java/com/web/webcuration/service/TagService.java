package com.web.webcuration.service;

import java.util.List;

import com.web.webcuration.Entity.Tag;
import com.web.webcuration.dto.TagDto;

public interface TagService {

    List<Tag> saveTag(List<TagDto> reqTags, Long postid);

    List<Tag> findPostInTag(Long postid);

    void deleteTag(Long postid);

    List<String> getSearchTag(String text);

    List<Tag> getRankTags();

    List<Long> getPostidByTagName(String name);
}
