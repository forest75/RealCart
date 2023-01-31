package com.ssafy.realcart.data.dto;

import lombok.Data;

@Data
public class AdDto {
    private int id;
    private String Owner;
    private String Content;
    private String type;
    private String startDate;
    private String endDate;
}
