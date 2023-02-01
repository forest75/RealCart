package com.ssafy.realcart.data.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.ssafy.realcart.config.BaseTime;

import com.ssafy.realcart.data.entity.auth.ProviderType;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper=false)
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

    @Column(name = "provider_type", length = 20)
    @Enumerated(EnumType.STRING)
    @NotNull
    private ProviderType providerType;

}
