package com.ssafy.realcart.controller;

import com.ssafy.realcart.data.dto.RecordDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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
    public ResponseEntity<Boolean> updateRecord(@RequestParam String nickname, @RequestParam String lapTime){
        RecordDto recordDto = new RecordDto();
        recordDto.setNickname(nickname);
        recordDto.setLapTime(lapTime);
        return ResponseEntity.status(HttpStatus.OK).body(true);
    }

}
