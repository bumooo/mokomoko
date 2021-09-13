package com.web.webcuration.dto;

import com.web.webcuration.Entity.Tag;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TagDto {

    private String title;

    private String url;

    public Tag toTag(Integer count) {
        String url = "https://search.shopping.naver.com/search/all?query=" + this.title + "&frm=NVSHATC&prevQuery="
                + this.title;
        return Tag.builder().name(this.title).count(count).url(url).build();
    }
}
