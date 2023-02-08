package com.ssafy.realcart.controller;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.StringTokenizer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.realcart.data.dto.GameDto;
import com.ssafy.realcart.data.dto.PlayDto;
import com.ssafy.realcart.data.dto.UserDto;
import com.ssafy.realcart.service.inter.IGameService;

@RestController
@RequestMapping("/game")
public class GameController {
	
    private Queue<String> queue = new ArrayDeque<String>();
    
    private final Logger LOGGER = LoggerFactory.getLogger(GameController.class);

    private IGameService gameService;
    
    @Autowired
    public GameController(IGameService gameService){
        this.gameService = gameService;
    }
    
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
    
    @GetMapping(value="/participate")
    public ResponseEntity<Integer> participateGame(@RequestParam String nickname) {
        LOGGER.info("participateGame 메서드가 gameController에서 호출되었습니다.");
        int num = gameService.participateGame(nickname);
        return new ResponseEntity<>(num, HttpStatus.OK);
    }
    
    @GetMapping(value="/queue")
    public ResponseEntity<String> checkQueue() {
        LOGGER.info("checkQueue 메서드가 gameController에서 호출되었습니다.");
        String queue = gameService.checkQueue();
        return new ResponseEntity<>(queue, HttpStatus.OK);
    }
    
    @PostMapping(value="/result")
    public ResponseEntity<String> endGame(@RequestBody String string) {
        LOGGER.info("endGame 메서드가 gameController에서 호출되었습니다.");
        StringTokenizer st = new StringTokenizer(string, ",");
        PlayDto playDto = new PlayDto();
        playDto.setNickname1(st.nextToken());
        playDto.setLaptime1(Long.parseLong(st.nextToken()));
        playDto.setNickname2(st.nextToken());
        playDto.setLaptime2(Long.parseLong(st.nextToken()));
        if(gameService.endGame(playDto)) {
        	return new ResponseEntity<>("Good", HttpStatus.OK);
        }
        else {
        	return new ResponseEntity<>("Bad", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping()
    public ResponseEntity<String> createGame(@RequestBody GameDto gameDto){

        return ResponseEntity.status(HttpStatus.OK).body("게임 생성 완료");
    }

    @PutMapping()
    public ResponseEntity<String> changeGame(@RequestBody GameDto gameDto){

        return ResponseEntity.status(HttpStatus.OK).body("게임 수정 완료");

    }
}
