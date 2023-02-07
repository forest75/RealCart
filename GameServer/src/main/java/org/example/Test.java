package org.example;

import com.google.gson.Gson;

public class Test {
    public static void main(String[] args) {
        String jsonData = "{\"timestamp\" : 1675741831676, \"speed\" : 56, \"gateNo\" : 3, \"status\" : 2}";
        Gson gson = new Gson();
        RcCarStatus rcCarStatus = gson.fromJson(jsonData, RcCarStatus.class);
        System.out.println(rcCarStatus);
    }
}
