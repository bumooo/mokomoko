package com.web.webcuration.Entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "userid")
    private Long userid;

    @Column(name = "postid")
    private Long postid;

    @Column(name = "cratedate")
    private LocalDateTime createdate;

    @Column(name = "description")
    private String description;

    @PrePersist
    public void prePersist() {
        this.createdate = this.createdate == null ? LocalDateTime.now() : this.createdate;
    }
}
