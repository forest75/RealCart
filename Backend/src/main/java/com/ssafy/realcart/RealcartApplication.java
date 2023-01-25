package com.ssafy.realcart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class RealcartApplication {

	public static void main(String[] args) {
		SpringApplication.run(RealcartApplication.class, args);
	}

}

