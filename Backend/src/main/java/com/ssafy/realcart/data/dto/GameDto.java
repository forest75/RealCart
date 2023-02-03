package com.ssafy.realcart.data.dto;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class GameDto {
    private int id;
    private List<Map<UserDto, Integer>> players;
    private String createdTime;
    private String modifiedTime;

}
