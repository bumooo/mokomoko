package com.web.webcuration.dto;

import com.web.webcuration.Entity.Contents;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ContentDto {

    private MultipartFile media;
    private String desc;
    private boolean is;

    public Contents toContents(Long postid, String path, Integer seq) {
        return Contents.builder().postid(postid).image(path).description(desc).seq(seq).build();
    }
}
