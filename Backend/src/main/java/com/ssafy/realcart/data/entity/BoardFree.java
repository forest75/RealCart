package com.ssafy.realcart.data.entity;

import javax.persistence.*;

import com.ssafy.realcart.config.BaseTime;

import com.ssafy.realcart.data.dto.CommentDto;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Entity
@Data
@Table(name="BOARD_FREE_TB")
public class BoardFree extends BaseTime{

    @Id
    @Column(name="BOARD_FREE_PK")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="title")
    private String title;
    @Column(name="hit")
    private int hit;
    @Column(name="content")
    private String content;
    @ManyToOne
    @JoinColumn (name="USER_FK")
    @ToString.Exclude
    private User user;

}
