package com.web.webcuration.service;

import java.util.List;

import com.web.webcuration.Entity.Contents;
import com.web.webcuration.repository.ContentsQueryRepository;
import com.web.webcuration.repository.ContentsRepository;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContentsServiceImpl implements ContentsService {

    private final ContentsRepository contentsRepository;
    private final ContentsQueryRepository contentsQueryRepository;

    @Override
    public void deleteAllContents(List<Contents> contents) {
        contentsRepository.deleteAll(contents);
    }

    @Override
    public List<Contents> saveAllContents(List<Contents> contents) {
        return contentsRepository.saveAll(contents);
    }

    @Override
    public List<Contents> findAllByPostidOrderBy(Long postid) {
        return contentsQueryRepository.FindAllByPostidOrderBy(postid);
    }

    @Override
    public Contents FindByPostidOrderby(Long postid) {
        return contentsQueryRepository.FindByPostidOrderby(postid);
    }

}
