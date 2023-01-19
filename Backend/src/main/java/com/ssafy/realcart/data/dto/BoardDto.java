package com.ssafy.realcart.data.dto;

import lombok.Data;

import java.util.List;

@Data
public class BoardDto {
    private int id;
    private String title;
    private String content;
    private String createdTime;
    private String modifiedTime;
    private String nickname;
    private List<CommentDto> comments;
}
