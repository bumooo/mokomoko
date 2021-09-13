package com.web.webcuration.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.web.webcuration.Entity.Tag;
import com.web.webcuration.Entity.TagManage;
import com.web.webcuration.dto.TagDto;
import com.web.webcuration.repository.TagManageRepository;
import com.web.webcuration.repository.TagQueryRepository;
import com.web.webcuration.repository.TagRepository;
import com.web.webcuration.textMatcher.KoreanTextMatch;
import com.web.webcuration.textMatcher.KoreanTextMatcher;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagManageRepository tagManageRepository;
    private final TagRepository tagRepository;
    private final TagQueryRepository tagQueryRepository;

    @Override
    public List<Tag> saveTag(List<TagDto> reqTags, Long postid) {

        List<Tag> resTags = new ArrayList<>();
        for (TagDto tag : reqTags) {
            Optional<Tag> findTag = tagRepository.findByName(tag.getTitle());
            if (findTag.isPresent()) {
                findTag.get().setCount(findTag.get().getCount() + 1);
                resTags.add(findTag.get());
            } else {
                resTags.add(tag.toTag(1));
            }
        }
        List<Tag> resultTag = tagRepository.saveAll(resTags);
        List<TagManage> tagManages = new ArrayList<>();
        for (Tag tag : resultTag) {
            tagManages.add(TagManage.builder().postId(postid).tagId(tag.getId()).build());
        }
        tagManageRepository.saveAll(tagManages);
        return resultTag;
    }

    @Override
    public List<Tag> findPostInTag(Long postid) {
        List<Tag> tags = new ArrayList<>();
        for (TagManage tagManage : tagManageRepository.findAllBypostId(postid)) {
            Optional<Tag> tag = tagRepository.findById(tagManage.getTagId());
            if (tag.isPresent()) {
                tags.add(tag.get());
            } else {
                throw new RuntimeException("태그 아이디가 존재하지 않습니다.");
            }
        }
        return tags;
    }

    @Override
    @Transactional
    public void deleteTag(Long postid) {
        List<TagManage> tagManages = tagManageRepository.findAllBypostId(postid);
        List<Tag> tags = new ArrayList<>();
        for (TagManage tagManage : tagManages) {
            Tag tag = tagRepository.findById(tagManage.getTagId()).get();
            if (tag.getCount() == 1) {
                tags.add(tagRepository.findById(tagManage.getTagId()).get());
            } else {
                tag.setCount(tag.getCount() - 1);
                tagRepository.save(tag);
            }
        }
        tagRepository.deleteAll(tags);
        tagManageRepository.deleteAll(tagManages);
    }

    @Override
    public List<String> getSearchTag(String text) {
        List<String> allTagName = tagQueryRepository.getAllTagName();
        List<String> searchWord = new ArrayList<>();
        KoreanTextMatcher matcher = new KoreanTextMatcher(text);
        for (String tagName : allTagName) {
            KoreanTextMatch match = matcher.match(tagName);
            if (match.success()) {
                searchWord.add(tagName);
                if (searchWord.size() == 5) {
                    break;
                }
            }
        }
        return searchWord;
    }

    @Override
    public List<Tag> getRankTags() {
        return tagQueryRepository.getRankTags();
    }

    @Override
    public List<Long> getPostidByTagName(String name) {
        List<Long> postids = tagQueryRepository.getPostidByTagName(name);
        return postids == null ? new ArrayList<>() : postids;
    }

}
