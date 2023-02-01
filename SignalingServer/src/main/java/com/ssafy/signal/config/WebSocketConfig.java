package com.ssafy.signal.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import com.ssafy.signal.CallHandler;

@Configuration
@EnableWebSocket
@EnableWebSocketMessageBroker
@EnableAspectJAutoProxy
public class WebSocketConfig implements WebSocketConfigurer, WebSocketMessageBrokerConfigurer{

	@Autowired
	CallHandler callHandler;
	

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(callHandler, "/call").setAllowedOrigins("*");
	}
	
	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		registry.enableSimpleBroker("/subscribe");
		registry.setApplicationDestinationPrefixes("/publish");
	}
	
	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/chat").setAllowedOriginPatterns("*");
	}
	
}
