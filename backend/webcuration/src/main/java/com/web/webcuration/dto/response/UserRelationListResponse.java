package com.web.webcuration.dto.response;

import com.web.webcuration.Entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRelationListResponse {

    private User user;

    private String state;
}
