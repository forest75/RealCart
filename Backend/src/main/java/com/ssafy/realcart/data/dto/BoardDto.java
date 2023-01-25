package com.ssafy.realcart.data.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
public class BoardDto {
    private int id;
    private int hit;
    private String title;
    private String content;
    private LocalDateTime createdTime;
    private LocalDateTime modifiedTime;
    private String nickname;
    private List<CommentDto> comments;
}
