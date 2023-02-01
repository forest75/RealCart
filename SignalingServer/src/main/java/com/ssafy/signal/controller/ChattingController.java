package com.ssafy.signal.controller;

import javax.validation.Valid;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.signal.dto.ChatRequest;

@RestController
public class ChattingController {
	private final SimpMessagingTemplate simpMessagingTemplate;
	
	public ChattingController(SimpMessagingTemplate simpMessagingTemplate) {
		this.simpMessagingTemplate = simpMessagingTemplate;
	}
	
	@MessageMapping("/messages")
	public void chat(@Valid ChatRequest chatRequest) {
		simpMessagingTemplate.convertAndSend("/subscribe", chatRequest.getMessage());
	}
	
	
}
