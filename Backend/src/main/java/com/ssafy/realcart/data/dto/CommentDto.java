package com.ssafy.realcart.data.dto;

import lombok.Data;

@Data
public class CommentDto {
    private int id;
    private String nickname;
    private String content;
    private String createdTime;
    private String modifiedTime;
}
