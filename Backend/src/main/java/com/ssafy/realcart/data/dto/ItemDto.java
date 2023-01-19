package com.ssafy.realcart.data.dto;

import lombok.Data;

@Data
public class ItemDto {
    private int id;
    private String name;
    private String desc;
    private int defaultQuantity;
}
