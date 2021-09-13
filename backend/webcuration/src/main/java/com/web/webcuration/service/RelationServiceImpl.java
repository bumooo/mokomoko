package com.web.webcuration.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.web.webcuration.Entity.Relation;
import com.web.webcuration.dto.UserRelationInfo;
import com.web.webcuration.dto.request.RelationRequest;
import com.web.webcuration.dto.response.BaseResponse;
import com.web.webcuration.dto.response.RelationResponse;
import com.web.webcuration.repository.RelationQueryRepository;
import com.web.webcuration.repository.RelationRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RelationServiceImpl implements RelationService {

    private final UserService userService;
    private final RelationRepository relationRepository;
    private final RelationQueryRepository relationQueryRepository;

    @Override
    @Transactional
    public BaseResponse createRelation(RelationRequest relationRequest) {
        Relation findRelation = relationQueryRepository.findBySendAndReceive(relationRequest);
        if (relationRequest.getSend() != relationRequest.getReceive()) {
            if (findRelation != null) {
                if (!relationRequest.isState()) {
                    // 팔로우 -> 차단
                    userService.changeUserFollowing(relationRequest.getSend(), -1L);
                    userService.changeUserFollower(relationRequest.getReceive(), -1L);
                    findRelation.setState(relationRequest.isState());
                    relationRepository.save(findRelation);
                }
            } else {
                if (relationRequest.isState()) {
                    // 바로 팔로우
                    userService.changeUserFollowing(relationRequest.getSend(), 1L);
                    userService.changeUserFollower(relationRequest.getReceive(), 1L);
                }
                relationRepository.save(Relation.builder().send(relationRequest.getSend())
                        .receive(relationRequest.getReceive()).state(relationRequest.isState()).build());
            }
        } else {
            relationRepository.save(Relation.builder().send(relationRequest.getSend())
                    .receive(relationRequest.getReceive()).state(relationRequest.isState()).build());
        }
        return BaseResponse.builder().status("200").msg("success").data(
                relationQueryRepository.getCountUserRelation(relationRequest.getSend(), relationRequest.getReceive()))
                .build();
    }

    @Override
    @Transactional
    public BaseResponse deleteRelation(RelationRequest relationRequest) {
        Relation findRelation = relationQueryRepository.findBySendAndReceive(relationRequest);
        if (findRelation != null) {
            if (findRelation.isState()) {
                // 팔로우 관계
                userService.changeUserFollowing(relationRequest.getSend(), -1L);
                userService.changeUserFollower(relationRequest.getReceive(), -1L);
            }
            relationRepository.delete(relationQueryRepository.findBySendAndReceive(relationRequest));
        } else {
            throw new RuntimeException("해당 유저와의 관계가 없습니다.");
        }
        return BaseResponse.builder().status("200").msg("success").data(
                relationQueryRepository.getCountUserRelation(relationRequest.getSend(), relationRequest.getReceive()))
                .build();
    }

    @Override
    public RelationResponse getUserRelation(Long userid) {
        List<Relation> relations = relationQueryRepository.getUserRelation(userid);
        List<Long> follow = new ArrayList<>();
        List<Long> block = new ArrayList<>();
        for (Relation relation : relations) {
            if (relation.isState()) {
                follow.add(relation.getReceive());
            } else {
                block.add(relation.getReceive());
            }
        }
        return RelationResponse.builder().follow(follow).block(block).build();
    }

    @Override
    public UserRelationInfo getCountUserRelation(Long send, Long userid) {
        return relationQueryRepository.getCountUserRelation(send, userid);
    }

    @Override
    public void deleteRelationByUserid(Long userid) {
        List<Relation> deleteRelation = relationQueryRepository.findAllbyUserid(userid);
        relationRepository.deleteAll(deleteRelation);
    }

    // 해당 userid의 follw, follower, block userid select
    @Override
    public List<Long> getRelationListByUserid(String type, Long userid) {
        return relationQueryRepository.getRelationListByUserid(type, userid);
    }

    @Override
    public HashMap<Long, String> getMeAndSelecterRelation(List<Long> relationList, Long userid) {
        return relationQueryRepository.getMeAndSelecterRelation(relationList, userid);
    }

}
