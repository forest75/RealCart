package com.ssafy.realcart.data.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ssafy.realcart.config.BaseTime;

import lombok.Data;

@Entity
@Data
@Table(name="USER_TB")
public class User extends BaseTime{
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
    @Column(name="password", length = 255)
    private String password;
    @Column(name="salt")
    private String salt;
    @Column(name="email_salt")
    private String emailSalt;
    @Column(name="email_verified")
    private byte emailVerified;
    @Column(name="intro")
    private String intro;
    @Column(name="profile_image_url")
    private String profileImageUrl;
    @Column(name="is_ban")
    private byte isBan;
    @Column(name="refresh_token")
    private String refreshToken;

}
