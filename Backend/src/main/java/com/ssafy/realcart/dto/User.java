package com.ssafy.realcart.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name="USER_TB")
public class User {
    @Id
    @Column(name="USER_PK")
    private int userId;
    @Column(name="username")
    private String username;
    @Column(name="email")
    private String email;
    @Column(name="nickname")
    private String nickname;
    @Column(name="password")
    private String password;
    @Column(name="salt")
    private String salt;
    @Column(name="email_verified")
    private byte emailVerified;
    @Column(name="intro")
    private String intro;
    @Column(name="reg_date")
    private Date regDate;
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

    public User(int userId, String username, String email, String nickname, String password) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.nickname = nickname;
        this.password = password;
    }

    public User() {

    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public byte getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(byte emailVerified) {
        this.emailVerified = emailVerified;
    }

    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }

    public Date getRegDate() {
        return regDate;
    }

    public void setRegDate(Date regDate) {
        this.regDate = regDate;
    }

    public Date getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(Date modifyDate) {
        this.modifyDate = modifyDate;
    }

    public String getAuthKey() {
        return authKey;
    }

    public void setAuthKey(String authKey) {
        this.authKey = authKey;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public byte getIsBan() {
        return isBan;
    }

    public void setIsBan(byte isBan) {
        this.isBan = isBan;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", nickname='" + nickname + '\'' +
                ", password='" + password + '\'' +
                ", salt='" + salt + '\'' +
                ", emailVerified=" + emailVerified +
                ", intro='" + intro + '\'' +
                ", regDate=" + regDate +
                ", modifyDate=" + modifyDate +
                ", authKey='" + authKey + '\'' +
                ", profileImageUrl='" + profileImageUrl + '\'' +
                ", isBan=" + isBan +
                ", refreshToken='" + refreshToken + '\'' +
                '}';
    }
}
