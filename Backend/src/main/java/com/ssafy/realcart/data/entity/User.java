package com.ssafy.realcart.data.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name="USER_TB")
public class User {
    @Id
    @Column(name="USER_PK")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;
    @Column(name="username")
    private String username;
    @Column(name="email", unique = true)
    private String email;
    @Column(name="nickname", unique = true)
    private String nickname;
    @Column(name="password", length = 1024)
    private String password;
    @Column(name="salt")
    private String salt;
    @Column(name="email_verified")
    private byte emailVerified;
    @Column(name="intro")
    private String intro;
    @CreatedDate
    @Column(name="reg_date")
    private Date regDate;
    @LastModifiedDate
    @Column(name="modify_date")
    private Date modifyDate;
    @Column(name="auth_key")
    private String authKey;
    @Column(name="profile_image_url")
    private String profileImageUrl;
    @Column(name="is_ban")
    private byte isBan;
    @Column(name="refresh_token")
    private String refreshToken;

}
