package com.ssafy.realcart.data.dto;

import lombok.Data;

@Data
public class DeviceDto {
    private int id;
    private String model;
    private String type;
    private String name;
    private String status;
    private String createdTime;
    private String modifiedTime;
}
