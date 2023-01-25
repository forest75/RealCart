package com.ssafy.realcart.data.entity;

import com.ssafy.realcart.config.BaseTime;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@Table(name="COMMENT_TB")
public class Comment extends BaseTime {
    @Id
    @Column(name="COMMENT_PK")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "USER_FK")
    @ToString.Exclude
    private User user;
    @Column(name="content")
    private String content;
    @ManyToOne
    @JoinColumn(name = "BOARD_FK")
    @ToString.Exclude
    private BoardFree boardFree;

}
