package com.ssafy.realcart.service.inter;

import org.springframework.stereotype.Service;

import com.ssafy.realcart.data.dto.PlayDto;

@Service
public interface IGameService {

	int participateGame(String nickname);
	void createGame();
	String checkQueue();
	boolean endGame(PlayDto playDto);
}
