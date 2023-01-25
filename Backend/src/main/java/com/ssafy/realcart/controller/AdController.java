package com.ssafy.realcart.controller;

import com.ssafy.realcart.data.dto.AdDto;
import com.ssafy.realcart.data.dto.BoardDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/ad")
public class AdController {

    @GetMapping()
    public ResponseEntity<List<AdDto>> getAdList(){
        List<AdDto> adList = new ArrayList<>();
        AdDto adDto = new AdDto();
        adDto.setOwner("삼성전자");
        adDto.setContent("https://picsum.photos/200/300");
        adDto.setStartDate("2023-01-18 15:06:54.288323");
        adDto.setEndDate("2024-01-18 15:06:54.288323");
        adDto.setType("배너 광고");
        adList.add(adDto);
        return ResponseEntity.status(HttpStatus.OK).body(adList);
    }

    @GetMapping(value="/{id}")
    public ResponseEntity<AdDto> getAd(@PathVariable int id){
        AdDto adDto = new AdDto();
        adDto.setId(1);
        adDto.setOwner("삼성전자");
        adDto.setContent("https://picsum.photos/200/300");
        adDto.setStartDate("2023-01-18 15:06:54.288323");
        adDto.setEndDate("2024-01-18 15:06:54.288323");
        adDto.setType("배너 광고");
        return ResponseEntity.status(HttpStatus.OK).body(adDto);
    }

    @PostMapping()
    public ResponseEntity<String> createAd(@RequestParam String owner, @RequestParam String content, @RequestParam String type){

        return ResponseEntity.status(HttpStatus.OK).body("광고 생성 완료");
    }

    @PutMapping(value="/{id}")
    public ResponseEntity<String> changeAd(@PathVariable("id") int id, @RequestParam String owner, @RequestParam String content, @RequestParam String type){

        return ResponseEntity.status(HttpStatus.OK).body("광고 수정 완료");
    }

    @DeleteMapping(value="/{id}")
    public ResponseEntity<String> deleteAd(@PathVariable("id") int id){

        return ResponseEntity.status(HttpStatus.OK).body("광고 삭제 완료");
    }
}