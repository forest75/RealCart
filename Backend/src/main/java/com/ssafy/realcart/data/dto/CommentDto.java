package com.ssafy.realcart.data.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentDto {
    private int id;
    private String nickname;
    private String content;
    private LocalDateTime createdTime;
    private LocalDateTime modifiedTime;
}
