package com.web.webcuration.dto.request;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ProfileRequest {

    private Long id;

    private String provide;

    private MultipartFile image;

    private String introduce;

    private String nickname;

    private boolean fileChanged;
}
