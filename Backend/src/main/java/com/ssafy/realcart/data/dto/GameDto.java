package com.ssafy.realcart.data.dto;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class GameDto {
    private int id;
    private List<Map<UserDto, Integer>> players;
    private String createdTime;
    private String modifiedTime;

}
