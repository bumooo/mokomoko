package com.web.webcuration.service;

import java.util.ArrayList;
import java.util.List;

import com.web.webcuration.Entity.Scrap;
import com.web.webcuration.dto.request.ScrapRequest;
import com.web.webcuration.dto.response.BaseResponse;
import com.web.webcuration.repository.ScrapQueryRepository;
import com.web.webcuration.repository.ScrapRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScrapServiceImpl implements ScrapService {

    private final ScrapRepository scrapRepository;
    private final ScrapQueryRepository scrapQueryRepository;

    @Override
    public BaseResponse addScrap(ScrapRequest scrapRequest) {
        Scrap newScrap = Scrap.builder().postid(scrapRequest.getPostid()).userid(scrapRequest.getUserid()).build();
        log.info("{}", "scrap : " + newScrap);
        scrapRepository.save(newScrap);
        return BaseResponse.builder().status("200").msg("success").build();
    }

    @Override
    public BaseResponse deleteScrap(ScrapRequest scrapRequest) {
        Scrap findScrap = scrapQueryRepository.findScrapByUseridAndPostid(scrapRequest.getUserid(),
                scrapRequest.getPostid());
        if (findScrap != null) {
            scrapRepository.delete(findScrap);
            return BaseResponse.builder().status("200").msg("success").build();
        } else {
            throw new RuntimeException("삭제하려는 스크랩이 없습니다.");
        }
    }

    @Override
    @Transactional
    public BaseResponse deleteAllScrapByUserid(Long userid) {
        List<Scrap> deleleteScraps = scrapQueryRepository.findAllByUserid(userid);
        scrapRepository.deleteAll(deleleteScraps);
        return BaseResponse.builder().status("200").msg("success").build();
    }

    @Override
    @Transactional
    public BaseResponse deleteAllScrapByPostid(List<Long> postids) {
        List<Scrap> deleleteScraps = scrapQueryRepository.findAllByPostid(postids);
        scrapRepository.deleteAll(deleleteScraps);
        return BaseResponse.builder().status("200").msg("success").build();
    }

    @Override
    public List<Scrap> getScrapByUserid(Long userid) {
        List<Scrap> findByUseridScraps = scrapQueryRepository.findAllByUseridOrderBy(userid);
        return findByUseridScraps == null ? new ArrayList<>() : findByUseridScraps;
    }

    @Override
    public boolean checkScrapPost(Long userid, Long postid) {
        return scrapQueryRepository.findByUseridAndPostid(userid, postid);
    }

}
