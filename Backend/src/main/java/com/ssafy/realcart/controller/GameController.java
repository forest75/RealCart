package com.ssafy.realcart.controller;

import com.ssafy.realcart.data.dto.BoardDto;
import com.ssafy.realcart.data.dto.GameDto;
import com.ssafy.realcart.data.dto.UserDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/game")
public class GameController {
    private Queue<String> queue = new ArrayDeque<String>();

    @GetMapping(value="/{id}")
    public ResponseEntity<GameDto> getGame(@PathVariable int id){
        GameDto gameDto = new GameDto();
        List<Map<UserDto, Integer>> players = new ArrayList<>();
        UserDto player1 = new UserDto();
        UserDto player2 = new UserDto();
        int betting1 = 10;
        int betting2 = 20;
        Map<UserDto, Integer> map1 = new HashMap<UserDto, Integer>();
        Map<UserDto, Integer> map2 = new HashMap<UserDto, Integer>();
        map1.put(player1, betting1);
        map2.put(player1, betting1);
        players.add(map1);
        players.add(map2);
        gameDto.setPlayers(players);
        gameDto.setId(1);
        gameDto.setCreatedTime("2023-01-18 15:06:54.288323");
        gameDto.setModifiedTime("2023-01-18 15:08:54.288323");
        return ResponseEntity.status(HttpStatus.OK).body(gameDto);
    }

    @PutMapping()
    public ResponseEntity<String> changeGame(GameDto gameDto){

        return ResponseEntity.status(HttpStatus.OK).body("게임 수정 완료");

    }
}
