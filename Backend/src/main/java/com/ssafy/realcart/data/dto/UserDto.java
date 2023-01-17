package com.ssafy.realcart.data.dto;

import lombok.Data;

import javax.persistence.Column;
import java.util.Date;

@Data
public class UserDto {
    private int userId;
    private String username;
    private String email;
    private String nickname;
    private String password;
    private String salt;
    private byte emailVerified;
    private String intro;
    private Date regDate;
    private Date modifyDate;
    private String authKey;
    private String profileImageUrl;
    private byte isBan;
    private String refreshToken;
}
