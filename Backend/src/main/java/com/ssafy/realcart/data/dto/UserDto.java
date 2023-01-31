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
    private String intro;
    private String profileImageUrl;
    private String refreshToken;
}
