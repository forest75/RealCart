package com.ssafy.realcart.data.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.ssafy.realcart.config.BaseTime;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Data
@EqualsAndHashCode(callSuper=false)
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
