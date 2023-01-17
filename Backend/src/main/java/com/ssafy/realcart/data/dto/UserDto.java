package com.ssafy.realcart.data.dto;

import lombok.Data;

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
    private String profileImageUrl;
    private byte isBan;
    private String refreshToken;
}
