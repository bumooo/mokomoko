package com.web.webcuration.Entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "user")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@DynamicInsert
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String password;

    private String nickname;

    @Column
    private LocalDateTime createdate;

    private String image;

    private String introduce;

    @Enumerated(EnumType.STRING)
    private Provide provide;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @Column(name = "follow")
    private Long following;

    @Column(name = "follower")
    private Long follower;

    public String getAuthority() {
        return this.authority.name();
    }

    @PrePersist
    public void prePersist() {
        this.createdate = LocalDateTime.now();
        this.follower = this.follower == null ? 0 : this.follower;
        this.following = this.following == null ? 0 : this.following;
        // 로컬
        // this.image = this.image == null ? "C:\\Users\\Master\\Desktop\\img" :
        // this.image;
        // 서버
        this.image = this.image == null ? "/profileImg/user_image.png" : this.image;

    }

}
