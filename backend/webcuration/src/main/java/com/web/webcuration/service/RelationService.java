package com.web.webcuration.service;

import java.util.HashMap;
import java.util.List;

import com.web.webcuration.dto.UserRelationInfo;
import com.web.webcuration.dto.request.RelationRequest;
import com.web.webcuration.dto.response.BaseResponse;
import com.web.webcuration.dto.response.RelationResponse;

public interface RelationService {

    BaseResponse createRelation(RelationRequest relationRequest);

    BaseResponse deleteRelation(RelationRequest relationRequest);

    RelationResponse getUserRelation(Long userid);

    UserRelationInfo getCountUserRelation(Long send, Long userid);

    void deleteRelationByUserid(Long userid);

    List<Long> getRelationListByUserid(String type, Long userid);

    HashMap<Long, String> getMeAndSelecterRelation(List<Long> relationList, Long userid);
}
