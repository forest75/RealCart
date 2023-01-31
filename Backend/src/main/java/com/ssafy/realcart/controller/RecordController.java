package com.ssafy.realcart.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.realcart.data.dto.RecordDto;

@RestController
@RequestMapping("/record")
public class RecordController {

    @GetMapping("/{nickname}")
    public ResponseEntity<RecordDto> getUserRecord(@PathVariable("nickname") String nickname){
        RecordDto recordDto = new RecordDto();
        recordDto.setNickname(nickname);
        recordDto.setRank(1);
        recordDto.setLapTime("1:26:00");
        return ResponseEntity.status(HttpStatus.OK).body(recordDto);
    }

    @GetMapping()
    public ResponseEntity<List<RecordDto>> getRecord(){
        List<RecordDto> list = new ArrayList<RecordDto>();
        RecordDto recordDto = new RecordDto();
        recordDto.setNickname("의권 짱짱");
        recordDto.setRank(1);
        recordDto.setLapTime("1:26:00");
        list.add(recordDto);
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @PutMapping()
    public ResponseEntity<Boolean> updateRecord(@RequestBody RecordDto recordDto){

        return ResponseEntity.status(HttpStatus.OK).body(true);
    }

}
